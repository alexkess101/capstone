import React, { useState, useEffect } from 'react';

const HomePage = (props) => {
    


    useEffect(() => {
        if (props.loggedInStatus === "NOT_LOGGED_IN") {
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