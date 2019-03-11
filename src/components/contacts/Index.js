import React, {Component} from 'react';
import {Consumer} from '../../AppProvider';
import {Link} from 'react-router-dom';
import Profile from '../Profile';
import {WithContext} from '../withContext';
import axios from 'axios';

class Contacts extends Component {
    accessToken = this.props.value.state.accessToken;

    componentDidMount() {
        //Fetch contact
        //console.log(this.props.value);
    }
    
    deleteContact(id) {
        axios.delete(`http://127.0.0.1:8000/api/contact/${id}`, { headers: { Authorization: `Bearer ${this.accessToken}` } })
        .then(res => {
            this.props.value.deleteContact(id);
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="row no-gutters">
                <div className="col-md-7 mx-auto mt-4">
                    <div className="row no-gutters mx-auto">    
                        <Profile accessToken={this.accessToken} />

                        <div className="col-md-7 p-2">
                            <div className="list-group-flush bg-white">
                                <h5 className="p-3"><i className="fa fa-users"></i> Contact list 
                                    <Link to="addContact" className="btn btn-secondary mt-0 pull-right btn-sm btn-rounded"><i className="fa fa-user-plus"></i> Create</Link>
                                    <Link to="uploadContact" className="btn btn-success mt-0 pull-right btn-sm btn-rounded"><i className="fa fa-cloud-upload"></i> Upload CSV</Link>
                                </h5>
                                <Consumer>
                                {context => context.state.contacts.map((contact) => (
                                    <div className="list-group-item py-4" key={contact.id}>
                                        <div className="row mb-0">
                                                <div className="col-md-2">
                                                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg" className="rounded-circle" width="70px" height="70px" alt="woman avatar" />
                                                </div>
                                                <div className="col-md-8 pl-4 align-items-center">
                                                    <h6 className="mb-0" style={{textTransform: "capitalize"}}>{contact.firstname} {contact.surname}</h6>
                                                    <p className="mb-0"><strong style={{fontFamily: "Lato"}}>{contact.email}</strong></p>
                                                    <p className="mb-0"><strong style={{fontFamily: "Lato"}}>{contact.telephone}</strong></p>
                                                    <p className="mb-0"><strong style={{fontFamily: "Lato"}}>Private number</strong></p>
                                                </div>
                                                <div className="col-md-2">
                                                    <Link className="btn btn-light" to={`/editContact/${contact.id}`}><i className="fas fa-edit text-primary pull-right mr-1 mb-2" aria-hidden="true"></i></Link>
                                                    <button className="btn btn-light" onClick={this.deleteContact.bind(this, contact.id)} to="/"><i className="fa fa-trash text-danger pull-right mr-1" aria-hidden="true"></i></button>
                                                </div>
                                            <div/>
                                        </div>
                                    </div>
                                ))}
                                </Consumer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WithContext(Contacts);