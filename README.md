# 🚀 Task Flow

> **A modern web app that captures user events, login data, and weekly task activity — fully containerized with Docker.**  
Built with ❤️ using **React, TypeScript, and Vite**.

<div align="center">
  <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTF3b2Z1bDBzaDI1b3ZrN3liOTI2ZTdteDIwZW9jZndieWlsd2dldCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Wrlwh4k4Uz1o3imeZg/giphy.gif" width="200">
</div>
---

## 🌟 Features

✅ **Login Simulation**  
- Simulates user login  
- Captures:
  - ⏰ **Login Timestamp**
  - 💻 **Device Details**
  - 📍 **Geolocation**

✅ **Weekly Task Tracker**  
- Add, view, and edit weekly task entries  
- Stores modification timestamps  
- Clean, interactive UI with real-time updates  

✅ **Event Data Handling**  
- Stores all user events in a structured data format  
- Edits are tracked and timestamped for accountability  

✅ **Containerized with Docker**  
- Easily deployable anywhere  
- Lightweight and consistent runtime environment  

---

## 🧱 Tech Stack

| Category | Technologies |
|-----------|---------------|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| State Management | useState, useEffect hooks |
| Containerization | Docker |
| Deployment | Render / Railway / AWS (your choice) |

---

## ⚙️ Installation & Setup

Clone this repo:

git clone https://github.com/<your-username>/event-log-weaver.git
cd event-log-weaver
Install dependencies:


Copy code
npm run dev
🐳 Docker Setup
Build and run the app inside Docker:

Then open:
👉 http://localhost:8080


🧠 Architecture Overview
vbnet
Copy code
┌─────────────────────────────┐
│        User Interface        │
│ (React + TypeScript + Vite)  │
└──────────────┬───────────────┘
               │
               ▼
┌─────────────────────────────┐
│     Event Logging Logic     │
│ (Timestamps, Device Info,   │
│  Geolocation, Edits)        │
└──────────────┬───────────────┘
               │
               ▼
┌─────────────────────────────┐
│  Data Structure / State Mgmt │
│ (In-memory / LocalStorage)   │
└──────────────┬───────────────┘
               │
               ▼
┌─────────────────────────────┐
│     Docker Container         │
│  (Portable & Deployable)     │
└─────────────────────────────┘
🧩 Project Highlights
💡 Clean UI built with Tailwind

⚡ Instant state updates with React hooks

🌐 Real-time location capture using browser APIs

🐳 Dockerized for consistent deployment

🧰 Easily extendable for backend integration

📦 Deployment (Render Example)
Push your repo to GitHub

Go to Render.com → New Web Service

Connect your repo

Render auto-detects your Dockerfile 🚀

App goes live at:
https://event-log-weaver.onrender.com

🤝 Contributing
Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.

🧑‍💻 Author
Roshal Dsouza


⭐ Support
If you like this project, consider giving it a ⭐ on GitHub!
Your support helps improve and grow this open-source project 🙌
