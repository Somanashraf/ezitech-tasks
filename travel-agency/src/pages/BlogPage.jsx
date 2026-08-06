import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useAdmin } from '../admin/context/AdminContext'

export default function BlogPage() {
  const { blogs } = useAdmin()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  // Filter only Published blogs for the public site
  const publishedPosts = (blogs || []).filter(b => b.status === 'Published' || !b.status)

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

          {publishedPosts.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-newspaper mb-3" style={{ fontSize: '3rem', color: '#CBD5E1' }}></i>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }}>No Blog Articles Yet</h3>
              <p className="text-muted">Check back soon for new travel stories and guides!</p>
            </div>
          ) : (
            <div className="row g-4">
              {publishedPosts.map((post, i) => {
                const imgSrc = post.img?.startsWith('data:') || post.img?.startsWith('http') ? post.img : `/images/${post.img}`
                return (
                  <div className="col-lg-4 col-md-6 reveal" key={post.id || i}>
                    <article className="blog-card h-100">
                      <div className="blog-img">
                        <img src={imgSrc} alt={post.title} loading="lazy" />
                        <div className="blog-category">{post.category}</div>
                      </div>
                      <div className="blog-body">
                        <div className="blog-meta">
                          <span><i className="fas fa-user me-1"></i>{post.author}</span>
                          <span><i className="fas fa-calendar me-1"></i>{post.date}</span>
                          <span><i className="fas fa-clock me-1"></i>{post.read || '5 min read'}</span>
                        </div>
                        <h4 className="blog-title">{post.title}</h4>
                        <p className="blog-excerpt">{post.excerpt}</p>
                        <a href="#" className="blog-read-more" onClick={e => e.preventDefault()}>Read More <i className="fas fa-arrow-right ms-1"></i></a>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          )}
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
