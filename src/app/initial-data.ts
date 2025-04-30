import { TInterval } from "./types";

const froggy: TInterval = {
  name: "Froggy",
  duration: 5,
};

const TIntervalBreak: TInterval = {
  name: "Break",
  duration: 2,
};

export const intervals: TInterval[] = [froggy, TIntervalBreak];
