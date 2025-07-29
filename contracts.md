# Backend Development Contracts

## Overview
This document outlines the API contracts, data models, and integration strategy for Shreeya's dynamic portfolio website backend.

## Current Mock Data Analysis
All data is currently served from `/app/frontend/src/mock.js` and needs to be moved to MongoDB with CRUD APIs.

## Database Models

### 1. Profile Model
```javascript
{
  _id: ObjectId,
  name: String,
  headline: String,
  bio: String,
  highlights: String,
  profileImage: String,
  email: String,
  linkedin: String,
  location: String,
  updatedAt: Date
}
```

### 2. Skills Model
```javascript
{
  _id: ObjectId,
  category: String, // 'current', 'learning', 'tools', 'programming', 'database', 'cloud', 'soft'
  skills: [String],
  updatedAt: Date
}
```

### 3. Projects Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String, // 'completed', 'coming-soon'
  image: String,
  liveUrl: String,
  githubUrl: String,
  technologies: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Education Model
```javascript
{
  _id: ObjectId,
  degree: String,
  institution: String,
  year: String,
  progress: Number, // percentage
  updatedAt: Date
}
```

### 5. Experience Model
```javascript
{
  _id: ObjectId,
  message: String,
  updatedAt: Date
}
```

### 6. Learning Journey Model
```javascript
{
  _id: ObjectId,
  phase: String,
  skills: [String],
  status: String, // 'completed', 'in-progress', 'planned'
  order: Number,
  updatedAt: Date
}
```

### 7. Experiments Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String, // 'active', 'planning'
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Contact Messages Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  read: Boolean,
  createdAt: Date
}
```

### 9. Admin Model
```javascript
{
  _id: ObjectId,
  username: String,
  password: String, // hashed
  createdAt: Date
}
```

## API Endpoints

### Public APIs (No Auth Required)

#### Profile
- `GET /api/profile` - Get profile data
- Frontend Usage: Replace `portfolioData.profile` calls

#### Skills
- `GET /api/skills` - Get all skills by category
- Frontend Usage: Replace `portfolioData.skills` calls

#### Projects
- `GET /api/projects` - Get all projects
- Frontend Usage: Replace `portfolioData.projects` calls

#### Education
- `GET /api/education` - Get education info
- Frontend Usage: Replace `portfolioData.education` calls

#### Experience
- `GET /api/experience` - Get experience message
- Frontend Usage: Replace `portfolioData.experience` calls

#### Learning Journey
- `GET /api/learning-journey` - Get learning timeline
- Frontend Usage: Replace `portfolioData.learningJourney` calls

#### Experiments
- `GET /api/experiments` - Get latest experiments
- Frontend Usage: Replace `portfolioData.experiments` calls

#### Contact
- `POST /api/contact` - Submit contact form
- Frontend Usage: Replace mock form submission in ContactSection.jsx

### Admin APIs (Auth Required)

#### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/verify` - Verify admin token

#### Profile Management
- `PUT /api/admin/profile` - Update profile data

#### Skills Management
- `PUT /api/admin/skills/:category` - Update skills by category

#### Projects Management
- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

#### Education Management
- `PUT /api/admin/education` - Update education info

#### Experience Management
- `PUT /api/admin/experience` - Update experience message

#### Learning Journey Management
- `POST /api/admin/learning-journey` - Create new phase
- `PUT /api/admin/learning-journey/:id` - Update phase
- `DELETE /api/admin/learning-journey/:id` - Delete phase

#### Experiments Management
- `POST /api/admin/experiments` - Create new experiment
- `PUT /api/admin/experiments/:id` - Update experiment
- `DELETE /api/admin/experiments/:id` - Delete experiment

#### Messages Management
- `GET /api/admin/messages` - Get all contact messages
- `PUT /api/admin/messages/:id/read` - Mark message as read
- `DELETE /api/admin/messages/:id` - Delete message

## Frontend Integration Strategy

### Phase 1: Replace Mock Data Calls
1. Update all components to use axios calls instead of importing from mock.js
2. Create API utility functions in `/app/frontend/src/utils/api.js`
3. Add loading states and error handling
4. Keep mock.js as fallback during development

### Phase 2: Admin Panel
1. Create admin login page at `/admin/login`
2. Create protected admin dashboard at `/admin/dashboard`
3. Implement CRUD interfaces for each content type
4. Add JWT token management

### Files to Modify:
1. **HeroSection.jsx** - Replace `portfolioData.profile` with API call
2. **AboutSection.jsx** - Replace `portfolioData.profile` with API call
3. **SkillsSection.jsx** - Replace `portfolioData.skills` with API call  
4. **ProjectsSection.jsx** - Replace `portfolioData.projects` with API call
5. **EducationSection.jsx** - Replace `portfolioData.education` with API call
6. **ExperienceSection.jsx** - Replace `portfolioData.experience` with API call
7. **LearningJourneySection.jsx** - Replace `portfolioData.learningJourney` with API call
8. **ExperimentsSection.jsx** - Replace `portfolioData.experiments` with API call
9. **ContactSection.jsx** - Replace mock form submission with real API call

### New Files to Create:
1. **AdminLogin.jsx** - Admin login form
2. **AdminDashboard.jsx** - Main admin panel
3. **AdminLayout.jsx** - Protected route wrapper
4. **utils/api.js** - API utility functions
5. **utils/auth.js** - Authentication utilities
6. **context/AuthContext.js** - Admin auth state management

## Authentication Strategy
- JWT tokens for admin authentication
- Tokens stored in localStorage
- Protected routes for admin panel
- Auto-logout on token expiry

## Chatbot Integration (Future)
- Placeholder API endpoints ready for OpenAI integration
- `POST /api/chatbot/message` - Send message to AI
- Environment variables for OpenAI API key

## Data Migration
- Create seed script to populate MongoDB with current mock data
- Ensure smooth transition from mock to live data

## Error Handling
- Consistent error response format
- Frontend fallback to cached data on API failure
- Loading states for all data fetching

## Security Considerations
- Input validation and sanitization
- Rate limiting on contact form
- CORS configuration
- Password hashing for admin accounts
- JWT secret management