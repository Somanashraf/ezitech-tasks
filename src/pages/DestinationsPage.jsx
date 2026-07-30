import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useAdmin } from '../admin/context/AdminContext'

const originalDemoDestinations = [
  { id: 'demo-d1', img: '/images/dest-paris.jpg', country: 'France', city: 'Paris', desc: 'Experience the city of love with iconic landmarks, world-class cuisine, and romantic ambiance.', badge: { icon: 'fa-fire', text: 'Hot Deal' }, price: '$899', days: 7, reviews: '1,245' },
  { id: 'demo-d2', img: '/images/dest-dubai.jpg', country: 'United Arab Emirates', city: 'Dubai', desc: 'Explore modern marvels, luxury shopping, desert safaris, and stunning architecture.', badge: { icon: 'fa-gem', text: 'Luxury' }, price: '$1,299', days: 5, reviews: '987' },
  { id: 'demo-d3', img: '/images/dest-switzerland.jpg', country: 'Switzerland', city: 'Switzerland', desc: 'Majestic Alps, pristine lakes, charming villages, and unforgettable scenic train journeys.', badge: { icon: 'fa-mountain', text: 'Adventure' }, price: '$1,599', days: 8, reviews: '1,543' },
  { id: 'demo-d4', img: '/images/dest-turkey.jpg', country: 'Turkey', city: 'Istanbul, Turkey', desc: 'Where East meets West. Rich history, vibrant bazaars, stunning mosques, and Bosphorus cruises.', badge: { icon: 'fa-certificate', text: 'Best Value' }, price: '$749', days: 6, reviews: '823', halfStar: true },
  { id: 'demo-d5', img: '/images/dest-bali.jpg', country: 'Indonesia', city: 'Bali', desc: 'Tropical paradise with stunning beaches, rice terraces, ancient temples, and vibrant culture.', price: '$699', days: 6, reviews: '2,145' },
  { id: 'demo-d6', img: '/images/dest-maldives.jpg', country: 'Maldives', city: 'Maldives', desc: 'Overwater villas, crystal-clear waters, pristine beaches, and world-class diving.', badge: { icon: 'fa-heart', text: 'Honeymoon' }, price: '$1,899', days: 5, reviews: '1,876' },
  { id: 'demo-d7', img: '/images/dest-japan.jpg', country: 'Japan', city: 'Tokyo, Japan', desc: 'Ancient temples meet futuristic cities. Sushi, cherry blossoms, and a unique culture like no other.', price: '$1,399', days: 9, reviews: '1,456' },
  { id: 'demo-d8', img: '/images/dest-italy.jpg', country: 'Italy', city: 'Rome, Italy', desc: 'Historic ruins, Renaissance art, gondola rides, and authentic Italian cuisine in the Eternal City.', price: '$1,199', days: 7, reviews: '1,234', halfStar: true },
  { id: 'demo-d9', img: '/images/dest-newyork.jpg', country: 'USA', city: 'New York, USA', desc: "The city that never sleeps. Broadway shows, iconic skylines, world-class museums, and diverse food.", price: '$1,099', days: 5, reviews: '1,089', halfStar: true },
  { id: 'demo-d10', img: '/images/dest-santorini.jpg', country: 'Greece', city: 'Santorini, Greece', desc: 'Iconic white-washed cliffs, stunning sunsets, volcanic beaches, and incredible Mediterranean food.', badge: { icon: 'fa-sun', text: 'Popular' }, price: '$1,299', days: 6, reviews: '1,678' },
  { id: 'demo-d11', img: '/images/dest-capetown.jpg', country: 'South Africa', city: 'Cape Town', desc: 'Table Mountain, penguins, wine estates, pristine beaches, and incredible wildlife nearby.', price: '$1,199', days: 7, reviews: '934', halfStar: true },
  { id: 'demo-d12', img: '/images/dest-bangkok.jpg', country: 'Thailand', city: 'Bangkok, Thailand', desc: 'Ornate temples, bustling night markets, floating markets, street food, and vibrant nightlife.', badge: { icon: 'fa-certificate', text: 'Best Value' }, price: '$649', days: 6, reviews: '1,102', halfStar: true }
]

const travelTips = [
  { icon: 'fa-passport', title: 'Book Early', desc: 'Secure the best deals by booking your flights and hotels at least 3–6 months in advance for peak seasons.' },
  { icon: 'fa-shield-alt', title: 'Travel Insurance', desc: 'Always purchase comprehensive travel insurance to protect against cancellations, medical emergencies, and theft.' },
  { icon: 'fa-language', title: 'Learn Local Phrases', desc: 'A few words in the local language go a long way. Locals appreciate the effort and it enriches your experience.' },
  { icon: 'fa-suitcase-rolling', title: 'Pack Light', desc: 'Bring only what you need. A lighter bag means more flexibility, easier transport, and less stress at airports.' }
]

function StarRating({ half = false }) {
  return (
    <div className="stars">
      {[1,2,3,4].map(i => <i key={i} className="fas fa-star"></i>)}
      <i className={`fas fa-star${half ? '-half-alt' : ''}`}></i>
    </div>
  )
}

export default function DestinationsPage() {
  const { destinations, tours } = useAdmin()

  const adminDestinations = destinations.map(d => {
    const linkedTours = tours.filter(t => t.destinationId === d.id || t.destinationName?.toLowerCase().includes(d.city?.toLowerCase()))
    const minPrice = linkedTours.length > 0 ? Math.min(...linkedTours.map(t => t.price)) : 899
    return {
      id: d.id,
      img: d.image?.startsWith('/images/') || d.image?.startsWith('data:') || d.image?.startsWith('http') ? d.image : `/images/${d.image || 'dest-dubai.jpg'}`,
      country: d.country, city: d.city,
      desc: d.description || 'Explore stunning attractions, local culture, and landmark sights.',
      badge: { icon: 'fa-star', text: 'Popular' },
      price: `$${minPrice}`,
      days: linkedTours[0]?.durationDays || 5,
      reviews: '500+'
    }
  })

  const displayDestinations = [...adminDestinations, ...originalDemoDestinations]

  return (
    <>
      <PageHero
        image="/images/hero-destinations.jpg"
        breadcrumb="Destinations"
        title={<>Explore Amazing <span style={{ color: '#0EA5E9' }}>Destinations</span></>}
        subtitle="Discover the world's most breathtaking places, handpicked by our travel experts just for you."
      />

      <section className="py-5" aria-label="All destinations">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-globe-americas me-2"></i>Destinations</span>
            <h2 className="section-title reveal">Explore The World's Best <span>Places</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">From sun-kissed beaches to snow-capped mountains – your perfect destination awaits</p>
          </div>
          <div className="row g-4">
            {displayDestinations.map((d, i) => (
              <div className="col-lg-3 col-md-6 reveal" key={d.id || i}>
                <div className="destination-card">
                  <div className="card-img-wrap">
                    <img src={d.img} alt={d.city} />
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
                      <span className="from-price">{d.days || 5} Days from <strong>{d.price}</strong></span>
                      <Link to="/contact" className="btn-outline-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-alt" aria-label="Travel tips">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-lightbulb me-2"></i>Pro Tips</span>
            <h2 className="section-title reveal">Smart <span>Travel Tips</span></h2>
            <div className="section-divider"></div>
          </div>
          <div className="row g-4">
            {travelTips.map((tip, i) => (
              <div className="col-lg-3 col-md-6 reveal" key={i}>
                <div className="feature-card text-center">
                  <div className="feature-icon"><i className={`fas ${tip.icon}`}></i></div>
                  <h4>{tip.title}</h4>
                  <p>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <div className="cta-content">
            <h2 className="reveal">Found Your <span style={{ color: '#0EA5E9' }}>Dream Destination?</span></h2>
            <p className="reveal">Let our travel experts craft the perfect itinerary tailored just for you.</p>
            <div className="d-flex flex-wrap gap-3 justify-content-center reveal">
              <Link to="/contact" className="btn-primary-custom"><i className="fas fa-paper-plane me-2"></i>Book Now</Link>
              <Link to="/packages" className="btn-secondary-custom"><i className="fas fa-suitcase me-2"></i>View Packages</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
