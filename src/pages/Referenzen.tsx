import Layout from "@/components/Layout";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { site } from "@/config/site";

const testimonials = [
  { quote: "Die Anzahl Leads hat sich vervielfacht, einige Hot Leads sind dabei — die Resultate lagen weit über unseren Erwartungen.", author: "Dean Corkovic", role: "Project Manager Demand Generation, Avaloq Evolution AG", featured: true },
  { quote: "Die Arbeit mit Alex Schoepf hat uns in der digitalen Transformation weitergebracht. Die Automation im Event Management und das Lead Scoring sind der Schlüssel für die Effizienzsteigerung.", author: "Michael Kompatscher", role: "Geschäftsführer, VersuchsStollen Hagerbach AG", featured: true },
  { quote: "Innerhalb kürzester Zeit konnten wir mehrsprachige Experimente mit Lead Magneten durchführen und wertvolle Erkenntnisse für unsere Lead-Generierung gewinnen.", author: "Alessandra De Bernardi", role: "Head of Marketing Digital Innovation, Angst+Pfister", featured: true },
  { quote: "Dank 4results konnten wir eine strategische und pragmatische Lösung finden. Alex hatte stets die Zukunft im Blick und hat uns dabei auch zünftig gechallenged.", author: "Lorraine Fischer", role: "Projektleiterin & Stv. Managing Partner, Qmart AG", featured: false },
  { quote: "Seine Kompetenz, langjährige Erfahrung und Bereitschaft, sein Wissen zu teilen — ganz herstellerunabhängig — machen den Austausch mit ihm zu einem echten Gewinn.", author: "Peter Hosp", role: "Marketing Communications Manager, OMICRON electronics GmbH", featured: false },
  { quote: "Die Expertise von Alex Schoepf im Bereich Marketing Automation ist sehr gross. Er hat die Fähigkeit, sich schnell in verschiedene Geschäftsumgebungen einzuarbeiten.", author: "Markus Lau", role: "Leiter Sales und Smarketing, Gressel AG", featured: false },
];

const Referenzen = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-brand-blue text-primary-foreground section-padding pt-32">
        <div className="container-main text-center">
          <ScrollFadeIn>
            <h1 className="text-4xl md:text-5xl font-bold font-heading">
              Das sagen unsere Kunden
            </h1>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="bg-background section-padding">
        <div className="container-main">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.filter(t => t.featured).map((t, i) => (
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

      {/* More Testimonials */}
      <section className="bg-brand-beige section-padding">
        <div className="container-main">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.filter(t => !t.featured).map((t, i) => (
              <ScrollFadeIn key={i} delay={i * 100}>
                <div className="bg-background rounded-2xl p-6 border-l-4 border-brand-orange h-full flex flex-col">
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

      {/* Case Study */}
      <section className="bg-brand-blue text-primary-foreground section-padding">
        <div className="container-main text-center">
          <ScrollFadeIn>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              <span className="font-bold text-brand-orange">Swico:</span> E-Mail-Öffnungsraten von 42% auf 55% gesteigert — dank KI-optimierter Texte und personalisierter Automations-Sequenzen.
            </p>
          </ScrollFadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange text-primary-foreground section-padding">
        <div className="container-main text-center">
          <ScrollFadeIn>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Überzeugt?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/80">
              Lassen Sie uns gemeinsam prüfen, was für Sie möglich ist.
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-8 py-4 text-lg font-semibold hover:brightness-110 transition-all"
            >
              Jetzt kostenloses Erstgespräch buchen
            </a>
          </ScrollFadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Referenzen;
