/**
 * ActiveCampaign-Konfiguration für das Quiz-Opt-in.
 *
 * Einrichtung in ActiveCampaign:
 * 1. Benutzerdefinierte Kontaktfelder anlegen (Typ in Klammern):
 *    Rolle (Text), Firmengrösse (Text), Branche (Text), KI-Bereiche (Text),
 *    Top-KI-Anwendungen (Textbereich), Lead-Score (Zahl), Einwilligung (Text),
 *    UTM Source, UTM Medium, UTM Campaign, UTM Term, UTM Content,
 *    Referrer, Einstiegsseite (jeweils Text).
 * 2. Ein Inline-Formular anlegen: Liste zuweisen, Double-Opt-in nach Wunsch
 *    aktivieren und alle obigen Felder (sichtbar oder versteckt) hinzufügen.
 * 3. Unter «Integrieren» → «Code einbetten» die Werte ablesen:
 *    - accountUrl: Adresse in `action="https://XXX.activehosted.com/proc.php"`
 *    - formId: Wert des versteckten Feldes `u` (bzw. `f`)
 *    - formToken: Wert des versteckten Feldes `or`, falls vorhanden
 *    - Feld-IDs: Zahl in `name="field[ID]"` des jeweiligen Feldes
 *
 * Solange accountUrl oder formId leer sind, gehen Leads wie bisher an Zapier.
 */
export const activeCampaignConfig = {
  accountUrl: "",
  formId: "",
  formToken: "",
  fieldIds: {
    rolle: "",
    firmengroesse: "",
    branche: "",
    bereiche: "",
    topAnwendungen: "",
    leadScore: "",
    einwilligung: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
    referrer: "",
    landingPage: "",
  },
};

export type AcFieldKey = keyof typeof activeCampaignConfig.fieldIds;

export const isActiveCampaignConfigured = () =>
  Boolean(activeCampaignConfig.accountUrl && activeCampaignConfig.formId);

/** Bisheriger Zapier-Webhook, nur noch als Rückfall bis AC konfiguriert ist */
export const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/1066047/uxtmoir/";
