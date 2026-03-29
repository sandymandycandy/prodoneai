import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

// ── SVG Icons ───────────────────────────────────────────────────────────────
const Ico = {
    video: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="9" height="8" rx="1.5" /><path d="M11 7l3.5-2v6L11 9V7z" /></svg>,
    chat: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M13 7c0 2.76-2.24 5-5 5a4.96 4.96 0 01-2.92-.95L2 12l.95-3.08A4.96 4.96 0 013 7c0-2.76 2.24-5 5-5s5 2.24 5 5z" /><circle cx="5.5" cy="7" r=".55" fill="currentColor" stroke="none" /><circle cx="8" cy="7" r=".55" fill="currentColor" stroke="none" /><circle cx="10.5" cy="7" r=".55" fill="currentColor" stroke="none" /></svg>,
    chart: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 12V9M6.5 12V7M10 12V5M13.5 12V3M1.5 12h13" /></svg>,
    sparkle: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.75 3.75l1.5 1.5M10.75 10.75l1.5 1.5M3.75 12.25l1.5-1.5M10.75 5.25l1.5-1.5" /><circle cx="8" cy="8" r="2" /></svg>,
    shop: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 5h9l-1.2 8H4.7L3.5 5z" /><path d="M6 5a2 2 0 014 0" /></svg>,
    building: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="12" height="12" rx="1" /><path d="M5 6h2M9 6h2M5 9h2M9 9h2M6.5 14v-4h3v4" /></svg>,
    car: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 9.5L3.5 5.5h9l2 4H1.5z" /><circle cx="4.5" cy="12" r="1.5" /><circle cx="11.5" cy="12" r="1.5" /></svg>,
    cap: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4L14.5 7.5 8 11 1.5 7.5 8 4z" /><path d="M5 9.3V12c0 .83 1.35 1.5 3 1.5S11 12.83 11 12V9.3" /><path d="M14.5 7.5v4" /></svg>,
    globe: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><circle cx="8" cy="8" r="6" /><path d="M2 8h12" /><path d="M8 2c-1.7 2.1-2.5 3.9-2.5 6S6.3 12 8 14M8 2c1.7 2.1 2.5 3.9 2.5 6S9.7 12 8 14" /></svg>,
    racing: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M1 10L3 5.5h10L15 10H1z" /><circle cx="5" cy="11.5" r="1.5" /><circle cx="11" cy="11.5" r="1.5" /><path d="M3 8h5M9.5 8h2.5" /></svg>,
    book: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h4.5v10H3a1 1 0 01-1-1V4a1 1 0 011-1z" /><path d="M8.5 3H13a1 1 0 011 1v8a1 1 0 01-1 1H8.5V3z" /><path d="M8.5 3v10" /></svg>,
    bolt: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2L4 9h5l-2.5 5 8-8H9.5l2-4h-2z" /></svg>,
    star: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2l1.5 4H14l-3.5 2.5 1.5 4.5L8 11l-4 2.5 1.5-4.5L2 6h4.5L8 2z" /></svg>,
    flow: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><circle cx="4" cy="8" r="2" /><circle cx="12" cy="8" r="2" /><path d="M6 8h4" /><path d="M4 3v3M4 10v3M12 3v3M12 10v3" /></svg>,
    hand: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6.5l4 4.5M14 6.5l-4 4.5M6 11h4" /><path d="M5 8.5l2-2h2l2 2" /></svg>,
    help: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><circle cx="8" cy="8" r="6" /><path d="M8 10.5v.5" /><path d="M8 9.5c0-1.5 2-1.5 2-3a2 2 0 10-4 0" /></svg>,
    mail: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4.5" width="12" height="8" rx="1.5" /><path d="M2 6.5l6 3.5 6-3.5" /></svg>,
    gift: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="12" height="7" rx="1" /><rect x="2" y="5" width="12" height="2" rx=".5" /><path d="M8 5v9" /><path d="M5.5 5C5.5 3.3 6.5 2 8 2s2.5 1.3 2.5 3" /></svg>,
}

// ── Menu data ───────────────────────────────────────────────────────────────
const MENUS = {
    services: {
        cols: [
            {
                title: 'WHAT WE BUILD',
                accentColor: '#0173D3',
                items: [
                    { icon: 'video', iconColor: '#60a5fa', bg: 'rgba(1,115,211,0.14)', border: 'rgba(1,115,211,0.26)', glow: 'rgba(1,115,211,0.18)', label: 'AI Video Ads', desc: '3-day campaign delivery', href: '/services#ai-ads', isRoute: true },
                    { icon: 'chat', iconColor: '#93bbfc', bg: 'rgba(60,120,240,0.12)', border: 'rgba(60,120,240,0.24)', glow: 'rgba(60,120,240,0.14)', label: 'AI Chatbots', desc: 'Enterprise customer automation', href: '/services#ai-agent', isRoute: true },
                    { icon: 'chart', iconColor: '#34d399', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.24)', glow: 'rgba(16,185,129,0.14)', label: 'AI Analytics', desc: 'Real-time performance dashboards', href: '/services#content-workflow', isRoute: true },
                    { icon: 'sparkle', iconColor: '#c4b5fd', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.24)', glow: 'rgba(139,92,246,0.14)', label: 'Custom AI Solutions', desc: 'Tailored enterprise AI', href: '/services#custom-apps', isRoute: true },
                ],
            },
            {
                title: 'BY INDUSTRY',
                accentColor: '#9c6cfa',
                items: [
                    { icon: 'shop', iconColor: '#fdba74', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.24)', glow: 'rgba(251,146,60,0.12)', label: 'Retail & E-commerce', desc: 'Scale product campaigns', href: '/services#ai-ads', isRoute: true },
                    { icon: 'building', iconColor: '#94a3b8', bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.22)', glow: 'rgba(100,116,139,0.10)', label: 'Enterprise', desc: 'Complex workflow automation', href: '/services#custom-apps', isRoute: true },
                    { icon: 'car', iconColor: '#fca5a5', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.22)', glow: 'rgba(239,68,68,0.12)', label: 'Automotive', desc: 'Lead generation at scale', href: '/services#ai-agent', isRoute: true },
                    { icon: 'cap', iconColor: '#fcd34d', bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.22)', glow: 'rgba(234,179,8,0.12)', label: 'Education', desc: 'Engagement & outreach AI', href: '/services#content-workflow', isRoute: true },
                ],
            },
        ],
        featured: {
            badge: 'FEATURED CLIENT',
            title: 'Globus Q4 2024',
            subtitle: 'German Retail Campaign',
            stats: [{ v: '+340%', l: 'Reach', c: '#4da6ff' }, { v: '3 Days', l: 'Delivered', c: '#34d399' }, { v: '−70%', l: 'Cost', c: '#c4b5fd' }],
            href: '/pilot', cta: 'See Full Case Study',
        },
    },
    results: {
        cols: [
            {
                title: 'CASE STUDIES',
                accentColor: '#0173D3',
                items: [
                    { icon: 'globe', iconColor: '#60a5fa', bg: 'rgba(1,115,211,0.14)', border: 'rgba(1,115,211,0.26)', glow: 'rgba(1,115,211,0.16)', label: 'Globus GmbH', desc: '+340% reach · German Retail · Q4 2024', href: '/pilot', isRoute: true },
                    { icon: 'racing', iconColor: '#fca5a5', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.22)', glow: 'rgba(239,68,68,0.12)', label: 'Orr Motors', desc: '+52% leads · Automotive · Q1 2024', href: '/results', isRoute: true },
                    { icon: 'book', iconColor: '#fcd34d', bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.22)', glow: 'rgba(234,179,8,0.12)', label: 'DHBW', desc: 'AI integration · Education · 2024', href: '/results', isRoute: true },
                    { icon: 'bolt', iconColor: '#6ee7b7', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.22)', glow: 'rgba(16,185,129,0.12)', label: 'StreetDrive', desc: 'Campaign automation · Mobility', href: '/results', isRoute: true },
                ],
            },
        ],
        featured: {
            badge: 'AVERAGE RESULTS',
            title: 'Across all clients',
            subtitle: 'Verified & delivered',
            stats: [{ v: '50+', l: 'Projects', c: '#4da6ff' }, { v: '98%', l: 'Satisfaction', c: '#34d399' }, { v: '3 Days', l: 'Delivery', c: '#c4b5fd' }],
            href: '/results', cta: 'View All Results',
        },
    },
    company: {
        cols: [
            {
                title: 'COMPANY',
                accentColor: '#9c6cfa',
                items: [
                    { icon: 'star', iconColor: '#c4b5fd', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.24)', glow: 'rgba(139,92,246,0.14)', label: 'About Us', desc: 'Our story, vision & team', href: '/company', isRoute: true },
                    { icon: 'flow', iconColor: '#94a3b8', bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.22)', glow: 'rgba(100,116,139,0.10)', label: 'How We Work', desc: 'Our proven 3-day process', href: '/company', isRoute: true },
                    { icon: 'hand', iconColor: '#60a5fa', bg: 'rgba(1,115,211,0.12)', border: 'rgba(1,115,211,0.22)', glow: 'rgba(1,115,211,0.12)', label: 'Partners', desc: 'Agencies & reseller program', href: '/contact', isRoute: true },
                ],
            },
            {
                title: 'SUPPORT',
                accentColor: '#10b981',
                items: [
                    { icon: 'help', iconColor: '#fcd34d', bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.22)', glow: 'rgba(234,179,8,0.12)', label: 'FAQ', desc: 'Answers to common questions', href: '/faq', isRoute: true },
                    { icon: 'mail', iconColor: '#60a5fa', bg: 'rgba(1,115,211,0.12)', border: 'rgba(1,115,211,0.22)', glow: 'rgba(1,115,211,0.12)', label: 'Contact', desc: 'hello@prodone.ai', href: '/contact', isRoute: true },
                    { icon: 'gift', iconColor: '#6ee7b7', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.22)', glow: 'rgba(16,185,129,0.12)', label: 'Free Prototype', desc: 'No risk · ready in 3 days', href: '/contact', isRoute: true },
                ],
            },
        ],
    },
}

// ── Chevron ─────────────────────────────────────────────────────────────────
function Chevron({ open }) {
    return (
        <motion.svg width="10" height="6" viewBox="0 0 10 6" fill="none"
            animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
            style={{ opacity: 0.4, marginLeft: 2, flexShrink: 0 }}>
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
    )
}

// ── Menu item ───────────────────────────────────────────────────────────────
function MenuItem({ item, onClose, navigate, location, delay = 0 }) {
    const [hov, setHov] = useState(false)

    const handleClick = () => {
        onClose()
        if (item.href?.startsWith('#')) {
            if (location.pathname !== '/') { navigate('/'); setTimeout(() => document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' }), 400) }
            else document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const inner = (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: 13,
                padding: '10px 12px',
                paddingLeft: hov ? 9 : 12,
                borderLeft: `2px solid ${hov ? item.border : 'transparent'}`,
                borderRadius: 14, cursor: 'pointer',
                background: hov ? 'rgba(255,255,255,0.05)' : 'transparent',
                transition: 'background 0.18s, padding-left 0.15s, border-color 0.15s',
            }}
        >
            {/* Icon box */}
            <motion.div
                animate={{
                    scale: hov ? 1.1 : 1,
                    boxShadow: hov ? `0 0 0 3px ${item.glow}, 0 4px 14px ${item.glow}` : '0 1px 4px rgba(0,0,0,0.18)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                style={{
                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                    background: item.bg, border: `1px solid ${item.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: item.iconColor,
                }}
            >
                {Ico[item.icon]?.()}
            </motion.div>

            {/* Label + desc */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: hov ? '#fff' : 'rgba(255,255,255,0.88)', marginBottom: 2, letterSpacing: '-0.01em', transition: 'color 0.15s' }}>
                    {item.label}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', lineHeight: 1.45, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.desc}
                </div>
            </div>

            {/* Arrow */}
            <motion.span
                animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : -5 }}
                transition={{ duration: 0.15 }}
                style={{ fontSize: 13, color: item.iconColor, flexShrink: 0 }}
            >→</motion.span>
        </motion.div>
    )

    if (item.isRoute) return <Link to={item.href} onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>{inner}</Link>
    return <div onClick={handleClick}>{inner}</div>
}

// ── Mega panel ──────────────────────────────────────────────────────────────
function MegaPanel({ menu, onClose, navigate, location }) {
    const { cols, featured } = menu
    return (
        <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'absolute', top: 'calc(100% + 16px)', left: '50%', transform: 'translateX(-50%)',
                width: featured ? 820 : 560,
                background: 'rgba(5,5,13,0.97)',
                backdropFilter: 'blur(40px) saturate(1.8)',
                WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                boxShadow: '0 32px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(1,115,211,0.06), inset 0 1px 0 rgba(255,255,255,0.09)',
                padding: 18,
                display: 'grid',
                gridTemplateColumns: cols.map(() => '1fr').join(' ') + (featured ? ' 240px' : ''),
                gap: 6,
                zIndex: 2000, overflow: 'hidden',
            }}
        >
            {/* Ambient top glow */}
            <div style={{ position: 'absolute', top: -50, left: '25%', right: '25%', height: 90, background: 'radial-gradient(ellipse,rgba(1,115,211,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
            {/* Top line */}
            <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(1,115,211,0.55),transparent)' }} />

            {/* Columns */}
            {cols.map((col, ci) => (
                <div key={ci} style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.02 + ci * 0.04, duration: 0.2 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px 12px 10px' }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 3, repeat: Infinity, delay: ci * 0.5 }}
                            style={{ width: 5, height: 5, borderRadius: '50%', background: col.accentColor, boxShadow: `0 0 6px ${col.accentColor}`, display: 'inline-block', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                            {col.title}
                        </span>
                    </motion.div>
                    {col.items.map((item, ii) => (
                        <MenuItem key={ii} item={item} onClose={onClose} navigate={navigate} location={location}
                            delay={0.05 + ci * 0.06 + ii * 0.038} />
                    ))}
                </div>
            ))}

            {/* Featured card */}
            {featured && (
                <motion.div
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06, duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                        position: 'relative', zIndex: 1,
                        borderLeft: '1px solid rgba(255,255,255,0.07)',
                        background: 'linear-gradient(160deg,rgba(1,115,211,0.07) 0%,rgba(139,92,246,0.04) 100%)',
                        borderRadius: '0 16px 16px 0',
                        margin: '-18px -18px -18px 0', padding: '20px 18px',
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 110, height: 110, background: 'radial-gradient(circle,rgba(1,115,211,0.16) 0%,transparent 65%)', pointerEvents: 'none' }} />

                    <div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
                            style={{ fontSize: 9, fontWeight: 800, color: 'rgba(1,115,211,0.85)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
                            {featured.badge}
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
                            style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 3, letterSpacing: '-0.02em' }}>
                            {featured.title}
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
                            style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                            {featured.subtitle}
                        </motion.div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
                            {featured.stats.map((s, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, scale: 0.88 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.18 + i * 0.06, type: 'spring', stiffness: 280, damping: 20 }}
                                    style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '9px 13px', borderRadius: 11,
                                        background: `${s.c}18`,
                                        border: `1px solid ${s.c}35`,
                                    }}
                                >
                                    <span style={{ fontSize: 19, fontWeight: 900, color: s.c, letterSpacing: '-0.025em', lineHeight: 1 }}>{s.v}</span>
                                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.09em' }}>{s.l}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <Link to={featured.href} onClick={onClose} style={{ textDecoration: 'none' }}>
                        <FeaturedCTA label={featured.cta} />
                    </Link>
                </motion.div>
            )}
        </motion.div>
    )
}

function FeaturedCTA({ label }) {
    const [hov, setHov] = useState(false)
    return (
        <motion.div
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            animate={{ background: hov ? 'rgba(1,115,211,0.22)' : 'rgba(1,115,211,0.10)' }}
            style={{
                fontSize: 12, fontWeight: 600, color: hov ? '#fff' : '#4da6ff',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', borderRadius: 11, cursor: 'pointer',
                border: `1px solid rgba(1,115,211,${hov ? '0.42' : '0.26'})`,
                boxShadow: hov ? '0 4px 18px rgba(1,115,211,0.22)' : 'none',
                transition: 'color 0.2s, border-color 0.2s, box-shadow 0.2s',
            }}
        >
            {label}
            <motion.span animate={{ x: hov ? 3 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>→</motion.span>
        </motion.div>
    )
}

// ── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [activeMenu, setActiveMenu] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [langOpen, setLangOpen] = useState(false)
    const closeTimer = useRef(null)
    const { lang, setLang, t } = useLanguage()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', fn)
        return () => window.removeEventListener('scroll', fn)
    }, [])

    const openMenu = useCallback((key) => { clearTimeout(closeTimer.current); setActiveMenu(key) }, [])
    const scheduleClose = useCallback(() => { closeTimer.current = setTimeout(() => setActiveMenu(null), 120) }, [])
    const closeAll = useCallback(() => { clearTimeout(closeTimer.current); setActiveMenu(null); setLangOpen(false) }, [])

    const isActive = useCallback((item) => {
        if (item.href) return location.pathname === item.href
        if (item.menu === 'services') return location.pathname.startsWith('/services')
        if (item.menu === 'results') return location.pathname.startsWith('/results') || location.pathname === '/pilot'
        if (item.menu === 'company') return location.pathname.startsWith('/company')
        return false
    }, [location.pathname])

    const topNav = [
        { id: 'services', label: t('nav.services') || 'Services', menu: 'services' },
        { id: 'results', label: 'Results', menu: 'results' },
        { id: 'company', label: 'Company', menu: 'company' },
        { id: 'faq', label: 'FAQ', href: '/faq', isRoute: true },
        { id: 'contact', label: t('nav.contact') || 'Contact', href: '/contact', isRoute: true },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                    padding: scrolled ? '8px 0' : '14px 0',
                    background: scrolled ? 'rgba(5,5,12,0.90)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(28px) saturate(1.7)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(1.7)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(1,115,211,0.07)' : 'none',
                    transition: 'padding 0.4s, background 0.4s, backdrop-filter 0.4s, box-shadow 0.4s',
                }}
            >
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

                    {/* Logo */}
                    <Link to="/" onClick={closeAll} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)', overflow: 'hidden' }}>
                            <img src="/logo.png" alt="prodone.ai" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                        </div>
                        <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.025em' }}>
                            prodone<span style={{ color: 'rgba(255,255,255,0.38)' }}>.ai</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
                        {topNav.map(item => (
                            <NavItem
                                key={item.id}
                                item={item}
                                active={isActive(item)}
                                menuOpen={activeMenu === item.menu}
                                onEnter={() => item.menu && openMenu(item.menu)}
                                onLeave={() => item.menu && scheduleClose()}
                                onClick={() => item.href
                                    ? (closeAll(), navigate(item.href))
                                    : openMenu(activeMenu === item.menu ? null : item.menu)
                                }
                                renderPanel={activeMenu === item.menu && item.menu ? (
                                    <div onMouseEnter={() => openMenu(item.menu)} onMouseLeave={scheduleClose}>
                                        <MegaPanel menu={MENUS[item.menu]} onClose={closeAll} navigate={navigate} location={location} />
                                    </div>
                                ) : null}
                            />
                        ))}

                        {/* Pilot project */}
                        <PilotLink active={location.pathname === '/pilot'} onClick={closeAll} label={t('nav.pilot') || 'Pilot Project'} />
                    </nav>

                    {/* Right: lang + CTA */}
                    <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        <LangToggle lang={lang} setLang={setLang} open={langOpen} setOpen={setLangOpen} onOpenChange={() => setActiveMenu(null)} />
                        <NavCTA onClick={() => { closeAll(); navigate('/contact') }} label={t('nav.cta') || 'Request Prototype'} />
                    </div>

                    {/* Mobile burger */}
                    <button onClick={() => setMenuOpen(v => !v)} className="mobile-burger" style={{ display: 'none', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', cursor: 'pointer', padding: '10px', backdropFilter: 'blur(6px)' }}>
                        <div style={{ width: 20, height: 2, background: 'currentColor', marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
                        <div style={{ width: 20, height: 2, background: 'currentColor', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
                        <div style={{ width: 20, height: 2, background: 'currentColor', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
                    </button>
                </div>
            </motion.nav>

            {/* Backdrop */}
            <AnimatePresence>
                {activeMenu && (
                    <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        onClick={closeAll}
                        style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }} />
                )}
            </AnimatePresence>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                        style={{ position: 'fixed', top: 70, left: 16, right: 16, zIndex: 1001, background: 'rgba(5,5,13,0.97)', backdropFilter: 'blur(36px) saturate(1.6)', WebkitBackdropFilter: 'blur(36px) saturate(1.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 14, boxShadow: '0 30px 80px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.08)', maxHeight: 'calc(100vh - 90px)', overflowY: 'auto', overflow: 'hidden' }}
                    >
                        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(1,115,211,0.5),transparent)' }} />

                        {[
                            { label: 'Services', href: '/services', iconKey: 'sparkle', iconColor: '#c4b5fd', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.24)' },
                            { label: 'Results', href: '/results', iconKey: 'chart', iconColor: '#34d399', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.24)' },
                            { label: 'Company', href: '/company', iconKey: 'star', iconColor: '#60a5fa', bg: 'rgba(1,115,211,0.12)', border: 'rgba(1,115,211,0.24)' },
                            { label: 'FAQ', href: '/faq', iconKey: 'help', iconColor: '#fcd34d', bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.24)' },
                            { label: 'Contact', href: '/contact', iconKey: 'mail', iconColor: '#60a5fa', bg: 'rgba(1,115,211,0.12)', border: 'rgba(1,115,211,0.24)' },
                        ].map((item, i) => {
                            const ia = location.pathname === item.href
                            return (
                                <motion.div key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.22 }}>
                                    <Link to={item.href} onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '12px 12px', marginBottom: 3, color: ia ? '#fff' : 'rgba(255,255,255,0.72)', fontSize: 15, fontWeight: ia ? 600 : 500, background: ia ? `${item.bg}` : 'transparent', border: ia ? `1px solid ${item.border}` : '1px solid transparent', borderRadius: 14, textDecoration: 'none', transition: 'all 0.2s' }}>
                                        <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: item.bg, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.iconColor }}>
                                            {Ico[item.iconKey]?.()}
                                        </div>
                                        {item.label}
                                        {ia && <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: item.iconColor, flexShrink: 0 }} />}
                                    </Link>
                                </motion.div>
                            )
                        })}

                        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '10px 0 12px' }} />

                        <Link to="/pilot" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '12px 12px', color: '#fff', fontSize: 15, fontWeight: 600, background: 'rgba(1,115,211,0.10)', border: '1px solid rgba(1,115,211,0.24)', borderRadius: 14, textDecoration: 'none', marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: 'rgba(1,115,211,0.14)', border: '1px solid rgba(1,115,211,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>{Ico.bolt()}</div>
                            Pilot Project
                            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }} style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 800, color: '#4da6ff', background: 'rgba(1,115,211,0.15)', border: '1px solid rgba(1,115,211,0.3)', padding: '2px 6px', borderRadius: 4, letterSpacing: '0.07em', flexShrink: 0 }}>NEW</motion.span>
                        </Link>

                        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 4, marginBottom: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                            {[['EN', 'English'], ['DE', 'Deutsch']].map(([code, label]) => (
                                <button key={code} onClick={() => setLang(code)} style={{ flex: 1, padding: '10px', borderRadius: 11, border: 'none', background: lang === code ? 'rgba(1,115,211,0.16)' : 'transparent', color: lang === code ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font)' }}>
                                    {code} <span style={{ opacity: 0.5, fontWeight: 400 }}>— {label}</span>
                                </button>
                            ))}
                        </div>

                        <button onClick={() => { setMenuOpen(false); navigate('/contact') }} className="btn-primary" style={{ width: '100%', padding: '14px', borderRadius: 14, fontSize: 14 }}>
                            {t('nav.cta') || 'Request Prototype'} →
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 980px) { .desktop-nav { display: none !important; } .mobile-burger { display: block !important; } }
            `}</style>
        </>
    )
}

// ── Sub-components ───────────────────────────────────────────────────────────
function NavItem({ item, active, menuOpen, onEnter, onLeave, onClick, renderPanel }) {
    const [hov, setHov] = useState(false)
    const lit = menuOpen || active
    return (
        <div style={{ position: 'relative' }} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <button
                onClick={onClick}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 13px', color: lit || hov ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: active ? 600 : 500, background: menuOpen ? 'rgba(255,255,255,0.08)' : hov ? 'rgba(255,255,255,0.05)' : active ? 'rgba(255,255,255,0.04)' : 'transparent', border: 'none', borderRadius: 50, cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.22s', position: 'relative' }}
            >
                {item.label}
                {item.menu && <Chevron open={menuOpen} />}
                {active && (
                    <motion.span
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        style={{ position: 'absolute', bottom: 3, left: '50%', translateX: '-50%', width: 4, height: 4, borderRadius: '50%', background: '#0173D3', boxShadow: '0 0 7px rgba(1,115,211,0.9)' }}
                    />
                )}
            </button>
            <AnimatePresence>{renderPanel}</AnimatePresence>
        </div>
    )
}

function PilotLink({ active, onClick, label }) {
    const [hov, setHov] = useState(false)
    return (
        <Link to="/pilot" onClick={onClick}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 13px', position: 'relative', color: active || hov ? '#fff' : 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: active ? 600 : 500, background: active ? 'rgba(1,115,211,0.14)' : hov ? 'rgba(255,255,255,0.05)' : 'transparent', border: active ? '1px solid rgba(1,115,211,0.30)' : hov ? '1px solid rgba(255,255,255,0.09)' : '1px solid transparent', borderRadius: 50, textDecoration: 'none', transition: 'all 0.22s' }}
        >
            {label}
            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }}
                style={{ fontSize: 8, fontWeight: 800, color: '#4da6ff', background: 'rgba(1,115,211,0.14)', border: '1px solid rgba(1,115,211,0.30)', padding: '2px 5px', borderRadius: 4, letterSpacing: '0.07em', lineHeight: 1 }}>
                NEW
            </motion.span>
        </Link>
    )
}

function LangToggle({ lang, setLang, open, setOpen, onOpenChange }) {
    const [hov, setHov] = useState(false)
    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => { setOpen(v => !v); onOpenChange() }}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: hov ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', padding: '7px 13px', borderRadius: 50, color: hov ? '#fff' : 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font)', backdropFilter: 'blur(8px)', transition: 'all 0.22s' }}
            >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: lang === 'EN' ? '#0173D3' : '#ef4444', boxShadow: `0 0 6px ${lang === 'EN' ? 'rgba(1,115,211,0.8)' : 'rgba(239,68,68,0.8)'}`, flexShrink: 0 }} />
                {lang}
                <Chevron open={open} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.16 }}
                        style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, background: 'rgba(5,5,13,0.97)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 16, padding: 6, minWidth: 150, zIndex: 2001, boxShadow: '0 20px 50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                        {[['EN', 'English', '#0173D3'], ['DE', 'Deutsch', '#ef4444']].map(([code, label, dot]) => (
                            <LangOption key={code} code={code} label={label} dot={dot} active={lang === code} onClick={() => { setLang(code); setOpen(false) }} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function LangOption({ label, dot, active, onClick }) {
    const [hov, setHov] = useState(false)
    return (
        <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '10px 12px', borderRadius: 11, border: 'none', background: active ? 'rgba(1,115,211,0.12)' : hov ? 'rgba(255,255,255,0.06)' : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: active ? 600 : 500, cursor: 'pointer', fontFamily: 'var(--font)', textAlign: 'left', transition: 'all 0.18s' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, boxShadow: active ? `0 0 6px ${dot}` : 'none', flexShrink: 0 }} />
            {label}
            {active && <span style={{ marginLeft: 'auto', fontSize: 11, color: '#0173D3', fontWeight: 700 }}>✓</span>}
        </button>
    )
}

function NavCTA({ onClick, label }) {
    const [hov, setHov] = useState(false)
    return (
        <motion.button
            onClick={onClick}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            animate={{ boxShadow: hov ? '0 0 24px rgba(1,115,211,0.4)' : '0 0 0px rgba(1,115,211,0)' }}
            transition={{ duration: 0.25 }}
            className="btn-primary"
            style={{ padding: '9px 20px', fontSize: 13, borderRadius: 50, whiteSpace: 'nowrap', cursor: 'pointer' }}
        >
            {label}
        </motion.button>
    )
}
