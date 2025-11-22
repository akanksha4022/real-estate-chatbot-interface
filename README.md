# 🏡 Real Estate Analysis Chatbot (Django + React + Vite)

A full-stack web-based chatbot that analyzes real estate localities from an Excel dataset and gives:

- 📌 Text Summary (LLM / Mock Output)
- 📈 Price Trend Chart
- 📊 Demand Trend Chart
- 📋 Filtered Data Table
- 📤 Download Dataset Option

This project uses:

- **Backend:** Django REST Framework  
- **Frontend:** React + Vite + Bootstrap  
- **Charts:** Chart.js  
- **Deployment:** Backend on Render, Frontend on Vercel  
- **Data:** Excel dataset (Pune Localities)

---

## 🚀 Features

### ✔ Natural Language Query Processing  
Examples:
- “Give me analysis of Wakad”
- “Compare Ambegaon Budruk and Aundh”
- “Show price growth for Akurdi last 3 years”

### ✔ Data Processing  
The backend:
- Loads and cleans Excel data  
- Filters by locality  
- Prepares structured chart data  
- Avoids NaN / Infinity errors  

### ✔ Frontend UI  
- Chat-like input interface  
- Dynamic charts  
- Auto-generated summary  
- Clean table view  
- Download CSV button  

---

## 🛠️ Tech Stack

### **Backend**
- Django  
- Django REST Framework  
- Pandas  
- Gunicorn (for deployment)  

### **Frontend**
- React  
- Vite  
- Bootstrap  
- Axios  
- Chart.js  

### **Deployment**
- Render (Backend)  
- Vercel (Frontend)  

---



---



## 📁 Project Structure
```
real-estate-chatbot/
│
├── backend/
│ ├── backend/
│ ├── api/
│ ├── data/real_estate.xlsx
│ ├── requirements.txt
│ ├── Procfile
│ └── manage.py
│
├── frontend/
│ ├── src/App.jsx
│ ├── vite.config.js
│ └── package.json
│
└── README.md
```
## ⚙️ Backend Setup (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```
## ⚙️ frontend Setup (Django)

```bash
cd frontend
npm install
npm run dev
```
### frontend runs at
http://localhost:5173

## 🌐 API Endpoint
POST /api/query/

### Request:

{
  "query": "analysis of wakad"
}


### Response:

{
  "summary": "...",
  "chart": {...},
  "table": {...}
}

## 📥 Download Dataset
### GET /api/download/


Downloads real_estate_data.csv.

## ✨ Author

Akanksha Singh
