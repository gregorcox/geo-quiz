import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface QuizEndProps {
  score: number;
  questionsAnswered: number;
}

const QuizEnd = ({ score, questionsAnswered }: QuizEndProps) => {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    import("../map.json").then((module) => {
      setAnimationData(module.default);
    });
  }, []);

  const scorePercentage = (score / questionsAnswered) * 100;
  const message =
    scorePercentage < 20
      ? "Better luck next time!"
      : scorePercentage < 70
        ? "Not too bad!"
        : "Well done, great score!";

  return (
    <div className="quiz-end__container">
      <div className="quiz-end__lottie-container">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ height: "100%", width: "100%" }}
          />
        ) : null}
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
