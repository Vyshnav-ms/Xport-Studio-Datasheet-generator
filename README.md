# XPort Studio

XPort Studio is a premium datasheet generation application that allows you to design a custom table structure and export it professionally into multiple formats including:

- PDF
- Word (DOCX)
- Excel (XLSX)

The UI is built with a luxury gold + black theme, smooth animations, and a clear step-by-step wizard to help users generate export-ready business documents in seconds.

---

## 🌟 Key Features

✔ Multi-format export — PDF, Word, Excel  
✔ Guided workflow with 4 steps  
✔ Column customization  
✔ Row count selection  
✔ Header color picker  
✔ Animated luxury UI (glassmorphism + parallax)  
✔ Works on Desktop, Tablet, and Mobile  
✔ Fully ready for Vercel deployment  

---

## 🛠️ Tech Stack

| Technology | Purpose |
|----------|---------|
| React + Vite | Web application |
| Material UI | Modern UI components |
| Framer Motion | Animated transitions |
| jsPDF + AutoTable | PDF export |
| docx | Microsoft Word export |
| SheetJS (XLSX) | Excel file generation |
| Lottie (optional) | Stylish animations |

---

## 📦 Installation & Development

```bash
# Clone this repository
git clone https://github.com/<your-username>/xport-studio.git

cd xport-studio

# Install dependencies
npm install

# Run development server
npm run dev

# Visit in browser:
http://localhost:5173/

# 🚀 Production Build & Deployment
npm run build
```
Deploy dist/ folder to:
Vercel (recommended)
Netlify
GitHub Pages
Any static hosting service

## 📂 Project Structure
```bash
src/
 ├─ utils/
 │   ├─ exportPdf.js
 │   ├─ exportDocx.js
 │   └─ exportExcel.js
 ├─ App.jsx
 ├─ main.jsx
└─ index.css
```
## ✨ What You Can Generate
Business-ready templates like:
Salary datasheets
Attendance sheets
Student marklists
Inventory logs
General table forms for businesses


## 🧩 Future Enhancements
Planned improvements:
Add company logo to exported files
Save and reuse template structures
Editable preview table
Confetti success animation
Light/Dark theme toggle

## 👤 Author

Made by Vyshnav
MCA Student & Passionate Web Developer
Focused on real-world and production-ready applications.