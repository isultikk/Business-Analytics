export interface ForecastDataPoint {
  period: string;
  actual: number | null;
  trend: number;
}

export function calculateLinearRegression(data: number[], forecastPeriods: number): ForecastDataPoint[] {
  const n = data.length;
  if (n === 0) return [];

  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  
  // Вычисляем суммы для формулы наименьших квадратов
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += data[i];
    sumXY += i * data[i];
    sumXX += i * i;
  }

  // Рассчитываем коэффициенты (наклон линии и точку пересечения)
  const denominator = (n * sumXX - sumX * sumX);
  // Защита от деления на ноль, если введена только 1 точка
  const m = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
  const b = (sumY - m * sumX) / n;

  const chartData: ForecastDataPoint[] = [];

  // 1. Заполняем исторические данные и линию тренда для них
  for (let i = 0; i < n; i++) {
    chartData.push({
      period: `Мес ${i + 1}`,
      actual: data[i],
      trend: Number((m * i + b).toFixed(2))
    });
  }

  // 2. Строим прогноз на будущие периоды (actual будет null, рисуем только trend)
  for (let i = n; i < n + forecastPeriods; i++) {
    chartData.push({
      period: `Мес ${i + 1} (Прогноз)`,
      actual: null,
      trend: Number((m * i + b).toFixed(2))
    });
  }

  return chartData;
}