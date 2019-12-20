import React from 'react';

const QuizEnd = ({ score, questionsAnswered }) => {
    const scorePercentage = score / questionsAnswered * 100;
    let message;

    if (scorePercentage < 20) message = "Better luck next time!";
    if (scorePercentage >= 20 && scorePercentage < 70) message = "Not too bad!";
    if (scorePercentage > 70) message = "Well done, great score!";

    return (
        <div className="quiz-end-container">
            <p>Your score is {score} / {questionsAnswered}</p>
            {message}
        </div>

    );
};

export default QuizEnd;