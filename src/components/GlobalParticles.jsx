import { useEffect, useRef } from 'react'

/**
 * GlobalParticles — OPTIMIZED version:
 * - Reduced particle count (55 → 30)
 * - Capped at 30fps instead of 60fps
 * - Connecting lines kept but with reduced link distance
 * - Debounced resize handler
 * - Disabled on mobile (≤768px)
 */
export default function GlobalParticles() {
    const canvasRef = useRef(null)

    // Skip on mobile
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return null

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { alpha: true })
        let raf, w, h
        let lastTime = 0
        const FRAME_INTERVAL = 1000 / 30 // 30fps cap

        const resize = () => {
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
        }
        resize()

        /* ── particle pool ── */
        const COUNT = 30
        const pts = Array.from({ length: COUNT }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.4 + 0.3,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            hue: (() => {
                const p = Math.random()
                if (p < 0.60) return '255,255,255'
                if (p < 0.80) return '180,130,255'
                return '80,200,255'
            })(),
            a: Math.random() * 0.22 + 0.04,
        }))

        const LINK = 90   // reduced from 110

        const tick = (timestamp) => {
            raf = requestAnimationFrame(tick)

            // Throttle to 30fps
            if (timestamp - lastTime < FRAME_INTERVAL) return
            lastTime = timestamp

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

            /* lines — kept but with tighter distance threshold */
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x
                    const dy = pts[i].y - pts[j].y
                    const d = dx * dx + dy * dy  // skip sqrt for perf
                    const LINK_SQ = LINK * LINK
                    if (d < LINK_SQ) {
                        const alpha = 0.07 * (1 - Math.sqrt(d) / LINK)
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
        }
        raf = requestAnimationFrame(tick)

        // Debounced resize
        let resizeTimer
        const onResize = () => {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(resize, 200)
        }
        window.addEventListener('resize', onResize)

        return () => {
            cancelAnimationFrame(raf)
            clearTimeout(resizeTimer)
            window.removeEventListener('resize', onResize)
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
