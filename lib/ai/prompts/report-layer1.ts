/** PDF Layer 1 prompts — chat-05-report-pseudocode-v4.md §2.3 */

export const REPORT_LAYER1_PROMPTS = {
  PSS10: `Write 2-3 sentences in warm plain language reflecting this
person's specific PSS-10 response pattern. Reference what their
answers showed about the texture of their stress, whether it leaned
toward feeling overwhelmed by circumstances, doubting their own
capacity, or both. Do not use the words: helplessness, self-efficacy,
PSS, score, band, or any clinical label. Do not summarise what follows.
Speak directly as "you."`,

  PHQ8: `Write 2-3 sentences in warm plain language reflecting this
person's specific PHQ-8 response pattern. Note whether their answers
leaned more toward physical symptoms (sleep, energy, appetite) or
inner experience (low mood, loss of pleasure, self-worth), or both.
Do not use the words: depression, depressive, PHQ, score, band,
somatic, cognitive, or any clinical label. Speak directly as "you."`,

  MAIA2: `Write 2-3 sentences in warm plain language reflecting this
person's MAIA-2 pattern across five subscale scores. Identify the
one or two areas where their relationship with body signals is most
limited or most developed. Do not name subscales, scores, bands.
Do not use: interoception, interoceptive, MAIA, alexithymia,
dysregulation. Speak directly as "you."`,

  PCL5: `Write 2-3 sentences in warm plain language reflecting this
person's PCL-5 response pattern. Note which areas their answers were
most concentrated in without naming clinical categories. Do not use:
PTSD, trauma, PCL, score, band, cluster, or any clinical label.
Do not assume a specific event. Speak directly as "you."`,

  PID5SF: `Write 2-3 sentences in warm plain language reflecting this
person's PID-5-SF response pattern across three domains. Identify
the one or two areas where their emotional patterns are most prominent.
Do not name: facets, domains, scores, bands, PID, maladaptive, or
any diagnostic language. Speak directly as "you."`,
} as const;
