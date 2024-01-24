import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { Login } from './pages/Login.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { ForgotPassword } from './pages/ForgotPassword.tsx'
import { SignUp } from './pages/SignUp.tsx'
import { Navbar } from './components/Navbar/Navbar.tsx'
import { ReactElement } from 'react'

/**
 * Creates a router for the application.
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={renderWithNavbar(<Home />)} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

const renderWithNavbar = (Component: ReactElement) => {
  return <>
    <Navbar p='1.3rem 3rem' maxW={'1280px'} m='0 auto'/>
    {Component}
  </>
}
