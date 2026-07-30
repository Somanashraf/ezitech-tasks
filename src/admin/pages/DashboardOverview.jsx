import React from 'react'
import { useAdmin } from '../context/AdminContext'
import { Link } from 'react-router-dom'

function BarChart({ data, valueKey, color, formatValue }) {
  const max = Math.max(...data.map(d => d[valueKey]), 1)
  return (
    <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem 0 0' }}>
      {data.map(item => {
        const heightPercent = (item[valueKey] / max) * 100
        return (
          <div key={item.month + item.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ fontSize: '0.72rem', color: '#475569', marginBottom: '4px', fontWeight: 600 }}>{formatValue(item[valueKey])}</div>
            <div style={{ width: '100%', height: `${Math.max(heightPercent, 4)}%`, background: color, borderRadius: '6px 6px 0 0', transition: 'all 0.3s ease' }} title={`${item.month}: ${item[valueKey]}`} />
            <div style={{ fontSize: '0.82rem', color: '#334155', marginTop: '8px', fontWeight: 600 }}>{item.month}</div>
          </div>
        )
      })}
    </div>
  )
}

export default function DashboardOverview() {
  const { kpis, bookings, tours, activityLogs, dashboardAnalytics } = useAdmin()
  const { monthlyRevenue, monthlyBookings, popularDestinations, monthlyVisitors } = dashboardAnalytics

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>Executive Dashboard Overview</h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>Real-time business performance analytics, KPIs, and operational activity.</p>
        </div>
        <span className="badge-admin badge-approved"><i className="fas fa-sync-alt fa-spin me-1"></i> Live Data Feed</span>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        {[
          { title: 'Total Revenue', value: `$${kpis.totalRevenue.toLocaleString()}`, sub: 'From all collected payments', icon: 'fa-wallet', bg: '#E0F2FE', color: '#0EA5E9' },
          { title: 'Total Bookings', value: kpis.totalBookings, sub: `${kpis.pendingBookings} Pending Approval`, icon: 'fa-calendar-check', bg: '#CCFBF1', color: '#14B8A6' },
          { title: 'Active Tours', value: kpis.activeTours, sub: `Out of ${tours.length} total packages`, icon: 'fa-route', bg: '#FEF3C7', color: '#F59E0B' },
          { title: 'Total Customers', value: kpis.totalCustomers, sub: 'Registered CRM profiles', icon: 'fa-users', bg: '#F3E8FF', color: '#8B5CF6' },
          { title: 'Payments Received', value: kpis.totalPayments, sub: 'Bookings with payment collected', icon: 'fa-credit-card', bg: '#DCFCE7', color: '#16A34A' },
          { title: 'Pending Payments', value: kpis.pendingPayments, sub: 'Unpaid or partial bookings', icon: 'fa-hourglass-half', bg: '#FEF3C7', color: '#D97706' },
          { title: 'Refunded Payments', value: kpis.refundedPayments, sub: 'Processed refund transactions', icon: 'fa-undo', bg: '#FEE2E2', color: '#DC2626' },
        ].map((kpi, i) => (
          <div key={i} className={i < 4 ? 'col-xl-3 col-sm-6' : 'col-xl-4 col-sm-6'}>
            <div className="admin-card kpi-card">
              <div>
                <div className="kpi-title">{kpi.title}</div>
                <div className="kpi-value">{kpi.value}</div>
                <small style={{ color: '#64748B', fontSize: '0.8rem' }}>{kpi.sub}</small>
              </div>
              <div className="kpi-icon" style={{ background: kpi.bg, color: kpi.color }}><i className={`fas ${kpi.icon}`}></i></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="admin-card h-100">
            <h5 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', color: '#0F172A' }}><i className="fas fa-chart-line text-primary me-2"></i>Monthly Revenue ($)</h5>
            {monthlyRevenue.some(m => m.revenue > 0)
              ? <BarChart data={monthlyRevenue} valueKey="revenue" color="linear-gradient(180deg, #0EA5E9 0%, #BAE6FD 100%)" formatValue={v => `$${(v/1000).toFixed(1)}k`} />
              : <p className="text-muted text-center py-5 mb-0">No revenue data yet. Approve bookings with payments to populate this chart.</p>}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="admin-card h-100">
            <h5 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', color: '#0F172A' }}><i className="fas fa-chart-bar text-success me-2"></i>Monthly Bookings</h5>
            {monthlyBookings.some(m => m.count > 0)
              ? <BarChart data={monthlyBookings} valueKey="count" color="linear-gradient(180deg, #14B8A6 0%, #99F6E4 100%)" formatValue={v => v} />
              : <p className="text-muted text-center py-5 mb-0">No bookings yet. New orders from the website will appear here.</p>}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="admin-card h-100">
            <h5 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.2rem', color: '#0F172A' }}><i className="fas fa-fire text-danger me-2"></i>Popular Destinations</h5>
            {popularDestinations.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {popularDestinations.map(d => (
                  <div key={d.name}>
                    <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>{d.name}</span>
                      <span style={{ color: '#64748B', fontSize: '0.78rem' }}>{d.count} booking{d.count !== 1 ? 's' : ''}</span>
                    </div>
                    <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: `${d.percent}%`, height: '100%', background: '#0EA5E9', borderRadius: '10px' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-muted text-center py-4 mb-0">Add destinations and bookings to see popularity rankings.</p>}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="admin-card h-100">
            <h5 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', color: '#0F172A' }}><i className="fas fa-eye text-info me-2"></i>Monthly Website Visitors</h5>
            <BarChart data={monthlyVisitors} valueKey="visitors" color="linear-gradient(180deg, #8B5CF6 0%, #DDD6FE 100%)" formatValue={v => v} />
            <small className="text-muted d-block mt-2">Tracked from public website page visits (localStorage).</small>
          </div>
        </div>
      </div>

      {/* Recent Activity & Bookings */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="admin-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', margin: 0, color: '#0F172A' }}><i className="fas fa-clock text-warning me-2"></i>Recent Booking Orders</h5>
              <Link to="/admin/bookings" style={{ color: '#0EA5E9', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>View All Bookings <i className="fas fa-arrow-right me-1"></i></Link>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead><tr><th>Booking ID</th><th>Customer</th><th>Tour Package</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  {bookings.length === 0
                    ? <tr><td colSpan="5" className="text-center py-4 text-muted">No bookings yet.</td></tr>
                    : bookings.slice(0, 4).map(b => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 700, color: '#0EA5E9' }}>{b.id}</td>
                        <td><div style={{ fontWeight: 600, color: '#0F172A' }}>{b.customerName}</div><small style={{ color: '#64748B' }}>{b.customerPhone}</small></td>
                        <td style={{ maxWidth: '200px' }} className="text-truncate">{b.tourTitle}</td>
                        <td style={{ fontWeight: 700, color: '#0F172A' }}>${b.totalAmount}</td>
                        <td><span className={`badge-admin badge-${b.status.toLowerCase()}`}>{b.status}</span></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="admin-card">
            <h5 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', color: '#0F172A' }}><i className="fas fa-stream text-info me-2"></i>Recent Activity</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {activityLogs.slice(0, 6).map(log => (
                <li key={log.id} style={{ padding: '0.65rem 0', borderBottom: '1px solid #F1F5F9', fontSize: '0.85rem' }}>
                  <div style={{ color: '#1E293B', marginBottom: '2px', fontWeight: 500 }}>{log.text}</div>
                  <small style={{ color: '#64748B' }}><i className="far fa-clock me-1"></i>{log.time}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
