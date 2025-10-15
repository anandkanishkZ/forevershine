#!/bin/bash

###############################################################################
# Forever Shine Engineering - Rollback Script
# Rollback to previous deployment
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
VPS_HOST="${VPS_HOST:-your-vps-ip}"
VPS_USER="${VPS_USER:-forevershine}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/forevershine}"

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info "Starting rollback..."

ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
    set -e
    cd ${DEPLOY_PATH}
    
    # Find most recent backup
    latest_backup=$(ls -dt backup_* 2>/dev/null | head -n 1)
    
    if [ -z "$latest_backup" ]; then
        echo "ERROR: No backup found for rollback!"
        exit 1
    fi
    
    echo "Rolling back to: $latest_backup"
    
    # Archive current failed deployment
    if [ -d "current" ]; then
        failed_timestamp=$(date +%Y%m%d_%H%M%S)
        mv current failed_${failed_timestamp}
    fi
    
    # Restore backup
    mv $latest_backup current
    
    # Restart services
    cd current
    pm2 restart ecosystem.config.js
    pm2 save
    
    echo "Rollback completed successfully!"
ENDSSH

print_success "Rollback completed!"
