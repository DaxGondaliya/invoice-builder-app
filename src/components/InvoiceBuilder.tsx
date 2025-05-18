import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Confetti from 'react-confetti';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import { InvoiceDetails, InvoiceItem } from '../types/invoice';
import { generatePDF } from '../utils/pdfUtils';
import { updateInvoiceCalculations } from '../utils/calculateTotals';
import { loadInvoiceFromLocalStorage } from '../utils/localStorage';
import { ThemeProvider } from '../context/ThemeContext';

const InvoiceBuilder: React.FC = () => {
  const invoicePreviewRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const initialInvoice: InvoiceDetails = {
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`,
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    fromName: '',
    fromEmail: '',
    fromAddress: '',
    toName: '',
    toEmail: '',
    toAddress: '',
    items: [
      {
        id: uuidv4(),
        description: '',
        quantity: 1,
        price: 0,
        amount: 0
      }
    ],
    notes: '',
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    discountRate: 0,
    discountAmount: 0,
    total: 0,
    currency: 'USD'
  };

  const [invoice, setInvoice] = useState<InvoiceDetails>(initialInvoice);

  // Load saved invoice from localStorage on component mount
  useEffect(() => {
    const savedInvoice = loadInvoiceFromLocalStorage();
    if (savedInvoice) {
      setInvoice(savedInvoice);
    }
  }, []);

  // Recalculate totals when relevant values change
  useEffect(() => {
    setInvoice(prevInvoice => updateInvoiceCalculations(prevInvoice));
  }, [
    invoice.items, 
    invoice.taxRate, 
    invoice.discountRate
  ]);

  const handleGeneratePDF = () => {
    generatePDF('invoice-preview', `Invoice-${invoice.invoiceNumber}.pdf`, () => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    });
  };

  return (
    <ThemeProvider>
      <div className="container mx-auto px-4 py-10">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <InvoiceForm 
              invoice={invoice} 
              setInvoice={setInvoice} 
              generatePDF={handleGeneratePDF} 
            />
          </div>
          <div className="lg:col-span-1 lg:sticky lg:top-8 self-start">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Invoice Preview
            </h2>
            <div className="overflow-auto max-h-[800px] pb-4">
              <InvoicePreview ref={invoicePreviewRef} invoice={invoice} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default InvoiceBuilder;