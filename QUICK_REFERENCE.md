# Quick Reference: Using PayloadCMS Lexical Extensions

## 🎨 Text Color
**Icon:** A with color bar
**How to use:**
1. Select text
2. Click text color icon in toolbar
3. Pick from palette or use custom color picker
4. Color applies to selected text

**Result:** `<span style="color: #ff0000">Colored text</span>`

---

## ✏️ Highlight Color
**Icon:** Highlighter marker
**How to use:**
1. Select text
2. Click highlight icon in toolbar
3. Choose highlight color
4. Background color applies to text

**Result:** `<span style="background-color: #ffff00">Highlighted text</span>`

---

## 🎨 Block Background Color
**Icon:** Paint bucket
**How to use:**
1. Place cursor in paragraph or heading
2. Click background color icon in toolbar
3. Select background color
4. Entire block gets background

**Result:** `<p style="background-color: #f0f0f0">Paragraph with background</p>`

---

## 📺 YouTube Embed
**Icon:** YouTube logo in Add dropdown
**How to use:**
1. Click "+" or "Add" in toolbar
2. Select "YouTube"
3. Enter video ID (from URL)
   - URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - ID: `dQw4w9WgXcQ`
4. Submit

**Result:** Responsive 16:9 YouTube iframe

---

## 🎬 Vimeo Embed
**Icon:** Vimeo logo in Add dropdown
**How to use:**
1. Click "+" or "Add" in toolbar
2. Select "Vimeo"
3. Enter video ID (from URL)
   - URL: `https://vimeo.com/123456789`
   - ID: `123456789`
4. Submit

**Result:** Responsive 16:9 Vimeo iframe

---

## 💡 Tips

### Getting Video IDs
- **YouTube:** After `watch?v=` in the URL
  - `youtube.com/watch?v=abc123` → ID is `abc123`
- **Vimeo:** The number after `vimeo.com/`
  - `vimeo.com/987654321` → ID is `987654321`

### Color Best Practices
- Use brand colors consistently
- Ensure sufficient contrast for accessibility
- Test in both light and dark modes
- Don't overuse - color should enhance, not distract

### Embed Best Practices
- Videos are automatically responsive
- Use privacy-enhanced embeds (YouTube uses nocookie domain)
- Consider page load performance with multiple embeds
- Test on mobile devices

---

## 🔧 All Available Toolbar Features

After integration, your editor includes:

### Text Formatting
- Bold
- Italic
- Underline
- Text Color 🆕
- Highlight Color 🆕

### Structure
- Headings (H1-H6)
- Paragraph
- Blockquote
- Horizontal Rule

### Lists
- Ordered List
- Unordered List
- Checklist

### Alignment & Indentation
- Left Align
- Center Align
- Right Align
- Justify
- Indent/Outdent

### Special Features
- Links (internal & external)
- Block Background Color 🆕
- YouTube Embeds 🆕
- Vimeo Embeds 🆕

---

## 🚀 Need More?

Check `LEXICAL_EXT_INTEGRATION.md` for:
- Customization options
- Troubleshooting
- Advanced configurations
- Technical details
