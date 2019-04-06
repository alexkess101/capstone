import React, { useState, useEffect, Component } from 'react';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { TimelineMax, CSSPlugin, ScrollToPlugin, Draggable, TimelineLite } from "gsap/all";
import axios from 'axios';


export default class HomePage extends Component{
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            valueArray: []
        }

        this.logout = this.logout.bind(this);
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
        .then(resultData => {console.log(resultData); this.setState({data:resultData}); this.setState({valueArray: resultData[4]})})
        .catch(err => {console.log(err)})

        let t1 = new TimelineLite();

        if (Cookies.get('session') === 'LOGGED_IN') {
            this.props.history.push(`/home/${Cookies.get('session_id')}`)
        }

        t1.to('.left-column', 0.5, {x:200, opacity:1});
    }

   logout(){
        this.props.handleUserLogout();
        this.props.history.push('/');
    }

    average(data) {
        let newArray = []
        let sum = 0;
        data.map(value => { newArray = [...newArray, ...value] })
        for (let i = 0; i < newArray.length; i++) {
            sum += newArray[i]
        }
        return Math.floor(sum / newArray.length)
        
        
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
                        
                        <NavLink to="/home" className="column-link">DASHBOARD</NavLink>
                        <NavLink to="#" className="column-link">ABOUT US</NavLink>
                        <NavLink to="#" className="column-link bottom-link">SETTINGS</NavLink>
                        
                        
                    </div>
                    
                    <button onClick={this.logout} className="logout-button">Logout</button>
                </div>
                
                <div className="right-column">
                    <div className="tablet-wrapper">
                        <div className="tablet progress-tablet">
                            <h3>{this.state.data[0]}</h3>
                            <h3>{this.state.data[1]}</h3>
                        
                        </div>
                    </div>
                    <div className="tablet-wrapper">
                        <div className="tablet sales-tablet">
                            <h3>{this.state.data[2]}</h3>
                            <h3>{this.state.data[3]}</h3>

                        </div>
                    </div>
                    <div className="tablet-wrapper">
                        <div className="tablet contract-value-tablet">
                            <h3>{this.average(this.state.valueArray)}</h3>
                        </div>
                    </div>
                    
                    <div className="tablet-wrapper">
                        <div className="tablet motivator-tablet">
                        
                        </div>
                    </div>

                </div>      
            </div>
        );
    }
}






// const HomePage = (props) => {
//     const [data, setData] = useState({ hits: [] });

//     useEffect(() => {
//         const fetchData = async () =>{
//             const result = await fetch(`http://localhost:5000/home/${Cookies.get('session_id')}`, {
//                 method: 'GET',
//                 headers: {
//                     "accepts": "application/json",
//                     "Content-Type": "application/json"
//                 }
//             })
//             .then(result => {return result.json()})
//             .then(resultData => {setData(resultData); console.log(data, resultData)})
//             .catch(err => {console.log(err)})
//         }
        
//         fetchData();
        

//         let t1 = new TimelineLite();

//         if (Cookies.get('session') === 'LOGGED_IN') {
//             props.history.push(`/home/${Cookies.get('session_id')}`)
//         }

//         t1.to('.left-column', 0.5, {x:200, opacity:1});
//     }, [])

//     const logout = () => {
//         props.handleUserLogout();
//         props.history.push('/');
//     }

//     return (
//         <div className="homepage">
//             <div className="left-column">
//                 <div className="user-info">
//                     <i class="fas fa-user"></i>
//                 </div>
//                 <div className="user-email">Welcome {Cookies.get('session_email')}</div>
//                 <div className="nav-links">
                    
//                     <NavLink to="/home" className="column-link">DASHBOARD</NavLink>
//                     <NavLink to="#" className="column-link">ABOUT US</NavLink>
//                     <NavLink to="#" className="column-link bottom-link">SETTINGS</NavLink>
                    
                    
//                 </div>
                
//                 <button onClick={logout} className="logout-button">Logout</button>
//             </div>
            
//             <div className="right-column">
//                 <div className="tablet-wrapper">
//                     <div className="tablet progress-tablet">
                    
//                     </div>
//                 </div>
//                 <div className="tablet-wrapper">
//                     <div className="tablet sales-tablet">
                    
//                     </div>
//                 </div>
//                 <div className="tablet-wrapper">
//                     <div className="tablet contract-value-tablet">
                    
//                     </div>
//                 </div>
                
//                 <div className="tablet-wrapper">
//                     <div className="tablet motivator-tablet">
                    
//                     </div>
//                 </div>

//             </div>      
//         </div>
//     );
// }

// export default HomePage;