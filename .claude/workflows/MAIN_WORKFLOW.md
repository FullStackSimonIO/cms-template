# Fullstack Factory - Website Entwicklungs-Workflow

## TRIGGER

Keywords: "neue Website", "neues Projekt", "Website erstellen"

## WORKFLOW ÜBERSICHT

```
Phase 1: Projekt-Setup
    ↓
Phase 2: Navbar & Footer Integration
    ↓
Phase 3: Hero & Komponenten
    ↓
Phase 4: Collections & Features
    ↓
Phase 5: Deployment
```

---

## Phase 1: Projekt-Setup

### Schritt 1.1: Onboarding durchführen

**Siehe:** `ONBOARDING_FLOW.md`

**Informationen sammeln:**

- Projektname (slug)
- Display Name
- Primärfarbe
- Sekundärfarbe
- Heading Font
- Body Font

### Schritt 1.2: Repository Setup

```bash
cd /var/www/projects
git clone <TEMPLATE_REPO_URL> ${PROJECT_SLUG}
cd ${PROJECT_SLUG}
rm -rf .git
git init
git remote add origin https://github.com/<ORG>/${PROJECT_SLUG}.git

# Clone Relume Components als Referenz
git clone https://github.com/FullStackSimonIO/relume-components.git .relume-reference
```

### Schritt 1.3: Branding-Konfiguration

**Erstelle:** `src/config/branding.ts`

**Update:** `tailwind.config.js` mit Branding-Farben

---

## Phase 2: Navbar & Footer Integration

### Schritt 2.1: Navbar-Auswahl

**Wenn Navbar nicht spezifiziert wurde, frage:**

```
Welche Navbar möchten Sie aus dem Relume-Components Repository verwenden?

Verfügbare Optionen (Beispiele):
- Navbar1 - Einfache horizontale Navigation
- Navbar2 - Navigation mit Mega-Menu
- Navbar3 - Zentriertes Logo
- Navbar4 - Minimalistisch

Bitte geben Sie den Namen an, z.B. "Navbar1"
```

### Schritt 2.2: Navbar Integration durchführen

**Siehe:** `NAVBAR_DEVELOPMENT_GUIDE.md`

**Wichtige Schritte:**

1. ✅ **Alte Navbar vollständig entfernen**

   ```bash
   # Lösche alte Navbar
   rm -rf src/components/Navbar/

   # Suche nach Importen
   grep -r "from '@/components/Navbar'" src/

   # Entferne aus Layout
   # Bearbeite src/app/(app)/layout.tsx
   ```

2. ✅ **Relume Navbar lokalisieren**

   ```bash
   find .relume-reference -iname "*navbar1*"
   ```

3. ✅ **Header Global erstellen**
   - Datei: `src/globals/Header.ts`
   - Fields: navbarType, logo, navLinks, buttons
   - Registrierung in `payload.config.ts`

4. ✅ **Komponenten erstellen**

   ```
   src/components/Navbar1/
   ├── index.ts
   ├── Navbar1.tsx              # Server Component
   ├── Navbar1.client.tsx       # Client Component (mit 'use client')
   └── Navbar1.types.ts
   ```

5. ✅ **Integration in Layout**

   ```typescript
   // src/app/(app)/layout.tsx
   import { Navbar1 } from '@/components/Navbar1'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <Navbar1 />
           <main>{children}</main>
         </body>
       </html>
     )
   }
   ```

6. ✅ **Branding-Integration**
   - Nutze Farben aus `branding.ts`
   - Style-Anpassungen für CTA-Buttons

### Schritt 2.3: Navbar Testing

**Checklist:**

- [ ] Desktop-Navigation funktioniert
- [ ] Mobile-Menu funktioniert
- [ ] Links funktionieren (intern & extern)
- [ ] CTA-Buttons funktioniert
- [ ] Dropdowns funktionieren (falls vorhanden)
- [ ] Responsive Design korrekt
- [ ] Keine TypeScript-Errors
- [ ] Alte Navbar komplett entfernt

**Nach erfolgreicher Navbar-Integration:**

```
✓ Navbar integriert: [Name]
✓ Header Global konfiguriert
✓ Server/Client Components getrennt
✓ Layout aktualisiert
✓ Alte Navbar entfernt

Weiter mit Footer...
```

---

### Schritt 2.4: Footer-Auswahl

**Wenn Footer nicht spezifiziert wurde, frage:**

```
Welchen Footer möchten Sie aus dem Relume-Components Repository verwenden?

Verfügbare Optionen (Beispiele):
- Footer1 - Klassischer 4-Spalten Footer
- Footer2 - Minimalistischer Footer
- Footer3 - Footer mit Newsletter
- Footer4 - Footer mit Logo-Zentrierung

Bitte geben Sie den Namen an, z.B. "Footer1"

Hinweis: Der Footer wird automatisch mit dem Fullstack Factory Branding versehen:
"Mit ❤ entwickelt von Fullstack Factory" (unterste Zeile, zentriert)
```

### Schritt 2.5: Footer Integration durchführen

**Siehe:** `FOOTER_DEVELOPMENT_GUIDE.md`

**Wichtige Schritte:**

1. ✅ **Alten Footer vollständig entfernen**

   ```bash
   # Lösche alten Footer
   rm -rf src/components/Footer/

   # Suche nach Importen
   grep -r "from '@/components/Footer'" src/

   # Entferne aus Layout
   ```

2. ✅ **Relume Footer lokalisieren**

   ```bash
   find .relume-reference -iname "*footer1*"
   ```

3. ✅ **Footer Global erstellen**
   - Datei: `src/globals/Footer.ts`
   - Fields: footerType, logo, linkGroups, socialLinks, newsletter, copyright, legalLinks
   - Registrierung in `payload.config.ts`

4. ✅ **Komponenten erstellen**

   ```
   src/components/Footer1/
   ├── index.ts
   ├── Footer1.tsx                      # Server Component
   ├── Footer1.client.tsx               # Client Component (Newsletter)
   ├── Footer1.types.ts
   └── FullstackFactoryBranding.tsx     # Hardcoded Branding ❤
   ```

5. ✅ **Fullstack Factory Branding Component**

   ```typescript
   // IMMER hardcoded, nicht editierbar im CMS
   export function FullstackFactoryBranding() {
     return (
       <div className="text-center py-4 border-t">
         <p className="text-sm text-gray-600">
           Mit <span className="text-red-500">❤</span> entwickelt von{' '}
           <a href="https://fullstack-factory.com" className="font-semibold">
             Fullstack Factory
           </a>
         </p>
       </div>
     )
   }
   ```

6. ✅ **Integration in Layout**

   ```typescript
   // src/app/(app)/layout.tsx
   import { Navbar1 } from '@/components/Navbar1'
   import { Footer1 } from '@/components/Footer1'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <Navbar1 />
           <main>{children}</main>
           <Footer1 /> {/* ← Footer hinzugefügt */}
         </body>
       </html>
     )
   }
   ```

7. ✅ **Branding-Integration**
   - Nutze Farben aus `branding.ts`
   - Social Icons mit Hover-Effekten

### Schritt 2.6: Footer Testing

**Checklist:**

- [ ] Footer wird korrekt angezeigt
- [ ] Alle Links funktionieren
- [ ] Social Media Links öffnen korrekt
- [ ] Newsletter-Form funktioniert (falls aktiviert)
- [ ] ✅ **Fullstack Factory Branding sichtbar**
- [ ] ✅ **Branding unterste Zeile, zentriert**
- [ ] ✅ **"Mit ❤ entwickelt von Fullstack Factory"**
- [ ] ✅ **Link zu fullstack-factory.com funktioniert**
- [ ] Responsive Design korrekt
- [ ] Keine TypeScript-Errors
- [ ] Alter Footer komplett entfernt

**Nach erfolgreicher Footer-Integration:**

```
✓ Footer integriert: [Name]
✓ Footer Global konfiguriert
✓ Server/Client Components getrennt
✓ Fullstack Factory Branding hinzugefügt ❤
✓ Layout aktualisiert
✓ Alter Footer entfernt

Navbar & Footer komplett! Bereit für Heroes & Komponenten!
```

---

## Phase 3: Hero & Komponenten-Entwicklung

### Schritt 3.1: Hero-Auswahl

**Frage:**

```
Welche Hero-Komponenten benötigen Sie?

Bitte geben Sie die Namen der Relume-Heroes an, z.B.:
- HeroHeader1
- HeroHeader5
- HeroHeader64

Format: Komma-getrennte Liste
```

### Schritt 3.2: Hero-Integration

**Siehe:** `HERO_DEVELOPMENT_GUIDE.md`

**Für jeden Hero:**

1. Lokalisiere in `.relume-reference`
2. Analysiere Props/Structure
3. Erstelle PayloadCMS Block Config
4. Erstelle Frontend Component
5. Registriere in `src/fields/hero/index.ts`

### Schritt 3.3: Content-Blöcke-Auswahl

**Frage:**

```
Welche Content-Blöcke benötigen Sie?

Kategorien:
- Features: Feature1, Feature2, Feature3...
- Content: Content1, Content2, Content3...
- CTA: CTA1, CTA2, CTA3...
- Team: Team1, Team2, Team3...
- Testimonials: Testimonial1, Testimonial2...
- Gallery: Gallery1, Gallery2...
- Contact: Contact1, Contact2...

Format: Komma-getrennte Liste pro Kategorie
```

### Schritt 3.4: Blöcke-Integration

**Siehe:** `BLOCK_DEVELOPMENT_GUIDE.md`

**Für jeden Block:**

1. Lokalisiere in `.relume-reference`
2. Analysiere Props/Structure
3. Erstelle Block Config (`src/blocks/{Name}/{Name}.config.ts`)
4. Erstelle Frontend Component (`src/blocks/{Name}/{Name}.tsx`)
5. Registriere in Pages Collection

**RichText-Felder:**

- **Immer** `createRichTextField()` verwenden
- **Siehe:** `RICHTEXT_CONFIGURATION.md`

---

## Phase 4: Collections & Features

### Schritt 4.1: Pages Collection finalisieren

**Prüfe:**

- Alle Heroes registriert
- Alle Blocks registriert
- RichText-Felder korrekt konfiguriert

### Schritt 4.2: Optionale Collections

**Frage:**

```
Welche zusätzlichen Collections werden benötigt?

Verfügbare Optionen:
- Blog (Posts, Categories, Authors)
- Team (Members, Departments)
- Portfolio (Projects, Case Studies)
- Produkte (Products, Categories)
- Events
- Newsletter
- Testimonials (separat)

Bitte auswählen (komma-getrennt)
```

**Für jede Collection:**

1. Erstelle Collection Config
2. Erstelle Frontend-Templates
3. Integriere in Navigation (falls nötig)

### Schritt 4.3: Navigation & Footer konfigurieren

- Header bereits konfiguriert (Phase 2)
- Footer Global erstellen (ähnlich wie Header)
- Footer-Komponente integrieren

---

## Phase 5: Deployment

### Schritt 5.1: Environment Setup

**Siehe:** `DEPLOYMENT_GUIDE.md`

**Environment Variables:**

```env
DATABASE_URL=
PAYLOAD_SECRET=
NEXT_PUBLIC_SERVER_URL=
# ... weitere
```

### Schritt 5.2: Vercel Deployment

```bash
# Vercel CLI
vercel --prod

# Oder via GitHub Integration
git push origin main
```

### Schritt 5.3: Dokumentation erstellen

**Erstelle:**

1. **README.md** - Projekt-Overview
2. **SETUP.md** - Entwickler-Setup
3. **CONTENT_GUIDE.md** - Content-Pflege für Kunde

**Template README.md:**

```markdown
# ${PROJECT_NAME}

## Tech Stack

- Next.js 15
- Payload CMS 3
- Vercel Postgres
- TypeScript
- Tailwind CSS

## Branding

- Primary Color: ${PRIMARY_COLOR}
- Secondary Color: ${SECONDARY_COLOR}
- Heading Font: ${HEADING_FONT}
- Body Font: ${BODY_FONT}

## Components

- Navbar: ${NAVBAR_TYPE}
- Heroes: ${HERO_TYPES}
- Blocks: ${BLOCK_TYPES}

## Deployment

- Production: [URL]
- Admin: [URL]/admin

## Local Development

\`\`\`bash
pnpm install
pnpm dev
\`\`\`
```

### Schritt 5.4: Finalisierung

```bash
# Final Commit
git add .
git commit -m "feat: Initial setup for ${PROJECT_NAME}

- Configured branding (${PRIMARY_COLOR}, ${SECONDARY_COLOR})
- Integrated Navbar: ${NAVBAR_TYPE}
- Added Heroes: ${HERO_TYPES}
- Added Blocks: ${BLOCK_TYPES}
- Set up Collections: ${COLLECTIONS}
- Deployed to production"

git push origin main
```

---

## ZUSAMMENFASSUNG - GESAMTER WORKFLOW

### Phase 1: Projekt-Setup ✓

- [ ] Onboarding-Informationen gesammelt
- [ ] Repository geklont und initialisiert
- [ ] Branding konfiguriert

### Phase 2: Navbar & Footer Integration ✓

- [ ] Navbar ausgewählt
- [ ] Alte Navbar entfernt
- [ ] Neue Navbar integriert (Server/Client getrennt)
- [ ] Header Global konfiguriert
- [ ] Navbar Testing durchgeführt
- [ ] Footer ausgewählt
- [ ] Alter Footer entfernt
- [ ] Neuer Footer integriert (Server/Client getrennt)
- [ ] Footer Global konfiguriert
- [ ] **Fullstack Factory Branding hinzugefügt ❤**
- [ ] Footer Testing durchgeführt

### Phase 3: Hero & Komponenten ✓

- [ ] Heroes konvertiert und integriert
- [ ] Blocks konvertiert und integriert
- [ ] RichText-Felder standardisiert

### Phase 4: Collections & Features ✓

- [ ] Pages Collection finalisiert
- [ ] Zusätzliche Collections erstellt
- [ ] Navigation & Footer konfiguriert

### Phase 5: Deployment ✓

- [ ] Environment konfiguriert
- [ ] Deployment durchgeführt
- [ ] Dokumentation erstellt
- [ ] Final Commit & Push

---

## VERWENDETE GUIDES

Während des Workflows immer referenzieren:

- `ONBOARDING_FLOW.md` - Projekt-Start & Informationen
- `NAVBAR_DEVELOPMENT_GUIDE.md` - Navbar Integration
- `FOOTER_DEVELOPMENT_GUIDE.md` - Footer Integration (mit Fullstack Factory Branding ❤)
- `HERO_DEVELOPMENT_GUIDE.md` - Hero Komponenten
- `BLOCK_DEVELOPMENT_GUIDE.md` - Content Blöcke
- `RICHTEXT_CONFIGURATION.md` - RichText Felder
- `COMPONENT_MAPPING.md` - Relume → Payload Mapping
- `DEPLOYMENT_GUIDE.md` - Deployment & Finalisierung

---

## WICHTIGSTE REGELN

### ⚠️ Immer beachten:

1. **Alte Komponenten komplett entfernen** bevor neue integriert werden
2. **Server/Client Components korrekt trennen** (`'use client'` nur wo nötig)
3. **RichText immer mit Factory Function** (`createRichTextField()`)
4. **Guides lesen BEVOR gehandelt wird**
5. **1:1 Integration aus Relume** - nicht anpassen, sondern konvertieren
6. **Branding-Farben überall integrieren**

### 🎯 Qualitätschecks:

- Keine TypeScript-Errors
- Keine Console-Warnings
- Responsive Design funktioniert
- Alle Links funktionieren
- Mobile-Navigation funktioniert
- Alle RichText-Felder nutzen Factory Functions
- Server/Client Components korrekt getrennt

---

**Workflow-Version:** 1.0
**Letzte Aktualisierung:** 2024
