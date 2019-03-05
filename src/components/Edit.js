import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {WithContext} from './withContext';
import axios from 'axios';
import $ from 'jquery';

class Edit extends Component {
    accessToken = this.props.value.state.accessToken;

    constructor(props) {
        super(props);
        this.state = {
            firstname : '',
            surname: '',
            telephone: '',
            password: ''
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/user', { headers: { Authorization: `Bearer ${this.accessToken}` } })
        .then(res => {
            let data = res.data;
            this.setState({
                firstname: data.firstname,
                surname: data.surname,
                telephone: data.telephone === null? '' : data.telephone,
                password: '',
            });
        })
        .catch(error => { console.log(error) });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.put('http://127.0.0.1:8000/api/edit_profile', this.state, { headers: { Authorization: `Bearer ${this.accessToken}` } })
        .then(res => {
            $("#alertCont").addClass("alert alert-info shadow");
            $("#alertCont").html(`${res.data.message}`);
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="row no-gutters">    
                <div className="col-md-3 mx-auto reg-card shadow">    
                    <div className="card card-cascade narrower">
                        <div className="card-body card-body-cascade">
                            
                            <h5 className="card-title">Contacts</h5>
                            <h6><b>Update account</b></h6>

                            <div id="alertCont" style={{fontFamily: 'Lato',}}></div>
                            <form onSubmit={this.onSubmit.bind(this)} >
                                <div className="md-form">
                                    <label htmlFor="validationCustom012" className="active">First name</label>
                                    <input type="text" name="firstname" className="form-control" id="validationCustom012" value={this.state.firstname} onChange={this.onChange.bind(this)}
                                        required />
                                </div>
                                
                                <div className="md-form">
                                    <label htmlFor="validationCustom022" className="active">Last name</label>
                                    <input type="text" name="lastname" className="form-control" id="validationCustom022" value={this.state.surname} onChange={this.onChange.bind(this)} required />
                                </div>

                                <div className="md-form">
                                    <label htmlFor="validationCustomUsername2" className="active">Telephone</label>
                                    <input type="text"  name="telephone" className="form-control" value={this.state.telephone} id="validationCustomUsername2" onChange={this.onChange.bind(this)} aria-describedby="inputGroupPrepend2"
                                        required />
                                </div>

                                <div className="md-form">
                                    <label htmlFor="validationCustomPass2" className="active">Password</label>
                                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange.bind(this)} id="validationCustomPass2" aria-describedby="inputGroupPrepend2"
                                        required />
                                </div>
                                
                                <div className="text-center">    
                                    <button className="btn btn-primary btn-sm btn-rounded" type="submit">Update</button>
                                    <Link to="/" className="btn btn-secondary btn-sm btn-rounded">Back to Profile</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default WithContext(Edit);