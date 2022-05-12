import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';

const HomePage = () => {
    const [imgLink, setImgLink] = useState('https://www.thebalance.com/thmb/rGYupd8oJE9RBXD2y7KM2X5vOLM=/5000x3400/filters:fill(auto,1)/technical-financial-graph-on-technology-abstract-background-926051128-5aa5794fae9ab80037388c0c.jpg');
    return (
        <div className='container'>
            <Navbar />
            <div className='container'>
                <div className='row '>
                    <div className='col'>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Welcome to <p style={{ color: 'rgb(118, 185, 0)' }}>Virtual Trader</p></h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <img src={imgLink} className='rounded mx-auto d-block float-start' style={{ height: '400px', width: '400px' }} alt="image-loading" />
                    </div>
                    <div className="col">
                        <p style={{ color: 'white', textAlign: 'center' }}>
                            This is a virtual trading platform where you can trade your crypto coins.
                            You can buy and sell or hodl your coins and track your portfolio.
                        </p>
                    </div>
                </div>
            </div>
            <div className="conatiner">
                <div className="row">
                    <div className="col -8">
                        <h2 style={{ textAllign: 'center', color: 'white' }}>VISIT MARKETPLACE NOW!
                            AND BUY YOUR FAVORTITE COINS WITH VIRTUAL MONEY</h2>
                    </div>
                    <div className='col-4'>
                        <a href="/marketplace" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-success" style={{ margin: 'auto', marginTop: '20px', textAlign: 'center' }}>
                                Visit Marketplace
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>What is Crypto?</h1>
                        <p style={{ color: 'white', textAlign: 'center' }}> A cryptocurrency, crypto-currency, crypto, or coin is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it. Individual coin ownership records are stored in a digital ledger, which is a computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership. Despite their name, cryptocurrencies are not considered to be currencies in the traditional sense and while varying treatments have been applied to them, including classification as commodities, securities, as well as currencies, cryptocurrencies are generally viewed as a distinct asset class in practice.</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HomePage;