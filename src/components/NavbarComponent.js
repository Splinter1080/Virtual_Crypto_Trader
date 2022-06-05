import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { api } from '../config/api';
function NavbarComponent() {
    const [username, setUsername] = useState(null);
    const [loginFlag, setLoginFlag] = useState(false);
    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: api.userGet,
        }).then((res) => {
            if (res.data.loggedIn) {
                setUsername(res.data.username);
                setLoginFlag(true);
            }
            else {
                setLoginFlag(false);
            }
        });
    };
    useEffect(() => {
        getUser();
    }, [loginFlag]);
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark" size="lg">
                <Container>
                    <Navbar.Brand href="/"
                        style={
                            { color: 'rgb(118, 185, 0)', textAlign: 'center' }
                        }>Virtual Trader
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/marketplace">MarketPlace</Nav.Link>
                            <Nav.Link href="/leaderboard">LeaderBoard</Nav.Link>
                        </Nav>
                        {
                            !loginFlag &&
                            <Nav className="justify-content-end">
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </Nav>
                        }
                        {
                            loginFlag &&
                            <Nav className="justify-content-end">
                                <NavDropdown title={username.toUpperCase()} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                                    <NavDropdown.Item href={api.logoutGet}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )
}

export default NavbarComponent