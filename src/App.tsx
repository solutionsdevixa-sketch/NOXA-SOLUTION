import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  Headphones,
  Menu,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  Server,
  ShoppingBag,
  Sparkles,
  Target,
  Trash2,
  UserRound,
  PackageCheck,
  X,
} from 'lucide-react'
import { SiMastercard, SiPaypal, SiVisa } from 'react-icons/si'

type Product = { id: number; name: string; category: string; price: number; originalPrice?: number; tone: string; image: string; icon: typeof Cpu }
type CartItem = Product & { quantity: number }

type View = 'home' | 'services' | 'shop' | 'about' | 'contact'

const products: Product[] = [
  { id: 1, name: 'Noxa Edge Station', category: 'Workstation', price: 499000, originalPrice: 549000, tone: 'sunset', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85', icon: Cpu },
  { id: 2, name: 'Cloud Core 2U', category: 'Infrastructure', price: 779000, tone: 'blue', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85', icon: Server },
  { id: 3, name: 'Orbit Pro Display', category: 'Hardware', price: 199000, originalPrice: 229000, tone: 'mint', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85', icon: Sparkles },
  { id: 4, name: 'Signal Mesh Kit', category: 'Networking', price: 69900, tone: 'plum', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85', icon: Cloud },
  { id: 5, name: 'Noxa Studio Mini', category: 'Desktop', price: 289000, tone: 'blue', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=85', icon: Cpu },
  { id: 6, name: 'VectorBook Air', category: 'Laptop', price: 399000, originalPrice: 449000, tone: 'mint', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85', icon: Cpu },
  { id: 7, name: 'Focus Mechanical', category: 'Input', price: 44900, tone: 'plum', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=85', icon: Code2 },
  { id: 8, name: 'Arc Precision Mouse', category: 'Input', price: 24900, tone: 'sunset', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=85', icon: Code2 },
  { id: 9, name: 'Halo Desk Light', category: 'Workspace', price: 32900, tone: 'blue', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85', icon: Sparkles },
  { id: 10, name: 'Frame Webcam Pro', category: 'Video', price: 54900, originalPrice: 64900, tone: 'mint', image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=85', icon: Sparkles },
  { id: 11, name: 'Pulse Audio Dock', category: 'Audio', price: 79900, tone: 'plum', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=85', icon: Cloud },
  { id: 12, name: 'Vault SSD 2TB', category: 'Storage', price: 49900, tone: 'sunset', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=85', icon: Server },
  { id: 13, name: 'Atlas Backup Drive', category: 'Storage', price: 89900, tone: 'blue', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=85', icon: Server },
  { id: 14, name: 'CoreLink Switch', category: 'Networking', price: 74900, tone: 'mint', image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=1200&q=85', icon: Cloud },
  { id: 15, name: 'Beacon Wi-Fi 7', category: 'Networking', price: 59900, tone: 'plum', image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=1200&q=85', icon: Cloud },
  { id: 16, name: 'Grid UPS 1500', category: 'Power', price: 109000, tone: 'sunset', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=85', icon: Server },
  { id: 17, name: 'Noxa Tablet Slate', category: 'Mobile', price: 139000, originalPrice: 159000, tone: 'blue', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=85', icon: Sparkles },
  { id: 18, name: 'Field Phone Pro', category: 'Mobile', price: 189000, tone: 'mint', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85', icon: Sparkles },
  { id: 19, name: 'Meeting Room Cam', category: 'Collaboration', price: 129000, tone: 'plum', image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=85', icon: Code2 },
  { id: 20, name: 'Command Monitor 5K', category: 'Display', price: 329000, originalPrice: 379000, tone: 'sunset', image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=1200&q=85', icon: Sparkles },
]

const formatPkr = (amount: number) => `PKR ${amount.toLocaleString('en-PK')}`

const companyDetails = {
  name: 'NOXA SOLUTION (SMC-PRIVATE) LIMITED',
  email: 'noxasoulution@gmail.com',
  phone: '03107434822',
  address: 'Al Quresh Phase 1 Sher Shah Road Multan',
  director: 'ADEEL AHMAD',
}

const services = [
  { number: '01', title: 'Web development', text: 'Fast, responsive websites and web applications that turn attention into useful business momentum.', detail: 'We can shape a complete web platform, build an ecommerce experience around your goals, and stay involved with maintenance, improvements, and dependable day-to-day performance.', article: 'https://developer.mozilla.org/en-US/docs/Learn', icon: Code2 },
  { number: '02', title: 'Mobile applications', text: 'Thoughtful iOS and Android experiences that keep your customers close to the work.', article: 'https://reactnative.dev/docs/getting-started', icon: Sparkles },
  { number: '03', title: 'Brand & creative', text: 'A clear visual identity and a confident voice for the next version of your business.', article: 'https://www.nngroup.com/articles/brand-experience/', icon: Sparkles },
  { number: '04', title: 'Graphic design', text: 'Logos, visual systems, and campaign assets that make every customer touchpoint feel intentional.', article: 'https://www.canva.com/learn/graphic-design-basics/', icon: Sparkles },
  { number: '05', title: 'Digital marketing', text: 'Search, content, and campaign systems designed to make your business easier to discover.', article: 'https://www.thinkwithgoogle.com/marketing-strategies/search/', icon: ArrowUpRight },
  { number: '06', title: 'Website design', text: 'Clear, intuitive interfaces with responsive layouts, useful content, and a confident point of view.', article: 'https://web.dev/learn/design/', icon: Code2 },
  { number: '07', title: 'WordPress design', text: 'Flexible, manageable WordPress experiences for teams that need to publish and grow without friction.', article: 'https://wordpress.org/documentation/', icon: Code2 },
  { number: '08', title: 'Cloud & data', text: 'Cloud architecture that is secure, observable, and ready for the next chapter.', article: 'https://aws.amazon.com/what-is-cloud-computing/', icon: Cloud },
  { number: '09', title: 'Hardware systems', text: 'The right machines, networks, and support to make your team move faster.', article: 'https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-computer-networking.html', icon: Server },
]

function App() {
  const [view, setView] = useState<View>('home')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [projectOpen, setProjectOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const navigate = (next: View) => {
    setView(next)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart((current) => current.flatMap((item) => {
      if (item.id !== id) return [item]
      const quantity = item.quantity + delta
      return quantity > 0 ? [{ ...item, quantity }] : []
    }))
  }

  const removeFromCart = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => navigate('home')} aria-label="Noxa home"><span className="brand-mark">N</span> NOXA<span className="brand-dot">.</span></button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <button className={view === 'home' ? 'active' : ''} onClick={() => navigate('home')}>Work</button>
          <button className={view === 'services' ? 'active' : ''} onClick={() => navigate('services')}>Services</button>
          <button className={view === 'shop' ? 'active' : ''} onClick={() => navigate('shop')}>Shop</button>
          <button className={view === 'about' ? 'active' : ''} onClick={() => navigate('about')}>Our story</button>
          <button className={view === 'contact' ? 'active' : ''} onClick={() => navigate('contact')}>Contact</button>
          <button className="nav-cta" onClick={() => setProjectOpen(true)}>Start a project <ArrowUpRight size={14} /></button>
        </nav>
        <div className="header-actions">
          <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={18} /><span>{itemCount}</span></button>
          <button className="menu-trigger" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu"><Menu size={22} /></button>
        </div>
      </header>

      <main>
        {view === 'home' && <Home onNavigate={navigate} onShop={() => navigate('shop')} onProject={() => setProjectOpen(true)} />}
        {view === 'services' && <ServicesPage onContact={() => navigate('contact')} />}
        {view === 'shop' && <Shop onAdd={addToCart} />}
        {view === 'about' && <About onContact={() => navigate('contact')} />}
        {view === 'contact' && <Contact sent={sent} onSent={() => setSent(true)} />}
      </main>

      <footer className="site-footer">
        <div><button className="brand" onClick={() => navigate('home')}><span className="brand-mark">N</span> NOXA<span className="brand-dot">.</span></button><p>Systems for the next move.</p><p className="footer-company">{companyDetails.name}<br />{companyDetails.email}<br />{companyDetails.phone}</p></div>
        <div className="footer-links"><button onClick={() => navigate('home')}>Work</button><button onClick={() => navigate('services')}>Services</button><button onClick={() => navigate('shop')}>Shop</button><button onClick={() => navigate('about')}>Our story</button><button onClick={() => navigate('contact')}>Contact</button><button onClick={() => setProjectOpen(true)}>Start a project <ArrowUpRight size={14} /></button></div>
        <p className="footer-note">© 2025 Noxa Solution<br />{companyDetails.address}<br />Director: {companyDetails.director}</p>
      </footer>

      {cartOpen && <CartDrawer cart={cart} subtotal={subtotal} onClose={() => setCartOpen(false)} onUpdate={updateQuantity} onRemove={removeFromCart} onShop={() => { setCartOpen(false); navigate('shop') }} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }} />}
      {checkoutOpen && <Checkout subtotal={subtotal} onClose={() => setCheckoutOpen(false)} onDone={() => { setCart([]); setCheckoutOpen(false); setSent(true) }} />}
      {projectOpen && <ProjectDrawer onClose={() => setProjectOpen(false)} />}
    </div>
  )
}

function Home({ onNavigate, onShop, onProject }: { onNavigate: (view: View) => void; onShop: () => void; onProject: () => void }) {
  return <>
    <section className="hero section-pad">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> Independent digital studio · 2025</p>
        <h1>Build what's<br /><em>next.</em></h1>
        <p className="hero-intro">Noxa is a software house for ambitious businesses. We bring product, cloud, and hardware into one sharp, connected system.</p>
        <div className="hero-actions"><button className="button button-dark" onClick={onProject}>Start a project <ArrowUpRight size={17} /></button><button className="text-button" onClick={() => onNavigate('about')}>How we work <ChevronRight size={16} /></button></div>
      </div>
      <div className="hero-visual" aria-label="Abstract Noxa system visualization">
        <div className="visual-ring ring-one" /><div className="visual-ring ring-two" /><span className="orbit-ball orb-one" /><span className="orbit-ball orb-two" /><span className="orbit-ball orb-three" /><span className="orbit-ball orb-four" /><div className="visual-core"><span>N</span></div>
      </div>
      <div className="hero-meta"><span>Scroll to explore</span><span>01 — 04</span></div>
    </section>

    <section className="statement section-pad"><p className="eyebrow">The Noxa point of view</p><h2>Good technology should feel like an unfair advantage.</h2><div className="statement-foot"><p>We partner with teams who see further. Together, we turn big intent into useful, durable systems.</p><button className="circle-arrow" onClick={onShop} aria-label="Explore shop"><ArrowUpRight size={20} /></button></div></section>
    <section className="metrics section-pad"><p className="eyebrow"><Sparkles size={14} /> Noxa at a glance</p><p className="section-note">A small team with the range, care, and technical depth to keep ambitious work moving.</p><div className="metrics-grid"><div className="metric"><div className="metric-icon"><UserRound size={18} /></div><strong>25<span>+</span></strong><p>Trusted clients</p><small>Partners who stay for the next chapter.</small></div><div className="metric"><div className="metric-icon"><PackageCheck size={18} /></div><strong>60<span>+</span></strong><p>Projects delivered</p><small>Ideas turned into systems that ship.</small></div><div className="metric"><div className="metric-icon"><ArrowUpRight size={18} /></div><strong>12</strong><p>Markets supported</p><small>Built for teams with room to grow.</small></div><div className="metric"><div className="metric-icon"><Headphones size={18} /></div><strong>24<span>/7</span></strong><p>Systems support</p><small>Reliable help when the work matters.</small></div></div></section>

    <section className="services section-pad"><div className="section-heading"><p className="eyebrow">What we do</p><h2>One team.<br /><span>Every layer.</span></h2><p className="section-note">Strategy, design, engineering, and growth working together from the first useful question to the final shipped system.</p></div><div className="service-list">{services.map((service) => { const Icon = service.icon; return <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><Icon size={22} strokeWidth={1.5} /><h3>{service.title}</h3><p>{service.text}</p><ArrowUpRight className="service-arrow" size={19} /></article> })}</div></section>

    <section className="shop-banner section-pad"><div><p className="eyebrow">Noxa supply</p><h2>Tools that keep<br /><em>good work moving.</em></h2><p className="section-note">Curated hardware for focused teams, selected to work beautifully together.</p></div><button className="button button-light" onClick={onShop}>Visit the shop <ArrowUpRight size={17} /></button></section>
    <section className="proof section-pad"><p className="eyebrow">How we make progress</p><p className="section-note">Clear thinking compounds. We keep every decision close to the outcome.</p><div className="proof-grid"><article className="proof-card"><div className="proof-icon"><Target size={20} /></div><h3>01 / Objective</h3><small>Start with the outcome that matters.</small></article><article className="proof-card"><div className="proof-icon"><ArrowUpRight size={20} /></div><h3>02 / Strategy</h3><small>Choose the shortest useful path.</small></article><article className="proof-card"><div className="proof-icon"><Code2 size={20} /></div><h3>03 / Technology</h3><small>Use the tools that earn their place.</small></article></div></section>
  </>
}

function ServicesPage({ onContact }: { onContact: () => void }) {
  return <section className="services-page section-pad"><div className="page-intro"><p className="eyebrow"><span className="eyebrow-line" /> Noxa services / capabilities</p><h1>Good ideas,<br /><em>made useful.</em></h1><p>From first strategy to final launch, our team brings design, development, growth, cloud, and hardware into one connected delivery system.</p></div><div className="service-list">{services.map((service) => { const Icon = service.icon; return <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><Icon size={22} strokeWidth={1.5} /><h3>{service.title}</h3><div className="service-copy"><p>{service.text}</p>{service.detail && <p className="service-detail">{service.detail}</p>}<a href={service.article} target="_blank" rel="noreferrer">Read details <ArrowUpRight size={14} /></a></div><ArrowUpRight className="service-arrow" size={19} /></article> })}</div><div className="services-cta"><div><p className="eyebrow">Have a challenge?</p><h2>Let's make the next move.</h2></div><button className="button button-dark" onClick={onContact}>Start a conversation <ArrowUpRight size={17} /></button></div></section>
}

function Shop({ onAdd }: { onAdd: (product: Product) => void }) {
  return <section className="shop-page section-pad"><div className="page-intro"><p className="eyebrow"><span className="eyebrow-line" /> Noxa supply / shop</p><h1>Equipment for<br /><em>better work.</em></h1><p>Considered hardware for the people building what comes next. Configured, tested, and supported by our team.</p></div><div className="shop-toolbar"><span>{products.length} products</span><span>Prices in PKR · Built for modern teams</span></div><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={() => onAdd(product)} />)}</div></section>
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const Icon = product.icon
  return <article className="product-card"><div className={`product-image ${product.tone}`}><img src={product.image} alt={`${product.name} ${product.category}`} onError={(event) => { event.currentTarget.style.display = 'none' }} /><div className="product-image-shade" /><Icon className="product-icon-fallback" size={82} strokeWidth={0.7} /><span className="product-tag">NOXA / {product.category.toUpperCase()}</span><span className="product-index">0{product.id}</span></div><div className="product-details"><div><h3>{product.name}</h3><p>{product.category}</p></div><div className="product-buy"><div className="price-stack">{product.originalPrice && <s>{formatPkr(product.originalPrice)}</s>}<strong>{formatPkr(product.price)}</strong></div><button className="add-button" onClick={onAdd} aria-label={`Add ${product.name} to cart`}><Plus size={19} /></button></div></div></article>
}

function About({ onContact }: { onContact: () => void }) {
  return <section className="about-page"><div className="about-hero section-pad"><p className="eyebrow"><span className="eyebrow-line" /> About Noxa</p><h1>We make the<br /><em>complex</em> useful.</h1><p className="about-lead">Noxa is an independent technology partner for companies with somewhere to go. Small enough to care. Experienced enough to make it real.</p></div><div className="about-split section-pad"><div><p className="eyebrow">Our way of working</p><h2>Less theatre.<br />More traction.</h2></div><div className="about-copy"><p>We started Noxa because too many good ideas get lost between the strategy deck and the shipped product. Our team closes that gap with clear thinking, strong craft, and a bias toward useful.</p><p>From the first workshop to the final rollout, we stay close to the work. No layers of handoffs. No mystery. Just a thoughtful team making the right thing, properly.</p><button className="text-button" onClick={onContact}>Work with us <ArrowUpRight size={16} /></button></div></div><section className="founder-section section-pad"><div className="founder-heading"><p className="eyebrow">Meet the founder</p><h2>Adeel<br /><em>Ahmad.</em></h2><p className="founder-role">Founder / Managing Director</p></div><div className="founder-copy"><p>Since 2020, Adeel Ahmad has been building Noxa with a clear purpose: to make dependable cloud services and practical technology guidance easier for businesses to understand and use.</p><p>His work brings together a grounded mindset, a passion for modern infrastructure, and a commitment to helping customers choose solutions that genuinely fit their goals. Every service is shaped around clarity, value, and long-term progress.</p><div className="founder-signature"><span>Leading Noxa forward</span><strong>Adeel Ahmad</strong></div></div></section><div className="about-values section-pad"><p className="eyebrow">The short version</p><div className="value-row"><strong>Curious by default</strong><span>We ask better questions before we build.</span></div><div className="value-row"><strong>Craft over noise</strong><span>Good details compound into great experiences.</span></div><div className="value-row"><strong>Built to last</strong><span>We make systems that keep earning their place.</span></div></div></section>
}

function Contact({ sent, onSent }: { sent: boolean; onSent: () => void }) {
  return <section className="contact-page section-pad"><div className="contact-intro"><p className="eyebrow"><span className="eyebrow-line" /> Start a conversation</p><h1>Tell us what<br /><em>you're building.</em></h1><p>Have a product in mind, a system that needs untangling, or just a question? Bring us the challenge. We will help find the next useful move.</p><div className="contact-details"><strong className="contact-company">{companyDetails.name}</strong><span><Mail size={17} /> {companyDetails.email}</span><span><Phone size={17} /> {companyDetails.phone}</span><span><MapPin size={17} /> {companyDetails.address}</span><span><Headphones size={17} /> Director: {companyDetails.director}</span><small>Usually replies within one business day.</small></div></div>{sent ? <div className="success-box"><div className="success-icon"><Check /></div><h2>Message received.</h2><p>Thanks for reaching out. A member of our team will be in touch shortly.</p></div> : <div className="contact-form-panel"><div className="form-panel-head"><p className="eyebrow">The useful bit</p><h2>Start with the challenge.</h2></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); onSent() }}><label>Name<input required placeholder="Your name" /></label><label>Work email<input required type="email" placeholder="you@company.com" /></label><label>How can we help?<textarea required placeholder="A little about the challenge..." rows={5} /></label><button className="button button-dark" type="submit">Send inquiry <ArrowUpRight size={17} /></button></form></div>}</section>
}

function CartDrawer({ cart, subtotal, onClose, onUpdate, onRemove, onShop, onCheckout }: { cart: CartItem[]; subtotal: number; onClose: () => void; onUpdate: (id: number, delta: number) => void; onRemove: (id: number) => void; onShop: () => void; onCheckout: () => void }) {
  return <div className="overlay"><aside className="cart-drawer"><div className="drawer-header"><div><p className="eyebrow">Your selection</p><h2>Cart <span>{cart.length}</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Close cart"><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><div className="empty-cart-art galaxy-art"><div className="empty-cart-icon"><ShoppingBag size={31} /></div></div><p className="empty-cart-kicker">Noxa supply / 00</p><h3>Your cart is quiet.</h3><span>Add a considered piece to keep good work moving.</span><button className="button button-dark" onClick={onShop}>Explore the shop <ArrowUpRight size={17} /></button></div> : <><div className="cart-items">{cart.map((item) => <div className={`cart-item ${item.tone}`} key={item.id} style={{ backgroundImage: `linear-gradient(105deg, rgba(5, 10, 25, .86), rgba(5, 10, 25, .62)), url(${item.image})` }}><div className={`cart-thumb ${item.tone}`}><img src={item.image} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} /><item.icon className="cart-icon-fallback" size={28} /></div><div className="cart-item-info"><strong>{item.name}</strong><span>{formatPkr(item.price)}</span><div className="cart-item-actions"><div className="quantity"><button className="quantity-button" onClick={() => onUpdate(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={13} /></button><span>{item.quantity}</span><button className="quantity-button" onClick={() => onUpdate(item.id, 1)} aria-label={`Increase ${item.name} quantity`}><Plus size={13} /></button></div><button className="remove-button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name} from cart`} title="Remove item"><Trash2 size={15} /></button></div></div></div>)}</div><div className="cart-bottom"><div><span>Subtotal</span><strong>{formatPkr(subtotal)}</strong></div><small>Shipping and taxes calculated at checkout.</small><button className="button button-dark full-width" onClick={onCheckout}>Proceed to checkout <ArrowUpRight size={17} /></button></div></>}</aside></div>
}

function ProjectDrawer({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  return <div className="overlay"><aside className={submitted ? 'project-drawer is-submitted' : 'project-drawer'} aria-label="Start a project inquiry"><div className="drawer-header"><div><p className="eyebrow">Noxa studio</p><h2>Start a project</h2></div><button className="icon-button" onClick={onClose} aria-label="Close project inquiry"><X /></button></div>{submitted ? <div className="success-box inquiry-success"><div className="confirmation-visual"><div className="confirmation-fireworks" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div><div className="success-icon"><Check /></div></div><p className="eyebrow">Noxa studio / received</p><h2>Inquiry sent.</h2><p>Thanks for sharing the brief. Our team will review it and be in touch within one business day.</p><p className="inquiry-response">We review your brief and reply within one business day.</p><button className="button button-dark" onClick={onClose}>Back to Noxa <ArrowUpRight size={17} /></button></div> : <form className="project-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><p className="project-form-intro">A few useful details help us bring the right people into the first conversation.</p><label>Company name<input required placeholder="Your company" /></label><label>Company email<input required type="email" placeholder="you@company.com" /></label><label>Contact number<input required type="tel" placeholder="+92 300 0000000" /></label><label>Number of employees<select required defaultValue=""><option value="" disabled>Select team size</option><option>1-10</option><option>11-50</option><option>51-200</option><option>201-500</option><option>500+</option></select></label><label>What would you like to develop?<textarea required placeholder="Tell us a little about the project..." rows={4} /></label><button className="button button-dark full-width" type="submit">Send inquiry <ArrowUpRight size={17} /></button></form>}</aside></div>
}

function Checkout({ subtotal, onClose, onDone }: { subtotal: number; onClose: () => void; onDone: () => void }) {
  const [placed, setPlaced] = useState(false)
  const total = useMemo(() => subtotal + (subtotal * 0.08), [subtotal])
  return <div className="overlay"><div className="checkout-modal">{placed ? <div className="success-box"><div className="confirmation-visual"><div className="confirmation-fireworks" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div><div className="success-icon"><Check /></div></div><p className="eyebrow">Noxa supply / confirmed</p><h2>Order confirmed.</h2><strong className="confirmation-thanks">Thank you for choosing Noxa.</strong><p>Your supply is on its way, and we sent the details to your email.</p><div className="confirmation-details"><div><PackageCheck /><span>Order status</span><strong>Ready to ship</strong></div><div><Check /><span>Payment</span><strong>Secured</strong></div><div><Mail /><span>Next update</span><strong>By email</strong></div></div><button className="button button-dark" onClick={onDone}>Back to Noxa <ArrowUpRight size={17} /></button></div> : <><div className="drawer-header"><div><p className="eyebrow">Noxa supply / order 01</p><h2>Checkout</h2></div><button className="icon-button" onClick={onClose} aria-label="Close checkout"><X /></button></div><div className="checkout-progress"><span className="is-active">01 / Details</span><span>02 / Confirmation</span></div><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setPlaced(true) }}><p className="checkout-intro">A few final details and your order will be ready to move.</p><label>Email address<input required type="email" placeholder="you@company.com" /></label><label>Shipping address<input required placeholder="Street and city" /></label><div className="checkout-row checkout-card-row"><label>Card number<input required inputMode="numeric" placeholder="4242 4242 4242 4242" /></label><label>Expiry<input required placeholder="MM / YY" /></label><label>CVV / CVC<input required type="text" inputMode="numeric" pattern="[0-9]{3,4}" maxLength={4} placeholder="123" /></label></div><div className="payment-methods"><span>We accept</span><div><SiVisa aria-label="Visa" title="Visa" /><SiMastercard aria-label="Mastercard" title="Mastercard" /><span className="unionpay-mark" role="img" aria-label="UnionPay">UNIONPAY</span><SiPaypal aria-label="PayPal" title="PayPal" /></div></div><div className="checkout-total"><span><small>Secure checkout</small>Total today</span><strong>{formatPkr(total)}</strong></div><button className="button button-dark full-width" type="submit">Place order <ArrowUpRight size={17} /></button></form></>}</div></div>
}

export default App
