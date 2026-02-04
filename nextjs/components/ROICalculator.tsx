'use client';

import { useState } from 'react';

interface ROICalculatorProps {
  fields?: any[];
}

export function ROICalculator({ fields }: ROICalculatorProps) {
  const [values, setValues] = useState({
    monthlyCallVolume: 50000,
    avgCostPerCall: 12,
    annualPaperBillVolume: 900000,
    costPerPaperBill: 1,
  });

  const handleChange = (field: string, value: number) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const calculateSavings = () => {
    const callDeflectionSavings = values.monthlyCallVolume * 12 * values.avgCostPerCall * 0.30;
    const paperBillSavings = values.annualPaperBillVolume * values.costPerPaperBill * 0.25;
    const totalSavings = callDeflectionSavings + paperBillSavings;

    return {
      callDeflection: Math.round(callDeflectionSavings),
      paperBillReduction: Math.round(paperBillSavings),
      total: Math.round(totalSavings),
    };
  };

  const savings = calculateSavings();

  return (
    <section
      id="roi"
      className="py-20"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#ffffff' }}
          >
            Calculate Your ROI
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            See how AI-powered self-service saves money and improves customer satisfaction.
          </p>
        </div>
        <div
          className="max-w-2xl mx-auto rounded-2xl p-8"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <h3
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: '#1f2937' }}
          >
            Projected Annual Savings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: '#374151' }}
              >
                Monthly Call Center Volume:
              </label>
              <input
                type="number"
                value={values.monthlyCallVolume}
                onChange={(e) => handleChange('monthlyCallVolume', Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  border: '1px solid #d1d5db',
                  color: '#1f2937',
                  backgroundColor: '#ffffff',
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: '#374151' }}
              >
                Average Cost per Call ($):
              </label>
              <input
                type="number"
                value={values.avgCostPerCall}
                onChange={(e) => handleChange('avgCostPerCall', Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  border: '1px solid #d1d5db',
                  color: '#1f2937',
                  backgroundColor: '#ffffff',
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: '#374151' }}
              >
                Annual Paper Bill Volume:
              </label>
              <input
                type="number"
                value={values.annualPaperBillVolume}
                onChange={(e) => handleChange('annualPaperBillVolume', Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  border: '1px solid #d1d5db',
                  color: '#1f2937',
                  backgroundColor: '#ffffff',
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: '#374151' }}
              >
                Cost per Paper Bill ($):
              </label>
              <input
                type="number"
                value={values.costPerPaperBill}
                onChange={(e) => handleChange('costPerPaperBill', Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  border: '1px solid #d1d5db',
                  color: '#1f2937',
                  backgroundColor: '#ffffff',
                }}
              />
            </div>
          </div>

          <div
            className="rounded-lg p-6"
            style={{
              borderLeft: '4px solid #14b8a6',
              backgroundColor: '#f9fafb',
            }}
          >
            <h4
              className="text-lg font-semibold mb-4"
              style={{ color: '#1f2937' }}
            >
              Estimated Annual Savings
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span style={{ color: '#4b5563' }}>Call Deflection (30% reduction):</span>
                <span
                  className="font-bold text-xl"
                  style={{ color: '#059669' }}
                >
                  ${savings.callDeflection.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#4b5563' }}>Paper Bill Reduction (25% shift to e-bill):</span>
                <span
                  className="font-bold text-xl"
                  style={{ color: '#059669' }}
                >
                  ${savings.paperBillReduction.toLocaleString()}
                </span>
              </div>
              <div
                className="flex justify-between items-center pt-4"
                style={{ borderTop: '1px solid #e5e7eb' }}
              >
                <span
                  className="font-bold text-lg"
                  style={{ color: '#1f2937' }}
                >
                  Total Year 1 Savings:
                </span>
                <span
                  className="font-bold text-3xl"
                  style={{ color: '#059669' }}
                >
                  ${savings.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
