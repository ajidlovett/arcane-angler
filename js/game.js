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
  Trash2: () => '🗑️'
};

const { useState, useEffect } = React;
const Icons = window.Icons;


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
const Chat = window.Chat;

const FishingGame = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('fishing');
  const [savingProgress, setSavingProgress] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
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
      equippedRod: 'rod_default',
      equippedBait: 'bait_default',
      ownedRods: ['rod_default'],
      rodLevels: { 'rod_default': 1 },
      baitInventory: { 'bait_default': 999999 },
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

  const [isAutoCasting, setIsAutoCasting] = useState(false);
  const [autoCastCooldown, setAutoCastCooldown] = useState(0);
  const [autoCastButtonCooldown, setAutoCastButtonCooldown] = useState(0);
  const [currentStamina, setCurrentStamina] = useState(0);
  const currentStaminaRef = React.useRef(0);
  const autoCastInterval = React.useRef(null);
  const autoCastCooldownInterval = React.useRef(null);
  const autoCastButtonCooldownInterval = React.useRef(null);
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [inventorySortOrder, setInventorySortOrder] = useState('value-desc');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [funnyLine, setFunnyLine] = useState('');
  const [shopTab, setShopTab] = useState('rods');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [statCosts, setStatCosts] = useState({});
  const [globalNotification, setGlobalNotification] = useState(null);
  const [idleNotificationIndex, setIdleNotificationIndex] = useState(0);
  const shownNotifications = React.useRef(new Set());
  const [activeBoosters, setActiveBoosters] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({ weather: 'clear', xpBonus: 0 });

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'alert',
    message: '',
    onConfirm: null
  });

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

  React.useEffect(() => {
    window.showAlert = showAlert;
    window.showConfirm = showConfirm;
    return () => {
      delete window.showAlert;
      delete window.showConfirm;
    };
  }, []);

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

  React.useEffect(() => {
    fetchActiveBoosters();
  }, []);

  React.useEffect(() => {
    if (currentPage === 'fishing' || currentPage === 'boosters') {
      fetchActiveBoosters();
    }
  }, [currentPage, fetchActiveBoosters]);

  const getBoosterTimeRemaining = (expiresAt) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires - now;

    if (diff <= 0) return 'Expired';

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

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

React.useEffect(() => {
  const fetchWeather = async () => {
    try {
      const weatherData = await window.ApiService.getBiomeWeather(player.currentBiome);
      setCurrentWeather(weatherData);
    } catch (err) {
      console.error('Failed to fetch weather:', err);
    }
  };
  fetchWeather();
}, [player.currentBiome]);

React.useEffect(() => {
  if (globalNotification) {
    const timer = setTimeout(() => {
      setGlobalNotification(null);
    }, 60000);

    return () => clearTimeout(timer);
  }
}, [globalNotification]);

React.useEffect(() => {
  const rotateIdleMessage = () => {
    setIdleNotificationIndex((prevIndex) => {
      const totalMessages = window.IDLE_NOTIFICATIONS?.length || 14;
      return (prevIndex + 1) % totalMessages;
    });
  };

  const interval = setInterval(rotateIdleMessage, 60000);

  return () => clearInterval(interval);
}, []);

React.useEffect(() => {
  let eventSource = null;
  let reconnectTimeout = null;

  const connectSSE = () => {
    try {
      const baseURL = window.ApiService.baseURL || 'https://arcaneangler.com/api';
      eventSource = new EventSource(`${baseURL}/game/global-catches/stream`);

      eventSource.onmessage = (event) => {
        try {
          const catchData = JSON.parse(event.data);
          const catchTimestamp = new Date(catchData.caught_at).getTime();

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

          if (!globalNotification) {
            setGlobalNotification({
              username: catchData.profile_username,
              fishName: catchData.fish_name,
              rarity: catchData.rarity,
              messageIndex: Math.floor(Math.random() * 10),
              timestamp: catchTimestamp
            });
          }
        } catch (error) {
          console.error('Error parsing SSE message:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        eventSource.close();

        reconnectTimeout = setTimeout(connectSSE, 5000);
      };

      eventSource.onopen = () => {
        console.log('SSE connection established');
      };
    } catch (error) {
      console.error('Failed to connect to SSE:', error);

      reconnectTimeout = setTimeout(connectSSE, 5000);
    }
  };

  connectSSE();

  return () => {
    if (eventSource) {
      eventSource.close();
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
    }
  };
}, []);

const [currentTheme, setCurrentTheme] = useState(() => {
  const saved = localStorage.getItem('arcaneAnglerTheme');
  return saved && themes[saved] ? saved : 'dark';
});

const theme = themes[currentTheme];

const getThemeClass = (colorType) => {
  const color = theme[colorType];
  if (typeof color === 'object' && color.from) {
    return `from-${color.from} via-${color.via} to-${color.to}`;
  }
  return color;
};

useEffect(() => {
  localStorage.setItem('arcaneAnglerTheme', currentTheme);
}, [currentTheme]);

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

useEffect(() => {
  localStorage.setItem('castButtonColor', castButtonColor);
}, [castButtonColor]);

const [equippedTitle, setEquippedTitle] = useState(null);

const getDisplayTitle = () => {
  if (!equippedTitle || !window.ACHIEVEMENTS) return null;
  const achievement = window.ACHIEVEMENTS.find(a => a.id === equippedTitle);
  return achievement ? achievement.title : null;
};

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


  const rarities = window.RARITIES;
  const rarityColors = window.RARITY_COLORS;

  const getRarityColor = window.getRarityColor;
  const isGradientRarity = window.isGradientRarity;
  const getGradientTextStyle = window.getGradientTextStyle;
  const getGradientBorderStyle = window.getGradientBorderStyle;
  const getGradientBackgroundStyle = window.getGradientBackgroundStyle;

  const checkAchievements = async () => {
    const newAchievements = window.GameHelpers.checkAchievements(player);

    if (newAchievements.length > 0) {
      const updatedAchievements = [...player.achievements, ...newAchievements];

      setPlayer(prev => ({
        ...prev,
        achievements: updatedAchievements
      }));

      try {
        await window.ApiService.syncAchievements(updatedAchievements);
      } catch (error) {
        console.error('Failed to sync achievements:', error);
      }
    }
  };

  useEffect(() => {
    if (currentPage === 'stats') {
      fetchStatCosts();
    }
  }, [currentPage]);

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


  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

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

    if (player.equippedBait !== 'bait_default' && (player.baitInventory[player.equippedBait] || 0) <= 0) {
      showAlert("You need to buy or equip a different bait!");
      return;
    }

    setFishing(true);
    setCooldown(6);

    setTimeout(async () => {
      setFunnyLine(getFunnyLine());

      try {
        const response = await window.ApiService.castLine();

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

          const playerData = await window.ApiService.getPlayerData();
          setPlayer(playerData);

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

  const performAutoCast = async () => {
    if (currentStaminaRef.current < 1) {
      stopAutoCast();
      showAlert("Auto-Cast stopped: Out of stamina!");
      return;
    }

    setFunnyLine(getFunnyLine());

    try {
      const response = await window.ApiService.autoCast();

      if (response.success) {
        const result = response.result;

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

        const playerData = await window.ApiService.getPlayerData();
        setPlayer(playerData);

        fetchActiveBoosters();

        const newStamina = currentStaminaRef.current - 1;
        currentStaminaRef.current = newStamina;
        setCurrentStamina(newStamina);

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

  const startAutoCast = () => {
    const maxStamina = getTotalStats().stamina;

    if (maxStamina < 1) {
      showAlert("Not enough stamina for auto-cast!");
      return;
    }

    currentStaminaRef.current = maxStamina;
    setCurrentStamina(maxStamina);
    setIsAutoCasting(true);

    performAutoCast();

    setAutoCastCooldown(12);
    autoCastCooldownInterval.current = setInterval(() => {
      setAutoCastCooldown(prev => {
        if (prev <= 1) return 12;
        return prev - 1;
      });
    }, 1000);

    autoCastInterval.current = setInterval(() => {
      performAutoCast();
    }, 12000);
  };

  const stopAutoCast = () => {
    setIsAutoCasting(false);
    setAutoCastCooldown(0);

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

  const toggleAutoCast = () => {
    if (autoCastButtonCooldown > 0) {
      return;
    }

    if (isAutoCasting) {
      stopAutoCast();
    } else {
      startAutoCast();
    }

    setAutoCastButtonCooldown(2);
    if (autoCastButtonCooldownInterval.current) {
      clearInterval(autoCastButtonCooldownInterval.current);
    }
    autoCastButtonCooldownInterval.current = setInterval(() => {
      setAutoCastButtonCooldown(prev => {
        if (prev <= 1) {
          if (autoCastButtonCooldownInterval.current) {
            clearInterval(autoCastButtonCooldownInterval.current);
            autoCastButtonCooldownInterval.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  React.useEffect(() => {
    return () => {
      if (autoCastInterval.current) clearInterval(autoCastInterval.current);
      if (autoCastCooldownInterval.current) clearInterval(autoCastCooldownInterval.current);
      if (autoCastButtonCooldownInterval.current) clearInterval(autoCastButtonCooldownInterval.current);
    };
  }, []);

  const toggleLock = async (fishName) => {
    const isCurrentlyLocked = player.lockedFish.includes(fishName);

    try {
      if (isCurrentlyLocked) {
        await window.ApiService.unlockFish(fishName);
      } else {
        await window.ApiService.lockFish(fishName);
      }

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
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold
        }));

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
            const response = await window.ApiService.sellAll();

            if (response.success) {
              setPlayer(prev => ({
                ...prev,
                gold: response.newGold
              }));

              const playerData = await window.ApiService.getPlayerData();
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
      const response = await window.ApiService.sellAll();

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold
        }));

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
        setPlayer(prev => ({
          ...prev,
          gold: response.newGold
        }));

        const playerData = await window.ApiService.getPlayerData();
        setPlayer(playerData);
      }
    } catch (error) {
      console.error('Sell by rarity failed:', error);
      showAlert('Failed to sell fish by rarity. Please try again.');
    }
  };

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

  const buyRod = async (rodId) => {
    const rod = window.getRodById(rodId);
    if (!rod) {
      showAlert('Rod not found!');
      return;
    }

    if (player.ownedRods.includes(rodId)) {
      showAlert('You already own this rod!');
      return;
    }

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

    if (currentLevel >= rod.max_level) {
      showAlert(`${rod.name} is already at max level!`);
      return;
    }

    const upgradeCost = window.GameHelpers.calculateRodUpgradeCost(rodId, currentLevel);

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

  const handleSaveAndLogout = async () => {
    onLogout();
  };


  


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
      <div className={`h-screen bg-gradient-to-b from-${theme.primary.from} via-${theme.primary.via} to-${theme.primary.to} text-white flex overflow-hidden`}>
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
              onClick={() => setChatOpen(true)}
              className={`p-2 hover:bg-${theme.hover} rounded text-sm`}
              title="Open Chat"
            >
              💬
            </button>
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
            getGradientBackgroundStyle={getGradientBackgroundStyle}
            isAutoCasting={isAutoCasting}
            toggleAutoCast={toggleAutoCast}
            autoCastCooldown={autoCastCooldown}
            autoCastButtonCooldown={autoCastButtonCooldown}
            currentStamina={currentStamina}
            currentWeather={currentWeather}
            equipRod={equipRod}
            equipBait={equipBait}
          />}
          {currentPage === 'equipment' && <EquipmentPage
            player={player}
            theme={theme}
            shopTab={shopTab}
            setShopTab={setShopTab}
            buyRod={buyRod}
            upgradeRod={upgradeRod}
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
            getGradientBackgroundStyle={getGradientBackgroundStyle}
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
            getGradientBackgroundStyle={getGradientBackgroundStyle}
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

      {}
      <Chat
        theme={theme}
        user={user}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
      />
      </div>
    </>
  );
};

const App = () => {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

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


ReactDOM.render(<App />, document.getElementById('root'));