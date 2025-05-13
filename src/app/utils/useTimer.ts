import { useState, useCallback, useEffect } from "react";
import { TInterval } from "../types";

export function useTimer(initialIntervals: TInterval[]) {
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialIntervals[0].duration);

  const currentInterval = initialIntervals[currentIntervalIndex];

  // Memoize update functions to prevent unnecessary re-renders
  const updateTimerStatus = useCallback((index: number, timeLeft: number) => {
    setCurrentIntervalIndex(index);
    setTimeLeft(timeLeft);
  }, []);

  const handleStartTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);

  const handleStopTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const handleSkip = useCallback(() => {
    if (currentIntervalIndex < initialIntervals.length - 1) {
      const nextIntervalIndex = currentIntervalIndex + 1;
      const nextIntervalDuration = initialIntervals[nextIntervalIndex].duration;
      updateTimerStatus(nextIntervalIndex, nextIntervalDuration);
    } else {
      setIsTimerRunning(false);
      alert("No more intervals to skip to.");
    }
  }, [currentIntervalIndex, initialIntervals, updateTimerStatus]);

  const handleReset = useCallback(() => {
    updateTimerStatus(0, initialIntervals[0].duration);
    setIsTimerRunning(false);
  }, [initialIntervals, updateTimerStatus]);

  // Timer decrement effect
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isTimerRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isTimerRunning, timeLeft]);

  // Interval completion effect
  useEffect(() => {
    if (timeLeft === 0) {
      if (currentIntervalIndex === initialIntervals.length - 1) {
        setIsTimerRunning(false);
        handleReset();
        alert("Time's up!");
      } else if (currentIntervalIndex < initialIntervals.length - 1) {
        handleSkip();
      }
    }
  }, [
    timeLeft,
    currentIntervalIndex,
    initialIntervals,
    handleReset,
    handleSkip,
  ]);

  return {
    currentIntervalIndex,
    isTimerRunning,
    timeLeft,
    currentInterval,
    handleStartTimer,
    handleStopTimer,
    handleSkip,
    handleReset,
  };
}
