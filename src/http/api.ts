/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useTokenStore from '@/store';
import { Book } from '@/types';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5513',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (data: { email: string; password: string }) =>
    api.post('/api/users/login', data);

export const register = async (data: { name: string; email: string; password: string }) =>
    api.post('/api/users/register', [data]);

export const getBooks = async () => api.get('/api/books');

// Fetch book data by ID
export const getBookById = async (id: string) => {
    const token = useTokenStore.getState().token;
    return api.get(`/api/books/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Create a new book
export const createBook = async (data: FormData) => {
    const token = useTokenStore.getState().token;
    return api.post('/api/books', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateBook = async (id: string, updatedData: Partial<Book>) => {
    const token = useTokenStore.getState().token;
    if (!token) {
        throw new Error('Token is missing. Please log in again.');
    }

    // Log updatedData to check for missing fields
    console.log('Updated Data:', updatedData);

    // Validate updatedData to ensure it contains necessary fields
    if (!updatedData.title || !updatedData.genre || !updatedData.author?.name) {
        throw new Error('Missing required fields for updating the book.');
    }

    try {
        const response = await api.patch(`/api/books/${id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Update Response:', response);
        return response;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        console.error('Response status:', error.response?.status);
        console.error('Response headers:', error.response?.headers);
        throw error;
    }
};



// Delete a book
export const deleteBook = async (id: string, token: string) => {
    if (!token) {
        throw new Error('Token is missing. Please log in again.');
    }

    try {
        const response = await api.delete(`/api/books/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Delete Response:', response);
        return response;
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};


