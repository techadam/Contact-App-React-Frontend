import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname : '',
            surname: '',
            email: '',
            password: '' 
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register', this.state, { crossdomain: true })
        .then(res => {
            if(res.data.status === 'success') {
                $("#alertCont").removeClass("alert alert-danger");
                $("#alertCont").addClass("alert alert-success");
                $("#alertCont").html(`${res.data.message}. Login to continue`);
            }else{
                $("#alertCont").removeClass("alert alert-success");
                $("#alertCont").addClass("alert alert-danger");
                $("#alertCont").html(`${res.data.message}`);
            }
        })
        .catch(e => {console.log(e)});
    }

    render() {
        return (
            <div className="row no-gutters">    
                <div className="col-md-3 mx-auto reg-card shadow">    
                    <div className="card card-cascade narrower">
                        <div className="card-body card-body-cascade">
                            <h5 className="card-title">Contacts</h5>
                            <h6><b>Create account</b></h6>

                            <div id="alertCont" style={{fontFamily: 'Lato'}}></div>
                            <form onSubmit={this.onSubmit.bind(this)} >
                                <div className="md-form">
                                    <label htmlFor="validationCustom012">First name</label>
                                    <input type="text" name="firstname" className="form-control" id="validationCustom012" value={this.state.firstname} onChange={this.onChange.bind(this)}
                                        required />
                                </div>
                                
                                <div className="md-form">
                                    <label htmlFor="validationCustom022">Surname</label>
                                    <input type="text" name="surname" className="form-control" id="validationCustom022" value={this.state.surname} onChange={this.onChange.bind(this)} required />
                                </div>

                                <div className="md-form">
                                    <label htmlFor="validationCustomUsername">Email</label>
                                    <input type="email"  name="email" className="form-control" value={this.state.email} id="validationCustomUsername" onChange={this.onChange.bind(this)} aria-describedby="inputGroupPrepend2"
                                        required />
                                </div>

                                <div className="md-form">
                                    <label htmlFor="validationCustomPass">Password</label>
                                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange.bind(this)} id="validationCustomPass" aria-describedby="inputGroupPrepend2"
                                        required />
                                </div>
                                
                                <div className="text-center">    
                                    <button className="btn btn-primary btn-sm btn-rounded" type="submit">Sign up</button>
                                    <Link to="/login" className="btn btn-secondary btn-sm btn-rounded">Sign In</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Register;