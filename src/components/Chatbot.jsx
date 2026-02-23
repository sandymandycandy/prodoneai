import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOT_NAME = 'Kornmeier KI'
const BOT_AVATAR = '⚖️'

const CONVERSATION_FLOW = {
    start: {
        id: 'start',
        messages: [
            { delay: 500, text: `Willkommen bei **Kornmeier & Partner** Rechtsanwälte. Ich bin Ihr digitaler Assistent.` },
            { delay: 1800, text: `Bevor wir fortfahren: Bitte beachten Sie, dass dieser Dienst keine Rechtsberatung ersetzt. Durch Ihre Nutzung stimmen Sie unserer **Datenschutzerklärung** zu. Stimmen Sie zu?` },
        ],
        expectsInput: false,
        choices: ['✅ Ja, ich stimme zu', '❌ Nein, danke'],
        nextMap: { '✅ Ja, ich stimme zu': 'accepted', '❌ Nein, danke': 'declined' },
    },
    declined: {
        id: 'declined',
        messages: [{ delay: 600, text: `Verstanden. Falls Sie Fragen haben, kontaktieren Sie uns bitte direkt unter **+49 69 123456**. Auf Wiedersehen! 👋` }],
        expectsInput: false,
        choices: [],
        nextMap: {},
    },
    accepted: {
        id: 'accepted',
        messages: [{ delay: 500, text: `Vielen Dank! Wie kann ich Ihnen heute helfen?` }],
        expectsInput: true,
        choices: [],
        nextMap: {},
    },
    fraud_response: {
        id: 'fraud_response',
        messages: [
            { delay: 600, text: `Das klingt nach einem **sehr dringenden Fall**. Kreditkartenbetrug ist eine Straftat nach §263a StGB.` },
            { delay: 2000, text: `Unser Spezialist für Wirtschaftskriminalität, **RA Dr. Klaus Werner**, hat freie Kapazitäten in unserer **Filiale Frankfurt** — nur 45 Minuten von Mainz entfernt. 📍` },
            { delay: 3500, text: `Ich empfehle folgende Sofortmaßnahmen:\n\n1. 🔴 Sperren Sie sofort Ihre Karte (Hotline: 116 116)\n2. 📋 Documentieren Sie alle verdächtigen Transaktionen\n3. 📞 Erstatten Sie Anzeige bei der Polizei\n\nSoll ich für Sie **direkt einen Termin** mit Dr. Werner vereinbaren?` },
        ],
        expectsInput: false,
        choices: ['📅 Termin vereinbaren', '📞 Direkt anrufen', '📥 E-Mail senden'],
        nextMap: { '📅 Termin vereinbaren': 'booking', '📞 Direkt anrufen': 'call', '📥 E-Mail senden': 'email' },
    },
    booking: {
        id: 'booking',
        messages: [
            { delay: 500, text: `Perfekt! Ich habe für Sie einen **Beratungstermin morgen um 10:00 Uhr** in unserer Frankfurter Kanzlei vorgemerkt.` },
            { delay: 1800, text: `Sie erhalten in wenigen Minuten eine **Bestätigungsmail**. RA Dr. Werner wird alle Informationen vorbereiten. Gibt es noch etwas, wobei ich Ihnen helfen kann?` },
        ],
        expectsInput: false,
        choices: ['✅ Alles erledigt, danke!'],
        nextMap: { '✅ Alles erledigt, danke!': 'done' },
    },
    call: {
        id: 'call',
        messages: [{ delay: 600, text: `📞 Bitte rufen Sie an unter: **+49 69 987654** — RA Dr. Werner ist heute bis 18:00 Uhr erreichbar. Alles Gute für Sie!` }],
        expectsInput: false,
        choices: ['↩ Zurück zum Start'],
        nextMap: { '↩ Zurück zum Start': 'accepted' },
    },
    email: {
        id: 'email',
        messages: [{ delay: 600, text: `📧 Schreiben Sie an: **werner@kornmeier-partner.de** mit dem Betreff "Dringende Anfrage - Kreditkartenbetrug". Wir antworten innerhalb von 1 Stunde!` }],
        expectsInput: false,
        choices: ['↩ Zurück zum Start'],
        nextMap: { '↩ Zurück zum Start': 'accepted' },
    },
    done: {
        id: 'done',
        messages: [{ delay: 500, text: `Bitte. Wir stehen Ihnen zur Seite. Bis morgen! ⚖️` }],
        expectsInput: false,
        choices: [],
        nextMap: {},
    },
    general: {
        id: 'general',
        messages: [
            { delay: 600, text: `Ich habe Ihre Anfrage verstanden. Für eine detaillierte Beratung empfehle ich ein persönliches Gespräch mit einem unserer Anwälte.` },
            { delay: 1800, text: `Zu welchem Rechtsgebiet suchen Sie Unterstützung?` },
        ],
        expectsInput: false,
        choices: ['Wirtschaftsrecht', 'Familienrecht', 'Strafrecht', 'Anderes'],
        nextMap: { 'Wirtschaftsrecht': 'booking', 'Familienrecht': 'booking', 'Strafrecht': 'booking', 'Anderes': 'booking' },
    },
}

function detectIntent(text) {
    const lower = text.toLowerCase()
    if (lower.includes('betrug') || lower.includes('fraud') || lower.includes('kreditkarte') || lower.includes('mainz') || lower.includes('dringend') || lower.includes('urgent') || lower.includes('credit card')) {
        return 'fraud_response'
    }
    return 'general'
}

function TypingDots() {
    return (
        <div style={{ display: 'flex', gap: '4px', padding: '14px 18px', alignItems: 'center' }}>
            {[0, 1, 2].map(i => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-cyan)' }}
                />
            ))}
        </div>
    )
}

function Message({ msg }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{
                display: 'flex',
                flexDirection: msg.from === 'user' ? 'row-reverse' : 'row',
                gap: '10px', alignItems: 'flex-end', marginBottom: '14px',
            }}
        >
            {msg.from === 'bot' && (
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #00e5ff22, #0066ff22)', border: '1px solid rgba(0,229,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>
                    {BOT_AVATAR}
                </div>
            )}
            <div style={{
                maxWidth: '80%',
                padding: '12px 16px',
                borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.from === 'user'
                    ? 'linear-gradient(135deg, #0066ff, #00e5ff)'
                    : 'rgba(255,255,255,0.05)',
                border: msg.from === 'bot' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                fontSize: '14px',
                lineHeight: '1.65',
                color: msg.from === 'user' ? '#fff' : 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
            }}>
                {msg.text.split('**').map((part, i) =>
                    i % 2 === 1
                        ? <strong key={i} style={{ color: msg.from === 'user' ? '#fff' : 'var(--accent-cyan)' }}>{part}</strong>
                        : part
                )}
            </div>
        </motion.div>
    )
}

export default function Chatbot() {
    const [messages, setMessages] = useState([])
    const [choices, setChoices] = useState([])
    const [inputVal, setInputVal] = useState('')
    const [typing, setTyping] = useState(false)
    const [canInput, setCanInput] = useState(false)
    const [currentState, setCurrentState] = useState(null)
    const [started, setStarted] = useState(false)
    const chatEndRef = useRef(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, typing, choices])

    const addBotMessages = async (msgs, next) => {
        setCanInput(false)
        setChoices([])
        for (const m of msgs) {
            setTyping(true)
            await new Promise(r => setTimeout(r, m.delay))
            setTyping(false)
            setMessages(prev => [...prev, { from: 'bot', text: m.text }])
        }
        if (next.expectsInput) setCanInput(true)
        if (next.choices.length) setChoices(next.choices)
        setCurrentState(next.id)
    }

    const startChat = () => {
        setStarted(true)
        addBotMessages(CONVERSATION_FLOW.start.messages, CONVERSATION_FLOW.start)
    }

    const handleChoice = (choice) => {
        setMessages(prev => [...prev, { from: 'user', text: choice }])
        setChoices([])
        const nextKey = CONVERSATION_FLOW[currentState]?.nextMap[choice]
        if (nextKey && CONVERSATION_FLOW[nextKey]) {
            addBotMessages(CONVERSATION_FLOW[nextKey].messages, CONVERSATION_FLOW[nextKey])
        }
    }

    const handleSend = () => {
        if (!inputVal.trim() || !canInput) return
        const text = inputVal.trim()
        setMessages(prev => [...prev, { from: 'user', text }])
        setInputVal('')
        setCanInput(false)
        const intent = detectIntent(text)
        addBotMessages(CONVERSATION_FLOW[intent].messages, CONVERSATION_FLOW[intent])
    }

    return (
        <div style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 28,
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.12)',
            maxWidth: '520px',
            width: '100%',
            position: 'relative',
        }}>
            {/* Top shine */}
            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)', pointerEvents: 'none' }} />

            {/* Header */}
            <div style={{
                padding: '18px 24px',
                background: 'rgba(255,255,255,0.04)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', gap: 14,
                backdropFilter: 'blur(12px)',
            }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 0 20px rgba(80,40,200,0.4)' }}>
                        {BOT_AVATAR}
                    </div>
                    <motion.div animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                        style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: '#10b981', border: '2px solid rgba(0,0,0,0.6)', boxShadow: '0 0 6px rgba(16,185,129,0.8)' }} />
                </div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{BOT_NAME}</div>
                    <div style={{ fontSize: 12, color: 'rgba(80,220,160,0.9)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span>● Online</span>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>· Antwortet sofort</span>
                    </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 7 }}>
                    {[0, 1, 2].map(i => (
                        <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: ['#ff5f57', '#febc2e', '#28c840'][i], opacity: 0.8 }} />
                    ))}
                </div>
            </div>

            {/* Messages */}
            <div style={{ height: 360, overflowY: 'auto', padding: '24px 20px 8px', display: 'flex', flexDirection: 'column' }}>
                {!started ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 20, textAlign: 'center' }}>
                        <div style={{ fontSize: 52, filter: 'drop-shadow(0 0 20px rgba(100,60,255,0.5))' }}>⚖️</div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 8 }}>Kornmeier & Partner</div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', maxWidth: 260 }}>
                                KI-gestützter Assistent für rechtliche Erstberatung — jetzt live erleben
                            </div>
                        </div>
                        <button onClick={startChat} className="btn-primary" style={{ fontSize: 14, padding: '12px 28px', borderRadius: 50 }}>
                            Chat starten ↗
                        </button>
                    </motion.div>
                ) : (
                    <>
                        <AnimatePresence>
                            {messages.map((m, i) => <Message key={i} msg={m} />)}
                        </AnimatePresence>
                        {typing && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 14 }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                                    {BOT_AVATAR}
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '18px 18px 18px 4px', backdropFilter: 'blur(12px)' }}>
                                    <TypingDots />
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Choices */}
            <AnimatePresence>
                {choices.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ padding: '6px 20px 12px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {choices.map((c) => (
                            <motion.button key={c} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                                onClick={() => handleChoice(c)}
                                style={{
                                    padding: '8px 16px', fontSize: 13, fontWeight: 600,
                                    background: 'rgba(255,255,255,0.06)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.14)',
                                    borderRadius: 50, color: 'rgba(255,255,255,0.75)',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    fontFamily: 'var(--font)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
                            >{c}</motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input bar */}
            <div style={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', gap: 10, alignItems: 'center',
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(12px)',
            }}>
                <input
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder={canInput ? 'Ihre Nachricht...' : 'Warten auf Antwort...'}
                    disabled={!canInput}
                    style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 14, padding: '10px 16px',
                        color: '#fff', fontSize: 14,
                        fontFamily: 'var(--font)', outline: 'none',
                        opacity: canInput ? 1 : 0.4, transition: 'all 0.3s',
                        backdropFilter: 'blur(8px)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.05)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
                />
                <motion.button
                    whileHover={canInput ? { scale: 1.08 } : {}}
                    whileTap={canInput ? { scale: 0.92 } : {}}
                    onClick={handleSend}
                    disabled={!canInput || !inputVal.trim()}
                    style={{
                        width: 42, height: 42, borderRadius: 14, flexShrink: 0,
                        background: canInput && inputVal.trim() ? 'linear-gradient(135deg,rgba(120,80,255,0.9),rgba(60,140,255,0.9))' : 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18, color: '#fff',
                        cursor: canInput ? 'pointer' : 'default',
                        transition: 'all 0.3s',
                        boxShadow: canInput && inputVal.trim() ? '0 0 16px rgba(100,60,255,0.4)' : 'none',
                    }}
                >↑</motion.button>
            </div>

            {canInput && (
                <div style={{ padding: '0 16px 14px', display: 'flex', justifyContent: 'flex-end' }}>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                        onClick={handleSend} className="btn-primary" style={{ fontSize: 13, padding: '10px 24px', borderRadius: 50 }}>
                        Absenden
                    </motion.button>
                </div>
            )}
        </div>
    )
}
