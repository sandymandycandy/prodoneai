import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const stepIcons = [
    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>,
]
const stepGlows = [
    'rgba(1, 115, 211, 0.45)',
    'rgba(96, 165, 250, 0.4)',
    'rgba(1, 115, 211, 0.35)',
]

function StepCard({ step, index, icon, glow }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60, rotateX: 14 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.9, delay: index * 0.18, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'relative', perspective: 1000 }}
        >
            <motion.div
                whileHover={{ y: -10, scale: 1.022, boxShadow: '0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(1,115,211,0.35), inset 0 1px 0 rgba(255,255,255,0.16)' }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                style={{
                    position: 'relative', zIndex: 1,
                    padding: '40px 32px',
                    borderRadius: 28,
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(24px) saturate(1.5)',
                    WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                }}
            >
                {/* Top shine line (blue accent) */}
                <div style={{
                    position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                    background: `linear-gradient(90deg, transparent, ${glow.replace('0.35','0.6')}, transparent)`,
                }} />

                {/* Number pill + icon row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    {/* Colored number badge */}
                    <div style={{
                        width: 48, height: 48, borderRadius: 16,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22,
                    }}>{icon()}</div>
                    <div style={{
                        fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                    }}>{step.day}</div>
                    {/* Step number pill */}
                    <div style={{
                        marginLeft: 'auto',
                        fontSize: 11, fontWeight: 800,
                        color: '#60a5fa',
                        background: 'rgba(1,115,211,0.10)',
                        border: '1px solid rgba(1,115,211,0.28)',
                        padding: '3px 10px', borderRadius: 50,
                        letterSpacing: '0.06em',
                    }}>0{index + 1}</div>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 14, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                    {step.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.48)', lineHeight: 1.85 }}>
                    {step.description}
                </p>

                {/* Glowing progress bar at bottom */}
                <div style={{ marginTop: 'auto', paddingTop: 28 }}>
                    <div style={{
                        height: 2, borderRadius: 2,
                        background: 'rgba(255,255,255,0.06)',
                        overflow: 'hidden',
                    }}>
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={inView ? { width: '100%' } : {}}
                            transition={{ duration: 1.6, delay: 0.5 + index * 0.2, ease: [0.23, 1, 0.32, 1] }}
                            style={{
                                height: '100%',
                                background: `linear-gradient(90deg, ${glow}, transparent)`,
                                borderRadius: 2,
                                boxShadow: `0 0 8px ${glow}`,
                            }}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function HowItWorks() {
    const headRef = useRef(null)
    const inView = useInView(headRef, { once: true })
    const { t, lang, translations } = useLanguage()
    const steps = translations[lang].howItWorks.steps

    return (
        <section id="process" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Glass backdrop blobs */}
            <div style={{ position: 'absolute', top: '-8%', left: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(1,115,211,0.10) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-12%', right: '-6%', width: 650, height: 650, background: 'radial-gradient(circle, rgba(1,115,211,0.11) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            <div className="container" ref={headRef} style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 72px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 28 }}
                    >
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#0173D3', letterSpacing: '0.18em' }}>05</span>
                        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
                        <div className="section-label" style={{ marginBottom: 0 }}>{t('howItWorks.label')}</div>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', marginBottom: 18 }}
                    >
                        {t('howItWorks.title1')}{' '}
                        <span className="shimmer-text">
                            {t('howItWorks.title2')}
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}
                    >
                        {t('howItWorks.subtitle')}
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="hiw-grid">
                    {steps.map((step, i) => (
                        <StepCard key={i} step={step} index={i} icon={stepIcons[i]} glow={stepGlows[i]} />
                    ))}
                </div>
            </div>

            <style>{`
                .hiw-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }
                @media (max-width: 900px) {
                    .hiw-grid { grid-template-columns: 1fr !important; gap: 20px; }
                    #process { padding: 80px 0; }
                }
            `}</style>
        </section>
    )
}
