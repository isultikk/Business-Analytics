'use client';

import { useState, useMemo } from 'react';
import { calculateLinearRegression } from '../../utils/forecast';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function SalesPage() {
  // Исторические данные о продажах (по умолчанию 6 месяцев)
  const [sales, setSales] = useState<string[]>(['120000', '135000', '125000', '150000', '160000', '155000']);
  // На сколько месяцев вперед строим прогноз
  const [forecastPeriods, setForecastPeriods] = useState<string>('3');

  const handleSaleChange = (index: number, value: string) => {
    const newSales = [...sales];
    newSales[index] = value;
    setSales(newSales);
  };

  const addMonth = () => setSales([...sales, '0']);
  const removeMonth = () => {
    if (sales.length > 2) setSales(sales.slice(0, -1)); // Оставляем минимум 2 точки для линии
  };

  // Пересчет данных при любом изменении
  const chartData = useMemo(() => {
    const numericSales = sales.map(s => parseFloat(s) || 0);
    const periods = parseInt(forecastPeriods) || 0;
    return calculateLinearRegression(numericSales, periods);
  }, [sales, forecastPeriods]);

  // Расчет метрик для карточек
  const metrics = useMemo(() => {
    if (chartData.length === 0) return null;
    const lastHistoryIndex = sales.length - 1;
    const lastHistoryActual = parseFloat(sales[lastHistoryIndex]) || 0;
    const finalForecast = chartData[chartData.length - 1].trend;
    
    // Прогнозируемый рост в процентах
    const growth = lastHistoryActual > 0 
      ? ((finalForecast - lastHistoryActual) / lastHistoryActual) * 100 
      : 0;

    return { finalForecast, growth };
  }, [chartData, sales]);

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Sales forecast</h1>
          <p className="text-gray-500">Plotting a trend line using the least squares method</p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          
          <div className="w-1/3">
            <label className="block text-sm font-bold text-gray-700 mb-1">Forecast horizon (months)</label>
            <input 
              type="number" 
              value={forecastPeriods}
              onChange={(e) => setForecastPeriods(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              min="1"
            />
          </div>

          <hr className="border-gray-100" />

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-bold text-gray-700">Исторические продажи (Факт)</label>
              <div className="flex gap-2">
                <button 
                  onClick={removeMonth}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  - Delete Month
                </button>
                <button 
                  onClick={addMonth}
                  className="px-3 py-1 bg-purple-50 text-purple-600 rounded hover:bg-purple-100 transition-colors text-sm font-medium"
                >
                  + Add Month
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sales.map((sale, index) => (
                <div key={index}>
                  <label className="block text-xs text-gray-500 mb-1">Month {index + 1}</label>
                  <input 
                    type="number" 
                    value={sale}
                    onChange={(e) => handleSaleChange(index, e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-purple-50 border-purple-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Карточки метрик */}
        {metrics && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Target at the end of the forecast</h3>
              <p className="text-3xl font-bold text-gray-900">
                {metrics.finalForecast.toLocaleString('ru-RU')} ₸
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Expected dynamics</h3>
              <p className={`text-3xl font-bold ${metrics.growth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {metrics.growth > 0 ? '+' : ''}{metrics.growth.toFixed(1)}%
              </p>
            </div>
          </div>
        )}

        {/* График */}
        {chartData.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
            <h3 className="text-lg font-bold mb-4">Actual sales chart and trend lines</h3>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value: any) => typeof value === 'number' ? `${value.toLocaleString('ru-RU')} ₸` : 'No data'} />
                <Legend />
                {/* Факт отображаем столбиками */}
                <Bar dataKey="actual" name="Actual sales" fill="#a855f7" radius={[4, 4, 0, 0]} />
                {/* Тренд отображаем линией */}
                <Line type="monotone" dataKey="trend" name="Trend Line (Forecast)" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
        
      </div>
    </div>
  );
}