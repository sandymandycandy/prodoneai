import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function OfferBox() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const { t, lang, translations } = useLanguage()
    const tx = translations[lang].offerBox
    const [sent, setSent] = useState(false)

    return (
        <section id="offer" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)',
                width: 1000, height: 500,
                background: 'radial-gradient(ellipse, rgba(80, 40, 200, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 60px' }}>
                    <motion.div className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                    >
                        {tx.label}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(28px, 4vw, 56px)', marginTop: 24, marginBottom: 18 }}
                    >
                        {tx.title1}{' '}
                        <span style={{ background: 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {tx.title2}
                        </span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
                        style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}
                    >
                        {tx.subtitle}
                    </motion.p>
                </div>

                <div className="offer-grid">
                    {/* LEFT — Process timeline + trust stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                    >
                        {/* ── Mini process timeline ── */}
                        <div style={{
                            padding: '32px',
                            borderRadius: 24,
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Ambient glow inside card */}
                            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(140,100,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

                            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 28 }}>
                                ⚡ {lang === 'DE' ? 'So läuft es ab' : 'How it works'}
                            </div>

                            {[
                                { icon: '📋', color: 'rgba(160,120,255,1)', glow: 'rgba(140,100,255,0.35)', num: '01', title: lang === 'DE' ? 'Brief einreichen' : 'Submit your brief', sub: lang === 'DE' ? 'Formular ausfüllen — dauert 2 Min.' : 'Fill the form — takes 2 min.' },
                                { icon: '🎨', color: 'rgba(80,160,255,1)', glow: 'rgba(60,140,255,0.35)', num: '02', title: lang === 'DE' ? 'Storyboard & Konzept' : 'Storyboard & concept', sub: lang === 'DE' ? 'Wir senden 3 Ideen innerhalb von 24h.' : 'We send 3 ideas within 24 h.' },
                                { icon: '🎬', color: 'rgba(0,210,180,1)', glow: 'rgba(0,190,160,0.35)', num: '03', title: lang === 'DE' ? 'Produktion & Review' : 'Production & review', sub: lang === 'DE' ? 'KI rendert Ihren Ad — Sie geben Feedback.' : 'AI renders your ad — you give feedback.' },
                                { icon: '🚀', color: 'rgba(255,180,60,1)', glow: 'rgba(255,160,40,0.35)', num: '04', title: lang === 'DE' ? 'Live in 3 Tagen' : 'Live in 3 days', sub: lang === 'DE' ? 'Exportiert & startbereit für Meta, YouTube, TikTok.' : 'Exported & ready to launch on Meta, YouTube, TikTok.' },
                            ].map((step, i, arr) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                                    style={{ display: 'flex', gap: 16, position: 'relative' }}
                                >
                                    {/* Connector line */}
                                    {i < arr.length - 1 && (
                                        <div style={{
                                            position: 'absolute', left: 19, top: 44, bottom: -24,
                                            width: 1,
                                            background: `linear-gradient(180deg, ${step.color}55, transparent)`,
                                        }} />
                                    )}
                                    {/* Icon node */}
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 14, flexShrink: 0,
                                        background: `rgba(0,0,0,0.4)`,
                                        border: `1px solid ${step.color}55`,
                                        boxShadow: `0 0 16px ${step.glow}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 17,
                                    }}>{step.icon}</div>

                                    {/* Text */}
                                    <div style={{ paddingBottom: i < arr.length - 1 ? 24 : 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                            <span style={{ fontSize: 10, fontWeight: 800, color: step.color, letterSpacing: '0.08em' }}>{step.num}</span>
                                            <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{step.title}</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>{step.sub}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* ── Trust stat strip ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.75, duration: 0.6 }}
                            style={{
                                display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
                                borderRadius: 20,
                                border: '1px solid rgba(255,255,255,0.08)',
                                background: 'rgba(255,255,255,0.03)',
                                backdropFilter: 'blur(16px)',
                                overflow: 'hidden',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                            }}
                        >
                            {[
                                { val: '3', unit: lang === 'DE' ? 'Tage' : 'Days', label: lang === 'DE' ? 'Prototyp fertig' : 'Prototype ready' },
                                { val: '0', unit: lang === 'DE' ? 'Risiko' : 'Risk', label: lang === 'DE' ? 'Kein Vertrag' : 'No contract' },
                                { val: '2h', unit: '', label: lang === 'DE' ? 'Antwortzeit' : 'Response time' },
                            ].map(({ val, unit, label }, i) => (
                                <div key={i} style={{
                                    padding: '20px 16px', textAlign: 'center',
                                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                }}>
                                    <div style={{ fontWeight: 900, fontSize: 26, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                        {val}<span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(160,120,255,0.9)', marginLeft: 2 }}>{unit}</span>
                                    </div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 5, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
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
                        <div style={{
                            padding: '40px 36px',
                            borderRadius: 28,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                        }}>
                            {!sent ? (
                                <>
                                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                                        {tx.formTitle}
                                    </h3>
                                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 28 }}>
                                        {tx.formSubtitle}
                                    </p>

                                    <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                        {[
                                            { placeholder: tx.namePlaceholder, type: 'text' },
                                            { placeholder: tx.companyPlaceholder, type: 'text' },
                                            { placeholder: tx.emailPlaceholder, type: 'email' },
                                        ].map((input, i) => (
                                            <input key={i} type={input.type} placeholder={input.placeholder} required
                                                style={{
                                                    padding: '14px 18px',
                                                    borderRadius: 14,
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    color: '#fff', fontSize: 14,
                                                    outline: 'none',
                                                    fontFamily: 'var(--font-body)',
                                                    transition: 'all 0.3s',
                                                }}
                                                onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.3)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
                                                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                                            />
                                        ))}
                                        <textarea placeholder={tx.goalPlaceholder} rows={3} required
                                            style={{
                                                padding: '14px 18px',
                                                borderRadius: 14,
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: '#fff', fontSize: 14, resize: 'vertical',
                                                outline: 'none',
                                                fontFamily: 'var(--font-body)',
                                                transition: 'all 0.3s',
                                            }}
                                            onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.3)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
                                            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                                        />
                                        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px', borderRadius: 14, fontSize: 15, marginTop: 4 }}>
                                            {tx.submitBtn}
                                        </button>
                                    </form>
                                    <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
                                        {tx.footNote}
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{tx.successTitle}</h3>
                                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
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
            `}</style>
        </section>
    )
}
