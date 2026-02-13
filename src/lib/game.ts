import { Car, getRandomCar, getWrongChoices, getCarLabel } from "./cars";

export type GameMode = "blur" | "detail" | "quiz";

export type Round = {
  car: Car;
  mode: GameMode;
  choices?: string[]; // only for quiz mode
  detailZone?: { x: number; y: number }; // only for detail mode
};

const MODES: GameMode[] = ["blur", "detail", "quiz"];

export function generateRound(usedCarIds: string[]): Round {
  const car = getRandomCar(usedCarIds);
  const mode = MODES[Math.floor(Math.random() * MODES.length)];

  const round: Round = { car, mode };

  if (mode === "quiz") {
    const wrong = getWrongChoices(car, 3);
    const allChoices = [getCarLabel(car), ...wrong.map(getCarLabel)];
    // Shuffle choices
    for (let i = allChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allChoices[i], allChoices[j]] = [allChoices[j], allChoices[i]];
    }
    round.choices = allChoices;
  }

  if (mode === "detail") {
    // Random crop position (percentage-based)
    const zones = [
      { x: 0, y: 30 },   // front/headlight area
      { x: 70, y: 30 },   // rear/taillight area
      { x: 30, y: 60 },   // wheel area
      { x: 40, y: 20 },   // roof/windshield area
    ];
    round.detailZone = zones[Math.floor(Math.random() * zones.length)];
  }

  return round;
}

export function calculateBlurScore(revealsUsed: number): number {
  return Math.max(0, 1000 - revealsUsed * 200);
}

export function calculateQuizScore(timeRemaining: number): number {
  // timeRemaining is 0-10 seconds
  return Math.round((timeRemaining / 10) * 500);
}

export function calculateDetailScore(): number {
  return 500;
}

export function getStreakMultiplier(streak: number): number {
  if (streak >= 5) return 2;
  if (streak >= 3) return 1.5;
  return 1;
}
