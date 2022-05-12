import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';


const MarketPlace = () => {
    const currency = "USD";
    const [coins, setCoins] = useState();
    const [flag, setflag] = useState(false);
    const [search, setSearch] = useState("");

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


    //handles search
    const handleSearch = () => {
        return coins.filter((coin) => {
            return coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase());
        });
    }
    return (
        <div className='container position-relative ' >
            <Navbar />
            <nav class="navbar navbar-dark bg-dark" style={{ float: "right" }}>
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                        onChange={e => setSearch(e.target.value)} />
                </form>
            </nav>
            <h1 style={{ color: 'white', textAlign: 'center' }}>Coin MarketPlace</h1>
            <div  >
                {
                    flag &&
                    handleSearch().map((coin) => (
                        <div class="row ">
                            <div class="col">
                                <div class="p-3 border bg-dark">
                                    <div className='row'>
                                        <a className='col text-decoration-none' href={`/coin/${coin.id}`} style={{ color: 'rgb(118, 185, 0)', textTransform: 'capitalize' }} >
                                            <img className='img-fluid' style={
                                                { width: '30px', height: '30px', marginRight: '25px' }
                                            } src={coin.image} alt={coin.id} /> {coin.id}
                                        </a>
                                        <div className='col' style={{ color: 'white' }}>
                                            ${coin.current_price}
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
        </div >
    );
};

export default MarketPlace;