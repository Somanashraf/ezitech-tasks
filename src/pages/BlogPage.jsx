import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const posts = [
  { img: 'gal-travel.jpg', category: 'Destinations', author: 'Sarah Miles', date: 'Jan 15, 2026', read: '5 min read', title: 'Top 10 Places To Visit in 2026', excerpt: "Looking for your next big adventure? We've scoured the globe to bring you the most extraordinary destinations to add to your bucket list this year. From the dramatic fjords of Norway to the hidden temples of Cambodia, 2026 promises a world of discovery for curious travelers willing to explore beyond the familiar." },
  { img: 'gal-travel.jpg', category: 'Tips', author: 'James Park', date: 'Feb 3, 2026', read: '5 min read', title: 'The Ultimate Budget Travel Guide', excerpt: "Traveling the world doesn't have to drain your savings. With the right strategies, you can explore stunning destinations, stay in comfortable accommodation, eat delicious local food, and have incredible experiences – all without breaking the bank. Discover our tried-and-tested budget travel secrets." },
  { img: 'blog-packing.jpg', category: 'Travel Tips', author: 'Emma Walsh', date: 'Feb 20, 2026', read: '5 min read', title: 'Complete Packing Guide for Long Trips', excerpt: 'Packing for a long trip is an art form that takes practice to master. Too much and you\'re weighed down; too little and you\'ll be shopping in every city. Our comprehensive packing guide walks you through everything from choosing the right luggage to creating a foolproof checklist.' },
  { img: 'dest-maldives.jpg', category: 'Romance', author: 'Maria Costa', date: 'Mar 5, 2026', read: '5 min read', title: 'Best Honeymoon Destinations 2026', excerpt: 'Your honeymoon should be the most magical trip of your life, and choosing the right destination sets the tone for your journey together. From the overwater bungalows of the Maldives to the cliffside villages of Santorini, we\'ve curated the most breathtakingly romantic destinations.' },
  { img: 'blog-solo.jpg', category: 'Solo Travel', author: 'Alex Kim', date: 'Mar 18, 2026', read: '5 min read', title: "The Solo Traveler's Complete Guide", excerpt: "Solo travel is one of the most empowering experiences a person can have. It builds confidence, independence, and a profound sense of self-discovery. Whether you're a first-time solo adventurer or a seasoned independent explorer, this guide covers safety, social strategies, and budgeting." },
  { img: 'dest-bali.jpg', category: 'Family', author: 'David Santos', date: 'Apr 2, 2026', read: '5 min read', title: 'Family Vacation Ideas That Everyone Loves', excerpt: "Planning a family vacation that genuinely excites everyone from toddlers to grandparents is a true challenge. The key is finding destinations that offer a rich mix of activities, educational experiences, and downtime. We've handpicked our favorite family-friendly destinations." },
  { img: 'pkg-swiss.jpg', category: 'Adventure', author: 'Tom Reed', date: 'Apr 15, 2026', read: '5 min read', title: 'Adventure Travel: Pushing Your Limits', excerpt: "Adventure travel isn't just about the physical thrill – it's about confronting your fears, discovering hidden strengths, and experiencing the world in a raw and unfiltered way. From trekking through the Himalayas to white-water rafting the Amazon, we explore the world's most exhilarating adventures." },
  { img: 'dest-paris.jpg', category: 'Europe', author: 'Sophie Laurent', date: 'May 1, 2026', read: '5 min read', title: 'Best Time to Visit Europe: Month by Month', excerpt: 'Europe is a year-round destination but knowing the best time to visit each country can make an enormous difference to your experience. From the tulip fields of Holland in spring to the Christmas markets of Germany in winter, each month brings its own unique magic.' },
]

export default function BlogPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3500)
    }, 1800)
  }

  return (
    <>
      <PageHero
        image="/images/hero-packages.jpg"
        breadcrumb="Blog"
        title={<>Travel Tips &amp; <span style={{ color: '#0EA5E9' }}>Inspiration</span></>}
        subtitle="Expert travel guides, tips, and stories to fuel your wanderlust and help you travel smarter."
      />

      {/* ── BLOG POSTS ── */}
      <section className="py-5" aria-label="Blog articles">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-pen-nib me-2"></i>Latest Posts</span>
            <h2 className="section-title reveal">Travel Stories &amp; <span>Expert Guides</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">Stay inspired with tips, guides, and insights from our travel experts</p>
          </div>
          <div className="row g-4">
            {posts.map((post, i) => (
              <div className="col-lg-4 col-md-6 reveal" key={i}>
                <article className="blog-card">
                  <div className="blog-img">
                    <img src={`/images/${post.img}`} alt={post.title} loading="lazy" />
                    <div className="blog-category">{post.category}</div>
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span><i className="fas fa-user me-1"></i>{post.author}</span>
                      <span><i className="fas fa-calendar me-1"></i>{post.date}</span>
                      <span><i className="fas fa-clock me-1"></i>{post.read}</span>
                    </div>
                    <h4 className="blog-title">{post.title}</h4>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <a href="#" className="blog-read-more">Read More <i className="fas fa-arrow-right ms-1"></i></a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-5 bg-alt" aria-label="Newsletter">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center reveal">
              <span className="section-label"><i className="fas fa-envelope me-2"></i>Newsletter</span>
              <h2 className="section-title">Never Miss A <span>Travel Story</span></h2>
              <div className="section-divider"></div>
              <p className="section-subtitle mb-5">
                Subscribe to our newsletter and get the latest travel tips, exclusive deals, and destination
                guides delivered straight to your inbox every week.
              </p>
              <form
                className="d-flex flex-column flex-sm-row gap-3 justify-content-center"
                onSubmit={handleSubmit}
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ maxWidth: '400px', borderRadius: '50px', padding: '14px 24px', fontSize: '1rem', border: '2px solid rgba(14,165,233,0.3)' }}
                />
                <button
                  type="submit"
                  className="btn-primary-custom"
                  style={{ whiteSpace: 'nowrap' }}
                  disabled={status === 'sending'}
                >
                  {status === 'sent'
                    ? <><i className="fas fa-check me-2"></i>Subscribed!</>
                    : status === 'sending'
                    ? <><i className="fas fa-spinner fa-spin me-2"></i>Sending...</>
                    : <><i className="fas fa-paper-plane me-2"></i>Subscribe Now</>
                  }
                </button>
              </form>
              <p className="mt-3" style={{ color: '#64748B', fontSize: '0.88rem' }}>
                <i className="fas fa-lock me-1"></i>No spam, ever. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
