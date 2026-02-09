import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  ParagraphFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  BlockquoteFeature,
  AlignFeature,
  IndentFeature,
  HorizontalRuleFeature,
  SubscriptFeature,
  SuperscriptFeature,
  ChecklistFeature,
  BlocksFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'
import type { TextFieldSingleValidation } from 'payload'

/**
 * Standard RichText field configuration with full feature support
 *
 * Uses only Payload CMS standard Lexical features (no external extensions)
 * This ensures proper JSONB handling with Vercel Postgres
 * - Stores content as JSONB type in the database
 * - Handles serialization/deserialization automatically
 * - Supports all standard Lexical editor features out of the box
 *
 * @param options - Optional field configuration overrides
 * @returns Complete Field configuration for RichText
 *
 * @example
 * ```typescript
 * // In your collection config:
 * {
 *   ...createRichTextField(),
 *   name: 'content',
 * }
 * ```
 */
export const createRichTextField = (options?: any): any => ({
  name: 'richtext',
  type: 'richText',
  editor: lexicalEditor({
    features: () => {
      return [
        // Toolbars
        FixedToolbarFeature(),
        InlineToolbarFeature(),

        // Structure
        ParagraphFeature(),
        HeadingFeature({
          enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        }),

        // Text Formatting
        BoldFeature(),
        ItalicFeature(),
        UnderlineFeature(),
        StrikethroughFeature(),
        SubscriptFeature(),
        SuperscriptFeature(),

        // Lists & Blocks
        OrderedListFeature(),
        UnorderedListFeature(),
        ChecklistFeature(),
        BlockquoteFeature(),

        // Layout
        AlignFeature(),
        IndentFeature(),
        HorizontalRuleFeature(),

        // Links
        LinkFeature({
          enabledCollections: ['pages', 'posts'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field: any) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: (_data: any, siblingData: any) => siblingData?.linkType !== 'internal',
                },
                label: ({ t }: any) => t('fields:enterURL'),
                required: true,
                validate: ((value: any, options: any) => {
                  if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                    return true
                  }
                  return value ? true : 'URL is required'
                }) as TextFieldSingleValidation,
              },
            ]
          },
        }),

        // Blocks Feature (for embedding reusable content blocks)
        BlocksFeature({}),
      ]
    },
  }),
  ...options,
})

/**
 * Lightweight RichText field configuration for simple text editing
 * Use this when you don't need advanced features.
 *
 * Uses only Payload CMS standard Lexical features (no external extensions)
 *
 * @param options - Optional field configuration overrides
 * @returns Minimal but functional Field configuration for RichText
 */
export const createSimpleRichTextField = (options?: any): any => ({
  name: 'richtext',
  type: 'richText',
  editor: lexicalEditor({
    features: () => {
      return [
        // Toolbars
        FixedToolbarFeature(),
        InlineToolbarFeature(),

        // Structure
        ParagraphFeature(),
        HeadingFeature({
          enabledHeadingSizes: ['h2', 'h3', 'h4'],
        }),

        // Text Formatting
        BoldFeature(),
        ItalicFeature(),
        UnderlineFeature(),
        StrikethroughFeature(),

        // Lists & Blocks
        OrderedListFeature(),
        UnorderedListFeature(),
        BlockquoteFeature(),

        // Links
        LinkFeature({
          enabledCollections: ['pages', 'posts'],
        }),
      ]
    },
  }),
  ...options,
})
