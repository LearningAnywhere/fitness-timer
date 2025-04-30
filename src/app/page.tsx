"use client";

import { useEffect, useState } from "react";

import { intervals } from "./initial-data";
import { TInterval } from "./types";
import { Button } from "./components/Button";
import { Interval } from "./components/Interval";

export default function Home() {
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(intervals[0].duration);

  const currentInterval: TInterval = intervals[currentIntervalIndex];

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
      setCurrentIntervalIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(intervals[currentIntervalIndex + 1].duration);
    }
  }, [timeLeft]);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  // Reset the timer to the first interval and stop the timer
  const handleReset = () => {
    setCurrentIntervalIndex(0);
    setTimeLeft(intervals[0].duration);
    setIsTimerRunning(false);
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-lg font-bold">Stretches</h1>

        <div className="flex gap-4 items-center flex-col">
          {intervals.map((interval, index) => (
            <Interval
              key={index}
              name={interval.name}
              duration={interval.duration}
              timeLeft={timeLeft}
              isTimerRunning={isTimerRunning}
              isActive={getIsActive(index)}
            />
          ))}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {!isTimerRunning ? (
            <Button
              label={"Start Timer"}
              type={"start"}
              onClick={handleStartTimer}
            />
          ) : (
            <Button label={"Stop"} type={"stop"} onClick={handleStopTimer} />
          )}
          {<Button label={"Reset"} type={"reset"} onClick={handleReset} />}
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
