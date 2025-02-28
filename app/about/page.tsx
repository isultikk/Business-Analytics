export default function AboutPage() {
  return (
    <div className="p-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About This Platform</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-lg text-gray-600 leading-relaxed text-justify">
            This platform is a modern business analytics dashboard designed to visualize and automate financial calculations, replacing traditional spreadsheet workflows. It features an Investment Analysis module that calculates Net Present Value (NPV) and Profitability Index (PI) to evaluate project viability and determine precise payback periods using dynamic cash flow inputs. Additionally, the Sales Forecasting module utilizes Ordinary Least Squares (OLS) Linear Regression to project future business performance based on historical data. Built entirely on a reactive Next.js and React architecture, the application eliminates the need for manual calculations or page reloads; whenever a user alters an input, the system instantaneously recalculates all underlying mathematical models and redraws the interactive charts, delivering a seamless and real-time analytical experience.
          </p>
        </div>
      </div>
    </div>
  );
}