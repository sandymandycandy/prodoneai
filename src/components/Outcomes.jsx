import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const outcomes = [
    {
        icon: '🎬',
        tag: 'AI Animation Ads',
        headline: 'Mehr Reichweite & Conversions',
        benefit: 'KI-Video-Ads, die auffallen. Mehr Klicks, günstigere Conversions.',
        deliverable: 'Storyboard · 3 Ad-Varianten · Export für Meta / YouTube',
        timeline: 'Prototyp in 3 Tagen',
        stat: '+340%', statLabel: 'Ø Reichweite',
        glow: 'rgba(120, 80, 255, 0.5)',
        glowSecond: 'rgba(60, 160, 255, 0.28)',
        accentColor: 'rgba(160, 120, 255, 0.9)',
        delay: 0,
    },
    {
        icon: '⚡',
        tag: 'Content Workflow',
        headline: 'Schnellerer Content-Output',
        benefit: 'Skalieren Sie Ihren Content-Output enorm — On-Brand und in Rekordzeit.',
        deliverable: 'KI-Editing-Pipeline · Vorlagen-System · Redaktionskalender-Integration',
        timeline: 'Setup in 1–2 Wochen',
        stat: '10×', statLabel: 'Output-Speed',
        glow: 'rgba(255, 180, 50, 0.4)',
        glowSecond: 'rgba(255, 90, 60, 0.25)',
        accentColor: 'rgba(255, 200, 80, 0.9)',
        delay: 0.1,
    },
    {
        icon: '🤖',
        tag: 'AI Chatbot / Agent',
        headline: 'Besserer Customer Support',
        benefit: '24/7 KI-Support in DE/EN, der Anfragen sofort und präzise löst.',
        deliverable: 'KI-Agent · CRM-Integration · Eskalationslogik · Analyse-Dashboard',
        timeline: 'Live in 5–10 Tagen',
        stat: '80%', statLabel: 'Anfragen automat.',
        glow: 'rgba(0, 220, 180, 0.38)',
        glowSecond: 'rgba(30, 100, 255, 0.25)',
        accentColor: 'rgba(0, 230, 200, 0.9)',
        delay: 0.2,
    },
    {
        icon: '🛠️',
        tag: 'Custom Apps & MVPs',
        headline: 'Prozesse automatisieren',
        benefit: 'Maßgeschneiderte Web-Apps für interne Workflows. Live in Wochen, nicht Monaten.',
        deliverable: 'Funktionaler MVP · API-Integrationen · Onboarding & Dokumentation',
        timeline: 'MVP in 2–4 Wochen',
        stat: '—', statLabel: 'Monatlich gespart',
        glow: 'rgba(255, 100, 180, 0.4)',
        glowSecond: 'rgba(120, 60, 255, 0.28)',
        accentColor: 'rgba(255, 120, 200, 0.9)',
        delay: 0.3,
    },
]

function GlassCard({ o, i }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    const isEven = i % 2 === 0
    const enterX = isEven ? -70 : 70

    return (
        <motion.div
            ref={ref}
            className="outcome-card-outer"
            initial={{ opacity: 0, x: enterX, rotate: isEven ? -3 : 3 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.9, delay: o.delay, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'relative' }}
        >
            {/* Glow orbs — CSS animated, no JS */}
            <div className={`outcome-orb outcome-orb-primary outcome-orb-${i}`} style={{ background: o.glow }} />
            <div className={`outcome-orb outcome-orb-secondary outcome-orb-sec-${i}`} style={{ background: o.glowSecond }} />

            {/* Glass card panel */}
            <motion.div
                className="outcome-card-inner"
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                    position: 'relative', zIndex: 1,
                    display: 'flex', flexDirection: 'column',
                    padding: '40px 36px',
                    borderRadius: 28,
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.11)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)',
                    overflow: 'hidden',
                    cursor: 'default',
                    transition: 'border-color 0.3s',
                    willChange: 'transform',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.11)'}
            >
                {/* Top shine line */}
                <div style={{ position: 'absolute', top: 0, left: '12%', right: '12%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)' }} />

                {/* Accent color bar on left edge */}
                <div style={{ position: 'absolute', top: '20%', bottom: '20%', left: 0, width: 2, borderRadius: '0 2px 2px 0', background: `linear-gradient(180deg, transparent, ${o.accentColor}, transparent)`, opacity: 0.6 }} />

                {/* Watermark number */}
                <div style={{
                    position: 'absolute', top: -12, right: 14,
                    fontSize: 112, fontWeight: 900,
                    color: 'rgba(255,255,255,0.03)',
                    lineHeight: 1, userSelect: 'none', letterSpacing: '-0.06em',
                    fontFamily: 'var(--font)',
                }}>
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </div>

                {/* Tag + Icon row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 7,
                        padding: '6px 14px',
                        background: 'rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: 100,
                        border: '1px solid rgba(255,255,255,0.13)',
                        fontSize: 10, fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                    }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: o.accentColor, boxShadow: `0 0 8px ${o.glow}` }} />
                        {o.tag}
                    </div>
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 50, height: 50, borderRadius: 16,
                            background: 'rgba(255,255,255,0.06)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 24,
                            boxShadow: `0 0 24px ${o.glow}`,
                        }}
                    >
                        {o.icon}
                    </motion.div>
                </div>

                {/* Headline */}
                <h3 style={{
                    fontSize: 'clamp(20px, 2vw, 26px)',
                    fontWeight: 700, color: '#fff',
                    marginBottom: 12, lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                }}>
                    {o.headline}
                </h3>

                {/* Benefit */}
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
                    {o.benefit}
                </p>

                {/* Deliverable glass box */}
                <div style={{
                    padding: '14px 18px',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 14,
                    border: '1px solid rgba(255,255,255,0.07)',
                    marginBottom: 28,
                    flexGrow: 1,
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>
                        Scope of Delivery
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.58)', lineHeight: 1.65 }}>
                        {o.deliverable}
                    </div>
                </div>

                {/* Footer: timeline + stat */}
                <div style={{
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    paddingTop: 20,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        {o.timeline}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{
                            fontSize: 30, fontWeight: 900, lineHeight: 1,
                            letterSpacing: '-0.03em',
                            background: `linear-gradient(135deg, #fff, ${o.accentColor})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: `drop-shadow(0 0 12px ${o.glow})`,
                        }}>
                            {o.stat}
                        </div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {o.statLabel}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Outcomes() {
    const headRef = useRef(null)
    const inView = useInView(headRef, { once: true })

    return (
        <section id="services" style={{
            position: 'relative',
            padding: '72px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
        }}>
            {/* Section-wide multi-glow */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', top: '25%', left: '20%',
                    width: 600, height: 400,
                    background: 'radial-gradient(ellipse, rgba(100,50,220,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none', zIndex: 0,
                }}
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{
                    position: 'absolute', top: '50%', right: '15%',
                    width: 500, height: 400,
                    background: 'radial-gradient(ellipse, rgba(0,180,160,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none', zIndex: 0,
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div ref={headRef} style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 80px' }}>
                    <motion.div
                        className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                    >
                        UNSERE LEISTUNGEN
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 28 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ fontSize: 'clamp(38px, 5vw, 68px)', marginTop: 24, marginBottom: 22, lineHeight: 1.05, letterSpacing: '-0.03em' }}
                    >
                        Ergebnisse.{' '}
                        <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Nicht nur Services.
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(255,255,255,0.42)', maxWidth: 540, margin: '0 auto' }}
                    >
                        Wir bauen Lösungen für echtes Wachstum. Immer mit festen Deadlines, klarem ROI und schnellem Prototyp.
                    </motion.p>
                </div>

                {/* Cards grid */}
                <div className="outcomes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28, alignItems: 'stretch' }}>
                    {outcomes.map((o, i) => <GlassCard key={i} o={o} i={i} />)}
                </div>

                {/* Bottom CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    style={{
                        marginTop: 60,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 24, padding: '28px 40px',
                        borderRadius: 24,
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 4px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)',
                        flexWrap: 'wrap',
                    }}
                >
                    <div style={{ fontSize: 17, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                        Nicht sicher, was zu Ihrem Problem passt?
                    </div>
                    <a href="#contact">
                        <button className="btn-primary" style={{ fontSize: 14, padding: '13px 26px', borderRadius: 50 }}>
                            Kostenlos beraten lassen →
                        </button>
                    </a>
                </motion.div>
            </div>

            <style>{`
                .outcomes-grid {
                    align-items: stretch;
                }
                .outcome-card-outer {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .outcome-card-inner {
                    flex: 1;
                    height: 100% !important;
                }
                /* CSS-only glow orbs — no JS */
                .outcome-orb {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                    filter: blur(55px);
                }
                .outcome-orb-primary {
                    top: 5%; left: -8%;
                    width: 60%; height: 60%;
                    opacity: 0.6;
                    animation: orbPulse 6s ease-in-out infinite;
                }
                .outcome-orb-secondary {
                    bottom: 0%; right: -8%;
                    width: 50%; height: 50%;
                    opacity: 0.4;
                    animation: orbPulse 8s ease-in-out infinite 1.5s;
                }
                .outcome-orb-sec-1 { animation-delay: 0.8s; }
                .outcome-orb-sec-2 { animation-delay: 1.2s; }
                .outcome-orb-sec-3 { animation-delay: 1.8s; }
                @keyframes orbPulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.15); opacity: 0.75; }
                }
                @media (max-width: 860px) {
                    .outcomes-grid { grid-template-columns: 1fr !important; }
                    #services { padding: 80px 0; }
                }
            `}</style>
        </section>
    )
}
