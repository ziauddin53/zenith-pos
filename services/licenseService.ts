
import { MasterLicense } from '../types';

const SECRET_KEY = "ZENITH_POS_SECRET_KEY_2025_V2";

const generateSignature = (data: string, secret: string): string => {
    const text = data + secret;
    let hash = 5381;
    for (let i = 0; i < text.length; i++) {
        hash = (hash * 33) ^ text.charCodeAt(i);
    }
    return (hash >>> 0).toString(16).toUpperCase().padStart(8, '0').slice(-5);
};

export const FEATURE_MAP: Record<string, string> = {
    'A': 'AI_INSIGHTS',
    'R': 'ADVANCED_REPORTS',
    'M': 'MULTI_LANGUAGE',
    'C': 'CLOUD_SYNC'
};

export const PLAN_FEATURE_MAP: Record<string, string[]> = {
    'STD': ['M'],
    'PREM': ['M', 'A'],
    'ENT': ['M', 'A', 'R', 'C']
};

export const generateLicenseKey = (
    plan: 'STD' | 'PREM' | 'ENT',
    expiryDate: Date,
    features: string,
    businessName?: string,
    email?: string // New Parameter
): MasterLicense => {
    const serial = Math.random().toString(36).substring(2, 8).toUpperCase();
    const expiry = `${expiryDate.getFullYear()}${(expiryDate.getMonth() + 1).toString().padStart(2, '0')}${expiryDate.getDate().toString().padStart(2, '0')}`;
    
    // Base Key Structure
    const baseKey = `ZENITH-${plan}-${serial}-${features}-${expiry}`;
    
    // Create data payload for signature
    let dataToSign = baseKey;
    
    // Lock to Business Name if provided
    const cleanName = businessName?.trim().toUpperCase().replace(/\s+/g, '');
    if (cleanName) {
        dataToSign += `-${cleanName}`;
    }

    // Lock to Email if provided (Crucial for email-based validation)
    const cleanEmail = email?.trim().toLowerCase();
    if (cleanEmail) {
        dataToSign += `-${cleanEmail}`;
    }
    
    // Generate Signature based on the locked data
    const signature = generateSignature(dataToSign, SECRET_KEY);
    const finalKey = `${baseKey}-${signature}`;

    const planMap: Record<string, MasterLicense['planType']> = { 'STD': 'Standard', 'PREM': 'Premium', 'ENT': 'Enterprise' };

    return {
        key: finalKey,
        validUntil: expiryDate.toISOString(),
        planType: planMap[plan],
        status: 'Generated',
        maxShops: plan === 'ENT' ? Infinity : 1,
        enabledFeatures: features.split('').map(code => FEATURE_MAP[code]).filter(Boolean),
        businessNameLock: businessName?.trim() || undefined,
        emailLock: email?.trim() || undefined,
    };
};
