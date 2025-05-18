import { InvoiceDetails } from '../types/invoice';

const INVOICE_STORAGE_KEY = 'savedInvoice';

export const saveInvoiceToLocalStorage = (invoice: InvoiceDetails): void => {
  try {
    localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(invoice));
  } catch (error) {
    console.error('Error saving invoice to localStorage:', error);
  }
};

export const loadInvoiceFromLocalStorage = (): InvoiceDetails | null => {
  try {
    const saved = localStorage.getItem(INVOICE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading invoice from localStorage:', error);
    return null;
  }
};

export const clearSavedInvoice = (): void => {
  try {
    localStorage.removeItem(INVOICE_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing saved invoice:', error);
  }
};