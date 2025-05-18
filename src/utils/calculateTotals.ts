import { InvoiceDetails, InvoiceItem } from '../types/invoice';

export const calculateItemAmount = (item: InvoiceItem): number => {
  return Number((item.quantity * item.price).toFixed(2));
};

export const calculateSubtotal = (items: InvoiceItem[]): number => {
  return Number(
    items.reduce((sum, item) => sum + calculateItemAmount(item), 0).toFixed(2)
  );
};

export const calculateTaxAmount = (subtotal: number, taxRate: number): number => {
  return Number(((subtotal * taxRate) / 100).toFixed(2));
};

export const calculateDiscountAmount = (subtotal: number, discountRate: number): number => {
  return Number(((subtotal * discountRate) / 100).toFixed(2));
};

export const calculateTotal = (
  subtotal: number,
  taxAmount: number,
  discountAmount: number
): number => {
  return Number((subtotal + taxAmount - discountAmount).toFixed(2));
};

export const updateInvoiceCalculations = (invoice: InvoiceDetails): InvoiceDetails => {
  // Update each item's amount
  const updatedItems = invoice.items.map(item => ({
    ...item,
    amount: calculateItemAmount(item)
  }));

  // Calculate subtotal
  const subtotal = calculateSubtotal(updatedItems);
  
  // Calculate tax amount
  const taxAmount = calculateTaxAmount(subtotal, invoice.taxRate);
  
  // Calculate discount amount
  const discountAmount = calculateDiscountAmount(subtotal, invoice.discountRate);
  
  // Calculate total
  const total = calculateTotal(subtotal, taxAmount, discountAmount);

  return {
    ...invoice,
    items: updatedItems,
    subtotal,
    taxAmount,
    discountAmount,
    total
  };
};