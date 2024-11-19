import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import React from "react";
import HomePage from "./pages/homePage";

const router = createBrowserRouter([
    {
        path:'/',
        element: <HomePage/>,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },

]);

export default router;