# 🚀 Quick Start - Vollständiger Website-Generator aus Figma

Optimierte Cursor .mdc-Dateien für die **intelligente Generierung** einer kompletten PayloadCMS-Website mit **Navbar**, **Footer**, **Heroes** und **Blocks** - alles aus deinem Figma-Design.

---

## ⚡ TL;DR - Kompletter Workflow

```bash
# In Cursor AI (Cmd/Ctrl+K):

# 1. Figma scannen
> Fetch Used Figma Components

# 2. Navbar generieren
> Generate Navbar from Figma

# 3. Footer generieren
> Generate Footer from Figma

# 4. Heroes generieren
> Generate Heroes from Figma Inventory

# 5. Blocks generieren
> Generate Blocks from Figma Inventory
```

**Das war's!** 🎉

**Dauer:** ~20 Minuten  
**Output:** Komplette Website-Struktur

---

## 📊 Generierungs-Reihenfolge

### Warum diese Reihenfolge?

1. **Figma-Scan** → Erkennt alle Komponenten
2. **Navbar** → Globale Navigation (einmalig)
3. **Footer** → Globaler Footer (einmalig)
4. **Heroes** → Conditional Fields, Page-spezifisch
5. **Blocks** → Content-Blöcke für Pages

---

## 🎯 Was wird generiert?

### 1. Navbar 🧭
**Erkannt:** Komponenten mit "Navbar" oder "Navigation" im Namen

**Generierte Dateien:**
```
src/Header/
├── Component.tsx        ← Wrapper
├── DesktopNav.tsx       ← Desktop (lg: und größer)
├── MobileNav.tsx        ← Mobile (< lg:)
├── config.ts            ← PayloadCMS Global
└── index.ts             ← Exports
```

**Features:**
- ✅ Responsive (Desktop + Mobile getrennt)
- ✅ Hamburger-Menü für Mobile
- ✅ Sticky Header
- ✅ Logo + Menü + Buttons

---

### 2. Footer 🦶
**Erkannt:** Komponenten mit "Footer" im Namen

**Generierte Dateien:**
```
src/Footer/
├── Component.tsx          ← Wrapper
├── FooterColumns.tsx      ← Spalten mit Links
├── FooterBottom.tsx       ← Copyright + Legal + Social
├── config.ts              ← PayloadCMS Global
└── index.ts               ← Exports
```

**Features:**
- ✅ Multi-Column Layout
- ✅ Social Media Links
- ✅ Newsletter (optional)
- ✅ Legal Links (Impressum, Datenschutz)

---

### 3. Heroes 🦸
**Erkannt:** Komponenten mit "Header" oder "Hero" im Namen

**Generierte Dateien:**
```
src/heros/
├── Header1/
│   └── index.tsx         ← Hero mit Bild
├── Header2/
│   └── index.tsx         ← Hero mit Galerie
├── Header3/
│   └── index.tsx         ← Hero mit Features
├── config.ts             ← ✨ Conditional Fields!
└── RenderHero.tsx        ← Dynamisches Rendering
```

**Features:**
- ✅ **Conditional Fields** im Admin
- ✅ Automatische Typ-Erkennung
- ✅ Verschiedene Layouts pro Hero

---

### 4. Blocks 🧱
**Erkannt:** Alle anderen Komponenten

**Generierte Dateien:**
```
src/blocks/
├── Layout/
│   └── FeatureGrid/
│       ├── Component.tsx
│       ├── config.ts
│       └── index.ts
├── CTA/
│   └── NewsletterCTA/
│       └── ...
└── ... (weitere Kategorien)
```

**Features:**
- ✅ Nur verwendete Komponenten
- ✅ Deutsche Admin-Labels
- ✅ Automatische Registrierung

---

## 🔄 Detaillierter Workflow

### Schritt 1: Figma scannen (3 Min)

```bash
> Fetch Used Figma Components
```

**Was passiert:**
1. Scannt alle Seiten im Figma
2. Identifiziert Komponenten
3. Kategorisiert automatisch:
   - **Hero** ← "Header" im Namen
   - **Navbar** ← "Navbar/Navigation" im Namen
   - **Footer** ← "Footer" im Namen
   - **Layout, CTA, etc.** ← Rest
4. Erstellt `FIGMA_INVENTORY.json`

**Output Beispiel:**
```json
{
  "categorized": {
    "Hero": [
      { "name": "Header 1 - Homepage" },
      { "name": "Header 2 - Contact" }
    ],
    "Navbar": [
      { "name": "Navigation Bar" }
    ],
    "Footer": [
      { "name": "Footer" }
    ],
    "Layout": [
      { "name": "Features Grid" }
    ]
  }
}
```

---

### Schritt 2: Navbar generieren (2-3 Min)

```bash
> Generate Navbar from Figma
```

**Was passiert:**
1. Findet Navbar aus Inventory
2. Analysiert Struktur (Logo, Menü, Buttons)
3. **Generiert 2 separate Dateien:**
   - `DesktopNav.tsx` (lg: und größer)
   - `MobileNav.tsx` (< lg:)
4. Erstellt `config.ts` für Admin
5. Registriert in `payload.config.ts`

**Admin-Panel:**
```
Globals → Navigation

┌──────────────────────────┐
│ Logo                     │
│ [Upload...]              │
│                          │
│ Navigations-Links        │
│  ├─ Home (/)`           │
│  ├─ About (/about)      │
│  └─ Contact (/kontakt)  │
│                          │
│ Haupt-Button             │
│  Text: Kontakt           │
│  URL: /kontakt           │
└──────────────────────────┘
```

---

### Schritt 3: Footer generieren (2-3 Min)

```bash
> Generate Footer from Figma
```

**Was passiert:**
1. Findet Footer aus Inventory
2. Analysiert Struktur (Spalten, Social, Legal)
3. **Generiert aufgeteilte Komponenten:**
   - `FooterColumns.tsx` (Spalten)
   - `FooterBottom.tsx` (Copyright + Legal)
4. Erstellt `config.ts` für Admin
5. Registriert in `payload.config.ts`

**Admin-Panel:**
```
Globals → Footer

┌──────────────────────────┐
│ Logo + Beschreibung      │
│                          │
│ Footer-Spalten           │
│  Spalte 1: Produkte      │
│   ├─ Features            │
│   └─ Preise              │
│  Spalte 2: Unternehmen   │
│   ├─ Über uns            │
│   └─ Team                │
│                          │
│ Social Media             │
│  ├─ Instagram            │
│  └─ LinkedIn             │
│                          │
│ Copyright                │
│ Legal Links              │
└──────────────────────────┘
```

---

### Schritt 4: Heroes generieren (3-5 Min)

```bash
> Generate Heroes from Figma Inventory
```

**Was passiert:**
1. Findet alle Heroes aus Inventory
2. **Analysiert Struktur jedes Heroes:**
   - Anzahl Bilder → Typ bestimmen
   - Hat Formular? → Form-Felder
   - Hat Liste? → Feature-Array
3. **Generiert conditional Fields**
4. Speichert unter `/src/heros/`

**Admin-Panel:**
```
Pages → Hero Section

Hero-Typ: [Dropdown ▼]
 ├─ Header1 - Mit Bild        ← Auswahl!
 ├─ Header2 - Galerie
 └─ Header3 - Features

↓ Conditional Fields erscheinen:

Titel *
Beschreibung              ← nur für Header1
Bild                      ← nur für Header1
Haupt-Button              ← nur für Header1
Zweiter Button            ← nur für Header1
```

---

### Schritt 5: Blocks generieren (5-8 Min)

```bash
> Generate Blocks from Figma Inventory
```

**Was passiert:**
1. Generiert restliche Komponenten
2. **Überspringt:** Heroes, Navbar, Footer
3. Speichert unter `/src/blocks/`
4. Registriert in Pages Collection

**Admin-Panel:**
```
Pages → Layout (Blocks)

[+ Block hinzufügen]

Verfügbare Blocks:
├── Layout (5 Blocks)
├── CTA (3 Blocks)
├── Testimonials (2 Blocks)
├── Contact (2 Blocks)
└── ... (weitere)
```

---

## 📁 Finale Struktur

Nach vollständiger Generierung:

```
src/
├── Header/                  ← Navbar (Global)
│   ├── Component.tsx
│   ├── DesktopNav.tsx      ← Separate Desktop-Datei
│   ├── MobileNav.tsx       ← Separate Mobile-Datei
│   ├── config.ts
│   └── index.ts
│
├── Footer/                  ← Footer (Global)
│   ├── Component.tsx
│   ├── FooterColumns.tsx   ← Separate Spalten-Komponente
│   ├── FooterBottom.tsx    ← Separate Bottom-Komponente
│   ├── config.ts
│   └── index.ts
│
├── heros/                   ← Heroes (Pages)
│   ├── Header1/
│   ├── Header2/
│   ├── config.ts           ← ✨ Conditional Fields
│   └── RenderHero.tsx
│
└── blocks/                  ← Content Blocks (Pages)
    ├── Layout/
    ├── CTA/
    └── ... (weitere)
```

---

## 🎨 Vorteile der Aufteilung

### Navbar (Desktop/Mobile getrennt)

**Vorher (1 Datei):**
```typescript
// 300 Zeilen mit Desktop + Mobile vermischt
// Schwer zu warten
```

**Nachher (2 Dateien):**
```typescript
// DesktopNav.tsx - 80 Zeilen
// MobileNav.tsx - 100 Zeilen
// ✅ Übersichtlich
// ✅ Einfach zu warten
// ✅ Getrennte Logik
```

### Footer (Columns/Bottom getrennt)

**Vorher (1 Datei):**
```typescript
// 250 Zeilen mit allem zusammen
```

**Nachher (2 Dateien):**
```typescript
// FooterColumns.tsx - 60 Zeilen
// FooterBottom.tsx - 80 Zeilen  
// ✅ Klare Verantwortlichkeiten
// ✅ Wiederverwendbar
```

---

## 💡 Beispiel-Projekt

### Dein Figma-Design:
```
├── Homepage
│   ├── Navigation Bar       → Navbar (Global)
│   ├── Header 1             → Hero (Conditional)
│   ├── Features Grid        → Block
│   ├── Testimonials         → Block
│   ├── CTA Section          → Block
│   └── Footer               → Footer (Global)
├── About
│   ├── Header 2             → Hero (Conditional)
│   └── Team Grid            → Block
└── Contact
    ├── Header 3             → Hero (Conditional)
    └── Contact Form         → Block
```

### Nach Generierung:

**Globals (einmalig):**
- ✅ Navbar (DesktopNav + MobileNav)
- ✅ Footer (Columns + Bottom)

**Heroes (pro Page):**
- ✅ Header1 (heroWithImage)
- ✅ Header2 (heroWithGallery)
- ✅ Header3 (heroWithForm)

**Blocks (wiederverwendbar):**
- ✅ FeatureGrid
- ✅ Testimonials
- ✅ CTASection
- ✅ TeamGrid
- ✅ ContactForm

---

## 🚀 Nach der Generierung

### 1. Dev-Server starten
```bash
npm run dev
```

### 2. Navbar konfigurieren
```
http://localhost:3000/admin/globals/header

1. Logo hochladen
2. Menü-Links hinzufügen
3. CTA-Buttons konfigurieren
4. Speichern
```

### 3. Footer konfigurieren
```
http://localhost:3000/admin/globals/footer

1. Logo + Beschreibung
2. Spalten erstellen
3. Social Media Links
4. Copyright + Legal Links
5. Speichern
```

### 4. Erste Page erstellen
```
http://localhost:3000/admin/collections/pages/create

1. Slug: "homepage"
2. Hero-Typ wählen: "Header1"
   → Felder erscheinen automatisch
3. Blocks hinzufügen:
   - Feature Grid
   - Testimonials
   - CTA Section
4. Speichern & Vorschau
```

---

## ✅ Checkliste

Nach vollständiger Generierung:

- [ ] **TypeScript validiert:** `npm run type-check`
- [ ] **Build erfolgreich:** `npm run build`
- [ ] **Dev-Server läuft:** `npm run dev`
- [ ] **Navbar konfiguriert:** Admin → Globals → Navigation
- [ ] **Footer konfiguriert:** Admin → Globals → Footer
- [ ] **Erste Page erstellt:** Admin → Pages → Create
- [ ] **Desktop getestet:** Browser > 1024px
- [ ] **Mobile getestet:** Browser < 768px
- [ ] **Conditional Fields geprüft:** Hero-Typ wechseln

---

## 🎯 Vorteile

### 1. Übersichtlichkeit
- ✅ Navbar: Desktop/Mobile getrennt (je ~100 Zeilen)
- ✅ Footer: Columns/Bottom getrennt (je ~80 Zeilen)
- ✅ Statt 1 große Datei → mehrere kleine

### 2. Wartbarkeit
- ✅ Änderungen nur in relevanter Datei
- ✅ Klare Verantwortlichkeiten
- ✅ Einfaches Testing

### 3. Wiederverwendbarkeit
- ✅ FooterColumns auch einzeln nutzbar
- ✅ DesktopNav auch einzeln nutzbar
- ✅ Flexible Kombinationen

### 4. Performance
- ✅ Code-Splitting möglich
- ✅ Kleinere Bundle-Größen
- ✅ Lazy-Loading einfacher

---

## 📚 Dokumentation

Erstellt nach Generierung:
- `FIGMA_INVENTORY.md` - Alle Komponenten
- `BLOCKS_GENERATION_REPORT.md` - Generierungs-Report
- `.cursor/HERO_CONDITIONAL_FIELDS.md` - Hero-Doku

---

## 🎉 Fertig!

Du hast jetzt:
- ✅ **Navbar** (Desktop + Mobile getrennt)
- ✅ **Footer** (Columns + Bottom getrennt)
- ✅ **Heroes** (mit conditional Fields)
- ✅ **Blocks** (nur verwendete Komponenten)
- ✅ **Perfektes Admin-UX**
- ✅ **Wartbare Code-Struktur**

### Viel Erfolg! 🚀

---

**Version:** 3.2 - Navbar/Footer Split + Vollständiger Workflow  
**Letzte Aktualisierung:** 2025-10-16  
**Features:** Separate Desktop/Mobile Navbar, aufgeteilter Footer, Conditional Hero Fields
