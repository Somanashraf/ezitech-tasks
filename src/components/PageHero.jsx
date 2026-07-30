import { Link } from 'react-router-dom'

export default function PageHero({ image, title, subtitle, breadcrumb }) {
  return (
    <section
      className="page-hero"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-label={`${breadcrumb} hero`}
    >
      <div className="hero-overlay"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-7 py-5">
            <div className="breadcrumb-nav mb-3">
              <Link to="/">Home</Link>
              <i className="fas fa-chevron-right"></i>
              <span>{breadcrumb}</span>
            </div>
            <h1 className="page-hero-title">{title}</h1>
            <p className="page-hero-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
