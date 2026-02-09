import { CollectionConfig } from 'payload'
import { createRichTextField } from '@/fields/richtext'

const Messages: CollectionConfig = {
  slug: 'messages',
  labels: {
    singular: 'Nachricht',
    plural: 'Nachrichten',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Adjust according to your requirements
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    createRichTextField({
      name: 'message',
      label: 'Message',
      required: true,
    }),
    {
      name: 'acceptTerms',
      type: 'checkbox',
      required: true,
    },
  ],
}

export default Messages
