import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Pilot from './pages/Pilot'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './index.css'

function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 600); return 100 }
        return p + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#050508',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none', willChange: 'transform, opacity'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '32px',
          padding: '48px 64px',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
        }}>
          <img src="/logo.png" alt="prodone.ai" style={{ width: 40, height: 40, objectFit: 'contain' }} />
        </div>

        <div style={{
          fontSize: '28px', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff',
          marginBottom: '6px'
        }}>
          prodone<span style={{ color: 'rgba(255,255,255,0.4)' }}>.ai</span>
        </div>

        <div style={{
          fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: '40px', fontWeight: 500
        }}>
          Fast Forward Artificial Intelligence
        </div>

        <div style={{ width: '220px', position: 'relative' }}>
          {/* Track */}
          <div style={{
            height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden'
          }}>
            {/* Fill */}
            <motion.div
              style={{
                height: '100%',
                background: '#fff',
                borderRadius: '4px',
                width: `${Math.min(progress, 100)}%`,
                boxShadow: '0 0 10px rgba(255,255,255,0.8)'
              }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
          </div>

          <div style={{
            position: 'absolute', top: '16px', left: 0, right: 0, textAlign: 'center',
            fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.05em'
          }}>
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <Router>
      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pilot" element={<Pilot />} />
          </Routes>
          <Footer />
        </motion.div>
      )}
    </Router>
  )
}

export default App
