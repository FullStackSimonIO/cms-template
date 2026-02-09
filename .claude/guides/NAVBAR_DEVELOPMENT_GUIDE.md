# Navbar Development Guide

## Overview

Diese Anleitung erklärt den vollständigen Prozess zur Integration einer Navbar aus dem Relume-Components Repository in das Fullstack Factory CMS Template.

## Wichtige Prinzipien

### 🚨 Kritische Regeln

1. **Vollständige Entfernung der alten Navbar**
   - Alle Dateien der alten Navbar müssen gelöscht werden
   - Keine Reste im Code lassen

2. **Server vs. Client Components Trennung**
   - Config/Daten-Fetching = Server Component
   - Interaktive Elemente (Mobile Menu, Dropdowns) = Client Component
   - Klare Trennung mit `'use client'` Directive

3. **1:1 Integration aus Relume**
   - Relume Code wird nicht "angepasst", sondern systematisch konvertiert
   - Frontend-Komponente bleibt möglichst nah am Original
   - Nur PayloadCMS-Daten-Integration wird hinzugefügt

## Workflow: Navbar Integration

### Phase 1: Navbar-Auswahl

Wenn keine Navbar spezifiziert wurde, frage:

```
Welche Navbar möchten Sie verwenden?

Bitte geben Sie den Namen der Relume-Navbar an, z.B.:
- Navbar1
- Navbar2
- Navbar3
- Navbar4
- etc.

Sie finden alle verfügbaren Navbars im Relume-Components Repository.
```

### Phase 2: Relume Navbar Lokalisierung

```bash
# Suche nach der Navbar im Relume Repository
find .relume-reference -iname "*navbar1*" -o -iname "*nav-1*"

# Oder falls nach Kategorien organisiert
find .relume-reference/navigation -name "*1*"
```

**Erwartete Struktur:**

```
.relume-reference/
└── components/
    └── Navbar1/
        ├── Navbar1.tsx          # Haupt-Komponente
        ├── index.ts             # Exports
        └── types.ts             # Type Definitionen (optional)
```

### Phase 3: Analyse der Relume Navbar

**Analysiere folgende Aspekte:**

#### 1. Props/Interface

```typescript
interface Props {
  logo?: ImageProps
  navLinks?: NavLink[]
  buttons?: ButtonProps[]
  // ... weitere Props
}
```

#### 2. Interaktive Elemente identifizieren

- Mobile Menu Toggle
- Dropdown Menus
- Search Overlays
- etc.

**Diese benötigen `'use client'`!**

#### 3. Statische Elemente identifizieren

- Logo
- Navigation Links (ohne Interaktion)
- Layout Container

**Diese können Server Components bleiben!**

### Phase 4: Alte Navbar vollständig entfernen

**Checklist:**

```bash
# 1. Lösche Navbar-Verzeichnis
rm -rf src/components/Navbar/
# oder
rm -rf src/blocks/Navbar/
# oder wo auch immer die alte Navbar liegt

# 2. Suche nach Importen der alten Navbar
grep -r "from '@/components/Navbar'" src/
grep -r "from '@/blocks/Navbar'" src/

# 3. Entferne aus Layout/RootLayout
# Bearbeite src/app/layout.tsx oder wo die Navbar eingebunden ist

# 4. Entferne aus Globals Collection (falls vorhanden)
# Bearbeite src/collections/Globals.ts oder src/globals/
```

**Typische Dateien die angepasst werden müssen:**

- `src/app/layout.tsx` oder `src/app/(app)/layout.tsx`
- `src/collections/Globals.ts` oder `src/globals/Header.ts`
- Alle Seiten die direkt die Navbar importieren

### Phase 5: PayloadCMS Globals Collection erstellen/anpassen

**Datei:** `src/globals/Header.ts`

```typescript
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header / Navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navbarType',
      type: 'select',
      defaultValue: 'navbar1',
      label: 'Navbar Design',
      options: [
        { label: 'Navbar 1', value: 'navbar1' },
        { label: 'Navbar 2', value: 'navbar2' },
        // Weitere Navbar-Typen hier hinzufügen
      ],
      admin: {
        description: 'Wählen Sie das Design der Navigationsleiste',
      },
    },
    // Logo
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Das Logo für die Navigation',
      },
    },
    // Navigation Links
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigationslinks',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link-Text',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            condition: (data, siblingData) => !siblingData?.page,
          },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Interne Seite',
          admin: {
            condition: (data, siblingData) => !siblingData?.url,
          },
        },
        // Optional: Dropdown/Submenu
        {
          name: 'subLinks',
          type: 'array',
          label: 'Untermenü',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
            },
          ],
        },
      ],
    },
    // CTA Buttons
    {
      name: 'buttons',
      type: 'array',
      label: 'Call-to-Action Buttons',
      maxRows: 2,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
        },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
  ],
}
```

**Registrierung in `payload.config.ts`:**

```typescript
import { Header } from './globals/Header'

export default buildConfig({
  // ...
  globals: [
    Header,
    // ... andere Globals
  ],
})
```

### Phase 6: Navbar Komponenten-Struktur erstellen

**Verzeichnis-Struktur:**

```
src/components/Navbar1/
├── index.ts                      # Haupt-Export (Server Component)
├── Navbar1.tsx                   # Container (Server Component)
├── Navbar1.client.tsx            # Interactive Parts (Client Component)
├── Navbar1.types.ts              # Type Definitions
└── Navbar1.styles.ts             # Optional: Tailwind Variants
```

### Phase 7: Type Definitions erstellen

**Datei:** `src/components/Navbar1/Navbar1.types.ts`

```typescript
import type { Media } from '@/payload-types'

export interface NavLink {
  label: string
  url?: string
  page?: {
    slug: string
    title: string
  }
  subLinks?: SubNavLink[]
}

export interface SubNavLink {
  label: string
  url?: string
  page?: {
    slug: string
  }
}

export interface NavButton {
  text: string
  url?: string
  page?: {
    slug: string
  }
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface Navbar1Props {
  logo: Media
  navLinks: NavLink[]
  buttons?: NavButton[]
}
```

### Phase 8: Server Component erstellen

**Datei:** `src/components/Navbar1/Navbar1.tsx`

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navbar1Client } from './Navbar1.client'
import type { Navbar1Props } from './Navbar1.types'

export async function Navbar1() {
  const payload = await getPayload({ config })

  // Fetch Header Global
  const headerData = await payload.findGlobal({
    slug: 'header',
  })

  // Transform Payload data to component props
  const navbarProps: Navbar1Props = {
    logo: headerData.logo,
    navLinks: headerData.navLinks.map((link) => ({
      label: link.label,
      url: link.url || (link.page ? `/${link.page.slug}` : '#'),
      page: link.page,
      subLinks: link.subLinks?.map((subLink) => ({
        label: subLink.label,
        url: subLink.url || (subLink.page ? `/${subLink.page.slug}` : '#'),
        page: subLink.page,
      })),
    })),
    buttons: headerData.buttons?.map((btn) => ({
      text: btn.text,
      url: btn.url || (btn.page ? `/${btn.page.slug}` : '#'),
      page: btn.page,
      variant: btn.variant,
    })),
  }

  return <Navbar1Client {...navbarProps} />
}
```

### Phase 9: Client Component erstellen

**Datei:** `src/components/Navbar1/Navbar1.client.tsx`

```typescript
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Navbar1Props, NavLink } from './Navbar1.types'

export function Navbar1Client({ logo, navLinks, buttons }: Navbar1Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="logo">
            {typeof logo === 'object' && logo.url && (
              <Image
                src={logo.url}
                alt={logo.alt || 'Logo'}
                width={logo.width || 150}
                height={logo.height || 50}
                className="h-12 w-auto"
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link, index) => (
                <NavLinkItem key={index} link={link} />
              ))}
            </ul>

            {/* CTA Buttons */}
            {buttons && buttons.length > 0 && (
              <div className="flex items-center gap-4">
                {buttons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.url || '#'}
                    className={getButtonClassName(button.variant)}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <MobileNavLinkItem
                  key={index}
                  link={link}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </ul>

            {buttons && buttons.length > 0 && (
              <div className="flex flex-col gap-2 mt-4">
                {buttons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.url || '#'}
                    className={getButtonClassName(button.variant)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

// Helper Components
function NavLinkItem({ link }: { link: NavLink }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubLinks = link.subLinks && link.subLinks.length > 0

  if (hasSubLinks) {
    return (
      <li className="relative">
        <button
          className="flex items-center gap-1 hover:text-primary"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {link.label}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-[200px]"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {link.subLinks?.map((subLink, index) => (
              <Link
                key={index}
                href={subLink.url || '#'}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {subLink.label}
              </Link>
            ))}
          </div>
        )}
      </li>
    )
  }

  return (
    <li>
      <Link href={link.url || '#'} className="hover:text-primary">
        {link.label}
      </Link>
    </li>
  )
}

function MobileNavLinkItem({
  link,
  onClose
}: {
  link: NavLink
  onClose: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubLinks = link.subLinks && link.subLinks.length > 0

  if (hasSubLinks) {
    return (
      <li>
        <button
          className="flex items-center justify-between w-full hover:text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {link.label}
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <ul className="pl-4 mt-2 space-y-2">
            {link.subLinks?.map((subLink, index) => (
              <li key={index}>
                <Link
                  href={subLink.url || '#'}
                  className="block hover:text-primary"
                  onClick={onClose}
                >
                  {subLink.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li>
      <Link
        href={link.url || '#'}
        className="block hover:text-primary"
        onClick={onClose}
      >
        {link.label}
      </Link>
    </li>
  )
}

function getButtonClassName(variant?: 'primary' | 'secondary' | 'outline'): string {
  const base = 'px-6 py-2 rounded-md font-medium transition-colors'

  switch (variant) {
    case 'primary':
      return `${base} bg-primary text-white hover:bg-primary/90`
    case 'secondary':
      return `${base} bg-secondary text-white hover:bg-secondary/90`
    case 'outline':
      return `${base} border-2 border-primary text-primary hover:bg-primary hover:text-white`
    default:
      return `${base} bg-primary text-white hover:bg-primary/90`
  }
}
```

### Phase 10: Index Export

**Datei:** `src/components/Navbar1/index.ts`

```typescript
export { Navbar1 } from './Navbar1'
export type { Navbar1Props, NavLink, NavButton } from './Navbar1.types'
```

### Phase 11: Integration in Layout

**Datei:** `src/app/(app)/layout.tsx`

```typescript
import { Navbar1 } from '@/components/Navbar1'
// Entferne alte Navbar-Imports!

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        {/* Neue Navbar */}
        <Navbar1 />

        <main>{children}</main>

        {/* Footer etc. */}
      </body>
    </html>
  )
}
```

### Phase 12: Styling anpassen

**Branding-Integration:**

```typescript
// In Navbar1.client.tsx - Nutze Branding-Farben
import { branding } from '@/config/branding'

// Beispiel:
function getButtonClassName(variant?: 'primary' | 'secondary' | 'outline'): string {
  const base = 'px-6 py-2 rounded-md font-medium transition-colors'

  switch (variant) {
    case 'primary':
      return `${base} text-white hover:opacity-90`
    case 'secondary':
      return `${base} text-white hover:opacity-90`
    case 'outline':
      return `${base} border-2 hover:text-white`
    default:
      return `${base} text-white hover:opacity-90`
  }
}

// Und im JSX:
<Link
  href={button.url || '#'}
  className={getButtonClassName(button.variant)}
  style={{
    backgroundColor: button.variant === 'primary' ? branding.colors.primary :
                     button.variant === 'secondary' ? branding.colors.secondary :
                     'transparent',
    borderColor: button.variant === 'outline' ? branding.colors.primary : undefined,
    color: button.variant === 'outline' ? branding.colors.primary : 'white',
  }}
>
  {button.text}
</Link>
```

## Checklist: Navbar Integration

### ✅ Vorbereitung

- [ ] Relume Navbar identifiziert (z.B. Navbar1)
- [ ] Navbar im .relume-reference gefunden
- [ ] Struktur und Props analysiert
- [ ] Interaktive Elemente identifiziert

### ✅ Alte Navbar entfernen

- [ ] Alte Navbar-Dateien gelöscht
- [ ] Imports aus Layout entfernt
- [ ] Alte Global/Collection gelöscht
- [ ] Keine Reste im Code

### ✅ PayloadCMS Setup

- [ ] Header Global erstellt (`src/globals/Header.ts`)
- [ ] Fields basierend auf Navbar-Props definiert
- [ ] In `payload.config.ts` registriert

### ✅ Komponenten erstellen

- [ ] Type Definitions (`Navbar1.types.ts`)
- [ ] Server Component (`Navbar1.tsx`)
- [ ] Client Component (`Navbar1.client.tsx`)
- [ ] Index Export (`index.ts`)

### ✅ Integration

- [ ] In Layout eingebunden
- [ ] Branding-Farben integriert
- [ ] Mobile Menu funktioniert
- [ ] Dropdowns funktionieren (falls vorhanden)

### ✅ Testing

- [ ] Desktop-Navigation funktioniert
- [ ] Mobile-Navigation funktioniert
- [ ] Links funktionieren (intern & extern)
- [ ] CTA-Buttons funktionieren
- [ ] Responsive Design korrekt

### ✅ Finalisierung

- [ ] Alte Navbar-Code komplett entfernt
- [ ] Keine Console-Errors
- [ ] TypeScript-Errors behoben
- [ ] Code committed

## Automatisierungs-Template für ClaudeCode

**Wenn keine Navbar angegeben:**

```markdown
Ich habe bemerkt, dass noch keine Navbar für dieses Projekt definiert wurde.

**Navbar-Auswahl erforderlich:**

Welche Navbar aus dem Relume-Components Repository möchten Sie verwenden?

Verfügbare Optionen (Beispiele):

- Navbar1 - Einfache horizontale Navigation
- Navbar2 - Navigation mit Mega-Menu
- Navbar3 - Zentriertes Logo
- Navbar4 - Minimalistisch
- [Andere - bitte Namen angeben]

Bitte geben Sie den Namen an, z.B. "Navbar1"
```

**Nach Auswahl:**

```markdown
✓ Navbar ausgewählt: [Name]

Ich werde jetzt:

1. ✓ Alte Navbar entfernen
2. ✓ Relume Navbar lokalisieren
3. ✓ PayloadCMS Header Global erstellen
4. ✓ Server Component erstellen
5. ✓ Client Component mit Interaktivität erstellen
6. ✓ In Layout integrieren
7. ✓ Branding-Farben anwenden

Starte Integration...
```

## Server vs. Client Components - Entscheidungsbaum

```
Navbar Component
│
├─ Hat interaktive Elemente? (Mobile Menu, Dropdowns, Search)
│  │
│  ├─ JA → Split in Server + Client
│  │  │
│  │  ├─ Server Component (Navbar.tsx)
│  │  │   └─ Fetch Payload Data
│  │  │   └─ Transform Data
│  │  │   └─ Pass to Client Component
│  │  │
│  │  └─ Client Component (Navbar.client.tsx)
│  │      └─ 'use client' directive
│  │      └─ useState für interaktive Elemente
│  │      └─ Event Handlers
│  │
│  └─ NEIN → Single Server Component
│     └─ Nur statische Links
│     └─ Kein JavaScript benötigt
```

## Häufige Fehler vermeiden

### ❌ NICHT TUN:

```typescript
// ❌ Alte Navbar-Code drin lassen
import { OldNavbar } from '@/components/OldNavbar' // ← LÖSCHEN!

// ❌ 'use client' in Server Component
;('use client') // ← Falsch in Navbar.tsx
export async function Navbar() {
  const data = await getPayload() // Server-only Code
  // ...
}

// ❌ Server-Code in Client Component
export function NavbarClient() {
  const data = await getPayload() // ← Funktioniert nicht!
  // ...
}

// ❌ Komplette Navbar als Client Component
;('use client')
export async function Navbar() {
  // ← async geht nicht mit 'use client'
  // ...
}
```

### ✅ RICHTIG:

```typescript
// ✅ Server Component für Daten-Fetching
// Navbar.tsx (OHNE 'use client')
export async function Navbar() {
  const data = await getPayload()
  return <NavbarClient {...data} />
}

// ✅ Client Component für Interaktivität
// Navbar.client.tsx (MIT 'use client')
'use client'
export function NavbarClient({ navLinks, logo }) {
  const [isOpen, setIsOpen] = useState(false)
  // ...
}
```

## Zusammenfassung

**Workflow in Kürze:**

1. **Navbar auswählen** (wenn nicht vorgegeben)
2. **Alte Navbar komplett entfernen**
3. **Relume Navbar analysieren**
4. **Header Global erstellen**
5. **Components aufteilen** (Server + Client)
6. **Integration** in Layout
7. **Testing** (Desktop + Mobile)

**Datei-Struktur Result:**

```
src/
├── globals/
│   └── Header.ts                    # PayloadCMS Global
├── components/
│   └── Navbar1/
│       ├── index.ts                 # Export
│       ├── Navbar1.tsx              # Server Component
│       ├── Navbar1.client.tsx       # Client Component
│       └── Navbar1.types.ts         # Types
└── app/
    └── (app)/
        └── layout.tsx               # Integration
```

**Wichtigste Regel:**
Alte Navbar **komplett** löschen, neue **sauber** trennen (Server/Client), **1:1** aus Relume übernehmen.
