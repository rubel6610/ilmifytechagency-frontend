"use client";

import { useState, useEffect, useMemo } from "react";

interface TypingTextProps {
  text: string | string[];
  speed?: number;
  loop?: boolean;
  colors?: string[];
  className?: string;
}

export default function TypingText({
  text,
  speed = 400,
  loop = true,
  colors = ["#7bdc69", "#0ddaa0", "#8ce064"],
  className = "",
}: TypingTextProps) {
  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    // ✅ SAFETY: Ensure currentText is always a string
    const currentText = texts[currentTextIndex] ?? "";

    // If currentText is empty, reset to avoid infinite loop
    if (currentText === "") return;

    const timeout = setTimeout(() => {
      if (!deleting && charIndex < currentText.length) {
        setDisplayed(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!deleting && charIndex === currentText.length) {
        setDeleting(true);
        setCurrentColorIndex((prev) => (prev + 1) % colors.length);
      } else if (deleting && charIndex > 0) {
        setDisplayed(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setCurrentTextIndex((prev) =>
          loop ? (prev + 1) % texts.length : prev
        );
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, currentTextIndex, texts, speed, loop, colors.length]);

  return (
    <span
      className={className}
      style={{ color: colors[currentColorIndex], transition: "color 0.5s" }}
    >
      {displayed}
      <span className="ml-1 animate-pulse">|</span>
    </span>
  );
}