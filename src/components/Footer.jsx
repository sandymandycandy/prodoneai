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
            <div style={{ position: 'absolute', top: '20%', left: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(1,115,211,0.05) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            {/* Top divider — blue accent instead of plain white */}
            <div style={{
                position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.5), rgba(96,165,250,0.3), rgba(1,115,211,0.5), transparent)',
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

                        <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.35)', maxWidth: '260px', marginBottom: '20px' }}>
                            {ft.desc}
                        </p>

                        {/* Live status badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 7,
                            padding: '6px 12px', borderRadius: 50,
                            background: 'rgba(1,115,211,0.08)',
                            border: '1px solid rgba(1,115,211,0.22)',
                            fontSize: 11, fontWeight: 600,
                            color: '#60a5fa',
                            marginBottom: '24px',
                        }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0173D3', boxShadow: '0 0 6px rgba(1,115,211,0.8)', animation: 'pulse-dot 2.2s infinite' }} />
                            All systems operational
                        </div>

                        {/* Social icons */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {[
                                { label: 'LinkedIn', href: '#', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                                { label: 'X', href: '#', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                                { label: 'GitHub', href: '#', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
                            ].map(s => (
                                <a key={s.label} href={s.href} aria-label={s.label} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(255,255,255,0.04)',
                                        backdropFilter: 'blur(10px)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'rgba(255,255,255,0.35)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'rgba(1,115,211,0.5)'
                                            e.currentTarget.style.color = '#60a5fa'
                                            e.currentTarget.style.background = 'rgba(1,115,211,0.08)'
                                            e.currentTarget.style.transform = 'scale(1.12) translateY(-2px)'
                                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(1,115,211,0.2)'
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                                            e.currentTarget.style.transform = ''
                                            e.currentTarget.style.boxShadow = ''
                                        }}
                                    >{s.icon}</div>
                                </a>
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
                <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.3), rgba(255,255,255,0.06), rgba(1,115,211,0.3), transparent)', marginBottom: '28px' }} />

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
