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
            title: "Spark Your Next",
            title2: "Evolution.",
            title3: "Through Intelligent",
            title4: "Design.",
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
        },
        outcomes: {
            label: "OUR SERVICES",
            title1: "Results.",
            title2: "Not just Services.",
            subtitle: "We build solutions for real growth. Always with fixed deadlines, clear ROI, and a fast prototype.",
            cards: [
                {
                    tag: 'AI Animation Ads',
                    headline: 'More Reach & Conversions',
                    benefit: 'AI video ads that stand out. More clicks, cheaper conversions.',
                    deliverable: 'Storyboard · 3 Ad Variants · Export for Meta / YouTube',
                    timeline: 'Prototype in 3 Days',
                    stat: '+340%', statLabel: 'Avg. Reach',
                },
                {
                    tag: 'Content Workflow',
                    headline: 'Faster Content Output',
                    benefit: 'Scale your content output enormously — on-brand and in record time.',
                    deliverable: 'AI Editing Pipeline · Template System · Editorial Calendar Integration',
                    timeline: 'Setup in 1–2 Weeks',
                    stat: '10×', statLabel: 'Output Speed',
                },
                {
                    tag: 'AI Chatbot / Agent',
                    headline: 'Better Customer Support',
                    benefit: '24/7 AI support in EN/DE that resolves inquiries instantly and accurately.',
                    deliverable: 'AI Agent · CRM Integration · Escalation Logic · Analytics Dashboard',
                    timeline: 'Live in 5–10 Days',
                    stat: '80%', statLabel: 'Auto-resolved',
                },
                {
                    tag: 'Custom Apps & MVPs',
                    headline: 'Automate Processes',
                    benefit: 'Custom web apps for internal workflows. Live in weeks, not months.',
                    deliverable: 'Functional MVP · API Integrations · Onboarding & Documentation',
                    timeline: 'MVP in 2–4 Weeks',
                    stat: '—', statLabel: 'Saved Monthly',
                },
            ],
            scopeLabel: "Scope of Delivery",
            ctaText: "Not sure what fits your problem?",
            ctaBtn: "Get Free Consultation →"
        },
        caseStudies: {
            label: "CASE STUDIES",
            title1: "Real Results.",
            title2: "No Buzzwords.",
            subtitle: "Hard KPIs from real projects, delivered on time.",
            cases: [
                {
                    label: 'Case Study 01',
                    tag: '🎬 AI Animation',
                    client: 'Large German Retailer',
                    sub: 'Retail · Marketing',
                    result: '+340%',
                    resultLabel: 'Organic Reach',
                    kpis: [
                        { value: '8.7%', label: 'Video CTR' },
                        { value: '–70%', label: 'Production Cost' },
                        { value: '3 Days', label: 'Prototype → Live' },
                    ],
                    summary: 'Seasonal AI video ads instead of expensive film production — for Meta, YouTube & in-store screens.',
                },
                {
                    label: 'Case Study 02',
                    tag: '🤖 AI Agent',
                    client: 'Law Firm Frankfurt',
                    sub: 'Legal · Support Automation',
                    result: '92%',
                    resultLabel: 'Faster Email Triage',
                    kpis: [
                        { value: '99%', label: 'Routing Accuracy' },
                        { value: '3 hrs', label: 'Saved Daily' },
                        { value: '7 Days', label: 'Analysis → Go-Live' },
                    ],
                    summary: 'AI agent classifies & routes 80+ emails daily in under 2 seconds.',
                },
            ],
            ctaBtn: "Request Your Own Project →"
        },
        howItWorks: {
            label: "PROCESS",
            title1: "Unleash",
            title2: "Creativity.",
            subtitle: "Follow our three steps to turn your visions into measurable results with AI.",
            steps: [
                { day: 'STEP 1', title: 'Analysis.', description: 'We specifically look for inefficiencies and potential in your company.' },
                { day: 'STEP 2', title: 'Development.', description: 'Your solution is developed by experts in Germany and India.' },
                { day: 'STEP 3', title: 'Integration.', description: 'We deliver seamlessly, sustainably, and with measurable success.' },
            ]
        },
        integration: {
            label: "INTEGRATION",
            title1: "Connects to your",
            title2: "existing stack",
            subtitle: "Our AI integrates seamlessly with 100+ enterprise tools — no rip & replace, no downtime.",
            stats: [['100+', 'Integrations'], ['< 48h', 'Setup Time'], ['Zero', 'Downtime']]
        },
        offerBox: {
            label: "THE OFFER",
            title1: "Free Prototype",
            title2: "in 3 Business Days.",
            subtitle: "No risk. No contract. You get a real prototype — before you decide.",
            includedLabel: "INCLUDED",
            included: [
                'Storyboard or concept paper (written)',
                'First animated version / functional prototype',
                'Up to 2 feedback rounds',
                '1 final format (e.g. MP4 15s or web app demo)',
                'Briefing call (60 min) + scope definition',
            ],
            notIncludedLabel: "NOT INCLUDED",
            notIncluded: [
                'Full campaign production',
                'Backend / complex integrations',
                'Paid media setup / ad account',
                'Ongoing maintenance (without retainer)',
            ],
            formTitle: "Request Prototype",
            formSubtitle: "No sales call. Direct response within 24 hours.",
            namePlaceholder: "Your Name",
            companyPlaceholder: "Company / Agency",
            emailPlaceholder: "Email Address",
            goalPlaceholder: "What is your goal / use case? (e.g. Animation ad for product launch)",
            submitBtn: "Request Free Prototype →",
            footNote: "No spam. No hidden costs. Truly free.",
            successTitle: "Request Received!",
            successMsg: "We'll get back to you within 24 hours by email. Your prototype briefing starts with that."
        },
        faq: {
            label: "FAQ",
            title1: "Frequently",
            title2: "Asked Questions.",
            subtitle: "Still have a question? Write to us directly.",
            items: [
                {
                    q: "What's included in the free 3-day prototype?",
                    a: "You receive a storyboard or concept paper on Day 1, a first animated or functional version on Day 2–3, plus up to 2 feedback rounds. Final deliverable: 1 format (e.g. MP4 15s or web app demo). No contract, no risk."
                },
                {
                    q: "How much does full production cost? Starting from €5,000?",
                    a: "Yes, production projects typically start at €5,000 for a complete AI animation ad (3 variants, all formats). More complex projects (apps, AI agents, ongoing retainers) are individually quoted based on scope."
                },
                {
                    q: "How fast can full production be delivered?",
                    a: "Simple animation ads: 5–10 business days. Complex AI agents or apps: 2–6 weeks depending on scope. We communicate realistic timelines from the start — no over-promising."
                },
                {
                    q: "Do you also work with agencies (white-label)?",
                    a: "Yes. We work discreetly as a white-label partner for digital agencies. Your brand, our AI infrastructure. NDA available upon request."
                },
                {
                    q: "What languages do you work in?",
                    a: "German and English. Targeting the DACH market (Germany, Austria, Switzerland) is our core."
                },
                {
                    q: "How is ProdOne different from a traditional agency?",
                    a: "Traditional agencies need 6–12 weeks for production. We deliver a functional prototype in 3 days — thanks to AI infrastructure and dual-continent sprints. You only pay when you're satisfied with the prototype."
                },
            ]
        },
        contact: {
            label: "CONTACT",
            title1: "Start Your",
            title2: "AI Project Today",
            subtitle: "Describe your challenge and we'll deliver a functional AI prototype within 72 hours — completely free.",
            email: "Email",
            emailVal: "hello@prodone.ai",
            location: "Location",
            locationVal: "Mannheim, Germany",
            response: "Response Time",
            responseVal: "Within 2 Business Days",
            formTitle: "Get Free Prototype",
            formSubtitle: "No obligation. Direct response.",
            nameLabel: "NAME *",
            namePlaceholder: "Max Mustermann",
            companyLabel: "COMPANY *",
            companyPlaceholder: "Firm GmbH",
            emailLabel: "E-MAIL *",
            emailPlaceholderVal: "max@firma.de",
            useCaseLabel: "YOUR USE CASE *",
            useCasePlaceholder: "Describe your specific use case...",
            submitBtn: "Request Prototype Now ↗",
            footNote: "🔒 Confidential · GDPR Compliant · Non-binding",
            successTitle: "Message Sent!",
            successMsg: "Your prototype will be ready in 3 days. We'll respond within 2 hours."
        },
        cta: {
            label: "✨ Ready for the next step?",
            title1: "We transform your business",
            title2: "faster than you think",
            subtitle: "50+ companies already work with AI. Start with a free prototype — no risk, no contract.",
            primaryBtn: "Get Started ↗",
            secondaryBtn: "View Live Demo",
            badges: ['🔒 Confidential', '⚡ 3-Day Prototype', '🌍 DE + IN Team', '✅ Free']
        },
        footer: {
            desc: "Fast Forward Artificial Intelligence. Custom AI solutions with a 3-day prototype guarantee.",
            navGroup: "Navigation",
            navLinks: ['Process', 'Services', 'Integration', 'Contact', 'Pilot Project'],
            servicesGroup: "Services",
            serviceLinks: ['AI Animation Ads', 'Social Ads & Content', 'AI Chatbot / Agent', 'Custom Apps & MVPs'],
            companyGroup: "Company",
            companyLinks: ['About Us', 'Team', 'Careers', 'Blog'],
            copyright: "© 2026 prodone.ai · Fast Forward Artificial Intelligence GmbH",
            legal: ['Privacy Policy', 'Terms', 'Imprint'],
            madeIn: "🇩🇪 Designed in Mannheim"
        },
        pilot: {
            breadcrumb: "Pilot Project",
            heroLabel: "🎬 Live Case Study — AI Animation Ads",
            heroTitle1: "Large German Retailer:",
            heroTitle2: "+340% Reach",
            heroTitle3: "with AI Video Ads",
            heroDesc: "One of Germany's largest retail chains needed",
            heroDescBold: "high-converting seasonal video ads",
            heroDescEnd: "— fast, without the cost of a traditional agency. We delivered 3 AI-animated variants in 3 days.",
            chips: [['🏪', 'Retail · E-Commerce'], ['📍', 'Germany-wide'], ['📅', 'Q4 Campaign'], ['🎯', 'Meta · YouTube · TikTok']],
            cardTitle: "AI Animation Ad",
            cardSub: "Large German Retailer · Q4 2024",
            cardLive: "✅ Live",
            cardScope: "🎬 Scope of Delivery",
            cardScopeDesc: "3× Ad Variants · Storyboard + Animation + Export",
            cardScopeReady: "✓ Ready in 3 Business Days",
            compareLabel: "⚖️ Before vs. After",
            compareTitle: "The Numbers Tell the Story",
            compareSubtitle: "Traditional agency vs. prodone.ai AI pipeline — same brief, same budget window.",
            beforeLabel: "Before",
            afterLabel: "After (prodone.ai)",
            beforeAfter: [
                { label: 'Creative Lead Time', before: '6 Weeks', after: '3 Days' },
                { label: 'Monthly Production Cost', before: '€28,000', after: '€8,400' },
                { label: 'Average Ad CTR', before: '1.2%', after: '8.7%' },
                { label: 'Organic Reach', before: 'Baseline', after: '+340%' },
            ],
            processLabel: "🛠️ Our 3-Day Process",
            processTitle1: "Brief on Monday.",
            processTitle2: "Live by Wednesday.",
            processSteps: [
                { title: 'Brief & Brand Intake', desc: 'One 45-min session. We collect brand assets, campaign goals, target audience, and platform specs.', tag: 'Day 1 · Morning' },
                { title: 'AI Storyboard Generation', desc: '3 storyboard concepts generated by our AI, tailored to your brief. You review and pick your favourite.', tag: 'Day 1 · Afternoon' },
                { title: 'Animation & Voiceover', desc: 'Each approved story is rendered into a full AI-animated ad with music, motion graphics, and voiceover.', tag: 'Day 2' },
                { title: 'Export & Go Live', desc: 'All 3 variants exported in optimal formats for Meta, YouTube, and TikTok. Ready to launch.', tag: 'Day 3' },
            ],
            processEnd: "All 3 ad variants delivered & ready to launch",
            deliverablesTitle: "What's Included — Every Time",
            deliverablesSubtitle: "No hidden extras. No revision fees. One flat deliverable package.",
            deliverables: [
                { label: '3× Ad Variants', sub: 'A/B/C tested creatives' },
                { label: 'Storyboard', sub: 'Reviewed & approved' },
                { label: 'Music & SFX', sub: 'Royalty-free licensed' },
                { label: 'Multi-Format Export', sub: 'Meta · YouTube · TikTok' },
                { label: 'Performance Report', sub: 'KPIs tracked post-launch' },
                { label: 'Unlimited Revisions', sub: "Until you're 100% happy" },
            ],
            resultsLabel: "📊 Results — 30 Days Post-Launch",
            resultsTitle1: "The Numbers",
            resultsTitle2: "Speak for Themselves",
            resultsSubtitle: "Measured via Meta Ads Manager + YouTube Analytics",
            results: [
                { stat: '+340%', label: 'Organic Reach' },
                { stat: '8.7%', label: 'Ad CTR' },
                { stat: '3 Days', label: 'Prototype → Live' },
                { stat: '–70%', label: 'Production Cost' },
            ],
            testimonialQuote: '"We got three polished ad variants delivered in under 72 hours. The results completely outperformed our traditional agency — at a fraction of the cost. We won\'t go back."',
            testimonialName: "Head of Digital Marketing",
            testimonialCompany: "Large German Retailer · Q4 2024 Campaign"
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
            title: "Spark Your Next",
            title2: "Evolution.",
            title3: "Durch Intelligentes",
            title4: "Design.",
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
        },
        outcomes: {
            label: "UNSERE LEISTUNGEN",
            title1: "Ergebnisse.",
            title2: "Nicht nur Services.",
            subtitle: "Wir bauen Lösungen für echtes Wachstum. Immer mit festen Deadlines, klarem ROI und schnellem Prototyp.",
            cards: [
                {
                    tag: 'AI Animation Ads',
                    headline: 'Mehr Reichweite & Conversions',
                    benefit: 'KI-Video-Ads, die auffallen. Mehr Klicks, günstigere Conversions.',
                    deliverable: 'Storyboard · 3 Ad-Varianten · Export für Meta / YouTube',
                    timeline: 'Prototyp in 3 Tagen',
                    stat: '+340%', statLabel: 'Ø Reichweite',
                },
                {
                    tag: 'Content Workflow',
                    headline: 'Schnellerer Content-Output',
                    benefit: 'Skalieren Sie Ihren Content-Output enorm — On-Brand und in Rekordzeit.',
                    deliverable: 'KI-Editing-Pipeline · Vorlagen-System · Redaktionskalender-Integration',
                    timeline: 'Setup in 1–2 Wochen',
                    stat: '10×', statLabel: 'Output-Speed',
                },
                {
                    tag: 'AI Chatbot / Agent',
                    headline: 'Besserer Customer Support',
                    benefit: '24/7 KI-Support in DE/EN, der Anfragen sofort und präzise löst.',
                    deliverable: 'KI-Agent · CRM-Integration · Eskalationslogik · Analyse-Dashboard',
                    timeline: 'Live in 5–10 Tagen',
                    stat: '80%', statLabel: 'Anfragen automat.',
                },
                {
                    tag: 'Custom Apps & MVPs',
                    headline: 'Prozesse automatisieren',
                    benefit: 'Maßgeschneiderte Web-Apps für interne Workflows. Live in Wochen, nicht Monaten.',
                    deliverable: 'Funktionaler MVP · API-Integrationen · Onboarding & Dokumentation',
                    timeline: 'MVP in 2–4 Wochen',
                    stat: '—', statLabel: 'Monatlich gespart',
                },
            ],
            scopeLabel: "Scope of Delivery",
            ctaText: "Nicht sicher, was zu Ihrem Problem passt?",
            ctaBtn: "Kostenlos beraten lassen →"
        },
        caseStudies: {
            label: "REFERENZPROJEKTE",
            title1: "Echte Ergebnisse.",
            title2: "Keine Buzzwords.",
            subtitle: "Harte KPIs aus echten Projekten, pünktlich geliefert.",
            cases: [
                {
                    label: 'Case Study 01',
                    tag: '🎬 KI-Animation',
                    client: 'Großer dt. Einzelhändler',
                    sub: 'Retail · Marketing',
                    result: '+340%',
                    resultLabel: 'Organische Reichweite',
                    kpis: [
                        { value: '8.7%', label: 'Video CTR' },
                        { value: '–70%', label: 'Produktionskosten' },
                        { value: '3 Tage', label: 'Prototyp → Live' },
                    ],
                    summary: 'Saisonale KI-Video-Ads statt teurer Filmproduktion — für Meta, YouTube & Instore-Screens.',
                },
                {
                    label: 'Case Study 02',
                    tag: '🤖 KI-Agent',
                    client: 'Anwaltskanzlei Frankfurt',
                    sub: 'Legal · Support-Automation',
                    result: '92%',
                    resultLabel: 'Schnellere E-Mail-Triage',
                    kpis: [
                        { value: '99%', label: 'Routing-Genauigkeit' },
                        { value: '3 Std.', label: 'Täglich eingespart' },
                        { value: '7 Tage', label: 'Analyse → Go-Live' },
                    ],
                    summary: 'KI-Agent klassifiziert & leitet 80+ E-Mails täglich in unter 2 Sekunden weiter.',
                },
            ],
            ctaBtn: "Eigenes Projekt anfragen →"
        },
        howItWorks: {
            label: "PROZESS",
            title1: "Entfalten Sie",
            title2: "Kreativität.",
            subtitle: "Folgen Sie unseren drei Schritten, um Ihre Visionen mit KI in messbare Ergebnisse zu verwandeln.",
            steps: [
                { day: 'SCHRITT 1', title: 'Analyse.', description: 'Wir suchen gezielt nach Ineffizienzen und Potenzialen in Ihrem Unternehmen.' },
                { day: 'SCHRITT 2', title: 'Entwicklung.', description: 'Ihre Lösung wird von Experten in Deutschland und Indien entwickelt.' },
                { day: 'SCHRITT 3', title: 'Integration.', description: 'Wir realisieren nahtlos, nachhaltig und mit messbarem Erfolg.' },
            ]
        },
        integration: {
            label: "INTEGRATION",
            title1: "Verbindet sich mit Ihrem",
            title2: "bestehenden Stack",
            subtitle: "Unsere KI integriert nahtlos in 100+ Enterprise-Tools — kein Rip & Replace, kein Downtime.",
            stats: [['100+', 'Integrationen'], ['< 48h', 'Setup-Zeit'], ['Zero', 'Downtime']]
        },
        offerBox: {
            label: "DAS ANGEBOT",
            title1: "Kostenloser Prototyp",
            title2: "in 3 Werktagen.",
            subtitle: "Kein Risiko. Kein Vertrag. Sie erhalten einen echten Prototyp — bevor Sie sich entscheiden.",
            includedLabel: "INKLUSIVE",
            included: [
                'Storyboard oder Konzeptpapier (schriftlich)',
                'Erste animierte Version / funktionsfähiger Prototyp',
                'Bis zu 2 Feedback-Runden',
                '1 finales Format (z.B. MP4 15s oder Webapp-Demo)',
                'Briefing-Call (60 Min.) + Scope-Definition',
            ],
            notIncludedLabel: "NICHT INBEGRIFFEN",
            notIncluded: [
                'Vollständige Kampagnen-Produktion',
                'Backend / komplexe Integrationen',
                'Paid-Media-Setup / Ad-Konto',
                'Laufende Pflege (ohne Retainer)',
            ],
            formTitle: "Prototyp anfragen",
            formSubtitle: "Kein Verkaufsgespräch. Direkte Antwort innerhalb von 24 Stunden.",
            namePlaceholder: "Ihr Name",
            companyPlaceholder: "Unternehmen / Agentur",
            emailPlaceholder: "E-Mail-Adresse",
            goalPlaceholder: "Was ist Ihr Ziel / Use-Case? (z.B. Animationsanzeige für Produktlaunch)",
            submitBtn: "Kostenlosen Prototyp anfragen →",
            footNote: "Kein Spam. Keine versteckten Kosten. Wirklich kostenlos.",
            successTitle: "Anfrage erhalten!",
            successMsg: "Wir melden uns innerhalb von 24 Stunden per E-Mail. Ihr Prototyp-Briefing beginnt damit."
        },
        faq: {
            label: "FAQ",
            title1: "Häufige",
            title2: "Fragen.",
            subtitle: "Noch eine Frage offen? Schreiben Sie uns direkt.",
            items: [
                {
                    q: 'Was ist im kostenlosen 3-Tage-Prototyp enthalten?',
                    a: 'Sie erhalten ein Storyboard oder Konzeptpapier am Tag 1, eine erste animierte oder funktionsfähige Version am Tag 2–3, sowie bis zu 2 Feedback-Runden. Finales Deliverable: 1 Format (z.B. MP4 15s oder Webapp-Demo). Kein Vertrag, kein Risiko.',
                },
                {
                    q: 'Was kostet die Vollproduktion? Preise ab €5.000?',
                    a: 'Ja, Produktionsprojekte starten in der Regel bei €5.000 für eine vollständige KI-Animationsanzeige (3 Varianten, alle Formate). Komplexere Projekte (Apps, AI-Agenten, laufende Retainer) werden nach Scope individuell kalkuliert.',
                },
                {
                    q: 'Wie schnell kann die Vollproduktion geliefert werden?',
                    a: 'Einfache Animationsanzeigen: 5–10 Werktage. Komplexe KI-Agenten oder Apps: 2–6 Wochen je nach Scope. Wir kommunizieren von Anfang an realistische Timelines — keine Over-Promising.',
                },
                {
                    q: 'Arbeiten Sie auch mit Agenturen (White-Label)?',
                    a: 'Ja. Wir arbeiten diskret als White-Label-Partner für Digitalagenturen. Ihre Marke, unsere KI-Infrastruktur. NDA auf Anfrage jederzeit möglich.',
                },
                {
                    q: 'In welchen Sprachen arbeiten Sie?',
                    a: 'Deutsch und Englisch. Targeting für DACH-Markt (Deutschland, Österreich, Schweiz) ist unser Kern.',
                },
                {
                    q: 'Wie unterscheidet sich ProdOne von einer klassischen Agentur?',
                    a: 'Klassische Agenturen brauchen 6–12 Wochen für Produktion. Wir liefern einen funktionalen Prototyp in 3 Tagen — dank KI-Infrastruktur und dual-continent Sprints. Bezahlt wird erst, wenn Sie mit dem Prototyp zufrieden sind.',
                },
            ]
        },
        contact: {
            label: "KONTAKT",
            title1: "Starten Sie Ihr",
            title2: "KI-Projekt heute",
            subtitle: "Beschreiben Sie Ihre Herausforderung und wir liefern innerhalb von 72 Stunden einen funktionalen KI-Prototyp — völlig kostenlos.",
            email: "Email",
            emailVal: "hello@prodone.ai",
            location: "Standort",
            locationVal: "Mannheim, Deutschland",
            response: "Antwortzeit",
            responseVal: "Innerhalb von 2 Werktagen",
            formTitle: "Kostenlosen Prototypen erhalten",
            formSubtitle: "Keine Verpflichtung. Direkte Antwort.",
            nameLabel: "NAME *",
            namePlaceholder: "Max Mustermann",
            companyLabel: "UNTERNEHMEN *",
            companyPlaceholder: "Firma GmbH",
            emailLabel: "E-MAIL *",
            emailPlaceholderVal: "max@firma.de",
            useCaseLabel: "IHR USE CASE *",
            useCasePlaceholder: "Beschreiben Sie Ihren konkreten Anwendungsfall...",
            submitBtn: "Jetzt Prototyp anfragen ↗",
            footNote: "🔒 Vertraulich · Datenschutzkonform · Unverbindlich",
            successTitle: "Nachricht gesendet!",
            successMsg: "Ihr Prototyp ist in 3 Tagen fertig. Wir antworten innerhalb von 2 Stunden."
        },
        cta: {
            label: "✨ Bereit für den nächsten Schritt?",
            title1: "Wir transformieren Ihr Unternehmen",
            title2: "schneller als Sie denken",
            subtitle: "50+ Unternehmen arbeiten bereits mit KI. Starten Sie mit einem kostenlosen Prototyp — kein Risiko, kein Vertrag.",
            primaryBtn: "Jetzt loslegen ↗",
            secondaryBtn: "Live Demo ansehen",
            badges: ['🔒 Vertraulich', '⚡ 3-Tage-Prototyp', '🌍 D + IN Team', '✅ Kostenlos']
        },
        footer: {
            desc: "Fast Forward Artificial Intelligence. Maßgeschneiderte KI-Lösungen mit 3-Tage-Prototyp-Garantie.",
            navGroup: "Navigation",
            navLinks: ['Prozess', 'Services', 'Integration', 'Kontakt', 'Pilotprojekt'],
            servicesGroup: "Leistungen",
            serviceLinks: ['KI-Animationsads', 'Social Ads & Content', 'KI Chatbot / Agent', 'Custom Apps & MVPs'],
            companyGroup: "Unternehmen",
            companyLinks: ['Über uns', 'Team', 'Careers', 'Blog'],
            copyright: "© 2026 prodone.ai · Fast Forward Artificial Intelligence GmbH",
            legal: ['Datenschutzerklärung', 'AGBs', 'Impressum'],
            madeIn: "🇩🇪 Designed in Mannheim"
        },
        pilot: {
            breadcrumb: "Pilotprojekt",
            heroLabel: "🎬 Live Case Study — KI Animation Ads",
            heroTitle1: "Großer dt. Einzelhändler:",
            heroTitle2: "+340% Reichweite",
            heroTitle3: "mit KI-Video-Ads",
            heroDesc: "Einer der größten Einzelhändler Deutschlands brauchte",
            heroDescBold: "saisonale Video-Ads mit hoher Konversion",
            heroDescEnd: "— schnell, ohne die Kosten einer traditionellen Agentur. Wir lieferten 3 KI-animierte Varianten in 3 Tagen.",
            chips: [['🏪', 'Retail · E-Commerce'], ['📍', 'Deutschlandweit'], ['📅', 'Q4 Kampagne'], ['🎯', 'Meta · YouTube · TikTok']],
            cardTitle: "KI-Animationsanzeige",
            cardSub: "Großer dt. Einzelhändler · Q4 2024",
            cardLive: "✅ Live",
            cardScope: "🎬 Lieferumfang",
            cardScopeDesc: "3× Ad-Varianten · Storyboard + Animation + Export",
            cardScopeReady: "✓ Bereit in 3 Werktagen",
            compareLabel: "⚖️ Vorher vs. Nachher",
            compareTitle: "Die Zahlen sprechen für sich",
            compareSubtitle: "Traditionelle Agentur vs. prodone.ai KI-Pipeline — gleiches Briefing, gleiches Budget.",
            beforeLabel: "Vorher",
            afterLabel: "Nachher (prodone.ai)",
            beforeAfter: [
                { label: 'Kreative Vorlaufzeit', before: '6 Wochen', after: '3 Tage' },
                { label: 'Monatliche Produktionskosten', before: '€28.000', after: '€8.400' },
                { label: 'Durchschn. Ad CTR', before: '1,2%', after: '8,7%' },
                { label: 'Organische Reichweite', before: 'Baseline', after: '+340%' },
            ],
            processLabel: "🛠️ Unser 3-Tage-Prozess",
            processTitle1: "Briefing am Montag.",
            processTitle2: "Live am Mittwoch.",
            processSteps: [
                { title: 'Briefing & Markenaufnahme', desc: 'Eine 45-minütige Session. Wir erfassen Marken-Assets, Kampagnenziele, Zielgruppe und Plattform-Specs.', tag: 'Tag 1 · Vormittag' },
                { title: 'KI-Storyboard-Generierung', desc: '3 Storyboard-Konzepte werden von unserer KI generiert, auf Ihr Briefing zugeschnitten. Sie wählen Ihren Favoriten.', tag: 'Tag 1 · Nachmittag' },
                { title: 'Animation & Voiceover', desc: 'Jede freigegebene Story wird in eine vollständige KI-animierte Anzeige mit Musik, Motion Graphics und Voiceover gerendert.', tag: 'Tag 2' },
                { title: 'Export & Go Live', desc: 'Alle 3 Varianten werden in optimalen Formaten für Meta, YouTube und TikTok exportiert. Startbereit.', tag: 'Tag 3' },
            ],
            processEnd: "Alle 3 Ad-Varianten geliefert & startbereit",
            deliverablesTitle: "Was enthalten ist — Jedes Mal",
            deliverablesSubtitle: "Keine versteckten Extras. Keine Revisionsgebühren. Ein festes Lieferpaket.",
            deliverables: [
                { label: '3× Ad-Varianten', sub: 'A/B/C getestete Creatives' },
                { label: 'Storyboard', sub: 'Geprüft & freigegeben' },
                { label: 'Musik & SFX', sub: 'Lizenzfrei' },
                { label: 'Multi-Format Export', sub: 'Meta · YouTube · TikTok' },
                { label: 'Performance Report', sub: 'KPIs nach Launch getrackt' },
                { label: 'Unbegrenzte Revisionen', sub: 'Bis Sie 100% zufrieden sind' },
            ],
            resultsLabel: "📊 Ergebnisse — 30 Tage nach Launch",
            resultsTitle1: "Die Zahlen",
            resultsTitle2: "sprechen für sich",
            resultsSubtitle: "Gemessen über Meta Ads Manager + YouTube Analytics",
            results: [
                { stat: '+340%', label: 'Organische Reichweite' },
                { stat: '8,7%', label: 'Ad CTR' },
                { stat: '3 Tage', label: 'Prototyp → Live' },
                { stat: '–70%', label: 'Produktionskosten' },
            ],
            testimonialQuote: '„Wir erhielten drei professionelle Ad-Varianten in unter 72 Stunden. Die Ergebnisse übertrafen unsere traditionelle Agentur bei einem Bruchteil der Kosten. Wir gehen nicht zurück."',
            testimonialName: "Leiter Digitales Marketing",
            testimonialCompany: "Großer dt. Einzelhändler · Q4 2024 Kampagne"
        }
    }
};

export function LanguageProvider({ children }) {
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
        <LanguageContext.Provider value={{ lang, setLang, t, translations }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
