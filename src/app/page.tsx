"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Interval = {
  name: string;
  duration: number;
};

const froggy: Interval = {
  name: "Froggy",
  duration: 30,
};

export default function Home() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(froggy.duration);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
    }
  }, [isTimerRunning]);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Stretches</h1>
        <div>
          <h2>{`Name: ${froggy.name}`}</h2>
          <h2>{`Duration: ${froggy.duration} seconds`}</h2>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {!isTimerRunning ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleStartTimer}
            >
              Start Timer
            </button>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <h2>{`Time Left: ${timeLeft} seconds`}</h2>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleStopTimer}
              >
                Stop
              </button>
            </div>
          )}
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
