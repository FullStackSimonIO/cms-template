# 🎨 Global Styling Guidelines

## 🎯 Grundprinzip

**Alle Design-Tokens (Farben, Schriftgrößen, Spacing, etc.) werden GLOBAL definiert.**

Frontend-Komponenten (Heroes, Blocks, Components) verwenden ausschließlich:
- ✅ Semantic CSS-Klassen aus `globals.css`
- ✅ Theme-Tokens aus `tailwind.config.ts`
- ✅ CSS-Variablen aus `:root`

❌ NIEMALS hardcodierte Werte wie `text-6xl`, `text-blue-500`, `bg-red-600` direkt in Komponenten!

---

## 📂 Architektur

```
src/
├── app/
│   └── globals.css           # Semantic Utility Classes + CSS Variables
├── tailwind.config.ts        # Theme Definition (Colors, Spacing, Typography)
└── components/
    ├── heros/
    │   └── HeroHeader1.tsx   # Verwendet semantic classes: "hero-heading"
    └── blocks/
        └── Layout1.tsx       # Verwendet semantic classes: "block-heading"
```

---

## 🎨 Styling Layers

### Layer 1: CSS Variables (`:root`)
Definiert in `globals.css` - Die atomaren Design-Tokens

```css
/* src/app/globals.css */
:root {
  /* === COLORS === */
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-primary-light: #60a5fa;
  --color-secondary: #8b5cf6;

  --color-surface: #ffffff;
  --color-surface-variant: #f9fafb;
  --color-surface-elevated: #f3f4f6;

  --color-on-surface: #1f2937;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-text-tertiary: #9ca3af;

  --color-border: #e5e7eb;
  --color-border-strong: #d1d5db;

  /* === TYPOGRAPHY === */
  /* All body text = 16px */
  --text-base: 1rem;       /* 16px */

  /* Headings - Mobile First (< 768px) */
  --h1-size: 2.75rem;      /* 44px */
  --h2-size: 2.5rem;       /* 40px */
  --h3-size: 2rem;         /* 32px */
  --h4-size: 1.75rem;      /* 28px */

  /* === SPACING === */
  --spacing-xs: 0.5rem;    /* 8px */
  --spacing-sm: 1rem;      /* 16px */
  --spacing-md: 1.5rem;    /* 24px */
  --spacing-lg: 2rem;      /* 32px */
  --spacing-xl: 3rem;      /* 48px */
  --spacing-2xl: 4rem;     /* 64px */
  --spacing-3xl: 6rem;     /* 96px */

  --spacing-section-y: 4rem;     /* Standard Section Padding Y */
  --spacing-block-gap: 3rem;     /* Gap between blocks */
  --spacing-container-x: 5%;     /* Container Padding X */

  /* === RADIUS === */
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */

  /* === SHADOWS === */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Dark Theme */
[data-theme="dark"] {
  --color-surface: #1f2937;
  --color-surface-variant: #374151;
  --color-surface-elevated: #4b5563;

  --color-on-surface: #f9fafb;
  --color-text-primary: #f3f4f6;
  --color-text-secondary: #d1d5db;
  --color-text-tertiary: #9ca3af;

  --color-border: #4b5563;
  --color-border-strong: #6b7280;

  --color-primary: #60a5fa;
  --color-primary-dark: #3b82f6;
  --color-primary-light: #93c5fd;
}

/* Responsive Typography - Tablet (>= 768px) */
@media (min-width: 768px) {
  :root {
    --h1-size: 3.5rem;       /* 56px */
    --h2-size: 3.25rem;      /* 52px */
    --h3-size: 2.5rem;       /* 40px */
    --h4-size: 2rem;         /* 32px */
    --spacing-section-y: 5rem;
  }
}

/* Desktop (>= 1024px) */
@media (min-width: 1024px) {
  :root {
    --h1-size: 4.5rem;       /* 72px */
    --h2-size: 4rem;         /* 64px */
    --h3-size: 3rem;         /* 48px */
    --h4-size: 2.25rem;      /* 36px */
    --spacing-section-y: 6rem;
  }
}
```

---

### Layer 2: Tailwind Config
Definiert in `tailwind.config.ts` - Tailwind Theme Extension

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Semantic Colors
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        secondary: 'var(--color-secondary)',

        surface: {
          DEFAULT: 'var(--color-surface)',
          variant: 'var(--color-surface-variant)',
          elevated: 'var(--color-surface-elevated)',
        },

        'on-surface': 'var(--color-on-surface)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',

        border: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
        },
      },

      spacing: {
        'section-y': 'var(--spacing-section-y)',
        'block-gap': 'var(--spacing-block-gap)',
        'container-x': 'var(--spacing-container-x)',
      },

      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
      },

      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

### Layer 3: Semantic Utility Classes
Definiert in `globals.css` - Component-level Semantic Classes

```css
/* src/app/globals.css */

/* ==================== TYPOGRAPHY ==================== */

/* Hero Typography */
.hero-heading {
  @apply text-6xl font-bold leading-tight tracking-tight;
  @apply md:text-8xl lg:text-9xl;
}

.hero-subheading {
  @apply text-4xl font-semibold leading-snug;
  @apply md:text-5xl lg:text-6xl;
}

.hero-tagline {
  @apply text-sm font-semibold uppercase tracking-wider;
  @apply md:text-base;
}

.hero-description {
  @apply text-lg leading-relaxed text-text-secondary;
  @apply md:text-xl;
}

/* Block Typography */
.block-heading {
  @apply text-5xl font-bold leading-tight;
  @apply md:text-7xl lg:text-8xl;
}

.block-subheading {
  @apply text-3xl font-semibold leading-snug;
  @apply md:text-4xl lg:text-5xl;
}

.block-tagline {
  @apply text-sm font-semibold;
  @apply md:text-base;
}

.block-description {
  @apply text-base leading-relaxed text-text-secondary;
  @apply md:text-lg;
}

/* Card Typography */
.card-heading {
  @apply text-2xl font-bold leading-tight;
  @apply md:text-3xl lg:text-4xl;
}

.card-description {
  @apply text-base text-text-secondary;
}

/* ==================== LAYOUT ==================== */

/* Sections */
.hero-section {
  @apply relative px-container-x py-16;
  @apply md:py-24 lg:py-28;
}

.block-section {
  @apply px-container-x py-16;
  @apply md:py-24 lg:py-28;
}

/* Container */
.container-custom {
  @apply mx-auto max-w-7xl px-container-x;
}

.container-narrow {
  @apply mx-auto max-w-3xl px-container-x;
}

/* ==================== COMPONENTS ==================== */

/* Buttons */
.btn {
  @apply inline-flex items-center justify-center;
  @apply rounded-md font-medium transition-colors;
  @apply px-6 py-3 text-base;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply btn bg-primary text-white;
  @apply hover:bg-primary-dark;
  @apply focus:ring-primary;
}

.btn-secondary {
  @apply btn border-2 border-primary text-primary;
  @apply hover:bg-primary hover:text-white;
  @apply focus:ring-primary;
}

.btn-ghost {
  @apply btn border-2 border-border text-on-surface;
  @apply hover:bg-surface-variant;
  @apply focus:ring-border-strong;
}

/* Cards */
.card {
  @apply bg-surface border border-border rounded-lg;
  @apply shadow-sm;
}

.card-feature {
  @apply card p-6;
  @apply md:p-8;
}

.card-elevated {
  @apply card shadow-md;
  @apply hover:shadow-lg transition-shadow;
}

/* Forms */
.input {
  @apply w-full rounded-md border border-border;
  @apply px-4 py-3 text-base;
  @apply bg-surface text-on-surface;
  @apply focus:outline-none focus:ring-2 focus:ring-primary;
}

.label {
  @apply mb-2 block text-sm font-medium text-on-surface;
}

/* FAQ */
.faq-item {
  @apply border-b border-border pb-4;
}

.faq-question {
  @apply text-xl font-bold text-on-surface;
  @apply md:text-2xl;
}

.faq-answer {
  @apply mt-4 text-base text-text-secondary;
}

/* Team */
.team-member-card {
  @apply flex flex-col;
}

.team-member-name {
  @apply text-xl font-bold text-on-surface;
  @apply md:text-2xl;
}

.team-member-title {
  @apply text-sm text-text-secondary;
}

/* Logo Grid */
.logo-grid {
  @apply grid grid-cols-2 gap-8;
  @apply md:grid-cols-4 lg:grid-cols-6;
}
```

---

## 📝 Verwendung in Komponenten

### ✅ RICHTIG: Hero Component

```tsx
// src/heros/HeroHeader1/Component.tsx
export const HeroHeader1 = ({ tagline, heading, description, buttons }) => {
  return (
    <section className="hero-section">
      <div className="container-custom">
        <p className="hero-tagline mb-3 md:mb-4">{tagline}</p>
        <h1 className="hero-heading text-on-surface mb-5 md:mb-6">
          {heading}
        </h1>
        <p className="hero-description mb-6 md:mb-8">{description}</p>
        <div className="flex flex-wrap gap-4">
          {buttons?.map((button, index) => (
            <a key={index} href={button.url} className="btn-primary">
              {button.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### ✅ RICHTIG: Block Component

```tsx
// src/blocks/Layout13/Component.tsx
export const Layout13 = ({ tagline, heading, description, features }) => {
  return (
    <section className="block-section">
      <div className="container-custom">
        <p className="block-tagline mb-3 md:mb-4">{tagline}</p>
        <h2 className="block-heading text-on-surface mb-5 md:mb-6">
          {heading}
        </h2>
        <p className="block-description mb-12 md:mb-18 lg:mb-20">
          {description}
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features?.map((feature, index) => (
            <div key={index} className="card-feature">
              <h3 className="card-heading mb-3 md:mb-4">
                {feature.heading}
              </h3>
              <p className="card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### ❌ FALSCH: Hardcodierte Werte

```tsx
// ❌ NIEMALS SO!
export const HeroHeader1 = ({ heading, description }) => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <h1 className="text-6xl font-bold text-gray-900 mb-5 md:text-9xl md:mb-6">
        {heading}
      </h1>
      <p className="text-lg text-gray-600 md:text-xl">
        {description}
      </p>
      <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md">
        CTA Button
      </button>
    </section>
  )
}
```

---

## 🔄 Workflow: Neuen Style hinzufügen

### Szenario: Neue Button-Variante benötigt

1. **CSS Variable definieren** (falls neue Farbe):
```css
/* globals.css */
:root {
  --color-accent: #f59e0b;
  --color-accent-dark: #d97706;
}
```

2. **Tailwind Config erweitern** (optional):
```typescript
// tailwind.config.ts
colors: {
  accent: {
    DEFAULT: 'var(--color-accent)',
    dark: 'var(--color-accent-dark)',
  }
}
```

3. **Semantic Class erstellen**:
```css
/* globals.css */
.btn-accent {
  @apply btn bg-accent text-white;
  @apply hover:bg-accent-dark;
  @apply focus:ring-accent;
}
```

4. **In Komponente verwenden**:
```tsx
<button className="btn-accent">Accent Button</button>
```

---

## ✅ Vorteile dieses Systems

1. **Single Source of Truth:** Alle Styles zentral verwaltet
2. **Theme Support:** Dark Mode / Custom Themes mit einem Toggle
3. **Konsistenz:** Alle Komponenten nutzen dieselben Design-Tokens
4. **Wartbarkeit:** Änderungen an einem Ort statt hunderten Dateien
5. **Performance:** Wiederverwendbare CSS-Klassen = kleinere Bundles
6. **DX:** Semantic Namen = lesbarerer Code (`btn-primary` statt `bg-blue-600`)

---

## 🚫 Was ist verboten?

### ❌ Hardcodierte Farben
```tsx
className="text-blue-500 bg-red-600 border-gray-300"
```

### ❌ Hardcodierte Schriftgrößen
```tsx
className="text-6xl md:text-9xl"
```

### ❌ Hardcodierte Spacing
```tsx
className="py-16 md:py-24 lg:py-28 px-[5%]"
```

### ❌ Hardcodierte Radius/Shadows
```tsx
className="rounded-lg shadow-xl"
```

---

## 📚 Referenzen

- **Hero Guidelines:** `.claude/guides/HERO_DEVELOPMENT_GUIDE.md`
- **Block Guidelines:** `.claude/guides/BLOCK_DEVELOPMENT_GUIDE.md`
- **Tailwind Docs:** [https://tailwindcss.com/docs/configuration](https://tailwindcss.com/docs/configuration)
- **CSS Variables:** [https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

## 🎉 Happy Styling!

Mit diesem System bleibt dein Code sauber, wartbar und konsistent. Design-Updates sind ein Kinderspiel! 🚀
