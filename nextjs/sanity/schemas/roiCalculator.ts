import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'roiCalculator',
  title: 'ROI Calculator',
  type: 'document',
  fields: [
    defineField({
      name: 'fields',
      title: 'Calculator Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Field Label',
              type: 'string',
            },
            {
              name: 'defaultValue',
              title: 'Default Value',
              type: 'number',
            },
            {
              name: 'fieldType',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Number', value: 'number' },
                  { title: 'Percentage', value: 'percentage' },
                  { title: 'Currency', value: 'currency' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'calculationFormula',
      title: 'Calculation Formula',
      type: 'text',
      rows: 3,
      description: 'Description of how the calculation works',
    }),
    defineField({
      name: 'resultsDisplay',
      title: 'Results Display',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Result Label',
              type: 'string',
            },
            {
              name: 'format',
              title: 'Format Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Currency', value: 'currency' },
                  { title: 'Percentage', value: 'percentage' },
                  { title: 'Number', value: 'number' },
                ],
              },
            },
          ],
        },
      ],
    }),
  ],
});
