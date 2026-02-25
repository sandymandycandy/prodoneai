import { motion } from 'framer-motion'

const clients = [
    {
        name: 'Globus', isMain: true, element: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src="/globus-logo.svg" alt="Globus Logo" style={{ width: 40, height: 'auto', display: 'block' }} />
                <span style={{ fontSize: 20, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.02em' }}>Globus</span>
            </div>
        )
    },
    { name: 'TechFlow', element: <span style={{ fontSize: 19, fontWeight: 700, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '-0.02em' }}>TechFlow_</span> },
    { name: 'Aura', element: <span style={{ fontSize: 22, fontWeight: 400, fontFamily: 'serif', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Aura</span> },
    { name: 'Nexus', element: <span style={{ fontSize: 20, fontWeight: 900, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>NEXUS</span> },
    { name: 'Zephyr', element: <span style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '-0.04em' }}>Zephyr</span> },
]

export default function TrustedBy() {
    return (
        <section style={{
            padding: '40px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.03)',
            background: 'rgba(255,255,255,0.01)',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                    Trusted by innovative teams
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(30px, 5vw, 60px)', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {clients.map((client, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                filter: client.isMain ? 'none' : 'grayscale(100%) opacity(0.7)',
                                transition: 'filter 0.3s',
                                cursor: 'default'
                            }}
                            onMouseEnter={e => e.currentTarget.style.filter = 'none'}
                            onMouseLeave={e => e.currentTarget.style.filter = client.isMain ? 'none' : 'grayscale(100%) opacity(0.7)'}
                        >
                            {client.element}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
