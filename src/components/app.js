import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './homePage';
import Login from './login';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserLogout = this.handleUserLogout.bind(this);
  }

  handleUserLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUserLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  render() {
    return (
      <div className='app'>

        <Router>
          <div>
            <Route exact path="/" render={props => 
                <HomePage
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                handleUserLogout={this.handleUserLogout}
                />
              } 
            />

            <Route path="/login" render={props =>
              <Login
              {...props}
              handleUserLogin={this.handleUserLogin}
              loggedInStatus={this.state.loggedInStatus}
              />
              }
            />

            <Route path="/login/new_user" />
          </div>
        </Router>

      </div>
    );
  }
}
