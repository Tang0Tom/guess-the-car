"use client";

import { useState, useCallback, useEffect } from "react";
import { getStreakMultiplier } from "@/lib/game";
import type { Round } from "@/lib/game";
import BlurMode from "./BlurMode";
import DetailMode from "./DetailMode";
import QuizMode from "./QuizMode";
import ScoreDisplay from "./ScoreDisplay";
import GameOver from "./GameOver";

const TOTAL_ROUNDS = 10;

export default function GameBoard() {
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [usedCarIds, setUsedCarIds] = useState<string[]>([]);
  const [lastPoints, setLastPoints] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRound = useCallback(async (usedIds: string[]) => {
    setLoading(true);
    try {
      const params = usedIds.length > 0 ? `?used=${usedIds.join(",")}` : "";
      const res = await fetch(`/api/game${params}`);
      const round: Round = await res.json();
      setCurrentRound(round);
    } catch (err) {
      console.error("Failed to fetch round:", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRound([]);
  }, [fetchRound]);

  const handleAnswer = useCallback(
    (correct: boolean, basePoints: number) => {
      const newStreak = correct ? streak + 1 : 0;
      const multiplier = getStreakMultiplier(newStreak);
      const points = correct ? Math.round(basePoints * multiplier) : 0;

      setScore((prev) => prev + points);
      setStreak(newStreak);
      setLastPoints(correct ? points : null);

      const newUsedIds = currentRound
        ? [...usedCarIds, currentRound.car.id]
        : usedCarIds;
      setUsedCarIds(newUsedIds);

      const nextRound = roundIndex + 1;

      if (nextRound >= TOTAL_ROUNDS) {
        setTimeout(() => setGameOver(true), 500);
      } else {
        setRoundIndex(nextRound);
        setTimeout(() => fetchRound(newUsedIds), 500);
      }
    },
    [streak, currentRound, usedCarIds, roundIndex, fetchRound]
  );

  const handlePlayAgain = () => {
    setCurrentRound(null);
    setRoundIndex(0);
    setScore(0);
    setStreak(0);
    setUsedCarIds([]);
    setLastPoints(null);
    setGameOver(false);
    fetchRound([]);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <GameOver
          score={score}
          rounds={TOTAL_ROUNDS}
          onPlayAgain={handlePlayAgain}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScoreDisplay
        score={score}
        round={roundIndex}
        totalRounds={TOTAL_ROUNDS}
        streak={streak}
        lastPoints={lastPoints}
      />

      <div className="flex-1 flex items-center justify-center p-4">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
            <span className="text-muted font-body text-sm">Loading round...</span>
          </div>
        ) : (
          currentRound && (
            <div key={`${roundIndex}-${currentRound.car.id}`} className="w-full max-w-2xl">
              {currentRound.mode === "blur" && (
                <BlurMode round={currentRound} onAnswer={handleAnswer} />
              )}
              {currentRound.mode === "detail" && (
                <DetailMode round={currentRound} onAnswer={handleAnswer} />
              )}
              {currentRound.mode === "quiz" && (
                <QuizMode round={currentRound} onAnswer={handleAnswer} />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
