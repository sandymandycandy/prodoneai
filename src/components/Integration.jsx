import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const tools = [
    { name: 'Salesforce', icon: '☁️' },
    { name: 'SAP', icon: '🔷' },
    { name: 'MS Teams', icon: '🟣' },
    { name: 'Slack', icon: '💬' },
    { name: 'HubSpot', icon: '🧡' },
    { name: 'Zapier', icon: '⚡' },
    { name: 'Power BI', icon: '📊' },
    { name: 'Zendesk', icon: '🎧' },
    { name: 'Notion', icon: '⬛' },
    { name: 'Jira', icon: '🔵' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'AWS', icon: '🔶' },
    { name: 'Google Cloud', icon: '🌐' },
    { name: 'Azure', icon: '🔵' },
    { name: 'Stripe', icon: '💳' },
    { name: 'Twilio', icon: '📱' },
]

export default function Integration() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    const row1 = [...tools.slice(0, 8), ...tools.slice(0, 8)]
    const row2 = [...tools.slice(8, 16), ...tools.slice(8, 16)]

    return (
        <section id="integration" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: 800, height: 400,
                background: 'radial-gradient(ellipse, rgba(40,100,240,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="section-label">
                        INTEGRATION
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(30px, 4vw, 56px)', marginTop: 24, marginBottom: 18 }}
                    >
                        Verbindet sich mit Ihrem{' '}
                        <span style={{ background: 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.35) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            bestehenden Stack
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ maxWidth: '440px', margin: '0 auto', fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}
                    >
                        Unsere KI integriert nahtlos in 100+ Enterprise-Tools — kein Rip & Replace, kein Downtime.
                    </motion.p>
                </div>

                {/* Marquee rows */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.35 }}
                >
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                        {/* Edge fades */}
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '140px', background: 'linear-gradient(90deg, #000, transparent)', zIndex: 10, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '140px', background: 'linear-gradient(270deg, #000, transparent)', zIndex: 10, pointerEvents: 'none' }} />

                        <div className="marquee-track" style={{ marginBottom: '14px' }}>
                            <div className="marquee-content marquee-forward">
                                {row1.map((tool, i) => (
                                    <div key={i} className="tool-chip">
                                        <span style={{ fontSize: '18px' }}>{tool.icon}</span>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>{tool.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="marquee-track">
                            <div className="marquee-content marquee-reverse">
                                {row2.map((tool, i) => (
                                    <div key={i} className="tool-chip">
                                        <span style={{ fontSize: '18px' }}>{tool.icon}</span>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>{tool.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom glass stat strip */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.55, duration: 0.7 }}
                    style={{ textAlign: 'center', marginTop: '60px' }}
                >
                    <div style={{
                        display: 'inline-flex', gap: 0,
                        borderRadius: 24,
                        border: '1px solid rgba(255,255,255,0.09)',
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 40px rgba(0,0,0,0.4)',
                    }}>
                        {[['100+', 'Integrationen'], ['< 48h', 'Setup-Zeit'], ['Zero', 'Downtime']].map(([v, l], i) => (
                            <div key={l} style={{
                                textAlign: 'center', padding: '24px 48px',
                                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                            }}>
                                <div style={{
                                    fontSize: '32px', fontWeight: 900, color: '#fff',
                                    letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6,
                                }}>{v}</div>
                                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 600px) {
                    #integration { padding: 70px 0; }
                    #integration .container > div:last-child > div { flex-direction: column !important; gap: 0; }
                    #integration .container > div:last-child > div > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07); padding: 20px 32px !important; }
                }
            `}</style>
        </section>
    )
}
