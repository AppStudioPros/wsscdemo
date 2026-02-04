'use client';

// ROI Calculator with blue gradient background - v2
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
    // Call Deflection: 30% reduction
    const callDeflectionSavings = values.monthlyCallVolume * 12 * values.avgCostPerCall * 0.30;
    
    // Paper Bill Reduction: 25% shift to e-bill
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
    <section id="roi" className="py-20 bg-gradient-to-r from-slate-800 via-slate-700 to-blue-600">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Calculate Your ROI</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            See how AI-powered self-service saves money and improves customer satisfaction.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Projected Annual Savings</h3>
          
          {/* Input Fields - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Call Center Volume
              </label>
              <input
                type="number"
                value={values.monthlyCallVolume}
                onChange={(e) => handleChange('monthlyCallVolume', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Cost per Call ($)
              </label>
              <input
                type="number"
                value={values.avgCostPerCall}
                onChange={(e) => handleChange('avgCostPerCall', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Paper Bill Volume
              </label>
              <input
                type="number"
                value={values.annualPaperBillVolume}
                onChange={(e) => handleChange('annualPaperBillVolume', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost per Paper Bill ($)
              </label>
              <input
                type="number"
                value={values.costPerPaperBill}
                onChange={(e) => handleChange('costPerPaperBill', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="border-l-4 border-teal-500 bg-gray-50 rounded-r-lg p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Call Deflection (30% reduction):</span>
                <span className="text-green-600 font-bold text-xl">${savings.callDeflection.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Paper Bill Reduction (25% shift to e-bill):</span>
                <span className="text-green-600 font-bold text-xl">${savings.paperBillReduction.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-gray-900 font-bold text-lg">Total Year 1 Savings:</span>
                <span className="text-green-600 font-bold text-3xl">${savings.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
