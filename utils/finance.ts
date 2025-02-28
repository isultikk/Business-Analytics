// utils/finance.ts

// Описываем тип данных для графика, чтобы TypeScript был спокоен
export interface ChartDataPoint {
  year: string;
  flow: number;
  cumulative: number;
}

export interface AnalysisResult {
  npv: number;
  pi: number;
  chartData: ChartDataPoint[];
}

export function analyzeProject(rate: number, cashFlows: number[]): AnalysisResult {
  let npv = 0;
  let cumulative = 0;
  const chartData: ChartDataPoint[] = [];

  for (let t = 0; t < cashFlows.length; t++) {
    npv += cashFlows[t] / Math.pow(1 + rate, t);
    cumulative += cashFlows[t];
    
    chartData.push({
      year: t === 0 ? 'Старт' : `Год ${t}`,
      flow: cashFlows[t],
      cumulative: Number(cumulative.toFixed(2))
    });
  }

  const initialInvestment = Math.abs(cashFlows[0]);
  const pi = initialInvestment !== 0 ? (npv + initialInvestment) / initialInvestment : 0;

  return {
    npv: Number(npv.toFixed(2)),
    pi: Number(pi.toFixed(2)),
    chartData
  };
}