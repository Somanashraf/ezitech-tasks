import React, { useState } from 'react'
import { useAdmin } from '../context/AdminContext'

function getDocLabel(doc) { return typeof doc === 'string' ? doc : doc.name }

export default function CustomerManagement() {
  const { customers, bookings, addCustomerNote, updateCustomerVisaStatus, addCustomerDocument } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCustomer, setActiveCustomer] = useState(null)
  const [newNoteInput, setNewNoteInput] = useState('')
  const [newDocInput, setNewDocInput] = useState('')
  const [visaStatusInput, setVisaStatusInput] = useState('')

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCustomerBookings = (customer) => {
    if (customer.bookingHistory?.length) return customer.bookingHistory
    return bookings
      .filter(b => b.customerEmail?.toLowerCase() === customer.email?.toLowerCase())
      .map(b => ({ bookingId: b.id, tourTitle: b.tourTitle, date: b.bookingDate || b.travelDate, travelDate: b.travelDate, amount: b.totalAmount, paidAmount: b.paidAmount, status: b.status, paymentStatus: b.paymentStatus }))
  }

  const openProfile = (customer) => { setActiveCustomer(customer); setVisaStatusInput(customer.visaStatus || 'Pending') }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (activeCustomer && newNoteInput) {
      addCustomerNote(activeCustomer.id, newNoteInput)
      setActiveCustomer({ ...activeCustomer, notes: activeCustomer.notes ? `${activeCustomer.notes}\n• ${newNoteInput}` : `• ${newNoteInput}` })
      setNewNoteInput('')
    }
  }

  const handleAddDocument = (e) => {
    e.preventDefault()
    if (activeCustomer && newDocInput) {
      addCustomerDocument(activeCustomer.id, newDocInput)
      const doc = { name: newDocInput, url: '#', uploadedAt: new Date().toISOString().split('T')[0] }
      setActiveCustomer({ ...activeCustomer, documents: [...(activeCustomer.documents || []), doc] })
      setNewDocInput('')
    }
  }

  const handleVisaUpdate = () => {
    if (activeCustomer) { updateCustomerVisaStatus(activeCustomer.id, visaStatusInput); setActiveCustomer({ ...activeCustomer, visaStatus: visaStatusInput }) }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Customer Profiles & CRM System</h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>Review travel history, passport/visa records, payments, documents, wishlist, and staff notes.</p>
        </div>
      </div>

      <div className="admin-card mb-4" style={{ padding: '1rem 1.25rem' }}>
        <div className="admin-search-wrap" style={{ width: '100%' }}>
          <i className="fas fa-search"></i>
          <input type="text" className="admin-search-input" style={{ width: '100%' }} placeholder="Search customer name, email, or city..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="admin-card p-0 overflow-hidden">
        <div className="table-responsive">
          <table className="admin-table">
            <thead><tr><th>Customer Name</th><th>Contact</th><th>Location</th><th>Passport</th><th>Visa Status</th><th>Total Spent</th><th className="text-end">Action</th></tr></thead>
            <tbody>
              {filteredCustomers.length === 0
                ? <tr><td colSpan="7" className="text-center py-4 text-muted">No customer profiles found.</td></tr>
                : filteredCustomers.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="admin-avatar" style={{ background: '#14B8A6' }}>{c.name.split(' ').map(n => n[0]).join('')}</div>
                        <div><div style={{ fontWeight: 600, color: '#0F172A' }}>{c.name}</div><small style={{ color: '#64748B' }}>ID: {c.id}</small></div>
                      </div>
                    </td>
                    <td><div style={{ fontWeight: 500 }}>{c.email}</div><small style={{ color: '#64748B' }}>{c.phone}</small></td>
                    <td>{c.city || c.country}</td>
                    <td><code style={{ color: '#0EA5E9', fontWeight: 600 }}>{c.passportNo || c.passportNumber || '—'}</code><small style={{ color: '#64748B', display: 'block' }}>Exp: {c.passportExpiry || '—'}</small></td>
                    <td><span className="badge bg-secondary" style={{ fontSize: '0.75rem' }}>{c.visaStatus || 'Pending'}</span></td>
                    <td style={{ fontWeight: 700, color: '#16A34A' }}>${c.totalSpent || 0}</td>
                    <td className="text-end"><button className="btn btn-sm btn-outline-info" onClick={() => openProfile(c)}><i className="fas fa-folder-open me-1"></i> Full Profile</button></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeCustomer && (
        <div className="modal modal-admin d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex align-items-center gap-3">
                  <div className="admin-avatar" style={{ width: '44px', height: '44px', fontSize: '1.1rem', background: '#14B8A6' }}>{activeCustomer.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><h5 className="modal-title mb-0">{activeCustomer.name}</h5><small className="text-muted">{activeCustomer.email} • {activeCustomer.phone}</small></div>
                </div>
                <button type="button" className="btn-close" onClick={() => setActiveCustomer(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <h6 className="text-primary mb-2"><i className="fas fa-passport me-2"></i>Passport & Visa</h6>
                      <div style={{ fontSize: '0.88rem' }}><strong>Passport #:</strong> {activeCustomer.passportNo || activeCustomer.passportNumber || '—'}</div>
                      <div style={{ fontSize: '0.88rem' }}><strong>Expiry:</strong> {activeCustomer.passportExpiry || '—'}</div>
                      <div style={{ fontSize: '0.88rem' }}><strong>City:</strong> {activeCustomer.city || activeCustomer.country}</div>
                      <div className="mt-2 d-flex gap-2 align-items-center">
                        <select className="form-select form-select-sm" value={visaStatusInput} onChange={e => setVisaStatusInput(e.target.value)}>
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="In Review">In Review</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Not Required">Not Required</option>
                        </select>
                        <button type="button" className="btn btn-sm text-white" style={{ background: '#0EA5E9' }} onClick={handleVisaUpdate}>Update Visa</button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <h6 className="text-info mb-2"><i className="fas fa-folder me-2"></i>Uploaded Documents</h6>
                      <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.85rem' }}>
                        {(activeCustomer.documents || []).length === 0
                          ? <li className="text-muted">No documents uploaded</li>
                          : activeCustomer.documents.map((doc, i) => <li key={i}><i className="fas fa-file-pdf text-danger me-1"></i>{getDocLabel(doc)}</li>)}
                      </ul>
                      <form onSubmit={handleAddDocument} className="d-flex gap-2 mt-2">
                        <input type="text" className="form-control form-control-sm" placeholder="Document name..." value={newDocInput} onChange={e => setNewDocInput(e.target.value)} />
                        <button type="submit" className="btn btn-sm btn-outline-primary">Add</button>
                      </form>
                      <hr />
                      <h6 className="text-warning mb-1" style={{ fontSize: '0.85rem' }}><i className="fas fa-heart me-1"></i>Wishlist</h6>
                      <div style={{ fontSize: '0.82rem', color: '#475569' }}>{activeCustomer.wishlist?.join(', ') || 'No wishlist items'}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h6 className="mb-2"><i className="fas fa-history me-2"></i>Travel / Booking History</h6>
                    <div className="table-responsive">
                      <table className="admin-table" style={{ fontSize: '0.82rem' }}>
                        <thead><tr><th>ID</th><th>Package</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
                        <tbody>
                          {getCustomerBookings(activeCustomer).length === 0
                            ? <tr><td colSpan="5" className="text-muted text-center">No bookings yet</td></tr>
                            : getCustomerBookings(activeCustomer).map((b, i) => (
                              <tr key={b.bookingId || i}>
                                <td>{b.bookingId}</td><td>{b.tourTitle}</td><td>{b.travelDate || b.date}</td><td>${b.amount}</td>
                                <td><span className={`badge-admin badge-${(b.status || 'pending').toLowerCase()}`}>{b.status}</span></td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h6 className="mb-2"><i className="fas fa-credit-card me-2"></i>Payment History</h6>
                    <div className="table-responsive">
                      <table className="admin-table" style={{ fontSize: '0.82rem' }}>
                        <thead><tr><th>Booking</th><th>Type</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                        <tbody>
                          {(activeCustomer.paymentHistory || []).length === 0
                            ? <tr><td colSpan="5" className="text-muted text-center">No payment records</td></tr>
                            : activeCustomer.paymentHistory.map((p, i) => <tr key={i}><td>{p.bookingId}</td><td>{p.type}</td><td>${p.amount}</td><td>{p.date}</td><td>{p.status}</td></tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-12">
                    <h6 className="mb-2"><i className="fas fa-sticky-note text-warning me-2"></i>Internal Staff Notes</h6>
                    <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', fontSize: '0.88rem', whiteSpace: 'pre-line', border: '1px solid #E2E8F0' }} className="mb-3">
                      {activeCustomer.notes || 'No internal notes recorded yet.'}
                    </div>
                    <form onSubmit={handleAddNote} className="d-flex gap-2">
                      <input type="text" className="form-control" placeholder="Add new internal note..." value={newNoteInput} onChange={e => setNewNoteInput(e.target.value)} />
                      <button type="submit" className="btn text-white px-3" style={{ background: '#0EA5E9' }}>Add Note</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveCustomer(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
