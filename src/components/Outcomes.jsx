import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const icons = ['💬', '📊', '👁', '🛡']

function OutcomeCard({ card, index, icon }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
        >
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                style={{
                    padding: '28px 24px 24px',
                    borderRadius: 16,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'default',
                    transition: 'border-color 0.25s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(34,212,184,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
                {/* Icon top right */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 48 }}>
                    <div style={{
                        width: 38, height: 38, borderRadius: 10,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18,
                    }}>{icon}</div>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, marginBottom: 'auto', paddingBottom: 20 }}>
                    {card.benefit}
                </p>

                {/* Title at bottom */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                        {card.headline}
                    </h3>
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
            padding: '80px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div ref={headRef} style={{ maxWidth: 560, marginBottom: 52 }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 28 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
                    >
                        {t('outcomes.title1')}{' '}
                        <span style={{ color: '#22d4b8' }}>
                            {t('outcomes.title2')}
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.15 }}
                        style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', lineHeight: 1.8, marginTop: 16 }}
                    >
                        {t('outcomes.subtitle')}
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="outcomes-grid">
                    {cards.map((card, i) => (
                        <OutcomeCard key={i} card={card} index={i} icon={icons[i]} />
                    ))}
                </div>
            </div>

            <style>{`
                .outcomes-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                }
                @media (max-width: 700px) {
                    .outcomes-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </section>
    )
}
