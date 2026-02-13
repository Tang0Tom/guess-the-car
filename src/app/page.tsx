import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-lg text-center">
        {/* Logo / Title */}
        <div className="flex flex-col items-center gap-3">
          <div className="stripe-amber w-16 h-1 rounded-full" />
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            GUESS
            <br />
            <span className="text-amber text-glow-amber">THE CAR</span>
          </h1>
          <div className="stripe-amber w-16 h-1 rounded-full" />
        </div>

        {/* Description */}
        <p className="text-muted font-body text-lg leading-relaxed">
          Can you identify cars from blurred images, zoomed-in details, and
          speed quizzes? Test your automotive knowledge across{" "}
          <span className="text-foreground font-medium">10 rounds</span> of
          pure car spotting.
        </p>

        {/* Game modes */}
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="flex flex-col items-center gap-2 p-4 bg-surface rounded-xl border border-border">
            <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-amber"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <span className="font-display text-[10px] uppercase tracking-[0.15em] text-muted">
              Blur
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 bg-surface rounded-xl border border-border">
            <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-amber"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
            <span className="font-display text-[10px] uppercase tracking-[0.15em] text-muted">
              Detail
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 bg-surface rounded-xl border border-border">
            <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-amber"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="font-display text-[10px] uppercase tracking-[0.15em] text-muted">
              Speed
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/play"
          className="group relative px-10 py-4 bg-amber rounded-lg font-display text-lg font-bold
            uppercase tracking-wider text-background hover:bg-amber-light transition-all
            animate-pulse-glow"
        >
          Start Engine
          <span className="absolute inset-0 rounded-lg border-2 border-amber/50 group-hover:scale-105 transition-transform" />
        </Link>

        {/* Leaderboard link */}
        <Link
          href="/leaderboard"
          className="text-muted font-body text-sm hover:text-amber transition-colors underline underline-offset-4 decoration-border hover:decoration-amber"
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  );
}
