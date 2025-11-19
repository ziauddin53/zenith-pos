
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Product, CartItem, Customer, User, Sale, HeldCart } from '../types';
import { ICONS } from '../constants';

// Icons
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
const XCircleIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const XMarkIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);
const CreditCardIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
);
const BanknotesIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const CubeIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);
const PauseIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>
);
const ClockIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const ExclamationTriangleIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);
const TagIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
);
const QrCodeIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
  </svg>
);

const UserGroupIcon = ICONS.UserGroupIcon;

const ProductCard: React.FC<{ product: Product, onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => (
    <button onClick={() => onAddToCart(product)} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col text-left group border border-neutral-200 dark:border-neutral-700 h-full overflow-hidden">
        <div className="relative h-20 w-full bg-neutral-100 dark:bg-neutral-700">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                  <CubeIcon className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
              </div>
            )}
        </div>
        <div className="p-2 flex-grow flex flex-col w-full">
          <h3 className="font-semibold text-xs text-neutral-800 dark:text-neutral-100 line-clamp-2 leading-tight mb-1" title={product.name}>{product.name}</h3>
          <div className="flex justify-between items-end mt-auto w-full">
            <p className="font-bold text-sm text-primary-600 dark:text-primary-400">${product.price.toFixed(2)}</p>
            <p className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${product.stock <= (product.lowStockThreshold || 5) ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'}`}>
                Qty: {product.stock}
            </p>
          </div>
        </div>
    </button>
);


interface POSProps {
    user: User;
    customers: Customer[];
    products: Product[];
    onAddSale: (sale: Omit<Sale, 'id' | 'cashier' | 'cashierId' | 'date'>, cartItems: CartItem[]) => void;
    onAddCustomer: (customer: Omit<Customer, 'id'>) => Customer;
    heldCarts: HeldCart[];
    setHeldCarts: React.Dispatch<React.SetStateAction<HeldCart[]>>;
}

export const POS: React.FC<POSProps> = ({ user, customers, products, onAddSale, onAddCustomer, heldCarts, setHeldCarts }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // Customer state
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [customerSearch, setCustomerSearch] = useState('');
    const [isCustomerDropdownOpen, setCustomerDropdownOpen] = useState(false);
    const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '' });
    const customerSearchRef = useRef<HTMLDivElement>(null);

    // Payment Modal State
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Credit'>('Cash');
    const [amountTendered, setAmountTendered] = useState('');
    const [creditWarning, setCreditWarning] = useState<string | null>(null);
    
    // Hold Order State
    const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
    const [holdNote, setHoldNote] = useState('');
    const [showHeldCarts, setShowHeldCarts] = useState(false);

    // Discount Modal State
    const [editingDiscountId, setEditingDiscountId] = useState<string | null>(null);
    const [discountType, setDiscountType] = useState<'percentage' | 'amount'>('percentage');
    const [discountValue, setDiscountValue] = useState('');
    
    // Barcode Scanner Refs
    const barcodeBuffer = useRef('');
    const lastKeyTime = useRef(0);


    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getItemFinalPrice = (item: CartItem) => {
        if (!item.discountValue || item.discountValue === 0) return item.price;
        
        if (item.discountType === 'amount') {
            return Math.max(0, item.price - item.discountValue);
        } else {
            return Math.max(0, item.price * (1 - item.discountValue / 100));
        }
    };

    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + getItemFinalPrice(item) * item.quantity, 0), [cart]);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    const amountPaid = parseFloat(amountTendered) || 0;
    const changeDue = paymentMethod === 'Cash' && amountPaid > total ? amountPaid - total : 0;
    const remainingDue = total - amountPaid;

    const addToCart = (product: Product) => {
        // Initial stock check
        if (product.stock <= 0) {
            alert(`Item "${product.name}" is out of stock.`);
            return;
        }

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                // Check if adding one more exceeds stock
                if (existingItem.quantity + 1 > product.stock) {
                    alert(`Cannot add more "${product.name}". Only ${product.stock} available in stock.`);
                    return prevCart; // Return unchanged cart
                }

                return prevCart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Barcode Scanner Effect
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            // Do not interfere with payment modal inputs
            if (isPaymentModalOpen || isAddingNewCustomer || editingDiscountId) return;

            const now = Date.now();
            // Scanner input is typically very fast (< 50ms between keys). 
            // If gap is large, reset buffer (assumed manual typing).
            if (now - lastKeyTime.current > 100) {
                barcodeBuffer.current = '';
            }
            lastKeyTime.current = now;

            if (e.key === 'Enter') {
                if (barcodeBuffer.current.length > 0) {
                    // Attempt to find product by SKU (barcode) or ID
                    const scannedProduct = products.find(p => 
                        p.sku.toLowerCase() === barcodeBuffer.current.toLowerCase() || 
                        p.id === barcodeBuffer.current
                    );
                    
                    if (scannedProduct) {
                        addToCart(scannedProduct);
                        // Prevent form submission if focus was in a search box
                        e.preventDefault(); 
                        setSearchQuery(''); // Clear visual search if it caught some chars
                    }
                    // Reset buffer
                    barcodeBuffer.current = '';
                }
                return;
            }

            // Append printable characters to buffer
            if (e.key.length === 1) {
                barcodeBuffer.current += e.key;
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [products, isPaymentModalOpen, isAddingNewCustomer, editingDiscountId]);


    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        // Stock Validation
        const product = products.find(p => p.id === productId);
        if (product && newQuantity > product.stock) {
            alert(`Cannot set quantity to ${newQuantity}. Only ${product.stock} available.`);
            // If user manually typed a large number, reset it to max stock or keep previous.
            // For now, we simply don't update to the invalid amount.
            // Optionally, we could cap it:
            // setCart(cart.map(item => item.id === productId ? { ...item, quantity: product.stock } : item));
            return;
        }

        setCart(cart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    };

    const removeFromCart = (productId: string) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        handleClearCustomer();
    };

    // Discount Logic
    const openDiscountModal = (item: CartItem) => {
        setEditingDiscountId(item.id);
        setDiscountType(item.discountType || 'percentage');
        setDiscountValue(item.discountValue ? String(item.discountValue) : '');
    };

    const applyDiscount = () => {
        if (!editingDiscountId) return;
        
        const val = parseFloat(discountValue);
        const validVal = isNaN(val) ? 0 : val;

        setCart(prev => prev.map(item => {
            if (item.id === editingDiscountId) {
                return {
                    ...item,
                    discountType: discountType,
                    discountValue: validVal
                };
            }
            return item;
        }));
        
        setEditingDiscountId(null);
        setDiscountValue('');
    };
    
    const handleHoldOrder = () => {
        if (cart.length === 0) return;
        
        const newHeldCart: HeldCart = {
            id: `held-${Date.now()}`,
            items: cart,
            customer: selectedCustomer,
            timestamp: new Date().toISOString(),
            note: holdNote.trim() || undefined,
        };
        
        setHeldCarts(prev => [...prev, newHeldCart]);
        clearCart();
        setIsHoldModalOpen(false);
        setHoldNote('');
    };

    const handleResumeOrder = (heldCart: HeldCart) => {
        setCart(heldCart.items);
        setSelectedCustomer(heldCart.customer);
        setCustomerSearch(heldCart.customer?.name || '');
        setHeldCarts(prev => prev.filter(c => c.id !== heldCart.id));
        setShowHeldCarts(false);
    };

    // Customer logic
     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (customerSearchRef.current && !customerSearchRef.current.contains(event.target as Node)) {
                setCustomerDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCustomers = useMemo(() => {
        if (!customerSearch) return customers;
        return customers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()));
    }, [customerSearch, customers]);


    const handleSelectCustomer = (customer: Customer) => {
        if (!customer) return;
        
        // Calculate if current transaction (potentially) exceeds credit limit
        // Note: Actual check happens at Payment stage, this is pre-check UI logic if needed
        
        setSelectedCustomer(customer);
        setCustomerSearch(customer.name);
        setCustomerDropdownOpen(false);
        setIsAddingNewCustomer(false);
    };
    
    const handleAddNewCustomerClick = () => {
        setIsAddingNewCustomer(true);
        setNewCustomer({ name: customerSearch, phone: '', email: '' });
        setCustomerDropdownOpen(false);
    };

    const handleSaveNewCustomer = () => {
        if (!newCustomer.name.trim()) return;
        
        const newCustomerData = onAddCustomer({
            name: newCustomer.name,
            phone: newCustomer.phone,
            email: newCustomer.email,
            loyaltyPoints: 0,
            dueAmount: 0,
        });
        
        setSelectedCustomer(newCustomerData);
        setCustomerSearch(newCustomerData.name);
        setIsAddingNewCustomer(false);
        setNewCustomer({ name: '', phone: '', email: '' });
    };

    const handleClearCustomer = () => {
        setSelectedCustomer(null);
        setCustomerSearch('');
        setIsAddingNewCustomer(false);
    };

    const handleChargeClick = () => {
        if (cart.length === 0) return;
        setAmountTendered(total.toFixed(2));
        setPaymentMethod('Cash');
        setCreditWarning(null);
        setIsPaymentModalOpen(true);
    };

    const handleConfirmPayment = () => {
        const isPartialPayment = amountPaid < total;
        let finalPaymentMethod: Sale['paymentMethod'] = paymentMethod;

        if (paymentMethod === 'Credit') {
            if (isPartialPayment) {
                alert('Credit payment must cover the full amount.');
                return;
            }
        } else if (isPartialPayment) {
            finalPaymentMethod = 'Partial';
        }

        if (selectedCustomer) {
            // Calculate new credit logic would go here if needed locally, but app handles it
        } else if (paymentMethod === 'Credit') {
            alert("Cannot process credit payment without a customer.");
            return;
        }

        onAddSale({
            total,
            items: cart.reduce((acc, item) => acc + item.quantity, 0),
            customerId: selectedCustomer?.id || 'guest',
            customerName: selectedCustomer?.name || 'Guest',
            amountPaid: paymentMethod === 'Credit' ? 0 : amountPaid,
            paymentMethod: finalPaymentMethod,
        }, cart);
        
        // Reset after sale
        clearCart();
        setIsPaymentModalOpen(false);
        setAmountTendered('');
        setPaymentMethod('Cash');

        alert('Sale completed successfully!');
    };

    useEffect(() => {
        if (paymentMethod === 'Credit' && selectedCustomer) {
            setAmountTendered(total.toFixed(2));
            if (selectedCustomer.creditLimit !== undefined) {
                const potentialDue = selectedCustomer.dueAmount + total;
                if (potentialDue > selectedCustomer.creditLimit) {
                    setCreditWarning(`This sale will exceed the customer's credit limit of $${selectedCustomer.creditLimit.toFixed(2)}.`);
                } else {
                    setCreditWarning(null);
                }
            }
        } else {
            setCreditWarning(null);
        }
    }, [paymentMethod, selectedCustomer, total]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            {/* Products Grid */}
            <div className="lg:col-span-2 flex flex-col h-full">
                <div className="p-4 bg-white dark:bg-neutral-800 rounded-t-lg shadow-md z-10">
                    <div className="flex justify-between items-center mb-4">
                         <div className="relative flex-1">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                        </div>
                        <div className="ml-4 flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-3 py-2 rounded-lg" title="Scanner Ready">
                            <QrCodeIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                            <span className="hidden sm:inline">Scanner Ready</span>
                        </div>
                    </div>
                   
                    <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 bg-neutral-100 dark:bg-neutral-900 rounded-b-lg">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart Section */}
            <div className="h-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg flex flex-col">
                 <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Current Order</h2>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setShowHeldCarts(!showHeldCarts)} className="relative text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200">
                                Held Orders
                                {heldCarts.length > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-white text-xs">{heldCarts.length}</span>}
                            </button>
                            <button onClick={() => setIsHoldModalOpen(true)} disabled={cart.length === 0} className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                <PauseIcon className="w-4 h-4" />
                                Hold
                            </button>
                        </div>
                    </div>

                    {showHeldCarts && (
                         <div className="absolute z-20 right-0 mt-2 w-72 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border dark:border-neutral-700">
                            <div className="p-3 border-b dark:border-neutral-700 flex justify-between items-center">
                                <h4 className="font-semibold text-sm">Held Orders</h4>
                                <button onClick={() => setShowHeldCarts(false)} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><XMarkIcon className="w-5 h-5"/></button>
                            </div>
                            <ul className="max-h-60 overflow-y-auto">
                                {heldCarts.length > 0 ? heldCarts.map(hc => (
                                    <li key={hc.id} className="p-3 border-b dark:border-neutral-700/50 hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold text-sm">{hc.customer?.name || 'Guest'}</p>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400 italic">"{hc.note || 'No note'}"</p>
                                                <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1"><ClockIcon className="w-3 h-3"/> {new Date(hc.timestamp).toLocaleTimeString()}</p>
                                            </div>
                                            <button onClick={() => handleResumeOrder(hc)} className="text-sm bg-primary-600 text-white font-semibold px-3 py-1 rounded-md hover:bg-primary-700">Resume</button>
                                        </div>
                                    </li>
                                )) : <li className="p-4 text-center text-sm text-neutral-500">No orders on hold.</li>}
                            </ul>
                        </div>
                    )}
                    
                    {selectedCustomer ? (
                         <div className="flex items-center justify-between text-sm bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 px-3 py-1.5 rounded-full">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{selectedCustomer.name}</span>
                                <span className="text-xs">(Due: ${selectedCustomer.dueAmount.toFixed(2)})</span>
                            </div>
                            <button onClick={handleClearCustomer} className="text-primary-500 hover:text-primary-700 dark:hover:text-primary-300">
                                <XCircleIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                         <div className="relative w-full" ref={customerSearchRef}>
                            <input
                                type="text"
                                placeholder="Add Customer"
                                value={customerSearch}
                                onChange={e => {
                                    setCustomerSearch(e.target.value);
                                    setCustomerDropdownOpen(true);
                                    setIsAddingNewCustomer(false);
                                }}
                                onFocus={() => setCustomerDropdownOpen(true)}
                                className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                            {isCustomerDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-900 rounded-md shadow-lg max-h-60 overflow-auto border dark:border-neutral-700">
                                    <ul>
                                        {filteredCustomers.length > 0 && filteredCustomers.map(c => (
                                            <li key={c.id} onClick={() => handleSelectCustomer(c)} className="px-4 py-2 text-sm hover:bg-primary-500 hover:text-white cursor-pointer dark:hover:bg-primary-700">
                                                {c.name}
                                            </li>
                                        ))}
                                         <li onClick={handleAddNewCustomerClick} className="px-4 py-2 text-sm text-primary-600 hover:bg-primary-500 hover:text-white cursor-pointer dark:text-primary-400 dark:hover:bg-primary-700 font-semibold border-t dark:border-neutral-700">
                                            + Add '{customerSearch || 'New Customer'}'
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                     {isAddingNewCustomer && (
                        <div className="space-y-2 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg mt-4 border dark:border-neutral-700">
                             <h4 className="text-sm font-semibold">New Customer Details</h4>
                            <input type="text" placeholder="Name*" value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} className="w-full bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"/>
                            <input type="text" placeholder="Phone (Optional)" value={newCustomer.phone} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} className="w-full bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"/>
                            <input type="email" placeholder="Email (Optional)" value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} className="w-full bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"/>
                             <div className="flex justify-end gap-2 pt-2">
                                <button onClick={() => setIsAddingNewCustomer(false)} className="text-sm px-3 py-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600">Cancel</button>
                                <button onClick={handleSaveNewCustomer} className="text-sm bg-primary-600 text-white font-semibold px-3 py-1 rounded-md hover:bg-primary-700 disabled:bg-primary-400" disabled={!newCustomer.name.trim()}>Save Customer</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                        <p className="text-center text-neutral-500 dark:text-neutral-400 pt-10">Your cart is empty.</p>
                    ) : (
                        cart.map(item => {
                            const finalPrice = getItemFinalPrice(item);
                            const hasDiscount = item.discountValue && item.discountValue > 0;
                            return (
                            <div key={item.id} className="flex items-center gap-3">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                                ) : (
                                    <div className="w-12 h-12 rounded-md bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
                                        <CubeIcon className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm leading-tight truncate">{item.name}</p>
                                    <div className="flex items-center gap-2">
                                        {hasDiscount ? (
                                            <>
                                                <p className="text-xs text-neutral-400 line-through">${item.price.toFixed(2)}</p>
                                                <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold">${finalPrice.toFixed(2)}</p>
                                            </>
                                        ) : (
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">${item.price.toFixed(2)}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"><MinusIcon className="w-3 h-3" /></button>
                                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"><PlusIcon className="w-3 h-3" /></button>
                                </div>
                                <div className="text-right min-w-[60px]">
                                    <p className="font-semibold text-sm">${(finalPrice * item.quantity).toFixed(2)}</p>
                                    {hasDiscount && (
                                        <p className="text-[10px] text-green-600 dark:text-green-400">
                                            -{item.discountType === 'percentage' ? `${item.discountValue}%` : `$${item.discountValue}`}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => openDiscountModal(item)} className="text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400" title="Discount">
                                        <TagIcon className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => removeFromCart(item.id)} className="text-neutral-400 hover:text-red-500 dark:hover:text-red-400" title="Remove">
                                        <XCircleIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )})
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-500 dark:text-neutral-400">Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-500 dark:text-neutral-400">Tax (8%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={handleChargeClick}
                            disabled={cart.length === 0}
                            className="w-full bg-secondary-600 text-white font-bold py-3 rounded-lg hover:bg-secondary-700 transition-colors mt-2 disabled:bg-secondary-300 dark:disabled:bg-secondary-800 disabled:cursor-not-allowed">
                            Charge
                        </button>
                        <button onClick={clearCart} className="w-full text-center text-sm text-red-500 hover:underline mt-1">
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
                            <h3 className="text-lg font-semibold">Process Payment</h3>
                            <button onClick={() => setIsPaymentModalOpen(false)} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><XMarkIcon className="w-6 h-6"/></button>
                        </div>
                        <div className="p-6">
                            <div className="text-center mb-4">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">Total Due</p>
                                <p className="text-4xl font-bold">${total.toFixed(2)}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <button onClick={() => setPaymentMethod('Cash')} className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 ${paymentMethod === 'Cash' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50' : 'border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}>
                                    <BanknotesIcon className="w-6 h-6"/><span>Cash</span>
                                </button>
                                <button onClick={() => setPaymentMethod('Card')} className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 ${paymentMethod === 'Card' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50' : 'border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}>
                                    <CreditCardIcon className="w-6 h-6"/><span>Card</span>
                                </button>
                                <button onClick={() => setPaymentMethod('Credit')} disabled={!selectedCustomer} className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 ${paymentMethod === 'Credit' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50' : 'border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700'} disabled:opacity-50 disabled:cursor-not-allowed`}>
                                    <UserGroupIcon className="w-6 h-6"/><span>Credit</span>
                                </button>
                            </div>
                            {creditWarning && (
                                <div className="p-3 mb-4 rounded-md bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 text-sm flex items-start gap-2">
                                    <ExclamationTriangleIcon className="w-5 h-5 mt-0.5 flex-shrink-0"/>
                                    {creditWarning}
                                </div>
                            )}

                            {paymentMethod !== 'Credit' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Amount Tendered</label>
                                        <input 
                                            type="number"
                                            value={amountTendered}
                                            onChange={(e) => setAmountTendered(e.target.value)}
                                            className="w-full text-lg bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                            autoFocus
                                        />
                                    </div>
                                    {remainingDue > 0 && <p className="text-sm text-center text-yellow-600 dark:text-yellow-400">Remaining due of ${remainingDue.toFixed(2)} will be added to customer's account.</p>}
                                    <div className="flex justify-between text-lg font-semibold p-3 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg">
                                        <span>Change Due</span>
                                        <span className={changeDue > 0 ? "text-green-500" : ""}>${changeDue.toFixed(2)}</span>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleConfirmPayment}
                                className="mt-6 w-full bg-secondary-600 text-white font-bold py-3 rounded-lg hover:bg-secondary-700 transition-colors disabled:bg-secondary-300"
                                disabled={(amountPaid < 0) || (remainingDue > 0 && !selectedCustomer)}
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
             {isHoldModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-sm">
                         <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
                            <h3 className="text-lg font-semibold">Hold Order</h3>
                            <button onClick={() => setIsHoldModalOpen(false)} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><XMarkIcon className="w-6 h-6"/></button>
                        </div>
                        <div className="p-6 space-y-4">
                             <div>
                                <label className="block text-sm font-medium mb-1">Add a Note (Optional)</label>
                                <input 
                                    type="text"
                                    value={holdNote}
                                    onChange={(e) => setHoldNote(e.target.value)}
                                    placeholder="e.g., Customer waiting for friend"
                                    className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    autoFocus
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setIsHoldModalOpen(false)} className="px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700">Cancel</button>
                                <button onClick={handleHoldOrder} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Confirm Hold</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Discount Modal */}
            {editingDiscountId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-sm">
                        <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700">
                            <h3 className="text-lg font-semibold">Apply Discount</h3>
                            <button onClick={() => setEditingDiscountId(null)} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><XMarkIcon className="w-6 h-6"/></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Discount Type</label>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setDiscountType('percentage')} 
                                        className={`flex-1 py-2 rounded-md border ${discountType === 'percentage' ? 'bg-primary-100 border-primary-500 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300' : 'border-neutral-200 dark:border-neutral-600'}`}
                                    >
                                        Percentage (%)
                                    </button>
                                    <button 
                                        onClick={() => setDiscountType('amount')} 
                                        className={`flex-1 py-2 rounded-md border ${discountType === 'amount' ? 'bg-primary-100 border-primary-500 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300' : 'border-neutral-200 dark:border-neutral-600'}`}
                                    >
                                        Amount ($)
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Value</label>
                                <input 
                                    type="number"
                                    value={discountValue}
                                    onChange={(e) => setDiscountValue(e.target.value)}
                                    placeholder={discountType === 'percentage' ? "e.g., 10" : "e.g., 5.00"}
                                    className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    autoFocus
                                    min="0"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button onClick={() => setEditingDiscountId(null)} className="px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700">Cancel</button>
                                <button onClick={applyDiscount} className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
