"use client";

import { useState } from "react";

type GameOverProps = {
  score: number;
  rounds: number;
  onPlayAgain: () => void;
};

export default function GameOver({ score, rounds, onPlayAgain }: GameOverProps) {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || submitting) return;
    setSubmitting(true);

    try {
      await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          score,
          rounds,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 animate-slide-up max-w-md mx-auto text-center">
      {/* Finish flag */}
      <div className="stripe-amber w-full h-1 rounded-full" />

      <div>
        <h2 className="font-display text-lg uppercase tracking-[0.2em] text-muted mb-2">
          Race Complete
        </h2>
        <div className="font-display text-6xl font-bold text-amber text-glow-amber">
          {score.toLocaleString()}
        </div>
        <p className="text-muted text-sm mt-2 font-body">
          points in {rounds} rounds
        </p>
      </div>

      {/* Score breakdown visual */}
      <div className="w-full h-px bg-border" />

      {/* Submit score */}
      {!submitted ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <p className="text-foreground font-body">
            Save your score to the leaderboard
          </p>
          <div className="flex gap-2 w-full max-w-xs">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Your name"
              maxLength={20}
              className="flex-1 px-4 py-3 bg-surface border border-border rounded-lg text-foreground
                font-body placeholder:text-muted focus:outline-none focus:border-amber
                focus:ring-1 focus:ring-amber/50 transition-all"
            />
            <button
              onClick={handleSubmit}
              disabled={!username.trim() || submitting}
              className="px-5 py-3 bg-amber text-background font-display text-sm font-bold
                uppercase tracking-wider rounded-lg hover:bg-amber-light transition-colors
                disabled:opacity-30 disabled:cursor-not-allowed animate-pulse-glow"
            >
              {submitting ? "..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-green font-body">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Score saved!
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onPlayAgain}
          className="px-6 py-3 bg-surface border border-amber rounded-lg font-display text-sm
            font-bold uppercase tracking-wider text-amber hover:bg-amber hover:text-background
            transition-all"
        >
          Play Again
        </button>
        <a
          href="/leaderboard"
          className="px-6 py-3 bg-surface border border-border rounded-lg font-display text-sm
            font-bold uppercase tracking-wider text-muted hover:border-foreground hover:text-foreground
            transition-all"
        >
          Leaderboard
        </a>
      </div>

      <div className="stripe-amber w-full h-1 rounded-full" />
    </div>
  );
}
