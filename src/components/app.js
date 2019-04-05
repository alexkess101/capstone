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
      loggedInStatus: "NOT_LOGGED_IN",
      userId: "",
      userEmail: ""

    }

    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserLogout = this.handleUserLogout.bind(this);
  }

  handleUserLogin(userId, userEmail) {
    Cookies.set('session', 'LOGGED_IN');
    Cookies.set('session_id', userId);
    Cookies.set('session_email', userEmail);
    
    this.setState({
      loggedInStatus: "LOGGED_IN",
    })
    
  }

  handleUserLogout() {
    Cookies.remove('session');
    Cookies.remove('session_id');
    Cookies.remove('session_email');

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
              <Route path="/home/:id" render={props => 
                <Home
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleUserLogin={this.handleUserLogin}            
                  handleUserLogout={this.handleUserLogout}
                  userId={this.state.userId}
                  userEmail={this.state.userEmail}
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
