
import React from 'react';
// FIX: Added ManagementDataType to the import list from ./types.
import { Role, User, Product, Customer, Sale, ActivityLog, NavItem, LicenseKey, Notification, Supplier, PurchaseOrder, Expense, Language, Currency, SystemSettings, MasterLicense, Store, ManagementDataType } from './types';

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
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A11.953 11.953 0 0012 10.5c-2.998 0-5.74-1.1-7.843-2.918" />
  </svg>
);

const ShieldCheckIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
  </svg>
);

const XMarkIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const BuildingStorefrontIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H4.5A2.25 2.25 0 002.25 13.5V21M3 3h12M3 3v2.25M3 3l9 9M15 3h6m0 0v2.25M15 3l6 6M21 3l-9 9M15 21v-7.5A2.25 2.25 0 0012.75 11.25h-.625a2.25 2.25 0 00-2.25 2.25V21" />
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
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 15.375a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zM13.5 18.375a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
  </svg>
);

const WifiIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.136 11.886c3.87-3.87 10.154-3.87 14.024 0M19.5 18a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
);

const CloudIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.357-5.022 3.75 3.75 0 00-6.502-2.327 4.5 4.5 0 00-9 5.25z" />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
);

const ClockIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    ShieldCheckIcon,
    XMarkIcon,
    BuildingStorefrontIcon,
    ArrowUpTrayIcon,
    QrCodeIcon,
    WifiIcon,
    CloudIcon,
    TrashIcon,
    ClockIcon,
};


// --- NAVIGATION ---
export const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', path: 'dashboard', icon: ChartBarIcon, roles: [Role.Admin, Role.Manager, Role.Viewer] },
  { name: 'POS', path: 'pos', icon: ShoppingCartIcon, roles: [Role.Admin, Role.Manager, Role.Cashier] },
  { name: 'Products', path: 'products', icon: CubeIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Customers', path: 'customers', icon: UserGroupIcon, roles: [Role.Admin, Role.Manager, Role.Cashier] },
  { name: 'Credit & Holds', path: 'credit-holds', icon: ClockIcon, roles: [Role.Admin, Role.Manager, Role.Cashier] },
  { name: 'Employees', path: 'employees', icon: UsersIcon, roles: [Role.Admin] },
  { name: 'Suppliers', path: 'suppliers', icon: TruckIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Purchases', path: 'purchases', icon: DocumentChartBarIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Expenses', path: 'expenses', icon: BanknotesIcon, roles: [Role.Admin, Role.Manager] },
  { name: 'Reports', path: 'reports', icon: DocumentChartBarIcon, roles: [Role.Admin, Role.Manager, Role.Viewer] },
  { name: 'Settings', path: 'settings', icon: Cog6ToothIcon, roles: [Role.Admin, Role.Manager, Role.Cashier] },
];

// --- WIDGETS ---
export const WIDGETS_CONFIG = [
  { id: 'totalRevenue', name: 'Total Revenue' },
  { id: 'newCustomers', name: 'New Customers' },
  { id: 'productsSold', name: 'Products Sold' },
  { id: 'todaysTransactions', name: 'Todays Transactions' },
  { id: 'licenseActivations', name: 'License Activations' },
  { id: 'salesOverview', name: 'Sales Overview' },
  { id: 'topProducts', name: 'Top Products' },
  { id: 'recentActivity', name: 'Recent Activity' },
  { id: 'lowStockAlerts', name: 'Low Stock Alerts' },
  { id: 'aiInsights', name: 'AI-Powered Insights' },
];

export const getDefaultWidgetsForRole = (role: Role): Record<string, boolean> => {
    switch(role) {
        case Role.Admin:
            return { totalRevenue: true, newCustomers: true, productsSold: true, todaysTransactions: true, salesOverview: true, topProducts: true, recentActivity: true, lowStockAlerts: true, aiInsights: true, licenseActivations: true };
        case Role.Manager:
            return { totalRevenue: true, productsSold: true, salesOverview: true, topProducts: true, recentActivity: true, lowStockAlerts: true };
        case Role.Cashier:
            return { todaysTransactions: true, productsSold: true, lowStockAlerts: true };
        case Role.Viewer:
             return { totalRevenue: true, salesOverview: true, topProducts: true };
        default:
            return {};
    }
};

// --- MANAGEMENT UI CONFIGURATION ---
export type ManagementColumn<T> = {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
};

export type ManagementFormField<T> = {
  key: keyof T;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'email' | 'password' | 'image';
  required?: boolean;
  options?: { value: string; label: string }[];
};

export const MANAGEMENT_CONFIG: { [key in ManagementDataType]: { columns: ManagementColumn<any>[], formFields: ManagementFormField<any>[] }} = {
    products: {
        columns: [
            { key: 'imageUrl', header: 'Image', render: (item: Product) => <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-md object-cover" /> },
            { key: 'name', header: 'Name' },
            { key: 'sku', header: 'SKU' },
            { key: 'category', header: 'Category' },
            { key: 'price', header: 'Price', render: (item: Product) => `$${item.price.toFixed(2)}` },
            { key: 'stock', header: 'Stock' },
        ],
        formFields: [
            { key: 'name', label: 'Product Name', type: 'text', required: true },
            { key: 'sku', label: 'SKU (Stock Keeping Unit)', type: 'text', required: true },
            { key: 'price', label: 'Price', type: 'number', required: true },
            { key: 'stock', label: 'Stock Quantity', type: 'number', required: true },
            { key: 'category', label: 'Category', type: 'text' },
            { key: 'brand', label: 'Brand', type: 'text' },
            { key: 'unit', label: 'Unit (e.g., kg, pc)', type: 'text' },
            { key: 'lowStockThreshold', label: 'Low Stock Alert Threshold', type: 'number' },
            { key: 'imageUrl', label: 'Product Image', type: 'image' },
        ]
    },
    customers: {
        columns: [
            { key: 'name', header: 'Name' },
            { key: 'phone', header: 'Phone' },
            { key: 'email', header: 'Email' },
            { key: 'loyaltyPoints', header: 'Loyalty Points' },
            { key: 'dueAmount', header: 'Due Amount', render: (item: Customer) => `$${item.dueAmount.toFixed(2)}` },
        ],
        formFields: [
            { key: 'name', label: 'Customer Name', type: 'text', required: true },
            { key: 'phone', label: 'Phone Number', type: 'text', required: true },
            { key: 'email', label: 'Email Address', type: 'email' },
            { key: 'creditLimit', label: 'Credit Limit', type: 'number' },
        ]
    },
    employees: {
        columns: [
            { key: 'avatarUrl', header: 'Avatar', render: (item: User) => <img src={item.avatarUrl} alt={item.name} className="w-10 h-10 rounded-full object-cover" /> },
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
        ],
        formFields: [
            { key: 'name', label: 'Full Name', type: 'text', required: true },
            { key: 'email', label: 'Email Address', type: 'email', required: true },
            { key: 'password', label: 'Password', type: 'password', required: true },
            { key: 'role', label: 'Role', type: 'select', required: true, options: Object.values(Role).map(r => ({ value: r, label: r })) },
            { key: 'avatarUrl', label: 'Avatar Image', type: 'image' },
        ]
    },
    suppliers: {
        columns: [
            { key: 'name', header: 'Supplier Name' },
            { key: 'contactPerson', header: 'Contact Person' },
            { key: 'phone', header: 'Phone' },
            { key: 'email', header: 'Email' },
        ],
        formFields: [
            { key: 'name', label: 'Supplier Name', type: 'text', required: true },
            { key: 'contactPerson', label: 'Contact Person', type: 'text' },
            { key: 'phone', label: 'Phone Number', type: 'text', required: true },
            { key: 'email', label: 'Email Address', type: 'email' },
        ]
    },
    purchases: {
        columns: [
            { key: 'id', header: 'Order ID' },
            { key: 'supplierName', header: 'Supplier' },
            { key: 'createdAt', header: 'Date', render: (item: PurchaseOrder) => new Date(item.createdAt).toLocaleDateString() },
            { key: 'total', header: 'Total', render: (item: PurchaseOrder) => `$${item.total.toFixed(2)}` },
            { key: 'status', header: 'Status' },
        ],
        formFields: [
            { key: 'supplierId', label: 'Supplier', type: 'select', required: true, options: [] }, // Options populated dynamically
            { key: 'status', label: 'Status', type: 'select', required: true, options: [{value: 'Pending', label: 'Pending'}, {value: 'Completed', label: 'Completed'}] },
        ]
    },
    expenses: {
        columns: [
            { key: 'date', header: 'Date', render: (item: Expense) => new Date(item.date).toLocaleDateString() },
            { key: 'category', header: 'Category' },
            { key: 'description', header: 'Description' },
            { key: 'amount', header: 'Amount', render: (item: Expense) => `$${item.amount.toFixed(2)}` },
            { key: 'recordedBy', header: 'Recorded By' },
        ],
        formFields: [
            { key: 'date', label: 'Date', type: 'date', required: true },
            { key: 'category', label: 'Category', type: 'text', required: true },
            { key: 'description', label: 'Description', type: 'text' },
            { key: 'amount', label: 'Amount', type: 'number', required: true },
        ]
    }
};


// --- MOCK DATA ---
// NOTE: This data is used for initial setup or offline mode.
// It gets overwritten by data loaded from localStorage if available.

export const MOCK_STORES: Store[] = [
    { id: 'store_1', name: 'Main Branch', location: 'New York', organizationId: 'org_trial' },
    { id: 'store_2', name: 'Downtown Satellite', location: 'Los Angeles', organizationId: 'org_trial' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Zia Uddin', email: 'ziauddin537000@gmail.com', password: 'admin', role: Role.Admin, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', dashboardWidgets: getDefaultWidgetsForRole(Role.Admin), organizationId: 'org_trial', storeAccess: ['all'] },
  { id: 'u2', name: 'Jane Smith', email: 'manager@example.com', password: 'password', role: Role.Manager, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', dashboardWidgets: getDefaultWidgetsForRole(Role.Manager), organizationId: 'org_trial', storeAccess: ['store_1'] },
  { id: 'u3', name: 'Mike Johnson', email: 'cashier@example.com', password: 'password', role: Role.Cashier, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', dashboardWidgets: getDefaultWidgetsForRole(Role.Cashier), organizationId: 'org_trial', storeAccess: ['store_2'] },
  { id: 'u4', name: 'Emily Davis', email: 'viewer@example.com', password: 'password', role: Role.Viewer, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704g', dashboardWidgets: getDefaultWidgetsForRole(Role.Viewer), organizationId: 'org_trial', storeAccess: ['all'] },
  { id: 'superadmin', name: 'Super Admin', email: 'superadmin@zenith.com', password: 'superadmin123!', role: Role.Admin, avatarUrl: 'https://i.pravatar.cc/150?u=superadmin', dashboardWidgets: {}, storeAccess: ['all'] },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Zenith Signature Coffee Beans', category: 'Coffee', price: 18.99, stock: 120, sku: 'ZCB-001', brand: 'Zenith', unit: 'kg', lowStockThreshold: 20, imageUrl: 'https://images.unsplash.com/photo-1559440618-b54a44186c34?q=80&w=2070&auto=format&fit=crop', organizationId: 'org_trial', storeId: 'store_1' },
  { id: 'p2', name: 'Artisan Sourdough Bread', category: 'Bakery', price: 6.50, stock: 35, sku: 'ASB-002', brand: 'Local Bakery', unit: 'loaf', lowStockThreshold: 10, imageUrl: 'https://images.unsplash.com/photo-1534623225019-160876432831?q=80&w=2070&auto=format&fit=crop', organizationId: 'org_trial', storeId: 'store_1' },
  { id: 'p3', name: 'Organic Green Tea', category: 'Tea', price: 12.00, stock: 80, sku: 'OGT-003', brand: 'PureLeaf', unit: 'box', lowStockThreshold: 15, imageUrl: 'https://images.unsplash.com/photo-1627435601361-ec25f2b74413?q=80&w=1965&auto=format&fit=crop', organizationId: 'org_trial', storeId: 'store_2' },
  { id: 'p4', name: 'Stainless Steel Water Bottle', category: 'Merchandise', price: 25.00, stock: 50, sku: 'SSWB-004', brand: 'Zenith', unit: 'pc', lowStockThreshold: 5, imageUrl: 'https://images.unsplash.com/photo-1610399432243-c36314f8a1d7?q=80&w=1974&auto=format&fit=crop', organizationId: 'org_trial', storeId: 'store_2' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Alice Williams', phone: '555-0101', email: 'alice@example.com', loyaltyPoints: 250, dueAmount: 55.20, creditLimit: 200, organizationId: 'org_trial', storeId: 'store_1' },
  { id: 'c2', name: 'Bob Brown', phone: '555-0102', email: 'bob@example.com', loyaltyPoints: 120, dueAmount: 0.00, organizationId: 'org_trial', storeId: 'store_2' },
];

export const MOCK_SALES_DATA: Sale[] = [
  { id: 's1', date: '2023-10-26T10:00:00Z', total: 42.99, cashier: 'Mike Johnson', cashierId: 'u3', items: 2, customerId: 'c1', customerName: 'Alice Williams', amountPaid: 42.99, paymentMethod: 'Card', organizationId: 'org_trial', storeId: 'store_2' },
  { id: 's2', date: '2023-10-26T11:30:00Z', total: 12.50, cashier: 'Mike Johnson', cashierId: 'u3', items: 1, customerId: 'guest', customerName: 'Guest', amountPaid: 15.00, paymentMethod: 'Cash', organizationId: 'org_trial', storeId: 'store_2' },
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
  { name: 'Coffee Beans', value: 400 },
  { name: 'Sourdough Bread', value: 300 },
  { name: 'Green Tea', value: 300 },
  { name: 'Water Bottle', value: 200 },
];

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
    { id: 'al1', user: 'Zia Uddin', action: 'updated system settings', timestamp: '2023-10-27T14:30:00Z' },
    { id: 'al2', user: 'Jane Smith', action: 'added a new product "Croissant"', timestamp: '2023-10-27T14:00:00Z' },
    { id: 'al3', user: 'Mike Johnson', action: 'processed sale #s2', timestamp: '2023-10-27T13:45:00Z' },
];

export const MOCK_LICENSE_KEYS: LicenseKey[] = [
    {id: 'lk1', key: 'DEV-AB12CD', assignedToUserId: 'u3', assignedToUserName: 'Mike Johnson', status: 'Active', validity: 'Lifetime', deviceName: 'Main Counter', organizationId: 'org_trial', storeId: 'store_1'},
    {id: 'lk2', key: 'DEV-EF45GH', assignedToUserId: '', assignedToUserName: 'Unassigned', status: 'Revoked', validity: 'Lifetime', deviceName: 'Warehouse Tablet', organizationId: 'org_trial', storeId: 'store_2'},
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n1', title: 'Low Stock Alert', message: 'Zenith Signature Coffee Beans are running low (15 left).', timestamp: new Date().toISOString(), read: false, link: 'products' },
    { id: 'n2', title: 'New Feature', message: 'AI-Powered Insights are now available on your dashboard!', timestamp: new Date(Date.now() - 3600000).toISOString(), read: true },
];

export const MOCK_SUPPLIERS: Supplier[] = [
    { id: 'sup1', name: 'Global Coffee Importers', contactPerson: 'John Doe', phone: '123-456-7890', email: 'j.doe@gci.com', organizationId: 'org_trial', storeId: 'store_1' },
    { id: 'sup2', name: 'Artisan Bakery Co-op', contactPerson: 'Mary Jane', phone: '987-654-3210', email: 'mary@abcoop.com', organizationId: 'org_trial', storeId: 'store_2' },
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
    { id: 'po1', supplierId: 'sup1', supplierName: 'Global Coffee Importers', status: 'Completed', items: [{productId: 'p1', productName: 'Coffee', quantity: 50, cost: 10}], total: 500, createdAt: new Date().toISOString(), createdBy: 'Jane Smith', organizationId: 'org_trial', storeId: 'store_1' },
    { id: 'po2', supplierId: 'sup2', supplierName: 'Artisan Bakery Co-op', status: 'Pending', items: [], total: 150, createdAt: new Date().toISOString(), createdBy: 'Jane Smith', organizationId: 'org_trial', storeId: 'store_2' }
];

export const MOCK_EXPENSES: Expense[] = [
    { id: 'e1', category: 'Rent', description: 'October Rent', amount: 1500, date: new Date().toISOString(), recordedBy: 'Zia Uddin', organizationId: 'org_trial', storeId: 'store_1' },
    { id: 'e2', category: 'Utilities', description: 'Electricity Bill', amount: 250, date: new Date().toISOString(), recordedBy: 'Zia Uddin', organizationId: 'org_trial', storeId: 'store_2' },
];

// --- SYSTEM SETTINGS & CONSTANTS ---
export const TRIAL_DURATION_DAYS = 7;
export const LOYALTY_CONVERSION_RATE = 0.01; // 100 points = $1

// --- LOCALIZATION ---
export const TRANSLATIONS: Record<Language, Record<string, string>> = {
    en: {
        'Dashboard': 'Dashboard',
        'POS': 'POS',
        'Products': 'Products',
        'Customers': 'Customers',
        'Credit & Holds': 'Credit & Holds',
        'Employees': 'Employees',
        'Suppliers': 'Suppliers',
        'Purchases': 'Purchases',
        'Expenses': 'Expenses',
        'Reports': 'Reports',
        'Settings': 'Settings',
        'Total Revenue': 'Total Revenue',
        'New Customers': 'New Customers',
        'Products Sold': 'Products Sold',
        'Todays Transactions': 'Todays Transactions',
        'Shift Started': 'Shift Started',
        'Online': 'Online',
        'Offline': 'Offline',
        'Clock Out': 'Clock Out',
        'Clock In': 'Clock In',
        'Search': 'Search or Scan Barcode...',
        'Current Order': 'Current Order',
        'Hold': 'Hold',
        'Clear Cart': 'Clear Cart',
        'Subtotal': 'Subtotal',
        'Tax': 'Tax',
        'Total': 'Total',
        'Charge': 'Charge',
        'Payment Success': 'Payment Success',
        'Out of Stock': 'Out of Stock!',
        'Stock Limit Exceeded': 'Stock limit for this item has been reached!',
        'Manage Products': 'Manage Products',
        'Manage Customers': 'Manage Customers',
        'Manage Employees': 'Manage Employees',
        'Manage Suppliers': 'Manage Suppliers',
        'Manage Purchases': 'Manage Purchases',
        'Manage Expenses': 'Manage Expenses',
        'Add New': 'Add New',
        'Import CSV': 'Import CSV',
        'Print Labels': 'Print Labels',
        'System User Guide': 'System User Guide',
        'Guide Intro': 'Welcome to the Zenith POS User Guide. This guide will help you understand and use all the features of the system effectively. Click on any section below to expand it.',
        'guide_title_1': 'Dashboard & Analytics',
        'guide_content_1': "The Dashboard provides a real-time overview of your business. \n- **Summary Cards:** Quick stats like Total Revenue, New Customers, etc.\n- **Charts:** Visualize your Sales Overview and Top Selling Products.\n- **AI Insights:** (Premium/Enterprise Plan) Ask business-related questions and get data-driven advice from our AI assistant.\n- **Low Stock Alerts:** Instantly see products that are running low based on the threshold you set.\n- **Customize:** Click the 'Customize' button to show or hide widgets based on your role and preference.",
        'guide_title_2': 'Point of Sale (POS)',
        'guide_content_2': "The POS screen is designed for fast and efficient checkouts.\n- **Product Search:** Use the search bar or a barcode scanner to find products quickly.\n- **Cart Management:** Click on products to add them to the cart. Adjust quantity or apply item-specific discounts using the tag icon.\n- **Customer:** Add a new customer or search for an existing one. This is required for credit sales.\n- **Hold/Resume:** Use the 'Hold' button to save a cart for later. Resume it from the clock icon.\n- **Payment:** Click 'Charge' to open the payment modal. You can accept Cash, Card, or assign the sale to a customer's credit.\n- **Stock Update:** After each successful sale, the stock levels of the sold products are automatically updated.",
        'guide_title_3': 'Data Management (Products, Customers, etc.)',
        'guide_content_3': "The Management section allows you to handle all your core business data.\n- **View & Edit:** Click on any management tab (e.g., Products) to see a list of all items.\n- **Add New:** Use the 'Add New' button to create a new entry.\n- **Delete:** Select items using the checkboxes and use the 'Delete Selected' button, or delete individual items from the actions column.\n- **Import CSV:** For products, you can bulk-upload your inventory using a CSV file. The format should be: Name,Price,Stock,Category,SKU.\n- **Print Labels:** Select products and click 'Print Labels' to generate barcode labels for them.",
        'guide_title_4': 'Multi-Store Management (Enterprise Plan)',
        'guide_content_4': "Zenith POS allows you to manage multiple branches from a single account.\n- **Switching Stores:** Click on your profile icon in the top-right header. A dropdown menu will appear allowing you to select a specific store or the 'All Stores (Global View)'.\n- **Global View:** Shows combined data and analytics from all your branches.\n- **Store View:** Filters all data (Dashboard, POS, Management) to show information for the selected store only.\n- **Adding Employees:** You must select a specific store view before you can add a new employee. They will be automatically assigned to that store.\n- **Managing Stores:** As an Admin, you can add or delete stores from the 'Store Management' card in the Settings page.",
        'guide_title_5': 'Profile & Security',
        'guide_content_5': "Manage your personal account details and security settings.\n- **Profile:** Update your name, profile picture, and phone number. Your phone number is important for account recovery.\n- **Password:** Change your password by providing your current and new password. For security, we recommend changing it periodically.",
        'guide_title_6': 'License & Activation',
        'guide_content_6': "This section is for Admins to manage the system's license.\n- **Master License:** View your current plan, status, and expiry date. You can update your license with a new key here.\n- **Trial Mode:** If you are on a trial, this section will allow you to enter a key to activate the full version. Activating from trial will reset demo data.\n- **Deactivate:** You can deactivate the license on the current device. This will log you out and require you to activate the software again.\n- **Device Keys:** Generate and manage keys for other POS terminals in your store.",
        'guide_title_7': 'System Settings',
        'guide_content_7': "Configure system-wide settings for your business.\n- **Localization:** Change the application's language (English/Bangla) and default currency.\n- **Business Config:** Set your business name and default tax rate. You can also upload a business logo which will appear on the header and receipts.\n- **Data Management:** It is highly recommended to periodically back up your data. Use the 'Backup Data' button to download a file containing all your important information. You can restore from this file using the 'Restore Data' button.",
        'guide_title_8': 'Reports',
        'guide_content_8': "Analyze your business performance with detailed reports.\n- **Filters:** Use the filters at the top to narrow down your sales data by date range, cashier, or customer.\n- **Summary:** Get quick insights with summary cards for total revenue, transactions, and average sale value.\n- **Chart:** The sales trend chart visualizes your performance over the selected period.\n- **Transaction List:** See a detailed list of all sales that match your filters.\n- **Export:** Export the filtered report data to a CSV or XLSX file for accounting or further analysis.",
        'Close Guide': 'Close Guide',
        'Shift Started Notification': 'You have successfully clocked in.',
        'Shift Ended Notification': 'You have successfully clocked out.',
        'Shift Update': 'Shift Update',
        'Low Stock Alert': 'Low Stock Alert',
        'is running low': 'is running low',
    },
    bn: {
        'Dashboard': 'ড্যাশবোর্ড',
        'POS': 'বিক্রয় কেন্দ্র',
        'Products': 'পণ্য',
        'Customers': 'গ্রাহক',
        'Credit & Holds': 'বাকি ও স্থগিত',
        'Employees': 'কর্মচারী',
        'Suppliers': 'সরবরাহকারী',
        'Purchases': 'ক্রয়',
        'Expenses': 'খরচ',
        'Reports': 'রিপোর্ট',
        'Settings': 'সেটিংস',
        'Total Revenue': 'মোট আয়',
        'New Customers': 'নতুন গ্রাহক',
        'Products Sold': 'বিক্রিত পণ্য',
        'Todays Transactions': 'আজকের লেনদেন',
        'Shift Started': 'শিফট শুরু হয়েছে',
        'Online': 'অনলাইন',
        'Offline': 'অফলাইন',
        'Clock Out': 'ক্লক আউট',
        'Clock In': 'ক্লক ইন',
        'Search': 'পণ্য খুঁজুন বা স্ক্যান করুন...',
        'Current Order': 'বর্তমান অর্ডার',
        'Hold': 'হোল্ড',
        'Clear Cart': 'কার্ট খালি করুন',
        'Subtotal': 'উপমোট',
        'Tax': 'কর',
        'Total': 'সর্বমোট',
        'Charge': 'চার্জ',
        'Payment Success': 'পেমেন্ট সফল',
        'Out of Stock': 'স্টক শেষ!',
        'Stock Limit Exceeded': 'এই পণ্যের স্টক সীমা পৌঁছে গেছে!',
        'Manage Products': 'পণ্য পরিচালনা',
        'Manage Customers': 'গ্রাহক পরিচালনা',
        'Manage Employees': 'কর্মচারী পরিচালনা',
        'Manage Suppliers': 'সরবরাহকারী পরিচালনা',
        'Manage Purchases': 'ক্রয় পরিচালনা',
        'Manage Expenses': 'খরচ পরিচালনা',
        'Add New': 'নতুন যোগ করুন',
        'Import CSV': 'CSV ইম্পোর্ট',
        'Print Labels': 'লেবেল প্রিন্ট',
        'System User Guide': 'সিস্টেম ব্যবহারকারী নির্দেশিকা',
        'Guide Intro': 'Zenith POS ব্যবহারকারী নির্দেশিকাতে স্বাগতম। এই গাইডটি আপনাকে সিস্টেমের সমস্ত ফিচার কার্যকরভাবে বুঝতে এবং ব্যবহার করতে সাহায্য করবে। বিস্তারিত জানতে নিচের যেকোনো বিভাগে ক্লিক করুন।',
        'guide_title_1': 'ড্যাশবোর্ড ও অ্যানালিটিক্স',
        'guide_content_1': "ড্যাশবোর্ড আপনার ব্যবসার একটি রিয়েল-টাইম চিত্র প্রদান করে।\n- **সারাংশ কার্ড:** মোট আয়, নতুন গ্রাহক ইত্যাদির মতো দ্রুত পরিসংখ্যান দেখুন।\n- **চার্ট:** আপনার বিক্রয়ের ওভারভিউ এবং সর্বাধিক বিক্রিত পণ্যগুলো দেখুন।\n- **AI ইনসাইটস:** (প্রিমিয়াম/এন্টারপ্রাইজ প্ল্যান) ব্যবসা-সম্পর্কিত প্রশ্ন জিজ্ঞাসা করুন এবং আমাদের AI সহকারীর কাছ থেকে ডেটা-ভিত্তিক পরামর্শ পান।\n- **স্টক সতর্কতা:** আপনার সেট করা থ্রেশহোল্ড অনুযায়ী যে পণ্যগুলো কমে যাচ্ছে তা সঙ্গে সঙ্গে দেখুন।\n- **কাস্টমাইজ:** আপনার ভূমিকা এবং পছন্দ অনুযায়ী উইজেট দেখাতে বা লুকাতে 'কাস্টমাইজ' বাটনে ক্লিক করুন।",
        'guide_title_2': 'পয়েন্ট অফ সেল (POS)',
        'guide_content_2': "POS স্ক্রিনটি দ্রুত এবং কার্যকর চেকআউটের জন্য ডিজাইন করা হয়েছে।\n- **পণ্য অনুসন্ধান:** সার্চ বার বা বারকোড স্ক্যানার ব্যবহার করে দ্রুত পণ্য খুঁজুন।\n- **কার্ট ম্যানেজমেন্ট:** কার্টে পণ্য যোগ করতে পণ্যের উপর ক্লিক করুন। পরিমাণ পরিবর্তন করুন বা ট্যাগ আইকন ব্যবহার করে নির্দিষ্ট পণ্যে ছাড় দিন।\n- **গ্রাহক:** নতুন গ্রাহক যোগ করুন বা বিদ্যমান গ্রাহক খুঁজুন। বাকিতে বিক্রির জন্য এটি আবশ্যক।\n- **হোল্ড/রিজিউম:** একটি কার্ট পরে ব্যবহারের জন্য সংরক্ষণ করতে 'হোল্ড' বাটন ব্যবহার করুন। ঘড়ি আইকন থেকে এটি পুনরায় শুরু করুন।\n- **পেমেন্ট:** পেমেন্ট মডাল খুলতে 'চার্জ' ক্লিক করুন। আপনি নগদ, কার্ড বা গ্রাহকের ক্রেডিটে বিল নিতে পারেন।\n- **স্টক আপডেট:** প্রতিটি সফল বিক্রয়ের পরে, বিক্রি হওয়া পণ্যগুলোর স্টক স্বয়ংক্রিয়ভাবে আপডেট হয়ে যায়।",
        'guide_title_3': 'ডেটা ম্যানেজমেন্ট (পণ্য, গ্রাহক ইত্যাদি)',
        'guide_content_3': "ম্যানেজমেন্ট বিভাগ আপনাকে আপনার সমস্ত মূল ব্যবসায়িক ডেটা পরিচালনা করতে দেয়।\n- **দেখুন ও সম্পাদনা করুন:** সমস্ত আইটেমের তালিকা দেখতে যেকোনো ম্যানেজমেন্ট ট্যাবে (যেমন, পণ্য) ক্লিক করুন।\n- **নতুন যোগ করুন:** একটি নতুন এন্ট্রি তৈরি করতে 'Add New' বাটন ব্যবহার করুন।\n- **حذف করুন:** চেকবক্স ব্যবহার করে আইটেম নির্বাচন করুন এবং 'Delete Selected' বাটন ব্যবহার করুন, অথবা অ্যাকশন কলাম থেকে einzeln আইটেম حذف করুন।\n- **CSV ইম্পোর্ট:** পণ্যের জন্য, আপনি একটি CSV ফাইল ব্যবহার করে আপনার ইনভেন্টরি বাল্ক-আপলোড করতে পারেন। ফরম্যাটটি হবে: Name,Price,Stock,Category,SKU।\n- **লেবেল প্রিন্ট:** বারকোড লেবেল তৈরি করতে পণ্য নির্বাচন করুন এবং 'Print Labels' ক্লিক করুন।",
        'guide_title_4': 'মাল্টি-স্টোর ম্যানেজমেন্ট (এন্টারপ্রাইজ প্ল্যান)',
        'guide_content_4': "Zenith POS আপনাকে একটি অ্যাকাউন্ট থেকে একাধিক শাখা পরিচালনা করতে দেয়।\n- **স্টোর পরিবর্তন:** উপরের ডানদিকের হেডারে আপনার প্রোফাইল আইকনে ক্লিক করুন। একটি ড্রপডাউন মেন্যু আসবে যা আপনাকে একটি নির্দিষ্ট স্টোর বা 'All Stores (Global View)' নির্বাচন করতে দেবে।\n- **গ্লোবাল ভিউ:** আপনার সমস্ত শাখার সম্মিলিত ডেটা এবং অ্যানালিটিক্স দেখায়।\n- **স্টোর ভিউ:** নির্বাচিত স্টোরের জন্য সমস্ত ডেটা (ড্যাশবোর্ড, POS, ম্যানেজমেন্ট) ফিল্টার করে দেখায়।\n- **কর্মচারী যোগ:** নতুন কর্মচারী যোগ করার আগে আপনাকে অবশ্যই একটি নির্দিষ্ট স্টোর ভিউ নির্বাচন করতে হবে। তারা স্বয়ংক্রিয়ভাবে সেই স্টোরে নিযুক্ত হবে।\n- **স্টোর পরিচালনা:** অ্যাডমিন হিসাবে, আপনি সেটিংস পৃষ্ঠার 'Store Management' কার্ড থেকে স্টোর যোগ বা حذف করতে পারেন।",
        'guide_title_5': 'প্রোফাইল ও নিরাপত্তা',
        'guide_content_5': "আপনার ব্যক্তিগত অ্যাকাউন্টের বিবরণ এবং নিরাপত্তা সেটিংস পরিচালনা করুন।\n- **প্রোফাইল:** আপনার নাম, প্রোফাইল ছবি এবং ফোন নম্বর আপডেট করুন। অ্যাকাউন্ট পুনরুদ্ধারের জন্য আপনার ফোন নম্বর গুরুত্বপূর্ণ।\n- **পাসওয়ার্ড:** আপনার বর্তমান এবং নতুন পাসওয়ার্ড প্রদান করে আপনার পাসওয়ার্ড পরিবর্তন করুন। নিরাপত্তার জন্য, আমরা পর্যায়ক্রমে এটি পরিবর্তন করার পরামর্শ দিই।",
        'guide_title_6': 'লাইসেন্স ও অ্যাক্টিভেশন',
        'guide_content_6': "এই বিভাগটি অ্যাডমিনদের জন্য সিস্টেমের লাইসেন্স পরিচালনা করার জন্য।\n- **মাস্টার লাইসেন্স:** আপনার বর্তমান প্ল্যান, স্ট্যাটাস এবং মেয়াদ শেষ হওয়ার তারিখ দেখুন। আপনি এখানে একটি নতুন কী দিয়ে আপনার লাইসেন্স আপডেট করতে পারেন।\n- **ট্রায়াল মোড:** আপনি যদি ট্রায়াল মোডে থাকেন, তবে এই বিভাগটি আপনাকে একটি সম্পূর্ণ লাইসেন্স কী দিয়ে সিস্টেমটি সক্রিয় করার সুযোগ দেবে। ট্রায়াল থেকে সক্রিয় করলে ডেমো ডেটা রিসেট হয়ে যাবে।\n- **নিষ্ক্রিয়করণ:** আপনি বর্তমান ডিভাইস থেকে লাইসেন্সটি নিষ্ক্রিয় করতে পারেন। এটি আপনাকে লগ আউট করে দেবে এবং আপনাকে আবার সফটওয়্যারটি সক্রিয় করতে হবে।\n- **ডিভাইস কী:** আপনার দোকানের অন্যান্য POS টার্মিনালগুলোর জন্য অ্যাক্সেস কী তৈরি এবং পরিচালনা করুন।",
        'guide_title_7': 'সিস্টেম সেটিংস',
        'guide_content_7': "আপনার ব্যবসার জন্য সিস্টেম-ব্যাপী সেটিংস কনফিগার করুন।\n- **স্থানীয়করণ:** অ্যাপ্লিকেশনের ভাষা (ইংরেজি/বাংলা) এবং ডিফল্ট মুদ্রা পরিবর্তন করুন।\n- **ব্যবসা কনফিগারেশন:** আপনার ব্যবসার নাম এবং ডিফল্ট ট্যাক্স রেট সেট করুন। আপনি একটি ব্যবসার লোগোও আপলোড করতে পারেন যা হেডার এবং রসিদে প্রদর্শিত হবে।\n- **ডেটা ম্যানেজমেন্ট:** পর্যায়ক্রমে আপনার ডেটা ব্যাকআপ নেওয়ার জন্য দৃঢ়ভাবে সুপারিশ করা হচ্ছে। আপনার সমস্ত গুরুত্বপূর্ণ তথ্য সম্বলিত একটি ফাইল ডাউনলোড করতে 'Backup Data' বাটন ব্যবহার করুন। আপনি 'Restore Data' বাটন ব্যবহার করে এই ফাইল থেকে পুনরুদ্ধার করতে পারেন।",
        'guide_title_8': 'রিপোর্ট',
        'guide_content_8': "বিস্তারিত রিপোর্টের মাধ্যমে আপনার ব্যবসার পারফরম্যান্স বিশ্লেষণ করুন।\n- **ফিল্টার:** তারিখের পরিসীমা, ক্যাশিয়ার বা গ্রাহক দ্বারা আপনার বিক্রয় ডেটা সংকীর্ণ করতে উপরের ফিল্টারগুলো ব্যবহার করুন।\n- **সারাংশ:** মোট আয়, লেনদেন এবং গড় বিক্রয় মূল্যের জন্য সারাংশ কার্ডগুলোর সাথে দ্রুত অন্তর্দৃষ্টি পান।\n- **চার্ট:** বিক্রয় ট্রেন্ড চার্টটি নির্বাচিত সময়ের মধ্যে আপনার পারফরম্যান্সকে দৃশ্যমান করে।\n- **লেনদেনের তালিকা:** আপনার ফিল্টারের সাথে মিলে যাওয়া সমস্ত বিক্রয়ের একটি বিস্তারিত তালিকা দেখুন।\n- **এক্সপোর্ট:** অ্যাকাউন্টিং বা আরও বিশ্লেষণের জন্য ফিল্টার করা রিপোর্ট ডেটা একটি CSV বা XLSX ফাইলে এক্সপোর্ট করুন।",
        'Close Guide': 'গাইড বন্ধ করুন',
        'Shift Started Notification': 'আপনি সফলভাবে ক্লক ইন করেছেন।',
        'Shift Ended Notification': 'আপনি সফলভাবে ক্লক আউট করেছেন।',
        'Shift Update': 'শিফট আপডেট',
        'Low Stock Alert': 'স্টক সতর্কতা',
        'is running low': 'কমে যাচ্ছে',
    }
};

export const CURRENCIES: Record<Currency, { symbol: string, rate: number }> = {
    'USD': { symbol: '$', rate: 1 },
    'BDT': { symbol: '৳', rate: 117.50 },
    'EUR': { symbol: '€', rate: 0.92 },
    'INR': { symbol: '₹', rate: 83.50 },
};
