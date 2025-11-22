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

## 📁 Project Structure

