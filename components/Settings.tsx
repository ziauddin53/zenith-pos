
import React, { useState, useEffect, useRef } from 'react';
import { User, Role, LicenseKey, Language, Currency, MasterLicense } from '../types';
import { ICONS, CURRENCIES } from '../constants';
import { generateLicenseKey, PLAN_FEATURE_MAP } from '../services/licenseService';

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
const GlobeAltIcon = ICONS.GlobeAltIcon;
const ShieldCheckIcon = ICONS.ShieldCheckIcon;
const XMarkIcon = ICONS.XMarkIcon;
const QuestionMarkCircleIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
);
const ChevronDownIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
);
const BanknotesIcon = ICONS.BanknotesIcon;
const KeyIcon = ICONS.KeyIcon;

interface SettingsProps {
    user: User;
    onUpdateUser: (updatedData: Partial<User>) => void;
    employees: User[];
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    businessName: string;
    setBusinessName: (name: string) => void;
    businessLogo: string | null;
    setBusinessLogo: (logo: string) => void;
    licenseKeys: LicenseKey[]; // Device keys
    setLicenseKeys: React.Dispatch<React.SetStateAction<LicenseKey[]>>;
    licenseDatabase: MasterLicense[]; // Master keys
    setLicenseDatabase: React.Dispatch<React.SetStateAction<MasterLicense[]>>;
    language: Language;
    setLanguage: (lang: Language) => void;
    currency: Currency;
    setCurrency: (curr: Currency) => void;
    t: (key: string) => string;
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
    { title: "1. Getting Started", content: "Welcome to Zenith POS. \n\n**Login & Roles:**\n- **Admin:** Full access (Settings, Users, Reports).\n- **Manager:** Manages Inventory & Reports.\n- **Cashier:** Access to POS & Customers only.\n\n**Dashboard:** Customize your dashboard widgets by clicking the 'Customize' button on the top right." },
    { title: "2. Advanced Point of Sale (POS)", content: "Our POS is designed for speed and flexibility.\n\n- **Touchscreen Mode:** Tap any input field (like Search) to open the Virtual Keyboard automatically.\n- **Discounts:** Click the 'Tag Icon' next to any cart item to apply a % or Fixed Amount discount.\n- **Hold Order:** Temporarily save an order if a customer needs time. Resume it later from the 'Held Orders' menu.\n- **Credit Sales:** Select a customer to enable the 'Credit' payment option.\n- **WhatsApp Invoice:** After a sale, click 'WhatsApp Invoice' to send the receipt directly to the customer's phone." },
    { title: "3. Inventory & Products", content: "Manage your stock efficiently.\n\n- **Add Products:** Add items manually or use **'Import CSV'** to upload hundreds of products at once.\n- **Label Printing:** Select multiple products in the list and click **'Print Labels'** to generate barcode stickers.\n- **Stock Adjustment:** Use the 'Adjust Stock' button to correct inventory levels for damage or loss." },
    { title: "4. Offline Mode", content: "**No Internet? No Problem.**\n\nZenith POS works 100% offline. You can continue selling even when the internet is down. All data is saved locally on your device and will automatically sync once the connection is restored. Look for the 'Cloud' icon in the header to check your status." },
    { title: "5. Customers & Loyalty", content: "Build customer loyalty.\n\n- **Points:** Customers earn points for every purchase. You can redeem these points for discounts during checkout.\n- **Credit Limit:** Set a maximum credit limit for each customer to control debt risk.\n- **Due Collection:** Go to the Customer page and click the 'Money' icon to record a due payment." },
    { title: "6. Localization & Currency", content: "Make the app yours.\n\nGo to **Settings > Localization** to:\n- Change the interface language (English / Bangla).\n- Change the currency symbol (USD, BDT, EUR, INR).\nThe entire app will instantly update to reflect your choices." },
    { title: "7. Data Security & Backup", content: "Your data is safe.\n\n- **Backup:** In Settings, click 'Backup Data' to download a full copy of your system data as a JSON file.\n- **Restore:** If you change devices or clear your browser, use 'Restore Data' to upload your backup file and resume exactly where you left off." },
    { title: "8. Managing Multiple Stores", content: "To manage multiple stores or branches, you need an **Enterprise** plan license key.\n\n- **Activation:** Use your Enterprise key to activate the software on the first device. This will establish your main organization.\n- **Data Separation:** The system keeps data for each organization separate and secure.\n- **Note:** The 'multi-shop' feature in the Enterprise plan allows your single organization to operate from multiple locations/devices under one business umbrella." }
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

// Main Settings Component
const Settings: React.FC<SettingsProps> = (props) => {
    const { user, onUpdateUser, employees, isDarkMode, toggleDarkMode, businessName, setBusinessName, businessLogo, setBusinessLogo, licenseKeys, setLicenseKeys, licenseDatabase, setLicenseDatabase, language, setLanguage, currency, setCurrency, t } = props;
    
    const [taxRate, setTaxRate] = useState(8);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const [profileData, setProfileData] = useState<Partial<User>>({
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
    });
    
     useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleProfileDataChange = (e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileData(prev => ({ ...prev, avatarUrl: reader.result as string }));
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = (section: string) => {
        if (section === 'Profile') onUpdateUser({ name: profileData.name, avatarUrl: profileData.avatarUrl });
        setNotification({ type: 'success', message: `${section} settings saved successfully!` });
    };

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setBusinessLogo(reader.result as string);
            reader.readAsDataURL(file);
        }
    };
    
    const handleBackup = () => {
        const dataToBackup = {
            'zenith_users': localStorage.getItem('zenith_users'),
            'zenith_products': localStorage.getItem('zenith_products'),
            'zenith_customers': localStorage.getItem('zenith_customers'),
            'zenith_sales': localStorage.getItem('zenith_sales'),
            'zenith_license_database': localStorage.getItem('zenith_license_database'),
        };
        const blob = new Blob([JSON.stringify(dataToBackup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `zenith_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        setNotification({ type: 'success', message: 'Backup downloaded successfully!' });
    };
    
    const handleRestoreClick = () => fileInputRef.current?.click();
    
    const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                Object.keys(data).forEach(key => {
                    if (data[key]) localStorage.setItem(key, data[key]);
                });
                setNotification({ type: 'success', message: 'Data restored! Please reload the page.' });
                setTimeout(() => window.location.reload(), 2000);
            } catch(err) {
                 setNotification({ type: 'error', message: 'Invalid backup file.' });
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">{t('Settings')}</h1>
            
            {notification && <NotificationBanner type={notification.type} message={notification.message} onClose={() => setNotification(null)} />}

            {/* License Generators based on Role */}
            {user.email === 'superadmin@zenith.com' ? (
                <MasterLicenseGenerator 
                    licenseDatabase={licenseDatabase} 
                    setLicenseDatabase={setLicenseDatabase} 
                    setNotification={setNotification}
                />
            ) : user.role === Role.Admin && (
                 <DeviceLicenseGenerator 
                    licenseKeys={licenseKeys}
                    setLicenseKeys={setLicenseKeys}
                    user={user}
                    setNotification={setNotification}
                 />
            )}

            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
            
            <button
                onClick={() => setIsHelpModalOpen(true)}
                className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 z-40"
                aria-label="Open settings guide"
            >
                <QuestionMarkCircleIcon className="w-8 h-8" />
            </button>

             {/* Profile Settings */}
            <SettingsCard title="Profile" icon={<UserCircleIcon className="w-6 h-6 text-primary-500" />}>
                <div className="flex items-center gap-6 mb-6">
                    <div className="relative w-20 h-20 group flex-shrink-0">
                        <img src={profileData.avatarUrl} alt="Profile Avatar" className="w-20 h-20 rounded-full object-cover" />
                        <button 
                            onClick={() => avatarInputRef.current?.click()}
                            className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <span className="text-xs font-semibold">Change</span>
                        </button>
                        <input 
                            type="file" 
                            ref={avatarInputRef} 
                            onChange={handleAvatarChange} 
                            className="hidden" 
                            accept="image/png, image/jpeg" 
                        />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold">{profileData.name}</h4>
                        <p className="text-neutral-500 dark:text-neutral-400">{user.role}</p>
                    </div>
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-700 my-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Full Name</label>
                        <input type="text" name="name" value={profileData.name} onChange={handleProfileDataChange} className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Email Address</label>
                        <input type="email" value={profileData.email} disabled className="mt-1 w-full bg-neutral-200 dark:bg-neutral-800 border-transparent rounded-lg p-2.5 text-neutral-500 dark:text-neutral-400 cursor-not-allowed" />
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button onClick={() => handleSaveChanges('Profile')} className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Save Changes</button>
                </div>
            </SettingsCard>
            
            {/* Localization Settings */}
            <SettingsCard title="Localization" icon={<GlobeAltIcon className="w-6 h-6 text-primary-500" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2">Language</label>
                        <div className="flex gap-2">
                             <button onClick={() => setLanguage('en')} className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold border ${language === 'en' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'}`}>English</button>
                             <button onClick={() => setLanguage('bn')} className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold border ${language === 'bn' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600'}`}>Bangla</button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2">Currency</label>
                        <select 
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value as Currency)}
                            className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        >
                            {Object.entries(CURRENCIES).map(([code, config]) => (
                                <option key={code} value={code}>{code} - {config.symbol}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </SettingsCard>
            
            {/* Business Configuration */}
            <SettingsCard title="Business Configuration" icon={<BanknotesIcon className="w-6 h-6 text-primary-500" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">Business Name</label>
                        <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">Default Tax Rate (%)</label>
                         <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                    </div>
                </div>
                <div className="mt-4">
                     <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2">Business Logo</p>
                     <div className="flex items-center gap-4">
                         {businessLogo && <img src={businessLogo} alt="Logo" className="w-16 h-16 object-contain border border-neutral-200 rounded p-1" />}
                         <input type="file" accept="image/*" onChange={handleLogoChange} className="text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"/>
                     </div>
                </div>
            </SettingsCard>

            {/* System Settings */}
            <SettingsCard title="System" icon={<Cog8ToothIcon className="w-6 h-6 text-primary-500" />}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                     <div>
                        <h4 className="font-medium">Data Management</h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Backup or restore your application data.</p>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                        <button onClick={handleBackup} className="bg-secondary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors">Backup Data</button>
                         <button onClick={handleRestoreClick} className="bg-neutral-200 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-100 font-semibold px-4 py-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-500 transition-colors">Restore Data</button>
                         <input type="file" accept=".json" ref={fileInputRef} className="hidden" onChange={handleRestoreFile} />
                    </div>
                </div>
            </SettingsCard>
        </div>
    );
};

// Sub-component for Super Admin License Management
interface MasterLicenseGeneratorProps {
    licenseDatabase: MasterLicense[];
    setLicenseDatabase: React.Dispatch<React.SetStateAction<MasterLicense[]>>;
    setNotification: (notif: { type: 'success' | 'error'; message: string } | null) => void;
}

const MasterLicenseGenerator: React.FC<MasterLicenseGeneratorProps> = ({ licenseDatabase, setLicenseDatabase, setNotification }) => {
    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState<'STD' | 'PREM' | 'ENT'>('PREM');
    const [expiryDate, setExpiryDate] = useState('');
    const [features, setFeatures] = useState<string[]>(PLAN_FEATURE_MAP[plan]);

    useEffect(() => {
        const today = new Date();
        today.setFullYear(today.getFullYear() + 1);
        setExpiryDate(today.toISOString().split('T')[0]);
    }, []);

    useEffect(() => {
        setFeatures(PLAN_FEATURE_MAP[plan]);
    }, [plan]);

    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFeatures(prev => checked ? [...prev, value] : prev.filter(f => f !== value));
    };

    const handleGenerate = () => {
        if (!expiryDate) {
            alert('Please select an expiry date.');
            return;
        }
        if (!email) {
            alert('Please provide an email address to assign this license.');
            return;
        }

        const newLicense = generateLicenseKey(plan, new Date(expiryDate), features.join(''), businessName, email);
        setLicenseDatabase(prev => [...prev, newLicense]);
        setNotification({type: 'success', message: `License key ${newLicense.key.slice(0, 15)}... generated successfully!`});
    };
    
    const handleRevoke = (key: string) => {
        setLicenseDatabase(prev => prev.map(lic => lic.key === key ? {...lic, status: 'Revoked'} : lic));
        setNotification({type: 'success', message: 'License has been revoked.'});
    };
    
    const getStatusColor = (status: MasterLicense['status']) => {
        switch(status) {
            case 'Generated': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
            case 'Activated': return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
            case 'Revoked': return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
            case 'Expired': return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300';
        }
    }

    return (
        <SettingsCard title="Super Admin: Master License Generator" icon={<ShieldCheckIcon className="w-6 h-6 text-amber-500" />}>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-800 dark:text-amber-200 text-sm mb-6">
                This panel is visible to Super Admins only. Generate keys locked to specific client emails.
            </div>
            {/* Generator Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b dark:border-neutral-700 pb-6 mb-6">
                <div className="space-y-4">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Assign to Email (Required)" className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5" />
                    <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Business Name (Optional)" className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5" />
                    <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5" />
                </div>
                <div className="space-y-4">
                     <div className="grid grid-cols-3 gap-2">
                        {(['STD', 'PREM', 'ENT'] as const).map(p => 
                            <label key={p} className={`text-center p-2 rounded-lg cursor-pointer border ${plan === p ? 'bg-primary-50 border-primary-400' : 'dark:border-neutral-600'}`}>
                                <input type="radio" name="plan" value={p} checked={plan === p} onChange={e => setPlan(e.target.value as any)} className="sr-only" /> {p}
                            </label>
                        )}
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        {(['A', 'R', 'M', 'C'] as const).map(f =>
                             <label key={f} className="flex items-center text-sm">
                                <input type="checkbox" value={f} checked={features.includes(f)} onChange={handleFeatureChange} className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mr-2" />
                                {f==='A' ? 'AI' : f==='R' ? 'Reports' : f==='M' ? 'Multi-Lang' : 'Cloud'}
                             </label>
                        )}
                     </div>
                </div>
                 <div className="md:col-span-2 text-center">
                    <button onClick={handleGenerate} className="bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-700">Generate New License</button>
                 </div>
            </div>
            
            {/* License List */}
            <h4 className="font-semibold mb-2">License Database</h4>
             <div className="overflow-x-auto max-h-96">
                <table className="w-full text-sm">
                    <thead><tr><th className="text-left p-2">Key</th><th className="text-left p-2">Email Lock</th><th className="text-left p-2">Status</th><th className="text-right p-2">Actions</th></tr></thead>
                    <tbody className="divide-y dark:divide-neutral-700">
                        {licenseDatabase.map(lic => (
                            <tr key={lic.key}>
                                <td className="p-2 font-mono text-xs">{lic.key}</td>
                                <td className="p-2 text-xs">{lic.emailLock || 'None'}</td>
                                <td className="p-2"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lic.status)}`}>{lic.status}</span></td>
                                <td className="p-2 text-right">
                                    {lic.status !== 'Revoked' && <button onClick={() => handleRevoke(lic.key)} className="text-red-500 hover:underline text-xs">Revoke</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SettingsCard>
    );
};

// Sub-component for Shop Admin Device Management
interface DeviceLicenseGeneratorProps {
    licenseKeys: LicenseKey[];
    setLicenseKeys: React.Dispatch<React.SetStateAction<LicenseKey[]>>;
    user: User;
    setNotification: (notif: { type: 'success' | 'error'; message: string } | null) => void;
}

const DeviceLicenseGenerator: React.FC<DeviceLicenseGeneratorProps> = ({ licenseKeys, setLicenseKeys, user, setNotification }) => {
    const [deviceName, setDeviceName] = useState('');

    const handleGenerate = () => {
        if (!deviceName) return alert("Please enter a device name.");
        
        const newKey: LicenseKey = {
            id: `dk_${Date.now()}`,
            key: `DEV-${Math.random().toString(36).substr(2,6).toUpperCase()}`,
            assignedToUserId: '', 
            assignedToUserName: 'Unassigned',
            status: 'Active',
            validity: 'Lifetime',
            deviceName: deviceName,
            organizationId: user.organizationId
        };
        
        setLicenseKeys(prev => [...prev, newKey]);
        setNotification({ type: 'success', message: `Device key for "${deviceName}" generated successfully!`});
        setDeviceName('');
    }

    const handleRevoke = (id: string) => {
        setLicenseKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'Revoked' } : k));
        setNotification({ type: 'success', message: 'Device key revoked.' });
    }

    return (
        <SettingsCard title="Shop Admin: Device & Terminal Management" icon={<KeyIcon className="w-6 h-6 text-blue-500" />}>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-800 dark:text-blue-200 text-sm mb-6">
                Generate access keys for your shop's terminals or employee devices.
            </div>
            
            <div className="flex gap-4 mb-6">
                <input 
                    type="text" 
                    value={deviceName} 
                    onChange={e => setDeviceName(e.target.value)} 
                    placeholder="Device Name (e.g., Counter 1)" 
                    className="flex-1 bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5" 
                />
                <button onClick={handleGenerate} className="bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 whitespace-nowrap">
                    Add Device Key
                </button>
            </div>

            <h4 className="font-semibold mb-2">Active Device Keys</h4>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead><tr><th className="text-left p-2">Device Name</th><th className="text-left p-2">Key</th><th className="text-left p-2">Status</th><th className="text-right p-2">Actions</th></tr></thead>
                    <tbody className="divide-y dark:divide-neutral-700">
                        {licenseKeys.map(key => (
                            <tr key={key.id}>
                                <td className="p-2 font-medium">{key.deviceName}</td>
                                <td className="p-2 font-mono text-xs">{key.key}</td>
                                <td className="p-2"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${key.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{key.status}</span></td>
                                <td className="p-2 text-right">
                                    {key.status === 'Active' && <button onClick={() => handleRevoke(key.id)} className="text-red-500 hover:underline text-xs">Revoke</button>}
                                </td>
                            </tr>
                        ))}
                        {licenseKeys.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-neutral-500">No device keys generated yet.</td></tr>}
                    </tbody>
                </table>
            </div>
        </SettingsCard>
    );
}

export default Settings;
