import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import ParticleCanvas from './ParticleCanvas'

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
            padding: '16px 28px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 16,
            backdropFilter: 'blur(16px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
            textAlign: 'center',
            flex: '1 1 auto',
        }}>
            <div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>
                <span style={{ background: 'linear-gradient(135deg,#fff,rgba(255,255,255,0.55))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{display}</span>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{unit}</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
        </div>
    )
}

/* ═══════════════════════════════════════════════
   HERO SECTION — centered, minimal
═══════════════════════════════════════════════ */
export default function Hero() {
    const { t } = useLanguage()

    const stats = [
        { value: '3', unit: ` ${t('hero.stats.days')}`, label: t('hero.stats.proto') },
        { value: '98', unit: '%', label: t('hero.stats.sat') },
        { value: '50', unit: '+', label: t('hero.stats.proj') },
    ]

    return (
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#000' }}>
            <ParticleCanvas />

            <div style={{ position: 'absolute', top: '15%', left: '10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,200,180,0.1) 0%, transparent 70%)', filter: 'blur(40px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 1 }} />
            <div className="grid-overlay" style={{ zIndex: 2, opacity: 0.3 }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: 120, paddingBottom: 100, textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
                    className="section-label" style={{ marginBottom: 32, display: 'inline-block' }}
                >
                    {t('hero.badge')}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    style={{ fontSize: 'clamp(42px, 6.5vw, 88px)', marginBottom: 28, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                >
                    {t('hero.title')} {t('hero.title2')}<br />
                    <span style={{ color: '#22d4b8' }}>
                        {t('hero.title3')}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ fontSize: 18, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)' }}
                >
                    {t('hero.subtitle1')}{' '}
                    <span style={{ color: '#fff', fontWeight: 600 }}>{t('hero.subtitle2')}</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
                    style={{ marginBottom: 64 }}
                >
                    <a href="#contact">
                        <button className="btn-primary" style={{ fontSize: 16, padding: '17px 44px', borderRadius: 50 }}>
                            {t('hero.cta')}
                        </button>
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.85 }}
                    style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 480, margin: '0 auto' }}
                >
                    {stats.map((s, i) => <StatChip key={i} {...s} />)}
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 600px) {
                    .hero-stats { flex-direction: column !important; }
                }
            `}</style>
        </section>
    )
}
