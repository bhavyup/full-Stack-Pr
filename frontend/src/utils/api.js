import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('admin_token');
      // Redirect to login if on admin page
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============================================================================
// PUBLIC API FUNCTIONS
// ============================================================================

export const publicApi = {
  // Profile
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Skills
  getSkills: async () => {
    const response = await api.get('/skills');
    return response.data;
  },

  // Projects
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Education
  getEducation: async () => {
    const response = await api.get('/education');
    return response.data;
  },

  // Experience
  getExperience: async () => {
    const response = await api.get('/experience');
    return response.data;
  },

  // Learning Journey
  getLearningJourney: async () => {
    const response = await api.get('/learning-journey');
    return response.data;
  },

  // Experiments
  getExperiments: async () => {
    const response = await api.get('/experiments');
    return response.data;
  },

  // Contact
  submitContactForm: async (formData) => {
    const response = await api.post('/contact', formData);
    return response.data;
  },
};

// ============================================================================
// ADMIN API FUNCTIONS
// ============================================================================

export const adminApi = {
  // Authentication
  login: async (credentials) => {
    const response = await api.post('/admin/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('admin_token', response.data.access_token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('admin_token');
  },

  verifyToken: async () => {
    const response = await api.get('/admin/verify');
    return response.data;
  },

  // Profile Management
  updateProfile: async (profileData) => {
    const response = await api.put('/admin/profile', profileData);
    return response.data;
  },

  // Skills Management
  updateSkills: async (category, skillsData) => {
    const response = await api.put(`/admin/skills/${category}`, skillsData);
    return response.data;
  },

  // Projects Management
  createProject: async (projectData) => {
    const response = await api.post('/admin/projects', projectData);
    return response.data;
  },

  updateProject: async (projectId, projectData) => {
    const response = await api.put(`/admin/projects/${projectId}`, projectData);
    return response.data;
  },

  deleteProject: async (projectId) => {
    const response = await api.delete(`/admin/projects/${projectId}`);
    return response.data;
  },

  // Education Management
  updateEducation: async (educationData) => {
    const response = await api.put('/admin/education', educationData);
    return response.data;
  },

  // Experience Management
  updateExperience: async (experienceData) => {
    const response = await api.put('/admin/experience', experienceData);
    return response.data;
  },

  // Messages Management
  getMessages: async () => {
    const response = await api.get('/admin/messages');
    return response.data;
  },

  markMessageRead: async (messageId) => {
    const response = await api.put(`/admin/messages/${messageId}/read`);
    return response.data;
  },

  deleteMessage: async (messageId) => {
    const response = await api.delete(`/admin/messages/${messageId}`);
    return response.data;
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const isAuthenticated = () => {
  return !!localStorage.getItem('admin_token');
};

export const handleApiError = (error, toast) => {
  console.error('API Error:', error);
  
  let message = 'An unexpected error occurred';
  
  if (error.response) {
    // Server responded with error status
    message = error.response.data?.message || error.response.data?.detail || `Server error: ${error.response.status}`;
  } else if (error.request) {
    // Request was made but no response received
    message = 'Network error - please check your connection';
  } else {
    // Something else happened
    message = error.message || 'Request failed';
  }
  
  if (toast) {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  }
  
  return message;
};

export default api;