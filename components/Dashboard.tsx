
import React, { useState } from 'react';
import { DashboardCard, SalesLineChart, TopProductsPieChart, RecentActivity, AiInsights, LowStockAlerts } from './DashboardWidgets';
import { ICONS, WIDGETS_CONFIG } from '../constants';
import { Product, User } from '../types';

const { ChartBarIcon, UsersIcon, CubeIcon, ShoppingCartIcon } = ICONS;

// Icons for Customize Modal
const CogIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0" /></svg>
);
const XMarkIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);


interface CustomizeDashboardModalProps {
    isOpen: boolean;
    onClose: () => void;
    userWidgets: Record<string, boolean>;
    onWidgetChange: (widgetId: string, isVisible: boolean) => void;
    t: (key: string) => string;
}

const CustomizeDashboardModal: React.FC<CustomizeDashboardModalProps> = ({ isOpen, onClose, userWidgets, onWidgetChange, t }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
                    <h3 className="text-lg font-semibold">Customize Dashboard</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><XMarkIcon className="w-6 h-6"/></button>
                </div>
                <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                    {WIDGETS_CONFIG.map(widget => (
                        <label key={widget.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50">
                           <span className="font-medium text-neutral-800 dark:text-neutral-100">{t(widget.name)}</span>
                            <input
                                type="checkbox"
                                checked={!!userWidgets[widget.id]}
                                onChange={(e) => onWidgetChange(widget.id, e.target.checked)}
                                className="h-5 w-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                            />
                        </label>
                    ))}
                </div>
                <div className="flex items-center justify-end p-4 border-t dark:border-neutral-700">
                    <button onClick={onClose} className="bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-700 transition-colors">Done</button>
                </div>
            </div>
        </div>
    );
};

interface DashboardProps {
  products: Product[];
  user: User;
  onWidgetChange: (widgetId: string, isVisible: boolean) => void;
  formatCurrency: (amount: number) => string;
  t: (key: string) => string;
}

const Dashboard: React.FC<DashboardProps> = ({ products, user, onWidgetChange, formatCurrency, t }) => {
  const [isCustomizeModalOpen, setCustomizeModalOpen] = useState(false);
  const { dashboardWidgets } = user;

  const visibleWidgets = Object.values(dashboardWidgets).filter(Boolean).length;

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">{t('Dashboard')}</h1>
            <button 
                onClick={() => setCustomizeModalOpen(true)}
                className="flex items-center gap-2 bg-white dark:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 font-semibold px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
            >
                <CogIcon className="w-5 h-5" />
                Customize
            </button>
        </div>

        {visibleWidgets === 0 && (
            <div className="text-center py-20 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Your dashboard is empty!</h2>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">Click the "Customize" button to add widgets.</p>
            </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardWidgets.totalRevenue && <DashboardCard title={t('Total Revenue')} value={formatCurrency(75231.89)} change="+12.5%" changeType="increase" icon={<ChartBarIcon className="w-6 h-6" />} />}
            {dashboardWidgets.newCustomers && <DashboardCard title={t('New Customers')} value="1,204" change="+8.2%" changeType="increase" icon={<UsersIcon className="w-6 h-6" />} />}
            {dashboardWidgets.productsSold && <DashboardCard title={t('Products Sold')} value="5,890" change="-1.7%" changeType="decrease" icon={<CubeIcon className="w-6 h-6" />} />}
            {dashboardWidgets.todaysTransactions && <DashboardCard title={t('Todays Transactions')} value="23" change="+5" changeType="increase" icon={<ShoppingCartIcon className="w-6 h-6" />} />}
        </div>
        
        {(dashboardWidgets.salesOverview || dashboardWidgets.topProducts) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {dashboardWidgets.salesOverview && (
                <div className="lg:col-span-2">
                    <SalesLineChart />
                </div>
              )}
              {dashboardWidgets.topProducts && (
                <div className={!dashboardWidgets.salesOverview ? 'lg:col-span-3' : ''}>
                    <TopProductsPieChart />
                </div>
              )}
          </div>
        )}

        {(dashboardWidgets.recentActivity || dashboardWidgets.lowStockAlerts || dashboardWidgets.aiInsights) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(dashboardWidgets.recentActivity || dashboardWidgets.lowStockAlerts) && (
              <div className="lg:col-span-1 space-y-6">
                  {dashboardWidgets.recentActivity && <RecentActivity />}
                  {dashboardWidgets.lowStockAlerts && <LowStockAlerts products={products} />}
              </div>
            )}
            {dashboardWidgets.aiInsights && (
              <div className={(dashboardWidgets.recentActivity || dashboardWidgets.lowStockAlerts) ? "lg:col-span-2" : "lg:col-span-3"}>
                  <AiInsights />
              </div>
            )}
          </div>
        )}

        <CustomizeDashboardModal 
            isOpen={isCustomizeModalOpen}
            onClose={() => setCustomizeModalOpen(false)}
            userWidgets={dashboardWidgets}
            onWidgetChange={onWidgetChange}
            t={t}
        />
    </div>
  );
};

export default Dashboard;
