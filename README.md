# 📊 GitSum

**GitSum** is a modern, premium web application designed to provide deep insights and analytics into GitHub user profiles and repositories. Built with a sleek design and a performant proxy backend, it allows users to explore GitHub data seamlessly.
- Made By [Nityansh Pandey](https://github.com/nityanshpandey) and [Khush Karamchandani](https://github.com/khushkaramchandani)

---

## ✨ Features

- **👤 Profile Analytics**: Comprehensive overview of GitHub user profiles, including followers, following, and public repositories.
- **📂 Repository Insights**: Detailed listings of user repositories with sorting and filtering capabilities.
- **📈 Activity Tracking**: Real-time analytics of recent GitHub events and contributions.
- **🛡️ Secure Proxy**: Backend infrastructure to handle GitHub API requests securely, protecting credentials and managing rate limits.
- **💎 Premium Design**: A responsive, high-fidelity UI with smooth animations and a modern aesthetic.

---

## 🚀 Tech Stack

### Frontend
- **React** (Vite)
- **Vanilla CSS** (Custom Design System)
- **Axios** (Data Fetching)

### Backend
- **Node.js**
- **Express.js** (API Proxy)
- **Dotenv** (Environment Management)

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- A GitHub Personal Access Token (PAT)

### 1. Clone the Repository
```bash
git clone https://github.com/khushkaramchandani/gitsum.git
cd gitsum
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your GitHub Token:
   ```env
   GITHUB_TOKEN=your_personal_access_token_here
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---


## 📄 License

Individual/Educational use.

---
## 📒 Roadmap

In the next version, users would be able to create a resume based on their github profile.

