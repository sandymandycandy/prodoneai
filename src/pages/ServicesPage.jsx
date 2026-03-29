import { useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import OfferBox from '../components/OfferBox'

/* ─────────────────────────────────────────────
   Each service: unique identity, outcomes, KPIs
───────────────────────────────────────────── */
const SERVICES = [
    {
        id: 'ai-ads',
        image: '/ai-video-ads-hero.png',
        tag: '01 — AI VIDEO ADS',
        title: 'AI Animation Ads',
        subtitle: 'Video ads that stop the scroll. Delivered in 3 days, not 6 weeks.',
        description: 'We use state-of-the-art AI animation pipelines to produce scroll-stopping video ads that outperform traditional agency output — at a fraction of the cost and time.',
        color: '#0173D3',
        glow: 'rgba(1,115,211,0.35)',
        topGlow: 'rgba(1,115,211,0.6)',
        icon: () => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3"/><polygon points="10 9 16 12 10 15"/>
            </svg>
        ),
        outcomes: [
            { stat: '+340%', label: 'Avg. Organic Reach', sub: 'Across Meta & YouTube campaigns' },
            { stat: '8.7%', label: 'Ad Click-Through Rate', sub: 'vs. 1.2% industry average' },
            { stat: '–70%', label: 'Production Cost', sub: 'vs. traditional video agency' },
            { stat: '3 Days', label: 'Prototype → Live', sub: 'Brief on Monday, live by Wednesday' },
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
    },
    {
        id: 'content-workflow',
        image: '/ai-content-workflow-hero.png',
        tag: '02 — CONTENT WORKFLOW',
        title: 'AI Content Workflow',
        subtitle: 'Scale your content output 10× — without scaling your team.',
        description: 'We build a fully customised AI content pipeline that handles ideation, scripting, editing, and publishing — on-brand, at scale, and integrated with your existing tools.',
        color: '#60a5fa',
        glow: 'rgba(1,115,211,0.35)',
        topGlow: 'rgba(1,115,211,0.6)',
        icon: () => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
        ),
        outcomes: [
            { stat: '10×', label: 'Content Output Speed', sub: 'Same team, 10× the volume' },
            { stat: '–60%', label: 'Editorial Time Saved', sub: 'Per content piece produced' },
            { stat: '100%', label: 'On-Brand Consistency', sub: 'AI trained on your brand voice' },
            { stat: '1–2 Wks', label: 'Full Pipeline Setup', sub: 'From briefing to production-ready' },
        ],
        deliverables: [
            'Custom AI editing pipeline (n8n / Make / Zapier)',
            'Brand-voice-trained prompt templates',
            'Editorial calendar integration',
            'Automated publish-to-CMS workflow',
            'Performance tracking dashboard',
            'Team onboarding & documentation',
        ],
        usedBy: 'Media companies, marketing agencies, SaaS brands',
        timeline: 'Setup in 1–2 weeks',
        startingAt: '€3,500',
    },
    {
        id: 'ai-agent',
        image: '/ai-chatbot-hero.png',
        tag: '03 — AI CHATBOT / AGENT',
        title: 'AI Chatbot & Support Agent',
        subtitle: '24/7 AI support that resolves 80% of inquiries — without a single human rep.',
        description: 'A fully trained AI agent that understands your business, speaks your language (DE/EN), integrates with your CRM, and hands off to humans only when truly necessary.',
        color: '#93c5fd',
        glow: 'rgba(96,165,250,0.35)',
        topGlow: 'rgba(1,115,211,0.5)',
        icon: () => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                <circle cx="9" cy="10" r=".8" fill="currentColor"/>
                <circle cx="12" cy="10" r=".8" fill="currentColor"/>
                <circle cx="15" cy="10" r=".8" fill="currentColor"/>
            </svg>
        ),
        outcomes: [
            { stat: '80%', label: 'Inquiries Auto-Resolved', sub: 'Without human intervention' },
            { stat: '92%', label: 'Faster Email Triage', sub: 'Real result: Law Firm Frankfurt' },
            { stat: '3 hrs', label: 'Saved Per Day', sub: 'Per support team member' },
            { stat: '5–10d', label: 'Go-Live Time', sub: 'From kickoff to production' },
        ],
        deliverables: [
            'AI agent trained on your knowledge base',
            'CRM integration (HubSpot, Salesforce, etc.)',
            'Escalation logic & human handoff flows',
            'DE / EN dual-language support',
            'Analytics dashboard (resolution rate, topics)',
            'Ongoing tuning & monthly reporting',
        ],
        usedBy: 'Law firms, SaaS companies, e-commerce support teams',
        timeline: 'Live in 5–10 business days',
        startingAt: '€4,000',
    },
    {
        id: 'custom-apps',
        image: '/custom-ai-apps-hero.png',
        tag: '04 — CUSTOM APPS & MVPs',
        title: 'Custom AI Apps & MVPs',
        subtitle: 'Internal tools and customer-facing apps. Built in weeks, not months.',
        description: 'From internal workflow automation to full-stack web apps with AI embedded — we design, build, and ship functional MVPs fast, with clean APIs and proper documentation.',
        color: '#60a5fa',
        glow: 'rgba(1,115,211,0.35)',
        topGlow: 'rgba(1,115,211,0.6)',
        icon: () => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9l6 6M15 9l-6 6"/>
            </svg>
        ),
        outcomes: [
            { stat: '2–4wk', label: 'MVP Delivery Time', sub: 'From kickoff to deployed app' },
            { stat: '–80%', label: 'Manual Process Overhead', sub: 'For automated internal workflows' },
            { stat: '100%', label: 'API-Ready', sub: 'Clean REST APIs + documentation' },
            { stat: '∞', label: 'Scalability', sub: 'Cloud-native, built to grow' },
        ],
        deliverables: [
            'Functional MVP (web app or internal tool)',
            'AI feature integration (LLM, vision, etc.)',
            'REST API with full documentation',
            'User auth & role management',
            'Cloud deployment (AWS / GCP / Azure)',
            'Onboarding session + handover documentation',
        ],
        usedBy: 'Startups, law firms, logistics & finance teams',
        timeline: 'MVP in 2–4 weeks',
        startingAt: '€6,000',
    },
]

/* ─────────────────────────────────────────────
   Individual service deep-dive section
───────────────────────────────────────────── */
function ServiceSection({ svc, isEven }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section
            id={svc.id}
            ref={ref}
            style={{
                padding: '96px 0',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background glow */}
            <div style={{
                position: 'absolute',
                [isEven ? 'right' : 'left']: '-5%',
                top: '10%',
                width: 600, height: 500,
                background: `radial-gradient(ellipse, ${svc.glow} 0%, transparent 65%)`,
                pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* TOP: 2-col — copy left, image right (alternates) */}
                <div className="svc-top-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: isEven ? '1fr 1.1fr' : '1.1fr 1fr',
                    gap: 64, alignItems: 'center',
                    marginBottom: 72,
                }}>
                    {/* Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? 32 : -32 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                        style={{ order: isEven ? 2 : 1 }}
                    >
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            marginBottom: 24,
                            padding: '6px 16px', borderRadius: 50,
                            background: svc.glow.replace('0.35)', '0.12)'),
                            border: `1px solid ${svc.glow.replace('0.35)', '0.3)')}`,
                        }}>
                            <div style={{ color: svc.color }}>{svc.icon()}</div>
                            <span style={{ fontSize: 10, fontWeight: 800, color: svc.color, letterSpacing: '0.14em' }}>
                                {svc.tag}
                            </span>
                        </div>

                        <h2 style={{
                            fontSize: 'clamp(28px, 3.8vw, 52px)',
                            fontWeight: 900, letterSpacing: '-0.03em',
                            lineHeight: 1.08, marginBottom: 16, color: '#fff',
                        }}>
                            {svc.title}
                        </h2>
                        <p style={{
                            fontSize: 18, fontWeight: 600,
                            color: svc.color, marginBottom: 14, lineHeight: 1.4,
                        }}>
                            {svc.subtitle}
                        </p>
                        <p style={{
                            fontSize: 15, color: 'rgba(255,255,255,0.48)',
                            lineHeight: 1.85,
                        }}>
                            {svc.description}
                        </p>
                    </motion.div>

                    {/* Image panel */}
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? -32 : 32 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.85, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                        style={{ order: isEven ? 1 : 2 }}
                    >
                        <div style={{
                            position: 'relative',
                            borderRadius: 24,
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.09)',
                            boxShadow: `0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px ${svc.glow.replace('0.35)', '0.2)')}`,
                            aspectRatio: '1 / 1',
                        }}>
                            <img
                                src={svc.image}
                                alt={svc.title}
                                loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                            {/* Subtle dark vignette */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(135deg, rgba(0,0,0,0.25) 0%, transparent 60%, rgba(0,0,0,0.3) 100%)',
                                pointerEvents: 'none',
                            }} />
                            {/* Blue corner accent */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                                background: `linear-gradient(90deg, ${svc.topGlow}, transparent)`,
                            }} />
                        </div>
                    </motion.div>
                </div>

                {/* MIDDLE: Outcomes grid */}
                <div className="svc-outcomes-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 16, marginBottom: 64,
                }}>
                    {svc.outcomes.map((o, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40, rotateX: 10 }}
                            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                            style={{
                                padding: '28px 24px',
                                borderRadius: 20,
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.09)',
                                backdropFilter: 'blur(20px)',
                                position: 'relative', overflow: 'hidden',
                                perspective: 1000,
                            }}
                        >
                            {/* Colored top-stripe */}
                            <div style={{
                                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                                background: `linear-gradient(90deg, transparent, ${svc.topGlow}, transparent)`,
                            }} />
                            <div style={{
                                fontSize: 'clamp(28px, 3.5vw, 40px)',
                                fontWeight: 900, color: '#fff',
                                letterSpacing: '-0.03em', lineHeight: 1,
                                marginBottom: 8,
                                textShadow: `0 0 30px ${svc.glow}`,
                            }}>{o.stat}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                                {o.label}
                            </div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>
                                {o.sub}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* BOTTOM: Deliverables + Meta info */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    className="svc-bottom-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 24,
                    }}
                >
                    {/* Deliverables card */}
                    <div style={{
                        padding: '36px 40px',
                        borderRadius: 24,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        backdropFilter: 'blur(20px)',
                        borderLeft: `2px solid ${svc.topGlow}`,
                    }}>
                        <div style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
                            SCOPE OF DELIVERY
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {svc.deliverables.map((d, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                                        <circle cx="12" cy="12" r="10" fill={svc.glow.replace('0.35)', '0.2)')} stroke={svc.color} strokeWidth="1.5"/>
                                        <path d="M8 12l3 3 5-5" stroke={svc.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.5 }}>{d}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Meta + CTA card */}
                    <div style={{
                        padding: '36px 40px',
                        borderRadius: 24,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        backdropFilter: 'blur(20px)',
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    }}>
                        <div>
                            <div style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>
                                PROJECT DETAILS
                            </div>
                            {[
                                { label: 'Used By', value: svc.usedBy },
                                { label: 'Timeline', value: svc.timeline },
                                { label: 'Starting At', value: svc.startingAt },
                            ].map(({ label, value }) => (
                                <div key={label} style={{ marginBottom: 20 }}>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 4 }}>{label}</div>
                                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>{value}</div>
                                    <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginTop: 14 }} />
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                            <a href="#offer">
                                <button className="btn-primary" style={{ fontSize: 14, padding: '13px 24px', borderRadius: 50 }}>
                                    Request Free Prototype →
                                </button>
                            </a>
                            <a href="/pilot">
                                <button className="btn-ghost" style={{ fontSize: 13, padding: '12px 20px', borderRadius: 50 }}>
                                    See Case Study
                                </button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 960px) {
                    #${svc.id} .svc-top-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
                    #${svc.id} .svc-top-grid > div { order: unset !important; }
                }
                @media (max-width: 900px) {
                    #${svc.id} .svc-outcomes-grid { grid-template-columns: repeat(2,1fr) !important; }
                    #${svc.id} .svc-bottom-grid { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 540px) {
                    #${svc.id} .svc-outcomes-grid { grid-template-columns: 1fr 1fr !important; }
                }
            `}</style>
        </section>
    )
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
    exit:    { opacity: 0, y: -16, transition: { duration: 0.35 } },
}

export default function ServicesPage() {
    useEffect(() => {
        const hash = window.location.hash // e.g. "#ai-ads"
        if (hash) {
            // Wait for page to render sections, then scroll to anchor
            const id = hash.replace('#', '')
            const attempt = (tries = 0) => {
                const el = document.getElementById(id)
                if (el) {
                    // Offset by navbar height (~80px)
                    const top = el.getBoundingClientRect().top + window.scrollY - 90
                    window.scrollTo({ top, behavior: 'smooth' })
                } else if (tries < 10) {
                    setTimeout(() => attempt(tries + 1), 80)
                }
            }
            setTimeout(() => attempt(), 100)
        } else {
            window.scrollTo(0, 0)
        }
    }, [])

    return (
        <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">

            {/* ── Page Hero ── */}
            <section style={{
                position: 'relative', paddingTop: 160, paddingBottom: 48,
                textAlign: 'center', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(1,115,211,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, right: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(1,115,211,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div className="section-label" style={{ display: 'inline-flex', marginBottom: 24 }}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        OUR SERVICES
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                        style={{ fontSize: 'clamp(36px, 5vw, 68px)', marginBottom: 20, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                    >
                        AI Services That{' '}
                        <span className="shimmer-text">Actually Deliver</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.75 }}
                    >
                        From AI video ads to enterprise chatbots — production-ready in days, not months.
                    </motion.p>

                    {/* Quick-jump nav */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                        style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        {SERVICES.map((svc) => (
                            <a key={svc.id} href={`#${svc.id}`} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 7,
                                    padding: '8px 16px', borderRadius: 50,
                                    background: svc.glow.replace('0.35)', '0.08)'),
                                    border: `1px solid ${svc.glow.replace('0.35)', '0.25)')}`,
                                    fontSize: 12, fontWeight: 600,
                                    color: svc.color,
                                    transition: 'all 0.3s',
                                    cursor: 'pointer',
                                }}>
                                    {svc.icon()}
                                    {svc.title}
                                </div>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Animated divider ── */}
            <div className="container">
                <div className="section-divider-animated" />
            </div>

            {/* ── Individual service sections ── */}
            {SERVICES.map((svc, i) => (
                <ServiceSection key={svc.id} svc={svc} isEven={i % 2 === 1} />
            ))}

            {/* ── CTA / Offer Box ── */}
            <OfferBox />
        </motion.main>
    )
}
