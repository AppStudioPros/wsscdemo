import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'comparison',
  title: 'Comparison Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currentChallenges',
      title: 'Current Challenges',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'solutions',
      title: 'Our Solutions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
