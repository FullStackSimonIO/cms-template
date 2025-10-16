# PayloadCMS + Figma MCP - Project Rules

## Project Overview

This project is the base template of our webdevelopment agency in germany named "Fullstack Factory". It is built in the latest version of NextJS, using Typescript, a customized version of PayloadCMS 3.X (latest), TailwindCSS, Postgres NeonDB and Vercel Blob Store. Also it use multiple other libraries as well and has a Folder named "Relume" in the Root directory. This one holds all ReactJS Components from the Relume Database inside.

## Architecture

- Projekt nutzt **Next.js + PayloadCMS + Tailwind + ShadCN/UI**.
- **ALLE** Figma-Komponenten werden korrekt kategorisiert und umgesetzt.
- Deutsche UX im Admin Panel ist Pflicht (alle Labels, Beschreibungen, Feldnamen auf Deutsch).
- **Vollständige Erfassung mit intelligenter Kategorisierung:**
  - **Navbar-Komponenten** → Payload Globals (`src/Header/` mit Mobile + Desktop)
  - **Footer-Komponenten** → Payload Globals (`src/Footer/` mit Mobile + Desktop)
  - **Header/Hero-Komponenten** → Heroes (`src/heros/` mit conditional fields)
  - **Alle anderen** → PayloadCMS Blocks (`src/blocks/{Category}/{BlockName}/`)

## Key Documentation URL's

- NextJS 15 - https://nextjs.org/docs
- PayloadCMS - https://payloadcms.com/docs
- TailwindCSS - https://tailwindcss.com/docs
- Relume - https://relume.io

## Project Structure

### Core Folders:

- **relume/** - Relume React Components als Templates (`relume/Layout/Layout1/component.tsx`)
- **src/app/** - Next.js App Router
- **src/blocks/** - PayloadCMS Blocks (`blocks/{Category}/{BlockName}/`)
- **src/heros/** - Hero Sections mit conditional fields (`heros/Hero1/index.tsx`)
- **src/Header/** - Navbar als Global (DesktopNav + MobileNav)
- **src/Footer/** - Footer als Global (DesktopFooter + MobileFooter)
- **src/collections/** - PayloadCMS Collections (Pages, Media, etc.)
- **src/components/** - Basis-Komponenten (RichText, Media, CMSLink, etc.)

### Dateistruktur Blocks:
```
src/blocks/{Category}/{BlockName}/
├── Component.tsx  # React-Komponente
├── config.ts      # Payload Block Config
└── index.ts       # Exports
```

### Dateistruktur Heroes:
```
src/heros/
├── Hero1/
│   └── index.tsx
├── Hero2/
│   └── index.tsx
├── config.ts      # Mit conditional fields!
└── RenderHero.tsx # Hero-Renderer
```

### Dateistruktur Globals:
```
src/Header/
├── DesktopNav/
│   └── index.tsx
├── MobileNav/
│   └── index.tsx
└── config.ts      # Payload Global Config

src/Footer/
├── DesktopFooter/
│   └── index.tsx
├── MobileFooter/
│   └── index.tsx
└── config.ts      # Payload Global Config
```

## Development Workflow

### ⚡ Master-Command (Empfohlen)
```bash
cursor> Figma zu Payload - Master Workflow
```
Führt den kompletten Workflow automatisch aus (alle 7 Schritte).

### 📋 Einzelne Schritte:

#### 1. CheckFigma
```bash
cursor> Check Figma Design
```
- ALLE Komponenten erfassen
- Intelligente Kategorisierung (Navbar, Footer, Hero, Blocks)

#### 2. Design Rework
```bash
cursor> Design Rework from Figma
```
- Farben & Fonts aus Figma → globals.css, fonts.ts
- Tailwind anpassen

#### 3. Button Design
```bash
cursor> Style Buttons from Figma
```
- Button-Komponente mit Figma-Styles
- CMSLink-Integration

#### 4. Navbar
```bash
cursor> Build Navbar from Figma
```
- DesktopNav + MobileNav (getrennt!)
- Payload Global Config

#### 5. Footer
```bash
cursor> Build Footer from Figma
```
- DesktopFooter + MobileFooter (getrennt!)
- Payload Global Config

#### 6. Heroes
```bash
cursor> Generate Heroes from Figma
```
- Hero-Komponenten mit conditional fields
- Dynamische Felder basierend auf Hero-Typ

#### 7. Blocks
```bash
cursor> Generate Blocks from Figma
```
- Verbleibende Komponenten als Blocks
- OHNE Navbar, Footer, Heroes (bereits generiert)

## Component Categorization

### Pattern-Matching:

- **Navbar:** `/nav(bar)?|navigation|menu/i` → Globals
- **Footer:** `/footer|fußzeile/i` → Globals
- **Hero:** `/header|hero|banner(?!s)/i` → Heroes (conditional fields)
- **Blocks:** Alle anderen nach Kategorie

### Hero-Typen (Conditional Fields):
- `heroSimple` - Nur Text
- `heroWithImage` - Text + Bild + CTAs
- `heroWithGallery` - Text + mehrere Bilder
- `heroWithFeatures` - Text + Feature-Liste
- `heroWithForm` - Text + Formular
- `heroWithVideo` - Text + Video
- `heroSplitScreen` - Text + 2 Bilder

**Admin-Panel:** Felder ändern sich dynamisch basierend auf Hero-Typ!

### Block-Kategorien:
- Layout, CTA, Testimonials, Contact, Pricing
- Gallery, Team, MultistepForms, Banners, FAQ
- Timelines, Comparison, ContactModal
- EventHeaderItems, EventHeaders, Logo, Loader

## Development Guidelines

### TypeScript & Coding:
- Use TypeScript for Type Safety
- Follow the Coding Standards defined in the ESLint configuration
- Imports alphabetisch sortiert
- Props mit Interfaces typisieren

### UI/UX:
- Ensure all Components are perfectly responsive, mobile-first-approach
- Accessible (ARIA-Labels, Keyboard-Navigation, Screen-Reader Support)
- Look exactly like the original Relume React Components
- Use TailwindCSS for styling (kein Inline-CSS)

### Payload CMS:
- Alle Admin-Texte auf Deutsch
- Kategorisierung über `admin.group`
- Conditional Fields bei Heroes
- Suchbare Block-Namen und Beschreibungen

### Testing & Validation:
- Nach jeder Änderung: `npm run type-check`
- Vor Deployment: `npm run build`
- Admin-Panel testen: http://localhost:3000/admin
- Migrations up-to-date halten

## Naming Conventions

### Dateien:
- Komponenten: `Component.tsx` (immer gleich)
- Configs: `config.ts` (immer gleich)
- Index: `index.ts` (immer gleich)

### Komponenten:
- React-Komponenten: PascalCase (z.B. `Layout1`, `Hero1`)
- Props-Interfaces: `{ComponentName}Props`
- Block-Types: `{ComponentName}Block`

### Block-Slugs:
- Format: `{category}{ComponentName}` (camelCase)
- Beispiele: `layoutLayout1`, `ctaSection1`, `heroHeader1`

### CSS-Klassen:
- Tailwind-Utilities bevorzugen
- Custom-Klassen nur wenn nötig
- BEM-Notation für Custom-Klassen

## Performance

- Lazy-Loading für Blocks
- Bundle-Optimierung (Code-Splitting)
- Image-Optimierung (Next.js Image)
- Ziel: Bundle < 500KB, LCP < 2.5s, TTI < 3.8s

## Documentation

Siehe auch:
- [Workflow Overview](.cursor/WORKFLOW_OVERVIEW.md)
- [Quick Reference](.cursor/QUICK_REFERENCE.md)
- [Commands](.cursor/commands/)

---

**Version:** 3.0  
**Stand:** 2025-10-16  
**Status:** ✅ Produktionsreif
