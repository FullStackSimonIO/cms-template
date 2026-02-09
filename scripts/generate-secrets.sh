#!/bin/bash
# Generate secure secrets for Payload CMS
# This script generates secrets without any whitespace or newlines

set -e

echo "Generating PayloadCMS secrets..."

# Generate secrets using hex to avoid whitespace issues
PAYLOAD_SECRET=$(openssl rand -hex 32)
CRON_SECRET=$(openssl rand -hex 32)
PREVIEW_SECRET=$(openssl rand -hex 32)

# Verify no whitespace
if [[ "$PAYLOAD_SECRET" =~ [[:space:]] ]] || [[ "$CRON_SECRET" =~ [[:space:]] ]] || [[ "$PREVIEW_SECRET" =~ [[:space:]] ]]; then
    echo "❌ Error: Generated secrets contain whitespace!"
    exit 1
fi

echo "✅ Secrets generated successfully (no whitespace)"
echo ""
echo "PAYLOAD_SECRET=$PAYLOAD_SECRET"
echo "CRON_SECRET=$CRON_SECRET"
echo "PREVIEW_SECRET=$PREVIEW_SECRET"
