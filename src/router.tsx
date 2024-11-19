import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import React from "react";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },

]);