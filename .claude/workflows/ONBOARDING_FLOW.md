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

# Entferne alte Git-Historie
rm -rf .git

# Initialisiere neues Repository
git init
git remote add origin https://github.com/<ORG>/${PROJECT_SLUG}.git

# Clone Relume Components als Referenz
git clone https://github.com/FullStackSimonIO/relume-components.git .relume-reference
```

## Schritt 3: Branding-Konfiguration

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

## Schritt 4: Zusammenfassung

Zeige dem User:

```
✓ Projekt erstellt: ${PROJECT_NAME}
✓ Repository: ${PROJECT_SLUG}
✓ Branding konfiguriert
  - Primary: ${PRIMARY_COLOR}
  - Secondary: ${SECONDARY_COLOR}
  - Fonts: ${HEADING_FONT} / ${BODY_FONT}

Nächste Schritte:
1. Hero-Komponenten auswählen
2. Content-Blöcke definieren
3. Optional: Zusätzliche Collections
```

EOF
