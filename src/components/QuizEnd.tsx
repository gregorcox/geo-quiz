import Lottie from "lottie-react";
import animationData from "../map.json";

interface QuizEndProps {
  score: number;
  questionsAnswered: number;
}

const QuizEnd = ({ score, questionsAnswered }: QuizEndProps) => {
  const scorePercentage = (score / questionsAnswered) * 100;
  let message = "";

  if (scorePercentage < 20) {
    message = "Better luck next time!";
  } else if (scorePercentage < 70) {
    message = "Not too bad!";
  } else {
    message = "Well done, great score!";
  }

  return (
    <div className="quiz-end__container">
      <div className="quiz-end__lottie-container">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className="quiz-end__message">
        <p>
          Your score is {score}/{questionsAnswered}
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default QuizEnd;
