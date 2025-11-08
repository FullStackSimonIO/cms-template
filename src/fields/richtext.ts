import { Field } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
  HeadingFeature,
  BlockquoteFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ChecklistFeature,
  IndentFeature,
  AlignFeature,
  HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'
import {
  BgColorFeature,
  TextColorFeature,
  HighlightColorFeature,
  YoutubeFeature,
  VimeoFeature,
} from 'payloadcms-lexical-ext'
import type { TextFieldSingleValidation } from 'payload'

/**
 * Standard RichText field configuration with full feature support
 * 
 * IMPORTANT: This configuration ensures proper JSONB handling with Vercel Postgres
 * - Stores content as JSONB type in the database
 * - Handles serialization/deserialization automatically
 * - Supports all Lexical editor features out of the box
 * 
 * @param options - Optional field configuration overrides
 * @returns Complete Field configuration for RichText
 * 
 * @example
 * ```typescript
 * // In your collection config:
 * {
 *   name: 'content',
 *   type: 'richText',
 *   editor: createRichTextField(),
 * }
 * ```
 */
export const createRichTextField = (options?: Partial<Field>): Field => ({
  name: 'richtext',
  type: 'richText',
  editor: lexicalEditor({
    features: () => {
      return [
        ParagraphFeature(),
        HeadingFeature({
          enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        }),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        BlockquoteFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        ChecklistFeature(),
        IndentFeature(),
        AlignFeature(),
        HorizontalRuleFeature(),
        LinkFeature({
          enabledCollections: ['pages', 'posts'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
                validate: ((value, options) => {
                  if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                    return true
                  }
                  return value ? true : 'URL is required'
                }) as TextFieldSingleValidation,
              },
            ]
          },
        }),
        TextColorFeature(),
        HighlightColorFeature(),
        BgColorFeature(),
        YoutubeFeature(),
        VimeoFeature(),
      ]
    },
  }),
  ...options,
})

/**
 * Lightweight RichText field configuration for simple text editing
 * Use this when you don't need advanced features like colors, videos, etc.
 * 
 * @param options - Optional field configuration overrides
 * @returns Minimal but functional Field configuration for RichText
 */
export const createSimpleRichTextField = (options?: Partial<Field>): Field => ({
  name: 'richtext',
  type: 'richText',
  editor: lexicalEditor({
    features: () => {
      return [
        ParagraphFeature(),
        HeadingFeature({
          enabledHeadingSizes: ['h2', 'h3', 'h4'],
        }),
        BoldFeature(),
        ItalicFeature(),
        UnderlineFeature(),
        BlockquoteFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        LinkFeature({
          enabledCollections: ['pages', 'posts'],
        }),
      ]
    },
  }),
  ...options,
})
