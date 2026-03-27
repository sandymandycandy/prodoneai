import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

/* ─── Conversation flows ─────────────────────────────── */
const FLOWS = {
    EN: {
        start: {
            msgs: [
                { delay: 400, text: "Hey 👋 I'm **Aria**, the prodone.ai assistant." },
                { delay: 1600, text: "What can I help you with today? Pick a topic or ask anything ↓" },
            ],
            choices: [
                '🎬 AI Video Ads',
                '🤖 AI Chatbot / Agent',
                '📱 Custom App or MVP',
                '📊 Analytics & Automation',
                '💰 Pricing & Budget',
                '⚡ How Fast Can You Deliver?',
                '🔗 Do You Work with Agencies?',
                '👀 Show Me a Case Study',
            ],
            next: {
                '🎬 AI Video Ads': 'industry',
                '🤖 AI Chatbot / Agent': 'industry',
                '📱 Custom App or MVP': 'industry',
                '📊 Analytics & Automation': 'industry',
                '💰 Pricing & Budget': 'pricing',
                '⚡ How Fast Can You Deliver?': 'speed',
                '🔗 Do You Work with Agencies?': 'agencies',
                '👀 Show Me a Case Study': 'pilot',
            },
            input: false,
        },
        pricing: {
            msgs: [{ delay: 700, text: "Great question 💡 Here's a quick overview:\n\n• **AI Animation Ad** (3 variants, all formats) → from **€5,000**\n• **AI Chatbot / Agent** (full setup) → from **€8,000**\n• **Custom Web App / MVP** → from **€12,000**\n\nAll projects start with a **free 3-day prototype** — you only invest when you love it. 🎯" }],
            choices: ['🚀 Start with Free Prototype', '💬 Ask Another Question'],
            next: { '🚀 Start with Free Prototype': 'collect_name', '💬 Ask Another Question': 'start' },
            input: false,
        },
        speed: {
            msgs: [{ delay: 700, text: "⚡ Speed is our superpower:\n\n• **AI Animation Ads** → Prototype in **3 Days**\n• **AI Chatbot / Agent** → Live in **5–10 Days**\n• **Custom Web App / MVP** → MVP in **2–4 Weeks**\n\nWe run **dual-continent sprints** (🇩🇪 Germany + 🇮🇳 India) so work never stops — even overnight." }],
            choices: ['🚀 Start with Free Prototype', '💬 Ask Another Question'],
            next: { '🚀 Start with Free Prototype': 'collect_name', '💬 Ask Another Question': 'start' },
            input: false,
        },
        agencies: {
            msgs: [{ delay: 700, text: "Absolutely! 🤝 We work with **digital agencies** as a white-label AI partner.\n\n✅ Your brand, our AI infrastructure\n✅ NDA available on request\n✅ Discreet & fast turnaround\n✅ Works for video ads, chatbots & apps\n\nMany agencies re-sell our work at 2–3× markup. Interested?" }],
            choices: ["🚀 Let's Talk", '💬 Ask Another Question'],
            next: { "🚀 Let's Talk": 'collect_name', '💬 Ask Another Question': 'start' },
            input: false,
        },
        industry: {
            msgs: [{ delay: 600, text: "Great choice! 🚀 What's your industry?" }],
            choices: ['🛒 E-Commerce / Retail', '🏥 Healthcare', '💰 Finance & Fintech', '🏭 B2B / SaaS', '🌍 Other'],
            next: 'size',
            input: false,
        },
        size: {
            msgs: [{ delay: 600, text: "Got it. How big is your team?" }],
            choices: ['1–10 people', '11–50 people', '51–200 people', '200+ people'],
            next: 'collect_name',
            input: false,
        },
        collect_name: {
            msgs: [{ delay: 600, text: "Perfect — sounds like a great fit for prodone.ai 🎯\n\nWhat's your **first name**?" }],
            choices: [],
            next: 'collect_email',
            input: true,
            storeAs: 'name',
        },
        collect_email: {
            msgs: [{ delay: 400, text: "Nice to meet you, **{name}**! 👋\n\nAnd your **work email** — so we can send you the prototype?" }],
            choices: [],
            next: 'done',
            input: true,
            storeAs: 'email',
        },
        done: {
            msgs: [
                { delay: 500, text: "✅ You're all set, **{name}**!" },
                { delay: 1800, text: "We'll send your **free prototype** to **{email}** within **2 hours** — usually faster. 🏎️\n\nOur team is in Frankfurt & Stuttgart. We're fast." },
            ],
            choices: ['👀 View case study', '💬 Got another question'],
            next: { '👀 View case study': 'pilot', '💬 Got another question': 'start' },
            input: false,
        },
        pilot: {
            msgs: [{ delay: 500, text: "Here's our live case study 📈\n\n**Large German Retailer — Q4 Campaign**\n• +340% organic reach\n• 8.7% Ad CTR (vs 1.2% avg)\n• –70% production cost\n• Delivered in **3 days**\n\nClick below to see the full breakdown." }],
            choices: ['🔗 Open Pilot Page', '💬 Ask Another Question'],
            next: { '🔗 Open Pilot Page': '__pilot__', '💬 Ask Another Question': 'start' },
            input: false,
        },
    },
    DE: {
        start: {
            msgs: [
                { delay: 400, text: "Hey 👋 Ich bin **Aria**, der prodone.ai Assistent." },
                { delay: 1600, text: "Womit kann ich Ihnen helfen? Wählen Sie ein Thema oder stellen Sie direkt eine Frage ↓" },
            ],
            choices: [
                '🎬 KI Video Ads',
                '🤖 KI Chatbot / Agent',
                '📱 Custom App oder MVP',
                '📊 Analytics & Automatisierung',
                '💰 Preise & Budget',
                '⚡ Wie schnell liefern Sie?',
                '🔗 Arbeiten Sie mit Agenturen?',
                '👀 Case Study zeigen',
            ],
            next: {
                '🎬 KI Video Ads': 'industry',
                '🤖 KI Chatbot / Agent': 'industry',
                '📱 Custom App oder MVP': 'industry',
                '📊 Analytics & Automatisierung': 'industry',
                '💰 Preise & Budget': 'pricing',
                '⚡ Wie schnell liefern Sie?': 'speed',
                '🔗 Arbeiten Sie mit Agenturen?': 'agencies',
                '👀 Case Study zeigen': 'pilot',
            },
            input: false,
        },
        pricing: {
            msgs: [{ delay: 700, text: "Gute Frage 💡 Hier eine schnelle Übersicht:\n\n• **KI Animationsanzeige** (3 Varianten, alle Formate) → ab **€5.000**\n• **KI Chatbot / Agent** (vollständig) → ab **€8.000**\n• **Custom Web App / MVP** → ab **€12.000**\n\nAlle Projekte starten mit einem **kostenlosen 3-Tage-Prototyp** — Sie investieren erst, wenn Sie begeistert sind. 🎯" }],
            choices: ['🚀 Kostenlosen Prototyp starten', '💬 Weitere Frage'],
            next: { '🚀 Kostenlosen Prototyp starten': 'collect_name', '💬 Weitere Frage': 'start' },
            input: false,
        },
        speed: {
            msgs: [{ delay: 700, text: "⚡ Geschwindigkeit ist unser Vorteil:\n\n• **KI Animationsanzeigen** → Prototyp in **3 Tagen**\n• **KI Chatbot / Agent** → Live in **5–10 Tagen**\n• **Custom Web App / MVP** → MVP in **2–4 Wochen**\n\nWir arbeiten in **Dual-Continent-Sprints** (🇩🇪 Deutschland + 🇮🇳 Indien) — auch nachts geht die Arbeit weiter." }],
            choices: ['🚀 Kostenlosen Prototyp starten', '💬 Weitere Frage'],
            next: { '🚀 Kostenlosen Prototyp starten': 'collect_name', '💬 Weitere Frage': 'start' },
            input: false,
        },
        agencies: {
            msgs: [{ delay: 700, text: "Absolut! 🤝 Wir arbeiten mit **Digitalagenturen** als White-Label KI-Partner.\n\n✅ Ihre Marke, unsere KI-Infrastruktur\n✅ NDA auf Anfrage\n✅ Diskret & schnell\n✅ Für Video Ads, Chatbots & Apps\n\nViele Agenturen verkaufen unsere Arbeit mit 2–3× Aufschlag weiter. Interesse?" }],
            choices: ['🚀 Jetzt sprechen', '💬 Weitere Frage'],
            next: { '🚀 Jetzt sprechen': 'collect_name', '💬 Weitere Frage': 'start' },
            input: false,
        },
        industry: {
            msgs: [{ delay: 600, text: "Gute Wahl! 🚀 In welcher Branche sind Sie tätig?" }],
            choices: ['🛒 E-Commerce / Handel', '🏥 Gesundheitswesen', '💰 Finance & Fintech', '🏭 B2B / SaaS', '🌍 Andere'],
            next: 'size',
            input: false,
        },
        size: {
            msgs: [{ delay: 600, text: "Verstanden. Wie groß ist Ihr Team?" }],
            choices: ['1–10 Personen', '11–50 Personen', '51–200 Personen', '200+ Personen'],
            next: 'collect_name',
            input: false,
        },
        collect_name: {
            msgs: [{ delay: 600, text: "Perfekt — klingt nach einer guten Lösung für prodone.ai 🎯\n\nWie heißen Sie?" }],
            choices: [],
            next: 'collect_email',
            input: true,
            storeAs: 'name',
        },
        collect_email: {
            msgs: [{ delay: 400, text: "Schön, Sie kennenzulernen, **{name}**! 👋\n\nIhre **geschäftliche E-Mail** — damit wir Ihnen den Prototypen schicken können?" }],
            choices: [],
            next: 'done',
            input: true,
            storeAs: 'email',
        },
        done: {
            msgs: [
                { delay: 500, text: "✅ Alles eingetragen, **{name}**!" },
                { delay: 1800, text: "Wir senden Ihren **kostenlosen Prototypen** an **{email}** innerhalb von **2 Stunden** — meist schneller. 🏎️\n\nUnser Team ist in Frankfurt & Stuttgart. Wir sind schnell." },
            ],
            choices: ['👀 Case Study ansehen', '💬 Noch eine Frage'],
            next: { '👀 Case Study ansehen': 'pilot', '💬 Noch eine Frage': 'start' },
            input: false,
        },
        pilot: {
            msgs: [{ delay: 500, text: "Hier unsere Live Case Study 📈\n\n**Großer dt. Einzelhändler — Q4 Kampagne**\n• +340% organische Reichweite\n• 8,7% Ad CTR (vs. 1,2% Ø)\n• –70% Produktionskosten\n• Geliefert in **3 Tagen**\n\nKlicken Sie für den vollständigen Bericht." }],
            choices: ['🔗 Pilot-Seite öffnen', '💬 Weitere Frage'],
            next: { '🔗 Pilot-Seite öffnen': '__pilot__', '💬 Weitere Frage': 'start' },
            input: false,
        },
    },
}

/* ─── Render bold markdown **text** ─────────────────── */
function RichText({ text, userMsg }) {
    return (
        <span style={{ whiteSpace: 'pre-wrap' }}>
            {text.split('**').map((part, i) =>
                i % 2 === 1
                    ? <strong key={i} style={{ color: userMsg ? '#fff' : 'rgba(255,255,255,0.95)', fontWeight: 700 }}>{part}</strong>
                    : part
            )}
        </span>
    )
}

/* ─── Typing dots ────────────────────────────────────── */
function TypingDots() {
    return (
        <div style={{ display: 'flex', gap: 4, padding: '12px 16px', alignItems: 'center' }}>
            {[0, 1, 2].map(i => (
                <motion.div key={i}
                    animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }}
                />
            ))}
        </div>
    )
}

/* ─── Single message bubble ──────────────────────────── */
function Bubble({ msg }) {
    const isUser = msg.from === 'user'
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}
        >
            {!isUser && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(1,115,211,0.25), rgba(1,90,180,0.12))', border: '1px solid rgba(1,115,211,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14 }}>🤖</div>
            )}
            <div style={{
                maxWidth: '82%',
                padding: '10px 14px',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: isUser
                    ? 'linear-gradient(135deg, rgba(1,115,211,0.95), rgba(1,90,180,0.95))'
                    : 'rgba(255,255,255,0.06)',
                border: isUser ? '1px solid rgba(1,115,211,0.4)' : '1px solid rgba(255,255,255,0.09)',
                fontSize: 13, lineHeight: 1.65,
                color: '#fff',
                backdropFilter: isUser ? 'none' : 'blur(6px)',
                boxShadow: isUser ? '0 4px 20px rgba(1,115,211,0.25)' : 'none',
            }}>
                <RichText text={msg.text} userMsg={isUser} />
            </div>
        </motion.div>
    )
}

/* ─── Main Chatbot Widget ────────────────────────────── */
export default function Chatbot() {
    const { lang } = useLanguage()
    const flow = FLOWS[lang] || FLOWS.EN

    const [open, setOpen] = useState(false)
    const [started, setStarted] = useState(false)
    const [messages, setMessages] = useState([])
    const [choices, setChoices] = useState([])
    const [typing, setTyping] = useState(false)
    const [canInput, setCanInput] = useState(false)
    const [inputVal, setInputVal] = useState('')
    const [stateKey, setStateKey] = useState('start')
    const [userData, setUserData] = useState({ name: '', email: '' })
    const [unread, setUnread] = useState(0)
    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, typing, choices])

    // Show unread badge after 4s if not opened
    useEffect(() => {
        if (!open) {
            const t = setTimeout(() => setUnread(1), 4000)
            return () => clearTimeout(t)
        }
    }, [])

    const resolveText = (text) => {
        return text.replace('{name}', userData.name).replace('{email}', userData.email)
    }

    const playStep = async (key) => {
        const step = flow[key]
        if (!step) return
        setStateKey(key)
        setChoices([])
        setCanInput(false)

        for (const m of step.msgs) {
            setTyping(true)
            await new Promise(r => setTimeout(r, m.delay))
            setTyping(false)
            setMessages(prev => [...prev, { from: 'bot', text: resolveText(m.text) }])
        }
        if (step.input) setCanInput(true)
        else if (step.choices?.length) setChoices(step.choices)
    }

    const handleOpen = () => {
        setOpen(true)
        setUnread(0)
        if (!started) {
            setStarted(true)
            setTimeout(() => playStep('start'), 300)
        }
    }

    const handleChoice = (choice) => {
        setMessages(prev => [...prev, { from: 'user', text: choice }])
        setChoices([])

        const step = flow[stateKey]
        const nextRaw = typeof step.next === 'string' ? step.next : step.next?.[choice]
        if (nextRaw === '__pilot__') {
            window.open('/pilot', '_blank')
            return
        }
        if (nextRaw) playStep(nextRaw)
    }

    const handleSend = () => {
        if (!inputVal.trim() || !canInput) return
        const text = inputVal.trim()
        const step = flow[stateKey]

        // Store user data
        if (step?.storeAs) {
            setUserData(prev => ({ ...prev, [step.storeAs]: text }))
        }

        setMessages(prev => [...prev, { from: 'user', text }])
        setInputVal('')
        setCanInput(false)

        // Next step (after storing, so we update userData inline)
        const updatedData = step?.storeAs ? { ...userData, [step.storeAs]: text } : userData
        const nextKey = typeof step.next === 'string' ? step.next : null
        if (nextKey) {
            // Resolve next step with updated data inline
            setTimeout(async () => {
                const nextStep = flow[nextKey]
                if (!nextStep) return
                setStateKey(nextKey)
                setChoices([])
                for (const m of nextStep.msgs) {
                    setTyping(true)
                    await new Promise(r => setTimeout(r, m.delay))
                    setTyping(false)
                    const resolved = m.text
                        .replace('{name}', updatedData.name)
                        .replace('{email}', updatedData.email)
                    setMessages(prev => [...prev, { from: 'bot', text: resolved }])
                }
                if (nextStep.input) setCanInput(true)
                else if (nextStep.choices?.length) setChoices(nextStep.choices)
            }, 200)
        }
    }

    const labelOpen = lang === 'DE' ? 'Chat starten' : 'Chat with us'
    const labelInput = lang === 'DE' ? 'Ihre Antwort...' : 'Your answer...'
    const labelWait = lang === 'DE' ? 'Warte auf Antwort...' : 'Waiting...'
    const labelTitle = lang === 'DE' ? 'Prototyp anfragen' : 'Get your prototype'
    const labelSub = lang === 'DE' ? 'Antwortet sofort · Kostenlos' : 'Responds instantly · Free'
    const introHead = lang === 'DE' ? 'Kostenlosen Prototyp anfragen' : 'Get your free prototype'
    const introSub = lang === 'DE' ? '3 Tage · Kein Vertrag · KI-gestützt' : '3 days · No contract · AI-powered'
    const introCTA = lang === 'DE' ? 'Chat starten ↗' : 'Start chat ↗'

    return (
        <>
            {/* ── Floating bubble ── */}
            <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                style={{
                    position: 'fixed', bottom: 28, right: 28, zIndex: 9000,
                    width: 58, height: 58, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(1,115,211,0.95), rgba(1,90,180,0.95))',
                    border: '1px solid rgba(255,255,255,0.22)',
                    boxShadow: '0 8px 32px rgba(1,115,211,0.45), inset 0 1px 0 rgba(255,255,255,0.18)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: open ? 22 : 24,
                    backdropFilter: 'blur(6px)',
                    transition: 'all 0.3s',
                }}
                aria-label={labelOpen}
            >
                <AnimatePresence mode="wait">
                    <motion.span key={open ? 'close' : 'open'}
                        initial={{ rotate: -30, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 30, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {open ? '✕' : '💬'}
                    </motion.span>
                </AnimatePresence>

                {/* Unread dot */}
                {!open && unread > 0 && (
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        style={{
                            position: 'absolute', top: 2, right: 2,
                            width: 16, height: 16, borderRadius: '50%',
                            background: '#ff4466',
                            border: '2px solid rgba(0,0,0,0.8)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 9, fontWeight: 800, color: '#fff',
                        }}
                    >
                        1
                    </motion.div>
                )}
            </motion.button>

            {/* ── Chat panel ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.9 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        style={{
                            position: 'fixed', bottom: 100, right: 28, zIndex: 8999,
                            width: 'min(380px, calc(100vw - 32px))',
                            maxHeight: '75vh',
                            display: 'flex', flexDirection: 'column',
                            borderRadius: 24,
                            background: 'rgba(8,8,14,0.97)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 24px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Top shine */}
                        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)' }} />

                        {/* Header */}
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(1,115,211,0.3), rgba(1,90,180,0.15))', border: '1px solid rgba(1,115,211,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
                                <motion.div animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                                    style={{ position: 'absolute', bottom: 1, right: 1, width: 9, height: 9, borderRadius: '50%', background: '#10b981', border: '2px solid rgba(0,0,0,0.8)' }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{labelTitle}</div>
                                <div style={{ fontSize: 11, color: 'rgba(100,220,160,0.9)' }}>{labelSub}</div>
                            </div>
                            <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 28, height: 28, cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 8px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                            {!started ? (
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 18, textAlign: 'center', padding: '20px 10px' }}>
                                    <div style={{ fontSize: 48 }}>🚀</div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: 17, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>{introHead}</div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', maxWidth: 240 }}>{introSub}</div>
                                    </div>
                                    <button onClick={handleOpen} className="btn-primary" style={{ fontSize: 13, padding: '11px 26px' }}>
                                        {introCTA}
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <AnimatePresence>
                                        {messages.map((m, i) => <Bubble key={i} msg={m} />)}
                                    </AnimatePresence>
                                    {typing && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
                                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(1,115,211,0.25), rgba(1,90,180,0.12))', border: '1px solid rgba(1,115,211,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14 }}>🤖</div>
                                            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px 16px 16px 4px' }}>
                                                <TypingDots />
                                            </div>
                                        </motion.div>
                                    )}
                                </>
                            )}
                            <div ref={endRef} />
                        </div>

                        {/* Choice chips */}
                        <AnimatePresence>
                            {choices.length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    style={{ padding: '6px 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 7, flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    {choices.map(c => (
                                        <motion.button key={c}
                                            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.1)' }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleChoice(c)}
                                            style={{
                                                padding: '7px 14px', fontSize: 12, fontWeight: 600,
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                borderRadius: 50, color: 'rgba(255,255,255,0.8)',
                                                cursor: 'pointer', fontFamily: 'var(--font)',
                                                transition: 'all 0.2s',
                                            }}
                                        >{c}</motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Input bar */}
                        {(started && (canInput || choices.length === 0)) && (
                            <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8, alignItems: 'center', background: 'rgba(0,0,0,0.2)', flexShrink: 0 }}>
                                <input
                                    value={inputVal}
                                    onChange={e => setInputVal(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder={canInput ? labelInput : labelWait}
                                    disabled={!canInput}
                                    style={{
                                        flex: 1, background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 12, padding: '9px 14px',
                                        color: '#fff', fontSize: 13,
                                        fontFamily: 'var(--font-body)', outline: 'none',
                                        opacity: canInput ? 1 : 0.4, transition: 'all 0.3s',
                                    }}
                                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                                />
                                <motion.button
                                    whileHover={canInput && inputVal.trim() ? { scale: 1.1 } : {}}
                                    whileTap={canInput && inputVal.trim() ? { scale: 0.9 } : {}}
                                    onClick={handleSend}
                                    disabled={!canInput || !inputVal.trim()}
                                    style={{
                                        width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                                        background: canInput && inputVal.trim()
                                            ? 'linear-gradient(135deg, rgba(1,115,211,0.95), rgba(1,90,180,0.95))'
                                            : 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.14)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 16, color: '#fff',
                                        cursor: canInput ? 'pointer' : 'default',
                                        transition: 'all 0.3s',
                                        boxShadow: canInput && inputVal.trim() ? '0 4px 16px rgba(1,115,211,0.35)' : 'none',
                                    }}
                                >↑</motion.button>
                            </div>
                        )}

                        {/* Footer note */}
                        <div style={{ padding: '6px 16px 10px', textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
                            🔒 prodone.ai · {lang === 'DE' ? 'Datenschutzkonform · Frankfurt & Stuttgart' : 'Privacy safe · Frankfurt & Stuttgart'}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
