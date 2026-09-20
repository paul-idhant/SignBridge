/**
 * Pure-data description of a 21-landmark hand, MediaPipe-style.
 * Coordinates live in a 200 × 240 viewBox space and are rendered by HandCanvas.
 * A pose can be morphed into another to simulate live sign-language tracking.
 */

export type Point = readonly [number, number];

export interface HandPose {
  /** Word the recogniser "outputs" while this pose is held. */
  label: string;
  points: readonly Point[];
}

/** MediaPipe-style skeleton connections between the 21 landmarks. */
export const HAND_BONES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4], // thumb
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8], // index
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12], // middle
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16], // ring
  [13, 17],
  [17, 18],
  [18, 19],
  [19, 20], // pinky
  [0, 17], // palm base
];

/** Fingertip landmark indices — rendered slightly brighter. */
export const FINGERTIPS: readonly number[] = [4, 8, 12, 16, 20];

const OPEN: HandPose = {
  label: "HELLO",
  points: [
    [100, 218], // 0  wrist
    [74, 188],
    [57, 163],
    [44, 142],
    [32, 118], // 1–4 thumb
    [84, 144],
    [79, 108],
    [76, 82],
    [74, 58], // 5–8 index
    [105, 137],
    [106, 98],
    [106, 70],
    [106, 44], // 9–12 middle
    [127, 144],
    [131, 108],
    [133, 84],
    [135, 62], // 13–16 ring
    [148, 157],
    [155, 130],
    [159, 110],
    [162, 92], // 17–20 pinky
  ] as const,
};

const THUMBS_UP: HandPose = {
  label: "YES",
  points: [
    [100, 218],
    [82, 178],
    [73, 148],
    [69, 120],
    [70, 94], // thumb up
    [90, 152],
    [106, 160],
    [118, 172],
    [124, 186], // index curled
    [110, 142],
    [123, 152],
    [131, 165],
    [135, 179], // middle curled
    [130, 146],
    [141, 157],
    [147, 169],
    [150, 183], // ring curled
    [149, 161],
    [157, 174],
    [161, 187],
    [163, 199], // pinky curled
  ] as const,
};

const PEACE: HandPose = {
  label: "PEACE",
  points: [
    [100, 218],
    [73, 188],
    [57, 164],
    [45, 143],
    [35, 120], // thumb relaxed
    [86, 146],
    [80, 108],
    [76, 80],
    [73, 55], // index extended
    [107, 138],
    [112, 100],
    [116, 72],
    [120, 47], // middle extended
    [128, 146],
    [130, 168],
    [128, 183],
    [123, 194], // ring folded
    [149, 158],
    [151, 177],
    [149, 190],
    [145, 200], // pinky folded
  ] as const,
};

export const POSES: readonly HandPose[] = [OPEN, THUMBS_UP, PEACE];
