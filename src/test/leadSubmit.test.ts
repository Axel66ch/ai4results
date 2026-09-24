import { describe, it, expect } from "vitest";
import { buildActiveCampaignParams, QuizLead } from "@/lib/leadSubmit";
import { activeCampaignConfig } from "@/config/activecampaign";

const lead: QuizLead = {
  email: "test@example.ch",
  rolle: "CMO / Marketingleitung",
  firmengroesse: "20–200 Mitarbeitende",
  branche: "Industrie",
  bereiche: ["Marketing", "Sales"],
  topAnwendungen: ["Content-Erstellung", "Recherche & Briefing"],
  leadScore: 80,
  einwilligung: "Ja",
  utmSource: "linkedin",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
  referrer: "",
  landingPage: "https://example.ch/",
};

describe("buildActiveCampaignParams", () => {
  it("setzt Formular-ID, E-Mail und konfigurierte Felder", () => {
    const config = {
      ...activeCampaignConfig,
      formId: "12",
      formToken: "abc",
      fieldIds: { ...activeCampaignConfig.fieldIds, rolle: "5", bereiche: "7", utmSource: "9" },
    };
    const params = buildActiveCampaignParams(lead, config);

    expect(params.get("u")).toBe("12");
    expect(params.get("f")).toBe("12");
    expect(params.get("act")).toBe("sub");
    expect(params.get("or")).toBe("abc");
    expect(params.get("email")).toBe("test@example.ch");
    expect(params.get("field[5]")).toBe("CMO / Marketingleitung");
    expect(params.get("field[7]")).toBe("Marketing, Sales");
    expect(params.get("field[9]")).toBe("linkedin");
    expect(params.get("jsonp")).toBe("true");
  });

  it("lässt Felder ohne ID weg", () => {
    const params = buildActiveCampaignParams(lead, { ...activeCampaignConfig, formId: "12" });
    expect([...params.keys()].some((k) => k.startsWith("field["))).toBe(false);
    expect(params.has("or")).toBe(false);
  });
});
