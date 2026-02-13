"use client";

import { useEffect, useState } from "react";

type ScoreEntry = {
  id: string;
  username: string;
  score: number;
  rounds: number;
  createdAt: string;
};

export default function LeaderboardTable() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-amber border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (scores.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted font-body text-lg">No scores yet</p>
        <p className="text-muted/60 font-body text-sm mt-1">
          Be the first to play!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-display text-xs uppercase tracking-[0.15em] text-muted">
              Rank
            </th>
            <th className="text-left py-3 px-4 font-display text-xs uppercase tracking-[0.15em] text-muted">
              Driver
            </th>
            <th className="text-right py-3 px-4 font-display text-xs uppercase tracking-[0.15em] text-muted">
              Score
            </th>
            <th className="text-right py-3 px-4 font-display text-xs uppercase tracking-[0.15em] text-muted hidden sm:table-cell">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {scores.map((entry, i) => (
            <tr
              key={entry.id}
              className="border-b border-border/50 hover:bg-surface-light/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <td className="py-3 px-4">
                {i < 3 ? (
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-display text-sm font-bold ${
                      i === 0
                        ? "bg-amber/20 text-amber border border-amber/30"
                        : i === 1
                        ? "bg-gray-300/10 text-gray-300 border border-gray-300/20"
                        : "bg-orange-900/20 text-orange-400 border border-orange-400/20"
                    }`}
                  >
                    {i + 1}
                  </span>
                ) : (
                  <span className="text-muted font-body text-sm pl-2">
                    {i + 1}
                  </span>
                )}
              </td>
              <td className="py-3 px-4 font-body font-medium text-foreground">
                {entry.username}
              </td>
              <td className="py-3 px-4 text-right font-display font-bold text-amber tabular-nums">
                {entry.score.toLocaleString()}
              </td>
              <td className="py-3 px-4 text-right text-muted text-sm font-body hidden sm:table-cell">
                {new Date(entry.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
