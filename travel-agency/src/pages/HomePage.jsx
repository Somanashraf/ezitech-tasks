import { useState, useEffect } from 'react'
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
  { img: 'reviewer-ayesha.jpg', name: 'Ayesha Khan', location: 'Lahore • Maldives Honeymoon', stars: 5, text: '"Our Maldives honeymoon was absolute perfection! WanderLux took care of every single detail — from our overwater villa reservation to romantic private beach dining. Lahore se itni achi service milna waqai unexpected tha!"' },
  { img: 'reviewer-usman.jpg', name: 'Usman Ahmed', location: 'Karachi • Japan Tour', stars: 5, text: '"The Japan tour exceeded all expectations. Our guide was knowledgeable, hotels were top-notch, and the high-speed bullet train journey from Tokyo to Kyoto was breathtaking. WanderLux ki team ne Karachi se poori help ki!"' },
  { img: 'reviewer-fatima.jpg', name: 'Fatima Malik', location: 'Islamabad • Bali Trip', stars: 5, text: '"Traveling solo to Bali felt intimidating, but WanderLux made me feel completely safe and comfortable. The rice terraces and beach resorts were stunning. 24/7 support se kabhi akela feel nahi hua!"' },
  { img: 'reviewer-tariq.jpg', name: 'Tariq Mehmood', location: 'Faisalabad • Dubai Family Trip', stars: 5, text: '"We booked a family trip to Dubai with our four kids. From the desert safari dunes to Burj Khalifa, everything was meticulously organized. The itinerary was relaxed and stress-free. Premium service all the way!"' },
  { img: 'reviewer-sana.jpg', name: 'Sana Riaz', location: 'Multan • Switzerland Tour', stars: 5, text: '"Seeing the Swiss Alps in person left me speechless! WanderLux crafted an 8-day itinerary with scenic rail passes, mountain hikes, and cozy alpine hotels. Incredible value for money!"' },
  { img: 'reviewer-hassan.jpg', name: 'Hassan Qureshi', location: 'Rawalpindi • Italy Tour', stars: 5, text: '"Our trip to Rome and Venice was unforgettable. The private local guides brought Roman history to life, and the boutique hotel locations were central to all major landmarks. Excellent organization!"' },
  { img: 'reviewer-zainab.jpg', name: 'Zainab Hussain', location: 'Lahore • Greece Trip', stars: 5, text: '"Santorini was a dream come true! Watching the Oia sunset from our private caldera view suite felt like a fairytale. This was my third time booking with WanderLux, and they never disappoint!"' },
  { img: 'reviewer-ali.jpg', name: 'Ali Raza', location: 'Karachi • Kenya Safari', stars: 5, text: '"Witnessing the Great Migration on our Kenya safari was one of the most incredible experiences of my life. WanderLux handled all complex flight connections and park permits seamlessly. Truly top tier!"' },
  { img: 'reviewer-nadia.jpg', name: 'Nadia Shahid', location: 'Islamabad • Paris Trip', stars: 5, text: '"It was our first time visiting Paris. WanderLux arranged a bilingual guide and a gorgeous boutique hotel near the Eiffel Tower. The Seine river cruise and Versailles palace tour were magical!"' },
  { img: 'reviewer-bilal.jpg', name: 'Bilal Chaudhry', location: 'Lahore • Turkey Tour', stars: 5, text: '"Turkey is mesmerizing! The hot air balloon ride in Cappadocia was a bucket list moment. The cave hotel accommodation was super unique, and the Grand Bazaar tours were perfectly timed. Highly recommended!"' },
  { img: 'reviewer-hina.jpg', name: 'Hina Baig', location: 'Sialkot • Bali Trip', stars: 5, text: '"Our private pool villa in Bali was gorgeous. The balance between adventure tours and relaxation was perfect. WanderLux local destination partners delivered world-class hospitality throughout our stay!"' },
  { img: 'reviewer-omar.jpg', name: 'Omar Farooq', location: 'Peshawar • Maldives Trip', stars: 5, text: '"Snorkeling in the coral reefs and staying in an overwater bungalow was paradise on Earth. From airport greeting to departure, WanderLux handled everything flawlessly. I will always book with them!"' }
]

const homeFaqs = [
  { icon: 'fa-bookmark', q: 'How do I book a tour with WanderLux?', a: 'Booking with WanderLux is simple. Browse our packages or destinations, choose what interests you, then either fill in our online contact form or call us directly at +92 300 123 4567. One of our travel consultants will reach out within 24 hours to confirm details, customize your itinerary, and guide you through the secure payment process.' },
  { icon: 'fa-times-circle', q: 'Can I cancel my booking and get a refund?', a: 'Yes, cancellations are accepted. If you cancel more than 60 days before departure, you\'ll receive a full refund minus a small processing fee. Cancellations between 30–60 days receive a 50% refund. Cancellations within 30 days of departure are non-refundable, but we can often offer travel credits for future bookings.' },
  { icon: 'fa-plane', q: 'Does WanderLux include flights in packages?', a: 'Many of our packages include international flights, clearly marked as "Flights Included" on the package detail. For packages that don\'t include flights, we can arrange them at competitive rates and add them to your booking.' },
  { icon: 'fa-shield-alt', q: 'Is travel insurance included?', a: 'Travel insurance is not automatically included but is strongly recommended and can be added to any booking. We partner with leading insurers to offer comprehensive coverage including trip cancellation, medical emergencies, and flight delays.' },
  { icon: 'fa-passport', q: 'Do I need a visa? Can you help?', a: 'Visa requirements depend on your nationality and destination. Our team will advise you on exactly which visas are needed and provide detailed guidance. For many popular destinations, we can assist with visa processing as part of our service.' },
  { icon: 'fa-route', q: 'Can I create a custom tour package?', a: "Absolutely! Custom tours are one of our specialties. Simply tell us your destination preferences, travel dates, budget, group size, and interests – and our expert consultants will design a bespoke itinerary from scratch." },
  { icon: 'fa-child', q: 'Are packages suitable for children?', a: 'Yes! Many of our packages are family-friendly with age-appropriate activities, family accommodation, and flexible pacing. Children under 12 typically receive discounts of 20–30%.' },
  { icon: 'fa-users', q: 'Do you offer group discounts?', a: 'Yes! Groups of 8 or more receive a minimum 10% discount. Groups of 15+ receive 15% off, and larger groups of 25+ can negotiate even greater savings. We also offer complimentary spaces for group leaders.' },
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
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [mouseStart, setMouseStart] = useState(null)
  const [openFaq, setOpenFaq] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePrevTestimonial = () => {
    setActiveTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNextTestimonial = () => {
    setActiveTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 4500)
    return () => clearInterval(timer)
  }, [isHovered])

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStart === null) return
    const diff = e.changedTouches[0].clientX - touchStart
    if (diff < -30) handleNextTestimonial()
    else if (diff > 30) handlePrevTestimonial()
    setTouchStart(null)
  }

  const handleMouseDown = (e) => setMouseStart(e.clientX)
  const handleMouseUp = (e) => {
    if (mouseStart === null) return
    const diff = e.clientX - mouseStart
    if (diff < -30) handleNextTestimonial()
    else if (diff > 30) handlePrevTestimonial()
    setMouseStart(null)
  }

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

      {/* ── TESTIMONIALS 3D COVERFLOW CAROUSEL ── */}
      <section className="py-5 bg-alt position-relative overflow-hidden" aria-label="Testimonials">
        <div className="container">
          <div className="section-header center mb-3">
            <span className="section-label"><i className="fas fa-quote-right me-2"></i>Reviews</span>
            <h2 className="section-title reveal">What Our Travelers <span>Say</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">Swipe or click to explore real stories from travelers who experienced the WanderLux difference</p>
          </div>

          {/* Controls Header */}
          <div className="d-flex justify-content-end align-items-center mb-3 px-md-4">
            <div className="d-flex gap-2 ms-auto">
              <button
                className="slider-arrow-btn"
                onClick={handlePrevTestimonial}
                aria-label="Previous Testimonials"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                className="slider-arrow-btn"
                onClick={handleNextTestimonial}
                aria-label="Next Testimonials"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* 3D Coverflow Stage */}
          <div className="testimonial-3d-wrapper">
            <div
              className="testimonial-3d-stage"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              {testimonials.map((t, index) => {
                let offset = index - activeTestimonial
                const total = testimonials.length
                if (offset < -Math.floor(total / 2)) offset += total
                if (offset > Math.floor(total / 2)) offset -= total

                const step = windowWidth < 576 ? 160 : windowWidth < 992 ? 220 : 310

                let transform = ''
                let opacity = 0
                let zIndex = 0
                let filter = 'none'
                let pointerEvents = 'none'

                if (offset === 0) {
                  // Main Center Active Card
                  transform = 'translateX(0px) scale(1.05) translateZ(0px) rotateY(0deg)'
                  opacity = 1
                  zIndex = 10
                  pointerEvents = 'auto'
                } else if (offset === -1) {
                  // Left Side Card
                  transform = `translateX(-${step}px) scale(0.85) translateZ(-90px) rotateY(18deg)`
                  opacity = 0.72
                  zIndex = 6
                  pointerEvents = 'auto'
                  filter = 'blur(0.3px)'
                } else if (offset === 1) {
                  // Right Side Card
                  transform = `translateX(${step}px) scale(0.85) translateZ(-90px) rotateY(-18deg)`
                  opacity = 0.72
                  zIndex = 6
                  pointerEvents = 'auto'
                  filter = 'blur(0.3px)'
                } else if (offset === -2) {
                  // Far Left
                  transform = `translateX(-${step * 1.75}px) scale(0.66) translateZ(-180px) rotateY(25deg)`
                  opacity = 0.3
                  zIndex = 3
                  filter = 'blur(1px)'
                } else if (offset === 2) {
                  // Far Right
                  transform = `translateX(${step * 1.75}px) scale(0.66) translateZ(-180px) rotateY(-25deg)`
                  opacity = 0.3
                  zIndex = 3
                  filter = 'blur(1px)'
                } else {
                  transform = `translateX(${offset > 0 ? step * 2.5 : -step * 2.5}px) scale(0.5) translateZ(-300px)`
                  opacity = 0
                  zIndex = 0
                }

                return (
                  <div
                    key={index}
                    className={`testimonial-3d-card ${offset === 0 ? 'active-card' : 'side-card'}`}
                    style={{
                      transform,
                      opacity,
                      zIndex,
                      filter,
                      pointerEvents,
                      cursor: offset !== 0 ? 'pointer' : 'default'
                    }}
                    onClick={() => setActiveTestimonial(index)}
                  >
                    <div className="quote-badge">&ldquo;</div>
                    <div className="star-rating mb-3" style={{ color: '#F59E0B' }}>
                      {[...Array(t.stars || 5)].map((_, s) => (
                        <i key={s} className="fas fa-star me-1"></i>
                      ))}
                    </div>
                    <p className="review-text">{t.text}</p>
                    <div className="reviewer-profile">
                      <img src={`/images/${t.img}`} alt={t.name} className="reviewer-avatar" />
                      <div>
                        <h5 className="reviewer-name">{t.name}</h5>
                        <span className="reviewer-loc">
                          <i className="fas fa-map-marker-alt text-primary"></i> {t.location}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="slider-dots-container d-flex justify-content-center gap-2 mt-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`slider-dot ${activeTestimonial === idx ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-5" aria-label="Frequently Asked Questions">
        <div className="container">
          <div className="section-header center mb-4">
            <span className="section-label"><i className="fas fa-question-circle me-2"></i>FAQ</span>
            <h2 className="section-title reveal">Frequently Asked <span>Questions</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">Everything you need to know about booking, cancellations, and travel requirements</p>
          </div>

          <div className="row g-4">
            {/* Left Column (4 FAQs) */}
            <div className="col-lg-6">
              <div className="home-faq-accordion">
                {homeFaqs.slice(0, 4).map((faq, idx) => {
                  const i = idx
                  const isOpen = openFaq === i
                  return (
                    <div
                      key={i}
                      className={`home-faq-item ${isOpen ? 'active' : ''} mb-3`}
                      style={{
                        borderRadius: '12px',
                        border: '1px solid rgba(14, 165, 233, 0.15)',
                        backgroundColor: '#ffffff',
                        overflow: 'hidden',
                        boxShadow: isOpen ? '0 4px 20px rgba(14, 165, 233, 0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <button
                        className="w-100 text-start border-0 bg-transparent p-3 p-md-4 d-flex align-items-center justify-content-between cursor-pointer"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        style={{ outline: 'none' }}
                      >
                        <span className="d-flex align-items-center gap-3 fw-bold text-dark fs-6">
                          <i className={`fas ${faq.icon}`} style={{ color: '#0EA5E9', fontSize: '1.1rem' }}></i>
                          {faq.q}
                        </span>
                        <div
                          className="faq-toggle-icon rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ms-2"
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: isOpen ? '#0EA5E9' : 'rgba(14, 165, 233, 0.08)',
                            color: isOpen ? '#ffffff' : '#0EA5E9',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
                        </div>
                      </button>
                      {isOpen && (
                        <div
                          className="px-4 pb-4 pt-0 text-secondary"
                          style={{
                            lineHeight: '1.8',
                            fontSize: '0.92rem',
                            borderTop: '1px solid rgba(0,0,0,0.05)',
                            paddingTop: '14px'
                          }}
                        >
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Column (4 FAQs) */}
            <div className="col-lg-6">
              <div className="home-faq-accordion">
                {homeFaqs.slice(4, 8).map((faq, idx) => {
                  const i = idx + 4
                  const isOpen = openFaq === i
                  return (
                    <div
                      key={i}
                      className={`home-faq-item ${isOpen ? 'active' : ''} mb-3`}
                      style={{
                        borderRadius: '12px',
                        border: '1px solid rgba(14, 165, 233, 0.15)',
                        backgroundColor: '#ffffff',
                        overflow: 'hidden',
                        boxShadow: isOpen ? '0 4px 20px rgba(14, 165, 233, 0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <button
                        className="w-100 text-start border-0 bg-transparent p-3 p-md-4 d-flex align-items-center justify-content-between cursor-pointer"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        style={{ outline: 'none' }}
                      >
                        <span className="d-flex align-items-center gap-3 fw-bold text-dark fs-6">
                          <i className={`fas ${faq.icon}`} style={{ color: '#0EA5E9', fontSize: '1.1rem' }}></i>
                          {faq.q}
                        </span>
                        <div
                          className="faq-toggle-icon rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ms-2"
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: isOpen ? '#0EA5E9' : 'rgba(14, 165, 233, 0.08)',
                            color: isOpen ? '#ffffff' : '#0EA5E9',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
                        </div>
                      </button>
                      {isOpen && (
                        <div
                          className="px-4 pb-4 pt-0 text-secondary"
                          style={{
                            lineHeight: '1.8',
                            fontSize: '0.92rem',
                            borderTop: '1px solid rgba(0,0,0,0.05)',
                            paddingTop: '14px'
                          }}
                        >
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
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
