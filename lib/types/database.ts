export type SessionStatus = "in_progress" | "completed" | "expired";

export type Instrument =
  | "PSS10"
  | "PHQ8"
  | "MAIA2"
  | "PCL5"
  | "PID5SF";

export type User = {
  id: string;
  email: string;
  first_name: string;
  created_at: string;
  opted_in: boolean;
};

export type Session = {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  status: SessionStatus;
  current_section: number;
  current_item: number;
  time_started: string | null;
  touchpoint_ai?: TouchpointAiContent | null;
};

export type TouchpointAiContent = {
  synthesis: string | null;
  row_observations: Record<string, string>;
  generated_at?: string;
};

export type Response = {
  id: string;
  session_id: string;
  user_id: string;
  instrument: Instrument;
  item_number: number;
  response_value: number;
  reverse_scored: boolean;
  section_start: string | null;
  section_end: string | null;
  created_at: string;
};

export type MagicLink = {
  id: string;
  user_id: string;
  token: string;
  expires_at: string;
  used: boolean;
  created_at: string;
};
