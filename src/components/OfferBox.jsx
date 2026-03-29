import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const STEP_ICONS = [
    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>,
    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>,
    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><polygon points="10 9 16 12 10 15"/></svg>,
    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>,
]

export default function OfferBox() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const { lang, translations } = useLanguage()
    const tx = translations[lang].offerBox
    const [sent, setSent] = useState(false)

    const steps = [
        {
            num: '01',
            title: lang === 'DE' ? 'Brief einreichen' : 'Submit your brief',
            sub:   lang === 'DE' ? 'Formular ausfüllen — dauert 2 Min.' : 'Fill the form — takes 2 min.',
            color: '#60a5fa',
        },
        {
            num: '02',
            title: lang === 'DE' ? 'Storyboard & Konzept' : 'Storyboard & concept',
            sub:   lang === 'DE' ? 'Wir senden 3 Ideen innerhalb von 24h.' : 'We send 3 ideas within 24 h.',
            color: '#0173D3',
        },
        {
            num: '03',
            title: lang === 'DE' ? 'Produktion & Review' : 'Production & review',
            sub:   lang === 'DE' ? 'KI rendert Ihren Ad — Sie geben Feedback.' : 'AI renders your ad — you give feedback.',
            color: '#60a5fa',
        },
        {
            num: '04',
            title: lang === 'DE' ? 'Live in 3 Tagen' : 'Live in 3 days',
            sub:   lang === 'DE' ? 'Exportiert & startbereit für Meta, YouTube, TikTok.' : 'Exported & ready to launch on Meta, YouTube, TikTok.',
            color: '#0173D3',
        },
    ]

    return (
        <section id="offer" style={{
            position: 'relative',
            padding: '80px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Ambient orbs — blue only */}
            <div style={{ position: 'absolute', top: '-12%', left: '-6%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(1,115,211,0.12) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(1,115,211,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>

                {/* Section header */}
                <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 64px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 28 }}
                    >
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#0173D3', letterSpacing: '0.18em' }}>04</span>
                        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
                        <div className="section-label" style={{ marginBottom: 0 }}>{tx.label}</div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(28px, 3.8vw, 52px)', marginBottom: 18, lineHeight: 1.08, letterSpacing: '-0.035em', fontWeight: 900 }}
                    >
                        {tx.title1}{' '}
                        <span className="shimmer-text">{tx.title2}</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: 16, color: 'rgba(255,255,255,0.38)', lineHeight: 1.8 }}
                    >
                        {tx.subtitle}
                    </motion.p>
                </div>

                <div className="offer-grid">

                    {/* LEFT — Timeline + trust stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                    >
                        {/* Process timeline card */}
                        <div className="offer-process-card" style={{
                            padding: '32px',
                            borderRadius: 22,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.10)',
                            backdropFilter: 'blur(24px) saturate(1.5)',
                            WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.09)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Top shine — blue */}
                            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.5), transparent)' }} />
                            {/* Ambient glow inside */}
                            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(1,115,211,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

                            <div style={{
                                fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.32)',
                                letterSpacing: '0.16em', textTransform: 'uppercase',
                                marginBottom: 28,
                                display: 'flex', alignItems: 'center', gap: 8,
                            }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>
                                {lang === 'DE' ? 'So läuft es ab' : 'How it works'}
                            </div>

                            {steps.map((step, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                                    style={{ display: 'flex', gap: 16, position: 'relative' }}
                                >
                                    {/* Connector line between steps */}
                                    {i < steps.length - 1 && (
                                        <div style={{
                                            position: 'absolute', left: 19, top: 44, bottom: -24,
                                            width: 1,
                                            background: `linear-gradient(180deg, ${step.color}55, transparent)`,
                                        }} />
                                    )}

                                    {/* Step node */}
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 14, flexShrink: 0,
                                        background: 'rgba(1,115,211,0.08)',
                                        border: `1px solid ${step.color}55`,
                                        boxShadow: `0 0 16px rgba(1,115,211,0.2)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: step.color,
                                    }}>{STEP_ICONS[i]?.()}</div>

                                    {/* Step text */}
                                    <div style={{ paddingBottom: i < steps.length - 1 ? 24 : 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                            <span style={{ fontSize: 10, fontWeight: 800, color: step.color, letterSpacing: '0.10em' }}>{step.num}</span>
                                            <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{step.title}</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.36)', lineHeight: 1.6 }}>{step.sub}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Trust stat strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.75, duration: 0.6 }}
                            style={{
                                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                                borderRadius: 20,
                                border: '1px solid rgba(255,255,255,0.08)',
                                background: 'rgba(255,255,255,0.025)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                overflow: 'hidden',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                                position: 'relative',
                            }}
                        >
                            {/* Blue top rule */}
                            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.4), transparent)' }} />
                            {[
                                { val: '3',  unit: lang === 'DE' ? 'Tage' : 'Days',   label: lang === 'DE' ? 'Prototyp fertig' : 'Prototype ready' },
                                { val: '0',  unit: lang === 'DE' ? 'Risiko' : 'Risk',  label: lang === 'DE' ? 'Kein Vertrag' : 'No contract'       },
                                { val: '2h', unit: '',                                  label: lang === 'DE' ? 'Antwortzeit' : 'Response time'       },
                            ].map(({ val, unit, label }, i) => (
                                <div key={i} style={{
                                    padding: '22px 16px', textAlign: 'center',
                                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                }}>
                                    <div style={{ fontWeight: 900, fontSize: 28, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                                        {val}<span style={{ fontSize: 13, fontWeight: 700, color: '#0173D3', marginLeft: 2 }}>{unit}</span>
                                    </div>
                                    <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.28)', marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT — Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <div className="offer-form-card" style={{
                            padding: '40px 36px',
                            borderRadius: 28,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.11)',
                            backdropFilter: 'blur(32px) saturate(1.6)',
                            WebkitBackdropFilter: 'blur(32px) saturate(1.6)',
                            boxShadow: '0 16px 60px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.12)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Top shine — blue */}
                            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.5), transparent)' }} />

                            {!sent ? (
                                <>
                                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: '-0.02em' }}>
                                        {tx.formTitle}
                                    </h3>
                                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', marginBottom: 28 }}>
                                        {tx.formSubtitle}
                                    </p>

                                    <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                        {[
                                            { placeholder: tx.namePlaceholder,    type: 'text'  },
                                            { placeholder: tx.companyPlaceholder, type: 'text'  },
                                            { placeholder: tx.emailPlaceholder,   type: 'email' },
                                        ].map((input, i) => (
                                            <input key={i} type={input.type} placeholder={input.placeholder} required
                                                style={{
                                                    padding: '14px 18px',
                                                    borderRadius: 14,
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.10)',
                                                    color: '#fff', fontSize: 14,
                                                    outline: 'none',
                                                    fontFamily: 'var(--font-body)',
                                                    transition: 'border-color 0.25s, background 0.25s',
                                                }}
                                                onFocus={e => { e.target.style.borderColor = 'rgba(1,115,211,0.55)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
                                                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                                            />
                                        ))}
                                        <textarea placeholder={tx.goalPlaceholder} rows={3} required
                                            style={{
                                                padding: '14px 18px',
                                                borderRadius: 14,
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.10)',
                                                color: '#fff', fontSize: 14, resize: 'vertical',
                                                outline: 'none',
                                                fontFamily: 'var(--font-body)',
                                                transition: 'border-color 0.25s, background 0.25s',
                                            }}
                                            onFocus={e => { e.target.style.borderColor = 'rgba(1,115,211,0.55)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
                                            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                                        />
                                        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', borderRadius: 50, fontSize: 15, marginTop: 4, letterSpacing: '0.01em' }}>
                                            {tx.submitBtn}
                                        </button>
                                    </form>
                                    <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.22)', lineHeight: 1.6 }}>
                                        {tx.footNote}
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <div style={{
                                        width: 64, height: 64, borderRadius: 20,
                                        background: 'rgba(1,115,211,0.10)',
                                        border: '1px solid rgba(1,115,211,0.28)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 20px',
                                        boxShadow: '0 0 32px rgba(1,115,211,0.15)',
                                    }}>
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                    </div>
                                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em' }}>{tx.successTitle}</h3>
                                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8 }}>
                                        {tx.successMsg}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .offer-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .offer-grid { grid-template-columns: 1fr !important; }
                    #offer { padding: 80px 0; }
                }
                @media (max-width: 600px) {
                    .offer-form-card { padding: 28px 20px !important; }
                    .offer-process-card { padding: 24px 18px !important; }
                }
            `}</style>
        </section>
    )
}
