import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

interface SummaryProps {
  userAnswers: (string | null)[];
}

function countAnswerStats(userAnswers: (string | null)[]) {
  const stats = { skipped: 0, correct: 0, wrong: 0 };

  for (let index = 0; index < userAnswers.length; index++) {
    const answer = userAnswers[index];

    if (answer) {
      if (QUESTIONS[index].answers[0] === answer) {
        stats.correct += 1;
      } else {
        stats.wrong += 1;
      }
      continue;
    }

    stats.skipped += 1;
  }

  return stats;
}

export default function Summary({ userAnswers }: SummaryProps) {
  const totalQuestions = QUESTIONS.length;
  const answersStats = countAnswerStats(userAnswers);

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        {Object.entries(answersStats).map(([stat, count]) => {
          const statPercentage = ((count / totalQuestions) * 100).toFixed(0);
          return (
            <p key={stat}>
              <span className="number">{statPercentage}%</span>
              <span className="text">{stat}</span>
            </p>
          );
        })}
      </div>
      <ol>
        {userAnswers.map((answer, i) => {
          let cssClass = "user-answer";
          if (answer === null) cssClass += " skipped";
          else if (answer === QUESTIONS[i].answers[0]) cssClass += " correct";
          else cssClass += " wrong";
          return (
            <li key={i}>
              <h3>{i + 1}</h3>
              <p className="question">{QUESTIONS[i].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
