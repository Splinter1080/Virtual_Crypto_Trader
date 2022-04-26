import React from 'react';
import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import { Button, Row } from 'react-bootstrap';

const LoginPage = () => {
    const history = useHistory();
    const { CoinName } = useParams();
    //console.log(history.location.pathname, CoinName);
    const currency = "USD";
    const [coin, setCoin] = useState();
    const [flag, setflag] = useState(false);
    const [amount, setAmount] = useState(0);
    const [investedMoney, setInvestedMoney] = useState(0);
    const [sellMoney, setSellMoney] = useState(0);

    const handleBuyClick = async () => {
        console.log(coin.market_data.current_price.usd);
        axios({
            method: "POST",
            data: {
                amount: investedMoney / coin.market_data.current_price.usd,
                coinName: CoinName,
                investedMoney: investedMoney,
                price: parseInt(coin.market_data.current_price.usd),
            },
            withCredentials: true,
            url: "http://localhost:5000/buy",
        }).then((res) => console.log(res));

    }
    const handleSellClick = async () => {
        console.log(coin.market_data.current_price.usd);
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
        console.log("Getting details");
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
        setflag(true);
        //console.log(data);    data of coin
    }
    useEffect(() => {
        fetchCoin();
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            fetchCoin();
        }, 5000)

        return () => clearInterval(intervalId); //This is important
    }, []);


    return (
        <div >
            <Row className="mx-0">
                <Button variant="primary">Button #1</Button>
                <Button variant="secondary" className="mx-2">Button #2</Button>
                <Button variant="success">Button #3</Button>
            </Row>
            <h1>{CoinName}</h1>
            {
                flag &&
                <div>
                    <h3><a href={`/coin/${coin.id}`}> {coin.id}</a> - ${coin.market_data.current_price.usd} </h3>
                    {/* <img src={coin.image} alt={coin.id}  /> */}
                </div>
            }
            {
                <div>
                    <h1>Buy</h1>
                    <input
                        placeholder="investedMoney"
                        onChange={(e) => setInvestedMoney(e.target.value)}
                    />
                    <button onClick={handleBuyClick}>Submit</button>
                </div>
            }
            {
                <div>
                    <h1>Sell</h1>
                    <input
                        placeholder="sellMoney"
                        onChange={(e) => setSellMoney(e.target.value)}
                    />
                    <button onClick={handleSellClick}>Submit</button>
                </div>
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
export default LoginPage;
