import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage";
import RegisterPage from "./pages/register";
import LoginForm from "./pages/login";
import DashboardLayout from "./layouts/DashboardLayout";
import BooksPage from "./pages/booksPage";


const router = createBrowserRouter([
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'home',
                element: <HomePage />,
            },
            {
                path: 'books',
                element: <BooksPage />,
            }
        ]
    },
    {
        path: '/login',
        element: <LoginForm />,
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
]);

export default router;