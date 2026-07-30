import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import useCountUp from '../hooks/useCountUp'

const reviews = [
  { img: 'reviewer-ayesha.jpg', name: 'Ayesha Khan', location: 'Lahore • Maldives Honeymoon', stars: 5, text: '"Our Maldives honeymoon was absolute perfection! WanderLux took care of every single detail — from our overwater villa reservation to romantic private beach dining. The quality of service was exceptional. A truly unforgettable memory!"' },
  { img: 'reviewer-usman.jpg', name: 'Usman Ahmed', location: 'Karachi • Japan Tour', stars: 5, text: '"The Japan tour exceeded all expectations. Our guide was incredibly knowledgeable, hotels were top-notch, and the high-speed bullet train journey from Tokyo to Kyoto was breathtaking. WanderLux provided outstanding support from start to finish!"' },
  { img: 'reviewer-fatima.jpg', name: 'Fatima Malik', location: 'Islamabad • Bali Trip', stars: 5, text: '"Traveling solo to Bali felt intimidating, but WanderLux made me feel completely safe and comfortable. The rice terraces, ancient temples, and beach resorts were stunning. Their 24/7 concierge support was fantastic!"' },
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

function DarkStatCard({ icon, count, suffix = '', label }) {
  const { ref, value } = useCountUp(count, 2200, suffix)
  return (
    <div className="col-lg-3 col-6 text-center">
      <div className="p-4" style={{ background: '#1E293B', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '1.8rem', color: '#14B8A6', marginBottom: '0.5rem' }}>
          <i className={`fas ${icon}`}></i>
        </div>
        <div ref={ref} style={{ fontSize: '2rem', fontWeight: 800, color: '#0EA5E9', fontFamily: "'Playfair Display', serif" }}>
          {value}
        </div>
        <div style={{ color: '#F8FAFC', fontSize: '0.9rem', fontWeight: 600, marginTop: '0.2rem' }}>
          {label}
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        image="/images/hero-about.jpg"
        breadcrumb="Testimonials"
        title={<>Loved By Thousands Of <span style={{ color: '#0EA5E9' }}>Travelers</span></>}
        subtitle="Real stories from real travelers who trusted WanderLux to create their dream vacations."
      />

      {/* ── REVIEWS GRID ── */}
      <section className="py-5" aria-label="Customer reviews">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-quote-left me-2"></i>Reviews</span>
            <h2 className="section-title reveal">What Our <span>Travelers Say</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">Genuine feedback from our wonderful community of globetrotters</p>
          </div>
          <div className="row g-4">
            {reviews.map((r, i) => (
              <div className="col-lg-4 col-md-6 reveal" key={i}>
                <div className="testimonial-card">
                  <div className="quote-icon">&ldquo;</div>
                  <div className="stars mb-3">
                    {[1,2,3,4,5].map(s => (
                      <i key={s} className={`fa${s <= r.stars ? 's' : 'r'} fa-star`}></i>
                    ))}
                  </div>
                  <p className="testimonial-text mb-4">{r.text}</p>
                  <div className="reviewer-info">
                    <img src={`/images/${r.img}`} alt={r.name} className="reviewer-avatar" />
                    <div>
                      <h5 className="reviewer-name">{r.name}</h5>
                      <span className="reviewer-trip">{r.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS SECTION (High Contrast Dark Theme) ── */}
      <section className="py-5" aria-label="Statistics" style={{ background: '#0F172A' }}>
        <div className="container">
          <div className="row g-4">
            <DarkStatCard icon="fa-smile" count={25000} suffix="+" label="Happy Travelers" />
            <DarkStatCard icon="fa-globe-americas" count={120} suffix="+" label="Destinations" />
            <DarkStatCard icon="fa-map-marked-alt" count={450} suffix="+" label="Tours Completed" />
            <DarkStatCard icon="fa-star" count={4.9} suffix="/5" label="Average Rating" />
          </div>
        </div>
      </section>
    </>
  )
}
