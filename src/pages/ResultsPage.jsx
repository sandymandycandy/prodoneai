import { useEffect } from 'react'
import { motion } from 'framer-motion'
import CaseStudies from '../components/CaseStudies'
import GlobusSpotlight from '../components/GlobusSpotlight'

const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
    exit:    { opacity: 0, y: -16, transition: { duration: 0.35 } },
}

const STATS = [
    { v: '50+',   l: 'Completed Projects' },
    { v: '98%',   l: 'Client Satisfaction' },
    { v: '+340%', l: 'Avg Organic Reach' },
    { v: '3 Days',l: 'Average Delivery' },
]

export default function ResultsPage() {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {/* Page hero */}
            <section style={{
                position: 'relative', paddingTop: 160, paddingBottom: 40,
                textAlign: 'center', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-10%', right: '10%', width: 700, height: 600, background: 'radial-gradient(ellipse, rgba(1,115,211,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: '5%', width: 500, height: 400, background: 'radial-gradient(circle, rgba(1,115,211,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div className="section-label" style={{ display: 'inline-flex', marginBottom: 24 }}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        PROVEN RESULTS
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                        style={{ fontSize: 'clamp(36px, 5vw, 68px)', marginBottom: 20, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                    >
                        Real Clients.{' '}
                        <span className="shimmer-text">Real Numbers.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', maxWidth: 520, margin: '0 auto 56px', lineHeight: 1.75 }}
                    >
                        Every result below is verified and delivered — no fluff, no estimates.
                    </motion.p>

                    {/* Stats strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        style={{
                            display: 'inline-grid', gridTemplateColumns: 'repeat(4,1fr)',
                            borderRadius: 20, overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.09)',
                            background: 'rgba(255,255,255,0.03)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09)',
                        }}
                    >
                        {STATS.map((s, i) => (
                            <div key={i} style={{
                                padding: '22px 36px', textAlign: 'center',
                                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                            }}>
                                <div style={{ fontSize: 28, fontWeight: 900, color: '#60a5fa', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.v}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 600, marginTop: 6 }}>{s.l}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured case */}
            <GlobusSpotlight />

            {/* All case studies */}
            <CaseStudies />
        </motion.main>
    )
}
