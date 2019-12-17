import React from 'react';

const QuizEnd = ({ score, questionsAnswered }) => {

    return (
        <div className="quiz-end-container">
            <p>Your score is {score} / {questionsAnswered}</p>
        </div>

    );
};

export default QuizEnd;