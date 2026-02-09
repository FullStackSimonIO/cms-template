# Footer Development Guide

## Overview

Diese Anleitung erklärt den vollständigen Prozess zur Integration eines Footers aus dem Relume-Components Repository in das Fullstack Factory CMS Template.

Der Footer wird **nach der Navbar** entwickelt und folgt denselben Prinzipien, hat aber zusätzliche spezifische Anforderungen.

## Unterschiede zur Navbar

### ✅ Gleich wie Navbar:

- Vollständige Entfernung des alten Footers
- Server vs. Client Components Trennung
- 1:1 Integration aus Relume
- PayloadCMS Global für Daten
- Branding-Integration

### 🎯 Footer-Spezifisch:

1. **Fullstack Factory Branding (ERFORDERLICH)**

   ```
   Unterste Zeile, zentriert:
   "Mit ❤ entwickelt von Fullstack Factory"
   ```

   - Dieses Branding ist **NICHT editierbar** im CMS
   - Hardcoded in der Footer-Komponente
   - Immer sichtbar, unabhängig vom Footer-Typ

2. **Typische Footer-Elemente**
   - Logo (meist kleiner als in Navbar)
   - Footer-Links (oft in Spalten/Kategorien organisiert)
   - Social Media Icons
   - Newsletter-Signup (optional)
   - Copyright-Text
   - **+ Fullstack Factory Branding (immer)**

3. **Meist weniger Interaktivität**
   - Oft kein Mobile Menu Toggle
   - Statische Links (können Server Component bleiben)
   - Newsletter-Form = Client Component (falls vorhanden)

## Workflow: Footer Integration

### Phase 1: Footer-Auswahl

Wenn kein Footer spezifiziert wurde, frage:

```
Welchen Footer möchten Sie verwenden?

Bitte geben Sie den Namen des Relume-Footers an, z.B.:
- Footer1
- Footer2
- Footer3
- Footer4
- Footer5
- etc.

Sie finden alle verfügbaren Footers im Relume-Components Repository.

Hinweis: Der Footer wird automatisch mit dem Fullstack Factory Branding
"Mit ❤ entwickelt von Fullstack Factory" in der untersten Zeile versehen.
```

### Phase 2: Relume Footer Lokalisierung

```bash
# Suche nach dem Footer im Relume Repository
find .relume-reference -iname "*footer1*" -o -iname "*footer-1*"

# Oder falls nach Kategorien organisiert
find .relume-reference/footer -name "*1*"
```

**Erwartete Struktur:**

```
.relume-reference/
└── components/
    └── Footer1/
        ├── Footer1.tsx          # Haupt-Komponente
        ├── index.ts             # Exports
        └── types.ts             # Type Definitionen (optional)
```

### Phase 3: Analyse der Relume Footer

**Analysiere folgende Aspekte:**

#### 1. Props/Interface

```typescript
interface Props {
  logo?: ImageProps
  footerLinks?: FooterLinkGroup[]
  socialLinks?: SocialLink[]
  newsletterSignup?: boolean
  // ... weitere Props
}
```

#### 2. Interaktive Elemente identifizieren

- Newsletter-Signup Form (needs `'use client'`)
- Collapsible Link-Gruppen (Mobile)
- Social Media Links (meist statisch)

#### 3. Layout-Struktur

- Spalten-Layout (z.B. 4 Spalten)
- Link-Kategorien
- Bottom Bar (für Copyright + Fullstack Factory Branding)

### Phase 4: Alte Footer vollständig entfernen

**Checklist:**

```bash
# 1. Lösche Footer-Verzeichnis
rm -rf src/components/Footer/
# oder
rm -rf src/blocks/Footer/

# 2. Suche nach Importen des alten Footers
grep -r "from '@/components/Footer'" src/
grep -r "from '@/blocks/Footer'" src/

# 3. Entferne aus Layout/RootLayout
# Bearbeite src/app/layout.tsx oder wo der Footer eingebunden ist

# 4. Entferne aus Globals Collection (falls vorhanden)
# Bearbeite src/globals/Footer.ts (falls existiert)
```

**Typische Dateien die angepasst werden müssen:**

- `src/app/layout.tsx` oder `src/app/(app)/layout.tsx`
- `src/globals/Footer.ts` (falls vorhanden)
- Alle Seiten die direkt den Footer importieren

### Phase 5: PayloadCMS Globals Collection erstellen

**Datei:** `src/globals/Footer.ts`

```typescript
import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'footerType',
      type: 'select',
      defaultValue: 'footer1',
      label: 'Footer Design',
      options: [
        { label: 'Footer 1', value: 'footer1' },
        { label: 'Footer 2', value: 'footer2' },
        { label: 'Footer 3', value: 'footer3' },
        // Weitere Footer-Typen hier hinzufügen
      ],
      admin: {
        description: 'Wählen Sie das Design des Footers',
      },
    },

    // Logo
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Das Logo für den Footer (oft kleiner als Header-Logo)',
      },
    },

    // Tagline/Description
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline/Beschreibung',
      admin: {
        description: 'Kurze Beschreibung oder Tagline unter dem Logo',
      },
    },

    // Footer Link Groups (Spalten)
    {
      name: 'linkGroups',
      type: 'array',
      label: 'Link-Gruppen',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Organisieren Sie Links in Spalten/Kategorien',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Spalten-Titel',
          admin: {
            description: 'z.B. "Produkte", "Unternehmen", "Support"',
          },
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          minRows: 1,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
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
          ],
        },
      ],
    },

    // Social Media Links
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      maxRows: 10,
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'GitHub', value: 'github' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Social Media URL',
        },
      ],
    },

    // Newsletter Signup
    {
      name: 'showNewsletter',
      type: 'checkbox',
      label: 'Newsletter-Anmeldung anzeigen',
      defaultValue: false,
    },
    {
      name: 'newsletterTitle',
      type: 'text',
      label: 'Newsletter Titel',
      admin: {
        condition: (data) => data.showNewsletter === true,
      },
    },
    {
      name: 'newsletterDescription',
      type: 'textarea',
      label: 'Newsletter Beschreibung',
      admin: {
        condition: (data) => data.showNewsletter === true,
      },
    },

    // Copyright Text
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: `© ${new Date().getFullYear()} Alle Rechte vorbehalten.`,
      admin: {
        description: 'Copyright-Text neben dem Fullstack Factory Branding',
      },
    },

    // Legal Links (Privacy, Terms, etc.)
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Rechtliche Links',
      maxRows: 5,
      admin: {
        description: 'z.B. Impressum, Datenschutz, AGB',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (data, siblingData) => !siblingData?.page,
          },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (data, siblingData) => !siblingData?.url,
          },
        },
      ],
    },
  ],
}
```

**Registrierung in `payload.config.ts`:**

```typescript
import { Footer } from './globals/Footer'

export default buildConfig({
  // ...
  globals: [
    Header,
    Footer, // ← Neu hinzufügen
    // ... andere Globals
  ],
})
```

### Phase 6: Footer Komponenten-Struktur erstellen

**Verzeichnis-Struktur:**

```
src/components/Footer1/
├── index.ts                      # Haupt-Export (Server Component)
├── Footer1.tsx                   # Container (Server Component)
├── Footer1.client.tsx            # Newsletter Form (Client Component, falls benötigt)
├── Footer1.types.ts              # Type Definitions
└── FullstackFactoryBranding.tsx  # Hardcoded Branding Component
```

### Phase 7: Type Definitions erstellen

**Datei:** `src/components/Footer1/Footer1.types.ts`

```typescript
import type { Media } from '@/payload-types'

export interface FooterLink {
  label: string
  url?: string
  page?: {
    slug: string
    title: string
  }
}

export interface FooterLinkGroup {
  title: string
  links: FooterLink[]
}

export interface SocialLink {
  platform:
    | 'facebook'
    | 'instagram'
    | 'twitter'
    | 'linkedin'
    | 'youtube'
    | 'tiktok'
    | 'github'
    | 'other'
  url: string
}

export interface Footer1Props {
  logo: Media
  tagline?: string
  linkGroups: FooterLinkGroup[]
  socialLinks?: SocialLink[]
  showNewsletter?: boolean
  newsletterTitle?: string
  newsletterDescription?: string
  copyrightText: string
  legalLinks?: FooterLink[]
}
```

### Phase 8: Fullstack Factory Branding Component

**Datei:** `src/components/Footer1/FullstackFactoryBranding.tsx`

```typescript
import React from 'react'

/**
 * Fullstack Factory Branding Component
 *
 * Dieses Branding ist HARDCODED und erscheint in jedem Footer.
 * Es ist NICHT editierbar im CMS.
 *
 * Format: "Mit ❤ entwickelt von Fullstack Factory"
 */
export function FullstackFactoryBranding() {
  return (
    <div className="fullstack-factory-branding text-center py-4 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        Mit{' '}
        <span className="text-red-500" aria-label="Liebe">
          ❤
        </span>{' '}
        entwickelt von{' '}
        <a
          href="https://fullstack-factory.de"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-primary transition-colors"
        >
          Fullstack Factory
        </a>
      </p>
    </div>
  )
}
```

### Phase 9: Server Component erstellen

**Datei:** `src/components/Footer1/Footer1.tsx`

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'
import { Footer1Client } from './Footer1.client'
import { FullstackFactoryBranding } from './FullstackFactoryBranding'
import Image from 'next/image'
import Link from 'next/link'
import type { Footer1Props, FooterLink } from './Footer1.types'

export async function Footer1() {
  const payload = await getPayload({ config })

  // Fetch Footer Global
  const footerData = await payload.findGlobal({
    slug: 'footer',
  })

  // Transform Payload data to component props
  const footerProps: Footer1Props = {
    logo: footerData.logo,
    tagline: footerData.tagline,
    linkGroups: footerData.linkGroups.map((group) => ({
      title: group.title,
      links: group.links.map((link) => ({
        label: link.label,
        url: link.url || (link.page ? `/${link.page.slug}` : '#'),
        page: link.page,
      })),
    })),
    socialLinks: footerData.socialLinks?.map((social) => ({
      platform: social.platform,
      url: social.url,
    })),
    showNewsletter: footerData.showNewsletter,
    newsletterTitle: footerData.newsletterTitle,
    newsletterDescription: footerData.newsletterDescription,
    copyrightText: footerData.copyrightText,
    legalLinks: footerData.legalLinks?.map((link) => ({
      label: link.label,
      url: link.url || (link.page ? `/${link.page.slug}` : '#'),
      page: link.page,
    })),
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo & Tagline Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              {typeof footerProps.logo === 'object' && footerProps.logo.url && (
                <Image
                  src={footerProps.logo.url}
                  alt={footerProps.logo.alt || 'Logo'}
                  width={footerProps.logo.width || 120}
                  height={footerProps.logo.height || 40}
                  className="h-10 w-auto"
                />
              )}
            </Link>

            {footerProps.tagline && (
              <p className="text-gray-600 text-sm mb-4">
                {footerProps.tagline}
              </p>
            )}

            {/* Social Links */}
            {footerProps.socialLinks && footerProps.socialLinks.length > 0 && (
              <div className="flex gap-4">
                {footerProps.socialLinks.map((social, index) => (
                  <SocialIcon key={index} platform={social.platform} url={social.url} />
                ))}
              </div>
            )}
          </div>

          {/* Link Groups (Columns) */}
          {footerProps.linkGroups.map((group, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.url || '#'}
                      className="text-gray-600 hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section (if enabled) */}
        {footerProps.showNewsletter && (
          <div className="border-t border-gray-200 pt-8 mb-8">
            <Footer1Client
              newsletterTitle={footerProps.newsletterTitle}
              newsletterDescription={footerProps.newsletterDescription}
            />
          </div>
        )}

        {/* Bottom Bar: Copyright + Legal Links */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            {footerProps.copyrightText}
          </p>

          {/* Legal Links */}
          {footerProps.legalLinks && footerProps.legalLinks.length > 0 && (
            <ul className="flex gap-6">
              {footerProps.legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url || '#'}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Fullstack Factory Branding - ALWAYS VISIBLE, NOT EDITABLE */}
      <FullstackFactoryBranding />
    </footer>
  )
}

// Helper Component for Social Icons
function SocialIcon({ platform, url }: { platform: string; url: string }) {
  const iconMap: Record<string, JSX.Element> = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-primary transition-colors"
      aria-label={platform}
    >
      {iconMap[platform] || iconMap.other}
    </a>
  )
}
```

### Phase 10: Client Component erstellen (Newsletter)

**Datei:** `src/components/Footer1/Footer1.client.tsx`

```typescript
'use client'

import React, { useState } from 'react'

interface NewsletterProps {
  newsletterTitle?: string
  newsletterDescription?: string
}

export function Footer1Client({
  newsletterTitle,
  newsletterDescription
}: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Newsletter signup logic here
      // Example: API call to your newsletter service
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-md mx-auto text-center">
      {newsletterTitle && (
        <h3 className="text-xl font-semibold mb-2">
          {newsletterTitle}
        </h3>
      )}

      {newsletterDescription && (
        <p className="text-gray-600 text-sm mb-4">
          {newsletterDescription}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ihre E-Mail-Adresse"
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Wird gesendet...' : 'Anmelden'}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-2 text-sm text-green-600">
          Vielen Dank! Sie wurden erfolgreich angemeldet.
        </p>
      )}

      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">
          Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.
        </p>
      )}
    </div>
  )
}
```

### Phase 11: Index Export

**Datei:** `src/components/Footer1/index.ts`

```typescript
export { Footer1 } from './Footer1'
export { FullstackFactoryBranding } from './FullstackFactoryBranding'
export type { Footer1Props, FooterLink, FooterLinkGroup, SocialLink } from './Footer1.types'
```

### Phase 12: Integration in Layout

**Datei:** `src/app/(app)/layout.tsx`

```typescript
import { Navbar1 } from '@/components/Navbar1'
import { Footer1 } from '@/components/Footer1'
// Entferne alte Footer-Imports!

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <Navbar1 />

        <main>{children}</main>

        {/* Neuer Footer */}
        <Footer1 />
      </body>
    </html>
  )
}
```

## Fullstack Factory Branding - Wichtige Details

### ✅ Anforderungen:

1. **Position:** Unterste Zeile des Footers, zentriert
2. **Text:** "Mit ❤ entwickelt von Fullstack Factory"
3. **Verlinkung:** "Fullstack Factory" verlinkt zu `https://fullstack-factory.de`
4. **Styling:**
   - Kleiner Text (text-sm)
   - Grauer Text für normalen Text
   - Rotes Herz (❤)
   - Fett für "Fullstack Factory"
   - Hover-Effekt auf Link
5. **Nicht editierbar:** Hardcoded, nicht im CMS konfigurierbar
6. **Border:** Leichte Border oben zur Trennung vom Rest

### 🎨 Styling-Optionen:

**Standard (wie im Beispiel):**

```typescript
<div className="fullstack-factory-branding text-center py-4 border-t border-gray-200">
  <p className="text-sm text-gray-600">
    Mit{' '}
    <span className="text-red-500">❤</span>{' '}
    entwickelt von{' '}
    <a href="https://fullstack-factory.de" className="font-semibold hover:text-primary">
      Fullstack Factory
    </a>
  </p>
</div>
```

**Mit Branding-Farben:**

```typescript
import { branding } from '@/config/branding'

<a
  href="https://fullstack-factory.de"
  className="font-semibold transition-colors"
  style={{ color: branding.colors.primary }}
>
  Fullstack Factory
</a>
```

**Dunkler Footer (Variante):**

```typescript
<div className="fullstack-factory-branding text-center py-4 border-t border-gray-700 bg-gray-900">
  <p className="text-sm text-gray-400">
    Mit{' '}
    <span className="text-red-500">❤</span>{' '}
    entwickelt von{' '}
    <a
      href="https://fullstack-factory.de"
      className="font-semibold text-white hover:text-primary"
    >
      Fullstack Factory
    </a>
  </p>
</div>
```

## Checklist: Footer Integration

### ✅ Vorbereitung

- [ ] Relume Footer identifiziert (z.B. Footer1)
- [ ] Footer im .relume-reference gefunden
- [ ] Struktur und Props analysiert
- [ ] Interaktive Elemente identifiziert (Newsletter?)

### ✅ Alte Footer entfernen

- [ ] Alte Footer-Dateien gelöscht
- [ ] Imports aus Layout entfernt
- [ ] Alte Global/Collection gelöscht
- [ ] Keine Reste im Code

### ✅ PayloadCMS Setup

- [ ] Footer Global erstellt (`src/globals/Footer.ts`)
- [ ] Fields basierend auf Footer-Props definiert
- [ ] In `payload.config.ts` registriert

### ✅ Komponenten erstellen

- [ ] Type Definitions (`Footer1.types.ts`)
- [ ] Fullstack Factory Branding Component (`FullstackFactoryBranding.tsx`)
- [ ] Server Component (`Footer1.tsx`)
- [ ] Client Component (`Footer1.client.tsx`) - falls Newsletter
- [ ] Index Export (`index.ts`)

### ✅ Fullstack Factory Branding

- [ ] ✅ Text: "Mit ❤ entwickelt von Fullstack Factory"
- [ ] ✅ Zentriert positioniert
- [ ] ✅ Unterste Zeile (nach Copyright/Legal Links)
- [ ] ✅ Link zu https://fullstack-factory.de
- [ ] ✅ Rotes Herz (❤)
- [ ] ✅ Hover-Effekt auf Link
- [ ] ✅ Hardcoded (nicht editierbar im CMS)

### ✅ Integration

- [ ] In Layout eingebunden
- [ ] Branding-Farben integriert
- [ ] Social Icons funktionieren
- [ ] Newsletter funktioniert (falls aktiviert)
- [ ] Legal Links funktionieren

### ✅ Testing

- [ ] Footer wird korrekt angezeigt
- [ ] Alle Links funktionieren
- [ ] Social Media Links öffnen korrekt
- [ ] Newsletter-Form funktioniert (falls aktiviert)
- [ ] Fullstack Factory Branding sichtbar
- [ ] Responsive Design korrekt
- [ ] Footer bleibt am Seitenende (Sticky Footer falls gewünscht)

### ✅ Finalisierung

- [ ] Alter Footer-Code komplett entfernt
- [ ] Keine Console-Errors
- [ ] TypeScript-Errors behoben
- [ ] Code committed

## Automatisierungs-Template für ClaudeCode

**Wenn kein Footer angegeben:**

```markdown
Nach der Navbar-Integration folgt nun der Footer.

**Footer-Auswahl erforderlich:**

Welchen Footer aus dem Relume-Components Repository möchten Sie verwenden?

Verfügbare Optionen (Beispiele):

- Footer1 - Klassischer 4-Spalten Footer
- Footer2 - Minimalistischer Footer
- Footer3 - Footer mit Newsletter
- Footer4 - Footer mit Logo-Zentrierung
- [Andere - bitte Namen angeben]

Bitte geben Sie den Namen an, z.B. "Footer1"

**Hinweis:** Der Footer wird automatisch mit dem Fullstack Factory Branding versehen:
"Mit ❤ entwickelt von Fullstack Factory" (unterste Zeile, zentriert)
```

**Nach Auswahl:**

```markdown
✓ Footer ausgewählt: [Name]

Ich werde jetzt:

1. ✓ Alten Footer entfernen
2. ✓ Relume Footer lokalisieren
3. ✓ PayloadCMS Footer Global erstellen
4. ✓ Server Component erstellen
5. ✓ Client Component für Newsletter erstellen (falls benötigt)
6. ✓ Fullstack Factory Branding Component hinzufügen
7. ✓ In Layout integrieren
8. ✓ Branding-Farben anwenden

Starte Footer-Integration...
```

## Häufige Fehler vermeiden

### ❌ NICHT TUN:

```typescript
// ❌ Fullstack Factory Branding vergessen
<footer>
  {/* Footer Content */}
  {/* ← Fullstack Factory Branding fehlt! */}
</footer>

// ❌ Fullstack Factory Branding editierbar machen
fields: [
  {
    name: 'fullstackFactoryBranding',
    type: 'text', // ← NEIN! Hardcoded!
  }
]

// ❌ Newsletter als Server Component
export async function Newsletter() {
  const [email, setEmail] = useState('') // ← Fehler! Needs 'use client'
  // ...
}

// ❌ Fullstack Factory Branding nicht zentriert
<div className="text-left"> {/* ← Falsch */}
  Mit ❤ entwickelt von Fullstack Factory
</div>
```

### ✅ RICHTIG:

```typescript
// ✅ Fullstack Factory Branding immer einbinden
export async function Footer1() {
  return (
    <footer>
      {/* Footer Content */}

      {/* ALWAYS LAST - Fullstack Factory Branding */}
      <FullstackFactoryBranding />
    </footer>
  )
}

// ✅ Branding als separate, hardcoded Component
export function FullstackFactoryBranding() {
  return (
    <div className="text-center"> {/* ← Zentriert */}
      Mit ❤ entwickelt von Fullstack Factory
    </div>
  )
}

// ✅ Newsletter mit 'use client'
'use client'
export function Newsletter() {
  const [email, setEmail] = useState('')
  // ...
}
```

## Server vs. Client Components - Entscheidungsbaum

```
Footer Component
│
├─ Hat Newsletter-Form?
│  │
│  ├─ JA → Split in Server + Client
│  │  │
│  │  ├─ Server Component (Footer.tsx)
│  │  │   └─ Fetch Payload Data
│  │  │   └─ Render Static Content (Logo, Links, Social)
│  │  │   └─ Pass Newsletter Data to Client Component
│  │  │   └─ Render Fullstack Factory Branding (hardcoded)
│  │  │
│  │  └─ Client Component (Footer.client.tsx)
│  │      └─ 'use client' directive
│  │      └─ Newsletter Form with useState
│  │      └─ Form submission logic
│  │
│  └─ NEIN → Single Server Component
│     └─ Nur statische Links & Content
│     └─ Fullstack Factory Branding (hardcoded)
│     └─ Kein JavaScript benötigt
```

## Zusammenfassung

**Footer Integration in Kürze:**

1. **Footer auswählen** (wenn nicht vorgegeben)
2. **Alten Footer komplett entfernen**
3. **Relume Footer analysieren**
4. **Footer Global erstellen** (mit Link-Gruppen, Social, Newsletter)
5. **Fullstack Factory Branding Component** erstellen (hardcoded!)
6. **Components aufteilen** (Server + Client falls Newsletter)
7. **Integration** in Layout (nach Main, vor </body>)
8. **Testing** (Desktop + Mobile + Links + Branding sichtbar)

**Datei-Struktur Result:**

```
src/
├── globals/
│   ├── Header.ts
│   └── Footer.ts                           # PayloadCMS Global
├── components/
│   ├── Navbar1/
│   │   └── ...
│   └── Footer1/
│       ├── index.ts                        # Export
│       ├── Footer1.tsx                     # Server Component
│       ├── Footer1.client.tsx              # Client Component (Newsletter)
│       ├── Footer1.types.ts                # Types
│       └── FullstackFactoryBranding.tsx    # Hardcoded Branding ❤
└── app/
    └── (app)/
        └── layout.tsx                      # Integration (Navbar + Footer)
```

**Wichtigste Regel:**
Fullstack Factory Branding **IMMER** einbinden, **IMMER** unterste Zeile, **IMMER** zentriert, **IMMER** hardcoded (nicht editierbar).

Format: **"Mit ❤ entwickelt von Fullstack Factory"**
