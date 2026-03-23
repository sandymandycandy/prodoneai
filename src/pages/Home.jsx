import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Outcomes from '../components/Outcomes'
import HowItWorks from '../components/HowItWorks'
import ContactForm from '../components/ContactForm'

export default function Home() {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Hero />
            <Outcomes />
            <HowItWorks />
            <ContactForm />
        </motion.main>
    )
}
