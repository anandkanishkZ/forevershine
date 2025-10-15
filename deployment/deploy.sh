#!/bin/bash

###############################################################################
# Forever Shine Engineering - Manual Deployment Script
# Use this for manual deployments without GitHub Actions
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration (customize these)
VPS_HOST="${VPS_HOST:-your-vps-ip}"
VPS_USER="${VPS_USER:-forevershine}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/forevershine}"
BRANCH="${BRANCH:-main}"

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the project root
if [ ! -f "ecosystem.config.js" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_info "Starting deployment to VPS..."

# Build locally
print_info "Building backend..."
cd backend
npm ci
npm run build
cd ..

print_info "Building frontend..."
cd frontend
npm ci
npm run build
cd ..

# Create deployment package
print_info "Creating deployment package..."
tar -czf deploy-package.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=.next/cache \
    backend/ \
    frontend/ \
    ecosystem.config.js

print_success "Deployment package created"

# Copy to VPS
print_info "Uploading to VPS..."
scp deploy-package.tar.gz ${VPS_USER}@${VPS_HOST}:${DEPLOY_PATH}/

# Deploy on VPS
print_info "Deploying on VPS..."
ssh ${VPS_USER}@${VPS_HOST} << ENDSSH
    set -e
    cd ${DEPLOY_PATH}
    
    # Backup current deployment
    if [ -d "current" ]; then
        timestamp=\$(date +%Y%m%d_%H%M%S)
        echo "Creating backup: backup_\${timestamp}"
        mv current backup_\${timestamp}
        
        # Keep only last 3 backups
        ls -dt backup_* | tail -n +4 | xargs rm -rf 2>/dev/null || true
    fi
    
    # Extract new deployment
    echo "Extracting deployment package..."
    mkdir -p current
    tar -xzf deploy-package.tar.gz -C current
    rm deploy-package.tar.gz
    
    # Install backend dependencies
    echo "Installing backend dependencies..."
    cd current/backend
    npm ci --production
    npm run db:generate
    
    # Install frontend dependencies
    echo "Installing frontend dependencies..."
    cd ../frontend
    npm ci --production
    
    # Restart services with PM2
    echo "Restarting services..."
    cd ..
    pm2 restart ecosystem.config.js --update-env
    pm2 save
    
    echo "Deployment completed successfully!"
ENDSSH

# Cleanup local package
rm deploy-package.tar.gz

print_success "Deployment completed successfully!"
print_info "Run database migrations if needed:"
echo "ssh ${VPS_USER}@${VPS_HOST} 'cd ${DEPLOY_PATH}/current/backend && npm run db:migrate'"
