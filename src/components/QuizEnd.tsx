import React from 'react';

const QuizEnd = ({ score, questionsAnswered } : { score: number; questionsAnswered: number }) => {
    const scorePercentage : number = score / questionsAnswered * 100;
    let message : string = '';

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