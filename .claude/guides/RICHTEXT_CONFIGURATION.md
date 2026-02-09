# RichText Field Configuration Guide

## Overview

This guide explains the standardized RichText configuration for Payload CMS. All RichText fields in this project use the **exact same configuration** as the Hero section to ensure consistency, proper JSONB serialization, and cross-project compatibility.

## The Standard: Hero-Section RichText Configuration

All RichText fields use the same feature set as defined in the Hero section:

### ✅ Included Features

- **Text Formatting**: Bold, Italic, Underline, Strikethrough
- **Headings**: h1, h2, h3, h4, h5, h6 (oder h2-h4 in Simple Variant)
- **Lists**: Ordered Lists, Unordered Lists, Checklists
- **Blockquotes**: Zitate und Hervorhebungen
- **Links**: Internal (Pages, Posts) & External mit Custom Validation
- **Alignment & Indentation**: Text-Ausrichtung und Einrückung
- **Typography**: Subscript, Superscript
- **Colors**: Text Color, Highlight Color, Background Color
- **Media**: Youtube Embeds, Vimeo Embeds
- **Layout**: Horizontal Rules, Blocks Feature
- **Toolbars**: Fixed Toolbar, Inline Toolbar

## Usage

### Import the Factory Functions

```typescript
import { createRichTextField, createSimpleRichTextField } from '@/fields/richtext'
```

### 1. Full-Featured RichText (Standard)

Verwende dies für alle Haupt-Content-Bereiche:

```typescript
// In Collections (z.B. Pages, Posts, Blocks)
export const Pages = buildCollectionConfig({
  slug: 'pages',
  fields: [
    createRichTextField({
      name: 'content',
      label: 'Seiteninhalt',
      required: true,
    }),
  ],
})
```

### 2. Simple RichText

Verwende dies für kürzere Texte (Auszüge, Beschreibungen):

```typescript
// Für Excerpts, Meta-Descriptions, etc.
createSimpleRichTextField({
  name: 'excerpt',
  label: 'Auszug',
  required: false,
})
```

**Unterschied**: Nur h2-h4 Headings statt h1-h6

### 3. Custom Collections für Links

Standardmäßig sind Links zu `pages` und `posts` aktiviert. Du kannst weitere Collections hinzufügen:

```typescript
createRichTextField({
  name: 'description',
  label: 'Beschreibung',
  enabledCollections: ['pages', 'posts', 'products', 'team'],
})
```

### 4. Admin-Optionen

Du kannst Admin-Optionen wie gewohnt überschreiben:

```typescript
createRichTextField({
  name: 'conditionalContent',
  label: 'Bedingter Inhalt',
  admin: {
    condition: (data, siblingData) => siblingData?.showContent === true,
    description: 'Dieser Inhalt wird nur angezeigt wenn "Content anzeigen" aktiv ist',
  },
})
```

## Best Practices

### ✅ DO: Verwende die Factory Functions

```typescript
// ✅ Korrekt
createRichTextField({
  name: 'content',
  label: 'Inhalt',
})

// ✅ Auch korrekt - mit Optionen
createRichTextField({
  name: 'description',
  label: 'Beschreibung',
  required: true,
  enabledCollections: ['pages', 'posts', 'products'],
})
```

### ❌ DON'T: Erstelle keine custom Lexical Configs

```typescript
// ❌ Falsch - nicht tun!
{
  name: 'content',
  type: 'richText',
  editor: lexicalEditor({
    features: () => [
      ParagraphFeature(),
      // ... custom features
    ]
  })
}
```

**Warum?**

- Inkonsistente JSONB-Struktur
- Type-Mismatch in payload-types.ts
- Migration-Probleme
- Keine Cross-Project Kompatibilität

### ⚠️ AVOID: Inline Field Definitions

```typescript
// ⚠️ Vermeiden
{
  ...createRichTextField(),
  name: 'content',
  editor: lexicalEditor({ /* override */ }) // ← Nicht überschreiben!
}
```

## Verwendung in Blocks

### Block-Definition

```typescript
// src/blocks/ContentBlock/ContentBlock.config.ts
import { Block } from 'payload/types'
import { createRichTextField } from '@/fields/richtext'

export const ContentBlock: Block = {
  slug: 'content-block',
  labels: {
    singular: 'Content Block',
    plural: 'Content Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    createRichTextField({
      name: 'content',
      label: 'Inhalt',
      required: true,
    }),
  ],
}
```

### Hero-Definition

```typescript
// src/fields/hero/index.ts
import { createRichTextField } from '@/fields/richtext'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        /* ... */
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    createRichTextField({
      name: 'richText',
      label: 'Fließtext',
      admin: {
        description: 'Beschreibungstext unter der Überschrift',
      },
    }),
    // ... weitere Felder
  ],
}
```

## Migration von bestehenden RichText-Feldern

Wenn du bereits RichText-Felder hast, migriere sie schrittweise:

### Vorher (Alt)

```typescript
{
  name: 'content',
  type: 'richText',
  editor: lexicalEditor({
    features: ({ rootFeatures }) => {
      return [
        ...rootFeatures,
        ParagraphFeature(),
        BoldFeature(),
        // ... weitere Features
      ]
    }
  })
}
```

### Nachher (Neu)

```typescript
createRichTextField({
  name: 'content',
  label: 'Inhalt',
  required: true,
})
```

**Vorgehen:**

1. Ersetze das Feld durch die Factory Function
2. Starte `pnpm dev` - Payload generiert automatisch die Migration
3. Teste im Admin UI
4. Committe die Änderungen

## Type Safety & JSONB Compatibility

Die Factory Functions garantieren:

### ✅ Konsistente JSONB-Struktur

Alle RichText-Felder haben die gleiche Daten-Struktur

### ✅ Korrekte Type-Generierung

`payload-types.ts` generiert korrekte TypeScript-Types

### ✅ Cross-Project Kompatibilität

Projekte die dieses Template nutzen haben identische Typen

### ✅ Standard Features Only

Verwendet nur offizielle Payload CMS Features + payloadcms-lexical-ext

## Feature-Details

### Link Configuration

Interne und externe Links mit custom Validation:

```typescript
LinkFeature({
  enabledCollections: ['pages', 'posts'], // oder custom
  fields: ({ defaultFields }) => {
    // Custom URL field mit Validation
    // - Required nur für externe Links
    // - Ignoriert für interne Links
  },
})
```

### Color Features

Drei verschiedene Color-Picker:

- `TextColorFeature()` - Text-Farbe
- `HighlightColorFeature()` - Text-Hintergrund/Highlight
- `BgColorFeature()` - Block-Hintergrund

### Video Embeds

- `YoutubeFeature()` - Youtube-Videos einbetten
- `VimeoFeature()` - Vimeo-Videos einbetten

### Blocks Feature

`BlocksFeature({})` ermöglicht das Einbetten von wiederverwendbaren Content-Blöcken innerhalb von RichText.

## Troubleshooting

### Problem: "Type mismatch in RichText field"

**Lösung**: Verwende die Factory Function

```typescript
// ✅ Fix
import { createRichTextField } from '@/fields/richtext'

createRichTextField({ name: 'content' })
```

### Problem: "JSONB type error during migration"

**Lösung**:

1. Prüfe ob alle RichText-Felder die Factory Function nutzen
2. Lösche fehlerhafte Migrations
3. Führe `pnpm dev` aus für neue Migration

### Problem: "Cannot find module 'payloadcms-lexical-ext'"

**Installation**:

```bash
pnpm add payloadcms-lexical-ext
```

Diese Extension ist **erforderlich** für:

- TextColorFeature
- HighlightColorFeature
- BgColorFeature
- YoutubeFeature
- VimeoFeature

### Problem: "Different types between projects"

**Lösung**:

1. Kopiere `src/fields/richtext.ts` in alle Projekte
2. Refactore alle RichText-Felder zu Factory Functions
3. Führe Migrations aus

## Examples

### Blog Post Content

```typescript
// src/collections/Posts.ts
import { createRichTextField } from '@/fields/richtext'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    createSimpleRichTextField({
      name: 'excerpt',
      label: 'Auszug',
      required: true,
    }),
    createRichTextField({
      name: 'content',
      label: 'Beitrag',
      required: true,
      enabledCollections: ['pages', 'posts', 'media'],
    }),
  ],
}
```

### Product Description

```typescript
// src/collections/Products.ts
import { createRichTextField } from '@/fields/richtext'

export const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    createSimpleRichTextField({
      name: 'shortDescription',
      label: 'Kurzbeschreibung',
      required: true,
    }),
    createRichTextField({
      name: 'detailedDescription',
      label: 'Detaillierte Beschreibung',
      enabledCollections: ['products', 'pages'],
    }),
  ],
}
```

### Team Member Bio

```typescript
// src/collections/Team.ts
import { createRichTextField } from '@/fields/richtext'

export const Team: CollectionConfig = {
  slug: 'team',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    createRichTextField({
      name: 'bio',
      label: 'Biografie',
      enabledCollections: ['team', 'pages'],
    }),
  ],
}
```

## Version Compatibility

Diese Konfiguration funktioniert mit:

- Payload CMS v3+
- @payloadcms/richtext-lexical v1+
- payloadcms-lexical-ext v1+
- Vercel Postgres Adapter

## Zusammenfassung

**Eine Regel für alle RichText-Felder:**

```typescript
import { createRichTextField } from '@/fields/richtext'

// Haupt-Content
createRichTextField({ name: 'content', label: 'Inhalt', required: true })

// Kurz-Content
createSimpleRichTextField({ name: 'excerpt', label: 'Auszug' })
```

**Das war's!** Keine custom Configs, keine Inkonsistenzen, keine Type-Fehler.

## Additional Resources

- [Payload CMS RichText Docs](https://payloadcms.com/docs/rich-text)
- [Lexical Editor Docs](https://lexical.dev/)
- [Payload Lexical Features](https://payloadcms.com/docs/lexical)
- [payloadcms-lexical-ext](https://github.com/AlessioGr/payloadcms-lexical-ext)
