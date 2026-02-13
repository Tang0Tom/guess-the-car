"use client";

import { useState } from "react";
import { getCarImageUrl, getCarLabel } from "@/lib/cars";
import { calculateDetailScore } from "@/lib/game";
import CarAutocomplete from "./CarAutocomplete";
import type { Round } from "@/lib/game";

type DetailModeProps = {
  round: Round;
  onAnswer: (correct: boolean, points: number) => void;
};

export default function DetailMode({ round, onAnswer }: DetailModeProps) {
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const imageUrl = getCarImageUrl(round.car);
  const correctAnswer = getCarLabel(round.car);
  const zone = round.detailZone || { x: 30, y: 30 };

  const handleGuess = (guess: string) => {
    if (answered) return;
    setAnswered(true);

    const correct =
      guess.toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(correct);

    const points = correct ? calculateDetailScore() : 0;
    setTimeout(() => onAnswer(correct, points), 1500);
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-slide-up">
      {/* Mode label */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber" />
        <span className="font-display text-xs uppercase tracking-[0.2em] text-muted">
          Detail Zoom
        </span>
      </div>

      {/* Zoomed container — uses object-position + scale for reliable cropping */}
      <div className="relative">
        <div className="w-56 h-56 md:w-64 md:h-64 rounded-xl overflow-hidden border-2 border-amber/30 bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Car detail"
            className="w-full h-full object-cover"
            style={{
              objectPosition: `${zone.x}% ${zone.y}%`,
              transform: "scale(2.5)",
              transformOrigin: `${zone.x}% ${zone.y}%`,
            }}
            draggable={false}
          />

          {/* Reveal overlay */}
          {answered && (
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                isCorrect ? "bg-green/10" : "bg-red/10"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg font-display text-lg font-bold animate-score-pop ${
                  isCorrect
                    ? "bg-green/20 text-green border border-green/30"
                    : "bg-red/20 text-red border border-red/30"
                }`}
              >
                {isCorrect ? "+500" : correctAnswer}
              </div>
            </div>
          )}
        </div>

        {/* Scanning effect border */}
        <div className="absolute inset-0 rounded-xl border-2 border-amber/20 pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber" />
        </div>
      </div>

      {/* Hint text */}
      <p className="text-muted text-sm font-body">
        Identify the car from this detail shot
      </p>

      {/* Input */}
      {!answered && <CarAutocomplete onSubmit={handleGuess} />}
    </div>
  );
}
