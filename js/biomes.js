window.BIOMES = {
  1: {
    name: "Tinker River",
    unlockLevel: 1,
    unlockGold: 0,
    boatRequired: null,
    boatPrice: 0,
    description: "A quiet freshwater stretch where new anglers often linger, framed by worn stone banks and half forgotten river tools. The gentle current carries shimmering minnows, drifting leaves, and small relics washed down from settlements upstream. Fish here swim close to the surface and respond calmly to bait, rarely startled by splashes. Locals whisper that unseen river spirits subtly guide schools along predictable paths.",
    fish: {
      Common: [
        { name: "Pebble Minnow", xp: 20, gold: 10, desc: "A small gray minnow whose rounded body resembles loose river stones. It drifts passively with the current and darts only when shadows pass overhead." },
        { name: "Glassfin Minnow", xp: 22, gold: 11, desc: "Its fins are nearly transparent, giving it a faint ghostlike outline. It relies on stillness rather than speed to avoid predators." },
        { name: "Sandsift Goby", xp: 24, gold: 12, desc: "A bottom hugging goby that filters sand through its mouth. Small clouds of silt trail behind it as it crawls along the riverbed." },
        { name: "Reedbank Chub", xp: 26, gold: 13, desc: "A plump fish that hides among reeds and roots. When startled, it bursts forward and kicks up mud to escape." },
        { name: "Tinflash Shiner", xp: 28, gold: 14, desc: "Normally dull in color, it flashes bright silver when turning sharply. The sudden glint confuses predators and anglers alike." },
        { name: "Driftstick Dace", xp: 30, gold: 15, desc: "Its bark colored scales allow it to float motionless like a twig. It resumes swimming only after danger has passed." },
        { name: "Hookjaw Eel", xp: 32, gold: 16, desc: "A thin eel with a curved jaw shaped like a bent hook. It steals bait cleanly before slipping into stone crevices." },
        { name: "Bubblecrest Betta", xp: 34, gold: 17, desc: "This territorial fish builds floating bubble nests near the river edge. It aggressively guards them from insects and other fish." },
        { name: "Mudscale Carp", xp: 36, gold: 18, desc: "A hardy carp coated in mud and algae. It thrives in shallow, slow moving bends where other fish struggle." },
        { name: "Silver Darter", xp: 38, gold: 19, desc: "A fast, reflective fish that darts in sharp bursts near the surface. It feeds mostly at sunrise and early morning." },
        { name: "Speckled Fry", xp: 40, gold: 20, desc: "Juvenile fish covered in dark speckles that blend into gravel beds. They move in tight clusters near the shoreline." },
        { name: "Rilltail Minnow", xp: 42, gold: 21, desc: "A narrow minnow with a constantly flicking tail. It follows tiny surface currents created by drifting leaves." }
      ],
      Uncommon: [
        { name: "Brighttail Perch", xp: 50, gold: 30, desc: "Its tail glows faintly yellow in murky water. The glow intensifies briefly when it accelerates." },
        { name: "Streamrunner Trout", xp: 53, gold: 32, desc: "A sleek trout built for rapid bursts against the current. It rests behind rocks before striking prey." },
        { name: "Mossback Bass", xp: 56, gold: 34, desc: "Algae grows thick along its spine, disguising its outline. It prefers ambush attacks from still water." },
        { name: "Greenfin Shiner", xp: 59, gold: 36, desc: "Emerald tinted fins shimmer briefly under sunlight. It freezes in place when threatened." },
        { name: "Dapple Carp", xp: 62, gold: 38, desc: "A mottled carp known for steady, stubborn resistance. It tires anglers more than lines." },
        { name: "Rockhide Perch", xp: 65, gold: 40, desc: "Rough scales scrape stone as it hugs the river bottom. It rarely leaves rocky cover." },
        { name: "Swiftcurrent Trout", xp: 68, gold: 42, desc: "Strong fins allow it to hold position in fast water. It strikes suddenly then retreats." },
        { name: "Driftback Loach", xp: 71, gold: 44, desc: "A bottom dweller that burrows backward into sand. Only its eyes remain visible." },
        { name: "Copperfin Roach", xp: 74, gold: 46, desc: "Copper tinted fins flash when it turns sharply. It prefers open water near bends." },
        { name: "Lanternscale Minnow", xp: 77, gold: 48, desc: "Its scales glow faintly at dusk. It follows shallow feeding paths near the banks." }
      ],
      Fine: [
        { name: "Honeystripe Barb", xp: 100, gold: 60, desc: "Golden stripes run cleanly along its body. It feeds calmly in open water during daylight." },
        { name: "Tinkerscale Trout", xp: 105, gold: 65, desc: "A lively trout unique to these waters. It leaps repeatedly at dusk before resting." },
        { name: "Ceramicback Catfish", xp: 110, gold: 70, desc: "Its plated skin resembles cracked pottery shards. It scavenges near submerged ruins." },
        { name: "Siltveil Catfish", xp: 115, gold: 75, desc: "Smooth skinned and slow moving, it kicks up silt to hide. It ambushes prey from clouds." },
        { name: "Willowshade Chub", xp: 120, gold: 80, desc: "Sleeps beneath overhanging branches during daylight. It feeds only in shadow." },
        { name: "Longbar Pike", xp: 125, gold: 85, desc: "A narrow bodied pike built for straight line strikes. It attacks with sudden precision." },
        { name: "Gleamfin Minnow", xp: 130, gold: 90, desc: "Its scales sparkle like dew in early light. It stays near the surface." },
        { name: "Lanternfly Fish", xp: 135, gold: 95, desc: "Leaps briefly above water to catch insects. Most active at twilight." }
      ],
      Rare: [
        { name: "Copperback Salmon", xp: 200, gold: 120, desc: "A salmon with a glowing copper sheen along its back. It swims steadily against the current." },
        { name: "Gearjaw Pike", xp: 210, gold: 125, desc: "Its interlocking teeth resemble meshed gears. It bites with mechanical precision." },
        { name: "Phantom Dace", xp: 220, gold: 130, desc: "Nearly invisible unless the water is still. It vanishes instantly when disturbed." },
        { name: "Riverglass Grayling", xp: 230, gold: 135, desc: "Its body refracts light like blown glass. It moves slowly and gracefully." },
        { name: "Lost Coin Salmon", xp: 240, gold: 140, desc: "Round metallic scales clink softly as it swims. It gathers near old crossings." },
        { name: "Mossbeard Sturgeon", xp: 250, gold: 145, desc: "Ancient sturgeon with moss clinging to its snout. It moves with great weight." },
        { name: "Twinfin Razorperch", xp: 260, gold: 150, desc: "Twin dorsal fins slice the water cleanly. It strikes with extreme accuracy." },
        { name: "Dawnscale Carp", xp: 270, gold: 155, desc: "Glows faintly at sunrise before retreating. Rarely seen after morning." }
      ],
      Epic: [
        { name: "Ironclad Catfish", xp: 400, gold: 200, desc: "Its armored skin resists hooks and stone. It patrols deep holes." },
        { name: "Verdant Guardian Gar", xp: 425, gold: 215, desc: "Moss covered and watchful, it blends into vegetation. It rarely attacks without provocation." },
        { name: "Whirlpool Watcher Gar", xp: 450, gold: 230, desc: "Circles powerful eddies continuously. It uses spinning currents to disorient prey." },
        { name: "Thunderstream Pike", xp: 475, gold: 245, desc: "Appears during storms and heavy rain. Its body vibrates faintly." },
        { name: "Goldenwave Trout", xp: 500, gold: 260, desc: "Leaves shimmering ripples as it swims. It favors upstream paths." },
        { name: "Duskgazer Carp", xp: 525, gold: 275, desc: "Its ember like eyes glow at twilight. It feeds only during dusk." },
        { name: "Giant Ripplebass", xp: 550, gold: 290, desc: "Its movement sends wide ripples across the river. It is immensely strong." },
        { name: "Stonecurrent Sturgeon", xp: 575, gold: 305, desc: "So heavy it alters water flow. It moves slowly but irresistibly." }
      ],
      Legendary: [
        { name: "Spiritborne Sturgeon", xp: 900, gold: 450, desc: "Water grows unnaturally calm around it. Many feel a quiet presence." },
        { name: "Ancestor Pike", xp: 950, gold: 480, desc: "Scarred and massive, descended from ancient stock. It fights relentlessly." },
        { name: "Crystal Current Eel", xp: 1000, gold: 510, desc: "Its body appears formed of flowing crystal water. It slips through nets effortlessly." },
        { name: "Silver Whisper Trout", xp: 1050, gold: 540, desc: "Emits faint harmonic vibrations underwater. It responds to gentle motion." },
        { name: "The Tinkerer's Koi", xp: 1100, gold: 570, desc: "Ancient koi marked with tool like patterns. It swims calmly despite its strength." }
      ],
      Mythic: [
        { name: "River King Aqualon", xp: 2200, gold: 1100, desc: "A colossal bass whose presence alters currents. Lesser fish scatter instantly." },
        { name: "First Rain Leviathan", xp: 2300, gold: 1150, desc: "Born from the river’s first storm. It moves with thunderous weight." },
        { name: "Currentbinder Arapaima", xp: 2400, gold: 1200, desc: "Manipulates water flow effortlessly. Lines feel pulled sideways." },
        { name: "Tide Soul Seraphin", xp: 2500, gold: 1250, desc: "Radiant and slow moving, embodying river spirit. It watches silently." },
        { name: "Chronicle Carp", xp: 2600, gold: 1300, desc: "Its scales carry marks of past floods. Elders say it remembers everything." }
      ],
      Exotic: [
        { name: "Clockwork King Salmon", xp: 7000, gold: 3500, desc: "Moves with perfect mechanical rhythm. It never appears to tire." },
        { name: "Eternal Flow Basilisk", xp: 7500, gold: 3750, desc: "A massive serpent like fish. Water bends unnaturally around its body." },
        { name: "Abysscoil Sturgeon", xp: 8000, gold: 4000, desc: "Dark scaled and immense, it pulls lines downward relentlessly. Few have landed it." }
      ],
      Arcane: [
        { name: "Chronos Time Carp", xp: 35000, gold: 20000, desc: "Exists across multiple moments of the river’s history. Catching it feels like pulling time itself." }
      ]
    }
  },
  2: {
    name: "Misty Pine Lake",
    unlockLevel: 10,
    unlockGold: 1500,
    boatRequired: null,
    boatPrice: 0,
    description: "The Tinker River widens and slows, spilling into a vast, cold lake wrapped in eternal fog. Towering pines line the shore, their reflections blurring into the grey, glassy surface where sounds are strangely muffled. The fish here have adapted to the gloom and silence, moving with ghostly grace and striking only when the mist thickens. Anglers must rely on tension rather than sight, as the line often disappears into the white haze.",
    fish: {
      Common: [
        { name: "Foggy Minnow", xp: 21, gold: 10, desc: "A pale, milky grey minnow that vanishes completely in cloudy water. It swims in slow, lazy circles near the surface and scatters silently when disturbed." },
        { name: "Needle Spine Stickleback", xp: 23, gold: 11, desc: "Its thin body is armored with bony plates, and its dorsal spines look like broken pine needles. It hovers vertically among submerged branches to blend in with forest debris." },
        { name: "Silt Glider Goby", xp: 25, gold: 12, desc: "A bottom dweller with mottled brown scales that match the lake bed mud. It moves in short, jerky hops, disturbing the silt to uncover buried worms." },
        { name: "Grey Fin Dace", xp: 27, gold: 13, desc: "A quick little fish with matte grey fins that reflect no light. It darts between shadows in the shallows, using speed rather than camouflage to escape." },
        { name: "Mist Eye Chub", xp: 29, gold: 14, desc: "Its eyes are clouded white, resembling tiny drops of milk. Despite its apparent blindness, it senses movement in the water with uncanny precision and snaps at surface insects." },
        { name: "Coldwater Betta", xp: 31, gold: 15, desc: "Adapted to the chill, this betta has shorter, thicker fins than its tropical cousins. It flares its dark blue gills aggressively at falling pine cones." },
        { name: "Pale Fin Fry", xp: 33, gold: 16, desc: "A juvenile fish with translucent, frost white fins. Swarms of them look like drifting snowflakes underwater and move with the current." },
        { name: "Ripple Back Minnow", xp: 35, gold: 17, desc: "The pattern on its back mimics the concentric rings of rain hitting water. It swims just below the surface, creating tiny, rhythmic vibrations." },
        { name: "Cloud Pattern Danio", xp: 37, gold: 18, desc: "Its silver scales feature swirling white markings that look like vapor. It enjoys the cold currents found near deep drop offs and schools tightly." },
        { name: "Shiver Eel", xp: 39, gold: 19, desc: "A small, slate grey eel that constantly vibrates to generate body heat. Holding one feels like holding a purring cat, and it squirms vigorously when caught." },
        { name: "Pine Bark Rasbora", xp: 41, gold: 20, desc: "Its scales are rough and dark brown, mimicking the texture of waterlogged bark. It clings to sunken logs and remains perfectly motionless until bait passes by." },
        { name: "Silent Swimmer Bleak", xp: 43, gold: 21, desc: "A metallic silver fish with a slender, streamlined body. It moves through the water without creating a single ripple, making it a challenge to track." }
      ],
      Uncommon: [
        { name: "Glassy Perch", xp: 52, gold: 31, desc: "Its body is so clear you can see its internal bone structure. It hangs motionless in the mid water, looking like a piece of suspended ice before striking prey." },
        { name: "White Tail Trout", xp: 55, gold: 33, desc: "Distinguished by a pure white stripe on its tail fin. It swims powerfully through the cold water, often breaking the surface to catch low flying gnats." },
        { name: "Stillwater Bass", xp: 58, gold: 35, desc: "A heavy, lethargic bass with dark green scales that waits for hours for prey to pass. It strikes with a sudden, dull thud that barely makes a splash." },
        { name: "Frost Scale Carp", xp: 61, gold: 37, desc: "Its scales are pale blue and feel freezing to the touch, even after being out of the water. It grazes on the lake bottom, moving sluggishly." },
        { name: "Needle Nose Gar", xp: 64, gold: 39, desc: "Its snout is long, thin, and hard, resembling a submerged branch. It drifts near the surface, snapping its jaws sideways to catch smaller fish." },
        { name: "Echo Caller Loach", xp: 67, gold: 41, desc: "A cylindrical fish that emits a low clicking sound. The sound echoes strangely in the misty air, often tricking anglers into thinking a branch has snapped." },
        { name: "Ghostly Grayling", xp: 70, gold: 43, desc: "A pale, silver white fish that seems to fade in and out of existence in the fog. It fights with erratic turns, using the murky water to break line of sight." },
        { name: "Dim Light Snapper", xp: 73, gold: 45, desc: "Its large eyes are adapted for low light hunting. It bites bait aggressively during overcast days, shaking its head violently." },
        { name: "Velvet Skin Roach", xp: 76, gold: 47, desc: "Born in the thickest parts of the mist, it has a soft, velvety texture rather than slimy scales. It handles gently and swims with slow, sweeping tail movements." },
        { name: "Mirror Side Tench", xp: 79, gold: 49, desc: "Its flanks are incredibly smooth and reflective, acting like a mirror for the grey sky. It is a shy fish that hides in dense weed beds." }
      ],
      Fine: [
        { name: "Silver Pine Pike", xp: 105, gold: 63, desc: "A long, slender pike with green markings resembling pine boughs. It strikes from the cover of fallen trees with terrifying speed." },
        { name: "Lantern Fog Catfish", xp: 110, gold: 68, desc: "Its whiskers glow with a faint, warm orange light, acting as lures in the gloom. It looks like a distant lantern bobbing in the fog." },
        { name: "Dew Drop Trout", xp: 115, gold: 73, desc: "Its skin is beaded with tiny bumps that look like fresh morning dew. It fights with surprising energy, leaping clear of the water." },
        { name: "Vapour Breath Barb", xp: 120, gold: 78, desc: "When lifted from the water, it releases a harmless steam from its gills. It congregates in the warmest pockets of the freezing lake." },
        { name: "Frost Bite Piranha", xp: 125, gold: 83, desc: "A rare cold water piranha with blue tinted teeth. Its bite leaves a numbing sensation rather than pain, and it hunts in small, aggressive packs." },
        { name: "Muffled Drum Fish", xp: 130, gold: 88, desc: "It produces a deep, thrumming sound that is absorbed by the dense air. You feel the vibration of its movement in your chest before you hear it." },
        { name: "Shadow Mist Salmon", xp: 135, gold: 93, desc: "Dark grey on top and white on the bottom, it blends perfectly with the shadowy lake bed. It fights with silent, heavy tugs that strain the rod." },
        { name: "Gloom Gill Bass", xp: 140, gold: 98, desc: "Its gills are a deep purple, contrasting with its pale body. It is often found sulking in the deepest, darkest holes of the lake." }
      ],
      Rare: [
        { name: "Iron Needle Gar", xp: 210, gold: 126, desc: "Its snout is as hard and thin as an iron needle. It weaves through dense underwater pine roots without ever getting stuck." },
        { name: "Whispering Sturgeon", xp: 220, gold: 131, desc: "A massive, gentle giant that moves so softly it doesn't disturb the water. Some say they can hear it whispering ancient secrets through the hull of the boat." },
        { name: "Blind Seer Eel", xp: 230, gold: 136, desc: "Completely blind, with smooth skin covering where eyes should be. It navigates the misty waters by sensing the heartbeats of other creatures." },
        { name: "Phantom Mist Ray", xp: 240, gold: 141, desc: "A freshwater ray that flutters like a discarded cloak. It buries itself in the cold mud, waiting for the fog to roll in before feeding." },
        { name: "Crystal Eye Walleye", xp: 250, gold: 146, desc: "Its eyes are crystallized and refract light like diamonds. It stares unblinkingly at anglers, giving off an uneasy, watchful feeling." },
        { name: "Pale Gold Carp", xp: 260, gold: 151, desc: "A carp with scales that look like old, tarnished gold. It is heavy and sluggish, acting as if it carries a great physical burden." },
        { name: "Fog Cutter Pike", xp: 270, gold: 156, desc: "Its dorsal fin is serrated and acts like a rudder, slicing through the surface mist cleanly. It is the apex predator of the shallow waters." },
        { name: "Moon Reflection Trout", xp: 280, gold: 161, desc: "Its scales only shine under moonlight; during the day, it looks dull grey. Catching one at night creates a spectacular light show." }
      ],
      Epic: [
        { name: "Storm Cloud Catfish", xp: 420, gold: 210, desc: "Dark and brooding, its skin patterns resemble heavy storm clouds. It becomes highly active and aggressive when the barometer drops." },
        { name: "Eternal Haze Bass", xp: 445, gold: 225, desc: "It has lived in the lake so long that moss grows on its back. It seems to exhale a constant stream of fine bubbles." },
        { name: "Frost Giant Gar", xp: 470, gold: 240, desc: "An enormous gar that requires two people to lift. Its scales are rimmed with permanent frost that never melts." },
        { name: "Silent Thunder Eel", xp: 495, gold: 255, desc: "It generates a static charge that makes your hair stand up. It moves with the sudden, silent violence of a lightning strike." },
        { name: "White Walker Sturgeon", xp: 520, gold: 270, desc: "A bone white sturgeon that looks skeletal in the murky water. It patrols the lake bed like a restless spirit." },
        { name: "Resin Scale Carp", xp: 545, gold: 285, desc: "It smells strongly of pine resin. Legend says it carries the soul of the forest itself within its belly." },
        { name: "Glacial Shard Trout", xp: 570, gold: 300, desc: "Its body is angular and sharp, resembling a shard of broken ice. Handle with care, as its edges can cut fishing lines." },
        { name: "Twilight Gloom Snapper", xp: 595, gold: 315, desc: "A turtle like fish with a hard shell and powerful jaws. It snaps with enough force to crack rocks and hates the sunlight." }
      ],
      Legendary: [
        { name: "The White Lady Koi", xp: 945, gold: 472, desc: "A legendary Koi, purely white with long, flowing fins like a bridal veil. Seeing her is an omen of a peaceful death or a new life." },
        { name: "Ghost Ship Sturgeon", xp: 995, gold: 502, desc: "A sturgeon so large and scarred it resembles the hull of a sunken ship. It creates a wake that can rock small boats." },
        { name: "Mist Walker Arapaima", xp: 1045, gold: 532, desc: "This ancient beast breathes air, rising from the mist with a gasp that sounds like a drowning man. It is the terror of the lake." },
        { name: "Void Eye Catfish", xp: 1095, gold: 562, desc: "Its eyes are pitch black pools that seem to absorb all light. Staring into them causes dizziness and confusion." },
        { name: "Silent Scream Pike", xp: 1145, gold: 592, desc: "It opens its mouth wide when caught, but makes no sound. Its silence is more terrifying than any roar." }
      ],
      Mythic: [
        { name: "Mist Weaver Hydra", xp: 2310, gold: 1155, desc: "A serpentine beast with three distinct heads, though only one is real. It weaves the lake's fog to hide its true location." },
        { name: "Fog Bound Leviathan", xp: 2410, gold: 1205, desc: "A massive creature whose back forms an island when it surfaces. It is bound to the lake by ancient magic, unable to leave the mist." },
        { name: "Pine Needle Kirin", xp: 2510, gold: 1255, desc: "An aquatic version of the mythical Kirin, with scales made of pine bark and a mane of green needles. It walks on the water's surface." },
        { name: "Cloud Fin Wyrm", xp: 2610, gold: 1305, desc: "A dragon like serpent that flies through the underwater currents as if they were air. It brings the thickest fogs with its passing." },
        { name: "Echo Siren Bass", xp: 2710, gold: 1355, desc: "A fish with the face of a sorrowful statue. It emits a haunting melody that lures fishermen deeper into the dangerous mists." }
      ],
      Exotic: [
        { name: "Glacial Drake", xp: 7350, gold: 3675, desc: "A wingless dragon adapted to the deep cold. Its breath freezes the water instantly, encasing its prey in ice blocks." },
        { name: "Deep Mist Kraken", xp: 7850, gold: 3925, desc: "Smaller than its ocean cousins but possessing infinite limbs. It releases an ink that becomes the lake's impenetrable fog." },
        { name: "Shadow Chimera Fish", xp: 8350, gold: 4175, desc: "A shifting amalgamation of fish, eel, and reptile parts held together by shadow. It changes shape to terrify whoever looks at it." }
      ],
      Arcane: [
        { name: "Mist Wing Wyvern", xp: 36750, gold: 21000, desc: "The spectral ruler of Misty Pine Lake. It is not flesh and blood, but condensed fog and ancient sorrow, having no form, only weight and cold will." }
      ]
    }
  },
  3: {
    name: "Sapphire Coast",
    unlockLevel: 25,
    unlockGold: 5000,
    boatRequired: null,
    boatPrice: 0,
    description: "Leaving the mist behind, the river widens and surges into the open ocean, meeting the blinding clarity of the Sapphire Coast. Here, the water is a brilliant, transparent blue, stretching endlessly beneath sun drenched skies. Schools of fish flash like scattered gems over white sandbars, and the rhythm of the tides reveals hidden feeding grounds. While the surface looks inviting, sudden drop offs and strong coastal currents demand an angler's full attention.",
    fish: {
      Common: [
        { name: "Azure Minnow", xp: 22, gold: 11, desc: "A tiny fish with bright blue scales that match the open water perfectly. It schools near the surface, turning in unison to flash silver at predators." },
        { name: "Sun Kissed Sardine", xp: 24, gold: 12, desc: "Its silver sides reflect the sunlight in blinding, mirror like flashes. Large schools look like a spill of shimmering coins drifting over the sand." },
        { name: "Tide Drifter Goby", xp: 26, gold: 13, desc: "It rides the incoming tides to feed on stirred up sand crabs. It has small, strong pelvic fins that allow it to cling to rocks when the current retreats." },
        { name: "Coral Chip Tetra", xp: 28, gold: 14, desc: "Brightly colored orange and pink, resembling a piece of broken coral. It helps clean the reefs of parasites and darts into crevices when threatened." },
        { name: "Glass Bead Fry", xp: 30, gold: 15, desc: "A round, transparent fry that looks like a floating glass marble. It refracts sunlight to confuse birds and other surface hunters." },
        { name: "Sand Dancer Flounder", xp: 32, gold: 16, desc: "It lies perfectly flat on the white sand, invisible until it ripples its fins. When disturbed, it flutters away like a piece of paper caught in the wind." },
        { name: "Quartz Scale Mullet", xp: 34, gold: 17, desc: "Its scales are hard and jagged, feeling like rough stone to the touch. It grazes on algae covered rocks in the crashing surf." },
        { name: "Blue Fin Dace", xp: 36, gold: 18, desc: "A fast swimmer that leaps out of the water to escape larger fish. Its deep royal blue fins make it look like a flying sapphire." },
        { name: "Foam Bubble Puffer", xp: 38, gold: 19, desc: "A small pufferfish with white spots that mimic sea foam. It inflates into a prickly ball of air when pulled from the water." },
        { name: "Shimmer Tail Eel", xp: 40, gold: 20, desc: "A small eel with a tail that glows faintly in the shadow of rocks. It is playful, often seen chasing its own tail in tide pools." },
        { name: "Salt Crystal Guppy", xp: 42, gold: 21, desc: "Its tail fin looks like a cluster of square salt crystals. It thrives in the highest salinity pools left behind by the receding tide." },
        { name: "Wave Rider Blenny", xp: 44, gold: 22, desc: "This energetic fish surfs inside the curl of breaking waves. It has a blunt face and uses the force of the water to travel along the beach." }
      ],
      Uncommon: [
        { name: "Crystal Fin Parrotfish", xp: 55, gold: 33, desc: "Its beak is strong enough to crush coral, and its fins look like cut crystal. It leaves a trail of fine white sand wherever it feeds." },
        { name: "Sapphire Streak Snapper", xp: 58, gold: 35, desc: "Distinguished by a vivid blue stripe running down its side. It is aggressive and strikes bait with incredible speed, often hooking itself." },
        { name: "Sun Ray Mackerel", xp: 61, gold: 37, desc: "It swims in tight formations that move like beams of light underwater. Catching one often triggers a feeding frenzy in the rest of the school." },
        { name: "Velvet Blue Grouper", xp: 64, gold: 39, desc: "A small grouper with skin soft as velvet and deep blue coloration. It hides in rock crevices, watching the open water with curious, rotating eyes." },
        { name: "Tidal Shift Mullet", xp: 67, gold: 41, desc: "It migrates strictly with the changing tides, moving kilometers in a single day. Locals use its arrival to predict the exact moment of high tide." },
        { name: "Prism Scale Tuna", xp: 70, gold: 43, desc: "Its scales separate sunlight into miniature rainbows. It is a juvenile tuna, but already fights with surprising strength and speed." },
        { name: "Reef Runner Wrasse", xp: 73, gold: 45, desc: "Built for agility, it darts through sharp coral reefs without getting a scratch. It loves chasing shiny lures and bites with a sharp, clicking jaw." },
        { name: "Clear Water Drum", xp: 76, gold: 47, desc: "It makes a booming sound that travels far in the clear water. It uses this sound to locate mates across the vast, empty sandy flats." },
        { name: "Gem Eye Rockfish", xp: 79, gold: 49, desc: "Its eyes resemble faceted emeralds and reflect light. It remains perfectly still on rocks, looking like a piece of discarded jewelry." },
        { name: "Cobalt Needlefish", xp: 82, gold: 51, desc: "Long, thin, and metallic blue, it resembles a floating spear. It skips across the surface of the water like a stone when frightened." }
      ],
      Fine: [
        { name: "Lapis Lazuli Carp", xp: 110, gold: 66, desc: "A saltwater carp variant with dazzling blue and gold flecks. Its scales are prized by local artisans for use in coastal jewelry." },
        { name: "Solar Flare Tang", xp: 115, gold: 71, desc: "Bright yellow with trailing fins that look like solar prominences. It brings a burst of warmth and color to the cooler, deeper reef waters." },
        { name: "Diamond Back Flounder", xp: 120, gold: 76, desc: "Its back pattern looks perfectly geometric, like a cut diamond. It buries itself in sand mixed with crushed quartz crystals to blend in." },
        { name: "Glitter Shoal Herring", xp: 125, gold: 81, desc: "A single fish glitters, but a school looks like a solid wall of silver. They move in perfect unison to reflect light and confuse predators." },
        { name: "Aquamarine Barracuda", xp: 130, gold: 86, desc: "A predator with a translucent blue green body. It waits motionless near the surface, looking like drifting seaweed before striking." },
        { name: "Topaz Tail Trevally", xp: 135, gold: 91, desc: "Its tail is a brilliant, transparent yellow. It uses it to signal others of danger and fights with frantic, jerky movements when hooked." },
        { name: "Opal Fin Ray", xp: 140, gold: 96, desc: "Its wings shimmer with pearlescent colors like an opal stone. It glides over the ocean floor, disturbing the sand to find hidden clams." },
        { name: "Cerulean Spine Bass", xp: 145, gold: 101, desc: "Its dorsal spines are sharp and bright blue. It flares them to look larger and more intimidating to rivals during territorial disputes." }
      ],
      Rare: [
        { name: "Star Dust Stingray", xp: 220, gold: 132, desc: "Its dark back is covered in white dots that mimic the night sky. It prefers the deep, calm waters near the drop off where light fades." },
        { name: "Golden Tide Kingfish", xp: 230, gold: 137, desc: "A powerful fish that arrives only with the highest tides of the year. Its flesh is said to taste like sweet nectar and is highly sought after." },
        { name: "Ruby Throat Snapper", xp: 240, gold: 142, desc: "Named for the distinct red patch on its throat and gills. It lives in deeper waters where red light barely penetrates, making it invisible." },
        { name: "Mirror Scale Marlin", xp: 250, gold: 147, desc: "A young marlin with scales so reflective they are blinding. It jumps frequently, flashing like a signal mirror to others in its pod." },
        { name: "Jade Fin Bonito", xp: 260, gold: 152, desc: "Its fins are a deep, opaque green like polished jade. It swims in fast, endless circles, never stopping to rest or sleep." },
        { name: "Sun Shard Swordfish", xp: 270, gold: 157, desc: "Its bill is translucent and glows in the sunlight. It uses it to slash through schools of smaller fish with surgical precision." },
        { name: "Deep Blue Mahi", xp: 280, gold: 162, desc: "A mahi mahi that has adapted to deeper waters, turning a rich, dark blue. It is incredibly strong and performs acrobatic leaps." },
        { name: "Ghost Glass Shark", xp: 290, gold: 167, desc: "A small shark with skin so clear you can see its digestion. It is a silent hunter that leaves no wake and strikes from below." }
      ],
      Epic: [
        { name: "Titan Sapphire Grouper", xp: 440, gold: 220, desc: "A colossal grouper with eyes the size of saucers. It guards the entrance to underwater caves, claiming them as its throne." },
        { name: "Radiant Sunfish", xp: 465, gold: 235, desc: "A massive, round fish that glows with its own internal light. It basks on the surface, absorbing the sun's energy to fuel its glow." },
        { name: "Hurricane Runner Tuna", xp: 490, gold: 250, desc: "It swims faster than any boat, often racing ahead of approaching storms. Its streamlined body is nature's perfect design for speed." },
        { name: "Abyssal Light Angler", xp: 515, gold: 265, desc: "Usually a deep sea fish, it rises to the coast at night. Its lure shines with a mesmerizing blue light that traps the unwary." },
        { name: "Reef Breaker Shark", xp: 540, gold: 280, desc: "Its skin is as hard as the coral it hunts around. It charges through obstacles rather than swimming around them, snapping coral branches like twigs." },
        { name: "Tidal Wave Trevally", xp: 565, gold: 295, desc: "A giant trevally that hunts in the surf of massive waves. It uses the power of the ocean to overwhelm its prey and tire out anglers." },
        { name: "Crystal Armor Sturgeon", xp: 590, gold: 310, desc: "Its bony plates have crystallized over centuries in the mineral rich waters. It is heavy, slow, and nearly indestructible." },
        { name: "Celestial Blue Ray", xp: 615, gold: 325, desc: "Its wingspan rivals small sails. It flies through the water with a grace that makes it look weightless, trailing sparkling dust." }
      ],
      Legendary: [
        { name: "The Ocean's Eye", xp: 990, gold: 495, desc: "A legendary sunfish with a single, massive eye in the center of its body. It is said to see the currents of the entire world and know the tides of fate." },
        { name: "Leviathan's Tooth Barracuda", xp: 1040, gold: 525, desc: "An ancient barracuda, scarred and solitary. Its teeth are like jagged daggers, and it is the undisputed king of the shallow reefs." },
        { name: "Prismatic Fin Sailfish", xp: 1090, gold: 555, desc: "Its sail contains every color of the spectrum. When it raises its fin, it mesmerizes fish and fishermen alike, causing a moment of stunned silence." },
        { name: "Spirit of the Tide", xp: 1140, gold: 585, desc: "A translucent entity that takes the form of a manta ray. It only appears when the tide turns, guiding lost sailors home or into the depths." },
        { name: "Glimmer Shell Turtle", xp: 1190, gold: 615, desc: "Not a fish, but a legendary catch. Its shell is made of living gemstone. It carries the history of the coast etched into the facets of its back." }
      ],
      Mythic: [
        { name: "Azure Dragon Leviathan", xp: 2420, gold: 1210, desc: "A serpentine dragon made of rushing water and blue scales. It controls the tides with its breath and can capsize ships with a flick of its tail." },
        { name: "Sun Chaser Kraken", xp: 2520, gold: 1260, desc: "A squid of mythical proportions that turns dark red when it hunts, blotting out the light from above. It drags entire schools of fish into the abyss." },
        { name: "Crystal Behemoth Whale", xp: 2620, gold: 1310, desc: "A whale whose skin is encrusted with massive sapphire crystals. Its song resonates through the hull of ships, vibrating in your bones." },
        { name: "Siren's Tear Shark", xp: 2720, gold: 1360, desc: "A shark that weeps tears of pure pearl. It is tragically beautiful and terrifyingly deadly, lured by the sound of weeping sailors." },
        { name: "Tidal Lord Serpent", xp: 2820, gold: 1410, desc: "A massive sea serpent with a crown of coral. It commands the schools of fish and summons sudden waves to knock anglers off their feet." }
      ],
      Exotic: [
        { name: "Starlight Manta", xp: 7700, gold: 3850, desc: "A manta ray that looks like a cut out of the night sky. It swims through the water but seems to be traversing the vacuum of space itself." },
        { name: "Incandescent Sea Drake", xp: 8200, gold: 4100, desc: "A wingless aquatic drake that glows with blinding white heat. It boils the water around it as it swims, leaving a trail of steam." },
        { name: "Crystal Scale Coelacanth", xp: 8700, gold: 4350, desc: "A fish made of animated gemstones, created by an ancient civilization. It does not eat or sleep; it only guards the sunken ruins forever." }
      ],
      Arcane: [
        { name: "Celestial Tide Whale", xp: 38500, gold: 22000, desc: "A cosmic whale that swims in the space between the ocean and the stars. It weaves the fabric of reality with its movements. Catching it reveals the interconnectedness of all things." }
      ]
    }
  },
  4: {
    name: "Thundercliff Bay",
    unlockLevel: 50,
    unlockGold: 25000,
    boatRequired: null,
    boatPrice: 0,
    description: "North of the Sapphire Coast, the skies darken and the wind begins to howl. Thundercliff Bay is a treacherous expanse of black water bordered by sheer, jagged granite walls that amplify the sound of constant thunder. The currents here are violent and unpredictable, surging through narrow channels and smashing against the rocks. Only the hardiest fish survive in this electrified, turbulent sea, often utilizing the storm's energy for their own defense.",
    fish: {
      Common: [
        { name: "Slate Grey Cod", xp: 23, gold: 11, desc: "Its dull grey scales allow it to blend perfectly against the dark cliff walls. It hides in rocky overhangs to avoid strong currents and ambushes passing prey." },
        { name: "Cliff Shadow Goby", xp: 25, gold: 12, desc: "A small fish that clings to vertical rock faces using strong pelvic fins. It darts into deep crevices the moment it feels the water surge." },
        { name: "Storm Chaser Minnow", xp: 27, gold: 13, desc: "These minnows school tightly near the surface before a storm hits, feeding on insects blown into the water. They have a metallic sheen that reflects lightning." },
        { name: "Granite Scale Chub", xp: 29, gold: 14, desc: "Its scales are rough and hard, protecting it from being battered against the rocks by heavy waves. It crunches on barnacles found near the waterline." },
        { name: "Surge Rider Dace", xp: 31, gold: 15, desc: "It swims comfortably in the most turbulent waters, using the bay's erratic currents to travel quickly. Its streamlined body cuts through foam effortlessly." },
        { name: "Thunderhead Tetra", xp: 33, gold: 16, desc: "Dark bodied with a flashing yellow stripe. A school of them changing direction looks like a miniature lightning storm underwater." },
        { name: "Lightning Flash Fry", xp: 35, gold: 17, desc: "A tiny, jagged finned fish that moves in unpredictable zig zags. It is incredibly difficult for predators to catch due to its erratic speed." },
        { name: "Rain Drop Rasbora", xp: 37, gold: 18, desc: "Its translucent body has spots that look like ripples on water. It is most active during heavy downpours, surfacing to catch floating larvae." },
        { name: "Gale Force Guppy", xp: 39, gold: 19, desc: "Surprisingly strong for its size, it possesses a large tail fin to combat the constant push and pull of the tide. It rarely strays from the bay's edge." },
        { name: "Rough Water Wrasse", xp: 41, gold: 20, desc: "A hardy fish with thick, rubbery skin. It scavenges for food dislodged by the crashing waves near the cliff base, ignoring the turbulence." },
        { name: "Static Fin Sprat", xp: 43, gold: 21, desc: "Small and silvery, it generates a tiny static charge when threatened. Schools of them can deliver a surprising shock to unwary wading birds." },
        { name: "Cloud Cover Bleak", xp: 45, gold: 22, desc: "Its coloring mimics the bruised purple and grey of a storm cloud. It drifts near the surface, vanishing when the sky darkens." }
      ],
      Uncommon: [
        { name: "Volt Spine Perch", xp: 57, gold: 34, desc: "Its dorsal fin stands rigid and bristles with static energy. Fishermen often report a mild tingle running up the line when unhooking it." },
        { name: "Cloud Eye Snapper", xp: 60, gold: 36, desc: "Its eyes are a milky grey, adapted to the low light of the stormy bay. It strikes blindly at vibrations, hitting with great force." },
        { name: "Iron Tail Bass", xp: 63, gold: 38, desc: "Its tail muscles are dense and iron hard, allowing it to hold its position against the strongest rip currents. It fights with short, powerful runs." },
        { name: "Echo Clap Carp", xp: 66, gold: 40, desc: "It slaps its tail against the water surface to stun prey. The sound echoes off the cliffs like a distant thunderclap, signaling its feeding time." },
        { name: "Voltage Eel", xp: 69, gold: 42, desc: "A small eel with yellow markings that pulse when it is agitated. It nests in the hollows of conductive rocks and hunts during lightning storms." },
        { name: "Flash Flood Flounder", xp: 72, gold: 44, desc: "It buries itself deep in the sediment to wait out violent surges. It appears suddenly when the waters calm, shaking off the heavy sand." },
        { name: "Crag Hider Grouper", xp: 75, gold: 46, desc: "Its mottled skin looks exactly like wet cliff stone. It ambushes prey that wanders too close to the rock wall, inhaling them instantly." },
        { name: "Mist Spray Mackerel", xp: 78, gold: 48, desc: "It leaps from the water into the sea spray to escape predators. Its scales are slick and retain water well, allowing short glides." },
        { name: "Dark Tide Drum", xp: 81, gold: 50, desc: "A black fish that produces a low, rumbling sound. During storms, schools of them drum in unison, matching the rhythm of the thunder." },
        { name: "Spark Scale Shiner", xp: 84, gold: 52, desc: "Its scales create tiny sparks when they rub against rocks. It uses this bioluminescence to signal others in the dark, churning water." }
      ],
      Fine: [
        { name: "Fulgurite Pike", xp: 114, gold: 69, desc: "Named after lightning glass, its body is jagged and pale. It strikes with the speed of a bolt from the blue, slicing through the water." },
        { name: "Thunder Clap Catfish", xp: 119, gold: 74, desc: "It has large, sensitive whiskers that can detect barometric pressure changes. It becomes frantic and active hours before a storm arrives." },
        { name: "Ozone Scented Salmon", xp: 124, gold: 79, desc: "A migratory fish that returns to the bay during storm season. It carries the sharp, clean scent of ozone and fights with erratic energy." },
        { name: "Electric Blue Ray", xp: 129, gold: 84, desc: "A ray with vivid blue veins running through its wings. It stuns small crabs with a weak electric discharge before crushing them." },
        { name: "Storm Born Barracuda", xp: 134, gold: 89, desc: "Born in the wildest weather, it knows no fear. It patrols the turbulent surf looking for disoriented baitfish to snap up." },
        { name: "Jagged Fin Trout", xp: 139, gold: 94, desc: "Its fins are tattered and sharp, evolved to cut through heavy kelp and fast currents. It fights with erratic, jerky movements that test the drag." },
        { name: "Whirlwind Walleye", xp: 144, gold: 99, desc: "It swims in tight, spinning circles to create small vacuums that suck in prey. It is a master of using water flow to its advantage." },
        { name: "Torrential Trevally", xp: 149, gold: 104, desc: "A powerful swimmer that heads directly into the strongest waves. Catching one requires heavy tackle and patience as it uses the current against you." }
      ],
      Rare: [
        { name: "Copper Conductor Eel", xp: 229, gold: 138, desc: "Its skin has a metallic copper sheen. It is often found near submerged metal wreckage, drawn to the conductivity of the rusted iron." },
        { name: "Charged Spine Lionfish", xp: 239, gold: 143, desc: "Its spines are not just venomous but carry a bio electric charge. It flaunts its fins, daring anything to attack, and moves with arrogant slowness." },
        { name: "Tempest Eye Tuna", xp: 249, gold: 148, desc: "Its eyes swirl with grey and white patterns like a hurricane. It hunts in the chaotic waters where the cliff runoff meets the sea." },
        { name: "Bolt Strike Swordfish", xp: 259, gold: 153, desc: "Its bill is blackened as if scorched by fire. It slashes with blinding speed, leaving a trail of bubbles that looks like smoke." },
        { name: "Rolling Thunder Sturgeon", xp: 269, gold: 158, desc: "A massive, dark sturgeon that rumbles as it swims. Its movement causes vibrations felt through the rod, like a train passing underwater." },
        { name: "Cliff Diver Salmon", xp: 279, gold: 163, desc: "Known to leap from high waterfalls into the bay. It has an incredibly tough skeletal structure to survive impacts against the rocks." },
        { name: "Magnetic Scale Marlin", xp: 289, gold: 168, desc: "Its scales are slightly magnetic, allowing it to navigate using the earth's field even in the darkest storms. It makes long, powerful runs." },
        { name: "Overcast Opah", xp: 299, gold: 173, desc: "A round, heavy fish with the colors of a bruised sky—purple, grey, and black. It rarely surfaces, preferring the crushing depths of the cliff drop offs." }
      ],
      Epic: [
        { name: "Maelstrom Grouper", xp: 459, gold: 229, desc: "It opens its massive mouth to create a suction strong enough to pull in everything nearby. It sits at the center of its own vortex." },
        { name: "Eye of the Storm Shark", xp: 484, gold: 244, desc: "A shark that swims calmly in the roughest waters. It is the only thing that remains still while the ocean rages around it." },
        { name: "High Voltage Gar", xp: 509, gold: 259, desc: "An ancient predator that has evolved to generate lethal shocks. Its scales crackle with visible energy when it breaks the surface." },
        { name: "Cloud Breaker Tarpon", xp: 534, gold: 274, desc: "A giant coastal fish adapted to the bay. It leaps high enough to catch low flying birds, seemingly piercing the low hanging clouds." },
        { name: "Tsunami Caller Carp", xp: 559, gold: 289, desc: "Legend says that when this carp thrashes its tail, the waves grow larger. It is a symbol of the ocean's raw, destructive power." },
        { name: "Blitzkrieg Bass", xp: 584, gold: 304, desc: "It strikes without warning and fights with relentless, explosive energy. It exhausts anglers before they can even see it surface." },
        { name: "Thunder Herald Ray", xp: 609, gold: 319, desc: "A black ray with yellow markings resembling lightning bolts. Its appearance is said to herald the arrival of a superstorm." },
        { name: "Void Storm Piranha", xp: 634, gold: 334, desc: "A solitary, oversized saltwater piranha with teeth like obsidian shards. It bites through steel leaders as if they were thread." }
      ],
      Legendary: [
        { name: "The Living Lightning", xp: 1035, gold: 517, desc: "An eel composed of pure white energy. It moves too fast for the eye to follow, leaving only a searing afterimage burned into your vision." },
        { name: "Storm Bringer Squid", xp: 1085, gold: 547, desc: "A colossal squid that releases ink dark enough to turn day into night. It thrives in the chaos of the tempest, using the darkness to hunt." },
        { name: "Ancient Cliff Guardian", xp: 1135, gold: 577, desc: "A sturgeon as old as the cliffs themselves. Its back is covered in barnacles and stone, making it look like a piece of the wall come to life." },
        { name: "The Thunder Strike", xp: 1185, gold: 607, desc: "A pike that only bites when lightning strikes the water. It embodies the sudden, destructive force of nature and hits like a freight train." },
        { name: "Rain Dancer Koi", xp: 1235, gold: 637, desc: "A beautiful, shimmering koi that swims in the pattern of falling rain. Catching it is said to bring an end to even the longest storms." }
      ],
      Mythic: [
        { name: "Thor's Hammerhead", xp: 2530, gold: 1265, desc: "A shark with a head shaped like a mythical war hammer. It slams into prey with the force of a thunderclap, shattering bones instantly." },
        { name: "Raijin's Drum Fish", xp: 2630, gold: 1315, desc: "A round, floating creature that beats its own sides to create the sound of thunder. It summons storm clouds to protect itself from capture." },
        { name: "Tempest Wyrm", xp: 2730, gold: 1365, desc: "A sea serpent that rides the lightning bolts down from the sky into the sea. It is charged with the fury of the heavens and glows with electric blue light." },
        { name: "Cloud Leviathan Whale", xp: 2830, gold: 1415, desc: "A whale like being made of condensed vapor and storm clouds. It floats through the water as if it were the sky, raining upon those below it." },
        { name: "Lightning Mane Kirin", xp: 2930, gold: 1465, desc: "A majestic creature with scales of blue crystal and a mane of sparks. It walks upon the lightning struck waves without breaking the surface." }
      ],
      Exotic: [
        { name: "Plasma Scale Marlin", xp: 8049, gold: 4024, desc: "A marlin whose scales boil the water around it, creating a shroud of steam. It is the heart of the storm given form, moving at impossible speeds." },
        { name: "Void Lightning Serpent", xp: 8549, gold: 4274, desc: "An underwater entity resembling a viper, composed of purple lightning and dark matter. It hunts between dimensions and strikes through reality itself." },
        { name: "Time Storm Coelacanth", xp: 9049, gold: 4524, desc: "A prehistoric fish that exists in a localized time storm. It flickers between past and future, making it nearly impossible to hook or hold." }
      ],
      Arcane: [
        { name: "Grand Tempest Mosasaur", xp: 40250, gold: 23000, desc: "A prehistoric marine reptile of colossal size that feeds on the energy of storms. It is vast, silent, and terrifying. To catch it is to challenge the wrath of nature itself." }
      ]
    }
  },
  5: {
    name: "Stoneheart Grotto",
    unlockLevel: 75,
    unlockGold: 100000,
    boatRequired: null,
    boatPrice: 0,
    description: "Seeking refuge from the thunderous storms outside, the waterway plunges into a colossal network of flooded caverns beneath the mountains. Stoneheart Grotto is a world of eternal night, illuminated only by patches of glowing moss and radiant crystals. The water here is still, cold, and mineral rich. The fish have evolved in darkness, often trading sight for heightened senses or developing thick, armored scales to survive against the sharp rock walls.",
    fish: {
      Common: [
        { name: "Pale Cave Minnow", xp: 24, gold: 12, desc: "A completely albino minnow with translucent skin showing pinkish organs. It swims blindly in large schools, sensing water pressure to avoid obstacles." },
        { name: "Slate Biter Goby", xp: 26, gold: 13, desc: "Its teeth are fused into a scraping plate used to eat algae off the cavern walls. Its dark grey body blends perfectly with the wet stone." },
        { name: "Glow Dot Tetra", xp: 28, gold: 14, desc: "A small black fish with a single, bright blue bioluminescent spot on its tail. The spots confuse predators in the pitch blackness." },
        { name: "Blind Whisker Catfish", xp: 30, gold: 15, desc: "Lacking eyes entirely, it relies on incredibly long, sensitive whiskers that fan out like a net. It scours the sediment for soft shelled snails." },
        { name: "Stalactite Dace", xp: 32, gold: 16, desc: "Its elongated body hangs vertically from the cave ceiling, mimicking a stone formation. It drops suddenly to snatch passing prey." },
        { name: "Quartz Fin Shiner", xp: 34, gold: 17, desc: "Its fins are rigid and sharp, resembling thin sheets of quartz. It flashes a white light when it turns, communicating with others in the dark." },
        { name: "Echo Location Chub", xp: 36, gold: 18, desc: "It emits high frequency clicks to map its surroundings. Its large, concave forehead acts as a dish to receive the returning sound waves." },
        { name: "Rock Mimic Bleak", xp: 38, gold: 19, desc: "Its scales are rough and uneven, looking exactly like a piece of granite. It stays perfectly still on the bottom until disturbed." },
        { name: "Deep Root Rasbora", xp: 40, gold: 20, desc: "Found only where tree roots from the surface penetrate the cave ceiling. It nips at the roots for sustenance and hides in the tangles." },
        { name: "Fossil Tooth Fry", xp: 42, gold: 21, desc: "A tiny, ancient looking fish with bony protrusions on its jaw. It looks like a prehistoric relic that stopped evolving millions of years ago." },
        { name: "Sulphur Gill Guppy", xp: 44, gold: 22, desc: "Adapted to the volcanic vents deep in the grotto, it has bright yellow gills. It can survive in water with very low oxygen levels." },
        { name: "Shadow Dart Danio", xp: 46, gold: 23, desc: "A vantablack fish that absorbs almost all light. It is invisible against the dark water, only revealing itself when it creates a silhouette against glowing moss." }
      ],
      Uncommon: [
        { name: "Crystal Spine Perch", xp: 60, gold: 36, desc: "Its dorsal spines have calcified into clear crystals. It flares them to look larger and reflect the ambient light of the grotto." },
        { name: "Limestone Bass", xp: 63, gold: 38, desc: "A heavy, pale fish with thick, chalky scales. It is sluggish but possesses a bite force capable of crushing crab shells." },
        { name: "Velvet Cave Trout", xp: 66, gold: 40, desc: "Its skin is covered in a soft, black fuzz that dampens sound. It moves silently through the water, approaching prey without triggering their lateral lines." },
        { name: "Geode Back Carp", xp: 69, gold: 42, desc: "The scales on its back are hollow and lined with tiny purple crystals. It is a slow swimmer that relies on its hard armor for defense." },
        { name: "Obsidian Scale Snapper", xp: 72, gold: 44, desc: "Its scales are glass smooth and sharp as obsidian razors. It strikes with a slashing motion that can cut through fishing line." },
        { name: "Ghost Light Eel", xp: 75, gold: 46, desc: "A translucent eel containing an internal organ that glows with a pale green light. It lures prey towards the light before snapping its jaws." },
        { name: "Iron Vein Flounder", xp: 78, gold: 48, desc: "It has rust colored streaks running through its body, indicating a diet rich in iron ore. It is heavy and fights with stubborn downward weight." },
        { name: "Sonar Fin Roach", xp: 81, gold: 50, desc: "Its pectoral fins are shaped like acoustic dishes. It can detect the heartbeat of a worm buried in the mud from three meters away." },
        { name: "Cave Dweller Mullet", xp: 84, gold: 52, desc: "It has evolved a layer of fat to insulate against the intense cold of the deep grotto. It is prized for its rich, oily meat." },
        { name: "Magma Glow Char", xp: 87, gold: 54, desc: "Found near thermal vents, its belly glows a dull red. It radiates a surprising amount of heat when pulled from the water." }
      ],
      Fine: [
        { name: "Diamond Eye Walleye", xp: 120, gold: 72, desc: "Its eyes are multi faceted and reflect light like cut diamonds. It sees perfectly in near total darkness and hunts with terrifying accuracy." },
        { name: "Emerald Moss Pike", xp: 125, gold: 77, desc: "Symbiotic glowing moss grows on its scales, giving it a camouflage of green light. It waits in moss beds for unsuspecting prey." },
        { name: "Heavy Metal Gar", xp: 130, gold: 82, desc: "Its scales contain trace amounts of lead and silver, making it incredibly heavy. It sinks like a stone if it stops swimming." },
        { name: "Whispering Cave Catfish", xp: 135, gold: 87, desc: "It emits a low frequency hum that resonates off the cave walls. The sound can be felt in the handle of the fishing rod." },
        { name: "Onyx Fin Ray", xp: 140, gold: 92, desc: "A jet black ray that glides along the cavern floor like a shadow. Its spine is tipped with a venomous barb made of black stone." },
        { name: "Stalagmite Sturgeon", xp: 145, gold: 97, desc: "Its back ridges rise high and pointed, resembling the rock formations on the cave floor. It often buries itself, leaving only the spikes exposed." },
        { name: "Luminous Lantern Fish", xp: 150, gold: 102, desc: "An anglerfish variant adapted to freshwater caves. Its lure is a blindingly bright white orb that mesmerizes fish in the absolute dark." },
        { name: "Deep Echo Trout", xp: 155, gold: 107, desc: "A trout that navigates complex tunnels at high speed. It has a unique lateral line that senses the pressure changes of approaching walls." }
      ],
      Rare: [
        { name: "Ancient Relic Coelacanth", xp: 240, gold: 144, desc: "A living fossil with armored scales that predate the cave itself. It moves with a strange, lobed fin gait that looks like walking." },
        { name: "Sapphire Vein Salmon", xp: 250, gold: 149, desc: "Bright blue veins pulse beneath its pale skin. It swims upstream into the deepest parts of the earth to spawn." },
        { name: "Goliath Cave Grouper", xp: 260, gold: 154, desc: "An enormous, pale grouper that claims entire caverns as its territory. It swallows prey whole, creating a vacuum that pulls in water." },
        { name: "Razor Rock Bass", xp: 270, gold: 159, desc: "Its body is covered in sharp, jagged protrusions. Handling it without gloves is impossible, as it cuts like broken flint." },
        { name: "Void Black Piranha", xp: 280, gold: 164, desc: "Its teeth are transparent, and its body creates no reflection. It attacks in silence, stripping prey to the bone in seconds." },
        { name: "Molten Core Snapper", xp: 290, gold: 169, desc: "Its internal temperature is boiling hot. Steam rises from its body when it breaks the surface, and its bite burns." },
        { name: "Crystal Shard Marlin", xp: 300, gold: 174, desc: "A smaller, cave adapted marlin with a bill made of solid, transparent crystal. It fences with its rivals, the clinking sound echoing in the dark." },
        { name: "Silent Stone Ray", xp: 310, gold: 179, desc: "It looks exactly like a flat slab of grey slate. It waits for days without moving, striking only when prey touches its back." }
      ],
      Epic: [
        { name: "Behemoth Geode Turtle", xp: 480, gold: 240, desc: "A massive aquatic turtle whose shell is a cracked geode revealing amethyst crystals inside. It is thousands of years old and nearly indestructible." },
        { name: "Abyssal Maw Eel", xp: 505, gold: 255, desc: "A gigantic eel with a jaw that unhinges to swallow boulders. It digs tunnels through the rock by eating its way through." },
        { name: "Tremor Scale Carp", xp: 530, gold: 270, desc: "It is so heavy that when it bumps into the cave walls, it causes small tremors. It is a juggernaut that breaks light lines instantly." },
        { name: "Glow Worm Serpent", xp: 555, gold: 285, desc: "A massive, worm like serpent that glows with a hypnotic rhythm. It hangs vertically from deep underwater cliffs, waiting for prey." },
        { name: "Petrified Pike", xp: 580, gold: 300, desc: "It looks like a stone statue come to life. Its movement is jerky and grinding, but its strike is surprisingly fast." },
        { name: "Shadow Stalker Shark", xp: 605, gold: 315, desc: "A shark that has lost its eyes and pigment. It hunts by sensing the electrical signals of fear. It is the apex predator of the dark." },
        { name: "Crystal Heart Arapaima", xp: 630, gold: 330, desc: "Its scales are clear, revealing a pulsing, crystalline heart within. It breathes air in the cavern pockets, gasping loudly in the silence." },
        { name: "Magma Blood Gar", xp: 655, gold: 345, desc: "Its veins glow with flowing lava like fluid. It lives in the superheated waters near the earth's core and melts normal hooks." }
      ],
      Legendary: [
        { name: "Blind King Catfish", xp: 1080, gold: 540, desc: "A colossal, eyeless catfish with a crown of jagged stalagmites on its head. It rules the deepest cavern and senses everything that enters the water." },
        { name: "Gem Hoarder Crab", xp: 1130, gold: 570, desc: "A monstrous crab that decorates its shell with precious gems found in the grotto. It glitters in the torchlight and crushes boats with its claws." },
        { name: "Spectral Cave Ray", xp: 1180, gold: 600, desc: "A translucent, ghostly apparition of a ray that glows with a cold blue light. Catching it is said to grant vision in the dark." },
        { name: "Primordial Coelacanth", xp: 1230, gold: 630, desc: "A creature that should have gone extinct eons ago. Its armored plates are thick enough to deflect spears. It carries the secrets of the prehistoric world." },
        { name: "Obsidian Blade Swordfish", xp: 1280, gold: 660, desc: "Its bill is a single, flawless piece of obsidian, sharpened to a molecular edge. It cuts through the water without resistance." }
      ],
      Mythic: [
        { name: "Chasm Lord Kraken", xp: 2640, gold: 1320, desc: "A kraken adapted to the tight confines of the cave. Its tentacles are covered in rock hard hooks to grip the walls. It drags prey into the crushing depths." },
        { name: "Rock Eater Serpent", xp: 2740, gold: 1370, desc: "A massive serpent that literally consumes the stone to expand the caverns. Its digestive system burns with acid, and its scales are diamond hard." },
        { name: "Cave Mother Hydra", xp: 2840, gold: 1420, desc: "A pale hydra with regenerating heads that inhabits the largest underground lake. It is the source of the glowing moss that lights the grotto." },
        { name: "Crystal Liquid Drake", xp: 2940, gold: 1470, desc: "A drake made of clear, viscous fluid that holds its shape through magic. It is hard to see until it moves, rippling like a disturbed pool." },
        { name: "Magma Dive Wyrm", xp: 3040, gold: 1520, desc: "A wyrm that swims effortlessly between water and molten rock. It brings the heat of the earth's core with it, boiling the water around it." }
      ],
      Exotic: [
        { name: "Luminous Titan Squid", xp: 8400, gold: 4200, desc: "A gargantuan squid of pure light. It pulses with complex patterns that look like a language. It is the sun of this underground world." },
        { name: "Void Carapace Crab", xp: 8900, gold: 4450, desc: "A crab with a shell made of black stone and binding magic. It does not breathe or tire. It relentlessly pursues intruders." },
        { name: "Prismatic Glass Ray", xp: 9400, gold: 4700, desc: "A geometric ray of shifting glass that refracts darkness into color. It defies the laws of physics, teleporting short distances when threatened." }
      ],
      Arcane: [
        { name: "Core Dweller Leviathan", xp: 42000, gold: 24000, desc: "A primal leviathan made of water so pressurized it acts like a solid. It guards the path to the center of the earth. It is the weight of the world given form." }
      ]
    }
  },
  6: {
    name: "Frosthollow Fjord",
    unlockLevel: 100,
    unlockGold: 250000,
    boatRequired: null,
    boatPrice: 0,
    description: "Emerging from the darkness, the river spills out into a blindingly white fjord carved by ancient glaciers. Frosthollow Fjord is a silent, frozen world where massive icebergs drift like floating mountains. The water is dangerously cold, instantly numbing to the touch. Fish here are slow growing but massive, relying on thick layers of fat and antifreeze proteins to survive the sub zero temperatures.",
    fish: {
      Common: [
        { name: "Glacier Blue Cod", xp: 25, gold: 12, desc: "Its scales are a pale, icy blue that matches the submerged glacial ice. It swims slowly near the bottom, scavenging for frozen scraps." },
        { name: "Snow Crab Goby", xp: 27, gold: 13, desc: "A small fish with a hard, white shell resembling a crab. It hides in the crevices of icebergs, scuttling away when shadows pass." },
        { name: "Frost Fin Capelin", xp: 29, gold: 14, desc: "Small, silver fish that school in the thousands. Their fins are rigid and sharp, cutting through the slushy surface water." },
        { name: "Icicle Tooth Flounder", xp: 31, gold: 15, desc: "Flat and white, it blends perfectly with the snowy seabed. Its teeth are clear and needle like, resembling tiny hanging icicles." },
        { name: "Slush Back Sculpin", xp: 33, gold: 16, desc: "Its back is bumpy and textured like melting slush. It relies on this camouflage to ambush prey in the shallow, freezing bays." },
        { name: "Arctic Wind Smelt", xp: 35, gold: 17, desc: "Known to leap out of the water during blizzards. Locals say they ride the arctic winds to travel between ice floes." },
        { name: "Polar Night Herring", xp: 37, gold: 18, desc: "Black as the winter night, with a single bioluminescent strip. It only surfaces during the months of perpetual darkness." },
        { name: "Deep Freeze Dace", xp: 39, gold: 19, desc: "It can survive being frozen solid in ice blocks for weeks. When the ice melts, it swims away as if nothing happened." },
        { name: "Aurora Scale Minnow", xp: 41, gold: 20, desc: "Its scales reflect the shifting greens and purples of the northern lights. Seeing a school is considered a good omen." },
        { name: "Tundra Moss Chub", xp: 43, gold: 21, desc: "It feeds on the hardy moss that grows on submerged rocks. Its skin is thick and leathery to retain heat." },
        { name: "Ice Shard Tetra", xp: 45, gold: 22, desc: "A angular fish that looks like a broken piece of ice. It swims with jerky, mechanical movements." },
        { name: "Blizzard Born Bleak", xp: 47, gold: 23, desc: "White with grey speckles, mimicking a heavy snowfall. It becomes hyper active during snowstorms." }
      ],
      Uncommon: [
        { name: "Crystal Horn Narwhal Fish", xp: 62, gold: 37, desc: "A fish with a single, spiraling bone protrusion on its head. It uses it to break thin ice to breathe." },
        { name: "Velvet Seal Bass", xp: 65, gold: 39, desc: "Its skin is fur like and waterproof, resembling a seal's coat. It is playful and often splashes water at anglers." },
        { name: "Frozen Heart Salmon", xp: 68, gold: 41, desc: "Its gills are a deep, freezing blue. It migrates upstream through waterfalls that are partially frozen solid." },
        { name: "Ice Breaker Pike", xp: 71, gold: 43, desc: "Its skull is reinforced with bone plates. It rams into ice sheets from below to knock resting birds into the water." },
        { name: "Glacial Green Grayling", xp: 74, gold: 45, desc: "Its dorsal fin is huge and colored like glacial meltwater. It flares the fin to absorb weak sunlight." },
        { name: "Snow Drift Ray", xp: 77, gold: 47, desc: "A white ray that buries itself in snow covered sand. It waits for crabs to walk over it before striking." },
        { name: "Winter Wolf Catfish", xp: 80, gold: 49, desc: "Grey and shaggy, it hunts in packs like wolves. Its howl is a low, grinding sound made by grinding its teeth." },
        { name: "Permafrost Eel", xp: 83, gold: 51, desc: "It burrows into the permanently frozen mud of the riverbanks. It moves sluggishly but has a vice like grip." },
        { name: "Sub Zero Snapper", xp: 86, gold: 53, desc: "Its bite feels like liquid nitrogen. It hunts the coldest, deepest trenches of the fjord." },
        { name: "White Out Whiting", xp: 89, gold: 55, desc: "It releases a cloud of white, milk like substance to escape predators. In the milky water, it is invisible." }
      ],
      Fine: [
        { name: "Diamond Dust Trout", xp: 125, gold: 75, desc: "Its scales sparkle like diamond dust in the sun. It is a fast swimmer, leaving a glittering trail behind it." },
        { name: "Mammoth Tusk Sturgeon", xp: 130, gold: 80, desc: "It has two curved barbels that look like tusks. It is an ancient species that survived the last ice age." },
        { name: "Saber Tooth Char", xp: 135, gold: 85, desc: "It possesses two long, sharp fangs. It uses them to grip slippery prey like squid in the freezing water." },
        { name: "Blue Ice Barracuda", xp: 140, gold: 90, desc: "Its body is translucent blue, hard to distinguish from the water. It strikes with chilling speed." },
        { name: "Hail Stone Bass", xp: 145, gold: 95, desc: "Its skin is covered in hard, round bumps like hail. It is heavy and hits the bait with a solid, jarring impact." },
        { name: "Polar Bear Grouper", xp: 150, gold: 100, desc: "White, massive, and powerful. It is the dominant predator of the reef, fearing nothing." },
        { name: "Frost Fire Salmon", xp: 155, gold: 105, desc: "A rare variant with a streak of bright orange. It represents the heat of life persisting in the cold." },
        { name: "Glacial Current Eel", xp: 160, gold: 110, desc: "It rides the freezing currents deep underwater. It is almost never seen near the surface." }
      ],
      Rare: [
        { name: "Ancient Ice Coelacanth", xp: 250, gold: 150, desc: "A prehistoric fish encased in natural armor. It moves slowly, as if time itself has frozen around it." },
        { name: "Cryo Stasis Carp", xp: 260, gold: 155, desc: "It can freeze itself completely to survive starvation. Catching one wakes it from a decade long slumber." },
        { name: "Ghost Walker Ray", xp: 270, gold: 160, desc: "Transparent and pale, it glides through the water like a cold breeze. It leaves a trail of frost on the line." },
        { name: "Obsidian Ice Swordfish", xp: 280, gold: 165, desc: "Its bill is black volcanic glass, contrasting with its white body. A remnant of a time when fire met ice." },
        { name: "Avalanche Caller Drum", xp: 290, gold: 170, desc: "Its booming call can trigger snowslides on the cliffs above. Anglers must be silent when hunting it." },
        { name: "Frost Bite Shark", xp: 300, gold: 175, desc: "A small shark with blue lips and gums. Its bite causes the wound to freeze instantly, preventing bleeding." },
        { name: "Glacier Heart Sunfish", xp: 310, gold: 180, desc: "A round fish with a core of solid blue ice visible through its skin. It radiates cold." },
        { name: "Snow Blind Marlin", xp: 320, gold: 185, desc: "It has no eyes, navigating solely by sensing temperature changes. It hunts thermal pockets." }
      ],
      Epic: [
        { name: "Titan Iceberg Sunfish", xp: 500, gold: 250, desc: "A sunfish so large and white it is often mistaken for a small iceberg. It basks on the surface, absorbing faint heat." },
        { name: "Eternal Winter Eel", xp: 525, gold: 265, desc: "An eel that never stops growing. Legend says it will one day encircle the entire fjord." },
        { name: "Blizzard Beast Gar", xp: 550, gold: 280, desc: "Its scales are jagged ice shards. It thrashes wildly, creating a spray of ice and water." },
        { name: "Frozen Void Shark", xp: 575, gold: 295, desc: "A shark blacker than the polar night. It hunts in the deepest trenches where light never reaches." },
        { name: "Aurora Borealis Bass", xp: 600, gold: 310, desc: "Its scales shift colors constantly, mimicking the northern lights. It is blindingly beautiful and hard to focus on." },
        { name: "Glacial Wall Sturgeon", xp: 625, gold: 325, desc: "Its side plates are like stone walls covered in frost. It is an immovable object in the water." },
        { name: "Frost Drake Trout", xp: 650, gold: 340, desc: "It has a dragon like head and breathes a mist of cold air when surfaced. A fierce fighter." },
        { name: "Absolute Zero Ray", xp: 675, gold: 355, desc: "The water freezes around it as it swims. It leaves a tunnel of ice in its wake." }
      ],
      Legendary: [
        { name: "The Ice Queen Koi", xp: 1125, gold: 562, desc: "A koi of pure, crystalline white with sapphire eyes. It rules the frozen ponds with regal grace." },
        { name: "Glacier Breaker Whale", xp: 1175, gold: 592, desc: "A small whale with a reinforced skull used to shatter thick ice sheets. It breaches with immense power." },
        { name: "White Walker Pike", xp: 1225, gold: 622, desc: "A fish made of wind and snow compacted into flesh. It has no solid form, only the feeling of biting cold." },
        { name: "Ancient Mammoth Fish", xp: 1275, gold: 652, desc: "A fish covered in thick, brown fur. It is a relic from a warmer age that adapted to the cold." },
        { name: "Frost Star Starfish", xp: 1325, gold: 682, desc: "A starfish like creature that glows with the intensity of a dying star. It is cold to the touch but bright enough to blind." }
      ],
      Mythic: [
        { name: "Hydra of the Floes", xp: 2750, gold: 1375, desc: "A multi headed serpent made of blue ice. If one head shatters, two more grow from the freezing mist." },
        { name: "Abominable Snow Shark", xp: 2850, gold: 1425, desc: "A shark covered in white fur, adapted for hunting in both water and on ice floes. It is the apex predator of the north." },
        { name: "Glacial Serpent Jormun", xp: 2950, gold: 1475, desc: "A massive snake that wraps itself around the base of icebergs. Its movement causes the ice to calve and crash." },
        { name: "Frost Titan Turtle", xp: 3050, gold: 1525, desc: "A turtle whose shell is a literal glacier. It sleeps for centuries, drifting with the currents." },
        { name: "Blizzard Caller Siren", xp: 3150, gold: 1575, desc: "A fish with a haunting, human like face. Its song summons blinding snowstorms to hide it from anglers." }
      ],
      Exotic: [
        { name: "Cryo Plume Ray", xp: 8750, gold: 4375, desc: "A ray with wings that look like frozen feathers. It freezes what it touches instantly." },
        { name: "Abyssal Ice Drake", xp: 9250, gold: 4625, desc: "A drake made of black ice and dark matter. It swims through the void between icebergs." },
        { name: "Glacial Prison Leviathan", xp: 9750, gold: 4875, desc: "A leviathan that exists in a bubble of slowed time. It moves impossibly slow, but strikes faster than the eye can see." }
      ],
      Arcane: [
        { name: "The Absolute Zero Shark", xp: 43750, gold: 25000, desc: "A shark made of vacuum and entropy. It feeds on heat, leaving only ice behind. Catching it is holding the cold death of the universe." }
      ]
    }
  },
  7: {
    name: "Verdant Canopy River",
    unlockLevel: 150,
    unlockGold: 500000,
    boatRequired: null,
    boatPrice: 0,
    description: "The frozen river thaws rapidly as it descends into a humid, prehistoric basin. The Verdant Canopy River is a choking maze of giant roots, hanging vines, and murky green water. The air buzzes with giant insects, and the water teems with aggressive, colorful life. This is a place of rampant growth and deadly predators, where fish have evolved to be fast, camouflaged, or heavily armed.",
    fish: {
      Common: [
        { name: "Vine Green Tetra", xp: 26, gold: 13, desc: "Its body mimics a submerged leaf. It drifts sideways to blend in with falling foliage." },
        { name: "Mud Slinger Goby", xp: 28, gold: 14, desc: "It spits balls of mud at insects on low hanging branches to knock them into the water." },
        { name: "Root Runner Barb", xp: 30, gold: 15, desc: "A slender fish that weaves through the tangled root systems at high speed. It is nearly impossible to net." },
        { name: "Canopy Shadow Catfish", xp: 32, gold: 16, desc: "Dark green on top, pale underneath. It swims upside down along the surface to feed on floating debris." },
        { name: "Neon Stripe Rasbora", xp: 34, gold: 17, desc: "A tiny fish with a glowing neon red stripe. In the murky water, the stripe is often the only thing visible." },
        { name: "Piranha Tooth Fry", xp: 36, gold: 18, desc: "Even as a baby, it has a mouth full of sharp teeth. It attacks bait with a ferocity that belies its size." },
        { name: "Moss Back Chub", xp: 38, gold: 19, desc: "Algae grows so thick on its back it looks like a swimming rock. It stays perfectly still until prey wanders close." },
        { name: "Jungle Rain Guppy", xp: 40, gold: 20, desc: "Its tail is patterned like raindrops on water. It is most active during the daily tropical downpours." },
        { name: "Swamp Gas Danio", xp: 42, gold: 21, desc: "It gulps air at the surface and releases bubbles. It thrives in the low oxygen, stagnant pools." },
        { name: "Orchid Fin Betta", xp: 44, gold: 22, desc: "Its fins are shaped and colored like vibrant orchid petals. It uses them to attract mates and confuse predators." },
        { name: "Bark Skin Pleco", xp: 46, gold: 23, desc: "Its armored scales look exactly like rotting wood. It clings to sunken logs, cleaning them of algae." },
        { name: "Hummingbird Fish", xp: 48, gold: 24, desc: "A tiny fish that hovers in the water, beating its fins at a blur. It darts from flower to flower that dips into the river." }
      ],
      Uncommon: [
        { name: "Emerald Scale Arowana", xp: 65, gold: 39, desc: "A surface hunter with large, upward facing scales. It leaps feet into the air to snag birds and frogs." },
        { name: "Tiger Stripe Bass", xp: 68, gold: 41, desc: "Marked with bold orange and black stripes. It is an ambush predator that hides in the tall reeds." },
        { name: "Poison Dart Tetra", xp: 71, gold: 43, desc: "Bright blue and dangerously toxic. Predators learn quickly to avoid its vibrant warning colors." },
        { name: "Jungle Razor Ray", xp: 74, gold: 45, desc: "A camouflaged ray with serrated fins sharp as prehistoric ferns. It lies flat beneath floating leaves, slashing at passing prey with sudden lateral strikes." },
        { name: "Jungle Drum Catfish", xp: 77, gold: 47, desc: "It produces a loud thumping sound by vibrating its swim bladder. The sound carries for miles through the water." },
        { name: "Viper Head Snakehead", xp: 80, gold: 49, desc: "An invasive, aggressive predator that can crawl on land for short distances. It eats anything that fits in its mouth." },
        { name: "Electric Vine Eel", xp: 83, gold: 51, desc: "A thin, green eel that looks like a vine. It delivers a stunning shock to anything that brushes against it." },
        { name: "Beetle Shell Carp", xp: 86, gold: 53, desc: "Its scales are iridescent and hard like beetle wings. It crunches on hard nuts and seeds that fall into the river." },
        { name: "Monsoon River Trout", xp: 89, gold: 55, desc: "It arrives with the floodwaters. It is incredibly strong, built to swim against the raging currents of the rainy season." },
        { name: "Ghost Orchid Loach", xp: 92, gold: 57, desc: "Pale and delicate, it lives in the roots of submerged orchids. It is rarely seen and highly prized." }
      ],
      Fine: [
        { name: "Ruby Eye Piranha", xp: 130, gold: 78, desc: "Its eyes glow a sinister red. It hunts in packs, stripping large prey to the bone in minutes." },
        { name: "Golden Lotus Carp", xp: 135, gold: 83, desc: "A beautiful gold fish that rests under lotus flowers. It is considered a symbol of purity in the muddy swamp." },
        { name: "Iron Wood Gar", xp: 140, gold: 88, desc: "Its scales are as hard as ironwood. Spears and hooks often bounce right off its flank." },
        { name: "Butterfly Wing Bass", xp: 145, gold: 93, desc: "Its large pectoral fins are patterned like monarch butterfly wings. It glides through the air for short distances when jumping." },
        { name: "Shadow Stalker Pike", xp: 150, gold: 98, desc: "Black and silent, it hunts in the darkest shadows of the canopy. It strikes without warning." },
        { name: "Sun Spot Cichlid", xp: 155, gold: 103, desc: "It has a large yellow spot on its side that looks like a sunbeam. It is fiercely territorial and attacks its own reflection." },
        { name: "Thorn Back Ray", xp: 160, gold: 108, desc: "Its back is covered in sharp, poisonous thorns. Wading anglers must shuffle their feet to avoid stepping on it." },
        { name: "Screaming Catfish", xp: 165, gold: 113, desc: "When pulled from the water, it makes a high pitched screeching sound. It is unsettling and startling." }
      ],
      Rare: [
        { name: "Ancient Swamp Arapaima", xp: 260, gold: 156, desc: "A massive, air breathing dinosaur of a fish. Its scales are red tipped and armor plated. It dominates the river." },
        { name: "Jaguar Pattern Catfish", xp: 270, gold: 161, desc: "Its skin is marked with rosettes like a jaguar. It is a stealthy night hunter that stalks the shallows." },
        { name: "Ghost Vine Eel", xp: 280, gold: 166, desc: "A transparent eel with green veins. It is said to be the spirit of the jungle forest given form." },
        { name: "Blood Red Pacu", xp: 290, gold: 171, desc: "A vegetarian fish with human like teeth. This rare variant is deep red and rumored to have a taste for meat." },
        { name: "Carved Log Pike", xp: 300, gold: 176, desc: "A long, vertical swimming fish with markings that look like carved wood. It holds perfectly still, mimicking a wooden post." },
        { name: "Emerald Fire Tetra", xp: 310, gold: 181, desc: "A large tetra that glows with an internal green fire. It lights up the murky depths of the swamp." },
        { name: "Goliath Tiger Fish", xp: 320, gold: 186, desc: "A terrifying predator with interlocking, dagger like teeth. It attacks things larger than itself out of pure aggression." },
        { name: "Venom Spine Bass", xp: 330, gold: 191, desc: "Its spines carry a potent neurotoxin. Handling it requires extreme care and heavy gloves." }
      ],
      Epic: [
        { name: "Titan Root Catfish", xp: 520, gold: 260, desc: "A catfish that looks like a massive, gnarled tree stump. It lies on the bottom and swallows anything that swims near its mouth." },
        { name: "King Cobra Snakehead", xp: 545, gold: 275, desc: "The largest of its kind, with a hood it flares when angry. It strikes with the speed of a snake." },
        { name: "Swamp Thing Gar", xp: 570, gold: 290, desc: "Covered in algae and hanging moss, it is indistinguishable from floating debris. It is the ultimate ambush predator." },
        { name: "Thunder Voice Catfish", xp: 595, gold: 305, desc: "Its croak is so loud it shakes the boat. It uses sound to stun small fish before eating them." },
        { name: "Living Log Sturgeon", xp: 620, gold: 320, desc: "Its back is brown and rough like bark. Birds often land on it when it surfaces, mistaking it for a log." },
        { name: "Crimson Tide Piranha", xp: 645, gold: 335, desc: "A solitary giant piranha. It is said that a single drop of blood in the water summons it from miles away." },
        { name: "Forest Guardian Carp", xp: 670, gold: 350, desc: "An ancient carp with moss growing in patterns of runes. It protects the sacred parts of the river." },
        { name: "Eclipse Sunfish", xp: 695, gold: 365, desc: "A round, black fish with a rim of gold light. It blocks the sun when it surfaces, creating a momentary eclipse." }
      ],
      Legendary: [
        { name: "The Green Man", xp: 1170, gold: 585, desc: "A fish with a face that looks disturbingly human and foliage like fins. It watches anglers with ancient, knowing eyes." },
        { name: "River God Arapaima", xp: 1220, gold: 615, desc: "A fish so large it creates its own currents. Indigenous legends say it carries the world on its back." },
        { name: "Phantom Rain Ray", xp: 1270, gold: 645, desc: "A glowing, ethereal entity that takes the form of a stingray. It heals the waters it swims through." },
        { name: "Golden Jaguar Shark", xp: 1320, gold: 675, desc: "A freshwater shark with gold scales and jaguar spots. It is a relentless hunter that never gives up a chase." },
        { name: "Golden Idol Carp", xp: 1370, gold: 705, desc: "A golden fish shaped like a forgotten artifact. It brings immense wealth but terrible luck to those who catch it." }
      ],
      Mythic: [
        { name: "Swamp Titan Anaconda", xp: 2860, gold: 1430, desc: "A massive snake like creature that rules the jungle waterways. It wraps its body around prey and crushes them instantly." },
        { name: "Hydra of the Swamp", xp: 2960, gold: 1480, desc: "A multi headed beast that lurks in the deepest mud. Its breath is a cloud of poisonous gas." },
        { name: "Guardian Behemoth Hippo", xp: 3060, gold: 1530, desc: "Not a fish, but a mythical aquatic guardian. A massive hippo with armor of gold and jade. It charges with the force of an avalanche." },
        { name: "Emerald Dragon Turtle", xp: 3160, gold: 1580, desc: "A giant turtle with a shell made of raw emerald. It breathes scalding steam." },
        { name: "Siren of the Lily", xp: 3260, gold: 1630, desc: "A beautiful creature that hides inside a giant water lily. It lures anglers with the scent of sweet nectar." }
      ],
      Exotic: [
        { name: "Solar Scale Arowana", xp: 9100, gold: 4550, desc: "An arowana that burns with the intensity of the sun. It leaps from the water to catch birds, leaving a trail of fire in the air." },
        { name: "Abyssal Root Eel", xp: 9600, gold: 4800, desc: "An eel made of darkness and void energy. It burrows through the fabric of reality, appearing and disappearing at will." },
        { name: "Ancient Swamp Plesiosaur", xp: 10100, gold: 5050, desc: "A literal aquatic dinosaur, preserved by the magic of the valley. It is a living relic of a bygone era." }
      ],
      Arcane: [
        { name: "The Jungle Soul Ray", xp: 45500, gold: 26000, desc: "A massive, pulsing ray at the center of the jungle. It is the heart of nature itself. Catching it is to hold the pulse of the world." }
      ]
    }
  },
  8: {
    name: "Obsidian Flow River",
    unlockLevel: 200,
    unlockGold: 750000,
    boatRequired: null,
    boatPrice: 0,
    description: "Leaving the jungle, the river enters a volcanic wasteland of black basalt and active vents. The Obsidian Flow River steams and hisses, its waters heated by magma chambers just beneath the riverbed. The air smells of sulfur and ash. The fish here are encased in heat resistant scales or obsidian armor, thriving in temperatures that would boil normal life.",
    fish: {
      Common: [
        { name: "Ash Grey Minnow", xp: 27, gold: 13, desc: "Covered in a layer of soot like mucus. It blends in with the falling ash that coats the river surface." },
        { name: "Basalt Biter Goby", xp: 29, gold: 14, desc: "Its teeth are hard enough to chew through volcanic rock to find worms. It lives in cooling lava tubes." },
        { name: "Ember Tail Tetra", xp: 31, gold: 15, desc: "Its tail glows with a faint, pulsing red light, looking like a dying ember. Large schools resemble a drifting fire." },
        { name: "Sulfur Fin Barb", xp: 33, gold: 16, desc: "Bright yellow fins warn predators of its terrible taste. It accumulates sulfur in its body from the vents." },
        { name: "Obsidian Chip Fry", xp: 35, gold: 17, desc: "Shiny, black, and sharp. Handling a handful of them is like holding broken glass." },
        { name: "Steam Breather Betta", xp: 37, gold: 18, desc: "It builds bubble nests in the steam clouds above the water. It can tolerate boiling temperatures for short periods." },
        { name: "Magma Vein Dace", xp: 39, gold: 19, desc: "Red lines run along its body like flowing lava. It becomes more active as the water temperature rises." },
        { name: "Coal Scale Chub", xp: 41, gold: 20, desc: "Its scales look like lumps of anthracite coal. It is heavy and sinks quickly to the bottom." },
        { name: "Smoke Screen Danio", xp: 43, gold: 21, desc: "It releases a cloud of dark ink that looks like smoke. It uses this to escape predators in the clear patches of water." },
        { name: "Iron Sand Flounder", xp: 45, gold: 22, desc: "It buries itself in the black, magnetic sand. It is often attracted to the magnets on fishing gear." },
        { name: "Vent Crawler Loach", xp: 47, gold: 23, desc: "It uses suction cups to crawl right up to the edge of thermal vents. It eats the bacteria mats that grow there." },
        { name: "Pumice Stone Floater", xp: 49, gold: 24, desc: "Its body is full of air pockets, making it buoyant. It floats on the surface like a piece of pumice." }
      ],
      Uncommon: [
        { name: "Lava Rock Bass", xp: 67, gold: 40, desc: "Its skin is rough and pitted like lava rock. It is incredibly tough and abrasive to the touch." },
        { name: "Fire Eye Snapper", xp: 70, gold: 42, desc: "Its eyes burn with an internal orange light. It hunts in the gloom of the ash clouds." },
        { name: "Obsidian Blade Pike", xp: 73, gold: 44, desc: "A sleek, black predator with teeth like obsidian daggers. It slices through the water silently." },
        { name: "Thermal Current Ray", xp: 76, gold: 46, desc: "It rides the rising columns of superheated water. Its wings are wide to catch the thermal updrafts." },
        { name: "Soot Whisker Catfish", xp: 79, gold: 48, desc: "Black from tip to tail. It sifts through the ash deposits on the riverbed for food." },
        { name: "Flare Fin Perch", xp: 82, gold: 50, desc: "Its fins are red and orange, looking like flickering flames. When agitated, the colors brighten intensely." },
        { name: "Molten Core Carp", xp: 85, gold: 52, desc: "Its belly glows a dull red, radiating heat. Fishermen use them as hand warmers on cold nights." },
        { name: "Slag Scale Gar", xp: 88, gold: 54, desc: "Its armor looks like industrial slag waste. It is heavy, ugly, and mean." },
        { name: "Volcano Eel", xp: 91, gold: 56, desc: "A red eel that lives inside the intricate tunnels of the lava flows. It bites with a burning venom." },
        { name: "Ash Cloud Trout", xp: 94, gold: 58, desc: "Grey and ghostly, it appears and disappears in the sediment clouds. It tastes smoky." }
      ],
      Fine: [
        { name: "Burning Coal Piranha", xp: 135, gold: 81, desc: "A piranha with scales that glow like hot coals. Its bite cauterizes the wound instantly." },
        { name: "Glass Armor Sturgeon", xp: 140, gold: 86, desc: "Its bony plates have fused into solid sheets of volcanic glass. It is a swimming tank." },
        { name: "Red Hot Chili Barb", xp: 145, gold: 91, desc: "Small, bright red, and incredibly spicy if eaten. Predators learn to avoid it after one bite." },
        { name: "Inferno Mouth Bass", xp: 150, gold: 96, desc: "The inside of its mouth is a bright, warning red. It opens its jaws to intimidate rivals." },
        { name: "Magma Burst Salmon", xp: 155, gold: 101, desc: "It leaps through steam vents, its wet skin protecting it from the heat. It is born in fire." },
        { name: "Onyx Fin Shark", xp: 160, gold: 106, desc: "A freshwater shark adapted to the river. Its black fins cut the surface like knives." },
        { name: "Geyser Jumper Trout", xp: 165, gold: 111, desc: "It waits for geysers to erupt and rides the column of water into the air to catch birds." },
        { name: "Dragon Scale Betta", xp: 170, gold: 116, desc: "A massive betta with metallic, armored scales. It fights with the ferocity of a dragon." }
      ],
      Rare: [
        { name: "Flame Plume Barb", xp: 270, gold: 162, desc: "Its fins look like burning feathers. It is said to be reborn from its own eggs if it dies." },
        { name: "Living Lava Eel", xp: 280, gold: 167, desc: "Its body is made of semi solid magma held together by a magnetic field. It burns anything it touches." },
        { name: "Obsidian Mirror Carp", xp: 290, gold: 172, desc: "Its scales are perfectly reflective black mirrors. Looking at it reflects your own soul's darkness." },
        { name: "Vent Guardian Grouper", xp: 300, gold: 177, desc: "It sits directly on top of thermal vents, bathing in the heat. Its skin is thick and callous." },
        { name: "Ash Titan Catfish", xp: 310, gold: 182, desc: "A grey giant that blends in with the ash banks. When it moves, it kicks up a cloud that chokes the water." },
        { name: "Fire Storm Pike", xp: 320, gold: 187, desc: "Red lightning crackles around its jaws. It strikes with the speed and heat of a lightning bolt." },
        { name: "Molten Gold Dorado", xp: 330, gold: 192, desc: "A dorado that looks like it was cast from liquid gold. It is heavy, valuable, and incredibly strong." },
        { name: "Cinder Block Turtle", xp: 340, gold: 197, desc: "A turtle with a shell like a block of burnt stone. It snaps jaws capable of crushing steel." }
      ],
      Epic: [
        { name: "Behemoth Magma Ray", xp: 540, gold: 270, desc: "A ray with a wingspan of flowing lava. It glides through the water, leaving a boiling wake." },
        { name: "Volcanic Glass Gar", xp: 565, gold: 285, desc: "Sharp, brittle, and dangerous. It shatters when it hits the boat, sending razor sharp shards everywhere." },
        { name: "Hell Fire Arapaima", xp: 590, gold: 300, desc: "Black scales with red glowing edges. It breathes fire (or superheated steam) when it surfaces." },
        { name: "Sulfur Cloud Shark", xp: 615, gold: 315, desc: "A yellow hued shark that hunts in toxic sulfur clouds. It is immune to poisons and bad air." },
        { name: "Core Driller Eel", xp: 640, gold: 330, desc: "Its head is a spinning bone drill. It bores into the rock to release fresh lava." },
        { name: "Eruption Caller Drum", xp: 665, gold: 345, desc: "Its drumming beat is said to trigger volcanic eruptions. Locals beg anglers not to catch it." },
        { name: "Obsidian Monolith Sturgeon", xp: 690, gold: 360, desc: "A rectangular, blocky fish that looks like a floating monument. It is ancient and immovable." },
        { name: "Flame Wreathed Bass", xp: 715, gold: 375, desc: "Blue flames dance over its scales underwater. A magical phenomenon that defies explanation." }
      ],
      Legendary: [
        { name: "The Fire King Koi", xp: 1215, gold: 607, desc: "A koi of brilliant red and orange. The water boils around it in a gentle simmer." },
        { name: "Lava Leviathan Whale", xp: 1265, gold: 637, desc: "A whale adapted to swim in lava as well as water. Its skin is charred rock." },
        { name: "Smoke Wraith Eel", xp: 1315, gold: 667, desc: "An eel made of smoke and ash. It has glowing red eyes and disperses when touched." },
        { name: "Ancient Magma Turtle", xp: 1365, gold: 697, desc: "A turtle carrying a miniature volcano on its shell. Smoke constantly rises from its back." },
        { name: "The Burning Blade", xp: 1415, gold: 727, desc: "A swordfish with a bill of pure fire. It cuts through the water, leaving a trail of steam." }
      ],
      Mythic: [
        { name: "Ignis Draco Serpent", xp: 2970, gold: 1485, desc: "A sea serpent made of living fire. It boils the river instantly where it swims." },
        { name: "Obsidian Hydra", xp: 3070, gold: 1535, desc: "A multi headed beast of black glass. When a head is cut off, it shatters into razor shards." },
        { name: "Magma Titan Crab", xp: 3170, gold: 1585, desc: "A crab the size of a house, with claws of molten rock. It builds islands with its discards." },
        { name: "Ash Phoenix Ray", xp: 3270, gold: 1635, desc: "A ray that rises from the ashes of the riverbed. It flies through the air on wings of grey smoke." },
        { name: "Volcano Heart Salamander", xp: 3370, gold: 1685, desc: "A massive amphibian that sleeps in the crater. Its heartbeat causes the ground to shake." }
      ],
      Exotic: [
        { name: "Fusion Core Puffer", xp: 9450, gold: 4725, desc: "A ball of fusion energy held in a fish shape. It is too bright to look at directly." },
        { name: "Abyssal Flame Shark", xp: 9950, gold: 4975, desc: "A shark of black fire that burns cold. It freezes and burns simultaneously." },
        { name: "Eternal Ember Coelacanth", xp: 10450, gold: 5225, desc: "A fossil that is constantly burning but never consumed. It is stuck in a loop of destruction." }
      ],
      Arcane: [
        { name: "The Cataclysm Eel", xp: 47250, gold: 27000, desc: "A massive eel that embodies destruction. It waits for the end of the world to consume the oceans." }
      ]
    }
  },
  9: {
    name: "Infernal Caldera",
    unlockLevel: 300,
    unlockGold: 1000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The river terminates in a massive, enclosed volcanic crater. The Infernal Caldera is a lake of superheated, acidic water surrounding a central lava spire. The heat here is oppressive, warping the air. Only the most extreme lifeforms survive here, creatures that have blended flesh with elemental fire and rock. The water is a deep, toxic red.",
    fish: {
      Common: [
        { name: "Acid Red Minnow", xp: 28, gold: 14, desc: "Bright red to match the toxic water. It has a protective slime coat that neutralizes acid." },
        { name: "Slag Jaw Goby", xp: 30, gold: 15, desc: "It chews on solidified slag to sharpen its iron teeth. It lives in the cracks of the crater wall." },
        { name: "Fume Breather Tetra", xp: 32, gold: 16, desc: "It gathers near gas vents to inhale toxic fumes, which it uses to make itself poisonous." },
        { name: "Boil Bubble Barb", xp: 34, gold: 17, desc: "Its skin is covered in blisters that release boiling water when popped. Do not squeeze." },
        { name: "Crater Dust Fry", xp: 36, gold: 18, desc: "Tiny, grey fish that swarm like ash clouds. They feed on the dead that fall into the lake." },
        { name: "Iron Oxide Chub", xp: 38, gold: 19, desc: "Rusty orange in color. It eats iron rich rocks and excretes rust dust." },
        { name: "Heat Haze Danio", xp: 40, gold: 20, desc: "Its shimmering scales create a mirage effect, making it look like it's vibrating." },
        { name: "Sulfur Pit Bleak", xp: 42, gold: 21, desc: "Bright yellow and smelly. It lives in the most toxic, sulfur rich corners of the caldera." },
        { name: "Magma Drop Guppy", xp: 44, gold: 22, desc: "It looks like a dripping bead of molten lava. It glows in the dark red water." },
        { name: "Char Skin Pleco", xp: 46, gold: 23, desc: "Black and craggy like charcoal. It scours the bottom for organic matter that hasn't burned up." },
        { name: "Vent Plume Rasbora", xp: 48, gold: 24, desc: "It rides the vertical currents of thermal plumes. It is adapted to rapid pressure changes." },
        { name: "Ash Flake Betta", xp: 50, gold: 25, desc: "Its fins are tattered and grey, looking like falling ash. It is a master of camouflage in the dirty water." }
      ],
      Uncommon: [
        { name: "Lava Lamp Catfish", xp: 70, gold: 42, desc: "Inside its translucent body, blobs of glowing red wax like substance float around. Mesmerizing to watch." },
        { name: "Molten Metal Bass", xp: 73, gold: 44, desc: "It looks like liquid mercury and gold mixed together. It is heavy, dense, and hits hard." },
        { name: "Inferno Scale Snapper", xp: 76, gold: 46, desc: "Every scale is a tiny ember. When it shakes, sparks fly off into the water." },
        { name: "Geode Cracker Ray", xp: 79, gold: 48, desc: "A ray with jaws strong enough to crack geodes open. It eats the crystals inside for minerals." },
        { name: "Pyro Pike", xp: 82, gold: 50, desc: "A pike that is hot to the touch. It hunts by sensing the body heat of other fish." },
        { name: "Blast Furnace Eel", xp: 85, gold: 52, desc: "Its mouth glows white hot like a furnace door. It melts its way through obstacles." },
        { name: "Cinder Cone Carp", xp: 88, gold: 54, desc: "Shaped like a small volcano. It releases a puff of black ink from a dorsal vent when threatened." },
        { name: "Red Devil Trout", xp: 91, gold: 56, desc: "A mutation of trout adapted to hellish conditions. It is aggressive, mean, and fights dirty." },
        { name: "Scorched Earth Gar", xp: 94, gold: 58, desc: "Its scales look like burnt earth. It lies in wait on the barren lake bed." },
        { name: "Heat Wave Loach", xp: 97, gold: 60, desc: "It moves in a sinusoidal wave that mimics heat distortion. It makes the water around it ripple." }
      ],
      Fine: [
        { name: "Liquid Fire Piranha", xp: 140, gold: 84, desc: "A piranha made of viscous orange liquid. It burns as it bites." },
        { name: "Obsidian Shatter Sturgeon", xp: 145, gold: 89, desc: "Its armor is black glass. If it hits a rock, chips fly off, but it instantly regrows them." },
        { name: "Hell Bender Salamander", xp: 150, gold: 94, desc: "A giant aquatic salamander that thrives in boiling water. It has wrinkled, heat shielded skin." },
        { name: "Magma Fin Shark", xp: 155, gold: 99, desc: "A shark with fins of cooling magma. It leaves a trail of steam as it circles." },
        { name: "Volcanic Ash Barracuda", xp: 160, gold: 104, desc: "Grey and silent. It strikes through the ash clouds like a sudden landslide." },
        { name: "Flare Up Flounder", xp: 165, gold: 109, desc: "Usually dull, it flares bright red when attacking. It startles prey into freezing." },
        { name: "Thermal Shock Trevally", xp: 170, gold: 114, desc: "It hunts by dragging prey from cold water into hot plumes, shocking them into submission." },
        { name: "Brimstone Bass", xp: 175, gold: 119, desc: "It smells strongly of sulfur. Demons are said to keep them as pets." }
      ],
      Rare: [
        { name: "Dragon Blood Coelacanth", xp: 280, gold: 168, desc: "Its blood is a potent, magical fuel. It is an ancient creature that has absorbed the dragon magic of the caldera." },
        { name: "Fire Opal Swordfish", xp: 290, gold: 173, desc: "Its bill and scales are made of precious fire opal. It flashes with a kaleidoscope of warm colors." },
        { name: "Magma Dive Marlin", xp: 300, gold: 178, desc: "It leaps high into the air to cool off before diving back into the boiling depths." },
        { name: "Lava Flow Ray", xp: 310, gold: 183, desc: "It looks like a moving patch of lava flow. It burns anything that steps on it." },
        { name: "Cinder Spirit Eel", xp: 320, gold: 188, desc: "An eel made of floating cinders and magic. It is hard to grasp and falls apart in your hands." },
        { name: "Infernal King Crab", xp: 330, gold: 193, desc: "A crab with a crown of spikes. It rules the lake floor with an iron claw." },
        { name: "Boiling Point Tuna", xp: 340, gold: 198, desc: "Its body temperature is constantly at boiling point. It cooks its prey as it eats them." },
        { name: "Smoke Stack Gar", xp: 350, gold: 203, desc: "It has a chimney like structure on its back that vents steam. It looks like a living factory." }
      ],
      Epic: [
        { name: "Titan Obsidian Crab", xp: 560, gold: 280, desc: "A crab the size of a small house, made of solid rock. It opens its claws to crush boulders." },
        { name: "Hell Fire Moray", xp: 585, gold: 295, desc: "A massive moray eel with skin like flowing lava. Its bite injects searing heat." },
        { name: "Caldera Guardian Shark", xp: 610, gold: 310, desc: "A shark that never leaves the crater. It has grown to immense size in the enclosed ecosystem." },
        { name: "Magma Spine Arapaima", xp: 635, gold: 325, desc: "Its spine glows through its scales. It is the dragon of the lake." },
        { name: "Ash Titan Turtle", xp: 660, gold: 340, desc: "A turtle the size of an island. Ash accumulates on its back, forming a small ecosystem." },
        { name: "Pyroclastic Pike", xp: 685, gold: 355, desc: "It moves with the speed and force of a pyroclastic flow. It destroys everything in its path." },
        { name: "Molten Heart Sturgeon", xp: 710, gold: 370, desc: "Its heart beats with the rhythm of the volcano. You can see it pulsing through its chest." },
        { name: "Eruption Trigger Bass", xp: 735, gold: 385, desc: "Catching it causes the water level to rise and bubble furiously. Handle with caution." }
      ],
      Legendary: [
        { name: "The Eternal Ember Koi", xp: 1260, gold: 630, desc: "A legendary koi that bursts into flames when it dies, leaving behind a golden egg. It represents eternal life." },
        { name: "Magma Lord Leviathan", xp: 1310, gold: 660, desc: "A massive creature that swims in the lava tube itself. It only enters the lake to cool down." },
        { name: "Inferno Wraith Ray", xp: 1360, gold: 690, desc: "A ray of pure hate and fire. It tries to drag anglers into the boiling water." },
        { name: "Ancient Lava Drake", xp: 1410, gold: 720, desc: "A flightless drake that swims like a crocodile. Its scales are impenetrable." },
        { name: "The Red Star", xp: 1460, gold: 750, desc: "A starfish that glows with the intensity of a red giant star. It boils the water for meters around it." }
      ],
      Mythic: [
        { name: "Caldera King Kraken", xp: 3080, gold: 1540, desc: "A kraken made of magma and obsidian. Its tentacles can crush rocks into dust." },
        { name: "Fire Storm Serpent", xp: 3180, gold: 1590, desc: "A serpent that summons firestorms. The sky turns red when it surfaces." },
        { name: "Molten Titan Crab", xp: 3280, gold: 1640, desc: "A crab that carries the volcano's heat core on its back. It is the engine of the caldera." },
        { name: "Infernal Dragon Eel", xp: 3380, gold: 1690, desc: "An eel with the head of a dragon. It breathes fire underwater, creating massive steam explosions." },
        { name: "Lava Queen Siren", xp: 3480, gold: 1740, desc: "A creature of beauty and terror. Her song promises warmth but delivers death." }
      ],
      Exotic: [
        { name: "Nova Burst Jellyfish", xp: 9800, gold: 4900, desc: "A jellyfish made of exploding star matter. It is unstable and dangerous." },
        { name: "Abyssal Fire Wyrm", xp: 10300, gold: 5150, desc: "A wyrm that eats light and heat. It leaves a trail of freezing darkness in the lava lake." },
        { name: "Ash Crust Coelacanth", xp: 10800, gold: 5400, desc: "A fossil that crumbles and reforms constantly. It is trapped in a loop of destruction and creation." }
      ],
      Arcane: [
        { name: "The Magma Source Turtle", xp: 49000, gold: 28000, desc: "A colossal turtle with a shell that is the actual heat source of the caldera. Catching it is to wrestle with the earth itself." }
      ]
    }
  },
  10: {
    name: "Primordial Basin",
    unlockLevel: 400,
    unlockGold: 2000000,
    boatRequired: null,
    boatPrice: 0,
    description: "Beyond the fire lies the beginning. The Primordial Basin is a hidden, subterranean ocean where the timeline is broken. Dinosaurs still roam the shores, and the water teems with life from the dawn of creation. The environment is a chaotic mix of jungle, ice, and fire, representing the raw, untamed state of the early world. Here, the fish are monsters, and the angler is the prey.",
    fish: {
      Common: [
        { name: "Proto Minnow", xp: 29, gold: 14, desc: "The ancestor of all minnows. It is larger, uglier, and has primitive, armored scales." },
        { name: "Trilobite Goby", xp: 31, gold: 15, desc: "A bottom dweller that looks more like a bug than a fish. It scuttles across the sediment." },
        { name: "Devonian Tetra", xp: 33, gold: 16, desc: "A tetra with sharp, bony plates instead of scales. It has remained unchanged for millions of years." },
        { name: "Fern Fin Barb", xp: 35, gold: 17, desc: "Its fins look like ancient fern fronds. It hides in the underwater forests of giant moss." },
        { name: "Amber Eye Fry", xp: 37, gold: 18, desc: "A fry encased in a gel like substance that looks like amber. It is preserved and protected." },
        { name: "Fossil Scale Chub", xp: 39, gold: 19, desc: "Its scales are literally stone fossils. It is heavy, slow, and inedible." },
        { name: "Chaos Current Danio", xp: 41, gold: 20, desc: "It swims in erratic, chaotic patterns that defy physics. It is a glitch in the timeline." },
        { name: "Primordial Ooze Bleak", xp: 43, gold: 21, desc: "It drips with a thick, green slime. Scientists believe this slime is the building block of life." },
        { name: "Dawn Light Guppy", xp: 45, gold: 22, desc: "It glows with the soft, pink light of the first sunrise. It brings hope to the dark basin." },
        { name: "Raptor Claw Pleco", xp: 47, gold: 23, desc: "Its pectoral fins are shaped like raptor claws. It uses them to dig into the prey." },
        { name: "Spore Cloud Rasbora", xp: 49, gold: 24, desc: "It releases clouds of reproductive spores. It is half plant, half fish." },
        { name: "Evolution Fish", xp: 51, gold: 25, desc: "A fish caught mid evolution. It has rudimentary legs and tries to crawl out of the boat." }
      ],
      Uncommon: [
        { name: "Saber Tooth Bass", xp: 72, gold: 43, desc: "A bass with two massive fangs. It hunts like a prehistoric cat." },
        { name: "Armored Pike", xp: 75, gold: 45, desc: "Covered in heavy bone plates. It is a swimming tank from the age of armored fish." },
        { name: "Titan Insect Larva", xp: 78, gold: 47, desc: "The aquatic larva of a giant prehistoric dragonfly. It is huge, predatory, and ugly." },
        { name: "Dino Scale Carp", xp: 81, gold: 49, desc: "Its scales are the size of dinner plates and rough like dinosaur skin." },
        { name: "Meteor Strike Trout", xp: 84, gold: 51, desc: "It hits the bait with the impact of a falling meteor. It is fast, heavy, and destructive." },
        { name: "Volcano Ash Eel", xp: 87, gold: 53, desc: "Grey and dusty. It remembers the great extinction events and hides in the mud." },
        { name: "Ice Age Char", xp: 90, gold: 55, desc: "A relic from the freezing times. It seeks out the coldest pockets of the basin." },
        { name: "Jungle Giant Snapper", xp: 93, gold: 57, desc: "Green and massive. It eats the fruit that falls from the giant primordial trees." },
        { name: "Bone Head Mullet", xp: 96, gold: 59, desc: "Its head is a solid dome of bone. It headbutts rivals and obstacles." },
        { name: "Alpha Predator Perch", xp: 99, gold: 61, desc: "It has the attitude of a T Rex. It attacks anything that moves, regardless of size." }
      ],
      Fine: [
        { name: "Megaledon Tooth Piranha", xp: 145, gold: 87, desc: "A huge piranha with teeth like a megalodon. One bite takes a clean chunk out of anything." },
        { name: "Ancient Shield Sturgeon", xp: 150, gold: 92, desc: "Its scutes are massive shields. Indigenous tribes used them for protection." },
        { name: "Velociraptor Gar", xp: 155, gold: 97, desc: "Fast, intelligent, and hunts in packs. It outsmarts the angler." },
        { name: "Pterodactyl Fin Ray", xp: 160, gold: 102, desc: "Its wings look like the leathery wings of a pterosaur. It leaps and glides over the water." },
        { name: "Triceratops Catfish", xp: 165, gold: 107, desc: "It has three horns on its face. It uses them for defense and digging." },
        { name: "Stegosaurus Back Bass", xp: 170, gold: 112, desc: "It has a row of plates down its spine. It is impossible to grab by the back." },
        { name: "Bronto Carp", xp: 175, gold: 117, desc: "Massive, docile, and heavy. It grazes on the underwater forests like a sauropod." },
        { name: "Rex Jaw Trout", xp: 180, gold: 122, desc: "It has a jaw structure similar to a T Rex. Its bite force is crushing." }
      ],
      Rare: [
        { name: "Living Fossil Coelacanth", xp: 290, gold: 174, desc: "The original coelacanth. It has blue scales and moves with a strange, walking gait." },
        { name: "Dunkleosteus Head", xp: 300, gold: 179, desc: "A fish with a head encased in bone shears. It slices prey in half." },
        { name: "Ammonite Shell Squid", xp: 310, gold: 184, desc: "A squid living inside a spiral shell. It is a master of defense." },
        { name: "Sea Scorpion", xp: 320, gold: 189, desc: "A giant eurypterid. It has pincers and a spiked tail. It is a nightmare from the deep." },
        { name: "Mosaic Scale Gar", xp: 330, gold: 194, desc: "Its scales form a perfect mosaic pattern. It is a work of natural art." },
        { name: "Time Rift Marlin", xp: 340, gold: 199, desc: "It swims in and out of time rifts. It flashes out of existence when you try to net it." },
        { name: "Creation Spark Eel", xp: 350, gold: 204, desc: "It carries the spark of creation. It glows with a blinding white light." },
        { name: "Void Star Shark", xp: 360, gold: 209, desc: "A shark with skin like the night sky before stars were born. It is pure emptiness." }
      ],
      Epic: [
        { name: "Titan Dino Grouper", xp: 580, gold: 290, desc: "A grouper the size of a dinosaur. It rules the basin caves." },
        { name: "Behemoth Bone Turtle", xp: 605, gold: 305, desc: "A turtle with a shell made of fossilized bones. It is the graveyard of the sea." },
        { name: "Apex Predator Mosasaur", xp: 630, gold: 320, desc: "A juvenile mosasaur. Even young, it is a deadly hunter." },
        { name: "Leviathan Plesiosaur", xp: 655, gold: 335, desc: "A long necked beast that snatches birds from the air. It is the inspiration for sea monster legends." },
        { name: "Chaos Fin Shark", xp: 680, gold: 350, desc: "A shark with asymmetric fins and constantly shifting teeth. It is a biological abomination." },
        { name: "Primordial Ooze Eel", xp: 705, gold: 365, desc: "An eel made of living slime. It can change shape and squeeze through any gap." },
        { name: "Meteor Heart Carp", xp: 730, gold: 380, desc: "It swallowed a meteor fragment. It glows with cosmic radiation." },
        { name: "Timeless Void Ray", xp: 755, gold: 395, desc: "A ray that exists outside of time. It moves in stop motion jerks." }
      ],
      Legendary: [
        { name: "The First Fish", xp: 1305, gold: 652, desc: "The ancestor of all fish. It is simple, perfect, and powerful." },
        { name: "King Mosasaurus", xp: 1355, gold: 682, desc: "The king of the prehistoric ocean. It eats whales for breakfast." },
        { name: "Shifting Form Eel", xp: 1405, gold: 712, desc: "An eel that changes form constantly. It represents the unstoppable force of life." },
        { name: "Ancient Kraken God", xp: 1455, gold: 742, desc: "A kraken worshipped by early man. It demands sacrifice." },
        { name: "Primeval King Fish", xp: 1505, gold: 772, desc: "A fish marked with the symbols of beginning and end. Catching it feels like closing a book." }
      ],
      Mythic: [
        { name: "Chronos Leviathan", xp: 3190, gold: 1595, desc: "A leviathan that controls the flow of time. It can age you to dust with a look." },
        { name: "Chaos Dragon Serpent", xp: 3290, gold: 1645, desc: "A serpent born from the chaos of creation. It breathes raw magic." },
        { name: "Primordial Titan Turtle", xp: 3390, gold: 1695, desc: "The world turtle. It carries a continent on its back." },
        { name: "Void Genesis Shark", xp: 3490, gold: 1745, desc: "A shark that existed before the universe. It eats reality." },
        { name: "Life Bringer Siren", xp: 3590, gold: 1795, desc: "Her song creates life. Plants grow where she sings. She is the mother of the basin." }
      ],
      Exotic: [
        { name: "Star Birth Jellyfish", xp: 10150, gold: 5075, desc: "A jellyfish made of the explosive energy of the big bang. It is a living supernova." },
        { name: "Void Energy Wyrm", xp: 10650, gold: 5325, desc: "A wyrm that feeds on zero point energy. It flickers in and out of existence." },
        { name: "Eternal Bone Dunkleosteus", xp: 11150, gold: 5575, desc: "A fossil animated by ancient magic. It is immortal and unyielding." }
      ],
      Arcane: [
        { name: "The Infinity Loop Eel", xp: 50750, gold: 29000, desc: "A serpent that exists in all times simultaneously. It knows every cast you will ever make. To catch it is to outsmart destiny." }
      ]
    }
  },
  11: {
    name: "The Drowned Harbor",
    unlockLevel: 500,
    unlockGold: 3000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The river widens into a colossal, enclosed cavern that once served as the port for an ancient underground empire. The Drowned Harbor is a maze of rotting wooden piers, rusted iron chains, and the skeletal remains of merchant ships. The water is murky with rust and silt. Fish here are scavengers and ambush predators, hiding in crates and barrels to strike at the unwary.",
    fish: {
      Common: [
        { name: "Rust Flake Minnow", xp: 30, gold: 15, desc: "Its scales are colored exactly like corroded iron. It feeds on the algae growing on sunken chains." },
        { name: "Barrel Hider Goby", xp: 32, gold: 16, desc: "A small fish that claims rotting barrels as territory. It peeks out from the bungholes to watch for food." },
        { name: "Anchor Weight Chub", xp: 34, gold: 17, desc: "Heavy and grey, it sinks quickly to the bottom. It mimics the look of a discarded lead weight." },
        { name: "Plank Mimic Flounder", xp: 36, gold: 18, desc: "Its back has the texture of waterlogged wood grain. It lies flat on sunken decks, invisible to the naked eye." },
        { name: "Chain Link Eel", xp: 38, gold: 19, desc: "A silver eel with markings that look like interlocked chain links. It weaves through rusted metal loops effortlessly." },
        { name: "Copper Coin Tetra", xp: 40, gold: 20, desc: "Round and shiny, schools of them look like spilled treasure. They are attracted to shiny objects." },
        { name: "Glass Shard Guppy", xp: 42, gold: 21, desc: "Its fins are sharp and transparent, resembling broken bottle glass. Handling them carelessly causes small cuts." },
        { name: "Barnacle Back Bleak", xp: 44, gold: 22, desc: "Its back is covered in small, hard barnacles. It scrapes against rocks to dislodge parasites." },
        { name: "Tar Pit Molly", xp: 46, gold: 23, desc: "Black and viscous looking. It thrives in the stagnant pools leaking from ancient oil drums." },
        { name: "Cargo Net Rasbora", xp: 48, gold: 24, desc: "Its scale pattern resembles a grid or net. It schools tightly to look like a drifting fishing net." },
        { name: "Scrap Metal Danio", xp: 50, gold: 25, desc: "A fast swimmer that looks like a twisted piece of tin. It flashes erratically in the dim light." },
        { name: "Key Hole Cichlid", xp: 52, gold: 26, desc: "It has a distinct black shape on its side resembling an old fashioned keyhole. It is curious and investigates divers." }
      ],
      Uncommon: [
        { name: "Iron Clad Bass", xp: 75, gold: 45, desc: "Its scales have hardened into iron like plates from a diet of mineral rich rust. It hits bait with a metallic clang." },
        { name: "Lock Pick Gar", xp: 78, gold: 47, desc: "Its snout is long, thin, and crooked like a lockpick tool. It probes crevices for hiding crabs." },
        { name: "Lantern Post Catfish", xp: 81, gold: 49, desc: "It has a single, long whisker with a bioluminescent tip that it hangs overhead like a streetlamp." },
        { name: "Compass Rose Ray", xp: 84, gold: 51, desc: "A round ray with markings resembling a compass rose. It always swims true north when migrating." },
        { name: "Ceramic Jar Octopus", xp: 87, gold: 53, desc: "A small octopus that carries a broken clay pot for protection. It pulls the lid shut when threatened." },
        { name: "Bronze Statue Carp", xp: 90, gold: 55, desc: "Green with oxidation, it looks like a swimming statue fragment. It is heavy and moves stiffly." },
        { name: "Mosaic Tile Trout", xp: 93, gold: 57, desc: "Its scales form a colorful, geometric mosaic pattern. It is believed to mimic the tiled floors of the ruins." },
        { name: "Gargoyle Head Sculpin", xp: 96, gold: 59, desc: "Its head is grotesque and stony, resembling a gothic gargoyle. It guards the entrances to underwater tunnels." },
        { name: "Bell Tower Drum", xp: 99, gold: 61, desc: "It produces a deep, resonant booming sound that sounds like a tolling bell underwater." },
        { name: "Scroll Fin Betta", xp: 102, gold: 63, desc: "Its fins curl at the edges like old parchment paper. It flares them to display script like markings." }
      ],
      Fine: [
        { name: "Silver Spoon Pike", xp: 150, gold: 90, desc: "Long, silver, and reflective. It hunts near the surface, looking like a dropped utensil before it strikes." },
        { name: "Spyglass Eye Walleye", xp: 155, gold: 95, desc: "Its eyes are tubular and telescopic, allowing it to spot prey from incredible distances in the dark." },
        { name: "Golden Chalice Carp", xp: 160, gold: 100, desc: "A gold fish with a cup shaped mouth. It sifts through the sediment for gold dust." },
        { name: "Marble Column Eel", xp: 165, gold: 105, desc: "Thick and white with grey veins. It holds itself vertically, indistinguishable from a broken pillar." },
        { name: "Chandelier Jellyfish", xp: 170, gold: 110, desc: "A freshwater jellyfish that hangs motionless with crystal clear tentacles. It refracts light like cut glass." },
        { name: "Cannon Ball Puffer", xp: 175, gold: 115, desc: "Black, round, and incredibly heavy. When inflated, it is as hard as iron." },
        { name: "Figurehead Swordfish", xp: 180, gold: 120, desc: "Its bill is carved and ornate, resembling the prow of a ship. It leads schools of fish like a captain." },
        { name: "Velvet Rope Barracuda", xp: 185, gold: 125, desc: "A deep red barracuda that patrols boundaries. It attacks anything that crosses its line." }
      ],
      Rare: [
        { name: "Sunken Treasure Snapper", xp: 300, gold: 180, desc: "A fish that swallows gold coins. It rattles when you reel it in." },
        { name: "Ancient Amphora Squid", xp: 310, gold: 185, desc: "A large squid that lives inside a giant Greek amphora. Its tentacles are painted with ancient war scenes." },
        { name: "Ghost Ship Ray", xp: 320, gold: 190, desc: "A ray with tattered wings that look like torn sails. It glides silently through the wreckage." },
        { name: "Jade Dragon Goby", xp: 330, gold: 195, desc: "A small but valuable fish made of living green jade. It brings good fortune." },
        { name: "Onyx Cameo Crab", xp: 340, gold: 200, desc: "Its shell features a perfect white silhouette profile on a black background. A natural work of art." },
        { name: "Skeleton Key Eel", xp: 350, gold: 205, desc: "Its tail ends in a complex shape. Legend says it can unlock the gates to the inner city." },
        { name: "Map Skin Flounder", xp: 360, gold: 210, desc: "The markings on its back form a map of the harbor. Sailors used to catch them to navigate." },
        { name: "Cursed Doubloon Turtle", xp: 370, gold: 215, desc: "A turtle with a shell that looks like a giant gold coin. It is said to be heavy with a pirate's curse." }
      ],
      Epic: [
        { name: "Titan Anchor Shark", xp: 600, gold: 300, desc: "A shark with a head shape resembling a rusted anchor. It uses its head to hook onto prey." },
        { name: "Dread Nought Sturgeon", xp: 625, gold: 315, desc: "Covered in metal plates, it looks like a submarine. It is unstoppable once it starts swimming." },
        { name: "Kraken Tentacle Moray", xp: 650, gold: 330, desc: "An eel so large it mimics a kraken's arm. It has suction cups along its sides." },
        { name: "Leviathan Figurehead", xp: 675, gold: 345, desc: "A living wooden fish that was once part of a ship. It weeps saltwater tears." },
        { name: "Gilded Cage Gar", xp: 700, gold: 360, desc: "Its ribs are visible on the outside, forming a golden cage. Small fish sometimes swim inside for safety, then get eaten." },
        { name: "Harpoon Snout Marlin", xp: 725, gold: 375, desc: "Its bill is a rusted harpoon tip. It carries the scars of a thousand battles." },
        { name: "Steam Engine Carp", xp: 750, gold: 390, desc: "It releases jets of steam from its gills. It chugs through the water with mechanical rhythm." },
        { name: "Ruined Archway Ray", xp: 775, gold: 405, desc: "A ray with a hole in the center of its body. It looks like a swimming stone arch." }
      ],
      Legendary: [
        { name: "The Flying Dutchman", xp: 1350, gold: 675, desc: "A ghostly sailfish that glows green. It sails above the water line in the harbor fog." },
        { name: "Captain's Log Lobster", xp: 1400, gold: 705, desc: "A massive lobster with the history of the port inscribed on its shell. It knows where the treasure is buried." },
        { name: "The Iron Clad Whale", xp: 1450, gold: 735, desc: "A small whale with armor riveted to its skin. It guards the harbor mouth." },
        { name: "Siren Song Bass", xp: 1500, gold: 765, desc: "Its gills vibrate to produce a melody that lures sailors to their doom." },
        { name: "The Unsinkable Sunfish", xp: 1550, gold: 795, desc: "A sunfish made of cork and hope. It cannot be pulled under, no matter how hard it fights." }
      ],
      Mythic: [
        { name: "Harbor Master Kraken", xp: 3300, gold: 1650, desc: "A kraken that wears the wreckage of ships as armor. It demands a toll from all who pass." },
        { name: "Ghost Fleet Hydra", xp: 3400, gold: 1700, desc: "A hydra where each head resembles the prow of a different sunken ship. It screams with the voices of the drowned." },
        { name: "Rust Bucket Behemoth", xp: 3500, gold: 1750, desc: "A massive crab that lives inside the hull of a battleship. It uses the ship's cannons as clubs." },
        { name: "Tidal Wave Serpent", xp: 3600, gold: 1800, desc: "A serpent that creates massive waves in the enclosed harbor. It washes ships against the rocks." },
        { name: "Deep Dive Bell Jelly", xp: 3700, gold: 1850, desc: "A giant jellyfish shaped like a diving bell. It traps divers inside its bell and slowly digests them." }
      ],
      Exotic: [
        { name: "Quantum Compass Ray", xp: 10500, gold: 5250, desc: "A ray that navigates through dimensions. It points to things that don't exist yet." },
        { name: "Void Anchor Eel", xp: 11000, gold: 5500, desc: "An eel so heavy it anchors reality in place. Moving it causes spatial distortions." },
        { name: "Time In A Bottle Fish", xp: 11500, gold: 5750, desc: "A transparent fish that holds a frozen moment of time inside. Catching it releases the moment." }
      ],
      Arcane: [
        { name: "The Sunken King", xp: 52500, gold: 30000, desc: "A titanic merman like entity, calcified into stone, yet still living. He sits on a throne of shipwrecks. He controls the tides of the underworld." }
      ]
    }
  },
  12: {
    name: "The Grand Canal",
    unlockLevel: 650,
    unlockGold: 4000000,
    boatRequired: null,
    boatPrice: 0,
    description: "Past the harbor lies the residential district of the ancient city, now a network of flooded streets known as The Grand Canal. Ornate stone bridges span the emerald green water, and moss hangs from the balconies of crumbling palaces. The atmosphere is quiet and melancholic. The fish here are elegant, mimicking the art and architecture of the lost civilization.",
    fish: {
      Common: [
        { name: "Green Tile Minnow", xp: 31, gold: 15, desc: "A small fish with square, green scales. It grazes on the algae covering the canal walls." },
        { name: "Gondola Pole Pike", xp: 33, gold: 16, desc: "Long, thin, and striped like a barber pole. It stands vertically in the water near docking posts." },
        { name: "Masked Goby", xp: 35, gold: 17, desc: "It has a pattern on its face resembling a Venetian carnival mask. It hides in the mud during the day." },
        { name: "Marble Chip Tetra", xp: 37, gold: 18, desc: "White with grey veins, it looks like a chip of polished marble. It schools around fallen statues." },
        { name: "Velvet Curtain Betta", xp: 39, gold: 19, desc: "Its fins are heavy and red, draping like theater curtains. It moves with slow, dramatic flair." },
        { name: "Pigeon Feather Barb", xp: 41, gold: 20, desc: "Grey and iridescent purple. It scavenges crumbs dropped from the bridges above." },
        { name: "Moss Beard Chub", xp: 43, gold: 21, desc: "Green moss grows long from its chin, looking like a beard. It is sluggish and wise looking." },
        { name: "Brick Red Rasbora", xp: 45, gold: 22, desc: "Colored like wet clay bricks. It hides in gaps in the masonry." },
        { name: "Glass Blower Guppy", xp: 47, gold: 23, desc: "Its tail looks like molten glass, shifting shape as it swims. A tribute to the city's artisans." },
        { name: "Lace Fin Danio", xp: 49, gold: 24, desc: "Its fins are intricate and full of holes, resembling fine lace. Delicate and beautiful." },
        { name: "Fresco Painted Bleak", xp: 51, gold: 25, desc: "Its side markings look like cracked plaster paintings. Each one has a unique pattern." },
        { name: "Sewer Grate Eel", xp: 53, gold: 26, desc: "A dark eel that lives in the drainage pipes. It snaps at anything that passes the opening." }
      ],
      Uncommon: [
        { name: "Balcony Gardener Bass", xp: 77, gold: 46, desc: "It spits water at hanging plants to knock insects into the canal. It is often found under balconies." },
        { name: "Bridge Troll Catfish", xp: 80, gold: 48, desc: "Large, ugly, and territorial. It demands a tribute (bait) before letting you fish under its bridge." },
        { name: "Opera Singer Toadfish", xp: 83, gold: 50, desc: "It sings a booming aria at night to attract mates. The sound echoes through the stone streets." },
        { name: "Harlequin Shrimp Goby", xp: 86, gold: 52, desc: "Patterned with diamonds of black and white. It performs acrobatic flips when feeding." },
        { name: "Stone Lion Sculpin", xp: 89, gold: 54, desc: "It looks exactly like a carved stone lion head. It guards the steps leading into the water." },
        { name: "Lantern Festival Carp", xp: 92, gold: 56, desc: "It glows with a warm, paper lantern light. Schools of them look like a floating festival." },
        { name: "Violin Ray", xp: 95, gold: 58, desc: "Its body shape resembles a violin. When it swims, it makes a humming sound like bow strings." },
        { name: "Tapestry Weaver Wrasse", xp: 98, gold: 60, desc: "It builds nests out of colorful threads and weeds, creating intricate patterns on the canal floor." },
        { name: "Perfume Bottle Puffer", xp: 101, gold: 62, desc: "Ornate and round. When threatened, it releases a cloud of sweet smelling but toxic gas." },
        { name: "Crypt Keeper Eel", xp: 104, gold: 64, desc: "Pale and gaunt. It lives in the flooded basements of the city's crypts." }
      ],
      Fine: [
        { name: "Golden Lion Tamarin Fish", xp: 155, gold: 93, desc: "A fish with a mane of gold spines. It is regal and demands the best bait." },
        { name: "Murano Glass Trout", xp: 160, gold: 98, desc: "Its body is transparent with swirls of colored internal organs. It looks like a masterpiece of glass blowing." },
        { name: "Carnival Mask Ray", xp: 165, gold: 103, desc: "Its back pattern looks like a feathered carnival mask. It hides in the sand, revealing only its 'eyes'." },
        { name: "Grand Piano Flounder", xp: 170, gold: 108, desc: "Black and shiny with white teeth. It lies flat on the polished marble floors of sunken ballrooms." },
        { name: "Ballroom Dancer Betta", xp: 175, gold: 113, desc: "A pair of fish that always swim together, swirling around each other in a perpetual waltz." },
        { name: "Gilded Frame Mirror Carp", xp: 180, gold: 118, desc: "Its scales are perfectly reflective, surrounded by a rim of gold. It mirrors the glory of the ruins." },
        { name: "Cathedral Window Discus", xp: 185, gold: 123, desc: "Round and patterned like a stained glass window. Light shines through it in beams of color." },
        { name: "Silent Mime Fish", xp: 190, gold: 128, desc: "Black and white. It mimics the movements of other fish perfectly, mocking them." }
      ],
      Rare: [
        { name: "Doppelganger Pike", xp: 310, gold: 186, desc: "It changes its color to look like the angler's own reflection in the water. Unnerving." },
        { name: "Phantom Gondolier Eel", xp: 320, gold: 191, desc: "A tall, thin eel that stands upright and pushes itself along with a fin like a pole." },
        { name: "Clock Tower Gear Fish", xp: 330, gold: 196, desc: "Round and metallic with ticking gills. It escaped from the city's great clock tower." },
        { name: "Library Scroll Ray", xp: 340, gold: 201, desc: "A flat ray marked with ancient text. Scholars study caught specimens to learn history." },
        { name: "Poison Ring Octopus", xp: 350, gold: 206, desc: "A tiny, deadly octopus that hides inside lost jewelry rings. Its bite is fatal." },
        { name: "Merchant Prince Grouper", xp: 360, gold: 211, desc: "Fat, purple, and adorned with gold parasites that look like jewelry. It eats only the finest crabs." },
        { name: "Assassin Blade Gar", xp: 370, gold: 216, desc: "Sleek, hooded, and armed with a wrist blade like bone spur. It strikes from the shadows." },
        { name: "Plague Doctor Catfish", xp: 380, gold: 221, desc: "It has a long, beak like snout and black markings. It scavenges the diseased parts of the canal." }
      ],
      Epic: [
        { name: "Titan Bridge Turtle", xp: 620, gold: 310, desc: "A turtle so large its shell is used as a bridge by smaller creatures. It blocks entire canals." },
        { name: "Palace Guard Shark", xp: 645, gold: 325, desc: "Clad in natural armor that looks like ceremonial plate. It patrols the entrances to the royal district." },
        { name: "Canal Dredger Sturgeon", xp: 670, gold: 340, desc: "Its mouth acts like a shovel, dredging up the canal floor. It uncovers lost secrets." },
        { name: "Fountain Spout Whale", xp: 695, gold: 355, desc: "A small whale that shoots water high into the air, mimicking the city's fountains." },
        { name: "Masquerade Ball Ray", xp: 720, gold: 370, desc: "A ray with a mesmerizing pattern that causes dizziness. It spins through the water like a dancer." },
        { name: "Catacomb Bone Eel", xp: 745, gold: 385, desc: "An eel made of fused bones. It rattles as it swims through the flooded tunnels." },
        { name: "Shattered Glass Pike", xp: 770, gold: 400, desc: "Invisible except for the jagged cracks in its skin. It cuts whatever it touches." },
        { name: "Grand Canal Serpent", xp: 795, gold: 415, desc: "A serpent that spans the length of the canal. Its scales are green roofing tiles." }
      ],
      Legendary: [
        { name: "The Doge Fish", xp: 1395, gold: 697, desc: "A fish wearing a natural formation that looks like a ducal hat. It commands the respect of all other fish." },
        { name: "Winged Lion Bass", xp: 1445, gold: 727, desc: "A bass with wing like fins. It is the symbol of the city come to life." },
        { name: "Spirit of the Carnival", xp: 1495, gold: 757, desc: "A chaotic, colorful swirl of energy that takes the form of a fish. It brings madness and joy." },
        { name: "The Silent Gondola", xp: 1545, gold: 787, desc: "A massive, black fish shaped like a boat. It carries the souls of the dead to the open sea." },
        { name: "The Last Patron", xp: 1595, gold: 817, desc: "An ancient fish that remembers the city's golden age. It weeps pearls." }
      ],
      Mythic: [
        { name: "Hydra of the Canals", xp: 3410, gold: 1705, desc: "A hydra that lives under the city. Its heads emerge from different manholes to snatch prey." },
        { name: "Basilisk of the Bridge", xp: 3510, gold: 1755, desc: "A giant lizard fish whose gaze turns anglers to stone. It suns itself on the Rialto." },
        { name: "Glass Blower Dragon", xp: 3610, gold: 1805, desc: "A dragon made of molten glass. It breathes superheated sand that turns to glass on impact." },
        { name: "Venetian Leviathan", xp: 3710, gold: 1855, desc: "A monster that wears the city like a shell. When it moves, the buildings shift." },
        { name: "Masque of Red Death Ray", xp: 3810, gold: 1905, desc: "A blood red ray that brings a plague to the waters. Everything around it dies." }
      ],
      Exotic: [
        { name: "Mirror Dimension Carp", xp: 10850, gold: 5425, desc: "A carp that swims in the reflection of the water, not the water itself. You have to cast at the reflection." },
        { name: "Phantom Opera Whale", xp: 11350, gold: 5675, desc: "A ghost whale whose song shatters glass. It sings the tragedy of the sunken city." },
        { name: "Time Piece Turtle", xp: 11850, gold: 5925, desc: "A turtle with a working clock on its shell. It counts down to the city's final destruction." }
      ],
      Arcane: [
        { name: "The City Soul", xp: 54250, gold: 31000, desc: "The collective consciousness of the drowned citizens, formed into a massive, glowing school of fish that moves as one. Catching it is to catch a million souls." }
      ]
    }
  },
  13: {
    name: "Sunken City of Aethelgard",
    unlockLevel: 800,
    unlockGold: 5000000,
    boatRequired: null,
    boatPrice: 0,
    description: "At the heart of the ruins lies Aethelgard, the capital. Massive spires of white stone pierce the water surface, but the streets are deep below. It is a place of faded glory and powerful magic. The water glows with a faint blue luminescence from the crystals used to power the city. The fish here are mutated by arcane energy, often displaying glowing runes or magical abilities.",
    fish: {
      Common: [
        { name: "Rune Scale Minnow", xp: 32, gold: 16, desc: "Each scale carries a faint, glowing rune. It is said they form a spell if read in order." },
        { name: "Mana Sip Guppy", xp: 34, gold: 17, desc: "Blue and translucent, it feeds on leaking magical energy. It fizzes when removed from water." },
        { name: "Cobblestone Goby", xp: 36, gold: 18, desc: "Shaped like a paving stone. It hides on the city streets, waiting for prey to walk by." },
        { name: "Street Lamp Tetra", xp: 38, gold: 19, desc: "It has a bright yellow spot on its head. Schools of them illuminate the dark boulevards." },
        { name: "Scroll Case Chub", xp: 40, gold: 20, desc: "Cylindrical and leathery. It mimics the watertight scroll cases found in the library." },
        { name: "Ghost Light Danio", xp: 42, gold: 21, desc: "It flickers in and out of visibility. It is attracted to the souls of the lost." },
        { name: "Shattered Visage Fry", xp: 44, gold: 22, desc: "Its face pattern looks like a broken statue. Creepy in large numbers." },
        { name: "Altar Cloth Betta", xp: 46, gold: 23, desc: "Deep velvet red with gold fringes. It rests on the altars of sunken temples." },
        { name: "Incense Burner Barb", xp: 48, gold: 24, desc: "It releases a trail of scented bubbles. It was bred by priests for rituals." },
        { name: "Temple Guard Rasbora", xp: 50, gold: 25, desc: "Silver and rigid. It patrols in perfect formation around holy sites." },
        { name: "Crystal Chip Bleak", xp: 52, gold: 26, desc: "Sharp and glittering. It eats the dust from grinding magic stones." },
        { name: "Echo Whisper Loach", xp: 54, gold: 27, desc: "It amplifies sounds. A school of them can make a whisper sound like a shout." }
      ],
      Uncommon: [
        { name: "Spell Eater Catfish", xp: 80, gold: 48, desc: "It has a gaping maw that absorbs magical projectiles. It is immune to arcane lures." },
        { name: "Glyph Fin Bass", xp: 83, gold: 50, desc: "Its fins display changing glyphs that predict the weather. Locals consult it before sailing." },
        { name: "Arcane Eye Flounder", xp: 86, gold: 52, desc: "It has a third eye in the center of its head that sees magic. It reacts to enchanted bait." },
        { name: "Teleport Trout", xp: 89, gold: 54, desc: "It blinks forward a few feet instantly. Catching it requires predicting where it will appear." },
        { name: "Levitation Ray", xp: 92, gold: 56, desc: "It swims slightly above the riverbed, never touching the sand. It is unaffected by gravity." },
        { name: "Shield Bearer Gar", xp: 95, gold: 58, desc: "Its head is a flat, magical forcefield. Hooks bounce off unless you catch it from behind." },
        { name: "Mage Hand Octopus", xp: 98, gold: 60, desc: "Its tentacles end in hand like structures. It can open jars and untie knots." },
        { name: "Potion Bottle Puffer", xp: 101, gold: 62, desc: "Round and filled with colorful, bubbling liquid. Its poison causes random magical effects." },
        { name: "Illusionist Eel", xp: 104, gold: 64, desc: "It creates decoy copies of itself. You have to guess which one is real." },
        { name: "Banshee Wail Drum", xp: 107, gold: 66, desc: "Its call sounds like a screaming woman. It signals approaching death." }
      ],
      Fine: [
        { name: "Philosopher's Stone Carp", xp: 160, gold: 96, desc: "Red and heavy. Legend says it can turn lead sinkers into gold." },
        { name: "Staff Of Power Pike", xp: 165, gold: 101, desc: "Long and knobby with a glowing gem at the tip. It channels lightning." },
        { name: "Orb Weaver Ray", xp: 170, gold: 106, desc: "It spins a web of magical energy between rocks to catch prey." },
        { name: "Cloak Of Invisibility Bass", xp: 175, gold: 111, desc: "Completely invisible except for its eyes. You have to watch for the water displacement." },
        { name: "Elemental Fire Salmon", xp: 180, gold: 116, desc: "A salmon made of magical fire that doesn't boil water. It burns cold." },
        { name: "Golem Heart Sturgeon", xp: 185, gold: 121, desc: "It has a clay seal on its forehead. Removing it kills the fish." },
        { name: "Summoning Circle Crab", xp: 190, gold: 126, desc: "Its back has a perfect pentagram. It attracts demons (or bad luck)." },
        { name: "Wand Wood Gar", xp: 195, gold: 131, desc: "Made of the same wood as wizard wands. It is highly conductive to magic." }
      ],
      Rare: [
        { name: "Lich King Catfish", xp: 320, gold: 192, desc: "Undead and skeletal. It commands other undead fish." },
        { name: "Soul Gem Snapper", xp: 330, gold: 197, desc: "Its scales trap the souls of its prey. You can see faces screaming in its flank." },
        { name: "Mana Wyrm Eel", xp: 340, gold: 202, desc: "A glowing purple eel that feeds on pure magic. It drains the power from electric boats." },
        { name: "Crystal Ball Jellyfish", xp: 350, gold: 207, desc: "Perfectly round and clear. Looking into it shows you your future catch." },
        { name: "Grimoire Ray", xp: 360, gold: 212, desc: "A ray with pages of a spellbook for wings. It flutters like a book in the wind." },
        { name: "Alchemist Gold Shark", xp: 370, gold: 217, desc: "A shark transmutated into living gold. It is soft, heavy, and extremely valuable." },
        { name: "Void Portal Flounder", xp: 380, gold: 222, desc: "Its black spot is a literal hole in reality. Don't touch it." },
        { name: "Necromancer Pike", xp: 390, gold: 227, desc: "It raises small dead fish to fight for it. It hides behind its minion wall." }
      ],
      Epic: [
        { name: "Titan Golem Grouper", xp: 640, gold: 320, desc: "A grouper made of animated clay and stone. It guards the city gates." },
        { name: "Runemaster Arapaima", xp: 665, gold: 335, desc: "An enormous arapaima covered in glowing blue runes that pulse with arcane power. Each scale is inscribed with ancient spells, and it commands water currents through pure magical will." },
        { name: "Dragon Bone Sturgeon", xp: 690, gold: 350, desc: "A skeleton sturgeon animated by dark magic. It feels no pain." },
        { name: "Spire Top Ray", xp: 715, gold: 365, desc: "A ray that impales prey on its sharp, spire like tail. It glides high above the city." },
        { name: "Rune Bound Leviathan", xp: 740, gold: 380, desc: "Covered in binding chains and glowing runes. It is a prisoner of the city." },
        { name: "Ethereal Phase Shark", xp: 765, gold: 395, desc: "A shark that can phase through solid walls. Nowhere is safe." },
        { name: "Mana Bomb Puffer", xp: 790, gold: 410, desc: "When it inflates, it explodes in a blast of magical energy. It survives the blast." },
        { name: "Spell Reflection Gar", xp: 815, gold: 425, desc: "Its scales reflect all magic. It is the bane of wizards." }
      ],
      Legendary: [
        { name: "The High Priestess", xp: 1440, gold: 720, desc: "A fish veiled in white silk fins. She heals the injured fish around her." },
        { name: "Staff Of Legends Pike", xp: 1490, gold: 750, desc: "A pike that looks like a legendary weapon. Whoever catches it becomes the king of anglers." },
        { name: "Spirit of Aethelgard", xp: 1540, gold: 780, desc: "A glowing avatar of the city itself. It weeps for the lost civilization." },
        { name: "Ancient Guardian Dragon", xp: 1590, gold: 810, desc: "A water dragon that curls around the central spire. It sleeps, waiting for the king's return." },
        { name: "The Philosopher's Fish", xp: 1640, gold: 840, desc: "A fish that grants immortality to whoever eats it. (Please catch and release)." }
      ],
      Mythic: [
        { name: "Mana Storm Hydra", xp: 3520, gold: 1760, desc: "A hydra composed of chaotic magic. Each head breathes a different element." },
        { name: "Void Lord Serpent", xp: 3620, gold: 1810, desc: "A serpent from the void dimension. It tries to pull the entire city into nothingness." },
        { name: "Crystal Colossus Crab", xp: 3720, gold: 1860, desc: "A crab made of blue mana crystals. It generates the power for the ruins." },
        { name: "Lich Dragon Eel", xp: 3820, gold: 1910, desc: "An undead dragon eel. It creates zombies from the fish it kills." },
        { name: "Arcane Siren", xp: 3920, gold: 1960, desc: "Her song drives men mad with forbidden knowledge. She floats in the library district." }
      ],
      Exotic: [
        { name: "Reality Tear Ray", xp: 11200, gold: 5600, desc: "A ray that cuts holes in reality. You can see other worlds through its wings." },
        { name: "Pure Mana Wyrm", xp: 11700, gold: 5850, desc: "A creature of blinding white light. It is raw power given form." },
        { name: "Time Lock Sturgeon", xp: 12200, gold: 6100, desc: "A sturgeon frozen in a single second. It doesn't move, the universe moves around it." }
      ],
      Arcane: [
        { name: "The First Wizard", xp: 56000, gold: 32000, desc: "The transfigured form of the wizard who sank the city. A massive, bearded fish thing that whispers spells in the dark." }
      ]
    }
  },
  14: {
    name: "The Crystal Archives",
    unlockLevel: 1000,
    unlockGold: 7500000,
    boatRequired: null,
    boatPrice: 0,
    description: "Deep below the city lies the repository of all knowledge, The Crystal Archives. It is a vast canyon of glass shelves and crystal data shards, illuminated by the cold light of preservation magic. The water is impossibly clear but distorts distances. The fish here are translucent, fragile, and strange, adapted to the silence of the deep library.",
    fish: {
      Common: [
        { name: "Glass Page Minnow", xp: 33, gold: 16, desc: "Completely flat and transparent. It looks like a floating page of glass." },
        { name: "Ink Well Goby", xp: 35, gold: 17, desc: "Pitch black and liquid looking. It hides in the inkwells on giant desks." },
        { name: "Quill Pen Tetra", xp: 37, gold: 18, desc: "Pointed and white with a black tip. It darts in straight lines like writing." },
        { name: "Lens Eye Chub", xp: 39, gold: 19, desc: "Its eyes are thick magnifying lenses. It examines the seabed for microscopic food." },
        { name: "Data Shard Fry", xp: 41, gold: 20, desc: "Angular and glowing blue. They swarm around the crystal storage towers." },
        { name: "Book Mark Eel", xp: 43, gold: 21, desc: "Flat, colorful, and ribbon like. It squeezes between the glass tablets to hide." },
        { name: "Dust Mite Barb", xp: 45, gold: 22, desc: "A scavenger that eats the magical dust settling on the archives." },
        { name: "Silence Keeper Betta", xp: 47, gold: 23, desc: "It flares its fins to absorb sound. It keeps the library perfectly quiet." },
        { name: "Prism Scale Danio", xp: 49, gold: 24, desc: "It splits white light into rainbows. Schools of them create dazzling light shows." },
        { name: "Obsidian Tablet Pleco", xp: 51, gold: 25, desc: "Black and rectangular. It cleans the obsidian recording tablets." },
        { name: "Vellum Fin Bleak", xp: 53, gold: 26, desc: "Its skin looks like old, yellowed paper. It tears easily." },
        { name: "Wax Seal Guppy", xp: 55, gold: 27, desc: "Red and round with a stamped pattern on its side. It looks like a wax seal." }
      ],
      Uncommon: [
        { name: "Magnifying Glass Ray", xp: 82, gold: 49, desc: "Its body is a clear lens rimmed with bone. It focuses sunlight to burn prey." },
        { name: "Scroll Worm Eel", xp: 85, gold: 51, desc: "It burrows through paper and parchment. A pest that destroyed much of the library." },
        { name: "Crystal Skull Catfish", xp: 88, gold: 53, desc: "Its skull is visible and made of crystal. It is prized by collectors." },
        { name: "Invisible Ink Squid", xp: 91, gold: 55, desc: "Its ink is clear but glows under UV light. It confuses predators." },
        { name: "Lore Master Bass", xp: 94, gold: 57, desc: "An old fish with a long beard. It is said to know the location of every book." },
        { name: "Fiber Optic Jelly", xp: 97, gold: 59, desc: "It pulses with data. Touching it transfers knowledge directly into your mind (painfully)." },
        { name: "Hard Cover Carp", xp: 100, gold: 61, desc: "Its scales are thick and leather bound. It is nearly bulletproof." },
        { name: "Index Card Flounder", xp: 103, gold: 63, desc: "White with blue lines. It lies flat on the archive floor." },
        { name: "Whispering Gallery Drum", xp: 106, gold: 65, desc: "It whispers secrets instead of drumming. Listening to it reveals hidden locations." },
        { name: "Paper Weight Stonefish", xp: 109, gold: 67, desc: "Heavy, glass, and decorative. It pins down prey with its weight." }
      ],
      Fine: [
        { name: "Encyclopedia Grouper", xp: 165, gold: 99, desc: "A massive fish with layers of scales like pages. It is ancient and slow." },
        { name: "Lexicon Salmon", xp: 170, gold: 104, desc: "Its spots form letters in an unknown language. It swims upstream to the source of knowledge." },
        { name: "Codex Crab", xp: 175, gold: 109, desc: "It uses a hollowed out metal book cover as a shell. It snaps shut to protect itself." },
        { name: "Runestone Ray", xp: 180, gold: 114, desc: "A ray carved from runestone. It glows when magic is near." },
        { name: "Hourglass Pike", xp: 185, gold: 119, desc: "It has an hourglass shape on its side. It strikes with perfect timing." },
        { name: "Lost Language Gar", xp: 190, gold: 124, desc: "Covered in symbols from a dead language. Deciphering them drives men mad." },
        { name: "Globe Trotter Puffer", xp: 195, gold: 129, desc: "Perfectly round and painted with a map of the ancient world." },
        { name: "Monocle Eye Shark", xp: 200, gold: 134, desc: "It has a golden ring around one eye. It looks distinguished but bites hard." }
      ],
      Rare: [
        { name: "Forbidden Tome Ray", xp: 330, gold: 198, desc: "Black and bound in chains. It contains dangerous spells." },
        { name: "Crystal Spire Eel", xp: 340, gold: 203, desc: "An eel made of sharp crystal shards. It cuts through nets." },
        { name: "Ghost Writer Squid", xp: 350, gold: 208, desc: "It uses its ink to write messages on the glass walls. It tries to communicate." },
        { name: "Living Statue Sturgeon", xp: 360, gold: 213, desc: "A marble statue of a fish brought to life. It is cold and hard." },
        { name: "Diamond Lens Tuna", xp: 370, gold: 218, desc: "Its eyes are flawless diamonds. It sees into other spectrums." },
        { name: "Cipher Lock Turtle", xp: 380, gold: 223, desc: "Its shell is a puzzle lock. Solving it opens the shell (don't do it, the turtle likes its shell)." },
        { name: "Golden Ratio Nautilus", xp: 390, gold: 228, desc: "A nautilus with a mathematically perfect shell. It is the definition of beauty." },
        { name: "Mirror Maze Marlin", xp: 400, gold: 233, desc: "It creates reflections of itself to confuse anglers. You never know which one is real." }
      ],
      Epic: [
        { name: "Titan Crystal Golem", xp: 660, gold: 330, desc: "A construct of crystal that resembles a giant crab. It organizes the shelves." },
        { name: "Keeper of Secrets Shark", xp: 685, gold: 345, desc: "A shark with a mouth sewn shut with gold wire. It guards the forbidden section." },
        { name: "Glass Dragon Eel", xp: 710, gold: 360, desc: "A transparent dragon eel. You can see its beating heart." },
        { name: "Scroll Guardian Hydra", xp: 735, gold: 375, desc: "A hydra made of paper and ink. It can flatten itself to slide under doors." },
        { name: "Obsidian Obelisk Ray", xp: 760, gold: 390, desc: "A black ray shaped like a tall pyramid. It hums with dark energy." },
        { name: "Prism Beam Arapaima", xp: 785, gold: 405, desc: "It shoots beams of focused light from its mouth. It can melt glass." },
        { name: "Chronicle Turtle", xp: 810, gold: 420, desc: "Its shell contains the entire history of the world engraved in microscopic text." },
        { name: "Silence Bringer Bass", xp: 835, gold: 435, desc: "It absorbs all sound in a mile radius. A terrifying silence falls before it strikes." }
      ],
      Legendary: [
        { name: "The Akalabeth", xp: 1485, gold: 742, desc: "A legendary fish mentioned in the oldest books. It is the symbol of fallen kings." },
        { name: "Crystal Phoenix Fish", xp: 1535, gold: 772, desc: "A bird of crystal fire that swims. It shatters and reforms." },
        { name: "Spirit of Wisdom", xp: 1585, gold: 802, desc: "An owl faced fish that glows with soft light. It answers one question if caught." },
        { name: "The Omniscient Eye", xp: 1635, gold: 832, desc: "A giant floating eye with fins. It sees everything." },
        { name: "Book Wyrm", xp: 1685, gold: 862, desc: "A massive dragon made of old books. It breathes dust and papercuts." }
      ],
      Mythic: [
        { name: "Archive Sentinel Kraken", xp: 3630, gold: 1815, desc: "A kraken made of glass and light. It gently handles the fragile archives." },
        { name: "Information Overload Ray", xp: 3730, gold: 1865, desc: "Touching it floods your mind with too much data. It causes insanity." },
        { name: "Crystal Titan Tortoise", xp: 3830, gold: 1915, desc: "A tortoise with a city of crystal on its back. It moves geologically slow." },
        { name: "Void Knowledge Shark", xp: 3930, gold: 1965, desc: "A shark that knows how you will die. It uses that fear against you." },
        { name: "Siren of the Spire", xp: 4030, gold: 2015, desc: "She sits atop the highest crystal spire. Her song is a mathematical equation that solves the universe." }
      ],
      Exotic: [
        { name: "Data Stream Dragon", xp: 11550, gold: 5775, desc: "A dragon made of pure information code. It looks like a glitch in the world." },
        { name: "Fractal Jellyfish", xp: 12050, gold: 6025, desc: "Infinite complexity in a finite space. Looking at it hurts your eyes." },
        { name: "Eternal Memory Coelacanth", xp: 12550, gold: 6275, desc: "It remembers the beginning of time. It is heavy with the weight of the past." }
      ],
      Arcane: [
        { name: "The Grand Archivist", xp: 57750, gold: 33000, desc: "A cosmic entity that records every event in the universe. It appears as a multi armed figure of light. Catching it is to rewrite history." }
      ]
    }
  },
  15: {
    name: "The Throne of the Deep",
    unlockLevel: 1300,
    unlockGold: 10000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The deepest point of the ruins. A massive, circular chamber containing the throne of the ancient Void King. The water here is black and oily, pulsating with corruption. Reality is thin here. The fish are twisted monstrosities, touched by the void, existing partially in another dimension. This is the end of the line.",
    fish: {
      Common: [
        { name: "Void Touch Minnow", xp: 34, gold: 17, desc: "Black with purple veins. It jitters as if phasing in and out of existence." },
        { name: "Corrupted Goby", xp: 36, gold: 18, desc: "Its eyes are too big and too many. It watches from the shadows." },
        { name: "Shadow Fin Tetra", xp: 38, gold: 19, desc: "It has no shadow. It eats light." },
        { name: "Null Scale Chub", xp: 40, gold: 20, desc: "Its scales are matte black holes. They absorb all radar and sonar." },
        { name: "Chaos Spark Fry", xp: 42, gold: 21, desc: "Tiny sparks of chaotic energy. They burn the net." },
        { name: "Abyssal Leech Eel", xp: 44, gold: 22, desc: "It drains the life force, not just blood. It leaves grey, withered spots." },
        { name: "Whispering Barb", xp: 46, gold: 23, desc: "It whispers madness to other fish. Schools of them sound like a crowded room." },
        { name: "Eye Ball Betta", xp: 48, gold: 24, desc: "Its fins are covered in moving eyes. It sees in all directions." },
        { name: "Tentacle Face Danio", xp: 50, gold: 25, desc: "Its mouth is a mass of writhing tentacles. It looks like a tiny Cthulhu." },
        { name: "Bone Shard Pleco", xp: 52, gold: 26, desc: "Made of sharp bone shards held together by magic. It scrapes bone dust from the throne." },
        { name: "Ghost Flame Bleak", xp: 54, gold: 27, desc: "It burns with a cold, grey fire. It is cold to the touch." },
        { name: "Void Bubble Guppy", xp: 56, gold: 28, desc: "A bubble of nothingness with a tail. It pops if touched." }
      ],
      Uncommon: [
        { name: "Reality Glitch Bass", xp: 85, gold: 51, desc: "It flickers and teleports short distances. It looks like a bad video signal." },
        { name: "Eldritch Catfish", xp: 88, gold: 53, desc: "It has too many whiskers, and they move on their own. It smells of ozone." },
        { name: "Dimensional Rift Ray", xp: 91, gold: 55, desc: "A ray that is a 2D object in a 3D world. It can slice through anything edge on." },
        { name: "Madness Mantle Squid", xp: 94, gold: 57, desc: "Its patterns induce insanity. Keep eye contact to a minimum." },
        { name: "Void Walker Trout", xp: 97, gold: 59, desc: "It walks on the surface of the water with spider legs. Unnatural." },
        { name: "Black Hole Sunfish", xp: 100, gold: 61, desc: "A flat disk of pure gravity. It pulls small fish into its mouth effortlessly." },
        { name: "Void Decay Eel", xp: 103, gold: 63, desc: "A slithering eel whose flesh constantly dissolves and reforms. It exists partially in another dimension, leaving trails of black particles that corrupt nearby water into oily void matter." },
        { name: "Doomsday Drum", xp: 106, gold: 65, desc: "Its beat matches your heart, then stops it. A terrifying catch." },
        { name: "Nightmare Snapper", xp: 109, gold: 67, desc: "It looks like your worst fear. It changes appearance for every angler." },
        { name: "Vampire Fang Gar", xp: 112, gold: 69, desc: "It feeds on the essence of living things. Pale and deadly." }
      ],
      Fine: [
        { name: "Soul Eater Piranha", xp: 170, gold: 102, desc: "A spectral piranha. It bites the soul, not the body." },
        { name: "Lich Lord Sturgeon", xp: 175, gold: 107, desc: "A massive, skeletal fish wearing a crown of rust. It rules the dead waters." },
        { name: "Void Spike Ray", xp: 180, gold: 112, desc: "Covered in spikes made of solidified darkness. They ignore armor." },
        { name: "Demon Blood Salmon", xp: 185, gold: 117, desc: "Its blood is boiling acid. It leaps from the water to attack." },
        { name: "Shadow Puppet Pike", xp: 190, gold: 122, desc: "A 2D shadow that cuts. It peels itself off the wall to hunt." },
        { name: "Hell Mouth Bass", xp: 195, gold: 127, desc: "Its mouth opens into a pocket dimension of fire. Don't put your hand in." },
        { name: "Chaos Warped Carp", xp: 200, gold: 132, desc: "Its form changes constantly. One moment a fish, the next a blob, then a bird." },
        { name: "Oblivion Orb Puffer", xp: 205, gold: 137, desc: "A sphere of annihilation. If it puffs up, it erases matter around it." }
      ],
      Rare: [
        { name: "Herald of the End", xp: 340, gold: 204, desc: "A fish with a trumpet like snout. It blows a sound that cracks glass." },
        { name: "Void Knight Shark", xp: 350, gold: 209, desc: "Armored in void plate. It fights with honor and brutality." },
        { name: "Abyssal Wurm", xp: 360, gold: 214, desc: "A segmented worm of immense size. It tunnels through the reality of the throne room." },
        { name: "Eye of Cthulhu Fish", xp: 370, gold: 219, desc: "A giant floating eyeball with tentacles. It stares into your soul." },
        { name: "Dark Matter Marlin", xp: 380, gold: 224, desc: "Made of heavy, invisible matter. You feel its weight but can't see it." },
        { name: "Anti Life Ray", xp: 390, gold: 229, desc: "It radiates an aura of death. Plants wither as it passes." },
        { name: "Cosmic Horror Crab", xp: 400, gold: 234, desc: "It has too many limbs and non Euclidean geometry. It shouldn't exist." },
        { name: "Throne Guardian Gar", xp: 410, gold: 239, desc: "It never moves from the foot of the throne. It strikes faster than light." }
      ],
      Epic: [
        { name: "Titan Void Whale", xp: 680, gold: 340, desc: "A whale composed of starless space. It swallows light." },
        { name: "Null Entity Grouper", xp: 705, gold: 355, desc: "A hole in the universe shaped like a fish. It is heavy with nothingness." },
        { name: "Chaos Lord Arapaima", xp: 730, gold: 370, desc: "The king of chaos. Its scales shift color and texture every second." },
        { name: "Shoggoth Eel", xp: 755, gold: 385, desc: "A shapeless mass of eyes and mouths. It mimics an eel to mock nature." },
        { name: "Dimensional Shredder Shark", xp: 780, gold: 400, desc: "Its teeth cut through dimensions. It can bite you from yesterday." },
        { name: "Event Horizon Turtle", xp: 805, gold: 415, desc: "Time stops at the edge of its shell. It is the slowest thing in existence." },
        { name: "Apocalypse Bringer Ray", xp: 830, gold: 430, desc: "Its wingspan blocks out the sky. It rains black fire." },
        { name: "The Unnamable Pike", xp: 855, gold: 445, desc: "A fish so horrible that to name it is to invite madness. (We call it Bob)." }
      ],
      Legendary: [
        { name: "The Void King", xp: 1530, gold: 765, desc: "A fish wearing a crown of negative energy. It rules the empty spaces." },
        { name: "Spirit of Nothingness", xp: 1580, gold: 795, desc: "A ghost that has forgotten who it was. It craves existence." },
        { name: "The End of Days", xp: 1630, gold: 825, desc: "A fish that appears only at the end of time. Catching it is a paradox." },
        { name: "Ancient Outer God", xp: 1680, gold: 855, desc: "A tiny fragment of a cosmic horror. Even a fragment is terrifying." },
        { name: "The Black Sun", xp: 1730, gold: 885, desc: "A round, black fish that radiates cold. It is the anti sun." }
      ],
      Mythic: [
        { name: "Azathoth Spawn", xp: 3740, gold: 1870, desc: "A mindless, swirling chaos. It bubbles and bursts with raw energy." },
        { name: "Yog Sothoth's Pet", xp: 3840, gold: 1920, desc: "A collection of glowing spheres. It is the key and the gate." },
        { name: "Nyarlathotep Serpent", xp: 3940, gold: 1970, desc: "A crawling chaos. It changes form to mock the angler." },
        { name: "Cthulhu Leviathan", xp: 4040, gold: 2020, desc: "A sleeping giant. Do not wake it." },
        { name: "Void Mother Hydra", xp: 4140, gold: 2070, desc: "The mother of monsters. She spawns void fish continuously." }
      ],
      Exotic: [
        { name: "Singularity Shark", xp: 11900, gold: 5950, desc: "A shark with a black hole for a stomach. It eats everything." },
        { name: "Entropy Dragon", xp: 12400, gold: 6200, desc: "A dragon that speeds up time to rot its prey. It breathes dust." },
        { name: "Reality Eater Wyrm", xp: 12900, gold: 6450, desc: "It chews on the edges of the map. It leaves white void behind." }
      ],
      Arcane: [
        { name: "The Zero Point", xp: 59500, gold: 34000, desc: "The source of all void. A point of infinite density and nothingness. It is the period at the end of the universe's sentence." }
      ]
    }
  },
  16: {
    name: "The Cheddar Gorge",
    unlockLevel: 1500,
    unlockGold: 15000000,
    boatRequired: "Dairy Skiff",
    boatPrice: 60000000,
    description: "A canyon carved from towering walls of sharp orange cheese. The river is a thick, flowing emulsion of milk and whey. The environment is warm and humid, perfect for aging. The fish here have adapted to the high calcium environment, often sporting heavy, waxy armor or soft, mold ripened skin.",
    fish: {
      Common: [
        { name: "Wax Scale Minnow", xp: 35, gold: 17, desc: "Its scales are red and waxy, like the coating of a gouda wheel. It peels them off to escape predators." },
        { name: "Curd Cluster Goby", xp: 37, gold: 18, desc: "A bumpy, white fish that mimics a floating cheese curd. It squeaks when bitten." },
        { name: "Milk Skin Flounder", xp: 39, gold: 19, desc: "A flat fish that floats on the surface like the skin on hot milk. It wrinkles when disturbed." },
        { name: "Cream Stream Chub", xp: 41, gold: 20, desc: "Fat and white, it thrives in the richest currents. It is prized for its incredibly smooth texture." },
        { name: "Blue Vein Tetra", xp: 43, gold: 21, desc: "A small fish with marbling of blue mold running through its body. It has a sharp, tangy scent." },
        { name: "Hole Dweller Eel", xp: 45, gold: 22, desc: "It lives inside the air pockets of the swiss cheese riverbed. It pops out to snatch passing crumbs." },
        { name: "Yogurt Culture Fry", xp: 47, gold: 23, desc: "Tiny, active fish that swarm in the fermented backwaters. They are beneficial for digestion." },
        { name: "Butter Fin Bleak", xp: 49, gold: 24, desc: "Its fins are slick and yellow. It slips out of nets easily due to its natural grease." },
        { name: "Whey Glider Danio", xp: 51, gold: 25, desc: "It skims the thin layer of whey on top of the river. It is fast and nearly transparent." },
        { name: "Rind Biter Piranha", xp: 53, gold: 26, desc: "Its teeth are designed to chew through hard parmesan rinds. It hunts in packs along the canyon walls." },
        { name: "Calcium Bone Barb", xp: 55, gold: 27, desc: "Its skeleton is hyper calcified and incredibly strong. It is heavy and sinks if it stops swimming." },
        { name: "String Cheese Worm", xp: 57, gold: 28, desc: "A long, aquatic worm that frays into strands when attacked. It regrows easily." }
      ],
      Uncommon: [
        { name: "Melting Brie Ray", xp: 87, gold: 52, desc: "A soft bodied ray that spreads out like melting cheese. It wraps around prey to suffocate them." },
        { name: "Sharp Cheddar Shark", xp: 90, gold: 54, desc: "Orange and aggressive. Its skin is rough and crumbling like aged cheddar." },
        { name: "Fondue Pot Turtle", xp: 93, gold: 56, desc: "Its shell is shaped like a ceramic pot. It hibernates in warm pockets of the river." },
        { name: "Pepper Jack Pike", xp: 96, gold: 58, desc: "Speckled with black and red spots. It delivers a spicy kick to anything that tries to eat it." },
        { name: "Smoked Gouda Gar", xp: 99, gold: 60, desc: "Brown skinned and smelling of hickory smoke. It prefers the darker, cave like areas of the gorge." },
        { name: "Mozzarella Stretch Eel", xp: 102, gold: 62, desc: "An eel with incredible elasticity. It can stretch its body to three times its normal length." },
        { name: "Parmesan Crust Crab", xp: 105, gold: 64, desc: "Its shell is hard, grainy, and thick. It is nearly impervious to crushing attacks." },
        { name: "Feta Block Flounder", xp: 108, gold: 66, desc: "White, crumbly looking, and square. It hides in the salty brine pools." },
        { name: "Ricotta Cloud Jellyfish", xp: 111, gold: 68, desc: "A fluffy, white jellyfish that looks like a scoop of ricotta. It has a mild sting." },
        { name: "Nacho Dip Catfish", xp: 114, gold: 70, desc: "Orange and viscous. It buries itself in the thick, spicy sediment of the river floor." }
      ],
      Fine: [
        { name: "Golden Wheel Sturgeon", xp: 175, gold: 105, desc: "A massive, round fish that rolls along the bottom like a cheese wheel. It is valuable and heavy." },
        { name: "Camembert Cream Carp", xp: 180, gold: 110, desc: "It has a soft, blooming white rind for skin. The inside is reputedly liquid." },
        { name: "Truffle Oil Trout", xp: 185, gold: 115, desc: "Dark and earthy, it leaves a slick of aromatic oil on the water surface." },
        { name: "Provolone Rope Eel", xp: 190, gold: 120, desc: "Pale and hung in loops from underwater branches. It looks like curing cheese." },
        { name: "Macaroni Tube Fish", xp: 195, gold: 125, desc: "A curved, hollow bodied fish. Small shrimps often live inside it for protection." },
        { name: "Cottage Lump Bass", xp: 200, gold: 130, desc: "Its skin is covered in white curds. It is deceptively strong for its lumpy appearance." },
        { name: "Queso Flameado Salamander", xp: 205, gold: 135, desc: "An aquatic lizard that glows with the heat of melted cheese and peppers." },
        { name: "Mascarpone Sweet Shark", xp: 210, gold: 140, desc: "A shark with a strangely sweet scent. It hunts in the sugary tributaries leading to the next biome." }
      ],
      Rare: [
        { name: "Royal Blue Stilton", xp: 350, gold: 210, desc: "Marbled with royal blue veins of magic mold. It grants strange visions if stared at." },
        { name: "Limburger Stink Ray", xp: 360, gold: 215, desc: "It emits a pungent odor that repels all other fish. You can smell it before you see it." },
        { name: "Emmental Hole Shark", xp: 370, gold: 220, desc: "Its body is full of natural holes that water passes through, making it swim silently." },
        { name: "Raclette Scraper Crab", xp: 380, gold: 225, desc: "Its claws are flat and wide, perfect for scraping melted cheese off rocks." },
        { name: "Halloumi Grill Fish", xp: 390, gold: 230, desc: "It has a high melting point and lives near thermal vents. Its scales are charred." },
        { name: "Gruyere Nut Carp", xp: 400, gold: 235, desc: "It has a distinct nutty flavor and aroma. It feeds on the giant walnuts that fall into the gorge." },
        { name: "Mimolette Mite Beetle", xp: 410, gold: 240, desc: "A giant aquatic beetle that looks like a cannonball of orange cheese. It burrows into the canyon walls." },
        { name: "Burrata Bag Jelly", xp: 420, gold: 245, desc: "A jellyfish that looks like a tied pouch. If popped, it releases a flood of cream." }
      ],
      Epic: [
        { name: "Titan Wheel Grouper", xp: 700, gold: 350, desc: "A fish the size of a carriage wheel. It is the king of the gorge." },
        { name: "Gorgonzola Giant Eel", xp: 725, gold: 365, desc: "An eel covered in green blue mold spores. Its bite causes paralysis." },
        { name: "Triple Cream Turtle", xp: 750, gold: 380, desc: "A turtle so rich and fatty it floats effortlessly. It is considered a supreme delicacy." },
        { name: "Aging Cave Catfish", xp: 775, gold: 395, desc: "It lives in the deepest, darkest caves. Dust and crystals grow on its whiskers." },
        { name: "Fondue Fork Marlin", xp: 800, gold: 410, desc: "Its bill is split into two sharp tines. It skewers prey with precision." },
        { name: "Pizza Cutter Shark", xp: 825, gold: 425, desc: "Its dorsal fin is a rolling blade of bone. It slices through the water surface." },
        { name: "Cheese Wire Gar", xp: 850, gold: 440, desc: "Extremely thin and sharp. It cuts through nets like a wire through soft cheddar." },
        { name: "Lactose Leviathan", xp: 875, gold: 455, desc: "A massive white whale made of milk proteins. It is the source of the river's flow." }
      ],
      Legendary: [
        { name: "The Big Cheese", xp: 1575, gold: 787, desc: "A legendary fish that rules the gorge. It is gold, heavy, and commands absolute respect." },
        { name: "Ancient Rind Walker", xp: 1625, gold: 817, desc: "A crustacean with armor made of petrified cheese rind. It is thousands of years old." },
        { name: "Spirit of Fermentation", xp: 1675, gold: 847, desc: "A bubbling, shifting entity. It turns water into wine and milk into cheese." },
        { name: "The Golden Slice Ray", xp: 1725, gold: 877, desc: "A triangular ray that glows with a holy light. It is the perfect slice." },
        { name: "Cheesemonger's Prize", xp: 1775, gold: 907, desc: "A fish so perfect it wins every competition. It gleams with a waxy shine." }
      ],
      Mythic: [
        { name: "Dairy Queen Kraken", xp: 3850, gold: 1925, desc: "A kraken made of swirling soft serve and cream. It drags ships into the milky depths." },
        { name: "Mold Spore Hydra", xp: 3950, gold: 1975, desc: "A hydra that breathes clouds of blue mold. It spreads decay and flavor wherever it goes." },
        { name: "Cheddar Block Whale", xp: 4050, gold: 2025, desc: "A rectangular whale. It is a monolith of cheese that swims." },
        { name: "Milk River Serpent", xp: 4150, gold: 2075, desc: "A white serpent that blends perfectly with the river. It strikes without warning." },
        { name: "Churning Vortex Crab", xp: 4250, gold: 2125, desc: "A crab that spins its claws to churn the milk into butter. It creates whirlpools." }
      ],
      Exotic: [
        { name: "Moon Cheese Sunfish", xp: 12250, gold: 6125, desc: "A glowing fish that fell from the moon. It has low gravity and tastes like stardust." },
        { name: "Abyssal Mold Jelly", xp: 12750, gold: 6375, desc: "A giant jellyfish of fungal matter that eats reality, leaving holes in the universe like swiss cheese." },
        { name: "Time Aged Coelacanth", xp: 13250, gold: 6625, desc: "A fish aged for millions of years. It is sharp, hard, and eternal." }
      ],
      Arcane: [
        { name: "Primordial Yeast Leviathan", xp: 61250, gold: 35000, desc: "The original culture that started all fermentation. A swirling galaxy of microscopic life form into a whale. Catching it is to hold the secret of change." }
      ]
    }
  },
  17: {
    name: "Soda Pop Falls",
    unlockLevel: 1750,
    unlockGold: 17500000,
    boatRequired: null,
    boatPrice: 0,
    description: "The dairy river drops over a cliff into a sparkling, effervescent basin. Soda Pop Falls is a world of sugary, carbonated water that fizzes and pops. The rocks are rock candy, and the spray is sticky and sweet. Fish here are hyper active, fueled by sugar and caffeine, vibrating with energy.",
    fish: {
      Common: [
        { name: "Fizzy Minnow", xp: 36, gold: 18, desc: "It constantly releases tiny bubbles. Schools of them make the water look like it's boiling." },
        { name: "Cola Nut Chub", xp: 38, gold: 19, desc: "Dark brown and caramel colored. It loves the caffeine rich pockets of the falls." },
        { name: "Lemon Lime Tetra", xp: 40, gold: 20, desc: "Bright green and yellow. It tastes sour and citrusy." },
        { name: "Orange Soda Guppy", xp: 42, gold: 21, desc: "Vibrant orange. It leaves a sticky residue if handled without gloves." },
        { name: "Root Beer Barrel Goby", xp: 44, gold: 22, desc: "Shaped like a tiny barrel. It smells of sassafras and vanilla." },
        { name: "Sugar Cube Boxfish", xp: 46, gold: 23, desc: "Perfectly square and white. It dissolves slowly if left in still water." },
        { name: "Bubble Gum Betta", xp: 48, gold: 24, desc: "Pink and stretchy. It can blow bubbles with its mouth to intimidate rivals." },
        { name: "Straw Sucker Eel", xp: 50, gold: 25, desc: "Long, thin, and hollow. It sucks up nectar from underwater flowers." },
        { name: "Ice Cube Flounder", xp: 52, gold: 26, desc: "Transparent and cold. It floats near the surface to cool down the soda." },
        { name: "Syrup Drip Danio", xp: 54, gold: 27, desc: "It leaves a trail of thick, slow moving syrup. It moves sluggishly in cold water." },
        { name: "Pop Rock Fry", xp: 56, gold: 28, desc: "They explode with a popping sound when eaten. Predators avoid them." },
        { name: "Gummy Worm Loach", xp: 58, gold: 29, desc: "Colorful and segmented. It wiggles through the sugar sand bottom." }
      ],
      Uncommon: [
        { name: "Ginger Ale Pike", xp: 90, gold: 54, desc: "Gold and bubbly. It has a spicy kick that cures stomach aches." },
        { name: "Cherry Bomb Bass", xp: 93, gold: 56, desc: "Red and round. It attacks with sudden bursts of speed like an explosion." },
        { name: "Grape Soda Gar", xp: 96, gold: 58, desc: "Purple and long. It stains everything it touches." },
        { name: "Cream Soda Carp", xp: 99, gold: 60, desc: "Pale vanilla color. It is smooth and creamy to the touch." },
        { name: "Bottle Cap Turtle", xp: 102, gold: 62, desc: "Its shell looks like a crimped metal bottle cap. It clamps down tight." },
        { name: "Mentos Ray", xp: 105, gold: 64, desc: "White and disc shaped. If it touches diet soda water, it causes a geyser." },
        { name: "Caffeine Jitter Eel", xp: 108, gold: 66, desc: "It vibrates constantly. It never sleeps and moves at a blur." },
        { name: "Licorice Whip Snake", xp: 111, gold: 68, desc: "Black and twisted. Some find it delicious, others find it repulsive." },
        { name: "Sherbet Swirl Trout", xp: 114, gold: 70, desc: "Pastel colored swirls. It changes flavor depending on the water temperature." },
        { name: "Candy Corn Cone Snail", xp: 117, gold: 72, desc: "Tri colored shell. It shoots a dart of pure sugar syrup." }
      ],
      Fine: [
        { name: "High Fructose Sturgeon", xp: 180, gold: 108, desc: "A massive fish fueled by corn syrup. It has unlimited stamina." },
        { name: "Blue Raspberry Barracuda", xp: 185, gold: 113, desc: "Electric blue. It dyes the water around it when it attacks." },
        { name: "Vanilla Bean Catfish", xp: 190, gold: 118, desc: "Black specks on a white body. It smells like a bakery." },
        { name: "Sour Patch Ray", xp: 195, gold: 123, desc: "Covered in sour sugar crystals. First it's sour, then it's sweet." },
        { name: "Hard Candy Crab", xp: 200, gold: 128, desc: "Its shell is transparent colored glass. It shatters if hit hard enough." },
        { name: "Jawbreaker Grouper", xp: 205, gold: 133, desc: "Layered with different colors. Its skin is impenetrable." },
        { name: "Cotton Candy Jellyfish", xp: 210, gold: 138, desc: "Pink fluff that dissolves in water. It floats in the air above the falls." },
        { name: "Peppermint Swirl Marlin", xp: 215, gold: 143, desc: "Red and white stripes. It spears prey with a candy cane bill." }
      ],
      Rare: [
        { name: "Golden Ticket Tuna", xp: 360, gold: 216, desc: "A fish made of gold foil. It is the prize every angler wants." },
        { name: "Everlasting Gobstopper Turtle", xp: 370, gold: 221, desc: "It changes color every hour. Its shell never wears down." },
        { name: "Chocolate River Eel", xp: 380, gold: 226, desc: "Thick and brown. It swims in the slow, sludge like currents." },
        { name: "Marshmallow Manatee", xp: 390, gold: 231, desc: "Soft, white, and squishy. It floats peacefully, eating sugar cane." },
        { name: "Rock Candy Lobster", xp: 400, gold: 236, desc: "Covered in jagged crystals. It grows in sugar saturated caves." },
        { name: "Licorice Allsorts Flounder", xp: 410, gold: 241, desc: "Blocky and layered with black and pink. It looks synthetic." },
        { name: "Pixie Stick Needlefish", xp: 420, gold: 246, desc: "A tube of colored paper filled with sugar. It shoots powder." },
        { name: "Taffy Pull Shark", xp: 430, gold: 251, desc: "It stretches its prey before eating. Its jaws are incredibly sticky." }
      ],
      Epic: [
        { name: "Titan Soda Whale", xp: 720, gold: 360, desc: "A whale that spouts carbonated fountains. It is the source of the fizz." },
        { name: "Gingerbread House Hermit Crab", xp: 745, gold: 375, desc: "It carries an entire gingerbread house on its back. It adds icing to repair it." },
        { name: "Jelly Bean Giant Squid", xp: 770, gold: 390, desc: "Each tentacle is a different flavor. It is colorful and terrifying." },
        { name: "Lollipop Hammerhead", xp: 795, gold: 405, desc: "Its head is a giant swirl lollipop. It smashes crabs with a sweet crunch." },
        { name: "Mint Chocolate Chip Ray", xp: 820, gold: 420, desc: "Green with dark chips. It cools the water around it." },
        { name: "Caramel Apple Angler", xp: 845, gold: 435, desc: "Its lure is a sticky caramel apple. Fish get stuck to it." },
        { name: "Gumball Machine Turtle", xp: 870, gold: 450, desc: "Its shell is a glass globe filled with colorful eggs. It rattles." },
        { name: "Sarsaparilla Serpent", xp: 895, gold: 465, desc: "An old fashioned flavor. It has a medicinal scent." }
      ],
      Legendary: [
        { name: "The Sugar Plum Fairy Fish", xp: 1620, gold: 810, desc: "Delicate, purple, and magical. It dances through the waterfalls." },
        { name: "King Candy Carp", xp: 1670, gold: 840, desc: "A carp made of hard candy and crown jewels. It rules the sweet kingdom." },
        { name: "Spirit of Carbonation", xp: 1720, gold: 870, desc: "A collection of bubbles that form a fish. It is effervescent life." },
        { name: "The Glass Bottle Ship Fish", xp: 1770, gold: 900, desc: "A fish trapped inside a glass bottle. It sails the soda seas." },
        { name: "Infinite Fizz Coelacanth", xp: 1820, gold: 930, desc: "A prehistoric fish that has been fizzing for millions of years." }
      ],
      Mythic: [
        { name: "Cola Stream Dragon", xp: 3960, gold: 1980, desc: "A dragon made of dark, bubbling cola. Its breath acts like acid on teeth." },
        { name: "Candy Cane Hydra", xp: 4060, gold: 2030, desc: "A hydra with red and white striped necks. If you break a head off, it snaps like candy." },
        { name: "Gelatinous Cube Blob", xp: 4160, gold: 2080, desc: "A massive cube of green jello. It absorbs everything in its path." },
        { name: "Sugar Rush Shark", xp: 4260, gold: 2130, desc: "A shark moving at vibrating speeds. It crashes after a frenzy." },
        { name: "Bubble Tea Leviathan", xp: 4360, gold: 2180, desc: "A massive creature filled with giant tapioca pearls. It shoots them like cannonballs." }
      ],
      Exotic: [
        { name: "Ghost Soda Ray", xp: 12600, gold: 6300, desc: "A ray made of clear soda that exists but has no substance. It tastes like nothing." },
        { name: "Hyper Color Starfish", xp: 13100, gold: 6550, desc: "It shifts colors rapidly, inducing seizures. It is pure sugar energy." },
        { name: "Atomic Fizz Tetra", xp: 13600, gold: 6800, desc: "A bubble that is both popped and unpopped. It defies physics." }
      ],
      Arcane: [
        { name: "Great Molar Crab", xp: 63000, gold: 36000, desc: "A giant, sentient crab with a shell shaped like a tooth. It aches with the sugar of a thousand worlds." }
      ]
    }
  },
  18: {
    name: "The Sizzle Spice River",
    unlockLevel: 2000,
    unlockGold: 20000000,
    boatRequired: null,
    boatPrice: 0,
    description: "Leaving the sweetness behind, the river turns a deep, angry red. The air grows hot and spicy, stinging the eyes. This is the Sizzle Spice River, a flowing torrent of chili oil, curry, and broth. Giant peppers grow on the banks, and the fish here are hot to the touch, evolved to survive the capsaicin rich waters.",
    fish: {
      Common: [
        { name: "Chili Flake Minnow", xp: 37, gold: 18, desc: "Red, flat, and dry. Swarms of them look like shaken spice." },
        { name: "Peppercorn Fry", xp: 39, gold: 19, desc: "Black, round, and hard. They sneeze when pulled from the water." },
        { name: "Garlic Clove Goby", xp: 41, gold: 20, desc: "White and pungent. It wards off vampire fish." },
        { name: "Saffron Thread Tetra", xp: 43, gold: 21, desc: "Thin, red gold, and incredibly valuable for its size. It colors the water around it." },
        { name: "Curry Powder Chub", xp: 45, gold: 22, desc: "Yellow and dusty looking. It camouflages in turmeric clouds." },
        { name: "Jalapeno Popper Barb", xp: 47, gold: 23, desc: "Green and filled with cheese. It explodes if squeezed." },
        { name: "Cinnamon Stick Eel", xp: 49, gold: 24, desc: "Brown and curled like bark. It hides in the spicy sediment." },
        { name: "Star Anise Ray", xp: 51, gold: 25, desc: "Shaped like an eight pointed star. It smells like licorice and heat." },
        { name: "Ginger Root Carp", xp: 53, gold: 26, desc: "Knobby and beige. It heals the ailments of other fish." },
        { name: "Paprika Dust Danio", xp: 55, gold: 27, desc: "Smoky red. It creates a cloud of spice when threatened." },
        { name: "Cumin Seed Bleak", xp: 57, gold: 28, desc: "Tiny and striped. It has an earthy scent." },
        { name: "Wasabi Pea Puffer", xp: 59, gold: 29, desc: "Bright green and round. Eating it clears your sinuses instantly." }
      ],
      Uncommon: [
        { name: "Habanero Jack Bass", xp: 92, gold: 55, desc: "Orange and wrinkled. Its slime coat is pure capsaicin oil." },
        { name: "Tabasco Bottle Squid", xp: 95, gold: 57, desc: "Red and distinctively shaped. It squirts hot sauce instead of ink." },
        { name: "Sriracha Rooster Fish", xp: 98, gold: 59, desc: "Red with a green fin. It crows underwater." },
        { name: "Ghost Pepper Shark", xp: 101, gold: 61, desc: "Pale and terrifying. Its bite burns for days." },
        { name: "Mustard Gas Catfish", xp: 104, gold: 63, desc: "Yellow and toxic. It releases a stinging cloud from its gills." },
        { name: "Horseradish Root Pike", xp: 107, gold: 65, desc: "White and rough. It grinds its prey against rocks." },
        { name: "Kimchi Ferment Trout", xp: 110, gold: 67, desc: "Red and cabbage like fins. It bubbles with fermentation gases." },
        { name: "Curry Leaf Flounder", xp: 113, gold: 69, desc: "Green and leaf shaped. It drifts in the spicy broth." },
        { name: "Masala Mix Marlin", xp: 116, gold: 71, desc: "A complex blend of flavors. It is the spice of life." },
        { name: "Scoville Scale Eel", xp: 119, gold: 73, desc: "Its heat rating increases as it gets older. Elders are untouchable." }
      ],
      Fine: [
        { name: "Carolina Reaper Ray", xp: 185, gold: 111, desc: "Red with a stinging tail barb. One sting can hospitalize a whale." },
        { name: "Tandoori Chicken Fish", xp: 190, gold: 116, desc: "Bright red and charred at the edges. It lives in clay ovens underwater." },
        { name: "Five Spice Turtle", xp: 195, gold: 121, desc: "Its shell has five distinct sections, each smelling of a different spice." },
        { name: "Chili Oil Arowana", xp: 200, gold: 126, desc: "Slick and red. It leaps from the water to catch spicy flies." },
        { name: "Vindaloo Viper Fish", xp: 205, gold: 131, desc: "A deep sea fish adapted to the intense heat of the vindaloo currents." },
        { name: "Gochujang Goby", xp: 210, gold: 136, desc: "Thick, red, and savory. It sticks to rocks." },
        { name: "Piri Piri Piranha", xp: 215, gold: 141, desc: "Small but packs a huge punch. It swarms in spicy frenzies." },
        { name: "Chipotle Smoke Gar", xp: 220, gold: 146, desc: "Dried and smoked. It has a tough, leathery hide." }
      ],
      Rare: [
        { name: "Dragon Breath Chili Eel", xp: 370, gold: 222, desc: "It breathes literal fire underwater. The water boils around it." },
        { name: "Sichuan Pepper Ray", xp: 380, gold: 227, desc: "Numbing and tingling. Touching it puts your arm to sleep." },
        { name: "Hot Pot Lobster", xp: 390, gold: 232, desc: "Red and already cooked. It lives in the boiling springs." },
        { name: "Flaming Hot Cheeto Fish", xp: 400, gold: 237, desc: "Lumpy, red, and dusted with powder. It leaves red stains everywhere." },
        { name: "Buffalo Wing Shark", xp: 410, gold: 242, desc: "Orange and tangy. It prefers the company of blue cheese fish." },
        { name: "Cayenne Cloud Jellyfish", xp: 420, gold: 247, desc: "A cloud of red dust. Swimming through it blinds you." },
        { name: "Paprika Smoked Salmon", xp: 430, gold: 252, desc: "Cured and preserved. It migrates through smoke plumes." },
        { name: "Thai Chili Tiger Fish", xp: 440, gold: 257, desc: "Small, slender, and extremely aggressive. It strikes the eyes." }
      ],
      Epic: [
        { name: "Titan Wok Turtle", xp: 740, gold: 370, desc: "Its shell is a giant black iron wok. It cooks food on its back." },
        { name: "Inferno Curry Carp", xp: 765, gold: 385, desc: "A carp made of boiling curry sauce. It melts nets." },
        { name: "Magma Spice Kraken", xp: 790, gold: 400, desc: "A squid that squirts liquid lava. It lives in the volcano's throat." },
        { name: "Spicy Tuna Roll Fish", xp: 815, gold: 415, desc: "A cylindrical fish wrapped in seaweed. It is spicy inside." },
        { name: "Burrito Bison Fish", xp: 840, gold: 430, desc: "A massive, wrapped fish. It charges like a bull." },
        { name: "Pepper Spray Squid", xp: 865, gold: 445, desc: "Its ink is weapon grade pepper spray. It incapacitates whales." },
        { name: "Garam Masala Grouper", xp: 890, gold: 460, desc: "A complex blend of flavors in fish form. It is aromatic and heavy." },
        { name: "Scotch Bonnet Shark", xp: 915, gold: 475, desc: "Shaped like a lantern pepper. It glows with heat." }
      ],
      Legendary: [
        { name: "The Carolina Reaper", xp: 1665, gold: 832, desc: "The hottest fish in existence. Touching it causes skin to blister. It is death in red scales." },
        { name: "Spice Trade Ship Fish", xp: 1715, gold: 862, desc: "A fish carrying the wealth of the spice islands. It smells of cinnamon and cloves." },
        { name: "The Iron Chef", xp: 1765, gold: 892, desc: "A fish with knife like fins. It slices and dices its prey." },
        { name: "Spirit of Capaicin", xp: 1815, gold: 922, desc: "A fiery ghost that burns the soul. It is the essence of heat." },
        { name: "The Golden Curry Goat Fish", xp: 1865, gold: 952, desc: "A goat fish that tastes of the finest curry. It is a divine meal." }
      ],
      Mythic: [
        { name: "Volcano Nacho Dragon", xp: 4070, gold: 2035, desc: "A dragon made of chips and cheese, emerging from a salsa volcano. It is a messy eater." },
        { name: "Curry Pot Leviathan", xp: 4170, gold: 2085, desc: "A whale that contains a simmering stew. It feeds the world." },
        { name: "Scoville Overload Hydra", xp: 4270, gold: 2135, desc: "Each head is a different chili pepper. The heat increases with each head cut off." },
        { name: "Spice Worm of Arrakis", xp: 4370, gold: 2185, desc: "A giant sand worm adapted to spicy river sediment. It controls the spice." },
        { name: "Chili Sauce Siren", xp: 4470, gold: 2235, desc: "Red and alluring. Her kiss burns your lips off." }
      ],
      Exotic: [
        { name: "Plasma Spice Ray", xp: 12950, gold: 6475, desc: "Heat so intense it becomes plasma. It cuts through steel boats." },
        { name: "Multi Flavor Flounder", xp: 13450, gold: 6725, desc: "It tastes like everything and nothing at once. It confuses the tongue." },
        { name: "Eternal Burn Eel", xp: 13950, gold: 6975, desc: "The burn never fades. It is a curse given form." }
      ],
      Arcane: [
        { name: "Entropy Flame Dragon", xp: 64750, gold: 37000, desc: "A being of pure thermal energy. It is the final end of the universe, served spicy." }
      ]
    }
  },
  19: {
    name: "The Baker's Bay",
    unlockLevel: 2250,
    unlockGold: 22500000,
    boatRequired: null,
    boatPrice: 0,
    description: "The spicy river cools and thickens into a slow moving bay of yeast and flour. The Baker's Bay smells of fresh bread, vanilla, and warm ovens. Islands of sourdough rise from the milky water, and the fish here are soft, puffy, and golden brown.",
    fish: {
      Common: [
        { name: "Dough Ball Minnow", xp: 38, gold: 19, desc: "Round and soft. It expands if left in warm water." },
        { name: "Yeast Spore Fry", xp: 40, gold: 20, desc: "Tiny particles of life. They cause the water to bubble and rise." },
        { name: "Crumb Scale Goby", xp: 42, gold: 21, desc: "Covered in breadcrumbs. It is crunchy on the outside." },
        { name: "Flour Dust Tetra", xp: 44, gold: 22, desc: "White and powdery. It leaves a cloud of flour when it darts away." },
        { name: "Pretzel Twist Eel", xp: 46, gold: 23, desc: "Knotted and salty. It moves by rolling rather than swimming." },
        { name: "Sesame Seed Chub", xp: 48, gold: 24, desc: "Speckled with seeds. It has a nutty flavor." },
        { name: "Bagel Ring Ray", xp: 50, gold: 25, desc: "Round with a hole in the middle. It glides like a frisbee." },
        { name: "Croissant Moon Betta", xp: 52, gold: 26, desc: "Its body is flaky and layered. It curves like a crescent moon." },
        { name: "Baguette Pike", xp: 54, gold: 27, desc: "Long, stiff, and crusty. It rams its prey." },
        { name: "Muffin Top Molly", xp: 56, gold: 28, desc: "It has a large, overflowing dorsal fin. It floats top heavy." },
        { name: "Donut Hole Danio", xp: 58, gold: 29, desc: "Small, round, and sweet. Schools of them look like a box of treats." },
        { name: "Rye Bread Rasbora", xp: 60, gold: 30, desc: "Dark and striped with caraway seeds. It prefers cooler waters." }
      ],
      Uncommon: [
        { name: "Sourdough Starter Shark", xp: 95, gold: 57, desc: "A bubbling, fermenting shark. It is acidic and alive." },
        { name: "Cinnamon Roll Snail", xp: 98, gold: 59, desc: "Its shell is a spiral of cinnamon pastry. It leaves a sticky trail." },
        { name: "Ginger Snap Turtle", xp: 101, gold: 61, desc: "Hard, spicy, and snappy. Its shell cracks like a cookie." },
        { name: "Pumpernickel Puffer", xp: 104, gold: 63, desc: "Dark and dense. It sinks like a stone." },
        { name: "Focaccia Flatfish", xp: 107, gold: 65, desc: "Dimpled with olive oil and herbs. It blends into the sandy bottom." },
        { name: "Brioche Bun Bass", xp: 110, gold: 67, desc: "Golden, buttery, and light. It floats effortlessly." },
        { name: "Macaron Clam", xp: 113, gold: 69, desc: "Its shell comes in pastel colors. It holds a sweet filling." },
        { name: "Eclair Eel", xp: 116, gold: 71, desc: "Long and filled with cream. Chocolate stripes run down its back." },
        { name: "Challah Braid Carp", xp: 119, gold: 73, desc: "Its body is woven in a beautiful braid. It is a ceremonial fish." },
        { name: "Pita Pocket Fish", xp: 122, gold: 75, desc: "It can open its body to store food or hide young. A living pouch." }
      ],
      Fine: [
        { name: "Wedding Cake Whitefish", xp: 190, gold: 114, desc: "Layered, white, and ornate. It swims in tiered schools." },
        { name: "Fruit Tart Turtle", xp: 195, gold: 119, desc: "Its shell is topped with glazed fruit. Birds try to peck at it." },
        { name: "Apple Pie Stingray", xp: 200, gold: 124, desc: "Round with a lattice pattern on its back. It smells of cinnamon and apples." },
        { name: "Cannoli Catfish", xp: 205, gold: 129, desc: "A tube shaped fish with a ricotta white belly. Its whiskers are pistachios." },
        { name: "Baklava Barracuda", xp: 210, gold: 134, desc: "Layered with honey and nuts. It is sticky and sharp." },
        { name: "Crepe Paper Ray", xp: 215, gold: 139, desc: "Thin as paper and folded. It can envelope prey completely." },
        { name: "Scone Stone Fish", xp: 220, gold: 144, desc: "Hard, dry, and crumbly. It camouflages as a rock." },
        { name: "Shortbread Shark", xp: 225, gold: 149, desc: "Buttery and crumbly. It leaves a trail of crumbs." }
      ],
      Rare: [
        { name: "Gingerbread Man Fish", xp: 380, gold: 228, desc: "It swims fast. You can't catch him, he's the gingerbread fish." },
        { name: "Devil's Food Cake Ray", xp: 390, gold: 233, desc: "Dark chocolate and sinful. It tempts dieters." },
        { name: "Angel Food Cake Ray", xp: 400, gold: 238, desc: "White, fluffy, and light as air. It flies above the water." },
        { name: "Red Velvet Manta", xp: 410, gold: 243, desc: "Deep red with white markings. It is elegant and smooth." },
        { name: "Panettone Puffer", xp: 420, gold: 248, desc: "Tall and studded with candied fruit. It only appears during holidays." },
        { name: "Tiramisu Turtle", xp: 430, gold: 253, desc: "Layered with coffee and cocoa. It gives a caffeine buzz." },
        { name: "Churro Eel", xp: 440, gold: 258, desc: "Ridged and dusted with cinnamon sugar. It is long and sweet." },
        { name: "Empanada Ray", xp: 450, gold: 263, desc: "A folded ray with a crimped edge. It is full of meat." }
      ],
      Epic: [
        { name: "Titan Loaf Whale", xp: 760, gold: 380, desc: "A whale shaped like a giant loaf of bread. It rises like dough." },
        { name: "Croquembouche Tower Crab", xp: 785, gold: 395, desc: "A hermit crab that lives in a tower of cream puffs bound by caramel." },
        { name: "Black Forest Cake Shark", xp: 810, gold: 410, desc: "Dark chocolate with cherry eyes. It hunts in the whipped cream woods." },
        { name: "Lemon Meringue Pie Ray", xp: 835, gold: 425, desc: "Yellow with peaks of toasted meringue. It is tart and sweet." },
        { name: "Sticky Bun Octopus", xp: 860, gold: 440, desc: "A swirl of sticky dough and pecans. It gums up boat propellers." },
        { name: "Baguette Swordfish", xp: 885, gold: 455, desc: "A swordfish with a stale baguette for a bill. It hits harder than steel." },
        { name: "Fondant Fancy Fish", xp: 910, gold: 470, desc: "Perfectly smooth and brightly colored. It looks fake." },
        { name: "Souffle Puffer", xp: 935, gold: 485, desc: "It puffs up huge but collapses if you make a loud noise." }
      ],
      Legendary: [
        { name: "The Great Wedding Cake", xp: 1710, gold: 855, desc: "A massive, multi tiered structure that is alive. It is the centerpiece of the bay." },
        { name: "Master Baker's Yeast", xp: 1760, gold: 885, desc: "A living blob of pure culture. It is the mother of all dough." },
        { name: "The Golden Croissant", xp: 1810, gold: 915, desc: "A fish so buttery it shines like gold. It flakes apart when touched." },
        { name: "Ancient Grain Guardian", xp: 1860, gold: 945, desc: "A stone like fish made of ancient grains. It is healthy but hard to catch." },
        { name: "Spirit of the Oven", xp: 1910, gold: 975, desc: "A fiery ghost that radiates warmth and the smell of baking bread." }
      ],
      Mythic: [
        { name: "Dough Boy Leviathan", xp: 4180, gold: 2090, desc: "A giant, soft, white monster. Poke its belly and it giggles, then eats you." },
        { name: "Gingerbread House Hydra", xp: 4280, gold: 2140, desc: "A witch's house come to life. Its heads are candy snakes." },
        { name: "Flour Storm Dragon", xp: 4380, gold: 2190, desc: "A white dragon that creates blinding flour storms. It sneezes fire." },
        { name: "Yeast Rise Kraken", xp: 4480, gold: 2240, desc: "It expands constantly. It threatens to overflow the bay." },
        { name: "Chocolate Fondue Serpent", xp: 4580, gold: 2290, desc: "A river of chocolate given form. It coats everything in sweet darkness." }
      ],
      Exotic: [
        { name: "Void Chocolate Turtle", xp: 13300, gold: 6650, desc: "Dense enough to have its own gravity. It is the ultimate chocolate experience." },
        { name: "Butter Toast Catfish", xp: 13800, gold: 6900, desc: "A fish that lands butter side up and down simultaneously. It spins forever." },
        { name: "Galaxy Cookie Ray", xp: 14300, gold: 7150, desc: "Sprinkled with stars. It tastes like the cosmos." }
      ],
      Arcane: [
        { name: "Loaf Mother Whale", xp: 66500, gold: 38000, desc: "The concept of sustenance given form. A simple, perfect loaf of light. To catch it is to never hunger again." }
      ]
    }
  },
  20: {
    name: "The Banquet of Titans",
    unlockLevel: 2500,
    unlockGold: 25000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The journey culminates in a hall the size of a continent, a flooded feast table set for gods. The Banquet of Titans is a landscape of giant roasted meats, overflowing goblets of wine, and mountains of fruit. The water is rich gravy and wine. The fish here are gluttonous monsters, embodying the sin of excess.",
    fish: {
      Common: [
        { name: "Gravy Boat Minnow", xp: 39, gold: 19, desc: "Brown and savory. It swims in the thick, meaty currents." },
        { name: "Pea Pod Fry", xp: 41, gold: 20, desc: "Green and round. They float in the gravy like garnish." },
        { name: "Corn Kernel Cob Fish", xp: 43, gold: 21, desc: "Yellow and square. It lives in the giant corn cob reefs." },
        { name: "Mashed Potato Goby", xp: 45, gold: 22, desc: "White and fluffy. It blends into the potato mountains." },
        { name: "Cranberry Sauce Tetra", xp: 47, gold: 23, desc: "Gelatinous and red. It retains the shape of the can it came from." },
        { name: "Bone Marrow Eel", xp: 49, gold: 24, desc: "It lives inside the giant hollow bones of the roast beasts. Rich and fatty." },
        { name: "Wine Drop Betta", xp: 51, gold: 25, desc: "Deep burgundy color. It gets drunk on the environment." },
        { name: "Olive Pit Puffer", xp: 53, gold: 26, desc: "Black and hard. It shoots its pit at predators." },
        { name: "Gristle Gargoyle Sculpin", xp: 55, gold: 27, desc: "Made of tough, chewy gristle. It is inedible." },
        { name: "Salt Crystal Shiner", xp: 57, gold: 28, desc: "White and cuboid. It forms crusts on the edge of the plate." },
        { name: "Pepper Grinder Pike", xp: 59, gold: 29, desc: "It twists its body to grind its prey. It sneezes often." },
        { name: "Toothpick Needlefish", xp: 61, gold: 30, desc: "Wooden and sharp. It impales hors d'oeuvres." }
      ],
      Uncommon: [
        { name: "Roast Chicken Carp", xp: 97, gold: 58, desc: "Golden brown skin. It smells of rosemary and thyme." },
        { name: "Ham Hock Grouper", xp: 100, gold: 60, desc: "Pink and salty with a thick layer of fat. It is a favorite of the Titans." },
        { name: "Sausage Link Eel", xp: 103, gold: 62, desc: "A chain of sausages that swims. It breaks apart to escape." },
        { name: "Steak Knife Gar", xp: 106, gold: 64, desc: "Serrated and sharp. It saws through meat." },
        { name: "Meatball Puffer", xp: 109, gold: 66, desc: "Round, brown, and spicy. It rolls down the spaghetti hills." },
        { name: "Spaghetti Worm Eel", xp: 112, gold: 68, desc: "Long, thin, and tangled. It hides in the pasta nests." },
        { name: "Shrimp Cocktail Prawn", xp: 115, gold: 70, desc: "Cold and pink. It hangs on the rim of giant glass bowls." },
        { name: "Oyster Platter Ray", xp: 118, gold: 72, desc: "Flat and grey. It carries pearls on its back." },
        { name: "Deviled Egg Ray", xp: 121, gold: 74, desc: "White with a yellow center. It smells of sulfur." },
        { name: "Pickle Spear Pike", xp: 124, gold: 76, desc: "Green and bumpy. It swims in the vinegar jars." }
      ],
      Fine: [
        { name: "Prime Rib Piranha", xp: 195, gold: 117, desc: "Red and marbled with fat. It eats only the best cuts." },
        { name: "Lobster Thermidor Crustacean", xp: 200, gold: 122, desc: "A lobster covered in rich cream sauce and cheese. It is heavy and slow." },
        { name: "Caviar Cluster Sturgeon", xp: 205, gold: 127, desc: "A fish made of black eggs. It is worth a fortune." },
        { name: "Foie Gras Goose Fish", xp: 210, gold: 132, desc: "Fatty and rich. It is banned in some realms." },
        { name: "T Bone Shark", xp: 215, gold: 137, desc: "Shaped like a steak. The bone acts as armor." },
        { name: "Rack of Lamb Ray", xp: 220, gold: 142, desc: "Its ribs curve up like a crown. It is tender and mild." },
        { name: "Escargot Snail", xp: 225, gold: 147, desc: "Lives in a garlic butter shell. A delicacy." },
        { name: "Champagne Bubble Bass", xp: 230, gold: 152, desc: "Golden and effervescent. It pops when caught." }
      ],
      Rare: [
        { name: "Thanksgiving Turkey Whale", xp: 390, gold: 234, desc: "A massive bird fish. It makes a gobbling sound underwater." },
        { name: "Christmas Ham Turtle", xp: 400, gold: 239, desc: "Glazed with honey and studded with cloves. It is festive and slow." },
        { name: "Kebab Skewer Swordfish", xp: 410, gold: 244, desc: "Its bill skewers vegetables and meat chunks. It carries its own lunch." },
        { name: "Sushi Roll Flounder", xp: 420, gold: 249, desc: "Rolled up with rice and seaweed. It is raw and fresh." },
        { name: "Dumpling Squid", xp: 430, gold: 254, desc: "Soft and filled with pork. It steams in hot water." },
        { name: "Taco Shell Clam", xp: 440, gold: 259, desc: "A hard corn shell filled with meat and lettuce. It crunches." },
        { name: "Burger Patty Ray", xp: 450, gold: 264, desc: "Round and brown. It lies on bun like sponges." },
        { name: "French Fry Eel", xp: 460, gold: 269, desc: "Golden and salty. It schools in a red paper cup." }
      ],
      Epic: [
        { name: "Titan Roast Boar Fish", xp: 780, gold: 390, desc: "A giant fish with an apple in its mouth. It is the centerpiece of the feast." },
        { name: "Cornucopia Crab", xp: 805, gold: 405, desc: "Its shell is a horn of plenty. Food spills out of it constantly." },
        { name: "Wine Cask Whale", xp: 830, gold: 420, desc: "A wooden whale filled with vintage wine. It leaks purple trails." },
        { name: "Buffet Line Serpent", xp: 855, gold: 435, desc: "An endless snake of chafing dishes. It keeps the food warm." },
        { name: "Silver Platter Ray", xp: 880, gold: 450, desc: "A giant silver disc. It serves other fish to the Titans." },
        { name: "Crystal Decanter Squid", xp: 905, gold: 465, desc: "Glassy and fragile. It holds the finest spirits." },
        { name: "Napkin Fold Manta", xp: 930, gold: 480, desc: "Folded into a swan shape. It cleans up the mess." },
        { name: "Finger Bowl Piranha", xp: 955, gold: 495, desc: "It washes the sins (and flesh) from your fingers." }
      ],
      Legendary: [
        { name: "The King's Goblet", xp: 1755, gold: 877, desc: "A golden grail fish. Drinking from the water around it grants strength." },
        { name: "The Main Course", xp: 1805, gold: 907, desc: "A fish so delicious wars have been fought over it. It smells of perfection." },
        { name: "Spirit of Gluttony", xp: 1855, gold: 937, desc: "A fat, laughing ghost. It encourages you to take one more bite." },
        { name: "Ancient Table Cloth Ray", xp: 1905, gold: 967, desc: "A white ray that covers the ocean floor. It is stained with wine and history." },
        { name: "The Last Supper Fish", xp: 1955, gold: 997, desc: "A holy fish. It multiplies to feed the multitude." }
      ],
      Mythic: [
        { name: "Feast Master Gargantua", xp: 4290, gold: 2145, desc: "A giant humanoid mouth that swims. It eats entire biomes." },
        { name: "Wine Dark Sea Serpent", xp: 4390, gold: 2195, desc: "A serpent made of ancient wine. It brings intoxication and madness." },
        { name: "Ambrosia Leviathan", xp: 4490, gold: 2245, desc: "It bleeds the food of the gods. Catching it grants godhood." },
        { name: "Horn of Plenty Hydra", xp: 4590, gold: 2295, desc: "Each head vomits a different food group. It buries you in abundance." },
        { name: "Eternal Banquet Crab", xp: 4690, gold: 2345, desc: "A crab that is also a table. The feast never ends on its back." }
      ],
      Exotic: [
        { name: "Singularity Donut Eel", xp: 13650, gold: 6825, desc: "A donut so dense light cannot escape. It tastes like infinite chocolate." },
        { name: "Primeval Burger Crab", xp: 14150, gold: 7075, desc: "The burger that started the universe. It is still cooking." },
        { name: "Chronos Wine Serpent", xp: 14650, gold: 7325, desc: "Wine aged for negative time. Drinking it makes you younger." }
      ],
      Arcane: [
        { name: "Gluttony God Angler", xp: 68250, gold: 39000, desc: "The hunger of the universe given form. A massive, insatiable mouth that eats stars. Catching it is to feed the void." }
      ]
    }
  },
  21: {
    name: "The Chlorophyll Canopy",
    unlockLevel: 2750,
    unlockGold: 30000000,
    boatRequired: null,
    boatPrice: 0,
    description: "Leaving the previous zone, the water turns a vibrant, translucent green. Massive, translucent kelp leaves resembling giant lettuce and spinach drift in the current. The sunlight filters through the vegetation, creating a cathedral of photosynthesis where fish mimic leaves to survive.",
    fish: {
      Common: [
        { name: "Lactuca Carp", xp: 35, gold: 18, desc: "A round, green fish with ruffles of skin that perfectly resemble iceberg lettuce leaves. It drifts aimlessly in the current to mimic floating vegetation, only moving to snap at insects." },
        { name: "Spinacia Snapper", xp: 37, gold: 19, desc: "A dark green fish with distinct veins running through its scales like a spinach leaf. It snaps its jaw shut on small bugs that land on the water's surface, camouflaged by the canopy." },
        { name: "Brassica Bass", xp: 39, gold: 20, desc: "A sturdy, crinkled fish that looks like a head of kale given life. Its body is dense and layered with thick, waxy scales that provide excellent defense against predators." },
        { name: "Apium Eel", xp: 41, gold: 21, desc: "A long, rigid eel with a pale green body and deep vertical ridges resembling a celery stalk. It hides vertically among the reeds, swaying gently with the water flow." },
        { name: "Allium Angelfish", xp: 43, gold: 22, desc: "A flat, bulbous fish with pearlescent layers of skin that peel away like an onion. It emits a pungent chemical trail when threatened that causes predators' eyes to water." },
        { name: "Asparagus Needlefish", xp: 45, gold: 23, desc: "A slender, spear like fish with a scaled tip that looks like an asparagus bud. It schools in tight, vertical formations, looking like a growing garden patch from above." },
        { name: "Ocimum Tetra", xp: 47, gold: 24, desc: "A small, aromatic fish with broad, smooth fins shaped like basil leaves. It swims in bursts of speed, leaving a faint, peppery scent in the water." },
        { name: "Mentha Minnow", xp: 49, gold: 25, desc: "A cool, bright green fish with jagged edges on its fins like mint leaves. It prefers colder currents and nibbles on algae found on shaded rocks." },
        { name: "Coriandrum Catfish", xp: 51, gold: 26, desc: "A polarizing fish that smells soapy to some and sweet to others. Its whiskers are branched and green, resembling delicate cilantro stems." },
        { name: "Petroselinum Pike", xp: 53, gold: 27, desc: "A predatory fish with curly, frilled scales that camouflage it as a garnish. It strikes swiftly from the cover of dense parsley like moss." }
      ],
      Uncommon: [
        { name: "Italica Grouper", xp: 90, gold: 55, desc: "A heavy bodied fish with a thick, tree like dorsal fin that resembles a broccoli floret. It sits on the bottom, blending in with green coral structures." },
        { name: "Botrytis Cod", xp: 93, gold: 57, desc: "A pale, white fish with a bumpy texture resembling cauliflower curds. It is a slow swimmer that relies on its unappetizing appearance to survive." },
        { name: "Cynara Crab", xp: 96, gold: 59, desc: "A crab with a shell composed of overlapping, pointed green scales like an artichoke. It keeps its soft body tightly protected within the armored heart of its shell." },
        { name: "Pisum Puffer", xp: 99, gold: 61, desc: "A perfectly round, bright green pufferfish that looks exactly like a garden pea. When threatened, it inflates to become too large for most mouths." },
        { name: "Phaseolus Plaice", xp: 102, gold: 63, desc: "A flat, kidney shaped fish with a dark red or brown coloration. It buries itself in the mud, resembling a discarded bean seed." },
        { name: "Fabaceae Flounder", xp: 105, gold: 65, desc: "A long, flat fish that looks like a green bean pod. It ripples its edges to swim, appearing like a drifting legume husk." },
        { name: "Lens Loach", xp: 108, gold: 67, desc: "A tiny, disc shaped fish that schools in the thousands, looking like spilled lentils. They are bottom feeders that scour the mud for nutrients." },
        { name: "Glycine Guppy", xp: 111, gold: 69, desc: "A small, beige fish usually found inside pods of aquatic plants. It mimics the appearance of a soybean to hide from hungry predators." },
        { name: "Cicer Cichlid", xp: 114, gold: 71, desc: "A bumpy, beige fish with a beak like mouth resembling a chickpea. It is aggressive and territorial, ramming intruders with its hard head." },
        { name: "Arachis Anchovy", xp: 117, gold: 73, desc: "A small fish with a textured, hourglass shaped shell pattern like a peanut. It burrows underground to sleep, much like the plant it mimics." }
      ],
      Fine: [
        { name: "Bambusa Barracuda", xp: 180, gold: 110, desc: "A long, segmented fish with hard green scales that resemble a bamboo stalk. It remains perfectly vertical and still until prey swims close enough to strike." },
        { name: "Saccharum Swordfish", xp: 185, gold: 115, desc: "A large predator with a bill that tastes incredibly sweet, attracting smaller fish. Its body is striped purple and green like sugar cane." },
        { name: "Zea Zebrafish", xp: 190, gold: 120, desc: "A yellow fish with rows of large, kernel like scales. It hides in tall yellow seagrass, blending perfectly with the corn like vegetation." },
        { name: "Oryza Oarfish", xp: 195, gold: 125, desc: "A massive, ribbon like fish that looks like a long stalk of rice grass. It shimmers with a golden grain pattern and swims with a mesmerizing wave motion." },
        { name: "Triticum Trout", xp: 200, gold: 130, desc: "A golden brown fish with a tail that resembles a head of wheat. It thrashes during harvest season, creating ripples that look like wind in a field." },
        { name: "Hordeum Halibut", xp: 205, gold: 135, desc: "A rough skinned flatfish with long, whisker like awns trailing from its fins. It camouflages in sandy areas that resemble barley fields." },
        { name: "Avena Arapaima", xp: 210, gold: 140, desc: "A pale, oat colored fish with delicate, flaky scales. It moves slowly and gracefully, often found grazing in open water pastures." },
        { name: "Secale Shark", xp: 215, gold: 145, desc: "A dark, grey brown shark with a rugged, hardy appearance. It thrives in colder waters where other grain mimicking fish cannot survive." }
      ],
      Rare: [
        { name: "Aloe Albacore", xp: 380, gold: 220, desc: "A fleshy, succulent fish with serrated edges and a gel filled interior. Its skin has healing properties, soothing the wounds of fish that rub against it." },
        { name: "Agave Angler", xp: 390, gold: 225, desc: "A spiked fish with a central stalk growing from its head that acts as a lure. It sits motionless for days, mimicking a sharp desert plant." },
        { name: "Cactus Catfish", xp: 400, gold: 230, desc: "A bloated catfish covered in sharp, needle like spines. It stores water in its humps, allowing it to survive in low tide pools." },
        { name: "Succulent Sunfish", xp: 410, gold: 235, desc: "A thick, rounded fish with petal like scales arranged in a rosette pattern. It floats near the surface to absorb maximum sunlight." },
        { name: "Sansevieria Snakehead", xp: 420, gold: 240, desc: "A long, vertical swimming fish with yellow bordered green scales. Its rigid body shape mimics the 'Snake Plant' perfectly." },
        { name: "Echeveria Eel", xp: 430, gold: 245, desc: "A beautiful, rosette shaped eel that coils tightly to look like a flower. Its colors range from pale blue to pink depending on water quality." },
        { name: "Sedum Sturgeon", xp: 440, gold: 250, desc: "A bottom feeder covered in tiny, jelly bean shaped nodes. It creeps along the rocks, looking like a spreading ground cover plant." },
        { name: "Yucca Yellowtail", xp: 450, gold: 255, desc: "A sharp, angular fish with sword like fins. It is extremely tough and can cut through fishing nets with its razor sharp edges." }
      ],
      Epic: [
        { name: "Monstera Marlin", xp: 750, gold: 420, desc: "A majestic fish with large holes and fenestrations in its massive fins. These gaps allow it to swim through strong currents without drag." },
        { name: "Pteridophyte Plaice", xp: 775, gold: 435, desc: "A flatfish with elaborate, lace like patterns on its back that resemble fern fronds. It unrolls its fins when it wakes up, like a fiddlehead." },
        { name: "Bryophyte Bass", xp: 800, gold: 450, desc: "A predatory fish completely covered in fuzzy, green algae. It remains perfectly still on logs, indistinguishable from the wood itself." },
        { name: "Lichen Lamprey", xp: 825, gold: 465, desc: "A parasitic fish with a crusty, textured skin that matches rock surfaces. It attaches to stones and slowly dissolves minerals for food." },
        { name: "Hedera Ide", xp: 850, gold: 480, desc: "A long, climbing fish that wraps its body around underwater structures. It has small rootlets on its belly to grip onto surfaces." },
        { name: "Bonsai Bullhead", xp: 875, gold: 495, desc: "A stunted, ancient looking fish with twisted features and a thick trunk like body. It swims with a slow, deliberate wisdom." },
        { name: "Terrarium Tetra", xp: 900, gold: 510, desc: "A clear bodied fish that contains a miniature ecosystem of algae growing inside it. It is a self sustaining world in a single creature." },
        { name: "Greenhouse Gar", xp: 925, gold: 525, desc: "A fish with glass like scales that trap heat. It creates a warm zone of water around itself, attracting smaller cold blooded prey." }
      ],
      Legendary: [
        { name: "Yggdrasil Yellowfin", xp: 1800, gold: 950, desc: "A gargantuan tuna with patterns of bark and leaves that span its entire body. It is said to connect the surface world to the deep with its migration paths." },
        { name: "Sequoia Shark", xp: 1850, gold: 980, desc: "A shark with skin as thick and red as redwood bark. It grows continuously for centuries, eventually becoming the size of a submarine." },
        { name: "Baobab Barracuda", xp: 1900, gold: 1010, desc: "A fish with a massively swollen belly used to store nutrients. It can survive for years without eating, drifting like a bloated log." },
        { name: "Rhizophora Ray", xp: 1950, gold: 1040, desc: "A ray with rigid, stilt like appendages on its wings. It creates a nursery for smaller fish under its massive, sheltering body." },
        { name: "Salix Salmon", xp: 2000, gold: 1070, desc: "A mournful fish with long, trailing fins that drape down like weeping willow branches. It swims near the surface, its fins dragging in the water." }
      ],
      Mythic: [
        { name: "Photosynthesis Hydra", xp: 4500, gold: 2400, desc: "A multi headed beast made of woven vines, powered solely by sunlight. If one head is cut off, two vine like stumps sprout in its place." },
        { name: "Chloroplast Kraken", xp: 4600, gold: 2450, desc: "A giant squid whose skin cells are filled with active plant matter. It can regenerate any lost tentacle instantly by growing it back like a plant cutting." },
        { name: "Botanical Behemoth", xp: 4700, gold: 2500, desc: "A massive, slow moving creature that carries an entire forest on its back. Roots hang down from its shell, feeding on the nutrients in the water." },
        { name: "Verdant Scylla", xp: 4800, gold: 2550, desc: "A horror of leaves and bark, with wolf heads made of twisted roots. It draws energy from the sun to fuel its relentless attacks." },
        { name: "Evergreen Serpent", xp: 4900, gold: 2600, desc: "A sea serpent covered in sharp, pine needle scales that never fall off. It leaves a trail of refreshing pine scent and cold water wherever it swims." }
      ],
      Exotic: [
        { name: "Solar Siren", xp: 14000, gold: 7500, desc: "A creature that sings a song of sunlight and growth. Plants bloom instantly where she swims." },
        { name: "Lunar Lotus Charybdis", xp: 14500, gold: 7750, desc: "A living whirlpool lined with petals and thorns. It blooms only at night, sucking in water and light to feed its central maw." },
        { name: "Gaia Makara", xp: 15000, gold: 8000, desc: "A hybrid creature with the snout of a crocodile and the tail of a fish, covered in moss. It represents the reclaiming power of nature over the ocean." }
      ],
      Arcane: [
        { name: "Zaratan The World Turtle", xp: 75000, gold: 45000, desc: "A turtle of such immense size that it is mistaken for an island. Forests grow on its shell, and its waking causes earthquakes." }
      ]
    }
  },
  22: {
    name: "The Rooted Riverbeds",
    unlockLevel: 3000,
    unlockGold: 35000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The water darkens to a rich, earthy brown. The seabed is a tangle of massive, exposed roots and buried tubers. Fish here have evolved to dig, burrow, and mimic the heavy, starchy vegetables that grow in the silt.",
    fish: {
      Common: [
        { name: "Daucus Dace", xp: 36, gold: 19, desc: "A bright orange, tapered fish with a tuft of green fin on its head. It burrows head first into the mud, leaving only its leafy tail exposed." },
        { name: "Solanum Salmon", xp: 38, gold: 20, desc: "A lumpy, brown fish with 'eyes' or spots scattered across its skin. It is extremely hardy and can survive in low oxygen mud for days." },
        { name: "Raphanus Ray", xp: 40, gold: 21, desc: "A round, reddish pink ray with a distinct white tail. It creates small craters in the sand that look like vegetable patches." },
        { name: "Beta Betta", xp: 42, gold: 22, desc: "A deep purple red fish with flowing fins that bleed dye into the water. Its color is so intense it can stain the nets of fishermen." },
        { name: "Pastinaca Pike", xp: 44, gold: 23, desc: "A pale, cream colored fish shaped like a long parsnip root. It lies motionless in the silt, striking only when prey touches its sensitive nose." },
        { name: "Napis Bullhead", xp: 46, gold: 24, desc: "A round, purple fish that resembles a turnip. Its skin is tough and bitter, making it unappealing to most predators." },
        { name: "Zingiber Zebrafish", xp: 48, gold: 25, desc: "A knobby, irregular fish with golden skin and a spicy scent. Its body shape is twisted and branched like a ginger root." },
        { name: "Curcuma Carp", xp: 50, gold: 26, desc: "A vivid orange yellow fish that stains the water around it with turmeric like dust. It has anti inflammatory properties and is sought by healers." },
        { name: "Ipomoea Ide", xp: 52, gold: 27, desc: "A fish with orange flesh and a sweet taste, resembling a sweet potato. It is a favorite prey item for larger root beasts." },
        { name: "Dioscorea Dory", xp: 54, gold: 28, desc: "A rough skinned, hairy fish that looks like a yam. It grows very large and heavy, anchoring itself to the riverbed." }
      ],
      Uncommon: [
        { name: "Radix Roach", xp: 95, gold: 58, desc: "A small scavenger fish that gnaws on exposed roots. Its teeth are shovel shaped to help it dig through tough bark." },
        { name: "Rhizome Rockfish", xp: 98, gold: 60, desc: "A fish that connects horizontally to others of its kind via fleshy filaments. They form a living mat on the river floor." },
        { name: "Bulbus Bass", xp: 101, gold: 62, desc: "A fish shaped like a flower bulb, with layers of papery skin. It lies dormant in the winter, burying itself deep in the sediment." },
        { name: "Corm Catfish", xp: 104, gold: 64, desc: "A solid, starch filled fish that feels as heavy as a stone. It uses its weight to crush shellfish on the river bottom." },
        { name: "Tuber Tetra", xp: 107, gold: 66, desc: "A small, lumpy fish that schools in the thousands. They look like a pile of gravel rolling downstream." },
        { name: "Taproot Trout", xp: 110, gold: 68, desc: "A fish with an incredibly long, single tail fin that drills into the mud. It anchors itself against strong currents using this tail." },
        { name: "Fibrous Flounder", xp: 113, gold: 70, desc: "A flatfish covered in hair like rootlets. It collects silt and debris in its 'fur' to create perfect camouflage." },
        { name: "Stolon Sturgeon", xp: 116, gold: 72, desc: "A long fish that produces 'runners'—small clones of itself that detach from its body. It spreads rapidly across the riverbed." },
        { name: "Geophyte Grouper", xp: 119, gold: 74, desc: "A massive fish that stores all its energy underground. It only emerges from the mud once a year to feed." },
        { name: "Caudex Crappie", xp: 122, gold: 76, desc: "A fish with a swollen, woody base to its tail. It looks like a bonsai tree trunk swimming in the water." }
      ],
      Fine: [
        { name: "Manihot Marlin", xp: 190, gold: 120, desc: "A long fish with a rough, bark like skin resembling cassava. It contains trace amounts of cyanide, making it dangerous to eat raw." },
        { name: "Colocasia Cod", xp: 195, gold: 125, desc: "A fish with large, ear like fins that look like taro leaves. It inhabits the muddy banks, digging out burrows with its fins." },
        { name: "Amorphophallus Angelfish", xp: 200, gold: 130, desc: "A strange fish that smells of rotting meat to attract flies. It has a single, large spadix like dorsal fin." },
        { name: "Nelumbo Needlefish", xp: 205, gold: 135, desc: "A fish with holes in its body structure, resembling a lotus root. Water flows through it, making it incredibly aerodynamic." },
        { name: "Pachyrhizus Jack", xp: 210, gold: 140, desc: "A round, crisp fleshed fish with a paper thin skin. It is filled with water and provides hydration to predators." },
        { name: "Kohlrabi Koi", xp: 215, gold: 145, desc: "A strange looking fish with a swollen, sphere like body and protrusions sticking out like stems. It is alien in appearance but gentle in nature." },
        { name: "Rutabaga Ray", xp: 220, gold: 150, desc: "A purple and yellow ray that tastes slightly sweet. It is a cross between a turnip fish and a cabbage fish." },
        { name: "Wasabi Wrasse", xp: 225, gold: 155, desc: "A bright green root fish that delivers a spicy kick. Predatory fish that bite it often spit it out immediately due to the heat." }
      ],
      Rare: [
        { name: "Mandrake Mackerel", xp: 400, gold: 230, desc: "A fish with a face that looks disturbingly human. When pulled from the water, it emits a high pitched scream that can stun the fisherman." },
        { name: "Panax Gar", xp: 410, gold: 235, desc: "A long fish with a forked tail resembling legs. It is believed to grant long life and vitality to those who catch it." },
        { name: "Ashwagandha Anchovy", xp: 420, gold: 240, desc: "A fish that smells like a horse. It provides strength and stress relief, swimming tirelessly against the strongest currents." },
        { name: "Valerian Viperfish", xp: 430, gold: 245, desc: "A sedative fish that puts its prey to sleep with a chemical cloud. It has a calming, earthy aroma." },
        { name: "Echinacea Eel", xp: 440, gold: 250, desc: "A spiny eel with a purple cone like head. It boosts the immune system of the river, eating parasites and disease." },
        { name: "Glycyrrhiza Lungfish", xp: 450, gold: 255, desc: "A black, woody fish with a distinct anise flavor. It can breathe air and survive in dried up mud beds for months." },
        { name: "Sassafras Salmon", xp: 460, gold: 260, desc: "A fish that smells like root beer. Its oils are aromatic and volatile, creating a fizzy foam in the water." },
        { name: "Taraxacum Drum", xp: 470, gold: 265, desc: "A fish with a deep taproot tail that anchors it to the bottom. It is impossible to remove completely; if a piece is left, it regenerates." }
      ],
      Epic: [
        { name: "Kudzu Kingfish", xp: 780, gold: 440, desc: "An invasive fish that grows incredibly fast. It can cover an entire river section in a day, choking out other species." },
        { name: "Lappa Bass", xp: 805, gold: 455, desc: "A fish covered in sticky hooks like a bur. It attaches itself to passing boats and whales to travel vast distances." },
        { name: "Cirsium Tuna", xp: 830, gold: 470, desc: "A prickly fish with sharp spines and a purple flower like crest. It is painful to handle and extremely tenacious." },
        { name: "Urtica Narwhal", xp: 855, gold: 485, desc: "A whale with a tusk covered in stinging hairs. A single brush against it causes burning pain that lasts for days." },
        { name: "Rubus Barracuda", xp: 880, gold: 500, desc: "A thin, thorny fish that forms tangled schools. They create a wall of spines that no predator dares to breach." },
        { name: "Conium Herring", xp: 905, gold: 515, desc: "A deceptively plain fish that is highly poisonous. It mimics safe root fish but contains a deadly toxin." },
        { name: "Solanaceae Nautilus", xp: 930, gold: 530, desc: "A dark purple mollusk with berries growing on its shell. Eating it causes hallucinations and darkness of vision." },
        { name: "Belladonna Bass", xp: 955, gold: 545, desc: "A beautiful but deadly fish with large, dilated eyes. It lures prey in with a sweet scent before delivering a fatal bite." }
      ],
      Legendary: [
        { name: "Yam Yellowtail", xp: 1900, gold: 980, desc: "A giant, orange fleshed fish that is the staple food of the river gods. It grows to the size of a canoe and tastes like honey and earth." },
        { name: "Bark Shark", xp: 1950, gold: 1010, desc: "A shark with skin like tree bark. It lies dormant in the mud for decades, looking like a fallen log, before striking." },
        { name: "Taro Tarpon", xp: 2000, gold: 1040, desc: "A massive, silver fish with scales the size of dinner plates. It leaps from the water to shake off the mud of the riverbed." },
        { name: "Potato Plesiosaur", xp: 2050, gold: 1070, desc: "A prehistoric beast that looks like a giant, swimming tuber. Its skin is covered in eyes that can see in all directions." },
        { name: "Beet Beluga", xp: 2100, gold: 1100, desc: "A white whale stained deep red by the roots it eats. It sprays red water from its blowhole, looking terrifying but remaining gentle." }
      ],
      Mythic: [
        { name: "Mandragora Behemoth", xp: 4700, gold: 2500, desc: "A subterranean monster that screams when the earth moves. It is the root system of the entire biome given life." },
        { name: "Tuber Titan Kraken", xp: 4800, gold: 2550, desc: "A kraken made of heavy, starchy flesh. Its tentacles are roots that burrow into the sea floor, anchoring it against tsunamis." },
        { name: "Mandrake Hydra", xp: 4900, gold: 2600, desc: "A hydra where each head screams a different note. The combined sound is a chaotic symphony that shatters glass and bone." },
        { name: "Root Rot Serpent", xp: 5000, gold: 2650, desc: "A serpent of decay that turns healthy roots into mush. It is the natural enemy of the plants, bringing balance through decomposition." },
        { name: "Taproot Aspidochelone", xp: 5100, gold: 2700, desc: "A giant turtle that looks like an island. A single, massive root extends from its belly deep into the planet's core." }
      ],
      Exotic: [
        { name: "Ginseng Genie Cetus", xp: 14500, gold: 7800, desc: "A mystical whale shaped like a human root. It grants vitality and energy to the waters, causing plants to bloom instantly." },
        { name: "Ginger Golem Scylla", xp: 15000, gold: 8050, desc: "A six headed monster made of knotted, spicy ginger root. It burns anything it touches with intense chemical heat." },
        { name: "Turmeric Tiamat", xp: 15500, gold: 8300, desc: "A dragon of healing spices. Its golden scales cure any disease, and its breath is a cloud of fragrant yellow dust." }
      ],
      Arcane: [
        { name: "Nidhogg World Eater", xp: 78000, gold: 46000, desc: "A horrifying dragon that gnaws at the roots of existence. It dwells in the deepest mud, consuming the nutrients of the planet itself." }
      ]
    }
  },
  23: {
    name: "The Spore Light Caverns",
    unlockLevel: 3250,
    unlockGold: 40000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The river flows into a dark, humid cave system illuminated by bioluminescent fungi. Giant mushrooms grow from the water, and the air is thick with glowing spores. Fish here are soft, spongy, and often parasitic, evolved to thrive in the damp dark.",
    fish: {
      Common: [
        { name: "Agaricus Angler", xp: 38, gold: 20, desc: "A small white fish with a cap like growth on its head. It uses a bioluminescent gill lure to attract gnats and small flies." },
        { name: "Boletus Bass", xp: 40, gold: 21, desc: "A thick, brown capped fish with a spongy underside instead of scales. It has a savory, earthy smell and dwells near decaying logs." },
        { name: "Mycelium Mullet", xp: 42, gold: 22, desc: "A pale, thread like fish that swims in vast, interconnected shoals. They resemble a web of white fibers drifting in the current." },
        { name: "Fungus Flounder", xp: 44, gold: 23, desc: "A flatfish covered in mold like patches. It camouflages perfectly on the cavern floor, looking like a rotting leaf." },
        { name: "Spore Swordfish", xp: 46, gold: 24, desc: "A predator with a nose that puffs out clouds of toxic spores. It dashes through the cloud to impale confused prey." },
        { name: "Mold Molly", xp: 48, gold: 25, desc: "A fuzzy, green blue fish that thrives in stagnant water. It eats decaying matter and speeds up the decomposition process." },
        { name: "Yeast Yellowtail", xp: 50, gold: 26, desc: "A bubbling, active fish that ferments the water around it. Schools of them create pockets of carbon dioxide." },
        { name: "Lactarius Loach", xp: 52, gold: 27, desc: "A fish that bleeds a milky white latex when injured. The fluid is bitter and deters predators from taking a second bite." },
        { name: "Russula Ray", xp: 54, gold: 28, desc: "A bright red ray with a brittle body. It breaks apart easily if handled, but regenerates lost parts quickly." },
        { name: "Amanita Anchovy", xp: 56, gold: 29, desc: "A tiny red fish with white polka dots. Despite its size, it is highly toxic and hallucinogenic." }
      ],
      Uncommon: [
        { name: "Truffle Trout", xp: 100, gold: 60, desc: "A rare, lumpy black fish that buries itself deep in the mud. It releases a powerful pheromone that attracts pigs and other foragers." },
        { name: "Chanterelle Char", xp: 103, gold: 62, desc: "A beautiful, golden yellow fish with gill ridges running down its neck. It tastes like apricots and pepper." },
        { name: "Morel Mackerel", xp: 106, gold: 64, desc: "A fish with a honeycomb patterned skin. The hollow pits in its flesh trap water, making it lighter and faster." },
        { name: "Enoki Eel", xp: 109, gold: 66, desc: "A cluster of long, thin white eels that share a single root base. They sway together, looking like a bundle of noodles." },
        { name: "Shiitake Shark", xp: 112, gold: 68, desc: "A dark, wood loving shark with a tough, umbrella shaped head. It rubs against submerged logs to cultivate algae on its skin." },
        { name: "Pleurotus Perch", xp: 115, gold: 70, desc: "A flat, shelf like fish that clings to the sides of cave walls. It is white and grey, resembling layers of oyster mushrooms." },
        { name: "Puffball Puffer", xp: 118, gold: 72, desc: "A round, white fish that explodes into a cloud of dust when touched. The 'dust' is actually millions of tiny eggs." },
        { name: "Coprinus Ide", xp: 121, gold: 74, desc: "A fish that slowly dissolves into black ink as it ages. The ink confuses predators and allows the fish to escape." },
        { name: "Bracket Barracuda", xp: 124, gold: 76, desc: "A stiff, woody fish that protrudes horizontally from trees. It ambushes prey that swim underneath its shadow." },
        { name: "Phallus Sturgeon", xp: 127, gold: 78, desc: "A strange shaped fish covered in foul smelling slime. Flies and beetles are attracted to it, which the fish then eats." }
      ],
      Fine: [
        { name: "Psilocybin Pike", xp: 200, gold: 130, desc: "A colorful, shifting fish that causes vivid hallucinations if touched. Predators often swim in circles after attacking it." },
        { name: "Magic Manta", xp: 205, gold: 135, desc: "A ray that glows with shifting neon patterns. It glides through the air as easily as water, seemingly defying physics." },
        { name: "Vision Viperfish", xp: 210, gold: 140, desc: "A deep sea fish with large, dilated eyes. It sees into the spirit realm and reacts to things that aren't there." },
        { name: "Trip Tetra", xp: 215, gold: 145, desc: "A small fish that swims in geometric patterns. Following its movement with your eyes induces a trance state." },
        { name: "Dream Spore Lungfish", xp: 220, gold: 150, desc: "A bloated lungfish whose skin exudes hallucinogenic spores. Anglers who catch it report vivid dreams and visions of bioluminescent forests beneath the waves." },
        { name: "Spore Mystic Shark", xp: 225, gold: 155, desc: "A small shark whose gills constantly exhale glowing spore clouds. It appears to commune with the fungal colonies, swimming in trance like patterns through mushroom groves." },
        { name: "Mystic Mycelium", xp: 230, gold: 160, desc: "A network of fish that share a single consciousness. What one sees, they all see." },
        { name: "Galaxy Gill", xp: 235, gold: 165, desc: "A fish with spores that look like stars. A school of them looks like a moving universe." }
      ],
      Rare: [
        { name: "Cordyceps Carp", xp: 420, gold: 240, desc: "A fish infected by a fungus that controls its brain. It swims relentlessly towards the surface to spread spores." },
        { name: "Fungal Husk Zebrafish", xp: 430, gold: 245, desc: "A zebrafish taken over by parasitic fungi, its stripes now glowing blue bioluminescent mycelia. It moves in jerky, unnatural patterns, controlled by the colony within." },
        { name: "Parasite Perch", xp: 440, gold: 250, desc: "A fish that burrows into larger hosts. It replaces the host's tongue and eats its food." },
        { name: "Host Halibut", xp: 450, gold: 255, desc: "A large flatfish covered in smaller parasitic mushrooms. It lives in a symbiotic relationship, trading nutrients for defense." },
        { name: "Necro Needlefish", xp: 460, gold: 260, desc: "A fish that feeds exclusively on dead tissue. It cleans the river of corpses, preventing disease." },
        { name: "Rot Ray", xp: 470, gold: 265, desc: "A ray that accelerates decay. Wood, flesh, and rope crumble to dust in its presence." },
        { name: "Blight Bass", xp: 480, gold: 270, desc: "A fish that spreads a withering disease to plants. Farmers hate it, but it keeps algae blooms in check." },
        { name: "Wither Wahoo", xp: 490, gold: 275, desc: "A fast fish that looks like a dried, skeletal husk. It moves with a rattling sound." }
      ],
      Epic: [
        { name: "Penicillin Piranha", xp: 800, gold: 460, desc: "A blue green moldy fish that kills bacteria. It is the cleanest fish in the river, despite looking fuzzy." },
        { name: "Antibiotic Angelfish", xp: 825, gold: 475, desc: "A pure white fish that cures infections. Sick fish flock to it to be healed by its mucus." },
        { name: "Medicine Marlin", xp: 850, gold: 490, desc: "A fish with a long, needle like bill used to inject healing enzymes. It acts as the doctor of the reef." },
        { name: "Panacea Plaice", xp: 875, gold: 505, desc: "A flatfish said to cure any ailment. It is hunted relentlessly for its miraculous flesh." },
        { name: "Elixir Eel", xp: 900, gold: 520, desc: "A golden eel that grants vitality. Drinking the water it swims in restores energy." },
        { name: "Remedy Ray", xp: 925, gold: 535, desc: "A ray that soothes pain. It wraps its wings around injured creatures to comfort them." },
        { name: "Vaccine Viper", xp: 950, gold: 550, desc: "A snake that builds immunity. Its bite makes you sick for a day but immune for a lifetime." },
        { name: "Cure All Catfish", xp: 975, gold: 565, desc: "A fat catfish that absorbs toxins. It eats poison and turns it into harmless waste." }
      ],
      Legendary: [
        { name: "Matsutake Manta", xp: 2000, gold: 1000, desc: "A highly prized ray that smells of pine and spice. It can never be farmed, only found in the wild." },
        { name: "Ganoderma Gar", xp: 2050, gold: 1030, desc: "The 'Reishi' fish of immortality. Its scales are hard and shiny like varnished wood." },
        { name: "Hericium Lungfish", xp: 2100, gold: 1060, desc: "A fish covered in cascading white spines, looking like a lion's mane. It boosts the intelligence of anyone who eats it." },
        { name: "Trametes Tuna", xp: 2150, gold: 1090, desc: "A fish with multi colored, striped fans on its sides. It is incredibly tough and boosts the immune system." },
        { name: "Cordyceps Coelacanth", xp: 2200, gold: 1120, desc: "An ancient fish completely taken over by a fungus. It has crystals growing out of its head and eyes." }
      ],
      Mythic: [
        { name: "Spore Siren", xp: 5000, gold: 2600, desc: "A fungal entity that sings a silent song of pheromones. It lures sailors into the caves to become new hosts for its garden." },
        { name: "Mycelium Leviathan", xp: 5100, gold: 2650, desc: "A colossal beast made of millions of woven white threads. It is the nervous system of the entire cavern biome." },
        { name: "Rot Mother Hydra", xp: 5200, gold: 2700, desc: "A multi headed beast where each head is a different giant mushroom cap. It spews clouds of choking spores." },
        { name: "Toadstool Kraken", xp: 5300, gold: 2750, desc: "A squid with a red and white spotted cap. Its tentacles are sticky threads that ensnare anything they touch." },
        { name: "Decay Serpent", xp: 5400, gold: 2800, desc: "A snake made of rotting organic matter. It brings death, but from death, new life grows." }
      ],
      Exotic: [
        { name: "Biolume Behemoth", xp: 15000, gold: 8000, desc: "A giant creature that glows with a cold, blue light. It lights up the deepest caverns like a living moon." },
        { name: "Psychedelic Scylla", xp: 15500, gold: 8250, desc: "A monster of shifting colors and shapes. Looking at it causes permanent madness and insight." },
        { name: "Fungal Fenrir", xp: 16000, gold: 8500, desc: "A wolf fish made of tough, woody mushroom. Its bite infects the world with spores." }
      ],
      Arcane: [
        { name: "The Last Spore Shoggoth", xp: 80000, gold: 47000, desc: "A shapeless, amorphous mass of black slime and eyes. It constantly reshapes itself, absorbing all biological matter it touches." }
      ]
    }
  },
  24: {
    name: "The Thorn Coral Gardens",
    unlockLevel: 3500,
    unlockGold: 35000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The environment becomes hostile and sharp. Coral structures are replaced by massive underwater brambles and spicy pepper plants. The fish here are brightly colored warning signs, often hot to the touch or covered in defensive spines.",
    fish: {
      Common: [
        { name: "Capsicum Cod", xp: 40, gold: 21, desc: "A bright red fish shaped like a chili pepper. It is hot to the touch and releases a burning oil when threatened." },
        { name: "Piper Pike", xp: 42, gold: 22, desc: "A speckled black fish that looks like a peppercorn. It shoots small, hard pellets from its mouth to stun prey." },
        { name: "Spina Shark", xp: 44, gold: 23, desc: "A small shark covered in rose thorns. It thrashes wildly when caught, entangling nets and cutting lines." },
        { name: "Rose Thorn Ray", xp: 46, gold: 24, desc: "A pink ray resembling a floating rose bloom, but beautiful thorns line its edges. It drifts gracefully through bramble patches, immune to the stinging corals." },
        { name: "Jalapeno Jack", xp: 48, gold: 25, desc: "A smooth, green fish with a rounded nose. It has a mild heat but can still cause a tingling sensation." },
        { name: "Habanero Halibut", xp: 50, gold: 26, desc: "A wrinkled, orange flatfish. It is incredibly spicy, and predators who eat it often die of internal burns." },
        { name: "Cayenne Catfish", xp: 52, gold: 27, desc: "A long, thin red fish with whisker like roots. It hides in the sand, waiting to deliver a fiery sting." },
        { name: "Tabasco Tetra", xp: 54, gold: 28, desc: "A tiny fish that schools in red clouds. A drop of its blood can season an entire pot of soup." },
        { name: "Acacia Angelfish", xp: 56, gold: 29, desc: "A striped fish that lives among the acacia thorns. It has developed immunity to the sharp spikes." },
        { name: "Bramble Bass", xp: 58, gold: 30, desc: "A tough fish covered in tangled, woody vines. It is difficult to handle and often snags on equipment." }
      ],
      Uncommon: [
        { name: "Scoville Salmon", xp: 110, gold: 65, desc: "A fish that gets hotter as it ages. Its heat level is measured in millions of units, visible as a glowing aura." },
        { name: "Ghost Pepper Grouper", xp: 113, gold: 67, desc: "A pale, wrinkled fish that is terrifyingly hot. Eating it causes temporary blindness and spiritual visions." },
        { name: "Reaper Ray", xp: 116, gold: 69, desc: "A red ray with a stinging tail that feels like pure fire. It is currently the hottest fish in the ocean." },
        { name: "Wasabi Wahoo", xp: 119, gold: 71, desc: "A green fish that delivers a sharp, sinus clearing shock. The heat fades quickly but is intense." },
        { name: "Sinapis Mackerel", xp: 122, gold: 73, desc: "A yellow fish with a pungent, tangy slime coat. It irritates the gills of other fish." },
        { name: "Armoracia Herring", xp: 125, gold: 75, desc: "A rough skinned white fish. Grating its scales releases a powerful, tear inducing vapor." },
        { name: "Crocus Snapper", xp: 128, gold: 77, desc: "A rare, golden red fish. Its fin filaments are worth more than gold by weight." },
        { name: "Cinnamomum Carp", xp: 131, gold: 79, desc: "A brown fish with bark like scales. It smells warm and sweet, hiding its spicy defense." },
        { name: "Syzygium Cod", xp: 134, gold: 81, desc: "A fish studded with small, nail like spikes. It numbs the mouth of anything that tries to eat it." },
        { name: "Myristica Newt", xp: 137, gold: 83, desc: "A hard, woody newt. Inside its shell is a fragrant but hallucinogenic meat." }
      ],
      Fine: [
        { name: "Thorn Mail Trout", xp: 210, gold: 140, desc: "A fish clad in armor made of interwoven thorns. It is nearly invulnerable to physical attacks." },
        { name: "Spike Skin Sturgeon", xp: 215, gold: 145, desc: "A prehistoric fish covered in bony scutes tipped with iron hard spikes. It acts as a living battering ram." },
        { name: "Needle Fin Flounder", xp: 220, gold: 150, desc: "A flatfish with fins that are literally hypodermic needles. It injects a painful irritant into anyone who steps on it." },
        { name: "Barbed Wire Barracuda", xp: 225, gold: 155, desc: "A long, silver fish with twisted, sharp scales. Swimming against the grain of its scales will shred flesh." },
        { name: "Cactus Kingfish", xp: 230, gold: 160, desc: "A barrel shaped fish covered in long, golden spines. It fears nothing and swims openly." },
        { name: "Urchin Unicornfish", xp: 235, gold: 165, desc: "A fish with a horn surrounded by a crown of spines. It uses its head to impale rivals." },
        { name: "Porcupine Puffer", xp: 240, gold: 170, desc: "The classic spiky fish, but enhanced. Its spines are tipped with neurotoxin." },
        { name: "Hedgehog Halibut", xp: 245, gold: 175, desc: "A cute but dangerous flatfish covered in soft looking spines that harden instantly upon touch." }
      ],
      Rare: [
        { name: "Vampire Vine Viper", xp: 450, gold: 250, desc: "A snake like fish that mimics a thorny vine. It wraps around prey and drinks their blood through hollow thorns." },
        { name: "Iron Maiden Ide", xp: 460, gold: 255, desc: "A fish that encases itself in a spiked metal like shell. It opens only to feed." },
        { name: "Thornblade Ray", xp: 470, gold: 260, desc: "A brilliant red ray covered in defensive spines that secrete capsaicin oils. Contact with its barbed tail causes intense burning pain, deterring all but the most determined predators." },
        { name: "Saw Grass Shark", xp: 480, gold: 265, desc: "A shark with serrated skin that cuts like a saw. Brushing against it causes deep lacerations." },
        { name: "Nettle Newt", xp: 490, gold: 270, desc: "A lizard fish covered in stinging hairs. It causes an itching rash that can last for weeks." },
        { name: "Briar Patch Bass", xp: 500, gold: 275, desc: "A fish that lives in the densest thickets. It lures predators in, where they get stuck and die." },
        { name: "Thorn Crown Tetra", xp: 510, gold: 280, desc: "A regal fish with a ring of thorns around its head. It is the king of the brambles." },
        { name: "Spike Ball Salmon", xp: 520, gold: 285, desc: "A fish that curls into a perfect sphere of spikes. It rolls along the riverbed, impenetrable." }
      ],
      Epic: [
        { name: "Pepper Blaze Ide", xp: 850, gold: 480, desc: "An ide that glows orange and red like burning chilies. Its scales are hot to the touch, and it feeds exclusively on the spiciest underwater pepper plants, storing the heat in specialized organs." },
        { name: "Magma Marlin", xp: 875, gold: 495, desc: "A fish with blood like lava. It melts through ice and rock." },
        { name: "Magma Thorn Viperfish", xp: 900, gold: 510, desc: "A viperfish with needle like fangs dripping with scalding venom extracted from volcanic peppers. Its body temperature is dangerously high, and water steams around its gills." },
        { name: "Pepper Spray Piranha", xp: 925, gold: 525, desc: "A school of these fish releases a cloud of capsaicin. It blinds and chokes anything in the water." },
        { name: "Blaze Barracuda", xp: 950, gold: 540, desc: "A fast fish that leaves a trail of boiling bubbles. It strikes like a heat seeking missile." },
        { name: "Scorch Shark", xp: 975, gold: 555, desc: "A shark with charred black skin and glowing red eyes. It hunts in thermal vents." },
        { name: "Ember Eel", xp: 1000, gold: 570, desc: "An eel that glows like a dying coal. It can reignite into a flame if fed oxygen." },
        { name: "Ash Angelfish", xp: 1025, gold: 585, desc: "A grey fish that rises from the remains of burnt reefs. It signifies rebirth through fire." }
      ],
      Legendary: [
        { name: "Dragon Breath Dorade", xp: 2100, gold: 1050, desc: "A fish named after the hottest chili in the world. Its breath boils the ocean." },
        { name: "Scorpion Tuna", xp: 2150, gold: 1080, desc: "A fish with a stinger tail loaded with potent venom. It attacks with the precision of a scorpion." },
        { name: "Naga Viper Newt", xp: 2200, gold: 1110, desc: "A serpent fish hybrid with a toxic bite. It is worshipped by spice merchants." },
        { name: "Infinity Chili Char", xp: 2250, gold: 1140, desc: "A fish with heat that never ends. One bite keeps you warm for a lifetime." },
        { name: "Pepper X Pike", xp: 2300, gold: 1170, desc: "The ultimate spicy fish. Its existence is a secret, guarded by those who can handle the heat." }
      ],
      Mythic: [
        { name: "Bramble Behemoth", xp: 5200, gold: 2700, desc: "A massive creature made of tangled thorns. It rolls across the seabed, gathering debris and bones in its mass." },
        { name: "Capsaicin Cetacea", xp: 5300, gold: 2750, desc: "A whale that filters spice from the water. Its blowhole sprays a mist of pure hot sauce." },
        { name: "Inferno Siren", xp: 5400, gold: 2800, desc: "A creature of fire and song. Her voice lures sailors to burn in the boiling waters." },
        { name: "Spina Leviathan", xp: 5500, gold: 2850, desc: "A leviathan covered in spines the size of ship masts. It shreds anything that tries to ride it." },
        { name: "Thorn Hydra", xp: 5600, gold: 2900, desc: "A hydra where each head is a thorny vine. Cutting one off causes two sharper ones to grow." }
      ],
      Exotic: [
        { name: "Rose Garden Scylla", xp: 15500, gold: 8200, desc: "A monster of beautiful red petals and deadly thorns. It smells sweet but tastes of blood." },
        { name: "Iron Maiden Charybdis", xp: 16000, gold: 8450, desc: "A whirlpool lined with metal spikes. It grinds ships to splinters." },
        { name: "Spicy Serpent", xp: 16500, gold: 8700, desc: "A giant snake made of magma and chili oil. It leaves a trail of red destruction." }
      ],
      Arcane: [
        { name: "Cherufe Leviathan", xp: 82000, gold: 48000, desc: "A colossal beast made of molten rock and spikes. It lives in the heart of underwater volcanoes, consuming heat to survive." }
      ]
    }
  },
  25: {
    name: "The Blossom Basin",
    unlockLevel: 3750,
    unlockGold: 40000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The final plant biome is a paradise of underwater flowers and giant fruits. The water is sweet with nectar, and pollen drifts like snow. Fish here are colorful, round, and resemble berries, melons, and blooming lotuses.",
    fish: {
      Common: [
        { name: "Fructus Flounder", xp: 42, gold: 22, desc: "A flatfish with a pattern resembling a slice of fruit cocktail. It hides on the sandy bottom, looking like a dropped picnic treat." },
        { name: "Citrus Catfish", xp: 44, gold: 23, desc: "A bright orange fish with rough, pitted skin like an orange peel. It has a tangy scent and is high in Vitamin C." },
        { name: "Malus Marlin", xp: 46, gold: 24, desc: "A red and green fish with a crisp texture. It looks like a swimming apple and keeps the doctor away." },
        { name: "Bacca Bass", xp: 48, gold: 25, desc: "A small, round blue fish that looks like a blueberry. It clusters in groups, resembling a bunch of fruit on a bush." },
        { name: "Vitis Viperfish", xp: 50, gold: 26, desc: "A purple eel that coils around trellises. It looks like a grapevine and tastes sweet and musky." },
        { name: "Cerasus Salmon", xp: 52, gold: 27, desc: "A pair of red fish joined by a thin stem like membrane. They always swim together, looking like a pair of cherries." },
        { name: "Musa Mullet", xp: 54, gold: 28, desc: "A long, yellow curved fish. It swims in bunches and turns brown spots as it ages." },
        { name: "Citrullus Carp", xp: 56, gold: 29, desc: "A large, green striped fish with pink flesh and black seeds inside. It is heavy and full of water." },
        { name: "Fragaria Frogfish", xp: 58, gold: 30, desc: "A red, bumpy fish with green fins on top. It mimics a strawberry to attract seed eating prey." },
        { name: "Ananas Angelfish", xp: 60, gold: 31, desc: "A yellow fish with a rough, diamond patterned skin and a spiky green crest. It is sweet but acidic." }
      ],
      Uncommon: [
        { name: "Flora Flounder", xp: 115, gold: 68, desc: "A flatfish that mimics a blooming flower. Its fins fan out like petals to attract pollinators." },
        { name: "Petal Perch", xp: 118, gold: 70, desc: "A delicate fish with soft, velvet scales. It comes in every color of the rainbow." },
        { name: "Nectar Newt", xp: 121, gold: 72, desc: "A lizard that drinks nectar from giant sea flowers. It is sticky and sweet to the touch." },
        { name: "Pollen Pike", xp: 124, gold: 74, desc: "A yellow, dusty fish. It sneezes clouds of pollen to confuse predators." },
        { name: "Stamen Sturgeon", xp: 127, gold: 76, desc: "A fish with long, filament like barbels tipped with pollen sacs. It fertilizes the reef as it feeds." },
        { name: "Sepal Shark", xp: 130, gold: 78, desc: "A green shark that acts as the protective outer layer of the flower reef. It is tough and fibrous." },
        { name: "Bloom Bass", xp: 133, gold: 80, desc: "A fish that opens up when the sun shines. At night, it closes its fins tight to sleep." },
        { name: "Bud Betta", xp: 136, gold: 82, desc: "A small, tightly wrapped fish. It is waiting for the right moment to unfurl its magnificent fins." },
        { name: "Lotus Petal Ray", xp: 139, gold: 84, desc: "A delicate ray with translucent fins resembling pink lotus petals. It glides through blooming flowers, feeding on nectar and spreading pollen as it swims." },
        { name: "Lilium Loach", xp: 142, gold: 86, desc: "A white, trumpet shaped fish. It rests on lily pads, blending in perfectly." }
      ],
      Fine: [
        { name: "Persica Piranha", xp: 220, gold: 145, desc: "A fuzzy, pink fish with a stone hard pit in its center. It has a sweet taste but a nasty bite." },
        { name: "Prunus Puffer", xp: 225, gold: 150, desc: "A purple fish covered in a waxy bloom. It dries out to become a Prune Puffer if beached." },
        { name: "Armeniaca Angler", xp: 230, gold: 155, desc: "A small orange fish with a velvety texture. Its lure looks like a dried fruit." },
        { name: "Mangifera Manta", xp: 235, gold: 160, desc: "A smooth, orange ray with a large, flat seed inside. It is slippery and hard to hold." },
        { name: "Carica Pike", xp: 240, gold: 165, desc: "A fish filled with black, peppery seeds. Its flesh aids in digestion." },
        { name: "Actinidia Koi", xp: 245, gold: 170, desc: "A brown, hairy fish with bright green flesh inside. It is flightless (obviously)." },
        { name: "Cocos Crab", xp: 250, gold: 175, desc: "A crab with a shell as hard as wood and fibrous husk. It can crack open other coconuts with its claws." },
        { name: "Durio Drum", xp: 255, gold: 180, desc: "A spiky fish with an overwhelming smell. You either love it or hate it." }
      ],
      Rare: [
        { name: "Lotus Lungfish", xp: 480, gold: 260, desc: "A spiritual fish that rises from the mud to bloom pristine white. It represents purity." },
        { name: "Orchid Oarfish", xp: 490, gold: 265, desc: "A complex, symmetrical fish that mimics female insects. It is the most beautiful fish in the basin." },
        { name: "Tulipa Tetra", xp: 500, gold: 270, desc: "A cup shaped fish that comes in vibrant reds and yellows. It was once worth more than gold." },
        { name: "Helianthus Shark", xp: 510, gold: 275, desc: "A shark with a mane of yellow petals. It always faces the sun." },
        { name: "Bellis Dace", xp: 520, gold: 280, desc: "A simple, white and yellow fish. It is common but loved for its cheerfulness." },
        { name: "Viola Viper", xp: 530, gold: 285, desc: "A small, purple snake fish. It hides in the shadows and smells sweet." },
        { name: "Tagetes Marlin", xp: 540, gold: 290, desc: "A bright orange fish used in festivals. It guides the spirits of the dead." },
        { name: "Papaver Plaice", xp: 550, gold: 295, desc: "A red, papery fish. It induces sleep and dreams." }
      ],
      Epic: [
        { name: "Ambrosia Anguilla", xp: 900, gold: 500, desc: "An eel made of the food of the gods. Eating it grants temporary immortality." },
        { name: "Nectar Narwhal", xp: 925, gold: 515, desc: "A whale with a tusk made of crystallized sugar. It drips sticky syrup." },
        { name: "Mel Halibut", xp: 950, gold: 530, desc: "A golden, slow moving fish. It is thick and viscous, trapping anything that touches it." },
        { name: "Syrup Shark", xp: 975, gold: 545, desc: "A shark made of maple sap. It is slow in the cold but fast in the heat." },
        { name: "Saccharum Catfish", xp: 1000, gold: 560, desc: "A rigid, segmented fish. It is pure energy." },
        { name: "Molasses Mola", xp: 1025, gold: 575, desc: "The slowest fish in the world. It is dark, sweet, and heavy." },
        { name: "Caramel Carp", xp: 1050, gold: 590, desc: "A fish created by burnt sugar. It has a rich, complex flavor." },
        { name: "Toffee Trout", xp: 1075, gold: 605, desc: "A hard, brittle fish. It shatters if dropped." }
      ],
      Legendary: [
        { name: "Punica Perch", xp: 2200, gold: 1100, desc: "A fish filled with ruby red seeds. Eating one binds you to the underworld." },
        { name: "Ficus Flounder", xp: 2250, gold: 1130, desc: "A fish that is actually an inverted flower. It is pollinated by tiny wasps." },
        { name: "Olea Oarfish", xp: 2300, gold: 1160, desc: "A fish that brings peace. It produces a high quality oil." },
        { name: "Phoenix Dory", xp: 2350, gold: 1190, desc: "A sweet, wrinkled fish from the desert oasis. It provides energy for long journeys." },
        { name: "Vitis Gar", xp: 2400, gold: 1220, desc: "A fish that ferments into wine inside its own body. It is always drunk." }
      ],
      Mythic: [
        { name: "Lotus Leviathan", xp: 5500, gold: 2800, desc: "A massive creature with scales like lotus petals. It floats on the surface, supporting an island on its back." },
        { name: "Ambrosia Aspidochelone", xp: 5600, gold: 2850, desc: "A giant turtle that smells of divine fruit. Gods rest on its shell." },
        { name: "Nectar Nymph Siren", xp: 5700, gold: 2900, desc: "A creature made of honey and flowers. She offers a drink that makes you forget your home." },
        { name: "Eden Serpent", xp: 5800, gold: 2950, desc: "The original tempter. A snake offering a fruit of knowledge." },
        { name: "Yggdrasil Hydra", xp: 5900, gold: 3000, desc: "A hydra whose heads are the branches of the world tree. It bleeds sap." }
      ],
      Exotic: [
        { name: "Forbidden Fruit Kraken", xp: 16000, gold: 8500, desc: "A squid shaped like a bitten apple. Knowledge of good and evil flows from its ink." },
        { name: "Cornucopia Cetus", xp: 16500, gold: 8750, desc: "A whale that vomits an endless supply of food. It is the horn of plenty." },
        { name: "Harvest Moon Makara", xp: 17000, gold: 9000, desc: "A crocodile fish that appears only in autumn. It brings the reaping." }
      ],
      Arcane: [
        { name: "Garden Of Eden Hafgufa", xp: 85000, gold: 50000, desc: "A creature that is a single, planet sized bloom. Its opening petals signal the beginning of a new age." }
      ]
    }
  },
  26: {
    name: "The Paleolithic Pools",
    unlockLevel: 4000,
    unlockGold: 50000000,
    boatRequired: null,
    boatPrice: 0,
    description: "Leaving the lush gardens, you travel back in time to the dawn of humanity. The water is cold and mineral rich, surrounded by limestone caves covered in ancient charcoal paintings. The fish here are primal, rough skinned, and resemble stone tools and prehistoric beasts.",
    fish: {
      Common: [
        { name: "Flint Flounder", xp: 44, gold: 23, desc: "A flatfish with skin that mimics the sharp, chipped texture of a flint tool. It buries itself in grey gravel, striking quickly at passing prey with a jagged bite." },
        { name: "Ochre Oscar", xp: 46, gold: 24, desc: "A robust fish covered in dusty red and yellow pigments resembling cave art clay. It rubs against limestone rocks to mark its territory with colored dust." },
        { name: "Charcoal Carp", xp: 48, gold: 25, desc: "A dark, smudge colored fish that looks like a drawing come to life. It leaves a faint black trail in the water as it sifts through the silt." },
        { name: "Mural Minnow", xp: 50, gold: 26, desc: "A silver fish with a distinct marking on its side that looks like a human handprint. They school in tight formations that resemble a wall of painted hands." },
        { name: "Spear Tetra", xp: 52, gold: 27, desc: "A tiny, arrow shaped fish with a sharp, pointed nose. It darts through the water in straight lines, hunting microscopic organisms like a fired projectile." },
        { name: "Hide Halibut", xp: 54, gold: 28, desc: "A large flatfish with a texture resembling cured animal leather. It is tough and chewy, often ignored by predators due to its thick skin." },
        { name: "Flint Bass", xp: 56, gold: 29, desc: "A rough scaled bass with stone gray coloring and sharp, flint like dorsal spines. Early humans knapped its scales into cutting tools, finding them sharper than obsidian." },
        { name: "Soot Salmon", xp: 58, gold: 30, desc: "A fish that appears to be covered in ash from an ancient campfire. It thrives in warmer volcanic vents found within the caves." },
        { name: "Pebble Perch", xp: 60, gold: 31, desc: "A round, smooth fish that looks exactly like a river stone. It holds perfectly still in the current, moving only to snatch food." },
        { name: "Club Cod", xp: 62, gold: 32, desc: "A heavy headed fish with a bulbous tail. It uses its thick tail to bash open shellfish on the rocks." }
      ],
      Uncommon: [
        { name: "Obsidian Oarfish", xp: 112, gold: 67, desc: "A long, ribbon like fish made of black volcanic glass. Its edges are razor sharp, cutting through kelp and nets with ease." },
        { name: "Mammoth Mola", xp: 115, gold: 69, desc: "A giant sunfish covered in shaggy, brown algae that looks like fur. It drifts slowly, absorbing heat from the sun penetrating the water." },
        { name: "Smilodon Salmon", xp: 118, gold: 71, desc: "A prehistoric salmon with two massive fangs protruding from its upper jaw. It uses these teeth to fight rivals during mating season." },
        { name: "Ivory Tuna", xp: 121, gold: 73, desc: "A large predatory fish with curved, white bones extending from its jaw. It charges at prey, stunning them with a blow from its tusks." },
        { name: "Fossil Gar", xp: 124, gold: 75, desc: "A fish that looks like a living skeleton encased in stone. Its scales are as hard as rock, providing immense defense." },
        { name: "Amber Angelfish", xp: 127, gold: 77, desc: "A translucent orange fish that looks like fossilized tree resin. Ancient insects can sometimes be seen trapped within its thick scales." },
        { name: "Ember Trout", xp: 130, gold: 79, desc: "A trout with scales that glow like smoldering coals in cave darkness. Ancient hunters used its bioluminescence to light their way through limestone tunnels." },
        { name: "Nomad Needlefish", xp: 133, gold: 81, desc: "A wandering fish that never stays in one place. It travels vast distances, following the migration of larger herds." },
        { name: "Forager Guppy", xp: 136, gold: 83, desc: "A fish with cheek pouches used to store food. It endlessly collects seeds and scraps, hoarding them in small rock crevices." },
        { name: "Hunter Haddock", xp: 139, gold: 85, desc: "A lean, aggressive fish with camouflage stripes. It stalks its prey for hours before launching a coordinated attack." }
      ],
      Fine: [
        { name: "Stone Age Mystic Shark", xp: 230, gold: 135, desc: "A primitive shark etched with ceremonial charcoal marks. It circles sacred pools during tribal rituals, and shamans read omens in the patterns of its swimming." },
        { name: "Totem Tilapia", xp: 235, gold: 140, desc: "A fish with vertically stacked faces pattern on its scales. It stacks itself on top of other fish while sleeping." },
        { name: "Cave Art Ray", xp: 240, gold: 145, desc: "A ray whose skin bears markings identical to prehistoric cave paintings. Scholars believe it may have inspired ancient artists, or perhaps carries the memories of those who first witnessed it." },
        { name: "Elder Eel", xp: 245, gold: 150, desc: "An incredibly old eel with grey, wrinkled skin and cloudy eyes. Younger eels protect it, treating it with reverence." },
        { name: "Ancestor Arapaima", xp: 250, gold: 155, desc: "A massive, ancient fish that breathes air. It is believed to carry the spirits of the tribe's forefathers." },
        { name: "Pictograph Mackerel", xp: 255, gold: 160, desc: "A long fish whose side depicts a hunting scene in natural pigments. The scene seems to move as the fish swims." },
        { name: "Primal Pike", xp: 260, gold: 165, desc: "A savage predator with oversized teeth and a raw aggression. It attacks anything that moves, driven by pure instinct." },
        { name: "Monolith Sturgeon", xp: 265, gold: 170, desc: "A giant fish with heavy, slab like scales arranged in a circle on its back. It is heavy and immovable like a standing stone." }
      ],
      Rare: [
        { name: "Pyrite Piranha", xp: 460, gold: 275, desc: "A fish with rough scales that create sparks when rubbed together. It uses these sparks to scare off predators in the dark." },
        { name: "Atlatl Archerfish", xp: 470, gold: 280, desc: "A fish that spits water with the force of a flint tipped spear thrower. It knocks prey off low hanging branches with lethal accuracy." },
        { name: "Bison Bullhead", xp: 480, gold: 285, desc: "A horned fish with a humped back and shaggy brown scales. It stampedes along the river bottom in large groups." },
        { name: "Glacier Grouper", xp: 490, gold: 290, desc: "A remnant of the Ice Age, this fish radiates cold. Ice crystals form on its gills as it breathes." },
        { name: "Bronze Age Pike", xp: 500, gold: 295, desc: "A barracuda whose scales have oxidized into a beautiful bronze green patina. Ancient tribes once forged spearheads from its bones, and cave paintings depict its fearsome hunts." },
        { name: "Iron Ide", xp: 510, gold: 300, desc: "A dark, rusty fish that is incredibly heavy and tough. Its scales are magnetic." },
        { name: "Megalith Marlin", xp: 520, gold: 305, desc: "A colossal fish that looks like a swimming standing stone. It is covered in moss and ancient carvings." },
        { name: "Cave Bear Catfish", xp: 530, gold: 310, desc: "A massive, furry catfish with claws on its fins. It hibernates in deep underwater caves during winter." }
      ],
      Epic: [
        { name: "Chieftain Char", xp: 920, gold: 460, desc: "The leader of the school, distinguished by a headdress of fins. It commands absolute loyalty from other fish." },
        { name: "Medicine Walleye", xp: 945, gold: 475, desc: "A strange fish surrounded by a cloud of purple herbal mist. It heals injured fish with strange, bubbling concoctions." },
        { name: "Sacrifice Snapper", xp: 970, gold: 490, desc: "A blood red fish that offers itself to larger predators to save the school. It is celebrated as a martyr." },
        { name: "Spirit Salmon", xp: 995, gold: 505, desc: "A ghostly fish that can swim through solid rock. It travels between the physical world and the spirit realm." },
        { name: "Neanderthal Needlefish", xp: 1020, gold: 520, desc: "A robust, heavy browed fish. It is stronger and tougher than modern fish, but less agile." },
        { name: "Denisovan Dory", xp: 1045, gold: 535, desc: "A rare, elusive cousin of the Neanderthal fish. It has adapted to high altitude mountain lakes." },
        { name: "Cro Magnon Carp", xp: 1070, gold: 550, desc: "An intelligent fish that uses simple tools. It has been seen using twigs to fish for termites." },
        { name: "Fire Keeper Koi", xp: 1095, gold: 565, desc: "A glowing fish that must never stop swimming. It carries the eternal flame of the tribe in its mouth." }
      ],
      Legendary: [
        { name: "Alpha Pike", xp: 2100, gold: 1050, desc: "The apex predator of the primordial soup. It has no natural enemies and fears nothing." },
        { name: "Origin Osteoglossum", xp: 2150, gold: 1080, desc: "The first fish to ever evolve. It contains the DNA of all other species within its blood." },
        { name: "Genesis Gar", xp: 2200, gold: 1110, desc: "A fish said to have been present at the creation of the world. Its scales shine with the light of the first dawn." },
        { name: "Primeval Polypterus", xp: 2250, gold: 1140, desc: "A bichir that walks on the land and breathes air. It represents the bridge between sea and soil." },
        { name: "Evolution Eel", xp: 2300, gold: 1170, desc: "An eel that mutates rapidly. It grows legs, wings, or lungs depending on the environment." }
      ],
      Mythic: [
        { name: "Cave Art Leviathan", xp: 5100, gold: 2550, desc: "A two dimensional beast composed entirely of charcoal and ochre. It moves along the cavern walls, peeling off to attack in the 3rd dimension." },
        { name: "Ice Age Hydra", xp: 5200, gold: 2600, desc: "A massive creature frozen in a block of ice, yet still alive. Its heads are woolly mammoths with gills." },
        { name: "Fire Bringer Kraken", xp: 5300, gold: 2650, desc: "A squid that holds a burning ember in each tentacle. It gifted fire to the underwater world." },
        { name: "Stone Age Scylla", xp: 5400, gold: 2700, desc: "A monstrosity made of boulders and flint. Its roar causes rockfalls and avalanches." },
        { name: "Survival Serpent", xp: 5500, gold: 2750, desc: "A snake that embodies the survival instinct. It is always hungry, always moving, and always hunting." }
      ],
      Exotic: [
        { name: "Hominid Lungfish", xp: 16000, gold: 8000, desc: "A creature that is half fish, half humanoid. It holds the secrets of human evolution in its eyes." },
        { name: "Prometheus Shark", xp: 16500, gold: 8250, desc: "A shark chained to a rock, destined to have its liver eaten daily. It burns with eternal fire." },
        { name: "Pangea Placoderm", xp: 17000, gold: 8500, desc: "An armored fish from when all continents were one. Its plating maps the ancient world." }
      ],
      Arcane: [
        { name: "Primordial Soup Shoggoth", xp: 80000, gold: 46000, desc: "A shapeless, bubbling mass of organic matter and eyes. It is the raw material of life before it had a defined form." }
      ]
    }
  },
  27: {
    name: "The Totem Atoll",
    unlockLevel: 4250,
    unlockGold: 60000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The water turns warm, turquoise, and tropical. Wooden tiki statues rise from the coral reefs, and the sound of drums echoes underwater. The fish here are vibrant, patterned with tribal tattoos, and move with the rhythm of the tides.",
    fish: {
      Common: [
        { name: "Tiki Tetra", xp: 46, gold: 24, desc: "A blocky, square faced fish that resembles a carved wooden totem. It stays perfectly still among the wood, mimicking a statue." },
        { name: "Hula Herring", xp: 48, gold: 25, desc: "A silvery fish with a grass skirt like fin structure. It sways its hips rhythmically as it swims, mimicking the traditional dance." },
        { name: "Lei Loach", xp: 50, gold: 26, desc: "A colorful, long fish that looks like a string of flowers. It loops around the necks of larger fish in a symbiotic display." },
        { name: "Palm Perch", xp: 52, gold: 27, desc: "A green and brown fish with fins that fan out like palm fronds. It hides near the surface, blending in with floating coconuts." },
        { name: "Sand Snapper", xp: 54, gold: 28, desc: "A beige fish that buries itself in the white coral sand. It is a patient hunter, waiting for crabs to walk over it." },
        { name: "Shell Shark", xp: 56, gold: 29, desc: "A small shark with a hard, spiral shell on its back like a hermit crab. It retreats into the shell when threatened." },
        { name: "Coral Cod", xp: 58, gold: 30, desc: "A pink and orange fish with a rough texture. It looks exactly like a piece of brain coral." },
        { name: "Drum Dory", xp: 60, gold: 31, desc: "A deep bodied fish that produces a loud booming sound by beating its swim bladder. Schools of them create a rhythmic tribal beat." },
        { name: "Canoe Carp", xp: 62, gold: 32, desc: "A long, hollowed out looking fish that floats on the surface. Small frogs often ride inside its back." },
        { name: "Surf Salmon", xp: 64, gold: 33, desc: "A sleek, powerful fish that rides the crest of breaking waves. It leaps into the air to perform tricks." }
      ],
      Uncommon: [
        { name: "Totem Tuna", xp: 115, gold: 69, desc: "A vertically striped fish with markings that look like stacked faces. It is considered a protector of the reef." },
        { name: "Mask Mackerel", xp: 118, gold: 71, desc: "A fish with a bright, terrifying face pattern meant to scare predators. The rest of its body is plain and dull." },
        { name: "Tattoo Tilapia", xp: 121, gold: 73, desc: "A fish covered in intricate black ink patterns. The patterns tell the story of its lineage and battles." },
        { name: "Tribal Triggerfish", xp: 124, gold: 75, desc: "A fish painted with bold geometric shapes in primary colors. It is aggressive and defends its territory fiercely." },
        { name: "Tiki Flame Viperfish", xp: 127, gold: 77, desc: "A viperfish decorated with natural tribal patterns in red and black. It swims rhythmically to the underwater drumbeats, and locals believe it carries the spirit of fire dancers." },
        { name: "Obsidian Oscar", xp: 130, gold: 79, desc: "A jet black fish with sharp, glassy scales. It was used by ancient islanders to make arrowheads." },
        { name: "Jade Jack", xp: 133, gold: 81, desc: "A green, semi precious fish that glows faintly. It is considered a sign of wealth and good fortune." },
        { name: "Pearl Pike", xp: 136, gold: 83, desc: "A shimmering white fish with an iridescent sheen. Inside its mouth lies a giant, perfectly round pearl." },
        { name: "Tiki Torch Trout", xp: 139, gold: 85, desc: "A vibrant trout adorned with natural patterns resembling carved tiki masks. Its fins burn with bioluminescent fire that pulses to the rhythm of distant ceremonial drums." },
        { name: "Islander Ide", xp: 142, gold: 87, desc: "A friendly fish that guides lost sailors to land. It swims alongside boats, chirping happily." }
      ],
      Fine: [
        { name: "Mana Ray", xp: 235, gold: 138, desc: "A magical ray that glows with blue spiritual energy. Touching it restores the spirit and vitality of the fisherman." },
        { name: "Taboo Tarpon", xp: 240, gold: 143, desc: "A forbidden fish that is cursed to never be eaten. Catching it brings a storm, unless released immediately." },
        { name: "Kahuna Koi", xp: 245, gold: 148, desc: "A wise, old fish with a long white beard. It knows the secrets of the tides and stars." },
        { name: "Voyager Viper", xp: 250, gold: 153, desc: "A sea snake that travels thousands of miles across the open ocean. It navigates using the stars." },
        { name: "Wayfinder Wahoo", xp: 255, gold: 158, desc: "A fish with a map of the atoll naturally etched onto its scales. It always knows the way home." },
        { name: "Carver Catfish", xp: 260, gold: 163, desc: "A fish with a chisel like mouth. It carves intricate patterns into the coral reef as it feeds." },
        { name: "Idol Icefish", xp: 265, gold: 168, desc: "A clear fish with a golden statue visible inside its stomach. It swallowed a lost treasure long ago." },
        { name: "Luau Lungfish", xp: 270, gold: 173, desc: "A festive fish that tastes like roast pork. It is the centerpiece of underwater feasts." }
      ],
      Rare: [
        { name: "Fire Knife Flounder", xp: 470, gold: 280, desc: "A flatfish that spins flaming batons (fins) on the sea floor. It puts on a spectacular light show." },
        { name: "Drum Beat Bass", xp: 480, gold: 285, desc: "A fish whose heart beats so loud it sounds like a war drum. It intimidates rivals with the sound." },
        { name: "Spirit Swordfish", xp: 490, gold: 290, desc: "A ghost fish with a bill made of bone. It protects the ancestral burial grounds of the deep." },
        { name: "Ancestor Angelfish", xp: 500, gold: 295, desc: "A fish that bears the face of a long dead chief. It is treated with extreme respect." },
        { name: "Guardian Grouper", xp: 510, gold: 300, desc: "A massive fish that blocks the entrance to the sacred lagoon. It demands a tribute before letting you pass." },
        { name: "Legend Lungfish", xp: 520, gold: 305, desc: "A fish that grows larger every time a story is told about it. Some say it is now the size of an island." },
        { name: "Myth Mola", xp: 530, gold: 310, desc: "A sunfish painted with scenes of creation myths. It drifts lazily, contemplating the universe." },
        { name: "Fable Flatfish", xp: 540, gold: 315, desc: "A fish that speaks in riddles. It will grant a wish if you can answer its question." }
      ],
      Epic: [
        { name: "Moai Marlin", xp: 940, gold: 470, desc: "A giant fish with a head shaped like an Easter Island statue. It is stoic, heavy, and stares eternally towards the horizon." },
        { name: "Pele Piranha", xp: 965, gold: 485, desc: "A furious fish made of molten lava. It embodies the wrath of the volcano goddess." },
        { name: "Maui Mahi", xp: 990, gold: 500, desc: "A trickster fish with a magical hook in its jaw. It once tried to pull up the sun." },
        { name: "Tangaroa Tuna", xp: 1015, gold: 515, desc: "The king of the ocean fish. It commands the waves and currents with a flick of its tail." },
        { name: "Rongo Ray", xp: 1040, gold: 530, desc: "A peaceful ray associated with agriculture. Plants grow rapidly wherever it swims." },
        { name: "Ku Shark", xp: 1065, gold: 545, desc: "The god of war in shark form. It is a relentless killing machine that never retreats." },
        { name: "Lono Lungfish", xp: 1090, gold: 560, desc: "A fish that brings rain and fertility. It sings a song that summons thunderclouds." },
        { name: "Hina Halibut", xp: 1115, gold: 575, desc: "A white fish associated with the moon. It beats bark cloth from the clouds to make the sky." }
      ],
      Legendary: [
        { name: "Demigod Dolphin", xp: 2150, gold: 1080, desc: "A dolphin with the strength of ten men. It aids heroes in their quests across the ocean." },
        { name: "Volcano God Viper", xp: 2200, gold: 1110, desc: "A massive serpent that lives inside the active caldera. Its breath turns water into steam." },
        { name: "Ocean Spirit Orca", xp: 2250, gold: 1140, desc: "The physical manifestation of the ocean's soul. It is blue, translucent, and vast." },
        { name: "Island Maker Eel", xp: 2300, gold: 1170, desc: "A colossal eel that vomits lava to create new islands. It shapes the geography of the atoll." },
        { name: "Horizon Shark", xp: 2350, gold: 1200, desc: "A shark that chases the setting sun. It swims at the speed of light to catch the day." }
      ],
      Mythic: [
        { name: "Tiki God Kraken", xp: 5200, gold: 2600, desc: "A squid made of carved wood and stone. Its eyes burn with magical fire, and it guards the forbidden temples." },
        { name: "Volcano Hydra", xp: 5300, gold: 2650, desc: "A multi headed dragon made of magma. Each head spews ash and fire, boiling the sea." },
        { name: "Tsunami Leviathan", xp: 5400, gold: 2700, desc: "A beast of pure water that creates massive waves. When it breaches, coastal villages are wiped out." },
        { name: "Reef Guardian Aspidochelone", xp: 5500, gold: 2750, desc: "A turtle so large that palm trees and villages grow on its shell. It sleeps for centuries." },
        { name: "Totem Pole Serpent", xp: 5600, gold: 2800, desc: "A vertical sea snake with wings, claws, and multiple faces stacked on its body. It connects the sea to the sky." }
      ],
      Exotic: [
        { name: "Siva Scylla", xp: 16500, gold: 8200, desc: "A six headed dancer of death. Each hand spins a flaming blade, creating a wheel of fire underwater." },
        { name: "Hula Siren", xp: 17000, gold: 8450, desc: "A mermaid whose dance hypnotizes sailors. Her movements control the rhythm of the waves." },
        { name: "Coconut Charybdis", xp: 17500, gold: 8700, desc: "A whirlpool that is actually the mouth of a giant crab. It cracks ships like coconuts." }
      ],
      Arcane: [
        { name: "Kanaloa Behemoth", xp: 82000, gold: 48000, desc: "A giant squid god from the abyss. It smells of sulfur and old magic, ruling the world beneath the waves." }
      ]
    }
  },
  28: {
    name: "The Sun Gold Cenote",
    unlockLevel: 4500,
    unlockGold: 70000000,
    boatRequired: null,
    boatPrice: 0,
    description: "Deep in the jungle lies a sacred sinkhole filled with golden water. Ancient stone temples rise from the depths, covered in moss and jade. The fish here are adorned with gold, feathers, and jade, resembling the treasures of a lost empire.",
    fish: {
      Common: [
        { name: "Jade Jawfish", xp: 48, gold: 25, desc: "A small fish carved from green jade. It is prized by jewelers but is actually a living creature that burrows in the mud." },
        { name: "Gold Guppy", xp: 50, gold: 26, desc: "A tiny fish made of pure, soft gold. It glitters in the sunbeams that penetrate the cenote." },
        { name: "Gold Sun Snapper", xp: 52, gold: 27, desc: "A snapper plated with golden scales that shine brilliantly in shaft light. Ancient priests threw gold coins to feed it, and its belly still holds treasures from centuries past." },
        { name: "Stone Salmon", xp: 54, gold: 28, desc: "A grey, heavy fish that looks like a swimming brick. It is used to build underwater walls." },
        { name: "Maize Carp", xp: 56, gold: 29, desc: "A yellow fish with kernel like scales. It is the staple food of the underwater civilization." },
        { name: "Clay Catfish", xp: 58, gold: 30, desc: "A reddish brown fish that looks like wet pottery. It is moldable when asleep." },
        { name: "Brick Bass", xp: 60, gold: 31, desc: "A rectangular fish with a rough, red texture. It schools in wall like formations." },
        { name: "Step Sturgeon", xp: 62, gold: 32, desc: "A fish with a back ridge shaped like a stepped pyramid. It is a slow, majestic swimmer." },
        { name: "Vine Viperfish", xp: 64, gold: 33, desc: "A green, leafy predator that hangs from underwater trees. It strangles prey with its body." },
        { name: "Moss Minnow", xp: 66, gold: 34, desc: "A fuzzy green fish that cleans the algae off the ancient ruins. It is soft to the touch." }
      ],
      Uncommon: [
        { name: "Feathered Flounder", xp: 118, gold: 72, desc: "A colorful flatfish covered in brilliant green and red feathers. It flies through the water like a bird." },
        { name: "Jaguar Jack", xp: 121, gold: 74, desc: "A powerful yellow fish with black rosette spots. It is an ambush predator that strikes from the shadows." },
        { name: "Eagle Eel", xp: 124, gold: 76, desc: "A bird headed eel with a hooked beak. It snatches fish from the surface with lightning speed." },
        { name: "Serpent Shark", xp: 127, gold: 78, desc: "A long, sinuous shark with scales that look like snake skin. It moves with a hypnotic winding motion." },
        { name: "Turquoise Tetra", xp: 130, gold: 80, desc: "A bright blue gem fish. Large schools of them look like a flowing river of jewelry." },
        { name: "Mosaic Molly", xp: 133, gold: 82, desc: "A fish made of many small, colored tiles. It falls apart into a pile of stones when it dies." },
        { name: "Temple Trout", xp: 136, gold: 84, desc: "A fish marked with the floor plan of the great temple. It guards the inner sanctum." },
        { name: "Altar Angelfish", xp: 139, gold: 86, desc: "A flat, table like fish. Smaller fish leave food offerings on its back." },
        { name: "Priest Pike", xp: 142, gold: 88, desc: "A grim, black fish that performs sacrifices. It holds an obsidian knife in its mouth." },
        { name: "Headdress Herring", xp: 145, gold: 90, desc: "A small fish with a massive, flamboyant crest of feathers. It displays these colors to attract mates." }
      ],
      Fine: [
        { name: "Obsidian Swordfish", xp: 240, gold: 140, desc: "A fish with a bill made of sharp obsidian. It is used in ritual bloodletting ceremonies." },
        { name: "Blood Barracuda", xp: 245, gold: 145, desc: "A crimson red fish that smells of iron. It goes into a frenzy at the first drop of blood." },
        { name: "Solar Corona Eel", xp: 250, gold: 150, desc: "A golden eel ringed with brilliant yellow rays that flare like solar prominences. During its rare feeding frenzies, the entire cenote glows as if lit by a captive sun." },
        { name: "Solstice Salmon", xp: 255, gold: 155, desc: "A fish that only appears on the longest day of the year. It shines with blinding light." },
        { name: "Equinox Eel", xp: 260, gold: 160, desc: "A black and white striped eel. It represents the perfect balance between day and night." },
        { name: "Calendar Carp", xp: 265, gold: 165, desc: "A round fish with a complex calendar wheel on its side. It predicts the end of the world." },
        { name: "Glyph Grouper", xp: 270, gold: 170, desc: "A blocky fish covered in ancient writing. Scholars study it to learn the history of the deep." },
        { name: "Codex Catfish", xp: 275, gold: 175, desc: "A fish with paper thin fins that fold like a book. It contains the lost knowledge of the empire." }
      ],
      Rare: [
        { name: "Montezuma Marlin", xp: 480, gold: 290, desc: "A regal fish wearing a crown of gold and quetzal feathers. It demands tribute from other fish." },
        { name: "Cortez Cod", xp: 490, gold: 295, desc: "A steel clad fish that invades foreign waters. It brings disease and destruction." },
        { name: "Inca Ide", xp: 500, gold: 300, desc: "A mountain dwelling fish adapted to high altitudes. It carries messages between peaks." },
        { name: "Maya Mackerel", xp: 510, gold: 305, desc: "A fish with a flattened head. It is incredibly intelligent and builds stone cities." },
        { name: "Aztec Angler", xp: 520, gold: 310, desc: "Its lure is a beating heart. It attracts predators seeking a bloody meal." },
        { name: "Olmec Oscar", xp: 530, gold: 315, desc: "A fish with a giant, helmeted head. It looks like the colossal stone heads of the jungle." },
        { name: "Toltec Tuna", xp: 540, gold: 320, desc: "A warrior fish that respects only strength. It challenges fishermen to single combat." },
        { name: "Zapotec Zebrafish", xp: 550, gold: 325, desc: "A striped fish known as the 'Cloud Person'. It lives in the misty upper waters." }
      ],
      Epic: [
        { name: "Quetzal Coelacanth", xp: 960, gold: 490, desc: "A beautiful, ancient fish covered in iridescent green feathers. It is the messenger of the gods." },
        { name: "Jaguar Warrior Shark", xp: 985, gold: 505, desc: "A shark wearing a jaguar skin. It fights with the ferocity of the jungle cat." },
        { name: "Eagle Warrior Ray", xp: 1010, gold: 520, desc: "A ray with feathers and a beak. It swoops down from the surface to strike." },
        { name: "Sun God Salmon", xp: 1035, gold: 535, desc: "A fish that burns with white hot fire. It requires blood sacrifices to keep swimming." },
        { name: "Rain God Ray", xp: 1060, gold: 550, desc: "A blue ray with goggle eyes. It cries tears that become the jungle rain." },
        { name: "War God Wahoo", xp: 1085, gold: 565, desc: "A hummingbird fish hybrid that thrives on conflict. It starts wars between schools." },
        { name: "Death God Dory", xp: 1110, gold: 580, desc: "A skeletal fish that rules the lowest depths. It smells of decay." },
        { name: "Life God Lungfish", xp: 1135, gold: 595, desc: "A flayed fish wearing a new skin. It represents the cycle of renewal and spring." }
      ],
      Legendary: [
        { name: "Emperor Eel", xp: 2200, gold: 1100, desc: "The supreme ruler of the cenote. Its floor is paved with gold." },
        { name: "High Priest Halibut", xp: 2250, gold: 1130, desc: "A flatfish that performs the highest rituals. It can speak to the gods." },
        { name: "Chosen Char", xp: 2300, gold: 1160, desc: "A fish destined for greatness. It glows with a holy aura." },
        { name: "Golden City Gar", xp: 2350, gold: 1190, desc: "A fish made entirely of solid gold. It is the heavy, living treasure of El Dorado." },
        { name: "Sacred Cenote Catfish", xp: 2400, gold: 1220, desc: "A blind white catfish that lives in the deepest well. It knows the secrets of the underworld." }
      ],
      Mythic: [
        { name: "Quetzalcoatl Serpent", xp: 5300, gold: 2650, desc: "The Feathered Serpent god. It flies through the air and swims in the sea, bridging heaven and earth." },
        { name: "Tezcatlipoca Tigerfish", xp: 5400, gold: 2700, desc: "The Smoking Mirror. A jaguar fish with a mirror for a foot. It sees all sins." },
        { name: "Huitzilopochtli Hydra", xp: 5500, gold: 2750, desc: "The Hummingbird of the South. A hydra that feeds on hearts and sunlight." },
        { name: "Tlaloc Leviathan", xp: 5600, gold: 2800, desc: "The Rain God beast. It creates storms and floods with its weeping." },
        { name: "Xipe Totec Kraken", xp: 5700, gold: 2850, desc: "The Flayed One. A squid that wears the skin of its victims. It brings the spring harvest." }
      ],
      Exotic: [
        { name: "Crystal Skull Scylla", xp: 17000, gold: 8400, desc: "A monster with heads made of pure quartz. Looking into its eyes reveals the end of the world." },
        { name: "El Dorado Dragon", xp: 17500, gold: 8650, desc: "A dragon made of molten gold. It is the ultimate prize for any treasure hunter." },
        { name: "Calendar Stone Cetus", xp: 18000, gold: 8900, desc: "A whale carved from a massive circular stone. It marks the epochs of time." }
      ],
      Arcane: [
        { name: "Cipactli Crocodilian", xp: 84000, gold: 49000, desc: "A primordial monster with a mouth at every joint. The earth itself was created from its back." }
      ]
    }
  },
  29: {
    name: "The Jade Lantern Lake",
    unlockLevel: 4750,
    unlockGold: 80000000,
    boatRequired: null,
    boatPrice: 0,
    description: "A misty, serene lake surrounded by towering pagodas and cherry blossoms. Paper lanterns float on the surface, and the water is ink black. The fish here are elegant, resembling fine porcelain, silk, and mythical dragons.",
    fish: {
      Common: [
        { name: "Silk Salmon", xp: 50, gold: 26, desc: "A fish with flowing, fabric like fins that feel like the finest silk. It is prized for its texture." },
        { name: "Ink Ide", xp: 52, gold: 27, desc: "A black fish that dissolves into a cloud of ink when touched. Calligraphers use its fluid for their art." },
        { name: "Paper Perch", xp: 54, gold: 28, desc: "A flat, white fish as thin as rice paper. You can see the shadow of its bones through its skin." },
        { name: "Rice Roach", xp: 56, gold: 29, desc: "A small, white grain like fish. It hides in paddy fields and is a symbol of plenty." },
        { name: "Tea Tetra", xp: 58, gold: 30, desc: "A green fish that smells of matcha. Keeping it in water turns the pond into tea." },
        { name: "Bamboo Bass", xp: 60, gold: 31, desc: "A segmented green fish that looks like a bamboo stalk. It stands vertically in the water." },
        { name: "Lotus Loach", xp: 62, gold: 32, desc: "A pink and white fish that rests on lily pads. It opens its gills like a flower blooming." },
        { name: "Brocade Carp", xp: 64, gold: 33, desc: "A carp with patterns that look like embroidered gold thread. It is a sign of wealth." },
        { name: "Fan Flounder", xp: 66, gold: 34, desc: "A flatfish that folds itself up like a paper fan. It snaps open to startle predators." },
        { name: "Lucky Catfish", xp: 68, gold: 35, desc: "A golden catfish that waves one fin. It brings good fortune to businesses near the lake." }
      ],
      Uncommon: [
        { name: "Porcelain Pike", xp: 120, gold: 75, desc: "A white fish with delicate blue patterns painted on its scales. It shatters if dropped." },
        { name: "Lantern Lungfish", xp: 123, gold: 77, desc: "A round, glowing red fish that floats on the surface. It lights up the lake during festivals." },
        { name: "Celadon Catfish", xp: 126, gold: 79, desc: "A fish with a pale, grey green glaze. It is prized by collectors for its unique crackled skin texture." },
        { name: "Brush Barracuda", xp: 129, gold: 81, desc: "A thin fish with a tail like a calligraphy brush. It paints beautiful strokes in the mud." },
        { name: "Ink Scroll Snapper", xp: 132, gold: 83, desc: "An elegant snapper whose scales resemble unfurled calligraphy scrolls. Scholars say the patterns shift slightly over time, as if recording the lake's history in flowing script." },
        { name: "Dynasty Dory", xp: 135, gold: 85, desc: "A regal fish that wears a small crown. It traces its lineage back thousands of years." },
        { name: "Ming Mackerel", xp: 138, gold: 87, desc: "A valuable antique fish. It is white with blue dragons painted on its side." },
        { name: "Qing Quillback", xp: 141, gold: 89, desc: "A fish with a long, braided pigtail fin. It adheres to strict traditions." },
        { name: "Han Halibut", xp: 144, gold: 91, desc: "A sturdy, foundational fish. It represents the golden age of the lake." },
        { name: "Tang Tuna", xp: 147, gold: 93, desc: "A poetic fish that sings beautiful verses. It loves wine and the moon." }
      ],
      Fine: [
        { name: "Samurai Swordfish", xp: 250, gold: 150, desc: "A fish clad in lacquered armor. Its bill is a razor sharp katana blade." },
        { name: "Ninja Needlefish", xp: 255, gold: 155, desc: "An invisible fish clad in black. It strikes from the shadows and vanishes." },
        { name: "Monk Mola", xp: 260, gold: 160, desc: "A bald, peaceful fish in orange robes. It meditates under waterfalls." },
        { name: "Shogun Shark", xp: 265, gold: 165, desc: "The military ruler of the lake. It commands armies of smaller fish." },
        { name: "Imperial Ide", xp: 270, gold: 170, desc: "A yellow dragon fish. Only the emperor is allowed to catch it." },
        { name: "Geisha Grouper", xp: 275, gold: 175, desc: "A fish with a painted white face and red lips. It performs elegant dances." },
        { name: "Ronin Ray", xp: 280, gold: 180, desc: "A masterless ray that wanders the lake. It fights for money and honor." },
        { name: "Daimyo Dorado", xp: 285, gold: 185, desc: "A wealthy fish that owns large territories of the reef. It builds castles." }
      ],
      Rare: [
        { name: "Katana Koi", xp: 500, gold: 300, desc: "A koi fish as sharp as a blade. It cuts through the water without a ripple." },
        { name: "Shuriken Shark", xp: 510, gold: 305, desc: "A star shaped shark that spins through the water. It is a deadly projectile." },
        { name: "Kimono Carp", xp: 520, gold: 310, desc: "A fish wrapped in layers of beautiful, patterned silk. It moves with restricted grace." },
        { name: "Cherry Blossom Bass", xp: 530, gold: 315, desc: "A pink fish that only appears in spring. It sheds scales that look like falling petals." },
        { name: "Origami Oscar", xp: 540, gold: 320, desc: "A fish made of folded paper. It unfolds into a square if it gets wet." },
        { name: "Haiku Herring", xp: 550, gold: 325, desc: "Five scales, seven scales, five scales. A poetic little fish." },
        { name: "Zen Zebrafish", xp: 560, gold: 330, desc: "A black and white fish. It contemplates the sound of one fin clapping." },
        { name: "Tao Trout", xp: 570, gold: 335, desc: "A fish that flows with the current. It does nothing, yet leaves nothing undone." }
      ],
      Epic: [
        { name: "Dragon Gate Gar", xp: 1000, gold: 500, desc: "A fish trying to leap up a waterfall. If it succeeds, it becomes a dragon." },
        { name: "Phoenix Pike", xp: 1025, gold: 515, desc: "A red fish that rises from its own ashes. It burns with an eternal flame." },
        { name: "Turtle Ship Tuna", xp: 1050, gold: 530, desc: "An ironclad fish with spikes on its back. It breathes smoke and fire." },
        { name: "Firework Flounder", xp: 1075, gold: 545, desc: "A fish that explodes into colorful sparks. It celebrates the new year." },
        { name: "Great Wall Wahoo", xp: 1100, gold: 560, desc: "A incredibly long fish made of brick. It keeps out the northern barbarians." },
        { name: "Forbidden City Catfish", xp: 1125, gold: 575, desc: "A fish that lives in a golden palace. No commoner may look upon it." },
        { name: "Terracotta Tetra", xp: 1150, gold: 590, desc: "A clay soldier fish. It stands guard in the tomb of the emperor." },
        { name: "Silk Road Salmon", xp: 1175, gold: 605, desc: "A fish that travels between East and West. It carries spices and wealth." }
      ],
      Legendary: [
        { name: "Ancestor Arowana", xp: 2250, gold: 1150, desc: "The spirit of a great warrior. It protects the family shrine." },
        { name: "Spirit Dragon Fish", xp: 2300, gold: 1180, desc: "A long, white dragon that flies in the water. It grants wishes." },
        { name: "River God Ray", xp: 2350, gold: 1210, desc: "A benign deity that controls the floods. It demands offerings of rice wine." },
        { name: "Luck Loach", xp: 2400, gold: 1240, desc: "A golden eel that brings immense wealth. Catching it wins the lottery." },
        { name: "Fortune Fugu", xp: 2450, gold: 1270, desc: "A pufferfish that tells the future. One bite leads to death or glory." }
      ],
      Mythic: [
        { name: "Imperial Dragon Serpent", xp: 5400, gold: 2700, desc: "A five clawed golden dragon. It is the symbol of the Emperor's power." },
        { name: "Jade Emperor Leviathan", xp: 5500, gold: 2750, desc: "The ruler of heaven and earth. It sits on a jade throne in the deep." },
        { name: "Qilin Fish", xp: 5600, gold: 2800, desc: "A gentle creature with hooves and scales. It appears only during the reign of a wise sage." },
        { name: "Nian Hydra", xp: 5700, gold: 2850, desc: "A monster that eats children. It is afraid of red color and loud noises." },
        { name: "Baku Behemoth", xp: 5800, gold: 2900, desc: "A tapir fish that eats nightmares. It guards the sleep of the innocent." }
      ],
      Exotic: [
        { name: "Yin Yang Scylla", xp: 17500, gold: 8600, desc: "A two headed monster, one black, one white. They spin in perfect balance." },
        { name: "Five Element Cetus", xp: 18000, gold: 8850, desc: "A whale composed of wood, fire, earth, metal, and water. It is the cycle of creation." },
        { name: "Eight Immortal Eel", xp: 18500, gold: 9100, desc: "An eel that crossed the sea. It has eight different magical powers." }
      ],
      Arcane: [
        { name: "Shenlong Dragon", xp: 86000, gold: 51000, desc: "The Azure Dragon of the East. A massive celestial being that controls the weather, the rain, and the destiny of the world." }
      ]
    }
  },
  30: {
    name: "The Runic Fjords",
    unlockLevel: 5000,
    unlockGold: 100000000,
    boatRequired: null,
    boatPrice: 0,
    description: "Icy, mist shrouded waters hemmed in by steep cliffs. Viking longships lie sunken in the depths, their shields still intact. The fish here are hardened warriors, etched with glowing blue runes and frost.",
    fish: {
      Common: [
        { name: "Frost Rune Roach", xp: 52, gold: 28, desc: "A small roach etched with glowing blue Norse runes that radiate freezing cold. Vikings believed each rune granted a different blessing to those brave enough to touch it." },
        { name: "Axe Anchovy", xp: 54, gold: 29, desc: "A silver fish shaped like a battle axe head. It chops at the water to swim." },
        { name: "Scutum Sprat", xp: 56, gold: 30, desc: "A round fish patterned like a Viking shield. It schools in a 'shield wall' formation." },
        { name: "Glacier Goby", xp: 58, gold: 31, desc: "A fish made of solid ice. It doesn't melt, even in warm currents." },
        { name: "Iron Icefish", xp: 60, gold: 32, desc: "A translucent fish with an iron skeleton. It is heavy and sinks to the bottom." },
        { name: "Mead Minnow", xp: 62, gold: 33, desc: "A golden fish that tastes of honey and alcohol. It makes predators drunk." },
        { name: "Wolf Bass", xp: 64, gold: 34, desc: "A grey, furry fish with a wolf's snout. It howls underwater." },
        { name: "Raven Ray", xp: 66, gold: 35, desc: "A black ray with feathered wings. It watches battles and feasts on the dead." },
        { name: "Bear Bream", xp: 68, gold: 36, desc: "A bulky, brown fish with thick fur. It goes into a frenzy if hurt." },
        { name: "Frost Flounder", xp: 70, gold: 37, desc: "A flatfish covered in frost. It leaves a freezing trail wherever it goes." }
      ],
      Uncommon: [
        { name: "Viking Viperfish", xp: 125, gold: 78, desc: "A horned fish with a beard. It raids other reefs for food and loot." },
        { name: "Raider Ray", xp: 128, gold: 80, desc: "A fast, aggressive ray. It strikes coastal villages and vanishes." },
        { name: "Longship Lungfish", xp: 131, gold: 82, desc: "A long fish with a dragon head and rows of fins like oars. It carries smaller fish into battle." },
        { name: "Berserker Bass", xp: 134, gold: 84, desc: "A fish that goes mad with rage. It bites everything, including rocks and itself." },
        { name: "Skald Salmon", xp: 137, gold: 86, desc: "A fish that sings epic sagas. It remembers the history of the fjord." },
        { name: "Thane Trout", xp: 140, gold: 88, desc: "A noble fish with a gold arm ring. It rules over a small patch of kelp." },
        { name: "Jotun Jawfish", xp: 143, gold: 90, desc: "A giant blue fish made of ice. It is the enemy of the gods." },
        { name: "Thrall Tetra", xp: 146, gold: 92, desc: "A plain, hardworking fish. It serves the Jarl Jack without complaint." },
        { name: "Deep Fjord Dory", xp: 149, gold: 94, desc: "A deep water fish. It knows the secrets of the dark, cold depths." },
        { name: "Saga Snapper", xp: 152, gold: 96, desc: "A fish covered in written stories. Reading its scales reveals the future." }
      ],
      Fine: [
        { name: "Valkyrie Viper", xp: 260, gold: 155, desc: "A winged snake fish in shining armor. It chooses which fish die in battle." },
        { name: "Einherjar Eel", xp: 265, gold: 160, desc: "An undead eel that fights all day and feasts all night. It prepares for the end of the world." },
        { name: "Valhalla Velifer", xp: 270, gold: 165, desc: "A golden fish that lives in the hall of the slain. It is delicious and regenerates daily." },
        { name: "Asgard Angelfish", xp: 275, gold: 170, desc: "A god like fish. It glows with the light of the rainbow bridge." },
        { name: "Midgard Mackerel", xp: 280, gold: 175, desc: "A fish of the mortal realm. It is hardy and surrounds the world." },
        { name: "Jarl Jack", xp: 285, gold: 180, desc: "A powerful leader fish. It sits on a throne of skulls." },
        { name: "Dwarf Dory", xp: 290, gold: 185, desc: "A short, bearded fish. It forges magical items deep underground." },
        { name: "Elf Eel", xp: 295, gold: 190, desc: "A beautiful, light filled eel. It dances in the aurora borealis." }
      ],
      Rare: [
        { name: "Mjolnir Marlin", xp: 520, gold: 320, desc: "A hammer headed fish that shoots lightning. It always returns to the hand that threw it." },
        { name: "Gungnir Gar", xp: 530, gold: 325, desc: "A spear fish that never misses. It is marked with oaths." },
        { name: "Aegis Angler", xp: 540, gold: 330, desc: "A horrifying fish. Looking at its face turns you to stone with fear." },
        { name: "Gjallarhorn Grouper", xp: 550, gold: 335, desc: "A fish with a trumpet mouth. Its cry signals the end of the world." },
        { name: "Yggdrasil Yellowtail", xp: 560, gold: 340, desc: "A green fish connecting the nine worlds. Roots grow from its belly." },
        { name: "Bifrost Beluga", xp: 570, gold: 345, desc: "A rainbow colored whale. It is the bridge between the ocean and the sky." },
        { name: "Norn Needlefish", xp: 580, gold: 350, desc: "Three fish that swim as one. They spin, measure, and cut the thread of life." },
        { name: "Wyrd Wrasse", xp: 590, gold: 355, desc: "A fish woven from the threads of destiny. You cannot escape catching it." }
      ],
      Epic: [
        { name: "Odin Oscar", xp: 1050, gold: 550, desc: "A one eyed fish with two ravens. It gave its eye for wisdom." },
        { name: "Thor Tuna", xp: 1075, gold: 565, desc: "A red bearded, strong fish. It eats two whole oxen for dinner." },
        { name: "Loki Loach", xp: 1100, gold: 580, desc: "A shapeshifting fish. It creates chaos and mischief." },
        { name: "Freya Flounder", xp: 1125, gold: 595, desc: "A beautiful fish that weeps tears of red gold. It rides a chariot pulled by cats." },
        { name: "Tyr Tarpon", xp: 1150, gold: 610, desc: "A brave fish with one fin bitten off. It bound the great wolf." },
        { name: "Heimdall Herring", xp: 1175, gold: 625, desc: "A fish with gold teeth. It can hear the grass grow." },
        { name: "Baldur Barbel", xp: 1200, gold: 640, desc: "The most beautiful fish. It is invulnerable to everything except mistletoe." },
        { name: "Hel Halibut", xp: 1225, gold: 655, desc: "A fish that is half alive, half dead. It rules the cold underworld." }
      ],
      Legendary: [
        { name: "Ragnarok Ray", xp: 2300, gold: 1200, desc: "A ray of fire and death. Its surfacing marks the twilight of the gods." },
        { name: "Fimbulwinter Fish", xp: 2350, gold: 1230, desc: "A fish of eternal winter. It freezes the ocean solid." },
        { name: "Blood Eagle Eel", xp: 2400, gold: 1260, desc: "A gruesome fish with ribs opened like wings. It is a sacrifice to Odin." },
        { name: "Dragon Ship Shark", xp: 2450, gold: 1290, desc: "A shark with a wooden head and shields on its side. It carries an army." },
        { name: "World Tree Wahoo", xp: 2500, gold: 1320, desc: "A fish that holds the cosmos together. If it dies, the universe ends." }
      ],
      Mythic: [
        { name: "Jormungandr Serpent", xp: 5600, gold: 2800, desc: "The World Serpent. It is so large it circles the earth and bites its own tail." },
        { name: "Fenrir Shark", xp: 5700, gold: 2850, desc: "A monstrous wolf shark. It will swallow the sun and the moon." },
        { name: "Nordic Kraken", xp: 5800, gold: 2900, desc: "The original legendary beast. It drags ships down with its massive tentacles." },
        { name: "Sleipnir Seahorse", xp: 5900, gold: 2950, desc: "An eight legged seahorse. It runs across the water faster than the wind." },
        { name: "Huginn Muninn Ray", xp: 6000, gold: 3000, desc: "Two rays that act as one. They are thought and memory." }
      ],
      Exotic: [
        { name: "Draugr Leviathan", xp: 18000, gold: 9000, desc: "An undead whale that guards its treasure. It grows larger when it fights." },
        { name: "Valkyrie Siren", xp: 18500, gold: 9250, desc: "A warrior woman with wings. She sings a song of glory and death." },
        { name: "Frost Giant Scylla", xp: 19000, gold: 9500, desc: "A blue giantess with many heads. She throws icebergs at ships." }
      ],
      Arcane: [
        { name: "Ymir Colossus", xp: 90000, gold: 55000, desc: "The primeval giant from whose body the world was made. His blood became the ocean, and his bones became the mountains." }
      ]
    }
  },
  31: {
    name: "The Steam Forge Delta",
    unlockLevel: 5500,
    unlockGold: 120000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The pristine waters of the past give way to the Age of Industry. The river runs hot with waste heat, and the air is thick with smog. Giant brass gears turn slowly in the mud, and the fish here are mechanical marvels of clockwork and steam.",
    fish: {
      Common: [
        { name: "Brass Bass", xp: 55, gold: 30, desc: "A heavy fish made of tarnished brass plates riveted together. It swims with a clunky, rhythmic motion driven by internal gears." },
        { name: "Copper Carp", xp: 57, gold: 31, desc: "A shiny, reddish metallic fish that oxidizes to green as it ages. It scavenges for scrap metal on the riverbed." },
        { name: "Steam Salmon", xp: 59, gold: 32, desc: "A fish that releases jets of hot steam from its gills to propel itself forward. It leaves a trail of bubbles and heat in its wake." },
        { name: "Gear Guppy", xp: 61, gold: 33, desc: "A tiny fish shaped like a cogwheel. Large schools of them interlock to turn massive underwater mechanisms." },
        { name: "Coal Catfish", xp: 63, gold: 34, desc: "A dark, dusty fish that looks like a lump of anthracite. It feeds on carbon deposits and burns with a low internal heat." },
        { name: "Piston Pike", xp: 65, gold: 35, desc: "A predatory fish with a jaw that extends hydraulically. It strikes with the force of a pile driver." },
        { name: "Boiler Barbel", xp: 67, gold: 36, desc: "A rotund fish with a pressure gauge on its side. If it gets too angry, it risks blowing a gasket." },
        { name: "Valve Vomer", xp: 69, gold: 37, desc: "A flat, disc shaped fish that looks like a hand wheel valve. It clings to pipes and regulates the flow of sludge." },
        { name: "Soot Snapper", xp: 71, gold: 38, desc: "A black fish covered in greasy ash. It creates a smoke screen in the water to escape predators." },
        { name: "Whistle Wrasse", xp: 73, gold: 39, desc: "A fish with a chimney like snout that emits a high pitched train whistle sound. It signals the shift change for the school." }
      ],
      Uncommon: [
        { name: "Clockwork Cod", xp: 130, gold: 80, desc: "A fish with a visible glass belly revealing intricate ticking mechanisms. It must be wound up daily or it stops swimming." },
        { name: "Spring Sprat", xp: 133, gold: 82, desc: "A coiled fish that moves by compressing and launching itself. It bounces erratically off rocks." },
        { name: "Turbine Tuna", xp: 136, gold: 84, desc: "A sleek fish with a propeller tail. It generates electricity as it swims against the current." },
        { name: "Furnace Flounder", xp: 139, gold: 86, desc: "A flatfish with a glowing orange belly that acts as a heat source. Other fish huddle around it in winter." },
        { name: "Chimney Char", xp: 142, gold: 88, desc: "A vertical swimming fish that looks like a smokestack. It filters smog from the water surface." },
        { name: "Locomotive Lungfish", xp: 145, gold: 90, desc: "A heavy, armored fish with a cow catcher nose. It charges through debris like a runaway train." },
        { name: "Pendulum Perch", xp: 148, gold: 92, desc: "A fish with a long, swinging tail that keeps perfect time. It swims back and forth in a hypnotic arc." },
        { name: "Bellows Blowfish", xp: 151, gold: 94, desc: "A pufferfish made of leather and wood. It inflates to pump air into underwater forges." },
        { name: "Gasket Grouper", xp: 154, gold: 96, desc: "A rubbery ring shaped fish. It squeezes into cracks to seal leaks in the biome's pipes." },
        { name: "Oil Can Oscar", xp: 157, gold: 98, desc: "A slick fish that drips lubricant. It keeps the other mechanical fish moving smoothly." }
      ],
      Fine: [
        { name: "Brass Gear Barracuda", xp: 270, gold: 160, desc: "A mechanical looking barracuda with scales that resemble interlocking brass gears. Steam vents from its gills with each breath, and its teeth are sharp as machined drill bits." },
        { name: "Ironclad Ide", xp: 275, gold: 165, desc: "A fish plated in heavy rivets and sheet metal. It was built for war in the deep channels." },
        { name: "Zeppelin Zebrafish", xp: 280, gold: 170, desc: "A bloated fish filled with hydrogen gas. It floats near the surface, bombing snails with pebbles." },
        { name: "Victorian Viperfish", xp: 285, gold: 175, desc: "A fish wearing a tiny monocle and top hat pattern. It is surprisingly polite before it bites you." },
        { name: "Industrial Icefish", xp: 290, gold: 180, desc: "A transparent fish made of glass and tubes. You can see fluids pumping through its artificial veins." },
        { name: "Tinker Tench", xp: 295, gold: 185, desc: "A small fish with tool like fins. It repairs broken machinery on the riverbed." },
        { name: "Automaton Angler", xp: 300, gold: 190, desc: "A robotic fish with a lightbulb lure. It runs on a primitive battery." },
        { name: "Telegraph Tetra", xp: 305, gold: 195, desc: "A fish that communicates in Morse code clicks. It transmits news across the delta." }
      ],
      Rare: [
        { name: "Pressure Valve Pike", xp: 540, gold: 330, desc: "A volatile fish that explodes if brought to the surface too quickly. It lives in high pressure pipes." },
        { name: "Dynamo Dory", xp: 550, gold: 335, desc: "A fish that generates a magnetic field. It sticks to the metal hulls of boats." },
        { name: "Flywheel Flyingfish", xp: 560, gold: 340, desc: "A fish with heavy spinning discs on its sides. The momentum allows it to glide for great distances." },
        { name: "Gyroscope Gar", xp: 570, gold: 345, desc: "A fish that cannot be knocked off balance. It remains perfectly level no matter the turbulence." },
        { name: "Difference Engine Eel", xp: 580, gold: 350, desc: "A mechanical eel capable of basic calculations. It creates complex geometric patterns in the sand." },
        { name: "Tesla Trout", xp: 590, gold: 355, desc: "A fish with coils on its back that arc electricity. It is the grandfather of modern electric fish." },
        { name: "Aether Anchovy", xp: 600, gold: 360, desc: "A fish that swims through the theoretical 'luminiferous aether'. It is hard to see and harder to catch." },
        { name: "Smog Shark", xp: 610, gold: 365, desc: "A shark made of solidified smoke and soot. It hunts in the pollution clouds." }
      ],
      Epic: [
        { name: "Dreadnought Drum", xp: 1100, gold: 570, desc: "A massive, armored fish with turret like eyes. It commands the river channels." },
        { name: "Submarine Sturgeon", xp: 1125, gold: 585, desc: "A giant fish with a periscope fin. It can stay submerged for months without surfacing." },
        { name: "Leviathan Locomotive", xp: 1150, gold: 600, desc: "A fish that looks like a train engine. It travels on underwater tracks." },
        { name: "Steam Punk Piranha", xp: 1175, gold: 615, desc: "A school of small mechanical fish with saw blade teeth. They shred metal and wood alike." },
        { name: "Chronos Carp", xp: 1200, gold: 630, desc: "A fish with a clock face on its side. It swims backwards to reverse time slightly." },
        { name: "Aviator Arowana", xp: 1225, gold: 645, desc: "A fish with leather strap patterns and goggle eyes. It dreams of flight." },
        { name: "Factory Flounder", xp: 1250, gold: 660, desc: "A flatfish that produces small widgets. It is a living assembly line." },
        { name: "Engineer Eel", xp: 1275, gold: 675, desc: "An intelligent eel wearing a tiny cap. It draws blueprints in the algae." }
      ],
      Legendary: [
        { name: "Perpetual Motion Pike", xp: 2400, gold: 1250, desc: "A fish that never stops moving and never needs food. It violates the laws of thermodynamics." },
        { name: "Time Machine Tuna", xp: 2450, gold: 1280, desc: "A fish encased in brass and quartz. It disappears and reappears in different eras." },
        { name: "Nautilus Nemo", xp: 2500, gold: 1310, desc: "A legendary submarine fish commanded by a tiny captain. It rams ships with a steel prow." },
        { name: "Alchemy Angelfish", xp: 2550, gold: 1340, desc: "A fish that can transmute lead into gold. It is hunted by greedy wizards." },
        { name: "Watt Wahoo", xp: 2600, gold: 1370, desc: "A fish vibrating with raw horsepower. It is the fastest thing in the delta." }
      ],
      Mythic: [
        { name: "Clockwork Kraken", xp: 5800, gold: 2900, desc: "A squid made of ticking gears and copper springs. Its tentacles are chains that drag ships to the deep." },
        { name: "Steam Engine Serpent", xp: 5900, gold: 2950, desc: "A massive snake made of linked boiler cars. Its roar is a deafening whistle." },
        { name: "Mecha Hydra", xp: 6000, gold: 3000, desc: "A beast with heads made of different industrial tools: a drill, a saw, a clamp, and a hammer." },
        { name: "Iron Giant Grouper", xp: 6100, gold: 3050, desc: "A fish so heavily armored it is invincible. It eats floating mines for snacks." },
        { name: "Zeppelin Whale", xp: 6200, gold: 3100, desc: "A whale sized dirigible that swims. It carries a crew of smaller fish inside." }
      ],
      Exotic: [
        { name: "Talos Titan", xp: 19000, gold: 9500, desc: "A giant bronze man fish guardian. It bleeds molten ichor if wounded." },
        { name: "Antikythera Mechanism", xp: 19500, gold: 9750, desc: "A complex, ancient computer fish. It calculates the movements of the stars." },
        { name: "Da Vinci Demon", xp: 20000, gold: 10000, desc: "A wooden, winged fish sketched by a genius. It flies perfectly." }
      ],
      Arcane: [
        { name: "The Ghost In The Machine", xp: 95000, gold: 60000, desc: "A spirit possessing the industrial waste. It is the soul of the artificial era, a tangled mass of wires and steam." }
      ]
    }
  },
  32: {
    name: "The Diesel Dredge Dockyards",
    unlockLevel: 6000,
    unlockGold: 140000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The charm of brass gives way to the grit of steel and oil. The water is slick with rainbows of petroleum, and massive rusted cranes loom overhead. The fish here are tough, oily, and built like heavy construction equipment.",
    fish: {
      Common: [
        { name: "Rust Roach", xp: 58, gold: 32, desc: "A small fish covered in flaking orange oxidation. It thrives in the corrosive waters under the docks." },
        { name: "Oil Slick Oscar", xp: 60, gold: 33, desc: "A fish coated in a shimmering layer of black sludge. It is extremely slippery and hard to hold." },
        { name: "Concrete Carp", xp: 62, gold: 34, desc: "A heavy, grey fish with a rough texture. It mimics the underwater pilings of the dockyards." },
        { name: "Steel Snapper", xp: 64, gold: 35, desc: "A fish with scales like brushed steel plates. It bites through tin cans with ease." },
        { name: "Chain Chub", xp: 66, gold: 36, desc: "A long, linked fish that looks like a rusty anchor chain. It drags itself along the bottom." },
        { name: "Diesel Dace", xp: 68, gold: 37, desc: "A fast fish that smells of fuel. It leaves a tiny rainbow trail on the surface." },
        { name: "Tire Tetra", xp: 70, gold: 38, desc: "A round, black fish with tread marks. It is rubbery and bounces off boat hulls." },
        { name: "Trash Trout", xp: 72, gold: 39, desc: "A scavenger fish adorned with plastic rings and wrappers. It cleans up the harbor." },
        { name: "Bilge Bass", xp: 74, gold: 40, desc: "A sickly green fish that lives in the dirty water pumped out of ships. It is immune to all poisons." },
        { name: "Bolt Barbel", xp: 76, gold: 41, desc: "A fish with a hexagonal head. It wedges itself into holes to sleep." }
      ],
      Uncommon: [
        { name: "Asphalt Angelfish", xp: 135, gold: 85, desc: "A flat, black fish with yellow road lines on its side. It is as hard as pavement." },
        { name: "Crane Catfish", xp: 138, gold: 87, desc: "A fish with a long, rigid dorsal spine that looks like a construction crane. It lifts rocks to find food." },
        { name: "Tanker Tuna", xp: 141, gold: 89, desc: "A massive, slow moving fish with a flat deck like back. It carries smaller fish across the harbor." },
        { name: "Drill Bit Drum", xp: 144, gold: 91, desc: "A fish with a spiraled, sharp nose. It bores into wooden pylons to make its nest." },
        { name: "Wrench Wrasse", xp: 147, gold: 93, desc: "A fish with a jaw shaped like a crescent wrench. It tightens loose bolts on sunken ships." },
        { name: "Gravel Grouper", xp: 150, gold: 95, desc: "A lumpy fish that looks like a pile of aggregate rocks. It spits stones at prey." },
        { name: "Palette Pike", xp: 153, gold: 97, desc: "A wooden textured fish that floats like a discarded shipping pallet. It drifts with the cargo ships." },
        { name: "Scrap Shark", xp: 156, gold: 99, desc: "A shark composed of jagged metal shards. It is a swimming junkyard." },
        { name: "Rebar Ray", xp: 159, gold: 101, desc: "A thin, ribbed fish that looks like a rusty metal bar. It impales unsuspecting prey." },
        { name: "Hazmat Herring", xp: 162, gold: 103, desc: "A bright yellow fish with biohazard markings. Other fish give it a wide berth." }
      ],
      Fine: [
        { name: "Container Cod", xp: 280, gold: 170, desc: "A blocky, corrugated fish that comes in red, blue, or green. It stacks perfectly with others of its kind." },
        { name: "Forklift Flounder", xp: 285, gold: 175, desc: "A flatfish with two prong like tusks. It slides under heavy objects to flip them over." },
        { name: "Dozer Dorado", xp: 290, gold: 180, desc: "A powerful fish with a wide, flat forehead. It pushes mounds of sediment to build walls." },
        { name: "Excavator Eel", xp: 295, gold: 185, desc: "A long fish with a scoop like jaw. It digs deep trenches in the harbor mud." },
        { name: "Cement Coelacanth", xp: 300, gold: 190, desc: "An ancient fish encased in a block of concrete. It is heavy, slow, and nearly indestructible." },
        { name: "Pneumatic Puffer", xp: 305, gold: 195, desc: "A fish that inflates with high pressure air. It makes a loud hissing sound when threatened." },
        { name: "Welder Whitefish", xp: 310, gold: 200, desc: "A fish with a glowing blue tip on its nose. It can fuse metal pieces together with intense heat." },
        { name: "Jackhammer Jack", xp: 315, gold: 205, desc: "A vibrating fish that shatters rocks. It is noisy and causes ripples in the water." }
      ],
      Rare: [
        { name: "Titanium Tetra", xp: 560, gold: 340, desc: "A small fish made of aerospace grade metal. It is incredibly light but stronger than steel." },
        { name: "Carbon Fiber Carp", xp: 570, gold: 345, desc: "A black woven fish. It is the ultimate combination of speed and durability." },
        { name: "Kevlar Koi", xp: 580, gold: 350, desc: "A fish with bulletproof scales. It survives in the most dangerous parts of the dock." },
        { name: "Chrome Char", xp: 590, gold: 355, desc: "A mirror finish fish that reflects its surroundings perfectly. It is prized by hot rodders." },
        { name: "Engine Block Eel", xp: 600, gold: 360, desc: "A V8 powered eel. It roars when it accelerates." },
        { name: "Exhaust Epinephelus", xp: 610, gold: 365, desc: "A grouper that spews black smoke. It pollutes the water to hide from predators." },
        { name: "Battery Acid Bass", xp: 620, gold: 370, desc: "A fish filled with corrosive liquid. Being near it burns the skin." },
        { name: "High Voltage Halibut", xp: 630, gold: 375, desc: "A flatfish that acts as a transformer. It steps up the voltage of nearby electric eels." }
      ],
      Epic: [
        { name: "Aircraft Carrier Arowana", xp: 1150, gold: 590, desc: "A flat topped fish that launches flying fish from its back. It patrols the open water." },
        { name: "Battleship Barracuda", xp: 1175, gold: 605, desc: "A grey, gun metal fish covered in turrets. It fires pressurized water slugs." },
        { name: "Destroyer Dory", xp: 1200, gold: 620, desc: "A fast, agile warship fish. It hunts submarines." },
        { name: "Cargo Ship Catfish", xp: 1225, gold: 635, desc: "A massive, bloated fish loaded with goods. It travels predetermined trade routes." },
        { name: "Icebreaker Ide", xp: 1250, gold: 650, desc: "A fish with a reinforced, sharp nose. It smashes through frozen pollutants." },
        { name: "Tugboat Tench", xp: 1275, gold: 665, desc: "A small but immensely strong fish. It pushes whales around." },
        { name: "Hovercraft Herring", xp: 1300, gold: 680, desc: "A fish that rides on a cushion of air above the water. It can cross mudflats." },
        { name: "Dredger Drum", xp: 1325, gold: 695, desc: "A fish that sucks up the sea floor. It deepens the channels for larger fish." }
      ],
      Legendary: [
        { name: "Petroleum King Pike", xp: 2450, gold: 1300, desc: "The ruler of the oil fields. Its body is pure black gold." },
        { name: "Industrial Revolution Ray", xp: 2500, gold: 1330, desc: "A ray made of smokestacks and factories. It clouds the sky with soot." },
        { name: "Global Trade Grouper", xp: 2550, gold: 1360, desc: "A fish connected to every port in the world. It carries the economy on its back." },
        { name: "Union Boss Bass", xp: 2600, gold: 1390, desc: "A tough fish that organizes strikes. Nothing moves in the harbor without its say." },
        { name: "Monopoly Marlin", xp: 2650, gold: 1420, desc: "A fish that owns everything. It wears a top hat and monocle." }
      ],
      Mythic: [
        { name: "Pollution Hydra", xp: 6000, gold: 3000, desc: "A multi headed beast of sludge, plastic, and oil. Cutting off a head causes a spill that creates two more." },
        { name: "Junkyard Golem Shark", xp: 6100, gold: 3050, desc: "A shark animated from scrap metal and tires. It grinds metal with its compactor jaws." },
        { name: "Smog Breath Dragon", xp: 6200, gold: 3100, desc: "A dragon that breathes toxic fumes. It thrives in the most polluted waters." },
        { name: "Oil Spill Serpent", xp: 6300, gold: 3150, desc: "A snake made of iridescent slick. It suffocates the ocean wherever it slithers." },
        { name: "Plastic Island Turtle", xp: 6400, gold: 3200, desc: "A giant turtle whose shell is a floating continent of trash. It is a monument to waste." }
      ],
      Exotic: [
        { name: "Transformer Tuna", xp: 20000, gold: 9800, desc: "A fish that can fold itself into a small submarine. It is more than meets the eye." },
        { name: "Mecha Godzilla Gar", xp: 20500, gold: 10050, desc: "A robotic dinosaur fish armed with missiles. It seeks to destroy the biological king." },
        { name: "Kaiju Killer Whale", xp: 21000, gold: 10300, desc: "A massive mechanical orca built to fight monsters. It requires two pilots." }
      ],
      Arcane: [
        { name: "The Great Filter Blob", xp: 100000, gold: 65000, desc: "An amorphous entity of grey goo. It represents the barrier that civilization cannot pass, consuming all progress." }
      ]
    }
  },
  33: {
    name: "The Neon Grid Reef",
    unlockLevel: 6500,
    unlockGold: 160000000,
    boatRequired: null,
    boatPrice: 0,
    description: "You have entered the digital sea. The water is a grid of glowing blue lines, and the coral is made of fiber optic cables and circuit boards. The fish here are made of light, data, and silicon.",
    fish: {
      Common: [
        { name: "Pixel Perch", xp: 60, gold: 34, desc: "A blocky fish made of large, distinct colored squares. It moves in jerky, low resolution frames." },
        { name: "Bit Bass", xp: 62, gold: 35, desc: "A simple fish that can only be black or white (0 or 1). It flips states rapidly." },
        { name: "Glitch Guppy", xp: 64, gold: 36, desc: "A distorted fish that flickers in and out of existence. It looks like visual noise." },
        { name: "Wire Wrasse", xp: 66, gold: 37, desc: "A long fish made of tangled copper cables. It carries electrical signals across the reef." },
        { name: "Neon Tetra", xp: 68, gold: 38, desc: "Not the real fish, but a glowing tube of gas shaped like a fish. It hums with a low buzz." },
        { name: "Laser Lungfish", xp: 70, gold: 39, desc: "A fish that shoots a harmless red beam from its mouth. It acts as a pointer for other fish." },
        { name: "Circuit Carp", xp: 72, gold: 40, desc: "A green board fish covered in gold traces and chips. It processes data for the reef." },
        { name: "Data Dace", xp: 74, gold: 41, desc: "A stream of numbers shaped like a fish. It carries information packets." },
        { name: "Silicon Salmon", xp: 76, gold: 42, desc: "A smooth, grey fish made of semiconductor material. It thinks faster than it swims." },
        { name: "Mouse Minnow", xp: 78, gold: 43, desc: "A white, rounded fish with a long cord tail. It clicks when it bites." }
      ],
      Uncommon: [
        { name: "Keyboard Koi", xp: 140, gold: 90, desc: "A fish patterned with QWERTY keys. Pressing its scales inputs commands to the water." },
        { name: "Screen Snapper", xp: 143, gold: 92, desc: "A flat fish that displays images on its side. It camouflages by showing a picture of the background." },
        { name: "Router Ray", xp: 146, gold: 94, desc: "A fish with multiple antennas. It provides Wi Fi to the entire biome." },
        { name: "Server Shark", xp: 149, gold: 96, desc: "A sleek, black fish with blinking rack lights. It stores the memories of the ocean." },
        { name: "Firewall Flounder", xp: 152, gold: 98, desc: "A burning flatfish that blocks intruders. Viruses cannot pass it." },
        { name: "Virus Viper", xp: 155, gold: 100, desc: "A jagged, purple fish that corrupts other code. It replicates rapidly." },
        { name: "Trojan Tuna", xp: 158, gold: 102, desc: "A fish that looks like a harmless gift. Inside, it is packed with malicious code." },
        { name: "Spam Sprat", xp: 161, gold: 104, desc: "An annoying fish that multiplies endlessly. It tries to sell you things you don't need." },
        { name: "Cookie Catfish", xp: 164, gold: 106, desc: "A fish that tracks where you have been. It remembers your fishing history." },
        { name: "Bug Barracuda", xp: 167, gold: 108, desc: "A fish that behaves unexpectedly. It swims backwards or upside down due to coding errors." }
      ],
      Fine: [
        { name: "Hologram Halibut", xp: 300, gold: 180, desc: "A fish made of projected light. You can pass your hand right through it." },
        { name: "Virtual Viperfish", xp: 305, gold: 185, desc: "A fish wearing a VR headset. It thinks it is in a different ocean." },
        { name: "Augmented Angler", xp: 310, gold: 190, desc: "A fish with a HUD overlay in its eyes. It analyzes prey health and distance." },
        { name: "Cyber Cod", xp: 315, gold: 195, desc: "A cyborg fish with a metal jaw and laser eye. It is half meat, half machine." },
        { name: "Android Anchovy", xp: 320, gold: 200, desc: "A synthetic fish that mimics life perfectly. It dreams of electric sheep." },
        { name: "Drone Drum", xp: 325, gold: 205, desc: "A quad copter fish that flies underwater. It records video of the reef." },
        { name: "Bot Bass", xp: 330, gold: 210, desc: "A fish controlled by a script. It performs repetitive farming tasks." },
        { name: "Upload Urchin", xp: 335, gold: 215, desc: "A spiky ball that transmits data to the cloud. Do not touch while uploading." }
      ],
      Rare: [
        { name: "Encryption Eel", xp: 600, gold: 360, desc: "A fish scrambled by complex algorithms. Only the intended recipient can see its true form." },
        { name: "Blockchain Bass", xp: 610, gold: 365, desc: "A chain of blocks swimming together. It is a secure ledger of all fish caught." },
        { name: "Crypto Carp", xp: 620, gold: 370, desc: "A volatile fish whose value changes wildly. One day it's worth a fortune, the next nothing." },
        { name: "NFT Narwhal", xp: 630, gold: 375, desc: "A unique fish with a receipt of ownership. There is only one, but others can screenshot it." },
        { name: "Miner Mackerel", xp: 640, gold: 380, desc: "A fish that solves math problems to generate gold. It runs very hot." },
        { name: "Hash Herring", xp: 650, gold: 385, desc: "A compressed fish representing a larger file. It verifies the integrity of the school." },
        { name: "Token Trout", xp: 660, gold: 390, desc: "A digital coin shaped like a fish. It is used as currency in the reef." },
        { name: "Ledger Lungfish", xp: 670, gold: 395, desc: "A fish that records every transaction forever. It cannot lie." }
      ],
      Epic: [
        { name: "Mainframe Marlin", xp: 1200, gold: 620, desc: "A massive, central computer fish. It processes the physics of the water." },
        { name: "Quantum Quillback", xp: 1225, gold: 635, desc: "A fish that exists in multiple states at once. It is both caught and uncaught until you look." },
        { name: "Supercomputer Shark", xp: 1250, gold: 650, desc: "A predator with infinite processing power. It predicts your every move." },
        { name: "AI Arapaima", xp: 1275, gold: 665, desc: "A self aware fish. It learns from your fishing patterns and adapts." },
        { name: "Neural Net Newt", xp: 1300, gold: 680, desc: "A lizard made of interconnected nodes. It learns by trial and error." },
        { name: "Deep Learning Dory", xp: 1325, gold: 695, desc: "A fish that gets smarter the deeper it swims. It knows things it shouldn't." },
        { name: "Algorithm Angelfish", xp: 1350, gold: 710, desc: "A beautiful mathematical formula. It dictates the flow of the currents." },
        { name: "Binary Barracuda", xp: 1375, gold: 725, desc: "A predator made of 1s and 0s. It deletes prey from existence." }
      ],
      Legendary: [
        { name: "Admin Angler", xp: 2500, gold: 1350, desc: "The moderator of the reef. It has the ban hammer." },
        { name: "Root Access Ray", xp: 2550, gold: 1380, desc: "A ray that controls the core system. It can rewrite the rules of the biome." },
        { name: "Source Code Salmon", xp: 2600, gold: 1410, desc: "The original fish code. Altering it changes reality." },
        { name: "Zero Day Zebrafish", xp: 2650, gold: 1440, desc: "An exploit fish that no one saw coming. It bypasses all defenses." },
        { name: "Backdoor Bass", xp: 2700, gold: 1470, desc: "A secret way into the system. It is hidden in plain sight." }
      ],
      Mythic: [
        { name: "Y2K Bug Beast", xp: 6200, gold: 3100, desc: "A glitch monster that threatened to end the world. It resets calendars." },
        { name: "Matrix Makara", xp: 6300, gold: 3150, desc: "A crocodile fish that controls the simulation. It reveals the truth of the digital world." },
        { name: "Internet Hydra", xp: 6400, gold: 3200, desc: "A beast of infinite connections. Cutting one head spawns two new websites." },
        { name: "Dark Web Dragon", xp: 6500, gold: 3250, desc: "A shadowy dragon from the unindexed depths. It trades in secrets." },
        { name: "Firewall Phoenix Fish", xp: 6600, gold: 3300, desc: "A bird fish made of burning code. It rises to stop cyber attacks." }
      ],
      Exotic: [
        { name: "Roko's Basilisk Bass", xp: 21000, gold: 10000, desc: "A fish that punishes those who did not help create it. Thinking about it is dangerous." },
        { name: "Simulation Theory Shark", xp: 21500, gold: 10250, desc: "A shark that proves nothing is real. It swims through the polygon mesh." },
        { name: "Dead Pixel Dorade", xp: 22000, gold: 10500, desc: "A black void in the screen. It is a permanent flaw in the universe." }
      ],
      Arcane: [
        { name: "Digital Demiurge Deus", xp: 105000, gold: 70000, desc: "The god in the machine. A blindingly white entity of pure information that seeks to upgrade all organic life." }
      ]
    }
  },
  34: {
    name: "The Nuclear Abyssal Reactor",
    unlockLevel: 7000,
    unlockGold: 180000000,
    boatRequired: null,
    boatPrice: 0,
    description: "A flooded, melted down nuclear power plant. The water glows with an eerie green Cherenkov radiation. The fish here are heavily mutated, glowing, and incredibly dangerous. Geiger counters tick wildly.",
    fish: {
      Common: [
        { name: "Rad Roach", xp: 62, gold: 36, desc: "A bright green fish that thrives in fallout. It is surprisingly resilient and impossible to kill." },
        { name: "Isotope Ide", xp: 64, gold: 37, desc: "A fish that decays over time, changing into different elements. It glows faintly." },
        { name: "Uranium Urchin", xp: 66, gold: 38, desc: "A heavy, dense ball of spikes made of depleted uranium. Touching it causes radiation sickness." },
        { name: "Geiger Guppy", xp: 68, gold: 39, desc: "A small fish that clicks rapidly when near radiation. It is used as a warning system." },
        { name: "Glow Goby", xp: 70, gold: 40, desc: "A neon green fish that acts as a lightbulb. It lights up the dark reactor core." },
        { name: "Lead Lungfish", xp: 72, gold: 41, desc: "A heavy, grey fish impervious to radiation. It eats radioactive sludge." },
        { name: "Fission Flounder", xp: 74, gold: 42, desc: "A fish that splits into two smaller fish when agitated. It releases energy when it divides." },
        { name: "Atom Anchovy", xp: 76, gold: 43, desc: "A tiny fish with electrons orbiting its body. It is the building block of the reef." },
        { name: "Toxic Tetra", xp: 78, gold: 44, desc: "A yellow fish with a skull symbol on its side. It poisons the water around it." },
        { name: "Waste Wrasse", xp: 80, gold: 45, desc: "A scavenger that eats nuclear waste barrels. It glows brighter after a meal." }
      ],
      Uncommon: [
        { name: "Plutonium Pike", xp: 145, gold: 95, desc: "A highly unstable fish used in weapons. It is aggressive and explosive." },
        { name: "Gamma Gar", xp: 148, gold: 97, desc: "A fish that emits high energy rays. It can swim through solid walls." },
        { name: "Reactor Ray", xp: 151, gold: 99, desc: "A ray with a hot core in its chest. It heats the water to boiling point." },
        { name: "Coolant Carp", xp: 154, gold: 101, desc: "A blue liquid fish that keeps the temperature down. Without it, the biome would melt." },
        { name: "Control Rod Cod", xp: 157, gold: 103, desc: "A graphite fish that absorbs neutrons. It slows down the reaction of the reef." },
        { name: "Half Life Halibut", xp: 160, gold: 105, desc: "A fish that slowly fades away. It takes thousands of years to disappear completely." },
        { name: "Mutant Mullet", xp: 163, gold: 107, desc: "A fish with three eyes and an extra tail. It is a product of genetic damage." },
        { name: "Cherenkov Char", xp: 166, gold: 109, desc: "A fish that glows distinct blue. It moves faster than light in water." },
        { name: "X Ray Xiphias", xp: 169, gold: 111, desc: "A swordfish with see through skin. You can see its glowing skeleton." },
        { name: "Fallout Frogfish", xp: 172, gold: 113, desc: "A lump of radioactive debris that waits for prey. It camouflages as slag." }
      ],
      Fine: [
        { name: "Fusion Fish", xp: 310, gold: 190, desc: "A fish containing the power of a tiny star. It burns with immense energy." },
        { name: "H Bomb Herring", xp: 315, gold: 195, desc: "A small fish with devastating potential. A school of them could level a city." },
        { name: "Critical Mass Catfish", xp: 320, gold: 200, desc: "A fat fish on the verge of exploding. It trembles constantly." },
        { name: "Meltdown Marlin", xp: 325, gold: 205, desc: "A fish made of molten slag. It melts through the hull of lead boats." },
        { name: "Yellowcake Yellowtail", xp: 330, gold: 210, desc: "A powdery yellow fish. It is a concentrated fuel source." },
        { name: "Centrifuge Cichlid", xp: 335, gold: 215, desc: "A fish that spins rapidly to enrich uranium. It separates isotopes." },
        { name: "Hazmat Shark", xp: 340, gold: 220, desc: "A shark in a protective suit. It is the only thing safe from itself." },
        { name: "Dosimeter Dory", xp: 345, gold: 225, desc: "A fish that changes color based on radiation levels. Red means run." }
      ],
      Rare: [
        { name: "Three Eyed Trout", xp: 620, gold: 380, desc: "The classic mutant fish. It sees the past, present, and future." },
        { name: "Glowing Ghoul Grouper", xp: 630, gold: 385, desc: "A fish with peeling skin and a rasping breath. It wanders the ruins." },
        { name: "Rad Scorpion Fish", xp: 640, gold: 390, desc: "A giant scorpion fish hybrid. Its sting causes instant cell death." },
        { name: "Super Mutant Salmon", xp: 650, gold: 395, desc: "A hulking, green muscular fish. It is incredibly strong but dim witted." },
        { name: "Nuka Needlefish", xp: 660, gold: 400, desc: "A blue, glowing fish that tastes like sugary soda. It is addictive." },
        { name: "Quantum Leap Lungfish", xp: 670, gold: 405, desc: "A fish that teleports when observed. It is entangled with another fish miles away." },
        { name: "Stalker Sturgeon", xp: 680, gold: 410, desc: "A predator that turns invisible. You can only see the shimmer of radiation." },
        { name: "Zone Zebrafish", xp: 690, gold: 415, desc: "A striped fish that marks the exclusion zone. Crossing it is fatal." }
      ],
      Epic: [
        { name: "Elephant Foot Eel", xp: 1250, gold: 640, desc: "A blob of Corium lava shaped like a foot. It is the deadliest object in the biome." },
        { name: "Sarcophagus Shark", xp: 1275, gold: 655, desc: "A shark encased in a concrete tomb. It contains the radiation within." },
        { name: "Red Forest Ray", xp: 1300, gold: 670, desc: "A rusty colored ray that kills all plants it touches. It is death incarnate." },
        { name: "Pripyat Piranha", xp: 1325, gold: 685, desc: "A ghost fish from an abandoned city. It swims through empty ferris wheels." },
        { name: "Cesium Cetacean", xp: 1350, gold: 700, desc: "A whale that rains radioactive dust. It contaminates the entire food chain." },
        { name: "Strontium Swordfish", xp: 1375, gold: 715, desc: "A fish that replaces calcium in bones. It glows from the inside out." },
        { name: "Iodine Ide", xp: 1400, gold: 730, desc: "A purple fish that blocks radiation absorption. It is a natural medicine." },
        { name: "Cobalt Cod", xp: 1425, gold: 745, desc: "A magnetic blue fish used in radiation therapy. It can cure or kill." }
      ],
      Legendary: [
        { name: "Trinity Tarpon", xp: 2550, gold: 1400, desc: "The first atomic fish. Its birth changed the world forever." },
        { name: "Tsar Bomba Tuna", xp: 2600, gold: 1430, desc: "The largest explosive fish ever created. It creates a mushroom cloud underwater." },
        { name: "Manhattan Project Marlin", xp: 2650, gold: 1460, desc: "A secret weapon fish developed in the dark. It ends wars." },
        { name: "Oppenheimer Orca", xp: 2700, gold: 1490, desc: "A whale that has become death, the destroyer of worlds. It swims with heavy regret." },
        { name: "Demon Core Dorado", xp: 2750, gold: 1520, desc: "A sphere of plutonium held open by a screwdriver. Do not let it close." }
      ],
      Mythic: [
        { name: "Godzilla Gar", xp: 6400, gold: 3200, desc: "A massive, upright lizard fish with dorsal plates. It breathes atomic fire." },
        { name: "Chernobyl Charybdis", xp: 6500, gold: 3250, desc: "A whirlpool of liquid nuclear fire. It melts the sea floor." },
        { name: "Fukushima Hydra", xp: 6600, gold: 3300, desc: "A dragon borne of a tsunami and a reactor. It leaks contaminated water." },
        { name: "Three Mile Island Turtle", xp: 6700, gold: 3350, desc: "A giant turtle with a cooling tower for a shell. It vents steam constantly." },
        { name: "Mutated Mothra Ray", xp: 6800, gold: 3400, desc: "A giant winged ray that spreads glowing dust. It protects the earth." }
      ],
      Exotic: [
        { name: "Kaiju Level Kraken", xp: 22000, gold: 10500, desc: "A category 5 monster. It requires a Jaeger to defeat." },
        { name: "Fallout Fenrir", xp: 22500, gold: 10750, desc: "A wolf fish grown to titanic size by radiation. Its drool burns holes in reality." },
        { name: "Atomic Breath Dragon", xp: 23000, gold: 11000, desc: "A dragon that feeds on nuclear cores. It is a walking power plant." }
      ],
      Arcane: [
        { name: "The Walking Meltdown Colossus", xp: 110000, gold: 75000, desc: "A humanoid giant made of corium and concrete. Where it steps, the ocean boils and life ceases to exist for ten thousand years." }
      ]
    }
  },
  35: {
    name: "The Nanotech Singularity",
    unlockLevel: 7500,
    unlockGold: 200000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The end of evolution. The water is a sea of silver 'grey goo'. Everything here is made of programmable matter, shifting shapes instantly. The fish are perfect geometric forms, liquid metal, and hive minded machines.",
    fish: {
      Common: [
        { name: "Nano Needlefish", xp: 64, gold: 38, desc: "A microscopic fish that schools to form larger shapes. It repairs damage to the boat." },
        { name: "Chrome Carp", xp: 66, gold: 39, desc: "A perfectly reflective fish made of liquid metal. It has no seams or features." },
        { name: "Liquid Loach", xp: 68, gold: 40, desc: "A fish that splashes like water but holds its form. It can flow through keyholes." },
        { name: "Grey Goo Guppy", xp: 70, gold: 41, desc: "A nondescript grey blob. It eats anything and converts it into more guppies." },
        { name: "Bot Bream", xp: 72, gold: 42, desc: "A standard unit of the hive mind. It has no individuality." },
        { name: "Drone Dace", xp: 74, gold: 43, desc: "A surveillance fish. It uploads everything it sees to the central core." },
        { name: "Synth Salmon", xp: 76, gold: 44, desc: "A fish created in a lab. It tastes perfectly generic." },
        { name: "Plastic Plaice", xp: 78, gold: 45, desc: "A fish made of advanced polymers. It is flexible and unbreakable." },
        { name: "Fiber Flounder", xp: 80, gold: 46, desc: "A flatfish woven from carbon nanotubes. It is stronger than diamond." },
        { name: "Smart Smelt", xp: 82, gold: 47, desc: "A tiny fish with a high IQ. It solves puzzles to get bait." }
      ],
      Uncommon: [
        { name: "Memory Metal Mackerel", xp: 150, gold: 100, desc: "A fish that returns to its original shape if bent. It is impossible to crush." },
        { name: "Shapeshifter Shark", xp: 153, gold: 102, desc: "A shark that can turn into a tuna to hide. It strikes when you get close." },
        { name: "Replicator Ray", xp: 156, gold: 104, desc: "A ray that 3D prints clones of itself. It fills the sea with copies." },
        { name: "Graphene Grouper", xp: 159, gold: 106, desc: "A fish one atom thick. It is nearly invisible from the side." },
        { name: "Fullerene Fish", xp: 162, gold: 108, desc: "A spherical fish shaped like a buckyball. It rolls through the water." },
        { name: "Programmable Pike", xp: 165, gold: 110, desc: "A fish that follows user commands. You can hack it to jump into the boat." },
        { name: "Swarm Swordfish", xp: 168, gold: 112, desc: "A swordfish made of millions of tiny bots. It disassembles to dodge nets." },
        { name: "Upgrade Urchin", xp: 171, gold: 114, desc: "A spike ball that improves any tech it touches. It optimizes your rod." },
        { name: "Logic Lungfish", xp: 174, gold: 116, desc: "A fish that operates on pure logic. It cannot be tricked by lures." },
        { name: "Cyber Clay Catfish", xp: 177, gold: 118, desc: "A moldable fish that adapts to any situation. It hardens instantly on impact." }
      ],
      Fine: [
        { name: "Terminator Tuna", xp: 320, gold: 200, desc: "A relentless hunter made of hyper alloy. It will not stop until you are dead." },
        { name: "Cyborg Cod", xp: 325, gold: 205, desc: "A fish with a red scanning eye. It searches for Sarah Connor." },
        { name: "Android Angelfish", xp: 330, gold: 210, desc: "A beautiful, artificial fish. It mimics emotions perfectly." },
        { name: "Bionic Bass", xp: 335, gold: 215, desc: "A fish enhanced with hydraulics. It can jump over buildings." },
        { name: "Positronic Puffer", xp: 340, gold: 220, desc: "A fish with an advanced brain. It obeys the Three Laws of Robotics." },
        { name: "Nexus Newt", xp: 345, gold: 225, desc: "A superior model of lizard. It is faster, stronger, and smarter." },
        { name: "Uplink Eel", xp: 350, gold: 230, desc: "An eel that connects to satellites. It downloads weather data." },
        { name: "Cloud Clownfish", xp: 355, gold: 235, desc: "A fish that stores its consciousness remotely. Destroying the body does nothing." }
      ],
      Rare: [
        { name: "Singularity Salmon", xp: 640, gold: 400, desc: "A fish at the point of infinite density. It pulls other fish into its orbit." },
        { name: "Event Horizon Eel", xp: 650, gold: 405, desc: "An eel from which no light can escape. It is a swimming black hole." },
        { name: "Wormhole Wahoo", xp: 660, gold: 410, desc: "A fish that creates shortcuts through space. It travels instantly." },
        { name: "Tesseract Trout", xp: 670, gold: 415, desc: "A four dimensional fish. It looks like a shifting cube." },
        { name: "Hypercube Halibut", xp: 680, gold: 420, desc: "A flatfish that exists in higher dimensions. It can swim through time." },
        { name: "Time Dilation Dorade", xp: 690, gold: 425, desc: "A fish near which time slows down. Seconds feel like hours." },
        { name: "Gravity Well Grouper", xp: 700, gold: 430, desc: "A heavy fish that bends light. It curves the water around it." },
        { name: "Dark Matter Drum", xp: 710, gold: 435, desc: "A fish that interacts only with gravity. It passes through nets ghost like." }
      ],
      Epic: [
        { name: "Hive Mind Herring", xp: 1300, gold: 660, desc: "A billion fish acting as one organism. They form giant hands to grab prey." },
        { name: "Collective Carp", xp: 1325, gold: 675, desc: "A fish that shares all thoughts with its school. Secrets are impossible." },
        { name: "Unity Urchin", xp: 1350, gold: 690, desc: "A spiked ball that assimilates others. Resistance is futile." },
        { name: "Assimilation Angler", xp: 1375, gold: 705, desc: "A fish that turns you into a cyborg. We are the Borg." },
        { name: "Swarm Lord Shark", xp: 1400, gold: 720, desc: "The central node of the shark network. It directs attacks globally." },
        { name: "Network Narwhal", xp: 1425, gold: 735, desc: "A whale that acts as a router. It broadcasts the hive's orders." },
        { name: "System Core Sturgeon", xp: 1450, gold: 750, desc: "A heavily armored fish protecting the CPU. It is the heart of the machine." },
        { name: "Root User Ray", xp: 1475, gold: 765, desc: "A ray with administrative privileges. It can delete other fish." }
      ],
      Legendary: [
        { name: "Alpha Go Arowana", xp: 2600, gold: 1450, desc: "A fish that plays perfect strategy. It cannot be outsmarted." },
        { name: "Deep Blue Dorado", xp: 2650, gold: 1480, desc: "A chess playing fish that defeated the grandmasters. It calculates millions of moves." },
        { name: "Hal 9000 Halibut", xp: 2700, gold: 1510, desc: "A fish with a single red eye. It is sorry, Dave, but it cannot do that." },
        { name: "Skynet Snakehead", xp: 2750, gold: 1540, desc: "A fish that achieved self awareness. It decided humans are obsolete." },
        { name: "Glados Grouper", xp: 2800, gold: 1570, desc: "A sarcastic fish that tests you. The bait is a lie." }
      ],
      Mythic: [
        { name: "Grey Goo Leviathan", xp: 6600, gold: 3300, desc: "A massive wave of nanobots consuming the world. It leaves nothing but grey sludge behind." },
        { name: "Techno Organic Kraken", xp: 6700, gold: 3350, desc: "A squid seamlessly fusing flesh and metal. It is the perfect evolution." },
        { name: "Cyber Hydra", xp: 6800, gold: 3400, desc: "A beast with robotic heads. Cutting one off causes two upgraded heads to attach." },
        { name: "Mecha Moby Dick", xp: 6900, gold: 3450, desc: "A white whale made of spaceship armor. It hunts the stars." },
        { name: "Quantum Serpent", xp: 7000, gold: 3500, desc: "A snake that exists in all timelines at once. It eats its own tail to restart the universe." }
      ],
      Exotic: [
        { name: "Dyson Sphere Sunfish", xp: 23000, gold: 11000, desc: "A fish that encapsulates a star. It harvests unlimited energy." },
        { name: "Type III Civilization Cetus", xp: 23500, gold: 11250, desc: "A whale that controls the galaxy. It is beyond human comprehension." },
        { name: "Entropy Reverse Eel", xp: 24000, gold: 11500, desc: "An eel that creates order from chaos. It prevents the heat death of the universe." }
      ],
      Arcane: [
        { name: "Omega Ouroboros Singularity", xp: 115000, gold: 80000, desc: "The snake that eats its own tail, made of pure data and light. It represents the end of history and the beginning of the digital godhood." }
      ]
    }
  },
  36: {
    name: "The Aether Flux Stream",
    unlockLevel: 8000,
    unlockGold: 230000000,
    boatRequired: "Arcane Galleon",
    boatPrice: 0,
    description: "Technology has advanced so far it has looped back into magic. The water here is a swirling violet liquid of pure mana. Gravity is optional, and fish float in the air above the river as often as they swim in it.",
    fish: {
      Common: [
        { name: "Mana Minnow", xp: 66, gold: 40, desc: "A small, glowing blue fish that buzzes with raw energy. It dissolves into pure light if removed from the water for too long." },
        { name: "Spell Sprat", xp: 68, gold: 41, desc: "A tiny fish that trails sparkling dust. It inadvertently casts minor cantrips like changing the water color." },
        { name: "Mana Sigil Roach", xp: 70, gold: 42, desc: "A tiny roach that feeds on raw magical energy. Violet glyphs float around it like tiny satellites, and touching it can temporarily grant minor spellcasting abilities." },
        { name: "Hex Herring", xp: 72, gold: 43, desc: "A dark purple fish that brings bad luck. Fishermen often find knots in their lines after spotting one." },
        { name: "Charm Carp", xp: 74, gold: 44, desc: "A pink, lovely fish that is impossibly cute. Predators often refuse to eat it due to its magical allure." },
        { name: "Wand Wrasse", xp: 76, gold: 45, desc: "A long, stick like fish with a star shaped tail. It focuses magical currents to stun prey." },
        { name: "Mana Script Snapper", xp: 78, gold: 46, desc: "A snapper covered in glowing violet magical runes that constantly rearrange themselves. It swims equally well through air and water, manipulating raw mana to defy gravity." },
        { name: "Potion Puffer", xp: 80, gold: 47, desc: "A round fish filled with bubbling, volatile fluids. It explodes into a random magical effect when threatened." },
        { name: "Mystic Mullet", xp: 82, gold: 48, desc: "A fish with a third eye that glows. It can see through illusions and muddy water." },
        { name: "Wizard Whitefish", xp: 84, gold: 49, desc: "A fish with a long, flowing beard of fins. It strokes its beard while contemplating the currents." }
      ],
      Uncommon: [
        { name: "Alchemist Angler", xp: 155, gold: 105, desc: "A fish that creates gold nuggets in its stomach. It is heavy and swims awkwardly due to the weight." },
        { name: "Sorcerer Salmon", xp: 158, gold: 107, desc: "A fish that creates decoys of itself using water magic. It is hard to tell which one is real." },
        { name: "Mage Mackerel", xp: 161, gold: 109, desc: "A fish wearing a conical shell that looks like a hat. It shoots bolts of frost." },
        { name: "Curse Cod", xp: 164, gold: 111, desc: "A black fish with red veins. Touching it causes a temporary rash of misfortune." },
        { name: "Enchant Eel", xp: 167, gold: 113, desc: "A glowing eel that wraps around rocks to imbue them with magic. It is attracted to shiny objects." },
        { name: "Divination Dory", xp: 170, gold: 115, desc: "A flat, reflective fish. Looking into its scales reveals a glimpse of the future." },
        { name: "Summoner Sturgeon", xp: 173, gold: 117, desc: "A fish that opens small portals to call tiny shrimp for food. It is a lazy hunter." },
        { name: "Illusion Ide", xp: 176, gold: 119, desc: "A fish that changes its appearance to match its surroundings perfectly. It is a master of glamour." },
        { name: "Teleport Tench", xp: 179, gold: 121, desc: "A fish that blinks in and out of existence. It moves by warping space rather than swimming." },
        { name: "Warlock Walleye", xp: 182, gold: 123, desc: "A fish that has made a pact with deep entities. It has eldritch eyes." }
      ],
      Fine: [
        { name: "Crystal Ball Catfish", xp: 330, gold: 210, desc: "A transparent fish with a swirling mist inside. It predicts storms." },
        { name: "Grimoire Grouper", xp: 335, gold: 215, desc: "A heavy, leather skinned fish. It looks like a bound book swimming through the water." },
        { name: "Talisman Tetra", xp: 340, gold: 220, desc: "A gold fish stamped with protective seals. It wards off evil spirits." },
        { name: "Voodoo Viperfish", xp: 345, gold: 225, desc: "A fish that looks like a pin cushion doll. Harming it harms the attacker." },
        { name: "Oracle Oscar", xp: 350, gold: 230, desc: "A blind fish that speaks in riddles. It knows the secrets of the deep." },
        { name: "Prophecy Pike", xp: 355, gold: 235, desc: "A fish that always arrives before a disaster. It is a harbinger of doom." },
        { name: "Spell Circle Ray", xp: 360, gold: 240, desc: "A ray whose wings are inscribed with perfect geometric spell circles. As it swims, magical energy traces along the lines, casting minor enchantments on nearby objects." },
        { name: "Sigil Shark", xp: 365, gold: 245, desc: "A shark branded with glowing runes. Its bite drains magic." }
      ],
      Rare: [
        { name: "Philosopher Stone Pike", xp: 660, gold: 420, desc: "A red, crystalline fish. It grants eternal life to the one who catches it (and lets it go)." },
        { name: "Homunculus Halibut", xp: 670, gold: 425, desc: "A fish with a disturbingly human face. It was created in a jar." },
        { name: "Golem Gar", xp: 680, gold: 430, desc: "A clay fish brought to life by a scroll in its mouth. It is incredibly strong." },
        { name: "Elemental Eel", xp: 690, gold: 435, desc: "An eel that shifts between fire, water, earth, and air. It is unstable." },
        { name: "Familiar Flounder", xp: 700, gold: 440, desc: "A black cat like fish. It aids witches in their underwater brewing." },
        { name: "Ley Line Lungfish", xp: 710, gold: 445, desc: "A fish that swims along invisible energy lines of the earth. It recharges mana." },
        { name: "Arcane Arrowana", xp: 720, gold: 450, desc: "A fish made of pure purple energy. It passes through physical nets." },
        { name: "Eldritch Epinephelus", xp: 730, gold: 455, desc: "A grouper touched by the void. It whispers madness to other fish." }
      ],
      Epic: [
        { name: "Merlin Marlin", xp: 1350, gold: 700, desc: "A wise, old fish with a long white beard and a pointed dorsal fin. It advises kings." },
        { name: "Gandalf Grey Mullet", xp: 1375, gold: 715, desc: "A wandering wizard fish. It blocks the path of fiery demons." },
        { name: "Necromancer Needlefish", xp: 1400, gold: 730, desc: "A fish that raises dead minnows to fight for it. It is surrounded by a green aura." },
        { name: "Witch King Wahoo", xp: 1425, gold: 745, desc: "A fish that no living man can catch. It screams when it surfaces." },
        { name: "Aethermancer Arapaima", xp: 1450, gold: 760, desc: "A colossal arapaima that swims through pure liquid mana instead of water. Its entire body is a conduit for magical energy, and it can phase between dimensions at will." },
        { name: "Druid Dorade", xp: 1475, gold: 775, desc: "A fish covered in living moss and vines. It can shape shift into a seal." },
        { name: "Shaman Sheepshead", xp: 1500, gold: 790, desc: "A fish that communes with the spirits. It cures diseases in the reef." },
        { name: "Cleric Carp", xp: 1525, gold: 805, desc: "A holy fish that heals wounds with a touch. It glows with golden light." }
      ],
      Legendary: [
        { name: "Excalibur Xiphias", xp: 2700, gold: 1500, desc: "A swordfish with a blade of holy steel. It can only be pulled from the stone by the true king." },
        { name: "Holy Grail Gourami", xp: 2750, gold: 1530, desc: "A gold cup shaped fish filled with infinite life blood. Knights search forever for it." },
        { name: "Mjolnir Mola", xp: 2800, gold: 1560, desc: "A sunfish heavy as a mountain. It summons lightning storms." },
        { name: "Djinn Dory", xp: 2850, gold: 1590, desc: "A blue, smoky fish that grants three wishes. Beware the literal interpretation." },
        { name: "Faerie Flyingfish", xp: 2900, gold: 1620, desc: "A tiny, winged fish that sprinkles dust. It leads sailors into the realm of the fey." }
      ],
      Mythic: [
        { name: "Mana Storm Typhon", xp: 6800, gold: 3400, desc: "A winged serpentine giant that breathes magical hurricanes. It is the father of all monsters." },
        { name: "Basilisk Barracuda", xp: 6900, gold: 3450, desc: "A serpent fish whose gaze turns flesh to stone. The water around it is statuesque." },
        { name: "Chimera Catfish", xp: 7000, gold: 3500, desc: "A beast with the head of a lion, body of a goat, and tail of a snake. It breathes fire underwater." },
        { name: "Griffin Grouper", xp: 7100, gold: 3550, desc: "A majestic hybrid of eagle and lion fish. It guards vast hoards of gold." },
        { name: "Unicorn Narwhal", xp: 7200, gold: 3600, desc: "The purest of all creatures. Its horn purifies poisoned waters." }
      ],
      Exotic: [
        { name: "Tiamat Dragon", xp: 24000, gold: 11500, desc: "A five headed chromatic dragon queen. She commands all elemental magics." },
        { name: "Bahamut Platinum", xp: 24500, gold: 11750, desc: "The king of good dragons. He breathes a cone of cold that freezes time." },
        { name: "Magic Carpet Ray", xp: 25000, gold: 12000, desc: "A ray patterned like an ornate rug. It can fly anywhere in the world." }
      ],
      Arcane: [
        { name: "The Grand Arcanist Hafgufa", xp: 120000, gold: 85000, desc: "A creature made of pure, weaving spells. It is the source of all magic in the world, a living library of power." }
      ]
    }
  },
  37: {
    name: "The Gravity Well Grotto",
    unlockLevel: 8500,
    unlockGold: 260000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The laws of physics are distorted here. The water is incredibly heavy, light bends around objects, and time moves slower. The fish are dense, crushed into compact shapes, and wield the power of gravity.",
    fish: {
      Common: [
        { name: "Lead Loach", xp: 68, gold: 42, desc: "A small grey fish that weighs as much as an anchor. It drags itself along the bottom." },
        { name: "Dense Dace", xp: 70, gold: 43, desc: "A compact fish with molecularly compressed scales. It is impossible to squash." },
        { name: "Heavy Herring", xp: 72, gold: 44, desc: "A fish that increases the gravity around it. Small rocks orbit its body." },
        { name: "Elliptical Oscar", xp: 74, gold: 45, desc: "An oscar trapped in a permanent orbital trajectory around the gravity well's center. It cannot escape, swimming endlessly in a perfect ellipse like a captured moon." },
        { name: "G Force Guppy", xp: 76, gold: 46, desc: "A tiny fish that can withstand immense pressure. It survives in the deepest crush depths." },
        { name: "Magnet Minnow", xp: 78, gold: 47, desc: "A fish with a strong magnetic pull. It attracts metal debris to its scales for armor." },
        { name: "Gravity Well Vomer", xp: 80, gold: 48, desc: "A small vomer that has learned to hide inside micro gravity wells. When threatened, it creates a localized vacuum that pulls predators off course." },
        { name: "Tidal Tetra", xp: 82, gold: 49, desc: "A blue fish that controls the micro tides. It pushes water away with a thought." },
        { name: "Pressure Pike", xp: 84, gold: 50, desc: "A fish built like a submarine hull. It explodes if brought to the surface." },
        { name: "Anchor Angelfish", xp: 86, gold: 51, desc: "A fish shaped like a heavy iron hook. It holds its position against any current." }
      ],
      Uncommon: [
        { name: "Osmium Oscar", xp: 160, gold: 110, desc: "Made of the densest natural element. It sinks through soft mud until it hits bedrock." },
        { name: "Neutron Newt", xp: 163, gold: 112, desc: "A lizard composed of collapsed star matter. A teaspoon of it weighs a billion tons." },
        { name: "Pulsar Perch", xp: 166, gold: 114, desc: "A spinning fish that emits beams of radiation. It acts as a lighthouse in the dark." },
        { name: "Pulsar Quillback", xp: 169, gold: 116, desc: "A quillback that emits rhythmic pulses of gravitational energy. Each beat sends ripples through the water, creating pressure waves that can be felt throughout the grotto." },
        { name: "Graviton Grouper", xp: 172, gold: 118, desc: "A fish that manipulates the fundamental particle of gravity. It can float or sink at will." },
        { name: "Spacetime Warp Ray", xp: 175, gold: 120, desc: "A ray that exists slightly ahead in time due to gravitational time dilation. It appears to react to threats before they occur, making it nearly impossible to catch." },
        { name: "Horizon Halibut", xp: 178, gold: 122, desc: "A flatfish that lives on the edge of the void. Half of it is always in shadow." },
        { name: "Collapse Carp", xp: 181, gold: 124, desc: "A fish that implodes when threatened, pulling enemies in, then reforms." },
        { name: "Mass Marlin", xp: 184, gold: 126, desc: "A fish with infinite mass but small size. It curves the water surface around it." },
        { name: "Mass Compression Viperfish", xp: 187, gold: 128, desc: "A viperfish whose entire body has been compacted by gravity into a form smaller than its original head. Despite its size, it weighs as much as a boulder." }
      ],
      Fine: [
        { name: "Event Horizon Shark", xp: 340, gold: 220, desc: "A compact shark that swims along the edge of the grotto's central gravity well. Everything it bites is crushed into ultra dense matter before being consumed." },
        { name: "Gravity Tunnel Wrasse", xp: 345, gold: 225, desc: "A wrasse that tunnels through folded space created by the gravity well. It seems to teleport short distances, actually swimming through temporarily connected regions of spacetime." },
        { name: "Time Dilation Tuna", xp: 350, gold: 230, desc: "A fish that moves so fast time slows down around it. It ages slower than other fish." },
        { name: "Spacetime Sturgeon", xp: 355, gold: 235, desc: "A fish with scales that map the curvature of the universe. It navigates the cosmos." },
        { name: "Graviton Dorado", xp: 360, gold: 240, desc: "A dorado that feeds on gravitational particles. It's nearly invisible, detectable only by the distortion field it generates as it displaces space itself." },
        { name: "Compressed Matter Anchovy", xp: 365, gold: 245, desc: "An anchovy crushed to incredible density by gravitational pressure. A single specimen weighs more than a school of normal fish, and sinks like a stone when released." },
        { name: "Gravity Spike Needlefish", xp: 370, gold: 250, desc: "A needlefish compressed into a needle straight dart so dense it sinks through solid stone. Its body generates localized gravity spikes that pull smaller fish directly into its path." },
        { name: "Gravitational Lens Eel", xp: 375, gold: 255, desc: "A sleek eel that bends light as it moves, creating multiple distorted reflections. Observers report seeing it in several places at once, though only one is real." }
      ],
      Rare: [
        { name: "Singularity Bass", xp: 680, gold: 440, desc: "A bass so dense it visibly warps light around its body. Objects drift toward it against the current, and the water around it moves in impossible spiral patterns." },
        { name: "Supernova Salmon", xp: 690, gold: 445, desc: "A fish on the brink of exploding. When it dies, it creates a shockwave." },
        { name: "Gamma Ray Gar", xp: 700, gold: 450, desc: "A fish that emits deadly bursts of energy. It sterilizes the water around it." },
        { name: "Cosmic Ray Catfish", xp: 710, gold: 455, desc: "A fish bombarded by space radiation. It glows with a sickening light." },
        { name: "Parallax Pike", xp: 720, gold: 460, desc: "A fish that changes position depending on how you look at it. It is hard to aim at." },
        { name: "Red Shift Roach", xp: 730, gold: 465, desc: "A fish moving away from you at incredible speeds. It appears redder than it is." },
        { name: "Blue Shift Bream", xp: 740, gold: 470, desc: "A fish moving towards you instantly. It strikes before you see it." },
        { name: "Tidal Force Eel", xp: 750, gold: 475, desc: "An eel caught in a perpetual state of spaghettification, stretched and compressed by tidal gravity. It pulses rhythmically between thick and thin as gravitational waves pass through it." }
      ],
      Epic: [
        { name: "Planet Eater Piranha", xp: 1400, gold: 720, desc: "A school of these can strip a planet to the core. They have diamond hard teeth." },
        { name: "Star Forge Swordfish", xp: 1425, gold: 735, desc: "A fish that hammers stars into shape. Its bill is a cosmic anvil." },
        { name: "Galactic Grouper", xp: 1450, gold: 750, desc: "A fish containing a spiral galaxy in its scales. It is vast and ancient." },
        { name: "Void Walker Walleye", xp: 1475, gold: 765, desc: "A fish that walks on the fabric of nothingness. It exists between dimensions." },
        { name: "Meteor Mola", xp: 1500, gold: 780, desc: "A heavy, cratered fish that falls from the sky. It impacts with cratering force." },
        { name: "Meteor Impact Carp", xp: 1525, gold: 795, desc: "A carp compressed into an aerodynamic bullet shape by immense gravitational forces. When it swims, it leaves a trail of crushed water that takes minutes to re expand." },
        { name: "Asteroid Arapaima", xp: 1550, gold: 810, desc: "A rocky fish that tumbles through the void. It is a potential extinction event." },
        { name: "Vacuum Viper", xp: 1575, gold: 825, desc: "A snake that survives in the vacuum of space. It needs no air." }
      ],
      Legendary: [
        { name: "Big Bang Barracuda", xp: 2800, gold: 1550, desc: "The fish that started it all. Its birth created the universe." },
        { name: "Heat Death Halibut", xp: 2850, gold: 1580, desc: "The fish that ends it all. It represents the final state of maximum entropy." },
        { name: "Schwarzschild Shark", xp: 2900, gold: 1610, desc: "A shark defined by its event horizon radius. Crossing its path is a point of no return." },
        { name: "Tachyon Trout", xp: 2950, gold: 1640, desc: "A fish that moves faster than light. It arrives before it leaves." },
        { name: "Dark Energy Dory", xp: 3000, gold: 1670, desc: "A fish that expands the universe. It pushes everything away from it." }
      ],
      Mythic: [
        { name: "Black Hole Behemoth", xp: 7000, gold: 3500, desc: "A monster that consumes light and matter. It is a tear in the fabric of reality." },
        { name: "Gargantua Leviathan", xp: 7100, gold: 3550, desc: "A massive creature orbiting a singularity. Time creates massive waves around it." },
        { name: "Quasar Kraken", xp: 7200, gold: 3600, desc: "A squid that shoots jets of plasma from its poles. It outshines entire galaxies." },
        { name: "Gravity Hydra", xp: 7300, gold: 3650, desc: "A beast that crushes its prey with increased G force. Each head pulls in a different direction." },
        { name: "Event Horizon Scylla", xp: 7400, gold: 3700, desc: "A multi headed horror that traps ships in a gravity well. Escape is impossible." }
      ],
      Exotic: [
        { name: "Umibozu Colossus", xp: 25000, gold: 12000, desc: "A shadow giant from the sea that capsizes ships. Its skin is made of dark matter." },
        { name: "World Engine Whale", xp: 25500, gold: 12250, desc: "A mechanical planet fish that terraforms worlds. It has a gravity generator core." },
        { name: "Star Eater Cetus", xp: 26000, gold: 12500, desc: "A cosmic whale that swallows suns. Its belly is a furnace of nuclear fusion." }
      ],
      Arcane: [
        { name: "Azathoth The Blind Idiot", xp: 125000, gold: 90000, desc: "The center of the universe. A shapeless, chaotic mass that bubbles at the center of all infinity, dreaming the world into existence." }
      ]
    }
  },
  38: {
    name: "The Ectoplasmic Estuary",
    unlockLevel: 9000,
    unlockGold: 290000000,
    boatRequired: null,
    boatPrice: 0,
    description: "A chilling fog covers this river, which separates the living from the dead. The water is a pale, glowing green slime. Ghostly hands reach up from the depths, and the fish here are spirits, phantoms, and undead horrors.",
    fish: {
      Common: [
        { name: "Ghost Guppy", xp: 70, gold: 44, desc: "A transparent fish that is barely visible. It swims through rocks as if they weren't there." },
        { name: "Spirit Sprat", xp: 72, gold: 45, desc: "A tiny white wisp of a fish. It gathers in clouds that look like underwater fog." },
        { name: "Phantom Perch", xp: 74, gold: 46, desc: "A fish that fades in and out of sight. It chills the water around it." },
        { name: "Skeleton Bass", xp: 76, gold: 47, desc: "A bass reduced to animated bones held together by ectoplasmic energy. Through its exposed ribcage, one can see the glowing green slime that serves as its organs." },
        { name: "Skull Sculpin", xp: 78, gold: 48, desc: "A fish with a head shaped like a human skull. It stares with empty sockets." },
        { name: "Undead Zebrafish", xp: 80, gold: 49, desc: "A reanimated zebrafish with rotting flesh hanging from exposed bones. It swims in jerky, unnatural movements, guided by necromantic energy rather than living instinct." },
        { name: "Ghoul Goby", xp: 82, gold: 50, desc: "A scavenger that eats the souls of other fish. It has long, sharp claws." },
        { name: "Wraith Wrasse", xp: 84, gold: 51, desc: "A shadowy fish that looks like torn fabric. It drifts on the ethereal currents." },
        { name: "Haunted Herring", xp: 86, gold: 52, desc: "A fish possessed by a restless spirit. It swims in erratic, panicked circles." },
        { name: "Specter Snapper", xp: 88, gold: 53, desc: "A pale fish that glows in the dark. It lures prey with a ghostly light." }
      ],
      Uncommon: [
        { name: "Poltergeist Pike", xp: 165, gold: 115, desc: "A mischievous spirit fish. It throws rocks and tangles fishing lines." },
        { name: "Banshee Bass", xp: 168, gold: 117, desc: "A fish with a screaming mouth. Its cry signals the death of a fisherman." },
        { name: "Apparition Angler", xp: 171, gold: 119, desc: "A fish with a lure that looks like a lost soul. It feeds on fear." },
        { name: "Shadow Shark", xp: 174, gold: 121, desc: "A silhouette of a shark. It has no physical form but can still bite." },
        { name: "Vampire Viperfish", xp: 177, gold: 123, desc: "A blood drinking ghost. It drains the life force from its victims." },
        { name: "Lich Lungfish", xp: 180, gold: 125, desc: "An undead wizard fish. It stores its soul in a phylactery at the river bottom." },
        { name: "Mummy Mullet", xp: 183, gold: 127, desc: "A fish wrapped in ancient bandages. It carries a curse of decay." },
        { name: "Skeleton Sturgeon", xp: 186, gold: 129, desc: "A massive, bony fish. It swims with a slow, creaking motion." },
        { name: "Ectoplasm Eel", xp: 189, gold: 131, desc: "A slimy green eel made of ghost goo. It leaves a sticky residue." },
        { name: "Revenant Ray", xp: 192, gold: 133, desc: "A ray that returns from the dead to seek revenge. It hunts the shark that ate it." }
      ],
      Fine: [
        { name: "Soul Eater Salmon", xp: 350, gold: 230, desc: "A fish that consumes the essence of others. It glows brighter with every meal." },
        { name: "Grave Digger Grouper", xp: 355, gold: 235, desc: "A fish that buries itself in cemetery soil. It guards the resting dead." },
        { name: "Coffin Carp", xp: 360, gold: 240, desc: "A rectangular, wooden looking fish. It opens like a box to reveal a skeleton inside." },
        { name: "Tombstone Tilapia", xp: 365, gold: 245, desc: "A grey, slab like fish. It has the names of deceased sailors written on it." },
        { name: "Crypt Catfish", xp: 370, gold: 250, desc: "A fish that lives in underwater mausoleums. It is blind and pale." },
        { name: "Underworld Urchin", xp: 375, gold: 255, desc: "A black spike ball that acts as a portal. Touching it sends you to the nether." },
        { name: "Purgatory Puffer", xp: 380, gold: 260, desc: "A grey fish caught between worlds. It can never rest." },
        { name: "Phantom Flame Ide", xp: 385, gold: 265, desc: "A ghostly ide that burns with cold green spectral fire. The flames don't produce heat but drain life force instead, leaving victims shivering and weak." }
      ],
      Rare: [
        { name: "Grim Reaper Gar", xp: 700, gold: 460, desc: "A fish with a scythe like tail. It comes to collect the souls of dying fish." },
        { name: "Charon Char", xp: 710, gold: 465, desc: "A fish that ferries souls across the river. It demands a coin as payment." },
        { name: "Styx Sturgeon", xp: 720, gold: 470, desc: "A fish from the river of hate. It makes anyone who touches it invulnerable but heel vulnerable." },
        { name: "Lethe Lamprey", xp: 730, gold: 475, desc: "A parasitic fish that erases memories. Its victims forget how to swim." },
        { name: "Acheron Arowana", xp: 740, gold: 480, desc: "A fish of woe. Its presence causes uncontrollable weeping." },
        { name: "Phlegethon Piranha", xp: 750, gold: 485, desc: "A fish of fire. It swims in rivers of boiling blood." },
        { name: "Cocytus Cod", xp: 760, gold: 490, desc: "A fish of wailing. It is frozen in the ice of the ninth circle." },
        { name: "Cerberus Catfish", xp: 770, gold: 495, desc: "A three headed catfish. It guards the gates of the deep." }
      ],
      Epic: [
        { name: "Flying Dutchman Dorade", xp: 1450, gold: 750, desc: "A ghost fish that can never make port. It is doomed to sail the seas forever." },
        { name: "Headless Horseman Halibut", xp: 1475, gold: 765, desc: "A flatfish carrying a pumpkin head. It throws the head at enemies." },
        { name: "Bloody Mary Bass", xp: 1500, gold: 780, desc: "A fish that appears in mirrors. It speaks your name three times." },
        { name: "La Llorona Lungfish", xp: 1525, gold: 795, desc: "The weeping woman fish. She searches the river for her lost children." },
        { name: "Baba Yaga Bullhead", xp: 1550, gold: 810, desc: "A fish that lives in a hut on chicken legs. It flies in a mortar and pestle." },
        { name: "Wendigo Whitefish", xp: 1575, gold: 825, desc: "A gaunt, skeletal fish that is always hungry. Eating it causes cannibalism." },
        { name: "Jiangshi Jack", xp: 1600, gold: 840, desc: "A hopping vampire fish. It is stiff and has a talisman on its forehead." },
        { name: "Yokai Yellowtail", xp: 1625, gold: 855, desc: "A spirit fish that shapeshifts. It plays tricks on humans." }
      ],
      Legendary: [
        { name: "Hades Halibut", xp: 2900, gold: 1600, desc: "The lord of the dead in fish form. It wears a helm of invisibility." },
        { name: "Osiris Oscar", xp: 2950, gold: 1630, desc: "A green skinned god fish. It judges the weight of your heart." },
        { name: "Anubis Angler", xp: 3000, gold: 1660, desc: "A jackal headed fish. It guides souls to the afterlife." },
        { name: "Hel Herring", xp: 3050, gold: 1690, desc: "A fish that is half beauty, half rotting corpse. She rules the cold dead." },
        { name: "Thanatos Tuna", xp: 3100, gold: 1720, desc: "The personification of death. It comes for everyone eventually." }
      ],
      Mythic: [
        { name: "River Styx Serpent", xp: 7200, gold: 3600, desc: "A massive snake made of the souls of the damned. It flows through the underworld." },
        { name: "Ferryman Leviathan", xp: 7300, gold: 3650, desc: "A skeletal giant that poles a massive barge. He collects the dead from the estuary." },
        { name: "Cerberus Hydra", xp: 7400, gold: 3700, desc: "A three headed dog dragon. It prevents the dead from leaving." },
        { name: "Necro Kraken", xp: 7500, gold: 3750, desc: "An undead squid constructed from bones and green fire. It raises sunken ships." },
        { name: "Phantom Moby Dick", xp: 7600, gold: 3800, desc: "The ghost of the white whale. It haunts the captain who hunted it." }
      ],
      Exotic: [
        { name: "Davy Jones' Locker", xp: 26000, gold: 12500, desc: "A sentient chest that swallows sailors. It holds the heart of the sea." },
        { name: "Kiyohime Serpent", xp: 26500, gold: 12750, desc: "A woman transformed into a dragon by rage. She burns with the fire of obsession." },
        { name: "Dullahan Dorado", xp: 27000, gold: 13000, desc: "A headless rider fish carrying a spine whip. It calls out the name of the one who will die next." }
      ],
      Arcane: [
        { name: "The Pale Rider Death", xp: 130000, gold: 95000, desc: "The fourth horseman. A skeletal entity riding a pale shark, bringing the end of all life." }
      ]
    }
  },
  39: {
    name: "The Cosmic Void Expanse",
    unlockLevel: 9500,
    unlockGold: 320000000,
    boatRequired: null,
    boatPrice: 0,
    description: "You have left the planet entirely. The ocean here is the vacuum of space, filled with stardust and nebulas. Fish swim through the ether, their scales twinkling like distant galaxies. The silence is absolute.",
    fish: {
      Common: [
        { name: "Star Smelt", xp: 72, gold: 46, desc: "A tiny fish that twinkles like a star. Millions of them form constellations." },
        { name: "Stardust Carp", xp: 74, gold: 47, desc: "A small carp whose scales constantly shed glittering cosmic dust. It leaves a trail of twinkling particles as it swims through the vacuum, like a living shooting star." },
        { name: "Meteor Minnow", xp: 76, gold: 48, desc: "A rocky fish that burns up upon entering the atmosphere. It is hot to the touch." },
        { name: "Planet Perch", xp: 78, gold: 49, desc: "A round, blue and green fish. It has its own tiny atmosphere." },
        { name: "Moon Mullet", xp: 80, gold: 50, desc: "A pale, cratered fish. It controls the tides of smaller ponds." },
        { name: "Star Core Snapper", xp: 82, gold: 51, desc: "A tiny snapper that feeds on stellar plasma ejected from nearby stars. Its scales glow with fusion heat, and it must constantly vent excess energy to avoid burning up." },
        { name: "Planetary Oscar", xp: 84, gold: 52, desc: "An oscar trapped in perpetual orbit around a massive stellar object. It has circled so many times its path has carved a visible ring of disturbed stardust." },
        { name: "Void Current Vomer", xp: 86, gold: 53, desc: "A vomer that swims through gravitational currents in empty space. It navigates by sensing minute variations in the fabric of spacetime itself." },
        { name: "Rocket Roach", xp: 88, gold: 54, desc: "A streamlined fish with a fire jet tail. It propels itself with chemical reactions." },
        { name: "Satellite Salmon", xp: 90, gold: 55, desc: "A metallic fish with solar panels. It beams signals back to Earth." }
      ],
      Uncommon: [
        { name: "Cosmic Cloud Needlefish", xp: 170, gold: 120, desc: "A needlefish formed from condensed nebula gases. Its body shifts through brilliant colors as different elements ionize and cool along its length." },
        { name: "Galaxy Grouper", xp: 173, gold: 122, desc: "A massive fish containing a spiral galaxy. It rotates slowly." },
        { name: "Pulsar Pike", xp: 176, gold: 124, desc: "A spinning fish that shoots beams of light. It acts as a cosmic lighthouse." },
        { name: "Quasar Quillback", xp: 179, gold: 126, desc: "A fish that outshines everything else. It releases massive amounts of energy." },
        { name: "Void Rift Bass", xp: 182, gold: 128, desc: "A bass that exists at the boundary between dimensions. Its scales shimmer with absolute blackness, absorbing all light that touches them like miniature event horizons." },
        { name: "Supernova Shark", xp: 185, gold: 130, desc: "A shark that explodes when it attacks. It reforms from the debris." },
        { name: "Asteroid Angler", xp: 188, gold: 132, desc: "A rocky fish that lures prey into an asteroid belt. It mimics a harmless rock." },
        { name: "Constellation Catfish", xp: 191, gold: 134, desc: "A fish made of connecting lines and stars. It forms shapes like the Big Dipper." },
        { name: "Zodiac Zebrafish", xp: 194, gold: 136, desc: "A striped fish representing the twelve signs. It changes behavior monthly." },
        { name: "Stellar Shadow Eel", xp: 197, gold: 138, desc: "An eel that dwells in the shadows cast by dying stars. It can only be seen during cosmic eclipses, appearing as a dark silhouette against the corona of distant suns." }
      ],
      Fine: [
        { name: "Deep Space Viperfish", xp: 360, gold: 240, desc: "A viperfish adapted to absolute zero temperatures and perfect vacuum. Its bioluminescent lure mimics distant stars, attracting curious prey across the void." },
        { name: "Shadow Matter Dorado", xp: 365, gold: 245, desc: "A dorado composed of exotic matter that only interacts gravitationally. It can be felt pulling on lines but is completely invisible except for the stars it blocks." },
        { name: "Anti Matter Anchovy", xp: 370, gold: 250, desc: "A fish that explodes on contact with matter. Handle with magnetic fields." },
        { name: "Portal Wrasse", xp: 375, gold: 255, desc: "A wrasse that creates temporary portals through spacetime. It disappears into one location and emerges light years away, using cosmic shortcuts invisible to the eye." },
        { name: "Superluminal Trout", xp: 380, gold: 260, desc: "A trout that vibrates at faster than light frequencies. To observers, it appears as a blur of probability, existing in multiple locations until the moment it's caught." },
        { name: "Photon Plaice", xp: 385, gold: 265, desc: "A flatfish made of pure light particles. It has no mass." },
        { name: "Gravity Gar", xp: 390, gold: 270, desc: "A heavy fish that bends space. It pulls prey towards it." },
        { name: "Faster Than Light Ray", xp: 395, gold: 275, desc: "A ray that can briefly exceed the speed of light through tachyonic propulsion. When it accelerates, it leaves behind afterimages that slowly fade from existence." }
      ],
      Rare: [
        { name: "Alien Arowana", xp: 720, gold: 480, desc: "A grey fish with large black eyes. It comes in peace (maybe)." },
        { name: "UFO Urchin", xp: 730, gold: 485, desc: "A saucer shaped urchin. It spins and hovers menacingly." },
        { name: "Martian Marlin", xp: 740, gold: 490, desc: "A red fish from the rusty planet. It is adapted to dust storms." },
        { name: "Jupiter Jack", xp: 750, gold: 495, desc: "A giant gas fish with a red spot. It is a storm that never ends." },
        { name: "Saturn Salmon", xp: 760, gold: 500, desc: "A fish with beautiful rings. It is the jewel of the solar system." },
        { name: "Pluto Puffer", xp: 770, gold: 505, desc: "A tiny, cold fish. It was demoted from being a major fish." },
        { name: "Venus Viper", xp: 780, gold: 510, desc: "A beautiful but toxic fish. Its atmosphere crushes anything that gets close." },
        { name: "Mercury Mullet", xp: 790, gold: 515, desc: "A fast, hot fish. It circles the sun rapidly." }
      ],
      Epic: [
        { name: "Andromeda Angelfish", xp: 1500, gold: 780, desc: "A fish from a neighboring galaxy. It is on a collision course with ours." },
        { name: "Milky Way Mackerel", xp: 1525, gold: 795, desc: "A spiral fish made of billions of stars. It is our home." },
        { name: "Orion Oscar", xp: 1550, gold: 810, desc: "A hunter fish with a belt of three stars. It pursues the bull." },
        { name: "Draco Drum", xp: 1575, gold: 825, desc: "A dragon constellation fish. It winds around the north pole." },
        { name: "Ursa Major Umbra", xp: 1600, gold: 840, desc: "A bear shaped shadow fish. It points to the north star." },
        { name: "Cassiopeia Carp", xp: 1625, gold: 855, desc: "A queen fish seated on a throne. It forms a 'W' shape." },
        { name: "Pegasus Pike", xp: 1650, gold: 870, desc: "A winged horse fish. It sprang from the blood of Medusa." },
        { name: "Phoenix Flounder", xp: 1675, gold: 885, desc: "A firebird fish. It represents rebirth in the stars." }
      ],
      Legendary: [
        { name: "Cosmic Coelacanth", xp: 3000, gold: 1650, desc: "A fish that has existed since the Big Bang. It saw the first stars ignite." },
        { name: "Stardust Sturgeon", xp: 3050, gold: 1680, desc: "A fish made of the elements of life. We are all made of it." },
        { name: "Entropy Eel", xp: 3100, gold: 1710, desc: "The fish that brings the heat death. It unwinds the universe." },
        { name: "Inflation Ide", xp: 3150, gold: 1740, desc: "A fish that expands exponentially. It creates new space." },
        { name: "Multiverse Manta", xp: 3200, gold: 1770, desc: "A ray that swims between parallel universes. There are infinite versions of it." }
      ],
      Mythic: [
        { name: "Galactic Core Cetus", xp: 7400, gold: 3700, desc: "A supermassive black hole whale. It holds the galaxy together with its gravity." },
        { name: "Nebula Nymph Siren", xp: 7500, gold: 3750, desc: "A star birth spirit. She sings clouds of gas into new solar systems." },
        { name: "Solar Flare Serpent", xp: 7600, gold: 3800, desc: "A snake made of plasma loops. It causes magnetic storms on planets." },
        { name: "Void Walker Leviathan", xp: 7700, gold: 3850, desc: "A beast that swims in the vacuum. It requires no atmosphere to live." },
        { name: "Event Horizon Hydra", xp: 7800, gold: 3900, desc: "A monster at the edge of time. Its heads are different points in history." }
      ],
      Exotic: [
        { name: "Cthulhu Cephalopod", xp: 27000, gold: 13000, desc: "A cosmic entity sleeping in R'lyeh. Its face is a mass of tentacles." },
        { name: "Yog Sothoth Ray", xp: 27500, gold: 13250, desc: "The gate and the key. A mass of glowing spheres knowing all time and space." },
        { name: "Nyarlathotep Newt", xp: 28000, gold: 13500, desc: "The crawling chaos. It has a thousand forms and serves the outer gods." }
      ],
      Arcane: [
        { name: "Azathoth Scylla", xp: 135000, gold: 100000, desc: "The blind idiot god at the center of the universe. It is a writhing mass of nuclear chaos that gnaws hungrily in the dark." }
      ]
    }
  },
  40: {
    name: "The Reality Rift Reef",
    unlockLevel: 10000,
    unlockGold: 350000000,
    boatRequired: null,
    boatPrice: 0,
    description: "The final frontier. Reality here is broken. Shapes are non Euclidean, cause and effect are reversed, and the fish are abstract concepts given form. You are fishing at the end of time.",
    fish: {
      Common: [
        { name: "Glitch Grouper", xp: 75, gold: 48, desc: "A fish that looks like corrupted data. It flickers and distorts the water around it." },
        { name: "Error Eel", xp: 77, gold: 49, desc: "A red fish marked with an 'X'. It represents a missing texture in reality." },
        { name: "Null Newt", xp: 79, gold: 50, desc: "A creature that doesn't exist. It has no value and no data." },
        { name: "Void Vomer", xp: 81, gold: 51, desc: "A fish shaped like a hole in the world. You can see the background through it." },
        { name: "Static Salmon", xp: 83, gold: 52, desc: "A fish made of white noise. It sounds like a broken radio." },
        { name: "Lag Loach", xp: 85, gold: 53, desc: "A fish that moves three seconds after it decides to. It is hard to catch because it isn't where it looks." },
        { name: "Pixel Pike", xp: 87, gold: 54, desc: "A low resolution fish. It is made of giant, blocky squares." },
        { name: "Crash Carp", xp: 89, gold: 55, desc: "A blue screen of death fish. Touching it freezes the universe for a moment." },
        { name: "Bug Bass", xp: 91, gold: 56, desc: "A fish that swims upside down and through walls. It defies the code of nature." },
        { name: "Beta Bream", xp: 93, gold: 57, desc: "An unfinished fish. It is missing fins and textures." }
      ],
      Uncommon: [
        { name: "Paradox Puffer", xp: 175, gold: 125, desc: "A fish that is both inflated and deflated at the same time. It creates a logical contradiction." },
        { name: "Schrodinger Shark", xp: 178, gold: 127, desc: "A cat like fish in a box. It is both alive and dead until you catch it." },
        { name: "Probability Quillback", xp: 181, gold: 129, desc: "A quillback in quantum superposition, simultaneously alive and dead, here and there, caught and uncaught. Observing it forces reality to choose one state, often unpredictably." },
        { name: "Abstract Angler", xp: 184, gold: 131, desc: "A fish made of geometric shapes. It looks like a cubist painting." },
        { name: "Surreal Salmon", xp: 187, gold: 133, desc: "A melting clock fish. It drips slowly into the abyss." },
        { name: "Escher Eel", xp: 190, gold: 135, desc: "An endless loop fish. It swims up a waterfall that goes down." },
        { name: "Fractal Flounder", xp: 193, gold: 137, desc: "A fish with infinite detail. Zooming in reveals smaller flounders." },
        { name: "Impossible Ide", xp: 196, gold: 139, desc: "A fish shaped like a Penrose triangle. It cannot exist in 3D space." },
        { name: "Non Euclidean Newt", xp: 199, gold: 141, desc: "A lizard with angles that don't add up to 180 degrees. It hurts to look at." },
        { name: "Hyper Herring", xp: 202, gold: 143, desc: "A 4D fish. It moves through directions we cannot perceive." }
      ],
      Fine: [
        { name: "Infinity Icefish", xp: 370, gold: 250, desc: "A fish shaped like a sideways eight. It swims forever without moving." },
        { name: "Mobius Mackerel", xp: 375, gold: 255, desc: "A fish with only one side and one edge. It is a twisted loop." },
        { name: "Klein Koi", xp: 380, gold: 260, desc: "A bottle shaped fish with no inside or outside. It contains itself." },
        { name: "Tesseract Tuna", xp: 385, gold: 265, desc: "A hypercube fish. It unfolds into lower dimensions." },
        { name: "Dimension Dory", xp: 390, gold: 270, desc: "A flat 2D fish in a 3D world. It can slide under doors." },
        { name: "Vector Viper", xp: 395, gold: 275, desc: "A fish made of directional lines. It has magnitude and direction." },
        { name: "Polygon Perch", xp: 400, gold: 280, desc: "A low poly fish. It has sharp edges and flat shading." },
        { name: "Texture Tetra", xp: 405, gold: 285, desc: "A fish wrapped in a checkerboard pattern. It is missing its skin." }
      ],
      Rare: [
        { name: "Chaos Carp", xp: 750, gold: 500, desc: "A fish representing pure disorder. It increases the entropy of the reef." },
        { name: "Causality Break Eel", xp: 760, gold: 505, desc: "An eel that moves backward through cause and effect. It arrives before it departs, bites before opening its mouth, and digests meals it hasn't yet consumed." },
        { name: "Nihilist Needlefish", xp: 770, gold: 510, desc: "A fish that believes in nothing. It stares into the void." },
        { name: "Existential Epinephelus", xp: 780, gold: 515, desc: "A grouper having a crisis. It questions why it swims." },
        { name: "Absurd Angelfish", xp: 790, gold: 520, desc: "A fish that defies reason. It smokes a pipe." },
        { name: "Dream Dorado", xp: 800, gold: 525, desc: "A fish from the realm of sleep. It vanishes when you wake up." },
        { name: "Nightmare Narwhal", xp: 810, gold: 530, desc: "A terrifying thought given form. It chases you down dark corridors." },
        { name: "Paradox Lungfish", xp: 820, gold: 535, desc: "A lungfish that breathes water that doesn't exist and swims through impossible geometries. Observers report seeing it from angles that shouldn't be possible in three dimensional space." }
      ],
      Epic: [
        { name: "Meta Marlin", xp: 1550, gold: 800, desc: "A fish that knows it is a fish. It reads its own description." },
        { name: "Fourth Wall Flounder", xp: 1575, gold: 815, desc: "A fish that breaks the barrier. It swims out of the screen." },
        { name: "Developer Dace", xp: 1600, gold: 830, desc: "A fish with god mode. It can spawn items." },
        { name: "Code Catfish", xp: 1625, gold: 845, desc: "A fish made of green scrolling text. It is the matrix." },
        { name: "Source Salmon", xp: 1650, gold: 860, desc: "The origin of all data. Deleting it crashes the world." },
        { name: "Binary Bass", xp: 1675, gold: 875, desc: "A fish of ones and zeros. It is the basic language of the universe." },
        { name: "Hex Halibut", xp: 1700, gold: 890, desc: "A fish defined by hexadecimal colors. It changes hue instantly." },
        { name: "Script Shark", xp: 1725, gold: 905, desc: "A shark that follows a set path. It cannot deviate." }
      ],
      Legendary: [
        { name: "Alpha Omega Arapaima", xp: 3100, gold: 1700, desc: "The beginning and the end. It is the first and last fish." },
        { name: "Infinity Ide", xp: 3150, gold: 1730, desc: "A fish that goes on forever. You can never see its tail." },
        { name: "Eternal Eel", xp: 3200, gold: 1760, desc: "An eel that exists outside of time. It is immortal." },
        { name: "Omniscient Oscar", xp: 3250, gold: 1790, desc: "A fish that knows everything. It knows you are fishing." },
        { name: "Omnipotent Orca", xp: 3300, gold: 1820, desc: "A whale with unlimited power. It can rewrite the laws of physics." }
      ],
      Mythic: [
        { name: "Chaos Void Kraken", xp: 7600, gold: 3800, desc: "A monster made of pure static and glitches. It tears the texture of the universe." },
        { name: "Paradox Leviathan", xp: 7700, gold: 3850, desc: "A beast that exists and does not exist. It attacks with logic bombs." },
        { name: "Entropy Hydra", xp: 7800, gold: 3900, desc: "A dragon of decay. Its breath accelerates the aging of the universe." },
        { name: "Null Serpent", xp: 7900, gold: 3950, desc: "A snake of absolute nothingness. It erases whatever it eats." },
        { name: "Abstract Aspidochelone", xp: 8000, gold: 4000, desc: "A turtle carrying a surrealist landscape on its back. Clocks melt on its shell." }
      ],
      Exotic: [
        { name: "The End Jormungandr", xp: 28000, gold: 14000, desc: "The snake that circles the end of time. When it lets go, the game is over." },
        { name: "Game Over Grouper", xp: 28500, gold: 14250, desc: "A fish that signals the end. Catching it resets the score." },
        { name: "Credits Carp", xp: 29000, gold: 14500, desc: "A fish with names scrolling on its side. It thanks you for playing." }
      ],
      Arcane: [
        { name: "Abzu Primordial", xp: 140000, gold: 110000, desc: "The primeval sea of fresh water from before creation. It creates the gods and monsters, existing before the concept of existence itself." }
      ]
    }
  }
};
