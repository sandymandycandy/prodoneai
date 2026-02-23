import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
    {
        icon: '🤖',
        title: 'Intelligente Chatbots',
        description: 'Context-aware conversational AI that understands, learns, and resolves client queries 24/7 — dramatically reducing response times and staff workload.',
        features: ['Multi-language support', 'CRM integration', 'Auto-escalation'],
        color: '#00e5ff',
        stat: '80%', statLabel: 'Support cost reduction',
    },
    {
        icon: '📊',
        title: 'Predictive Analytics',
        description: 'Machine learning models that transform your historical data into actionable forecasts — from demand prediction to churn prevention.',
        features: ['Real-time dashboards', 'Anomaly detection', 'Custom KPI models'],
        color: '#0066ff',
        stat: '3×', statLabel: 'Forecast accuracy lift',
    },
    {
        icon: '👁️',
        title: 'Visuelle Erkennungssysteme',
        description: 'Computer vision for quality control, identity verification, document scanning, and real-time object detection in industrial environments.',
        features: ['99.8% accuracy', 'Edge deployment', 'Real-time processing'],
        color: '#7c3aed',
        stat: '99.8%', statLabel: 'Detection accuracy',
    },
    {
        icon: '🛡️',
        title: 'Betrugsprävention',
        description: 'AI-powered fraud detection that analyses behavioural patterns and transaction signals in milliseconds before damage occurs.',
        features: ['<5ms detection', 'Self-learning model', '99.9% uptime'],
        color: '#10b981',
        stat: '<5ms', statLabel: 'Detection latency',
    },
]

function ServiceCard({ service, i }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-50px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.23, 1, 0.32, 1] }}
        >
            <div
                className="glass-card service-card"
                style={{
                    padding: '32px',
                    position: 'relative', overflow: 'hidden',
                    borderTop: `2px solid ${service.color}50`,
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 20,
                    alignItems: 'start',
                }}
            >
                {/* Left content */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: 13,
                            background: `${service.color}12`,
                            border: `1px solid ${service.color}22`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 22, flexShrink: 0,
                        }}>{service.icon}</div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0f4ff', lineHeight: 1.2 }}>
                            {service.title}
                        </h3>
                    </div>

                    <p style={{ fontSize: 14, lineHeight: 1.8, color: '#8899bb', marginBottom: 20 }}>
                        {service.description}
                    </p>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {service.features.map((f, fi) => (
                            <div key={fi} style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                padding: '5px 12px', borderRadius: 50,
                                background: `${service.color}0a`,
                                border: `1px solid ${service.color}20`,
                                fontSize: 12, color: service.color, fontWeight: 500,
                            }}>
                                ✓ {f}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right stat */}
                <div style={{
                    textAlign: 'center', padding: '14px 20px',
                    borderRadius: 14,
                    background: `${service.color}08`,
                    border: `1px solid ${service.color}18`,
                    minWidth: 90, flexShrink: 0,
                }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: service.color, lineHeight: 1 }}>{service.stat}</div>
                    <div style={{ fontSize: 10, color: '#445577', marginTop: 6, lineHeight: 1.4, maxWidth: 70 }}>{service.statLabel}</div>
                </div>
            </div>
        </motion.div>
    )
}

export default function Services() {
    const headRef = useRef(null)
    const inView = useInView(headRef, { once: true })

    return (
        <section id="services" className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
                {/* ── 2-column layout: sticky left, scrolling cards right ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 80, alignItems: 'start' }}>

                    {/* LEFT — sticky header */}
                    <div ref={headRef} style={{ position: 'sticky', top: 120 }}>
                        <motion.div className="section-label" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
                            Core Services
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 28 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            style={{ fontSize: 'clamp(28px, 3vw, 46px)', marginTop: 16, marginBottom: 20, lineHeight: 1.12 }}
                        >
                            Maßgeschneiderte{' '}
                            <span className="gradient-text">KI-Lösungen</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            style={{ fontSize: 15, lineHeight: 1.85, color: '#8899bb', marginBottom: 36 }}
                        >
                            Four powerful AI competencies, each engineered to solve real business problems and deliver measurable, auditable results.
                        </motion.p>

                        <motion.a
                            href="#contact"
                            initial={{ opacity: 0, y: 12 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            <button className="btn-primary" style={{ fontSize: 14, padding: '13px 26px' }}>
                                Lösung anfragen ↗
                            </button>
                        </motion.a>
                    </div>

                    {/* RIGHT — cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {services.map((s, i) => <ServiceCard key={i} service={s} i={i} />)}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          #services .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    )
}
