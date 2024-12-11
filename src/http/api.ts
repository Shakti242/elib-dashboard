import useTokenStore from '@/store';
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

export const createBook = async (data: FormData) => {
    const token = useTokenStore.getState().token;
    return api.post('/api/books', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
    });
};

// Updated deleteBook function
export const deleteBook = async (id: string) => {
    const token = useTokenStore.getState().token;
    try {
        const response = await api.delete(`/api/books/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; // You can return the message or status here
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error; // Re-throwing error for further handling if needed
    }
};
