# PayloadCMS + Drizzle + NeonDB - Entwicklungsstrategie

## Tech Stack
- **CMS**: PayloadCMS v3 (Payload 3)
- **ORM**: Drizzle (via `@payloadcms/db-vercel-postgres`)
- **Database**: NeonDB (Vercel Postgres)
- **Storage**: Vercel Blob Storage
- **Hosting**: Vercel Pro
- **Framework**: Next.js 15 (App Router)

---

## NeonDB Branching Strategie

Wir verwenden **3 NeonDB Branches** die den Vercel Environments entsprechen:

| NeonDB Branch | Vercel Environment | Zweck |
|---|---|---|
| `main` | Production | Live-Datenbank, nur getestete Migrationen |
| `preview` | Preview | Preview Deployments, testet Migrationen vor Production |
| `dev` | Development (lokal) | Lokale Entwicklung, Schema-Änderungen testen |

### Environment Variables pro Branch

```env
# Production (Vercel Production Environment)
POSTGRES_URL=postgres://...@ep-xxx.eu-central-1.aws.neon.tech/neondb  # main branch

# Preview (Vercel Preview Environment)
POSTGRES_URL=postgres://...@ep-xxx.eu-central-1.aws.neon.tech/neondb  # preview branch

# Development (.env.local)
POSTGRES_URL=postgres://...@ep-xxx.eu-central-1.aws.neon.tech/neondb  # dev branch
```

### NeonDB Branch Setup

```bash
# In Neon Console oder via CLI:
# 1. main branch existiert bereits (Standard)
# 2. preview branch erstellen (von main abgeleitet)
# 3. dev branch erstellen (von main abgeleitet)

# Vercel Environment Variables konfigurieren:
# Production → main branch connection string
# Preview → preview branch connection string
# .env.local → dev branch connection string
```

---

## Drizzle Migration Workflow

### GOLDENE REGELN

1. **NIEMALS** `payload migrate` oder `payload migrate:create` in Production ausführen
2. **NIEMALS** Schema manuell in der Datenbank ändern
3. **IMMER** erst auf `dev` Branch testen, dann `preview`, dann `main`
4. **IMMER** `pnpm payload migrate:create` verwenden, NICHT direkt Drizzle CLI
5. **Migration-Dateien NIEMALS löschen** - sie sind Teil der History

### Standard-Workflow: Schema-Änderung

```bash
# 1. Sicherstellen dass .env.local auf dev branch zeigt
# 2. Schema ändern (collections, blocks, globals in src/)

# 3. Migration erstellen
pnpm payload migrate:create

# 4. Migration auf dev Branch anwenden
pnpm payload migrate

# 5. Testen dass alles funktioniert
pnpm dev

# 6. Commit & Push → Preview Deployment testet auf preview Branch
git add -A && git commit -m "feat: neue Felder hinzugefügt"
git push

# 7. Nach erfolgreicher Preview → Merge in main
# Vercel Production Deployment führt Migration auf main Branch aus
```

### Migration-Befehle

| Befehl | Wann verwenden |
|---|---|
| `pnpm payload migrate:create` | Nach Schema-Änderungen, erstellt neue Migration |
| `pnpm payload migrate` | Führt ausstehende Migrationen aus |
| `pnpm payload migrate:status` | Zeigt Status aller Migrationen |
| `pnpm payload migrate:down` | Letzte Migration rückgängig machen |
| `pnpm payload migrate:fresh` | **NUR DEV** - Datenbank komplett neu aufbauen |
| `pnpm payload migrate:reset` | **NUR DEV** - Alle Migrationen rückgängig machen |

### Troubleshooting: Migration Errors

#### Problem: "relation does not exist" (42P01)
```bash
# Ursache: Migrationen wurden noch nicht ausgeführt
pnpm payload migrate
```

#### Problem: "column already exists" oder Enum-Konflikte
```bash
# Ursache: Schema-Drift zwischen Code und DB
# Lösung 1: Migration-Datei anpassen (SQL editieren)
# Lösung 2: NUR auf dev branch - frisch starten:
pnpm payload migrate:fresh
```

#### Problem: Interactive Drizzle Prompts (Enum renames)
```bash
# Drizzle fragt: "Is X renamed to Y?"
# -> Immer mit Bedacht antworten
# -> Bei Unsicherheit: Migration löschen, Schema vereinfachen, neu erstellen
```

#### Problem: Dev Branch out of sync
```bash
# dev Branch in NeonDB löschen und neu von main erstellen
# Dann: pnpm payload migrate
```

---

## PayloadCMS Conventions

### Block-Architektur
- Block-Configs in `src/blocks/{Category}/{BlockName}/config.ts`
- Block-Components in `src/blocks/{Category}/{BlockName}/Component.tsx`
- Client-Interaktivität in separaten Dateien mit `'use client'`
- Registrierung in `src/blocks/RenderBlocks.tsx` und `src/collections/Pages/index.ts`

### Hero-Architektur  
- Hero-Config in `src/heros/config.ts` (conditional fields per type)
- Hero-Components in `src/heros/{HeroName}/Component.tsx`
- Registrierung in `src/heros/RenderHero.tsx`

### Feld-Mappings (Relume → PayloadCMS)
| Relume | PayloadCMS Config | PayloadCMS Frontend |
|---|---|---|
| `tagline: string` | `{ name: 'tagline', type: 'text' }` | `{tagline}` (plain text) |
| `heading: string` | `{ name: 'heading', type: 'text' }` | `{heading}` (plain text) |
| `description: string` | `createRichTextField(...)` | `<RichText data={description} enableGutter={false} enableProse={false} />` |
| `buttons: Button[]` | `linkGroup({ overrides: {...} })` | `{links?.map(({ link }, i) => <CMSLink key={i} {...link} />)}` |
| `image: ImageProps` | `{ type: 'upload', relationTo: 'media' }` | `<Media resource={image} imgClassName="..." />` |

### Type Pattern
```tsx
// Blocks
type MyBlockType = Extract<Page['layout'][0], { blockType: 'myblock' }>
export const MyBlock: React.FC<MyBlockType> = ({ ... }) => { ... }

// Heroes - Props interface statt Extract
type Props = { tagline: string; heading: string; ... }
export const MyHero: React.FC<Props> = ({ ... }) => { ... }
```

### Imports
```tsx
import React from 'react'
import type { Page } from '@/payload-types'           // Block types
import type { Media as MediaType } from '@/payload-types' // Hero types
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
```

---

## Vercel Konfiguration

### Environment Variables
```
# Alle Environments
PAYLOAD_SECRET          → Gleich für alle
BLOB_READ_WRITE_TOKEN   → Gleich für alle
CRON_SECRET             → Gleich für alle
PREVIEW_SECRET          → Gleich für alle
NEXT_PUBLIC_SERVER_URL  → Pro Environment unterschiedlich

# Pro Environment unterschiedlich (NeonDB Branches)
POSTGRES_URL             → Je nach Branch (main/preview/dev)
```

### Deployment Flow
```
git push → Vercel Preview (preview branch DB)
           ↓ Test erfolgreich
         Merge → Vercel Production (main branch DB)
```

### Build Command
PayloadCMS führt `payload migrate` automatisch beim Build aus, wenn `PAYLOAD_MIGRATE_FRESH` nicht gesetzt ist.

---

## Code-Qualität Regeln

1. **Keine `'use client'` in Component.tsx** von Blocks/Heroes
2. **Keine hardcodierten Farben/Spacing** - Tailwind CSS Variables nutzen
3. **Deutsche Labels** für alle PayloadCMS Felder
4. **`pnpm payload generate:types`** nach jeder Config-Änderung
5. **Null-Checks** für optionale Felder: `{x && typeof x === 'object' && <Media resource={x} />}`
6. **Keine Felder erfinden** die nicht im Relume Original sind
