import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

/* ── Service data ── */
const SERVICES = {
    'ai-ads': {
        id: 'ai-ads',
        tag: '01 — AI VIDEO ADS',
        title: 'AI Video Ads',
        subtitle: 'From brief to 3 campaign-ready ad variants in 3 business days.',
        description: 'We produce AI-animated video ads that actually convert — for Meta, YouTube, and TikTok. No film crew, no 6-week wait. Brief on Monday, live by Wednesday.',
        color: '#0173D3',
        glow: 'rgba(1,115,211,0.35)',
        topGlow: 'rgba(1,115,211,0.6)',
        bgImage: '/ai-video-ads-hero.png',
        icon: () => (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
            </svg>
        ),
        kpis: [
            { value: '+340%', label: 'Avg. Organic Reach', sub: 'Across Meta & YouTube campaigns' },
            { value: '8.7%',  label: 'Ad Click-Through Rate', sub: 'vs. 1.2% industry average' },
            { value: '–70%',  label: 'Production Cost', sub: 'vs. traditional video agency' },
            { value: '3 Days',label: 'Prototype → Live', sub: 'Brief on Monday, live by Wednesday' },
        ],
        deliverables: [
            '3× AI-animated ad variants (A/B/C)',
            'AI storyboard — reviewed & approved',
            'Royalty-free music & sound effects',
            'Multi-format export (Meta, YouTube, TikTok)',
            'Performance report 30 days post-launch',
            'Up to 2 feedback revision rounds',
        ],
        usedBy: 'Retail chains, e-commerce brands, D2C startups',
        timeline: 'Prototype in 3 business days',
        startingAt: '€5,000',
        caseStudy: '/pilot',
    },
    'content-workflow': {
        id: 'content-workflow',
        tag: '02 — AI CONTENT WORKFLOW',
        title: 'AI Content Workflow',
        subtitle: 'Scale your content output 10× — without scaling your team.',
        description: 'We build a fully customised AI content pipeline that handles ideation, scripting, editing, and publishing — on-brand, at scale, and integrated with your existing tools.',
        color: '#60a5fa',
        glow: 'rgba(1,115,211,0.35)',
        topGlow: 'rgba(1,115,211,0.6)',
        bgImage: '/ai-content-workflow-hero.png',
        icon: () => (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
        ),
        kpis: [
            { value: '10×',   label: 'Content Output Speed', sub: 'Same team, 10× more content' },
            { value: '–80%',  label: 'Production Time', sub: 'vs. manual editorial workflow' },
            { value: '100%',  label: 'On-Brand Output', sub: 'AI trained on your style guide' },
            { value: '1–2 Weeks', label: 'Full Pipeline Setup', sub: 'End-to-end automation live' },
        ],
        deliverables: [
            'AI editorial pipeline (ideation → publish)',
            'Custom brand voice training',
            'Template system for all content types',
            'Editorial calendar integration',
            'CMS & tool integrations (Notion, HubSpot, etc.)',
            'Monthly performance reporting',
        ],
        usedBy: 'Marketing teams, media companies, SaaS brands',
        timeline: 'Full setup in 1–2 weeks',
        startingAt: '€4,500',
        caseStudy: '/results',
    },
    'ai-agent': {
        id: 'ai-agent',
        tag: '03 — AI CHATBOT & AGENT',
        title: 'AI Chatbot & Support Agent',
        subtitle: '24/7 AI support that resolves 80% of inquiries — without a single human rep.',
        description: 'A fully trained AI agent that understands your business, speaks your language (DE/EN), integrates with your CRM, and hands off to humans only when truly necessary.',
        color: '#93c5fd',
        glow: 'rgba(96,165,250,0.35)',
        topGlow: 'rgba(1,115,211,0.5)',
        bgImage: '/ai-chatbot-hero.png',
        icon: () => (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
        ),
        kpis: [
            { value: '80%',   label: 'Auto-Resolved Inquiries', sub: 'Without human intervention' },
            { value: '24/7',  label: 'Always Available', sub: 'DE & EN, peak & off-peak' },
            { value: '99%',   label: 'Routing Accuracy', sub: 'Correct escalation every time' },
            { value: '5–10 Days', label: 'Go-Live Timeline', sub: 'Analysis to production' },
        ],
        deliverables: [
            'Fully trained AI support agent (DE/EN)',
            'CRM integration (HubSpot, Salesforce, etc.)',
            'Custom escalation & handoff logic',
            'Analytics dashboard with KPIs',
            'Onboarding documentation & training',
            'Ongoing model fine-tuning (3 months)',
        ],
        usedBy: 'E-commerce, law firms, SaaS, healthcare',
        timeline: 'Live in 5–10 business days',
        startingAt: '€6,000',
        caseStudy: '/results',
    },
    'custom-apps': {
        id: 'custom-apps',
        tag: '04 — CUSTOM AI APPS & MVPs',
        title: 'Custom AI Apps & MVPs',
        subtitle: 'Internal tools and customer-facing apps. Built in weeks, not months.',
        description: 'From internal workflow automation to full-stack web apps with AI embedded — we design, build, and ship functional MVPs fast, with clean APIs and proper documentation.',
        color: '#60a5fa',
        glow: 'rgba(1,115,211,0.35)',
        topGlow: 'rgba(1,115,211,0.6)',
        bgImage: '/custom-ai-apps-hero.png',
        icon: () => (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9l6 6M15 9l-6 6"/>
            </svg>
        ),
        kpis: [
            { value: '2–4 Weeks', label: 'MVP Delivery', sub: 'Functional & deployment-ready' },
            { value: '100+',  label: 'API Integrations', sub: 'Any tool in your stack' },
            { value: '–60%',  label: 'Dev Cost vs Agency', sub: 'AI-accelerated development' },
            { value: '0',     label: 'Vendor Lock-In', sub: 'You own the code, always' },
        ],
        deliverables: [
            'Functional MVP (web app or internal tool)',
            'AI feature integration (GPT, Claude, custom)',
            'Clean REST API with documentation',
            'All third-party integrations configured',
            'Onboarding session & handover docs',
            'Up to 2 weeks post-launch support',
        ],
        usedBy: 'Startups, scale-ups, enterprise internal teams',
        timeline: 'MVP in 2–4 weeks',
        startingAt: '€8,000',
        caseStudy: '/results',
    },
}

const OTHER_SERVICES = [
    { id: 'ai-ads',           label: 'AI Video Ads',        color: '#0173D3' },
    { id: 'content-workflow', label: 'AI Content Workflow',  color: '#60a5fa' },
    { id: 'ai-agent',         label: 'AI Chatbot & Agent',  color: '#93c5fd' },
    { id: 'custom-apps',      label: 'Custom AI Apps & MVPs', color: '#60a5fa' },
]

export default function ServiceDetailPage() {
    const { serviceId } = useParams()
    const navigate = useNavigate()
    const svc = SERVICES[serviceId]

    useEffect(() => { window.scrollTo(0, 0) }, [serviceId])

    if (!svc) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>Service not found.</p>
                <Link to="/services"><button className="btn-primary" style={{ borderRadius: 50 }}>← All Services</button></Link>
            </div>
        )
    }

    const others = OTHER_SERVICES.filter(s => s.id !== svc.id)

    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
            {/* ── HERO — Full bleed background image ── */}
            <section style={{
                position: 'relative',
                minHeight: '92vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
            }}>
                {/* Background image */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${svc.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }} />
                {/* Dark overlay — preserves readability & glassmorphism aesthetic */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.88) 100%)',
                }} />
                {/* Blue tint overlay */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 2,
                    background: `radial-gradient(ellipse 70% 60% at 80% 50%, ${svc.glow} 0%, transparent 65%)`,
                }} />
                {/* Top shimmer line */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 3,
                    background: `linear-gradient(90deg, transparent, ${svc.topGlow}, transparent)`,
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 4, paddingTop: 140, paddingBottom: 100 }}>
                    {/* Back link */}
                    <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <Link to="/services" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)',
                            textDecoration: 'none', marginBottom: 40,
                            letterSpacing: '0.06em', textTransform: 'uppercase',
                            transition: 'color 0.2s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                        >
                            ← All Services
                        </Link>
                    </motion.div>

                    <div style={{ maxWidth: 760 }}>
                        {/* Tag */}
                        <motion.div className="section-label" style={{ display: 'inline-flex', marginBottom: 28 }}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                            {svc.tag}
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                            style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: 20 }}
                        >
                            {svc.title.split(' ').map((word, i, arr) =>
                                i === arr.length - 1
                                    ? <span key={i} style={{ color: svc.color }}>{word}</span>
                                    : <span key={i}>{word} </span>
                            )}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
                            style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontWeight: 500, marginBottom: 16 }}
                        >
                            {svc.subtitle}
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
                            style={{ fontSize: 15, color: 'rgba(255,255,255,0.42)', lineHeight: 1.85, maxWidth: 620, marginBottom: 40 }}
                        >
                            {svc.description}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
                            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            <Link to="/contact">
                                <button className="btn-primary" style={{ fontSize: 15, padding: '14px 28px', borderRadius: 50 }}>
                                    Request Free Prototype →
                                </button>
                            </Link>
                            <Link to={svc.caseStudy}>
                                <button className="btn-ghost" style={{ fontSize: 14, padding: '13px 24px', borderRadius: 50 }}>
                                    See Case Study
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── KEY RESULTS ── */}
            <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 400, background: `radial-gradient(ellipse, ${svc.glow.replace('0.35', '0.08')} 0%, transparent 65%)`, pointerEvents: 'none' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <div className="section-label" style={{ display: 'inline-flex', marginBottom: 20 }}>KEY RESULTS</div>
                        <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.03em' }}>
                            Numbers that <span style={{ color: svc.color }}>speak</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }} className="kpi-grid">
                        {svc.kpis.map((kpi, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: i * 0.08, duration: 0.6 }}
                                style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none', position: 'relative' }}
                            >
                                <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 2, background: `linear-gradient(90deg, transparent, ${svc.color}80, transparent)` }} />
                                <div style={{ fontSize: 'clamp(28px, 2.8vw, 40px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 10, textShadow: `0 0 30px ${svc.glow}` }}>
                                    {kpi.value}
                                </div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>{kpi.label}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', lineHeight: 1.5 }}>{kpi.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SCOPE + DETAILS ── */}
            <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: '-5%', width: 600, height: 600, background: `radial-gradient(circle, ${svc.glow.replace('0.35', '0.09')} 0%, transparent 65%)`, pointerEvents: 'none' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="scope-grid">

                        {/* Scope of delivery */}
                        <motion.div
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}
                            style={{ padding: '40px 36px', borderRadius: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09)', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: `linear-gradient(90deg, transparent, ${svc.color}60, transparent)` }} />
                            <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 24 }}>SCOPE OF DELIVERY</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {svc.deliverables.map((d, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                        style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${svc.color}18`, border: `1px solid ${svc.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={svc.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        </div>
                                        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.68)', lineHeight: 1.6 }}>{d}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Project details */}
                        <motion.div
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.12, duration: 0.7 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                        >
                            {/* Detail card */}
                            <div style={{ padding: '32px', borderRadius: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: `linear-gradient(90deg, transparent, ${svc.color}60, transparent)` }} />
                                <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 28 }}>PROJECT DETAILS</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                                    {[
                                        { label: 'Used By', value: svc.usedBy },
                                        { label: 'Timeline', value: svc.timeline },
                                        { label: 'Starting At', value: svc.startingAt },
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{item.label}</div>
                                            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA card */}
                            <div style={{ padding: '28px 32px', borderRadius: 24, background: `${svc.color}10`, border: `1px solid ${svc.color}28`, position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: `linear-gradient(90deg, transparent, ${svc.color}80, transparent)` }} />
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Start with a free prototype</div>
                                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', marginBottom: 20, lineHeight: 1.6 }}>
                                    No contract. No risk. Get a working prototype in 3 days.
                                </div>
                                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                    <Link to="/contact">
                                        <button className="btn-primary" style={{ fontSize: 14, padding: '13px 24px', borderRadius: 50 }}>
                                            Request Free Prototype →
                                        </button>
                                    </Link>
                                    <Link to={svc.caseStudy}>
                                        <button className="btn-ghost" style={{ fontSize: 13, padding: '12px 20px', borderRadius: 50 }}>
                                            See Case Study
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── OTHER SERVICES ── */}
            <section style={{ padding: '60px 0 80px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="container">
                    <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 28 }}>EXPLORE MORE SERVICES</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="other-services-grid">
                        {others.map((o, i) => (
                            <motion.div key={o.id}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -5 }}
                                onClick={() => navigate(`/services/${o.id}`)}
                                style={{
                                    padding: '24px 20px', borderRadius: 18, cursor: 'pointer',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.09)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                                    transition: 'border-color 0.25s, box-shadow 0.25s',
                                    position: 'relative', overflow: 'hidden',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = `${o.color}40`; e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${o.color}28`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.07)'; }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: `linear-gradient(90deg, transparent, ${o.color}50, transparent)` }} />
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{o.label}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Explore service →</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <style>{`
                @media (max-width: 900px) {
                    .scope-grid { grid-template-columns: 1fr !important; }
                    .other-services-grid { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 600px) {
                    .kpi-grid { grid-template-columns: 1fr 1fr !important; }
                    .other-services-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </motion.main>
    )
}
