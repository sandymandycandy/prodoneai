const clients = [
    { name: 'Globus',       src: '/clients/globus.png'         },
    { name: 'AWS',          src: '/clients/aws.jpg'            },
    { name: 'DHBW',         src: '/clients/dhbw.svg'           },
    { name: 'Hassan Michl', src: '/clients/hassan-michl.webp'  },
    { name: 'Orr Motors',   src: '/clients/orr-motors.png'     },
    { name: 'Prio',         src: '/clients/prio.png'           },
    { name: 'SH Group',     src: '/clients/sh-group.png'       },
    { name: 'Streetdrive',  src: '/clients/streetdrive.webp'   },
    { name: 'ACAS',         src: '/clients/acas.png'           },
]

const track = [...clients, ...clients]

export default function TrustedBy() {
    return (
        <section style={{
            padding: '56px 0',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Full-width top border with blue fade-in from center */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent 0%, rgba(1,115,211,0.4) 30%, rgba(1,115,211,0.4) 70%, transparent 100%)',
            }} />
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent 100%)',
            }} />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '-80%', left: '35%',
                width: 600, height: 400,
                background: 'radial-gradient(ellipse, rgba(1,115,211,0.06) 0%, transparent 65%)',
                pointerEvents: 'none',
            }} />

            <div className="trusted-layout" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 40,
                maxWidth: 1440,
                margin: '0 auto',
                padding: '0 64px',
            }}>
                {/* Left: editorial label block */}
                <div className="trusted-label" style={{ flexShrink: 0, minWidth: 160 }}>
                    {/* Index number — editorial touch */}
                    <div style={{
                        fontSize: 10, fontWeight: 700,
                        color: '#0173D3',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        marginBottom: 10,
                    }}>01</div>

                    <p style={{
                        fontSize: 15, fontWeight: 800,
                        color: '#fff',
                        letterSpacing: '-0.02em', lineHeight: 1.25,
                        marginBottom: 10,
                    }}>
                        Trusted by<br />Industry<br />Leaders
                    </p>

                    {/* Client count badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '5px 11px', borderRadius: 50,
                        background: 'rgba(1,115,211,0.09)',
                        border: '1px solid rgba(1,115,211,0.25)',
                        fontSize: 10, fontWeight: 700,
                        color: '#60a5fa',
                        letterSpacing: '0.06em',
                    }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 6px rgba(96,165,250,0.8)', animation: 'pulse-dot 2.2s infinite' }} />
                        9 clients
                    </div>
                </div>

                {/* Vertical divider */}
                <div className="trusted-divider" style={{
                    width: 1, height: 64, flexShrink: 0,
                    background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)',
                }} />

                {/* Scrolling logo strip */}
                <div style={{
                    flex: 1, overflow: 'hidden',
                    maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
                }}>
                    <div className="clients-marquee">
                        {track.map((c, i) => (
                            <div key={i} className="client-logo-wrap">
                                <div className="client-logo-skeleton" />
                                <img
                                    src={c.src}
                                    alt={c.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="client-logo-img"
                                    onLoad={e => {
                                        e.currentTarget.classList.add('loaded')
                                        e.currentTarget.previousSibling.style.display = 'none'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .clients-marquee {
                    display: flex;
                    align-items: center;
                    gap: 60px;
                    width: max-content;
                    animation: clients-scroll 30s linear infinite;
                }
                .clients-marquee:hover { animation-play-state: paused; }
                .client-logo-wrap {
                    height: 36px;
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                    cursor: pointer;
                    position: relative;
                }
                @keyframes logo-shimmer {
                    0%   { background-position: -200px 0; }
                    100% { background-position:  200px 0; }
                }
                .client-logo-skeleton {
                    position: absolute;
                    width: 80px; height: 22px;
                    border-radius: 4px;
                    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
                    background-size: 200px 100%;
                    animation: logo-shimmer 1.4s infinite linear;
                }
                .client-logo-img {
                    position: relative;
                    height: 30px;
                    width: auto;
                    max-width: 130px;
                    object-fit: contain;
                    filter: brightness(0) invert(1);
                    opacity: 0;
                    transition: opacity 0.5s ease, transform 0.35s cubic-bezier(0.23,1,0.32,1);
                }
                .client-logo-img.loaded {
                    opacity: 0.32;
                }
                .client-logo-wrap:hover .client-logo-img {
                    opacity: 0.88;
                    transform: scale(1.1) translateY(-2px);
                    filter: brightness(0) invert(1) drop-shadow(0 0 8px rgba(1,115,211,0.4));
                }
                @keyframes clients-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @media (max-width: 768px) {
                    .trusted-layout { flex-direction: column; align-items: flex-start; gap: 20px; padding: 0 20px; }
                    .trusted-divider { display: none; }
                    .trusted-label { min-width: unset; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
                    .client-logo-img { height: 22px; }
                    .clients-marquee { gap: 40px; }
                }
                @media (max-width: 480px) {
                    .trusted-layout { padding: 0 16px; }
                }
            `}</style>
        </section>
    )
}
