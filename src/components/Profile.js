import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Profile extends Component {
    state = {};

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/user', { headers: { Authorization: `Bearer ${this.props.accessToken}` } })
        .then(res => {
            this.setState(res.data);
            //console.log(this.state);
        })
        .catch(error => { console.log(error) });
    }

    render() {
        return (
            <div className="col-md-5 p-2">
                <div className="card testimonial-card">

                    <div className="card-up indigo lighten-1"></div>

                    <div className="avatar mx-auto white p-3">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg" width="190px" height="190px" className="rounded-circle mt-3" alt="woman avatar" />
                    </div>

                    <div className="card-body">
                        <div className="text-center">    
                            <h5 className="card-title mb-1" style={{textTransform: "capitalize"}}>{this.state.firstname} {this.state.middlename} {this.state.surname}</h5>
                            <p className="mb-0" style={{fontWeight: "bold", fontFamily: "Lato", fontSize: "14px"}}>{this.state.email}</p>
                            <p className="mb-0" style={{fontWeight: "bold", fontFamily: "Lato", fontSize: "13px"}}>{this.state.telephone}</p>
                            <Link to="/edit" className="btn btn-secondary btn-sm btn-rounded"><i className="fa fa-edit"></i> Edit</Link>
                            <Link to="/logout" className="btn btn-danger btn-sm btn-rounded"><i className="fa fa-power-off"></i> Logout</Link>
                        </div>
                        <hr />
                        <p><i className="fas fa-quote-left"></i> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default Profile;