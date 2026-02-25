import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const METRICS = [
    { value: '+340%', label: 'Organic Reach', color: 'rgba(80,220,160,1)', glow: 'rgba(0,200,140,0.25)', bg: 'rgba(0,200,140,0.06)' },
    { value: '8.7%', label: 'Ad CTR', color: 'rgba(160,120,255,1)', glow: 'rgba(140,100,255,0.25)', bg: 'rgba(140,100,255,0.06)' },
    { value: '3 Days', label: 'Delivered In', color: 'rgba(255,200,80,1)', glow: 'rgba(255,180,60,0.25)', bg: 'rgba(255,180,60,0.06)' },
    { value: '−70%', label: 'Production Cost', color: 'rgba(80,160,255,1)', glow: 'rgba(60,140,255,0.25)', bg: 'rgba(60,140,255,0.06)' },
]

export default function GlobusSpotlight() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>

            {/* Background glows */}
            <div style={{ position: 'absolute', top: '20%', left: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(120,80,255,0.1) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div className="grid-overlay" style={{ opacity: 0.15, zIndex: 0 }} />
            <ParticleCanvas />

            <div className="container" style={{ position: 'relative', zIndex: 1, pointerEvents: 'auto' }}>

                {/* Top label */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 64 }}>
                    <div className="section-label">⭐ FEATURED CLIENT</div>
                    <div style={{ height: 1, flex: 1, maxWidth: 120, background: 'linear-gradient(90deg, rgba(255,255,255,0.12), transparent)' }} />
                </motion.div>

                {/* Main 2-col layout */}
                <div className="globus-grid">

                    {/* ── LEFT: Copy ── */}
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}>

                        {/* Globus badge */}
                        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 18px 10px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', marginBottom: 32 }}>
                            <img src="/globus-logo.svg" alt="Globus Logo" style={{ width: 44, height: 'auto', display: 'block' }} />
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Globus</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>German Retail Chain · Q4 2024</div>
                            </div>
                            <div style={{ marginLeft: 8, padding: '4px 10px', borderRadius: 50, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.28)', fontSize: 10, fontWeight: 700, color: 'rgba(34,197,94,0.95)', letterSpacing: '0.04em' }}>✓ Verified</div>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.9 }}
                            style={{ fontSize: 'clamp(32px, 4vw, 54px)', letterSpacing: '-0.04em', lineHeight: 1.06, marginBottom: 24 }}>
                            From{' '}
                            <span style={{ color: 'rgba(255,100,100,0.7)', textDecoration: 'line-through', textDecorationColor: 'rgba(255,80,80,0.4)' }}>6 Weeks</span>{' '}
                            to{' '}
                            <span style={{ background: 'linear-gradient(135deg, rgba(80,220,160,1), rgba(80,180,255,1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3 Days.</span>
                        </motion.h2>

                        {/* Subtext */}
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
                            style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', marginBottom: 36 }}>
                            Globus — one of Germany's largest retail chains — needed a full Q4 AI video ad campaign.
                            prodone.ai delivered <strong style={{ color: '#fff' }}>3 final ads across all formats</strong> in 3 days.
                            Results exceeded every benchmark.
                        </motion.p>

                        {/* Metric cards */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }}
                            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
                            {METRICS.map((m, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, scale: 0.88 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.4 + i * 0.08, type: 'spring', bounce: 0.4 }}
                                    whileHover={{ y: -4, scale: 1.03 }}
                                    style={{ padding: '18px 16px', borderRadius: 18, background: m.bg, border: `1px solid ${m.glow}`, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
                                    <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`, opacity: 0.4 }} />
                                    <div style={{ fontSize: 26, fontWeight: 900, color: m.color, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6, filter: `drop-shadow(0 0 12px ${m.glow})` }}>{m.value}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{m.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Quote */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
                            style={{ padding: '20px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: '3px solid rgba(230,57,70,0.6)', marginBottom: 36 }}>
                            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic', margin: 0 }}>
                                "prodone.ai delivered in 3 days what our agency would have taken 6 weeks to produce. The AI ads outperformed everything we've run before."
                            </p>
                            <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.35)', fontStyle: 'normal' }}>
                                — Marketing Director, <strong style={{ color: 'rgba(255,255,255,0.55)' }}>Globus GmbH & Co. KG</strong> · Frankfurt, Germany
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}
                            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
                    <motion.div initial={{ opacity: 0, x: 60, scale: 0.9 }} animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                        transition={{ duration: 1.1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>

                        {/* Background glow */}
                        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '90%', height: '80%', background: 'radial-gradient(circle, rgba(230,57,70,0.18) 0%, rgba(120,80,255,0.12) 50%, transparent 75%)', filter: 'blur(50px)', pointerEvents: 'none', animation: 'orbPulse 7s ease-in-out infinite' }} />

                        {/* Phone shell */}
                        <div style={{ position: 'relative', zIndex: 1, width: 300, borderRadius: 50, background: 'linear-gradient(160deg, #1c1c2e 0%, #0a0a14 100%)', border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 50px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.12)' }}>

                            {/* Side buttons */}
                            <div style={{ position: 'absolute', left: -3, top: '22%', width: 3, height: 28, background: 'rgba(255,255,255,0.15)', borderRadius: '2px 0 0 2px' }} />
                            <div style={{ position: 'absolute', left: -3, top: '32%', width: 3, height: 44, background: 'rgba(255,255,255,0.15)', borderRadius: '2px 0 0 2px' }} />
                            <div style={{ position: 'absolute', left: -3, top: '40%', width: 3, height: 44, background: 'rgba(255,255,255,0.15)', borderRadius: '2px 0 0 2px' }} />
                            <div style={{ position: 'absolute', right: -3, top: '28%', width: 3, height: 60, background: 'rgba(255,255,255,0.15)', borderRadius: '0 2px 2px 0' }} />

                            <div style={{ padding: '16px 14px' }}>
                                {/* Notch */}
                                <div style={{ width: 80, height: 24, background: '#0a0a14', borderRadius: 14, margin: '0 auto 12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                                    <div style={{ width: 30, height: 5, borderRadius: 4, background: 'rgba(255,255,255,0.08)' }} />
                                </div>

                                {/* Video screen */}
                                <div style={{ borderRadius: 32, overflow: 'hidden', position: 'relative', aspectRatio: '9/16', background: '#000' }}>
                                    <video src="/globus-ad.mp4" autoPlay muted loop playsInline
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    {/* Overlays */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)', pointerEvents: 'none' }} />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', pointerEvents: 'none' }} />

                                    {/* Globus + AI badge row */}
                                    <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 50, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <img src="/globus-logo.svg" alt="Globus Logo" style={{ width: 28, height: 'auto', display: 'block' }} />
                                            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>Globus</span>
                                        </div>
                                        <div style={{ padding: '4px 8px', borderRadius: 50, background: 'rgba(140,100,255,0.8)', backdropFilter: 'blur(8px)', fontSize: 8, fontWeight: 800, color: '#fff', letterSpacing: '0.06em' }}>AI AD</div>
                                    </div>

                                    {/* Play indicator bottom */}
                                    <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}>
                                        <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid rgba(255,255,255,0.8)' }} />
                                        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.04em' }}>AI Generated Ad</span>
                                    </div>
                                </div>

                                {/* Home indicator */}
                                <div style={{ width: 64, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 3, margin: '12px auto 0' }} />
                            </div>
                        </div>

                        {/* Floating badge — Reach */}
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ position: 'absolute', top: '10%', right: '2%', padding: '12px 18px', borderRadius: 18, background: 'rgba(0,200,140,0.1)', border: '1px solid rgba(0,200,140,0.3)', backdropFilter: 'blur(16px)', textAlign: 'center', boxShadow: '0 8px 28px rgba(0,0,0,0.5)' }}>
                            <div style={{ fontSize: 22, fontWeight: 900, color: 'rgba(80,220,160,1)', lineHeight: 1 }}>+340%</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Reach</div>
                        </motion.div>

                        {/* Floating badge — Speed */}
                        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            style={{ position: 'absolute', bottom: '22%', right: '0%', padding: '12px 18px', borderRadius: 18, background: 'rgba(255,180,60,0.08)', border: '1px solid rgba(255,180,60,0.28)', backdropFilter: 'blur(16px)', textAlign: 'center', boxShadow: '0 8px 28px rgba(0,0,0,0.5)' }}>
                            <div style={{ fontSize: 22, fontWeight: 900, color: 'rgba(255,200,80,1)', lineHeight: 1 }}>3 Days</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Delivered</div>
                        </motion.div>

                        {/* Floating badge — Cost */}
                        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
                            style={{ position: 'absolute', bottom: '12%', left: '4%', padding: '12px 18px', borderRadius: 18, background: 'rgba(60,140,255,0.08)', border: '1px solid rgba(60,140,255,0.25)', backdropFilter: 'blur(16px)', textAlign: 'center', boxShadow: '0 8px 28px rgba(0,0,0,0.5)' }}>
                            <div style={{ fontSize: 22, fontWeight: 900, color: 'rgba(80,160,255,1)', lineHeight: 1 }}>−70%</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cost</div>
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
            `}</style>
        </section>
    )
}
