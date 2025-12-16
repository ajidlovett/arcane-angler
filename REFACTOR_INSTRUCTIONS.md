# Frontend ESM Refactoring - Completion Instructions

## Status: 90% Complete

### ✅ Completed:
1. **Backend Fix**: Added `statPoints` to `/api/player/data` response (player.js:124)
2. **ESM Utilities Created**:
   - `js/utils/icons.js` - Icon definitions
   - `js/utils/themes.js` - Theme configurations
   - `js/api-service.js` - Converted to ESM export
3. **Components Created**:
   - `js/components/CustomModal.js`
   - `js/components/GlobalNotification.js`
   - `js/components/SavingOverlay.js`
   - `js/components/PlaceholderPage.js`
   - `js/components/Sidebar.js`
4. **Page Components Extracted** (All 12 pages):
   - `js/components/pages/FishingPage.js` ✅ (with passive booster feedback)
   - `js/components/pages/StatsPage.js` ✅ (with bulk upgrade + stat_points fix)
   - `js/components/pages/LeaderboardPage.js` ✅ (mobile optimized)
   - `js/components/pages/OptionsPage.js`
   - `js/components/pages/BoostersPage.js`
   - `js/components/pages/EquipmentPage.js`
   - `js/components/pages/BiomesPage.js`
   - `js/components/pages/InventoryPage.js`
   - `js/components/pages/ProfilePage.js`
   - `js/components/pages/AchievementsPage.js`
   - `js/components/pages/FishpediaPage.js`
   - `js/components/pages/QuestPage.js`

### 🚧 Remaining Tasks:

#### 1. Create Main FishingGame Component
File: `js/components/FishingGame.js`

This component needs to:
- Import all page components
- Import themes, icons, utilities
- Manage player state
- **CRITICAL: Event-Driven Booster Fetching** (NOT polling):
  ```javascript
  const fetchActiveBoosters = async () => {
    const response = await apiService.getActiveBoosters();
    setActiveBoosters(response.boosters || []);
  };

  // Fetch boosters ONLY:
  // 1. On component mount
  useEffect(() => {
    fetchActiveBoosters();
  }, []);

  // 2. After buying a booster (in handler)
  const handleBuyBooster = async (boosterType) => {
    await apiService.buyBooster(boosterType);
    await fetchActiveBoosters(); // Refresh after purchase
  };

  // 3. When entering FishingPage or BoostersPage
  useEffect(() => {
    if (currentPage === 'fishing' || currentPage === 'boosters') {
      fetchActiveBoosters();
    }
  }, [currentPage]);

  // NO setInterval! NO polling!
  ```

- Implement all game handlers (handleFish, upgradeStat, buyRod, etc.)
- Route to correct page based on `currentPage` state

**Base Structure:**
```javascript
import { useState, useEffect } from 'react';
import apiService from '../api-service.js';
import { themes } from '../utils/themes.js';
import { Icons } from '../utils/icons.js';
import { Sidebar } from './Sidebar.js';
import { CustomModal } from './CustomModal.js';
import { GlobalNotification } from './GlobalNotification.js';
import { SavingOverlay } from './SavingOverlay.js';
import { PlaceholderPage } from './PlaceholderPage.js';

// Import all page components
import { FishingPage } from './pages/FishingPage.js';
import { StatsPage } from './pages/StatsPage.js';
import { LeaderboardPage } from './pages/LeaderboardPage.js';
import { OptionsPage } from './pages/OptionsPage.js';
import { BoostersPage } from './pages/BoostersPage.js';
import { EquipmentPage } from './pages/EquipmentPage.js';
import { BiomesPage } from './pages/BiomesPage.js';
import { InventoryPage } from './pages/InventoryPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { AchievementsPage } from './pages/AchievementsPage.js';
import { FishpediaPage } from './pages/FishpediaPage.js';
import { QuestPage } from './pages/QuestPage.js';

export const FishingGame = () => {
  // Copy state management from game-backup.js lines 953-1020
  // Copy helper functions from game-backup.js
  // Copy event handlers from game-backup.js lines 1338-1725
  // Copy useEffect hooks BUT remove booster polling intervals!

  // Render:
  return (
    <div className={...}>
      <CustomModal {...modalProps} />
      <SavingOverlay {...} />
      <Sidebar {...} />
      <main>
        <GlobalNotification {...} />
        {currentPage === 'fishing' && <FishingPage {...} />}
        {currentPage === 'stats' && <StatsPage {...} />}
        {/* ... all other pages */}
      </main>
    </div>
  );
};
```

#### 2. Create Main Entry Point
File: `js/main.js`
```javascript
import { FishingGame } from './components/FishingGame.js';

const { useState } = React;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    // Render auth screen (can keep inline or extract)
    return <AuthScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <FishingGame />;
}

// Render to DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

#### 3. Update index.html
Remove Babel, add ESM:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Arcane Angler - Fishing MMORPG</title>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- React and ReactDOM -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

  <!-- Styles (keep existing) -->
  <style>...</style>
</head>
<body>
  <div id="root"></div>

  <!-- Core game data (non-module scripts) -->
  <script src="js/biomes.js"></script>
  <script src="js/equipment.js"></script>
  <script src="js/funnylines.js"></script>
  <script src="js/idleNotifications.js"></script>
  <script src="js/achievements.js"></script>
  <script src="js/constants/gameConstants.js"></script>
  <script src="js/utils/rarityUtils.js"></script>
  <script src="js/game-helpers.js"></script>

  <!-- AUTH COMPONENT (keep as is for now) -->
  <script src="js/auth-component.js"></script>

  <!-- ESM ENTRY POINT -->
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

#### 4. Quick Test Plan
1. Start backend: `cd backend && node server.js`
2. Open browser to https://arcaneangler.com
3. Login
4. Test Fishing page - verify NO API spam in Network tab
5. Check Stats page - verify stat points display correctly
6. Check Leaderboard page on mobile - verify columns merged
7. Buy a booster - verify it appears without page refresh

### API Spam Fix Verification
Open DevTools Network tab, filter for `/active-boosters`:
- ❌ OLD: Requests every 1-5 seconds
- ✅ NEW: Only on mount, page change, after purchase

## Quick Reference: Where Polling Was Removed
Original game-backup.js had polling at:
- Line 177: `setInterval(loadActiveBoosters, 5000)` in BoosterPanel
- Line 788: `setInterval(loadActiveBoosters, 5000)` in BoostersPage
- Line 1072: `setInterval(fetchBoosters, 1000)` in FishingGame

All replaced with event-driven calls.

## File Structure
```
js/
├── api-service.js (ESM export)
├── main.js (NEW - entry point)
├── components/
│   ├── FishingGame.js (NEW - main container)
│   ├── Sidebar.js
│   ├── CustomModal.js
│   ├── GlobalNotification.js
│   ├── SavingOverlay.js
│   ├── PlaceholderPage.js
│   └── pages/
│       ├── FishingPage.js
│       ├── StatsPage.js
│       ├── LeaderboardPage.js
│       ├── OptionsPage.js
│       ├── BoostersPage.js
│       ├── EquipmentPage.js
│       ├── BiomesPage.js
│       ├── InventoryPage.js
│       ├── ProfilePage.js
│       ├── AchievementsPage.js
│       ├── FishpediaPage.js
│       └── QuestPage.js
└── utils/
    ├── icons.js
    └── themes.js
```

## Backup
Original file backed up to: `js/game-backup.js`
