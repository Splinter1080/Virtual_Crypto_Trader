import React, { useState, useEffect } from 'react'
import axios from "axios";
function OrderList({ Coin }) {
    const [orders, setOrders] = useState();
    const [flag, setFlag] = useState(false);
    const { CoinName } = Coin;

    const handleOrders = async () => {

        axios({
            method: "GET",
            withCredentials: true,
            url: `https://vtback.herokuapp.com/limit/${CoinName}`,
        }).then((res) => {
            const { data } = res.data;
            console.log(res.data);
            setOrders(res.data);
            setFlag(true);
        });
    }

    return (
        <div>
            <p style={{ color: "white" }}>Click here to Get Limit Order List</p>
            <button className='btn btn-primary' onClick={handleOrders}>Sell</button>
            {
                flag && orders && orders.length > 0 &&
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

    )
}

export default OrderList