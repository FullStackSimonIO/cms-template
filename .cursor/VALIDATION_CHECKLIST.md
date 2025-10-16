# ✅ Validierungs-Checkliste: Figma → PayloadCMS

## 🎯 Vor der Block-Generierung

### 1. Figma MCP Verbindung

```bash
# Test Connection
cursor> Test Figma MCP Connection

# Erwartete Ausgabe:
✅ Figma MCP Server verbunden
✅ File Key: [dein-file-key]
✅ Access Token: ✓
```

**Checkliste:**
- [ ] MCP Server läuft
- [ ] `FIGMA_FILE_KEY` in `.env.local` gesetzt
- [ ] `FIGMA_ACCESS_TOKEN` in `.env.local` gesetzt
- [ ] Figma-File ist erreichbar

---

### 2. Projektstruktur vorhanden

```bash
# Prüfe kritische Verzeichnisse
ls -d src/blocks
ls -d src/collections/Pages
ls -d src/components/RichText
ls -d src/components/Media
ls -d src/components/CMSLink
```

**Checkliste:**
- [ ] `src/blocks/` existiert
- [ ] `src/collections/Pages/config.ts` existiert
- [ ] `src/components/RichText/` existiert
- [ ] `src/components/Media/` existiert
- [ ] `src/components/CMSLink/` existiert

---

### 3. TypeScript funktioniert

```bash
npm run type-check
```

**Erwartung:** Keine Fehler

**Checkliste:**
- [ ] TypeScript Compilation erfolgreich
- [ ] Keine Type-Errors
- [ ] `payload-types.ts` ist aktuell

---

## 🔍 Nach Figma-Scan

### 1. Inventar wurde erstellt

```bash
# Prüfe Datei
ls -la FIGMA_INVENTORY.json
ls -la FIGMA_INVENTORY.md
```

**Checkliste:**
- [ ] `FIGMA_INVENTORY.json` existiert
- [ ] `FIGMA_INVENTORY.md` existiert (lesbare Übersicht)
- [ ] Dateien sind nicht leer

---

### 2. Inventar-Inhalte validieren

```bash
# Prüfe Anzahl der Komponenten
cat FIGMA_INVENTORY.json | jq '.meta.componentsToGenerate'

# Sollte zeigen: 30-80 (nicht 1071!)
```

**Checkliste:**
- [ ] Komponenten-Anzahl realistisch (30-80)
- [ ] **NICHT** 1071 oder 1243
- [ ] Heroes sind enthalten
- [ ] Navbar ist enthalten
- [ ] Footer ist enthalten

```bash
# Prüfe Kategorien
cat FIGMA_INVENTORY.json | jq '.statistics.byType'

# Erwartete Ausgabe:
# [
#   { "type": "Hero", "count": 3 },
#   { "type": "Navbar", "count": 1 },
#   { "type": "Footer", "count": 1 },
#   { "type": "Layout", "count": 15 },
#   ...
# ]
```

**Checkliste:**
- [ ] Kategorien machen Sinn
- [ ] Heroes haben Anzahl > 0
- [ ] Navbar hat Anzahl > 0
- [ ] Footer hat Anzahl > 0
- [ ] Keine "Uncategorized" mit vielen Komponenten

---

### 3. Relume-Mapping prüfen

```bash
# Prüfe Mapping-Erfolg
cat FIGMA_INVENTORY.json | jq '.relumeMapping | length'
cat FIGMA_INVENTORY.json | jq '.unmappedComponents | length'

# Erwartung:
# relumeMapping: 30-80
# unmappedComponents: 0-10 (je weniger, desto besser)
```

**Checkliste:**
- [ ] Meiste Komponenten automatisch gemappt
- [ ] Unmapped Components < 20%
- [ ] Mapping macht Sinn (Figma → Relume Namen passen)

---

## 🔨 Nach Block-Generierung

### 1. Blocks wurden erstellt

```bash
# Anzahl generierter Blocks
ls -d src/blocks/*/* | wc -l

# Sollte zeigen: 30-80 (nicht 1071!)
```

**Checkliste:**
- [ ] Anzahl stimmt mit `FIGMA_INVENTORY.json` überein
- [ ] Heroes wurden generiert
- [ ] Navbar wurde generiert
- [ ] Footer wurde generiert

---

### 2. Block-Struktur korrekt

```bash
# Prüfe exemplarische Blocks
ls -la src/blocks/Hero/Hero1/
ls -la src/blocks/Navbar/Navbar1/
ls -la src/blocks/Footer/Footer1/

# Jeder Block sollte haben:
# - Component.tsx
# - config.ts
# - index.ts
```

**Checkliste:**
- [ ] Jeder Block hat 3 Dateien (Component.tsx, config.ts, index.ts)
- [ ] Zentrale `src/blocks/index.ts` existiert
- [ ] Alle Blocks werden exportiert

---

### 3. Registrierung erfolgreich

```bash
# Prüfe Pages Collection
grep -c "Block" src/collections/Pages/config.ts

# Sollte zeigen: ~40 (Anzahl der Blocks)
```

**Checkliste:**
- [ ] Pages Collection wurde aktualisiert
- [ ] Alle Blocks sind registriert
- [ ] Deutsche Labels vorhanden
- [ ] Gruppierung nach Kategorien

```bash
# Prüfe PageRenderer
grep -c "blockComponents" src/components/PageRenderer/index.tsx

# Sollte Mapping für alle Blocks haben
```

**Checkliste:**
- [ ] PageRenderer wurde aktualisiert
- [ ] Alle Blocks sind gemappt
- [ ] Keine fehlenden Imports

---

### 4. TypeScript validieren

```bash
npm run type-check
```

**Erwartung:** Keine Fehler

**Checkliste:**
- [ ] Keine Type-Errors
- [ ] Alle Imports korrekt
- [ ] Payload-Types aktuell

---

### 5. Build-Test

```bash
npm run build
```

**Erwartung:** Erfolgreicher Build

**Checkliste:**
- [ ] Build ohne Fehler
- [ ] Bundle-Größe akzeptabel (< 5 MB)
- [ ] Keine Warnings zu Blocks

---

## 🎨 Admin-Panel Validierung

### 1. Dev-Server starten

```bash
npm run dev

# Öffne: http://localhost:3000/admin
```

---

### 2. Pages Collection prüfen

**Navigation:**
1. Gehe zu "Pages" (Seiten)
2. Klicke "Create New" (Neue erstellen)
3. Scrolle zu "Layout" (Seitenaufbau)
4. Klicke "Add Block" (Block hinzufügen)

**Checkliste:**
- [ ] Blocks-Menü öffnet sich
- [ ] ~40 Blocks sichtbar (nicht 1071!)
- [ ] Gruppierung nach Kategorien funktioniert
- [ ] Deutsche Labels korrekt
- [ ] Heroes sind vorhanden
- [ ] Navbar ist vorhanden
- [ ] Footer ist vorhanden
- [ ] Suche funktioniert
- [ ] Keine Duplikate

---

### 3. Block-Auswahl testen

**Teste verschiedene Kategorien:**
- [ ] Hero-Block hinzufügen → Felder erscheinen
- [ ] Navbar-Block hinzufügen → Felder erscheinen
- [ ] Footer-Block hinzufügen → Felder erscheinen
- [ ] Layout-Block hinzufügen → Felder erscheinen
- [ ] CTA-Block hinzufügen → Felder erscheinen

**Checkliste pro Block:**
- [ ] Alle Felder vorhanden (title, description, etc.)
- [ ] Deutsche Labels
- [ ] Felder funktionieren
- [ ] Validierung funktioniert
- [ ] Media-Upload funktioniert

---

## 🌐 Frontend-Validierung

### 1. Test-Page erstellen

**Im Admin:**
1. Erstelle neue Page: `/test`
2. Füge verschiedene Blocks hinzu:
   - Hero-Block
   - Layout-Block
   - CTA-Block
   - Footer-Block
3. Fülle mit Dummy-Content
4. Speichern

---

### 2. Frontend prüfen

```bash
# Öffne: http://localhost:3000/test
```

**Checkliste:**
- [ ] Seite lädt ohne Fehler
- [ ] Alle Blocks werden gerendert
- [ ] Styling korrekt (Tailwind)
- [ ] Responsive auf Mobile
- [ ] Bilder werden geladen
- [ ] Links funktionieren
- [ ] Keine Console-Errors

---

## 📊 Abschluss-Validierung

### Zusammenfassung prüfen

```bash
# Generierungs-Report
cat BLOCKS_GENERATION_REPORT.md

# Sollte zeigen:
# - Anzahl: 30-80 Blocks
# - Kategorien: ~10 Kategorien
# - Erfolgsrate: 100% oder nahe 100%
```

**Finale Checkliste:**
- [ ] Richtige Anzahl Blocks (30-80, nicht 1071)
- [ ] Heroes inkludiert
- [ ] Navbar inkludiert
- [ ] Footer inkludiert
- [ ] TypeScript ohne Fehler
- [ ] Build erfolgreich
- [ ] Admin-Panel funktioniert
- [ ] Frontend rendert korrekt
- [ ] Performance akzeptabel
- [ ] Keine unnötigen Blocks

---

## ⚠️ Red Flags

### Folgendes deutet auf Probleme hin:

❌ **Zu viele Blocks:**
```bash
ls -d src/blocks/*/* | wc -l
# Zeigt: 1071  ← FALSCH!
```
**Problem:** Falscher Command verwendet
**Lösung:** Verwende "Generate Blocks from Figma Inventory"

---

❌ **Heroes fehlen:**
```bash
ls -d src/blocks/Hero/* 2>/dev/null | wc -l
# Zeigt: 0  ← FALSCH!
```
**Problem:** Heroes wurden ausgeschlossen
**Lösung:** Prüfe `FIGMA_INVENTORY.json` und Pattern-Matching

---

❌ **Navbar/Footer fehlen:**
```bash
ls -d src/blocks/Navbar/* 2>/dev/null | wc -l
ls -d src/blocks/Footer/* 2>/dev/null | wc -l
# Zeigt: 0  ← FALSCH!
```
**Problem:** Komponenten nicht erkannt oder ausgeschlossen
**Lösung:** Prüfe Figma-Namen und Kategorisierung

---

❌ **Build schlägt fehl:**
```bash
npm run build
# Zeigt Fehler
```
**Problem:** TypeScript-Fehler oder fehlende Imports
**Lösung:** Prüfe `npm run type-check` und fixe Errors

---

❌ **Admin-Panel zeigt zu viele Blocks:**
```
Admin → Pages → Add Block
Block-Liste: 1071 Einträge  ← FALSCH!
```
**Problem:** Pages Collection hat alle Relume-Blocks registriert
**Lösung:** Regeneriere mit korrektem Command

---

## ✅ Erfolgs-Kriterien

### Alles ist korrekt, wenn:

1. ✅ **30-80 Blocks** generiert (nicht 1071)
2. ✅ **Heroes vorhanden** (3-8 Blocks)
3. ✅ **Navbar vorhanden** (1-2 Blocks)
4. ✅ **Footer vorhanden** (1-2 Blocks)
5. ✅ **TypeScript ohne Fehler**
6. ✅ **Build erfolgreich**
7. ✅ **Admin-Panel übersichtlich** (~40 Blocks)
8. ✅ **Frontend rendert** alle Blocks korrekt
9. ✅ **Performance gut** (Build < 5 Min, Bundle < 5 MB)
10. ✅ **Dokumentation vollständig** (Inventar, Report)

---

## 🎉 Abschluss

Wenn alle Checkboxen ✅ sind:

```
🎉 ERFOLG! Block-System perfekt konfiguriert!

📊 Zusammenfassung:
   ✅ Figma-Scan funktioniert
   ✅ Nur verwendete Komponenten generiert
   ✅ Heroes, Navbar, Footer inkludiert
   ✅ TypeScript valide
   ✅ Build erfolgreich
   ✅ Admin-Panel funktional
   ✅ Frontend rendert korrekt

🚀 Bereit für Content-Erstellung!
```

---

**Version:** 1.0  
**Erstellt:** 2025-10-16  
**Verwendung:** Nach jeder Block-Generierung durchgehen
