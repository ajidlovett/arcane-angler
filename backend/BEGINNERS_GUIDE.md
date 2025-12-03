# 🎣 Complete Beginner's Guide - Arcane Angler Backend Setup

## For People with ZERO Coding Experience

This guide assumes you know **nothing** about programming and will walk you through **every single step**. Don't worry, you can do this! 💪

---

## 📋 What You'll Need

Before starting, make sure you have:
- ✅ Access to your Cloudways account
- ✅ Your game files (biomes.js, equipment.js, game.js, etc.)
- ✅ About 2-3 hours of time
- ✅ A cup of coffee ☕

---

## 🗺️ The Big Picture (What We're Doing)

Think of your game like a house:
- **Your current game** = A house with no plumbing (saves to browser only)
- **What we're adding** = Plumbing system (saves to cloud database)
- **The backend** = The water pipes and tank
- **The database** = The water storage tank

We're adding 3 main features:
1. **User accounts** - So players can create accounts
2. **Cloud saves** - So progress is saved online
3. **Leaderboards** - So players can compete

---

## 📚 Step-by-Step Setup

### PART 1: Accessing Your Server

#### Step 1: Login to Cloudways

1. Go to https://cloudways.com
2. Click "Login" (top right)
3. Enter your email and password
4. Click "Sign In"

You should now see your **dashboard**.

#### Step 2: Find Your Server

1. Look for "Servers" in the left menu
2. Click on it
3. You'll see a list of your servers
4. Find the one hosting your game
5. Click on it

You should now see server details.

#### Step 3: Get Server Access Info

Write these down on paper:

1. **Server IP Address**: Look for "Public IP" (example: 123.456.789.0)
2. **SSH Username**: Usually "master_[something]"
3. **SSH Password**: Click the eye icon to see it

Keep this paper safe!

---

### PART 2: Access MySQL Database

#### Step 1: Open Database Manager

1. In Cloudways, stay on your server page
2. Find "Access Details" section
3. Look for "MySQL Access"
4. Write down:
   - **Database Name**: (example: abcd_12345)
   - **Database Username**: (example: abcd_12345)
   - **Database Password**: Click eye icon to see

#### Step 2: Open phpMyAdmin

1. Still in Cloudways
2. Find "Database" section on left menu
3. Click "Database"
4. Look for "phpMyAdmin" button
5. Click it

A new tab will open - this is phpMyAdmin (your database control panel).

#### Step 3: Login to phpMyAdmin

1. You should be auto-logged in
2. If not, use the username/password from Step 1
3. You'll see a list of databases on the left

---

### PART 3: Create the Database

#### Step 1: Create New Database

1. In phpMyAdmin
2. Click "New" on the left sidebar
3. In "Database name" field, type: `arcane_angler`
4. Click "Create"

You now have a database!

#### Step 2: Import Database Structure

**Download the database file first:**
1. From the backend folder, find `database.sql`
2. Download it to your computer

**Import it:**
1. In phpMyAdmin, click "arcane_angler" database (on left)
2. Click "Import" tab (at top)
3. Click "Choose File" button
4. Select the `database.sql` file you downloaded
5. Scroll down
6. Click "Import" button at bottom

Wait 10-30 seconds. You should see "Import has been successfully finished".

#### Step 3: Verify Tables Were Created

1. Click "arcane_angler" on the left again
2. You should now see 9 tables:
   - users
   - player_data
   - player_stats
   - player_inventory
   - locked_fish
   - owned_rods
   - bait_inventory
   - leaderboard_stats
   - achievements

If you see these, SUCCESS! ✅

---

### PART 4: Upload Backend Files to Server

#### Option A: Using Cloudways File Manager (Easiest)

1. In Cloudways dashboard
2. Click "Application" in left menu
3. Click your application name
4. Click "Access Details"
5. Under "SFTP/SSH ACCESS", click "Launch SFTP/SSH"
6. Or find "Application Management" → "File Manager"

**Create backend folder:**
1. Navigate to your `public_html` folder (or wherever your game is)
2. Create new folder called `backend`
3. Upload ALL files from the `arcane-angler-backend` folder:
   - database.sql
   - server.js
   - db.js
   - package.json
   - .env.example
   - All folders (routes, middleware, services, client)

#### Option B: Using FileZilla (More Control)

**Download FileZilla:**
1. Go to https://filezilla-project.org/
2. Download FileZilla Client
3. Install it

**Connect to server:**
1. Open FileZilla
2. At the top, enter:
   - Host: your server IP (from Part 1, Step 3)
   - Username: your SSH username
   - Password: your SSH password
   - Port: 22
3. Click "Quickconnect"

**Upload files:**
1. On the RIGHT side (Remote site), navigate to your game folder
2. Create folder called `backend`
3. On the LEFT side (Local site), navigate to downloaded backend folder
4. Select all files
5. Right-click → Upload

Wait for all files to upload (1-2 minutes).

---

### PART 5: Configure the Backend

#### Step 1: Create .env File

1. In your server's `backend` folder
2. Find the file `.env.example`
3. Copy it and rename the copy to `.env` (remove the .example)

#### Step 2: Edit .env File

Open the `.env` file and change these values:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_database_username_from_part2_step1
DB_PASSWORD=your_database_password_from_part2_step1
DB_NAME=arcane_angler
DB_PORT=3306

# JWT Configuration (IMPORTANT: Change this!)
JWT_SECRET=ChangeThisToAnyRandomText32CharsMin123456789012

# Server Configuration
PORT=3000
NODE_ENV=production

# CORS Configuration
ALLOWED_ORIGINS=https://phpstack-658862-6038325.cloudwaysapps.com

# Frontend URL
FRONTEND_URL=https://phpstack-658862-6038325.cloudwaysapps.com

# Email Configuration (OPTIONAL - See Part 6)
EMAIL_HOST=
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=
EMAIL_PASS=
```

**Important notes:**
- Replace `your_database_username_from_part2_step1` with actual username
- Replace `your_database_password_from_part2_step1` with actual password
- For `JWT_SECRET`, just type any random text (at least 32 characters)
  Example: `MyFishingGame2024SecureKey12345` 
- Replace the ALLOWED_ORIGINS with YOUR actual website URL

**Save the file!**

---

### PART 6: Setup Email (OPTIONAL but Recommended)

Email is needed for:
- Email verification (prevent bots)
- Password reset (if users forget password)

**If you skip this:** The game will still work, but users won't get verification emails.

#### Option A: Using Gmail (Easiest for Testing)

1. Go to your Gmail account
2. Click your profile picture → "Manage your Google Account"
3. Click "Security" (left menu)
4. Scroll to "2-Step Verification" → Turn it ON if not enabled
5. Go back to Security page
6. Scroll to "App passwords"
7. Click it
8. Create app password for "Mail"
9. Copy the 16-character password (example: abcd efgh ijkl mnop)

**Update .env file:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  (the app password)
```

#### Option B: Using SendGrid (Better for Production)

1. Go to https://sendgrid.com
2. Sign up for free account (100 emails/day free)
3. Verify your account
4. Go to Settings → API Keys
5. Create API Key
6. Copy the key (starts with "SG.")

**Update .env file:**
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=SG.your_api_key_here
```

#### Option C: Check with Cloudways

1. Contact Cloudways support
2. Ask: "Do you provide SMTP email for my server?"
3. They'll give you SMTP details if available
4. Use those in your .env file

---

### PART 7: Install Node.js on Server

#### Step 1: Connect to Server via SSH

**Option A: Cloudways Terminal**
1. In Cloudways dashboard
2. Go to your server
3. Click "Master Credentials"
4. Click "Launch SSH Terminal"

**Option B: Use Terminal/Command Prompt**
- **Windows**: Download PuTTY from putty.org
- **Mac/Linux**: Open Terminal

Then connect:
```bash
ssh your_ssh_username@your_server_ip
# Enter password when prompted
```

You should now see a command line (looks scary but don't worry!).

#### Step 2: Check if Node.js is Installed

Type this and press Enter:
```bash
node --version
```

**If you see a version number (like v18.0.0):**
- ✅ Node.js is installed! Skip to Part 8.

**If you see "command not found":**
- Continue to Step 3

#### Step 3: Install Node.js

Copy and paste these commands ONE AT A TIME:

```bash
# Update system
sudo apt update

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

You should see version numbers. Success! ✅

---

### PART 8: Start the Backend Server

#### Step 1: Navigate to Backend Folder

In your SSH terminal, type:
```bash
cd /home/master/applications/your_app_name/public_html/backend
```

Replace `your_app_name` with your actual application path.

**Tip:** Not sure of the path? Type `pwd` to see where you are, then use `cd` to navigate.

#### Step 2: Install Dependencies

Type this:
```bash
npm install
```

This will download all needed software. Takes 1-2 minutes. You'll see lots of text scrolling - that's normal!

Wait until you see the command prompt again.

#### Step 3: Test the Server

Type:
```bash
node server.js
```

You should see:
```
✅ Database connected successfully
🎣 Arcane Angler API running on port 3000
Environment: production
```

If you see this - **SUCCESS!** ✅

Press `Ctrl+C` to stop the server.

#### Step 4: Install PM2 (Keeps Server Running)

PM2 keeps your server running even if you close the terminal.

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start your server with PM2
pm2 start server.js --name arcane-angler

# Make it start automatically on reboot
pm2 startup
pm2 save
```

Check if it's running:
```bash
pm2 status
```

You should see `arcane-angler` with status `online`. ✅

**Useful PM2 commands:**
- `pm2 logs` - See what the server is doing
- `pm2 restart arcane-angler` - Restart server
- `pm2 stop arcane-angler` - Stop server
- `pm2 delete arcane-angler` - Remove from PM2

---

### PART 9: Configure Nginx (Make API Accessible)

Your backend is running on port 3000, but we need to make it accessible via your website.

#### Step 1: Find Nginx Config

In SSH terminal:
```bash
cd /etc/nginx/sites-available
ls
```

You should see a file with your domain name.

#### Step 2: Edit Nginx Config

```bash
sudo nano your_domain_file
```

Replace `your_domain_file` with actual filename.

#### Step 3: Add API Configuration

Find the `server {` block and ADD this inside it (before the closing `}`):

```nginx
location /api {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

**To save in nano:**
- Press `Ctrl+X`
- Press `Y` (for yes)
- Press `Enter`

#### Step 4: Test and Restart Nginx

```bash
# Test configuration
sudo nginx -t

# If test passes, restart Nginx
sudo systemctl restart nginx
```

#### Step 5: Test the API

Open your web browser and go to:
```
https://your-domain.com/api/health
```

Replace `your-domain.com` with your actual domain.

You should see:
```json
{"status":"ok","message":"Arcane Angler API is running"}
```

If you see this - **HUGE SUCCESS!** 🎉 Your backend is live!

---

### PART 10: Update Your Game Files

Now we connect your game to the backend!

#### Step 1: Update Game Files

In your game's main folder (where index.html is), you need to add 2 files:

**File 1: js/api-service.js**
- Copy from `client/js/api-service.js` in backend folder
- Upload to your game's `js/` folder

**File 2: js/auth-component.js**
- Copy from `client/js/auth-component.js` in backend folder
- Upload to your game's `js/` folder

#### Step 2: Update api-service.js

Open `js/api-service.js` and find this line:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

Change it to:
```javascript
const API_BASE_URL = 'https://your-domain.com/api';
```

Replace `your-domain.com` with your actual domain!

**Save the file.**

#### Step 3: Update index.html

Open your `index.html` file.

Find this section (near the bottom):
```html
<!-- Load game logic with Babel -->
<script type="text/babel" src="js/game.js"></script>
```

ADD these lines BEFORE game.js:
```html
<!-- API Service and Authentication -->
<script src="js/api-service.js"></script>
<script type="text/babel" src="js/auth-component.js"></script>

<!-- Load game logic with Babel -->
<script type="text/babel" src="js/game.js"></script>
```

**Save the file.**

---

### PART 11: Update game.js

This is the trickiest part, but don't worry - I'll guide you!

#### Step 1: Wrap Your Game with Authentication

At the VERY BOTTOM of your `game.js` file, find this line:
```javascript
ReactDOM.render(<FishingGame />, document.getElementById('root'));
```

REPLACE IT with this code:
```javascript
// Main App with Authentication
const App = () => {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [offlineMode, setOfflineMode] = React.useState(false);

  // Check if user is already logged in
  React.useEffect(() => {
    const checkAuth = async () => {
      if (window.ApiService.isLoggedIn()) {
        try {
          const result = await window.ApiService.verifyToken();
          setUser(result.user);
        } catch (err) {
          console.error('Token verification failed:', err);
          window.ApiService.logout();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = (userData) => {
    if (userData === null) {
      setOfflineMode(true);
      setUser({ username: 'OfflinePlayer' });
    } else {
      setUser(userData);
    }
  };

  const handleLogout = () => {
    if (!offlineMode) {
      window.ApiService.logout();
    }
    setUser(null);
    setOfflineMode(false);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-cyan-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return <FishingGame user={user} onLogout={handleLogout} offlineMode={offlineMode} />;
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
```

#### Step 2: Update FishingGame Component

Find this line (near top of `game.js`):
```javascript
const FishingGame = () => {
```

Change it to:
```javascript
const FishingGame = ({ user, onLogout, offlineMode }) => {
```

#### Step 3: Add Cloud Save

After all your `useState` declarations (around line 70), ADD this code:

```javascript
// Load player data from cloud
React.useEffect(() => {
  const loadData = async () => {
    if (!offlineMode) {
      try {
        const data = await window.ApiService.getPlayerData();
        setPlayer(data);
        console.log('✅ Loaded from cloud');
      } catch (err) {
        console.error('Failed to load from cloud:', err);
      }
    }
  };
  loadData();
}, [offlineMode]);

// Auto-save to cloud every 30 seconds
React.useEffect(() => {
  if (!offlineMode) {
    const saveInterval = setInterval(async () => {
      try {
        await window.ApiService.savePlayerData(player);
        console.log('✅ Saved to cloud');
      } catch (err) {
        console.error('Auto-save failed:', err);
      }
    }, 30000);
    
    return () => clearInterval(saveInterval);
  }
}, [player, offlineMode]);
```

#### Step 4: Add Logout Button

Find your sidebar code and ADD a logout button:

```javascript
<button
  onClick={onLogout}
  className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
  {offlineMode ? 'Exit Game' : 'Logout'}
</button>

{!offlineMode && user && (
  <div className="text-sm text-gray-500 mt-2">
    Playing as: {user.profileUsername || user.username}
  </div>
)}
```

**Save game.js!**

---

### PART 12: TEST EVERYTHING! 🎉

#### Test 1: Visit Your Game

1. Open your game in browser: `https://your-domain.com`
2. You should now see a login screen! ✅

#### Test 2: Register Account

1. Click "Register"
2. Fill in:
   - Username: `testplayer`
   - Profile Name: `Test Fisher`
   - Email: your email
   - Password: `test123`
3. Click "Register"
4. You should:
   - See success message
   - Get verification email
   - Be logged into game

#### Test 3: Check Email

1. Check your email inbox
2. You should have email from Arcane Angler
3. Click verification link
4. Should see "Email verified!"

#### Test 4: Play and Save

1. Catch some fish
2. Buy a rod
3. Wait 30 seconds
4. You should see "✅ Saved to cloud" in browser console (F12 → Console)

#### Test 5: Cross-Device Sync

1. Logout from game
2. Open game on different browser (or phone)
3. Login with same username/password
4. Your progress should be there! ✅

#### Test 6: Check Database

1. Go back to phpMyAdmin
2. Click "arcane_angler" database
3. Click "users" table
4. Click "Browse"
5. You should see your test account! ✅

---

## 🎉 CONGRATULATIONS!

You did it! Your fishing game now has:
- ✅ User accounts
- ✅ Email verification
- ✅ Password reset
- ✅ Cloud saves
- ✅ Cross-device sync
- ✅ Leaderboards

---

## 🆘 Troubleshooting

### "Can't connect to database"
- Check .env file has correct database credentials
- Make sure database exists in phpMyAdmin
- Restart server: `pm2 restart arcane-angler`

### "API not found" or 404 errors
- Check Nginx configuration
- Make sure port 3000 is not blocked by firewall
- Restart Nginx: `sudo systemctl restart nginx`

### "Email not sending"
- Check email configuration in .env
- For Gmail, make sure you're using App Password (not regular password)
- Check PM2 logs: `pm2 logs arcane-angler`

### "Token verification failed"
- Clear browser cache
- Clear localStorage (F12 → Application → Local Storage → Clear)
- Try registering new account

### "Server not starting"
- Check if port 3000 is free: `lsof -ti:3000`
- Check PM2 logs: `pm2 logs arcane-angler`
- Try starting manually: `cd backend && node server.js`

---

## 📞 Need More Help?

1. Check server logs: `pm2 logs arcane-angler`
2. Check browser console: Press F12 → Console tab
3. Check database in phpMyAdmin
4. Make sure all files were uploaded correctly

---

## 🎯 Next Steps

Now that your backend is working:

1. **Invite friends to test**
2. **Monitor the leaderboards**
3. **Check email verification is working**
4. **Plan new features!**

Optional improvements:
- Add more achievements
- Create admin panel
- Add friend system
- Add trading between players

---

**You're now running a full MMORPG backend! Great job!** 🎣🎉

*Remember: You can always check the technical documentation in the other .md files if you want to learn more!*
