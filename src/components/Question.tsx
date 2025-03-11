import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../questions";
import { AnswerState } from "../types";

interface QuestionProps {
  index: number;
  onSelectAnswer: (answer: string) => void;
  onSkipAnswer: () => void;
}

interface Answer {
  selectedAnswer: string;
  isCorrect: boolean | null;
}

function setTimer(answer: Answer) {
  if (answer.selectedAnswer) {
    return 1000;
  }

  if (answer.isCorrect !== null) {
    return 2000;
  }

  return 10000;
}
function setAnswerState(answer: Answer) {
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    return answer.isCorrect ? AnswerState.CORRECT : AnswerState.WRONG;
  }

  if (answer.selectedAnswer) return AnswerState.ANSWERED;

  return AnswerState.UNANSWERED;
}

export default function Question({
  index,
  onSelectAnswer,
  onSkipAnswer,
}: QuestionProps) {
  const [answer, setAnswer] = useState<Answer>({
    selectedAnswer: "",
    isCorrect: null,
  });

  const timer = setTimer(answer);
  const answerState = setAnswerState(answer);

  function handleSelectAnswer(answer: string) {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[index].answers[0],
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
