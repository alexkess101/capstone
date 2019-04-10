import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingOverlay from 'react-loading-overlay';


const createAccount = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [numSalesGoal, setNumSalesGoal] = useState(0);
    const [commissionPercentage, setCommissionPercentage] = useState();
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isLoaded, setIsLoadedValue] = useState(false);

    const [numSalesGoalValues, setNumSalesGoalValues] = useState([])
    const [incomeTotalValues, setIncomeTotalValues] = useState([])
    const [errorText, setErrorText] = useState("");
    


    useEffect(() => {
 

        let numSalesGoalValueList = [];
        let incomeTotalValueList = [];
        let t1 = new TimelineLite();

        numSalesGoalValueList.push("Sales Goal:");
        incomeTotalValueList.push("Income Goal:");
        for (let i = 5; i <= 1500; i = i + 5) {
            numSalesGoalValueList.push(i)
        }
        setNumSalesGoalValues(numSalesGoalValueList);
    
        for (let i = 2000; i <= 600000; i = i + 2000) {
            incomeTotalValueList.push(i)
        }
        setIncomeTotalValues(incomeTotalValueList);

        t1.to('.create-account-container', 0.5, {y:50, opacity:1});


    }, [])
    
    
    const checkForms = () => {
        if (email === "" || password === "" || numSalesGoal === 0 || commissionPercentage == null || incomeTotal === 0) {
            setErrorText("Please fill out all forms")
        } else {
            handleCreateUser();
        }
        event.preventDefault();
    }

    const handleCreateUser = () => {
        setIsLoadedValue(true);
        let addEmail = email;
        let addPassword = require('password-hash').generate(password);
        let addStartDate = startDate;
        let addEndDate = endDate;
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
                start_date: addStartDate,
                end_date: addEndDate,
                current_sales: addCurrentSales,
                num_sales_goal: addNumSalesGoal,
                income_current: addIncomeCurrent,
                income_total: addIncomeTotal,
                commission_percentage: addCommissionPercentage
            })
        })
        .then(response => {return response.json();})
        .then(responseData => {return responseData})
        .then((data) => {
            let id = data[0][0];
            let email = data[0][1];
            props.handleUserLogin(id, email);
            props.history.push(`/home/${id}`);
        })
        .catch(err => {
            setIsLoadedValue(false)
            setErrorText("Sorry, email already exists")
            console.log(err)
        })
        event.preventDefault();
    }

    return (
        <LoadingOverlay
            active={isLoaded}
            spinner
            text="Loading..."
            fadeSpeed={200}
            >
        <div className="create-account">
            <div className="create-account-container">
                <div className="create-account-wrapper">
                    <h1>Create an Account</h1>

                    <form onSubmit={checkForms}>
                        {errorText !== "" ? <div id="error">{errorText}</div> : <div id ='error'></div>}
                        <div className="email-password-form">
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
                        </div>
                        
                        <div className="date-picker-forms">
                            <DatePicker
                                className="datepicker"
                                selected={startDate}
                                onChange={date => {
                                    setStartDate(date)
                                    setErrorText("")
                                }}
                            />
                            <DatePicker
                                className="datepicker"
                                selected={endDate}
                                onChange={date => {
                                    setEndDate(date)
                                    setErrorText("")
                                }}
                            />      
                        </div>

                        
                        <div className="select-forms">
                            <select value={numSalesGoal} onChange={(event) => {
                                setNumSalesGoal(event.target.value)
                                setErrorText("")
                                }}>
                                {numSalesGoalValues.map((value, index) => {
                                    return <option key = {index} value={value}>{value}</option>
                                })}
                            </select>
                            
                            <select value={incomeTotal} onChange={event => {
                                setIncomeTotal(event.target.value)
                                setErrorText("")
                                }}>
                                {incomeTotalValues.map((value, index) => {
                                    return <option key = {index}value={value}>{value}</option>
                                })}
                            </select>
                        </div>
                        
                        <div className = "commission-form form">
                            <input
                                type="number"
                                step = "0.01"
                                min = "0"
                                name="commission_percentage"
                                placeholder="Enter Commission Percentage '00.00'"
                                value={commissionPercentage}
                                onChange={event => {
                                    setCommissionPercentage(event.target.value)
                                    setErrorText("")
                                }}
                            />
                        </div>
                        
                
                        <button type="submit" id="button" style={password != "" && commissionPercentage != null ? {backgroundColor: '#3D9160', color: '#012154'} : null} >Create Account</button>

                        <div className="login-link">
                            Already have an account? <NavLink to="/"> Login</NavLink>
                        </div>
                        
                        
                    
                    </form>
                </div>
            </div>
        </div>
        </LoadingOverlay>
    );
}

export default withRouter(createAccount);