import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './login';
import CreateAccount from './createAccount';
import CreateSale from './createSale';
import ViewSale from './viewSales';
import AboutUs from './aboutUs';
import Settings from './settings';

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
    sessionStorage.setItem("user_id", userId);
    Cookies.set('session_email', userEmail);
    
    this.setState({
      loggedInStatus: "LOGGED_IN",
    })
    
  }

  handleUserLogout() {
    Cookies.remove('session');
    sessionStorage.removeItem("user_id");
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
              <Route path="/home" render={props => 
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

            {
              Cookies.get('session') === "LOGGED_IN" ? 
              <Route path="/home/create_sale" render={props => 
                <CreateSale
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


            {
              Cookies.get('session') === "LOGGED_IN" ? 
              <Route path="/home/view_sales" render={props => 
                <ViewSale
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

            { 
              Cookies.get('session') === "LOGGED_IN" ? 
              <Route path="/about_us" render={props => 
                <AboutUs
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

            { 
              Cookies.get('session') === "LOGGED_IN" ? 
              <Route path="/settings" render={props => 
                <Settings
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
