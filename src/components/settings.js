import React, {Component, useState} from 'react';
import { withRouter } from 'react-router';

const Settings = () => {



        return (
            <div className='settings-wrapper'>
                <form onSubmit={}>
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
        )
    
}

export default withRouter(settings);