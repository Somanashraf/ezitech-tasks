import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const allImages = [
  { img: 'pkg-maldives.jpg', title: 'Maldives Crystal Waters', category: 'beaches' },
  { img: 'pkg-swiss.jpg', title: 'Swiss Alps Peak', category: 'mountains' },
  { img: 'dest-paris.jpg', title: 'Paris at Night', category: 'cities' },
  { img: 'pkg-kenya.jpg', title: 'African Safari', category: 'wildlife' },
  { img: 'gal-resort-pool.jpg', title: 'Luxury Resort Pool', category: 'hotels' },
  { img: 'dest-switzerland.jpg', title: 'Alpine Lake Reflection', category: 'mountains' },
  { img: 'dest-dubai.jpg', title: 'Dubai Skyline', category: 'cities' },
  { img: 'dest-bali.jpg', title: 'Bali Rice Terraces', category: 'beaches' },
  { img: 'pkg-bali-romance.jpg', title: 'Private Villa Pool', category: 'hotels' },
  { img: 'dest-japan.jpg', title: 'Tokyo Streets', category: 'cities' },
  { img: 'dest-santorini.jpg', title: 'Santorini Sunset', category: 'beaches' },
  { img: 'dest-italy.jpg', title: 'Venice Canals', category: 'cities' },
  { img: 'gal-balloon.jpg', title: 'Hot Air Balloon', category: 'adventure' },
  { img: 'gal-mountain.jpg', title: 'Mountain Sunrise', category: 'mountains' },
  { img: 'gal-overwater.jpg', title: 'Overwater Bungalow', category: 'hotels' },
  { img: 'gal-travel.jpg', title: 'Backpacker Travel', category: 'adventure' },
  { img: 'gal-elephant.jpg', title: 'Elephant Savanna', category: 'wildlife' },
  { img: 'gal-tropical.jpg', title: 'Tropical Beach', category: 'beaches' },
  { img: 'gal-scuba.jpg', title: 'Scuba Diving', category: 'adventure' },
  { img: 'gal-travel.jpg', title: 'Mountain Trail', category: 'mountains' },
]

const filterOptions = ['all', 'beaches', 'mountains', 'cities', 'wildlife', 'hotels', 'adventure']

const categoryLabels = {
  beaches: 'Beaches', mountains: 'Mountains', cities: 'Cities',
  wildlife: 'Wildlife', hotels: 'Hotels', adventure: 'Adventure',
}

export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  const filtered = filter === 'all' ? allImages : allImages.filter(img => img.category === filter)

  const openLightbox = (index) => setLightbox({ open: true, index })
  const closeLightbox = () => setLightbox({ open: false, index: 0 })

  const prev = useCallback(() => {
    setLightbox(lb => ({ ...lb, index: (lb.index - 1 + filtered.length) % filtered.length }))
  }, [filtered.length])

  const next = useCallback(() => {
    setLightbox(lb => ({ ...lb, index: (lb.index + 1) % filtered.length }))
  }, [filtered.length])

  useEffect(() => {
    if (!lightbox.open) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox.open, prev, next])

  const currentImg = filtered[lightbox.index]

  return (
    <>
      <PageHero
        image="/images/hero-main.jpg"
        breadcrumb="Gallery"
        title={<>Travel Moments <span style={{ color: '#0EA5E9' }}>Gallery</span></>}
        subtitle="A visual journey through the world's most beautiful destinations captured by our travelers."
      />

      {/* ── GALLERY ── */}
      <section className="py-5" aria-label="Photo gallery">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-camera me-2"></i>Gallery</span>
            <h2 className="section-title reveal">Captured <span>Moments</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">Stunning travel photography from destinations around the world</p>
          </div>

          {/* Filter Tabs */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5 reveal" role="tablist" aria-label="Gallery categories">
            {filterOptions.map(opt => (
              <button
                key={opt}
                className={`filter-tab${filter === opt ? ' active' : ''}`}
                onClick={() => setFilter(opt)}
                role="tab"
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>

          <div className="row g-3" id="galleryGrid">
            {filtered.map((item, i) => (
              <div className="col-lg-3 col-md-4 col-6 reveal" key={`${item.img}-${i}`}>
                <div
                  className="gallery-item"
                  onClick={() => openLightbox(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.title}`}
                  onKeyDown={e => e.key === 'Enter' && openLightbox(i)}
                >
                  <img src={`/images/${item.img}`} alt={item.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <div className="gallery-zoom"><i className="fas fa-search-plus"></i></div>
                    <div className="gallery-info">
                      <h6>{item.title}</h6>
                      <span>{categoryLabels[item.category]}</span>
                    </div>
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
            <h2 className="reveal">Your Journey <span style={{ color: '#0EA5E9' }}>Could Be Next</span></h2>
            <p className="reveal">Inspired by what you've seen? Let us craft the perfect trip and add your memories to our gallery.</p>
            <div className="d-flex flex-wrap gap-3 justify-content-center reveal">
              <Link to="/packages" className="btn-primary-custom"><i className="fas fa-suitcase-rolling me-2"></i>Explore Packages</Link>
              <Link to="/contact" className="btn-secondary-custom"><i className="fas fa-paper-plane me-2"></i>Book Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox.open && currentImg && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Overlay */}
          <div
            onClick={closeLightbox}
            style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.96)', cursor: 'pointer' }}
          ></div>

          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close"
            style={{ position: 'fixed', top: '24px', right: '32px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1.5rem', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', zIndex: 2, lineHeight: 1 }}
          >&times;</button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
            style={{ position: 'fixed', top: '50%', left: '24px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.3rem', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', zIndex: 2 }}
          >&#8592;</button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
            style={{ position: 'fixed', top: '50%', right: '24px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.3rem', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', zIndex: 2 }}
          >&#8594;</button>

          {/* Image */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '90vw' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
              <img
                src={`/images/${currentImg.img}`}
                alt={currentImg.title}
                style={{ maxWidth: '85vw', maxHeight: '75vh', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <h5 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 4px', fontFamily: "'Playfair Display',serif" }}>{currentImg.title}</h5>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{categoryLabels[currentImg.category]}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
