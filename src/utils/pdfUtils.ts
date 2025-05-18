import html2pdf from 'html2pdf.js';

export const generatePDF = async (
  elementId: string, 
  filename: string = 'invoice.pdf', 
  callback?: () => void
): Promise<void> => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error(`Element with ID '${elementId}' not found`);
    return;
  }

  const options = {
    margin: [10, 10, 10, 10],
    filename: filename,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(options).from(element).save();
    if (callback) {
      callback();
    }
  } catch (error) {
    console.error('PDF generation failed:', error);
  }
};