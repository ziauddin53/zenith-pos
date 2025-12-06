import React, { useState, useMemo } from 'react';
import { ManagementColumn, ManagementFormField, ICONS } from '../constants';
import { Customer, ManagementDataType, Product } from '../types';

// Icons
const SearchIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
);
const PencilIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
);
const TrashIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
);
const XMarkIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);
const { BanknotesIcon, ArrowUpTrayIcon, QrCodeIcon } = ICONS;


interface ManagementProps<T> {
    dataType: ManagementDataType;
    data: T[];
    columns: ManagementColumn<T>[];
    formFields: ManagementFormField<T>[];
    onAdd: (item: Omit<T, 'id'>) => void;
    onUpdate: (item: T) => void;
    onDelete: (ids: string[]) => void;
    customActions?: {
        onRecordPayment?: (customerId: string, amount: number) => void;
        onAdjustStock?: (productId: string, newStock: number, reason: string) => void;
    };
    t: (key: string) => string;
    formatCurrency: (val: number) => string;
    canAddNew?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    addNewDisabledTooltip?: string;
}

// Modal component defined outside to prevent re-creation on re-renders, fixing the input focus bug.
const Modal: React.FC<{ children: React.ReactNode, title: string, onClose: () => void }> = ({ children, title: modalTitle, onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md max-h-full overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b dark:border-neutral-700 sticky top-0 bg-white dark:bg-neutral-800">
                <h3 className="text-lg font-semibold">{modalTitle}</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"><XMarkIcon className="w-6 h-6"/></button>
            </div>
            {children}
        </div>
    </div>
);

// --- LABEL PRINTING MODAL ---
const LabelPrintModal: React.FC<{ items: Product[], onClose: () => void }> = ({ items, onClose }) => {
    const handlePrint = () => {
        const printContent = document.getElementById('label-sheet');
        const windowUrl = 'about:blank';
        const uniqueName = new Date();
        const windowName = 'Print' + uniqueName.getTime();
        const printWindow = window.open(windowUrl, windowName, 'width=800,height=600');
        
        if (printWindow && printContent) {
             printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Labels</title>
                        <style>
                            body { font-family: sans-serif; padding: 20px; }
                            .label-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
                            .label { border: 1px dashed #ccc; padding: 10px; text-align: center; border-radius: 5px; }
                            .sku { font-family: monospace; letter-spacing: 2px; font-weight: bold; margin-top: 5px; display: block;}
                            @media print {
                                body { padding: 0; }
                                .label { break-inside: avoid; }
                            }
                        </style>
                    </head>
                    <body>${printContent.innerHTML}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    };

    return (
        <Modal title="Print Barcode Labels" onClose={onClose}>
             <div className="p-6">
                <p className="mb-4 text-sm text-neutral-500">Preview of labels for {items.length} selected items.</p>
                <div id="label-sheet" className="max-h-60 overflow-y-auto bg-neutral-100 p-4 rounded border mb-4">
                    <div className="grid grid-cols-2 gap-2">
                         {items.map(item => (
                             <div key={item.id} className="bg-white p-2 text-center border border-neutral-300 rounded text-xs">
                                 <div className="font-bold truncate">{item.name}</div>
                                 <div>${item.price}</div>
                                 <div className="font-mono font-bold mt-1 tracking-widest text-sm">{item.sku}</div>
                             </div>
                         ))}
                    </div>
                </div>
                <button onClick={handlePrint} className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700">Print Now</button>
             </div>
        </Modal>
    );
}


export const Management = <T extends { id: string, [key: string]: any }>({ 
    dataType, 
    data, 
    columns, 
    formFields, 
    onAdd, 
    onUpdate, 
    onDelete, 
    customActions, 
    t, 
    formatCurrency, 
    canAddNew = true, 
    canEdit = true, 
    canDelete = true, 
    addNewDisabledTooltip = '' 
}: ManagementProps<T>) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
    
    const [currentItem, setCurrentItem] = useState<T | null>(null);
    const [formData, setFormData] = useState<Partial<T>>({});
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [paymentAmount, setPaymentAmount] = useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const title = t(`Manage ${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`);

    const filteredData = useMemo(() => 
        data.filter(item => 
            Object.values(item).some(val => 
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        ), [data, searchTerm]);
    
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedItems(filteredData.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id: string) => {
        setSelectedItems(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };
    
    const openModal = (item: T | null = null) => {
        setCurrentItem(item);
        setFormData(item || {});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
        setFormData({});
    };

    const openDeleteConfirm = (item: T) => {
        setCurrentItem(item);
        setIsDeleteConfirmOpen(true);
    };

    const closeDeleteConfirm = () => {
        setIsDeleteConfirmOpen(false);
        setCurrentItem(null);
    };
    
    const openPaymentModal = (customer: T) => {
        setCurrentItem(customer);
        setPaymentAmount('');
        setIsPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setIsPaymentModalOpen(false);
        setCurrentItem(null);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isNumber = type === 'number';
        setFormData(prev => ({ ...prev, [name]: isNumber ? Number(value) : value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof T) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({...prev, [key]: reader.result as string}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentItem) {
            onUpdate({ ...currentItem, ...formData });
        } else {
            onAdd(formData as Omit<T, 'id'>);
        }
        closeModal();
    };

    const handleDelete = () => {
        if (currentItem) {
            onDelete([currentItem.id]);
        }
        closeDeleteConfirm();
    };

    const handleDeleteSelected = () => {
        onDelete(selectedItems);
        setSelectedItems([]);
    };
    
    const handleRecordPayment = () => {
        const amount = parseFloat(paymentAmount);
        if (currentItem && amount > 0 && customActions?.onRecordPayment) {
            customActions.onRecordPayment(currentItem.id, amount);
        }
        closePaymentModal();
    };

    // --- BULK IMPORT LOGIC ---
    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const csv = event.target?.result as string;
            const lines = csv.split('\n');
            // Assume header is line 0: Name,Price,Stock,Category,SKU
            // Start from line 1
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                const cols = line.split(',');
                if (cols.length >= 5) {
                    const newItem: any = {
                        name: cols[0],
                        price: parseFloat(cols[1]) || 0,
                        stock: parseInt(cols[2]) || 0,
                        category: cols[3],
                        sku: cols[4],
                        imageUrl: '',
                        brand: '',
                    };
                    onAdd(newItem);
                }
            }
            alert(`Import process completed for ${lines.length - 1} rows.`);
        };
        reader.readAsText(file);
        // Reset
        e.target.value = '';
    };

    // --- LABEL PRINTING ---
    const handleLabelPrintClick = () => {
        setIsLabelModalOpen(true);
    };


    return (
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="w-full sm:w-auto flex items-center gap-2">
                    <div className="relative flex-grow">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input type="text" placeholder={t('Search')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"/>
                    </div>
                    
                    {dataType === 'products' && canAddNew && (
                        <>
                            <button onClick={handleImportClick} className="bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors flex items-center gap-1">
                                <ArrowUpTrayIcon className="w-5 h-5" />
                                <span className="hidden sm:inline">{t('Import CSV')}</span>
                            </button>
                            <input type="file" accept=".csv" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                        </>
                    )}

                    {canAddNew && (
                        <button 
                            onClick={() => openModal()} 
                            title={addNewDisabledTooltip}
                            className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                            {t('Add New')}
                        </button>
                    )}
                </div>
            </div>

            {selectedItems.length > 0 && (
                <div className="mb-4 flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/40 rounded-lg">
                    <span className="font-semibold text-primary-700 dark:text-primary-200">{selectedItems.length} item(s) selected</span>
                    <div className="flex gap-2">
                         {dataType === 'products' && (
                            <button onClick={handleLabelPrintClick} className="flex items-center gap-2 bg-purple-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors">
                                <QrCodeIcon className="w-4 h-4" />
                                {t('Print Labels')}
                            </button>
                         )}
                        {canDelete && (
                            <button onClick={handleDeleteSelected} className="flex items-center gap-2 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors">
                                <TrashIcon className="w-4 h-4" />
                                Delete Selected
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
                    <thead className="text-xs text-neutral-700 dark:text-neutral-300 uppercase bg-neutral-50 dark:bg-neutral-700">
                        <tr>
                            <th scope="col" className="p-4">
                                <input type="checkbox" onChange={handleSelectAll} checked={selectedItems.length > 0 && selectedItems.length === filteredData.length} className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600" />
                            </th>
                            {columns.map(col => <th key={String(col.key)} scope="col" className="px-6 py-3">{col.header}</th>)}
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <tr key={item.id} className="bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                                <td className="p-4">
                                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)} className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600" />
                                </td>
                                {columns.map(col => (
                                    <td key={`${item.id}-${String(col.key)}`} className="px-6 py-4 font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                                        {col.render ? col.render(item) : item[col.key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 flex justify-end items-center gap-4">
                                    {dataType === 'customers' && ((item as unknown) as Customer).dueAmount > 0 && customActions?.onRecordPayment && (
                                        <button onClick={() => openPaymentModal(item)} className="text-green-600 dark:text-green-400 hover:underline" title="Record Payment">
                                            <BanknotesIcon className="w-5 h-5"/>
                                        </button>
                                    )}
                                    {canEdit && (
                                        <button onClick={() => openModal(item)} className="text-primary-600 dark:text-primary-400 hover:underline"><PencilIcon className="w-5 h-5"/></button>
                                    )}
                                    {canDelete && (
                                        <button onClick={() => openDeleteConfirm(item)} className="text-red-600 dark:text-red-400 hover:underline"><TrashIcon className="w-5 h-5"/></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {isModalOpen && canAddNew && (
                <Modal title={currentItem ? `Edit ${dataType.slice(0, -1)}` : `Add ${dataType.slice(0, -1)}`} onClose={closeModal}>
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {formFields.map(field => (
                                <div key={String(field.key)} className={['select', 'image'].includes(field.type) ? 'sm:col-span-2' : ''}>
                                    <label htmlFor={String(field.key)} className="block mb-2 text-sm font-medium">{field.label}</label>
                                    {field.type === 'select' ? (
                                        <select
                                            id={String(field.key)}
                                            name={String(field.key)}
                                            value={formData[field.key] || ''}
                                            onChange={handleFormChange}
                                            required={field.required}
                                            className="bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        >
                                            <option value="">Select an option</option>
                                            {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                        </select>
                                    ) : field.type === 'image' ? (
                                        <div className="flex items-center gap-4">
                                            {formData[field.key] && (
                                                <img src={formData[field.key]} alt="preview" className="w-16 h-16 rounded-full object-cover bg-neutral-200" />
                                            )}
                                            <input
                                                type="file"
                                                id={String(field.key)}
                                                name={String(field.key)}
                                                onChange={(e) => handleImageChange(e, field.key)}
                                                accept="image/*"
                                                className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={String(field.key)}
                                            name={String(field.key)}
                                            value={formData[field.key] || ''}
                                            onChange={handleFormChange}
                                            required={field.required}
                                            className="bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-end p-4 border-t dark:border-neutral-700 space-x-2 sticky bottom-0 bg-white dark:bg-neutral-800">
                            <button type="button" onClick={closeModal} className="text-neutral-500 bg-white hover:bg-neutral-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-neutral-200 text-sm font-medium px-5 py-2.5 hover:text-neutral-900 focus:z-10 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-white dark:hover:bg-neutral-600 dark:focus:ring-neutral-600">Cancel</button>
                            <button type="submit" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
                        </div>
                    </form>
                </Modal>
            )}

            {isDeleteConfirmOpen && currentItem && (
                 <Modal title="Confirm Deletion" onClose={closeDeleteConfirm}>
                    <div className="p-6">
                        <p>Are you sure you want to delete <span className="font-semibold">{currentItem.name || `this item`}</span>? This action cannot be undone.</p>
                    </div>
                    <div className="flex items-center justify-end p-4 border-t dark:border-neutral-700 space-x-2">
                        <button onClick={closeDeleteConfirm} className="text-neutral-500 bg-white hover:bg-neutral-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-neutral-200 text-sm font-medium px-5 py-2.5 hover:text-neutral-900 focus:z-10 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-white dark:hover:bg-neutral-600 dark:focus:ring-neutral-600">Cancel</button>
                        <button onClick={handleDelete} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
                    </div>
                </Modal>
            )}
            
            {isPaymentModalOpen && currentItem && (
                <Modal title={`Record Payment for ${currentItem.name}`} onClose={closePaymentModal}>
                    <div className="p-6 space-y-4">
                        <div className="p-3 bg-neutral-100 dark:bg-neutral-700/50 rounded-lg text-center">
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Current Due Amount</p>
                            <p className="text-2xl font-bold">{formatCurrency(((currentItem as unknown) as Customer).dueAmount)}</p>
                        </div>
                        <div>
                            <label htmlFor="payment-amount" className="block text-sm font-medium mb-1">Payment Amount</label>
                            <input 
                                id="payment-amount"
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                className="w-full text-lg bg-neutral-100 dark:bg-neutral-700 border-transparent rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end p-4 border-t dark:border-neutral-700 space-x-2">
                         <button onClick={closePaymentModal} className="text-neutral-500 bg-white hover:bg-neutral-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-neutral-200 text-sm font-medium px-5 py-2.5 hover:text-neutral-900 focus:z-10 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-white dark:hover:bg-neutral-600 dark:focus:ring-neutral-600">Cancel</button>
                         <button onClick={handleRecordPayment} className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Record Payment</button>
                    </div>
                </Modal>
            )}

            {isLabelModalOpen && (
                 <LabelPrintModal items={filteredData.filter(i => selectedItems.includes(i.id)) as any[]} onClose={() => setIsLabelModalOpen(false)} />
            )}
        </div>
    );
};