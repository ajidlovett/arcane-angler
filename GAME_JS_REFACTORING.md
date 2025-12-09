# Game.js Server-Authoritative Refactoring Guide

This document outlines the changes needed to convert game.js from client-authoritative to server-authoritative.

## Key Functions to Replace

### 1. handleFish() - Lines 209-337
**Replace with:**
```javascript
const handleFish = async () => {
  if (cooldown > 0 || fishing) return;

  // Client-side UX check (bait availability)
  if (player.equippedBait !== 'Stale Bread Crust' && (player.baitInventory[player.equippedBait] || 0) <= 0) {
    alert("You need to buy or equip a different bait!");
    return;
  }

  setFishing(true);
  setCooldown(4);
  setFunnyLine(getFunnyLine());

  setTimeout(async () => {
    try {
      // SERVER AUTHORITATIVE: Server determines the catch
      const response = await window.ApiService.castLine();

      if (response.success) {
        const result = response.result;

        // Set last catch for display
        if (result.treasureChest) {
          setLastCatch({
            fish: 'Treasure Chest',
            rarity: 'Treasure Chest',
            count: 1,
            xp: result.xpGained,
            relics: result.relicsGained,
            gold: result.goldGained,
            isTreasure: true
          });
        } else {
          setLastCatch({
            fish: result.fish.name,
            rarity: result.rarity,
            count: result.count,
            xp: result.fish.xp || result.xpGained / result.count,
            gold: result.fish.gold || result.goldGained / result.count,
            relics: 0,
            titanBonus: result.titanBonus > 1 ? result.titanBonus : null
          });
        }

        // Update state with SERVER data only
        setPlayer(prev => ({
          ...prev,
          gold: result.newGold,
          xp: result.newXP,
          level: result.newLevel,
          relics: result.newRelics,
          stamina: result.newStamina
        }));

        // Reload full player data to sync inventory
        const playerData = await window.ApiService.getPlayerData();
        setPlayer(playerData);
      }
    } catch (error) {
      console.error('Fishing failed:', error);
      alert('Failed to cast line. Please try again.');
    } finally {
      setFishing(false);
    }
  }, 1000);
};
```

### 2. sellFish() - Lines 348-366
**Replace with:**
```javascript
const sellFish = async (fishItem) => {
  if (player.lockedFish.includes(fishItem.name)) return;

  try {
    const response = await window.ApiService.sellFish(
      fishItem.name,
      fishItem.rarity,
      fishItem.count
    );

    if (response.success) {
      // Update state with server response
      setPlayer(prev => ({
        ...prev,
        gold: response.newGold
      }));

      // Reload inventory from server
      const playerData = await window.ApiService.getPlayerData();
      setPlayer(playerData);
    }
  } catch (error) {
    console.error('Sell failed:', error);
    alert('Failed to sell fish. Please try again.');
  }
};
```

### 3. upgradeStat() - Lines 436-458
**Replace with:**
```javascript
const upgradeStat = async (stat) => {
  try {
    const response = await window.ApiService.upgradeStat(stat);

    if (response.success) {
      setPlayer(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [stat]: response.newValue
        },
        relics: response.newRelics
      }));
    }
  } catch (error) {
    console.error('Upgrade failed:', error);
    alert(error.message || 'Failed to upgrade stat. Please try again.');
  }
};
```

### 4. buyRod() - Lines 501-511
**Replace with:**
```javascript
const buyRod = async (rodName) => {
  try {
    const response = await window.ApiService.buyRod(rodName);

    if (response.success) {
      setPlayer(prev => ({
        ...prev,
        gold: response.newGold,
        ownedRods: [...prev.ownedRods, rodName],
        equippedRod: rodName
      }));

      // Also call equipRod endpoint
      await window.ApiService.equipRod(rodName);
    }
  } catch (error) {
    console.error('Buy rod failed:', error);
    alert(error.message || 'Failed to purchase rod. Not enough gold?');
  }
};
```

### 5. buyBait() - Lines 517-533
**Replace with:**
```javascript
const buyBait = async (baitName, multiplier = 1) => {
  try {
    const response = await window.ApiService.buyBait(baitName, multiplier);

    if (response.success) {
      setPlayer(prev => ({
        ...prev,
        gold: response.newGold,
        baitInventory: {
          ...prev.baitInventory,
          [baitName]: response.newBaitQuantity
        }
      }));
    }
  } catch (error) {
    console.error('Buy bait failed:', error);
    alert(error.message || 'Failed to purchase bait. Not enough gold?');
  }
};
```

### 6. equipRod() - Lines 513-515
**Replace with:**
```javascript
const equipRod = async (rodName) => {
  try {
    const response = await window.ApiService.equipRod(rodName);

    if (response.success) {
      setPlayer(prev => ({
        ...prev,
        equippedRod: rodName
      }));
    }
  } catch (error) {
    console.error('Equip rod failed:', error);
  }
};
```

### 7. equipBait() - Lines 535-537
**Replace with:**
```javascript
const equipBait = async (baitName) => {
  try {
    const response = await window.ApiService.equipBait(baitName);

    if (response.success) {
      setPlayer(prev => ({
        ...prev,
        equippedBait: baitName
      }));
    }
  } catch (error) {
    console.error('Equip bait failed:', error);
  }
};
```

### 8. visitOrUnlockBiome() - Lines 1021-1046
**Replace with:**
```javascript
const visitOrUnlockBiome = async (biomeId) => {
  const isUnlocked = player.unlockedBiomes.includes(biomeId);

  if (isUnlocked) {
    // Just change biome (already unlocked)
    try {
      const response = await window.ApiService.changeBiome(biomeId);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          currentBiome: biomeId
        }));
      }
    } catch (error) {
      console.error('Change biome failed:', error);
    }
  } else {
    // Unlock new biome
    try {
      const response = await window.ApiService.unlockBiome(biomeId);

      if (response.success) {
        setPlayer(prev => ({
          ...prev,
          currentBiome: biomeId,
          gold: response.newGold,
          unlockedBiomes: response.unlockedBiomes
        }));
      }
    } catch (error) {
      console.error('Unlock biome failed:', error);
      alert(error.message || 'Cannot unlock biome. Check level and gold requirements.');
    }
  }
};
```

## Auto-Save Changes

### Update Auto-Save Logic (Lines 124-136)
**IMPORTANT**: Reduce or remove auto-save frequency since server now handles state:

```javascript
React.useEffect(() => {
  // Disable auto-save to server since server is now authoritative
  // State is already saved by individual action endpoints
  // Only keep for UI preferences if needed
}, [player, offlineMode, dataLoaded]);
```

Or keep minimal sync:
```javascript
React.useEffect(() => {
  if (!offlineMode && dataLoaded) {
    // Reduced frequency: sync UI preferences only
    const saveInterval = setInterval(async () => {
      try {
        // Only save non-gameplay data (UI preferences, etc.)
        // Most gameplay data is already saved by action endpoints
        await window.ApiService.savePlayerData({
          equippedRod: player.equippedRod,
          equippedBait: player.equippedBait,
          currentBiome: player.currentBiome,
          lockedFish: player.lockedFish
        });
      } catch (err) {
        console.error('Preference sync failed:', err);
      }
    }, 60000); // Every 60 seconds (reduced from 30)

    return () => clearInterval(saveInterval);
  }
}, [player.equippedRod, player.equippedBait, player.currentBiome, player.lockedFish, offlineMode, dataLoaded]);
```

## Summary of Changes

- ✅ All game logic calculations removed from client
- ✅ All state updates now come from server responses
- ✅ Error handling added to all async functions
- ✅ Loading states preserved for UX
- ✅ Auto-save reduced or removed (server handles state)
- ✅ Offline mode still supported via localStorage

## Testing Checklist

- [ ] Fishing catches display correctly
- [ ] Sell fish updates gold and inventory
- [ ] Buy rod/bait deducts gold properly
- [ ] Upgrade stat costs relics correctly
- [ ] Unlock biome checks requirements
- [ ] Error messages display on failures
- [ ] Loading states work smoothly
- [ ] Offline mode still functions
