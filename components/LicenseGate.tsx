
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

interface LicenseGateProps {
  onSuccess: (license: MasterLicense) => void;
  masterLicenses: MasterLicense[];
  onSwitchToSignUp: () => void;
}

export const LicenseGate: React.FC<LicenseGateProps> = ({ onSuccess, masterLicenses, onSwitchToSignUp }) => {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const foundLicense = masterLicenses.find(l => l.key === inputKey.trim());

      if (!foundLicense) {
        setError('Invalid license key. Please check and try again.');
        setLoading(false);
        return;
      }

      if (foundLicense.status !== 'Active') {
        setError('This license key has been revoked or is inactive.');
        setLoading(false);
        return;
      }

      const now = new Date();
      const expiry = new Date(foundLicense.validUntil);
      if (now > expiry) {
        setError('This license key has expired. Please renew your subscription.');
        setLoading(false);
        return;
      }

      // Success!
      onSuccess(foundLicense);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 max-w-md w-full rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-primary-600 p-8 text-center">
          <div className="mx-auto bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <KeyIcon className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">Zenith POS</h1>
          <p className="text-primary-100 mt-2">Professional Activation</p>
        </div>
        
        <div className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Enter License Key</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Please enter the product key provided by your software vendor to activate this terminal.
            </p>
          </div>

          <form onSubmit={handleActivate} className="space-y-4">
            <div>
              <label htmlFor="license" className="sr-only">License Key</label>
              <div className="relative">
                <input
                  type="text"
                  id="license"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="ZENITH-XXXX-XXXX-XXXX"
                  className="w-full pl-4 pr-10 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-center uppercase tracking-widest outline-none transition-all"
                />
                {inputKey && !error && (
                  <div className="absolute right-3 top-3 text-green-500">
                    <CheckBadgeIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm text-center animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !inputKey}
              className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : 'Activate Software'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-700 text-center">
            <p className="text-xs text-neutral-400 mb-3">
              Don't have a key?
            </p>
             <button 
                type="button" 
                onClick={onSwitchToSignUp}
                className="text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-semibold px-4 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            >
                Start 7-Day Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
