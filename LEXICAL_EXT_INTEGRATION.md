# PayloadCMS Lexical Extensions Integration Guide

## Overview
This document describes the integration of `payloadcms-lexical-ext` plugin into your Payload CMS template.

## Features Integrated

### 1. Color Features
- **Text Color** - Change text color with a color picker
- **Highlight Color** - Add background highlight to selected text
- **Block Background Color** - Add background color to entire paragraphs and headings

### 2. Embed Features
- **YouTube Embeds** - Embed YouTube videos
- **Vimeo Embeds** - Embed Vimeo videos

## Files Modified

### 1. `src/fields/defaultLexical.ts`
This file contains the default Lexical editor configuration used across all collections and fields.

**Changes made:**
- Imported all color and embed features from `payloadcms-lexical-ext`
- Added CSS import for the color picker UI: `import 'payloadcms-lexical-ext/client/client.css'`
- Added standard Lexical features (HeadingFeature, BlockquoteFeature, etc.) for a complete rich text experience
- Integrated all plugin features into the features array

**Features added:**
```typescript
TextColorFeature(),        // Text color picker
HighlightColorFeature(),   // Text highlight color
BgColorFeature(),          // Block background color
YoutubeFeature(),          // YouTube video embeds
VimeoFeature(),            // Vimeo video embeds
```

### 2. `src/components/RichText/index.tsx`
This component handles rendering of Lexical editor content on the frontend.

**Changes made:**
- Imported `JSXConverters` from `payloadcms-lexical-ext`
- Added the converters to the `jsxConverters` function to properly render:
  - Text with color styles
  - Text with highlight colors
  - Blocks with background colors
  - YouTube iframe embeds
  - Vimeo iframe embeds

## How to Use

### In the Admin Panel

#### Text Color
1. Select text in the editor
2. Click the text color icon (A with color) in the toolbar
3. Choose a color from the palette or use the color picker
4. The text color will be applied

#### Highlight Color
1. Select text in the editor
2. Click the highlight icon (marker) in the toolbar
3. Choose a highlight color
4. The background highlight will be applied to the text

#### Block Background Color
1. Place cursor in a paragraph or heading
2. Click the background color icon (paint bucket) in the toolbar
3. Choose a background color
4. The entire block will have the background color applied

#### Embed YouTube Video
1. Click the "+" (Add) dropdown in the toolbar
2. Select "YouTube"
3. Enter the YouTube video ID (e.g., for https://youtube.com/watch?v=dQw4w9WgXcQ, enter `dQw4w9WgXcQ`)
4. Click submit

#### Embed Vimeo Video
1. Click the "+" (Add) dropdown in the toolbar
2. Select "Vimeo"
3. Enter the Vimeo video ID (e.g., for https://vimeo.com/123456789, enter `123456789`)
4. Click submit

### On the Frontend

All features automatically render correctly because:
- JSX converters handle color styling with inline styles
- YouTube and Vimeo embeds render as responsive iframes with proper aspect ratios
- No additional configuration needed per collection or field

## Customization Options

### Custom Colors
You can customize the color palette by passing options to the color features:

```typescript
TextColorFeature({
  colors: [
    {
      type: 'button',
      label: 'Brand Primary',
      color: '#1155aa'
    },
    {
      type: 'button',
      label: 'Brand Secondary',
      color: '#ff5533'
    }
  ]
})
```

Apply the same to `HighlightColorFeature()` and `BgColorFeature()`.

### Different Features per Collection
If you need different features for specific collections, create separate editor configs:

```typescript
// src/fields/basicLexical.ts
export const basicLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      TextColorFeature(),
      // No embeds, simpler setup
    ]
  },
})

// Then in your collection:
export const MyCollection: CollectionConfig = {
  // ...
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: basicLexical, // Use custom config
    },
  ],
}
```

## Technical Details

### CSS Styling
The plugin includes its own CSS for the color picker UI, which is imported in `defaultLexical.ts`. The styles are scoped and won't conflict with your existing styles.

### JSX Converters
The converters transform the Lexical JSON structure into React components:

- **Text nodes**: Wrapped in `<span>` with inline styles for colors
- **Paragraph/Heading nodes**: Background colors applied via inline styles
- **YouTube embeds**: Rendered as `<iframe>` with 16:9 aspect ratio
- **Vimeo embeds**: Rendered as `<iframe>` with 16:9 aspect ratio

### Performance
- All features are loaded on-demand by Payload's dynamic imports
- No performance impact on frontend since converters are lightweight
- Embedded videos use privacy-enhanced URLs (YouTube uses youtube-nocookie.com)

## Troubleshooting

### Colors not showing in admin
- Ensure `import 'payloadcms-lexical-ext/client/client.css'` is present in `defaultLexical.ts`
- Clear your browser cache and rebuild: `pnpm build`

### Embeds not rendering on frontend
- Verify `JSXConverters` is imported and spread into `jsxConverters` in `RichText/index.tsx`
- Check browser console for errors

### Features not appearing in toolbar
- Make sure features are added to the `features` array in `defaultLexical.ts`
- Restart your dev server: `pnpm dev`

## Additional Resources

- [Plugin GitHub Repository](https://github.com/rubn-g/payloadcms-lexical-ext)
- [Payload Lexical Editor Docs](https://payloadcms.com/docs/rich-text/lexical)
- [Lexical Framework Docs](https://lexical.dev/)

## Migration Notes

If you have existing content:
- Existing content without these features will render normally
- No migration needed
- New features can be applied to existing content when editing

## Future Enhancements

Consider adding:
- Custom color palettes per brand guidelines
- Additional embed providers (Twitter, Instagram, etc.)
- Custom text formatting features
- Font size controls
