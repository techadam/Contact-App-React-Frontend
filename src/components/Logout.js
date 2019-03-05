import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
    appState = { isLoggedIn: false, user: {}, accessToken: '', expiresIn: '' };
    
    componentDidMount() {
        this.setState(this.appState);
        localStorage["appState"] = JSON.stringify(this.appState);
    }
    
    render() {
        return (
            <Redirect to="/login" />
        )
    }
    
}

export default Logout;