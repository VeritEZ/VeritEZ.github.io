import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'

type IconName = 'web' | 'person' | 'signal' | 'spark' | 'pin' | 'shield' | 'screen' | 'link' | 'rocket'

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  const paths: Record<IconName, ReactNode> = {
    web: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h4M7 16h7"/></>,
    person: <><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.4-3.6 2.6-5.4 6.5-5.4s6.1 1.8 6.5 5.4"/><path d="M18.4 5.2l.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5 1.1-.5z"/></>,
    signal: <><path d="M12 18v3M8 14a5.7 5.7 0 0 1 8 0M5 11a9.8 9.8 0 0 1 14 0M2.5 7.7a13.4 13.4 0 0 1 19 0"/><circle cx="12" cy="20" r="1"/></>,
    spark: <><path d="m12 2 1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-2.8L12 2Z"/><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/></>,
    pin: <><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.2"/></>,
    shield: <><path d="M12 3 20 6v5.3c0 4.6-3.2 7.8-8 9.7-4.8-1.9-8-5.1-8-9.7V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    screen: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 8h4"/></>,
    link: <><path d="M10 13.5a4.2 4.2 0 0 0 6.1 0l2.1-2.1a4.3 4.3 0 0 0-6.1-6.1l-1.2 1.2"/><path d="M14 10.5a4.2 4.2 0 0 0-6.1 0l-2.1 2.1a4.3 4.3 0 0 0 6.1 6.1l1.2-1.2"/></>,
    rocket: <><path d="M14 5c2.3-1.7 4.5-1.9 6-2-.1 1.5-.3 3.7-2 6l-6.7 6.7-4-4L14 5Z"/><path d="m8 11-3 .3L3 13.4l4.4.3M13 16l.3 4.4 2.1-2.1.3-3M9 16l-2 2M6 15l-2 2"/><circle cx="15.5" cy="7.5" r="1"/></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

const nav = [
  ['Solutions', '#solutions'], ['Products', '#products'], ['How it works', '#how-it-works'], ['About', '#about'],
]

const services: { icon: IconName; number: string; title: string; blurb: string; link: string }[] = [
  { icon: 'web', number: '01', title: 'Business websites', blurb: 'Show what you offer, answer common questions, and make it easy for customers to contact you.', link: '#business' },
  { icon: 'person', number: '02', title: 'Personal websites', blurb: 'Keep your work, experience, and contact details in one place that feels like yours.', link: '#personal' },
  { icon: 'signal', number: '03', title: 'NFC products', blurb: 'Share a profile, website, or review page through a card, keychain, or stand.', link: '#products' },
  { icon: 'spark', number: '04', title: 'Career support', blurb: 'Résumé, profile, and application support is in development and is not available yet.', link: '#career' },
]

const faqs = [
  ['What does VeritEZ do?', 'VeritEZ creates websites and NFC products for businesses and individuals. Career support is planned.'],
  ['Can you build a website for my small business?', 'Yes. Business website work can include responsive design, service or product showcases, menus, contact forms, booking integrations, redesigns, and ongoing maintenance.'],
  ['Do you create personal portfolio websites?', 'Yes. Personal sites can support students, researchers, freelancers, job seekers, and professionals with portfolios, biographies, résumés, and contact pages.'],
  ['How do NFC business cards work?', 'An NFC card stores a link. A compatible phone can open that destination when the card is tapped; QR codes can provide an alternative for devices without NFC.'],
  ['Do I need an app to use an NFC card?', 'No VeritEZ app is required. NFC products typically open their linked destination using a compatible device’s built-in capabilities.'],
  ['Can an NFC card link to my existing website?', 'Yes. The destination can be an existing site or a digital profile, subject to the product setup.'],
  ['Can you help with Google Review cards?', 'VeritEZ intends to offer NFC and QR review cards and stands that make it easier for customers to reach a business review page. They do not guarantee or incentivize reviews.'],
  ['Do you offer résumé development?', 'Résumé and career document services are planned but are not available yet. No service can guarantee interviews or job offers.'],
  ['How do I request a quote?', 'Use the contact form to prepare an email with your project details. It opens your email application so you can review and send the message.'],
]

function Wordmark({ className = '' }: { className?: string }) {
  return <img className={`wordmark ${className}`} src="/veritez-wordmark.svg" alt="VeritEZ" />
}

function ButtonLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="button" href={href}>{children}</a>
}

function MockBrowser({ type }: { type: 'restaurant' | 'studio' | 'portfolio' }) {
  const labels = { restaurant: ['SALT & CITRUS', 'A little brighter. A little fresher.', 'Seasonal plates · Good company'], studio: ['NORTHLINE STUDIO', 'Built around what matters.', 'Thoughtful service for modern spaces'], portfolio: ['JOHN DOE', 'Designing what comes next.', 'Selected work · About · Contact'] }
  const [brand, title, sub] = labels[type]
  return <div className={`browser browser--${type}`} role="img" aria-label={`${type} website design concept preview`}>
    <div className="browser__chrome"><i/><i/><i/><span>veritez.design / concept</span><b>•••</b></div>
    <div className="browser__page">
      <div className="browser__nav"><strong>{brand}</strong><span>Menu&nbsp;&nbsp; About&nbsp;&nbsp; Contact</span></div>
      <div className="browser__content"><div className="browser__copy"><em>Concept</em><h3>{title}</h3><p>{sub}</p></div><div className="browser__art"><span/><i/><b/></div></div>
      <div className="browser__baseline"><span>EST. FOR THE EVERYDAY</span><span>SCROLL TO DISCOVER</span></div>
    </div>
  </div>
}

function HexScene() {
  return <div className="hex-scene" aria-hidden="true">
    <div className="hex-scene__grid" />
    <div className="hex hex--a"><span /></div><div className="hex hex--b"><span /></div>
    <div className="hex hex--c"><span /></div><div className="hex hex--d"><span /></div>
    <div className="hex-orbit hex-orbit--one"/><div className="hex-orbit hex-orbit--two"/>
    <div className="hex-scene__beam"/>
  </div>
}

function NfcShowcase() {
  return <div className="nfc-stage" tabIndex={0} aria-label="NFC card and phone preview. Hover or focus to see the connection animation.">
    <div className="nfc-stage__halo" />
    <div className="nfc-card"><div className="nfc-card__top"><Wordmark/><span>01 / 04</span></div><div className="nfc-card__mark"><span className="nfc-card__hex"><Icon name="signal" size={17}/></span><span>Digital<br/>business card</span></div><div className="nfc-card__bottom"><span>VERITEZ DIGITAL ID</span><span>STUDIO EDITION</span></div></div>
    <div className="nfc-phone"><div className="nfc-phone__speaker"/><div className="nfc-phone__screen"><div className="profile-avatar">J</div><b>John Doe</b><span>Digital solutions · VeritEZ</span><i>Save contact</i><small>Portfolio&nbsp;&nbsp; LinkedIn&nbsp;&nbsp; Email</small></div></div>
    <div className="nfc-rings"><span/><span/><span/></div>
    <div className="nfc-caption">Hover or focus to preview · no NFC hardware is activated</div>
  </div>
}

function App() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formNotice, setFormNotice] = useState('')

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-theme]')]
    const themeObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) document.documentElement.dataset.theme = (visible.target as HTMLElement).dataset.theme ?? 'emerald'
    }, { rootMargin: '-30% 0px -45% 0px', threshold: [0, 0.15, 0.35, 0.6] })
    sections.forEach((section) => themeObserver.observe(section))

    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target) }
    }), { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))

    let frame = 0
    const onScroll = () => {
      if (window.innerWidth <= 760 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY * 0.12}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { themeObserver.disconnect(); revealObserver.disconnect(); window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const service = String(form.get('service') ?? '').trim()
    const details = String(form.get('details') ?? '').trim()
    const subject = encodeURIComponent(`VeritEZ project inquiry: ${service || 'New project'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${details}`)
    setFormNotice('Your email application should open with this draft. Review it and press Send there to contact VeritEZ.')
    window.location.href = `mailto:mohammedayanmahmood@gmail.com?subject=${subject}&body=${body}`
  }

  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <HexScene />
    <header className="site-header">
      <nav className={`nav glass-panel ${menuOpen ? 'nav--open' : ''}`} ref={navRef} aria-label="Main navigation">
        <a className="nav__brand" href="#top" aria-label="VeritEZ home"><Wordmark/></a>
        <button className="nav__toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
        <div className="nav__links" id="nav-links">
          {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav__cta" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk</a>
        </div>
      </nav>
    </header>

    <main id="main">
      <section className="hero section" id="top" data-theme="emerald">
        <div className="hero__inner content-width">
          <div className="hero__copy">
            <h1 className="reveal">Your next opportunity<br/><span>starts here.</span></h1>
            <p className="hero__lead reveal">Websites and NFC products that help people find your work and contact you.</p>
            <div className="hero__actions reveal"><ButtonLink href="#solutions">Explore solutions</ButtonLink></div>
          </div>
          <div className="hero__visual" aria-label="NFC card and phone interaction preview"><NfcShowcase/></div>
        </div>
      </section>

      <section className="intro section" id="about" data-theme="emerald">
        <div className="content-width intro__layout">
          <div className="intro__main reveal"><h2>Practical tools for<br/><span>people and businesses</span></h2><p>VeritEZ builds websites and NFC products that help you share information, show your work, and stay in contact.</p></div>
          <div className="principles reveal"><div><span>01</span><h3>Connect</h3><p>Make it easier for people to reach you.</p></div><div><span>02</span><h3>Present</h3><p>Put your work or services in one clear place.</p></div><div><span>03</span><h3>Share</h3><p>Give someone a direct link to what matters.</p></div></div>
        </div>
      </section>

      <section className="solutions section" id="solutions" data-theme="emerald">
        <div className="content-width">
          <div className="section-heading reveal"><div><h2>What we offer</h2><p>Websites and NFC products for your business, your work, and the people you meet.</p></div></div>
          <div className="solution-grid">
            {services.map((service) => <a className="solution-card glass-panel reveal" href={service.link} key={service.number}>
              <div className="solution-card__icon"><Icon name={service.icon} size={27}/><div className="icon-halo"/></div>
              <div className="solution-card__body"><h3>{service.title}</h3><p>{service.blurb}</p></div>
              <span className="solution-card__watermark">{service.number}</span>
            </a>)}
          </div>
        </div>
      </section>

      <section className="business section" id="business" data-theme="gold">
        <div className="content-width showcase showcase--business">
          <div className="showcase__copy reveal"><h2>A website that explains<br/><span>your business</span></h2><p>Give customers a clear place to see your services, find key details, and get in touch.</p><ul className="feature-list"><li><Icon name="screen" size={18}/> Works on every screen</li><li><Icon name="pin" size={18}/> Organized around your business</li><li><Icon name="spark" size={18}/> Clear content and navigation</li></ul></div>
          <div className="showcase__art reveal"><div className="browser-stack"><MockBrowser type="restaurant"/><div className="browser-stack__back"><MockBrowser type="studio"/></div></div><div className="concept-note"><span>CONCEPT STUDY / 01</span><i/>Illustrative design direction</div><div className="showcase-orbit"/></div>
        </div>
      </section>

      <section className="personal section" id="personal" data-theme="blue">
        <div className="content-width showcase showcase--personal">
          <div className="showcase__art reveal"><div className="portfolio-orbit"><span/><span/><span/></div><div className="portfolio-window"><MockBrowser type="portfolio"/><div className="portfolio-window__badge"><Icon name="person" size={18}/><span>YOUR WORK<br/><b>YOUR STORY</b></span></div></div><div className="concept-note"><span>CONCEPT STUDY / 02</span><i/>Personal portfolio direction</div></div>
          <div className="showcase__copy reveal"><h2>Your work in<br/><span>one place</span></h2><p>Share your projects, experience, and contact details on a site that feels like yours.</p><div className="audience-chips"><span>Students</span><span>Researchers</span><span>Freelancers</span><span>Professionals</span><span>Job seekers</span></div></div>
        </div>
      </section>

      <section className="products section" id="products" data-theme="teal">
        <div className="content-width products__head"><div className="products__title reveal"><h2>Share more<br/><span>with a tap</span></h2><p>An NFC card, keychain, or stand can open a profile, business page, or review link on a compatible phone.</p></div></div>
        <div className="content-width products__layout"><div className="products__details reveal">
          <div className="product-list"><article><div><h3>NFC business cards</h3><p>Reusable cards that open a profile or contact page on compatible devices.</p></div></article><article><div><h3>NFC keychains</h3><p>A portable way to share your chosen digital destination.</p></div></article><article><div><h3>Review cards & stands</h3><p>Tap or scan to reach a business review page and leave genuine feedback.</p></div></article><article><div><h3>QR code companions</h3><p>A scannable alternative for devices that do not support NFC.</p></div></article></div>
          <div className="steps-line"><div><b>01</b><span>Choose<br/>your product</span></div><i/><div><b>02</b><span>Connect your<br/>destination</span></div><i/><div><b>03</b><span>Tap or scan<br/>to share</span></div></div>
          <p className="product-disclaimer">NFC support varies by device. The phone and card above are an illustration; they do not activate device NFC.</p>
        </div></div>
      </section>

      <section className="career section" id="career" data-theme="amber">
        <div className="content-width career__layout"><div className="career__copy reveal"><h2>Career support<br/><span>in development</span></h2><p>We’re developing help with résumés, profiles, and application materials. This service is not available yet.</p><div className="career-tags"><span>Résumés</span><span>Cover letters</span><span>Profiles</span><span>Application planning</span><span>Career portfolios</span></div><p className="career-note">When available, career materials should be reviewed and tailored to you. No service can guarantee an interview or job offer.</p></div><div className="career__visual reveal"><div className="career__document"><div className="doc-lines"><span/><span/><span/><i/><span/><span/><span/></div><div className="doc-highlight"><b>Make your<br/>experience<br/><em>clear.</em></b><i/></div><div className="doc-stamp">VERITEZ<br/>CAREER TOOLS</div></div><div className="career__orbit career__orbit--one"/><div className="career__orbit career__orbit--two"/></div></div>
      </section>

      <section className="why section" id="why" data-theme="emerald">
        <div className="content-width"><div className="section-heading reveal"><div><h2>The details matter</h2><p>Good design should make information easier to find and use.</p></div></div><div className="why-grid">
          <article className="why-item reveal"><div className="why-item__icon"><Icon name="person"/></div><h3>Start with your needs</h3><p>We shape each project around the people it has to serve.</p></article>
          <article className="why-item reveal"><div className="why-item__icon"><Icon name="link"/></div><h3>Connect online and in person</h3><p>A website, profile, and NFC product can lead people to the same place.</p></article>
          <article className="why-item reveal"><div className="why-item__icon"><Icon name="spark"/></div><h3>Keep it practical</h3><p>Clear navigation and useful details matter more than extra features.</p></article>
          <article className="why-item reveal"><div className="why-item__icon"><Icon name="shield"/></div><h3>Be clear about what’s possible</h3><p>We explain what a tool does and avoid promises about results.</p></article>
        </div></div>
      </section>

      <section className="process section" id="how-it-works" data-theme="green">
        <div className="content-width"><div className="process__intro reveal"><h2>How we work</h2><p>From the first conversation to a finished website or NFC product.</p></div><div className="process-track">
          <article className="process-step reveal"><div className="process-step__node"><span>01</span><i/></div><h3>Tell us what you need</h3><p>Describe your goals, who it’s for, and the problem you want to solve.</p></article>
          <article className="process-step reveal"><div className="process-step__node"><span>02</span><i/></div><h3>Design and build</h3><p>We agree on the content and design, then build the site or product.</p></article>
          <article className="process-step reveal"><div className="process-step__node"><span>03</span><i/></div><h3>Put it to work</h3><p>Share the finished result with the people it’s meant for.</p></article>
        </div></div>
      </section>

      <section className="faq section" id="faq" data-theme="blue">
        <div className="content-width faq__layout"><div className="faq__intro reveal"><h2>Common questions</h2><p>Details about our websites, NFC products, and how to get in touch.</p></div><div className="faq-list reveal">{faqs.map(([question, answer], i) => <article className={`faq-item ${openFaq === i ? 'is-open' : ''}`} key={question}><h3><button type="button" aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{question}</span><i>{openFaq === i ? '−' : '+'}</i></button></h3><div className="faq-item__answer" id={`faq-answer-${i}`} hidden={openFaq !== i}><p>{answer}</p></div></article>)}</div></div>
      </section>

      <section className="contact section" id="contact" data-theme="emerald">
        <div className="content-width contact__layout"><div className="contact__copy reveal"><h2>Tell us about<br/><span>your project</span></h2><p>Use the form to prepare an email with your project details. You can review it before sending.</p><div className="contact__direct"><div><a href="mailto:mohammedayanmahmood@gmail.com">mohammedayanmahmood@gmail.com</a></div></div><div className="contact__note"><i/>Your message opens in your email app.</div></div>
          <form className="contact-form glass-panel reveal" onSubmit={handleContact}>
            <div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="How should we address you?" required/></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required/></label></div>
            <label>What can we help with?<select name="service" defaultValue="" required><option value="" disabled>Choose a service</option><option>Business website</option><option>Personal website</option><option>NFC products</option><option>Career support (planned)</option><option>Something else</option></select></label>
            <label>A little about your project<textarea name="details" rows={4} placeholder="What are you hoping to create?" required/></label>
            <div className="contact-form__bottom"><button className="button" type="submit">Open email draft</button><small>No information is submitted or stored by this form.</small></div>
            <p className="form-notice" role="status" aria-live="polite">{formNotice}</p>
          </form>
        </div>
      </section>
    </main>

    <footer className="footer" data-theme="emerald">
      <div className="content-width footer__top"><a href="#top" className="footer__brand"><Wordmark/></a><div className="footer__nav"><div><a href="#solutions">Solutions</a><a href="#products">NFC products</a><a href="#how-it-works">How it works</a></div><div><a href="#contact">Contact</a><a href="mailto:mohammedayanmahmood@gmail.com">Email VeritEZ</a><a href="#faq">FAQs</a></div><div><a href="/privacy.html">Privacy notice</a></div></div></div>
      <div className="content-width footer__bottom"><span>© {new Date().getFullYear()} VeritEZ. All rights reserved.</span></div>
    </footer>
  </div>
}

export default App
