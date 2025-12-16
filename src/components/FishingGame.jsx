// FishingGame.jsx - Main game container with server-authoritative state
import { useState, useEffect, useRef } from 'react';
import apiService from '../api-service.js';
import { themes } from '../utils/themes.js';
import { Icons } from '../utils/icons.jsx';

// Import game data
import { BIOMES } from '../biomes.js';
import { RODS, BAITS } from '../equipment.js';
import { ACHIEVEMENTS } from '../achievements.js';
import { FUNNY_LINES } from '../funnylines.js';
import { IDLE_NOTIFICATIONS } from '../idleNotifications.js';
import { RARITIES, RARITY_COLORS } from '../constants/gameConstants.js';
import { getRarityColor, isGradientRarity, getGradientTextStyle, getGradientBorderStyle } from '../utils/rarityUtils.js';
import { GameHelpers } from '../game-helpers.js';

// Import shared components
import { Sidebar } from './Sidebar.jsx';
import { CustomModal } from './CustomModal.jsx';
import { GlobalNotification } from './GlobalNotification.jsx';
import { SavingOverlay } from './SavingOverlay.jsx';
import { PlaceholderPage } from './PlaceholderPage.jsx';

// Import page components (will create these next)
import { FishingPage } from './pages/FishingPage.jsx';
import { StatsPage } from './pages/StatsPage.jsx';
import { LeaderboardPage } from './pages/LeaderboardPage.jsx';
import { OptionsPage } from './pages/OptionsPage.jsx';
import { BoostersPage } from './pages/BoostersPage.jsx';
import { EquipmentPage } from './pages/EquipmentPage.jsx';
import { BiomesPage } from './pages/BiomesPage.jsx';
import { InventoryPage } from './pages/InventoryPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { AchievementsPage } from './pages/AchievementsPage.jsx';
import { FishpediaPage } from './pages/FishpediaPage.jsx';
import { QuestPage } from './pages/QuestPage.jsx';

export const FishingGame = ({ user, onLogout }) => {
  // State
  const [currentPage, setCurrentPage] = useState('fishing');
  const [savingProgress, setSavingProgress] = useState(false);
  const [player, setPlayer] = useState(() => {
    const defaultPlayerState = {
      level: 1,
      xp: 0,
      xpToNext: 150,
      gold: 0,
      relics: 0,
      statPoints: 0,
      stats: { strength: 1, intelligence: 1, luck: 1, stamina: 100 },
      inventory: [],
      lockedFish: [],
      currentBiome: 1,
      equippedRod: 'Willow Branch',
      equippedBait: 'Stale Bread Crust',
      ownedRods: ['Willow Branch'],
      baitInventory: { 'Stale Bread Crust': 999999 },
      achievements: [],
      totalFishCaught: 0,
      totalFishSold: 0,
      totalGoldEarned: 0,
      mythicsCaught: 0,
      legendariesCaught: 0,
      exoticsCaught: 0,
      arcanesCaught: 0,
      treasureChestsFound: 0,
      statsUpgraded: 0,
      strUpgraded: 0,
      intUpgraded: 0,
      luckUpgraded: 0,
      staminaUpgraded: 0,
      totalRelicsEarned: 0,
      discoveredFish: [],
      fishpediaStats: [],
      unlockedBiomes: [1]
    };
    return defaultPlayerState;
  });

  const [fishing, setFishing] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [lastCatch, setLastCatch] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [inventorySortOrder, setInventorySortOrder] = useState('value-desc');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [funnyLine, setFunnyLine] = useState('');
  const [shopTab, setShopTab] = useState('rods');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [statCosts, setStatCosts] = useState({});
  const [globalNotification, setGlobalNotification] = useState(null);
  const [idleNotificationIndex, setIdleNotificationIndex] = useState(0);
  const shownNotifications = useRef(new Set());

  // CRITICAL: Centralized active boosters state with event-driven fetching (NO polling!)
  const [activeBoosters, setActiveBoosters] = useState([]);

  // Modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'alert',
    message: '',
    onConfirm: null
  });

  // Helper functions for modal
  const showAlert = (message) => {
    setModalState({
      isOpen: true,
      type: 'alert',
      message,
      onConfirm: null
    });
  };

  const showConfirm = (message, onConfirm) => {
    setModalState({
      isOpen: true,
      type: 'confirm',
      message,
      onConfirm
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: 'alert',
      message: '',
      onConfirm: null
    });
  };

  // Make modal functions globally available
  useEffect(() => {
    window.showAlert = showAlert;
    window.showConfirm = showConfirm;
    return () => {
      delete window.showAlert;
      delete window.showConfirm;
    };
  }, []);

  // EVENT-DRIVEN BOOSTER FETCHING (NO POLLING!)
  const fetchActiveBoosters = async () => {
    try {
      const response = await apiService.getActiveBoosters();
      if (response.boosters) {
        setActiveBoosters(response.boosters);
      }
    } catch (error) {
      console.error('Failed to fetch active boosters:', error);
    }
  };

  // Fetch boosters ONLY on component mount
  useEffect(() => {
    fetchActiveBoosters();
  }, []);

  // Fetch boosters when entering Fishing or Boosters page
  useEffect(() => {
    if (currentPage === 'fishing' || currentPage === 'boosters') {
      fetchActiveBoosters();
    }
  }, [currentPage]);

  // Helper function to get time remaining for booster
  const getBoosterTimeRemaining = (expiresAt) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires - now;

    if (diff <= 0) return 'Expired';

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  // Load player data from server
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await apiService.getPlayerData();
        setPlayer(data);
        setDataLoaded(true);
      } catch (err) {
        console.error('Failed to load from server:', err);
        setDataLoaded(true);
      }
    };
    loadData();
  }, []);

  // Handle global notification timeout
  useEffect(() => {
    if (globalNotification) {
      const timer = setTimeout(() => {
        setGlobalNotification(null);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [globalNotification]);

  // Rotate idle notification messages
  useEffect(() => {
    const rotateIdleMessage = () => {
      setIdleNotificationIndex((prevIndex) => {
        const totalMessages = IDLE_NOTIFICATIONS?.length || 14;
        return (prevIndex + 1) % totalMessages;
      });
    };
    const interval = setInterval(rotateIdleMessage, 60000);
    return () => clearInterval(interval);
  }, []);

  // Poll for global rare catches
  useEffect(() => {
    const pollGlobalCatches = async () => {
      try {
        const response = await apiService.getGlobalCatches();
        if (response.catches && response.catches.length > 0) {
          const latestCatch = response.catches[0];
          const catchTimestamp = new Date(latestCatch.caught_at).getTime();

          if (shownNotifications.current.has(catchTimestamp)) {
            return;
          }

          const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
          shownNotifications.current.forEach(timestamp => {
            if (timestamp < fiveMinutesAgo) {
              shownNotifications.current.delete(timestamp);
            }
          });

          shownNotifications.current.add(catchTimestamp);
          setGlobalNotification({
            username: latestCatch.profile_username,
            fishName: latestCatch.fish_name,
            rarity: latestCatch.rarity,
            messageIndex: Math.floor(Math.random() * 10),
            timestamp: catchTimestamp
          });
        }
      } catch (error) {
        console.error('Failed to fetch global catches:', error);
      }
    };

    if (globalNotification) {
      const resumeTimeout = setTimeout(pollGlobalCatches, 60000);
      return () => clearTimeout(resumeTimeout);
    }

    pollGlobalCatches();
    const interval = setInterval(pollGlobalCatches, 15000);
    return () => clearInterval(interval);
  }, [globalNotification]);

  // Theme management
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('arcaneAnglerTheme');
    return saved && themes[saved] ? saved : 'dark';
  });

  const theme = themes[currentTheme];

  useEffect(() => {
    localStorage.setItem('arcaneAnglerTheme', currentTheme);
  }, [currentTheme]);

  // Cast button colors
  const buttonColors = {
    blue: { bg: 'bg-blue-600', hover: 'bg-blue-500', text: 'text-white', name: 'Ocean Blue' },
    green: { bg: 'bg-green-600', hover: 'bg-green-500', text: 'text-white', name: 'Forest Green' },
    purple: { bg: 'bg-purple-600', hover: 'bg-purple-500', text: 'text-white', name: 'Royal Purple' },
    red: { bg: 'bg-red-600', hover: 'bg-red-500', text: 'text-white', name: 'Crimson Red' },
    orange: { bg: 'bg-orange-600', hover: 'bg-orange-500', text: 'text-white', name: 'Sunset Orange' },
    pink: { bg: 'bg-pink-600', hover: 'bg-pink-500', text: 'text-white', name: 'Rose Pink' },
    teal: { bg: 'bg-teal-600', hover: 'bg-teal-500', text: 'text-white', name: 'Teal Wave' },
    indigo: { bg: 'bg-indigo-600', hover: 'bg-indigo-500', text: 'text-white', name: 'Deep Indigo' },
    yellow: { bg: 'bg-yellow-600', hover: 'bg-yellow-500', text: 'text-black', name: 'Golden Yellow' },
    gray: { bg: 'bg-gray-600', hover: 'bg-gray-500', text: 'text-white', name: 'Steel Gray' }
  };

  const [castButtonColor, setCastButtonColor] = useState(() => {
    const saved = localStorage.getItem('castButtonColor');
    return saved && buttonColors[saved] ? saved : 'blue';
  });

  useEffect(() => {
    localStorage.setItem('castButtonColor', castButtonColor);
  }, [castButtonColor]);

  // Equipped title
  const [equippedTitle, setEquippedTitle] = useState(null);

  const getDisplayTitle = () => {
    if (!equippedTitle || !ACHIEVEMENTS) return null;
    const achievement = ACHIEVEMENTS.find(a => a.id === equippedTitle);
    return achievement ? achievement.title : null;
  };

  useEffect(() => {
    const loadEquippedTitle = async () => {
      try {
        const profile = await apiService.getMyProfile();
        if (profile && profile.profile && profile.profile.equipped_title) {
          setEquippedTitle(profile.profile.equipped_title);
        }
      } catch (error) {
        console.error('Failed to load equipped title:', error);
      }
    };
    loadEquippedTitle();
  }, []);

  // Constants from global scope (already imported above)
  const rarities = RARITIES;
  const rarityColors = RARITY_COLORS;

  // Achievement checking
  const checkAchievements = async () => {
    const newAchievements = GameHelpers.checkAchievements(player);

    if (newAchievements.length > 0) {
      const updatedAchievements = [...player.achievements, ...newAchievements];

      setPlayer(prev => ({
        ...prev,
        achievements: updatedAchievements
      }));

      try {
        await apiService.syncAchievements(updatedAchievements);
      } catch (error) {
        console.error('Failed to sync achievements:', error);
      }
    }
  };

  // Fetch stat costs when switching to stats page
  useEffect(() => {
    if (currentPage === 'stats') {
      fetchStatCosts();
    }
  }, [currentPage]);

  // Check achievements whenever player state changes
  useEffect(() => {
    checkAchievements();
  }, [
    player.totalFishCaught,
    player.level,
    player.totalGoldEarned,
    player.totalFishSold,
    player.mythicsCaught,
    player.legendariesCaught,
    player.exoticsCaught,
    player.arcanesCaught,
    player.treasureChestsFound,
    player.statsUpgraded,
    player.strUpgraded,
    player.intUpgraded,
    player.luckUpgraded,
    player.staminaUpgraded,
    player.totalRelicsEarned,
    player.gold,
    player.currentBiome
  ]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Helper functions using GameHelpers
  const getCurrentBiomeFish = () => GameHelpers.getCurrentBiomeFish(player.currentBiome);
  const getAllCurrentBiomeFish = () => GameHelpers.getAllCurrentBiomeFish(player.currentBiome);
  const getTotalStats = () => GameHelpers.getTotalStats(player);
  const getBiomeRelicRange = (biome) => GameHelpers.getBiomeRelicRange(biome);
  const calculateRarity = () => GameHelpers.calculateRarity(getTotalStats().luck);
  const calculateFishCount = (rarity) => GameHelpers.calculateFishCount(rarity, getTotalStats().strength);
  const calculateTitanBonus = () => GameHelpers.calculateTitanBonus(getTotalStats().strength);
  const generateTreasureChest = () => GameHelpers.generateTreasureChest(player.currentBiome, getTotalStats().luck);
  const getFunnyLine = () => GameHelpers.getFunnyLine(player.currentBiome);

  // Event Handlers
  const handleFish = async () => {
    if (cooldown > 0 || fishing) return;

    if (player.equippedBait !== 'Stale Bread Crust' && (player.baitInventory[player.equippedBait] || 0) <= 0) {
      showAlert("You need to buy or equip a different bait!");
      return;
    }

    setFishing(true);
    setCooldown(4);

    setTimeout(async () => {
      setFunnyLine(getFunnyLine());

      try {
        const response = await apiService.castLine();

        if (response.success) {
          const result = response.result;

          if (result.treasureChest) {
            setLastCatch({
              fish: 'Treasure Chest',
              rarity: 'Treasure Chest',
              count: 1,
              xp: result.xpGained,
              relics: result.relicsGained,
              gold: result.goldGained,
              isTreasure: true,
              xpBonus: result.xpBonus
            });
          } else {
            setLastCatch({
              fish: result.fish.name,
              rarity: result.rarity,
              count: result.count,
              xp: result.xpGained,
              gold: result.fish.gold || result.goldGained / result.count,
              relics: 0,
              titanBonus: result.titanBonus > 1 ? result.titanBonus : null,
              xpBonus: result.xpBonus
            });
          }

          if (result.xpBonus && result.xpBonus > 1) {
            const bonusPercent = Math.round((result.xpBonus - 1) * 100);
            setTimeout(() => {
              showAlert(`✨ +${bonusPercent}% XP Boost Active!`);
            }, 100);
          }

          setPlayer(prev => ({
            ...prev,
            gold: result.newGold,
            xp: result.newXP,
            level: result.newLevel,
            relics: result.newRelics,
            statPoints: result.newStatPoints !== undefined ? result.newStatPoints : prev.statPoints,
            stamina: result.newStamina,
            equippedBait: result.equippedBait,
            baitInventory: {
              ...prev.baitInventory,
              [result.equippedBait]: result.baitQuantity
            }
          }));

          const playerData = await apiService.getPlayerData();
          setPlayer(playerData);
        }
      } catch (error) {
        console.error('Fishing failed:', error);
        showAlert('Failed to cast line. Please try again.');
      } finally {
        setFishing(false);
      }
    }, 1000);
  };

  const toggleLock = async (fishName) => {
    const isCurrentlyLocked = player.lockedFish.includes(fishName);

    try {
      if (isCurrentlyLocked) {
        await apiService.unlockFish(fishName);
      } else {
        await apiService.lockFish(fishName);
      }

      const playerData = await apiService.getPlayerData();
      setPlayer(playerData);
    } catch (error) {
      console.error('Toggle lock failed:', error);
      showAlert('Failed to toggle fish lock. Please try again.');
    }
  };

  const sellFish = async (fishItem) => {
    if (player.lockedFish.includes(fishItem.name)) return;

    try {
      const response = await apiService.sellFish(
        fishItem.name,
        fishItem.rarity,
        fishItem.count
      );

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold
        }));

        const playerData = await apiService.getPlayerData();
        setPlayer(playerData);
      }
    } catch (error) {
      console.error('Sell failed:', error);
      showAlert('Failed to sell fish. Please try again.');
    }
  };

  const sellAll = async () => {
    const unlockedFish = player.inventory.filter(f => !player.lockedFish.includes(f.name));

    if (unlockedFish.length === 0) {
      showAlert('No unlocked fish to sell!');
      return;
    }

    const rareRarities = ['Mythic', 'Exotic', 'Arcane'];
    const hasRareFish = unlockedFish.some(f => rareRarities.includes(f.rarity));

    if (hasRareFish) {
      const rareFishList = unlockedFish
        .filter(f => rareRarities.includes(f.rarity))
        .map(f => `${f.rarity}: ${f.name} (${f.count}x)`)
        .join('\n');

      showConfirm(
        `⚠️ WARNING ⚠️\n\nYou have ultra-rare fish that are not locked:\n\n${rareFishList}\n\nAre you sure you want to sell these extremely rare fish?`,
        async () => {
          try {
            const response = await apiService.sellAll();

            if (response.success) {
              setPlayer(prev => ({
                ...prev,
                gold: response.newGold
              }));

              const playerData = await apiService.getPlayerData();
              setPlayer(playerData);
            }
          } catch (error) {
            console.error('Sell all failed:', error);
            showAlert('Failed to sell all fish. Please try again.');
          }
        }
      );
      return;
    }

    try {
      const response = await apiService.sellAll();

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold
        }));

        const playerData = await apiService.getPlayerData();
        setPlayer(playerData);
      }
    } catch (error) {
      console.error('Sell all failed:', error);
      showAlert('Failed to sell all fish. Please try again.');
    }
  };

  const sellByRarity = async (rarity) => {
    const fishToSell = player.inventory.filter(
      f => f.rarity === rarity && !player.lockedFish.includes(f.name)
    );

    if (fishToSell.length === 0) {
      showAlert(`No unlocked ${rarity} fish to sell!`);
      return;
    }

    try {
      const response = await apiService.sellByRarity(rarity);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold
        }));

        const playerData = await apiService.getPlayerData();
        setPlayer(playerData);
      }
    } catch (error) {
      console.error('Sell by rarity failed:', error);
      showAlert('Failed to sell fish by rarity. Please try again.');
    }
  };

  const fetchStatCosts = async () => {
    try {
      const response = await apiService.getStatCosts();
      if (response.success) {
        setStatCosts(response.costs);
      }
    } catch (error) {
      console.error('Failed to fetch stat costs:', error);
    }
  };

  const upgradeStat = async (stat, amount = 1) => {
    try {
      const response = await apiService.upgradeStat(stat, amount);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            [stat]: response.newValue
          },
          statPoints: response.newStatPoints
        }));

        setStatCosts(prev => ({
          ...prev,
          [stat]: {
            current: response.newValue,
            cost: response.nextCost
          }
        }));

        if (amount > 1) {
          showAlert(`Successfully upgraded ${stat} by ${amount} points!`);
        }
      }
    } catch (error) {
      console.error('Upgrade failed:', error);
      showAlert(error.message || 'Failed to upgrade stat. Please try again.');
    }
  };

  const getFilteredInventory = () => {
    const totalStats = getTotalStats();
    const intelligenceBonus = 1 + (Number(totalStats.intelligence) * 0.02);

    let filtered = selectedRarity === 'all'
      ? [...player.inventory]
      : player.inventory.filter(f => f.rarity === selectedRarity);

    filtered.sort((a, b) => {
      const titanBonusA = Number(a.titanBonus) || 1;
      const titanBonusB = Number(b.titanBonus) || 1;
      const baseGoldA = Number(a.baseGold) || Number(a.gold) || 0;
      const baseGoldB = Number(b.baseGold) || Number(b.gold) || 0;

      switch (inventorySortOrder) {
        case 'value-desc':
          const valueA = Math.floor(baseGoldA * Number(a.count) * intelligenceBonus * titanBonusA);
          const valueB = Math.floor(baseGoldB * Number(b.count) * intelligenceBonus * titanBonusB);
          return valueB - valueA;
        case 'value-asc':
          const valueA2 = Math.floor(baseGoldA * Number(a.count) * intelligenceBonus * titanBonusA);
          const valueB2 = Math.floor(baseGoldB * Number(b.count) * intelligenceBonus * titanBonusB);
          return valueA2 - valueB2;
        case 'quantity-desc':
          return Number(b.count) - Number(a.count);
        case 'quantity-asc':
          return Number(a.count) - Number(b.count);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const buyRod = async (rodName) => {
    try {
      const response = await apiService.buyRod(rodName);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold,
          ownedRods: [...prev.ownedRods, rodName],
          equippedRod: rodName
        }));

        await apiService.equipRod(rodName);
      }
    } catch (error) {
      console.error('Buy rod failed:', error);
      showAlert(error.message || 'Failed to purchase rod. Not enough gold?');
    }
  };

  const equipRod = async (rodName) => {
    try {
      const response = await apiService.equipRod(rodName);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          equippedRod: rodName
        }));
      }
    } catch (error) {
      console.error('Equip rod failed:', error);
    }
  };

  const buyBait = async (baitName, multiplier = 1) => {
    try {
      const response = await apiService.buyBait(baitName, multiplier);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold,
          baitInventory: {
            ...prev.baitInventory,
            [baitName]: response.newBaitQuantity
          }
        }));
      }
    } catch (error) {
      console.error('Buy bait failed:', error);
      showAlert(error.message || 'Failed to purchase bait. Not enough gold?');
    }
  };

  const equipBait = async (baitName) => {
    try {
      const response = await apiService.equipBait(baitName);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          equippedBait: baitName
        }));
      }
    } catch (error) {
      console.error('Equip bait failed:', error);
    }
  };

  const visitOrUnlockBiome = async (biomeId) => {
    const unlockedBiomes = player.unlockedBiomes || [1];
    const isUnlocked = unlockedBiomes.includes(biomeId);

    if (isUnlocked) {
      try {
        const response = await apiService.changeBiome(biomeId);

        if (response.success) {
          setPlayer(prev => ({
            ...prev,
            currentBiome: biomeId
          }));
          setCurrentPage('fishing');
        }
      } catch (error) {
        console.error('Change biome failed:', error);
      }
    } else {
      const biome = BIOMES[biomeId];
      if (!biome) {
        showAlert('Biome not found');
        return;
      }

      if (player.level < biome.unlockLevel) {
        showAlert(`Level ${biome.unlockLevel} required to unlock ${biome.name}. You are currently level ${player.level}.`);
        return;
      }

      if (player.gold < biome.unlockGold) {
        showAlert(`${biome.unlockGold} gold required to unlock ${biome.name}. You currently have ${player.gold} gold.`);
        return;
      }

      try {
        const response = await apiService.unlockBiome(biomeId);

        if (response.success) {
          setPlayer(prev => ({
            ...prev,
            currentBiome: biomeId,
            gold: response.newGold,
            unlockedBiomes: response.unlockedBiomes
          }));
          setCurrentPage('fishing');
        }
      } catch (error) {
        console.error('Unlock biome failed:', error);
        showAlert(error.message || 'Failed to unlock biome. Please try again.');
      }
    }
  };

  // CRITICAL: Event-driven booster purchase handler
  const handleBuyBooster = async (boosterType) => {
    try {
      const response = await apiService.buyBooster(boosterType);
      if (response.success) {
        // Refresh boosters immediately after purchase
        await fetchActiveBoosters();
        // Refresh player data to update relics
        const playerData = await apiService.getPlayerData();
        setPlayer(playerData);
        return response; // Return for BoostersPage to show success message
      }
    } catch (error) {
      console.error('Failed to buy booster:', error);
      throw error; // Re-throw for BoostersPage to handle
    }
  };

  const handleSaveAndLogout = async () => {
    onLogout();
  };

  // Render
  return (
    <>
      <CustomModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        message={modalState.message}
        onClose={closeModal}
        onConfirm={modalState.onConfirm}
      />
      <SavingOverlay savingProgress={savingProgress} theme={theme} />
      <div className={`min-h-screen bg-gradient-to-b from-${theme.primary.from} via-${theme.primary.via} to-${theme.primary.to} text-white flex`}>
        <Sidebar
          player={player}
          theme={theme}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleSaveAndLogout={handleSaveAndLogout}
          setPlayer={setPlayer}
        />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className={`lg:hidden bg-${theme.primarySolid} border-b-2 border-${theme.border} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`p-2 hover:bg-${theme.hover} rounded`}
              >
                {Icons.Menu()}
              </button>
              <div className="flex-1"></div>
              <button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                }}
                className={`p-2 hover:bg-${theme.hover} rounded text-sm`}
              >
                ⛶
              </button>
            </div>

            <div className="space-y-1.5">
              <div className={`bg-${theme.secondary} bg-opacity-50 rounded px-3 h-8 flex items-center justify-center`}>
                <div className={`text-xs font-bold text-${theme.textMuted}`}>
                  {user?.profile_username || user?.profileUsername || user?.username}
                  {getDisplayTitle() && <span> - {getDisplayTitle()}</span>}
                </div>
              </div>

              <div className={`flex items-center justify-between bg-${theme.secondary} bg-opacity-50 rounded px-3 h-8`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs text-${theme.textMuted}`}>Level: {player.level}</span>
                </div>
                <div className="flex-1 mx-3">
                  <div className={`bg-${theme.surface} rounded-full h-1.5`}>
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${(player.xp / player.xpToNext) * 100}%` }}
                    />
                  </div>
                </div>
                <span className={`text-xs text-${theme.textMuted}`}>{Math.floor((player.xp / player.xpToNext) * 100)}%</span>
              </div>

              <div className={`bg-${theme.secondary} bg-opacity-50 rounded px-3 h-8 flex items-center gap-2`}>
                <div className="flex items-center gap-1 flex-[7]">
                  <span>🪙</span>
                  <span className="text-[10px] font-bold text-yellow-400">{player.gold.toLocaleString()}</span>
                </div>
                <div className={`h-4 w-px bg-${theme.borderLight}`}></div>
                <div className="flex items-center gap-1 flex-[3]">
                  <span>🔮</span>
                  <span className="text-[10px] font-bold text-purple-400">{player.relics.toLocaleString()}</span>
                </div>
              </div>

              <div className={`bg-${theme.secondary} bg-opacity-50 rounded px-3 h-8 flex items-center justify-center`}>
                <GlobalNotification theme={theme} globalNotification={globalNotification} idleNotificationIndex={idleNotificationIndex} />
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className={`hidden lg:block bg-${theme.primarySolid} border-b-2 border-${theme.border} p-3`}>
            <div className="max-w-4xl mx-auto space-y-1.5">
              <div className={`bg-${theme.secondary} bg-opacity-50 rounded px-4 h-8 flex items-center justify-center`}>
                <div className={`text-xs font-bold text-${theme.textMuted}`}>
                  {user?.profile_username || user?.profileUsername || user?.username}
                  {getDisplayTitle() && <span> - {getDisplayTitle()}</span>}
                </div>
              </div>

              <div className={`flex items-center justify-between bg-${theme.secondary} bg-opacity-50 rounded px-4 h-8`}>
                <div className="flex items-center gap-2">
                  <span className={`text-sm text-${theme.textMuted}`}>Level: {player.level}</span>
                </div>
                <div className="flex-1 mx-4 max-w-md">
                  <div className={`bg-${theme.surface} rounded-full h-2`}>
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(player.xp / player.xpToNext) * 100}%` }}
                    />
                  </div>
                </div>
                <span className={`text-sm text-${theme.textMuted}`}>{Math.floor((player.xp / player.xpToNext) * 100)}%</span>
              </div>

              <div className={`bg-${theme.secondary} bg-opacity-50 rounded px-4 h-8 flex items-center gap-3`}>
                <div className="flex items-center gap-2 flex-[7]">
                  <span>🪙</span>
                  <span className="text-sm font-bold text-yellow-400">{player.gold.toLocaleString()}</span>
                </div>
                <div className={`h-5 w-px bg-${theme.borderLight}`}></div>
                <div className="flex items-center gap-2 flex-[3]">
                  <span>🔮</span>
                  <span className="text-sm font-bold text-purple-400">{player.relics.toLocaleString()}</span>
                </div>
              </div>

              <div className={`bg-${theme.secondary} bg-opacity-50 rounded px-4 h-8 flex items-center justify-center`}>
                <GlobalNotification theme={theme} globalNotification={globalNotification} idleNotificationIndex={idleNotificationIndex} />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {currentPage === 'fishing' && <FishingPage
              player={player}
              theme={theme}
              setCurrentPage={setCurrentPage}
              handleFish={handleFish}
              cooldown={cooldown}
              fishing={fishing}
              buttonColors={buttonColors}
              castButtonColor={castButtonColor}
              lastCatch={lastCatch}
              funnyLine={funnyLine}
              getTotalStats={getTotalStats}
              activeBoosters={activeBoosters}
              getBoosterTimeRemaining={getBoosterTimeRemaining}
              rarityColors={rarityColors}
              getRarityColor={getRarityColor}
              isGradientRarity={isGradientRarity}
              getGradientTextStyle={getGradientTextStyle}
            />}

            {currentPage === 'stats' && <StatsPage
              player={player}
              setPlayer={setPlayer}
              theme={theme}
              getTotalStats={getTotalStats}
              upgradeStat={upgradeStat}
              statCosts={statCosts}
            />}

            {currentPage === 'inventory' && <InventoryPage
              player={player}
              theme={theme}
              selectedRarity={selectedRarity}
              setSelectedRarity={setSelectedRarity}
              inventorySortOrder={inventorySortOrder}
              setInventorySortOrder={setInventorySortOrder}
              getFilteredInventory={getFilteredInventory}
              sellFish={sellFish}
              sellAll={sellAll}
              sellByRarity={sellByRarity}
              toggleLock={toggleLock}
              getTotalStats={getTotalStats}
              rarityColors={rarityColors}
              getRarityColor={getRarityColor}
              isGradientRarity={isGradientRarity}
              getGradientTextStyle={getGradientTextStyle}
            />}

            {currentPage === 'equipment' && <EquipmentPage
              player={player}
              theme={theme}
              shopTab={shopTab}
              setShopTab={setShopTab}
              buyRod={buyRod}
              equipRod={equipRod}
              buyBait={buyBait}
              equipBait={equipBait}
            />}

            {currentPage === 'biomes' && <BiomesPage
              player={player}
              theme={theme}
              visitOrUnlockBiome={visitOrUnlockBiome}
            />}

            {currentPage === 'boosters' && <BoostersPage
              player={player}
              setPlayer={setPlayer}
              theme={theme}
              showConfirm={showConfirm}
              showAlert={showAlert}
              activeBoosters={activeBoosters}
              handleBuyBooster={handleBuyBooster}
              getBoosterTimeRemaining={getBoosterTimeRemaining}
            />}

            {currentPage === 'leaderboard' && <LeaderboardPage theme={theme} />}

            {currentPage === 'profile' && <ProfilePage theme={theme} player={player} setPlayer={setPlayer} />}

            {currentPage === 'achievements' && <AchievementsPage theme={theme} player={player} />}

            {currentPage === 'fishpedia' && <FishpediaPage
              player={player}
              theme={theme}
              rarityColors={rarityColors}
              getRarityColor={getRarityColor}
              isGradientRarity={isGradientRarity}
              getGradientTextStyle={getGradientTextStyle}
            />}

            {currentPage === 'quests' && <QuestPage theme={theme} player={player} />}

            {currentPage === 'options' && <OptionsPage
              theme={theme}
              currentTheme={currentTheme}
              setCurrentTheme={setCurrentTheme}
              castButtonColor={castButtonColor}
              setCastButtonColor={setCastButtonColor}
              buttonColors={buttonColors}
            />}

            {currentPage === 'guilds' && <PlaceholderPage title="Guilds" icon={Icons.Users} theme={theme} />}
          </div>
        </div>
      </div>
    </>
  );
};

// Export to window for main.js
window.FishingGame = FishingGame;
};
