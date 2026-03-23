import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const navLinks = [
    { key: 'nav.services', href: '#services' },
    { key: 'nav.process', href: '#process' },
    { key: 'nav.contact', href: '#contact' },
    { key: 'nav.pilot', href: '/pilot', isRoute: true },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { lang, setLang, t } = useLanguage()
    const [langDropdown, setLangDropdown] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleHashLink = (hash) => {
        setMenuOpen(false)
        if (location.pathname !== '/') {
            navigate('/')
            setTimeout(() => {
                document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
            }, 400)
        } else {
            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                padding: scrolled ? '10px 0' : '18px 0',
                background: scrolled
                    ? 'rgba(0,0,0,0.72)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(28px) saturate(1.6)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(1.6)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
                boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
                transition: 'all 0.45s cubic-bezier(0.23,1,0.32,1)',
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: 38, height: 38, borderRadius: 10,
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
                        overflow: 'hidden',
                    }}>
                        <img src="/logo.png" alt="prodone.ai" style={{ width: 34, height: 34, objectFit: 'contain' }} />
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em' }}>
                        prodone<span style={{ color: 'rgba(255,255,255,0.4)' }}>.ai</span>
                    </span>
                </Link>

                {/* Desktop Nav — pill container */}
                <div className="desktop-nav" style={{
                    display: 'flex', alignItems: 'center', gap: '2px',
                    padding: '6px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 50,
                    backdropFilter: 'blur(20px)',
                }}>
                    {navLinks.map(link =>
                        link.isRoute ? (
                            <Link key={link.key} to={link.href} style={{
                                padding: '8px 18px',
                                color: location.pathname === '/pilot' ? '#fff' : 'rgba(255,255,255,0.5)',
                                fontSize: '13px', fontWeight: 600,
                                background: location.pathname === '/pilot' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                border: '1px solid',
                                borderColor: location.pathname === '/pilot' ? 'rgba(255,255,255,0.18)' : 'transparent',
                                borderRadius: 50, transition: 'all 0.3s',
                            }}>{t(link.key)}</Link>
                        ) : (
                            <button key={link.key} onClick={() => handleHashLink(link.href)}
                                style={{
                                    padding: '8px 16px', color: 'rgba(255,255,255,0.5)',
                                    fontSize: '13px', fontWeight: 500, borderRadius: 50,
                                    transition: 'all 0.25s', background: 'transparent', border: 'none',
                                    cursor: 'pointer', fontFamily: 'var(--font)',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent' }}
                            >{t(link.key)}</button>
                        )
                    )}
                </div>

                {/* Language + CTA */}
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => setLangDropdown(!langDropdown)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                padding: '8px 16px', borderRadius: '50px', color: 'rgba(255,255,255,0.8)', fontSize: '13px',
                                fontWeight: 500, cursor: 'pointer', backdropFilter: 'blur(20px)',
                                transition: 'all 0.25s', fontFamily: 'var(--font)'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
                        >
                            {lang === 'EN' ? (
                                <><span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.9)' }}>GB</span> English</>
                            ) : (
                                <><span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.9)' }}>DE</span> Deutsch</>
                            )}
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: langDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s', filter: 'opacity(0.6)' }}>
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <AnimatePresence>
                            {langDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                                        background: 'rgba(15,15,20,0.95)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px',
                                        padding: '6px', minWidth: '140px', boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                                        display: 'flex', flexDirection: 'column', gap: '2px'
                                    }}
                                >
                                    <button onClick={() => { setLang('DE'); setLangDropdown(false) }}
                                        style={{
                                            padding: '10px 12px', background: lang === 'DE' ? 'rgba(255,255,255,0.08)' : 'transparent',
                                            border: 'none', borderRadius: '10px', color: '#fff', fontSize: '13px',
                                            textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font)',
                                            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                                        onMouseLeave={e => e.currentTarget.style.background = lang === 'DE' ? 'rgba(255,255,255,0.08)' : 'transparent'}
                                    ><span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.9)' }}>DE</span> Deutsch</button>
                                    <button onClick={() => { setLang('EN'); setLangDropdown(false) }}
                                        style={{
                                            padding: '10px 12px', background: lang === 'EN' ? 'rgba(255,255,255,0.08)' : 'transparent',
                                            border: 'none', borderRadius: '10px', color: '#fff', fontSize: '13px',
                                            textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font)',
                                            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                                        onMouseLeave={e => e.currentTarget.style.background = lang === 'EN' ? 'rgba(255,255,255,0.08)' : 'transparent'}
                                    ><span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.9)' }}>GB</span> English</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CTA */}
                    <button onClick={() => handleHashLink('#offer')} className="btn-primary"
                        style={{ padding: '10px 22px', fontSize: '13px', borderRadius: '50px' }}>
                        {t('nav.cta')}
                    </button>
                </div>

                {/* Mobile Burger */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-burger" style={{
                    display: 'none', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 10, color: '#fff', cursor: 'pointer', padding: '10px',
                    backdropFilter: 'blur(12px)',
                }}>
                    <div style={{ width: 20, height: 2, background: 'currentColor', marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
                    <div style={{ width: 20, height: 2, background: 'currentColor', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
                    <div style={{ width: 20, height: 2, background: 'currentColor', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        style={{
                            margin: '8px 20px',
                            background: 'rgba(10,10,15,0.92)',
                            backdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 20,
                            padding: '20px 24px',
                            display: 'flex', flexDirection: 'column', gap: '4px',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.6)',
                        }}
                    >
                        {navLinks.map(link =>
                            link.isRoute ? (
                                <Link key={link.key} to={link.href} onClick={() => setMenuOpen(false)}
                                    style={{ color: '#fff', fontSize: '16px', fontWeight: 600, padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)' }}
                                >{t(link.key)}</Link>
                            ) : (
                                <button key={link.key} onClick={() => handleHashLink(link.href)}
                                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', fontWeight: 500, padding: '12px 16px', borderRadius: 12, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font)', textAlign: 'left', width: '100%' }}
                                >{t(link.key)}</button>
                            )
                        )}
                        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '8px 0' }} />

                        {/* Mobile Language Swap */}
                        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '4px', marginBottom: '8px' }}>
                            <button onClick={() => setLang('DE')} style={{
                                flex: 1, padding: '8px', borderRadius: 8, border: 'none', fontSize: '13px', fontWeight: 500,
                                background: lang === 'DE' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                color: lang === 'DE' ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s',
                                fontFamily: 'var(--font)'
                            }}>DE</button>
                            <button onClick={() => setLang('EN')} style={{
                                flex: 1, padding: '8px', borderRadius: 8, border: 'none', fontSize: '13px', fontWeight: 500,
                                background: lang === 'EN' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                color: lang === 'EN' ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s',
                                fontFamily: 'var(--font)'
                            }}>EN</button>
                        </div>

                        <button onClick={() => handleHashLink('#offer')} className="btn-primary"
                            style={{ width: '100%', padding: '13px', borderRadius: 14, fontSize: 14 }}>
                            {t('nav.cta')} →
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 880px) {
                    .desktop-nav { display: none !important; }
                    .mobile-burger { display: block !important; }
                }
            `}</style>
        </motion.nav>
    )
}
