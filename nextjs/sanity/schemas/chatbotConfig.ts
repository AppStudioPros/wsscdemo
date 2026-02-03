import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'chatbotConfig',
  title: 'Chatbot Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'quickQuestions',
      title: 'Quick Questions',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Pre-defined questions users can click',
    }),
    defineField({
      name: 'enabled',
      title: 'Chatbot Enabled',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
