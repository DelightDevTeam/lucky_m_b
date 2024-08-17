import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
 import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/index.jsx'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
