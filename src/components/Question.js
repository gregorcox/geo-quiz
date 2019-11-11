import React from 'react';

class Question extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
    };
  }

  render(){
    return(
      <div>
        <h1>{this.props.country.name}</h1>
      </div>
    )
  }
}

export default Question;
