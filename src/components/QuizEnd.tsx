import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../map.json";

const QuizEnd = ({
  score,
  questionsAnswered,
}: {
  score: number;
  questionsAnswered: number;
}) => {
  const scorePercentage: number = (score / questionsAnswered) * 100;
  let message: string = "";

  if (scorePercentage < 20) message = "Better luck next time!";
  if (scorePercentage >= 20 && scorePercentage < 70) message = "Not too bad!";
  if (scorePercentage > 70) message = "Well done, great score!";

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="quiz-end__container">
      <div className="quiz-end__lottie-container">
        <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
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
