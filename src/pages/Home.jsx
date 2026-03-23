import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import Outcomes from '../components/Outcomes'
import CaseStudies from '../components/CaseStudies'
import HowItWorks from '../components/HowItWorks'
import Integration from '../components/Integration'
import OfferBox from '../components/OfferBox'
import FAQ from '../components/FAQ'
import ContactForm from '../components/ContactForm'
import GlobusSpotlight from '../components/GlobusSpotlight'

/*
  Page order (per PRD):
  1. Hero
  2. Outcomes (4 cards — NOT services)
  3. Case Studies (proof)
  4. How It Works (3 steps)
  5. Integrations (logos marquee)
  6. Offer Box (free prototype form)
  7. FAQ
  8. Contact
*/
export default function Home() {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Hero />
            <TrustedBy />
            <Outcomes />
            <CaseStudies />
            <GlobusSpotlight />
            <HowItWorks />
            <Integration />
            <OfferBox />
            <FAQ />
            <ContactForm />
        </motion.main>
    )
}
