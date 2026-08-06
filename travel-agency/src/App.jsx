import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AdminProvider } from './admin/context/AdminContext'
import { AuthProvider } from './context/AuthContext'
import { trackPageVisit } from './admin/utils/analytics'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ScrollToTop from './components/ScrollToTop'

// Public Pages
import HomePage         from './pages/HomePage'
import AboutPage        from './pages/AboutPage'
import DestinationsPage from './pages/DestinationsPage'
import PackagesPage     from './pages/PackagesPage'
import GalleryPage      from './pages/GalleryPage'
import TestimonialsPage from './pages/TestimonialsPage'
import BlogPage         from './pages/BlogPage'
import FAQPage          from './pages/FAQPage'
import ContactPage      from './pages/ContactPage'
import LoginPage        from './pages/LoginPage'
import SignupPage       from './pages/SignupPage'

// Admin Portal
import AdminLayout          from './admin/components/AdminLayout'
import AdminLogin           from './admin/pages/AdminLogin'
import ProtectedRoute       from './admin/components/ProtectedRoute'
import DashboardOverview    from './admin/pages/DashboardOverview'
import TourManagement       from './admin/pages/TourManagement'
import DestinationManagement from './admin/pages/DestinationManagement'
import CategoryManagement   from './admin/pages/CategoryManagement'
import BookingManagement    from './admin/pages/BookingManagement'
import CustomerManagement   from './admin/pages/CustomerManagement'
import BlogManagement       from './admin/pages/BlogManagement'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isLoginRoute = location.pathname === '/login'
  const isSignupRoute = location.pathname === '/signup'

  useEffect(() => {
    if (!isAdminRoute) trackPageVisit()
  }, [location.pathname, isAdminRoute])

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && !isLoginRoute && !isSignupRoute && <Navbar />}

      <Routes>
        {/* ── Public Website Routes ── */}
        <Route path="/"             element={<HomePage />} />
        <Route path="/about"        element={<AboutPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/packages"     element={<PackagesPage />} />
        <Route path="/gallery"      element={<GalleryPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/blog"         element={<BlogPage />} />
        <Route path="/faq"          element={<FAQPage />} />
        <Route path="/contact"      element={<ContactPage />} />
        
        {/* ── Public Auth Routes ── */}
        <Route path="/login"        element={<LoginPage />} />
        <Route path="/signup"       element={<SignupPage />} />

        {/* ── Admin Login (unprotected) ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Admin Protected Routes ── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index           element={<DashboardOverview />} />
            <Route path="tours"        element={<TourManagement />} />
            <Route path="destinations" element={<DestinationManagement />} />
            <Route path="categories"   element={<CategoryManagement />} />
            <Route path="bookings"     element={<BookingManagement />} />
            <Route path="customers"    element={<CustomerManagement />} />
            <Route path="blogs"        element={<BlogManagement />} />
          </Route>
        </Route>
      </Routes>

      {!isAdminRoute && !isLoginRoute && !isSignupRoute && <Footer />}
      {!isAdminRoute && !isLoginRoute && !isSignupRoute && <BackToTop />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </AuthProvider>
  )
}
