import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import CTABlock from '../components/CTABlock'

/* ─── Static visual config (colours never change) ───── */
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
    { icon: '🎬', color: 'rgba(160,120,255,0.15)', border: 'rgba(160,120,255,0.25)' },
    { icon: '📋', color: 'rgba(80,160,255,0.15)', border: 'rgba(80,160,255,0.25)' },
    { icon: '🎵', color: 'rgba(0,210,180,0.15)', border: 'rgba(0,210,180,0.25)' },
    { icon: '📦', color: 'rgba(255,180,60,0.15)', border: 'rgba(255,180,60,0.25)' },
    { icon: '📊', color: 'rgba(255,100,100,0.15)', border: 'rgba(255,100,100,0.25)' },
    { icon: '♻️', color: 'rgba(0,200,140,0.15)', border: 'rgba(0,200,140,0.25)' },
]

/* metric icons + delta badges for compare cards */
const compareIcons = ['⏱️', '💸', '🎯', '📣']
const compareDelta = ['-95%', '-70%', '+625%', '+340%']

/* ─── Premium split Compare Card ────────────────────── */
function CompareCard({ item, i, inView, beforeLabel, afterLabel }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'relative' }}
        >
            <div style={{
                borderRadius: 24, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'rgba(255,255,255,0.025)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
            }}>
                {/* Top shine */}
                <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }} />

                {/* Header row — icon + label + delta badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{
                        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                    }}>{compareIcons[i]}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {item.label}
                    </div>
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.45 + i * 0.12, type: 'spring', bounce: 0.55 }}
                        style={{
                            marginLeft: 'auto', padding: '3px 11px', borderRadius: 50,
                            background: 'rgba(0,200,140,0.12)', border: '1px solid rgba(0,200,140,0.3)',
                            fontSize: 11, fontWeight: 800, color: 'rgba(80,220,160,0.95)',
                            boxShadow: '0 0 10px rgba(0,200,140,0.15)',
                        }}
                    >{compareDelta[i]}</motion.div>
                </div>

                {/* Split body: BEFORE | arrow | AFTER */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 36px 1fr' }}>

                    {/* BEFORE panel */}
                    <div style={{ padding: '20px 22px', background: 'rgba(255,50,50,0.04)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,100,100,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                            {beforeLabel}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: -14 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
                            style={{
                                fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 900,
                                color: 'rgba(255,110,110,0.65)',
                                letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 12,
                                textDecoration: 'line-through',
                                textDecorationColor: 'rgba(255,80,80,0.3)',
                            }}
                        >{item.before}</motion.div>
                        {/* Red bar */}
                        <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={inView ? { width: '88%' } : {}}
                                transition={{ delay: 0.5 + i * 0.1, duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
                                style={{ height: '100%', background: 'linear-gradient(90deg,rgba(255,80,80,0.55),rgba(255,150,80,0.45))', borderRadius: 4 }}
                            />
                        </div>
                    </div>

                    {/* Centre arrow */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.015)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ fontSize: 16, filter: 'drop-shadow(0 0 6px rgba(0,200,140,0.6))', color: 'rgba(80,220,160,0.8)' }}
                        >→</motion.div>
                    </div>

                    {/* AFTER panel */}
                    <div style={{ padding: '20px 22px', background: 'rgba(0,200,140,0.04)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(80,220,160,0.65)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                            prodone.ai
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 14 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }}
                            style={{
                                fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 900,
                                color: 'rgba(80,220,160,1)',
                                letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 12,
                                filter: 'drop-shadow(0 0 14px rgba(0,200,140,0.4))',
                            }}
                        >{item.after}</motion.div>
                        {/* Green bar */}
                        <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={inView ? { width: '38%' } : {}}
                                transition={{ delay: 0.65 + i * 0.1, duration: 1.3, ease: [0.23, 1, 0.32, 1] }}
                                style={{ height: '100%', background: 'linear-gradient(90deg,rgba(0,200,140,0.75),rgba(80,240,180,0.6))', borderRadius: 4 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

/* ─── Page ───────────────────────────────────────────── */
export default function Pilot() {
    useEffect(() => { window.scrollTo(0, 0) }, [])
    const { t, lang, translations } = useLanguage()
    const p = translations[lang].pilot

    const heroRef = useRef(null)
    const heroInView = useInView(heroRef, { once: true })
    const processRef = useRef(null)
    const processInView = useInView(processRef, { once: true, margin: '-60px' })
    const resultsRef = useRef(null)
    const resultsInView = useInView(resultsRef, { once: true })

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

            {/* ══ HERO ══════════════════════════════════════════════ */}
            <section style={{ paddingTop: 120, paddingBottom: 100, position: 'relative', overflow: 'hidden' }}>
                <div className="grid-overlay" style={{ opacity: 0.25 }} />
                {/* Radial glows */}
                <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: 800, height: 800, background: 'radial-gradient(circle, rgba(120,80,255,0.14) 0%, transparent 65%)', filter: 'blur(30px)', pointerEvents: 'none', animation: 'orbPulse 10s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', bottom: '0%', left: '-8%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,180,255,0.1) 0%, transparent 65%)', filter: 'blur(30px)', pointerEvents: 'none', animation: 'orbPulse 13s ease-in-out infinite 3s' }} />

                <div className="container" ref={heroRef} style={{ position: 'relative', zIndex: 1 }}>
                    {/* Breadcrumb */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 28 }}>
                        <a href="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}>prodone.ai</a>
                        <span>›</span><span>{p.breadcrumb}</span>
                    </motion.div>

                    <div className="pilot-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
                        {/* LEFT */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                className="section-label" style={{ marginBottom: 28 }}>
                                {p.heroLabel}
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.9 }}
                                style={{ fontSize: 'clamp(32px, 4.2vw, 56px)', marginBottom: 22, lineHeight: 1.08, letterSpacing: '-0.04em' }}>
                                {p.heroTitle1}{' '}
                                <span style={{ background: 'linear-gradient(135deg,rgba(160,120,255,1) 0%,rgba(80,180,255,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {p.heroTitle2}
                                </span>{' '}
                                {p.heroTitle3}
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.22 }}
                                style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', marginBottom: 36 }}>
                                {p.heroDesc} <strong style={{ color: '#fff' }}>{p.heroDescBold}</strong>{p.heroDescEnd}
                            </motion.p>

                            {/* Context chips */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.32 }}
                                style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
                                {p.chips.map(([icon, text]) => (
                                    <div key={text} style={{
                                        display: 'flex', alignItems: 'center', gap: 7,
                                        padding: '7px 14px', borderRadius: 50,
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        fontSize: 13, color: 'rgba(255,255,255,0.6)',
                                    }}>
                                        <span>{icon}</span><span>{text}</span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Floating mini-stats row */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.42 }}
                                style={{ display: 'flex', gap: 12 }}>
                                {p.results.map((r, i) => (
                                    <div key={i} style={{
                                        flex: 1, padding: '14px 10px', borderRadius: 16, textAlign: 'center',
                                        background: resultColors[i].bg,
                                        border: `1px solid ${resultColors[i].glow}`,
                                        backdropFilter: 'blur(10px)',
                                    }}>
                                        <div style={{ fontSize: 18, fontWeight: 900, color: resultColors[i].color, letterSpacing: '-0.02em', lineHeight: 1 }}>{r.stat}</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* RIGHT — glass campaign card */}
                        <motion.div initial={{ opacity: 0, x: 60, scale: 0.93 }} animate={heroInView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ delay: 0.28, duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
                            style={{ position: 'relative' }}>
                            {/* Glow halo */}
                            <div style={{ position: 'absolute', top: '15%', left: '5%', width: '90%', height: '75%', background: 'rgba(120,80,255,0.25)', borderRadius: '50%', filter: 'blur(55px)', pointerEvents: 'none', animation: 'orbPulse 6s ease-in-out infinite' }} />

                            <div style={{
                                position: 'relative', zIndex: 1,
                                padding: '40px', borderRadius: 32,
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                                border: '1px solid rgba(255,255,255,0.13)',
                                boxShadow: '0 24px 70px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
                                overflow: 'hidden', willChange: 'transform',
                            }}>
                                {/* Top shimmer line */}
                                <div style={{ position: 'absolute', top: 0, left: '12%', right: '12%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)' }} />

                                {/* Campaign header */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(140,100,255,0.15)', border: '1px solid rgba(140,100,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🎬</div>
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{p.cardTitle}</div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>{p.cardSub}</div>
                                    </div>
                                    <div style={{ marginLeft: 'auto', padding: '5px 12px', borderRadius: 50, background: 'rgba(50,200,130,0.1)', border: '1px solid rgba(50,200,130,0.25)', fontSize: 10, fontWeight: 700, color: 'rgba(80,220,150,0.9)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.cardLive}</div>
                                </div>

                                {/* Divider */}
                                <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 28 }} />

                                {/* Big stats */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                                    {p.results.map((r, i) => (
                                        <div key={i} style={{ padding: '18px 16px', borderRadius: 18, background: resultColors[i].bg, border: `1px solid ${resultColors[i].color.replace('1)', '0.2)')}`, textAlign: 'center' }}>
                                            <div style={{ fontSize: 22, marginBottom: 6 }}>{resultColors[i].icon}</div>
                                            <div style={{ fontSize: 22, fontWeight: 900, color: resultColors[i].color, lineHeight: 1, letterSpacing: '-0.02em' }}>{r.stat}</div>
                                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Campaign specs */}
                                <div style={{ padding: '16px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{p.cardScope}</div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                                        {p.cardScopeDesc}<br />
                                        <span style={{ color: 'rgba(100,220,160,0.8)' }}>{p.cardScopeReady}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══ PROCESS TIMELINE ════════════════════════════════ */}
            <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} ref={processRef}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 72 }}>
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} className="section-label" style={{ margin: '0 auto 20px' }}>
                            {p.processLabel}
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.9 }}
                            style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', letterSpacing: '-0.035em' }}>
                            {p.processTitle1}{' '}
                            <span style={{ background: 'linear-gradient(135deg,rgba(0,210,180,1),rgba(80,160,255,1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {p.processTitle2}
                            </span>
                        </motion.h2>
                    </div>

                    {/* Timeline steps */}
                    <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
                        {/* Vertical connector line */}
                        <div style={{ position: 'absolute', left: 28, top: 48, bottom: 48, width: 2, background: 'linear-gradient(180deg, rgba(160,120,255,0.4), rgba(80,160,255,0.4), rgba(0,210,180,0.4), rgba(255,180,60,0.4))', borderRadius: 2, pointerEvents: 'none' }} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {p.processSteps.map((item, i) => {
                                const vc = stepColors[i]
                                return (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={processInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.15 + i * 0.12, duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
                                        style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}
                                    >
                                        {/* Node */}
                                        <div style={{ flexShrink: 0, width: 58, height: 58, borderRadius: 18, background: vc.bg, border: `1.5px solid ${vc.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, zIndex: 1, boxShadow: `0 0 24px ${vc.glow}`, position: 'relative' }}>
                                            {vc.icon}
                                        </div>

                                        {/* Card */}
                                        <motion.div
                                            whileHover={{ x: 6 }}
                                            transition={{ duration: 0.25 }}
                                            style={{
                                                flex: 1, padding: '22px 28px', borderRadius: 20,
                                                background: `linear-gradient(135deg, ${vc.bg}, rgba(255,255,255,0.02))`,
                                                border: `1px solid ${vc.color.replace('1)', '0.18)')}`,
                                                backdropFilter: 'blur(10px)',
                                                boxShadow: `0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)`,
                                                willChange: 'transform',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <span style={{ fontSize: 10, fontWeight: 800, color: vc.color, letterSpacing: '0.12em' }}>STEP {String(i + 1).padStart(2, '0')}</span>
                                                    <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{item.title}</span>
                                                </div>
                                                <span style={{ fontSize: 11, color: vc.color, padding: '4px 12px', borderRadius: 50, background: vc.bg, border: `1px solid ${vc.color.replace('1)', '0.2)')}` }}>
                                                    {item.tag}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.42)', margin: 0 }}>{item.desc}</p>
                                        </motion.div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Timeline end badge */}
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={processInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.75, duration: 0.6, type: 'spring', bounce: 0.4 }}
                            style={{ marginTop: 28, marginLeft: 82, padding: '16px 24px', borderRadius: 16, background: 'rgba(100,220,160,0.07)', border: '1px solid rgba(100,220,160,0.2)', backdropFilter: 'blur(10px)', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 18 }}>🟢</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(100,220,160,0.9)' }}>{p.processEnd}</span>
                        </motion.div>
                    </div>

                    {/* Deliverables grid */}
                    <div style={{ marginTop: 80 }}>
                        <motion.h3 initial={{ opacity: 0, y: 20 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
                            style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                            {p.deliverablesTitle}
                        </motion.h3>
                        <motion.p initial={{ opacity: 0 }} animate={processInView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
                            style={{ textAlign: 'center', fontSize: 15, color: 'rgba(255,255,255,0.38)', marginBottom: 40 }}>
                            {p.deliverablesSubtitle}
                        </motion.p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                            {p.deliverables.map((d, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                                    animate={processInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                    transition={{ delay: 0.6 + i * 0.07, duration: 0.6 }}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    style={{
                                        padding: '22px 20px', borderRadius: 20,
                                        background: deliverableColors[i].color, border: `1px solid ${deliverableColors[i].border}`,
                                        backdropFilter: 'blur(12px)',
                                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                                        display: 'flex', alignItems: 'center', gap: 16,
                                        willChange: 'transform',
                                    }}>
                                    <div style={{ fontSize: 28, flexShrink: 0 }}>{deliverableColors[i].icon}</div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{d.label}</div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>{d.sub}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ RESULTS ═════════════════════════════════════════ */}
            <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} ref={resultsRef}>
                <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 1000, height: 500, background: 'radial-gradient(ellipse, rgba(100,60,240,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={resultsInView ? { opacity: 1, y: 0 } : {}} className="section-label" style={{ margin: '0 auto 20px' }}>
                            {p.resultsLabel}
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={resultsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                            style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-0.035em' }}>
                            {p.resultsTitle1}{' '}
                            <span style={{ background: 'linear-gradient(135deg,rgba(160,120,255,1),rgba(80,180,255,1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {p.resultsTitle2}
                            </span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} animate={resultsInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                            style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', marginTop: 14 }}>
                            {p.resultsSubtitle}
                        </motion.p>
                    </div>

                    {/* Result stat cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 60 }}>
                        {p.results.map((r, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 32, scale: 0.9 }}
                                animate={resultsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ delay: i * 0.11, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                                whileHover={{ y: -8, scale: 1.03 }}
                                style={{ position: 'relative', willChange: 'transform' }}
                            >
                                {/* Glow */}
                                <div style={{ position: 'absolute', inset: '-8px', borderRadius: 28, background: resultColors[i].bg, filter: 'blur(20px)', opacity: 0.6, pointerEvents: 'none' }} />
                                <div style={{
                                    position: 'relative', zIndex: 1,
                                    padding: '36px 24px', textAlign: 'center',
                                    background: `linear-gradient(160deg, ${resultColors[i].bg}, rgba(255,255,255,0.02))`,
                                    border: `1px solid ${resultColors[i].glow}`,
                                    borderRadius: 24,
                                    boxShadow: `0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)`,
                                    backdropFilter: 'blur(12px)',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: `linear-gradient(90deg,transparent,${resultColors[i].color},transparent)`, opacity: 0.4 }} />
                                    <div style={{ fontSize: 36, marginBottom: 14 }}>{resultColors[i].icon}</div>
                                    <div style={{ fontSize: r.stat.length > 4 ? 36 : 44, fontWeight: 900, lineHeight: 1, marginBottom: 10, color: resultColors[i].color, filter: `drop-shadow(0 0 20px ${resultColors[i].glow})` }}>
                                        {r.stat}
                                    </div>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={resultsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.9 }}
                        style={{
                            padding: '48px 56px', borderRadius: 28,
                            background: 'linear-gradient(135deg, rgba(120,80,255,0.07) 0%, rgba(40,120,255,0.05) 100%)',
                            backdropFilter: 'blur(14px)',
                            border: '1px solid rgba(255,255,255,0.09)',
                            boxShadow: '0 8px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(160,120,255,0.4),transparent)' }} />

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 40 }}>
                            {/* Avatar */}
                            <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: 20, background: 'rgba(140,100,255,0.15)', border: '1.5px solid rgba(140,100,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                                👤
                            </div>
                            <div>
                                {/* Stars */}
                                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} style={{ fontSize: 18, color: '#fbbf24' }}>★</span>
                                    ))}
                                </div>
                                <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', fontStyle: 'italic', marginBottom: 20, maxWidth: 680 }}>
                                    {p.testimonialQuote}
                                </p>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{p.testimonialName}</div>
                                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{p.testimonialCompany}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <CTABlock />

            <style>{`
                @media (max-width: 960px) {
                    .pilot-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
                }
                @media (max-width: 720px) {
                    .pilot-hero-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </motion.main>
    )
}
