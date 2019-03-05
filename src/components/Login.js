import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    isLoggedIn = false;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '' ,
            grant_type: "password",
            client_id: "2",
            client_secret: "tuWnKrOWr6VUwPMpDAtd2MJxHA4gKL2DWCLQsyLZ"
        }
    }

    componentDidMount() {
        let appState = localStorage["appState"];
        if (appState) {
            let AppState = JSON.parse(appState);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
            this.isLoggedIn = AppState.isLoggedIn;
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/oauth/token', this.state)
        .then(res => {
            console.log(res.data);
            if(res.data.token_type === "Bearer") {
                let appState = {
                    user: {
                        email: this.state.username,
                    },
                    isLoggedIn: true,
                    accessToken: res.data.access_token,
                    expiresIn: res.data.expires_in,
                };
                localStorage['appState'] = JSON.stringify(appState);
                this.isLoggedIn = true;
            }
            this.props.history.push("/");
        })
        .catch((error) => {console.log(error.data)});
    }

    render() {
        return (
            this.isLoggedIn? (<Redirect to="/" />): (
            
            <div className="row no-gutters">    
                <div className="col-md-3 mx-auto reg-card shadow">    
                    <div className="card card-cascade narrower">
                        <div className="card-body card-body-cascade">
                            
                            <h5 className="card-title">Contacts</h5>
                            <h6><b>Login to account</b></h6>
                            <form onSubmit={this.onSubmit.bind(this)} >
                                <div className="md-form">
                                    <label htmlFor="validationCustomUsername2">Username</label>
                                    <input type="email"  name="username" className="form-control" value={this.state.username} id="validationCustomUsername2" onChange={this.onChange.bind(this)} aria-describedby="inputGroupPrepend2"
                                        required />
                                </div>

                                <div className="md-form">
                                    <label htmlFor="validationCustomPass2">Password</label>
                                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange.bind(this)} id="validationCustomPass2" aria-describedby="inputGroupPrepend2"
                                        required />
                                </div>
                                
                                <div className="text-center">    
                                    <button className="btn btn-primary btn-sm btn-rounded" type="submit">Sign In</button>
                                    <Link to="/register" className="btn btn-secondary btn-sm btn-rounded">Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )
        );
    }

}

export default Login;