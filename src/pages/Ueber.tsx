import Layout from "@/components/Layout";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { Linkedin, Phone, Shield, Gauge, BarChart3 } from "lucide-react";

const team = [
  {
    name: "Ashley Faulkes",
    role: "CTO",
    img: "/images/ashley-faulkes.png",
    desc: "Der Perfektionist für jede WordPress-Website mit einem grossen Flair für Coding. Ursprünglich aus Melbourne, lebt seit fast 20 Jahren in der Schweiz und ist als renommierter SEO-Spezialist international tätig.",
    linkedin: "https://www.linkedin.com/in/ashleyfaulkes/",
  },
  {
    name: "Priskus Güntensperger",
    role: "Senior Consultant",
    img: "/images/priskus-guentensperger.jpg",
    desc: "Experte für gezielte Kommunikationsstrategien. Mit über 20 Jahren Erfahrung im B2B-Produktmarketing und hohem Verständnis der Informationstechnologien verhilft er Unternehmen zu erfolgreichen Marketing Automation-Lösungen.",
    linkedin: "https://www.linkedin.com/in/priskus-guentensperger/",
  },
  {
    name: "Mira",
    role: "Virtuelle Kundenberaterin (KI)",
    img: "/images/mira.png",
    desc: "KI-basierte Telefonassistentin der 4results AG. Sie nimmt Anrufe entgegen, beantwortet Fragen eigenständig und koordiniert Termine — professionell und empathisch.",
    phone: "+41445057078",
  },
];

const Ueber = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-blue text-primary-foreground section-padding pt-32">
        <div className="container-main text-center">
          <ScrollFadeIn>
            <h1 className="text-3xl md:text-5xl font-bold font-heading max-w-3xl mx-auto">
              Wir sind kein Softwareverkäufer. Wir sind Ihr Sparringspartner.
            </h1>
            <p className="mt-6 text-xl text-brand-lightblue max-w-2xl mx-auto">
              Unabhängige Beratung, ETH-Hintergrund, über 20 Jahre Praxiserfahrung in Sales und Marketing.
            </p>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Alex */}
      <section className="bg-background section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollFadeIn>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-brand-orange p-1">
                    <img
                      src="/images/alex-schoepf.png"
                      alt="Alex Schöpf"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn delay={200}>
              <div>
                <h2 className="text-3xl font-bold font-heading text-brand-blue mb-2">Alex Schöpf</h2>
                <p className="text-brand-orange font-semibold mb-4">CEO, Gründer, Dozent, Autor</p>
                <div className="space-y-4 text-muted-foreground">
                  <p>Alex ist Ingenieur ETH/BWI und gilt als Schweizer Pionier im Bereich Marketing Automation. Seit vielen Jahren begleitet er Unternehmen dabei, erklärungsbedürftige B2B-Angebote sichtbar zu machen und mit intelligenter Automatisierung effizienter zu skalieren.</p>
                  <p>Er verfügt über langjährige Erfahrung als Marketingleiter und hat ein Geschäft von null auf 90 Millionen CHF aufgebaut. Als Early Adopter moderner Technologien hat er über 80 Marketing Automation-Systeme evaluiert und mit über 15 davon selbst gearbeitet.</p>
                  <p>Sein Antrieb: Ehrliches Marketing und Systeme, die verkaufen — ohne operativen Druck.</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/alexschoepf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-brand-lightblue hover:text-brand-orange transition-colors"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="bg-brand-beige py-8">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-brand-blue">
            {["ETH Zürich", "Dozent FHNW", "Dozent ZHAW", "Buchautor", "150+ Projekte"].map((b) => (
              <span key={b} className="bg-background px-4 py-2 rounded-full">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-blue text-primary-foreground section-padding">
        <div className="container-main">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {[
              { value: "150+", label: "Projekte abgeschlossen" },
              { value: "80+", label: "Tools evaluiert" },
              { value: "8", label: "Jahre Sparringspartner für KMU" },
              { value: "20+", label: "Jahre Sales & Marketing" },
            ].map((s, i) => (
              <ScrollFadeIn key={i} delay={i * 100}>
                <div>
                  <p className="text-4xl font-bold font-heading text-brand-orange">{s.value}</p>
                  <p className="mt-2 text-primary-foreground/70">{s.label}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-brand-beige section-padding">
        <div className="container-main max-w-3xl">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold font-heading text-brand-blue mb-6 text-center">
              Warum ich 4results gegründet habe
            </h2>
            <div className="bg-background rounded-2xl p-8 text-muted-foreground leading-relaxed">
              <p className="mb-4">
                Als Marketingleiter und Business Developer in zwei B2B-Unternehmen habe ich erlebt, wie schwer es ist, ohne Systeme und Systemlogik sichtbar zu werden. In einer der Rollen durfte ich ein Geschäft von null auf 90 Millionen CHF skalieren — mit viel Handarbeit.
              </p>
              <p className="mb-4">
                Später, als CMO in einem anderen Unternehmen, entdeckte ich Marketing Automation — und dachte: «Hätte ich das damals schon gekannt, wäre vieles einfacher gewesen.»
              </p>
              <p>
                Diese Erfahrung hat mich nicht mehr losgelassen. Heute helfe ich mit 4results Unternehmen, genau das zu erreichen: skalierbare Resultate mit klarer Strategie, smarter Automation und ehrlichem Marketing.
              </p>
              <p className="mt-6 font-semibold text-brand-blue">— Alex Schöpf, CEO 4results AG</p>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Team */}
      <section className="bg-background section-padding">
        <div className="container-main">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold font-heading text-brand-blue text-center mb-12">
              Strategen & Macher
            </h2>
          </ScrollFadeIn>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((m, i) => (
              <ScrollFadeIn key={m.name} delay={i * 100}>
                <div className="bg-brand-beige rounded-2xl p-6 text-center h-full flex flex-col">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold font-heading text-brand-blue">{m.name}</h3>
                  <p className="text-brand-orange text-sm font-medium mb-3">{m.role}</p>
                  <p className="text-sm text-muted-foreground flex-1">{m.desc}</p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 mt-4 text-brand-lightblue hover:text-brand-orange transition-colors"
                    >
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                  )}
                  {m.phone && (
                    <a
                      href={`tel:${m.phone}`}
                      className="inline-flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-brand-orange rounded-lg text-primary-foreground font-medium text-sm hover:brightness-110 transition-all"
                    >
                      <Phone className="w-4 h-4" /> Direkt mit Mira sprechen
                    </a>
                  )}
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-beige section-padding">
        <div className="container-main">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold font-heading text-brand-blue text-center mb-12">
              Unser Ansatz
            </h2>
          </ScrollFadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <Shield className="w-8 h-8" />, title: "Tool-unabhängig", desc: "Wir evaluieren über 80 Systeme und empfehlen, was passt — nicht was provisionspflichtig ist" },
              { icon: <Gauge className="w-8 h-8" />, title: "Pragmatisch", desc: "Keine endlosen Konzeptphasen — wir starten mit dem ersten Piloten und messen die Wirkung innerhalb von 30 Tagen" },
              { icon: <BarChart3 className="w-8 h-8" />, title: "Messbar", desc: "Jedes Projekt endet mit Zahlen: Leads, Zeitersparnis, Conversion — nicht mit Folien" },
            ].map((v, i) => (
              <ScrollFadeIn key={v.title} delay={i * 100}>
                <div className="bg-background rounded-2xl p-6 text-center">
                  <div className="text-brand-orange mx-auto mb-4">{v.icon}</div>
                  <h3 className="text-xl font-bold font-heading text-brand-blue mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
          <ScrollFadeIn delay={400}>
            <div className="mt-12 text-center">
              <a
                href="https://matech.as.me/15k"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-8 py-4 text-lg font-semibold text-primary-foreground hover:brightness-110 transition-all"
              >
                Jetzt Gespräch buchen
              </a>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Ueber;
