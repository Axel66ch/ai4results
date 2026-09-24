export interface Attribution {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  referrer: string;
  landingPage: string;
}

const STORAGE_KEY = "ai4results:attribution";

const empty: Attribution = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
  referrer: "",
  landingPage: "",
};

/** Hält UTM-Parameter, Referrer und Einstiegsseite des ersten Seitenaufrufs der Sitzung fest */
export const captureAttribution = () => {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      utmTerm: params.get("utm_term") ?? "",
      utmContent: params.get("utm_content") ?? "",
      referrer: document.referrer,
      landingPage: window.location.href,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage nicht verfügbar (z.B. blockierte Cookies) — Attribution entfällt
  }
};

export const getAttribution = (): Attribution => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? { ...empty, ...JSON.parse(stored) } : empty;
  } catch {
    return empty;
  }
};
