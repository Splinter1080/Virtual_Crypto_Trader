import React from 'react';
import Axios from "axios";
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import { Dots, Waves, TrinitySpinner, MinimalSpinner, Spinner } from 'loading-animations-react';

function ProfilePage() {
    const [flag, setFlag] = useState(false);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState();
    const [assets, setAssets] = useState();
    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "https://vtback.herokuapp.com/user",
        }).then((res) => {
            if (res.data.loggedIn) {
                setUser(res.data);
                setAssets(res.data.assets);
                setFlag(true);
                console.log(res.data);
            }
            else {
                setFlag(false);
                console.log(res.data);
            }
        });
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className='container position-relative ' >
            <Navbar />
            <h1 style={{ color: 'white', textAlign: 'center' }}>YOUR PROFILE</h1>
            {
                flag &&
                assets.map((asset) => (
                    <div class="row ">
                        <div class="col">
                            <div class="p-3 border bg-dark">
                                <div className='row'>
                                    <p className='col text-decoration-none' style={{ color: 'rgb(118, 185, 0)', textTransform: 'capitalize' }} >
                                        {asset.coinName}
                                    </p>
                                    <div className='col' style={{ color: 'white' }}>
                                        AMOUNT: {asset.amount}
                                    </div>
                                    <div className='col' style={{ color: 'white' }}>
                                        AVERAGE PRICE: {asset.avgPrice}
                                    </div>
                                </div>
                            </div>
                            <div className='margin-top' style={
                                { marginTop: '10px' }}>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>

    )
}

export default ProfilePage