# Quick Reference - Figma zu Payload Workflow

## 🚀 Schnellstart (Ein Command)

```bash
cursor> Figma zu Payload - Master Workflow
```

Führt den kompletten Workflow automatisch aus (alle 7 Schritte).

---

## 📋 Workflow-Schritte (Einzeln)

### 1. Figma Check
```bash
cursor> Check Figma Design
```
→ Erfasst ALLE Komponenten, kategorisiert sie  
→ Output: `FIGMA_INVENTORY.json`, `FIGMA_COMPONENTS_CATEGORIZED.md`

### 2. Design Rework
```bash
cursor> Design Rework from Figma
```
→ Farben, Fonts, Tailwind anpassen  
→ Output: `globals.css`, `fonts.ts`, `tailwind.config.mjs`

### 3. Button Design
```bash
cursor> Style Buttons from Figma
```
→ Button-Komponente mit Figma-Styles  
→ Output: `src/components/ui/button.tsx`, `CMSLink` integriert

### 4. Navbar
```bash
cursor> Build Navbar from Figma
```
→ Mobile + Desktop als Global  
→ Output: `src/Header/DesktopNav/`, `MobileNav/`, `config.ts`

### 5. Footer
```bash
cursor> Build Footer from Figma
```
→ Mobile + Desktop als Global  
→ Output: `src/Footer/DesktopFooter/`, `MobileFooter/`, `config.ts`

### 6. Heroes
```bash
cursor> Generate Heroes from Figma
```
→ Mit conditional fields  
→ Output: `src/heros/Hero1/`, `Hero2/`, `config.ts`, `RenderHero.tsx`

### 7. Blocks
```bash
cursor> Generate Blocks from Figma
```
→ Verbleibende Komponenten (OHNE Navbar, Footer, Heroes)  
→ Output: `src/blocks/{Category}/{BlockName}/`

---

## 📊 Erwartete Zahlen

**Typisches Projekt: 40-80 Komponenten**

| Komponente | Anzahl | Ziel |
|------------|--------|------|
| Navbar | 1-2 | Globals |
| Footer | 1-2 | Globals |
| Heroes | 3-8 | /src/heroes/ |
| Blocks | 30-60 | /src/blocks/ |

**NICHT 1071!** Nur tatsächlich verwendete.

---

## ✅ Checkliste

Nach Workflow prüfen:

### Figma
- [ ] `FIGMA_INVENTORY.json` existiert
- [ ] Navbar in Kategorie "Navbar"
- [ ] Footer in Kategorie "Footer"
- [ ] Header in Kategorie "Hero"
- [ ] Alle anderen kategorisiert

### Design
- [ ] `globals.css` mit Figma-Farben
- [ ] Fonts importiert in `fonts.ts`
- [ ] `tailwind.config.mjs` aktualisiert
- [ ] Button-Komponente erstellt

### Navbar
- [ ] DesktopNav generiert
- [ ] MobileNav generiert
- [ ] Global Config erstellt
- [ ] In Payload registriert
- [ ] Im Admin-Panel sichtbar

### Footer
- [ ] DesktopFooter generiert
- [ ] MobileFooter generiert
- [ ] Global Config erstellt
- [ ] In Payload registriert
- [ ] Im Admin-Panel sichtbar

### Heroes
- [ ] Alle Header als Heroes
- [ ] Conditional Fields Config
- [ ] RenderHero.tsx
- [ ] In Pages Collection
- [ ] Felder ändern sich dynamisch

### Blocks
- [ ] Nur verbleibende Komponenten
- [ ] Keine Duplikate
- [ ] Zentrale index.ts
- [ ] Pages Collection aktualisiert
- [ ] PageRenderer aktualisiert

### Validierung
- [ ] `npm run type-check` ✅
- [ ] `npm run build` ✅
- [ ] `npm run dev` ✅
- [ ] Admin-Panel vollständig

---

## 🔍 Kategorisierung-Pattern

**Navbar:**
```regex
/nav(bar)?|navigation|menu/i
```

**Footer:**
```regex
/footer|fußzeile/i
```

**Hero:**
```regex
/header|hero|banner(?!s)/i
```
→ "Banner" (singular) = Hero  
→ "Banners" (plural) = Notification Banners (Blocks)

**Blocks:**
→ Alle anderen nach Kategorie (Layout, CTA, Contact, etc.)

---

## 💡 Wichtige Hinweise

### KEINE manuellen Ausschlüsse!
- ALLE Komponenten werden erfasst
- Kategorisierung über Pattern-Matching
- Navbar, Footer, Heroes werden NICHT als Blocks generiert

### Conditional Fields
- Heroes haben unterschiedliche Felder basierend auf Typ
- Implementiert über `admin.condition` in Payload
- Felder erscheinen/verschwinden dynamisch

### Mobile + Desktop getrennt
- Navbar: DesktopNav + MobileNav
- Footer: DesktopFooter + MobileFooter
- Responsive Breakpoints aus Figma

---

## 🐛 Häufige Probleme

### Navbar/Footer fehlen
→ Prüfe Komponenten-Namen in Figma  
→ Müssen Pattern matchen

### Heroes nicht erkannt
→ Prüfe Namen: "header", "hero", "banner"  
→ NICHT "banners" (plural)

### Zu viele Blocks
→ Falscher Command!  
→ NICHT "Generate ALL Relume Blocks"  
→ Verwende "Generate Blocks from Figma"

### Conditional Fields funktionieren nicht
→ Browser-Cache leeren  
→ Dev-Server neustarten  
→ Prüfe `src/heros/config.ts`

---

## 📚 Dokumentation

- [Workflow Overview](.cursor/WORKFLOW_OVERVIEW.md)
- [Master Command](.cursor/commands/figma-to-payload-master.mdc)
- [Einzelne Commands](.cursor/commands/)

---

**Quick Reference Version 3.0**  
**Stand: 2025-10-16**
