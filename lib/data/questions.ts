/**
 * All 104 assessment items.
 * Source of truth: specs/questionnaire/bridge-hub-questionnaire-reference.md
 */
import type { Instrument } from "@/lib/types/database";
import type { ScaleOption } from "@/lib/data/scales";
import {
  MAIA2_SCALE,
  PCL5_SCALE,
  PHQ8_SCALE,
  PID5SF_SCALE,
  PSS10_SCALE,
} from "@/lib/data/scales";

export type Question = {
  globalIndex: number;
  sectionIndex: number;
  sectionItemIndex: number;
  instrument: Instrument;
  instrumentItemNumber: number;
  text: string;
  reverseScored: boolean;
  scale: ScaleOption[];
};

type ItemDef = Omit<
  Question,
  "globalIndex" | "sectionIndex" | "sectionItemIndex"
>;

function q(
  globalIndex: number,
  sectionIndex: number,
  sectionItemIndex: number,
  item: ItemDef
): Question {
  return { globalIndex, sectionIndex, sectionItemIndex, ...item };
}

const pss = (stem: string, reverseScored = false): ItemDef => ({
  instrument: "PSS10",
  instrumentItemNumber: 0,
  text: `In the last month, how often have you ${stem}`,
  reverseScored,
  scale: PSS10_SCALE,
});

const PSS10_ITEMS: ItemDef[] = [
  { ...pss("been upset because of something that happened unexpectedly?"), instrumentItemNumber: 1 },
  { ...pss("felt that you were unable to control the important things in your life?"), instrumentItemNumber: 2 },
  { ...pss('felt nervous and "stressed"?'), instrumentItemNumber: 3 },
  { ...pss("felt confident about your ability to handle your personal problems?", true), instrumentItemNumber: 4 },
  { ...pss("felt that things were going your way?", true), instrumentItemNumber: 5 },
  { ...pss("found that you could not cope with all the things that you had to do?"), instrumentItemNumber: 6 },
  { ...pss("been able to control irritations in your life?", true), instrumentItemNumber: 7 },
  { ...pss("felt that you were on top of things?", true), instrumentItemNumber: 8 },
  { ...pss("been angered because of things that were outside of your control?"), instrumentItemNumber: 9 },
  { ...pss("felt difficulties were piling up so high that you could not overcome them?"), instrumentItemNumber: 10 },
];

const PHQ8_ITEMS: ItemDef[] = [
  { instrument: "PHQ8", instrumentItemNumber: 1, text: "Little interest or pleasure in doing things", reverseScored: false, scale: PHQ8_SCALE },
  { instrument: "PHQ8", instrumentItemNumber: 2, text: "Feeling down, depressed, irritable, or hopeless", reverseScored: false, scale: PHQ8_SCALE },
  { instrument: "PHQ8", instrumentItemNumber: 3, text: "Trouble falling or staying asleep, or sleeping too much", reverseScored: false, scale: PHQ8_SCALE },
  { instrument: "PHQ8", instrumentItemNumber: 4, text: "Feeling tired or having little energy", reverseScored: false, scale: PHQ8_SCALE },
  { instrument: "PHQ8", instrumentItemNumber: 5, text: "Poor appetite or overeating", reverseScored: false, scale: PHQ8_SCALE },
  { instrument: "PHQ8", instrumentItemNumber: 6, text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down", reverseScored: false, scale: PHQ8_SCALE },
  { instrument: "PHQ8", instrumentItemNumber: 7, text: "Trouble concentrating on things, such as reading or watching television", reverseScored: false, scale: PHQ8_SCALE },
  { instrument: "PHQ8", instrumentItemNumber: 8, text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual", reverseScored: false, scale: PHQ8_SCALE },
];

const MAIA2_ITEMS: ItemDef[] = [
  { instrument: "MAIA2", instrumentItemNumber: 5, text: "I ignore physical tension or discomfort until they become more severe.", reverseScored: true, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 6, text: "I distract myself from sensations of discomfort.", reverseScored: true, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 7, text: "When I feel pain or discomfort, I try to power through it.", reverseScored: true, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 8, text: "I try to ignore pain.", reverseScored: true, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 9, text: "I push feelings of discomfort away by focusing on something.", reverseScored: true, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 10, text: "When I feel unpleasant body sensations, I occupy myself with something else so I don't have to feel them.", reverseScored: true, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 11, text: "When I feel physical pain, I become upset.", reverseScored: true, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 12, text: "I start to worry that something is wrong if I feel any discomfort.", reverseScored: true, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 13, text: "I can notice an unpleasant body sensation without worrying about it.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 14, text: "I can stay calm and not worry when I have feelings of discomfort or pain.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 15, text: "When I am in discomfort or pain I can't get it out of my mind.", reverseScored: true, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 16, text: "I can pay attention to my breath without being distracted by things happening around me.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 17, text: "I can maintain awareness of my inner bodily sensations even when there is a lot going on around me.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 18, text: "When I am in conversation with someone, I can pay attention to my posture.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 19, text: "I can return awareness to my body if I am distracted.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 20, text: "I can refocus my attention from thinking to sensing my body.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 21, text: "I can maintain awareness of my whole body even when a part of me is in pain or discomfort.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 22, text: "I am able to consciously focus on my body as a whole.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 23, text: "I notice how my body changes when I am angry.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 24, text: "When something is wrong in my life I can feel it in my body.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 25, text: "I notice that my body feels different after a peaceful experience.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 26, text: "I notice that my breathing becomes free and easy when I feel comfortable.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 27, text: "I notice how my body changes when I feel happy / joyful.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 28, text: "When I feel overwhelmed I can find a calm place inside.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 29, text: "When I bring awareness to my body I feel a sense of calm.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 30, text: "I can use my breath to reduce tension.", reverseScored: false, scale: MAIA2_SCALE },
  { instrument: "MAIA2", instrumentItemNumber: 31, text: "When I am caught up in thoughts, I can calm my mind by focusing on my body/breathing.", reverseScored: false, scale: MAIA2_SCALE },
];

const PCL5_ITEMS: ItemDef[] = [
  { instrument: "PCL5", instrumentItemNumber: 1, text: "Repeated, disturbing, and unwanted memories of the stressful experience?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 2, text: "Repeated, disturbing dreams of the stressful experience?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 3, text: "Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 4, text: "Feeling very upset when something reminded you of the stressful experience?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 5, text: "Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 6, text: "Avoiding memories, thoughts, or feelings related to the stressful experience?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 7, text: "Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 8, text: "Trouble remembering important parts of the stressful experience?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 9, text: "Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 10, text: "Blaming yourself or someone else for the stressful experience or what happened after it?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 11, text: "Having strong negative feelings such as fear, horror, anger, guilt, or shame?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 12, text: "Loss of interest in activities that you used to enjoy?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 13, text: "Feeling distant or cut off from other people?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 14, text: "Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 15, text: "Irritable behavior, angry outbursts, or acting aggressively?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 16, text: "Taking too many risks or doing things that could cause you harm?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 17, text: 'Being "superalert" or watchful or on guard?', reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 18, text: "Feeling jumpy or easily startled?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 19, text: "Having difficulty concentrating?", reverseScored: false, scale: PCL5_SCALE },
  { instrument: "PCL5", instrumentItemNumber: 20, text: "Trouble falling or staying asleep?", reverseScored: false, scale: PCL5_SCALE },
];

const PID5SF_ITEMS: ItemDef[] = [
  { instrument: "PID5SF", instrumentItemNumber: 41, text: "I get emotional easily, often for very little reason.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 53, text: "I never know where my emotions will go from moment to moment.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 71, text: "I get emotional over every little thing.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 81, text: "My emotions are unpredictable.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 24, text: "I worry a lot about terrible things that might happen.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 36, text: "I'm always worrying about something.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 48, text: "I am a very anxious person.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 78, text: "I'm always fearful or on edge about bad things that might happen.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 17, text: "I worry a lot about being alone.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 45, text: "I fear being alone in life more than anything else.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 58, text: "I'll do just about anything to keep someone from abandoning me.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 79, text: "I never want to be alone.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 27, text: "I keep my distance from people.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 52, text: "I don't like spending time with others.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 57, text: "I'm not interested in making friends.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 84, text: "I avoid social events.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 9, text: "Nothing seems to interest me very much.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 11, text: "I almost never enjoy life.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 43, text: "I almost never feel happy about my day-to-day activities.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 65, text: "Nothing seems to make me feel good.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 29, text: "I prefer to keep romance out of my life.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 40, text: "I'm just not very interested in having sexual relationships.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 56, text: "I steer clear of romantic relationships.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 93, text: "I prefer being alone to having a close romantic partner.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 2, text: "I feel like I act totally on impulse.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 5, text: "I usually do things on impulse without thinking about what might happen as a result.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 6, text: "Even though I know better, I can't stop making rash decisions.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 8, text: "I always do things on the spur of the moment.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 47, text: "I'm often pretty careless with my own and others' things.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 64, text: "I make promises that I don't really intend to keep.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 68, text: "I often forget to pay my bills.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 76, text: "I've skipped town to avoid responsibilities.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 39, text: "I have trouble keeping my mind focused on what needs to be done.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 49, text: "I am easily distracted.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 55, text: "I can't focus on things for very long.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 91, text: "I get pulled off-task by even minor distractions.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 60, text: "Life looks pretty bleak to me.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 70, text: "Everything seems pointless to me.", reverseScored: false, scale: PID5SF_SCALE },
  { instrument: "PID5SF", instrumentItemNumber: 74, text: "I have no worth as a person.", reverseScored: false, scale: PID5SF_SCALE },
];

function buildSection(
  sectionIndex: number,
  items: ItemDef[],
  startGlobal: number
): Question[] {
  return items.map((item, i) =>
    q(startGlobal + i, sectionIndex, i + 1, item)
  );
}

export const QUESTIONS: Question[] = [
  ...buildSection(1, MAIA2_ITEMS, 1),
  ...buildSection(2, PSS10_ITEMS, 28),
  ...buildSection(3, PHQ8_ITEMS, 38),
  ...buildSection(4, PCL5_ITEMS, 46),
  ...buildSection(5, PID5SF_ITEMS, 66),
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

export const PCL5_WRITE_IN_HEADING = "Before you begin this section";
export const PCL5_WRITE_IN_BODY =
  "The questions in this section ask about the impact of difficult experiences. Before you begin, take a moment to bring one experience to mind that feels most present for you right now.";
export const PCL5_WRITE_IN_LABEL = "The experience I have in mind";
export const PCL5_WRITE_IN_PLACEHOLDER =
  "A few words is enough. Or leave it blank, it is your choice.";

export function getQuestion(globalIndex: number): Question | undefined {
  return QUESTIONS.find((question) => question.globalIndex === globalIndex);
}

export function getQuestionByPosition(
  sectionIndex: number,
  sectionItemIndex: number
): Question | undefined {
  return QUESTIONS.find(
    (question) =>
      question.sectionIndex === sectionIndex &&
      question.sectionItemIndex === sectionItemIndex
  );
}
