"use client";

interface IntervalProps {
  name: string;
  duration: number;
  timeLeft: number;
  isTimerRunning: boolean;
  isActive?: boolean;
}

const getColor = (isActive: boolean) => {
  return isActive ? "bg-green-300" : "bg-gray-100";
};

export const Interval = (params: IntervalProps) => {
  const { name, duration, timeLeft, isTimerRunning, isActive = false } = params;
  const color = getColor(isActive);
  return (
    <div className={`${color} p-4 rounded-md shadow-md`}>
      <p>{`Name: ${name}`}</p>
      <p>{`Duration: ${duration} seconds`}</p>
      {isActive && (timeLeft < duration || isTimerRunning) && (
        <p className="font-bold">{`Time left: ${timeLeft} seconds`}</p>
      )}
    </div>
  );
};
