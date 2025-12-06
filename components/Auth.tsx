
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';
import { MasterLicense } from '../types';

const { BuildingStorefrontIcon } = ICONS;

export type AuthView = 'login' | 'register' | 'forgot_password';

interface AuthProps {
    onLogin: (email: string, password: string) => void;
    onInitiateRegister: (name: string, email: string, password: string) => void;
    onVerifyEmail: (code: string) => void;
    onInitiateForgotPassword: (email: string) => void;
    onVerifyResetCode: (code: string) => void;
    onResetPassword: (password: string) => void;
    error: string | null;
    onClearError?: () => void;
    noUsersFound?: boolean; // New prop to indicate fresh install
    activeLicense?: MasterLicense | null;
    onDeactivateLicense?: () => void;
}

export const Auth: React.FC<AuthProps> = ({ 
    onLogin, 
    onInitiateRegister, 
    onInitiateForgotPassword,
    error, 
    onClearError,
    noUsersFound,
    activeLicense,
    onDeactivateLicense
}) => {
    const [authView, setAuthView] = useState<AuthView>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // If no users found (fresh activation), default to Register view
    useEffect(() => {
        if (noUsersFound) {
            setAuthView('register');
        }
    }, [noUsersFound]);

    const changeView = (view: AuthView) => {
        setAuthView(view);
        onClearError?.();
        if (view === 'login') {
            setPassword('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        switch (authView) {
            case 'login':
                onLogin(email, password);
                break;
            case 'register':
                if (password !== confirmPassword) {
                    alert("Passwords do not match!");
                    return;
                }
                onInitiateRegister(name, email, password);
                break;
            case 'forgot_password':
                onInitiateForgotPassword(email);
                break;
        }
    };

    const getTitle = () => {
        if (noUsersFound && authView === 'register') return 'Setup Admin Account';
        switch(authView) {
            case 'login': return 'Welcome Back';
            case 'register': return 'Create Account';
            case 'forgot_password': return 'Forgot Password';
        }
    };

    const getSubtitle = () => {
        if (noUsersFound && authView === 'register') return 'Create the first admin account for this shop.';
        switch(authView) {
            case 'login': return 'Please login to your account';
            case 'register': return 'Register your admin account';
            case 'forgot_password': return 'Enter your email to receive a reset link';
        }
    };

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-800 max-w-md w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl">
                
                {/* Left Side (Brand) */}
                <div className="bg-primary-600 p-8 md:w-1/2 flex flex-col justify-center items-center text-center text-white">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                         <BuildingStorefrontIcon className="w-10 h-10 text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Zenith POS</h1>
                    <p className="text-primary-100 mb-8">Smart Business Management</p>
                    <ul className="text-left space-y-3 text-sm text-primary-50 hidden md:block">
                        <li className="flex items-center gap-2">✓ Real-time Inventory Tracking</li>
                        <li className="flex items-center gap-2">✓ Offline Mode Support</li>
                        <li className="flex items-center gap-2">✓ Multi-Shop Management</li>
                        <li className="flex items-center gap-2">✓ AI-Powered Insights</li>
                    </ul>
                </div>

                {/* Right Side (Form) */}
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                        {getTitle()}
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                        {getSubtitle()}
                    </p>
                    
                    {activeLicense?.emailLock && (
                         <div className="mb-4 p-2 bg-blue-50 text-blue-800 rounded border border-blue-200 text-xs text-center">
                            Licensed to: <strong>{activeLicense.emailLock}</strong>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                            {error}
                        </div>
                    )}
                    
                    {noUsersFound && authView === 'login' && (
                         <div className="mb-4 p-3 bg-amber-100 text-amber-800 rounded-lg text-sm border border-amber-200">
                            Fresh Install? Please <button onClick={() => changeView('register')} className="font-bold underline">Register</button> first.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {authView === 'register' && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    placeholder="John Doe"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
                            <input 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="name@company.com"
                            />
                        </div>

                        {['login', 'register'].includes(authView) && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    placeholder="••••••••"
                                />
                                {authView === 'login' && (
                                    <div className="text-right mt-1">
                                        <button 
                                            type="button"
                                            onClick={() => changeView('forgot_password')}
                                            className="text-xs text-primary-600 hover:underline"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {authView === 'register' && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Confirm Password</label>
                                <input 
                                    type="password" 
                                    required 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-colors mt-2"
                        >
                            {authView === 'login' && 'Sign In'}
                            {authView === 'register' && 'Register Admin'}
                            {authView === 'forgot_password' && 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-neutral-500">
                        {authView === 'login' && (
                            <>
                                Don't have an account?{' '}
                                <button onClick={() => changeView('register')} className="text-primary-600 font-semibold hover:underline">Register</button>
                            </>
                        )}
                        {authView === 'register' && !noUsersFound && (
                            <>
                                Already have an account?{' '}
                                <button onClick={() => changeView('login')} className="text-primary-600 font-semibold hover:underline">Login</button>
                            </>
                        )}
                         {authView === 'register' && noUsersFound && (
                            <p className="text-xs italic">Registration required for first use.</p>
                        )}
                        {authView === 'forgot_password' && (
                            <button onClick={() => changeView('login')} className="text-neutral-500 hover:text-neutral-800 font-medium">← Back to Login</button>
                        )}
                    </div>
                    
                    {onDeactivateLicense && (
                         <div className="mt-8 pt-4 border-t border-neutral-100 text-center">
                            <button onClick={onDeactivateLicense} className="text-red-500 text-xs hover:underline">
                                Wrong License? Deactivate & Change Key
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
