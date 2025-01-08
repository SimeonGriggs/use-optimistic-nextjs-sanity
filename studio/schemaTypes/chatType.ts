import {defineField, defineType} from 'sanity'

export const chatType = defineType({
  name: 'chat',
  title: 'Chat',
  type: 'document',
  liveEdit: true,
  preview: {
    select: {
      title: '_id',
    },
  },
  fields: [
    defineField({
      name: 'messages',
      type: 'array',
      of: [
        defineField({
          name: 'message',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
