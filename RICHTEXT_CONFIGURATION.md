# RichText Field Configuration Guide

## Overview

This guide explains how to properly configure RichText fields in Payload CMS when using Vercel Postgres. Proper configuration prevents type issues and ensures correct JSONB serialization.

## The Problem: RichText Type Issues with Vercel Postgres

When using Payload CMS with Vercel Postgres, RichText fields are stored as JSONB data types. If not properly configured, you may encounter:

- **Type mismatch errors** during schema migrations
- **Serialization issues** when data is retrieved from the database
- **Type generation problems** in `payload-types.ts`
- **Cross-project schema syncing failures**

## Why This Happens

Payload CMS uses Lexical editor for RichText. The Lexical editor outputs a specific JSON structure. When Vercel Postgres sees this, it:

1. Automatically detects it as JSON content
2. Stores it as JSONB (binary JSON) in PostgreSQL
3. Expects consistent structure and types across all RichText fields

Without explicit configuration, Payload might generate different type definitions for similar fields across projects.

## Solution: Standardized Field Configuration

### Using the Factory Function (Recommended)

Import and use the pre-configured RichText field factories:

```typescript
// In your collection config (e.g., src/collections/Pages.ts)
import { createRichTextField, createSimpleRichTextField } from '@/fields/richtext'

export const Pages = buildCollectionConfig({
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // Full-featured RichText with all standard features
    {
      ...createRichTextField(),
      name: 'content',
      label: 'Page Content',
      required: true,
    },
    // Simple RichText for basic editing
    {
      ...createSimpleRichTextField(),
      name: 'excerpt',
      label: 'Excerpt',
    },
  ],
})
```

### What The Factory Functions Do

#### `createRichTextField()`
Full-featured editor with all standard Payload CMS Lexical features:
- Text formatting (bold, italic, underline)
- Headings (h1-h6)
- Lists (ordered, unordered, checklists)
- Blockquotes
- Links (internal and external)
- Indentation and alignment
- Horizontal rules

**Use this for**: Main content, detailed descriptions, blog posts

#### `createSimpleRichTextField()`
Minimal editor with essential features:
- Text formatting (bold, italic, underline)
- Headings (h2-h4)
- Lists (ordered, unordered)
- Blockquotes
- Links

**Use this for**: Brief content, excerpts, summaries

## Customizing Fields

Both factory functions accept optional field configuration overrides:

```typescript
{
  ...createRichTextField({
    label: 'Custom Label',
    description: 'This is my custom description',
    required: false,
    admin: {
      condition: (data, siblingData) => siblingData?.showContent === true,
    },
  }),
  name: 'customContent',
}
```

## Type Safety

The factory functions ensure:

1. **Consistent JSONB Structure**: All RichText fields follow the same Lexical format
2. **Proper Type Generation**: `payload-types.ts` correctly identifies the field as RichText
3. **Cross-Project Compatibility**: New projects using this template will have matching type definitions
4. **Standard Features Only**: Uses only official Payload CMS Lexical features (no external dependencies)

## Migration Considerations

### Creating New RichText Fields

When adding a new RichText field to an existing collection:

1. Use the factory functions from `src/fields/richtext.ts`
2. Run `pnpm dev` - Payload will auto-generate the migration
3. Verify the migration in `src/migrations/`
4. Test in the admin UI before deploying

### Example Migration Scenario

```typescript
// Before: Problematic field definition
{
  name: 'description',
  type: 'richText',
  editor: lexicalEditor({
    features: () => [
      // Custom features...
    ]
  })
}

// After: Using factory function
{
  ...createRichTextField(),
  name: 'description',
  required: true,
}
```

### Updating Existing Collections

If you have existing RichText fields with custom configurations, consider refactoring them to use the factory functions:

```bash
# This ensures consistency without data loss
# Payload will recognize them as the same field type
```

## Best Practices

### 1. **Always Use Factory Functions**
- ✅ Use `createRichTextField()` or `createSimpleRichTextField()`
- ❌ Don't create inline lexicalEditor configurations

### 2. **Choose the Right Variant**
- Full-featured for main content areas
- Simple for brief text, summaries, excerpts

### 3. **Override Only When Necessary**
```typescript
// Good: Minimal override
{
  ...createRichTextField(),
  name: 'content',
  required: true,
}

// Avoid: Complete re-configuration
{
  ...createRichTextField(),
  name: 'content',
  editor: lexicalEditor({
    features: () => [/* different features */]
  })
}
```

### 4. **Document Custom Fields**
If you do need custom RichText configuration, add comments explaining why:

```typescript
{
  ...createRichTextField({
    // Note: Extended configuration for special use case
    // Reason: Needs custom feature set for internal documentation
  }),
  name: 'internalNotes',
}
```

### 5. **Testing**
After adding a new RichText field:
1. Run the app in dev mode
2. Create a test entry with RichText content
3. Verify the data appears correctly in the admin UI
4. Check that migrations run without errors

## Environment Setup

The factory functions work with your existing `src/fields/defaultLexical.ts` configuration. They use only standard Payload CMS Lexical features, so no additional environment variables or dependencies are needed.

## Troubleshooting

### Issue: "Type mismatch in RichText field"

**Solution**: Ensure you're using the factory functions from `src/fields/richtext.ts`

```typescript
// ✅ Correct
import { createRichTextField } from '@/fields/richtext'

{
  ...createRichTextField(),
  name: 'content',
}

// ❌ Wrong
{
  name: 'content',
  type: 'richText',
  editor: lexicalEditor({ /* ... */ })
}
```

### Issue: "JSONB type error during migration"

**Solution**: 
1. Check that all RichText fields use the factory functions
2. Delete conflicting migrations and regenerate
3. Run `pnpm dev` to auto-generate correct migrations

### Issue: "Inconsistent types between projects"

**Solution**:
1. Use this template for all new projects
2. Copy `src/fields/richtext.ts` to existing projects
3. Refactor existing RichText fields to use factory functions

### Issue: "External package not found errors"

**Solution**: The template now uses only official Payload CMS Lexical features. No external extensions are required. If you see errors about missing packages like `payloadcms-lexical-ext`, they should be removed from your project:

```bash
pnpm remove payloadcms-lexical-ext
```

## Version Compatibility

This guide applies to:
- Payload CMS v3+
- @payloadcms/richtext-lexical v1+
- Vercel Postgres adapter

## Additional Resources

- [Payload CMS RichText Documentation](https://payloadcms.com/docs/rich-text)
- [Lexical Editor Documentation](https://lexical.dev/)
- [Payload CMS Lexical Features](https://payloadcms.com/docs/lexical)
