import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import NavbarComponent from '../components/NavbarComponent';
import { Dots, Waves, TrinitySpinner, MinimalSpinner, Spinner } from 'loading-animations-react';
import { api } from '../config/api';

const LeaderBoard = () => {
    const [flag, setflag] = useState(false);
    const [users, setUsers] = useState();
    const [search, setSearch] = useState("");

    const fetchLeaderBoard = async () => {
        const { data } = await axios.get(api.leaderboardGet)
            .catch((err) => {
                console.log(err);
            });
        setUsers(data);
        setflag(true);
        console.log(data);
    }
    useEffect(() => {
        fetchLeaderBoard();
    }, []);
    const handleSearch = () => {
        return users.filter((user) => {
            return user.username.toLowerCase().includes(search.toLowerCase());
        });
    }
    return (
        <div className='container position-relative ' >
            <NavbarComponent />
            <nav class="NavbarComponent NavbarComponent-dark bg-dark" style={{ float: "right" }}>
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                        onChange={e => setSearch(e.target.value)} />
                </form>
            </nav>
            <h1 style={{ color: 'white', textAlign: 'center' }}>LeaderBoard</h1>
            <div>
                {
                    flag &&
                    handleSearch().map((user) => (
                        <div class="row ">
                            <div class="col">
                                <div class="p-3 border bg-dark">
                                    <div className='row'>
                                        <p className='col text-decoration-none' style={{ color: 'rgb(118, 185, 0)', textTransform: 'capitalize' }} >
                                            {user.username}
                                        </p>
                                        <div className='col' style={{ color: 'white' }}>
                                            {user.currentValue}
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

export default LeaderBoard;