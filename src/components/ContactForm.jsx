import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const [form, setForm] = useState({ name: '', company: '', email: '', problem: '' })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [focused, setFocused] = useState('')
    const { t } = useLanguage()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg('')

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_1y1yxto',
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xj3pzwc',
                {
                    from_name: form.name,
                    from_company: form.company,
                    reply_to: form.email,
                    message: form.problem,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'y3fC23b3i9uP1vGZf'
            )
            setSubmitted(true)
        } catch (err) {
            console.error('EmailJS Error:', err)
            setErrorMsg(t('contact.errorMsg') || 'Failed to send message. Please try again.')
        } finally {
            setLoading(false)
        }
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

            <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
                <div className="contact-layout">

                    {/* Left info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="section-label" style={{ marginBottom: '24px' }}>{t('contact.label')}</div>
                        <h2 style={{ fontSize: 'clamp(30px, 3.5vw, 52px)', marginBottom: '20px', lineHeight: 1.12 }}>
                            {t('contact.title1')}<br />
                            <span style={{ color: '#22d4b8' }}>
                                {t('contact.title2')}
                            </span>
                        </h2>
                        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.4)', marginBottom: '44px', maxWidth: 380 }}>
                            {t('contact.subtitle')}
                        </p>

                        {/* Contact info — plain text */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { label: t('contact.email'), value: t('contact.emailVal') },
                                { label: t('contact.location'), value: t('contact.locationVal') },
                                { label: t('contact.response'), value: t('contact.responseVal') },
                            ].map((c) => (
                                <div key={c.label} style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                                    <span style={{ color: 'rgba(255,255,255,0.22)', marginRight: 6 }}>{c.label}:</span>
                                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{c.value}</span>
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
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>{t('contact.successTitle')}</h3>
                                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                                        {t('contact.successMsg')}
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                    <div style={{ marginBottom: 4 }}>
                                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{t('contact.formTitle')}</h3>
                                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>{t('contact.formSubtitle')}</p>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                        <div>
                                            <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t('contact.nameLabel')}</label>
                                            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} placeholder={t('contact.namePlaceholder')} style={inputStyle('name')} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t('contact.companyLabel')}</label>
                                            <input required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} onFocus={() => setFocused('company')} onBlur={() => setFocused('')} placeholder={t('contact.companyPlaceholder')} style={inputStyle('company')} />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t('contact.emailLabel')}</label>
                                        <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} placeholder={t('contact.emailPlaceholderVal')} style={inputStyle('email')} />
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t('contact.useCaseLabel')}</label>
                                        <textarea required value={form.problem} onChange={e => setForm({ ...form, problem: e.target.value })} onFocus={() => setFocused('problem')} onBlur={() => setFocused('')} placeholder={t('contact.useCasePlaceholder')} rows={4} style={{ ...inputStyle('problem'), resize: 'vertical' }} />
                                    </div>

                                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '16px', borderRadius: 14, opacity: loading ? 0.7 : 1 }}>
                                        {loading ? t('contact.sendingBtn') || 'Sending...' : t('contact.submitBtn')}
                                    </button>

                                    {errorMsg && (
                                        <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.3)', color: '#ff6b6b', fontSize: 13, textAlign: 'center' }}>
                                            {errorMsg}
                                        </div>
                                    )}

                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
                                        {t('contact.footNote')}
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
