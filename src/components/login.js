import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [account, setAccount] = useState("LOGIN");
    const [numSalesGoal, setNumSalesGoal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [numSalesGoalValues, setNumSalesGoalValues] = useState([])
    const [incomeTotalValues, setIncomeTotalValues] = useState([])



    useEffect(() => {
        let numSalesGoalValueList = [];
        let incomeTotalValueList = [];
        for (let i = 5; i <= 2000; i = i + 5) {
            numSalesGoalValueList.push(i)
        }
        setNumSalesGoalValues(numSalesGoalValueList);

        for (let i = 0; i <= 600000; i = i + 5000) {
            incomeTotalValueList.push(i)
        }
        setIncomeTotalValues(incomeTotalValueList);
    }, [])

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
                <div className="form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={() => handleChange(event)}
                    />
                </div>

                <div className="form">
                    <input type="password"
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                {errorText !== "" ? <div>{errorText}</div> : null }

                {
                    account == "CREATE_ACCOUNT" ? 
                        <div>
                            <div>
                                <select value={numSalesGoal} onChange={(event) => setNumSalesGoal(event.target.value)}>
                                    {numSalesGoalValues.map((value, index) => {
                                        return <option key = {index} value={value}>{value}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <select value={incomeTotal} onChange={event => setIncomeTotal(event.target.value)}>
                                    {incomeTotalValues.map((value, index) => {
                                        return <option key = {index}value={value}>{value}</option>
                                    })}
                                </select>
                            </div>


                        </div> : null
                    

                }
                <button type="submit">Submit</button>
`

                <NavLink to="/login" onClick={() => setAccount("LOGIN")}>Login</NavLink>
                <NavLink to="/login/new_user" onClick={() => setAccount("CREATE_ACCOUNT")}>Create Account</NavLink>
            
            </form>
        </div>
    );
}

export default Login;