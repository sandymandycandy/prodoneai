import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let raf, w, h
        const mouse = { x: null, y: null }

        class Particle {
            constructor() { this.init() }
            init() {
                this.x = Math.random() * w; this.y = Math.random() * h
                this.vx = (Math.random() - 0.5) * 0.28; this.vy = (Math.random() - 0.5) * 0.28
                this.r = Math.random() * 1.2 + 0.3
                this.a = Math.random() * 0.45 + 0.1
                const pick = Math.random()
                if (pick < 0.5) this.hue = '255,255,255'
                else if (pick < 0.75) this.hue = '160,120,255'
                else this.hue = '80,160,255'
            }
            update() {
                this.x += this.vx; this.y += this.vy
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x, dy = this.y - mouse.y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 120) { const f = (120 - d) / 120; this.x += dx / d * f * 1.5; this.y += dy / d * f * 1.5 }
                }
                if (this.x < 0) this.x = w; if (this.x > w) this.x = 0
                if (this.y < 0) this.y = h; if (this.y > h) this.y = 0
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${this.hue},${this.a})`; ctx.fill()
            }
        }

        const init = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }
        let particles = []
        const build = () => { particles = Array.from({ length: Math.min(Math.floor((w * h) / 32000), 28) }, () => new Particle()) }
        init(); build()

        const CONNECT_DIST = 90
        const render = () => {
            ctx.clearRect(0, 0, w, h)
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(); particles[i].draw()
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < CONNECT_DIST) {
                        const alpha = 0.12 * (1 - dist / CONNECT_DIST)
                        if (alpha > 0.02) {
                            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
                            ctx.strokeStyle = `rgba(180,140,255,${alpha})`; ctx.lineWidth = 0.5; ctx.stroke()
                        }
                    }
                }
            }
            raf = requestAnimationFrame(render)
        }
        render()

        const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
        const onLeave = () => { mouse.x = null; mouse.y = null }
        const onResize = () => { init(); build() }

        window.addEventListener('resize', onResize)
        canvas.addEventListener('mousemove', onMove)
        canvas.addEventListener('mouseleave', onLeave)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', onResize)
            canvas.removeEventListener('mousemove', onMove)
            canvas.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    if (isMobile) return null

    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'auto' }} />
}
