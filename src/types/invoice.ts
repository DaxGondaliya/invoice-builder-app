export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

export type PaymentTerms = 'NET7' | 'NET15' | 'NET30';
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'PARTIALLY_PAID';
export type TaxType = 'FLAT' | 'GST' | 'VAT';

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
}

export interface PaymentDetails {
  status: InvoiceStatus;
  paidAmount?: number;
  paymentDate?: string;
  paymentMethod?: string;
  qrCodeData?: string;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  items: InvoiceItem[];
  notes: string;
  subtotal: number;
  taxType: TaxType;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  total: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY';
  paymentTerms: PaymentTerms;
  payment: PaymentDetails;
  savedClient?: Client;
}

export type CurrencySymbol = '$' | '€' | '£' | '₹' | '¥';

export const currencyMap: Record<InvoiceDetails['currency'], CurrencySymbol> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥'
};

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const paymentTermsMap: Record<PaymentTerms, number> = {
  NET7: 7,
  NET15: 15,
  NET30: 30
};

export const statusColorMap: Record<InvoiceStatus, string> = {
  DRAFT: 'bg-gray-200 text-gray-800',
  SENT: 'bg-blue-200 text-blue-800',
  PAID: 'bg-green-200 text-green-800',
  OVERDUE: 'bg-red-200 text-red-800',
  PARTIALLY_PAID: 'bg-yellow-200 text-yellow-800'
};