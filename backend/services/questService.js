/**
 * Quest Service
 * Handles quest template loading, generation, rotation, and scaling
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class QuestService {
  constructor() {
    this.templates = null;
    this.rarityOrder = ['Common', 'Uncommon', 'Fine', 'Rare', 'Epic', 'Treasure Chest', 'Legendary', 'Mythic', 'Exotic', 'Arcane'];
  }

  /**
   * Load quest templates from quest.json
   */
  async loadTemplates() {
    if (this.templates) return this.templates;

    try {
      const templatePath = path.join(__dirname, '../quest.json');
      const data = await fs.readFile(templatePath, 'utf8');
      const parsed = JSON.parse(data);
      this.templates = parsed.quest_templates;
      return this.templates;
    } catch (error) {
      console.error('Failed to load quest templates:', error);
      throw new Error('Quest templates not available');
    }
  }

  /**
   * Get player progression data for quest scaling
   */
  async getPlayerProgression(userId) {
    const [rows] = await db.execute(`
      SELECT
        pd.level,
        pd.current_biome,
        pd.unlocked_biomes,
        pd.xp,
        pd.gold,
        pd.relics
      FROM player_data pd
      WHERE pd.user_id = ?
    `, [userId]);

    if (rows.length === 0) {
      throw new Error('Player data not found');
    }

    const playerData = rows[0];
    let unlockedBiomes = [1];

    try {
      const rawBiomes = playerData.unlocked_biomes;

      // Handle different data types
      if (Array.isArray(rawBiomes)) {
        // Already an array (MySQL JSON column parsed)
        unlockedBiomes = rawBiomes;
      } else if (typeof rawBiomes === 'string') {
        // String JSON - parse it
        unlockedBiomes = JSON.parse(rawBiomes);
      } else if (rawBiomes) {
        // Some other type - try to parse
        unlockedBiomes = JSON.parse(JSON.stringify(rawBiomes));
      }

      // Ensure it's an array and has at least biome 1
      if (!Array.isArray(unlockedBiomes) || unlockedBiomes.length === 0) {
        unlockedBiomes = [1];
      }
    } catch (e) {
      console.error('Failed to parse unlocked biomes:', e);
      console.error('Raw value:', playerData.unlocked_biomes);
      unlockedBiomes = [1];
    }

    return {
      level: playerData.level,
      currentBiome: playerData.current_biome,
      unlockedBiomes: unlockedBiomes,
      highestBiome: Math.max(...unlockedBiomes),
      progressionStage: this.getProgressionStage(playerData.level, Math.max(...unlockedBiomes))
    };
  }

  /**
   * Determine player's progression stage (early, mid, late)
   */
  getProgressionStage(level, highestBiome) {
    if (level < 20 || highestBiome < 5) return 'early';
    if (level < 50 || highestBiome < 15) return 'mid';
    return 'late';
  }

  /**
   * Get quest history for a specific rotation period
   */
  async getQuestHistory(userId, questType, daysBack = 30) {
    const [rows] = await db.execute(`
      SELECT quest_template_id, rotation_date
      FROM quest_history
      WHERE user_id = ?
        AND quest_type = ?
        AND rotation_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      ORDER BY rotation_date DESC
    `, [userId, questType, daysBack]);

    return rows;
  }

  /**
   * Get the most recent quests to prevent immediate duplicates
   */
  async getRecentQuests(userId, questType) {
    let lookbackCount = 1; // Default: yesterday's quests

    if (questType === 'weekly') lookbackCount = 1; // Last week
    if (questType === 'monthly') lookbackCount = 1; // Last month

    const limit = lookbackCount * 5; // 5 quests per rotation

    const [rows] = await db.execute(`
      SELECT quest_template_id, rotation_date
      FROM quest_history
      WHERE user_id = ?
        AND quest_type = ?
      ORDER BY rotation_date DESC
      LIMIT ${limit}
    `, [userId, questType]);

    return rows.map(r => r.quest_template_id);
  }

  /**
   * Scale quest amount based on player progression and quest type
   */
  scaleAmount(range, questType, progressionStage) {
    const [min, max] = range;
    const span = max - min;
    let multiplier;

    // Determine multiplier based on quest type and progression
    if (questType === 'daily') {
      // Daily: lower half for early/mid, mid-range for late
      multiplier = progressionStage === 'late' ? 0.5 : 0.3;
    } else if (questType === 'weekly') {
      // Weekly: around midpoint
      multiplier = progressionStage === 'early' ? 0.4 : 0.6;
    } else {
      // Monthly: upper half for mid/late, mid-range for early
      multiplier = progressionStage === 'early' ? 0.5 : 0.7;
    }

    // Add some randomness (±15%)
    const randomFactor = 0.85 + Math.random() * 0.3;
    const scaled = min + (span * multiplier * randomFactor);

    return Math.max(min, Math.floor(scaled));
  }

  /**
   * Fill placeholders in quest description
   */
  async fillPlaceholders(template, amount, playerProgression, metadata) {
    let description = template.description_template;

    // Replace {amount}
    description = description.replace(/{amount}/g, amount);

    // Replace {biome}
    if (description.includes('{biome}')) {
      let biomeName = 'Unknown Biome';

      if (template.biome_rule === 'current') {
        biomeName = await this.getBiomeName(playerProgression.currentBiome);
      } else if (template.biome_rule === 'any_unlocked' && metadata.targetBiome) {
        biomeName = await this.getBiomeName(metadata.targetBiome);
      }

      description = description.replace(/{biome}/g, biomeName);
    }

    // Replace {species_count}
    description = description.replace(/{species_count}/g, amount);

    return description;
  }

  /**
   * Get biome name by index (would need biome data from frontend)
   */
  async getBiomeName(biomeIndex) {
    // Simplified - in production, load from a biome config file
    const biomeNames = [
      'Unknown',
      'Shallow Waters',
      'Coral Reef',
      'Deep Ocean',
      'Kelp Forest',
      'Arctic Waters',
      'Tropical Lagoon',
      'Abyssal Depths',
      'Mangrove Swamp',
      'Rocky Shore',
      'Sunken Ruins',
      'Volcanic Vents',
      'Bioluminescent Bay',
      'Shipwreck',
      'Open Ocean',
      'Tidal Pools',
      'Frozen Lake',
      'Underground Lake',
      'Mystic Springs',
      'Crystal Caverns',
      'Ancient Temple',
      'Sky Realm',
      'Void Waters',
      'Celestial Sea',
      'Ethereal Depths',
      'Timeless Ocean',
      'Arcane Abyss'
    ];

    return biomeNames[biomeIndex] || `Biome ${biomeIndex}`;
  }

  /**
   * Check if template matches rotation rules
   */
  matchesRotationRules(template, questType, selectedCategories, rarityCount, legendaryMythicCount) {
    // Daily rules
    if (questType === 'daily') {
      // Max 1 per category
      if (selectedCategories[template.category] >= 1) return false;

      // Max 1 rarity quest per day
      if (template.rarity_rule && rarityCount >= 1) return false;
    }

    // Weekly rules
    if (questType === 'weekly') {
      // Max 2 rarity quests
      if (template.rarity_rule && rarityCount >= 2) return false;

      // Max 1 Legendary/Mythic quest
      if ((template.rarity_rule === 'Legendary' || template.rarity_rule === 'Mythic') &&
          legendaryMythicCount >= 1) return false;
    }

    // Monthly rules handled separately (min requirements)

    return true;
  }

  /**
   * Generate quests for a specific type (daily, weekly, monthly)
   */
  async generateQuests(userId, questType) {
    await this.loadTemplates();
    const playerProgression = await this.getPlayerProgression(userId);
    const recentQuests = await this.getRecentQuests(userId, questType);

    const questCount = 5;
    const selectedQuests = [];
    const selectedCategories = {
      catching: 0,
      action: 0,
      economy: 0,
      exploration: 0,
      progression: 0
    };

    let rarityCount = 0;
    let legendaryMythicCount = 0;

    // Filter templates
    let availableTemplates = this.templates.filter(t => {
      // Exclude recent quests
      if (recentQuests.includes(t.id)) return false;

      // Exclude templates with wrong range
      const range = t[`${questType}_range`];
      if (!range || range[0] === range[1] && range[0] === 0) return false;

      return true;
    });

    // For monthly, ensure minimum requirements
    const requiredTemplates = [];
    if (questType === 'monthly') {
      // Need 1 rarity milestone
      const rarityMilestone = availableTemplates.find(t =>
        t.rarity_rule && !recentQuests.includes(t.id)
      );
      if (rarityMilestone) requiredTemplates.push(rarityMilestone);

      // Need 1 biome milestone
      const biomeMilestone = availableTemplates.find(t =>
        t.category === 'exploration' && t.biome_rule && !recentQuests.includes(t.id)
      );
      if (biomeMilestone) requiredTemplates.push(biomeMilestone);

      // Need 1 progression milestone
      const progressionMilestone = availableTemplates.find(t =>
        t.category === 'progression' && !recentQuests.includes(t.id)
      );
      if (progressionMilestone) requiredTemplates.push(progressionMilestone);
    }

    // Add required templates first
    for (const template of requiredTemplates) {
      const quest = await this.createQuestFromTemplate(
        template,
        userId,
        questType,
        playerProgression
      );

      if (quest) {
        selectedQuests.push(quest);
        selectedCategories[template.category]++;
        if (template.rarity_rule) rarityCount++;
        if (template.rarity_rule === 'Legendary' || template.rarity_rule === 'Mythic') {
          legendaryMythicCount++;
        }

        // Remove from available
        availableTemplates = availableTemplates.filter(t => t.id !== template.id);
      }
    }

    // For weekly, ensure at least 1 progression quest
    if (questType === 'weekly' && selectedCategories.progression === 0) {
      const progressionTemplate = availableTemplates.find(t => t.category === 'progression');
      if (progressionTemplate) {
        const quest = await this.createQuestFromTemplate(
          progressionTemplate,
          userId,
          questType,
          playerProgression
        );

        if (quest) {
          selectedQuests.push(quest);
          selectedCategories[progressionTemplate.category]++;
          availableTemplates = availableTemplates.filter(t => t.id !== progressionTemplate.id);
        }
      }
    }

    // Fill remaining slots with weighted random selection
    while (selectedQuests.length < questCount && availableTemplates.length > 0) {
      // Filter templates based on rotation rules
      const validTemplates = availableTemplates.filter(t =>
        this.matchesRotationRules(t, questType, selectedCategories, rarityCount, legendaryMythicCount)
      );

      if (validTemplates.length === 0) break;

      // Weighted random selection
      const totalWeight = validTemplates.reduce((sum, t) => sum + t.weight, 0);
      let random = Math.random() * totalWeight;
      let selectedTemplate = null;

      for (const template of validTemplates) {
        random -= template.weight;
        if (random <= 0) {
          selectedTemplate = template;
          break;
        }
      }

      if (!selectedTemplate) selectedTemplate = validTemplates[0];

      // Create quest
      const quest = await this.createQuestFromTemplate(
        selectedTemplate,
        userId,
        questType,
        playerProgression
      );

      if (quest) {
        selectedQuests.push(quest);
        selectedCategories[selectedTemplate.category]++;

        if (selectedTemplate.rarity_rule) rarityCount++;
        if (selectedTemplate.rarity_rule === 'Legendary' || selectedTemplate.rarity_rule === 'Mythic') {
          legendaryMythicCount++;
        }
      }

      // Remove from available
      availableTemplates = availableTemplates.filter(t => t.id !== selectedTemplate.id);
    }

    return selectedQuests;
  }

  /**
   * Create a quest object from a template
   */
  async createQuestFromTemplate(template, userId, questType, playerProgression) {
    const range = template[`${questType}_range`];
    if (!range) return null;

    const targetAmount = this.scaleAmount(range, questType, playerProgression.progressionStage);

    // Metadata for tracking
    const metadata = {
      biome_rule: template.biome_rule,
      rarity_rule: template.rarity_rule
    };

    // If biome rule is "any_unlocked", pick a random unlocked biome
    if (template.biome_rule === 'any_unlocked') {
      const randomBiome = playerProgression.unlockedBiomes[
        Math.floor(Math.random() * playerProgression.unlockedBiomes.length)
      ];
      metadata.targetBiome = randomBiome;
    } else if (template.biome_rule === 'current') {
      metadata.targetBiome = playerProgression.currentBiome;
    }

    const description = await this.fillPlaceholders(template, targetAmount, playerProgression, metadata);

    // Determine reward
    let rewardRelics = 1; // daily
    if (questType === 'weekly') rewardRelics = 3;
    if (questType === 'monthly') rewardRelics = 5;

    return {
      quest_template_id: template.id,
      description,
      category: template.category,
      target_amount: targetAmount,
      current_progress: 0,
      completed: false,
      reward_relics: rewardRelics,
      metadata: JSON.stringify(metadata)
    };
  }

  /**
   * Get current rotation date for a quest type
   */
  getRotationDate(questType) {
    const now = new Date();

    if (questType === 'daily') {
      // Today's date
      return now.toISOString().split('T')[0];
    } else if (questType === 'weekly') {
      // Monday of this week
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(now.setDate(diff));
      return monday.toISOString().split('T')[0];
    } else {
      // First day of this month
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    }
  }

  /**
   * Get expiration date for a quest type
   */
  getExpirationDate(questType) {
    const now = new Date();

    if (questType === 'daily') {
      // End of today
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return tomorrow;
    } else if (questType === 'weekly') {
      // End of Sunday
      const day = now.getDay();
      const daysUntilSunday = day === 0 ? 7 : 7 - day;
      const nextMonday = new Date(now);
      nextMonday.setDate(nextMonday.getDate() + daysUntilSunday + 1);
      nextMonday.setHours(0, 0, 0, 0);
      return nextMonday;
    } else {
      // End of month
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return nextMonth;
    }
  }

  /**
   * Rotate quests if needed and return active quests
   */
  async getOrRotateQuests(userId, questType) {
    console.log(`[QuestService] getOrRotateQuests called for user ${userId}, type ${questType}`);
    const rotationDate = this.getRotationDate(questType);
    console.log(`[QuestService] Rotation date: ${rotationDate}`);

    // Check if we have active quests for this rotation period
    const [existing] = await db.execute(`
      SELECT * FROM player_quests
      WHERE user_id = ?
        AND quest_type = ?
        AND rotation_date = ?
      ORDER BY id
    `, [userId, questType, rotationDate]);

    console.log(`[QuestService] Found ${existing.length} existing quests`);

    if (existing.length > 0) {
      // Parse metadata
      return existing.map(q => ({
        ...q,
        metadata: q.metadata ? JSON.parse(q.metadata) : null
      }));
    }

    // Need to generate new quests
    console.log(`[QuestService] Generating new ${questType} quests for user ${userId}`);
    let newQuests;
    try {
      newQuests = await this.generateQuests(userId, questType);
      console.log(`[QuestService] Generated ${newQuests.length} quests`);
    } catch (error) {
      console.error(`[QuestService] Error generating quests:`, error);
      console.error(`[QuestService] Error stack:`, error.stack);
      throw error;
    }

    const expirationDate = this.getExpirationDate(questType);
    console.log(`[QuestService] Expiration date: ${expirationDate}`);

    // Insert into database
    const insertedQuests = [];
    for (const quest of newQuests) {
      const [result] = await db.execute(`
        INSERT INTO player_quests (
          user_id, quest_type, quest_template_id, description, category,
          target_amount, current_progress, completed, reward_relics,
          expires_at, rotation_date, metadata
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        userId,
        questType,
        quest.quest_template_id,
        quest.description,
        quest.category,
        quest.target_amount,
        quest.current_progress,
        quest.completed,
        quest.reward_relics,
        expirationDate,
        rotationDate,
        quest.metadata
      ]);

      // Add to history
      await db.execute(`
        INSERT INTO quest_history (user_id, quest_template_id, quest_type, rotation_date)
        VALUES (?, ?, ?, ?)
      `, [userId, quest.quest_template_id, questType, rotationDate]);

      insertedQuests.push({
        id: result.insertId,
        ...quest,
        user_id: userId,
        quest_type: questType,
        expires_at: expirationDate,
        rotation_date: rotationDate,
        metadata: quest.metadata ? JSON.parse(quest.metadata) : null
      });
    }

    return insertedQuests;
  }

  /**
   * Update quest progress
   */
  async updateQuestProgress(questId, userId, progress) {
    const [quest] = await db.execute(`
      SELECT * FROM player_quests
      WHERE id = ? AND user_id = ?
    `, [questId, userId]);

    if (quest.length === 0) {
      throw new Error('Quest not found');
    }

    const currentQuest = quest[0];
    if (currentQuest.completed) {
      return currentQuest; // Already completed
    }

    const newProgress = Math.min(currentQuest.current_progress + progress, currentQuest.target_amount);
    const isCompleted = newProgress >= currentQuest.target_amount;

    // Update quest
    await db.execute(`
      UPDATE player_quests
      SET current_progress = ?, completed = ?
      WHERE id = ?
    `, [newProgress, isCompleted, questId]);

    // If completed, award relics automatically
    if (isCompleted && !currentQuest.completed) {
      await db.execute(`
        UPDATE player_data
        SET relics = relics + ?
        WHERE user_id = ?
      `, [currentQuest.reward_relics, userId]);

      // Update quest history
      await db.execute(`
        UPDATE quest_history
        SET completed_at = NOW()
        WHERE user_id = ?
          AND quest_template_id = ?
          AND rotation_date = ?
      `, [userId, currentQuest.quest_template_id, currentQuest.rotation_date]);
    }

    return {
      ...currentQuest,
      current_progress: newProgress,
      completed: isCompleted
    };
  }

  /**
   * Get all active quests for a user
   */
  async getAllActiveQuests(userId) {
    console.log('[QuestService] Getting all active quests for user:', userId);
    try {
      const daily = await this.getOrRotateQuests(userId, 'daily');
      console.log('[QuestService] Daily quests:', daily.length);
      const weekly = await this.getOrRotateQuests(userId, 'weekly');
      console.log('[QuestService] Weekly quests:', weekly.length);
      const monthly = await this.getOrRotateQuests(userId, 'monthly');
      console.log('[QuestService] Monthly quests:', monthly.length);

      return {
        daily,
        weekly,
        monthly
      };
    } catch (error) {
      console.error('[QuestService] Error in getAllActiveQuests:', error);
      console.error('[QuestService] Error stack:', error.stack);
      // Return empty arrays rather than crashing
      return {
        daily: [],
        weekly: [],
        monthly: []
      };
    }
  }
}

export default new QuestService();
