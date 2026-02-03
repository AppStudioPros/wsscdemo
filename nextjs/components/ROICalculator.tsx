'use client';

import { useState } from 'react';

interface ROIField {
  label: string;
  defaultValue: number;
  fieldType: string;
}

interface ROICalculatorProps {
  fields?: ROIField[];
}

export function ROICalculator({ fields }: ROICalculatorProps) {
  const defaultFields: ROIField[] = [
    { label: 'Monthly Call Volume', defaultValue: 50000, fieldType: 'number' },
    { label: 'Average Handle Time (minutes)', defaultValue: 8, fieldType: 'number' },
    { label: 'Cost per Call ($)', defaultValue: 12, fieldType: 'currency' },
    { label: 'AI Deflection Rate (%)', defaultValue: 30, fieldType: 'percentage' },
  ];

  const calculatorFields = fields || defaultFields;
  const [values, setValues] = useState<Record<string, number>>(
    calculatorFields.reduce((acc, field) => ({ ...acc, [field.label]: field.defaultValue }), {})
  );

  const handleChange = (label: string, value: number) => {
    setValues((prev) => ({ ...prev, [label]: value }));
  };

  const calculateSavings = () => {
    const volume = values['Monthly Call Volume'] || 0;
    const cost = values['Cost per Call ($)'] || 0;
    const deflectionRate = (values['AI Deflection Rate (%)'] || 0) / 100;

    const callsDeflected = volume * deflectionRate;
    const monthlySavings = callsDeflected * cost;
    const annualSavings = monthlySavings * 12;

    return {
      callsDeflected: Math.round(callsDeflected),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
    };
  };

  const savings = calculateSavings();

  return (
    <section id="roi-calculator" className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">ROI Calculator</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            See the potential cost savings from implementing AI-powered customer service.
          </p>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Inputs</h3>
              <div className="space-y-6">
                {calculatorFields.map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={values[field.label]}
                      onChange={(e) => handleChange(field.label, Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Estimated Savings</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-blue-100 mb-1">Calls Deflected Monthly</p>
                  <p className="text-3xl font-bold">{savings.callsDeflected.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-100 mb-1">Monthly Savings</p>
                  <p className="text-3xl font-bold">${savings.monthlySavings.toLocaleString()}</p>
                </div>
                <div className="pt-4 border-t border-blue-400">
                  <p className="text-sm text-blue-100 mb-1">Annual Savings</p>
                  <p className="text-5xl font-bold">${savings.annualSavings.toLocaleString()}</p>
                </div>
              </div>
              <p className="mt-6 text-sm text-blue-100">
                Based on AI deflecting {values['AI Deflection Rate (%)']}% of routine calls at $
                {values['Cost per Call ($)']} per call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
