"use client";

import { useEffect, useState, useRef } from "react";

import {
  //intervals,
  // TODO: Move this to a mock file when API is ready
  testIntervals as intervals,
} from "./initial-data";
import { TInterval } from "./types";
import { Interval } from "./components/Interval";
import { ButtonGroup } from "./components/ButtonGroup";

export default function Home() {
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState<number>(0);

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(intervals[0].duration);

  const currentInterval: TInterval = intervals[currentIntervalIndex];

  const activeIntervalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Decrement the time left every second
    // If the timer is running and time left is greater than 0
    if (isTimerRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isTimerRunning, timeLeft]);

  useEffect(() => {
    // If time left is 0, and there are no more intervals, stop the timer
    if (timeLeft === 0 && currentIntervalIndex === intervals.length - 1) {
      setIsTimerRunning(false);
      handleReset();
      alert("Time's up!");
    }
    // If time left is 0, and there are more intervals, move to the next interval
    else if (timeLeft === 0 && currentIntervalIndex < intervals.length - 1) {
      handleSkip();
    }
  }, [timeLeft, currentIntervalIndex, intervals]);

  const updateTimerStatus = (index: number, timeLeft: number) => {
    setCurrentIntervalIndex(index);
    setTimeLeft(timeLeft);
  };

  const scrollToActiveInterval = () => {
    // Scroll to the active interval
    if (activeIntervalRef.current) {
      activeIntervalRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    scrollToActiveInterval();
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleSkip = () => {
    // TODO: Handle how to show the interval was skipped if the timer is not running
    // Skip to the next interval
    if (currentIntervalIndex < intervals.length - 1) {
      const nextIntervalIndex = currentIntervalIndex + 1;
      const nextIntervalDuration = intervals[nextIntervalIndex].duration;
      updateTimerStatus(nextIntervalIndex, nextIntervalDuration);
      scrollToActiveInterval();
    } else {
      // If there are no more intervals, stop the timer
      setIsTimerRunning(false);
      alert("No more intervals to skip to.");
    }
  };

  // Reset the timer to the first interval and stop the timer
  const handleReset = () => {
    updateTimerStatus(0, intervals[0].duration);
    setIsTimerRunning(false);
    // TODO: Scroll to the top of the page
  };

  const getIsActive = (index: number) => {
    if (isTimerRunning) {
      return index === currentIntervalIndex;
    } else if (!isTimerRunning && index === currentIntervalIndex) {
      return timeLeft < currentInterval.duration;
    }
    return false;
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center max-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-h-[80vh]">
        <h1 className="text-lg font-bold">Physical Therapy</h1>

        <h2 className="text-2xl font-bold">Stretches</h2>
        <div className="flex gap-4 items-center flex-col overflow-y-auto max-h-screen">
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
