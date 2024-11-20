/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
      
  </React.StrictMode>,
)
