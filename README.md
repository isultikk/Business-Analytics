# Business Analytics Dashboard

A real-time financial analysis web application built with Next.js. It replaces manual spreadsheet workflows with an interactive dashboard that instantly recalculates results as you type.

## Features

### NPV Analysis (`/`)
- Input an initial investment and cash flows for each year
- Calculates **Net Present Value (NPV)** and **Profitability Index (PI)**
- Displays a payback schedule chart showing cumulative cash flow over time
- Color-coded result cards — green for profitable, red for unprofitable projects
- Add or remove years dynamically

### Sales Forecast (`/sales`)
- Input historical monthly sales figures
- Uses **Ordinary Least Squares (OLS) linear regression** to project future sales
- Set a custom forecast horizon (number of months ahead)
- Combined bar + trend line chart showing actual vs. forecasted values
- Cards showing the projected end-of-forecast value and expected growth rate

## Tech Stack

| Tool | Version |
|---|---|
| Next.js | 16 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Recharts | 3 |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── layout.tsx        # Root layout with navigation bar
├── page.tsx          # NPV Analysis page
├── sales/
│   └── page.tsx      # Sales Forecast page
└── about/
    └── page.tsx      # About page
utils/
├── finance.ts        # NPV, PI, and payback chart calculations
└── forecast.ts       # OLS linear regression logic
```

## Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```
