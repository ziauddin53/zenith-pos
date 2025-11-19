import React, { useState, useEffect } from 'react';
import { User, Role, LicenseKey } from '../types';
import { ICONS } from '../constants';

// Icons
const UserCircleIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const PaintBrushIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a2.25 2.25 0 012.245-2.4 4.5 4.5 0 00-2.245-8.4c-.798 0-1.563.31-2.122.875q-.56.565-.875 1.222m-1.622 8.455a15.998 15.998 0 00-1.622-3.385m3.388 1.62a15.998 15.998 0 01-3.388-1.62" /></svg>
);
const Cog8ToothIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0" /></svg>
);
const ShieldCheckIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
);
const BuildingStorefrontIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H4.5A2.25 2.25 0 002.25 13.5V21M3 3h12M3 3v2.25M3 3l9 9M15 3h6m0 0v2.25M15 3l6 6M21 3l-9 9M15 21v-7.5A2.25 2.25 0 0012.75 11.25h-.625a2.25 2.25 0 00-2.25 2.25V21" /></svg>
);
const KeyIcon = ICONS.KeyIcon;
const ClipboardIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);
const XMarkIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);
const QuestionMarkCircleIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
);
const ChevronDownIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
);
const BookOpenIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);


interface SettingsProps {
    user: User;
    employees: User[];
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    businessName: string;
    setBusinessName: (name: string) => void;
    businessLogo: string | null;
    setBusinessLogo: (logo: string) => void;
    licenseKeys: LicenseKey[];
    setLicenseKeys: React.Dispatch<React.SetStateAction<LicenseKey[]>>;
}

const SettingsCard: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold flex items-center gap-3">
                {icon}
                {title}
            </h3>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const NotificationBanner: React.FC<{
    type: 'success' | 'error';
    message: string;
    onClose: () => void;
}> = ({ type, message, onClose }) => {
    const baseClasses = "p-4 rounded-md flex items-center justify-between shadow-md mb-6";
    const typeClasses = type === 'success' 
        ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200"
        : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200";

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            <p className="text-sm font-medium">{message}</p>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-black/10">
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b dark:border-neutral-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-4 px-1"
            >
                <span className="font-semibold text-neutral-800 dark:text-neutral-100">{title}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 px-1 text-neutral-600 dark:text-neutral-300 prose prose-sm dark:prose-invert max-w-none whitespace-pre-line">
                    {children}
                </div>
            )}
        </div>
    );
};

const FULL_GUIDE_SECTIONS = [
    {
        title: "1. Getting Started",
        content: "Welcome to Zenith POS. \n\n**Login:** Access the system using your assigned email and password.\n**Roles:**\n- **Admin:** Full access to all settings, users, and data.\n- **Manager:** Manages products, inventory, and reports, but cannot change system settings.\n- **Cashier:** Restricted access focused on the Point of Sale (POS) and Customer handling."
    },
    {
        title: "2. Point of Sale (POS)",
        content: "The POS module is the heart of your operations.\n\n- **Adding Items:** Click on product cards or use the search bar to find items. Scan barcodes if a scanner is connected.\n- **Cart:** Adjust quantities or remove items directly in the cart view.\n- **Customers:** Select an existing customer to track loyalty points and credit. You can add new customers on the fly.\n- **Holding Orders:** Use the 'Hold' button to temporarily park a transaction (e.g., if a customer forgot their wallet). Resume it later from the 'Held Orders' list.\n- **Payments:** Click 'Charge' to proceed. Select Cash, Card, or Credit. 'Credit' is only available for registered customers."
    },
    {
        title: "3. Product & Inventory Management",
        content: "Keep your stock organized.\n\n- **Products:** Add, edit, or delete products. Set 'Low Stock Thresholds' to get alerts when items run low.\n- **Suppliers:** Maintain a list of your vendors.\n- **Purchases:** Create Purchase Orders (POs) when restocking. Once a PO is 'Completed', the stock is automatically added to your inventory."
    },
    {
        title: "4. Customer & Credit Management",
        content: "Build relationships and manage debts.\n\n- **Profiles:** Track contact info and purchase history.\n- **Credit/Dues:** You can sell items on credit. Set 'Credit Limits' to prevent over-spending. \n- **Repayment:** When a customer pays off their debt, go to the 'Customers' page and click the green 'Banknote' icon to record the payment."
    },
    {
        title: "5. Reports & Analytics",
        content: "Gain insights into your business.\n\n- **Sales Report:** View daily, weekly, or monthly sales. Filter by cashier or customer.\n- **Export:** Download data as CSV or Excel files for external accounting.\n- **Dashboard:** Use the main dashboard for a quick overview of revenue, top products, and low stock alerts."
    },
    {
        title: "6. Shift Management",
        content: "Track employee hours.\n\n- **Clock In/Out:** Use the button in the top header to start or end your shift.\n- **Status:** The header displays the current active shift time."
    },
    {
        title: "7. Settings & Administration",
        content: "Configure the system (Admin only).\n\n- **Business Profile:** Update your store name and logo.\n- **System:** Set default tax rates and manage data backups.\n- **License Keys:** Generate and revoke access keys for different devices."
    }
];

const HelpModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start p-4 pt-16">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <QuestionMarkCircleIcon className="w-6 h-6 text-primary-500"/>
                        System User Guide
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><XMarkIcon className="w-6 h-6"/></button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        Comprehensive guide to operating the Zenith POS system. Click on a section to expand.
                    </p>
                    {FULL_GUIDE_SECTIONS.map((section, index) => (
                        <AccordionItem key={index} title={section.title}>
                            {section.content}
                        </AccordionItem>
                    ))}
                </div>
                 <div className="flex items-center justify-end p-4 border-t dark:border-neutral-700">
                    <button onClick={onClose} className="bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-700 transition-colors">Close Guide</button>
                </div>
            </div>
        </div>
    );
};

const Settings: React.FC<SettingsProps> = ({ user, employees, isDarkMode, toggleDarkMode, businessName, setBusinessName, businessLogo, setBusinessLogo, licenseKeys, setLicenseKeys }) => {
    const [taxRate, setTaxRate] = useState(8);
    const [is2faEnabled, setIs2faEnabled] = useState(false);
    const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
    const [isRevokeConfirmOpen, setIsRevokeConfirmOpen] = useState(false);
    const [keyToRevoke, setKeyToRevoke] = useState<LicenseKey | null>(null);
    const [newKeyData, setNewKeyData] = useState({ userId: '', deviceName: '', validity: 'Lifetime' });
    const [generatedKey, setGeneratedKey] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [modalError, setModalError] = useState<string | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    
     useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleSaveChanges = (section: string) => {
        setNotification({ type: 'success', message: `${section} settings saved successfully!` });
    };

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBusinessLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateKey = () => {
        setModalError(null);
        if (!newKeyData.userId || !newKeyData.deviceName.trim()) {
            setModalError("Please select a user and enter a device name.");
            return;
        }

        const selectedUser = employees.find(e => e.id === newKeyData.userId);
        if (!selectedUser) {
            setModalError("Selected user could not be found.");
            return;
        }

        try {
            const key = `ZENITH-${[...Array(3)].map(() => Math.random().toString(36).substring(2, 6).toUpperCase()).join('-')}`;
            
            const newLicense: LicenseKey = {
                id: `lk${Date.now()}`,
                key: key,
                assignedToUserId: selectedUser.id,
                assignedToUserName: selectedUser.name,
                deviceName: newKeyData.deviceName,
                status: 'Active',
                validity: newKeyData.validity === 'Lifetime' ? 'Lifetime' : new Date(Date.now() + 31536000000).toISOString(),
                organizationId: user.organizationId,
            };

            setLicenseKeys(prev => [...prev, newLicense]);
            setGeneratedKey(key);
            setNotification({ type: 'success', message: 'New license key generated.' });
        } catch (error) {
            console.error("Key generation failed:", error);
            setModalError("An unexpected error occurred during key generation.");
        }
    };

    const openLicenseModal = () => {
        setGeneratedKey(null);
        setModalError(null);
        setNewKeyData({ userId: '', deviceName: '', validity: 'Lifetime' });
        setIsLicenseModalOpen(true);
    };
    
    const closeLicenseModal = () => setIsLicenseModalOpen(false);

    const openRevokeConfirm = (license: LicenseKey) => {
        setKeyToRevoke(license);
        setIsRevokeConfirmOpen(true);
    };

    const closeRevokeConfirm = () => {
        setKeyToRevoke(null);
        setIsRevokeConfirmOpen(false);
    };

    const handleRevokeKey = () => {
        if (!keyToRevoke) {
            setNotification({ type: 'error', message: "No key selected for revocation." });
            closeRevokeConfirm();
            return;
        }
        try {
            setLicenseKeys(prev => prev.map(k => k.id === keyToRevoke.id ? { ...k, status: 'Revoked' } : k));
            setNotification({ type: 'success', message: `Key for ${keyToRevoke.assignedToUserName} has been revoked.` });
        } catch (error) {
            console.error("Failed to revoke key:", error);
            setNotification({ type: 'error', message: "Failed to revoke the key. Please try again." });
        }
        closeRevokeConfirm();
    };


    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">Settings</h1>
            
            {notification && (
                <NotificationBanner 
                    type={notification.type} 
                    message={notification.message} 
                    onClose={() => setNotification(null)} 
                />
            )}

            {/* Help & Documentation Card */}
            <SettingsCard title="Help & Documentation" icon={<BookOpenIcon className="w-6 h-6 text-primary-500" />}>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">System User Guide</h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Need help? View the complete manual on how to operate the POS software.</p>
                    </div>
                     <button onClick={() => setIsHelpModalOpen(true)} className="bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-semibold px-4 py-2 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/80 transition-colors flex items-center gap-2">
                        <QuestionMarkCircleIcon className="w-5 h-5"/>
                        Open Guide
                    </button>
                </div>
            </SettingsCard>

            {/* Profile Settings */}
            <SettingsCard title="Profile" icon={<UserCircleIcon className="w-6 h-6 text-primary-500" />}>
                <div className="flex items-center gap-4 mb-6">
                    <img src={user.avatarUrl} alt="Profile Avatar" className="w-20 h-20 rounded-full object-cover" />
                    <div>
                        <h4 className="text-xl font-bold">{user.name}</h4>
                        <p className="text-neutral-500 dark:text-neutral-400">{user.role}</p>
                    </div>
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-700 my-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Full Name</label>
                        <input type="text" defaultValue={user.name} className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Email Address</label>
                        <input type="email" defaultValue={user.email} className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Current Password</label>
                        <input type="password" placeholder="••••••••" className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">New Password</label>
                        <input type="password" placeholder="••••••••" className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button onClick={() => handleSaveChanges('Profile')} className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Save Changes</button>
                </div>
            </SettingsCard>

            {/* Business Settings (Admin only) */}
            {user.role === Role.Admin && (
                 <SettingsCard title="Business" icon={<BuildingStorefrontIcon className="w-6 h-6 text-primary-500" />}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Business Name</label>
                            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Business Logo</label>
                            <div className="mt-2 flex items-center gap-4">
                                <div className="w-16 h-16 rounded-md bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                                    {businessLogo ? <img src={businessLogo} alt="Business Logo Preview" className="h-full w-full object-contain" /> : <BuildingStorefrontIcon className="w-8 h-8 text-neutral-400" />}
                                </div>
                                <input
                                    type="file"
                                    onChange={handleLogoChange}
                                    accept="image/*"
                                    className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                />
                            </div>
                        </div>
                    </div>
                 </SettingsCard>
            )}

            {/* Appearance Settings */}
            <SettingsCard title="Appearance" icon={<PaintBrushIcon className="w-6 h-6 text-primary-500" />}>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">Dark Mode</h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Toggle between light and dark themes.</p>
                    </div>
                    <button onClick={toggleDarkMode} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-600'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </SettingsCard>
            
            {/* System Settings */}
            <SettingsCard title="System" icon={<Cog8ToothIcon className="w-6 h-6 text-primary-500" />}>
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Default Tax Rate (%)</label>
                        <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="mt-1 w-full md:w-1/2 bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                         <div>
                            <h4 className="font-medium">Data Management</h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Backup or restore your application data.</p>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                            <button onClick={() => setNotification({ type: 'success', message: 'Data backup initiated!' })} className="bg-secondary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors">Backup Data</button>
                             <button onClick={() => alert('Opening restore dialog...')} className="bg-neutral-200 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-100 font-semibold px-4 py-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-500 transition-colors">Restore Data</button>
                        </div>
                    </div>
                </div>
                 <div className="mt-6 text-right">
                    <button onClick={() => handleSaveChanges('System')} className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Save Changes</button>
                </div>
            </SettingsCard>

            {/* Security Settings */}
            <SettingsCard title="Security" icon={<ShieldCheckIcon className="w-6 h-6 text-primary-500" />}>
                 <div className="flex items-center justify-between mb-4">
                    <div>
                        <h4 className="font-medium">Two-Factor Authentication (2FA)</h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Add an extra layer of security to your account.</p>
                    </div>
                    <button onClick={() => setIs2faEnabled(!is2faEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${is2faEnabled ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-600'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${is2faEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </SettingsCard>

            {/* License Management (Admin only) */}
            {user.role === Role.Admin && (
                <SettingsCard title="License Management" icon={<KeyIcon className="w-6 h-6 text-primary-500" />}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h4 className="font-medium">Activation Keys</h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Manage activation keys for your team's devices.</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                            <button onClick={openLicenseModal} className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Generate New Key</button>
                        </div>
                    </div>
                    
                    <div className="mt-4 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-900 dark:text-white sm:pl-0">Key</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900 dark:text-white">Assigned To</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900 dark:text-white">Status</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900 dark:text-white">Validity</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                        {licenseKeys.map(license => (
                                            <tr key={license.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-neutral-500 dark:text-neutral-400 sm:pl-0">{`ZENITH-****-****-${license.key.slice(-4)}`}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500 dark:text-neutral-300">
                                                    <div className="font-medium text-neutral-900 dark:text-white">{license.assignedToUserName}</div>
                                                    <div>{license.deviceName}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${license.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'}`}>
                                                        {license.status}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500 dark:text-neutral-300">
                                                    {license.validity === 'Lifetime' ? 'Lifetime' : `Expires ${new Date(license.validity).toLocaleDateString()}`}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    {license.status === 'Active' ? (
                                                        <button onClick={() => openRevokeConfirm(license)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Revoke</button>
                                                    ) : (
                                                        <span className="text-neutral-400">Revoked</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </SettingsCard>
            )}

            {isLicenseModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
                            <h3 className="text-lg font-semibold">{generatedKey ? 'Key Generated Successfully' : 'Generate New License Key'}</h3>
                            <button onClick={closeLicenseModal} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><XMarkIcon className="w-6 h-6"/></button>
                        </div>
                        {generatedKey ? (
                            <div className="p-6 text-center">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Please copy this key and provide it to the user. It will not be shown again.</p>
                                <div className="relative p-3 bg-neutral-100 dark:bg-neutral-900 rounded-md font-mono text-center">
                                    {generatedKey}
                                    <button onClick={() => navigator.clipboard.writeText(generatedKey)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-neutral-500 hover:text-primary-600"><ClipboardIcon className="w-5 h-5"/></button>
                                </div>
                                <button onClick={closeLicenseModal} className="mt-4 w-full bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Close</button>
                            </div>
                        ) : (
                            <div>
                                <div className="p-6 space-y-4">
                                    {modalError && (
                                        <div className="p-3 rounded-md bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-sm">
                                            {modalError}
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Assign to User</label>
                                        <select value={newKeyData.userId} onChange={e => setNewKeyData(p => ({...p, userId: e.target.value}))} className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none">
                                            <option value="" disabled>Select an employee</option>
                                            {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.role})</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Device Name</label>
                                        <input type="text" placeholder="e.g., Main Counter PC" value={newKeyData.deviceName} onChange={e => setNewKeyData(p => ({...p, deviceName: e.target.value}))} className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Validity</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center"><input type="radio" name="validity" value="Lifetime" checked={newKeyData.validity === 'Lifetime'} onChange={e => setNewKeyData(p => ({...p, validity: e.target.value}))} className="mr-2"/> Lifetime</label>
                                            <label className="flex items-center"><input type="radio" name="validity" value="1 Year" checked={newKeyData.validity === '1 Year'} onChange={e => setNewKeyData(p => ({...p, validity: e.target.value}))} className="mr-2"/> 1 Year</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-4 border-t dark:border-neutral-700 space-x-2">
                                    <button onClick={closeLicenseModal} className="text-neutral-500 bg-white hover:bg-neutral-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-neutral-200 text-sm font-medium px-5 py-2.5 hover:text-neutral-900 focus:z-10 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-white dark:hover:bg-neutral-600 dark:focus:ring-neutral-600">Cancel</button>
                                    <button onClick={handleGenerateKey} className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Generate Key</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {isRevokeConfirmOpen && keyToRevoke && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
                            <h3 className="text-lg font-semibold">Confirm Revoke</h3>
                            <button onClick={closeRevokeConfirm} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><XMarkIcon className="w-6 h-6"/></button>
                        </div>
                        <div className="p-6">
                            <p>Are you sure you want to revoke the key for <span className="font-semibold">{keyToRevoke.assignedToUserName}</span> on device <span className="font-semibold">{keyToRevoke.deviceName}</span>? They will no longer be able to access the application with this key.</p>
                        </div>
                        <div className="flex items-center justify-end p-4 border-t dark:border-neutral-700 space-x-2">
                            <button onClick={closeRevokeConfirm} className="text-neutral-500 bg-white hover:bg-neutral-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-neutral-200 text-sm font-medium px-5 py-2.5 hover:text-neutral-900 focus:z-10 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-white dark:hover:bg-neutral-600 dark:focus:ring-neutral-600">Cancel</button>
                            <button onClick={handleRevokeKey} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Revoke Key</button>
                        </div>
                    </div>
                </div>
            )}
            
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
            
            <button
                onClick={() => setIsHelpModalOpen(true)}
                className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 z-40"
                aria-label="Open settings guide"
            >
                <QuestionMarkCircleIcon className="w-8 h-8" />
            </button>
        </div>
    );
};

export default Settings;