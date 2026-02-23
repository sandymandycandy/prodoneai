import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactForm() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const [form, setForm] = useState({ name: '', company: '', email: '', problem: '' })
    const [submitted, setSubmitted] = useState(false)
    const [focused, setFocused] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    const inputStyle = (field) => ({
        width: '100%',
        background: focused === field ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${focused === field ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: 14,
        padding: '14px 18px',
        color: '#fff',
        fontSize: '15px',
        fontFamily: 'var(--font-body)',
        outline: 'none',
        transition: 'all 0.3s',
        boxShadow: focused === field ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 3px rgba(255,255,255,0.04)' : 'none',
        backdropFilter: 'blur(12px)',
    })

    return (
        <section id="contact" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '10%',
                width: 500, height: 500,
                background: 'radial-gradient(ellipse, rgba(80,40,200,0.1) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none',
            }} />

            <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
                <div className="contact-layout">

                    {/* Left info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="section-label" style={{ marginBottom: '24px' }}>KONTAKT</div>
                        <h2 style={{ fontSize: 'clamp(30px, 3.5vw, 52px)', marginBottom: '20px', lineHeight: 1.12 }}>
                            Starten Sie Ihr<br />
                            <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                KI-Projekt heute
                            </span>
                        </h2>
                        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.4)', marginBottom: '44px', maxWidth: 380 }}>
                            Beschreiben Sie Ihre Herausforderung und wir liefern innerhalb von 72 Stunden einen funktionalen KI-Prototyp — völlig kostenlos.
                        </p>

                        {/* Contact chips */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { icon: '📧', label: 'Email', value: 'hello@prodone.ai' },
                                { icon: '📍', label: 'Standort', value: 'Mannheim, Deutschland' },
                                { icon: '🕐', label: 'Antwortzeit', value: 'Innerhalb von 2 Werktagen' },
                            ].map((c) => (
                                <div key={c.label} style={{
                                    display: 'flex', alignItems: 'center', gap: '14px',
                                    padding: '16px 20px',
                                    borderRadius: 16,
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(12px)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                                }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 12,
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '18px', flexShrink: 0,
                                    }}>
                                        {c.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{c.label}</div>
                                        <div style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>{c.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div style={{
                            padding: '44px',
                            borderRadius: 28,
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(28px)',
                            WebkitBackdropFilter: 'blur(28px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 12px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Top shine */}
                            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)' }} />

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '48px 0' }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.6 }}
                                        style={{ fontSize: '56px', marginBottom: '20px' }}
                                    >🎉</motion.div>
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Nachricht gesendet!</h3>
                                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                                        Ihr Prototyp ist in 3 Tagen fertig. Wir antworten innerhalb von 2 Stunden.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                    <div style={{ marginBottom: 4 }}>
                                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Kostenlosen Prototypen erhalten</h3>
                                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Keine Verpflichtung. Direkte Antwort.</p>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                        <div>
                                            <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>NAME *</label>
                                            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} placeholder="Max Mustermann" style={inputStyle('name')} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>UNTERNEHMEN *</label>
                                            <input required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} onFocus={() => setFocused('company')} onBlur={() => setFocused('')} placeholder="Firma GmbH" style={inputStyle('company')} />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>E-MAIL *</label>
                                        <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} placeholder="max@firma.de" style={inputStyle('email')} />
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>IHR USE CASE *</label>
                                        <textarea required value={form.problem} onChange={e => setForm({ ...form, problem: e.target.value })} onFocus={() => setFocused('problem')} onBlur={() => setFocused('')} placeholder="Beschreiben Sie Ihren konkreten Anwendungsfall..." rows={4} style={{ ...inputStyle('problem'), resize: 'vertical' }} />
                                    </div>

                                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '16px', borderRadius: 14 }}>
                                        Jetzt Prototyp anfragen ↗
                                    </button>

                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
                                        🔒 Vertraulich · Datenschutzkonform · Unverbindlich
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.22); }
                .contact-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                }
                @media (max-width: 860px) {
                    .contact-layout { grid-template-columns: 1fr !important; gap: 48px; }
                    #contact { padding: 80px 0; }
                }
            `}</style>
        </section>
    )
}
