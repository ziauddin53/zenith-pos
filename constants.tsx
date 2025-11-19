
import React from 'react';
import { Role, User, Product, Customer, Sale, ActivityLog, NavItem, LicenseKey, Notification, Supplier, PurchaseOrder, Expense, MasterLicense } from './types';

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
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
  </svg>
);

const ExclamationTriangleIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

const TruckIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875M3.375 14.25h17.25M6 14.25V6h12v8.25" />
  </svg>
);

const ArchiveBoxIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

const ReceiptPercentIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3m-3 0h-1.5m3 0h.75M9 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const BanknotesIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

const TagIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

const WifiIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
    </svg>
);

const CloudIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
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
    ArchiveBoxIcon,
    ReceiptPercentIcon,
    BanknotesIcon,
    TagIcon,
    WifiIcon,
    CloudIcon,
};

// --- NAVIGATION ---

export const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', path: 'dashboard', icon: ChartBarIcon, roles: [Role.Admin, Role.Manager, Role.Viewer] },
  { name: 'POS', path: 'pos', icon: ShoppingCartIcon, roles: [Role.Cashier, Role.Admin, Role.Manager] },
  { name: 'Products', path: 'products', icon: CubeIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Purchases', path: 'purchases', icon: ArchiveBoxIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Suppliers', path: 'suppliers', icon: TruckIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Customers', path: 'customers', icon: UserGroupIcon, roles: [Role.Admin, Role.Manager, Role.Cashier] },
  { name: 'Employees', path: 'employees', icon: UsersIcon, roles: [Role.Admin] },
  { name: 'Expenses', path: 'expenses', icon: ReceiptPercentIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Reports', path: 'reports', icon: DocumentChartBarIcon, roles: [Role.Admin, Role.Manager, Role.Viewer] },
  { name: 'Settings', path: 'settings', icon: Cog6ToothIcon, roles: [Role.Admin] },
];

// --- DASHBOARD WIDGETS CONFIG ---
export const WIDGETS_CONFIG = [
    { id: 'totalRevenue', name: 'Total Revenue', roles: [Role.Admin] },
    { id: 'newCustomers', name: 'New Customers', roles: [Role.Admin, Role.Manager] },
    { id: 'productsSold', name: 'Products Sold', roles: [Role.Admin, Role.Manager, Role.Viewer] },
    { id: 'todaysTransactions', name: 'Today\'s Transactions', roles: [Role.Admin, Role.Manager, Role.Viewer] },
    { id: 'salesOverview', name: 'Sales Overview', roles: [Role.Admin, Role.Manager, Role.Viewer] },
    { id: 'topProducts', name: 'Top Selling Products', roles: [Role.Admin, Role.Manager, Role.Viewer] },
    { id: 'recentActivity', name: 'Recent Activity', roles: [Role.Admin, Role.Manager] },
    { id: 'lowStockAlerts', name: 'Low Stock Alerts', roles: [Role.Admin, Role.Manager] },
    { id: 'aiInsights', name: 'AI-Powered Insights', roles: [Role.Admin, Role.Manager] },
];

const getDefaultWidgetsForRole = (role: Role): Record<string, boolean> => {
    const widgets: Record<string, boolean> = {};
    WIDGETS_CONFIG.forEach(widget => {
        widgets[widget.id] = widget.roles.includes(role);
    });
    return widgets;
};


// --- MOCK DATA ---

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Low Stock Warning', message: 'Espresso is running low. Only 20 units left.', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), read: false, link: 'products' },
  { id: 'n2', title: 'New Sale', message: 'Sale #S1025 of $45.50 completed by David Smith.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: false, link: 'reports' },
  { id: 'n3', title: 'System Update', message: 'Scheduled maintenance this Sunday at 2 AM.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), read: true },
  { id: 'n4', title: 'Weekly Report Ready', message: 'Your weekly sales summary is available.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true, link: 'reports' },
];

// --- MASTER LICENSE KEYS (Simulating a remote DB) ---
export const MOCK_MASTER_LICENSES: MasterLicense[] = [
  {
    key: 'ZENITH-SUPER-2025-DEMO',
    organizationId: 'org_coffee',
    validUntil: '2025-12-31T23:59:59Z',
    planType: 'Enterprise',
    status: 'Active'
  },
  {
    key: 'ZENITH-TECH-2025-DEMO',
    organizationId: 'org_tech',
    validUntil: '2025-12-31T23:59:59Z',
    planType: 'Premium',
    status: 'Active'
  },
  {
    key: 'ZENITH-EXPIRED-KEY',
    organizationId: 'org_demo',
    validUntil: '2023-01-01T00:00:00Z',
    planType: 'Standard',
    status: 'Expired'
  }
];

export const MOCK_USERS: User[] = [
  // Organization 1: Zenith Coffee
  { id: 'u1', name: 'Alex Johnson', email: 'admin1@zenith.com', password: '123456', role: Role.Admin, organizationId: 'org_coffee', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', dashboardWidgets: getDefaultWidgetsForRole(Role.Admin) },
  { id: 'u2', name: 'Maria Garcia', email: 'manager@zenith.com', password: '123456', role: Role.Manager, organizationId: 'org_coffee', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', dashboardWidgets: getDefaultWidgetsForRole(Role.Manager) },
  { id: 'u3', name: 'David Smith', email: 'cashier@zenith.com', password: '123456', role: Role.Cashier, organizationId: 'org_coffee', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', dashboardWidgets: getDefaultWidgetsForRole(Role.Cashier) },
  
  // Organization 2: Tech Zone
  { id: 'u4', name: 'Michael Chen', email: 'admin2@techzone.com', password: '123456', role: Role.Admin, organizationId: 'org_tech', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026709d', dashboardWidgets: getDefaultWidgetsForRole(Role.Admin) },
  { id: 'u5', name: 'John Doe', email: 'cashier@techzone.com', password: '123456', role: Role.Cashier, organizationId: 'org_tech', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026708d', dashboardWidgets: getDefaultWidgetsForRole(Role.Cashier) },
  
  // Viewer for Org 1
  { id: 'u6', name: 'Sarah Wilson', email: 'viewer@zenith.com', password: '123456', role: Role.Viewer, organizationId: 'org_coffee', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', dashboardWidgets: getDefaultWidgetsForRole(Role.Viewer) },
];

export const MOCK_PRODUCTS: Product[] = [
  // Zenith Coffee Products (org_coffee)
  { id: 'p1', organizationId: 'org_coffee', name: 'Espresso', category: 'Coffee', price: 2.50, stock: 20, sku: 'COF-ESP-01', brand: 'Zenith Beans', unit: 'pcs', lowStockThreshold: 25, expiryDate: '2025-12-31', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80' },
  { id: 'p2', organizationId: 'org_coffee', name: 'Latte', category: 'Coffee', price: 3.50, stock: 120, sku: 'COF-LAT-01', brand: 'Zenith Beans', unit: 'pcs', lowStockThreshold: 50, expiryDate: '2025-12-31', imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=100&q=80' },
  { id: 'p3', organizationId: 'org_coffee', name: 'Croissant', category: 'Pastry', price: 2.75, stock: 15, sku: 'PAS-CRO-01', brand: 'Paris Pastries', unit: 'pcs', lowStockThreshold: 20, expiryDate: '2024-08-10', imageUrl: 'https://images.unsplash.com/photo-1530982523992-9385556a1b9c?auto=format&fit=crop&w=100&q=80' },
  { id: 'p4', organizationId: 'org_coffee', name: 'Muffin', category: 'Pastry', price: 3.00, stock: 75, sku: 'PAS-MUF-01', brand: 'Paris Pastries', unit: 'pcs', lowStockThreshold: 20, expiryDate: '2024-08-12', imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=100&q=80' },
  { id: 'p5', organizationId: 'org_coffee', name: 'Orange Juice', category: 'Beverage', price: 4.00, stock: 90, sku: 'BEV-OJ-01', brand: 'Fresh Squeeze', unit: 'btl', lowStockThreshold: 30, expiryDate: '2024-09-01', imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=100&q=80' },
  
  // Tech Zone Products (org_tech)
  { id: 'tp1', organizationId: 'org_tech', name: 'USB-C Cable', category: 'Accessories', price: 12.99, stock: 50, sku: 'ACC-USB-01', brand: 'TechLink', unit: 'pcs', lowStockThreshold: 10, imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=100&q=80' },
  { id: 'tp2', organizationId: 'org_tech', name: 'Wireless Mouse', category: 'Peripherals', price: 24.99, stock: 30, sku: 'PER-MSE-01', brand: 'LogiTech', unit: 'pcs', lowStockThreshold: 5, imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=100&q=80' },
  { id: 'tp3', organizationId: 'org_tech', name: 'Mechanical Keyboard', category: 'Peripherals', price: 89.99, stock: 15, sku: 'PER-KBD-01', brand: 'KeyChron', unit: 'pcs', lowStockThreshold: 5, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&w=100&q=80' },
  { id: 'tp4', organizationId: 'org_tech', name: 'Screen Protector', category: 'Accessories', price: 9.99, stock: 100, sku: 'ACC-SCR-01', brand: 'GlassGuard', unit: 'pcs', lowStockThreshold: 20, imageUrl: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=100&q=80' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  // Zenith Coffee Customers
  { id: 'c1', organizationId: 'org_coffee', name: 'Emily Carter', phone: '555-0101', email: 'emily.c@example.com', loyaltyPoints: 1250, dueAmount: 0, creditLimit: 500 },
  { id: 'c2', organizationId: 'org_coffee', name: 'Benjamin Hayes', phone: '555-0102', email: 'ben.h@example.com', loyaltyPoints: 850, dueAmount: 25.50, creditLimit: 200 },
  
  // Tech Zone Customers
  { id: 'tc1', organizationId: 'org_tech', name: 'Geeky Steve', phone: '555-9901', email: 'steve@tech.com', loyaltyPoints: 500, dueAmount: 120.00, creditLimit: 1000 },
  { id: 'tc2', organizationId: 'org_tech', name: 'Alice Coder', phone: '555-9902', email: 'alice@code.com', loyaltyPoints: 2000, dueAmount: 0, creditLimit: 2000 },
];

export const MOCK_SUPPLIERS: Supplier[] = [
    // Zenith Coffee Suppliers
    { id: 'sup1', organizationId: 'org_coffee', name: 'Zenith Beans Co.', contactPerson: 'John Bean', phone: '555-0201', email: 'sales@zenithbeans.com' },
    
    // Tech Zone Suppliers
    { id: 'sup2', organizationId: 'org_tech', name: 'Global Electronics', contactPerson: 'Mr. Circuit', phone: '555-0999', email: 'orders@globalelec.com' },
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
    // Zenith Coffee POs
    {
        id: 'po1',
        organizationId: 'org_coffee',
        supplierId: 'sup1',
        supplierName: 'Zenith Beans Co.',
        status: 'Completed',
        items: [
            { productId: 'p1', productName: 'Espresso', quantity: 100, cost: 1.50 },
        ],
        total: 150.00,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        createdBy: 'Maria Garcia',
    },
    // Tech Zone POs
    {
        id: 'po2',
        organizationId: 'org_tech',
        supplierId: 'sup2',
        supplierName: 'Global Electronics',
        status: 'Pending',
        items: [
            { productId: 'tp1', productName: 'USB-C Cable', quantity: 200, cost: 5.00 },
        ],
        total: 1000.00,
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        createdBy: 'Michael Chen',
    },
];

export const MOCK_EXPENSES: Expense[] = [
    // Zenith Coffee Expenses
    { id: 'e1', organizationId: 'org_coffee', category: 'Rent', description: 'Shop Rent', amount: 2500, date: new Date(Date.now() - 86400000 * 20).toISOString(), recordedBy: 'Alex Johnson' },
    
    // Tech Zone Expenses
    { id: 'e2', organizationId: 'org_tech', category: 'Rent', description: 'Tech Store Rent', amount: 4000, date: new Date(Date.now() - 86400000 * 20).toISOString(), recordedBy: 'Michael Chen' },
];

export const MOCK_SALES_DATA: Sale[] = [
    // Zenith Coffee Sales
    { id: 's1', organizationId: 'org_coffee', date: new Date(Date.now() - 86400000 * 2).toISOString(), total: 125.50, cashier: 'David Smith', cashierId: 'u3', items: 15, customerId: 'c1', customerName: 'Emily Carter', amountPaid: 125.50, paymentMethod: 'Card' },
    
    // Tech Zone Sales
    { id: 's2', organizationId: 'org_tech', date: new Date(Date.now() - 86400000 * 1).toISOString(), total: 89.99, cashier: 'John Doe', cashierId: 'u5', items: 1, customerId: 'tc1', customerName: 'Geeky Steve', amountPaid: 89.99, paymentMethod: 'Card' },
];

export const MOCK_LICENSE_KEYS: LicenseKey[] = [
  { 
    id: 'lk1', 
    organizationId: 'org_coffee',
    key: 'ZENITH-COFF-EE01-1234', 
    assignedToUserId: 'u3', 
    assignedToUserName: 'David Smith', 
    status: 'Active', 
    validity: 'Lifetime', 
    deviceName: 'Counter PC' 
  },
  { 
    id: 'lk2', 
    organizationId: 'org_tech',
    key: 'ZENITH-TECH-ZONE-5678', 
    assignedToUserId: 'u5', 
    assignedToUserName: 'John Doe', 
    status: 'Active', 
    validity: 'Lifetime', 
    deviceName: 'Main Register' 
  },
];

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
    { id: 'a1', user: 'Alex Johnson', action: 'Logged in', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 'a2', user: 'Michael Chen', action: 'Logged in', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
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
    { name: 'Latte', value: 400 },
    { name: 'Espresso', value: 300 },
    { name: 'Croissant', value: 300 },
    { name: 'Orange Juice', value: 200 },
];


// --- MANAGEMENT COMPONENT CONFIG ---

export interface ManagementColumn<T> {
    key: keyof T;
    header: string;
    render?: (item: T) => React.ReactNode;
}
  
export interface ManagementFormField<T> {
    key: keyof T;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'select' | 'image' | 'date';
    required?: boolean;
    options?: { value: string; label: string }[];
}

export const MANAGEMENT_CONFIG = {
    products: {
      columns: [
        { key: 'name', header: 'Name' },
        { key: 'category', header: 'Category' },
        { key: 'brand', header: 'Brand' },
        { key: 'price', header: 'Price', render: (item: Product) => `$${item.price.toFixed(2)}` },
        { 
          key: 'stock', 
          header: 'Stock Level',
          render: (item: Product) => (
            <div className="flex items-center gap-2">
              <span>{item.stock} {item.unit || ''}</span>
              {typeof item.lowStockThreshold !== 'undefined' && item.stock <= item.lowStockThreshold && (
                <span title={`Low stock threshold: ${item.lowStockThreshold}`}>
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                </span>
              )}
            </div>
          )
        },
        { key: 'sku', header: 'SKU' },
      ] as ManagementColumn<Product>[],
      formFields: [
        { key: 'name', label: 'Product Name', type: 'text', required: true },
        { key: 'imageUrl', label: 'Image URL', type: 'text' },
        { key: 'category', label: 'Category', type: 'text', required: true },
        { key: 'brand', label: 'Brand', type: 'text' },
        { key: 'price', label: 'Price', type: 'number', required: true },
        { key: 'stock', label: 'Stock Quantity', type: 'number', required: true },
        { key: 'unit', label: 'Unit (e.g., pcs, kg)', type: 'text' },
        { key: 'lowStockThreshold', label: 'Low Stock Threshold', type: 'number' },
        { key: 'sku', label: 'SKU', type: 'text', required: true },
        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
      ] as ManagementFormField<Product>[],
    },
    customers: {
      columns: [
        { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Phone' },
        { key: 'loyaltyPoints', header: 'Loyalty Points' },
        { key: 'dueAmount', header: 'Due Amount', render: (item: Customer) => `$${item.dueAmount.toFixed(2)}` },
      ] as ManagementColumn<Customer>[],
      formFields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'email', label: 'Email', type: 'email', required: true },
        { key: 'phone', label: 'Phone', type: 'text', required: false },
        { key: 'loyaltyPoints', label: 'Loyalty Points', type: 'number', required: false },
        { key: 'dueAmount', label: 'Due Amount', type: 'number', required: false },
        { key: 'creditLimit', label: 'Credit Limit', type: 'number', required: false },
      ] as ManagementFormField<Customer>[],
    },
    employees: {
      columns: [
          { 
            key: 'name', 
            header: 'Name',
            render: (item: User) => (
              <div className="flex items-center gap-3">
                <img src={item.avatarUrl} alt={item.name} className="w-8 h-8 rounded-full object-cover bg-neutral-200" />
                <span>{item.name}</span>
              </div>
            )
          },
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
      ] as ManagementColumn<User>[],
      formFields: [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'email', label: 'Email', type: 'email', required: true },
          { key: 'password', label: 'Password', type: 'password', required: true },
          { key: 'role', label: 'Role', type: 'select', required: true, options: Object.values(Role).map(role => ({ value: role, label: role })) },
          { key: 'avatarUrl', label: 'Photo', type: 'image', required: false },
      ] as ManagementFormField<User>[],
    },
    suppliers: {
      columns: [
        { key: 'name', header: 'Supplier Name' },
        { key: 'contactPerson', header: 'Contact Person' },
        { key: 'phone', header: 'Phone' },
        { key: 'email', header: 'Email' },
      ] as ManagementColumn<Supplier>[],
      formFields: [
        { key: 'name', label: 'Supplier Name', type: 'text', required: true },
        { key: 'contactPerson', label: 'Contact Person', type: 'text', required: true },
        { key: 'phone', label: 'Phone', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
      ] as ManagementFormField<Supplier>[],
    },
    purchases: {
      columns: [
        { key: 'id', header: 'PO Number' },
        { key: 'supplierName', header: 'Supplier' },
        { key: 'createdAt', header: 'Date', render: (item: PurchaseOrder) => new Date(item.createdAt).toLocaleDateString() },
        { key: 'status', header: 'Status', render: (item: PurchaseOrder) => (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                item.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
            }`}>
                {item.status}
            </span>
        ) },
        { key: 'total', header: 'Total', render: (item: PurchaseOrder) => `$${item.total.toFixed(2)}` },
        { key: 'createdBy', header: 'Created By' },
      ] as ManagementColumn<PurchaseOrder>[],
      formFields: [
        // A simplified form for now. A real one would have a nested item form.
        { key: 'supplierId', label: 'Supplier', type: 'select', required: true, options: [] }, // Options populated dynamically in App.tsx
        { key: 'status', label: 'Status', type: 'select', required: true, options: [{value: 'Pending', label: 'Pending'}, {value: 'Completed', label: 'Completed'}, {value: 'Cancelled', label: 'Cancelled'}] },
        { key: 'total', label: 'Total', type: 'number', required: true },
      ] as ManagementFormField<PurchaseOrder>[],
    },
    expenses: {
        columns: [
            { key: 'date', header: 'Date', render: (item: Expense) => new Date(item.date).toLocaleDateString() },
            { key: 'category', header: 'Category' },
            { key: 'description', header: 'Description' },
            { key: 'amount', header: 'Amount', render: (item: Expense) => `$${item.amount.toFixed(2)}` },
            { key: 'recordedBy', header: 'Recorded By' },
        ] as ManagementColumn<Expense>[],
        formFields: [
            { key: 'date', label: 'Date', type: 'date', required: true },
            { key: 'category', label: 'Category', type: 'text', required: true },
            { key: 'description', label: 'Description', type: 'text' },
            { key: 'amount', label: 'Amount', type: 'number', required: true },
        ] as ManagementFormField<Expense>[],
    }
  };