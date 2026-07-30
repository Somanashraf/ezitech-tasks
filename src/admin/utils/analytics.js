const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parseBookingDate(booking) {
  const raw = booking.bookingDate || booking.travelDate
  if (!raw) return null
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? null : d
}

export function getMonthlyRevenue(bookings, months = 7) {
  const now = new Date()
  const result = []
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const month = d.getMonth()
    const year = d.getFullYear()
    const revenue = bookings
      .filter(b => { const bd = parseBookingDate(b); return bd && bd.getMonth() === month && bd.getFullYear() === year })
      .reduce((sum, b) => sum + (b.paidAmount || 0), 0)
    result.push({ month: MONTH_LABELS[month], revenue, year })
  }
  return result
}

export function getMonthlyBookings(bookings, months = 7) {
  const now = new Date()
  const result = []
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const month = d.getMonth()
    const year = d.getFullYear()
    const count = bookings.filter(b => { const bd = parseBookingDate(b); return bd && bd.getMonth() === month && bd.getFullYear() === year }).length
    result.push({ month: MONTH_LABELS[month], count, year })
  }
  return result
}

export function getPopularDestinations(bookings, tours, destinations) {
  const counts = {}
  bookings.forEach(b => {
    const tour = tours.find(t => t.title === b.tourTitle)
    const destName = tour?.destinationName || b.tourTitle
    counts[destName] = (counts[destName] || 0) + 1
  })
  if (Object.keys(counts).length === 0 && destinations.length > 0) {
    destinations.forEach(d => {
      const name = `${d.city}, ${d.country}`
      const linked = tours.filter(t => t.destinationId === d.id).length
      counts[name] = linked
    })
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const max = sorted[0]?.[1] || 1
  return sorted.map(([name, count]) => ({ name, count, percent: Math.round((count / max) * 100) }))
}

export function getMonthlyVisitors(months = 7) {
  const stored = JSON.parse(localStorage.getItem('wl_monthly_visitors') || '{}')
  const now = new Date()
  const result = []
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    result.push({ month: MONTH_LABELS[d.getMonth()], visitors: stored[key] || 0, year: d.getFullYear() })
  }
  return result
}

export function trackPageVisit() {
  const now = new Date()
  const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const stored = JSON.parse(localStorage.getItem('wl_monthly_visitors') || '{}')
  stored[key] = (stored[key] || 0) + 1
  localStorage.setItem('wl_monthly_visitors', JSON.stringify(stored))
}
