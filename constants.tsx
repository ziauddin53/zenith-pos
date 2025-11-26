
import React from 'react';
import { Role, User, Product, Customer, Sale, ActivityLog, NavItem, LicenseKey, Notification, Supplier, PurchaseOrder, Expense, Language, Currency, SystemSettings, MasterLicense } from './types';

// --- API CONFIGURATION ---
export const API_BASE_URL = "http://localhost:5000/api"; 

// --- ICONS ---
// Using Heroicons (MIT License)

const ChartBarIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const CubeIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const UserGroupIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.513-.96 1.487-1.591 2.571-1.591h1.69c1.084 0 2.058.631 2.571 1.591m-1.5-4.87c.966-.054 1.932.026 2.867.231m-8.686.461a9.083 9.083 0 01-2.233-1.527m-5.145-2.747a6.75 6.75 0 01-1.025-2.185m-2.522-3.238a6.75 6.75 0 00-1.025 2.185m8.686 4.61a9.083 9.083 0 01-2.233 1.527m5.145 2.747a6.75 6.75 0 001.025 2.185m2.522 3.238a6.75 6.75 0 011.025-2.185m-8.686-4.61a9.083 9.083 0 002.233-1.527m-5.145-2.747a6.75 6.75 0 01-1.025-2.185m-2.522-3.238a6.75 6.75 0 00-1.025 2.185" />
  </svg>
);

const UsersIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.003c0 1.113.285 2.16.786 3.07M15 19.128c.331.149.661.296.992.443m-7.007-4.668a2.25 2.25 0 01-.02-3.956 2.25 2.25 0 013.976.02 2.25 2.25 0 01-.02 3.956 2.25 2.25 0 01-3.976-.02zM12 15.75l-4.243 4.243M12 15.75l4.243 4.243m-8.486-4.243L12 15.75l-4.243-4.243m4.243-4.243L12 11.25l-4.243 4.243M12 3v.01M16.5 4.5l.01.01M21 8.25v.01M21 12v.01M21 15.75v.01M16.5 19.5l.01.01M12 21v.01M7.5 19.5l-.01.01M3 15.75v.01M3 12v.01M3 8.25v.01M7.5 4.5l-.01.01" />
  </svg>
);

const Cog6ToothIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.226.55-.22 1.156-.169 1.664.13a4.902 4.902 0 012.016 3.033h.003c.184 1.487.054 3.023-.384 4.484.09.09.182.178.27.264.47.442.823.979 1.05 1.58.227.602.268 1.25.122 1.867-.146.617-.458 1.18-.9 1.637a4.902 4.902 0 01-6.108 2.368c-1.897-.732-3.56-2.22-4.32-4.13a4.893 4.893 0 01.164-5.32c.532-.733 1.28-1.343 2.146-1.757.513-.246 1.06-.401 1.617-.464.089-.006.177-.013.266-.02zM12 9a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);

const DocumentChartBarIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125v-12.75a1.125 1.125 0 011.125-1.125h17.25a1.125 1.125 0 011.125 1.125v12.75a1.125 1.125 0 01-1.125 1.125m-17.25 0h.009v.008h-.009v-.008zm1.688 0h.009v.008h-.009v-.008zm1.687 0h.009v.008h-.009v-.008zm1.688 0h.009v.008h-.009v-.008zm1.687 0h.009v.008h-.009v-.008zM8.25 6h7.5M8.25 9h7.5m-7.5 3h7.5" />
  </svg>
);

const ShoppingCartIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.423a.75.75 0 00-.674-.928H5.216c-.464 0-.893.261-.928.704L3.63 10.25l-1.38-4.853A.75.75 0 001.5 5.25H2.25" />
    </svg>
);

const KeyIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.516.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
  </svg>
);

const ExclamationTriangleIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V9a.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

const TruckIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125v-4.25m16 4.25a1.5 1.5 0 003 0m-3 0a1.5 1.5 0 01-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const BanknotesIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
);

const TagIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.593l6.002-4.591c.828-.426.828-1.506 0-1.932l-6.002-4.591a2.02 2.02 0 00-1.607-.24L9.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>
);

const PrinterIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
  </svg>
);

const GlobeAltIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const ArrowUpTrayIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const QrCodeIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
    </svg>
);

const WifiIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
  </svg>
);

const CloudIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
  </svg>
);

const BuildingStorefrontIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H4.5A2.25 2.25 0 002.25 13.5V21M3 3h12M3 3v2.25M3 3l9 9M15 3h6m0 0v2.25M15 3l6 6M21 3l-9 9M15 21v-7.5A2.25 2.25 0 0012.75 11.25h-.625a2.25 2.25 0 00-2.25 2.25V21" /></svg>
);

const ShieldCheckIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
  </svg>
);

const XMarkIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ICONS = {
    ChartBarIcon,
    CubeIcon,
    UserGroupIcon,
    UsersIcon,
    Cog6ToothIcon,
    DocumentChartBarIcon,
    ShoppingCartIcon,
    KeyIcon,
    ExclamationTriangleIcon,
    TruckIcon,
    BanknotesIcon,
    TagIcon,
    ChatBubbleLeftRightIcon,
    PrinterIcon,
    GlobeAltIcon,
    ArrowUpTrayIcon,
    QrCodeIcon,
    WifiIcon,
    CloudIcon,
    BuildingStorefrontIcon,
    ShieldCheckIcon,
    XMarkIcon
};

// --- CONFIGURATION ---

export const LOYALTY_CONVERSION_RATE = 0.01; // $0.01 discount per point
export const TRIAL_DURATION_DAYS = 7;

export const getDefaultWidgetsForRole = (role: Role) => {
    if (role === Role.Admin) {
        return {
            totalRevenue: true,
            newCustomers: true,
            productsSold: true,
            todaysTransactions: true,
            salesOverview: true,
            topProducts: true,
            recentActivity: true,
            lowStockAlerts: true,
            aiInsights: true,
            licenseActivations: true
        };
    }
    if (role === Role.Manager) {
        return {
            totalRevenue: true,
            productsSold: true,
            salesOverview: true,
            topProducts: true,
            lowStockAlerts: true,
            aiInsights: true
        };
    }
    if (role === Role.Cashier) {
        return {
            todaysTransactions: true,
            productsSold: true,
            lowStockAlerts: true
        };
    }
    return {};
};

// --- NAVIGATION ---
export const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', path: 'dashboard', icon: ChartBarIcon, roles: [Role.Admin, Role.Manager, Role.Cashier, Role.Viewer] },
  { name: 'Point of Sale', path: 'pos', icon: ShoppingCartIcon, roles: [Role.Admin, Role.Manager, Role.Cashier] },
  { name: 'Products', path: 'products', icon: CubeIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Customers', path: 'customers', icon: UserGroupIcon, roles: [Role.Admin, Role.Manager, Role.Cashier] },
  { name: 'Employees', path: 'employees', icon: UsersIcon, roles: [Role.Admin] },
  { name: 'Suppliers', path: 'suppliers', icon: TruckIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Purchases', path: 'purchases', icon: DocumentChartBarIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Expenses', path: 'expenses', icon: BanknotesIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Reports', path: 'reports', icon: DocumentChartBarIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Settings', path: 'settings', icon: Cog6ToothIcon, roles: [Role.Admin, Role.Manager, Role.Cashier, Role.Viewer] },
];

export const WIDGETS_CONFIG = [
    { id: 'totalRevenue', name: 'Total Revenue' },
    { id: 'newCustomers', name: 'New Customers' },
    { id: 'productsSold', name: 'Products Sold' },
    { id: 'todaysTransactions', name: 'Todays Transactions' },
    { id: 'salesOverview', name: 'Sales Overview' },
    { id: 'topProducts', name: 'Top Products' },
    { id: 'recentActivity', name: 'Recent Activity' },
    { id: 'lowStockAlerts', name: 'Low Stock Alerts' },
    { id: 'aiInsights', name: 'AI-Powered Insights' },
    { id: 'licenseActivations', name: 'License Activations' }
];

// --- MOCK DATA ---

export const MOCK_USERS: User[] = [
  { 
    id: 'u1', 
    name: 'Super Admin', 
    email: 'superadmin@zenith.com', 
    password: 'superadmin123!', 
    role: Role.Admin, 
    avatarUrl: 'https://i.pravatar.cc/150?u=u1',
    dashboardWidgets: getDefaultWidgetsForRole(Role.Admin),
    organizationId: 'org_admin'
  },
  { 
    id: 'u2', 
    name: 'Jane Smith', 
    email: 'manager@zenith.com', 
    password: '123', 
    role: Role.Manager, 
    avatarUrl: 'https://i.pravatar.cc/150?u=u2',
    dashboardWidgets: getDefaultWidgetsForRole(Role.Manager),
    organizationId: 'org_tech'
  },
  { 
    id: 'u3', 
    name: 'Bob Jones', 
    email: 'cashier@zenith.com', 
    password: '123', 
    role: Role.Cashier, 
    avatarUrl: 'https://i.pravatar.cc/150?u=u3',
    dashboardWidgets: getDefaultWidgetsForRole(Role.Cashier),
    organizationId: 'org_tech'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 45, sku: 'WH-001', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80', organizationId: 'org_tech', lowStockThreshold: 10 },
  { id: 'p2', name: 'Smartphone Stand', category: 'Accessories', price: 19.99, stock: 120, sku: 'SS-002', imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&q=80', organizationId: 'org_tech', lowStockThreshold: 20 },
  { id: 'p3', name: 'Mechanical Keyboard', category: 'Electronics', price: 149.50, stock: 8, sku: 'MK-003', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=200&q=80', organizationId: 'org_tech', lowStockThreshold: 5 },
  { id: 'p4', name: 'USB-C Cable', category: 'Accessories', price: 9.99, stock: 200, sku: 'UC-004', organizationId: 'org_tech', lowStockThreshold: 50 },
  { id: 'p5', name: 'Espresso Blend', category: 'Coffee', price: 15.00, stock: 50, sku: 'CF-001', organizationId: 'org_coffee', lowStockThreshold: 10 },
  { id: 'p6', name: 'Cappuccino', category: 'Beverage', price: 4.50, stock: 500, sku: 'BV-001', organizationId: 'org_coffee' }
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Alice Johnson', phone: '555-0101', email: 'alice@example.com', loyaltyPoints: 150, dueAmount: 0, organizationId: 'org_tech', creditLimit: 500 },
  { id: 'c2', name: 'Michael Brown', phone: '555-0102', email: 'michael@example.com', loyaltyPoints: 40, dueAmount: 50.00, organizationId: 'org_tech', creditLimit: 200 },
  { id: 'c3', name: 'Coffee Lover', phone: '555-0201', email: 'coffee@example.com', loyaltyPoints: 200, dueAmount: 0, organizationId: 'org_coffee' }
];

export const MOCK_SUPPLIERS: Supplier[] = [
    { id: 'sup1', name: 'Tech Distro Inc.', contactPerson: 'John Sales', phone: '555-9999', email: 'sales@techdistro.com', organizationId: 'org_tech' },
    { id: 'sup2', name: 'Global Gadgets', contactPerson: 'Sarah Supply', phone: '555-8888', email: 'sarah@globalgadgets.com', organizationId: 'org_tech' },
    { id: 'sup3', name: 'Bean Farmers Co.', contactPerson: 'Juan Valdez', phone: '555-7777', email: 'juan@beans.com', organizationId: 'org_coffee' }
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
    { 
        id: 'po1', 
        supplierId: 'sup1', 
        supplierName: 'Tech Distro Inc.', 
        status: 'Completed', 
        items: [{ productId: 'p1', productName: 'Wireless Headphones', quantity: 10, cost: 500 }], 
        total: 500, 
        createdAt: '2023-10-25T10:00:00Z', 
        createdBy: 'Admin', 
        organizationId: 'org_tech' 
    }
];

export const MOCK_EXPENSES: Expense[] = [
    { id: 'e1', category: 'Rent', description: 'Monthly shop rent', amount: 1500, date: '2023-11-01T09:00:00Z', recordedBy: 'Admin', organizationId: 'org_tech' },
    { id: 'e2', category: 'Utilities', description: 'Electric bill', amount: 200, date: '2023-11-05T14:30:00Z', recordedBy: 'Manager', organizationId: 'org_tech' }
];

export const MOCK_SALES_DATA: Sale[] = [
  { id: 's1001', date: '2023-11-20T10:30:00', total: 119.98, cashier: 'Bob Jones', cashierId: 'u3', items: 2, customerId: 'c1', customerName: 'Alice Johnson', amountPaid: 119.98, paymentMethod: 'Card', organizationId: 'org_tech' },
  { id: 's1002', date: '2023-11-20T11:15:00', total: 19.99, cashier: 'Bob Jones', cashierId: 'u3', items: 1, customerId: 'guest', customerName: 'Guest', amountPaid: 20.00, paymentMethod: 'Cash', organizationId: 'org_tech' },
  { id: 's1003', date: '2023-11-21T09:45:00', total: 299.00, cashier: 'Jane Smith', cashierId: 'u2', items: 2, customerId: 'c2', customerName: 'Michael Brown', amountPaid: 299.00, paymentMethod: 'Credit', organizationId: 'org_tech' },
  { id: 's1004', date: '2023-11-21T14:20:00', total: 9.99, cashier: 'Bob Jones', cashierId: 'u3', items: 1, customerId: 'guest', customerName: 'Guest', amountPaid: 9.99, paymentMethod: 'Cash', organizationId: 'org_tech' },
  { id: 's1005', date: '2023-11-22T16:00:00', total: 15.00, cashier: 'Barista', cashierId: 'u4', items: 1, customerId: 'c3', customerName: 'Coffee Lover', amountPaid: 15.00, paymentMethod: 'Cash', organizationId: 'org_coffee' }
];

export const MOCK_SALES_CHART_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export const MOCK_TOP_PRODUCTS_DATA = [
  { name: 'Headphones', value: 400 },
  { name: 'Phone Stand', value: 300 },
  { name: 'Keyboard', value: 300 },
  { name: 'USB Cable', value: 200 },
];

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'l1', user: 'Admin', action: 'Updated inventory for "Headphones"', timestamp: '2023-11-21T10:00:00' },
  { id: 'l2', user: 'Jane Smith', action: 'Processed refund for Order #s1003', timestamp: '2023-11-21T11:30:00' },
  { id: 'l3', user: 'Bob Jones', action: 'Logged in', timestamp: '2023-11-22T08:55:00' },
];

export const MOCK_LICENSE_KEYS: LicenseKey[] = [
  { id: 'lk1', key: 'DEV-001', assignedToUserId: 'u2', assignedToUserName: 'Jane Smith', status: 'Active', validity: 'Lifetime', deviceName: 'Counter 1', organizationId: 'org_tech' },
  { id: 'lk2', key: 'DEV-002', assignedToUserId: 'u3', assignedToUserName: 'Bob Jones', status: 'Active', validity: '2024-12-31', deviceName: 'Counter 2', organizationId: 'org_tech' },
  { id: 'lk3', key: 'DEV-003', assignedToUserId: 'u4', assignedToUserName: 'Barista', status: 'Active', validity: 'Lifetime', deviceName: 'Main Register', organizationId: 'org_coffee' }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n1', title: 'Low Stock Alert', message: 'Wireless Headphones stock is below 10.', timestamp: '2023-11-22T09:00:00Z', read: false, link: 'products' },
    { id: 'n2', title: 'New Update', message: 'Zenith POS v2.0 is now available.', timestamp: '2023-11-21T10:00:00Z', read: true },
    { id: 'n3', title: 'Daily Report', message: 'Yesterday\'s sales report is ready.', timestamp: '2023-11-21T08:00:00Z', read: false, link: 'reports' }
];

// --- MANAGEMENT TABLE CONFIG ---

export interface ManagementColumn<T> {
    key: keyof T;
    header: string;
    render?: (item: T) => React.ReactNode;
}

export interface ManagementFormField<T> {
    key: keyof T;
    label: string;
    type: 'text' | 'number' | 'email' | 'select' | 'image';
    options?: { value: string, label: string }[];
    required?: boolean;
}

export const MANAGEMENT_CONFIG = {
    products: {
        columns: [
            { key: 'name', header: 'Name', render: (p: Product) => (
                <div className="flex items-center gap-3">
                    {p.imageUrl && <img src={p.imageUrl} alt="" className="w-8 h-8 rounded object-cover" />}
                    <div>
                        <div className="font-bold text-neutral-800 dark:text-neutral-200">{p.name}</div>
                        <div className="text-xs text-neutral-500">{p.sku}</div>
                    </div>
                </div>
            ) },
            { key: 'category', header: 'Category' },
            { key: 'price', header: 'Price', render: (p: Product) => `$${p.price.toFixed(2)}` },
            { key: 'stock', header: 'Stock', render: (p: Product) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.stock <= (p.lowStockThreshold || 5) ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {p.stock} units
                </span>
            )}
        ] as ManagementColumn<Product>[],
        formFields: [
            { key: 'name', label: 'Product Name', type: 'text', required: true },
            { key: 'sku', label: 'SKU / Barcode', type: 'text', required: true },
            { key: 'category', label: 'Category', type: 'text', required: true },
            { key: 'price', label: 'Price', type: 'number', required: true },
            { key: 'stock', label: 'Initial Stock', type: 'number', required: true },
            { key: 'lowStockThreshold', label: 'Low Stock Alert Level', type: 'number' },
            { key: 'imageUrl', label: 'Product Image', type: 'image' }
        ] as ManagementFormField<Product>[]
    },
    customers: {
        columns: [
            { key: 'name', header: 'Name' },
            { key: 'phone', header: 'Phone' },
            { key: 'loyaltyPoints', header: 'Points', render: (c: Customer) => <span className="font-mono text-amber-600 font-bold">{c.loyaltyPoints}</span> },
            { key: 'dueAmount', header: 'Due', render: (c: Customer) => <span className={c.dueAmount > 0 ? 'text-red-600 font-bold' : 'text-green-600'}>${c.dueAmount.toFixed(2)}</span> }
        ] as ManagementColumn<Customer>[],
        formFields: [
            { key: 'name', label: 'Full Name', type: 'text', required: true },
            { key: 'phone', label: 'Phone Number', type: 'text', required: true },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'creditLimit', label: 'Credit Limit', type: 'number' }
        ] as ManagementFormField<Customer>[]
    },
    employees: {
        columns: [
            { key: 'name', header: 'Name', render: (u: User) => (
                <div className="flex items-center gap-2">
                    <img src={u.avatarUrl} alt="" className="w-6 h-6 rounded-full" />
                    <span>{u.name}</span>
                </div>
            )},
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role', render: (u: User) => (
                <span className={`px-2 py-0.5 rounded text-xs font-semibold
                    ${u.role === Role.Admin ? 'bg-purple-100 text-purple-800' :
                      u.role === Role.Manager ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                    {u.role}
                </span>
            )}
        ] as ManagementColumn<User>[],
        formFields: [
            { key: 'name', label: 'Name', type: 'text', required: true },
            { key: 'email', label: 'Email', type: 'email', required: true },
            { key: 'password', label: 'Password', type: 'text', required: true },
            { key: 'role', label: 'Role', type: 'select', options: Object.values(Role).map(r => ({ value: r, label: r })), required: true }
        ] as ManagementFormField<User>[]
    },
    suppliers: {
        columns: [
            { key: 'name', header: 'Company Name' },
            { key: 'contactPerson', header: 'Contact Person' },
            { key: 'phone', header: 'Phone' },
            { key: 'email', header: 'Email' }
        ] as ManagementColumn<Supplier>[],
        formFields: [
            { key: 'name', label: 'Company Name', type: 'text', required: true },
            { key: 'contactPerson', label: 'Contact Person', type: 'text', required: true },
            { key: 'phone', label: 'Phone', type: 'text', required: true },
            { key: 'email', label: 'Email', type: 'email', required: true }
        ] as ManagementFormField<Supplier>[]
    },
    purchases: {
        columns: [
            { key: 'id', header: 'PO ID', render: (po: PurchaseOrder) => <span className="font-mono text-xs">#{po.id}</span> },
            { key: 'supplierName', header: 'Supplier' },
            { key: 'status', header: 'Status', render: (po: PurchaseOrder) => (
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${po.status === 'Completed' ? 'bg-green-100 text-green-800' : po.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{po.status}</span>
            )},
            { key: 'total', header: 'Total Cost', render: (po: PurchaseOrder) => `$${po.total.toFixed(2)}` },
            { key: 'createdAt', header: 'Date', render: (po: PurchaseOrder) => new Date(po.createdAt).toLocaleDateString() }
        ] as ManagementColumn<PurchaseOrder>[],
        formFields: [
            { key: 'supplierId', label: 'Supplier', type: 'select', options: [], required: true }, // Options populated in component
            { key: 'status', label: 'Status', type: 'select', options: [{value: 'Pending', label: 'Pending'}, {value: 'Completed', label: 'Completed'}, {value: 'Cancelled', label: 'Cancelled'}], required: true },
            // Note: Full PO creation usually needs a complex form for items, simplistic for now
        ] as ManagementFormField<PurchaseOrder>[]
    },
    expenses: {
        columns: [
            { key: 'category', header: 'Category' },
            { key: 'description', header: 'Description' },
            { key: 'amount', header: 'Amount', render: (e: Expense) => `$${e.amount.toFixed(2)}` },
            { key: 'date', header: 'Date', render: (e: Expense) => new Date(e.date).toLocaleDateString() },
            { key: 'recordedBy', header: 'Recorded By' }
        ] as ManagementColumn<Expense>[],
        formFields: [
            { key: 'category', label: 'Category', type: 'text', required: true },
            { key: 'description', label: 'Description', type: 'text', required: true },
            { key: 'amount', label: 'Amount', type: 'number', required: true },
            { key: 'date', label: 'Date', type: 'text' } // Simplified, usually date picker
        ] as ManagementFormField<Expense>[]
    }
};

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
    'en': {
        'Dashboard': 'Dashboard',
        'Point of Sale': 'Point of Sale',
        'Products': 'Products',
        'Customers': 'Customers',
        'Employees': 'Employees',
        'Settings': 'Settings',
        'Reports': 'Reports',
        'Suppliers': 'Suppliers',
        'Purchases': 'Purchases',
        'Expenses': 'Expenses',
        'Total Revenue': 'Total Revenue',
        'New Customers': 'New Customers',
        'Products Sold': 'Products Sold',
        'Todays Transactions': 'Today\'s Transactions',
        'Search': 'Search products...',
        'Charge': 'Charge',
        'Subtotal': 'Subtotal',
        'Tax': 'Tax',
        'Total': 'Total',
        'Add New': 'Add New',
        'Import CSV': 'Import CSV',
        'Print Labels': 'Print Labels'
    },
    'bn': {
        'Dashboard': 'ড্যাশবোর্ড',
        'Point of Sale': 'বিক্রয় কেন্দ্র',
        'Products': 'পণ্য তালিকা',
        'Customers': 'গ্রাহক তালিকা',
        'Employees': 'কর্মচারী',
        'Settings': 'সেটিংস',
        'Reports': 'রিপোর্ট',
        'Suppliers': 'সরবরাহকারী',
        'Purchases': 'ক্রয়',
        'Expenses': 'খরচ',
        'Total Revenue': 'মোট আয়',
        'New Customers': 'নতুন গ্রাহক',
        'Products Sold': 'বিক্রিত পণ্য',
        'Todays Transactions': 'আজকের লেনদেন',
        'Search': 'পণ্য খুঁজুন...',
        'Charge': 'বিল নিন',
        'Subtotal': 'সাবটোটাল',
        'Tax': 'ট্যাক্স',
        'Total': 'মোট',
        'Add New': 'নতুন যোগ করুন',
        'Import CSV': 'CSV ইম্পোর্ট',
        'Print Labels': 'লেবেল প্রিন্ট'
    }
};

export const CURRENCIES: Record<Currency, { symbol: string, rate: number }> = {
    'USD': { symbol: '$', rate: 1 },
    'BDT': { symbol: '৳', rate: 110 },
    'EUR': { symbol: '€', rate: 0.92 },
    'INR': { symbol: '₹', rate: 83 }
};
