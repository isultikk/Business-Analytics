'use client';

import { useState, useMemo } from 'react';
import { analyzeProject } from '../utils/finance';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function Home() {
  const [rateInput, setRateInput] = useState<string>('10');
  
  const [flows, setFlows] = useState<string[]>(['-100000', '30000', '40000', '50000', '20000']);

  const handleFlowChange = (index: number, value: string) => {
    const newFlows = [...flows];
    newFlows[index] = value;
    setFlows(newFlows);
  };

  const addYear = () => setFlows([...flows, '0']);
  

  const removeYear = () => {
    if (flows.length > 1) {
      setFlows(flows.slice(0, -1));
    }
  };

  const results = useMemo(() => {
    const rate = parseFloat(rateInput) / 100;
    
    const numericFlows = flows.map(f => parseFloat(f) || 0);
    
    if (numericFlows.length === 0 || isNaN(rate)) return null;
    return analyzeProject(rate, numericFlows);
  }, [rateInput, flows]);

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Investment Analysis</h1>
          <p className="text-gray-500">Assessment of profitability and payback periods</p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          
          {/* Ставка */}
          <div className="w-1/3">
            <label className="block text-sm font-bold text-gray-700 mb-1">Discount rate (%)</label>
            <input 
              type="number" 
              value={rateInput}
              onChange={(e) => setRateInput(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <hr className="border-gray-100" />

          {/* Динамические поля денежных потоков */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-bold text-gray-700">Cash flows by year</label>
              <div className="flex gap-2">
                <button 
                  onClick={removeYear}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  - Delete Year
                </button>
                <button 
                  onClick={addYear}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  + Add Year
                </button>
              </div>
            </div>

            {/* Сетка инпутов */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {flows.map((flow, index) => (
                <div key={index}>
                  <label className="block text-xs text-gray-500 mb-1">
                    {index === 0 ? 'Start (Investment)' : `Year ${index}`}
                  </label>
                  <input 
                    type="number" 
                    value={flow}
                    onChange={(e) => handleFlowChange(index, e.target.value)}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${index === 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Карточки с результатами */}
        {results && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Net present value (NPV)</h3>
              <p className={`text-3xl font-bold ${results.npv >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {results.npv.toLocaleString('ru-RU')} ₸
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Profitability index (PI)</h3>
              <p className="text-3xl font-bold text-blue-600">
                {results.pi} <span className="text-lg font-normal text-gray-500">{results.pi > 1 ? '(The project is profitable)' : '(Unprofitable)'}</span>
              </p>
            </div>
          </div>
        )}

        {/* График */}
        {results && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
            <h3 className="text-lg font-bold mb-4">Payback schedule</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number | undefined) => value !== undefined ? `${value.toLocaleString('ru-RU')} ₸` : '0 ₸'} />
                <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="cumulative" stroke="#2563eb" strokeWidth={3} dot={{ r: 6 }} name="Накопленный итог" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        
      </div>
    </div>
  );
}