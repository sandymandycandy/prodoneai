import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const faqs = [
    {
        q: 'Was ist im kostenlosen 3-Tage-Prototyp enthalten?',
        a: 'Sie erhalten ein Storyboard oder Konzeptpapier am Tag 1, eine erste animierte oder funktionsfähige Version am Tag 2–3, sowie bis zu 2 Feedback-Runden. Finales Deliverable: 1 Format (z.B. MP4 15s oder Webapp-Demo). Kein Vertrag, kein Risiko.',
    },
    {
        q: 'Was kostet die Vollproduktion? Preise ab €5.000?',
        a: 'Ja, Produktionsprojekte starten in der Regel bei €5.000 für eine vollständige KI-Animationsanzeige (3 Varianten, alle Formate). Komplexere Projekte (Apps, AI-Agenten, laufende Retainer) werden nach Scope individuell kalkuliert.',
    },
    {
        q: 'Wie schnell kann die Vollproduktion geliefert werden?',
        a: 'Einfache Animationsanzeigen: 5–10 Werktage. Komplexe KI-Agenten oder Apps: 2–6 Wochen je nach Scope. Wir kommunizieren von Anfang an realistische Timelines — keine Over-Promising.',
    },
    {
        q: 'Arbeiten Sie auch mit Agenturen (White-Label)?',
        a: 'Ja. Wir arbeiten diskret als White-Label-Partner für Digitalagenturen. Ihre Marke, unsere KI-Infrastruktur. NDA auf Anfrage jederzeit möglich.',
    },
    {
        q: 'In welchen Sprachen arbeiten Sie?',
        a: 'Deutsch und Englisch. Targeting für DACH-Markt (Deutschland, Österreich, Schweiz) ist unser Kern.',
    },
    {
        q: 'Wie unterscheidet sich ProdOne von einer klassischen Agentur?',
        a: 'Klassische Agenturen brauchen 6–12 Wochen für Produktion. Wir liefern einen funktionalen Prototyp in 3 Tagen — dank KI-Infrastruktur und dual-continent Sprints. Bezahlt wird erst, wenn Sie mit dem Prototyp zufrieden sind.',
    },
]

function FaqItem({ faq, index }) {
    const [open, setOpen] = useState(false)

    return (
        <motion.div
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: 20,
                    padding: '22px 0', background: 'none', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                }}
            >
                <span style={{
                    fontSize: 16, fontWeight: 600,
                    color: open ? '#fff' : 'rgba(255,255,255,0.65)',
                    transition: 'color 0.3s', flex: 1, lineHeight: 1.45,
                }}>{faq.q}</span>
                <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: open ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, color: open ? '#fff' : 'rgba(255,255,255,0.35)',
                    transition: 'all 0.35s', flexShrink: 0,
                    transform: open ? 'rotate(45deg)' : 'none',
                }}>+</span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.4)', paddingBottom: 22, paddingRight: 48 }}>
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function FAQ() {
    const headRef = useRef(null)
    const inView = useInView(headRef, { once: true })

    return (
        <section id="faq" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '40%', right: '10%',
                width: 400, height: 400,
                background: 'radial-gradient(ellipse, rgba(80,40,200,0.1) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="faq-layout">
                    {/* LEFT sticky */}
                    <div ref={headRef} style={{ position: 'sticky', top: 120 }}>
                        <motion.div className="section-label" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
                            FAQ
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', marginTop: 20, marginBottom: 18, lineHeight: 1.1 }}
                        >
                            Häufige<br />
                            <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Fragen.
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                            style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.35)', marginBottom: 32 }}
                        >
                            Noch eine Frage offen? Schreiben Sie uns direkt.
                        </motion.p>
                        <a href="mailto:hello@prodone.ai">
                            <button className="btn-ghost" style={{ fontSize: 13, padding: '11px 20px', borderRadius: 12 }}>
                                ✉ hello@prodone.ai
                            </button>
                        </a>
                    </div>

                    {/* RIGHT accordion */}
                    <div>
                        {/* Glass FAQ panel */}
                        <div style={{
                            padding: '8px 40px',
                            borderRadius: 28,
                            background: 'rgba(255,255,255,0.03)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                        }}>
                            {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .faq-layout {
                    display: grid;
                    grid-template-columns: 340px 1fr;
                    gap: 80px;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .faq-layout { grid-template-columns: 1fr !important; gap: 40px; }
                    #faq { padding: 80px 0; }
                    .faq-layout > div:first-child { position: static !important; }
                }
            `}</style>
        </section>
    )
}
