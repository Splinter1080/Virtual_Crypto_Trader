import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import CoinInfo from '../components/CoinInfo';
import NavbarComponent from '../components/NavbarComponent';
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { api } from '../config/api';

const CoinPage = () => {
    const history = useHistory();
    const { CoinName } = useParams();
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
                url: api.buyPost,
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
                url: api.limitPost,
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
                url: api.sellPost,
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
                url: api.limitPost,
            })
        }
    }
    const handleDetailClick = async () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: api.limitOrderGet + CoinName,
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

        <Container>
            <NavbarComponent />
            {
                flag &&
                <>
                    <Container>
                        <Row>
                            <h1 style={{ color: 'rgb(118, 185, 0)', textAlign: 'center' }}>
                                <img className='img-fluid' style={
                                    { width: '65px', height: '65px', marginRight: '8px' }
                                } src={coin.image.large} alt={CoinName} />
                                {CoinName.toUpperCase()}<h3 style={{ color: 'wheat', textAlign: 'center' }}>Price : ${coin.market_data.current_price.usd}</h3>
                            </h1>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                <h4 style={{ color: "wheat" }}>Trade Type</h4>
                                <Row>
                                    <Form.Select onChange={type => setTradeType(type.target.value)} style={{ width: "250px" }}>
                                        <option value="Market">Market</option>
                                        <option value="Limit">Limit</option>
                                    </Form.Select>
                                </Row>
                                <br />
                                <Row>
                                    <h1 style={{ color: 'green' }}>Buy</h1>
                                    {
                                        tradeType == "Limit" &&
                                        <>
                                            <h5 style={{ color: "wheat" }}>LIMIT PRICE</h5>
                                            <InputGroup type="number" className="mb-1" placeholder="Limit Price" onChange={(e) => setLimitPrice(e.target.value)} style={{ width: "250px" }}>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <FormControl aria-label="Amount (to the nearest dollar)" />
                                            </InputGroup>
                                        </>
                                    }
                                </Row>
                                <br />
                                <Row>
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
                                        style={{ width: "250px", height: "40px" }}
                                    />
                                </Row>
                                <br />
                                <Row>
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
                                        }} style={{ width: "250px", height: "40px" }}
                                    />
                                    <Button variant="success" onClick={handleBuyClick} style={{ width: "100px", height: "40px" }}>Buy</Button>
                                </Row>
                                <br /><br />
                                <Row >
                                    <h1 style={{ color: 'rgb(252, 27, 32)' }}>Sell</h1>
                                    {
                                        tradeType == "Limit" &&
                                        <>
                                            <h5 style={{ color: "wheat" }}>LIMIT PRICE</h5>
                                            <InputGroup type="number" className="mb-1" placeholder="Limit Price" onChange={(e) => setLimitPrice(e.target.value)} style={{ width: "270px" }}>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <FormControl aria-label="Amount (to the nearest dollar)" />
                                            </InputGroup>
                                        </>
                                    }
                                    <Row>
                                        <h5 style={{ color: "wheat", marginTop: "25px" }}>AMOUNT</h5>
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
                                            }} style={{ width: "250px", height: "40px" }}
                                        ></input>
                                    </Row>
                                    <Row>
                                        <h5 style={{ color: "wheat", marginTop: "25px" }}>TOTAL USD</h5>
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
                                            }} style={{ width: "250px", height: "40px" }}
                                        ></input>
                                    </Row>
                                    <Button variant="danger" onClick={handleSellClick} style={{ width: "100px", height: "40px" }}>Sell</Button>
                                </Row>
                            </Col>
                            <Col sm={9} >
                                <div style={{ marginTop: '50px' }}>
                                    <CoinInfo Coin={CoinName} style={{ width: '100%' }} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </>
            }
            {
                flag &&
                <Container>
                    <br /><br />
                    <Button variant="info" onClick={handleDetailClick}>Get Limit Order Details</Button>
                </Container>
            }
            <Container>
                <br /><br />
                {
                    orders && orders.length > 0 &&
                    orders.map((order) => (
                        <Row>
                            <Col>
                                <div class="p-3 border bg-dark">
                                    <Row>
                                        <p className='col text-decoration-none' style={{ color: 'rgb(118, 185, 0)', textTransform: 'capitalize' }} >
                                            Amount-{order.amount}
                                        </p>
                                        <div className='col' style={{ color: 'white' }}>
                                            Price-${order.price}
                                        </div>
                                        <div className='col' style={{ color: 'white' }}>
                                            Money-${order.investedValue}
                                        </div>
                                    </Row>
                                </div>
                                <div className='margin-top' style={
                                    { marginTop: '10px' }
                                }></div>
                            </Col>
                        </Row>
                    ))
                }
            </Container>
        </Container>

    )
}
export default CoinPage;
