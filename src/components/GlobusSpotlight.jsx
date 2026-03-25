import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const METRICS = [
    { value: '+340%', label: 'Organic Reach' },
    { value: '8.7%',  label: 'Ad CTR' },
    { value: '3 Days', label: 'Delivered In' },
    { value: '−70%',  label: 'Production Cost' },
]

export default function GlobusSpotlight() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} style={{
            padding: '100px 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Glass backdrop blobs */}
            <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: 750, height: 750, background: 'radial-gradient(circle, rgba(1,115,211,0.15) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-8%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(80,40,200,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* Top label */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    style={{ marginBottom: 56 }}
                >
                    <div className="section-label">FEATURED CLIENT</div>
                </motion.div>

                {/* Main 2-col layout */}
                <div className="globus-grid">

                    {/* ── LEFT: Copy ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {/* Globus badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            padding: '8px 16px 8px 12px',
                            borderRadius: 12,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.10)',
                            marginBottom: 28,
                        }}>
                            <img src="/globus-logo.svg" alt="Globus" style={{ width: 36, height: 'auto' }} />
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Globus</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>German Retail · Q4 2024</div>
                            </div>
                            <div style={{
                                marginLeft: 4,
                                padding: '3px 10px',
                                borderRadius: 50,
                                background: 'rgba(1,115,211,0.12)',
                                border: '1px solid rgba(1,115,211,0.30)',
                                fontSize: 10, fontWeight: 700,
                                color: '#0173D3',
                                letterSpacing: '0.04em',
                            }}>✓ Verified</div>
                        </div>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            style={{
                                fontSize: 'clamp(34px, 4vw, 58px)',
                                letterSpacing: '-0.04em',
                                lineHeight: 1.06,
                                marginBottom: 20,
                                fontWeight: 800,
                            }}
                        >
                            From{' '}
                            <span style={{
                                color: 'rgba(255,255,255,0.22)',
                                textDecoration: 'line-through',
                                textDecorationColor: 'rgba(255,255,255,0.18)',
                                fontWeight: 700,
                            }}>6 Weeks</span>{' '}
                            to{' '}
                            <span style={{ color: '#0173D3' }}>3 Days.</span>
                        </motion.h2>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.18 }}
                            style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: 40, maxWidth: 480 }}
                        >
                            Globus needed a full Q4 AI video campaign.
                            We delivered <strong style={{ color: '#fff', fontWeight: 600 }}>3 final ads across all formats</strong> in 3 days.
                            Results exceeded every benchmark.
                        </motion.p>

                        {/* ── Clean horizontal stat strip ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.26 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                borderRadius: 16,
                                border: '1px solid rgba(255,255,255,0.08)',
                                background: 'rgba(255,255,255,0.02)',
                                overflow: 'hidden',
                                marginBottom: 36,
                            }}
                        >
                            {METRICS.map((m, i) => (
                                <div key={i} style={{
                                    padding: '20px 16px',
                                    textAlign: 'center',
                                    borderRight: i < METRICS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                                }}>
                                    <div style={{
                                        fontSize: 22, fontWeight: 800,
                                        color: i === 2 ? '#0173D3' : '#fff',
                                        letterSpacing: '-0.02em',
                                        lineHeight: 1,
                                        marginBottom: 6,
                                    }}>{m.value}</div>
                                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{m.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Quote — minimal */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.36 }}
                            style={{ marginBottom: 36, paddingLeft: 20, borderLeft: '2px solid #0173D3' }}
                        >
                            <p style={{
                                fontSize: 14, lineHeight: 1.8,
                                color: 'rgba(255,255,255,0.55)',
                                fontStyle: 'italic', margin: '0 0 8px',
                            }}>
                                "prodone.ai delivered in 3 days what our agency would have taken 6 weeks to produce. The AI ads outperformed everything we've run before."
                            </p>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.30)' }}>
                                — Marketing Director, <strong style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>Globus GmbH & Co. KG</strong> · Frankfurt
                            </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.44 }}
                            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
                        >
                            <a href="/pilot">
                                <button className="btn-primary" style={{ fontSize: 14, padding: '14px 28px', borderRadius: 50 }}>
                                    Read Full Case Study →
                                </button>
                            </a>
                            <a href="#offer">
                                <button className="btn-ghost" style={{ fontSize: 14, padding: '13px 24px', borderRadius: 50 }}>
                                    Get Your Prototype
                                </button>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT: Phone mockup ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40, scale: 0.96 }}
                        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                    >
                        {/* Phone shell */}
                        <div style={{
                            position: 'relative', width: 280,
                            borderRadius: 50,
                            background: 'linear-gradient(160deg, #1c1c2e 0%, #0a0a14 100%)',
                            border: '2px solid rgba(255,255,255,0.12)',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.70), 0 0 0 1px rgba(255,255,255,0.04)',
                        }}>
                            {/* Side buttons */}
                            <div style={{ position: 'absolute', left: -3, top: '22%', width: 3, height: 24, background: 'rgba(255,255,255,0.12)', borderRadius: '2px 0 0 2px' }} />
                            <div style={{ position: 'absolute', left: -3, top: '32%', width: 3, height: 40, background: 'rgba(255,255,255,0.12)', borderRadius: '2px 0 0 2px' }} />
                            <div style={{ position: 'absolute', right: -3, top: '28%', width: 3, height: 56, background: 'rgba(255,255,255,0.12)', borderRadius: '0 2px 2px 0' }} />

                            <div style={{ padding: '14px 12px' }}>
                                {/* Notch */}
                                <div style={{ width: 72, height: 20, background: '#0a0a14', borderRadius: 12, margin: '0 auto 10px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                                    <div style={{ width: 26, height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.07)' }} />
                                </div>

                                {/* Video screen */}
                                <div style={{ borderRadius: 30, overflow: 'hidden', position: 'relative', aspectRatio: '9/16', background: '#000' }}>
                                    <video src="/globus-ad.mp4" autoPlay muted loop playsInline preload="metadata"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 72, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)', pointerEvents: 'none' }} />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 72, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', pointerEvents: 'none' }} />

                                    {/* Globus badge row */}
                                    <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 50, background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.10)' }}>
                                            <img src="/globus-logo.svg" alt="Globus" style={{ width: 22, height: 'auto' }} />
                                            <span style={{ fontSize: 8, fontWeight: 700, color: '#fff' }}>Globus</span>
                                        </div>
                                        <div style={{ padding: '3px 7px', borderRadius: 50, background: 'rgba(1,115,211,0.85)', fontSize: 7, fontWeight: 800, color: '#fff', letterSpacing: '0.06em' }}>AI AD</div>
                                    </div>

                                    {/* Play indicator */}
                                    <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 50, background: 'rgba(0,0,0,0.60)' }}>
                                        <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '7px solid rgba(255,255,255,0.75)' }} />
                                        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: '0.04em' }}>AI Generated Ad</span>
                                    </div>
                                </div>

                                {/* Home indicator */}
                                <div style={{ width: 56, height: 4, background: 'rgba(255,255,255,0.18)', borderRadius: 3, margin: '10px auto 0' }} />
                            </div>
                        </div>

                        {/* Single floating stat badge — just the main result */}
                        <motion.div
                            animate={{ y: [0, -7, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute', top: '8%', right: '-4%',
                                padding: '14px 18px', borderRadius: 16,
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.10)',
                                textAlign: 'center',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                            }}
                        >
                            <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', lineHeight: 1 }}>+340%</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Reach</div>
                        </motion.div>

                        {/* Second badge — speed */}
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                            style={{
                                position: 'absolute', bottom: '20%', right: '-2%',
                                padding: '14px 18px', borderRadius: 16,
                                background: 'rgba(1,115,211,0.08)',
                                border: '1px solid rgba(1,115,211,0.25)',
                                textAlign: 'center',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                            }}
                        >
                            <div style={{ fontSize: 24, fontWeight: 900, color: '#0173D3', lineHeight: 1 }}>3 Days</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Delivered</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .globus-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                }
                @media (max-width: 900px) {
                    .globus-grid {
                        grid-template-columns: 1fr !important;
                        gap: 56px !important;
                    }
                }
                @media (max-width: 600px) {
                    .globus-grid > div:last-child { display: none; }
                }
            `}</style>
        </section>
    )
}
