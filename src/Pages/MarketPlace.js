import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
//import { makeStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';

const MarketPlace = () => {
    const currency = "USD";
    const [coins, setCoins] = useState();
    const [flag, setflag] = useState(false);

    const fetchCoin = async () => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .catch((err) => {
                console.log(err);
            });
        setCoins(data);
        setflag(true);
        console.log(data);
    }
    useEffect(() => {
        fetchCoin();
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            fetchCoin();
        }, 5000)

        return () => clearInterval(intervalId); //This is important
    }, []);
    const useStyles = makeStyles((theme) => ({
        description: {
            display: "flex",
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },
    }));
    const classes = useStyles();
    return (
        <div >
            <h1>Coin MarketPlace</h1>
            <div className={classes.container}>
                {
                    flag && coins.map((coin) => (
                        <div>
                            <h3><a href={`/coin/${coin.id}`}> {coin.id}</a> - ${coin.current_price} </h3>
                            {/* <img src={coin.image} alt={coin.id}  /> */}
                        </div>
                    ))
                }
            </div>
        </div >
    );
};

export default MarketPlace;