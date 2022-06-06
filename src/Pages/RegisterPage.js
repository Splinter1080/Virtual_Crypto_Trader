import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom';
import Axios from 'axios';
import NavbarComponent from '../components/NavbarComponent';
import { Container, Row, Col, Form, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { api } from '../config/api';

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerFlag, setRegisterFlag] = useState("");
    const [invalid, setInvalid] = useState(false);
    const register = () => {
        try {
            Axios({
                method: "POST",
                data: {
                    username: username,
                    password: password,
                    email: email
                },
                withCredentials: true,
                url: api.registerPost,
            }).then((res) => {
                setInvalid(false);
                setUsername("");
                setPassword("");
                setEmail("");
                console.log(res.data);
                setRegisterFlag(true);
            }).catch((err) => {
                setInvalid(true);
                console.log("HELLO", err);
            });
        }
        catch (err) {
            setInvalid(true);
            console.log(err);
        }
    };

    return (
        <>
            <NavbarComponent />
            <br /><br />
            <Container style={{ width: "500px" }}>
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
                    <Card className="text-center bg-dark border-light text-white justify-content-center" >
                        <Card.Header className="bg-transparent border-light" style={{ fontWeight: "bold", fontSize: "50px", color: 'rgb(118,185,0)' }}>Register</Card.Header>
                        <Card.Body className="bg-transparent border-light" >
                            <Form>
                                <Form.Group className="mb-3 mx-3 justify-content-center" controlId="formGroupEmail">
                                    <Form.Label>USERNAME</Form.Label>
                                    <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3 mx-3 justify-content-center" controlId="formGroupPassword">
                                    <Form.Label>PASSWORD</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3 mx-3 justify-content-center" controlId="formGroupPassword">
                                    <Form.Label>EMAIL</Form.Label>
                                    <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>
                                <Button variant="success" onClick={register}>Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                }
            </Container>
            {
                invalid &&
                <div className='alert alert-danger' role='alert'>
                    <h4 className='alert-heading'>User Already Exists!</h4>
                    <p className='mb-0'>Try Again</p>
                </div>
            }
        </>

    )
}
export default RegisterPage;
