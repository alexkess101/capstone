import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


const HomePage = (props) => {



    useEffect(() => {
        console.log(Cookies.get('session'))
        if (Cookies.get('session') !== 'LOGGED_IN') {
            props.history.push('/login')
        }
    })

    const logout = () => {
        props.handleUserLogout();
    }

    return (
        <div>
            <h1>Hello world</h1>
            


            <button onClick={logout}>logout</button>
        </div>
    );
}

export default HomePage;