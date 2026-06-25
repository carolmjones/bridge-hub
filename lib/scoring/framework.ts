import { matchPatterns } from "@/lib/scoring/patterns";
import type {
  DimensionalFramework,
  SessionScores,
} from "@/lib/scoring/types";

const Q8_CAVEAT =
  "This is inferred from instrument score patterns. No validated open-access instrument exists for direct measurement of nervous system states. Treat as hypothesis, not finding.";

function severityWeight(band: string): number {
  if (band === "high" || band === "significant") return 3;
  if (band === "moderate" || band === "elevated") return 2;
  if (band === "developing") return 1;
  return 0;
}

export function buildDimensionalFramework(
  scores: SessionScores
): DimensionalFramework {
  const drivers: Array<{ label: string; weight: number }> = [];

  if (scores.PSS10) {
    drivers.push({
      label: "current stress load (The Load)",
      weight: severityWeight(scores.PSS10.band),
    });
  }
  if (scores.PHQ8) {
    drivers.push({
      label: "recent mood and energy (The Fog)",
      weight: severityWeight(scores.PHQ8.userBand),
    });
  }
  if (scores.MAIA2) {
    const limitedCount = Object.values(scores.MAIA2.subscales).filter(
      (s) => s.band === "limited"
    ).length;
    drivers.push({
      label: "body disconnection (The Body Room)",
      weight: limitedCount >= 3 ? 3 : limitedCount >= 1 ? 2 : 0,
    });
  }
  if (scores.PCL5) {
    drivers.push({
      label: "trauma-related symptoms (The Weight You Carry)",
      weight: severityWeight(scores.PCL5.userBand),
    });
  }
  if (scores.PID5SF) {
    const elevatedCount = Object.values(scores.PID5SF.facets).filter(
      (f) => f.band === "elevated" || f.band === "significant"
    ).length;
    drivers.push({
      label: "trait-level emotional patterns (The Weather Inside)",
      weight: elevatedCount >= 4 ? 3 : elevatedCount >= 2 ? 2 : elevatedCount >= 1 ? 1 : 0,
    });
  }

  drivers.sort((a, b) => b.weight - a.weight);
  const topDrivers = drivers.filter((d) => d.weight > 0).slice(0, 2);
  const Q1 =
    topDrivers.length > 0
      ? `Primary signal points to ${topDrivers.map((d) => d.label).join(" and ")}.`
      : "No single instrument dominates; distress appears distributed across areas.";

  let Q2 = "Insufficient data.";
  if (scores.MAIA2 && scores.PCL5) {
    const selfReg = scores.MAIA2.subscales.self_regulation;
    const arousal = scores.PCL5.clusters.e_arousal;
    if (selfReg.band === "strong" && arousal <= 12) {
      Q2 = "Somatic regulation appears available — body-based settling capacity is present with relatively lower hyperarousal.";
    } else if (selfReg.band === "limited" || arousal >= 18) {
      Q2 = "Somatic regulation appears limited — low self-regulation and/or high arousal cluster scores suggest the nervous system struggles to return to baseline.";
    } else {
      Q2 = "Mixed somatic regulation — some body-based capacity present but hyperarousal or inconsistent self-regulation may limit it.";
    }
  }

  let Q3 = "Insufficient data.";
  if (scores.PID5SF && scores.MAIA2) {
    const pd = scores.PID5SF.facets.perceptual_dysregulation;
    const notDist = scores.MAIA2.subscales.not_distracting;
    if (pd.band === "significant" || (pd.band === "elevated" && notDist.band === "limited")) {
      Q3 = "Dissociation may be a factor — perceptual dysregulation and/or body distraction patterns suggest organised disconnection from experience.";
    } else if (pd.band === "lower" && notDist.band !== "limited") {
      Q3 = "Dissociation does not appear central based on current scores.";
    } else {
      Q3 = "Some dissociation-related signals present but not at the most severe level.";
    }
  }

  let Q4 = "Insufficient data.";
  if (scores.PID5SF) {
    const sep = scores.PID5SF.facets.separation_insecurity;
    const intimacy = scores.PID5SF.facets.intimacy_avoidance;
    const withdrawal = scores.PID5SF.facets.withdrawal;
    if (sep.band !== "lower" && intimacy.band !== "lower") {
      Q4 = "Relational pattern suggests disorganised attachment themes — both fear of abandonment and avoidance of closeness are elevated.";
    } else if (intimacy.band !== "lower" && withdrawal.band !== "lower") {
      Q4 = "Relational pattern suggests avoidant withdrawal — distance from others may be protective.";
    } else if (sep.band !== "lower") {
      Q4 = "Relational pattern suggests separation sensitivity — fear of being alone or abandoned may organise behaviour.";
    } else {
      Q4 = "Relational pattern largely within typical range on measured facets.";
    }
  }

  let Q5 = "Insufficient data.";
  if (scores.MAIA2) {
    const sub = scores.MAIA2.subscales;
    const limited = Object.entries(sub).filter(([, v]) => v.band === "limited");
    const strong = Object.entries(sub).filter(([, v]) => v.band === "strong");
    if (limited.length >= 3) {
      Q5 = "Body relationship appears distant — multiple subscales suggest disconnection from somatic signals.";
    } else if (strong.length >= 2) {
      Q5 = `Body relationship shows resources — strengths in ${strong.map(([k]) => k.replace(/_/g, " ")).join(", ")}.`;
    } else {
      Q5 = "Body relationship is mixed — some capacity alongside areas of difficulty staying present with sensation.";
    }
  }

  let Q6 = "Insufficient data.";
  const resources: string[] = [];
  if (scores.PSS10?.band === "low") resources.push("manageable stress load");
  if (scores.PSS10 && scores.PSS10.selfEfficacyScore >= 10)
    resources.push("intact stress self-efficacy");
  if (scores.MAIA2) {
    for (const [key, sub] of Object.entries(scores.MAIA2.subscales)) {
      if (sub.band === "strong") resources.push(`strong ${key.replace(/_/g, " ")}`);
    }
  }
  if (scores.PCL5?.userBand === "low") resources.push("lower recent trauma symptom load");
  Q6 =
    resources.length > 0
      ? `Notable resources: ${resources.join("; ")}.`
      : "Few strong resource markers — stabilisation and regulation work may be the priority.";

  const contradictions: string[] = [];
  if (scores.PSS10?.band === "low" && scores.PID5SF) {
    const elevatedPid = Object.values(scores.PID5SF.facets).some(
      (f) => f.band === "significant"
    );
    if (elevatedPid) contradictions.push("low stress report with significant trait elevations");
  }
  if (scores.PCL5?.userBand === "low" && scores.PHQ8?.userBand === "high") {
    contradictions.push("low trauma checklist with high mood symptoms");
  }
  if (scores.PSS10?.band === "high" && scores.PCL5?.userBand === "low") {
    contradictions.push("high stress with low trauma symptoms — current load may outweigh past-event activation");
  }
  const Q7 =
    contradictions.length > 0
      ? `Notable contradictions: ${contradictions.join("; ")}.`
      : "Score pattern is broadly internally consistent across instruments.";

  let Q8 = "Insufficient data for nervous system state inference.";
  if (scores.PCL5 && scores.PID5SF && scores.MAIA2) {
    const fightScore =
      (scores.PCL5.clusters.e_arousal >= 15 ? 2 : 0) +
      (scores.PID5SF.facets.emotional_lability.band !== "lower" ? 1 : 0) +
      (scores.PSS10?.band === "high" ? 1 : 0);
    const flightScore =
      (scores.PID5SF.facets.anxiousness.band !== "lower" ? 2 : 0) +
      (scores.PCL5.clusters.c_avoidance >= 4 ? 1 : 0) +
      (scores.MAIA2.subscales.not_worrying.band === "limited" ? 1 : 0);
    const freezeScore =
      (scores.PID5SF.facets.perceptual_dysregulation.band !== "lower" ? 2 : 0) +
      (scores.MAIA2.subscales.not_distracting.band === "limited" ? 1 : 0) +
      (scores.PCL5.clusters.d_negative >= 14 ? 1 : 0);
    const fawnScore =
      (scores.PID5SF.facets.separation_insecurity.band !== "lower" ? 2 : 0) +
      (scores.PID5SF.facets.depressivity.band !== "lower" ? 1 : 0) +
      (scores.PHQ8?.userBand !== "low" ? 1 : 0);

    const states = [
      { name: "fight", score: fightScore },
      { name: "flight", score: flightScore },
      { name: "freeze", score: freezeScore },
      { name: "fawn", score: fawnScore },
    ].sort((a, b) => b.score - a.score);

    if (states[0].score > 0) {
      Q8 = `Dominant inferred state: ${states[0].name}${states[1].score > 0 ? ` (with possible ${states[1].name} undertones)` : ""}.`;
    }
  }

  return {
    Q1_primary_distress_driver: Q1,
    Q2_somatic_regulation: Q2,
    Q3_dissociation: Q3,
    Q4_relational_pattern: Q4,
    Q5_body_relationship: Q5,
    Q6_primary_resources: Q6,
    Q7_contradictions: Q7,
    Q8_nervous_system_state: Q8,
    Q8_inference_caveat: Q8_CAVEAT,
  };
}

export function buildCrossInstrumentSummary(scores: SessionScores) {
  return {
    framework: buildDimensionalFramework(scores),
    patterns: matchPatterns(scores),
  };
}
