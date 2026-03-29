import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

/* ── Editorial stat strip item (count-up logic unchanged) ── */
function StatItem({ value, unit, label, index }) {
    const [display, setDisplay] = useState('0')
    const ref = useRef(null)
    const ran = useRef(false)

    useEffect(() => {
        const target = parseFloat(value)
        if (isNaN(target)) { setDisplay(value); return }
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !ran.current) {
                ran.current = true
                let s = 0; const step = target / 40
                const id = setInterval(() => {
                    s = Math.min(s + step, target)
                    setDisplay(Number.isInteger(target) ? Math.round(s) : +s.toFixed(1))
                    if (s >= target) clearInterval(id)
                }, 28)
            }
        }, { threshold: 0.5 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [value])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.9 + index * 0.08 }}
            style={{
                flex: 1,
                paddingLeft: index === 0 ? 0 : 24,
                paddingRight: index < 3 ? 24 : 0,
                borderRight: index < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
        >
            {/* Big number */}
            <div style={{
                fontSize: 'clamp(20px, 1.9vw, 28px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1,
                marginBottom: 7,
                letterSpacing: '-0.04em',
                display: 'flex',
                alignItems: 'baseline',
                gap: 2,
            }}>
                <span>{display}</span>
                <span style={{ color: '#0173D3', fontSize: '0.62em', fontWeight: 700, letterSpacing: '-0.01em' }}>{unit}</span>
            </div>
            {/* Label */}
            <div style={{
                fontSize: 9,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.28)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
            }}>
                {label}
            </div>
        </motion.div>
    )
}

/* ── Cinematic Video Ad Showcase (visual refinements only) ── */
function VideoAdCard() {
    const [show, setShow] = useState(false)
    const { t } = useLanguage()

    useEffect(() => { setTimeout(() => setShow(true), 900) }, [])

    const metrics = [
        { label: t('hero.videoCard.reach'), value: '+340%', color: '#60a5fa' },
        { label: t('hero.videoCard.ctr'),   value: '8.7%',  color: '#0173D3' },
        { label: t('hero.videoCard.time'),  value: t('hero.videoCard.timeVal'), color: 'rgba(1,115,211,0.7)' },
    ]

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 510 }}>
            {/* Ambient blue glow behind card */}
            <div style={{
                position: 'absolute',
                top: '4%', left: '-20%', right: '-20%', bottom: '4%',
                background: 'radial-gradient(ellipse, rgba(1,115,211,0.32) 0%, transparent 65%)',
                filter: 'blur(54px)',
                pointerEvents: 'none', zIndex: 0,
            }} />

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                style={{
                    position: 'relative', zIndex: 2,
                    borderRadius: 28, overflow: 'hidden', height: 500,
                    boxShadow: '0 48px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(1,115,211,0.22), 0 0 60px rgba(1,115,211,0.12)',
                    willChange: 'transform, opacity',
                }}
            >
                <video autoPlay loop muted playsInline preload="metadata"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
                    src="/q4-campaign.mp4"
                />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, transparent 32%, transparent 46%, rgba(0,0,0,0.97) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(90deg, rgba(0,0,0,0.18) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.18) 100%)' }} />
                {/* Top shine — blue tinted */}
                <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, zIndex: 4, background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.6), transparent)' }} />

                {/* TOP BAR */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3, padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.8)', letterSpacing: '-0.01em' }}>
                            {t('hero.videoCard.title')}
                        </div>
                        <div style={{ display: 'flex', gap: 6, marginTop: 9 }}>
                            {['Meta', 'YouTube', 'TikTok'].map(p => (
                                <span key={p} style={{
                                    fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
                                    background: 'rgba(0,0,0,0.4)',
                                    border: '1px solid rgba(255,255,255,0.18)',
                                    padding: '3px 9px', borderRadius: 50, letterSpacing: '0.04em',
                                }}>{p}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 13px', borderRadius: 50, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0173D3', boxShadow: '0 0 8px rgba(1,115,211,1)', animation: 'live-blink 1.6s ease-in-out infinite' }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>{t('hero.videoCard.live')}</span>
                    </div>
                </div>

                {/* BOTTOM PANEL */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, padding: '0 18px 18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
                        <div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                {t('hero.videoCard.camp')}
                            </div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 4, letterSpacing: '0.03em' }}>
                                {t('hero.videoCard.sub')}
                            </div>
                        </div>
                        <a href="/pilot" style={{ textDecoration: 'none' }}>
                            <div style={{
                                fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.72)',
                                background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                padding: '7px 15px', borderRadius: 50, cursor: 'pointer',
                                letterSpacing: '0.02em',
                            }}>↗ Case Study</div>
                        </a>
                    </div>

                    {/* Metrics strip */}
                    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 16, overflow: 'hidden' }}>
                        {metrics.map((m, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                                style={{ flex: 1, padding: '14px 16px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', position: 'relative', overflow: 'hidden' }}
                            >
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={show ? { width: '100%' } : {}}
                                    transition={{ duration: 1.3, delay: 0.7 + i * 0.13 }}
                                    style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: m.color, boxShadow: `0 0 10px ${m.color}` }}
                                />
                                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.value}</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 5, letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 600 }}>{m.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Floating "3 Days" badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3, type: 'spring', bounce: 0.45 }}
                style={{
                    position: 'absolute', top: -24, right: -22, zIndex: 4,
                    background: 'rgba(10,10,18,0.88)',
                    border: '1px solid rgba(1,115,211,0.35)',
                    borderRadius: 18, padding: '14px 20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(1,115,211,0.12), inset 0 1px 0 rgba(255,255,255,0.10)',
                }}
            >
                <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>
                    3 <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>{t('hero.videoCard.floatTag2')}</span>
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#60a5fa', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {t('hero.videoCard.floatTag')}
                </div>
            </motion.div>

            <style>{`
                @keyframes live-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.35; }
                }
            `}</style>
        </div>
    )
}

/* ═══════════════════════════════════════════════
   HERO SECTION — Editorial Redesign
   Style guide compliant: Segoe UI, blue accent only,
   glassmorphism surfaces, pill buttons
═══════════════════════════════════════════════ */
export default function Hero() {
    const { t } = useLanguage()

    const stats = [
        { value: '3',  unit: ` ${t('hero.stats.days')}`, label: t('hero.stats.proto') },
        { value: '98', unit: '%',                         label: t('hero.stats.sat')   },
        { value: '50', unit: '+',                         label: t('hero.stats.proj')  },
        { value: '24', unit: '/7',                        label: t('hero.stats.support')},
    ]

    return (
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#000' }}>

            {/* Background — angular gradient, blue only */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(1,115,211,0.13) 0%, transparent 48%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: '70%', background: 'radial-gradient(ellipse at 80% 85%, rgba(1,115,211,0.11) 0%, transparent 62%)', pointerEvents: 'none', zIndex: 0 }} />
            {/* Subtle dot-grid texture */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none', zIndex: 0 }} />
            {/* Center-right core glow */}
            <div style={{ position: 'absolute', top: '15%', right: '-5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(1,115,211,0.10) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

            {/* Vertical accent rule — editorial structural element */}
            <div style={{
                position: 'absolute', top: 100, bottom: 80,
                left: 'max(24px, calc(50vw - 640px))',
                width: 1,
                background: 'linear-gradient(180deg, rgba(1,115,211,0.55) 0%, rgba(1,115,211,0.18) 55%, transparent 100%)',
                pointerEvents: 'none', zIndex: 5,
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: 120, paddingBottom: 100 }}>
                <div className="hero-layout" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 510px',
                    gap: 72,
                    alignItems: 'center',
                    minHeight: '82vh',
                }}>

                    {/* ── LEFT — Content ── */}
                    <div>
                        {/* Eyebrow — ruled line + text */}
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}
                        >
                            <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, #0173D3, rgba(1,115,211,0.25))', flexShrink: 0 }} />
                            <div className="section-label" style={{ marginBottom: 0 }}>
                                {t('hero.badge')}
                            </div>
                        </motion.div>

                        {/* Main headline — three-tier size contrast */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
                            style={{ marginBottom: 28 }}
                        >
                            {/* Tier 1 — subdued, sets context */}
                            <span style={{
                                display: 'block',
                                fontSize: 'clamp(20px, 2.2vw, 34px)',
                                fontWeight: 400,
                                color: 'rgba(255,255,255,0.30)',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.15,
                                marginBottom: 4,
                            }}>
                                {t('hero.title')} {t('hero.title2')}
                            </span>
                            {/* Tier 2 — flagship statement, shimmer accent */}
                            <span style={{
                                display: 'block',
                                fontSize: 'clamp(44px, 5.4vw, 80px)',
                                fontWeight: 900,
                                letterSpacing: '-0.045em',
                                lineHeight: 1.0,
                                marginBottom: 6,
                            }}>
                                <span className="shimmer-text">{t('hero.title3')}</span>
                            </span>
                            {/* Tier 3 — accent word in blue */}
                            <span style={{
                                display: 'block',
                                fontSize: 'clamp(44px, 5.4vw, 80px)',
                                fontWeight: 900,
                                letterSpacing: '-0.045em',
                                lineHeight: 1.0,
                                color: '#fff',
                            }}>
                                {t('hero.title4')}
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.48 }}
                            style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', maxWidth: 460, marginBottom: 38, lineHeight: 1.8, color: 'rgba(255,255,255,0.42)' }}
                        >
                            {t('hero.subtitle1')}{' '}
                            <span style={{ color: '#fff', fontWeight: 600 }}>{t('hero.subtitle2')}</span>
                        </motion.p>

                        {/* CTAs — pill buttons per style guide */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.64 }}
                            className="hero-cta-row"
                            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}
                        >
                            <a href="#offer">
                                <button className="btn-primary" style={{ fontSize: 15, padding: '16px 34px', borderRadius: 50 }}>
                                    {t('hero.cta')}
                                </button>
                            </a>
                            <a href="#cases">
                                <button className="btn-ghost" style={{ fontSize: 15, padding: '15px 28px', borderRadius: 50 }}>
                                    {t('hero.examples')}
                                </button>
                            </a>
                        </motion.div>

                        {/* Stats — editorial horizontal strip with ruled lines */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.82 }}
                        >
                            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 28 }} />
                            <div className="hero-stats-row" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {stats.map((s, i) => <StatItem key={i} {...s} index={i} />)}
                            </div>
                            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginTop: 28 }} />
                        </motion.div>
                    </div>

                    {/* ── RIGHT — Video card ── */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 24, width: '100%' }}>
                        <VideoAdCard />
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="hero-scroll-hint" style={{
                position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                color: 'rgba(255,255,255,0.18)', fontSize: 9, letterSpacing: '0.18em',
                textTransform: 'uppercase', zIndex: 10, fontWeight: 700,
            }}>
                <div style={{ width: 20, height: 30, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
                    <div style={{ width: 2, height: 7, background: 'rgba(255,255,255,0.28)', borderRadius: 2 }} />
                </div>
                SCROLL
            </div>

            <style>{`
                @media (max-width: 960px) {
                    .hero-layout { grid-template-columns: 1fr !important; gap: 40px !important; min-height: auto !important; }
                }
                @media (max-width: 600px) {
                    .hero-layout { padding-top: 90px !important; padding-bottom: 60px !important; padding-left: 20px !important; padding-right: 20px !important; }
                    .hero-stats-row > div { flex: 0 0 calc(50% - 12px); border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 16px; }
                    .hero-scroll-hint { display: none; }
                }
            `}</style>
        </section>
    )
}
