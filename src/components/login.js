import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    const handleSubmit = () => {
        
        fetch("http://localhost:5000/login", {
            method: "GET",
            headers: {
                "accepts": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {return response.json();})
        .then(responseData => {
            
            for (let i = 0; i < responseData.length; i++) {
                if (email == responseData[i][1] && password == responseData[i][2]) {
                    
                    props.handleUserLogin();
                    props.history.push('/home');
                } else {
                    setErrorText("Incorrect username or password");
                }
            }
        })
        event.preventDefault();
    }


  


    return (
        <div className = 'login'>
            <div className="login-container">
                <div className="login-wrapper">
                    <h1>Clearer</h1>
                    <form onSubmit={handleSubmit} className="login-form">
                    {errorText !== "" ? <div id="error">{errorText}</div> : <div id ='error'></div>}
                        <div className="form">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={event => {
                                    setEmail(event.target.value)
                                    setErrorText("");
                                    }
                                }
                            />
                        </div>

                        <div className="form">
                            <input type="password"
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={event => {
                                    setPassword(event.target.value);
                                    setErrorText("");
                                    }
                                }
                            />
                        </div>
                        
                        
                        <button type="submit" id="button" style={password != "" ? {backgroundColor: '#3D9160', color: '#012154'} : null} >Login</button>

                      
                        <div className="create-account-link">
                            Don't have an account? <NavLink to="/new_user">Sign up</NavLink>            
                        </div>        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);
