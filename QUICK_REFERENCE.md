# Quick Deployment Reference

Ultra-condensed deployment guide for experienced developers.

## 🚀 Quick Start (5 Minutes)

### 1. VPS Setup
```bash
# On VPS (Ubuntu 20.04+)
wget https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/deployment/vps-setup.sh
chmod +x vps-setup.sh
sudo ./vps-setup.sh
```

### 2. Configure Nginx
```bash
sudo cp deployment/nginx.conf /etc/nginx/sites-available/forevershine
sudo ln -s /etc/nginx/sites-available/forevershine /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 3. SSL Certificate
```bash
sudo certbot --nginx -d forevershine.com.np -d www.forevershine.com.np
```

### 4. Environment Setup
```bash
# Backend
cp backend/.env.example backend/.env
# Edit and configure (see Environment section below)

# Generate JWT secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 5. GitHub Secrets
Add to GitHub repo → Settings → Secrets:
- `VPS_HOST`: Your VPS IP
- `VPS_USER`: forevershine
- `VPS_SSH_PRIVATE_KEY`: SSH private key
- `DEPLOY_PATH`: /var/www/forevershine
- `PRODUCTION_API_URL`: https://forevershine.com.np/api
- `PRODUCTION_SITE_URL`: https://forevershine.com.np

### 6. Deploy
```bash
git push origin main
```

---

## 📋 Key Commands

### PM2 Management
```bash
pm2 status                    # Check status
pm2 logs                      # View logs
pm2 restart all              # Restart all
pm2 stop all                 # Stop all
pm2 delete all               # Delete all
pm2 save                     # Save configuration
```

### Nginx Management
```bash
sudo nginx -t                # Test config
sudo systemctl reload nginx  # Reload
sudo systemctl restart nginx # Restart
sudo systemctl status nginx  # Status
```

### Database Operations
```bash
# Migrations
cd backend && npm run db:migrate

# Seed data
npm run db:seed

# Prisma Studio
npm run db:studio

# Backup
sudo -u postgres pg_dump forever_shine_db > backup.sql
```

### SSL/Certificates
```bash
sudo certbot renew                    # Renew certificates
sudo certbot certificates             # List certificates
sudo certbot renew --dry-run         # Test renewal
```

### System Monitoring
```bash
htop                         # System resources
df -h                        # Disk space
free -h                      # Memory usage
journalctl -f                # System logs
tail -f /var/log/nginx/error.log  # Nginx errors
```

---

## 🔧 Critical Environment Variables

### Backend (.env)
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL="postgresql://USER:PASS@localhost:5432/forever_shine_db"
JWT_SECRET=<64-char-random-hex>
JWT_REFRESH_SECRET=<64-char-random-hex>
FRONTEND_URL=https://forevershine.com.np
ADMIN_EMAIL=admin@forevershine.com.np
ADMIN_PASSWORD=<change-this>
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://forevershine.com.np/api
NEXT_PUBLIC_SITE_URL=https://forevershine.com.np
```

---

## 🐳 Docker Quick Start

```bash
# Setup
cp .env.docker.example .env
# Edit .env with your values

# Deploy
docker compose up -d

# Migrations
docker compose exec backend npx prisma migrate deploy

# Logs
docker compose logs -f

# Stop
docker compose down
```

---

## 🔄 Manual Deployment

```bash
# Configure
export VPS_HOST=your-vps-ip
export VPS_USER=forevershine
export DEPLOY_PATH=/var/www/forevershine

# Deploy
./deployment/deploy.sh

# Rollback
./deployment/rollback.sh
```

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Site down | `pm2 restart all && sudo systemctl restart nginx` |
| API errors | `pm2 logs forevershine-backend` |
| Database issues | `sudo systemctl status postgresql` |
| SSL expired | `sudo certbot renew && sudo systemctl reload nginx` |
| Disk full | `df -h` then clean logs/backups |
| High memory | `pm2 restart all` |

---

## 📁 Important Paths

```
/var/www/forevershine/          # App root
/var/www/forevershine/current/  # Current deployment
/var/www/forevershine/backend/uploads/  # Uploaded files
/var/log/forevershine/          # Application logs
/var/log/nginx/                 # Nginx logs
/etc/nginx/sites-available/     # Nginx configs
/etc/letsencrypt/               # SSL certificates
```

---

## 🔒 Security Checklist

- [ ] Changed default admin password
- [ ] Generated new JWT secrets (64+ chars)
- [ ] Updated database password
- [ ] Configured UFW firewall
- [ ] Enabled fail2ban
- [ ] SSL certificate installed
- [ ] Disabled root SSH login
- [ ] Regular backups configured
- [ ] Log rotation enabled
- [ ] Rate limiting configured

---

## 📊 Health Checks

```bash
# Application health
curl https://forevershine.com.np/health

# API health
curl https://forevershine.com.np/api/health

# Services status
pm2 status
sudo systemctl status nginx
sudo systemctl status postgresql

# SSL certificate expiry
sudo certbot certificates | grep -A 1 "Expiry Date"
```

---

## 🔄 CI/CD Pipeline Flow

1. **Push to main** → Triggers GitHub Actions
2. **Build** → Backend + Frontend compilation
3. **Test** → Automated testing (if configured)
4. **Package** → Create deployment artifact
5. **Upload** → Transfer to VPS via SSH
6. **Deploy** → Extract, install deps, migrate DB
7. **Restart** → PM2 restart services
8. **Verify** → Health check endpoint
9. **Rollback** → Auto-rollback on failure

---

## 📞 Quick Links

- [Full Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Environment Variables](ENVIRONMENT_VARIABLES.md)
- [GitHub Secrets Setup](GITHUB_SECRETS_GUIDE.md)

---

**Need help?** Check the full guides or review GitHub Actions logs.
