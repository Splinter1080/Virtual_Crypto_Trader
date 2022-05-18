import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function Navbar() {
    const [username, setUsername] = useState(null);
    const [loginFlag, setLoginFlag] = useState(false);
    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/user",
        }).then((res) => {
            if (res.data.loggedIn) {
                setUsername(res.data.username);
                setLoginFlag(true);
            }
            else {
                setLoginFlag(false);
            }
        });
    };
    useEffect(() => {
        getUser();
    }, [loginFlag]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand active" href="/"><h1 style={{ color: 'rgb(118, 185, 0)', textAlign: 'center' }}>Virtual Trader</h1></a>
                <button className="navbar-toggler" type="button" databstoggle="collapse" databstarget="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" aria-current="page" href="/marketplace">MarketPlace</a>
                        <a className="navbar-nav nav nav-link float-end" href="/leaderboard">Leaderboard</a>
                        {
                            !loginFlag &&
                            <div className="navbar-nav">
                                <a className="nav-link" href="/login">Login</a>
                                <a className="navbar-nav nav nav-link float-end" href="/register">Register</a>
                            </div>
                        }
                        {
                            loginFlag &&
                            <div className="navbar-nav">
                                <a className="navbar-nav nav nav-link float-end" href="http://localhost:5000/logout">Logout</a>
                                <a href="/profile" className="nav-link"><h2 style={{ color: 'rgb(118, 185, 0)', textAlign: 'center' }}>{username.toUpperCase()}</h2></a>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar