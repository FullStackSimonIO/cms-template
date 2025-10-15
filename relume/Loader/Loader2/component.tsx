"use client";

import { useEffect, useState } from "react";

export const Loader2 = () => {
  const words = ["First word", "Second word", "Third word", "Fourth word"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev === words.length - 1) {
          clearInterval(wordInterval);
          setIsExiting(true);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => {
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-black transition-transform duration-700 ease-in-out ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {!isExiting && (
          <div className="flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-white">
              {words[currentWordIndex]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
