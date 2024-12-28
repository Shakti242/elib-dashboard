/* eslint-disable @typescript-eslint/no-explicit-any */
import useTokenStore from '@/store';
import axios, { InternalAxiosRequestConfig } from 'axios';

// Axios instance configuration
const api = axios.create({
    baseURL: 'https://elib-production.up.railway.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach Authorization token to every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useTokenStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
});

// ✅ LOGIN
export const login = async (data: { email: string; password: string }) => {
    try {
        const response = await api.post('/api/users/login', data);
        console.log('Login Response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Login Error:', error.response?.data || error.message);
        throw error;
    }
};

// ✅ REGISTER
export const register = async (data: { name: string; email: string; password: string }) => {
    try {
        const response = await api.post('/api/users/register', data);
        console.log('Register Response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Register Error:', error.response?.data || error.message);
        throw error;
    }
};

// ✅ GET BOOKS
export const getBooks = async () => {
    try {
        const response = await api.get('/api/books');
        console.log('Books Data:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Get Books Error:', error.response?.data || error.message);
        throw error;
    }
};

// ✅ CREATE BOOK
export const createBook = async (data: FormData) => {
    try {
        const token = useTokenStore.getState().token;
        const response = await api.post('/api/books', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Book Created:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Create Book Error:', error.response?.data || error.message);
        throw error;
    }
};

// ✅ DELETE BOOK
export const deleteBook = async (id: string) => {
    try {
        const token = useTokenStore.getState().token;
        const response = await api.delete(`/api/books/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Book Deleted:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Delete Book Error:', error.response?.data || error.message);
        throw error;
    }
};
