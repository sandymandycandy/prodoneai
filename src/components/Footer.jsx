import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
    const { lang, translations } = useLanguage()
    const ft = translations[lang].footer

    const footerLinks = {
        [ft.navGroup]: [
            { label: ft.navLinks[0], href: '#services' },
            { label: ft.navLinks[1], href: '#contact' },
            { label: ft.navLinks[2], href: '/pilot', isRoute: true },
        ],
        [ft.servicesGroup]: [
            { label: ft.serviceLinks[0], href: '#services' },
            { label: ft.serviceLinks[1], href: '#services' },
            { label: ft.serviceLinks[2], href: '#services' },
            { label: ft.serviceLinks[3], href: '#services' },
        ],
        [ft.companyGroup]: [
            { label: ft.companyLinks[0], href: '#' },
            { label: ft.companyLinks[1], href: '#' },
            { label: ft.companyLinks[2], href: '#' },
            { label: ft.companyLinks[3], href: '#' },
        ],
    }

    return (
        <footer style={{
            position: 'relative',
            padding: '80px 0 36px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
        }}>
            {/* Glass backdrop blobs */}
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 1200, height: 400, background: 'radial-gradient(ellipse, rgba(1,115,211,0.10) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: '20%', left: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(80,40,200,0.05) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

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
                            {ft.desc}
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
                                            className="footer-link-hover"
                                            style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', transition: 'color 0.25s' }}
                                            onMouseEnter={e => e.target.style.color = '#fff'}
                                            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
                                        >{link.label}</Link>
                                    ) : (
                                        <a key={link.label} href={link.href}
                                            className="footer-link-hover"
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
                        {ft.copyright}
                    </div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {ft.legal.map(l => (
                            <a key={l} href="#"
                                className="footer-link-hover"
                                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', transition: 'color 0.25s' }}
                                onMouseEnter={e => e.target.style.color = '#fff'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
                            >{l}</a>
                        ))}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>
                        {ft.madeIn}
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
