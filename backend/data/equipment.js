// Equipment Data - Rods and Baits (CommonJS format for backend)

const RODS = {
  // TIER 1: The Amateur Collection (500 - 6,500 Gold)
  'Willow Branch': { price: 500, str: 2, int: 0, luck: 0, stam: 0, tier: 1, desc: "Flexible, free, and barely better than using your hands." },
  'Reinforced Bamboo Rod': { price: 1500, str: 5, int: 0, luck: 0, stam: 2, tier: 1, desc: "Sturdy bamboo allows you to fish longer without getting tired." },
  'Fiberglass Casting Rod': { price: 3500, str: 5, int: 5, luck: 0, stam: 0, tier: 1, desc: "A smart investment for new anglers looking to maximize profit." },
  'The "Lucky" Stick': { price: 5000, str: 0, int: 0, luck: 10, stam: 0, tier: 1, desc: "It's just a stick with a four-leaf clover taped to it." },
  'Tinker\'s Mechanical Rod': { price: 10000, str: 0, int: 10, luck: 0, stam: 5, tier: 1, desc: "Gears and pulleys do the heavy lifting for you." },
  'Carbon-Flex 2000': { price: 15000, str: 15, int: 0, luck: 0, stam: 0, tier: 1, desc: "Lightweight aerospace material designed for hauling in multiple fish." },
  'Rusty Iron Pipe': { price: 20000, str: 18, int: 0, luck: 0, stam: 0, tier: 1, desc: "Heavy, crude, and ugly, but it won't break under pressure." },
  'Merchant\'s Ledger Rod': { price: 20000, str: 0, int: 18, luck: 0, stam: 0, tier: 1, desc: "Calculates the value of the fish as you reel it in." },
  'Mangrove Root Weaver': { price: 25000, str: 10, int: 0, luck: 8, stam: 0, tier: 1, desc: "Twisted roots formed into a pole. Great for swamp fishing." },
  'The Camper\'s Pole': { price: 35000, str: 0, int: 0, luck: 0, stam: 20, tier: 1, desc: "Comes with a cup holder. Perfect for long, lazy offline sessions." },

  // TIER 2: The Seasoned Angler (50,000 - 3,000,000 Gold)
  'The Cheese-Master 3000': { price: 50000, str: 0, int: 20, luck: 0, stam: 10, tier: 2, desc: "Bright yellow and smells faintly of cheddar. Great for gold farming." },
  'Thunderbolt Caster': { price: 250000, str: 30, int: 0, luck: 10, stam: 0, tier: 2, desc: "Harnesses static electricity to pull fish out of the water in groups." },
  'Obsidian Magma Rod': { price: 500000, str: 40, int: 0, luck: 0, stam: 0, tier: 2, desc: "Forged in a volcano. It can handle the heaviest catches." },
  'Jade Emperor\'s Pole': { price: 800000, str: 0, int: 50, luck: 20, stam: 0, tier: 2, desc: "An ornate rod inlaid with precious gems. Attracts wealth." },
  'Frost-Bite Rod': { price: 1000000, str: 20, int: 0, luck: 0, stam: 40, tier: 2, desc: "Cold to the touch. Preserves your energy for long fishing trips." },
  'Spirit-Walker\'s Staff': { price: 1250000, str: 0, int: 20, luck: 50, stam: 0, tier: 2, desc: "A ceremonial staff repurposed for fishing in the spirit realm." },
  'Golden Scarab Rod': { price: 1500000, str: 0, int: 60, luck: 0, stam: 0, tier: 2, desc: "Ancient desert technology. It seeks out valuable treasures." },
  'Mycelium Spore-Rod': { price: 2000000, str: 20, int: 0, luck: 40, stam: 0, tier: 2, desc: "Living fungus that grows stronger in damp environments." },
  'Crystal Shard Pole': { price: 2250000, str: 30, int: 30, luck: 0, stam: 0, tier: 2, desc: "Made of jagged glass. Sharp, dangerous, and efficient." },
  'Deep-Sea Harpoon': { price: 3000000, str: 70, int: 0, luck: 0, stam: 0, tier: 2, desc: "Less of a fishing rod, more of a weapon. Catches whales." },

  // TIER 3: The Ascended (10M - 600M Gold)
  'Neon-Pulse Rod': { price: 10000000, str: 40, int: 80, luck: 0, stam: 0, tier: 3, desc: "Buzzes with synthetic energy. Maximizes efficiency." },
  'Clockwork Chronos Rod': { price: 25000000, str: 0, int: 0, luck: 0, stam: 100, tier: 3, desc: "Ticks rhythmically. Allows for massive offline progression." },
  'Void-Eater': { price: 50000000, str: 100, int: 0, luck: 50, stam: 0, tier: 3, desc: "It pulls fish out of existence and into your inventory." },
  'Archmage\'s Runestaff': { price: 100000000, str: 0, int: 150, luck: 0, stam: 0, tier: 3, desc: "Glows with arcane power. Converts every catch into maximum gold." },
  'Vampiric Blood-Rod': { price: 250000000, str: 120, int: 0, luck: 80, stam: 0, tier: 3, desc: "A living tool carved from bone. It hungers for rare catches." },
  'Stardust Spindle': { price: 500000000, str: 0, int: 0, luck: 200, stam: 0, tier: 3, desc: "Weaves threads of fate to ensure you find the rarest creatures." },
  'Mercury Flow Rod': { price: 525000000, str: 150, int: 0, luck: 0, stam: 50, tier: 3, desc: "A liquid metal rod that shifts weight to help you reel." },
  'Sky-Sail Mast': { price: 550000000, str: 0, int: 0, luck: 100, stam: 100, tier: 3, desc: "Made from the mast of a sky-ship. Catches the wind and the fish." },
  'Symphonic Conductor': { price: 575000000, str: 0, int: 200, luck: 0, stam: 0, tier: 3, desc: "A baton that commands the ocean to pay you tribute." },
  'Book of Shadows Spine': { price: 600000000, str: 0, int: 120, luck: 120, stam: 0, tier: 3, desc: "Bound in leather. It knows where the secret fish hide." },

  // TIER 4: Godslayer & Abstract (5B - 750T Gold)
  'Event Horizon Rod': { price: 5000000000, str: 300, int: 0, luck: 0, stam: 300, tier: 4, desc: "So heavy that only a master can lift it. Pulls with gravity." },
  'The Glitch Stick (MissingNo)': { price: 50000000000, str: 250, int: 250, luck: 0, stam: 0, tier: 4, desc: "A corrupted item file. It breaks the economy." },
  'Geometry Prime': { price: 200000000000, str: 0, int: 400, luck: 400, stam: 0, tier: 4, desc: "Calculates the perfect angle for every cast." },
  'The Eraser': { price: 1000000000000, str: 600, int: 0, luck: 0, stam: 0, tier: 4, desc: "It doesn't just catch fish; it removes them from the water instantly." },
  'Rod of Genesis': { price: 100000000000000, str: 1000, int: 1000, luck: 1000, stam: 1000, tier: 4, desc: "Fashioned from the first tree in the Garden of Origins." },
  'The Developer\'s Debug Tool': { price: 500000000000000, str: 2500, int: 2500, luck: 2500, stam: 2500, tier: 4, desc: "A tool left behind by the creators. Overpowered and unfair." },
  'Supernova Caster': { price: 550000000000000, str: 1500, int: 0, luck: 1000, stam: 0, tier: 4, desc: "Forged in a dying star. It burns with the need to catch." },
  'Dimensional Rift Rod': { price: 600000000000000, str: 1200, int: 1200, luck: 0, stam: 0, tier: 4, desc: "Refracts reality to multiply your catch and your wealth." },
  'Soul-Harvester Scythe': { price: 650000000000000, str: 0, int: 500, luck: 2000, stam: 0, tier: 4, desc: "Reaps the rarest souls from the depths." },
  'The Omni-Null': { price: 750000000000000, str: 1500, int: 1500, luck: 1500, stam: 1500, tier: 4, desc: "A rod made of pure nothingness. It balances all things." }
};

const BAITS = {
  // TIER 1: The Basics (0 - 750 Gold)
  'Stale Bread Crust': { price: 0, str: 0, int: 0, luck: 0, stam: 0, tier: 1, desc: "Better than a bare hook.", stackSize: 999999 },
  'Wriggling Garden Worm': { price: 20, str: 2, int: 0, luck: 0, stam: 0, tier: 1, desc: "The classic. Fish can't resist the wiggle.", stackSize: 1 },
  'Shiny Pebble': { price: 40, str: 0, int: 0, luck: 2, stam: 0, tier: 1, desc: "Replaces the old foil. Magpies and fish love it.", stackSize: 1 },
  'Sticky Dough Ball': { price: 75, str: 3, int: 0, luck: 0, stam: 0, tier: 1, desc: "Expands in water. Good for catching two small fry at once.", stackSize: 1 },
  'Neon Cricket': { price: 100, str: 0, int: 0, luck: 4, stam: 0, tier: 1, desc: "Glows faintly. Helps rare fish find the hook in muddy water.", stackSize: 1 },
  'Fat Maggot': { price: 150, str: 5, int: 0, luck: 0, stam: 0, tier: 1, desc: "Disgusting, but fish find it irresistible. High protein.", stackSize: 1 },
  'Sparkle Fly': { price: 250, str: 0, int: 0, luck: 6, stam: 0, tier: 1, desc: "Fake fly with glittery wings. Attracts the fancy ones.", stackSize: 1 },
  'River Snail Meat': { price: 300, str: 4, int: 0, luck: 2, stam: 0, tier: 1, desc: "A crunchy treat for larger river predators.", stackSize: 1 },
  'Salmon Roe': { price: 400, str: 8, int: 0, luck: 0, stam: 0, tier: 1, desc: "A cluster of eggs. Often triggers a feeding frenzy.", stackSize: 1 },
  'Grotto Crystal Shard': { price: 550, str: 0, int: 0, luck: 8, stam: 0, tier: 1, desc: "Refracts light deep underwater. Grotto fish are drawn to it.", stackSize: 1 },
  'Frost Grub': { price: 750, str: 6, int: 0, luck: 4, stam: 0, tier: 1, desc: "Found in the ice. It stays wiggling even in freezing water.", stackSize: 1 },

  // TIER 2: The Specialist (750 - 7,500 Gold)
  'Aged Cheddar Chunk': { price: 900, str: 10, int: 0, luck: 0, stam: 0, tier: 2, desc: "Strong smell triggers aggressive feeding in the Cheddar Gorge.", stackSize: 1 },
  'Sand-Worm Segment': { price: 1100, str: 0, int: 0, luck: 10, stam: 0, tier: 2, desc: "Vibrates against the sand. Rare desert fish sense it.", stackSize: 1 },
  'Electric Grub': { price: 1500, str: 15, int: 0, luck: 0, stam: 0, tier: 2, desc: "Shocks the fish when they bite, hooking them instantly.", stackSize: 1 },
  'Gilded Wing': { price: 1750, str: 0, int: 0, luck: 15, stam: 0, tier: 2, desc: "A golden insect wing. It looks valuable, so valuable fish bite it.", stackSize: 1 },
  'Ghost Moth Wing': { price: 2500, str: 10, int: 0, luck: 10, stam: 0, tier: 2, desc: "Phases through water weeds to catch spirit fish.", stackSize: 1 },
  'Mangrove Root Sap': { price: 3200, str: 20, int: 0, luck: 0, stam: 0, tier: 2, desc: "Extremely sticky. Once they bite, they never let go.", stackSize: 1 },
  'Moon Dust Vial': { price: 3500, str: 0, int: 0, luck: 20, stam: 0, tier: 2, desc: "Glows with a soft lunar light. Hypnotic to rare species.", stackSize: 1 },
  'Explosive Spore Pod': { price: 4250, str: 25, int: 0, luck: 0, stam: 0, tier: 2, desc: "Bursts on contact, snagging multiple fish in a cloud of spores.", stackSize: 1 },
  'Rusty Gear': { price: 5000, str: 15, int: 0, luck: 10, stam: 0, tier: 2, desc: "Sunken city fish think it's spare parts. Heavy.", stackSize: 1 },
  'Glass Shard Lure': { price: 6000, str: 0, int: 0, luck: 25, stam: 0, tier: 2, desc: "Invisible in the water until it flashes. Deadly effective.", stackSize: 1 },
  'Void-Touched Leech': { price: 7500, str: 20, int: 0, luck: 15, stam: 0, tier: 2, desc: "It seeks out life in the dead waters of the void.", stackSize: 1 },

  // TIER 3: High-Tech & Arcane (7,500 - 75,000 Gold)
  'Magnetic Ball Bearing': { price: 8000, str: 30, int: 0, luck: 0, stam: 0, tier: 3, desc: "Essential for the Quicksilver Canal. Attracts metallic fish.", stackSize: 1 },
  'Mana Crystal Shard': { price: 10000, str: 0, int: 0, luck: 30, stam: 0, tier: 3, desc: "Radiates pure magic. Rare magical fish crave the mana.", stackSize: 1 },
  'Abyssal Mite': { price: 12000, str: 40, int: 0, luck: 0, stam: 0, tier: 3, desc: "A parasite that latches onto bones. Great for the Crimson Abyss.", stackSize: 1 },
  'Cyber-Fly v2.0': { price: 18000, str: 25, int: 0, luck: 20, stam: 0, tier: 3, desc: "Artificial bait programmed to target high-value assets.", stackSize: 1 },
  'Bottle of Clouds': { price: 25000, str: 0, int: 0, luck: 45, stam: 0, tier: 3, desc: "Condensed water vapor. Floats perfectly in the Sky Biome.", stackSize: 1 },
  'Blood-Worm': { price: 37500, str: 50, int: 0, luck: 0, stam: 0, tier: 3, desc: "Throbs with a heartbeat. Predators go crazy for it.", stackSize: 1 },
  'Chronos Sand': { price: 45000, str: 0, int: 0, luck: 50, stam: 0, tier: 3, desc: "Sands of time. It attracts fish from yesterday.", stackSize: 1 },
  'Crimson Flesh Chunk': { price: 50000, str: 60, int: 0, luck: 0, stam: 0, tier: 3, desc: "Fresh meat. The scent travels for miles in the blood ocean.", stackSize: 1 },
  'Neon Battery': { price: 57500, str: 30, int: 0, luck: 30, stam: 0, tier: 3, desc: "Leaks energy. Neon Reef fish treat it like a snack.", stackSize: 1 },
  'Ink Drop': { price: 65000, str: 0, int: 0, luck: 60, stam: 0, tier: 3, desc: "Pure black ink. It writes a story where you catch a rare fish.", stackSize: 1 },
  'Tuning Fork Tip': { price: 75000, str: 70, int: 0, luck: 0, stam: 0, tier: 3, desc: "Vibrates constantly. Sound-based fish swarm it.", stackSize: 1 },

  // TIER 4: Cosmic & Conceptual (100,000 - 2,000,000 Gold)
  'Nebula Dust': { price: 100000, str: 0, int: 0, luck: 70, stam: 0, tier: 4, desc: "Sprinkle a little universe on your line.", stackSize: 1 },
  'Time-Loop Larva': { price: 150000, str: 80, int: 0, luck: 0, stam: 0, tier: 4, desc: "If the fish escapes, time rewinds so you can hook it again.", stackSize: 1 },
  'Reality Glitch Block': { price: 250000, str: 100, int: 0, luck: 0, stam: 0, tier: 4, desc: "Forces the game code to spawn more fish per pull.", stackSize: 1 },
  'Concept of Desire': { price: 350000, str: 0, int: 0, luck: 100, stam: 0, tier: 4, desc: "It's not food, it's whatever the fish wants most.", stackSize: 1 },
  'Alpha Particle': { price: 500000, str: 0, int: 0, luck: 150, stam: 0, tier: 4, desc: "The very first piece of matter. Attracts Origins.", stackSize: 1 },
  'The Singularity': { price: 750000, str: 150, int: 0, luck: 50, stam: 0, tier: 4, desc: "A black hole on a hook. Nothing escapes the gravity.", stackSize: 1 },
  'Dark Matter Chunk': { price: 900000, str: 200, int: 0, luck: 0, stam: 0, tier: 4, desc: "Invisible and heavy. Anchors the biggest fish.", stackSize: 1 },
  'Soul Wisp': { price: 1200000, str: 100, int: 0, luck: 100, stam: 0, tier: 4, desc: "A loose soul. Attracts spectral entities.", stackSize: 1 },
  'Corrupted Code': { price: 1500000, str: 250, int: 0, luck: 0, stam: 0, tier: 4, desc: "Breaks the spawn limit cap for one cast.", stackSize: 1 },
  'Prism Shard': { price: 1800000, str: 0, int: 0, luck: 250, stam: 0, tier: 4, desc: "Refracts reality. Shining bait for Crystalline fish.", stackSize: 1 },
  'Origin Spark': { price: 2000000, str: 300, int: 0, luck: 300, stam: 0, tier: 4, desc: "The ultimate bait. A piece of the Big Bang.", stackSize: 1 }
};

export { RODS, BAITS };
