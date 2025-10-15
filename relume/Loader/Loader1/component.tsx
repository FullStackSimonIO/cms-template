"use client";

import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

export const Loader1 = () => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);
    return () => clearTimeout(timer);
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
            <CgSpinner className="h-16 w-16 animate-spin text-white" />
          </div>
        )}
      </div>
    </div>
  );
};
