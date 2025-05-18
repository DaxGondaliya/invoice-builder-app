import React from 'react';
import InvoiceBuilder from './components/InvoiceBuilder';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <InvoiceBuilder />
      <footer className="py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
        Made By Dax Gondaliya
      </footer>
    </div>
  );
}

export default App;