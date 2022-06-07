import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { makeStyles } from '@mui/material';
import NavbarComponent from '../components/NavbarComponent';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { api } from '../config/api';
const LoginPage = () => {
    const [LoginUsername, setLoginUsername] = useState("");
    const [email, setEmail] = useState("");
    const [LoginPassword, setLoginPassword] = useState("");
    const [username, setUserName] = useState(null);
    const [loginFlag, setLoginFlag] = useState(false);
    const history = useHistory();
    const login = () => {
        try {
            Axios({
                method: "POST",
                data: {
                    username: LoginUsername,
                    password: LoginPassword,
                },
                withCredentials: true,
                url: api.loginPost,
            }).then((res) => {
                setLoginUsername("");
                setLoginPassword("");
                localStorage.setItem("userId", res.data._id);
                localStorage.setItem("name", res.data.username);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("loggedIn", true);
                console.log(res.data);
                setUserName(res.data.username);
                setLoginFlag(true);
            }).catch((err) => {
                console.log("HELLO", err);
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <NavbarComponent />
            <br /><br />
            <Container style={{ width: "450px" }}>
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
                    <>
                        <Card className="text-center bg-dark border-light text-white justify-content-center" >
                            <Card.Header className="bg-transparent border-light" style={{ fontWeight: "bold", fontSize: "50px", color: 'rgb(118,185,0)' }}>Login</Card.Header>
                            <Card.Body className="bg-transparent border-light" >
                                <Form>
                                    <Form.Group className="mb-3 mx-3 justify-content-center" controlId="formGroupEmail">
                                        <Form.Label>USERNAME</Form.Label>
                                        <Form.Control type="username" placeholder="Enter username" onChange={(e) => setLoginUsername(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3 mx-3 justify-content-center" controlId="formGroupPassword">
                                        <Form.Label>PASSWORD</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} required />
                                    </Form.Group>
                                    <Button variant="success" onClick={login}>Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </>
                }
            </Container>
        </>
    )
}
export default LoginPage;
