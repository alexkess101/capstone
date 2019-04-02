import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import DatePicker from "react-datepicker";
import moment from 'moment-range';
import "react-datepicker/dist/react-datepicker.css";

const createAccount = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [numSalesGoal, setNumSalesGoal] = useState(0);
    const [commissionPercentage, setCommissionPercentage] = useState();
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [numSalesGoalValues, setNumSalesGoalValues] = useState([])
    const [incomeTotalValues, setIncomeTotalValues] = useState([])
    const [errorText, setErrorText] = useState("");


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
    
    
      const handleCreateUser = () => {
            let addEmail = email;
            let addPassword = password;
            let addCurrentSales = 0;
            let addNumSalesGoal = numSalesGoal;
            let addIncomeCurrent = 0;
            let addIncomeTotal = incomeTotal;
            let addCommissionPercentage = commissionPercentage;
            
           
            fetch("http://localhost:5000/new_user", {
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
                props.history.push("/home");
            })
            .catch(err => {
                console.log(err)
            })
            event.preventDefault();
        }

    return (
        <div className="create-account">
            <div className="create-account-container">
                <div className="create-account-wrapper">
                    <h1>Create a User</h1>

                    <form onSubmit={handleCreateUser}>
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
                        
                                <DatePicker
                                    className="datepicker"
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                />
                                <DatePicker
                                    className="datepicker"
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                />      
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
                        </div>
                
                        <button type="submit">Submit</button>

                        <div className="login-link">
                            <NavLink to="/">Login</NavLink>
                        </div>
                        
                        
                    
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(createAccount);