import type { Instrument } from "@/lib/types/database";

export type ScoringTiming = {
  sectionStart: string | null;
  sectionEnd: string | null;
};

export type Pss10Result = {
  instrument: "PSS10";
  total: number;
  meanTotal: number;
  band: "low" | "moderate" | "high";
  clinicalBand: "low" | "moderate" | "high";
  helplessnessScore: number;
  selfEfficacyScore: number;
  normativePercentile: number;
  timeTakenSeconds: number | null;
  itemResponses: Record<number, number>;
};

export type Phq8Result = {
  instrument: "PHQ8";
  total: number;
  meanTotal: number;
  userBand: "low" | "moderate" | "high";
  clinicalBand:
    | "none_minimal"
    | "mild"
    | "moderate"
    | "moderately_severe"
    | "severe";
  cognitiveAffective: number;
  somaticVegetative: number;
  functional: number;
  normativePercentile: number;
  timeTakenSeconds: number | null;
  itemResponses: Record<number, number>;
};

export type Maia2Result = {
  instrument: "MAIA2";
  subscales: Record<
    string,
    { average: number; band: string; percentile: number }
  >;
  timeTakenSeconds: number | null;
  itemResponses: Record<number, number>;
};

export type Pcl5Result = {
  instrument: "PCL5";
  total: number;
  meanTotal: number;
  userBand: "low" | "moderate" | "high";
  rawClinicalBand:
    | "minimal"
    | "mild"
    | "moderate"
    | "moderately_severe"
    | "severe";
  clusters: {
    b_intrusion: number;
    c_avoidance: number;
    d_negative: number;
    e_arousal: number;
  };
  clusterMeans: {
    b_intrusion: number;
    c_avoidance: number;
    d_negative: number;
    e_arousal: number;
  };
  clusterDescriptors: {
    b_intrusion: string;
    c_avoidance: string;
    d_negative: string;
    e_arousal: string;
  };
  descriptorTotal: string;
  probablePtsdByTotal: boolean;
  dsm5AlgorithmMet: boolean;
  clusterSymptomCounts: {
    b: number;
    c: number;
    d: number;
    e: number;
  };
  dominantCluster: "B" | "C" | "D" | "E";
  normativePercentile: number;
  clinicalPercentile: number;
  worstEventText: string | null;
  timeTakenSeconds: number | null;
  itemResponses: Record<number, number>;
};

export type Pid5SafetyFlag = {
  itemCode: string;
  itemText: string;
  responseValue: number;
  responseLabel: string;
};

export type Pid5SfResult = {
  instrument: "PID5SF";
  domains: Record<string, { average: number; band: string; percentile: number }>;
  facets: Record<string, { average: number; band: string; percentile: number }>;
  safetyFlags: Pid5SafetyFlag[];
  timeTakenSeconds: number | null;
  itemResponses: Record<number, number>;
};

export type InstrumentResult =
  | Pss10Result
  | Phq8Result
  | Maia2Result
  | Pcl5Result
  | Pid5SfResult;

export type DimensionalFramework = {
  Q1_primary_distress_driver: string;
  Q2_somatic_regulation: string;
  Q3_dissociation: string;
  Q4_relational_pattern: string;
  Q5_body_relationship: string;
  Q6_primary_resources: string;
  Q7_contradictions: string;
  Q8_nervous_system_state: string;
  Q8_inference_caveat: string;
};

export type PatternMatch = {
  id: string;
  name: string;
  description: string;
  triggeredBy: string;
};

export type SessionScores = {
  PSS10?: Pss10Result;
  PHQ8?: Phq8Result;
  MAIA2?: Maia2Result;
  PCL5?: Pcl5Result;
  PID5SF?: Pid5SfResult;
};

export const INSTRUMENTS_BY_SECTION: Instrument[] = [
  "PSS10",
  "PHQ8",
  "MAIA2",
  "PCL5",
  "PID5SF",
];
