import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Outcomes from '../components/Outcomes'
import OfferBox from '../components/OfferBox'

const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
    exit:    { opacity: 0, y: -16, transition: { duration: 0.35 } },
}

export default function ServicesPage() {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {/* Page hero */}
            <section style={{
                position: 'relative', paddingTop: 160, paddingBottom: 40,
                textAlign: 'center', overflow: 'hidden',
            }}>
                {/* Blobs */}
                <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(1,115,211,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, right: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(80,40,200,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div className="section-label" style={{ display: 'inline-flex', marginBottom: 24 }}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        WHAT WE BUILD
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                        style={{ fontSize: 'clamp(36px, 5vw, 68px)', marginBottom: 20, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                    >
                        AI Services That{' '}
                        <span className="shimmer-text">Actually Deliver</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}
                    >
                        From AI video ads to enterprise chatbots — production-ready in 3 days, not 6 weeks.
                    </motion.p>
                </div>
            </section>

            {/* Outcomes section reused */}
            <Outcomes />

            {/* CTA */}
            <OfferBox />
        </motion.main>
    )
}
