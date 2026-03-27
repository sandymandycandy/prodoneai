import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'

const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
    exit:    { opacity: 0, y: -16, transition: { duration: 0.35 } },
}

const CONTACT_OPTIONS = [
    {
        icon: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>,
        iconColor: '#60a5fa', iconBg: 'rgba(1,115,211,0.15)', iconBorder: 'rgba(1,115,211,0.3)',
        title: 'Request a Prototype', desc: 'Get a free AI ad prototype delivered in 3 days. No contract, no risk.', cta: 'Get Prototype', href: '/#offer',
    },
    {
        icon: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
        iconColor: '#34d399', iconBg: 'rgba(16,185,129,0.12)', iconBorder: 'rgba(16,185,129,0.28)',
        title: 'Book a Discovery Call', desc: "Talk to us directly. We'll scope your project and walk you through the process.", cta: 'Email Us', href: 'mailto:hello@prodone.ai',
    },
    {
        icon: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
        iconColor: '#c4b5fd', iconBg: 'rgba(139,92,246,0.12)', iconBorder: 'rgba(139,92,246,0.28)',
        title: 'Partner With Us', desc: "Agencies and resellers — let's discuss white-label or referral partnerships.", cta: 'Partner Inquiry', href: 'mailto:partners@prodone.ai',
    },
]

export default function ContactPage() {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {/* Page hero */}
            <section style={{ position: 'relative', paddingTop: 160, paddingBottom: 40, textAlign: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10%', right: '5%', width: 700, height: 600, background: 'radial-gradient(ellipse, rgba(1,115,211,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(80,40,200,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div className="section-label" style={{ display: 'inline-flex', marginBottom: 24 }}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        GET IN TOUCH
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                        style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: 20, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                    >
                        Let's build something{' '}
                        <span className="shimmer-text">remarkable</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}
                    >
                        We respond within 2 hours during business hours (CET). No automated replies, no sales scripts.
                    </motion.p>
                </div>
            </section>

            {/* Contact options */}
            <section style={{ padding: '40px 0 0', position: 'relative', overflow: 'hidden' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="contact-options-grid">
                        {CONTACT_OPTIONS.map((opt, i) => (
                            <motion.a
                                key={i}
                                href={opt.href}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(1,115,211,0.3)' }}
                                style={{
                                    display: 'block', textDecoration: 'none',
                                    padding: '28px 24px', borderRadius: 20,
                                    background: 'rgba(255,255,255,0.04)',
                                    backdropFilter: 'blur(20px) saturate(1.5)',
                                    WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
                                    border: '1px solid rgba(255,255,255,0.09)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.09)',
                                    position: 'relative', overflow: 'hidden',
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)' }} />
                                <div style={{ width: 50, height: 50, borderRadius: 15, background: opt.iconBg, border: `1px solid ${opt.iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: opt.iconColor, boxShadow: `0 0 20px ${opt.iconBg}` }}>{opt.icon()}</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{opt.title}</div>
                                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 16 }}>{opt.desc}</div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: '#0173D3' }}>{opt.cta} →</div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact form */}
            <ContactForm />

            <style>{`
                @media (max-width: 860px) {
                    .contact-options-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </motion.main>
    )
}
