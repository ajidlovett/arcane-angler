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
    unlockGold: 1500,
    boatRequired: "Weathered Rowboat",
    boatPrice: 1500,
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
    unlockGold: 5000,
    boatRequired: "Flat-Bottom Skiff",
    boatPrice: 5000,
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
  },
  4: {
  name: "Sapphire Coast",
  unlockLevel: 45,
  unlockGold: 25000,
  boatRequired: "Reinforced Sloop",
  boatPrice: 25000,
  description: "The edge of the continent where white sands meet the open ocean. The water is a brilliant turquoise, shifting to deep sapphire further out. The sun is bright and seabirds cry overhead.",
  fish: {
    Common: [
      { name: "Sand Dab", xp: 130, gold: 65, desc: "A flat fish that perfectly mimics the sandy ocean floor. It waits for tasty morsels to drift by. Hard to spot in shallow water." },
      { name: "Tide Runner Mullet", xp: 135, gold: 68, desc: "Moves in with the high tide. Small, fast, and silver. A staple bait for larger predators and a common meal for locals." },
      { name: "Coral Goby", xp: 140, gold: 70, desc: "A colorful little fish that hides in rock crevices near the shore. Very territorial despite its small size. It nips at toes." },
      { name: "Salt Whisker Catfish", xp: 150, gold: 75, desc: "A type of saltwater catfish with stinging whiskers. Watch your hands when unhooking. They grunt when caught." },
      { name: "Blue Stripe Snapper", xp: 160, gold: 80, desc: "A common schooling fish recognizable by the horizontal neon blue stripe. Good eating and easy to catch." }
    ],
    Uncommon: [
      { name: "Glass Shell Crab", xp: 250, gold: 125, desc: "Not technically a fish, but it takes the bait. Its shell is transparent and fragile. You can see its heart beating." },
      { name: "Surf Glider Flying Fish", xp: 270, gold: 135, desc: "Known to jump out of waves and glide for meters. Catching one mid-air is a skill. They flee from tuna." },
      { name: "Reef Doctor Wrasse", xp: 290, gold: 145, desc: "Other fish let this small creature clean their parasites. It is universally respected in the reef. Harming one is bad luck." },
      { name: "Needle Nose Gar", xp: 310, gold: 155, desc: "Long, thin, and silver. It strikes bait sideways with incredible speed. Its teeth are serrated." },
      { name: "Sun-Ray Flounder", xp: 320, gold: 160, desc: "Its back has a pattern that looks like a sunburst. Often found sunbathing in shallows. It buries itself in sand." }
    ],
    Fine: [
      { name: "Pearl Oyster", xp: 550, gold: 275, desc: "A heavy catch that clamps onto the line. Sometimes contains a small pearl, increasing its value to traders." },
      { name: "Azure Fin Tuna", xp: 575, gold: 288, desc: "A beautiful fish deeply saturated with blue pigment. Used to make high-quality dyes. It swims in deep water." },
      { name: "Razor Barracuda", xp: 600, gold: 300, desc: "Dangerous and aggressive. It has been known to bite through steel leaders. It flashes like a silver knife." },
      { name: "Cloud-Puff Puffer", xp: 625, gold: 312, desc: "Inflates into a white ball that looks like a cloud. Do not eat; highly poisonous. It floats on the surface." },
      { name: "Current Rider Jack", xp: 650, gold: 325, desc: "A muscular amberjack that swims against the strongest riptides for fun. It fights fiercely on the line." }
    ],
    Rare: [
      { name: "Royal King Crab", xp: 1200, gold: 600, desc: "Massive, armored, and angry. It requires a net to haul onto the boat. Its claws can snap a broomstick." },
      { name: "Prism Scale Wrasse", xp: 1250, gold: 625, desc: "Refracts sunlight into rainbows under the water. A stunning trophy for any captain. It changes colors when excited." },
      { name: "Golden-Tail Tuna", xp: 1300, gold: 650, desc: "A powerful swimmer with a tail of gold. It never stops moving, even when asleep. Fast and enduring." },
      { name: "Abyss Peeper Angler", xp: 1400, gold: 700, desc: "A fish from the deep that wandered too close to shore. It looks out of place in the bright water. Light hurts its eyes." },
      { name: "Siren Mirror Pomfret", xp: 1500, gold: 750, desc: "Its scales are so reflective they act like a mirror. Legend says it confuses predators with their own reflection." }
    ],
    Epic: [
      { name: "Iron Jaw Shark", xp: 3000, gold: 1500, desc: "An old shark with a jaw full of rusted hooks from failed capture attempts. It knows every trick in the book." },
      { name: "Tsunami Carp", xp: 3150, gold: 1575, desc: "A massive saltwater carp said to be born from the energy of a tidal wave. It surges with incredible power." },
      { name: "Coral Monarch Grouper", xp: 3300, gold: 1650, desc: "A vibrant, multi-colored grouper that commands the reef. Smaller fish bow as it passes. It eats sharks." },
      { name: "Star-Fall Ray", xp: 3400, gold: 1700, desc: "A stingray with glowing white dots resembling the night sky on its back. It glides with celestial grace." },
      { name: "Deep Blue Marlin", xp: 3500, gold: 1750, desc: "The ultimate sport fish. It leaps high into the air, challenging the gods of the sea. A true test of skill." }
    ],
    Legendary: [
      { name: "Tidecaller Oarfish", xp: 8000, gold: 4000, desc: "A serpent so large its movements control the tides. Fishermen pray to it for safe passage. It spans the horizon." },
      { name: "Sunken Guard Swordfish", xp: 8500, gold: 4250, desc: "Clad in natural armor that looks like golden plate mail. It fights with military precision. A relic of a lost war." },
      { name: "Oceanus Spirit Ray", xp: 9000, gold: 4500, desc: "A manifestation of the ocean's will. It is made of living water and foam. It dissolves if kept out of water too long." }
    ],
    Mythic: [
      { name: "Kraken Spawn (Squid)", xp: 22000, gold: 11000, desc: "Only a baby, but still capable of crushing a boat. Tentacles everywhere. It inks the whole sea black." },
      { name: "Poseidon's Chariot (Seahorse)", xp: 25000, gold: 12500, desc: "A gigantic Seahorse that thunders through the waves. It creates storms where it gallops. The steed of a god." }
    ]
  }
},

  5: {
    name: "Stoneheart Grotto",
    unlockLevel: 70,
    unlockGold: 125000,
    boatRequired: "Lantern Barge",
    boatPrice: 125000,
    description: "A massive underground lake hidden beneath the mountains. The ceiling is studded with glowing crystals that mimic a starry night. The water is still, cold, and echoes with the drip of stalactites.",
    fish: {
      Common: [
        { name: "Cave Blindfish", xp: 200, gold: 100, desc: "Pale, eyeless, and harmless. It navigates using sensitive whiskers. Common food for larger cave beasts." },
        { name: "Pebble Crab", xp: 210, gold: 105, desc: "Its shell looks exactly like a grey cavern rock. You only know it's alive when it pinches you. Hides in plain sight." },
        { name: "Drip Catcher Minnow", xp: 220, gold: 110, desc: "Hovers under stalactites waiting for minerals to drip into the water. Its mouth is upturned and wide." },
        { name: "Pale Goby", xp: 235, gold: 118, desc: "A ghost-white fish that blends into the limestone bottom. It stays perfectly still for hours." },
        { name: "Echo Minnow", xp: 250, gold: 125, desc: "Travels in swarms that create a unique clicking sound to navigate the dark. They react to loud noises." }
      ],
      Uncommon: [
        { name: "Crystal Fin Tetra", xp: 400, gold: 200, desc: "Its fins have calcified into sharp, crystal-like structures. Beautiful but sharp. Handle with gloves." },
        { name: "Bat-Wing Ray", xp: 425, gold: 212, desc: "A ray that mimics the shape of a bat. It glides silently through the dark water. Often mistaken for a falling rock." },
        { name: "Glow-Worm Trout", xp: 450, gold: 225, desc: "Its stomach glows faintly from all the bioluminescent worms it eats. Easy to spot in the dark." },
        { name: "Slate Scale Carp", xp: 475, gold: 238, desc: "Heavy and armored with grey slate. It sinks like a rock when it stops swimming. Strong bottom feeder." },
        { name: "Shadow Leech", xp: 500, gold: 250, desc: "A large, parasitic fish. It tries to latch onto the boat hull or unsuspecting swimmers." }
      ],
      Fine: [
        { name: "Stalactite Bass", xp: 800, gold: 400, desc: "Hangs vertically in the water, mimicking a stone formation. It drops on prey from above." },
        { name: "Quartz Eye Catfish", xp: 850, gold: 425, desc: "Although blind, its eye sockets are filled with raw quartz crystals. It senses magnetic fields." },
        { name: "Miner’s Bane Pike", xp: 875, gold: 438, desc: "Known to steal tools and shiny objects dropped by miners. It has a collection in its nest." },
        { name: "Deep Echo Eel", xp: 900, gold: 450, desc: "It emits a sonic pulse that can stun small prey. You can feel the vibration in the rod." },
        { name: "Luminous Carp", xp: 950, gold: 475, desc: "The only source of light in the deep grotto. It glows with a warm, yellow light. A beacon in the dark." }
      ],
      Rare: [
        { name: "Obsidian Snapper", xp: 1800, gold: 900, desc: "Scales as black and sharp as volcanic glass. It cuts through nets easily." },
        { name: "Gem Hoarder Crab", xp: 1900, gold: 950, desc: "It glues raw gemstones to its shell for camouflage. Very valuable to jewelers." },
        { name: "Ancient Salamander", xp: 2000, gold: 1000, desc: "Not a fish, but a relic from a forgotten age. It has six legs and breathes water. A living fossil." },
        { name: "Whispering Geode Puffer", xp: 2100, gold: 1050, desc: "A round fish with a rough exterior. When opened, its insides sparkle like a geode." },
        { name: "Silent Monk Fish", xp: 2200, gold: 1100, desc: "A fish that sits perfectly still for years. It is said to be meditating. Moves only when necessary." }
      ],
      Epic: [
        { name: "Crystal Golem Fish", xp: 4500, gold: 2250, desc: "Is it alive? Is it magic? It seems made entirely of animated crystal. Hard as diamond." },
        { name: "Subterranean Shark", xp: 4750, gold: 2375, desc: "Pale, blind, and terrifying. It hunts by sensing the heartbeat of the angler. The apex predator of the dark." },
        { name: "Magma Vein Trout", xp: 5000, gold: 2500, desc: "Found near thermal vents. Its veins glow orange with heat. It boils the water around it." },
        { name: "Void Gazer Catfish", xp: 5250, gold: 2625, desc: "It stares into the abyss, and the abyss stares back. Dark energy radiates from it." },
        { name: "Stoneheart Gar", xp: 5500, gold: 2750, desc: "A fish with skin as hard as granite. It protects the secrets of the grotto. Arrows bounce off it." }
      ],
      Legendary: [
        { name: "Diamondback Sturgeon", xp: 12000, gold: 6000, desc: "A creature made of living diamond. It is virtually indestructible and worth a fortune." },
        { name: "Mountain Soul Ray", xp: 13000, gold: 6500, desc: "A massive, glowing entity that embodies the crushing weight of the earth. It moves through rock like water." },
        { name: "Onyx Leviathan Eel", xp: 14000, gold: 7000, desc: "A shadow that moves. It swallows light and hope. The ultimate challenge of the dark." }
      ],
      Mythic: [
        { name: "Crystal Dragon Serpent", xp: 35000, gold: 17500, desc: "A serpentine dragon with scales of pure sapphire. It breathes blue fire underwater." },
        { name: "Earthshaker Whale", xp: 40000, gold: 20000, desc: "When this massive beast moves, the entire mountain trembles. It is the heart of the grotto." }
      ]
    }
  }
},
{
  6: {
    name: "Frosthollow Fjord",
    unlockLevel: 100,
    unlockGold: 350000,
    boatRequired: "Icebreaker Skiff",
    boatPrice: 350000,
    description: "A jagged inlet carved by ancient glaciers. Massive icebergs float lazily in the steel-grey water. The air is so cold it hurts to breathe.",
    fish: {
      Common: [
        { name: "Icicle Minnow", xp: 300, gold: 150, desc: "Transparent and rigid. It looks exactly like a floating shard of ice until it twitches. Hard to spot." },
        { name: "Blue Lip Cod", xp: 310, gold: 155, desc: "A hardy fish with thick fat reserves. Its lips are a permanent frostbitten blue. Delicious in stew." },
        { name: "Slush Puppy Sculpin", xp: 320, gold: 160, desc: "A small, soft-bodied fish that thrives in the semi-frozen slush on the water's surface." },
        { name: "Snowflake Flounder", xp: 330, gold: 165, desc: "Its skin pattern is a unique geometric fractal, perfectly mimicking falling snow. Camouflage expert." },
        { name: "Glacier Mite (Parasite)", xp: 340, gold: 170, desc: "A parasitic fish that attaches itself to the underside of icebergs. It eats algae and ice." }
      ],
      Uncommon: [
        { name: "Thermal Seeker Trout", xp: 600, gold: 300, desc: "It can sense body heat from yards away. It swarms around boat engines for warmth." },
        { name: "Frost Bite Eel", xp: 625, gold: 312, desc: "Its bite freezes the wound instantly. Handle with thick leather gloves to avoid frostbite." },
        { name: "Winter Coat Bass", xp: 650, gold: 325, desc: "It has developed a layer of fuzz on its scales that resembles white fur. Keeps it warm in zero degrees." },
        { name: "Hailstone Crab", xp: 675, gold: 338, desc: "Its shell is white, round, and incredibly hard. It mimics a large hailstone to avoid birds." },
        { name: "Aurora Guppy", xp: 700, gold: 350, desc: "When it swims, it leaves a faint trail of green and purple light. Beautiful in the polar night." }
      ],
      Fine: [
        { name: "Crystal Spine Snapper", xp: 1200, gold: 600, desc: "Its dorsal fins are made of sharp, clear ice crystals that regrow if broken. Very sharp." },
        { name: "Deep Freeze Tuna", xp: 1250, gold: 625, desc: "It swims in the deepest, coldest currents. Its meat is considered a delicacy served frozen." },
        { name: "Mammoth Sculpin", xp: 1300, gold: 650, desc: "An ugly, prehistoric-looking fish with tusks. It looks like it belongs in the Ice Age." },
        { name: "Polar Ray", xp: 1350, gold: 675, desc: "A pure white stingray that buries itself in underwater snow drifts. Invisible hunter." },
        { name: "Shiver Scale Pike", xp: 1400, gold: 700, desc: "It vibrates constantly to generate body heat, creating ripples in the water. Aggressive striker." }
      ],
      Rare: [
        { name: "Cryo Phoenix Fish", xp: 2500, gold: 1250, desc: "A brilliant blue fish with fins that look like wings. It leaps from the water to glide in the freezing wind." },
        { name: "Ice Forged Pike", xp: 2650, gold: 1325, desc: "Its scales are as hard as steel plate. It shatters standard fishing hooks. Needs a diamond lure." },
        { name: "White Walker Crab", xp: 2800, gold: 1400, desc: "A crab with long legs that walks on the underside of the ice sheet. Creepy and silent." },
        { name: "Glacial Heart Jelly", xp: 2900, gold: 1450, desc: "A pulsating blue jellyfish-like creature. It is cold enough to freeze water around it." },
        { name: "Frozen Timekeeper Cod", xp: 3000, gold: 1500, desc: "An ancient fish often found encased in ice, yet it swims away alive when thawed." }
      ],
      Epic: [
        { name: "Avalanche Shark", xp: 6000, gold: 3000, desc: "White, massive, and silent. It strikes with the force of a collapsing snow bank." },
        { name: "Frost Giant’s Carp", xp: 6250, gold: 3125, desc: "A carp the size of a whale. Legends say it escaped a giant's bowl. Eats anything." },
        { name: "Rune Marked Salmon", xp: 6500, gold: 3250, desc: "Natural markings on its side resemble ancient runes of power. Glows blue." },
        { name: "Blizzard Serpent Eel", xp: 6750, gold: 3375, desc: "A long white eel that swims through the air during heavy snowstorms. Hard to catch." },
        { name: "Permafrost Turtle", xp: 7000, gold: 3500, desc: "A turtle whose shell is an actual miniature iceberg. Moves incredibly slowly." }
      ],
      Legendary: [
        { name: "Aurora Spirit Trout", xp: 16000, gold: 8000, desc: "A celestial fish that shifts colors with the northern lights. It is breathtakingly beautiful." },
        { name: "Icebreaker Gar", xp: 17000, gold: 8500, desc: "A fish with a skull of adamantine. It smashes through ice sheets to breathe." },
        { name: "Zero Point Entity", xp: 18000, gold: 9000, desc: "A being of absolute zero temperature. The water freezes instantly where it swims." }
      ],
      Mythic: [
        { name: "Ymir’s Tear Dropfish", xp: 45000, gold: 22000, desc: "A sentient drop of water from the first glacier. It holds the memory of the world's creation." },
        { name: "Fenrir Wolf-Fish", xp: 50000, gold: 25000, desc: "A wolf-fish monstrosity chained to the bottom of the fjord. It struggles to break free." }
      ]
    }
  },
  7: {
    name: "Verdant Canopy River",
    unlockLevel: 140,
    unlockGold: 750000,
    boatRequired: "Hover-Fan Boat",
    boatPrice: 750000,
    description: "A massive river system flowing through the treetops of a giant rainforest. The water is suspended in natural aqueducts of giant leaves and hollow branches.",
    fish: {
      Common: [
        { name: "Leaf Mimic Tetra", xp: 420, gold: 210, desc: "Perfectly resembles a fallen green leaf. It drifts with the current until prey comes close." },
        { name: "Raindrop Tetra", xp: 430, gold: 215, desc: "A tiny, clear fish that gathers in the millions during heavy rainfalls. They sparkle like water." },
        { name: "Vine Swing Goby", xp: 440, gold: 220, desc: "Uses its pectoral fins to grip hanging vines, climbing out of the water to find insects." },
        { name: "Bark Biter Pacu", xp: 450, gold: 225, desc: "It eats the wood of the giant trees. A pest to the ecosystem, but tasty." },
        { name: "Humid Air Betta", xp: 460, gold: 230, desc: "The air is so wet here this fish can swim through the mist for short distances." }
      ],
      Uncommon: [
        { name: "Poison Dart Minnow", xp: 800, gold: 400, desc: "Bright neon orange. Do not touch its skin; it causes temporary paralysis." },
        { name: "Canopy Glider Fish", xp: 825, gold: 412, desc: "It leaps from the high river and glides down to lower pools. Wings like a bird." },
        { name: "Orchid Trap Catfish", xp: 850, gold: 425, desc: "Looks like a beautiful flower. When a bug lands on it, SNAP." },
        { name: "Jaguar Catfish", xp: 875, gold: 438, desc: "A predator with the spots of a jungle cat. It hunts with stealth." },
        { name: "Monkey Tail Eel", xp: 900, gold: 450, desc: "It has a prehensile tail it uses to hang from branches while sleeping." }
      ],
      Fine: [
        { name: "Emerald Piranha", xp: 1600, gold: 800, desc: "A solitary piranha made of glimmering green scales. Its bite can shear metal." },
        { name: "Sunbeam Snapper", xp: 1650, gold: 825, desc: "It captures sunlight in its scales to flash-blind predators. Bright as a mirror." },
        { name: "Fruit Eater Carp", xp: 1700, gold: 850, desc: "A fat, happy fish that only eats fallen exotic fruits. It tastes like mango." },
        { name: "Chameleon Bass", xp: 1750, gold: 875, desc: "It changes color instantly to match the riverbed. A test of a fisherman's eye." },
        { name: "Hive Mind Tetras", xp: 1800, gold: 900, desc: "It lives symbiotically with fire ants in hollow logs. They attack in swarms." }
      ],
      Rare: [
        { name: "Green Man’s Cichlid", xp: 3500, gold: 1750, desc: "A fish with a face that looks uncomfortably human and covered in moss." },
        { name: "Jungle Drummer Drum", xp: 3650, gold: 1825, desc: "It beats its tail against hollow wood to communicate. The sound travels for miles." },
        { name: "Viper Snakehead", xp: 3800, gold: 1900, desc: "A long fish with fangs that injects a potent necrotic venom. Aggressive." },
        { name: "Golden Beetle Fish", xp: 3900, gold: 1950, desc: "Heavily armored with a shell like a scarab. It shimmers with iridescence." },
        { name: "Amazonian King Arapaima", xp: 4000, gold: 2000, desc: "A massive Arapaima relative with red scales that burn to the touch." }
      ],
      Epic: [
        { name: "Titan Boa Eel", xp: 8000, gold: 4000, desc: "As thick as a tree trunk. It crushes boats by coiling around them." },
        { name: "Photosynthesis Bass", xp: 8250, gold: 4125, desc: "It doesn't eat; it absorbs sunlight. It radiates pure life energy." },
        { name: "Lost Idol Arowana", xp: 8500, gold: 4250, desc: "A gold fish shaped exactly like an ancient forgotten god. Worth a fortune." },
        { name: "Razor Leaf Ray", xp: 8750, gold: 4375, desc: "A flat fish with edges sharp enough to cut through the giant branches holding the river." },
        { name: "Apex Stalker Tigerfish", xp: 9000, gold: 4500, desc: "The ghost of the jungle. It has never been photographed, only caught by masters." }
      ],
      Legendary: [
        { name: "Heart of Jungle Discus", xp: 20000, gold: 10000, desc: "A pulsing, living emerald that swims. It controls the growth of the forest." },
        { name: "Quetzalcoatl Serpent", xp: 21000, gold: 10500, desc: "A feathered serpent fish. It brings rain and fertility where it swims." },
        { name: "Primal Instigator Piranha", xp: 22000, gold: 11000, desc: "Its roar causes all nearby animals to go into a frenzy. Pure chaos." }
      ],
      Mythic: [
        { name: "Gaia’s Leviathan Turtle", xp: 55000, gold: 27500, desc: "An island-sized turtle with an entire ecosystem on its shell, swimming in the canopy river." },
        { name: "World Tree Root Eel", xp: 60000, gold: 30000, desc: "A sentient root tip of the Yggdrasil. To catch it is to hold the foundation of the world." }
      ]
    }
  },
  8: {
    name: "Mirage Oasis",
    unlockLevel: 200,
    unlockGold: 1250000,
    boatRequired: "Sand-Skimmer Sail",
    boatPrice: 1250000,
    description: "A shimmering pool of water in the center of an infinite, scorching desert. The heat creates constant mirages.",
    fish: {
      Common: [
        { name: "Sand Diver Goby", xp: 550, gold: 275, desc: "A small brown fish that dives into the sand bed the moment it feels vibration." },
        { name: "Heatwave Minnow", xp: 570, gold: 285, desc: "Its body ripples like heat distortion. Hard to focus on." },
        { name: "Cactus Spine Puffer", xp: 590, gold: 295, desc: "Covered in needles identical to a cactus. Don't step on it." },
        { name: "Dune Guppy", xp: 610, gold: 305, desc: "A dusty-colored fish that survives in muddy, drying puddles." },
        { name: "Bleached Bonefish", xp: 630, gold: 315, desc: "Pale white and skeletal. It looks dead, but it’s just very thin." }
      ],
      Uncommon: [
        { name: "Scarab Shell Carp", xp: 1100, gold: 550, desc: "Its scales form a hard, metallic shell. Prized by desert nomads." },
        { name: "Oasis Jewel Cichlid", xp: 1150, gold: 575, desc: "A bright sapphire blue fish. The only spot of color in the yellow desert." },
        { name: "Dust Devil Ray", xp: 1200, gold: 600, desc: "It spins rapidly to burrow into the sand, creating mini dust cyclones." },
        { name: "Camel Hump Bass", xp: 1250, gold: 625, desc: "It stores water in a fatty hump on its back, allowing it to survive droughts." },
        { name: "Nomad Eel", xp: 1300, gold: 650, desc: "It never stays in one pond, slithering across the dunes at night to find new water." }
      ],
      Fine: [
        { name: "Scorpion Fish", xp: 2200, gold: 1100, desc: "It has a tail with a stinger. The venom causes hallucinations." },
        { name: "Pharaoh Mask Discus", xp: 2300, gold: 1150, desc: "Its face markings resemble the burial mask of an ancient king." },
        { name: "Sandstorm Shark", xp: 2400, gold: 1200, desc: "A small shark with rough skin like sandpaper. It hunts in packs during storms." },
        { name: "Mirage Maker Betta", xp: 2500, gold: 1250, desc: "It projects an illusion of a larger fish to scare away predators." },
        { name: "Pottery Hider Catfish", xp: 2500, gold: 1250, desc: "It hides inside sunken clay jars. Sometimes you catch the jar, sometimes the fish." }
      ],
      Rare: [
        { name: "Sphinx Fin Perch", xp: 5000, gold: 2500, desc: "A majestic fish that poses riddles. Or at least looks like it does." },
        { name: "Liquid Gold Carp", xp: 5250, gold: 2625, desc: "A fish that looks like molten gold. It is incredibly heavy and valuable." },
        { name: "Thirst Parasite", xp: 5500, gold: 2750, desc: "A parasitic fish that drains water from its prey." },
        { name: "Sun Disk Discus", xp: 5750, gold: 2875, desc: "Perfectly round and glowing. It represents the sun god." },
        { name: "Desert Rose Ray", xp: 6000, gold: 3000, desc: "A fish formed from crystallized minerals. It is fragile but beautiful." }
      ],
      Epic: [
        { name: "Sand Worm Eel", xp: 11000, gold: 5500, desc: "Half fish, half giant worm. It terrorizes the deep sands." },
        { name: "Grave Robber Pike", xp: 11500, gold: 5750, desc: "It collects gold coins and jewelry from drowned travelers." },
        { name: "Eternal Mummy Fish", xp: 12000, gold: 6000, desc: "A fish wrapped in bandage-like skin. It has been alive for thousands of years." },
        { name: "Solar Flare Bass", xp: 12500, gold: 6250, desc: "Touching it burns. It radiates the heat of high noon." },
        { name: "Mirage King Salmon", xp: 13000, gold: 6500, desc: "You think you caught it, but you're actually holding a boot. It warps reality." }
      ],
      Legendary: [
        { name: "Anubis Jackal Fish", xp: 28000, gold: 14000, desc: "A black jackal-headed fish. It weighs the soul of the angler." },
        { name: "Djinn Spirit Carp", xp: 30000, gold: 15000, desc: "A spirit trapped in the form of a fish. Catching it might grant a wish." },
        { name: "Cleopatra’s Needle Gar", xp: 32000, gold: 16000, desc: "A long, slender fish covered in hieroglyphs recounting the history of the desert." }
      ],
      Mythic: [
        { name: "Apep Chaos Serpent", xp: 75000, gold: 37500, desc: "The serpent of darkness that tries to swallow the sun. A world-ending catch." },
        { name: "Living Oasis Whale", xp: 80000, gold: 40000, desc: "The fish IS the water. To land it is to drain the oasis dry." }
      ]
    }
  }
}
