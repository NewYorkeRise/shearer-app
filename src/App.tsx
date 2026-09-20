import { useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  MoveUpRight,
  Share2,
  Sparkles,
  X,
} from 'lucide-react'
import './App.css'

type BookingForm = {
  name: string
  email: string
  session: string
  note: string
}

const navItems = [
  { label: 'The experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Vanesa', href: '#about' },
  { label: 'Questions', href: '#questions' },
]

const benefits = [
  'Move with less tension',
  'Build strength and flexibility',
  'Calm your mind',
  'Reconnect with yourself',
  'Build resilience',
  'Practice with more awareness',
]

const contactEmail = 'info@yogawithvanesa.com'
const sourceLogo = 'https://yogawithvanesa.com/wp-content/uploads/2022/04/Logo.png'

const galleryImages = [
  {
    src: 'https://yogawithvanesa.com/wp-content/uploads/2022/12/8F006821-B151-4F8F-A743-BB74D44671DB-2048x2048.jpg',
    alt: 'Vanesa practicing yoga outdoors',
  },
  {
    src: 'https://yogawithvanesa.com/wp-content/uploads/2024/11/1491C355-6B90-470D-A0A5-470D140E6770.png',
    alt: 'YogaWithVanesa class image',
  },
  {
    src: 'https://yogawithvanesa.com/wp-content/uploads/2023/05/4714C3F7-8959-477B-8DF6-61F1773C6DFC.png',
    alt: 'YogaWithVanesa practice image',
  },
  {
    src: 'https://yogawithvanesa.com/wp-content/uploads/2022/05/8.jpg',
    alt: 'Vanesa teaching an outdoor yoga class',
  },
  {
    src: 'https://yogawithvanesa.com/wp-content/uploads/2023/06/IMG_6834-scaled-e1686454809505-1024x797.jpeg',
    alt: 'Group yoga practice outdoors',
  },
  {
    src: 'https://yogawithvanesa.com/wp-content/uploads/2022/12/IMG_3728_Original.jpg',
    alt: 'Yoga movement and meditation',
  },
  {
    src: 'https://yogawithvanesa.com/wp-content/uploads/2022/12/IMG_4771-1024x768.jpg',
    alt: 'Yoga class with Vanesa',
  },
  {
    src: 'https://yogawithvanesa.com/wp-content/uploads/2022/12/IMG_3686.jpg',
    alt: 'YogaWithVanesa outdoor practice',
  },
]

const faqs = [
  {
    question: 'Do I need to be experienced in yoga?',
    answer:
      'Not at all. Sessions are shaped around where you are today, whether you are completely new to yoga or returning to your practice.',
  },
  {
    question: 'Where do private sessions take place?',
    answer:
      'Vanesa offers in-home and outdoor sessions, with the location coordinated around what works best for you and your group.',
  },
  {
    question: 'Can I book a session for a small group?',
    answer:
      'Yes. Private sessions can be created for partners, friends, family, or a small group that wants to practice together.',
  },
  {
    question: 'What should I bring?',
    answer:
      'Wear clothes you can move in and bring water. A mat is helpful, but the most important thing is simply arriving as you are.',
  },
  {
    question: 'Can yoga support a workplace or event?',
    answer:
      'Yes. YogaWithVanesa can create customized event and corporate yoga sessions that support wellness, connection, and a calmer workday.',
  },
]

const initialForm: BookingForm = { name: '', email: '', session: 'One-on-one session', note: '' }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<BookingForm>(initialForm)
  const [openFaq, setOpenFaq] = useState(0)

  const openBooking = () => {
    setMenuOpen(false)
    setSubmitted(false)
    setBookingOpen(true)
  }

  const updateForm = (field: keyof BookingForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const submitBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`YogaWithVanesa inquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nInterested in: ${form.session}\n\n${form.note}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Yoga With Vanesa home">
          <img className="brand-logo" src={sourceLogo} alt="" />
          <span className="brand-copy">
            <strong>YogaWithVanesa</strong>
            <small>PRIVATE YOGA</small>
          </span>
        </a>

        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <button className="nav-cta" onClick={openBooking}>
            Book a session <ArrowRight size={16} />
          </button>
        </nav>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="kicker"><Sparkles size={15} /> IN-HOME • OUTDOOR • PRIVATE YOGA</p>
            <h1>Feel more at home in your body.</h1>
            <p className="hero-lede">
              Your practice. Your pace. Your space. Personalized yoga for people who want to feel better—not just get through another workout.
            </p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={openBooking}>
                Start a conversation <ArrowRight size={17} />
              </button>
              <a className="text-link" href="#experience">
                Explore the experience <MoveUpRight size={16} />
              </a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars" aria-hidden="true">
                <span>J</span><span>M</span><span>A</span>
              </div>
              <p><strong>5+ years of teaching experience.</strong><br />One-on-one, small-group, and event sessions.</p>
            </div>
          </div>

          <div className="hero-art" aria-label="A person practicing yoga outdoors">
            <div className="hero-image-wrap">
              <img
                src="https://yogawithvanesa.com/wp-content/uploads/2022/12/8F006821-B151-4F8F-A743-BB74D44671DB-2048x2048.jpg"
                alt="Vanesa practicing yoga outdoors"
              />
            </div>
            <div className="hero-note-card">
              <span className="mini-line" />
              <p>Your pace.<br /><em>Your space.</em></p>
            </div>
            <div className="hero-stamp"><span>YOUR BODY</span><strong>YOUR<br />PRACTICE</strong></div>
            <div className="hero-sun" />
          </div>
        </section>

        <section className="statement-section" id="experience">
          <div className="section-intro">
            <p className="kicker">THE EXPERIENCE</p>
            <h2>Your yoga.<br /><em>Your way.</em></h2>
          </div>
          <div className="statement-copy">
            <p className="large-copy">Yoga is a spiritual discipline and a subtle science that brings harmony between mind and body.</p>
            <p>Build strength and awareness, honor your body, and clear your mind with gentle intentional movement and deep breathing. Each session is shaped around your needs, goals, energy, and how you are feeling that day.</p>
            <a href="#about" className="round-link" aria-label="Learn more about Vanesa"><ArrowRight size={19} /></a>
          </div>
        </section>

        <section className="benefits-section">
          <div className="benefits-image">
            <img src="https://yogawithvanesa.com/wp-content/uploads/2023/06/IMG_6834-scaled-e1686454809505-1024x797.jpeg" alt="Group yoga practice outdoors" />
            <div className="image-caption">A supportive, judgment-free practice.</div>
          </div>
          <div className="benefits-copy">
            <p className="kicker">MADE FOR YOU</p>
            <h2>More than a class.<br /><em>A relationship with yourself.</em></h2>
            <p>Yoga is a way to train the body and tune the mind—to self-observe, gain awareness, and create more resilience in everyday life.</p>
            <div className="benefit-list">
              {benefits.map((benefit) => (
                <div className="benefit-item" key={benefit}><span><Check size={14} /></span>{benefit}</div>
              ))}
            </div>
            <button className="button button-outline" onClick={openBooking}>Find your practice <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="offerings-section" id="services">
          <div className="offerings-heading">
            <div>
              <p className="kicker">WAYS TO PRACTICE</p>
              <h2>Come as you are.</h2>
            </div>
            <p>Customized sessions for your individual needs, your people, your event, or your workplace.</p>
          </div>
          <div className="offerings-grid">
            <article className="offering-card featured">
              <div className="offering-number">01</div>
              <h3>One-on-one<br />private yoga</h3>
              <p>Personalized attention for your body, energy, goals, and the season of life you are in.</p>
              <button className="card-arrow" onClick={openBooking} aria-label="Book one-on-one private yoga"><ArrowRight size={18} /></button>
            </article>
            <article className="offering-card">
              <div className="offering-number">02</div>
              <h3>Semi-private<br />sessions</h3>
              <p>Practice with a partner, friends, family, or a small group in a welcoming, judgment-free space.</p>
              <button className="card-arrow" onClick={openBooking} aria-label="Book a semi-private session"><ArrowRight size={18} /></button>
            </article>
            <article className="offering-card">
              <div className="offering-number">03</div>
              <h3>Yoga for<br />events</h3>
              <p>Create a memorable yoga experience for a larger group of friends, colleagues, or community.</p>
              <button className="card-arrow" onClick={openBooking} aria-label="Book yoga for an event"><ArrowRight size={18} /></button>
            </article>
            <article className="offering-card featured">
              <div className="offering-number">04</div>
              <h3>Corporate<br />wellness</h3>
              <p>Support employee health, wellness, connection, and productivity with a customized yoga session.</p>
              <button className="card-arrow" onClick={openBooking} aria-label="Book corporate yoga"><ArrowRight size={18} /></button>
            </article>
          </div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="gallery-heading">
            <div>
              <p className="kicker">FROM THE PRACTICE</p>
              <h2>Move, breathe,<br /><em>be here.</em></h2>
            </div>
            <div className="gallery-intro">
              <p>Real moments from YogaWithVanesa classes, outdoor practices, and community gatherings.</p>
              <a className="text-link" href="https://www.instagram.com/yogawithvanesa/" target="_blank" rel="noreferrer">Follow on Instagram <MoveUpRight size={16} /></a>
            </div>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <a className={`gallery-item gallery-item-${index + 1}`} href={image.src} target="_blank" rel="noreferrer" key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span>YogaWithVanesa ↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-image-wrap">
            <img src="https://yogawithvanesa.com/wp-content/uploads/2022/12/IMG_6509-scaled-qwmlg95yyawwjx4598ai5n9c3qa45t8cg1l0w0goq4.jpeg" alt="Vanesa sitting in meditation" />
            <div className="about-badge">WITH<br /><span>VANESA</span></div>
          </div>
          <div className="about-copy">
            <p className="kicker">MEET VANESA</p>
            <h2>There is no perfect<br /><em>way to practice.</em></h2>
            <p>Vanesa has practiced yoga since 2012, when her first class turned her world upside down—literally and metaphorically. She learned a headstand and was hooked.</p>
            <p>After completing Yogalution Movement’s 200-hour Yoga Teacher Training in February 2019, she began leading group and private classes. Her teaching continues to grow through daily practice and ongoing education.</p>
            <p>Her goal is simple: share the countless ways yoga can support your body, mind, and spirit.</p>
            <div className="signature">Vanesa <span>♡</span></div>
            <a className="text-link" href="#questions">More questions? <MoveUpRight size={16} /></a>
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-mark">“</div>
          <blockquote>Build strength and awareness, honor your body, and clear your mind with gentle intentional movements combined with deep breathing.</blockquote>
          <p>— YOGAWITHVANESA</p>
        </section>

        <section className="faq-section" id="questions">
          <div className="faq-heading">
            <p className="kicker">GOOD TO KNOW</p>
            <h2>Questions,<br /><em>answered.</em></h2>
            <p>Still curious? Send a note and Vanesa will help you find the right place to start. You can also email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
            <button className="button button-dark" onClick={openBooking}>Say hello <ArrowRight size={17} /></button>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className={`faq-row ${openFaq === index ? 'is-open' : ''}`} key={faq.question}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                  <span>{faq.question}</span><ChevronDown size={19} />
                </button>
                {openFaq === index && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-content">
            <p className="kicker">YOUR NEXT STEP</p>
            <h2>Make a little<br /><em>space for yourself.</em></h2>
            <p>Come exactly as you are. We will take it from there. In-home, outdoor, and customized group sessions are available.</p>
            <button className="button button-light" onClick={openBooking}>Book a private session <ArrowRight size={17} /></button>
          </div>
          <div className="closing-graphic" aria-hidden="true"><div className="closing-circle"><span>YOGA<br />WITH<br /><em>VANESA</em></span></div></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><img className="brand-logo" src={sourceLogo} alt="" /><strong>YogaWithVanesa</strong></div>
        <p>Private yoga for your body, mind, and spirit.</p>
        <div className="footer-links"><a href="#top">Back to top ↑</a><a href={`mailto:${contactEmail}`}>{contactEmail}</a><a href="https://www.instagram.com/yogawithvanesa/" target="_blank" rel="noreferrer" aria-label="Instagram"><Share2 size={18} /></a></div>
      </footer>

      {bookingOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false) }}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking form"><X size={20} /></button>
            {!submitted ? (
              <>
                <p className="kicker">LET’S CONNECT</p>
                <h2 id="booking-title">Find your way<br /><em>to practice.</em></h2>
                <p className="modal-intro">Tell Vanesa a little about what you are looking for. Your email app will open with the inquiry addressed to {contactEmail}.</p>
                <form onSubmit={submitBooking}>
                  <label>Name<input required value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Your name" /></label>
                  <label>Email<input required type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} placeholder="you@example.com" /></label>
                  <label>What are you interested in?
                    <select value={form.session} onChange={(event) => updateForm('session', event.target.value)}>
                      <option>One-on-one session</option><option>Semi-private session</option><option>Yoga for an event</option><option>Corporate wellness</option><option>Not sure yet</option>
                    </select>
                  </label>
                  <label>Anything you want to share? <textarea value={form.note} onChange={(event) => updateForm('note', event.target.value)} placeholder="Goals, questions, or simply hello..." rows={3} /></label>
                  <button className="button button-dark form-submit" type="submit">Send inquiry <ArrowRight size={17} /></button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon"><Check size={24} /></div>
                <p className="kicker">MESSAGE RECEIVED</p>
                <h2>Thank you,<br /><em>{form.name || 'friend'}.</em></h2>
                <p>Your email draft should be ready. If it did not open, write directly to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
                <button className="button button-dark" onClick={() => setBookingOpen(false)}>Done <Check size={17} /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
