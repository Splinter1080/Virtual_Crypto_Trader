import React from 'react';
import { useEffect, useState } from "react";
import NavbarComponent from '../components/NavbarComponent';
import { Container, Row, Col, Form, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { api } from '../config/api';
const HomePage = () => {
    const [imgLink, setImgLink] = useState(api.homeImage);
    return (
        <Container>
            <NavbarComponent />
            <Container>
                <Row>
                    <Col>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Welcome to <p style={{ color: 'rgb(118, 185, 0)' }}>Virtual Trader</p></h1>
                    </Col>
                </Row>
            </Container>
            <div className="card bg-dark" style={{ borderColor: "white" }}>
                <div className="row align-items-center">
                    <div className="col">
                        <img src={imgLink} className='rounded mx-auto d-block float-start' style={{ height: '400px', width: '400px', padding: "30px" }} alt="image-loading" />
                    </div>
                    <div className="col">
                        <p style={{ color: 'white', textAlign: 'center', padding: "30px" }}>
                            This is a virtual trading platform where you can trade your crypto coins.
                            You can buy and sell or hodl your coins and track your portfolio.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginTop: '50px' }}></div>
            <div className="card bg-dark" style={{ borderColor: "white" }}>
                <div className="row">
                    <div className="col -8">
                        <h2 style={{ textAllign: 'center', color: 'white', padding: "30px" }}>VISIT MARKETPLACE NOW!
                            AND BUY YOUR FAVORTITE COINS WITH VIRTUAL MONEY</h2>
                    </div>
                    <div className='col-4'>
                        <a href="/marketplace" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-success" style={{ padding: "30px", margin: 'auto', marginTop: '20px', textAlign: 'center' }}>
                                Visit Marketplace
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginTop: '50px' }}></div>
            <div className='container'>
                <div className='row'>
                    <div className='card bg-dark' style={{ borderColor: "white" }}>
                        <h1 style={{ color: 'white', textAlign: 'center', padding: "30px" }}>What is Crypto?</h1>
                        <p style={{ color: 'white', textAlign: 'center', padding: "30px" }}> A cryptocurrency, crypto-currency, crypto, or coin is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it. Individual coin ownership records are stored in a digital ledger, which is a computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership. Despite their name, cryptocurrencies are not considered to be currencies in the traditional sense and while varying treatments have been applied to them, including classification as commodities, securities, as well as currencies, cryptocurrencies are generally viewed as a distinct asset class in practice.</p>
                    </div>
                </div>
            </div>
        </Container>

    );
};

export default HomePage;