import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { TimelineLite } from "gsap/all";



export default class HomePage extends Component{
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            valueArray: [],
            startDate: "",
            endDate: "",
            avgContractValue: "",
            commission: '',
            salesPerDay: ''
        }

        this.logout = this.logout.bind(this);
        this.salesPerDay = this.salesPerDay.bind(this);
        this.average = this.average.bind(this);
    }

    componentDidMount(){

        fetch(`http://localhost:5000/home/${Cookies.get('session_id')}`, {
            method: 'GET',
            headers: {
                "accepts": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(result => {return result.json()})
        .then(resultData => {
        
            this.setState({
                data: resultData,
                valueArray: resultData[4],
                startDate: resultData[6],
                endDate: resultData[7],
                commission: resultData[5]
            })
            this.average();
            this.salesPerDay();
        })

            
        .catch(err => {console.log(err)})

        let t1 = new TimelineLite();

        if (Cookies.get('session') === 'LOGGED_IN') {
            this.props.history.push(`/home/${Cookies.get('session_id')}`)
        }

        t1.to('.left-column', 0.5, {x:200, opacity:1});
       
        
    }


    average() {
        let newArray = [];
        let sum = 0;
        this.state.valueArray.map(value => { newArray = [...newArray, ...value] })
        for (let i = 0; i < newArray.length; i++) {
            sum += parseInt(newArray[i])
        }
        let average = Math.floor(sum / newArray.length)
        
        this.setState({
            avgContractValue: average
        })
    }
   logout(){
        this.props.handleUserLogout();
        this.props.history.push('/');
    }


    salesPerDay() {
        let avg = this.state.avgContractValue;
        let commission = this.state.commission[0];
        let toGo = this.state.data[0] - this.state.data[1];
        let daysLeft = Math.floor((Date.parse(this.state.endDate[0]) - Date.parse(new Date())) / 86400000);
        let perSaleValue = 0;
        let salesNeeded = 0;
        let salesPerDay = 0;
        if (Date.parse(this.state.startDate[0]) > Date.parse(new Date())) {
            daysLeft = (Date.parse(this.state.endDate[0]) - Date.parse(this.state.startDate[0])) / 86400000;
        }
        perSaleValue = Math.round(avg * commission);

        salesNeeded = Math.round(toGo / perSaleValue);
        salesPerDay = salesNeeded / daysLeft;
        console.log(salesNeeded, daysLeft, parseFloat(salesPerDay.toFixed(2)));
        this.setState({
            salesPerDay: parseFloat(salesPerDay.toFixed(2))
        })

    }

    render() {
        return (
            <div className="homepage">
                <div className="left-column">
                    <div className="user-info">
                        <i class="fas fa-user"></i>
                    </div>
                    <div className="user-email">Welcome {Cookies.get('session_email')}</div>
                    <div className="nav-links">
                        
                        <NavLink to={`/home/${Cookies.get('session_id')}`} className="column-link">DASHBOARD</NavLink>
                        <NavLink to={`/about_us/${Cookies.get('session_id')}`} className="column-link">ABOUT US</NavLink>
                        <NavLink to={`/settings/${Cookies.get('session_id')}`} className="column-link bottom-link">SETTINGS</NavLink>

                    </div>
                    
                    <button onClick={this.logout} className="logout-button">Logout</button>
                </div>
                
                <div className="right-column">
                    <div className="tablet-wrapper">
                        <div className="tablet progress-tablet">
                            <h3>Sales Goal: {this.state.data[0]}</h3>
                            <h3>Current Sales: {this.state.data[1]}</h3>
                        
                        </div>
                    </div>
                    <div className="tablet-wrapper">
                        <div className="tablet sales-tablet">
                            <h3>Goal: {this.state.data[2]}</h3>
                            <h3>Current income: {this.state.data[3]}</h3>


                            <NavLink to={`/home/${Cookies.get('session_id')}/view_sales`}>Click Here to view all your sales</NavLink>
                            <NavLink to={`/home/${Cookies.get('session_id')}/create_sale`}>Click Here to Add sale</NavLink>

                        </div>
                    </div>
                    <div className="tablet-wrapper">
                        <div className="tablet contract-value-tablet">
                            <h3>Average contract value: {this.state.avgContractValue}</h3>
                        </div>
                    </div>
                    
                    <div className="tablet-wrapper">
                        <div className="tablet motivator-tablet">
                        <h3>Sales per day to reach goal: {this.state.salesPerDay}</h3>
                        </div>
                    </div>

                </div>      
            </div>
        );
    }
}
