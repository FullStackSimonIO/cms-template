

# Figma → PayloadCMS - Vollständiger Workflow

**Version:** 3.0 - Optimiert für korrekte Kategorisierung  
**Datum:** 2025-10-16

---

## 🎯 Workflow-Übersicht

Der komplette Workflow für die Transformation eines Figma-Designs in ein PayloadCMS-Projekt:

```
1. CheckFigma          → Alle Komponenten erfassen & kategorisieren
2. Design Rework       → Farben, Fonts, Tailwind anpassen
3. Button Design       → Button-Komponente aus Figma
4. Navbar Generation   → Mobile + Desktop als Global
5. Footer Generation   → Mobile + Desktop als Global
6. Hero Generation     → Mit conditional fields unter /src/heroes/
7. Block Generation    → Verbleibende Komponenten als Blocks
```

---

## 🚀 Quick Start

### Option 1: Master-Command (Empfohlen)

```bash
cursor> Figma zu Payload - Master Workflow
```

Dieser Command führt den kompletten Workflow automatisch aus.

---

### Option 2: Schritt-für-Schritt

#### Schritt 1: Figma Check
```bash
cursor> Check Figma Design
```

**Output:**
- `FIGMA_INVENTORY.json` - Vollständiges Inventar
- `FIGMA_COMPONENTS_CATEGORIZED.md` - Übersicht

**Was passiert:**
- ✅ ALLE Komponenten erfasst (keine Ausschlüsse!)
- ✅ Intelligente Kategorisierung:
  - Navbar: `/nav(bar)?|navigation|menu/i`
  - Footer: `/footer|fußzeile/i`
  - Hero: `/header|hero|banner(?!s)/i`
  - Blocks: Alle anderen nach Kategorie

**Checkliste:**
- [ ] Navbar-Komponenten in Kategorie "Navbar"
- [ ] Footer-Komponenten in Kategorie "Footer"
- [ ] Header-Komponenten in Kategorie "Hero"
- [ ] Alle anderen korrekt kategorisiert

---

#### Schritt 2: Design Rework
```bash
cursor> Design Rework from Figma
```

**Output:**
- `src/app/globals.css` - Farben & Typografie
- `src/app/fonts.ts` - Font-Imports
- `tailwind.config.mjs` - Theme-Konfiguration

**Was passiert:**
- ✅ Design-Tokens aus Figma extrahiert
- ✅ CSS Variables generiert
- ✅ Fonts importiert (Heading + Paragraph)
- ✅ Tailwind-Theme angepasst

**Checkliste:**
- [ ] globals.css mit Figma-Farben
- [ ] Fonts korrekt importiert
- [ ] Tailwind-Config aktualisiert
- [ ] layout.tsx mit Fonts

---

#### Schritt 3: Button Design
```bash
cursor> Style Buttons from Figma
```

**Output:**
- `src/components/ui/button.tsx` - Button-Komponente
- `src/components/CMSLink/index.tsx` - Mit Button integriert
- `BUTTON_USAGE.md` - Dokumentation

**Was passiert:**
- ✅ Button-Komponente mit ShadCN-Struktur
- ✅ Varianten aus Figma (Primary, Secondary, Outline, Ghost)
- ✅ CMSLink-Integration

**Checkliste:**
- [ ] button.tsx erstellt
- [ ] CMSLink integriert
- [ ] Alle Varianten vorhanden
- [ ] Styles aus Figma

---

#### Schritt 4: Navbar Generation
```bash
cursor> Build Navbar from Figma
```

**Output:**
- `src/Header/DesktopNav/index.tsx` - Desktop-Navbar
- `src/Header/MobileNav/index.tsx` - Mobile-Navbar (Hamburger)
- `src/Header/config.ts` - Payload Global Config

**Was passiert:**
- ✅ Navbar aus FIGMA_INVENTORY.json analysiert
- ✅ Desktop: Horizontale Navigation
- ✅ Mobile: Hamburger-Menu mit Slide-In
- ✅ Global Config auf Deutsch
- ✅ In payload.config.ts registriert

**Checkliste:**
- [ ] DesktopNav generiert
- [ ] MobileNav generiert
- [ ] Global Config erstellt
- [ ] In Payload registriert
- [ ] Im Admin-Panel sichtbar

---

#### Schritt 5: Footer Generation
```bash
cursor> Build Footer from Figma
```

**Output:**
- `src/Footer/DesktopFooter/index.tsx` - Desktop-Footer
- `src/Footer/MobileFooter/index.tsx` - Mobile-Footer (Accordion)
- `src/Footer/config.ts` - Payload Global Config

**Was passiert:**
- ✅ Footer aus FIGMA_INVENTORY.json analysiert
- ✅ Desktop: Multi-Column Layout
- ✅ Mobile: Accordion-Style
- ✅ Global Config auf Deutsch
- ✅ In payload.config.ts registriert

**Checkliste:**
- [ ] DesktopFooter generiert
- [ ] MobileFooter generiert
- [ ] Global Config erstellt
- [ ] In Payload registriert
- [ ] Im Admin-Panel sichtbar

---

#### Schritt 6: Hero Generation
```bash
cursor> Generate Heroes from Figma
```

**Output:**
- `src/heros/Hero1/index.tsx`, `Hero2/index.tsx`, etc.
- `src/heros/config.ts` - Mit conditional fields!
- `src/heros/RenderHero.tsx` - Hero-Renderer

**Was passiert:**
- ✅ Header-Komponenten aus FIGMA_INVENTORY.json
- ✅ Hero-Typ-Erkennung (Simple, WithImage, WithGallery, WithFeatures, WithForm, etc.)
- ✅ **Conditional Fields** - Felder erscheinen basierend auf ausgewähltem Hero-Typ
- ✅ Integration in Pages Collection

**Conditional Fields Beispiel:**
```
Hero-Typ auswählen: "Hero1" → Zeigt: Titel, Beschreibung, Bild, 2 Buttons
Hero-Typ auswählen: "Hero2" → Zeigt: Titel, Beschreibung, Galerie, 1 Button
Hero-Typ auswählen: "Hero3" → Zeigt: Titel, Features-Liste, Formular
```

**Checkliste:**
- [ ] Alle Header als Heroes generiert
- [ ] Hero-Typen korrekt erkannt
- [ ] config.ts mit conditional fields
- [ ] RenderHero.tsx erstellt
- [ ] In Pages Collection integriert
- [ ] Admin-Panel: Felder ändern sich dynamisch

---

#### Schritt 7: Block Generation
```bash
cursor> Generate Blocks from Figma
```

**Output:**
- `src/blocks/{Category}/{BlockName}/` - Alle Blocks
- `src/blocks/index.ts` - Zentrale Exports
- `BLOCKS_GENERATION_REPORT.json` - Report

**Was passiert:**
- ✅ Nur verbleibende Komponenten (OHNE Navbar, Footer, Heroes)
- ✅ Gruppiert nach Kategorie (Layout, CTA, Contact, etc.)
- ✅ Basis: Relume-Templates
- ✅ Styles: Aus Figma
- ✅ Zentrale Registrierung

**Checkliste:**
- [ ] Nur verbleibende Komponenten generiert
- [ ] Keine Duplikate (Navbar, Footer, Heroes schon vorhanden)
- [ ] Zentrale index.ts
- [ ] Pages Collection aktualisiert
- [ ] PageRenderer aktualisiert

---

## 📊 Erwartete Komponenten-Verteilung

**Typisches Projekt (40-80 Komponenten):**

| Kategorie | Anzahl | Ziel | Typ |
|-----------|--------|------|-----|
| **Navbar** | 1-2 | `src/Header/` (Mobile + Desktop) | Global Config |
| **Footer** | 1-2 | `src/Footer/` (Mobile + Desktop) | Global Config |
| **Hero** | 3-8 | `src/heros/Hero1/`, `Hero2/`, etc. | Heroes (conditional fields) |
| **Layout** | 10-20 | `src/blocks/Layout/` | Blocks |
| **CTA** | 3-8 | `src/blocks/CTA/` | Blocks |
| **Contact** | 2-4 | `src/blocks/Contact/` | Blocks |
| **Testimonials** | 2-3 | `src/blocks/Testimonials/` | Blocks |
| **Pricing** | 1-2 | `src/blocks/Pricing/` | Blocks |
| **Weitere** | 5-15 | `src/blocks/...` | Blocks |

**NICHT 1071 Komponenten!** Nur die tatsächlich im Figma verwendeten.

---

## 🏗️ Generierte Struktur

```
src/
├── Header/
│   ├── DesktopNav/
│   │   └── index.tsx
│   ├── MobileNav/
│   │   └── index.tsx
│   └── config.ts (Payload Global)
│
├── Footer/
│   ├── DesktopFooter/
│   │   └── index.tsx
│   ├── MobileFooter/
│   │   └── index.tsx
│   └── config.ts (Payload Global)
│
├── heros/
│   ├── Hero1/
│   │   └── index.tsx
│   ├── Hero2/
│   │   └── index.tsx
│   ├── Hero3/
│   │   └── index.tsx
│   ├── config.ts (mit conditional fields!)
│   └── RenderHero.tsx
│
├── blocks/
│   ├── Layout/
│   │   ├── Layout1/
│   │   │   ├── Component.tsx
│   │   │   ├── config.ts
│   │   │   └── index.ts
│   │   └── ... (10-20 Blocks)
│   ├── CTA/
│   │   └── ... (3-8 Blocks)
│   ├── Contact/
│   │   └── ... (2-4 Blocks)
│   └── ... (weitere Kategorien)
│   └── index.ts (zentrale Exports)
│
├── components/
│   ├── ui/
│   │   └── button.tsx (aus Figma)
│   ├── CMSLink/
│   │   └── index.tsx (mit Button integriert)
│   └── PageRenderer/
│       └── index.tsx (alle Blocks gemappt)
│
├── collections/
│   └── Pages/
│       └── config.ts (alle Blocks + Hero-Field)
│
├── app/
│   ├── globals.css (Figma-Farben)
│   ├── fonts.ts (Heading + Paragraph)
│   └── layout.tsx (mit Navbar + Footer)
│
└── payload.config.ts (Navbar + Footer Globals)
```

---

## ✅ Validierung

Nach vollständigem Workflow:

### TypeScript Check
```bash
npm run type-check
```
✅ Keine Fehler erwartet

### Build Test
```bash
npm run build
```
✅ Build erfolgreich

### Dev-Server
```bash
npm run dev
```
✅ Server läuft auf http://localhost:3000

### Admin-Panel
```
http://localhost:3000/admin
```

**Prüfen:**
- [ ] Globale Einstellungen → Navbar sichtbar
- [ ] Globale Einstellungen → Footer sichtbar
- [ ] Pages → Hero Section → Hero-Typ auswählbar
- [ ] Pages → Blocks → Alle Kategorien sichtbar
- [ ] Blocks gruppiert nach Kategorie
- [ ] Deutsche Labels überall

---

## 🎯 Erfolgskriterien

✅ **Vollständigkeit:**
- ALLE Figma-Komponenten erfasst
- Korrekte Kategorisierung (Navbar, Footer, Hero, Blocks)
- Keine Duplikate

✅ **Struktur:**
- Navbar & Footer als Globals (Mobile + Desktop)
- Heroes unter /src/heroes/ mit conditional fields
- Blocks unter /src/blocks/{Category}/

✅ **Qualität:**
- TypeScript fehlerfrei
- Build erfolgreich
- Admin-Panel vollständig & übersichtlich
- Deutsches UX überall

✅ **Performance:**
- Nur benötigte Komponenten (30-80, nicht 1071)
- Bundle-Größe optimiert
- Lazy-Loading wo möglich

---

## 💡 Wichtige Hinweise

### Kategorisierung ist kritisch!

**Pattern-Matching:**
- Navbar: `/nav(bar)?|navigation|menu/i`
- Footer: `/footer|fußzeile/i`
- Hero: `/header|hero|banner(?!s)/i` (Banner singular = Hero, Banners plural = Notification)
- Blocks: Alle anderen nach Kategorie

**KEINE manuellen Ausschlüsse!** Alle Komponenten werden erfasst, aber korrekt kategorisiert.

### Conditional Fields bei Heroes

Implementiert über `admin.condition` in Payload:

```typescript
{
  name: 'media',
  type: 'upload',
  relationTo: 'media',
  label: 'Bild',
  admin: {
    condition: (data) => ['Hero1', 'Hero2'].includes(data?.hero?.type),
  },
}
```

**Resultat:** Felder erscheinen/verschwinden basierend auf Hero-Typ-Auswahl.

### Mobile + Desktop getrennt

**Navbar:**
- `DesktopNav` - Horizontale Navigation
- `MobileNav` - Hamburger-Menu mit Slide-In

**Footer:**
- `DesktopFooter` - Multi-Column Layout
- `MobileFooter` - Accordion-Style

Beide in einer Global Config, responsive Integration in layout.tsx.

---

## 🐛 Troubleshooting

### Problem: Navbar/Footer fehlen

**Lösung:**
```bash
# 1. Prüfe FIGMA_INVENTORY.json
cat FIGMA_INVENTORY.json | jq '.categorized.Navbar'
cat FIGMA_INVENTORY.json | jq '.categorized.Footer'

# 2. Prüfe Komponenten-Namen in Figma
# Navbar: Muss "nav", "navbar", "navigation" oder "menu" im Namen haben
# Footer: Muss "footer" oder "fußzeile" im Namen haben

# 3. Falls Pattern nicht matched:
# Passe in .cursor/commands/check-figma-design.mdc die Pattern an
```

### Problem: Heroes nicht erkannt

**Lösung:**
```bash
# 1. Prüfe FIGMA_INVENTORY.json
cat FIGMA_INVENTORY.json | jq '.categorized.Hero'

# 2. Prüfe Komponenten-Namen in Figma
# Hero: Muss "header", "hero" oder "banner" im Namen haben

# 3. Stelle sicher, dass "Banners" (plural) NICHT als Hero erkannt wird
# → "Banner" (singular) = Hero
# → "Banners" (plural) = Notification Banners (Blocks)
```

### Problem: Zu viele Blocks generiert

**Lösung:**
```bash
# 1. Prüfe BLOCKS_GENERATION_REPORT.json
cat BLOCKS_GENERATION_REPORT.json | jq '.meta.totalBlocks'

# Sollte 30-80 sein, NICHT 1071!

# 2. Falls zu viele:
# → Falscher Command verwendet!
# → NICHT verwenden: "Generate ALL Relume Blocks"
# → Verwenden: "Generate Blocks from Figma"

# 3. Lösche falsch generierte Blocks
rm -rf src/blocks/*

# 4. Führe korrekten Workflow aus
cursor> Figma zu Payload - Master Workflow
```

### Problem: Conditional Fields funktionieren nicht

**Lösung:**
```bash
# 1. Prüfe src/heros/config.ts
# → Muss admin.condition haben

# 2. Prüfe Admin-Panel
# → Wähle Hero-Typ
# → Warte 1 Sekunde
# → Felder sollten erscheinen/verschwinden

# 3. Browser-Cache leeren
# → Ctrl+Shift+R (Hard Reload)

# 4. Dev-Server neustarten
npm run dev
```

---

## 📚 Weiterführende Dokumentation

- [Master Workflow Command](.cursor/commands/figma-to-payload-master.mdc)
- [Check Figma Design](.cursor/commands/check-figma-design.mdc)
- [Design Rework](.cursor/commands/design-rework-from-figma.mdc)
- [Style Buttons](.cursor/commands/style-buttons-from-figma.mdc)
- [Build Navbar](.cursor/commands/build-navbar.mdc)
- [Build Footer](.cursor/commands/build-footer-from-figma.mdc)
- [Generate Heroes](.cursor/commands/generate-heroes-from-inventory.mdc)
- [Generate Blocks](.cursor/commands/generate-blocks-from-figma.mdc)

---

**Version:** 3.0  
**Erstellt:** 2025-10-16  
**Status:** ✅ Produktionsreif

---

✅ **Vollständiger Workflow für perfekte Figma → PayloadCMS Transformation!**
