import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ScrollProgress — Premium scroll indicator & back-to-top button
 * - Thin gradient progress bar at the very top of the viewport
 * - Floating "back to top" pill that appears after scrolling 400px
 */
export default function ScrollProgress() {
    const [progress, setProgress] = useState(0)
    const [showTop, setShowTop] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setProgress(pct)
            setShowTop(scrollTop > 400)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <style>{`@keyframes scroll-bar-shimmer { from { background-position: 0% 50%; } to { background-position: 200% 50%; } }`}</style>
            {/* ── Progress Bar ── */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, height: 2,
                zIndex: 10000, pointerEvents: 'none',
                background: 'rgba(255,255,255,0.04)',
            }}>
                <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, rgba(1,115,211,0.9), rgba(96,165,250,0.9), rgba(1,115,211,0.9))',
                        backgroundSize: '200% 100%',
                        borderRadius: '0 2px 2px 0',
                        boxShadow: '0 0 12px rgba(1,115,211,0.5), 0 0 4px rgba(96,165,250,0.4)',
                        transition: 'width 0.15s ease-out',
                        position: 'relative',
                        animation: 'scroll-bar-shimmer 4s linear infinite',
                    }}
                >
                    {/* Glowing trailing edge dot */}
                    <div style={{
                        position: 'absolute', right: -2, top: -3,
                        width: 6, height: 8, borderRadius: 3,
                        background: 'rgba(96,165,250,1)',
                        boxShadow: '0 0 12px 4px rgba(1,115,211,0.9)',
                        opacity: progress > 1 ? 1 : 0,
                        transition: 'opacity 0.3s',
                    }} />
                </div>
            </div>

            {/* ── Back to Top ── */}
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{
                            position: 'fixed', bottom: 100, left: 24, zIndex: 9000,
                            width: 44, height: 44,
                            borderRadius: '50%',
                            background: 'rgba(12,12,20,0.85)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            color: 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
                            transition: 'border-color 0.3s, color 0.3s, box-shadow 0.3s',
                        }}
                        whileHover={{
                            borderColor: 'rgba(255,255,255,0.35)',
                            color: '#fff',
                            boxShadow: '0 12px 36px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 18px rgba(1,115,211,0.25)',
                            y: -3,
                        }}
                        aria-label="Scroll to top"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 13V3M8 3L3 8M8 3L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    )
}
