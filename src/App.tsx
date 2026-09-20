import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  House,
  Images,
  Languages,
  Menu,
  Moon,
  Monitor,
  MoveUpRight,
  Share2,
  Sparkles,
  Sun,
  UserRound,
  X,
} from 'lucide-react'
import './App.css'

type BookingForm = {
  name: string
  email: string
  session: string
  note: string
}

type Language = 'en' | 'es'
type ThemePreference = 'system' | 'light' | 'dark'

const navItems = [
  { key: 'home', href: '#top', icon: House },
  { key: 'services', href: '#services', icon: BriefcaseBusiness },
  { key: 'gallery', href: '#gallery', icon: Images },
  { key: 'about', href: '#about', icon: UserRound },
  { key: 'questions', href: '#questions', icon: CircleHelp },
] as const

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

const translations = {
  en: {
    nav: { home: 'Home', services: 'Services', gallery: 'Gallery', about: 'About Vanesa', questions: 'Questions', book: 'Book a session' },
    navShort: { home: 'Home', services: 'Services', gallery: 'Gallery', about: 'About', questions: 'FAQ' },
    theme: { label: 'Theme', system: 'System', light: 'Light', dark: 'Dark', aria: 'Change color theme' },
    language: { switchTo: 'Español', aria: 'Switch to Spanish' },
    hero: {
      kicker: 'IN-HOME • OUTDOOR • PRIVATE YOGA',
      title: 'Feel more at home in your body.',
      lede: 'Your practice. Your pace. Your space. Personalized yoga for people who want to feel better—not just get through another workout.',
      start: 'Start a conversation',
      explore: 'Explore the experience',
      proofTitle: '5+ years of teaching experience.',
      proofLine: 'One-on-one, small-group, and event sessions.',
      noteTop: 'Your pace.',
      noteBottom: 'Your space.',
      stampTop: 'YOUR BODY',
      stampFirst: 'YOUR',
      stampSecond: 'PRACTICE',
      imageAlt: 'Vanesa practicing yoga outdoors',
      artLabel: 'A person practicing yoga outdoors',
    },
    experience: {
      kicker: 'THE EXPERIENCE',
      titleFirst: 'Your yoga.',
      titleSecond: 'Your way.',
      lead: 'Yoga is a spiritual discipline and a subtle science that brings harmony between mind and body.',
      body: 'Build strength and awareness, honor your body, and clear your mind with gentle intentional movement and deep breathing. Each session is shaped around your needs, goals, energy, and how you are feeling that day.',
      learnAria: 'Learn more about Vanesa',
    },
    benefits: {
      kicker: 'MADE FOR YOU',
      titleFirst: 'More than a class.',
      titleSecond: 'A relationship with yourself.',
      body: 'Yoga is a way to train the body and tune the mind—to self-observe, gain awareness, and create more resilience in everyday life.',
      caption: 'A supportive, judgment-free practice.',
      button: 'Find your practice',
      imageAlt: 'Group yoga practice outdoors',
      list: ['Move with less tension', 'Build strength and flexibility', 'Calm your mind', 'Reconnect with yourself', 'Build resilience', 'Practice with more awareness'],
    },
    services: {
      kicker: 'WAYS TO PRACTICE',
      title: 'Come as you are.',
      intro: 'Customized sessions for your individual needs, your people, your event, or your workplace.',
      cards: [
        { titleFirst: 'One-on-one', titleSecond: 'private yoga', body: 'Personalized attention for your body, energy, goals, and the season of life you are in.', aria: 'Book one-on-one private yoga' },
        { titleFirst: 'Semi-private', titleSecond: 'sessions', body: 'Practice with a partner, friends, family, or a small group in a welcoming, judgment-free space.', aria: 'Book a semi-private session' },
        { titleFirst: 'Yoga for', titleSecond: 'events', body: 'Create a memorable yoga experience for a larger group of friends, colleagues, or community.', aria: 'Book yoga for an event' },
        { titleFirst: 'Corporate', titleSecond: 'wellness', body: 'Support employee health, wellness, connection, and productivity with a customized yoga session.', aria: 'Book corporate yoga' },
      ],
    },
    gallery: {
      kicker: 'FROM THE PRACTICE',
      titleFirst: 'Move, breathe,',
      titleSecond: 'be here.',
      intro: 'Real moments from YogaWithVanesa classes, outdoor practices, and community gatherings.',
      follow: 'Follow on Instagram',
      label: 'YogaWithVanesa ↗',
    },
    about: {
      kicker: 'MEET VANESA',
      titleFirst: 'There is no perfect',
      titleSecond: 'way to practice.',
      paragraphs: [
        'Vanesa has practiced yoga since 2012, when her first class turned her world upside down—literally and metaphorically. She learned a headstand and was hooked.',
        'After completing Yogalution Movement’s 200-hour Yoga Teacher Training in February 2019, she began leading group and private classes. Her teaching continues to grow through daily practice and ongoing education.',
        'Her goal is simple: share the countless ways yoga can support your body, mind, and spirit.',
      ],
      more: 'More questions?',
      imageAlt: 'Vanesa sitting in meditation',
    },
    quote: 'Build strength and awareness, honor your body, and clear your mind with gentle intentional movements combined with deep breathing.',
    faq: {
      kicker: 'GOOD TO KNOW',
      titleFirst: 'Questions,',
      titleSecond: 'answered.',
      intro: 'Still curious? Send a note and Vanesa will help you find the right place to start. You can also email',
      button: 'Say hello',
      items: [
        { question: 'Do I need to be experienced in yoga?', answer: 'Not at all. Sessions are shaped around where you are today, whether you are completely new to yoga or returning to your practice.' },
        { question: 'Where do private sessions take place?', answer: 'Vanesa offers in-home and outdoor sessions, with the location coordinated around what works best for you and your group.' },
        { question: 'Can I book a session for a small group?', answer: 'Yes. Private sessions can be created for partners, friends, family, or a small group that wants to practice together.' },
        { question: 'What should I bring?', answer: 'Wear clothes you can move in and bring water. A mat is helpful, but the most important thing is simply arriving as you are.' },
        { question: 'Can yoga support a workplace or event?', answer: 'Yes. YogaWithVanesa can create customized event and corporate yoga sessions that support wellness, connection, and a calmer workday.' },
      ],
    },
    closing: {
      kicker: 'YOUR NEXT STEP',
      titleFirst: 'Make a little',
      titleSecond: 'space for yourself.',
      body: 'Come exactly as you are. We will take it from there. In-home, outdoor, and customized group sessions are available.',
      button: 'Book a private session',
    },
    footer: 'Private yoga for your body, mind, and spirit.',
    form: {
      kicker: 'LET’S CONNECT',
      titleFirst: 'Find your way',
      titleSecond: 'to practice.',
      intro: 'Tell Vanesa a little about what you are looking for. Your email app will open with the inquiry addressed to',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      interest: 'What are you interested in?',
      options: ['One-on-one session', 'Semi-private session', 'Yoga for an event', 'Corporate wellness', 'Not sure yet'],
      note: 'Anything you want to share?',
      notePlaceholder: 'Goals, questions, or simply hello...',
      submit: 'Send inquiry',
      successKicker: 'MESSAGE RECEIVED',
      successTitle: 'Thank you,',
      successBody: 'Your email draft should be ready. If it did not open, write directly to',
      done: 'Done',
    },
  },
  es: {
    nav: { home: 'Inicio', services: 'Servicios', gallery: 'Galería', about: 'Sobre Vanesa', questions: 'Preguntas', book: 'Reservar sesión' },
    navShort: { home: 'Inicio', services: 'Servicios', gallery: 'Galería', about: 'Sobre', questions: 'FAQ' },
    theme: { label: 'Tema', system: 'Sistema', light: 'Claro', dark: 'Oscuro', aria: 'Cambiar tema de color' },
    language: { switchTo: 'English', aria: 'Cambiar a inglés' },
    hero: {
      kicker: 'YOGA EN CASA • AL AIRE LIBRE • PRIVADO',
      title: 'Siéntete más en casa en tu cuerpo.',
      lede: 'Tu práctica. Tu ritmo. Tu espacio. Yoga personalizado para sentirte mejor, no solo para terminar otro entrenamiento.',
      start: 'Comenzar una conversación',
      explore: 'Conoce la experiencia',
      proofTitle: 'Más de 5 años de experiencia.',
      proofLine: 'Sesiones individuales, para grupos pequeños y eventos.',
      noteTop: 'Tu ritmo.',
      noteBottom: 'Tu espacio.',
      stampTop: 'TU CUERPO',
      stampFirst: 'TU',
      stampSecond: 'PRÁCTICA',
      imageAlt: 'Vanesa practicando yoga al aire libre',
      artLabel: 'Una persona practicando yoga al aire libre',
    },
    experience: {
      kicker: 'LA EXPERIENCIA',
      titleFirst: 'Tu yoga.',
      titleSecond: 'A tu manera.',
      lead: 'El yoga es una disciplina espiritual y una ciencia sutil que crea armonía entre la mente y el cuerpo.',
      body: 'Desarrolla fuerza y conciencia, honra tu cuerpo y despeja tu mente con movimientos intencionales y respiración profunda. Cada sesión se adapta a tus necesidades, objetivos, energía y a cómo te sientes ese día.',
      learnAria: 'Conoce más sobre Vanesa',
    },
    benefits: {
      kicker: 'HECHO PARA TI',
      titleFirst: 'Más que una clase.',
      titleSecond: 'Una relación contigo.',
      body: 'El yoga entrena el cuerpo y afina la mente: te ayuda a observarte, ganar conciencia y crear más resiliencia para la vida diaria.',
      caption: 'Una práctica de apoyo y sin juicios.',
      button: 'Encuentra tu práctica',
      imageAlt: 'Práctica de yoga grupal al aire libre',
      list: ['Moverte con menos tensión', 'Desarrollar fuerza y flexibilidad', 'Calmar tu mente', 'Reconectar contigo', 'Crear resiliencia', 'Practicar con más conciencia'],
    },
    services: {
      kicker: 'FORMAS DE PRACTICAR',
      title: 'Ven tal como eres.',
      intro: 'Sesiones personalizadas para tus necesidades, tu gente, tu evento o tu lugar de trabajo.',
      cards: [
        { titleFirst: 'Yoga privado', titleSecond: 'individual', body: 'Atención personalizada para tu cuerpo, energía, objetivos y la etapa de vida en la que estás.', aria: 'Reservar yoga privado individual' },
        { titleFirst: 'Sesiones', titleSecond: 'semi-privadas', body: 'Practica con tu pareja, amigos, familia o un grupo pequeño en un espacio acogedor y sin juicios.', aria: 'Reservar una sesión semi-privada' },
        { titleFirst: 'Yoga para', titleSecond: 'eventos', body: 'Crea una experiencia de yoga especial para un grupo de amigos, colegas o tu comunidad.', aria: 'Reservar yoga para un evento' },
        { titleFirst: 'Bienestar', titleSecond: 'corporativo', body: 'Apoya la salud, el bienestar, la conexión y la productividad de tu equipo con yoga personalizado.', aria: 'Reservar yoga corporativo' },
      ],
    },
    gallery: {
      kicker: 'DE LA PRÁCTICA',
      titleFirst: 'Muévete, respira,',
      titleSecond: 'está presente.',
      intro: 'Momentos reales de las clases, prácticas al aire libre y encuentros comunitarios de YogaWithVanesa.',
      follow: 'Seguir en Instagram',
      label: 'YogaWithVanesa ↗',
    },
    about: {
      kicker: 'CONOCE A VANESA',
      titleFirst: 'No existe una forma perfecta',
      titleSecond: 'de practicar.',
      paragraphs: [
        'Vanesa practica yoga desde 2012, cuando su primera clase puso su mundo de cabeza, literalmente y metafóricamente. Aprendió a hacer una parada de cabeza y quedó encantada.',
        'Después de completar la formación de 200 horas para profesores de yoga de Yogalution Movement en febrero de 2019, comenzó a dirigir clases grupales y privadas. Su enseñanza sigue creciendo con la práctica diaria y la educación continua.',
        'Su objetivo es sencillo: compartir las muchas formas en que el yoga puede apoyar tu cuerpo, mente y espíritu.',
      ],
      more: '¿Tienes más preguntas?',
      imageAlt: 'Vanesa sentada en meditación',
    },
    quote: 'Desarrolla fuerza y conciencia, honra tu cuerpo y despeja tu mente con movimientos intencionales y respiración profunda.',
    faq: {
      kicker: 'BUENO SABERLO',
      titleFirst: 'Preguntas,',
      titleSecond: 'respuestas.',
      intro: '¿Todavía tienes dudas? Escribe a Vanesa y te ayudará a encontrar el mejor lugar para comenzar. También puedes escribir a',
      button: 'Saludar',
      items: [
        { question: '¿Necesito experiencia en yoga?', answer: 'Para nada. Las sesiones se adaptan a tu momento actual, tanto si eres nuevo en el yoga como si estás retomando tu práctica.' },
        { question: '¿Dónde se realizan las sesiones privadas?', answer: 'Vanesa ofrece sesiones en casa y al aire libre, coordinando el lugar según lo que funcione mejor para ti y tu grupo.' },
        { question: '¿Puedo reservar para un grupo pequeño?', answer: 'Sí. Podemos crear una sesión privada para tu pareja, amigos, familia o un grupo pequeño que quiera practicar juntos.' },
        { question: '¿Qué debo llevar?', answer: 'Usa ropa cómoda y lleva agua. Una esterilla ayuda, pero lo más importante es llegar tal como eres.' },
        { question: '¿El yoga puede apoyar a una empresa o evento?', answer: 'Sí. YogaWithVanesa crea sesiones personalizadas para eventos y empresas que apoyan el bienestar, la conexión y un día de trabajo más tranquilo.' },
      ],
    },
    closing: {
      kicker: 'TU SIGUIENTE PASO',
      titleFirst: 'Haz un poco de',
      titleSecond: 'espacio para ti.',
      body: 'Ven tal como eres. Desde ahí comenzamos. Hay sesiones en casa, al aire libre y grupos personalizados.',
      button: 'Reservar sesión privada',
    },
    footer: 'Yoga privado para tu cuerpo, mente y espíritu.',
    form: {
      kicker: 'CONECTEMOS',
      titleFirst: 'Encuentra tu forma',
      titleSecond: 'de practicar.',
      intro: 'Cuéntale a Vanesa qué estás buscando. Tu aplicación de correo abrirá un mensaje dirigido a',
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@ejemplo.com',
      interest: '¿Qué te interesa?',
      options: ['Sesión individual', 'Sesión semi-privada', 'Yoga para un evento', 'Bienestar corporativo', 'Todavía no estoy seguro/a'],
      note: '¿Quieres compartir algo?',
      notePlaceholder: 'Objetivos, preguntas o simplemente hola...',
      submit: 'Enviar consulta',
      successKicker: 'MENSAJE RECIBIDO',
      successTitle: 'Gracias,',
      successBody: 'Tu borrador de correo debería estar listo. Si no se abrió, escribe directamente a',
      done: 'Listo',
    },
  },
} as const

const initialForm: BookingForm = { name: '', email: '', session: '0', note: '' }

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en'
    return window.localStorage.getItem('ywv-language') === 'es' ? 'es' : 'en'
  })
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') return 'system'
    const stored = window.localStorage.getItem('ywv-theme')
    return stored === 'light' || stored === 'dark' ? stored : 'system'
  })
  const [systemPrefersDark, setSystemPrefersDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<BookingForm>(initialForm)
  const [openFaq, setOpenFaq] = useState(0)
  const copy = translations[language]
  const ThemeIcon = themePreference === 'dark' ? Moon : themePreference === 'light' ? Sun : Monitor

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const updateSystemTheme = () => setSystemPrefersDark(media.matches)
    updateSystemTheme()
    media.addEventListener?.('change', updateSystemTheme)
    return () => media.removeEventListener?.('change', updateSystemTheme)
  }, [])

  useEffect(() => {
    const activeTheme = themePreference === 'system' ? (systemPrefersDark ? 'dark' : 'light') : themePreference
    document.documentElement.dataset.theme = activeTheme
    window.localStorage.setItem('ywv-theme', themePreference)
  }, [systemPrefersDark, themePreference])

  useEffect(() => {
    window.localStorage.setItem('ywv-language', language)
  }, [language])

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
    const sessionLabel = copy.form.options[Number(form.session)] ?? form.session
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nInterested in: ${sessionLabel}\n\n${form.note}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const cycleTheme = () => {
    const options: ThemePreference[] = ['system', 'light', 'dark']
    setThemePreference((current) => options[(options.indexOf(current) + 1) % options.length])
  }

  const renderNavItem = (item: (typeof navItems)[number]) => {
    const NavIcon = item.icon
    return (
      <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
        <NavIcon className="nav-icon" size={18} strokeWidth={2} aria-hidden="true" />
        <span className="nav-label-long">{copy.nav[item.key]}</span>
        <span className="nav-label-short">{copy.navShort[item.key]}</span>
      </a>
    )
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${copy.nav.home} — Yoga With Vanesa`}>
          <img className="brand-logo" src={sourceLogo} alt="" />
          <span className="brand-copy">
            <strong>YogaWithVanesa</strong>
            <small>{language === 'es' ? 'YOGA PRIVADO' : 'PRIVATE YOGA'}</small>
          </span>
        </a>

        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}>
          {navItems.slice(0, 2).map(renderNavItem)}
          <button className="nav-cta" onClick={openBooking}>
            <CalendarDays className="nav-icon" size={18} strokeWidth={2} aria-hidden="true" />
            <span className="nav-label-long">{copy.nav.book}</span>
            <span className="nav-label-short">{language === 'es' ? 'Reservar' : 'Book'}</span>
            <ArrowRight className="nav-arrow" size={16} />
          </button>
          {navItems.slice(2).map(renderNavItem)}
        </nav>

        <div className="header-tools">
          <button className="language-toggle" onClick={() => setLanguage((current) => current === 'en' ? 'es' : 'en')} aria-label={copy.language.aria} title={copy.language.aria}>
            <Languages size={15} /> <span>{language === 'en' ? 'ES' : 'EN'}</span>
          </button>
          <button className="theme-toggle" onClick={cycleTheme} aria-label={copy.theme.aria} title={`${copy.theme.label}: ${copy.theme[themePreference]}`}>
            <ThemeIcon size={15} /> <span>{copy.theme[themePreference]}</span>
          </button>
        </div>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? (language === 'es' ? 'Cerrar menú' : 'Close menu') : (language === 'es' ? 'Abrir menú' : 'Open menu')}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="kicker"><Sparkles size={15} /> {copy.hero.kicker}</p>
            <h1>{copy.hero.title}</h1>
            <p className="hero-lede">{copy.hero.lede}</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={openBooking}>
                {copy.hero.start} <ArrowRight size={17} />
              </button>
              <a className="text-link" href="#experience">
                {copy.hero.explore} <MoveUpRight size={16} />
              </a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars" aria-hidden="true">
                <span>J</span><span>M</span><span>A</span>
              </div>
              <p><strong>{copy.hero.proofTitle}</strong><br />{copy.hero.proofLine}</p>
            </div>
          </div>

          <div className="hero-art" aria-label={copy.hero.artLabel}>
            <div className="hero-image-wrap">
              <img
                src="https://yogawithvanesa.com/wp-content/uploads/2022/12/8F006821-B151-4F8F-A743-BB74D44671DB-2048x2048.jpg"
                alt={copy.hero.imageAlt}
              />
            </div>
            <div className="hero-note-card">
              <span className="mini-line" />
              <p>{copy.hero.noteTop}<br /><em>{copy.hero.noteBottom}</em></p>
            </div>
            <div className="hero-stamp"><span>{copy.hero.stampTop}</span><strong>{copy.hero.stampFirst}<br />{copy.hero.stampSecond}</strong></div>
            <div className="hero-sun" />
          </div>
        </section>

        <section className="statement-section" id="experience">
          <div className="section-intro">
            <p className="kicker">{copy.experience.kicker}</p>
            <h2>{copy.experience.titleFirst}<br /><em>{copy.experience.titleSecond}</em></h2>
          </div>
          <div className="statement-copy">
            <p className="large-copy">{copy.experience.lead}</p>
            <p>{copy.experience.body}</p>
            <a href="#about" className="round-link" aria-label={copy.experience.learnAria}><ArrowRight size={19} /></a>
          </div>
        </section>

        <section className="benefits-section">
          <div className="benefits-image">
            <img src="https://yogawithvanesa.com/wp-content/uploads/2023/06/IMG_6834-scaled-e1686454809505-1024x797.jpeg" alt={copy.benefits.imageAlt} />
            <div className="image-caption">{copy.benefits.caption}</div>
          </div>
          <div className="benefits-copy">
            <p className="kicker">{copy.benefits.kicker}</p>
            <h2>{copy.benefits.titleFirst}<br /><em>{copy.benefits.titleSecond}</em></h2>
            <p>{copy.benefits.body}</p>
            <div className="benefit-list">
              {copy.benefits.list.map((benefit) => (
                <div className="benefit-item" key={benefit}><span><Check size={14} /></span>{benefit}</div>
              ))}
            </div>
            <button className="button button-outline" onClick={openBooking}>{copy.benefits.button} <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="offerings-section" id="services">
          <div className="offerings-heading">
            <div>
              <p className="kicker">{copy.services.kicker}</p>
              <h2>{copy.services.title}</h2>
            </div>
            <p>{copy.services.intro}</p>
          </div>
          <div className="offerings-grid">
            {copy.services.cards.map((card, index) => (
              <article className={`offering-card ${index === 0 || index === 3 ? 'featured' : ''}`} key={card.aria}>
                <div className="offering-number">{String(index + 1).padStart(2, '0')}</div>
                <h3>{card.titleFirst}<br />{card.titleSecond}</h3>
                <p>{card.body}</p>
                <button className="card-arrow" onClick={openBooking} aria-label={card.aria}><ArrowRight size={18} /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="gallery-heading">
            <div>
              <p className="kicker">{copy.gallery.kicker}</p>
              <h2>{copy.gallery.titleFirst}<br /><em>{copy.gallery.titleSecond}</em></h2>
            </div>
            <div className="gallery-intro">
              <p>{copy.gallery.intro}</p>
              <a className="text-link" href="https://www.instagram.com/yogawithvanesa/" target="_blank" rel="noreferrer">{copy.gallery.follow} <MoveUpRight size={16} /></a>
            </div>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <a className={`gallery-item gallery-item-${index + 1}`} href={image.src} target="_blank" rel="noreferrer" key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span>{copy.gallery.label}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-image-wrap">
            <img src="https://yogawithvanesa.com/wp-content/uploads/elementor/thumbs/IMG_6509-scaled-qwmlg95yyawwjx4598ai5n9c3qa45t8cg1l0w0goq4.jpeg" alt={copy.about.imageAlt} />
            <div className="about-badge">{language === 'es' ? 'CON' : 'WITH'}<br /><span>VANESA</span></div>
          </div>
          <div className="about-copy">
            <p className="kicker">{copy.about.kicker}</p>
            <h2>{copy.about.titleFirst}<br /><em>{copy.about.titleSecond}</em></h2>
            {copy.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="signature">Vanesa <span>♡</span></div>
            <a className="text-link" href="#questions">{copy.about.more} <MoveUpRight size={16} /></a>
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-mark">“</div>
          <blockquote>{copy.quote}</blockquote>
          <p>— YOGAWITHVANESA</p>
        </section>

        <section className="faq-section" id="questions">
          <div className="faq-heading">
            <p className="kicker">{copy.faq.kicker}</p>
            <h2>{copy.faq.titleFirst}<br /><em>{copy.faq.titleSecond}</em></h2>
            <p>{copy.faq.intro} <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
            <button className="button button-dark" onClick={openBooking}>{copy.faq.button} <ArrowRight size={17} /></button>
          </div>
          <div className="faq-list">
            {copy.faq.items.map((faq, index) => (
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
            <p className="kicker">{copy.closing.kicker}</p>
            <h2>{copy.closing.titleFirst}<br /><em>{copy.closing.titleSecond}</em></h2>
            <p>{copy.closing.body}</p>
            <button className="button button-light" onClick={openBooking}>{copy.closing.button} <ArrowRight size={17} /></button>
          </div>
          <div className="closing-graphic" aria-hidden="true"><div className="closing-circle"><span>YOGA<br />WITH<br /><em>VANESA</em></span></div></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><img className="brand-logo" src={sourceLogo} alt="" /><strong>YogaWithVanesa</strong></div>
        <p>{copy.footer}</p>
        <div className="footer-links"><a href="#top">{language === 'es' ? 'Volver arriba ↑' : 'Back to top ↑'}</a><a href={`mailto:${contactEmail}`}>{contactEmail}</a><a href="https://www.instagram.com/yogawithvanesa/" target="_blank" rel="noreferrer" aria-label="Instagram"><Share2 size={18} /></a></div>
      </footer>

      {bookingOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false) }}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <button className="modal-close" onClick={() => setBookingOpen(false)} aria-label={language === 'es' ? 'Cerrar formulario' : 'Close booking form'}><X size={20} /></button>
            {!submitted ? (
              <>
                <p className="kicker">{copy.form.kicker}</p>
                <h2 id="booking-title">{copy.form.titleFirst}<br /><em>{copy.form.titleSecond}</em></h2>
                <p className="modal-intro">{copy.form.intro} {contactEmail}.</p>
                <form onSubmit={submitBooking}>
                  <label>{copy.form.name}<input required value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder={copy.form.namePlaceholder} /></label>
                  <label>{copy.form.email}<input required type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} placeholder={copy.form.emailPlaceholder} /></label>
                  <label>{copy.form.interest}
                    <select value={form.session} onChange={(event) => updateForm('session', event.target.value)}>
                      {copy.form.options.map((option, index) => <option key={option} value={String(index)}>{option}</option>)}
                    </select>
                  </label>
                  <label>{copy.form.note} <textarea value={form.note} onChange={(event) => updateForm('note', event.target.value)} placeholder={copy.form.notePlaceholder} rows={3} /></label>
                  <button className="button button-dark form-submit" type="submit">{copy.form.submit} <ArrowRight size={17} /></button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon"><Check size={24} /></div>
                <p className="kicker">{copy.form.successKicker}</p>
                <h2>{copy.form.successTitle}<br /><em>{form.name || (language === 'es' ? 'amigo/a' : 'friend')}.</em></h2>
                <p>{copy.form.successBody} <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
                <button className="button button-dark" onClick={() => setBookingOpen(false)}>{copy.form.done} <Check size={17} /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
