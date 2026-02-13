"use client";

import { useEffect, useState, useRef } from "react";

type TimerProps = {
  duration: number;
  onTimeUp: () => void;
  isRunning: boolean;
};

export default function Timer({ duration, onTimeUp, isRunning }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Notify parent when time runs out — outside of setState callback
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUpRef.current();
    }
  }, [timeLeft <= 0]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 0.1;
        return next <= 0 ? 0 : next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft <= 0]);

  const progress = timeLeft / duration;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - progress);
  const isLow = timeLeft <= 3;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="120" height="120" className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="6"
        />
        {/* Progress ring */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke={isLow ? "var(--color-red)" : "var(--color-amber)"}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-100"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-display text-3xl font-bold tabular-nums ${
            isLow ? "text-red animate-pulse" : "text-amber"
          }`}
        >
          {Math.ceil(timeLeft)}
        </span>
      </div>
    </div>
  );
}
