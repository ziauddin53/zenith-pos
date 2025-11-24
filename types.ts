
import React from 'react';

export enum Role {
  Admin = 'Admin',
  Manager = 'Manager',
  Cashier = 'Cashier',
  Viewer = 'Viewer',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
  dashboardWidgets: Record<string, boolean>;
  organizationId?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  brand?: string;
  unit?: string;
  expiryDate?: string; // ISO string
  lowStockThreshold?: number;
  imageUrl?: string;
  organizationId?: string;
}

export interface CartItem extends Product {
  quantity: number;
  discountType?: 'percentage' | 'amount';
  discountValue?: number;
}

export interface HeldCart {
  id: string;
  items: CartItem[];
  customer: Customer | null;
  timestamp: string; // ISO string
  note?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  loyaltyPoints: number;
  dueAmount: number;
  creditLimit?: number;
  organizationId?: string;
}

export interface Sale {
  id: string;
  date: string; // ISO string
  total: number;
  cashier: string;
  cashierId: string;
  items: number;
  customerId: string;
  customerName: string;
  amountPaid: number;
  paymentMethod: 'Cash' | 'Card' | 'Credit' | 'Partial';
  organizationId?: string;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string; // ISO string
  recordedBy: string;
  organizationId?: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string; // ISO string
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
  link?: string;
}

export type NavItem = {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    roles: Role[];
};

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  organizationId?: string;
}

export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  cost: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  items: PurchaseOrderItem[];
  total: number;
  createdAt: string; // ISO string
  createdBy: string;
  organizationId?: string;
}

export interface Shift {
    id: string;
    userId: string;
    userName: string;
    startTime: string; // ISO string
    endTime: string | null; // ISO string or null if active
}

export type ManagementDataType = 'products' | 'customers' | 'employees' | 'suppliers' | 'purchases' | 'expenses';

export interface LicenseKey {
  id: string;
  key: string;
  assignedToUserId: string;
  assignedToUserName: string;
  status: 'Active' | 'Revoked';
  validity: 'Lifetime' | string; // 'Lifetime' or ISO date string for expiry
  deviceName: string;
  organizationId?: string;
}

// NEW: The Master License for the Shop Owner
export interface MasterLicense {
  key: string;
  organizationId: string;
  validUntil: string; // ISO Date
  planType: 'Standard' | 'Premium' | 'Enterprise';
  status: 'Active' | 'Revoked' | 'Expired';
}

// --- NEW TYPES FOR MULTI-LANGUAGE & CURRENCY ---
export type Language = 'en' | 'bn';
export type Currency = 'USD' | 'BDT' | 'EUR' | 'INR';

export interface SystemSettings {
  language: Language;
  currency: Currency;
  taxRate: number;
}
