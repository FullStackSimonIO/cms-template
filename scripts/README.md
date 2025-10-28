# 🚀 AI-Powered Block & Hero Generators

Automatische Generierung von PayloadCMS Blöcken und Heroes aus Relume-Komponenten mit KI-Unterstützung (Claude Sonnet 4.5).

---

## 📦 Block Generator

Erstellt PayloadCMS Blöcke aus Relume-Komponenten mit automatischer Client/Server-Trennung.

### Verwendung

```bash
pnpm generate-blocks Layout1 Layout2 Contact1 FAQ1
```

### Verwendung

```bash
pnpm generate-blocks Layout1 Layout2 Contact1 FAQ1
```

### Was wird generiert?

Für jeden Block:
- `src/blocks/{Category}/{BlockName}/config.ts` - PayloadCMS Konfiguration
- `src/blocks/{Category}/{BlockName}/Component.tsx` - Server Component
- `src/blocks/{Category}/{BlockName}/*.tsx` - Optionale Client Components (bei Interaktivität)

### Workflow

1. Script clont Relume Repository temporär
2. Liest Komponente aus `{Category}/{BlockName}/component.tsx`
3. Generiert AI-Prompt mit Layout1 und Layout2 als Referenz
4. Wartet auf manuelle AI-Konvertierung (du öffnest Claude)
5. Parst AI-Response und erstellt Dateien
6. Registriert Block in `RenderBlocks.tsx` und `Pages/index.ts`
7. Regeneriert TypeScript Types

### Features

- ✅ **Automatische Client/Server-Trennung**: Verhindert `'use client'` Probleme
- ✅ **Voller Lexical Editor**: 20+ Features (Bold, Italic, Colors, Videos, etc.)
- ✅ **Deutsche Labels**: Alle Felder mit deutschen Beschreibungen
- ✅ **Keine Farboptionen**: Automatisch entfernt
- ✅ **Type-Safe**: Extract-Pattern für saubere Types

### Beispiel-Output

```
src/blocks/Layout/Layout2/
├── config.ts           # PayloadCMS Konfiguration
├── Component.tsx       # Server Component (nutzt RichText)
└── VideoPlayer.tsx     # Client Component (mit 'use client')
```

---

## 🎨 Hero Generator

Erstellt PayloadCMS Heroes aus Relume Header/Hero-Komponenten mit **conditional Fields**.

### Verwendung

```bash
pnpm generate-hero HeroHeader1 HeroHeader2
```

### Was wird generiert?

Für jeden Hero:
- `src/heros/{HeroName}/index.tsx` - Server Component
- `src/heros/{HeroName}/*.tsx` - Optionale Client Components
- **Update** `src/heros/config.ts` - Fügt conditional Fields hinzu

### Besonderheit: Conditional Fields

Heroes teilen sich eine gemeinsame Config. Jeder Hero-Type hat eigene Fields, die nur angezeigt werden, wenn der Type ausgewählt ist:

```typescript
{
  name: 'tagline',
  type: 'text',
  label: 'Unterüberschrift',
  admin: {
    condition: (data, siblingData) => siblingData?.type === 'heroheader1',
  },
}
```

### Workflow

1. Script clont Relume Repository
2. Liest Hero aus `Header/{HeroName}/` oder `Hero/{HeroName}/`
3. Generiert AI-Prompt mit PostHero als Referenz
4. Wartet auf manuelle AI-Konvertierung (du öffnest Claude)
5. Parst AI-Response:
   - Erstellt Hero Component
   - **Updated config.ts** mit neuen conditional Fields
   - Fügt Type-Option hinzu
6. Registriert Hero in `RenderHero.tsx`
7. Regeneriert Types und prüft auf Fehler

### Config Structure

```typescript
export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Post Hero', value: 'postHero' },
        { label: 'HeroHeader1', value: 'heroheader1' }, // ← Automatisch hinzugefügt
      ],
    },
    // Basis-Felder (immer sichtbar)
    { name: 'title', type: 'text' },
    { name: 'richText', type: 'richText' },
    
    // Conditional Fields (nur für bestimmte Types)
    {
      name: 'images',
      type: 'array',
      admin: {
        condition: (_, { type }) => type === 'heroheader1',
      },
    },
  ],
}
```

---

## 🛠️ Technische Details

### Client vs. Server Components

**Problem:** `'use client'` in Component.tsx → PayloadCMS-Imports werden client-seitig → Node.js Module im Browser → **Fehler**

**Lösung:** Separation of Concerns
- `Component.tsx` / `index.tsx`: **Server Component** (nutzt RichText, Media, etc.)
- `InteractiveComponent.tsx`: **Client Component** (enthält useState, onClick, etc.)

### AI-Prompt Structure

Beide Generatoren nutzen strukturierte Prompts mit:
- ✅ Relume Komponenten-Code
- ✅ Bestehende Beispiele (Layout1, PostHero)
- ✅ Anforderungen (deutsche Labels, keine Farben, Lexical Features)
- ✅ Mappings (tagline → text, description → richText, etc.)
- ✅ Output Format (Code-Blöcke mit filenames)

### Automatische Registrierung

**Blöcke:**
```typescript
// RenderBlocks.tsx
import { Layout2Block } from '@/blocks/Layout/Layout2/Component'

const blockComponents = {
  layout2: Layout2Block, // ← Automatisch hinzugefügt
}
```

```typescript
// Pages/index.ts
import { Layout2 } from '@/blocks/Layout/Layout2/config'

blocks: [Layout1, Layout2 /* PLOP_BLOCKS */]
```

**Heroes:**
```typescript
// RenderHero.tsx
import { HeroHeader1 } from './HeroHeader1'

const heroes = {
  postHero: PostHero,
  heroheader1: HeroHeader1, // ← Automatisch hinzugefügt
}
```

---

## 📋 Checklists

### Nach Block-Generierung

- [ ] Component.tsx hat **kein** `'use client'`
- [ ] Interaktive Features in separate Dateien
- [ ] Block in RenderBlocks.tsx registriert
- [ ] Block in Pages/index.ts registriert
- [ ] Types regeneriert ohne Fehler
- [ ] Dev-Server startet ohne Fehler

### Nach Hero-Generierung

- [ ] index.tsx hat **kein** `'use client'`
- [ ] config.ts wurde korrekt erweitert
- [ ] Type-Option wurde hinzugefügt
- [ ] Conditional Fields haben `admin.condition`
- [ ] Hero in RenderHero.tsx registriert
- [ ] Types regeneriert ohne Fehler
- [ ] Migration erstellt falls nötig

---

## 🐛 Troubleshooting

### Fehler: `Module not found: Can't resolve 'fs'`

**Ursache:** `'use client'` in Component/Hero, die PayloadCMS-Komponenten importiert

**Lösung:**
1. Entferne `'use client'` aus Component/index.tsx
2. Lagere interaktive Features in separate Client Components aus
3. Restart Dev-Server

### Fehler: `Property 'fieldName' does not exist on type`

**Ursache:** Types nicht regeneriert nach config-Änderung

**Lösung:**
```bash
pnpm generate:types
```

### Hero Fields werden nicht angezeigt

**Ursache:** Falsche `admin.condition` oder Type-Wert

**Lösung:** Prüfe in config.ts:
```typescript
admin: {
  condition: (data, siblingData) => siblingData?.type === 'correct-slug-here',
}
```

---

## 📚 Weitere Dokumentation

- [BLOCK_DEVELOPMENT_GUIDE.md](../BLOCK_DEVELOPMENT_GUIDE.md) - Best Practices für Block-Entwicklung
- [PayloadCMS Blocks](https://payloadcms.com/docs/fields/blocks)
- [PayloadCMS Conditional Logic](https://payloadcms.com/docs/admin/fields#conditional-logic)

---

## � Nächste Schritte

1. **Teste Block Generator:**
   ```bash
   pnpm generate-blocks Contact2
   ```

2. **Teste Hero Generator:**
   ```bash
   pnpm generate-hero HeroHeader1
   ```

3. **Erstelle Custom Components** basierend auf den generierten Beispielen

4. **Erweitere AI-Prompts** für bessere Ergebnisse
