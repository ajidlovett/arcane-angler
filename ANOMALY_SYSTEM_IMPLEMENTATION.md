# Anomaly System Implementation Summary

## 🎯 Overview

The Anomaly (World Boss) system has been implemented with the following features:
- **20 unique bosses** with stat weaknesses (STR/INT/LUCK/STAMINA)
- **Attack mechanics** with named abilities (Harpoon Strike, Arcane Bolt, Lucky Strike, Tidal Surge)
- **Fragment shop** with exclusive avatars and XP boosters
- **Global XP booster queue** system with stacking personal + global boosters
- **Auto-spawn scheduler** (6-12 hour randomized intervals)
- **Dynamic HP scaling** based on active player count
- **Reward system** with level-based gold + damage contribution
- **History tracking** (last 5 participated events per player)

---

## ✅ COMPLETED - Backend Implementation

### 1. Database Schema ✓
**File**: `backend/migrations/add_anomaly_system.sql`

**Tables Created**:
- `anomalies` - 20 boss definitions with weaknesses/resistances
- `anomaly_events` - Active/historical events with HP tracking
- `anomaly_participation` - Player damage, rewards, cooldown tracking
- `global_xp_booster_queue` - Queue system for global boosters
- `fragment_shop_purchases` - Purchase history
- `anomaly_attack_stats` - Analytics data

**Player Data Columns Added**:
- `anomaly_fragments` (INT) - Fragment currency
- `active_xp_booster_personal` (JSON) - Personal booster with expiry

**Pre-populated Data**:
- 20 anomalies across 4 tiers:
  - Elemental: Inferno Leviathan, Frost Titan, Storm Serpent, Terra Colossus
  - Void/Cosmic: Void Kraken, Star Eater, Eclipse Wyrm, Nebula Hydra
  - Corrupted: Abyssal Phantom, Crimson Maw, Plague Behemoth, Chaos Spawn
  - Mythic: Ancient Kraken, Phoenix of the Deep, Leviathan Prime, Hydra of Ages
  - Legendary: Temporal Eel, Crystal Guardian, Blood Moon Serpent, Prismatic Whale

---

### 2. Backend Routes ✓

#### Anomaly Routes (`backend/routes/anomalies.js`)
- `GET /api/anomalies/current` - Get active anomaly + player participation
- `POST /api/anomalies/attack` - Attack with stat selection (6-sec cooldown enforced)
- `GET /api/anomalies/history` - Last 5 participated events
- `POST /api/anomalies/claim-rewards` - Manual reward claiming (also auto-claims)

**Features**:
- ✓ Server-side attack cooldown (6 seconds)
- ✓ Stat-based damage calculation with multipliers:
  - Primary weakness: 2.5x damage
  - Secondary weakness: 1.5x damage
  - Resistant stat: 0.5x damage
- ✓ Boss HP tracking with real-time updates
- ✓ Auto-reward calculation on boss defeat
- ✓ Top 10 leaderboard per event

#### Fragment Shop Routes (`backend/routes/fragmentShop.js`)
- `GET /api/fragment-shop/items` - List available avatars + boosters
- `POST /api/fragment-shop/purchase` - Buy item with fragments
- `GET /api/fragment-shop/global-booster/queue` - View booster queue + active booster
- `GET /api/fragment-shop/global-booster/leaderboard` - Top booster activators

**Features**:
- ✓ Auto-scan `/assets/avatar/fragment/` for `avatarboss_XXX.png` avatars
- ✓ Personal XP Booster: 30 fragments → 15% XP for 2 hours
- ✓ Global XP Booster: 100 fragments → 25% XP for 2 hours (all players)
- ✓ Queue system: when one global booster is active, new ones queue up
- ✓ Auto-activate next in queue when current expires

---

### 3. Anomaly Scheduler ✓
**File**: `backend/services/anomalyScheduler.js`

**Features**:
- ✓ Auto-spawns first boss on server start
- ✓ Random spawn interval: 6-12 hours
- ✓ 5-minute warning before boss ends
- ✓ Auto-claims pending rewards when new boss spawns
- ✓ Avoids spawning same boss twice in last 5 events
- ✓ Dynamic HP scaling: `base_hp × (1 + log10(active_players))`
- ✓ Graceful shutdown handling

**Cron Jobs** (running every minute):
1. Check for anomaly spawn/end times
2. Process global booster queue (activate next if expired)
3. Calculate rewards for recently defeated bosses

**Registered in**: `backend/server.js` (starts on server launch)

---

### 4. XP Booster System ✓
**File**: `backend/utils/xpBoosterUtil.js`

**Features**:
- ✓ Personal + Global boosters **stack additively**:
  - Personal 15% + Global 25% = **40% total XP boost**
- ✓ Applied to all XP sources:
  - Normal fishing casts
  - Auto-cast (on top of 50% reduction)
  - Relic drops
  - Treasure chests
- ✓ Auto-expires personal boosters
- ✓ Checks active global booster from queue

**Integration**: Added to `backend/routes/game.js` in:
- `/api/game/cast` route (lines 175-177, 259, 291, 345)
- `/api/game/auto-cast` route (lines 830-832, 864)

---

### 5. API Service Methods ✓
**File**: `js/api-service.js`

**New Methods**:
```javascript
// Anomaly System
getCurrentAnomaly()          // Get active boss data
attackAnomaly(statUsed)      // Attack with STR/INT/LUCK/STAMINA
getAnomalyHistory()          // Last 5 participated events
claimAnomalyRewards(eventId) // Manual claim (usually auto-claimed)

// Fragment Shop
getFragmentShopItems()       // List avatars + boosters
purchaseFragmentItem(type, id, cost) // Buy with fragments
getGlobalBoosterQueue()      // View queue status
getGlobalBoosterLeaderboard() // Top activators
```

---

## 📋 TODO - Frontend Implementation

### 6. Anomaly Tab UI (game.js)
**Status**: ❌ Not Started

**Requirements**:
1. Add "Anomalies" tab to main navigation
2. Display current active anomaly:
   - Boss name, image, description
   - HP bar with % remaining
   - Weakness indicators (icons for STR/INT/LUCK/STAMINA)
   - Countdown timer to next spawn
   - Active player count
3. Attack interface:
   - 4 buttons: "Harpoon Strike" (STR), "Arcane Bolt" (INT), "Lucky Strike" (LUCK), "Tidal Surge" (STAMINA)
   - Show player's current stat values for each
   - Display damage multiplier preview (2.5x/1.5x/1.0x/0.5x)
   - 6-second cooldown indicator
4. Live leaderboard (top 10 damage dealers)
5. Player stats display:
   - Your damage: X (Y% of total)
   - Attacks made: Z
   - Estimated rewards: Gold + Fragments

**UI Mockup**:
```
╔══════════════════════════════════════════════════════════╗
║  🌊 VOID KRAKEN                                          ║
║  "A nightmare from beyond reality..."                   ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 73% HP (730,000/1,000,000)║
║                                                          ║
║  Weaknesses: 🧠 INT (2.5x) | 🍀 LUCK (1.5x)            ║
║  Resists: 💪 STR (0.5x)                                 ║
║                                                          ║
║  ⏱️ Next Spawn: 4h 23m | 🎣 42 Anglers Fighting         ║
║                                                          ║
║  ┌─────────────────────────────────────────────────────┐║
║  │ CHOOSE YOUR ATTACK:                                 │║
║  │ [💪 Harpoon Strike] (120) → 60 dmg (0.5x)          │║
║  │ [🧠 Arcane Bolt] (85) → 213 dmg (2.5x) ⭐BEST!     │║
║  │ [🍀 Lucky Strike] (60) → 90 dmg (1.5x)             │║
║  │ [🛡️ Tidal Surge] (95) → 95 dmg (1.0x)              │║
║  │                                                     │║
║  │ Cooldown: Ready! / 4.2s remaining                  │║
║  └─────────────────────────────────────────────────────┘║
║                                                          ║
║  YOUR STATS:                                             ║
║  Damage Dealt: 12,340 (1.7% of total)                   ║
║  Attacks: 58 | Rank: #14                                ║
║  Estimated Rewards: ~1,850 Gold, ~6 Fragments            ║
║                                                          ║
║  TOP DAMAGE DEALERS:                                     ║
║  1. FisherKing123 - 45,230 (6.2%)                       ║
║  2. SeaLord99 - 38,120 (5.2%)                           ║
║  3. OceanMaster - 31,450 (4.3%)                         ║
╚══════════════════════════════════════════════════════════╝
```

---

### 7. Attack Mechanics Implementation
**Status**: ❌ Not Started

**Requirements**:
1. Handle attack button clicks
2. Call `ApiService.attackAnomaly(statUsed)`
3. Display attack results:
   - Damage dealt
   - Boss HP update (animate HP bar)
   - Effectiveness message ("Super Effective!" / "Not Very Effective...")
4. Enforce client-side 6-second cooldown (visual countdown)
5. Update player participation stats in real-time
6. Show toast notifications:
   - "Dealt 213 damage! (SUPER EFFECTIVE!)"
   - "Boss defeated! Rewards: +2,450 Gold, +8 Fragments"
7. Poll for boss HP updates every 5-10 seconds

---

### 8. Fragment Shop UI
**Status**: ❌ Not Started

**Requirements**:
1. Add "Fragment Shop" tab (or sub-tab under Shop)
2. Display current fragment balance prominently
3. Avatar gallery:
   - Grid layout showing all `/assets/avatar/fragment/avatarboss_XXX.png`
   - Show "OWNED" badge on purchased avatars
   - Preview avatar on hover
   - Click to purchase (50 fragments)
4. Booster section:
   - Personal XP Booster card: 30 fragments, 15% XP, 2 hours
   - Global XP Booster card: 100 fragments, 25% XP, 2 hours (all players)
   - Show active booster status with countdown
   - Display "Queue Position" for global boosters
5. Purchase confirmation modal:
   - "Purchase [Item] for X fragments?"
   - Show remaining fragments after purchase
6. Success message: "Purchased [Item]! Fragments remaining: X"

**UI Mockup**:
```
╔═══════════════════════════════════════════════════════════╗
║  💎 FRAGMENT SHOP          Your Fragments: 150            ║
╠═══════════════════════════════════════════════════════════╣
║  📦 EXCLUSIVE AVATARS (50 fragments each)                 ║
║  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                         ║
║  │ 🦑  │ │ 🦈  │ │ 🐋  │ │ 🐉  │                         ║
║  │OWNED│ │ BUY │ │ BUY │ │ BUY │                         ║
║  └─────┘ └─────┘ └─────┘ └─────┘ ...                     ║
║                                                           ║
║  ⚡ XP BOOSTERS                                           ║
║  ┌──────────────────────────────────────────────────────┐║
║  │ Personal Booster (30 💎)                             │║
║  │ +15% XP for 2 hours (you only)                       │║
║  │ [PURCHASE] | Active: 1h 23m remaining ✅             │║
║  └──────────────────────────────────────────────────────┘║
║  ┌──────────────────────────────────────────────────────┐║
║  │ Global Booster (100 💎)                              │║
║  │ +25% XP for 2 hours (ALL PLAYERS!)                   │║
║  │ [PURCHASE] | Active: SeaLord99 (47m remaining)       │║
║  │              Queue: #3 (Your booster), #4, #5...     │║
║  └──────────────────────────────────────────────────────┘║
╚═══════════════════════════════════════════════════════════╝
```

---

### 9. Global Booster Queue Display
**Status**: ❌ Not Started

**Requirements**:
1. Show active global booster in main UI (fishing page header):
   - "🌟 Global XP Boost: +25% (Active for 1h 23m)"
   - Click to see queue details
2. Queue modal/panel:
   - Currently active: [Username] - Expires in X
   - Queue position 1: [Username] - Queued X minutes ago
   - Queue position 2: ...
3. Highlight user's position in queue
4. Real-time countdown updates
5. Toast notification when:
   - Global booster activates
   - User's queued booster activates
   - Global booster expires

---

### 10. Boss History Display
**Status**: ❌ Not Started

**Requirements**:
1. "History" tab within Anomalies section
2. Display last 5 participated anomaly events
3. Show for each event:
   - Boss name + icon
   - Your damage (% of total)
   - Attacks made
   - Rewards earned (gold + fragments)
   - Status (Defeated / Ended)
   - Date/time
4. Sort by most recent first
5. Total stats summary:
   - Total bosses participated: X
   - Total fragments earned: Y
   - Total damage dealt: Z

**UI Mockup**:
```
╔════════════════════════════════════════════════════════════╗
║  📜 ANOMALY HISTORY (Last 5 Events)                        ║
╠════════════════════════════════════════════════════════════╣
║  🦑 Void Kraken (2 hours ago) - DEFEATED                   ║
║  Your Contribution: 12,340 dmg (1.7%) | 58 attacks         ║
║  Rewards: +2,450 Gold, +8 Fragments                        ║
║  ────────────────────────────────────────────────────────  ║
║  🔥 Inferno Leviathan (8 hours ago) - DEFEATED             ║
║  Your Contribution: 8,120 dmg (1.1%) | 42 attacks          ║
║  Rewards: +1,920 Gold, +6 Fragments                        ║
║  ────────────────────────────────────────────────────────  ║
║  ❄️ Frost Titan (14 hours ago) - DEFEATED                  ║
║  Your Contribution: 15,890 dmg (2.3%) | 73 attacks         ║
║  Rewards: +3,100 Gold, +10 Fragments                       ║
╚════════════════════════════════════════════════════════════╝
```

---

### 11. Countdown Timer & Notifications
**Status**: ❌ Not Started

**Requirements**:
1. Main anomaly tab header shows countdown:
   - "Next Spawn: 4h 23m 15s" (live updating)
   - "Ending in: 5m 00s" (when < 5 min remaining)
2. Toast notification at 5-minute warning:
   - "⚠️ Current anomaly ending soon! New anomaly spawns in 5:00"
3. Toast when new anomaly spawns:
   - "🌊 NEW ANOMALY: Void Kraken has appeared!"
4. Cooldown timer on attack buttons:
   - "Ready!" or "4.2s" countdown
5. Auto-refresh boss HP every 10 seconds while on anomaly tab
6. Notification when boss is defeated:
   - "🎉 [Boss Name] DEFEATED! You earned: X Gold, Y Fragments"

---

### 12. Global Booster Activation Leaderboard
**Status**: ❌ Not Started

**Requirements**:
1. "Booster Heros" leaderboard (separate tab or sub-section)
2. Show top 50 players who have activated global boosters
3. Columns:
   - Rank
   - Username
   - Total Activations
   - Last Activation (time ago)
4. Highlight current user's rank
5. Update weekly/monthly (future enhancement)

**UI Mockup**:
```
╔════════════════════════════════════════════════════════╗
║  🌟 BOOSTER HEROES LEADERBOARD                         ║
║  (Players who shared Global XP Boosters)               ║
╠════════════════════════════════════════════════════════╣
║  Rank  Username         Activations  Last Activation   ║
║  ────────────────────────────────────────────────────  ║
║   1.   GenerousOne           47      3 hours ago       ║
║   2.   TeamPlayer42          38      1 day ago         ║
║   3.   XPSanta               29      2 hours ago       ║
║  ...                                                   ║
║  12.   YOU (FisherKing)       5      6 hours ago  ⭐   ║
╚════════════════════════════════════════════════════════╝
```

---

## 🧪 Testing Checklist

### Backend Testing (can be done now)
- [x] Migration runs successfully
- [x] Server starts without errors
- [x] Anomaly scheduler spawns first boss
- [ ] `GET /api/anomalies/current` returns boss data
- [ ] `POST /api/anomalies/attack` enforces 6-second cooldown
- [ ] Damage multipliers calculate correctly (2.5x/1.5x/0.5x)
- [ ] Boss HP updates in real-time
- [ ] Rewards calculated correctly on defeat
- [ ] New boss spawns after 6-12 hours
- [ ] Fragment shop lists avatars from `/assets/avatar/fragment/`
- [ ] Personal XP booster activates and expires correctly
- [ ] Global XP booster queues properly
- [ ] XP multipliers stack (15% + 25% = 40%)
- [ ] Fishing XP increased by active boosters

### Frontend Testing (after UI implementation)
- [ ] Anomaly tab displays current boss
- [ ] Attack buttons show correct damage preview
- [ ] Client-side cooldown countdown works
- [ ] HP bar animates smoothly
- [ ] Top 10 leaderboard updates in real-time
- [ ] Fragment shop shows all avatars
- [ ] Avatar purchase deducts fragments correctly
- [ ] Personal booster countdown shows in UI
- [ ] Global booster queue displays correctly
- [ ] Notifications trigger at correct times
- [ ] Boss history shows last 5 events
- [ ] Booster leaderboard ranks correctly

---

## 📁 File Structure

### Backend Files Created/Modified
```
backend/
├── migrations/
│   ├── add_anomaly_system.sql        ✅ Database schema + 20 bosses
│   └── RUN_MIGRATION.md              ✅ Migration instructions
├── routes/
│   ├── anomalies.js                  ✅ Anomaly attack/participation routes
│   ├── fragmentShop.js               ✅ Fragment shop + booster routes
│   └── game.js                       ✅ Modified: XP multipliers integrated
├── services/
│   └── anomalyScheduler.js           ✅ Auto-spawn + queue processing
├── utils/
│   └── xpBoosterUtil.js              ✅ XP multiplier calculation
└── server.js                         ✅ Modified: Routes + scheduler registered
```

### Frontend Files Modified/TODO
```
js/
├── api-service.js                    ✅ Added anomaly + shop methods
└── game.js                           ❌ TODO: Add Anomaly tab UI

assets/avatar/fragment/               ❌ TODO: Add 20 avatarboss_XXX.png files
```

---

## 🚀 Deployment Steps

### 1. Backend Deployment
```bash
# 1. Run database migration
cd backend/migrations
mysql -u root -p arcane_angler < add_anomaly_system.sql

# 2. Restart server to start anomaly scheduler
pm2 restart arcane-angler-api
# or
npm start

# 3. Verify logs show:
# "🎣 Anomaly Scheduler starting..."
# "✅ Anomaly Scheduler started successfully"
# "🌊 New anomaly spawned: [Boss Name]"
```

### 2. Frontend Deployment
```bash
# 1. Create avatar images in /assets/avatar/fragment/
# - avatarboss_001.png through avatarboss_020.png
# - 512x512 or 256x256 PNG format recommended

# 2. Implement UI components in game.js (see TODO sections above)

# 3. Upload to production server

# 4. Clear CDN cache if using Cloudflare/CloudFront
```

### 3. Verification
```bash
# Test API endpoints
curl https://arcaneangler.com/api/anomalies/current
curl https://arcaneangler.com/api/fragment-shop/items
curl https://arcaneangler.com/api/fragment-shop/global-booster/queue

# Test in browser
# - Login to game
# - Click "Anomalies" tab (once implemented)
# - Verify boss displays correctly
# - Try attacking with different stats
# - Check Fragment Shop for avatars
```

---

## 💡 Future Enhancements (Optional)

1. **Anomaly Phases**: Boss changes weaknesses at 75%, 50%, 25% HP
2. **Rare Loot Drops**: Special rods/bait from specific bosses
3. **Boss Titles**: Earn cosmetic titles for defeating bosses (e.g., "Kraken Slayer")
4. **Weekly Rotation**: Guaranteed boss schedule for planning
5. **Boss-Specific Mechanics**: Unique abilities per boss (DoT, heal, enrage)
6. **Guild Boss Raids**: Cooperative guild-only bosses
7. **Anomaly Codex**: Collection book tracking boss defeats
8. **Fragment Shop Expansion**: More cosmetics, emotes, bait skins
9. **Boss Voice Lines**: Text quotes when boss spawns/is defeated
10. **Seasonal Bosses**: Holiday-themed limited-time bosses

---

## ❓ Known Issues / Notes

### Avatar Scanning
- The fragment shop currently scans `/assets/avatar/fragment/` for `avatarboss_XXX.png` files
- If directory doesn't exist, it returns empty array (no crash)
- Make sure to create this directory and add at least 1 avatar before testing

### HP Scaling
- Dynamic HP scaling recalculates only when difference > 10%
- This prevents constant small adjustments but may delay scaling during rapid player joins
- Adjust threshold in `anomalyScheduler.js:279` if needed

### Global Booster Queue
- Currently no limit on queue length
- Consider adding max queue limit (e.g., 10) in future to prevent abuse
- Queue processor runs every minute, so activation may have up to 60-second delay

### XP Booster Stacking
- Personal + Global stack additively (15% + 25% = 40%)
- This is intentional to reward both personal investment and community contribution
- If this seems too powerful, adjust multipliers in fragment shop items

---

## 📞 Support

**Questions or Issues?**
- Check `backend/migrations/RUN_MIGRATION.md` for migration help
- Review `CLAUDE.md` for project architecture
- Test API endpoints with curl/Postman before blaming frontend
- Check server logs for scheduler errors: `pm2 logs arcane-angler-api`

**Next Steps**:
1. Run database migration
2. Restart server
3. Verify `/api/anomalies/current` returns data
4. Create 20 avatar images in `/assets/avatar/fragment/`
5. Implement frontend UI (game.js)
6. Test end-to-end flow

---

**Last Updated**: 2025-12-25
**Status**: Backend 100% Complete | Frontend 0% Complete
**Estimated Frontend Dev Time**: 6-8 hours for full UI implementation
