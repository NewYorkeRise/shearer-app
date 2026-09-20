import { useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  MoveUpRight,
  Play,
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
  { label: 'About Vanesa', href: '#about' },
  { label: 'Questions', href: '#questions' },
]

const benefits = [
  'Move with less tension',
  'Build strength and flexibility',
  'Calm your mind',
  'Reconnect with yourself',
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
      'Vanesa offers private sessions in a comfortable space or can coordinate a location that works for you. Reach out and we will find the right fit.',
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
    setSubmitted(true)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Yoga With Vanesa home">
          <span className="brand-mark">YWV</span>
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
            <p className="kicker"><Sparkles size={15} /> PERSONALIZED YOGA FOR REAL LIFE</p>
            <h1>Feel more at home in your body.</h1>
            <p className="hero-lede">
              Private yoga for people who want to feel better—not just get through another workout.
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
              <p><strong>A practice that meets you where you are.</strong><br />One-on-one or small-group sessions.</p>
            </div>
          </div>

          <div className="hero-art" aria-label="A person practicing yoga outdoors">
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85"
                alt="Woman practicing yoga in a sunlit studio"
              />
            </div>
            <div className="hero-note-card">
              <span className="mini-line" />
              <p>Slow down.<br /><em>Tune in.</em></p>
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
            <p className="large-copy">Maybe you don’t need another yoga class where you walk in, follow the teacher, and walk out.</p>
            <p>Maybe you need yoga that actually meets you where you are. Private yoga gives us the space to personalize your practice around your body, your needs, your goals, and how you’re feeling that day.</p>
            <a href="#about" className="round-link" aria-label="Learn more about Vanesa"><ArrowRight size={19} /></a>
          </div>
        </section>

        <section className="benefits-section">
          <div className="benefits-image">
            <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85" alt="Yoga mat and wellness accessories" />
            <div className="image-caption">A supportive, judgment-free practice.</div>
          </div>
          <div className="benefits-copy">
            <p className="kicker">MADE FOR YOU</p>
            <h2>More than a class.<br /><em>A relationship with yourself.</em></h2>
            <p>Whether you are looking to move with less tension, build strength and flexibility, calm your mind, or simply feel better in your body—your practice is designed specifically for you.</p>
            <div className="benefit-list">
              {benefits.map((benefit) => (
                <div className="benefit-item" key={benefit}><span><Check size={14} /></span>{benefit}</div>
              ))}
            </div>
            <button className="button button-outline" onClick={openBooking}>Find your practice <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="offerings-section">
          <div className="offerings-heading">
            <div>
              <p className="kicker">WAYS TO PRACTICE</p>
              <h2>Come as you are.</h2>
            </div>
            <p>Every session is intentional, grounded, and built around what your body needs now.</p>
          </div>
          <div className="offerings-grid">
            <article className="offering-card featured">
              <div className="offering-number">01</div>
              <h3>One-on-one<br />private yoga</h3>
              <p>A practice built around your body, energy, goals, and the season of life you are in.</p>
              <button className="card-arrow" onClick={openBooking} aria-label="Book one-on-one private yoga"><ArrowRight size={18} /></button>
            </article>
            <article className="offering-card">
              <div className="offering-number">02</div>
              <h3>Small group<br />sessions</h3>
              <p>Bring your people. Create a private experience for your partner, family, friends, or team.</p>
              <button className="card-arrow" onClick={openBooking} aria-label="Book a small group session"><ArrowRight size={18} /></button>
            </article>
            <article className="offering-card photo-card">
              <img src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=900&q=85" alt="Yoga practice in a warm room" />
              <div className="photo-card-overlay"><Play size={16} fill="currentColor" /> See the feeling</div>
            </article>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-image-wrap">
            <img src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1000&q=85" alt="Yoga instructor sitting in meditation" />
            <div className="about-badge">WITH<br /><span>VANESA</span></div>
          </div>
          <div className="about-copy">
            <p className="kicker">MEET VANESA</p>
            <h2>There is no perfect<br /><em>way to practice.</em></h2>
            <p>Yoga is a way to listen—to your body, your breath, and the parts of you that get quiet when life gets loud.</p>
            <p>Vanesa creates space for you to slow down, tune in, and build a practice that feels supportive instead of performative. No pressure to keep up. No judgment. Just a thoughtful place to begin.</p>
            <div className="signature">Vanesa <span>♡</span></div>
            <a className="text-link" href="#questions">More questions? <MoveUpRight size={16} /></a>
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-mark">“</div>
          <blockquote>I left feeling lighter—not because I did the hardest workout, but because I finally had space to hear myself.</blockquote>
          <p>— PRIVATE SESSION CLIENT</p>
        </section>

        <section className="faq-section" id="questions">
          <div className="faq-heading">
            <p className="kicker">GOOD TO KNOW</p>
            <h2>Questions,<br /><em>answered.</em></h2>
            <p>Still curious? Send a note and Vanesa will help you find the right place to start.</p>
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
            <p>Come exactly as you are. We will take it from there.</p>
            <button className="button button-light" onClick={openBooking}>Book a private session <ArrowRight size={17} /></button>
          </div>
          <div className="closing-graphic" aria-hidden="true"><div className="closing-circle"><span>YOGA<br />WITH<br /><em>VANESA</em></span></div></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-mark">YWV</span><strong>YogaWithVanesa</strong></div>
        <p>Private yoga for your body, mind, and spirit.</p>
        <div className="footer-links"><a href="#top">Back to top ↑</a><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Share2 size={18} /></a></div>
      </footer>

      {bookingOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false) }}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking form"><X size={20} /></button>
            {!submitted ? (
              <>
                <p className="kicker">LET’S CONNECT</p>
                <h2 id="booking-title">Find your way<br /><em>to practice.</em></h2>
                <p className="modal-intro">Tell Vanesa a little about what you are looking for. This is the first step, not a commitment.</p>
                <form onSubmit={submitBooking}>
                  <label>Name<input required value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Your name" /></label>
                  <label>Email<input required type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} placeholder="you@example.com" /></label>
                  <label>What are you interested in?
                    <select value={form.session} onChange={(event) => updateForm('session', event.target.value)}>
                      <option>One-on-one session</option><option>Small group session</option><option>Not sure yet</option>
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
                <p>Vanesa will be in touch soon. Until then, take one slow breath for yourself.</p>
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
