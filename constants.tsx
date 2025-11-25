
import React from 'react';
import { Role, User, Product, Customer, Sale, ActivityLog, NavItem, LicenseKey, Notification, Supplier, PurchaseOrder, Expense, MasterLicense, Language, Currency, SystemSettings } from './types';

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

const PrinterIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0h9m9 0h-9m9 0a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-13.5a2.25 2.25 0 00-2.25 2.25v7.5a2.25 2.25 0 002.25 2.25m0 0V21h13.5v-2.25" />
    </svg>
);

const GlobeAltIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
);

const KeyboardIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6ZM5.625 10.875a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm3.375 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm3.375 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75ZM5.625 14.625a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm3.375 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm3.375 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm3.375 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75ZM9 18.375a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm3 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Zm3 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75Z" />
    </svg>
);

const BuildingStorefrontIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H4.5A2.25 2.25 0 002.25 13.5V21M3 3h12M3 3v2.25M3 3l9 9M15 3h6m0 0v2.25M15 3l6 6M21 3l-9 9M15 21v-7.5A2.25 2.25 0 0012.75 11.25h-.625a2.25 2.25 0 00-2.25 2.25V21" />
    </svg>
);

const ShieldCheckIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
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
    ArrowUpTrayIcon,
    QrCodeIcon,
    PrinterIcon,
    GlobeAltIcon,
    ChatBubbleLeftRightIcon,
    KeyboardIcon,
    BuildingStorefrontIcon,
    ShieldCheckIcon
};

// --- TRANSLATIONS & CURRENCY ---

export const CURRENCIES: Record<Currency, { symbol: string; rate: number }> = {
    'USD': { symbol: '$', rate: 1 },
    'BDT': { symbol: '৳', rate: 120 },
    'EUR': { symbol: '€', rate: 0.92 },
    'INR': { symbol: '₹', rate: 83 },
};

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
    'en': {
        'Dashboard': 'Dashboard',
        'POS': 'POS',
        'Products': 'Products',
        'Purchases': 'Purchases',
        'Suppliers': 'Suppliers',
        'Customers': 'Customers',
        'Employees': 'Employees',
        'Expenses': 'Expenses',
        'Reports': 'Reports',
        'Settings': 'Settings',
        'Search': 'Search...',
        'Add New': 'Add New',
        'Import CSV': 'Import CSV',
        'Print Labels': 'Print Labels',
        'Total Revenue': 'Total Revenue',
        'New Customers': 'New Customers',
        'Products Sold': 'Products Sold',
        'Todays Transactions': "Today's Transactions",
        'Sales Overview': 'Sales Overview',
        'Top Selling Products': 'Top Selling Products',
        'Low Stock Alerts': 'Low Stock Alerts',
        'AI-Powered Insights': 'AI-Powered Insights',
        'Online': 'Online',
        'Offline': 'Offline',
        'Clock In': 'Clock In',
        'Clock Out': 'Clock Out',
        'Shift Started': 'Shift Started',
        'Current Order': 'Current Order',
        'Held Orders': 'Held Orders',
        'Hold': 'Hold',
        'Charge': 'Charge',
        'Clear Cart': 'Clear Cart',
        'Subtotal': 'Subtotal',
        'Tax': 'Tax',
        'Total': 'Total',
        'Print Receipt': 'Print Receipt',
        'Payment Success': 'Payment Successful',
        'WhatsApp Invoice': 'WhatsApp Invoice',
        'Out of Stock': 'Out of Stock',
        'Stock Limit Exceeded': 'Cannot add more. Stock limit reached.',
    },
    'bn': {
        'Dashboard': 'ড্যাশবোর্ড',
        'POS': 'বিক্রয় (POS)',
        'Products': 'পণ্য তালিকা',
        'Purchases': 'ক্রয়',
        'Suppliers': 'সরবরাহকারী',
        'Customers': 'গ্রাহক',
        'Employees': 'কর্মচারী',
        'Expenses': 'খরচ',
        'Reports': 'রিপোর্ট',
        'Settings': 'সেটিংস',
        'Search': 'অনুসন্ধান...',
        'Add New': 'নতুন যোগ করুন',
        'Import CSV': 'ইম্পোর্ট CSV',
        'Print Labels': 'লেবেল প্রিন্ট',
        'Total Revenue': 'মোট আয়',
        'New Customers': 'নতুন গ্রাহক',
        'Products Sold': 'বিক্রিত পণ্য',
        'Todays Transactions': 'আজকের লেনদেন',
        'Sales Overview': 'বিক্রয় চিত্র',
        'Top Selling Products': 'সেরা বিক্রিত পণ্য',
        'Low Stock Alerts': 'স্টক সতর্কতা',
        'AI-Powered Insights': 'এআই ইনসাইটস',
        'Online': 'অনলাইন',
        'Offline': 'অফলাইন',
        'Clock In': 'শিফট শুরু',
        'Clock Out': 'শিফট শেষ',
        'Shift Started': 'শিফট চলছে',
        'Current Order': 'বর্তমান অর্ডার',
        'Held Orders': 'হোল্ড অর্ডার',
        'Hold': 'হোল্ড',
        'Charge': 'বিল করুন',
        'Clear Cart': 'খালি করুন',
        'Subtotal': 'সাব-টোটাল',
        'Tax': 'ভ্যাট/ট্যাক্স',
        'Total': 'সর্বমোট',
        'Print Receipt': 'রিসিট প্রিন্ট',
        'Payment Success': 'পেমেন্ট সফল হয়েছে',
        'WhatsApp Invoice': 'হোয়াটসঅ্যাপ ইনভয়েস',
        'Out of Stock': 'স্টক শেষ',
        'Stock Limit Exceeded': 'স্টক এর চেয়ে বেশি পণ্য যোগ করা যাবে না',
    }
};

export const DEFAULT_SETTINGS: SystemSettings = {
    language: 'en',
    currency: 'USD',
    taxRate: 8,
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

export const getDefaultWidgetsForRole = (role: Role): Record<string, boolean> => {
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

// --- LICENSE VERIFICATION LOGIC ---

export const LICENSE_VERIFICATION_SECRET = "ZENITH_POS_SECRET_KEY_2025"; // Shared secret for signature generation

// Simple hash function for signature (Simple custom hash for demo purposes)
const generateSignature = (data: string, secret: string) => {
    const text = data + secret;
    let hash = 0, i, chr;
    if (text.length === 0) return hash.toString();
    for (i = 0; i < text.length; i++) {
      chr = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    // Convert to hex and take last 4 chars, ensure positive and padded
    return Math.abs(hash).toString(16).substring(0, 4).toUpperCase().padStart(4, '0');
};

export const validateLicenseKey = (key: string, businessName?: string): { valid: boolean; license?: MasterLicense; error?: string } => {
    // Check for hardcoded keys first (Backward compatibility/Demo)
    if (key === 'ZENITH-SUPER-2025-DEMO') {
         return {
             valid: true,
             license: {
                 key: key,
                 organizationId: 'org_coffee',
                 validUntil: '2025-12-31T23:59:59Z',
                 planType: 'Enterprise',
                 status: 'Active',
                 maxShops: Infinity
             }
         };
    }
    if (key === 'ZENITH-TECH-2025-DEMO') {
         return {
             valid: true,
             license: {
                 key: key,
                 organizationId: 'org_tech',
                 validUntil: '2025-12-31T23:59:59Z',
                 planType: 'Premium',
                 status: 'Active',
                 maxShops: 1
             }
         };
    }

    const parts = key.trim().toUpperCase().split('-');
    
    // Check for OLD format: ZENITH-SERIAL-YEAR-SIG (4 parts)
    // Check for NEW format: ZENITH-TYPE-SERIAL-YEAR-SIG (5 parts)
    
    if (parts.length < 4 || parts[0] !== 'ZENITH') {
        return { valid: false, error: "Invalid key format." };
    }

    let type = 'SINGLE'; // Default for old keys
    let serial = '';
    let year = '';
    let signature = '';
    let dataToSignBase = '';

    if (parts.length === 5) {
        // NEW FORMAT: ZENITH-TYPE-SERIAL-YEAR-SIG
        [, type, serial, year, signature] = parts;
        dataToSignBase = `${parts[0]}-${type}-${serial}-${year}`;
    } else {
        // OLD FORMAT: ZENITH-SERIAL-YEAR-SIG
        [, serial, year, signature] = parts;
        dataToSignBase = `${parts[0]}-${serial}-${year}`;
    }
    
    // Validation logic (Strict Name Binding vs Generic)
    let isValidSignature = false;

    // Method 1: Check with Business Name (Strict)
    let dataToSignStrict = dataToSignBase;
    if (businessName) {
         const cleanName = businessName.trim().toUpperCase().replace(/\s+/g, '');
         dataToSignStrict += `-${cleanName}`;
    }
    
    if (generateSignature(dataToSignStrict, LICENSE_VERIFICATION_SECRET) === signature) {
        isValidSignature = true;
    }

    // Method 2: Check Generic (without name) if strict failed
    if (!isValidSignature) {
        if (generateSignature(dataToSignBase, LICENSE_VERIFICATION_SECRET) === signature) {
            isValidSignature = true;
        }
    }

    if (!isValidSignature) {
        return { valid: false, error: "Invalid license signature." };
    }

    // Check Expiry
    const currentYear = new Date().getFullYear();
    if (parseInt(year) < currentYear) {
        return { valid: false, error: "License key has expired." };
    }

    // Map Type to Plan
    const isMultiShop = type === 'MULTI';
    const planType = isMultiShop ? 'Enterprise' : 'Premium';

    return {
        valid: true,
        license: {
            key: key,
            organizationId: `org_${serial.toLowerCase().replace(/[^a-z0-9]/g, '')}`, // Auto-generate org ID from serial
            validUntil: `${year}-12-31T23:59:59Z`,
            planType: planType,
            status: 'Active',
            maxShops: isMultiShop ? Infinity : 1
        }
    };
};

// Used by LicenseGate.tsx to maintain compatibility with existing Mock array import
export const MOCK_MASTER_LICENSES: MasterLicense[] = [
  // These are kept for reference, but logic now uses validateLicenseKey
  { key: 'ZENITH-SUPER-2025-DEMO', organizationId: 'org_coffee', validUntil: '2025-12-31T23:59:59Z', planType: 'Enterprise', status: 'Active', maxShops: Infinity },
  { key: 'ZENITH-TECH-2025-DEMO', organizationId: 'org_tech', validUntil: '2025-12-31T23:59:59Z', planType: 'Premium', status: 'Active', maxShops: 1 },
];


export const MOCK_USERS: User[] = [
  // Organization 1: Zenith Coffee
  { id: 'u1', name: 'Alex Johnson', email: 'admin1@zenith.com', password: '123', role: Role.Admin, organizationId: 'org_coffee', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', dashboardWidgets: getDefaultWidgetsForRole(Role.Admin), isVerified: true },
  { id: 'u2', name: 'Maria Garcia', email: 'manager@zenith.com', password: '123', role: Role.Manager, organizationId: 'org_coffee', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', dashboardWidgets: getDefaultWidgetsForRole(Role.Manager), isVerified: true },
  { id: 'u3', name: 'David Smith', email: 'cashier@zenith.com', password: '123', role: Role.Cashier, organizationId: 'org_coffee', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', dashboardWidgets: getDefaultWidgetsForRole(Role.Cashier), isVerified: true },
  
  // Organization 2: Tech Zone
  { id: 'u4', name: 'Michael Chen', email: 'admin2@techzone.com', password: '123', role: Role.Admin, organizationId: 'org_tech', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026709d', dashboardWidgets: getDefaultWidgetsForRole(Role.Admin), isVerified: true },
  { id: 'u5', name: 'John Doe', email: 'cashier@techzone.com', password: '123', role: Role.Cashier, organizationId: 'org_tech', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026708d', dashboardWidgets: getDefaultWidgetsForRole(Role.Cashier), isVerified: true },
  
  // Viewer for Org 1
  { id: 'u6', name: 'Sarah Wilson', email: 'viewer@zenith.com', password: '123', role: Role.Viewer, organizationId: 'org_coffee', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', dashboardWidgets: getDefaultWidgetsForRole(Role.Viewer), isVerified: true },
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
    type: 'text' | 'number' | 'email' | 'select' | 'image' | 'date';
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

export const LOYALTY_CONVERSION_RATE = 0.01; // 1 Point = $0.01
export const TRIAL_DURATION_DAYS = 7;
