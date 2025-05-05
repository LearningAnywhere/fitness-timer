import { Button } from "./Button";

interface ButtonGroupProps {
  isTimerRunning: boolean;
  handleStartTimer: () => void;
  handleStopTimer: () => void;
  handleSkip: () => void;
  handleReset: () => void;
}

export const ButtonGroup = (params: ButtonGroupProps) => {
  const {
    isTimerRunning,
    handleStartTimer,
    handleStopTimer,
    handleSkip,
    handleReset,
  } = params;

  return (
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
      {<Button label={"Skip Interval"} type={"skip"} onClick={handleSkip} />}
      {<Button label={"Reset"} type={"reset"} onClick={handleReset} />}
    </div>
  );
};
