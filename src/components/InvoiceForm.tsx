import React from 'react';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import ItemRow from './ItemRow';
import ThemeToggle from './ThemeToggle';
import CurrencySelector from './CurrencySelector';
import { InvoiceDetails, InvoiceItem, currencyMap } from '../types/invoice';
import { saveInvoiceToLocalStorage, clearSavedInvoice } from '../utils/localStorage';

interface InvoiceFormProps {
  invoice: InvoiceDetails;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceDetails>>;
  generatePDF: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ 
  invoice, 
  setInvoice, 
  generatePDF 
}) => {
  const handleChange = (field: keyof InvoiceDetails, value: string | number) => {
    setInvoice(prev => {
      const updated = { ...prev, [field]: value };
      saveInvoiceToLocalStorage(updated);
      return updated;
    });
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoice(prev => {
      const updatedItems = prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      );
      const updated = { ...prev, items: updatedItems };
      saveInvoiceToLocalStorage(updated);
      return updated;
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: uuidv4(),
      description: '',
      quantity: 1,
      price: 0,
      amount: 0
    };

    setInvoice(prev => {
      const updated = { ...prev, items: [...prev.items, newItem] };
      saveInvoiceToLocalStorage(updated);
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setInvoice(prev => {
      const updated = { ...prev, items: prev.items.filter(item => item.id !== id) };
      saveInvoiceToLocalStorage(updated);
      return updated;
    });
  };

  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset the form? All data will be lost.')) {
      clearSavedInvoice();
      window.location.reload();
    }
  };

  const currencySymbol = currencyMap[invoice.currency];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoice Builder</h1>
        <div className="flex space-x-3">
          <CurrencySelector 
            currency={invoice.currency} 
            onChange={(currency) => handleChange('currency', currency)} 
          />
          <ThemeToggle />
        </div>
      </div>

      <div className="space-y-6">
        {/* Invoice Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => handleChange('invoiceNumber', e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Issue Date
              </label>
              <input
                type="date"
                value={invoice.issueDate}
                onChange={(e) => handleChange('issueDate', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* From Section */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">From</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name / Business
              </label>
              <input
                type="text"
                value={invoice.fromName}
                onChange={(e) => handleChange('fromName', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={invoice.fromEmail}
                onChange={(e) => handleChange('fromEmail', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <textarea
                value={invoice.fromAddress}
                onChange={(e) => handleChange('fromAddress', e.target.value)}
                rows={2}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* To Section */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Bill To</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client Name
              </label>
              <input
                type="text"
                value={invoice.toName}
                onChange={(e) => handleChange('toName', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client Email
              </label>
              <input
                type="email"
                value={invoice.toEmail}
                onChange={(e) => handleChange('toEmail', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client Address
              </label>
              <textarea
                value={invoice.toAddress}
                onChange={(e) => handleChange('toAddress', e.target.value)}
                rows={2}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Items</h2>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <Plus size={16} className="mr-1" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {invoice.items.map((item, index) => (
              <ItemRow
                key={item.id}
                item={item}
                currencySymbol={currencySymbol}
                onChange={handleItemChange}
                onRemove={removeItem}
                isLastItem={invoice.items.length === 1}
              />
            ))}
          </div>
        </div>

        {/* Calculations Section */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tax Rate (%)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={invoice.taxRate}
                onChange={(e) => handleChange('taxRate', parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Discount Rate (%)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={invoice.discountRate}
                onChange={(e) => handleChange('discountRate', parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes
          </label>
          <textarea
            value={invoice.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={3}
            placeholder="Payment terms, delivery information, etc."
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Reset Form
          </button>
          <button
            type="button"
            onClick={generatePDF}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;