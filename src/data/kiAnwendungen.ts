export interface KIAnwendung {
  title: string;
  bereich: string;
  desc: string;
  metric: string;
  reife: number;
  aufwand: number;
  kosten: number;
  reifeLabel: string;
  aufwandLabel: string;
  kostenLabel: string;
}

export const kiAnwendungen: KIAnwendung[] = [
  { title: "Content-Erstellung", bereich: "Marketing", desc: "KI erstellt Entwürfe für Blog-Artikel, E-Mails und Social-Posts — das Team redigiert nur noch.", metric: "−40% Zeit, +18% Qualität", reife: 90, aufwand: 30, kosten: 20, reifeLabel: "Hoch — produktionsreif", aufwandLabel: "Niedrig — Quick-Win", kostenLabel: "Niedrig" },
  { title: "Kampagnen-Varianten", bereich: "Marketing", desc: "KI generiert aus einem Briefing dutzende Varianten für verschiedene Zielgruppen und Formate.", metric: "10× schneller, −90% Kosten", reife: 75, aufwand: 50, kosten: 40, reifeLabel: "Mittel-Hoch", aufwandLabel: "Mittel", kostenLabel: "Niedrig-Mittel" },
  { title: "Personalisierung", bereich: "Marketing", desc: "KI analysiert Kundenverhalten und passt Inhalte, E-Mails und Empfehlungen in Echtzeit an.", metric: "5–15% Umsatzplus", reife: 85, aufwand: 80, kosten: 80, reifeLabel: "Hoch", aufwandLabel: "Hoch — Datenprojekt", kostenLabel: "Hoch" },
  { title: "Recherche & Briefing", bereich: "Sales", desc: "KI recherchiert Interessenten, fasst LinkedIn-Profile zusammen und bereitet Gesprächs-Briefings vor.", metric: "3 Std./Woche Zeitgewinn", reife: 75, aufwand: 20, kosten: 15, reifeLabel: "Mittel-Hoch", aufwandLabel: "Niedrig — Quick-Win", kostenLabel: "Niedrig" },
  { title: "Angebotserstellung", bereich: "Sales", desc: "KI erstellt personalisierte Angebote aus CRM-Daten, Produktkatalog und Kundenhistorie.", metric: "45% mehr Abschlüsse", reife: 60, aufwand: 50, kosten: 40, reifeLabel: "Mittel", aufwandLabel: "Mittel", kostenLabel: "Niedrig-Mittel" },
  { title: "KI-Vertragsanalyse", bereich: "Sales", desc: "KI prüft Verträge auf Risiken und fehlende Klauseln — in Sekunden statt Stunden.", metric: "Prüfzeit −80%, 449% ROI", reife: 85, aufwand: 50, kosten: 50, reifeLabel: "Hoch", aufwandLabel: "Mittel", kostenLabel: "Mittel" },
  { title: "Ticket-Antwortvorschläge", bereich: "Service", desc: "KI schlägt Agenten in Echtzeit Antworten vor — basierend auf dem Wissen der besten Mitarbeitenden.", metric: "+14% Produktivität", reife: 70, aufwand: 50, kosten: 50, reifeLabel: "Mittel-Hoch", aufwandLabel: "Mittel", kostenLabel: "Mittel" },
  { title: "Chat-Selbstbedienung", bereich: "Service", desc: "KI-Chat beantwortet Kundenanfragen vollständig — nur komplexe Fälle werden eskaliert.", metric: "67% der Chats automatisiert", reife: 65, aufwand: 65, kosten: 75, reifeLabel: "Mittel (GenAI)", aufwandLabel: "Mittel-Hoch", kostenLabel: "Hoch" },
  { title: "Voicebot Telefon", bereich: "Service", desc: "KI-Voicebot nimmt Anrufe entgegen, beantwortet häufige Fragen und leitet weiter.", metric: "207% ROI, Payback < 6 Mt.", reife: 85, aufwand: 80, kosten: 75, reifeLabel: "Hoch", aufwandLabel: "Hoch", kostenLabel: "Hoch" },
  { title: "Recruiting mit KI", bereich: "HR", desc: "KI screent Bewerbungen, matched Profile mit Anforderungen und erstellt Shortlists automatisch.", metric: "86% schneller, −30% Kosten", reife: 65, aufwand: 40, kosten: 35, reifeLabel: "Mittel", aufwandLabel: "Niedrig-Mittel", kostenLabel: "Niedrig-Mittel" },
  { title: "HR-Chatbot", bereich: "HR", desc: "Interner KI-Chatbot beantwortet Mitarbeiterfragen zu Ferien, Benefits und IT-Support — rund um die Uhr.", metric: "65% weniger Tickets", reife: 70, aufwand: 50, kosten: 50, reifeLabel: "Mittel-Hoch", aufwandLabel: "Mittel", kostenLabel: "Mittel" },
  { title: "KI für HR-Dokumente", bereich: "HR", desc: "KI generiert Arbeitsverträge, Zeugnisse und Onboarding-Dokumente aus Vorlagen in Minuten.", metric: "−70% Aufwand", reife: 90, aufwand: 20, kosten: 15, reifeLabel: "Hoch — produktionsreif", aufwandLabel: "Niedrig — Quick-Win", kostenLabel: "Niedrig" },
  { title: "Planung & Steuerung", bereich: "Geschäftsleitung", desc: "KI analysiert historische Daten und erstellt Forecasts automatisch — mit laufender Korrektur.", metric: "Fehlerquote −20 bis −50%", reife: 85, aufwand: 60, kosten: 55, reifeLabel: "Hoch", aufwandLabel: "Mittel-Hoch", kostenLabel: "Mittel" },
  { title: "Markt- & Wettbewerbsanalyse", bereich: "Geschäftsleitung", desc: "KI durchsucht öffentliche Quellen und liefert strukturierte Wettbewerbsberichte auf Knopfdruck.", metric: "30% weniger Analysezeit", reife: 60, aufwand: 40, kosten: 35, reifeLabel: "Mittel", aufwandLabel: "Niedrig-Mittel", kostenLabel: "Niedrig-Mittel" },
  { title: "Persönliche KI-Assistenz", bereich: "Geschäftsleitung", desc: "KI-Copilot fasst Meetings zusammen, erstellt E-Mail-Entwürfe und übernimmt repetitiven Admin.", metric: "3 Std./Woche weniger Admin", reife: 90, aufwand: 20, kosten: 15, reifeLabel: "Hoch — produktionsreif", aufwandLabel: "Niedrig — Quick-Win", kostenLabel: "Niedrig" },
  { title: "Rechnungsverarbeitung", bereich: "Finanzen", desc: "KI liest Rechnungen, extrahiert Positionen, gleicht mit Bestellungen ab und kontiert automatisch.", metric: "81% Kostenreduktion", reife: 85, aufwand: 50, kosten: 50, reifeLabel: "Hoch", aufwandLabel: "Mittel", kostenLabel: "Mittel" },
  { title: "Forecasts & Berichte", bereich: "Finanzen", desc: "KI generiert Finanzberichte und Abweichungsanalysen auf Knopfdruck — in Minuten statt Wochen.", metric: "50% schnellere Reports", reife: 85, aufwand: 50, kosten: 50, reifeLabel: "Hoch", aufwandLabel: "Mittel", kostenLabel: "Mittel" },
  { title: "Fraud Detection", bereich: "Finanzen", desc: "KI überwacht Transaktionen in Echtzeit und markiert verdächtige Vorgänge — bevor ein Schaden entsteht.", metric: "90–98% Trefferquote, 580% ROI", reife: 55, aufwand: 65, kosten: 65, reifeLabel: "Mittel (KMU)", aufwandLabel: "Mittel-Hoch", kostenLabel: "Mittel-Hoch" },
];

export const bereiche = ["Marketing", "Sales", "Service", "HR", "Geschäftsleitung", "Finanzen"] as const;
