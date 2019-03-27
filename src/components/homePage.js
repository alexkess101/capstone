import React, { useState, useEffect } from 'react';

const HomePage = (props) => {
    useEffect(() => {
        if (props.loggedInStatus === "NOT_LOGGED_IN") {
            props.history.push('/login')
        }
    })

    return (
        <div>
            <h1>Hello world</h1>

        </div>
    );
}

export default HomePage;