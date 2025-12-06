import React, { useState, useEffect, useRef } from 'react';
import { User, Role, LicenseKey, Language, Currency, MasterLicense, Store } from '../types';
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
const { GlobeAltIcon, ShieldCheckIcon, XMarkIcon, BanknotesIcon, KeyIcon, BuildingStorefrontIcon, TrashIcon } = ICONS;

const QuestionMarkCircleIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
);
const ChevronDownIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
);
const DevicePhoneMobileIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
);

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
    activeStoreId: string;
    activeLicense: MasterLicense | null;
    onDeactivateLicense: () => void;
    onUpdateLicense: (key: string) => boolean;
    isInTrial: boolean;
    onActivateTrialLicense: (key: string) => void;
    onAddStore: (storeData: Omit<Store, 'id' | 'organizationId'>) => void;
    onDeleteStore: (storeId: string) => void;
    organizationStores: Store[];
    taxRate: number; // New Prop
    setTaxRate: (rate: number) => void; // New Prop
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

const HelpModal: React.FC<{ isOpen: boolean; onClose: () => void; t: (key: string) => string; }> = ({ isOpen, onClose, t }) => {
    if (!isOpen) return null;

    const FULL_GUIDE_SECTIONS = Array.from({ length: 8 }, (_, i) => ({
        title: t(`guide_title_${i + 1}`),
        content: t(`guide_content_${i + 1}`),
    }));

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start p-4 pt-16">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <QuestionMarkCircleIcon className="w-6 h-6 text-primary-500"/>
                        {t('System User Guide')}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><XMarkIcon className="w-6 h-6"/></button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        {t('Guide Intro')}
                    </p>
                    {FULL_GUIDE_SECTIONS.map((section, index) => (
                        <AccordionItem key={index} title={section.title}>
                            {section.content}
                        </AccordionItem>
                    ))}
                </div>
                 <div className="flex items-center justify-end p-4 border-t dark:border-neutral-700">
                    <button onClick={onClose} className="bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-700 transition-colors">{t('Close Guide')}</button>
                </div>
            </div>
        </div>
    );
};

// Main Settings Component
const Settings: React.FC<SettingsProps> = (props) => {
    const { user, onUpdateUser, isDarkMode, toggleDarkMode, businessName, setBusinessName, businessLogo, setBusinessLogo, licenseKeys, setLicenseKeys, licenseDatabase, setLicenseDatabase, language, setLanguage, currency, setCurrency, t, activeStoreId, onAddStore, onDeleteStore, organizationStores, taxRate, setTaxRate } = props;
    
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [newLicenseKey, setNewLicenseKey] = useState('');

    // 2FA States
    const [is2FAConfirmOpen, setIs2FAConfirmOpen] = useState(false);
    const [passwordFor2FA, setPasswordFor2FA] = useState('');

    const [profileData, setProfileData] = useState<Partial<User>>({
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        phone: user.phone || '',
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
        if (section === 'Profile') {
            onUpdateUser({ 
                name: profileData.name, 
                avatarUrl: profileData.avatarUrl,
                phone: profileData.phone
            });
        }
        setNotification({ type: 'success', message: `${section} settings saved successfully!` });
    };

    const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');

        if (newPassword !== confirmPassword) {
            setNotification({ type: 'error', message: "New passwords do not match." });
            return;
        }
        if (user.password !== currentPassword) {
            setNotification({ type: 'error', message: "Current password is incorrect." });
            return;
        }

        onUpdateUser({ password: newPassword as string });
        setNotification({ type: 'success', message: "Password updated successfully!" });
        e.currentTarget.reset();
    };

    const handleToggle2FA = (e: React.FormEvent) => {
        e.preventDefault();
        if (user.password !== passwordFor2FA) {
            setNotification({ type: 'error', message: "Incorrect password. 2FA setting not changed." });
            setPasswordFor2FA('');
            return;
        }

        const newStatus = !user.isTwoFactorEnabled;
        onUpdateUser({ isTwoFactorEnabled: newStatus });
        setNotification({ 
            type: 'success', 
            message: `Two-Factor Authentication has been ${newStatus ? 'Enabled' : 'Disabled'}.` 
        });
        setIs2FAConfirmOpen(false);
        setPasswordFor2FA('');
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

    const handleUpdateLicenseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLicenseKey.trim()) {
            setNotification({ type: 'error', message: 'Please enter a license key.' });
            return;
        }
        if (props.onUpdateLicense(newLicenseKey)) {
            setNewLicenseKey('');
            setNotification({ type: 'success', message: 'License updated successfully!' });
        } else {
            setNotification({ type: 'error', message: 'The provided license key is invalid or could not be applied.' });
        }
    };
    
    const handleActivateFromTrialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newLicenseKey) {
            props.onActivateTrialLicense(newLicenseKey);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">{t('Settings')}</h1>
            
            {notification && <NotificationBanner type={notification.type} message={notification.message} onClose={() => setNotification(null)} />}

            {user.email === 'superadmin@zenith.com' && (
                <MasterLicenseGenerator 
                    licenseDatabase={licenseDatabase} 
                    setLicenseDatabase={setLicenseDatabase} 
                    setNotification={setNotification}
                />
            )}

            {user.role === Role.Admin && (
                 <AdminLicenseManagementCard 
                    {...props} 
                    newLicenseKey={newLicenseKey}
                    setNewLicenseKey={setNewLicenseKey}
                    onActivateFromTrialSubmit={handleActivateFromTrialSubmit}
                    onUpdateLicenseSubmit={handleUpdateLicenseSubmit}
                    setNotification={setNotification}
                />
            )}

            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} t={t} />
            
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
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Phone Number</label>
                        <input type="tel" name="phone" value={profileData.phone || ''} onChange={handleProfileDataChange} className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                         <p className="text-xs text-neutral-400 mt-1">Used for password recovery and notifications.</p>
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button onClick={() => handleSaveChanges('Profile')} className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Save Changes</button>
                </div>
            </SettingsCard>
            
            {/* Password & Security */}
            <SettingsCard title="Password & Security" icon={<ShieldCheckIcon className="w-6 h-6 text-primary-500" />}>
                 <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Your registered Email and Phone number will be used for verification during password reset.</p>
                 
                 <div className="mb-8 border-b border-neutral-200 dark:border-neutral-700 pb-8">
                    <form onSubmit={handlePasswordChange}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Current Password</label>
                                <input type="password" name="currentPassword" required className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">New Password</label>
                                <input type="password" name="newPassword" required className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Confirm New Password</label>
                                <input type="password" name="confirmPassword" required className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                            </div>
                        </div>
                        <div className="mt-6 text-right">
                            <button type="submit" className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Change Password</button>
                        </div>
                    </form>
                 </div>

                 {/* 2FA Section */}
                 <div className="flex items-center justify-between">
                    <div className="flex gap-3 items-start">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                            <DevicePhoneMobileIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100">Two-Factor Authentication</h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                                Require a verification code via email when logging in from a new device.
                            </p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={user.isTwoFactorEnabled || false} 
                            onChange={() => setIs2FAConfirmOpen(true)} 
                            className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary-600"></div>
                    </label>
                 </div>

                 {/* 2FA Confirmation Modal */}
                 {is2FAConfirmOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
                        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-sm p-6">
                            <h3 className="text-lg font-bold mb-4 text-neutral-800 dark:text-neutral-100">
                                {user.isTwoFactorEnabled ? 'Disable' : 'Enable'} Two-Factor Auth
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                                For your security, please enter your password to confirm this change.
                            </p>
                            <form onSubmit={handleToggle2FA}>
                                <input 
                                    type="password" 
                                    value={passwordFor2FA}
                                    onChange={(e) => setPasswordFor2FA(e.target.value)}
                                    placeholder="Enter current password"
                                    className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 mb-4 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    autoFocus
                                />
                                <div className="flex gap-2 justify-end">
                                    <button 
                                        type="button" 
                                        onClick={() => { setIs2FAConfirmOpen(false); setPasswordFor2FA(''); }}
                                        className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                 )}
            </SettingsCard>

            {user.role === Role.Admin && props.activeLicense?.planType === 'Enterprise' && (
                <SettingsCard title="Store Management" icon={<BuildingStorefrontIcon className="w-6 h-6 text-primary-500" />}>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        Manage your business branches. This feature is available on the Enterprise plan.
                    </p>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-neutral-800 dark:text-neutral-100">Current Stores</h4>
                        {organizationStores.length > 0 ? (
                            <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                {organizationStores.map(store => (
                                    <li key={store.id} className="py-2 flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{store.name}</p>
                                            <p className="text-xs text-neutral-500">{store.location}</p>
                                        </div>
                                        <button 
                                            onClick={() => onDeleteStore(store.id)}
                                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                                            title="Delete Store"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-neutral-500">No stores added yet.</p>
                        )}

                        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Add New Store</h4>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const name = formData.get('storeName') as string;
                                const location = formData.get('storeLocation') as string;
                                if (name && location) {
                                    onAddStore({ name, location });
                                    (e.target as HTMLFormElement).reset();
                                }
                            }} className="flex flex-col md:flex-row gap-4 items-end">
                                <div className="flex-1 w-full">
                                    <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300">Store Name</label>
                                    <input type="text" name="storeName" required className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                                </div>
                                <div className="flex-1 w-full">
                                    <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300">Location</label>
                                    <input type="text" name="storeLocation" required className="mt-1 w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                                </div>
                                <button type="submit" className="w-full md:w-auto bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                                    Add Store
                                </button>
                            </form>
                        </div>
                    </div>
                </SettingsCard>
            )}

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
            
            {/* Business Configuration - ADMIN ONLY */}
            {user.role === Role.Admin && (
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
            )}

            {/* System Settings - ADMIN ONLY */}
            {user.role === Role.Admin && (
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
            )}
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
interface AdminLicenseManagementProps extends SettingsProps {
    newLicenseKey: string;
    setNewLicenseKey: (key: string) => void;
    onUpdateLicenseSubmit: (e: React.FormEvent) => void;
    onActivateFromTrialSubmit: (e: React.FormEvent) => void;
    setNotification: (notif: { type: 'success' | 'error'; message: string } | null) => void;
}

const AdminLicenseManagementCard: React.FC<AdminLicenseManagementProps> = (props) => {
    const { user, licenseKeys, setLicenseKeys, activeStoreId, setNotification, newLicenseKey, setNewLicenseKey, onUpdateLicenseSubmit, onActivateFromTrialSubmit, employees } = props;
    const [deviceName, setDeviceName] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

    const handleGenerateDeviceKey = () => {
        if (activeStoreId === 'global') {
            alert("Please select a specific store before generating a device key.");
            return;
        }
        if (!deviceName) return alert("Please enter a device name.");
        
        const selectedEmployee = employees.find(e => e.id === selectedEmployeeId);

        const newKey: LicenseKey = {
            id: `dk_${Date.now()}`,
            key: `DEV-${Math.random().toString(36).substr(2,6).toUpperCase()}`,
            assignedToUserId: selectedEmployee ? selectedEmployee.id : '', 
            assignedToUserName: selectedEmployee ? `${selectedEmployee.name} (${selectedEmployee.role})` : 'Unassigned',
            status: 'Active',
            validity: 'Lifetime',
            deviceName: deviceName,
            organizationId: user.organizationId,
            storeId: activeStoreId,
        };
        
        setLicenseKeys(prev => [...prev, newKey]);
        setNotification({ type: 'success', message: `Device key for "${deviceName}" generated successfully!`});
        setDeviceName('');
        setSelectedEmployeeId('');
    }

    const handleRevokeDeviceKey = (id: string) => {
        setLicenseKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'Revoked' } : k));
        setNotification({ type: 'success', message: 'Device key revoked.' });
    }

    return (
        <SettingsCard title="License & Device Management" icon={<KeyIcon className="w-6 h-6 text-green-500" />}>
            {/* Master License Section */}
            <div className="border-b dark:border-neutral-700 pb-6 mb-6">
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Master License</h4>
                {props.isInTrial && props.activeLicense ? (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-800 dark:text-amber-200 text-sm">
                        <p className="font-bold">You are in Trial Mode.</p>
                        <p>Your trial expires on {new Date(props.activeLicense.validUntil).toLocaleDateString()}. Enter a license key below to activate.</p>
                        <form onSubmit={onActivateFromTrialSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
                            <input 
                                type="text" 
                                value={newLicenseKey}
                                onChange={(e) => setNewLicenseKey(e.target.value)}
                                placeholder="Enter full license key"
                                className="flex-1 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg p-2 text-sm"
                            />
                            <button type="submit" className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700">Activate</button>
                        </form>
                    </div>
                ) : props.activeLicense ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div><p className="text-neutral-500">Plan</p><p className="font-semibold">{props.activeLicense.planType}</p></div>
                            <div><p className="text-neutral-500">Status</p><p className="font-semibold text-green-600">{props.activeLicense.status}</p></div>
                            <div><p className="text-neutral-500">Valid Until</p><p className="font-semibold">{new Date(props.activeLicense.validUntil).toLocaleDateString()}</p></div>
                            <div><p className="text-neutral-500">Registered Email</p><p className="font-semibold truncate">{props.activeLicense.emailLock}</p></div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">Update or Renew License</label>
                            <form onSubmit={onUpdateLicenseSubmit} className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    value={newLicenseKey}
                                    onChange={(e) => setNewLicenseKey(e.target.value)}
                                    placeholder="Enter new license key"
                                    className="flex-1 bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                />
                                <button type="submit" className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700">Update License</button>
                            </form>
                        </div>
                        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <button
                                onClick={props.onDeactivateLicense}
                                className="w-full md:w-auto text-sm text-red-600 dark:text-red-400 font-semibold py-2 px-4 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800"
                            >
                                Deactivate License on This Device
                            </button>
                            <p className="text-xs text-neutral-400 mt-1">This will log you out and require re-activation. Your data will be preserved.</p>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Device License Section */}
            <div>
                 <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Device & Terminal Keys</h4>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-800 dark:text-blue-200 text-sm mb-6">
                    Generate access keys for your shop's terminals or employee devices.
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-xs text-neutral-500 mb-1">Device Name</label>
                        <input 
                            type="text" 
                            value={deviceName} 
                            onChange={e => setDeviceName(e.target.value)} 
                            placeholder="e.g., Main Counter" 
                            className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5" 
                        />
                    </div>
                    <div className="flex-1 w-full">
                         <label className="block text-xs text-neutral-500 mb-1">Assign to Employee (Optional)</label>
                         <select 
                            value={selectedEmployeeId}
                            onChange={(e) => setSelectedEmployeeId(e.target.value)}
                            className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5"
                         >
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                            ))}
                         </select>
                    </div>
                    <button 
                        onClick={handleGenerateDeviceKey} 
                        disabled={activeStoreId === 'global'}
                        title={activeStoreId === 'global' ? "Select a specific store first" : ""}
                        className="w-full sm:w-auto bg-primary-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-700 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Generate Key
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Device Name</th>
                                <th className="text-left p-2">Assigned To</th>
                                <th className="text-left p-2">Key</th>
                                <th className="text-left p-2">Status</th>
                                <th className="text-right p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-neutral-700">
                            {licenseKeys.map(key => (
                                <tr key={key.id}>
                                    <td className="p-2 font-medium">{key.deviceName}</td>
                                    <td className="p-2 text-neutral-600 dark:text-neutral-400">
                                        {key.assignedToUserName || 'Unassigned'}
                                        {key.assignedToUserId && !key.assignedToUserName.includes('(') && (() => {
                                            const emp = employees.find(e => e.id === key.assignedToUserId);
                                            return emp ? ` (${emp.role})` : '';
                                        })()}
                                    </td>
                                    <td className="p-2 font-mono text-xs">{key.key}</td>
                                    <td className="p-2"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${key.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{key.status}</span></td>
                                    <td className="p-2 text-right">
                                        {key.status === 'Active' && <button onClick={() => handleRevokeDeviceKey(key.id)} className="text-red-500 hover:underline text-xs">Revoke</button>}
                                    </td>
                                </tr>
                            ))}
                            {licenseKeys.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-neutral-500">No device keys generated yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </SettingsCard>
    );
}

export default Settings;