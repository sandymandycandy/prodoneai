import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NAV_LINKS = [
    { label: 'Home',       href: '/'        },
    { label: 'Services',   href: '/services' },
    { label: 'Case Study', href: '/pilot'    },
    { label: 'Contact',    href: '/contact'  },
]

export default function NotFound() {
    const canvasRef = useRef(null)

    /* Minimal particle field — same rules as GlobalParticles (30fps, mobile-off) */
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || window.innerWidth <= 768) return
        const ctx = canvas.getContext('2d')
        let raf, w, h, pts

        function resize() {
            w = canvas.width  = canvas.offsetWidth
            h = canvas.height = canvas.offsetHeight
        }

        function init() {
            resize()
            pts = Array.from({ length: 60 }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.4 + 0.4,
            }))
        }

        let last = 0
        function draw(now) {
            raf = requestAnimationFrame(draw)
            if (now - last < 33) return   // 30fps cap
            last = now
            ctx.clearRect(0, 0, w, h)
            for (const p of pts) {
                p.x += p.vx; p.y += p.vy
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
                if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(1,115,211,0.35)'
                ctx.fill()
            }
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x
                    const dy = pts[i].y - pts[j].y
                    const d2 = dx * dx + dy * dy
                    if (d2 < 14400) {
                        ctx.beginPath()
                        ctx.moveTo(pts[i].x, pts[i].y)
                        ctx.lineTo(pts[j].x, pts[j].y)
                        ctx.strokeStyle = `rgba(1,115,211,${0.12 * (1 - d2 / 14400)})`
                        ctx.lineWidth = 0.6
                        ctx.stroke()
                    }
                }
            }
        }

        init()
        raf = requestAnimationFrame(draw)
        window.addEventListener('resize', init)
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init) }
    }, [])

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#000' }}
        >
            {/* Particle canvas */}
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />

            {/* Background glows */}
            <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(1,115,211,0.10) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none', zIndex: 0 }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px 24px', maxWidth: 680, margin: '0 auto' }}>

                {/* Giant 404 — editorial */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                        fontSize: 'clamp(120px, 20vw, 220px)',
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: '-0.06em',
                        marginBottom: 8,
                        userSelect: 'none',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        position: 'relative',
                    }}
                >
                    404
                    {/* Blue underlayer glow */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit',
                        color: 'transparent',
                        textShadow: '0 0 120px rgba(1,115,211,0.35)',
                        pointerEvents: 'none',
                        zIndex: -1,
                    }} aria-hidden="true">404</div>
                </motion.div>

                {/* Glass card */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                        padding: '44px 48px',
                        borderRadius: 28,
                        background: 'rgba(6,8,18,0.85)',
                        backdropFilter: 'blur(32px) saturate(1.6)',
                        WebkitBackdropFilter: 'blur(32px) saturate(1.6)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        boxShadow: '0 32px 80px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 1px rgba(1,115,211,0.08)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Blue top shine */}
                    <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.55), transparent)' }} />

                    {/* Section label */}
                    <div className="section-label" style={{ display: 'inline-flex', marginBottom: 20 }}>
                        PAGE NOT FOUND
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(24px, 3.2vw, 40px)',
                        fontWeight: 900,
                        letterSpacing: '-0.035em',
                        lineHeight: 1.1,
                        marginBottom: 16,
                        color: '#fff',
                    }}>
                        Looks like this page{' '}
                        <span className="shimmer-text">doesn't exist</span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(14px, 1.3vw, 16px)',
                        color: 'rgba(255,255,255,0.42)',
                        lineHeight: 1.8,
                        marginBottom: 36,
                        maxWidth: 480,
                        margin: '0 auto 36px',
                    }}>
                        The URL you visited may have moved, been renamed, or simply never existed.
                        Let's get you back on track.
                    </p>

                    {/* Primary CTA */}
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
                        <Link to="/">
                            <button className="btn-primary" style={{ fontSize: 15, padding: '14px 32px', borderRadius: 50 }}>
                                ← Back to Home
                            </button>
                        </Link>
                        <Link to="/contact">
                            <button className="btn-ghost" style={{ fontSize: 14, padding: '13px 26px', borderRadius: 50 }}>
                                Contact Us
                            </button>
                        </Link>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '0 0 28px' }} />

                    {/* Quick nav */}
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
                        Or visit one of these pages
                    </div>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {NAV_LINKS.map(link => (
                            <Link key={link.href} to={link.href} style={{ textDecoration: 'none' }}>
                                <span style={{
                                    display: 'inline-block',
                                    fontSize: 12, fontWeight: 600,
                                    color: 'rgba(255,255,255,0.55)',
                                    padding: '7px 16px',
                                    borderRadius: 50,
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    background: 'rgba(255,255,255,0.04)',
                                    cursor: 'pointer',
                                    transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.borderColor = 'rgba(1,115,211,0.35)'; e.currentTarget.style.background = 'rgba(1,115,211,0.06)' }}
                                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                                >
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.main>
    )
}
