import React from 'react';

import { getRandomCountry, shuffle } from "../utils";

class AnswerOptions extends React.Component {
    constructor(props) {
        super(props);

        this.correctCountry = this.props.correctCountry;
        this.category = this.props.category;
        this.countries = this.props.countries;
        this.answersArray = [];
        this.answersArray[0] = getRandomCountry(this.countries)[this.category];
        this.answersArray[1] = getRandomCountry(this.countries)[this.category];
        this.answersArray[2] = this.correctCountry[this.category];
        shuffle(this.answersArray);

        this.state = {
            isCorrect: null
        }
    }

    checkAnswer = (answer) => {
        document.getElementsByClassName('result')[0].style.display = "flex";
        this.setState({
            isCorrect: answer === this.correctCountry[this.category]
        });
    };

    render() {
        const answerButtons = this.answersArray.map((answer) => {
            if (this.category !== "flag") {
                return (
                    <button key={answer} onClick={() => this.checkAnswer(answer)}>{answer}</button>
                )
            } else {
                return (
                    <img className="flag" src={answer} alt="flag" key={answer}></img>
                )
            }
        });

        let result = null;
        if (this.state.isCorrect) {
            result = (
                <div className="result result--correct">Correct!</div>
            );
        } else {
            result = (
                <div className="result result--incorrect">Wrong!</div>
            )
        }

        return (
            <>
                <div className="answer-options">
                    {answerButtons}
                </div>

                {result}
            </>
        )
    }
};

export default AnswerOptions;
