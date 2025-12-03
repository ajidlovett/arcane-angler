# 🎣 START HERE - Arcane Angler Backend

## Welcome! You're One Step Away from a Full MMORPG!

This backend adds:
✅ User registration with email
✅ Email verification (prevents bots)  
✅ Password reset (forgot password)
✅ Profile usernames (public display names)
✅ Cloud saves (automatic every 30 seconds)
✅ Global leaderboards
✅ Cross-device sync
✅ Offline mode option

---

## 📖 Which Guide Should You Read?

### ⭐ **NO CODING EXPERIENCE?**
👉 Read: `BEGINNERS_GUIDE.md`

This guide assumes you know NOTHING and walks through EVERY step with explanations.
**Estimated time: 2-3 hours**

### 💻 **SOME TECHNICAL EXPERIENCE?**
👉 Read: `SETUP_GUIDE.md`

Faster-paced guide for people familiar with servers and databases.
**Estimated time: 45 minutes**

### 🚀 **JUST WANT THE QUICK VERSION?**
👉 Read: `QUICK_REFERENCE.md`

Commands only, no explanations.
**Estimated time: 20 minutes**

---

## 📁 Important Files

```
📄 BEGINNERS_GUIDE.md    ← START HERE if new to programming
📄 SETUP_GUIDE.md         ← Technical setup guide  
📄 QUICK_REFERENCE.md     ← Commands cheat sheet
📄 INTEGRATION_GUIDE.md   ← How to modify your game files
📄 README.md              ← Project overview
```

---

## 🎯 What's New in This Version

This version includes:
- ✅ **Profile Username** - Separate display name for leaderboards
- ✅ **Email Verification** - Prevents bot registrations
- ✅ **Password Reset** - Users can reset forgotten passwords
- ✅ **Better Security** - Email validation and token expiration

**Difference from basic version:**
- Users have TWO names:
  - Login username (private)
  - Profile username (public, shown on leaderboards)
- Email is required (not optional)
- Email verification system included
- Forgot password feature included

---

## 🚀 Quick Setup Summary

### For Cloudways Users (Most Common):

1. **Create Database** (5 min)
   - Open phpMyAdmin
   - Create database "arcane_angler"
   - Import database.sql file

2. **Upload Files** (5 min)
   - Upload all backend files to server
   - Use File Manager or FileZilla

3. **Configure** (5 min)
   - Copy .env.example to .env
   - Update database credentials
   - Set email settings (optional but recommended)

4. **Install & Start** (10 min)
   - SSH into server
   - Run: `npm install`
   - Run: `pm2 start server.js`
   - Configure Nginx

5. **Update Game** (30 min)
   - Add 2 JavaScript files
   - Modify game.js
   - Update index.html

**Total: About 1 hour** (if you know what you're doing)

---

## 📧 Email Setup (Important!)

Email is used for:
- Verifying new accounts (prevents bots)
- Password reset links

### Three Options:

**Option 1: Gmail (Easiest for Testing)**
- Use your Gmail account
- Requires "App Password" (not regular password)
- Free, but limited to personal use
- Setup time: 5 minutes

**Option 2: SendGrid (Best for Production)**
- Sign up at sendgrid.com
- Free tier: 100 emails/day
- Professional and reliable
- Setup time: 10 minutes

**Option 3: Skip for Now**
- Game will still work
- Users can register but won't get verification emails
- Password reset won't work
- Can add later

**Recommendation:** Use Gmail for testing, switch to SendGrid for production.

---

## ✅ Success Checklist

After setup, you should be able to:
- [ ] Visit your game and see login screen
- [ ] Register new account with email
- [ ] Receive verification email
- [ ] Login and play game
- [ ] See progress save to cloud (check console)
- [ ] Logout and login again with same progress
- [ ] Use "Forgot Password" feature
- [ ] See players on leaderboard

---

## 🆘 Common Issues

### "Can't download files"
- Files are in this folder
- Upload them directly to your server
- Or use File Manager in Cloudways

### "Database connection failed"
- Check .env has correct database credentials
- Make sure arcane_angler database exists
- Check MySQL is running

### "Email not sending"
- Check EMAIL settings in .env
- For Gmail: Use App Password, not regular password
- For SendGrid: Make sure API key is correct
- Check pm2 logs: `pm2 logs arcane-angler`

### "Can't access API"
- Make sure Nginx is configured
- Check server is running: `pm2 status`
- Test endpoint: https://your-domain.com/api/health

---

## 📞 Getting Help

1. **Check the guides** - Answer is probably there!
2. **Check logs** - Run `pm2 logs arcane-angler`
3. **Check browser console** - Press F12
4. **Check database** - Use phpMyAdmin

---

## 🎯 What's Next?

After successful setup:

1. **Test thoroughly**
   - Create test accounts
   - Test email verification
   - Test password reset
   - Test offline mode

2. **Monitor**
   - Check PM2 status daily
   - Monitor error logs
   - Check database size

3. **Improve**
   - Add more features from roadmap
   - Customize email templates
   - Add admin panel
   - Create mobile app

---

## 📚 All Documentation Files

| File | Purpose | Read When |
|------|---------|-----------|
| `START_HERE.md` | You are here! | First |
| `BEGINNERS_GUIDE.md` | Step-by-step for beginners | If new to tech |
| `SETUP_GUIDE.md` | Technical setup | If experienced |
| `INTEGRATION_GUIDE.md` | Modify game files | After backend works |
| `QUICK_REFERENCE.md` | Commands only | For quick lookup |
| `README.md` | Project overview | For understanding |
| `ARCHITECTURE.md` | System design | For developers |
| `CHANGELOG.md` | Version history | For what's new |

---

## 🎉 Ready to Begin?

### New to Programming?
👉 Open **BEGINNERS_GUIDE.md**

### Have Experience?
👉 Open **SETUP_GUIDE.md**

### Just Need Commands?
👉 Open **QUICK_REFERENCE.md**

---

**Good luck! You're about to launch a full MMORPG backend! 🎣**

*P.S. The BEGINNERS_GUIDE.md is really comprehensive - even if you're not a beginner, it's worth skimming!*
