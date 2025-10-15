import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
    changePassword: (data) => api.post('/auth/change-password', data)
};

export const adminAPI = {
    getDashboardStats: () => api.get('/admin/dashboard'),
    addUser: (data) => api.post('/admin/users', data),
    addStore: (data) => api.post('/admin/stores', data),  // Add this line
    getStores: (params) => api.get('/admin/stores', { params }),
    getUsers: (params) => api.get('/admin/users', { params }),
    getUserDetails: (id) => api.get(`/admin/users/${id}`)
};

export const userAPI = {
    getStores: (params) => api.get('/user/stores', { params }),
    submitRating: (data) => api.post('/user/ratings', data)
};

export const storeAPI = {
    getDashboard: () => api.get('/store/dashboard')
};

export default api;
