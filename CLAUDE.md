# CLAUDE.md - AI Assistant Guide for Arcane Angler

**Last Updated**: 2025-12-05
**Project**: Arcane Angler - Fishing MMORPG
**Tech Stack**: React 18 (CDN) + Express.js + MySQL 2

---

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Project Architecture](#project-architecture)
3. [Development Workflows](#development-workflows)
4. [Database Schema](#database-schema)
5. [API Patterns](#api-patterns)
6. [Security & Validation](#security--validation)
7. [Frontend Patterns](#frontend-patterns)
8. [Common Operations](#common-operations)
9. [Testing Strategy](#testing-strategy)
10. [Conventions & Best Practices](#conventions--best-practices)
11. [Common Pitfalls](#common-pitfalls)

---

## Quick Reference

### Tech Stack
- **Frontend**: Vanilla JS + React 18 (CDN), Tailwind CSS
- **Backend**: Node.js + Express.js 5.2.1
- **Database**: MySQL 2 with connection pooling
- **Auth**: JWT with Bearer tokens
- **Email**: Nodemailer (verification & password reset)
- **Security**: bcryptjs, express-rate-limit, profanity filter

### Key Directories
```
/backend/
  routes/          # API endpoints (auth, player, profile, friends, leaderboard, comments)
  middleware/      # auth.js (JWT), rateLimiter.js
  services/        # email.js (Nodemailer)
  utils/           # profanityFilter.js
  server.js        # Express app entry point
  db.js            # MySQL connection pool
  database.sql     # Complete schema with triggers

/js/
  game.js          # Main React component (2,345 lines)
  api-service.js   # API client wrapper (319 lines)
  biomes.js        # Fish data (2,794 lines, 26 biomes)
  equipment.js     # Rods & bait (567 lines)
  achievements.js  # Achievement definitions (552 lines)
  game-helpers.js  # Utility functions
  constants/       # gameConstants.js (rarities, colors)
  utils/           # rarityUtils.js

/                  # Root
  index.html              # Main game page
  verify-email.html       # Email verification page
  reset-password.html     # Password reset page
```

### Environment Variables (.env)
```bash
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=arcane_angler
DB_PORT=3306

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://arcaneangler.com

# API
ALLOWED_ORIGINS=https://arcaneangler.com,http://localhost:3000
NODE_ENV=production
PORT=3000
```

---

## Project Architecture

### Overall Structure
Arcane Angler is a **full-stack fishing MMORPG** with:
- **Offline-first gameplay**: Works without internet (localStorage)
- **Cloud sync**: Auto-saves to MySQL when online
- **Social features**: Friends, leaderboards, profile comments
- **Progressive unlocking**: 26 biomes, 1000+ fish, equipment tiers

### Data Flow
```
User Action (Frontend)
    ↓
React State Update (game.js)
    ↓
localStorage Save (every 30s)
    ↓
API Call (api-service.js)
    ↓
Express Route Handler (routes/*.js)
    ↓
JWT Verification (middleware/auth.js)
    ↓
Database Query (db.js pool)
    ↓
MySQL Database (player_data, users, etc.)
    ↓
Response → Frontend State Update
```

### Authentication Flow
```
1. Registration:
   POST /api/auth/register → Create user → Send verification email

2. Email Verification:
   GET /api/auth/verify-email/:token → Mark email_verified = true

3. Login:
   POST /api/auth/login → Validate credentials → Return JWT

4. Protected Requests:
   Authorization: Bearer <JWT> → middleware/auth.js verifies → req.userId set

5. Password Reset:
   POST /api/auth/forgot-password → Send reset email
   POST /api/auth/reset-password → Validate token → Hash new password
```

---

## Development Workflows

### Adding a New API Endpoint

1. **Create route handler** in appropriate file (`backend/routes/`)
   ```javascript
   // Example: backend/routes/player.js
   router.post('/new-feature', authenticateToken, async (req, res) => {
     try {
       const userId = req.userId; // Set by authenticateToken middleware
       const { param1, param2 } = req.body;

       // Validate input
       if (!param1 || !param2) {
         return res.status(400).json({ error: 'Missing required parameters' });
       }

       // Database query
       const [result] = await db.execute(
         'UPDATE player_data SET field = ? WHERE user_id = ?',
         [param1, userId]
       );

       res.json({ success: true, data: result });
     } catch (error) {
       console.error('Error in new-feature:', error);
       res.status(500).json({ error: 'Internal server error' });
     }
   });
   ```

2. **Add to api-service.js** (frontend)
   ```javascript
   async newFeature(param1, param2) {
     const response = await fetch(`${this.baseURL}/player/new-feature`, {
       method: 'POST',
       headers: this.getHeaders(),
       body: JSON.stringify({ param1, param2 })
     });
     if (!response.ok) throw new Error('Failed to execute new feature');
     return response.json();
   }
   ```

3. **Call from game.js**
   ```javascript
   const handleNewFeature = async () => {
     try {
       const result = await apiService.newFeature(param1, param2);
       // Update state based on result
     } catch (error) {
       console.error('New feature failed:', error);
     }
   };
   ```

### Adding a Database Column

1. **Create migration SQL file** (`backend/server/migrations/add_feature.sql`)
   ```sql
   ALTER TABLE player_data ADD COLUMN new_field VARCHAR(255) DEFAULT NULL;
   ```

2. **Update database.sql** (for fresh installs)
   - Add column to appropriate CREATE TABLE statement

3. **Update route handlers** to read/write new field

4. **Update frontend state** in `game.js` to include new field

5. **Test migration** on development database before production

### Adding a New Fish/Biome

1. **Edit biomes.js** (`js/biomes.js`)
   ```javascript
   export const biomes = [
     // ... existing biomes
     {
       name: "New Biome Name",
       unlockLevel: 25,
       unlockCost: 500000,
       relicRange: [40, 60],
       Common: [
         { name: "Common Fish", xp: 100, gold: 50, description: "A common fish" },
         // ... 9 more fish
       ],
       Uncommon: [ /* 10 fish */ ],
       // ... all 9 rarity tiers
     }
   ];
   ```

2. **Test fish catch mechanics** in game to verify XP/gold values

3. **Update achievements** if new milestones needed

### Adding Friend/Social Features

1. **Database**: Check if `friends` table supports feature
2. **Backend Route**: Add to `backend/routes/friends.js`
3. **API Service**: Add method to `api-service.js`
4. **Frontend**: Update Friends tab in `game.js`
5. **Privacy**: Respect privacy settings in `backend/routes/profile.js`

---

## Database Schema

### Core Tables

#### users
**Purpose**: User accounts and authentication
**Key Fields**:
- `id` (INT, PK, AUTO_INCREMENT)
- `username` (VARCHAR 50, UNIQUE) - Login username
- `profile_username` (VARCHAR 50, UNIQUE) - Display name
- `email` (VARCHAR 255, UNIQUE)
- `password_hash` (VARCHAR 255) - bcrypt hashed
- `email_verified` (BOOLEAN, DEFAULT 0)
- `verification_token` (VARCHAR 255, UNIQUE)
- `verification_token_expires` (DATETIME)
- `reset_token` (VARCHAR 255, UNIQUE)
- `reset_token_expires` (DATETIME)
- `created_at` (TIMESTAMP)
- `last_login` (TIMESTAMP)

**Indexes**: username, email, verification_token, reset_token

#### player_data
**Purpose**: Game progression state
**Key Fields**:
- `id` (INT, PK)
- `user_id` (INT, FK → users.id, UNIQUE)
- `level` (INT, DEFAULT 1)
- `xp` (BIGINT, DEFAULT 0)
- `gold` (BIGINT, DEFAULT 100)
- `relics` (INT, DEFAULT 0)
- `current_biome` (INT, DEFAULT 1)
- `equipped_rod` (VARCHAR 100)
- `equipped_bait` (VARCHAR 100, NULL)
- `achievements` (JSON) - Array of achievement IDs
- `discovered_fish` (JSON) - Array of fish names
- `unlocked_biomes` (JSON) - Array of biome indices
- `updated_at` (TIMESTAMP)

**Important**: JSON fields must be valid JSON arrays

#### player_stats
**Purpose**: Character attributes
**Fields**: `id`, `user_id` (FK), `strength`, `intelligence`, `luck`, `stamina`

#### player_inventory
**Purpose**: Fish collection
**Fields**: `id`, `user_id`, `fish_name`, `rarity`, `count`, `base_gold`, `titan_bonus`

#### locked_fish
**Purpose**: Track all fish ever caught (for achievements)
**Fields**: `id`, `user_id`, `fish_name`, `first_caught_at`

#### leaderboard_stats
**Purpose**: Cached ranking data
**Fields**: `user_id`, `profile_username`, `level`, `total_gold`, `total_relics`, `total_fish_caught`, `legendary_fish_count`, `mythic_fish_count`

**Important**: Updated via trigger when player_data changes

#### friends
**Purpose**: Friend relationships
**Fields**: `id`, `user_id`, `friend_id`, `requester_id`, `status` (pending/accepted), `created_at`

**Key Logic**:
- Bidirectional: user_id and friend_id are symmetric once accepted
- Status: 'pending' until accepted, then 'accepted'
- Requester tracked for who initiated

#### profile_comments
**Purpose**: User-to-user comments
**Fields**: `id`, `commenter_id` (FK), `profile_user_id` (FK), `comment_text`, `created_at`

**Validation**: Max 500 chars, profanity filtered

### Database Triggers

**after_user_insert** (AFTER INSERT ON users):
```sql
-- Automatically creates matching records in:
-- player_data (with starting gold, level 1, empty JSON arrays)
-- player_stats (all stats = 1)
-- leaderboard_stats (initialized to 0s)
```

**Important**: When creating users, don't manually insert into these tables - the trigger handles it.

### Common Queries

**Get complete player state**:
```sql
SELECT
  pd.*, ps.strength, ps.intelligence, ps.luck, ps.stamina,
  u.username, u.profile_username, u.email_verified
FROM player_data pd
JOIN player_stats ps ON pd.user_id = ps.user_id
JOIN users u ON pd.user_id = u.id
WHERE pd.user_id = ?
```

**Get player inventory**:
```sql
SELECT fish_name, rarity, count, base_gold, titan_bonus
FROM player_inventory
WHERE user_id = ?
ORDER BY rarity DESC, count DESC
```

**Get friends list**:
```sql
SELECT
  u.id, u.profile_username,
  pd.level, ls.total_fish_caught
FROM friends f
JOIN users u ON (f.friend_id = u.id OR f.user_id = u.id) AND u.id != ?
JOIN player_data pd ON u.id = pd.user_id
JOIN leaderboard_stats ls ON u.id = ls.user_id
WHERE (f.user_id = ? OR f.friend_id = ?)
  AND f.status = 'accepted'
```

---

## API Patterns

### Route Structure

All routes follow this pattern:
```javascript
const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

// Public endpoint (no auth required)
router.get('/public-data', async (req, res) => {
  // ...
});

// Protected endpoint (requires JWT)
router.post('/protected-action', authenticateToken, async (req, res) => {
  const userId = req.userId; // Set by authenticateToken middleware
  // ...
});

module.exports = router;
```

### Error Handling

**Always use try-catch**:
```javascript
router.post('/action', authenticateToken, async (req, res) => {
  try {
    // Database operations
    const [result] = await db.execute('SELECT * FROM table WHERE id = ?', [id]);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in action:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Status Codes

- `200` - Success (GET, PUT, DELETE)
- `201` - Created (POST for new resources)
- `400` - Bad Request (validation errors, missing params)
- `401` - Unauthorized (invalid/missing JWT)
- `403` - Forbidden (valid JWT but insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate username/email)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error (unexpected errors)

### Rate Limiting

Applied in `backend/middleware/rateLimiter.js`:

```javascript
// Auth endpoints: 5 requests per 15 minutes
authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 })

// Password reset: 3 requests per hour
passwordResetLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 3 })

// General API: 100 requests per minute
apiLimiter = rateLimit({ windowMs: 60 * 1000, max: 100 })
```

**Usage in server.js**:
```javascript
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api', apiLimiter, playerRoutes);
```

---

## Security & Validation

### Password Requirements

**Frontend & Backend Validation**:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

**Hashing** (`backend/routes/auth.js`):
```javascript
const bcrypt = require('bcryptjs');
const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
```

**Verification**:
```javascript
const isValid = await bcrypt.compare(password, user.password_hash);
```

### JWT Tokens

**Generation** (`backend/routes/auth.js`):
```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
);
```

**Verification** (`backend/middleware/auth.js`):
```javascript
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}
```

### Profanity Filter

**Location**: `backend/utils/profanityFilter.js`

**Usage**:
```javascript
const { validateText } = require('../utils/profanityFilter');

const validation = validateText(userInput, 500); // max length 500
if (!validation.valid) {
  return res.status(400).json({ error: validation.error });
}

// Use validation.cleaned (trimmed text)
await db.execute('INSERT INTO comments (text) VALUES (?)', [validation.cleaned]);
```

**What it blocks**:
- Profanity (comprehensive word list with variations)
- URLs (http://, https://, www.)
- Email addresses
- XSS attempts (`<script>`, `javascript:`, event handlers)

**Applied to**:
- Profile bio
- Profile comments
- Profile username changes

### SQL Injection Prevention

**Always use parameterized queries**:
```javascript
// CORRECT: Parameterized query
const [rows] = await db.execute(
  'SELECT * FROM users WHERE username = ?',
  [username]
);

// WRONG: String concatenation (vulnerable to SQL injection)
const [rows] = await db.execute(
  `SELECT * FROM users WHERE username = '${username}'`
);
```

### Input Validation

**Example pattern**:
```javascript
router.post('/update-bio', authenticateToken, async (req, res) => {
  const { bio } = req.body;

  // 1. Required field check
  if (bio === undefined) {
    return res.status(400).json({ error: 'Bio is required' });
  }

  // 2. Type validation
  if (typeof bio !== 'string') {
    return res.status(400).json({ error: 'Bio must be a string' });
  }

  // 3. Profanity & length validation
  const validation = validateText(bio, 500);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  // 4. Database operation with cleaned value
  await db.execute(
    'UPDATE users SET bio = ? WHERE id = ?',
    [validation.cleaned, req.userId]
  );

  res.json({ success: true });
});
```

---

## Frontend Patterns

### React Component Structure

**Main Component** (`js/game.js`):
```javascript
const { useState, useEffect } = React;

function FishingGame() {
  // State declarations
  const [playerData, setPlayerData] = useState({ /* ... */ });
  const [currentPage, setCurrentPage] = useState('fishing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect hooks
  useEffect(() => {
    loadGameState(); // Load from localStorage on mount
  }, []);

  useEffect(() => {
    const interval = setInterval(autoSave, 30000); // Auto-save every 30s
    return () => clearInterval(interval);
  }, [playerData]);

  // Event handlers
  const handleFishing = () => { /* ... */ };
  const handleSave = async () => { /* ... */ };

  // Render
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      {isLoggedIn ? (
        <GameUI /* props */ />
      ) : (
        <AuthUI /* props */ />
      )}
    </div>
  );
}
```

### State Management

**Player Data Structure**:
```javascript
{
  level: 1,
  xp: 0,
  gold: 100,
  relics: 0,
  currentBiome: 1,
  equippedRod: "Starter Rod",
  equippedBait: null,
  stats: { strength: 1, intelligence: 1, luck: 1, stamina: 1 },
  inventory: [
    { fishName: "Guppy", rarity: "Common", count: 5, baseGold: 10, titanBonus: 0 }
  ],
  achievements: [],
  discoveredFish: [],
  unlockedBiomes: [1],
  ownedRods: ["Starter Rod"],
  baitInventory: []
}
```

### API Service Usage

**Singleton Pattern**:
```javascript
// api-service.js exports singleton instance
const apiService = new ApiService();
export default apiService;

// In game.js
import apiService from './api-service.js';

const handleLogin = async (username, password) => {
  try {
    const response = await apiService.login(username, password);
    if (response.token) {
      setIsLoggedIn(true);
      loadPlayerData(); // Fetch from server
    }
  } catch (error) {
    console.error('Login failed:', error);
    showError('Invalid credentials');
  }
};
```

### Local Storage

**Saving**:
```javascript
localStorage.setItem('fishingGameState', JSON.stringify(playerData));
localStorage.setItem('authToken', token);
```

**Loading**:
```javascript
const savedState = localStorage.getItem('fishingGameState');
if (savedState) {
  try {
    const parsed = JSON.parse(savedState);
    setPlayerData(parsed);
  } catch (error) {
    console.error('Failed to parse saved state:', error);
  }
}
```

**Clearing on logout**:
```javascript
localStorage.removeItem('fishingGameState');
localStorage.removeItem('authToken');
apiService.setToken(null);
```

### Game Logic Patterns

**Fishing Mechanics** (from `game-helpers.js`):
```javascript
import { calculateRarity } from './game-helpers.js';

const handleFishing = () => {
  // 1. Check stamina
  if (playerData.stats.stamina < 1) {
    showMessage("Not enough stamina!");
    return;
  }

  // 2. Calculate rarity based on luck
  const rarity = calculateRarity(playerData.stats.luck);

  // 3. Select random fish from current biome & rarity
  const currentBiome = biomes[playerData.currentBiome - 1];
  const fishPool = currentBiome[rarity];
  const fish = fishPool[Math.floor(Math.random() * fishPool.length)];

  // 4. Update state
  setPlayerData(prev => ({
    ...prev,
    xp: prev.xp + fish.xp,
    gold: prev.gold + fish.gold,
    stats: { ...prev.stats, stamina: prev.stats.stamina - 1 },
    inventory: addToInventory(prev.inventory, fish, rarity)
  }));
};
```

**Rarity Calculation** (`js/game-helpers.js`):
```javascript
export function calculateRarity(luck) {
  const weights = {
    Common: 50000,
    Uncommon: 28000,
    Fine: 15000,
    Rare: 5000,
    Epic: 1575,
    'Treasure Chest': 250,
    Legendary: 150,
    Mythic: 25,
    Exotic: 4,
    Arcane: 1
  };

  // Apply luck multiplier to rare+ tiers
  const adjustedWeights = { ...weights };
  if (luck > 1) {
    adjustedWeights.Rare *= (1 + (luck - 1) * 0.05);
    adjustedWeights.Epic *= (1 + (luck - 1) * 0.08);
    // ... etc
  }

  // Weighted random selection
  const totalWeight = Object.values(adjustedWeights).reduce((a, b) => a + b);
  let random = Math.random() * totalWeight;

  for (const [rarity, weight] of Object.entries(adjustedWeights)) {
    random -= weight;
    if (random <= 0) return rarity;
  }

  return 'Common'; // Fallback
}
```

---

## Common Operations

### Adding a New Achievement

1. **Define in achievements.js**:
   ```javascript
   export const achievements = [
     // ... existing
     {
       id: 'catch_1000_fish',
       name: 'Master Angler',
       description: 'Catch 1,000 fish',
       icon: '🎣',
       category: 'fishing',
       requirement: { type: 'total_fish', count: 1000 }
     }
   ];
   ```

2. **Add check logic in game.js**:
   ```javascript
   const checkAchievements = (playerData) => {
     const totalFish = playerData.inventory.reduce((sum, item) => sum + item.count, 0);

     if (totalFish >= 1000 && !playerData.achievements.includes('catch_1000_fish')) {
       unlockAchievement('catch_1000_fish');
     }
   };
   ```

3. **Update database** (if server-side tracking needed):
   ```javascript
   // In backend/routes/player.js
   await db.execute(
     'INSERT INTO achievements (user_id, achievement_type, achievement_data) VALUES (?, ?, ?)',
     [userId, 'catch_1000_fish', JSON.stringify({ earned_at: new Date() })]
   );
   ```

### Adding a Privacy Setting

1. **Database** (if not exists):
   ```sql
   ALTER TABLE users ADD COLUMN new_privacy_setting VARCHAR(20) DEFAULT 'public';
   ```

2. **Backend route** (`backend/routes/profile.js`):
   ```javascript
   router.post('/privacy/new-setting', authenticateToken, async (req, res) => {
     const { value } = req.body;
     const validValues = ['public', 'friends', 'private'];

     if (!validValues.includes(value)) {
       return res.status(400).json({ error: 'Invalid privacy value' });
     }

     await db.execute(
       'UPDATE users SET new_privacy_setting = ? WHERE id = ?',
       [value, req.userId]
     );

     res.json({ success: true });
   });
   ```

3. **Apply in profile routes**:
   ```javascript
   // Check privacy before showing data
   const [user] = await db.execute('SELECT new_privacy_setting FROM users WHERE id = ?', [profileUserId]);

   if (user.new_privacy_setting === 'private' && profileUserId !== req.userId) {
     return res.status(403).json({ error: 'Profile is private' });
   }
   ```

### Modifying Game Balance

**Adjusting fish gold values**:
1. Edit `js/biomes.js` - change `gold` property
2. Test in-game to verify economy impact
3. Consider updating existing player gold if retroactive change needed

**Adjusting equipment stats**:
1. Edit `js/equipment.js` - modify `stats` object
2. Clear localStorage in browser to test fresh equip
3. Changes apply immediately (no database migration needed)

**Adjusting rarity weights**:
1. Edit `js/game-helpers.js` - modify `weights` object in `calculateRarity()`
2. Test by setting high luck value temporarily
3. Consider player feedback before changing legendary+ rates

### Adding Email Notifications

1. **Create email template** in `backend/services/email.js`:
   ```javascript
   async sendNewFeatureEmail(userEmail, userName, data) {
     const mailOptions = {
       from: process.env.EMAIL_USER,
       to: userEmail,
       subject: 'New Feature Notification',
       html: `
         <h1>Hello ${userName}!</h1>
         <p>We wanted to let you know about ${data}.</p>
       `
     };

     return this.transporter.sendMail(mailOptions);
   }
   ```

2. **Call in appropriate route**:
   ```javascript
   const emailService = require('../services/email');

   // After some action
   try {
     await emailService.sendNewFeatureEmail(user.email, user.username, data);
   } catch (error) {
     console.error('Email failed (non-critical):', error);
     // Don't fail the request if email fails
   }
   ```

---

## Testing Strategy

### Current State
- **No automated tests** currently exist
- **Manual testing** is primary QA method

### Recommended Testing Structure

#### Backend Unit Tests (Jest)
```javascript
// Example: backend/__tests__/routes/auth.test.js
const request = require('supertest');
const app = require('../server');
const db = require('../db');

describe('Auth Routes', () => {
  beforeAll(async () => {
    // Setup test database
  });

  afterAll(async () => {
    // Cleanup
    await db.end();
  });

  test('POST /api/auth/register - valid user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Test1234'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/auth/register - duplicate username', async () => {
    // ... test duplicate registration
  });
});
```

#### Frontend Testing (React Testing Library)
```javascript
// Example: js/__tests__/game.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import FishingGame from '../game';

test('fishing button decreases stamina', () => {
  render(<FishingGame />);

  const fishButton = screen.getByText('Cast Line');
  const initialStamina = screen.getByText(/Stamina:/);

  fireEvent.click(fishButton);

  const updatedStamina = screen.getByText(/Stamina:/);
  expect(updatedStamina).not.toBe(initialStamina);
});
```

### Manual Testing Checklist

**When adding features**:
- [ ] Test authenticated and unauthenticated states
- [ ] Test with empty/null/invalid inputs
- [ ] Test rate limiting (if applicable)
- [ ] Test privacy settings impact
- [ ] Test on both online and offline modes
- [ ] Verify database changes persist correctly
- [ ] Check browser console for errors
- [ ] Test localStorage save/load

**Security Testing**:
- [ ] Attempt SQL injection in input fields
- [ ] Try XSS in profile bio/comments
- [ ] Verify JWT expiration works
- [ ] Test rate limiter prevents abuse
- [ ] Ensure password requirements enforced
- [ ] Verify profanity filter catches bad words

---

## Conventions & Best Practices

### Code Style

**JavaScript**:
- Use `const` by default, `let` when reassignment needed
- Prefer async/await over Promise chains
- Use destructuring: `const { username, email } = req.body;`
- Use template literals: `` `Hello ${name}` ``
- 2-space indentation

**SQL**:
- Use parameterized queries exclusively
- Table names: lowercase with underscores (`player_data`)
- Column names: lowercase with underscores (`email_verified`)
- Always specify column names in INSERT statements

**React**:
- Functional components only (no class components)
- Hooks at top of component
- Destructure useState: `const [value, setValue] = useState(initial)`
- Use meaningful event handler names: `handleLogin`, `handleFishing`

### Naming Conventions

**Variables**:
- `camelCase` for variables and functions
- `PascalCase` for React components
- `SCREAMING_SNAKE_CASE` for constants

**Database**:
- `snake_case` for tables and columns
- Singular table names for single-entity tables (`users`, not `user`)
- Foreign keys: `<table>_id` (e.g., `user_id`)

**Files**:
- `kebab-case.js` for JavaScript files
- `PascalCase.jsx` for React components (if using JSX files)
- Descriptive names: `api-service.js`, `profanityFilter.js`

### Git Commit Messages

**Format**:
```
<type>: <subject>

<body (optional)>
```

**Types**:
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code restructuring
- `docs:` Documentation changes
- `style:` Formatting, no code change
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples**:
```
feat: Add nationality field to user profiles

fix: Prevent duplicate friend requests

refactor: Extract rarity calculation to helper function

docs: Update CLAUDE.md with testing guidelines
```

### File Organization

**Backend routes**: Group by domain (auth, player, profile, friends, leaderboard, comments)

**Frontend**: Separate data (biomes.js, equipment.js) from logic (game.js, game-helpers.js)

**Utilities**: Extract reusable functions (rarityUtils.js, profanityFilter.js)

**Keep files focused**: If file exceeds 1000 lines, consider splitting

### Error Messages

**User-facing** (frontend):
- Clear, actionable: "Password must be at least 8 characters"
- Avoid technical jargon: "Failed to save" not "Database write exception"

**Developer-facing** (backend logs):
- Include context: `console.error('Failed to update profile:', error)`
- Log request details when helpful: `console.log('User ID:', userId)`

**Security-sensitive**:
- Don't leak information: "Invalid credentials" not "Password incorrect"
- Don't expose database errors to client

---

## Common Pitfalls

### 1. Forgetting JWT Middleware

**Problem**:
```javascript
router.post('/save', async (req, res) => {
  // No authenticateToken middleware!
  const userId = req.body.userId; // Trusting client input
});
```

**Solution**:
```javascript
router.post('/save', authenticateToken, async (req, res) => {
  const userId = req.userId; // Set by middleware
});
```

### 2. SQL Injection Vulnerability

**Problem**:
```javascript
await db.execute(`SELECT * FROM users WHERE username = '${username}'`);
```

**Solution**:
```javascript
await db.execute('SELECT * FROM users WHERE username = ?', [username]);
```

### 3. Not Validating User Input

**Problem**:
```javascript
router.post('/update-bio', authenticateToken, async (req, res) => {
  const { bio } = req.body;
  await db.execute('UPDATE users SET bio = ? WHERE id = ?', [bio, req.userId]);
});
```

**Solution**:
```javascript
const { validateText } = require('../utils/profanityFilter');

router.post('/update-bio', authenticateToken, async (req, res) => {
  const { bio } = req.body;

  const validation = validateText(bio, 500);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  await db.execute('UPDATE users SET bio = ? WHERE id = ?', [validation.cleaned, req.userId]);
});
```

### 4. Exposing Sensitive Data

**Problem**:
```javascript
const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
res.json(user); // Sends password_hash, email, tokens to client!
```

**Solution**:
```javascript
const [user] = await db.execute(
  'SELECT id, username, profile_username, email_verified FROM users WHERE id = ?',
  [userId]
);
res.json(user);
```

### 5. JSON.parse Errors on Empty/Invalid Data

**Problem**:
```javascript
const achievements = JSON.parse(playerData.achievements); // Crashes if null or invalid
```

**Solution**:
```javascript
let achievements = [];
try {
  achievements = playerData.achievements ? JSON.parse(playerData.achievements) : [];
} catch (error) {
  console.error('Failed to parse achievements:', error);
  achievements = [];
}
```

### 6. Not Handling Database Errors

**Problem**:
```javascript
router.post('/action', authenticateToken, async (req, res) => {
  const [result] = await db.execute('UPDATE ...'); // Unhandled promise rejection
  res.json({ success: true });
});
```

**Solution**:
```javascript
router.post('/action', authenticateToken, async (req, res) => {
  try {
    const [result] = await db.execute('UPDATE ...');
    res.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### 7. Race Conditions in State Updates

**Problem**:
```javascript
// Multiple rapid clicks can cause incorrect state
const handleFishing = () => {
  setPlayerData({
    ...playerData,
    gold: playerData.gold + 100 // Uses stale value
  });
};
```

**Solution**:
```javascript
const handleFishing = () => {
  setPlayerData(prev => ({
    ...prev,
    gold: prev.gold + 100 // Uses latest value
  }));
};
```

### 8. Forgetting to Check Privacy Settings

**Problem**:
```javascript
router.get('/profile/:userId', authenticateToken, async (req, res) => {
  const [profile] = await db.execute('SELECT * FROM users WHERE id = ?', [req.params.userId]);
  res.json(profile); // Ignores privacy settings!
});
```

**Solution**:
```javascript
router.get('/profile/:userId', authenticateToken, async (req, res) => {
  const [profile] = await db.execute('SELECT * FROM users WHERE id = ?', [req.params.userId]);

  if (profile.privacy === 'private' && profile.id !== req.userId) {
    return res.status(403).json({ error: 'Profile is private' });
  }

  res.json(profile);
});
```

### 9. Memory Leaks with setInterval

**Problem**:
```javascript
useEffect(() => {
  setInterval(autoSave, 30000); // No cleanup!
}, []);
```

**Solution**:
```javascript
useEffect(() => {
  const interval = setInterval(autoSave, 30000);
  return () => clearInterval(interval); // Cleanup on unmount
}, []);
```

### 10. Not Handling Offline Mode

**Problem**:
```javascript
const handleSave = async () => {
  await apiService.savePlayerData(playerData); // Fails with no internet
};
```

**Solution**:
```javascript
const handleSave = async () => {
  try {
    await apiService.savePlayerData(playerData);
    showMessage('Saved to cloud!');
  } catch (error) {
    console.error('Cloud save failed:', error);
    // Still saved to localStorage
    showMessage('Saved locally (offline)');
  }
};
```

---

## Quick Debugging Tips

### Backend Issues

**Database connection errors**:
```bash
# Check .env file has correct credentials
cat backend/.env | grep DB_

# Test MySQL connection
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME
```

**JWT token issues**:
- Verify `JWT_SECRET` is set in `.env`
- Check token expiration with https://jwt.io
- Ensure `Authorization: Bearer <token>` header format

**Rate limit debugging**:
- Clear rate limit: restart server (in-memory rate limiter resets)
- Or implement Redis-based rate limiter for persistence

### Frontend Issues

**React errors**:
- Check browser console for stack traces
- Verify all `useState` hooks at top of component
- Ensure JSX is valid (closing tags, className not class)

**API errors**:
- Check Network tab in DevTools
- Verify token in localStorage: `localStorage.getItem('authToken')`
- Check API base URL matches backend: `https://arcaneangler.com/api`

**State not updating**:
- Verify using functional setState: `setData(prev => ({ ...prev, key: value }))`
- Check useEffect dependencies array

### Database Issues

**Missing columns**:
```sql
-- Check table structure
DESCRIBE player_data;

-- Add missing column
ALTER TABLE player_data ADD COLUMN new_field VARCHAR(255);
```

**Orphaned records**:
```sql
-- Find player_data without user
SELECT pd.* FROM player_data pd
LEFT JOIN users u ON pd.user_id = u.id
WHERE u.id IS NULL;
```

**Reset test user**:
```sql
DELETE FROM users WHERE email = 'test@example.com';
-- Trigger will cascade delete related records
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Set `NODE_ENV=production` in backend `.env`
- [ ] Update `ALLOWED_ORIGINS` to include production domain
- [ ] Configure email service (EMAIL_* variables)
- [ ] Generate strong `JWT_SECRET` (32+ random characters)
- [ ] Run database migrations if any
- [ ] Test all major user flows manually
- [ ] Check browser console for errors
- [ ] Verify rate limiters work as expected

### Backend Deployment

- [ ] Install dependencies: `cd backend && npm install`
- [ ] Start server: `node server.js` or use PM2
- [ ] Verify health check: `curl https://api.arcaneangler.com/health`
- [ ] Check logs for errors: `tail -f logs/error.log` (if configured)

### Frontend Deployment

- [ ] Update `api-service.js` baseURL to production API
- [ ] Test CORS headers allow frontend domain
- [ ] Upload HTML/JS files to static host
- [ ] Clear CDN cache if using Cloudflare/CloudFront
- [ ] Test in incognito/private browser (fresh state)

### Post-Deployment

- [ ] Monitor error logs for 24 hours
- [ ] Check leaderboards populate correctly
- [ ] Verify email verification sends emails
- [ ] Test friend requests work
- [ ] Ensure auto-save triggers every 30 seconds

---

## Resources & Documentation

### External Docs
- **Express.js**: https://expressjs.com/
- **React 18**: https://react.dev/
- **MySQL 2 (npm)**: https://github.com/sidorares/node-mysql2
- **JWT**: https://jwt.io/introduction
- **Tailwind CSS**: https://tailwindcss.com/docs

### Internal Docs
- **Beginner Setup**: `backend/BEGINNERS_GUIDE.md`
- **Quick Start**: `backend/START_HERE.md`
- **Database Schema**: `backend/database.sql`

### Key Files to Reference
- **API Client**: `js/api-service.js` - All API methods
- **Game Constants**: `js/constants/gameConstants.js` - Rarities, colors
- **Profanity Filter**: `backend/utils/profanityFilter.js` - Content moderation
- **Auth Middleware**: `backend/middleware/auth.js` - JWT verification

---

## Contact & Support

**Repository Issues**: Report bugs and feature requests via GitHub issues

**Development Questions**:
- Check existing code patterns first
- Search this CLAUDE.md for relevant sections
- Review similar features in codebase

**Security Issues**: Report privately (don't file public issues for vulnerabilities)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-05 | Initial comprehensive documentation |

---

**Happy Coding!** 🎣

Remember: When in doubt, follow existing patterns in the codebase. Consistency is key for maintainability.
