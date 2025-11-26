import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { ActivityLog, Product, Sale } from '../types';
import { MOCK_SALES_CHART_DATA, MOCK_TOP_PRODUCTS_DATA, MOCK_ACTIVITY_LOGS } from '../constants';
import { getAiInsight } from '../services/geminiService';

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

const ArrowUpIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>
);

const ArrowDownIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
);

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, change, changeType, icon }) => (
  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</p>
      <p className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-2">{value}</p>
      <div className="flex items-center mt-2">
        <span className={`flex items-center text-xs font-semibold ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
          {changeType === 'increase' ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
          {change}
        </span>
        <span className="text-xs text-neutral-400 ml-1">vs last month</span>
      </div>
    </div>
    <div className="bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 p-3 rounded-full">
      {icon}
    </div>
  </div>
);

export const SalesLineChart: React.FC = () => (
  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Sales Overview</h3>
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={MOCK_SALES_CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
          <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
          <YAxis tick={{ fill: '#94a3b8' }} />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }} />
          <Legend wrapperStyle={{ color: '#94a3b8' }} />
          <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const TopProductsPieChart: React.FC = () => {
    const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc'];
    return (
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Top Selling Products</h3>
        <div style={{ width: '100%', height: 300 }} className="flex items-center justify-center">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={MOCK_TOP_PRODUCTS_DATA}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {MOCK_TOP_PRODUCTS_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }} />
              <Legend wrapperStyle={{ color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
};

export const RecentActivity: React.FC = () => (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Recent Activity</h3>
      <ul className="space-y-4">
        {MOCK_ACTIVITY_LOGS.map(log => (
            <li key={log.id} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mr-4">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-300">{log.user.charAt(0)}</span>
                </div>
                <div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-200">
                        <span className="font-semibold">{log.user}</span> {log.action.toLowerCase()}
                    </p>
                    <p className="text-xs text-neutral-400">{new Date(log.timestamp).toLocaleTimeString()}</p>
                </div>
            </li>
        ))}
      </ul>
    </div>
);

export const AiInsights: React.FC<{ products: Product[]; sales: Sale[] }> = ({ products, sales }) => {
  const [prompt, setPrompt] = React.useState('');
  const [insight, setInsight] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFetchInsight = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    
    // Construct context from props to help the AI
    const context = `Context: ${products.length} products in inventory, ${sales.length} total sales records.`;
    const fullPrompt = `${context}\n${prompt}`;
    
    const result = await getAiInsight(fullPrompt);
    setInsight(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-primary-500"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.456-2.456L12.75 18l1.197-.398a3.375 3.375 0 002.456-2.456L17.25 14.25l.398 1.197a3.375 3.375 0 002.456 2.456L21 18l-1.197.398a3.375 3.375 0 00-2.456 2.456z" /></svg>
        AI-Powered Insights
      </h3>
      <div className="flex space-x-2">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Summarize today's performance'"
          className="flex-grow bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
          disabled={isLoading}
        />
        <button 
          onClick={handleFetchInsight}
          disabled={isLoading}
          className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
      {insight && (
        <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg prose prose-sm dark:prose-invert max-w-none">
          <p>{insight}</p>
        </div>
      )}
    </div>
  );
};

export const LowStockAlerts: React.FC<{ products: Product[] }> = ({ products }) => {
  const lowStockProducts = products.filter(p => 
    typeof p.lowStockThreshold !== 'undefined' && p.stock <= p.lowStockThreshold
  ).sort((a, b) => a.stock - b.stock);

  const WarningIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md h-full">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center">
        <WarningIcon className="h-6 w-6 mr-2 text-yellow-500" />
        Low Stock Alerts
      </h3>
      {lowStockProducts.length > 0 ? (
        <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {lowStockProducts.map(p => (
            <li key={p.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-neutral-50 dark:bg-neutral-700/50">
              <span className="text-neutral-700 dark:text-neutral-200 font-medium">{p.name}</span>
              <span className="font-semibold text-red-500">{p.stock} {p.unit || 'items'} left</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-neutral-500 dark:text-neutral-400 py-8 flex flex-col items-center justify-center h-full">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>All stock levels are healthy.</p>
        </div>
      )}
    </div>
  );
};