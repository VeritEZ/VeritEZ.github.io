import './styles.css'

// React renders the complete document during the build. Only these small,
// independent enhancements run in the visitor's browser.
const nav = document.querySelector<HTMLElement>('.nav')!
const toggle = document.querySelector<HTMLButtonElement>('.nav__toggle')!
function setMenu(open: boolean) {
  nav.classList.toggle('nav--open', open)
  toggle.setAttribute('aria-expanded', String(open))
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation')
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'))
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)))
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false)
    toggle.focus()
  }
})
document.addEventListener('click', event => {
  if (event.target instanceof Node && !nav.contains(event.target)) setMenu(false)
})

const faqButtons = [...document.querySelectorAll<HTMLButtonElement>('.faq-item button')]
faqButtons.forEach(button => button.addEventListener('click', () => {
  const opening = button.getAttribute('aria-expanded') !== 'true'
  faqButtons.forEach(item => {
    const open = item === button && opening
    item.setAttribute('aria-expanded', String(open))
    item.closest('.faq-item')!.classList.toggle('is-open', open)
    document.getElementById(item.getAttribute('aria-controls')!)!.hidden = !open
    item.querySelector('i')!.textContent = open ? '−' : '+'
  })
}))

const form = document.querySelector<HTMLFormElement>('.contact-form')!
form.addEventListener('submit', event => {
  event.preventDefault()
  const data = new FormData(form)
  const field = (name: string) => String(data.get(name) ?? '').trim()
  const subject = encodeURIComponent(`VeritEZ project inquiry: ${field('service') || 'New project'}`)
  const body = encodeURIComponent(`Name: ${field('name')}\nEmail: ${field('email')}\nService: ${field('service')}\n\nProject details:\n${field('details')}`)
  document.querySelector<HTMLElement>('.form-notice')!.textContent = 'Your email application should open with this draft. Review it and press Send there to contact VeritEZ.'
  window.location.href = `mailto:mohammedayanmahmood@gmail.com?subject=${subject}&body=${body}`
})

const themes = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
  if (visible) document.documentElement.dataset.theme = (visible.target as HTMLElement).dataset.theme ?? 'emerald'
}, { rootMargin: '-30% 0px -45% 0px', threshold: [0, 0.15, 0.35, 0.6] })
document.querySelectorAll('[data-theme]').forEach(section => themes.observe(section))

const stage = document.querySelector<HTMLElement>('.nfc-stage')!
const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
const sequence = [['home', 2000], ['approach', 1600], ['scan', 1800], ['profile', 4200], ['return', 1600]] as const
type Phase = typeof sequence[number][0]
let timer: ReturnType<typeof setTimeout>
let inView = false
function setPhase(phase: Phase) {
  stage.dataset.phase = phase
  const profile = phase === 'profile' || phase === 'return'
  stage.querySelector<HTMLElement>('.phone-home')!.hidden = profile
  stage.querySelector<HTMLElement>('.phone-nfc')!.hidden = phase !== 'scan'
  stage.querySelector<HTMLElement>('.phone-profile')!.hidden = !profile
}
function play(index = 0) {
  const [phase, duration] = sequence[index]
  setPhase(phase)
  timer = setTimeout(() => play((index + 1) % sequence.length), duration)
}
function restart() {
  clearTimeout(timer)
  if (motion.matches) setPhase('profile')
  else if (inView && !document.hidden) play()
  else setPhase('home')
}
new IntersectionObserver(([entry]) => {
  if (inView !== entry.isIntersecting) { inView = entry.isIntersecting; restart() }
}, { threshold: 0.1 }).observe(stage)
motion.addEventListener('change', restart)
document.addEventListener('visibilitychange', restart)
restart()
