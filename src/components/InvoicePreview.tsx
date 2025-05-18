import React, { forwardRef } from 'react';
import { FileText } from 'lucide-react';
import { InvoiceDetails, currencyMap } from '../types/invoice';

interface InvoicePreviewProps {
  invoice: InvoiceDetails;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ invoice }, ref) => {
    const currencySymbol = currencyMap[invoice.currency];
    
    const formatCurrency = (amount: number): string => {
      return `${currencySymbol}${amount.toFixed(2)}`;
    };

    return (
      <div 
        ref={ref} 
        id="invoice-preview" 
        className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
            <p className="text-gray-600 mt-1">#{invoice.invoiceNumber || 'INV-0001'}</p>
          </div>
          <div className="flex items-center text-blue-600">
            <FileText size={24} className="mr-2" />
            <div className="text-right">
              <p className="font-medium">Issue Date: {invoice.issueDate || 'N/A'}</p>
              <p className="font-medium">Due Date: {invoice.dueDate || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* From/To Section */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">FROM</h2>
            <div className="space-y-1">
              <p className="font-medium text-gray-900">{invoice.fromName || 'Your Name/Business'}</p>
              <p className="text-gray-600">{invoice.fromEmail || 'your.email@example.com'}</p>
              <p className="text-gray-600 whitespace-pre-line">{invoice.fromAddress || 'Your Address'}</p>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">BILL TO</h2>
            <div className="space-y-1">
              <p className="font-medium text-gray-900">{invoice.toName || 'Client Name'}</p>
              <p className="text-gray-600">{invoice.toEmail || 'client.email@example.com'}</p>
              <p className="text-gray-600 whitespace-pre-line">{invoice.toAddress || 'Client Address'}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-6/12">
                  Description
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Qty
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.description || 'Item description'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-10">
          <div className="w-64">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium text-gray-900">{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Tax ({invoice.taxRate}%):</span>
              <span className="font-medium text-gray-900">{formatCurrency(invoice.taxAmount)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Discount ({invoice.discountRate}%):</span>
              <span className="font-medium text-gray-900">-{formatCurrency(invoice.discountAmount)}</span>
            </div>
            <div className="flex justify-between py-3 border-b-2 border-gray-900">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-lg font-bold text-blue-600">{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mt-10 border-t border-gray-200 pt-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Notes</h2>
            <p className="text-gray-600 whitespace-pre-line">{invoice.notes}</p>
          </div>
        )}
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;