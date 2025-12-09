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
  const checkAchievements = () => {
    const newAchievements = window.GameHelpers.checkAchievements(player);

    if (newAchievements.length > 0) {
      setPlayer(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements]
      }));
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
    setFunnyLine(getFunnyLine());

    setTimeout(async () => {
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
              isTreasure: true
            });
          } else {
            setLastCatch({
              fish: result.fish.name,
              rarity: result.rarity,
              count: result.count,
              xp: result.fish.xp || result.xpGained / result.count,
              gold: result.fish.gold || result.goldGained / result.count,
              relics: 0,
              titanBonus: result.titanBonus > 1 ? result.titanBonus : null
            });
          }

          // Update state with SERVER data only
          setPlayer(prev => ({
            ...prev,
            gold: result.newGold,
            xp: result.newXP,
            level: result.newLevel,
            relics: result.newRelics,
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

  const toggleLock = (fishName) => {
    setPlayer(prev => ({
      ...prev,
      lockedFish: prev.lockedFish.includes(fishName)
        ? prev.lockedFish.filter(f => f !== fishName)
        : [...prev.lockedFish, fishName]
    }));
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

  const sellAll = () => {
    const unlockedFish = player.inventory.filter(f => !player.lockedFish.includes(f.name));

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

    const totalStats = getTotalStats();
    const intelligenceBonus = 1 + (Number(totalStats.intelligence) * 0.02);

    const totalGold = unlockedFish.reduce((sum, fish) => {
      const titanBonus = Number(fish.titanBonus) || 1;
      // Handle both old fish (with 'gold') and new fish (with 'baseGold')
      const baseGoldValue = Number(fish.baseGold) || Number(fish.gold) || 0;
      return sum + Math.floor(baseGoldValue * Number(fish.count) * intelligenceBonus * titanBonus);
    }, 0);

    const totalFishCount = unlockedFish.reduce((sum, fish) => sum + Number(fish.count), 0);

    setPlayer(prev => ({
      ...prev,
      gold: Number(prev.gold) + totalGold,
      inventory: prev.inventory.filter(f => prev.lockedFish.includes(f.name)),
      totalFishSold: Number(prev.totalFishSold) + totalFishCount,
      totalGoldEarned: Number(prev.totalGoldEarned) + totalGold
    }));
  };

  const sellByRarity = (rarity) => {
    const fishToSell = player.inventory.filter(
      f => f.rarity === rarity && !player.lockedFish.includes(f.name)
    );
    const totalStats = getTotalStats();
    const intelligenceBonus = 1 + (Number(totalStats.intelligence) * 0.02);

    const totalGold = fishToSell.reduce((sum, fish) => {
      const titanBonus = Number(fish.titanBonus) || 1;
      return sum + Math.floor(Number(fish.baseGold) * Number(fish.count) * intelligenceBonus * titanBonus);
    }, 0);

    const totalFishCount = fishToSell.reduce((sum, fish) => sum + Number(fish.count), 0);

    setPlayer(prev => ({
      ...prev,
      gold: Number(prev.gold) + totalGold,
      inventory: prev.inventory.filter(f =>
        f.rarity !== rarity || prev.lockedFish.includes(f.name)
      ),
      totalFishSold: Number(prev.totalFishSold) + totalFishCount,
      totalGoldEarned: Number(prev.totalGoldEarned) + totalGold
    }));
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
          relics: response.newRelics
        }));

        // Update stat costs after upgrade
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

  // Components
  const Sidebar = () => {
    const menuItems = [
      { id: 'fishing', icon: Icons.Fish, label: 'Fishing' },
      { id: 'equipment', icon: Icons.Award, label: 'Equipment' },
      { id: 'biomes', icon: Icons.Target, label: 'Biomes' },
      { id: 'inventory', icon: Icons.Package, label: 'Inventory' },
      { id: 'fishpedia', icon: Icons.Fish, label: 'Fishpedia' },
      { id: 'stats', icon: Icons.TrendingUp, label: 'Stats' },
      { id: 'quests', icon: Icons.Target, label: 'Quests' },
      { id: 'guilds', icon: Icons.Users, label: 'Guilds' },
      { id: 'profile', icon: Icons.User, label: 'Profile' },
      { id: 'achievements', icon: Icons.Trophy, label: 'Achievements' }
    ];

    return (
      <>
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-blue-900 border-r-2 border-blue-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-blue-800 rounded"
          >
            {Icons.X()}
          </button>

          <div className="p-4 border-b border-blue-700">

            <div className="space-y-3">

              <div className="bg-blue-800 bg-opacity-50 rounded p-2">

                <div className="text-xs text-yellow-300">Gold</div>

                <div className="text-lg font-bold text-yellow-400">{player.gold.toLocaleString()}</div>

              </div>

              <div className="bg-blue-800 bg-opacity-50 rounded p-2">

                <div className="text-xs text-purple-300">Relics</div>

                <div className="text-lg font-bold text-purple-400">{player.relics}</div>

              </div>

            </div>

          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => {
                  setCurrentPage(id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-6 py-3 font-bold transition-colors text-left ${currentPage === id ? 'bg-blue-700 text-white border-l-4 border-yellow-400' : 'text-blue-300 hover:bg-blue-800 hover:text-white'}`}
              >
                <span className="w-5 flex-shrink-0">{Icon()}</span>
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-blue-700">
            <div className="text-sm font-bold text-yellow-400 mb-1">
              {window.BIOMES[player.currentBiome].name}
            </div>
            <div className="text-xs text-blue-300 mb-3">
              Biome {player.currentBiome} of {Object.keys(window.BIOMES).length}
            </div>
            
            <button
  onClick={handleSaveAndLogout}
  className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
  Logout
</button>

{user && (
  <div className="text-sm text-gray-500 mt-2">
    Playing as: {user.profileUsername || user.username}
  </div>
)}

            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset your save? This cannot be undone!')) {
                  localStorage.removeItem('arcaneAnglerSave');
                  window.location.reload();
                }
              }}
              className="w-full px-3 py-2 bg-red-900 hover:bg-red-800 rounded text-xs font-bold text-red-200"
            >
              {Icons.Trash2()} Reset Save
            </button>
          </div>
        </div>
      </>
    );
  };

  const FishingPage = () => (
    <div className="max-w-2xl mx-auto">
      <div className="hidden lg:block mb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 text-center">
            <div className="text-sm text-blue-300">Level</div>
            <div className="text-3xl font-bold">{player.level}</div>
          </div>
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 text-center">
            <div className="text-sm text-yellow-300">Gold</div>
            <div className="text-3xl font-bold text-yellow-400">{player.gold.toLocaleString()}</div>
          </div>
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 text-center">
            <div className="text-sm text-purple-300">Relics</div>
            <div className="text-3xl font-bold text-purple-400">{player.relics}</div>
          </div>
        </div>
        
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-blue-300">Experience Progress</div>
            <div className="text-sm font-bold text-white">{player.xp} / {player.xpToNext}</div>
          </div>
          <div className="bg-blue-950 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full transition-all duration-300 flex items-center justify-center"
              style={{ width: `${(player.xp / player.xpToNext) * 100}%` }}
            >
              <span className="text-xs font-bold text-white px-2">
                {Math.floor((player.xp / player.xpToNext) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span>{Icons.Fish()}</span>
            {window.BIOMES[player.currentBiome].name}
          </h2>
          <button
            onClick={() => setCurrentPage('biomes')}
            className="hidden lg:flex items-center gap-1 px-3 py-2 bg-blue-700 hover:bg-blue-600 rounded text-sm font-bold"
          >
            Change Biome {Icons.ChevronRight()}
          </button>
        </div>
        
        <p className="text-xs sm:text-sm text-blue-300 mb-4 italic">
          {window.BIOMES[player.currentBiome].description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-blue-950 p-3 rounded">
            <div className="text-xs text-blue-400 mb-1">🎣 Rod</div>
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
          <div className="bg-blue-950 p-3 rounded">
            <div className="text-xs text-blue-400 mb-1">🪱 Bait</div>
            <div className="text-sm font-bold">{player.equippedBait}</div>
            {player.equippedBait && player.equippedBait !== 'Stale Bread Crust' && (
              <div className="text-xs text-blue-300 mt-1">
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
          className={`w-full py-4 sm:py-6 rounded-lg font-bold text-lg sm:text-xl transition-all ${cooldown > 0 || fishing || (player.equippedBait !== 'Stale Bread Crust' && (player.baitInventory[player.equippedBait] || 0) <= 0) ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-lg'}`}
        >
          {fishing ? '🎣 Fishing...' : cooldown > 0 ? `⏱️ Cooldown: ${cooldown}s` : '🎣 Cast Line'}
        </button>

        {lastCatch && (
          <div
            className="mt-6 p-4 sm:p-6 bg-blue-950 rounded-lg border-4 shadow-xl"
            style={isGradientRarity(lastCatch.rarity) ? {
              borderImage: `${rarityColors[lastCatch.rarity]} 1`,
              borderImageSlice: 1
            } : { borderColor: getRarityColor(lastCatch.rarity) }}
          >
            <div className="text-center mb-4 pb-4 border-b border-blue-800">
              <p className="text-sm sm:text-base text-blue-300 italic">{funnyLine}</p>
            </div>

            <div className="text-center">
              <div className="text-xs sm:text-sm uppercase tracking-wide mb-1" style={getGradientTextStyle(lastCatch.rarity)}>
                {lastCatch.rarity}
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-2">{lastCatch.fish}</div>
              
              {lastCatch.isTreasure ? (
                <div className="space-y-2">
                  <div className="text-lg sm:text-xl text-yellow-400">🎁 Treasure Found!</div>
<div className="flex justify-center gap-4 text-base sm:text-lg">
<span className="text-yellow-400">+{lastCatch.gold} Gold</span>
<span className="text-purple-400">+{lastCatch.relics} Relics</span>
</div>
<div className="text-sm text-green-400">+{lastCatch.xp} XP</div>
</div>
) : (
<div>
<div className="text-lg sm:text-xl text-blue-200 mb-3">Caught: {lastCatch.count}x</div>
{lastCatch.titanBonus && (
<div className="text-xs sm:text-sm text-orange-400 mb-2">
⚡ Titan Bonus: {lastCatch.titanBonus.toFixed(2)}x Gold Value!
</div>
)}
<div className="flex justify-center gap-4 text-sm">
<span className="text-green-400">+{lastCatch.xp} XP</span>
</div>
</div>
)}
</div>
</div>
)}
    <div className="mt-6 p-4 bg-blue-950 rounded-lg">
      <h3 className="font-bold mb-2 text-sm sm:text-base">Total Fishing Stats</h3>
      <div className="text-xs sm:text-sm text-blue-300 space-y-1">
        <div>Base Stats: STR {player.stats.strength} | INT {player.stats.intelligence} | LUCK {player.stats.luck} | STAM {player.stats.stamina}</div>
        <div className="text-green-400">Total Stats: STR {getTotalStats().strength} | INT {getTotalStats().intelligence} | LUCK {getTotalStats().luck} | STAM {getTotalStats().stamina}</div>
        <div className="border-t border-blue-800 my-2 pt-2">
          <div>Fish per catch: {1 + Math.floor(getTotalStats().strength / 50)} - {2 + Math.floor(getTotalStats().strength / 50)} fish</div>
          <div>Next guaranteed: {50 - (getTotalStats().strength % 50)} Strength needed</div>
          <div>Gold bonus: +{(getTotalStats().intelligence * 2).toFixed(1)}%</div>
          <div>Luck bonus: +{getTotalStats().luck}%</div>
        </div>
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
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Equipment Shop</h2>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShopTab('rods')}
              className={`flex-1 py-3 rounded font-bold ${shopTab === 'rods' ? 'bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'}`}
            >
              {Icons.Fish()} Rods
            </button>
            <button
              onClick={() => setShopTab('baits')}
              className={`flex-1 py-3 rounded font-bold ${shopTab === 'baits' ? 'bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'}`}
            >
              🪱 Baits
            </button>
          </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setTierTab('all')}
              className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === 'all' ? 'bg-purple-600' : 'bg-blue-900 hover:bg-blue-800'}`}
            >
              All Tiers
            </button>
            <button
              onClick={() => setTierTab('1')}
              className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '1' ? 'bg-purple-600' : 'bg-blue-900 hover:bg-blue-800'}`}
            >
              Tier 1
            </button>
            <button
              onClick={() => setTierTab('2')}
              className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '2' ? 'bg-purple-600' : 'bg-blue-900 hover:bg-blue-800'}`}
            >
              Tier 2
            </button>
            <button
              onClick={() => setTierTab('3')}
              className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '3' ? 'bg-purple-600' : 'bg-blue-900 hover:bg-blue-800'}`}
            >
              Tier 3
            </button>
            <button
              onClick={() => setTierTab('4')}
              className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '4' ? 'bg-purple-600' : 'bg-blue-900 hover:bg-blue-800'}`}
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
                  <div key={name} className={`p-4 rounded-lg border-2 ${isEquipped ? 'bg-blue-700 border-yellow-400' : 'bg-blue-950 border-blue-800'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-bold text-base">{name}</div>
                        <div className="text-xs text-blue-300 italic mt-1">{rod.desc}</div>
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
                        className={`w-full py-2 rounded font-bold text-sm ${isEquipped ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
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
                  <div key={name} className={`p-4 rounded-lg border-2 ${isEquipped ? 'bg-blue-700 border-yellow-400' : 'bg-blue-950 border-blue-800'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-bold text-base">{name}</div>
                        <div className="text-xs text-blue-300 italic mt-1">{bait.desc}</div>
                      </div>
                      <div className="text-right ml-2">
                        {isEquipped && <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold block mb-1">EQUIPPED</span>}
                        {!isFree && <span className="text-xs text-blue-400">Owned: {owned}</span>}
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
                        className={`w-full py-2 rounded font-bold text-sm ${isEquipped ? 'bg-gray-700 cursor-not-allowed' : (!isFree && owned === 0) ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
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
          alert(error.message || 'Cannot unlock biome. Check level and gold requirements.');
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
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Select Biome</h2>

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
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-900 hover:bg-blue-800 text-blue-300'
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
                  className={`p-4 sm:p-5 rounded-lg border-2 ${isCurrent ? 'bg-blue-700 border-yellow-400' : isLocked ? 'bg-blue-950 border-gray-700 opacity-60' : 'bg-blue-900 border-blue-700 hover:border-blue-500 cursor-pointer'}`}
                  onClick={() => isClickable && !isCurrent && visitOrUnlockBiome(biomeId)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">{biome.name}</h3>
                        {isCurrent && <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold">CURRENT</span>}
                      </div>
                      <div className="text-sm text-blue-300 mt-1">Biome {id}</div>
                    </div>

                    {isLocked && (
                      <div className="text-right">
                        <div className="text-xs text-blue-300">Requires:</div>
                        <div className="text-sm font-bold">Level {biome.unlockLevel}</div>
                        {biome.unlockGold > 0 && (
                          <div className="text-sm text-yellow-400">{biome.unlockGold.toLocaleString()} Gold</div>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-blue-300 italic mb-3">
                    {biome.description}
                  </p>

                  {biome.boatRequired && (
                    <div className="text-xs text-blue-400 mb-2">
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
    const unlockedCount = filteredInventory.filter(f => !player.lockedFish.includes(f.name)).length;
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
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
              <label htmlFor="sort-select" className="text-sm text-blue-300 font-semibold whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={inventorySortOrder}
                onChange={(e) => setInventorySortOrder(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 rounded font-bold bg-blue-900 text-white border-2 border-blue-700 hover:border-blue-500 focus:border-blue-400 focus:outline-none cursor-pointer text-sm"
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
              className={`px-3 sm:px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${selectedRarity === 'all' ? 'bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'}`}
            >
              All
            </button>
            {rarities.map(rarity => {
              const count = player.inventory.filter(f => f.rarity === rarity).length;
              return (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`px-3 sm:px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${selectedRarity === rarity ? 'bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'}`}
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
            <p className="text-center text-blue-300 py-12 text-sm sm:text-base">
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
                    className="bg-blue-950 p-3 sm:p-4 rounded-lg border-2 relative"
                    style={isGradientRarity(fish.rarity) ? {
                      borderImage: `${rarityColors[fish.rarity]} 1`,
                      borderImageSlice: 1
                    } : { borderColor: getRarityColor(fish.rarity) }}
                  >
                    <button
                      onClick={() => toggleLock(fish.name)}
                      className="absolute top-2 right-2 p-1.5 sm:p-2 bg-blue-900 rounded hover:bg-blue-800"
                    >
                      {isLocked ? Icons.Lock() : Icons.Unlock()}
                    </button>

                    <div className="font-bold text-xs sm:text-sm" style={getGradientTextStyle(fish.rarity)}>
                      {fish.rarity}
                    </div>
                    <div className="text-base sm:text-lg font-bold mt-1">{fish.name}</div>
                    <div className="text-xs sm:text-sm text-blue-300 mb-1">Quantity: {fish.count}</div>
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
        current: `${1 + Math.floor(totalStats.strength / 50)}-${2 + Math.floor(totalStats.strength / 50)} fish per catch`,
        perPoint: "+2% chance to catch an additional fish per point",
        detail: `Every 50 points guarantees +1 fish. You currently have a ${(totalStats.strength % 50) * 2}% chance for a bonus fish.`
      },
      intelligence: {
        title: "Intelligence",
        current: `+${(totalStats.intelligence * 2).toFixed(1)}% gold when selling`,
        perPoint: "+2% bonus gold from selling fish per point",
        detail: `Increases the amount of gold earned when selling fish. Works multiplicatively with Titan Bonus.`
      },
      luck: {
        title: "Luck",
        current: `${totalStats.luck}% increased weight for rare fish`,
        perPoint: "+1% weight multiplier for all rarities except Common per point",
        detail: `Increases the probability weight of all fish rarities except Common. Higher Luck = better drop rates for rare fish.`
      },
      stamina: {
        title: "Stamina",
        current: `${totalStats.stamina * 3} minutes offline progression`,
        perPoint: "+3 minutes of offline progression per point",
        detail: `Allows you to earn fish and XP while offline. The game continues fishing automatically based on your stats.`
      }
    };

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-5 flex-shrink-0">{Icons.TrendingUp()}</span>
            Character Stats
          </h2>
          
          <div className="space-y-4">
            {/* Display player's base stats for upgrading */}
            {Object.entries(player.stats).map(([stat, value]) => {
              const info = statDescriptions[stat];
              const upgradeCost = statCosts[stat]?.cost || '...';
              const canAfford = typeof upgradeCost === 'number' && player.relics >= upgradeCost;
              return (
                <div key={stat} className="bg-blue-950 p-4 sm:p-5 rounded-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="font-bold text-base sm:text-lg">{info.title}</div>
                      <div className="text-sm text-blue-300">Base Level {value}</div>
                      {totalStats[stat] !== value && <div className="text-xs text-green-400">Total: {totalStats[stat]} (Equipment)</div>}
                    </div>
                    <button
                      onClick={() => upgradeStat(stat)}
                      disabled={!canAfford || typeof upgradeCost !== 'number'}
                      className={`w-full sm:w-auto px-6 py-3 rounded font-bold text-sm ${
                        canAfford
                          ? 'bg-purple-600 hover:bg-purple-500'
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Upgrade ({upgradeCost} 💎)
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="text-green-400 font-bold">
                      Current Total Effect: {info.current}
                    </div>
                    <div className="text-blue-300">
                      Per Point: {info.perPoint}
                    </div>
                    <div className="text-blue-400 italic">
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

    // Popular countries list with flags (using Unicode flag emojis)
    const countries = [
      { code: 'US', name: 'United States', flag: '🇺🇸' },
      { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
      { code: 'CA', name: 'Canada', flag: '🇨🇦' },
      { code: 'AU', name: 'Australia', flag: '🇦🇺' },
      { code: 'DE', name: 'Germany', flag: '🇩🇪' },
      { code: 'FR', name: 'France', flag: '🇫🇷' },
      { code: 'ES', name: 'Spain', flag: '🇪🇸' },
      { code: 'IT', name: 'Italy', flag: '🇮🇹' },
      { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
      { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
      { code: 'NO', name: 'Norway', flag: '🇳🇴' },
      { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
      { code: 'FI', name: 'Finland', flag: '🇫🇮' },
      { code: 'PL', name: 'Poland', flag: '🇵🇱' },
      { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
      { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
      { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
      { code: 'JP', name: 'Japan', flag: '🇯🇵' },
      { code: 'CN', name: 'China', flag: '🇨🇳' },
      { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
      { code: 'IN', name: 'India', flag: '🇮🇳' },
      { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
      { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
      { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
      { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
      { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
      { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
      { code: 'RU', name: 'Russia', flag: '🇷🇺' },
      { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
      { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
      { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
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
          <div className="text-2xl">Loading profile...</div>
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
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl">{Icons.User()}</div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {profileData?.profile_username || user?.profileUsername || user?.username}
                    {titleName && <span className="text-yellow-400"> - {titleName}</span>}
                  </h2>
                  <div className="text-sm text-blue-300">
                    Member since: {profileData?.registration_date ? new Date(profileData.registration_date).toLocaleDateString() : 'N/A'}
                  </div>
                  {profileData?.profile_views > 0 && (
                    <div className="text-xs text-blue-400">Profile views: {profileData.profile_views}</div>
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
                      className="w-full p-3 bg-blue-950 rounded border border-blue-700 text-white resize-none"
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
                      <span className="text-xs text-blue-300 self-center ml-auto">
                        {bioText.length}/500
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-blue-200 italic mb-2 whitespace-pre-wrap">
                      {profileData?.bio || 'No bio yet. Click "Edit Bio" to add one!'}
                    </div>
                    <button
                      onClick={() => setEditingBio(true)}
                      className="px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded text-sm font-bold"
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
              Change Name ({nameChangeCost === 0 ? 'FREE' : `${nameChangeCost} 💎`})
            </button>
          </div>
        </div>

        {/* Name Change Modal */}
        {editingName && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-blue-900 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Change Profile Name</h3>
              <p className="text-sm text-blue-300 mb-4">
                {nameChangeCost === 0 ? 'Your first name change is FREE!' : `Cost: ${nameChangeCost} Relics (You have: ${player.relics})`}
              </p>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new profile name"
                maxLength={50}
                className="w-full p-3 bg-blue-950 rounded border border-blue-700 text-white mb-4"
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
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 mb-4">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            {Icons.TrendingUp()} Player Stats
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-blue-950 p-3 rounded">
              <div className="text-blue-400">Guild</div>
              <div className="font-bold">Not in a guild (Coming Soon)</div>
            </div>
            <div className="bg-blue-950 p-3 rounded">
              <div className="text-blue-400">Total Stats</div>
              <div className="font-bold">STR {getTotalStats().strength} | INT {getTotalStats().intelligence} | LUCK {getTotalStats().luck} | STAM {getTotalStats().stamina}</div>
            </div>
            <div className="bg-blue-950 p-3 rounded">
              <div className="text-blue-400">Gold</div>
              <div className="font-bold text-yellow-400">{player.gold.toLocaleString()} (Earned: {player.totalGoldEarned.toLocaleString()})</div>
            </div>
            <div className="bg-blue-950 p-3 rounded">
              <div className="text-blue-400">Relics</div>
              <div className="font-bold text-purple-400">{player.relics} (Earned: {player.totalRelicsEarned})</div>
            </div>
            <div className="bg-blue-950 p-3 rounded">
              <div className="text-blue-400">Fish Caught</div>
              <div className="font-bold">{player.totalFishCaught.toLocaleString()}</div>
            </div>
            <div className="bg-blue-950 p-3 rounded">
              <div className="text-blue-400">Fish Sold</div>
              <div className="font-bold">{player.totalFishSold.toLocaleString()}</div>
            </div>
            <div className="bg-blue-950 p-3 rounded">
              <div className="text-blue-400">Treasure Chests</div>
              <div className="font-bold">💎 {player.treasureChestsFound}</div>
            </div>
            <div className="bg-blue-950 p-3 rounded">
              <div className="text-blue-400">Current Biome</div>
              <div className="font-bold">Biome {player.currentBiome} - {window.BIOMES[player.currentBiome]?.name}</div>
            </div>
            <div className="bg-blue-950 p-3 rounded col-span-1 sm:col-span-2">
              <div className="text-blue-400 mb-2">Rare Fish Caught</div>
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
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 mb-4">
          <h3 className="text-xl font-bold mb-4">Equipped Title</h3>
          <div className="mb-4">
            <div className="bg-blue-950 p-4 rounded border-2 border-yellow-400">
              <div className="text-lg font-bold text-yellow-400">
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
                      : 'bg-blue-950 hover:bg-blue-800'
                  }`}
                >
                  <div className="font-bold">{ach.title}</div>
                  <div className="text-xs text-blue-300">{ach.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nationality/Region */}
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 mb-4">
          <h3 className="text-xl font-bold mb-4">Nationality / Region</h3>
          <p className="text-sm text-blue-300 mb-4">
            Select your country for regional leaderboards (optional)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            <button
              onClick={() => handleNationalityChange(null)}
              className={`p-2 rounded text-left ${
                !nationality ? 'bg-gray-600' : 'bg-blue-950 hover:bg-blue-800'
              }`}
            >
              <div className="text-sm font-bold">None</div>
            </button>
            {countries.map(country => (
              <button
                key={country.code}
                onClick={() => handleNationalityChange(country.code)}
                className={`p-2 rounded text-left ${
                  nationality === country.code
                    ? 'bg-green-600'
                    : 'bg-blue-950 hover:bg-blue-800'
                }`}
              >
                <div className="text-lg mb-1">{country.flag}</div>
                <div className="text-xs font-bold truncate">{country.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 mb-4">
          <h3 className="text-xl font-bold mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold mb-2 block">Profile Visibility</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePrivacyChange('public')}
                  className={`px-4 py-2 rounded font-bold text-sm ${
                    privacy === 'public' ? 'bg-green-600' : 'bg-blue-900 hover:bg-blue-800'
                  }`}
                >
                  Public
                </button>
                <button
                  onClick={() => handlePrivacyChange('friends')}
                  className={`px-4 py-2 rounded font-bold text-sm ${
                    privacy === 'friends' ? 'bg-yellow-600' : 'bg-blue-900 hover:bg-blue-800'
                  }`}
                >
                  Friends Only
                </button>
                <button
                  onClick={() => handlePrivacyChange('private')}
                  className={`px-4 py-2 rounded font-bold text-sm ${
                    privacy === 'private' ? 'bg-red-600' : 'bg-blue-900 hover:bg-blue-800'
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

        {/* Danger Zone */}
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <span className="text-xl">⚠️</span> Danger Zone
          </h3>
          <p className="text-sm text-blue-300 mb-4">
            Reset your save data. This will delete all progress and cannot be undone!
          </p>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset your save? This cannot be undone!')) {
                localStorage.removeItem('arcaneAnglerSave');
                window.location.reload();
              }
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors"
          >
            {Icons.Trash2()} Reset Save Data
          </button>
        </div>
      </div>
    );
  };

  const AchievementsPage = () => {
    // Safety check for ACHIEVEMENTS
    if (!window.ACHIEVEMENTS || !Array.isArray(window.ACHIEVEMENTS)) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6 text-center">
            <p className="text-blue-300">Loading achievements...</p>
          </div>
        </div>
      );
    }

    const unlockedAchievements = window.ACHIEVEMENTS.filter(a => player.achievements.includes(a.id));
    const lockedAchievements = window.ACHIEVEMENTS.filter(a => !player.achievements.includes(a.id));

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <span>{Icons.Trophy()}</span>
              Achievements
            </h2>
            <div className="text-sm text-blue-300">
              {unlockedAchievements.length} / {window.ACHIEVEMENTS.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-blue-950 rounded-full h-4 mb-8">
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
              <h3 className="text-lg font-bold mb-3 text-yellow-400">Unlocked</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unlockedAchievements.map(achievement => (
                  <div key={achievement.id} className="bg-blue-950 p-4 rounded-lg border-2 border-yellow-400">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-yellow-400">{achievement.name}</div>
                        <div className="text-xs text-blue-300 mt-1">{achievement.desc}</div>
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
              <h3 className="text-lg font-bold mb-3 text-gray-400">Locked</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lockedAchievements.map(achievement => {
                  const currentValue = player[achievement.stat] || 0;
                  const progress = Math.min(100, (currentValue / achievement.requirement) * 100);

                  return (
                    <div key={achievement.id} className="bg-blue-950 p-4 rounded-lg border-2 border-gray-700 opacity-70">
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
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
          const inventoryItem = player.inventory.find(f => f.name === fish.name);

          allFish.push({
            ...fish,
            rarity,
            isDiscovered,
            count: inventoryItem ? inventoryItem.count : 0
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
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <span>🐟</span>
              Fishpedia
            </h2>
            <div className="text-sm text-blue-300">
              {discoveredCount} / {totalFish} ({discoveryPercentage}%)
            </div>
          </div>

          {/* Biome Selection Dropdown */}
          <div className="mb-6">
            <label htmlFor="biome-select" className="text-sm text-blue-300 mb-2 font-semibold block">
              Select Biome:
            </label>
            <select
              id="biome-select"
              value={selectedBiome}
              onChange={(e) => {
                setSelectedBiome(parseInt(e.target.value));
                setSelectedRarityFilter('all');
              }}
              className="w-full sm:w-64 px-4 py-3 rounded-lg font-bold bg-blue-900 text-white border-2 border-blue-700 hover:border-blue-500 focus:border-blue-400 focus:outline-none cursor-pointer"
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
            <div className="text-sm text-blue-300 mb-2 font-semibold">Filter by Rarity:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2">
              <button
                onClick={() => setSelectedRarityFilter('all')}
                className={`px-3 py-2 rounded font-bold text-xs ${
                  selectedRarityFilter === 'all' ? 'bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'
                }`}
              >
                All
              </button>
              {rarities.map(rarity => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarityFilter(rarity)}
                  className={`px-3 py-2 rounded font-bold text-xs ${
                    selectedRarityFilter === rarity ? 'bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'
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
                className="bg-blue-950 p-4 rounded-lg border-2"
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
                        <div className="text-lg font-bold mt-1">{fish.name}</div>
                      </div>
                      {fish.count > 0 && (
                        <div className="text-sm text-blue-300 ml-2">
                          × {fish.count}
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-blue-300 mb-3 italic">
                      {fish.desc}
                    </div>

                    <div className="flex gap-4 text-xs">
                      <div className="text-green-400">
                        <span className="text-blue-400">XP:</span> {fish.xp}
                      </div>
                      <div className="text-yellow-400">
                        <span className="text-blue-400">Gold:</span> {fish.gold}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Undiscovered Fish */}
                    <div className="text-center opacity-50">
                      <div className="text-6xl mb-2">❓</div>
                      <div className="text-lg font-bold text-gray-400">???</div>
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
            <div className="text-center text-blue-300 py-12">
              No {selectedRarityFilter} fish in this biome.
            </div>
          )}
        </div>
      </div>
    );
  };

  const PlaceholderPage = ({ title, icon }) => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-blue-800 bg-opacity-50 rounded-lg p-8 sm:p-12 text-center">
        <div className="text-6xl mb-4"><span className="text-5xl">{icon()}</span></div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h2>
        <p className="text-sm sm:text-base text-blue-300">Coming soon! This feature is under development.</p>
      </div>
    </div>
  );

  // Saving Progress Overlay
  const SavingOverlay = () => {
    if (!savingProgress) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center">
        <div className="bg-blue-900 rounded-lg p-8 text-center border-4 border-blue-600 shadow-2xl">
          <div className="text-6xl mb-4 animate-pulse">💾</div>
          <h2 className="text-2xl font-bold mb-2">Saving Your Progress...</h2>
          <p className="text-blue-300 mb-4">Please wait while we save your game data</p>
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
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 text-white flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden bg-blue-900 border-b-2 border-blue-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-blue-800 rounded"
            >
              {Icons.Menu()}
            </button>
            <h1 className="text-xl font-bold text-yellow-400">⚡ Arcane Angler</h1>
            <div className="w-10"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-blue-800 bg-opacity-50 rounded p-2 text-center">
              <div className="text-xs text-blue-300">Lvl</div>
              <div className="text-sm font-bold">{player.level}</div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded p-2 text-center">
              <div className="text-xs text-yellow-300">Gold</div>
              <div className="text-sm font-bold text-yellow-400">{player.gold >= 1000 ? `${(player.gold / 1000).toFixed(1)}k` : player.gold}</div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded p-2 text-center">
              <div className="text-xs text-purple-300">Relic</div>
              <div className="text-sm font-bold text-purple-400">{player.relics}</div>
            </div>
          </div>
          
          <div className="bg-blue-800 bg-opacity-50 rounded p-2">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs text-blue-300">XP</div>
              <div className="text-xs font-bold">{player.xp}/{player.xpToNext}</div>
            </div>
            <div className="bg-blue-950 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(player.xp / player.xpToNext) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:block bg-blue-900 border-b-2 border-blue-700 p-4">
          <h1 className="text-2xl font-bold text-yellow-400 text-center mb-4">⚡ Arcane Angler</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {currentPage === 'fishing' && <FishingPage />}
          {currentPage === 'equipment' && <EquipmentPage />}
          {currentPage === 'biomes' && <BiomesPage />}
          {currentPage === 'inventory' && <InventoryPage />}
          {currentPage === 'stats' && <StatsPage />}
          
          {currentPage === 'quests' && <PlaceholderPage title="Quests" icon={Icons.Target} />}
          {currentPage === 'guilds' && <PlaceholderPage title="Guilds" icon={Icons.Users} />}
          {currentPage === 'profile' && <ProfilePage />}
          {currentPage === 'achievements' && <AchievementsPage />}
          {currentPage === 'fishpedia' && <FishpediaPage />}
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
        <div className="text-white text-2xl">Loading...</div>
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