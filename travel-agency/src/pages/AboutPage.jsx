import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const coreValues = [
  { icon: 'fa-heart', title: 'Passion for Travel', desc: 'Every team member is a passionate traveler. We genuinely love what we do and share that enthusiasm with every client.' },
  { icon: 'fa-handshake', title: 'Integrity & Trust', desc: 'We operate with complete transparency. No hidden fees, no surprises – just honest, reliable service you can count on.' },
  { icon: 'fa-star', title: 'Excellence', desc: 'We never settle for ordinary. From accommodation to activities, we ensure every aspect of your trip exceeds expectations.' },
  { icon: 'fa-leaf', title: 'Sustainability', desc: "We're committed to responsible tourism that protects the environment and respects local cultures and communities." },
  { icon: 'fa-users', title: 'Customer First', desc: 'Our clients are at the heart of everything we do. Your satisfaction and safety are our top priorities, always.' },
  { icon: 'fa-lightbulb', title: 'Innovation', desc: 'We continuously improve our services, embrace new technology, and find creative ways to enhance your travel experience.' },
]

const team = [
  { img: 'team-ahmed.jpg', name: 'Ahmed Khan', role: 'Co-Founder & CEO', bio: "With 20+ years in travel, Ahmed's vision turned WanderLux into Pakistan's most trusted international travel agency." },
  { img: 'team-sara.jpg', name: 'Sara Khan', role: 'Co-Founder & COO', bio: 'Sara oversees all operations from Lahore headquarters, ensuring every Pakistani traveler gets a world-class experience.' },
  { img: 'team-hamza.jpg', name: 'Hamza Siddiqui', role: 'Head of Tour Design', bio: 'Hamza crafts bespoke itineraries for Pakistani travelers with extraordinary attention to detail and global expertise.' },
  { img: 'team-mariam.jpg', name: 'Mariam Iqbal', role: 'Customer Experience Manager', bio: 'Mariam leads our support team, ensuring every Pakistani traveler feels valued and taken care of from booking to return.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/hero-about.jpg"
        breadcrumb="About Us"
        title={<>About Our <span style={{ color: '#0EA5E9' }}>Travel Agency</span></>}
        subtitle="Creating unforgettable travel experiences for travelers around the world for over 15 years."
      />

      {/* ── OUR STORY ── */}
      <section className="py-5 bg-alt" aria-label="Our story">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 reveal-left">
              <span className="section-label"><i className="fas fa-book-open me-2"></i>Our Story</span>
              <h2 className="section-title">How WanderLux <span>Began</span></h2>
              <div className="section-divider"></div>
              <p className="mb-4" style={{ color: '#64748B', lineHeight: 1.9 }}>
                Founded in 2011 by passionate travelers Ahmed and Sara Khan, WanderLux started as a small boutique
                travel consultancy in Lahore, Pakistan. What began as a dream to share the transformative power of
                travel with others has grown into a globally respected travel agency serving over 25,000 satisfied
                customers from across Pakistan and beyond.
              </p>
              <p style={{ color: '#64748B', lineHeight: 1.9 }}>
                Today, our team of 50+ travel experts operates from our Lahore headquarters on MM Alam Road,
                offering unparalleled service to Pakistani travelers. We've won multiple industry awards and been
                featured in Dawn, The News, and major travel publications. We are proud to be Pakistan's most
                trusted international travel agency.
              </p>
              <div className="row g-3 mt-3">
                <div className="col-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 shadow-sm">
                    <i className="fas fa-trophy fa-2x" style={{ color: '#F59E0B' }}></i>
                    <div><strong style={{ color: '#0F172A' }}>Award Winning</strong><br /><small style={{ color: '#64748B' }}>15+ Industry Awards</small></div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 shadow-sm">
                    <i className="fas fa-globe fa-2x" style={{ color: '#0EA5E9' }}></i>
                    <div><strong style={{ color: '#0F172A' }}>Global Network</strong><br /><small style={{ color: '#64748B' }}>12 Countries</small></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 reveal-right">
              <div className="story-img-wrap">
                <img src="/images/about-team.jpg" alt="Our team at work" style={{ height: '500px', width: '100%', objectFit: 'cover' }} />
                <div className="story-img-badge">
                  <div className="badge-number">2011</div>
                  <div className="badge-text">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-5" aria-label="Mission and vision">
        <div className="container">
          <div className="section-header center mb-5">
            <span className="section-label">Our Purpose</span>
            <h2 className="section-title reveal">Mission &amp; <span>Vision</span></h2>
            <div className="section-divider"></div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div style={{ background: 'linear-gradient(135deg,#0EA5E9,#14B8A6)', borderRadius: '24px', padding: '48px', color: 'white', height: '100%' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '24px' }}>
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '16px' }}>Our Mission</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.9, fontSize: '1.05rem' }}>
                  To provide affordable, safe, and memorable travel experiences while delivering outstanding customer
                  service. We believe every person deserves to explore the world and create lifelong memories.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: '24px', padding: '48px', color: 'white', height: '100%' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(14,165,233,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: '#0EA5E9', marginBottom: '24px' }}>
                  <i className="fas fa-eye"></i>
                </div>
                <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '16px' }}>Our Vision</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.9, fontSize: '1.05rem' }}>
                  To become one of the world's most trusted travel agencies by connecting people with incredible
                  destinations, building lasting relationships, and setting the standard for excellence in travel experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-5 bg-alt" aria-label="Core values">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title reveal">Our Core <span>Values</span></h2>
            <div className="section-divider"></div>
          </div>
          <div className="row g-4">
            {coreValues.map((v, i) => (
              <div className="col-lg-4 col-md-6 reveal" key={i}>
                <div className="feature-card">
                  <div className="feature-icon"><i className={`fas ${v.icon}`}></i></div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-5" aria-label="Our team">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-users me-2"></i>Our Team</span>
            <h2 className="section-title reveal">Meet The <span>Experts</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">The passionate people behind your perfect travel experiences</p>
          </div>
          <div className="row g-4">
            {team.map((member, i) => (
              <div className="col-lg-3 col-md-6 reveal" key={i}>
                <div className="team-card">
                  <div className="team-img">
                    <img src={`/images/${member.img}`} alt={member.name} />
                    <div className="team-social">
                      <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                      <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                      <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                    </div>
                  </div>
                  <div className="team-info">
                    <h4>{member.name}</h4>
                    <div className="position">{member.role}</div>
                    <p>{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <div className="cta-content">
            <h2 className="reveal">Ready To Travel <span style={{ color: '#0EA5E9' }}>With Us?</span></h2>
            <p className="reveal">Join thousands of happy travelers who have trusted WanderLux to create their perfect trip.</p>
            <div className="d-flex flex-wrap gap-3 justify-content-center reveal">
              <Link to="/packages" className="btn-primary-custom"><i className="fas fa-suitcase-rolling me-2"></i> Start Booking</Link>
              <Link to="/contact" className="btn-secondary-custom"><i className="fas fa-envelope me-2"></i> Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
