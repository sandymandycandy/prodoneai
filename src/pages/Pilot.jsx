import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import CTABlock from '../components/CTABlock'

/* ─── Static visual config ───────────────────────────── */
const stepColors = [
    { color: 'rgba(160,120,255,1)', glow: 'rgba(140,100,255,0.4)', bg: 'rgba(140,100,255,0.08)', icon: '📋' },
    { color: 'rgba(80,160,255,1)', glow: 'rgba(60,140,255,0.4)', bg: 'rgba(60,140,255,0.08)', icon: '🎨' },
    { color: 'rgba(0,210,180,1)', glow: 'rgba(0,190,160,0.4)', bg: 'rgba(0,190,160,0.08)', icon: '🎬' },
    { color: 'rgba(255,180,60,1)', glow: 'rgba(255,160,40,0.4)', bg: 'rgba(255,160,40,0.08)', icon: '🚀' },
]
const resultColors = [
    { icon: '📈', color: 'rgba(160,120,255,1)', glow: 'rgba(140,100,255,0.3)', bg: 'rgba(140,100,255,0.1)' },
    { icon: '🎯', color: 'rgba(80,160,255,1)', glow: 'rgba(60,140,255,0.3)', bg: 'rgba(60,140,255,0.1)' },
    { icon: '⚡', color: 'rgba(0,210,180,1)', glow: 'rgba(0,190,160,0.3)', bg: 'rgba(0,190,160,0.1)' },
    { icon: '💰', color: 'rgba(255,180,60,1)', glow: 'rgba(255,160,40,0.3)', bg: 'rgba(255,160,40,0.1)' },
]
const deliverableColors = [
    { icon: '🎬', color: 'rgba(160,120,255,0.12)', border: 'rgba(160,120,255,0.22)' },
    { icon: '📋', color: 'rgba(80,160,255,0.12)', border: 'rgba(80,160,255,0.22)' },
    { icon: '🎵', color: 'rgba(0,210,180,0.12)', border: 'rgba(0,210,180,0.22)' },
    { icon: '📦', color: 'rgba(255,180,60,0.12)', border: 'rgba(255,180,60,0.22)' },
    { icon: '📊', color: 'rgba(255,100,100,0.12)', border: 'rgba(255,100,100,0.22)' },
    { icon: '♻️', color: 'rgba(0,200,140,0.12)', border: 'rgba(0,200,140,0.22)' },
]
const compareIcons = ['⏱️', '💸', '🎯', '📣']
const compareDelta = ['-95%', '-70%', '+625%', '+340%']

/* ─── Demo chatbot conversations ────────────────────── */
const DEMO_FLOWS = [
    {
        trigger: "What's included in the free prototype?",
        reply: "Great question! 🎉 Your free 3-day prototype includes:\n\n✅ Storyboard or concept paper (Day 1)\n✅ First animated / functional version (Day 2–3)\n✅ Up to 2 feedback rounds\n✅ 1 final format (MP4 15s or web app demo)\n✅ 60-min briefing call + scope definition\n\nNo contract, no hidden costs. Completely free.",
    },
    {
        trigger: "How fast can you deliver?",
        reply: "⚡ Speed is our superpower:\n\n• AI Animation Ads → Prototype in **3 Days**\n• AI Chatbots / Agents → Live in **5–10 Days**\n• Custom Web Apps → MVP in **2–4 Weeks**\n\nWe run dual-continent sprints (🇩🇪 Germany + 🇮🇳 India) so work never stops — even overnight.",
    },
    {
        trigger: "What does full production cost?",
        reply: "💡 Production pricing starts at:\n\n• AI Animation Ad (3 variants, all formats) → from **€5,000**\n• AI Agent / Chatbot (full setup) → from **€8,000**\n• Custom Web App / MVP → from **€12,000**\n\nAll projects start with a **free prototype** — you only invest when you're 100% happy.",
    },
    {
        trigger: "Can I see a real case study?",
        reply: "Absolutely! 📊 Here's our top result:\n\n**Large German Retailer — Q4 Campaign**\n• +340% organic reach\n• 8.7% Ad CTR (vs. 1.2% industry avg)\n• –70% production cost vs. traditional agency\n• Delivered in **3 days**\n\nYou're viewing that exact case study right now! 🔥",
    },
    {
        trigger: "Do you work with agencies?",
        reply: "Yes! 🤝 We work as a **white-label AI partner** for many agencies.\n\n✅ Your branding, our AI infrastructure\n✅ NDA available on request\n✅ Discreet & fast turnaround\n✅ Suitable for video ads, chatbots & apps\n\nAgencies typically re-sell our output at a 2–3× margin. Want to discuss a white-label setup?",
    },
    {
        trigger: "What technology do you use?",
        reply: "🛠️ Our AI tech stack includes:\n\n• **Video production** → Custom AI animation pipelines + motion graphics\n• **Chatbots / Agents** → GPT-4, Claude, RAG with vector DBs\n• **Web Apps** → React, Next.js, Node.js, Supabase\n• **Integrations** → CRM, Zapier, Make, REST APIs\n\nAll secure, GDPR-compliant, and hosted in Germany or EU.",
    },
    {
        trigger: "Which languages do you support?",
        reply: "🌐 We work in **English and German** natively.\n\nOur core market is DACH (Germany, Austria, Switzerland), but we've delivered projects for clients across the UK, USA, and India too.\n\nNeed content in another language? We can usually accommodate — just let us know during the briefing call.",
    },
    {
        trigger: "How is prodone.ai different?",
        reply: "🚀 Great question! Here's what makes us different:\n\n**Traditional agency** → 6–12 weeks, €20k+, slow feedback loops\n\n**prodone.ai** → 3-day free prototype, then production in days — not months.\n\nWe combine AI infrastructure with dual-continent sprint teams to deliver at a speed no traditional agency can match. And you only pay after you see results. 💪",
    },
]


/* ─── Embedded Demo Chatbot ─────────────────────────── */
function DemoChatbot() {
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hi! 👋 I'm the prodone.ai demo assistant.\n\nAsk me anything about our services, pricing, or how we work. Or pick a quick question below 👇" }
    ])
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const [selectedFlow, setSelectedFlow] = useState(null)
    const bottomRef = useRef(null)
    const messagesRef = useRef(null)

    // Scroll only within the chat container — NOT the whole page
    const scrollBottom = () => setTimeout(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, 80)

    const sendMessage = (text) => {
        if (!text.trim() || typing) return
        setMessages(prev => [...prev, { role: 'user', text }])
        setInput('')
        setTyping(true)
        scrollBottom()

        // find best matching flow or fallback
        const match = DEMO_FLOWS.find(f =>
            f.trigger.toLowerCase().split(' ').some(w => text.toLowerCase().includes(w) && w.length > 3)
        ) || DEMO_FLOWS[Math.floor(Math.random() * DEMO_FLOWS.length)]

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: match.reply }])
            setTyping(false)
            scrollBottom()
        }, 1100 + Math.random() * 600)
    }

    const formatText = (text) => {
        return text.split('\n').map((line, i) => {
            const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            return <div key={i} style={{ minHeight: line === '' ? 8 : 'auto' }} dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }} />
        })
    }

    const chipCategories = [
        { label: '💰 Pricing', trigger: "What does full production cost?" },
        { label: '⚡ Speed', trigger: "How fast can you deliver?" },
        { label: '🎁 Free Prototype', trigger: "What's included in the free prototype?" },
        { label: '📊 Case Study', trigger: "Can I see a real case study?" },
        { label: '🤝 Agencies', trigger: "Do you work with agencies?" },
        { label: '🛠️ Tech Stack', trigger: "What technology do you use?" },
        { label: '🌐 Languages', trigger: "Which languages do you support?" },
        { label: '🚀 Why prodone?', trigger: "How is prodone.ai different?" },
    ]

    return (
        <div style={{
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'linear-gradient(180deg, rgba(14,14,24,0.98) 0%, rgba(8,8,16,0.99) 100%)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column',
            height: 580, maxHeight: '72vh',
            position: 'relative', overflow: 'hidden',
            width: '100%',
        }}>
            {/* Top glow line */}
            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(140,100,255,0.6),transparent)', zIndex: 10 }} />

            {/* ── Header ── */}
            <div style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, rgba(140,100,255,0.08) 0%, rgba(80,140,255,0.05) 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', gap: 12,
                flexShrink: 0,
            }}>
                {/* Avatar */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                        width: 42, height: 42, borderRadius: 13,
                        background: 'linear-gradient(135deg, rgba(140,100,255,0.4), rgba(80,140,255,0.3))',
                        border: '1px solid rgba(140,100,255,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                        boxShadow: '0 0 16px rgba(120,80,255,0.25)',
                    }}>🤖</div>
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ position: 'absolute', bottom: 2, right: 2, width: 9, height: 9, borderRadius: '50%', background: '#22c55e', border: '2px solid rgba(8,8,16,0.99)', boxShadow: '0 0 8px rgba(34,197,94,0.8)' }}
                    />
                </div>

                {/* Name + status */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Aria — prodone.ai</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                        <span style={{ fontSize: 10, color: 'rgba(34,197,94,0.9)', fontWeight: 600 }}>● Online</span>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>·</span>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Demo · No login required</span>
                    </div>
                </div>

                {/* macOS dots */}
                <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                        <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.75 }} />
                    ))}
                </div>
            </div>

            {/* ── Messages area ── */}
            <div ref={messagesRef} style={{
                flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
                display: 'flex', flexDirection: 'column', gap: 12,
                scrollbarWidth: 'none', minHeight: 0,
            }}>
                {messages.map((m, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}
                    >
                        {m.role === 'bot' && (
                            <div style={{ width: 28, height: 28, borderRadius: 9, flexShrink: 0, background: 'linear-gradient(135deg, rgba(140,100,255,0.25), rgba(80,140,255,0.2))', border: '1px solid rgba(140,100,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🤖</div>
                        )}
                        <div style={{
                            maxWidth: '76%',
                            padding: m.role === 'user' ? '10px 14px' : '12px 16px',
                            borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                            background: m.role === 'user'
                                ? 'linear-gradient(135deg, rgba(140,100,255,0.9), rgba(80,140,255,0.9))'
                                : 'rgba(255,255,255,0.05)',
                            border: m.role === 'user' ? '1px solid rgba(140,100,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                            fontSize: 13, lineHeight: 1.65,
                            color: m.role === 'user' ? '#fff' : 'rgba(255,255,255,0.85)',
                            boxShadow: m.role === 'user'
                                ? '0 4px 20px rgba(120,80,255,0.25)'
                                : '0 2px 8px rgba(0,0,0,0.25)',
                            fontFamily: 'var(--font-body)',
                        }}>
                            {formatText(m.text)}
                        </div>
                        {m.role === 'user' && (
                            <div style={{ width: 28, height: 28, borderRadius: 9, flexShrink: 0, background: 'linear-gradient(135deg, rgba(140,100,255,0.3), rgba(80,140,255,0.3))', border: '1px solid rgba(140,100,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff', fontWeight: 700 }}>U</div>
                        )}
                    </motion.div>
                ))}

                {/* Typing indicator */}
                {typing && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 9, flexShrink: 0, background: 'linear-gradient(135deg, rgba(140,100,255,0.25), rgba(80,140,255,0.2))', border: '1px solid rgba(140,100,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🤖</div>
                        <div style={{ padding: '10px 16px', borderRadius: '4px 18px 18px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 5, alignItems: 'center' }}>
                            {[0, 1, 2].map(i => (
                                <motion.div key={i} animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.65, delay: i * 0.15, repeat: Infinity }}
                                    style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(160,120,255,0.8)' }} />
                            ))}
                        </div>
                    </motion.div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* ── Quick chips ── */}
            <div style={{
                padding: '8px 16px 6px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.015)',
            }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Quick questions</div>
                <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
                    {chipCategories.map((c, i) => (
                        <motion.button key={i}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            onClick={() => sendMessage(c.trigger)}
                            style={{
                                flexShrink: 0, padding: '5px 12px', borderRadius: 50, cursor: 'pointer',
                                background: 'rgba(140,100,255,0.08)', border: '1px solid rgba(140,100,255,0.2)',
                                color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: 600,
                                whiteSpace: 'nowrap', fontFamily: 'var(--font)',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(140,100,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(140,100,255,0.45)'; e.currentTarget.style.color = '#fff' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(140,100,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(140,100,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
                        >
                            {c.label}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* ── Input bar ── */}
            <div style={{ padding: '10px 16px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                <div style={{
                    display: 'flex', gap: 8, alignItems: 'center',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 14, padding: '8px 8px 8px 14px',
                }}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                        placeholder="Type a question or pick one above…"
                        style={{
                            flex: 1, background: 'transparent', border: 'none', outline: 'none',
                            color: '#fff', fontSize: 13, fontFamily: 'var(--font-body)',
                            caretColor: 'rgba(140,100,255,1)',
                        }}
                        onFocus={e => e.currentTarget.parentElement.style.borderColor = 'rgba(140,100,255,0.4)'}
                        onBlur={e => e.currentTarget.parentElement.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                    <motion.button
                        whileHover={input.trim() ? { scale: 1.08 } : {}}
                        whileTap={input.trim() ? { scale: 0.92 } : {}}
                        onClick={() => sendMessage(input)}
                        style={{
                            width: 36, height: 36, borderRadius: 10, border: 'none', cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0,
                            background: input.trim() ? 'linear-gradient(135deg, rgba(140,100,255,1), rgba(80,140,255,1))' : 'rgba(255,255,255,0.06)',
                            color: input.trim() ? '#fff' : 'rgba(255,255,255,0.25)',
                            fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: input.trim() ? '0 4px 16px rgba(120,80,255,0.4)' : 'none',
                            transition: 'all 0.25s',
                        }}>↑</motion.button>
                </div>
                <div style={{ textAlign: 'center', marginTop: 7, fontSize: 9.5, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    🔒 Demo · Real AI deployed for your project
                </div>
            </div>
        </div>
    )
}

/* ─── PAGE ───────────────────────────────────────────── */
export default function Pilot() {
    useEffect(() => { window.scrollTo(0, 0) }, [])
    const { t, lang, translations } = useLanguage()
    const p = translations[lang].pilot

    const heroRef = useRef(null); const heroInView = useInView(heroRef, { once: true })
    const processRef = useRef(null); const processInView = useInView(processRef, { once: true, margin: '-60px' })
    const resultsRef = useRef(null); const resultsInView = useInView(resultsRef, { once: true })
    const chatRef = useRef(null); const chatInView = useInView(chatRef, { once: true, margin: '-60px' })

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

            {/* ══ HERO ══════════════════════════════════════════════ */}
            <section style={{ paddingTop: 120, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
                <div className="grid-overlay" style={{ opacity: 0.22 }} />
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(120,80,255,0.16) 0%, transparent 65%)', filter: 'blur(30px)', pointerEvents: 'none', animation: 'orbPulse 10s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', bottom: '0%', left: '-8%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,180,255,0.1) 0%, transparent 65%)', filter: 'blur(30px)', pointerEvents: 'none', animation: 'orbPulse 13s ease-in-out infinite 3s' }} />

                <div className="container" ref={heroRef} style={{ position: 'relative', zIndex: 1 }}>
                    {/* Breadcrumb */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 32 }}>
                        <a href="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>prodone.ai</a>
                        <span>›</span><span>{p.breadcrumb}</span>
                    </motion.div>

                    <div className="pilot-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
                        {/* LEFT */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                className="section-label" style={{ marginBottom: 28 }}>{p.heroLabel}</motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.9 }}
                                style={{ fontSize: 'clamp(30px, 4.2vw, 56px)', marginBottom: 22, lineHeight: 1.08, letterSpacing: '-0.04em' }}>
                                {p.heroTitle1}{' '}
                                <span style={{ background: 'linear-gradient(135deg,rgba(160,120,255,1) 0%,rgba(80,180,255,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {p.heroTitle2}
                                </span>{' '}{p.heroTitle3}
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.22 }}
                                style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>
                                {p.heroDesc} <strong style={{ color: '#fff' }}>{p.heroDescBold}</strong>{p.heroDescEnd}
                            </motion.p>

                            {/* Context chips */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.32 }}
                                style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                                {p.chips.map(([icon, text]) => (
                                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 50, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                                        <span>{icon}</span><span>{text}</span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Mini stats row */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.42 }}
                                style={{ display: 'flex', gap: 10 }}>
                                {p.results.map((r, i) => (
                                    <div key={i} style={{ flex: 1, padding: '14px 10px', borderRadius: 16, textAlign: 'center', background: resultColors[i].bg, border: `1px solid ${resultColors[i].glow}`, backdropFilter: 'blur(10px)' }}>
                                        <div style={{ fontSize: 16, fontWeight: 900, color: resultColors[i].color, letterSpacing: '-0.02em', lineHeight: 1 }}>{r.stat}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* RIGHT — Globus AI Video */}
                        <motion.div initial={{ opacity: 0, x: 60, scale: 0.93 }} animate={heroInView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ delay: 0.28, duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
                            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            {/* Glow blob behind phone */}
                            <div style={{ position: 'absolute', top: '15%', left: '10%', width: '80%', height: '70%', background: 'rgba(120,80,255,0.25)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none', animation: 'orbPulse 6s ease-in-out infinite' }} />

                            {/* Phone shell */}
                            <div style={{ position: 'relative', zIndex: 1, width: 280, borderRadius: 44, background: 'linear-gradient(160deg, #1a1a2e 0%, #0d0d18 100%)', border: '2px solid rgba(255,255,255,0.14)', boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.14)', padding: '14px 14px', overflow: 'visible' }}>

                                {/* Notch */}
                                <div style={{ width: 72, height: 22, background: '#0d0d18', borderRadius: 12, margin: '0 auto 10px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                                    <div style={{ width: 28, height: 4, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }} />
                                </div>

                                {/* Video */}
                                <div style={{ borderRadius: 28, overflow: 'hidden', position: 'relative', aspectRatio: '9/16', background: '#000' }}>
                                    <video
                                        src="/globus-ad.mp4"
                                        autoPlay muted loop playsInline
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                    {/* Subtle overlay gradient at top & bottom */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), transparent)', pointerEvents: 'none' }} />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)', pointerEvents: 'none' }} />

                                    {/* Client badge top-left */}
                                    <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 7, padding: '5px 10px', borderRadius: 50, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                                        <img src="/globus-logo.svg" alt="Globus Logo" style={{ width: 28, height: 'auto', display: 'block' }} />
                                        <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>Globus</span>
                                    </div>

                                    {/* AI label top-right */}
                                    <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 9px', borderRadius: 50, background: 'rgba(140,100,255,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(140,100,255,0.5)', fontSize: 9, fontWeight: 800, color: '#fff', letterSpacing: '0.06em' }}>AI AD</div>
                                </div>

                                {/* Home indicator */}
                                <div style={{ width: 60, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 3, margin: '10px auto 0' }} />
                            </div>

                            {/* Floating stat — Reach */}
                            <motion.div
                                animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ position: 'absolute', top: '8%', right: '-8%', padding: '10px 16px', borderRadius: 16, background: 'rgba(0,200,140,0.12)', border: '1px solid rgba(0,200,140,0.3)', backdropFilter: 'blur(14px)', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                                <div style={{ fontSize: 20, fontWeight: 900, color: 'rgba(80,220,160,1)', lineHeight: 1 }}>+340%</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Reach</div>
                            </motion.div>

                            {/* Floating stat — Delivery */}
                            <motion.div
                                animate={{ y: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                                style={{ position: 'absolute', bottom: '18%', right: '-10%', padding: '10px 16px', borderRadius: 16, background: 'rgba(140,100,255,0.12)', border: '1px solid rgba(140,100,255,0.3)', backdropFilter: 'blur(14px)', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                                <div style={{ fontSize: 20, fontWeight: 900, color: 'rgba(180,140,255,1)', lineHeight: 1 }}>3 Days</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Delivered</div>
                            </motion.div>

                            {/* Floating stat — Cost */}
                            <motion.div
                                animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
                                style={{ position: 'absolute', bottom: '12%', left: '-8%', padding: '10px 16px', borderRadius: 16, background: 'rgba(255,180,60,0.1)', border: '1px solid rgba(255,180,60,0.28)', backdropFilter: 'blur(14px)', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                                <div style={{ fontSize: 20, fontWeight: 900, color: 'rgba(255,200,80,1)', lineHeight: 1 }}>−70%</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cost</div>
                            </motion.div>

                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ══ PROCESS TIMELINE ════════════════════════════════ */}
            <section style={{ padding: '90px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} ref={processRef}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} className="section-label" style={{ margin: '0 auto 18px' }}>
                            {p.processLabel}
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                            style={{ fontSize: 'clamp(24px, 3.2vw, 44px)', letterSpacing: '-0.035em' }}>
                            {p.processTitle1}{' '}
                            <span style={{ background: 'linear-gradient(135deg,rgba(0,210,180,1),rgba(80,160,255,1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {p.processTitle2}
                            </span>
                        </motion.h2>
                    </div>

                    <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
                        <div style={{ position: 'absolute', left: 28, top: 48, bottom: 48, width: 2, background: 'linear-gradient(180deg, rgba(160,120,255,0.4), rgba(80,160,255,0.4), rgba(0,210,180,0.4), rgba(255,180,60,0.4))', borderRadius: 2, pointerEvents: 'none' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            {p.processSteps.map((item, i) => {
                                const vc = stepColors[i]
                                return (
                                    <motion.div key={i} initial={{ opacity: 0, x: -40 }} animate={processInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 + i * 0.12, duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
                                        style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                                        <div style={{ flexShrink: 0, width: 58, height: 58, borderRadius: 18, background: vc.bg, border: `1.5px solid ${vc.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, zIndex: 1, boxShadow: `0 0 24px ${vc.glow}`, position: 'relative' }}>
                                            {vc.icon}
                                        </div>
                                        <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.25 }}
                                            style={{ flex: 1, padding: '20px 26px', borderRadius: 20, background: `linear-gradient(135deg, ${vc.bg}, rgba(255,255,255,0.02))`, border: `1px solid ${vc.color.replace('1)', '0.18)')}`, backdropFilter: 'blur(10px)', boxShadow: `0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)`, willChange: 'transform' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <span style={{ fontSize: 10, fontWeight: 800, color: vc.color, letterSpacing: '0.12em' }}>STEP {String(i + 1).padStart(2, '0')}</span>
                                                    <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{item.title}</span>
                                                </div>
                                                <span style={{ fontSize: 11, color: vc.color, padding: '4px 12px', borderRadius: 50, background: vc.bg, border: `1px solid ${vc.color.replace('1)', '0.2)')}` }}>{item.tag}</span>
                                            </div>
                                            <p style={{ fontSize: 13.5, lineHeight: 1.75, color: 'rgba(255,255,255,0.42)', margin: 0 }}>{item.desc}</p>
                                        </motion.div>
                                    </motion.div>
                                )
                            })}
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={processInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.75, type: 'spring', bounce: 0.4 }}
                            style={{ marginTop: 24, marginLeft: 82, padding: '14px 22px', borderRadius: 14, background: 'rgba(100,220,160,0.07)', border: '1px solid rgba(100,220,160,0.2)', backdropFilter: 'blur(10px)', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 16 }}>🟢</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(100,220,160,0.9)' }}>{p.processEnd}</span>
                        </motion.div>
                    </div>

                    {/* Deliverables */}
                    <div style={{ marginTop: 72 }}>
                        <motion.h3 initial={{ opacity: 0, y: 20 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
                            style={{ textAlign: 'center', fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{p.deliverablesTitle}</motion.h3>
                        <motion.p initial={{ opacity: 0 }} animate={processInView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
                            style={{ textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.38)', marginBottom: 36 }}>{p.deliverablesSubtitle}</motion.p>
                        <div className="pilot-deliverables-grid" style={{ display: 'grid', gap: 14 }}>
                            {p.deliverables.map((d, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={processInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ delay: 0.6 + i * 0.07 }} whileHover={{ y: -4, scale: 1.02 }}
                                    style={{ padding: '20px 18px', borderRadius: 18, background: deliverableColors[i].color, border: `1px solid ${deliverableColors[i].border}`, backdropFilter: 'blur(12px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 14, willChange: 'transform' }}>
                                    <div style={{ fontSize: 26, flexShrink: 0 }}>{deliverableColors[i].icon}</div>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{d.label}</div>
                                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{d.sub}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ RESULTS ═════════════════════════════════════════ */}
            <section style={{ padding: '90px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} ref={resultsRef}>
                <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 1000, height: 500, background: 'radial-gradient(ellipse, rgba(100,60,240,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={resultsInView ? { opacity: 1, y: 0 } : {}} className="section-label" style={{ margin: '0 auto 18px' }}>{p.resultsLabel}</motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={resultsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                            style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', letterSpacing: '-0.035em' }}>
                            {p.resultsTitle1}{' '}
                            <span style={{ background: 'linear-gradient(135deg,rgba(160,120,255,1),rgba(80,180,255,1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{p.resultsTitle2}</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} animate={resultsInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                            style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', marginTop: 12 }}>{p.resultsSubtitle}</motion.p>
                    </div>

                    <div className="pilot-results-grid" style={{ display: 'grid', gap: 18, marginBottom: 56 }}>
                        {p.results.map((r, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 32, scale: 0.9 }} animate={resultsInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ delay: i * 0.1, duration: 0.75 }} whileHover={{ y: -8, scale: 1.03 }} style={{ position: 'relative', willChange: 'transform' }}>
                                <div style={{ position: 'absolute', inset: '-8px', borderRadius: 28, background: resultColors[i].bg, filter: 'blur(20px)', opacity: 0.6, pointerEvents: 'none' }} />
                                <div style={{ position: 'relative', zIndex: 1, padding: '32px 20px', textAlign: 'center', background: `linear-gradient(160deg, ${resultColors[i].bg}, rgba(255,255,255,0.02))`, border: `1px solid ${resultColors[i].glow}`, borderRadius: 24, boxShadow: `0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)`, backdropFilter: 'blur(12px)', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: `linear-gradient(90deg,transparent,${resultColors[i].color},transparent)`, opacity: 0.4 }} />
                                    <div style={{ fontSize: 32, marginBottom: 12 }}>{resultColors[i].icon}</div>
                                    <div style={{ fontSize: r.stat.length > 4 ? 32 : 40, fontWeight: 900, lineHeight: 1, marginBottom: 8, color: resultColors[i].color, filter: `drop-shadow(0 0 20px ${resultColors[i].glow})` }}>{r.stat}</div>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ══ GLOBUS CLIENT SPOTLIGHT ══ */}
                    <motion.div initial={{ opacity: 0, y: 32 }} animate={resultsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.9 }}
                        style={{
                            borderRadius: 28, overflow: 'hidden', position: 'relative',
                            background: 'linear-gradient(135deg, rgba(230,57,70,0.06) 0%, rgba(120,80,255,0.08) 50%, rgba(40,120,255,0.05) 100%)',
                            border: '1px solid rgba(230,57,70,0.2)',
                            boxShadow: '0 8px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                        }}>
                        {/* Top accent line */}
                        <div style={{ height: 3, background: 'linear-gradient(90deg, #e63946, rgba(140,100,255,0.8), rgba(80,160,255,0.6))', opacity: 0.9 }} />
                        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(230,57,70,0.3),transparent)' }} />

                        <div style={{ padding: '40px 48px' }}>
                            {/* Header row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
                                {/* Globus Logo Badge */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                                    <img src="/globus-logo.svg" alt="Globus" style={{ width: 44, height: 'auto', display: 'block' }} />
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Globus</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>German Retail Chain</div>
                                    </div>
                                </div>

                                {/* Verified badge */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 50, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
                                    <span style={{ fontSize: 11, color: 'rgba(34,197,94,0.9)', fontWeight: 700 }}>✓ Verified Client</span>
                                </div>

                                {/* Stars */}
                                <div style={{ display: 'flex', gap: 3, marginLeft: 'auto' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <motion.span key={i} initial={{ scale: 0, opacity: 0 }} animate={resultsInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.6 + i * 0.08, type: 'spring', bounce: 0.6 }}
                                            style={{ fontSize: 20, color: '#fbbf24', filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.5))' }}>★</motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Quote + video thumbnail */}
                            <div className="pilot-testimonial-grid" style={{ display: 'grid', gap: 40, alignItems: 'center' }}>
                                <div>
                                    {/* Big quote mark */}
                                    <div style={{ fontSize: 72, lineHeight: 0.6, color: 'rgba(230,57,70,0.25)', fontFamily: 'Georgia, serif', marginBottom: 16, userSelect: 'none' }}>&ldquo;</div>
                                    <p style={{ fontSize: 18, lineHeight: 1.85, color: 'rgba(255,255,255,0.82)', fontStyle: 'italic', marginBottom: 24, maxWidth: 680 }}>
                                        prodone.ai delivered our entire Q4 campaign in <strong style={{ color: '#fff', fontStyle: 'normal' }}>3 days</strong> — something that would have taken our traditional agency <strong style={{ color: '#fff', fontStyle: 'normal' }}>6 weeks</strong>. The AI-generated ads outperformed everything we've run before, achieving <strong style={{ color: 'rgba(80,220,160,1)', fontStyle: 'normal' }}>+340% organic reach</strong> and an <strong style={{ color: 'rgba(80,220,160,1)', fontStyle: 'normal' }}>8.7% CTR</strong>. We are now in a new era of content production.
                                    </p>
                                    {/* Author */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, rgba(230,57,70,0.2), rgba(140,100,255,0.15))', border: '1px solid rgba(230,57,70,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: 'rgba(230,57,70,0.9)' }}>M</div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Marketing Director</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>Globus GmbH &amp; Co. KG &nbsp;·&nbsp; Frankfurt, Germany</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Video thumbnail */}
                                <div style={{ flexShrink: 0, width: 130, borderRadius: 20, overflow: 'hidden', border: '2px solid rgba(230,57,70,0.3)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', position: 'relative', aspectRatio: '9/16', background: '#000' }}>
                                    <video src="/globus-ad.mp4" muted loop playsInline autoPlay
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                                    <div style={{ position: 'absolute', top: 8, left: 8, padding: '3px 7px', borderRadius: 50, background: 'rgba(140,100,255,0.8)', fontSize: 8, fontWeight: 800, color: '#fff', letterSpacing: '0.06em' }}>AI AD</div>
                                </div>
                            </div>

                            {/* Metrics bar */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, marginTop: 32, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                                {[
                                    { stat: '+340%', label: 'Organic Reach', color: 'rgba(80,220,160,1)' },
                                    { stat: '8.7%', label: 'Ad CTR', color: 'rgba(140,100,255,1)' },
                                    { stat: '3 Days', label: 'Delivery Time', color: 'rgba(255,200,80,1)' },
                                    { stat: '−70%', label: 'Production Cost', color: 'rgba(80,160,255,1)' },
                                ].map((m, i) => (
                                    <div key={i} style={{ padding: '20px 16px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                                        <div style={{ fontSize: 22, fontWeight: 900, color: m.color, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6 }}>{m.stat}</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ CHATBOT DEMO ════════════════════════════════════ */}
            <section style={{ padding: '90px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} ref={chatRef}>
                <div style={{ position: 'absolute', top: '30%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(140,100,255,0.12) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,180,255,0.08) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="pilot-chat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

                        {/* LEFT — copy */}
                        <motion.div initial={{ opacity: 0, x: -40 }} animate={chatInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}>
                            <div className="section-label" style={{ marginBottom: 24 }}>🤖 AI CHATBOT DEMO</div>
                            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 46px)', letterSpacing: '-0.04em', marginBottom: 20, lineHeight: 1.1 }}>
                                Talk to Our{' '}
                                <span style={{ background: 'linear-gradient(135deg, rgba(160,120,255,1), rgba(80,180,255,1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    AI Assistant
                                </span>
                            </h2>
                            <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>
                                This is a <strong style={{ color: '#fff' }}>live demo</strong> of the kind of AI chatbot we build for our clients.
                                Ask it anything about our services, pricing, or how we can help your business.
                            </p>

                            {/* Features list */}
                            {[
                                { icon: '⚡', title: 'Instant Responses', sub: 'No wait time, no human needed' },
                                { icon: '🧠', title: 'Context-Aware', sub: 'Understands nuanced questions' },
                                { icon: '🌐', title: 'Multilingual', sub: 'English & German by default' },
                                { icon: '🔗', title: 'CRM Integration', sub: 'Connects to your existing tools' },
                            ].map((f, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={chatInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}
                                    style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 18 }}>
                                    <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(140,100,255,0.1)', border: '1px solid rgba(140,100,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{f.title}</div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>{f.sub}</div>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div initial={{ opacity: 0, y: 16 }} animate={chatInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}>
                                <a href="#offer">
                                    <button className="btn-primary" style={{ fontSize: 14, padding: '14px 28px', borderRadius: 50 }}>
                                        Get This for Your Business →
                                    </button>
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* RIGHT — chatbot */}
                        <motion.div initial={{ opacity: 0, x: 40, scale: 0.96 }} animate={chatInView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ duration: 1, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}>
                            <DemoChatbot />
                        </motion.div>
                    </div>
                </div>
            </section>

            <CTABlock />

            <style>{`
                @media (min-width: 961px) {
                    .pilot-deliverables-grid { grid-template-columns: repeat(3, 1fr); }
                    .pilot-results-grid { grid-template-columns: repeat(4, 1fr); }
                    .pilot-testimonial-grid { grid-template-columns: 1fr auto; }
                }
                @media (max-width: 960px) {
                    .pilot-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
                    .pilot-chat-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
                    .pilot-deliverables-grid { grid-template-columns: 1fr; }
                    .pilot-results-grid { grid-template-columns: 1fr 1fr; }
                    .pilot-testimonial-grid { grid-template-columns: 1fr; }
                    .pilot-testimonial-grid > div:last-child { margin: 0 auto; }
                }
                @media (max-width: 600px) {
                    .pilot-results-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </motion.main>
    )
}
