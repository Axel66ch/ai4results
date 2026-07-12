import Layout from "@/components/Layout";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { Lightbulb, Clock, Users } from "lucide-react";

const benefits = [
  { icon: <Lightbulb className="w-8 h-8" />, text: "Marketing läuft — aber Automation fehlt der rote Faden? Wir finden ihn." },
  { icon: <Clock className="w-8 h-8" />, text: "KI-Ideen stapeln sich — aber Umsetzung kostet Zeit? Wir priorisieren." },
  { icon: <Users className="w-8 h-8" />, text: "Wettbewerber werden schneller — Ihr Team ist ausgelastet? Wir entlasten." },
];

const Kontakt = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-blue text-primary-foreground section-padding pt-32">
        <div className="container-main text-center">
          <ScrollFadeIn>
            <h1 className="text-3xl md:text-5xl font-bold font-heading max-w-3xl mx-auto">
              15 Minuten mit Alex — unverbindlich, konkret, kostenlos
            </h1>
            <p className="mt-6 text-xl text-brand-lightblue max-w-2xl mx-auto">
              Kein Verkaufsgespräch. Alex zeigt Ihnen im Call die grösste Hebelstelle in Ihrem Unternehmen.
            </p>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-brand-beige section-padding">
        <div className="container-main">
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <ScrollFadeIn key={i} delay={i * 100}>
                <div className="bg-background rounded-2xl p-6 text-center">
                  <div className="text-brand-orange mx-auto mb-4">{b.icon}</div>
                  <p className="text-brand-blue font-medium">{b.text}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-background section-padding pb-0">
        <div className="container-main">
          <ScrollFadeIn>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-blue text-center mb-10">
              So läuft das Erstgespräch ab
            </h2>
          </ScrollFadeIn>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Sie schildern Ihre Situation", desc: "Rolle, Team, Ziele — in 5 Minuten ist klar, wo Sie stehen" },
              { step: "2", title: "Alex zeigt den grössten Hebel", desc: "Konkret für Ihr Unternehmen: Welche KI-Anwendung bringt zuerst messbare Resultate" },
              { step: "3", title: "Sie entscheiden", desc: "Sie erhalten eine klare Empfehlung — ob Sie damit intern weiterarbeiten oder mit uns, bleibt Ihnen überlassen" },
            ].map((s, i) => (
              <ScrollFadeIn key={s.step} delay={i * 100}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-orange text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold font-heading text-brand-blue mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Acuity Embed */}
      <section className="bg-background section-padding">
        <div className="container-main">
          <ScrollFadeIn>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://matech.as.me/15k"
                title="Termin buchen"
                className="w-full border-0"
                style={{ minHeight: "800px" }}
              />
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Mira CTA */}
      <section className="bg-brand-blue text-primary-foreground section-padding">
        <div className="container-main text-center">
          <ScrollFadeIn>
            <p className="text-lg mb-6 text-primary-foreground/70">Oder lieber zuerst mit Mira sprechen?</p>
            <div className="flex justify-center mb-6">
              <img
                src="/images/mira.png"
                alt="Mira"
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
            <p className="max-w-lg mx-auto text-primary-foreground/80 mb-6">
              Mira ist unsere KI-Telefonassistentin. In weniger als 60 Sekunden findet sie den optimalen Slot für Ihr Gespräch mit Alex.
            </p>
            <a
              href="tel:+41445057078"
              className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all"
            >
              Jetzt mit Mira sprechen
            </a>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-brand-beige section-padding">
        <div className="container-main text-center">
          <ScrollFadeIn>
            <div className="space-y-2 text-brand-blue">
              <p className="font-semibold">
                <a href="mailto:alex@4results.ch" className="hover:text-brand-orange transition-colors">
                  alex@4results.ch
                </a>
              </p>
              <p>
                <a href="tel:+41445057078" className="hover:text-brand-orange transition-colors">
                  +41 44 505 70 78
                </a>
              </p>
              <p className="text-muted-foreground">
                4results AG · Etzelstr. 82 · 8808 Pfäffikon SZ
              </p>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Kontakt;
