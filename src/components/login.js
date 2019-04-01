import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [numSalesGoal, setNumSalesGoal] = useState(0);
    const [commissionPercentage, setCommissionPercentage] = useState();
    const [incomeTotal, setIncomeTotal] = useState(0);
    

    const [numSalesGoalValues, setNumSalesGoalValues] = useState([])
    const [incomeTotalValues, setIncomeTotalValues] = useState([])
    const [errorText, setErrorText] = useState("");
    const [account, setAccount] = useState("LOGIN");



    useEffect(() => {
        // if (account === 'LOGIN') {
        //     props.history.push('/')
        // }


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
                if (email === responseData[i][1] && password === responseData[i][2]) {
                    props.handleUserLogin();
                    props.history.push('/');
                } else {
                    setErrorText("Incorrect username or password");
                }
            }
        })


        event.preventDefault();
        // if (email === "test@test.com" && password === "asdf") {
        //     props.handleUserLogin();
        //     props.history.push('/');
        // } else {
            // setErrorText("Incorrect username or password");
        // }
    }

    const handleCreateUser = (event) => {
        let addEmail = email;
        let addPassword = password;
        let addCurrentSales = 0;
        let addNumSalesGoal = numSalesGoal;
        let addIncomeCurrent = 0;
        let addIncomeTotal = incomeTotal;
        let addCommissionPercentage = commissionPercentage;
        
       
        
        fetch("http://localhost:5000/login/new_user", {
            method: 'POST',
            headers: {
                "accepts": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: addEmail,
                password: addPassword,
                current_sales: addCurrentSales,
                num_sales_goal: addNumSalesGoal,
                income_current: addIncomeCurrent,
                income_total: addIncomeTotal,
                commission_percentage: addCommissionPercentage
            })
        })
        .then(response => {return response.json();})
        .then(responseData => {return responseData})
        .then(() => {
            props.handleUserLogin();
            props.history.push("/");
        })
        .catch(err => {
            console.log(err)
        })
        event.preventDefault();
        
        
        
        
    }

  


    return (
        <div>
            {
                account === "LOGIN" ? <h1>This is the login page</h1> : <h1>Welcome to clear money! </h1>
            }
    
            <form onSubmit={() => account === "LOGIN" ? handleSubmit(event) : handleCreateUser(event)}>
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
                            
                            <div>
                                <input
                                    type="number"
                                    step = "0.01"
                                    min = "0"
                                    name="commission_percentage"
                                    placeholder="00.00"
                                    value={commissionPercentage}
                                    onChange={event => setCommissionPercentage(event.target.value)}
                                />
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

export default withRouter(Login);
