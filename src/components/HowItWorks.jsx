import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const stepIcons = ['🔍', '⚙️', '🚀']
const stepGlows = [
    'rgba(0, 200, 180, 0.3)',
    'rgba(0, 200, 180, 0.3)',
    'rgba(0, 200, 180, 0.3)',
]

function StepCard({ step, index, icon, glow }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'relative' }}
        >
            {/* Glow orb */}
            <div style={{
                position: 'absolute',
                top: '10%', left: index === 1 ? '50%' : '-5%',
                width: '60%', height: '70%',
                background: glow,
                borderRadius: '50%',
                filter: 'blur(50px)',
                opacity: 0.4,
                pointerEvents: 'none', zIndex: 0,
                animation: `orbPulse ${5 + index * 1.5}s ease-in-out infinite`,
            }} />

            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'relative', zIndex: 1,
                    padding: '40px 32px',
                    borderRadius: 28,
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                }}
            >
                {/* Top shine */}
                <div style={{
                    position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }} />

                {/* Step badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 16,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22,
                    }}>{icon}</div>
                    <div style={{
                        fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                    }}>{step.day}</div>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 14, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                    {step.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
                    {step.description}
                </p>

                {/* Progress line at bottom */}
                <div style={{ marginTop: 'auto', paddingTop: 28 }}>
                    <div style={{
                        height: 2, borderRadius: 2,
                        background: 'rgba(255,255,255,0.06)',
                        overflow: 'hidden',
                    }}>
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={inView ? { width: '100%' } : {}}
                            transition={{ duration: 1.5, delay: 0.4 + index * 0.2, ease: [0.23, 1, 0.32, 1] }}
                            style={{
                                height: '100%',
                                background: `linear-gradient(90deg, ${glow}, transparent)`,
                                borderRadius: 2,
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
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 1000, height: 500,
                background: 'radial-gradient(ellipse, rgba(40, 100, 240, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="container" ref={headRef} style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 72px' }}>
                    <motion.div className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                    >
                        {t('howItWorks.label')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', marginTop: 24, marginBottom: 18 }}
                    >
                        {t('howItWorks.title1')}{' '}
                        <span style={{ color: '#22d4b8' }}>
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
