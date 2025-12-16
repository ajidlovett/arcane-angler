window.Icons = {
  Fish: () => '🎣',
  Package: () => '📦',
  TrendingUp: () => '📊',
  Target: () => '🎯',
  Users: () => '👥',
  User: () => '👤',
  Trophy: () => '🏆',
  Award: () => '🏅',
  Menu: () => '☰',
  X: () => '✕',
  Lock: () => '🔒',
  Unlock: () => '🔓',
  ChevronRight: () => '›',
  Trash2: () => '🗑️' // Added missing icon
};

const { useState, useEffect } = React;
const Icons = window.Icons;

// *** FIX APPLIED: REMOVED THE FOLLOWING DESTRUCTURING LINE TO PREVENT ReferenceError: ***
// const { Fish, Package, TrendingUp, Target, Users, User, Trophy, Award, Menu, X, Lock, Unlock, ChevronRight } = Icons;

// Theme System - Defined outside component to prevent re-creation on every render
const themes = {
  dark: {
    name: 'Dark',
    primary: { from: 'gray-900', via: 'gray-800', to: 'gray-950' },
    primarySolid: 'gray-900',
    secondary: 'gray-800',
    surface: 'gray-950',
    border: 'gray-700',
    borderLight: 'gray-600',
    text: 'white',
    textMuted: 'gray-300',
    textDim: 'gray-400',
    hover: 'gray-800',
    accent: 'yellow-400',
    accentHover: 'yellow-500'
  },
  ocean: {
    name: 'Ocean Blue',
    primary: { from: 'blue-900', via: 'blue-800', to: 'blue-950' },
    primarySolid: 'blue-900',
    secondary: 'blue-800',
    surface: 'blue-950',
    border: 'blue-700',
    borderLight: 'blue-600',
    text: 'white',
    textMuted: 'blue-300',
    textDim: 'blue-400',
    hover: 'blue-800',
    accent: 'yellow-400',
    accentHover: 'yellow-500'
  },
  forest: {
    name: 'Forest Green',
    primary: { from: 'green-900', via: 'green-800', to: 'green-950' },
    primarySolid: 'green-900',
    secondary: 'green-800',
    surface: 'green-950',
    border: 'green-700',
    borderLight: 'green-600',
    text: 'white',
    textMuted: 'green-300',
    textDim: 'green-400',
    hover: 'green-800',
    accent: 'yellow-400',
    accentHover: 'yellow-500'
  },
  sunset: {
    name: 'Sunset Purple',
    primary: { from: 'purple-900', via: 'purple-800', to: 'purple-950' },
    primarySolid: 'purple-900',
    secondary: 'purple-800',
    surface: 'purple-950',
    border: 'purple-700',
    borderLight: 'purple-600',
    text: 'white',
    textMuted: 'purple-300',
    textDim: 'purple-400',
    hover: 'purple-800',
    accent: 'pink-400',
    accentHover: 'pink-500'
  },
  ember: {
    name: 'Warm Ember',
    primary: { from: 'orange-900', via: 'orange-800', to: 'orange-950' },
    primarySolid: 'orange-900',
    secondary: 'orange-800',
    surface: 'orange-950',
    border: 'orange-700',
    borderLight: 'orange-600',
    text: 'white',
    textMuted: 'orange-300',
    textDim: 'orange-400',
    hover: 'orange-800',
    accent: 'yellow-400',
    accentHover: 'yellow-500'
  },
  slate: {
    name: 'Cool Slate',
    primary: { from: 'slate-900', via: 'slate-800', to: 'slate-950' },
    primarySolid: 'slate-900',
    secondary: 'slate-800',
    surface: 'slate-950',
    border: 'slate-700',
    borderLight: 'slate-600',
    text: 'white',
    textMuted: 'slate-300',
    textDim: 'slate-400',
    hover: 'slate-800',
    accent: 'cyan-400',
    accentHover: 'cyan-500'
  }
};

// Booster Panel Component - Extracted outside to prevent re-rendering
const BoosterPanel = ({ player, theme, onBuyBooster }) => {
  const [activeBoosters, setActiveBoosters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Booster definitions
  const boosters = [
    { id: 'knowledge_scroll', name: 'Knowledge Scroll', cost: 10, duration: 30, icon: '📜', effect: '+20% XP' },
    { id: 'ancient_tome', name: 'Ancient Tome', cost: 20, duration: 60, icon: '📚', effect: '+20% XP' },
    { id: 'giants_potion', name: "Giant's Potion", cost: 10, duration: 30, icon: '🧪', effect: '+20% STR & LUCK' },
    { id: 'titans_elixir', name: "Titan's Elixir", cost: 20, duration: 60, icon: '⚗️', effect: '+20% STR & LUCK' }
  ];

  // Fetch active boosters
  React.useEffect(() => {
    loadActiveBoosters();
    const interval = setInterval(loadActiveBoosters, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadActiveBoosters = async () => {
    try {
      const response = await window.ApiService.getActiveBoosters();
      if (response.success) {
        setActiveBoosters(response.boosters || []);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load active boosters:', error);
      setLoading(false);
    }
  };

  const handleBuyBooster = async (boosterType) => {
    try {
      const response = await window.ApiService.buyBooster(boosterType);
      if (response.success) {
        // Reload boosters and notify parent
        await loadActiveBoosters();
        if (onBuyBooster) onBuyBooster(response);
      }
    } catch (error) {
      console.error('Failed to buy booster:', error);
      alert(error.message || 'Failed to purchase booster');
    }
  };

  const getTimeRemaining = (expiresAt) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires - now;

    if (diff <= 0) return 'Expired';

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="px-4 mt-3 space-y-2">
      <div className={`text-xs font-bold text-${theme.accent} mb-2`}>
        💫 Boosters
      </div>

      {/* Active Boosters */}
      {activeBoosters.length > 0 && (
        <div className={`bg-${theme.surface} rounded p-2 mb-2 space-y-1`}>
          <div className={`text-xs font-bold text-green-400`}>Active:</div>
          {activeBoosters.map((booster, idx) => {
            const boosterDef = boosters.find(b => b.id === booster.booster_type);
            return (
              <div key={idx} className={`text-xs text-${theme.textMuted}`}>
                {boosterDef?.icon} {boosterDef?.name}
                <div className="text-green-400">{getTimeRemaining(booster.expires_at)}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Available Boosters */}
      <div className="space-y-1">
        {boosters.map(booster => {
          const canAfford = player.relics >= booster.cost;
          return (
            <button
              key={booster.id}
              onClick={() => handleBuyBooster(booster.id)}
              disabled={!canAfford}
              className={`w-full text-left p-2 rounded text-xs ${
                canAfford
                  ? `bg-${theme.primarySolid} hover:bg-${theme.hover} border border-${theme.border}`
                  : 'bg-gray-700 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold">{booster.icon} {booster.name}</span>
                <span className="text-purple-400">{booster.cost} 🔮</span>
              </div>
              <div className={`text-${theme.textDim}`}>{booster.effect}</div>
              <div className={`text-${theme.textDim}`}>{booster.duration}min</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const FishingGame = ({ user, onLogout }) => {
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
      equippedRod: 'Willow Branch', // Default Rod from equipment.js
      equippedBait: 'Stale Bread Crust',
      ownedRods: ['Willow Branch'], // Start with the free rod
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
      discoveredFish: [], // Track all fish ever caught (even if sold)
      fishpediaStats: [], // Persistent fish catch statistics for Fishpedia
      unlockedBiomes: [1] // Track which biomes have been paid for (start with biome 1 unlocked)
    };

    // Server is the source of truth - default state is only used until server data loads
    return defaultPlayerState;
  });

  const [fishing, setFishing] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [lastCatch, setLastCatch] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [inventorySortOrder, setInventorySortOrder] = useState('value-desc'); // Default sort by value descending
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [funnyLine, setFunnyLine] = useState('');
  const [shopTab, setShopTab] = useState('rods'); // Persist shop tab selection
  const [dataLoaded, setDataLoaded] = useState(false); // Track if initial data loaded
  const [statCosts, setStatCosts] = useState({}); // Server-provided stat upgrade costs
  const [globalNotification, setGlobalNotification] = useState(null); // Global notifications for rare catches
  const [idleNotificationIndex, setIdleNotificationIndex] = useState(0); // Index for rotating idle messages
  const shownNotifications = React.useRef(new Set()); // Track timestamps of notifications we've already shown

  // Load player data from server
React.useEffect(() => {
  const loadData = async () => {
    try {
      const data = await window.ApiService.getPlayerData();
      setPlayer(data);
      setDataLoaded(true);
    } catch (err) {
      console.error('Failed to load from server:', err);
      setDataLoaded(true);
    }
  };
  loadData();
}, []);

// Handle global notification timeout (minimum 60 seconds)
React.useEffect(() => {
  if (globalNotification) {
    const timer = setTimeout(() => {
      setGlobalNotification(null);
    }, 60000); // 60 seconds minimum display time

    return () => clearTimeout(timer);
  }
}, [globalNotification]);

// Rotate idle notification messages every 60 seconds
React.useEffect(() => {
  const rotateIdleMessage = () => {
    setIdleNotificationIndex((prevIndex) => {
      const totalMessages = window.IDLE_NOTIFICATIONS?.length || 14;
      return (prevIndex + 1) % totalMessages;
    });
  };

  const interval = setInterval(rotateIdleMessage, 60000); // 60 seconds

  return () => clearInterval(interval);
}, []);

// Poll for global rare catches every 10 seconds
// Pause polling when a notification is active (for 30 seconds)
React.useEffect(() => {
  const pollGlobalCatches = async () => {
    try {
      const response = await window.ApiService.getGlobalCatches();
      if (response.catches && response.catches.length > 0) {
        const latestCatch = response.catches[0];
        const catchTimestamp = new Date(latestCatch.caught_at).getTime();

        // Check if we've already shown this notification
        if (shownNotifications.current.has(catchTimestamp)) {
          return; // Skip this catch, we've already shown it
        }

        // Clean up old timestamps (older than 5 minutes) to prevent memory leaks
        const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
        shownNotifications.current.forEach(timestamp => {
          if (timestamp < fiveMinutesAgo) {
            shownNotifications.current.delete(timestamp);
          }
        });

        // This is a new catch we haven't shown yet
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

  // If there's an active notification, wait 60 seconds before polling again
  // The notification will be cleared by another useEffect after 60 seconds,
  // which will trigger this effect to resume regular polling
  if (globalNotification) {
    const resumeTimeout = setTimeout(pollGlobalCatches, 60000);
    return () => clearTimeout(resumeTimeout);
  }

  // No active notification - poll immediately and continue every 15 seconds
  pollGlobalCatches();
  const interval = setInterval(pollGlobalCatches, 15000);

  return () => clearInterval(interval);
}, [globalNotification]);

const [currentTheme, setCurrentTheme] = useState(() => {
  const saved = localStorage.getItem('arcaneAnglerTheme');
  return saved && themes[saved] ? saved : 'dark';
});

const theme = themes[currentTheme];

// Helper to get theme class
const getThemeClass = (colorType) => {
  const color = theme[colorType];
  if (typeof color === 'object' && color.from) {
    return `from-${color.from} via-${color.via} to-${color.to}`;
  }
  return color;
};

// Save theme preference
useEffect(() => {
  localStorage.setItem('arcaneAnglerTheme', currentTheme);
}, [currentTheme]);

// Cast Line Button Color Options
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
  gray: { bg: 'bg-gray-600', hover: 'bg-gray-500', text: 'text-white', name: 'Steel Gray' },
};

const [castButtonColor, setCastButtonColor] = useState(() => {
  const saved = localStorage.getItem('castButtonColor');
  return saved && buttonColors[saved] ? saved : 'blue';
});

// Save button color preference
useEffect(() => {
  localStorage.setItem('castButtonColor', castButtonColor);
}, [castButtonColor]);

// Helper function to get display title from equipped title
const [equippedTitle, setEquippedTitle] = useState(null);

const getDisplayTitle = () => {
  if (!equippedTitle || !window.ACHIEVEMENTS) return null;
  const achievement = window.ACHIEVEMENTS.find(a => a.id === equippedTitle);
  return achievement ? achievement.title : null;
};

// Load equipped title from profile
useEffect(() => {
  const loadEquippedTitle = async () => {
    try {
      const profile = await window.ApiService.getMyProfile();
      if (profile && profile.profile && profile.profile.equipped_title) {
        setEquippedTitle(profile.profile.equipped_title);
      }
    } catch (error) {
      console.error('Failed to load equipped title:', error);
    }
  };
  loadEquippedTitle();
}, []);

// Auto-save to cloud - Reduced frequency since server is now authoritative
// State is already saved by individual action endpoints
// Note: Auto-save removed - all saves now happen via individual action endpoints
// (cast, sell, buy, equip, upgrade, etc.) for server-authoritative architecture

  // Constants (loaded from gameConstants.js)
  const rarities = window.RARITIES;
  const rarityColors = window.RARITY_COLORS;

  // Helper functions (loaded from rarityUtils.js)
  const getRarityColor = window.getRarityColor;
  const isGradientRarity = window.isGradientRarity;
  const getGradientTextStyle = window.getGradientTextStyle;
  const getGradientBorderStyle = window.getGradientBorderStyle;

  // Check and unlock achievements - using window.GameHelpers
  const checkAchievements = async () => {
    const newAchievements = window.GameHelpers.checkAchievements(player);

    if (newAchievements.length > 0) {
      const updatedAchievements = [...player.achievements, ...newAchievements];

      setPlayer(prev => ({
        ...prev,
        achievements: updatedAchievements
      }));

      // Sync achievements to server
      try {
        await window.ApiService.syncAchievements(updatedAchievements);
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
    player.gold, // For totalGoldInPocket achievements
    player.currentBiome
  ]);

  // No localStorage - server is the only source of truth

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Helper functions - now using window.GameHelpers
  const getCurrentBiomeFish = () => window.GameHelpers.getCurrentBiomeFish(player.currentBiome);
  const getAllCurrentBiomeFish = () => window.GameHelpers.getAllCurrentBiomeFish(player.currentBiome);
  const getTotalStats = () => window.GameHelpers.getTotalStats(player);
  const getBiomeRelicRange = (biome) => window.GameHelpers.getBiomeRelicRange(biome);
  const calculateRarity = () => window.GameHelpers.calculateRarity(getTotalStats().luck);
  const calculateFishCount = (rarity) => window.GameHelpers.calculateFishCount(rarity, getTotalStats().strength);
  const calculateTitanBonus = () => window.GameHelpers.calculateTitanBonus(getTotalStats().strength);
  const generateTreasureChest = () => window.GameHelpers.generateTreasureChest(player.currentBiome, getTotalStats().luck);
  const getFunnyLine = () => window.GameHelpers.getFunnyLine(player.currentBiome);

  const handleFish = async () => {
    if (cooldown > 0 || fishing) return;

    // Client-side UX check (bait availability)
    if (player.equippedBait !== 'Stale Bread Crust' && (player.baitInventory[player.equippedBait] || 0) <= 0) {
      alert("You need to buy or equip a different bait!");
      return;
    }

    setFishing(true);
    setCooldown(4);

    setTimeout(async () => {
      // Set funny line at the same time as showing the fish result
      setFunnyLine(getFunnyLine());

      try {
        // SERVER AUTHORITATIVE: Server determines the catch
        const response = await window.ApiService.castLine();

        if (response.success) {
          const result = response.result;

          // Set last catch for display
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
              xp: result.xpGained, // Show total XP, not per-fish
              gold: result.fish.gold || result.goldGained / result.count,
              relics: 0,
              titanBonus: result.titanBonus > 1 ? result.titanBonus : null,
              xpBonus: result.xpBonus
            });
          }

          // Show XP Bonus notification if active
          if (result.xpBonus && result.xpBonus > 1) {
            const bonusPercent = Math.round((result.xpBonus - 1) * 100);
            setTimeout(() => {
              alert(`✨ +${bonusPercent}% XP Boost Active!`);
            }, 100);
          }

          // Show level up notification with stat points gained
          if (result.leveledUp && result.statPointsGained) {
            setTimeout(() => {
              alert(`🎉 Level Up! You gained +${result.statPointsGained} Stat Points!`);
            }, 200);
          }

          // Update state with SERVER data only
          setPlayer(prev => ({
            ...prev,
            gold: result.newGold,
            xp: result.newXP,
            level: result.newLevel,
            relics: result.newRelics,
            statPoints: result.newStatPoints !== undefined ? result.newStatPoints : prev.statPoints,
            stamina: result.newStamina,
            equippedBait: result.equippedBait, // Server may have switched bait if it ran out
            baitInventory: {
              ...prev.baitInventory,
              [result.equippedBait]: result.baitQuantity
            }
          }));

          // Reload full player data to sync inventory
          const playerData = await window.ApiService.getPlayerData();
          setPlayer(playerData);
        }
      } catch (error) {
        console.error('Fishing failed:', error);
        alert('Failed to cast line. Please try again.');
      } finally {
        setFishing(false);
      }
    }, 1000);
  };

  const toggleLock = async (fishName) => {
    const isCurrentlyLocked = player.lockedFish.includes(fishName);

    try {
      if (isCurrentlyLocked) {
        // Unlock the fish
        await window.ApiService.unlockFish(fishName);
      } else {
        // Lock the fish
        await window.ApiService.lockFish(fishName);
      }

      // Reload player data to sync locked fish
      const playerData = await window.ApiService.getPlayerData();
      setPlayer(playerData);
    } catch (error) {
      console.error('Toggle lock failed:', error);
      alert('Failed to toggle fish lock. Please try again.');
    }
  };

  const sellFish = async (fishItem) => {
    if (player.lockedFish.includes(fishItem.name)) return;

    try {
      const response = await window.ApiService.sellFish(
        fishItem.name,
        fishItem.rarity,
        fishItem.count
      );

      if (response.success) {
        // Update state with server response
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold
        }));

        // Reload inventory from server
        const playerData = await window.ApiService.getPlayerData();
        setPlayer(playerData);
      }
    } catch (error) {
      console.error('Sell failed:', error);
      alert('Failed to sell fish. Please try again.');
    }
  };

  const sellAll = async () => {
    const unlockedFish = player.inventory.filter(f => !player.lockedFish.includes(f.name));

    if (unlockedFish.length === 0) {
      alert('No unlocked fish to sell!');
      return;
    }

    // Check if there are any Mythic, Exotic, or Arcane fish in unlocked inventory
    const rareRarities = ['Mythic', 'Exotic', 'Arcane'];
    const hasRareFish = unlockedFish.some(f => rareRarities.includes(f.rarity));

    if (hasRareFish) {
      const rareFishList = unlockedFish
        .filter(f => rareRarities.includes(f.rarity))
        .map(f => `${f.rarity}: ${f.name} (${f.count}x)`)
        .join('\n');

      const confirmed = window.confirm(
        `⚠️ WARNING ⚠️\n\nYou have ultra-rare fish that are not locked:\n\n${rareFishList}\n\nAre you sure you want to sell these extremely rare fish?`
      );

      if (!confirmed) {
        return; // User cancelled, don't sell
      }
    }

    try {
      const response = await window.ApiService.sellAll();

      if (response.success) {
        // Update state with server response
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold
        }));

        // Reload inventory from server
        const playerData = await window.ApiService.getPlayerData();
        setPlayer(playerData);
      }
    } catch (error) {
      console.error('Sell all failed:', error);
      alert('Failed to sell all fish. Please try again.');
    }
  };

  const sellByRarity = async (rarity) => {
    const fishToSell = player.inventory.filter(
      f => f.rarity === rarity && !player.lockedFish.includes(f.name)
    );

    if (fishToSell.length === 0) {
      alert(`No unlocked ${rarity} fish to sell!`);
      return;
    }

    try {
      const response = await window.ApiService.sellByRarity(rarity);

      if (response.success) {
        // Update state with server response
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold
        }));

        // Reload inventory from server
        const playerData = await window.ApiService.getPlayerData();
        setPlayer(playerData);
      }
    } catch (error) {
      console.error('Sell by rarity failed:', error);
      alert('Failed to sell fish by rarity. Please try again.');
    }
  };

  // Fetch stat upgrade costs from server
  const fetchStatCosts = async () => {
    try {
      const response = await window.ApiService.getStatCosts();
      if (response.success) {
        setStatCosts(response.costs);
      }
    } catch (error) {
      console.error('Failed to fetch stat costs:', error);
    }
  };

  const upgradeStat = async (stat) => {
    try {
      const response = await window.ApiService.upgradeStat(stat);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            [stat]: response.newValue
          },
          statPoints: response.newStatPoints
        }));

        // Update stat costs after upgrade (now always costs 1 stat point)
        setStatCosts(prev => ({
          ...prev,
          [stat]: {
            current: response.newValue,
            cost: response.nextCost
          }
        }));
      }
    } catch (error) {
      console.error('Upgrade failed:', error);
      alert(error.message || 'Failed to upgrade stat. Please try again.');
    }
  };

  const getFilteredInventory = () => {
    const totalStats = getTotalStats();
    const intelligenceBonus = 1 + (Number(totalStats.intelligence) * 0.02);

    let filtered = selectedRarity === 'all'
      ? [...player.inventory]
      : player.inventory.filter(f => f.rarity === selectedRarity);

    // Apply sorting
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

  // Equipment functions
  const buyRod = async (rodName) => {
    try {
      const response = await window.ApiService.buyRod(rodName);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold,
          ownedRods: [...prev.ownedRods, rodName],
          equippedRod: rodName
        }));

        // Also call equipRod endpoint
        await window.ApiService.equipRod(rodName);
      }
    } catch (error) {
      console.error('Buy rod failed:', error);
      alert(error.message || 'Failed to purchase rod. Not enough gold?');
    }
  };

  const equipRod = async (rodName) => {
    try {
      const response = await window.ApiService.equipRod(rodName);

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
      const response = await window.ApiService.buyBait(baitName, multiplier);

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
      alert(error.message || 'Failed to purchase bait. Not enough gold?');
    }
  };

  const equipBait = async (baitName) => {
    try {
      const response = await window.ApiService.equipBait(baitName);

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

  // Save progress and logout
  const handleSaveAndLogout = async () => {
    // No-op: Server already has all data from action endpoints
    onLogout();
  };

  // Global Notification Component
  const GlobalNotification = ({ theme }) => {
    const messageVariations = [
      '🎉 Congratulations, {username} has caught {fish}!',
      '✨ Amazing! {username} just reeled in {fish}!',
      '🌟 Incredible catch! {username} landed {fish}!',
      '🎊 Outstanding! {username} has hooked {fish}!',
      '💫 Remarkable! {username} just caught {fish}!',
      '🏆 Epic catch! {username} has snagged {fish}!',
      '⭐ Spectacular! {username} just pulled in {fish}!',
      '🎯 Wow! {username} successfully caught {fish}!',
      '🌠 Legendary! {username} has captured {fish}!',
      '🎪 Fantastic! {username} just hooked {fish}!'
    ];

    if (!globalNotification) {
      const idleMessage = window.IDLE_NOTIFICATIONS?.[idleNotificationIndex] || "The Arcane Depths await their next champion…";
      return <span className={`text-xs font-bold text-${theme.textMuted}`}>{idleMessage}</span>;
    }

    const template = messageVariations[globalNotification.messageIndex];
    const message = template
      .replace('{username}', globalNotification.username)
      .replace('{fish}', globalNotification.fishName);

    const getRarityColor = (rarity) => {
      switch (rarity) {
        case 'Mythic':
          return 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500';
        case 'Exotic':
          return 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400';
        case 'Arcane':
          return 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500';
        default:
          return 'text-purple-400';
      }
    };

    const parts = message.split(globalNotification.fishName);

    return (
      <div className="text-xs font-bold flex items-center justify-center flex-wrap gap-1">
        <span className={`text-${theme.textMuted}`}>{parts[0]}</span>
        <span className={getRarityColor(globalNotification.rarity)}>{globalNotification.fishName}</span>
        <span className={`text-${theme.textMuted}`}>{parts[1]}</span>
      </div>
    );
  };

  // Options Page Component
  const OptionsPage = () => (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6`}>
        <h2 className="text-[1.05rem] font-bold mb-6 flex items-center gap-2">
          <span>⚙️</span>
          Game Options
        </h2>

        {/* Theme Selection */}
        <div className="mb-8">
          <h3 className="text-[1.05rem] font-bold mb-4 text-${theme.accent}">Color Theme</h3>
          <p className={`text-sm text-${theme.textMuted} mb-4`}>
            Choose a color theme that's comfortable for your eyes
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(themes).map(([key, themeObj]) => (
              <button
                key={key}
                onClick={() => setCurrentTheme(key)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentTheme === key
                    ? `border-${theme.accent} bg-${theme.hover}`
                    : `border-${theme.border} hover:border-${theme.borderLight}`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{themeObj.name}</span>
                  {currentTheme === key && <span className="text-[1.05rem]">✓</span>}
                </div>

                <div className="flex gap-2 mt-3">
                  <div className={`w-8 h-8 rounded bg-${themeObj.primarySolid} border border-${theme.border}`}></div>
                  <div className={`w-8 h-8 rounded bg-${themeObj.secondary} border border-${theme.border}`}></div>
                  <div className={`w-8 h-8 rounded bg-${themeObj.surface} border border-${theme.border}`}></div>
                  <div className={`w-8 h-8 rounded bg-${themeObj.accent} border border-${theme.border}`}></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cast Line Button Color */}
        <div className="mb-8">
          <h3 className={`text-[1.05rem] font-bold mb-4 text-${theme.accent}`}>Cast Line Button Color</h3>
          <p className={`text-sm text-${theme.textMuted} mb-4`}>
            Customize the color of your fishing button
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.entries(buttonColors).map(([key, colorObj]) => (
              <button
                key={key}
                onClick={() => setCastButtonColor(key)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  castButtonColor === key
                    ? `border-${theme.accent} bg-${theme.hover}`
                    : `border-${theme.border} hover:border-${theme.borderLight}`
                }`}
              >
                <div className={`${colorObj.bg} ${colorObj.text} rounded py-2 px-3 text-xs font-bold mb-2 text-center`}>
                  Cast Line
                </div>
                <div className="text-xs text-center">{colorObj.name}</div>
                {castButtonColor === key && <div className="text-center mt-1 text-[1.05rem]">✓</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className={`bg-${theme.surface} p-4 rounded-lg border border-${theme.border}`}>
          <p className={`text-sm text-${theme.textMuted}`}>
            <strong>Current Theme:</strong> {theme.name}
          </p>
          <p className={`text-sm text-${theme.textMuted} mt-1`}>
            <strong>Cast Button:</strong> {buttonColors[castButtonColor].name}
          </p>
          <p className={`text-xs text-${theme.textDim} mt-2`}>
            Your preferences are automatically saved and will persist across sessions.
          </p>
        </div>

        {/* Discord Button */}
        <div className="mt-6">
          <a
            href="https://discord.gg/FNDKTC25ta"
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full py-4 px-6 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] transition-colors text-white font-bold text-center text-lg shadow-lg flex items-center justify-center gap-3`}
          >
            <svg width="24" height="24" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
            </svg>
            Join Our Discord Community
          </a>
        </div>
      </div>
    </div>
  );

  // Components
  const Sidebar = () => {
    const menuItems = [
      { id: 'fishing', icon: Icons.Fish, label: 'Fishing' },
      { id: 'equipment', icon: Icons.Award, label: 'Equipment' },
      { id: 'biomes', icon: Icons.Target, label: 'Biomes' },
      { id: 'inventory', icon: Icons.Package, label: 'Inventory' },
      { id: 'fishpedia', icon: Icons.Fish, label: 'Fishpedia' },
      { id: 'stats', icon: Icons.TrendingUp, label: 'Stats' },
      { id: 'leaderboard', icon: Icons.Trophy, label: 'Leaderboard' },
      { id: 'quests', icon: Icons.Target, label: 'Quests' },
      { id: 'guilds', icon: Icons.Users, label: 'Guilds' },
      { id: 'profile', icon: Icons.User, label: 'Profile' },
      { id: 'achievements', icon: Icons.Trophy, label: 'Achievements' },
      { id: 'options', icon: () => '⚙️', label: 'Options' }
    ];

    return (
      <>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-${theme.primarySolid} border-r-2 border-${theme.border} transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-${theme.hover} rounded`}
          >
            {Icons.X()}
          </button>

          {/* Logo */}
          <div className="p-4 flex justify-center border-b border-gray-700">
            <img src="/arcane-angler-200p.png" alt="Arcane Angler" className="w-32 h-auto" />
          </div>

          <nav className="flex-1 overflow-y-auto py-3">
            {menuItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => {
                  setCurrentPage(id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors text-left ${currentPage === id ? `bg-${theme.hover} text-white border-l-4 border-${theme.accent}` : `text-${theme.textMuted} hover:bg-${theme.hover} hover:text-white`}`}
              >
                <span className="w-4 flex-shrink-0">{Icon()}</span>
                <span>{label}</span>
              </button>
            ))}

            <div className="mx-4 my-3 border-t border-gray-700"></div>

            <div className="px-4 space-y-2">
              <div className={`text-xs font-bold text-${theme.accent}`}>
                {window.BIOMES[player.currentBiome].name}
              </div>
              <div className={`text-xs text-${theme.textMuted}`}>
                Biome {player.currentBiome} of {Object.keys(window.BIOMES).length}
              </div>
            </div>

            {/* Booster Panel */}
            <BoosterPanel
              player={player}
              theme={theme}
              onBuyBooster={async (response) => {
                // Refresh player data after buying booster
                const playerData = await window.ApiService.getPlayerData();
                setPlayer(playerData);
              }}
            />

            <div className="px-4 mt-3">
              <button
                onClick={handleSaveAndLogout}
                className="w-full px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-bold"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </>
    );
  };

  const FishingPage = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left Column: Main Interaction */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[1.05rem] sm:text-xl font-bold flex items-center gap-2">
              <span>🎣</span>
              {window.BIOMES[player.currentBiome].name}
            </h2>
            <button
              onClick={() => setCurrentPage('biomes')}
              className={`px-2 py-1 bg-${theme.hover} hover:bg-${theme.borderLight} rounded text-xs font-bold`}
            >
              Change
            </button>
          </div>

          <p className={`text-xs text-${theme.textMuted} mb-4 italic`}>
            {window.BIOMES[player.currentBiome].description}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-xs text-${theme.textDim} mb-1`}>🎣 Rod</div>
              <div className="text-sm font-bold">{player.equippedRod || 'None'}</div>
              {player.equippedRod && window.RODS[player.equippedRod] && (
                <div className="text-xs text-green-400 mt-1">
                  {window.RODS[player.equippedRod].str > 0 && `+${window.RODS[player.equippedRod].str} STR `}
                  {window.RODS[player.equippedRod].int > 0 && `+${window.RODS[player.equippedRod].int} INT `}
                  {window.RODS[player.equippedRod].luck > 0 && `+${window.RODS[player.equippedRod].luck} LUCK `}
                  {window.RODS[player.equippedRod].stam > 0 && `+${window.RODS[player.equippedRod].stam} STAM`}
                </div>
              )}
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-xs text-${theme.textDim} mb-1`}>🪱 Bait</div>
              <div className="text-sm font-bold">{player.equippedBait}</div>
              {player.equippedBait && player.equippedBait !== 'Stale Bread Crust' && (
                <div className={`text-xs text-${theme.textMuted} mt-1`}>
                  {player.baitInventory[player.equippedBait] || 0} left
                </div>
              )}
              {player.equippedBait && window.BAITS[player.equippedBait] && (
                <div className="text-xs text-green-400 mt-1">
                  {window.BAITS[player.equippedBait].str > 0 && `+${window.BAITS[player.equippedBait].str} STR `}
                  {window.BAITS[player.equippedBait].int > 0 && `+${window.BAITS[player.equippedBait].int} INT `}
                  {window.BAITS[player.equippedBait].luck > 0 && `+${window.BAITS[player.equippedBait].luck} LUCK`}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleFish}
            disabled={cooldown > 0 || fishing || (player.equippedBait !== 'Stale Bread Crust' && (player.baitInventory[player.equippedBait] || 0) <= 0)}
            className={`w-full py-3 rounded-lg font-bold text-base sm:text-[1.05rem] transition-all ${cooldown > 0 || fishing || (player.equippedBait !== 'Stale Bread Crust' && (player.baitInventory[player.equippedBait] || 0) <= 0) ? 'bg-gray-600 cursor-not-allowed text-gray-400' : `${buttonColors[castButtonColor].bg} hover:${buttonColors[castButtonColor].hover} ${buttonColors[castButtonColor].text} active:scale-95 shadow-lg`}`}
          >
            {fishing ? '🎣 Fishing...' : cooldown > 0 ? `⏱️ Cooldown: ${cooldown}s` : '🎣 Cast Line'}
          </button>
        </div>

        {/* Right Column: Catch Result */}
        <div className="lg:block hidden">
          {lastCatch ? (
            <div
              className={`p-3 sm:p-4 bg-${theme.surface} rounded-lg border-4 shadow-xl h-full`}
              style={isGradientRarity(lastCatch.rarity) ? {
                borderImage: `${rarityColors[lastCatch.rarity]} 1`,
                borderImageSlice: 1
              } : { borderColor: getRarityColor(lastCatch.rarity) }}
            >
              <div className={`text-center mb-3 pb-3 border-b border-${theme.border}`}>
                <p className={`text-xs sm:text-sm text-${theme.textMuted} italic`}>{funnyLine}</p>
              </div>

              <div className="text-center">
                <div className="text-xs uppercase tracking-wide mb-1" style={getGradientTextStyle(lastCatch.rarity)}>
                  {lastCatch.rarity}
                </div>
                <div className="text-xl sm:text-2xl font-bold mb-2">{lastCatch.fish}</div>

                {lastCatch.isTreasure ? (
                  <div className="space-y-1">
                    <div className="text-base sm:text-[1.05rem] text-yellow-400">🎁 Treasure Found!</div>
                    <div className="flex justify-center gap-4 text-sm sm:text-base">
                      <span className="text-yellow-400">+{lastCatch.gold} Gold</span>
                      <span className="text-purple-400">+{lastCatch.relics} Relics</span>
                    </div>
                    <div className="text-xs text-green-400">+{Math.floor(lastCatch.xp).toLocaleString()} XP</div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center items-center gap-3 text-sm sm:text-base mb-1">
                      <span className={`text-${theme.text}`}>Caught {lastCatch.count}x</span>
                      <span className={`text-${theme.textDim}`}>|</span>
                      <span className="text-green-400">+{Math.floor(lastCatch.xp).toLocaleString()} XP</span>
                    </div>
                    {lastCatch.titanBonus && (
                      <div className="text-xs text-orange-400">
                        ⚡ Titan Bonus: {lastCatch.titanBonus.toFixed(2)}x Gold Value!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6 h-full flex items-center justify-center`}>
              <p className={`text-${theme.textDim} text-sm italic`}>Cast your line to catch fish!</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Catch Result Below */}
      {lastCatch && (
        <div className="lg:hidden mt-4">
          <div
            className={`p-3 sm:p-4 bg-${theme.surface} rounded-lg border-4 shadow-xl`}
            style={isGradientRarity(lastCatch.rarity) ? {
              borderImage: `${rarityColors[lastCatch.rarity]} 1`,
              borderImageSlice: 1
            } : { borderColor: getRarityColor(lastCatch.rarity) }}
          >
            <div className={`text-center mb-3 pb-3 border-b border-${theme.border}`}>
              <p className={`text-xs sm:text-sm text-${theme.textMuted} italic`}>{funnyLine}</p>
            </div>

            <div className="text-center">
              <div className="text-xs uppercase tracking-wide mb-1" style={getGradientTextStyle(lastCatch.rarity)}>
                {lastCatch.rarity}
              </div>
              <div className="text-xl sm:text-2xl font-bold mb-2">{lastCatch.fish}</div>

              {lastCatch.isTreasure ? (
                <div className="space-y-1">
                  <div className="text-base sm:text-[1.05rem] text-yellow-400">🎁 Treasure Found!</div>
                  <div className="flex justify-center gap-4 text-sm sm:text-base">
                    <span className="text-yellow-400">+{lastCatch.gold} Gold</span>
                    <span className="text-purple-400">+{lastCatch.relics} Relics</span>
                  </div>
                  <div className="text-xs text-green-400">+{Math.floor(lastCatch.xp).toLocaleString()} XP</div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center items-center gap-3 text-sm sm:text-base mb-1">
                    <span className={`text-${theme.text}`}>Caught {lastCatch.count}x</span>
                    <span className={`text-${theme.textDim}`}>|</span>
                    <span className="text-green-400">+{Math.floor(lastCatch.xp).toLocaleString()} XP</span>
                  </div>
                  {lastCatch.titanBonus && (
                    <div className="text-xs text-orange-400">
                      ⚡ Titan Bonus: {lastCatch.titanBonus.toFixed(2)}x Gold Value!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fishing Stats - Full Width at Bottom */}
      <div className={`mt-4 bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
        <h3 className="font-bold mb-3 text-sm sm:text-base">Total Fishing Stats</h3>
        <div className={`text-xs sm:text-sm text-${theme.textMuted} space-y-1`}>
          <div>Base Stats: STR {player.stats.strength} | INT {player.stats.intelligence} | LUCK {player.stats.luck} | STAM {player.stats.stamina}</div>
          <div className="text-green-400">Total Stats: STR {getTotalStats().strength} | INT {getTotalStats().intelligence} | LUCK {getTotalStats().luck} | STAM {getTotalStats().stamina}</div>
          <div className={`border-t border-${theme.border} my-2 pt-2`}>
            <div>Normal fish: 1-{1 + Math.floor(getTotalStats().strength / 100)} per catch{getTotalStats().strength % 100 > 0 ? ` (${getTotalStats().strength % 100}% chance: 1-${2 + Math.floor(getTotalStats().strength / 100)})` : ''}</div>
            <div>Boss fish value: {(1 + (getTotalStats().strength * 0.02)).toFixed(2)}x multiplier</div>
            <div>Gold multiplier: {(1 + (Math.pow(getTotalStats().intelligence, 0.7) * 0.05)).toFixed(2)}x when selling</div>
            <div>Jackpot weight: +{getTotalStats().luck}% for Legendary/Mythic/Exotic/Arcane/Treasure</div>
            <div>Critical Catch: {Math.min(getTotalStats().stamina / 10, 50).toFixed(1)}% chance</div>
          </div>
        </div>
      </div>
    </div>
  );

  const EquipmentPage = () => {
    // shopTab is now managed at parent level to persist across re-renders
    const [tierTab, setTierTab] = useState('all');

    const getFilteredEquipment = () => {
      const equipment = shopTab === 'rods' ? window.RODS : window.BAITS;
      if (tierTab === 'all') return Object.entries(equipment);
      return Object.entries(equipment).filter(([name, item]) => item.tier === parseInt(tierTab));
    };

    return (
      <div className="max-w-6xl mx-auto">
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
          <h2 className="text-[1.05rem] sm:text-2xl font-bold mb-4">Equipment Shop</h2>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShopTab('rods')}
              className={`flex-1 py-3 rounded font-bold ${shopTab === 'rods' ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
            >
              {Icons.Fish()} Rods
            </button>
            <button
              onClick={() => setShopTab('baits')}
              className={`flex-1 py-3 rounded font-bold ${shopTab === 'baits' ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
            >
              🪱 Baits
            </button>
          </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setTierTab('all')}
              className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === 'all' ? 'bg-purple-600' : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
            >
              All Tiers
            </button>
            <button
              onClick={() => setTierTab('1')}
              className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '1' ? 'bg-purple-600' : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
            >
              Tier 1
            </button>
            <button
              onClick={() => setTierTab('2')}
              className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '2' ? 'bg-purple-600' : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
            >
              Tier 2
            </button>
            <button
              onClick={() => setTierTab('3')}
              className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '3' ? 'bg-purple-600' : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
            >
              Tier 3
            </button>
            <button
              onClick={() => setTierTab('4')}
              className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '4' ? 'bg-purple-600' : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
            >
              Tier 4
            </button>
          </div>

          
          {shopTab === 'rods' && (
            <div className="space-y-3">
              {getFilteredEquipment().map(([name, rod]) => {
                const isOwned = player.ownedRods.includes(name);
                const isEquipped = player.equippedRod === name;
                const canAfford = player.gold >= rod.price;

                return (
                  <div key={name} className={`p-4 rounded-lg border-2 ${isEquipped ? `bg-${theme.hover} border-yellow-400` : `bg-${theme.surface} border-${theme.border}`}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-bold text-base">{name}</div>
                        <div className={`text-xs text-${theme.textMuted} italic mt-1`}>{rod.desc}</div>
                      </div>
                      {isEquipped && <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold ml-2">EQUIPPED</span>}
                    </div>

                    <div className="text-sm text-green-400 mb-3">
                      {rod.str > 0 && `+${rod.str} STR `}
                      {rod.int > 0 && `+${rod.int} INT `}
                      {rod.luck > 0 && `+${rod.luck} LUCK `}
                      {rod.stam > 0 && `+${rod.stam} STAM`}
                    </div>

                    {isOwned ? (
                      <button
                        onClick={() => equipRod(name)}
                        disabled={isEquipped}
                        className={`w-full py-2 rounded font-bold text-sm ${isEquipped ? 'bg-gray-700 cursor-not-allowed' : `bg-${theme.accent} hover:bg-${theme.accentHover}`}`}
                      >
                        {isEquipped ? 'Equipped' : 'Equip'}
                      </button>
                    ) : (
                      <button
                        onClick={() => buyRod(name)}
                        disabled={!canAfford}
                        className={`w-full py-2 rounded font-bold text-sm ${canAfford ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                      >
                        Buy for {rod.price.toLocaleString()} Gold
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {shopTab === 'baits' && (
            <div className="space-y-3">
              {getFilteredEquipment().map(([name, bait]) => {
                const owned = player.baitInventory[name] || 0;
                const isEquipped = player.equippedBait === name;
                const isFree = bait.price === 0;

                return (
                  <div key={name} className={`p-4 rounded-lg border-2 ${isEquipped ? `bg-${theme.hover} border-yellow-400` : `bg-${theme.surface} border-${theme.border}`}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-bold text-base">{name}</div>
                        <div className={`text-xs text-${theme.textMuted} italic mt-1`}>{bait.desc}</div>
                      </div>
                      <div className="text-right ml-2">
                        {isEquipped && <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold block mb-1">EQUIPPED</span>}
                        {!isFree && <span className={`text-xs text-${theme.textDim}`}>Owned: {owned}</span>}
                      </div>
                    </div>

                    <div className="text-sm text-green-400 mb-3">
                      {bait.str > 0 && `+${bait.str} STR `}
                      {bait.int > 0 && `+${bait.int} INT `}
                      {bait.luck > 0 && `+${bait.luck} LUCK `}
                      {bait.stam > 0 && `+${bait.stam} STAM`}
                    </div>

                    <div className="space-y-2">
                      {!isFree && (
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => buyBait(name, 1)}
                            disabled={player.gold < bait.price * 1}
                            className={`py-2 rounded font-bold text-xs ${player.gold >= bait.price * 1 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                          >
                            Buy x1<br/>({(bait.price * 1).toLocaleString()}g)
                          </button>
                          <button
                            onClick={() => buyBait(name, 10)}
                            disabled={player.gold < bait.price * 10}
                            className={`py-2 rounded font-bold text-xs ${player.gold >= bait.price * 10 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                          >
                            Buy x10<br/>({(bait.price * 10).toLocaleString()}g)
                          </button>
                          <button
                            onClick={() => buyBait(name, 100)}
                            disabled={player.gold < bait.price * 100}
                            className={`py-2 rounded font-bold text-xs ${player.gold >= bait.price * 100 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                          >
                            Buy x100<br/>({(bait.price * 100).toLocaleString()}g)
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => equipBait(name)}
                        disabled={isEquipped || (!isFree && owned === 0)}
                        className={`w-full py-2 rounded font-bold text-sm ${isEquipped ? 'bg-gray-700 cursor-not-allowed' : (!isFree && owned === 0) ? 'bg-gray-700 cursor-not-allowed' : `bg-${theme.accent} hover:bg-${theme.accentHover}`}`}
                      >
                        {isEquipped ? 'Equipped' : 'Equip'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const BiomesPage = () => {
    const [biomePage, setBiomePage] = useState(1);
    const biomesPerPage = 5;
    const totalBiomes = Object.keys(window.BIOMES).length;
    const totalPages = Math.ceil(totalBiomes / biomesPerPage);

    const isBiomeUnlocked = (biomeId) => {
      // Ensure unlockedBiomes is an array (null safety)
      const unlockedBiomes = player.unlockedBiomes || [1];
      return unlockedBiomes.includes(biomeId);
    };

    const canUnlockBiome = (biomeId) => {
      const biome = window.BIOMES[biomeId];
      return player.level >= biome.unlockLevel && player.gold >= biome.unlockGold;
    };

    const visitOrUnlockBiome = async (biomeId) => {
      const isUnlocked = isBiomeUnlocked(biomeId);

      if (isUnlocked) {
        // Just change biome (already unlocked)
        try {
          const response = await window.ApiService.changeBiome(biomeId);

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
        // Check if player meets requirements before attempting to unlock
        const biome = window.BIOMES[biomeId];
        if (!biome) {
          alert('Biome not found');
          return;
        }

        if (player.level < biome.unlockLevel) {
          alert(`Level ${biome.unlockLevel} required to unlock ${biome.name}. You are currently level ${player.level}.`);
          return;
        }

        if (player.gold < biome.unlockGold) {
          alert(`${biome.unlockGold} gold required to unlock ${biome.name}. You currently have ${player.gold} gold.`);
          return;
        }

        // Unlock new biome
        try {
          const response = await window.ApiService.unlockBiome(biomeId);

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
          alert(error.message || 'Failed to unlock biome. Please try again.');
        }
      }
    };

    // Get biomes for the current page
    const getCurrentPageBiomes = () => {
      const startIndex = (biomePage - 1) * biomesPerPage + 1;
      const endIndex = Math.min(startIndex + biomesPerPage - 1, totalBiomes);

      const biomes = [];
      for (let i = startIndex; i <= endIndex; i++) {
        if (window.BIOMES[i]) {
          biomes.push([i.toString(), window.BIOMES[i]]);
        }
      }
      return biomes;
    };

    return (
      <div className="max-w-4xl mx-auto">
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
          <h2 className="text-[1.05rem] sm:text-2xl font-bold mb-6">Select Biome</h2>

          {/* Pagination Grid */}
          <div className="mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                const startBiome = (page - 1) * biomesPerPage + 1;
                const endBiome = Math.min(page * biomesPerPage, totalBiomes);

                return (
                  <button
                    key={page}
                    onClick={() => setBiomePage(page)}
                    className={`px-4 py-2 rounded font-bold text-sm ${
                      biomePage === page
                        ? `bg-${theme.accent} text-white`
                        : `bg-${theme.primarySolid} hover:bg-${theme.hover} text-${theme.textMuted}`
                    }`}
                  >
                    {startBiome}-{endBiome}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {getCurrentPageBiomes().map(([id, biome]) => {
              const biomeId = parseInt(id);
              const hasBeenUnlocked = isBiomeUnlocked(biomeId);
              const canAffordToUnlock = canUnlockBiome(biomeId);
              const isCurrent = biomeId === player.currentBiome;
              const isClickable = hasBeenUnlocked || canAffordToUnlock;
              const isLocked = !hasBeenUnlocked && !canAffordToUnlock;

              return (
                <div
                  key={id}
                  className={`p-4 sm:p-5 rounded-lg border-2 ${isCurrent ? `bg-${theme.hover} border-yellow-400` : isLocked ? `bg-${theme.surface} border-gray-700 opacity-60` : `bg-${theme.primarySolid} border-${theme.border} hover:border-${theme.borderLight} cursor-pointer`}`}
                  onClick={() => isClickable && !isCurrent && visitOrUnlockBiome(biomeId)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[1.05rem] font-bold">{biome.name}</h3>
                        {isCurrent && <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold">CURRENT</span>}
                      </div>
                      <div className={`text-sm text-${theme.textMuted} mt-1`}>Biome {id}</div>
                    </div>

                    {isLocked && (
                      <div className="text-right">
                        <div className={`text-xs text-${theme.textMuted}`}>Requires:</div>
                        <div className="text-sm font-bold">Level {biome.unlockLevel}</div>
                        {biome.unlockGold > 0 && (
                          <div className="text-sm text-yellow-400">{biome.unlockGold.toLocaleString()} Gold</div>
                        )}
                      </div>
                    )}
                  </div>

                  <p className={`text-xs sm:text-sm text-${theme.textMuted} italic mb-3`}>
                    {biome.description}
                  </p>

                  {biome.boatRequired && (
                    <div className={`text-xs text-${theme.textDim} mb-2`}>
                      🚣 Requires: {biome.boatRequired}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {Object.keys(biome.fish).map(rarity => (
                      <span
                        key={rarity}
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${getRarityColor(rarity)}20`,
                          color: getRarityColor(rarity),
                          border: `1px solid ${getRarityColor(rarity)}`
                        }}
                      >
                        {biome.fish[rarity].length} {rarity}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  const InventoryPage = () => {
    const filteredInventory = getFilteredInventory();
    const unlockedCount = filteredInventory.filter(f => !player.lockedFish.includes(f.name)).reduce((sum, f) => sum + f.count, 0);
    return (
      <div className="max-w-6xl mx-auto">
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-[1.05rem] sm:text-2xl font-bold flex items-center gap-2">
                <span className="w-5 flex-shrink-0">{Icons.Package()}</span>
                Inventory ({player.inventory.length})
              </h2>
              <button
                onClick={sellAll}
                disabled={unlockedCount === 0}
                className={`w-full sm:w-auto px-4 py-2 rounded font-bold text-sm ${unlockedCount > 0 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-600 cursor-not-allowed'}`}
              >
                Sell All Unlocked ({unlockedCount})
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <label htmlFor="sort-select" className={`text-sm text-${theme.textMuted} font-semibold whitespace-nowrap`}>
                Sort by:
              </label>
              <select
                id="sort-select"
                value={inventorySortOrder}
                onChange={(e) => setInventorySortOrder(e.target.value)}
                className={`w-full sm:w-64 px-3 py-2 rounded font-bold bg-${theme.primarySolid} text-white border-2 border-${theme.border} hover:border-${theme.borderLight} focus:border-${theme.accent} focus:outline-none cursor-pointer text-sm`}
              >
                <option value="value-desc">Total Value (High to Low)</option>
                <option value="value-asc">Total Value (Low to High)</option>
                <option value="quantity-desc">Quantity (High to Low)</option>
                <option value="quantity-asc">Quantity (Low to High)</option>
                <option value="name-asc">Fish Name (A to Z)</option>
                <option value="name-desc">Fish Name (Z to A)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedRarity('all')}
              className={`px-3 sm:px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${selectedRarity === 'all' ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
            >
              All
            </button>
            {rarities.map(rarity => {
              const count = player.inventory.filter(f => f.rarity === rarity).reduce((sum, f) => sum + f.count, 0);
              return (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`px-3 sm:px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${selectedRarity === rarity ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
                  style={{ borderLeft: `4px solid ${getRarityColor(rarity)}` }}
                >
                  {rarity} ({count})
                </button>
              );
            })}
          </div>

          {selectedRarity !== 'all' && (
            <div className="mb-4">
              <button
                onClick={() => sellByRarity(selectedRarity)}
                className="w-full bg-yellow-700 hover:bg-yellow-600 py-2 rounded font-bold text-sm"
              >
                Sell All {selectedRarity} Fish
              </button>
            </div>
          )}

          {filteredInventory.length === 0 ? (
            <p className={`text-center text-${theme.textMuted} py-12 text-sm sm:text-base`}>
              {selectedRarity === 'all' ? 'No fish caught yet. Start fishing!' : `No ${selectedRarity} fish in inventory.`}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredInventory.map((fish, idx) => {
                const isLocked = player.lockedFish.includes(fish.name);
                const totalStats = getTotalStats();
                const intelligenceBonus = 1 + (Number(totalStats.intelligence) * 0.02);
                const titanBonus = Number(fish.titanBonus) || 1;

                // Handle both old fish (with 'gold') and new fish (with 'baseGold')
                const baseGoldValue = Number(fish.baseGold) || Number(fish.gold) || 0;
                const sellValue = Math.floor(baseGoldValue * Number(fish.count) * intelligenceBonus * titanBonus);

                return (
                  <div
                    key={idx}
                    className={`bg-${theme.surface} p-3 sm:p-4 rounded-lg border-2 relative`}
                    style={isGradientRarity(fish.rarity) ? {
                      borderImage: `${rarityColors[fish.rarity]} 1`,
                      borderImageSlice: 1
                    } : { borderColor: getRarityColor(fish.rarity) }}
                  >
                    <button
                      onClick={() => toggleLock(fish.name)}
                      className={`absolute top-2 right-2 p-1.5 sm:p-2 bg-${theme.primarySolid} rounded hover:bg-${theme.hover}`}
                    >
                      {isLocked ? Icons.Lock() : Icons.Unlock()}
                    </button>

                    <div className="font-bold text-xs sm:text-sm" style={getGradientTextStyle(fish.rarity)}>
                      {fish.rarity}
                    </div>
                    <div className="text-base sm:text-[1.05rem] font-bold mt-1">{fish.name}</div>
                    <div className={`text-xs sm:text-sm text-${theme.textMuted} mb-1`}>Quantity: {fish.count}</div>
                    {titanBonus > 1 && (
                      <div className="text-xs text-orange-400 mb-2">⚡ {titanBonus.toFixed(2)}x Value</div>
                    )}
                    <button
                      onClick={() => sellFish(fish)}
                      disabled={isLocked}
                      className={`w-full py-2 rounded font-bold text-xs sm:text-sm ${isLocked ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-yellow-600 hover:bg-yellow-500'}`}
                    >
                      {isLocked ? '🔒 Locked' : `Sell for ${sellValue.toLocaleString()} Gold`}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const StatsPage = () => {
    const totalStats = getTotalStats();
    
    const statDescriptions = {
      strength: {
        title: "Strength",
        current: `1-${1 + Math.floor(totalStats.strength / 100)} normal fish per catch${totalStats.strength % 100 > 0 ? ` (${totalStats.strength % 100}% chance: 1-${2 + Math.floor(totalStats.strength / 100)})` : ''} | ${(1 + (totalStats.strength * 0.02)).toFixed(2)}x boss fish value`,
        perPoint: "Every 100 points: +1 guaranteed max fish | Every 1 point: +1% chance for +1 extra | Boss fish: +2% gold value per point",
        detail: `Normal fish (Common-Epic): Catch 1 to MaxCatch fish randomly. MaxCatch = 1 + FLOOR(STR/100), with (STR%100)% chance for +1 extra fish. Example: 150 STR = 50% chance for 1-2 fish, 50% chance for 1-3 fish. Boss fish (Legendary/Mythic/Exotic/Arcane): Always catch 1 but get Titan Bonus gold multiplier when selling.`
      },
      intelligence: {
        title: "Intelligence",
        current: `${(1 + (Math.pow(totalStats.intelligence, 0.7) * 0.05)).toFixed(2)}x gold when selling`,
        perPoint: "Diminishing returns (soft cap prevents inflation)",
        detail: `Multiplies gold earned when selling fish. Uses power curve formula to prevent economy breaking at high levels. Works multiplicatively with Titan Bonus.`
      },
      luck: {
        title: "Luck",
        current: `+${totalStats.luck}% weight for Jackpot tiers`,
        perPoint: "+1% weight for Legendary, Treasure Chest, Mythic, Exotic, Arcane per point",
        detail: `Jackpot Mechanic: Only affects ultra-rare fish (Legendary+) and Treasure Chests. Does NOT affect Common, Uncommon, Fine, Rare, or Epic fish.`
      },
      stamina: {
        title: "Stamina",
        current: `${Math.min(totalStats.stamina / 10, 50).toFixed(1)}% Critical Catch chance`,
        perPoint: "+0.1% crit chance per point (capped at 50%) | XP multiplier scales infinitely",
        detail: `Critical Catch multiplies XP gain. Below 500: base crit for 2x. 500+: 50% for 2x. 750+: 50% for 2x or 25% for 3x. 1000-1499: 50% for 3x. 1500-1999: 50% for 4x. 2000+: 50% for 5x+. Scales infinitely: every 500 stamina past 1000 adds +1x multiplier!`
      }
    };

    return (
      <div className="max-w-4xl mx-auto">
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
          <h2 className="text-[1.05rem] sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-5 flex-shrink-0">{Icons.TrendingUp()}</span>
            Character Stats
          </h2>

          {/* Display Stat Points */}
          <div className={`bg-${theme.surface} p-4 rounded-lg mb-6`}>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">⭐</span>
              <div className="text-center">
                <div className={`text-sm text-${theme.textMuted}`}>Stat Points Available</div>
                <div className="text-3xl font-bold text-purple-400">{player.statPoints}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Display player's base stats for upgrading */}
            {Object.entries(player.stats).map(([stat, value]) => {
              const info = statDescriptions[stat];
              const canAfford = player.statPoints >= 1; // Always costs 1 stat point
              return (
                <div key={stat} className={`bg-${theme.surface} p-4 sm:p-5 rounded-lg`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="font-bold text-base sm:text-[1.05rem]">{info.title}</div>
                      <div className={`text-sm text-${theme.textMuted}`}>Base Level {value}</div>
                      {totalStats[stat] !== value && <div className="text-xs text-green-400">Total: {totalStats[stat]} (Equipment)</div>}
                    </div>
                    <button
                      onClick={() => upgradeStat(stat)}
                      disabled={!canAfford}
                      className={`w-full sm:w-auto px-6 py-3 rounded font-bold text-sm ${
                        canAfford
                          ? 'bg-purple-600 hover:bg-purple-500'
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Upgrade (+1 Point)
                    </button>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="text-green-400 font-bold">
                      Current Total Effect: {info.current}
                    </div>
                    <div className={`text-${theme.textMuted}`}>
                      Per Point: {info.perPoint}
                    </div>
                    <div className={`text-${theme.textDim} italic`}>
                      {info.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const LeaderboardPage = React.memo(() => {
    const [selectedCategory, setSelectedCategory] = useState('level');
    const [selectedRegion, setSelectedRegion] = useState('global');
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper function to convert country code to flag emoji
    const getCountryFlag = (code) => {
      if (!code) return '-';
      const countries = {
        'AF': '🇦🇫', 'AL': '🇦🇱', 'DZ': '🇩🇿', 'AR': '🇦🇷', 'AM': '🇦🇲', 'AU': '🇦🇺', 'AT': '🇦🇹', 'AZ': '🇦🇿',
        'BH': '🇧🇭', 'BD': '🇧🇩', 'BY': '🇧🇾', 'BE': '🇧🇪', 'BO': '🇧🇴', 'BA': '🇧🇦', 'BR': '🇧🇷', 'BG': '🇧🇬',
        'KH': '🇰🇭', 'CA': '🇨🇦', 'CL': '🇨🇱', 'CN': '🇨🇳', 'CO': '🇨🇴', 'CR': '🇨🇷', 'HR': '🇭🇷', 'CU': '🇨🇺',
        'CY': '🇨🇾', 'CZ': '🇨🇿', 'DK': '🇩🇰', 'DO': '🇩🇴', 'EC': '🇪🇨', 'EG': '🇪🇬', 'SV': '🇸🇻', 'EE': '🇪🇪',
        'ET': '🇪🇹', 'FI': '🇫🇮', 'FR': '🇫🇷', 'GE': '🇬🇪', 'DE': '🇩🇪', 'GH': '🇬🇭', 'GR': '🇬🇷', 'GT': '🇬🇹',
        'HN': '🇭🇳', 'HK': '🇭🇰', 'HU': '🇭🇺', 'IS': '🇮🇸', 'IN': '🇮🇳', 'ID': '🇮🇩', 'IR': '🇮🇷', 'IQ': '🇮🇶',
        'IE': '🇮🇪', 'IL': '🇮🇱', 'IT': '🇮🇹', 'JM': '🇯🇲', 'JP': '🇯🇵', 'JO': '🇯🇴', 'KZ': '🇰🇿', 'KE': '🇰🇪',
        'KW': '🇰🇼', 'LV': '🇱🇻', 'LB': '🇱🇧', 'LY': '🇱🇾', 'LT': '🇱🇹', 'LU': '🇱🇺', 'MY': '🇲🇾', 'MX': '🇲🇽',
        'MD': '🇲🇩', 'MA': '🇲🇦', 'NP': '🇳🇵', 'NL': '🇳🇱', 'NZ': '🇳🇿', 'NI': '🇳🇮', 'NG': '🇳🇬', 'KP': '🇰🇵',
        'NO': '🇳🇴', 'OM': '🇴🇲', 'PK': '🇵🇰', 'PS': '🇵🇸', 'PA': '🇵🇦', 'PY': '🇵🇾', 'PE': '🇵🇪', 'PH': '🇵🇭',
        'PL': '🇵🇱', 'PT': '🇵🇹', 'PR': '🇵🇷', 'QA': '🇶🇦', 'RO': '🇷🇴', 'RU': '🇷🇺', 'SA': '🇸🇦', 'RS': '🇷🇸',
        'SG': '🇸🇬', 'SK': '🇸🇰', 'SI': '🇸🇮', 'ZA': '🇿🇦', 'KR': '🇰🇷', 'ES': '🇪🇸', 'LK': '🇱🇰', 'SE': '🇸🇪',
        'CH': '🇨🇭', 'SY': '🇸🇾', 'TW': '🇹🇼', 'TH': '🇹🇭', 'TN': '🇹🇳', 'TR': '🇹🇷', 'UA': '🇺🇦', 'AE': '🇦🇪',
        'GB': '🇬🇧', 'US': '🇺🇸', 'UY': '🇺🇾', 'UZ': '🇺🇿', 'VE': '🇻🇪', 'VN': '🇻🇳', 'YE': '🇾🇪'
      };
      return countries[code] || code;
    };
    const [globalStats, setGlobalStats] = useState(null);
    const [userNationality, setUserNationality] = useState(null);

    const categories = [
      { id: 'level', label: 'Total Level', icon: '📊' },
      { id: 'fish-caught', label: 'Total Fish Caught', icon: '🐟' },
      { id: 'casts', label: 'Total Casts', icon: '🎣' },
      { id: 'fish-sold', label: 'Fish Sold', icon: '💰' },
      { id: 'gold-owned', label: 'Gold Owned', icon: '🪙' },
      { id: 'gold-earned', label: 'Gold Earned', icon: '💵' },
      { id: 'relics-owned', label: 'Relics Owned', icon: '🔮' },
      { id: 'relics-earned', label: 'Relics Earned', icon: '✨' },
      { id: 'common', label: 'Common Caught', icon: '⚪' },
      { id: 'uncommon', label: 'Uncommon Caught', icon: '🟢' },
      { id: 'fine', label: 'Fine Caught', icon: '🔵' },
      { id: 'rare', label: 'Rare Caught', icon: '🟣' },
      { id: 'epic', label: 'Epic Caught', icon: '🟣' },
      { id: 'treasure', label: 'Treasure Found', icon: '📦' },
      { id: 'legendary', label: 'Legendary Caught', icon: '🟠' },
      { id: 'mythic', label: 'Mythic Caught', icon: '🔴' },
      { id: 'exotic', label: 'Exotic Caught', icon: '🌈' },
      { id: 'arcane', label: 'Arcane Caught', icon: '✨' },
      { id: 'stats-upgraded', label: 'Stats Upgraded', icon: '⬆️' },
      { id: 'strength', label: 'STR Stats', icon: '💪' },
      { id: 'intelligence', label: 'INT Stats', icon: '🧠' },
      { id: 'luck', label: 'Luck Stats', icon: '🍀' },
      { id: 'stamina', label: 'Stamina Stats', icon: '⚡' }
    ];

    useEffect(() => {
      loadUserNationality();
    }, []);

    useEffect(() => {
      loadLeaderboard();
      loadGlobalStats();
    }, [selectedCategory, selectedRegion]);

    const loadUserNationality = async () => {
      try {
        const profile = await window.ApiService.getMyProfile();
        if (profile && profile.profile && profile.profile.nationality) {
          setUserNationality(profile.profile.nationality);
        }
      } catch (error) {
        console.error('Failed to load user nationality:', error);
      }
    };

    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const nationality = selectedRegion === 'global' ? null : selectedRegion;
        const result = await window.ApiService.getLeaderboardByCategory(selectedCategory, nationality, 100);

        setLeaderboardData(result.leaderboard || []);
        setUserRank(result.userRank || null);
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadGlobalStats = async () => {
      try {
        const nationality = selectedRegion === 'global' ? null : selectedRegion;
        const stats = await window.ApiService.getGlobalStats(nationality);
        setGlobalStats(stats);
      } catch (error) {
        console.error('Failed to load global stats:', error);
      }
    };

    const getValueForCategory = (player, category) => {
      const valueMap = {
        'level': player.level,
        'fish-caught': player.total_fish_caught,
        'casts': player.total_casts,
        'fish-sold': player.fish_sold,
        'gold-owned': player.total_gold,
        'gold-earned': player.gold_earned,
        'relics-owned': player.total_relics,
        'relics-earned': player.relics_earned,
        'common': player.common_caught,
        'uncommon': player.uncommon_caught,
        'fine': player.fine_caught,
        'rare': player.rare_caught,
        'epic': player.epic_caught,
        'treasure': player.treasure_caught,
        'legendary': player.legendary_fish_count,
        'mythic': player.mythic_fish_count,
        'exotic': player.exotic_caught,
        'arcane': player.arcane_caught,
        'stats-upgraded': player.total_stats_upgraded,
        'strength': player.strength,
        'intelligence': player.intelligence,
        'luck': player.luck,
        'stamina': player.stamina
      };
      return valueMap[category] || 0;
    };

    const formatNumber = (num) => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return num.toLocaleString();
    };

    const getRankColor = (rank) => {
      if (rank === 1) return 'text-yellow-400';
      if (rank === 2) return 'text-gray-300';
      if (rank === 3) return 'text-orange-400';
      return `text-${theme.textMuted}`;
    };

    const getRankIcon = (rank) => {
      if (rank === 1) return '🥇';
      if (rank === 2) return '🥈';
      if (rank === 3) return '🥉';
      return `#${rank}`;
    };

    const getTitleName = (titleId) => {
      if (!titleId || !window.ACHIEVEMENTS) return null;
      const achievement = window.ACHIEVEMENTS.find(a => a.id === titleId);
      return achievement ? achievement.title : null;
    };

    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[1.05rem] font-bold flex items-center gap-2">
            <span>{Icons.Trophy()}</span>
            Leaderboards
          </h2>
        </div>

        {/* Global Stats Summary */}
        {globalStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4`}>
              <div className={`text-sm text-${theme.textMuted}`}>Total Players</div>
              <div className="text-[1.05rem] font-bold text-white">{globalStats.total_players?.toLocaleString() || 0}</div>
            </div>
            <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4`}>
              <div className={`text-sm text-${theme.textMuted}`}>Highest Level</div>
              <div className="text-[1.05rem] font-bold text-white">{globalStats.highest_level || 0}</div>
            </div>
            <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4`}>
              <div className={`text-sm text-${theme.textMuted}`}>Total Fish Caught</div>
              <div className="text-[1.05rem] font-bold text-white">{formatNumber(globalStats.total_fish_caught || 0)}</div>
            </div>
            <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4`}>
              <div className={`text-sm text-${theme.textMuted}`}>Total Arcane</div>
              <div className="text-[1.05rem] font-bold text-white">{globalStats.total_arcane_caught || 0}</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 mb-4`}>
          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4">
            {/* Region Filter */}
            <div>
              <label className={`block text-sm font-semibold text-${theme.textMuted} mb-2`}>
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className={`w-full px-4 py-3 bg-${theme.primarySolid} text-white rounded-lg border-2 border-${theme.border} focus:border-${theme.accent} focus:outline-none text-[1.05rem]`}
              >
                <option value="global">🌍 Global</option>
                {userNationality && (
                  <option value={userNationality}>🌏 {userNationality}</option>
                )}
              </select>
            </div>

            {/* Category Selection */}
            <div>
              <label className={`block text-sm font-semibold text-${theme.textMuted} mb-2`}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-3 bg-${theme.primarySolid} text-white rounded-lg border-2 border-${theme.border} focus:border-${theme.accent} focus:outline-none text-[1.05rem]`}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg overflow-hidden`}>
          {loading ? (
            <div className={`p-8 text-center text-${theme.textMuted}`}>
              Loading leaderboard...
            </div>
          ) : leaderboardData.length === 0 ? (
            <div className={`p-8 text-center text-${theme.textMuted}`}>
              No data available for this category
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`bg-${theme.primarySolid}`}>
                  <tr>
                    <th className={`px-4 py-3 text-left text-sm font-semibold text-${theme.textMuted}`}>Rank</th>
                    <th className={`px-4 py-3 text-left text-sm font-semibold text-${theme.textMuted}`}>Player</th>
                    <th className={`px-4 py-3 text-left text-sm font-semibold text-${theme.textMuted}`}>Region</th>
                    <th className={`px-4 py-3 text-right text-sm font-semibold text-${theme.textMuted}`}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((player, index) => {
                    const rank = index + 1;
                    return (
                      <tr
                        key={player.user_id}
                        className={`border-t border-${theme.border} ${
                          player.user_id === user?.id ? `bg-${theme.hover} bg-opacity-50` : `hover:bg-${theme.primarySolid}`
                        }`}
                      >
                        <td className={`px-4 py-3 font-bold ${getRankColor(rank)}`}>
                          {getRankIcon(rank)}
                        </td>
                        <td className="px-4 py-3 text-white font-semibold">
                          {player.profile_username}
                          {player.equipped_title && getTitleName(player.equipped_title) && (
                            <span className="text-yellow-400 ml-2">- {getTitleName(player.equipped_title)}</span>
                          )}
                        </td>
                        <td className={`px-4 py-3 text-${theme.textMuted}`}>
                          {getCountryFlag(player.nationality)}
                        </td>
                        <td className="px-4 py-3 text-right text-white font-bold">
                          {formatNumber(getValueForCategory(player, selectedCategory))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* User Rank (if outside top 100) */}
        {userRank && userRank.rank > 100 && (
          <div className={`mt-4 bg-${theme.hover} bg-opacity-50 rounded-lg p-4 border-2 border-${theme.accent}`}>
            <div className="flex justify-between items-center">
              <div>
                <div className={`text-sm text-${theme.textMuted} mb-1`}>Your Rank</div>
                <div className="text-[1.05rem] font-bold text-white">
                  #{userRank.rank} - {userRank.stats.profile_username}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm text-${theme.textMuted} mb-1`}>Your Score</div>
                <div className="text-[1.05rem] font-bold text-white">
                  {formatNumber(getValueForCategory(userRank.stats, selectedCategory))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  });

  const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingBio, setEditingBio] = useState(false);
    const [bioText, setBioText] = useState('');
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');
    const [equippedTitle, setEquippedTitle] = useState(null);
    const [privacy, setPrivacy] = useState('public');
    const [allowComments, setAllowComments] = useState(true);
    const [nationality, setNationality] = useState(null);
    const [nationalitySearch, setNationalitySearch] = useState('');
    const [nationalityDropdownOpen, setNationalityDropdownOpen] = useState(false);

    // Popular countries list with flags (using Unicode flag emojis)
    const countries = [
      { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
      { code: 'AL', name: 'Albania', flag: '🇦🇱' },
      { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
      { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
      { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
      { code: 'AU', name: 'Australia', flag: '🇦🇺' },
      { code: 'AT', name: 'Austria', flag: '🇦🇹' },
      { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
      { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
      { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
      { code: 'BY', name: 'Belarus', flag: '🇧🇾' },
      { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
      { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
      { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
      { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
      { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
      { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
      { code: 'CA', name: 'Canada', flag: '🇨🇦' },
      { code: 'CL', name: 'Chile', flag: '🇨🇱' },
      { code: 'CN', name: 'China', flag: '🇨🇳' },
      { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
      { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
      { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
      { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
      { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
      { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
      { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
      { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
      { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
      { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
      { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
      { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
      { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
      { code: 'FI', name: 'Finland', flag: '🇫🇮' },
      { code: 'FR', name: 'France', flag: '🇫🇷' },
      { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
      { code: 'DE', name: 'Germany', flag: '🇩🇪' },
      { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
      { code: 'GR', name: 'Greece', flag: '🇬🇷' },
      { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
      { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
      { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
      { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
      { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
      { code: 'IN', name: 'India', flag: '🇮🇳' },
      { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
      { code: 'IR', name: 'Iran', flag: '🇮🇷' },
      { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
      { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
      { code: 'IL', name: 'Israel', flag: '🇮🇱' },
      { code: 'IT', name: 'Italy', flag: '🇮🇹' },
      { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
      { code: 'JP', name: 'Japan', flag: '🇯🇵' },
      { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
      { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
      { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
      { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
      { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
      { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
      { code: 'LY', name: 'Libya', flag: '🇱🇾' },
      { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
      { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
      { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
      { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
      { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
      { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
      { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
      { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
      { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
      { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
      { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
      { code: 'KP', name: 'North Korea', flag: '🇰🇵' },
      { code: 'NO', name: 'Norway', flag: '🇳🇴' },
      { code: 'OM', name: 'Oman', flag: '🇴🇲' },
      { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
      { code: 'PS', name: 'Palestine', flag: '🇵🇸' },
      { code: 'PA', name: 'Panama', flag: '🇵🇦' },
      { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
      { code: 'PE', name: 'Peru', flag: '🇵🇪' },
      { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
      { code: 'PL', name: 'Poland', flag: '🇵🇱' },
      { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
      { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
      { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
      { code: 'RO', name: 'Romania', flag: '🇷🇴' },
      { code: 'RU', name: 'Russia', flag: '🇷🇺' },
      { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
      { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
      { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
      { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
      { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
      { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
      { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
      { code: 'ES', name: 'Spain', flag: '🇪🇸' },
      { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
      { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
      { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
      { code: 'SY', name: 'Syria', flag: '🇸🇾' },
      { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
      { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
      { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
      { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
      { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
      { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
      { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
      { code: 'US', name: 'United States', flag: '🇺🇸' },
      { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
      { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
      { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
      { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
      { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
    ];

    // Load profile data
    useEffect(() => {
      const loadProfile = async () => {
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
          setBioText(data.profile.bio || '');
          setEquippedTitle(data.profile.equipped_title);
          setPrivacy(data.profile.profile_privacy);
          setAllowComments(data.profile.allow_comments);
          setNationality(data.profile.nationality);
        } catch (err) {
          console.error('Failed to load profile:', err);
        }
        setLoading(false);
      };
      loadProfile();
    }, []);

    const handleChangeName = async () => {
      if (!newName.trim()) return;

      try {
        const result = await window.ApiService.changeProfileName(newName);
        setProfileData(prev => ({ ...prev, profile_username: result.newProfileName }));
        setPlayer(prev => ({ ...prev, relics: prev.relics - result.relicsSpent }));
        setEditingName(false);
        setNewName('');
        alert(`Profile name changed! ${result.relicsSpent > 0 ? `Cost: ${result.relicsSpent} relics` : 'First change is free!'}`);

        // Trigger cloud save to persist player data changes
        try {
          await window.ApiService.savePlayerData(player);
        } catch (saveErr) {
          console.error('Failed to save after name change:', saveErr);
        }
      } catch (err) {
        alert(err.message || 'Failed to change name');
      }
    };

    const handleUpdateBio = async () => {
      try {
        const result = await window.ApiService.updateBio(bioText);
        setProfileData(prev => ({ ...prev, bio: result.bio }));
        setEditingBio(false);
        alert('Bio updated successfully!');

        // Reload profile data to ensure persistence
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
        } catch (loadErr) {
          console.error('Failed to reload profile:', loadErr);
        }
      } catch (err) {
        alert(err.message || 'Failed to update bio');
      }
    };

    const handleEquipTitle = async (achievementId) => {
      try {
        await window.ApiService.equipTitle(achievementId);
        setEquippedTitle(achievementId);
        setProfileData(prev => ({ ...prev, equipped_title: achievementId }));
        alert('Title equipped!');

        // Reload profile data to ensure title persists
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
          setEquippedTitle(data.profile.equipped_title);
        } catch (loadErr) {
          console.error('Failed to reload profile:', loadErr);
        }
      } catch (err) {
        alert(err.message || 'Failed to equip title');
      }
    };

    const handlePrivacyChange = async (newPrivacy) => {
      try {
        await window.ApiService.updatePrivacy(newPrivacy, allowComments);
        setPrivacy(newPrivacy);
        alert('Privacy settings updated!');

        // Reload profile data to ensure persistence
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
          setPrivacy(data.profile.profile_privacy);
          setAllowComments(data.profile.allow_comments);
        } catch (loadErr) {
          console.error('Failed to reload profile:', loadErr);
        }
      } catch (err) {
        alert(err.message || 'Failed to update privacy');
      }
    };

    const handleCommentsToggle = async () => {
      try {
        await window.ApiService.updatePrivacy(privacy, !allowComments);
        setAllowComments(!allowComments);
        alert(`Comments ${!allowComments ? 'enabled' : 'disabled'}!`);

        // Reload profile data to ensure persistence
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
          setPrivacy(data.profile.profile_privacy);
          setAllowComments(data.profile.allow_comments);
        } catch (loadErr) {
          console.error('Failed to reload profile:', loadErr);
        }
      } catch (err) {
        alert(err.message || 'Failed to toggle comments');
      }
    };

    const handleNationalityChange = async (countryCode) => {
      try {
        await window.ApiService.updateNationality(countryCode);
        setNationality(countryCode);
        alert('Nationality updated!');

        // Reload profile data to ensure persistence
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
          setNationality(data.profile.nationality);
        } catch (loadErr) {
          console.error('Failed to reload profile:', loadErr);
        }
      } catch (err) {
        alert(err.message || 'Failed to update nationality');
      }
    };

    if (loading) {
      return (
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="text-[1.05rem]">Loading profile...</div>
        </div>
      );
    }

    // Get equipped title name
    const getEquippedTitleName = () => {
      if (!equippedTitle) return null;
      const achievement = window.ACHIEVEMENTS.find(a => a.id === equippedTitle);
      return achievement ? achievement.title : null;
    };

    const titleName = getEquippedTitleName();
    const nameChangeCount = profileData?.profile_name_changes || 0;
    const nameChangeCost = nameChangeCount === 0 ? 0 : 50;

    return (
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6 mb-4`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl">{Icons.User()}</div>
                <div>
                  <h2 className="text-[1.05rem] font-bold">
                    {profileData?.profile_username || user?.profileUsername || user?.username}
                    {titleName && <span className="text-yellow-400"> - {titleName}</span>}
                  </h2>
                  <div className={`text-sm text-${theme.textMuted}`}>
                    Member since: {profileData?.registration_date ? new Date(profileData.registration_date).toLocaleDateString() : 'N/A'}
                  </div>
                  {profileData?.profile_views > 0 && (
                    <div className={`text-xs text-${theme.textDim}`}>Profile views: {profileData.profile_views}</div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mt-4">
                {editingBio ? (
                  <div>
                    <textarea
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      maxLength={500}
                      placeholder="Write your bio (max 500 characters)..."
                      className={`w-full p-3 bg-${theme.surface} rounded border border-${theme.border} text-white resize-none`}
                      rows={4}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleUpdateBio}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded font-bold text-sm"
                      >
                        Save Bio
                      </button>
                      <button
                        onClick={() => {
                          setEditingBio(false);
                          setBioText(profileData?.bio || '');
                        }}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded font-bold text-sm"
                      >
                        Cancel
                      </button>
                      <span className={`text-xs text-${theme.textMuted} self-center ml-auto`}>
                        {bioText.length}/500
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={`text-${theme.textLight} italic mb-2 whitespace-pre-wrap`}>
                      {profileData?.bio || 'No bio yet. Click "Edit Bio" to add one!'}
                    </div>
                    <button
                      onClick={() => setEditingBio(true)}
                      className={`px-3 py-1 bg-${theme.hover} hover:bg-${theme.accent} rounded text-sm font-bold`}
                    >
                      Edit Bio
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setEditingName(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded font-bold text-sm"
            >
              Change Name ({nameChangeCost === 0 ? 'FREE' : `${nameChangeCost} 🔮`})
            </button>
          </div>
        </div>

        {/* Name Change Modal */}
        {editingName && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className={`bg-${theme.primarySolid} rounded-lg p-6 max-w-md w-full`}>
              <h3 className="text-[1.05rem] font-bold mb-4">Change Profile Name</h3>
              <p className={`text-sm text-${theme.textMuted} mb-4`}>
                {nameChangeCost === 0 ? 'Your first name change is FREE!' : `Cost: ${nameChangeCost} Relics (You have: ${player.relics})`}
              </p>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new profile name"
                maxLength={50}
                className={`w-full p-3 bg-${theme.surface} rounded border border-${theme.border} text-white mb-4`}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleChangeName}
                  disabled={!newName.trim() || (nameChangeCost > 0 && player.relics < nameChangeCost)}
                  className={`flex-1 px-4 py-2 rounded font-bold ${
                    !newName.trim() || (nameChangeCost > 0 && player.relics < nameChangeCost)
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-500'
                  }`}
                >
                  Confirm Change
                </button>
                <button
                  onClick={() => {
                    setEditingName(false);
                    setNewName('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6 mb-4`}>
          <h3 className="text-[1.05rem] font-bold mb-4 flex items-center gap-2">
            {Icons.TrendingUp()} Player Stats
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Guild</div>
              <div className="font-bold">Not in a guild (Coming Soon)</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Total Stats</div>
              <div className="font-bold">STR {getTotalStats().strength} | INT {getTotalStats().intelligence} | LUCK {getTotalStats().luck} | STAM {getTotalStats().stamina}</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Gold</div>
              <div className="font-bold text-yellow-400">{player.gold.toLocaleString()} (Earned: {player.totalGoldEarned.toLocaleString()})</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Relics</div>
              <div className="font-bold text-purple-400">{player.relics} (Earned: {player.totalRelicsEarned})</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Fish Caught</div>
              <div className="font-bold">{player.totalFishCaught.toLocaleString()}</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Fish Sold</div>
              <div className="font-bold">{player.totalFishSold.toLocaleString()}</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Treasure Chests</div>
              <div className="font-bold">🔮 {player.treasureChestsFound}</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Current Biome</div>
              <div className="font-bold">Biome {player.currentBiome} - {window.BIOMES[player.currentBiome]?.name}</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded col-span-1 sm:col-span-2`}>
              <div className={`text-${theme.textDim} mb-2`}>Rare Fish Caught</div>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="text-orange-400">⭐ Legendary: {player.legendariesCaught}</span>
                <span className="text-red-400">🔥 Mythic: {player.mythicsCaught}</span>
                <span className="text-cyan-400">💠 Exotic: {player.exoticsCaught}</span>
                <span className="text-purple-400">✨ Arcane: {player.arcanesCaught}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Equipped Title Section */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6 mb-4`}>
          <h3 className="text-[1.05rem] font-bold mb-4">Equipped Title</h3>
          <div className="mb-4">
            <div className={`bg-${theme.surface} p-4 rounded border-2 border-yellow-400`}>
              <div className="text-[1.05rem] font-bold text-yellow-400">
                {titleName || 'No title equipped'}
              </div>
              {titleName && (
                <button
                  onClick={() => handleEquipTitle(null)}
                  className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                >
                  Unequip Title
                </button>
              )}
            </div>
          </div>

          <div className="text-sm font-bold mb-2">Available Titles (from unlocked achievements):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {player.achievements.map(achId => {
              const ach = window.ACHIEVEMENTS.find(a => a.id === achId);
              if (!ach) return null;
              const isEquipped = equippedTitle === achId;

              return (
                <button
                  key={achId}
                  onClick={() => !isEquipped && handleEquipTitle(achId)}
                  disabled={isEquipped}
                  className={`p-3 rounded text-left ${
                    isEquipped
                      ? 'bg-yellow-600 cursor-not-allowed'
                      : `bg-${theme.surface} hover:bg-${theme.secondary}`
                  }`}
                >
                  <div className="font-bold">{ach.title}</div>
                  <div className={`text-xs text-${theme.textMuted}`}>{ach.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nationality/Region */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6 mb-4`}>
          <h3 className="text-[1.05rem] font-bold mb-4">Nationality / Region</h3>
          <p className={`text-sm text-${theme.textMuted} mb-4`}>
            Select your country for regional leaderboards (optional)
          </p>

          {/* Custom Searchable Dropdown */}
          <div className="relative">
            {/* Search Input */}
            <div className="mb-2">
              <input
                type="text"
                placeholder="Search countries..."
                value={nationalitySearch}
                onChange={(e) => setNationalitySearch(e.target.value)}
                onFocus={() => setNationalityDropdownOpen(true)}
                className={`w-full px-4 py-3 bg-${theme.surface} border border-${theme.border} rounded text-white placeholder-${theme.textDim} focus:outline-none focus:border-${theme.accent}`}
              />
            </div>

            {/* Selected Country Display */}
            {nationality && !nationalityDropdownOpen && (
              <div className="mb-2 p-3 bg-green-700 rounded flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[1.05rem]">{countries.find(c => c.code === nationality)?.flag}</span>
                  <span className="font-bold">{countries.find(c => c.code === nationality)?.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleNationalityChange(null);
                    setNationalitySearch('');
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Dropdown List */}
            {nationalityDropdownOpen && (
              <div className={`absolute z-10 w-full bg-${theme.primarySolid} border border-${theme.border} rounded shadow-lg max-h-64 overflow-y-auto`}>
                {/* None Option */}
                <button
                  onClick={() => {
                    handleNationalityChange(null);
                    setNationalitySearch('');
                    setNationalityDropdownOpen(false);
                  }}
                  className={`w-full p-3 text-left hover:bg-${theme.secondary} border-b border-${theme.border}`}
                >
                  <span className="font-bold text-gray-300">None</span>
                </button>

                {/* Filtered Countries */}
                {countries
                  .filter(country =>
                    country.name.toLowerCase().includes(nationalitySearch.toLowerCase())
                  )
                  .map(country => (
                    <button
                      key={country.code}
                      onClick={() => {
                        handleNationalityChange(country.code);
                        setNationalitySearch('');
                        setNationalityDropdownOpen(false);
                      }}
                      className={`w-full p-3 text-left hover:bg-${theme.secondary} border-b border-${theme.border} flex items-center gap-3 ${
                        nationality === country.code ? 'bg-green-700' : ''
                      }`}
                    >
                      <span className="text-[1.05rem]">{country.flag}</span>
                      <span className="font-bold">{country.name}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Click outside to close */}
          {nationalityDropdownOpen && (
            <div
              className="fixed inset-0 z-0"
              onClick={() => setNationalityDropdownOpen(false)}
            />
          )}
        </div>

        {/* Privacy Settings */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6 mb-4`}>
          <h3 className="text-[1.05rem] font-bold mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold mb-2 block">Profile Visibility</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePrivacyChange('public')}
                  className={`px-4 py-2 rounded font-bold text-sm ${
                    privacy === 'public' ? 'bg-green-600' : `bg-${theme.primarySolid} hover:bg-${theme.secondary}`
                  }`}
                >
                  Public
                </button>
                <button
                  onClick={() => handlePrivacyChange('friends')}
                  className={`px-4 py-2 rounded font-bold text-sm ${
                    privacy === 'friends' ? 'bg-yellow-600' : `bg-${theme.primarySolid} hover:bg-${theme.secondary}`
                  }`}
                >
                  Friends Only
                </button>
                <button
                  onClick={() => handlePrivacyChange('private')}
                  className={`px-4 py-2 rounded font-bold text-sm ${
                    privacy === 'private' ? 'bg-red-600' : `bg-${theme.primarySolid} hover:bg-${theme.secondary}`
                  }`}
                >
                  Private
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowComments}
                  onChange={handleCommentsToggle}
                  className="w-5 h-5"
                />
                <span className="font-bold">Allow profile comments</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AchievementsPage = () => {
    // Safety check for ACHIEVEMENTS
    if (!window.ACHIEVEMENTS || !Array.isArray(window.ACHIEVEMENTS)) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6 text-center`}>
            <p className={`text-${theme.textMuted}`}>Loading achievements...</p>
          </div>
        </div>
      );
    }

    const unlockedAchievements = window.ACHIEVEMENTS.filter(a => player.achievements.includes(a.id));
    const lockedAchievements = window.ACHIEVEMENTS.filter(a => !player.achievements.includes(a.id));

    return (
      <div className="max-w-4xl mx-auto">
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[1.05rem] sm:text-2xl font-bold flex items-center gap-2">
              <span>{Icons.Trophy()}</span>
              Achievements
            </h2>
            <div className={`text-sm text-${theme.textMuted}`}>
              {unlockedAchievements.length} / {window.ACHIEVEMENTS.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`bg-${theme.surface} rounded-full h-4 mb-8`}>
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 rounded-full transition-all duration-300 flex items-center justify-center"
              style={{ width: `${(unlockedAchievements.length / window.ACHIEVEMENTS.length) * 100}%` }}
            >
              <span className="text-xs font-bold text-black px-2">
                {Math.floor((unlockedAchievements.length / window.ACHIEVEMENTS.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Unlocked Achievements */}
          {unlockedAchievements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[1.05rem] font-bold mb-3 text-yellow-400">Unlocked</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unlockedAchievements.map(achievement => (
                  <div key={achievement.id} className={`bg-${theme.surface} p-4 rounded-lg border-2 border-yellow-400`}>
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-yellow-400">{achievement.name}</div>
                        <div className={`text-xs text-${theme.textMuted} mt-1`}>{achievement.desc}</div>
                        <div className="text-xs text-green-400 mt-2">✓ Completed</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked Achievements */}
          {lockedAchievements.length > 0 && (
            <div>
              <h3 className="text-[1.05rem] font-bold mb-3 text-gray-400">Locked</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lockedAchievements.map(achievement => {
                  const currentValue = player[achievement.stat] || 0;
                  const progress = Math.min(100, (currentValue / achievement.requirement) * 100);

                  return (
                    <div key={achievement.id} className={`bg-${theme.surface} p-4 rounded-lg border-2 border-gray-700 opacity-70`}>
                      <div className="flex items-start gap-3">
                        <div className="text-3xl grayscale">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-300">{achievement.name}</div>
                          <div className="text-xs text-gray-400 mt-1">{achievement.desc}</div>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>{currentValue} / {achievement.requirement}</span>
                            </div>
                            <div className="bg-gray-700 rounded-full h-2">
                              <div
                                className={`bg-${theme.accent} h-2 rounded-full transition-all duration-300`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const FishpediaPage = () => {
    const [selectedBiome, setSelectedBiome] = useState(1);
    const [selectedRarityFilter, setSelectedRarityFilter] = useState('all');

    // Show all 30 biomes
    const availableBiomes = Array.from({ length: 30 }, (_, i) => i + 1);

    const biome = window.BIOMES[selectedBiome];
    if (!biome) return null;

    // Get all fish from the selected biome
    const getAllFishInBiome = () => {
      const allFish = [];
      Object.entries(biome.fish).forEach(([rarity, fishList]) => {
        fishList.forEach(fish => {
          const isDiscovered = player.discoveredFish.includes(fish.name);
          // Get total caught from fishpediaStats (persistent tracking, not affected by selling)
          const fishpediaStat = player.fishpediaStats?.find(f => f.name === fish.name);

          allFish.push({
            ...fish,
            rarity,
            isDiscovered,
            totalCaught: fishpediaStat ? (fishpediaStat.totalCaught || 0) : 0
          });
        });
      });
      return allFish;
    };

    const fishList = getAllFishInBiome();
    const filteredFish = selectedRarityFilter === 'all'
      ? fishList
      : fishList.filter(f => f.rarity === selectedRarityFilter);

    // Calculate discovery progress
    const totalFish = fishList.length;
    const discoveredCount = fishList.filter(f => f.isDiscovered).length;
    const discoveryPercentage = Math.floor((discoveredCount / totalFish) * 100);

    return (
      <div className="max-w-6xl mx-auto">
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[1.05rem] sm:text-2xl font-bold flex items-center gap-2">
              <span>🐟</span>
              Fishpedia
            </h2>
            <div className={`text-sm text-${theme.textMuted}`}>
              {discoveredCount} / {totalFish} ({discoveryPercentage}%)
            </div>
          </div>

          {/* Biome Selection Dropdown */}
          <div className="mb-6">
            <label htmlFor="biome-select" className={`text-sm text-${theme.textMuted} mb-2 font-semibold block`}>
              Select Biome:
            </label>
            <select
              id="biome-select"
              value={selectedBiome}
              onChange={(e) => {
                setSelectedBiome(parseInt(e.target.value));
                setSelectedRarityFilter('all');
              }}
              className={`w-full sm:w-64 px-4 py-3 rounded-lg font-bold bg-${theme.primarySolid} text-white border-2 border-${theme.border} hover:border-${theme.accent} focus:border-${theme.accentHover} focus:outline-none cursor-pointer`}
            >
              {availableBiomes.map(biomeId => (
                <option key={biomeId} value={biomeId}>
                  Biome {biomeId}: {window.BIOMES[biomeId]?.name || `Biome ${biomeId}`}
                </option>
              ))}
            </select>
          </div>

          {/* Rarity Filter */}
          <div className="mb-6">
            <div className={`text-sm text-${theme.textMuted} mb-2 font-semibold`}>Filter by Rarity:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2">
              <button
                onClick={() => setSelectedRarityFilter('all')}
                className={`px-3 py-2 rounded font-bold text-xs ${
                  selectedRarityFilter === 'all' ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.secondary}`
                }`}
              >
                All
              </button>
              {rarities.map(rarity => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarityFilter(rarity)}
                  className={`px-3 py-2 rounded font-bold text-xs ${
                    selectedRarityFilter === rarity ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.secondary}`
                  }`}
                  style={{ borderLeft: `4px solid ${getRarityColor(rarity)}` }}
                >
                  {rarity}
                </button>
              ))}
            </div>
          </div>

          {/* Fish Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFish.map((fish, idx) => (
              <div
                key={idx}
                className={`bg-${theme.surface} p-4 rounded-lg border-2`}
                style={isGradientRarity(fish.rarity) ? {
                  borderImage: `${rarityColors[fish.rarity]} 1`,
                  borderImageSlice: 1
                } : { borderColor: getRarityColor(fish.rarity) }}
              >
                {fish.isDiscovered ? (
                  <>
                    {/* Discovered Fish */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-xs font-bold" style={getGradientTextStyle(fish.rarity)}>
                          {fish.rarity}
                        </div>
                        <div className="text-[1.05rem] font-bold mt-1">{fish.name}</div>
                      </div>
                      {fish.totalCaught > 0 && (
                        <div className={`text-sm text-${theme.textMuted} ml-2`}>
                          Caught: {fish.totalCaught}
                        </div>
                      )}
                    </div>

                    <div className={`text-sm text-${theme.textMuted} mb-3 italic`}>
                      {fish.desc}
                    </div>

                    <div className="flex gap-4 text-xs">
                      <div className="text-green-400">
                        <span className={`text-${theme.textDim}`}>XP:</span> {fish.xp}
                      </div>
                      <div className="text-yellow-400">
                        <span className={`text-${theme.textDim}`}>Gold:</span> {fish.gold}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Undiscovered Fish */}
                    <div className="text-center opacity-50">
                      <div className="text-6xl mb-2">❓</div>
                      <div className="text-[1.05rem] font-bold text-gray-400">???</div>
                      <div className="text-xs text-gray-500 mt-2">
                        Catch this fish to discover it!
                      </div>
                      <div className="text-xs font-bold mt-2" style={getGradientTextStyle(fish.rarity)}>
                        {fish.rarity}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {filteredFish.length === 0 && (
            <div className={`text-center text-${theme.textMuted} py-12`}>
              No {selectedRarityFilter} fish in this biome.
            </div>
          )}
        </div>
      </div>
    );
  };

  const QuestPage = () => {
    const [quests, setQuests] = useState({ daily: [], weekly: [], monthly: [] });
    const [serverTime, setServerTime] = useState({ daily: { text: '' }, weekly: { text: '' }, monthly: { text: '' } });
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('daily');

    useEffect(() => {
      loadQuests();
    }, []);

    const loadQuests = async () => {
      try {
        setLoading(true);
        const response = await window.ApiService.getQuests();
        if (response.success) {
          setQuests(response.quests);
          if (response.serverTime) {
            setServerTime(response.serverTime);
          }
        }
      } catch (err) {
        console.error('Failed to load quests:', err);
      } finally {
        setLoading(false);
      }
    };

    const getExpiresText = (type) => {
      // Use server-provided time instead of client time
      return serverTime[type]?.text || '';
    };

    const QuestCard = ({ quest, type }) => {
      const progressPercentage = Math.min((quest.current_progress / quest.target_amount) * 100, 100);
      const isCompleted = quest.completed;
      const rewardAmount = type === 'daily' ? 1 : type === 'weekly' ? 3 : 5;

      return (
        <div className={`bg-${theme.surface} rounded-lg p-4 border-2 ${isCompleted ? 'border-green-500' : `border-${theme.border}`} transition-all`}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <span className="text-xs text-gray-400 uppercase tracking-wide">{quest.category}</span>
              <p className="text-white text-sm mt-1">{quest.description}</p>
            </div>
            <div className="flex items-center gap-1 text-blue-400 font-bold ml-2">
              <span>🔮</span>
              <span className="text-sm">×{rewardAmount}</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">{quest.current_progress} / {quest.target_amount}</span>
              <span className={isCompleted ? 'text-green-400 font-bold' : 'text-gray-400'}>
                {isCompleted ? '✓ Completed' : `${Math.floor(progressPercentage)}%`}
              </span>
            </div>
            <div className={`bg-${theme.secondary} rounded-full h-2`}>
              <div className={`h-full rounded-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
        </div>
      );
    };

    const activeQuests = quests[selectedTab] || [];
    const completedCount = activeQuests.filter(q => q.completed).length;

    if (loading) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-8 text-center`}>
            <p>Loading quests...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-[1.05rem] sm:text-2xl font-bold flex items-center gap-2">
                <span>⭐</span>
                Quest Board
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Complete quests to earn relics!
              </p>
            </div>
            <button onClick={loadQuests} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
              🔄 Refresh
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 sm:gap-4 mb-6 overflow-x-auto">
            {[
              { id: 'daily', label: 'Daily', icon: '📅' },
              { id: 'weekly', label: 'Weekly', icon: '📆' },
              { id: 'monthly', label: 'Monthly', icon: '🗓️' }
            ].map(tab => {
              const tabQuests = quests[tab.id] || [];
              const tabCompleted = tabQuests.filter(q => q.completed).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                    selectedTab === tab.id ? 'bg-blue-600 text-white' : `bg-${theme.surface} text-gray-400 hover:bg-gray-700`
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  {tab.label}
                  <span className="ml-1 text-xs">({tabCompleted}/{tabQuests.length})</span>
                </button>
              );
            })}
          </div>

          {/* Quest Info */}
          <div className="mb-4 p-3 bg-blue-900 bg-opacity-30 rounded-lg text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                Completed: {completedCount} / {activeQuests.length}
              </span>
              <span className="text-gray-300">{getExpiresText(selectedTab)}</span>
            </div>
          </div>

          {/* Quests */}
          {activeQuests.length === 0 ? (
            <div className={`bg-${theme.surface} rounded-lg p-6 text-center text-gray-400`}>
              <p>No quests available.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {activeQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} type={selectedTab} />
              ))}
            </div>
          )}

          {/* Rewards Info */}
          <div className="mt-6 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-400 flex flex-wrap gap-4 justify-center">
              <span>🔮 Daily: 1 relic each</span>
              <span>🔮 Weekly: 3 relics each</span>
              <span>🔮 Monthly: 5 relics each</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PlaceholderPage = ({ title, icon }) => (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-8 sm:p-12 text-center`}>
        <div className="text-6xl mb-4"><span className="text-5xl">{icon()}</span></div>
        <h2 className="text-[1.05rem] sm:text-3xl font-bold mb-2">{title}</h2>
        <p className={`text-sm sm:text-base text-${theme.textMuted}`}>Coming soon! This feature is under development.</p>
      </div>
    </div>
  );

  // Saving Progress Overlay
  const SavingOverlay = () => {
    if (!savingProgress) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center">
        <div className={`bg-${theme.primarySolid} rounded-lg p-8 text-center border-4 border-${theme.accent} shadow-2xl`}>
          <div className="text-6xl mb-4 animate-pulse">💾</div>
          <h2 className="text-[1.05rem] font-bold mb-2">Saving Your Progress...</h2>
          <p className={`text-${theme.textMuted} mb-4`}>Please wait while we save your game data</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-400"></div>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <>
      <SavingOverlay />
      <div className={`min-h-screen bg-gradient-to-b from-${theme.primary.from} via-${theme.primary.via} to-${theme.primary.to} text-white flex`}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
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
              <GlobalNotification theme={theme} />
            </div>
          </div>
        </div>

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
              <GlobalNotification theme={theme} />
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {currentPage === 'fishing' && <FishingPage />}
          {currentPage === 'equipment' && <EquipmentPage />}
          {currentPage === 'biomes' && <BiomesPage />}
          {currentPage === 'inventory' && <InventoryPage />}
          {currentPage === 'stats' && <StatsPage />}
          {currentPage === 'leaderboard' && <LeaderboardPage />}

          {currentPage === 'quests' && <QuestPage />}
          {currentPage === 'guilds' && <PlaceholderPage title="Guilds" icon={Icons.Users} />}
          {currentPage === 'profile' && <ProfilePage />}
          {currentPage === 'achievements' && <AchievementsPage />}
          {currentPage === 'fishpedia' && <FishpediaPage />}
          {currentPage === 'options' && <OptionsPage />}
        </div>
      </div>
      </div>
    </>
  );
};

// Main App with Authentication
const App = () => {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Check if user is already logged in
  React.useEffect(() => {
    const checkAuth = async () => {
      if (window.ApiService.isLoggedIn()) {
        try {
          const result = await window.ApiService.verifyToken();
          setUser(result.user);
        } catch (err) {
          console.error('Token verification failed:', err);
          window.ApiService.logout();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    window.ApiService.logout();
    setUser(null);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-cyan-900">
        <div className="text-white text-[1.05rem]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return <FishingGame user={user} onLogout={handleLogout} />;
};

// Render the app

ReactDOM.render(<App />, document.getElementById('root'));
