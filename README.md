# CSV Data Dashboard

A single-page React web application that allows users to upload a CSV file containing sales data and visualize it through tables, charts, and summary statistics.

---

## Features

- Upload CSV file through file input  
- Parse CSV using Papa Parse  
- Display clean, responsive data tables  
- Compute total revenue, quantity, and unique product count  
- Render bar and line charts using Recharts  
- Handle validation and file errors gracefully  

---

## Tech Stack

| Layer | Tools | Description |
|--------|--------|-------------|
| Language | JavaScript | Core applicatoin logic |
| Framework | React (Vite) | Lightweight frontend development |
| Parsing | Papa Parse | Fast and reliable CSV parsing |
| Charting | Recharts | React-friendly data visualization |
| Deployment | GitHub Pages / Vercel | Simple CI/CD and static hosting |

---

## Project Structure
```
src/
├── components/
│ ├── DataTable.jsx # Renders parsed CSV data in a table
│ ├── StatsSummary.jsx # Displays computed statistics (revenue, quantity, etc.)
│ ├── QuantityRevenueChart.jsx # Revenue/quantity over time visualization
│ ├── ProductChart.jsx # Product-level comparison chart
│ └── ErrorBanner.jsx # Displays validation and error messages
│
├── pages/
│ ├── UploadPage.jsx # File upload and validation page
│ └── ResultsPage.jsx # Displays table, stats, and charts
│
├── utils/
│ └── parseCSV.js # Core CSV parsing and validation logic
│
├── App.jsx # Main application logic and view toggling
├── main.jsx # React entry point
└── styles.css # Global and layout styles
```
