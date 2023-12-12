import React from 'react';
import PropTypes from 'prop-types';

// import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import './Layout.css';

import NavBar from '../navbar/NavBar';

const Layout = ({ children }) => {
    return (
        <div
            className="container">
            <div
                className="Layout">
                <div
                    className="NavBar">
                    <NavBar />
                </div>
                <div
                    className="content">
                    {children}
                </div>
                <div
                    className="footer">
                    <p>© Christof Kälin</p>
                </div>
            </div> 
        </div>  
    );
};
Layout.propTypes = { 
    children:       PropTypes.object.isRequired,
};
export default Layout;