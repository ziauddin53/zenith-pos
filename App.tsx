
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
import VirtualKeyboard from './components/VirtualKeyboard';
import { Role, User, Product, Customer, Sale, LicenseKey, Notification, Supplier, PurchaseOrder, Shift, HeldCart, Expense, MasterLicense, Language, Currency } from './types';
import { MOCK_USERS, MOCK_PRODUCTS, MOCK_CUSTOMERS, MOCK_SALES_DATA, MANAGEMENT_CONFIG, MOCK_LICENSE_KEYS, MOCK_NOTIFICATIONS, MOCK_SUPPLIERS, MOCK_PURCHASE_ORDERS, MOCK_EXPENSES, TRANSLATIONS, CURRENCIES, TRIAL_DURATION_DAYS } from './constants';

// Helper to load data from LocalStorage or fall back to Mocks
function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

function App() {
  // License State
  const [activeLicense, setActiveLicense] = useState<MasterLicense | null>(null);
  const [isLoadingLicense, setIsLoadingLicense] = useState(true);
  const [isInTrial, setIsInTrial] = useState(false);

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
  const [currentUser, setCurrentUser] = useState<User>(allEmployees[0]); 
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

  // --- 3. NETWORK & SYNC LISTENERS ---
  useEffect(() => {
      const handleOnline = () => {
          setIsOnline(true);
          setNotifications(prev => [{ id: `n-net-${Date.now()}`, title: 'Back Online', message: 'Connection restored. Syncing data...', timestamp: new Date().toISOString(), read: false }, ...prev]);
          // Trigger sync function here in future
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
    const trialStart = localStorage.getItem('zenith_trial_start');

    // Check License First
    if (storedLicense) {
      try {
        const parsedLicense = JSON.parse(storedLicense) as MasterLicense;
        if (new Date(parsedLicense.validUntil) > new Date()) {
           setActiveLicense(parsedLicense);
           const orgAdmin = allEmployees.find(u => u.organizationId === parsedLicense.organizationId && u.role === Role.Admin);
           if (orgAdmin) setCurrentUser(orgAdmin);
           setIsLoadingLicense(false);
           return;
        } else {
           localStorage.removeItem('zenith_master_license');
        }
      } catch (e) {
        localStorage.removeItem('zenith_master_license');
      }
    }

    // Check Trial Second
    if (trialStart) {
        const startDate = new Date(trialStart);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        if (diffDays <= TRIAL_DURATION_DAYS) {
            setIsInTrial(true);
            // For trial, we use a default or existing user context
            // In a real app, we might create a temp trial user
            setActiveLicense({ 
                key: 'TRIAL_MODE', 
                organizationId: 'org_coffee', // Default to coffee org for trial
                validUntil: new Date(now.getTime() + (TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000)).toISOString(),
                planType: 'Standard',
                status: 'Active'
            });
             // Ensure a user exists for trial org if needed, or just use existing
             if(!currentUser) setCurrentUser(MOCK_USERS[0]);
        } else {
            localStorage.removeItem('zenith_trial_start'); // Trial Expired
        }
    }

    setIsLoadingLicense(false);
  }, []);

  const handleLicenseActivation = (license: MasterLicense) => {
    localStorage.setItem('zenith_master_license', JSON.stringify(license));
    localStorage.removeItem('zenith_trial_start'); // Clear trial if license added
    setActiveLicense(license);
    setIsInTrial(false);
    setActiveView('dashboard');
    
    const orgAdmin = allEmployees.find(u => u.organizationId === license.organizationId && u.role === Role.Admin);
    if (orgAdmin) {
      setCurrentUser(orgAdmin);
    }
  };

  const handleStartTrial = () => {
      const now = new Date().toISOString();
      localStorage.setItem('zenith_trial_start', now);
      setIsInTrial(true);
      
      // Create a dummy license object for state
      const trialLicense: MasterLicense = {
          key: 'TRIAL',
          organizationId: 'org_coffee', // Default demo org
          validUntil: new Date(Date.now() + (7 * 86400000)).toISOString(),
          planType: 'Standard',
          status: 'Active'
      };
      setActiveLicense(trialLicense);
      // Set user to demo admin
      const demoUser = MOCK_USERS.find(u => u.role === Role.Admin && u.organizationId === 'org_coffee');
      if(demoUser) setCurrentUser(demoUser);
  };

  const handleDeactivateLicense = () => {
    localStorage.removeItem('zenith_master_license');
    localStorage.removeItem('zenith_trial_start');
    setActiveLicense(null);
    setIsInTrial(false);
  }

  // --- 5. DERIVED STATE (Multi-Tenancy Filtering) ---
  const currentOrgId = currentUser.organizationId;

  const employees = useMemo(() => allEmployees.filter(u => u.organizationId === currentOrgId), [allEmployees, currentOrgId]);
  const products = useMemo(() => allProducts.filter(p => p.organizationId === currentOrgId), [allProducts, currentOrgId]);
  const customers = useMemo(() => allCustomers.filter(c => c.organizationId === currentOrgId), [allCustomers, currentOrgId]);
  const suppliers = useMemo(() => allSuppliers.filter(s => s.organizationId === currentOrgId), [allSuppliers, currentOrgId]);
  const purchaseOrders = useMemo(() => allPurchaseOrders.filter(p => p.organizationId === currentOrgId), [allPurchaseOrders, currentOrgId]);
  const sales = useMemo(() => allSales.filter(s => s.organizationId === currentOrgId), [allSales, currentOrgId]);
  const expenses = useMemo(() => allExpenses.filter(e => e.organizationId === currentOrgId), [allExpenses, currentOrgId]);
  const licenseKeys = useMemo(() => allLicenseKeys.filter(l => l.organizationId === currentOrgId), [allLicenseKeys, currentOrgId]);

  // Update business name based on org
  useEffect(() => {
    if (currentOrgId === 'org_coffee') setBusinessName('Zenith Coffee');
    else if (currentOrgId === 'org_tech') setBusinessName('Tech Zone');
    else setBusinessName('Zenith POS');
  }, [currentOrgId]);

  // --- 6. THEME ---
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- 7. HELPERS ---
  const t = React.useCallback((key: string): string => {
      return TRANSLATIONS[language]?.[key] || key;
  }, [language]);

  const formatCurrency = React.useCallback((amount: number): string => {
      const config = CURRENCIES[currency];
      if (!config) return `$${amount.toFixed(2)}`;
      return `${config.symbol}${(amount * config.rate).toFixed(2)}`;
  }, [currency]);

  // --- 8. HANDLERS & SYNC ---

  const handleLogout = () => {
    const currentOrgUsers = employees;
    const currentIndex = currentOrgUsers.findIndex(u => u.id === currentUser.id);
    const nextUser = currentOrgUsers[(currentIndex + 1) % currentOrgUsers.length];
    setCurrentUser(nextUser);
    
    const defaultViewForRole = nextUser.role === Role.Cashier ? 'pos' : 'dashboard';
    setActiveView(defaultViewForRole);
  }
  
  const handleWidgetChange = (widgetId: string, isVisible: boolean) => {
    const newWidgets = { ...currentUser.dashboardWidgets, [widgetId]: isVisible };
    const updatedUser = { ...currentUser, dashboardWidgets: newWidgets };
    setCurrentUser(updatedUser);
    // Update in master list
    setAllEmployees(prev => prev.map(emp => emp.id === currentUser.id ? updatedUser : emp));
  };

  const handleAddSale = (saleData: Omit<Sale, 'id' | 'cashier' | 'cashierId' | 'date'>) => {
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

    if (!isOnline) {
        console.log('Offline: Sale saved locally.');
    } else {
        console.log('Online: Sale would be pushed to DB.');
    }

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
      // Log activity (simplified)
      console.log(`Stock adjusted for ${productId}: ${newStock} (${reason})`);
  };

  const handleToggleShift = () => {
    if (activeShift) {
        const endedShift = { ...activeShift, endTime: new Date().toISOString() };
        setActiveShift(null);
        setNotifications(prev => [{ id: `n${Date.now()}`, title: 'Shift Ended', message: `${currentUser.name} clocked out.`, timestamp: new Date().toISOString(), read: false }, ...prev]);
    } else {
        const newShift: Shift = {
            id: `shift-${Date.now()}`,
            userId: currentUser.id,
            userName: currentUser.name,
            startTime: new Date().toISOString(),
            endTime: null,
        };
        setActiveShift(newShift);
        setNotifications(prev => [{ id: `n${Date.now()}`, title: 'Shift Started', message: `${currentUser.name} clocked in.`, timestamp: new Date().toISOString(), read: false }, ...prev]);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard 
                  products={products} 
                  user={currentUser}
                  onWidgetChange={handleWidgetChange}
                  formatCurrency={formatCurrency}
                  t={t} 
                />;
      case 'pos':
        return <POS 
                  user={currentUser}
                  customers={customers}
                  products={products}
                  onAddSale={handleAddSale}
                  onAddCustomer={handleAddCustomer}
                  heldCarts={heldCarts}
                  setHeldCarts={setHeldCarts}
                  formatCurrency={formatCurrency}
                  t={t}
                  businessName={businessName}
               />;
      case 'products':
        return (
          <React.Fragment key="products">
            <Management<Product>
                dataType='products'
                data={products}
                columns={MANAGEMENT_CONFIG.products.columns}
                formFields={MANAGEMENT_CONFIG.products.formFields}
                onAdd={(item) => setAllProducts(prev => [...prev, { ...item, id: `p${Date.now()}`, organizationId: currentOrgId } as Product])}
                onUpdate={(item) => setAllProducts(prev => prev.map(p => p.id === item.id ? item : p))}
                onDelete={(ids) => setAllProducts(prev => prev.filter(p => !ids.includes(p.id)))}
                customActions={{ onAdjustStock: handleStockAdjustment }}
                t={t}
                formatCurrency={formatCurrency}
            />
          </React.Fragment>
        );
      case 'purchases':
        return (
          <React.Fragment key="purchases">
            <Management<PurchaseOrder>
                dataType='purchases'
                data={purchaseOrders}
                columns={MANAGEMENT_CONFIG.purchases.columns}
                formFields={MANAGEMENT_CONFIG.purchases.formFields.map(f => f.key === 'supplierId' ? { ...f, options: suppliers.map(s => ({ value: s.id, label: s.name })) } : f )}
                onAdd={(item) => {
                    const supplier = suppliers.find(s => s.id === (item as any).supplierId);
                    const newPO: PurchaseOrder = {
                        ...item,
                        id: `po${Date.now()}`,
                        supplierName: supplier?.name || 'N/A',
                        createdAt: new Date().toISOString(),
                        createdBy: currentUser.name,
                        items: [], 
                        organizationId: currentOrgId
                    } as PurchaseOrder;
                    setAllPurchaseOrders(prev => [newPO, ...prev]);
                }}
                onUpdate={(item) => {
                    const supplier = suppliers.find(s => s.id === (item as any).supplierId);
                    const updatedPO = { ...item, supplierName: supplier?.name || 'N/A' };
                    setAllPurchaseOrders(prev => prev.map(p => p.id === item.id ? updatedPO : p));
                }}
                onDelete={(ids) => setAllPurchaseOrders(prev => prev.filter(p => !ids.includes(p.id)))}
                t={t}
                formatCurrency={formatCurrency}
            />
          </React.Fragment>
        );
      case 'suppliers':
        return (
          <React.Fragment key="suppliers">
            <Management<Supplier>
                dataType='suppliers'
                data={suppliers}
                columns={MANAGEMENT_CONFIG.suppliers.columns}
                formFields={MANAGEMENT_CONFIG.suppliers.formFields}
                onAdd={(item) => setAllSuppliers(prev => [...prev, { ...item, id: `sup${Date.now()}`, organizationId: currentOrgId } as Supplier])}
                onUpdate={(item) => setAllSuppliers(prev => prev.map(s => s.id === item.id ? item : s))}
                onDelete={(ids) => setAllSuppliers(prev => prev.filter(s => !ids.includes(s.id)))}
                t={t}
                formatCurrency={formatCurrency}
            />
          </React.Fragment>
        );
      case 'customers':
        return (
          <React.Fragment key="customers">
            <Management<Customer>
                dataType='customers'
                data={customers}
                columns={MANAGEMENT_CONFIG.customers.columns}
                formFields={MANAGEMENT_CONFIG.customers.formFields}
                onAdd={(item) => setAllCustomers(prev => [...prev, { ...item, id: `c${Date.now()}`, organizationId: currentOrgId } as Customer])}
                onUpdate={(item) => setAllCustomers(prev => prev.map(c => c.id === item.id ? item : c))}
                onDelete={(ids) => setAllCustomers(prev => prev.filter(c => !ids.includes(c.id)))}
                customActions={{ onRecordPayment: handleRecordPayment }}
                t={t}
                formatCurrency={formatCurrency}
            />
          </React.Fragment>
        );
      case 'employees':
        return (
          <React.Fragment key="employees">
            <Management<User>
                dataType='employees'
                data={employees}
                columns={MANAGEMENT_CONFIG.employees.columns}
                formFields={MANAGEMENT_CONFIG.employees.formFields}
                onAdd={(item) => {
                    const newEmployee: User = {
                        ...item,
                        id: `u${Date.now()}`,
                        avatarUrl: (item as Partial<User>).avatarUrl || `https://i.pravatar.cc/150?u=${Date.now()}`,
                        organizationId: currentOrgId
                    } as User;
                    setAllEmployees(prev => [...prev, newEmployee]);
                }}
                onUpdate={(item) => setAllEmployees(prev => prev.map(e => e.id === item.id ? item : e))}
                onDelete={(ids) => setAllEmployees(prev => prev.filter(e => !ids.includes(e.id)))}
                t={t}
                formatCurrency={formatCurrency}
            />
          </React.Fragment>
        );
       case 'expenses':
        return (
          <React.Fragment key="expenses">
            <Management<Expense>
                dataType='expenses'
                data={expenses}
                columns={MANAGEMENT_CONFIG.expenses.columns}
                formFields={MANAGEMENT_CONFIG.expenses.formFields}
                onAdd={(item) => {
                    const newExpense: Expense = {
                        ...item,
                        id: `e${Date.now()}`,
                        recordedBy: currentUser.name,
                        organizationId: currentOrgId
                    } as Expense;
                    setAllExpenses(prev => [newExpense, ...prev]);
                }}
                onUpdate={(item) => setAllExpenses(prev => prev.map(e => e.id === item.id ? item : e))}
                onDelete={(ids) => setAllExpenses(prev => prev.filter(e => !ids.includes(e.id)))}
                t={t}
                formatCurrency={formatCurrency}
            />
          </React.Fragment>
        );
      case 'reports':
        return <Reports sales={sales} users={employees} customers={customers} formatCurrency={formatCurrency} />;
      case 'settings':
        return <Settings 
            user={currentUser} 
            employees={employees}
            isDarkMode={isDarkMode} 
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            businessName={businessName}
            setBusinessName={setBusinessName}
            businessLogo={businessLogo}
            setBusinessLogo={setBusinessLogo}
            licenseKeys={licenseKeys}
            setLicenseKeys={(newKeys) => {
                if (typeof newKeys === 'function') {
                    setAllLicenseKeys(prev => {
                        const currentOrgKeys = prev.filter(k => k.organizationId === currentOrgId);
                        const otherKeys = prev.filter(k => k.organizationId !== currentOrgId);
                        const updatedCurrent = newKeys(currentOrgKeys);
                        return [...otherKeys, ...updatedCurrent];
                    });
                } else {
                     setAllLicenseKeys(prev => {
                        const otherKeys = prev.filter(k => k.organizationId !== currentOrgId);
                        return [...otherKeys, ...newKeys];
                     });
                }
            }}
            language={language}
            setLanguage={setLanguage}
            currency={currency}
            setCurrency={setCurrency}
            t={t}
        />;
      default:
        return <Dashboard 
                  products={products} 
                  user={currentUser}
                  onWidgetChange={handleWidgetChange}
                  formatCurrency={formatCurrency}
                  t={t} 
                />;
    }
  };

  if (isLoadingLicense) return null;

  if (!activeLicense) {
    return <LicenseGate onSuccess={handleLicenseActivation} onStartTrial={handleStartTrial} />;
  }

  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 font-sans">
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
        
        <button 
            onClick={handleDeactivateLicense} 
            className="fixed bottom-4 left-4 z-50 text-xs bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-2 py-1 rounded opacity-50 hover:opacity-100 transition-all"
            title="Developer: Clear License"
        >
            Reset License
        </button>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 bg-neutral-50 dark:bg-neutral-900">
          {renderContent()}
        </main>
        <VirtualKeyboard />
      </div>
    </div>
  );
}

export default App;
