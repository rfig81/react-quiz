import { useEffect, useState } from "react";
import { AnswerState } from "../types";

interface QuestionTimerProps {
  timeout: number;
  onTimeout: (() => void) | null;
  mode: AnswerState;
}

export default function QuestionTimer({
  timeout,
  onTimeout,
  mode,
}: QuestionTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    const startTime = Date.now();
    const updateElapsed = () => {
      const now = Date.now();
      const elapsedTime = Math.min(now - startTime, timeout);
      setElapsed(elapsedTime);
      if (elapsedTime < timeout) {
        animationFrame = requestAnimationFrame(updateElapsed);
      } else if (onTimeout) {
        onTimeout();
      }
    };

    animationFrame = requestAnimationFrame(updateElapsed);

    return () => cancelAnimationFrame(animationFrame);
  }, [timeout, onTimeout]);

  return (
    <progress
      id="question-time"
      className={mode}
      value={timeout - elapsed}
      max={timeout}
    />
  );
}
