import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const icons = ['🎬', '⚡', '🤖', '🚀']
const glows = [
    'rgba(120, 80, 255, 0.35)',
    'rgba(255, 160, 40, 0.3)',
    'rgba(0, 200, 160, 0.3)',
    'rgba(220, 60, 160, 0.25)',
]

function OutcomeCard({ card, index, icon, glow }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const { t } = useLanguage()

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
            <motion.div
                whileHover={{ y: -10, scale: 1.018, boxShadow: '0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(1,115,211,0.35), inset 0 1px 0 rgba(255,255,255,0.16)' }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                style={{
                    position: 'relative', zIndex: 1,
                    padding: '40px 36px',
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
                {/* Top shine */}
                <div style={{
                    position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }} />

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                    <div style={{
                        padding: '6px 14px', borderRadius: 100,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)',
                        letterSpacing: '0.05em', textTransform: 'uppercase',
                    }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: glow.replace('0.', '0.9') }} />
                        {card.tag}
                    </div>
                    <div style={{
                        width: 48, height: 48, borderRadius: 16,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22,
                    }}>{icon}</div>
                </div>

                {/* Big number */}
                <div style={{
                    position: 'absolute', top: 30, right: 30,
                    fontSize: 120, fontWeight: 900, color: 'rgba(255,255,255,0.025)',
                    lineHeight: 1, letterSpacing: '-0.04em',
                    pointerEvents: 'none',
                }}>0{index + 1}</div>

                {/* Content */}
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {card.headline}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 28, flexGrow: 1 }}>
                    {card.benefit}
                </p>

                {/* Scope */}
                <div style={{
                    padding: '16px 20px',
                    borderRadius: 16,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    marginBottom: 20,
                }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', marginBottom: 8, textTransform: 'uppercase' }}>
                        {t('outcomes.scopeLabel')}
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                        {card.deliverable}
                    </div>
                </div>

                {/* Bottom */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                        ⚡ {card.timeline}
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'baseline', gap: 6,
                        padding: '8px 14px',
                        borderRadius: 12,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                        <span style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{card.stat}</span>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                            {card.statLabel}
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Outcomes() {
    const headRef = useRef(null)
    const inView = useInView(headRef, { once: true })
    const { t, lang, translations } = useLanguage()
    const cards = translations[lang].outcomes.cards

    return (
        <section id="services" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Glass backdrop blobs */}
            <div style={{ position: 'absolute', top: '-15%', right: '-8%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(1,115,211,0.13) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-6%', width: 560, height: 560, background: 'radial-gradient(circle, rgba(80,40,200,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div ref={headRef} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 72px' }}>
                    <motion.div className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                    >
                        {t('outcomes.label')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 32 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(36px, 5vw, 68px)', marginTop: 24, marginBottom: 20, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                    >
                        {t('outcomes.title1')}{' '}
                        <span className="shimmer-text">
                            {t('outcomes.title2')}
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}
                    >
                        {t('outcomes.subtitle')}
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="outcomes-grid">
                    {cards.map((card, i) => (
                        <OutcomeCard key={i} card={card} index={i} icon={icons[i]} glow={glows[i]} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    style={{
                        marginTop: 72,
                        textAlign: 'center',
                        padding: '28px 36px',
                        borderRadius: 24,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '20px',
                    }}
                >
                    <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>
                        {t('outcomes.ctaText')}
                    </span>
                    <a href="#offer">
                        <button className="btn-primary" style={{ fontSize: 14, padding: '13px 26px', borderRadius: 14 }}>
                            {t('outcomes.ctaBtn')}
                        </button>
                    </a>
                </motion.div>
            </div>

            <style>{`
                .outcomes-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                }
                @media (max-width: 900px) {
                    .outcomes-grid { grid-template-columns: 1fr !important; }
                    #services { padding: 80px 0; }
                }
            `}</style>
        </section>
    )
}
