export type ScaleOption = {
  value: number;
  label: string;
};

export const PSS10_SCALE: ScaleOption[] = [
  { value: 0, label: "Never" },
  { value: 1, label: "Almost never" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Fairly often" },
  { value: 4, label: "Very often" },
];

export const PHQ8_SCALE: ScaleOption[] = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
];

export const MAIA2_SCALE: ScaleOption[] = [
  { value: 0, label: "Never" },
  { value: 1, label: "Very rarely" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Occasionally" },
  { value: 4, label: "Very frequently" },
  { value: 5, label: "Always" },
];

export const PCL5_SCALE: ScaleOption[] = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "A little bit" },
  { value: 2, label: "Moderately" },
  { value: 3, label: "Quite a bit" },
  { value: 4, label: "Extremely" },
];

export const PID5SF_SCALE: ScaleOption[] = [
  { value: 0, label: "Very false or often false" },
  { value: 1, label: "Sometimes false or somewhat false" },
  { value: 2, label: "Sometimes true or somewhat true" },
  { value: 3, label: "Very true or often true" },
];
