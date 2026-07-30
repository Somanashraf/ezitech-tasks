import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const handleNewsletter = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3500)
    }, 1800)
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="row g-5">
          {/* Brand */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-brand">
              <div className="brand-name">
                <div className="brand-icon"><i className="fas fa-globe-americas"></i></div>
                {' '}WanderLux
              </div>
              <p>
                Creating unforgettable travel experiences for adventurers, romantics, and explorers
                around the world since 2011.<br /><br />
                <i className="fas fa-map-marker-alt me-1" style={{ color: '#0EA5E9' }}></i>
                54 MM Alam Road, Gulberg III, Lahore, Pakistan<br />
                <i className="fas fa-phone me-1" style={{ color: '#0EA5E9' }}></i>
                +92 300 123 4567
              </p>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" aria-label="X"><i className="fab fa-x-twitter"></i></a>
            </div>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="footer-heading">Company</h5>
            <ul className="footer-links">
              <li><Link to="/about"><i className="fas fa-chevron-right"></i> About Us</Link></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Careers</a></li>
              <li><Link to="/blog"><i className="fas fa-chevron-right"></i> Blog</Link></li>
              <li><Link to="/contact"><i className="fas fa-chevron-right"></i> Contact</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="footer-heading">Destinations</h5>
            <ul className="footer-links">
              {['Dubai', 'Switzerland', 'Turkey', 'Bali', 'Maldives', 'Paris'].map(d => (
                <li key={d}>
                  <Link to="/destinations"><i className="fas fa-chevron-right"></i> {d}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/"><i className="fas fa-chevron-right"></i> Home</Link></li>
              <li><Link to="/packages"><i className="fas fa-chevron-right"></i> Packages</Link></li>
              <li><Link to="/gallery"><i className="fas fa-chevron-right"></i> Gallery</Link></li>
              <li><Link to="/testimonials"><i className="fas fa-chevron-right"></i> Testimonials</Link></li>
              <li><Link to="/faq"><i className="fas fa-chevron-right"></i> FAQ</Link></li>
            </ul>
          </div>

          {/* Support + Newsletter */}
          <div className="col-lg-3 col-md-5">
            <h5 className="footer-heading">Support</h5>
            <ul className="footer-links mb-4">
              <li><a href="#"><i className="fas fa-chevron-right"></i> Privacy Policy</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Terms &amp; Conditions</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Help Center</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Refund Policy</a></li>
            </ul>
            <h5 className="footer-heading mt-3">Newsletter</h5>
            <form className="d-flex gap-2" onSubmit={handleNewsletter}>
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.9)',
                }}
              />
              <button
                type="submit"
                className="btn"
                style={{ background: '#0EA5E9', color: 'white', borderRadius: '8px', padding: '8px 14px' }}
                disabled={status === 'sending'}
              >
                {status === 'sent'
                  ? <i className="fas fa-check"></i>
                  : status === 'sending'
                  ? <i className="fas fa-spinner fa-spin"></i>
                  : <i className="fas fa-paper-plane"></i>
                }
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <p>&copy; 2026 WanderLux Travel Agency. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <Link to="/admin/login" style={{ color: '#64748B', fontSize: '0.8rem', marginLeft: '12px' }}>
              <i className="fas fa-lock me-1"></i>Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
