
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { User, Role } from '../types';

const { UserGroupIcon, KeyIcon, BuildingStorefrontIcon } = ICONS;

interface AuthProps {
    onLogin: (email: string, password: string) => void;
    onRegister: (name: string, email: string, password: string) => void;
    error: string | null;
    onClearError?: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onRegister, error, onClearError }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            onLogin(email, password);
        } else {
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            onRegister(name, email, password);
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
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                        {isLogin ? 'Please login to your account' : 'Register your admin account'}
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
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

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Password</label>
                            <input 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        {!isLogin && (
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
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-neutral-500">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            onClick={() => { setIsLogin(!isLogin); onClearError?.(); }}
                            className="text-primary-600 font-semibold hover:underline"
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
