
import React, { useState, useMemo } from 'react';
import { Customer, HeldCart } from '../types';
import { ICONS } from '../constants';

const { BanknotesIcon, ClockIcon, XMarkIcon, ShoppingCartIcon } = ICONS;

// Local Icons
const ArrowRightIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

interface CreditHoldsViewProps {
    customers: Customer[];
    heldCarts: HeldCart[];
    formatCurrency: (amount: number) => string;
    onRecordPayment: (customerId: string, amount: number) => void;
    onResumeHold: (heldCart: HeldCart) => void;
    onDiscardHold: (id: string) => void;
    t: (key: string) => string;
}

// Payment Modal Component
const PaymentModal: React.FC<{ 
    customer: Customer | null; 
    onClose: () => void; 
    onConfirm: (amount: number) => void; 
    formatCurrency: (val: number) => string;
}> = ({ customer, onClose, onConfirm, formatCurrency }) => {
    const [amount, setAmount] = useState('');

    if (!customer) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-sm">
                <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
                    <h3 className="text-lg font-semibold">Record Payment</h3>
                    <button onClick={onClose}><XMarkIcon className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="text-center p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                        <p className="text-sm text-neutral-500">Current Due</p>
                        <p className="text-2xl font-bold">{formatCurrency(customer.dueAmount)}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Amount to Pay</label>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={e => setAmount(e.target.value)} 
                            className="w-full border p-2 rounded dark:bg-neutral-900 dark:border-neutral-600"
                            autoFocus
                        />
                    </div>
                    <button 
                        onClick={() => onConfirm(parseFloat(amount))}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        Confirm Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

const CreditHoldsView: React.FC<CreditHoldsViewProps> = ({ 
    customers, 
    heldCarts, 
    formatCurrency, 
    onRecordPayment, 
    onResumeHold, 
    onDiscardHold,
    t 
}) => {
    const [activeTab, setActiveTab] = useState<'credit' | 'holds'>('credit');
    const [selectedCustomerForPay, setSelectedCustomerForPay] = useState<Customer | null>(null);

    // Filter customers with debt
    const debtCustomers = useMemo(() => customers.filter(c => c.dueAmount > 0), [customers]);

    const handlePaymentConfirm = (amount: number) => {
        if (selectedCustomerForPay) {
            onRecordPayment(selectedCustomerForPay.id, amount);
            setSelectedCustomerForPay(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">Credit & Holds</h1>
                <div className="flex bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-1">
                    <button 
                        onClick={() => setActiveTab('credit')}
                        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'credit' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
                    >
                        Credit Customers ({debtCustomers.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('holds')}
                        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'holds' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
                    >
                        Held Orders ({heldCarts.length})
                    </button>
                </div>
            </div>

            {/* TAB CONTENT */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden min-h-[400px]">
                {activeTab === 'credit' && (
                    <div className="p-0">
                        <div className="p-4 border-b dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700/30 flex items-center gap-2">
                            <BanknotesIcon className="w-5 h-5 text-neutral-500" />
                            <h3 className="font-semibold">Customers with Outstanding Dues</h3>
                        </div>
                        {debtCustomers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
                                <BanknotesIcon className="w-12 h-12 mb-2 opacity-50" />
                                <p>No customers with due amounts.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
                                    <thead className="text-xs text-neutral-700 dark:text-neutral-300 uppercase bg-neutral-50 dark:bg-neutral-700/50">
                                        <tr>
                                            <th className="px-6 py-3">Customer Name</th>
                                            <th className="px-6 py-3">Phone</th>
                                            <th className="px-6 py-3">Due Amount</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
                                        {debtCustomers.map(c => (
                                            <tr key={c.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                                                <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100">{c.name}</td>
                                                <td className="px-6 py-4">{c.phone}</td>
                                                <td className="px-6 py-4 font-bold text-red-600 dark:text-red-400">{formatCurrency(c.dueAmount)}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button 
                                                        onClick={() => setSelectedCustomerForPay(c)}
                                                        className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-200"
                                                    >
                                                        Pay Now
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'holds' && (
                    <div className="p-0">
                        <div className="p-4 border-b dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700/30 flex items-center gap-2">
                            <ClockIcon className="w-5 h-5 text-neutral-500" />
                            <h3 className="font-semibold">Held / Suspended Orders</h3>
                        </div>
                        {heldCarts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
                                <ClockIcon className="w-12 h-12 mb-2 opacity-50" />
                                <p>No held orders currently active.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                {heldCarts.map(cart => (
                                    <div key={cart.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-neutral-50 dark:bg-neutral-700/20 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-bold text-neutral-800 dark:text-neutral-100">{cart.customer?.name || 'Walk-in Customer'}</h4>
                                                <p className="text-xs text-neutral-500">{new Date(cart.timestamp).toLocaleString()}</p>
                                            </div>
                                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono">
                                                {cart.items.length} Items
                                            </span>
                                        </div>
                                        
                                        {cart.note && (
                                            <div className="mb-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 text-xs text-yellow-800 dark:text-yellow-200 rounded border border-yellow-100 dark:border-yellow-900/30">
                                                Note: {cart.note}
                                            </div>
                                        )}

                                        <div className="flex gap-2 mt-4">
                                            <button 
                                                onClick={() => onResumeHold(cart)}
                                                className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 flex items-center justify-center gap-2"
                                            >
                                                Resume <ArrowRightIcon className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => onDiscardHold(cart.id)}
                                                className="px-3 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 rounded-lg hover:bg-red-200"
                                                title="Discard"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <PaymentModal 
                customer={selectedCustomerForPay} 
                onClose={() => setSelectedCustomerForPay(null)} 
                onConfirm={handlePaymentConfirm}
                formatCurrency={formatCurrency}
            />
        </div>
    );
};

export default CreditHoldsView;
