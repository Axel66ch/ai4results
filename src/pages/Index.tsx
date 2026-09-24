import Layout from "@/components/Layout";
import MobileStickyBar from "@/components/MobileStickyBar";
import KIQuiz, { QuizRolle } from "@/components/KIQuiz";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { Megaphone, TrendingUp, Headphones, Users, Briefcase, Calculator, HelpCircle, Layers, Target, Zap, Crown, ArrowRight, Check } from "lucide-react";
import { site } from "@/config/site";

const startQuizAsRolle = (rolle: QuizRolle) => {
  window.dispatchEvent(new CustomEvent<QuizRolle>("kiquiz:rolle", { detail: rolle }));
  document.getElementById("ki-quiz")?.scrollIntoView({ behavior: "smooth" });
};

const personas = [
  {
    rolle: "CEO / Geschäftsleitung" as QuizRolle,
    icon: <Crown className="w-7 h-7" />,
    title: "Für CEOs & Geschäftsleitung",
    intro: "Sie müssen entscheiden, wo KI investiert wird — ohne Buzzwords, mit Zahlen.",
    punkte: [
      "Priorisierte KI-Roadmap statt endloser Experimente",
      "ROI, Aufwand und Kosten pro Anwendung auf einen Blick",
      "Entscheidungsgrundlage fürs nächste GL-Meeting",
    ],
    cta: "Meine KI-Hebel als CEO finden",
  },
  {
    rolle: "CMO / Marketingleitung" as QuizRolle,
    icon: <Target className="w-7 h-7" />,
    title: "Für CMOs & Marketingleiter",
    intro: "Sie brauchen mehr qualifizierte Leads — mit dem Team und Budget, das Sie haben.",
    punkte: [
      "KI-gestützte Lead-Generierung, die messbar Pipeline füllt",
      "Content und Kampagnen skalieren ohne mehr Personal",
      "Belegbare Resultate, die Sie intern verteidigen können",
    ],
    cta: "Meine KI-Hebel als CMO finden",
  },
];

const Index = () => {
  return (
    <Layout>
      <MobileStickyBar />
      
      {/* Hero */}
      <section className="min-h-screen flex items-center bg-brand-blue text-primary-foreground section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue to-brand-lightblue/20 opacity-80" />
        <div className="container-main relative z-10">
          <ScrollFadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading max-w-4xl leading-tight">
              Ihr Team redet über KI. Sie müssen entscheiden.
            </h1>
          </ScrollFadeIn>
          <ScrollFadeIn delay={200}>
            <p className="mt-6 text-xl md:text-2xl text-brand-lightblue max-w-2xl">
              Wir liefern Ihnen die Grundlage: Welche KI-Anwendungen passen zu Ihrem Unternehmen, Ihrem Team und Ihrem Budget.
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all"
              >
                Kostenloses Erstgespräch
              </a>
              <a
                href="#ki-quiz"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary-foreground/50 px-8 py-4 text-lg font-semibold hover:bg-primary-foreground/10 transition-all"
              >
                KI-Potenzial jetzt prüfen
              </a>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Ticker */}
      <section className="bg-brand-lightblue py-4 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 px-4">
              {["150+ Projekte", "80+ evaluierte Tools", "ETH-Hintergrund", "Tool-unabhängig", "DACH-Region", "Dozent FHNW & ZHAW"].map((t) => (
                <span key={t} className="text-primary-foreground font-medium px-4">
                  {t} <span className="mx-4">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Persona-Einstiege */}
      <section className="bg-background section-padding">
        <div className="container-main">
          <ScrollFadeIn>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-blue text-center mb-3">
              Was ist Ihre Rolle?
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              CEOs und CMOs stellen unterschiedliche Fragen an KI. Wählen Sie Ihren Einstieg — Ihre Empfehlungen werden darauf zugeschnitten.
            </p>
          </ScrollFadeIn>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {personas.map((p, i) => (
              <ScrollFadeIn key={p.rolle} delay={i * 100}>
                <div className="bg-brand-beige rounded-2xl p-8 h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all border-b-4 border-transparent hover:border-brand-orange">
                  <div className="w-14 h-14 rounded-xl bg-brand-blue flex items-center justify-center text-brand-orange mb-4">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-brand-blue mb-2">{p.title}</h3>
                  <p className="text-muted-foreground mb-4">{p.intro}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.punkte.map((punkt) => (
                      <li key={punkt} className="flex items-start gap-2 text-sm text-brand-blue">
                        <Check className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                        {punkt}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => startQuizAsRolle(p.rolle)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3 font-semibold text-primary-foreground hover:brightness-110 transition-all"
                  >
                    {p.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <KIQuiz />

      {/* 6 Bereiche */}
      <section className="bg-background section-padding">
        <div className="container-main">
          <ScrollFadeIn>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-blue text-center mb-3">
              KI wirkt in allen Bereichen Ihres Unternehmens
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Nicht nur im Marketing — sondern überall dort, wo Prozesse repetitiv, datengetrieben oder zeitkritisch sind.
            </p>
          </ScrollFadeIn>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Megaphone />, title: "Marketing", desc: "Content, Kampagnen und Personalisierung — automatisiert und messbar skalierbar" },
              { icon: <TrendingUp />, title: "Sales", desc: "Von der Recherche bis zum Angebot: KI beschleunigt jeden Schritt im Sales-Prozess" },
              { icon: <Headphones />, title: "Service", desc: "Schnellere Antworten, weniger Tickets, höhere Kundenzufriedenheit — rund um die Uhr" },
              { icon: <Users />, title: "HR", desc: "Recruiting, Onboarding und Dokumentation — KI übernimmt den administrativen Aufwand" },
              { icon: <Briefcase />, title: "Geschäftsleitung", desc: "Forecasts, Marktanalysen und persönliche KI-Assistenz für bessere Entscheidungen" },
              { icon: <Calculator />, title: "Finanzen", desc: "Rechnungsverarbeitung, Reporting und Fraud Detection — präziser und schneller" },
            ].map((b, i) => (
              <ScrollFadeIn key={b.title} delay={i * 100}>
                <div className="bg-brand-beige rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center text-brand-orange mb-4">
                    {b.icon}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-brand-blue mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.desc}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="bg-brand-beige section-padding">
        <div className="container-main">
          <ScrollFadeIn>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-blue text-center mb-12">
              Kommt Ihnen das bekannt vor?
            </h2>
          </ScrollFadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "KI ist überall ein Thema — aber im Unternehmen fehlt die strukturierte Grundlage für den ersten Schritt",
              "Wertvolle Arbeitszeit fliesst in repetitive Aufgaben in HR, Finanzen und Operations — obwohl Automatisierung möglich wäre",
              "Es gibt erste KI-Experimente — aber kein durchgängiges System, das messbar Wirkung zeigt",
            ].map((p, i) => (
              <ScrollFadeIn key={i} delay={i * 100}>
                <div className="bg-background rounded-2xl p-6 border-l-4 border-brand-orange">
                  <HelpCircle className="w-8 h-8 text-brand-orange mb-4" />
                  <p className="text-brand-blue font-medium">{p}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-brand-blue text-primary-foreground section-padding">
        <div className="container-main">
          <ScrollFadeIn>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
              Das 4results KI-System
            </h2>
          </ScrollFadeIn>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: <Target />, title: "Analysieren", desc: "Wir identifizieren, in welchen Bereichen KI in Ihrem Betrieb sofort Wirkung entfaltet" },
              { icon: <Layers />, title: "Strukturieren", desc: "Wir entwickeln einen priorisierten Plan — passend zu Team, Tools und Budget" },
              { icon: <Zap />, title: "Umsetzen", desc: "Wir begleiten die Einführung bis zum messbaren Ergebnis" },
            ].map((s, i) => (
              <ScrollFadeIn key={s.title} delay={i * 100}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-orange mx-auto flex items-center justify-center mb-4">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-2">{s.title}</h3>
                  <p className="text-primary-foreground/70">{s.desc}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
          <ScrollFadeIn delay={400}>
            <div className="mt-12 text-center">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all"
              >
                Jetzt Erstgespräch buchen
              </a>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background section-padding">
        <div className="container-main">
          <ScrollFadeIn>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-blue text-center mb-12">
              Das sagen unsere Kunden
            </h2>
          </ScrollFadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { quote: "Die Anzahl Leads hat sich vervielfacht, einige Hot Leads sind dabei — die Resultate lagen weit über unseren Erwartungen.", author: "Dean Corkovic", role: "Project Manager Demand Generation, Avaloq Evolution AG" },
              { quote: "Die Arbeit mit Alex Schoepf hat uns in der digitalen Transformation weitergebracht. Die Automation im Event Management und das Lead Scoring sind der Schlüssel für die Effizienzsteigerung.", author: "Michael Kompatscher", role: "Geschäftsführer, VersuchsStollen Hagerbach AG" },
              { quote: "Innerhalb kürzester Zeit konnten wir mehrsprachige Experimente mit Lead Magneten durchführen und wertvolle Erkenntnisse für unsere Lead-Generierung gewinnen.", author: "Alessandra De Bernardi", role: "Head of Marketing Digital Innovation, Angst+Pfister" },
            ].map((t, i) => (
              <ScrollFadeIn key={i} delay={i * 100}>
                <div className="bg-brand-beige rounded-2xl p-6 border-l-4 border-brand-blue h-full flex flex-col">
                  <p className="text-brand-blue italic flex-1">«{t.quote}»</p>
                  <div className="mt-4 pt-4 border-t border-brand-blue/10">
                    <p className="font-bold text-brand-blue">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="bg-brand-blue text-primary-foreground section-padding">
        <div className="container-main">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            {[
              { value: "+27%", label: "mehr qualifizierte Leads" },
              { value: "−40%", label: "weniger manueller Aufwand" },
              { value: "+60%", label: "Conversion bei Bestandskontakten" },
            ].map((s, i) => (
              <ScrollFadeIn key={i} delay={i * 100}>
                <div>
                  <p className="text-4xl md:text-5xl font-bold font-heading text-brand-orange">{s.value}</p>
                  <p className="mt-2 text-primary-foreground/70">{s.label}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-orange text-primary-foreground section-padding">
        <div className="container-main text-center">
          <ScrollFadeIn>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">
              Bereit für KI, die wirklich funktioniert?
            </h2>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all"
            >
              Jetzt Gespräch buchen
            </a>
          </ScrollFadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
