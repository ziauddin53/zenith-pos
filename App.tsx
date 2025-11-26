
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import Dashboard from './components/Dashboard';
import { POS } from './components/POS';
import { Management } from './components/Management';
import Reports from './components/Reports';
import GenericView from './components/GenericView';
import Settings from './components/Settings';
import { LicenseGate } from './components/LicenseGate';
import { Auth, AuthView } from './components/Auth';
import VirtualKeyboard from './components/VirtualKeyboard';
import { Role, User, Product, Customer, Sale, LicenseKey, Notification, Supplier, PurchaseOrder, Shift, HeldCart, Expense, MasterLicense, Language, Currency } from './types';
import { MOCK_USERS, MOCK_PRODUCTS, MOCK_CUSTOMERS, MOCK_SALES_DATA, MANAGEMENT_CONFIG, MOCK_LICENSE_KEYS, MOCK_NOTIFICATIONS, MOCK_SUPPLIERS, MOCK_PURCHASE_ORDERS, MOCK_EXPENSES, TRANSLATIONS, CURRENCIES, TRIAL_DURATION_DAYS, getDefaultWidgetsForRole } from './constants';
import { supabase, isSupabaseConfigured } from './supabaseClient'; // Import Supabase Client & Config Flag

// Helper to load from LocalStorage or fall back to Mocks
function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

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

  // App UI State
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [businessName, setBusinessName] = useState('Zenith POS');
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);
  
  // Language & Currency State
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Network State
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // --- 2. PERSISTENCE EFFECTS (Save to Storage on Change) ---
  useEffect(() => localStorage.setItem('zenith_users', JSON.stringify(allEmployees)), [allEmployees]);
  useEffect(() => localStorage.setItem('zenith_products', JSON.stringify(allProducts)), [allProducts]);
  useEffect(() => localStorage.setItem('zenith_customers', JSON.stringify(allCustomers)), [allCustomers]);
  useEffect(() => localStorage.setItem('zenith_suppliers', JSON.stringify(allSuppliers)), [allSuppliers]);
  useEffect(() => localStorage.setItem('zenith_pos', JSON.stringify(allPurchaseOrders)), [allPurchaseOrders]);
  useEffect(() => localStorage.setItem('zenith_sales', JSON.stringify(allSales)), [allSales]);
  useEffect(() => localStorage.setItem('zenith_expenses', JSON.stringify(allExpenses)), [allExpenses]);
  useEffect(() => localStorage.setItem('zenith_licenses', JSON.stringify(allLicenseKeys)), [allLicenseKeys]);
  useEffect(() => localStorage.setItem('zenith_license_database', JSON.stringify(licenseDatabase)), [licenseDatabase]);

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

  // --- 4. LICENSE CHECK ---
  useEffect(() => {
    const storedLicense = localStorage.getItem('zenith_master_license');
    
    // 1. Check for a valid, stored master license first.
    if (storedLicense) {
      try {
        const parsedLicense = JSON.parse(storedLicense) as MasterLicense;
        // Verify structure (simple check)
        if (parsedLicense && parsedLicense.key && parsedLicense.validUntil) {
             if (new Date(parsedLicense.validUntil) > new Date()) {
                setActiveLicense(parsedLicense);
                setIsInTrial(false);
                setIsLoadingLicense(false);
                return; // License is valid, app starts.
             } else {
                // License expired, remove it.
                localStorage.removeItem('zenith_master_license');
             }
        } else {
            // Invalid structure
             localStorage.removeItem('zenith_master_license');
        }
      } catch (e) {
        // Corrupted key.
        localStorage.removeItem('zenith_master_license');
      }
    }
    // If we reach here, no valid license was found.
    setActiveLicense(null); 
    setIsLoadingLicense(false);
  }, []);

  // --- 5. SUPABASE AUTH INTEGRATION ---

  // Map Supabase User to App User
  const mapSupabaseUser = (u: any, license?: MasterLicense | null): User => {
      // Prioritize metadata Organization ID (for employees invite to specific orgs)
      // Fallback to License Organization ID (for the Owner activating the license)
      const orgId = u.user_metadata?.organizationId || license?.organizationId;
      
      return {
          id: u.id,
          email: u.email,
          // Metadata name -> email prefix -> default
          name: u.user_metadata?.name || u.email?.split('@')[0] || 'User',
          // Metadata role -> default Admin (safe fallback for owner)
          role: u.user_metadata?.role || Role.Admin,
          organizationId: orgId,
          avatarUrl: u.user_metadata?.avatarUrl || `https://i.pravatar.cc/150?u=${u.id}`,
          dashboardWidgets: u.user_metadata?.dashboardWidgets || getDefaultWidgetsForRole(Role.Admin),
          isVerified: u.email_confirmed_at != null
      };
  };

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
    setActiveView('dashboard');
  };

  // Check for existing session
  useEffect(() => {
    const checkSession = async () => {
        if (!isSupabaseConfigured) {
            console.log("Supabase not configured. Skipping session check.");
            setIsAuthLoading(false);
            return;
        }

        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            if (session?.user && activeLicense) {
                // SECURITY CHECK: Ensure session user email matches the locked license email
                if (activeLicense.emailLock && session.user.email.toLowerCase() !== activeLicense.emailLock.toLowerCase()) {
                    console.warn("Mismatched session user and license detected. Forcing logout.");
                    handleLogout(); // This will clear the user but keep the license
                    return;
                }
                setCurrentUser(mapSupabaseUser(session.user, activeLicense));
                setActiveView('dashboard');
            }
        } catch (error) {
            console.log("Supabase session check skipped/failed (likely offline or demo mode).");
        } finally {
            setIsAuthLoading(false);
        }
    };
    if (activeLicense) {
        checkSession();
    } else {
        setIsAuthLoading(false);
    }
  }, [activeLicense]);
  
  // Auth state change listener
  useEffect(() => {
     if (!isSupabaseConfigured) return;

     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user && activeLicense) {
            setCurrentUser(mapSupabaseUser(session.user, activeLicense));
        } else {
            setCurrentUser(prev => (prev && prev.id.startsWith('u')) ? prev : null);
        }
        setIsAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [activeLicense]);


  const handleLogin = async (email: string, pass: string) => {
      setAuthError(null);
      
      // SECURITY CHECK: Enforce email lock before any login attempt.
      if (activeLicense && activeLicense.emailLock && email.toLowerCase() !== activeLicense.emailLock.toLowerCase()) {
          setAuthError(`This device is licensed to ${activeLicense.emailLock}. Please log in with that email.`);
          return;
      }
      
      // 1. PRIORITY: Check MOCK_USERS from constants first.
      const hardcodedUser = MOCK_USERS.find(u => u.email === email && u.password === pass);
      if (hardcodedUser) {
          setAllEmployees(prev => {
              const exists = prev.find(u => u.id === hardcodedUser.id);
              if (exists) return prev.map(u => u.id === hardcodedUser.id ? hardcodedUser : u);
              return [...prev, hardcodedUser];
          });
          setCurrentUser(hardcodedUser);
          setActiveView('dashboard');
          return;
      }

      // 2. Check Local Storage Employees (users created via UI or Mock Register)
      const storedUser = allEmployees.find(u => u.email === email && u.password === pass);
      if (storedUser) {
          setCurrentUser(storedUser);
          setActiveView('dashboard');
          return;
      }

      // 3. Try Supabase Auth
      if (!isSupabaseConfigured) {
          setAuthError("Invalid credentials. If this is a new registration, please Register first.");
          return;
      }

      try {
          const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password: pass,
          });

          if (error) {
              setAuthError(error.message);
          } else if (data.user) {
              setCurrentUser(mapSupabaseUser(data.user, activeLicense));
              setActiveView('dashboard');
          }
      } catch (err) {
          console.error(err);
          setAuthError("Network error: Unable to connect to authentication server.");
      }
  };

  const handleInitiateRegister = async (name: string, email: string, pass: string) => {
      if (!activeLicense || !activeLicense.organizationId) {
          setAuthError("Cannot register without an active license.");
          return;
      }

      // SECURITY CHECK: Prevent new registrations if the device is already locked to a different email.
      if (activeLicense.emailLock && email.toLowerCase() !== activeLicense.emailLock.toLowerCase()) {
          setAuthError(`This software is already activated for ${activeLicense.emailLock}. You cannot register a new account.`);
          return;
      }

      if (allEmployees.find(u => u.email === email)) {
            setAuthError("This email is already registered locally.");
            return;
      }

      setAuthError(null);

      const newUser: User = {
          id: `u${Date.now()}`,
          name,
          email,
          password: pass,
          role: Role.Admin,
          avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
          dashboardWidgets: getDefaultWidgetsForRole(Role.Admin),
          organizationId: activeLicense.organizationId,
          isVerified: false
      };

      setAllEmployees(prev => [...prev, newUser]);

      if (isSupabaseConfigured) {
          try {
              const { error } = await supabase.auth.signUp({
                  email,
                  password: pass,
                  options: {
                      emailRedirectTo: window.location.origin,
                      data: {
                          name,
                          role: Role.Admin,
                          organizationId: activeLicense.organizationId,
                          dashboardWidgets: getDefaultWidgetsForRole(Role.Admin)
                      }
                  }
              });
              if (error && !error.message.toLowerCase().includes('user already registered')) {
                  console.warn("Cloud registration warning:", error.message);
              }
          } catch (err) {
              console.warn("Cloud registration skipped (offline/error). Local account created.");
          }
      }

      setCurrentUser(newUser);
      setActiveView('dashboard');
      alert("Registration successful! You are now logged in.");
  };

  const handleInitiateForgotPassword = async (email: string) => {
      if (!isSupabaseConfigured) {
          setAuthError("Password reset is not available in demo mode.");
          return;
      }

      setAuthError(null);
      try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin,
          });

          if (error) {
              setAuthError(error.message);
          } else {
              alert("Password reset link sent to your email.");
          }
      } catch (err) {
          setAuthError("Network error: Unable to send reset email.");
      }
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

    setAllEmployees(prev => 
        prev.map(emp => emp.id === currentUser.id ? { ...emp, ...updatedData } : emp)
    );
    
    if (!currentUser.id.startsWith('u') && isSupabaseConfigured) {
        supabase.auth.updateUser({ data: { 
            name: updatedUser.name, 
            avatarUrl: updatedUser.avatarUrl 
        } }).catch(e => console.warn("Failed to sync user update to cloud"));
    }
  };


  const handleLicenseActivation = (licenseToActivate: MasterLicense) => {
    const organizationId = `org_${licenseToActivate.key.split('-')[2].toLowerCase()}`;
    const activatedLicense: MasterLicense = {
        ...licenseToActivate,
        status: 'Activated',
        activationDate: new Date().toISOString(),
        organizationId: organizationId,
    };
    
    setLicenseDatabase(prevDb => 
        prevDb.map(lic => lic.key === activatedLicense.key ? activatedLicense : lic)
    );

    localStorage.setItem('zenith_master_license', JSON.stringify(activatedLicense));
    localStorage.removeItem('zenith_trial_start');

    // WIPE ALL DEMO DATA ON ACTIVATION
    setAllProducts([]);
    setAllCustomers([]);
    setAllSuppliers([]);
    setAllPurchaseOrders([]);
    setAllSales([]);
    setAllExpenses([]);
    setAllLicenseKeys([]);
    setAllEmployees([]);

    // Clear Storage
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

  const handleToggleShift = () => {
    if (!currentUser) return;
    if (activeShift) {
        setActiveShift(null);
    } else {
        const newShift: Shift = {
            id: `sh${Date.now()}`,
            userId: currentUser.id,
            userName: currentUser.name,
            startTime: new Date().toISOString(),
            endTime: null
        };
        setActiveShift(newShift);
    }
  };

  // --- DERIVED STATE (Multi-Tenancy Filtering) ---
  const currentOrgId = currentUser?.organizationId;

  const employees = useMemo(() => allEmployees.filter(u => u.organizationId === currentOrgId), [allEmployees, currentOrgId]);
  const products = useMemo(() => allProducts.filter(p => p.organizationId === currentOrgId), [allProducts, currentOrgId]);
  const customers = useMemo(() => allCustomers.filter(c => c.organizationId === currentOrgId), [allCustomers, currentOrgId]);
  const suppliers = useMemo(() => allSuppliers.filter(s => s.organizationId === currentOrgId), [allSuppliers, currentOrgId]);
  const purchaseOrders = useMemo(() => allPurchaseOrders.filter(p => p.organizationId === currentOrgId), [allPurchaseOrders, currentOrgId]);
  const sales = useMemo(() => allSales.filter(s => s.organizationId === currentOrgId), [allSales, currentOrgId]);
  const expenses = useMemo(() => allExpenses.filter(e => e.organizationId === currentOrgId), [allExpenses, currentOrgId]);
  const licenseKeys = useMemo(() => allLicenseKeys.filter(l => l.organizationId === currentOrgId), [allLicenseKeys, currentOrgId]);

  useEffect(() => {
    if (currentOrgId) setBusinessName(`Shop (${currentOrgId.substring(4, 10).toUpperCase()})`);
  }, [currentOrgId]);

  // --- THEME ---
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- HELPERS ---
  const t = React.useCallback((key: string): string => {
      return TRANSLATIONS[language]?.[key] || key;
  }, [language]);

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
    
    if (!currentUser.id.startsWith('u') && isSupabaseConfigured) {
        supabase.auth.updateUser({ data: { dashboardWidgets: newWidgets } }).catch(console.error);
    }
  };

  const handleAddSale = (saleData: Omit<Sale, 'id' | 'cashier' | 'cashierId' | 'date'>) => {
    if (!currentUser) return;
    const dueAmount = saleData.total - saleData.amountPaid;
    const newSale: Sale = {
        ...saleData,
        id: `s${Date.now()}`,
        cashier: currentUser.name,
        cashierId: currentUser.id,
        date: new Date().toISOString(),
        organizationId: currentOrgId
    };
    
    setAllSales(prev => [newSale, ...prev]);

    if (dueAmount > 0 && saleData.customerId !== 'guest') {
        setAllCustomers(prev => prev.map(c => 
            c.id === saleData.customerId 
                ? { ...c, dueAmount: c.dueAmount + dueAmount } 
                : c
        ));
    }
  };

  const handleRecordPayment = (customerId: string, amount: number) => {
      setAllCustomers(prev => prev.map(c => c.id === customerId ? {...c, dueAmount: Math.max(0, c.dueAmount - amount)} : c));
  };
  
  const handleAddCustomer = (customerData: Omit<Customer, 'id'>): Customer => {
      const newCustomer: Customer = {
          ...customerData,
          id: `c${Date.now()}`,
          organizationId: currentOrgId
      };
      setAllCustomers(prev => [...prev, newCustomer]);
      return newCustomer;
  };

  const handleStockAdjustment = (productId: string, newStock: number, reason: string) => {
      setAllProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
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
        />
      );
  }
  
  // 3. Main App UI
  const renderView = () => {
    if (!currentUser) return null;

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

    switch (activeView) {
      case 'dashboard':
        return <Dashboard products={products} sales={sales} user={currentUser} onWidgetChange={handleWidgetChange} formatCurrency={formatCurrency} t={t} activeLicense={activeLicense} licenseKeys={licenseKeys} />;
      case 'pos':
        return <POS user={currentUser} customers={customers} products={products} onAddSale={handleAddSale} onAddCustomer={handleAddCustomer} heldCarts={heldCarts} setHeldCarts={setHeldCarts} formatCurrency={formatCurrency} t={t} businessName={businessName} />;
      case 'products':
        return <Management dataType="products" data={products} columns={MANAGEMENT_CONFIG.products.columns} formFields={MANAGEMENT_CONFIG.products.formFields} onAdd={(item) => setAllProducts(prev => [...prev, { ...(item as Omit<Product, 'id'>), id: `p${Date.now()}`, organizationId: currentOrgId }])} onUpdate={(item) => setAllProducts(prev => prev.map(p => p.id === item.id ? item : p))} onDelete={(ids) => setAllProducts(prev => prev.filter(p => !ids.includes(p.id)))} customActions={{ onAdjustStock: handleStockAdjustment }} t={t} formatCurrency={formatCurrency} />;
      case 'customers':
        return <Management dataType="customers" data={customers} columns={MANAGEMENT_CONFIG.customers.columns} formFields={MANAGEMENT_CONFIG.customers.formFields} onAdd={(item) => handleAddCustomer(item as Omit<Customer, 'id'>)} onUpdate={(item) => setAllCustomers(prev => prev.map(c => c.id === item.id ? item : c))} onDelete={(ids) => setAllCustomers(prev => prev.filter(c => !ids.includes(c.id)))} customActions={{ onRecordPayment: handleRecordPayment }} t={t} formatCurrency={formatCurrency} />;
      case 'employees':
        return <Management dataType="employees" data={employees} columns={MANAGEMENT_CONFIG.employees.columns} formFields={MANAGEMENT_CONFIG.employees.formFields} onAdd={(item) => setAllEmployees(prev => [...prev, { ...(item as Omit<User, 'id'>), id: `u${Date.now()}`, organizationId: currentOrgId, dashboardWidgets: getDefaultWidgetsForRole(item.role as Role) }])} onUpdate={(item) => setAllEmployees(prev => prev.map(u => u.id === item.id ? item : u))} onDelete={(ids) => setAllEmployees(prev => prev.filter(u => !ids.includes(u.id)))} t={t} formatCurrency={formatCurrency} />;
      case 'suppliers':
        return <Management dataType="suppliers" data={suppliers} columns={MANAGEMENT_CONFIG.suppliers.columns} formFields={MANAGEMENT_CONFIG.suppliers.formFields} onAdd={(item) => setAllSuppliers(prev => [...prev, { ...(item as Omit<Supplier, 'id'>), id: `sup${Date.now()}`, organizationId: currentOrgId }])} onUpdate={(item) => setAllSuppliers(prev => prev.map(s => s.id === item.id ? item : s))} onDelete={(ids) => setAllSuppliers(prev => prev.filter(s => !ids.includes(s.id)))} t={t} formatCurrency={formatCurrency} />;
      case 'purchases':
        return <Management dataType="purchases" data={purchaseOrders} columns={poManagementConfig.columns} formFields={poManagementConfig.formFields} onAdd={(item) => setAllPurchaseOrders(prev => [...prev, { ...(item as Omit<PurchaseOrder, 'id'>), id: `po${Date.now()}`, createdBy: currentUser.name, createdAt: new Date().toISOString(), organizationId: currentOrgId }])} onUpdate={(item) => setAllPurchaseOrders(prev => prev.map(po => po.id === item.id ? item : po))} onDelete={(ids) => setAllPurchaseOrders(prev => prev.filter(po => !ids.includes(po.id)))} t={t} formatCurrency={formatCurrency} />;
      case 'expenses':
        return <Management dataType="expenses" data={expenses} columns={MANAGEMENT_CONFIG.expenses.columns} formFields={MANAGEMENT_CONFIG.expenses.formFields} onAdd={(item) => setAllExpenses(prev => [...prev, { ...(item as Omit<Expense, 'id'>), id: `e${Date.now()}`, recordedBy: currentUser.name, organizationId: currentOrgId }])} onUpdate={(item) => setAllExpenses(prev => prev.map(e => e.id === item.id ? item : e))} onDelete={(ids) => setAllExpenses(prev => prev.filter(e => !ids.includes(e.id)))} t={t} formatCurrency={formatCurrency} />;
      case 'reports':
        return <Reports sales={sales} users={employees} customers={customers} formatCurrency={formatCurrency} />;
      case 'settings':
        return <Settings user={currentUser} onUpdateUser={handleUpdateCurrentUser} employees={employees} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} businessName={businessName} setBusinessName={setBusinessName} businessLogo={businessLogo} setBusinessLogo={setBusinessLogo} licenseKeys={allLicenseKeys} setLicenseKeys={setAllLicenseKeys} language={language} setLanguage={setLanguage} currency={currency} setCurrency={setCurrency} t={t} licenseDatabase={licenseDatabase} setLicenseDatabase={setLicenseDatabase} />;
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
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 p-6">
          {renderView()}
        </main>
      </div>
      <VirtualKeyboard />
    </div>
  );
}

export default App;
