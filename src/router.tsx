import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/login';
import HomePage from '@/pages/homePage';
import RegisterPage from './pages/register';
import DashboardLayout from './layouts/DashboardLayout';
import BooksPage from './pages/booksPage';
import AuthLayout from './layouts/AuthLayout';
import CreateBook from './pages/createBook';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard/home" />,
    },
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'home',
                element: <HomePage />,
            },
            {
                path: 'books',
                element: <BooksPage />,
            },
            {
                path: 'books/create',
                element: <CreateBook />,
            },
            // {
            //     path: 'books/edit/:id', // Dynamic route for editing books
            //     element: <EditBook bookId={''} />,   // Component for editing a book
            // },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
]);

export default router;
