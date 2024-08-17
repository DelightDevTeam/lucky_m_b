import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { AuthContextProvider } from '../contexts/AuthContext';

const Layout = () => {
  return (
    <>
    <AuthContextProvider>
      <div style={{overflowX:'hidden'}} className='container'>
        <Navbar/>
        <Outlet/>
          <Footer/>
      </div>
    </AuthContextProvider>
    </>
  )
}

export default Layout
