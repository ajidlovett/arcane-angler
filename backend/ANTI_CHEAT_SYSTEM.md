# Anti-Cheat System Documentation

## Overview

The anti-cheat system protects Arcane Angler from two primary forms of abuse:
1. **Autoclickers** - Automated clicking tools that provide an unfair advantage
2. **Multi-session abuse** - Players casting from multiple browser tabs or devices simultaneously

## How It Works

### Detection Methods

#### 1. Autoclicker Detection
The system tracks the timing patterns of cast actions to identify inhuman behavior:

- **Pattern Analysis**: Tracks the last 20 cast intervals
- **Too Fast Detection**: Flags if 5+ casts occur faster than 50ms (below human reaction time)
- **Consistency Detection**: Calculates standard deviation of cast timings. If variance is < 30ms across 10 casts, it's flagged as suspicious (humans have natural variance, autoclickers don't)

**Configuration** (in `backend/utils/antiCheat.js`):
```javascript
MIN_CAST_INTERVAL: 50,      // Minimum human reaction time (ms)
MAX_CONSISTENT_CASTS: 10,   // Number of casts to analyze
CONSISTENCY_THRESHOLD: 30   // Max variance (ms) for "too consistent"
```

#### 2. Multi-Session Detection
Detects concurrent casts from multiple tabs/devices:

- **Window Check**: If two casts from the same user occur within 2 seconds, it's flagged
- **Normal Gameplay**: Client has 6-second cooldown, so legitimate casts are always > 2s apart
- **Multi-tab Abuse**: Opening multiple tabs bypasses client-side cooldown

**Configuration**:
```javascript
MULTI_SESSION_WINDOW: 2000  // 2 seconds in milliseconds
```

### Punishment System

When a player is flagged for cheating:

**Punishment Duration**: 10 minutes (configurable)

**Punishment Effects**:
- ❌ **0 XP gained** (no progression)
- 🐟 **1 common fish only** (minimal reward)
- ⏰ **Lasts 10 minutes** from last violation
- 🔄 **Extends on repeat violations** (doesn't stack, but resets timer)

**What Still Works**:
- ✅ Fish are added to inventory (to avoid suspicion)
- ✅ Cast counter increments
- ✅ Fishpedia updates
- ✅ Normal UI behavior

**What's Blocked**:
- ❌ XP progression
- ❌ Rare fish catches (always Common)
- ❌ Level ups
- ❌ Meaningful rewards

## Database Schema

### Table: `anti_cheat_flags`
Tracks all flagged users and active punishments.

```sql
CREATE TABLE anti_cheat_flags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    flagged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    reason VARCHAR(100) NOT NULL,  -- 'autoclicker' or 'multi_session'
    is_active BOOLEAN DEFAULT TRUE,
    cast_count INT DEFAULT 1,      -- Increments on repeat violations
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### player_data Additions
Added columns for timing tracking:

```sql
ALTER TABLE player_data ADD COLUMN
    last_cast_time BIGINT DEFAULT NULL,
    recent_cast_timings JSON DEFAULT NULL;
```

- `last_cast_time`: Timestamp (ms) of most recent cast
- `recent_cast_timings`: Array of last 20 intervals between casts

## API Endpoints

### POST /api/game/cast
**Modified**: Now includes anti-cheat checks before processing catch.

**Response** (when punished):
```json
{
  "success": true,
  "result": {
    "rarity": "Common",
    "fish": { "name": "Guppy", "desc": "..." },
    "count": 1,
    "xpGained": 0,
    "isPunished": true,
    "punishmentReason": "autoclicker",
    "punishmentExpiresAt": "2025-12-18T12:00:00.000Z"
  }
}
```

### POST /api/game/auto-cast
**Modified**: Same anti-cheat logic as `/cast`.

### GET /api/game/anti-cheat-status
**New**: Check if user has active punishment.

**Request**: Requires authentication

**Response**:
```json
{
  "isPunished": true,
  "reason": "multi_session",
  "expiresAt": "2025-12-18T12:00:00.000Z",
  "remainingTime": 420000,
  "castCount": 3
}
```

**Or when not punished**:
```json
{
  "isPunished": false,
  "reason": null,
  "expiresAt": null,
  "remainingTime": null
}
```

## Implementation Details

### Flow Diagram

```
User casts fishing line
    ↓
Load player data (with timing history)
    ↓
checkForCheating(userId, playerData, connection)
    ↓
┌─────────────────────────────────────┐
│ 1. Calculate interval since last cast │
│ 2. Check multi-session (< 2s?)       │
│ 3. Add interval to timing history    │
│ 4. Detect autoclicker patterns       │
│ 5. Flag user if violation detected   │
│ 6. Update last_cast_time              │
└─────────────────────────────────────┘
    ↓
If flagged → applyPunishment()
    ↓
Return result (punished or normal)
```

### Code Integration

**backend/utils/antiCheat.js**: Core detection logic
- `checkForCheating()` - Main entry point
- `detectAutoclicker()` - Pattern analysis
- `detectMultiSession()` - Concurrent cast detection
- `applyPunishment()` - Override rewards
- `checkActivePunishment()` - Check existing flags

**backend/routes/game.js**: Integrated into cast endpoints
```javascript
// After loading player data
const cheatCheck = await checkForCheating(userId, player, connection);
const isPunished = cheatCheck.isViolation;

// Later, when calculating rewards
if (isPunished) {
  result = applyPunishment(biomeData, cheatCheck.activeFlag);
  // ... save punished result
}
```

## Monitoring & Logging

All anti-cheat events are logged to console:

```javascript
console.log('[ANTI-CHEAT] Autoclicker detected: Too consistent timing', {
  mean: 150.25,
  stdDev: 12.5,
  timings: [145, 152, 148, ...]
});

console.log('[ANTI-CHEAT] Multi-session detected:', {
  userId: 123,
  timeSinceLastCast: 1200,
  threshold: 2000
});

console.log('[ANTI-CHEAT] Flagged user:', {
  userId: 123,
  reason: 'autoclicker',
  expiresAt: '2025-12-18T12:00:00.000Z'
});
```

**Recommended**: Set up log aggregation to track:
- Number of users flagged per day
- Most common violation types
- Repeat offenders
- False positive rate (if any)

## Frontend Integration

### Recommended UI Changes

1. **Warning Toast** - Show when user is flagged:
   ```javascript
   if (castResult.isPunished) {
     showWarning(
       `Anti-cheat active: ${formatReason(castResult.punishmentReason)}.
        XP disabled for ${formatTime(castResult.punishmentExpiresAt)}.`
     );
   }
   ```

2. **Status Indicator** - Poll `/anti-cheat-status` every 30s:
   ```javascript
   const checkAntiCheatStatus = async () => {
     const status = await fetch('/api/game/anti-cheat-status');
     if (status.isPunished) {
       showWarningBanner(status);
     }
   };
   ```

3. **Reason Messages**:
   - `autoclicker`: "Suspicious clicking pattern detected"
   - `multi_session`: "Multiple sessions detected"

### Example Frontend Code

```javascript
// In your fishing cast handler
const handleCast = async () => {
  const result = await apiService.cast();

  if (result.isPunished) {
    // Show warning to user
    toast.error(
      `Anti-cheat protection active. You're receiving reduced rewards.
       This will expire in ${formatDuration(result.remainingTime)}.`
    );

    // Maybe show a modal explaining what happened
    if (result.punishmentReason === 'autoclicker') {
      showModal('Autoclicker detected. Please cast manually.');
    } else if (result.punishmentReason === 'multi_session') {
      showModal('Multiple game sessions detected. Please close other tabs.');
    }
  }

  // Process result normally (fish still added to inventory)
  updateInventory(result);
};
```

## Configuration & Tuning

### Adjusting Detection Sensitivity

Edit `backend/utils/antiCheat.js` CONFIG:

**More Lenient** (fewer false positives):
```javascript
MIN_CAST_INTERVAL: 30,        // Lower threshold
MAX_CONSISTENT_CASTS: 15,     // Require more samples
CONSISTENCY_THRESHOLD: 50,    // Allow more variance
MULTI_SESSION_WINDOW: 1000    // Shorter window
```

**More Strict** (catch more cheaters):
```javascript
MIN_CAST_INTERVAL: 100,       // Higher threshold
MAX_CONSISTENT_CASTS: 5,      // Fewer samples needed
CONSISTENCY_THRESHOLD: 20,    // Less variance allowed
MULTI_SESSION_WINDOW: 3000    // Longer window
```

**Punishment Duration**:
```javascript
PUNISHMENT_DURATION: 5 * 60 * 1000,  // 5 minutes
// or
PUNISHMENT_DURATION: 30 * 60 * 1000, // 30 minutes
```

## Maintenance

### Cleanup Expired Flags

Run periodically (e.g., daily cron job):
```javascript
import { cleanupExpiredFlags } from './backend/utils/antiCheat.js';

// Deactivate expired flags
const cleaned = await cleanupExpiredFlags();
console.log(`Cleaned ${cleaned} expired flags`);
```

### Database Maintenance

```sql
-- Delete old inactive flags (older than 30 days)
DELETE FROM anti_cheat_flags
WHERE is_active = FALSE
  AND expires_at < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Find repeat offenders
SELECT user_id, COUNT(*) as violation_count, MAX(expires_at) as latest
FROM anti_cheat_flags
WHERE flagged_at > DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY user_id
HAVING violation_count > 5
ORDER BY violation_count DESC;
```

## Migration

To enable the anti-cheat system on an existing database:

```bash
mysql -u root -p arcane_angler < backend/migrations/add_anti_cheat_system.sql
```

Or run manually:
```sql
-- Create anti_cheat_flags table
CREATE TABLE IF NOT EXISTS anti_cheat_flags ( ... );

-- Add timing columns to player_data
ALTER TABLE player_data
  ADD COLUMN last_cast_time BIGINT DEFAULT NULL,
  ADD COLUMN recent_cast_timings JSON DEFAULT NULL;

-- Create index
CREATE INDEX idx_last_cast_time ON player_data(user_id, last_cast_time);
```

## Testing

### Manual Testing

1. **Test Autoclicker Detection**:
   - Use an autoclicker tool set to 100ms intervals
   - Cast 15-20 times
   - Should get flagged and receive 0 XP

2. **Test Multi-Session Detection**:
   - Open game in 2 browser tabs
   - Cast simultaneously in both
   - Should get flagged

3. **Test Normal Play**:
   - Cast normally with varying intervals
   - Should NOT get flagged

### Automated Testing

```javascript
// Example test case
describe('Anti-Cheat System', () => {
  it('should flag autoclicker patterns', async () => {
    // Simulate 10 casts with 150ms intervals (too consistent)
    const timings = Array(10).fill(150);
    const isAutoclicker = detectAutoclicker(timings);
    expect(isAutoclicker).toBe(true);
  });

  it('should not flag normal human patterns', async () => {
    // Simulate human casts with natural variance
    const timings = [6200, 6500, 7100, 6800, 8200, 6300];
    const isAutoclicker = detectAutoclicker(timings);
    expect(isAutoclicker).toBe(false);
  });
});
```

## FAQ

**Q: Will this affect legitimate players?**
A: No. The thresholds are set to only catch clearly automated or multi-session behavior. Normal human clicking has natural variance that won't trigger detection.

**Q: What if someone is flagged incorrectly?**
A: The punishment auto-expires after 10 minutes. If false positives occur, adjust the CONFIG thresholds to be more lenient.

**Q: Can players see they're flagged?**
A: Yes, the response includes `isPunished: true` and punishment details. Frontend should display a warning message.

**Q: Does this stop cheating completely?**
A: No anti-cheat is perfect, but this prevents the most common forms of abuse (autoclickers and multi-tabbing). More sophisticated cheaters may bypass this, but they represent a much smaller threat.

**Q: How do I monitor for false positives?**
A: Check the console logs for flagged users and manually review their play patterns. Look for `cast_count > 1` in the flags table to find repeat offenders (less likely to be false positives).

**Q: Can I manually flag/unflag users?**
A: Yes, you can manually update the database:
```sql
-- Manually flag a user
INSERT INTO anti_cheat_flags (user_id, expires_at, reason, is_active, cast_count)
VALUES (123, DATE_ADD(NOW(), INTERVAL 10 MINUTE), 'manual_review', TRUE, 1);

-- Unflag a user (forgive)
UPDATE anti_cheat_flags
SET is_active = FALSE, expires_at = NOW()
WHERE user_id = 123 AND is_active = TRUE;
```

## Future Improvements

Potential enhancements:
1. **IP Tracking** - Detect multiple accounts from same IP
2. **Device Fingerprinting** - Track unique devices
3. **Behavioral Analysis** - ML-based anomaly detection
4. **Graduated Punishments** - Harsher penalties for repeat offenders
5. **Admin Dashboard** - View flagged users and statistics
6. **Appeal System** - Allow users to contest flags

## Support

For issues or questions:
- Check logs in console for detailed detection info
- Review database `anti_cheat_flags` table for history
- Adjust CONFIG thresholds if needed
- Monitor false positive rate over time

---

**Last Updated**: 2025-12-18
**System Version**: 1.0
**Status**: Active
