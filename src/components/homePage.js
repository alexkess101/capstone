import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { TimelineMax, CSSPlugin, ScrollToPlugin, Draggable, TimelineLite } from "gsap/all";

const HomePage = (props) => {
    useEffect(() => {
        let t1 = new TimelineLite();
        
        console.log(Cookies.get('session'))
        if (Cookies.get('session') === 'LOGGED_IN') {
            props.history.push('/home')
        }

        // t1.to('.button', 1, {x:100, attr:{width:300}});
    }, [])

    const logout = () => {
        props.handleUserLogout();
        props.history.push('/');
    }

    return (
        <div>
            <h1>Hello world</h1>
            


            <button onClick={logout} className="button">logout</button>
        </div>
    );
}

export default HomePage;