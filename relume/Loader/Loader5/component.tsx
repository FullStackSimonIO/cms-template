"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  baseSpeed?: number;
  maxSlowdown?: number;
  exitDelay?: number;
}

const DEFAULT_BASE_SPEED = 40;
const DEFAULT_MAX_SLOWDOWN = 120;
const DEFAULT_EXIT_DELAY = 400;
const PROGRESS_THRESHOLD = 70;
const MAX_PROGRESS = 100;

export const Loader5 = ({
  baseSpeed = DEFAULT_BASE_SPEED,
  maxSlowdown = DEFAULT_MAX_SLOWDOWN,
  exitDelay = DEFAULT_EXIT_DELAY,
}: LoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isContentExiting, setIsContentExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const getInterval = (currentProgress: number) => {
    if (currentProgress <= PROGRESS_THRESHOLD) {
      return baseSpeed;
    }
    const progressAfter70 =
      (currentProgress - PROGRESS_THRESHOLD) /
      (MAX_PROGRESS - PROGRESS_THRESHOLD);
    return baseSpeed + (maxSlowdown - baseSpeed) * Math.pow(progressAfter70, 2);
  };

  useEffect(() => {
    if (progress >= MAX_PROGRESS) {
      return;
    }
    const interval = getInterval(progress);
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, MAX_PROGRESS));
    }, interval);
    return () => clearInterval(progressInterval);
  }, [progress, baseSpeed, maxSlowdown]);

  useEffect(() => {
    if (progress === MAX_PROGRESS) {
      setIsContentExiting(true);
      const exitTimer = setTimeout(() => setIsExiting(true), exitDelay);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, exitDelay]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className={`fixed inset-0 z-[9999] flex flex-col bg-neutral-black transition-transform duration-700 ease-in-out ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {!isExiting && (
          <>
            <div
              className={`relative w-full transition-transform duration-500 ease-in-out ${
                isContentExiting ? "-translate-y-full" : "translate-y-0"
              }`}
            >
              <div
                className="h-12 bg-neutral-white transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute bottom-0 h-px w-full bg-background-primary" />
            </div>
            <div
              className={`absolute bottom-0 right-12 transition-transform duration-500 ease-in-out ${
                isContentExiting ? "translate-y-full" : "translate-y-0"
              }`}
            >
              <span className="text-[8rem] font-bold text-white">
                {progress}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
