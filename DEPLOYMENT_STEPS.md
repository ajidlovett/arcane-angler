# Deployment Steps for Arcane Angler

## Current Status
✅ Express server running on port 3000 (development)
✅ API endpoint working: `/api/health`
✅ Frontend served from `dist/`
✅ Dependencies installed
⚠️ Apache proxy needs configuration on production server

---

## Production Server Setup

### 1. Install Backend Dependencies
```bash
cd /path/to/arcane-angler/backend
npm install
```

### 2. Configure Environment Variables
Create `/path/to/arcane-angler/backend/.env` with your actual credentials:

```env
# Database - UPDATE WITH YOUR MYSQL CREDENTIALS
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=arcane_angler
DB_PORT=3306

# JWT - GENERATE A SECURE RANDOM STRING
JWT_SECRET=your_secure_random_string_here_32_chars_minimum
JWT_EXPIRES_IN=7d

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://arcaneangler.com

# Server
ALLOWED_ORIGINS=https://arcaneangler.com,http://localhost:3000
NODE_ENV=production
PORT=3000
```

### 3. Enable Required Apache Modules
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### 4. Deploy .htaccess File
The `.htaccess` file in the root directory should contain:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_URI} !^/\.well-known/
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>

<IfModule mod_proxy.c>
  ProxyPreserveHost On
  ProxyPass /.well-known/ !
  ProxyPass / http://localhost:3000/
  ProxyPassReverse / http://localhost:3000/
</IfModule>
```

### 5. Start Express Server with PM2 (Recommended)

**Install PM2:**
```bash
sudo npm install -g pm2
```

**Start the server:**
```bash
cd /path/to/arcane-angler/backend
pm2 start server.js --name "arcane-angler"
pm2 save
pm2 startup  # Follow the instructions it provides
```

**PM2 Commands:**
```bash
pm2 list                    # View running processes
pm2 logs arcane-angler      # View logs
pm2 restart arcane-angler   # Restart server
pm2 stop arcane-angler      # Stop server
pm2 monit                   # Monitor CPU/Memory
```

### 6. Verify Everything Works

**Test locally on server:**
```bash
# API health check
curl http://localhost:3000/api/health
# Should return: {"status":"ok","message":"Arcane Angler API is running"}

# Frontend
curl http://localhost:3000/ | head -20
# Should return HTML with React app
```

**Test through Apache:**
```bash
# From your local machine
curl https://arcaneangler.com/api/health
# Should return: {"status":"ok"}

# Visit https://arcaneangler.com/ in browser
# Should load the game
```

---

## Troubleshooting

### 500 Internal Server Error

**Check if Express is running:**
```bash
pm2 list
# Should show "arcane-angler" as "online"
```

**Check Express logs:**
```bash
pm2 logs arcane-angler
```

**Check Apache error logs:**
```bash
sudo tail -f /var/log/apache2/error.log
# or
sudo tail -f /var/log/httpd/error_log
```

**Common issues:**
1. **Express not running** → Start with PM2
2. **Port 3000 in use** → Change PORT in .env or kill conflicting process
3. **Apache can't connect** → Check mod_proxy is enabled
4. **Database connection failed** → Verify .env credentials and MySQL is running

### Database Connection Errors

**Verify MySQL is running:**
```bash
sudo systemctl status mysql
# or
sudo systemctl status mariadb
```

**Test database connection:**
```bash
mysql -h localhost -u your_user -p arcane_angler
# Enter password when prompted
```

**Import database schema:**
```bash
mysql -u your_user -p arcane_angler < /path/to/arcane-angler/backend/database.sql
```

### React Not Loading

**Rebuild frontend:**
```bash
cd /path/to/arcane-angler
npm install
npm run build
```

**Verify dist/ exists:**
```bash
ls -la dist/
# Should see: index.html, assets/
```

---

## Architecture Overview

```
User Browser
    ↓
https://arcaneangler.com (Apache :80/:443)
    ↓
.htaccess ProxyPass
    ↓
Express Server (localhost:3000)
    ├── /api/* → API Routes
    ├── /assets/* → Static files from dist/
    └── /* → dist/index.html (React SPA)
    ↓
MySQL Database (localhost:3306)
```

---

## Security Checklist

- [ ] Generate secure JWT_SECRET (32+ random characters)
- [ ] Set strong DB_PASSWORD
- [ ] Configure ALLOWED_ORIGINS to only include your domain
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS (Let's Encrypt recommended)
- [ ] Configure firewall to block direct access to port 3000
- [ ] Keep .env file secure (never commit to git - already in .gitignore)
- [ ] Regular database backups
- [ ] Monitor PM2 logs for errors

---

## Quick Start Commands

```bash
# On production server:
cd /path/to/arcane-angler

# 1. Pull latest code
git pull origin main

# 2. Install/update dependencies
cd backend && npm install

# 3. Rebuild frontend (if changed)
cd .. && npm install && npm run build

# 4. Restart server
pm2 restart arcane-angler

# 5. Check logs
pm2 logs arcane-angler --lines 50
```

---

## Next Steps

1. Configure `.env` file with actual credentials on your production server
2. Install and start PM2 process manager
3. Verify Apache modules are enabled
4. Test the endpoints
5. Monitor logs for any errors

If you continue to get 500 errors after following these steps, check:
- PM2 status: `pm2 list`
- Apache error logs: `sudo tail -f /var/log/apache2/error.log`
- Express logs: `pm2 logs arcane-angler`
