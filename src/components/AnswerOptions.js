import React from 'react';

import CountryContainer from "../containers/CountryContainer";

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
            isCorrect: null,
            buttonsDisabled: false,
            nextButtonClicked: false
        }

        this.generateNextQuestion = this.generateNextQuestion.bind(this);
    }

    checkAnswer = (answer) => {
        document.getElementsByClassName('result')[0].style.display = "flex";
        this.setState({
            isCorrect: answer === this.correctCountry[this.category],
            buttonsDisabled: true
        });
    };

    generateNextQuestion() {
        this.questionsAnswered++;
        this.setState({
            nextButtonClicked: true
        })
    }

    render() {
        if (this.state.nextButtonClicked) {
            return <CountryContainer region={this.props.region} categories={this.props.categoryOptions} />
        }

        const answerButtons = this.answersArray.map((answer) => {
            if (this.category !== "flag") {
                return (
                    <button disabled={this.state.buttonsDisabled} className="answer-option text-button" key={answer} onClick={() => this.checkAnswer(answer)}>{answer.toLocaleString()}</button>
                )
            } else {
                return (
                    <button disabled={this.state.buttonsDisabled} type="button" onClick={() => this.checkAnswer(answer)} className="answer-option">
                        <img className="flag" src={answer} alt="flag" key={answer}></img>
                    </button>
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

        let nextButton = null;
        if (this.state.isCorrect !== null) {
            nextButton = (
                <button onClick={this.generateNextQuestion}>Next</button>
            );
        }

        return (
            <>
                <div className="answer-options">
                    {answerButtons}
                </div>

                {result}
                {nextButton}
            </>
        )
    }
};

export default AnswerOptions;
