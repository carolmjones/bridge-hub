import { QUESTIONS } from "@/lib/data/questions";
import type { Instrument, Response } from "@/lib/types/database";

export type TopItem = {
  instrument: Instrument;
  item_number: number;
  item_text: string;
  response_value: number;
  response_label: string;
};

function labelFor(instrument: Instrument, itemNumber: number, value: number): string {
  const question = QUESTIONS.find(
    (q) => q.instrument === instrument && q.instrumentItemNumber === itemNumber
  );
  return question?.scale.find((o) => o.value === value)?.label ?? String(value);
}

export function buildTopItems(
  responses: Response[],
  limit = 10
): TopItem[] {
  const scored = responses.filter((r) =>
    QUESTIONS.some(
      (item) =>
        item.instrument === r.instrument &&
        item.instrumentItemNumber === r.item_number
    )
  );

  return scored
    .map((r) => ({
      instrument: r.instrument,
      item_number: r.item_number,
      item_text:
        QUESTIONS.find(
          (q) =>
            q.instrument === r.instrument &&
            q.instrumentItemNumber === r.item_number
        )?.text ?? "",
      response_value: r.response_value,
      response_label: labelFor(r.instrument, r.item_number, r.response_value),
    }))
    .sort((a, b) => b.response_value - a.response_value)
    .slice(0, limit);
}

export function topItemsForInstrument(
  responses: Response[],
  instrument: Instrument,
  limit = 2
): TopItem[] {
  return buildTopItems(
    responses.filter((r) => r.instrument === instrument),
    limit
  );
}
