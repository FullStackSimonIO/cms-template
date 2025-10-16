# 🚀 Quick Start: Figma → PayloadCMS Blocks

## ⚡ Der korrekte Workflow (in 2 Schritten)

### Schritt 1: Figma scannen ✅
```bash
cursor> Fetch Used Figma Components
```

**Was passiert:**
- Scannt dein komplettes Figma-Design
- Findet ALLE verwendeten Komponenten (inkl. Heroes, Navbar, Footer)
- Erstellt `FIGMA_INVENTORY.json` mit **nur** den verwendeten Komponenten
- Typische Anzahl: 30-80 Komponenten

**Output:**
```json
{
  "meta": {
    "totalUsedComponents": 45,
    "componentsToGenerate": 45
  },
  "categorized": {
    "Hero": [/* 3 Komponenten */],
    "Navbar": [/* 1 Komponente */],
    "Footer": [/* 1 Komponente */],
    "Layout": [/* 15 Komponenten */],
    "CTA": [/* 5 Komponenten */],
    ...
  }
}
```

---

### Schritt 2: Blocks generieren ✅
```bash
cursor> Generate Blocks from Figma Inventory
```

**Was passiert:**
- Lädt `FIGMA_INVENTORY.json`
- Generiert **nur** die 45 Komponenten aus dem Inventar
- Erstellt Component.tsx, config.ts, index.ts pro Block
- Registriert automatisch in Pages Collection
- Dauer: ~2-3 Minuten

**Output:**
```
src/blocks/
├── Hero/
│   ├── Hero1/
│   ├── Hero2/
│   └── Hero3/
├── Navbar/
│   └── Navbar1/
├── Footer/
│   └── Footer1/
├── Layout/
│   └── ... (15 Blocks)
└── CTA/
    └── ... (5 Blocks)

✅ 45 Blocks generiert (nicht 1071!)
```

---

## ❌ NICHT verwenden:

### Veralteter Command:
```bash
# ❌ FALSCH - Generiert ALLE 1071 Relume-Komponenten:
cursor> Generate ALL Relume Blocks - Master Orchestrator
```

**Problem:**
- Ignoriert Figma-Design
- Generiert alle 1071 Komponenten
- Viel zu viel Ballast
- Lange Generierungszeit (15-18 Minuten)
- Unübersichtliches Admin-Panel

---

## 📊 Erwartete Zahlen

### Typisches Projekt:

| Kategorie | Anzahl | Beispiele |
|-----------|--------|-----------|
| **Heroes** | 3-5 | Homepage Hero, About Hero, Contact Hero |
| **Navbar** | 1 | Main Navigation (mit mobile/desktop) |
| **Footer** | 1 | Footer (mit mobile/desktop) |
| **Layout** | 10-20 | Feature Grids, Content Sections, etc. |
| **CTA** | 3-8 | Call-to-Action Sections |
| **Contact** | 2-4 | Kontaktformulare |
| **Testimonials** | 2-3 | Kundenbewertungen |
| **Pricing** | 1-2 | Preistabellen |
| **Weitere** | 5-15 | Team, Gallery, FAQ, etc. |
| **GESAMT** | **30-80** | **Projektabhängig** |

### ⚠️ NICHT:

- ❌ 527 Layout-Komponenten
- ❌ 152 Hero-Komponenten
- ❌ 68 Blog-Komponenten (nur wenn Blog-Modul!)
- ❌ 1071 Gesamt-Komponenten

---

## ✅ Checkliste

Nach der Generierung prüfen:

- [ ] `FIGMA_INVENTORY.json` existiert
- [ ] Inventar zeigt 30-80 Komponenten (nicht 1071)
- [ ] Heroes sind generiert
- [ ] Navbar ist generiert
- [ ] Footer ist generiert
- [ ] Alle Figma-Komponenten sind als Blocks vorhanden
- [ ] Pages Collection hat ~40 Blocks (nicht 1071)
- [ ] Admin-Panel ist übersichtlich
- [ ] Build funktioniert: `npm run build`

---

## 🔍 Validierung

### Prüfe generierte Blocks:

```bash
# Anzahl generierter Blocks
ls -d src/blocks/*/* | wc -l

# Sollte zeigen: 30-80 (nicht 1071)
```

### Prüfe Inventar:

```bash
# Anzahl Komponenten im Inventar
cat FIGMA_INVENTORY.json | jq '.meta.componentsToGenerate'

# Sollte zeigen: 30-80
```

### Prüfe Kategorien:

```bash
# Kategorien mit Anzahl
cat FIGMA_INVENTORY.json | jq '.statistics.byType'

# Sollte zeigen:
# [
#   { "type": "Layout", "count": 15 },
#   { "type": "Hero", "count": 3 },
#   { "type": "Navbar", "count": 1 },
#   ...
# ]
```

---

## 💡 Troubleshooting

### Problem: Heroes fehlen

**Lösung:**
```bash
# 1. Prüfe Inventar
cat FIGMA_INVENTORY.json | jq '.categorized.Hero'

# 2. Prüfe Figma-Namen
# Heroes sollten erkannt werden über:
# - /header/i
# - /hero/i
# - /banner/i

# 3. Stelle sicher, dass Komponenten erkennbare Namen haben
# ✅ "Header Section", "Hero 1", "Main Banner"
# ❌ "Frame 1234", "Group 5678"
```

### Problem: Zu viele Blocks generiert

**Lösung:**
```bash
# 1. Prüfe, welcher Command verwendet wurde
# ✅ RICHTIG: "Generate Blocks from Figma Inventory"
# ❌ FALSCH: "Generate ALL Relume Blocks"

# 2. Lösche falsch generierte Blocks
rm -rf src/blocks/*

# 3. Führe korrekten Workflow aus
cursor> Fetch Used Figma Components
cursor> Generate Blocks from Figma Inventory
```

### Problem: Navbar/Footer fehlen

**Lösung:**
```bash
# 1. Prüfe Inventar
cat FIGMA_INVENTORY.json | jq '.categorized.Navbar'
cat FIGMA_INVENTORY.json | jq '.categorized.Footer'

# 2. Prüfe Figma-Namen
# Navbar: /nav(bar)?/i, /navigation/i, /menu/i
# Footer: /footer/i, /fußzeile/i

# 3. Stelle sicher, dass Komponenten im Figma existieren
# und erkennbare Namen haben
```

---

## 📚 Weitere Dokumentation

- [Figma-Only Scope](.cursor/FIGMA_ONLY_SCOPE.md) - Detaillierte Regeln
- [Batching Verification](.cursor/BATCHING_VERIFICATION.md) - Technische Details
- [README.md](.cursor/README.md) - Vollständige Übersicht

---

**Version:** 1.0  
**Erstellt:** 2025-10-16  
**Empfehlung:** Starte mit diesem Workflow!
