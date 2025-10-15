#!/bin/bash

###############################################################################
# Forever Shine Engineering - SSL Certificate Setup
# Setup Let's Encrypt SSL certificates with Certbot
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

DOMAIN="forevershine.com.np"
API_DOMAIN="api.forevershine.com.np"
EMAIL="admin@forevershine.com.np"

print_info "Setting up SSL certificates for ${DOMAIN} and ${API_DOMAIN}..."

# Check if Certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
fi

# Obtain certificate for main domain
print_info "Obtaining SSL certificate for main domain..."
sudo certbot --nginx \
    -d ${DOMAIN} \
    -d www.${DOMAIN} \
    --email ${EMAIL} \
    --agree-tos \
    --no-eff-email \
    --redirect

# Obtain certificate for API subdomain
print_info "Obtaining SSL certificate for API subdomain..."
sudo certbot --nginx \
    -d ${API_DOMAIN} \
    --email ${EMAIL} \
    --agree-tos \
    --no-eff-email \
    --redirect

# Test auto-renewal
print_info "Testing certificate auto-renewal..."
sudo certbot renew --dry-run

print_success "SSL certificate setup completed!"
print_info "Certificates will auto-renew via cron job"

# Display certificate info
sudo certbot certificates
