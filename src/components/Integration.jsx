import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const tools = [
    { name: 'Salesforce', color: '#00a1e0', bg: 'rgba(0,161,224,0.12)' },
    { name: 'SAP', color: '#0073e6', bg: 'rgba(0,115,230,0.12)' },
    { name: 'MS Teams', color: '#6264a7', bg: 'rgba(98,100,167,0.12)' },
    { name: 'Slack', color: '#e01e5a', bg: 'rgba(224,30,90,0.12)' },
    { name: 'HubSpot', color: '#ff7a59', bg: 'rgba(255,122,89,0.12)' },
    { name: 'Zapier', color: '#ff4a00', bg: 'rgba(255,74,0,0.12)' },
    { name: 'Power BI', color: '#f2c811', bg: 'rgba(242,200,17,0.12)' },
    { name: 'Zendesk', color: '#03363d', bg: 'rgba(1,115,211,0.12)' },
    { name: 'Notion', color: '#ffffff', bg: 'rgba(255,255,255,0.08)' },
    { name: 'Jira', color: '#0052cc', bg: 'rgba(0,82,204,0.12)' },
    { name: 'MongoDB', color: '#47a248', bg: 'rgba(71,162,72,0.12)' },
    { name: 'AWS', color: '#ff9900', bg: 'rgba(255,153,0,0.12)' },
    { name: 'Google Cloud', color: '#4285f4', bg: 'rgba(66,133,244,0.12)' },
    { name: 'Azure', color: '#0089d6', bg: 'rgba(0,137,214,0.12)' },
    { name: 'Stripe', color: '#635bff', bg: 'rgba(99,91,255,0.12)' },
    { name: 'Twilio', color: '#f22f46', bg: 'rgba(242,47,70,0.12)' },
]

export default function Integration() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const { t, lang, translations } = useLanguage()
    const stats = translations[lang].integration.stats

    const row1 = [...tools.slice(0, 8), ...tools.slice(0, 8)]
    const row2 = [...tools.slice(8, 16), ...tools.slice(8, 16)]

    return (
        <section id="integration" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Glass backdrop blobs */}
            <div style={{ position: 'absolute', top: '-5%', left: '10%', width: 800, height: 500, background: 'radial-gradient(ellipse, rgba(1,115,211,0.12) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-5%', right: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(80,40,200,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="section-label">
                        {t('integration.label')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(30px, 4vw, 56px)', marginTop: 24, marginBottom: 18 }}
                    >
                        {t('integration.title1')}{' '}
                        <span style={{ background: 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.35) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {t('integration.title2')}
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ maxWidth: '440px', margin: '0 auto', fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}
                    >
                        {t('integration.subtitle')}
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
                                        <span style={{ width: 22, height: 22, borderRadius: 7, background: tool.bg, border: `1px solid ${tool.color}33`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: tool.color, letterSpacing: '-0.02em', flexShrink: 0 }}>{tool.name.slice(0,2).toUpperCase()}</span>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>{tool.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="marquee-track">
                            <div className="marquee-content marquee-reverse">
                                {row2.map((tool, i) => (
                                    <div key={i} className="tool-chip">
                                        <span style={{ width: 22, height: 22, borderRadius: 7, background: tool.bg, border: `1px solid ${tool.color}33`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: tool.color, letterSpacing: '-0.02em', flexShrink: 0 }}>{tool.name.slice(0,2).toUpperCase()}</span>
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
                        border: '1px solid rgba(255,255,255,0.10)',
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(28px) saturate(1.5)',
                        WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 12px 50px rgba(0,0,0,0.45)',
                    }}>
                        {stats.map(([v, l], i) => (
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
