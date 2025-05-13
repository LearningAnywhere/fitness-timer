import { TInterval } from "./types";

const froggy: TInterval = {
  name: "Froggy",
  duration: 30,
};

const lowLungeRight: TInterval = {
  name: "Low Lunge Right",
  duration: 30,
};

const lowLungeLeft: TInterval = {
  name: "Low Lunge Left",
  duration: 30,
};

const periformisRight: TInterval = {
  name: "Periformis Right",
  duration: 30,
};

const periformisLeft: TInterval = {
  name: "Periformis Left",
  duration: 30,
};

const quadRight: TInterval = {
  name: "Quad Stretch Right",
  duration: 30,
};

const quadLeft: TInterval = {
  name: "Quad Stretch Left",
  duration: 30,
};

const squat: TInterval = {
  name: "Squat",
  duration: 30,
};

const intervalBreak: TInterval = {
  name: "Break",
  duration: 10,
};

const testInterval: TInterval = {
  name: "Test Interval",
  duration: 2,
};

const testInterval2: TInterval = {
  name: "Another Test Interval",
  duration: 4,
};

export const testIntervals: TInterval[] = [testInterval, testInterval2];

export const intervals: TInterval[] = [
  froggy,
  intervalBreak,
  froggy,
  intervalBreak,
  froggy,
  intervalBreak,
  lowLungeRight,
  lowLungeLeft,
  lowLungeRight,
  lowLungeLeft,
  lowLungeRight,
  lowLungeLeft,
  intervalBreak,
  periformisRight,
  periformisLeft,
  periformisRight,
  periformisLeft,
  periformisRight,
  periformisLeft,
  intervalBreak,
  quadRight,
  quadLeft,
  quadRight,
  quadLeft,
  quadRight,
  quadLeft,
  intervalBreak,
  squat,
  intervalBreak,
  squat,
  intervalBreak,
  squat,
  intervalBreak,
];

// const tvaBreathing: TExercise = {
//   name: "TVA Breathing",
//   repetitions: 10,
// };

// const gluteBridge: TExercise = {
//   name: "Glute Bridge",
//   repetitions: 10,
// };

// const clamShellLeft: TExercise = {
//   name: "Clam Shell Left",
//   repetitions: 10,
// };

// const clamShellRight: TExercise = {
//   name: "Clam Shell Right",
//   repetitions: 10,
// };

// export const exercisesWithReps: TExercise[] = [
//   tvaBreathing,
//   gluteBridge,
//   clamShellLeft,
//   clamShellRight,
// ];
