import React, {Component, useState, useEffect} from 'react';
import { withRouter } from 'react-router';
import DatePicker from "react-datepicker";
import Cookies from 'js-cookie';
import axios from 'axios';

const Settings = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [numSalesGoal, setNumSalesGoal] = useState(0);
    const [commissionPercentage, setCommissionPercentage] = useState();
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errorText, setErrorText] = useState("");


    const [numSalesGoalValues, setNumSalesGoalValues] = useState([])
    const [incomeTotalValues, setIncomeTotalValues] = useState([])

    useEffect(() => {
        let numSalesGoalValueList = [];
        let incomeTotalValueList = [];

        for (let i = 5; i <= 1500; i = i + 5) {
            numSalesGoalValueList.push(i)
        }
        setNumSalesGoalValues(numSalesGoalValueList);
    
        for (let i = 2000; i <= 600000; i = i + 2000) {
            incomeTotalValueList.push(i)
        }
        setIncomeTotalValues(incomeTotalValueList);

        

        fetch(`https://ak-clearsummer.herokuapp.com/home/${Cookies.get('session_id')}`, {
            method: 'GET',
            headers: {
                "accepts": "application/json",
                'Content-Type': 'application/json'
            }
        })
        .then(response => {return response.json()})
        .then(responseData => {
            setNumSalesGoal(responseData[2].join());
            setIncomeTotal(responseData[0].join());
            setStartDate(new Date(responseData[6]));
            setEndDate(new Date(responseData[7]));
            setCommissionPercentage(responseData[5].join());

        })
        .catch(err => {console.log(err)})

        

    }, [])
    

    const handleSubmit = () => {
        event.preventDefault();

        fetch(`https://ak-clearsummer.herokuapp.com/settings/${Cookies.get('session_id')}`, {
            method: 'PUT',
            headers: {
                "accepts": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                start_date: startDate,
                end_date: endDate,
                num_sales_goal: numSalesGoal,
                income_total: incomeTotal,
                commission_percentage: commissionPercentage
            })
        })
        .then(response => {return response.json();})
        .then(responseData => {
            console.log(responseData)
            return responseData
        })
        .catch(err => {
            console.log(err)
        })
        
    }

        return (
            <div className='settings-wrapper'>
                <form onSubmit={handleSubmit}>
                        {errorText !== "" ? <div id="error">{errorText}</div> : <div id ='error'></div>}
                       {console.log(startDate, endDate, numSalesGoal, incomeTotal, commissionPercentage)}
                        <div className="settings-date-picker-forms">
                            <DatePicker
                                className="settings-datepicker"
                                selected={startDate}
                                onChange={date => {
                                    setStartDate(date)
                                    setErrorText("")
                                }}
                            />
                            <DatePicker
                                className="settings-datepicker"
                                selected={endDate}
                                onChange={date => {
                                    setEndDate(date)
                                    setErrorText("")
                                }}
                            />      
                        </div>

                        
                        <div className="settings-select-forms">
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
                        
                        <div className = "settings-commission-form">
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
                                        
                        <button type="submit" id="settings-button" style={password != "" && commissionPercentage != null ? {backgroundColor: '#3D9160', color: '#012154'} : null} >Apply</button>

                    </form>
            </div>
        )
}

export default withRouter(Settings);