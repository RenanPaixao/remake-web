import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { Login } from './pages/Login.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { ForgotPassword } from './pages/ForgotPassword.tsx'
import { SignUp } from './pages/SignUp.tsx'
import { Navbar } from './components/Navbar/Navbar.tsx'
import { RouteGuard } from './components/RouteGuard'
import { FAQPage } from './pages/FAQPage.tsx'
import { CollectPlaces } from './pages/CollectPlaces.tsx'
import { Account } from './pages/Account.tsx'

const navbarProps = {
  p: '1.3rem 3rem',
  maxW: '1280px',
  m: '0 auto'
}
/**
 * Creates a router for the application.
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(
          <RouteGuard.NeedsAuthentication>
            <Navbar {...navbarProps}/>
            <Home/>
          </RouteGuard.NeedsAuthentication>
        )} />
        <Route path="/login" element={
          <RouteGuard.RedirectsAuthenticated>
            <Login />
          </RouteGuard.RedirectsAuthenticated>
        } />
        <Route path="/forgot-password" element={
          <RouteGuard.RedirectsAuthenticated>
            <ForgotPassword />
          </RouteGuard.RedirectsAuthenticated>
        } />
        <Route path="/sign-up" element={
          <RouteGuard.RedirectsAuthenticated>
            <SignUp />
          </RouteGuard.RedirectsAuthenticated>
        } />
        <Route path="/faq" element={
          <RouteGuard.NeedsAuthentication>
            <Navbar {...navbarProps}/>
            <FAQPage />
          </RouteGuard.NeedsAuthentication>
        } />
        <Route path="/collect-places" element={
          <RouteGuard.NeedsAuthentication>
            <Navbar {...navbarProps}/>
            <CollectPlaces />
          </RouteGuard.NeedsAuthentication>
        } />
        <Route path="/account" element={
          <RouteGuard.NeedsAuthentication>
            <Navbar {...navbarProps}/>
            <Account />
          </RouteGuard.NeedsAuthentication>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

