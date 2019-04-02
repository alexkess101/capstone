import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './login';
import CreateAccount from './createAccount';
import Home from './homePage';
import Cookies from 'js-cookie';



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
    Cookies.set('session', 'LOGGED_IN');

    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUserLogout() {
    Cookies.remove('session')
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
              <Login
              {...props}
              handleUserLogin={this.handleUserLogin}
              loggedInStatus={this.state.loggedInStatus}
              />
              }
            />
            {
              Cookies.get('session') === "LOGGED_IN" ? 
              <Route path="/home" render={props => 
                <Home
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleUserLogin={this.handleUserLogin}            
                  handleUserLogout={this.handleUserLogout}
                /> 
              
              } 
            /> : null
            }
            

            <Route path="/new_user" render={props =>
              <CreateAccount
                {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleUserLogin={this.handleUserLogin}            
                  handleUserLogout={this.handleUserLogout}
              />
            
            }/>
          </div>
        </Router>

      </div>
    );
  }
}
