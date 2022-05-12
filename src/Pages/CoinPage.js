import React from 'react';
import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import { Button, Row } from 'react-bootstrap';
import CoinInfo from '../components/CoinInfo';
import Navbar from '../components/Navbar';

const CoinPage = () => {
    const history = useHistory();
    const { CoinName } = useParams();
    //console.log(history.location.pathname, CoinName);
    const currency = "USD";
    const [coin, setCoin] = useState();
    const [flag, setFlag] = useState(false);
    const [investedAmount, setInvestedAmount] = useState(0);
    const [investedValue, setInvestedValue] = useState(0);
    const [sellMoney, setSellMoney] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);
    const handleBuyClick = async () => {
        console.log(investedValue / coin.market_data.current_price.usd, CoinName, investedValue, parseInt(coin.market_data.current_price.usd));
        axios({
            method: "POST",
            data: {
                amount: investedValue / coin.market_data.current_price.usd,
                coinName: CoinName,
                investedValue: investedValue,
                price: parseInt(coin.market_data.current_price.usd),
            },
            withCredentials: true,
            url: "http://localhost:5000/buy",
        }).then((res) => console.log(res));

    }
    const handleSellClick = async () => {
        //console.log(coin.market_data.current_price.usd);
        axios({
            method: "POST",
            data: {
                amount: sellMoney / coin.market_data.current_price.usd,
                coinName: CoinName,
                sellMoney: sellMoney,
                price: parseInt(coin.market_data.current_price.usd),
            },
            withCredentials: true,
            url: "http://localhost:5000/sell",
        }).then((res) => console.log(res));

    }
    const handleDetailClick = async () => {
        //console.log("Getting details");
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/assets",
        }).then((res) => {
            console.log(res.data);
        });
    }

    const fetchCoin = async () => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${CoinName}`)
            .catch((err) => {
                console.log(err);
            });

        setCoin(data);
        setFlag(true);
        //console.log(data);   // data of coin
    }
    useEffect(() => {
        fetchCoin();
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            fetchCoin();
        }, 5000)

        return () => clearInterval(intervalId); //This is important
    }, []);


    return (

        <div className='conatainer position-relative'>
            <Navbar />

            {
                flag &&
                <>
                    <div className='conatiner position-relative'>

                        <div className='row' style={{ width: '100%' }}>
                            <h1 style={{ color: 'rgb(118, 185, 0)', textAlign: 'center' }}>
                                <img className='img-fluid' style={
                                    { width: '65px', height: '65px', marginRight: '8px' }
                                } src={coin.image.large} alt={CoinName} />
                                {CoinName.toUpperCase()}<h3 style={{ color: 'wheat', textAlign: 'center' }}>Price : ${coin.market_data.current_price.usd}</h3>
                            </h1>
                        </div>
                        <div className='row position-relative' style={{ width: '100%' }}>
                            <div className='col-2' style={{ marginLeft: "50px" }}>
                                <div className='row'>
                                    <h1 style={{ color: 'green' }}>Buy</h1>
                                    <input
                                        placeholder={investedAmount || "Amount"}
                                        onChange={(e) => {
                                            setInvestedAmount(e.target.value);
                                            setInvestedValue(e.target.value * coin.market_data.current_price.usd);
                                        }}
                                    />
                                    <input
                                        placeholder={investedValue || "Value in $"}
                                        onChange={(e) => {
                                            setInvestedValue(e.target.value);
                                            setInvestedAmount(e.target.value / coin.market_data.current_price.usd);
                                        }}
                                    />
                                    <button className='btn btn-secondary' onClick={handleBuyClick}>Buy</button>
                                </div>
                                <div className='row'>
                                    <h1 style={{ color: 'rgb(252, 27, 32)' }}>Sell</h1>
                                    <input
                                        placeholder={sellAmount || "Amount"}
                                        onChange={(e) => {
                                            setSellAmount(e.target.value)
                                            setSellMoney(e.target.value * coin.market_data.current_price.usd);
                                        }}
                                    />
                                    <input
                                        placeholder={sellMoney || "Value in $"}
                                        onChange={(e) => {
                                            setSellMoney(e.target.value);
                                            setSellAmount(e.target.value / coin.market_data.current_price.usd);
                                        }}
                                    />
                                    <button className='btn btn-secondary' onClick={handleSellClick}>Sell</button>
                                </div>
                            </div>
                            <div className='col-9' >
                                <div style={{ marginTop: '20px' }}>
                                    <CoinInfo Coin={CoinName} style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                flag &&
                <div>
                    <h1>Get Details</h1>
                    <button onClick={handleDetailClick}>Get Details</button>
                </div>
            }

        </div>

    )
}
export default CoinPage;
