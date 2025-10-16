# ⚠️ KRITISCH: NUR FIGMA-KOMPONENTEN GENERIEREN

## 🎯 Absolut zentrale Regel

**ES WERDEN AUSSCHLIESSLICH DIE IM FIGMA-DESIGN VERWENDETEN KOMPONENTEN GENERIERT!**

---

## ✅ KORREKTER Workflow

### Schritt 1: Figma scannen
```bash
cursor> Fetch Used Figma Components
```

**Output:** `FIGMA_INVENTORY.json` mit **nur** den verwendeten Komponenten

### Schritt 2: Inventar prüfen
```typescript
// FIGMA_INVENTORY.json zeigt die genaue Anzahl:
{
  "meta": {
    "totalUsedComponents": 45,  // ← NUR DIESE werden generiert!
    "componentsToGenerate": 45,
    // NICHT 1071!
  },
  "categorized": {
    "Hero": [...],      // ← Wird NICHT übersprungen
    "Navbar": [...],    // ← Wird NICHT übersprungen
    "Footer": [...],    // ← Wird NICHT übersprungen
    "Layout": [...],
    "CTA": [...],
    // etc.
  }
}
```

### Schritt 3: Blocks generieren
```bash
cursor> Generate Blocks from Figma Inventory
```

**Generiert:**
- ✅ Nur die 45 (oder wie viele auch immer) Komponenten aus dem Figma
- ✅ Heroes/Header werden inkludiert
- ✅ Navbar wird inkludiert  
- ✅ Footer wird inkludiert
- ❌ KEINE ungenutzten Relume-Komponenten

---

## ❌ FALSCHER Workflow

### ⛔ NICHT verwenden:
```bash
# FALSCH - generiert alle 1071 Komponenten:
cursor> Generate ALL Relume Blocks - Master Orchestrator
```

**Problem:**
- Generiert 1071 Blocks
- Ignoriert Figma-Design
- Viel zu viel Ballast
- Unübersichtlich

---

## 🔍 Figma-Scan Konfiguration

### Was wird gescannt?

```typescript
// Alle Node-Typen werden erfasst:
const blockRelevantTypes = [
  'COMPONENT',          // Komponenten-Definition
  'COMPONENT_SET',      // Komponenten-Varianten
  'INSTANCE',           // Komponenten-Instanz (VERWENDUNG!)
  'FRAME'              // Container (potenzielle Sections)
]

// KEINE Ausschlüsse!
// Heroes werden NICHT übersprungen
// Navbar wird NICHT übersprungen
// Footer wird NICHT übersprungen
```

### Kategorisierung

```typescript
const categoryPatterns = {
  Hero: [/header/i, /hero/i, /banner/i],  // ← Header-Komponenten = Heroes!
  Navbar: [/nav(bar)?/i, /navigation/i, /menu/i],
  Footer: [/footer/i, /fußzeile/i],
  Layout: [/layout/i, /grid/i, /container/i],
  CTA: [/cta/i, /call.*action/i],
  // ... etc
}

// Automatisches Mapping:
// Figma "Header Section 1" → Hero1
// Figma "Main Navigation" → Navbar1
// Figma "Footer Desktop" → Footer1
```

---

## 📊 Typische Projekt-Größe

### Realistische Zahlen:

```
📦 Typisches Figma-Design (Agentur-Website):
   ├── Hero: 3 Varianten (Homepage, About, Contact)
   ├── Navbar: 1 Komponente (mit mobile/desktop Variants)
   ├── Footer: 1 Komponente (mit mobile/desktop Variants)
   ├── Layout Sections: 15-20 Komponenten
   ├── CTA Sections: 3-5 Komponenten
   ├── Contact Forms: 2-3 Komponenten
   ├── Testimonials: 2 Varianten
   ├── Pricing: 1-2 Komponenten
   └── Sonstige: 5-10 Komponenten

GESAMT: 35-50 Blocks (nicht 1071!)
```

### Unrrealistisch:

```
❌ FALSCH: Alle 1071 Relume-Komponenten generieren
   - 527 Layout-Varianten? Niemand braucht das!
   - 152 Hero-Varianten? Viel zu viel!
   - 68 Blog-Komponenten? Nur wenn Blog-Modul!
   
✅ RICHTIG: Nur die 35-50 aus deinem Figma-Design
   - Nur die Layouts, die du designed hast
   - Nur die Heroes, die du brauchst
   - Nur die Komponenten, die auf deiner Website vorkommen
```

---

## 🚀 Batching-Mechanismus

Das Batching funktioniert **automatisch auf Basis des Inventars**:

```typescript
// FIGMA_INVENTORY.json enthält:
const inventory = {
  relumeMapping: [
    // Nur gemappte Komponenten
    { figma: "Hero Section", relume: "relume/Header/Header1.tsx", category: "Hero" },
    { figma: "Main Nav", relume: "relume/Navbar/Navbar1.tsx", category: "Navbar" },
    { figma: "Footer", relume: "relume/Footer/Footer1.tsx", category: "Footer" },
    // ... nur die aus Figma
  ]
}

// Batching pro Kategorie:
for (const [category, components] of Object.entries(inventory.categorized)) {
  console.log(`Generiere ${category}: ${components.length} Komponenten`)
  await generateCategoryBatch(category, components)
}

// NICHT:
// Alle 527 Layout-Komponenten durchgehen
// Alle 152 Header durchgehen
// etc.
```

---

## 🛡️ Validierung

### Pre-Flight Check:

```typescript
// Vor der Generierung prüfen:
if (!fs.existsSync('FIGMA_INVENTORY.json')) {
  throw new Error('❌ STOP! Figma Inventory fehlt. Erst "Fetch Used Figma Components" ausführen!')
}

const inventory = JSON.parse(fs.readFileSync('FIGMA_INVENTORY.json'))

if (inventory.meta.componentsToGenerate > 200) {
  console.warn('⚠️ WARNUNG: Mehr als 200 Komponenten im Figma? Ist das richtig?')
  console.warn('   Typische Projekte haben 30-80 Komponenten.')
  console.warn('   Bitte Figma-Scan prüfen!')
}

console.log(`✅ Generiere ${inventory.meta.componentsToGenerate} Komponenten aus Figma`)
console.log(`   (nicht alle 1071 Relume-Komponenten)`)
```

---

## 📝 Zusammenfassung

| Was | Anzahl | Quelle |
|-----|--------|--------|
| **Verfügbare Relume-Templates** | 1071 | `/relume/` Ordner |
| **Im Figma verwendet** | 30-80 | Figma-Scan |
| **Zu generieren** | 30-80 | **NUR Figma!** |

### Wichtigste Regel:

> **FIGMA_INVENTORY.json ist die einzige Quelle der Wahrheit!**
> 
> Nur Komponenten, die im Inventar stehen, werden generiert.
> Keine Ausnahmen. Kein "alle 1071".

---

## 🔧 Command-Übersicht

### ✅ KORREKT - Verwende diese:

1. `Fetch Used Figma Components` → Scannt Figma, erstellt Inventar
2. `Generate Blocks from Figma Inventory` → Generiert nur Inventar-Komponenten

### ❌ VERALTET - NICHT verwenden:

1. `Generate ALL Relume Blocks` → Generiert alle 1071 (FALSCH!)

---

## 💡 Pro-Tipps

### Heroes werden NICHT übersprungen:

```typescript
// ✅ RICHTIG - aus fetch-all-figma-components.mdc:
const categoryPatterns = {
  Hero: [/header/i, /hero/i, /banner/i],  // ← Header-Komponenten = Heroes!
  // ...
}

// ❌ FALSCH - aus veralteten Commands:
if (category === 'Hero') {
  console.log(`⏭️ Überspringe Hero`)
  continue  // ← DAS DARF NICHT PASSIEREN!
}
```

### Navbar & Footer werden inkludiert:

```typescript
// ✅ RICHTIG:
const blocksToGenerate = []

for (const mapping of inventory.relumeMapping) {
  // KEINE Ausschlüsse!
  blocksToGenerate.push({
    figmaComponent: mapping.figma,
    relumeTemplate: mapping.relume,
    category: mapping.category, // Kann auch 'Hero', 'Navbar', 'Footer' sein
  })
}
```

---

## ✅ Abschluss-Checkliste

Vor der Block-Generierung prüfen:

- [ ] `FIGMA_INVENTORY.json` existiert
- [ ] Inventar enthält reale Komponenten-Anzahl (30-80, nicht 1071)
- [ ] Heroes/Header sind im Inventar enthalten
- [ ] Navbar ist im Inventar enthalten
- [ ] Footer ist im Inventar enthalten
- [ ] Keine veralteten Commands werden verwendet
- [ ] Nur `generate-blocks-from-inventory.mdc` wird verwendet

---

**Version:** 1.0  
**Erstellt:** 2025-10-16  
**Zweck:** Verhindert Generierung ungenutzter Komponenten
