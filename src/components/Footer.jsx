import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const footerLinks = {
    'Navigation': [
        { label: 'Prozess', href: '#process' },
        { label: 'Services', href: '#services' },
        { label: 'Integration', href: '#integration' },
        { label: 'Kontakt', href: '#contact' },
        { label: 'Pilotprojekt', href: '/pilot', isRoute: true },
    ],
    'Leistungen': [
        { label: 'KI-Animationsads', href: '#services' },
        { label: 'Social Ads & Content', href: '#services' },
        { label: 'KI Chatbot / Agent', href: '#services' },
        { label: 'Custom Apps & MVPs', href: '#services' },
    ],
    'Unternehmen': [
        { label: 'Über uns', href: '#' },
        { label: 'Team', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
    ],
}

export default function Footer() {
    return (
        <footer style={{
            position: 'relative',
            padding: '80px 0 36px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
        }}>
            {/* Background glow */}
            <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: 1000, height: 300,
                background: 'radial-gradient(ellipse, rgba(60,30,140,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Top shine divider */}
            <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Main grid */}
                <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '48px', marginBottom: '60px' }}>

                    {/* Brand column */}
                    <div>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 10,
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                backdropFilter: 'blur(12px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                                overflow: 'hidden',
                            }}>
                                <img src="/logo.png" alt="prodone.ai" style={{ width: 34, height: 34, objectFit: 'contain' }} />
                            </div>
                            <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em' }}>
                                prodone<span style={{ color: 'rgba(255,255,255,0.35)' }}>.ai</span>
                            </span>
                        </Link>

                        <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.35)', maxWidth: '260px', marginBottom: '28px' }}>
                            Fast Forward Artificial Intelligence. Custom AI solutions with a 3-day prototype guarantee.
                        </p>

                        {/* Social icons */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {['in', 'X', 'gh'].map((s) => (
                                <div key={s} style={{
                                    width: 36, height: 36, borderRadius: 10,
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.04)',
                                    backdropFilter: 'blur(10px)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.35)',
                                    cursor: 'pointer', transition: 'all 0.3s',
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                                        e.currentTarget.style.color = '#fff'
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                                        e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                                    }}
                                >{s}</div>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '20px' }}>
                                {group}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {links.map(link => (
                                    link.isRoute ? (
                                        <Link key={link.label} to={link.href}
                                            style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', transition: 'color 0.25s' }}
                                            onMouseEnter={e => e.target.style.color = '#fff'}
                                            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
                                        >{link.label}</Link>
                                    ) : (
                                        <a key={link.label} href={link.href}
                                            style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', transition: 'color 0.25s' }}
                                            onMouseEnter={e => e.target.style.color = '#fff'}
                                            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
                                        >{link.label}</a>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)', marginBottom: '28px' }} />

                <div className="footer-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
                        © 2026 prodone.ai · Fast Forward Artificial Intelligence GmbH
                    </div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {['Datenschutzerklärung', 'AGBs', 'Impressum'].map(l => (
                            <a key={l} href="#"
                                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', transition: 'color 0.25s' }}
                                onMouseEnter={e => e.target.style.color = '#fff'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
                            >{l}</a>
                        ))}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>
                        🇩🇪 Designed in Mannheim
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 860px) {
                    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px 40px !important; }
                }
                @media (max-width: 480px) {
                    .footer-grid { grid-template-columns: 1fr !important; }
                    .footer-bottom { flex-direction: column; align-items: flex-start !important; gap: 10px; }
                }
            `}</style>
        </footer>
    )
}
