import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = ({ match }) => (
        <nav
            className="collapse navbar navbar-default navbar-collapse">
            <div
                className="container-fluid">
                <ul
                    className="nav navbar-nav navbar-left">
                    <li>
                        <Link
                            to="/home">Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/blog">Blog
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login">Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin">Admin
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
);

export default NavBar;