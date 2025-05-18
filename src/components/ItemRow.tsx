import React from 'react';
import { Trash2 } from 'lucide-react';
import { InvoiceItem, CurrencySymbol } from '../types/invoice';

interface ItemRowProps {
  item: InvoiceItem;
  currencySymbol: CurrencySymbol;
  onChange: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  onRemove: (id: string) => void;
  isLastItem: boolean;
}

const ItemRow: React.FC<ItemRowProps> = ({ 
  item, 
  currencySymbol, 
  onChange, 
  onRemove, 
  isLastItem 
}) => {
  const handleChange = (field: keyof InvoiceItem, value: string) => {
    let parsedValue: string | number = value;
    
    if (field === 'quantity' || field === 'price') {
      // Convert to number, but handle empty string
      parsedValue = value === '' ? 0 : Number(value);
    }
    
    onChange(item.id, field, parsedValue);
  };

  return (
    <div className="grid grid-cols-12 gap-2 mb-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="col-span-5 sm:col-span-6">
        <input
          type="text"
          placeholder="Item description"
          value={item.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="col-span-2">
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Qty"
          value={item.quantity || ''}
          onChange={(e) => handleChange('quantity', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="col-span-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">{currencySymbol}</span>
          </div>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            value={item.price || ''}
            onChange={(e) => handleChange('price', e.target.value)}
            className="w-full p-2 pl-7 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          disabled={isLastItem}
          className={`p-1.5 rounded-full ${
            isLastItem 
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
              : 'text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500'
          }`}
          aria-label="Remove item"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default ItemRow;