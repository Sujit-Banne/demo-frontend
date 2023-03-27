import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar(props) {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userTokenTime'));
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('userTokenTime');
        setLoggedIn(false);
        navigate('/signin');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container">
                {/* <Link className="navbar-brand" to="/">VideoServer</Link> */}
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"> */}
                {/* <span className="navbar-toggler-icon"></span>
            </button> */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {loggedIn ?
                            <>
                                <NavLink className="nav-item nav-link" to="/home" exact>Home</NavLink>
                                <NavLink className="nav-item nav-link" to="/upload">Upload</NavLink>
                                <NavLink className="nav-item nav-link" to="/myvideos">My Videos</NavLink>
                                <button className="nav-item nav-link btn btn-link" onClick={handleSignOut}>Sign Out</button>
                            </>
                            :
                            <>
                                <NavLink className="nav-item nav-link" to="/signin">Sign In</NavLink>
                                <NavLink className="nav-item nav-link" to="/signup">Sign Up</NavLink>
                            </>}
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default Navbar;
