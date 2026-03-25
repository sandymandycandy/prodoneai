const clients = [
    { name: 'Globus',        src: '/clients/globus.png' },
    { name: 'AWS',           src: '/clients/aws.jpg' },
    { name: 'DHBW',          src: '/clients/dhbw.svg' },
    { name: 'Hassan Michl',  src: '/clients/hassan-michl.webp' },
    { name: 'Orr Motors',    src: '/clients/orr-motors.png' },
    { name: 'Prio',          src: '/clients/prio.png' },
    { name: 'SH Group',      src: '/clients/sh-group.png' },
    { name: 'Streetdrive',   src: '/clients/streetdrive.webp' },
    { name: 'ACAS',          src: '/clients/acas.png' },
]

// Duplicate for seamless loop
const track = [...clients, ...clients]

export default function TrustedBy() {
    return (
        <section style={{
            padding: '48px 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 48,
                maxWidth: 1440,
                margin: '0 auto',
                padding: '0 64px',
                flexWrap: 'wrap',
            }}>
                {/* Label */}
                <p style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                }}>
                    Trusted by
                </p>

                {/* Scrolling logo strip */}
                <div style={{ flex: 1, overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
                    <div className="clients-marquee">
                        {track.map((c, i) => (
                            <div key={i} className="client-logo-wrap">
                                <img
                                    src={c.src}
                                    alt={c.name}
                                    loading="lazy"
                                    className="client-logo-img"
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
                    gap: 56px;
                    width: max-content;
                    animation: clients-scroll 28s linear infinite;
                }
                .clients-marquee:hover {
                    animation-play-state: paused;
                }
                .client-logo-wrap {
                    height: 32px;
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }
                .client-logo-img {
                    height: 28px;
                    width: auto;
                    max-width: 120px;
                    object-fit: contain;
                    filter: brightness(0) invert(1);
                    opacity: 0.4;
                    transition: opacity 0.3s ease;
                }
                .client-logo-wrap:hover .client-logo-img {
                    opacity: 0.85;
                }
                @keyframes clients-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @media (max-width: 768px) {
                    .client-logo-img { height: 22px; }
                    .clients-marquee { gap: 40px; }
                }
            `}</style>
        </section>
    )
}
