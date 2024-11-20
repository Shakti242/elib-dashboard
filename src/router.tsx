import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage";
import RegisterPage from "./pages/register";
import LoginForm from "./pages/login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
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