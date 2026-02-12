#!/usr/bin/env node

/**
 * AI-Powered Relume to PayloadCMS Hero Generator
 *
 * Clont das Relume Repository temporär und nutzt KI (Claude Sonnet 4.5)
 * um Hero-Komponenten intelligent zu analysieren und in PayloadCMS Heros umzuwandeln
 *
 * Heros haben eine gemeinsame Config mit conditional Fields je nach Hero-Type
 *
 * Usage: pnpm generate-hero HeroHeader1 HeroHeader2
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
 * Clont das Relume Repository temporär
 */
function cloneRelumeRepo() {
  log(`\n📦 Cloning Relume repository...`, 'blue')

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
 * Liest Relume Hero-Komponente aus dem geclonten Repo
 */
function readRelumeComponent(heroName) {
  // Heroes sind in verschiedenen Kategorien
  const possiblePaths = [
    path.join(TEMP_DIR, 'Header', heroName, 'component.tsx'),
    path.join(TEMP_DIR, 'Hero', heroName, 'component.tsx'),
  ]

  log(`📂 Reading ${heroName} from local repo...`, 'blue')

  for (const componentPath of possiblePaths) {
    if (fs.existsSync(componentPath)) {
      try {
        const content = fs.readFileSync(componentPath, 'utf-8')
        log(`  ✅ Component loaded (${content.length} chars)`, 'green')
        const category = path.basename(path.dirname(path.dirname(componentPath)))
        return { content, category, componentPath }
      } catch (error) {
        log(`  ❌ Error reading component: ${error.message}`, 'red')
        return null
      }
    }
  }

  log(`  ❌ Component not found in Header/ or Hero/`, 'red')
  return null
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
function createAIPrompt(heroName, componentContent, category) {
  const existingHeroConfig = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'heros', 'config.ts'),
    'utf-8',
  )

  return `# Aufgabe: Relume Hero "${heroName}" 1:1 in PayloadCMS Hero umwandeln

## Kontext
Du bist ein Experte für PayloadCMS und React. Wandle die Relume-Hero-Komponente **exakt 1:1** um.
Behalte die EXAKTE HTML-Struktur und alle Tailwind-Klassen bei. Ändere NUR die Datenquellen.

**WICHTIG:** Heroes teilen sich eine config mit conditional Fields per Hero-Type in \`src/heros/config.ts\`.

## Relume Hero: ${heroName}

\`\`\`tsx
${componentContent}
\`\`\`

## Bestehende Hero Config:

\`\`\`typescript
${existingHeroConfig}
\`\`\`

## STRIKTE REGELN

### Config Regeln
- Hero Type: \`${heroName.toLowerCase()}\`
- Neue option im \`type\` select field
- Felder als \`type: 'group'\` mit \`admin.condition: (_, siblingData) => siblingData?.type === '${heroName.toLowerCase()}'\`
- Imports stehen schon in config.ts: \`createRichTextField\`, \`linkGroup\`
- **KEINE Felder erfinden die nicht im Original sind**

#### Feld-Mappings (Relume → PayloadCMS Config):
| Relume Prop | PayloadCMS Config Feld |
|---|---|
| \`heading: string\` | \`{ name: 'heading', type: 'text', required: true }\` |
| \`description: string\` | \`createRichTextField({ name: 'description', label: 'Beschreibung', required: true })\` |
| \`tagline: string\` | \`{ name: 'tagline', type: 'text', required: true }\` |
| \`buttons: ButtonProps[]\` | \`linkGroup({ overrides: { label: 'Buttons', maxRows: 2 } })\` |
| \`image: ImageProps\` | \`{ name: 'image', type: 'upload', relationTo: 'media', required: true }\` |
| \`video: string\` | \`{ name: 'video', type: 'upload', relationTo: 'media', required: true, filterOptions: { mimeType: { contains: 'video' } } }\` |

### Component Regeln (Component.tsx in src/heros/${heroName}/)
- **KEIN \`'use client'\`** - immer Server Component
- Props werden von RenderHero.tsx übergeben (heading, description, links, image/video etc.)
- **EXAKT dieselbe HTML-Struktur und Tailwind-Klassen wie im Original**
- \`id="relume"\` entfernen

#### Komponenten-Mappings (Relume → PayloadCMS Frontend):
| Relume Original | PayloadCMS Ersatz |
|---|---|
| \`<img src={x.src} className="...">\` | \`{x && typeof x === 'object' && <Media resource={x} fill imgClassName="object-cover" />}\` |
| \`<p className="...">{description}</p>\` | \`<RichText data={description} enableGutter={false} enableProse={false} className="..." />\` |
| \`<Button {...button}>{button.title}</Button>\` | \`<CMSLink key={i} {...link} />\` (innerhalb \`{links?.map(({ link }, i) => ...)}\`) |
| \`<video><source src={video}></video>\` | \`const videoSrc = typeof video === 'string' ? video : video?.url || ''\` dann \`<source src={videoSrc}>\` |

#### Imports:
\`\`\`tsx
import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
\`\`\`

### RenderHero.tsx Integration
Nach Erstellung muss der neue Hero in \`src/heros/RenderHero.tsx\` registriert werden:
- Import der Komponente
- Neuer case im switch
- Props aus \`hero.${heroName.toLowerCase()}\` auslesen und übergeben

## REFERENZ-BEISPIEL: HeroHeader65 (Bild Hintergrund + Overlay)

### Relume Original:
\`\`\`tsx
export const Header65 = (props) => {
  const { tagline, heading, description, buttons, image } = { ...defaults, ...props };
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10 max-w-lg text-center">
        <p className="mb-3 font-semibold text-text-alternative md:mb-4">{tagline}</p>
        <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">{heading}</h1>
        <p className="text-text-alternative md:text-md">{description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
          {buttons.map((button, index) => (<Button key={index} {...button}>{button.title}</Button>))}
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img src={image.src} className="size-full object-cover" alt={image.alt} />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
};
\`\`\`

### Config (group in config.ts):
\`\`\`typescript
const heroHeader65: Field = {
  name: 'heroHeader65',
  type: 'group',
  admin: {
    condition: (_, siblingData) => siblingData?.type === 'heroHeader65',
  },
  fields: [
    { name: 'tagline', type: 'text', required: true, label: 'Tagline' },
    { name: 'heading', type: 'text', required: true, label: 'Überschrift' },
    createRichTextField({ name: 'description', label: 'Beschreibung', required: true }),
    linkGroup({ overrides: { label: 'Buttons', maxRows: 2 } }),
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Hintergrund Bild', filterOptions: { mimeType: { contains: 'image' } } },
  ],
}
\`\`\`

### Component.tsx:
\`\`\`tsx
import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Props = {
  tagline: string
  heading: string
  description: any
  links?: { link: any }[]
  image: MediaType | string
}

export const HeroHeader65: React.FC<Props> = ({ tagline, heading, description, links, image }) => {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10 max-w-lg text-center">
        <p className="mb-3 font-semibold text-text-alternative md:mb-4">{tagline}</p>
        <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">{heading}</h1>
        <RichText data={description} enableGutter={false} enableProse={false} className="text-text-alternative md:text-md" />
        {links && links.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            {links.map(({ link }, index) => (<CMSLink key={index} {...link} />))}
          </div>
        )}
      </div>
      <div className="absolute inset-0 z-0">
        {image && typeof image === 'object' && (<Media resource={image} fill imgClassName="object-cover" />)}
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  )
}
\`\`\`

## Output Format

\`\`\`typescript filename="config-update.ts"
// Die neue group Field-Definition für diesen Hero-Type
// UND die neue type select option als Kommentar
// KEINE import Statements nötig
\`\`\`

\`\`\`tsx filename="Component.tsx"
// Vollständiger Component.tsx (OHNE 'use client'!)
\`\`\`

Optional:
\`\`\`tsx filename="ClientComponent.tsx"
// Client Component mit 'use client'
\`\`\`

Keine Erklärungen, nur Code!`
}

/**
 * Speichert AI-generierte Hero-Dateien
 */
function saveAIGeneratedFiles(heroName, aiResponse) {
  const heroDir = path.join(__dirname, '..', 'src', 'heros', heroName)
  const configPath = path.join(__dirname, '..', 'src', 'heros', 'config.ts')

  // Parse AI Response
  const configUpdateMatch = aiResponse.match(
    /```typescript filename="config-update\.ts"([\s\S]*?)```/,
  )
  const componentMatch = aiResponse.match(/```tsx filename="Component\.tsx"([\s\S]*?)```/)

  // Optional: Client Components
  const interactiveMatch = aiResponse.match(/```tsx filename="(.*?\.tsx)"([\s\S]*?)```/g)
  let interactiveFiles = []

  if (interactiveMatch) {
    interactiveFiles = interactiveMatch
      .filter(
        (match) =>
          !match.includes('filename="Component.tsx"') && !match.includes('filename="config-update.ts"'),
      )
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

  if (!configUpdateMatch || !componentMatch) {
    log(`  ❌ Could not parse AI response`, 'red')
    log(`  💾 Saving raw response to: ai-response-${heroName}.txt`, 'yellow')
    fs.writeFileSync(path.join(__dirname, `ai-response-${heroName}.txt`), aiResponse)
    return false
  }

  const configUpdate = configUpdateMatch[1].trim()
  const componentContent = componentMatch[1].trim()

  // Erstelle Hero Verzeichnis
  fs.mkdirSync(heroDir, { recursive: true })

  // Erstelle Component.tsx
  fs.writeFileSync(path.join(heroDir, 'Component.tsx'), componentContent)
  log(`  ✅ Created ${heroName}/Component.tsx`, 'green')

  // Erstelle optionale Client Components
  if (interactiveFiles.length > 0) {
    interactiveFiles.forEach((file) => {
      fs.writeFileSync(path.join(heroDir, file.name), file.content)
      log(`  ✅ Created ${heroName}/${file.name} (Client Component)`, 'cyan')
    })
  }

  // Update config.ts
  try {
    updateHeroConfig(configUpdate, heroName)
    log(`  ✅ Updated config.ts with ${heroName} fields`, 'green')
  } catch (error) {
    log(`  ❌ Error updating config.ts: ${error.message}`, 'red')
    log(`  💾 Config update saved to: config-update-${heroName}.txt`, 'yellow')
    fs.writeFileSync(path.join(__dirname, `config-update-${heroName}.txt`), configUpdate)
    return false
  }

  return true
}

/**
 * Updated die Hero config.ts mit neuen conditional fields
 */
function updateHeroConfig(configUpdate, heroName) {
  const configPath = path.join(__dirname, '..', 'src', 'heros', 'config.ts')
  let config = fs.readFileSync(configPath, 'utf-8')

  const slug = heroName.toLowerCase()

  // Extrahiere Type Option
  const typeOptionMatch = configUpdate.match(
    /{\s*label:\s*['"`].*?['"`],\s*value:\s*['"`](.*?)['"`]\s*}/,
  )
  if (typeOptionMatch) {
    const typeOption = typeOptionMatch[0]

    // Füge Type Option hinzu (vor dem schließenden Bracket von options)
    const typeFieldMatch = config.match(
      /(options:\s*\[[\s\S]*?)(,?\s*\]\s*,?\s*}\s*,?\s*\/\/\s*\*\s*Basis-Felder)/m,
    )
    if (typeFieldMatch) {
      const beforeOptions = typeFieldMatch[1]
      const afterOptions = typeFieldMatch[2]
      config = config.replace(
        typeFieldMatch[0],
        `${beforeOptions},\n        ${typeOption}${afterOptions}`,
      )
    }
  }

  // Extrahiere conditional Fields
  const fieldsMatch = configUpdate.match(/\[[\s\S]*\]/m)
  if (fieldsMatch) {
    let fields = fieldsMatch[0]
    // Entferne äußere Brackets
    fields = fields.substring(1, fields.length - 1).trim()

    // Füge Fields am Ende ein (vor dem schließenden Bracket des fields array)
    const fieldsEndMatch = config.match(/(\s*\],\s*}\s*export const hero)/)
    if (fieldsEndMatch) {
      config = config.replace(
        fieldsEndMatch[0],
        `,\n    // * ${heroName} Fields\n${fields}\n${fieldsEndMatch[0]}`,
      )
    }
  }

  fs.writeFileSync(configPath, config)
}

/**
 * Registriert Hero in RenderHero.tsx
 */
function registerInRenderHero(heroName) {
  const renderHeroPath = path.join(__dirname, '..', 'src', 'heros', 'RenderHero.tsx')
  let content = fs.readFileSync(renderHeroPath, 'utf-8')

  const slug = heroName.toLowerCase()

  // Import hinzufügen
  const importStatement = `import { ${heroName} } from './${heroName}/Component'\n`

  // Finde die Stelle nach den bestehenden Imports
  const lastImportMatch = content.match(/(import.*from.*\n)(?!import)/s)
  if (lastImportMatch) {
    const insertPos = lastImportMatch.index + lastImportMatch[0].length
    content = content.slice(0, insertPos) + importStatement + content.slice(insertPos)
  }

  // Hero registrieren im heroes Object
  const heroRegistration = `  ${slug}: ${heroName},\n`
  content = content.replace(/(const heroes = \{[^}]*)/, `$1\n${heroRegistration}`)

  fs.writeFileSync(renderHeroPath, content)
  log(`  ✅ Registered in RenderHero.tsx`, 'green')
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
 * Prozessiert einen einzelnen Hero mit AI
 */
async function processHeroWithAI(heroName) {
  log(`\n${'─'.repeat(60)}`, 'blue')
  log(`🔨 Processing: ${heroName}`, 'bright')
  log(`${'─'.repeat(60)}`, 'blue')

  // Lese Komponente
  const result = readRelumeComponent(heroName)
  if (!result) return false

  const { content, category } = result

  // Erstelle AI Prompt
  log(`🤖 Creating AI prompt...`, 'blue')
  const prompt = createAIPrompt(heroName, content, category)

  // Speichere Prompt
  const promptPath = path.join(__dirname, `prompt-hero-${heroName}.md`)
  fs.writeFileSync(promptPath, prompt)
  log(`  📝 Prompt saved to: prompt-hero-${heroName}.md`, 'green')

  // Anleitung für User
  log(`\n${'='.repeat(60)}`, 'yellow')
  log(`⚠️  MANUELLE AKTION ERFORDERLICH`, 'yellow')
  log(`${'='.repeat(60)}`, 'yellow')
  log(`\n1. Öffne: scripts/prompt-hero-${heroName}.md`, 'cyan')
  log(`2. Kopiere den Prompt in Claude (Sonnet 4.5)`, 'cyan')
  log(`3. Kopiere die Antwort von Claude`, 'cyan')
  log(`4. Speichere sie in: scripts/ai-response-hero-${heroName}.txt`, 'cyan')
  log(`\n5. Drücke Enter wenn fertig...\n`, 'cyan')

  // Warte auf User
  await waitForInput('')

  // Lese AI Response
  const responsePath = path.join(__dirname, `ai-response-hero-${heroName}.txt`)
  if (!fs.existsSync(responsePath)) {
    log(`  ❌ AI response not found: ${responsePath}`, 'red')
    return false
  }

  const aiResponse = fs.readFileSync(responsePath, 'utf-8')
  log(`  ✅ AI response loaded`, 'green')

  // Speichere generierte Dateien
  log(`📝 Saving generated files...`, 'blue')
  const success = saveAIGeneratedFiles(heroName, aiResponse)
  if (!success) return false

  // Registriere Hero
  log(`📋 Registering hero...`, 'blue')
  registerInRenderHero(heroName)

  log(`✅ ${heroName} successfully generated!`, 'green')
  return true
}

/**
 * Regeneriert Types und prüft auf Fehler
 */
function regenerateTypesAndCheck() {
  log(`\n${'─'.repeat(60)}`, 'blue')
  log(`🔄 Regenerating PayloadCMS types...`, 'yellow')

  try {
    execSync('pnpm generate:types', { stdio: 'inherit' })
    log(`✅ Types regenerated successfully!`, 'green')
    return true
  } catch (error) {
    log(`❌ Error regenerating types: ${error.message}`, 'red')
    return false
  }
}

/**
 * Hauptfunktion
 */
async function main() {
  const heroNames = process.argv.slice(2)

  if (heroNames.length === 0) {
    log('❌ Usage: pnpm generate-hero HeroHeader1 HeroHeader2', 'red')
    log('   oder: node scripts/generate-hero.mjs HeroHeader1', 'yellow')
    process.exit(1)
  }

  log(`\n${'='.repeat(60)}`, 'bright')
  log('🚀 AI-Powered Relume to PayloadCMS Hero Generator', 'bright')
  log(`${'='.repeat(60)}\n`, 'bright')

  log(`📦 Generiere ${heroNames.length} Hero(s): ${heroNames.join(', ')}\n`, 'yellow')

  // Clone Repository
  const cloned = cloneRelumeRepo()
  if (!cloned) {
    log('\n❌ Could not clone repository. Aborting.', 'red')
    process.exit(1)
  }

  let successCount = 0

  // Prozessiere jeden Hero einzeln
  for (const heroName of heroNames) {
    const success = await processHeroWithAI(heroName)
    if (success) successCount++
  }

  // Cleanup
  cleanupTempRepo()

  // Regeneriere Types
  if (successCount > 0) {
    const typesSuccess = regenerateTypesAndCheck()

    if (!typesSuccess) {
      log(`\n⚠️  Types generation failed. Running diagnostics...`, 'yellow')
      log(`Run: pnpm generate:types`, 'cyan')
    }
  }

  // Summary
  log(`\n${'='.repeat(60)}`, 'bright')
  log(`✨ ${successCount}/${heroNames.length} heroes generated successfully!`, 'bright')
  log(`${'='.repeat(60)}\n`, 'bright')

  if (successCount < heroNames.length) {
    log(`⚠️  Some heroes failed. Check the logs above.`, 'yellow')
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
