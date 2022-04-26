import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { makeStyles } from '@mui/material';


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

            <div>
                <h1>Login</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={login}>Submit</button>
            </div>
            <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
                {data ? <h1>Welcome Back {data.username}</h1> : null}
            </div>
        </>
    )
}
export default LoginPage;
