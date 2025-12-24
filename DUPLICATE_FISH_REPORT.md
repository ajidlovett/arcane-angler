# Duplicate Fish Report

Generated: 2025-12-24

## Summary

- **18 fish** appear in multiple biomes with **DIFFERENT rarities**
- **13 fish** appear in multiple biomes with **SAME rarity**
- **Total duplicate fish names:** 31

---

## Fish That Appear in Multiple Biomes with DIFFERENT Rarities (18 fish)

These fish need special attention as they have different rarities in different biomes.

### 1. Black Hole Bass
- Biome 37 (The Gravity Well Grotto) - **Rare**
- Biome 39 (The Cosmic Void Expanse) - **Uncommon**

### 2. Bronze Barracuda
- Biome 26 (The Paleolithic Pools) - **Rare**
- Biome 31 (The Steam Forge Delta) - **Fine**

### 3. Comet Carp
- Biome 37 (The Gravity Well Grotto) - **Epic**
- Biome 39 (The Cosmic Void Expanse) - **Common**

### 4. Eclipse Eel
- Biome 28 (The Sun Gold Cenote) - **Fine**
- Biome 37 (The Gravity Well Grotto) - **Fine**
- Biome 39 (The Cosmic Void Expanse) - **Uncommon**

### 5. Entropy Eel ⚠️ (4 occurrences!)
- Biome 15 (The Throne of the Deep) - **Uncommon**
- Biome 37 (The Gravity Well Grotto) - **Rare**
- Biome 39 (The Cosmic Void Expanse) - **Legendary**
- Biome 40 (The Reality Rift Reef) - **Rare**

### 6. Inferno Ide
- Biome 24 (The Thorn Coral Gardens) - **Epic**
- Biome 38 (The Ectoplasmic Estuary) - **Fine**

### 7. Lucid Lungfish
- Biome 23 (The Spore Light Caverns) - **Fine**
- Biome 40 (The Reality Rift Reef) - **Rare**

### 8. Nebula Needlefish
- Biome 37 (The Gravity Well Grotto) - **Fine**
- Biome 39 (The Cosmic Void Expanse) - **Uncommon**

### 9. Quantum Quillback
- Biome 33 (The Neon Grid Reef) - **Epic**
- Biome 40 (The Reality Rift Reef) - **Uncommon**

### 10. Razor Leaf Ray
- Biome 7 (Verdant Canopy River) - **Uncommon**
- Biome 24 (The Thorn Coral Gardens) - **Rare**

### 11. Relativity Ray
- Biome 37 (The Gravity Well Grotto) - **Uncommon**
- Biome 39 (The Cosmic Void Expanse) - **Fine**

### 12. Rosa Ray
- Biome 24 (The Thorn Coral Gardens) - **Common**
- Biome 25 (The Blossom Basin) - **Uncommon**

### 13. Scroll Snapper
- Biome 29 (The Jade Lantern Lake) - **Uncommon**
- Biome 36 (The Aether Flux Stream) - **Common**

### 14. Singularity Shark
- Biome 15 (The Throne of the Deep) - **Exotic**
- Biome 37 (The Gravity Well Grotto) - **Fine**

### 15. Tachyon Trout
- Biome 37 (The Gravity Well Grotto) - **Legendary**
- Biome 39 (The Cosmic Void Expanse) - **Fine**

### 16. Void Viperfish
- Biome 37 (The Gravity Well Grotto) - **Uncommon**
- Biome 39 (The Cosmic Void Expanse) - **Fine**

### 17. Volcano Viperfish
- Biome 24 (The Thorn Coral Gardens) - **Epic**
- Biome 27 (The Totem Atoll) - **Uncommon**

### 18. Zombie Zebrafish
- Biome 23 (The Spore Light Caverns) - **Rare**
- Biome 38 (The Ectoplasmic Estuary) - **Common**

---

## Fish That Appear in Multiple Biomes with SAME Rarity (13 fish)

These fish have the same rarity across all biomes where they appear.

### 1. Anti Matter Anchovy (Fine)
- Biome 37 (The Gravity Well Grotto)
- Biome 39 (The Cosmic Void Expanse)

### 2. Archmage Arapaima (Epic)
- Biome 13 (Sunken City of Aethelgard)
- Biome 36 (The Aether Flux Stream)

### 3. Bone Bass (Common)
- Biome 26 (The Paleolithic Pools)
- Biome 38 (The Ectoplasmic Estuary)

### 4. Dark Matter Dorado (Fine)
- Biome 37 (The Gravity Well Grotto)
- Biome 39 (The Cosmic Void Expanse)

### 5. Orbit Oscar (Common)
- Biome 37 (The Gravity Well Grotto)
- Biome 39 (The Cosmic Void Expanse)

### 6. Quasar Quillback (Uncommon)
- Biome 37 (The Gravity Well Grotto)
- Biome 39 (The Cosmic Void Expanse)

### 7. Ritual Ray (Fine)
- Biome 26 (The Paleolithic Pools)
- Biome 36 (The Aether Flux Stream)

### 8. Rune Roach (Common)
- Biome 30 (The Runic Fjords)
- Biome 36 (The Aether Flux Stream)

### 9. Shaman Shark (Fine)
- Biome 23 (The Spore Light Caverns)
- Biome 26 (The Paleolithic Pools)

### 10. Sun Snapper (Common)
- Biome 28 (The Sun Gold Cenote)
- Biome 39 (The Cosmic Void Expanse)

### 11. Torch Trout (Uncommon)
- Biome 26 (The Paleolithic Pools)
- Biome 27 (The Totem Atoll)

### 12. Vacuum Vomer (Common)
- Biome 37 (The Gravity Well Grotto)
- Biome 39 (The Cosmic Void Expanse)

### 13. Wormhole Wrasse (Fine)
- Biome 37 (The Gravity Well Grotto)
- Biome 39 (The Cosmic Void Expanse)

---

## Recommendations

### For Fish with Different Rarities (18 fish)
You should consider:
1. **Renaming** them to be unique per biome (e.g., "Cosmic Black Hole Bass" vs "Gravity Black Hole Bass")
2. **Keeping duplicates** but ensuring sprite system accounts for biome_id
3. **Consolidating** to single biome if the duplicate was unintentional

### For Fish with Same Rarity (13 fish)
These may be intentional (migratory fish, cosmic fish appearing in multiple space biomes). You can:
1. Keep them as-is if intentional
2. Use the same sprite across biomes
3. Or create biome-specific variants of the sprite

### Database Impact
If you keep duplicates, you'll need to track `biome_id` in:
- `player_inventory` table
- `locked_fish` table

This ensures correct sprite display and proper fish identification.
