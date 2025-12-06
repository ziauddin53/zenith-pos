
import React, { useState } from 'react';
import { MasterLicense } from '../types';

const KeyIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
  </svg>
);

const CheckBadgeIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>
);

const EnvelopeIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

interface LicenseGateProps {
  onSuccess: (license: MasterLicense) => void;
  onStartTrial: () => void;
  licenseDatabase: MasterLicense[];
}

export const LicenseGate: React.FC<LicenseGateProps> = ({ onSuccess, onStartTrial, licenseDatabase }) => {
  const [inputKey, setInputKey] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [businessNameInput, setBusinessNameInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate network validation delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const key = inputKey.trim();
    const email = inputEmail.trim().toLowerCase();
    const businessName = businessNameInput.trim();

    // 1. Find License in Database
    const license = licenseDatabase.find(l => l.key === key);

    if (!license) {
        setError("Invalid license key. Please check the key provided by your vendor.");
        setLoading(false);
        return;
    }

    // 2. Check Status
    if (license.status === 'Activated') {
        // Allow re-activation for the same email for recovery purposes
        if (license.emailLock && license.emailLock.toLowerCase() !== email) {
            setError("This license key has already been activated for a different user.");
            setLoading(false);
            return;
        }
    }

    if (license.status === 'Revoked') {
        setError("This license key has been revoked. Please contact support.");
        setLoading(false);
        return;
    }

    // 3. Check Expiry
    if (new Date(license.validUntil) < new Date()) {
        setError("This license key has expired.");
        setLoading(false);
        return;
    }
    
    // 4. Validate Email Lock
    if (license.emailLock) {
        if (license.emailLock.toLowerCase() !== email) {
            setError("This license key is locked to a different email address.");
            setLoading(false);
            return;
        }
    } else {
        if(!email) {
             setError("Please enter your email address.");
             setLoading(false);
             return;
        }
    }

    // Success
    setLoading(false);
    onSuccess({
        ...license,
        businessNameLock: businessName || license.businessNameLock,
        emailLock: email // Ensure consistency
    });
  };
  
  const handleFactoryReset = () => {
      if(confirm("Factory Reset: This will delete ALL data (products, sales, users) on this device and reset the license. This cannot be undone. Are you sure?")) {
          localStorage.clear();
          window.location.reload();
      }
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col justify-center items-center p-4">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
            <KeyIcon className="w-8 h-8" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-100 mb-2">Activate Zenith POS</h1>
        <p className="text-center text-neutral-500 dark:text-neutral-400 mb-8 text-sm">
          Enter your license details to activate the software.
        </p>

        {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
        )}

        <form onSubmit={handleActivate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address
            </label>
            <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <input
                type="email"
                required
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                placeholder="registered@email.com"
                />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              License Key
            </label>
            <input
              type="text"
              required
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-mono text-sm dark:text-white"
              placeholder="ZENITH-XXXX-XXXX-XXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Business Name
            </label>
            <input
              type="text"
              value={businessNameInput}
              onChange={(e) => setBusinessNameInput(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
              placeholder="e.g. My Awesome Shop"
            />
            <p className="text-xs text-neutral-400 mt-1">Leave blank if not specified by vendor.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <>
                    Activate License
                    <CheckBadgeIcon className="w-5 h-5 ml-2" />
                </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700 flex flex-col items-center gap-3">
            <button 
                onClick={onStartTrial}
                className="text-primary-600 dark:text-primary-400 font-semibold text-sm hover:underline"
            >
                Start 7-Day Free Trial
            </button>
            <button
                onClick={handleFactoryReset}
                className="text-red-500 text-xs hover:underline"
            >
                Trouble logging in? Factory Reset
            </button>
        </div>
      </div>
      
      <div className="mt-8 text-center text-neutral-500 dark:text-neutral-400 text-sm">
        <p>Need a license? Contact Sales</p>
        <p className="mt-1 font-medium">ziauddin537000@gmail.com</p>
      </div>
    </div>
  );
};
