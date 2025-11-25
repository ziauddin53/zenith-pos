
import React, { useState } from 'react';
import { ICONS } from '../constants';

const { BuildingStorefrontIcon, ShieldCheckIcon, KeyIcon } = ICONS;

export type AuthView = 'login' | 'register' | 'forgot_password' | 'verify_email' | 'verify_reset' | 'new_password';

interface AuthProps {
    onLogin: (email: string, password: string) => void;
    onInitiateRegister: (name: string, email: string, password: string) => void;
    onVerifyEmail: (code: string) => void;
    onInitiateForgotPassword: (email: string) => void;
    onVerifyResetCode: (code: string) => void;
    onResetPassword: (password: string) => void;
    error: string | null;
    onClearError?: () => void;
}

export const Auth: React.FC<AuthProps> = ({ 
    onLogin, 
    onInitiateRegister, 
    onVerifyEmail, 
    onInitiateForgotPassword,
    onVerifyResetCode,
    onResetPassword,
    error, 
    onClearError 
}) => {
    const [authView, setAuthView] = useState<AuthView>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const changeView = (view: AuthView) => {
        setAuthView(view);
        onClearError?.();
        // Reset sensitive fields when switching views except email which is often needed
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
                // The parent component handles state transition to 'verify_email' on success
                // But since we are mocking, we can manually trigger it here if onInitiateRegister doesn't throw immediate error
                // Ideally, App.tsx should pass a callback or prop to signal "registration initiated"
                // For this implementation, let's assume App.tsx will change a prop or we wait for user feedback
                // Actually, cleaner is if App.tsx passes a prop 'pendingRegistration' which we watch, 
                // but for simplicity, let's assume validation passes and we set the view in App.tsx render logic if needed
                // OR simpler: we assume success if no error is thrown, but error state is async.
                // We will rely on App.tsx to handle the visual transition if possible, 
                // OR we pass a callback to the prop. 
                // Let's modify App.tsx to handle the view state or we handle logic here.
                // Let's rely on props callbacks.
                break;
            case 'verify_email':
                onVerifyEmail(verificationCode);
                break;
            case 'forgot_password':
                onInitiateForgotPassword(email);
                // Move to verify reset view on success (Handled by App.tsx ideally, but we can optimistically switch or wait)
                setAuthView('verify_reset'); 
                break;
            case 'verify_reset':
                onVerifyResetCode(verificationCode);
                setAuthView('new_password');
                break;
            case 'new_password':
                if (password !== confirmPassword) {
                    alert("Passwords do not match!");
                    return;
                }
                onResetPassword(password);
                setAuthView('login');
                break;
        }
    };

    // Helper to render title based on view
    const getTitle = () => {
        switch(authView) {
            case 'login': return 'Welcome Back';
            case 'register': return 'Create Account';
            case 'verify_email': return 'Verify Email';
            case 'forgot_password': return 'Forgot Password';
            case 'verify_reset': return 'Enter Code';
            case 'new_password': return 'Reset Password';
        }
    };

    // Helper to render subtitle
    const getSubtitle = () => {
        switch(authView) {
            case 'login': return 'Please login to your account';
            case 'register': return 'Register your admin account';
            case 'verify_email': return `We sent a code to ${email}`;
            case 'forgot_password': return 'Enter your email to receive a reset code';
            case 'verify_reset': return 'Enter the 4-digit code sent to your email';
            case 'new_password': return 'Enter your new password below';
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

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field (Register only) */}
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

                        {/* Email Field (Login, Register, Forgot Password) */}
                        {['login', 'register', 'forgot_password'].includes(authView) && (
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
                        )}

                        {/* Verification Code Field */}
                        {['verify_email', 'verify_reset'].includes(authView) && (
                            <div className="text-center">
                                <ShieldCheckIcon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Verification Code</label>
                                <input 
                                    type="text" 
                                    required 
                                    maxLength={4}
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="w-32 px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-center text-xl font-mono tracking-widest mx-auto block"
                                    placeholder="0000"
                                />
                            </div>
                        )}

                        {/* Password Field */}
                        {['login', 'register', 'new_password'].includes(authView) && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                    {authView === 'new_password' ? 'New Password' : 'Password'}
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

                        {/* Confirm Password Field */}
                        {['register', 'new_password'].includes(authView) && (
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
                            {authView === 'register' && 'Send Verification Code'}
                            {authView === 'verify_email' && 'Verify & Login'}
                            {authView === 'forgot_password' && 'Send Reset Code'}
                            {authView === 'verify_reset' && 'Verify Code'}
                            {authView === 'new_password' && 'Reset Password'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-neutral-500">
                        {authView === 'login' && (
                            <>
                                Don't have an account?{' '}
                                <button onClick={() => changeView('register')} className="text-primary-600 font-semibold hover:underline">Register</button>
                            </>
                        )}
                        {authView === 'register' && (
                            <>
                                Already have an account?{' '}
                                <button onClick={() => changeView('login')} className="text-primary-600 font-semibold hover:underline">Login</button>
                            </>
                        )}
                        {['forgot_password', 'verify_email', 'verify_reset', 'new_password'].includes(authView) && (
                            <button onClick={() => changeView('login')} className="text-neutral-500 hover:text-neutral-800 font-medium">← Back to Login</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
