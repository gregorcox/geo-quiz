import React from 'react';

import CountryContainer from "./CountryContainer";

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: 'all',
            categories: ["capital", "population", "flag"],
            loadQuiz: false,
            numberOfQuestions: 5,
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleChange(evt) {
        const { state } = this;
        state[evt.target.name] = evt.target.value;
        this.setState(state);
    }

    handleCategoryChange(evt) {
        const { name } = evt.target;
        const { categories } = this.state;

        if (categories.includes(name)) {
            categories.splice(categories.indexOf(name), 1);
        } else {
            categories.push(name);
        }

        this.setState({
            categories
        });
    }

    handleClick() {
        if (this.state.categories.length > 0) {
            this.setState({
                loadQuiz: true
            });
        } else {
            this.setState({
                error: true
            });
        }
    }


    render() {
        // Load quiz if the user clicks the continue button and there are no errors
        if (this.state.loadQuiz) {
            return <CountryContainer region={this.state.region} categories={this.state.categories} number={parseInt(this.state.numberOfQuestions, 10)}/>
        }

        const regionSelector = (
            <div className="category-options">
                <label>Select a region:</label>
                <select name="region" onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>
        );

        const categorySelector = (
            <div className="category-options">
                <label>Select categories:</label>
                <div>
                    <input type="checkbox" name="capital" value="capital"
                        checked={this.state.categories.includes("capital")}
                        onChange={this.handleCategoryChange} />
                        Capital cities

                    <input type="checkbox" name="flag" value="flag"
                        checked={this.state.categories.includes("flag")}
                        onChange={this.handleCategoryChange} />
                        Flags

                    <input type="checkbox" name="population" value="population"
                        checked={this.state.categories.includes("population")}
                        onChange={this.handleCategoryChange} />
                        Populations
                    </div>
            </div>
        )

        const numberOfQuestions = (
            <>
                <label>How many questions would you like?</label>
                <select name="numberOfQuestions" onChange={this.handleChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                </select>
            </>
        )

        return (
            <div className="quiz-options">

                {regionSelector}

                {categorySelector}

                {numberOfQuestions}

                <button onClick={this.handleClick}>Continue</button>

                {this.state.error ? <p>Please select at least 1 category</p> : null}
            </div>
        )
    }
}

export default Landing;

