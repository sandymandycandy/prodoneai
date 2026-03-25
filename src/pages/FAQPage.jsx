import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FAQ from '../components/FAQ'

const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
    exit:    { opacity: 0, y: -16, transition: { duration: 0.35 } },
}

export default function FAQPage() {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {/* Page hero */}
            <section style={{ position: 'relative', paddingTop: 160, paddingBottom: 40, textAlign: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10%', right: '10%', width: 650, height: 600, background: 'radial-gradient(ellipse, rgba(1,115,211,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: '5%', width: 500, height: 400, background: 'radial-gradient(circle, rgba(80,40,200,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div className="section-label" style={{ display: 'inline-flex', marginBottom: 24 }}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        FREQUENTLY ASKED
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                        style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: 20, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                    >
                        Everything you need to{' '}
                        <span className="shimmer-text">know</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}
                    >
                        Can't find your answer? Reach us directly at{' '}
                        <a href="mailto:hello@prodone.ai" style={{ color: '#0173D3', textDecoration: 'none', fontWeight: 600 }}>hello@prodone.ai</a>
                    </motion.p>
                </div>
            </section>

            {/* FAQ accordion */}
            <FAQ />

            {/* Bottom CTA */}
            <section style={{ padding: '60px 0 80px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>
                        Still have questions? We respond within 2 hours.
                    </p>
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact">
                            <button className="btn-primary" style={{ fontSize: 14, padding: '13px 28px', borderRadius: 50 }}>Contact Us →</button>
                        </Link>
                        <Link to="/services">
                            <button className="btn-ghost" style={{ fontSize: 14, padding: '12px 24px', borderRadius: 50 }}>View Our Services</button>
                        </Link>
                    </div>
                </div>
            </section>
        </motion.main>
    )
}
