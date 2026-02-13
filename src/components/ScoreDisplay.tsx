"use client";

type ScoreDisplayProps = {
  score: number;
  round: number;
  totalRounds: number;
  streak: number;
  lastPoints?: number | null;
};

export default function ScoreDisplay({
  score,
  round,
  totalRounds,
  streak,
  lastPoints,
}: ScoreDisplayProps) {
  const streakMultiplier =
    streak >= 5 ? "x2" : streak >= 3 ? "x1.5" : null;

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-surface/80 backdrop-blur-sm border-b border-border">
      {/* Round counter */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < round
                  ? "bg-amber"
                  : i === round
                  ? "bg-amber animate-pulse"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
        <span className="text-muted text-sm font-body">
          {round + 1}/{totalRounds}
        </span>
      </div>

      {/* Score */}
      <div className="flex items-center gap-4">
        {streak >= 3 && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-glow border border-amber/30 rounded">
            <span className="text-amber text-xs font-display uppercase tracking-wider">
              Streak {streak}
            </span>
            {streakMultiplier && (
              <span className="text-amber-light text-xs font-bold font-display">
                {streakMultiplier}
              </span>
            )}
          </div>
        )}

        <div className="relative">
          <span className="font-display text-2xl font-bold text-foreground tabular-nums">
            {score.toLocaleString()}
          </span>
          {lastPoints && (
            <span
              key={score}
              className="absolute -top-4 right-0 text-green text-sm font-display font-bold animate-score-pop"
            >
              +{lastPoints}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
