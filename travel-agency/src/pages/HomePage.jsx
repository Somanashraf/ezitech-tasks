import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCountUp from '../hooks/useCountUp'

// ── Data ─────────────────────────────────────────────────────────────────────

const destinations = [
  { img: 'dest-paris.jpg', country: 'France', city: 'Paris', desc: 'Experience the city of love with iconic landmarks, world-class cuisine, and romantic ambiance.', badge: { icon: 'fa-fire', text: 'Hot Deal' }, price: '$899', days: 7, reviews: '1,245' },
  { img: 'dest-dubai.jpg', country: 'United Arab Emirates', city: 'Dubai', desc: 'Explore modern marvels, luxury shopping, desert safaris, and stunning architecture.', badge: { icon: 'fa-gem', text: 'Luxury' }, price: '$1,299', days: 5, reviews: '987' },
  { img: 'dest-switzerland.jpg', country: 'Switzerland', city: 'Switzerland', desc: 'Majestic Alps, pristine lakes, charming villages, and unforgettable scenic train journeys.', badge: { icon: 'fa-mountain', text: 'Adventure' }, price: '$1,599', days: 8, reviews: '1,543' },
  { img: 'dest-turkey.jpg', country: 'Turkey', city: 'Istanbul, Turkey', desc: 'Where East meets West. Rich history, vibrant bazaars, stunning mosques, and Bosphorus cruises.', badge: { icon: 'fa-certificate', text: 'Best Value' }, price: '$749', days: 6, reviews: '823', halfStar: true },
  { img: 'dest-bali.jpg', country: 'Indonesia', city: 'Bali', desc: 'Tropical paradise with stunning beaches, rice terraces, temples, and vibrant culture.', price: '$699', days: 6, reviews: '2,145' },
  { img: 'dest-maldives.jpg', country: 'Maldives', city: 'Maldives', desc: 'Overwater villas, crystal-clear waters, pristine beaches, and world-class diving.', badge: { icon: 'fa-heart', text: 'Honeymoon' }, price: '$1,899', days: 5, reviews: '1,876' },
  { img: 'dest-japan.jpg', country: 'Japan', city: 'Tokyo, Japan', desc: 'Ancient temples meet futuristic cities. Sushi, cherry blossoms, and unique culture.', price: '$1,399', days: 9, reviews: '1,456' },
  { img: 'dest-italy.jpg', country: 'Italy', city: 'Rome & Venice', desc: 'Historic ruins, Renaissance art, gondola rides, and authentic Italian cuisine.', price: '$1,199', days: 8, reviews: '1,234', halfStar: true },
]

const features = [
  { icon: 'fa-tag',        title: 'Affordable Prices',      desc: 'Best price guarantee on all packages. We negotiate directly with hotels, airlines, and local operators.' },
  { icon: 'fa-user-tie',   title: 'Experienced Tour Guides', desc: 'Our certified, multilingual guides bring destinations to life with deep local knowledge and professionalism.' },
  { icon: 'fa-headset',    title: '24/7 Customer Support',   desc: 'Our dedicated support team is available around the clock before, during, and after your journey.' },
  { icon: 'fa-shield-alt', title: 'Secure Online Booking',   desc: 'Book with complete confidence. Our SSL-encrypted platform keeps your personal and payment data protected.' },
  { icon: 'fa-route',      title: 'Personalized Tour Plans', desc: 'Every traveler is unique. We craft custom itineraries tailored to your interests, budget, and travel style.' },
  { icon: 'fa-medal',      title: 'Trusted By Thousands',    desc: 'With 25,000+ happy customers and a 4.9/5 star rating, we are one of the most trusted travel companies.' },
]

const packages = [
  { img: 'pkg-maldives.jpg',    badge: { text: 'Best Seller', cls: '' },          days: 5, location: 'Maldives',     rating: 4.9, title: 'Maldives Luxury Escape',   desc: 'Overwater bungalow with all-inclusive meals, snorkeling, and sunset cruises.',           features: ['fa-hotel|5-Star Resort','fa-utensils|All Meals','fa-plane|Flights Inc.','fa-water|Speedboat','fa-swimmer|Snorkeling'],          price: '$1,899', unit: 'Per person' },
  { img: 'pkg-swiss.jpg',       badge: { text: 'Adventure',  cls: 'badge-adventure' }, days: 8, location: 'Switzerland', rating: 4.8, title: 'Swiss Alps Adventure',     desc: 'Glacier hikes, cable car rides, scenic trains, and cozy alpine lodge stays.',           features: ['fa-hotel|Lodge Stay','fa-utensils|Breakfast','fa-train|Rail Pass','fa-bus|Coach Tours','fa-hiking|Glacier Hike'],               price: '$1,599', unit: 'Per person' },
  { img: 'pkg-bali-romance.jpg',badge: { text: 'Honeymoon',  cls: 'badge-honeymoon' }, days: 7, location: 'Bali',        rating: 4.9, title: 'Bali Romance Package',     desc: 'Private villa with pool, couples spa, temple tours, and romantic sunset dining.',        features: ['fa-hotel|Private Villa','fa-spa|Spa Included','fa-car|Transfers','fa-shuttle-van|Private Driver','fa-umbrella-beach|Beach Tours'], price: '$1,299', unit: 'Per couple' },
  { img: 'dest-japan.jpg',      badge: null,                                        days: 9, location: 'Japan',        rating: 4.8, title: 'Japan Cultural Discovery', desc: 'Tokyo, Kyoto, Osaka – temples, tech districts, cherry blossoms and street food.',        features: ['fa-hotel|4-Star Hotels','fa-subway|JR Pass','fa-user-tie|Guide','fa-bus|Coach Transfer','fa-torii-gate|Temple Tours'],            price: '$1,399', unit: 'Per person' },
  { img: 'dest-paris.jpg',      badge: { text: 'Luxury',     cls: 'badge-luxury' }, days: 6, location: 'France',       rating: 4.9, title: 'Paris Luxury Getaway',    desc: 'Boutique hotel near Champs-Élysées, Seine cruise, Eiffel Tower, and Versailles tour.',  features: ['fa-hotel|Boutique Hotel','fa-wine-glass|Wine Tasting','fa-plane|Flights','fa-bus|City Transfers','fa-landmark|Versailles Tour'],  price: '$1,499', unit: 'Per person' },
  { img: 'dest-dubai.jpg',      badge: null,                                        days: 5, location: 'UAE',          rating: 4.7, title: 'Dubai Explorer Package',   desc: 'Burj Khalifa, desert safari, Dubai Creek, Palm Jumeirah and luxury mall experience.',   features: ['fa-hotel|5-Star Hotel','fa-utensils|Breakfast','fa-car|Transfers','fa-bus|Desert Safari','fa-ship|Dhow Cruise'],                  price: '$1,299', unit: 'Per person' },
]

const testimonials = [
  { img: 'reviewer-ayesha.jpg', name: 'Ayesha Khan',  location: 'Lahore, Pakistan',    text: '"Maldives honeymoon bilkul perfect thi! WanderLux ne har cheez itni carefully plan ki — overwater villa se lekar beach dinner tak. Lahore se itni achi service milna waqai unexpected tha!"' },
  { img: 'reviewer-usman.jpg',  name: 'Usman Ahmed',  location: 'Karachi, Pakistan',   text: '"Japan tour ne saari expectations paar kar deen. Guide bohat knowledgeable tha, hotels kamaal ke they. WanderLux ki team ne Karachi se book karte waqt bhi poori help ki. Highly recommend!"' },
  { img: 'reviewer-fatima.jpg', name: 'Fatima Malik', location: 'Islamabad, Pakistan', text: '"Akele Bali jana thoda daunting lag raha tha lekin WanderLux ne itna safe feel karaya. 24/7 support se kabhi akela feel nahi hua. Islamabad se travel karna bilkul easy tha!"' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function StarRating({ half = false }) {
  return (
    <div className="stars">
      {[1,2,3,4].map(i => <i key={i} className="fas fa-star"></i>)}
      <i className={`fas fa-star${half ? '-half-alt' : ''}`}></i>
    </div>
  )
}

function StatCounter({ icon, count, suffix, label }) {
  const { ref, value } = useCountUp(count, 2200, suffix)
  return (
    <div className="col-lg-3 col-6">
      <div className="stat-item reveal" ref={ref}>
        <div className="stat-icon"><i className={`fas ${icon}`}></i></div>
        <div className="stat-number">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [nlStatus, setNlStatus] = useState('idle')

  const handleNewsletter = (e) => {
    e.preventDefault()
    setNlStatus('sending')
    setTimeout(() => {
      setNlStatus('sent')
      setNewsletterEmail('')
      setTimeout(() => setNlStatus('idle'), 3500)
    }, 1800)
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" aria-label="Hero section">
        <div className="hero-bg" style={{ backgroundImage: "url('/images/hero-main.jpg')" }}></div>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-7 hero-content pt-5">
              <h1 className="hero-title animate-fade-up delay-1">
                Explore The World<br />With <span>Confidence</span>
              </h1>
              <p className="hero-subtitle animate-fade-up delay-2">
                Discover breathtaking destinations, unforgettable adventures, and carefully planned
                travel experiences that create memories for a lifetime.
              </p>
              <div className="d-flex flex-wrap gap-3 animate-fade-up delay-3">
                <Link to="/destinations" className="btn-primary-custom"><i className="fas fa-compass"></i> Explore Destinations</Link>
                <Link to="/packages" className="btn-secondary-custom"><i className="fas fa-suitcase"></i> Book Your Trip</Link>
              </div>
              <div className="hero-stats animate-fade-up delay-4">
                <div className="hero-stat-item"><div className="hero-stat-number">25K+</div><div className="hero-stat-label">Happy Travelers</div></div>
                <div className="hero-stat-item"><div className="hero-stat-number">120+</div><div className="hero-stat-label">Destinations</div></div>
                <div className="hero-stat-item"><div className="hero-stat-number">15</div><div className="hero-stat-label">Years Experience</div></div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="row pb-5 animate-fade-up delay-5" style={{ position: 'relative', zIndex: 3 }}>
            <div className="col-12">
              <div className="hero-search-bar">
                <div className="row g-3 align-items-end">
                  <div className="col-md-3 col-sm-6">
                    <div className="search-field">
                      <label><i className="fas fa-map-marker-alt me-1" style={{ color: '#0EA5E9' }}></i> Destination</label>
                      <input type="text" placeholder="Where do you want to go?" />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="search-field">
                      <label><i className="fas fa-calendar me-1" style={{ color: '#0EA5E9' }}></i> Check In</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="search-field">
                      <label><i className="fas fa-users me-1" style={{ color: '#0EA5E9' }}></i> Travelers</label>
                      <select>
                        <option>1 Traveler</option>
                        <option>2 Travelers</option>
                        <option>3-5 Travelers</option>
                        <option>6+ Travelers</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <button className="search-btn w-100 justify-content-center">
                      <i className="fas fa-search"></i> Search Tours
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="py-5 bg-alt" aria-label="About preview">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 reveal-left">
              <div className="story-img-wrap position-relative">
                <img src="/images/about-story.jpg" alt="Travel planning" className="rounded-custom" />
                <div className="story-img-badge">
                  <div className="badge-number">15+</div>
                  <div className="badge-text">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 reveal-right">
              <span className="section-label"><i className="fas fa-heart me-2"></i>About Us</span>
              <h2 className="section-title">Your Trusted <span>Travel Partner</span></h2>
              <div className="section-divider"></div>
              <p className="section-subtitle text-start mb-4">
                We are passionate about creating unforgettable travel experiences for individuals, couples,
                families, and groups. Whether you're looking for a relaxing beach vacation, an adventurous
                mountain trek, or an exciting city tour, our experienced team is here every step of the way.
              </p>
              <ul className="list-unstyled mt-4" style={{ color: '#334155' }}>
                <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: '#14B8A6' }}></i> Personalized itinerary planning</li>
                <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: '#14B8A6' }}></i> Expert local guides and support</li>
                <li className="mb-2"><i className="fas fa-check-circle me-2" style={{ color: '#14B8A6' }}></i> Best price guarantee</li>
              </ul>
              <Link to="/about" className="btn-primary-custom mt-3"><i className="fas fa-arrow-right me-2"></i> Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="py-5" aria-label="Popular destinations">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-globe-americas me-2"></i>Destinations</span>
            <h2 className="section-title reveal">Top Travel <span>Destinations</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">Discover the world's most breathtaking destinations handpicked by travel experts</p>
          </div>
          <div className="row g-4">
            {destinations.map((d, i) => (
              <div className="col-lg-3 col-md-6 reveal" key={i}>
                <div className="destination-card">
                  <div className="card-img-wrap">
                    <img src={`/images/${d.img}`} alt={d.city} />
                    {d.badge && <div className="card-badge"><i className={`fas ${d.badge.icon}`}></i> {d.badge.text}</div>}
                    <div className="price-tag">From {d.price}</div>
                  </div>
                  <div className="card-body">
                    <div className="card-location"><i className="fas fa-map-marker-alt"></i> {d.country}</div>
                    <h3 className="card-title">{d.city}</h3>
                    <p className="card-desc">{d.desc}</p>
                    <div className="card-rating">
                      <StarRating half={d.halfStar} />
                      <span className="count">({d.reviews} reviews)</span>
                    </div>
                    <div className="card-footer-custom">
                      <span className="from-price">{d.days} Days from <strong>{d.price}</strong></span>
                      <Link to="/destinations" className="btn-outline-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/destinations" className="btn-accent"><i className="fas fa-map-marked-alt me-2"></i> View All Destinations</Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-alt py-5" aria-label="Why choose us">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-award me-2"></i>Why Us</span>
            <h2 className="section-title reveal">Why Thousands Of Travelers <span>Choose Us</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">We deliver exceptional travel experiences backed by years of expertise</p>
          </div>
          <div className="row g-4">
            {features.map((f, i) => (
              <div className="col-lg-4 col-md-6 reveal" key={i}>
                <div className="feature-card">
                  <div className="feature-icon"><i className={`fas ${f.icon}`}></i></div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-5" aria-label="Tour packages preview">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-suitcase me-2"></i>Packages</span>
            <h2 className="section-title reveal">Our Best <span>Selling Packages</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">Carefully curated travel packages for every type of traveler</p>
          </div>
          <div className="row g-4">
            {packages.map((pkg, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <div className="package-card">
                  <div className="pkg-img">
                    <img src={`/images/${pkg.img}`} alt={pkg.title} />
                    {pkg.badge && <div className={`pkg-badge ${pkg.badge.cls}`}>{pkg.badge.text}</div>}
                  </div>
                  <div className="pkg-body">
                    <div className="pkg-meta">
                      <span><i className="fas fa-clock"></i> {pkg.days} Days</span>
                      <span><i className="fas fa-map-marker-alt"></i> {pkg.location}</span>
                      <span><i className="fas fa-star" style={{ color: '#F59E0B' }}></i> {pkg.rating}</span>
                    </div>
                    <h4 className="pkg-title">{pkg.title}</h4>
                    <p className="pkg-desc">{pkg.desc}</p>
                    <div className="pkg-features">
                      {pkg.features.map((f, j) => {
                        const [icon, label] = f.split('|')
                        return <span className="pkg-feature" key={j}><i className={`fas ${icon}`}></i> {label}</span>
                      })}
                    </div>
                    <div className="pkg-footer">
                      <div className="pkg-price"><span>{pkg.unit}</span><strong>{pkg.price}</strong></div>
                      <Link to="/packages" className="btn-primary-custom" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/packages" className="btn-outline-primary"><i className="fas fa-suitcase me-2"></i> View All Packages</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section" aria-label="Travel statistics">
        <div className="container">
          <div className="text-center mb-5" style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)' }}>Travel In Numbers</span>
            <h2 className="section-title mt-2" style={{ color: 'white' }}>Our Achievements <span>Speak For Themselves</span></h2>
          </div>
          <div className="row g-4" style={{ position: 'relative', zIndex: 1 }}>
            <StatCounter icon="fa-users"         count={25000} suffix="+" label="Happy Travelers" />
            <StatCounter icon="fa-route"          count={500}   suffix="+" label="Tours Completed" />
            <StatCounter icon="fa-globe-americas" count={120}   suffix="+" label="Destinations" />
            <StatCounter icon="fa-trophy"         count={15}    suffix=" Yrs" label="Years Experience" />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-5 bg-alt" aria-label="Testimonials">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-quote-right me-2"></i>Reviews</span>
            <h2 className="section-title reveal">What Our Travelers <span>Say</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">Real stories from real travelers who experienced the WanderLux difference</p>
          </div>
          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div className="col-lg-4 col-md-6 reveal" key={i}>
                <div className="testimonial-card">
                  <div className="quote-icon">&ldquo;</div>
                  <div className="star-rating">{[1,2,3,4,5].map(s => <i key={s} className="fas fa-star"></i>)}</div>
                  <p className="review-text">{t.text}</p>
                  <div className="reviewer">
                    <img src={`/images/${t.img}`} alt={t.name} />
                    <div className="reviewer-info">
                      <h5>{t.name}</h5>
                      <span><i className="fas fa-map-marker-alt"></i> {t.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/testimonials" className="btn-outline-primary"><i className="fas fa-comments me-2"></i> Read All Reviews</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <div className="cta-content">
            <h2 className="reveal">Ready For Your Next <span style={{ color: '#0EA5E9' }}>Adventure?</span></h2>
            <p className="reveal">Start planning your dream vacation today with confidence.</p>
            <div className="d-flex flex-wrap gap-3 justify-content-center reveal">
              <Link to="/packages" className="btn-primary-custom"><i className="fas fa-suitcase-rolling me-2"></i> Book Your Trip</Link>
              <Link to="/contact" className="btn-secondary-custom"><i className="fas fa-envelope me-2"></i> Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter-section" aria-label="Newsletter">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 reveal-left">
              <span className="section-label" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', display: 'inline-block', marginBottom: '12px' }}>
                <i className="fas fa-envelope me-2"></i>Newsletter
              </span>
              <h2>Stay Updated With Our<br />Latest Offers</h2>
              <p className="mt-3">Subscribe to receive travel tips, exclusive discounts, and latest packages in your inbox.</p>
            </div>
            <div className="col-lg-6 reveal-right">
              <form className="newsletter-form" onSubmit={handleNewsletter}>
                <input
                  type="email" placeholder="Enter your email address"
                  value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={nlStatus === 'sending'}>
                  {nlStatus === 'sent'    ? <><i className="fas fa-check me-2"></i>Subscribed!</>
                  : nlStatus === 'sending'? <><i className="fas fa-spinner fa-spin me-2"></i>Sending...</>
                  :                         <><i className="fas fa-paper-plane me-2"></i>Subscribe</>}
                </button>
              </form>
              <p className="mt-3" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>
                <i className="fas fa-lock me-2"></i>No spam ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
