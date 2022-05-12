import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { makeStyles } from '@mui/material';
import Navbar from '../components/Navbar';


const LoginPage = () => {
    const [LoginUsername, setLoginUsername] = useState("");
    const [email, setEmail] = useState("");
    const [LoginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);
    const login = () => {
        Axios({
            method: "POST",
            data: {
                username: LoginUsername,
                password: LoginPassword,
            },
            withCredentials: true,
            url: "http://localhost:5000/login",
        }).then((res) => console.log(res));
    };
    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/user",
        }).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    };

    return (
        <>
            <Navbar />
            <div className='container position-relative'>
                <div className="col " style={{ alignItems: 'center' }}>
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
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <div className="row" style={{ marginTop: '20px' }}></div>
                    <button className='row' onClick={login}>Submit</button>
                </div>
            </div>
        </>
    )
}
export default LoginPage;
