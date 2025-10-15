#!/bin/bash

###############################################################################
# Database Backup Script
# Automate PostgreSQL database backups
###############################################################################

set -e

# Configuration
DB_NAME="forever_shine_db"
DB_USER="forevershine"
BACKUP_DIR="/var/backups/postgres"
RETENTION_DAYS=30
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/forever_shine_${TIMESTAMP}.sql"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Create backup directory
mkdir -p ${BACKUP_DIR}

print_info "Starting database backup..."

# Create backup
sudo -u postgres pg_dump ${DB_NAME} > ${BACKUP_FILE}

# Compress backup
print_info "Compressing backup..."
gzip ${BACKUP_FILE}

BACKUP_FILE="${BACKUP_FILE}.gz"

# Check file size
BACKUP_SIZE=$(du -h ${BACKUP_FILE} | cut -f1)
print_success "Backup created: ${BACKUP_FILE} (${BACKUP_SIZE})"

# Remove old backups
print_info "Removing backups older than ${RETENTION_DAYS} days..."
find ${BACKUP_DIR} -name "forever_shine_*.sql.gz" -mtime +${RETENTION_DAYS} -delete

# Count remaining backups
BACKUP_COUNT=$(ls -1 ${BACKUP_DIR}/forever_shine_*.sql.gz 2>/dev/null | wc -l)
print_success "Total backups: ${BACKUP_COUNT}"

# Optional: Upload to remote storage (uncomment and configure)
# print_info "Uploading to remote storage..."
# scp ${BACKUP_FILE} user@remote-server:/path/to/backups/
# Or use AWS S3, Google Cloud Storage, etc.

print_success "Backup completed successfully!"

# Setup cron job (run manually once)
# Add to crontab: crontab -e
# Daily at 2 AM: 0 2 * * * /path/to/backup-database.sh >> /var/log/forevershine/backup.log 2>&1
