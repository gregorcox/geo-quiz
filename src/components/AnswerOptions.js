import React from 'react';

import { getRandomCountry } from "../utils";

const AnswerOptions = ({ category, countries }) => {

    if (category !== "flag") {
        return (
            <>
                <h1>{getRandomCountry(countries)[category]}</h1>
                <h1>{getRandomCountry(countries)[category]}</h1>
            </>
        );
    }
    return (
        <>
            <img className="flag" src={getRandomCountry(countries)[category]} alt="flag"></img>
            <img className="flag" src={getRandomCountry(countries)[category]} alt="flag"></img>
        </>
    )
};

export default AnswerOptions;
