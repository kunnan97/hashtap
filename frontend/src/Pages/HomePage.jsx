// Basic Imports
import React, { Component } from "react";
// -------------------------------------------------------------------------

//Imports needed for redux
import * as actions from '../store/actions/actions';
import { connect } from 'react-redux';
// -------------------------------------------------------------------------

import "./HomePage.css";

/** Container, renders home page.
* @memberof Container
* @param {Component} Component1, Component1.
* @param {ReduxAction} Action1, Action1.
*/
class HomePage extends Component {

    state = {
        
    }

    componentDidMount() {
        console.log("Component mounted.");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Component updated.");
    }

    /**
    * Called upon submission of login form, then calls redux-action (authLogin) to login and update redux state.
    * @param {Object} event: contains form information about username and password.
    */
   handleSubmit = (event) => {
        event.preventDefault();
        this.props.helloWorldAction(event.target.text.value);
    }

    render() {
        return ( 
            <div className = "homePage">
                <div className = "homePageContent">
                    <h2> Hello World! (Redux Testing): {this.props.helloWorldStatus} </h2>
                    <form onSubmit={this.handleSubmit}>
                            <input type = "text" name = "text" placeholder = "Enter text" />
                            <button> Change </button>
                    </form>
                </div>
            </div>
        );

    }

}


// Bringing in state from redux.
const mapStateToProps = (state) => {
    return {
      helloWorldStatus: state.helloWorld,
    };
};

// Bringing in actions from redux.
const mapDispatchToProps = dispatch => {
    return {
        helloWorldAction: (text) => dispatch(actions.helloWorld(text)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);