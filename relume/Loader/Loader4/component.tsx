"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  baseSpeed?: number;
  maxSlowdown?: number;
  exitDelay?: number;
}

const DEFAULT_BASE_SPEED = 40;
const DEFAULT_MAX_SLOWDOWN = 120;
const DEFAULT_EXIT_DELAY = 100;
const PROGRESS_THRESHOLD = 70;
const MAX_PROGRESS = 100;

export const Loader4 = ({
  baseSpeed = DEFAULT_BASE_SPEED,
  maxSlowdown = DEFAULT_MAX_SLOWDOWN,
  exitDelay = DEFAULT_EXIT_DELAY,
}: LoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
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
      const exitTimer = setTimeout(() => setIsExiting(true), exitDelay);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, exitDelay]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className={`fixed inset-0 z-[9999] flex flex-col bg-neutral-black transition-transform duration-700 ease-in-out ${isExiting ? "-translate-y-full" : "translate-y-0"}`}
      >
        {!isExiting && (
          <div className="mx-auto flex size-full max-w-lg flex-col justify-center">
            <div className="relative h-1 bg-neutral-700">
              <div
                className="absolute left-0 top-0 h-full bg-white transition-all ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between transition-transform duration-500 ease-in-out">
              <span className="text-white">Loading...</span>
              <span className="text-md text-white">{progress}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
