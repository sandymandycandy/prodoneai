import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const included = [
    'Storyboard oder Konzeptpapier (schriftlich)',
    'Erste animierte Version / funktionsfähiger Prototyp',
    'Bis zu 2 Feedback-Runden',
    '1 finales Format (z.B. MP4 15s oder Webapp-Demo)',
    'Briefing-Call (60 Min.) + Scope-Definition',
]

const notIncluded = [
    'Vollständige Kampagnen-Produktion',
    'Backend / komplexe Integrationen',
    'Paid-Media-Setup / Ad-Konto',
    'Laufende Pflege (ohne Retainer)',
]

export default function OfferBox() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const [sent, setSent] = useState(false)
    const [form, setForm] = useState({ name: '', company: '', email: '', goal: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        setSent(true)
    }

    return (
        <section id="offer" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '30%', right: '5%',
                width: 600, height: 600,
                background: 'radial-gradient(ellipse, rgba(70,30,180,0.12) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                >
                    {/* Outer glass card */}
                    <div style={{
                        borderRadius: 32,
                        border: '1px solid rgba(255,255,255,0.1)',
                        overflow: 'hidden',
                        position: 'relative',
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(30px)',
                        WebkitBackdropFilter: 'blur(30px)',
                        boxShadow: '0 20px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
                    }}>
                        {/* Top shine */}
                        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)' }} />

                        <div className="offerbox-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

                            {/* LEFT — offer details */}
                            <div style={{ padding: '52px 48px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="section-label" style={{ marginBottom: 24 }}>DAS ANGEBOT</div>
                                <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', lineHeight: 1.08, marginBottom: 18 }}>
                                    Kostenloser Prototyp<br />
                                    <span style={{ background: 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                        in 3 Werktagen.
                                    </span>
                                </h2>
                                <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(255,255,255,0.38)', marginBottom: 40 }}>
                                    Kein Risiko. Kein Vertrag. Sie erhalten einen echten Prototyp — bevor Sie sich entscheiden.
                                </p>

                                {/* Included */}
                                <div style={{ marginBottom: 32 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                                        INKLUSIVE
                                    </div>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {included.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -16 }}
                                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ delay: 0.2 + i * 0.06 }}
                                                style={{ display: 'flex', gap: 12, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, alignItems: 'flex-start' }}
                                            >
                                                <span style={{
                                                    width: 18, height: 18, borderRadius: '50%',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: 10, color: '#fff', flexShrink: 0, marginTop: 1,
                                                }}>✓</span>
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Not included */}
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
                                        NICHT INBEGRIFFEN
                                    </div>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {notIncluded.map((item, i) => (
                                            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.22)', lineHeight: 1.55 }}>
                                                <span style={{ color: 'rgba(255,255,255,0.18)', flexShrink: 0 }}>—</span>{item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* RIGHT — form */}
                            <div style={{ padding: '52px 48px' }}>
                                {sent ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: 16 }}
                                    >
                                        <div style={{ fontSize: 52 }}>✓</div>
                                        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Anfrage erhalten!</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.7, maxWidth: 300 }}>
                                            Wir melden uns innerhalb von 24 Stunden per E-Mail. Ihr Prototyp-Briefing beginnt damit.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Prototyp anfragen</h3>
                                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', marginBottom: 32, lineHeight: 1.7 }}>
                                            Kein Verkaufsgespräch. Direkte Antwort innerhalb von 24 Stunden.
                                        </p>

                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                            {[
                                                { name: 'name', placeholder: 'Ihr Name', type: 'text' },
                                                { name: 'company', placeholder: 'Unternehmen / Agentur', type: 'text' },
                                                { name: 'email', placeholder: 'E-Mail-Adresse', type: 'email' },
                                            ].map(field => (
                                                <input
                                                    key={field.name}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    required
                                                    value={form[field.name]}
                                                    onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.04)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        borderRadius: 12, padding: '14px 18px',
                                                        fontSize: 14, color: '#fff',
                                                        fontFamily: 'var(--font-body)',
                                                        outline: 'none', transition: 'all 0.3s',
                                                    }}
                                                    onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.3)'; e.target.style.background = 'rgba(255,255,255,0.07)' }}
                                                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                                                />
                                            ))}

                                            <textarea
                                                placeholder="Was ist Ihr Ziel / Use-Case? (z.B. Animationsanzeige für Produktlaunch)"
                                                required rows={4}
                                                value={form.goal}
                                                onChange={e => setForm({ ...form, goal: e.target.value })}
                                                style={{
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: 12, padding: '14px 18px',
                                                    fontSize: 14, color: '#fff',
                                                    fontFamily: 'var(--font-body)',
                                                    outline: 'none', resize: 'vertical', transition: 'all 0.3s',
                                                }}
                                                onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.3)'; e.target.style.background = 'rgba(255,255,255,0.07)' }}
                                                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                                            />

                                            <button type="submit" className="btn-primary" style={{ fontSize: 15, padding: '16px', borderRadius: 14, justifyContent: 'center' }}>
                                                Kostenlosen Prototyp anfragen →
                                            </button>

                                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
                                                Kein Spam. Keine versteckten Kosten. Wirklich kostenlos.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.22); }
                .offerbox-layout {
                    grid-template-columns: 1fr 1fr;
                }
                @media (max-width: 900px) {
                    .offerbox-layout { grid-template-columns: 1fr !important; }
                    .offerbox-layout > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
                    #offer { padding: 80px 0; }
                    #offer .container > div > div > div { padding: 36px 28px !important; }
                }
            `}</style>
        </section>
    )
}
