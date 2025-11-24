
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product, CartItem, Customer, User, Sale, HeldCart } from '../types';
import { ICONS, LOYALTY_CONVERSION_RATE } from '../constants';

// Extract available icons from constants
const { 
    BanknotesIcon, 
    TagIcon,
    UserGroupIcon,
    ChatBubbleLeftRightIcon,
    PrinterIcon,
    ShoppingCartIcon,
    CubeIcon
} = ICONS;

// Define missing icons locally
const SearchIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);
const PlusIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
);
const MinusIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>
);
const XMarkIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);
const XCircleIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const ClockIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const CreditCardIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
);

interface POSProps {
  user: User;
  customers: Customer[];
  products: Product[];
  onAddSale: (sale: Omit<Sale, 'id' | 'cashier' | 'cashierId' | 'date'>) => void;
  onAddCustomer: (customer: Omit<Customer, 'id'>) => Customer;
  heldCarts: HeldCart[];
  setHeldCarts: React.Dispatch<React.SetStateAction<HeldCart[]>>;
  formatCurrency: (amount: number) => string;
  t: (key: string) => string;
  businessName: string;
}

export const POS: React.FC<POSProps> = ({ user, customers, products, onAddSale, onAddCustomer, heldCarts, setHeldCarts, formatCurrency, t, businessName }) => {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // Modals State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [isHeldOrdersOpen, setIsHeldOrdersOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  
  // Transaction State
  const [lastSale, setLastSale] = useState<Sale | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Credit'>('Cash');
  const [holdNote, setHoldNote] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);

  // Item Discount State
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [discountType, setDiscountType] = useState<'percentage' | 'amount'>('percentage');
  const [discountValue, setDiscountValue] = useState<string>('');

  // Customer Search State
  const [customerQuery, setCustomerQuery] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState({ name: '', phone: '', email: '' });

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const filteredCustomers = useMemo(() => {
    if (!customerQuery) return [];
    return customers.filter(c => 
        c.name.toLowerCase().includes(customerQuery.toLowerCase()) ||
        c.phone.includes(customerQuery)
    );
  }, [customers, customerQuery]);

  // --- CART LOGIC ---

  const calculateItemPrice = (item: CartItem) => {
      let price = item.price;
      if (item.discountType === 'percentage' && item.discountValue) {
          price = price - (price * (item.discountValue / 100));
      } else if (item.discountType === 'amount' && item.discountValue) {
          price = price - item.discountValue;
      }
      return Math.max(0, price);
  };

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (calculateItemPrice(item) * item.quantity), 0);
  }, [cart]);

  const loyaltyDiscount = useMemo(() => {
      if (useLoyaltyPoints && selectedCustomer) {
          const maxDiscount = selectedCustomer.loyaltyPoints * LOYALTY_CONVERSION_RATE;
          return Math.min(maxDiscount, subtotal);
      }
      return 0;
  }, [useLoyaltyPoints, selectedCustomer, subtotal]);

  const taxRate = 0.08; // Example 8% tax
  const tax = (subtotal - loyaltyDiscount) * taxRate;
  const total = subtotal - loyaltyDiscount + tax;

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
      setCart([]);
      setSelectedCustomer(null);
      setCustomerQuery('');
      setUseLoyaltyPoints(false);
  };

  // --- DISCOUNT LOGIC ---

  const openDiscountModal = (index: number) => {
      setEditingItemIndex(index);
      const item = cart[index];
      setDiscountType(item.discountType || 'percentage');
      setDiscountValue(item.discountValue?.toString() || '');
      setIsDiscountModalOpen(true);
  };

  const applyItemDiscount = () => {
      if (editingItemIndex !== null) {
          const val = parseFloat(discountValue);
          setCart(prev => prev.map((item, idx) => {
              if (idx === editingItemIndex) {
                  return {
                      ...item,
                      discountType: discountType,
                      discountValue: isNaN(val) ? 0 : val
                  };
              }
              return item;
          }));
          setIsDiscountModalOpen(false);
          setEditingItemIndex(null);
      }
  };


  // --- CUSTOMER LOGIC ---

  const handleCustomerSelect = (customer: Customer) => {
      setSelectedCustomer(customer);
      setCustomerQuery(customer.name);
      setWhatsappNumber(customer.phone);
      setShowCustomerDropdown(false);
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
      e.preventDefault();
      const newCustomer = onAddCustomer({
          ...newCustomerData,
          loyaltyPoints: 0,
          dueAmount: 0,
          creditLimit: 500 // Default limit
      });
      setSelectedCustomer(newCustomer);
      setCustomerQuery(newCustomer.name);
      setWhatsappNumber(newCustomer.phone);
      setIsCustomerModalOpen(false);
      setNewCustomerData({ name: '', phone: '', email: '' });
  };

  // --- HOLD/RESUME LOGIC ---

  const handleHoldOrder = () => {
      if (cart.length === 0) return;
      const newHeldCart: HeldCart = {
          id: `hc${Date.now()}`,
          items: cart,
          customer: selectedCustomer,
          timestamp: new Date().toISOString(),
          note: holdNote
      };
      setHeldCarts(prev => [newHeldCart, ...prev]);
      clearCart();
      setIsHoldModalOpen(false);
      setHoldNote('');
  };

  const resumeHeldOrder = (heldCart: HeldCart) => {
      setCart(heldCart.items);
      setSelectedCustomer(heldCart.customer);
      if(heldCart.customer) setCustomerQuery(heldCart.customer.name);
      setHeldCarts(prev => prev.filter(h => h.id !== heldCart.id));
      setIsHeldOrdersOpen(false);
  };

  const removeHeldOrder = (id: string) => {
      setHeldCarts(prev => prev.filter(h => h.id !== id));
  };

  // --- PAYMENT LOGIC ---

  const handleChargeClick = () => {
      setPaymentAmount(total.toFixed(2));
      setIsPaymentModalOpen(true);
  };

  const handlePayment = () => {
    const paid = parseFloat(paymentAmount);
    const isCredit = paymentMethod === 'Credit';
    const isPartial = !isCredit && paid < total;

    // Credit Validation
    if (isCredit) {
        if (!selectedCustomer) {
            alert("Cannot process credit sale without a customer.");
            return;
        }
        const newDue = selectedCustomer.dueAmount + total;
        if (selectedCustomer.creditLimit && newDue > selectedCustomer.creditLimit) {
             alert(`Credit limit exceeded! Limit: ${formatCurrency(selectedCustomer.creditLimit)}, Current Due: ${formatCurrency(selectedCustomer.dueAmount)}, New Total Due would be: ${formatCurrency(newDue)}`);
             return;
        }
    }

    const finalPaymentMethod = isCredit ? 'Credit' : isPartial ? 'Partial' : paymentMethod;

    const sale: Sale = {
      id: 'temp', // Assigned in App.tsx
      total: total,
      date: 'temp', // Assigned in App.tsx
      cashier: user.name,
      cashierId: user.id,
      items: cart.reduce((acc, item) => acc + item.quantity, 0),
      customerId: selectedCustomer?.id || 'guest',
      customerName: selectedCustomer?.name || 'Guest',
      amountPaid: isCredit ? 0 : paid,
      paymentMethod: finalPaymentMethod,
      organizationId: user.organizationId
    };

    onAddSale(sale);
    setLastSale(sale);
    setIsPaymentModalOpen(false);
    setIsReceiptModalOpen(true);
    clearCart();
  };

  const sendWhatsApp = () => {
      if (!lastSale) return;
      const itemsList = cart.map(i => `${i.quantity}x ${i.name} (${formatCurrency(calculateItemPrice(i))})`).join('%0a');
      const text = `*Invoice from ${businessName}*%0aDate: ${new Date().toLocaleDateString()}%0a%0a${itemsList}%0a%0a*Total: ${formatCurrency(lastSale.total)}*%0aThank you for your business!`;
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="flex flex-col h-full md:flex-row gap-6 overflow-hidden">
      {/* LEFT: Product Selection */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-neutral-800 rounded-xl shadow-md">
        <div className="p-4 border-b dark:border-neutral-700 flex flex-col gap-3">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input 
                    type="text" 
                    placeholder={t('Search')} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
            </div>
            {/* Categories could go here */}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                    <div 
                        key={product.id} 
                        onClick={() => addToCart(product)}
                        className="bg-neutral-50 dark:bg-neutral-700/50 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:shadow-md hover:border-primary-300 transition-all flex flex-col items-center text-center group"
                    >
                        <div className="w-20 h-20 mb-3 rounded-md bg-white dark:bg-neutral-600 flex items-center justify-center overflow-hidden">
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                                <CubeIcon className="w-8 h-8 text-neutral-300 group-hover:text-primary-500 transition-colors" />
                            )}
                        </div>
                        <h3 className="font-semibold text-sm text-neutral-800 dark:text-neutral-100 line-clamp-2">{product.name}</h3>
                        <p className="text-primary-600 dark:text-primary-400 font-bold mt-1">{formatCurrency(product.price)}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{product.stock} in stock</p>
                    </div>
                ))}
                {filteredProducts.length === 0 && (
                    <div className="col-span-full text-center py-10 text-neutral-500">
                        No products found.
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* RIGHT: Cart & Checkout */}
      <div className="w-full md:w-96 flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md h-full overflow-hidden">
        
        {/* Cart Header / Customer */}
        <div className="p-4 border-b dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700/30">
            <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg">{t('Current Order')}</h2>
                <div className="flex gap-1">
                    {heldCarts.length > 0 && (
                        <button 
                            onClick={() => setIsHeldOrdersOpen(true)}
                            className="relative p-2 text-primary-600 hover:bg-primary-50 rounded-full"
                            title="View Held Orders"
                        >
                            <ClockIcon className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                        </button>
                    )}
                     <button onClick={() => cart.length > 0 && setIsHoldModalOpen(true)} disabled={cart.length === 0} className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded hover:bg-amber-200 disabled:opacity-50">
                        {t('Hold')}
                     </button>
                     <button onClick={clearCart} className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200">
                        {t('Clear Cart')}
                     </button>
                </div>
            </div>
            
            {/* Customer Selector */}
            <div className="relative">
                <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <UserGroupIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input 
                            type="text" 
                            placeholder="Walk-in Customer" 
                            value={customerQuery}
                            onChange={(e) => {
                                setCustomerQuery(e.target.value);
                                setShowCustomerDropdown(true);
                                if(e.target.value === '') setSelectedCustomer(null);
                            }}
                            className="w-full text-sm bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg pl-9 pr-8 py-2 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                        />
                         {selectedCustomer && (
                             <button onClick={() => { setSelectedCustomer(null); setCustomerQuery(''); }} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-red-500">
                                 <XCircleIcon className="w-4 h-4" />
                             </button>
                         )}
                    </div>
                    <button onClick={() => setIsCustomerModalOpen(true)} className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700">
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Dropdown */}
                {showCustomerDropdown && filteredCustomers.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredCustomers.map(c => (
                            <div 
                                key={c.id} 
                                onClick={() => handleCustomerSelect(c)}
                                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer border-b border-neutral-100 dark:border-neutral-600 last:border-0"
                            >
                                <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{c.name}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">{c.phone}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                    <ShoppingCartIcon className="w-12 h-12 mb-2 opacity-50" />
                    <p>Cart is empty</p>
                </div>
            ) : (
                cart.map((item, index) => {
                    const itemPrice = calculateItemPrice(item);
                    const hasDiscount = itemPrice < item.price;
                    
                    return (
                        <div key={`${item.id}-${index}`} className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-700/30 p-2 rounded-lg border border-neutral-100 dark:border-neutral-700/50">
                            <div className="w-12 h-12 bg-white dark:bg-neutral-600 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden border border-neutral-200 dark:border-neutral-600">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <CubeIcon className="w-6 h-6 text-neutral-300" />
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium truncate text-neutral-800 dark:text-neutral-100">{item.name}</h4>
                                <div className="flex items-center gap-2 text-xs">
                                    {hasDiscount && (
                                        <span className="text-neutral-400 line-through">{formatCurrency(item.price)}</span>
                                    )}
                                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                                        {formatCurrency(itemPrice)}
                                    </span>
                                    {hasDiscount && (
                                        <span className="text-green-600 bg-green-100 dark:bg-green-900/50 px-1 rounded text-[10px]">
                                            {item.discountType === 'percentage' ? `-${item.discountValue}%` : `-${formatCurrency(item.discountValue || 0)}`}
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <div className="flex items-center bg-white dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600">
                                    <button onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeFromCart(item.id)} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-600 dark:text-neutral-300"><MinusIcon className="w-3 h-3" /></button>
                                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-600 dark:text-neutral-300"><PlusIcon className="w-3 h-3" /></button>
                                </div>
                                <button 
                                    onClick={() => openDiscountModal(index)}
                                    className={`p-1.5 rounded ${hasDiscount ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-600'} hover:opacity-80`}
                                    title="Apply Discount"
                                >
                                    <TagIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>

        {/* Totals Section */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-700/30 border-t dark:border-neutral-700 space-y-2">
            <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                <span>{t('Subtotal')}</span>
                <span>{formatCurrency(subtotal)}</span>
            </div>
            {useLoyaltyPoints && loyaltyDiscount > 0 && (
                 <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Loyalty Discount</span>
                    <span>-{formatCurrency(loyaltyDiscount)}</span>
                </div>
            )}
            <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                <span>{t('Tax')} (8%)</span>
                <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-neutral-900 dark:text-neutral-100 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <span>{t('Total')}</span>
                <span>{formatCurrency(total)}</span>
            </div>
            
            <button 
                onClick={handleChargeClick}
                disabled={cart.length === 0}
                className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
                {t('Charge')} {formatCurrency(total)}
            </button>
        </div>
      </div>
      
      {/* --- MODALS --- */}

      {/* 1. Payment Modal */}
      {isPaymentModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="bg-primary-600 p-4 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">Payment</h3>
                    <button onClick={() => setIsPaymentModalOpen(false)} className="text-primary-200 hover:text-white"><XMarkIcon className="w-6 h-6"/></button>
                </div>
                <div className="p-6">
                     <div className="text-center mb-6">
                         <p className="text-neutral-500 dark:text-neutral-400 text-sm">Total Amount Due</p>
                         <p className="text-4xl font-bold text-neutral-800 dark:text-neutral-100">{formatCurrency(total)}</p>
                     </div>

                     <div className="grid grid-cols-3 gap-3 mb-6">
                         <button 
                            onClick={() => setPaymentMethod('Cash')}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border ${paymentMethod === 'Cash' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
                         >
                             <BanknotesIcon className="w-6 h-6 mb-1" />
                             <span className="text-xs font-semibold">Cash</span>
                         </button>
                         <button 
                            onClick={() => setPaymentMethod('Card')}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border ${paymentMethod === 'Card' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
                         >
                             <CreditCardIcon className="w-6 h-6 mb-1" />
                             <span className="text-xs font-semibold">Card</span>
                         </button>
                          <button 
                            onClick={() => setPaymentMethod('Credit')}
                            disabled={!selectedCustomer}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border ${paymentMethod === 'Credit' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'} ${!selectedCustomer ? 'opacity-50 cursor-not-allowed' : ''}`}
                         >
                             <UserGroupIcon className="w-6 h-6 mb-1" />
                             <span className="text-xs font-semibold">Credit</span>
                         </button>
                     </div>
                     
                     {selectedCustomer && selectedCustomer.loyaltyPoints > 0 && (
                        <div className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full text-xs font-bold">★</span>
                                <div className="text-sm">
                                    <p className="font-semibold">{selectedCustomer.loyaltyPoints} Points</p>
                                    <p className="text-xs text-neutral-500">Value: {formatCurrency(selectedCustomer.loyaltyPoints * LOYALTY_CONVERSION_RATE)}</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={useLoyaltyPoints} onChange={e => setUseLoyaltyPoints(e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-neutral-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary-600"></div>
                            </label>
                        </div>
                     )}

                     {paymentMethod === 'Cash' && (
                         <div className="mb-6">
                             <label className="block text-sm font-medium mb-1">Amount Received</label>
                             <input 
                                type="number" 
                                value={paymentAmount} 
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                className="w-full text-xl p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                                autoFocus
                             />
                             {parseFloat(paymentAmount) > total && (
                                 <div className="mt-2 text-right text-green-600 font-bold">
                                     Change: {formatCurrency(parseFloat(paymentAmount) - total)}
                                 </div>
                             )}
                         </div>
                     )}

                     <button onClick={handlePayment} className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-colors text-lg">
                         Confirm Payment
                     </button>
                </div>
            </div>
          </div>
      )}

      {/* 2. Receipt Modal */}
      {isReceiptModalOpen && lastSale && (
           <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 backdrop-blur-sm print:hidden">
               <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <XMarkIcon className="w-8 h-8 rotate-45" /> {/* Using XMark rotated as checkmark, or just import Check */}
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{t('Payment Success')}</h3>
                        <p className="text-neutral-500 mt-1">Invoice #{lastSale.id}</p>
                        
                        <div className="my-6 py-4 border-y border-dashed border-neutral-300 dark:border-neutral-600">
                            <div className="flex justify-between mb-2 text-sm">
                                <span>Amount Paid</span>
                                <span className="font-bold">{formatCurrency(lastSale.amountPaid)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Change</span>
                                <span className="font-bold">{formatCurrency(Math.max(0, parseFloat(paymentAmount || '0') - lastSale.total))}</span>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                             <button onClick={handlePrint} className="w-full flex items-center justify-center gap-2 bg-neutral-800 text-white py-3 rounded-lg hover:bg-neutral-900 font-semibold">
                                 <PrinterIcon className="w-5 h-5" />
                                 Print Receipt
                             </button>
                             <button onClick={sendWhatsApp} className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-semibold">
                                 <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                 WhatsApp Invoice
                             </button>
                             <button onClick={() => setIsReceiptModalOpen(false)} className="w-full py-3 text-neutral-500 hover:text-neutral-800 font-medium">
                                 New Sale
                             </button>
                        </div>
                    </div>
               </div>
               
               {/* Hidden Print Area */}
               <div className="hidden print:block print:fixed print:inset-0 print:bg-white print:p-4 text-black">
                   <div className="text-center font-mono text-sm">
                       <h1 className="text-xl font-bold mb-2">{businessName}</h1>
                       <p>Date: {new Date().toLocaleString()}</p>
                       <p>Sale ID: {lastSale.id}</p>
                       <p>Cashier: {lastSale.cashier}</p>
                       <div className="border-b border-black my-2"></div>
                       <div className="text-left">
                           {/* We need to store items in sale to print properly, simpler for now */}
                           <p>Total Items: {lastSale.items}</p>
                       </div>
                       <div className="border-b border-black my-2"></div>
                       <div className="flex justify-between font-bold text-lg">
                           <span>Total</span>
                           <span>{formatCurrency(lastSale.total)}</span>
                       </div>
                       <p className="mt-4">Thank you!</p>
                   </div>
               </div>
           </div>
      )}

      {/* 3. Discount Modal */}
      {isDiscountModalOpen && editingItemIndex !== null && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-xs shadow-xl">
                  <h3 className="font-bold text-lg mb-4">Apply Discount</h3>
                  <div className="flex gap-2 mb-4">
                      <button 
                        onClick={() => setDiscountType('percentage')} 
                        className={`flex-1 py-2 rounded text-sm font-medium ${discountType === 'percentage' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}
                      >
                          Percentage (%)
                      </button>
                      <button 
                        onClick={() => setDiscountType('amount')} 
                        className={`flex-1 py-2 rounded text-sm font-medium ${discountType === 'amount' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}
                      >
                          Fixed ($)
                      </button>
                  </div>
                  <input 
                    type="number" 
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder="Value"
                    className="w-full border border-neutral-300 rounded-lg p-2 mb-4"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                      <button onClick={() => setIsDiscountModalOpen(false)} className="px-4 py-2 text-neutral-500 hover:bg-neutral-100 rounded">Cancel</button>
                      <button onClick={applyItemDiscount} className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Apply</button>
                  </div>
              </div>
          </div>
      )}
      
      {/* 4. Hold Modal */}
      {isHoldModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-sm shadow-xl">
                  <h3 className="font-bold text-lg mb-4">Hold Order</h3>
                  <textarea 
                    value={holdNote}
                    onChange={e => setHoldNote(e.target.value)}
                    placeholder="Optional note (e.g. Customer forgot wallet)"
                    className="w-full border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 rounded-lg p-3 mb-4 h-24 resize-none"
                  ></textarea>
                  <div className="flex justify-end gap-2">
                      <button onClick={() => setIsHoldModalOpen(false)} className="px-4 py-2 text-neutral-500 hover:bg-neutral-100 rounded">Cancel</button>
                      <button onClick={handleHoldOrder} className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600">Hold Order</button>
                  </div>
              </div>
          </div>
      )}

      {/* 5. Held Orders Modal */}
      {isHeldOrdersOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-md shadow-xl h-[80vh] flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">Held Orders</h3>
                      <button onClick={() => setIsHeldOrdersOpen(false)}><XMarkIcon className="w-6 h-6"/></button>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3">
                      {heldCarts.length === 0 ? (
                          <p className="text-center text-neutral-500 mt-10">No held orders.</p>
                      ) : (
                          heldCarts.map(hc => (
                              <div key={hc.id} className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg border border-neutral-200 dark:border-neutral-600">
                                  <div className="flex justify-between mb-2">
                                      <span className="font-bold">{hc.customer?.name || 'Walk-in'}</span>
                                      <span className="text-xs text-neutral-500">{new Date(hc.timestamp).toLocaleTimeString()}</span>
                                  </div>
                                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-2">{hc.items.length} items • Note: {hc.note || 'None'}</p>
                                  <div className="flex gap-2">
                                      <button onClick={() => resumeHeldOrder(hc)} className="flex-1 bg-primary-600 text-white py-1.5 rounded text-sm hover:bg-primary-700">Resume</button>
                                      <button onClick={() => removeHeldOrder(hc.id)} className="px-3 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200">Discard</button>
                                  </div>
                              </div>
                          ))
                      )}
                  </div>
              </div>
          </div>
      )}
      
      {/* 6. Add Customer Modal */}
      {isCustomerModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-sm shadow-xl">
                  <h3 className="font-bold text-lg mb-4">Add New Customer</h3>
                  <form onSubmit={handleCreateCustomer} className="space-y-3">
                      <input 
                        type="text" required placeholder="Name" 
                        value={newCustomerData.name} onChange={e => setNewCustomerData({...newCustomerData, name: e.target.value})}
                        className="w-full border p-2 rounded"
                      />
                      <input 
                        type="text" placeholder="Phone" 
                        value={newCustomerData.phone} onChange={e => setNewCustomerData({...newCustomerData, phone: e.target.value})}
                        className="w-full border p-2 rounded"
                      />
                      <input 
                        type="email" placeholder="Email" 
                        value={newCustomerData.email} onChange={e => setNewCustomerData({...newCustomerData, email: e.target.value})}
                        className="w-full border p-2 rounded"
                      />
                      <div className="flex justify-end gap-2 mt-4">
                          <button type="button" onClick={() => setIsCustomerModalOpen(false)} className="px-4 py-2 text-neutral-500 hover:bg-neutral-100 rounded">Cancel</button>
                          <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Create</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

    </div>
  );
};
