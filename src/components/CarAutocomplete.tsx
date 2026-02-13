"use client";

import { useState, useRef, useEffect } from "react";
import { getAllCarLabels } from "@/lib/cars";

type CarAutocompleteProps = {
  onSubmit: (value: string) => void;
  disabled?: boolean;
};

export default function CarAutocomplete({
  onSubmit,
  disabled,
}: CarAutocompleteProps) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const allLabels = getAllCarLabels();

  useEffect(() => {
    if (value.length < 1) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const query = value.toLowerCase();
    const filtered = allLabels
      .filter((label) => label.toLowerCase().includes(query))
      .slice(0, 8);

    setSuggestions(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [value]);

  const handleSubmit = (val?: string) => {
    const submitValue = val || value;
    if (submitValue.trim()) {
      onSubmit(submitValue.trim());
      setValue("");
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSubmit(suggestions[selectedIndex]);
      } else {
        handleSubmit();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 1 && suggestions.length > 0 && setIsOpen(true)}
          disabled={disabled}
          placeholder="Type a car name..."
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground
            font-body placeholder:text-muted focus:outline-none focus:border-amber
            focus:ring-1 focus:ring-amber/50 transition-all disabled:opacity-50"
          autoComplete="off"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={disabled || !value.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-amber text-background
            font-display text-sm font-bold uppercase tracking-wider rounded
            hover:bg-amber-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Guess
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute z-40 w-full mt-1 bg-surface border border-border rounded-lg overflow-hidden shadow-xl">
          {suggestions.map((label, i) => (
            <li
              key={label}
              onClick={() => handleSubmit(label)}
              className={`px-4 py-2.5 cursor-pointer font-body text-sm transition-colors ${
                i === selectedIndex
                  ? "bg-amber/20 text-amber"
                  : "text-foreground hover:bg-surface-light"
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
