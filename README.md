# Sahayak-AI

**Hyper-Local Logistics & Trust Engine for Kerala**

Sahayak-AI is a web application that connects people in Kerala with trusted local helpers for everyday micro-tasks. From emergency plumbing to medicine pickup, our platform uses Google Gemini AI to verify tasks, vet users, and intelligently match helpers with those who need assistance.

## 🎯 Problem Statement

In Kerala, finding trusted help for "in-between" micro-tasks is challenging:
- Urban Clap/Zomato don't cover these hyper-local, one-off tasks
- People rely on "knowing a guy" which is unreliable and unsafe
- No verification system for helpers
- Difficulty finding immediate help for urgent needs

## 💡 Solution

A neighborhood task-agent platform that:
- ✅ Uses **Google Gemini AI** to verify tasks and match helpers
- ✅ Implements a **trust score system** based on completed tasks and reviews
- ✅ Provides **hyper-local matching** within your neighborhood
- ✅ Enables **instant task posting** for urgent needs

## 🚀 Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Google Gemini AI** (@google/generative-ai)
- JWT authentication
- RESTful API architecture

### Frontend
- **React** with Vite
- React Router for navigation
- Axios for API calls
- Modern, responsive UI

### AI Integration
- **Google Gemini Pro** for:
  - Task verification and categorization
  - User vetting during registration
  - Intelligent task-to-helper matching
  - Trust score insights

## 📁 Project Structure

```
sahayak-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic (Gemini AI)
│   │   ├── middleware/     # Auth middleware
│   │   └── config/         # Configuration
│   ├── server.js           # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service
│   │   └── utils/          # Utilities
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google Gemini API key

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```
MONGODB_URI=your-mongodb-connection-string
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-secret-key
```

5. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run at `http://localhost:3000`

## 🔑 Getting Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

## 📊 Database Models

### User
- Profile information (name, email, phone, location)
- User type (poster, helper, or both)
- Trust score (0-100)
- Skills and verification status

### Task
- Task details (title, description, category)
- Location and budget
- Status tracking (open, assigned, completed)
- AI verification and suggestions

### Review
- Rating (1-5 stars)
- Comments
- Aspect ratings (punctuality, quality, communication, professionalism)

## 🤖 AI Features

### Task Verification
Gemini AI analyzes tasks for:
- Validity and reasonableness
- Appropriate categorization
- Safety concerns
- Description improvements

### User Vetting
AI checks user registrations for:
- Spam/fake patterns
- Suspicious information
- Professional appearance

### Smart Matching
AI evaluates helper suitability based on:
- Task requirements
- Helper skills
- Trust score
- Past experience

## 🌟 Key Features

- **Task Management**: Post, browse, and manage tasks
- **User Authentication**: Secure JWT-based auth
- **Location-based Search**: Find tasks in your area
- **Trust System**: Transparent scoring based on performance
- **Review System**: Rate and review helpers
- **Real-time Updates**: Track task status
- **AI-Powered Insights**: Get recommendations and matches

## 🔐 Security

- Passwords hashed with bcrypt
- JWT token authentication
- Input validation
- CORS protection
- Environment variable protection

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create task (auth required)
- `PUT /api/tasks/:id` - Update task (auth required)
- `DELETE /api/tasks/:id` - Delete task (auth required)
- `POST /api/tasks/:id/assign` - Assign task to self
- `POST /api/tasks/:id/complete` - Mark task complete

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/tasks` - Get user's tasks
- `GET /api/users/reviews` - Get user's reviews

## 🤝 Contributing

This is a personal project for Kerala's hyper-local logistics needs. Contributions and suggestions are welcome!

## 📄 License

ISC

## 👨‍💻 Author

Built with ❤️ for Kerala's gig-less economy

---

**Note**: This project uses Google Gemini AI as the core technology for intelligent task verification and matching. Make sure to obtain a valid API key before running the application.
