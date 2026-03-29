import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

/* One image per card — order matches translation cards array */
const CARD_IMAGES = [
    '/ai-video-ads-hero.png',
    '/ai-content-workflow-hero.png',
    '/ai-chatbot-hero.png',
    '/custom-ai-apps-hero.png',
]

const SvgIcons = [
    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><polygon points="10 9 16 12 10 15"/></svg>,
    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>,
    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><circle cx="9" cy="10" r=".8" fill="currentColor"/><circle cx="12" cy="10" r=".8" fill="currentColor"/><circle cx="15" cy="10" r=".8" fill="currentColor"/></svg>,
    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
]

function OutcomeCard({ card, index, icon }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const { t } = useLanguage()
    const scopeItems = card.deliverable.split(' · ')
    const img = CARD_IMAGES[index]

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{ height: '100%' }}
        >
            <motion.div
                whileHover={{ y: -5, boxShadow: '0 36px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(1,115,211,0.45)' }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="outcomes-card"
                style={{
                    position: 'relative',
                    borderRadius: 24,
                    background: 'rgba(6,8,18,0.92)',
                    backdropFilter: 'blur(28px) saturate(1.6)',
                    WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 8px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                }}
            >
                {/* ── IMAGE PANEL ── */}
                <div style={{
                    position: 'relative',
                    height: 200,
                    overflow: 'hidden',
                    flexShrink: 0,
                }}>
                    <img
                        src={img}
                        alt={card.tag}
                        loading="lazy"
                        style={{
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            display: 'block',
                            transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
                        }}
                        className="outcome-card-img"
                    />
                    {/* Gradient fade into card body */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, rgba(6,8,18,0.15) 0%, rgba(6,8,18,0.55) 60%, rgba(6,8,18,0.98) 100%)',
                    }} />
                    {/* Blue tint overlay */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(135deg, rgba(1,115,211,0.12) 0%, transparent 60%)',
                    }} />

                    {/* Tag badge — floating on image */}
                    <div style={{
                        position: 'absolute', top: 14, left: 16,
                        display: 'flex', alignItems: 'center', gap: 7,
                        padding: '5px 12px', borderRadius: 50,
                        background: 'rgba(0,0,0,0.60)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(1,115,211,0.35)',
                        fontSize: 9, fontWeight: 800,
                        color: '#60a5fa',
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#0173D3', boxShadow: '0 0 6px rgba(1,115,211,0.9)' }} />
                        {card.tag}
                    </div>

                    {/* Stat badge — floating on image */}
                    <div style={{
                        position: 'absolute', bottom: 14, right: 16,
                        display: 'flex', alignItems: 'baseline', gap: 4,
                        padding: '8px 14px',
                        borderRadius: 12,
                        background: 'rgba(0,0,0,0.65)',
                        backdropFilter: 'blur(14px)',
                        border: '1px solid rgba(1,115,211,0.4)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    }}>
                        <span style={{
                            fontSize: 26, fontWeight: 900,
                            color: '#60a5fa',
                            letterSpacing: '-0.04em', lineHeight: 1,
                            textShadow: '0 0 20px rgba(96,165,250,0.6)',
                        }}>{card.stat}</span>
                        <span style={{
                            fontSize: 8, fontWeight: 800,
                            color: 'rgba(96,165,250,0.7)',
                            textTransform: 'uppercase', letterSpacing: '0.1em',
                        }}>{card.statLabel}</span>
                    </div>
                </div>

                {/* ── CONTENT BODY ── */}
                <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 0 }}>

                    {/* Icon + Headline row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 10 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                            background: 'rgba(1,115,211,0.10)',
                            border: '1px solid rgba(1,115,211,0.22)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#60a5fa', marginTop: 3,
                        }}>{icon()}</div>
                        <h3 style={{
                            fontSize: 'clamp(18px, 1.7vw, 22px)',
                            fontWeight: 900, color: '#ffffff',
                            letterSpacing: '-0.03em', lineHeight: 1.2,
                            margin: 0,
                        }}>{card.headline}</h3>
                    </div>

                    {/* Benefit */}
                    <p style={{
                        fontSize: 13, color: 'rgba(255,255,255,0.52)',
                        lineHeight: 1.75, marginBottom: 20, flexGrow: 1,
                    }}>{card.benefit}</p>

                    {/* Scope pills */}
                    <div>
                        <div style={{
                            fontSize: 9, fontWeight: 800,
                            color: 'rgba(96,165,250,0.65)',
                            letterSpacing: '0.16em', textTransform: 'uppercase',
                            marginBottom: 8,
                        }}>{t('outcomes.scopeLabel')}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                            {scopeItems.map((item, i) => (
                                <span key={i} style={{
                                    fontSize: 11, fontWeight: 600,
                                    color: 'rgba(255,255,255,0.65)',
                                    padding: '3px 9px', borderRadius: 50,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.09)',
                                    whiteSpace: 'nowrap',
                                }}>{item}</span>
                            ))}
                        </div>
                    </div>

                    {/* Timeline footer */}
                    <div style={{
                        marginTop: 18, paddingTop: 16,
                        borderTop: '1px solid rgba(255,255,255,0.07)',
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.32)',
                    }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        {card.timeline}
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
            padding: '100px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-6%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(1,115,211,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-8%', left: '-5%', width: 560, height: 560, background: 'radial-gradient(circle, rgba(1,115,211,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* Section header */}
                <div ref={headRef} style={{ maxWidth: 680, margin: '0 auto 64px', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 24 }}
                    >
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#0173D3', letterSpacing: '0.18em' }}>02</span>
                        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
                        <div className="section-label" style={{ marginBottom: 0 }}>{t('outcomes.label')}</div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 28 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.75 }}
                        style={{ fontSize: 'clamp(32px, 4.2vw, 58px)', marginBottom: 18, lineHeight: 1.05, letterSpacing: '-0.035em', fontWeight: 900 }}
                    >
                        {t('outcomes.title1')}{' '}
                        <span className="shimmer-text">{t('outcomes.title2')}</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(255,255,255,0.42)', lineHeight: 1.8 }}
                    >
                        {t('outcomes.subtitle')}
                    </motion.p>
                </div>

                {/* 2×2 card grid */}
                <div className="outcomes-grid">
                    {cards.map((card, i) => (
                        <OutcomeCard key={i} card={card} index={i} icon={SvgIcons[i]} />
                    ))}
                </div>

                {/* CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="outcomes-cta-strip"
                    style={{
                        marginTop: 48,
                        padding: '28px 40px',
                        borderRadius: 22,
                        background: 'rgba(1,115,211,0.06)',
                        border: '1px solid rgba(1,115,211,0.16)',
                        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                        justifyContent: 'space-between', gap: 16,
                        position: 'relative', overflow: 'hidden',
                    }}
                >
                    <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.5), transparent)' }} />
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4, letterSpacing: '-0.01em' }}>
                            {t('outcomes.ctaText')}
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                            No contract · No upfront cost · Free 3-day prototype
                        </div>
                    </div>
                    <a href="#offer">
                        <button className="btn-primary" style={{ fontSize: 14, padding: '13px 30px', borderRadius: 50, whiteSpace: 'nowrap' }}>
                            {t('outcomes.ctaBtn')}
                        </button>
                    </a>
                </motion.div>
            </div>

            <style>{`
                .outcomes-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                }
                .outcome-card-img { transition: transform 0.6s cubic-bezier(0.23,1,0.32,1); }
                .outcomes-card:hover .outcome-card-img { transform: scale(1.04); }
                @media (max-width: 900px) {
                    .outcomes-grid { grid-template-columns: 1fr; }
                    #services { padding: 80px 0; }
                }
                @media (max-width: 600px) {
                    .outcomes-card > div:last-child { padding: 20px 20px 24px !important; }
                    .outcomes-cta-strip { padding: 22px 20px !important; flex-direction: column; align-items: flex-start; }
                }
            `}</style>
        </section>
    )
}
