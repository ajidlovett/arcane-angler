// Biome and Fish Data
window.BIOMES = {
  1: {
    name: "Tinker River",
    unlockLevel: 1,
    unlockGold: 0,
    boatRequired: null,
    boatPrice: 0,
    description: "A quiet freshwater stretch where new anglers begin their journey. The gentle current carries shimmering minnows, drifting leaves, and small relics washed down from ancient settlements upriver. Locals say river spirits guide beginners with subtle currents that shape their fate.",
    fish: {
      Common: [
        { name: "Pebble Minnow", xp: 10, gold: 5, desc: "A tiny fish often mistaken for a floating pebble due to its grey coloring. Its jittery movements help it confuse predators in the shallow water. Children often scoop them up with wooden ladles during festivals." },
        { name: "Silver Darter", xp: 11, gold: 6, desc: "A glossy silver fish that flickers like a tossed coin underwater. Large schools gather near shallow banks at sunrise to feed. Catching one is traditionally seen as a sign of good financial luck." },
        { name: "Reed Chub", xp: 12, gold: 6, desc: "A plump fish that prefers hiding among thick river reeds. It is easily startled and kicks up mud clouds to escape anglers. Villagers consider it a staple food for hearty stews." },
        { name: "Spotted Fry", xp: 13, gold: 7, desc: "A tiny fry covered in dark speckles that mimic riverbed grit. They travel in swirling clusters that resemble drifting ash or silt. Beginners often catch them while learning line control." },
        { name: "Mudscale Carp", xp: 15, gold: 8, desc: "A rough-scaled carp coated in a thick layer of protective mud. It survives in stagnant pools where most fish wouldn't dare to swim. Elders say the mudscale carp brings resilience to those who catch it." }
      ],
      Uncommon: [
        { name: "Brighttail Perch", xp: 25, gold: 12, desc: "Known for its faintly glowing yellow tail that pierces the murky water. Some claim the tail glows brighter right before rainfall. Travelers often keep dried scales as good luck charms." },
        { name: "Streamrunner Trout", xp: 28, gold: 14, desc: "A sleek trout built for speed, capable of racing upstream in sharp bursts. Locals hold competitions predicting their leaps over small waterfalls. It fights surprisingly hard for its size." },
        { name: "Greenfin Shiner", xp: 30, gold: 15, desc: "Recognizable by its shimmering emerald fins that catch the light. They hide among river weeds in perfect stillness to avoid detection. Collectors admire their gemlike appearance in aquarium jars." },
        { name: "Dapple Carp", xp: 32, gold: 16, desc: "A large carp with mottled patterns across its body. It is patient and stubborn, putting up a surprisingly long fight on the line. Catching one is considered a memorable early milestone." },
        { name: "Driftback Loach", xp: 35, gold: 18, desc: "A bottom-dweller that wriggles backward into soft sand to hide. Its quirky movement makes it a local favorite among children. It can sense vibrations in the sand from far away." }
      ],
      Fine: [
        { name: "Gleamfish Minnow", xp: 55, gold: 25, desc: "A shimmering minnow reflecting light like morning dew. During festivals, villagers craft paper lanterns in its honor. It is said to bring clarity to one's thoughts." },
        { name: "Longbar Pike", xp: 58, gold: 28, desc: "A narrow-bodied pike known for its straight, lightning-fast dashes. Anglers prize it as a true test of accuracy and reflex. Its catches are often displayed proudly at local taverns." },
        { name: "Honeystripe Barb", xp: 60, gold: 30, desc: "A small barb with golden stripes that glow warmly in sunlight. Its flesh carries a naturally sweet flavor, making it a delicacy. Old recipes refer to it as 'river candy.'" },
        { name: "Tinkerscale Trout", xp: 62, gold: 32, desc: "A playful trout unique to these specific waters. At dusk, they leap repeatedly, creating tiny ripples like falling rain. Once matured, they migrate further downstream." },
        { name: "Siltveil Catfish", xp: 65, gold: 35, desc: "A smooth-skinned catfish known for kicking up veils of drifting silt. It uses this cloud to hide from predators and ambush prey. Some believe it can sense emotions through water vibrations." }
      ],
      Rare: [
        { name: "Copperback Salmon", xp: 120, gold: 60, desc: "A shimmering salmon variant with a distinct copper glow. Legend says river spirits favor this fish above all others. Its glowing back is visible even in the dimmest waters." },
        { name: "Twinfin Razorperch", xp: 130, gold: 65, desc: "A double-finned perch known for its razor-precise strikes. Many locals call it 'the needle' due to its speed. Skilled anglers treat catching one as a badge of honor." },
        { name: "Mossbeard Sturgeon", xp: 135, gold: 70, desc: "An ancient-looking sturgeon with moss-like tufts growing on its snout. Elders say it remembers every flood and drought in history. Some believe it carries centuries of wisdom." },
        { name: "Phantom Dace", xp: 140, gold: 75, desc: "A nearly transparent dace, visible only when the water is perfectly still. Many novices doubt it is even real until they hook one. Those who catch one report feeling strangely serene." },
        { name: "Dawnscale Carp", xp: 150, gold: 80, desc: "This carp glows softly at sunrise, creating golden halos in the water. It is considered a symbol of new beginnings and hope. It tends to disappear quickly after the sun fully rises." }
      ],
      Epic: [
        { name: "Giant Ripplebass", xp: 300, gold: 150, desc: "Its massive body creates sweeping ripples across the entire river width. Tales speak of it overturning a small canoe decades ago. Anglers train for weeks before attempting to catch one." },
        { name: "Verdant Guardian Gar", xp: 320, gold: 160, desc: "A moss-colored gar believed to protect the river's plant life. It watches anglers with ancient, knowing eyes. Harming one is said to bring years of misfortune." },
        { name: "Thunderstream Pike", xp: 350, gold: 180, desc: "Appears most frequently during heavy storms. Its body hums with faint electrical vibrations. Some believe it channels the river's ancient thunder spirits." },
        { name: "Goldenwave Trout", xp: 380, gold: 190, desc: "Leaves trails of golden ripples as it swims upstream. Once demanded as a tribute by nobles for its beauty. Said to bring prosperity to those who catch it." },
        { name: "Duskgazer Carp", xp: 400, gold: 200, desc: "Active only during the hour between day and night. Its eyes glow like fading embers in the twilight. Catching one is considered a rite of dusk." }
      ],
      Legendary: [
        { name: "Spiritborne Sturgeon", xp: 800, gold: 400, desc: "Believed to be touched by river spirits, possessing a ghostly aura. The water becomes eerily calm whenever it swims past. Anglers describe feeling overwhelming peace upon encountering it." },
        { name: "Ancestor Pike", xp: 900, gold: 450, desc: "A colossal pike said to descend from primordial river beasts. Its scales are marked with ancient scars from battles past. Only the bravest anglers dare attempt to reel it in." },
        { name: "Silver Whisper Trout", xp: 1000, gold: 500, desc: "Said to hum in soft harmonic tones underwater. Its scales glow like moonlight even under the midday sun. Some claim it responds to gentle singing." }
      ],
      Mythic: [
        { name: "River King Aqualon", xp: 2500, gold: 1200, desc: "The revered monarch of Tinker River, rarely seen by mortals. A bass so large its roar echoes like rushing water. Legends say its arrival foretells major events." },
        { name: "Tinkermaker Carp", xp: 3000, gold: 1500, desc: "An ancient carp believed to craft the river's winding paths. It shifts the currents effortlessly to confuse fishermen. Elders say it appears only to anglers destined for greatness." }
      ]
    }
  },
  2: {
    name: "Misty Pine Lake",
    unlockLevel: 10,
    unlockGold: 750,
    boatRequired: "Weathered Rowboat",
    boatPrice: 750,
    description: "A vast, still lake surrounded by towering ancient pines. A perpetual fog clings to the water's surface, muffling sounds and creating an atmosphere of solitude. The water is cold and deep green, hiding fish that have adapted to the silence.",
    fish: {
      Common: [
        { name: "Needle Gar", xp: 35, gold: 18, desc: "A thin, green gar that floats vertically to mimic falling pine needles. It bites quickly and retreats even faster. Use a fast reel to catch it." },
        { name: "Fog Minnow", xp: 36, gold: 19, desc: "Its scales are a dull grey that blends perfectly with the mist. Fisherman often hear them splashing but rarely see them clearly. They travel in large, silent schools." },
        { name: "Lake Chub", xp: 38, gold: 20, desc: "A hardy, round chub that thrives in cold water. It is known for its insatiable appetite for floating insects. A standard catch for any lake fisherman." },
        { name: "Grey Gill Sunfish", xp: 40, gold: 22, desc: "A simple sunfish with gill covers the color of storm clouds. It tends to school near submerged logs and docks. Their meat is surprisingly flaky and sweet." },
        { name: "Coldwater Snipe", xp: 45, gold: 25, desc: "Known for its long beak-like mouth. It picks insects off the surface of the water with surgical precision. It prefers the chilly center of the lake." }
      ],
      Uncommon: [
        { name: "Shadow Perch", xp: 65, gold: 35, desc: "Darker than the water itself, this perch hunts in the shadows of the boat. It hates direct sunlight and dives deep when hooked. A slippery catch." },
        { name: "Resin Scale Carp", xp: 70, gold: 38, desc: "Its scales secrete a sticky substance similar to tree sap. It smells faintly of fresh pine wood. Handle with gloves to avoid sticky hands." },
        { name: "Mist Drifter Trout", xp: 75, gold: 40, desc: "It swims just below the surface, creating V-shaped wakes in the fog. Catching one requires silence and patience. They are easily spooked by loud noises." },
        { name: "Bark-Back Bass", xp: 80, gold: 42, desc: "Its back pattern perfectly resembles the bark of the surrounding pine trees. A master of camouflage in the shallows. Only sharp-eyed anglers spot them." },
        { name: "Silent Swimmer Pike", xp: 85, gold: 45, desc: "This pike moves without disturbing the water at all. You only know it's there when your rod bends violently. It strikes without a splash." }
      ],
      Fine: [
        { name: "Emerald Eye Bass", xp: 140, gold: 75, desc: "A dark bass with piercing green eyes that seem to glow in the fog. It watches the angler as it is reeled in. Unsettling, but valuable." },
        { name: "Frostfin Trout", xp: 150, gold: 80, desc: "Cold to the touch, even after being caught. Its fins look like thin sheets of ice. It prefers the coldest pockets of the lake." },
        { name: "Timber Eel", xp: 160, gold: 85, desc: "A thick eel that resembles a waterlogged branch. It wraps itself around submerged roots to avoid being pulled up. Great strength is needed to dislodge it." },
        { name: "Lantern Guppy", xp: 170, gold: 90, desc: "A deep-water guppy with a bioluminescent spot on its head. It uses this light to navigate the dark lake bottom. A rare sight in shallow waters." },
        { name: "Echo Carp", xp: 180, gold: 95, desc: "It makes a low thrumming sound when threatened. In the quiet lake, the sound vibrates through the boat hull. A noisy and heavy catch." }
      ],
      Rare: [
        { name: "Ghost Whitefish", xp: 350, gold: 180, desc: "A pale whitefish that looks translucent in the fog. Fishermen consider it a wandering spirit of the water. Releasing it is said to grant safe passage." },
        { name: "Needlepoint Pike", xp: 375, gold: 195, desc: "Sharp and dangerous with teeth like needles. It fights with aggressive, jerky movements. Be careful when removing the hook." },
        { name: "Ancient Woodfish", xp: 400, gold: 210, desc: "A lungfish whose scales have hardened into a wood-like texture over decades. It feels more like carving wood than fishing. Extremely durable." },
        { name: "Deepwater Sentinel Char", xp: 425, gold: 220, desc: "A char found only in the center of the lake's deepest point. It is said to guard the secrets of the deep. Rarely surfaces on its own." },
        { name: "Vapor Tail Betta", xp: 450, gold: 230, desc: "A wild betta whose tail fin dissolves into a mist-like trail as it swims. It is incredibly difficult to track visually. A prized specimen for collectors." }
      ],
      Epic: [
        { name: "Logger Catfish", xp: 900, gold: 450, desc: "A massive catfish with scars that look like axe marks. It is strong enough to tow a small boat. Legend says it swallowed a lumberjack's axe." },
        { name: "Mistweaver Serpent", xp: 950, gold: 480, desc: "A long, serpentine eel that moves in figure-eights. Legend says it weaves the fog that covers the lake. Its scales are soft as silk." },
        { name: "Obsidian Bass", xp: 1000, gold: 500, desc: "Jet black and heavy as stone. It sinks immediately when hooked, requiring immense strength to pull up. It feels like reeling in a boulder." },
        { name: "Stormcaller Trout", xp: 1050, gold: 520, desc: "Its scales crackle with static electricity. Locals say catching one summons a thunderstorm within the hour. Handle with rubber gloves." },
        { name: "Gloom Gazer Walleye", xp: 1100, gold: 550, desc: "A walleye with huge eyes adapted for pitch blackness. It stares into the soul of those who catch it. It hunts in the absolute dark." }
      ],
      Legendary: [
        { name: "Pine Spirit Sturgeon", xp: 2500, gold: 1200, desc: "A majestic sturgeon with fins that resemble pine boughs. It smells of clean winter air and ancient magic. It grows to immense sizes." },
        { name: "Fog Sovereign Pike", xp: 2750, gold: 1350, desc: "When this pike breaches, the fog thickens instantly. It commands the weather of the lake. A terrifying predator of the mist." },
        { name: "Pale Lady Koi", xp: 3000, gold: 1500, desc: "A hauntingly beautiful, pale koi. Sailors say it sings a silent song that lures equipment into the water. Its scales are pure porcelain white." }
      ],
      Mythic: [
        { name: "Mistwalker Catfish", xp: 7000, gold: 3500, desc: "A creature of legend that walks on the surface of the water using massive fin-legs. To catch it is to master the lake itself. It defies physics." },
        { name: "Silent Leviathan", xp: 8000, gold: 4000, desc: "A massive, silent alligator gar that occupies the entire deep trench. It has no predators, only time. Its armor is impenetrable." }
      ]
    }
  },
  3: {
    name: "Whispering Mangroves",
    unlockLevel: 25,
    unlockGold: 3500,
    boatRequired: "Flat-Bottom Skiff",
    boatPrice: 3500,
    description: "A humid, labyrinthine swamp where gnarled roots rise from the water like skeletal fingers. The air buzzes with insects and the scent of wet earth. The water is brackish and dark, hiding strange creatures.",
    fish: {
      Common: [
        { name: "Root Nibbler Minnow", xp: 80, gold: 40, desc: "A small brown minnow that scrapes algae off submerged roots. It has surprisingly strong teeth for its size. Often used as bait for larger fish." },
        { name: "Mud Lungfish", xp: 85, gold: 42, desc: "An amphibious lungfish that can breathe air for short periods. It often flops onto mud banks to escape predators. Slippery and hard to hold." },
        { name: "Swamp Guppy", xp: 90, gold: 45, desc: "Dull green and slow-moving. It survives by blending in with floating algae mats. A common sight in the stagnant pools." },
        { name: "Brackish Darter", xp: 95, gold: 48, desc: "A darter that thrives where fresh water meets salt. It moves in jerky, unpredictable patterns. Its eyes are adapted to murky water." },
        { name: "Vine Tail Eel", xp: 100, gold: 50, desc: "An eel with a tail resembling a submerged vine. It uses this to anchor itself against the tide. Masters of camouflage." }
      ],
      Uncommon: [
        { name: "Mosquito Eater Betta", xp: 160, gold: 80, desc: "A wild betta prized by locals for keeping the insect population down. It leaps high out of the water to catch prey. Flashy and aggressive." },
        { name: "Tangled Eel", xp: 170, gold: 85, desc: "An eel with a body that is naturally knotted and twisted. This shape allows it to navigate tight root systems. Very difficult to unhook." },
        { name: "Humming Catfish", xp: 180, gold: 90, desc: "Produces a low hum that vibrates the water. Swarms of them create a sound like chanting monks. They feed in the twilight." },
        { name: "Sludge Prowler Sole", xp: 190, gold: 95, desc: "A flat sole that buries itself in the swamp floor. It waits for days for a meal to swim by. Covered in a thick mucus layer." },
        { name: "Jade Scale Carp", xp: 200, gold: 100, desc: "Covered in vibrant green scales that look like polished jade stones. A favorite of jewelry makers. It gleams in the filtered swamp light." }
      ],
      Fine: [
        { name: "Voodoo Tetra", xp: 350, gold: 175, desc: "Markings on its side resemble ritualistic symbols. Some say catching it invites the attention of swamp witches. A mysterious little fish." },
        { name: "Root-Rot Bass", xp: 375, gold: 188, desc: "It secretes a toxin that decays wood instantly. Fishermen hate it because it ruins their boats. Handle with extreme care." },
        { name: "Glow-Moss Carp", xp: 400, gold: 200, desc: "Symbiotic moss grows on its back, glowing softly in the swamp twilight. It helps illuminate the dark waters for other fish." },
        { name: "Whisper Fin Pike", xp: 425, gold: 212, desc: "Its fins flutter rapidly, creating a sound like whispering voices. Spooky to catch alone at night. It hunts by sound vibration." },
        { name: "Bog King Cichlid", xp: 450, gold: 225, desc: "The dominant predator of the shallow mudflats. It is aggressive and territorial. It builds nests out of mud and bone." }
      ],
      Rare: [
        { name: "Shadow Marsh Bass", xp: 800, gold: 400, desc: "A black bass that seems to absorb light. It hides in the deepest shadows of the mangrove roots. Almost invisible until it strikes." },
        { name: "Orchid Betta", xp: 850, gold: 425, desc: "Beautifully colored pink and purple to mimic swamp orchids. A master of disguise. Collectors pay a high price for vibrant specimens." },
        { name: "Ancient Mudskipper", xp: 900, gold: 450, desc: "A massive version of the common mudskipper. It can walk on land for miles to find new pools. It has legs stronger than a man's arm." },
        { name: "Toxin Gill Gar", xp: 950, gold: 475, desc: "Its gills puff out bright red clouds of warning. The toxin can numb a limb for hours. Handle with thick leather gloves." },
        { name: "Maze Runner Eel", xp: 1000, gold: 500, desc: "This eel memorizes the entire layout of the swamp. It will run your line through roots to break it intentionally. Highly intelligent." }
      ],
      Epic: [
        { name: "Root Mother Carp", xp: 2000, gold: 1000, desc: "A massive, slow-moving carp that looks like a floating log. Actual roots grow from its scales. It supports an entire ecosystem on its back." },
        { name: "Swampfire Eel", xp: 2150, gold: 1075, desc: "A rare eel that generates intense heat. The water boils around it when it thrashes. It glows with an internal orange fire." },
        { name: "Phantom Croc-Gar", xp: 2300, gold: 1150, desc: "Half-gar, half-reptile appearance. It has armored scales that can snap light fishing lines. A terrifying ambush predator." },
        { name: "Twilight Lotus Koi", xp: 2400, gold: 1200, desc: "A koi that blooms open like a flower when threatened. Incredibly rare and fragile. It smells of sweet perfume." },
        { name: "Gas-Bubble Puffer", xp: 2500, gold: 1250, desc: "It inflates with explosive swamp gas to float. Be careful not to puncture it, or it will pop violently. Volatile and dangerous." }
      ],
      Legendary: [
        { name: "Grove Keeper Catfish", xp: 5000, gold: 2500, desc: "An ancient entity that protects the heart of the swamp. Vines move to clear a path for it. It has whiskers as long as fishing rods." },
        { name: "Golden Alligator Gar", xp: 5500, gold: 2750, desc: "An armored prehistoric beast with scales of gold. It has survived since the dawn of the swamp. Its armor deflects harpoons." },
        { name: "Wisp-Light Tetra", xp: 6000, gold: 3000, desc: "A giant tetra that glows with a hypnotic blue light. Following it usually leads anglers into quicksand. A beautiful trap." }
      ],
      Mythic: [
        { name: "Hydra Eel", xp: 15000, gold: 7500, desc: "A monstrosity with three heads. It fights with the strength of three fish and the cunning of a demon. If one head sleeps, the others watch." },
        { name: "Moloch The Bog-Catfish", xp: 18000, gold: 9000, desc: "A creature formed of mud, roots, and ancient magic. To catch it is to wrestle the swamp itself. It swallows boats whole." }
      ]
    }
  }
};