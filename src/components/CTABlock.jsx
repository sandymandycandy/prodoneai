import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function CTABlock() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const { t, lang, translations } = useLanguage()
    const badges = translations[lang].cta.badges

    return (
        <section style={{ padding: '80px 0' }}>
            <div className="container" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.97 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                        position: 'relative', borderRadius: 40, overflow: 'hidden',
                        padding: 'clamp(56px, 8vw, 100px) clamp(24px, 5vw, 80px)',
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)',
                        textAlign: 'center',
                    }}
                >
                    {/* Animated glow orbs */}
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'rgba(1,115,211,0.18)', filter: 'blur(80px)', top: '-180px', left: '-100px', pointerEvents: 'none' }}
                    />
                    <motion.div
                        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.75, 0.4] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'rgba(30,100,240,0.15)', filter: 'blur(80px)', bottom: '-180px', right: '-100px', pointerEvents: 'none' }}
                    />

                    {/* Top shine */}
                    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }} />

                    {/* Grid overlay */}
                    <div className="grid-overlay" style={{ borderRadius: 40, opacity: 0.4 }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="section-label"
                            style={{ margin: '0 auto 28px' }}
                        >
                            {t('cta.label')}
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.9 }}
                            style={{ fontSize: 'clamp(32px, 4.5vw, 62px)', marginBottom: '24px', lineHeight: 1.08 }}
                        >
                            {t('cta.title1')}<br />
                            <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {t('cta.title2')}
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            style={{ fontSize: '17px', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)' }}
                        >
                            {t('cta.subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 }}
                            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            <a href="#contact">
                                <button className="btn-primary" style={{ fontSize: '16px', padding: '18px 44px' }}>
                                    {t('cta.primaryBtn')}
                                </button>
                            </a>
                            <a href="/pilot">
                                <button className="btn-ghost" style={{ fontSize: '16px', padding: '17px 40px', borderRadius: 50 }}>
                                    {t('cta.secondaryBtn')}
                                </button>
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8 }}
                            style={{ marginTop: '44px', display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            {badges.map((item, i) => (
                                <div key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 14px', borderRadius: 50, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(1,115,211,0.8)', boxShadow: '0 0 6px rgba(1,115,211,0.6)', flexShrink: 0 }} />
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
