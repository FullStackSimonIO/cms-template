import type { Field } from 'payload'

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
} from '@payloadcms/richtext-lexical'

import {
  TextColorFeature,
  HighlightColorFeature,
  BgColorFeature,
  YoutubeFeature,
  VimeoFeature,
} from 'payloadcms-lexical-ext'

import type { TextFieldSingleValidation } from 'payload'
import type { LinkFields } from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { PostHero } from './PostHero'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Hero Auswahl',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Post Hero',
          value: 'postHero',
        },
        {
          label: 'Hero Header 1',
          value: 'heroheader1',
        },
        /* PLOP_HERO_TYPE_OPTIONS */
      ],
      required: true,
    },
    // * Basis-Felder (für alle Heroes)
    {
      name: 'title',
      type: 'text',
      label: 'Überschrift',
      admin: {
        description: 'Die Hauptüberschrift des Hero-Bereichs',
      },
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      label: 'Fließtext',
      admin: {
        description: 'Beschreibungstext unter der Überschrift',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            ParagraphFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            StrikethroughFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),
            OrderedListFeature(),
            UnorderedListFeature(),
            ChecklistFeature(),
            BlockquoteFeature(),
            IndentFeature(),
            AlignFeature(),
            HorizontalRuleFeature(),
            TextColorFeature(),
            HighlightColorFeature(),
            BlocksFeature({}),
            BgColorFeature(),
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
            YoutubeFeature(),
            VimeoFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    linkGroup({
      overrides: {
        label: 'Call-to-Action Buttons',
        maxRows: 2,
      },
    }),
    // * PostHero Conditional Fields
    {
      name: 'media',
      label: 'Hero Section Medien',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'postHero',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // * HeroHeader1 Conditional Fields
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Bild',
      required: true,
      admin: {
        description: 'Das Hauptbild für den Hero-Bereich',
        condition: (_, { type } = {}) => type === 'heroheader1',
      },
    },
    /* PLOP_HERO_FIELDS */
  ],
  label: 'Hero Section',
}
