import {
  activeCampaignConfig,
  AcFieldKey,
  isActiveCampaignConfigured,
  zapierWebhookUrl,
} from "@/config/activecampaign";
import { Attribution } from "@/lib/attribution";

export interface QuizLead extends Attribution {
  email: string;
  rolle: string;
  firmengroesse: string;
  branche: string;
  bereiche: string[];
  topAnwendungen: string[];
  leadScore: number;
  einwilligung: string;
}

type AcConfig = typeof activeCampaignConfig;

/** Baut die Parameter, die auch das eingebettete AC-Formular an proc.php sendet */
export const buildActiveCampaignParams = (lead: QuizLead, config: AcConfig = activeCampaignConfig) => {
  const params = new URLSearchParams({
    u: config.formId,
    f: config.formId,
    s: "",
    c: "0",
    m: "0",
    act: "sub",
    v: "2",
    email: lead.email,
  });
  if (config.formToken) params.set("or", config.formToken);

  const values: Record<AcFieldKey, string> = {
    rolle: lead.rolle,
    firmengroesse: lead.firmengroesse,
    branche: lead.branche,
    bereiche: lead.bereiche.join(", "),
    topAnwendungen: lead.topAnwendungen.join("\n"),
    leadScore: String(lead.leadScore),
    einwilligung: lead.einwilligung,
    utmSource: lead.utmSource,
    utmMedium: lead.utmMedium,
    utmCampaign: lead.utmCampaign,
    utmTerm: lead.utmTerm,
    utmContent: lead.utmContent,
    referrer: lead.referrer,
    landingPage: lead.landingPage,
  };
  (Object.keys(values) as AcFieldKey[]).forEach((key) => {
    const fieldId = config.fieldIds[key];
    if (fieldId) params.set(`field[${fieldId}]`, values[key]);
  });

  params.set("jsonp", "true");
  return params;
};

interface AcJsonpWindow extends Window {
  _show_thank_you?: (id: string, message: string, trackcmpUrl?: string, email?: string) => void;
  _show_error?: (id: string, message: string, html?: string) => void;
}

const loadScript = (src: string) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
  return script;
};

/**
 * Sendet den Lead wie das eingebettete AC-Formular per JSONP an proc.php.
 * AC antwortet mit einem Aufruf von `_show_thank_you` oder `_show_error`.
 */
const submitToActiveCampaign = (lead: QuizLead) =>
  new Promise<void>((resolve, reject) => {
    const w = window as AcJsonpWindow;
    const url = `${activeCampaignConfig.accountUrl.replace(/\/$/, "")}/proc.php?${buildActiveCampaignParams(lead)}`;
    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    const cleanup = () => {
      clearTimeout(timeout);
      delete w._show_thank_you;
      delete w._show_error;
      script.remove();
    };
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Zeitüberschreitung bei ActiveCampaign"));
    }, 15000);

    w._show_thank_you = (_id, _message, trackcmpUrl) => {
      cleanup();
      // Verknüpft den Besuch mit dem Kontakt (Site Tracking), wie im AC-Embed
      if (trackcmpUrl) loadScript(trackcmpUrl);
      resolve();
    };
    w._show_error = (_id, message) => {
      cleanup();
      reject(new Error(message || "ActiveCampaign hat die Anmeldung abgelehnt"));
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("ActiveCampaign nicht erreichbar"));
    };
    document.body.appendChild(script);
  });

const submitToZapier = async (lead: QuizLead) => {
  // no-cors: Antwort ist nicht lesbar, nur Netzwerkfehler werden erkannt
  await fetch(zapierWebhookUrl, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(lead),
  });
};

export const submitLead = (lead: QuizLead) =>
  isActiveCampaignConfigured() ? submitToActiveCampaign(lead) : submitToZapier(lead);
