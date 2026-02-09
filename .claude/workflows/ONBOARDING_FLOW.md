cat > ~/.claude/workflows/ONBOARDING_FLOW.md << 'EOF'

# Onboarding Flow für neue Projekte

## Schritt 1: Projekt-Informationen

Stelle folgende Fragen nacheinander:

1. **Projektname (slug)**
   - Format: kebab-case
   - Beispiel: "mustermann-consulting"
   - Speichere als: `PROJECT_SLUG`

2. **Display Name**
   - Beispiel: "Mustermann Consulting GmbH"
   - Speichere als: `PROJECT_NAME`

3. **Primärfarbe**
   - Format: Hex-Code mit #
   - Beispiel: "#1E40AF"
   - Speichere als: `PRIMARY_COLOR`

4. **Sekundärfarbe**
   - Format: Hex-Code mit #
   - Beispiel: "#F59E0B"
   - Speichere als: `SECONDARY_COLOR`

5. **Heading Font**
   - Beispiel: "Inter", "Poppins", "Montserrat"
   - Speichere als: `HEADING_FONT`

6. **Body Font**
   - Beispiel: "Inter", "Open Sans", "Roboto"
   - Speichere als: `BODY_FONT`

## Schritt 2: Repository Setup

```bash
# Navigiere zum Projekt-Verzeichnis
cd /var/www/projects

# Clone Template
git clone <TEMPLATE_REPO_URL> ${PROJECT_SLUG}
cd ${PROJECT_SLUG}

# 1. ⚠️ WICHTIG: Dependencies installieren BEVOR mit Entwicklung begonnen wird
pnpm install

# 2. ⚠️ STOLPERSTEIN: Altes Remote entfernen (vom geclonten Template)
git remote remove origin

# 3. Neues PRIVATES GitHub Repository erstellen und verbinden
# Dies erstellt automatisch ein privates Repo auf GitHub
gh repo create ${PROJECT_SLUG} --private --source=. --remote=origin

# 4. Initial Commit für das neue Repository
git add .
git commit -m "chore: Initial commit from template

Project: ${PROJECT_NAME}
Slug: ${PROJECT_SLUG}

- Cloned from CMS template
- Dependencies installed (pnpm)
- Ready for customization"

# 5. Push zum neuen privaten GitHub Repository
git push -u origin main

# 6. Initial Vercel Deployment (wird crashen - ERWARTET!)
vercel deploy --prod --yes

# ⚠️ DEPLOYMENT WIRD FEHLSCHLAGEN - DAS IST NORMAL!
# Grund: Keine Datenbank/Storage konfiguriert
# Vercel Projekt wird aber erstellt

# 7. Clone Relume Components als Referenz
git clone https://github.com/FullStackSimonIO/relume-components.git .relume-reference
```

**⚠️ CLI Authentifizierung:**

**GitHub CLI:**
```bash
gh auth status  # Prüfen
gh auth login   # Falls nötig: GitHub.com → HTTPS → Browser
```

**Vercel CLI:**
```bash
vercel whoami   # Prüfen
vercel login    # Falls nötig: Browser-Auth
```

---

## Schritt 3: 🛑 MANUELLER HALT - Database & Storage Setup

**Das Deployment ist gecrasht - das ist ERWARTET und KORREKT!**

### Manuelle Schritte im Vercel Dashboard:

1. **Öffne Vercel Dashboard:**
   - URL: https://vercel.com/dashboard
   - Oder: `vercel dashboard` im Terminal

2. **Navigiere zu Projekt:** `${PROJECT_SLUG}`

3. **Storage Tab öffnen**

4. **Erstelle Neon Postgres Datenbank:**
   - Button: "Create Database"
   - Typ: "Neon Postgres"
   - Click: "Continue"
   - Click: "Create"
   - ⏳ Warte bis Status: **"Connected"** ✅

5. **Erstelle Vercel Blob Storage:**
   - Button: "Create Store"
   - Typ: "Blob"
   - Click: "Continue"
   - Click: "Create"
   - ⏳ Warte bis Status: **"Connected"** ✅

### ✋ HALT HIER!

**Sage jetzt im Chat: "go" oder "weiter"**

---

## Schritt 4: 🚀 Environment Setup (nach "go" Signal)

**⚠️ Dieser Schritt wird automatisch nach User "go" ausgeführt!**

```bash
# 1. Vercel Projekt verlinken
vercel link --yes

# 2. Environment Variables von Vercel pullen
vercel env pull .env.local

# 3. PayloadCMS Secrets generieren
echo "" >> .env.local
echo "# PayloadCMS Secrets (auto-generated)" >> .env.local
echo "PAYLOAD_SECRET=$(openssl rand -base64 32)" >> .env.local
echo "CRON_SECRET=$(openssl rand -base64 32)" >> .env.local
echo "PREVIEW_SECRET=$(openssl rand -base64 32)" >> .env.local

# 4. Secrets zu Vercel pushen
cat .env.local | grep PAYLOAD_SECRET | cut -d '=' -f2 | vercel env add PAYLOAD_SECRET production
cat .env.local | grep CRON_SECRET | cut -d '=' -f2 | vercel env add CRON_SECRET production
cat .env.local | grep PREVIEW_SECRET | cut -d '=' -f2 | vercel env add PREVIEW_SECRET production

# 5. Final Deployment mit allen Secrets
vercel deploy --prod --yes
```

### Erwartete .env.local Struktur:

```env
# Neon Postgres (von Vercel)
POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...

# Vercel Blob Storage (von Vercel)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# PayloadCMS Secrets (generiert)
PAYLOAD_SECRET=aBcD1234...
CRON_SECRET=XyZ9876...
PREVIEW_SECRET=qWeRty456...
```

### Verification:

```bash
# .env.local prüfen
cat .env.local

# Vercel Environment Variables prüfen
vercel env ls

# Final Deployment Status
vercel inspect
```

## Schritt 5: Branding-Konfiguration

Erstelle: `src/config/branding.ts`

```typescript
export const branding = {
  name: '${PROJECT_NAME}',
  slug: '${PROJECT_SLUG}',
  colors: {
    primary: '${PRIMARY_COLOR}',
    secondary: '${SECONDARY_COLOR}',
  },
  fonts: {
    heading: '${HEADING_FONT}',
    body: '${BODY_FONT}',
  },
}
```

Update: `tailwind.config.js`

```javascript
colors: {
  primary: '${PRIMARY_COLOR}',
  secondary: '${SECONDARY_COLOR}',
}
```

## Schritt 6: Zusammenfassung

Zeige dem User:

```
🎉 Setup komplett! Projekt bereit für Entwicklung!

✓ Projekt erstellt: ${PROJECT_NAME}
✓ Repository: ${PROJECT_SLUG}
✓ GitHub Repository: https://github.com/<ORG>/${PROJECT_SLUG} (PRIVATE)
✓ Initial Commit gepusht
✓ Dependencies installiert (pnpm)

✓ Vercel Setup KOMPLETT:
  - Production URL: https://${PROJECT_SLUG}.vercel.app
  - Admin Panel: https://${PROJECT_SLUG}.vercel.app/admin
  - Database: Neon Postgres ✓ Connected
  - Storage: Vercel Blob ✓ Connected
  - Env Variables: .env.local ✓ (${VARIABLE_COUNT} vars)
  - Build Status: ✅ SUCCESS
  - Deployment: 🟢 LIVE

✓ Environment Variables (.env.local):
  - POSTGRES_URL ✓
  - BLOB_READ_WRITE_TOKEN ✓
  - PAYLOAD_SECRET ✓ (generated)
  - CRON_SECRET ✓ (generated)
  - PREVIEW_SECRET ✓ (generated)

✓ Branding konfiguriert:
  - Primary: ${PRIMARY_COLOR}
  - Secondary: ${SECONDARY_COLOR}
  - Fonts: ${HEADING_FONT} / ${BODY_FONT}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 JETZT BEREIT FÜR HERO & BLOCK ENTWICKLUNG!

Nächste Schritte:
1. Hero-Komponenten auswählen und entwickeln
2. Content-Blöcke definieren und integrieren
3. Optional: Zusätzliche Collections
4. Navbar & Footer Integration

Dev-Server starten:
  pnpm dev
  → http://localhost:3000
  → http://localhost:3000/admin
```

EOF
