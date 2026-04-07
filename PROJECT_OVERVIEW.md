# Re-Gadgets Project Overview

## Problem Statement
The project addresses the gap in accessible and reliable gadget repair services. Users have difficulty finding trustworthy repair technicians, tracking repair status, and managing repair bookings in a centralized manner. Shop owners need a platform to connect with customers efficiently, and technicians need a way to receive and manage repair jobs seamlessly.

---

## Solution Provided
**Re-Gadgets** is a premium doorstep gadget repair platform that:
- Connects customers with verified repair shops and technicians
- Provides real-time order tracking and status updates
- Enables multi-role dashboards for different user types
- Integrates AI-powered (Gemini) assistant for customer support and repair guidance
- Facilitates seamless booking, pickup, repair, and delivery workflows

---

## Key Features

### 1. **Multi-Role User System**
   - **Customers**: Book repairs, track orders, view history and reviews
   - **Shop Owners**: Manage incoming repair requests, staff technicians, view earnings
   - **Technicians**: View active repairs, complete service logs
   - **Admins**: Global user management, platform analytics, system logs

### 2. **AI-Powered Chat Assistant**
   - Real-time customer support using Google Generative AI (Gemini 1.5 Flash)
   - Bilingual support: English and Hinglish
   - Action-based responses with buttons for:
     - `[ACTION:BOOK_REPAIR]` - Direct booking flow
     - `[ACTION:TRACK_ORDER]` - Order tracking
     - `[ACTION:CHECK_PRICE]` - Pricing information
   - Message history context (last 5 messages) for conversational continuity

### 3. **Order Management System**
   - Track repair status through stages: Requested → Accepted → Picked → Repairing → Delivered
   - Device details capture (type, model, issue)
   - Scheduled pickup and delivery dates
   - Price estimation and payment tracking
   - Estimated completion time calculation

### 4. **Shop Management**
   - Shop registration and verification
   - Location-based coordinates tracking
   - Rating system for quality assurance
   - Owner information and contact details

### 5. **Authentication & Authorization**
   - User registration and login system
   - Role-based access control
   - Token-based authentication middleware

### 6. **Responsive UI/UX**
   - Modern dark theme (#020617 background)
   - Smooth animations and page transitions using Framer Motion
   - Drag-and-drop functionality with hello-pangea/dnd
   - Component library: Lucide icons, custom buttons, cards, forms
   - Tailwind CSS for responsive styling

### 7. **Dashboard Analytics** (Placeholder structure ready)
   - Customer: Active orders, repair history, reviews
   - Shop: Incoming requests, technician staff, earnings reports
   - Technician: Active repair matrix, completed service logs
   - Admin: User analytics, platform logs, system monitoring

---

## Tech Stack

### Frontend
- **Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1 (with HMR)
- **Styling**: Tailwind CSS 4.2.2 + PostCSS
- **Routing**: React Router DOM 7.13.1
- **Animations**: Framer Motion 12.38.0
- **Charting**: Recharts 2.15.1 (for analytics dashboards)
- **Drag & Drop**: @hello-pangea/dnd 18.0.1
- **Icons**: Lucide React 0.577.0
- **Linting**: ESLint 9.39.4

### Backend
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js 4.19.2
- **Database**: MongoDB with Mongoose 8.3.4
- **AI Integration**: Google Generative AI 0.20.0 (Gemini API)
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv 16.4.5

---

## Project Architecture

```
Re-Gadgets/
├── client/ (React + Vite Frontend)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx (Landing page)
│   │   │   ├── BookService.jsx (Repair booking flow)
│   │   │   ├── Tracking.jsx (Order tracking)
│   │   │   ├── AuthPage.jsx (Login/Register)
│   │   │   └── dashboards/ (Role-based dashboards)
│   │   │       ├── CustomerDashboard.jsx
│   │   │       ├── ShopDashboard.jsx
│   │   │       ├── TechnicianDashboard.jsx
│   │   │       └── AdminDashboard.jsx
│   │   ├── components/
│   │   │   ├── chat/ (AI Assistant components)
│   │   │   │   ├── ChatBot.jsx (Main chat interface)
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   ├── MessageBubble.jsx
│   │   │   │   ├── RobotAssistant.jsx (AI mascot)
│   │   │   │   ├── VoiceInput.jsx
│   │   │   │   └── AnimatedCursor.jsx
│   │   │   ├── dashboard/ (Dashboard layouts)
│   │   │   ├── home/ (Home page sections)
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── AIFeaturesSection.jsx
│   │   │   │   ├── ServicesSection.jsx
│   │   │   │   ├── HowItWorksSection.jsx
│   │   │   │   └── TrustSection.jsx
│   │   │   ├── Button.jsx, Card.jsx, InputField.jsx, etc.
│   │   ├── hooks/
│   │   │   ├── useVoiceAssistant.js (Voice input handling)
│   │   │   └── useCursorTracker.js (Custom cursor tracking)
│   │   ├── services/
│   │   │   ├── aiService.js (Gemini API communication)
│   │   │   └── utils.js
│   │   ├── context/
│   │   │   └── ThemeContext.jsx (Global theme management)
│   │   └── layouts/
│   │       └── DashboardLayout.jsx (Role-based layout)
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── server/ (Express Backend)
    ├── server.js (Main entry point - port 5000)
    ├── models/
    │   ├── User.js (User schema with role enum)
    │   ├── Order.js (Repair order tracking)
    │   ├── Shop.js (Shop details & location)
    │   └── Worker.js (Technician information)
    ├── controllers/
    │   ├── authController.js (Register/Login)
    │   ├── chatController.js (AI chat logic - Gemini integration)
    │   ├── orderController.js (Order management)
    │   └── shopController.js (Shop operations)
    ├── routes/
    │   ├── authRoutes.js (POST /register, /login)
    │   ├── chat.js (POST /api/chat - AI responses)
    │   ├── orderRoutes.js (Order CRUD operations)
    │   └── shopRoutes.js (Shop CRUD operations)
    ├── middleware/
    │   └── authMiddleware.js (JWT verification)
    └── package.json
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Chat/AI
- `POST /api/chat` - Send message to AI assistant
  - Request: `{ message, history }`
  - Response: `{ reply, actionContext }`

### Orders
- CRUD operations for repair orders
- Status tracking through pipeline

### Shops
- Shop registration and profile management
- Location-based queries

### Health Check
- `GET /api/health` - Server status verification

---

## Data Models

### User
```
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  phone: String,
  role: String (enum: 'customer', 'admin', default: 'customer'),
  createdAt: Date
}
```

### Order
```
{
  customer: ObjectId (ref: User),
  deviceType: String (required),
  deviceModel: String (required),
  issue: String (required),
  status: String (enum: ['Requested', 'Accepted', 'Picked', 'Repairing', 'Delivered']),
  shopId: ObjectId (ref: Shop),
  workerId: ObjectId (ref: Worker),
  pickupAddress: String (required),
  scheduledDate: Date,
  price: Number,
  estimatedCompletionTime: Date,
  isPaid: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Shop
```
{
  shopName: String (required),
  ownerName: String (required),
  email: String (required, unique),
  phone: String (required),
  address: String (required),
  locationCoordinates: { lat: Number, lng: Number },
  rating: Number (default: 0),
  isVerified: Boolean (default: false),
  createdAt: Date
}
```

---

## AI Assistant Features

### System Instruction
The AI is configured as the official Technical Assistant for Re-Gadgets with:
- **Personality**: Intelligent, friendly, playful, helpful robot mascot
- **Languages**: English and Hinglish (mixed Hindi-English)
- **Response Style**: Concise (1-3 sentences max)
- **Action Triggers**: Auto-generates action buttons based on user intent

### Action Context
The assistant can trigger specific frontend actions:
- `BOOK_REPAIR` - Initiates repair booking flow
- `TRACK_ORDER` - Opens order tracking interface
- `CHECK_PRICE` - Displays pricing information

### Conversation Context
- Maintains last 5 messages for context window
- Uses Gemini 1.5 Flash model
- Temperature: 0.7 (balanced creativity)
- Max tokens: 200 (concise responses)

---

## Current Status & Development Notes

### ✅ Completed
- Full project structure and scaffolding
- Multi-role dashboard framework
- AI Chat integration with Gemini API
- Authentication routes and middleware
- Database models and schemas
- Frontend component library
- Responsive UI with Tailwind CSS + Framer Motion

### 🔄 In Progress / To Be Implemented
- Dashboard placeholder pages (ready for feature implementation)
- Order tracking real-time updates
- Shop verification system
- Payment integration
- Voice input processing (hook exists, needs backend)
- Advanced analytics and reporting
- Notification system
- Review and rating system
- Geolocation-based shop search

### ⚠️ Configuration Required
- MongoDB connection URI in `.env`
- Google Generative AI API Key in `.env`
- Production environment variables setup

---

## Development Scripts

### Frontend
```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend
```bash
npm start        # Run production server
npm run dev      # Run with Node watch mode
```

---

## Key Integration Points

### AI Service Integration
Frontend calls `sendChatMessage()` from `aiService.js` which:
1. Trims message history to last 5 messages
2. Posts to `http://localhost:5000/api/chat`
3. Backend processes with Gemini API
4. Parses action context from response
5. Returns reply and actionable buttons to frontend

### Chat UI Components
- `ChatBot.jsx`: Main chat interface wrapper
- `ChatWindow.jsx`: Message display area
- `MessageBubble.jsx`: Individual message styling
- `RobotAssistant.jsx`: AI mascot avatar
- `VoiceInput.jsx`: Voice-to-text input

### Dashboard Flow
- Route changes determine which dashboard displays
- Role-based access via URL path: `/customer`, `/shop`, `/technician`, `/admin`
- Nested routes for each role-specific pages

---

## Styling & Theme

- **Primary Background**: `#020617` (dark navy)
- **Text Color**: Slate 200 (light)
- **Theme Context**: Global theme management available
- **Animation Library**: Framer Motion for smooth page transitions
- **Icon Set**: Lucide React icons
- **Utility CSS**: Tailwind CSS with custom configuration

---

## Files You Should Familiarize With First

1. **Backend Entry**: `server/server.js`
2. **Frontend Entry**: `client/src/App.jsx`
3. **AI Logic**: `server/controllers/chatController.js`
4. **AI Client Service**: `client/src/services/aiService.js`
5. **Database Models**: All files in `server/models/`
6. **API Routes**: All files in `server/routes/`
7. **Dashboard Layout**: `client/src/layouts/DashboardLayout.jsx`

---

## Environment Variables Needed

Create `.env` file in the `server/` directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_generative_ai_key
NODE_ENV=development
```

---

## Next Steps for Development

1. Set up environment variables
2. Connect MongoDB database
3. Test authentication flow
4. Implement real-time order tracking with WebSockets
5. Build shop search and filtering functionality
6. Implement payment gateway integration
7. Add notification system
8. Complete placeholder dashboard pages with actual features
9. Add comprehensive error handling and logging
10. Write unit and integration tests