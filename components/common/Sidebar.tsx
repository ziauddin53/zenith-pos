
import React from 'react';
import { Role, NavItem } from '../../types';
import { NAV_ITEMS } from '../../constants';

interface SidebarProps {
  userRole: Role;
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  businessName: string;
  businessLogo: string | null;
  t: (key: string) => string;
}

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

export const Sidebar: React.FC<SidebarProps> = ({ userRole, activeView, setActiveView, isOpen, setIsOpen, businessName, businessLogo, t }) => {
  const filteredNavItems = NAV_ITEMS.filter(item => item.roles.includes(userRole));

  const navContent = (
    <nav className="flex-1 px-2 py-4 space-y-2">
      {filteredNavItems.map((item) => (
        <a
          key={item.name}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveView(item.path);
            if (window.innerWidth < 1024) setIsOpen(false);
          }}
          className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
            activeView === item.path
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
          }`}
        >
          <item.icon className="w-5 h-5 mr-3" />
          <span>{t(item.name)}</span>
        </a>
      ))}
    </nav>
  );

  return (
    <>
        <div className={`fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
        <aside className={`fixed lg:relative inset-y-0 left-0 z-50 flex flex-col w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-3">
                    {businessLogo ? 
                        <img src={businessLogo} alt="Business Logo" className="h-10 w-10 object-contain" /> :
                        <BuildingStorefrontIcon className="h-9 w-9 text-primary-600"/>
                    }
                    <span className="text-xl font-bold text-neutral-800 dark:text-neutral-100">{businessName}</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-md text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 lg:hidden">
                    <XMarkIcon className="w-6 h-6"/>
                </button>
            </div>
            {navContent}
        </aside>
    </>
  );
};
