# TalentIQ 🧠

**TalentIQ** is a cutting-edge, real-time platform designed to revolutionize technical interviews and remote coding sessions. It seamlessly integrates real-time video communication, collaborative code editing, and chat assistance into a single, cohesive interface.

![TalentIcon](https://img.shields.io/badge/Real-Time-blue?style=flat-square&logo=clock)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb)

---

## 🚀 Key Features

*   **Real-time Collaboration:** Conduct live video and audio calls directly within the interview environment using Stream Video SDK.
*   **Interactive Code Editor:** A fully-featured code editor (Monaco) supporting multiple languages (JavaScript, Python, Java) with syntax highlighting and auto-completion.
*   **Live Code Execution:** Execute code in real-time and see output instantly, powered by Piston API.
*   **Integrated Chat:** Built-in chat functionality for smooth communication alongside video.
*   **Session Management:** Create, join, and manage interview sessions effortlessly.
*   **Planned: AI-Enhanced:** (Future Roadmap) AI suggestions and analysis to help interviewers evaluate candidate performance.

## 🛠️ Tech Stack

### Frontend
*   **Framework:** [React](https://react.dev/) (Vite)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
*   **State Management:** [TanStack Query](https://tanstack.com/query/latest)
*   **Video & Chat:** [Stream SDK](https://getstream.io/)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **Icons:** Lucide React

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (Mongoose)
*   **Background Jobs:** [Inngest](https://www.inngest.com/) (Event-driven architecture)

## 📦 Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas)
*   Clerk Account (for Auth)
*   Stream Account (for Video/Chat)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/talentiq.git
cd talentiq
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following credentials:
```env
PORT=3000
DB_URL=mongodb://localhost:27017/interview_db
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Clerk Auth
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stream Video & Chat
STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=http://localhost:3000
```

Start the frontend development server:
```bash
npm run dev
```

## 🖥️ Usage

1.  **Sign Up/Login:** Create an account using Clerk authentication.
2.  **Dashboard:** View active sessions or create a new one.
3.  **Start Session:** As a host, start a session to generate a unique room ID.
4.  **Invite Candidate:** Share the session ID or link with the candidate.
5.  **Interview:** Collaborate on code, run it, and communicate via video/chat.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

**TalentIQ** — *Empowering the next generation of technical hiring.*
