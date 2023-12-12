import React from 'react';

import debug from '../../../../../../debug';

import Login from '../..';

import './LoginPage.css';

export default class LoginPage extends React.Component {
    title = 'Login';
    
    componentDidMount() {
        document.title = this.title;
    }

    render() {
        if (debug) console.log('props: ', this.props);
        const LoginFormContainer = Login.components.LoginFormContainer;
        return (
        <div>
            <div
                className="title">
                <h1>
                    {this.title}
                </h1>
            </div>
            <div
                className="mainContent">
                <LoginFormContainer />
            </div>
        </div>
        );
    }
}