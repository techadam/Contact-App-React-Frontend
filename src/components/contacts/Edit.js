import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Profile from '../Profile';
import {Consumer} from '../../AppProvider';
import axios from 'axios';
import {WithContext} from '../withContext';
import $ from 'jquery';

class EditContact extends Component {
    accessToken = this.props.value.state.accessToken;

    state = {
        firstname: '',
        surname: '',
        middlename: '',
        email: '',
        telephone: '',
        contact_id: '',
        isPublic: 0,
    }
    
    componentDidMount() {
        let id = parseInt(this.props.match.params.id);
        axios.get(`http://127.0.0.1:8000/api/contact/${id}`, { headers: { Authorization: `Bearer ${this.accessToken}` } })
        .then(res => {
            let newState = res.data.contacts.filter(contact => contact.id === id);
            this.setState({
                firstname: newState[0].firstname,
                surname: newState[0].surname,
                middlename: (newState[0].middlename === null)? '' : newState[0].middlename,
                email: newState[0].email,
                telephone: newState[0].telephone,
                contact_id: id,
            });
        })
        .catch(error => console.log(error));
    }

    onChange(e) {
        this.setState({
            [e.target.name]: (e.target.type === "file")? e.target.files[0] : e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        axios.put('http://127.0.0.1:8000/api/contacts', this.state, { headers: { Authorization: `Bearer ${this.accessToken}` } })
        .then(res => {
            $("#alertCont").addClass("alert alert-info shadow");
            $("#alertCont").html(`${res.data.message}`);
            this.props.value.editContact(this.state.contact_id, res.data.contact);
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <Consumer>
                {context => {
                    return (
                        <div className="row no-gutters">
                            <div className="col-md-7 mx-auto mt-4">
                                <div className="row no-gutters mx-auto">    
                                    <Profile accessToken={this.accessToken} />
                                    
                                    <div className="col-md-7 p-2">
                                        <div className="list-group-flush bg-white">
                                            <h5 className="p-3"><i className="fa fa-edit"></i> Edit contact 
                                                <Link to="/" className="btn btn-secondary mt-0 pull-right btn-sm btn-rounded"><i className="fa fa-users"></i> Contact listing</Link>
                                            </h5>
                                            
                                            <div id="alertCont" style={{fontFamily: 'Lato',}}></div>
                                            <form onSubmit={this.onSubmit.bind(this)} id="editContact" className="px-4 pb-4" encType="multipart/formdata" >
                                                <div className="md-form">
                                                    <label className="active" htmlFor="validationCustom012">First name</label>
                                                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.onChange.bind(this)} className="form-control" id="validationCustom012" 
                                                        required />

                                                    <input type="hidden" className="form-control" name="contact_id" value={this.props.match.params.id} readOnly />
                                                </div>
                                                
                                                <div className="md-form">
                                                    <label className="active" htmlFor="validationCustom022">Surname</label>
                                                    <input type="text" value={this.state.surname} onChange={this.onChange.bind(this)} name="surname" className="form-control" id="validationCustom022"  required />
                                                </div>

                                                <div className="md-form">
                                                    <label className="active" htmlFor="validationCustom033">Middlename</label>
                                                    <input type="text" name="middlename" value={this.state.middlename} onChange={this.onChange.bind(this)} className="form-control" id="validationCustom033" />
                                                </div>

                                                <div className="md-form">
                                                    <label className="active" htmlFor="validationCustomUsername">Email</label>
                                                    <input type="email" value={this.state.email} onChange={this.onChange.bind(this)}  name="email" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend2"
                                                        required />
                                                </div>

                                                <div className="md-form">
                                                    <label className="active" htmlFor="validationCustom032">Telephone</label>
                                                    <input type="text" value={this.state.telephone} onChange={this.onChange.bind(this)} name="telephone" className="form-control" id="validationCustom032" required />
                                                </div>

                                                <div className="form-group">
                                                    <label className="active" htmlFor="validationCustomPass">Photo</label><br/>
                                                    <input type="file" name="photo" id="validationCustomPass" aria-describedby="inputGroupPrepend2"
                                                     />
                                                </div>
                                                
                                                <div className="text-center">    
                                                    <button className="btn btn-primary btn-sm btn-rounded" type="submit">Submit contact</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}


export default WithContext(EditContact);