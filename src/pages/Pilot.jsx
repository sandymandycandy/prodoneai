import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Chatbot from '../components/Chatbot'
import CTABlock from '../components/CTABlock'

const problems = [
    { icon: '📧', stat: '200+', label: 'Daily Email Inquiries', desc: 'The firm receives over 200 client emails per day across Frankfurt and Berlin offices.', glow: 'rgba(255,180,0,0.35)', color: '#fbbf24' },
    { icon: '⏰', stat: '4.5h', label: 'Average Response Time', desc: 'Secretarial staff takes up to 4.5 hours to process and route each incoming inquiry.', glow: 'rgba(255,80,80,0.35)', color: '#f87171' },
    { icon: '😤', stat: '31%', label: 'Client Frustration Rate', desc: 'Nearly one-third of clients report dissatisfaction with response times in post-intake surveys.', glow: 'rgba(220,80,255,0.3)', color: '#e879f9' },
]

const results = [
    { icon: '⚡', stat: '92%', label: 'Faster Email Triage', glow: 'rgba(0,210,255,0.4)', color: 'rgba(0,220,255,0.95)' },
    { icon: '🎯', stat: '99%', label: 'Routing Accuracy', glow: 'rgba(0,100,255,0.35)', color: 'rgba(80,160,255,0.95)' },
    { icon: '💰', stat: '60%', label: 'Staff Time Saved', glow: 'rgba(120,60,240,0.35)', color: 'rgba(160,120,255,0.95)' },
    { icon: '⭐', stat: '4.9', label: 'Client Satisfaction', glow: 'rgba(0,200,140,0.35)', color: 'rgba(50,220,180,0.95)' },
]

const processSteps = [
    { step: '1', title: 'Empfang & Datenschutz', desc: 'Begrüßt Mandanten professionell und holt die DSGVO-Einwilligung ein.', color: 'rgba(0,200,255,0.9)', glow: 'rgba(0,200,255,0.3)' },
    { step: '2', title: 'Anliegen erkennen', desc: 'KI analysiert die Anfrage und identifiziert Rechtsgebiet und Dringlichkeit.', color: 'rgba(80,140,255,0.9)', glow: 'rgba(80,140,255,0.3)' },
    { step: '3', title: 'Anwalt zuweisen', desc: 'Weist automatisch den passenden Spezialisten am nächsten Standort zu.', color: 'rgba(140,80,255,0.9)', glow: 'rgba(140,80,255,0.3)' },
    { step: '4', title: 'Termin buchen', desc: 'Ermöglicht direkte Terminvereinbarung oder leitet an Telefonkontakt weiter.', color: 'rgba(0,200,160,0.9)', glow: 'rgba(0,200,160,0.3)' },
]

export default function Pilot() {
    useEffect(() => { window.scrollTo(0, 0) }, [])
    const heroRef = useRef(null)
    const heroInView = useInView(heroRef, { once: true })
    const chatRef = useRef(null)
    const chatInView = useInView(chatRef, { once: true, margin: '-60px' })
    const resultsRef = useRef(null)
    const resultsInView = useInView(resultsRef, { once: true })

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

            {/* ══════════════════════════════════
                HERO / CASE STUDY
            ══════════════════════════════════ */}
            <section style={{ paddingTop: 130, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
                <div className="grid-overlay" style={{ opacity: 0.3 }} />

                {/* Ambient glow orbs */}
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', top: '-10%', right: '-5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(80,40,220,0.18) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,180,255,0.12) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

                <div className="container" ref={heroRef} style={{ position: 'relative', zIndex: 1 }}>
                    {/* Breadcrumb */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 32 }}>
                        <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>prodone.ai</a>
                        <span style={{ opacity: 0.4 }}>›</span>
                        <span>Pilotprojekt</span>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        className="section-label" style={{ marginBottom: 24 }}>
                        🏛️ Live Case Study — Rechtsanwaltskanzlei
                    </motion.div>

                    <div className="pilot-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
                        {/* Left */}
                        <div>
                            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.9 }}
                                style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginBottom: 20, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                                Kornmeier & Partner:<br />
                                <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    KI transformiert
                                </span><br />
                                die Kanzlei-Kommunikation
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
                                style={{ fontSize: 16, lineHeight: 1.85, color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>
                                Kornmeier & Partner is one of Germany's leading law firms with{' '}
                                <strong style={{ color: '#fff' }}>30 specialist lawyers</strong> across Frankfurt and Berlin. Their modern digital presence generates enormous inquiry volume — creating a critical operational challenge.
                            </motion.p>

                            {/* Firm meta chips */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }}
                                style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                {[['⚖️', '30 Rechtsanwälte'], ['📍', 'Frankfurt & Berlin'], ['🏢', 'Gegr. 1987'], ['📈', '5.000+ Mandanten/Jahr']].map(([icon, text]) => (
                                    <div key={text} style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        padding: '8px 16px', borderRadius: 50,
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(12px)',
                                        fontSize: 13, color: 'rgba(255,255,255,0.6)',
                                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                                    }}>
                                        <span>{icon}</span><span>{text}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right — glass firm card */}
                        <motion.div initial={{ opacity: 0, x: 60, scale: 0.92 }} animate={heroInView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                            {/* Glow behind card */}
                            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ position: 'absolute', top: '20%', left: '10%', width: '80%', height: '80%', background: 'rgba(80,40,200,0.3)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />

                            <div style={{
                                position: 'relative', zIndex: 1,
                                padding: '40px 36px', textAlign: 'center', maxWidth: 320, width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 28,
                                boxShadow: '0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)',
                                overflow: 'hidden',
                            }}>
                                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)' }} />
                                <div style={{ fontSize: 52, marginBottom: 18 }}>⚖️</div>
                                <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Kornmeier & Partner</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 28 }}>Rechtsanwälte · Frankfurt & Berlin</div>
                                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 24 }} />
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    {[['30', 'Anwälte'], ['2', 'Standorte'], ['35+', 'Jahre']].map(([v, l]) => (
                                        <div key={l} style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 2, background: 'linear-gradient(135deg,#fff,rgba(255,255,255,0.5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
                                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: 24, padding: '10px 16px', background: 'rgba(50,200,130,0.08)', border: '1px solid rgba(50,200,130,0.2)', borderRadius: 12, fontSize: 13, color: 'rgba(50,220,150,0.9)', backdropFilter: 'blur(8px)' }}>
                                    ✅ KI erfolgreich integriert
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
                SZENARIO & PROBLEM
            ══════════════════════════════════ */}
            <section style={{ padding: '80px 0', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div className="container">
                    {/* Scenario + Problem side by side */}
                    <div className="pilot-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 48 }}>
                        {[
                            {
                                label: 'Szenario', labelColor: 'rgba(0,200,255,0.8)',
                                title: 'Das Ausgangsproblem',
                                body: 'Kornmeier & Partner betreibt eine moderne, stark frequentierte Web-Präsenz, die täglich eine',
                                strong: 'hohe Anzahl an E-Mail-Anfragen',
                                body2: 'generiert. Diese müssen durch das Sekretariat analysiert, kategorisiert und an den zuständigen Anwalt weitergeleitet werden.',
                                alert: '⚠️ Der Anstieg übersteigt die Kapazitäten des Sekretariats',
                                alertColor: 'rgba(255,200,0,0.9)', alertBg: 'rgba(255,200,0,0.06)', alertBorder: 'rgba(255,200,0,0.2)',
                                glow: 'rgba(0,180,255,0.25)',
                            },
                            {
                                label: 'Problem', labelColor: 'rgba(255,80,80,0.85)',
                                title: 'Der Bottleneck',
                                body: 'Der steigende E-Mail-Eingang übersteigt die Kapazitäten des Sekretariats und erzeugt einen',
                                strong: 'Bearbeitungsrückstand',
                                body2: ', der den reibungslosen Kanzleibetrieb gefährdet und zu Mandantenunzufriedenheit führt.',
                                alert: '🔴 Kritischer Handlungsbedarf identifiziert',
                                alertColor: 'rgba(255,90,90,0.9)', alertBg: 'rgba(255,60,60,0.06)', alertBorder: 'rgba(255,60,60,0.2)',
                                glow: 'rgba(255,80,80,0.2)',
                            },
                        ].map((card, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.8 }}
                                style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '20%', left: '10%', width: '80%', height: '60%', background: card.glow, borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />
                                <div style={{
                                    position: 'relative', zIndex: 1,
                                    padding: '36px', borderRadius: 24,
                                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.09)',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)' }} />
                                    <div style={{ fontSize: 10, color: card.labelColor, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>{card.label}</div>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 14 }}>{card.title}</h3>
                                    <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>
                                        {card.body} <strong style={{ color: '#fff' }}>{card.strong}</strong> {card.body2}
                                    </p>
                                    <div style={{ marginTop: 20, padding: '12px 16px', background: card.alertBg, border: `1px solid ${card.alertBorder}`, borderRadius: 12, fontSize: 13, color: card.alertColor, backdropFilter: 'blur(8px)' }}>
                                        {card.alert}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Problem metric cards */}
                    <div className="pilot-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                        {problems.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
                                style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '20%', left: '10%', width: '80%', height: '70%', background: p.glow, borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
                                <motion.div whileHover={{ y: -6, scale: 1.015 }} transition={{ duration: 0.3 }}
                                    style={{
                                        position: 'relative', zIndex: 1,
                                        padding: '32px 24px', textAlign: 'center',
                                        background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 22,
                                        boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                                        overflow: 'hidden',
                                    }}>
                                    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)' }} />
                                    <div style={{ fontSize: 32, marginBottom: 14 }}>{p.icon}</div>
                                    <div style={{ fontSize: 38, fontWeight: 900, marginBottom: 6, lineHeight: 1, background: `linear-gradient(135deg, ${p.color}, rgba(255,255,255,0.7))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{p.stat}</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{p.label}</div>
                                    <p style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.38)' }}>{p.desc}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
                INTERACTIVE DEMO
            ══════════════════════════════════ */}
            <section style={{ padding: '100px 0', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }} ref={chatRef}>
                {/* Centre glow */}
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(80,40,200,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={chatInView ? { opacity: 1, y: 0 } : {}} className="section-label">
                            🤖 Live Demo — Interaktiver Chatbot
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={chatInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.9 }}
                            style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', marginBottom: 16 }}>
                            Die KI-Lösung: Erleben Sie sie{' '}
                            <span style={{ background: 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>live</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={chatInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
                            style={{ fontSize: 16, maxWidth: 520, margin: '0 auto', color: 'rgba(255,255,255,0.42)', lineHeight: 1.85 }}>
                            This is the actual AI chatbot we built for Kornmeier & Partner. Try it — enter your legal query and experience the difference.
                        </motion.p>
                    </div>

                    <div className="pilot-chat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
                        {/* Chatbot */}
                        <motion.div initial={{ opacity: 0, x: -50, scale: 0.97 }} animate={chatInView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            style={{ display: 'flex', justifyContent: 'center' }}>
                            <Chatbot />
                        </motion.div>

                        {/* Process steps */}
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={chatInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.9 }}>
                            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Wie es funktioniert</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.42)', marginBottom: 32 }}>
                                The chatbot handles initial intake automatically — greeting clients, collecting their legal concern, and routing them to the most appropriate specialist lawyer.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {processSteps.map((item, i) => (
                                    <motion.div key={item.step}
                                        initial={{ opacity: 0, x: 20 }} animate={chatInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 + i * 0.09 }}
                                        style={{
                                            display: 'flex', gap: 16, alignItems: 'flex-start',
                                            padding: '18px 20px', borderRadius: 18,
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            backdropFilter: 'blur(12px)',
                                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                                        }}>
                                        <div style={{
                                            width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                                            background: `rgba(255,255,255,0.06)`,
                                            border: `1px solid ${item.color}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 14, fontWeight: 800, color: item.color,
                                            boxShadow: `0 0 16px ${item.glow}`,
                                        }}>{item.step}</div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 4 }}>{item.title}</div>
                                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65 }}>{item.desc}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Tip box */}
                            <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                                💡 <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Tipp:</strong> Geben Sie ein:{' '}
                                <em style={{ color: 'rgba(255,255,255,0.6)' }}>"Ich bin Opfer von Kreditkartenbetrug und suche dringend einen Anwalt in der Nähe von Mainz"</em>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
                RESULTS
            ══════════════════════════════════ */}
            <section style={{ padding: '100px 0', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }} ref={resultsRef}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <div className="section-label" style={{ margin: '0 auto 20px' }}>Ergebnisse</div>
                        <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-0.03em' }}>
                            Die KI macht den{' '}
                            <span style={{ background: 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Unterschied
                            </span>
                        </h2>
                    </div>

                    <div className="pilot-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                        {results.map((r, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                                animate={resultsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ delay: i * 0.12, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                                style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '10%', left: '5%', width: '90%', height: '80%', background: r.glow, borderRadius: '50%', filter: 'blur(36px)', pointerEvents: 'none' }} />
                                <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.3 }}
                                    style={{
                                        position: 'relative', zIndex: 1,
                                        padding: '36px 20px', textAlign: 'center',
                                        background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 22,
                                        boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.09)',
                                        overflow: 'hidden',
                                    }}>
                                    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)' }} />
                                    <div style={{ fontSize: 32, marginBottom: 16 }}>{r.icon}</div>
                                    <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, marginBottom: 8, background: `linear-gradient(135deg, #fff, ${r.color})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: `drop-shadow(0 0 16px ${r.glow})` }}>
                                        {r.stat}
                                    </div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.label}</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CTABlock />

            <style>{`
                @media (max-width: 900px) {
                    .pilot-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
                    .pilot-2col { grid-template-columns: 1fr !important; }
                    .pilot-3col { grid-template-columns: 1fr !important; }
                    .pilot-chat-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
                    .pilot-4col { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 560px) {
                    .pilot-4col { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </motion.main>
    )
}
