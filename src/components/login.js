import React, { useState, useEffect } from 'react';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");


    const handleSubmit = () => {
        event.preventDefault();
        if (email === "test@test.com" && password === "asdf") {
            props.handleUserLogin();
            props.history.push('/');
        } else {
            setErrorText("Incorrect username or password");
        }
    }

    const handleChange = (event) => {
        setEmail(event.target.value)
        setErrorText("")
    }
    return (
        <div>
            <h1>This is the login page</h1>

            <form onSubmit={() => handleSubmit(event)}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={() => handleChange(event)}
                />
                <input type="password"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                {errorText !== "" ? <div>{errorText}</div> : null }
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;