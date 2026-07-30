import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useAdmin } from '../admin/context/AdminContext'

const originalDemoPackages = [
  { id: 'demo-1', img: '/images/pkg-maldives.jpg', badge: 'Best Seller', category: 'luxury',    days: 5, location: 'Maldives',      rating: 4.9, title: 'Maldives Luxury Escape',   desc: 'Overwater bungalow with all-inclusive meals, snorkeling, dolphin cruises, and breathtaking sunsets.',    features: ['fa-hotel|5-Star Resort','fa-utensils|All Meals','fa-plane|Flights Inc.','fa-water|Speedboat','fa-swimmer|Snorkeling'],             price: '$1,899', unit: 'Per person' },
  { id: 'demo-2', img: '/images/pkg-swiss.jpg',       badge: 'Adventure', category: 'adventure', days: 8, location: 'Switzerland',   rating: 4.8, title: 'Swiss Alps Adventure',     desc: 'Glacier hikes, cable car rides, scenic trains through the Alps, and cozy mountain lodge stays.',        features: ['fa-hotel|Lodge Stay','fa-utensils|Breakfast','fa-train|Rail Pass','fa-bus|Coach Tours','fa-hiking|Glacier Hike'],                  price: '$1,599', unit: 'Per person' },
  { id: 'demo-3', img: '/images/pkg-bali-romance.jpg',badge: 'Honeymoon', category: 'honeymoon', days: 7, location: 'Bali',          rating: 4.9, title: 'Bali Romance',             desc: 'Private villa with pool, couples spa treatments, temple tours, and romantic sunset dining experiences.', features: ['fa-hotel|Private Villa','fa-spa|Spa Included','fa-car|Transfers','fa-shuttle-van|Private Driver','fa-umbrella-beach|Beach Tours'],   price: '$1,299', unit: 'Per couple' },
  { id: 'demo-4', img: '/images/dest-japan.jpg',      badge: 'Popular',   category: 'adventure', days: 9, location: 'Japan',         rating: 4.8, title: 'Japan Cultural Discovery', desc: 'Tokyo, Kyoto, Osaka – temples, tech districts, cherry blossoms, street food, and futuristic wonders.',  features: ['fa-hotel|4-Star Hotels','fa-subway|JR Pass','fa-user-tie|Local Guide','fa-bus|Coach Transfer','fa-torii-gate|Temple Tours'],         price: '$1,399', unit: 'Per person' },
  { id: 'demo-5', img: '/images/dest-paris.jpg',      badge: 'Luxury',    category: 'luxury',    days: 6, location: 'France',        rating: 4.9, title: 'Paris Luxury Getaway',    desc: 'Boutique hotel near Champs-Élysées, Seine river cruise, Eiffel Tower, Louvre, and Versailles tour.',    features: ['fa-hotel|Boutique Hotel','fa-utensils|Breakfast Daily','fa-ticket-alt|Tours Inc.','fa-bus|City Transfers','fa-landmark|Versailles'], price: '$1,499', unit: 'Per person' },
  { id: 'demo-6', img: '/images/dest-dubai.jpg',      badge: 'Luxury',    category: 'luxury',    days: 5, location: 'Dubai, UAE',    rating: 4.7, title: 'Dubai Explorer Package',   desc: 'Desert safari, Burj Khalifa visit, luxury shopping, dhow cruise dinner, and waterpark fun.',             features: ['fa-hotel|5-Star Hotel','fa-car|Transfers','fa-ticket-alt|Attractions','fa-bus|Desert Safari','fa-ship|Dhow Cruise'],                price: '$1,299', unit: 'Per person' },
  { id: 'demo-7', img: '/images/dest-bali.jpg',       badge: 'Family',    category: 'family',    days: 7, location: 'Bali',          rating: 4.8, title: 'Bali Family Fun',          desc: 'Family-friendly resort, waterpark, cultural shows, cooking classes, and kid-safe adventure activities.', features: ['fa-hotel|Family Resort','fa-utensils|Half Board','fa-child|Kids Activities','fa-bus|Resort Shuttle','fa-swimming-pool|Waterpark'], price: '$2,999', unit: 'Per family' },
  { id: 'demo-8', img: '/images/pkg-kenya.jpg',       badge: 'Wildlife',  category: 'wildlife',  days: 8, location: 'Kenya, Africa', rating: 4.9, title: 'Kenya Wildlife Safari',    desc: 'Witness the Great Migration, Big Five game drives, Maasai village visits, and tented camp stays.',       features: ['fa-campground|Tented Camp','fa-utensils|Full Board','fa-binoculars|Game Drives','fa-plane|Charter Flights','fa-paw|Big Five Safari'], price: '$2,499', unit: 'Per person' }
]

export default function PackagesPage() {
  const { tours, categories } = useAdmin()
  const [filter, setFilter] = useState('all')

  const publishedAdminTours = tours.filter(t => t.status === 'Published').map(t => ({
    id: t.id,
    img: t.image?.startsWith('/images/') || t.image?.startsWith('http') ? t.image : `/images/${t.image || 'pkg-maldives.jpg'}`,
    badge: t.categoryNames?.[0] || 'New Package',
    category: t.categoryNames?.[0]?.toLowerCase() || 'all',
    days: t.durationDays || 5,
    location: t.destinationName || 'Global',
    rating: 5.0,
    title: t.title,
    desc: t.description || 'Exclusive tour package created by travel experts.',
    features: ['fa-hotel|Hotel Stay', 'fa-utensils|Meals Inc.', 'fa-plane|Flight Transfer', 'fa-shield-alt|24/7 Support'],
    price: `$${t.price}`,
    unit: 'Per person'
  }))

  const allDisplayPackages = [...publishedAdminTours, ...originalDemoPackages]
  const filterTabs = ['all', 'adventure', 'family', 'honeymoon', 'luxury', 'wildlife', ...new Set(categories.map(c => c.slug || c.name.toLowerCase()))]
  const filteredPackages = filter === 'all' ? allDisplayPackages : allDisplayPackages.filter(p => p.category?.toLowerCase().includes(filter) || p.badge?.toLowerCase().includes(filter))

  return (
    <>
      <PageHero
        image="/images/hero-packages.jpg"
        breadcrumb="Packages"
        title={<>Find The Perfect <span style={{ color: '#0EA5E9' }}>Tour Package</span></>}
        subtitle="Carefully curated travel packages for every type of traveler – adventure, romance, family, or luxury."
      />

      <section className="py-5" aria-label="Tour packages">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-suitcase me-2"></i>Our Packages</span>
            <h2 className="section-title">Handcrafted <span>Travel Packages</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">From thrilling adventures to romantic escapes – we have the perfect package for you</p>
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5" role="tablist">
            {filterTabs.map(opt => (
              <button key={opt} className={`filter-tab${filter === opt ? ' active' : ''}`} onClick={() => setFilter(opt)} role="tab">
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {filteredPackages.map((pkg, i) => (
              <div className="col-lg-4 col-md-6" key={pkg.id || i}>
                <div className="package-card">
                  <div className="pkg-img">
                    <img src={pkg.img} alt={pkg.title} />
                    {pkg.badge && <div className="pkg-badge">{pkg.badge}</div>}
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
                      <Link to="/contact" className="btn-primary-custom" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
