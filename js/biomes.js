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
      ],
      Exotic: [
        { name: "Placeholder Exotic River Titan", xp: 5000, gold: 2500, desc: "An ultra-rare placeholder awaiting its true form. Even placeholders have legends." }
      ],
      Arcane: [
        { name: "Placeholder Arcane River God", xp: 10000, gold: 5000, desc: "The rarest of placeholders, born from pure impossibility. A once-in-a-lifetime catch." }
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
      ],
      Exotic: [
        { name: "Placeholder Exotic Lake Phantom", xp: 12000, gold: 6000, desc: "A spectral placeholder that haunts the deep waters. Rarer than mist itself." }
      ],
      Arcane: [
        { name: "Placeholder Arcane Lake Leviathan", xp: 20000, gold: 10000, desc: "The ultimate lake mystery, wrapped in placeholder form. Beyond comprehension." }
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
      ],
      Exotic: [
        { name: "Placeholder Exotic Swamp Horror", xp: 25000, gold: 12500, desc: "A placeholder born from the darkest depths of the bog. Unspeakably rare." }
      ],
      Arcane: [
        { name: "Placeholder Arcane Bog Ancient", xp: 35000, gold: 17500, desc: "An impossibility made manifest. The swamp's oldest secret in placeholder form." }
      ]
    }
  },
  4: {
  name: "Sapphire Coast",
  unlockLevel: 50,
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
    ],
    Exotic: [
      { name: "Placeholder Exotic Ocean Titan", xp: 40000, gold: 20000, desc: "A placeholder forged from ocean currents. Rarer than the deepest pearl." }
    ],
    Arcane: [
      { name: "Placeholder Arcane Sea Primordial", xp: 50000, gold: 25000, desc: "The ocean's ultimate mystery. A placeholder beyond mortal comprehension." }
    ]
  }
},

  5: {
    name: "Stoneheart Grotto",
    unlockLevel: 75,
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
      ],
      Exotic: [
        { name: "Placeholder Exotic Crystal Leviathan", xp: 60000, gold: 30000, desc: "A crystalline placeholder of breathtaking beauty. Rarer than any gem." }
      ],
      Arcane: [
        { name: "Placeholder Arcane Grotto Titan", xp: 75000, gold: 37500, desc: "The mountain's deepest secret in placeholder form. Beyond legendary." }
      ]
    }
  },

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
        { name: "Ymir's Tear Dropfish", xp: 45000, gold: 22000, desc: "A sentient drop of water from the first glacier. It holds the memory of the world's creation." },
        { name: "Fenrir Wolf-Fish", xp: 50000, gold: 25000, desc: "A wolf-fish monstrosity chained to the bottom of the fjord. It struggles to break free." }
      ],
      Exotic: [
        { name: "Placeholder Exotic Frost Colossus", xp: 80000, gold: 40000, desc: "A placeholder forged from eternal ice. Even legends fear its rarity." }
      ],
      Arcane: [
        { name: "Placeholder Arcane Fjord Primordial", xp: 100000, gold: 50000, desc: "The fjord's ultimate mystery. A placeholder from the dawn of time." }
      ]
    }
  },
  7: {
    name: "Verdant Canopy River",
    unlockLevel: 150,
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
        { name: "Gaia's Leviathan Turtle", xp: 55000, gold: 27500, desc: "An island-sized turtle with an entire ecosystem on its shell, swimming in the canopy river." },
        { name: "World Tree Root Eel", xp: 60000, gold: 30000, desc: "A sentient root tip of the Yggdrasil. To catch it is to hold the foundation of the world." }
      ],
      Exotic: [
        { name: "Placeholder Exotic Canopy Behemoth", xp: 100000, gold: 50000, desc: "A placeholder dwelling in the highest branches. Rarer than sunlight through the canopy." }
      ],
      Arcane: [
        { name: "Placeholder Arcane Sky Serpent", xp: 120000, gold: 60000, desc: "The canopy's greatest enigma. A placeholder of impossible altitude." }
      ]
    }
  },
  8: {
    name: "Mirage Oasis",
    unlockLevel: 200,
    unlockGold: 1500000,
    boatRequired: "Sand-Skimmer Sail",
    boatPrice: 1500000,
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
      ],
      Exotic: [
        { name: "Placeholder Exotic Desert Mirage", xp: 130000, gold: 65000, desc: "A placeholder born from sand and heat. Rarer than water in the wasteland." }
      ],
      Arcane: [
        { name: "Placeholder Arcane Sandstorm Deity", xp: 150000, gold: 75000, desc: "The desert's ultimate secret. A placeholder that bends reality like heat waves." }
      ]
    }
  },
    9: {
    name: "The Cheddar Gorge (CHEESE BIOME)",
    unlockLevel: 300,
    unlockGold: 3000000,
    boatRequired: "Cracker-Hull Raft",
    boatPrice: 3000000,
    description: "A delicious, yellow river of molten cheese flowing through a canyon of solid swiss. The air smells savory and rich. Mouse-sized",
    fish: {
      Common: [
        { name: "Macaroni Minnow", xp: 750, gold: 375, desc: "A small, curved fish. Often found swimming in school with cheese sauce." },
        { name: "Curd Carp", xp: 780, gold: 390, desc: "A lumpy white fish. It hasn't quite matured into a sharp cheddar yet." },
        { name: "Nacho Tetra", xp: 810, gold: 405, desc: "Triangular and dusty orange. Has a spicy kick when touched." },
        { name: "String Cheese Eel", xp: 840, gold: 420, desc: "Long, fibrous, and stretchy. It can be pulled apart into thin strands." },
        { name: "Cracker Crumb Crab", xp: 870, gold: 435, desc: "Uses a discarded soda cracker as a shell. Very crunchy." }
      ],
      Uncommon: [
        { name: "Sharp Cheddar Shark", xp: 1500, gold: 750, desc: "Its teeth are made of aged cheddar. Surprisingly sharp." },
        { name: "Mozzarella Ray", xp: 1550, gold: 775, desc: "Soft, white, and very stretchy. It melts if left in the sun too long." },
        { name: "Swiss Hole Flounder", xp: 1600, gold: 800, desc: "A flat fish covered in natural holes. It whistles when it swims." },
        { name: "Pepper Jack Pike", xp: 1650, gold: 825, desc: "Speckled with hot peppers. Aggressive and spicy." },
        { name: "Fondue Catfish", xp: 1700, gold: 850, desc: "Dripping with warm, liquid cheese. It leaves a gooey trail." }
      ],
      Fine: [
        { name: "Brie Bass", xp: 3000, gold: 1500, desc: "Has a hard white rind exterior and a soft, gooey interior. Fancy." },
        { name: "Gouda Goldfish", xp: 3100, gold: 1550, desc: "Covered in a red wax coating. Peel it before releasing." },
        { name: "Blue Cheese Betta", xp: 3200, gold: 1600, desc: "Moldy, smelly, and an acquired taste. Fights fiercely." },
        { name: "Parmesan Puffer", xp: 3300, gold: 1650, desc: "Explodes into a cloud of grated cheese dust when frightened." },
        { name: "Ricotta Ray", xp: 3400, gold: 1700, desc: "Lumpy and soft. Used in lasagna by giant chefs." }
      ],
      Rare: [
        { name: "Stilton Sturgeon", xp: 7000, gold: 3500, desc: "An ancient, crumbly fish. The smell attracts mice from miles away." },
        { name: "Feta Flounder", xp: 7250, gold: 3625, desc: "Lives in brine pools. Very salty and crumbly." },
        { name: "Queso Dip Carp", xp: 7500, gold: 3750, desc: "A spicy, semi-liquid fish. Usually found near tortilla chips." },
        { name: "Provolone Pike", xp: 7750, gold: 3875, desc: "Smoked flavor. Hanging it up makes it taste better." },
        { name: "Camembert Catfish", xp: 8000, gold: 4000, desc: "Extremely creamy. It slides right out of the net." }
      ],
      Epic: [
        { name: "The Big Cheese (Whale)", xp: 15000, gold: 7500, desc: "The boss of the river. A massive wheel of cheese with fins." },
        { name: "Limburger Leviathan", xp: 15500, gold: 7750, desc: "The smell is weaponized. It stuns smaller fish instantly." },
        { name: "Grilled Cheese Ray", xp: 16000, gold: 8000, desc: "Flat, toasted, and warm. Comfort food of the sea." },
        { name: "Truffle Oil Trout", xp: 16500, gold: 8250, desc: "Extremely expensive and earthy. A gourmet catch." },
        { name: "Pizza Topping Anchovy", xp: 17000, gold: 8500, desc: "Salty and controversial. You either love it or hate it." }
      ],
      Legendary: [
        { name: "Golden Wheel Wahoo", xp: 40000, gold: 20000, desc: "A perfectly round, rolling fish made of 24-karat cheddar." },
        { name: "Aging Barrel Barracuda", xp: 42000, gold: 21000, desc: "Has aged for 50 years. Sharpest taste in the ocean." },
        { name: "Dairy King Crab", xp: 45000, gold: 22500, desc: "A crab made of butter and cream. Rich and deadly." }
      ],
      Mythic: [
        { name: "The Moon Slice (Mola Mola)", xp: 100000, gold: 50000, desc: "Proof that the moon is made of cheese. It fell from the sky." },
        { name: "Lactose Intolerant Nightmare", xp: 110000, gold: 55000, desc: "A chaotic swirl of milk and stomach aches. The ultimate bad time." }
      ],
      Exotic: [
        { name: "Placeholder Exotic Dairy Deity", xp: 180000, gold: 90000, desc: "A placeholder crafted from the finest cheddar. Impossibly rare and utterly absurd." }
      ],
      Arcane: [
        { name: "Placeholder Arcane Cheese Singularity", xp: 200000, gold: 100000, desc: "The ultimate cheese paradox. A placeholder that defies all lactose logic." }
      ]
    }
  },
    10: {
    name: "Thundercliff Bay",
    unlockLevel: 400,
    unlockGold: 7500000,
    boatRequired: "Lightning-Rod Frigate",
    boatPrice: 7500000, 
    description: "A turbulent bay surrounded by jagged black cliffs. A perpetual thunderstorm rages overhead, and lightning strikes the water every few seconds.",
    fish: {
      Common: [
        { name: "Static Minnow", xp: 1100, gold: 550, desc: "Giving it a shake generates a small spark. Used as batteries by locals." },
        { name: "Storm Grey Cod", xp: 1150, gold: 575, desc: "Blends in with the dark, choppy water. Tastes like ozone." },
        { name: "Thunder Clap Crab", xp: 1200, gold: 600, desc: "When it snaps its claw, it sounds like a gunshot." },
        { name: "Rain Dancer Betta", xp: 1250, gold: 625, desc: "It leaps out of the water to catch raindrops. Fins look like rain clouds." },
        { name: "Volt Leech", xp: 1300, gold: 650, desc: "It attaches to larger fish and drains their bio-electricity." }
      ],
      Uncommon: [
        { name: "Lightning Rod Eel", xp: 2200, gold: 1100, desc: "It sticks its tail out of the water to catch lightning strikes." },
        { name: "Spark Fin Bass", xp: 2300, gold: 1150, desc: "Its fins crackle with yellow energy. Fast and erratic swimmer." },
        { name: "Cloud Reflection Carp", xp: 2400, gold: 1200, desc: "Its scales mirror the storm clouds above. Hard to distinguish from the sky reflection." },
        { name: "Gale Force Guppy", xp: 2450, gold: 1225, desc: "Small but incredibly strong. It can swim up a waterfall." },
        { name: "Current Cutter Tuna", xp: 2500, gold: 1250, desc: "Its body is streamlined to slice through the roughest waves without slowing down." }
      ],
      Fine: [
        { name: "Thunderstruck Trout", xp: 4500, gold: 2250, desc: "Glowing blue scars cover its body from surviving lightning strikes." },
        { name: "Magnet Scale Pike", xp: 4600, gold: 2300, desc: "Highly magnetic scales. It sticks to the side of metal boats." },
        { name: "Storm Eye Flounder", xp: 4700, gold: 2350, desc: "The pattern on its back looks like a hurricane radar map." },
        { name: "Electric Ray", xp: 4800, gold: 2400, desc: "The classic shocker. Delivers 500 volts of 'Leave me alone.'" },
        { name: "Pulse Heart Drum", xp: 5000, gold: 2500, desc: "Its heartbeat is so strong it creates ripples in the water." }
      ],
      Rare: [
        { name: "Conductor Bonefish", xp: 10000, gold: 5000, desc: "A fish with a copper-like skeleton. It directs the flow of electricity in the bay." },
        { name: "Tempest Turtle", xp: 10500, gold: 5250, desc: "Its shell looks like a dark thunderhead. It snaps with the sound of thunder." },
        { name: "Flash Bang Snapper", xp: 11000, gold: 5500, desc: "Emits a blinding flash of light and a deafening noise when hooked." },
        { name: "Plasma Shark", xp: 11500, gold: 5750, desc: "It spews balls of plasma. Dangerous and unstable." },
        { name: "Torrent Elemental Bass", xp: 12000, gold: 6000, desc: "A water elemental in the shape of a fish. It is made of pure velocity." }
      ],
      Epic: [
        { name: "Mjolnir Hammerhead", xp: 22000, gold: 11000, desc: "A hammerhead shark that hits with the force of a god." },
        { name: "Zeus Goldfish", xp: 23000, gold: 11500, desc: "A tiny, arrogant fish that wields lightning bolts. Do not underestimate it." },
        { name: "Stormborn Leviathan Eel", xp: 24000, gold: 12000, desc: "A massive serpent that rides the lightning between the clouds and the sea." },
        { name: "Eye of Storm Carp", xp: 24500, gold: 12250, desc: "Catching this fish stops the rain for exactly one minute. Peaceful and calm." },
        { name: "Voltage Vampire Lamprey", xp: 25000, gold: 12500, desc: "It drains the power from your boat, your rod, and your will to live." }
      ],
      Legendary: [
        { name: "Thunderbird Ray", xp: 60000, gold: 30000, desc: "A manta ray with wings of electricity. It flies more than it swims." },
        { name: "Aspect of Storms Pike", xp: 62000, gold: 31000, desc: "The physical embodiment of the tempest. Pure chaos on a line." },
        { name: "Fulminator Spirit", xp: 65000, gold: 32500, desc: "A creature of pure energy. It has no solid form, only light and sound." }
      ],
      Mythic: [
        { name: "Raijin Drum Sunfish", xp: 150000, gold: 75000, desc: "A massive sunfish that creates thunder by slapping the water." },
        { name: "World Splitter Eel", xp: 160000, gold: 80000, desc: "A beam of concentrated lightning that took the form of an eel. It cuts the horizon in half." }
      ],
      Exotic: [
        { name: "Placeholder Exotic Storm Titan", xp: 250000, gold: 125000, desc: "A placeholder forged from pure electricity. Rarer than lightning striking twice." }
      ],
      Arcane: [
        { name: "Placeholder Arcane Thunder God", xp: 300000, gold: 150000, desc: "The storm's ultimate secret. A placeholder that commands the very heavens." }
      ]
    }
  },
    11: {
    name: "Moonshadow Lake",
    unlockLevel: 500,
    unlockGold: 15000000, 
    boatRequired: "Crescent-Wood Skiff",
    boatPrice: 15000000, 
    description: "A perfectly circular lake that reflects the night sky with impossible clarity. It is perpetually night here, regardless of the time elsewhere. The water is ink-black but glows with fallen starlight, and the",
    fish: {
      Common: [
        { name: "Star-Dust Guppy", xp: 1300, gold: 650, desc: "Its scales are dusted with a glittering powder that glows in the dark. Large schools look like underwater galaxies. They are often kept in jars as living nightlights." },
        { name: "Crater-Back Crab", xp: 1350, gold: 675, desc: "Its shell has pockmarks resembling the surface of the moon. It scuttles sideways across the lakebed, kicking up clouds of stardust. Its claws are surprisingly strong for crushing moon-snails." },
        { name: "Midnight Minnow", xp: 1400, gold: 700, desc: "Completely black, this fish is visible only by the silhouette it blocks against the reflected stars. It moves silently and swiftly. Catching one requires keen eyesight." },
        { name: "Tidal Pull Tetra", xp: 1450, gold: 725, desc: "It swims in perfect sync with the phases of the moon. During a full moon, they swim near the surface; during a new moon, they dive deep. They are sensitive to gravity." },
        { name: "Waxing Gibbous Sunfish", xp: 1500, gold: 750, desc: "A round, flat fish that grows brighter as it eats. By the time it is full, it glows like a pale lantern. It prefers the calm waters near the lake's center." }
      ],
      Uncommon: [
        { name: "Eclipse Eel", xp: 2600, gold: 1300, desc: "A dark eel with a distinct ring of bright light around its neck. It coils itself to mimic a solar eclipse when threatened. Its skin is cold to the touch." },
        { name: "Comet Tail Goldfish", xp: 2700, gold: 1350, desc: "Fast and bright, it leaves a streak of light in the water when it bolts. Fishermen say catching one brings good fortune. It is a favorite prize in celestial festivals." },
        { name: "Lunar Moth Betta", xp: 2800, gold: 1400, desc: "Its fins resemble the delicate wings of a moth. It is inevitably drawn to the lantern on your boat, fluttering near the surface. Handle its fins with care." },
        { name: "Gravity Bass", xp: 2900, gold: 1450, desc: "This bass is unusually heavy for its size, bending rods to their breaking point. It alters the water pressure around it to hunt. It feels like reeling in a lead weight." },
        { name: "Night Owl Ray", xp: 3000, gold: 1500, desc: "A stingray with markings on its back that look like wide, staring eyes. It glides silently through the dark, watching everything. It hunts primarily by sound." }
      ],
      Fine: [
        { name: "Constellation Carp", xp: 5500, gold: 2750, desc: "The glowing dots on its side connect to form recognized star charts. Ancient navigators used dried specimens to map the sky. Each fish has a unique pattern." },
        { name: "Silver Beam Pike", xp: 5750, gold: 2875, desc: "This pike looks like a solidified beam of moonlight given form. It is sharp, ethereal, and strikes with blinding speed. It vanishes if kept out of water too long." },
        { name: "Void Space Goby", xp: 6000, gold: 3000, desc: "A small fish that stares into the void without blinking. Its eyes are pitch black and reflect no light. Looking at it for too long causes dizziness." },
        { name: "Nebula Salmon", xp: 6250, gold: 3125, desc: "Its flesh is a swirling mix of pinks, purples, and blues. It migrates through the lake's magical currents to spawn. It tastes like ozone and berries." },
        { name: "Dark Side Flounder", xp: 6500, gold: 3250, desc: "It always keeps one side hidden from the light, lying flat on the dark lake floor. Its dark side is said to contain a portal to shadow. It is extremely hard to spot." }
      ],
      Rare: [
        { name: "Selene’s Mirror Pomfret", xp: 13000, gold: 6500, desc: "A fish so reflective you can see your own soul in its scales. It was once used by oracles to predict the future. It blinds predators with reflected starlight." },
        { name: "Wolf Spirit Dogfish", xp: 13500, gold: 6750, desc: "A small shark that emits a sound like a howl underwater. It hunts in packs during the full moon. Its bite leaves a mark that glows silver." },
        { name: "Fallen Star Puffer", xp: 14000, gold: 7000, desc: "This fish radiates intense heat and light. It is essentially a meteorite that grew fins and fell into the lake. Keep it in a metal bucket." },
        { name: "Twilight Hunter Catfish", xp: 14500, gold: 7250, desc: "Active only during the split second between day and night. It uses its long whiskers to sense changes in the light. A master of the grey hours." },
        { name: "Orbital Koi", xp: 15000, gold: 7500, desc: "Smaller fish actually orbit around it due to its gravitational pull. It moves majestically through the water, surrounded by its entourage. A centerpiece for any aquarium." }
      ],
      Epic: [
        { name: "Crescent Scythe Shark", xp: 30000, gold: 15000, desc: "A shark with a dorsal fin shaped like a curved silver blade. It cuts through the water surface like a knife. Legends say it guards the moon's reflection." },
        { name: "Man-in-the-Moon Blobfish", xp: 31000, gold: 15500, desc: "An ugly fish with a face that looks like a cratered old man. It grumbles when pulled from the water. Despite its looks, it is incredibly rare." },
        { name: "Zodiac Keeper Arapaima", xp: 32500, gold: 16250, desc: "A massive fish that changes its form depending on the current month. It embodies the traits of the zodiac constellations. Catching it is a yearly event." },
        { name: "Eventide Leviathan Eel", xp: 34000, gold: 17000, desc: "A beast made of the transition from light to dark. It is half shadow, half starlight. It circles the perimeter of the lake endlessly." },
        { name: "Nocturne’s Melody Whale", xp: 35000, gold: 17500, desc: "It emits a hauntingly beautiful song that puts sailors to sleep. The song can be heard for miles underwater. It is the dream-weaver of the lake." }
      ],
      Legendary: [
        { name: "Artemis’s Silver Stag-Fish", xp: 80000, gold: 40000, desc: "A sea-stag with antlers of pure silver that runs on the water's surface. It is the favored pet of the moon goddess. It moves faster than the eye can track." },
        { name: "Eclipse Eater Grouper", xp: 85000, gold: 42500, desc: "A fish that seeks to swallow the reflection of the moon. It has a mouth wide enough to consume a small boat. Its stomach is a void." },
        { name: "Starlight Weaver Ray", xp: 90000, gold: 45000, desc: "It weaves beams of light into physical nets to catch prey. Its wingspan rivals the largest sails. A creature of pure elegance and light." }
      ],
      Mythic: [
        { name: "Pale Night's Avatar (Manta)", xp: 200000, gold: 100000, desc: "The physical embodiment of the night sky in the form of a giant Manta Ray. Its back contains the map of the entire universe. To look at it is to see eternity." },
        { name: "The Lunar Whale", xp: 220000, gold: 110000, desc: "A whale that floats through the air above the lake, bathing in moonlight. It rarely touches the water, making it nearly impossible to hook. It carries dreams on its back." }
      ],
      Exotic: [
        { name: "Placeholder Exotic Lunar Entity", xp: 350000, gold: 175000, desc: "A placeholder bathed in celestial light. Rarer than a new moon eclipse." }
      ],
      Arcane: [
        { name: "Placeholder Arcane Cosmic Whale", xp: 400000, gold: 200000, desc: "The night's deepest mystery. A placeholder that swims between stars." }
      ]
    }
  },
    12: {
    name: "Sporelight Marsh",
    unlockLevel: 650,
    unlockGold: 22500000,
    boatRequired: "Mycelium Raft",
    boatPrice: 22500000,
    description: "A humid, alien swamp dominated by giant mushrooms the size of towers. The air is filled with glowing spores in purple, green, and blue. The water is thick with sludge and fungal growth.",
    fish: {
      Common: [
        { name: "Puffball Puffer", xp: 1700, gold: 850, desc: "Instead of spikes, this fish inflates into a soft, spore-filled ball. If popped, it releases a cloud of yellow dust. Predators avoid it due to the choking hazard." },
        { name: "Mold Scale Carp", xp: 1750, gold: 875, desc: "Covered in a fuzzy blue mold instead of traditional scales. It smells faintly of damp basements and old cheese. It thrives in the darkest corners of the swamp." },
        { name: "Cap Head Minnow", xp: 1800, gold: 900, desc: "It has a small mushroom cap growing on its head for camouflage. It remains perfectly still to mimic a fungus. Local chefs use them for soup stock." },
        { name: "Slime Trail Eel", xp: 1850, gold: 925, desc: "Leaves a trail of neon green slime that glows for minutes after it passes. The slime is sticky and hard to wash off. It helps the eel slide through mud." },
        { name: "Spore Eater Bass", xp: 1900, gold: 950, desc: "Swims with its mouth open to catch falling spores from the giant mushrooms above. Its stomach is specially adapted to digest toxic fungi. A hardy survivor." }
      ],
      Uncommon: [
        { name: "Gill Rot Bass", xp: 3500, gold: 1750, desc: "Its gills look ragged and decayed, but the fish is perfectly healthy. This appearance deters predators who think the fish is already dead. A master of deception." },
        { name: "Toadstool Turtle", xp: 3600, gold: 1800, desc: "A red and white spotted mushroom grows directly on its shell. It spends most of its time sleeping in patch of fungi. It bites if disturbed." },
        { name: "Fungal Fin Betta", xp: 3700, gold: 1850, desc: "Its fins are thin sheets of delicate fungus. They tear easily, but regenerate overnight. It displays vibrant purple colors to attract mates." },
        { name: "Decay Feeder Catfish", xp: 3800, gold: 1900, desc: "It eats dead wood and converts it into clean soil. It acts as the janitor of the marsh ecosystem. Its whiskers are sensitive to rot." },
        { name: "Mutant Neon Tetra", xp: 4000, gold: 2000, desc: "A common tetra that has mutated to be the size of a house cat. It glows brightly enough to read by. Swarms of them can illuminate the entire swamp." }
      ],
      Fine: [
        { name: "Vision Bass", xp: 7500, gold: 3750, desc: "Consuming this fish causes vivid, colorful hallucinations for several hours. Shamans use its scales in rituals. It has swirling psychedelic patterns on its skin." },
        { name: "Cordyceps Host Gar", xp: 7750, gold: 3875, desc: "A fish being controlled by a parasitic fungus. It moves jerkily and without fear. The fungus eventually consumes the host entirely." },
        { name: "Mycelium Network Eel", xp: 8000, gold: 4000, desc: "It connects with the roots of the swamp, sensing movement miles away. It knows you are fishing before you even cast. A part of the marsh's hive mind." },
        { name: "Truffle Snout Sturgeon", xp: 8250, gold: 4125, desc: "Used by gourmet chefs to find rare underwater truffles. Its snout is highly sensitive to the scent of fungi. A valuable companion for gatherers." },
        { name: "Ink Cap Squid", xp: 8500, gold: 4250, desc: "A freshwater squid that dissolves into black ink when removed from water. You must keep it in a special tank to preserve it. The ink is prized for spells." }
      ],
      Rare: [
        { name: "Decomposer Catfish", xp: 17000, gold: 8500, desc: "It accelerates the aging of anything it touches. Wooden boats rot quickly in its presence. It represents the inevitable cycle of decay." },
        { name: "Violet Shelf Ray", xp: 18000, gold: 9000, desc: "A flat ray that disguises itself as shelf fungus on submerged logs. It waits for prey to walk over it. Its sting causes rapid fungal growth." },
        { name: "Spore Cloud Squid", xp: 19000, gold: 9500, desc: "Instead of ink, it shoots a cloud of choking yellow dust. This cloud paralyzes nearby fish. Wear a mask when reeling it in." },
        { name: "Witch’s Cauldron Bubblefish", xp: 19500, gold: 9750, desc: "A round fish that bubbles and boils internally like a potion. It is warm to the touch. Alchemists pay a high price for its internal fluids." },
        { name: "Fairy Ring Discus", xp: 20000, gold: 10000, desc: "Always found swimming in perfect circles with others of its kind. Stepping inside their circle is said to transport you to the fae realm. Mysterious and beautiful." }
      ],
      Epic: [
        { name: "Swamp Thing Heart (Lungfish)", xp: 40000, gold: 20000, desc: "A pulsating mass of vegetation and muscle in the shape of a lungfish. It beats with the rhythm of the swamp. It is difficult to tell if it is plant or animal." },
        { name: "Ancient Bracket Carp", xp: 42000, gold: 21000, desc: "Its armor is made of wood-hard fungus that is centuries old. Arrows and spears bounce off its back. It moves with slow, ancient purpose." },
        { name: "Toxic Bloom Lionfish", xp: 43000, gold: 21500, desc: "Beautiful but deadly. Touching its spines causes skin to turn into moss. It flares its fins to warn off predators." },
        { name: "Spore Lord Arapaima", xp: 44000, gold: 22000, desc: "A massive predator that commands the hive mind of the marsh. Other fish sacrifice themselves to feed it. It is the king of the fungal depths." },
        { name: "Rot Tooth Pike", xp: 45000, gold: 22500, desc: "Its bite causes equipment to rust and rot instantly. Hooks disintegrate in its mouth. You must land it quickly before your gear fails." }
      ],
      Legendary: [
        { name: "Eternal Mushroom Jelly", xp: 100000, gold: 50000, desc: "A jellyfish that cannot die; it simply decomposes and regrows. It glows with the light of eternal life. It holds the secrets of regeneration." },
        { name: "Sentient Colony Siphonophore", xp: 105000, gold: 52500, desc: "Millions of microorganisms forming the shape of a giant fish. It speaks with a thousand tiny voices. It is a drifting city of life." },
        { name: "Guardian of Decay Gar", xp: 110000, gold: 55000, desc: "It ensures the cycle of life and death continues uninterrupted. It eats the dead to make room for the living. A necessary force of nature." }
      ],
      Mythic: [
        { name: "Parasite God Lamprey", xp: 250000, gold: 125000, desc: "A horrifying entity that tries to infect the world. It is the source of all corruption in the marsh. To catch it is to save the ecosystem." },
        { name: "The World Spore Whale", xp: 280000, gold: 140000, desc: "A massive seed floating in the water, waiting to restart evolution. It carries the genetic code of a new world. It hums with potential energy." }
      ],
      Exotic: [
        { name: "Placeholder Exotic Fungal Colossus", xp: 450000, gold: 225000, desc: "A placeholder born from spores and decay. Rarer than untainted water." }
      ],
      Arcane: [
        { name: "Placeholder Arcane Mycelium Network", xp: 500000, gold: 250000, desc: "The marsh's ultimate corruption. A placeholder that connects all darkness." }
      ]
    }
  },
    13: {
    name: "Sunken City of Aethelgard",
    unlockLevel: 800,
    unlockGold: 30000000,
    boatRequired: "Brass-Plated Steamer",
    boatPrice: 30000000,
    description: "The ruins of a once-great golden civilization, now submerged beneath the ocean. Marble columns, golden statues, and intricate clockwork machinery litter the sea floor.",
    fish: {
      Common: [
        { name: "Coin Scale Tetra", xp: 2100, gold: 1050, desc: "Its scales are perfectly round and gold. They are often used as counterfeit currency by rogues. Schools of them look like spilling treasure chests." },
        { name: "Marble Goby", xp: 2150, gold: 1075, desc: "Looks exactly like a chipped piece of white marble. It hides against statues to avoid predators. Only its eyes give it away." },
        { name: "Gutter Runner Ratfish", xp: 2200, gold: 1100, desc: "Adapted to swim through the ancient sewer pipes of the city. It has a long, slender tail and large eyes. It scavenges for scraps in the ruins." },
        { name: "Mosaic Tetra", xp: 2250, gold: 1125, desc: "Colorful and angular, resembling a piece of floor art. When they school together, they form beautiful patterns. They prefer the tiled halls of sunken palaces." },
        { name: "Rust Eater Catfish", xp: 2300, gold: 1150, desc: "Feeds on the decaying iron gates of the city. Its stomach acid is incredibly corrosive. It keeps the ruins from collapsing completely." }
      ],
      Uncommon: [
        { name: "Relic Hermit Crab", xp: 4200, gold: 2100, desc: "This crab uses ancient golden goblets or helmets as a shell. It is a moving piece of history. Collectors pay well for the artifact on its back." },
        { name: "Piston Jaw Pike", xp: 4350, gold: 2175, desc: "Its jaw snaps shut with the force of a hydraulic press. It resembles the machinery found in the city. It hunts with mechanical precision." },
        { name: "Scroll Fin Betta", xp: 4500, gold: 2250, desc: "Its fins look like decaying parchment filled with lost knowledge. The writing on its fins changes daily. Scholars study them to learn history." },
        { name: "Vault Keeper Grouper", xp: 4650, gold: 2325, desc: "Extremely territorial. It guards holes in the wall like bank vaults. It will attack anything that tries to enter its home." },
        { name: "Gear Grinder Drum", xp: 4800, gold: 2400, desc: "Eats loose cogs and gears from the sea floor. You can hear it rattling from the boat. It helps recycle the city's debris." }
      ],
      Fine: [
        { name: "Emerald Eye Idol Fish", xp: 9000, gold: 4500, desc: "A fish that looks like a small religious statue with green gem eyes. It sits perfectly still on pedestals. Looters often mistake it for treasure." },
        { name: "Gilded Carp", xp: 9250, gold: 4625, desc: "Not just gold-colored; its scales are actually plated with soft gold. It is heavy and swims slowly. A symbol of the city's excessive wealth." },
        { name: "Chandelier Jellyfish", xp: 9500, gold: 4750, desc: "Hangs motionless in the water, glowing with crystal elegance. It looks like a fixture from a grand ballroom. Touching it causes a shocking sting." },
        { name: "Fresco Flounder", xp: 9750, gold: 4875, desc: "Its back displays a faded painting of an ancient war. It camouflages against painted walls. A living piece of art." },
        { name: "Treasury Eel", xp: 10000, gold: 5000, desc: "It swallows gemstones and regurgitates them when threatened. Tracking one often leads to hidden loot. It glows with the color of the gems it eats." }
      ],
      Rare: [
        { name: "Clockwork Shark", xp: 22000, gold: 11000, desc: "Was it built? Was it born? It ticks as it swims and never seems to tire. Its teeth are made of spinning gears." },
        { name: "King’s Crown Discus", xp: 23000, gold: 11500, desc: "A fish shaped distinctly like a royal diadem. It demands respect from other fish. It swims with a regal air." },
        { name: "Library Guardian Octopus", xp: 24000, gold: 12000, desc: "It absorbs the ink from ancient books, gaining their wisdom. It protects the sunken library from looters. Highly intelligent and dangerous." },
        { name: "Alchemist Mistake Chimera", xp: 24500, gold: 12250, desc: "A twisted, unnatural creature created by ancient science. It has parts of several different fish. A sad reminder of hubris." },
        { name: "Philosopher Stonefish", xp: 25000, gold: 12500, desc: "A red stonefish. Legend says it can transmute lead into gold. Alchemists hunt it relentlessly. It is extremely poisonous." }
      ],
      Epic: [
        { name: "Colossus Fragment Crab", xp: 50000, gold: 25000, desc: "A giant crab using the bronze head of a statue as a shell. It moves slowly but is nearly invincible. It guards the city gates." },
        { name: "Automaton Whale", xp: 52000, gold: 26000, desc: "A brass whale powered by steam and magic. It surfaces to vent steam from its blowhole. A marvel of ancient engineering." },
        { name: "Siren of Aethelgard (Mermaid)", xp: 53000, gold: 26500, desc: "Its song mimics the ringing of church bells underwater. It lures sailors to join the city in the deep. Beautiful and deadly." },
        { name: "High Priest Betta", xp: 54000, gold: 27000, desc: "Clad in ceremonial robes that flow like fins. It leads schools of fish in strange rituals. It radiates a holy aura." },
        { name: "Doomsday Device Mine", xp: 55000, gold: 27500, desc: "A fish that looks suspiciously like a ticking bomb. It was a weapon of war that gained sentience. Handle with extreme caution." }
      ],
      Legendary: [
        { name: "Midas Golden Dorado", xp: 130000, gold: 65000, desc: "The cursed king himself, transformed into a golden fish for eternity. Everything it touches turns to gold. It is the loneliest fish in the sea." },
        { name: "Sunken Cathedral Ray", xp: 135000, gold: 67500, desc: "A massive ray with markings resembling stained glass windows. Light shines through it in beautiful patterns. It is a swimming sanctuary." },
        { name: "Vault Guardian Golem", xp: 145000, gold: 72500, desc: "An unbreakable construct that guards the city's greatest treasure. It has stood watch for a thousand years. It fights with mechanical perfection." }
      ],
      Mythic: [
        { name: "Atlantis Reborn Spirit", xp: 320000, gold: 160000, desc: "The spirit of the city, wishing to rise again. It is formed of memories and gold dust. To catch it is to hold a civilization." },
        { name: "Time Keeper Turtle", xp: 350000, gold: 175000, desc: "A cosmic entity entwined with the city's central clock tower. It controls the flow of history in the ruins. It moves at its own pace." }
      ]
    }
  },
    14: {
    name: "Glass-Shard Beach",
    unlockLevel: 1000,
    unlockGold: 40000000,
    boatRequired: "Refractor Yacht",
    boatPrice: 40000000,
    description: "A coastline where the sand has been fused into jagged, beautiful glass by ancient lightning storms. The water is crystal clear but filled with sharp, invisible hazards.",
    fish: {
      Common: [
        { name: "Shard Minnow", xp: 2500, gold: 1250, desc: "Looks like a broken piece of a bottle. Sharp edges can cut the line if not careful. They swarm in glittering clouds." },
        { name: "Clear Water Goby", xp: 2550, gold: 1275, desc: "Completely invisible except for its eyes and internal organs. You often catch them by accident. They hide on the glass seabed." },
        { name: "Prism Guppy", xp: 2600, gold: 1300, desc: "Splits sunlight into a rainbow when it jumps. A favorite of children and collectors. It brings color to the clear water." },
        { name: "Sand Glass Flounder", xp: 2650, gold: 1325, desc: "Its skin mimics the texture of rough glass. It blends perfectly with the beach floor. Hard to spot until it moves." },
        { name: "Needle Fin Gar", xp: 2700, gold: 1350, desc: "A long, thin fish. Essentially a swimming needle. It hunts by impaling small prey. Avoid handling with bare hands." }
      ],
      Uncommon: [
        { name: "Mirror Scale Carp", xp: 5000, gold: 2500, desc: "Predators attack their own reflection instead of the fish. It uses vanity as a defense mechanism. A clever survivor." },
        { name: "Razor Clam", xp: 5100, gold: 2550, desc: "It can slice through fishing nets with ease. Its shell is sharper than a surgeon's scalpel. Prized for its meat, if you can open it." },
        { name: "Window Pane Skate", xp: 5200, gold: 2600, desc: "You can look right through it to see the ocean floor. It glides like a pane of floating glass. A ghostly sight." },
        { name: "Mosaic Crab", xp: 5300, gold: 2650, desc: "Its shell looks like a stained-glass masterpiece. It builds its home from colored shards. Each crab has a unique pattern." },
        { name: "Glint Eye Walleye", xp: 5400, gold: 2700, desc: "Its eyes reflect light like a cat's, but much brighter. It hunts in the deep, clear trenches. The eyes are valuable gems." }
      ],
      Fine: [
        { name: "Obsidian Scalpel Tang", xp: 10500, gold: 5250, desc: "Black glass. Incredibly sharp and precise. It cuts coral with ease to find food. A dangerous beauty." },
        { name: "Fiber Optic Eel", xp: 10750, gold: 5375, desc: "Transmits light from its head to its tail. It glows with a pulsing data stream. It looks like living technology." },
        { name: "Magnifying Bass", xp: 11000, gold: 5500, desc: "Its body acts as a lens, magnifying things behind it. It distorts the water around it. Confuses predators with optics." },
        { name: "Fragile Beauty Betta", xp: 11250, gold: 5625, desc: "A fish so delicate it shatters if handled roughly. You must use a silk net. It is worth a fortune if intact." },
        { name: "Crystal Spine Stickleback", xp: 11500, gold: 5750, desc: "Shoots small crystal darts when threatened. It is a living porcupine of glass. Keep your distance." }
      ],
      Rare: [
        { name: "Invisible Stalker Pike", xp: 25000, gold: 12500, desc: "You can't see it, you can only feel the tug on the line. It is the ultimate stealth predator. Catching it is a test of feel." },
        { name: "Rainbow Bridge Trout", xp: 26000, gold: 13000, desc: "A long fish that shimmers with all colors of the spectrum. Legend says it connects worlds. A sign of hope." },
        { name: "Diamond Hard Carp", xp: 27000, gold: 13500, desc: "Looks like glass, is hard as diamond. It breaks teeth and hooks. Only the strongest rods can handle it." },
        { name: "Kaleidoscope Discus", xp: 27500, gold: 13750, desc: "Its pattern changes geometrically as it swims. It is mesmerizing to watch. Staring too long causes dizziness." },
        { name: "Shattered King Salmon", xp: 28000, gold: 14000, desc: "Looks like a fish glued together from broken pieces. It moves in a disjointed, jerky fashion. A tragic figure." }
      ],
      Epic: [
        { name: "Glass Blower Puffer", xp: 60000, gold: 30000, desc: "A fish made of hot, semi-solid glass. It glows red with internal heat. Do not touch without protection." },
        { name: "Refractor Ray", xp: 62000, gold: 31000, desc: "Bends light so much it makes the water look warped. It hides in plain sight by distorting reality. A master of illusion." },
        { name: "Crystal Golem Fish", xp: 63000, gold: 31500, desc: "A lumbering construct of sharp shards. It walks on the bottom, crushing sand into glass. Unstoppable and heavy." },
        { name: "Mirror Dimension Ray", xp: 64000, gold: 32000, desc: "It seems to exist in two places at once. You must guess which one is real. A puzzle to catch." },
        { name: "Silhouette Shark", xp: 65000, gold: 32500, desc: "A shark made of pure shadow, visible only through the glass. It hunts in the reflection of the surface. A phantom killer." }
      ],
      Legendary: [
        { name: "Prism Soul Tuna", xp: 150000, gold: 75000, desc: "Pure white light given form. It shines brighter than the sun. To catch it is to catch a star." },
        { name: "Unbreakable Glass Koi", xp: 155000, gold: 77500, desc: "A glass fish that cannot be scratched or broken by any force. It represents resilience. It rings like a bell when tapped." },
        { name: "Sky Reflection Marlin", xp: 165000, gold: 82500, desc: "When you look at it, you see the sky, not the fish. It wears the heavens as camouflage. majestic and vast." }
      ],
      Mythic: [
        { name: "Lucid The Clear Whale", xp: 380000, gold: 190000, desc: "A massive entity of pure transparency. It is the ocean itself given form. You can see the entire ecosystem inside it." },
        { name: "Grand Mirror Sunfish", xp: 400000, gold: 200000, desc: "A fish that reflects the true nature of anyone who catches it. It shows you who you really are. A terrifying prospect for some." }
      ]
    }
  },
    15: {
    name: "Void-Touched Coast",
    unlockLevel: 1300,
    unlockGold: 50000000,
    boatRequired: "Null-Gravity Pod",
    boatPrice: 50000000,
    description: "The edge of the world where the ocean begins to fall into nothingness. The water is heavy, dark, and purple. Gravity is weird here—water sometimes floats upwards in droplets.",
    fish: {
      Common: [
        { name: "Null Minnow", xp: 3000, gold: 1500, desc: "It has no face, just a smooth, blank surface. It swims aimlessly. It feels like nothing when you hold it." },
        { name: "Static Fin Guppy", xp: 3050, gold: 1525, desc: "Feels like touching an old TV screen. It crackles with void energy. Its existence is unstable." },
        { name: "Void Drip Blobfish", xp: 3100, gold: 1550, desc: "A blob of black goo that swims. It drips upwards towards the sky. Don't let it stain your clothes." },
        { name: "Echo Guppy", xp: 3150, gold: 1575, desc: "Its splash makes no sound. It absorbs all noise around it. A silent swimmer." },
        { name: "Pale Drifter Cod", xp: 3200, gold: 1600, desc: "Bleached white by the radiation of the void. It looks sickly but is surprisingly strong. It drifts with the anti-gravity currents." }
      ],
      Uncommon: [
        { name: "Gravity Eel", xp: 6000, gold: 3000, desc: "Swims upside down because it ignores gravity. It disorients fishermen by pulling in wrong directions. Hard to land." },
        { name: "Warped Bass", xp: 6150, gold: 3075, desc: "Its proportions are all wrong. One eye is huge, the other tiny. It looks like a drawing gone wrong." },
        { name: "Phase Crab", xp: 6300, gold: 3150, desc: "It phases in and out of reality. It can walk through the walls of your bucket. Hard to keep contained." },
        { name: "Hollow Bone Snapper", xp: 6450, gold: 3225, desc: "You can see right through its ribcage. It is empty inside, yet it lives. A creature of paradox." },
        { name: "Whispering Ray", xp: 6600, gold: 3300, desc: "You hear voices when you hold it. It whispers secrets of the void. Do not listen too closely." }
      ],
      Fine: [
        { name: "Event Horizon Crab", xp: 13000, gold: 6500, desc: "Nothing escapes its claws. Once it grabs the bait, it never lets go. A stubborn opponent." },
        { name: "Purple Haze Tuna", xp: 13500, gold: 6750, desc: "Glows with a sickly purple light. It leaves a trail of mist behind it. Eating it is not recommended." },
        { name: "Anti Matter Trout", xp: 14000, gold: 7000, desc: "Don't let it touch normal matter directly. It tingles and sparks when handled. Keep it in a containment field." },
        { name: "Rift Jumper Salmon", xp: 14250, gold: 7125, desc: "Teleports short distances when frightened. It jumps through holes in reality. Very frustrating to net." },
        { name: "Abyssal Starfish", xp: 14500, gold: 7250, desc: "A starfish that sucks light from the surroundings. It creates a pocket of darkness. It clings to the void's edge." }
      ],
      Rare: [
        { name: "Black Hole Bass", xp: 30000, gold: 15000, desc: "Immensely heavy. It has its own gravitational pull. Reeling it in feels like pulling a planet." },
        { name: "Forgotten One Flounder", xp: 31000, gold: 15500, desc: "As soon as you put it away, you forget what it looked like. A fish that erases memories." },
        { name: "Void Walker Mudskipper", xp: 32000, gold: 16000, desc: "A fish with legs that walks on nothingness. It can cross the gap between worlds. It fears nothing." },
        { name: "Null Space Shark", xp: 33000, gold: 16500, desc: "Its mouth leads to another dimension. Anything it eats disappears from this reality. A living portal." },
        { name: "Entropy Eel", xp: 35000, gold: 17500, desc: "Everything around it decays rapidly. Fishing lines rot, hooks rust. You must be fast." }
      ],
      Epic: [
        { name: "Cosmic Horror Fry", xp: 75000, gold: 37500, desc: "Even as a baby, it is terrifying to behold. It has too many eyes. A glimpse of the madness to come." },
        { name: "Eldritch Tentacle", xp: 77500, gold: 38750, desc: "Just a severed tentacle that is still alive and swimming. It grips the rod with immense strength. Where is the rest of it?" },
        { name: "Observer Eye-Fish", xp: 80000, gold: 40000, desc: "A giant floating eye. It watches you fish. It judges your technique. Unnerving." },
        { name: "Reality Tear Ray", xp: 82500, gold: 41250, desc: "A flat fish that looks like a rip in the fabric of the world. It shows the static underneath reality." },
        { name: "Vacuum Feeder Whale", xp: 85000, gold: 42500, desc: "It sucks in water with the force of a jet engine. It consumes void matter. A gentle giant of the abyss." }
      ],
      Legendary: [
        { name: "Avatar of Nothing", xp: 180000, gold: 90000, desc: "A silhouette cut out of reality. It is a hole in the shape of a fish. It represents the void's hunger." },
        { name: "End of Days Oarfish", xp: 190000, gold: 95000, desc: "A fish that brings a sense of impending doom. Its arrival signals the collapse of the coast. A harbinger." },
        { name: "Singularity Serpent", xp: 200000, gold: 100000, desc: "A snake made of compressed gravity. It crushes the water around it. Dense and unstoppable." }
      ],
      Mythic: [
        { name: "Azathoth’s Dream Carp", xp: 450000, gold: 225000, desc: "If this fish wakes up, existence might end. Keep it quiet. It swims in the slumber of a god." },
        { name: "Void Mother Whale", xp: 500000, gold: 250000, desc: "She spawns the nightmares that swim in the deep. Her song is silence. The queen of the empty dark." }
      ]
    }
  },
    16: {
    name: "Quicksilver Canal",
    unlockLevel: 1500,
    unlockGold: 70000000,
    boatRequired: "Ferrous-Magnetic Hull",
    boatPrice: 70000000,
    description: "A heavy, metallic river flowing through a canyon of raw iron. The 'water' is actually liquid mercury (quicksilver)—dense, toxic, and mirroring the grey sky.",
    fish: {
      Common: [
        { name: "Mercury Minnow", xp: 4000, gold: 2000, desc: "A fluid fish that loses its shape when taken out of the river. It becomes a puddle of silver. Keep it in a glass jar." },
        { name: "Ball Bearing Guppy", xp: 4100, gold: 2050, desc: "Perfectly round and silver. It rolls rather than flops on the deck. It clicks when it moves." },
        { name: "Lead Belly Catfish", xp: 4200, gold: 2100, desc: "Incredibly heavy for its size. Don't drop it on your toe; it will break bone. A dense bottom feeder." },
        { name: "Thermometer Eel", xp: 4300, gold: 2150, desc: "A red stripe down its side expands and contracts with the temperature. Useful for checking the weather. Warm to the touch." },
        { name: "Liquid Silver Carp", xp: 4400, gold: 2200, desc: "Beautiful but deadly toxic. Handle with tongs. It flows like water in your hands. A dangerous prize." }
      ],
      Uncommon: [
        { name: "Magnetic Ray", xp: 8000, gold: 4000, desc: "It sticks to the hull of the boat. Hard to pry off. It interferes with compasses." },
        { name: "Rust Proof Bass", xp: 8200, gold: 4100, desc: "Its scales are made of a stainless chrome alloy. It never tarnishes, staying forever shiny. A symbol of endurance." },
        { name: "Needle Bearing Gar", xp: 8400, gold: 4200, desc: "Its mouth is filled with thousands of tiny, rolling metal balls. It grinds its food rather than biting. Makes a terrible noise." },
        { name: "Heavy Metal Crab", xp: 8600, gold: 4300, desc: "Its shell is solid iron. It walks on the riverbed, unable to swim. It clanks when it moves." },
        { name: "Amalgam Fish", xp: 8800, gold: 4400, desc: "Absorbs other metals it touches, creating a patchwork skin of gold, copper, and iron. Every catch looks different." }
      ],
      Fine: [
        { name: "Living Mirror Dory", xp: 18000, gold: 9000, desc: "A flat fish that reflects reality with 100% clarity. Looking at it is like looking in a high-quality mirror. It blinds predators with reflection." },
        { name: "Fluid Terminator Pike", xp: 18500, gold: 9250, desc: "It can reshape itself into a spike to attack. It mimics other fish to get close. A relentless machine-like hunter." },
        { name: "Quicksilver Serpent", xp: 19000, gold: 9500, desc: "Moves through the heavy liquid with frightening speed. It is a silver streak in the grey river. Slippery and elusive." },
        { name: "Dense Bone Tuna", xp: 19500, gold: 9750, desc: "Weighs as much as a cannonball. It uses its momentum to smash through obstacles. A juggernaut of the canal." },
        { name: "Chrome Dome Sheepshead", xp: 20000, gold: 10000, desc: "Its head is a polished dome of vanadium steel. It bashes open metal shells. Reflects the sky perfectly." }
      ],
      Rare: [
        { name: "Alchemist Arowana", xp: 45000, gold: 22500, desc: "A golden fish that swims in mercury. A symbol of perfection. It represents the successful transmutation of metal." },
        { name: "Ferro Fluid Beast", xp: 46000, gold: 23000, desc: "It spikes up aggressively when near a magnet. It changes shape constantly. A fascinating display of physics." },
        { name: "Titanium Tooth Pike", xp: 47000, gold: 23500, desc: "Can chew through the boat's anchor chain. Its teeth are unbreakable. Do not put your fingers near it." },
        { name: "Molten Core Grouper", xp: 48000, gold: 24000, desc: "Still hot from the forge of the earth. It glows red in the silver river. Keep it in a cooling tank." },
        { name: "Silver Surfer Ray", xp: 50000, gold: 25000, desc: "A flat ray that glides on top of the mercury surface. It surfs the heavy waves. Effortless and cool." }
      ],
      Epic: [
        { name: "Liquid Metal Organism", xp: 110000, gold: 55000, desc: "Liquid metal that mimics the shape of a fish. It seems intelligent. It watches you with liquid eyes." },
        { name: "Iron Heart Tuna", xp: 115000, gold: 57500, desc: "A pulsing mechanical organ found swimming in the depths. It drives the flow of the river. The engine of the canal." },
        { name: "Lodestone Leviathan", xp: 120000, gold: 60000, desc: "It pulls all nearby ships towards it with magnetic force. It crushes them against its metallic hide. A walking magnet." },
        { name: "Argentum King Salmon", xp: 122000, gold: 61000, desc: "The ruler of the silver river. Crowned in platinum scales. It shines with a blinding white light." },
        { name: "Toxic Avenger Mutator", xp: 125000, gold: 62500, desc: "A mutated beast born from the ultimate pollution. It grows extra limbs and eyes. A sad, angry creature." }
      ],
      Legendary: [
        { name: "Philosopher Legacy Koi", xp: 280000, gold: 140000, desc: "A fish inscribed with the formula for eternal life. Alchemists would kill for it. It holds the ultimate secret." },
        { name: "Mercurial God Eel", xp: 290000, gold: 145000, desc: "It is everywhere and nowhere. It flows like time. It changes its mind and its shape constantly." },
        { name: "Grand Alloy Sturgeon", xp: 300000, gold: 150000, desc: "A creature made of a metal not found on the periodic table. It is indestructible and heavier than a star." }
      ],
      Mythic: [
        { name: "Omega Isotope Ray", xp: 650000, gold: 325000, desc: "Radioactive and unstable. Catching it causes geiger counters to explode. It glows with a dangerous blue light." },
        { name: "Silver Sea Serpent", xp: 700000, gold: 350000, desc: "A snake made of pure liquid starlight and mercury. It spans the length of the canal. A god of metal." }
      ]
    }
  },
    17: {
    name: "Celestial Cloud-Sea",
    unlockLevel: 1750,
    unlockGold: 100000000,
    boatRequired: "Sky-Sail Clipper",
    boatPrice: 100000000,
    description: "You aren't fishing in water anymore. You are sailing a boat off the edge of a floating island, casting your line into a dense ocean of clouds. The fish here have wings and feathers.",
    fish: {
      Common: [
        { name: "Nimbus Guppy", xp: 5000, gold: 2500, desc: "A puffy white fish that dissolves if you squeeze it. It tastes like water vapor. They float in large schools." },
        { name: "Rain Maker Minnow", xp: 5100, gold: 2550, desc: "A small grey fish that constantly drips water. A school of them passing overhead causes a drizzle." },
        { name: "Feather Fin Betta", xp: 5200, gold: 2600, desc: "Half-bird, half-fish. It prefers high altitudes and thin air. It chirps instead of bubbling." },
        { name: "Sky Blue Tetra", xp: 5300, gold: 2650, desc: "Camouflaged perfectly against the open sky. You can only see it when it moves against a cloud." },
        { name: "Draft Drifter Flounder", xp: 5400, gold: 2700, desc: "It floats on thermal updrafts without moving a muscle. It is the laziest fish in the sky. Flat and wide like a kite." }
      ],
      Uncommon: [
        { name: "Lightning Bug Fish", xp: 10000, gold: 5000, desc: "Charges with static electricity as it flies through clouds. It glows yellow in storms. A shocking catch." },
        { name: "Tornado Tail Tuna", xp: 10250, gold: 5125, desc: "Its tail spins rapidly, creating a mini-cyclone for propulsion. It bores through cloud banks like a drill." },
        { name: "Cloud Ray", xp: 10500, gold: 5250, desc: "A manta ray that glides through the air as if it were water. It is silent and graceful." },
        { name: "Hail Stone Crab", xp: 10750, gold: 5375, desc: "Falls from the upper atmosphere. Hard as ice and cold to the touch. It survives the fall every time." },
        { name: "Mist Walker Mudskipper", xp: 11000, gold: 5500, desc: "Uses vaporous legs to scuttle across dense cloud banks. It can walk on smoke." }
      ],
      Fine: [
        { name: "Stratosphere Salmon", xp: 22000, gold: 11000, desc: "Migrates vertically, swimming miles up into the thin air. It spawns at the edge of space." },
        { name: "Solar Winged Bass", xp: 23000, gold: 11500, desc: "Its fins act as solar panels, absorbing high-altitude radiation. It is warm and energetic." },
        { name: "Ozone Eater Carp", xp: 24000, gold: 12000, desc: "Smells crisp and sharp, like the air after a storm. It cleans the atmosphere of pollutants." },
        { name: "Thunderhead Shark", xp: 24500, gold: 12250, desc: "Dark grey and menacing. It hunts inside storm clouds, striking with the lightning. The terror of the skies." },
        { name: "Aerodynamic Barracuda", xp: 25000, gold: 12500, desc: "Sleek, pointed, and built for Mach-1 speeds. It breaks the sound barrier when it dives." }
      ],
      Rare: [
        { name: "Angel Fish (Literal)", xp: 55000, gold: 27500, desc: "A fish with a halo and white feathered wings. It judges you silently. Releasing it grants a blessing." },
        { name: "Vapor Specter Ghostfish", xp: 56000, gold: 28000, desc: "A ghost made of mist. It passes through the net unless charmed. Spooky and sad." },
        { name: "Skylark Carp", xp: 57000, gold: 28500, desc: "A legendary hybrid of a lark and a carp. It sings beautifully at sunrise. A joy to behold." },
        { name: "Gravity Defier Puffer", xp: 58000, gold: 29000, desc: "It naturally floats upwards. If you let go, it falls into space. Keep a lid on your bucket." },
        { name: "Cumulonimbus King Grouper", xp: 60000, gold: 30000, desc: "The ruler of the storm clouds. Massive and booming. Its mood dictates the weather." }
      ],
      Epic: [
        { name: "Hurricane Eye Carp", xp: 140000, gold: 70000, desc: "A peaceful, calm fish found only in the center of chaos. It brings stillness to the storm." },
        { name: "Zephyr Steed Seahorse", xp: 142000, gold: 71000, desc: "A horse-headed fish made of wind. It gallops across the sky. The fastest mount in the heavens." },
        { name: "Atmospheric Beast", xp: 145000, gold: 72500, desc: "A creature so large it looks like a cloud formation. Sailors often mistake it for a storm front." },
        { name: "Pegasus Fin Tuna", xp: 148000, gold: 74000, desc: "Majestic, winged, and untamable. It soars higher than any bird. A legend of the air." },
        { name: "Sky Whale Calf", xp: 150000, gold: 75000, desc: "A baby whale that floats. It's still the size of a bus. It plays in the clouds like a puppy." }
      ],
      Legendary: [
        { name: "Gryphon Flying Fish", xp: 350000, gold: 175000, desc: "The king of the sky-ocean. Gold feathers and lion claws. It guards the floating islands." },
        { name: "Storm Bringer Eel", xp: 360000, gold: 180000, desc: "Catching this fish summons a permanent thunderstorm. It is the catalyst of typhoons." },
        { name: "Aurora Borealis Ribbonfish", xp: 380000, gold: 190000, desc: "A living ribbon of light that dances in the upper atmosphere. It is made of pure solar wind." }
      ],
      Mythic: [
        { name: "Uranus Sky Father", xp: 800000, gold: 400000, desc: "A face in the clouds that has taken physical form. The god of the sky itself." },
        { name: "Great White Cloud Whale", xp: 900000, gold: 450000, desc: "Moby Dick of the skies. It swims through the jet stream. It swallows storms whole." }
      ]
    }
  },
    18: {
    name: "Chronos Rapids",
    unlockLevel: 2000,
    unlockGold: 130000000,
    boatRequired: "Paradox-Proof Canoe",
    boatPrice: 130000000,
    description: "A river that flows through time itself. Parts of the water move fast, others act in slow motion. You can see reflections of the past and future in the ripples.",
    fish: {
      Common: [
        { name: "Tick Tock Tetra", xp: 6500, gold: 3250, desc: "Its tail beats with the rhythm of a second hand. A school of them sounds like a watch shop." },
        { name: "Fossil Fry", xp: 6600, gold: 3300, desc: "A fish that is technically a stone fossil, but it swims anyway. It has been dead for millions of years." },
        { name: "Deja Vu Guppy", xp: 6700, gold: 3350, desc: "Haven't you caught this one before? It feels familiar. It loops through the same moment." },
        { name: "Slow Mo Minnow", xp: 6800, gold: 3400, desc: "Moves so slowly it looks like a glitch in the matrix. It is easy to catch if you have patience." },
        { name: "Future Echo Ghostfish", xp: 7000, gold: 3500, desc: "A blurry fish that hasn't quite arrived in this timeline yet. It is hard to grab because it isn't fully here." }
      ],
      Uncommon: [
        { name: "Hourglass Flounder", xp: 13000, gold: 6500, desc: "Shaped like an hourglass. Sand flows inside its transparent body. When the sand runs out, it flips over." },
        { name: "Retrograde Eel", xp: 13250, gold: 6625, desc: "It swims backward to go forward. Confusing to reel in. It lives in reverse time." },
        { name: "Prehistoric Pike", xp: 13500, gold: 6750, desc: "An extinct species that is alive and well in these rapids. It has teeth from the Jurassic era." },
        { name: "Cyber Scale Bass", xp: 13750, gold: 6875, desc: "A fish from the future with robotic enhancements. It has a laser sight on its head." },
        { name: "Time Skip Trout", xp: 14000, gold: 7000, desc: "It teleports a few seconds into the future to avoid the net. You have to predict where it will be." }
      ],
      Fine: [
        { name: "Pendulum Ray", xp: 28000, gold: 14000, desc: "Swings back and forth in the current with hypnotic regularity. It regulates the flow of the river." },
        { name: "Ancient Trilobite", xp: 28500, gold: 14250, desc: "A living relic from the dawn of time. It crawls on the riverbed. A favorite of paleontologists." },
        { name: "Neon Future Bass", xp: 29000, gold: 14500, desc: "Glows with LED lights and hums with synthesized music. It brings the party from 3000 AD." },
        { name: "Stasis Carp", xp: 29500, gold: 14750, desc: "Frozen in a block of time. It doesn't age or eat. It is a statue that breathes." },
        { name: "Wormhole Weaver Eel", xp: 30000, gold: 15000, desc: "Creates tiny portals to escape predators. It stitches space-time together." }
      ],
      Rare: [
        { name: "Anachronism Coelacanth", xp: 70000, gold: 35000, desc: "A fish that shouldn't exist in this dimension. It disrupts the local timeline." },
        { name: "Grandfather Clock Fish", xp: 71000, gold: 35500, desc: "Large, wooden, and chimes every hour. It keeps the time for the river inhabitants." },
        { name: "Primordial Soup Blobfish", xp: 72000, gold: 36000, desc: "A blob of raw evolutionary potential. It can become anything given enough time." },
        { name: "Terminator Barracuda", xp: 73000, gold: 36500, desc: "Sent back in time to cut your fishing line. It will not stop until the mission is complete." },
        { name: "Temporal Paradox Perch", xp: 75000, gold: 37500, desc: "If you catch it, you might erase your own existence. It is a risky catch for a brave angler." }
      ],
      Epic: [
        { name: "Ouroboros Eel", xp: 170000, gold: 85000, desc: "An eel eating its own tail, symbolizing infinity. It has no beginning and no end." },
        { name: "Jurassic Shark (Megalodon)", xp: 175000, gold: 87500, desc: "A megalodon that wandered into the time stream. It is the apex predator of history." },
        { name: "Time Lord Sturgeon", xp: 178000, gold: 89000, desc: "Moves through time with intelligence and purpose. It watches over the timeline." },
        { name: "Flux Capacitor Ray", xp: 180000, gold: 90000, desc: "It needs to hit 88mph to be caught. It leaves trails of fire in the water." },
        { name: "Entropic Decay Salmon", xp: 180000, gold: 90000, desc: "A fish that ages rapidly from birth to death in seconds. To catch it is to catch a moment." }
      ],
      Legendary: [
        { name: "Father Time Catfish", xp: 450000, gold: 225000, desc: "Has a long white beard and carries a scythe-like fin. He is old as the river itself." },
        { name: "Big Bang Guppy", xp: 475000, gold: 237500, desc: "A small fish containing the energy of the universe's creation. It sparkles with infinite potential." },
        { name: "End of Time Voidfish", xp: 500000, gold: 250000, desc: "White, silent, and final. It waits at the end of the river for everything to cease." }
      ],
      Mythic: [
        { name: "Chronos Incarnate", xp: 1000000, gold: 500000, desc: "The Titan of Time. He swims through the eons. He controls the flow of history." },
        { name: "Timeline Severer Shark", xp: 1100000, gold: 550000, desc: "A glitch in reality that threatens to delete the save file of the universe. A dangerous anomaly." }
      ]
    }
  },
    19: {
    name: "Arcane Wellspring",
    unlockLevel: 2250,
    unlockGold: 200000000,
    boatRequired: "Runestone Barge",
    boatPrice: 200000000, // TODO: Update price if needed
    description: "The source of all magic in the world. A fountain of pure, liquid mana that glows vibrant violet and blue. Gravity is low, and floating rune stones form the banks.",
    fish: {
      Common: [
        { name: "Mana Wisp Danio", xp: 8000, gold: 4000, desc: "A small ball of blue light that nibbles at the hook. It is a solidified drop of magic." },
        { name: "Rune Scale Carp", xp: 8100, gold: 4050, desc: "A fish with magical runes naturally etched into its side. Mages use their scales for divination." },
        { name: "Spell Eater Catfish", xp: 8200, gold: 4100, desc: "Absorbs ambient magic. It fizzles when removed from the well. It keeps the mana levels stable." },
        { name: "Scroll Fin Betta", xp: 8300, gold: 4150, desc: "Its fins look like rolled-up parchment. They contain the text of basic spells." },
        { name: "Crystal Clear Mana Fish", xp: 8500, gold: 4250, desc: "A fish made of solidified magic water. Hard to spot. It tastes like blueberry energy." }
      ],
      Uncommon: [
        { name: "Fire Ball Puffer", xp: 16000, gold: 8000, desc: "A living evocation spell. Hot to the touch. It explodes if handled roughly." },
        { name: "Ice Shard Goby", xp: 16250, gold: 8125, desc: "A jagged piece of cryomancy that learned to swim. It freezes the water around it." },
        { name: "Arcane Eel", xp: 16500, gold: 8250, desc: "Crackles with purple energy. Used to power wands. It bites with a shock." },
        { name: "Illusionist Trout", xp: 16750, gold: 8375, desc: "Creates three copies of itself. Only one is real. It confuses predators with mirror images." },
        { name: "Telekinetic Trout", xp: 17000, gold: 8500, desc: "It tries to push the hook away with its mind. It has a large brain for a fish." }
      ],
      Fine: [
        { name: "Alchemist Gold Carp", xp: 35000, gold: 17500, desc: "A fish transmuted entirely into gold. Heavy and valuable. A failed experiment that lived." },
        { name: "Hex Fish", xp: 36000, gold: 18000, desc: "Looking at it brings bad luck. Handle with care. It has markings of a curse." },
        { name: "Potion Belly Puffer", xp: 37000, gold: 18500, desc: "Its stomach is filled with a random magical potion. Shake it to see what happens." },
        { name: "Enchanted Armor Gar", xp: 37500, gold: 18750, desc: "An empty suit of fish-mail animated by magic. It fights with the skill of a knight." },
        { name: "Wizard Familiar Catfish", xp: 38000, gold: 19000, desc: "An intelligent fish that whispers secrets of the deep. It often bonds with spellcasters." }
      ],
      Rare: [
        { name: "Sorcerer Cichlid", xp: 85000, gold: 42500, desc: "A fish wearing a distinct, cone-shaped growth on its head. It casts minor hexes." },
        { name: "Living Grimoire Ray", xp: 87000, gold: 43500, desc: "A book that fell in the water and grew fins. It knows high-level spells. Don't let it read aloud." },
        { name: "Void Mana Hybrid", xp: 88000, gold: 44000, desc: "Magic corrupted by the darkness. Unstable and dangerous. It leaks entropy." },
        { name: "Phoenix Feather Fish", xp: 89000, gold: 44500, desc: "Burns with eternal life. It revives if put back in the water. A symbol of rebirth." },
        { name: "Eldritch Blast Bass", xp: 90000, gold: 45000, desc: "Pure chaotic energy. It screams when caught. It hits with force." }
      ],
      Epic: [
        { name: "Archmage Leviathan", xp: 200000, gold: 100000, desc: "A massive beast summoned by a wizard who lost control. It now rules the wellspring." },
        { name: "Elemental Chaos Pike", xp: 205000, gold: 102500, desc: "Fire, ice, and lightning fighting for dominance in one body. A storm of magic." },
        { name: "Soul Gem Fish", xp: 208000, gold: 104000, desc: "Traps the souls of smaller fish inside its crystal body. It glows with stolen light." },
        { name: "Mana Wyrm Queen", xp: 210000, gold: 105000, desc: "A serpent of pure white light. It feeds on ley lines. The mother of magic." },
        { name: "Silence Anti-Magic Eel", xp: 210000, gold: 105000, desc: "An anti-magic fish. All spells fail near it. It is a dead zone in the mana field." }
      ],
      Legendary: [
        { name: "Merlin Beard Catfish", xp: 550000, gold: 275000, desc: "A legendary catfish said to hold the wisdom of the greatest wizard. It speaks in riddles." },
        { name: "Philosopher Stonefish", xp: 580000, gold: 290000, desc: "The ultimate goal of alchemy, living and breathing. It grants wealth and life." },
        { name: "Avatar of Magic", xp: 600000, gold: 300000, desc: "The source. Pure, unadulterated power. It is magic itself given form." }
      ],
      Mythic: [
        { name: "Mystra Chosen Whale", xp: 1300000, gold: 650000, desc: "A god-touched entity. It weaves the fabric of reality with its song." },
        { name: "Unraveling Eel", xp: 1500000, gold: 750000, desc: "A tear in the magical weave. It drinks the ocean of mana. The anti-thesis of creation." }
      ]
    }
  },
    20: {
    name: "Crimson Abyss",
    unlockLevel: 2500,
    unlockGold: 400000000, 
    boatRequired: "Bone-Carved Galleon",
    boatPrice: 400000000, 
    description: "A terrifying ocean of red, viscous fluid. It smells of iron and copper. The sky is black, and the 'water' is blood. The",
    fish: {
      Common: [
        { name: "Hemoglobin Guppy", xp: 9000, gold: 4500, desc: "A red blood cell magnified a thousand times. It transports oxygen through the abyss." },
        { name: "Vein Eel", xp: 9200, gold: 4600, desc: "Looks like a severed artery swimming on its own. It pulses with a heartbeat." },
        { name: "Clot Crab", xp: 9400, gold: 4700, desc: "Formed from coagulated fluid. Hard and lumpy. It scuttles on the sea floor." },
        { name: "Leech Minnow", xp: 9600, gold: 4800, desc: "A tiny parasite searching for a host. It attaches to anything warm." },
        { name: "Pale Skin Flounder", xp: 10000, gold: 5000, desc: "Looks like a patch of skin stretched over bones. It mimics the texture of flesh." }
      ],
      Uncommon: [
        { name: "Vampire Tetra", xp: 20000, gold: 10000, desc: "Has two overly large fangs. It drains other fish dry. A fierce predator." },
        { name: "Bone Barracuda", xp: 20500, gold: 10250, desc: "Just a skeleton. No meat. It rattles when it swims. It is powered by hate." },
        { name: "Marrow Sucker Lamprey", xp: 21000, gold: 10500, desc: "A thin worm-like fish that burrows into bones. It eats the marrow inside." },
        { name: "Heart Beat Bass", xp: 21500, gold: 10750, desc: "You can see a beating heart through its translucent chest. It pumps the red water." },
        { name: "Scab Scale Carp", xp: 22000, gold: 11000, desc: "Covered in rough, dry patches. Disgusting to touch. It is constantly healing." }
      ],
      Fine: [
        { name: "Femur Pike", xp: 45000, gold: 22500, desc: "Its body is shaped like a large thigh bone. It hits hard and sinks fast." },
        { name: "Crimson Ray", xp: 46000, gold: 23000, desc: "A majestic ray that looks like a pool of spilled blood. It glides silently." },
        { name: "Needle Syringe Fish", xp: 47000, gold: 23500, desc: "Its nose is a hollow hypodermic needle. It injects anticoagulants." },
        { name: "Eyeball Octopus", xp: 48000, gold: 24000, desc: "Each tentacle ends in a human-like eye. It sees everything." },
        { name: "Rib Cage Turtle", xp: 50000, gold: 25000, desc: "Its shell is an exposed ribcage. The organs are visible inside." }
      ],
      Rare: [
        { name: "Donor Trout", xp: 110000, gold: 55000, desc: "A fish that constantly regenerates its flesh. An infinite food source for predators." },
        { name: "Plasma Shark", xp: 112000, gold: 56000, desc: "Made of clear, yellowish plasma. Hard to see in the red ocean. It carries antibodies." },
        { name: "Iron Deficiency Goby", xp: 115000, gold: 57500, desc: "A pale, weak fish that drains the strength of the angler. Catching it makes you tired." },
        { name: "The Butcher Piranha", xp: 118000, gold: 59000, desc: "Its fins are sharpened bone-blades. It chops its prey into pieces." },
        { name: "Sanguine Siren", xp: 120000, gold: 60000, desc: "Lures sailors with the promise of life, gives only death. A creature of pure bloodlust." }
      ],
      Epic: [
        { name: "Orlok Pet Batfish", xp: 250000, gold: 125000, desc: "A bat-winged fish that sleeps in a coffin-shaped shell. It dislikes the sun." },
        { name: "Red Death Plaguefish", xp: 260000, gold: 130000, desc: "A plague in fish form. Do not touch without protection. It spreads disease." },
        { name: "Blood Diamond Golem", xp: 270000, gold: 135000, desc: "Crystallized blood formed into a swimming statue. Beautiful and terrible." },
        { name: "Corpse Whale", xp: 275000, gold: 137500, desc: "A dead whale that refuses to sink or stop swimming. It carries a cargo of souls." },
        { name: "Vitality Drainer Eel", xp: 280000, gold: 140000, desc: "Holding this fish makes you feel ten years older. It eats your lifespan." }
      ],
      Legendary: [
        { name: "Vlad Swordfish", xp: 700000, gold: 350000, desc: "A swordfish with a cruel, serrated spike. It impales its victims for display." },
        { name: "Heart of Sea Whale", xp: 725000, gold: 362500, desc: "A massive, beating heart that pumps the tides of the crimson ocean. It keeps the abyss alive." },
        { name: "Lilith Spawn", xp: 750000, gold: 375000, desc: "The mother of all monsters. Beautiful and terrifying. She births new horrors daily." }
      ],
      Mythic: [
        { name: "Blood God Shark", xp: 2000000, gold: 1000000, desc: "A deity of war and slaughter in the form of a shark. It demands tribute." },
        { name: "Crimson Tide Tsunami", xp: 2200000, gold: 1100000, desc: "A living tsunami of gore that consumes everything. A wave that never breaks." }
      ]
    }
  },
    21: {
    name: "The Neon Reef",
    unlockLevel: 3000,
    unlockGold: 1000000000, 
    boatRequired: "Holo-Skiff",
    boatPrice: 1000000000, 
    description: "A submerged cyberpunk reef where bioluminescence has evolved into blinding neon lights. It looks like a futuristic underwater city naturally grown from coral. The water buzzes with electric energy and the hum of synthetic life.",
    fish: {
      Common: [
        { name: "Neon Tetra (Ascended)", xp: 8000, gold: 4000, desc: "This tetra has absorbed so much light it blinds predators. It leaves a permanent tracer trail in the water, looking like a moving laser beam. It hums with energy." },
        { name: "Laser Fin Betta", xp: 8200, gold: 4100, desc: "Its fins are made of hard light rather than flesh. They can cut through the darkness of the deep ocean. It flares its fins to signal others in Morse code." },
        { name: "Strobe Light Guppy", xp: 8400, gold: 4200, desc: "It flashes on and off rapidly to confuse predators. Looking at a school of them is disorienting. It serves as the reef's warning system." },
        { name: "Pixel Crab", xp: 8600, gold: 4300, desc: "Its shell pattern is so blocky it looks like low-resolution digital art. It moves in jerky, grid-like patterns across the sand. It builds nests out of discarded fiber optics." },
        { name: "Circuit Board Flounder", xp: 8800, gold: 4400, desc: "Natural markings on its back resemble a complex motherboard. It buries itself in the metallic sand to recharge. It transmits weak radio signals." }
      ],
      Uncommon: [
        { name: "Fiber Optic Eel", xp: 17000, gold: 8500, desc: "Its body transmits light from the surface down to its tail tip. It glows with a pulsing data stream. It looks like a living internet cable." },
        { name: "Disco Ball Puffer", xp: 17500, gold: 8750, desc: "Covered in mirror scales that reflect everything. When it puffs up, it scatters light in a thousand directions. It turns the reef into a dance floor." },
        { name: "Synthesizer Bass", xp: 18000, gold: 9000, desc: "It emits a low, electronic hum that sounds like a synth-wave track. Other fish swim to the rhythm of its heartbeat. It is the DJ of the reef." },
        { name: "Glitch Cod", xp: 18500, gold: 9250, desc: "It seems to teleport short distances, twitching like a bad video signal. It exists between two points in space. Hard to net because it might not be there." },
        { name: "Battery Acid Ray", xp: 19000, gold: 9500, desc: "It leaks a corrosive neon green fluid from its pores. It swims in the most toxic parts of the reef. Do not touch it with bare hands." }
      ],
      Fine: [
        { name: "Hologram Shark", xp: 38000, gold: 19000, desc: "Is it real? You can pass your hand through its body, but its teeth are solid matter. It is a projection with an appetite." },
        { name: "Plasma Globe Jellyfish", xp: 39000, gold: 19500, desc: "A floating sphere of electricity trapped in a gelatinous membrane. Touching it delivers a high-voltage shock. It lights up the dark depths." },
        { name: "Data Miner Goby", xp: 40000, gold: 20000, desc: "A mechanical-looking fish that sifts through the glowing sand for isotopes. It processes information as it eats. It looks like a small robot." },
        { name: "Vaporwave Whale", xp: 41000, gold: 20500, desc: "Pink and teal, this whale moves in slow motion regardless of the current. It brings a sense of nostalgia to those who see it. It sings in distorted tones." },
        { name: "Grid Keeper Gar", xp: 42000, gold: 21000, desc: "A fish with perfectly square scales that align to a grid. It maintains the structural integrity of the neon coral. It swims in perfect 90-degree turns." }
      ],
      Rare: [
        { name: "System Crash Pike", xp: 95000, gold: 47500, desc: "A chaotic mass of static and white noise. Catching it makes your vision fuzzy and your ears ring. It represents a fatal error in the reef." },
        { name: "Cyber Leviathan Spawn", xp: 97500, gold: 48750, desc: "A bio-mechanical beast made of flesh and chrome coral. It is the offspring of the reef's ruler. It grows stronger by eating metal." },
        { name: "Ultraviolet Hunter Catfish", xp: 100000, gold: 50000, desc: "Invisible to the naked eye, visible only under UV light. It hunts in the spaces between light beams. A silent assassin." },
        { name: "Binary Code Koi", xp: 102500, gold: 51250, desc: "Its spots form perfect zeros and ones along its side. Scholars are trying to decode the message it carries. It brings order to chaos." },
        { name: "Hard Drive Hermit Crab", xp: 105000, gold: 52500, desc: "A crab that uses ancient discarded technology as a shell. It stores the memories of the ocean in its home. Heavily armored and smart." }
      ],
      Epic: [
        { name: "Mainframe Sunfish", xp: 230000, gold: 115000, desc: "A massive, unmoving fish that acts as the server for the reef. It controls the light cycles of the biome. It radiates immense heat." },
        { name: "Virus Entity Eel", xp: 240000, gold: 120000, desc: "A red, jagged creature that corrupts the water around it. It tries to delete other fish from existence. It must be contained." },
        { name: "Techno Organic Squid", xp: 245000, gold: 122500, desc: "Its tentacles are data cables that plug into the reef to recharge. It is half-machine, half-mollusk. It hacks the minds of its prey." },
        { name: "Firewall Guardian Ray", xp: 250000, gold: 125000, desc: "A flat fish made of burning orange energy. It blocks passage to the deeper parts of the reef. Nothing gets past it without permission." },
        { name: "Overclocked Barracuda", xp: 250000, gold: 125000, desc: "It moves faster than the eye can track, burning its own energy reserves. It glows white-hot when hunting. It lives a short, fast life." }
      ],
      Legendary: [
        { name: "Source Code Salmon", xp: 600000, gold: 300000, desc: "A glowing white fish containing the DNA of every fish in the reef. It is the blueprint of life here. Catching it reveals the secrets of creation." },
        { name: "Deus Ex Machina Shark", xp: 625000, gold: 312500, desc: "A god from the machine, perfect, metallic, and cold. It arrives suddenly to solve problems or end lives. Its skin is impenetrable." },
        { name: "Infinite Loop Serpent", xp: 650000, gold: 325000, desc: "A serpent eating its tail, spinning forever in a ring of light. It processes eternity. It represents the cycle of the code." }
      ],
      Mythic: [
        { name: "The Simulation Whale", xp: 1500000, gold: 750000, desc: "A glitch in reality. To catch it is to realize the world isn't real. It swims through the walls of the universe." },
        { name: "Omega Protocol Shark", xp: 1700000, gold: 850000, desc: "The end program given form. It deletes everything it touches. It is the final cleaner of the system." }
      ]
    }
  },
    22: {
    name: "The Ink-Well of Knowledge",
    unlockLevel: 3300,
    unlockGold: 1250000000,
    boatRequired: "Parchment Punt",
    boatPrice: 1250000000,
    description: "An ocean of black ink, surrounded by cliffs made of stacked books. The air smells of old paper and dust. The",
    fish: {
      Common: [
        { name: "Comma Guppy", xp: 9500, gold: 4750, desc: "Shaped like a punctuation mark. It pauses frequently while swimming, disrupting the flow of the school. A grammatical curiosity." },
        { name: "Paper Cut Piranha", xp: 9700, gold: 4850, desc: "Thin as a sheet of paper, sharp as a razor. It swarms in the millions. Handling them without gloves leaves tiny, painful cuts." },
        { name: "Ink Blot Ray", xp: 9900, gold: 4950, desc: "It changes shape depending on what you think it looks like. It is a psychological test with fins. It hides on the dark ink floor." },
        { name: "Quill Spine Stickleback", xp: 10100, gold: 5050, desc: "Its dorsal fins are writing quills. It leaks ink constantly, marking its territory with loops and lines. Writers prize its spines." },
        { name: "Draft Copy Carp", xp: 10300, gold: 5150, desc: "Looks unfinished and sketchy, like a rough drawing of a fish. It swims erratically. It is a discarded idea given life." }
      ],
      Uncommon: [
        { name: "Run On Sentence Eel", xp: 20000, gold: 10000, desc: "An incredibly long eel that just keeps going and going without a pause. It wraps around the boat multiple times. It has no clear ending." },
        { name: "Typos Toadfish", xp: 20500, gold: 10250, desc: "An ugly, misshapen lump of a fish. It is a mistake in creation that survived. It grunts in misspelled sounds." },
        { name: "Redacted Barracuda", xp: 21000, gold: 10500, desc: "Covered in black bars, obscuring its true form. It holds secrets that cannot be shown. You cannot see its teeth until it bites." },
        { name: "Footnote Fry", xp: 21500, gold: 10750, desc: "Tiny fish that swim at the very bottom of the ink. They add context to the larger fish above. Easily overlooked but important." },
        { name: "Calligraphy Koi", xp: 22000, gold: 11000, desc: "Beautiful, sweeping fins that look like elegant brush strokes. It swims with purpose and grace. A masterwork of nature." }
      ],
      Fine: [
        { name: "Scroll Eater Catfish", xp: 45000, gold: 22500, desc: "Consumes knowledge from the bottom of the well. Catching it makes you feel slightly smarter. It digests ancient texts." },
        { name: "Fiction Fish", xp: 46000, gold: 23000, desc: "A creature from a fairy tale that shouldn't exist. It sparkles with imagination. It breathes fire or grants wishes, depending on the story." },
        { name: "Biography Bass", xp: 47000, gold: 23500, desc: "Its scales contain the life story of whoever catches it. Reading it reveals your own future. A personal mirror." },
        { name: "Mystery Mackerel", xp: 48000, gold: 24000, desc: "No one knows where it comes from or what it eats. It simply appears in the net. The ultimate whodunit of the sea." },
        { name: "Encyclopedia Whale", xp: 50000, gold: 25000, desc: "A massive storehouse of facts. It weighs as much as a library. It remembers everything that has ever happened in the ocean." }
      ],
      Rare: [
        { name: "Forbidden Text Flounder", xp: 110000, gold: 55000, desc: "A dark, leather-bound fish. Reading the patterns on its scales causes madness. It contains knowledge man was not meant to know." },
        { name: "Lost Language Lungfish", xp: 112500, gold: 56250, desc: "It speaks in a tongue no one has heard for a thousand years. It holds the key to translating ancient runes." },
        { name: "Poet’s Muse Tetra", xp: 115000, gold: 57500, desc: "Inspires greatness in the angler, but is hard to hold onto. It is fleeting and beautiful. Catching it sparks a masterpiece." },
        { name: "Grimoire Guardian Pike", xp: 117500, gold: 58750, desc: "A fish that looks like a floating spellbook with teeth. It guards high-level magic. It bites fingers that try to open it." },
        { name: "Final Chapter Char", xp: 120000, gold: 60000, desc: "Catching this fish gives a profound sense of closure. It marks the end of a long journey. It swims into the sunset." }
      ],
      Epic: [
        { name: "Author’s Pen Swordfish", xp: 275000, gold: 137500, desc: "A swordfish that rewrites reality with its tip. It draws new paths in the ink. It is mightier than the sword." },
        { name: "Living Library Turtle", xp: 285000, gold: 142500, desc: "A turtle with a stack of books growing on its shell. It travels slowly, gathering wisdom. It is a mobile archive." },
        { name: "Plot Twist Trout", xp: 290000, gold: 145000, desc: "You think it's a small fish, but it pulls like a whale. Nothing about it is what you expect. It surprises even veteran anglers." },
        { name: "The Editor Shark", xp: 300000, gold: 150000, desc: "A ruthless predator that cuts the weak from the school. It refines the population. It removes unnecessary elements." },
        { name: "Cliffhanger Eel", xp: 300000, gold: 150000, desc: "It always escapes right at the last second, leaving you wondering. Catching it resolves the tension. A master of suspense." }
      ],
      Legendary: [
        { name: "Omniscient Octopus", xp: 750000, gold: 375000, desc: "The All-Knowing One. It knows you are going to catch it before you cast. It has seen the end of the book." },
        { name: "Akashic Record Arowana", xp: 775000, gold: 387500, desc: "A golden scroll-fish containing the history of the universe. It records every event that ever occurs." },
        { name: "First Word Whale", xp: 800000, gold: 400000, desc: "The sound that started creation, given form. It echoes with the power of the beginning. It speaks the language of gods." }
      ],
      Mythic: [
        { name: "Eldritch Truth Squid", xp: 1800000, gold: 900000, desc: "Knowledge that burns the mind. To see it is to break. It is a concept too vast for a fish bowl." },
        { name: "Blank Page Ray", xp: 2000000, gold: 1000000, desc: "Pure potential. It can become anything, yet it is nothing. It waits for the writer to define it." }
      ]
    }
  },
    23: {
    name: "Symphony of Tides",
    unlockLevel: 3600,
    unlockGold: 1500000000, 
    boatRequired: "Cello-Hull Cruiser",
    boatPrice: 1500000000, 
    description: "A sea made of visualized sound waves. The water ripples in perfect harmony. Islands are giant tuning forks humming in the wind.",
    fish: {
      Common: [
        { name: "Treble Clef Tetra", xp: 11000, gold: 5500, desc: "A curved fish that swims in the high notes of the current. It adds a bright melody to the water." },
        { name: "Bass Note Grouper", xp: 11200, gold: 5600, desc: "Low, heavy, and slow. You feel its movement in your chest before you see it. It provides the rhythm of the ocean." },
        { name: "Staccato Skipper", xp: 11400, gold: 5700, desc: "Moves in short, sharp bursts across the surface. Dot-dot-dot. It breaks the silence with rhythmic splashing." },
        { name: "Whistle Fin Betta", xp: 11600, gold: 5800, desc: "Its fins have holes that whistle when it swims fast. A school of them sounds like a flute choir." },
        { name: "Hummingbird Fish", xp: 11800, gold: 5900, desc: "Vibrates so fast it blurs. Creates a gentle B-flat hum that soothes the listener." }
      ],
      Uncommon: [
        { name: "Resonator Ray", xp: 24000, gold: 12000, desc: "Amplifies any sound around it. Don't shout near it, or the echo will deafen you. It acts as a living speaker." },
        { name: "Echolocation Eel", xp: 24500, gold: 12250, desc: "It hunts by sound. It screams into the deep, and strikes when the sound bounces back." },
        { name: "Violin Crab", xp: 25000, gold: 12500, desc: "It plays its own claws like a fiddle using a serrated leg. The music is surprisingly mournful." },
        { name: "Tuning Fork Tuna", xp: 25500, gold: 12750, desc: "If you strike it, it rings for hours. It swims in perfect pitch. It helps other fish stay in tune." },
        { name: "Silent Note Flounder", xp: 26000, gold: 13000, desc: "A fish that absorbs all sound. Perfectly quiet. It creates a pocket of silence where it hides." }
      ],
      Fine: [
        { name: "Opera Singer Puffer", xp: 55000, gold: 27500, desc: "A fat fish with a powerful voice. It can shatter glass with a high C note. It demands attention." },
        { name: "Rhythm Keeper Drum", xp: 56000, gold: 28000, desc: "Its heart beats in perfect 4/4 time. It beats its tail against rocks to keep the tempo of the tide." },
        { name: "Discordant Pike", xp: 57000, gold: 28500, desc: "An ugly sound made flesh. It screeches when hooked, sounding like nails on a chalkboard." },
        { name: "Chime Scale Minnow", xp: 58000, gold: 29000, desc: "A school of these sounds like wind chimes in a gentle breeze. They bring peace to the listener." },
        { name: "Drum Beat Turtle", xp: 60000, gold: 30000, desc: "Using its shell as a drum, it signals war to the deep. The booming sound travels for hundreds of miles." }
      ],
      Rare: [
        { name: "Conductor Swordfish", xp: 130000, gold: 65000, desc: "A fish with a baton-like spine. It directs the flow of the current with sharp movements. The leader of the orchestra." },
        { name: "Crescendo Shark", xp: 132500, gold: 66250, desc: "It gets louder and larger the closer it gets to you. The intensity builds until it strikes." },
        { name: "Harmony Hydra", xp: 135000, gold: 67500, desc: "Each head sings a different part of the chord. Together, they create a perfect harmony. Dangerous beauty." },
        { name: "Sonic Boom Barracuda", xp: 137500, gold: 68750, desc: "Breaks the sound barrier underwater. The shockwave stuns prey instantly. Fast as sound." },
        { name: "Requiem Ray", xp: 140000, gold: 70000, desc: "A sad, slow fish. It sings for the dead. Its song brings tears to even the hardest sailors." }
      ],
      Epic: [
        { name: "Mozart Miracle Koi", xp: 320000, gold: 160000, desc: "Complex, beautiful, and genius. A masterpiece of a fish. Its patterns look like sheet music." },
        { name: "Banshee Bass", xp: 330000, gold: 165000, desc: "Its scream kills. Wear earplugs when fishing for this. It is the sound of death." },
        { name: "Subwoofer Whale", xp: 340000, gold: 170000, desc: "Generates bass frequencies that can cause earthquakes. You feel it in your bones rather than hear it." },
        { name: "Golden Harp Fish", xp: 350000, gold: 175000, desc: "Its ribs are strings. The water plays it like an instrument as it swims. A living lyre." },
        { name: "Silence Incarnate Eel", xp: 350000, gold: 175000, desc: "Where it swims, no sound can exist. Absolute void of noise. It consumes vibrations." }
      ],
      Legendary: [
        { name: "Lost Chord Coelacanth", xp: 850000, gold: 425000, desc: "The secret sound that pleases the gods. Musicians search their whole lives for this fish." },
        { name: "Siren Voice Mermaid", xp: 875000, gold: 437500, desc: "Pure temptation. It calls you to jump in. Its voice is irresistible." },
        { name: "Grand Finale Marlin", xp: 900000, gold: 450000, desc: "An explosive, triumphant fish that marks the end of the show. It leaps with a crash of cymbals." }
      ],
      Mythic: [
        { name: "Cosmic Harmony Whale", xp: 2200000, gold: 1100000, desc: "The sound of planets orbiting. Cosmic harmony given form. It sings the song of the spheres." },
        { name: "Great Silence Shark", xp: 2500000, gold: 1250000, desc: "The entropy of sound. It swallows all music and leaves only quiet. The end of the concert." }
      ]
    }
  },
    24: {
    name: "Astral Sea",
    unlockLevel: 3900,
    unlockGold: 1750000000, 
    boatRequired: "Stardust Cruiser",
    boatPrice: 1750000000, 
    description: "You are",
    fish: {
      Common: [
        { name: "Asteroid Crab", xp: 13000, gold: 6500, desc: "Looks like a floating rock until it extends its legs. It drifts through the vacuum. Hard to crack." },
        { name: "Stardust Guppy", xp: 13200, gold: 6600, desc: "A tiny pinch of glowing cosmic dust. It sparkles against the black void." },
        { name: "Vacuum Breather Minnow", xp: 13400, gold: 6700, desc: "Adapted to survive in zero atmosphere. It holds its breath for eons." },
        { name: "Orbit Minnow", xp: 13600, gold: 6800, desc: "Spins around larger objects. It never stops moving. It is caught in a gravitational loop." },
        { name: "Comet Tail Tetra", xp: 13800, gold: 6900, desc: "Leaves a trail of ice crystals behind it. It is a miniature shooting star." }
      ],
      Uncommon: [
        { name: "Planetary Puffer", xp: 28000, gold: 14000, desc: "Inflates into a miniature gas giant planet with rings. It has its own moons." },
        { name: "Meteor Strike Pike", xp: 28500, gold: 14250, desc: "Hits the bait with the force of an impact event. It creates craters in the water." },
        { name: "Zero G Eel", xp: 29000, gold: 14500, desc: "Floats lazily, unburdened by gravity. It moves in three dimensions easily." },
        { name: "Nebula Nudibranch", xp: 29500, gold: 14750, desc: "A colorful slug made of ionized gas clouds. It is a stellar nursery in miniature." },
        { name: "Satellite Fish", xp: 30000, gold: 15000, desc: "Has metal antennae. It transmits strange signals to distant stars." }
      ],
      Fine: [
        { name: "Solar Flare Bass", xp: 65000, gold: 32500, desc: "Hotter than the surface of the sun. Use a tungsten hook. It radiates ultraviolet light." },
        { name: "Eclipse Ray", xp: 66000, gold: 33000, desc: "A black disc that blocks out the starlight behind it. It brings darkness." },
        { name: "Constellation Urchin", xp: 67000, gold: 33500, desc: "Its spines connect to form zodiac signs. A prickly map of the sky." },
        { name: "Gamma Ray Burst Goby", xp: 68000, gold: 34000, desc: "Highly radioactive. Dangerous and short-lived. It explodes with energy." },
        { name: "Void Shark", xp: 70000, gold: 35000, desc: "Perfectly black. It hunts in the spaces between stars. It is the predator of the empty dark." }
      ],
      Rare: [
        { name: "Red Giant Sunfish", xp: 150000, gold: 75000, desc: "A massive, old fish near the end of its life cycle. It has expanded to a huge size." },
        { name: "White Dwarf Puffer", xp: 155000, gold: 77500, desc: "Small, dense, and incredibly heavy. It is the core of a dead star." },
        { name: "Pulsar Perch", xp: 160000, gold: 80000, desc: "Spins rapidly, shooting beams of radiation from its poles. It acts as a lighthouse." },
        { name: "Dark Matter Entity", xp: 162000, gold: 81000, desc: "It interacts only with gravity, not light. Invisible but heavy. It holds the galaxy together." },
        { name: "Quasar Queen Angler", xp: 165000, gold: 82500, desc: "The brightest fish in the universe. Its lure outshines galaxies." }
      ],
      Epic: [
        { name: "Galactic Core Discus", xp: 380000, gold: 190000, desc: "A swirling spiral of billions of tiny lights. It contains a supermassive center." },
        { name: "Supernova Salmon", xp: 390000, gold: 195000, desc: "Catching it triggers an explosion of cosmic proportions. A beautiful death." },
        { name: "Traveler Alien Fish", xp: 400000, gold: 200000, desc: "An alien probe disguised as a fish. It has seen many worlds. It watches you." },
        { name: "Cosmic Horror Squid", xp: 410000, gold: 205000, desc: "Tentacles that span light-years. It is vast and terrifying." },
        { name: "Event Horizon Eater Shark", xp: 420000, gold: 210000, desc: "It lives on the edge of a black hole. Time stands still near it." }
      ],
      Legendary: [
        { name: "Big Dipper Starfish", xp: 950000, gold: 475000, desc: "A constellation caught in a net. It points the way North." },
        { name: "Star Eater Leviathan", xp: 975000, gold: 487500, desc: "It swallows suns for breakfast. It brings darkness to galaxies." },
        { name: "Entropy End Eel", xp: 1000000, gold: 500000, desc: "The heat death of the universe in fish form. Cold and final." }
      ],
      Mythic: [
        { name: "Creator Whale", xp: 2500000, gold: 1250000, desc: "The spark that started it all. It seeds life across the universe." },
        { name: "Destroyer Shark", xp: 2800000, gold: 1400000, desc: "The void that ends it all. It hunts the Creator." }
      ]
    }
  },
    25: {
    name: "The Event Horizon",
    unlockLevel: 4300,
    unlockGold: 2500000000, 
    boatRequired: "Singularity-Proof Pod",
    boatPrice: 2500000000, 
    description: "The edge of a supermassive black hole. Time is distorted, light is bent into a ring, and reality is breaking down.",
    fish: {
      Common: [
        { name: "Spaghettification Eel", xp: 15000, gold: 7500, desc: "Stretched infinitely thin by tidal forces. It looks like a long noodle." },
        { name: "Photon Ring Fish", xp: 15200, gold: 7600, desc: "Made of light trapped in a circular orbit. It moves at light speed." },
        { name: "Time Dilation Tetra", xp: 15400, gold: 7700, desc: "It moves slower the faster you try to reel it in. A relativistic headache." },
        { name: "Gravity Well Guppy", xp: 15600, gold: 7800, desc: "Extremely heavy. It creates a dimple in the fabric of space." },
        { name: "Accretion Disk Crab", xp: 15800, gold: 7900, desc: "Feeds on the superheated matter swirling into the hole. It glows with x-rays." }
      ],
      Uncommon: [
        { name: "Red Shift Ray", xp: 32000, gold: 16000, desc: "It appears red because it is moving away from you at light speed. Hard to chase." },
        { name: "Blue Shift Bass", xp: 32500, gold: 16250, desc: "It appears blue because it is rushing towards you. Duck!" },
        { name: "Wormhole Weaver Eel", xp: 33000, gold: 16500, desc: "Burrows through space-time to escape. It stitches holes in the universe." },
        { name: "Paradox Pike", xp: 34000, gold: 17000, desc: "It is both caught and not caught until you check the net. Schrödinger's fish." },
        { name: "Singularity Scout Goby", xp: 35000, gold: 17500, desc: "It ventured into the black hole and somehow returned. It has seen the end." }
      ],
      Fine: [
        { name: "Hawking Radiation Ray", xp: 75000, gold: 37500, desc: "Slowly evaporating into pure energy. Catch it before it disappears." },
        { name: "Information Paradox Cod", xp: 76000, gold: 38000, desc: "Contains information that should have been destroyed. A glitch in physics." },
        { name: "Relativity Remora", xp: 77000, gold: 38500, desc: "Hitches a ride on faster-than-light particles. A cosmic hitchhiker." },
        { name: "Tidal Force Turtle", xp: 78000, gold: 39000, desc: "Its shell is reinforced to withstand infinite gravity. It cannot be crushed." },
        { name: "Null Geometry Flounder", xp: 80000, gold: 40000, desc: "A shape that cannot exist in three dimensions. Looking at it hurts." }
      ],
      Rare: [
        { name: "Unseeable Angler", xp: 180000, gold: 90000, desc: "It absorbs all light. A fish-shaped void. You cast into the dark." },
        { name: "Time Loop Trout", xp: 185000, gold: 92500, desc: "It keeps biting the hook over and over again forever. It is trapped in a moment." },
        { name: "Dimensional Ripper Shark", xp: 190000, gold: 95000, desc: "Its fins slice through the barrier between universes. It hunts in the multiverse." },
        { name: "Gravity Lens Jelly", xp: 195000, gold: 97500, desc: "It warps the image of the stars behind it. A living lens." },
        { name: "Infinite Mass Shark", xp: 200000, gold: 100000, desc: "If it stops moving, it collapses into a black hole. It must swim to survive." }
      ],
      Epic: [
        { name: "Event Horizon Ray", xp: 450000, gold: 225000, desc: "The point of no return. Once you see it, you cannot escape." },
        { name: "Singularity Sunfish", xp: 460000, gold: 230000, desc: "Infinite density in a single point. Heavier than a sun." },
        { name: "Cosmic String Serpent", xp: 470000, gold: 235000, desc: "A one-dimensional defect in space-time topology. Extremely sharp." },
        { name: "White Hole Whale", xp: 480000, gold: 240000, desc: "It spews matter out instead of sucking it in. A fountain of creation." },
        { name: "Observer Catfish", xp: 500000, gold: 250000, desc: "By looking at it, you collapse its quantum wave function. It changes when observed." }
      ],
      Legendary: [
        { name: "Gravity Master Grouper", xp: 1100000, gold: 550000, desc: "It decides which way is down. It controls the battlefield." },
        { name: "Time Eater Shark", xp: 1150000, gold: 575000, desc: "It consumes the past, present, and future. It leaves no history." },
        { name: "Reality Anchor Crab", xp: 1200000, gold: 600000, desc: "The only thing holding the universe together near the hole. Do not move it." }
      ],
      Mythic: [
        { name: "Void Beyond Leviathan", xp: 3000000, gold: 1500000, desc: "What lies on the other side of the black hole. A mystery." },
        { name: "Null Existence Eel", xp: 3300000, gold: 1650000, desc: "A fish that proves nothing is real. Capturing it is a paradox." }
      ]
    }
  },
    26: {
    name: "The Crystalline Dimension",
    unlockLevel: 4600,
    unlockGold: 3000000000, 
    boatRequired: "Prism-Glass Ark",
    boatPrice: 3000000000, 
    description: "A reality composed entirely of geometric shapes and refracting light. There is no fluid water, only a flow of shattered crystal shards that move like a liquid.",
    fish: {
      Common: [
        { name: "Cube Guppy", xp: 16000, gold: 8000, desc: "A fish with six perfect square sides. It doesn't swim; it tumbles." },
        { name: "Pyramid Piranha", xp: 16200, gold: 8100, desc: "A triangular predator. Three teeth, three eyes, three fins." },
        { name: "Fractal Fin Betta", xp: 16400, gold: 8200, desc: "Its pattern repeats infinitely the closer you look. A mathematical beauty." },
        { name: "Polygon Perch", xp: 16600, gold: 8300, desc: "Low-poly and sharp. Looks like an unfinished 3D model." },
        { name: "Shard Skipper Minnow", xp: 16800, gold: 8400, desc: "Skims across the surface of the crystal flow. Made of tiny glass splinters." }
      ],
      Uncommon: [
        { name: "Refraction Ray", xp: 35000, gold: 17500, desc: "Bends light around itself. It looks like a distortion in the air." },
        { name: "Symmetry Salmon", xp: 35500, gold: 17750, desc: "Perfectly symmetrical down to the molecular level. Balance in all things." },
        { name: "Geode Grouper", xp: 36000, gold: 18000, desc: "Rough on the outside, sparkling amethyst on the inside. A hidden gem." },
        { name: "Diamond Hard Gar", xp: 36500, gold: 18250, desc: "Cannot be cut or scratched. It bites through diamond drills." },
        { name: "Glass Blower Eel", xp: 37000, gold: 18500, desc: "Transparent and tubular. You can see its digestion. It expands when heated." }
      ],
      Fine: [
        { name: "Tesseract Trout", xp: 80000, gold: 40000, desc: "A fish that exists in four dimensions. It folds inside out. Mind-bending." },
        { name: "Golden Ratio Nautilus", xp: 82000, gold: 41000, desc: "A spiral-shaped shell creature. Aesthetically perfect. Nature's math." },
        { name: "Kaleidoscope Koi", xp: 84000, gold: 42000, desc: "Its colors shift and rotate as it swims. A constantly changing pattern." },
        { name: "Prism Pike", xp: 86000, gold: 43000, desc: "Splits white light into a deadly rainbow laser. It attacks with color." },
        { name: "Obsidian Obelisk Fish", xp: 88000, gold: 44000, desc: "A tall, dark, pillar-like fish that floats upright. It hums a low frequency." }
      ],
      Rare: [
        { name: "Euclidean Eel", xp: 200000, gold: 100000, desc: "Follows straight lines and right angles only. It cannot turn in curves." },
        { name: "Non-Euclidean Angler", xp: 205000, gold: 102500, desc: "Its geometry hurts the brain. It has too many corners. It defies logic." },
        { name: "Crystal Clear Leviathan", xp: 210000, gold: 105000, desc: "Invisible in the water. You only see the displacement of the shards." },
        { name: "Gemstone Golem Crab", xp: 215000, gold: 107500, desc: "A construct of ruby, sapphire, and emerald. Valuable and heavy." },
        { name: "Mirror Dimension Carp", xp: 220000, gold: 110000, desc: "It lives in the reflection of the crystal, not the crystal itself." }
      ],
      Epic: [
        { name: "Great Prism Sunfish", xp: 500000, gold: 250000, desc: "The source of all color in this dimension. It radiates pure spectrums." },
        { name: "Living Algorithm Eel", xp: 510000, gold: 255000, desc: "A mathematical equation that gained sentience. It solves problems." },
        { name: "Infinity Die Puffer", xp: 520000, gold: 260000, desc: "A spherical fish with infinite planes. It rolls every number at once." },
        { name: "Zero Point Energy Ray", xp: 530000, gold: 265000, desc: "Buzzing with potential power. Don't shake it. It could power a city." },
        { name: "Architect of Shapes Shark", xp: 540000, gold: 270000, desc: "It builds the geometric coral reefs. It designs the world." }
      ],
      Legendary: [
        { name: "Platonic Solid Puffer", xp: 1200000, gold: 600000, desc: "The perfect form of a fish. It represents elemental earth, air, fire, and water." },
        { name: "Divider Swordfish", xp: 1250000, gold: 625000, desc: "A fish that splits reality into two separate timelines. A dangerous blade." },
        { name: "Crystal Core Whale", xp: 1300000, gold: 650000, desc: "The heart of the dimension. It pulses with white light." }
      ],
      Mythic: [
        { name: "Prime Geometry Shark", xp: 3500000, gold: 1750000, desc: "The concept of Shape itself. It defines what is possible in space." },
        { name: "Shattered God Whale", xp: 4000000, gold: 2000000, desc: "A deity broken into a billion pieces, trying to reform. It sings in chords." }
      ]
    }
  },
    27: {
    name: "The River of Souls",
    unlockLevel: 5000,
    unlockGold: 4000000000, 
    boatRequired: "Spirit-Lantern Ferry",
    boatPrice: 4000000000, 
    description: "The barrier between life and death. A river of pale, glowing mist flows through a grey void. Whispers echo from the water.",
    fish: {
      Common: [
        { name: "Wisp Minnow", xp: 18000, gold: 9000, desc: "A tiny soul that hasn't formed a personality yet. It flickers like a candle." },
        { name: "Ghost Guppy", xp: 18200, gold: 9100, desc: "Transparent and sad. It cries silently. It misses the living world." },
        { name: "Memory Eater Catfish", xp: 18400, gold: 9200, desc: "Nibbles on your forgotten childhood memories. It grows fat on nostalgia." },
        { name: "Regret Ray", xp: 18600, gold: 9300, desc: "Heavy with the weight of things left undone. It drags along the bottom." },
        { name: "Phantom Flounder", xp: 18800, gold: 9400, desc: "Lies flat on the bottom of the afterlife. It is the shadow of a fish." }
      ],
      Uncommon: [
        { name: "Poltergeist Pike", xp: 40000, gold: 20000, desc: "Aggressive and noisy. It throws pebbles at the boat. It wants attention." },
        { name: "Banshee Bass", xp: 41000, gold: 20500, desc: "Screams when pulled from the water. It foretells bad luck." },
        { name: "Wraith Eel", xp: 42000, gold: 21000, desc: "A long ribbon of shadow and malice. It chills the air around it." },
        { name: "Spirit Guide Salmon", xp: 43000, gold: 21500, desc: "Swims upstream towards reincarnation. It glows with hope." },
        { name: "Grave Digger Crab", xp: 44000, gold: 22000, desc: "Buries itself in the ash of the riverbed. It tends the graves of the deep." }
      ],
      Fine: [
        { name: "Soul Lantern Angler", xp: 90000, gold: 45000, desc: "Carries a light to guide lost fish home. A benevolent spirit." },
        { name: "Ectoplasm Jellyfish", xp: 92000, gold: 46000, desc: "Sticky residue of the spirit world. It glows green. Hard to wash off." },
        { name: "Possessed Armor Gar", xp: 94000, gold: 47000, desc: "A helmet that swims. There is no fish inside, only will." },
        { name: "Shadow Person Carp", xp: 96000, gold: 48000, desc: "A silhouette that mimics human shape. It stands in the corner of your eye." },
        { name: "Vengeful Spirit Betta", xp: 98000, gold: 49000, desc: "Red and angry. It holds a grudge from a past life." }
      ],
      Rare: [
        { name: "Ferryman Tip Coin-Fish", xp: 220000, gold: 110000, desc: "A coin-shaped fish. Payment for the crossing. Do not spend it." },
        { name: "Limbo Leviathan Eel", xp: 225000, gold: 112500, desc: "Stuck between worlds. It cannot die, it cannot live." },
        { name: "Ancestral Guardian Turtle", xp: 230000, gold: 115000, desc: "Protects the lineage of the angler. It recognizes your blood." },
        { name: "Past Life Echo Carp", xp: 235000, gold: 117500, desc: "Looks like who you were in a previous game save. A strange familiarity." },
        { name: "Grim Reaper Scythe Fish", xp: 240000, gold: 120000, desc: "A curved, silver fish that cuts the thread of life. It is the end." }
      ],
      Epic: [
        { name: "Cerberus Catfish", xp: 550000, gold: 275000, desc: "Three heads, guards the gates of the deep. It sees past, present, and future." },
        { name: "River Styx Serpent", xp: 560000, gold: 280000, desc: "Its venom makes you forget your name. It washes away memories." },
        { name: "Judge of Souls Ray", xp: 570000, gold: 285000, desc: "Weighs your heart against a feather. It decides your fate." },
        { name: "Eternal Flame Betta", xp: 580000, gold: 290000, desc: "A blue fire that burns underwater. It represents the soul that never dies." },
        { name: "Thanatos Ray", xp: 600000, gold: 300000, desc: "The peaceful aspect of death. Soft, silent, and welcoming." }
      ],
      Legendary: [
        { name: "Hades Helm Discus", xp: 1300000, gold: 650000, desc: "A fish of pure invisibility. It rules the underworld." },
        { name: "Phoenix Carp", xp: 1400000, gold: 700000, desc: "Cycles between ash and fire. The cycle of rebirth." },
        { name: "Death Incarnate Shark", xp: 1500000, gold: 750000, desc: "Not evil, just inevitable. It comes for everyone eventually." }
      ],
      Mythic: [
        { name: "Life Stream Serpent", xp: 4000000, gold: 2000000, desc: "The collective energy of every living thing. It flows through all of us." },
        { name: "Entropy Shark", xp: 4500000, gold: 2250000, desc: "The end of the universe, waiting patiently. It eats time itself." }
      ]
    }
  },
    28: {
    name: "Sector Zero (The Glitch)",
    unlockLevel: 5500,
    unlockGold: 6000000000, 
    boatRequired: "Developer-Console",
    boatPrice: 6000000000, 
    description: "The reality of the game is breaking down. The water is a grid of green binary code. The sky is a 'Texture Missing' purple checkerboard.",
    fish: {
      Common: [
        { name: "Pixel Guppy", xp: 20000, gold: 10000, desc: "A single glowing white pixel. It is the building block of the world." },
        { name: "Bugged Bass", xp: 20200, gold: 10100, desc: "It swims upside down and clips through rocks. It ignores collision physics." },
        { name: "Lag Spike Pike", xp: 20400, gold: 10200, desc: "It freezes in place for seconds at a time. It teleports when it moves." },
        { name: "Binary Bream", xp: 20600, gold: 10300, desc: "Composed entirely of 0s and 1s. It is pure data." },
        { name: "Glitch Crab", xp: 20800, gold: 10400, desc: "Its legs are stretched to infinity due to a model error. It looks terrifying but is harmless." }
      ],
      Uncommon: [
        { name: "MissingNo Blobfish", xp: 45000, gold: 22500, desc: "A scrambled block of data. Do not put in your 6th inventory slot." },
        { name: "Texture File Trout", xp: 46000, gold: 23000, desc: "Wrapped in a generic 'Sample Text' skin. It hasn't loaded properly." },
        { name: "Corrupted Save Eel", xp: 47000, gold: 23500, desc: "Touch it and you might lose your progress. It eats save files." },
        { name: "Wireframe Whale", xp: 48000, gold: 24000, desc: "You can see the polygon mesh that builds it. It has no skin." },
        { name: "Hitbox Horror Carp", xp: 49000, gold: 24500, desc: "You can't hit it because its hitbox is smaller than its body. Very annoying to catch." }
      ],
      Fine: [
        { name: "BSOD Ray", xp: 100000, gold: 50000, desc: "Fatal Error. Blue Screen of Death given form. It crashes the water." },
        { name: "Error 404 Fish", xp: 102000, gold: 51000, desc: "Fish Not Found. It is a hole in the code." },
        { name: "Infinite Money Goldfish", xp: 104000, gold: 52000, desc: "A golden fish that duplicates itself. It ruins economies." },
        { name: "Wall Hack Shark", xp: 106000, gold: 53000, desc: "It swims through solid islands. It sees everything." },
        { name: "Dev Tool Turtle", xp: 108000, gold: 54000, desc: "Used by the creators to test swimming physics. It is perfectly spherical." }
      ],
      Rare: [
        { name: "Spaghetti Code Serpent", xp: 250000, gold: 125000, desc: "A mess of tangled logic that barely functions. It knots itself constantly." },
        { name: "Memory Leak Leech", xp: 255000, gold: 127500, desc: "Consumes system RAM until the world crashes. It gets bigger the longer you play." },
        { name: "Placeholder Asset Box Grouper", xp: 260000, gold: 130000, desc: "A glowing red cube with the word 'FISH' written on it. It forgot to be a fish." },
        { name: "Beta Test Beast", xp: 265000, gold: 132500, desc: "An overpowered fish from an earlier version of the world. It was never nerfed." },
        { name: "Admin Privilege Angler", xp: 270000, gold: 135000, desc: "Gives the user a sense of unlimited power. It glows with authority." }
      ],
      Epic: [
        { name: "Algorithm Eel", xp: 600000, gold: 300000, desc: "It decides if you get a rare drop or trash. It controls your luck." },
        { name: "RNG God Ray", xp: 610000, gold: 305000, desc: "Pray to it. It usually ignores you. It is fickle and cruel." },
        { name: "Source Code Leviathan", xp: 620000, gold: 310000, desc: "The root directory of the ocean. It holds the scripts that run the water." },
        { name: "Firewall Pike", xp: 630000, gold: 315000, desc: "Blocks unauthorized fishing attempts. It burns intruders." },
        { name: "Delete Key Flounder", xp: 650000, gold: 325000, desc: "A fish shaped like a keyboard button. It erases matter from existence." }
      ],
      Legendary: [
        { name: "Hello World Guppy", xp: 1500000, gold: 750000, desc: "The first fish ever coded. Simple, perfect, and iconic." },
        { name: "Game Over Voidfish", xp: 1600000, gold: 800000, desc: "A black screen in the shape of a fish. It signals the end of a run." },
        { name: "Developer Avatar", xp: 1700000, gold: 850000, desc: "The avatar of the one who built this reality. It watches its creation." }
      ],
      Mythic: [
        { name: "System Shutdown Whale", xp: 5000000, gold: 2500000, desc: "The end of the session. Lights out. It sleeps in the dark." },
        { name: "Uninstall Wizard Squid", xp: 5500000, gold: 2750000, desc: "A terrifying entity that removes existence file by file. It cleans the drive." }
      ]
    }
  },
    29: {
    name: "The Omni-Void",
    unlockLevel: 6000,
    unlockGold: 8000000000, 
    boatRequired: "Nothingness-Skiff",
    boatPrice: 8000000000, 
    description: "There is no water. There is no sky. There is no boat (visually). You are floating in absolute white nothingness.",
    fish: {
      Common: [
        { name: "Blank Slate Flounder", xp: 22000, gold: 11000, desc: "A white fish on a white background. Good luck seeing it. It represents potential." },
        { name: "Silence Minnow", xp: 22500, gold: 11250, desc: "It absorbs sound. When you catch it, the world goes quiet." },
        { name: "Erasure Eel", xp: 23000, gold: 11500, desc: "Rubs against reality to remove it. It acts like an eraser." },
        { name: "Null Point Guppy", xp: 23500, gold: 11750, desc: "A fish with zero dimensions. It is a mathematical point." },
        { name: "Vacuum Viper Fish", xp: 24000, gold: 12000, desc: "Nature abhors it. It sucks in air and light." }
      ],
      Uncommon: [
        { name: "White Noise Ray", xp: 50000, gold: 25000, desc: "Emits a constant static hiss. It soothes and disturbs simultaneously." },
        { name: "Static Shark", xp: 51000, gold: 25500, desc: "Like the static on an old TV. It hurts to look at." },
        { name: "Non Existent Newt", xp: 52000, gold: 26000, desc: "I think I caught one? I'm not sure. It might be a hallucination." },
        { name: "Ghost Data Cod", xp: 53000, gold: 26500, desc: "Information that has been deleted but lingers. A memory of a fish." },
        { name: "Unknown Angler", xp: 54000, gold: 27000, desc: "We don't know what this fish is. Classification impossible." }
      ],
      Fine: [
        { name: "Concept Carp", xp: 110000, gold: 55000, desc: "It's not a fish, just the idea of one. It exists in the abstract." },
        { name: "Abstract Art Tetra", xp: 112000, gold: 56000, desc: "Shapes and colors that don't make sense. It changes depending on who looks at it." },
        { name: "Minimalist Mackerel", xp: 115000, gold: 57500, desc: "Just a single line sketch. It is as simple as a fish can be." },
        { name: "Negative Space Ray", xp: 117000, gold: 58500, desc: "A hole in the universe shaped like a fish. It is the absence of matter." },
        { name: "Forgotten Memory Bass", xp: 120000, gold: 60000, desc: "You feel sad when you hold it, but you don't know why. It is lost nostalgia." }
      ],
      Rare: [
        { name: "Nihilist Nemo Clownfish", xp: 280000, gold: 140000, desc: "It believes in nothing. It swims without purpose." },
        { name: "Total Eclipse Sunfish", xp: 285000, gold: 142500, desc: "Blocks out all thought. It brings a moment of pure mental silence." },
        { name: "Absolute Zero Puffer", xp: 290000, gold: 145000, desc: "The absence of all heat and movement. It stops atoms from vibrating." },
        { name: "Void Stare Goby", xp: 295000, gold: 147500, desc: "If you gaze into the abyss, this fish gazes back. Do not blink." },
        { name: "Oblivion Orb Puffer", xp: 300000, gold: 150000, desc: "A sphere of pure destruction. It unmaking things is its nature." }
      ],
      Epic: [
        { name: "Entropy Eater Catfish", xp: 700000, gold: 350000, desc: "Feeds on the decay of the universe. It cleans up the end of time." },
        { name: "Unmaker Eel", xp: 720000, gold: 360000, desc: "Unravels the threads of reality. It undoes what has been done." },
        { name: "Cosmic Eraser Ray", xp: 740000, gold: 370000, desc: "Rubs out stars from the sky. It leaves darkness in its wake." },
        { name: "Final Breath Betta", xp: 750000, gold: 375000, desc: "The last gasp of a dying world. It holds the final moment of life." },
        { name: "The End Lobster", xp: 750000, gold: 375000, desc: "Literally the words 'THE END' crawling. It marks the conclusion." }
      ],
      Legendary: [
        { name: "Tabula Rasa Carp", xp: 2000000, gold: 1000000, desc: "A clean slate. A new beginning. It washes away all mistakes." },
        { name: "Pre Creation Coelacanth", xp: 2100000, gold: 1050000, desc: "What existed before the Big Bang. It is older than time." },
        { name: "Great Nothing Whale", xp: 2200000, gold: 1100000, desc: "Infinite, empty, and peaceful. It is the silence after the storm." }
      ],
      Mythic: [
        { name: "Non Existent Eel", xp: 6000000, gold: 3000000, desc: "You didn't catch this. It doesn't exist. It is a figment of your imagination." },
        { name: "Vacuum Shark", xp: 7000000, gold: 3500000, desc: "The most stable state of energy. It collapses universes into nothing." }
      ]
    }
  },
    30: {
    name: "The Alpha & Omega Spring",
    unlockLevel: 7000,
    unlockGold: 10000000000,
    boatRequired: "The Ark of Origins",
    boatPrice: 10000000000,
    description: "The Source. The beginning and the end. A small, humble pond in a garden that exists outside of time. The water is pure light.",
    fish: {
      Common: [
        { name: "Origin Minnow", xp: 25000, gold: 12500, desc: "The prototype for every minnow in existence. It is the original design." },
        { name: "Creation Carp", xp: 26000, gold: 13000, desc: "It spawns entire universes from its mouth as bubbles. It swims with the weight of existence." },
        { name: "Genesis Guppy", xp: 27000, gold: 13500, desc: "In the beginning, there was this guppy. It started the food chain." },
        { name: "Eden Eel", xp: 28000, gold: 14000, desc: "Innocent and uncorrupted. It has never known fear or pain." },
        { name: "Primordial Perch", xp: 29000, gold: 14500, desc: "The first fish to ever swim. It set the standard for all others." }
      ],
      Uncommon: [
        { name: "Spark of Life Tetra", xp: 60000, gold: 30000, desc: "A tiny flicker that can start a galaxy. It is warm and bright." },
        { name: "DNA Helix Eel", xp: 62500, gold: 31250, desc: "The building block of all biology. It twists and turns in a double helix." },
        { name: "Evolution Eater Bass", xp: 65000, gold: 32500, desc: "It evolves into a new species every few seconds. It adapts instantly to any bait." },
        { name: "Time Stream Trout", xp: 67500, gold: 33750, desc: "Swims through the timeline of the game. It has seen your entire journey." },
        { name: "Matter Weaver Ray", xp: 70000, gold: 35000, desc: "Knits atoms together to create mass. It builds the physical world." }
      ],
      Fine: [
        { name: "Cosmic Egg Puffer", xp: 150000, gold: 75000, desc: "A round fish containing a baby universe. Do not pop it." },
        { name: "Stardust Sprite Betta", xp: 155000, gold: 77500, desc: "Made of the same stuff as you. We are all stardust." },
        { name: "Force of Nature Pike", xp: 160000, gold: 80000, desc: "Gravity, Electromagnetism, and Nuclear forces combined. It holds the laws of physics." },
        { name: "Divine Ray", xp: 165000, gold: 82500, desc: "Radiates holy light. It is a messenger from the beyond." },
        { name: "Eternal Flow Salmon", xp: 175000, gold: 87500, desc: "The water of life itself. Drinking from its stream grants immortality." }
      ],
      Rare: [
        { name: "Architect Arowana", xp: 350000, gold: 175000, desc: "It carries a blueprint of the cosmos on its scales. It designed the stars." },
        { name: "Gardener Catfish", xp: 360000, gold: 180000, desc: "Tends to the growth of life. It prunes the timeline to ensure health." },
        { name: "Universal Constant Carp", xp: 370000, gold: 185000, desc: "Pi, Phi, and E wrapped in scales. It represents the math of god." },
        { name: "Infinity Fish", xp: 380000, gold: 190000, desc: "Has no beginning and no end. It swims in a perfect circle." },
        { name: "Answer 42 Dolphin", xp: 400000, gold: 200000, desc: "The answer to life, the universe, and everything. It thanks you for all the fish." }
      ],
      Epic: [
        { name: "Alpha Betta", xp: 1000000, gold: 500000, desc: "The first letter. The beginning. It starts the story." },
        { name: "Omega Orca", xp: 1100000, gold: 550000, desc: "The last letter. The end. It finishes the story." },
        { name: "Continuum Crusher Crab", xp: 1150000, gold: 575000, desc: "Maintains the stability of the timeline. It pinches shut holes in reality." },
        { name: "God Hand Koi", xp: 1200000, gold: 600000, desc: "A fish shaped like a hand reaching down from heaven. It pulls you up." },
        { name: "The Player (Mirror Fish)", xp: 1200000, gold: 600000, desc: "It is a mirror. It is you. You are the epic catch." }
      ],
      Legendary: [
        { name: "Big Bang Shark", xp: 3000000, gold: 1500000, desc: "The explosion that started reality. It burns with the heat of creation." },
        { name: "Big Crunch Crab", xp: 3250000, gold: 1625000, desc: "The collapse that ends reality. It pulls everything into a final point." },
        { name: "Eternity Eel", xp: 3500000, gold: 1750000, desc: "Time without end. It stretches forever into the future." }
      ],
      Mythic: [
        { name: "Supreme Deity Whale", xp: 10000000, gold: 5000000, desc: "The One Above All. It watches over the Alpha and Omega. It is peace." },
        { name: "Horizon Keeper Whale", xp: 15000000, gold: 7500000, desc: "A creature that guards the edge of the known universe. It signals that there are always more waters to explore beyond the edge of the map. The journey never truly ends." }
      ]
    }
  }
}
