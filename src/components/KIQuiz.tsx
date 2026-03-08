import { useState } from "react";
import { kiAnwendungen, KIAnwendung, bereiche } from "@/data/kiAnwendungen";
import { Megaphone, TrendingUp, Headphones, Users, Briefcase, Calculator, Check } from "lucide-react";

const bereichIcons: Record<string, React.ReactNode> = {
  Marketing: <Megaphone className="w-6 h-6" />,
  Sales: <TrendingUp className="w-6 h-6" />,
  Service: <Headphones className="w-6 h-6" />,
  HR: <Users className="w-6 h-6" />,
  Geschäftsleitung: <Briefcase className="w-6 h-6" />,
  Finanzen: <Calculator className="w-6 h-6" />,
};

const firmenGroessen = ["Unter 20 Mitarbeitende", "20–200 Mitarbeitende", "Über 200 Mitarbeitende"];

const KIQuiz = () => {
  const [step, setStep] = useState(1);
  const [firmengroesse, setFirmengroesse] = useState("");
  const [selectedBereiche, setSelectedBereiche] = useState<string[]>([]);
  const [results, setResults] = useState<KIAnwendung[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [branche, setBranche] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleBereich = (b: string) => {
    if (selectedBereiche.includes(b)) {
      setSelectedBereiche(selectedBereiche.filter((x) => x !== b));
    } else if (selectedBereiche.length < 3) {
      setSelectedBereiche([...selectedBereiche, b]);
    }
  };

  const calculateResults = () => {
    const matched = kiAnwendungen
      .filter((a) => selectedBereiche.includes(a.bereich))
      .sort((a, b) => a.aufwand - b.aufwand)
      .slice(0, 5);
    setResults(matched);
    setShowResults(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/1066047/uxtmoir/", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, branche, firmengroesse, bereiche: selectedBereiche }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <section id="ki-quiz" className="bg-brand-beige section-padding">
      <div className="container-main max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-brand-blue mb-3">
          Welche KI-Anwendungen passen zu Ihrem Unternehmen?
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          2 Fragen — und Sie sehen sofort, welche der 18 KI-Anwendungen für Sie relevant sind, wie reif die Technologie ist und was die Umsetzung kostet.
        </p>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                showResults && s === 3
                  ? "w-16 bg-brand-lightblue"
                  : step >= s || (showResults && s < 3)
                  ? "w-16 bg-brand-lightblue"
                  : "w-8 bg-brand-blue/20"
              }`}
            />
          ))}
        </div>

        {!showResults && step === 1 && (
          <div className="space-y-4">
            <p className="font-semibold text-brand-blue text-center mb-6">Schritt 1: Firmengrösse</p>
            <div className="grid gap-3 max-w-md mx-auto">
              {firmenGroessen.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setFirmengroesse(g);
                    setStep(2);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-medium transition-all hover:border-brand-orange ${
                    firmengroesse === g ? "border-brand-orange bg-brand-orange/10" : "border-brand-blue/20 bg-background"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {!showResults && step === 2 && (
          <div className="space-y-4">
            <p className="font-semibold text-brand-blue text-center mb-2">Schritt 2: In welchen Bereichen wollen Sie KI einsetzen?</p>
            <p className="text-sm text-muted-foreground text-center mb-6">(max. 3 wählbar)</p>
            <div className="grid gap-4 md:grid-cols-3">
              {bereiche.map((b) => (
                <button
                  key={b}
                  onClick={() => toggleBereich(b)}
                  className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all hover:border-brand-orange ${
                    selectedBereiche.includes(b)
                      ? "border-brand-orange bg-brand-orange/10"
                      : "border-brand-blue/20 bg-background"
                  }`}
                >
                  <div className="text-brand-orange">{bereichIcons[b]}</div>
                  <span className="font-semibold text-brand-blue">{b}</span>
                  {selectedBereiche.includes(b) && (
                    <Check className="w-5 h-5 text-brand-orange" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-lg border-2 border-brand-blue/30 text-brand-blue font-medium hover:bg-brand-blue/5 transition-colors"
              >
                Zurück
              </button>
              <button
                onClick={calculateResults}
                disabled={selectedBereiche.length === 0}
                className="px-8 py-3 rounded-lg bg-brand-orange text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all"
              >
                Ergebnis anzeigen
              </button>
            </div>
          </div>
        )}

        {showResults && (
          <div className="space-y-8 animate-fade-in-up">
            <h3 className="text-2xl font-bold font-heading text-brand-blue text-center">Ihre Top-5 KI-Anwendungen</h3>
            <p className="text-center text-muted-foreground mb-8">Priorisiert nach Ihren Schwerpunkten — mit Reife, Aufwand und Kosten auf einen Blick</p>
            
            <div className="space-y-4">
              {results.map((item, i) => (
                <ResultCard key={i} item={item} delay={i * 150} />
              ))}
            </div>

            {/* Opt-in */}
            <div className="mt-12 bg-brand-blue rounded-2xl p-8 text-primary-foreground">
              <h4 className="text-xl font-bold font-heading text-center mb-6">Alle 18 KI-Anwendungen als Komplettpaket erhalten</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-brand-beige rounded-xl p-5 text-brand-blue">
                  <p className="font-bold mb-2">18 KI-Anwendungen Übersicht & Scorecard</p>
                  <p className="text-sm text-muted-foreground">Alle 18 Use Cases in 6 Bereichen mit ROI-Einschätzung, Reife und Umsetzungs-Komplexität auf einen Blick</p>
                </div>
                <div className="bg-brand-beige rounded-xl p-5 text-brand-blue">
                  <p className="font-bold mb-2">Experten-Dossier Zahlen & Quellen</p>
                  <p className="text-sm text-muted-foreground">Evidenzbasis mit Quellenangaben von McKinsey, Forrester und IBM, Evidenzstufen und direkten Links zu Originalstudien</p>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                  <p className="text-sm text-center text-primary-foreground/70">Senden Sie mir beide Dokumente kostenlos zu:</p>
                  <input
                    type="text"
                    placeholder="Ihre Branche — optional"
                    value={branche}
                    onChange={(e) => setBranche(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-primary-foreground text-brand-blue placeholder:text-brand-blue/50"
                  />
                  <input
                    type="email"
                    required
                    placeholder="E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-primary-foreground text-brand-blue placeholder:text-brand-blue/50"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-lg bg-brand-orange font-semibold hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {submitting ? "Wird gesendet..." : "Jetzt kostenlos erhalten"}
                  </button>
                  <p className="text-xs text-center text-primary-foreground/50">
                    Kein Spam. Abmeldung jederzeit möglich. 4results AG, Pfäffikon SZ.
                  </p>
                </form>
              ) : (
                <p className="text-center text-lg font-medium">
                  Vielen Dank — Sie erhalten beide Dokumente in Kürze per E-Mail.
                </p>
              )}

              <div className="mt-6 text-center">
                <a
                  href="https://matech.as.me/15k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 border-2 border-primary-foreground/50 rounded-lg font-medium hover:bg-primary-foreground/10 transition-colors"
                >
                  Oder direkt sprechen: Kostenloses Erstgespräch buchen
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ResultCard = ({ item, delay }: { item: KIAnwendung; delay: number }) => {
  const [animate, setAnimate] = useState(false);

  useState(() => {
    const timer = setTimeout(() => setAnimate(true), delay + 100);
    return () => clearTimeout(timer);
  });

  return (
    <div
      className="bg-background rounded-xl p-6 border border-brand-blue/10 shadow-sm grid md:grid-cols-2 gap-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-brand-lightblue/20 text-brand-lightblue text-xs font-medium mb-3">
          {item.bereich}
        </span>
        <h4 className="text-lg font-bold text-brand-blue mb-2">{item.title}</h4>
        <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
        <p className="text-brand-orange font-bold">{item.metric}</p>
      </div>
      <div className="space-y-4">
        <BarWithLabel label="Reife" value={item.reife} sublabel={item.reifeLabel} color="bg-green-500" animate={animate} />
        <BarWithLabel label="Aufwand" value={item.aufwand} sublabel={item.aufwandLabel} color="bg-brand-orange" animate={animate} />
        <BarWithLabel label="Kosten" value={item.kosten} sublabel={item.kostenLabel} color="bg-brand-lightblue" animate={animate} />
      </div>
    </div>
  );
};

const BarWithLabel = ({
  label,
  value,
  sublabel,
  color,
  animate,
}: {
  label: string;
  value: number;
  sublabel: string;
  color: string;
  animate: boolean;
}) => (
  <div>
    <div className="flex justify-between text-xs text-muted-foreground mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-brand-blue/10 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-[1200ms] ease-out ${color}`}
        style={{ width: animate ? `${value}%` : "0%" }}
      />
    </div>
    <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
  </div>
);

export default KIQuiz;
