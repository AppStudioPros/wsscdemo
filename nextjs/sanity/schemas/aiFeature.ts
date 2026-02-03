import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aiFeature',
  title: 'AI Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Feature Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'demo',
      title: 'Demo Example',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'iconText',
      title: 'Icon Text',
      type: 'string',
      description: 'Simple icon representation (e.g., search, robot, chart)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'order',
    },
  },
});
