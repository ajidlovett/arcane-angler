# Profile Features Integration - Remaining Tasks

## ✅ Completed

### Core Integration
- ✅ Added ProfileModal and ProfileSettings script tags to index.html
- ✅ Updated components to export to window object
- ✅ Added profile modal state variables to game.js
- ✅ Created profile click handlers
- ✅ Passed handlers to LeaderboardPage and ProfilePage
- ✅ Rendered modals in main game component
- ✅ Load current user profile on mount

---

## 🔧 Remaining Component Updates

### 1. **LeaderboardPage Component** (`js/components/pages/LeaderboardPage.js`)

**What to add:**
Make usernames clickable to view player profiles.

**Example changes:**
```javascript
// In LeaderboardPage component, receive onProfileClick prop
function LeaderboardPage({ user, theme, onProfileClick }) {
  // ...

  // In the render where usernames are displayed:
  <button
    onClick={() => onProfileClick(player.user_id)}
    className="text-blue-400 hover:text-blue-300 hover:underline font-semibold"
  >
    {player.profile_username}
  </button>
}
```

**Files to check:**
- Look for where `profile_username` is displayed in leaderboard rows
- Replace static text with clickable button
- Apply to all leaderboard categories (level, gold, relics, fish caught, etc.)

---

### 2. **Chat Component** (`js/components/Chat.js`)

**What to add:**
a) Display player avatars (64x64) next to messages
b) Make usernames clickable to view profiles

**Example changes:**
```javascript
// Receive onProfileClick prop
function Chat({ theme, user, chatOpen, setChatOpen, onProfileClick }) {
  // ...

  // In chat message rendering:
  <div className="flex items-start gap-2 p-2">
    {/* Avatar */}
    <img
      src={`/assets/avatar/default/${message.profile_avatar || 'avatar_001'}.png`}
      alt="Avatar"
      className="w-8 h-8 rounded-full border-2 border-gray-600 flex-shrink-0"
      onError={(e) => {
        e.target.src = '/assets/avatar/default/avatar_001.png';
      }}
    />

    {/* Message Content */}
    <div className="flex-1">
      <button
        onClick={() => onProfileClick(message.user_id)}
        className="text-blue-400 hover:text-blue-300 hover:underline font-semibold text-sm"
      >
        {message.username}
      </button>
      <div className="text-gray-300 text-sm">{message.text}</div>
      <div className="text-gray-500 text-xs">{formatTime(message.timestamp)}</div>
    </div>
  </div>
}
```

**Backend requirement:**
The chat message objects need to include `profile_avatar` field:
```javascript
// In backend chat routes (if exists)
{
  id: messageId,
  user_id: userId,
  username: user.profile_username,
  profile_avatar: user.profile_avatar, // ADD THIS
  text: messageText,
  timestamp: new Date()
}
```

**Files to update:**
- `js/components/Chat.js` (frontend)
- Backend chat routes (to include avatar in messages)

---

### 3. **ProfilePage Component** (`js/components/pages/ProfilePage.js`)

**What to add:**
Add a "Profile Settings" button to open the ProfileSettings modal.

**Example changes:**
```javascript
// Receive onOpenProfileSettings prop
function ProfilePage({
  user,
  player,
  setPlayer,
  theme,
  showAlert,
  getTotalStats,
  onTitleChange,
  onOpenProfileSettings  // ADD THIS
}) {
  // ...

  // Add button somewhere in the profile UI (near bio or settings section):
  <button
    onClick={onOpenProfileSettings}
    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold shadow-lg"
  >
    ⚙️ Profile Settings
  </button>
}
```

**Suggested placement:**
- In the "Settings" or "Profile" section
- Near bio editing controls
- In a dedicated "Customization" section

---

## 📊 Backend Chat Integration

### Update Chat Message Schema

If you have a chat system with WebSocket or polling, update message broadcasts to include avatar:

**Backend (Node.js/Express):**
```javascript
// When broadcasting chat message
const [user] = await db.query(
  'SELECT profile_username, profile_avatar FROM users WHERE id = ?',
  [userId]
);

const message = {
  id: messageId,
  user_id: userId,
  username: user.profile_username,
  profile_avatar: user.profile_avatar || 'avatar_001', // Include avatar
  text: messageText,
  channel: channel,
  timestamp: new Date()
};

// Broadcast to all connected clients
io.emit('chat_message', message);
```

---

## 🧪 Testing Checklist

After completing the above updates, test:

### LeaderboardPage
- [ ] Click on any username in leaderboard
- [ ] ProfileModal opens showing that player's profile
- [ ] All leaderboard categories work (level, gold, relics, etc.)
- [ ] Privacy settings are respected (private profiles show error)

### Chat
- [ ] Avatars display next to all messages (64x64 size)
- [ ] Avatars load correctly (with fallback to avatar_001)
- [ ] Clicking username opens ProfileModal
- [ ] Own messages show own avatar
- [ ] Other players' messages show their avatars

### ProfilePage
- [ ] "Profile Settings" button visible
- [ ] Clicking button opens ProfileSettings modal
- [ ] Modal shows owned avatars
- [ ] Can select different avatar
- [ ] Can configure fish showcase
- [ ] Can configure achievement showcase
- [ ] Save works correctly

### ProfileModal
- [ ] Opens when clicking usernames anywhere
- [ ] Shows correct player data
- [ ] Avatar displays (128x128)
- [ ] Tabs work (Overview, Fish, Achievements, Comments)
- [ ] Friend actions work (Add/Remove friend)
- [ ] Comments can be posted (if allowed)
- [ ] Privacy settings enforced

### ProfileSettings
- [ ] Owned avatars show with lock icons for unowned
- [ ] Can select owned avatars
- [ ] Current avatar shows checkmark
- [ ] Achievement showcase selection works
- [ ] Fish showcase shows only caught fish
- [ ] Limits enforced (6 achievements, 3 fish)
- [ ] Save updates profile correctly

---

## 🎨 Avatar Asset Setup

Make sure avatar files exist:
```
/assets/avatar/default/
  avatar_001.png (128x128 px)
  avatar_002.png (128x128 px)
  avatar_003.png (128x128 px)
  ...
  avatar_020.png (128x128 px)
```

All users start with `avatar_001` and `avatar_002` unlocked by default.

---

## 📁 Quick Reference: Files to Modify

### Must Update:
1. **js/components/pages/LeaderboardPage.js**
   - Make usernames clickable
   - Use `onProfileClick` prop

2. **js/components/Chat.js**
   - Add avatar display
   - Make usernames clickable
   - Use `onProfileClick` prop

3. **js/components/pages/ProfilePage.js**
   - Add "Profile Settings" button
   - Use `onOpenProfileSettings` prop

### Optional (if chat backend exists):
4. **backend/routes/chat.js** (or similar)
   - Include `profile_avatar` in message broadcasts

---

## 🚀 After Integration is Complete

1. **Run database migration:**
   ```bash
   mysql -u root -p arcane_angler < backend/migrations/add_profile_features.sql
   ```

2. **Place avatar assets** in `/assets/avatar/default/`

3. **Test all features** using the checklist above

4. **Create pull request** with all changes

---

## 💡 Tips

### Finding Code Sections:
- Search for `profile_username` to find where usernames are displayed
- Look for `.map()` or loops rendering player lists in LeaderboardPage
- Search for message rendering in Chat component

### Common Patterns:
```javascript
// Replace this:
<div>{player.profile_username}</div>

// With this:
<button onClick={() => onProfileClick(player.user_id)}>
  {player.profile_username}
</button>
```

### Styling Consistency:
Use these Tailwind classes for clickable usernames:
- `text-blue-400 hover:text-blue-300`
- `hover:underline`
- `font-semibold`
- `cursor-pointer`

---

## ❓ Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify props are passed correctly to components
3. Ensure `user_id` is available in player data
4. Check that ProfileModal and ProfileSettings are loaded in index.html
5. Verify avatar files exist at correct paths

---

## 📊 Integration Progress

- ✅ Core Integration (100%)
- ⏳ LeaderboardPage Updates (0%)
- ⏳ Chat Component Updates (0%)
- ⏳ ProfilePage Updates (0%)
- ⏳ Backend Chat Updates (0%)
- ⏳ Testing (0%)

**Overall: ~40% Complete**

Once the remaining components are updated, the profile features will be fully functional!
