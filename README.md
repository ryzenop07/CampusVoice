# 🎓 CampusVoice AI

<div align="center">

![CampusVoice AI](https://img.shields.io/badge/CampusVoice-AI%20Powered-blue?style=for-the-badge)
![HackIndia](https://img.shields.io/badge/HackIndia-2026-orange?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)

**Bringing Transparency & Intelligence to College Complaint Management**



</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Key Features](#-key-features)
- [AI Features](#-ai-features-powered-by-google-gemini)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Security](#-security)
- [API Documentation](#-api-documentation)
- [Future Roadmap](#-future-roadmap)
- [Team](#-team)
- [License](#-license)

---

## 🌟 Overview

**CampusVoice AI** is an intelligent, centralized complaint management system designed specifically for educational institutions. Built with the MERN stack and powered by Google Gemini AI, it revolutionizes how colleges handle student complaints by introducing automation, transparency, and real-time tracking.

### 🎯 Built For
- **HackIndia Hackathon 2024**
- **Category:** EdTech / AI Innovation
- **Target Users:** 40,000+ colleges across India

---

## 🔴 Problem Statement

### Current Challenges in College Complaint Management:

1. **❌ No Centralized System**
   - Students use emails, WhatsApp, or paper forms
   - Complaints get lost or ignored
   - No proper documentation

2. **❌ Zero Transparency**
   - Students never know complaint status
   - No tracking mechanism
   - Delayed or no responses

3. **❌ Manual & Time-Consuming**
   - Admins manually sort through complaints
   - Hours spent on categorization and assignment
   - Inefficient workflow

4. **❌ Duplicate Complaints**
   - Same issue reported multiple times
   - Wastes administrative resources
   - No duplicate detection

5. **❌ No Accountability**
   - No data on resolution rates
   - No insights for improvement
   - No performance metrics

6. **❌ Communication Gap**
   - No proper admin-student communication channel
   - Delayed responses lead to frustration
   - Issues remain unresolved for weeks

---

## ✅ Solution

**CampusVoice AI** is an AI-powered SaaS platform that:

- 🎯 **Centralizes** all complaints in one digital platform
- 🤖 **Automates** complaint routing and duplicate detection using AI
- 📊 **Tracks** complaint status in real-time with transparency
- 🔒 **Secures** data with college-specific access control
- 📈 **Analyzes** complaint patterns with visual analytics
- ⚡ **Accelerates** resolution with AI-powered suggestions

---

## 🚀 Key Features

### 👨‍🎓 Student Portal

| Feature | Description |
|---------|-------------|
| 📝 **File Complaints** | Submit complaints with title, description, category, and multiple images |
| ✏️ **Edit Complaints** | Edit pending complaints before admin review |
| 📊 **Real-Time Tracking** | View status: Pending → In Progress → Resolved/Rejected |
| 🔍 **Smart Filters** | Filter by All, Pending, In Progress, Resolved, Rejected |
| 🖼️ **Image Upload** | Upload multiple images as proof (up to 5MB each) |
| 🔔 **Admin Responses** | Receive and view admin responses in real-time |
| ⚠️ **Duplicate Warnings** | AI alerts before submitting similar complaints |
| 🛡️ **Account Safety** | Warning at 3 rejections, blocked at 5 rejections |
| 🔄 **Auto-Refresh** | Dashboard updates every 10 seconds |

### 👨‍💼 Admin Portal

| Feature | Description |
|---------|-------------|
| 📋 **View All Complaints** | Centralized dashboard for all college complaints |
| 🎯 **Status Management** | Update status and priority levels |
| 👥 **Assignment System** | Assign to departments and staff members |
| 💬 **Communication** | Send responses to students + add internal notes |
| 🤖 **AI Auto-Assignment** | Automatic department assignment using AI |
| ✨ **AI Suggestions** | Generate professional response suggestions |
| 📊 **Analytics Dashboard** | Visual charts for status and category distribution |
| 🖨️ **Print Reports** | Generate and print comprehensive complaint reports |
| 🔍 **Search & Filter** | Search by name, ID, or filter by status/category |
| 🖼️ **Image Viewer** | View and preview all uploaded images |

---

## 🤖 AI Features (Powered by Google Gemini)

### 1. 🎯 Smart Department Auto-Assignment
```
When: Admin opens a complaint for the first time
How: AI analyzes title + description
Result: Automatically assigns to correct department
Benefit: Saves time, improves accuracy, reduces manual work
```

**Example:**
- Complaint: "Broken projector in Room 301"
- AI Decision: Infrastructure Department ✅

### 2. 🔍 Intelligent Duplicate Detection
```
When: Student submits a new complaint
How: AI compares with existing complaints
Result: Shows warning if similar complaint exists
Benefit: Prevents duplicates, reduces admin workload
```

**Example:**
- New: "Hostel WiFi not working"
- Existing: "Internet connection issue in hostel"
- AI: 85% similarity detected ⚠️

### 3. 💬 AI Response Suggestions
```
When: Admin clicks "Generate" button
How: AI analyzes complaint context
Result: Provides 3 professional response options
Benefit: Faster responses, consistent communication
```

**Example:**
- Complaint: "Library AC not working"
- AI Suggestions:
  1. "We've forwarded this to maintenance. Expected fix: 24 hours."
  2. "Thank you for reporting. Our team is investigating the issue."
  3. "AC repair scheduled for tomorrow. Temporary study area available."

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** Sonner (Toast)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose
- **Authentication:** JWT + bcrypt
- **Validation:** Express Validator

### AI & APIs
![Google Gemini](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?logo=google)

- **AI Model:** Google Gemini 1.5 Flash
- **API:** @google/generative-ai
- **Use Cases:** Duplicate detection, auto-assignment, response generation

### DevOps & Tools
- **Version Control:** Git & GitHub
- **Package Manager:** npm
- **Environment:** dotenv
- **CORS:** cors middleware
- **Security:** helmet, express-rate-limit

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Next.js)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Student    │  │    Admin     │  │     Auth     │     │
│  │  Dashboard   │  │  Dashboard   │  │    Pages     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   API LAYER (Express.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Auth     │  │  Complaints  │  │   Colleges   │     │
│  │  Controller  │  │  Controller  │  │  Controller  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────────────────────────────────────────┐     │
│  │         Middleware (JWT, CORS, Validation)       │     │
│  └──────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
┌─────────────────────────┐  ┌──────────────────────┐
│   MongoDB Atlas         │  │   Google Gemini AI   │
│   ┌─────────────────┐   │  │   ┌──────────────┐   │
│   │     Users       │   │  │   │  Duplicate   │   │
│   │   (Students/    │   │  │   │  Detection   │   │
│   │    Admins)      │   │  │   └──────────────┘   │
│   └─────────────────┘   │  │   ┌──────────────┐   │
│   ┌─────────────────┐   │  │   │    Auto      │   │
│   │   Complaints    │   │  │   │  Assignment  │   │
│   │  (with images,  │   │  │   └──────────────┘   │
│   │   responses)    │   │  │   ┌──────────────┐   │
│   └─────────────────┘   │  │   │  Response    │   │
│   ┌─────────────────┐   │  │   │ Suggestions  │   │
│   │    Colleges     │   │  │   └──────────────┘   │
│   └─────────────────┘   │  └──────────────────────┘
└─────────────────────────┘
```

### Data Flow

**Student Filing Complaint:**
```
Student → File Complaint → AI Duplicate Check → Save to DB → 
Admin Dashboard → AI Auto-Assign Department → Admin Reviews → 
AI Suggests Responses → Admin Sends Response → Student Notified
```

---

## 📦 Installation

### Prerequisites
- Node.js 20+ and npm
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/campusvoice-ai.git
cd campusvoice-ai
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in `server/` directory:
```env
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/college_complaint_system
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
NODE_ENV=development
```

Start backend server:
```bash
npm start
```
Backend runs on: `http://localhost:5001`

### 3. Frontend Setup
```bash
cd ..  # Back to root directory
npm install
```

Create `.env.local` file in root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key_here
```

Start frontend:
```bash
npm run dev
```
Frontend runs on: `http://localhost:3000`

### 4. Get Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create new API key
3. Copy and paste in `.env.local`

---

## 💻 Usage

### For Colleges (Admin)

1. **Register College**
   - Go to `/auth/college/register`
   - Enter college details (name, code, email domain)
   - Set up admin account
   - Define departments

2. **Manage Complaints**
   - Login at `/auth/college/login`
   - View all complaints in dashboard
   - Update status, priority, assignments
   - Use AI suggestions for responses
   - Print reports

### For Students

1. **Register**
   - Go to `/auth/student/register`
   - Use official college email (validated)
   - Enter enrollment number

2. **File Complaint**
   - Login at `/auth/student/login`
   - Click "File New Complaint"
   - Choose category, add details, upload images
   - AI checks for duplicates
   - Submit complaint

3. **Track Status**
   - View all complaints in dashboard
   - Filter by status
   - See admin responses
   - Edit pending complaints

---

## 📸 Screenshots

### Student Dashboard
![Student Dashboard](screenshots/student-dashboard.png)
*Real-time complaint tracking with status filters*

### File Complaint with AI Duplicate Detection
![File Complaint](screenshots/file-complaint.png)
*AI warns about similar existing complaints*

### Admin Dashboard with Analytics
![Admin Dashboard](screenshots/admin-dashboard.png)
*Visual analytics and complaint management*

### AI Response Suggestions
![AI Suggestions](screenshots/ai-suggestions.png)
*Generate professional responses with one click*

### Print Report
![Print Report](screenshots/print-report.png)
*Comprehensive complaint reports*

---

## 🔒 Security

### Authentication & Authorization
- ✅ JWT-based authentication with secure tokens
- ✅ Password encryption using bcrypt (10 rounds)
- ✅ Role-based access control (Student/Admin)
- ✅ Protected API routes with middleware

### Data Security
- ✅ College email domain validation
- ✅ Unique college codes
- ✅ Students can only view their own complaints
- ✅ Admins can only access their college data
- ✅ MongoDB Atlas encryption at rest

### Account Safety
- ✅ Rejection tracking system
- ✅ Warning at 3 rejected complaints
- ✅ Auto-block at 5 rejections
- ✅ Blocked users cannot file new complaints

### Input Validation
- ✅ Server-side validation for all inputs
- ✅ File size limits (5MB per image)
- ✅ XSS protection
- ✅ SQL injection prevention (NoSQL)

---

## 📚 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

#### Register College
```http
POST /auth/register/college
Content-Type: application/json

{
  "name": "ABC College",
  "code": "ABC123",
  "emailDomain": "abc.edu.in",
  "departments": ["Infrastructure", "Academics", "Hostel"],
  "adminName": "John Doe",
  "adminEmail": "admin@abc.edu.in",
  "adminPassword": "securepassword"
}
```

#### Register Student
```http
POST /auth/register/student
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@abc.edu.in",
  "password": "securepassword",
  "collegeId": "college_id_here",
  "enrollmentNumber": "2024001"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@abc.edu.in",
  "password": "securepassword"
}
```

### Complaint Endpoints

#### Create Complaint
```http
POST /complaints
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Broken projector in Room 301",
  "description": "The projector has not been working for 3 days",
  "category": "infrastructure",
  "images": ["base64_image_1", "base64_image_2"]
}
```

#### Get All Complaints
```http
GET /complaints
Authorization: Bearer <token>
```

#### Update Complaint (Edit)
```http
PUT /complaints/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "category": "academics",
  "images": ["base64_image"]
}
```

#### Update Status (Admin Only)
```http
PUT /complaints/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "resolved"
}
```

#### Add Admin Response (Admin Only)
```http
POST /complaints/:id/response
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "response": "We have fixed the projector. Thank you for reporting."
}
```

### Response Format
```json
{
  "success": true,
  "complaint": {
    "id": "complaint_id",
    "title": "Complaint title",
    "status": "pending",
    "priority": "medium",
    ...
  }
}
```

---

## 🗂️ Project Structure

```
campusvoice-ai/
├── app/                          # Next.js app directory
│   ├── admin/
│   │   └── dashboard/           # Admin dashboard page
│   ├── auth/
│   │   ├── college/             # College auth pages
│   │   └── student/             # Student auth pages
│   ├── student/
│   │   └── dashboard/           # Student dashboard page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── admin-complaint-card.tsx
│   ├── complaint-card.tsx
│   ├── edit-complaint-dialog.tsx
│   ├── file-complaint-dialog.tsx
│   ├── dashboard-header.tsx
│   └── ui/                      # shadcn/ui components
├── lib/                         # Utilities and helpers
│   ├── api.ts                   # API service layer
│   ├── app-context.tsx          # React context
│   ├── ai-service.ts            # Google Gemini integration
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Helper functions
├── server/                      # Backend (Express.js)
│   ├── src/
│   │   ├── controllers/         # Route controllers
│   │   │   ├── authController.js
│   │   │   └── complaintController.js
│   │   ├── models/              # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── College.js
│   │   │   └── Complaint.js
│   │   ├── routes/              # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── collegeRoutes.js
│   │   │   └── complaintRoutes.js
│   │   ├── middleware/          # Express middleware
│   │   │   └── auth.js
│   │   └── config/              # Configuration
│   │       └── db.js
│   ├── server.js                # Entry point
│   └── package.json
├── public/                      # Static assets
├── .env.local                   # Frontend environment variables
├── package.json
└── README.md
```

---

## 🎯 Future Roadmap

### Phase 1 (Current) ✅
- [x] Core complaint management system
- [x] AI-powered features (3 features)
- [x] Real-time tracking
- [x] Analytics dashboard
- [x] Security & access control

### Phase 2 (Next 3 Months)
- [ ] 📧 Email notifications (complaint updates)
- [ ] 📱 Mobile app (React Native)
- [ ] 🔔 Push notifications
- [ ] 🌐 Multi-language support (Hindi, English)
- [ ] 📊 Advanced analytics (trends, patterns)

### Phase 3 (6 Months)
- [ ] 🤖 ML-based priority prediction
- [ ] 💬 Real-time chat support
- [ ] 📈 Sentiment analysis on complaints
- [ ] 🎯 Complaint trend forecasting
- [ ] 📸 OCR for handwritten complaints

### Phase 4 (1 Year)
- [ ] 🏢 Enterprise features (multi-campus)
- [ ] 🔗 Third-party integrations (ERP systems)
- [ ] 📊 Predictive analytics dashboard
- [ ] 🌍 International expansion
- [ ] 🎓 White-label solution for institutions

---

## 🏆 Achievements

- ✅ **3 Production-Ready AI Features** using Google Gemini
- ✅ **Full-Stack MERN Implementation** with TypeScript
- ✅ **Real-Time Updates** with auto-refresh mechanism
- ✅ **Enterprise-Grade Security** with JWT & role-based access
- ✅ **Scalable Architecture** ready for 40,000+ colleges
- ✅ **Modern UI/UX** with responsive design
- ✅ **Cloud Database** with MongoDB Atlas

---

## 👥 Team

**Team Name:** [Your Team Name]

| Name | Role | GitHub | LinkedIn |
|------|------|--------|----------|
| [Your Name] | Full Stack Developer | [@username](https://github.com/username) | [Profile](https://linkedin.com/in/username) |
| [Team Member 2] | Frontend Developer | [@username](https://github.com/username) | [Profile](https://linkedin.com/in/username) |
| [Team Member 3] | Backend Developer | [@username](https://github.com/username) | [Profile](https://linkedin.com/in/username) |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **HackIndia** for organizing this amazing hackathon
- **Google Gemini AI** for providing free AI API
- **MongoDB Atlas** for cloud database hosting
- **Vercel** for deployment platform
- **shadcn/ui** for beautiful UI components

---

## 📞 Contact
---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ for HackIndia 2026

![GitHub stars](https://img.shields.io/github/stars/yourusername/campusvoice-ai?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/campusvoice-ai?style=social)

</div>
