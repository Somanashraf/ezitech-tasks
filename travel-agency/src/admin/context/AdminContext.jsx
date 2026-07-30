import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import {
  initialDestinations, initialCategories, initialTours,
  initialBookings, initialCustomers, initialActivityLogs
} from '../data/adminData'
import {
  getMonthlyRevenue, getMonthlyBookings,
  getPopularDestinations, getMonthlyVisitors
} from '../utils/analytics'

const AdminContext = createContext()

function createCustomerRecord(custData, bookingRecord) {
  const today = new Date().toISOString().split('T')[0]
  return {
    id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
    name: custData.name || 'New Traveler',
    email: custData.email || 'traveler@gmail.com',
    phone: custData.phone || '+92 300 000 0000',
    city: custData.city || custData.country || 'Pakistan',
    country: custData.country || 'Pakistan',
    passportNo: custData.passportNo || `PK${Math.floor(1000000 + Math.random() * 9000000)}`,
    passportExpiry: custData.passportExpiry || '2030-12-31',
    visaStatus: custData.visaStatus || 'Pending',
    documents: custData.documents || [],
    wishlist: custData.wishlist || [],
    notes: custData.notes || 'Inquired via website form.',
    bookingHistory: bookingRecord ? [bookingRecord] : [],
    paymentHistory: bookingRecord?.paidAmount > 0
      ? [{ bookingId: bookingRecord.bookingId, amount: bookingRecord.paidAmount, type: 'Payment', date: today, status: bookingRecord.paymentStatus }]
      : [],
    totalBookings: bookingRecord ? 1 : 0,
    totalSpent: bookingRecord?.amount || custData.totalAmount || 0
  }
}

export function AdminProvider({ children }) {
  // One-time migration: Check if localStorage has empty arrays and reset to initial data
  const migrateData = (key, initialData) => {
    const stored = localStorage.getItem(key)
    if (!stored || stored === '[]' || (stored && JSON.parse(stored).length === 0)) {
      localStorage.setItem(key, JSON.stringify(initialData))
      return initialData
    }
    return JSON.parse(stored)
  }

  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('wl_admin_auth') === 'true')
  const [destinations, setDestinations] = useState(() => migrateData('wl_destinations', initialDestinations))
  const [categories, setCategories] = useState(() => migrateData('wl_categories', initialCategories))
  const [tours, setTours] = useState(() => migrateData('wl_tours', initialTours))
  const [bookings, setBookings] = useState(() => { const s = localStorage.getItem('wl_bookings'); return s ? JSON.parse(s) : initialBookings })
  const [customers, setCustomers] = useState(() => { const s = localStorage.getItem('wl_customers'); return s ? JSON.parse(s) : initialCustomers })
  const [activityLogs, setActivityLogs] = useState(() => { const s = localStorage.getItem('wl_activity_logs'); return s ? JSON.parse(s) : initialActivityLogs })

  const loginAdmin = (email, password) => {
    if (email === 'admin@wanderlux.com' && password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('wl_admin_auth', 'true')
      logActivity('system', 'Admin user logged into portal')
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials. Please check your email and password.' }
  }

  const logoutAdmin = () => { setIsAuthenticated(false); localStorage.removeItem('wl_admin_auth') }

  const clearAllData = () => {
    setDestinations([]); setCategories([]); setTours([]); setBookings([]); setCustomers([])
    localStorage.removeItem('wl_destinations'); localStorage.removeItem('wl_categories')
    localStorage.removeItem('wl_tours'); localStorage.removeItem('wl_bookings'); localStorage.removeItem('wl_customers')
    setActivityLogs([{ id: Date.now(), type: 'system', text: 'All demo data cleared by Admin', time: 'Just now' }])
  }

  useEffect(() => { localStorage.setItem('wl_destinations', JSON.stringify(destinations)) }, [destinations])
  useEffect(() => { localStorage.setItem('wl_categories', JSON.stringify(categories)) }, [categories])
  useEffect(() => { localStorage.setItem('wl_tours', JSON.stringify(tours)) }, [tours])
  useEffect(() => { localStorage.setItem('wl_bookings', JSON.stringify(bookings)) }, [bookings])
  useEffect(() => { localStorage.setItem('wl_customers', JSON.stringify(customers)) }, [customers])
  useEffect(() => { localStorage.setItem('wl_activity_logs', JSON.stringify(activityLogs)) }, [activityLogs])

  const logActivity = (type, text) => {
    setActivityLogs(prev => [{ id: Date.now(), type, text, time: 'Just now' }, ...prev.slice(0, 49)])
  }

  // ── Tour CRUD ──
  const addTour = (newTour) => {
    const tour = { itinerary: '', faqs: [], categoryNames: [], ...newTour, id: `tour-${Date.now().toString().slice(-4)}`, status: newTour.status || 'Draft' }
    setTours(prev => [tour, ...prev])
    logActivity('tour', `Created new tour package: "${tour.title}"`)
  }
  const updateTour = (id, fields) => { setTours(prev => prev.map(t => t.id === id ? { ...t, ...fields } : t)); logActivity('tour', `Updated tour package parameters for ID ${id}`) }
  const deleteTour = (id) => { const t = tours.find(t => t.id === id); setTours(prev => prev.filter(t => t.id !== id)); logActivity('tour', `Deleted tour "${t?.title || id}"`) }
  const duplicateTour = (id) => {
    const target = tours.find(t => t.id === id); if (!target) return
    const dup = { ...target, id: `tour-${Date.now().toString().slice(-4)}`, title: `${target.title} (Copy)`, status: 'Draft' }
    setTours(prev => [dup, ...prev]); logActivity('tour', `Duplicated tour "${target.title}"`)
  }
  const setTourStatus = (id, status) => { setTours(prev => prev.map(t => { if (t.id === id) { logActivity('tour', `Changed status of "${t.title}" to ${status}`); return { ...t, status } } return t })) }
  const toggleTourStatus = (id) => { setTours(prev => prev.map(t => { if (t.id === id) { const next = t.status === 'Published' ? 'Draft' : 'Published'; logActivity('tour', `Changed status of "${t.title}" to ${next}`); return { ...t, status: next } } return t })) }
  const archiveTour = (id) => setTourStatus(id, 'Archived')

  // ── Destination CRUD ──
  const addDestination = (d) => { const dest = { ...d, id: `dest-${Date.now().toString().slice(-4)}`, toursCount: 0, status: 'Active' }; setDestinations(prev => [dest, ...prev]); logActivity('system', `Added destination "${dest.city}, ${dest.country}"`) }
  const updateDestination = (id, fields) => { setDestinations(prev => prev.map(d => d.id === id ? { ...d, ...fields } : d)); logActivity('system', `Updated destination details for ID ${id}`) }
  const deleteDestination = (id) => { setDestinations(prev => prev.filter(d => d.id !== id)); logActivity('system', `Removed destination entry ${id}`) }

  // ── Category CRUD ──
  const addCategory = (c) => { const cat = { ...c, id: `cat-${Date.now().toString().slice(-4)}`, toursCount: 0 }; setCategories(prev => [...prev, cat]); logActivity('system', `Added tour category "${cat.name}"`) }
  const updateCategory = (id, fields) => { setCategories(prev => prev.map(c => c.id === id ? { ...c, ...fields } : c)) }
  const deleteCategory = (id) => { setCategories(prev => prev.filter(c => c.id !== id)); logActivity('system', `Deleted category ${id}`) }

  // ── Booking lifecycle ──
  const updateBookingStatus = (id, status, paymentUpdates = {}) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== id) return b
      logActivity('booking', `Booking ${id} status updated to "${status}"`)
      const updated = { ...b, status, ...paymentUpdates }
      if (paymentUpdates.paymentStatus === 'Paid' || paymentUpdates.paidAmount) {
        setCustomers(cp => cp.map(c => {
          if (c.email?.toLowerCase() !== b.customerEmail?.toLowerCase()) return c
          const pe = { bookingId: id, amount: paymentUpdates.paidAmount || b.totalAmount, type: 'Payment', date: new Date().toISOString().split('T')[0], status: 'Paid' }
          const already = c.paymentHistory?.some(p => p.bookingId === id && p.type === 'Payment')
          return {
            ...c,
            totalSpent: (c.totalSpent || 0) + (already ? 0 : (paymentUpdates.paidAmount || b.totalAmount)),
            paymentHistory: already ? c.paymentHistory : [...(c.paymentHistory || []), pe],
            bookingHistory: (c.bookingHistory || []).map(bh => bh.bookingId === id ? { ...bh, status, paymentStatus: paymentUpdates.paymentStatus || bh.paymentStatus } : bh)
          }
        }))
      }
      return updated
    }))
  }

  const rejectBooking = (id, reason = 'Booking request rejected by admin') => {
    setBookings(prev => prev.map(b => b.id === id ? (logActivity('booking', `Booking ${id} rejected: ${reason}`), { ...b, status: 'Rejected', rejectionReason: reason, paymentStatus: 'Unpaid' }) : b))
  }

  const rescheduleBooking = (id, newDate) => {
    setBookings(prev => prev.map(b => b.id === id ? (logActivity('booking', `Booking ${id} rescheduled to ${newDate}`), { ...b, previousTravelDate: b.travelDate, travelDate: newDate, status: b.status === 'Pending' ? 'Pending' : 'Rescheduled' }) : b))
  }

  const processRefund = (id, refundAmount, reason = 'Customer refund processed') => {
    setBookings(prev => prev.map(b => {
      if (b.id !== id) return b
      const refunded = Math.min(refundAmount, b.paidAmount || 0)
      logActivity('booking', `Refund of $${refunded} processed for booking ${id}`)
      return { ...b, status: 'Cancelled', paymentStatus: 'Refunded', paidAmount: Math.max(0, (b.paidAmount || 0) - refunded), refundAmount: refunded, refundReason: reason, refundedAt: new Date().toISOString().split('T')[0] }
    }))
    const booking = bookings.find(b => b.id === id)
    if (booking) {
      setCustomers(prev => prev.map(c => {
        if (c.email?.toLowerCase() !== booking.customerEmail?.toLowerCase()) return c
        return {
          ...c,
          paymentHistory: [...(c.paymentHistory || []), { bookingId: id, amount: refundAmount, type: 'Refund', date: new Date().toISOString().split('T')[0], status: 'Refunded', reason }],
          totalSpent: Math.max(0, (c.totalSpent || 0) - refundAmount)
        }
      }))
    }
  }

  const assignGuide = (bookingId, guideName) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, assignedGuide: guideName } : b))
    logActivity('booking', `Assigned guide "${guideName}" to booking ${bookingId}`)
  }

  // ── Customer CRM ──
  const addCustomerNote = (customerId, noteText) => {
    setCustomers(prev => prev.map(c => {
      if (c.id !== customerId) return c
      logActivity('customer', `Added note to customer profile ${c.name}`)
      return { ...c, notes: c.notes ? `${c.notes}\n• ${noteText}` : `• ${noteText}` }
    }))
  }
  const updateCustomerVisaStatus = (customerId, visaStatus) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, visaStatus } : c))
    logActivity('customer', `Updated visa status for customer ${customerId}`)
  }
  const addCustomerDocument = (customerId, docName) => {
    const today = new Date().toISOString().split('T')[0]
    setCustomers(prev => prev.map(c => {
      if (c.id !== customerId) return c
      logActivity('customer', `Document "${docName}" added to ${c.name}`)
      return { ...c, documents: [...(c.documents || []), { name: docName, url: '#', uploadedAt: today }] }
    }))
  }

  const addCustomer = (custData, bookingRecord) => {
    setCustomers(prev => {
      const existing = prev.find(c => c.email?.toLowerCase() === custData.email?.toLowerCase())
      if (existing) {
        logActivity('customer', `Updated trip history for customer ${existing.name}`)
        return prev.map(c => c.id !== existing.id ? c : {
          ...c,
          totalBookings: (c.totalBookings || 0) + 1,
          totalSpent: (c.totalSpent || 0) + (bookingRecord?.amount || custData.totalAmount || 0),
          bookingHistory: bookingRecord ? [...(c.bookingHistory || []), bookingRecord] : c.bookingHistory,
          paymentHistory: bookingRecord?.paidAmount > 0
            ? [...(c.paymentHistory || []), { bookingId: bookingRecord.bookingId, amount: bookingRecord.paidAmount, type: 'Payment', date: bookingRecord.date, status: bookingRecord.paymentStatus }]
            : c.paymentHistory
        })
      }
      const newCust = createCustomerRecord(custData, bookingRecord)
      logActivity('customer', `Created new customer CRM profile for ${newCust.name}`)
      return [newCust, ...prev]
    })
  }

  const addBooking = (bookingData) => {
    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`
    const today = new Date().toISOString().split('T')[0]
    const totalAmount = Number(bookingData.totalAmount || 1299)
    const paidAmount = Number(bookingData.paidAmount || 0)
    const newBooking = {
      id: bookingId,
      customerName: bookingData.customerName || bookingData.fullName || 'Guest Traveler',
      customerEmail: bookingData.customerEmail || bookingData.email || 'traveler@gmail.com',
      customerPhone: bookingData.customerPhone || bookingData.phone || '+92 300 123 4567',
      tourTitle: bookingData.tourTitle || bookingData.destination || 'Custom Tour Experience',
      travelDate: bookingData.travelDate || today,
      bookingDate: today,
      travelersCount: Number(bookingData.travelersCount || bookingData.travelers || 1),
      totalAmount, paidAmount,
      paymentStatus: bookingData.paymentStatus || (paidAmount >= totalAmount ? 'Paid' : paidAmount > 0 ? 'Partial' : 'Unpaid'),
      status: 'Pending',
      assignedGuide: 'Unassigned',
      notes: bookingData.message || 'Booked via website contact form.'
    }
    setBookings(prev => [newBooking, ...prev])
    logActivity('booking', `New booking ${bookingId} submitted by ${newBooking.customerName}`)
    addCustomer(
      { name: newBooking.customerName, email: newBooking.customerEmail, phone: newBooking.customerPhone, city: bookingData.city, country: bookingData.country || 'Pakistan', totalAmount },
      { bookingId, tourTitle: newBooking.tourTitle, date: today, travelDate: newBooking.travelDate, amount: totalAmount, paidAmount, paymentStatus: newBooking.paymentStatus, status: 'Pending' }
    )
    return newBooking
  }

  const kpis = useMemo(() => ({
    totalRevenue: bookings.reduce((acc, b) => acc + (b.paidAmount || 0), 0),
    totalBookings: bookings.length,
    activeTours: tours.filter(t => t.status === 'Published').length,
    totalCustomers: customers.length,
    pendingBookings: bookings.filter(b => b.status === 'Pending').length,
    totalPayments: bookings.filter(b => (b.paidAmount || 0) > 0).length,
    pendingPayments: bookings.filter(b => b.paymentStatus === 'Unpaid' || b.paymentStatus === 'Partial').length,
    refundedPayments: bookings.filter(b => b.paymentStatus === 'Refunded').length
  }), [bookings, tours, customers])

  const dashboardAnalytics = useMemo(() => ({
    monthlyRevenue: getMonthlyRevenue(bookings),
    monthlyBookings: getMonthlyBookings(bookings),
    popularDestinations: getPopularDestinations(bookings, tours, destinations),
    monthlyVisitors: getMonthlyVisitors()
  }), [bookings, tours, destinations])

  return (
    <AdminContext.Provider value={{
      isAuthenticated, loginAdmin, logoutAdmin, clearAllData,
      destinations, categories, tours, bookings, customers, activityLogs,
      kpis, dashboardAnalytics,
      addTour, updateTour, deleteTour, duplicateTour, toggleTourStatus, setTourStatus, archiveTour,
      addDestination, updateDestination, deleteDestination,
      addCategory, updateCategory, deleteCategory,
      addBooking, addCustomer, updateBookingStatus, rejectBooking,
      rescheduleBooking, processRefund, assignGuide,
      addCustomerNote, updateCustomerVisaStatus, addCustomerDocument
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within an AdminProvider')
  return context
}
