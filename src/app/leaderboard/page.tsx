import Link from "next/link";
import LeaderboardTable from "@/components/LeaderboardTable";

export const metadata = {
  title: "Leaderboard — Guess The Car",
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Link
          href="/"
          className="font-display text-sm uppercase tracking-[0.15em] text-amber hover:text-amber-light transition-colors"
        >
          Guess The Car
        </Link>
        <Link
          href="/play"
          className="px-4 py-2 bg-amber rounded font-display text-xs font-bold uppercase
            tracking-wider text-background hover:bg-amber-light transition-colors"
        >
          Play
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="stripe-amber w-12 h-1 rounded-full" />
          <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-foreground">
            Leaderboard
          </h1>
          <p className="text-muted text-sm font-body">Top 50 drivers</p>
        </div>

        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <LeaderboardTable />
        </div>
      </main>
    </div>
  );
}
