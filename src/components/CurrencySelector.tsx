import React from 'react';
import { CurrencySymbol, currencyMap } from '../types/invoice';

interface CurrencySelectorProps {
  currency: 'USD' | 'EUR' | 'GBP' | 'INR';
  onChange: (currency: 'USD' | 'EUR' | 'GBP' | 'INR') => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currency, onChange }) => {
  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'INR', label: 'INR (₹)' },
  ];

  return (
    <div className="flex items-center">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
        Currency:
      </label>
      <select
        value={currency}
        onChange={(e) => onChange(e.target.value as 'USD' | 'EUR' | 'GBP' | 'INR')}
        className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 dark:text-white"
      >
        {currencyOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;