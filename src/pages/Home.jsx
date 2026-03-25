import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import Outcomes from '../components/Outcomes'
import GlobusSpotlight from '../components/GlobusSpotlight'
import OfferBox from '../components/OfferBox'
import FAQ from '../components/FAQ'
import ContactForm from '../components/ContactForm'

export default function Home() {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Hero />
            <TrustedBy />
            <Outcomes />
            <GlobusSpotlight />
            <OfferBox />
            <FAQ />
            <ContactForm />
        </motion.main>
    )
}
