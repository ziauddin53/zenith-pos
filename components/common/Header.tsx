
import React from 'react';
import { User, Notification, Shift } from '../../types';
import { NAV_ITEMS, ICONS } from '../../constants';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  businessName: string;
  businessLogo: string | null;
  activeView: string;
  setActiveView: (view: string) => void;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  activeShift: Shift | null;
  onToggleShift: () => void;
  isOnline: boolean;
  t: (key: string) => string;
  isInTrial?: boolean;
}

// Icons
const SunIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.95-4.243l-1.591 1.591M5.25 12H3m4.243-4.95l1.591-1.591M12 9a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);
const MoonIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75 2.572 0 4.92-.99 6.697-2.648z" />
  </svg>
);
const BellIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);
const Bars3Icon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
const BuildingStorefrontIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H4.5A2.25 2.25 0 002.25 13.5V21M3 3h12M3 3v2.25M3 3l9 9M15 3h6m0 0v2.25M15 3l6 6M21 3l-9 9M15 21v-7.5A2.25 2.25 0 0012.75 11.25h-.625a2.25 2.25 0 00-2.25 2.25V21" />
    </svg>
);
const { WifiIcon, CloudIcon } = ICONS;

export const Header: React.FC<HeaderProps> = ({ user, onLogout, toggleSidebar, isDarkMode, toggleDarkMode, businessName, businessLogo, activeView, setActiveView, notifications, setNotifications, activeShift, onToggleShift, isOnline, t, isInTrial }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    if (notification.link) {
      setActiveView(notification.link);
    }
    setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
    setNotificationsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleProfileClick = () => {
    setActiveView('settings');
    setMenuOpen(false);
  };
  
  const pageTitle = React.useMemo(() => {
    if (activeView === 'dashboard') {
      return businessName;
    }
    const navItem = NAV_ITEMS.find(item => item.path === activeView);
    const viewName = navItem ? navItem.name : activeView.charAt(0).toUpperCase() + activeView.slice(1);
    return t(viewName);
  }, [activeView, businessName, t]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm flex flex-col">
      {isInTrial && (
          <div className="bg-amber-500 text-white text-xs font-bold text-center py-1 flex justify-center items-center gap-2">
              <span>⚠️ 7-DAY FREE TRIAL MODE</span>
              <span className="hidden sm:inline"> - Full features available.</span>
              <button onClick={() => setActiveView('settings')} className="underline hover:text-amber-100 ml-2">Activate Now</button>
          </div>
      )}
      <div className="grid grid-cols-3 items-center h-16 px-4 md:px-6 w-full">
        {/* Left Side */}
        <div className="flex items-center justify-start gap-4">
            <button onClick={toggleSidebar} className="lg:hidden text-neutral-600 dark:text-neutral-300">
                <Bars3Icon className="w-6 h-6"/>
            </button>
             {activeShift && (
                <div className="hidden sm:flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{t('Shift Started')}: {new Date(activeShift.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            )}
        </div>
        
        {/* Center */}
        <div className="flex items-center justify-center gap-2">
            {businessLogo ? 
                <img src={businessLogo} alt="Business Logo" className="h-8 w-8 object-contain" /> :
                <BuildingStorefrontIcon className="h-8 w-8 text-primary-600"/>
            }
            <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 truncate">{pageTitle}</h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-end space-x-2 md:space-x-4">
           {/* Connectivity Status */}
           <div className={`hidden md:flex items-center gap-1.5 px-2 py-1 rounded-full border ${isOnline ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400' : 'border-neutral-200 bg-neutral-50 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'}`}>
               {isOnline ? <WifiIcon className="w-4 h-4" /> : <CloudIcon className="w-4 h-4" />}
               <span className="text-xs font-semibold">{isOnline ? t('Online') : t('Offline')}</span>
           </div>

           <button onClick={onToggleShift} className={`hidden md:block text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${activeShift ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 hover:bg-red-200' : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200'}`}>
              {activeShift ? t('Clock Out') : t('Clock In')}
          </button>
          <button onClick={toggleDarkMode} className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          
          <div className="relative" ref={notificationsRef}>
            <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <BellIcon className="w-6 h-6" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs ring-2 ring-white dark:ring-neutral-900">{unreadCount}</span>}
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-40">
                  <div className="flex justify-between items-center p-3 border-b border-neutral-200 dark:border-neutral-700">
                      <h4 className="font-semibold text-sm">Notifications</h4>
                      <button onClick={handleMarkAllAsRead} className="text-xs text-primary-600 dark:text-primary-400 hover:underline">Mark all as read</button>
                  </div>
                  <ul className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                        <li key={n.id} onClick={() => handleNotificationClick(n)} className={`p-3 border-b border-neutral-100 dark:border-neutral-700/50 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 ${n.link ? 'cursor-pointer' : ''}`}>
                            <div className="flex items-start gap-3">
                                {!n.read && <div className="mt-1.5 w-2 h-2 rounded-full bg-primary-500 flex-shrink-0"></div>}
                                <div className={n.read ? 'pl-5': ''}>
                                    <p className="font-semibold text-sm">{n.title}</p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{n.message}</p>
                                    <p className="text-xs text-neutral-400 mt-1">{new Date(n.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                  </ul>
                  <div className="p-2 text-center border-t border-neutral-200 dark:border-neutral-700">
                      <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">View all notifications</button>
                  </div>
              </div>
            )}
          </div>

          <div className="relative" ref={userMenuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2">
              <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{user.name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{user.role}</p>
              </div>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-40">
                <button onClick={handleProfileClick} className="w-full text-left block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700">Profile</button>
                <button
                  onClick={onLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
