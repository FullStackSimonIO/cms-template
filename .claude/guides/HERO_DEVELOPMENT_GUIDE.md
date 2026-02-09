# 🎨 PayloadCMS Hero Development Guide

Ein umfassender Leitfaden für die Entwicklung von Hero-Komponenten mit **Conditional Fields** in PayloadCMS.

---

## 🧩 Architektur-Übersicht

### Der Unterschied zu Blöcken

**Blöcke:**
- Jeder Block hat eigene `config.ts`
- Separate Konfiguration pro Block-Type
- Unabhängige Field-Definitionen

**Heroes:**
- **EINE** gemeinsame `config.ts` für alle Heroes
- Conditional Fields basierend auf `type` Select
- Felder werden dynamisch ein-/ausgeblendet

### Warum Conditional Fields?

Heroes haben oft ähnliche Basis-Felder (Title, Description, CTA) aber unterschiedliche spezifische Felder:

- **PostHero**: Braucht nur Basis-Felder
- **HeroHeader1**: Braucht zusätzlich `images` Array
- **HeroHeader2**: Braucht zusätzlich `videoUrl`
- **HeroHeader3**: Braucht zusätzlich `features` Array

Statt 4 separate Configs → 1 Config mit conditional visibility.

---

## 📂 Datei-Struktur

```
src/heros/
├── config.ts                    # Gemeinsame Konfiguration (MIT conditional fields)
├── RenderHero.tsx               # Hero-Router
├── PostHero/
│   └── index.tsx                # Server Component
└── HeroHeader1/
    ├── index.tsx                # Server Component
    └── ImageCarousel.tsx        # Client Component (optional)
```

---

## 🔧 config.ts Anatomie

### 1. Type Select Field

```typescript
{
  name: 'type',
  type: 'select',
  defaultValue: 'none',
  label: 'Hero Typ',
  required: true,
  admin: {
    description: 'Wählen Sie den Hero-Typ aus. Dies bestimmt, welche Felder verfügbar sind.',
  },
  options: [
    {
      label: 'None',
      value: 'none',
    },
    {
      label: 'Post Hero',
      value: 'postHero',
    },
    {
      label: 'HeroHeader1',
      value: 'heroheader1', // ← Automatisch hinzugefügt durch Generator
    },
    /* PLOP_HERO_TYPE_OPTIONS */ // ← Marker für Generator
  ],
}
```

### 2. Basis-Felder (Immer sichtbar)

```typescript
{
  name: 'title',
  type: 'text',
  label: 'Titel',
  required: true,
  admin: {
    description: 'Hauptüberschrift des Hero-Bereichs',
  },
},
{
  name: 'richText',
  type: 'richText',
  label: 'Beschreibung',
  editor: lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      BoldFeature(),
      ItalicFeature(),
      // ... alle Features
    ],
  }),
}
```

### 3. Conditional Fields

```typescript
{
  name: 'images',
  type: 'array',
  label: 'Bilder',
  admin: {
    description: 'Bildergalerie für Hero Header 1',
    condition: (data, siblingData) => siblingData?.type === 'heroheader1', // ← NUR für HeroHeader1
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
},
/* PLOP_HERO_FIELDS */ // ← Marker für Generator
```

---

## 🎯 Conditional Field Patterns

### Pattern 1: Einzelnes Feld für einen Type

```typescript
{
  name: 'videoUrl',
  type: 'text',
  label: 'Video URL',
  admin: {
    condition: (_, { type }) => type === 'heroheader2',
  },
}
```

### Pattern 2: Mehrere Felder für einen Type

```typescript
{
  name: 'features',
  type: 'array',
  label: 'Features',
  admin: {
    condition: (_, { type }) => type === 'heroheader3',
  },
  fields: [
    { name: 'icon', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'text' },
  ],
},
{
  name: 'showStats',
  type: 'checkbox',
  label: 'Statistiken anzeigen',
  admin: {
    condition: (_, { type }) => type === 'heroheader3',
  },
}
```

### Pattern 3: Feld für mehrere Types

```typescript
{
  name: 'backgroundImage',
  type: 'upload',
  relationTo: 'media',
  label: 'Hintergrundbild',
  admin: {
    condition: (_, { type }) => ['heroheader1', 'heroheader2', 'heroheader3'].includes(type),
  },
}
```

---

## 🚀 Hero Generator Workflow

### 1. Command ausführen

```bash
pnpm generate-hero HeroHeader1
```

### 2. Script-Ablauf

1. Clont Relume Repository temporär
2. Sucht Component in `Header/HeroHeader1/` oder `Hero/HeroHeader1/`
3. Liest `component.tsx` aus
4. Generiert AI-Prompt mit:
   - Relume Component Code
   - Bestehende config.ts
   - PostHero als Referenz
   - Anforderungen für conditional fields
5. Wartet auf AI-Response
6. Parst Response:
   - `index.tsx` → `src/heros/HeroHeader1/index.tsx`
   - `config-update.ts` → Extracted fields für config.ts
   - Optional: Client Components
7. Updated `config.ts`:
   - Fügt Type-Option bei `/* PLOP_HERO_TYPE_OPTIONS */` ein
   - Fügt Conditional Fields bei `/* PLOP_HERO_FIELDS */` ein
8. Registriert in `RenderHero.tsx`
9. Regeneriert Types

### 3. AI-Response Format

```typescript
// ```typescript filename="config-update.ts"
// HERO TYPE OPTION:
{
  label: 'HeroHeader1',
  value: 'heroheader1',
}

// CONDITIONAL FIELDS:
{
  name: 'images',
  type: 'array',
  label: 'Bilder',
  admin: {
    description: 'Bildergalerie für HeroHeader1',
    condition: (data, siblingData) => siblingData?.type === 'heroheader1',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
// ```

// ```tsx filename="index.tsx"
import type { Page } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { Media } from '@/components/Media'

type HeroHeader1Type = Extract<Page['hero'], { type: 'heroheader1' }>

export const HeroHeader1: React.FC<HeroHeader1Type> = ({ title, richText, images }) => {
  return (
    <section className="py-20">
      <h1>{title}</h1>
      <RichText content={richText} />
      {/* ... */}
    </section>
  )
}
// ```
```

---

## 🎨 Styling Guidelines

### ⚠️ WICHTIG: Keine hardcodierten Styles in Komponenten

**Regel:** Frontend-Komponenten dürfen KEINE hardcodierten Schriftgrößen, Textfarben, Hintergrundfarben oder andere Design-Tokens enthalten. Alle Styles müssen global definiert werden.

### ❌ VERBOTEN: Hardcodierte Werte

```tsx
// ❌ FALSCH: Hardcodierte Schriftgrößen
<h1 className="text-6xl md:text-9xl">Hero Titel</h1>

// ❌ FALSCH: Hardcodierte Farben
<p className="text-blue-500">Description</p>
<button className="bg-red-600 hover:bg-red-700">CTA Button</button>

// ❌ FALSCH: Hardcodierte Spacing-Werte
<section className="py-16 md:py-24 lg:py-28">
```

### ✅ RICHTIG: Semantic Klassen oder CSS-Variablen

#### Option 1: Semantic Tailwind Klassen (Empfohlen)
```tsx
// ✅ GUT: Semantic Typography Classes
<h1 className="hero-heading">Hero Titel</h1>
<p className="hero-description">Description</p>

// ✅ GUT: Semantic Color Classes
<button className="btn-primary">CTA Button</button>
<div className="bg-surface text-on-surface">Content</div>
```

#### Option 2: CSS-Variablen mit Tailwind
```tsx
// ✅ GUT: CSS-Variablen
<h1 className="text-[var(--heading-hero)]">Hero Titel</h1>
<p className="text-[var(--text-body)]">Description</p>
```

### 📂 Wo Styles definieren?

#### 1. globals.css - Semantic Utility Classes
```css
/* src/app/globals.css */

/* Typography */
.hero-heading {
  @apply text-6xl font-bold leading-tight md:text-8xl lg:text-9xl;
}

.hero-subheading {
  @apply text-4xl font-semibold md:text-5xl lg:text-6xl;
}

.hero-description {
  @apply text-lg text-gray-600 md:text-xl lg:text-2xl;
}

/* Buttons */
.btn-primary {
  @apply bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-md;
}

.btn-secondary {
  @apply border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md;
}

/* Layout */
.hero-section {
  @apply py-16 md:py-24 lg:py-28;
}
```

#### 2. tailwind.config.ts - Theme Definition
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Semantic Color Names
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        secondary: 'var(--color-secondary)',
        surface: 'var(--color-surface)',
        'on-surface': 'var(--color-on-surface)',
      },
      fontSize: {
        'hero-xl': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-lg': ['4rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
    },
  },
}
```

#### 3. CSS Variables in globals.css
```css
/* src/app/globals.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-primary-light: #60a5fa;
  --color-secondary: #8b5cf6;
  --color-surface: #ffffff;
  --color-on-surface: #1f2937;

  /* Typography */
  --heading-hero: 6rem;
  --heading-large: 4rem;
  --text-body: 1.125rem;
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-surface: #1f2937;
  --color-on-surface: #f9fafb;
}
```

### 🎯 Praktische Beispiele

#### Vorher (❌ Falsch):
```tsx
export const HeroHeader1 = ({ title, description, buttons }) => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <h1 className="text-6xl font-bold text-gray-900 md:text-9xl">
        {title}
      </h1>
      <p className="text-lg text-gray-600 md:text-xl">
        {description}
      </p>
      <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md">
        {buttons[0].title}
      </button>
    </section>
  )
}
```

#### Nachher (✅ Richtig):
```tsx
export const HeroHeader1 = ({ title, description, buttons }) => {
  return (
    <section className="hero-section container">
      <h1 className="hero-heading text-on-surface">
        {title}
      </h1>
      <p className="hero-description">
        {description}
      </p>
      <button className="btn-primary">
        {buttons[0].title}
      </button>
    </section>
  )
}
```

### 🔥 Warum ist das wichtig?

1. **Konsistenz:** Ein zentrales Design-System für alle Komponenten
2. **Wartbarkeit:** Änderungen an einem Ort statt in hunderten Dateien
3. **Themes:** Dark Mode / Brand Themes einfach umschaltbar
4. **Performance:** Wiederverwendbare CSS-Klassen reduzieren Bundle-Größe
5. **Refactoring:** Design-Updates ohne Komponenten-Code anzufassen

---

## 🛡️ Best Practices

### ✅ DO

1. **Verwende semantic CSS-Klassen statt hardcoded Werte:**
   ```tsx
   className="hero-heading" // ✅ Gut
   className="text-6xl md:text-9xl font-bold" // ❌ Falsch
   ```

2. **Verwende lowercase slugs für type values:**
   ```typescript
   value: 'heroheader1' // ✅ Gut
   value: 'HeroHeader1' // ❌ Falsch
   ```

2. **Definiere immer admin.condition für neue Fields:**
   ```typescript
   admin: {
     condition: (_, { type }) => type === 'heroheader1',
   }
   ```

3. **Nutze Extract für Type-Safety:**
   ```typescript
   type HeroHeader1Type = Extract<Page['hero'], { type: 'heroheader1' }>
   ```

4. **Server Component als Standard:**
   ```tsx
   // index.tsx - NO 'use client'
   export const HeroHeader1: React.FC<HeroHeader1Type> = ({ ... }) => {
     return <section>...</section>
   }
   ```

5. **Separate Client Components für Interaktivität:**
   ```tsx
   // ImageCarousel.tsx - MIT 'use client'
   'use client'
   import { useState } from 'react'
   
   export const ImageCarousel = ({ images }: { images: any[] }) => {
     const [current, setCurrent] = useState(0)
     return <div onClick={() => setCurrent(current + 1)}>...</div>
   }
   ```

### ❌ DON'T

1. **Kein 'use client' in index.tsx:**
   ```tsx
   // index.tsx
   'use client' // ❌ Fehler: Module not found: fs
   ```

2. **Keine hardcoded Werte in condition:**
   ```typescript
   admin: {
     condition: () => true, // ❌ Falsch - Field immer sichtbar
   }
   ```

3. **Keine doppelten Field-Namen:**
   ```typescript
   // ❌ Falsch - 'title' ist schon Basis-Field
   {
     name: 'title',
     admin: {
       condition: (_, { type }) => type === 'heroheader1',
     }
   }
   ```

---

## 🔍 Troubleshooting

### Problem: Conditional Field wird nicht angezeigt

**Symptom:** Field erscheint nicht im Admin UI, auch wenn Type ausgewählt

**Diagnose:**
1. Prüfe Type-Wert in config.ts:
   ```typescript
   options: [
     { label: 'HeroHeader1', value: 'heroheader1' }, // Muss lowercase sein
   ]
   ```

2. Prüfe admin.condition:
   ```typescript
   admin: {
     condition: (data, siblingData) => {
       console.log('Type:', siblingData?.type) // Debug
       return siblingData?.type === 'heroheader1' // Muss exakt matchen
     }
   }
   ```

3. Regeneriere Types:
   ```bash
   pnpm generate:types
   ```

### Problem: TypeScript Error nach Hero-Generierung

**Symptom:** `Property 'images' does not exist on type 'Hero'`

**Lösung:**
```bash
# Types regenerieren
pnpm generate:types

# Falls das nicht hilft, TypeScript Server neustarten
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Problem: Hero wird nicht gerendert

**Symptom:** Hero-Bereich bleibt leer

**Diagnose:**
1. Prüfe RenderHero.tsx:
   ```typescript
   const heroes = {
     postHero: PostHero,
     heroheader1: HeroHeader1, // Muss registriert sein
   }
   ```

2. Prüfe Type-Wert in Datenbank:
   ```typescript
   // In RenderHero.tsx temporär loggen
   console.log('Hero type:', type)
   ```

3. Prüfe Import in RenderHero.tsx:
   ```typescript
   import { HeroHeader1 } from './HeroHeader1' // Muss vorhanden sein
   ```

---

## 📋 Checklist: Neue Hero hinzufügen

### Mit Generator (Empfohlen)

- [ ] `pnpm generate-hero HeroHeader1` ausführen
- [ ] AI-Prompt in Claude öffnen
- [ ] Response mit config-update.ts und index.tsx erstellen
- [ ] Response im Terminal einfügen
- [ ] Warten auf automatische Verarbeitung
- [ ] Types-Generierung erfolgreich
- [ ] Hero im Admin UI testen
- [ ] Conditional Fields prüfen
- [ ] Frontend-Rendering testen

### Manuell (Falls nötig)

- [ ] Hero Component in `src/heros/HeroName/index.tsx` erstellen
- [ ] Type-Option in config.ts hinzufügen (bei `/* PLOP_HERO_TYPE_OPTIONS */`)
- [ ] Conditional Fields in config.ts hinzufügen (bei `/* PLOP_HERO_FIELDS */`)
- [ ] Hero in RenderHero.tsx importieren
- [ ] Hero in `heroes` Object registrieren
- [ ] `pnpm generate:types` ausführen
- [ ] Dev-Server neustarten
- [ ] Hero im Admin UI testen
- [ ] Frontend-Rendering testen

---

## 🎓 Erweiterte Patterns

### Pattern: Verschachtelte Conditional Fields

```typescript
{
  name: 'advancedOptions',
  type: 'group',
  label: 'Erweiterte Optionen',
  admin: {
    condition: (_, { type }) => type === 'heroheader1',
  },
  fields: [
    {
      name: 'showOverlay',
      type: 'checkbox',
      label: 'Overlay anzeigen',
    },
    {
      name: 'overlayColor',
      type: 'text',
      label: 'Overlay-Farbe',
      admin: {
        // Verschachtelt: Nur wenn Parent-Group sichtbar UND showOverlay true
        condition: (_, siblingData) => siblingData?.showOverlay === true,
      },
    },
  ],
}
```

### Pattern: Shared Fields mit Override

```typescript
// Basis linkGroup für alle Heroes
linkGroup({
  overrides: {
    maxRows: 2,
  },
})

// Conditional überschriebene Version für spezifischen Hero
{
  ...linkGroup({
    overrides: {
      maxRows: 4, // Mehr Links für HeroHeader3
    },
  }),
  admin: {
    condition: (_, { type }) => type === 'heroheader3',
  },
}
```

---

## 📚 Weitere Ressourcen

- [PayloadCMS Conditional Logic](https://payloadcms.com/docs/admin/fields#conditional-logic)
- [BLOCK_DEVELOPMENT_GUIDE.md](./BLOCK_DEVELOPMENT_GUIDE.md) - Client/Server Patterns
- [scripts/README.md](./scripts/README.md) - Generator-Dokumentation

---

## 🎉 Happy Hero Building!

Mit conditional Fields und dem Generator kannst du in wenigen Minuten professionelle, flexible Hero-Komponenten erstellen.
