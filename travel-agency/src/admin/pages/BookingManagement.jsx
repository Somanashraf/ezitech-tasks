import React, { useState } from 'react'
import { useAdmin } from '../context/AdminContext'

export default function BookingManagement() {
  const { bookings, updateBookingStatus, rejectBooking, rescheduleBooking, processRefund, assignGuide } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [activeInvoice, setActiveInvoice] = useState(null)
  const [guideModalBooking, setGuideModalBooking] = useState(null)
  const [guideInput, setGuideInput] = useState('')
  const [rejectModal, setRejectModal] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [rescheduleModal, setRescheduleModal] = useState(null)
  const [newTravelDate, setNewTravelDate] = useState('')
  const [refundModal, setRefundModal] = useState(null)
  const [refundAmount, setRefundAmount] = useState('')
  const [refundReason, setRefundReason] = useState('')

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.id.toLowerCase().includes(searchTerm.toLowerCase()) || b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || b.tourTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleGuideSubmit = (e) => { e.preventDefault(); if (guideModalBooking && guideInput) { assignGuide(guideModalBooking.id, guideInput); setGuideModalBooking(null); setGuideInput('') } }
  const handleReject = (e) => { e.preventDefault(); if (rejectModal) { rejectBooking(rejectModal.id, rejectReason || 'Booking rejected by admin'); setRejectModal(null); setRejectReason('') } }
  const handleReschedule = (e) => { e.preventDefault(); if (rescheduleModal && newTravelDate) { rescheduleBooking(rescheduleModal.id, newTravelDate); setRescheduleModal(null); setNewTravelDate('') } }
  const handleRefund = (e) => { e.preventDefault(); if (refundModal) { processRefund(refundModal.id, Number(refundAmount) || refundModal.paidAmount, refundReason); setRefundModal(null); setRefundAmount(''); setRefundReason('') } }
  const openRefundModal = (b) => { setRefundModal(b); setRefundAmount(String(b.paidAmount || b.totalAmount)); setRefundReason('Customer requested cancellation refund') }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Booking Lifecycle & Orders</h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>Approve, reject, reschedule, process refunds, assign guides, and generate invoices.</p>
        </div>
      </div>

      <div className="admin-card mb-4" style={{ padding: '1rem 1.25rem' }}>
        <div className="row g-3 align-items-center">
          <div className="col-md-6">
            <div className="admin-search-wrap" style={{ width: '100%' }}>
              <i className="fas fa-search"></i>
              <input type="text" className="admin-search-input" style={{ width: '100%' }} placeholder="Search by Booking ID, customer name, or package..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <select className="form-select bg-light text-dark" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="All">All Booking Lifecycles</option>
              <option value="Pending">Pending Approval</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Rescheduled">Rescheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="Cancelled">Cancelled / Refunded</option>
            </select>
          </div>
        </div>
      </div>

      <div className="admin-card p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr><th>Booking ID</th><th>Customer Info</th><th>Tour Package</th><th>Travel Date</th><th>Total / Paid</th><th>Status</th><th>Guide</th><th className="text-end">Actions</th></tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-4 text-muted">No bookings found matching your search criteria.</td></tr>
              ) : filteredBookings.map(b => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 700, color: '#0EA5E9' }}>{b.id}</td>
                  <td><div style={{ fontWeight: 600, color: '#0F172A' }}>{b.customerName}</div><small style={{ color: '#64748B' }}>{b.customerPhone}</small></td>
                  <td style={{ maxWidth: '180px' }} className="text-truncate" title={b.tourTitle}>{b.tourTitle}</td>
                  <td>{b.travelDate}{b.previousTravelDate && <small className="d-block text-muted" style={{ fontSize: '0.72rem' }}>Was: {b.previousTravelDate}</small>}</td>
                  <td><div style={{ fontWeight: 700, color: '#0F172A' }}>${b.totalAmount}</div><small style={{ color: b.paidAmount >= b.totalAmount ? '#16A34A' : '#D97706', fontWeight: 600 }}>Paid: ${b.paidAmount || 0}</small></td>
                  <td><span className={`badge-admin badge-${b.status.toLowerCase()}`}>{b.status}</span>{b.paymentStatus && <small className="d-block text-muted" style={{ fontSize: '0.72rem' }}>{b.paymentStatus}</small>}</td>
                  <td>
                    {b.assignedGuide && b.assignedGuide !== 'Unassigned'
                      ? <span className="badge bg-secondary" style={{ fontSize: '0.78rem' }}><i className="fas fa-user-tie me-1"></i>{b.assignedGuide}</span>
                      : <button className="btn btn-sm btn-outline-secondary" style={{ fontSize: '0.72rem' }} onClick={() => { setGuideModalBooking(b); setGuideInput('') }}>+ Assign Guide</button>}
                  </td>
                  <td className="text-end">
                    <div className="d-flex flex-wrap gap-1 justify-content-end">
                      {b.status === 'Pending' && (<>
                        <button className="btn btn-sm btn-success" title="Approve" onClick={() => updateBookingStatus(b.id, 'Approved', { paymentStatus: 'Paid', paidAmount: b.totalAmount })}><i className="fas fa-check"></i></button>
                        <button className="btn btn-sm btn-danger" title="Reject" onClick={() => setRejectModal(b)}><i className="fas fa-ban"></i></button>
                      </>)}
                      {['Approved', 'Rescheduled'].includes(b.status) && (<>
                        <button className="btn btn-sm btn-info text-white" title="Reschedule" onClick={() => { setRescheduleModal(b); setNewTravelDate(b.travelDate) }}><i className="fas fa-calendar-alt"></i></button>
                        <button className="btn btn-sm btn-outline-success" title="Complete" onClick={() => updateBookingStatus(b.id, 'Completed')}><i className="fas fa-flag-checkered"></i></button>
                      </>)}
                      {b.status !== 'Cancelled' && b.status !== 'Rejected' && (b.paidAmount || 0) > 0 && (
                        <button className="btn btn-sm btn-warning" title="Process Refund" onClick={() => openRefundModal(b)}><i className="fas fa-undo"></i></button>
                      )}
                      <button className="btn btn-sm btn-outline-primary" title="Invoice" onClick={() => setActiveInvoice(b)}><i className="fas fa-file-invoice"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div className="modal modal-admin d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Reject Booking {rejectModal.id}</h5><button type="button" className="btn-close" onClick={() => setRejectModal(null)}></button></div>
            <form onSubmit={handleReject}>
              <div className="modal-body"><label className="form-label">Rejection Reason</label><textarea className="form-control" rows="3" value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="e.g. Package unavailable on selected dates" /></div>
              <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setRejectModal(null)}>Cancel</button><button type="submit" className="btn btn-danger">Reject Booking</button></div>
            </form>
          </div></div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <div className="modal modal-admin d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Reschedule Booking {rescheduleModal.id}</h5><button type="button" className="btn-close" onClick={() => setRescheduleModal(null)}></button></div>
            <form onSubmit={handleReschedule}>
              <div className="modal-body"><p className="text-muted" style={{ fontSize: '0.88rem' }}>Current date: <strong>{rescheduleModal.travelDate}</strong></p><label className="form-label">New Travel Date</label><input type="date" className="form-control" required value={newTravelDate} onChange={e => setNewTravelDate(e.target.value)} /></div>
              <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setRescheduleModal(null)}>Cancel</button><button type="submit" className="btn text-white" style={{ background: '#0EA5E9' }}>Confirm Reschedule</button></div>
            </form>
          </div></div>
        </div>
      )}

      {/* Refund Modal */}
      {refundModal && (
        <div className="modal modal-admin d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Process Refund — {refundModal.id}</h5><button type="button" className="btn-close" onClick={() => setRefundModal(null)}></button></div>
            <form onSubmit={handleRefund}>
              <div className="modal-body">
                <p className="text-muted" style={{ fontSize: '0.88rem' }}>Amount paid: <strong>${refundModal.paidAmount || 0}</strong> of ${refundModal.totalAmount}</p>
                <div className="mb-3"><label className="form-label">Refund Amount ($)</label><input type="number" className="form-control" required min="0" max={refundModal.paidAmount || refundModal.totalAmount} value={refundAmount} onChange={e => setRefundAmount(e.target.value)} /></div>
                <div className="mb-3"><label className="form-label">Refund Reason</label><textarea className="form-control" rows="2" value={refundReason} onChange={e => setRefundReason(e.target.value)} /></div>
              </div>
              <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setRefundModal(null)}>Cancel</button><button type="submit" className="btn btn-warning">Process Refund</button></div>
            </form>
          </div></div>
        </div>
      )}

      {/* Assign Guide Modal */}
      {guideModalBooking && (
        <div className="modal modal-admin d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Assign Tour Guide ({guideModalBooking.id})</h5><button type="button" className="btn-close" onClick={() => setGuideModalBooking(null)}></button></div>
            <form onSubmit={handleGuideSubmit}>
              <div className="modal-body"><label className="form-label">Tour Guide Name</label><input type="text" className="form-control" required placeholder="e.g. Tariq Mahmood" value={guideInput} onChange={e => setGuideInput(e.target.value)} /></div>
              <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setGuideModalBooking(null)}>Cancel</button><button type="submit" className="btn text-white" style={{ background: '#0EA5E9' }}>Assign Guide</button></div>
            </form>
          </div></div>
        </div>
      )}

      {/* Invoice Modal */}
      {activeInvoice && (
        <div className="modal modal-admin d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content text-dark" style={{ background: '#FFFFFF', borderRadius: '14px', padding: '1rem' }}>
              <div className="modal-header border-bottom-0 pb-0">
                <div className="d-flex align-items-center gap-2">
                  <div style={{ width: '32px', height: '32px', background: '#0EA5E9', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-globe-americas"></i></div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#0F172A', margin: 0 }}>WanderLux Travel Agency</h4>
                </div>
                <button type="button" className="btn-close" onClick={() => setActiveInvoice(null)}></button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-between align-items-start mb-4 pb-3 border-bottom">
                  <div>
                    <h5 style={{ fontWeight: 700, color: '#0EA5E9', margin: 0 }}>OFFICIAL BOOKING INVOICE</h5>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>Invoice Ref: {activeInvoice.id}</div>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>Issued Date: {activeInvoice.bookingDate || new Date().toISOString().split('T')[0]}</div>
                  </div>
                  <span className={`badge-admin badge-${activeInvoice.status.toLowerCase()}`}>Status: {activeInvoice.status}</span>
                </div>
                <div className="row mb-4">
                  <div className="col-6">
                    <h6 style={{ fontWeight: 700, fontSize: '0.88rem' }}>CUSTOMER:</h6>
                    <div style={{ fontWeight: 600 }}>{activeInvoice.customerName}</div>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>{activeInvoice.customerEmail}</div>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>{activeInvoice.customerPhone}</div>
                  </div>
                  <div className="col-6 text-end">
                    <h6 style={{ fontWeight: 700, fontSize: '0.88rem' }}>TRAVEL DETAILS:</h6>
                    <div style={{ fontWeight: 600 }}>{activeInvoice.tourTitle}</div>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>Departure: {activeInvoice.travelDate}</div>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>Travelers: {activeInvoice.travelersCount}</div>
                  </div>
                </div>
                <table className="table table-bordered mb-3" style={{ fontSize: '0.9rem' }}>
                  <thead className="table-light"><tr><th>Description</th><th className="text-center">Travelers</th><th className="text-end">Rate</th><th className="text-end">Total</th></tr></thead>
                  <tbody>
                    <tr>
                      <td>{activeInvoice.tourTitle}</td>
                      <td className="text-center">{activeInvoice.travelersCount}</td>
                      <td className="text-end">${(activeInvoice.totalAmount / activeInvoice.travelersCount).toFixed(2)}</td>
                      <td className="text-end" style={{ fontWeight: 700 }}>${activeInvoice.totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-end">
                  <h5 style={{ fontWeight: 800, margin: 0 }}>Total Paid: ${activeInvoice.paidAmount || 0}</h5>
                  {activeInvoice.refundAmount > 0 && <p className="text-danger mb-0" style={{ fontSize: '0.85rem' }}>Refunded: ${activeInvoice.refundAmount}</p>}
                </div>
              </div>
              <div className="modal-footer border-top-0 pt-0">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveInvoice(null)}>Close</button>
                <button type="button" className="btn text-white" style={{ background: '#0EA5E9' }} onClick={() => window.print()}><i className="fas fa-print me-1"></i> Print / Save PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
