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
        background: focused === field ? 'rgba(1,115,211,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${focused === field ? 'rgba(1,115,211,0.55)' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: 14,
        padding: '14px 18px',
        color: '#fff',
        fontSize: '15px',
        fontFamily: 'var(--font-body)',
        outline: 'none',
        transition: 'all 0.3s',
        boxShadow: focused === field ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 3px rgba(1,115,211,0.10)' : 'none',
        backdropFilter: 'blur(12px)',
    })

    return (
        <section id="contact" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Glass backdrop blobs */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 680, height: 680, background: 'radial-gradient(circle, rgba(1,115,211,0.13) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-8%', left: '-6%', width: 560, height: 560, background: 'radial-gradient(circle, rgba(1,115,211,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
                <div className="contact-layout">

                    {/* Left info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#0173D3', letterSpacing: '0.18em' }}>09</span>
                            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
                            <div className="section-label" style={{ marginBottom: 0 }}>{t('contact.label')}</div>
                        </div>
                        <h2 style={{ fontSize: 'clamp(30px, 3.5vw, 52px)', marginBottom: '20px', lineHeight: 1.12 }}>
                            {t('contact.title1')}<br />
                            <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {t('contact.title2')}
                            </span>
                        </h2>
                        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.4)', marginBottom: '44px', maxWidth: 380 }}>
                            {t('contact.subtitle')}
                        </p>

                        {/* Contact chips */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: t('contact.email'), value: t('contact.emailVal') },
                                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: t('contact.location'), value: t('contact.locationVal') },
                                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: t('contact.response'), value: t('contact.responseVal') },
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
                                        background: 'rgba(1,115,211,0.10)',
                                        border: '1px solid rgba(1,115,211,0.22)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#60a5fa', flexShrink: 0,
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
                            backdropFilter: 'blur(32px) saturate(1.6)',
                            WebkitBackdropFilter: 'blur(32px) saturate(1.6)',
                            border: '1px solid rgba(255,255,255,0.11)',
                            boxShadow: '0 16px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.14)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Top shine */}
                            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.5), transparent)' }} />

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '48px 0' }}
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                                        style={{
                                            width: 72, height: 72, borderRadius: '50%',
                                            background: 'rgba(1,115,211,0.10)',
                                            border: '1px solid rgba(1,115,211,0.30)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            margin: '0 auto 24px',
                                            color: '#60a5fa',
                                        }}
                                    >
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    </motion.div>
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

                                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '16px', borderRadius: 50, opacity: loading ? 0.7 : 1 }}>
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
