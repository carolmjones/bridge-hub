import type {
  InstrumentResult,
  Maia2Result,
  PatternMatch,
  Pcl5Result,
  Phq8Result,
  Pss10Result,
  SessionScores,
} from "@/lib/scoring/types";

function isPidElevated(band: string): boolean {
  return band === "elevated" || band === "significant";
}

function isMaiaLimited(band: string): boolean {
  return band === "limited";
}

function isHighUserBand(band: string): boolean {
  return band === "high";
}

function isPclLow(pcl?: Pcl5Result): boolean {
  return pcl?.userBand === "low";
}

/** Named priority patterns PF-01–PF-08. */
export function matchPatterns(scores: SessionScores): PatternMatch[] {
  const matches: PatternMatch[] = [];
  const pss = scores.PSS10;
  const phq = scores.PHQ8;
  const maia = scores.MAIA2;
  const pcl = scores.PCL5;
  const pid = scores.PID5SF;

  if (!maia || !pid) return matches;

  const notDistracting = maia.subscales.not_distracting;
  const notWorrying = maia.subscales.not_worrying;

  if (
    pcl &&
    isHighUserBand(pcl.userBand) &&
    isMaiaLimited(notDistracting.band) &&
    isMaiaLimited(notWorrying.band)
  ) {
    matches.push({
      id: "PF-01",
      name: "Dissociative presentation",
      description:
        "High trauma symptoms alongside limited capacity to stay present with body discomfort and worry.",
      triggeredBy: `PCL-5 ${pcl.userBand}, MAIA Not-Distracting ${notDistracting.band}, MAIA Not-Worrying ${notWorrying.band}`,
    });
  }

  const limitedMaiaCount = Object.values(maia.subscales).filter((s) =>
    isMaiaLimited(s.band)
  ).length;
  if (
    limitedMaiaCount >= 3 &&
    pcl &&
    isPclLow(pcl)
  ) {
    matches.push({
      id: "PF-02",
      name: "Somatic disconnection without high PTSD",
      description:
        "Multiple limited body-awareness subscales without correspondingly high trauma checklist scores.",
      triggeredBy: `${limitedMaiaCount} MAIA subscales limited, PCL-5 ${pcl.userBand}`,
    });
  }

  const sep = pid.facets.separation_insecurity;
  const intimacy = pid.facets.intimacy_avoidance;
  if (isPidElevated(sep.band) && isPidElevated(intimacy.band)) {
    matches.push({
      id: "PF-03",
      name: "Disorganised attachment",
      description:
        "Both separation insecurity and intimacy avoidance are notably elevated.",
      triggeredBy: `Separation Insecurity ${sep.band}, Intimacy Avoidance ${intimacy.band}`,
    });
  }

  const selfReg = maia.subscales.self_regulation;
  if (isMaiaLimited(selfReg.band)) {
    matches.push({
      id: "PF-04",
      name: "No regulatory capacity",
      description:
        "Limited capacity to use body awareness to return to baseline.",
      triggeredBy: `MAIA Self-Regulation ${selfReg.band}`,
    });
  }

  const allMaiaLimited = Object.values(maia.subscales).every((s) =>
    isMaiaLimited(s.band)
  );
  if (allMaiaLimited) {
    matches.push({
      id: "PF-05",
      name: "Full somatic disconnection",
      description: "All five body-awareness subscales fall in the limited range.",
      triggeredBy: "All MAIA-2 subscales limited",
    });
  }

  if (phq) {
    const depressivity = pid.facets.depressivity;
    const severeDepression =
      phq.clinicalBand === "severe" ||
      (phq.clinicalBand === "moderately_severe" &&
        depressivity.band === "significant");
    if (severeDepression) {
      matches.push({
        id: "PF-06",
        name: "Severe depression",
        description:
          "Clinically severe depression signal on PHQ-8 with significant trait depressivity.",
        triggeredBy: `PHQ-8 ${phq.clinicalBand}, Depressivity ${depressivity.band}`,
      });
    }
  }

  const significantFacets = Object.entries(pid.facets).filter(
    ([, facet]) => facet.band === "significant"
  );
  const significantDomains = Object.entries(pid.domains).filter(
    ([, domain]) => domain.band === "significant"
  );
  if (significantFacets.length + significantDomains.length >= 2) {
    matches.push({
      id: "PF-07",
      name: "Multi-domain personality distress",
      description:
        "Two or more PID-5-SF domains or facets at clinically significant elevation.",
      triggeredBy: `${significantFacets.length} facets and ${significantDomains.length} domains at significant`,
    });
  }

  if (
    pss &&
    phq &&
    pss.band === "high" &&
    (phq.clinicalBand === "moderately_severe" || phq.clinicalBand === "severe") &&
    pss.selfEfficacyScore <= 4
  ) {
    matches.push({
      id: "PF-08",
      name: "Crisis-adjacent burnout",
      description:
        "High stress load with severe mood symptoms and collapsed self-efficacy.",
      triggeredBy: `PSS-10 high, PHQ-8 ${phq.clinicalBand}, self-efficacy ${pss.selfEfficacyScore}`,
    });
  }

  return matches;
}

export function detectInstrumentFlags(result: InstrumentResult): string[] {
  const flags: string[] = [];

  if (result.instrument === "PSS10") {
    const r = result as Pss10Result;
    if (r.band === "low" && r.helplessnessScore >= 12) {
      flags.push("PSS-03");
    }
    if (r.band !== "high" && r.helplessnessScore >= 15 && r.selfEfficacyScore <= 4) {
      flags.push("PSS-04");
    }
  }

  if (result.instrument === "PHQ8") {
    const r = result as Phq8Result;
    if (r.userBand === "low" && r.somaticVegetative >= 8) {
      flags.push("PHQ-03");
    }
  }

  if (result.instrument === "PCL5") {
    const r = result as Pcl5Result;
    if (r.userBand === "low" && r.clusters.c_avoidance >= 6) {
      flags.push("PCL-04");
    }
    if (r.probablePtsdByTotal && !r.dsm5AlgorithmMet) {
      flags.push("PCL-08");
    }
    if (!r.probablePtsdByTotal && r.dsm5AlgorithmMet) {
      flags.push("PCL-09");
    }
  }

  if (result.instrument === "MAIA2") {
    const r = result as Maia2Result;
    if (
      r.subscales.attention_regulation.band === "strong" &&
      r.subscales.emotional_awareness.band === "limited"
    ) {
      flags.push("MAIA-04");
    }
  }

  return flags;
}
