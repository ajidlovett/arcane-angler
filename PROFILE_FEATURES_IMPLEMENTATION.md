# Profile Features Implementation Guide

## Overview

This document explains the new profile features added to Arcane Angler, including:
- **Avatar System**: Players can select and showcase avatars
- **Fish Showcase**: Display favorite caught fish on profile
- **Achievement Showcase**: Display unlocked achievements on profile
- **Profile Viewing**: Modal-based profile viewing with privacy controls
- **Avatar Display in Chat**: Show player avatars in chat messages

---

## Database Changes

### 1. Run the Migration

Execute the migration SQL file to add the required columns:

```bash
mysql -u root -p arcane_angler < backend/migrations/add_profile_features.sql
```

### 2. New Columns Added to `users` Table

- `owned_avatars` (JSON): Array of owned avatar IDs (e.g., `["avatar_001", "avatar_002"]`)
- `profile_avatar` (VARCHAR): Currently selected avatar ID (default: `avatar_001`)
- `fish_showcase` (JSON): Array of showcased fish objects
- `achievement_showcase` (JSON): Array of showcased achievement IDs

---

## Backend Changes

### 1. New API Endpoints Added (`backend/routes/profile.js`)

#### Avatar Management
- `GET /api/profile/avatars/owned` - Get owned avatars and current selection
- `POST /api/profile/avatars/select` - Select an avatar (must be owned)
- `POST /api/profile/avatars/unlock` - Unlock a new avatar (with relic cost)

#### Achievement Showcase
- `GET /api/profile/:userId/showcase/achievements` - Get user's achievement showcase
- `POST /api/profile/showcase/achievements` - Update achievement showcase

#### Fish Showcase
- `GET /api/profile/:userId/showcase/fish` - Get user's fish showcase
- `POST /api/profile/showcase/fish` - Update fish showcase

### 2. Updated Profile Viewing
- Profile endpoints now return avatar and showcase data
- Privacy checks are enforced
- View counts are incremented automatically

---

## Frontend Changes

### 1. New Components Created

#### `js/components/ProfileModal.js`
A comprehensive modal for viewing player profiles with:
- Avatar display (128x128)
- Overview tab (stats, badges)
- Fish showcase tab
- Achievement showcase tab
- Comments tab
- Friend actions (add/remove)
- Privacy-aware display

#### `js/components/ProfileSettings.js`
Player's own profile management interface with:
- Avatar selection (from owned avatars)
- Achievement showcase selection (up to limit)
- Fish showcase selection (only locked/caught fish)
- Save functionality for each section

### 2. Updated API Service (`js/api-service.js`)

New methods added:
```javascript
// Avatar management
await apiService.getOwnedAvatars()
await apiService.selectAvatar(avatarId)
await apiService.unlockAvatar(avatarId, cost)

// Showcase management
await apiService.getFishShowcase(userId)
await apiService.updateFishShowcase(fishList)
await apiService.getAchievementShowcase(userId)
await apiService.updateAchievementShowcase(achievementIds)
```

---

## Integration into Main Game

### Step 1: Import Components in `game.js`

Add imports at the top of your `game.js`:

```javascript
import { ProfileModal } from './components/ProfileModal.js';
import { ProfileSettings } from './components/ProfileSettings.js';
```

### Step 2: Add State Variables

Add these state variables to the `FishingGame` component:

```javascript
const [showProfileModal, setShowProfileModal] = useState(false);
const [profileUserId, setProfileUserId] = useState(null);
const [showProfileSettings, setShowProfileSettings] = useState(false);
```

### Step 3: Create Profile Click Handler

```javascript
const handleProfileClick = (userId) => {
    setProfileUserId(userId);
    setShowProfileModal(true);
};

const handleOpenProfileSettings = () => {
    setShowProfileSettings(true);
};
```

### Step 4: Make Usernames Clickable

Update your UI components to make usernames clickable:

#### Leaderboard
```javascript
<button
    onClick={() => handleProfileClick(player.user_id)}
    className="text-blue-400 hover:text-blue-300 font-semibold"
>
    {player.profile_username}
</button>
```

#### Chat Messages
```javascript
<button
    onClick={() => handleProfileClick(message.user_id)}
    className="text-blue-400 hover:text-blue-300 font-semibold"
>
    {message.username}
</button>
```

#### Global Chat (Top Bar)
```javascript
<button
    onClick={() => handleProfileClick(message.user_id)}
    className="text-blue-400 hover:text-blue-300"
>
    {message.username}
</button>
```

### Step 5: Add Avatar Display to Chat

Update chat message rendering to include avatars:

```javascript
<div className="flex items-start gap-2">
    {/* Avatar */}
    <img
        src={`/assets/avatar/default/${message.avatar || 'avatar_001'}.png`}
        alt="Avatar"
        className="w-8 h-8 rounded-full border-2 border-gray-600 flex-shrink-0"
        onError={(e) => {
            e.target.src = '/assets/avatar/default/avatar_001.png';
        }}
    />

    {/* Message Content */}
    <div className="flex-1">
        <button
            onClick={() => handleProfileClick(message.user_id)}
            className="text-blue-400 hover:text-blue-300 font-semibold"
        >
            {message.username}
        </button>
        <div className="text-gray-300">{message.text}</div>
    </div>
</div>
```

### Step 6: Render Modals

Add these components to your render function (before the closing `</div>`):

```javascript
{showProfileModal && (
    <ProfileModal
        userId={profileUserId}
        onClose={() => setShowProfileModal(false)}
        currentUserId={playerData.userId}
        achievements={unlockedAchievements}
    />
)}

{showProfileSettings && (
    <ProfileSettings
        onClose={() => setShowProfileSettings(false)}
        currentProfile={currentProfile}
        achievements={unlockedAchievements}
        lockedFish={lockedFish}
        onUpdate={loadPlayerData}
    />
)}
```

### Step 7: Add Profile Settings Button

Add a button to open profile settings (e.g., in the Profile tab):

```javascript
<button
    onClick={handleOpenProfileSettings}
    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold"
>
    Profile Settings
</button>
```

---

## Chat System Integration

### Update Chat Message Schema

When sending chat messages, include the player's avatar:

#### Backend (`backend/routes/chat.js` or similar)
```javascript
// When broadcasting chat message
const message = {
    id: messageId,
    user_id: userId,
    username: user.profile_username,
    avatar: user.profile_avatar || 'avatar_001', // Include avatar
    text: messageText,
    channel: channel,
    timestamp: new Date()
};
```

#### Frontend (when receiving messages)
Make sure the chat state includes the avatar field and render it as shown in Step 5.

---

## Avatar Asset Setup

### File Structure
```
/assets/avatar/default/
    avatar_001.png (128x128)
    avatar_002.png (128x128)
    avatar_003.png (128x128)
    ... (up to avatar_020.png or more)
```

### Default Avatars
All users start with `avatar_001` unlocked. Additional avatars can be:
- Unlocked through achievements
- Purchased with relics
- Earned through special events

### Scaling for Chat
The components automatically scale avatars:
- **Profile viewing**: 128x128 (full size)
- **Chat messages**: 64x64 (using CSS width/height)
- **Small thumbnails**: 32x32 (using CSS)

---

## Privacy Settings

### Profile Privacy Levels
1. **Public**: Anyone can view the profile
2. **Friends**: Only friends can view the profile
3. **Private**: Only the user can view their own profile

### Showcase Limits
- **Achievement Showcase**: Default 6 (configurable in `users.achievement_showcase_limit`)
- **Fish Showcase**: Default 3 (configurable in `users.favorite_fish_limit`)

These can be increased through special items, achievements, or premium features.

---

## Testing Checklist

### Database
- [x] Migration executed successfully
- [ ] Columns exist in users table
- [ ] Default values set correctly (profile_avatar = 'avatar_001')

### Backend API
- [ ] GET /api/profile/avatars/owned returns owned avatars
- [ ] POST /api/profile/avatars/select updates selected avatar
- [ ] POST /api/profile/showcase/achievements validates showcase limit
- [ ] POST /api/profile/showcase/fish verifies fish are locked
- [ ] Profile viewing respects privacy settings
- [ ] View count increments correctly

### Frontend
- [ ] ProfileModal displays correctly
- [ ] Avatar images load properly
- [ ] Clicking usernames opens profile modal
- [ ] ProfileSettings allows avatar selection
- [ ] Achievement showcase selection works
- [ ] Fish showcase selection shows only caught fish
- [ ] Avatar displays in chat messages
- [ ] Privacy settings prevent unauthorized viewing

### User Flow
- [ ] User can select owned avatar
- [ ] User can showcase achievements
- [ ] User can showcase caught fish
- [ ] User can view other profiles
- [ ] Friend actions work correctly
- [ ] Comments can be posted (if allowed)

---

## Common Issues & Solutions

### Issue: Avatars not displaying
**Solution**: Ensure avatar files exist in `/assets/avatar/default/` and match the naming convention `avatar_001.png`

### Issue: "Avatar not owned" error
**Solution**: Initialize owned_avatars properly:
```sql
UPDATE users SET owned_avatars = JSON_ARRAY('avatar_001') WHERE owned_avatars IS NULL;
```

### Issue: Showcase limit not working
**Solution**: Verify `achievement_showcase_limit` and `favorite_fish_limit` columns exist and have default values

### Issue: Privacy settings not enforced
**Solution**: Ensure the profile viewing endpoint (`GET /api/profile/:userId`) includes privacy checks

### Issue: Fish showcase shows uncaught fish
**Solution**: The `locked_fish` table must be populated when fish are caught. Verify fish are being added to this table.

---

## Future Enhancements

### Potential Features
1. **Avatar Unlocking System**: Unlock avatars through achievements
2. **Animated Avatars**: Support GIF or animated avatars for premium users
3. **Custom Avatars**: Allow users to upload custom avatars (with moderation)
4. **Avatar Frames**: Add decorative frames around avatars
5. **Profile Backgrounds**: Customizable profile backgrounds
6. **Profile Themes**: Color themes for profiles
7. **Showcase Ordering**: Drag-and-drop to reorder showcased items
8. **More Showcase Slots**: Purchasable with relics

### Avatar Shop
Create an avatar shop where players can purchase avatars with:
- Gold
- Relics
- Real money (premium avatars)

Example implementation:
```javascript
// In ProfileSettings component
const handleUnlockAvatar = async (avatarId, cost) => {
    try {
        await apiService.unlockAvatar(avatarId, cost);
        await loadAvatars();
    } catch (err) {
        console.error('Failed to unlock avatar:', err);
    }
};
```

---

## API Reference

### Avatar Endpoints

#### GET /api/profile/avatars/owned
**Response:**
```json
{
    "ownedAvatars": ["avatar_001", "avatar_002"],
    "currentAvatar": "avatar_001"
}
```

#### POST /api/profile/avatars/select
**Request:**
```json
{
    "avatarId": "avatar_002"
}
```
**Response:**
```json
{
    "success": true,
    "selectedAvatar": "avatar_002"
}
```

#### POST /api/profile/avatars/unlock
**Request:**
```json
{
    "avatarId": "avatar_003",
    "cost": 100
}
```
**Response:**
```json
{
    "success": true,
    "unlockedAvatar": "avatar_003",
    "ownedAvatars": ["avatar_001", "avatar_002", "avatar_003"]
}
```

### Showcase Endpoints

#### GET /api/profile/:userId/showcase/fish
**Response:**
```json
{
    "showcase": [
        {"name": "Golden Koi", "rarity": "Legendary"},
        {"name": "Mystic Eel", "rarity": "Mythic"}
    ]
}
```

#### POST /api/profile/showcase/fish
**Request:**
```json
{
    "fishList": [
        {"name": "Golden Koi", "rarity": "Legendary"},
        {"name": "Mystic Eel", "rarity": "Mythic"}
    ]
}
```
**Response:**
```json
{
    "success": true,
    "showcase": [...]
}
```

---

## Summary

This profile features update adds comprehensive player profile customization and viewing capabilities. The system is designed to be:

- **Flexible**: Easy to add more avatars and showcase types
- **Scalable**: JSON-based storage for showcases
- **Privacy-aware**: Respects user privacy settings
- **User-friendly**: Intuitive modal-based UI
- **Integrated**: Works seamlessly with existing chat and leaderboard systems

All backend endpoints are protected with JWT authentication and include proper validation and error handling.
