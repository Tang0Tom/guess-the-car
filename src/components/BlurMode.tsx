"use client";

import { useState } from "react";
import { getCarImageUrl, getCarLabel } from "@/lib/cars";
import { calculateBlurScore } from "@/lib/game";
import CarAutocomplete from "./CarAutocomplete";
import type { Round } from "@/lib/game";

type BlurModeProps = {
  round: Round;
  onAnswer: (correct: boolean, points: number) => void;
};

const BLUR_LEVELS = [30, 20, 10, 5, 0];

export default function BlurMode({ round, onAnswer }: BlurModeProps) {
  const [blurStep, setBlurStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentBlur = BLUR_LEVELS[blurStep];
  const imageUrl = getCarImageUrl(round.car);
  const correctAnswer = getCarLabel(round.car);

  const handleReveal = () => {
    if (blurStep < BLUR_LEVELS.length - 1) {
      setBlurStep((prev) => prev + 1);
    }
  };

  const handleGuess = (guess: string) => {
    if (answered) return;
    setAnswered(true);

    const correct =
      guess.toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(correct);

    const points = correct ? calculateBlurScore(blurStep) : 0;
    setTimeout(() => onAnswer(correct, points), 1500);
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-slide-up">
      {/* Mode label */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber" />
        <span className="font-display text-xs uppercase tracking-[0.2em] text-muted">
          Blur Reveal
        </span>
      </div>

      {/* Image container */}
      <div className="relative w-full max-w-lg aspect-[16/10] rounded-xl overflow-hidden border border-border bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Mystery car"
          className="w-full h-full object-cover blur-transition"
          style={{ filter: `blur(${currentBlur}px)` }}
          draggable={false}
        />

        {/* Blur level indicator */}
        <div className="absolute top-3 right-3 flex gap-1">
          {BLUR_LEVELS.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-6 rounded-full transition-colors ${
                i <= blurStep ? "bg-amber" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Reveal overlay on answered */}
        {answered && (
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              isCorrect ? "bg-green/10" : "bg-red/10"
            }`}
          >
            <div
              className={`px-6 py-3 rounded-lg font-display text-xl font-bold animate-score-pop ${
                isCorrect
                  ? "bg-green/20 text-green border border-green/30"
                  : "bg-red/20 text-red border border-red/30"
              }`}
            >
              {isCorrect ? `+${calculateBlurScore(blurStep)}` : correctAnswer}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {!answered && (
        <div className="flex flex-col items-center gap-4 w-full">
          <button
            onClick={handleReveal}
            disabled={blurStep >= BLUR_LEVELS.length - 1}
            className="px-5 py-2 bg-surface-light border border-border rounded-lg font-body text-sm
              text-foreground hover:border-amber/50 hover:text-amber transition-all
              disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Reveal more
            <span className="ml-2 text-amber text-xs">
              (-200 pts)
            </span>
          </button>

          <CarAutocomplete onSubmit={handleGuess} />
        </div>
      )}
    </div>
  );
}
