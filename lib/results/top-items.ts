import { QUESTIONS } from "@/lib/data/questions";
import type { Instrument, Response } from "@/lib/types/database";

export type TopItem = {
  instrument: Instrument;
  item_number: number;
  item_text: string;
  response_value: number;
  response_label: string;
};

const MAX_ITEMS_PER_INSTRUMENT = 3;

function labelFor(instrument: Instrument, itemNumber: number, value: number): string {
  const question = QUESTIONS.find(
    (q) => q.instrument === instrument && q.instrumentItemNumber === itemNumber
  );
  return question?.scale.find((o) => o.value === value)?.label ?? String(value);
}

function toTopItem(response: Response): TopItem | null {
  const question = QUESTIONS.find(
    (q) =>
      q.instrument === response.instrument &&
      q.instrumentItemNumber === response.item_number
  );
  if (!question) return null;

  return {
    instrument: response.instrument,
    item_number: response.item_number,
    item_text: question.text,
    response_value: response.response_value,
    response_label: labelFor(
      response.instrument,
      response.item_number,
      response.response_value
    ),
  };
}

/**
 * Select top-endorsed items by score, capping at MAX_ITEMS_PER_INSTRUMENT per
 * instrument. Within equal scores, round-robin across instruments so one
 * instrument cannot fill the list when values tie.
 */
function selectDiverseTopItems(items: TopItem[], limit: number): TopItem[] {
  const byScore = new Map<number, TopItem[]>();
  for (const item of items) {
    const tier = byScore.get(item.response_value) ?? [];
    tier.push(item);
    byScore.set(item.response_value, tier);
  }

  const scores = Array.from(byScore.keys()).sort((a, b) => b - a);
  const selected: TopItem[] = [];
  const counts = new Map<Instrument, number>();

  for (const score of scores) {
    if (selected.length >= limit) break;

    const tier = byScore.get(score)!;
    const byInstrument = new Map<Instrument, TopItem[]>();
    for (const item of tier) {
      const list = byInstrument.get(item.instrument) ?? [];
      list.push(item);
      byInstrument.set(item.instrument, list);
    }

    for (const list of Array.from(byInstrument.values())) {
      list.sort((a, b) => a.item_number - b.item_number);
    }

    const instruments = Array.from(byInstrument.keys()).sort();
    let addedInRound = true;

    while (addedInRound && selected.length < limit) {
      addedInRound = false;
      for (const instrument of instruments) {
        if (selected.length >= limit) break;
        if ((counts.get(instrument) ?? 0) >= MAX_ITEMS_PER_INSTRUMENT) continue;

        const queue = byInstrument.get(instrument);
        if (!queue?.length) continue;

        selected.push(queue.shift()!);
        counts.set(instrument, (counts.get(instrument) ?? 0) + 1);
        addedInRound = true;
      }
    }
  }

  return selected;
}

export function buildTopItems(
  responses: Response[],
  limit = 10
): TopItem[] {
  const items: TopItem[] = [];
  for (const response of responses) {
    const item = toTopItem(response);
    if (item) items.push(item);
  }

  return selectDiverseTopItems(items, limit);
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
