# PayloadCMS Block Development - Best Practices

## ⚠️ WICHTIG: Client vs. Server Components

### Das Problem

Wenn ein Block `'use client'` in der Haupt-Component.tsx verwendet, werden **ALLE Imports** client-seitig:
- `RichText` → `@payloadcms/richtext-lexical` → `payloadcms-lexical-ext` → `payload`
- PayloadCMS nutzt Node.js Module (`fs`, `worker_threads`, etc.)
- Diese Module können **nicht** im Browser laufen
- **Resultat:** `Module not found: Can't resolve 'fs'` Fehler

### ✅ Die Lösung: Separation of Concerns

#### Regel 1: Component.tsx ist IMMER ein Server Component
```tsx
// ✅ RICHTIG: Component.tsx (kein 'use client')
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { InteractiveFeature } from './InteractiveFeature' // Client Component

export const MyBlock: React.FC<Props> = ({ richText, media }) => {
  return (
    <section>
      <RichText data={richText} /> {/* Server-seitig OK */}
      <Media resource={media} /> {/* Server-seitig OK */}
      <InteractiveFeature /> {/* Client Component */}
    </section>
  )
}
```

```tsx
// ❌ FALSCH: Component.tsx mit 'use client'
'use client' // ← NIEMALS in Component.tsx!

import RichText from '@/components/RichText' // ← Wird client-seitig → FEHLER!
```

#### Regel 2: Interaktivität in separate Client Components auslagern

```tsx
// ✅ InteractiveFeature.tsx
'use client'

import React, { useState } from 'react'
// Nur UI-Komponenten importieren, KEINE PayloadCMS Imports!

export const InteractiveFeature: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      Toggle
    </button>
  )
}
```

## 📋 Block-Struktur Template

### Einfacher Block (keine Interaktivität)
```
src/blocks/Layout/MyBlock/
├── config.ts          # PayloadCMS Konfiguration
└── Component.tsx      # Server Component (kein 'use client')
```

### Block mit Interaktivität
```
src/blocks/Layout/MyBlock/
├── config.ts              # PayloadCMS Konfiguration
├── Component.tsx          # Server Component (kein 'use client')
└── InteractiveFeature.tsx # Client Component (mit 'use client')
```

## 🎨 Styling Guidelines

### ⚠️ WICHTIG: Keine hardcodierten Styles in Komponenten

**Regel:** Block-Komponenten dürfen KEINE hardcodierten Schriftgrößen, Textfarben, Hintergrundfarben oder andere Design-Tokens enthalten. Alle Styles müssen global definiert werden.

### ❌ VERBOTEN: Hardcodierte Werte

```tsx
// ❌ FALSCH: Hardcodierte Schriftgrößen
<h2 className="text-5xl md:text-7xl font-bold">Block Heading</h2>

// ❌ FALSCH: Hardcodierte Farben
<p className="text-gray-600">Block description</p>
<div className="bg-blue-50 border-blue-200">Card</div>

// ❌ FALSCH: Hardcodierte Spacing
<section className="px-[5%] py-16 md:py-24">
```

### ✅ RICHTIG: Semantic Klassen oder CSS-Variablen

#### Option 1: Semantic Tailwind Klassen (Empfohlen)
```tsx
// ✅ GUT: Semantic Classes
<h2 className="block-heading">Block Heading</h2>
<p className="block-description">Block description</p>
<div className="card">Card</div>
<section className="block-section">Content</section>
```

#### Option 2: CSS-Variablen mit Tailwind
```tsx
// ✅ GUT: CSS-Variablen
<h2 className="text-[var(--heading-lg)] font-[var(--font-bold)]">Block Heading</h2>
<p className="text-[var(--text-secondary)]">Block description</p>
```

### 📂 Wo Styles definieren?

#### 1. globals.css - Semantic Utility Classes
```css
/* src/app/globals.css */

/* Block Typography */
.block-heading {
  @apply text-5xl font-bold leading-tight md:text-7xl lg:text-8xl;
}

.block-subheading {
  @apply text-3xl font-semibold md:text-4xl lg:text-5xl;
}

.block-description {
  @apply text-base text-gray-600 md:text-lg;
}

/* Block Layout */
.block-section {
  @apply px-[5%] py-16 md:py-24 lg:py-28;
}

/* Cards & Components */
.card {
  @apply bg-surface border border-border rounded-lg p-6 shadow-sm;
}

.card-feature {
  @apply bg-surface-variant p-8 rounded-xl;
}
```

#### 2. tailwind.config.ts - Theme Definition
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Semantic Colors
        surface: 'var(--color-surface)',
        'surface-variant': 'var(--color-surface-variant)',
        border: 'var(--color-border)',
        'on-surface': 'var(--color-on-surface)',
        'text-secondary': 'var(--color-text-secondary)',
      },
      spacing: {
        'section-y': 'var(--spacing-section-y)',
        'block-gap': 'var(--spacing-block-gap)',
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
  --color-surface: #ffffff;
  --color-surface-variant: #f9fafb;
  --color-border: #e5e7eb;
  --color-on-surface: #1f2937;
  --color-text-secondary: #6b7280;

  /* Spacing */
  --spacing-section-y: 4rem;
  --spacing-block-gap: 3rem;

  /* Typography */
  --heading-lg: 3rem;
  --heading-md: 2rem;
  --text-base: 1rem;
}

@media (min-width: 768px) {
  :root {
    --spacing-section-y: 6rem;
    --heading-lg: 4.5rem;
  }
}

[data-theme="dark"] {
  --color-surface: #1f2937;
  --color-surface-variant: #374151;
  --color-border: #4b5563;
  --color-on-surface: #f9fafb;
  --color-text-secondary: #d1d5db;
}
```

### 🎯 Praktische Beispiele für Blocks

#### Vorher (❌ Falsch):
```tsx
// Component.tsx
export const Layout1Block: React.FC<Props> = ({ heading, description }) => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
      <h2 className="text-5xl font-bold text-gray-900 mb-5 md:text-7xl md:mb-6">
        {heading}
      </h2>
      <p className="text-base text-gray-600 md:text-lg">
        {description}
      </p>
    </section>
  )
}
```

#### Nachher (✅ Richtig):
```tsx
// Component.tsx
export const Layout1Block: React.FC<Props> = ({ heading, description }) => {
  return (
    <section className="block-section bg-surface">
      <h2 className="block-heading text-on-surface mb-block">
        {heading}
      </h2>
      <p className="block-description">
        {description}
      </p>
    </section>
  )
}
```

#### FAQ Block - Vorher (❌ Falsch):
```tsx
<div className="bg-white border-b border-gray-200 pb-4">
  <h3 className="text-xl font-bold text-gray-900 md:text-2xl">
    {faq.question}
  </h3>
  <p className="text-base text-gray-600 mt-4">
    {faq.answer}
  </p>
</div>
```

#### FAQ Block - Nachher (✅ Richtig):
```tsx
<div className="faq-item">
  <h3 className="faq-question">
    {faq.question}
  </h3>
  <p className="faq-answer">
    {faq.answer}
  </p>
</div>
```

### 🔥 Warum ist das wichtig?

1. **Konsistenz:** Alle Blocks folgen demselben Design-System
2. **Wartbarkeit:** Design-Updates zentral in globals.css/tailwind.config
3. **Themes:** Dark Mode / Brand Switching ohne Block-Code zu ändern
4. **Skalierbarkeit:** Neue Blocks automatisch im korrekten Stil
5. **Performance:** Wiederverwendbare CSS-Klassen = kleinere Bundles

---

## 🎯 Beispiele

### Beispiel 1: Layout1 (Server-Only)
```tsx
// Component.tsx
import React from 'react'
import RichText from '@/components/RichText'

export const Layout1Block: React.FC<Props> = ({ richText, media }) => {
  return (
    <section>
      <RichText data={richText} />
      <Media resource={media} />
    </section>
  )
}
```

### Beispiel 2: Layout2 (mit Video Modal)
```tsx
// Component.tsx (Server Component)
import React from 'react'
import RichText from '@/components/RichText'
import { VideoPlayer } from './VideoPlayer' // Client Component

export const Layout2Block: React.FC<Props> = ({ richText, videoUrl, media }) => {
  return (
    <section>
      <RichText data={richText} />
      <VideoPlayer videoUrl={videoUrl} media={media} />
    </section>
  )
}
```

```tsx
// VideoPlayer.tsx (Client Component)
'use client'

import React, { useState } from 'react'
import { Media } from '@/components/Media'

export const VideoPlayer: React.FC<Props> = ({ videoUrl, media }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <Media resource={media} />
      </button>
      {isOpen && <VideoModal videoUrl={videoUrl} />}
    </>
  )
}
```

## 🚀 Automated Generator

Das Script `scripts/generate-blocks.mjs` erstellt automatisch die richtige Struktur:

```bash
pnpm generate-blocks Layout3 CTA1 FAQ1
```

Die AI (Claude Sonnet 4.5) wurde instruiert:
- ✅ Component.tsx **ohne** `'use client'`
- ✅ Separate Client Components bei Bedarf
- ✅ Keine PayloadCMS Imports in Client Components

## 🔧 Troubleshooting

### Fehler: `Module not found: Can't resolve 'fs'`
**Ursache:** `'use client'` in Component.tsx, die RichText oder andere PayloadCMS-Komponenten importiert

**Lösung:**
1. Entferne `'use client'` aus Component.tsx
2. Erstelle separate Client Component für interaktive Features
3. Importiere Client Component in Component.tsx

### Fehler: `Can't resolve 'worker_threads'`
**Ursache:** Gleiche wie oben

**Lösung:** Gleiche wie oben

## 📝 Checklist für neue Blöcke

- [ ] `config.ts` erstellt mit deutschen Labels
- [ ] `Component.tsx` ist ein Server Component (kein `'use client'`)
- [ ] Interaktive Features in separate `*.tsx` Dateien ausgelagert
- [ ] Client Components importieren NUR UI-Komponenten
- [ ] Block in `RenderBlocks.tsx` registriert
- [ ] Block in `Pages/index.ts` registriert
- [ ] Types regeneriert: `pnpm generate:types`
- [ ] Dev-Server startet ohne Fehler: `pnpm dev`

## 🎓 Warum ist das wichtig?

Next.js 13+ nutzt **React Server Components** als Standard:
- Server Components: Rendern auf dem Server, können Node.js APIs nutzen
- Client Components: Rendern im Browser, kein Zugriff auf Node.js APIs

PayloadCMS ist ein **Backend-System** und nutzt Node.js:
- `fs` für File System
- `worker_threads` für Logging
- `crypto`, `path`, `os`, etc.

Wenn wir `'use client'` in Component.tsx verwenden, versucht Next.js, das gesamte PayloadCMS-System im Browser zu laden → **Fehler**.

## 📚 Weitere Ressourcen

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [PayloadCMS Blocks](https://payloadcms.com/docs/fields/blocks)
- [React Server vs. Client Components](https://react.dev/reference/rsc/server-components)
