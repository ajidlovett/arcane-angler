import React, { useState, useEffect } from 'react';
import { Fish, TrendingUp, Award, Package, Target, Users, User, Trophy, X, Lock, Unlock, Menu, ChevronRight } from 'lucide-react';

// BIOME DATA - This can be moved to a separate file later
const BIOMES = {
  1: {
    name: "Tinker River",
    unlockLevel: 1,
    unlockGold: 0,
    boatRequired: null,
    boatPrice: 0,
    description: "A quiet freshwater stretch where new anglers begin their journey. The gentle current carries shimmering minnows, drifting leaves, and small relics washed down from ancient settlements upriver. Locals say river spirits guide beginners with subtle currents that shape their fate.",
    fish: {
      Common: [
        { name: "Pebble Minnow", xp: 10, gold: 5, desc: "A tiny fish often mistaken for a floating pebble. Its jittery movements help it confuse predators." },
        { name: "Silver Darter", xp: 11, gold: 6, desc: "A glossy silver fish that flickers like a coin underwater. Large schools gather near shallow banks." },
        { name: "Reed Chub", xp: 12, gold: 6, desc: "A plump fish hiding among thick river reeds. Easily startled, it kicks up mud clouds to escape." },
        { name: "Spotted Fry", xp: 13, gold: 7, desc: "A tiny fry covered in dark speckles. They travel in swirling clusters resembling drifting ash." },
        { name: "Mudscale Carp", xp: 15, gold: 8, desc: "A rough-scaled carp coated in protective mud. It survives where most fish wouldn't dare to swim." }
      ],
      Uncommon: [
        { name: "Brighttail Perch", xp: 25, gold: 12, desc: "Known for its faintly glowing yellow tail. Some claim the tail glows brighter before rainfall." },
        { name: "Streamrunner Trout", xp: 28, gold: 14, desc: "A sleek trout built for speed, racing upstream in sharp bursts." },
        { name: "Greenfin Shiner", xp: 30, gold: 15, desc: "Recognizable by its shimmering emerald fins. They hide among river weeds in perfect stillness." },
        { name: "Dapple Carp", xp: 32, gold: 16, desc: "A large carp with mottled patterns across its body. Patient and stubborn on the line." },
        { name: "Driftback Loach", xp: 35, gold: 18, desc: "A bottom-dweller that wriggles backward into soft sand. Its quirky movement makes it a local favorite." }
      ],
      Fine: [
        { name: "Gleamfish Minnow", xp: 55, gold: 25, desc: "A shimmering minnow reflecting light like morning dew. Used in festival lanterns." },
        { name: "Longbar Pike", xp: 58, gold: 28, desc: "A narrow-bodied pike known for straight, lightning-fast dashes." },
        { name: "Honeystripe Barb", xp: 60, gold: 30, desc: "A small barb with golden stripes that glow in sunlight. Its flesh carries a naturally sweet flavor." },
        { name: "Tinkerscale Trout", xp: 62, gold: 32, desc: "A playful trout unique to these waters. At dusk, they leap repeatedly, creating tiny ripples." },
        { name: "Siltveil Catfish", xp: 65, gold: 35, desc: "A smooth-skinned catfish known for creating veils of drifting silt to hide in." }
      ],
      Rare: [
        { name: "Copperback Salmon", xp: 120, gold: 60, desc: "A shimmering salmon variant with a copper glow. Legend says river spirits favor it." },
        { name: "Twinfin Razorperch", xp: 130, gold: 65, desc: "A double-finned perch known for razor-precise strikes. Many call it 'the needle.'" },
        { name: "Mossbeard Sturgeon", xp: 135, gold: 70, desc: "An ancient-looking sturgeon with moss-like tufts on its snout." },
        { name: "Phantom Dace", xp: 140, gold: 75, desc: "Nearly transparent dace, visible only when the water is perfectly still." },
        { name: "Dawnscale Carp", xp: 150, gold: 80, desc: "Glows softly at sunrise, creating golden halos. Considered a symbol of new beginnings." }
      ],
      Epic: [
        { name: "Giant Ripplebass", xp: 300, gold: 150, desc: "Its massive body creates sweeping ripples across the river. Tales speak of it overturning canoes." },
        { name: "Verdant Guardian Gar", xp: 320, gold: 160, desc: "A moss-colored gar believed to protect river plants. Harming one brings misfortune." },
        { name: "Thunderstream Pike", xp: 350, gold: 180, desc: "Appears most frequently during storms. Its body hums with faint vibrations." },
        { name: "Goldenwave Trout", xp: 380, gold: 190, desc: "Leaves trails of golden ripples as it swims. Once demanded as tribute by nobles." },
        { name: "Duskgazer Carp", xp: 400, gold: 200, desc: "Active only during the hour between day and night. Its eyes glow like fading embers." }
      ],
      Legendary: [
        { name: "Spiritborne Sturgeon", xp: 800, gold: 400, desc: "Believed to be touched by river spirits. The water becomes eerily calm when it swims past." },
        { name: "Ancestor Pike", xp: 900, gold: 450, desc: "A colossal pike said to descend from primordial river beasts. Scales marked with ancient scars." },
        { name: "Silver Whisper Trout", xp: 1000, gold: 500, desc: "Said to hum in soft harmonic tones underwater. Its scales glow like moonlight." }
      ],
      Mythic: [
        { name: "River King Aqualon", xp: 2500, gold: 1200, desc: "The revered monarch of Tinker River. A bass so large its roar echoes like rushing water." },
        { name: "Tinkermaker Carp", xp: 3000, gold: 1500, desc: "An ancient carp believed to craft the river's winding paths. Only appears to destined anglers." }
      ]
    }
  },
  2: {
    name: "Misty Pine Lake",
    unlockLevel: 10,
    unlockGold: 750,
    boatRequired: "Weathered Rowboat",
    boatPrice: 750,
    description: "A vast, still lake surrounded by towering ancient pines. A perpetual fog clings to the water's surface, muffling sounds and creating an atmosphere of solitude. The water is cold and deep green.",
    fish: {
      Common: [
        { name: "Needle Gar", xp: 35, gold: 18, desc: "A thin, green gar that floats vertically to mimic falling pine needles." },
        { name: "Fog Minnow", xp: 36, gold: 19, desc: "Its scales are a dull grey that blends perfectly with the mist." },
        { name: "Lake Chub", xp: 38, gold: 20, desc: "A hardy, round chub that thrives in cold water." },
        { name: "Grey Gill Sunfish", xp: 40, gold: 22, desc: "A simple sunfish with gill covers the color of storm clouds." },
        { name: "Coldwater Snipe", xp: 45, gold: 25, desc: "Known for its long beak-like mouth. It picks insects off the surface with precision." }
      ],
      Uncommon: [
        { name: "Shadow Perch", xp: 65, gold: 35, desc: "Darker than the water itself, this perch hunts in the shadows of the boat." },
        { name: "Resin Scale Carp", xp: 70, gold: 38, desc: "Its scales secrete a sticky substance similar to tree sap. Smells of pine." },
        { name: "Mist Drifter Trout", xp: 75, gold: 40, desc: "It swims just below the surface, creating V-shaped wakes in the fog." },
        { name: "Bark-Back Bass", xp: 80, gold: 42, desc: "Its back pattern perfectly resembles the bark of the surrounding pine trees." },
        { name: "Silent Swimmer Pike", xp: 85, gold: 45, desc: "This pike moves without disturbing the water. You only know it's there when your rod bends." }
      ],
      Fine: [
        { name: "Emerald Eye Bass", xp: 140, gold: 75, desc: "A dark bass with piercing green eyes that seem to glow in the fog." },
        { name: "Frostfin Trout", xp: 150, gold: 80, desc: "Cold to the touch. Its fins look like thin sheets of ice." },
        { name: "Timber Eel", xp: 160, gold: 85, desc: "A thick eel that resembles a waterlogged branch. Wraps around submerged roots." },
        { name: "Lantern Guppy", xp: 170, gold: 90, desc: "A deep-water guppy with a bioluminescent spot on its head." },
        { name: "Echo Carp", xp: 180, gold: 95, desc: "It makes a low thrumming sound when threatened." }
      ],
      Rare: [
        { name: "Ghost Whitefish", xp: 350, gold: 180, desc: "A pale whitefish that looks translucent in the fog." },
        { name: "Needlepoint Pike", xp: 375, gold: 195, desc: "Sharp and dangerous. Its teeth are like needles, fighting with jerky movements." },
        { name: "Ancient Woodfish", xp: 400, gold: 210, desc: "A lungfish whose scales have hardened into a wood-like texture." },
        { name: "Deepwater Sentinel Char", xp: 425, gold: 220, desc: "A char found only in the center of the lake's deepest point." },
        { name: "Vapor Tail Betta", xp: 450, gold: 230, desc: "A wild betta whose tail fin dissolves into a mist-like trail as it swims." }
      ],
      Epic: [
        { name: "Logger Catfish", xp: 900, gold: 450, desc: "A massive catfish with scars that look like axe marks." },
        { name: "Mistweaver Serpent", xp: 950, gold: 480, desc: "A long, serpentine eel that moves in figure-eights." },
        { name: "Obsidian Bass", xp: 1000, gold: 500, desc: "Jet black and heavy as stone. It sinks immediately when hooked." },
        { name: "Stormcaller Trout", xp: 1050, gold: 520, desc: "Its scales crackle with static. Locals say catching one summons rain." },
        { name: "Gloom Gazer Walleye", xp: 1100, gold: 550, desc: "A walleye with huge eyes adapted for pitch blackness. Stares into your soul." }
      ],
      Legendary: [
        { name: "Pine Spirit Sturgeon", xp: 2500, gold: 1200, desc: "A majestic sturgeon with fins that resemble pine boughs." },
        { name: "Fog Sovereign Pike", xp: 2750, gold: 1350, desc: "When this pike breaches, the fog thickens instantly." },
        { name: "Pale Lady Koi", xp: 3000, gold: 1500, desc: "A hauntingly beautiful, pale koi. Sailors say it sings a silent song." }
      ],
      Mythic: [
        { name: "Mistwalker Catfish", xp: 7000, gold: 3500, desc: "A legend that walks on the surface of the water using massive fin-legs." },
        { name: "Silent Leviathan", xp: 8000, gold: 4000, desc: "A massive, silent alligator gar. It occupies the entire deep trench of the lake." }
      ]
    }
  },
  3: {
    name: "Whispering Mangroves",
    unlockLevel: 25,
    unlockGold: 3500,
    boatRequired: "Flat-Bottom Skiff",
    boatPrice: 3500,
    description: "A humid, labyrinthine swamp where gnarled roots rise from the water like skeletal fingers. The water is brackish and dark, hiding strange creatures.",
    fish: {
      Common: [
        { name: "Root Nibbler Minnow", xp: 80, gold: 40, desc: "A small brown minnow that scrapes algae off submerged roots." },
        { name: "Mud Lungfish", xp: 85, gold: 42, desc: "An amphibious lungfish that breathes air. Flops onto mud banks." },
        { name: "Swamp Guppy", xp: 90, gold: 45, desc: "Dull green and slow-moving. Blends in with floating algae." },
        { name: "Brackish Darter", xp: 95, gold: 48, desc: "A darter that thrives where fresh water meets salt." },
        { name: "Vine Tail Eel", xp: 100, gold: 50, desc: "An eel with a tail resembling a submerged vine. Anchors itself against the tide." }
      ],
      Uncommon: [
        { name: "Mosquito Eater Betta", xp: 160, gold: 80, desc: "A wild betta prized for keeping the insect population down." },
        { name: "Tangled Eel", xp: 170, gold: 85, desc: "An eel with a knotted body, navigating tight root systems." },
        { name: "Humming Catfish", xp: 180, gold: 90, desc: "Produces a low hum that vibrates the water." },
        { name: "Sludge Prowler Sole", xp: 190, gold: 95, desc: "A flat sole that buries itself in the swamp floor." },
        { name: "Jade Scale Carp", xp: 200, gold: 100, desc: "Covered in vibrant green scales that look like polished jade." }
      ],
      Fine: [
        { name: "Voodoo Tetra", xp: 350, gold: 175, desc: "Markings on its side resemble ritualistic symbols." },
        { name: "Root-Rot Bass", xp: 375, gold: 188, desc: "It secretes a toxin that decays wood. Fishermen hate it." },
        { name: "Glow-Moss Carp", xp: 400, gold: 200, desc: "Symbiotic moss grows on its back, glowing softly in the twilight." },
        { name: "Whisper Fin Pike", xp: 425, gold: 212, desc: "Its fins flutter rapidly, creating a sound like whispering voices." },
        { name: "Bog King Cichlid", xp: 450, gold: 225, desc: "The dominant cichlid of the shallow mudflats. Aggressive." }
      ],
      Rare: [
        { name: "Shadow Marsh Bass", xp: 800, gold: 400, desc: "A black bass that seems to absorb light. Hides in deep shadows." },
        { name: "Orchid Betta", xp: 850, gold: 425, desc: "Beautifully colored pink and purple to mimic swamp orchids." },
        { name: "Ancient Mudskipper", xp: 900, gold: 450, desc: "A massive mudskipper. It can walk on land for miles." },
        { name: "Toxin Gill Gar", xp: 950, gold: 475, desc: "Its gills puff out bright red clouds of warning." },
        { name: "Maze Runner Eel", xp: 1000, gold: 500, desc: "An eel that memorizes the layout of the swamp roots to break lines." }
      ],
      Epic: [
        { name: "Root Mother Carp", xp: 2000, gold: 1000, desc: "A massive carp that looks like a floating log. Roots grow from its scales." },
        { name: "Swampfire Eel", xp: 2150, gold: 1075, desc: "A rare eel that generates intense heat. The water boils around it." },
        { name: "Phantom Croc-Gar", xp: 2300, gold: 1150, desc: "Half-gar, half-reptile appearance. Armored scales snap lines." },
        { name: "Twilight Lotus Koi", xp: 2400, gold: 1200, desc: "A koi that blooms open like a flower when threatened." },
        { name: "Gas-Bubble Puffer", xp: 2500, gold: 1250, desc: "It inflates with swamp gas. Be careful not to puncture it." }
      ],
      Legendary: [
        { name: "Grove Keeper Catfish", xp: 5000, gold: 2500, desc: "An ancient catfish that protects the heart of the swamp." },
        { name: "Golden Alligator Gar", xp: 5500, gold: 2750, desc: "An armored prehistoric gar with scales of gold." },
        { name: "Wisp-Light Tetra", xp: 6000, gold: 3000, desc: "A giant tetra that glows with a hypnotic blue light." }
      ],
      Mythic: [
        { name: "Hydra Eel", xp: 15000, gold: 7500, desc: "A monstrosity with three heads. Strength of three eels in one." },
        { name: "Moloch The Bog-Catfish", xp: 18000, gold: 9000, desc: "A creature formed of mud, roots, and magic. The swamp itself given form." }
      ]
    }
  }
};

const FishingMMORPG = () => {
  const [currentPage, setCurrentPage] = useState('fishing');
  const [player, setPlayer] = useState({
    level: 1,
    xp: 0,
    xpToNext: 150,
    gold: 0,
    relics: 0,
    stats: {
      strength: 0,
      intelligence: 0,
      luck: 0,
      stamina: 0
    },
    inventory: [],
    lockedFish: [], // Store locked fish names
    currentBiome: 1 // Current biome (1-30)
  });

  const [fishing, setFishing] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [lastCatch, setLastCatch] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [funnyLine, setFunnyLine] = useState('');

  const rarities = ['Common', 'Uncommon', 'Fine', 'Rare', 'Epic', 'Legendary', 'Mythic'];
  const rarityColors = {
    'Common': '#9ca3af',
    'Uncommon': '#84cc16',
    'Fine': '#3b82f6',
    'Rare': '#8b5cf6',
    'Epic': '#d946ef',
    'Legendary': '#f59e0b',
    'Mythic': '#ef4444',
    'Treasure Chest': '#fbbf24'
  };

  // Get current biome fish database
  const getCurrentBiomeFish = () => {
    return BIOMES[player.currentBiome].fish;
  };

  // Get all fish from current biome as flat array
  const getAllCurrentBiomeFish = () => {
    const biomeFish = getCurrentBiomeFish();
    return Object.values(biomeFish).flat();
  };

  // Biome Relic Ranges for Treasure Chests
  const getBiomeRelicRange = (biome) => {
    if (biome <= 5) return { min: 1, max: 5 };
    if (biome <= 10) return { min: 5, max: 12 };
    if (biome <= 15) return { min: 12, max: 25 };
    if (biome <= 20) return { min: 25, max: 45 };
    if (biome <= 25) return { min: 45, max: 70 };
    return { min: 70, max: 100 }; // Biomes 26-30
  };

  // Generate Treasure Chest Contents
  const generateTreasureChest = () => {
    const totalLuck = player.stats.luck;
    const avgCommonValue = fishValues['Common'];
    const biomeRelicRange = getBiomeRelicRange(player.currentBiome);
    
    // Gold Reward
    const baseGold = avgCommonValue * 50;
    const goldReward = Math.floor(baseGold * (1 + (totalLuck / 100)));
    
    // Relic Reward
    const baseRelics = Math.floor(Math.random() * (biomeRelicRange.max - biomeRelicRange.min + 1)) + biomeRelicRange.min;
    const relicReward = Math.floor(baseRelics * (1 + (totalLuck / 100)));
    
    return { gold: goldReward, relics: relicReward };
  };

  // Generate random funny line
  const getFunnyLine = () => {
    const allFish = getAllCurrentBiomeFish();
    const randomFish = allFish[Math.floor(Math.random() * allFish.length)];
    
    const funnyLines = [
      "You prayed to the ocean gods and caught:",
      "You accidentally farted underwater and caught:",
      "You threw a gold coin for good luck and caught:",
      `You hoped to catch ${randomFish.name} but you caught:`,
      "You sang a sea shanty terribly and caught:",
      "You told a bad joke to the fish and caught:",
      "Your bait smelled like pizza and you caught:",
      "You sneezed at the perfect moment and caught:",
      "You whispered sweet nothings to the ocean and caught:",
      "You did a little dance on the boat and caught:",
      "Your fishing rod sneezed (yes, really) and caught:",
      "You blinked three times and magically caught:",
      "A seagull judged your technique but you still caught:",
      "You forgot what you were doing and somehow caught:",
      "You yelled 'YOLO!' into the void and caught:",
      "Your hat flew off and startled you into catching:",
      "You dropped your phone (it's waterproof) and caught:",
      "A dolphin gave you a thumbs up and you caught:",
      "You were daydreaming about lunch and caught:",
      "Pure dumb luck blessed you with:"
    ];
    
    return funnyLines[Math.floor(Math.random() * funnyLines.length)];
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      // Placeholder Pages
  const PlaceholderPage = ({ title, icon: Icon }) => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-blue-800 bg-opacity-50 rounded-lg p-8 sm:p-12 text-center">
        <Icon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-blue-400" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h2>
        <p className="text-sm sm:text-base text-blue-300">Coming soon! This feature is under development.</p>
      </div>
    </div>
  );

  return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Weighted Pool System for Rarity Calculation
  const calculateRarity = () => {
    const totalLuck = player.stats.luck;
    
    // Base weights at 0 Luck
    const baseWeights = {
      'Common': 49500,
      'Uncommon': 28000,
      'Fine': 15000,
      'Rare': 5000,
      'Epic': 1500,
      'Treasure Chest': 500,
      'Legendary': 450,
      'Mythic': 50
    };

    // Calculate effective weights (Luck increases everything except Common)
    const effectiveWeights = {};
    let poolSize = 0;
    
    for (const [tier, baseWeight] of Object.entries(baseWeights)) {
      if (tier === 'Common') {
        effectiveWeights[tier] = baseWeight;
      } else {
        effectiveWeights[tier] = baseWeight * (1 + (totalLuck / 100));
      }
      poolSize += effectiveWeights[tier];
    }

    // Roll random number and determine tier
    const roll = Math.random() * poolSize;
    let cumulative = 0;
    
    for (const [tier, weight] of Object.entries(effectiveWeights)) {
      cumulative += weight;
      if (roll <= cumulative) {
        return tier;
      }
    }
    
    return 'Common'; // Fallback
  };

  // Infinite Scaling Yield based on Strength
  const calculateFishCount = (rarity) => {
    const totalStrength = player.stats.strength;
    
    // Mythic and Treasure Chest always return 1 (with Titan Bonus)
    if (rarity === 'Mythic' || rarity === 'Treasure Chest') {
      return 1;
    }
    
    // Guaranteed extra fish (100% = +1, 200% = +2, etc.)
    const guaranteedExtra = Math.floor(totalStrength / 100);
    
    // Remainder chance for one more (50% strength = 50% chance for +1)
    const remainder = totalStrength % 100;
    const bonusFish = Math.random() * 100 < remainder ? 1 : 0;
    
    return 1 + guaranteedExtra + bonusFish;
  };

  // Calculate Titan Bonus (compensation for Mythic/Chest single quantity)
  const calculateTitanBonus = () => {
    const totalStrength = player.stats.strength;
    const guaranteedExtra = Math.floor(totalStrength / 100);
    const remainder = totalStrength % 100;
    const avgBonus = remainder / 100; // Average chance
    const wouldHaveCaught = guaranteedExtra + avgBonus;
    
    return 1 + (0.5 * wouldHaveCaught);
  };

  const handleFish = () => {
    if (cooldown > 0 || fishing) return;

    setFishing(true);
    setCooldown(4);
    
    // Generate funny line before fishing
    setFunnyLine(getFunnyLine());

    setTimeout(() => {
      const rarity = calculateRarity();
      
      // Handle Treasure Chest
      if (rarity === 'Treasure Chest') {
        const treasure = generateTreasureChest();
        
        const catchData = {
          fish: 'Treasure Chest',
          rarity: 'Treasure Chest',
          count: 1,
          xp: 50,
          relics: treasure.relics,
          gold: treasure.gold,
          isTreasure: true
        };

        setLastCatch(catchData);
        
        // Update player with treasure rewards
        const newXP = player.xp + catchData.xp;
        const levelUp = newXP >= player.xpToNext;
        
        setPlayer(prev => ({
          ...prev,
          xp: levelUp ? newXP - prev.xpToNext : newXP,
          level: levelUp ? prev.level + 1 : prev.level,
          xpToNext: levelUp ? prev.xpToNext + 150 : prev.xpToNext,
          relics: prev.relics + treasure.relics + (levelUp ? 1 : 0),
          gold: prev.gold + treasure.gold
        }));

        setFishing(false);
        return;
      }
      
      // Regular fish catch
      const biomeFish = getCurrentBiomeFish();
      const fishList = biomeFish[rarity];
      const selectedFish = fishList[Math.floor(Math.random() * fishList.length)];
      const fishName = selectedFish.name;
      
      const fishCount = calculateFishCount(rarity);
      const baseXP = selectedFish.xp;
      const baseGold = selectedFish.gold;
      
      // Calculate Titan Bonus for Mythic
      let titanBonus = 1;
      if (rarity === 'Mythic') {
        titanBonus = calculateTitanBonus();
      }

      const catchData = {
        fish: fishName,
        rarity,
        count: fishCount,
        xp: baseXP,
        gold: baseGold,
        relics: 0,
        titanBonus: titanBonus > 1 ? titanBonus : null
      };

      setLastCatch(catchData);
      
      // Add to inventory
      const newInventory = [...player.inventory];
      const existing = newInventory.find(f => f.name === fishName);
      if (existing) {
        existing.count += fishCount;
        // Store titan bonus multiplier on the fish
        if (titanBonus > 1) {
          existing.titanBonus = titanBonus;
        }
      } else {
        newInventory.push({ 
          name: fishName, 
          rarity, 
          count: fishCount,
          baseGold: baseGold,
          titanBonus: titanBonus > 1 ? titanBonus : 1
        });
      }

      // Update player
      const newXP = player.xp + baseXP;
      const levelUp = newXP >= player.xpToNext;
      
      setPlayer(prev => ({
        ...prev,
        xp: levelUp ? newXP - prev.xpToNext : newXP,
        level: levelUp ? prev.level + 1 : prev.level,
        xpToNext: levelUp ? prev.xpToNext + 150 : prev.xpToNext,
        relics: prev.relics + (levelUp ? 1 : 0),
        inventory: newInventory
      }));

      setFishing(false);
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

  const sellFish = (fishItem) => {
    if (player.lockedFish.includes(fishItem.name)) return;
    
    const intelligenceBonus = 1 + (player.stats.intelligence * 0.025);
    const titanBonus = fishItem.titanBonus || 1;
    const goldEarned = Math.floor(fishItem.baseGold * fishItem.count * intelligenceBonus * titanBonus);
    
    setPlayer(prev => ({
      ...prev,
      gold: prev.gold + goldEarned,
      inventory: prev.inventory.filter(f => f.name !== fishItem.name)
    }));
  };

  const sellAll = () => {
    const unlockedFish = player.inventory.filter(f => !player.lockedFish.includes(f.name));
    const intelligenceBonus = 1 + (player.stats.intelligence * 0.025);
    
    const totalGold = unlockedFish.reduce((sum, fish) => {
      const titanBonus = fish.titanBonus || 1;
      return sum + Math.floor(fish.baseGold * fish.count * intelligenceBonus * titanBonus);
    }, 0);

    setPlayer(prev => ({
      ...prev,
      gold: prev.gold + totalGold,
      inventory: prev.inventory.filter(f => prev.lockedFish.includes(f.name))
    }));
  };

  const sellByRarity = (rarity) => {
    const fishToSell = player.inventory.filter(
      f => f.rarity === rarity && !player.lockedFish.includes(f.name)
    );
    const intelligenceBonus = 1 + (player.stats.intelligence * 0.025);
    
    const totalGold = fishToSell.reduce((sum, fish) => {
      const titanBonus = fish.titanBonus || 1;
      return sum + Math.floor(fish.baseGold * fish.count * intelligenceBonus * titanBonus);
    }, 0);

    setPlayer(prev => ({
      ...prev,
      gold: prev.gold + totalGold,
      inventory: prev.inventory.filter(f => 
        f.rarity !== rarity || prev.lockedFish.includes(f.name)
      )
    }));
  };

  const upgradeStat = (stat) => {
    const cost = 3;
    if (player.relics >= cost) {
      setPlayer(prev => ({
        ...prev,
        relics: prev.relics - cost,
        stats: {
          ...prev.stats,
          [stat]: prev.stats[stat] + 1
        }
      }));
    }
  };

  const getFilteredInventory = () => {
    if (selectedRarity === 'all') return player.inventory;
    return player.inventory.filter(f => f.rarity === selectedRarity);
  };

  // Navigation Component
  const Sidebar = () => {
    const menuItems = [
      { id: 'fishing', icon: Fish, label: 'Fishing' },
      { id: 'biomes', icon: Award, label: 'Biomes' },
      { id: 'inventory', icon: Package, label: 'Inventory' },
      { id: 'stats', icon: TrendingUp, label: 'Stats' },
      { id: 'quests', icon: Target, label: 'Quests' },
      { id: 'guilds', icon: Users, label: 'Guilds' },
      { id: 'profile', icon: User, label: 'Profile' },
      { id: 'achievements', icon: Trophy, label: 'Achievements' }
    ];

    return (
      <>
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-blue-900 border-r-2 border-blue-700
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}>
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-blue-800 rounded"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo/Title */}
          <div className="p-6 border-b border-blue-700">
            <h1 className="text-2xl font-bold text-yellow-400">⚡ Arcane<br/>Angler</h1>
          </div>

          {/* Player Stats */}
          <div className="p-4 border-b border-blue-700">
            <div className="space-y-3">
              <div className="bg-blue-800 bg-opacity-50 rounded p-2">
                <div className="text-xs text-blue-300">Level</div>
                <div className="text-lg font-bold">{player.level}</div>
              </div>
              <div className="bg-blue-800 bg-opacity-50 rounded p-2">
                <div className="text-xs text-blue-300">XP</div>
                <div className="text-sm font-bold">{player.xp}/{player.xpToNext}</div>
                <div className="bg-blue-950 rounded-full h-2 mt-1">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all"
                    style={{ width: `${(player.xp / player.xpToNext) * 100}%` }}
                  />
                </div>
              </div>
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

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => {
                  setCurrentPage(id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-6 py-3 font-bold
                  transition-colors text-left
                  ${currentPage === id
                    ? 'bg-blue-700 text-white border-l-4 border-yellow-400'
                    : 'text-blue-300 hover:bg-blue-800 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Biome Info */}
          <div className="p-4 border-t border-blue-700">
            <div className="text-sm font-bold text-yellow-400 mb-1">
              {BIOMES[player.currentBiome].name}
            </div>
            <div className="text-xs text-blue-300">
              Biome {player.currentBiome} of 30
            </div>
          </div>
        </div>
      </>
    );
  };

  // Fishing Page
  const FishingPage = () => (
    <div className="max-w-2xl mx-auto">
      {/* Desktop Stats Bar */}
      <div className="hidden lg:block mb-6">
        {/* Top Row - 3 Columns */}
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
        
        {/* XP Progress Bar - Full Width */}
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
            <Fish className="w-6 h-6 sm:w-8 sm:h-8" />
            {BIOMES[player.currentBiome].name}
          </h2>
          <button
            onClick={() => setCurrentPage('biomes')}
            className="hidden lg:flex items-center gap-1 px-3 py-2 bg-blue-700 hover:bg-blue-600 rounded text-sm font-bold"
          >
            Change Biome <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-xs sm:text-sm text-blue-300 mb-4 italic">
          {BIOMES[player.currentBiome].description}
        </p>
        
        <button
          onClick={handleFish}
          disabled={cooldown > 0 || fishing}
          className={`w-full py-4 sm:py-6 rounded-lg font-bold text-lg sm:text-xl transition-all ${
            cooldown > 0 || fishing
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-lg'
          }`}
        >
          {fishing ? '🎣 Fishing...' : cooldown > 0 ? `⏱️ Cooldown: ${cooldown}s` : '🎣 Cast Line'}
        </button>

        {lastCatch && (
          <div className="mt-6 p-4 sm:p-6 bg-blue-950 rounded-lg border-4 shadow-xl" style={{ borderColor: rarityColors[lastCatch.rarity] }}>
            {/* Funny Line */}
            <div className="text-center mb-4 pb-4 border-b border-blue-800">
              <p className="text-sm sm:text-base text-blue-300 italic">{funnyLine}</p>
            </div>
            
            <div className="text-center">
              <div className="text-xs sm:text-sm uppercase tracking-wide mb-1" style={{ color: rarityColors[lastCatch.rarity] }}>
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
          <h3 className="font-bold mb-2 text-sm sm:text-base">Fishing Stats</h3>
          <div className="text-xs sm:text-sm text-blue-300 space-y-1">
            <div>Fish per catch: {1 + Math.floor(player.stats.strength / 100)} - {2 + Math.floor(player.stats.strength / 100)} fish</div>
            <div>Next guaranteed: {100 - (player.stats.strength % 100)} Strength needed</div>
            <div>Gold bonus: +{(player.stats.intelligence * 2.5).toFixed(1)}%</div>
            <div>Luck bonus: +{player.stats.luck}%</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Inventory Page
  const InventoryPage = () => {
    const filteredInventory = getFilteredInventory();
    const unlockedCount = filteredInventory.filter(f => !player.lockedFish.includes(f.name)).length;

    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Package className="w-6 h-6 sm:w-8 sm:h-8" />
              Inventory ({player.inventory.length})
            </h2>
            <button
              onClick={sellAll}
              disabled={unlockedCount === 0}
              className={`w-full sm:w-auto px-4 py-2 rounded font-bold text-sm ${
                unlockedCount > 0
                  ? 'bg-yellow-600 hover:bg-yellow-500'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Sell All Unlocked ({unlockedCount})
            </button>
          </div>

          {/* Rarity Filter */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedRarity('all')}
              className={`px-3 sm:px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${
                selectedRarity === 'all' ? 'bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'
              }`}
            >
              All
            </button>
            {rarities.map(rarity => {
              const count = player.inventory.filter(f => f.rarity === rarity).length;
              return (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`px-3 sm:px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${
                    selectedRarity === rarity ? 'bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'
                  }`}
                  style={{ 
                    borderLeft: `4px solid ${rarityColors[rarity]}`,
                  }}
                >
                  {rarity} ({count})
                </button>
              );
            })}
          </div>

          {/* Sell by Rarity */}
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

          {/* Fish Grid */}
          {filteredInventory.length === 0 ? (
            <p className="text-center text-blue-300 py-12 text-sm sm:text-base">
              {selectedRarity === 'all' ? 'No fish caught yet. Start fishing!' : `No ${selectedRarity} fish in inventory.`}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredInventory.map((fish, idx) => {
                const isLocked = player.lockedFish.includes(fish.name);
                const intelligenceBonus = 1 + (player.stats.intelligence * 0.025);
                const titanBonus = fish.titanBonus || 1;
                const sellValue = Math.floor(fish.baseGold * fish.count * intelligenceBonus * titanBonus);

                return (
                  <div key={idx} className="bg-blue-950 p-3 sm:p-4 rounded-lg border-2 relative" style={{ borderColor: rarityColors[fish.rarity] }}>
                    <button
                      onClick={() => toggleLock(fish.name)}
                      className="absolute top-2 right-2 p-1.5 sm:p-2 bg-blue-900 rounded hover:bg-blue-800"
                    >
                      {isLocked ? <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" /> : <Unlock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />}
                    </button>
                    
                    <div className="font-bold text-xs sm:text-sm" style={{ color: rarityColors[fish.rarity] }}>
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
                      className={`w-full py-2 rounded font-bold text-xs sm:text-sm ${
                        isLocked
                          ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                          : 'bg-yellow-600 hover:bg-yellow-500'
                      }`}
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

  // Stats Page
  const StatsPage = () => {
    const statDescriptions = {
      strength: {
        title: "Strength",
        current: `${1 + Math.floor(player.stats.strength / 100)}-${2 + Math.floor(player.stats.strength / 100)} fish per catch`,
        perPoint: "+2.5% chance to catch an additional fish per point",
        detail: `Every 100 points guarantees +1 fish. You currently have a ${player.stats.strength % 100}% chance for a bonus fish.`
      },
      intelligence: {
        title: "Intelligence", 
        current: `+${(player.stats.intelligence * 2.5).toFixed(1)}% gold when selling`,
        perPoint: "+2.5% bonus gold from selling fish per point",
        detail: `Increases the amount of gold earned when selling fish. Works multiplicatively with Titan Bonus.`
      },
      luck: {
        title: "Luck",
        current: `${player.stats.luck}% increased weight for rare fish`,
        perPoint: "+1% weight multiplier for all rarities except Common per point",
        detail: `Increases the probability weight of all fish rarities except Common. Higher Luck = better drop rates for rare fish.`
      },
      stamina: {
        title: "Stamina",
        current: `${player.stats.stamina * 3} minutes offline progression`,
        perPoint: "+3 minutes of offline progression per point",
        detail: `Allows you to earn fish and XP while offline. The game continues fishing automatically based on your stats.`
      }
    };

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
            Character Stats
          </h2>
          
          <div className="space-y-4">
            {Object.entries(player.stats).map(([stat, value]) => {
              const info = statDescriptions[stat];
              return (
                <div key={stat} className="bg-blue-950 p-4 sm:p-5 rounded-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="font-bold text-base sm:text-lg">{info.title}</div>
                      <div className="text-sm text-blue-300">Level {value}</div>
                    </div>
                    <button
                      onClick={() => upgradeStat(stat)}
                      disabled={player.relics < 3}
                      className={`w-full sm:w-auto px-6 py-3 rounded font-bold text-sm ${
                        player.relics >= 3
                          ? 'bg-purple-600 hover:bg-purple-500'
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Upgrade (3 💎)
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="text-green-400 font-bold">
                      Current: {info.current}
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

  // Biomes Page
  const BiomesPage = () => {
    const canUnlockBiome = (biomeId) => {
      const biome = BIOMES[biomeId];
      return player.level >= biome.unlockLevel && player.gold >= biome.unlockGold;
    };

    const unlockBiome = (biomeId) => {
      const biome = BIOMES[biomeId];
      if (!canUnlockBiome(biomeId)) return;
      
      setPlayer(prev => ({
        ...prev,
        gold: prev.gold - biome.unlockGold,
        currentBiome: biomeId
      }));
      setCurrentPage('fishing');
    };

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Select Biome</h2>
          
          <div className="space-y-4">
            {Object.entries(BIOMES).map(([id, biome]) => {
              const biomeId = parseInt(id);
              const isUnlocked = canUnlockBiome(biomeId) || biomeId <= player.currentBiome;
              const isCurrent = biomeId === player.currentBiome;
              const isLocked = !isUnlocked && biomeId > player.currentBiome;
              
              return (
                <div 
                  key={id}
                  className={`p-4 sm:p-5 rounded-lg border-2 ${
                    isCurrent 
                      ? 'bg-blue-700 border-yellow-400' 
                      : isLocked 
                        ? 'bg-blue-950 border-gray-700 opacity-60'
                        : 'bg-blue-900 border-blue-700 hover:border-blue-500 cursor-pointer'
                  }`}
                  onClick={() => isUnlocked && !isCurrent && unlockBiome(biomeId)}
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
                          <div className="text-sm text-yellow-400">{biome.unlockGold} Gold</div>
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
                          backgroundColor: `${rarityColors[rarity]}20`,
                          color: rarityColors[rarity],
                          border: `1px solid ${rarityColors[rarity]}`
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-blue-900 border-b-2 border-blue-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-blue-800 rounded"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-yellow-400">⚡ Arcane Angler</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
          
          {/* Mobile Stats - Only on small screens */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-blue-800 bg-opacity-50 rounded p-2 text-center">
              <div className="text-xs text-blue-300">Lvl</div>
              <div className="text-sm font-bold">{player.level}</div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 rounded p-2 text-center">
              <div className="text-xs text-blue-300">XP</div>
              <div className="text-xs font-bold">{player.xp}/{player.xpToNext}</div>
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
        </div>

        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden lg:block bg-blue-900 border-b-2 border-blue-700 p-4">
          <h1 className="text-2xl font-bold text-yellow-400 text-center mb-4">⚡ Arcane Angler</h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentPage === 'fishing' && <FishingPage />}
          {currentPage === 'biomes' && <BiomesPage />}
          {currentPage === 'inventory' && <InventoryPage />}
          {currentPage === 'stats' && <StatsPage />}
          {currentPage === 'quests' && <PlaceholderPage title="Quests" icon={Target} />}
          {currentPage === 'guilds' && <PlaceholderPage title="Guilds" icon={Users} />}
          {currentPage === 'profile' && <PlaceholderPage title="Profile" icon={User} />}
          {currentPage === 'achievements' && <PlaceholderPage title="Achievements" icon={Trophy} />}
        </div>
      </div>
    </div>
  );
};

export default FishingMMORPG;