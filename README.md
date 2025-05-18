#!/bin/bash

# Project Variables — customize your repo URL here 👇
REPO_URL="https://github.com/your-username/invoice-builder-app.git"

# Initialize git
git init

# Create .gitignore
echo "node_modules/
dist/
.env
.DS_Store" > .gitignore

# Create README.md
cat <<EOT > README.md
# 📄 Invoice Builder App

A clean, modern, and fully responsive Invoice Builder built with React and Tailwind CSS — featuring real-time tax and discount calculations, PDF export, light/dark mode toggle, and a polished business-ready UI.

Designed for **CodeCircuit Hackathon 2025** as a practical tool with real-world use cases.

---

## 🚀 Features

✅ Dynamic form fields for adding invoice items  
✅ Real-time tax and discount calculations  
✅ Download invoice as PDF (via html2pdf.js)  
✅ Light/Dark mode toggle with memory  
✅ Auto-increment invoice numbers  
✅ Multi-currency support (₹, \$, €, £, ¥)  
✅ Client list dropdown with autofill  
✅ Payment terms selector (Net 7/15/30)  
✅ Invoice status tags: Draft, Sent, Paid  
✅ Print-optimized preview  
✅ Responsive mobile-first design  
✅ Neumorphic modern UI styling  
✅ Persistent data via localStorage  

---

## 📦 Tech Stack

- ⚛️ React.js — Component-based dynamic UI  
- 🎨 Tailwind CSS — Modern, utility-first styling  
- 🖨️ html2pdf.js — Export invoices to PDF  
- 🎥 Framer Motion — Smooth animations  
- 💾 localStorage API — Persistent data storage  
- 📊 (Optional: Chart.js / Recharts for stats)  

---

## 📜 Installation & Run

\`\`\`bash
git clone $REPO_URL
cd invoice-builder-app
npm install
npm run dev
\`\`\`

Open \`http://localhost:5173\` in your browser.

---

## 🎉 Upcoming Features (Post-Hackathon)

- QR Code Payment integration  
- Partial payment tracking  
- Download as Excel/CSV  
- Decked-out dashboard with invoice stats  
- Easter eggs and streak milestones  

---

## ✨ Inspiration

Built for **CodeCircuit Hackathon 2025** to showcase a polished business tool with a modern UI and real-world functionality.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤝 Contribution

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

# Stage all files
git add .

# Commit
git commit -m "Initial commit: Invoice Builder project setup with README and .gitignore"

# Add remote repo
git remote add origin $REPO_URL

# Push to main branch
git branch -M main
git push -u origin main

