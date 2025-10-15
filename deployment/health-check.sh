#!/bin/bash

###############################################################################
# Health Check Script
# Monitor application health and services
###############################################################################

# Configuration
SITE_URL="https://forevershine.com.np"
API_URL="${SITE_URL}/api"
SLACK_WEBHOOK="" # Optional: Add Slack webhook for notifications

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_ok() {
    echo -e "${GREEN}✓${NC} $1"
}

print_fail() {
    echo -e "${RED}✗${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

FAILED=0

echo "============================================"
echo "Forever Shine Engineering - Health Check"
echo "============================================"
echo ""

# Check website
echo "Checking website..."
SITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" ${SITE_URL} 2>/dev/null || echo "000")
if [ "$SITE_STATUS" = "200" ]; then
    print_ok "Website is accessible (HTTP $SITE_STATUS)"
else
    print_fail "Website is not accessible (HTTP $SITE_STATUS)"
    FAILED=$((FAILED + 1))
fi

# Check API
echo "Checking API..."
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" ${API_URL}/health 2>/dev/null || echo "000")
if [ "$API_STATUS" = "200" ]; then
    print_ok "API is responding (HTTP $API_STATUS)"
else
    print_fail "API is not responding (HTTP $API_STATUS)"
    FAILED=$((FAILED + 1))
fi

# Check PM2 processes
echo "Checking PM2 processes..."
if command -v pm2 &> /dev/null; then
    PM2_STATUS=$(pm2 jlist 2>/dev/null)
    BACKEND_STATUS=$(echo $PM2_STATUS | grep -o '"name":"forevershine-backend"[^}]*"status":"[^"]*"' | grep -o 'online' || echo "offline")
    FRONTEND_STATUS=$(echo $PM2_STATUS | grep -o '"name":"forevershine-frontend"[^}]*"status":"[^"]*"' | grep -o 'online' || echo "offline")
    
    if [ "$BACKEND_STATUS" = "online" ]; then
        print_ok "Backend service is running"
    else
        print_fail "Backend service is not running"
        FAILED=$((FAILED + 1))
    fi
    
    if [ "$FRONTEND_STATUS" = "online" ]; then
        print_ok "Frontend service is running"
    else
        print_fail "Frontend service is not running"
        FAILED=$((FAILED + 1))
    fi
else
    print_warn "PM2 not installed or not accessible"
fi

# Check Nginx
echo "Checking Nginx..."
if systemctl is-active --quiet nginx; then
    print_ok "Nginx is running"
else
    print_fail "Nginx is not running"
    FAILED=$((FAILED + 1))
fi

# Check PostgreSQL
echo "Checking PostgreSQL..."
if systemctl is-active --quiet postgresql; then
    print_ok "PostgreSQL is running"
else
    print_fail "PostgreSQL is not running"
    FAILED=$((FAILED + 1))
fi

# Check disk space
echo "Checking disk space..."
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    print_ok "Disk usage is ${DISK_USAGE}%"
elif [ "$DISK_USAGE" -lt 90 ]; then
    print_warn "Disk usage is ${DISK_USAGE}%"
else
    print_fail "Disk usage is critical: ${DISK_USAGE}%"
    FAILED=$((FAILED + 1))
fi

# Check memory
echo "Checking memory..."
MEMORY_USAGE=$(free | grep Mem | awk '{print int($3/$2 * 100)}')
if [ "$MEMORY_USAGE" -lt 80 ]; then
    print_ok "Memory usage is ${MEMORY_USAGE}%"
elif [ "$MEMORY_USAGE" -lt 90 ]; then
    print_warn "Memory usage is ${MEMORY_USAGE}%"
else
    print_fail "Memory usage is high: ${MEMORY_USAGE}%"
fi

# Check SSL certificate
echo "Checking SSL certificate..."
if command -v certbot &> /dev/null; then
    CERT_EXPIRY=$(sudo certbot certificates 2>/dev/null | grep "Expiry Date" | head -1 | awk '{print $3}')
    if [ -n "$CERT_EXPIRY" ]; then
        DAYS_LEFT=$(( ($(date -d "$CERT_EXPIRY" +%s) - $(date +%s)) / 86400 ))
        if [ "$DAYS_LEFT" -gt 30 ]; then
            print_ok "SSL certificate expires in $DAYS_LEFT days"
        elif [ "$DAYS_LEFT" -gt 7 ]; then
            print_warn "SSL certificate expires in $DAYS_LEFT days"
        else
            print_fail "SSL certificate expires in $DAYS_LEFT days - renewal needed!"
            FAILED=$((FAILED + 1))
        fi
    else
        print_warn "Could not determine SSL certificate expiry"
    fi
fi

echo ""
echo "============================================"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All checks passed!${NC}"
    exit 0
else
    echo -e "${RED}$FAILED check(s) failed!${NC}"
    
    # Optional: Send Slack notification
    if [ -n "$SLACK_WEBHOOK" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"⚠️ Forever Shine Engineering health check failed: $FAILED issue(s) detected\"}" \
            $SLACK_WEBHOOK
    fi
    
    exit 1
fi
