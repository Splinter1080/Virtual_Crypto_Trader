import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { makeStyles } from '@mui/material';
import Navbar from '../components/Navbar';
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const [LoginUsername, setLoginUsername] = useState("");
    const [email, setEmail] = useState("");
    const [LoginPassword, setLoginPassword] = useState("");
    const [username, setUserName] = useState(null);
    const [loginFlag, setLoginFlag] = useState(false);
    const history = useHistory();
    const login = () => {
        Axios({
            method: "POST",
            data: {
                username: LoginUsername,
                password: LoginPassword,
            },
            withCredentials: true,
            url: "http://localhost:5000/login",
        }).then((res) => {
            console.log(res.data);
            setUserName(res.data.username);
            setLoginFlag(true);
        });
    };

    return (
        <>
            <Navbar />
            <div className='container'>
                {
                    loginFlag &&
                    <div className='alert alert-success' role='alert'>
                        <h4 className='alert-heading'>Login Successful!</h4>
                        <p>Welcome {username}</p>
                        <hr />
                        <p className='mb-0'>Click Here to go <a href="/">HOME PAGE!</a></p>
                    </div>

                }
                {
                    !loginFlag &&
                    <div className="col-6" style={{ alignItems: 'center' }}>
                        <h1 className='row postion-absolute ' style={{ color: 'rgb(118,185,0)' }}>Login</h1>

                        <div className="row" style={{ marginTop: '70px' }}></div>
                        <input
                            className='row '
                            placeholder="username"
                            style={{ textAlign: 'center', alignItems: 'center' }}
                            onChange={(e) => setLoginUsername(e.target.value)}
                        />
                        <div className="row" style={{ marginTop: '20px' }}></div>
                        <input
                            className='row'
                            placeholder="password"
                            style={{ textAlign: 'center', alignItems: 'center' }}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <div className="row" style={{ marginTop: '20px' }}></div>
                        <button className='row' onClick={login}>Submit</button>
                    </div>
                }

            </div>
        </>
    )
}
export default LoginPage;
