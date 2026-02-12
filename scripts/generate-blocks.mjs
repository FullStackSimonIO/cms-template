#!/usr/bin/env node

/**
 * AI-Powered Relume to PayloadCMS Block Generator
 *
 * Clont das Relume Repository temporär und nutzt KI (Claude Sonnet 4.5)
 * um Komponenten intelligent zu analysieren und in PayloadCMS Blöcke umzuwandeln
 *
 * Usage: pnpm generate-blocks Layout1 Layout2 CTA1 FAQ1
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import os from 'os'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GITHUB_REPO = 'https://github.com/FullStackSimonIO/relume-components.git'
const TEMP_DIR = path.join(os.tmpdir(), 'relume-components-temp')

// Farben für Console Output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * Extrahiert Kategorie aus Block-Namen (z.B. "Layout1" -> "Layout")
 */
function extractCategory(blockName) {
  const match = blockName.match(/^([A-Za-z]+)/)
  return match ? match[1] : 'Layout'
}

/**
 * Clont das Relume Repository temporär
 */
function cloneRelumeRepo() {
  log(`\n📦 Cloning Relume repository...`, 'blue')

  // Lösche altes temp directory falls vorhanden
  if (fs.existsSync(TEMP_DIR)) {
    log(`  🗑️  Cleaning up old temp directory...`, 'yellow')
    fs.rmSync(TEMP_DIR, { recursive: true, force: true })
  }

  try {
    execSync(`git clone --depth 1 ${GITHUB_REPO} "${TEMP_DIR}"`, {
      stdio: 'pipe',
      encoding: 'utf-8',
    })
    log(`  ✅ Repository cloned successfully`, 'green')
    return true
  } catch (error) {
    log(`  ❌ Error cloning repository: ${error.message}`, 'red')
    return false
  }
}

/**
 * Liest Relume-Komponente aus dem geclonten Repo
 */
function readRelumeComponent(blockName) {
  const category = extractCategory(blockName)
  const componentPath = path.join(TEMP_DIR, category, blockName, 'component.tsx')

  log(`📂 Reading ${blockName} from local repo...`, 'blue')

  if (!fs.existsSync(componentPath)) {
    log(`  ❌ Component not found: ${componentPath}`, 'red')
    log(`  💡 Available in ${category}/: ${listAvailableBlocks(category).join(', ')}`, 'yellow')
    return null
  }

  try {
    const content = fs.readFileSync(componentPath, 'utf-8')
    log(`  ✅ Component loaded (${content.length} chars)`, 'green')
    return { content, category, componentPath }
  } catch (error) {
    log(`  ❌ Error reading component: ${error.message}`, 'red')
    return null
  }
}

/**
 * Listet verfügbare Blöcke in einer Kategorie
 */
function listAvailableBlocks(category) {
  const categoryPath = path.join(TEMP_DIR, category)
  if (!fs.existsSync(categoryPath)) return []

  try {
    return fs
      .readdirSync(categoryPath)
      .filter((name) => fs.statSync(path.join(categoryPath, name)).isDirectory())
      .slice(0, 10) // Nur erste 10 für Übersicht
  } catch {
    return []
  }
}

/**
 * Cleanup: Entfernt temporäres Repository
 */
function cleanupTempRepo() {
  if (fs.existsSync(TEMP_DIR)) {
    log(`\n🧹 Cleaning up temporary repository...`, 'blue')
    try {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true })
      log(`  ✅ Cleanup complete`, 'green')
    } catch (error) {
      log(`  ⚠️  Could not cleanup: ${error.message}`, 'yellow')
    }
  }
}

/**
 * Erstellt AI Prompt für die Konvertierung
 */
function createAIPrompt(blockName, componentContent, category) {
  const existingExample = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'blocks', 'Layout', 'Layout1', 'Component.tsx'),
    'utf-8',
  )
  const existingConfig = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'blocks', 'Layout', 'Layout1', 'config.ts'),
    'utf-8',
  )

  return `# Aufgabe: Relume Komponente "${blockName}" 1:1 in PayloadCMS Block umwandeln

## Kontext
Du bist ein Experte für PayloadCMS und React. Wandle die Relume-Komponente **exakt 1:1** in einen PayloadCMS Block um.
Behalte die EXAKTE HTML-Struktur und alle Tailwind-Klassen bei. Ändere NUR die Datenquellen.

## Relume Original: ${blockName}

\`\`\`tsx
${componentContent}
\`\`\`

## STRIKTE REGELN - KEINE ABWEICHUNGEN

### Dateistruktur
- Config: \`src/blocks/${category}/${blockName}/config.ts\`
- Component: \`src/blocks/${category}/${blockName}/Component.tsx\`
- Falls Client-Interaktivität nötig: separates \`src/blocks/${category}/${blockName}/ClientComponent.tsx\` mit \`'use client'\`

### Config Regeln (config.ts)
- Block Slug: \`${blockName.toLowerCase()}\`
- Interface Name: \`${blockName}Block\`
- Deutsche Labels
- Verwende \`createRichTextField\` für Fließtexte und \`linkGroup()\` für Buttons
- **KEINE imagePosition/spacing/backgroundColor Felder hinzufügen**
- **KEINE Felder erfinden die nicht im Original sind**

#### Feld-Mappings (Relume → PayloadCMS Config):
| Relume Prop | PayloadCMS Config Feld |
|---|---|
| \`tagline: string\` | \`{ name: 'tagline', type: 'text', required: true }\` |
| \`heading: string\` | \`{ name: 'heading', type: 'text', required: true }\` |
| \`description: string\` | \`createRichTextField({ name: 'description', label: 'Beschreibung', required: true })\` |
| \`buttons: ButtonProps[]\` | \`linkGroup({ overrides: { label: 'Buttons', maxRows: 2 } })\` |
| \`image: ImageProps\` | \`{ name: 'image', type: 'upload', relationTo: 'media', required: true }\` |
| \`icon: React.ReactNode\` | \`{ name: 'icon', type: 'upload', relationTo: 'media', required: true }\` |
| \`features: Feature[]\` | \`{ name: 'features', type: 'array', fields: [...] }\` - Unterfelder analog mappen |
| \`sections: Section[]\` | \`{ name: 'sections', type: 'array', fields: [...] }\` - Unterfelder analog mappen |

### Component.tsx Regeln
- **KEIN \`'use client'\`** - immer Server Component
- Type: \`Extract<Page['layout'][0], { blockType: '${blockName.toLowerCase()}' }>\`
- **EXAKT dieselbe HTML-Struktur und Tailwind-Klassen wie im Original**
- \`id="relume"\` entfernen

#### Komponenten-Mappings (Relume → PayloadCMS Frontend):
| Relume Original | PayloadCMS Ersatz |
|---|---|
| \`<img src={x.src} alt={x.alt} className="...">\` | \`{x && typeof x === 'object' && <Media resource={x} imgClassName="..." />}\` |
| \`<p>{description}</p>\` oder \`<p className="md:text-md">{description}</p>\` | \`<RichText data={description} enableGutter={false} enableProse={false} className="md:text-md" />\` |
| \`<Button {...button}>{button.title}</Button>\` | \`<CMSLink key={i} {...link} />\` (innerhalb \`{links?.map(({ link }, i) => ...)}\`) |
| \`{tagline}\` (plain string) | Bleibt als \`<p className="...">{tagline}</p>\` (plain text) |
| \`{heading}\` (plain string) | Bleibt als \`<h2 className="...">{heading}</h2>\` (plain text) |
| \`<BiIcon className="size-8" />\` (React Icon) | \`{x.icon && typeof x.icon === 'object' && <Media resource={x.icon} imgClassName="size-12" />}\` |

#### Imports:
\`\`\`tsx
import React from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
\`\`\`

### Client Components (nur wenn useState/useEffect/onClick nötig)
- Separates File mit \`'use client'\`
- KEINE PayloadCMS Imports in Client Components
- Props als Interface definieren, im Server Component die Daten aufbereiten und übergeben

## REFERENZ-BEISPIEL: Layout237 (3-Spalten Features mit Icons)

### Relume Original:
\`\`\`tsx
export const Layout237 = (props) => {
  const { tagline, heading, description, sections, buttons } = { ...defaults, ...props };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
              <p className="md:text-md">{description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            {sections.map((section, index) => (
              <div key={index} className="flex w-full flex-col items-center text-center">
                <div className="rb-5 mb-5 md:mb-6">{section.icon}</div>
                <h3 className="mb-5 text-2xl font-bold md:mb-6 ...">{section.heading}</h3>
                <p>{section.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4 md:mt-14 lg:mt-16">
            {buttons.map((button, index) => (<Button key={index} {...button}>{button.title}</Button>))}
          </div>
        </div>
      </div>
    </section>
  );
};
\`\`\`

### Config (config.ts):
\`\`\`typescript
import type { Block } from 'payload'
import { createRichTextField } from '@/fields/richtext'
import { linkGroup } from '@/fields/linkGroup'

export const Layout237: Block = {
  slug: 'layout237',
  interfaceName: 'Layout237Block',
  labels: { singular: 'Layout 237 - Drei Spalten Feature-Layout', plural: 'Layout 237 - Drei Spalten Feature-Layouts' },
  fields: [
    { name: 'tagline', type: 'text', required: true },
    { name: 'heading', type: 'text', required: true },
    createRichTextField({ name: 'description', label: 'Beschreibung', required: true }),
    {
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Sektionen',
      fields: [
        { name: 'icon', type: 'upload', relationTo: 'media', required: true },
        { name: 'heading', type: 'text', required: true },
        createRichTextField({ name: 'description', label: 'Beschreibung', required: true }),
      ],
    },
    linkGroup({ overrides: { label: 'Buttons', maxRows: 2 } }),
  ],
}
\`\`\`

### Component.tsx:
\`\`\`tsx
import React from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

type Layout237BlockType = Extract<Page['layout'][0], { blockType: 'layout237' }>

export const Layout237Block: React.FC<Layout237BlockType> = ({
  tagline, heading, description, sections, links,
}) => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
              <RichText data={description} enableGutter={false} enableProse={false} className="md:text-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            {sections?.map((section, index) => (
              <div key={index} className="flex w-full flex-col items-center text-center">
                <div className="rb-5 mb-5 md:mb-6">
                  {section.icon && typeof section.icon === 'object' && (
                    <Media resource={section.icon} imgClassName="size-12" />
                  )}
                </div>
                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">{section.heading}</h3>
                <RichText data={section.description} enableGutter={false} enableProse={false} />
              </div>
            ))}
          </div>
          {links && links.length > 0 && (
            <div className="mt-10 flex items-center gap-4 md:mt-14 lg:mt-16">
              {links.map(({ link }, i) => (<CMSLink key={i} {...link} />))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
\`\`\`

## REFERENZ-BEISPIEL 2: Cta27 (CTA mit Hintergrundbild + Overlay)

### Config:
\`\`\`typescript
import type { Block } from 'payload'
import { createRichTextField } from '@/fields/richtext'
import { linkGroup } from '@/fields/linkGroup'

export const Cta27: Block = {
  slug: 'cta27', interfaceName: 'Cta27Block',
  labels: { singular: 'CTA 27', plural: 'CTA 27' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    createRichTextField({ name: 'description', label: 'Beschreibung', required: true }),
    linkGroup({ overrides: { label: 'Buttons', maxRows: 2 } }),
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Hintergrundbild' },
  ],
}
\`\`\`

### Component.tsx:
\`\`\`tsx
import React from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

type Cta27BlockType = Extract<Page['layout'][0], { blockType: 'cta27' }>

export const Cta27Block: React.FC<Cta27BlockType> = ({ heading, description, links, image }) => {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10 max-w-lg text-center">
        <h2 className="rb-5 mb-5 text-5xl font-bold text-text-alternative md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
        <RichText data={description} enableGutter={false} enableProse={false} className="text-text-alternative md:text-md" />
        {links && links.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            {links.map(({ link }, i) => (<CMSLink key={i} {...link} />))}
          </div>
        )}
      </div>
      <div className="absolute inset-0 z-0">
        {image && typeof image === 'object' && (<Media resource={image} imgClassName="size-full object-cover" />)}
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  )
}
\`\`\`

## Bestehende Referenz (Layout1)

### config.ts:
\`\`\`typescript
${existingConfig}
\`\`\`

### Component.tsx:
\`\`\`tsx
${existingExample}
\`\`\`

## Output Format

\`\`\`typescript filename="config.ts"
// Vollständiger config.ts Inhalt mit imports
\`\`\`

\`\`\`tsx filename="Component.tsx"
// Vollständiger Component.tsx Inhalt (OHNE 'use client'!)
\`\`\`

Optional bei Client-Interaktivität:
\`\`\`tsx filename="InteractiveComponent.tsx"
// Client Component mit 'use client'
\`\`\`

Keine Erklärungen, nur Code!`
}

/**
 * Speichert AI-generierte Dateien
 */
function saveAIGeneratedFiles(blockName, category, aiResponse) {
  const blockDir = path.join(__dirname, '..', 'src', 'blocks', category, blockName)

  // Parse AI Response
  const configMatch = aiResponse.match(/```typescript filename="config\.ts"([\s\S]*?)```/)
  const componentMatch = aiResponse.match(/```tsx filename="Component\.tsx"([\s\S]*?)```/)

  // Optional: Client Component
  const interactiveMatch = aiResponse.match(/```tsx filename="(.*?\.tsx)"([\s\S]*?)```/g)
  let interactiveFiles = []

  if (interactiveMatch) {
    interactiveFiles = interactiveMatch
      .filter((match) => !match.includes('filename="Component.tsx"'))
      .map((match) => {
        const nameMatch = match.match(/filename="(.*?\.tsx)"/)
        const contentMatch = match.match(/```tsx filename=".*?\.tsx"([\s\S]*?)```/)
        return {
          name: nameMatch ? nameMatch[1] : null,
          content: contentMatch ? contentMatch[1].trim() : null,
        }
      })
      .filter((file) => file.name && file.content)
  }

  if (!configMatch || !componentMatch) {
    log(`  ❌ Could not parse AI response`, 'red')
    log(`  💾 Saving raw response to: ai-response-${blockName}.txt`, 'yellow')
    fs.writeFileSync(path.join(__dirname, `ai-response-${blockName}.txt`), aiResponse)
    return false
  }

  const configContent = configMatch[1].trim()
  const componentContent = componentMatch[1].trim()

  // Erstelle Verzeichnis
  fs.mkdirSync(blockDir, { recursive: true })

  // Erstelle config.ts
  fs.writeFileSync(path.join(blockDir, 'config.ts'), configContent)
  log(`  ✅ Created config.ts`, 'green')

  // Erstelle Component.tsx
  fs.writeFileSync(path.join(blockDir, 'Component.tsx'), componentContent)
  log(`  ✅ Created Component.tsx`, 'green')

  // Erstelle optionale Client Components
  if (interactiveFiles.length > 0) {
    interactiveFiles.forEach((file) => {
      fs.writeFileSync(path.join(blockDir, file.name), file.content)
      log(`  ✅ Created ${file.name} (Client Component)`, 'cyan')
    })
  }

  return true
}

/**
 * Registriert Block in RenderBlocks.tsx
 */
function registerInRenderBlocks(blockName, category, slug) {
  const renderBlocksPath = path.join(__dirname, '..', 'src', 'blocks', 'RenderBlocks.tsx')
  let content = fs.readFileSync(renderBlocksPath, 'utf-8')

  // Import hinzufügen
  const importStatement = `import { ${blockName}Block } from '@/blocks/${category}/${blockName}/Component'\n`
  content = content.replace(/(\/* PLOP_IMPORTS \*\/)/, `${importStatement}$1`)

  // Block registrieren
  const blockRegistration = `  ${slug}: ${blockName}Block,\n  `
  content = content.replace(/(\/* PLOP_EXPORTS \*\/)/, `${blockRegistration}$1`)

  fs.writeFileSync(renderBlocksPath, content)
  log(`  ✅ Registered in RenderBlocks.tsx`, 'green')
}

/**
 * Registriert Block in Pages Collection
 */
function registerInPagesCollection(blockName, category) {
  const pagesPath = path.join(__dirname, '..', 'src', 'collections', 'Pages', 'index.ts')
  let content = fs.readFileSync(pagesPath, 'utf-8')

  // Import hinzufügen
  const importStatement = `import { ${blockName} } from '@/blocks/${category}/${blockName}/config'\n`
  content = content.replace(/(\/*\s*PLOP_IMPORT_BLOCK_CONFIG\s*\*\/)/, `${importStatement}$&`)

  // Block in Array hinzufügen
  const blockRegistration = `                ${blockName},\n                `
  content = content.replace(/(\/*\s*PLOP_BLOCKS\s*\*\/)/, `${blockRegistration}$1`)

  fs.writeFileSync(pagesPath, content)
  log(`  ✅ Registered in Pages Collection`, 'green')
}

/**
 * Wartet auf User Input
 */
async function waitForInput(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

/**
 * Prozessiert einen einzelnen Block mit AI
 */
async function processBlockWithAI(blockName) {
  log(`\n${'─'.repeat(60)}`, 'blue')
  log(`🔨 Processing: ${blockName}`, 'bright')
  log(`${'─'.repeat(60)}`, 'blue')

  // Lese Komponente
  const result = readRelumeComponent(blockName)
  if (!result) return false

  const { content, category } = result
  const slug = blockName.toLowerCase()

  // Erstelle AI Prompt
  log(`🤖 Creating AI prompt...`, 'blue')
  const prompt = createAIPrompt(blockName, content, category)

  // Speichere Prompt
  const promptPath = path.join(__dirname, `prompt-${blockName}.md`)
  fs.writeFileSync(promptPath, prompt)
  log(`  📝 Prompt saved to: prompt-${blockName}.md`, 'green')

  // Anleitung für User
  log(`\n${'='.repeat(60)}`, 'yellow')
  log(`⚠️  MANUELLE AKTION ERFORDERLICH`, 'yellow')
  log(`${'='.repeat(60)}`, 'yellow')
  log(`\n1. Öffne: scripts/prompt-${blockName}.md`, 'cyan')
  log(`2. Kopiere den Prompt in Claude (Sonnet 4.5)`, 'cyan')
  log(`3. Kopiere die Antwort von Claude`, 'cyan')
  log(`4. Speichere sie in: scripts/ai-response-${blockName}.txt`, 'cyan')
  log(`\n5. Drücke Enter wenn fertig...\n`, 'cyan')

  // Warte auf User
  await waitForInput('')

  // Lese AI Response
  const responsePath = path.join(__dirname, `ai-response-${blockName}.txt`)
  if (!fs.existsSync(responsePath)) {
    log(`  ❌ AI response not found: ${responsePath}`, 'red')
    return false
  }

  const aiResponse = fs.readFileSync(responsePath, 'utf-8')
  log(`  ✅ AI response loaded`, 'green')

  // Speichere generierte Dateien
  log(`📝 Saving generated files...`, 'blue')
  const success = saveAIGeneratedFiles(blockName, category, aiResponse)
  if (!success) return false

  // Registriere Block
  log(`📋 Registering block...`, 'blue')
  registerInRenderBlocks(blockName, category, slug)
  registerInPagesCollection(blockName, category)

  log(`✅ ${blockName} successfully generated!`, 'green')
  return true
}

/**
 * Hauptfunktion
 */
async function main() {
  const blockNames = process.argv.slice(2)

  if (blockNames.length === 0) {
    log('❌ Usage: pnpm generate-blocks Layout1 Layout2 CTA1 FAQ1', 'red')
    log('   oder: node scripts/generate-blocks.mjs Layout1 Layout2', 'yellow')
    process.exit(1)
  }

  log(`\n${'='.repeat(60)}`, 'bright')
  log('🚀 AI-Powered Relume to PayloadCMS Block Generator', 'bright')
  log(`${'='.repeat(60)}\n`, 'bright')

  log(`📦 Generiere ${blockNames.length} Block(s): ${blockNames.join(', ')}\n`, 'yellow')

  // Clone Repository
  const cloned = cloneRelumeRepo()
  if (!cloned) {
    log('\n❌ Could not clone repository. Aborting.', 'red')
    process.exit(1)
  }

  let successCount = 0

  // Prozessiere jeden Block einzeln
  for (const blockName of blockNames) {
    const success = await processBlockWithAI(blockName)
    if (success) successCount++
  }

  // Cleanup
  cleanupTempRepo()

  // Regeneriere Types
  if (successCount > 0) {
    log(`\n${'─'.repeat(60)}`, 'blue')
    log(`🔄 Regenerating PayloadCMS types...`, 'yellow')
    try {
      execSync('pnpm generate:types', { stdio: 'inherit' })
      log(`✅ Types regenerated successfully!`, 'green')
    } catch (error) {
      log(`❌ Error regenerating types: ${error.message}`, 'red')
    }
  }

  // Summary
  log(`\n${'='.repeat(60)}`, 'bright')
  log(`✨ ${successCount}/${blockNames.length} blocks generated successfully!`, 'bright')
  log(`${'='.repeat(60)}\n`, 'bright')

  if (successCount < blockNames.length) {
    log(`⚠️  Some blocks failed. Check the logs above.`, 'yellow')
  }
}

// Error Handler
process.on('SIGINT', () => {
  log('\n\n🛑 Process interrupted by user', 'yellow')
  cleanupTempRepo()
  process.exit(0)
})

main().catch((error) => {
  log(`\n❌ Fatal Error: ${error.message}`, 'red')
  console.error(error)
  cleanupTempRepo()
  process.exit(1)
})
