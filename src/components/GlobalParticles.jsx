import { useEffect, useRef } from 'react'

/**
 * GlobalParticles — a fixed full-page canvas that renders a very subtle
 * slow-drifting particle field behind all sections of the landing page.
 * Kept intentionally sparse/dim so it never competes with content.
 */
export default function GlobalParticles() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let raf, w, h

        const resize = () => {
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
        }
        resize()

        /* ── particle pool ── */
        const COUNT = 55
        const pts = Array.from({ length: COUNT }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.4 + 0.3,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            // colour: mostly white, occasional purple or cyan accent
            hue: (() => {
                const p = Math.random()
                if (p < 0.60) return '255,255,255'
                if (p < 0.80) return '180,130,255'
                return '80,200,255'
            })(),
            a: Math.random() * 0.22 + 0.04,
        }))

        const LINK = 110   // max distance for drawing a connecting line

        const tick = () => {
            ctx.clearRect(0, 0, w, h)

            /* move */
            for (const p of pts) {
                p.x += p.vx
                p.y += p.vy
                if (p.x < 0) p.x = w
                if (p.x > w) p.x = 0
                if (p.y < 0) p.y = h
                if (p.y > h) p.y = 0
            }

            /* lines */
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x
                    const dy = pts[i].y - pts[j].y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < LINK) {
                        const alpha = 0.07 * (1 - d / LINK)
                        ctx.beginPath()
                        ctx.moveTo(pts[i].x, pts[i].y)
                        ctx.lineTo(pts[j].x, pts[j].y)
                        ctx.strokeStyle = `rgba(160,120,255,${alpha})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }

            /* dots */
            for (const p of pts) {
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${p.hue},${p.a})`
                ctx.fill()
            }

            raf = requestAnimationFrame(tick)
        }
        tick()

        window.addEventListener('resize', resize)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}
