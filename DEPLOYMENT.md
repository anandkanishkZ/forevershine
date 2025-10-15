# Forever Shine Engineering - VPS Deployment Guide

Complete guide to deploy with separate subdomains for frontend and backend.

## 🌐 Domain Structure

- **Frontend**: `forevershine.com.np` + `www.forevershine.com.np`
- **Backend API**: `api.forevershine.com.np`

## 🚀 Quick Deployment (30 Minutes)

### Step 1: VPS Setup (15 min)
```bash
ssh root@YOUR_VPS_IP
wget https://raw.githubusercontent.com/YOUR_REPO/main/deployment/vps-setup.sh
chmod +x vps-setup.sh
sudo ./vps-setup.sh
```

### Step 2: Configure DNS (5 min)
Add these A records to your domain:
```
A    @              → YOUR_VPS_IP
A    www            → YOUR_VPS_IP
A    api            → YOUR_VPS_IP
```

### Step 3: Configure Environment (5 min)
```bash
# Backend environment
cd /var/www/forevershine/backend
cp .env.example .env
nano .env
```

Update these values:
```bash
DATABASE_URL="postgresql://forevershine:YOUR_PASSWORD@localhost:5432/forever_shine_db"
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_REFRESH_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
ADMIN_PASSWORD=your_secure_password
FRONTEND_URL=https://forevershine.com.np
```

### Step 4: Nginx & SSL (5 min)
```bash
# Copy Nginx configuration
sudo cp deployment/nginx.conf /etc/nginx/sites-available/forevershine
sudo ln -s /etc/nginx/sites-available/forevershine /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup SSL for both domains
chmod +x deployment/setup-ssl.sh
sudo ./deployment/setup-ssl.sh
```

### Step 5: GitHub Secrets
Add to GitHub → Settings → Secrets → Actions:
- `VPS_HOST`: Your VPS IP
- `VPS_USER`: `forevershine`
- `VPS_SSH_PRIVATE_KEY`: Your deployment SSH key
- `DEPLOY_PATH`: `/var/www/forevershine`

### Step 6: Deploy
```bash
git push origin main
```

## 📋 Frontend Configuration

Update `frontend/.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://api.forevershine.com.np/api
NEXT_PUBLIC_SITE_URL=https://forevershine.com.np
```

## 🔧 Backend Configuration

Update `backend/.env`:
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL="postgresql://forevershine:PASSWORD@localhost:5432/forever_shine_db"
JWT_SECRET=your_64_char_secret
JWT_REFRESH_SECRET=your_64_char_secret
FRONTEND_URL=https://forevershine.com.np
ADMIN_EMAIL=admin@forevershine.com.np
ADMIN_PASSWORD=secure_password
```

## ⚙️ PM2 Management

```bash
# Start services
pm2 start ecosystem.config.js

# Monitor
pm2 status
pm2 logs

# Restart
pm2 restart all
```

## 🔄 Manual Deployment

```bash
# Configure variables
export VPS_HOST=your-vps-ip
export VPS_USER=forevershine
export DEPLOY_PATH=/var/www/forevershine

# Deploy
./deployment/deploy.sh
```

## 🆘 Troubleshooting

### Check Services
```bash
pm2 status
sudo systemctl status nginx
sudo systemctl status postgresql
```

### Check Logs
```bash
pm2 logs
tail -f /var/log/nginx/forevershine-error.log
tail -f /var/log/nginx/api-forevershine-error.log
```

### Test Endpoints
```bash
# Frontend
curl https://forevershine.com.np

# Backend API
curl https://api.forevershine.com.np/api/health

# Uploads
curl https://api.forevershine.com.np/uploads/
```

### Rollback
```bash
./deployment/rollback.sh
```

## 📊 Architecture

```
Internet
   │
   ├─→ forevershine.com.np (HTTPS:443)
   │   └─→ Nginx → Next.js (localhost:3000)
   │
   └─→ api.forevershine.com.np (HTTPS:443)
       └─→ Nginx → Express (localhost:5000) → PostgreSQL
```

## ✅ Post-Deployment Checklist

- [ ] Frontend loads at `https://forevershine.com.np`
- [ ] API responds at `https://api.forevershine.com.np/api/health`
- [ ] SSL certificates valid (green padlock)
- [ ] Admin panel accessible
- [ ] Image uploads working
- [ ] Database migrations completed
- [ ] PM2 services running

## 🔒 Security

- **Firewall**: UFW (ports 22, 80, 443)
- **SSL**: Let's Encrypt with auto-renewal
- **fail2ban**: Brute-force protection
- **CORS**: Backend configured for frontend domain
- **Rate Limiting**: Configured in backend

## 📞 Support

- **Health Check**: `./deployment/health-check.sh`
- **Database Backup**: `./deployment/backup-database.sh`
- **View Logs**: `pm2 logs`

---

**Last Updated**: October 15, 2025
