import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom';
import Axios from 'axios';


const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        }).then((res) => console.log(res));
    };


    return (
        <>

            <div>
                <h1>Login</h1>
                <input
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={register}>Submit</button>
            </div>

        </>
    )
}
export default RegisterPage;
