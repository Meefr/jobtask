// src/services/auth.service.js
import axios from 'axios';

const API_URL = 'https://print.trendline.marketing/api';

class AuthService {
  // Initialize axios instance with default config
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add interceptor to handle token expiration
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && error.response?.data?.message === 'Token expired') {
          // Try to refresh token
          try {
            const newToken = await this.refreshToken();
            // Retry the original request with new token
            const config = error.config;
            config.headers['Authorization'] = `Bearer ${newToken}`;
            return this.api(config);
          } catch (refreshError) {
            // If refresh fails, logout user
            this.logout();
            throw refreshError;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Set JWT token in axios headers and localStorage
  setToken(token) {
    if (token) {
      localStorage.setItem('jwt_token', token);
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  // Remove JWT token
  removeToken() {
    localStorage.removeItem('jwt_token');
    delete this.api.defaults.headers.common['Authorization'];
  }

  // Get current JWT token
  getToken() {
    return localStorage.getItem('jwt_token');
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    // Optional: Add token expiration check here
    // const decodedToken = jwt_decode(token);
    // return decodedToken.exp > Date.now() / 1000;
    
    return true;
  }

  // Register new user
  async register(userData) {
    try {
      const response = await this.api.post('/register', userData);
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Login user
  async login(email, password) {
    try {
      const response = await this.api.post('/login', { email, password });
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Logout user
  logout() {
    this.removeToken();
    // Additional cleanup if needed
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await this.api.post('/refresh-token', {
        token: this.getToken()
      });
      const newToken = response.data.token;
      this.setToken(newToken);
      return newToken;
    } catch (error) {
      this.logout();
      throw this.handleError(error);
    }
  }

  // Error handler
  handleError(error) {
    if (error.response) {
      // Server responded with error
      return {
        status: error.response.status,
        message: error.response.data.message || 'An error occurred',
        errors: error.response.data.errors
      };
    } else if (error.request) {
      // Request made but no response
      return {
        status: 0,
        message: 'Network error'
      };
    } else {
      // Other errors
      return {
        status: 0,
        message: error.message
      };
    }
  }
}

export const authService = new AuthService();