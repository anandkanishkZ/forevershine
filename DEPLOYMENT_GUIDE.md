# VPS Deployment Guide - Forever Shine Engineering

Complete guide to deploy the Forever Shine Engineering website to a VPS with CI/CD, Nginx, and SSL.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deployment Options](#deployment-options)
3. [VPS Initial Setup](#vps-initial-setup)
4. [GitHub Actions CI/CD Setup](#github-actions-cicd-setup)
5. [Manual Deployment](#manual-deployment)
6. [Docker Deployment](#docker-deployment)
7. [Post-Deployment](#post-deployment)
8. [Maintenance](#maintenance)
9. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### VPS Requirements
- **OS**: Ubuntu 20.04/22.04 LTS or Debian 11+
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: 20GB+ SSD
- **CPU**: 2+ cores
- **Network**: Static IP address
- **Access**: Root or sudo access

### Domain Requirements
- Domain name (e.g., forevershine.com.np)
- DNS A records pointing to VPS IP:
  ```
  @ (root domain)     → Your VPS IP
  www                 → Your VPS IP
  ```

### Local Requirements
- Git installed
- SSH key pair generated
- GitHub account with repository access

---

## 🚀 Deployment Options

### Option 1: Automated CI/CD (Recommended)
- ✅ Automatic deployment on git push
- ✅ Built-in testing and validation
- ✅ Automatic rollback on failure
- ✅ Zero-downtime deployment
- **Best for**: Production environments

### Option 2: Manual Deployment
- ✅ Full control over deployment process
- ✅ Good for testing and staging
- ⚠️ Requires manual execution
- **Best for**: Development/staging

### Option 3: Docker Deployment
- ✅ Containerized, isolated environment
- ✅ Easy scaling and orchestration
- ✅ Consistent across environments
- **Best for**: Multi-environment setups

---

## 🛠️ VPS Initial Setup

### Step 1: Connect to Your VPS

```bash
ssh root@YOUR_VPS_IP
```

### Step 2: Run Automated Setup Script

```bash
# Download and run the setup script
wget https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/deployment/vps-setup.sh
chmod +x vps-setup.sh
sudo ./vps-setup.sh
```

**What this script does:**
- ✅ Updates system packages
- ✅ Installs Node.js 18, PostgreSQL, Nginx, PM2
- ✅ Configures firewall (UFW)
- ✅ Sets up fail2ban for security
- ✅ Creates application user and directories
- ✅ Configures systemd services
- ✅ Sets up log rotation
- ✅ Generates DH parameters for SSL

### Step 3: Configure Environment Variables

```bash
# Switch to application user
su - forevershine

# Navigate to app directory
cd /var/www/forevershine

# Copy environment template
cp .env.template backend/.env

# Edit environment file
nano backend/.env
```

**Required changes:**
1. **Database Password**: Update `DATABASE_URL` with a strong password
2. **JWT Secrets**: Generate new secrets (see below)
3. **Admin Password**: Change default admin credentials
4. **Domain**: Update `FRONTEND_URL` to your domain

**Generate JWT Secrets:**
```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 4: Update Database Password

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Change password
ALTER USER forevershine WITH PASSWORD 'your_new_secure_password';
\q
```

### Step 5: Configure Nginx

```bash
# Copy Nginx configuration
sudo cp /path/to/deployment/nginx.conf /etc/nginx/sites-available/forevershine

# Create symlink
sudo ln -s /etc/nginx/sites-available/forevershine /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 6: Setup SSL Certificate

```bash
# Install Certbot (if not already installed)
sudo apt-get install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d forevershine.com.np -d www.forevershine.com.np

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 🔄 GitHub Actions CI/CD Setup

### Step 1: Generate SSH Key for Deployment

On your VPS:
```bash
# As the forevershine user
ssh-keygen -t ed25519 -C "deployment@forevershine" -f ~/.ssh/deploy_key

# Display the public key
cat ~/.ssh/deploy_key.pub

# Add to authorized_keys
cat ~/.ssh/deploy_key.pub >> ~/.ssh/authorized_keys

# Display the private key (for GitHub Secrets)
cat ~/.ssh/deploy_key
```

### Step 2: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `VPS_HOST` | `123.45.67.89` | Your VPS IP address |
| `VPS_USER` | `forevershine` | Deployment user |
| `VPS_SSH_PRIVATE_KEY` | `-----BEGIN OPENSSH...` | Private SSH key |
| `DEPLOY_PATH` | `/var/www/forevershine` | Deployment directory |
| `PRODUCTION_API_URL` | `https://forevershine.com.np/api` | Production API URL |
| `PRODUCTION_SITE_URL` | `https://forevershine.com.np` | Production site URL |

### Step 3: Test Deployment

```bash
# On your local machine
git add .
git commit -m "Initial deployment setup"
git push origin main
```

The GitHub Actions workflow will:
1. ✅ Build backend and frontend
2. ✅ Run tests
3. ✅ Deploy to VPS
4. ✅ Run database migrations
5. ✅ Restart services
6. ✅ Perform health check

### Step 4: Monitor Deployment

Go to GitHub → Actions tab to monitor deployment progress.

---

## 🔨 Manual Deployment

If you prefer manual deployment or need to deploy without GitHub Actions:

### Step 1: Configure Environment Variables

Edit the deployment script:
```bash
nano deployment/deploy.sh
```

Update these variables:
```bash
VPS_HOST="your-vps-ip"
VPS_USER="forevershine"
DEPLOY_PATH="/var/www/forevershine"
```

### Step 2: Run Deployment

```bash
# Make script executable
chmod +x deployment/deploy.sh

# Run deployment
./deployment/deploy.sh
```

### Step 3: Run Database Migrations

```bash
ssh forevershine@your-vps-ip
cd /var/www/forevershine/current/backend
npm run db:migrate
```

### Step 4: Verify Deployment

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs

# Check Nginx status
sudo systemctl status nginx
```

---

## 🐳 Docker Deployment

### Step 1: Install Docker on VPS

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt-get install docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.docker.example .env

# Edit environment variables
nano .env
```

### Step 3: Deploy with Docker Compose

```bash
# Pull and build images
docker compose build

# Start services
docker compose up -d

# Run database migrations
docker compose exec backend npx prisma migrate deploy

# View logs
docker compose logs -f
```

### Step 4: Setup SSL with Docker

```bash
# Initial certificate request
docker compose run --rm certbot certonly --webroot \
  -w /var/www/certbot \
  -d forevershine.com.np \
  -d www.forevershine.com.np \
  --email admin@forevershine.com.np \
  --agree-tos \
  --no-eff-email

# Restart nginx to use certificates
docker compose restart nginx
```

---

## ✅ Post-Deployment

### 1. Initialize Database

```bash
# SSH into VPS
ssh forevershine@your-vps-ip

# Navigate to backend
cd /var/www/forevershine/current/backend

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

### 2. Create Admin User

The admin user is created automatically with credentials from `.env`:
- Email: From `ADMIN_EMAIL`
- Password: From `ADMIN_PASSWORD`

**Change the default password immediately!**

### 3. Verify Services

```bash
# Check PM2 services
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check PostgreSQL
sudo systemctl status postgresql

# View application logs
pm2 logs forevershine-backend
pm2 logs forevershine-frontend
```

### 4. Test Website

1. Visit `https://forevershine.com.np`
2. Visit `https://forevershine.com.np/admin` and login
3. Test image uploads
4. Test contact form
5. Check blog functionality

### 5. Configure Monitoring

```bash
# Setup PM2 monitoring
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# Enable PM2 startup
pm2 startup
pm2 save
```

---

## 🔧 Maintenance

### Daily Tasks

**Monitor Logs:**
```bash
# PM2 logs
pm2 logs --lines 100

# Nginx logs
sudo tail -f /var/log/nginx/forevershine-error.log

# System logs
journalctl -f
```

**Check Service Health:**
```bash
pm2 status
sudo systemctl status nginx
sudo systemctl status postgresql
```

### Weekly Tasks

**Database Backup:**
```bash
# Create backup directory
mkdir -p /var/backups/postgres

# Backup database
sudo -u postgres pg_dump forever_shine_db > /var/backups/postgres/backup_$(date +%Y%m%d).sql

# Compress backup
gzip /var/backups/postgres/backup_$(date +%Y%m%d).sql
```

**Update System:**
```bash
sudo apt-get update
sudo apt-get upgrade -y
```

### Monthly Tasks

**SSL Certificate Renewal:**
```bash
# Certificates auto-renew, but verify:
sudo certbot renew --dry-run
```

**Clean Old Backups:**
```bash
# Keep only last 30 days of backups
find /var/backups/postgres -name "*.sql.gz" -mtime +30 -delete
```

**Security Audit:**
```bash
# Check fail2ban status
sudo fail2ban-client status

# Review UFW rules
sudo ufw status verbose
```

---

## 🆘 Troubleshooting

### Issue: Deployment Failed

**Check GitHub Actions logs:**
1. Go to repository → Actions tab
2. Click on failed workflow
3. Review error messages

**Common causes:**
- SSH connection issues
- Missing secrets
- Build errors
- Permission issues

### Issue: Website Not Accessible

**Check Nginx:**
```bash
sudo nginx -t
sudo systemctl status nginx
sudo systemctl restart nginx
```

**Check DNS:**
```bash
nslookup forevershine.com.np
dig forevershine.com.np
```

**Check Firewall:**
```bash
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Issue: API Not Working

**Check Backend Service:**
```bash
pm2 status
pm2 logs forevershine-backend
pm2 restart forevershine-backend
```

**Check Database Connection:**
```bash
sudo -u postgres psql -d forever_shine_db -c "SELECT version();"
```

**Test API Endpoint:**
```bash
curl http://localhost:5000/api/health
```

### Issue: Database Migration Failed

**Rollback Migration:**
```bash
cd /var/www/forevershine/current/backend
npx prisma migrate resolve --rolled-back <migration-name>
```

**Reset Database (CAUTION!):**
```bash
npx prisma migrate reset
```

### Issue: SSL Certificate Issues

**Renew Certificate:**
```bash
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

**Check Certificate Status:**
```bash
sudo certbot certificates
```

### Rollback Deployment

If deployment causes issues:

```bash
# Option 1: Using rollback script
./deployment/rollback.sh

# Option 2: Manual rollback
ssh forevershine@your-vps-ip
cd /var/www/forevershine
ls -la  # Find latest backup
mv current current_failed
mv backup_YYYYMMDD_HHMMSS current
pm2 restart ecosystem.config.js
```

---

## 📞 Support

### Logs Location
- **PM2 Logs**: `/var/log/forevershine/`
- **Nginx Logs**: `/var/log/nginx/`
- **System Logs**: `/var/log/syslog`

### Useful Commands

```bash
# Restart all services
pm2 restart all

# Reload Nginx
sudo systemctl reload nginx

# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
ps aux | grep node

# Database console
sudo -u postgres psql -d forever_shine_db
```

---

## 🎉 Deployment Complete!

Your Forever Shine Engineering website is now live with:
- ✅ Automated CI/CD pipeline
- ✅ Nginx reverse proxy
- ✅ SSL/TLS encryption
- ✅ PM2 process management
- ✅ Database backups
- ✅ Security hardening
- ✅ Monitoring and logging

**Next Steps:**
1. Configure email notifications for deployments
2. Setup uptime monitoring (e.g., UptimeRobot)
3. Configure automated backups to remote storage
4. Setup performance monitoring (e.g., New Relic, Datadog)
5. Implement CDN for static assets (optional)

---

**Last Updated**: October 15, 2025  
**Version**: 1.0.0
