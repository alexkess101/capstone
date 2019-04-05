import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { TimelineMax, CSSPlugin, ScrollToPlugin, Draggable, TimelineLite } from "gsap/all";
import axios from 'axios';

const HomePage = (props) => {
    const [data, setData] = useState({ hits: [] });

    useEffect(() => {
        const fetchData = async () =>{
            const result = await fetch(`http://localhost:5000/home/${Cookies.get('session_id')}`, {
                method: 'GET',
                headers: {
                    "accepts": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(result => {return result.json()})
            .then(resultData => {setData(resultData.data); console.log(data, resultData)})
            .catch(err => {console.log(err)})
        }
        
        fetchData();
        

        let t1 = new TimelineLite();

        if (Cookies.get('session') === 'LOGGED_IN') {
            props.history.push(`/home/${Cookies.get('session_id')}`)
        }

        t1.to('.left-column', 0.5, {x:200, opacity:1});
    }, [])

    const logout = () => {
        props.handleUserLogout();
        props.history.push('/');
    }

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
                
                <button onClick={logout} className="logout-button">Logout</button>
            </div>
            
            <div className="right-column">
                <div className="tablet-wrapper">
                    <div className="tablet progress-tablet">
                    
                    </div>
                </div>
                <div className="tablet-wrapper">
                    <div className="tablet sales-tablet">
                    
                    </div>
                </div>
                <div className="tablet-wrapper">
                    <div className="tablet contract-value-tablet">
                    
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

export default HomePage;