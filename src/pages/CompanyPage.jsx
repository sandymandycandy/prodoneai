import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
    exit:    { opacity: 0, y: -16, transition: { duration: 0.35 } },
}

const VALUE_ICONS = [
    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>,
    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><circle cx="9" cy="10" r=".8" fill="currentColor"/><circle cx="12" cy="10" r=".8" fill="currentColor"/><circle cx="15" cy="10" r=".8" fill="currentColor"/></svg>,
    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
]

const VALUE_COLORS = ['#60a5fa', '#93c5fd', '#60a5fa', '#93c5fd']

const VALUES = [
    { title: 'Speed Without Compromise', desc: '3 days from brief to delivery. We built our entire workflow around this promise — not the other way around.' },
    { title: 'Results-First Thinking', desc: 'Every decision we make ties directly to measurable outcomes: reach, CTR, conversions. No vanity metrics.' },
    { title: 'AI-Native Production', desc: 'We were built on AI from day one. Not a traditional agency that added AI — we are an AI studio.' },
    { title: 'Zero-Risk Partnership', desc: 'No contracts. No upfront payments. We deliver a free prototype first — because we believe results speak louder.' },
]

const TEAM = [
    { name: 'Mukesh', role: 'CEO & Co-founder', location: 'Frankfurt, Germany', initials: 'M' },
    { name: 'Creative Team', role: 'AI Production Leads', location: 'India & Germany', initials: 'CT' },
    { name: 'Tech Team', role: 'AI Engineers', location: 'Remote', initials: 'TT' },
]

const PROCESS = [
    { num: '01', title: 'Submit Your Brief', desc: 'Fill in our 2-minute form with your goal, brand, and audience. No lengthy onboarding, no calls required.' },
    { num: '02', title: 'Storyboard in 24h', desc: 'We send 3 concept directions within 24 hours for your feedback — before any production begins.' },
    { num: '03', title: 'AI Production', desc: 'Our AI pipeline renders your final ad in all formats: Meta, YouTube, TikTok — export-ready in 3 days.' },
    { num: '04', title: 'Launch & Iterate', desc: 'Deploy your campaign. We track performance and iterate based on real data — not guesswork.' },
]

export default function CompanyPage() {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">

            {/* ── Hero ── */}
            <section style={{ position: 'relative', paddingTop: 160, paddingBottom: 80, overflow: 'hidden' }}>
                {/* Background image */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/company-team-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }} />
                {/* Dark overlay */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(135deg, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.80) 60%, rgba(0,0,0,0.90) 100%)' }} />
                {/* Blue glow overlay */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(1,115,211,0.15) 0%, transparent 65%)' }} />
                {/* Top accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 3, background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.6), transparent)' }} />


                <div className="container" style={{ position: 'relative', zIndex: 4 }}>
                    <motion.div className="section-label" style={{ display: 'inline-flex', marginBottom: 24 }}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        ABOUT PRODONE.AI
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                        style={{ fontSize: 'clamp(38px, 5vw, 72px)', marginBottom: 24, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: 820 }}
                    >
                        We Build the AI That{' '}
                        <span className="shimmer-text">Grows Your Business</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', maxWidth: 600, lineHeight: 1.8, marginBottom: 40 }}
                    >
                        prodone.ai is an AI-native production studio headquartered in Frankfurt, Germany.
                        We partner with brands to deliver high-performance AI ads, chatbots, and automation — fast.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        <Link to="/contact">
                            <button className="btn-primary" style={{ fontSize: 15, padding: '14px 30px', borderRadius: 50 }}>Get in Touch →</button>
                        </Link>
                        <Link to="/pilot">
                            <button className="btn-ghost" style={{ fontSize: 15, padding: '13px 26px', borderRadius: 50 }}>View Pilot Case Study</button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── Values ── */}
            <section style={{ position: 'relative', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-5%', left: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(1,115,211,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <div className="section-label" style={{ display: 'inline-flex', marginBottom: 20 }}>OUR VALUES</div>
                        <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.03em' }}>
                            What we stand for
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }} className="company-grid">
                        {VALUES.map((v, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: i * 0.1, duration: 0.7 }}
                                whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(1,115,211,0.3)' }}
                                style={{
                                    padding: '36px 32px',
                                    borderRadius: 24,
                                    background: 'rgba(255,255,255,0.04)',
                                    backdropFilter: 'blur(20px) saturate(1.5)',
                                    WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
                                    border: '1px solid rgba(255,255,255,0.09)',
                                    boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.10)',
                                    position: 'relative', overflow: 'hidden',
                                }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.5), transparent)' }} />
                                <div style={{ width: 50, height: 50, borderRadius: 15, background: `${VALUE_COLORS[i]}15`, border: `1px solid ${VALUE_COLORS[i]}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: VALUE_COLORS[i] }}>{VALUE_ICONS[i]?.()}</div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em' }}>{v.title}</h3>
                                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How We Work ── */}
            <section style={{ position: 'relative', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-5%', right: '-5%', width: 650, height: 650, background: 'radial-gradient(circle, rgba(1,115,211,0.11) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <div className="section-label" style={{ display: 'inline-flex', marginBottom: 20 }}>HOW WE WORK</div>
                        <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.03em' }}>
                            From brief to launch in{' '}
                            <span style={{ color: '#0173D3' }}>3 days</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }} className="process-grid">
                        {PROCESS.map((step, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: i * 0.12, duration: 0.6 }}
                                style={{ padding: '28px 24px', position: 'relative' }}
                            >
                                <div style={{ fontSize: 11, fontWeight: 800, color: '#0173D3', letterSpacing: '0.12em', marginBottom: 12 }}>{step.num}</div>
                                <div style={{ position: 'absolute', top: 28, left: 24, width: 1, height: 32, background: 'linear-gradient(180deg, #0173D3, transparent)', opacity: 0.4 }} />
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{step.title}</h3>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}>{step.desc}</p>
                                {i < 3 && (
                                    <div style={{ position: 'absolute', top: '50%', right: -1, transform: 'translateY(-50%)', fontSize: 16, color: 'rgba(255,255,255,0.12)' }}>→</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section style={{ position: 'relative', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(1,115,211,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <div className="section-label" style={{ display: 'inline-flex', marginBottom: 20 }}>THE TEAM</div>
                        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em' }}>Built by creators & engineers</h2>
                    </div>
                    <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {TEAM.map((member, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    padding: '32px 28px', borderRadius: 24, textAlign: 'center',
                                    background: 'rgba(255,255,255,0.04)',
                                    backdropFilter: 'blur(20px) saturate(1.5)',
                                    WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
                                    border: '1px solid rgba(255,255,255,0.09)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09)',
                                    minWidth: 200, flex: '1 1 200px', maxWidth: 260,
                                }}
                            >
                                <div style={{
                                    width: 64, height: 64, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(1,115,211,0.3), rgba(96,165,250,0.15))',
                                    border: '1px solid rgba(1,115,211,0.25)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 20, fontWeight: 800, color: '#fff',
                                    margin: '0 auto 16px',
                                }}>{member.initials}</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{member.name}</div>
                                <div style={{ fontSize: 12, color: '#0173D3', fontWeight: 600, marginBottom: 6 }}>{member.role}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                    {member.location}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        style={{
                            padding: '56px 40px', borderRadius: 28,
                            background: 'rgba(1,115,211,0.06)',
                            border: '1px solid rgba(1,115,211,0.20)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                        }}
                    >
                        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', marginBottom: 16, letterSpacing: '-0.03em' }}>
                            Ready to see what AI can do<br />for your brand?
                        </h2>
                        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>
                            Get a free prototype delivered in 3 days. No contract. No risk.
                        </p>
                        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/contact">
                                <button className="btn-primary" style={{ fontSize: 15, padding: '14px 32px', borderRadius: 50 }}>Request Free Prototype →</button>
                            </Link>
                            <Link to="/results">
                                <button className="btn-ghost" style={{ fontSize: 15, padding: '13px 26px', borderRadius: 50 }}>See Client Results</button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style>{`
                @media (max-width: 900px) {
                    .company-grid { grid-template-columns: 1fr !important; }
                    .process-grid { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 600px) {
                    .process-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </motion.main>
    )
}
