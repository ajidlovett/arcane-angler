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

// Components are loaded via script tags in index.html and attached to window object
// Access them via: window.themes, window.Sidebar, window.FishingPage, etc.
const themes = window.themes;
const buttonColors = window.buttonColors;
const countries = window.countries;
const CustomModal = window.CustomModal;
const GlobalNotification = window.GlobalNotification;
const PlaceholderPage = window.PlaceholderPage;
const SavingOverlay = window.SavingOverlay;
const Sidebar = window.Sidebar;
const FishingPage = window.FishingPage;
const OptionsPage = window.OptionsPage;
const BoostersPage = window.BoostersPage;
const EquipmentPage = window.EquipmentPage;
const BiomesPage = window.BiomesPage;
const InventoryPage = window.InventoryPage;
const StatsPage = window.StatsPage;
const LeaderboardPage = window.LeaderboardPage;
const ProfilePage = window.ProfilePage;
const AchievementsPage = window.AchievementsPage;
const FishpediaPage = window.FishpediaPage;
const QuestPage = window.QuestPage;

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
      equippedRod: 'rod_default', // Default Rod ID from equipment.js
      equippedBait: 'bait_default', // Default Bait ID from equipment.js
      ownedRods: ['rod_default'], // Start with the default rod
      rodLevels: { 'rod_default': 1 }, // Track rod levels (default starts at 1)
      baitInventory: { 'bait_default': 999999 }, // Infinite default bait
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

  // Auto-Cast state
  const [isAutoCasting, setIsAutoCasting] = useState(false);
  const [autoCastCooldown, setAutoCastCooldown] = useState(0);
  const [currentStamina, setCurrentStamina] = useState(0); // Local stamina counter for auto-cast (for display)
  const currentStaminaRef = React.useRef(0); // Ref for synchronous stamina tracking
  const autoCastInterval = React.useRef(null);
  const autoCastCooldownInterval = React.useRef(null);
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
  const [activeBoosters, setActiveBoosters] = useState([]); // Track active boosters for display

  // Modal state - replaces window.alert and window.confirm
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'alert', // 'alert' or 'confirm'
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

  // Make showAlert and showConfirm globally available
  React.useEffect(() => {
    window.showAlert = showAlert;
    window.showConfirm = showConfirm;
    return () => {
      delete window.showAlert;
      delete window.showConfirm;
    };
  }, []);

  // Fetch active boosters - EVENT-DRIVEN (not polling)
  const fetchActiveBoosters = React.useCallback(async () => {
    try {
      const response = await window.ApiService.getActiveBoosters();
      if (response.boosters) {
        setActiveBoosters(response.boosters);
      }
    } catch (error) {
      console.error('Failed to fetch active boosters:', error);
    }
  }, []);

  // Fetch boosters on mount and when entering Fishing/Boosters page
  React.useEffect(() => {
    fetchActiveBoosters();
  }, []); // Only on mount

  // Refetch boosters when entering specific pages
  React.useEffect(() => {
    if (currentPage === 'fishing' || currentPage === 'boosters') {
      fetchActiveBoosters();
    }
  }, [currentPage, fetchActiveBoosters]);

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
  const calculateRarity = () => {
    const stats = getTotalStats();
    return window.GameHelpers.calculateRarity(
      stats.luck,
      player.equippedBait,
      stats.relicWeight || 0,
      stats.treasureWeight || 0
    );
  };
  const calculateFishCount = (rarity) => window.GameHelpers.calculateFishCount(rarity, getTotalStats().strength);
  const calculateTitanBonus = () => window.GameHelpers.calculateTitanBonus(getTotalStats().strength);
  const generateTreasureChest = () => window.GameHelpers.generateTreasureChest(player.currentBiome, getTotalStats().luck);
  const getFunnyLine = () => window.GameHelpers.getFunnyLine(player.currentBiome);

  const handleFish = async () => {
    if (cooldown > 0 || fishing) return;

    // Client-side UX check (bait availability)
    if (player.equippedBait !== 'bait_default' && (player.baitInventory[player.equippedBait] || 0) <= 0) {
      showAlert("You need to buy or equip a different bait!");
      return;
    }

    setFishing(true);
    setCooldown(6);

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

          // XP Bonus notification removed - now shown passively in Result Card

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

          // Refresh active boosters after cast (event-driven)
          fetchActiveBoosters();
        }
      } catch (error) {
        console.error('Fishing failed:', error);
        showAlert('Failed to cast line. Please try again.');
      } finally {
        setFishing(false);
      }
    }, 1000);
  };

  // Auto-Cast: Single cast execution
  const performAutoCast = async () => {
    // Check local stamina counter using ref (not database stamina)
    if (currentStaminaRef.current < 1) {
      stopAutoCast();
      showAlert("Auto-Cast stopped: Out of stamina!");
      return;
    }

    // Set funny line
    setFunnyLine(getFunnyLine());

    try {
      // Call auto-cast endpoint
      const response = await window.ApiService.autoCast();

      if (response.success) {
        const result = response.result;

        // Set last catch for display
        setLastCatch({
          fish: result.fish.name,
          rarity: result.rarity,
          count: result.count,
          xp: result.xpGained,
          gold: 0,
          relics: 0,
          titanBonus: 1,
          xpBonus: result.xpBonus,
          isAutoCast: true
        });

        // Update state with server data
        setPlayer(prev => ({
          ...prev,
          gold: result.newGold,
          xp: result.newXP,
          level: result.newLevel,
          relics: result.newRelics,
          stamina: result.newStamina,
          statPoints: result.newStatPoints !== undefined ? result.newStatPoints : prev.statPoints,
          equippedBait: result.equippedBait,
          baitInventory: {
            ...prev.baitInventory,
            [result.equippedBait]: result.baitQuantity
          }
        }));

        // Reload full player data to sync inventory
        const playerData = await window.ApiService.getPlayerData();
        setPlayer(playerData);

        // Refresh active boosters
        fetchActiveBoosters();

        // Decrement local stamina counter (both ref and state)
        const newStamina = currentStaminaRef.current - 1;
        currentStaminaRef.current = newStamina;
        setCurrentStamina(newStamina);

        // Check if stamina is now 0 (stop auto-cast)
        if (newStamina <= 0) {
          stopAutoCast();
          showAlert("Auto-Cast complete: All stamina consumed!");
        }
      }
    } catch (error) {
      console.error('Auto-cast failed:', error);
      stopAutoCast();
      showAlert('Auto-cast failed. Stopping auto-cast.');
    }
  };

  // Start Auto-Cast
  const startAutoCast = () => {
    const maxStamina = getTotalStats().stamina;

    if (maxStamina < 1) {
      showAlert("Not enough stamina for auto-cast!");
      return;
    }

    // Initialize local stamina counter to max (both ref and state)
    currentStaminaRef.current = maxStamina;
    setCurrentStamina(maxStamina);
    setIsAutoCasting(true);

    // Immediately perform first cast
    performAutoCast();

    // Set 12-second cooldown countdown
    setAutoCastCooldown(12);
    autoCastCooldownInterval.current = setInterval(() => {
      setAutoCastCooldown(prev => {
        if (prev <= 1) return 12;
        return prev - 1;
      });
    }, 1000);

    // Set interval for subsequent casts (12 seconds)
    autoCastInterval.current = setInterval(() => {
      performAutoCast();
    }, 12000);
  };

  // Stop Auto-Cast
  const stopAutoCast = () => {
    setIsAutoCasting(false);
    setAutoCastCooldown(0);

    // Reset local stamina counter to max (both ref and state)
    const maxStamina = getTotalStats().stamina;
    currentStaminaRef.current = maxStamina;
    setCurrentStamina(maxStamina);

    if (autoCastInterval.current) {
      clearInterval(autoCastInterval.current);
      autoCastInterval.current = null;
    }

    if (autoCastCooldownInterval.current) {
      clearInterval(autoCastCooldownInterval.current);
      autoCastCooldownInterval.current = null;
    }
  };

  // Toggle Auto-Cast
  const toggleAutoCast = () => {
    if (isAutoCasting) {
      stopAutoCast();
    } else {
      startAutoCast();
    }
  };

  // Cleanup auto-cast on unmount
  React.useEffect(() => {
    return () => {
      if (autoCastInterval.current) clearInterval(autoCastInterval.current);
      if (autoCastCooldownInterval.current) clearInterval(autoCastCooldownInterval.current);
    };
  }, []);

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
      showAlert('Failed to toggle fish lock. Please try again.');
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
      showAlert('Failed to sell fish. Please try again.');
    }
  };

  const sellAll = async () => {
    const unlockedFish = player.inventory.filter(f => !player.lockedFish.includes(f.name));

    if (unlockedFish.length === 0) {
      showAlert('No unlocked fish to sell!');
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

      showConfirm(
        `⚠️ WARNING ⚠️\n\nYou have ultra-rare fish that are not locked:\n\n${rareFishList}\n\nAre you sure you want to sell these extremely rare fish?`,
        async () => {
          // User confirmed - proceed with sell
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
            showAlert('Failed to sell all fish. Please try again.');
          }
        }
      );
      return; // Return early since the action is now async
    }

    // If no rare fish, proceed directly with sellAll
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
      showAlert('Failed to sell fish by rarity. Please try again.');
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

  const upgradeStat = async (stat, amount = 1) => {
    try {
      const response = await window.ApiService.upgradeStat(stat, amount);

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

        // Show success message if upgrading multiple at once
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
  const buyRod = async (rodId) => {
    const rod = window.getRodById(rodId);
    if (!rod) {
      showAlert('Rod not found!');
      return;
    }

    // Check if player already owns this rod
    if (player.ownedRods.includes(rodId)) {
      showAlert('You already own this rod!');
      return;
    }

    // Check if player can afford it
    if (player.gold < rod.base_cost) {
      showAlert(`Not enough gold! Need ${rod.base_cost.toLocaleString()} gold.`);
      return;
    }

    try {
      const response = await window.ApiService.buyRod(rodId);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          gold: prev.gold - rod.base_cost,
          ownedRods: [...prev.ownedRods, rodId],
          rodLevels: { ...prev.rodLevels, [rodId]: 1 },
          equippedRod: rodId
        }));

        // Also call equipRod endpoint
        await window.ApiService.equipRod(rodId);
        showAlert(`Purchased and equipped ${rod.name}!`);
      }
    } catch (error) {
      console.error('Buy rod failed:', error);
      showAlert(error.message || 'Failed to purchase rod');
    }
  };

  const upgradeRod = async (rodId) => {
    const rod = window.getRodById(rodId);
    if (!rod) {
      showAlert('Rod not found!');
      return;
    }

    const currentLevel = player.rodLevels[rodId] || 1;

    // Check if rod is at max level
    if (currentLevel >= rod.max_level) {
      showAlert(`${rod.name} is already at max level!`);
      return;
    }

    // Calculate upgrade cost
    const upgradeCost = window.GameHelpers.calculateRodUpgradeCost(rodId, currentLevel);

    // Check if player can afford it
    if (player.gold < upgradeCost) {
      showAlert(`Not enough gold! Need ${upgradeCost.toLocaleString()} gold.`);
      return;
    }

    try {
      const response = await window.ApiService.upgradeRod(rodId);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          gold: prev.gold - upgradeCost,
          rodLevels: { ...prev.rodLevels, [rodId]: currentLevel + 1 }
        }));

        showAlert(`${rod.name} upgraded to level ${currentLevel + 1}!`);
      }
    } catch (error) {
      console.error('Upgrade rod failed:', error);
      showAlert(error.message || 'Failed to upgrade rod');
    }
  };

  const equipRod = async (rodId) => {
    // Check if player owns this rod
    if (!player.ownedRods.includes(rodId)) {
      showAlert('You do not own this rod!');
      return;
    }

    try {
      const response = await window.ApiService.equipRod(rodId);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          equippedRod: rodId
        }));

        const rod = window.getRodById(rodId);
        showAlert(`Equipped ${rod.name}!`);
      }
    } catch (error) {
      console.error('Equip rod failed:', error);
    }
  };

  const buyBait = async (baitId, multiplier = 1) => {
    const bait = window.getBaitById(baitId);
    if (!bait) {
      showAlert('Bait not found!');
      return;
    }

    const totalCost = bait.price * multiplier;

    // Check if player can afford it
    if (player.gold < totalCost) {
      showAlert(`Not enough gold! Need ${totalCost.toLocaleString()} gold.`);
      return;
    }

    try {
      const response = await window.ApiService.buyBait(baitId, multiplier);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          gold: prev.gold - totalCost,
          baitInventory: {
            ...prev.baitInventory,
            [baitId]: (prev.baitInventory[baitId] || 0) + multiplier
          }
        }));

        showAlert(`Purchased ${multiplier}x ${bait.name}!`);
      }
    } catch (error) {
      console.error('Buy bait failed:', error);
      showAlert(error.message || 'Failed to purchase bait');
    }
  };

  const equipBait = async (baitId) => {
    try {
      const response = await window.ApiService.equipBait(baitId);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          equippedBait: baitId
        }));

        const bait = window.getBaitById(baitId);
        showAlert(`Equipped ${bait.name}!`);
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

  // Components

  


  // Main render
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
            isAutoCasting={isAutoCasting}
            toggleAutoCast={toggleAutoCast}
            autoCastCooldown={autoCastCooldown}
            currentStamina={currentStamina}
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
            setPlayer={setPlayer}
            theme={theme}
            setCurrentPage={setCurrentPage}
            showAlert={showAlert}
            getRarityColor={getRarityColor}
          />}
          {currentPage === 'inventory' && <InventoryPage
            player={player}
            theme={theme}
            selectedRarity={selectedRarity}
            setSelectedRarity={setSelectedRarity}
            inventorySortOrder={inventorySortOrder}
            setInventorySortOrder={setInventorySortOrder}
            getFilteredInventory={getFilteredInventory}
            getTotalStats={getTotalStats}
            sellAll={sellAll}
            sellByRarity={sellByRarity}
            sellFish={sellFish}
            toggleLock={toggleLock}
            rarities={rarities}
            getRarityColor={getRarityColor}
            isGradientRarity={isGradientRarity}
            rarityColors={rarityColors}
            getGradientTextStyle={getGradientTextStyle}
          />}
          {currentPage === 'stats' && <StatsPage
            player={player}
            theme={theme}
            getTotalStats={getTotalStats}
            upgradeStat={upgradeStat}
          />}
          {currentPage === 'boosters' && <BoostersPage
            player={player}
            setPlayer={setPlayer}
            theme={theme}
            showConfirm={showConfirm}
            showAlert={showAlert}
          />}
          {currentPage === 'leaderboard' && <LeaderboardPage
            user={user}
            theme={theme}
          />}

          {currentPage === 'quests' && <QuestPage
            theme={theme}
          />}
          {currentPage === 'guilds' && <PlaceholderPage title="Guilds" icon={Icons.Users} theme={theme} />}
          {currentPage === 'profile' && <ProfilePage
            user={user}
            player={player}
            setPlayer={setPlayer}
            theme={theme}
            showAlert={showAlert}
            getTotalStats={getTotalStats}
          />}
          {currentPage === 'achievements' && <AchievementsPage
            player={player}
            theme={theme}
          />}
          {currentPage === 'fishpedia' && <FishpediaPage
            player={player}
            theme={theme}
            rarities={rarities}
            getRarityColor={getRarityColor}
            isGradientRarity={isGradientRarity}
            rarityColors={rarityColors}
            getGradientTextStyle={getGradientTextStyle}
          />}
          {currentPage === 'options' && <OptionsPage
            theme={theme}
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
            buttonColors={buttonColors}
            castButtonColor={castButtonColor}
            setCastButtonColor={setCastButtonColor}
          />}
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
