import React from 'react'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand active" href="/"><h1 style={{ color: 'rgb(118, 185, 0)', textAlign: 'center' }}>Virtual Trader</h1></a>
                <button className="navbar-toggler" type="button" dataBsToggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" aria-current="page" href="/marketplace">MarketPlace</a>
                        <a className="nav-link" href="/login">Login</a>
                        <a className="navbar-nav nav nav-link float-end" href="/register">Register</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar