import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import CTABlock from '../components/CTABlock'

/* ── Demo chatbot conversations ─────────────────────────────────────── */
const DEMO_FLOWS = [
    { trigger: "What's included in the free prototype?", reply: "Your free 3-day prototype includes:\n\n• Storyboard or concept paper (Day 1)\n• First animated / functional version (Day 2–3)\n• Up to 2 feedback rounds\n• 1 final format (MP4 15s or web app demo)\n• 60-min briefing call + scope definition\n\nNo contract, no hidden costs. Completely free." },
    { trigger: "How fast can you deliver?", reply: "Speed is our superpower:\n\n• AI Animation Ads → Prototype in **3 Days**\n• AI Chatbots / Agents → Live in **5–10 Days**\n• Custom Web Apps → MVP in **2–4 Weeks**\n\nWe run dual-continent sprints (Germany + India) so work never stops — even overnight." },
    { trigger: "What does full production cost?", reply: "Production pricing starts at:\n\n• AI Animation Ad (3 variants, all formats) → from **€5,000**\n• AI Agent / Chatbot (full setup) → from **€8,000**\n• Custom Web App / MVP → from **€12,000**\n\nAll projects start with a **free prototype** — you only invest when you're 100% happy." },
    { trigger: "Can I see a real case study?", reply: "Here's our top result:\n\n**Large German Retailer — Q4 Campaign**\n• +340% organic reach\n• 8.7% Ad CTR (vs. 1.2% industry avg)\n• –70% production cost vs. traditional agency\n• Delivered in **3 days**\n\nYou're viewing that exact case study right now!" },
    { trigger: "Do you work with agencies?", reply: "Yes! We work as a **white-label AI partner** for many agencies.\n\n• Your branding, our AI infrastructure\n• NDA available on request\n• Discreet & fast turnaround\n• Suitable for video ads, chatbots & apps\n\nAgencies typically re-sell our output at a 2–3× margin. Want to discuss a white-label setup?" },
    { trigger: "What technology do you use?", reply: "Our AI tech stack includes:\n\n• **Video production** → Custom AI animation pipelines + motion graphics\n• **Chatbots / Agents** → GPT-4, Claude, RAG with vector DBs\n• **Web Apps** → React, Next.js, Node.js, Supabase\n• **Integrations** → CRM, Zapier, Make, REST APIs\n\nAll secure, GDPR-compliant, hosted in Germany or EU." },
    { trigger: "Which languages do you support?", reply: "We work in **English and German** natively.\n\nOur core market is DACH (Germany, Austria, Switzerland), but we've delivered projects for clients across the UK, USA, and India too.\n\nNeed content in another language? Just let us know during the briefing call." },
    { trigger: "How is prodone.ai different?", reply: "Here's what makes us different:\n\n**Traditional agency** → 6–12 weeks, €20k+, slow feedback loops\n\n**prodone.ai** → 3-day free prototype, then production in days — not months.\n\nWe combine AI infrastructure with dual-continent sprint teams to deliver at a speed no traditional agency can match. You only pay after you see results." },
]

/* ── Chatbot ──────────────────────────────────────────────────────────── */
function DemoChatbot() {
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hi! I'm the prodone.ai demo assistant.\n\nAsk me anything about our services, pricing, or how we work. Or pick a quick question below." }
    ])
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const messagesRef = useRef(null)

    const scrollBottom = () => setTimeout(() => {
        if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }, 80)

    const sendMessage = (text) => {
        if (!text.trim() || typing) return
        setMessages(prev => [...prev, { role: 'user', text }])
        setInput('')
        setTyping(true)
        scrollBottom()
        const match = DEMO_FLOWS.find(f => f.trigger.toLowerCase().split(' ').some(w => text.toLowerCase().includes(w) && w.length > 3))
            || DEMO_FLOWS[Math.floor(Math.random() * DEMO_FLOWS.length)]
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: match.reply }])
            setTyping(false)
            scrollBottom()
        }, 1100 + Math.random() * 600)
    }

    const formatText = (text) => text.split('\n').map((line, i) => {
        const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        return <div key={i} style={{ minHeight: line === '' ? 8 : 'auto' }} dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }} />
    })

    const chips = [
        { label: 'Pricing', trigger: "What does full production cost?" },
        { label: 'Delivery Speed', trigger: "How fast can you deliver?" },
        { label: 'Free Prototype', trigger: "What's included in the free prototype?" },
        { label: 'Case Study', trigger: "Can I see a real case study?" },
        { label: 'For Agencies', trigger: "Do you work with agencies?" },
        { label: 'Tech Stack', trigger: "What technology do you use?" },
        { label: 'Why prodone?', trigger: "How is prodone.ai different?" },
    ]

    return (
        <div style={{ borderRadius: 24, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(5,5,13,0.98)', boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(1,115,211,0.06), inset 0 1px 0 rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', height: 560, maxHeight: '72vh', position: 'relative', overflow: 'hidden', width: '100%' }}>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(1,115,211,0.6),transparent)' }} />

            {/* Header */}
            <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg,rgba(1,115,211,0.08) 0%,rgba(1,115,211,0.03) 100%)', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 13, background: 'linear-gradient(135deg,rgba(1,115,211,0.5),rgba(1,115,211,0.3))', border: '1px solid rgba(1,115,211,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(1,115,211,0.25)' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 10c0 3.87-3.13 7-7 7a6.95 6.95 0 01-4.09-1.33L2 17l1.33-3.91A6.95 6.95 0 013 10c0-3.87 3.13-7 7-7s7 3.13 7 7z"/><circle cx="7" cy="10" r=".7" fill="currentColor"/><circle cx="10" cy="10" r=".7" fill="currentColor"/><circle cx="13" cy="10" r=".7" fill="currentColor"/></svg>
                    </div>
                    <motion.div animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ position: 'absolute', bottom: 2, right: 2, width: 9, height: 9, borderRadius: '50%', background: '#22c55e', border: '2px solid rgba(5,5,13,0.98)', boxShadow: '0 0 8px rgba(34,197,94,0.8)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Aria — prodone.ai</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                        <span style={{ fontSize: 10, color: 'rgba(34,197,94,0.9)', fontWeight: 600 }}>● Online</span>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>·</span>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Demo · No login required</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.75 }} />)}
                </div>
            </div>

            {/* Messages */}
            <div ref={messagesRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12, scrollbarWidth: 'none', minHeight: 0 }}>
                {messages.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }}
                        style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
                        {m.role === 'bot' && <div style={{ width: 28, height: 28, borderRadius: 9, flexShrink: 0, background: 'rgba(1,115,211,0.2)', border: '1px solid rgba(1,115,211,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="rgba(96,165,250,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 10c0 3.87-3.13 7-7 7a6.95 6.95 0 01-4.09-1.33L2 17l1.33-3.91A6.95 6.95 0 013 10c0-3.87 3.13-7 7-7s7 3.13 7 7z"/><circle cx="7" cy="10" r=".7" fill="currentColor"/><circle cx="10" cy="10" r=".7" fill="currentColor"/><circle cx="13" cy="10" r=".7" fill="currentColor"/></svg></div>}
                        <div style={{ maxWidth: '76%', padding: m.role === 'user' ? '10px 14px' : '12px 16px', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px', background: m.role === 'user' ? 'linear-gradient(135deg,rgba(1,115,211,0.95),rgba(1,90,180,0.95))' : 'rgba(255,255,255,0.05)', border: m.role === 'user' ? '1px solid rgba(1,115,211,0.5)' : '1px solid rgba(255,255,255,0.08)', fontSize: 13, lineHeight: 1.65, color: m.role === 'user' ? '#fff' : 'rgba(255,255,255,0.85)', boxShadow: m.role === 'user' ? '0 4px 20px rgba(1,115,211,0.3)' : '0 2px 8px rgba(0,0,0,0.25)', fontFamily: 'var(--font-body)' }}>
                            {formatText(m.text)}
                        </div>
                        {m.role === 'user' && <div style={{ width: 28, height: 28, borderRadius: 9, flexShrink: 0, background: 'rgba(1,115,211,0.2)', border: '1px solid rgba(1,115,211,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#60a5fa', fontWeight: 700 }}>U</div>}
                    </motion.div>
                ))}
                {typing && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 9, flexShrink: 0, background: 'rgba(1,115,211,0.2)', border: '1px solid rgba(1,115,211,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="rgba(96,165,250,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 10c0 3.87-3.13 7-7 7a6.95 6.95 0 01-4.09-1.33L2 17l1.33-3.91A6.95 6.95 0 013 10c0-3.87 3.13-7 7-7s7 3.13 7 7z"/><circle cx="7" cy="10" r=".7" fill="currentColor"/><circle cx="10" cy="10" r=".7" fill="currentColor"/><circle cx="13" cy="10" r=".7" fill="currentColor"/></svg></div>
                        <div style={{ padding: '10px 16px', borderRadius: '4px 18px 18px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 5, alignItems: 'center' }}>
                            {[0, 1, 2].map(i => <motion.div key={i} animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.65, delay: i * 0.15, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(1,115,211,0.8)' }} />)}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Chips */}
            <div style={{ padding: '8px 16px 6px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Quick questions</div>
                <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
                    {chips.map((c, i) => (
                        <motion.button key={i} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => sendMessage(c.trigger)}
                            style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 50, cursor: 'pointer', background: 'rgba(1,115,211,0.08)', border: '1px solid rgba(1,115,211,0.20)', color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'var(--font)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(1,115,211,0.18)'; e.currentTarget.style.borderColor = 'rgba(1,115,211,0.40)'; e.currentTarget.style.color = '#fff' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(1,115,211,0.08)'; e.currentTarget.style.borderColor = 'rgba(1,115,211,0.20)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
                        >{c.label}</motion.button>
                    ))}
                </div>
            </div>

            {/* Input */}
            <div style={{ padding: '10px 16px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '8px 8px 8px 14px' }}>
                    <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                        placeholder="Type a question or pick one above…"
                        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 13, fontFamily: 'var(--font-body)', caretColor: '#0173D3' }}
                        onFocus={e => e.currentTarget.parentElement.style.borderColor = 'rgba(1,115,211,0.4)'}
                        onBlur={e => e.currentTarget.parentElement.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    <motion.button whileHover={input.trim() ? { scale: 1.08 } : {}} whileTap={input.trim() ? { scale: 0.92 } : {}} onClick={() => sendMessage(input)}
                        style={{ width: 36, height: 36, borderRadius: 10, border: 'none', cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, background: input.trim() ? 'linear-gradient(135deg,rgba(1,115,211,1),rgba(1,90,180,1))' : 'rgba(255,255,255,0.06)', color: input.trim() ? '#fff' : 'rgba(255,255,255,0.25)', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: input.trim() ? '0 4px 16px rgba(1,115,211,0.4)' : 'none', transition: 'all 0.25s' }}>↑</motion.button>
                </div>
                <div style={{ textAlign: 'center', marginTop: 7, fontSize: 9.5, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Demo · Real AI deployed for your project</div>
            </div>
        </div>
    )
}

/* ── HERO METRICS ─────────────────────────────────────────────────────── */
const HERO_METRICS = [
    { v: '+340%', l: 'Organic Reach', color: '#34d399', bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.22)' },
    { v: '8.7%',  l: 'Ad CTR',        color: '#60a5fa', bg: 'rgba(1,115,211,0.10)',  border: 'rgba(1,115,211,0.22)'  },
    { v: '3 Days',l: 'Delivered In',  color: '#c4b5fd', bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.22)' },
    { v: '−70%',  l: 'Cost Saving',   color: '#fbbf24', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.22)' },
]

const STEP_COLORS = [
    { num: '01', color: '#60a5fa', bg: 'rgba(1,115,211,0.10)',  border: 'rgba(1,115,211,0.22)'  },
    { num: '02', color: '#c4b5fd', bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.22)' },
    { num: '03', color: '#34d399', bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.22)' },
    { num: '04', color: '#fbbf24', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.22)' },
]

/* ── PAGE ─────────────────────────────────────────────────────────────── */
export default function Pilot() {
    useEffect(() => { window.scrollTo(0, 0) }, [])
    const { lang, translations } = useLanguage()
    const p = translations[lang].pilot

    const heroRef    = useRef(null); const heroInView    = useInView(heroRef,    { once: true })
    const processRef = useRef(null); const processInView = useInView(processRef, { once: true, margin: '-60px' })
    const resultsRef = useRef(null); const resultsInView = useInView(resultsRef, { once: true })
    const chatRef    = useRef(null); const chatInView    = useInView(chatRef,    { once: true, margin: '-60px' })

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

            {/* ══════════════════════════════════════════════════════
                HERO — editorial split layout
            ══════════════════════════════════════════════════════ */}
            <section style={{ paddingTop: 110, paddingBottom: 0, position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>

                {/* Background blobs */}
                <div style={{ position: 'absolute', top: '-5%', right: '-8%', width: 700, height: 700, background: 'radial-gradient(circle,rgba(1,115,211,0.14) 0%,transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '5%', left: '-8%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(139,92,246,0.09) 0%,transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                {/* Giant decorative "3" */}
                <div style={{ position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-55%)', fontSize: 'clamp(300px,40vw,580px)', fontWeight: 900, color: 'rgba(1,115,211,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.06em' }}>3</div>

                <div className="container" ref={heroRef} style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <div className="pilot-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', minHeight: '80vh' }}>

                        {/* ─ LEFT ─ */}
                        <div>
                            {/* Client badge row */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 14px 7px 10px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}>
                                    <img src="/globus-logo.svg" alt="Globus" style={{ width: 26, height: 'auto', display: 'block' }} />
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Globus</span>
                                    <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />
                                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>German Retail · Q4 2024</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 12, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)', fontSize: 12, fontWeight: 700, color: 'rgba(34,197,94,0.9)' }}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    Verified Client
                                </div>
                            </motion.div>

                            {/* Headline */}
                            <motion.div initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}>
                                <h1 style={{ fontSize: 'clamp(42px,5.5vw,80px)', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.0, marginBottom: 28, margin: 0 }}>
                                    <span style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>From</span>
                                    <span style={{ display: 'block', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', textDecorationThickness: '3px', textDecorationColor: 'rgba(255,255,255,0.25)' }}>6 Weeks</span>
                                    <span style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>to</span>
                                    <span style={{ display: 'block', color: '#0173D3', textShadow: '0 0 80px rgba(1,115,211,0.4)' }}>3 Days.</span>
                                </h1>
                            </motion.div>

                            {/* Description */}
                            <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
                                style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(255,255,255,0.45)', marginBottom: 36, marginTop: 28, maxWidth: 480 }}>
                                Globus needed a full Q4 AI video campaign. We delivered{' '}
                                <strong style={{ color: '#fff', fontWeight: 700 }}>3 final ads across all formats</strong> in 3 days.
                                Results exceeded every benchmark.
                            </motion.p>

                            {/* Metric grid */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 32 }}>
                                {HERO_METRICS.map((m, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, scale: 0.85 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 260, damping: 20 }}
                                        whileHover={{ y: -4, scale: 1.04 }}
                                        style={{ padding: '16px 12px', borderRadius: 16, background: m.bg, border: `1px solid ${m.border}`, textAlign: 'center', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden', willChange: 'transform' }}>
                                        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: `linear-gradient(90deg,transparent,${m.color},transparent)`, opacity: 0.5 }} />
                                        <div style={{ fontSize: 'clamp(16px,1.5vw,22px)', fontWeight: 900, color: m.color, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 6, filter: `drop-shadow(0 0 10px ${m.color}80)` }}>{m.v}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.3 }}>{m.l}</div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Testimonial quote */}
                            <motion.blockquote initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
                                style={{ margin: '0 0 32px', padding: '18px 22px', borderRadius: 16, background: 'rgba(1,115,211,0.05)', border: '1px solid rgba(1,115,211,0.14)', borderLeft: '3px solid #0173D3', backdropFilter: 'blur(10px)' }}>
                                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic', margin: '0 0 12px' }}>
                                    "prodone.ai delivered in 3 days what our agency would have taken 6 weeks to produce. The AI ads outperformed everything we've run before."
                                </p>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>
                                    — Marketing Director, <strong style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Globus GmbH &amp; Co. KG</strong> · Frankfurt
                                </div>
                            </motion.blockquote>

                            {/* CTAs */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
                                style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                <button className="btn-primary" style={{ borderRadius: 14, padding: '14px 28px', fontSize: 14, fontWeight: 700 }}>
                                    Read Full Case Study →
                                </button>
                                <button className="btn-ghost" style={{ borderRadius: 14, padding: '13px 24px', fontSize: 14 }}>
                                    Get Your Prototype
                                </button>
                            </motion.div>
                        </div>

                        {/* ─ RIGHT: Phone mockup ─ */}
                        <motion.div initial={{ opacity: 0, x: 60, scale: 0.93 }} animate={heroInView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ delay: 0.28, duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
                            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            {/* Glow behind phone */}
                            <div style={{ position: 'absolute', top: '10%', left: '5%', width: '90%', height: '80%', background: 'rgba(1,115,211,0.18)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none', animation: 'orbPulse 6s ease-in-out infinite' }} />

                            {/* Phone shell */}
                            <div style={{ position: 'relative', zIndex: 1, width: 290, borderRadius: 46, background: 'linear-gradient(160deg,#161625 0%,#0a0a14 100%)', border: '2px solid rgba(255,255,255,0.13)', boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.12)', padding: '14px 14px' }}>
                                {/* Notch */}
                                <div style={{ width: 72, height: 22, background: '#0a0a14', borderRadius: 12, margin: '0 auto 10px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                                    <div style={{ width: 28, height: 4, borderRadius: 3, background: 'rgba(255,255,255,0.07)' }} />
                                </div>
                                {/* Video */}
                                <div style={{ borderRadius: 30, overflow: 'hidden', position: 'relative', aspectRatio: '9/16', background: '#000' }}>
                                    <video src="/globus-ad.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 70, background: 'linear-gradient(to bottom,rgba(0,0,0,0.5),transparent)', pointerEvents: 'none' }} />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, background: 'linear-gradient(to top,rgba(0,0,0,0.6),transparent)', pointerEvents: 'none' }} />
                                    {/* Client badge */}
                                    <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 7, padding: '5px 10px', borderRadius: 50, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                                        <img src="/globus-logo.svg" alt="Globus" style={{ width: 28, height: 'auto', display: 'block' }} />
                                        <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>Globus</span>
                                    </div>
                                    {/* AI label */}
                                    <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 9px', borderRadius: 50, background: 'rgba(1,115,211,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(1,115,211,0.5)', fontSize: 9, fontWeight: 800, color: '#fff', letterSpacing: '0.07em' }}>AI AD</div>
                                </div>
                                <div style={{ width: 60, height: 4, background: 'rgba(255,255,255,0.18)', borderRadius: 3, margin: '10px auto 0' }} />
                            </div>

                            {/* Floating chips */}
                            {[
                                { v: '+340%', l: 'REACH',     color: '#34d399', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', pos: { top: '6%', right: '-10%' }, anim: [0, -8, 0], dur: 3.5 },
                                { v: '3 Days', l: 'DELIVERED', color: '#c4b5fd', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', pos: { bottom: '20%', right: '-12%' }, anim: [0, 7, 0], dur: 4 },
                                { v: '−70%',  l: 'COST',      color: '#fbbf24', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.28)', pos: { bottom: '10%', left: '-10%' }, anim: [0, -5, 0], dur: 4.5 },
                            ].map((chip, i) => (
                                <motion.div key={i} animate={{ y: chip.anim }} transition={{ duration: chip.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                                    style={{ position: 'absolute', ...chip.pos, padding: '10px 16px', borderRadius: 16, background: chip.bg, border: `1px solid ${chip.border}`, backdropFilter: 'blur(14px)', textAlign: 'center', boxShadow: '0 8px 28px rgba(0,0,0,0.4)', zIndex: 2 }}>
                                    <div style={{ fontSize: 20, fontWeight: 900, color: chip.color, lineHeight: 1, filter: `drop-shadow(0 0 10px ${chip.color}80)` }}>{chip.v}</div>
                                    <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.09em' }}>{chip.l}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                PROCESS — horizontal cards
            ══════════════════════════════════════════════════════ */}
            <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} ref={processRef}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 400, background: 'radial-gradient(ellipse,rgba(1,115,211,0.07) 0%,transparent 65%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Section header */}
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}}
                            className="section-label" style={{ margin: '0 auto 18px' }}>
                            OUR 3-DAY PROCESS
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                            style={{ fontSize: 'clamp(26px,3.5vw,48px)', letterSpacing: '-0.04em', marginBottom: 14 }}>
                            {p.processTitle1}{' '}
                            <span style={{ color: '#0173D3' }}>{p.processTitle2}</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} animate={processInView ? { opacity: 1 } : {}} transition={{ delay: 0.18 }}
                            style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', maxWidth: 440, margin: '0 auto' }}>
                            From first briefing to delivered campaign — in 72 hours.
                        </motion.p>
                    </div>

                    {/* Horizontal steps */}
                    <div style={{ position: 'relative' }}>
                        {/* Connecting line */}
                        <div style={{ position: 'absolute', top: 40, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg,rgba(1,115,211,0.3),rgba(139,92,246,0.3),rgba(16,185,129,0.3),rgba(245,158,11,0.3))', zIndex: 0 }} />

                        <div className="pilot-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, position: 'relative', zIndex: 1 }}>
                            {p.processSteps.map((step, i) => {
                                const sc = STEP_COLORS[i]
                                return (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 32 }} animate={processInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.1 + i * 0.12, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        style={{ padding: '28px 22px', borderRadius: 22, background: sc.bg, border: `1px solid ${sc.border}`, backdropFilter: 'blur(12px)', boxShadow: '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', willChange: 'transform' }}>
                                        {/* Top accent line */}
                                        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 2, background: `linear-gradient(90deg,transparent,${sc.color},transparent)`, borderRadius: 1 }} />

                                        {/* Step number badge */}
                                        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(5,5,13,0.6)', border: `1px solid ${sc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                                            <span style={{ fontSize: 18, fontWeight: 900, color: sc.color, letterSpacing: '-0.03em' }}>{sc.num}</span>
                                        </div>

                                        {/* Tag */}
                                        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 50, background: `${sc.bg}`, border: `1px solid ${sc.border}`, fontSize: 10, fontWeight: 700, color: sc.color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
                                            {step.tag}
                                        </div>

                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em' }}>{step.title}</h3>
                                        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.42)', margin: 0 }}>{step.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Completion badge */}
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={processInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.7, type: 'spring', bounce: 0.4 }}
                        style={{ marginTop: 36, display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 24px', borderRadius: 14, background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', backdropFilter: 'blur(10px)' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.8)' }} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(100,220,160,0.9)' }}>{p.processEnd}</span>
                        </div>
                    </motion.div>

                    {/* Deliverables */}
                    <div style={{ marginTop: 80 }}>
                        <div style={{ textAlign: 'center', marginBottom: 36 }}>
                            <motion.h3 initial={{ opacity: 0, y: 20 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
                                style={{ fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.03em' }}>
                                {p.deliverablesTitle}
                            </motion.h3>
                            <motion.p initial={{ opacity: 0 }} animate={processInView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
                                style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)' }}>
                                {p.deliverablesSubtitle}
                            </motion.p>
                        </div>
                        <div className="pilot-deliverables-grid" style={{ display: 'grid', gap: 12 }}>
                            {p.deliverables.map((d, i) => {
                                const sc = STEP_COLORS[i % 4]
                                return (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -16 }} animate={processInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.58 + i * 0.07 }}
                                        whileHover={{ x: 6 }}
                                        style={{ padding: '16px 20px', borderRadius: 16, background: sc.bg, border: `1px solid ${sc.border}`, backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: 14, willChange: 'transform' }}>
                                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: sc.color, boxShadow: `0 0 8px ${sc.color}80`, flexShrink: 0 }} />
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{d.label}</div>
                                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{d.sub}</div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                RESULTS — large metrics + testimonial
            ══════════════════════════════════════════════════════ */}
            <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} ref={resultsRef}>
                <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 1000, height: 500, background: 'radial-gradient(ellipse,rgba(1,115,211,0.08) 0%,transparent 65%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 60 }}>
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={resultsInView ? { opacity: 1, y: 0 } : {}}
                            className="section-label" style={{ margin: '0 auto 18px' }}>
                            RESULTS — 30 DAYS POST-LAUNCH
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={resultsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                            style={{ fontSize: 'clamp(28px,3.8vw,52px)', letterSpacing: '-0.04em', marginBottom: 14 }}>
                            {p.resultsTitle1}{' '}
                            <span style={{ color: '#0173D3' }}>{p.resultsTitle2}</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} animate={resultsInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                            style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', maxWidth: 420, margin: '0 auto' }}>
                            {p.resultsSubtitle}
                        </motion.p>
                    </div>

                    {/* Metric cards */}
                    <div className="pilot-results-grid" style={{ display: 'grid', gap: 16, marginBottom: 60 }}>
                        {p.results.map((r, i) => {
                            const sc = STEP_COLORS[i]
                            return (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 36, scale: 0.9 }} animate={resultsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                    transition={{ delay: i * 0.1, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                                    whileHover={{ y: -8, scale: 1.03 }}
                                    style={{ position: 'relative', willChange: 'transform' }}>
                                    <div style={{ position: 'absolute', inset: '-6px', borderRadius: 28, background: sc.bg, filter: 'blur(18px)', opacity: 0.6, pointerEvents: 'none' }} />
                                    <div style={{ position: 'relative', zIndex: 1, padding: '36px 20px', textAlign: 'center', background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: 24, boxShadow: '0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)', backdropFilter: 'blur(14px)', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 2, background: `linear-gradient(90deg,transparent,${sc.color},transparent)` }} />
                                        <div style={{ fontSize: r.stat.length > 5 ? 34 : 44, fontWeight: 900, lineHeight: 1, marginBottom: 10, color: sc.color, filter: `drop-shadow(0 0 24px ${sc.color}80)`, letterSpacing: '-0.03em' }}>{r.stat}</div>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.09em' }}>{r.label}</div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Testimonial spotlight */}
                    <motion.div initial={{ opacity: 0, y: 32 }} animate={resultsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.48, duration: 0.9 }}
                        style={{ borderRadius: 28, overflow: 'hidden', position: 'relative', background: 'rgba(5,5,13,0.8)', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 12px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
                        {/* Top accent */}
                        <div style={{ height: 3, background: 'linear-gradient(90deg,#0173D3,rgba(139,92,246,0.8),rgba(16,185,129,0.6))', opacity: 0.9 }} />

                        <div style={{ padding: '44px 48px' }}>
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
                                    <img src="/globus-logo.svg" alt="Globus" style={{ width: 40, height: 'auto', display: 'block' }} />
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Globus</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>German Retail Chain</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 50, background: 'rgba(34,197,94,0.09)', border: '1px solid rgba(34,197,94,0.22)', fontSize: 12, fontWeight: 700, color: 'rgba(34,197,94,0.9)' }}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    Verified Client
                                </div>
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
                                    {[...Array(5)].map((_, i) => (
                                        <motion.span key={i} initial={{ scale: 0, opacity: 0 }} animate={resultsInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.6 + i * 0.08, type: 'spring', bounce: 0.6 }}
                                            style={{ fontSize: 20, color: '#fbbf24', filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.5))' }}>★</motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Quote + thumbnail */}
                            <div className="pilot-testimonial-grid" style={{ display: 'grid', gap: 40, alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: 64, lineHeight: 0.6, color: 'rgba(1,115,211,0.2)', fontFamily: 'Georgia,serif', marginBottom: 16, userSelect: 'none' }}>&ldquo;</div>
                                    <p style={{ fontSize: 18, lineHeight: 1.85, color: 'rgba(255,255,255,0.82)', fontStyle: 'italic', marginBottom: 24, maxWidth: 680 }}>
                                        prodone.ai delivered our entire Q4 campaign in{' '}
                                        <strong style={{ color: '#fff', fontStyle: 'normal' }}>3 days</strong> — something that would have taken our traditional agency{' '}
                                        <strong style={{ color: '#fff', fontStyle: 'normal' }}>6 weeks</strong>. The AI-generated ads outperformed everything we've run before, achieving{' '}
                                        <strong style={{ color: '#34d399', fontStyle: 'normal' }}>+340% organic reach</strong> and an{' '}
                                        <strong style={{ color: '#60a5fa', fontStyle: 'normal' }}>8.7% CTR</strong>. We are now in a new era of content production.
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(1,115,211,0.15)', border: '1px solid rgba(1,115,211,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#60a5fa' }}>M</div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Marketing Director</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>Globus GmbH &amp; Co. KG · Frankfurt, Germany</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Video thumbnail */}
                                <div style={{ flexShrink: 0, width: 130, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(1,115,211,0.3)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', position: 'relative', aspectRatio: '9/16', background: '#000' }}>
                                    <video src="/globus-ad.mp4" muted loop playsInline autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 50%)' }} />
                                    <div style={{ position: 'absolute', top: 8, left: 8, padding: '3px 7px', borderRadius: 50, background: 'rgba(1,115,211,0.85)', fontSize: 8, fontWeight: 800, color: '#fff', letterSpacing: '0.07em' }}>AI AD</div>
                                </div>
                            </div>

                            {/* Bottom metrics strip */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, marginTop: 36, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                                {HERO_METRICS.map((m, i) => (
                                    <div key={i} style={{ padding: '18px 14px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                                        <div style={{ fontSize: 22, fontWeight: 900, color: m.color, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6, filter: `drop-shadow(0 0 8px ${m.color}60)` }}>{m.v}</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{m.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                CHATBOT DEMO
            ══════════════════════════════════════════════════════ */}
            <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} ref={chatRef}>
                <div style={{ position: 'absolute', top: '30%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle,rgba(1,115,211,0.10) 0%,transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="pilot-chat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

                        {/* Left — copy */}
                        <motion.div initial={{ opacity: 0, x: -40 }} animate={chatInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}>
                            <div className="section-label" style={{ marginBottom: 24 }}>AI CHATBOT DEMO</div>
                            <h2 style={{ fontSize: 'clamp(26px,3.5vw,46px)', letterSpacing: '-0.04em', marginBottom: 20, lineHeight: 1.1 }}>
                                Talk to Our{' '}
                                <span style={{ color: '#0173D3' }}>AI Assistant</span>
                            </h2>
                            <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', marginBottom: 36 }}>
                                This is a <strong style={{ color: '#fff' }}>live demo</strong> of the kind of AI chatbot we build for our clients.
                                Ask it anything about our services, pricing, or how we can help your business.
                            </p>

                            {[
                                { color: '#60a5fa', bg: 'rgba(1,115,211,0.10)', border: 'rgba(1,115,211,0.22)', title: 'Instant Responses', sub: 'No wait time, no human needed' },
                                { color: '#34d399', bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.22)', title: 'Context-Aware AI', sub: 'Understands nuanced questions' },
                                { color: '#c4b5fd', bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.22)', title: 'Multilingual', sub: 'English & German by default' },
                                { color: '#fbbf24', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.22)', title: 'CRM Integration', sub: 'Connects to your existing tools' },
                            ].map((f, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={chatInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}
                                    style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 18 }}>
                                    <div style={{ width: 38, height: 38, borderRadius: 11, background: f.bg, border: `1px solid ${f.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: f.color, boxShadow: `0 0 8px ${f.color}80` }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{f.title}</div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>{f.sub}</div>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div initial={{ opacity: 0, y: 16 }} animate={chatInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65 }}>
                                <button className="btn-primary" style={{ fontSize: 14, padding: '14px 28px', borderRadius: 14, marginTop: 8 }}>
                                    Get This for Your Business →
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Right — chatbot */}
                        <motion.div initial={{ opacity: 0, x: 40, scale: 0.96 }} animate={chatInView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ duration: 1, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}>
                            <DemoChatbot />
                        </motion.div>
                    </div>
                </div>
            </section>

            <CTABlock />

            <style>{`
                @media (min-width: 961px) {
                    .pilot-deliverables-grid { grid-template-columns: repeat(3,1fr); }
                    .pilot-results-grid { grid-template-columns: repeat(4,1fr); }
                    .pilot-testimonial-grid { grid-template-columns: 1fr auto; }
                }
                @media (max-width: 960px) {
                    .pilot-hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
                    .pilot-chat-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
                    .pilot-steps-grid { grid-template-columns: 1fr 1fr !important; }
                    .pilot-deliverables-grid { grid-template-columns: 1fr; }
                    .pilot-results-grid { grid-template-columns: 1fr 1fr; }
                    .pilot-testimonial-grid { grid-template-columns: 1fr; }
                }
                @media (max-width: 600px) {
                    .pilot-results-grid { grid-template-columns: 1fr; }
                    .pilot-steps-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </motion.main>
    )
}
