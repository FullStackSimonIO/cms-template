# Setup Guide

## Environment Variables

This project requires the following secret environment variables:

- `PAYLOAD_SECRET` - Used by Payload to sign JWT tokens
- `CRON_SECRET` - Used for running cron jobs on Vercel
- `PREVIEW_SECRET` - Used for secured live previews

### ⚠️ Important: Secrets Must Not Contain Whitespace

The secrets must be valid HTTP header values and **cannot contain leading or trailing whitespace, newlines, or other control characters**.

### Generating Secrets

#### Option 1: Using the provided script (Recommended)

```bash
./scripts/generate-secrets.sh
```

This will output three secure secrets that you can copy into your `.env.local` file.

#### Option 2: Manual generation

Use `openssl rand -hex 32` to generate hex strings (no whitespace):

```bash
# Generate and add to .env.local
echo "PAYLOAD_SECRET=$(openssl rand -hex 32)" >> .env.local
echo "CRON_SECRET=$(openssl rand -hex 32)" >> .env.local
echo "PREVIEW_SECRET=$(openssl rand -hex 32)" >> .env.local
```

⚠️ **Do NOT use** `openssl rand -base64 32` as it may produce strings with newlines or padding characters.

#### Option 3: For Vercel deployment

When pushing secrets to Vercel, always trim whitespace:

```bash
# Trim whitespace before pushing to Vercel
cat .env.local | grep PAYLOAD_SECRET | cut -d '=' -f2 | tr -d '[:space:]' | vercel env add PAYLOAD_SECRET production
cat .env.local | grep CRON_SECRET | cut -d '=' -f2 | tr -d '[:space:]' | vercel env add CRON_SECRET production
cat .env.local | grep PREVIEW_SECRET | cut -d '=' -f2 | tr -d '[:space:]' | vercel env add PREVIEW_SECRET production
```

## Complete Setup Flow

For detailed onboarding instructions, see `.claude/workflows/ONBOARDING_FLOW.md`
