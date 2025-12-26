# 🖼️ Anomaly Boss Image Setup Guide

## ✅ **Image Display Now Implemented!**

The frontend now supports displaying boss images with automatic fallback to 🌊 emoji if images are missing.

---

## 📁 **Step-by-Step Setup**

### **Step 1: Create Images Directory**

On your live server:
```bash
mkdir -p /var/www/html/assets/anomalies
chmod 755 /var/www/html/assets/anomalies
```

---

### **Step 2: Upload Boss Images**

Upload 20 images to `/var/www/html/assets/anomalies/` with these filenames:

**Recommended naming** (lowercase with hyphens):
```
inferno-leviathan.png
frost-titan.png
storm-serpent.png
terra-colossus.png
void-kraken.png
star-eater.png
eclipse-wyrm.png
nebula-hydra.png
abyssal-phantom.png
crimson-maw.png
plague-behemoth.png
chaos-spawn.png
ancient-kraken.png
phoenix-of-the-deep.png
leviathan-prime.png
hydra-of-ages.png
temporal-eel.png
crystal-guardian.png
blood-moon-serpent.png
prismatic-whale.png
```

**Image Specifications**:
- **Format**: PNG (with transparency) or JPG
- **Size**: 512x512 pixels recommended (minimum 256x256)
- **Aspect Ratio**: Square (1:1)
- **File Size**: < 500KB each for fast loading
- **Theme**: Epic sea monsters, cosmic creatures, mythical beasts

---

### **Step 3: Update Database**

Run this SQL to set all image URLs at once:

```sql
-- Bulk update with lowercase-hyphenated filenames
UPDATE anomalies SET image_url = '/assets/anomalies/inferno-leviathan.png' WHERE name = 'Inferno Leviathan';
UPDATE anomalies SET image_url = '/assets/anomalies/frost-titan.png' WHERE name = 'Frost Titan';
UPDATE anomalies SET image_url = '/assets/anomalies/storm-serpent.png' WHERE name = 'Storm Serpent';
UPDATE anomalies SET image_url = '/assets/anomalies/terra-colossus.png' WHERE name = 'Terra Colossus';
UPDATE anomalies SET image_url = '/assets/anomalies/void-kraken.png' WHERE name = 'Void Kraken';
UPDATE anomalies SET image_url = '/assets/anomalies/star-eater.png' WHERE name = 'Star Eater';
UPDATE anomalies SET image_url = '/assets/anomalies/eclipse-wyrm.png' WHERE name = 'Eclipse Wyrm';
UPDATE anomalies SET image_url = '/assets/anomalies/nebula-hydra.png' WHERE name = 'Nebula Hydra';
UPDATE anomalies SET image_url = '/assets/anomalies/abyssal-phantom.png' WHERE name = 'Abyssal Phantom';
UPDATE anomalies SET image_url = '/assets/anomalies/crimson-maw.png' WHERE name = 'Crimson Maw';
UPDATE anomalies SET image_url = '/assets/anomalies/plague-behemoth.png' WHERE name = 'Plague Behemoth';
UPDATE anomalies SET image_url = '/assets/anomalies/chaos-spawn.png' WHERE name = 'Chaos Spawn';
UPDATE anomalies SET image_url = '/assets/anomalies/ancient-kraken.png' WHERE name = 'Ancient Kraken';
UPDATE anomalies SET image_url = '/assets/anomalies/phoenix-of-the-deep.png' WHERE name = 'Phoenix of the Deep';
UPDATE anomalies SET image_url = '/assets/anomalies/leviathan-prime.png' WHERE name = 'Leviathan Prime';
UPDATE anomalies SET image_url = '/assets/anomalies/hydra-of-ages.png' WHERE name = 'Hydra of Ages';
UPDATE anomalies SET image_url = '/assets/anomalies/temporal-eel.png' WHERE name = 'Temporal Eel';
UPDATE anomalies SET image_url = '/assets/anomalies/crystal-guardian.png' WHERE name = 'Crystal Guardian';
UPDATE anomalies SET image_url = '/assets/anomalies/blood-moon-serpent.png' WHERE name = 'Blood Moon Serpent';
UPDATE anomalies SET image_url = '/assets/anomalies/prismatic-whale.png' WHERE name = 'Prismatic Whale';
```

**OR** use this one-liner (auto-converts names):
```sql
UPDATE anomalies
SET image_url = CONCAT('/assets/anomalies/', LOWER(REPLACE(name, ' ', '-')), '.png');
```

---

### **Step 4: Verify URLs**

Check that URLs were set correctly:
```sql
SELECT name, image_url FROM anomalies ORDER BY id;
```

**Expected output**:
```
Inferno Leviathan    | /assets/anomalies/inferno-leviathan.png
Frost Titan          | /assets/anomalies/frost-titan.png
...
```

---

### **Step 5: Test in Browser**

1. Open https://arcaneangler.com
2. Click **🌊 Anomalies** tab
3. If a boss is active, you should see:
   - ✅ Boss image (24x24 box with rounded corners)
   - ✅ If image fails to load → Shows 🌊 emoji fallback
   - ✅ Boss name and description next to image

---

## 🎨 **Image URL Format Rules**

### ✅ **CORRECT** - Relative Path
```
/assets/anomalies/void-kraken.png
```

### ❌ **WRONG** - Absolute URL
```
https://arcaneangler.com/assets/anomalies/void-kraken.png
```

**Why relative?**
- Works on dev, staging, and production
- Easier to maintain
- Browser automatically uses correct domain

---

## 🖼️ **Frontend Image Display Features**

The updated component now:

1. **Displays Image**: 96x96px rounded image with blue border
2. **Fallback on Error**: If image fails to load → shows 🌊 emoji
3. **Fallback if NULL**: If `image_url` is NULL in DB → shows 🌊 emoji
4. **Responsive Layout**: Image + boss info + countdown timers
5. **Alt Text**: Proper accessibility with boss name as alt text

---

## 🎨 **Where to Get Boss Images**

### **Option 1: AI Image Generators** (Fastest)
Use DALL-E, Midjourney, Stable Diffusion, or Leonardo.ai:

**Example Prompts**:
- "Epic sea monster kraken emerging from void, dark fantasy, card game art"
- "Frost titan giant covered in ice, ocean background, epic fantasy"
- "Cosmic whale with galaxy patterns, space theme, digital art"
- "Phoenix made of fire rising from ocean, mythical creature"

**Settings**:
- Style: Epic fantasy / Dark fantasy / Card game art
- Square aspect ratio (1:1)
- High detail

### **Option 2: Stock Images** (Free/Paid)
- **Unsplash**: Free high-quality images
- **Pexels**: Free stock photos
- **ArtStation**: Fantasy art (check licenses)
- **DeviantArt**: Commission artists

### **Option 3: Commission Custom Art**
- **Fiverr**: $10-50 per image
- **Upwork**: Professional artists
- **r/HungryArtists**: Reddit community

### **Option 4: Placeholder Strategy**
Start with simple colored squares or emojis:
1. Use 🌊 emoji for now (already works!)
2. Add real images later when budget allows
3. Players won't mind - gameplay is what matters

---

## 🧪 **Testing Checklist**

### **Image Loading**:
- [ ] Image appears when boss is active
- [ ] Image is 96x96px with rounded corners
- [ ] Image has blue border matching theme
- [ ] Boss name appears next to image
- [ ] Description shows below name

### **Fallback Behavior**:
- [ ] If image file missing → Shows 🌊 emoji
- [ ] If `image_url` is NULL → Shows 🌊 emoji
- [ ] Emoji has same size/border as image placeholder

### **Responsive Design**:
- [ ] Desktop: Image + info + timers all visible
- [ ] Mobile: Layout stacks properly
- [ ] No horizontal scroll

---

## 📊 **Current File Structure**

```
/var/www/html/
├── assets/
│   ├── anomalies/                    ← NEW! Boss images go here
│   │   ├── inferno-leviathan.png
│   │   ├── frost-titan.png
│   │   └── ... (18 more)
│   └── avatar/
│       ├── default/
│       │   └── avatar_001.png
│       └── fragment/                 ← Fragment shop avatars
│           ├── avatarboss_001.png
│           └── ... (19 more)
├── js/
│   └── components/
│       └── pages/
│           └── AnomaliesPage.js      ← Updated with image display!
└── index.html
```

---

## 🚀 **Quick Start (Minimal Setup)**

**Don't have time to create 20 images?** Start small:

### **Phase 1: Launch Without Images**
1. Don't update database (leave `image_url` as NULL)
2. Frontend shows 🌊 emoji for all bosses
3. System works perfectly, just no custom images

### **Phase 2: Add 5 Boss Images**
1. Create images for the first 5 bosses
2. Update only those 5 rows:
   ```sql
   UPDATE anomalies SET image_url = '/assets/anomalies/void-kraken.png' WHERE name = 'Void Kraken';
   ```
3. Other 15 still show emoji

### **Phase 3: Complete Collection**
1. Add remaining 15 images over time
2. Update database as you add each image
3. No downtime - seamless upgrade!

---

## 🛠️ **Troubleshooting**

### **Image Not Showing**:

**1. Check file exists**:
```bash
ls -la /var/www/html/assets/anomalies/void-kraken.png
```

**2. Check permissions**:
```bash
chmod 644 /var/www/html/assets/anomalies/*.png
```

**3. Check database**:
```sql
SELECT name, image_url FROM anomalies WHERE name = 'Void Kraken';
```

**4. Check browser console** (F12):
- Look for 404 errors
- Check exact URL browser is trying to load
- Verify path is `/assets/anomalies/...` not `https://...`

**5. Hard refresh**: Ctrl+F5 to clear cache

### **Wrong Image Loads**:
- Check filename matches exactly (case-sensitive on Linux!)
- `void-kraken.png` ≠ `Void-Kraken.png`
- Use lowercase-hyphenated names

### **Image Too Large**:
- Resize to 512x512px
- Compress with TinyPNG or similar
- Target < 200KB per image

---

## 📝 **Summary**

**What Changed**:
- ✅ Frontend now displays boss images (96x96px rounded with border)
- ✅ Automatic fallback to 🌊 emoji if image missing
- ✅ Supports relative paths: `/assets/anomalies/boss-name.png`

**What You Need to Do**:
1. Create `/assets/anomalies/` directory
2. Upload 20 boss images (or start with 5)
3. Update database with `image_url` values
4. Test in browser

**Files Updated**:
- `js/components/pages/AnomaliesPage.js` (image display added)
- Committed and pushed to: `claude/world-boss-system-7EJam`

---

**Need help finding or creating boss images? Let me know!** 🎨
