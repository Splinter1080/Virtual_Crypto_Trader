import React from 'react';
import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import { Button, Row } from 'react-bootstrap';
import CoinInfo from '../components/CoinInfo';
import Navbar from '../components/Navbar';
import OrderList from '../components/OrderList';
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
    const [tradeType, setTradeType] = useState("Market");
    const [orders, setOrders] = useState([]);
    const [limitPrice, setLimitPrice] = useState(0);
    const handleBuyClick = async () => {
        //console.log(investedValue / coin.market_data.current_price.usd, CoinName, investedValue, parseInt(coin.market_data.current_price.usd));
        if (tradeType == "Market" || (tradeType == "Limit" && limitPrice >= coin.market_data.current_price.usd)) {
            axios({
                method: "POST",
                data: {
                    amount: investedValue / coin.market_data.current_price.usd,
                    coinName: CoinName,
                    investedValue: investedValue,
                    price: parseInt(coin.market_data.current_price.usd),
                    timePlaced: new Date(),
                },
                withCredentials: true,
                url: "http://localhost:5000/buy",
            }).then((res) => console.log(res));
        }
        else if (tradeType == "Limit") {
            console.log("limit");
            axios({
                method: "POST",
                data: {
                    coinName: CoinName,
                    amount: investedAmount,
                    price: limitPrice,
                    investedValue: investedValue,
                    orderCompleted: false,
                    type: "Buy",
                    timePlaced: new Date(),
                    orderCompleted: false,
                },
                withCredentials: true,
                url: "http://localhost:5000/limit",
            })
        }
    }
    const handleSellClick = async () => {
        if (tradeType == "Market" || (tradeType == "Limit" && limitPrice <= coin.market_data.current_price.usd)) {
            axios({
                method: "POST",
                data: {
                    amount: sellMoney / coin.market_data.current_price.usd,
                    coinName: CoinName,
                    sellMoney: sellMoney,
                    price: parseInt(coin.market_data.current_price.usd),
                    timePlaced: new Date(),
                },
                withCredentials: true,
                url: "http://localhost:5000/sell",
            }).then((res) => console.log(res));
        }
        else if (tradeType == "Limit") {
            console.log("limit");
            axios({
                method: "POST",
                data: {
                    coinName: CoinName,
                    amount: investedAmount,
                    price: limitPrice,
                    investedValue: investedValue,
                    orderCompleted: false,
                    type: "Sell",
                    timePlaced: new Date(),
                    orderCompleted: false,
                },
                withCredentials: true,
                url: "http://localhost:5000/limit",
            })
        }
    }
    const handleDetailClick = async () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:5000/limit/${CoinName}`,
        }).then((res) => {
            setOrders(res.data);
            console.log(res.data);
            console.log(orders);
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
                                <h4 style={{ color: "wheat" }}>Trade Type</h4>
                                <div className="row">
                                    <div className="d-flex" style={{ width: "80%", float: "center" }}>
                                        <h3>
                                            Trade Type
                                        </h3>
                                        <select className="form-control mr-2 gold" onChange={type => setTradeType(type.target.value)}>
                                            <option value="Market" >Market</option>
                                            <option value="Limit">Limit</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row'>
                                    <h1 style={{ color: 'green' }}>Buy</h1>
                                    {
                                        tradeType == "Limit" &&
                                        <>
                                            <h5 style={{ color: "wheat" }}>LIMIT PRICE</h5>
                                            <input type="number" className="form-control" placeholder="Limit Price" onChange={(e) => setLimitPrice(e.target.value)} />
                                        </>
                                    }
                                    <h5 style={{ color: "wheat" }}>AMOUNT</h5>
                                    <input
                                        placeholder="Amount"
                                        value={investedAmount}
                                        onChange={(e) => {
                                            if (tradeType == "Limit") {
                                                setInvestedAmount(e.target.value);
                                                setInvestedValue(e.target.value * limitPrice);
                                            }
                                            else {
                                                setInvestedAmount(e.target.value);
                                                setInvestedValue(e.target.value * coin.market_data.current_price.usd);
                                            }

                                        }}
                                    />
                                    <h5 style={{ color: "wheat" }}>TOTAL USD</h5>
                                    <input
                                        placeholder="Value in $"
                                        value={investedValue}
                                        onChange={(e) => {
                                            if (tradeType == "Limit") {
                                                setInvestedValue(e.target.value);
                                                setInvestedAmount(e.target.value / limitPrice);
                                            }
                                            else {
                                                setInvestedValue(e.target.value);
                                                setInvestedAmount(e.target.value / coin.market_data.current_price.usd);
                                            }
                                        }}
                                    />
                                    <button className='btn btn-secondary' onClick={handleBuyClick}>Buy</button>
                                </div>
                                <div className='row'>
                                    <h1 style={{ color: 'rgb(252, 27, 32)' }}>Sell</h1>
                                    {
                                        tradeType == "Limit" &&
                                        <>
                                            <h5 style={{ color: "wheat" }}>LIMIT PRICE</h5>
                                            <input type="number" className="form-control" placeholder="Limit Price" onChange={(e) => setLimitPrice(e.target.value)} />
                                        </>
                                    }
                                    <h5 style={{ color: "wheat" }}>AMOUNT</h5>
                                    <input
                                        placeholder="Amount"
                                        value={sellAmount}
                                        onChange={(e) => {
                                            if (tradeType == "Limit") {
                                                setSellAmount(e.target.value)
                                                setSellMoney(e.target.value * limitPrice);
                                            }
                                            else {
                                                setSellAmount(e.target.value)
                                                setSellMoney(e.target.value * coin.market_data.current_price.usd);
                                            }
                                        }}
                                    ></input>
                                    <h5 style={{ color: "wheat" }}>TOTAL USD</h5>
                                    <input
                                        placeholder="Value in $"
                                        value={sellMoney}
                                        onChange={(e) => {
                                            if (tradeType == "Limit") {
                                                setSellMoney(e.target.value)
                                                setSellAmount(e.target.value / limitPrice);
                                            }
                                            else {
                                                setSellMoney(e.target.value);
                                                setSellAmount(e.target.value / coin.market_data.current_price.usd);
                                            }

                                        }}
                                    >
                                    </input>
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
                <div className='col' style={{ textAllign: "center", width: "300px" }}>
                    <button className='btn btn-secondary' onClick={handleDetailClick} >Get Limit Order Details</button>
                </div>
            }
            <div className='container' style={{ width: "100%" }}>
                {
                    orders && orders.length > 0 &&
                    orders.map((order) => (
                        <div class="row ">
                            <div class="col">
                                <div class="p-3 border bg-dark">
                                    <div className='row'>
                                        <p className='col text-decoration-none' style={{ color: 'rgb(118, 185, 0)', textTransform: 'capitalize' }} >
                                            Amount-{order.amount}
                                        </p>
                                        <div className='col' style={{ color: 'white' }}>
                                            Price-${order.price}
                                        </div>
                                        <div className='col' style={{ color: 'white' }}>
                                            Money-${order.investedValue}
                                        </div>
                                    </div>
                                </div>
                                <div className='margin-top' style={
                                    { marginTop: '10px' }
                                }></div>
                            </div>

                        </div>
                    ))
                }
            </div>

        </div>

    )
}
export default CoinPage;
