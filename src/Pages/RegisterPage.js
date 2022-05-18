import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Navbar from '../components/Navbar';


const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerFlag, setRegisterFlag] = useState("");
    const register = () => {
        Axios({
            method: "POST",
            data: {
                username: username,
                password: password,
                email: email
            },
            withCredentials: true,
            url: "http://localhost:5000/register",
        }).then((res) => { console.log(res); setRegisterFlag(true) });
    };


    return (
        <>
            <Navbar />
            <div className='container'>
                {
                    registerFlag &&
                    <div className='alert alert-success' role='alert'>
                        <h4 className='alert-heading'>Registration Successful!</h4>
                        <p>Welcome {username}</p>
                        <hr />
                        <p className='mb-0'>Click Here to go <a href="/login">LOGIN PAGE!</a></p>
                    </div>
                }
                {
                    !registerFlag &&
                    <div className="col-6" style={{ alignItems: 'center' }}>
                        <h1 className='row postion-absolute ' style={{ color: 'rgb(118,185,0)' }}>Login</h1>

                        <div className="row" style={{ marginTop: '70px' }}></div>
                        <input
                            className='row '
                            placeholder="username"
                            style={{ textAlign: 'center', alignItems: 'center' }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="row" style={{ marginTop: '20px' }}></div>
                        <input
                            className='row'
                            placeholder="password"
                            style={{ textAlign: 'center', alignItems: 'center' }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="row" style={{ marginTop: '20px' }}></div>
                        <input
                            className='row'
                            placeholder="email"
                            style={{ textAlign: 'center', alignItems: 'center' }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="row" style={{ marginTop: '20px' }}></div>
                        <button className='row' onClick={register}>Submit</button>
                    </div>
                }
            </div>

        </>

    )
}
export default RegisterPage;
