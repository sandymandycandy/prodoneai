import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const FAQ_COLORS = [
    { dot: '#60a5fa', glow: 'rgba(1,115,211,0.35)', bg: 'rgba(1,115,211,0.10)', border: 'rgba(1,115,211,0.28)' },
    { dot: '#93c5fd', glow: 'rgba(96,165,250,0.30)', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.24)' },
    { dot: '#60a5fa', glow: 'rgba(1,115,211,0.35)', bg: 'rgba(1,115,211,0.10)', border: 'rgba(1,115,211,0.28)' },
    { dot: '#93c5fd', glow: 'rgba(96,165,250,0.30)', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.24)' },
    { dot: '#60a5fa', glow: 'rgba(1,115,211,0.35)', bg: 'rgba(1,115,211,0.10)', border: 'rgba(1,115,211,0.28)' },
    { dot: '#93c5fd', glow: 'rgba(96,165,250,0.30)', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.24)' },
]

function FaqItem({ faq, index }) {
    const [open, setOpen] = useState(false)
    const col = FAQ_COLORS[index % FAQ_COLORS.length]

    return (
        <motion.div
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                background: open ? 'rgba(1,115,211,0.03)' : 'transparent',
                borderRadius: open ? 16 : 0,
                padding: open ? '0 16px' : '0',
                marginBottom: open ? 6 : 0,
                transition: 'background 0.35s, border-radius 0.35s, padding 0.35s, margin 0.35s',
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: 16, padding: '20px 0',
                    background: 'none', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                }}
            >
                {/* Number badge */}
                <motion.div
                    animate={{
                        background: open ? col.bg : 'rgba(255,255,255,0.04)',
                        border: open ? `1px solid ${col.border}` : '1px solid rgba(255,255,255,0.10)',
                        boxShadow: open ? `0 0 14px ${col.glow}` : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        width: 36, height: 36, borderRadius: 11,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 800,
                        color: open ? col.dot : 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.04em', flexShrink: 0,
                        transition: 'color 0.3s',
                    }}
                >
                    {String(index + 1).padStart(2, '0')}
                </motion.div>

                <span style={{
                    fontSize: 15, fontWeight: 600,
                    color: open ? '#fff' : 'rgba(255,255,255,0.7)',
                    transition: 'color 0.3s', flex: 1, lineHeight: 1.5,
                    letterSpacing: '-0.01em',
                }}>{faq.q}</span>

                {/* +/- icon */}
                <motion.div
                    animate={{
                        rotate: open ? 45 : 0,
                        background: open ? col.bg : 'rgba(255,255,255,0.05)',
                        border: open ? `1px solid ${col.border}` : '1px solid rgba(255,255,255,0.10)',
                        color: open ? col.dot : 'rgba(255,255,255,0.35)',
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    style={{
                        width: 30, height: 30, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20, fontWeight: 300, flexShrink: 0, lineHeight: 1,
                    }}
                >+</motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{
                            paddingLeft: 52, paddingBottom: 24, paddingRight: 46,
                        }}>
                            <p style={{
                                fontSize: 14, lineHeight: 1.9,
                                color: 'rgba(255,255,255,0.52)',
                                borderLeft: `2px solid ${col.border}`,
                                paddingLeft: 16,
                            }}>
                                {faq.a}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function FAQ() {
    const headRef = useRef(null)
    const inView = useInView(headRef, { once: true })
    const { t, lang, translations } = useLanguage()
    const faqItems = translations[lang].faq.items

    return (
        <section id="faq" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Glass backdrop blobs */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 650, height: 650, background: 'radial-gradient(circle, rgba(1,115,211,0.12) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 550, height: 550, background: 'radial-gradient(circle, rgba(1,115,211,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="faq-layout">
                    {/* LEFT sticky */}
                    <div ref={headRef} style={{ position: 'sticky', top: 120 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}
                        >
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#0173D3', letterSpacing: '0.18em' }}>08</span>
                            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
                            <div className="section-label" style={{ marginBottom: 0 }}>{t('faq.label')}</div>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', marginBottom: 18, lineHeight: 1.1 }}
                        >
                            {t('faq.title1')}<br />
                            <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {t('faq.title2')}
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                            style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.35)', marginBottom: 32 }}
                        >
                            {t('faq.subtitle')}
                        </motion.p>
                        <a href="mailto:hello@prodone.ai">
                            <button className="btn-ghost" style={{ fontSize: 13, padding: '11px 20px', borderRadius: 50, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                hello@prodone.ai
                            </button>
                        </a>
                    </div>

                    {/* RIGHT accordion */}
                    <div>
                        {/* Glass FAQ panel */}
                        <div style={{
                            padding: '8px 40px',
                            borderRadius: 28,
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(28px) saturate(1.5)',
                            WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
                            border: '1px solid rgba(255,255,255,0.09)',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.10)',
                        }}>
                            {faqItems.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .faq-layout {
                    display: grid;
                    grid-template-columns: 340px 1fr;
                    gap: 80px;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .faq-layout { grid-template-columns: 1fr !important; gap: 40px; }
                    #faq { padding: 80px 0; }
                    .faq-layout > div:first-child { position: static !important; }
                }
            `}</style>
        </section>
    )
}
