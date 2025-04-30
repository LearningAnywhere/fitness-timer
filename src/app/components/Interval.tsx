interface IntervalProps {
  name: string;
  duration: number;
  timeLeft: number;
  isTimerRunning: boolean;
}

export const Interval = (params: IntervalProps) => {
  const { name, duration, timeLeft, isTimerRunning } = params;
  return (
    <div>
      <p>{`Name: ${name}`}</p>
      <p>{`Duration: ${duration} seconds`}</p>
      {(timeLeft < duration || isTimerRunning) && (
        <p>{`Time left: ${timeLeft} seconds`}</p>
      )}
    </div>
  );
};
