import { useRef } from "react";
import { AnswerState } from "../types";
import shuffle from "../utils/shuffle";

interface AnswersProps {
  answers: string[];
  selectedAnswer: string;
  answerState: AnswerState;
  onSelect: (answer: string) => void;
}

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}: AnswersProps) {
  const shuffledAnswers = useRef<string[]>([]);

  if (!shuffledAnswers.current.length) {
    shuffledAnswers.current = [...answers].sort(shuffle);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = "";

        if (answerState === AnswerState.ANSWERED && isSelected) {
          cssClasses = "selected";
        }
        if (
          (answerState === AnswerState.CORRECT ||
            answerState === AnswerState.WRONG) &&
          isSelected
        ) {
          cssClasses = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              className={cssClasses}
              onClick={() => onSelect(answer)}
              disabled={answerState !== AnswerState.UNANSWERED}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
