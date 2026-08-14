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
    <section
      aria-labelledby="quiz-results-heading"
      className="relative min-h-[24rem] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="h-full w-full"
          />
        ) : null}
      </div>

      <div className="relative flex min-h-[24rem] items-center justify-center p-6">
        <div className="max-w-sm rounded-2xl border border-sky-200 bg-white/90 p-6 text-center shadow-lg backdrop-blur dark:border-sky-900 dark:bg-slate-900/90">
          <h2 id="quiz-results-heading" className="text-xl font-semibold">
            Quiz complete
          </h2>
          <p className="mt-3 text-lg">
            Your score is{" "}
            <span className="font-bold text-sky-700 dark:text-sky-300">
              {score}/{questionsAnswered}
            </span>
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{message}</p>
        </div>
      </div>
    </section>
  );
};

export default QuizEnd;
