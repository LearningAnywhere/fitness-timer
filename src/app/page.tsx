"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { froggy } from "./initial-data";
import { Button } from "./components/Button";
import { Interval } from "./components/Interval";

export default function Home() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(froggy.duration);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isTimerRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsTimerRunning(false);
      alert("Time's up!");
    }
  }, [timeLeft]);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleReset = () => {
    setTimeLeft(froggy.duration);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Stretches</h1>
        <Interval
          name={froggy.name}
          duration={froggy.duration}
          timeLeft={timeLeft}
          isTimerRunning={isTimerRunning}
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {!isTimerRunning ? (
            <Button
              label={"Start Timer"}
              color={"blue"}
              onClick={handleStartTimer}
            />
          ) : (
            <Button label={"Stop"} color={"red"} onClick={handleStopTimer} />
          )}
          {<Button label={"Reset"} color={"gray"} onClick={handleReset} />}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Ashley Newton
        {/* TODO: Add a link to my GitHub profile
        TODO: Add a link to my LinkedIn profile */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
