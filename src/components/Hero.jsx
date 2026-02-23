import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

/* ── Canvas Particle Constellation ── */
function ParticleCanvas() {
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let raf, w, h
        const mouse = { x: null, y: null }

        class Particle {
            constructor() { this.init() }
            init() {
                this.x = Math.random() * w; this.y = Math.random() * h
                this.vx = (Math.random() - 0.5) * 0.28; this.vy = (Math.random() - 0.5) * 0.28
                this.r = Math.random() * 1.2 + 0.3
                this.a = Math.random() * 0.45 + 0.1
                // Varied colours: white, soft purple, soft blue
                const pick = Math.random()
                if (pick < 0.5) this.hue = '255,255,255'
                else if (pick < 0.75) this.hue = '160,120,255'
                else this.hue = '80,160,255'
            }
            update() {
                this.x += this.vx; this.y += this.vy
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x, dy = this.y - mouse.y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 120) { const f = (120 - d) / 120; this.x += dx / d * f * 1.5; this.y += dy / d * f * 1.5 }
                }
                if (this.x < 0) this.x = w; if (this.x > w) this.x = 0
                if (this.y < 0) this.y = h; if (this.y > h) this.y = 0
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${this.hue},${this.a})`; ctx.fill()
            }
        }

        const init = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }
        let particles = []
        // Reduced cap from 50→28 to cut O(n²) line checks
        const build = () => { particles = Array.from({ length: Math.min(Math.floor((w * h) / 32000), 28) }, () => new Particle()) }
        init(); build()

        const CONNECT_DIST = 90 // reduced from 120
        const render = () => {
            ctx.clearRect(0, 0, w, h)
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(); particles[i].draw()
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < CONNECT_DIST) {
                        const alpha = 0.12 * (1 - dist / CONNECT_DIST)
                        if (alpha > 0.02) { // skip near-invisible lines
                            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
                            ctx.strokeStyle = `rgba(180,140,255,${alpha})`; ctx.lineWidth = 0.5; ctx.stroke()
                        }
                    }
                }
            }
            raf = requestAnimationFrame(render)
        }
        render()

        const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
        const onLeave = () => { mouse.x = null; mouse.y = null }
        const onResize = () => { init(); build() }
        window.addEventListener('resize', onResize)
        canvas.addEventListener('mousemove', onMove)
        canvas.addEventListener('mouseleave', onLeave)
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); canvas.removeEventListener('mousemove', onMove); canvas.removeEventListener('mouseleave', onLeave) }
    }, [])

    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'auto' }} />
}

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
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 16,
            backdropFilter: 'blur(16px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
            minWidth: 100,
            flex: '1 1 auto',
        }}>
            <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>
                <span style={{ background: 'linear-gradient(135deg,#fff,rgba(255,255,255,0.55))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{display}</span>
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{unit}</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
        </div>
    )
}

/* ── Liquid Glass Video Card ── */
function VideoAdCard() {
    const [show, setShow] = useState(false)
    const { t } = useLanguage()

    useEffect(() => { setTimeout(() => setShow(true), 900) }, [])

    const metrics = [
        { label: t('hero.videoCard.reach'), value: '+340%', pct: '85%', color: 'rgba(140,100,255,0.9)' },
        { label: t('hero.videoCard.ctr'), value: '8.7%', pct: '65%', color: 'rgba(80,160,255,0.9)' },
        { label: t('hero.videoCard.time'), value: t('hero.videoCard.timeVal'), pct: '30%', color: 'rgba(0,210,180,0.9)' },
    ]

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 520 }}>
            {/* Ambient glow orbs — CSS animated (no JS per frame) */}
            <div className="hero-glow-orb hero-glow-orb-1" />
            <div className="hero-glow-orb hero-glow-orb-2" />

            {/* Main glass card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                style={{
                    position: 'relative', zIndex: 2,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 28,
                    padding: 28,
                    boxShadow: '0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.14)',
                    overflow: 'hidden',
                    willChange: 'transform, opacity',
                }}
            >
                {/* Top shine */}
                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)' }} />

                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{t('hero.videoCard.title')}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{t('hero.videoCard.sub')}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                        <motion.div animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>{t('hero.videoCard.live')}</span>
                    </div>
                </div>

                {/* Video */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 18, overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
                        src="https://assets.mixkit.co/videos/preview/mixkit-artificial-intelligence-interface-with-human-brain-41584-large.mp4"
                    />
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 45%)' }} />
                    {/* Glass inner info */}
                    <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{t('hero.videoCard.camp')}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{t('hero.videoCard.var')}</div>
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: 8, backdropFilter: 'blur(8px)' }}>0:15 / 0:30</div>
                    </div>
                </div>

                {/* Metric bars */}
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {metrics.map((m, i) => (
                        <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{m.label}</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{m.value}</span>
                            </div>
                            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                                <motion.div initial={{ width: 0 }} animate={show ? { width: m.pct } : {}} transition={{ duration: 1.4, delay: 0.2 + i * 0.15, ease: [0.23, 1, 0.32, 1] }}
                                    style={{ height: '100%', background: `linear-gradient(90deg,${m.color},rgba(255,255,255,0.6))`, borderRadius: 4 }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{t('hero.videoCard.foot1')}</span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{t('hero.videoCard.foot2')}</span>
                </div>
            </motion.div>

            {/* Floating big stat orb */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
                style={{
                    position: 'absolute', top: '40%', left: -56, zIndex: 4,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 18,
                    padding: '12px 16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
            >
                <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1, background: 'linear-gradient(135deg,#fff,rgba(160,120,255,0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>+340%</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Reichweite</div>
            </motion.div>

            {/* Floating glass badge — top right */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3, type: 'spring', bounce: 0.5 }}
                style={{
                    position: 'absolute', top: -22, right: -20, zIndex: 4,
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 18,
                    padding: '14px 20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
            >
                <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1 }}>3 <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{t('hero.videoCard.floatTag2')}</span></div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('hero.videoCard.floatTag')}</div>
            </motion.div>

            {/* Floating glass tag — bottom left */}
            <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
                style={{
                    position: 'absolute', bottom: -36, left: -28, zIndex: 4,
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: 18,
                    padding: '14px 18px',
                    minWidth: 220,
                    boxShadow: '0 16px 48px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
            >
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 6, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{t('hero.videoCard.scope')}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55 }}>
                    {t('hero.videoCard.scope2')}<strong style={{ color: '#fff' }}>{t('hero.videoCard.scope3')}</strong>
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{t('hero.videoCard.scope4')}</div>
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
            <ParticleCanvas />

            {/* Multi-layer atmospheric glows */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '20%', left: '5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(100,60,240,0.25) 0%, transparent 70%)', filter: 'blur(30px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 1, willChange: 'transform, opacity' }}
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
                transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{ position: 'absolute', top: '30%', right: '5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(30,100,255,0.22) 0%, transparent 70%)', filter: 'blur(30px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 1, willChange: 'transform, opacity' }}
            />
            {/* Grid overlay */}
            <div className="grid-overlay" style={{ zIndex: 2, opacity: 0.3 }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: 110, paddingBottom: 100 }}>
                <div className="hero-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', minHeight: '82vh' }}>

                    {/* ── LEFT ── */}
                    <div>
                        {/* Badge */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
                            className="section-label" style={{ marginBottom: 32 }}>
                            {t('hero.badge')}
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            style={{ fontSize: 'clamp(38px, 4.8vw, 72px)', marginBottom: 24, lineHeight: 1.06, letterSpacing: '-0.03em' }}
                        >
                            {t('hero.title')}<br />{t('hero.title2')}<br />
                            <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.45) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {t('hero.title3')}
                            </span> {t('hero.title4')}
                        </motion.h1>

                        {/* Sub */}
                        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                            style={{ fontSize: 17, maxWidth: 500, marginBottom: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)' }}>
                            {t('hero.subtitle1')}{' '}
                            <span style={{ color: '#fff', fontWeight: 600 }}>{t('hero.subtitle2')}</span>
                        </motion.p>

                        {/* CTAs */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.68 }}
                            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
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

                        {/* Glass Stat Chips */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.85 }}
                            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {stats.map((s, i) => <StatChip key={i} {...s} />)}
                        </motion.div>
                    </div>

                    {/* ── RIGHT ── */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 24, width: '100%' }}>
                        <VideoAdCard />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
                style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.25)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', zIndex: 10 }}>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    style={{ width: 20, height: 30, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, display: 'flex', justifyContent: 'center', paddingTop: 6, backdropFilter: 'blur(8px)' }}>
                    <div style={{ width: 2, height: 7, background: 'rgba(255,255,255,0.35)', borderRadius: 2 }} />
                </motion.div>
                SCROLL
            </motion.div>

            <style>{`
                @media (max-width: 960px) {
                    .hero-layout { grid-template-columns: 1fr !important; gap: 48px !important; min-height: auto !important; }
                }
                @media (max-width: 600px) {
                    .hero-layout { padding-top: 80px; }
                }
            `}</style>
        </section>
    )
}
