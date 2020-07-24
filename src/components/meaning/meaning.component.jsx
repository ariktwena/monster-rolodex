import React, { Component } from "react";


/**
 *
 * Meaning of life example
 * To se what renders in green: Press 3 dots in chrome developer tools -> more tools -> rendering -> "check" paint flashing
 *
 */

class MeaningOfLife extends Component {

    constructor(props) {
        super(props);

        //We make a state
        this.state = {
            meaningOfLife: 37,
            incrementNumber: this.props.increment
        }
    }

    // //We can declare the state outside of the constructor
    // state = {
    //     meaningOfLife: 37,
    //     incrementNumber: this.props.increment
    // }

    //React setState is Async
    handleChange = () => {
        //To se a update console, we make a callback
        //Bad practice when changing "this
        //this.setState({meaningOfLife: this.state.meaningOfLife + 1}, () => console.log(this.state.meaningOfLife));
        //The right way of changing "this"
        //this.setState((prevState, prevProps) => ({meaningOfLife: this.state.meaningOfLife + 1}), () => console.log(this.state.meaningOfLife));
        //Same function, but better overview:
        this.setState((prevState, prevProps) => {
            return {meaningOfLife: prevState.meaningOfLife + prevProps.increment} //The prevProps is increment={1} in the app.js file
        },
            () => console.log('Async updated: ' + this.state.meaningOfLife)
        );
        //If we want to update the state after it has be "set", we can do it in the callback function

        //The console will always be behind because setSate is Async
        console.log('Not Async updated: ' + this.state.meaningOfLife);
    }

    render(){

        return (
            <div>
                <p>Increment number {this.state.incrementNumber}</p>
                <p>{this.state.meaningOfLife}</p>
                <button onClick={this.handleChange}>Change Meaning Of Life</button>
            </div>
        )
    }
}

export default MeaningOfLife;

