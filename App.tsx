
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import Dashboard from './components/Dashboard';
import { POS } from './components/POS';
import { Management } from './components/Management';
import Reports from './components/Reports';
import GenericView from './components/GenericView';
import Settings from './components/Settings';
import CreditHoldsView from './components/CreditHoldsView'; // Import the new component
import { LicenseGate } from './components/LicenseGate';
import { Auth, AuthView } from './components/Auth';
import VirtualKeyboard from './components/VirtualKeyboard';
import { Role, User, Product, Customer, Sale, LicenseKey, Notification, Supplier, PurchaseOrder, Shift, HeldCart, Expense, MasterLicense, Language, Currency, CartItem, Store } from './types';
import { MOCK_USERS, MOCK_PRODUCTS, MOCK_CUSTOMERS, MOCK_SALES_DATA, MANAGEMENT_CONFIG, MOCK_LICENSE_KEYS, MOCK_NOTIFICATIONS, MOCK_SUPPLIERS, MOCK_PURCHASE_ORDERS, MOCK_EXPENSES, TRANSLATIONS, CURRENCIES, TRIAL_DURATION_DAYS, getDefaultWidgetsForRole, MOCK_STORES, NAV_ITEMS } from './constants';
import { supabase, isSupabaseConfigured } from './supabaseClient'; // Import Supabase Client & Config Flag

// Helper to load from LocalStorage or fall back to Mocks
function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
      console.error(`Error loading ${key} from storage`, e);
      return fallback;
  }
}

// Toast Component for Visual Feedback
const Toast: React.FC<{ message: string; type: 'success' | 'info'; onClose: () => void }> = ({ message, type, onClose }) => (
    <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-xl text-white font-semibold flex items-center gap-3 transition-all transform duration-300 ${type === 'success' ? 'bg-green-600' : 'bg-neutral-800'}`}>
        {type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
        ) : (
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V5zm-.75 9.75a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
        )}
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 hover:text-neutral-300">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
    </div>
);

function App() {
  // License State
  const [activeLicense, setActiveLicense] = useState<MasterLicense | null>(null);
  const [isLoadingLicense, setIsLoadingLicense] = useState(true);
  const [isInTrial, setIsInTrial] = useState(false);
  const [licenseDatabase, setLicenseDatabase] = useState<MasterLicense[]>(() => loadFromStorage('zenith_license_database', []));

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // --- 1. GLOBAL PERSISTENT STATE (Loads from Browser Storage) ---
  const [allStores, setAllStores] = useState<Store[]>(() => loadFromStorage('zenith_stores', MOCK_STORES));
  const [allEmployees, setAllEmployees] = useState<User[]>(() => loadFromStorage('zenith_users', MOCK_USERS));
  const [allProducts, setAllProducts] = useState<Product[]>(() => loadFromStorage('zenith_products', MOCK_PRODUCTS));
  const [allCustomers, setAllCustomers] = useState<Customer[]>(() => loadFromStorage('zenith_customers', MOCK_CUSTOMERS));
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>(() => loadFromStorage('zenith_suppliers', MOCK_SUPPLIERS));
  const [allPurchaseOrders, setAllPurchaseOrders] = useState<PurchaseOrder[]>(() => loadFromStorage('zenith_pos', MOCK_PURCHASE_ORDERS));
  const [allSales, setAllSales] = useState<Sale[]>(() => loadFromStorage('zenith_sales', MOCK_SALES_DATA));
  const [allExpenses, setAllExpenses] = useState<Expense[]>(() => loadFromStorage('zenith_expenses', MOCK_EXPENSES));
  const [allLicenseKeys, setAllLicenseKeys] = useState<LicenseKey[]>(() => loadFromStorage('zenith_licenses', MOCK_LICENSE_KEYS));
  
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeShift, setActiveShift] = useState<Shift | null>(null);
  const [heldCarts, setHeldCarts] = useState<HeldCart[]>([]);
  
  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // App UI State
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [businessName, setBusinessName] = useState('Zenith POS');
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);
  const [activeStoreId, setActiveStoreId] = useState<string>('global'); // 'global' or a store ID
  
  // Language & Currency State
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  
  // Dynamic Tax Rate
  const [taxRate, setTaxRate] = useState<number>(() => {
      const saved = localStorage.getItem('zenith_tax_rate');
      return saved ? Number(saved) : 8; // Default 8%
  });

  // Network State
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // --- 2. PERSISTENCE EFFECTS (Save to Storage on Change) ---
  useEffect(() => localStorage.setItem('zenith_stores', JSON.stringify(allStores)), [allStores]);
  useEffect(() => localStorage.setItem('zenith_users', JSON.stringify(allEmployees)), [allEmployees]);
  useEffect(() => localStorage.setItem('zenith_products', JSON.stringify(allProducts)), [allProducts]);
  useEffect(() => localStorage.setItem('zenith_customers', JSON.stringify(allCustomers)), [allCustomers]);
  useEffect(() => localStorage.setItem('zenith_suppliers', JSON.stringify(allSuppliers)), [allSuppliers]);
  useEffect(() => localStorage.setItem('zenith_pos', JSON.stringify(allPurchaseOrders)), [allPurchaseOrders]);
  useEffect(() => localStorage.setItem('zenith_sales', JSON.stringify(allSales)), [allSales]);
  useEffect(() => localStorage.setItem('zenith_expenses', JSON.stringify(allExpenses)), [allExpenses]);
  useEffect(() => localStorage.setItem('zenith_licenses', JSON.stringify(allLicenseKeys)), [allLicenseKeys]);
  useEffect(() => localStorage.setItem('zenith_license_database', JSON.stringify(licenseDatabase)), [licenseDatabase]);
  useEffect(() => localStorage.setItem('zenith_tax_rate', taxRate.toString()), [taxRate]);
  
  // Persist current user session to avoid logout on refresh
  useEffect(() => {
      if (currentUser) {
          localStorage.setItem('zenith_current_user', JSON.stringify(currentUser));
      } else {
          localStorage.removeItem('zenith_current_user');
      }
  }, [currentUser]);
  
  // CRITICAL FIX: Self-Healing for Legacy Data (Missing storeAccess)
  useEffect(() => {
      // 1. Heal All Employees Data
      if (allEmployees.length > 0) {
          const needsMigration = allEmployees.some(u => !u.storeAccess || !Array.isArray(u.storeAccess));
          if (needsMigration) {
              console.log("Migrating legacy user data: Adding default storeAccess...");
              setAllEmployees(prev => prev.map(u => ({
                  ...u,
                  storeAccess: (Array.isArray(u.storeAccess) && u.storeAccess.length > 0) ? u.storeAccess : ['all'] 
              })));
          }
      }

      // 2. Heal Current Session User (Fixes Immediate Crash)
      if (currentUser && (!currentUser.storeAccess || !Array.isArray(currentUser.storeAccess))) {
          console.log("Healed current user session.");
          setCurrentUser(prev => prev ? ({ ...prev, storeAccess: ['all'] }) : null);
      }
  }, [currentUser, allEmployees.length]); 

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // --- 3. NETWORK & SYNC LISTENERS ---
  useEffect(() => {
      const handleOnline = () => {
          setIsOnline(true);
          setNotifications(prev => [{ id: `n-net-${Date.now()}`, title: 'Back Online', message: 'Connection restored. Syncing data...', timestamp: new Date().toISOString(), read: false }, ...prev]);
      };
      const handleOffline = () => {
          setIsOnline(false);
          setNotifications(prev => [{ id: `n-net-${Date.now()}`, title: 'Offline Mode', message: 'You are offline. Changes will be saved locally.', timestamp: new Date().toISOString(), read: false }, ...prev]);
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
      };
  }, []);

  // --- 4. LICENSE & SESSION CHECK ---
  useEffect(() => {
    const initApp = async () => {
        // A. Load License
        const storedLicense = localStorage.getItem('zenith_master_license');
        let currentLicense: MasterLicense | null = null;

        if (storedLicense) {
            try {
                const parsedLicense = JSON.parse(storedLicense) as MasterLicense;
                if (parsedLicense && parsedLicense.key && parsedLicense.validUntil) {
                    if (new Date(parsedLicense.validUntil) > new Date()) {
                        currentLicense = parsedLicense;
                        setActiveLicense(parsedLicense);
                        setIsInTrial(false);
                    } else {
                        localStorage.removeItem('zenith_master_license'); // Expired
                    }
                }
            } catch (e) {
                localStorage.removeItem('zenith_master_license');
            }
        }

        // B. Load Session (if license exists)
        if (currentLicense) {
            const storedUser = localStorage.getItem('zenith_current_user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    // SECURITY: Re-validate email lock (Case Insensitive)
                    if (currentLicense.emailLock && parsedUser.email.trim().toLowerCase() !== currentLicense.emailLock.trim().toLowerCase()) {
                        // User mismatch with license lock - clear session
                        localStorage.removeItem('zenith_current_user');
                    } else {
                        // Safety Patch for Session User too
                        if (!parsedUser.storeAccess) parsedUser.storeAccess = ['all'];
                        setCurrentUser(parsedUser);
                    }
                } catch(e) {
                     localStorage.removeItem('zenith_current_user');
                }
            }
        }
        
        setIsLoadingLicense(false);
        setIsAuthLoading(false);
    };

    initApp();
  }, []);

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
        try {
            await supabase.auth.signOut();
        } catch (e) {
            console.warn("Supabase signout failed (likely offline)");
        }
    }
    // Only clear the user session, DO NOT clear the license
    setCurrentUser(null);
    localStorage.removeItem('zenith_current_user');
    setActiveView('dashboard');
  };

  const handleDeactivateLicense = () => {
      if(confirm("Are you sure you want to deactivate the license on this device? You will need to enter the license key again.")) {
          setActiveLicense(null);
          setCurrentUser(null);
          localStorage.removeItem('zenith_master_license');
          localStorage.removeItem('zenith_current_user');
          localStorage.removeItem('zenith_trial_start');
          window.location.reload();
      }
  };
  
  const handleUpdateLicense = (newLicenseKey: string) => {
        const foundLicense = licenseDatabase.find(l => l.key === newLicenseKey.trim());
        if (!foundLicense) {
            // No alert, rely on return value for Settings toast
            return false;
        }
        
        // Update local state
        const updatedLicense = {
             ...foundLicense,
             status: 'Activated' as const,
             activationDate: new Date().toISOString(),
             organizationId: activeLicense?.organizationId // Keep org ID same for updates
        };
        
        setActiveLicense(updatedLicense);
        localStorage.setItem('zenith_master_license', JSON.stringify(updatedLicense));
        setIsInTrial(false);
        return true;
  };
  
  const handleLicenseUpdateOrActivation = (key: string, isTrialActivation: boolean) => {
        const foundLicense = licenseDatabase.find(l => l.key === key.trim());

        if (!foundLicense) {
             return false;
        }
        
        if (isTrialActivation) {
             // Full activation from trial - wipes data
             handleLicenseActivation(foundLicense);
             return true;
        } else {
             // Just an update (renewal) - keeps data
             return handleUpdateLicense(key);
        }
  };

  const handleLogin = async (email: string, pass: string) => {
      setAuthError(null);
      const normalizedEmail = email.trim().toLowerCase();
      
      // 1. SUPER ADMIN BYPASS
      if (email === 'superadmin@zenith.com' && pass === 'superadmin123!') {
           const superUser = MOCK_USERS.find(u => u.email === 'superadmin@zenith.com');
           if (superUser) {
               setCurrentUser(superUser);
               setActiveView('settings');
               return;
           }
      }

      // 2. LICENSE CHECK: Enforce email lock
      // If the license is ALREADY locked, we must match it.
      if (activeLicense && activeLicense.emailLock && normalizedEmail !== activeLicense.emailLock.trim().toLowerCase()) {
          setAuthError(`This device is licensed to ${activeLicense.emailLock}. Please log in with that email.`);
          return;
      }
      
      // 3. CHECK LOCAL DB
      // If database is empty (fresh activation), prompt to register
      if (allEmployees.length === 0) {
          setAuthError("No users found. Please Register a new account first.");
          return;
      }

      const storedUser = allEmployees.find(u => u.email.toLowerCase() === normalizedEmail && u.password === pass);
      
      if (storedUser) {
          // --- SELF HEALING LOGIC START ---
          // If the license exists but has NO email lock (Legacy), lock it NOW to this user.
          if (activeLicense && !activeLicense.emailLock) {
               const updatedLicense = { ...activeLicense, emailLock: normalizedEmail };
               
               // 1. Update State
               setActiveLicense(updatedLicense);
               
               // 2. Persist to Local Storage (Crucial for restart)
               localStorage.setItem('zenith_master_license', JSON.stringify(updatedLicense));
               
               // 3. Update the Source of Truth Database
               setLicenseDatabase(prev => prev.map(lic => lic.key === updatedLicense.key ? { ...lic, emailLock: normalizedEmail } : lic));
               
               console.log("Legacy license auto-healed and locked to:", normalizedEmail);
          }
          // --- SELF HEALING LOGIC END ---

          // Safety Check for Store Access
          const safeUser = { ...storedUser, storeAccess: storedUser.storeAccess || ['all'] };
          setCurrentUser(safeUser);
          setActiveView('dashboard');
          return;
      }

      // 4. Try Supabase Auth (Fallback)
      if (isSupabaseConfigured) {
          try {
              const { data, error } = await supabase.auth.signInWithPassword({
                  email,
                  password: pass,
                  options: { captchaToken: undefined }
              });

              if (error) {
                  setAuthError(error.message);
              } else if (data.user) {
                  const mappedUser: User = {
                      id: data.user.id,
                      email: data.user.email || email,
                      name: data.user.user_metadata?.name || email.split('@')[0],
                      password: pass,
                      role: data.user.user_metadata?.role || Role.Admin,
                      avatarUrl: data.user.user_metadata?.avatarUrl || `https://i.pravatar.cc/150?u=${data.user.id}`,
                      dashboardWidgets: getDefaultWidgetsForRole(Role.Admin),
                      organizationId: activeLicense?.organizationId,
                      storeAccess: data.user.user_metadata?.storeAccess || ['all'],
                  };
                  
                  // Update local storage
                  setAllEmployees(prev => {
                      if (!prev.find(u => u.id === mappedUser.id)) {
                          return [...prev, mappedUser];
                      }
                      return prev;
                  });

                  // Apply Self-Healing for Cloud Users too
                  if (activeLicense && !activeLicense.emailLock) {
                        const updatedLicense = { ...activeLicense, emailLock: normalizedEmail };
                        setActiveLicense(updatedLicense);
                        localStorage.setItem('zenith_master_license', JSON.stringify(updatedLicense));
                        setLicenseDatabase(prev => prev.map(lic => lic.key === updatedLicense.key ? { ...lic, emailLock: normalizedEmail } : lic));
                  }

                  setCurrentUser(mappedUser);
                  setActiveView('dashboard');
                  return;
              }
          } catch (err) {
              // Network error
          }
      }
      
      setAuthError("Invalid email or password.");
  };

  const handleInitiateRegister = async (name: string, email: string, pass: string) => {
      if (!activeLicense || !activeLicense.organizationId) {
          setAuthError("Cannot register without an active license.");
          return;
      }

      const normalizedEmail = email.trim().toLowerCase();

      // SECURITY CHECK: Prevent new registrations if the device is already locked to a different email.
      if (activeLicense.emailLock && normalizedEmail !== activeLicense.emailLock.trim().toLowerCase()) {
          setAuthError(`This software is already activated for ${activeLicense.emailLock}. You cannot register a new account.`);
          return;
      }

      if (allEmployees.find(u => u.email.toLowerCase() === normalizedEmail)) {
            setAuthError("This email is already registered locally. Please Login.");
            return;
      }

      setAuthError(null);

      // Create Local User IMMEDIATELY
      const newUser: User = {
          id: `u${Date.now()}`,
          name,
          email, 
          password: pass,
          role: Role.Admin,
          avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
          dashboardWidgets: getDefaultWidgetsForRole(Role.Admin),
          organizationId: activeLicense.organizationId,
          isVerified: true,
          storeAccess: ['all'] // First admin gets access to all stores
      };

      setAllEmployees(prev => [...prev, newUser]);
      
      // SELF HEALING FOR REGISTRATION
      if (activeLicense && !activeLicense.emailLock) {
            const updatedLicense = { ...activeLicense, emailLock: normalizedEmail };
            setActiveLicense(updatedLicense);
            localStorage.setItem('zenith_master_license', JSON.stringify(updatedLicense));
            setLicenseDatabase(prev => prev.map(lic => lic.key === updatedLicense.key ? { ...lic, emailLock: normalizedEmail } : lic));
      }

      if (isSupabaseConfigured) {
          try {
              supabase.auth.signUp({
                  email,
                  password: pass,
                  options: {
                      data: {
                          name,
                          role: Role.Admin,
                          organizationId: activeLicense.organizationId,
                      }
                  }
              });
          } catch (err) {
              console.warn("Cloud registration skipped.");
          }
      }

      setCurrentUser(newUser);
      setActiveView('dashboard');
      alert("Account created successfully! You are now logged in.");
  };

  const handleInitiateForgotPassword = async (email: string) => {
      if (!isSupabaseConfigured) {
          setAuthError("Password reset is not available in offline/demo mode.");
          return;
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
      if (error) setAuthError(error.message);
      else alert("Password reset link sent to your email.");
  };
  
  const handleResetPassword = async (password: string) => {
      if (!isSupabaseConfigured) return;
      const { error } = await supabase.auth.updateUser({ password });
      if (error) alert(error.message);
      else alert("Password updated successfully!");
  };

  const handleUpdateCurrentUser = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    setAllEmployees(prev => prev.map(emp => emp.id === currentUser.id ? { ...emp, ...updatedData } : emp));
  };


  const handleLicenseActivation = (licenseToActivate: MasterLicense) => {
    const organizationId = `org_${licenseToActivate.key.split('-')[2].toLowerCase()}`;
    const activatedLicense: MasterLicense = {
        ...licenseToActivate,
        status: 'Activated',
        activationDate: new Date().toISOString(),
        organizationId: organizationId,
    };
    
    // Update the central database mock
    setLicenseDatabase(prevDb => 
        prevDb.map(lic => lic.key === activatedLicense.key ? activatedLicense : lic)
    );

    localStorage.setItem('zenith_master_license', JSON.stringify(activatedLicense));
    localStorage.removeItem('zenith_trial_start');

    // WIPE ALL DEMO DATA ON ACTIVATION
    setAllStores([]);
    setAllProducts([]);
    setAllCustomers([]);
    setAllSuppliers([]);
    setAllPurchaseOrders([]);
    setAllSales([]);
    setAllExpenses([]);
    setAllLicenseKeys([]);
    setAllEmployees([]); // This clears users, so user MUST register next.

    // Clear Storage
    localStorage.removeItem('zenith_stores');
    localStorage.removeItem('zenith_products');
    localStorage.removeItem('zenith_customers');
    localStorage.removeItem('zenith_suppliers');
    localStorage.removeItem('zenith_pos');
    localStorage.removeItem('zenith_sales');
    localStorage.removeItem('zenith_expenses');
    localStorage.removeItem('zenith_licenses');
    localStorage.removeItem('zenith_users');
    
    setActiveLicense(activatedLicense);
    setIsInTrial(false);
    
    // IMPORTANT: Clear current user to force Auth screen
    setCurrentUser(null);
    localStorage.removeItem('zenith_current_user');
  };

  const handleStartTrial = () => {
      let start = localStorage.getItem('zenith_trial_start');
      if (!start) {
          start = new Date().toISOString();
          localStorage.setItem('zenith_trial_start', start);
      }

      const startDate = new Date(start);
      const diffDays = Math.ceil(Math.abs(new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays > TRIAL_DURATION_DAYS) {
          alert("Your trial period has expired. Please enter a valid license key to continue.");
          return;
      }

      setIsInTrial(true);
      
      const trialLicense: MasterLicense = {
          key: 'TRIAL',
          organizationId: 'org_trial', 
          validUntil: new Date(startDate.getTime() + (TRIAL_DURATION_DAYS * 86400000)).toISOString(),
          planType: 'Premium',
          status: 'Activated',
          activationDate: new Date().toISOString(),
          maxShops: 1,
          enabledFeatures: ['AI_INSIGHTS', 'MULTI_LANGUAGE']
      };
      setActiveLicense(trialLicense);
  };

  // --- HELPERS ---
  const t = React.useCallback((key: string): string => {
      return TRANSLATIONS[language]?.[key] || key;
  }, [language]);

  const handleToggleShift = () => {
    if (!currentUser) return;
    const now = new Date();
    
    if (activeShift) {
        // Clock Out
        setActiveShift(null);
        // Add Notification
        const msg = `${t('Shift Ended Notification')} (${now.toLocaleTimeString()})`;
        const notif: Notification = {
            id: `n-shift-${Date.now()}`,
            title: t('Shift Update'),
            message: msg,
            timestamp: now.toISOString(),
            read: false
        };
        setNotifications(prev => [notif, ...prev]);
        setToast({ message: t('Shift Ended Notification'), type: 'info' });
    } else {
        // Clock In
        const newShift: Shift = {
            id: `sh${Date.now()}`,
            userId: currentUser.id,
            userName: currentUser.name,
            startTime: now.toISOString(),
            endTime: null
        };
        setActiveShift(newShift);
        // Add Notification
        const msg = `${t('Shift Started Notification')} (${now.toLocaleTimeString()})`;
        const notif: Notification = {
            id: `n-shift-${Date.now()}`,
            title: t('Shift Update'),
            message: msg,
            timestamp: now.toISOString(),
            read: false
        };
        setNotifications(prev => [notif, ...prev]);
        setToast({ message: t('Shift Started Notification'), type: 'success' });
    }
  };

  const handleAddStore = (newStoreData: Omit<Store, 'id' | 'organizationId'>) => {
    if (!currentOrgId || !activeLicense) {
        alert("Cannot add a store without an active organization and license.");
        return;
    }

    const orgStores = allStores.filter(s => s.organizationId === currentOrgId);
    if (activeLicense.planType !== 'Enterprise' && orgStores.length >= 1) {
        alert("Your current license plan does not support multiple stores. Please upgrade to the Enterprise plan to add more branches.");
        return;
    }

    const newStore: Store = {
        ...newStoreData,
        id: `store_${Date.now()}`,
        organizationId: currentOrgId,
    };
    setAllStores(prev => [...prev, newStore]);
  };

  const handleDeleteStore = (storeId: string) => {
    if (!currentOrgId) return;

    const isStoreExclusiveForEmployee = allEmployees.some(
        emp => emp.organizationId === currentOrgId && emp.storeAccess?.length === 1 && emp.storeAccess[0] === storeId
    );

    if (isStoreExclusiveForEmployee) {
        alert("Cannot delete this store. One or more employees are exclusively assigned to it. Please reassign their store access before deleting.");
        return;
    }

    if (confirm(`Are you sure you want to delete this store? This will also remove associated data. This action cannot be undone.`)) {
        setAllStores(prev => prev.filter(s => s.id !== storeId));
        if (activeStoreId === storeId) {
            setActiveStoreId('global');
        }
    }
  };

  // --- AUTOMATED STOCK UPDATE FROM PURCHASE ORDERS ---
  const handleUpdatePurchaseOrder = (updatedPO: PurchaseOrder) => {
      const oldPO = allPurchaseOrders.find(p => p.id === updatedPO.id);
      
      // If status changed from Pending to Completed
      if (oldPO && oldPO.status !== 'Completed' && updatedPO.status === 'Completed') {
          // Increase stock for each item
          setAllProducts(prev => prev.map(prod => {
              const item = updatedPO.items.find(i => i.productId === prod.id);
              if (item) {
                  return { ...prod, stock: prod.stock + item.quantity };
              }
              return prod;
          }));
          setToast({ message: "Stock updated from Purchase Order", type: 'success' });
      }
      
      // Update the PO record
      setAllPurchaseOrders(prev => prev.map(p => p.id === updatedPO.id ? updatedPO : p));
  };


  // --- DERIVED STATE (Multi-Tenancy & Multi-Store Filtering) ---
  const currentOrgId = currentUser?.organizationId;

  const organizationStores = useMemo(() => {
    if (!currentOrgId) return [];
    return allStores.filter(s => s.organizationId === currentOrgId);
  }, [allStores, currentOrgId]);

  const accessibleStores = useMemo(() => {
    if (!currentUser || !currentOrgId) return [];
    // CRITICAL: Safe check for storeAccess being undefined
    const userAccess = currentUser.storeAccess || ['all'];
    if (userAccess.includes('all')) {
        return allStores.filter(s => s.organizationId === currentOrgId);
    }
    return allStores.filter(s => userAccess.includes(s.id) && s.organizationId === currentOrgId);
  }, [currentUser, currentOrgId, allStores]);

  const { employees, products, customers, suppliers, purchaseOrders, sales, expenses, licenseKeys } = useMemo(() => {
      if (!currentOrgId) return { employees: [], products: [], customers: [], suppliers: [], purchaseOrders: [], sales: [], expenses: [], licenseKeys: [] };
      
      const filterByStore = <T extends { storeId: string; organizationId?: string }>(data: T[]): T[] => {
          if (!data) return [];
          const orgData = data.filter(item => item && item.organizationId === currentOrgId); // Guard check item existence
          // CRITICAL: Check storeAccess existence safely with ?.
          if (activeStoreId === 'global' || currentUser?.storeAccess?.includes('all')) return orgData;
          return orgData.filter(item => item.storeId === activeStoreId);
      };
      
      const employeesForOrg = allEmployees.filter(u => u.organizationId === currentOrgId);
      
      // CRITICAL: Safety check for employee store filtering using Optional Chaining
      const visibleEmployees = activeStoreId === 'global'
          ? employeesForOrg
          : employeesForOrg.filter(e => e.storeAccess?.includes(activeStoreId));

      return {
          employees: visibleEmployees,
          products: filterByStore(allProducts),
          customers: filterByStore(allCustomers),
          suppliers: filterByStore(allSuppliers),
          purchaseOrders: filterByStore(allPurchaseOrders),
          sales: filterByStore(allSales),
          expenses: filterByStore(allExpenses),
          licenseKeys: filterByStore(allLicenseKeys),
      };
  }, [currentOrgId, activeStoreId, allStores, allEmployees, allProducts, allCustomers, allSuppliers, allPurchaseOrders, allSales, allExpenses, allLicenseKeys, currentUser]);


  useEffect(() => {
    if (currentOrgId) setBusinessName(`Shop (${currentOrgId.substring(4, 10).toUpperCase()})`);
  }, [currentOrgId]);

  // Determine current store name for Receipt
  const currentStoreName = useMemo(() => {
      if (activeStoreId === 'global') return businessName;
      const store = allStores.find(s => s.id === activeStoreId);
      return store ? `${businessName} - ${store.name}` : businessName;
  }, [activeStoreId, allStores, businessName]);

  // --- THEME ---
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const formatCurrency = React.useCallback((amount: number): string => {
      const config = CURRENCIES[currency];
      if (!config) return `$${amount.toFixed(2)}`;
      return `${config.symbol}${(amount * config.rate).toFixed(2)}`;
  }, [currency]);

  // --- HANDLERS ---
  const handleWidgetChange = (widgetId: string, isVisible: boolean) => {
    if (!currentUser) return;
    const newWidgets = { ...currentUser.dashboardWidgets, [widgetId]: isVisible };
    const updatedUser = { ...currentUser, dashboardWidgets: newWidgets };
    setCurrentUser(updatedUser);
    handleUpdateCurrentUser({ dashboardWidgets: newWidgets });
  };

  // UPDATED: handleAddSale now updates stock AND checks for Low Stock
  const handleAddSale = (saleData: Sale, soldItems: CartItem[]) => {
    if (!currentUser || activeStoreId === 'global') return;
    const dueAmount = saleData.total - saleData.amountPaid;
    
    // Note: ID is now generated in POS, so we use it directly
    const newSale: Sale = {
        ...saleData,
        date: new Date().toISOString(),
        cashier: currentUser.name,
        cashierId: currentUser.id,
        organizationId: currentOrgId,
        storeId: activeStoreId,
    };
    
    setAllSales(prev => [newSale, ...prev]);

    // Update Customer Due Amount
    if (dueAmount > 0 && saleData.customerId !== 'guest') {
        setAllCustomers(prev => prev.map(c => 
            c.id === saleData.customerId 
                ? { ...c, dueAmount: c.dueAmount + dueAmount } 
                : c
        ));
    }
    
    // Update Product Stock & Check for Low Stock
    let newNotifications: Notification[] = [];
    
    setAllProducts(prevProducts => prevProducts.map(product => {
        // Only update product if it belongs to the current store
        if(product.storeId !== activeStoreId) return product;

        const soldItem = soldItems.find(item => item.id === product.id);
        if (soldItem) {
            const newStock = Math.max(0, product.stock - soldItem.quantity);
            
            // Check for Low Stock Threshold
            if (product.lowStockThreshold !== undefined && newStock <= product.lowStockThreshold) {
                const notifId = `n-low-${product.id}-${Date.now()}`;
                newNotifications.push({
                    id: notifId,
                    title: t('Low Stock Alert'),
                    message: `${product.name} ${t('is running low')} (${newStock} ${product.unit || ''}).`,
                    timestamp: new Date().toISOString(),
                    read: false,
                    link: 'products'
                });
            }

            return { ...product, stock: newStock };
        }
        return product;
    }));

    if (newNotifications.length > 0) {
        setNotifications(prev => [...newNotifications, ...prev]);
        setToast({ message: t('Low Stock Alert'), type: 'info' });
    }
  };

  const handleRecordPayment = (customerId: string, amount: number) => {
      setAllCustomers(prev => prev.map(c => c.id === customerId ? {...c, dueAmount: Math.max(0, c.dueAmount - amount)} : c));
      setToast({ message: "Payment Recorded", type: 'success' });
  };
  
  const handleAddCustomer = (customerData: Omit<Customer, 'id'>): Customer => {
      const newCustomer: Customer = {
          ...customerData,
          id: `c${Date.now()}`,
          organizationId: currentOrgId,
          storeId: activeStoreId === 'global' ? '' : activeStoreId, // Assign to current store
      };
      setAllCustomers(prev => [...prev, newCustomer]);
      return newCustomer;
  };

  const handleStockAdjustment = (productId: string, newStock: number, reason: string) => {
      setAllProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  // Handlers for Held Orders
  const handleResumeHold = (heldCart: HeldCart) => {
      // For simplicity in this demo, we'll alert. Real implementation would navigate to POS and load cart.
      alert("Please go to the POS screen and click the 'Held Orders' clock icon to resume this cart.");
  };

  const handleDiscardHold = (id: string) => {
      if(confirm("Are you sure you want to discard this held order?")) {
          setHeldCarts(prev => prev.filter(h => h.id !== id));
          setToast({ message: "Order Discarded", type: 'info' });
      }
  };

  // --- RENDER ---
  if (isLoadingLicense || isAuthLoading) {
    return <div className="flex h-screen items-center justify-center dark:bg-neutral-900"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  // 1. No Valid License? Show Gate
  if (!activeLicense) {
      return <LicenseGate onSuccess={handleLicenseActivation} onStartTrial={handleStartTrial} licenseDatabase={licenseDatabase} />;
  }

  // 2. No User? Show Login/Auth
  if (!currentUser) {
      return (
        <Auth 
            onLogin={handleLogin}
            onInitiateRegister={handleInitiateRegister}
            onInitiateForgotPassword={handleInitiateForgotPassword}
            onVerifyEmail={(code) => console.log('Verify email', code)}
            onVerifyResetCode={(code) => console.log('Verify reset code', code)}
            onResetPassword={handleResetPassword}
            error={authError}
            onClearError={() => setAuthError(null)}
            noUsersFound={allEmployees.length === 0} 
            activeLicense={activeLicense}
            onDeactivateLicense={handleDeactivateLicense}
        />
      );
  }
  
  // 3. Main App UI
  const renderView = () => {
    if (!currentUser) return null;
    
    // -- RBAC: CHECK IF USER HAS ACCESS TO THIS VIEW --
    const navItemForView = NAV_ITEMS.find(item => item.path === activeView);
    if (navItemForView && !navItemForView.roles.includes(currentUser.role)) {
        return <GenericView title="Unauthorized Access" />;
    }

    // -- RBAC: PERMISSIONS FOR MANAGEMENT VIEWS --
    const canAddNewEmployee = activeStoreId !== 'global' && currentUser.role === Role.Admin;
    const isManager = currentUser.role === Role.Manager;
    const isAdmin = currentUser.role === Role.Admin;
    const isCashier = currentUser.role === Role.Cashier;

    // Define granular permissions for management tables
    // Admins can do everything. Managers can Edit but not Delete (business rule example). Cashiers are mostly restricted.
    const canEdit = isAdmin || isManager;
    const canDelete = isAdmin; 
    const canAddNew = isAdmin || isManager; // Cashiers can't usually add products/suppliers

    const poManagementConfig = {
      ...MANAGEMENT_CONFIG.purchases,
      formFields: MANAGEMENT_CONFIG.purchases.formFields.map(field => {
        if (field.key === 'supplierId') {
          return {
            ...field,
            options: suppliers.map(s => ({ value: s.id, label: s.name })),
          };
        }
        return field;
      }),
    };
    
    const onAddItem = (dataType: string, item: any) => {
        if (activeStoreId === 'global' && dataType !== 'employees') {
            alert("Please select a specific store before adding new items.");
            return;
        }
        const newItem = {
            ...item,
            id: `${dataType.slice(0,1)}${Date.now()}`,
            organizationId: currentOrgId,
            storeId: activeStoreId
        };
        switch(dataType) {
            case 'products': setAllProducts(p => [...p, newItem as Product]); break;
            case 'suppliers': setAllSuppliers(s => [...s, newItem as Supplier]); break;
            case 'purchases': setAllPurchaseOrders(p => [...p, { ...newItem, createdBy: currentUser.name, createdAt: new Date().toISOString() } as PurchaseOrder]); break;
            case 'expenses': setAllExpenses(e => [...e, { ...newItem, recordedBy: currentUser.name } as Expense]); break;
        }
    };
    
    const onAddEmployee = (item: Omit<User, 'id'>) => {
        if (!canAddNewEmployee) return;
        setAllEmployees(prev => [...prev, { ...item, id: `u${Date.now()}`, organizationId: currentOrgId, dashboardWidgets: getDefaultWidgetsForRole(item.role as Role), storeAccess: [activeStoreId] }]);
    };


    switch (activeView) {
      case 'dashboard':
        return <Dashboard products={products} sales={sales} user={currentUser} onWidgetChange={handleWidgetChange} formatCurrency={formatCurrency} t={t} activeLicense={activeLicense} licenseKeys={licenseKeys} />;
      case 'pos':
        return <POS user={currentUser} customers={customers} products={products} onAddSale={handleAddSale} onAddCustomer={handleAddCustomer} heldCarts={heldCarts} setHeldCarts={setHeldCarts} formatCurrency={formatCurrency} t={t} businessName={currentStoreName} activeStoreId={activeStoreId} taxRate={taxRate} />;
      case 'products':
        return <Management dataType="products" data={products} columns={MANAGEMENT_CONFIG.products.columns} formFields={MANAGEMENT_CONFIG.products.formFields} onAdd={(item) => onAddItem('products', item)} onUpdate={(item) => setAllProducts(prev => prev.map(p => p.id === item.id ? item : p))} onDelete={(ids) => setAllProducts(prev => prev.filter(p => !ids.includes(p.id)))} customActions={{ onAdjustStock: handleStockAdjustment }} t={t} formatCurrency={formatCurrency} canAddNew={canAddNew} canEdit={canEdit} canDelete={canDelete} />;
      case 'customers':
        // Cashiers CAN add customers, so we override canAddNew for this view
        return <Management dataType="customers" data={customers} columns={MANAGEMENT_CONFIG.customers.columns} formFields={MANAGEMENT_CONFIG.customers.formFields} onAdd={(item) => handleAddCustomer(item as Omit<Customer, 'id'>)} onUpdate={(item) => setAllCustomers(prev => prev.map(c => c.id === item.id ? item : c))} onDelete={(ids) => setAllCustomers(prev => prev.filter(c => !ids.includes(c.id)))} customActions={{ onRecordPayment: handleRecordPayment }} t={t} formatCurrency={formatCurrency} canAddNew={canAddNew || isCashier} canEdit={canEdit || isCashier} canDelete={canDelete} />;
      case 'credit-holds':
        return <CreditHoldsView customers={customers} heldCarts={heldCarts} formatCurrency={formatCurrency} onRecordPayment={handleRecordPayment} onResumeHold={handleResumeHold} onDiscardHold={handleDiscardHold} t={t} />;
      case 'employees':
        // Strictly Admin
        return <Management dataType="employees" data={employees} columns={MANAGEMENT_CONFIG.employees.columns} formFields={MANAGEMENT_CONFIG.employees.formFields} onAdd={(item) => onAddEmployee(item as Omit<User, 'id'>)} onUpdate={(item) => setAllEmployees(prev => prev.map(u => u.id === item.id ? item : u))} onDelete={(ids) => setAllEmployees(prev => prev.filter(u => !ids.includes(u.id)))} t={t} formatCurrency={formatCurrency} canAddNew={canAddNewEmployee} canEdit={isAdmin} canDelete={isAdmin} addNewDisabledTooltip="Select a store to add an employee" />;
      case 'suppliers':
        return <Management dataType="suppliers" data={suppliers} columns={MANAGEMENT_CONFIG.suppliers.columns} formFields={MANAGEMENT_CONFIG.suppliers.formFields} onAdd={(item) => onAddItem('suppliers', item)} onUpdate={(item) => setAllSuppliers(prev => prev.map(s => s.id === item.id ? item : s))} onDelete={(ids) => setAllSuppliers(prev => prev.filter(s => !ids.includes(s.id)))} t={t} formatCurrency={formatCurrency} canAddNew={canAddNew} canEdit={canEdit} canDelete={canDelete} />;
      case 'purchases':
        return <Management dataType="purchases" data={purchaseOrders} columns={poManagementConfig.columns} formFields={poManagementConfig.formFields} onAdd={(item) => onAddItem('purchases', item)} onUpdate={(item) => handleUpdatePurchaseOrder(item as PurchaseOrder)} onDelete={(ids) => setAllPurchaseOrders(prev => prev.filter(po => !ids.includes(po.id)))} t={t} formatCurrency={formatCurrency} canAddNew={canAddNew} canEdit={canEdit} canDelete={canDelete} />;
      case 'expenses':
        return <Management dataType="expenses" data={expenses} columns={MANAGEMENT_CONFIG.expenses.columns} formFields={MANAGEMENT_CONFIG.expenses.formFields} onAdd={(item) => onAddItem('expenses', item)} onUpdate={(item) => setAllExpenses(prev => prev.map(e => e.id === item.id ? item : e))} onDelete={(ids) => setAllExpenses(prev => prev.filter(e => !ids.includes(e.id)))} t={t} formatCurrency={formatCurrency} canAddNew={canAddNew} canEdit={canEdit} canDelete={canDelete} />;
      case 'reports':
        return <Reports sales={sales} users={employees} customers={customers} formatCurrency={formatCurrency} />;
      case 'settings':
        return <Settings user={currentUser} onUpdateUser={handleUpdateCurrentUser} employees={employees} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} businessName={businessName} setBusinessName={setBusinessName} businessLogo={businessLogo} setBusinessLogo={setBusinessLogo} licenseKeys={allLicenseKeys} setLicenseKeys={setAllLicenseKeys} language={language} setLanguage={setLanguage} currency={currency} setCurrency={setCurrency} t={t} licenseDatabase={licenseDatabase} setLicenseDatabase={setLicenseDatabase} activeLicense={activeLicense} onDeactivateLicense={handleDeactivateLicense} onUpdateLicense={(key) => handleLicenseUpdateOrActivation(key, false)} isInTrial={isInTrial} onActivateTrialLicense={(key) => handleLicenseUpdateOrActivation(key, true)} activeStoreId={activeStoreId} onAddStore={handleAddStore} onDeleteStore={handleDeleteStore} organizationStores={organizationStores} taxRate={taxRate} setTaxRate={setTaxRate} />;
      default:
        return <GenericView title={activeView} />;
    }
  };

  return (
    <div className={`flex h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 antialiased ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar 
        userRole={currentUser.role} 
        activeView={activeView} 
        setActiveView={setActiveView}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        businessName={businessName}
        businessLogo={businessLogo}
        t={t}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={currentUser} 
          onLogout={handleLogout}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          businessName={businessName}
          businessLogo={businessLogo}
          activeView={activeView}
          setActiveView={setActiveView}
          notifications={notifications}
          setNotifications={setNotifications}
          activeShift={activeShift}
          onToggleShift={handleToggleShift}
          isOnline={isOnline}
          t={t}
          isInTrial={isInTrial}
          activeStoreId={activeStoreId}
          setActiveStoreId={setActiveStoreId}
          accessibleStores={accessibleStores}
          allStores={allStores}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 p-6">
          {renderView()}
        </main>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
      <VirtualKeyboard />
    </div>
  );
}

export default App;
