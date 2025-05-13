"use client";

import { useEffect, useRef, useCallback } from "react";

import {
  //intervals,
  // TODO: Move this to a mock file when API is ready
  testIntervals as intervals,
} from "./initial-data";
import { Interval } from "./components/Interval";
import { ButtonGroup } from "./components/ButtonGroup";
import { useTimer } from "./utils/useTimer";

export default function Home() {
  const {
    currentIntervalIndex,
    isTimerRunning,
    timeLeft,
    currentInterval,
    handleStartTimer,
    handleStopTimer,
    handleSkip,
    handleReset,
  } = useTimer(intervals);

  const activeIntervalRef = useRef<HTMLDivElement>(null);

  // Scroll to active interval when it changes
  useEffect(() => {
    if (activeIntervalRef.current) {
      activeIntervalRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentIntervalIndex]);

  // Determine if an interval is active
  const getIsActive = useCallback(
    (index: number) => {
      if (isTimerRunning) {
        return index === currentIntervalIndex;
      } else if (!isTimerRunning && index === currentIntervalIndex) {
        return timeLeft < currentInterval.duration;
      }
      return false;
    },
    [isTimerRunning, currentIntervalIndex, timeLeft, currentInterval]
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center max-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-h-[80vh] bg-[#F5F7FA] p-4 rounded-md shadow-md w-full sm:w-[45vh]">
        <h2 className="text-2xl pt-5 font-bold w-full text-center">
          Stretches
        </h2>
        <div className="flex gap-4 items-center flex-col overflow-y-auto max-h-screen bg-gray-50 p-4 rounded-md w-[40vh]">
          {intervals.map((interval, index) => (
            <Interval
              key={index}
              name={interval.name}
              duration={interval.duration}
              timeLeft={timeLeft}
              isTimerRunning={isTimerRunning}
              isActive={getIsActive(index)}
              ref={index === currentIntervalIndex ? activeIntervalRef : null}
            />
          ))}
        </div>

        <ButtonGroup
          isTimerRunning={isTimerRunning}
          handleStartTimer={handleStartTimer}
          handleStopTimer={handleStopTimer}
          handleSkip={handleSkip}
          handleReset={handleReset}
        />
        <div>
          Intervals left: {intervals.length - (currentIntervalIndex + 1)}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Ashley Newton
        {/* TODO: Add a link to my GitHub profile
        TODO: Add a link to my LinkedIn profile */}
      </footer>
    </div>
  );
}
