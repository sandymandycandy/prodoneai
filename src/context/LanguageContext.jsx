import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    EN: {
        nav: {
            process: "Process",
            services: "Services",
            integration: "Integration",
            contact: "Contact",
            pilot: "Pilot Project",
            cta: "Request Prototype"
        },
        hero: {
            badge: "🇬🇧 Frankfurt · Stuttgart · Remote",
            title: "Fast Development",
            title2: "Artificial Intelligence.",
            title3: "Delivered in Days",
            title4: "– not in Months.",
            subtitle1: "We develop custom AI agents, automations and web apps.",
            subtitle2: "Free prototype in 3 Days.",
            cta: "Request Free Prototype →",
            examples: "📹 View Examples",
            stats: {
                days: "Days",
                proto: "Free Prototype",
                sat: "Satisfaction",
                proj: "AI Projects",
                support: "Support"
            },
            videoCard: {
                title: "AI Animation Ad",
                sub: "Large German Retailer · Q4 Campaign",
                live: "LIVE",
                camp: "Q4 Campaign",
                var: "Performance Ad Variant B",
                reach: "Reach",
                ctr: "Ad CTR",
                time: "Delivery Time",
                timeVal: "3 Days",
                foot1: "Prototype → Production in 3 Days",
                foot2: "↗ Case Study",
                floatTag: "FREE PROTOTYPE",
                floatTag2: "Days",
                scope: "🎬 SCOPE OF DELIVERY",
                scope2: "3× Ad Variants · ",
                scope3: "Storyboard + Animation + Export",
                scope4: "✓ Ready in 3 business days"
            }
        }
    },
    DE: {
        nav: {
            process: "Prozess",
            services: "Services",
            integration: "Integration",
            contact: "Kontakt",
            pilot: "Pilotprojekt",
            cta: "Prototyp anfragen"
        },
        hero: {
            badge: "🇩🇪 Frankfurt · Stuttgart · Remote",
            title: "Fast Development",
            title2: "Artificial Intelligence.",
            title3: "In Tagen geliefert",
            title4: "– nicht in Monaten.",
            subtitle1: "Wir entwickeln maßgeschneiderte KI-Agenten, Automatisierungen und Web-Apps.",
            subtitle2: "Kostenloser Prototyp in 3 Tagen.",
            cta: "Kostenlosen Prototyp anfragen →",
            examples: "📹 Beispiele ansehen",
            stats: {
                days: "Tage",
                proto: "Freier Prototyp",
                sat: "Zufriedenheit",
                proj: "KI-Projekte",
                support: "Support"
            },
            videoCard: {
                title: "KI-Animationsanzeige",
                sub: "Großer dt. Einzelhändler · Kampagne Q4",
                live: "LIVE",
                camp: "Q4 Kampagne",
                var: "Performance Ad Variante B",
                reach: "Reichweite",
                ctr: "CTR der Anzeige",
                time: "Lieferzeit",
                timeVal: "3 Tage",
                foot1: "Prototyp → Produktion in 3 Tagen",
                foot2: "↗ Case Study",
                floatTag: "FREIER PROTOTYP",
                floatTag2: "Tage",
                scope: "🎬 LIEFERUMFANG",
                scope2: "3× Ad-Varianten · ",
                scope3: "Storyboard + Animation + Export",
                scope4: "✓ Bereit in 3 Werktagen"
            }
        }
    }
};

export function LanguageProvider({ children }) {
    // Try to load language from localStorage
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedLang = localStorage.getItem('prodone_lang');
            if (savedLang) return savedLang;
        }
        return 'DE';
    });

    useEffect(() => {
        localStorage.setItem('prodone_lang', lang);
    }, [lang]);

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[lang];
        for (let k of keys) {
            if (!value) return key;
            value = value[k];
        }
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
