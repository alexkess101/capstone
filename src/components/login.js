import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { TimelineMax, CSSPlugin, ScrollToPlugin, Draggable, TimelineLite } from "gsap/all";


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [idValue, setID] = useState();

    useEffect(() => {
        let t1 = new TimelineLite();

        t1.to('.login-container', 0.4, {y:50, opacity:1});

    }, [])

    const handleSubmit = () => {
        event.preventDefault();
        let addEmail = email;
        let addPassword = password;

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "accepts": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: addEmail,
                password: addPassword
            })
        })
        .then(data => { return data.json() })
        .then(responseData => {

            if(require('password-hash').verify(password, responseData[0][2])){
                let id = responseData[0][0];
                let email = responseData[0][1];
                props.handleUserLogin(id, email);
                props.history.push(`/home/${id}`);
            } else {
                setErrorText("Incorrect password");
            }
        })
        .catch(err => {
            setErrorText("Email does not exist")
            console.log(err)
        })
      
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
