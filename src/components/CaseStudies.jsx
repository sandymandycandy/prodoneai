import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const glows = [
    'rgba(1, 115, 211, 0.4)',
    'rgba(96, 165, 250, 0.35)',
]

function CaseCard({ c, index }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const enterX = index === 0 ? -60 : 60

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: enterX, rotate: index === 0 ? -2 : 2 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.9, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'relative' }}
        >
            {/* Glass Card */}
            <motion.div
                whileHover={{ y: -10, scale: 1.02, boxShadow: '0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(1,115,211,0.35), inset 0 1px 0 rgba(255,255,255,0.16)' }}
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
                    willChange: 'transform',
                }}
            >
                {/* Colored per-card top-shine */}
                <div style={{
                    position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
                    background: `linear-gradient(90deg, transparent, ${glows[index >= glows.length ? glows.length-1 : index].replace('0.4)','0.65)').replace('0.35)','0.65)')}, transparent)`,
                }} />

                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                    <div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                            {c.label}
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>
                            {c.client}
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{c.sub}</div>
                    </div>
                    {/* Tag chip with glow dot */}
                    <div style={{
                        padding: '7px 14px',
                        borderRadius: 100,
                        background: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.85)',
                        whiteSpace: 'nowrap',
                        display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: glows[index >= glows.length ? glows.length-1 : index].replace('0.4)','1)').replace('0.35)','1)'), flexShrink: 0 }} />
                        {c.tag}
                    </div>
                </div>

                {/* BIG stat */}
                <div style={{ marginBottom: 32 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 + index * 0.12 }}
                        style={{
                            fontSize: 'clamp(60px, 8vw, 96px)',
                            fontWeight: 900,
                            color: '#fff',
                            letterSpacing: '-0.04em',
                            lineHeight: 1,
                            marginBottom: 8,
                            textShadow: `0 0 40px ${glows[index]}`,
                        }}
                    >
                        {c.result}
                    </motion.div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {c.resultLabel}
                    </div>
                </div>

                {/* Summary */}
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 36, flexGrow: 1 }}>
                    {c.summary}
                </p>

                {/* KPI strip with stagger entry */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 1,
                    borderRadius: 18,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                }}>
                    {c.kpis.map((k, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 + index * 0.12 + i * 0.08, duration: 0.55, ease: [0.23,1,0.32,1] }}
                            style={{
                                padding: '18px 12px',
                                textAlign: 'center',
                                borderRight: i < c.kpis.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                                background: 'rgba(255,255,255,0.02)',
                            }}
                        >
                            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4, lineHeight: 1 }}>
                                {k.value}
                            </div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>
                                {k.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function CaseStudies() {
    const headRef = useRef(null)
    const inView = useInView(headRef, { once: true })
    const { t, lang, translations } = useLanguage()
    const cases = translations[lang].caseStudies.cases

    return (
        <section id="cases" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Glass backdrop blobs */}
            <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 680, height: 680, background: 'radial-gradient(circle, rgba(1,115,211,0.12) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-8%', right: '-4%', width: 550, height: 550, background: 'radial-gradient(circle, rgba(1,115,211,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div ref={headRef} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 72px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 28 }}
                    >
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#0173D3', letterSpacing: '0.18em' }}>03</span>
                        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
                        <div className="section-label" style={{ marginBottom: 0 }}>{t('caseStudies.label')}</div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 32 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginTop: 24, marginBottom: 20, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                    >
                        {t('caseStudies.title1')}{' '}
                        <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {t('caseStudies.title2')}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}
                    >
                        {t('caseStudies.subtitle')}
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="cases-grid">
                    {cases.map((c, i) => <CaseCard key={i} c={c} index={i} />)}
                </div>

                {/* Premium CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    style={{
                        marginTop: 56,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        flexWrap: 'wrap', gap: 20,
                        padding: '28px 36px',
                        borderRadius: 20,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderLeft: '2px solid rgba(1,115,211,0.45)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    <div>
                        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: 0 }}>Ready to see results like these?</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: '4px 0 0', fontWeight: 500 }}>Join 9+ industry leaders already scaling with Prodone AI</p>
                    </div>
                    <a href="#offer">
                        <button className="btn-primary" style={{ fontSize: 14, padding: '13px 28px', borderRadius: 50 }}>
                            {t('caseStudies.ctaBtn')}
                        </button>
                    </a>
                </motion.div>
            </div>

            <style>{`
                .cases-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 28px;
                }
                @keyframes orbPulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.15); opacity: 0.75; }
                }
                @media (max-width: 860px) {
                    .cases-grid {
                        grid-template-columns: 1fr !important;
                        gap: 20px;
                    }
                    #cases {
                        padding: 80px 0;
                    }
                }
                @media (max-width: 480px) {
                    #cases {
                        padding: 60px 0;
                    }
                }
            `}</style>
        </section>
    )
}
