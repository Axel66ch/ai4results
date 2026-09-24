import { useState, useEffect } from "react";
import { kiAnwendungen, KIAnwendung, bereiche } from "@/data/kiAnwendungen";
import { submitLead } from "@/lib/leadSubmit";
import { getAttribution } from "@/lib/attribution";
import { Megaphone, TrendingUp, Headphones, Users, Briefcase, Calculator, Check, Crown, Target, UserCog } from "lucide-react";
import { site } from "@/config/site";

const bereichIcons: Record<string, React.ReactNode> = {
  Marketing: <Megaphone className="w-6 h-6" />,
  Sales: <TrendingUp className="w-6 h-6" />,
  Service: <Headphones className="w-6 h-6" />,
  HR: <Users className="w-6 h-6" />,
  Geschäftsleitung: <Briefcase className="w-6 h-6" />,
  Finanzen: <Calculator className="w-6 h-6" />,
};

const firmenGroessen = ["Unter 20 Mitarbeitende", "20–200 Mitarbeitende", "Über 200 Mitarbeitende"];

export type QuizRolle = "CEO / Geschäftsleitung" | "CMO / Marketingleitung" | "Andere Rolle";

interface RolleOption {
  value: QuizRolle;
  icon: React.ReactNode;
  hint: string;
  /** Bereiche, die für diese Rolle im Ranking bevorzugt werden */
  coreBereiche: string[];
  /** Vorauswahl der Bereiche in Schritt 3 */
  defaultBereiche: string[];
}

const rollen: RolleOption[] = [
  {
    value: "CEO / Geschäftsleitung",
    icon: <Crown className="w-6 h-6" />,
    hint: "Sie wollen wissen, wo KI im ganzen Unternehmen den grössten Hebel hat",
    coreBereiche: ["Geschäftsleitung", "Finanzen", "Sales"],
    defaultBereiche: ["Geschäftsleitung", "Finanzen", "Sales"],
  },
  {
    value: "CMO / Marketingleitung",
    icon: <Target className="w-6 h-6" />,
    hint: "Sie wollen mit KI mehr qualifizierte Leads und messbare Kampagnen",
    coreBereiche: ["Marketing", "Sales"],
    defaultBereiche: ["Marketing", "Sales"],
  },
  {
    value: "Andere Rolle",
    icon: <UserCog className="w-6 h-6" />,
    hint: "Sie prüfen KI-Potenzial für Ihren Bereich oder Ihr Team",
    coreBereiche: [],
    defaultBereiche: [],
  },
];

/** Einfaches Lead-Scoring für die Übergabe an CRM/Zapier */
const computeLeadScore = (rolle: string, firmengroesse: string, anzahlBereiche: number) => {
  let score = 0;
  if (rolle === "CEO / Geschäftsleitung") score += 40;
  else if (rolle === "CMO / Marketingleitung") score += 35;
  else score += 10;
  if (firmengroesse === "20–200 Mitarbeitende") score += 35;
  else if (firmengroesse === "Über 200 Mitarbeitende") score += 25;
  else score += 15;
  score += Math.min(anzahlBereiche, 3) * 5;
  return score;
};

const KIQuiz = () => {
  const [step, setStep] = useState(1);
  const [rolle, setRolle] = useState<QuizRolle | "">("");
  const [firmengroesse, setFirmengroesse] = useState("");
  const [selectedBereiche, setSelectedBereiche] = useState<string[]>([]);
  const [results, setResults] = useState<KIAnwendung[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [branche, setBranche] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [einwilligung, setEinwilligung] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Persona-Einstiege (z.B. "Für CEOs"-Karte auf der Startseite) können die Rolle vorbelegen
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<QuizRolle>).detail;
      const option = rollen.find((r) => r.value === detail);
      if (!option) return;
      setRolle(option.value);
      setSelectedBereiche(option.defaultBereiche);
      setShowResults(false);
      setSubmitted(false);
      setStep(2);
    };
    window.addEventListener("kiquiz:rolle", handler);
    return () => window.removeEventListener("kiquiz:rolle", handler);
  }, []);

  const selectRolle = (option: RolleOption) => {
    const previousDefaults = rollen.find((r) => r.value === rolle)?.defaultBereiche ?? [];
    const untouched =
      selectedBereiche.length === previousDefaults.length &&
      selectedBereiche.every((b) => previousDefaults.includes(b));
    // Vorauswahl nur ersetzen, wenn die Person sie noch nicht selbst angepasst hat
    if (selectedBereiche.length === 0 || untouched) {
      setSelectedBereiche(option.defaultBereiche);
    }
    setRolle(option.value);
    setStep(2);
  };

  const editSelection = () => {
    setShowResults(false);
    setStep(3);
    document.getElementById("ki-quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleBereich = (b: string) => {
    if (selectedBereiche.includes(b)) {
      setSelectedBereiche(selectedBereiche.filter((x) => x !== b));
    } else if (selectedBereiche.length < 3) {
      setSelectedBereiche([...selectedBereiche, b]);
    }
  };

  const calculateResults = () => {
    const coreBereiche = rollen.find((r) => r.value === rolle)?.coreBereiche ?? [];
    const matched = kiAnwendungen
      .filter((a) => selectedBereiche.includes(a.bereich))
      .map((a) => {
        // Schnell umsetzbar + technologisch reif zuerst; Kernbereiche der Rolle bevorzugen
        const score = a.reife * 0.4 + (100 - a.aufwand) * 0.6 + (coreBereiche.includes(a.bereich) ? 15 : 0);
        return { anwendung: a, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => x.anwendung);
    setResults(matched);
    setShowResults(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !einwilligung) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitLead({
        email,
        branche,
        firmengroesse,
        rolle,
        bereiche: selectedBereiche,
        topAnwendungen: results.map((r) => r.title),
        leadScore: computeLeadScore(rolle, firmengroesse, selectedBereiche.length),
        einwilligung: `Ja, ${new Date().toISOString()}`,
        ...getAttribution(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError(
        `Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie an ${site.email}.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const isCEO = rolle === "CEO / Geschäftsleitung";
  const isCMO = rolle === "CMO / Marketingleitung";

  return (
    <section id="ki-quiz" className="bg-brand-beige section-padding">
      <div className="container-main max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-brand-blue mb-3">
          Welche KI-Anwendungen passen zu Ihrem Unternehmen?
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          3 Fragen — und Sie sehen sofort, welche der 18 KI-Anwendungen für Ihre Rolle und Ihr Unternehmen relevant sind, wie reif die Technologie ist und was die Umsetzung kostet.
        </p>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                showResults || step >= s
                  ? "w-14 bg-brand-lightblue"
                  : "w-7 bg-brand-blue/20"
              }`}
            />
          ))}
        </div>

        {!showResults && step === 1 && (
          <div className="space-y-4">
            <p className="font-semibold text-brand-blue text-center mb-6">Schritt 1: Was ist Ihre Rolle?</p>
            <div className="grid gap-4 md:grid-cols-3">
              {rollen.map((r) => (
                <button
                  key={r.value}
                  onClick={() => selectRolle(r)}
                  aria-pressed={rolle === r.value}
                  className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 text-center transition-all hover:border-brand-orange ${
                    rolle === r.value ? "border-brand-orange bg-brand-orange/10" : "border-brand-blue/20 bg-background"
                  }`}
                >
                  <div className="text-brand-orange">{r.icon}</div>
                  <span className="font-semibold text-brand-blue">{r.value}</span>
                  <span className="text-xs text-muted-foreground">{r.hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {!showResults && step === 2 && (
          <div className="space-y-4">
            <p className="font-semibold text-brand-blue text-center mb-6">Schritt 2: Firmengrösse</p>
            <div className="grid gap-3 max-w-md mx-auto">
              {firmenGroessen.map((g) => (
                <button
                  key={g}
                  aria-pressed={firmengroesse === g}
                  onClick={() => {
                    setFirmengroesse(g);
                    setStep(3);
                  }}
                  className={`p-4 rounded-xl border-2 text-left font-medium transition-all hover:border-brand-orange ${
                    firmengroesse === g ? "border-brand-orange bg-brand-orange/10" : "border-brand-blue/20 bg-background"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-lg border-2 border-brand-blue/30 text-brand-blue font-medium hover:bg-brand-blue/5 transition-colors"
              >
                Zurück
              </button>
            </div>
          </div>
        )}

        {!showResults && step === 3 && (
          <div className="space-y-4">
            <p className="font-semibold text-brand-blue text-center mb-2">Schritt 3: In welchen Bereichen wollen Sie KI einsetzen?</p>
            <p className="text-sm text-muted-foreground text-center mb-6">
              {selectedBereiche.length > 0 && (isCEO || isCMO)
                ? "Basierend auf Ihrer Rolle haben wir eine Vorauswahl getroffen — passen Sie sie gerne an (max. 3)"
                : "(max. 3 wählbar)"}
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {bereiche.map((b) => (
                <button
                  key={b}
                  onClick={() => toggleBereich(b)}
                  aria-pressed={selectedBereiche.includes(b)}
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
                onClick={() => setStep(2)}
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
            <h3 className="text-2xl font-bold font-heading text-brand-blue text-center">
              {isCEO
                ? `Ihre Top-${results.length} KI-Hebel als CEO`
                : isCMO
                ? `Ihre Top-${results.length} KI-Hebel für Marketing & Leads`
                : `Ihre Top-${results.length} KI-Anwendungen`}
            </h3>
            <p className="text-center text-muted-foreground mb-8">
              Priorisiert nach Reife und Umsetzbarkeit für Ihre Rolle — mit Aufwand und Kosten auf einen Blick
            </p>

            <div className="space-y-4">
              {results.map((item, i) => (
                <ResultCard key={item.title} item={item} delay={i * 150} />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={editSelection}
                className="px-6 py-3 rounded-lg border-2 border-brand-blue/30 text-brand-blue font-medium hover:bg-brand-blue/5 transition-colors"
              >
                Auswahl anpassen
              </button>
            </div>

            {/* Opt-in */}
            <div className="mt-12 bg-brand-blue rounded-2xl p-8 text-primary-foreground">
              <h4 className="text-xl font-bold font-heading text-center mb-2">
                {isCEO
                  ? "Ihre Entscheidungsgrundlage: Alle 18 KI-Anwendungen mit ROI & Kosten"
                  : isCMO
                  ? "Ihr Umsetzungspaket: Alle 18 KI-Anwendungen mit ROI & Quellen"
                  : "Alle 18 KI-Anwendungen als Komplettpaket erhalten"}
              </h4>
              <p className="text-center text-primary-foreground/70 text-sm mb-6">
                {isCEO
                  ? "Damit Sie im nächsten GL-Meeting nicht über KI diskutieren, sondern entscheiden."
                  : isCMO
                  ? "Damit Sie intern belegen können, welche KI-Massnahmen Leads und Pipeline messbar steigern."
                  : "Die komplette Übersicht für Ihren KI-Einstieg."}
              </p>
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
                <>
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                    <p className="text-sm text-center text-primary-foreground/70">Senden Sie mir beide Dokumente kostenlos zu:</p>
                    <label htmlFor="quiz-branche" className="sr-only">Branche</label>
                    <input
                      id="quiz-branche"
                      type="text"
                      placeholder="Ihre Branche — optional"
                      value={branche}
                      onChange={(e) => setBranche(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-primary-foreground text-brand-blue placeholder:text-brand-blue/50"
                    />
                    <label htmlFor="quiz-email" className="sr-only">Geschäftliche E-Mail-Adresse</label>
                    <input
                      id="quiz-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Geschäftliche E-Mail-Adresse"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-primary-foreground text-brand-blue placeholder:text-brand-blue/50"
                    />
                    <label className="flex items-start gap-3 text-left text-sm text-primary-foreground/80">
                      <input
                        type="checkbox"
                        required
                        checked={einwilligung}
                        onChange={(e) => setEinwilligung(e.target.checked)}
                        className="mt-1 h-4 w-4 shrink-0 accent-brand-orange"
                      />
                      <span>
                        Ja, ich möchte die beiden Dokumente sowie weitere Informationen zu KI und Marketing Automation
                        per E-Mail erhalten. Die Einwilligung kann ich jederzeit widerrufen. Details in der{" "}
                        <a
                          href={site.datenschutzUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-brand-orange"
                        >
                          Datenschutzerklärung
                        </a>
                        .
                      </span>
                    </label>
                    <button
                      type="submit"
                      disabled={submitting || !einwilligung}
                      className="w-full py-3 rounded-lg bg-brand-orange font-semibold hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {submitting ? "Wird gesendet..." : "Jetzt kostenlos erhalten"}
                    </button>
                    {submitError && (
                      <p role="alert" className="text-sm text-center text-brand-orange">
                        {submitError}
                      </p>
                    )}
                    <p className="text-xs text-center text-primary-foreground/50">
                      Kein Spam. Abmeldung jederzeit möglich. 4results AG, Pfäffikon SZ.
                    </p>
                  </form>
                  <div className="max-w-md mx-auto mt-6 border-t border-primary-foreground/10 pt-4">
                    <p className="text-sm italic text-primary-foreground/70 text-center">
                      «Die Anzahl Leads hat sich vervielfacht — die Resultate lagen weit über unseren Erwartungen.»
                    </p>
                    <p className="text-xs text-primary-foreground/50 text-center mt-2">
                      Dean Corkovic, Demand Generation, Avaloq Evolution AG
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6">
                  <p className="text-lg font-medium">
                    Vielen Dank — Sie erhalten beide Dokumente in Kürze per E-Mail.
                  </p>
                  <div className="bg-primary-foreground/10 rounded-xl p-6 max-w-lg mx-auto">
                    <p className="font-bold mb-2">
                      {isCEO
                        ? "Der schnellste nächste Schritt: 15 Minuten mit Alex"
                        : isCMO
                        ? "Der schnellste Weg zu mehr Leads: 15 Minuten mit Alex"
                        : "Der schnellste nächste Schritt: 15 Minuten mit Alex"}
                    </p>
                    <p className="text-sm text-primary-foreground/70 mb-4">
                      {isCEO
                        ? "Alex zeigt Ihnen anhand Ihrer Top-Anwendungen, wo Ihr Unternehmen zuerst ansetzen sollte — unverbindlich und konkret."
                        : isCMO
                        ? "Alex zeigt Ihnen anhand Ihrer Top-Anwendungen, wie Sie den ersten KI-Hebel in 30 Tagen live bringen — unverbindlich und konkret."
                        : "Alex zeigt Ihnen anhand Ihrer Top-Anwendungen den grössten Hebel — unverbindlich und konkret."}
                    </p>
                    <a
                      href={site.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-3 bg-brand-orange rounded-lg font-semibold hover:brightness-110 transition-all"
                    >
                      Kostenloses Erstgespräch buchen
                    </a>
                  </div>
                </div>
              )}

              {!submitted && (
                <div className="mt-6 text-center">
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 border-2 border-primary-foreground/50 rounded-lg font-medium hover:bg-primary-foreground/10 transition-colors"
                  >
                    Oder direkt sprechen: Kostenloses Erstgespräch buchen
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ResultCard = ({ item, delay }: { item: KIAnwendung; delay: number }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay + 100);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="bg-background rounded-xl p-6 border border-brand-blue/10 shadow-sm grid md:grid-cols-2 gap-6"
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
        className={`h-full rounded-full transition-all ease-out motion-reduce:transition-none ${color}`}
        style={{ width: animate ? `${value}%` : "0%", transitionDuration: "1200ms" }}
      />
    </div>
    <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
  </div>
);

export default KIQuiz;
