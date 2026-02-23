import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
    {
        number: '01',
        day: 'SCHRITT 1',
        title: 'Analyse.',
        description: 'Wir suchen gezielt nach Ineffizienzen und Potenzialen in Ihrem Unternehmen.',
        glow: 'rgba(100, 60, 220, 0.5)',
        delay: 0,
    },
    {
        number: '02',
        day: 'SCHRITT 2',
        title: 'Entwicklung.',
        description: 'Ihre Lösung wird von Experten in Deutschland und Indien entwickelt.',
        glow: 'rgba(40, 140, 255, 0.45)',
        delay: 0.14,
    },
    {
        number: '03',
        day: 'SCHRITT 3',
        title: 'Integration.',
        description: 'Wir realisieren nahtlos, nachhaltig und mit messbarem Erfolg.',
        glow: 'rgba(0, 200, 170, 0.4)',
        delay: 0.28,
    },
]

function StepCard({ step }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: step.delay, ease: [0.23, 1, 0.32, 1] }}
            style={{ flex: 1, position: 'relative' }}
        >
            {/* Glow orb behind card */}
            <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4 + step.delay * 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', top: '30%', left: '20%',
                    width: '60%', height: '50%',
                    background: step.glow,
                    borderRadius: '50%',
                    filter: 'blur(55px)',
                    pointerEvents: 'none', zIndex: 0,
                }}
            />

            {/* Card */}
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'relative', zIndex: 1,
                    padding: '44px 36px 40px',
                    borderRadius: 28,
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
                    overflow: 'hidden', height: '100%',
                    cursor: 'default',
                }}
            >
                {/* Inner top shine */}
                <div style={{
                    position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                }} />

                {/* Watermark number */}
                <div style={{
                    position: 'absolute', top: -10, right: 8,
                    fontSize: 140, fontWeight: 900,
                    color: 'rgba(255,255,255,0.025)',
                    lineHeight: 1, userSelect: 'none', letterSpacing: '-0.06em',
                    fontFamily: 'var(--font)',
                }}>
                    {step.number}
                </div>

                {/* Badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '6px 14px', borderRadius: 50,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.6)',
                    letterSpacing: '0.12em', marginBottom: 72,
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}>
                    {step.day}
                </div>

                <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 14, letterSpacing: '-0.03em' }}>
                    {step.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)' }}>
                    {step.description}
                </p>

                {/* Bottom progress line */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.04)' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: '100%' } : {}}
                        transition={{ duration: 1.6, delay: step.delay + 0.3, ease: 'easeOut' }}
                        style={{ height: '100%', background: `linear-gradient(90deg, ${step.glow}, rgba(255,255,255,0.7))` }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function HowItWorks() {
    const headRef = useRef(null)
    const inView = useInView(headRef, { once: true })

    return (
        <section id="process" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Ambient */}
            <div style={{
                position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                width: 900, height: 300,
                background: 'radial-gradient(ellipse, rgba(70,40,180,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div ref={headRef} style={{ maxWidth: 720, margin: '0 auto 72px', textAlign: 'center' }}>
                    <motion.div
                        className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        style={{ justifyContent: 'center' }}
                    >
                        PROZESS
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 32 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(34px, 4.5vw, 60px)', marginTop: 24, marginBottom: 22, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                    >
                        Entfalten Sie{' '}
                        <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Kreativität.
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.22 }}
                        style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', maxWidth: 560, margin: '0 auto' }}
                    >
                        Folgen Sie unseren drei Schritten, um Ihre Visionen mit KI in messbare Ergebnisse zu verwandeln.
                    </motion.p>
                </div>

                {/* Step Cards */}
                <div className="howitworks-grid">
                    {steps.map((step, i) => <StepCard key={i} step={step} />)}
                </div>
            </div>

            <style>{`
                .howitworks-grid {
                    display: flex;
                    gap: 24px;
                }
                @media (max-width: 860px) {
                    .howitworks-grid { flex-direction: column; gap: 20px; }
                    #process { padding: 80px 0; }
                }
            `}</style>
        </section>
    )
}
