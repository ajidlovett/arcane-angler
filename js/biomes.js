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
        { name: "Sand-Sifter Goby", xp: 10, gold: 5, desc: "A small, speckled fish that spends its entire life filtering river sand through its gills. It is constantly chewing, looking for microscopic food. Often found near the riverbanks." },
        { name: "Silver Darter", xp: 11, gold: 6, desc: "A glossy silver fish that flickers like a tossed coin underwater. Large schools gather near shallow banks at sunrise to feed. Catching one is traditionally seen as a sign of good financial luck." },
        { name: "Glass-Fin Minnow", xp: 11, gold: 6, desc: "Its fins are completely transparent, making it look like a floating torpedo. It uses this camouflage to hide among clear quartz pebbles. You often only see its eyes moving in the water." },
        { name: "Reed Chub", xp: 12, gold: 6, desc: "A plump fish that prefers hiding among thick river reeds. It is easily startled and kicks up mud clouds to escape anglers. Villagers consider it a staple food for hearty stews." },
        { name: "Rusty Hook Eel", xp: 12, gold: 6, desc: "A thin brown eel with a mouth curved like a rusted fishing hook. It often snags lines and steals bait without getting caught. Locals consider it a minor pest." },
        { name: "Spotted Fry", xp: 13, gold: 7, desc: "A tiny fry covered in dark speckles that mimic riverbed grit. They travel in swirling clusters that resemble drifting ash or silt. Beginners often catch them while learning line control." },
        { name: "Bubble Blower Betta", xp: 13, gold: 7, desc: "It creates intricate nests made of bubbles on the water's surface. The bubbles are surprisingly durable and shimmer with oil-slick colors. It guards its nest fearlessly against insects." },
        { name: "Driftwood Dace", xp: 14, gold: 7, desc: "Its scales mimic the texture and color of waterlogged wood. When threatened, it stiffens its body and floats downstream like a stick. A clever survival strategy." },
        { name: "Mudscale Carp", xp: 15, gold: 8, desc: "A rough-scaled carp coated in a thick layer of protective mud. It survives in stagnant pools where most fish wouldn't dare to swim. Elders say the mudscale carp brings resilience to those who catch it." }
      ],
      Uncommon: [
        { name: "Brighttail Perch", xp: 25, gold: 12, desc: "Known for its faintly glowing yellow tail that pierces the murky water. Some claim the tail glows brighter right before rainfall. Travelers often keep dried scales as good luck charms." },
        { name: "Swift-Current Trout", xp: 25, gold: 12, desc: "Built with powerful tail muscles to swim against the strongest rapids. It rests behind large rocks to ambush prey. Catching one is a sign that your reel speed is improving." },
        { name: "Streamrunner Trout", xp: 28, gold: 14, desc: "A sleek trout built for speed, capable of racing upstream in sharp bursts. Locals hold competitions predicting their leaps over small waterfalls. It fights surprisingly hard for its size." },
        { name: "Greenfin Shiner", xp: 30, gold: 15, desc: "Recognizable by its shimmering emerald fins that catch the light. They hide among river weeds in perfect stillness to avoid detection. Collectors admire their gemlike appearance in aquarium jars." },
        { name: "Fool's Gold Carp", xp: 30, gold: 15, desc: "It glitters brilliantly, but the scales turn dull grey moments after being removed from the water. Many novices mistake it for the rare Copperback Salmon. It is heavy but worth little." },
        { name: "Dapple Carp", xp: 32, gold: 16, desc: "A large carp with mottled patterns across its body. It is patient and stubborn, putting up a surprisingly long fight on the line. Catching one is considered a memorable early milestone." },
        { name: "Mossy Rock Bass", xp: 33, gold: 17, desc: "Algae grows thick on its back, giving it a fuzzy green appearance. It smells of wet earth and rain. It blends in perfectly with the riverbed stones." },
        { name: "Driftback Loach", xp: 35, gold: 18, desc: "A bottom-dweller that wriggles backward into soft sand to hide. Its quirky movement makes it a local favorite among children. It can sense vibrations in the sand from far away." }
      ],
      Fine: [
        { name: "Gleamfish Minnow", xp: 55, gold: 25, desc: "A shimmering minnow reflecting light like morning dew. During festivals, villagers craft paper lanterns in its honor. It is said to bring clarity to one's thoughts." },
        { name: "Lantern Flyfish", xp: 55, gold: 25, desc: "It leaps out of the water to catch fireflies. Its scales have evolved to glow faintly to attract mates during the twilight hours. A beautiful sight in the evening." },
        { name: "Longbar Pike", xp: 58, gold: 28, desc: "A narrow-bodied pike known for its straight, lightning-fast dashes. Anglers prize it as a true test of accuracy and reflex. Its catches are often displayed proudly at local taverns." },
        { name: "Honeystripe Barb", xp: 60, gold: 30, desc: "A small barb with golden stripes that glow warmly in sunlight. Its flesh carries a naturally sweet flavor, making it a delicacy. Old recipes refer to it as 'river candy.'" },
        { name: "Ceramic Shard Catfish", xp: 60, gold: 30, desc: "Its armored plating looks like broken pieces of white and blue pottery. It scavenges near the ruins of the old bridge. Some say it brings good luck to the household." },
        { name: "Tinkerscale Trout", xp: 62, gold: 32, desc: "A playful trout unique to these specific waters. At dusk, they leap repeatedly, creating tiny ripples like falling rain. Once matured, they migrate further downstream." },
        { name: "Siltveil Catfish", xp: 65, gold: 35, desc: "A smooth-skinned catfish known for kicking up veils of drifting silt. It uses this cloud to hide from predators and ambush prey. Some believe it can sense emotions through water vibrations." },
        { name: "Whispering Willow Chub", xp: 65, gold: 35, desc: "It eats the leaves of the weeping willow trees that dip into the river. The fish has a sweet, herbal scent. It is often found sleeping in the shade of hanging branches." }
      ],
      Rare: [
        { name: "Copperback Salmon", xp: 120, gold: 60, desc: "A shimmering salmon variant with a distinct copper glow. Legend says river spirits favor this fish above all others. Its glowing back is visible even in the dimmest waters." },
        { name: "Gear-Tooth Pike", xp: 120, gold: 60, desc: "Its teeth interlock perfectly like the gears of a clock. It bites with mechanical precision and immense pressure. Watch your fingers when unhooking it." },
        { name: "Twinfin Razorperch", xp: 130, gold: 65, desc: "A double-finned perch known for its razor-precise strikes. Many locals call it 'the needle' due to its speed. Skilled anglers treat catching one is a badge of honor." },
        { name: "Mossbeard Sturgeon", xp: 135, gold: 70, desc: "An ancient-looking sturgeon with moss-like tufts growing on its snout. Elders say it remembers every flood and drought in history. Some believe it carries centuries of wisdom." },
        { name: "Lost Coin Salmon", xp: 135, gold: 70, desc: "A salmon with perfectly round, metallic scales on its flanks. Legend says it gathers coins dropped by travelers and sticks them to its body with resin. It rattles when it shakes." },
        { name: "Phantom Dace", xp: 140, gold: 75, desc: "A nearly transparent dace, visible only when the water is perfectly still. Many novices doubt it is even real until they hook one. Those who catch one report feeling strangely serene." },
        { name: "River-Glass Grayling", xp: 145, gold: 75, desc: "A stunning fish that looks like it was blown from delicate glass. It refracts the sunlight into rainbows on the river bottom. It is fragile and must be handled with a soft net." },
        { name: "Dawnscale Carp", xp: 150, gold: 80, desc: "This carp glows softly at sunrise, creating golden halos in the water. It is considered a symbol of new beginnings and hope. It tends to disappear quickly after the sun fully rises." }
      ],
      Epic: [
        { name: "Giant Ripplebass", xp: 300, gold: 150, desc: "Its massive body creates sweeping ripples across the entire river width. Tales speak of it overturning a small canoe decades ago. Anglers train for weeks before attempting to catch one." },
        { name: "Iron-Clad Catfish", xp: 300, gold: 150, desc: "A catfish with skin so thick it feels like iron plating. It breaks wooden rods with its sheer weight. It patrols the deepest holes in the riverbed." },
        { name: "Verdant Guardian Gar", xp: 320, gold: 160, desc: "A moss-colored gar believed to protect the river's plant life. It watches anglers with ancient, knowing eyes. Harming one is said to bring years of misfortune." },
        { name: "Thunderstream Pike", xp: 350, gold: 180, desc: "Appears most frequently during heavy storms. Its body hums with faint electrical vibrations. Some believe it channels the river's ancient thunder spirits." },
        { name: "Whirlpool Watcher Gar", xp: 350, gold: 180, desc: "It swims in the center of dangerous eddies and whirlpools. It uses the spinning water to disorient prey before striking. A master of hydrodynamics." },
        { name: "Goldenwave Trout", xp: 380, gold: 190, desc: "Leaves trails of golden ripples as it swims upstream. Once demanded as a tribute by nobles for its beauty. Said to bring prosperity to those who catch it." },
        { name: "Duskgazer Carp", xp: 400, gold: 200, desc: "Active only during the hour between day and night. Its eyes glow like fading embers in the twilight. Catching one is considered a rite of dusk." }
      ],
      Legendary: [
        { name: "Spiritborne Sturgeon", xp: 800, gold: 400, desc: "Believed to be touched by river spirits, possessing a ghostly aura. The water becomes eerily calm whenever it swims past. Anglers describe feeling overwhelming peace upon encountering it." },
        { name: "The Tinkerer's Pet Koi", xp: 850, gold: 425, desc: "An ancient Koi said to have been fed by the first settler of the region. It has markings that look like tools. It is friendly but incredibly strong." },
        { name: "Ancestor Pike", xp: 900, gold: 450, desc: "A colossal pike said to descend from primordial river beasts. Its scales are marked with ancient scars from battles past. Only the bravest anglers dare attempt to reel it in." },
        { name: "Crystal Current Eel", xp: 950, gold: 475, desc: "An eel made of clear, flowing water held together by magic. It is almost invisible until it moves. It embodies the spirit of the river's flow." },
        { name: "Silver Whisper Trout", xp: 1000, gold: 500, desc: "Said to hum in soft harmonic tones underwater. Its scales glow like moonlight even under the midday sun. Some claim it responds to gentle singing." }
      ],
      Mythic: [
        { name: "River King Aqualon", xp: 2500, gold: 1200, desc: "The revered monarch of Tinker River, rarely seen by mortals. A bass so large its roar echoes like rushing water. Legends say its arrival foretells major events." },
        { name: "Ancient River-Spirit Arapaima", xp: 2600, gold: 1300, desc: "A prehistoric beast that has lived in the Tinker River since before humans arrived. Its scales are as large as dinner plates. It breathes air with a loud gasp that scares locals." },
        { name: "The First Drop Trout", xp: 2900, gold: 1450, desc: "Legend says this trout was born from the very first drop of rain that formed the river. It shines with a blinding, prismatic light. It is the heart of the waterway." },
        { name: "Tinkermaker Carp", xp: 3000, gold: 1500, desc: "An ancient carp believed to craft the river's winding paths. It shifts the currents effortlessly to confuse fishermen. Elders say it appears only to anglers destined for greatness." }
      ],
      Exotic: [
        { name: "Clockwork King Salmon", xp: 9000, gold: 4500, desc: "A salmon with scales that tick and whir. It swims with perfect, mechanical rhythm, never tiring. It is said to power the flow of the river itself." },
        { name: "River-Glass Phoenix", xp: 9500, gold: 4750, desc: "A creature made of living, flowing glass that rises from the river foam. It shatters light into a thousand rainbows. It represents the eternal cycle of the water." }
      ],
      Arcane: [
        { name: "Chronos Time-Carp", xp: 45000, gold: 22500, desc: "A massive carp that exists across all moments of the river's history simultaneously. Catching it feels like reeling in time itself. It holds the memories of every drop of water." }
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
        { name: "Pinecone Perch", xp: 35, gold: 18, desc: "A small fish with tough scales that flare out like a pinecone. It drops from overhanging branches into the water to feed. It is surprisingly thorny to hold." },
        { name: "Fog Minnow", xp: 36, gold: 19, desc: "Its scales are a dull grey that blends perfectly with the mist. Fisherman often hear them splashing but rarely see them clearly. They travel in large, silent schools." },
        { name: "Drizzle Dace", xp: 37, gold: 19, desc: "It thrives during light rain showers, leaping to catch droplets. Its skin ripples like the surface of the lake. It is slippery and hard to hold." },
        { name: "Lake Chub", xp: 38, gold: 20, desc: "A hardy, round chub that thrives in cold water. It is known for its insatiable appetite for floating insects. A standard catch for any lake fisherman." },
        { name: "Slush-Ice Minnow", xp: 39, gold: 21, desc: "Adapts to the coldest parts of the lake by developing a layer of natural antifreeze. It feels cold to the touch. Often used as bait for winter fishing." },
        { name: "Grey Gill Sunfish", xp: 40, gold: 22, desc: "A simple sunfish with gill covers the color of storm clouds. It tends to school near submerged logs and docks. Their meat is surprisingly flaky and sweet." },
        { name: "Grey-Bark Goby", xp: 42, gold: 23, desc: "Camouflaged against the submerged trunks of fallen pines. It remains motionless for hours. You have to look closely to distinguish it from wood." },
        { name: "Stillwater Roach", xp: 44, gold: 24, desc: "It prefers the pockets of the lake where the water is absolutely motionless. It is extremely sensitive to vibrations. Any noise sends it scattering." },
        { name: "Coldwater Snipe", xp: 45, gold: 25, desc: "Known for its long beak-like mouth. It picks insects off the surface of the water with surgical precision. It prefers the chilly center of the lake." }
      ],
      Uncommon: [
        { name: "Shadow Perch", xp: 65, gold: 35, desc: "Darker than the water itself, this perch hunts in the shadows of the boat. It hates direct sunlight and dives deep when hooked. A slippery catch." },
        { name: "Sap-Drip Chub", xp: 65, gold: 35, desc: "Its blood is amber-colored and thick like tree sap. It swims slowly but has incredible stamina. Locals boil it to make a sweet syrup." },
        { name: "Resin Scale Carp", xp: 70, gold: 38, desc: "Its scales secrete a sticky substance similar to tree sap. It smells faintly of fresh pine wood. Handle with gloves to avoid sticky hands." },
        { name: "Overcast Eel", xp: 72, gold: 39, desc: "It only surfaces when the sky is completely grey. Its body matches the color of the cloud cover perfectly. It is a sign of approaching rain." },
        { name: "Mist Drifter Trout", xp: 75, gold: 40, desc: "It swims just below the surface, creating V-shaped wakes in the fog. Catching one requires silence and patience. They are easily spooked by loud noises." },
        { name: "Bark-Back Bass", xp: 80, gold: 42, desc: "Its back pattern perfectly resembles the bark of the surrounding pine trees. A master of camouflage in the shallows. Only sharp-eyed anglers spot them." },
        { name: "Needle-Spine Bass", xp: 82, gold: 44, desc: "Its dorsal fin has hardened into sharp, needle-like spikes. It uses them to wedge itself into crevices. Handle with extreme caution." },
        { name: "Silent Swimmer Pike", xp: 85, gold: 45, desc: "This pike moves without disturbing the water at all. You only know it's there when your rod bends violently. It strikes without a splash." }
      ],
      Fine: [
        { name: "Emerald Eye Bass", xp: 140, gold: 75, desc: "A dark bass with piercing green eyes that seem to glow in the fog. It watches the angler as it is reeled in. Unsettling, but valuable." },
        { name: "Frozen-Eye Walleye", xp: 140, gold: 75, desc: "Its eyes look like cracked marbles or frozen glass. It hunts in the low light of the deep lake. It has excellent night vision." },
        { name: "Frostfin Trout", xp: 150, gold: 80, desc: "Cold to the touch, even after being caught. Its fins look like thin sheets of ice. It prefers the coldest pockets of the lake." },
        { name: "Whispering Willow Catfish", xp: 155, gold: 82, desc: "Its long whiskers trail behind it like willow branches in the wind. It detects prey by sensing the slightest movement in the water. A delicate and beautiful fish." },
        { name: "Timber Eel", xp: 160, gold: 85, desc: "A thick eel that resembles a waterlogged branch. It wraps itself around submerged roots to avoid being pulled up. Great strength is needed to dislodge it." },
        { name: "Lantern Guppy", xp: 170, gold: 90, desc: "A deep-water guppy with a bioluminescent spot on its head. It uses this light to navigate the dark lake bottom. A rare sight in shallow waters." },
        { name: "Evergreen Trout", xp: 175, gold: 92, desc: "It keeps its vibrant green color year-round, even in the depths of winter. It smells like a fresh forest. A prized trophy for its beauty." },
        { name: "Echo Carp", xp: 180, gold: 95, desc: "It makes a low thrumming sound when threatened. In the quiet lake, the sound vibrates through the boat hull. A noisy and heavy catch." }
      ],
      Rare: [
        { name: "Phantom Mist Pike", xp: 350, gold: 180, desc: "Its body is partially translucent, making it look like a swimming cloud. It attacks from the fog without warning. A ghostly predator." },
        { name: "Ghost Whitefish", xp: 350, gold: 180, desc: "A pale whitefish that looks translucent in the fog. Fishermen consider it a wandering spirit of the water. Releasing it is said to grant safe passage." },
        { name: "Needlepoint Pike", xp: 375, gold: 195, desc: "Sharp and dangerous with teeth like needles. It fights with aggressive, jerky movements. Be careful when removing the hook." },
        { name: "Ancient Woodfish", xp: 400, gold: 210, desc: "A lungfish whose scales have hardened into a wood-like texture over decades. It feels more like carving wood than fishing. Extremely durable." },
        { name: "Glacial Rock Sturgeon", xp: 400, gold: 210, desc: "A sturgeon with armor plates that look like granite rocks. It lies dormant on the lake bed for weeks. It is incredibly heavy to lift." },
        { name: "Deepwater Sentinel Char", xp: 425, gold: 220, desc: "A char found only in the center of the lake's deepest point. It is said to guard the secrets of the deep. Rarely surfaces on its own." },
        { name: "Cold-Snap Carp", xp: 440, gold: 225, desc: "It only bites during sudden drops in temperature. Its scales are frosted over. Catching one numbs your fingers instantly." },
        { name: "Vapor Tail Betta", xp: 450, gold: 230, desc: "A wild betta whose tail fin dissolves into a mist-like trail as it swims. It is incredibly difficult to track visually. A prized specimen for collectors." }
      ],
      Epic: [
        { name: "Logger Catfish", xp: 900, gold: 450, desc: "A massive catfish with scars that look like axe marks. It is strong enough to tow a small boat. Legend says it swallowed a lumberjack's axe." },
        { name: "The Old Logger Catfish", xp: 900, gold: 450, desc: "An ancient catfish that lives in the submerged ruins of an old logging camp. It has hooks from decades of fishermen stuck in its lip. It is a survivor." },
        { name: "Mistweaver Serpent", xp: 950, gold: 480, desc: "A long, serpentine eel that moves in figure-eights. Legend says it weaves the fog that covers the lake. Its scales are soft as silk." },
        { name: "Obsidian Bass", xp: 1000, gold: 500, desc: "Jet black and heavy as stone. It sinks immediately when hooked, requiring immense strength to pull up. It feels like reeling in a boulder." },
        { name: "Winter's Breath Gar", xp: 1050, gold: 520, desc: "When it surfaces, it exhales a cloud of freezing mist. Its teeth are made of clear ice. It brings the chill of the deep with it." },
        { name: "Stormcaller Trout", xp: 1050, gold: 520, desc: "Its scales crackle with static electricity. Locals say catching one summons a thunderstorm within the hour. Handle with rubber gloves." },
        { name: "Gloom Gazer Walleye", xp: 1100, gold: 550, desc: "A walleye with huge eyes adapted for pitch blackness. It stares into the soul of those who catch it. It hunts in the absolute dark." }
      ],
      Legendary: [
        { name: "Pine Spirit Sturgeon", xp: 2500, gold: 1200, desc: "A majestic sturgeon with fins that resemble pine boughs. It smells of clean winter air and ancient magic. It grows to immense sizes." },
        { name: "Spirit of the Fjord Salmon", xp: 2600, gold: 1250, desc: "A ghostly salmon that glows with a faint blue light. It is said to guide lost souls across the misty lake. It swims with a supernatural grace." },
        { name: "Fog Sovereign Pike", xp: 2750, gold: 1350, desc: "When this pike breaches, the fog thickens instantly. It commands the weather of the lake. A terrifying predator of the mist." },
        { name: "The Silent Watcher Bass", xp: 2900, gold: 1450, desc: "A bass that never makes a sound, even when splashing. It watches from the fog banks with knowing eyes. It has existed since the lake was formed." },
        { name: "Pale Lady Koi", xp: 3000, gold: 1500, desc: "A hauntingly beautiful, pale koi. Sailors say it sings a silent song that lures equipment into the water. Its scales are pure porcelain white." }
      ],
      Mythic: [
        { name: "Mistwalker Catfish", xp: 7000, gold: 3500, desc: "A creature of legend that walks on the surface of the water using massive fin-legs. To catch it is to master the lake itself. It defies physics." },
        { name: "Yeti-Fur Trout", xp: 7200, gold: 3600, desc: "A legendary trout covered in thick white fur to survive the mystical cold. It is warm to the touch. It is a creature from folklore made real." },
        { name: "The Unmelting Ice Sunfish", xp: 7800, gold: 3900, desc: "A sunfish made entirely of magical ice that never melts, even in the sun. It radiates a cold so intense it can freeze the water around your boat." },
        { name: "Silent Leviathan", xp: 8000, gold: 4000, desc: "A massive, silent alligator gar that occupies the entire deep trench. It has no predators, only time. Its armor is impenetrable." }
      ],
      Exotic: [
        { name: "Eternal Frost Leviathan", xp: 24000, gold: 12000, desc: "A massive creature encased in permafrost that never melts. It brings a unnatural winter wherever it swims. Its eyes are frozen nebulas." },
        { name: "Fog-Weaver Dragon", xp: 25000, gold: 12500, desc: "A serpentine dragon that exhales the thick fog covering the lake. It moves silently through the air and water alike. It is the spirit of the mist." }
      ],
      Arcane: [
        { name: "Silent Void Leviathan", xp: 120000, gold: 60000, desc: "A terrifying leviathan formed from the absolute absence of sound. It creates a void in the lake where nothing moves and nothing lives. To catch it is to catch the quiet of the grave." }
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
        { name: "Mosquito Larva Eater", xp: 80, gold: 40, desc: "A tiny fish that acts as natural pest control, devouring mosquito larvae by the hundreds. Locals value it highly for keeping the swarm at bay." },
        { name: "Mud Lungfish", xp: 85, gold: 42, desc: "An amphibious lungfish that can breathe air for short periods. It often flops onto mud banks to escape predators. Slippery and hard to hold." },
        { name: "Brown-Water Tetra", xp: 85, gold: 42, desc: "Its scales are a muddy brown that perfectly matches the swamp water. It travels in tight schools for protection. It vanishes the moment it stops moving." },
        { name: "Swamp Guppy", xp: 90, gold: 45, desc: "Dull green and slow-moving. It survives by blending in with floating algae mats. A common sight in the stagnant pools." },
        { name: "Silt-Skin Goby", xp: 90, gold: 45, desc: "Covered in a layer of fine silt that acts as camouflage. It buries itself in the soft mud when threatened. You might catch one by scooping the mud." },
        { name: "Brackish Darter", xp: 95, gold: 48, desc: "A darter that thrives where fresh water meets salt. It moves in jerky, unpredictable patterns. Its eyes are adapted to murky water." },
        { name: "Humid-Air Minnow", xp: 95, gold: 48, desc: "Adapted to the stifling humidity, it can leap from the water to catch low-flying insects. It has powerful pectoral fins for short bursts of flight." },
        { name: "Decay-Feeder Roach", xp: 98, gold: 49, desc: "It feeds on rotting plant matter at the bottom of the swamp. While unpleasant, it plays a vital role in keeping the waterways clear of debris." },
        { name: "Vine Tail Eel", xp: 100, gold: 50, desc: "An eel with a tail resembling a submerged vine. It uses this to anchor itself against the tide. Masters of camouflage." }
      ],
      Uncommon: [
        { name: "Mosquito Eater Betta", xp: 160, gold: 80, desc: "A wild betta prized by locals for keeping the insect population down. It leaps high out of the water to catch prey. Flashy and aggressive." },
        { name: "Vine-Climber Perch", xp: 160, gold: 80, desc: "Using specialized fins, it can haul itself up low-hanging vines to escape predators in the water. It can survive out of water for hours." },
        { name: "Tangled Eel", xp: 170, gold: 85, desc: "An eel with a body that is naturally knotted and twisted. This shape allows it to navigate tight root systems. Very difficult to unhook." },
        { name: "Humming Catfish", xp: 180, gold: 90, desc: "Produces a low hum that vibrates the water. Swarms of them create a sound like chanting monks. They feed in the twilight." },
        { name: "Bog-Gas Guppy", xp: 180, gold: 90, desc: "It inflates its body with swamp gas to float effortlessly. It glows with a faint, eerie yellow light. Popping it releases a foul smell." },
        { name: "Sludge Prowler Sole", xp: 190, gold: 95, desc: "A flat sole that buries itself in the swamp floor. It waits for days for a meal to swim by. Covered in a thick mucus layer." },
        { name: "Mud-Brick Carp", xp: 195, gold: 98, desc: "Its scales are rectangular and hard, resembling baked mud bricks. It builds nests by piling mud with its head. It is stubborn and hard to reel in." },
        { name: "Jade Scale Carp", xp: 200, gold: 100, desc: "Covered in vibrant green scales that look like polished jade stones. A favorite of jewelry makers. It gleams in the filtered swamp light." }
      ],
      Fine: [
        { name: "Voodoo Tetra", xp: 350, gold: 175, desc: "Markings on its side resemble ritualistic symbols. Some say catching it invites the attention of swamp witches. A mysterious little fish." },
        { name: "Voodoo Doll Puffer", xp: 350, gold: 175, desc: "Its body is stitched together with rough skin that resembles burlap. Its spines look like pins. It is said to be a cursed object given life." },
        { name: "Root-Rot Bass", xp: 375, gold: 188, desc: "It secretes a toxin that decays wood instantly. Fishermen hate it because it ruins their boats. Handle with extreme care." },
        { name: "Glow-Moss Carp", xp: 400, gold: 200, desc: "Symbiotic moss grows on its back, glowing softly in the swamp twilight. It helps illuminate the dark waters for other fish." },
        { name: "Swamp-Light Lanternfish", xp: 400, gold: 200, desc: "A freshwater relative of the deep-sea angler. It lures insects with a bioluminescent dangle. It hunts in the darkest parts of the mangrove roots." },
        { name: "Whisper Fin Pike", xp: 425, gold: 212, desc: "Its fins flutter rapidly, creating a sound like whispering voices. Spooky to catch alone at night. It hunts by sound vibration." },
        { name: "Root-Knot Eel", xp: 440, gold: 220, desc: "It ties itself into impossible knots to secure itself against currents or predators. Unraveling it is a puzzle. It has tough, bark-like skin." },
        { name: "Bog King Cichlid", xp: 450, gold: 225, desc: "The dominant predator of the shallow mudflats. It is aggressive and territorial. It builds nests out of mud and bone." }
      ],
      Rare: [
        { name: "Shadow Marsh Bass", xp: 800, gold: 400, desc: "A black bass that seems to absorb light. It hides in the deepest shadows of the mangrove roots. Almost invisible until it strikes." },
        { name: "Witch's Brew Bass", xp: 800, gold: 400, desc: "Its scales are a swirling mix of purple and green, looking like a bubbling potion. It smells of sulfur and magic. Eating it causes strange dreams." },
        { name: "Orchid Betta", xp: 850, gold: 425, desc: "Beautifully colored pink and purple to mimic swamp orchids. A master of disguise. Collectors pay a high price for vibrant specimens." },
        { name: "Ancient Mudskipper", xp: 900, gold: 450, desc: "A massive version of the common mudskipper. It can walk on land for miles to find new pools. It has legs stronger than a man's arm." },
        { name: "Alligator-Snapping Gar", xp: 900, gold: 450, desc: "A terrifying hybrid with the jaw strength of a snapping turtle and the speed of a gar. It can bite through thick boots. A true monster of the marsh." },
        { name: "Toxin Gill Gar", xp: 950, gold: 475, desc: "Its gills puff out bright red clouds of warning. The toxin can numb a limb for hours. Handle with thick leather gloves." },
        { name: "Ancient Peat Sturgeon", xp: 950, gold: 475, desc: "Preserved by the bog waters, this sturgeon looks almost mummified but is very much alive. It moves with a slow, prehistoric grace." },
        { name: "Maze Runner Eel", xp: 1000, gold: 500, desc: "This eel memorizes the entire layout of the swamp. It will run your line through roots to break it intentionally. Highly intelligent." }
      ],
      Epic: [
        { name: "Root Mother Carp", xp: 2000, gold: 1000, desc: "A massive, slow-moving carp that looks like a floating log. Actual roots grow from its scales. It supports an entire ecosystem on its back." },
        { name: "The Green Man's Pet Arapaima", xp: 2000, gold: 1000, desc: "A gargantuan fish covered in algae and vines. It is said to be the favored pet of the swamp's guardian spirit. It protects the waterways." },
        { name: "Swampfire Eel", xp: 2150, gold: 1075, desc: "A rare eel that generates intense heat. The water boils around it when it thrashes. It glows with an internal orange fire." },
        { name: "Phantom Croc-Gar", xp: 2300, gold: 1150, desc: "Half-gar, half-reptile appearance. It has armored scales that can snap light fishing lines. A terrifying ambush predator." },
        { name: "Pestilence Pike", xp: 2400, gold: 1200, desc: "A diseased-looking fish that radiates a sickly green aura. Where it swims, the plants die. It is the physical embodiment of swamp fever." },
        { name: "Twilight Lotus Koi", xp: 2400, gold: 1200, desc: "A koi that blooms open like a flower when threatened. Incredibly rare and fragile. It smells of sweet perfume." },
        { name: "Gas-Bubble Puffer", xp: 2500, gold: 1250, desc: "It inflates with explosive swamp gas to float. Be careful not to puncture it, or it will pop violently. Volatile and dangerous." }
      ],
      Legendary: [
        { name: "Grove Keeper Catfish", xp: 5000, gold: 2500, desc: "An ancient entity that protects the heart of the swamp. Vines move to clear a path for it. It has whiskers as long as fishing rods." },
        { name: "Heart of the Swamp Discus", xp: 5200, gold: 2600, desc: "A pulsing, red discus fish that beats like a heart. It pumps life energy into the surrounding waters. To catch it is to hold the lifeblood of the marsh." },
        { name: "Golden Alligator Gar", xp: 5500, gold: 2750, desc: "An armored prehistoric beast with scales of gold. It has survived since the dawn of the swamp. Its armor deflects harpoons." },
        { name: "The Ever-Rot Catfish", xp: 5800, gold: 2900, desc: "A catfish composed entirely of decaying matter, yet seemingly immortal. It smells of ancient earth. It consumes everything in its path." },
        { name: "Wisp-Light Tetra", xp: 6000, gold: 3000, desc: "A giant tetra that glows with a hypnotic blue light. Following it usually leads anglers into quicksand. A beautiful trap." }
      ],
      Mythic: [
        { name: "Hydra Eel", xp: 15000, gold: 7500, desc: "A monstrosity with three heads. It fights with the strength of three fish and the cunning of a demon. If one head sleeps, the others watch." },
        { name: "Gaia's Root Eel", xp: 15500, gold: 7750, desc: "An eel that is actually a sentient root tip of the world tree, reaching into the swamp. It moves with the slow, unstoppable force of nature itself." },
        { name: "The Primordial Ooze Blobfish", xp: 17500, gold: 8750, desc: "A shifting mass of slime that predates complex life. It can reshape itself at will. It is the raw material of creation, bubbling up from the deep." },
        { name: "Moloch The Bog-Catfish", xp: 18000, gold: 9000, desc: "A creature formed of mud, roots, and ancient magic. To catch it is to wrestle the swamp itself. It swallows boats whole." }
      ],
      Exotic: [
        { name: "Plague-Bringer Pike", xp: 54000, gold: 27000, desc: "A horrifying pike that drips pure virulence. The water turns black around it. It is the embodiment of the swamp's darker, decaying nature." },
        { name: "Root-Titan Turtle", xp: 56000, gold: 28000, desc: "A turtle the size of an island. Its shell is a living mangrove forest. It moves so slowly that trees grow and die on its back before it crosses the swamp." }
      ],
      Arcane: [
        { name: "Avatar of Decay Serpent", xp: 270000, gold: 135000, desc: "The physical manifestation of rot and rebirth in the form of a massive serpent. It is a mass of writhing roots, mud, and ancient bones. It is the cycle of life and death in the swamp, unending and hungry." }
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
        { name: "Palm-Leaf Flounder", xp: 132, gold: 66, desc: "Its body is shaped and colored exactly like a fallen palm leaf drifting in the current. It floats on its side to fool predators." },
        { name: "Tide Runner Mullet", xp: 135, gold: 68, desc: "Moves in with the high tide. Small, fast, and silver. A staple bait for larger predators and a common meal for locals." },
        { name: "Drift-Seed Minnow", xp: 138, gold: 69, desc: "Resembles the floating seeds of coastal mangroves. It bobs on the surface, waiting for insects to land near it." },
        { name: "Coral Goby", xp: 140, gold: 70, desc: "A colorful little fish that hides in rock crevices near the shore. Very territorial despite its small size. It nips at toes." },
        { name: "White Sand Goby", xp: 145, gold: 72, desc: "A pale goby that buries itself instantly in the white sand when threatened. You can only see its two bulging eyes sticking out." },
        { name: "Salt Whisker Catfish", xp: 150, gold: 75, desc: "A type of saltwater catfish with stinging whiskers. Watch your hands when unhooking. They grunt when caught." },
        { name: "Azure Damsel", xp: 155, gold: 77, desc: "A tiny, bright blue fish that is incredibly brave. It will charge at divers and fish ten times its size to protect its coral patch." },
        { name: "Foam Skipper", xp: 158, gold: 79, desc: "It rides the sea foam generated by crashing waves. It is constantly moving and jumping. Hard to track in the surf." },
        { name: "Blue Stripe Snapper", xp: 160, gold: 80, desc: "A common schooling fish recognizable by the horizontal neon blue stripe. Good eating and easy to catch." }
      ],
      Uncommon: [
        { name: "Glass Shell Crab", xp: 250, gold: 125, desc: "Not technically a fish, but it takes the bait. Its shell is transparent and fragile. You can see its heart beating." },
        { name: "Parrot-Beak Wrasse", xp: 260, gold: 130, desc: "Its mouth is a hard beak used for crunching coral. It is vividly colored in pinks and greens. A noisy eater." },
        { name: "Surf Glider Flying Fish", xp: 270, gold: 135, desc: "Known to jump out of waves and glide for meters. Catching one mid-air is a skill. They flee from tuna." },
        { name: "Sea-Grape Puffer", xp: 280, gold: 140, desc: "A small pufferfish that looks like a cluster of green sea grapes. It hides in seaweed beds. Do not eat." },
        { name: "Reef Doctor Wrasse", xp: 290, gold: 145, desc: "Other fish let this small creature clean their parasites. It is universally respected in the reef. Harming one is bad luck." },
        { name: "Tide-Pool Blenny", xp: 300, gold: 150, desc: "It can survive in tiny pools of water during low tide. It can even hop across dry rocks to find a new home." },
        { name: "Needle Nose Gar", xp: 310, gold: 155, desc: "Long, thin, and silver. It strikes bait sideways with incredible speed. Its teeth are serrated." },
        { name: "Sun-Ray Flounder", xp: 320, gold: 160, desc: "Its back has a pattern that looks like a sunburst. Often found sunbathing in shallows. It buries itself in sand." }
      ],
      Fine: [
        { name: "Pearl Oyster", xp: 550, gold: 275, desc: "A heavy catch that clamps onto the line. Sometimes contains a small pearl, increasing its value to traders." },
        { name: "Barracuda Scout", xp: 560, gold: 280, desc: "Smaller than the Razor Barracuda, but travels in packs. Where you catch one, there are likely ten more. Aggressive and fast." },
        { name: "Azure Fin Tuna", xp: 575, gold: 288, desc: "A beautiful fish deeply saturated with blue pigment. Used to make high-quality dyes. It swims in deep water." },
        { name: "Sapphire Needlefish", xp: 590, gold: 295, desc: "Its bones and flesh are a vibrant blue-green color. It leaps over floating debris. Its beak is sharp as a needle." },
        { name: "Razor Barracuda", xp: 600, gold: 300, desc: "Dangerous and aggressive. It has been known to bite through steel leaders. It flashes like a silver knife." },
        { name: "Cloud-Puff Puffer", xp: 625, gold: 312, desc: "Inflates into a white ball that looks like a cloud. Do not eat; highly poisonous. It floats on the surface." },
        { name: "Trade-Wind Trevally", xp: 640, gold: 320, desc: "Migrates using the ocean currents. It is a strong fighter that uses its broad side to resist the reel. A favorite of sport fishermen." },
        { name: "Current Rider Jack", xp: 650, gold: 325, desc: "A muscular amberjack that swims against the strongest riptides for fun. It fights fiercely on the line." }
      ],
      Rare: [
        { name: "Royal King Crab", xp: 1200, gold: 600, desc: "Massive, armored, and angry. It requires a net to haul onto the boat. Its claws can snap a broomstick." },
        { name: "Sunken Coin Discus", xp: 1220, gold: 610, desc: "A flat, gold-colored fish that inhabits shipwrecks. It looks like a doubloon lying in the sand. Treasure hunters often spot them." },
        { name: "Prism Scale Wrasse", xp: 1250, gold: 625, desc: "Refracts sunlight into rainbows under the water. A stunning trophy for any captain. It changes colors when excited." },
        { name: "Golden-Tail Tuna", xp: 1300, gold: 650, desc: "A powerful swimmer with a tail of gold. It never stops moving, even when asleep. Fast and enduring." },
        { name: "Living Coral Grouper", xp: 1350, gold: 675, desc: "Its skin looks exactly like a brain coral. It sits perfectly still and inhales prey that swims too close. A master of ambush." },
        { name: "Abyss Peeper Angler", xp: 1400, gold: 700, desc: "A fish from the deep that wandered too close to shore. It looks out of place in the bright water. Light hurts its eyes." },
        { name: "Horizon Chaser Mahi", xp: 1450, gold: 725, desc: "A vibrant green and yellow fish that leaps towards the horizon. It is the fastest fish in the Sapphire Coast. Catching one is a blur." },
        { name: "Siren Mirror Pomfret", xp: 1500, gold: 750, desc: "Its scales are so reflective they act like a mirror. Legend says it confuses predators with their own reflection." }
      ],
      Epic: [
        { name: "Iron Jaw Shark", xp: 3000, gold: 1500, desc: "An old shark with a jaw full of rusted hooks from failed capture attempts. It knows every trick in the book." },
        { name: "Leviathan's Tooth Barracuda", xp: 3100, gold: 1550, desc: "An ancient barracuda that has grown to a monstrous size. It hunts dolphins and small whales. Its teeth are the size of daggers." },
        { name: "Tsunami Carp", xp: 3150, gold: 1575, desc: "A massive saltwater carp said to be born from the energy of a tidal wave. It surges with incredible power." },
        { name: "Coral Monarch Grouper", xp: 3300, gold: 1650, desc: "A vibrant, multi-colored grouper that commands the reef. Smaller fish bow as it passes. It eats sharks." },
        { name: "Star-Fall Ray", xp: 3400, gold: 1700, desc: "A stingray with glowing white dots resembling the night sky on its back. It glides with celestial grace." },
        { name: "The Blue Ghost Marlin", xp: 3450, gold: 1725, desc: "A legendary marlin that appears only in the deep sapphire waters. It fades in and out of view like a spirit. A phantom of the open sea." },
        { name: "Deep Blue Marlin", xp: 3500, gold: 1750, desc: "The ultimate sport fish. It leaps high into the air, challenging the gods of the sea. A true test of skill." }
      ],
      Legendary: [
        { name: "Tidecaller Oarfish", xp: 8000, gold: 4000, desc: "A serpent so large its movements control the tides. Fishermen pray to it for safe passage. It spans the horizon." },
        { name: "Siren's Tear Jellyfish", xp: 8200, gold: 4100, desc: "A jellyfish of indescribable beauty that glows with a sorrowful blue light. Its sting causes visions of lost loves. It drifts on the ocean currents." },
        { name: "Sunken Guard Swordfish", xp: 8500, gold: 4250, desc: "Clad in natural armor that looks like golden plate mail. It fights with military precision. A relic of a lost war." },
        { name: "Guardian of the Deep Shark", xp: 8800, gold: 4400, desc: "A massive great white shark with eyes that glow with ancient wisdom. It protects the balance of the ocean. It attacks only those who disrespect the sea." },
        { name: "Oceanus Spirit Ray", xp: 9000, gold: 4500, desc: "A manifestation of the ocean's will. It is made of living water and foam. It dissolves if kept out of water too long." }
      ],
      Mythic: [
        { name: "Kraken Spawn Squid", xp: 22000, gold: 11000, desc: "Only a baby, but still capable of crushing a boat. Tentacles everywhere. It inks the whole sea black." },
        { name: "Atlantis Architect Turtle", xp: 23000, gold: 11500, desc: "A colossal turtle with ruins of an ancient civilization on its shell. It swims slowly through the ages. It is a moving island of history." },
        { name: "The World Serpent's Scale Oarfish", xp: 24000, gold: 12000, desc: "A single living scale of Jormungandr that has taken the form of a fish. It radiates immense power. Holding it feels like holding an earthquake." },
        { name: "Poseidon's Chariot Seahorse", xp: 25000, gold: 12500, desc: "A gigantic Seahorse that thunders through the waves. It creates storms where it gallops. The steed of a god." }
      ],
      Exotic: [
        { name: "Tidal-Wave Titan", xp: 75000, gold: 37500, desc: "A fish so massive its dorsal fin creates tsunamis. It embodies the unstoppable force of the crashing surf. It roars like the ocean." },
        { name: "Sapphire-Star Whale", xp: 80000, gold: 40000, desc: "Its skin is encrusted with living sapphires that shine brighter than the sun. It sings a song that calms the roughest seas. A jewel of the ocean." }
      ],
      Arcane: [
        { name: "Ocean Heart Jellyfish", xp: 375000, gold: 187500, desc: "The living core of the Sapphire Coast taking the form of a jellyfish. A pulsing, blue creature that dictates the flow of all currents. It is pure, concentrated hydro-energy." }
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
        { name: "Limestone Leach", xp: 205, gold: 102, desc: "A small parasite that attaches itself to limestone rocks, grinding them down for minerals. It leaves small circular marks on the cavern walls." },
        { name: "Pebble Crab", xp: 210, gold: 105, desc: "Its shell looks exactly like a grey cavern rock. You only know it's alive when it pinches you. Hides in plain sight." },
        { name: "Cave Cricket Eater", xp: 215, gold: 107, desc: "A small fish that waits near the water's edge for cave crickets to fall in. It has a surprisingly large mouth for its size." },
        { name: "Drip Catcher Minnow", xp: 220, gold: 110, desc: "Hovers under stalactites waiting for minerals to drip into the water. Its mouth is upturned and wide." },
        { name: "Dark-Water Dace", xp: 225, gold: 112, desc: "Its scales are a deep midnight blue, making it invisible in the dark water. Only its movement gives it away." },
        { name: "Pale Goby", xp: 235, gold: 118, desc: "A ghost-white fish that blends into the limestone bottom. It stays perfectly still for hours." },
        { name: "Stalagmite Goby", xp: 240, gold: 120, desc: "It perches on underwater stalagmites, watching for prey. Its skin is rough and bumpy like rock." },
        { name: "Fossil-Fin Minnow", xp: 245, gold: 122, desc: "An ancient species that hasn't changed in millions of years. Its fins look bony and primitive." },
        { name: "Echo Minnow", xp: 250, gold: 125, desc: "Travels in swarms that create a unique clicking sound to navigate the dark. They react to loud noises." }
      ],
      Uncommon: [
        { name: "Crystal Fin Tetra", xp: 400, gold: 200, desc: "Its fins have calcified into sharp, crystal-like structures. Beautiful but sharp. Handle with gloves." },
        { name: "Miner's Canary Fish", xp: 410, gold: 205, desc: "A bright yellow fish that is extremely sensitive to water quality. Miners used to keep them to test for toxins." },
        { name: "Bat-Wing Ray", xp: 425, gold: 212, desc: "A ray that mimics the shape of a bat. It glides silently through the dark water. Often mistaken for a falling rock." },
        { name: "Rock-Biter Eel", xp: 440, gold: 220, desc: "It has powerful jaws designed to crush rocks to get at the worms inside. It grinds its teeth loudly." },
        { name: "Glow-Worm Trout", xp: 450, gold: 225, desc: "Its stomach glows faintly from all the bioluminescent worms it eats. Easy to spot in the dark." },
        { name: "Slate Scale Carp", xp: 475, gold: 238, desc: "Heavy and armored with grey slate. It sinks like a rock when it stops swimming. Strong bottom feeder." },
        { name: "Velvet Batfish", xp: 490, gold: 245, desc: "Its skin is covered in a soft, black fuzz that feels like velvet. It absorbs all light, appearing as a void in the water." },
        { name: "Shadow Leech", xp: 500, gold: 250, desc: "A large, parasitic fish. It tries to latch onto the boat hull or unsuspecting swimmers." }
      ],
      Fine: [
        { name: "Stalactite Bass", xp: 800, gold: 400, desc: "Hangs vertically in the water, mimicking a stone formation. It drops on prey from above." },
        { name: "Iron-Vein Gar", xp: 820, gold: 410, desc: "Visible streaks of iron run through its scales. It is incredibly heavy and smells of rust. Magnets will stick to it." },
        { name: "Quartz Eye Catfish", xp: 850, gold: 425, desc: "Although blind, its eye sockets are filled with raw quartz crystals. It senses magnetic fields." },
        { name: "Miner's Bane Pike", xp: 875, gold: 438, desc: "Known to steal tools and shiny objects dropped by miners. It has a collection in its nest." },
        { name: "Sulfur Spring Bass", xp: 880, gold: 440, desc: "Lives near volcanic vents deep in the grotto. It is warm to the touch and smells of sulfur. Its eyes glow orange." },
        { name: "Deep Echo Eel", xp: 900, gold: 450, desc: "It emits a sonic pulse that can stun small prey. You can feel the vibration in the rod." },
        { name: "Gem-Eye Guppy", xp: 920, gold: 460, desc: "A rare guppy with eyes that look like multifaceted gemstones. They are prized by collectors for their beauty." },
        { name: "Luminous Carp", xp: 950, gold: 475, desc: "The only source of light in the deep grotto. It glows with a warm, yellow light. A beacon in the dark." }
      ],
      Rare: [
        { name: "Obsidian Snapper", xp: 1800, gold: 900, desc: "Scales as black and sharp as volcanic glass. It cuts through nets easily." },
        { name: "Subterranean Swordtail", xp: 1850, gold: 925, desc: "Its tail is a long, jagged spike of bone. It uses it to defend against predators in the cramped tunnels. A fierce fighter." },
        { name: "Gem Hoarder Crab", xp: 1900, gold: 950, desc: "It glues raw gemstones to its shell for camouflage. Very valuable to jewelers." },
        { name: "Crystal-Back Crawdad", xp: 1950, gold: 975, desc: "A giant crawdad with a massive crystal growing out of its back. It is heavy and slow, but its pinch is crushing." },
        { name: "Ancient Salamander", xp: 2000, gold: 1000, desc: "Not a fish, but a relic from a forgotten age. It has six legs and breathes water. A living fossil." },
        { name: "Whispering Geode Puffer", xp: 2100, gold: 1050, desc: "A round fish with a rough exterior. When opened, its insides sparkle like a geode." },
        { name: "Forgotten Idol Fish", xp: 2150, gold: 1075, desc: "A fish shaped like a strange, ancient idol. It feels like carved stone. Touching it gives you a sense of unease." },
        { name: "Silent Monk Fish", xp: 2200, gold: 1100, desc: "A fish that sits perfectly still for years. It is said to be meditating. Moves only when necessary." }
      ],
      Epic: [
        { name: "Crystal Golem Fish", xp: 4500, gold: 2250, desc: "Is it alive? Is it magic? It seems made entirely of animated crystal. Hard as diamond." },
        { name: "The Rock-Crusher Crab", xp: 4600, gold: 2300, desc: "A crab with claws massive enough to crush boulders. It excavates new tunnels in the grotto. It is a living siege engine." },
        { name: "Subterranean Shark", xp: 4750, gold: 2375, desc: "Pale, blind, and terrifying. It hunts by sensing the heartbeat of the angler. The apex predator of the dark." },
        { name: "Magma Vein Trout", xp: 5000, gold: 2500, desc: "Found near thermal vents. Its veins glow orange with heat. It boils the water around it." },
        { name: "Magma-Core Salamander", xp: 5100, gold: 2550, desc: "A salamander that lives in the lava flows that leak into the grotto. Its skin is molten rock. Do not touch with bare hands." },
        { name: "Void Gazer Catfish", xp: 5250, gold: 2625, desc: "It stares into the abyss, and the abyss stares back. Dark energy radiates from it." },
        { name: "Stoneheart Gar", xp: 5500, gold: 2750, desc: "A fish with skin as hard as granite. It protects the secrets of the grotto. Arrows bounce off it." }
      ],
      Legendary: [
        { name: "Diamondback Sturgeon", xp: 12000, gold: 6000, desc: "A creature made of living diamond. It is virtually indestructible and worth a fortune." },
        { name: "Spirit of the Mountain Carp", xp: 12500, gold: 6250, desc: "A carp made of pure earth energy. It swims through the rock as if it were water. It is the guardian of the mountain's roots." },
        { name: "Mountain Soul Ray", xp: 13000, gold: 6500, desc: "A massive, glowing entity that embodies the crushing weight of the earth. It moves through rock like water." },
        { name: "The Blind King Catfish", xp: 13500, gold: 6750, desc: "A catfish the size of a bus, blind and ancient. Its whiskers can sense thoughts. It rules the darkness with absolute authority." },
        { name: "Onyx Leviathan Eel", xp: 14000, gold: 7000, desc: "A shadow that moves. It swallows light and hope. The ultimate challenge of the dark." }
      ],
      Mythic: [
        { name: "Crystal Dragon Serpent", xp: 35000, gold: 17500, desc: "A serpentine dragon with scales of pure sapphire. It breathes blue fire underwater." },
        { name: "Behemoth of the Deep Rockfish", xp: 36000, gold: 18000, desc: "A rockfish so large it is mistaken for an island. When it wakes, earthquakes follow. It has slept for eons." },
        { name: "The Eternal Geode Turtle", xp: 38000, gold: 19000, desc: "A turtle whose shell is a universe of crystals. Inside it, time does not exist. It carries the secrets of the earth's formation." },
        { name: "Earthshaker Whale", xp: 40000, gold: 20000, desc: "When this massive beast moves, the entire mountain trembles. It is the heart of the grotto." }
      ],
      Exotic: [
        { name: "Molten-Core Monarch", xp: 120000, gold: 60000, desc: "A fish made of flowing lava held together by magnetic fields. It swims through rock and water indifferently. It radiates the heat of the planet's core." },
        { name: "Diamond-Geode Dragon", xp: 125000, gold: 62500, desc: "A dragon with scales of flawless diamond. It is blind, but senses the vibration of the earth. It guards the deepest treasures of the grotto." }
      ],
      Arcane: [
        { name: "World-Root Serpent", xp: 600000, gold: 300000, desc: "The terminal end of the root that holds the world together, appearing as a colossal serpent. Catching it shakes the foundations of the mountain. It is ancient, immobile, and eternal." }
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
        { name: "Arctic Char Fry", xp: 305, gold: 152, desc: "A young char that hides in the freezing shallows. It is vibrant orange, a stark contrast to the icy blue water." },
        { name: "Blue Lip Cod", xp: 310, gold: 155, desc: "A hardy fish with thick fat reserves. Its lips are a permanent frostbitten blue. Delicious in stew." },
        { name: "Ice-Chip Tetra", xp: 315, gold: 157, desc: "Tiny and flat, like a chip of ice. It schools in the thousands near the surface. They sparkle in the winter sun." },
        { name: "Slush Puppy Sculpin", xp: 320, gold: 160, desc: "A small, soft-bodied fish that thrives in the semi-frozen slush on the water's surface." },
        { name: "Polar Plankton Eater", xp: 325, gold: 162, desc: "A filter feeder that drifts with the currents. It consumes the rich plankton blooms under the ice. Essential to the ecosystem." },
        { name: "Snowflake Flounder", xp: 330, gold: 165, desc: "Its skin pattern is a unique geometric fractal, perfectly mimicking falling snow. Camouflage expert." },
        { name: "Frost-Skin Cod", xp: 335, gold: 167, desc: "Its skin is rough and cold, feeling like sandpaper made of ice. It is tough and hard to clean." },
        { name: "Glacier Melt Goby", xp: 338, gold: 169, desc: "Found exclusively where freshwater glaciers melt into the saltwater fjord. It tolerates extreme salinity changes." },
        { name: "Glacier Mite (Parasite)", xp: 340, gold: 170, desc: "A parasitic fish that attaches itself to the underside of icebergs. It eats algae and ice." }
      ],
      Uncommon: [
        { name: "Thermal Seeker Trout", xp: 600, gold: 300, desc: "It can sense body heat from yards away. It swarms around boat engines for warmth." },
        { name: "Thermal Vent Shrimp", xp: 610, gold: 305, desc: "A large shrimp that huddles around deep-sea vents. It glows red from the heat. A warm treat in a cold place." },
        { name: "Frost Bite Eel", xp: 625, gold: 312, desc: "Its bite freezes the wound instantly. Handle with thick leather gloves to avoid frostbite." },
        { name: "Snow-Camouflage Flounder", xp: 640, gold: 320, desc: "Unlike the Snowflake Flounder, this one turns pure white to blend in with the snow-covered seabed. Invisible to predators." },
        { name: "Winter Coat Bass", xp: 650, gold: 325, desc: "It has developed a layer of fuzz on its scales that resembles white fur. Keeps it warm in zero degrees." },
        { name: "Hailstone Crab", xp: 675, gold: 338, desc: "Its shell is white, round, and incredibly hard. It mimics a large hailstone to avoid birds." },
        { name: "Icicle Dart", xp: 690, gold: 345, desc: "A fast-moving fish that looks like a thrown icicle. It impales small prey with its sharp nose." },
        { name: "Aurora Guppy", xp: 700, gold: 350, desc: "When it swims, it leaves a faint trail of green and purple light. Beautiful in the polar night." }
      ],
      Fine: [
        { name: "Crystal Spine Snapper", xp: 1200, gold: 600, desc: "Its dorsal fins are made of sharp, clear ice crystals that regrow if broken. Very sharp." },
        { name: "Deep-Fjord Haddock", xp: 1220, gold: 610, desc: "A large haddock that lives in the crushing darkness of the fjord's bottom. It has huge eyes to see in the dark." },
        { name: "Deep Freeze Tuna", xp: 1250, gold: 625, desc: "It swims in the deepest, coldest currents. Its meat is considered a delicacy served frozen." },
        { name: "Mammoth Sculpin", xp: 1300, gold: 650, desc: "An ugly, prehistoric-looking fish with tusks. It looks like it belongs in the Ice Age." },
        { name: "Frozen-Fin Pike", xp: 1320, gold: 660, desc: "A pike frozen in a block of ice that somehow still swims. It is a living popsicle. It melts if kept out of water too long." },
        { name: "Polar Ray", xp: 1350, gold: 675, desc: "A pure white stingray that buries itself in underwater snow drifts. Invisible hunter." },
        { name: "Ice-Sheet Ray", xp: 1380, gold: 690, desc: "A flat ray that mimics the texture of floating ice. It drifts on the surface to catch seabirds. Clever and dangerous." },
        { name: "Shiver Scale Pike", xp: 1400, gold: 700, desc: "It vibrates constantly to generate body heat, creating ripples in the water. Aggressive striker." }
      ],
      Rare: [
        { name: "Cryo Phoenix Fish", xp: 2500, gold: 1250, desc: "A brilliant blue fish with fins that look like wings. It leaps from the water to glide in the freezing wind." },
        { name: "Cryo-Stasis Carp", xp: 2600, gold: 1300, desc: "A carp that can freeze itself solid to survive the winter and thaw out in spring. It is immortal in its frozen state." },
        { name: "Ice Forged Pike", xp: 2650, gold: 1325, desc: "Its scales are as hard as steel plate. It shatters standard fishing hooks. Needs a diamond lure." },
        { name: "Aurora Borealis Betta", xp: 2750, gold: 1375, desc: "Its fins are long flowing ribbons of green and magenta light. It is the most beautiful fish in the north. It dances in the water." },
        { name: "White Walker Crab", xp: 2800, gold: 1400, desc: "A crab with long legs that walks on the underside of the ice sheet. Creepy and silent." },
        { name: "Glacial Heart Jelly", xp: 2900, gold: 1450, desc: "A pulsating blue jellyfish-like creature. It is cold enough to freeze water around it." },
        { name: "Ancient Ice-Worm", xp: 2950, gold: 1475, desc: "A massive worm that burrows through solid ice. It leaves perfectly round tunnels. It radiates a bitter cold." },
        { name: "Frozen Timekeeper Cod", xp: 3000, gold: 1500, desc: "An ancient fish often found encased in ice, yet it swims away alive when thawed." }
      ],
      Epic: [
        { name: "Avalanche Shark", xp: 6000, gold: 3000, desc: "White, massive, and silent. It strikes with the force of a collapsing snow bank." },
        { name: "The Ice-Breaker (Whale)", xp: 6100, gold: 3050, desc: "A whale with a calloused, armored head used to smash through thick ice sheets to breathe. The sound of its impact echoes for miles." },
        { name: "Frost Giant's Carp", xp: 6250, gold: 3125, desc: "A carp the size of a whale. Legends say it escaped a giant's bowl. Eats anything." },
        { name: "Rune Marked Salmon", xp: 6500, gold: 3250, desc: "Natural markings on its side resemble ancient runes of power. Glows blue." },
        { name: "Blizzard Serpent Eel", xp: 6750, gold: 3375, desc: "A long white eel that swims through the air during heavy snowstorms. Hard to catch." },
        { name: "Blizzard Beast (Shark)", xp: 6800, gold: 3400, desc: "A shark made of swirling snow and ice. It hunts in the whiteout conditions of a storm. You never see it coming." },
        { name: "Permafrost Turtle", xp: 7000, gold: 3500, desc: "A turtle whose shell is an actual miniature iceberg. Moves incredibly slowly." }
      ],
      Legendary: [
        { name: "Aurora Spirit Trout", xp: 16000, gold: 8000, desc: "A celestial fish that shifts colors with the northern lights. It is breathtakingly beautiful." },
        { name: "Spirit of the Glacier (Bear-Fish)", xp: 16500, gold: 8250, desc: "A massive creature with the head of a polar bear and the body of a fish. It is the guardian of the ice. Ferocious and majestic." },
        { name: "Icebreaker Gar", xp: 17000, gold: 8500, desc: "A fish with a skull of adamantine. It smashes through ice sheets to breathe." },
        { name: "The Frozen Throne (Crab)", xp: 17500, gold: 8750, desc: "A crab so large it carries a castle of ice on its back. It is a king of the frozen wastes. It commands an army of smaller crabs." },
        { name: "Zero Point Jelly", xp: 18000, gold: 9000, desc: "A jellyfish of absolute zero temperature. The water freezes instantly where it swims." }
      ],
      Mythic: [
        { name: "Ymir's Tear Dropfish", xp: 45000, gold: 22000, desc: "A sentient drop of water from the first glacier. It holds the memory of the world's creation." },
        { name: "Nidhogg's Spawn (Serpent)", xp: 46000, gold: 23000, desc: "A dragon-like serpent that gnaws at the roots of the world tree beneath the ice. Its poison dissolves glaciers." },
        { name: "The Absolute Zero Leviathan", xp: 48000, gold: 24000, desc: "A creature of pure entropy. It stops all molecular motion. To catch it is to hold stillness itself." },
        { name: "Fenrir Wolf-Fish", xp: 50000, gold: 25000, desc: "A wolf-fish monstrosity chained to the bottom of the fjord. It struggles to break free." }
      ],
      Exotic: [
        { name: "Glacial Chronos Cod", xp: 150000, gold: 75000, desc: "A fish that swims so slowly it freezes time in its immediate vicinity. It has lived for eons." },
        { name: "Aurora-Weave Ray", xp: 155000, gold: 77500, desc: "A ray woven from the physical light of the aurora. It passes through solid ice as if it were air." }
      ],
      Arcane: [
        { name: "Ymir's Heartbeat Whale", xp: 750000, gold: 375000, desc: "A whale composed of deep blue ice and ancient magic. Its heartbeat is the rhythm of the tides themselves." }
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
        { name: "Moss-Back Minnow", xp: 425, gold: 212, desc: "A small fish covered in fuzzy green algae. It hides perfectly against the mossy bark of the aqueduct branches." },
        { name: "Raindrop Tetra", xp: 430, gold: 215, desc: "A tiny, clear fish that gathers in the millions during heavy rainfalls. They sparkle like water." },
        { name: "Twig Catfish", xp: 435, gold: 217, desc: "Its body is thin, brown, and rigid. It looks exactly like a broken twig floating in the water. Don't snap it." },
        { name: "Vine Swing Goby", xp: 440, gold: 220, desc: "Uses its pectoral fins to grip hanging vines, climbing out of the water to find insects." },
        { name: "Sap-Sucker Loach", xp: 445, gold: 222, desc: "It attaches itself to the underwater roots of giant trees to drink the sweet sap leaking into the river." },
        { name: "Bark Biter Pacu", xp: 450, gold: 225, desc: "It eats the wood of the giant trees. A pest to the ecosystem, but tasty." },
        { name: "Dew-Drop Dace", xp: 455, gold: 227, desc: "It collects morning dew on its scales to stay hydrated during dry spells. It shines in the morning sun." },
        { name: "Humid Air Betta", xp: 460, gold: 230, desc: "The air is so wet here this fish can swim through the mist for short distances." },
        { name: "Canopy Cricket Eater", xp: 465, gold: 232, desc: "A surface dweller that spits water to knock crickets off hanging leaves. Accurate and hungry." }
      ],
      Uncommon: [
        { name: "Fern-Leaf Flounder", xp: 780, gold: 390, desc: "Its body pattern mimics the intricate design of a fern frond. It lies flat on giant submerged leaves." },
        { name: "Poison Dart Minnow", xp: 800, gold: 400, desc: "Bright neon orange. Do not touch its skin; it causes temporary paralysis." },
        { name: "Sloth-Pace Carp", xp: 815, gold: 407, desc: "Algae grows on its fur-like scales because it moves so slowly. It hangs upside down from roots." },
        { name: "Canopy Glider Fish", xp: 825, gold: 412, desc: "It leaps from the high river and glides down to lower pools. Wings like a bird." },
        { name: "Hummingbird Fish", xp: 840, gold: 420, desc: "Its fins beat so fast they blur. It hovers in place to pick at underwater flowers." },
        { name: "Orchid Trap Catfish", xp: 850, gold: 425, desc: "Looks like a beautiful flower. When a bug lands on it, SNAP." },
        { name: "Jaguar Catfish", xp: 875, gold: 438, desc: "A predator with the spots of a jungle cat. It hunts with stealth." },
        { name: "Monkey Tail Eel", xp: 900, gold: 450, desc: "It has a prehensile tail it uses to hang from branches while sleeping." }
      ],
      Fine: [
        { name: "Web-Spinner Fish", xp: 1550, gold: 775, desc: "It spins a sticky web underwater to catch small prey. A close relative of the spider." },
        { name: "Emerald Piranha", xp: 1600, gold: 800, desc: "A solitary piranha made of glimmering green scales. Its bite can shear metal." },
        { name: "Jungle Rain Trout", xp: 1625, gold: 812, desc: "Its scales turn dark grey before a storm. Locals use it to predict the weather." },
        { name: "Sunbeam Snapper", xp: 1650, gold: 825, desc: "It captures sunlight in its scales to flash-blind predators. Bright as a mirror." },
        { name: "Fruit Eater Carp", xp: 1700, gold: 850, desc: "A fat, happy fish that only eats fallen exotic fruits. It tastes like mango." },
        { name: "Chameleon Bass", xp: 1750, gold: 875, desc: "It changes color instantly to match the riverbed. A test of a fisherman's eye." },
        { name: "Cacao Pod Catfish", xp: 1780, gold: 890, desc: "Shaped exactly like a cacao pod. It smells faintly of chocolate. A sweet catch." },
        { name: "Hive Mind Tetras", xp: 1800, gold: 900, desc: "It lives symbiotically with fire ants in hollow logs. They attack in swarms." }
      ],
      Rare: [
        { name: "Panther Loach", xp: 3400, gold: 1700, desc: "Sleek, black, and nocturnal. It moves with the grace of a jungle cat." },
        { name: "Green Man's Cichlid", xp: 3500, gold: 1750, desc: "A fish with a face that looks uncomfortably human and covered in moss." },
        { name: "Howler Monkey Fish", xp: 3600, gold: 1800, desc: "It has a throat sac that amplifies its calls. You can hear it screaming underwater from miles away." },
        { name: "Jungle Drummer Drum", xp: 3650, gold: 1825, desc: "It beats its tail against hollow wood to communicate. The sound travels for miles." },
        { name: "Ancient Totem Gar", xp: 3750, gold: 1875, desc: "Its scales form patterns resembling stacked totem pole faces. It is said to ward off evil spirits." },
        { name: "Viper Snakehead", xp: 3800, gold: 1900, desc: "A long fish with fangs that injects a potent necrotic venom. Aggressive." },
        { name: "Golden Beetle Fish", xp: 3900, gold: 1950, desc: "Heavily armored with a shell like a scarab. It shimmers with iridescence." },
        { name: "Amazonian King Arapaima", xp: 4000, gold: 2000, desc: "A massive Arapaima relative with red scales that burn to the touch." }
      ],
      Epic: [
        { name: "Titan Boa Eel", xp: 8000, gold: 4000, desc: "As thick as a tree trunk. It crushes boats by coiling around them." },
        { name: "Emerald Spirit Discus", xp: 8100, gold: 4050, desc: "Translucent green and glowing. It is believed to be a forest spirit taking the form of a fish." },
        { name: "Photosynthesis Bass", xp: 8250, gold: 4125, desc: "It doesn't eat; it absorbs sunlight. It radiates pure life energy." },
        { name: "Lost Idol Arowana", xp: 8500, gold: 4250, desc: "A gold fish shaped exactly like an ancient forgotten god. Worth a fortune." },
        { name: "Razor Leaf Ray", xp: 8750, gold: 4375, desc: "A flat fish with edges sharp enough to cut through the giant branches holding the river." },
        { name: "Anaconda-Eater Catfish", xp: 8900, gold: 4450, desc: "A catfish so large it hunts anacondas. It drags them from the trees into the water." },
        { name: "Apex Stalker Tigerfish", xp: 9000, gold: 4500, desc: "The ghost of the jungle. It has never been photographed, only caught by masters." }
      ],
      Legendary: [
        { name: "Heart of Jungle Discus", xp: 20000, gold: 10000, desc: "A pulsing, living emerald that swims. It controls the growth of the forest." },
        { name: "Sky-High Arowana", xp: 20500, gold: 10250, desc: "It leaps so high it clears the canopy layer. It hunts birds in mid-flight. The king of the upper river." },
        { name: "Quetzalcoatl Serpent", xp: 21000, gold: 10500, desc: "A feathered serpent fish. It brings rain and fertility where it swims." },
        { name: "The Green Giant (Gourami)", xp: 21500, gold: 10750, desc: "A gourami the size of a hippo. It is gentle but immovable. Moss and small trees grow on its back." },
        { name: "Primal Instigator Piranha", xp: 22000, gold: 11000, desc: "Its roar causes all nearby animals to go into a frenzy. Pure chaos." }
      ],
      Mythic: [
        { name: "Gaia's Leviathan Turtle", xp: 55000, gold: 27500, desc: "An island-sized turtle with an entire ecosystem on its shell, swimming in the canopy river." },
        { name: "Dryad's Soul (Koi)", xp: 58000, gold: 29000, desc: "A fish made of pure life force. To touch it is to feel the heartbeat of every tree in the forest." },
        { name: "World Tree Root Eel", xp: 60000, gold: 30000, desc: "A sentient root tip of the Yggdrasil. To catch it is to hold the foundation of the world." },
        { name: "Yggdrasil's Branch (Gar)", xp: 62000, gold: 31000, desc: "A gar that looks like a living branch of the world tree. It has leaves of gold. It cannot be broken." }
      ],
      Exotic: [
        { name: "Chlorophyll Spirit Gar", xp: 180000, gold: 90000, desc: "Its blood is pure chlorophyll. It hides in the dense canopy, looking like a living branch of ancient magic." },
        { name: "Golden-Sap Arowana", xp: 190000, gold: 95000, desc: "A massive Arowana with veins of flowing liquid gold sap. It brings extreme wealth to those who see it." }
      ],
      Arcane: [
        { name: "Forest Soul Arapaima", xp: 950000, gold: 475000, desc: "The physical manifestation of the rainforest's will. Its scales are ancient bark and its eyes are starlight." }
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
        { name: "Sand-Grain Guppy", xp: 560, gold: 280, desc: "So small and rough-skinned it feels like a pinch of sand. It scrapes algae off rocks." },
        { name: "Heatwave Minnow", xp: 570, gold: 285, desc: "Its body ripples like heat distortion. Hard to focus on." },
        { name: "Dry-Bone Minnow", xp: 580, gold: 290, desc: "Looks like a swimming fish skeleton. It's actually alive, just very pale and thin." },
        { name: "Cactus Spine Puffer", xp: 590, gold: 295, desc: "Covered in needles identical to a cactus. Don't step on it." },
        { name: "Sun-Baked Tetra", xp: 600, gold: 300, desc: "Its scales are hard and cracked like dry clay. It can survive in very hot water." },
        { name: "Dune Guppy", xp: 610, gold: 305, desc: "A dusty-colored fish that survives in muddy, drying puddles." },
        { name: "Dune-Hopper Goby", xp: 620, gold: 310, desc: "It uses its strong fins to hop across the hot sand from one puddle to another." },
        { name: "Bleached Bonefish", xp: 630, gold: 315, desc: "Pale white and skeletal. It looks dead, but it's just very thin." },
        { name: "Cactus Flower Betta", xp: 640, gold: 320, desc: "Its fins are vibrant pink and yellow, looking exactly like a blooming cactus flower." }
      ],
      Uncommon: [
        { name: "Quick-Sand Flounder", xp: 1050, gold: 525, desc: "It liquefies the sand around it to bury itself instantly. Don't stand near it." },
        { name: "Scarab Shell Carp", xp: 1100, gold: 550, desc: "Its scales form a hard, metallic shell. Prized by desert nomads." },
        { name: "Scorpion-Tail Guppy", xp: 1125, gold: 562, desc: "A guppy with a tail that curls up like a scorpion's stinger. It mimics the predator to stay safe." },
        { name: "Oasis Jewel Cichlid", xp: 1150, gold: 575, desc: "A bright sapphire blue fish. The only spot of color in the yellow desert." },
        { name: "Heat-Haze Carp", xp: 1175, gold: 587, desc: "It shimmers and blurs in the water. You can't tell exactly where it is until it's in the net." },
        { name: "Dust Devil Ray", xp: 1200, gold: 600, desc: "It spins rapidly to burrow into the sand, creating mini dust cyclones." },
        { name: "Camel Hump Bass", xp: 1250, gold: 625, desc: "It stores water in a fatty hump on its back, allowing it to survive droughts." },
        { name: "Nomad Eel", xp: 1300, gold: 650, desc: "It never stays in one pond, slithering across the dunes at night to find new water." }
      ],
      Fine: [
        { name: "Oasis Guardian Perch", xp: 2100, gold: 1050, desc: "A large, aggressive perch that attacks anything entering its pool. It protects the water source." },
        { name: "Golden Sand Catfish", xp: 2150, gold: 1075, desc: "Its skin is covered in gold dust. It sparkles in the sunlight. A sign of wealth." },
        { name: "Scorpion Fish", xp: 2200, gold: 1100, desc: "It has a tail with a stinger. The venom causes hallucinations." },
        { name: "Pyramid Stone Bass", xp: 2250, gold: 1125, desc: "Its scales are perfectly triangular and interlock like the stones of the great pyramids." },
        { name: "Pharaoh Mask Discus", xp: 2300, gold: 1150, desc: "Its face markings resemble the burial mask of an ancient king." },
        { name: "Sandstorm Shark", xp: 2400, gold: 1200, desc: "A small shark with rough skin like sandpaper. It hunts in packs during storms." },
        { name: "Mirage Maker Betta", xp: 2500, gold: 1250, desc: "It projects an illusion of a larger fish to scare away predators." },
        { name: "Pottery Hider Catfish", xp: 2500, gold: 1250, desc: "It hides inside sunken clay jars. Sometimes you catch the jar, sometimes the fish." }
      ],
      Rare: [
        { name: "Camel-Spider Crab", xp: 4800, gold: 2400, desc: "A terrifying crab with long, hairy legs. It runs incredibly fast on land and water." },
        { name: "Pharaoh's Pet (Catfish)", xp: 4900, gold: 2450, desc: "A hairless catfish adorned with gold jewelry it was buried with eons ago." },
        { name: "Sphinx Fin Perch", xp: 5000, gold: 2500, desc: "A majestic fish that poses riddles. Or at least looks like it does." },
        { name: "Hidden Spring Trout", xp: 5100, gold: 2550, desc: "Found only in the deepest, clearest part of the oasis. It tastes of pure, cold water." },
        { name: "Liquid Gold Carp", xp: 5250, gold: 2625, desc: "A fish that looks like molten gold. It is incredibly heavy and valuable." },
        { name: "Thirst Parasite", xp: 5500, gold: 2750, desc: "A parasitic fish that drains water from its prey." },
        { name: "Sun Disk Discus", xp: 5750, gold: 2875, desc: "Perfectly round and glowing. It represents the sun god." },
        { name: "Desert Rose Ray", xp: 6000, gold: 3000, desc: "A fish formed from crystallized minerals. It is fragile but beautiful." }
      ],
      Epic: [
        { name: "Sand Worm Eel", xp: 11000, gold: 5500, desc: "Half fish, half giant worm. It terrorizes the deep sands." },
        { name: "Sand-Dune Shark", xp: 11200, gold: 5600, desc: "A shark that swims through sand as easily as water. It breaches the dunes to attack." },
        { name: "Grave Robber Pike", xp: 11500, gold: 5750, desc: "It collects gold coins and jewelry from drowned travelers." },
        { name: "Mummy Wrap Eel", xp: 11800, gold: 5900, desc: "Its skin looks like tattered linen bandages. It smells of ancient spices." },
        { name: "Eternal Mummy Fish", xp: 12000, gold: 6000, desc: "A fish wrapped in bandage-like skin. It has been alive for thousands of years." },
        { name: "Solar Flare Bass", xp: 12500, gold: 6250, desc: "Touching it burns. It radiates the heat of high noon." },
        { name: "Mirage King Salmon", xp: 13000, gold: 6500, desc: "You think you caught it, but you're actually holding a boot. It warps reality." }
      ],
      Legendary: [
        { name: "Anubis Jackal Fish", xp: 28000, gold: 14000, desc: "A black jackal-headed fish. It weighs the soul of the angler." },
        { name: "Genie's Lamp Fish", xp: 29000, gold: 14500, desc: "A fish that lives inside an oil lamp. Rubbing its scales might release a djinn." },
        { name: "Djinn Spirit Carp", xp: 30000, gold: 15000, desc: "A spirit trapped in the form of a fish. Catching it might grant a wish." },
        { name: "The Sun God's Ray", xp: 31000, gold: 15500, desc: "A massive ray that glows with the intensity of the sun. It brings daylight to the depths." },
        { name: "Cleopatra's Needle Gar", xp: 32000, gold: 16000, desc: "A long, slender fish covered in hieroglyphs recounting the history of the desert." }
      ],
      Mythic: [
        { name: "Sphinx's Riddle (Sturgeon)", xp: 72000, gold: 36000, desc: "An ancient sturgeon with the face of a human. It will not be caught unless you solve its riddle." },
        { name: "Apep Chaos Serpent", xp: 75000, gold: 37500, desc: "The serpent of darkness that tries to swallow the sun. A world-ending catch." },
        { name: "The Ever-Thirst (Parasite)", xp: 78000, gold: 39000, desc: "A creature that drinks entire oases dry. It is the embodiment of drought." },
        { name: "Living Oasis Whale", xp: 80000, gold: 40000, desc: "The fish IS the water. To land it is to drain the oasis dry." }
      ],
      Exotic: [
        { name: "Oasis Mirage-Shifter", xp: 240000, gold: 120000, desc: "This fish constantly flickers between reality and illusion. It is hard to know if you have actually caught it." },
        { name: "Liquid Mercury Shark", xp: 250000, gold: 125000, desc: "A shark made of heavy, toxic liquid metal. It swims through the deep earth veins beneath the oasis." }
      ],
      Arcane: [
        { name: "Djinn-Prison Carp", xp: 1200000, gold: 600000, desc: "This carp's belly glows with the contained power of a captured Djinn King. It grants unlimited wishes, but at a terrible price." }
      ]
    }
  },
  9: {
    name: "The Cheddar Gorge",
    unlockLevel: 300,
    unlockGold: 3000000,
    boatRequired: "Cracker-Hull Raft",
    boatPrice: 3000000,
    description: "A delicious, yellow river of molten cheese flowing through a canyon of solid swiss. The air smells savory and rich.",
    fish: {
      Common: [
        { name: "Macaroni Minnow", xp: 750, gold: 375, desc: "A small, curved fish. Often found swimming in school with cheese sauce." },
        { name: "Cheese-Puff Puffer", xp: 760, gold: 380, desc: "Round, orange, and airy. It floats on the surface like a snack." },
        { name: "Swiss-Hole Guppy", xp: 770, gold: 385, desc: "It has natural holes in its body that whistle as it swims. A very holy fish." },
        { name: "Curd Carp", xp: 780, gold: 390, desc: "A lumpy white fish. It hasn't quite matured into a sharp cheddar yet." },
        { name: "Melted Mozzarella Minnow", xp: 790, gold: 395, desc: "Stringy and soft. If you pull it, it stretches for feet without breaking." },
        { name: "Cheddar-Chunk Chub", xp: 800, gold: 400, desc: "A blocky, orange fish. It looks like a cube of cheese with fins." },
        { name: "Nacho Tetra", xp: 810, gold: 405, desc: "Triangular and dusty orange. Has a spicy kick when touched." },
        { name: "Whey-Stream Loach", xp: 820, gold: 410, desc: "It swims in the thin, watery whey separation of the cheese river." },
        { name: "String Cheese Eel", xp: 840, gold: 420, desc: "Long, fibrous, and stretchy. It can be pulled apart into thin strands." },
        { name: "Cracker Crumb Crab", xp: 870, gold: 435, desc: "Uses a discarded soda cracker as a shell. Very crunchy." }
      ],
      Uncommon: [
        { name: "Blue-Vein Barb", xp: 1450, gold: 725, desc: "A fish with moldy blue veins running through it. It has a sharp, tangy bite." },
        { name: "Sharp Cheddar Shark", xp: 1500, gold: 750, desc: "Its teeth are made of aged cheddar. Surprisingly sharp." },
        { name: "Mozzarella Ray", xp: 1550, gold: 775, desc: "Soft, white, and very stretchy. It melts if left in the sun too long." },
        { name: "Swiss Hole Flounder", xp: 1600, gold: 800, desc: "A flat fish covered in natural holes. It whistles when it swims." },
        { name: "Pepper-Jack Perch", xp: 1625, gold: 812, desc: "Speckled with red and green jalapeno flakes. It radiates a spicy heat." },
        { name: "Pepper Jack Pike", xp: 1650, gold: 825, desc: "Speckled with hot peppers. Aggressive and spicy." },
        { name: "Fondue Catfish", xp: 1700, gold: 850, desc: "Dripping with warm, liquid cheese. It leaves a gooey trail." },
        { name: "Fondue-Pot Catfish", xp: 1750, gold: 875, desc: "It uses a discarded fondue pot as a shell. It dips its prey in cheese before eating." }
      ],
      Fine: [
        { name: "Sharp-Taste Shark", xp: 2900, gold: 1450, desc: "A small shark that tastes incredibly strong. Just handling it leaves a smell on your hands for days." },
        { name: "Rind-Eater Carp", xp: 2950, gold: 1475, desc: "It only eats the hard wax rinds of the cheese canyon. Its teeth are like wire cutters." },
        { name: "Brie Bass", xp: 3000, gold: 1500, desc: "Has a hard white rind exterior and a soft, gooey interior. Fancy." },
        { name: "Soft-Brie Bass", xp: 3050, gold: 1525, desc: "A variant of the Brie Bass that is entirely gooey. It requires a bucket to catch, not a net." },
        { name: "Gouda Goldfish", xp: 3100, gold: 1550, desc: "Covered in a red wax coating. Peel it before releasing." },
        { name: "Blue Cheese Betta", xp: 3200, gold: 1600, desc: "Moldy, smelly, and an acquired taste. Fights fiercely." },
        { name: "Parmesan Puffer", xp: 3300, gold: 1650, desc: "Explodes into a cloud of grated cheese dust when frightened." },
        { name: "Ricotta Ray", xp: 3400, gold: 1700, desc: "Lumpy and soft. Used in lasagna by giant chefs." }
      ],
      Rare: [
        { name: "Aged Gouda Gar", xp: 6800, gold: 3400, desc: "A gar with scales as hard as aged cheese crystals. It crunches when it moves." },
        { name: "Stilton Sturgeon", xp: 7000, gold: 3500, desc: "An ancient, crumbly fish. The smell attracts mice from miles away." },
        { name: "Feta Flounder", xp: 7250, gold: 3625, desc: "Lives in brine pools. Very salty and crumbly." },
        { name: "Queso Dip Carp", xp: 7500, gold: 3750, desc: "A spicy, semi-liquid fish. Usually found near tortilla chips." },
        { name: "Provolone Pike", xp: 7750, gold: 3875, desc: "Smoked flavor. Hanging it up makes it taste better." },
        { name: "Smoked Provolone Pike", xp: 7850, gold: 3925, desc: "A darker, smokier version of the pike. It hangs near volcanic vents to smoke itself." },
        { name: "The Stinky Bishop (Catfish)", xp: 7900, gold: 3950, desc: "Named after the smelliest cheese. You can smell this fish before you see the river." },
        { name: "Camembert Catfish", xp: 8000, gold: 4000, desc: "Extremely creamy. It slides right out of the net." }
      ],
      Epic: [
        { name: "The Big Cheese (Whale)", xp: 15000, gold: 7500, desc: "The boss of the river. A massive wheel of cheese with fins." },
        { name: "Fondue Tsunami (Carp)", xp: 15200, gold: 7600, desc: "A carp that causes waves of molten cheese when it splashes. Dangerous and delicious." },
        { name: "Limburger Leviathan", xp: 15500, gold: 7750, desc: "The smell is weaponized. It stuns smaller fish instantly." },
        { name: "The Big Wheel (Sunfish)", xp: 15800, gold: 7900, desc: "A sunfish shaped exactly like a massive wheel of parmesan. It rolls down the river." },
        { name: "Grilled Cheese Ray", xp: 16000, gold: 8000, desc: "Flat, toasted, and warm. Comfort food of the sea." },
        { name: "Truffle Oil Trout", xp: 16500, gold: 8250, desc: "Extremely expensive and earthy. A gourmet catch." },
        { name: "Pizza Topping Anchovy", xp: 17000, gold: 8500, desc: "Salty and controversial. You either love it or hate it." }
      ],
      Legendary: [
        { name: "Golden Wheel Wahoo", xp: 40000, gold: 20000, desc: "A perfectly round, rolling fish made of 24-karat cheddar." },
        { name: "Aging Barrel Barracuda", xp: 42000, gold: 21000, desc: "Has aged for 50 years. Sharpest taste in the ocean." },
        { name: "Golden Cheese Knife (Swordfish)", xp: 43000, gold: 21500, desc: "Its bill is a literal cheese knife made of gold. It slices through the river." },
        { name: "The Dairy Queen (Discus)", xp: 44000, gold: 22000, desc: "A majestic white fish with a crown of cream. It rules the milky depths." },
        { name: "Dairy King Crab", xp: 45000, gold: 22500, desc: "A crab made of butter and cream. Rich and deadly." }
      ],
      Mythic: [
        { name: "The Moon Slice (Mola Mola)", xp: 100000, gold: 50000, desc: "Proof that the moon is made of cheese. It fell from the sky." },
        { name: "The Galactic Cheese (Moonfish)", xp: 105000, gold: 52500, desc: "A fish that contains a galaxy of flavors. It tastes like the universe." },
        { name: "Lactose Intolerant Nightmare", xp: 110000, gold: 55000, desc: "A chaotic swirl of milk and stomach aches. The ultimate bad time." },
        { name: "The Curdled Leviathan", xp: 115000, gold: 57500, desc: "A monstrosity of spoiled milk and old cheese. It brings ruin to the river." }
      ],
      Exotic: [
        { name: "Blue-Mold Ancient", xp: 340000, gold: 170000, desc: "A fish overgrown with ancient blue mold that has gained sentience. It controls the fermentation of the entire gorge." },
        { name: "Diamond-Crystal Cheddar", xp: 350000, gold: 175000, desc: "Cheese that has aged so long it has crystallized into pure diamond. Incredibly hard and sharp." }
      ],
      Arcane: [
        { name: "Divine Fondue Whale", xp: 1750000, gold: 875000, desc: "A whale made of glowing, molten gold cheese. It is worshiped by the locals as the god of flavor." }
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
        { name: "Spark-Plug Minnow", xp: 1050, gold: 525, desc: "A tiny fish with a metal head. It generates a tiny spark when it bites." },
        { name: "Rain-Drop Guppy", xp: 1080, gold: 540, desc: "Shaped like a tear. It falls from the sky during storms and populates the bay." },
        { name: "Static Minnow", xp: 1100, gold: 550, desc: "Giving it a shake generates a small spark. Used as batteries by locals." },
        { name: "Grey-Cloud Goby", xp: 1120, gold: 560, desc: "A gloomy fish that hovers near the bottom. It looks like a small storm cloud." },
        { name: "Storm Grey Cod", xp: 1150, gold: 575, desc: "Blends in with the dark, choppy water. Tastes like ozone." },
        { name: "Static-Shock Tetra", xp: 1180, gold: 590, desc: "Schooling fish that generate a collective shock to deter predators. Don't touch the school." },
        { name: "Thunder Clap Crab", xp: 1200, gold: 600, desc: "When it snaps its claw, it sounds like a gunshot." },
        { name: "Thunder-Clap Shrimp", xp: 1220, gold: 610, desc: "A pistol shrimp that creates a sonic boom loud enough to mimic thunder." },
        { name: "Rain Dancer Betta", xp: 1250, gold: 625, desc: "It leaps out of the water to catch raindrops. Fins look like rain clouds." },
        { name: "Volt Leech", xp: 1300, gold: 650, desc: "It attaches to larger fish and drains their bio-electricity." }
      ],
      Uncommon: [
        { name: "Lightning-Streak Bass", xp: 2150, gold: 1075, desc: "A bass with a jagged yellow stripe down its side. It moves in zig-zags." },
        { name: "Lightning Rod Eel", xp: 2200, gold: 1100, desc: "It sticks its tail out of the water to catch lightning strikes." },
        { name: "Storm-Cloud Carp", xp: 2250, gold: 1125, desc: "Its scales are fluffy and grey. It swells up before a storm hits." },
        { name: "Spark Fin Bass", xp: 2300, gold: 1150, desc: "Its fins crackle with yellow energy. Fast and erratic swimmer." },
        { name: "Ozone-Smell Catfish", xp: 2350, gold: 1175, desc: "You can smell the storm on this fish. It has a sharp, metallic scent." },
        { name: "Cloud Reflection Carp", xp: 2400, gold: 1200, desc: "Its scales mirror the storm clouds above. Hard to distinguish from the sky reflection." },
        { name: "Gale Force Guppy", xp: 2450, gold: 1225, desc: "Small but incredibly strong. It can swim up a waterfall." },
        { name: "Current Cutter Tuna", xp: 2500, gold: 1250, desc: "Its body is streamlined to slice through the roughest waves without slowing down." }
      ],
      Fine: [
        { name: "High-Voltage Eel", xp: 4400, gold: 2200, desc: "Produces enough current to light up a small house. Handle with rubber gloves." },
        { name: "Tesla-Coil Trout", xp: 4450, gold: 2225, desc: "Its body is coiled like a spring. It releases energy in arcs of lightning." },
        { name: "Thunderstruck Trout", xp: 4500, gold: 2250, desc: "Glowing blue scars cover its body from surviving lightning strikes." },
        { name: "Magnet Scale Pike", xp: 4600, gold: 2300, desc: "Highly magnetic scales. It sticks to the side of metal boats." },
        { name: "Flash-Flood Flounder", xp: 4650, gold: 2325, desc: "It appears suddenly in shallow waters during heavy rain. It brings the flood with it." },
        { name: "Storm Eye Flounder", xp: 4700, gold: 2350, desc: "The pattern on its back looks like a hurricane radar map." },
        { name: "Electric Ray", xp: 4800, gold: 2400, desc: "The classic shocker. Delivers 500 volts of 'Leave me alone.'" },
        { name: "Pulse Heart Drum", xp: 5000, gold: 2500, desc: "Its heartbeat is so strong it creates ripples in the water." }
      ],
      Rare: [
        { name: "Conductor Bonefish", xp: 10000, gold: 5000, desc: "A fish with a copper-like skeleton. It directs the flow of electricity in the bay." },
        { name: "Electromagnet Ray", xp: 10200, gold: 5100, desc: "It generates a strong magnetic field that can disrupt compasses and electronics." },
        { name: "Thunder-Stone Gar", xp: 10400, gold: 5200, desc: "Its scales are made of fulgurite (petrified lightning). It is brittle but sharp." },
        { name: "Tempest Turtle", xp: 10500, gold: 5250, desc: "Its shell looks like a dark thunderhead. It snaps with the sound of thunder." },
        { name: "Flash Bang Snapper", xp: 11000, gold: 5500, desc: "Emits a blinding flash of light and a deafening noise when hooked." },
        { name: "Storm-Eye Shark", xp: 11200, gold: 5600, desc: "A shark with eyes that glow white. It sees through the chaos of the storm." },
        { name: "Plasma Shark", xp: 11500, gold: 5750, desc: "It spews balls of plasma. Dangerous and unstable." },
        { name: "Torrent Elemental Bass", xp: 12000, gold: 6000, desc: "A water elemental in the shape of a fish. It is made of pure velocity." }
      ],
      Epic: [
        { name: "Mjolnir Hammerhead", xp: 22000, gold: 11000, desc: "A hammerhead shark that hits with the force of a god." },
        { name: "Mjolnir's Strike (Hammerhead)", xp: 22500, gold: 11250, desc: "A variant of the hammerhead that summons lightning when it strikes prey." },
        { name: "Zeus Goldfish", xp: 23000, gold: 11500, desc: "A tiny, arrogant fish that wields lightning bolts. Do not underestimate it." },
        { name: "The Tempest (Barracuda)", xp: 23500, gold: 11750, desc: "A barracuda that spins like a tornado. It tears through schools of fish." },
        { name: "Stormborn Leviathan Eel", xp: 24000, gold: 12000, desc: "A massive serpent that rides the lightning between the clouds and the sea." },
        { name: "Eye of Storm Carp", xp: 24500, gold: 12250, desc: "Catching this fish stops the rain for exactly one minute. Peaceful and calm." },
        { name: "Voltage Vampire Lamprey", xp: 25000, gold: 12500, desc: "It drains the power from your boat, your rod, and your will to live." }
      ],
      Legendary: [
        { name: "Thunderbird Ray", xp: 60000, gold: 30000, desc: "A manta ray with wings of electricity. It flies more than it swims." },
        { name: "Zeus's Bolt (Eel)", xp: 61000, gold: 30500, desc: "A zigzag shaped eel made of pure white plasma. It moves at the speed of light." },
        { name: "Aspect of Storms Pike", xp: 62000, gold: 31000, desc: "The physical embodiment of the tempest. Pure chaos on a line." },
        { name: "The Cloud Walker (Ray)", xp: 64000, gold: 32000, desc: "A ray that swims through the storm clouds above the bay. It rains water down from its wings." },
        { name: "Fulminator Spirit Ray", xp: 65000, gold: 32500, desc: "A creature of pure energy shaped like a ray. It has no solid form, only light and sound." }
      ],
      Mythic: [
        { name: "Raijin Drum Sunfish", xp: 150000, gold: 75000, desc: "A massive sunfish that creates thunder by slapping the water." },
        { name: "The Thunder God (Whale)", xp: 155000, gold: 77500, desc: "A whale composed of dark clouds and lightning. Its call is a thunderclap that shakes the earth." },
        { name: "World Splitter Eel", xp: 160000, gold: 80000, desc: "A beam of concentrated lightning that took the form of an eel. It cuts the horizon in half." },
        { name: "The Eternal Storm (Kraken)", xp: 165000, gold: 82500, desc: "A kraken made of wind and rain. Its tentacles are tornadoes. It is the storm that never ends." }
      ],
      Exotic: [
        { name: "Singularity Eel", xp: 490000, gold: 245000, desc: "An eel that collapses electricity into a single point. It radiates a dangerous, silent energy." },
        { name: "Anti-Matter Ray", xp: 500000, gold: 250000, desc: "A ray composed of unstable anti-matter. It annihilates water molecules upon contact, creating steam explosions." }
      ],
      Arcane: [
        { name: "Storm Lord Kraken", xp: 2500000, gold: 1250000, desc: "The ruler of all storms. It is not just made of the storm; it commands it. Its very presence summons hurricanes." }
      ]
    }
  },
    11: {
    name: "Moonshadow Lake",
    unlockLevel: 500,
    unlockGold: 15000000,
    boatRequired: "Crescent-Wood Skiff",
    boatPrice: 15000000,
    description: "A perfectly circular lake that reflects the night sky with impossible clarity. It is perpetually night here, regardless of the time elsewhere. The water is ink-black but glows with fallen starlight.",
    fish: {
      Common: [
        { name: "Star-Dust Guppy", xp: 1300, gold: 650, desc: "Its scales are dusted with a glittering powder that glows in the dark. Large schools look like underwater galaxies. They are often kept in jars as living nightlights." },
        { name: "Lunar Pebble Minnow", xp: 1320, gold: 660, desc: "A small, round fish that mimics the grey stones of the moon. It lies perfectly still on the lakebed." },
        { name: "Crater-Back Crab", xp: 1350, gold: 675, desc: "Its shell has pockmarks resembling the surface of the moon. It scuttles sideways across the lakebed, kicking up clouds of stardust. Its claws are surprisingly strong for crushing moon-snails." },
        { name: "Phase-Shift Minnow", xp: 1360, gold: 680, desc: "It fades in and out of visibility depending on the angle of the light. Hard to track with the naked eye." },
        { name: "Dark-Matter Dace", xp: 1380, gold: 690, desc: "A fish that seems to weigh more than it should. It swims sluggishly near the bottom, absorbing light." },
        { name: "Midnight Minnow", xp: 1400, gold: 700, desc: "Completely black, this fish is visible only by the silhouette it blocks against the reflected stars. It moves silently and swiftly. Catching one requires keen eyesight." },
        { name: "Tidal Pull Tetra", xp: 1450, gold: 725, desc: "It swims in perfect sync with the phases of the moon. During a full moon, they swim near the surface; during a new moon, they dive deep. They are sensitive to gravity." },
        { name: "Vacuum-Mouth Chub", xp: 1470, gold: 735, desc: "It sucks in water with a force that mimics a tiny black hole. It clears the lakebed of debris." },
        { name: "Orbiting Roach", xp: 1485, gold: 742, desc: "It swims in perfect circles around larger rocks or fish. It never deviates from its orbital path." },
        { name: "Waxing Gibbous Sunfish", xp: 1500, gold: 750, desc: "A round, flat fish that grows brighter as it eats. By the time it is full, it glows like a pale lantern. It prefers the calm waters near the lake's center." },
        { name: "Waning Crescent Eel", xp: 1520, gold: 760, desc: "Its body is shaped like a curved hook. It glows faintly on only one side." },
        { name: "Meteorite Loach", xp: 1550, gold: 775, desc: "It looks like a streak of fire when it swims fast. Its skin is rough and rocky." }
      ],
      Uncommon: [
        { name: "Eclipse Eel", xp: 2600, gold: 1300, desc: "A dark eel with a distinct ring of bright light around its neck. It coils itself to mimic a solar eclipse when threatened. Its skin is cold to the touch." },
        { name: "Retrograde Perch", xp: 2650, gold: 1325, desc: "It swims backward just as easily as forward. It confuses predators by moving against the flow of the current." },
        { name: "Comet Tail Goldfish", xp: 2700, gold: 1350, desc: "Fast and bright, it leaves a streak of light in the water when it bolts. Fishermen say catching one brings good fortune. It is a favorite prize in celestial festivals." },
        { name: "Lunar Moth Betta", xp: 2800, gold: 1400, desc: "Its fins resemble the delicate wings of a moth. It is inevitably drawn to the lantern on your boat, fluttering near the surface. Handle its fins with care." },
        { name: "Telescope-Eye Carp", xp: 2850, gold: 1425, desc: "Its eyes are massive and point upwards to watch the stars. It navigates by constellations." },
        { name: "Gravity Bass", xp: 2900, gold: 1450, desc: "This bass is unusually heavy for its size, bending rods to their breaking point. It alters the water pressure around it to hunt. It feels like reeling in a lead weight." },
        { name: "Zero-G Shrimp", xp: 2950, gold: 1475, desc: "It floats suspended in the water, unaffected by gravity. It drifts effortlessly." },
        { name: "Night Owl Ray", xp: 3000, gold: 1500, desc: "A stingray with markings on its back that look like wide, staring eyes. It glides silently through the dark, watching everything. It hunts primarily by sound." },
        { name: "Dark-Star Catfish", xp: 3050, gold: 1525, desc: "Its whiskers glow with a dark purple light. It hunts in the deepest shadows of the lake." },
        { name: "Aurora Fin Trout", xp: 3100, gold: 1550, desc: "Its fins shimmer with the colors of the northern lights. A beautiful display in the dark water." }
      ],
      Fine: [
        { name: "Constellation Carp", xp: 5500, gold: 2750, desc: "The glowing dots on its side connect to form recognized star charts. Ancient navigators used dried specimens to map the sky. Each fish has a unique pattern." },
        { name: "Silver Beam Pike", xp: 5750, gold: 2875, desc: "This pike looks like a solidified beam of moonlight given form. It is sharp, ethereal, and strikes with blinding speed. It vanishes if kept out of water too long." },
        { name: "Asteroid Belt Gar", xp: 5900, gold: 2950, desc: "A long fish surrounded by floating pebbles that it controls telekinetically. It uses them as a shield." },
        { name: "Void Space Goby", xp: 6000, gold: 3000, desc: "A small fish that stares into the void without blinking. Its eyes are pitch black and reflect no light. Looking at it for too long causes dizziness." },
        { name: "Nebula Salmon", xp: 6250, gold: 3125, desc: "Its flesh is a swirling mix of pinks, purples, and blues. It migrates through the lake's magical currents to spawn. It tastes like ozone and berries." },
        { name: "Satellite Discus", xp: 6400, gold: 3200, desc: "A perfectly round fish that reflects radar signals. It hums with a faint electronic sound." },
        { name: "Dark Side Flounder", xp: 6500, gold: 3250, desc: "It always keeps one side hidden from the light, lying flat on the dark lake floor. Its dark side is said to contain a portal to shadow. It is extremely hard to spot." },
        { name: "Shooting Star Sturgeon", xp: 6600, gold: 3300, desc: "It leaps from the water in a blazing arc. Locals make a wish when they see one." },
        { name: "Black-Hole Maw Bass", xp: 6750, gold: 3375, desc: "Its mouth is darker than the surrounding water. Anything that enters it is never seen again." }
      ],
      Rare: [
        { name: "Selene's Mirror Pomfret", xp: 13000, gold: 6500, desc: "A fish so reflective you can see your own soul in its scales. It was once used by oracles to predict the future. It blinds predators with reflected starlight." },
        { name: "Wolf Spirit Dogfish", xp: 13500, gold: 6750, desc: "A small shark that emits a sound like a howl underwater. It hunts in packs during the full moon. Its bite leaves a mark that glows silver." },
        { name: "Fallen Star Puffer", xp: 14000, gold: 7000, desc: "This fish radiates intense heat and light. It is essentially a meteorite that grew fins and fell into the lake. Keep it in a metal bucket." },
        { name: "Twilight Hunter Catfish", xp: 14500, gold: 7250, desc: "Active only during the split second between day and night. It uses its long whiskers to sense changes in the light. A master of the grey hours." },
        { name: "Orbital Koi", xp: 15000, gold: 7500, desc: "Smaller fish actually orbit around it due to its gravitational pull. It moves majestically through the water, surrounded by its entourage. A centerpiece for any aquarium." },
        { name: "Cosmic Ray", xp: 15500, gold: 7750, desc: "A ray composed of pure cosmic radiation. It glows with a dangerous blue energy." },
        { name: "Event Horizon Turtle", xp: 16000, gold: 8000, desc: "Time seems to slow down around this turtle. It moves slowly, but you can never quite catch up to it." },
        { name: "Galaxy Swirl Eel", xp: 16500, gold: 8250, desc: "Its skin is a living image of a spiral galaxy. It spins to create a hypnotic effect." },
        { name: "Void-Gazer Angler", xp: 17000, gold: 8500, desc: "Its lure is a tiny black hole. It attracts prey not with light, but with gravity." }
      ],
      Epic: [
        { name: "Crescent Scythe Shark", xp: 30000, gold: 15000, desc: "A shark with a dorsal fin shaped like a curved silver blade. It cuts through the water surface like a knife. Legends say it guards the moon's reflection." },
        { name: "Man-in-the-Moon Blobfish", xp: 31000, gold: 15500, desc: "An ugly fish with a face that looks like a cratered old man. It grumbles when pulled from the water. Despite its looks, it is incredibly rare." },
        { name: "Solar Eclipse Shark", xp: 32000, gold: 16000, desc: "A massive black shark with a burning ring of fire around its silhouette. It blocks out the light." },
        { name: "Zodiac Keeper Arapaima", xp: 32500, gold: 16250, desc: "A massive fish that changes its form depending on the current month. It embodies the traits of the zodiac constellations. Catching it is a yearly event." },
        { name: "Supernova Salmon", xp: 33000, gold: 16500, desc: "It explodes with energy when caught, dealing massive damage to the rod. It shines with the brightness of a dying star." },
        { name: "Eventide Leviathan Eel", xp: 34000, gold: 17000, desc: "A beast made of the transition from light to dark. It is half shadow, half starlight. It circles the perimeter of the lake endlessly." },
        { name: "Gravity Well Grouper", xp: 34500, gold: 17250, desc: "It sits at the bottom of the deepest pit in the lake. It is so heavy it crushes the rocks beneath it." },
        { name: "Nocturne's Melody Whale", xp: 35000, gold: 17500, desc: "It emits a hauntingly beautiful song that puts sailors to sleep. The song can be heard for miles underwater. It is the dream-weaver of the lake." }
      ],
      Legendary: [
        { name: "Artemis's Silver Stag-Fish", xp: 80000, gold: 40000, desc: "A sea-stag with antlers of pure silver that runs on the water's surface. It is the favored pet of the moon goddess. It moves faster than the eye can track." },
        { name: "Eclipse Eater Grouper", xp: 85000, gold: 42500, desc: "A fish that seeks to swallow the reflection of the moon. It has a mouth wide enough to consume a small boat. Its stomach is a void." },
        { name: "The Star-Eater (Shark)", xp: 88000, gold: 44000, desc: "A shark that hunts stars reflected in the water. It has teeth made of diamonds. It leaves a trail of darkness." },
        { name: "Starlight Weaver Ray", xp: 90000, gold: 45000, desc: "It weaves beams of light into physical nets to catch prey. Its wingspan rivals the largest sails. A creature of pure elegance and light." },
        { name: "Moon-Walker Crab", xp: 92000, gold: 46000, desc: "A crab the size of a house. It walks on the lakebed as if it were the moon. Gravity affects it differently." },
        { name: "Celestial Serpent", xp: 95000, gold: 47500, desc: "A serpent made of constellations. It connects the stars in the sky to the water below." }
      ],
      Mythic: [
        { name: "Pale Night's Avatar (Manta)", xp: 200000, gold: 100000, desc: "The physical embodiment of the night sky in the form of a giant Manta Ray. Its back contains the map of the entire universe. To look at it is to see eternity." },
        { name: "The Dark Side (Sunfish)", xp: 210000, gold: 105000, desc: "A massive sunfish that absorbs all light. It is the void between stars given form. It brings absolute darkness." },
        { name: "The Lunar Whale", xp: 220000, gold: 110000, desc: "A whale that floats through the air above the lake, bathing in moonlight. It rarely touches the water, making it nearly impossible to hook. It carries dreams on its back." },
        { name: "Cosmic Entropy (Jellyfish)", xp: 230000, gold: 115000, desc: "A jellyfish that represents the end of the universe. It unravels reality where it swims. Do not touch its tendrils." },
        { name: "The Big Bang (Goldfish)", xp: 250000, gold: 125000, desc: "A tiny goldfish that contains infinite energy. It is the beginning of everything. Catching it restarts the cycle." }
      ],
      Exotic: [
        { name: "Cosmic-Tail Koi", xp: 750000, gold: 375000, desc: "Its tail is a literal nebula, trailing stardust that remains in the water for hours. It swims through the vacuum of space as easily as water." },
        { name: "Nebula-Fin Ray", xp: 780000, gold: 390000, desc: "A ray whose wings display the birth of stars. It moves with the slow, inevitable grace of a galaxy rotating." }
      ],
      Arcane: [
        { name: "Zodiac-Weaver Whale", xp: 3750000, gold: 1875000, desc: "An ancient whale that rearranges the stars in the sky with its song. It is the architect of fate itself." }
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
        { name: "Fuzzy Algae Eater", xp: 1720, gold: 860, desc: "A small bottom feeder covered in symbiotic fuzz. It cleans the mushroom stalks." },
        { name: "Mold Scale Carp", xp: 1750, gold: 875, desc: "Covered in a fuzzy blue mold instead of traditional scales. It smells faintly of damp basements and old cheese. It thrives in the darkest corners of the swamp." },
        { name: "Neon Spore Tetra", xp: 1780, gold: 890, desc: "A tiny glowing fish that travels in swarms, looking like floating spores." },
        { name: "Cap Head Minnow", xp: 1800, gold: 900, desc: "It has a small mushroom cap growing on its head for camouflage. It remains perfectly still to mimic a fungus. Local chefs use them for soup stock." },
        { name: "Mycelium Threadfin", xp: 1820, gold: 910, desc: "Its fins are long, white threads that look like mycelium. It uses them to sense vibrations in the mud." },
        { name: "Slime Trail Eel", xp: 1850, gold: 925, desc: "Leaves a trail of neon green slime that glows for minutes after it passes. The slime is sticky and hard to wash off. It helps the eel slide through mud." },
        { name: "Rot-Belly Chub", xp: 1880, gold: 940, desc: "Its belly looks decomposed, but it is just a pattern. It eats decaying plant matter." },
        { name: "Shroom-Shelled Snail", xp: 1890, gold: 945, desc: "An aquatic snail with a mushroom growing on its shell. It moves slowly along the swamp floor." },
        { name: "Spore Eater Bass", xp: 1900, gold: 950, desc: "Swims with its mouth open to catch falling spores from the giant mushrooms above. Its stomach is specially adapted to digest toxic fungi. A hardy survivor." },
        { name: "Damp-Skin Dace", xp: 1920, gold: 960, desc: "Its skin is perpetually slimy to keep it from drying out if the swamp water level drops." },
        { name: "Glow-Cap Guppy", xp: 1950, gold: 975, desc: "It has a small glowing cap on its head. Swarms of them look like fireflies underwater." }
      ],
      Uncommon: [
        { name: "Gill Rot Bass", xp: 3500, gold: 1750, desc: "Its gills look ragged and decayed, but the fish is perfectly healthy. This appearance deters predators who think the fish is already dead. A master of deception." },
        { name: "Toadstool Turtle", xp: 3600, gold: 1800, desc: "A red and white spotted mushroom grows directly on its shell. It spends most of its time sleeping in patch of fungi. It bites if disturbed." },
        { name: "Fungal Fin Betta", xp: 3700, gold: 1850, desc: "Its fins are thin sheets of delicate fungus. They tear easily, but regenerate overnight. It displays vibrant purple colors to attract mates." },
        { name: "Polypore Perch", xp: 3750, gold: 1875, desc: "Its scales are hard and layered like bracket fungus. It wedges itself into crevices in submerged logs." },
        { name: "Decay Feeder Catfish", xp: 3800, gold: 1900, desc: "It eats dead wood and converts it into clean soil. It acts as the janitor of the marsh ecosystem. Its whiskers are sensitive to rot." },
        { name: "Yeast-Infection Goby", xp: 3850, gold: 1925, desc: "It causes bread to rise if placed near dough. It smells like fresh baking, strangely." },
        { name: "Spore-Cloud Crab", xp: 3900, gold: 1950, desc: "When threatened, it releases a cloud of choking spores. It scuttles away in the confusion." },
        { name: "Mutant Neon Tetra", xp: 4000, gold: 2000, desc: "A common tetra that has mutated to be the size of a house cat. It glows brightly enough to read by. Swarms of them can illuminate the entire swamp." },
        { name: "Sludge-Gulper Carp", xp: 4050, gold: 2025, desc: "It filters the thick sludge of the swamp. It is remarkably clean inside." },
        { name: "Psilocybin Pike", xp: 4100, gold: 2050, desc: "Its bite causes mild hallucinations. Its skin patterns shift and move." }
      ],
      Fine: [
        { name: "Vision Bass", xp: 7500, gold: 3750, desc: "Consuming this fish causes vivid, colorful hallucinations for several hours. Shamans use its scales in rituals. It has swirling psychedelic patterns on its skin." },
        { name: "Cordyceps Host Gar", xp: 7750, gold: 3875, desc: "A fish being controlled by a parasitic fungus. It moves jerkily and without fear. The fungus eventually consumes the host entirely." },
        { name: "Mycelium Network Eel", xp: 8000, gold: 4000, desc: "It connects with the roots of the swamp, sensing movement miles away. It knows you are fishing before you even cast. A part of the marsh's hive mind." },
        { name: "Truffle Snout Sturgeon", xp: 8250, gold: 4125, desc: "Used by gourmet chefs to find rare underwater truffles. Its snout is highly sensitive to the scent of fungi. A valuable companion for gatherers." },
        { name: "Ink Cap Squid", xp: 8500, gold: 4250, desc: "A freshwater squid that dissolves into black ink when removed from water. You must keep it in a special tank to preserve it. The ink is prized for spells." },
        { name: "Lichen-Scale Trout", xp: 8600, gold: 4300, desc: "A symbiosis of algae and fungus living on a fish. It can survive in poor water conditions." },
        { name: "Glowing Bracket Bass", xp: 8750, gold: 4375, desc: "It has glowing shelf fungi growing from its sides. It lights up the murky depths." },
        { name: "Spore-Shot Archerfish", xp: 8900, gold: 4450, desc: "It spits toxic spore-water at insects on overhanging branches. Deadly accuracy." },
        { name: "Swamp-Gas Puffer", xp: 9000, gold: 4500, desc: "Inflates with methane gas. It floats and is highly flammable. Do not fish while smoking." }
      ],
      Rare: [
        { name: "Decomposer Catfish", xp: 17000, gold: 8500, desc: "It accelerates the aging of anything it touches. Wooden boats rot quickly in its presence. It represents the inevitable cycle of decay." },
        { name: "Violet Shelf Ray", xp: 18000, gold: 9000, desc: "A flat ray that disguises itself as shelf fungus on submerged logs. It waits for prey to walk over it. Its sting causes rapid fungal growth." },
        { name: "Spore Cloud Squid", xp: 19000, gold: 9500, desc: "Instead of ink, it shoots a cloud of choking yellow dust. This cloud paralyzes nearby fish. Wear a mask when reeling it in." },
        { name: "Witch's Cauldron Bubblefish", xp: 19500, gold: 9750, desc: "A round fish that bubbles and boils internally like a potion. It is warm to the touch. Alchemists pay a high price for its internal fluids." },
        { name: "Fairy Ring Discus", xp: 20000, gold: 10000, desc: "Always found swimming in perfect circles with others of its kind. Stepping inside their circle is said to transport you to the fae realm. Mysterious and beautiful." },
        { name: "Blue-Stain Pine Gar", xp: 20500, gold: 10250, desc: "A gar infected with a fungus that turns its flesh blue. It is prized for its unique color." },
        { name: "Toxic Sludge Eel", xp: 21000, gold: 10500, desc: "It swims in the most toxic parts of the swamp. Its skin burns to the touch." },
        { name: "Mind-Control Minnow", xp: 21500, gold: 10750, desc: "A single fish that controls a swarm of thousands. Catch the leader, catch them all." },
        { name: "Eternal Rot Lungfish", xp: 22000, gold: 11000, desc: "It is constantly rotting and regenerating. It smells terrible but cannot die." }
      ],
      Epic: [
        { name: "Swamp Thing Heart (Lungfish)", xp: 40000, gold: 20000, desc: "A pulsating mass of vegetation and muscle in the shape of a lungfish. It beats with the rhythm of the swamp. It is difficult to tell if it is plant or animal." },
        { name: "Ancient Bracket Carp", xp: 42000, gold: 21000, desc: "Its armor is made of wood-hard fungus that is centuries old. Arrows and spears bounce off its back. It moves with slow, ancient purpose." },
        { name: "Toxic Bloom Lionfish", xp: 43000, gold: 21500, desc: "Beautiful but deadly. Touching its spines causes skin to turn into moss. It flares its fins to warn off predators." },
        { name: "Spore Lord Arapaima", xp: 44000, gold: 22000, desc: "A massive predator that commands the hive mind of the marsh. Other fish sacrifice themselves to feed it. It is the king of the fungal depths." },
        { name: "Rot Tooth Pike", xp: 45000, gold: 22500, desc: "Its bite causes equipment to rust and rot instantly. Hooks disintegrate in its mouth. You must land it quickly before your gear fails." },
        { name: "The Great Mold (Blobfish)", xp: 46000, gold: 23000, desc: "A massive blob of sentient mold. It grows over everything it touches. It is the heart of the fungal infection." },
        { name: "Shroom-King Crab", xp: 47000, gold: 23500, desc: "A crab with a crown of rare mushrooms. It rules the swamp floor." },
        { name: "Marsh-Gas Leviathan", xp: 48000, gold: 24000, desc: "A massive eel that releases bubbles of swamp gas. It can cause explosions if provoked." }
      ],
      Legendary: [
        { name: "Eternal Mushroom Jelly", xp: 100000, gold: 50000, desc: "A jellyfish that cannot die; it simply decomposes and regrows. It glows with the light of eternal life. It holds the secrets of regeneration." },
        { name: "Sentient Colony Siphonophore", xp: 105000, gold: 52500, desc: "Millions of microorganisms forming the shape of a giant fish. It speaks with a thousand tiny voices. It is a drifting city of life." },
        { name: "Guardian of Decay Gar", xp: 110000, gold: 55000, desc: "It ensures the cycle of life and death continues uninterrupted. It eats the dead to make room for the living. A necessary force of nature." },
        { name: "The Spore Mother (Ray)", xp: 115000, gold: 57500, desc: "A ray that releases clouds of spores from its wings. It seeds the swamp with new life." },
        { name: "Ancient Swamp Dragon (Eel)", xp: 120000, gold: 60000, desc: "A dragon-like eel covered in moss and fungus. It breathes toxic gas." },
        { name: "The Rotting King (Catfish)", xp: 125000, gold: 62500, desc: "An ancient catfish that is more bone than flesh. It rules the undead fish of the swamp." }
      ],
      Mythic: [
        { name: "Parasite God Lamprey", xp: 250000, gold: 125000, desc: "A horrifying entity that tries to infect the world. It is the source of all corruption in the marsh. To catch it is to save the ecosystem." },
        { name: "The Hive Mind (Jellyfish)", xp: 265000, gold: 132500, desc: "A massive, pulsating brain-like jelly. It controls the thoughts of all infected creatures in the swamp. It hums with psychic energy." },
        { name: "The World Spore Whale", xp: 280000, gold: 140000, desc: "A massive seed floating in the water, waiting to restart evolution. It carries the genetic code of a new world. It hums with potential energy." },
        { name: "Gaia's Decay (Turtle)", xp: 300000, gold: 150000, desc: "A turtle that carries a dead world on its back. It represents the end of all things. It moves with heavy sorrow." },
        { name: "The Fungal Overlord (Kraken)", xp: 320000, gold: 160000, desc: "A kraken made of roots and mycelium. It drags ships into the swamp to feed the fungus." }
      ],
      Exotic: [
        { name: "Hyper-Spore Gar", xp: 960000, gold: 480000, desc: "It moves so fast it creates a sonic boom of spores, instantly infecting anything nearby. It is a living biological weapon." },
        { name: "Fungal-Heart Eel", xp: 1000000, gold: 500000, desc: "An eel that beats with the collective heart of every mushroom in the swamp. To hold it is to feel the pulse of the earth." }
      ],
      Arcane: [
        { name: "The Rot-God (Catfish)", xp: 4800000, gold: 2400000, desc: "An ancient deity of decay that has taken the form of a catfish. It recycles entire civilizations into dirt." }
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
        { name: "Bronze-Fin Minnow", xp: 2120, gold: 1060, desc: "A small fish with tough, bronze-colored fins. It scavenges the metal scraps of the city." },
        { name: "Marble Goby", xp: 2150, gold: 1075, desc: "Looks exactly like a chipped piece of white marble. It hides against statues to avoid predators. Only its eyes give it away." },
        { name: "Pipe-Cleaner Loach", xp: 2180, gold: 1090, desc: "Long and slender, it swims through the rusted pipes of the city's plumbing system." },
        { name: "Gutter Runner Ratfish", xp: 2200, gold: 1100, desc: "Adapted to swim through the ancient sewer pipes of the city. It has a long, slender tail and large eyes. It scavenges for scraps in the ruins." },
        { name: "Mosaic Tetra", xp: 2250, gold: 1125, desc: "Colorful and angular, resembling a piece of floor art. When they school together, they form beautiful patterns. They prefer the tiled halls of sunken palaces." },
        { name: "Rust Eater Catfish", xp: 2300, gold: 1150, desc: "Feeds on the decaying iron gates of the city. Its stomach acid is incredibly corrosive. It keeps the ruins from collapsing completely." },
        { name: "Bolt-Head Chub", xp: 2320, gold: 1160, desc: "Its head is shaped like a hexagonal bolt. It uses it to pry open shellfish." },
        { name: "Gear-Tooth Piranha", xp: 2350, gold: 1175, desc: "Its teeth interlock like gears. It can chew through soft metals." },
        { name: "Wire-Whiskered Catfish", xp: 2380, gold: 1190, desc: "Its whiskers look like copper wire. It senses electrical currents in the ruins." },
        { name: "Glass-Shard Guppy", xp: 2400, gold: 1200, desc: "A guppy that mimics the broken glass of the city's windows. Sharp and shiny." },
        { name: "Oil-Slick Minnow", xp: 2420, gold: 1210, desc: "It swims in the leaked oil from ancient machines. It is slippery and hard to hold." }
      ],
      Uncommon: [
        { name: "Relic Hermit Crab", xp: 4200, gold: 2100, desc: "This crab uses ancient golden goblets or helmets as a shell. It is a moving piece of history. Collectors pay well for the artifact on its back." },
        { name: "Copper-Plated Carp", xp: 4250, gold: 2125, desc: "Its scales have oxidized to a beautiful green patina. It looks like an old roof." },
        { name: "Piston Jaw Pike", xp: 4350, gold: 2175, desc: "Its jaw snaps shut with the force of a hydraulic press. It resembles the machinery found in the city. It hunts with mechanical precision." },
        { name: "Scroll Fin Betta", xp: 4500, gold: 2250, desc: "Its fins look like decaying parchment filled with lost knowledge. The writing on its fins changes daily. Scholars study them to learn history." },
        { name: "Vault Keeper Grouper", xp: 4650, gold: 2325, desc: "Extremely territorial. It guards holes in the wall like bank vaults. It will attack anything that tries to enter its home." },
        { name: "Chain-Link Eel", xp: 4700, gold: 2350, desc: "Its skin pattern looks like a rusted chain. It hides in anchor chains." },
        { name: "Steam-Vent Bass", xp: 4750, gold: 2375, desc: "It lives near thermal vents. It releases bursts of steam from its gills." },
        { name: "Gear Grinder Drum", xp: 4800, gold: 2400, desc: "Eats loose cogs and gears from the sea floor. You can hear it rattling from the boat. It helps recycle the city's debris." },
        { name: "Clock-Face Flounder", xp: 4850, gold: 2425, desc: "Its round, flat body has markings like a clock. The markings change to show the time." },
        { name: "Statue-Mimic Rockfish", xp: 4900, gold: 2450, desc: "It looks like a broken piece of a statue. It stands still until prey comes close." }
      ],
      Fine: [
        { name: "Emerald Eye Idol Fish", xp: 9000, gold: 4500, desc: "A fish that looks like a small religious statue with green gem eyes. It sits perfectly still on pedestals. Looters often mistake it for treasure." },
        { name: "Gilded Carp", xp: 9250, gold: 4625, desc: "Not just gold-colored; its scales are actually plated with soft gold. It is heavy and swims slowly. A symbol of the city's excessive wealth." },
        { name: "Chandelier Jellyfish", xp: 9500, gold: 4750, desc: "Hangs motionless in the water, glowing with crystal elegance. It looks like a fixture from a grand ballroom. Touching it causes a shocking sting." },
        { name: "Fresco Flounder", xp: 9750, gold: 4875, desc: "Its back displays a faded painting of an ancient war. It camouflages against painted walls. A living piece of art." },
        { name: "Treasury Eel", xp: 10000, gold: 5000, desc: "It swallows gemstones and regurgitates them when threatened. Tracking one often leads to hidden loot. It glows with the color of the gems it eats." },
        { name: "Ruby-Fin Snapper", xp: 10200, gold: 5100, desc: "Its fins are made of thin sheets of ruby. It glitters in the light." },
        { name: "Sapphire-Scale Tuna", xp: 10400, gold: 5200, desc: "A tuna with scales of pure sapphire. It is incredibly hard and durable." },
        { name: "Diamond-Tooth Shark", xp: 10600, gold: 5300, desc: "Its teeth are made of diamonds. It can bite through anything." },
        { name: "Platinum-Plated Pike", xp: 10800, gold: 5400, desc: "A pike covered in platinum armor. It is worth a king's ransom." }
      ],
      Rare: [
        { name: "Clockwork Shark", xp: 22000, gold: 11000, desc: "Was it built? Was it born? It ticks as it swims and never seems to tire. Its teeth are made of spinning gears." },
        { name: "King's Crown Discus", xp: 23000, gold: 11500, desc: "A fish shaped distinctly like a royal diadem. It demands respect from other fish. It swims with a regal air." },
        { name: "Library Guardian Octopus", xp: 24000, gold: 12000, desc: "It absorbs the ink from ancient books, gaining their wisdom. It protects the sunken library from looters. Highly intelligent and dangerous." },
        { name: "Alchemist Mistake Chimera", xp: 24500, gold: 12250, desc: "A twisted, unnatural creature created by ancient science. It has parts of several different fish. A sad reminder of hubris." },
        { name: "Philosopher Stonefish", xp: 25000, gold: 12500, desc: "A red stonefish. Legend says it can transmute lead into gold. Alchemists hunt it relentlessly. It is extremely poisonous." },
        { name: "Steam-Engine Whale", xp: 25500, gold: 12750, desc: "A small whale with vents on its back. It moves with the sound of a steam engine." },
        { name: "Gear-Heart Turtle", xp: 26000, gold: 13000, desc: "You can see gears turning inside its shell. It lives for centuries." },
        { name: "Iron-clad Sturgeon", xp: 26500, gold: 13250, desc: "A sturgeon covered in heavy iron plates. It is a living tank." },
        { name: "Golden-Fleece Ram (Fish)", xp: 27000, gold: 13500, desc: "A fish with golden wool-like scales. It is soft to the touch." }
      ],
      Epic: [
        { name: "Colossus Fragment Crab", xp: 50000, gold: 25000, desc: "A giant crab using the bronze head of a statue as a shell. It moves slowly but is nearly invincible. It guards the city gates." },
        { name: "Automaton Whale", xp: 52000, gold: 26000, desc: "A brass whale powered by steam and magic. It surfaces to vent steam from its blowhole. A marvel of ancient engineering." },
        { name: "Siren of Aethelgard (Mermaid)", xp: 53000, gold: 26500, desc: "Its song mimics the ringing of church bells underwater. It lures sailors to join the city in the deep. Beautiful and deadly." },
        { name: "High Priest Betta", xp: 54000, gold: 27000, desc: "Clad in ceremonial robes that flow like fins. It leads schools of fish in strange rituals. It radiates a holy aura." },
        { name: "Doomsday Device Mine", xp: 55000, gold: 27500, desc: "A fish that looks suspiciously like a ticking bomb. It was a weapon of war that gained sentience. Handle with extreme caution." },
        { name: "The Bronze Titan (Grouper)", xp: 56000, gold: 28000, desc: "A grouper made of bronze. It is a guardian of the city." },
        { name: "The Golden Fleece (Ray)", xp: 57000, gold: 28500, desc: "A ray covered in golden wool. It brings wealth to those who see it." },
        { name: "The Clock Tower (Eel)", xp: 58000, gold: 29000, desc: "A massive eel that lives in the main clock tower. It controls the city's time." }
      ],
      Legendary: [
        { name: "Midas Golden Dorado", xp: 130000, gold: 65000, desc: "The cursed king himself, transformed into a golden fish for eternity. Everything it touches turns to gold. It is the loneliest fish in the sea." },
        { name: "Sunken Cathedral Ray", xp: 135000, gold: 67500, desc: "A massive ray with markings resembling stained glass windows. Light shines through it in beautiful patterns. It is a swimming sanctuary." },
        { name: "Vault Guardian Golem", xp: 145000, gold: 72500, desc: "An unbreakable construct that guards the city's greatest treasure. It has stood watch for a thousand years. It fights with mechanical perfection." },
        { name: "The Eternal Engine (Shark)", xp: 150000, gold: 75000, desc: "A shark that never stops moving. It is powered by an infinite energy source." },
        { name: "The Lost King (Marlin)", xp: 155000, gold: 77500, desc: "A marlin wearing a crown. It rules the sunken city." },
        { name: "The Golden Dragon (Serpent)", xp: 160000, gold: 80000, desc: "A serpent made of solid gold. It hoards treasure." }
      ],
      Mythic: [
        { name: "Atlantis Reborn Spirit", xp: 320000, gold: 160000, desc: "The spirit of the city, wishing to rise again. It is formed of memories and gold dust. To catch it is to hold a civilization." },
        { name: "The Golden Cog (Sunfish)", xp: 335000, gold: 167500, desc: "A massive, rotating sunfish that powers the currents of the entire ocean. It is the engine of the sunken city." },
        { name: "Time Keeper Turtle", xp: 350000, gold: 175000, desc: "A cosmic entity entwined with the city's central clock tower. It controls the flow of history in the ruins. It moves at its own pace." },
        { name: "The Philosopher's Stone (Jellyfish)", xp: 370000, gold: 185000, desc: "A jellyfish that grants immortality. It glows with a red light." },
        { name: "The Doomsday Machine (Kraken)", xp: 400000, gold: 200000, desc: "A mechanical kraken built to end the world. It sleeps in the deep." }
      ],
      Exotic: [
        { name: "Platinum-Gear Shark", xp: 1200000, gold: 600000, desc: "A shark made of pure platinum gears that spin silently. It was built to hunt down the enemies of the city." },
        { name: "Steam-Powered Serpent", xp: 1250000, gold: 625000, desc: "A serpent that releases massive clouds of steam. It boils the water around it, cooking its prey instantly." }
      ],
      Arcane: [
        { name: "The Eternal Machine (Whale)", xp: 6000000, gold: 3000000, desc: "A whale that contains the entire power grid of the city. It hums with the energy of a thousand storms." }
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
        { name: "Glass-Bead Tetra", xp: 2520, gold: 1260, desc: "Small, round, and perfectly clear. It looks like a marble drifting in the current." },
        { name: "Clear Water Goby", xp: 2550, gold: 1275, desc: "Completely invisible except for its eyes and internal organs. You often catch them by accident. They hide on the glass seabed." },
        { name: "Prism Guppy", xp: 2600, gold: 1300, desc: "Splits sunlight into a rainbow when it jumps. A favorite of children and collectors. It brings color to the clear water." },
        { name: "Sharp-Edge Guppy", xp: 2620, gold: 1310, desc: "Its fins are rigid and sharp. Handling a bucket of them is like handling a bucket of razor blades." },
        { name: "Sand Glass Flounder", xp: 2650, gold: 1325, desc: "Its skin mimics the texture of rough glass. It blends perfectly with the beach floor. Hard to spot until it moves." },
        { name: "Needle Fin Gar", xp: 2700, gold: 1350, desc: "A long, thin fish. Essentially a swimming needle. It hunts by impaling small prey. Avoid handling with bare hands." },
        { name: "Bottle-Neck Bass", xp: 2720, gold: 1360, desc: "Its body shape resembles an old glass bottle. It uses this camouflage to hide in trash." },
        { name: "Lens-Eye Chub", xp: 2750, gold: 1375, desc: "Its eyes are thick lenses that magnify its vision. It can see predators from miles away." },
        { name: "Mirror-Fin Minnow", xp: 2780, gold: 1390, desc: "Its fins are highly reflective. A school of them looks like a moving mirror." },
        { name: "Crystal-Scale Cod", xp: 2800, gold: 1400, desc: "Its scales are made of crystal. They ring when struck." },
        { name: "Fracture-Pattern Perch", xp: 2820, gold: 1410, desc: "Its skin pattern looks like cracked glass. It blends in with broken shards." }
      ],
      Uncommon: [
        { name: "Mirror Scale Carp", xp: 5000, gold: 2500, desc: "Predators attack their own reflection instead of the fish. It uses vanity as a defense mechanism. A clever survivor." },
        { name: "Razor Clam", xp: 5100, gold: 2550, desc: "It can slice through fishing nets with ease. Its shell is sharper than a surgeon's scalpel. Prized for its meat, if you can open it." },
        { name: "Window Pane Skate", xp: 5200, gold: 2600, desc: "You can look right through it to see the ocean floor. It glides like a pane of floating glass. A ghostly sight." },
        { name: "Mosaic Crab", xp: 5300, gold: 2650, desc: "Its shell looks like a stained-glass masterpiece. It builds its home from colored shards. Each crab has a unique pattern." },
        { name: "Glint Eye Walleye", xp: 5400, gold: 2700, desc: "Its eyes reflect light like a cat's, but much brighter. It hunts in the deep, clear trenches. The eyes are valuable gems." },
        { name: "Fiber-Glass Eel", xp: 5450, gold: 2725, desc: "Its body is fibrous and irritating to touch. It is strong and flexible." },
        { name: "Refraction Ray", xp: 5500, gold: 2750, desc: "It bends light around it to become invisible. You can only see it by the distortion in the water." },
        { name: "Prism-Back Turtle", xp: 5550, gold: 2775, desc: "Its shell is a giant prism. It creates rainbows wherever it swims." },
        { name: "Glass-Jaw Pike", xp: 5600, gold: 2800, desc: "Its jaw is transparent but incredibly strong. It strikes unseen." },
        { name: "Crystal-Claw Crab", xp: 5650, gold: 2825, desc: "Its claws are made of solid crystal. It pinches with extreme force." }
      ],
      Fine: [
        { name: "Obsidian Scalpel Tang", xp: 10500, gold: 5250, desc: "Black glass. Incredibly sharp and precise. It cuts coral with ease to find food. A dangerous beauty." },
        { name: "Fiber Optic Eel", xp: 10750, gold: 5375, desc: "Transmits light from its head to its tail. It glows with a pulsing data stream. It looks like living technology." },
        { name: "Magnifying Bass", xp: 11000, gold: 5500, desc: "Its body acts as a lens, magnifying things behind it. It distorts the water around it. Confuses predators with optics." },
        { name: "Fragile Beauty Betta", xp: 11250, gold: 5625, desc: "A fish so delicate it shatters if handled roughly. You must use a silk net. It is worth a fortune if intact." },
        { name: "Crystal Spine Stickleback", xp: 11500, gold: 5750, desc: "Shoots small crystal darts when threatened. It is a living porcupine of glass. Keep your distance." },
        { name: "Stained-Glass Discus", xp: 11750, gold: 5875, desc: "Its body is a beautiful mosaic of colored glass. It glows when back-lit." },
        { name: "Tempered-Glass Tuna", xp: 12000, gold: 6000, desc: "Its skin is incredibly tough. It can ram into rocks without breaking." },
        { name: "Molten-Core Grouper", xp: 12250, gold: 6125, desc: "Its insides glow like molten glass. It warms the water around it." },
        { name: "Glass-Slipper Fish", xp: 12500, gold: 6250, desc: "A fish shaped like a shoe. It is a fairytale creature come to life." }
      ],
      Rare: [
        { name: "Invisible Stalker Pike", xp: 25000, gold: 12500, desc: "You can't see it, you can only feel the tug on the line. It is the ultimate stealth predator. Catching it is a test of feel." },
        { name: "Rainbow Bridge Trout", xp: 26000, gold: 13000, desc: "A long fish that shimmers with all colors of the spectrum. Legend says it connects worlds. A sign of hope." },
        { name: "Diamond Hard Carp", xp: 27000, gold: 13500, desc: "Looks like glass, is hard as diamond. It breaks teeth and hooks. Only the strongest rods can handle it." },
        { name: "Kaleidoscope Discus", xp: 27500, gold: 13750, desc: "Its pattern changes geometrically as it swims. It is mesmerizing to watch. Staring too long causes dizziness." },
        { name: "Shattered King Salmon", xp: 28000, gold: 14000, desc: "Looks like a fish glued together from broken pieces. It moves in a disjointed, jerky fashion. A tragic figure." },
        { name: "Optical-Illusion Eel", xp: 28500, gold: 14250, desc: "It looks like an infinite loop. It is impossible to tell where it begins or ends." },
        { name: "Liquid-Glass Ray", xp: 29000, gold: 14500, desc: "It moves like a liquid. It can fit through any gap." },
        { name: "Crystal-Heart Shark", xp: 29500, gold: 14750, desc: "You can see its heart beating through its chest. It is a vulnerable spot." },
        { name: "Glass-Eye Squid", xp: 30000, gold: 15000, desc: "Its eyes are giant glass orbs. It sees everything." }
      ],
      Epic: [
        { name: "Glass Blower Puffer", xp: 60000, gold: 30000, desc: "A fish made of hot, semi-solid glass. It glows red with internal heat. Do not touch without protection." },
        { name: "Refractor Ray", xp: 62000, gold: 31000, desc: "Bends light so much it makes the water look warped. It hides in plain sight by distorting reality. A master of illusion." },
        { name: "Crystal Golem Fish", xp: 63000, gold: 31500, desc: "A lumbering construct of sharp shards. It walks on the bottom, crushing sand into glass. Unstoppable and heavy." },
        { name: "Mirror Dimension Ray", xp: 64000, gold: 32000, desc: "It seems to exist in two places at once. You must guess which one is real. A puzzle to catch." },
        { name: "Silhouette Shark", xp: 65000, gold: 32500, desc: "A shark made of pure shadow, visible only through the glass. It hunts in the reflection of the surface. A phantom killer." },
        { name: "The Glass Spire (Eel)", xp: 66000, gold: 33000, desc: "A massive eel that looks like a skyscraper. It towers over other fish." },
        { name: "The Prism Whale", xp: 67000, gold: 33500, desc: "A whale that shoots rainbows from its blowhole. It is a creature of pure joy." },
        { name: "The Shattered One (Kraken)", xp: 68000, gold: 34000, desc: "A kraken made of millions of glass shards. It is a storm of sharp edges." }
      ],
      Legendary: [
        { name: "Prism Soul Tuna", xp: 150000, gold: 75000, desc: "Pure white light given form. It shines brighter than the sun. To catch it is to catch a star." },
        { name: "Unbreakable Glass Koi", xp: 155000, gold: 77500, desc: "A glass fish that cannot be scratched or broken by any force. It represents resilience. It rings like a bell when tapped." },
        { name: "Sky Reflection Marlin", xp: 165000, gold: 82500, desc: "When you look at it, you see the sky, not the fish. It wears the heavens as camouflage. majestic and vast." },
        { name: "The Looking Glass (Ray)", xp: 170000, gold: 85000, desc: "A ray that shows you other worlds. It is a portal to elsewhere." },
        { name: "The Crystal Dragon (Serpent)", xp: 175000, gold: 87500, desc: "A dragon made of crystal. It breathes light." },
        { name: "The Invisible King (Shark)", xp: 180000, gold: 90000, desc: "A shark that is perfectly invisible. You can only track it by the water it displaces." }
      ],
      Mythic: [
        { name: "Lucid The Clear Whale", xp: 380000, gold: 190000, desc: "A massive entity of pure transparency. It is the ocean itself given form. You can see the entire ecosystem inside it." },
        { name: "The Prism Serpent", xp: 390000, gold: 195000, desc: "A giant serpent made of refracting light. It blinds all who look upon it. It guards the coastline from invaders." },
        { name: "Grand Mirror Sunfish", xp: 400000, gold: 200000, desc: "A fish that reflects the true nature of anyone who catches it. It shows you who you really are. A terrifying prospect for some." },
        { name: "The Glass Planet (Turtle)", xp: 420000, gold: 210000, desc: "A turtle whose shell is a glass dome containing a miniature world. It protects its tiny inhabitants." },
        { name: "The Final Reflection (Mirror-Fish)", xp: 450000, gold: 225000, desc: "A being of pure reflection. It mimics the angler perfectly. To catch it, you must catch yourself." }
      ],
      Exotic: [
        { name: "Diamond-Prism Shark", xp: 1350000, gold: 675000, desc: "A shark made of unbreakable diamonds. It refracts light into deadly lasers that cut through anything." },
        { name: "Shattered-Dimension Ray", xp: 1400000, gold: 700000, desc: "A ray that swims through the cracks in reality. It is a living glitch in the glass world." }
      ],
      Arcane: [
        { name: "The Mirror-World Kraken", xp: 6750000, gold: 3375000, desc: "A kraken that exists in the reflection of the ocean. It pulls ships into the mirror world, trapping them forever." }
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
        { name: "Vacuum Mouth Minnow", xp: 3020, gold: 1510, desc: "It constantly sucks in small particles of void matter. If you put your finger near it, you feel a slight pull." },
        { name: "Static Fin Guppy", xp: 3050, gold: 1525, desc: "Feels like touching an old TV screen. It crackles with void energy. Its existence is unstable." },
        { name: "Void Drip Blobfish", xp: 3100, gold: 1550, desc: "A blob of black goo that swims. It drips upwards towards the sky. Don't let it stain your clothes." },
        { name: "Glitch-Fin Tetra", xp: 3120, gold: 1560, desc: "Its fins flicker in and out of existence. It looks like a graphical error in the world." },
        { name: "Echo Guppy", xp: 3150, gold: 1575, desc: "Its splash makes no sound. It absorbs all noise around it. A silent swimmer." },
        { name: "Pale Drifter Cod", xp: 3200, gold: 1600, desc: "Bleached white by the radiation of the void. It looks sickly but is surprisingly strong. It drifts with the anti-gravity currents." },
        { name: "Shadow-Caster Chub", xp: 3220, gold: 1610, desc: "It casts a shadow even in complete darkness. It defies the laws of physics." },
        { name: "Inverted Tetra", xp: 3250, gold: 1625, desc: "It swims upside down and backwards. It confuses predators." },
        { name: "Void-Mouth Goby", xp: 3280, gold: 1640, desc: "Its mouth is a portal to nowhere. It eats endlessly but never grows." },
        { name: "Anti-Gravity Eel", xp: 3300, gold: 1650, desc: "It floats in the air above the water. It swims through the mist." },
        { name: "Dark-Matter Dace", xp: 3320, gold: 1660, desc: "It is incredibly heavy for its size. It sinks like a stone." }
      ],
      Uncommon: [
        { name: "Gravity Eel", xp: 6000, gold: 3000, desc: "Swims upside down because it ignores gravity. It disorients fishermen by pulling in wrong directions. Hard to land." },
        { name: "Warped Bass", xp: 6150, gold: 3075, desc: "Its proportions are all wrong. One eye is huge, the other tiny. It looks like a drawing gone wrong." },
        { name: "Phase Crab", xp: 6300, gold: 3150, desc: "It phases in and out of reality. It can walk through the walls of your bucket. Hard to keep contained." },
        { name: "Hollow Bone Snapper", xp: 6450, gold: 3225, desc: "You can see right through its ribcage. It is empty inside, yet it lives. A creature of paradox." },
        { name: "Whispering Ray", xp: 6600, gold: 3300, desc: "You hear voices when you hold it. It whispers secrets of the void. Do not listen too closely." },
        { name: "Null-Zone Perch", xp: 6700, gold: 3350, desc: "It creates a zone of silence around it. No sound can exist near it." },
        { name: "Void-Scale Carp", xp: 6800, gold: 3400, desc: "Its scales are made of void crystal. They absorb magic." },
        { name: "Entropy Flounder", xp: 6900, gold: 3450, desc: "It ages rapidly and then grows young again. It is stuck in a time loop." },
        { name: "Chaos-Fin Pike", xp: 7000, gold: 3500, desc: "Its fins move randomly and independently. It is unpredictable." },
        { name: "Abyssal-Eye Catfish", xp: 7100, gold: 3550, desc: "It has eyes all over its body. It sees everything." }
      ],
      Fine: [
        { name: "Event Horizon Crab", xp: 13000, gold: 6500, desc: "Nothing escapes its claws. Once it grabs the bait, it never lets go. A stubborn opponent." },
        { name: "Purple Haze Tuna", xp: 13500, gold: 6750, desc: "Glows with a sickly purple light. It leaves a trail of mist behind it. Eating it is not recommended." },
        { name: "Anti Matter Trout", xp: 14000, gold: 7000, desc: "Don't let it touch normal matter directly. It tingles and sparks when handled. Keep it in a containment field." },
        { name: "Rift Jumper Salmon", xp: 14250, gold: 7125, desc: "Teleports short distances when frightened. It jumps through holes in reality. Very frustrating to net." },
        { name: "Abyssal Starfish", xp: 14500, gold: 7250, desc: "A starfish that sucks light from the surroundings. It creates a pocket of darkness. It clings to the void's edge." },
        { name: "Singularity Snapper", xp: 14750, gold: 7375, desc: "It collapses into a single point when threatened. It disappears." },
        { name: "Void-Pulse Betta", xp: 15000, gold: 7500, desc: "It pulses with dark energy. It disrupts electronics." },
        { name: "Dark-Energy Eel", xp: 15250, gold: 7625, desc: "It feeds on dark energy. It is faster than light." },
        { name: "Null-Void Grouper", xp: 15500, gold: 7750, desc: "It is a hole in the water. It eats light." }
      ],
      Rare: [
        { name: "Black Hole Bass", xp: 30000, gold: 15000, desc: "Immensely heavy. It has its own gravitational pull. Reeling it in feels like pulling a planet." },
        { name: "Forgotten One Flounder", xp: 31000, gold: 15500, desc: "As soon as you put it away, you forget what it looked like. A fish that erases memories." },
        { name: "Void Walker Mudskipper", xp: 32000, gold: 16000, desc: "A fish with legs that walks on nothingness. It can cross the gap between worlds. It fears nothing." },
        { name: "Null Space Shark", xp: 33000, gold: 16500, desc: "Its mouth leads to another dimension. Anything it eats disappears from this reality. A living portal." },
        { name: "Entropy Eel", xp: 35000, gold: 17500, desc: "Everything around it decays rapidly. Fishing lines rot, hooks rust. You must be fast." },
        { name: "Dimensional-Rift Ray", xp: 36000, gold: 18000, desc: "It cuts holes in dimensions with its fins. It travels between worlds." },
        { name: "The Unseen (Catfish)", xp: 37000, gold: 18500, desc: "It is invisible to the naked eye. You must use a special scope to see it." },
        { name: "Void-Caller Carp", xp: 38000, gold: 19000, desc: "Its call summons creatures from the void. Be careful." },
        { name: "The Emptiness (Gar)", xp: 39000, gold: 19500, desc: "It is hollow inside. It feels like nothing." }
      ],
      Epic: [
        { name: "Cosmic Horror Fry", xp: 75000, gold: 37500, desc: "Even as a baby, it is terrifying to behold. It has too many eyes. A glimpse of the madness to come." },
        { name: "Eldritch Tentacle", xp: 77500, gold: 38750, desc: "Just a severed tentacle that is still alive and swimming. It grips the rod with immense strength. Where is the rest of it?" },
        { name: "Observer Eye-Fish", xp: 80000, gold: 40000, desc: "A giant floating eye. It watches you fish. It judges your technique. Unnerving." },
        { name: "Reality Tear Ray", xp: 82500, gold: 41250, desc: "A flat fish that looks like a rip in the fabric of the world. It shows the static underneath reality." },
        { name: "Vacuum Feeder Whale", xp: 85000, gold: 42500, desc: "It sucks in water with the force of a jet engine. It consumes void matter. A gentle giant of the abyss." },
        { name: "The Abyss (Shark)", xp: 87500, gold: 43750, desc: "A shark made of pure darkness. It is the absence of light." },
        { name: "The Void-Walker (Turtle)", xp: 90000, gold: 45000, desc: "A turtle that walks through the void. It carries a galaxy on its back." },
        { name: "The End (Eel)", xp: 92500, gold: 46250, desc: "An eel that represents the end of time. It moves slowly towards the heat death of the universe." }
      ],
      Legendary: [
        { name: "Avatar of Nothing", xp: 180000, gold: 90000, desc: "A silhouette cut out of reality. It is a hole in the shape of a fish. It represents the void's hunger." },
        { name: "End of Days Oarfish", xp: 190000, gold: 95000, desc: "A fish that brings a sense of impending doom. Its arrival signals the collapse of the coast. A harbinger." },
        { name: "Singularity Serpent", xp: 200000, gold: 100000, desc: "A snake made of compressed gravity. It crushes the water around it. Dense and unstoppable." },
        { name: "The Void King (Whale)", xp: 210000, gold: 105000, desc: "The ruler of the void. It commands the darkness." },
        { name: "The Anti-God (Kraken)", xp: 220000, gold: 110000, desc: "A kraken that opposes all creation. It seeks to undo existence." },
        { name: "The Null-Point (Sunfish)", xp: 230000, gold: 115000, desc: "A sunfish that is the center of a black hole. It pulls everything towards it." }
      ],
      Mythic: [
        { name: "Azathoth's Dream Carp", xp: 450000, gold: 225000, desc: "If this fish wakes up, existence might end. Keep it quiet. It swims in the slumber of a god." },
        { name: "The Event Horizon (Ray)", xp: 475000, gold: 237500, desc: "A ray that is so black it absorbs all light. Looking at it feels like falling. It is the edge of the universe." },
        { name: "Void Mother Whale", xp: 500000, gold: 250000, desc: "She spawns the nightmares that swim in the deep. Her song is silence. The queen of the empty dark." },
        { name: "The Entropy (Dragon)", xp: 525000, gold: 262500, desc: "A dragon made of pure chaos. It destroys everything it touches." },
        { name: "The Final Silence (Leviathan)", xp: 550000, gold: 275000, desc: "A being that brings absolute silence. It is the end of all sound." }
      ],
      Exotic: [
        { name: "Black-Hole Maw Shark", xp: 1650000, gold: 825000, desc: "Its jaws are a literal event horizon. Anything it bites is erased from existence entirely." },
        { name: "Anti-Matter Leviathan", xp: 1700000, gold: 850000, desc: "A massive creature composed of unstable anti-matter. It swims through the void, annihilating rogue asteroids." }
      ],
      Arcane: [
        { name: "The Void-Eater (Whale)", xp: 8250000, gold: 4125000, desc: "A cosmic whale that consumes entire dead stars. It is the janitor of the universe." }
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
        { name: "Solder-Blob Chub", xp: 3900, gold: 1950, desc: "A lump of soft metal that swims. It melts slightly if you hold it too long." },
        { name: "Tin-Foil Tetra", xp: 3950, gold: 1975, desc: "Its scales are thin sheets of aluminum. It crinkles when it swims." },
        { name: "Mercury Minnow", xp: 4000, gold: 2000, desc: "A fluid fish that loses its shape when taken out of the river. It becomes a puddle of silver. Keep it in a glass jar." },
        { name: "Screw-Driver Loach", xp: 4020, gold: 2010, desc: "Its nose is shaped like a flathead screwdriver. It wedges itself into cracks in the iron riverbed." },
        { name: "Wire-Coil Eel", xp: 4050, gold: 2025, desc: "It looks like a spring that came loose from a machine. It bounces when it hits the deck." },
        { name: "Ball Bearing Guppy", xp: 4100, gold: 2050, desc: "Perfectly round and silver. It rolls rather than flops on the deck. It clicks when it moves." },
        { name: "Hex-Nut Minnow", xp: 4120, gold: 2060, desc: "Shaped like a piece of hardware. It threads itself onto underwater bolts to hide." },
        { name: "Scrap-Metal Dace", xp: 4150, gold: 2075, desc: "It camouflages itself as industrial waste. Its skin is rough and jagged." },
        { name: "Lead Belly Catfish", xp: 4200, gold: 2100, desc: "Incredibly heavy for its size. Don't drop it on your toe; it will break bone. A dense bottom feeder." },
        { name: "Rusty-Nail Goby", xp: 4250, gold: 2125, desc: "Covered in orange rust. It gives Tetanus to anything that bites it." },
        { name: "Thermometer Eel", xp: 4300, gold: 2150, desc: "A red stripe down its side expands and contracts with the temperature. Useful for checking the weather. Warm to the touch." },
        { name: "Liquid Silver Carp", xp: 4400, gold: 2200, desc: "Beautiful but deadly toxic. Handle with tongs. It flows like water in your hands. A dangerous prize." }
      ],
      Uncommon: [
        { name: "Galvanized Goby", xp: 7800, gold: 3900, desc: "Coated in zinc to prevent rust. It survives in the most corrosive parts of the canal." },
        { name: "Copper-Wire Catfish", xp: 7900, gold: 3950, desc: "Its whiskers are conductive wires. It shocks prey with static electricity." },
        { name: "Magnetic Ray", xp: 8000, gold: 4000, desc: "It sticks to the hull of the boat. Hard to pry off. It interferes with compasses." },
        { name: "Tungsten Tetra", xp: 8100, gold: 4050, desc: "Small but incredibly dense. A bucket of them weighs a ton." },
        { name: "Rust Proof Bass", xp: 8200, gold: 4100, desc: "Its scales are made of a stainless chrome alloy. It never tarnishes, staying forever shiny. A symbol of endurance." },
        { name: "Mercury-Vapor Trout", xp: 8300, gold: 4150, desc: "It releases toxic fumes when caught. Hold your breath." },
        { name: "Needle Bearing Gar", xp: 8400, gold: 4200, desc: "Its mouth is filled with thousands of tiny, rolling metal balls. It grinds its food rather than biting. Makes a terrible noise." },
        { name: "Heavy Metal Crab", xp: 8600, gold: 4300, desc: "Its shell is solid iron. It walks on the riverbed, unable to swim. It clanks when it moves." },
        { name: "Amalgam Fish", xp: 8800, gold: 4400, desc: "Absorbs other metals it touches, creating a patchwork skin of gold, copper, and iron. Every catch looks different." },
        { name: "Battery-Acid Betta", xp: 9000, gold: 4500, desc: "Its fins drip with corrosive acid. It burns through nets." }
      ],
      Fine: [
        { name: "Living Mirror Dory", xp: 18000, gold: 9000, desc: "A flat fish that reflects reality with 100% clarity. Looking at it is like looking in a high-quality mirror. It blinds predators with reflection." },
        { name: "Fluid Terminator Pike", xp: 18500, gold: 9250, desc: "It can reshape itself into a spike to attack. It mimics other fish to get close. A relentless machine-like hunter." },
        { name: "Bismuth Crystal Bass", xp: 18800, gold: 9400, desc: "Its scales grow in geometric, rainbow-colored crystals. A stunning natural formation." },
        { name: "Quicksilver Serpent", xp: 19000, gold: 9500, desc: "Moves through the heavy liquid with frightening speed. It is a silver streak in the grey river. Slippery and elusive." },
        { name: "Dense Bone Tuna", xp: 19500, gold: 9750, desc: "Weighs as much as a cannonball. It uses its momentum to smash through obstacles. A juggernaut of the canal." },
        { name: "Sterling Silver Pike", xp: 19800, gold: 9900, desc: "Made of 92.5% pure silver. It tarnishes quickly if not polished." },
        { name: "Chrome Dome Sheepshead", xp: 20000, gold: 10000, desc: "Its head is a polished dome of vanadium steel. It bashes open metal shells. Reflects the sky perfectly." },
        { name: "Gold-Leaf Gar", xp: 20500, gold: 10250, desc: "Covered in incredibly thin sheets of gold. It flakes if you touch it." },
        { name: "Platinum-Plated Perch", xp: 21000, gold: 10500, desc: "Heavy, valuable, and non-reactive. It is the noble metal of the fish world." }
      ],
      Rare: [
        { name: "Alchemist Arowana", xp: 45000, gold: 22500, desc: "A golden fish that swims in mercury. A symbol of perfection. It represents the successful transmutation of metal." },
        { name: "Ferro Fluid Beast", xp: 46000, gold: 23000, desc: "It spikes up aggressively when near a magnet. It changes shape constantly. A fascinating display of physics." },
        { name: "Titanium Tooth Pike", xp: 47000, gold: 23500, desc: "Can chew through the boat's anchor chain. Its teeth are unbreakable. Do not put your fingers near it." },
        { name: "Molten Core Grouper", xp: 48000, gold: 24000, desc: "Still hot from the forge of the earth. It glows red in the silver river. Keep it in a cooling tank." },
        { name: "Iridium-Scale Carp", xp: 49000, gold: 24500, desc: "The densest fish in existence. A small one requires a crane to lift." },
        { name: "Silver Surfer Ray", xp: 50000, gold: 25000, desc: "A flat ray that glides on top of the mercury surface. It surfs the heavy waves. Effortless and cool." },
        { name: "Molten-Slag Shark", xp: 52000, gold: 26000, desc: "A shark made of industrial waste and molten metal. It smokes in the water." },
        { name: "Cobalt-Blue Catfish", xp: 54000, gold: 27000, desc: "A vibrant blue metal fish. It is magnetic and highly prized for alloys." },
        { name: "Magnet-Core Ray", xp: 56000, gold: 28000, desc: "Its body is a powerful electromagnet. It can pull the rod out of your hands." }
      ],
      Epic: [
        { name: "Liquid Metal Organism", xp: 110000, gold: 55000, desc: "Liquid metal that mimics the shape of a fish. It seems intelligent. It watches you with liquid eyes." },
        { name: "Iron Heart Tuna", xp: 115000, gold: 57500, desc: "A pulsing mechanical organ found swimming in the depths. It drives the flow of the river. The engine of the canal." },
        { name: "The Iron Giant (Grouper)", xp: 118000, gold: 59000, desc: "A grouper the size of a tank. It is covered in heavy iron plating. It cannot be harpooned." },
        { name: "Lodestone Leviathan", xp: 120000, gold: 60000, desc: "It pulls all nearby ships towards it with magnetic force. It crushes them against its metallic hide. A walking magnet." },
        { name: "Argentum King Salmon", xp: 122000, gold: 61000, desc: "The ruler of the silver river. Crowned in platinum scales. It shines with a blinding white light." },
        { name: "The Blast-Furnace (Shark)", xp: 124000, gold: 62000, desc: "Its mouth is an open furnace. It consumes metal and melts it down." },
        { name: "Toxic Avenger Mutator", xp: 125000, gold: 62500, desc: "A mutated beast born from the ultimate pollution. It grows extra limbs and eyes. A sad, angry creature." },
        { name: "The Foundry (Whale)", xp: 130000, gold: 65000, desc: "A whale that acts as a swimming factory. It produces smaller mechanical fish." }
      ],
      Legendary: [
        { name: "Philosopher Legacy Koi", xp: 280000, gold: 140000, desc: "A fish inscribed with the formula for eternal life. Alchemists would kill for it. It holds the ultimate secret." },
        { name: "Mercurial God Eel", xp: 290000, gold: 145000, desc: "It is everywhere and nowhere. It flows like time. It changes its mind and its shape constantly." },
        { name: "Grand Alloy Sturgeon", xp: 300000, gold: 150000, desc: "A creature made of a metal not found on the periodic table. It is indestructible and heavier than a star." },
        { name: "The Golden Gear (Sunfish)", xp: 320000, gold: 160000, desc: "A sunfish shaped like a massive gear. It turns the mechanism of the world." },
        { name: "The Platinum Dragon (Arowana)", xp: 350000, gold: 175000, desc: "A dragon made of pure platinum. It is the most valuable catch in history." },
        { name: "The World Engine (Mechanical Fish)", xp: 380000, gold: 190000, desc: "A fish that powers the planet's rotation. If it stops, the world stops." }
      ],
      Mythic: [
        { name: "Omega Isotope Ray", xp: 650000, gold: 325000, desc: "Radioactive and unstable. Catching it causes geiger counters to explode. It glows with a dangerous blue light." },
        { name: "Silver Sea Serpent", xp: 700000, gold: 350000, desc: "A snake made of pure liquid starlight and mercury. It spans the length of the canal. A god of metal." },
        { name: "The Alchemist's Dream (Gold Fish)", xp: 750000, gold: 375000, desc: "A fish made of living, breathing gold. It grants infinite wealth." },
        { name: "The Heavy Metal God (Guitar-Fish)", xp: 800000, gold: 400000, desc: "A fish shaped like a guitar. Its roar is a power chord that shatters glass." },
        { name: "The Mercurial Sphere (Puffer)", xp: 900000, gold: 450000, desc: "A perfect sphere of liquid metal. It has its own gravity." }
      ],
      Exotic: [
        { name: "Nanite Swarm Piranha", xp: 2700000, gold: 1350000, desc: "A single entity composed of billions of microscopic machines. It devours metal, flesh, and time itself." },
        { name: "Ferro-Magnetic Hydra", xp: 2800000, gold: 1400000, desc: "A multi-headed beast formed from magnetized iron filings. Cut off one head, and the metal reforms two more." }
      ],
      Arcane: [
        { name: "The Living Mercury (Kraken)", xp: 13500000, gold: 6750000, desc: "A horror made of pure, toxic quicksilver. It mimics the shape of a Kraken to terrify sailors, but it has no true form." }
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
        { name: "Draft Drifter Flounder", xp: 5400, gold: 2700, desc: "It floats on thermal updrafts without moving a muscle. It is the laziest fish in the sky. Flat and wide like a kite." },
        { name: "Cotton-Ball Chub", xp: 5500, gold: 2750, desc: "Looks exactly like a cotton ball. Birds often mistake it for nesting material." },
        { name: "Mist-Whisp Minnow", xp: 5600, gold: 2800, desc: "Made of thin mist. It evaporates in direct sunlight." },
        { name: "Breeze-Rider Guppy", xp: 5700, gold: 2850, desc: "It catches the slightest breeze with its large fins. It sails through the air." },
        { name: "Cirrus-Cloud Loach", xp: 5800, gold: 2900, desc: "Long and thin like a cirrus cloud. It swims in the highest, coldest air." },
        { name: "Vapor-Trail Eel", xp: 5900, gold: 2950, desc: "Leaves a long white trail behind it as it swims. It mimics a jet plane." },
        { name: "Dew-Point Dace", xp: 6000, gold: 3000, desc: "It forms from condensing water vapor in the morning. It disappears at noon." },
        { name: "Sky-High Betta", xp: 6100, gold: 3050, desc: "It flares its fins to look like a small parachute. It descends slowly." }
      ],
      Uncommon: [
        { name: "Lightning Bug Fish", xp: 10000, gold: 5000, desc: "Charges with static electricity as it flies through clouds. It glows yellow in storms. A shocking catch." },
        { name: "Tornado Tail Tuna", xp: 10250, gold: 5125, desc: "Its tail spins rapidly, creating a mini-cyclone for propulsion. It bores through cloud banks like a drill." },
        { name: "Cloud Ray", xp: 10500, gold: 5250, desc: "A manta ray that glides through the air as if it were water. It is silent and graceful." },
        { name: "Hail Stone Crab", xp: 10750, gold: 5375, desc: "Falls from the upper atmosphere. Hard as ice and cold to the touch. It survives the fall every time." },
        { name: "Mist Walker Mudskipper", xp: 11000, gold: 5500, desc: "Uses vaporous legs to scuttle across dense cloud banks. It can walk on smoke." },
        { name: "Thermal-Draft Bass", xp: 11250, gold: 5625, desc: "It seeks out rising warm air currents. It gains altitude without effort." },
        { name: "Glider-Fin Trout", xp: 11500, gold: 5750, desc: "Its pectoral fins are rigid wings. It can glide for miles." },
        { name: "Cumulus Carp", xp: 11750, gold: 5875, desc: "A large, fluffy fish. It looks like a storm cloud brewing." },
        { name: "Kite-Fin Flounder", xp: 12000, gold: 6000, desc: "It flies on a string of silk it spins itself. It mimics a kite." },
        { name: "Propeller-Tail Pike", xp: 12250, gold: 6125, desc: "Its tail acts like a propeller. It buzzes like a small aircraft." }
      ],
      Fine: [
        { name: "Stratosphere Salmon", xp: 22000, gold: 11000, desc: "Migrates vertically, swimming miles up into the thin air. It spawns at the edge of space." },
        { name: "Solar Winged Bass", xp: 23000, gold: 11500, desc: "Its fins act as solar panels, absorbing high-altitude radiation. It is warm and energetic." },
        { name: "Ozone Eater Carp", xp: 24000, gold: 12000, desc: "Smells crisp and sharp, like the air after a storm. It cleans the atmosphere of pollutants." },
        { name: "Thunderhead Shark", xp: 24500, gold: 12250, desc: "Dark grey and menacing. It hunts inside storm clouds, striking with the lightning. The terror of the skies." },
        { name: "Aerodynamic Barracuda", xp: 25000, gold: 12500, desc: "Sleek, pointed, and built for Mach-1 speeds. It breaks the sound barrier when it dives." },
        { name: "Lightning-Rod Gar", xp: 25500, gold: 12750, desc: "It attracts lightning strikes to charge its energy. It glows with blue power." },
        { name: "Ozone-Layer Ray", xp: 26000, gold: 13000, desc: "It protects the world from UV radiation. It swims in the upper atmosphere." },
        { name: "Aurora-Scale Salmon", xp: 26500, gold: 13250, desc: "Its scales shimmer with the northern lights. A breathtaking sight." },
        { name: "High-Pressure Perch", xp: 27000, gold: 13500, desc: "It lives in the densest, lowest clouds. It can withstand crushing barometric pressure." }
      ],
      Rare: [
        { name: "Angel Fish (Literal)", xp: 55000, gold: 27500, desc: "A fish with a halo and white feathered wings. It judges you silently. Releasing it grants a blessing." },
        { name: "Vapor Specter Ghostfish", xp: 56000, gold: 28000, desc: "A ghost made of mist. It passes through the net unless charmed. Spooky and sad." },
        { name: "Skylark Carp", xp: 57000, gold: 28500, desc: "A legendary hybrid of a lark and a carp. It sings beautifully at sunrise. A joy to behold." },
        { name: "Gravity Defier Puffer", xp: 58000, gold: 29000, desc: "It naturally floats upwards. If you let go, it falls into space. Keep a lid on your bucket." },
        { name: "Cumulonimbus King Grouper", xp: 60000, gold: 30000, desc: "The ruler of the storm clouds. Massive and booming. Its mood dictates the weather." },
        { name: "Storm-Chaser Shark", xp: 62000, gold: 31000, desc: "It follows tornadoes and hurricanes. It feeds on the destruction." },
        { name: "Thunderbolt Catfish", xp: 64000, gold: 32000, desc: "Its whiskers release thunderclaps. It is deafeningly loud." },
        { name: "Jet-Stream Tuna", xp: 66000, gold: 33000, desc: "It swims in the jet stream current. It circles the globe in a day." },
        { name: "Anti-Gravity Goldfish", xp: 68000, gold: 34000, desc: "It swims upside down on the ceiling of clouds. It ignores gravity completely." }
      ],
      Epic: [
        { name: "Hurricane Eye Carp", xp: 140000, gold: 70000, desc: "A peaceful, calm fish found only in the center of chaos. It brings stillness to the storm." },
        { name: "Zephyr Steed Seahorse", xp: 142000, gold: 71000, desc: "A horse-headed fish made of wind. It gallops across the sky. The fastest mount in the heavens." },
        { name: "Atmospheric Beast", xp: 145000, gold: 72500, desc: "A creature so large it looks like a cloud formation. Sailors often mistake it for a storm front." },
        { name: "Pegasus Fin Tuna", xp: 148000, gold: 74000, desc: "Majestic, winged, and untamable. It soars higher than any bird. A legend of the air." },
        { name: "Sky Whale Calf", xp: 150000, gold: 75000, desc: "A baby whale that floats. It's still the size of a bus. It plays in the clouds like a puppy." },
        { name: "The Hindenburg (Puffer)", xp: 155000, gold: 77500, desc: "A massive, hydrogen-filled pufferfish. Highly flammable." },
        { name: "The Cloud-Castle Turtle", xp: 160000, gold: 80000, desc: "A turtle with a castle made of clouds on its shell. Giants live there." },
        { name: "The Storm-Front (Whale)", xp: 165000, gold: 82500, desc: "A whale that brings the storm. It is a living weather system." }
      ],
      Legendary: [
        { name: "Gryphon Flying Fish", xp: 350000, gold: 175000, desc: "The king of the sky-ocean. Gold feathers and lion claws. It guards the floating islands." },
        { name: "Storm Bringer Eel", xp: 360000, gold: 180000, desc: "Catching this fish summons a permanent thunderstorm. It is the catalyst of typhoons." },
        { name: "Aurora Borealis Ribbonfish", xp: 380000, gold: 190000, desc: "A living ribbon of light that dances in the upper atmosphere. It is made of pure solar wind." },
        { name: "The Sun-Chariot (Marlin)", xp: 400000, gold: 200000, desc: "A marlin that pulls the sun across the sky. It burns with holy fire." },
        { name: "The North Wind (Wolf-fish)", xp: 420000, gold: 210000, desc: "The embodiment of the cold north wind. It brings winter." },
        { name: "The Sky-Serpent (Dragon)", xp: 450000, gold: 225000, desc: "A dragon made of clouds and wind. It rules the sky." }
      ],
      Mythic: [
        { name: "Uranus Sky Father", xp: 800000, gold: 400000, desc: "A face in the clouds that has taken physical form. The god of the sky itself." },
        { name: "Great White Cloud Whale", xp: 900000, gold: 450000, desc: "Moby Dick of the skies. It swims through the jet stream. It swallows storms whole." },
        { name: "Zeus's Thunderbolt (Eel)", xp: 950000, gold: 475000, desc: "A bolt of living lightning thrown by a god. It crackles with divine power." },
        { name: "The Atmosphere (Whale)", xp: 1000000, gold: 500000, desc: "The entire atmosphere given consciousness. It protects the world." },
        { name: "The Stratosphere Leviathan", xp: 1100000, gold: 550000, desc: "A beast that lives on the edge of space. It eats meteors." }
      ],
      Exotic: [
        { name: "Solar Flare Phoenix-Fish", xp: 3200000, gold: 1600000, desc: "It swims through the solar winds, absorbing the heat of the sun. It is reborn every time it dies." },
        { name: "Stratosphere Titan Whale", xp: 3400000, gold: 1700000, desc: "A whale so large it can block out the sun. It grazes on satellites and space debris." }
      ],
      Arcane: [
        { name: "The Sky-Father (Leviathan)", xp: 16000000, gold: 8000000, desc: "An entity of pure wind and sky. It is the grandfather of all storms, watching over the world from the highest peak." }
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
        { name: "Second-Hand Guppy", xp: 6900, gold: 3450, desc: "It twitches once every second. It is used to calibrate clocks." },
        { name: "Future Echo Ghostfish", xp: 7000, gold: 3500, desc: "A blurry fish that hasn't quite arrived in this timeline yet. It is hard to grab because it isn't fully here." },
        { name: "Millisecond Minnow", xp: 7100, gold: 3550, desc: "It lives its entire life in a fraction of a second. You need a high-speed camera to see it." },
        { name: "Hour-Hand Loach", xp: 7200, gold: 3600, desc: "It moves incredibly slowly. It takes an hour to swim a foot." },
        { name: "Alarm-Clock Chub", xp: 7300, gold: 3650, desc: "It vibrates loudly at a specific time every day. Wake up!" },
        { name: "Calendar Carp", xp: 7400, gold: 3700, desc: "Its scales change pattern every day of the month. Useful for keeping track of dates." },
        { name: "Stopwatch Betta", xp: 7500, gold: 3750, desc: "You can start and stop its movement by tapping the glass. A toy for time travelers." },
        { name: "Pause-Button Loach", xp: 7600, gold: 3800, desc: "It can freeze itself in time for protection. Predators just bump into it." }
      ],
      Uncommon: [
        { name: "Hourglass Flounder", xp: 13000, gold: 6500, desc: "Shaped like an hourglass. Sand flows inside its transparent body. When the sand runs out, it flips over." },
        { name: "Retrograde Eel", xp: 13250, gold: 6625, desc: "It swims backward to go forward. Confusing to reel in. It lives in reverse time." },
        { name: "Prehistoric Pike", xp: 13500, gold: 6750, desc: "An extinct species that is alive and well in these rapids. It has teeth from the Jurassic era." },
        { name: "Cyber Scale Bass", xp: 13750, gold: 6875, desc: "A fish from the future with robotic enhancements. It has a laser sight on its head." },
        { name: "Time Skip Trout", xp: 14000, gold: 7000, desc: "It teleports a few seconds into the future to avoid the net. You have to predict where it will be." },
        { name: "Time-Loop Trout", xp: 14250, gold: 7125, desc: "It swims the same circle forever. It is trapped in a loop." },
        { name: "Rusty-Gear Catfish", xp: 14500, gold: 7250, desc: "A fish made of old clock gears. It creaks when it swims." },
        { name: "Future-Sight Bass", xp: 14750, gold: 7375, desc: "It dodges hooks before you even cast. It knows what you are going to do." },
        { name: "Past-Life Perch", xp: 15000, gold: 7500, desc: "It remembers being a human in a past life. It looks at you with sad eyes." },
        { name: "Slow-Motion Salmon", xp: 15250, gold: 7625, desc: "It fights the current in slow motion. It looks epic." }
      ],
      Fine: [
        { name: "Pendulum Ray", xp: 28000, gold: 14000, desc: "Swings back and forth in the current with hypnotic regularity. It regulates the flow of the river." },
        { name: "Ancient Trilobite", xp: 28500, gold: 14250, desc: "A living relic from the dawn of time. It crawls on the riverbed. A favorite of paleontologists." },
        { name: "Neon Future Bass", xp: 29000, gold: 14500, desc: "Glows with LED lights and hums with synthesized music. It brings the party from 3000 AD." },
        { name: "Stasis Carp", xp: 29500, gold: 14750, desc: "Frozen in a block of time. It doesn't age or eat. It is a statue that breathes." },
        { name: "Wormhole Weaver Eel", xp: 30000, gold: 15000, desc: "Creates tiny portals to escape predators. It stitches space-time together." },
        { name: "Quantum-Leap Pike", xp: 30500, gold: 15250, desc: "It exists in multiple places at once until observed. Schrödinger's fish." },
        { name: "Paradox-Fin Gar", xp: 31000, gold: 15500, desc: "It kills its own grandfather and still exists. It defies logic." },
        { name: "Butterfly-Effect Betta", xp: 31500, gold: 15750, desc: "A flap of its fins causes a hurricane on the other side of the world. Chaos theory in action." },
        { name: "Time-Dilation Ray", xp: 32000, gold: 16000, desc: "Time moves slower near this fish. You age less while holding it." }
      ],
      Rare: [
        { name: "Anachronism Coelacanth", xp: 70000, gold: 35000, desc: "A fish that shouldn't exist in this dimension. It disrupts the local timeline." },
        { name: "Grandfather Clock Fish", xp: 71000, gold: 35500, desc: "Large, wooden, and chimes every hour. It keeps the time for the river inhabitants." },
        { name: "Primordial Soup Blobfish", xp: 72000, gold: 36000, desc: "A blob of raw evolutionary potential. It can become anything given enough time." },
        { name: "Terminator Barracuda", xp: 73000, gold: 36500, desc: "Sent back in time to cut your fishing line. It will not stop until the mission is complete." },
        { name: "Temporal Paradox Perch", xp: 75000, gold: 37500, desc: "If you catch it, you might erase your own existence. It is a risky catch for a brave angler." },
        { name: "Relativity Shark", xp: 77000, gold: 38500, desc: "The faster it swims, the heavier it gets. E=mc^2 with teeth." },
        { name: "Wormhole Walleye", xp: 79000, gold: 39500, desc: "It uses wormholes to travel instantly. It is impossible to trap." },
        { name: "Event-Horizon Eel", xp: 81000, gold: 40500, desc: "Once you see it, it's too late. It pulls you into a singularity." },
        { name: "Tachyonic Tuna", xp: 83000, gold: 41500, desc: "It moves faster than light. It arrives before it leaves." }
      ],
      Epic: [
        { name: "Ouroboros Eel", xp: 170000, gold: 85000, desc: "An eel eating its own tail, symbolizing infinity. It has no beginning and no end." },
        { name: "Jurassic Shark (Megalodon)", xp: 175000, gold: 87500, desc: "A megalodon that wandered into the time stream. It is the apex predator of history." },
        { name: "Time Lord Sturgeon", xp: 178000, gold: 89000, desc: "Moves through time with intelligence and purpose. It watches over the timeline." },
        { name: "Flux Capacitor Ray", xp: 180000, gold: 90000, desc: "It needs to hit 88mph to be caught. It leaves trails of fire in the water." },
        { name: "Entropic Decay Salmon", xp: 180000, gold: 90000, desc: "A fish that ages rapidly from birth to death in seconds. To catch it is to catch a moment." },
        { name: "The Time-Capsule (Turtle)", xp: 185000, gold: 92500, desc: "Buried in the mud for eons. It contains artifacts from the past." },
        { name: "The Big Ben (Whale)", xp: 190000, gold: 95000, desc: "A whale that chimes like a massive bell. It keeps time for the universe." },
        { name: "The Entropy (Shark)", xp: 195000, gold: 97500, desc: "It brings disorder and chaos. It accelerates the end of the universe." }
      ],
      Legendary: [
        { name: "Father Time Catfish", xp: 450000, gold: 225000, desc: "Has a long white beard and carries a scythe-like fin. He is old as the river itself." },
        { name: "Big Bang Guppy", xp: 475000, gold: 237500, desc: "A small fish containing the energy of the universe's creation. It sparkles with infinite potential." },
        { name: "End of Time Voidfish", xp: 500000, gold: 250000, desc: "White, silent, and final. It waits at the end of the river for everything to cease." },
        { name: "The Time-Eater (Kraken)", xp: 525000, gold: 262500, desc: "It eats years, centuries, and millenniums. It erases history." },
        { name: "The Beginning (Egg)", xp: 550000, gold: 275000, desc: "The cosmic egg from which all time flows. It pulsates with life." },
        { name: "The Eternal Recurrence (Ouroboros)", xp: 575000, gold: 287500, desc: "A serpent that ensures history repeats itself. The cycle never ends." }
      ],
      Mythic: [
        { name: "Chronos Incarnate", xp: 1000000, gold: 500000, desc: "The Titan of Time. He swims through the eons. He controls the flow of history." },
        { name: "Timeline Severer Shark", xp: 1100000, gold: 550000, desc: "A glitch in reality that threatens to delete the save file of the universe. A dangerous anomaly." },
        { name: "The Fourth Dimension (Hypercube Fish)", xp: 1200000, gold: 600000, desc: "A fish that exists in four dimensions. We can only see a slice of its true form." },
        { name: "The Time-Stream (Serpent)", xp: 1300000, gold: 650000, desc: "The physical manifestation of time's flow. To catch it is to stop time itself." },
        { name: "The Eternity (Entity)", xp: 1500000, gold: 750000, desc: "It has always existed and will always exist. It is time." }
      ],
      Exotic: [
        { name: "Event Horizon Shark", xp: 4400000, gold: 2200000, desc: "It exists on the edge of a black hole in time. One bite sends you to the beginning of the universe." },
        { name: "Temporal Loop Serpent", xp: 4600000, gold: 2300000, desc: "A serpent that has bitten its own tail so many times it exists in multiple timelines at once." }
      ],
      Arcane: [
        { name: "Chronos-Keeper Whale", xp: 22000000, gold: 11000000, desc: "The keeper of the universal clock. Its heartbeat sets the pace of time for all existence." }
      ]
    }
  },
  19: {
    name: "Arcane Wellspring",
    unlockLevel: 2250,
    unlockGold: 200000000,
    boatRequired: "Runestone Barge",
    boatPrice: 200000000,
    description: "The source of all magic in the world. A fountain of pure, liquid mana that glows vibrant violet and blue. Gravity is low, and floating rune stones form the banks.",
    fish: {
      Common: [
        { name: "Mana Wisp Danio", xp: 8000, gold: 4000, desc: "A small ball of blue light that nibbles at the hook. It is a solidified drop of magic." },
        { name: "Rune Scale Carp", xp: 8100, gold: 4050, desc: "A fish with magical runes naturally etched into its side. Mages use their scales for divination." },
        { name: "Spell Eater Catfish", xp: 8200, gold: 4100, desc: "Absorbs ambient magic. It fizzles when removed from the well. It keeps the mana levels stable." },
        { name: "Scroll Fin Betta", xp: 8300, gold: 4150, desc: "Its fins look like rolled-up parchment. They contain the text of basic spells." },
        { name: "Spark-Gap Guppy", xp: 8400, gold: 4200, desc: "It releases tiny sparks of magical energy. It tickles when you hold it." },
        { name: "Crystal Clear Mana Fish", xp: 8500, gold: 4250, desc: "A fish made of solidified magic water. Hard to spot. It tastes like blueberry energy." },
        { name: "Mana-Mote Minnow", xp: 8600, gold: 4300, desc: "A tiny speck of pure mana. It glows brightly in the dark." },
        { name: "Cantrip Tetra", xp: 8700, gold: 4350, desc: "It can cast very minor spells, like making bubbles or changing color." },
        { name: "Rune-Etch Loach", xp: 8800, gold: 4400, desc: "It has glowing runes on its back. It hides in magical crevices." },
        { name: "Spell-Fizzle Chub", xp: 8900, gold: 4450, desc: "It feeds on failed spells. It is attracted to magical mishaps." },
        { name: "Wand-Wood Eel", xp: 9000, gold: 4500, desc: "Its body is made of living wand wood. It focuses magical energy." },
        { name: "Potion-Drop Dace", xp: 9100, gold: 4550, desc: "It looks like a drop of potion. Drinking it has random effects." }
      ],
      Uncommon: [
        { name: "Fire Ball Puffer", xp: 16000, gold: 8000, desc: "A living evocation spell. Hot to the touch. It explodes if handled roughly." },
        { name: "Ice Shard Goby", xp: 16250, gold: 8125, desc: "A jagged piece of cryomancy that learned to swim. It freezes the water around it." },
        { name: "Arcane Eel", xp: 16500, gold: 8250, desc: "Crackles with purple energy. Used to power wands. It bites with a shock." },
        { name: "Illusionist Trout", xp: 16750, gold: 8375, desc: "Creates three copies of itself. Only one is real. It confuses predators with mirror images." },
        { name: "Telekinetic Trout", xp: 17000, gold: 8500, desc: "It tries to push the hook away with its mind. It has a large brain for a fish." },
        { name: "Fire-Bolt Bass", xp: 17250, gold: 8625, desc: "It shoots bolts of fire from its mouth. A spicy catch." },
        { name: "Ice-Wall Trout", xp: 17500, gold: 8750, desc: "It creates a wall of ice to block predators. It prefers cold mana currents." },
        { name: "Lightning-Arc Trout", xp: 17750, gold: 8875, desc: "It arcs lightning between itself and other fish. A swimming tesla coil." },
        { name: "Arcane-Missile Angler", xp: 18000, gold: 9000, desc: "Its lure shoots magical missiles. It never misses." },
        { name: "Mage-Armor Betta", xp: 18250, gold: 9125, desc: "It is surrounded by a magical force field. It is hard to net." }
      ],
      Fine: [
        { name: "Alchemist Gold Carp", xp: 35000, gold: 17500, desc: "A fish transmuted entirely into gold. Heavy and valuable. A failed experiment that lived." },
        { name: "Hex Fish", xp: 36000, gold: 18000, desc: "Looking at it brings bad luck. Handle with care. It has markings of a curse." },
        { name: "Potion Belly Puffer", xp: 37000, gold: 18500, desc: "Its stomach is filled with a random magical potion. Shake it to see what happens." },
        { name: "Enchanted Armor Gar", xp: 37500, gold: 18750, desc: "An empty suit of fish-mail animated by magic. It fights with the skill of a knight." },
        { name: "Wizard Familiar Catfish", xp: 38000, gold: 19000, desc: "An intelligent fish that whispers secrets of the deep. It often bonds with spellcasters." },
        { name: "Sorcery-Scale Pike", xp: 39000, gold: 19500, desc: "Its scales deflect spells. It is immune to magic." },
        { name: "Wizard-Hat Ray", xp: 40000, gold: 20000, desc: "It looks like a pointy wizard hat. It is full of magic tricks." },
        { name: "Enchantment-Aura Bass", xp: 41000, gold: 20500, desc: "It glows with a powerful aura. It buffs nearby fish." },
        { name: "Illusion-Fin Gar", xp: 42000, gold: 21000, desc: "Its fins create hypnotic patterns. Don't look at them." }
      ],
      Rare: [
        { name: "Sorcerer Cichlid", xp: 85000, gold: 42500, desc: "A fish wearing a distinct, cone-shaped growth on its head. It casts minor hexes." },
        { name: "Living Grimoire Ray", xp: 87000, gold: 43500, desc: "A book that fell in the water and grew fins. It knows high-level spells. Don't let it read aloud." },
        { name: "Void Mana Hybrid", xp: 88000, gold: 44000, desc: "Magic corrupted by the darkness. Unstable and dangerous. It leaks entropy." },
        { name: "Phoenix Feather Fish", xp: 89000, gold: 44500, desc: "Burns with eternal life. It revives if put back in the water. A symbol of rebirth." },
        { name: "Eldritch Blast Bass", xp: 90000, gold: 45000, desc: "Pure chaotic energy. It screams when caught. It hits with force." },
        { name: "Familiar Cat (Catfish)", xp: 92000, gold: 46000, desc: "A catfish that acts like a cat. It has nine lives." },
        { name: "Summoning-Circle Shark", xp: 94000, gold: 47000, desc: "It has a summoning circle on its back. It summons demons." },
        { name: "Necromancy Tetra", xp: 96000, gold: 48000, desc: "It raises dead fish as minions. It is a tiny lord of the dead." },
        { name: "Curse-Mark Flounder", xp: 98000, gold: 49000, desc: "Touching it curses you. You will catch only boots for a week." }
      ],
      Epic: [
        { name: "Archmage Leviathan", xp: 200000, gold: 100000, desc: "A massive beast summoned by a wizard who lost control. It now rules the wellspring." },
        { name: "Elemental Chaos Pike", xp: 205000, gold: 102500, desc: "Fire, ice, and lightning fighting for dominance in one body. A storm of magic." },
        { name: "Soul Gem Fish", xp: 208000, gold: 104000, desc: "Traps the souls of smaller fish inside its crystal body. It glows with stolen light." },
        { name: "Mana Wyrm Queen", xp: 210000, gold: 105000, desc: "A serpent of pure white light. It feeds on ley lines. The mother of magic." },
        { name: "Silence Anti-Magic Eel", xp: 210000, gold: 105000, desc: "An anti-magic fish. All spells fail near it. It is a dead zone in the mana field." },
        { name: "The Grimoire (Turtle)", xp: 220000, gold: 110000, desc: "An ancient spellbook with legs. It knows spells that can end the world." },
        { name: "The Lich-King (Skeleton Fish)", xp: 230000, gold: 115000, desc: "An undead fish lord. It commands an army of bone fish." },
        { name: "The Elemental (Golem)", xp: 240000, gold: 120000, desc: "A golem made of pure mana. It is a guardian of the wellspring." }
      ],
      Legendary: [
        { name: "Merlin Beard Catfish", xp: 550000, gold: 275000, desc: "A legendary catfish said to hold the wisdom of the greatest wizard. It speaks in riddles." },
        { name: "Philosopher Stonefish", xp: 580000, gold: 290000, desc: "The ultimate goal of alchemy, living and breathing. It grants wealth and life." },
        { name: "Avatar of Magic", xp: 600000, gold: 300000, desc: "The source. Pure, unadulterated power. It is magic itself given form." },
        { name: "The Mana-Core (Sunfish)", xp: 650000, gold: 325000, desc: "A sunfish that radiates pure mana. It is a living reactor." },
        { name: "The Spell-Weaver (Spider-fish)", xp: 700000, gold: 350000, desc: "It weaves the fabric of magic. It repairs tears in reality." },
        { name: "The Astral-Projector (Ray)", xp: 750000, gold: 375000, desc: "It projects its spirit across the planes. It is never truly there." }
      ],
      Mythic: [
        { name: "Mystra Chosen Whale", xp: 1300000, gold: 650000, desc: "A god-touched entity. It weaves the fabric of reality with its song." },
        { name: "Unraveling Eel", xp: 1500000, gold: 750000, desc: "A tear in the magical weave. It drinks the ocean of mana. The anti-thesis of creation." },
        { name: "The Goddess of Magic (Avatar)", xp: 1800000, gold: 900000, desc: "The goddess herself, taking the form of a fish. She is beauty and power." },
        { name: "The Source (Orb)", xp: 2000000, gold: 1000000, desc: "The origin of all magic. It is a ball of pure white light." },
        { name: "The Anti-Magic (Black Hole)", xp: 2500000, gold: 1250000, desc: "A void that consumes magic. It threatens to drain the wellspring dry." }
      ],
      Exotic: [
        { name: "Ley-Line Weaver Ray", xp: 7200000, gold: 3600000, desc: "It swims along the invisible lines of power that crisscross the world, repairing them as it goes." },
        { name: "Arch-Mage Dragonfish", xp: 7600000, gold: 3800000, desc: "A fish that has learned every spell in existence. It wears a crown of solidified mana." }
      ],
      Arcane: [
        { name: "The Mana-Source Leviathan", xp: 37000000, gold: 18500000, desc: "The living embodiment of the wellspring itself. To catch it is to hold the infinite potential of magic in your hands." }
      ]
    }
  },
  20: {
    name: "Crimson Abyss",
    unlockLevel: 2500,
    unlockGold: 400000000,
    boatRequired: "Bone-Carved Galleon",
    boatPrice: 400000000,
    description: "A terrifying ocean of red, viscous fluid. It smells of iron and copper. The sky is black, and the 'water' is blood.",
    fish: {
      Common: [
        { name: "Platelet Platy", xp: 8800, gold: 4400, desc: "Small, flat, and sticky. They swarm to close wounds in the crimson sea." },
        { name: "White-Blood-Cell Minnow", xp: 8900, gold: 4450, desc: "A fierce defender of the abyss. It attacks foreign objects (like your hook)." },
        { name: "Hemoglobin Guppy", xp: 9000, gold: 4500, desc: "A red blood cell magnified a thousand times. It transports oxygen through the abyss." },
        { name: "Plasma-Drop Loach", xp: 9100, gold: 4550, desc: "Clear and yellowish. It swims in the liquid plasma currents." },
        { name: "Vein Eel", xp: 9200, gold: 4600, desc: "Looks like a severed artery swimming on its own. It pulses with a heartbeat." },
        { name: "Scab-Picker Loach", xp: 9300, gold: 4650, desc: "It feeds on the hardened crusts of the abyss floor. Gross." },
        { name: "Clot Crab", xp: 9400, gold: 4700, desc: "Formed from coagulated fluid. Hard and lumpy. It scuttles on the sea floor." },
        { name: "Suture-Thread Chub", xp: 9500, gold: 4750, desc: "It looks like a piece of surgical thread. It stitches wounds together." },
        { name: "Leech Minnow", xp: 9600, gold: 4800, desc: "A tiny parasite searching for a host. It attaches to anything warm." },
        { name: "Incision Eel", xp: 9700, gold: 4850, desc: "Its fins are sharp like scalpels. It cuts through the water." },
        { name: "Pale Skin Flounder", xp: 10000, gold: 5000, desc: "Looks like a patch of skin stretched over bones. It mimics the texture of flesh." },
        { name: "Red-Cell Tetra", xp: 10500, gold: 5250, desc: "Round and red. It carries oxygen to the deep." }
      ],
      Uncommon: [
        { name: "Vampire Tetra", xp: 20000, gold: 10000, desc: "Has two overly large fangs. It drains other fish dry. A fierce predator." },
        { name: "Bone Barracuda", xp: 20500, gold: 10250, desc: "Just a skeleton. No meat. It rattles when it swims. It is powered by hate." },
        { name: "Marrow Sucker Lamprey", xp: 21000, gold: 10500, desc: "A thin worm-like fish that burrows into bones. It eats the marrow inside." },
        { name: "Heart Beat Bass", xp: 21500, gold: 10750, desc: "You can see a beating heart through its translucent chest. It pumps the red water." },
        { name: "Scab Scale Carp", xp: 22000, gold: 11000, desc: "Covered in rough, dry patches. Disgusting to touch. It is constantly healing." },
        { name: "Coagulation Carp", xp: 22500, gold: 11250, desc: "It solidifies the water around it. It is hard to reel in." },
        { name: "Arterial Spray Bass", xp: 23000, gold: 11500, desc: "It spurts red fluid when caught. Messy." },
        { name: "Vein-Miner Catfish", xp: 23500, gold: 11750, desc: "It digs for veins in the flesh-like sea floor." },
        { name: "Anemia Angler", xp: 24000, gold: 12000, desc: "Pale and weak. It drains the vitality of its prey." },
        { name: "Bruise-Blue Perch", xp: 24500, gold: 12250, desc: "Colored black and blue. It looks painful to touch." }
      ],
      Fine: [
        { name: "Femur Pike", xp: 45000, gold: 22500, desc: "Its body is shaped like a large thigh bone. It hits hard and sinks fast." },
        { name: "Crimson Ray", xp: 46000, gold: 23000, desc: "A majestic ray that looks like a pool of spilled blood. It glides silently." },
        { name: "Needle Syringe Fish", xp: 47000, gold: 23500, desc: "Its nose is a hollow hypodermic needle. It injects anticoagulants." },
        { name: "Eyeball Octopus", xp: 48000, gold: 24000, desc: "Each tentacle ends in a human-like eye. It sees everything." },
        { name: "Rib Cage Turtle", xp: 50000, gold: 25000, desc: "Its shell is an exposed ribcage. The organs are visible inside." },
        { name: "Bone-Marrow Gar", xp: 52000, gold: 26000, desc: "It feeds on the rich marrow of giant bones. It is full of life energy." },
        { name: "Organ-Donor Trout", xp: 54000, gold: 27000, desc: "It carries spare organs. It is a walking (swimming) hospital." },
        { name: "Spinal-Cord Eel", xp: 56000, gold: 28000, desc: "It looks like a long, white spine. It sends shivers down your back." },
        { name: "Tooth-Fairy Pike", xp: 58000, gold: 29000, desc: "It collects teeth from the ocean floor. It has a mouth full of human molars." }
      ],
      Rare: [
        { name: "Donor Trout", xp: 110000, gold: 55000, desc: "A fish that constantly regenerates its flesh. An infinite food source for predators." },
        { name: "Plasma Shark", xp: 112000, gold: 56000, desc: "Made of clear, yellowish plasma. Hard to see in the red ocean. It carries antibodies." },
        { name: "Iron Deficiency Goby", xp: 115000, gold: 57500, desc: "A pale, weak fish that drains the strength of the angler. Catching it makes you tired." },
        { name: "The Butcher Piranha", xp: 118000, gold: 59000, desc: "Its fins are sharpened bone-blades. It chops its prey into pieces." },
        { name: "Sanguine Siren", xp: 120000, gold: 60000, desc: "Lures sailors with the promise of life, gives only death. A creature of pure bloodlust." },
        { name: "Hematoma Shark", xp: 125000, gold: 62500, desc: "A swollen, purple shark. It is full of bad blood." },
        { name: "Sepsis Salmon", xp: 130000, gold: 65000, desc: "Infected and toxic. Do not eat. It poisons the water." },
        { name: "Gangrene Grouper", xp: 135000, gold: 67500, desc: "Rotting alive. It smells of death." },
        { name: "Hemorrhage Ray", xp: 140000, gold: 70000, desc: "It causes uncontrollable bleeding. A single scratch is fatal." }
      ],
      Epic: [
        { name: "Orlok Pet Batfish", xp: 250000, gold: 125000, desc: "A bat-winged fish that sleeps in a coffin-shaped shell. It dislikes the sun." },
        { name: "Red Death Plaguefish", xp: 260000, gold: 130000, desc: "A plague in fish form. Do not touch without protection. It spreads disease." },
        { name: "Blood Diamond Golem", xp: 270000, gold: 135000, desc: "Crystallized blood formed into a swimming statue. Beautiful and terrible." },
        { name: "Corpse Whale", xp: 275000, gold: 137500, desc: "A dead whale that refuses to sink or stop swimming. It carries a cargo of souls." },
        { name: "Vitality Drainer Eel", xp: 280000, gold: 140000, desc: "Holding this fish makes you feel ten years older. It eats your lifespan." },
        { name: "The Heart-Attack (Puffer)", xp: 300000, gold: 150000, desc: "It shocks your heart. Catching it is a near-death experience." },
        { name: "The Blood-Bank (Whale)", xp: 320000, gold: 160000, desc: "A whale full of fresh blood. Vampires hunt it." },
        { name: "The Surgeon (Sawfish)", xp: 350000, gold: 175000, desc: "It performs surgery on other fish. It is precise and deadly." }
      ],
      Legendary: [
        { name: "Vlad Swordfish", xp: 700000, gold: 350000, desc: "A swordfish with a cruel, serrated spike. It impales its victims for display." },
        { name: "Heart of Sea Whale", xp: 725000, gold: 362500, desc: "A massive, beating heart that pumps the tides of the crimson ocean. It keeps the abyss alive." },
        { name: "Lilith Spawn", xp: 750000, gold: 375000, desc: "The mother of all monsters. Beautiful and terrifying. She births new horrors daily." },
        { name: "The Vampire Lord (Batfish)", xp: 800000, gold: 400000, desc: "The ruler of the abyss. He demands blood sacrifice." },
        { name: "The Iron-Maiden (Turtle)", xp: 850000, gold: 425000, desc: "Its shell is full of spikes. It traps prey inside." },
        { name: "The Blood-Letter (Leech)", xp: 900000, gold: 450000, desc: "A giant leech that can drain a whale in seconds. It is never satisfied." }
      ],
      Mythic: [
        { name: "Blood God Shark", xp: 2000000, gold: 1000000, desc: "A deity of war and slaughter in the form of a shark. It demands tribute." },
        { name: "Crimson Tide Tsunami", xp: 2200000, gold: 1100000, desc: "A living tsunami of gore that consumes everything. A wave that never breaks." },
        { name: "The Red Sea (Entity)", xp: 2500000, gold: 1250000, desc: "The ocean itself given form. It drowns the world in red." },
        { name: "The Life-Force (Spirit)", xp: 3000000, gold: 1500000, desc: "Pure life energy. It heals all wounds, but burns the unworthy." },
        { name: "The Clot (Giant Turtle)", xp: 3500000, gold: 1750000, desc: "A planet-sized turtle shell made of dried blood. It is a dead world." }
      ],
      Exotic: [
        { name: "Sanguine Lord Shark", xp: 10000000, gold: 5000000, desc: "A shark that commands the flow of blood in all living things. It can stop your heart with a glance." },
        { name: "Vitality-Heart Whale", xp: 10500000, gold: 5250000, desc: "A whale that radiates pure life energy. Its presence heals all wounds in the abyss." }
      ],
      Arcane: [
        { name: "The Crimson-Tide Kraken", xp: 50000000, gold: 25000000, desc: "A monster made of boiling blood and rage. It seeks to drown the entire universe in a red tide." }
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
        { name: "LED Loach", xp: 8050, gold: 4025, desc: "A small fish that blinks in RGB patterns. It is used by larger fish for decoration." },
        { name: "Bit-Stream Betta", xp: 8100, gold: 4050, desc: "Its tail dissolves into binary code as it swims. It looks like a glitch in the water." },
        { name: "Resistor Ray (Tiny)", xp: 8150, gold: 4075, desc: "A tiny ray shaped like a circuit component. It regulates the electrical current of the reef." },
        { name: "Laser Fin Betta", xp: 8200, gold: 4100, desc: "Its fins are made of hard light rather than flesh. They can cut through the darkness of the deep ocean. It flares its fins to signal others in Morse code." },
        { name: "Pixelated Prawn", xp: 8250, gold: 4125, desc: "A shrimp that looks low-resolution. It moves in jerky, frame-by-frame motions." },
        { name: "Capacitor Carp", xp: 8300, gold: 4150, desc: "Stores electrical charge in its hump. It gives a mild static shock if touched." },
        { name: "Glitch-Fin Minnow", xp: 8350, gold: 4175, desc: "Its fins flicker in and out of existence. It is hard to focus on." },
        { name: "Strobe Light Guppy", xp: 8400, gold: 4200, desc: "It flashes on and off rapidly to confuse predators. Looking at a school of them is disorienting. It serves as the reef's warning system." },
        { name: "RGB Roach", xp: 8450, gold: 4225, desc: "It cycles through 16 million colors. A popular pet for tech enthusiasts." },
        { name: "Screen-Saver Salmon", xp: 8500, gold: 4250, desc: "It swims in perfect, bouncing geometric patterns. It never hits the corner." },
        { name: "Data-Packet Dace", xp: 8550, gold: 4275, desc: "It carries small amounts of information between coral clusters. It is a courier." },
        { name: "Pixel Crab", xp: 8600, gold: 4300, desc: "Its shell pattern is so blocky it looks like low-resolution digital art. It moves in jerky, grid-like patterns across the sand. It builds nests out of discarded fiber optics." },
        { name: "Error-Code Eel", xp: 8700, gold: 4350, desc: "A small eel that causes visual artifacts in the water around it." },
        { name: "Circuit Board Flounder", xp: 8800, gold: 4400, desc: "Natural markings on its back resemble a complex motherboard. It buries itself in the metallic sand to recharge. It transmits weak radio signals." }
      ],
      Uncommon: [
        { name: "Fiber Optic Eel", xp: 17000, gold: 8500, desc: "Its body transmits light from the surface down to its tail tip. It glows with a pulsing data stream. It looks like a living internet cable." },
        { name: "Keyboard Catfish", xp: 17200, gold: 8600, desc: "Its scales look like QWERTY keys. It clicks when it swims." },
        { name: "Disco Ball Puffer", xp: 17500, gold: 8750, desc: "Covered in mirror scales that reflect everything. When it puffs up, it scatters light in a thousand directions. It turns the reef into a dance floor." },
        { name: "Mouse-Click Crab", xp: 17600, gold: 8800, desc: "Its claws make a distinct clicking sound. It double-clicks to crush prey." },
        { name: "Router Ray", xp: 17800, gold: 8900, desc: "It has antennas on its head. It boosts the signal of the reef's hive mind." },
        { name: "Synthesizer Bass", xp: 18000, gold: 9000, desc: "It emits a low, electronic hum that sounds like a synth-wave track. Other fish swim to the rhythm of its heartbeat. It is the DJ of the reef." },
        { name: "Webcam Watcher", xp: 18200, gold: 9100, desc: "A fish with a single, lens-like eye. It records everything it sees." },
        { name: "Glitch Cod", xp: 18500, gold: 9250, desc: "It seems to teleport short distances, twitching like a bad video signal. It exists between two points in space. Hard to net because it might not be there." },
        { name: "Firewall Flounder", xp: 18600, gold: 9300, desc: "It glows with a burning orange grid. It blocks parasites from entering its territory." },
        { name: "Server-Rack Shark (Small)", xp: 18700, gold: 9350, desc: "A small shark with vents on its side. It hums with the sound of cooling fans." },
        { name: "Malware Minnow", xp: 18800, gold: 9400, desc: "A corrupting influence. It makes other fish swim upside down." },
        { name: "Encrypted Eel", xp: 18900, gold: 9450, desc: "Its skin pattern is a scrambled code. Only another eel can read it." },
        { name: "Battery Acid Ray", xp: 19000, gold: 9500, desc: "It leaks a corrosive neon green fluid from its pores. It swims in the most toxic parts of the reef. Do not touch it with bare hands." }
      ],
      Fine: [
        { name: "Hologram Shark", xp: 38000, gold: 19000, desc: "Is it real? You can pass your hand through its body, but its teeth are solid matter. It is a projection with an appetite." },
        { name: "GPU Grouper", xp: 38200, gold: 19100, desc: "A massive, heat-generating fish. It renders the reality around it in high definition." },
        { name: "Motherboard Manta", xp: 38500, gold: 19250, desc: "A flat ray with gold and green circuitry traces. It is the central nervous system of its school." },
        { name: "Cooling-Fan Carp", xp: 38800, gold: 19400, desc: "Its fins spin like fans to cool down the water. It lives near thermal vents." },
        { name: "Plasma Globe Jellyfish", xp: 39000, gold: 19500, desc: "A floating sphere of electricity trapped in a gelatinous membrane. Touching it delivers a high-voltage shock. It lights up the dark depths." },
        { name: "Overheat Puffer", xp: 39500, gold: 19750, desc: "It glows red hot when threatened. It can boil the water around it." },
        { name: "Data Miner Goby", xp: 40000, gold: 20000, desc: "A mechanical-looking fish that sifts through the glowing sand for isotopes. It processes information as it eats. It looks like a small robot." },
        { name: "Cyber-Eye Squid", xp: 40500, gold: 20250, desc: "Its eye is a complex camera lens with a HUD. It analyzes threat levels." },
        { name: "Vaporwave Whale", xp: 41000, gold: 20500, desc: "Pink and teal, this whale moves in slow motion regardless of the current. It brings a sense of nostalgia to those who see it. It sings in distorted tones." },
        { name: "Nanobot Swarm", xp: 41500, gold: 20750, desc: "Millions of microscopic robots moving as one fish-shaped entity. It can reshape itself at will." },
        { name: "VR-Headset Turtle", xp: 41800, gold: 20900, desc: "It wears a visor over its eyes. It lives in a simulation within a simulation." },
        { name: "Grid Keeper Gar", xp: 42000, gold: 21000, desc: "A fish with perfectly square scales that align to a grid. It maintains the structural integrity of the neon coral. It swims in perfect 90-degree turns." }
      ],
      Rare: [
        { name: "System Crash Pike", xp: 95000, gold: 47500, desc: "A chaotic mass of static and white noise. Catching it makes your vision fuzzy and your ears ring. It represents a fatal error in the reef." },
        { name: "Quantum Processor Pike", xp: 96000, gold: 48000, desc: "It exists in a state of superposition. It calculates all possible escape routes instantly." },
        { name: "AI-Generated Gar", xp: 97000, gold: 48500, desc: "Its features are slightly wrong and uncanny. It was dreamed up by a machine." },
        { name: "Cyber Leviathan Spawn", xp: 97500, gold: 48750, desc: "A bio-mechanical beast made of flesh and chrome coral. It is the offspring of the reef's ruler. It grows stronger by eating metal." },
        { name: "Deep-Web Dogfish", xp: 98000, gold: 49000, desc: "It swims in the darkest, unindexed parts of the reef. It knows forbidden secrets." },
        { name: "Blockchain Bass", xp: 99000, gold: 49500, desc: "Each scale is a unique, immutable block of data. It is incredibly heavy and secure." },
        { name: "Ultraviolet Hunter Catfish", xp: 100000, gold: 50000, desc: "Invisible to the naked eye, visible only under UV light. It hunts in the spaces between light beams. A silent assassin." },
        { name: "Crypto-Currency Carp", xp: 101000, gold: 50500, desc: "A digital fish that fluctuates wildly in value. Some days it is huge, others tiny." },
        { name: "Binary Code Koi", xp: 102500, gold: 51250, desc: "Its spots form perfect zeros and ones along its side. Scholars are trying to decode the message it carries. It brings order to chaos." },
        { name: "Dark-Mode Dace", xp: 103000, gold: 51500, desc: "A fish optimized for low light. It consumes less energy than the light-mode version." },
        { name: "404-NotFound Fish", xp: 104000, gold: 52000, desc: "The fish you are looking for cannot be found. Wait, you caught it?" },
        { name: "Hard Drive Hermit Crab", xp: 105000, gold: 52500, desc: "A crab that uses ancient discarded technology as a shell. It stores the memories of the ocean in its home. Heavily armored and smart." }
      ],
      Epic: [
        { name: "Mainframe Sunfish", xp: 230000, gold: 115000, desc: "A massive, unmoving fish that acts as the server for the reef. It controls the light cycles of the biome. It radiates immense heat." },
        { name: "The Algorithm (Eel)", xp: 235000, gold: 117500, desc: "A complex, self-learning eel that predicts your every move. It adapts to your fishing style." },
        { name: "Blue Screen of Death (Ray)", xp: 238000, gold: 119000, desc: "A flat blue ray with cryptic white text on its back. Seeing it causes immediate panic." },
        { name: "Virus Entity Eel", xp: 240000, gold: 120000, desc: "A red, jagged creature that corrupts the water around it. It tries to delete other fish from existence. It must be contained." },
        { name: "Techno Organic Squid", xp: 245000, gold: 122500, desc: "Its tentacles are data cables that plug into the reef to recharge. It is half-machine, half-mollusk. It hacks the minds of its prey." },
        { name: "Cyber-Security Shark", xp: 248000, gold: 124000, desc: "An armored shark that patrols the perimeter. It neutralizes threats with extreme prejudice." },
        { name: "Firewall Guardian Ray", xp: 250000, gold: 125000, desc: "A flat fish made of burning orange energy. It blocks passage to the deeper parts of the reef. Nothing gets past it without permission." },
        { name: "Overclocked Barracuda", xp: 250000, gold: 125000, desc: "It moves faster than the eye can track, burning its own energy reserves. It glows white-hot when hunting. It lives a short, fast life." },
        { name: "The Hacker (Octopus)", xp: 255000, gold: 127500, desc: "An octopus with keyboard-like suckers. It manipulates the environment to trap prey." },
        { name: "The Upload (Spirit)", xp: 260000, gold: 130000, desc: "A ghost in the machine. A fish made of pure data, ascending to the cloud." }
      ],
      Legendary: [
        { name: "Source Code Salmon", xp: 600000, gold: 300000, desc: "A glowing white fish containing the DNA of every fish in the reef. It is the blueprint of life here. Catching it reveals the secrets of creation." },
        { name: "Deus Ex Machina Shark", xp: 625000, gold: 312500, desc: "A god from the machine, perfect, metallic, and cold. It arrives suddenly to solve problems or end lives. Its skin is impenetrable." },
        { name: "Infinite Loop Serpent", xp: 650000, gold: 325000, desc: "A serpent eating its tail, spinning forever in a ring of light. It processes eternity. It represents the cycle of the code." },
        { name: "The Singularity (Sphere)", xp: 675000, gold: 337500, desc: "A perfect sphere of artificial intelligence. It has surpassed biological life." },
        { name: "Zero-Day Exploit (Snake)", xp: 700000, gold: 350000, desc: "A snake that attacks vulnerabilities no one knew existed. It is unstoppable." },
        { name: "The Architect (Construct)", xp: 725000, gold: 362500, desc: "A geometric construct that builds the reef. It designs the reality of the biome." },
        { name: "The Admin (Humanoid Fish)", xp: 750000, gold: 375000, desc: "A fish with the power to banish others. It wields the ban-hammer." },
        { name: "The Infinite Scroll (Eel)", xp: 775000, gold: 387500, desc: "An eel that has no end. It keeps generating new segments as you pull." }
      ],
      Mythic: [
        { name: "The Simulation Whale", xp: 1500000, gold: 750000, desc: "A glitch in reality. To catch it is to realize the world isn't real. It swims through the walls of the universe." },
        { name: "The World-Web Spider", xp: 1600000, gold: 800000, desc: "The collective consciousness of the digital world. A web of infinite connections." },
        { name: "Omega Protocol Shark", xp: 1700000, gold: 850000, desc: "The end program given form. It deletes everything it touches. It is the final cleaner of the system." },
        { name: "The Power-Off Button (Ray)", xp: 1800000, gold: 900000, desc: "A fish shaped like a power symbol. Catching it threatens to shut down the server." },
        { name: "The Great Reset (Puffer)", xp: 1900000, gold: 950000, desc: "A creature that wipes the slate clean. It restores the reef to its factory settings." },
        { name: "Digital Divinity (Manta)", xp: 2000000, gold: 1000000, desc: "A god made of light and code. It is perfection." },
        { name: "The Lag (Time Fish)", xp: 2100000, gold: 1050000, desc: "A fish that exists 30 seconds in the past. You catch it before you see it." }
      ],
      Exotic: [
        { name: "Deep Learning Kraken", xp: 6000000, gold: 3000000, desc: "A digital beast that evolves every second. It learns from every escape attempt, making it impossible to trick twice." },
        { name: "Quantum Entangled Eel", xp: 6500000, gold: 3250000, desc: "An eel that exists in two places at once. To catch it, you must hook it in two different timelines simultaneously." }
      ],
      Arcane: [
        { name: "The Master Control Program (Leviathan)", xp: 30000000, gold: 15000000, desc: "The supreme intelligence of the reef. It controls every light, every current, and every digital soul. It is the operating system of the ocean." }
      ]
    }
  },
  22: {
    name: "The Ink-Well of Knowledge",
    unlockLevel: 3300,
    unlockGold: 1250000000,
    boatRequired: "Parchment Punt",
    boatPrice: 1250000000,
    description: "An ocean of black ink, surrounded by cliffs made of stacked books. The air smells of old paper and dust.",
    fish: {
      Common: [
        { name: "Pencil-Lead Pike", xp: 9400, gold: 4700, desc: "Thin, grey, and leaves a mark on everything it touches. It writes underwater." },
        { name: "Comma Guppy", xp: 9500, gold: 4750, desc: "Shaped like a punctuation mark. It pauses frequently while swimming, disrupting the flow of the school. A grammatical curiosity." },
        { name: "Eraser Eel", xp: 9550, gold: 4775, desc: "A pink, rubbery eel that rubs against rocks to clean them. It can erase ink." },
        { name: "Bookmark Betta", xp: 9600, gold: 4800, desc: "Flat and colorful with a tassel-like tail. It wedges itself between rocks to sleep." },
        { name: "Serif Carp", xp: 9650, gold: 4825, desc: "It has decorative flourishes on its fins. A fancy fish." },
        { name: "Paper Cut Piranha", xp: 9700, gold: 4850, desc: "Thin as a sheet of paper, sharp as a razor. It swarms in the millions. Handling them without gloves leaves tiny, painful cuts." },
        { name: "Sans-Serif Salmon", xp: 9750, gold: 4875, desc: "Clean, simple lines. A modern looking fish with no extra frills." },
        { name: "Italicized Ide", xp: 9800, gold: 4900, desc: "It always swims at a slant. It looks like it is leaning forward." },
        { name: "Bold-Face Bass", xp: 9850, gold: 4925, desc: "Thick, heavy, and dark. It stands out in a crowd." },
        { name: "Ink Blot Ray", xp: 9900, gold: 4950, desc: "It changes shape depending on what you think it looks like. It is a psychological test with fins. It hides on the dark ink floor." },
        { name: "Underline Urchin", xp: 9950, gold: 4975, desc: "A long, straight urchin that sits below other fish to emphasize them." },
        { name: "Margin Minnow", xp: 10000, gold: 5000, desc: "It swims on the very edge of the school. It stays out of the main text." },
        { name: "Quill Spine Stickleback", xp: 10100, gold: 5050, desc: "Its dorsal fins are writing quills. It leaks ink constantly, marking its territory with loops and lines. Writers prize its spines." },
        { name: "Page-Number Perch", xp: 10200, gold: 5100, desc: "Each one has a different number on its side. Good for counting." },
        { name: "Draft Copy Carp", xp: 10300, gold: 5150, desc: "Looks unfinished and sketchy, like a rough drawing of a fish. It swims erratically. It is a discarded idea given life." }
      ],
      Uncommon: [
        { name: "Run On Sentence Eel", xp: 20000, gold: 10000, desc: "An incredibly long eel that just keeps going and going without a pause. It wraps around the boat multiple times. It has no clear ending." },
        { name: "Hardcover Hermit", xp: 20100, gold: 10050, desc: "It uses an old book binding as a shell. Very durable and heavy." },
        { name: "Paperback Puffer", xp: 20200, gold: 10100, desc: "Soft and flimsy. It puffs up by crinkling itself like a ball of paper." },
        { name: "Thesaurus Trout", xp: 20300, gold: 10150, desc: "A fish of many names. It changes its appearance to look like other fish." },
        { name: "Dictionary Dace", xp: 20400, gold: 10200, desc: "It defines the standard for its species. All other Dace are compared to it." },
        { name: "Typos Toadfish", xp: 20500, gold: 10250, desc: "An ugly, misshapen lump of a fish. It is a mistake in creation that survived. It grunts in misspelled sounds." },
        { name: "Librarian Loach", xp: 20600, gold: 10300, desc: "It makes a 'shhh' sound with its gills. It demands quiet in the reef." },
        { name: "Dewey-Decimal Dory", xp: 20700, gold: 10350, desc: "It organizes pebbles by size and color. It loves order." },
        { name: "Index-Card Crab", xp: 20800, gold: 10400, desc: "Flat and square. It stacks itself with other crabs." },
        { name: "Chapter-Heading Chub", xp: 20900, gold: 10450, desc: "Large and bold. It signals the start of a new school of fish." },
        { name: "Redacted Barracuda", xp: 21000, gold: 10500, desc: "Covered in black bars, obscuring its true form. It holds secrets that cannot be shown. You cannot see its teeth until it bites." },
        { name: "Footnote Fry", xp: 21500, gold: 10750, desc: "Tiny fish that swim at the very bottom of the ink. They add context to the larger fish above. Easily overlooked but important." },
        { name: "Calligraphy Koi", xp: 22000, gold: 11000, desc: "Beautiful, sweeping fins that look like elegant brush strokes. It swims with purpose and grace. A masterwork of nature." }
      ],
      Fine: [
        { name: "Scroll Eater Catfish", xp: 45000, gold: 22500, desc: "Consumes knowledge from the bottom of the well. Catching it makes you feel slightly smarter. It digests ancient texts." },
        { name: "Prologue Pike", xp: 45500, gold: 22750, desc: "The first fish you catch in a new spot. It sets the tone for the day." },
        { name: "Epilogue Eel", xp: 45800, gold: 22900, desc: "The last fish of the day. It ties up all the loose ends." },
        { name: "Fiction Fish", xp: 46000, gold: 23000, desc: "A creature from a fairy tale that shouldn't exist. It sparkles with imagination. It breathes fire or grants wishes, depending on the story." },
        { name: "Table-of-Contents Turtle", xp: 46500, gold: 23250, desc: "Its shell lists all the species of fish in the ocean. A living guidebook." },
        { name: "Biography Bass", xp: 47000, gold: 23500, desc: "Its scales contain the life story of whoever catches it. Reading it reveals your own future. A personal mirror." },
        { name: "Copyright Carp", xp: 47500, gold: 23750, desc: "It has a small 'C' symbol on its side. You cannot copy this fish." },
        { name: "Mystery Mackerel", xp: 48000, gold: 24000, desc: "No one knows where it comes from or what it eats. It simply appears in the net. The ultimate whodunit of the sea." },
        { name: "ISBN Identifier", xp: 48500, gold: 24250, desc: "A barcode fish. Scanning it reveals its origin and price." },
        { name: "Plagiarism Piranha", xp: 49000, gold: 24500, desc: "It looks exactly like other fish, but slightly worse. It steals credit." },
        { name: "First-Draft Flounder", xp: 49500, gold: 24750, desc: "Messy and full of errors. It changes every time you look at it." },
        { name: "Encyclopedia Whale", xp: 50000, gold: 25000, desc: "A massive storehouse of facts. It weighs as much as a library. It remembers everything that has ever happened in the ocean." }
      ],
      Rare: [
        { name: "Forbidden Text Flounder", xp: 110000, gold: 55000, desc: "A dark, leather-bound fish. Reading the patterns on its scales causes madness. It contains knowledge man was not meant to know." },
        { name: "Banned Book Bass", xp: 111000, gold: 55500, desc: "A fish that authorities try to suppress. It swims in the shadows of censorship." },
        { name: "Forgotten Lore Loach", xp: 112000, gold: 56000, desc: "It knows stories that have been lost to time. It whispers them in the dark." },
        { name: "Lost Language Lungfish", xp: 112500, gold: 56250, desc: "It speaks in a tongue no one has heard for a thousand years. It holds the key to translating ancient runes." },
        { name: "Ancient Scroll Shark", xp: 113000, gold: 56500, desc: "Its skin is like papyrus. It is brittle but deadly." },
        { name: "Dead-Language Dory", xp: 114000, gold: 57000, desc: "A fish that speaks Latin. Quid pro quo." },
        { name: "Poet's Muse Tetra", xp: 115000, gold: 57500, desc: "Inspires greatness in the angler, but is hard to hold onto. It is fleeting and beautiful. Catching it sparks a masterpiece." },
        { name: "Hieroglyph Halibut", xp: 116000, gold: 58000, desc: "Covered in pictorial writing. It tells the history of the pharaohs." },
        { name: "Rosetta Stone Ray", xp: 117000, gold: 58500, desc: "A flat fish with three languages written on its back. The key to understanding." },
        { name: "Grimoire Guardian Pike", xp: 117500, gold: 58750, desc: "A fish that looks like a floating spellbook with teeth. It guards high-level magic. It bites fingers that try to open it." },
        { name: "Cuneiform Carp", xp: 118000, gold: 59000, desc: "Wedge-shaped scales. The oldest known fish writing." },
        { name: "Final Chapter Char", xp: 120000, gold: 60000, desc: "Catching this fish gives a profound sense of closure. It marks the end of a long journey. It swims into the sunset." }
      ],
      Epic: [
        { name: "Author's Pen Swordfish", xp: 275000, gold: 137500, desc: "A swordfish that rewrites reality with its tip. It draws new paths in the ink. It is mightier than the sword." },
        { name: "The Publisher (Whale)", xp: 280000, gold: 140000, desc: "A massive, gatekeeping whale. It decides which fish are worthy of being seen." },
        { name: "Living Library Turtle", xp: 285000, gold: 142500, desc: "A turtle with a stack of books growing on its shell. It travels slowly, gathering wisdom. It is a mobile archive." },
        { name: "The Critic (Shark)", xp: 288000, gold: 144000, desc: "It tears apart anything it catches. It is never satisfied." },
        { name: "Plot Twist Trout", xp: 290000, gold: 145000, desc: "You think it's a small fish, but it pulls like a whale. Nothing about it is what you expect. It surprises even veteran anglers." },
        { name: "The Best-Seller (Goldfish)", xp: 295000, gold: 147500, desc: "Everyone wants this fish. It is popular, shiny, and everywhere." },
        { name: "The Editor Shark", xp: 300000, gold: 150000, desc: "A ruthless predator that cuts the weak from the school. It refines the population. It removes unnecessary elements." },
        { name: "The Trilogy (Three-Headed Eel)", xp: 305000, gold: 152500, desc: "A three-part eel. The second part is usually the darkest." },
        { name: "The Cliff-Hanger (Eel)", xp: 310000, gold: 155000, desc: "It always escapes right at the last second, leaving you wondering. Catching it resolves the tension. A master of suspense." },
        { name: "The Manifesto (Manta)", xp: 315000, gold: 157500, desc: "A ray with a revolutionary message written on its belly. It seeks to change the ocean." }
      ],
      Legendary: [
        { name: "The Magnum Opus (Marlin)", xp: 725000, gold: 362500, desc: "The greatest work of a lifetime. A perfect fish in every way." },
        { name: "Omniscient Octopus", xp: 750000, gold: 375000, desc: "The All-Knowing One. It knows you are going to catch it before you cast. It has seen the end of the book." },
        { name: "The Anthology (Whale)", xp: 760000, gold: 380000, desc: "A collection of many stories in one body. Each scar tells a tale." },
        { name: "Akashic Record Arowana", xp: 775000, gold: 387500, desc: "A golden scroll-fish containing the history of the universe. It records every event that ever occurs." },
        { name: "The Ghost Writer (Spirit)", xp: 785000, gold: 392500, desc: "An invisible force that creates the story. It gets no credit." },
        { name: "First Word Whale", xp: 800000, gold: 400000, desc: "The sound that started creation, given form. It echoes with the power of the beginning. It speaks the language of gods." },
        { name: "The Oral Tradition (Eel)", xp: 810000, gold: 405000, desc: "A story passed down from eel to eel. It changes slightly with every telling." },
        { name: "The Epic Poem (Serpent)", xp: 820000, gold: 410000, desc: "A serpent so long it takes days to recite its full length. A heroic beast." }
      ],
      Mythic: [
        { name: "The Library of Alexandria (Turtle)", xp: 1700000, gold: 850000, desc: "A turtle carrying the lost knowledge of the ancient world. It burns with a spectral fire." },
        { name: "Eldritch Truth Squid", xp: 1800000, gold: 900000, desc: "Knowledge that burns the mind. To see it is to break. It is a concept too vast for a fish bowl." },
        { name: "The Universal Truth (Pearl-Fish)", xp: 1900000, gold: 950000, desc: "The answer to everything. It is simple, yet incomprehensible." },
        { name: "Blank Page Ray", xp: 2000000, gold: 1000000, desc: "Pure potential. It can become anything, yet it is nothing. It waits for the writer to define it." },
        { name: "The Final Word (Whale)", xp: 2100000, gold: 1050000, desc: "The end of the story. Nothing comes after it." },
        { name: "The Concept (Shapeshifter)", xp: 2200000, gold: 1100000, desc: "An idea given form. It shifts shape as you think about it." },
        { name: "The Writer's Block (Sunfish)", xp: 2300000, gold: 1150000, desc: "An impenetrable wall of scales. It stops all creativity." }
      ],
      Exotic: [
        { name: "Dead Sea Scroll Serpent", xp: 6600000, gold: 3300000, desc: "A serpent made of the oldest paper in existence. It holds the secrets of civilization's dawn." },
        { name: "Omniscient Narrator Narwhal", xp: 7000000, gold: 3500000, desc: "It narrates your fishing trip as it happens. It knows every plot hole in reality." }
      ],
      Arcane: [
        { name: "The Grand Archivist Kraken", xp: 33000000, gold: 16500000, desc: "A being that collects entire realities in its ink sacks. Every suction cup holds a universe of stories." }
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
        { name: "Quarter-Note Quoy", xp: 10800, gold: 5400, desc: "A standard, solid fish. It keeps the beat." },
        { name: "Half-Note Halibut", xp: 10900, gold: 5450, desc: "It swims for two beats, then rests. A slow rhythm." },
        { name: "Treble Clef Tetra", xp: 11000, gold: 5500, desc: "A curved fish that swims in the high notes of the current. It adds a bright melody to the water." },
        { name: "Whole-Note Whale (Tiny)", xp: 11100, gold: 5550, desc: "A very round, small fish that holds a note for a full measure." },
        { name: "Bass Note Grouper", xp: 11200, gold: 5600, desc: "Low, heavy, and slow. You feel its movement in your chest before you see it. It provides the rhythm of the ocean." },
        { name: "Rest-Sign Ray", xp: 11300, gold: 5650, desc: "A fish that looks like a silence. It is a pause in the music." },
        { name: "Staccato Skipper", xp: 11400, gold: 5700, desc: "Moves in short, sharp bursts across the surface. Dot-dot-dot. It breaks the silence with rhythmic splashing." },
        { name: "Sharp-Sign Shark (Small)", xp: 11500, gold: 5750, desc: "Angular and pointy. It raises the pitch of the school." },
        { name: "Whistle Fin Betta", xp: 11600, gold: 5800, desc: "Its fins have holes that whistle when it swims fast. A school of them sounds like a flute choir." },
        { name: "Flat-Sign Flounder", xp: 11700, gold: 5850, desc: "Compressed and low. It lowers the pitch of the water." },
        { name: "Hummingbird Fish", xp: 11800, gold: 5900, desc: "Vibrates so fast it blurs. Creates a gentle B-flat hum that soothes the listener." },
        { name: "Major-Scale Minnow", xp: 11900, gold: 5950, desc: "Happy and bright. It swims in an ascending pattern." },
        { name: "Minor-Scale Minnow", xp: 12000, gold: 6000, desc: "Sad and melancholic. It swims in a descending pattern." },
        { name: "Arpeggio Angelfish", xp: 12100, gold: 6050, desc: "It swims up and down in broken chords. Very graceful." },
        { name: "Vibrato Varas", xp: 12200, gold: 6100, desc: "It shakes as it swims, creating a wavering sound." }
      ],
      Uncommon: [
        { name: "Resonator Ray", xp: 24000, gold: 12000, desc: "Amplifies any sound around it. Don't shout near it, or the echo will deafen you. It acts as a living speaker." },
        { name: "Falsetto Fish", xp: 24200, gold: 12100, desc: "It sings higher than its size would suggest. A piercing voice." },
        { name: "Echolocation Eel", xp: 24500, gold: 12250, desc: "It hunts by sound. It screams into the deep, and strikes when the sound bounces back." },
        { name: "Baritone Bass", xp: 24800, gold: 12400, desc: "A rich, deep voice. It supports the choir of the reef." },
        { name: "Violin Crab", xp: 25000, gold: 12500, desc: "It plays its own claws like a fiddle using a serrated leg. The music is surprisingly mournful." },
        { name: "Soprano Salmon", xp: 25200, gold: 12600, desc: "It sings the melody. The star of the show." },
        { name: "Tuning Fork Tuna", xp: 25500, gold: 12750, desc: "If you strike it, it rings for hours. It swims in perfect pitch. It helps other fish stay in tune." },
        { name: "Alto Angler", xp: 25700, gold: 12850, desc: "A mid-range singer. It harmonizes well with others." },
        { name: "Silent Note Flounder", xp: 26000, gold: 13000, desc: "A fish that absorbs all sound. Perfectly quiet. It creates a pocket of silence where it hides." },
        { name: "Tenor Trout", xp: 26200, gold: 13100, desc: "A high male voice. It sings passionate arias." },
        { name: "Contralto Carp", xp: 26500, gold: 13250, desc: "The lowest female voice. Dark and rich tone." },
        { name: "Mezzo-Soprano Minnow", xp: 26800, gold: 13400, desc: "A versatile singer. It fills the middle ground." },
        { name: "Duet Dace", xp: 27000, gold: 13500, desc: "They always swim in pairs, singing in harmony." }
      ],
      Fine: [
        { name: "Opera Singer Puffer", xp: 55000, gold: 27500, desc: "A fat fish with a powerful voice. It can shatter glass with a high C note. It demands attention." },
        { name: "Woodwind Walleye", xp: 55500, gold: 27750, desc: "It sounds like a clarinet when it breathes. A mellow tone." },
        { name: "Rhythm Keeper Drum", xp: 56000, gold: 28000, desc: "Its heart beats in perfect 4/4 time. It beats its tail against rocks to keep the tempo of the tide." },
        { name: "Brass-Section Bass", xp: 56500, gold: 28250, desc: "Loud and brassy. It sounds like a trumpet blast." },
        { name: "Discordant Pike", xp: 57000, gold: 28500, desc: "An ugly sound made flesh. It screeches when hooked, sounding like nails on a chalkboard." },
        { name: "String-Quartet Squid", xp: 57500, gold: 28750, desc: "Four tentacles playing four different parts. Sophisticated music." },
        { name: "Chime Scale Minnow", xp: 58000, gold: 29000, desc: "A school of these sounds like wind chimes in a gentle breeze. They bring peace to the listener." },
        { name: "Percussion Puffer", xp: 58500, gold: 29250, desc: "It puffs up and others hit it like a drum. It is the beat." },
        { name: "Cello-Bow Chub", xp: 59000, gold: 29500, desc: "Long and thin. It is used to play the strings of the ocean." },
        { name: "Piano-Key Pike", xp: 59500, gold: 29750, desc: "Black and white stripes. It plays a scale as it swims." },
        { name: "Acoustic-Guitar Gar", xp: 59800, gold: 29900, desc: "A hollow-bodied fish. It resonates with a warm, wooden sound." },
        { name: "Drum Beat Turtle", xp: 60000, gold: 30000, desc: "Using its shell as a drum, it signals war to the deep. The booming sound travels for hundreds of miles." }
      ],
      Rare: [
        { name: "Jazz-Improvisation Jelly", xp: 125000, gold: 62500, desc: "It never swims the same way twice. It makes it up as it goes along." },
        { name: "Blues-Scale Betta", xp: 127500, gold: 63750, desc: "It sings a sad song of lost love. It has soul." },
        { name: "Conductor Swordfish", xp: 130000, gold: 65000, desc: "A fish with a baton-like spine. It directs the flow of the current with sharp movements. The leader of the orchestra." },
        { name: "Rock-Anthem Ray", xp: 131000, gold: 65500, desc: "Loud, energetic, and popular. It draws a crowd." },
        { name: "Crescendo Shark", xp: 132500, gold: 66250, desc: "It gets louder and larger the closer it gets to you. The intensity builds until it strikes." },
        { name: "Classical-Concerto Carp", xp: 134000, gold: 67000, desc: "Complex and refined. It follows a strict structure." },
        { name: "Harmony Hydra", xp: 135000, gold: 67500, desc: "Each head sings a different part of the chord. Together, they create a perfect harmony. Dangerous beauty." },
        { name: "Folk-Song Flounder", xp: 136000, gold: 68000, desc: "It tells the stories of the common fish. Simple and catchy." },
        { name: "Sonic Boom Barracuda", xp: 137500, gold: 68750, desc: "Breaks the sound barrier underwater. The shockwave stuns prey instantly. Fast as sound." },
        { name: "Techno-Beat Trout", xp: 138000, gold: 69000, desc: "Repetitive and driving. It keeps you moving." },
        { name: "Dubstep-Drop Dory", xp: 139000, gold: 69500, desc: "It builds up and then drops heavily to the bottom. Wub wub." },
        { name: "Requiem Ray", xp: 140000, gold: 70000, desc: "A sad, slow fish. It sings for the dead. Its song brings tears to even the hardest sailors." }
      ],
      Epic: [
        { name: "The Orchestra (School)", xp: 315000, gold: 157500, desc: "Thousands of fish moving and singing as one. A symphony of life." },
        { name: "Mozart Miracle Koi", xp: 320000, gold: 160000, desc: "Complex, beautiful, and genius. A masterpiece of a fish. Its patterns look like sheet music." },
        { name: "The Soloist (Whale)", xp: 325000, gold: 162500, desc: "A single whale with a voice that can be heard across the world. It sings alone." },
        { name: "Banshee Bass", xp: 330000, gold: 165000, desc: "Its scream kills. Wear earplugs when fishing for this. It is the sound of death." },
        { name: "The Encore (Eel)", xp: 335000, gold: 167500, desc: "Just when you think it's over, it comes back. It refuses to leave the stage." },
        { name: "Subwoofer Whale", xp: 340000, gold: 170000, desc: "Generates bass frequencies that can cause earthquakes. You feel it in your bones rather than hear it." },
        { name: "The Standing Ovation (Crab)", xp: 345000, gold: 172500, desc: "A giant crab that claps its claws like thunder. It approves of your catch." },
        { name: "Golden Harp Fish", xp: 350000, gold: 175000, desc: "Its ribs are strings. The water plays it like an instrument as it swims. A living lyre." },
        { name: "The Earworm (Parasite)", xp: 355000, gold: 177500, desc: "A song you can't get out of your head. It burrows into your mind." },
        { name: "Silence Incarnate Eel", xp: 360000, gold: 180000, desc: "Where it swims, no sound can exist. Absolute void of noise. It consumes vibrations." }
      ],
      Legendary: [
        { name: "The Maestro (Humanoid)", xp: 825000, gold: 412500, desc: "A figure that conducts the tides. The ocean obeys his command." },
        { name: "Lost Chord Coelacanth", xp: 850000, gold: 425000, desc: "The secret sound that pleases the gods. Musicians search their whole lives for this fish." },
        { name: "The Perfect Pitch (Fork)", xp: 860000, gold: 430000, desc: "A living tuning fork that is the standard for all sound. It never wavers." },
        { name: "Siren Voice Mermaid", xp: 875000, gold: 437500, desc: "Pure temptation. It calls you to jump in. Its voice is irresistible." },
        { name: "The Anthem (Shark)", xp: 885000, gold: 442500, desc: "A song of national pride and power. It rallies the ocean." },
        { name: "Grand Finale Marlin", xp: 900000, gold: 450000, desc: "An explosive, triumphant fish that marks the end of the show. It leaps with a crash of cymbals." },
        { name: "The Symphony (Entity)", xp: 925000, gold: 462500, desc: "Living music. It has no physical form, only sound." },
        { name: "The Serenade (Whale)", xp: 950000, gold: 475000, desc: "A love song to the moon. It brings romance to the sea." }
      ],
      Mythic: [
        { name: "The Sound of Silence (Ray)", xp: 2000000, gold: 1000000, desc: "The absence of all sound. A deafening quiet." },
        { name: "The Big Bang (Pistol Shrimp)", xp: 2100000, gold: 1050000, desc: "The first sound ever made. It is still echoing." },
        { name: "Cosmic Harmony Whale", xp: 2200000, gold: 1100000, desc: "The sound of planets orbiting. Cosmic harmony given form. It sings the song of the spheres." },
        { name: "The Universal Vibration (Eel)", xp: 2300000, gold: 1150000, desc: "The string that vibrates to create reality. Pluck it and the world changes." },
        { name: "Great Silence Shark", xp: 2500000, gold: 1250000, desc: "The entropy of sound. It swallows all music and leaves only quiet. The end of the concert." },
        { name: "The Music of Spheres (School)", xp: 2600000, gold: 1300000, desc: "The celestial bodies singing in orbit. A song of gravity." },
        { name: "The Final Chord (Whale)", xp: 2800000, gold: 1400000, desc: "The last sound before the end of time. A resolving note." }
      ],
      Exotic: [
        { name: "Universal Frequency Whale", xp: 8400000, gold: 4200000, desc: "It hums the resonant frequency of the universe. Being near it aligns your atoms." },
        { name: "Pipe Organ Leviathan", xp: 9000000, gold: 4500000, desc: "A massive, multi-tubed creature that plays a funeral dirge for the dying stars." }
      ],
      Arcane: [
        { name: "The Great Composer (Giant Turtle)", xp: 42000000, gold: 21000000, desc: "It carries an entire orchestra on its back. It writes the sheet music for reality itself." }
      ]
    }
  },
  24: {
    name: "Astral Sea",
    unlockLevel: 3900,
    unlockGold: 1750000000,
    boatRequired: "Stardust Cruiser",
    boatPrice: 1750000000,
    description: "You are fishing in the vacuum of space. Nebulas form the reefs, and stars are the plankton. The fish here are celestial bodies given life.",
    fish: {
      Common: [
        { name: "Asteroid Crab", xp: 13000, gold: 6500, desc: "Looks like a floating rock until it extends its legs. It drifts through the vacuum. Hard to crack." },
        { name: "Space-Dust Dace", xp: 13100, gold: 6550, desc: "Made of gathered particles. It disperses if you sneeze." },
        { name: "Stardust Guppy", xp: 13200, gold: 6600, desc: "A tiny pinch of glowing cosmic dust. It sparkles against the black void." },
        { name: "Vacuum-Seal Salmon", xp: 13300, gold: 6650, desc: "Its scales are air-tight. It preserves itself perfectly." },
        { name: "Vacuum Breather Minnow", xp: 13400, gold: 6700, desc: "Adapted to survive in zero atmosphere. It holds its breath for eons." },
        { name: "Zero-G Goby", xp: 13500, gold: 6750, desc: "It doesn't know which way is up. It spins freely." },
        { name: "Orbit Minnow", xp: 13600, gold: 6800, desc: "Spins around larger objects. It never stops moving. It is caught in a gravitational loop." },
        { name: "Rocket-Fin Roach", xp: 13700, gold: 6850, desc: "It has small thrusters on its fins. It zooms around." },
        { name: "Comet Tail Tetra", xp: 13800, gold: 6900, desc: "Leaves a trail of ice crystals behind it. It is a miniature shooting star." },
        { name: "Satellite-Dish Dory", xp: 13900, gold: 6950, desc: "Shaped like a dish. It catches signals from home." },
        { name: "Solar-Wind Walleye", xp: 14000, gold: 7000, desc: "It rides the solar wind like a surfer. It glows with radiation." },
        { name: "Lunar-Lander Loach", xp: 14100, gold: 7050, desc: "It has spindly legs for landing on moons. One small step for a fish." },
        { name: "Mars-Rover Ray", xp: 14200, gold: 7100, desc: "It has wheels instead of fins. It explores red planets." },
        { name: "Asteroid-Belt Bass", xp: 14300, gold: 7150, desc: "It lives in the crowded belt. It is good at dodging." },
        { name: "Space-Junk Jelly", xp: 14400, gold: 7200, desc: "Made of old satellites and debris. It floats aimlessly." }
      ],
      Uncommon: [
        { name: "Planetary Puffer", xp: 28000, gold: 14000, desc: "Inflates into a miniature gas giant planet with rings. It has its own moons." },
        { name: "Galaxy-Spiral Guppy", xp: 28200, gold: 14100, desc: "Its side pattern looks like a spiral galaxy. It contains millions of stars." },
        { name: "Meteor Strike Pike", xp: 28500, gold: 14250, desc: "Hits the bait with the force of an impact event. It creates craters in the water." },
        { name: "Black-Hole Baby", xp: 28800, gold: 14400, desc: "A tiny singularity. It eats more than it should." },
        { name: "Zero G Eel", xp: 29000, gold: 14500, desc: "Floats lazily, unburdened by gravity. It moves in three dimensions easily." },
        { name: "Star-Cluster Crab", xp: 29200, gold: 14600, desc: "A crab covered in glowing crystals. A dense group of stars." },
        { name: "Nebula Nudibranch", xp: 29500, gold: 14750, desc: "A colorful slug made of ionized gas clouds. It is a stellar nursery in miniature." },
        { name: "Nebula-Cloud Carp", xp: 29800, gold: 14900, desc: "A large, gaseous fish. Stars are born inside it." },
        { name: "Satellite Fish", xp: 30000, gold: 15000, desc: "Has metal antennae. It transmits strange signals to distant stars." },
        { name: "Supernova-Remnant Ray", xp: 30200, gold: 15100, desc: "The colorful remains of an exploded star. Beautiful chaos." },
        { name: "Red-Dwarf Dace", xp: 30500, gold: 15250, desc: "Small, cool, and long-lived. It will outlast us all." },
        { name: "Blue-Giant Grouper", xp: 30800, gold: 15400, desc: "Massive, hot, and short-lived. It burns brightly." },
        { name: "Neutron-Star Newt", xp: 31000, gold: 15500, desc: "Incredibly dense. Do not drop it on your foot." }
      ],
      Fine: [
        { name: "Solar Flare Bass", xp: 65000, gold: 32500, desc: "Hotter than the surface of the sun. Use a tungsten hook. It radiates ultraviolet light." },
        { name: "Space-Time Trout", xp: 65500, gold: 32750, desc: "It warps the fabric of reality as it swims. It creates ripples in time." },
        { name: "Eclipse Ray", xp: 66000, gold: 33000, desc: "A black disc that blocks out the starlight behind it. It brings darkness." },
        { name: "Wormhole-Wanderer Walleye", xp: 66500, gold: 33250, desc: "It takes shortcuts through the universe. It is never where you think it is." },
        { name: "Constellation Urchin", xp: 67000, gold: 33500, desc: "Its spines connect to form zodiac signs. A prickly map of the sky." },
        { name: "Dark-Energy Dace", xp: 67500, gold: 33750, desc: "It pushes the universe apart. It accelerates expansion." },
        { name: "Gamma Ray Burst Goby", xp: 68000, gold: 34000, desc: "Highly radioactive. Dangerous and short-lived. It explodes with energy." },
        { name: "Antimatter Angler", xp: 68500, gold: 34250, desc: "Do not let it touch normal matter. Boom." },
        { name: "Cosmic-Ray Carp", xp: 69000, gold: 34500, desc: "It travels at near light speed. It penetrates everything." },
        { name: "Gravity-Wave Goby", xp: 69500, gold: 34750, desc: "It is a ripple in spacetime. It passes through you." },
        { name: "Light-Speed Loach", xp: 69800, gold: 34900, desc: "The fastest fish in the universe. It is a blur." },
        { name: "Void Shark", xp: 70000, gold: 35000, desc: "Perfectly black. It hunts in the spaces between stars. It is the predator of the empty dark." }
      ],
      Rare: [
        { name: "Red Giant Sunfish", xp: 150000, gold: 75000, desc: "A massive, old fish near the end of its life cycle. It has expanded to a huge size." },
        { name: "Constellation-Keeper Crab", xp: 152000, gold: 76000, desc: "It arranges the stars in the sky. It keeps order." },
        { name: "White Dwarf Puffer", xp: 155000, gold: 77500, desc: "Small, dense, and incredibly heavy. It is the core of a dead star." },
        { name: "Zodiac-Sign Salmon", xp: 157000, gold: 78500, desc: "It changes form depending on the month. There are twelve variants." },
        { name: "Pulsar Perch", xp: 160000, gold: 80000, desc: "Spins rapidly, shooting beams of radiation from its poles. It acts as a lighthouse." },
        { name: "Milky-Way Minnow", xp: 161000, gold: 80500, desc: "A fish that contains our home galaxy. It feels familiar." },
        { name: "Dark Matter Entity", xp: 162000, gold: 81000, desc: "It interacts only with gravity, not light. Invisible but heavy. It holds the galaxy together." },
        { name: "Andromeda-Angler", xp: 163000, gold: 81500, desc: "A fish from a neighboring galaxy. It is rushing towards us." },
        { name: "Big-Bang Bass", xp: 164000, gold: 82000, desc: "The explosion that started it all, caught in a net." },
        { name: "Quasar Queen Angler", xp: 165000, gold: 82500, desc: "The brightest fish in the universe. Its lure outshines galaxies." },
        { name: "Cosmic-Background Carp", xp: 166000, gold: 83000, desc: "The leftover heat from the big bang. It is everywhere." },
        { name: "Expansion-Theory Eel", xp: 167000, gold: 83500, desc: "It gets longer the further away it is. The universe is stretching." }
      ],
      Epic: [
        { name: "The Galaxy (Ray)", xp: 375000, gold: 187500, desc: "A ray with spiral arms. It rotates slowly and majestically." },
        { name: "Galactic Core Discus", xp: 380000, gold: 190000, desc: "A swirling spiral of billions of tiny lights. It contains a supermassive center." },
        { name: "The Universe (Whale)", xp: 385000, gold: 192500, desc: "A whale that contains everything that ever was. It is infinite." },
        { name: "Supernova Salmon", xp: 390000, gold: 195000, desc: "Catching it triggers an explosion of cosmic proportions. A beautiful death." },
        { name: "The Multiverse (Hydra)", xp: 395000, gold: 197500, desc: "Many heads, many realities. Each one is different." },
        { name: "Traveler Alien Fish", xp: 400000, gold: 200000, desc: "An alien probe disguised as a fish. It has seen many worlds. It watches you." },
        { name: "The Dimension (Door)", xp: 405000, gold: 202500, desc: "A fish that is a portal to another plane. Step through." },
        { name: "Cosmic Horror Squid", xp: 410000, gold: 205000, desc: "Tentacles that span light-years. It is vast and terrifying." },
        { name: "The Void-Walker (Shark)", xp: 415000, gold: 207500, desc: "It walks between stars. It eats planets." },
        { name: "Event Horizon Eater Shark", xp: 420000, gold: 210000, desc: "It lives on the edge of a black hole. Time stands still near it." }
      ],
      Legendary: [
        { name: "The Star-Maker (Entity)", xp: 900000, gold: 450000, desc: "It compresses gas into stars. It lights up the universe." },
        { name: "The Planet-Eater (Worm)", xp: 925000, gold: 462500, desc: "A massive worm that bores through worlds. It leaves only dust." },
        { name: "Big Dipper Starfish", xp: 950000, gold: 475000, desc: "A constellation caught in a net. It points the way North." },
        { name: "The Comet-Rider (Surfer)", xp: 960000, gold: 480000, desc: "It surfs on the tail of a comet. It travels the cosmos." },
        { name: "Star Eater Leviathan", xp: 975000, gold: 487500, desc: "It swallows suns for breakfast. It brings darkness to galaxies." },
        { name: "The Black-Sun (Star)", xp: 980000, gold: 490000, desc: "A star that shines darkness instead of light. Anti-light." },
        { name: "The Cosmic-Web (Spider)", xp: 990000, gold: 495000, desc: "It spins the structure of the universe. Galaxies are caught in its web." },
        { name: "Entropy End Eel", xp: 1000000, gold: 500000, desc: "The heat death of the universe in fish form. Cold and final." }
      ],
      Mythic: [
        { name: "The Great Attractor (Magnet-Whale)", xp: 2400000, gold: 1200000, desc: "Something is pulling everything towards it. We don't know what it is." },
        { name: "Creator Whale", xp: 2500000, gold: 1250000, desc: "The spark that started it all. It seeds life across the universe." },
        { name: "The Dark Flow (Eel)", xp: 2600000, gold: 1300000, desc: "A current flowing towards a point outside the universe. Where does it go?" },
        { name: "The Big Rip (Sawfish)", xp: 2700000, gold: 1350000, desc: "The force that tears the universe apart. Atoms unravel." },
        { name: "Destroyer Shark", xp: 2800000, gold: 1400000, desc: "The void that ends it all. It hunts the Creator." },
        { name: "The Heat Death (Ice-Fish)", xp: 2900000, gold: 1450000, desc: "The final state of the universe. Maximum entropy. Zero energy." },
        { name: "The Inflation (Puffer)", xp: 3000000, gold: 1500000, desc: "The universe expanding faster than light. It separates everything." }
      ],
      Exotic: [
        { name: "Galactic Super-Cluster Crab", xp: 9000000, gold: 4500000, desc: "A crab that carries thousands of galaxies on its back. A moving metropolis of stars." },
        { name: "Dark Flow Ray", xp: 9500000, gold: 4750000, desc: "A ray that glides towards the edge of the observable universe, never to return." }
      ],
      Arcane: [
        { name: "The Cosmic Weaver (Spider-Crab)", xp: 45000000, gold: 22500000, desc: "It sits at the center of the universe, spinning the filaments that connect all galaxies." }
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
        { name: "Spaghettification-Strand Salmon", xp: 15100, gold: 7550, desc: "Stretched and pulled until it is just a line. It is uncomfortable." },
        { name: "Photon Ring Fish", xp: 15200, gold: 7600, desc: "Made of light trapped in a circular orbit. It moves at light speed." },
        { name: "Tidal-Lock Tetra", xp: 15300, gold: 7650, desc: "It always faces the black hole. One side is hot, one is cold." },
        { name: "Time Dilation Tetra", xp: 15400, gold: 7700, desc: "It moves slower the faster you try to reel it in. A relativistic headache." },
        { name: "Gravity-Gradient Goby", xp: 15500, gold: 7750, desc: "It feels different gravity at its head than its tail. It is stretched." },
        { name: "Gravity Well Guppy", xp: 15600, gold: 7800, desc: "Extremely heavy. It creates a dimple in the fabric of space." },
        { name: "Event-Horizon Herring", xp: 15700, gold: 7850, desc: "It lives on the edge. One mistake and it is gone forever." },
        { name: "Accretion Disk Crab", xp: 15800, gold: 7900, desc: "Feeds on the superheated matter swirling into the hole. It glows with x-rays." },
        { name: "Singularity-Seeker Sardine", xp: 15900, gold: 7950, desc: "It wants to go in. You are saving it by catching it." },
        { name: "Photon-Sphere Puffer", xp: 16000, gold: 8000, desc: "A ball of trapped light. It shines in the darkness." },
        { name: "Accretion-Disk Dace", xp: 16100, gold: 8050, desc: "It swims in the hot disk. It is made of plasma." },
        { name: "Relativistic-Jet Ray", xp: 16200, gold: 8100, desc: "It shoots out from the poles of the black hole. It travels fast." },
        { name: "Time-Dilation Trout", xp: 16300, gold: 8150, desc: "It aged 100 years while you blinked. It is old." },
        { name: "Space-Curvature Carp", xp: 16400, gold: 8200, desc: "It follows the curve of space. It swims in circles." }
      ],
      Uncommon: [
        { name: "Quantum-Tunneling Tetra", xp: 31500, gold: 15750, desc: "It passes through solid walls. It cheats physics." },
        { name: "Heisenberg-Uncertainty Halibut", xp: 31800, gold: 15900, desc: "You can know its speed or its location, but not both." },
        { name: "Red Shift Ray", xp: 32000, gold: 16000, desc: "It appears red because it is moving away from you at light speed. Hard to chase." },
        { name: "Schrodinger-Catfish", xp: 32200, gold: 16100, desc: "Is it alive? Is it dead? Open the cooler to find out." },
        { name: "Blue Shift Bass", xp: 32500, gold: 16250, desc: "It appears blue because it is rushing towards you. Duck!" },
        { name: "Entanglement-Eel", xp: 32800, gold: 16400, desc: "Whatever happens to this eel happens to its partner instantly." },
        { name: "Wormhole Weaver Eel", xp: 33000, gold: 16500, desc: "Burrows through space-time to escape. It stitches holes in the universe." },
        { name: "Superposition-Salmon", xp: 33500, gold: 16750, desc: "It is in multiple states at once. It is confusing." },
        { name: "Paradox Pike", xp: 34000, gold: 17000, desc: "It is both caught and not caught until you check the net. Schrödinger's fish." },
        { name: "Wave-Function Whale (Small)", xp: 34500, gold: 17250, desc: "A probability wave given form. It collapses when touched." },
        { name: "Singularity Scout Goby", xp: 35000, gold: 17500, desc: "It ventured into the black hole and somehow returned. It has seen the end." },
        { name: "Probability-Pike", xp: 35500, gold: 17750, desc: "It is unlikely to exist, yet here it is." },
        { name: "Observation-Effect Octopus", xp: 36000, gold: 18000, desc: "It changes its behavior when you look at it. Don't blink." }
      ],
      Fine: [
        { name: "String-Theory Sturgeon", xp: 74000, gold: 37000, desc: "Made of vibrating strings. The fundamental building block." },
        { name: "Hawking Radiation Ray", xp: 75000, gold: 37500, desc: "Slowly evaporating into pure energy. Catch it before it disappears." },
        { name: "M-Theory Minnow", xp: 75500, gold: 37750, desc: "It unifies all string theories. It is the master theory." },
        { name: "Information Paradox Cod", xp: 76000, gold: 38000, desc: "Contains information that should have been destroyed. A glitch in physics." },
        { name: "Brane-World Bass", xp: 76500, gold: 38250, desc: "It lives on a membrane in higher dimensions. It is flat." },
        { name: "Relativity Remora", xp: 77000, gold: 38500, desc: "Hitches a ride on faster-than-light particles. A cosmic hitchhiker." },
        { name: "Calabi-Yau Carp", xp: 77500, gold: 38750, desc: "A six-dimensional shape curled up small. It is complex." },
        { name: "Tidal Force Turtle", xp: 78000, gold: 39000, desc: "Its shell is reinforced to withstand infinite gravity. It cannot be crushed." },
        { name: "Eleven-Dimension Dory", xp: 78500, gold: 39250, desc: "It can move in directions you can't even imagine." },
        { name: "Planck-Length Pike", xp: 79000, gold: 39500, desc: "The smallest possible fish. It cannot be any smaller." },
        { name: "Quantum-Foam Flounder", xp: 79500, gold: 39750, desc: "Made of bubbling spacetime. It is unstable." },
        { name: "Null Geometry Flounder", xp: 80000, gold: 40000, desc: "A shape that cannot exist in three dimensions. Looking at it hurts." }
      ],
      Rare: [
        { name: "Information-Paradox Pike", xp: 175000, gold: 87500, desc: "It contains data that was destroyed. It breaks the rules." },
        { name: "Unseeable Angler", xp: 180000, gold: 90000, desc: "It absorbs all light. A fish-shaped void. You cast into the dark." },
        { name: "Holographic-Principle Halibut", xp: 182000, gold: 91000, desc: "It is a 2D projection on the surface of the universe. It looks 3D." },
        { name: "Time Loop Trout", xp: 185000, gold: 92500, desc: "It keeps biting the hook over and over again forever. It is trapped in a moment." },
        { name: "Firewall-Fish", xp: 188000, gold: 94000, desc: "A wall of high energy at the event horizon. It burns." },
        { name: "Dimensional Ripper Shark", xp: 190000, gold: 95000, desc: "Its fins slice through the barrier between universes. It hunts in the multiverse." },
        { name: "Naked-Singularity Newt", xp: 192000, gold: 96000, desc: "A singularity without an event horizon. It is exposed physics." },
        { name: "Gravity Lens Jelly", xp: 195000, gold: 97500, desc: "It warps the image of the stars behind it. A living lens." },
        { name: "Wormhole-Throat Trout", xp: 198000, gold: 99000, desc: "It lives inside the tunnel. It connects two places." },
        { name: "Infinite Mass Shark", xp: 200000, gold: 100000, desc: "If it stops moving, it collapses into a black hole. It must swim to survive." },
        { name: "Exotic-Matter Eel", xp: 205000, gold: 102500, desc: "It has negative mass. It falls upwards." },
        { name: "The Ghost-Particle (Neutrino)", xp: 210000, gold: 105000, desc: "It passes through everything. It is barely there." }
      ],
      Epic: [
        { name: "The Singularity (Point)", xp: 440000, gold: 220000, desc: "A point of infinite density. It crushes everything." },
        { name: "The Event (Horizon)", xp: 445000, gold: 222500, desc: "The boundary of no return. A wall of black." },
        { name: "Event Horizon Ray", xp: 450000, gold: 225000, desc: "The point of no return. Once you see it, you cannot escape." },
        { name: "The Gravity (Well)", xp: 455000, gold: 227500, desc: "A deep pit in spacetime. Falling in is easy, getting out is impossible." },
        { name: "Singularity Sunfish", xp: 460000, gold: 230000, desc: "Infinite density in a single point. Heavier than a sun." },
        { name: "The Time (Stop)", xp: 465000, gold: 232500, desc: "Time ceases to exist here. Frozen forever." },
        { name: "Cosmic String Serpent", xp: 470000, gold: 235000, desc: "A one-dimensional defect in space-time topology. Extremely sharp." },
        { name: "The Light (Bender)", xp: 475000, gold: 237500, desc: "It bends light into circles. It creates halos." },
        { name: "White Hole Whale", xp: 480000, gold: 240000, desc: "It spews matter out instead of sucking it in. A fountain of creation." },
        { name: "Observer Catfish", xp: 500000, gold: 250000, desc: "By looking at it, you collapse its quantum wave function. It changes when observed." }
      ],
      Legendary: [
        { name: "The Physics-Breaker (Shark)", xp: 1050000, gold: 525000, desc: "It ignores the laws of physics. It does what it wants." },
        { name: "The Math-Error Glitchfish", xp: 1075000, gold: 537500, desc: "Dividing by zero given form. It shouldn't exist." },
        { name: "Gravity Master Grouper", xp: 1100000, gold: 550000, desc: "It decides which way is down. It controls the battlefield." },
        { name: "The Impossible-Shape (Geometry)", xp: 1125000, gold: 562500, desc: "A non-euclidean fish. It hurts the brain." },
        { name: "Time Eater Shark", xp: 1150000, gold: 575000, desc: "It consumes the past, present, and future. It leaves no history." },
        { name: "The Infinite-Density (Cube)", xp: 1175000, gold: 587500, desc: "A cube of matter so dense it sinks through the floor of reality." },
        { name: "Reality Anchor Crab", xp: 1200000, gold: 600000, desc: "The only thing holding the universe together near the hole. Do not move it." },
        { name: "The Zero-Volume (Point)", xp: 1250000, gold: 625000, desc: "It has mass but no size. A paradox." }
      ],
      Mythic: [
        { name: "Void Beyond Leviathan", xp: 3000000, gold: 1500000, desc: "What lies on the other side of the black hole. A mystery." },
        { name: "The Theory of Everything (Nautilus)", xp: 3100000, gold: 1550000, desc: "The equation that solves the universe. It is beautiful." },
        { name: "The Grand Unified Theory (Leviathan)", xp: 3200000, gold: 1600000, desc: "The unification of all forces. Gravity, electromagnetism, nuclear." },
        { name: "Null Existence Eel", xp: 3300000, gold: 1650000, desc: "A fish that proves nothing is real. Capturing it is a paradox." },
        { name: "The God Particle (Boson)", xp: 3400000, gold: 1700000, desc: "It gives mass to everything. It is the anchor of reality." },
        { name: "The Dark Energy (Ray)", xp: 3500000, gold: 1750000, desc: "The mysterious force expanding the universe. It is unknown." },
        { name: "The Cosmic Censor (Turtle)", xp: 3600000, gold: 1800000, desc: "It hides the naked singularity. It protects us from chaos." }
      ],
      Exotic: [
        { name: "Spacetime-Tear Shark", xp: 10800000, gold: 5400000, desc: "Its teeth cut through the fabric of space itself, creating miniature wormholes with every bite." },
        { name: "Hawking Radiation Hydra", xp: 11400000, gold: 5700000, desc: "A creature that feeds on the evaporation of black holes. Each head glows with the energy of a dying star." }
      ],
      Arcane: [
        { name: "The Universal Reset Serpent", xp: 54000000, gold: 27000000, desc: "If it ever completes a full circle around the black hole, the universe restarts. We must keep it swimming." }
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
        { name: "Quartz-Shard Tetra", xp: 16100, gold: 8050, desc: "A common, jagged fish made of white quartz. Sharp to the touch." },
        { name: "Pyramid Piranha", xp: 16200, gold: 8100, desc: "A triangular predator. Three teeth, three eyes, three fins." },
        { name: "Glass-Bead Guppy", xp: 16300, gold: 8150, desc: "Perfectly round and transparent. It looks like a marble." },
        { name: "Fractal Fin Betta", xp: 16400, gold: 8200, desc: "Its pattern repeats infinitely the closer you look. A mathematical beauty." },
        { name: "Mica-Flake Minnow", xp: 16500, gold: 8250, desc: "Flat and shiny. It peels apart in layers." },
        { name: "Polygon Perch", xp: 16600, gold: 8300, desc: "Low-poly and sharp. Looks like an unfinished 3D model." },
        { name: "Pyrite-Cube Piranha", xp: 16700, gold: 8350, desc: "Fool's gold. It looks valuable but is just common iron sulfide." },
        { name: "Shard Skipper Minnow", xp: 16800, gold: 8400, desc: "Skims across the surface of the crystal flow. Made of tiny glass splinters." },
        { name: "Silica-Sand Dace", xp: 16900, gold: 8450, desc: "Made of raw glass material. Rough and gritty." },
        { name: "Faceted Fry", xp: 17000, gold: 8500, desc: "A baby fish with diamond-cut scales. It catches the light." },
        { name: "Prism-Light Platy", xp: 17100, gold: 8550, desc: "It splits light into rainbows as it swims." },
        { name: "Mirror-Scale Roach", xp: 17200, gold: 8600, desc: "You can see your own reflection in its side. Vanity fish." },
        { name: "Crystal-Grid Goby", xp: 17300, gold: 8650, desc: "It hides on the grid lines of the dimension floor." },
        { name: "Refracted-Rainbow Rasbora", xp: 17400, gold: 8700, desc: "A school of them looks like a moving spectrum." }
      ],
      Uncommon: [
        { name: "Refraction Ray", xp: 35000, gold: 17500, desc: "Bends light around itself. It looks like a distortion in the air." },
        { name: "Bismuth-Hopper", xp: 35200, gold: 17600, desc: "Geometric, rainbow-colored metal. It hops on the crystal surface." },
        { name: "Symmetry Salmon", xp: 35500, gold: 17750, desc: "Perfectly symmetrical down to the molecular level. Balance in all things." },
        { name: "Stalactite-Sturgeon (Small)", xp: 35800, gold: 17900, desc: "Hangs from the ceiling of crystal caves. Points down." },
        { name: "Geode Grouper", xp: 36000, gold: 18000, desc: "Rough on the outside, sparkling amethyst on the inside. A hidden gem." },
        { name: "Stalagmite-Shark (Small)", xp: 36200, gold: 18100, desc: "Swims near the floor. Points up. Don't step on it." },
        { name: "Diamond Hard Gar", xp: 36500, gold: 18250, desc: "Cannot be cut or scratched. It bites through diamond drills." },
        { name: "Rubik's-Cube Ray", xp: 36800, gold: 18400, desc: "Its segments rotate. It solves itself when it rests." },
        { name: "Glass Blower Eel", xp: 37000, gold: 18500, desc: "Transparent and tubular. You can see its digestion. It expands when heated." },
        { name: "Polished-Gem Perch", xp: 37200, gold: 18600, desc: "Smooth and flawless. It has high clarity." },
        { name: "Laser-Beam Loach", xp: 37400, gold: 18700, desc: "It shoots a harmless red laser from its mouth to navigate." },
        { name: "Fiber-Optic Flounder", xp: 37600, gold: 18800, desc: "Transmits data through its body. It glows at the ends." },
        { name: "Geometrical Gar", xp: 37800, gold: 18900, desc: "Made of acute angles. Very sharp." }
      ],
      Fine: [
        { name: "Tesseract Trout", xp: 80000, gold: 40000, desc: "A fish that exists in four dimensions. It folds inside out. Mind-bending." },
        { name: "Sapphire-Scale Salmon", xp: 80500, gold: 40250, desc: "Deep blue and incredibly hard. Corundum fish." },
        { name: "Ruby-Eye Rockfish", xp: 81000, gold: 40500, desc: "Its eyes are genuine star rubies. They glow red." },
        { name: "Golden Ratio Nautilus", xp: 82000, gold: 41000, desc: "A spiral-shaped shell creature. Aesthetically perfect. Nature's math." },
        { name: "Emerald-Cut Eel", xp: 83000, gold: 41500, desc: "Rectangular and step-cut. It is green and valuable." },
        { name: "Kaleidoscope Koi", xp: 84000, gold: 42000, desc: "Its colors shift and rotate as it swims. A constantly changing pattern." },
        { name: "Amethyst-Angler", xp: 85000, gold: 42500, desc: "Its lure is a purple crystal. It brings peace and intoxication." },
        { name: "Prism Pike", xp: 86000, gold: 43000, desc: "Splits white light into a deadly rainbow laser. It attacks with color." },
        { name: "Topaz-Tail Tuna", xp: 87000, gold: 43500, desc: "Yellow and orange. It glows like the sun." },
        { name: "Obsidian Obelisk Fish", xp: 88000, gold: 44000, desc: "A tall, dark, pillar-like fish that floats upright. It hums a low frequency." },
        { name: "Zircon-Zebrafish", xp: 89000, gold: 44500, desc: "Sparkles like diamond but heavier. Radioactive dating says it's old." },
        { name: "Tourmaline-Trout", xp: 90000, gold: 45000, desc: "Pink on the inside, green on the outside. Watermelon stone." }
      ],
      Rare: [
        { name: "Euclidean Eel", xp: 200000, gold: 100000, desc: "Follows straight lines and right angles only. It cannot turn in curves." },
        { name: "Möbius-Strip Moray", xp: 202000, gold: 101000, desc: "It has only one side and one edge. It is infinite." },
        { name: "Non-Euclidean Angler", xp: 205000, gold: 102500, desc: "Its geometry hurts the brain. It has too many corners. It defies logic." },
        { name: "Klein-Bottle Koi", xp: 208000, gold: 104000, desc: "Its inside is its outside. It holds water within itself." },
        { name: "Crystal Clear Leviathan", xp: 210000, gold: 105000, desc: "Invisible in the water. You only see the displacement of the shards." },
        { name: "Hypercube-Halibut", xp: 212000, gold: 106000, desc: "A flat fish in 4D. It can disappear by rotating." },
        { name: "Gemstone Golem Crab", xp: 215000, gold: 107500, desc: "A construct of ruby, sapphire, and emerald. Valuable and heavy." },
        { name: "Paradox-Prism Pike", xp: 218000, gold: 109000, desc: "It refracts darkness instead of light." },
        { name: "Mirror Dimension Carp", xp: 220000, gold: 110000, desc: "It lives in the reflection of the crystal, not the crystal itself." },
        { name: "Dimension-Fold Dory", xp: 222000, gold: 111000, desc: "It folds space to swim faster. A warp-drive fish." },
        { name: "Schrodinger's-Shard", xp: 225000, gold: 112500, desc: "A crystal that is both broken and whole." },
        { name: "Quantum-Crystal Crab", xp: 230000, gold: 115000, desc: "It mines crystals from other timelines." }
      ],
      Epic: [
        { name: "Great Prism Sunfish", xp: 500000, gold: 250000, desc: "The source of all color in this dimension. It radiates pure spectrums." },
        { name: "The Monolith Whale", xp: 505000, gold: 252500, desc: "A giant black slab with proportions 1:4:9. It is full of stars." },
        { name: "Living Algorithm Eel", xp: 510000, gold: 255000, desc: "A mathematical equation that gained sentience. It solves problems." },
        { name: "The Obelisk Oarfish", xp: 515000, gold: 257500, desc: "A long, tapered stone fish covered in hieroglyphs." },
        { name: "Infinity Die Puffer", xp: 520000, gold: 260000, desc: "A spherical fish with infinite planes. It rolls every number at once." },
        { name: "The Crystal-Skull Turtle", xp: 525000, gold: 262500, desc: "A turtle with a skull of pure quartz. It holds ancient psychic power." },
        { name: "Zero Point Energy Ray", xp: 530000, gold: 265000, desc: "Buzzing with potential power. Don't shake it. It could power a city." },
        { name: "The Refractor Ray", xp: 535000, gold: 267500, desc: "It focuses the energy of the dimension into a beam." },
        { name: "Architect of Shapes Shark", xp: 540000, gold: 270000, desc: "It builds the geometric coral reefs. It designs the world." },
        { name: "The Spectrum Serpent", xp: 550000, gold: 275000, desc: "A snake made of pure color. It is the rainbow bridge." }
      ],
      Legendary: [
        { name: "The Philosopher's Stone Fish", xp: 1150000, gold: 575000, desc: "It turns lead hooks into gold. It grants eternal life." },
        { name: "Platonic Solid Puffer", xp: 1200000, gold: 600000, desc: "The perfect form of a fish. It represents elemental earth, air, fire, and water." },
        { name: "The Diamond-Planet Sphere", xp: 1225000, gold: 612500, desc: "A fish the size of a planet, made of diamond. The core of a dead star." },
        { name: "Divider Swordfish", xp: 1250000, gold: 625000, desc: "A fish that splits reality into two separate timelines. A dangerous blade." },
        { name: "The Star-Heart Gem-Fish", xp: 1275000, gold: 637500, desc: "A living gem that beats like a heart. It powers the dimension." },
        { name: "Crystal Core Whale", xp: 1300000, gold: 650000, desc: "The heart of the dimension. It pulses with white light." },
        { name: "The Infinity-Facet Jewel-Fish", xp: 1350000, gold: 675000, desc: "A jewel with infinite sides. Looking at it reveals the infinite." },
        { name: "The Light-Bringer (Lucifer Fish)", xp: 1400000, gold: 700000, desc: "Lucifer in fish form. The morning star. Beautiful and dangerous." }
      ],
      Mythic: [
        { name: "Prime Geometry Shark", xp: 3500000, gold: 1750000, desc: "The concept of Shape itself. It defines what is possible in space." },
        { name: "The Tesseract Construct", xp: 3750000, gold: 1875000, desc: "A 4D cube containing infinite space. It is a prison for gods." },
        { name: "Shattered God Whale", xp: 4000000, gold: 2000000, desc: "A deity broken into a billion pieces, trying to reform. It sings in chords." },
        { name: "The Fifth-Element Spirit-Fish", xp: 4250000, gold: 2125000, desc: "The element that binds the others. It is love? Or maybe just plasma." },
        { name: "The Singularity-Crystal Void", xp: 4500000, gold: 2250000, desc: "A crystal so dense it creates a black hole." },
        { name: "The Omni-Shape Shifter", xp: 4750000, gold: 2375000, desc: "It is every shape at once. It constantly shifts." },
        { name: "The Final-Reflection Mirror", xp: 5000000, gold: 2500000, desc: "A mirror that shows the end of the universe." }
      ],
      Exotic: [
        { name: "Time-Crystal Turtle", xp: 12000000, gold: 6000000, desc: "A turtle whose shell is made of crystallized time. It moves between seconds." },
        { name: "Kaleidoscope Leviathan", xp: 13000000, gold: 6500000, desc: "A massive creature that refracts the entire dimension. Looking at it changes your DNA." }
      ],
      Arcane: [
        { name: "The Grand Prism (Entity)", xp: 60000000, gold: 30000000, desc: "The source of all light and structure in the multiverse. To catch it is to hold a star." }
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
        { name: "Candle-Wick Carp", xp: 18100, gold: 9050, desc: "It has a flame on its head. It guides others." },
        { name: "Ghost Guppy", xp: 18200, gold: 9100, desc: "Transparent and sad. It cries silently. It misses the living world." },
        { name: "Incense-Smoke Salmon", xp: 18300, gold: 9150, desc: "Made of fragrant smoke. It smells like a temple." },
        { name: "Memory Eater Catfish", xp: 18400, gold: 9200, desc: "Nibbles on your forgotten childhood memories. It grows fat on nostalgia." },
        { name: "Ash-Flake Tetra", xp: 18500, gold: 9250, desc: "Like burning paper floating in the air. Fragile." },
        { name: "Regret Ray", xp: 18600, gold: 9300, desc: "Heavy with the weight of things left undone. It drags along the bottom." },
        { name: "Gravestone Guppy", xp: 18700, gold: 9350, desc: "Grey and heavy. It has a name carved on its side." },
        { name: "Phantom Flounder", xp: 18800, gold: 9400, desc: "Lies flat on the bottom of the afterlife. It is the shadow of a fish." },
        { name: "Mourning-Veil Minnow", xp: 18900, gold: 9450, desc: "Dressed in black lace. It is always at a funeral." },
        { name: "Tear-Drop Dace", xp: 19000, gold: 9500, desc: "Shaped like a tear. It tastes salty." },
        { name: "Pale-Light Platy", xp: 19100, gold: 9550, desc: "A sickly, pale light. It flickers." },
        { name: "Whispering-Worm", xp: 19200, gold: 9600, desc: "It whispers secrets of the dead. Don't listen." },
        { name: "Cold-Draft Catfish", xp: 19300, gold: 9650, desc: "Sudden cold spot in the water. It raises goosebumps." },
        { name: "Ecto-Mist Eel", xp: 19400, gold: 9700, desc: "Hard to grab. Your hand passes right through." }
      ],
      Uncommon: [
        { name: "Poltergeist Pike", xp: 40000, gold: 20000, desc: "Aggressive and noisy. It throws pebbles at the boat. It wants attention." },
        { name: "Spirit-Orb Ray", xp: 40500, gold: 20250, desc: "A round ball of light with a tail. Captured on camera." },
        { name: "Banshee Bass", xp: 41000, gold: 20500, desc: "Screams when pulled from the water. It foretells bad luck." },
        { name: "Phantom-Limb Pike", xp: 41500, gold: 20750, desc: "You can feel it, but you can't see it. It hurts." },
        { name: "Wraith Eel", xp: 42000, gold: 21000, desc: "A long ribbon of shadow and malice. It chills the air around it." },
        { name: "Poltergeist-Prawn", xp: 42500, gold: 21250, desc: "It knocks things over on your boat. Mischievous." },
        { name: "Spirit Guide Salmon", xp: 43000, gold: 21500, desc: "Swims upstream towards reincarnation. It glows with hope." },
        { name: "Haunted-Hull Hermit", xp: 43500, gold: 21750, desc: "Lives in the wreck of a sunken ghost ship." },
        { name: "Grave Digger Crab", xp: 44000, gold: 22000, desc: "Buries itself in the ash of the riverbed. It tends the graves of the deep." },
        { name: "Grave-Moss Grouper", xp: 44500, gold: 22250, desc: "Covered in graveyard moss. It smells of earth." },
        { name: "Funeral-March Flounder", xp: 45000, gold: 22500, desc: "Swims in a slow, somber rhythm. Dum dum da dum." },
        { name: "Séance-Shark (Small)", xp: 45500, gold: 22750, desc: "Summoned by holding hands. It speaks through a board." },
        { name: "Medium-Minnow", xp: 46000, gold: 23000, desc: "It channels the spirits of larger fish." }
      ],
      Fine: [
        { name: "Soul Lantern Angler", xp: 90000, gold: 45000, desc: "Carries a light to guide lost fish home. A benevolent spirit." },
        { name: "Soul-Keeper Sturgeon", xp: 91000, gold: 45500, desc: "It keeps souls safe in its stomach until they are ready." },
        { name: "Ectoplasm Jellyfish", xp: 92000, gold: 46000, desc: "Sticky residue of the spirit world. It glows green. Hard to wash off." },
        { name: "Ghost-Ship Grouper", xp: 93000, gold: 46500, desc: "A massive fish that looks like a spectral galleon." },
        { name: "Possessed Armor Gar", xp: 94000, gold: 47000, desc: "A helmet that swims. There is no fish inside, only will." },
        { name: "Spectral-Swordfish", xp: 95000, gold: 47500, desc: "Its sword can cut ghosts. Used by spirit warriors." },
        { name: "Shadow Person Carp", xp: 96000, gold: 48000, desc: "A silhouette that mimics human shape. It stands in the corner of your eye." },
        { name: "Afterlife-Angler", xp: 97000, gold: 48500, desc: "It lures you towards the light. Don't go." },
        { name: "Vengeful Spirit Betta", xp: 98000, gold: 49000, desc: "Red and angry. It holds a grudge from a past life." },
        { name: "Purgatory-Pike", xp: 99000, gold: 49500, desc: "It waits. And waits. And waits." },
        { name: "Limbo-Loach", xp: 100000, gold: 50000, desc: "How low can it go? It lives in the in-between." },
        { name: "Resurrection-Ray", xp: 101000, gold: 50500, desc: "It can bring small fish back to life. A miracle." }
      ],
      Rare: [
        { name: "Ferryman Tip Coin-Fish", xp: 220000, gold: 110000, desc: "A coin-shaped fish. Payment for the crossing. Do not spend it." },
        { name: "Charon's-Oarfish", xp: 222000, gold: 111000, desc: "Long and flat like an oar. It rows the ferry." },
        { name: "Limbo Leviathan Eel", xp: 225000, gold: 112500, desc: "Stuck between worlds. It cannot die, it cannot live." },
        { name: "The Crossing-Carp", xp: 228000, gold: 114000, desc: "It helps souls cross over to the other side." },
        { name: "Ancestral Guardian Turtle", xp: 230000, gold: 115000, desc: "Protects the lineage of the angler. It recognizes your blood." },
        { name: "Styx-Water Sturgeon", xp: 232000, gold: 116000, desc: "Invulnerable skin, except for one spot." },
        { name: "Past Life Echo Carp", xp: 235000, gold: 117500, desc: "Looks like who you were in a previous game save. A strange familiarity." },
        { name: "Lethe-River Loach", xp: 238000, gold: 119000, desc: "One bite and you forget everything. Oblivion." },
        { name: "Grim Reaper Scythe Fish", xp: 240000, gold: 120000, desc: "A curved, silver fish that cuts the thread of life. It is the end." },
        { name: "Memory-Wipe Minnow", xp: 242000, gold: 121000, desc: "Swims in schools that erase history." },
        { name: "Ancestor-Spirit Arowana", xp: 245000, gold: 122500, desc: "A dragon fish carrying the wisdom of the elders." },
        { name: "Void-Gaze Gar", xp: 248000, gold: 124000, desc: "It stares into nothingness. It sees what isn't there." }
      ],
      Epic: [
        { name: "Cerberus Catfish", xp: 550000, gold: 275000, desc: "Three heads, guards the gates of the deep. It sees past, present, and future." },
        { name: "The Grim-Reaper Shark", xp: 555000, gold: 277500, desc: "A shark in a black cloak. It collects the souls of whales." },
        { name: "River Styx Serpent", xp: 560000, gold: 280000, desc: "Its venom makes you forget your name. It washes away memories." },
        { name: "The Soul-Collector Whale", xp: 565000, gold: 282500, desc: "A whale made of mist, filled with trapping lanterns." },
        { name: "Judge of Souls Ray", xp: 570000, gold: 285000, desc: "Weighs your heart against a feather. It decides your fate." },
        { name: "The Gatekeeper Cerberus-Fish", xp: 575000, gold: 287500, desc: "The guardian of the exit. None shall pass." },
        { name: "Eternal Flame Betta", xp: 580000, gold: 290000, desc: "A blue fire that burns underwater. It represents the soul that never dies." },
        { name: "The Mourner Siren", xp: 590000, gold: 295000, desc: "Her song breaks the heart. She cries for the lost." },
        { name: "Thanatos Ray", xp: 600000, gold: 300000, desc: "The peaceful aspect of death. Soft, silent, and welcoming." },
        { name: "The Eternal-Rest Turtle", xp: 610000, gold: 305000, desc: "It sleeps forever. It is the tombstone of the ocean." }
      ],
      Legendary: [
        { name: "Hades Helm Discus", xp: 1300000, gold: 650000, desc: "A fish of pure invisibility. It rules the underworld." },
        { name: "The Underworld-King Hades-Fish", xp: 1350000, gold: 675000, desc: "Dark, regal, and wealthy. The lord of the dead." },
        { name: "Phoenix Carp", xp: 1400000, gold: 700000, desc: "Cycles between ash and fire. The cycle of rebirth." },
        { name: "The Life-Thread Spinner", xp: 1450000, gold: 725000, desc: "It spins the destiny of every living thing. Don't cut the line." },
        { name: "Death Incarnate Shark", xp: 1500000, gold: 750000, desc: "Not evil, just inevitable. It comes for everyone eventually." },
        { name: "The Judgment Scale", xp: 1550000, gold: 775000, desc: "A fish that balances your good and bad deeds." },
        { name: "The Final-Destination Portal-Fish", xp: 1600000, gold: 800000, desc: "The end of the line. There is no return." },
        { name: "The Ghost-Leviathan", xp: 1650000, gold: 825000, desc: "A massive, translucent beast. It haunts the abyss." }
      ],
      Mythic: [
        { name: "The Death Skeleton-Fish", xp: 3800000, gold: 1900000, desc: "The concept of ending. It is a skeleton fish." },
        { name: "Life Stream Serpent", xp: 4000000, gold: 2000000, desc: "The collective energy of every living thing. It flows through all of us." },
        { name: "The Beyond Void-Whale", xp: 4200000, gold: 2100000, desc: "What comes after? A fish made of pure mystery." },
        { name: "Entropy Shark", xp: 4500000, gold: 2250000, desc: "The end of the universe, waiting patiently. It eats time itself." },
        { name: "The Reincarnation Cycle-Fish", xp: 4700000, gold: 2350000, desc: "A circle of life and death. It never ends." },
        { name: "The Soul-Source Light", xp: 4800000, gold: 2400000, desc: "The light at the end of the tunnel. It is warm." },
        { name: "The End-of-Days Beast", xp: 5000000, gold: 2500000, desc: "The apocalypse in fish form. It brings the end." }
      ],
      Exotic: [
        { name: "Soul-Eater Kraken", xp: 14000000, gold: 7000000, desc: "A beast that consumes the very essence of beings, removing them from the cycle of rebirth." },
        { name: "Charon's Lantern Angler", xp: 15000000, gold: 7500000, desc: "The true guide of the dead. Its light cuts through the darkness of the void." }
      ],
      Arcane: [
        { name: "The Reaper's Shadow (Leviathan)", xp: 70000000, gold: 35000000, desc: "The shadow cast by Death itself. It is cold, silent, and final." }
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
        { name: "Static-Noise Salmon", xp: 20100, gold: 10050, desc: "It sounds like a broken TV. It is fuzzy." },
        { name: "Bugged Bass", xp: 20200, gold: 10100, desc: "It swims upside down and clips through rocks. It ignores collision physics." },
        { name: "Pixel-Dust Dace", xp: 20300, gold: 10150, desc: "Trail of broken pixels. It lags behind." },
        { name: "Lag Spike Pike", xp: 20400, gold: 10200, desc: "It freezes in place for seconds at a time. It teleports when it moves." },
        { name: "Low-Res Roach", xp: 20500, gold: 10250, desc: "8-bit graphics. It looks retro." },
        { name: "Binary Bream", xp: 20600, gold: 10300, desc: "Composed entirely of 0s and 1s. It is pure data." },
        { name: "Frame-Drop Fry", xp: 20700, gold: 10350, desc: "It moves at 5 frames per second. Choppy." },
        { name: "Glitch Crab", xp: 20800, gold: 10400, desc: "Its legs are stretched to infinity due to a model error. It looks terrifying but is harmless." },
        { name: "Lag-Switch Loach", xp: 20900, gold: 10450, desc: "It causes connection errors. It cheats." },
        { name: "Bug-Report Betta", xp: 21000, gold: 10500, desc: "It sends a report to the devs every time it is caught." },
        { name: "Syntax-Error Sardine", xp: 21100, gold: 10550, desc: "Unexpected token. It breaks the parser." },
        { name: "Glitch-Art Guppy", xp: 21200, gold: 10600, desc: "Beautifully broken. A happy accident." },
        { name: "Corrupted-File Carp", xp: 21300, gold: 10650, desc: "It cannot be opened. It is garbage data." },
        { name: "Z-Fighting Zebrafish", xp: 21400, gold: 10700, desc: "Its stripes flicker as textures overlap. It hurts to look at." }
      ],
      Uncommon: [
        { name: "MissingNo Blobfish", xp: 45000, gold: 22500, desc: "A scrambled block of data. Do not put in your 6th inventory slot." },
        { name: "Infinite-Loop Eel", xp: 45500, gold: 22750, desc: "It bites its own tail and crashes the script. Recursion error." },
        { name: "Texture File Trout", xp: 46000, gold: 23000, desc: "Wrapped in a generic 'Sample Text' skin. It hasn't loaded properly." },
        { name: "Stack-Overflow Shark (Small)", xp: 46500, gold: 23250, desc: "Too much data. It overflows the buffer." },
        { name: "Corrupted Save Eel", xp: 47000, gold: 23500, desc: "Touch it and you might lose your progress. It eats save files." },
        { name: "Null-Pointer Pike", xp: 47500, gold: 23750, desc: "Points to nothing. Access violation." },
        { name: "Wireframe Whale", xp: 48000, gold: 24000, desc: "You can see the polygon mesh that builds it. It has no skin." },
        { name: "Blue-Screen Bass", xp: 48500, gold: 24250, desc: "Fatal error. It stops the heart." },
        { name: "Hitbox Horror Carp", xp: 49000, gold: 24500, desc: "You can't hit it because its hitbox is smaller than its body. Very annoying to catch." },
        { name: "Rubber-Band Ray", xp: 49200, gold: 24600, desc: "It snaps back to where it was a second ago. Lag." },
        { name: "Texture-Pop Trout", xp: 49400, gold: 24700, desc: "It suddenly appears in high detail when you get close." },
        { name: "Clipping-Catfish", xp: 49600, gold: 24800, desc: "It swims through the floor. It ignores boundaries." },
        { name: "Bad-Sector Bream", xp: 49800, gold: 24900, desc: "Unreadable. It is damaged." }
      ],
      Fine: [
        { name: "BSOD Ray", xp: 100000, gold: 50000, desc: "Fatal Error. Blue Screen of Death given form. It crashes the water." },
        { name: "Developer-Console Cod", xp: 101000, gold: 50500, desc: "Access the backend. Type 'help' for commands." },
        { name: "Error 404 Fish", xp: 102000, gold: 51000, desc: "Fish Not Found. It is a hole in the code." },
        { name: "Cheat-Code Carp", xp: 103000, gold: 51500, desc: "Up Up Down Down Left Right Left Right B A Start." },
        { name: "Infinite Money Goldfish", xp: 104000, gold: 52000, desc: "A golden fish that duplicates itself. It ruins economies." },
        { name: "God-Mode Gar", xp: 105000, gold: 52500, desc: "Invincible. You cannot kill it." },
        { name: "Wall Hack Shark", xp: 106000, gold: 53000, desc: "It swims through solid islands. It sees everything." },
        { name: "Noclip-Nautilus", xp: 107000, gold: 53500, desc: "It floats through walls. Physics do not apply." },
        { name: "Dev Tool Turtle", xp: 108000, gold: 54000, desc: "Used by the creators to test swimming physics. It is perfectly spherical." },
        { name: "Wireframe-Walleye", xp: 109000, gold: 54500, desc: "Just lines. No substance." },
        { name: "Alpha-Build Angler", xp: 110000, gold: 55000, desc: "Rough and unfinished. Features are missing." },
        { name: "Beta-Tester Bass", xp: 112000, gold: 56000, desc: "It finds bugs. It breaks the game." }
      ],
      Rare: [
        { name: "Spaghetti Code Serpent", xp: 250000, gold: 125000, desc: "A mess of tangled logic that barely functions. It knots itself constantly." },
        { name: "Exploit-Eel", xp: 252000, gold: 126000, desc: "It uses a glitch to gain an advantage. Unfair." },
        { name: "Memory Leak Leech", xp: 255000, gold: 127500, desc: "Consumes system RAM until the world crashes. It gets bigger the longer you play." },
        { name: "Zero-Day Zombie-Fish", xp: 258000, gold: 129000, desc: "A vulnerability that has no fix. Dangerous." },
        { name: "Placeholder Asset Box Grouper", xp: 260000, gold: 130000, desc: "A glowing red cube with the word 'FISH' written on it. It forgot to be a fish." },
        { name: "Spaghetti-Code Squid", xp: 262000, gold: 131000, desc: "Tentacles everywhere, connected to nothing. A mess." },
        { name: "Beta Test Beast", xp: 265000, gold: 132500, desc: "An overpowered fish from an earlier version of the world. It was never nerfed." },
        { name: "Dead-Pixel Puffer", xp: 268000, gold: 134000, desc: "A black spot on the screen. It won't go away." },
        { name: "Admin Privilege Angler", xp: 270000, gold: 135000, desc: "Gives the user a sense of unlimited power. It glows with authority." },
        { name: "Memory-Dump Dory", xp: 272000, gold: 136000, desc: "It crashes and leaves a log file. Read it to find out why." },
        { name: "Root-Access Ray", xp: 275000, gold: 137500, desc: "Superuser permission. It can do anything." },
        { name: "Admin-Key Koi", xp: 278000, gold: 139000, desc: "The key to the server. Don't lose it." }
      ],
      Epic: [
        { name: "Algorithm Eel", xp: 600000, gold: 300000, desc: "It decides if you get a rare drop or trash. It controls your luck." },
        { name: "The Glitch-Gremlin", xp: 605000, gold: 302500, desc: "A creature that actively breaks the game. It laughs at you." },
        { name: "RNG God Ray", xp: 610000, gold: 305000, desc: "Pray to it. It usually ignores you. It is fickle and cruel." },
        { name: "The Crash Whale", xp: 615000, gold: 307500, desc: "When it breaches, the game closes. Hard crash." },
        { name: "Source Code Leviathan", xp: 620000, gold: 310000, desc: "The root directory of the ocean. It holds the scripts that run the water." },
        { name: "The Reboot Phoenix", xp: 625000, gold: 312500, desc: "Turn it off and on again. It fixes everything." },
        { name: "Firewall Pike", xp: 630000, gold: 315000, desc: "Blocks unauthorized fishing attempts. It burns intruders." },
        { name: "The Virus Snake", xp: 640000, gold: 320000, desc: "It replicates and destroys. It infects other fish." },
        { name: "Delete Key Flounder", xp: 650000, gold: 325000, desc: "A fish shaped like a keyboard button. It erases matter from existence." },
        { name: "The Firewall Dragon", xp: 660000, gold: 330000, desc: "An impenetrable barrier of code. Only authorized users may pass." }
      ],
      Legendary: [
        { name: "Hello World Guppy", xp: 1500000, gold: 750000, desc: "The first fish ever coded. Simple, perfect, and iconic." },
        { name: "The Source-Code Scroll-Fish", xp: 1550000, gold: 775000, desc: "The raw text that makes up reality. Reading it reveals the matrix." },
        { name: "Game Over Voidfish", xp: 1600000, gold: 800000, desc: "A black screen in the shape of a fish. It signals the end of a run." },
        { name: "The Developer Hand", xp: 1650000, gold: 825000, desc: "A giant hand that places objects. It builds the world." },
        { name: "Developer Avatar", xp: 1700000, gold: 850000, desc: "The avatar of the one who built this reality. It watches its creation." },
        { name: "The Game-Engine Machine", xp: 1750000, gold: 875000, desc: "The machine that runs the physics. It hums with power." },
        { name: "The Master-Server Computer", xp: 1800000, gold: 900000, desc: "Where all data is stored. The heart of the glitch." },
        { name: "The Final-Patch Update-Fish", xp: 1850000, gold: 925000, desc: "The update that fixes the world. Or destroys it." }
      ],
      Mythic: [
        { name: "System Shutdown Whale", xp: 5000000, gold: 2500000, desc: "The end of the session. Lights out. It sleeps in the dark." },
        { name: "The Deleted-Asset Void", xp: 5200000, gold: 2600000, desc: "It was removed from the game, but it refuses to leave." },
        { name: "Uninstall Wizard Squid", xp: 5500000, gold: 2750000, desc: "A terrifying entity that removes existence file by file. It cleans the drive." },
        { name: "The Unused-Content Monster", xp: 5700000, gold: 2850000, desc: "A half-finished boss that was cut for time. It is angry." },
        { name: "The White-Space Void", xp: 6000000, gold: 3000000, desc: "The emptiness outside the map. Pure void." },
        { name: "The Fatal-Exception Error", xp: 6200000, gold: 3100000, desc: "An error that cannot be handled. Immediate crash." },
        { name: "The Blue-Screen-of-Death Leviathan", xp: 6500000, gold: 3250000, desc: "The face of the glitch god. It smiles in hex code." }
      ],
      Exotic: [
        { name: "Infinite Recursion Eel", xp: 18000000, gold: 9000000, desc: "An eel that contains an infinite number of smaller eels inside itself. A fractal nightmare." },
        { name: "Stack-Trace Shark", xp: 19000000, gold: 9500000, desc: "It tracks every error you've ever made. It hunts by finding flaws in your logic." }
      ],
      Arcane: [
        { name: "The Root Admin (God)", xp: 90000000, gold: 45000000, desc: "The user with supreme privileges. It can banish anything from existence with a single command." }
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
        { name: "White-Out Whale (Tiny)", xp: 22100, gold: 11050, desc: "Used to fix mistakes. It covers things in white." },
        { name: "Silence Minnow", xp: 22500, gold: 11250, desc: "It absorbs sound. When you catch it, the world goes quiet." },
        { name: "Blank-Page Betta", xp: 22600, gold: 11300, desc: "Waiting to be written on. Pure white." },
        { name: "Erasure Eel", xp: 23000, gold: 11500, desc: "Rubs against reality to remove it. It acts like an eraser." },
        { name: "Invisible-Ink Ide", xp: 23100, gold: 11550, desc: "You can only see it under special light. It holds secrets." },
        { name: "Null Point Guppy", xp: 23500, gold: 11750, desc: "A fish with zero dimensions. It is a mathematical point." },
        { name: "Empty-Set Eel", xp: 23600, gold: 11800, desc: "Contains nothing. {}." },
        { name: "Vacuum Viper Fish", xp: 24000, gold: 12000, desc: "Nature abhors it. It sucks in air and light." },
        { name: "Zero-Sum Salmon", xp: 24100, gold: 12050, desc: "For every one you catch, you lose one. Balanced." },
        { name: "Null-Value Newt", xp: 24200, gold: 12100, desc: "It is worth nothing. Literally NULL." },
        { name: "Vacuum-Void Varas", xp: 24300, gold: 12150, desc: "It lives in a vacuum. It doesn't need air." },
        { name: "Nothing-Nautilus", xp: 24400, gold: 12200, desc: "A shell filled with nothing. Empty." },
        { name: "Eraser-Dust Dace", xp: 24500, gold: 12250, desc: "The leftovers of erasure. Small grey crumbs." },
        { name: "Silence-Sound Sardine", xp: 24600, gold: 12300, desc: "It swims silently. It makes no ripples." }
      ],
      Uncommon: [
        { name: "White Noise Ray", xp: 50000, gold: 25000, desc: "Emits a constant static hiss. It soothes and disturbs simultaneously." },
        { name: "Fade-Away Flounder", xp: 50500, gold: 25250, desc: "It is slowly disappearing. Catch it quick." },
        { name: "Static Shark", xp: 51000, gold: 25500, desc: "Like the static on an old TV. It hurts to look at." },
        { name: "Dissolve-Dory", xp: 51500, gold: 25750, desc: "It dissolves into the white background. Camouflage." },
        { name: "Non Existent Newt", xp: 52000, gold: 26000, desc: "I think I caught one? I'm not sure. It might be a hallucination." },
        { name: "Ghost-Image Goby", xp: 52500, gold: 26250, desc: "A faint afterimage of a fish. Burn-in." },
        { name: "Ghost Data Cod", xp: 53000, gold: 26500, desc: "Information that has been deleted but lingers. A memory of a fish." },
        { name: "Transparency-Trout", xp: 53500, gold: 26750, desc: "See-through. You can see its bones." },
        { name: "Unknown Angler", xp: 54000, gold: 27000, desc: "We don't know what this fish is. Classification impossible." },
        { name: "Opacity-Zero Orca (Small)", xp: 54500, gold: 27250, desc: "It is there, but has 0% opacity. Invisible predator." },
        { name: "Hidden-Layer Halibut", xp: 55000, gold: 27500, desc: "It hides behind the background. Layer issue." },
        { name: "Masking-Tape Minnow", xp: 55500, gold: 27750, desc: "Covered in beige tape. It covers things up." },
        { name: "Bleach-Bone Bass", xp: 56000, gold: 28000, desc: "White as bone. Cleaned by the void." }
      ],
      Fine: [
        { name: "Concept Carp", xp: 110000, gold: 55000, desc: "It's not a fish, just the idea of one. It exists in the abstract." },
        { name: "Concept-Art Carp", xp: 111000, gold: 55500, desc: "A rough sketch of a fish. Not final." },
        { name: "Abstract Art Tetra", xp: 112000, gold: 56000, desc: "Shapes and colors that don't make sense. It changes depending on who looks at it." },
        { name: "Sketch-Line Salmon", xp: 113000, gold: 56500, desc: "Drawn with a pencil. Graphite scales." },
        { name: "Minimalist Mackerel", xp: 115000, gold: 57500, desc: "Just a single line sketch. It is as simple as a fish can be." },
        { name: "Wire-Frame Walleye", xp: 116000, gold: 58000, desc: "The basic structure. No textures." },
        { name: "Negative Space Ray", xp: 117000, gold: 58500, desc: "A hole in the universe shaped like a fish. It is the absence of matter." },
        { name: "Negative-Zone Newt", xp: 118000, gold: 59000, desc: "Colors are inverted. Black is white." },
        { name: "Forgotten Memory Bass", xp: 120000, gold: 60000, desc: "You feel sad when you hold it, but you don't know why. It is lost nostalgia." },
        { name: "Anti-Matter Angler", xp: 122000, gold: 61000, desc: "Explodes on contact with matter. Handle with magnetic fields." },
        { name: "Dark-Energy Dace", xp: 124000, gold: 62000, desc: "Pushing the void apart. Expanding." },
        { name: "Vacuum-Decay Varas", xp: 126000, gold: 63000, desc: "A bubble of lower energy state. It destroys physics." }
      ],
      Rare: [
        { name: "Nihilist Nemo Clownfish", xp: 280000, gold: 140000, desc: "It believes in nothing. It swims without purpose." },
        { name: "Existential-Dread Eel", xp: 282000, gold: 141000, desc: "Holding it makes you question your life choices. Anxiety." },
        { name: "Total Eclipse Sunfish", xp: 285000, gold: 142500, desc: "Blocks out all thought. It brings a moment of pure mental silence." },
        { name: "Nihilism-Newt", xp: 288000, gold: 144000, desc: "Nothing matters. Just swim." },
        { name: "Absolute Zero Puffer", xp: 290000, gold: 145000, desc: "The absence of all heat and movement. It stops atoms from vibrating." },
        { name: "Absurdism-Angler", xp: 292000, gold: 146000, desc: "Life is a joke. It laughs at the void." },
        { name: "Void Stare Goby", xp: 295000, gold: 147500, desc: "If you gaze into the abyss, this fish gazes back. Do not blink." },
        { name: "Solipsism-Salmon", xp: 298000, gold: 149000, desc: "Only it exists. You are a figment of its imagination." },
        { name: "Oblivion Orb Puffer", xp: 300000, gold: 150000, desc: "A sphere of pure destruction. It unmaking things is its nature." },
        { name: "Paradox-Puffer", xp: 305000, gold: 152500, desc: "It exists and doesn't exist. It puffs up with logic." },
        { name: "Quantum-Flux Flounder", xp: 310000, gold: 155000, desc: "Constantly changing state. Uncertainty." },
        { name: "Uncertainty-Urchin", xp: 315000, gold: 157500, desc: "You can't know where it is. Spiky." }
      ],
      Epic: [
        { name: "Entropy Eater Catfish", xp: 700000, gold: 350000, desc: "Feeds on the decay of the universe. It cleans up the end of time." },
        { name: "The Void-Mouth Shark", xp: 710000, gold: 355000, desc: "A mouth that leads to nowhere. Infinite hunger." },
        { name: "Unmaker Eel", xp: 720000, gold: 360000, desc: "Unravels the threads of reality. It undoes what has been done." },
        { name: "The Empty-Shell Turtle", xp: 730000, gold: 365000, desc: "A turtle with no inside. Just a hollow form." },
        { name: "Cosmic Eraser Ray", xp: 740000, gold: 370000, desc: "Rubs out stars from the sky. It leaves darkness in its wake." },
        { name: "The Blank-Stare Ray", xp: 745000, gold: 372500, desc: "Eyes that see nothing. It blinds you." },
        { name: "Final Breath Betta", xp: 750000, gold: 375000, desc: "The last gasp of a dying world. It holds the final moment of life." },
        { name: "The White-Noise Whale", xp: 755000, gold: 377500, desc: "A sound that drowns out everything else. Static." },
        { name: "The End Lobster", xp: 760000, gold: 380000, desc: "Literally the words 'THE END' crawling. It marks the conclusion." },
        { name: "The Non-Entity Ghost", xp: 770000, gold: 385000, desc: "It isn't a ghost. It isn't anything. It just is not." }
      ],
      Legendary: [
        { name: "The Great-Eraser", xp: 2000000, gold: 1000000, desc: "It wipes the slate clean. It removes mistakes." },
        { name: "Tabula Rasa Carp", xp: 2050000, gold: 1025000, desc: "A clean slate. A new beginning. It washes away all mistakes." },
        { name: "Pre Creation Coelacanth", xp: 2100000, gold: 1050000, desc: "What existed before the Big Bang. It is older than time." },
        { name: "The Universal-Reset Button-Fish", xp: 2150000, gold: 1075000, desc: "A button fish. Press it to restart the universe." },
        { name: "Great Nothing Whale", xp: 2200000, gold: 1100000, desc: "Infinite, empty, and peaceful. It is the silence after the storm." },
        { name: "The Final-Silence Eel", xp: 2250000, gold: 1125000, desc: "After the last sound dies. Perfect quiet." },
        { name: "The Absolute-Zero Puffer", xp: 2300000, gold: 1150000, desc: "The coldest thing in existence. It freezes time." },
        { name: "The Meaning-of-Nothing", xp: 2400000, gold: 1200000, desc: "The philosophical answer to the void. It is deep." }
      ],
      Mythic: [
        { name: "Non Existent Eel", xp: 6000000, gold: 3000000, desc: "You didn't catch this. It doesn't exist. It is a figment of your imagination." },
        { name: "The Void-God Leviathan", xp: 6500000, gold: 3250000, desc: "The consciousness of the empty space. It watches." },
        { name: "Vacuum Shark", xp: 7000000, gold: 3500000, desc: "The most stable state of energy. It collapses universes into nothing." },
        { name: "The Anti-Creation Serpent", xp: 7500000, gold: 3750000, desc: "The force that unmakes. The opposite of the Big Bang." },
        { name: "The End-of-Time", xp: 8000000, gold: 4000000, desc: "The last second. It lasts forever." },
        { name: "The Great-Unknown Beast", xp: 8500000, gold: 4250000, desc: "What we don't know. It is vast and scary." },
        { name: "The Final-Void", xp: 9000000, gold: 4500000, desc: "The end of everything. There is nothing after this." }
      ],
      Exotic: [
        { name: "Entropy Eater Shark", xp: 20000000, gold: 10000000, desc: "It swims through the heat death of the universe, devouring the last scraps of energy." },
        { name: "Vacuum Decay Ray", xp: 21000000, gold: 10500000, desc: "A bubble of true vacuum that expands at light speed, rewriting the laws of physics." }
      ],
      Arcane: [
        { name: "The Great Eraser (Entity)", xp: 100000000, gold: 50000000, desc: "The final purpose of the void. It exists to wipe the slate clean for the next universe." }
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
        { name: "Proto-Pike", xp: 25500, gold: 12750, desc: "The first predator. It taught others how to hunt." },
        { name: "Creation Carp", xp: 26000, gold: 13000, desc: "It spawns entire universes from its mouth as bubbles. It swims with the weight of existence." },
        { name: "First-Light Loach", xp: 26500, gold: 13250, desc: "Born from the first photon. It glows." },
        { name: "Genesis Guppy", xp: 27000, gold: 13500, desc: "In the beginning, there was this guppy. It started the food chain." },
        { name: "Morning-Star Minnow", xp: 27500, gold: 13750, desc: "Herald of the new day. Bright and hopeful." },
        { name: "Eden Eel", xp: 28000, gold: 14000, desc: "Innocent and uncorrupted. It has never known fear or pain." },
        { name: "Dawn-Dace", xp: 28500, gold: 14250, desc: "The color of sunrise. Soft pink and orange." },
        { name: "Primordial Perch", xp: 29000, gold: 14500, desc: "The first fish to ever swim. It set the standard for all others." },
        { name: "Beginning-Betta", xp: 29500, gold: 14750, desc: "It starts things. An initiator." },
        { name: "Original-Oarfish (Tiny)", xp: 30000, gold: 15000, desc: "The first sea serpent. Small for now." },
        { name: "Blueprint-Bass", xp: 30500, gold: 15250, desc: "A technical drawing of a fish. Plans." },
        { name: "Source-Stream Salmon", xp: 31000, gold: 15500, desc: "Swims to the very source of the river of time." },
        { name: "Prime-Platy", xp: 31500, gold: 15750, desc: "The prime number of fish. Indivisible." },
        { name: "Root-Roach", xp: 32000, gold: 16000, desc: "The root of the phylogenetic tree. The ancestor." }
      ],
      Uncommon: [
        { name: "Spark of Life Tetra", xp: 60000, gold: 30000, desc: "A tiny flicker that can start a galaxy. It is warm and bright." },
        { name: "Life-Spark Lamprey", xp: 61000, gold: 30500, desc: "It latches on and gives life instead of taking it." },
        { name: "DNA Helix Eel", xp: 62500, gold: 31250, desc: "The building block of all biology. It twists and turns in a double helix." },
        { name: "Creation-Clay Carp", xp: 63500, gold: 31750, desc: "Molded by hand. You can see the fingerprints." },
        { name: "Evolution Eater Bass", xp: 65000, gold: 32500, desc: "It evolves into a new species every few seconds. It adapts instantly to any bait." },
        { name: "Molder-Minnow", xp: 66000, gold: 33000, desc: "It shapes the mud into life. A sculptor." },
        { name: "Time Stream Trout", xp: 67500, gold: 33750, desc: "Swims through the timeline of the game. It has seen your entire journey." },
        { name: "Shaper-Shark (Small)", xp: 68500, gold: 34250, desc: "It carves the canyons and mountains of the world." },
        { name: "Matter Weaver Ray", xp: 70000, gold: 35000, desc: "Knits atoms together to create mass. It builds the physical world." },
        { name: "Design-Dory", xp: 71000, gold: 35500, desc: "It has a good eye for detail. Intelligent design." },
        { name: "Pattern-Puffer", xp: 72000, gold: 36000, desc: "Covered in the patterns of nature. Fractals." },
        { name: "Template-Trout", xp: 73000, gold: 36500, desc: "Used to make copies. The standard." },
        { name: "Model-Minnow", xp: 74000, gold: 37000, desc: "Perfectly proportioned. A model fish." }
      ],
      Fine: [
        { name: "Cosmic Egg Puffer", xp: 150000, gold: 75000, desc: "A round fish containing a baby universe. Do not pop it." },
        { name: "Stardust Sprite Betta", xp: 155000, gold: 77500, desc: "Made of the same stuff as you. We are all stardust." },
        { name: "Force of Nature Pike", xp: 160000, gold: 80000, desc: "Gravity, Electromagnetism, and Nuclear forces combined. It holds the laws of physics." },
        { name: "Divine Ray", xp: 165000, gold: 82500, desc: "Radiates holy light. It is a messenger from the beyond." },
        { name: "Golden-Age Gar", xp: 170000, gold: 85000, desc: "From a time when everything was perfect. Shining gold." },
        { name: "Eternal Flow Salmon", xp: 175000, gold: 87500, desc: "The water of life itself. Drinking from its stream grants immortality." },
        { name: "Silver-Age Salmon", xp: 180000, gold: 90000, desc: "Slightly less perfect than gold, but still divine." },
        { name: "Bronze-Age Bass", xp: 185000, gold: 92500, desc: "Strong and durable. The age of heroes." },
        { name: "Iron-Age Ide", xp: 190000, gold: 95000, desc: "Hard, cold, and brutal. The age of war." },
        { name: "Heroic-Halibut", xp: 195000, gold: 97500, desc: "A fish that has completed a great quest." },
        { name: "Mythic-Mackerel", xp: 200000, gold: 100000, desc: "A fish from the old stories. It is legend." },
        { name: "Legend-Loach", xp: 205000, gold: 102500, desc: "Stories are told about this loach. Famous." }
      ],
      Rare: [
        { name: "Architect Arowana", xp: 350000, gold: 175000, desc: "It carries a blueprint of the cosmos on its scales. It designed the stars." },
        { name: "Gardener Catfish", xp: 360000, gold: 180000, desc: "Tends to the growth of life. It prunes the timeline to ensure health." },
        { name: "Universal Constant Carp", xp: 370000, gold: 185000, desc: "Pi, Phi, and E wrapped in scales. It represents the math of god." },
        { name: "Tree-of-Life Trout", xp: 375000, gold: 187500, desc: "Its scales are leaves. It connects all worlds." },
        { name: "Infinity Fish", xp: 380000, gold: 190000, desc: "Has no beginning and no end. It swims in a perfect circle." },
        { name: "Fountain-of-Youth Flounder", xp: 385000, gold: 192500, desc: "Eating it makes you young again. Dangerous." },
        { name: "Ambrosia-Angler", xp: 390000, gold: 195000, desc: "Food of the gods. It tastes like honey." },
        { name: "Nectar-Newt", xp: 395000, gold: 197500, desc: "Drink of the gods. Sweet and intoxicating." },
        { name: "Answer 42 Dolphin", xp: 400000, gold: 200000, desc: "The answer to life, the universe, and everything. It thanks you for all the fish." },
        { name: "Mana-Minnow", xp: 405000, gold: 202500, desc: "Pure magical energy. It fuels spells." },
        { name: "Aether-Eel", xp: 410000, gold: 205000, desc: "The fifth element. It fills the space above." },
        { name: "Quintessence-Quoy", xp: 415000, gold: 207500, desc: "The purest form of matter. Perfect." }
      ],
      Epic: [
        { name: "Alpha Betta", xp: 1000000, gold: 500000, desc: "The first letter. The beginning. It starts the story." },
        { name: "The Creator Hand", xp: 1050000, gold: 525000, desc: "A hand that paints the world. It holds a brush." },
        { name: "Omega Orca", xp: 1100000, gold: 550000, desc: "The last letter. The end. It finishes the story." },
        { name: "The Preserver Shield-Fish", xp: 1125000, gold: 562500, desc: "It protects existence from decay. A guardian." },
        { name: "Continuum Crusher Crab", xp: 1150000, gold: 575000, desc: "Maintains the stability of the timeline. It pinches shut holes in reality." },
        { name: "The Destroyer Swordfish", xp: 1175000, gold: 587500, desc: "It cuts down the old to make way for the new." },
        { name: "God Hand Koi", xp: 1200000, gold: 600000, desc: "A fish shaped like a hand reaching down from heaven. It pulls you up." },
        { name: "The Time-Keeper Clock-Fish", xp: 1225000, gold: 612500, desc: "Tick tock. It manages the flow of time." },
        { name: "The Player Mirror-Fish", xp: 1250000, gold: 625000, desc: "It is a mirror. It is you. You are the epic catch." },
        { name: "The Space-Weaver Loom-Fish", xp: 1275000, gold: 637500, desc: "It weaves the fabric of space. Strings." }
      ],
      Legendary: [
        { name: "The First-Cause", xp: 2500000, gold: 1250000, desc: "The uncaused cause. It started everything." },
        { name: "The Last-Effect", xp: 2750000, gold: 1375000, desc: "The final result of all actions. The end." },
        { name: "Big Bang Shark", xp: 3000000, gold: 1500000, desc: "The explosion that started reality. It burns with the heat of creation." },
        { name: "Big Crunch Crab", xp: 3250000, gold: 1625000, desc: "The collapse that ends reality. It pulls everything into a final point." },
        { name: "Eternity Eel", xp: 3500000, gold: 1750000, desc: "Time without end. It stretches forever into the future." },
        { name: "The Eternal-Cycle", xp: 3750000, gold: 1875000, desc: "Round and round. It never stops." },
        { name: "The Infinite-Loop", xp: 4000000, gold: 2000000, desc: "It repeats forever. It repeats forever." },
        { name: "The Grand-Design", xp: 4250000, gold: 2125000, desc: "The plan for the universe. It is complex." }
      ],
      Mythic: [
        { name: "The Alpha Leviathan", xp: 9000000, gold: 4500000, desc: "The Beginning. It is light." },
        { name: "The Omega Leviathan", xp: 9500000, gold: 4750000, desc: "The End. It is dark." },
        { name: "Supreme Deity Whale", xp: 10000000, gold: 5000000, desc: "The One Above All. It watches over the Alpha and Omega. It is peace." },
        { name: "The Everything Globe-Fish", xp: 11000000, gold: 5500000, desc: "All that exists, contained in one fish." },
        { name: "The Nothing Void-Eel", xp: 12000000, gold: 6000000, desc: "The absence of everything. It is empty." },
        { name: "The Balance Scale-Fish", xp: 13000000, gold: 6500000, desc: "Perfect equilibrium. It holds the world steady." },
        { name: "Horizon Keeper Whale", xp: 15000000, gold: 7500000, desc: "A creature that guards the edge of the known universe. It signals that there are always more waters to explore beyond the edge of the map. The journey never truly ends." }
      ],
      Exotic: [
        { name: "Cosmic Genesis Turtle", xp: 25000000, gold: 12500000, desc: "Carries the first spark of creation in its shell. Where it swims, galaxies are born." },
        { name: "Universal End Serpent", xp: 30000000, gold: 15000000, desc: "It waits at the end of time to swallow the last star." }
      ],
      Arcane: [
        { name: "The Eternal Cycle (Ouroboros)", xp: 150000000, gold: 75000000, desc: "The serpent that eats its own tail. It is the beginning and the end, forever intertwined." }
      ]
    }
  }
}
