import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

function FaqItem({ faq, index }) {
    const [open, setOpen] = useState(false)

    return (
        <motion.div
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            style={{ borderLeft: open ? '2px solid rgba(1,115,211,0.5)' : '2px solid transparent', paddingLeft: open ? 16 : 0, transition: 'border-color 0.3s, padding 0.3s' }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: 20,
                    padding: '22px 0', background: 'none', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                }}
            >
                <span style={{
                    fontSize: 16, fontWeight: 600,
                    color: open ? '#fff' : 'rgba(255,255,255,0.65)',
                    transition: 'color 0.3s', flex: 1, lineHeight: 1.45,
                }}>{faq.q}</span>
                <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: open ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, color: open ? '#fff' : 'rgba(255,255,255,0.35)',
                    transition: 'all 0.35s', flexShrink: 0,
                    transform: open ? 'rotate(45deg)' : 'none',
                }}>+</span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.4)', paddingBottom: 22, paddingRight: 48 }}>
                            {faq.a}
                        </p>
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
            <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 550, height: 550, background: 'radial-gradient(circle, rgba(80,40,200,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="faq-layout">
                    {/* LEFT sticky */}
                    <div ref={headRef} style={{ position: 'sticky', top: 120 }}>
                        <motion.div className="section-label" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
                            {t('faq.label')}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', marginTop: 20, marginBottom: 18, lineHeight: 1.1 }}
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
                            <button className="btn-ghost" style={{ fontSize: 13, padding: '11px 20px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
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
