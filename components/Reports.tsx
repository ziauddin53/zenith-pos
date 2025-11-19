import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Sale, User, Customer, Role } from '../types';

declare const XLSX: any; // For SheetJS library loaded from CDN

// Icons
const DocumentArrowDownIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
);
const ChevronUpDownIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg>
);
const XCircleIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const ChevronDownIcon: React.FC<{ className?: string }> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
);


interface ReportsProps {
    sales: Sale[];
    users: User[];
    customers: Customer[];
}

const StatCard: React.FC<{ title: string, value: string }> = ({ title, value }) => (
    <div className="bg-neutral-50 dark:bg-neutral-700/50 p-4 rounded-lg">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
        <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{value}</p>
    </div>
);

const Reports: React.FC<ReportsProps> = ({ sales, users, customers }) => {
    // State for filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCashier, setSelectedCashier] = useState('all');
    const [selectedCustomer, setSelectedCustomer] = useState('all');
    
    // State for export options
    const [exportFormat, setExportFormat] = useState<'csv' | 'xlsx'>('csv');
    const [isExportMenuOpen, setExportMenuOpen] = useState(false);
    const exportMenuRef = useRef<HTMLDivElement>(null);

    // State for searchable customer dropdown
    const [customerSearch, setCustomerSearch] = useState('');
    const [isCustomerDropdownOpen, setCustomerDropdownOpen] = useState(false);
    const customerFilterRef = useRef<HTMLDivElement>(null);

    const cashiers = useMemo(() => {
        return users.filter(user => [Role.Admin, Role.Manager, Role.Cashier].includes(user.role));
    }, [users]);
    
    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (customerFilterRef.current && !customerFilterRef.current.contains(event.target as Node)) {
                setCustomerDropdownOpen(false);
            }
            if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
                setExportMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCustomers = useMemo(() => {
        if (!customerSearch) return customers;
        return customers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()));
    }, [customers, customerSearch]);
    
    const handleSelectCustomer = (customerId: string) => {
        setSelectedCustomer(customerId);
        const customer = customers.find(c => c.id === customerId);
        setCustomerSearch(customer ? customer.name : '');
        setCustomerDropdownOpen(false);
    }
    
    const handleClearCustomer = () => {
        setSelectedCustomer('all');
        setCustomerSearch('');
    }

    const filteredSales = useMemo(() => {
        return sales.filter(sale => {
            const saleDate = new Date(sale.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (start) start.setHours(0, 0, 0, 0);
            if (end) end.setHours(23, 59, 59, 999);

            const dateMatch = (!start || saleDate >= start) && (!end || saleDate <= end);
            const cashierMatch = selectedCashier === 'all' || sale.cashierId === selectedCashier;
            const customerMatch = selectedCustomer === 'all' || sale.customerId === selectedCustomer;

            return dateMatch && cashierMatch && customerMatch;
        });
    }, [sales, startDate, endDate, selectedCashier, selectedCustomer]);
    
    const summary = useMemo(() => {
        const totalSales = filteredSales.reduce((acc, sale) => acc + sale.total, 0);
        const totalTransactions = filteredSales.length;
        const avgSaleValue = totalTransactions > 0 ? totalSales / totalTransactions : 0;
        return {
            totalSales: totalSales.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            totalTransactions,
            avgSaleValue: avgSaleValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        };
    }, [filteredSales]);
    
    const chartData = useMemo(() => {
        if (filteredSales.length === 0) {
            return [];
        }

        const salesByDay = filteredSales.reduce((acc, sale) => {
            const date = new Date(sale.date).toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += sale.total;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(salesByDay)
            .map(([date, total]) => ({
                rawDate: date,
                // Add T00:00:00 to avoid timezone issues when parsing YYYY-MM-DD
                date: new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                total,
            }))
            .sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());

    }, [filteredSales]);


    const resetFilters = () => {
        setStartDate('');
        setEndDate('');
        setSelectedCashier('all');
        handleClearCustomer();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const handleExport = () => {
        if (filteredSales.length === 0) {
            alert("No data to export for the current filters.");
            return;
        }

        const headers = ["Sale ID", "Date", "Customer", "Cashier", "Items", "Total", "Amount Paid", "Amount Due", "Payment Method"];
        const data = filteredSales.map(sale => ({
            "Sale ID": sale.id,
            "Date": new Date(sale.date).toISOString(),
            "Customer": sale.customerName,
            "Cashier": sale.cashier,
            "Items": sale.items,
            "Total": sale.total,
            "Amount Paid": sale.amountPaid,
            "Amount Due": sale.total - sale.amountPaid,
            "Payment Method": sale.paymentMethod,
        }));
        
        if (exportFormat === 'csv') {
            const csvRows = [
                headers.join(','),
                ...data.map(row => Object.values(row).map(value => {
                    const stringValue = String(value);
                    // Escape quotes by doubling them and wrap in quotes if it contains a comma
                    if (stringValue.includes(',') || stringValue.includes('"')) {
                        return `"${stringValue.replace(/"/g, '""')}"`;
                    }
                    return stringValue;
                }).join(','))
            ];
            const csvContent = csvRows.join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "sales_report.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (exportFormat === 'xlsx') {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");
            XLSX.writeFile(workbook, "sales_report.xlsx");
        }
    };


    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">Sales Reports</h1>
                 <div className="flex rounded-lg shadow-sm">
                    <button onClick={handleExport} className="relative inline-flex items-center gap-2 bg-secondary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-secondary-700 focus:z-10 rounded-l-lg">
                        <DocumentArrowDownIcon className="w-5 h-5" />
                        Export Data
                    </button>
                    <div ref={exportMenuRef} className="relative -ml-px block">
                        <button onClick={() => setExportMenuOpen(!isExportMenuOpen)} type="button" className="relative inline-flex items-center bg-secondary-600 px-2 py-2 text-white hover:bg-secondary-700 focus:z-10 rounded-r-lg" aria-expanded="true" aria-haspopup="true">
                           <span className="text-xs uppercase mr-1">{exportFormat}</span>
                            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {isExportMenuOpen && (
                             <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                <div className="py-1" role="none">
                                    <a href="#" onClick={(e) => { e.preventDefault(); setExportFormat('csv'); setExportMenuOpen(false); }} className={`block px-4 py-2 text-sm ${exportFormat === 'csv' ? 'font-bold text-primary-600' : 'text-neutral-700 dark:text-neutral-200'} hover:bg-neutral-100 dark:hover:bg-neutral-700`} role="menuitem" tabIndex={-1} id="menu-item-0">Export as .csv</a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); setExportFormat('xlsx'); setExportMenuOpen(false); }} className={`block px-4 py-2 text-sm ${exportFormat === 'xlsx' ? 'font-bold text-primary-600' : 'text-neutral-700 dark:text-neutral-200'} hover:bg-neutral-100 dark:hover:bg-neutral-700`} role="menuitem" tabIndex={-1} id="menu-item-1">Export as .xlsx</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-md space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Date Range */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start-date" className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">Start Date</label>
                            <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="end-date" className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">End Date</label>
                            <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                        </div>
                    </div>
                    {/* Cashier */}
                    <div>
                        <label htmlFor="cashier" className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">Cashier</label>
                        <select id="cashier" value={selectedCashier} onChange={e => setSelectedCashier(e.target.value)} className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none">
                            <option value="all">All Cashiers</option>
                            {cashiers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    {/* Customer */}
                    <div ref={customerFilterRef}>
                        <label htmlFor="customer" className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">Customer</label>
                        <div className="relative">
                            <div className="flex items-center">
                                <input 
                                    type="text" 
                                    id="customer" 
                                    value={customerSearch}
                                    onChange={e => {
                                        setCustomerSearch(e.target.value);
                                        setSelectedCustomer('all');
                                        if(!isCustomerDropdownOpen) setCustomerDropdownOpen(true);
                                    }}
                                    onFocus={() => setCustomerDropdownOpen(true)}
                                    placeholder="All Customers"
                                    className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 pr-16 focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                                />
                                <div className="absolute right-1 flex items-center">
                                    {selectedCustomer !== 'all' && (
                                        <button onClick={handleClearCustomer} className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                                            <XCircleIcon className="w-5 h-5"/>
                                        </button>
                                    )}
                                    <button onClick={() => setCustomerDropdownOpen(!isCustomerDropdownOpen)} className="p-1 text-neutral-400">
                                        <ChevronUpDownIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {isCustomerDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-800 rounded-md shadow-lg max-h-60 overflow-auto border dark:border-neutral-700">
                                    <ul>
                                        {filteredCustomers.length > 0 ? filteredCustomers.map(c => (
                                            <li key={c.id} onClick={() => handleSelectCustomer(c.id)} className="px-4 py-2 text-sm hover:bg-primary-500 hover:text-white cursor-pointer dark:hover:bg-primary-600">
                                                {c.name}
                                            </li>
                                        )) : <li className="px-4 py-2 text-sm text-neutral-500">No customers found</li>}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Reset Button */}
                    <div className="flex items-end">
                        <button onClick={resetFilters} className="w-full bg-neutral-200 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-100 font-semibold p-2.5 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-500 transition-colors">
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Sales" value={summary.totalSales} />
                <StatCard title="Total Transactions" value={summary.totalTransactions.toString()} />
                <StatCard title="Average Sale Value" value={summary.avgSaleValue} />
            </div>

            {/* Sales Chart */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Sales Trend</h3>
                {chartData.length > 0 ? (
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                                <XAxis dataKey="date" tick={{ fill: '#94a3b8' }} fontSize={12} />
                                <YAxis tick={{ fill: '#94a3b8' }} fontSize={12} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }}
                                    formatter={(value: number) => [value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), 'Sales']}
                                    labelStyle={{ color: '#cbd5e1' }}
                                />
                                <Bar dataKey="total" fill="#4f46e5" name="Total Sales" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-center py-10 text-neutral-500 dark:text-neutral-400 h-[300px] flex items-center justify-center">
                        <p>No data to display in chart for the selected filters.</p>
                    </div>
                )}
            </div>

            {/* Sales Table */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Sales Details</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
                        <thead className="text-xs text-neutral-700 dark:text-neutral-300 uppercase bg-neutral-50 dark:bg-neutral-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Sale ID</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Customer</th>
                                <th scope="col" className="px-6 py-3">Cashier</th>
                                <th scope="col" className="px-6 py-3">Payment</th>
                                <th scope="col" className="px-6 py-3 text-right">Total</th>
                                <th scope="col" className="px-6 py-3 text-right">Paid</th>
                                <th scope="col" className="px-6 py-3 text-right">Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSales.map(sale => {
                                const due = sale.total - sale.amountPaid;
                                return (
                                <tr key={sale.id} className="bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">{sale.id}</td>
                                    <td className="px-6 py-4">{formatDate(sale.date)}</td>
                                    <td className="px-6 py-4">{sale.customerName}</td>
                                    <td className="px-6 py-4">{sale.cashier}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                            sale.paymentMethod === 'Cash' ? 'bg-green-100 text-green-700' :
                                            sale.paymentMethod === 'Card' ? 'bg-blue-100 text-blue-700' :
                                            sale.paymentMethod === 'Credit' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {sale.paymentMethod}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-semibold">${sale.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right text-green-600">${sale.amountPaid.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right text-red-600">${due.toFixed(2)}</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                    {filteredSales.length === 0 && (
                        <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
                            No sales data found for the selected filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;