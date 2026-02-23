import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cases = [
    {
        label: 'Case Study 01',
        tag: '🎬 KI-Animation',
        client: 'Großer dt. Einzelhändler',
        sub: 'Retail · Marketing',
        result: '+340%',
        resultLabel: 'Organische Reichweite',
        kpis: [
            { value: '8.7%', label: 'Video CTR' },
            { value: '–70%', label: 'Produktionskosten' },
            { value: '3 Tage', label: 'Prototyp → Live' },
        ],
        summary: 'Saisonale KI-Video-Ads statt teurer Filmproduktion — für Meta, YouTube & Instore-Screens.',
        glow: 'rgba(120, 80, 255, 0.4)',
    },
    {
        label: 'Case Study 02',
        tag: '🤖 KI-Agent',
        client: 'Anwaltskanzlei Frankfurt',
        sub: 'Legal · Support-Automation',
        result: '92%',
        resultLabel: 'Schnellere E-Mail-Triage',
        kpis: [
            { value: '99%', label: 'Routing-Genauigkeit' },
            { value: '3 Std.', label: 'Täglich eingespart' },
            { value: '7 Tage', label: 'Analyse → Go-Live' },
        ],
        summary: 'KI-Agent klassifiziert & leitet 80+ E-Mails täglich in unter 2 Sekunden weiter.',
        glow: 'rgba(0, 200, 160, 0.35)',
    },
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
            {/* Glow orb */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    top: '20%', left: index === 0 ? '-10%' : '60%',
                    width: '50%', height: '50%',
                    background: c.glow,
                    borderRadius: '50%',
                    filter: 'blur(70px)',
                    pointerEvents: 'none', zIndex: 0,
                }}
            />

            {/* Glass Card */}
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'relative', zIndex: 1,
                    padding: '40px 36px',
                    borderRadius: 28,
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 12px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                }}
            >
                {/* Top shine */}
                <div style={{
                    position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
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
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{c.sub}</div>
                    </div>
                    <div style={{
                        padding: '8px 16px',
                        borderRadius: 100,
                        background: 'rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        fontSize: 12, fontWeight: 700, color: '#fff',
                        whiteSpace: 'nowrap',
                    }}>
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
                            textShadow: `0 0 40px ${c.glow}`,
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

                {/* KPI strip */}
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
                        <div key={i} style={{
                            padding: '18px 12px',
                            textAlign: 'center',
                            borderRight: i < c.kpis.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                            background: 'rgba(255,255,255,0.02)',
                        }}>
                            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4, lineHeight: 1 }}>
                                {k.value}
                            </div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>
                                {k.label}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function CaseStudies() {
    const headRef = useRef(null)
    const inView = useInView(headRef, { once: true })

    return (
        <section id="cases" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Ambient background glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 1000, height: 500,
                background: 'radial-gradient(ellipse, rgba(60, 30, 140, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div ref={headRef} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 72px' }}>
                    <motion.div
                        className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                    >
                        REFERENZPROJEKTE
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 32 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginTop: 24, marginBottom: 20, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                    >
                        Echte Ergebnisse.{' '}
                        <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Keine Buzzwords.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}
                    >
                        Harte KPIs aus echten Projekten, pünktlich geliefert.
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="cases-grid">
                    {cases.map((c, i) => <CaseCard key={i} c={c} index={i} />)}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    style={{ textAlign: 'center', marginTop: 56 }}
                >
                    <a href="#offer">
                        <button className="btn-primary" style={{ fontSize: 15, padding: '15px 32px', borderRadius: 14 }}>
                            Eigenes Projekt anfragen →
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
