import React from 'react';

import { getRandomCountry } from "../utils";

const AnswerOptions = ({ correctCountry, category, countries }) => {

    if (category !== "flag") {
        return (
            <div className="answer-options">
                <button>{correctCountry[category]}</button>
                <button>{getRandomCountry(countries)[category]}</button>
                <button>{getRandomCountry(countries)[category]}</button>
            </div>
        );
    }
    return (
        <div className="answer-options">
            <img className="flag" src={correctCountry[category]} alt="flag"></img>
            <img className="flag" src={getRandomCountry(countries)[category]} alt="flag"></img>
            <img className="flag" src={getRandomCountry(countries)[category]} alt="flag"></img>
        </div>
    )
};

export default AnswerOptions;
