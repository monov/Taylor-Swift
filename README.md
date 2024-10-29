# Timer Component

The `Timer` component is a circular countdown timer built with React. It visually displays the remaining time and provides controls to start, pause, and reset the timer.

## Component Overview

This timer:
1. Counts down from a specified `endTime`.
2. Shows elapsed and remaining time in a circular visual display.
3. Allows starting, pausing, and resetting the countdown.
4. Adds a flashing effect when the time reaches zero.

## Props

- **`title`**: `string`  
  A title to display at the center of the timer. Useful for labeling what the timer is tracking.

- **`endTime`**: `number`  
  The total time in seconds for the countdown (must be between 1 and 3599 seconds, i.e., up to 59 minutes and 59 seconds).

- **`elapsedTime`**: `number`  
  The time in seconds that has already elapsed before starting or resuming the timer.

## State Variables

- **`timeLeft`**: `number`  
  Tracks the remaining time in seconds. It is initialized as `endTime - elapsedTime`.

- **`isFlashing`**: `boolean`  
  Indicates if the timer should flash when time reaches zero.

- **`isPaused`**: `boolean`  
  Controls whether the timer is paused or actively counting down.

- **`intervalId`**: `number` | `null`  
  Stores the interval ID for the countdown so it can be cleared when the timer is paused or reset.

## Functions

### Core Functions

- **`useEffect`**  
  Sets up the timer countdown. When `timeLeft` is greater than zero and `isPaused` is `false`, the timer decreases `timeLeft` by 1 second each second. If `timeLeft` becomes zero, the interval clears, and `isFlashing` is set to `true` after a slight delay.

- **`formatTime(time)`**  
  Converts the time in seconds to a `MM:SS` format for display.

- **`calculateOffset()`**  
  Calculates the stroke offset for the SVG circular progress bar, which determines the length of the arc displayed based on elapsed time.

### Control Functions

- **`startTimer()`**  
  Starts the countdown by setting `isPaused` to `false` and resetting `isFlashing` to `false`.

- **`pauseTimer()`**  
  Pauses the countdown by setting `isPaused` to `true`.

- **`resetTimer()`**  
  Resets the timer to the initial state, with `timeLeft` set to `endTime`, `isPaused` to `true`, and `isFlashing` to `false`.

## Error Handling

The component throws errors for the following invalid conditions:
1. **`endTime` exceeds 3599 seconds.**
2. **`endTime` is less than `elapsedTime`** (negative remaining time at start).

## Rendering

The component renders the following:
1. **Circular Countdown Visualization**  
   A circle SVG with two overlapping circular paths:
    - `circle-bg`: The static background circle.
    - `circle-prog-bar`: The progress circle representing time left, with a flashing effect when time is up.

2. **Text Labels**  
   Displays the title, elapsed time, and remaining time within the circle.

3. **Timer Controls**  
   Buttons to start, pause, and reset the timer. The start and pause buttons are conditionally enabled based on the `isPaused` state.

## CSS Styling

The component assumes CSS styles are defined in `Timer.css` for classes like `.circle-bg`, `.circle-prog-bar`, `.flash`, `.circle-text`, and button styles to enhance the appearance.

---

This component can be reused for any countdown-based applications, such as pomodoro timers, workout intervals, or quiz countdowns. It uses the SVG circle’s `strokeDasharray` and `strokeDashoffset` properties to visually represent the countdown progress in a circular format, making the time remaining easy to gauge at a glance.
