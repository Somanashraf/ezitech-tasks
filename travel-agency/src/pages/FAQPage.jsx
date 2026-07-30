import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const faqsLeft = [
  { icon: 'fa-bookmark', q: 'How do I book a tour with WanderLux?', a: 'Booking with WanderLux is simple. Browse our packages or destinations, choose what interests you, then either fill in our online contact form or call us directly at +92 300 123 4567. One of our travel consultants will reach out within 24 hours to confirm details, customize your itinerary, and guide you through the secure payment process.' },
  { icon: 'fa-times-circle', q: 'Can I cancel my booking and get a refund?', a: 'Yes, cancellations are accepted. If you cancel more than 60 days before departure, you\'ll receive a full refund minus a small processing fee. Cancellations between 30–60 days receive a 50% refund. Cancellations within 30 days of departure are non-refundable, but we can often offer travel credits for future bookings.' },
  { icon: 'fa-dollar-sign', q: 'What is your refund policy?', a: 'Our refund policy varies depending on the package type and the time of cancellation. Standard packages follow a tiered refund schedule (60+ days: full refund; 30–60 days: 50%; under 30 days: no refund). Luxury and custom packages may have different terms. Refunds are processed within 7–14 business days.' },
  { icon: 'fa-plane', q: 'Does WanderLux include flights in packages?', a: 'Many of our packages include international flights, clearly marked as "Flights Included" on the package detail. For packages that don\'t include flights, we can arrange them at competitive rates and add them to your booking. We partner with major airlines to secure the best fares and timing.' },
  { icon: 'fa-shield-alt', q: 'Is travel insurance included?', a: 'Travel insurance is not automatically included but is strongly recommended and can be added to any booking. We partner with leading insurers to offer comprehensive coverage including trip cancellation, medical emergencies, lost luggage, and flight delays. Premiums start from as little as $3/day.' },
  { icon: 'fa-passport', q: 'Do I need a visa? Can you help?', a: 'Visa requirements depend on your nationality and the destination. Our team will advise you on exactly which visas are needed for your trip and provide detailed application guidance. For many popular destinations, we can assist with visa processing as part of our premium service. Always check requirements at least 8 weeks before travel.' },
  { icon: 'fa-route', q: 'Can I create a custom tour package?', a: "Absolutely! Custom tours are one of our specialties. Simply tell us your destination preferences, travel dates, budget, group size, and interests – and our expert consultants will design a fully bespoke itinerary from scratch. Custom packages can combine multiple destinations and are priced based on your specific requirements." },
  { icon: 'fa-credit-card', q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, bank wire transfers, and select buy-now-pay-later options. All payments are processed through our SSL-encrypted secure gateway. A 25% deposit is required to confirm your booking, with the remaining balance due 45 days before departure.' },
]

const faqsRight = [
  { icon: 'fa-child', q: 'Are packages suitable for children?', a: 'Yes! Many of our packages are family-friendly and designed with children in mind. We offer dedicated family packages with age-appropriate activities, family accommodation, and flexible pacing. Children under 12 typically receive discounts of 20–30%. Please mention ages of children when booking so we can tailor the itinerary accordingly.' },
  { icon: 'fa-users', q: 'Do you offer group discounts?', a: 'Yes, we love group travel! Groups of 8 or more receive a minimum 10% discount. Groups of 15+ receive 15% off, and larger groups of 25+ can negotiate even greater savings. We also offer complimentary spaces for group leaders on qualifying group bookings. Contact us directly for a group quote.' },
  { icon: 'fa-headset', q: 'Is 24/7 support available during travel?', a: 'Absolutely. All WanderLux travelers have access to our dedicated 24/7 emergency support line during their trip. You\'ll also have direct contact with your personal travel coordinator. Whether it\'s a missed flight, a hotel issue, or a medical concern, our team is always just one call away.' },
  { icon: 'fa-calendar-alt', q: 'Can I change my travel dates after booking?', a: 'Date changes are possible subject to availability and may incur a modification fee starting at $50 per person. Changes requested more than 60 days before departure are usually accommodated free of charge. Changes within 30 days of departure depend entirely on availability and may involve fare differences.' },
  { icon: 'fa-file-alt', q: 'What documents do I need for travel?', a: "At minimum, you'll need a valid passport (with at least 6 months validity beyond your return date). Depending on the destination, you may also need a visa, travel insurance certificate, vaccination records, and a return flight booking. Your WanderLux consultant will provide a complete personalized document checklist before departure." },
  { icon: 'fa-clock', q: 'How far in advance should I book?', a: 'We recommend booking at least 3–6 months in advance for peak season travel (June–August and December–January). Popular destinations like the Maldives, Santorini, and the Swiss Alps sell out fast during high season. Last-minute bookings (within 4 weeks) are possible for some destinations and may offer flash discounts.' },
  { icon: 'fa-utensils', q: 'Are meals included in tour packages?', a: 'Meal inclusions vary by package and are always clearly stated in the package details. Options range from breakfast only, to half-board, to full-board, to all-inclusive. Luxury and honeymoon packages often include romantic dinners and special dining experiences at no extra cost. Dietary requirements are always accommodated.' },
]

function AccordionItem({ icon, q, a, id, openId, setOpenId }) {
  const isOpen = openId === id
  return (
    <div className="accordion-item" style={{ border: 'none', borderRadius: '12px', marginBottom: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <h3 className="accordion-header">
        <button
          className={`accordion-button${isOpen ? '' : ' collapsed'}`}
          type="button"
          onClick={() => setOpenId(isOpen ? null : id)}
          aria-expanded={isOpen}
          style={{ fontWeight: 600, background: 'white', color: isOpen ? '#0EA5E9' : '#0F172A' }}
        >
          <i className={`fas ${icon} me-3`} style={{ color: '#0EA5E9' }}></i>
          {q}
        </button>
      </h3>
      {isOpen && (
        <div className="accordion-body" style={{ color: '#64748B', lineHeight: 1.9, padding: '4px 24px 24px', background: 'white' }}>
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [openId, setOpenId] = useState('left-0')

  return (
    <>
      <PageHero
        image="/images/hero-faq.jpg"
        breadcrumb="FAQ"
        title={<>Frequently Asked <span style={{ color: '#0EA5E9' }}>Questions</span></>}
        subtitle="Everything you need to know about booking, cancellations, travel requirements, and our services."
      />

      {/* ── FAQ SECTION ── */}
      <section className="py-5" aria-label="Frequently asked questions">
        <div className="container">
          <div className="section-header center">
            <span className="section-label"><i className="fas fa-question-circle me-2"></i>FAQ</span>
            <h2 className="section-title reveal">Got <span>Questions?</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle reveal">We've answered the most common questions to help you plan with confidence</p>
          </div>

          <div className="row g-4">
            {/* Left column */}
            <div className="col-lg-6 reveal-left">
              <div className="faq-accordion accordion">
                {faqsLeft.map((faq, i) => (
                  <AccordionItem
                    key={`left-${i}`}
                    id={`left-${i}`}
                    icon={faq.icon}
                    q={faq.q}
                    a={faq.a}
                    openId={openId}
                    setOpenId={setOpenId}
                  />
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="col-lg-6 reveal-right">
              <div className="accordion">
                {faqsRight.map((faq, i) => (
                  <AccordionItem
                    key={`right-${i}`}
                    id={`right-${i}`}
                    icon={faq.icon}
                    q={faq.q}
                    a={faq.a}
                    openId={openId}
                    setOpenId={setOpenId}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <div className="cta-content">
            <h2 className="reveal">Still Have <span style={{ color: '#0EA5E9' }}>Questions?</span></h2>
            <p className="reveal">Our friendly travel consultants are available to help you plan every detail of your perfect trip.</p>
            <div className="d-flex flex-wrap gap-3 justify-content-center reveal">
              <Link to="/contact" className="btn-primary-custom"><i className="fas fa-envelope me-2"></i>Contact Our Team</Link>
              <Link to="/packages" className="btn-secondary-custom"><i className="fas fa-suitcase me-2"></i>View Packages</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
