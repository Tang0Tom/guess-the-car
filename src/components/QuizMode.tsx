"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { getCarImageUrl, getCarLabel } from "@/lib/cars";
import { calculateQuizScore } from "@/lib/game";
import Timer from "./Timer";
import type { Round } from "@/lib/game";

type QuizModeProps = {
  round: Round;
  onAnswer: (correct: boolean, points: number) => void;
};

export default function QuizMode({ round, onAnswer }: QuizModeProps) {
  const [answered, setAnswered] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const timeLeftRef = useRef(10);

  const imageUrl = getCarImageUrl(round.car);
  const correctAnswer = getCarLabel(round.car);
  const choices = round.choices || [];

  // Track time via interval
  useEffect(() => {
    timeLeftRef.current = 10;
    const interval = setInterval(() => {
      timeLeftRef.current = Math.max(0, timeLeftRef.current - 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleTimeUp = useCallback(() => {
    if (answered) return;
    setAnswered(true);
    setTimerRunning(false);
    setIsCorrect(false);
    setTimeout(() => onAnswer(false, 0), 1500);
  }, [answered, onAnswer]);

  const handleChoice = (choice: string) => {
    if (answered) return;
    setAnswered(true);
    setTimerRunning(false);
    setSelectedChoice(choice);

    const correct = choice === correctAnswer;
    setIsCorrect(correct);

    const points = correct ? calculateQuizScore(timeLeftRef.current) : 0;
    setTimeout(() => onAnswer(correct, points), 1500);
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-slide-up">
      {/* Mode label + Timer */}
      <div className="flex items-center justify-between w-full max-w-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber" />
          <span className="font-display text-xs uppercase tracking-[0.2em] text-muted">
            Speed Quiz
          </span>
        </div>
        <Timer duration={10} onTimeUp={handleTimeUp} isRunning={timerRunning} />
      </div>

      {/* Image */}
      <div className="relative w-full max-w-lg aspect-[16/10] rounded-xl overflow-hidden border border-border bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Mystery car"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
        {choices.map((choice) => {
          const isSelected = selectedChoice === choice;
          const isAnswer = choice === correctAnswer;

          let btnClass =
            "px-4 py-3 rounded-lg border font-body text-sm font-medium transition-all text-left ";

          if (!answered) {
            btnClass +=
              "bg-surface border-border hover:border-amber hover:bg-amber-glow cursor-pointer text-foreground";
          } else if (isAnswer) {
            btnClass +=
              "bg-green/10 border-green text-green glow-green";
          } else if (isSelected && !isCorrect) {
            btnClass +=
              "bg-red/10 border-red text-red glow-red";
          } else {
            btnClass += "bg-surface border-border text-muted opacity-50";
          }

          return (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              disabled={answered}
              className={btnClass}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {/* Score feedback */}
      {answered && isCorrect && (
        <div className="text-green font-display text-lg font-bold animate-score-pop">
          +{calculateQuizScore(timeLeftRef.current)}
        </div>
      )}
      {answered && !isCorrect && !selectedChoice && (
        <div className="text-red font-display text-lg font-bold animate-score-pop">
          Time&apos;s up!
        </div>
      )}
    </div>
  );
}
