/* ── Page Skeleton (Suspense fallback) ─────────────────
   Mimics the Hero layout so the route-transition feels
   instant rather than showing a black void.
   All animation is pure CSS — zero JS cost.
─────────────────────────────────────────────────────── */

const SHIMMER = `
@keyframes shimmer {
  0%   { background-position: -600px 0 }
  100% { background-position:  600px 0 }
}
.sk {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.09) 50%,
    rgba(255,255,255,0.04) 75%
  );
  background-size: 600px 100%;
  animation: shimmer 1.6s infinite linear;
  border-radius: 8px;
}
`

function Sk({ w = '100%', h = 16, r = 8, style = {} }) {
    return (
        <div className="sk" style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} />
    )
}

export default function PageSkeleton() {
    return (
        <>
            <style>{SHIMMER}</style>

            <div style={{
                minHeight: '100vh',
                background: '#000',
                overflow: 'hidden',
                position: 'relative',
            }}>
                {/* Ambient blue fog */}
                <div style={{
                    position: 'absolute', top: '10%', left: '-5%',
                    width: '55vw', height: '55vw',
                    background: 'radial-gradient(circle, rgba(1,115,211,0.10) 0%, transparent 70%)',
                    filter: 'blur(40px)', pointerEvents: 'none',
                }} />

                {/* ── Navbar skeleton ── */}
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0,
                    height: 64, zIndex: 100,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center',
                    padding: '0 64px', gap: 32,
                }}>
                    <Sk w={120} h={22} r={6} />
                    <div style={{ flex: 1 }} />
                    {[80, 70, 80, 64, 90].map((w, i) => <Sk key={i} w={w} h={14} r={4} />)}
                    <div style={{ flex: 1 }} />
                    <Sk w={140} h={36} r={50} />
                </div>

                {/* ── Hero skeleton ── */}
                <div className="page-skeleton-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 80,
                    alignItems: 'center',
                    minHeight: '100vh',
                    padding: '110px 64px 100px',
                    maxWidth: 1440, margin: '0 auto',
                }}>
                    {/* Left col */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {/* Badge */}
                        <Sk w={200} h={28} r={50} style={{ marginBottom: 32 }} />
                        {/* H1 lines */}
                        <Sk w="90%" h={56} r={10} style={{ marginBottom: 14 }} />
                        <Sk w="80%" h={56} r={10} style={{ marginBottom: 14 }} />
                        <Sk w="60%" h={56} r={10} style={{ marginBottom: 28 }} />
                        {/* Subtitle */}
                        <Sk w="95%" h={16} r={5} style={{ marginBottom: 10 }} />
                        <Sk w="85%" h={16} r={5} style={{ marginBottom: 10 }} />
                        <Sk w="65%" h={16} r={5} style={{ marginBottom: 44 }} />
                        {/* CTAs */}
                        <div style={{ display: 'flex', gap: 14, marginBottom: 48 }}>
                            <Sk w={190} h={52} r={50} />
                            <Sk w={150} h={52} r={50} />
                        </div>
                        {/* Stat chips */}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{
                                    flex: '1 1 auto', minWidth: 100,
                                    padding: '16px 22px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: 16,
                                    display: 'flex', flexDirection: 'column', gap: 8,
                                }}>
                                    <Sk w={60} h={32} r={6} />
                                    <Sk w={80} h={10} r={4} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right col — video card */}
                    <div style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        borderRadius: 28,
                        padding: 28,
                        display: 'flex', flexDirection: 'column', gap: 16,
                    }}>
                        {/* Card header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <Sk w={140} h={14} r={4} />
                                <Sk w={100} h={11} r={4} />
                            </div>
                            <Sk w={60} h={26} r={50} />
                        </div>
                        {/* Video placeholder */}
                        <Sk w="100%" h={200} r={16} />
                        {/* Metric bars */}
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Sk w={70} h={11} r={4} />
                                    <Sk w={40} h={11} r={4} />
                                </div>
                                <Sk w="100%" h={3} r={4} />
                            </div>
                        ))}
                        {/* Footer */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <Sk w={120} h={11} r={4} />
                            <Sk w={80} h={11} r={4} />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 960px) {
                    .page-skeleton-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 90px 32px 60px !important; }
                    .page-skeleton-grid > div:last-child { display: none; }
                }
                @media (max-width: 480px) {
                    .page-skeleton-grid { padding: 90px 16px 48px !important; }
                }
            `}</style>
        </>
    )
}
