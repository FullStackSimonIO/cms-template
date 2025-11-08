/**
 * Example: How to use RichText field factory functions in a collection
 * 
 * This example demonstrates the recommended way to add RichText fields
 * to your Payload collections to avoid JSONB type issues.
 */

import { CollectionConfig } from 'payload'
import { createRichTextField, createSimpleRichTextField } from '@/fields/richtext'

/**
 * BEFORE (Not recommended - can cause type issues):
 * 
 * {
 *   name: 'content',
 *   type: 'richText',
 *   editor: lexicalEditor({
 *     features: () => [ /* ... */]
 *   })
 * }
 * 
 * AFTER (Recommended - ensures consistency):
 * 
 * {
 *   ...createRichTextField(),
 *   name: 'content',
 * }
 */

export const ExampleCollectionWithRichText: CollectionConfig = {
  slug: 'example-collection',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    
    // Full-featured RichText field - Use this for main content
    {
      ...createRichTextField(),
      name: 'content',
      label: 'Page Content',
      required: true,
      description: 'Main content with full editing capabilities',
    },
    
    // Simple RichText field - Use this for brief content
    {
      ...createSimpleRichTextField(),
      name: 'excerpt',
      label: 'Summary',
      description: 'Brief summary without advanced features',
    },
    
    // Customized RichText field with conditional logic
    {
      ...createRichTextField({
        admin: {
          condition: (data, siblingData) => siblingData?.hasDetailedDescription === true,
        },
      }),
      name: 'detailedDescription',
      label: 'Detailed Description',
      description: 'Only shown if "hasDetailedDescription" is enabled',
    },
  ],
}
