import Layout from "@/components/Layout";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { Rocket, Settings, GraduationCap, LifeBuoy } from "lucide-react";
import { site } from "@/config/site";

const services = [
  { icon: <Rocket className="w-8 h-8" />, title: "KI & Automation Kickstart", desc: "Das 90-Tage-Programm für CEOs, die KI strukturiert einführen wollen — mit klarem Plan, messbaren Meilensteinen und Begleitung bis zum Ergebnis" },
  { icon: <Settings className="w-8 h-8" />, title: "Marketing Automation Setup", desc: "Von der Tool-Wahl bis zur ersten laufenden Kampagne — pragmatisch umgesetzt, Ihr Team befähigt" },
  { icon: <GraduationCap className="w-8 h-8" />, title: "KI-Strategie Workshop", desc: "Halbtagesworkshop: Wo KI in Ihrem Unternehmen sofort Wirkung zeigt — mit konkretem Massnahmenplan" },
  { icon: <LifeBuoy className="w-8 h-8" />, title: "Ongoing Support & Optimierung", desc: "Monatliche Begleitung für Teams, die das System selbst betreiben und kontinuierlich verbessern wollen" },
];

const Leistungen = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-blue text-primary-foreground section-padding pt-32">
        <div className="container-main">
          <ScrollFadeIn>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-center">
              Was wir für Sie umsetzen
            </h1>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background section-padding">
        <div className="container-main">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <ScrollFadeIn key={s.title} delay={i * 100}>
                <div className="bg-brand-beige rounded-2xl p-8 h-full hover:shadow-lg hover:-translate-y-1 transition-all border-b-4 border-transparent hover:border-brand-orange">
                  <div className="text-brand-orange mb-4">{s.icon}</div>
                  <h3 className="text-xl font-bold font-heading text-brand-blue mb-3">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
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

      {/* CTA */}
      <section className="bg-brand-orange text-primary-foreground section-padding">
        <div className="container-main text-center">
          <ScrollFadeIn>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8">
              Bereit für den nächsten Schritt?
            </h2>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all"
            >
              Jetzt Erstgespräch buchen
            </a>
          </ScrollFadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Leistungen;
