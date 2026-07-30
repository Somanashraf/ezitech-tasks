import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useAdmin } from '../admin/context/AdminContext'

export default function ContactPage() {
  const { addBooking } = useAdmin()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', destination: '', travelDate: '', travelers: '1', message: '' })
  const [status, setStatus] = useState('idle')
  const [createdBookingId, setCreatedBookingId] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.fullName || !form.email) return
    setStatus('sending')
    setTimeout(() => {
      const created = addBooking(form)
      setCreatedBookingId(created.id)
      setStatus('sent')
      setForm({ fullName: '', email: '', phone: '', destination: '', travelDate: '', travelers: '1', message: '' })
    }, 1200)
  }

  const iconStyle = { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }
  const inputStyle = { paddingLeft: '44px', borderRadius: '10px', border: '2px solid #E2E8F0', height: '52px' }

  return (
    <>
      <PageHero
        image="/images/hero-destinations.jpg"
        breadcrumb="Contact & Booking"
        title={<>Get In <span style={{ color: '#0EA5E9' }}>Touch</span></>}
        subtitle="Book your dream tour or send us a message — our travel experts are ready to assist you."
      />

      <section className="py-5" aria-label="Contact information and form">
        <div className="container">
          <div className="row g-5 align-items-start">

            {/* LEFT: Contact Info */}
            <div className="col-lg-5 reveal-left">
              <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: '24px', padding: '48px', color: 'white', height: '100%' }}>
                <span className="section-label mb-3 d-inline-block"><i className="fas fa-map-marker-alt me-2"></i>Contact Info</span>
                <h2 style={{ color: 'white', fontFamily: "'Playfair Display',serif", fontSize: '2rem', marginBottom: '12px' }}>
                  Let's Start Your <span style={{ color: '#0EA5E9' }}>Journey</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '36px', lineHeight: 1.8 }}>
                  Our friendly team of travel experts is available to answer all your questions and help design the perfect trip for you.
                </p>
                {[
                  { bg: 'rgba(14,165,233,0.2)',  icon: 'fa-map-marker-alt', iconColor: '#0EA5E9', title: 'Our Office',      lines: ['54 MM Alam Road, Gulberg III', 'Lahore, Punjab 54000, Pakistan'] },
                  { bg: 'rgba(20,184,166,0.2)',  icon: 'fa-phone-alt',      iconColor: '#14B8A6', title: 'Phone',           lines: ['+92 300 123 4567', '+92 42 3567 8901'] },
                  { bg: 'rgba(245,158,11,0.2)',  icon: 'fa-envelope',       iconColor: '#F59E0B', title: 'Email',           lines: ['hello@wanderlux.com'] },
                  { bg: 'rgba(139,92,246,0.2)',  icon: 'fa-clock',          iconColor: '#8B5CF6', title: 'Business Hours',  lines: ['Mon–Sat: 9am–8pm PKT', 'Sunday: 11am–5pm PKT'] },
                ].map((item, i) => (
                  <div key={i} className="d-flex align-items-start gap-4 mb-4">
                    <div style={{ width: '50px', height: '50px', background: item.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fas ${item.icon}`} style={{ color: item.iconColor, fontSize: '1.1rem' }}></i>
                    </div>
                    <div>
                      <h6 style={{ color: 'white', marginBottom: '4px' }}>{item.title}</h6>
                      <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
                        {item.lines.map((line, j) => <span key={j}>{line}{j < item.lines.length - 1 && <br />}</span>)}
                      </p>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '28px' }}>
                  <h6 style={{ color: 'white', marginBottom: '16px' }}>Follow Us</h6>
                  <div className="d-flex gap-3">
                    {[['fab fa-facebook-f','Facebook'],['fab fa-instagram','Instagram'],['fab fa-linkedin-in','LinkedIn'],['fab fa-youtube','YouTube'],['fab fa-x-twitter','X']].map(([icon, label]) => (
                      <a key={label} href="#" aria-label={label} style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <i className={icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="col-lg-7 reveal-right">
              <div style={{ background: 'white', borderRadius: '24px', padding: '48px', boxShadow: '0 4px 30px rgba(0,0,0,0.08)' }}>
                <span className="section-label mb-3 d-inline-block"><i className="fas fa-paper-plane me-2"></i>Send Message</span>
                <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '8px' }}>Plan Your <span>Dream Trip</span></h2>
                <p style={{ color: '#64748B', marginBottom: '32px' }}>Fill in the form below and one of our travel consultants will be in touch within 24 hours.</p>

                {status === 'sent' && createdBookingId && (
                  <div className="alert alert-success p-4 mb-4" style={{ borderRadius: '14px', borderLeft: '5px solid #10B981' }}>
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ fontSize: '2rem', color: '#10B981' }}><i className="fas fa-check-circle"></i></div>
                      <div>
                        <h5 className="mb-1" style={{ color: '#065F46', fontWeight: 700 }}>Booking Request Submitted Successfully!</h5>
                        <p className="mb-1" style={{ color: '#047857', fontSize: '0.92rem' }}>
                          Your Booking Reference ID is: <strong>{createdBookingId}</strong>
                        </p>
                        <small style={{ color: '#065F46' }}>
                          Our staff has received your details in the Admin Portal. We will contact you shortly!
                        </small>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group-custom">
                        <label>Full Name <span style={{ color: '#0EA5E9' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                          <i className="fas fa-user" style={iconStyle}></i>
                          <input type="text" name="fullName" className="form-control" placeholder="Ahmed Hassan" value={form.fullName} onChange={handleChange} required style={inputStyle} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-custom">
                        <label>Email Address <span style={{ color: '#0EA5E9' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                          <i className="fas fa-envelope" style={iconStyle}></i>
                          <input type="email" name="email" className="form-control" placeholder="you@example.com" value={form.email} onChange={handleChange} required style={inputStyle} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-custom">
                        <label>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                          <i className="fas fa-phone" style={iconStyle}></i>
                          <input type="tel" name="phone" className="form-control" placeholder="+92 300 000 0000" value={form.phone} onChange={handleChange} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-custom">
                        <label>Destination of Interest</label>
                        <div style={{ position: 'relative' }}>
                          <i className="fas fa-map-marker-alt" style={iconStyle}></i>
                          <input type="text" name="destination" className="form-control" placeholder="e.g. Maldives, Japan, Dubai..." value={form.destination} onChange={handleChange} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-custom">
                        <label>Preferred Travel Date</label>
                        <div style={{ position: 'relative' }}>
                          <i className="fas fa-calendar" style={iconStyle}></i>
                          <input type="date" name="travelDate" className="form-control" value={form.travelDate} onChange={handleChange} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-custom">
                        <label>Number of Travelers</label>
                        <div style={{ position: 'relative' }}>
                          <i className="fas fa-users" style={{ ...iconStyle, zIndex: 1 }}></i>
                          <select name="travelers" className="form-select" value={form.travelers} onChange={handleChange} style={inputStyle}>
                            <option value="1">1 Traveler</option>
                            <option value="2">2 Travelers</option>
                            <option value="3-5">3–5 Travelers</option>
                            <option value="6-10">6–10 Travelers</option>
                            <option value="10+">10+ Travelers</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group-custom">
                        <label>Your Message <span style={{ color: '#0EA5E9' }}>*</span></label>
                        <textarea name="message" className="form-control" rows="5" placeholder="Tell us about your dream trip – destination, travel style, budget, special requests..." value={form.message} onChange={handleChange} required style={{ borderRadius: '10px', border: '2px solid #E2E8F0', padding: '16px', resize: 'vertical' }}></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-primary-custom w-100 justify-content-center" style={{ padding: '16px', fontSize: '1rem' }} disabled={status === 'sending'}>
                        {status === 'sent'
                          ? <><i className="fas fa-check me-2"></i>Booking & Message Sent!</>
                          : status === 'sending'
                          ? <><i className="fas fa-spinner fa-spin me-2"></i>Submitting Booking to Admin...</>
                          : <><i className="fas fa-paper-plane me-2"></i>Submit Booking & Send Message</>}
                      </button>
                      <p className="text-center mt-3" style={{ color: '#64748B', fontSize: '0.88rem' }}>
                        <i className="fas fa-lock me-1"></i>Your booking is automatically registered in our Admin system.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-5 bg-alt">
        <div className="container">
          <div className="section-header center mb-4">
            <span className="section-label"><i className="fas fa-map me-2"></i>Find Us</span>
            <h2 className="section-title reveal">Our <span>Location</span></h2>
            <div className="section-divider"></div>
          </div>
          <div className="reveal" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.10)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.0!2d74.3436!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904a8c8b8b8b8%3A0x0!2sMM+Alam+Road%2C+Gulberg+III%2C+Lahore%2C+Punjab%2C+Pakistan!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
              width="100%" height="420"
              style={{ border: 0, display: 'block' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="WanderLux Office Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}
