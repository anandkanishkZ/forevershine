#!/bin/bash

###############################################################################
# Forever Shine Engineering - VPS Initial Setup Script
# This script prepares a fresh Ubuntu/Debian VPS for deployment
###############################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="forevershine"
APP_USER="forevershine"
APP_DIR="/var/www/forevershine"
DOMAIN="forevershine.com.np"
DB_NAME="forever_shine_db"
NODE_VERSION="18"

# Functions
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if script is run as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root (use sudo)"
   exit 1
fi

print_info "Starting VPS setup for Forever Shine Engineering..."

# Update system
print_info "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install essential packages
print_info "Installing essential packages..."
apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    software-properties-common \
    ufw \
    fail2ban \
    certbot \
    python3-certbot-nginx \
    htop \
    nano \
    vim \
    unzip

print_success "Essential packages installed"

# Install Node.js
print_info "Installing Node.js ${NODE_VERSION}..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt-get install -y nodejs

# Verify installation
node_version=$(node -v)
npm_version=$(npm -v)
print_success "Node.js ${node_version} and npm ${npm_version} installed"

# Install PM2 globally
print_info "Installing PM2 process manager..."
npm install -g pm2
pm2 startup systemd -u ${APP_USER} --hp /home/${APP_USER}
print_success "PM2 installed"

# Install PostgreSQL
print_info "Installing PostgreSQL..."
apt-get install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
systemctl start postgresql
systemctl enable postgresql

print_success "PostgreSQL installed and started"

# Create PostgreSQL database and user
print_info "Setting up PostgreSQL database..."
sudo -u postgres psql <<EOF
CREATE DATABASE ${DB_NAME};
CREATE USER ${APP_USER} WITH ENCRYPTED PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${APP_USER};
ALTER DATABASE ${DB_NAME} OWNER TO ${APP_USER};
\q
EOF

print_success "Database created: ${DB_NAME}"
print_warning "Remember to change the database password!"

# Install Nginx
print_info "Installing Nginx..."
apt-get install -y nginx

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx

print_success "Nginx installed and started"

# Create application user
print_info "Creating application user: ${APP_USER}..."
if id "${APP_USER}" &>/dev/null; then
    print_warning "User ${APP_USER} already exists"
else
    useradd -m -s /bin/bash ${APP_USER}
    print_success "User ${APP_USER} created"
fi

# Create application directory
print_info "Creating application directory..."
mkdir -p ${APP_DIR}
mkdir -p ${APP_DIR}/current
mkdir -p ${APP_DIR}/releases
mkdir -p /var/log/${APP_NAME}

# Set ownership
chown -R ${APP_USER}:${APP_USER} ${APP_DIR}
chown -R ${APP_USER}:${APP_USER} /var/log/${APP_NAME}

print_success "Application directories created"

# Configure firewall (UFW)
print_info "Configuring firewall..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw allow 80/tcp
ufw allow 443/tcp

print_success "Firewall configured"

# Configure fail2ban
print_info "Configuring fail2ban..."
systemctl start fail2ban
systemctl enable fail2ban

cat > /etc/fail2ban/jail.local <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
EOF

systemctl restart fail2ban
print_success "fail2ban configured"

# Generate DH parameters for Nginx
print_info "Generating Diffie-Hellman parameters (this may take a while)..."
mkdir -p /etc/nginx/ssl
openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048
print_success "DH parameters generated"

# Create Nginx site configuration directory
print_info "Preparing Nginx configuration..."
mkdir -p /etc/nginx/sites-available
mkdir -p /etc/nginx/sites-enabled
rm -f /etc/nginx/sites-enabled/default

print_success "Nginx directories prepared"

# Create systemd service for the application (alternative to PM2)
print_info "Creating systemd service files..."

cat > /etc/systemd/system/${APP_NAME}-backend.service <<EOF
[Unit]
Description=Forever Shine Engineering Backend API
After=network.target postgresql.service

[Service]
Type=simple
User=${APP_USER}
WorkingDirectory=${APP_DIR}/current/backend
Environment=NODE_ENV=production
ExecStart=/usr/bin/node dist/server.js
Restart=always
RestartSec=10
StandardOutput=append:/var/log/${APP_NAME}/backend-out.log
StandardError=append:/var/log/${APP_NAME}/backend-error.log

[Install]
WantedBy=multi-user.target
EOF

cat > /etc/systemd/system/${APP_NAME}-frontend.service <<EOF
[Unit]
Description=Forever Shine Engineering Frontend
After=network.target

[Service]
Type=simple
User=${APP_USER}
WorkingDirectory=${APP_DIR}/current/frontend
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=append:/var/log/${APP_NAME}/frontend-out.log
StandardError=append:/var/log/${APP_NAME}/frontend-error.log

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
print_success "Systemd services created"

# Setup log rotation
print_info "Configuring log rotation..."
cat > /etc/logrotate.d/${APP_NAME} <<EOF
/var/log/${APP_NAME}/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0640 ${APP_USER} ${APP_USER}
    sharedscripts
    postrotate
        systemctl reload nginx > /dev/null 2>&1 || true
    endscript
}
EOF

print_success "Log rotation configured"

# Create environment file template
print_info "Creating environment file template..."
cat > ${APP_DIR}/.env.template <<'EOF'
# Production Environment Variables
NODE_ENV=production

# Backend Configuration
PORT=5000
DATABASE_URL="postgresql://forevershine:YOUR_PASSWORD@localhost:5432/forever_shine_db"

# JWT Secrets (GENERATE NEW SECRETS!)
JWT_SECRET=CHANGE_THIS_TO_RANDOM_SECRET
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=CHANGE_THIS_TO_ANOTHER_RANDOM_SECRET
JWT_REFRESH_EXPIRES_IN=7d

# Admin Credentials
ADMIN_EMAIL=admin@forevershine.com.np
ADMIN_PASSWORD=CHANGE_THIS_PASSWORD

# Upload Configuration
UPLOAD_PATH=/var/www/forevershine/backend/uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=jpeg,jpg,png,webp

# CORS
FRONTEND_URL=https://forevershine.com.np

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_WINDOW_MS=900000
AUTH_RATE_LIMIT_MAX_ATTEMPTS=5
CONTACT_RATE_LIMIT_WINDOW_MS=3600000
CONTACT_RATE_LIMIT_MAX_SUBMISSIONS=3
UPLOAD_RATE_LIMIT_WINDOW_MS=900000
UPLOAD_RATE_LIMIT_MAX_UPLOADS=20
PASSWORD_RATE_LIMIT_WINDOW_MS=3600000
PASSWORD_RATE_LIMIT_MAX_ATTEMPTS=3
PUBLIC_RATE_LIMIT_WINDOW_MS=60000
PUBLIC_RATE_LIMIT_MAX_REQUESTS=30
EOF

chown ${APP_USER}:${APP_USER} ${APP_DIR}/.env.template
print_success "Environment template created at ${APP_DIR}/.env.template"

# Security: Disable root SSH login
print_info "Hardening SSH security..."
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart sshd
print_success "SSH hardened (root login disabled)"

# Install and configure automatic security updates
print_info "Configuring automatic security updates..."
apt-get install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
print_success "Automatic security updates enabled"

# Print summary
echo ""
echo "========================================"
print_success "VPS SETUP COMPLETED!"
echo "========================================"
echo ""
print_info "Next Steps:"
echo "1. Setup SSH key authentication for ${APP_USER}"
echo "2. Configure GitHub Actions secrets:"
echo "   - VPS_HOST: Your VPS IP address"
echo "   - VPS_USER: ${APP_USER}"
echo "   - VPS_SSH_PRIVATE_KEY: Your SSH private key"
echo "   - DEPLOY_PATH: ${APP_DIR}"
echo "3. Copy deployment/nginx.conf to /etc/nginx/sites-available/${APP_NAME}"
echo "4. Enable Nginx site: ln -s /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/"
echo "5. Setup SSL certificate:"
echo "   sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
echo "6. Edit ${APP_DIR}/.env.template and save as backend/.env"
echo "7. Generate new JWT secrets:"
echo "   node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\""
echo "8. Change database password for user ${APP_USER}"
echo "9. Push code to GitHub to trigger deployment"
echo ""
print_warning "Important: Review and update all passwords and secrets!"
echo ""
print_info "Installation Details:"
echo "- Node.js version: $(node -v)"
echo "- npm version: $(npm -v)"
echo "- PostgreSQL: $(psql --version)"
echo "- Nginx: $(nginx -v 2>&1)"
echo "- PM2: $(pm2 -v)"
echo ""
print_success "Setup script completed successfully!"
