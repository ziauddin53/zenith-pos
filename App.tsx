
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
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Role, User, Product, Customer, Sale, LicenseKey, Notification, Supplier, PurchaseOrder, Shift, HeldCart, Expense, MasterLicense, CartItem } from './types';
import { MOCK_USERS, MOCK_PRODUCTS, MOCK_CUSTOMERS, MOCK_SALES_DATA, MANAGEMENT_CONFIG, MOCK_LICENSE_KEYS, MOCK_NOTIFICATIONS, MOCK_SUPPLIERS, MOCK_PURCHASE_ORDERS, MOCK_EXPENSES, MOCK_MASTER_LICENSES, WIDGETS_CONFIG } from './constants';

// Helper to load data from LocalStorage or fall back to Mocks
function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

function App() {
  // License State
  const [activeLicense, setActiveLicense] = useState<MasterLicense | null>(null);
  const [isLoadingLicense, setIsLoadingLicense] = useState(true);
  
  // Auth UI State
  const [isSigningUp, setIsSigningUp] = useState(false);

  // --- 1. GLOBAL PERSISTENT STATE (Loads from Browser Storage) ---
  const [allEmployees, setAllEmployees] = useState<User[]>(() => loadFromStorage('zenith_users', MOCK_USERS));
  const [allProducts, setAllProducts] = useState<Product[]>(() => loadFromStorage('zenith_products', MOCK_PRODUCTS));
  const [allCustomers, setAllCustomers] = useState<Customer[]>(() => loadFromStorage('zenith_customers', MOCK_CUSTOMERS));
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>(() => loadFromStorage('zenith_suppliers', MOCK_SUPPLIERS));
  const [allPurchaseOrders, setAllPurchaseOrders] = useState<PurchaseOrder[]>(() => loadFromStorage('zenith_pos', MOCK_PURCHASE_ORDERS));
  const [allSales, setAllSales] = useState<Sale[]>(() => loadFromStorage('zenith_sales', MOCK_SALES_DATA));
  const [allExpenses, setAllExpenses] = useState<Expense[]>(() => loadFromStorage('zenith_expenses', MOCK_EXPENSES));
  const [allLicenseKeys, setAllLicenseKeys] = useState<LicenseKey[]>(() => loadFromStorage('zenith_licenses', MOCK_LICENSE_KEYS));
  
  // Dynamic Master Licenses (so newly registered orgs can login)
  const [allMasterLicenses, setAllMasterLicenses] = useState<MasterLicense[]>(() => loadFromStorage('zenith_master_db', MOCK_MASTER_LICENSES));
  
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeShift, setActiveShift] = useState<Shift | null>(null);
  const [heldCarts, setHeldCarts] = useState<HeldCart[]>([]);

  // App UI State
  const [currentUser, setCurrentUser] = useState<User | null>(null); 
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [businessName, setBusinessName] = useState('Zenith POS');
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);
  
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
  useEffect(() => localStorage.setItem('zenith_master_db', JSON.stringify(allMasterLicenses)), [allMasterLicenses]);

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
    if (storedLicense) {
      try {
        const parsedLicense = JSON.parse(storedLicense) as MasterLicense;
        if (new Date(parsedLicense.validUntil) > new Date()) {
           setActiveLicense(parsedLicense);
        } else {
           localStorage.removeItem('zenith_master_license');
        }
      } catch (e) {
        console.error("Failed to parse license", e);
        localStorage.removeItem('zenith_master_license');
      }
    }
    setIsLoadingLicense(false);
  }, []);

  const handleLicenseActivation = (license: MasterLicense) => {
    localStorage.setItem('zenith_master_license', JSON.stringify(license));
    setActiveLicense(license);
    setIsSigningUp(false);
  };

  const handleDeactivateLicense = () => {
    localStorage.removeItem('zenith_master_license');
    setActiveLicense(null);
    setCurrentUser(null);
    setIsSigningUp(false);
  }

  // --- 5. SIGN UP LOGIC ---
  const handleSignUp = (orgName: string, adminName: string, email: string, password: string) => {
      const newOrgId = `org_${Date.now()}`;
      
      // 1. Create Admin User
      const getDefaultWidgetsForRole = (role: Role): Record<string, boolean> => {
        const widgets: Record<string, boolean> = {};
        WIDGETS_CONFIG.forEach(widget => {
            widgets[widget.id] = widget.roles.includes(role);
        });
        return widgets;
      };

      const newAdmin: User = {
          id: `u${Date.now()}`,
          name: adminName,
          email: email,
          password: password,
          role: Role.Admin,
          organizationId: newOrgId,
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(adminName)}&background=random`,
          dashboardWidgets: getDefaultWidgetsForRole(Role.Admin)
      };
      setAllEmployees(prev => [...prev, newAdmin]);

      // 2. Create 7-Day Trial License
      const trialKey = `ZENITH-TRIAL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const trialLicense: MasterLicense = {
          key: trialKey,
          organizationId: newOrgId,
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 Days from now
          planType: 'Trial',
          status: 'Active'
      };
      setAllMasterLicenses(prev => [...prev, trialLicense]);

      // 3. Auto Activate
      handleLicenseActivation(trialLicense);
      
      // 4. Auto Login
      setCurrentUser(newAdmin);
      setBusinessName(orgName);
      setActiveView('dashboard');
  };

  // --- 6. DERIVED STATE (Multi-Tenancy Filtering) ---
  
  const currentOrgId = currentUser?.organizationId;

  // Memoized filtered lists - only valid when currentUser is set
  const employees = useMemo(() => currentUser ? allEmployees.filter(u => u.organizationId === currentOrgId) : [], [allEmployees, currentOrgId]);
  const products = useMemo(() => currentUser ? allProducts.filter(p => p.organizationId === currentOrgId) : [], [allProducts, currentOrgId]);
  const customers = useMemo(() => currentUser ? allCustomers.filter(c => c.organizationId === currentOrgId) : [], [allCustomers, currentOrgId]);
  const suppliers = useMemo(() => currentUser ? allSuppliers.filter(s => s.organizationId === currentOrgId) : [], [allSuppliers, currentOrgId]);
  const purchaseOrders = useMemo(() => currentUser ? allPurchaseOrders.filter(p => p.organizationId === currentOrgId) : [], [allPurchaseOrders, currentOrgId]);
  const sales = useMemo(() => currentUser ? allSales.filter(s => s.organizationId === currentOrgId) : [], [allSales, currentOrgId]);
  const expenses = useMemo(() => currentUser ? allExpenses.filter(e => e.organizationId === currentOrgId) : [], [allExpenses, currentOrgId]);
  const licenseKeys = useMemo(() => currentUser ? allLicenseKeys.filter(l => l.organizationId === currentOrgId) : [], [allLicenseKeys, currentOrgId]);

  // Update business name based on org
  useEffect(() => {
    if (currentOrgId === 'org_coffee') setBusinessName('Zenith Coffee');
    else if (currentOrgId === 'org_tech') setBusinessName('Tech Zone');
    // For newly registered orgs, businessName is set during signup, but on refresh we might lose it if not stored in Org table (which we simulate via user)
    // In a real app, we'd fetch Organization details. Here we persist active name in state.
  }, [currentOrgId]);

  // --- 7. THEME ---
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- 8. HANDLERS & SYNC ---

  const handleLogin = async (email: string, password: string): Promise<string | null> => {
    const user = allEmployees.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return "User not found.";
    }

    if (activeLicense && user.organizationId !== activeLicense.organizationId) {
      return "User does not belong to this organization.";
    }

    const validPassword = user.password || '123456';
    if (password !== validPassword) {
      return "Invalid password.";
    }

    setCurrentUser(user);
    const defaultViewForRole = user.role === Role.Cashier ? 'pos' : 'dashboard';
    setActiveView(defaultViewForRole);
    return null;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveShift(null); 
  }
  
  const handleWidgetChange = (widgetId: string, isVisible: boolean) => {
    if (!currentUser) return;
    const newWidgets = { ...currentUser.dashboardWidgets, [widgetId]: isVisible };
    const updatedUser = { ...currentUser, dashboardWidgets: newWidgets };
    setCurrentUser(updatedUser);
    setAllEmployees(prev => prev.map(emp => emp.id === currentUser.id ? updatedUser : emp));
  };

  const handleAddSale = (saleData: Omit<Sale, 'id' | 'cashier' | 'cashierId' | 'date'>, cartItems: CartItem[]) => {
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

    setAllProducts(prevProducts => prevProducts.map(product => {
        const soldItem = cartItems.find(item => item.id === product.id);
        if (soldItem) {
            return { ...product, stock: Math.max(0, product.stock - soldItem.quantity) };
        }
        return product;
    }));

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

  const handleToggleShift = () => {
    if (!currentUser) return;
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
    if (!currentUser) return null;

    switch (activeView) {
      case 'dashboard':
        return <Dashboard products={products} user={currentUser} onWidgetChange={handleWidgetChange} />;
      case 'pos':
        return <POS user={currentUser} customers={customers} products={products} onAddSale={handleAddSale} onAddCustomer={handleAddCustomer} heldCarts={heldCarts} setHeldCarts={setHeldCarts} />;
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
                    const newPO: PurchaseOrder = { ...item, id: `po${Date.now()}`, supplierName: supplier?.name || 'N/A', createdAt: new Date().toISOString(), createdBy: currentUser.name, items: [], organizationId: currentOrgId } as PurchaseOrder;
                    setAllPurchaseOrders(prev => [newPO, ...prev]);
                }}
                onUpdate={(item) => {
                    const supplier = suppliers.find(s => s.id === (item as any).supplierId);
                    const updatedPO = { ...item, supplierName: supplier?.name || 'N/A' };
                    setAllPurchaseOrders(prev => prev.map(p => p.id === item.id ? updatedPO : p));
                }}
                onDelete={(ids) => setAllPurchaseOrders(prev => prev.filter(p => !ids.includes(p.id)))}
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
                    const newEmployee: User = { ...item, id: `u${Date.now()}`, avatarUrl: (item as Partial<User>).avatarUrl || `https://i.pravatar.cc/150?u=${Date.now()}`, organizationId: currentOrgId, password: (item as any).password || '123456' } as User;
                    setAllEmployees(prev => [...prev, newEmployee]);
                }}
                onUpdate={(item) => setAllEmployees(prev => prev.map(e => e.id === item.id ? item : e))}
                onDelete={(ids) => setAllEmployees(prev => prev.filter(e => !ids.includes(e.id)))}
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
                    const newExpense: Expense = { ...item, id: `e${Date.now()}`, recordedBy: currentUser.name, organizationId: currentOrgId } as Expense;
                    setAllExpenses(prev => [newExpense, ...prev]);
                }}
                onUpdate={(item) => setAllExpenses(prev => prev.map(e => e.id === item.id ? item : e))}
                onDelete={(ids) => setAllExpenses(prev => prev.filter(e => !ids.includes(e.id)))}
            />
          </React.Fragment>
        );
      case 'reports':
        return <Reports sales={sales} users={employees} customers={customers} />;
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
        />;
      default:
        return <Dashboard products={products} user={currentUser} onWidgetChange={handleWidgetChange} />;
    }
  };

  if (isLoadingLicense) return null;

  // 1. Handle Sign Up Flow
  if (isSigningUp) {
      return <SignUp onSignUp={handleSignUp} onSwitchToLogin={() => setIsSigningUp(false)} />;
  }

  // 2. If no Master License is active, show License Gate
  if (!activeLicense) {
    return <LicenseGate onSuccess={handleLicenseActivation} masterLicenses={allMasterLicenses} onSwitchToSignUp={() => setIsSigningUp(true)} />;
  }

  // 3. If License is active but no User is logged in, show Login Screen
  if (!currentUser) {
    return <Login onLogin={handleLogin} onSwitchToSignUp={() => { handleDeactivateLicense(); setIsSigningUp(true); }} />;
  }

  // 4. Authenticated App
  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 font-sans">
      <Sidebar userRole={currentUser.role} activeView={activeView} setActiveView={setActiveView} isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} businessName={businessName} businessLogo={businessLogo} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={currentUser} onLogout={handleLogout} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          businessName={businessName} businessLogo={businessLogo}
          activeView={activeView} setActiveView={setActiveView}
          notifications={notifications} setNotifications={setNotifications}
          activeShift={activeShift} onToggleShift={handleToggleShift}
          isOnline={isOnline}
        />
        
        {/* Dev Only: Reset Button */}
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
      </div>
    </div>
  );
}

export default App;
