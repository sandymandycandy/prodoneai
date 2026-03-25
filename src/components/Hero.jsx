import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

/* ── Counting stat chip ── */
function StatChip({ value, unit, label }) {
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
        <div ref={ref} style={{
            padding: '16px 22px',
            background: 'rgba(10,10,24,0.75)',
            backdropFilter: 'blur(16px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.09)',
            minWidth: 100,
            flex: '1 1 auto',
            transition: 'border-color 0.3s, box-shadow 0.3s',
        }}>
            <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>
                <span style={{ background: 'linear-gradient(135deg,#fff,rgba(255,255,255,0.55))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{display}</span>
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{unit}</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
        </div>
    )
}

/* ── Cinematic Video Ad Showcase ── */
function VideoAdCard() {
    const [show, setShow] = useState(false)
    const { t } = useLanguage()

    useEffect(() => { setTimeout(() => setShow(true), 900) }, [])

    const metrics = [
        { label: t('hero.videoCard.reach'), value: '+340%', pct: '85%', color: '#a06cff' },
        { label: t('hero.videoCard.ctr'), value: '8.7%', pct: '65%', color: '#50a0ff' },
        { label: t('hero.videoCard.time'), value: t('hero.videoCard.timeVal'), pct: '30%', color: '#00d2b4' },
    ]

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 520 }}>
            <div className="hero-glow-orb hero-glow-orb-1" />
            <div className="hero-glow-orb hero-glow-orb-2" />

            {/* ══ CINEMATIC CARD — video fills the whole frame ══ */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                style={{
                    position: 'relative', zIndex: 2,
                    borderRadius: 28, overflow: 'hidden', height: 500,
                    boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.1)',
                    willChange: 'transform, opacity',
                }}
            >
                {/* Video background */}
                <video autoPlay loop muted playsInline preload="metadata"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
                    src="/q4-campaign.mp4"
                />

                {/* Top-to-middle dark gradient */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, transparent 32%, transparent 46%, rgba(0,0,0,0.97) 100%)' }} />
                {/* Side vignette */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(90deg, rgba(0,0,0,0.18) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.18) 100%)' }} />
                {/* Top shine */}
                <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, zIndex: 4, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.32), transparent)' }} />

                {/* ── TOP BAR ── */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3, padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.8)', letterSpacing: '-0.01em' }}>
                            {t('hero.videoCard.title')}
                        </div>
                        {/* Platform chips */}
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
                    {/* Live badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 13px', borderRadius: 50, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <motion.div animate={{ opacity: [1, 0.1, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                            style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff4444', boxShadow: '0 0 8px rgba(255,60,60,1)' }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>{t('hero.videoCard.live')}</span>
                    </div>
                </div>

                {/* ── BOTTOM PANEL — all inside the card ── */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, padding: '0 18px 18px' }}>

                    {/* Campaign row */}
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
                                border: '1px solid rgba(255,255,255,0.18)',
                                padding: '7px 15px', borderRadius: 50, cursor: 'pointer',
                                letterSpacing: '0.02em',
                            }}>↗ Case Study</div>
                        </a>
                    </div>

                    {/* ── Single frosted stats strip ── */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(0,0,0,0.65)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 16, overflow: 'hidden',
                    }}>
                        {metrics.map((m, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                                style={{
                                    flex: 1, padding: '14px 16px',
                                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                                    position: 'relative', overflow: 'hidden',
                                }}
                            >
                                {/* Glowing bottom colour bar */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={show ? { width: '100%' } : {}}
                                    transition={{ duration: 1.3, delay: 0.7 + i * 0.13 }}
                                    style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: m.color, boxShadow: `0 0 10px ${m.color}` }}
                                />
                                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{m.value}</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 5, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{m.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ── Floating "3 Days" badge — top right only ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3, type: 'spring', bounce: 0.45 }}
                style={{
                    position: 'absolute', top: -24, right: -22, zIndex: 4,
                    background: 'rgba(10,10,18,0.85)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 18, padding: '14px 20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
            >
                <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                    3 <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>{t('hero.videoCard.floatTag2')}</span>
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {t('hero.videoCard.floatTag')}
                </div>
            </motion.div>
        </div>
    )
}

/* ═══════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════ */
export default function Hero() {
    const { t } = useLanguage()

    const stats = [
        { value: '3', unit: ` ${t('hero.stats.days')}`, label: t('hero.stats.proto') },
        { value: '98', unit: '%', label: t('hero.stats.sat') },
        { value: '50', unit: '+', label: t('hero.stats.proj') },
        { value: '24', unit: '/7', label: t('hero.stats.support') },
    ]

    return (
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#000' }}>
            {/* Glass backdrop blobs */}
            <div style={{ position: 'absolute', top: '-15%', left: '10%', width: 900, height: 700, background: 'radial-gradient(ellipse, rgba(1,115,211,0.14) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(80,40,200,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: 110, paddingBottom: 100 }}>
                <div className="hero-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', minHeight: '82vh' }}>

                    {/* ── LEFT ── */}
                    <div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
                            className="section-label" style={{ marginBottom: 32 }}>
                            {t('hero.badge')}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            style={{ fontSize: 'clamp(38px, 4.8vw, 72px)', marginBottom: 24, lineHeight: 1.06, letterSpacing: '-0.03em' }}
                        >
                            {t('hero.title')}<br />{t('hero.title2')}<br />
                            <span className="shimmer-text">
                                {t('hero.title3')}
                            </span> {t('hero.title4')}
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                            style={{ fontSize: 17, maxWidth: 500, marginBottom: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)' }}>
                            {t('hero.subtitle1')}{' '}
                            <span style={{ color: '#fff', fontWeight: 600 }}>{t('hero.subtitle2')}</span>
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.68 }}
                            className="hero-cta-row" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
                            <a href="#offer">
                                <button className="btn-primary" style={{ fontSize: 15, padding: '16px 34px', borderRadius: 50 }}>{t('hero.cta')}</button>
                            </a>
                            <a href="#cases">
                                <button className="btn-ghost" style={{ fontSize: 15, padding: '15px 28px', borderRadius: 50 }}>{t('hero.examples')}</button>
                            </a>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.85 }}
                            className="hero-stat-chips" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {stats.map((s, i) => <StatChip key={i} {...s} />)}
                        </motion.div>
                    </div>

                    {/* ── RIGHT ── */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 24, width: '100%' }}>
                        <VideoAdCard />
                    </div>
                </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
                style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.25)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', zIndex: 10 }}>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    style={{ width: 20, height: 30, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, display: 'flex', justifyContent: 'center', paddingTop: 6, backdropFilter: 'blur(8px)' }}>
                    <div style={{ width: 2, height: 7, background: 'rgba(255,255,255,0.35)', borderRadius: 2 }} />
                </motion.div>
                SCROLL
            </motion.div>

            <style>{`
                @media (max-width: 900px) {
                    .hero-layout { grid-template-columns: 1fr !important; gap: 40px !important; min-height: auto !important; }
                }
                @media (max-width: 600px) {
                    .hero-layout { padding-top: 90px !important; padding-bottom: 60px !important; }
                }
            `}</style>
        </section>
    )
}
