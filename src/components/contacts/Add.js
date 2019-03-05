import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Profile from '../Profile';
import {Consumer} from '../../AppProvider';
import axios from 'axios';
import {WithContext} from '../withContext';
import $ from 'jquery';

class AddContact extends Component {
    constructor(props) {
        super(props);
        let appState = localStorage["appState"];
        if (appState) {
            let AppState = JSON.parse(appState);
            this.state = { 
                isLoggedIn: AppState.isLoggedIn, 
                user: AppState.user, 
                accessToken: AppState.accessToken 
            }
        }else{
            this.state = {
                isLoggedIn: false, 
                user: {}, 
                accessToken: ''
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let form = document.getElementById("addContact");
        let data = new FormData(form);
        axios.post('http://127.0.0.1:8000/api/contacts', data, { headers: { Authorization: `Bearer ${this.state.accessToken}` } })
        .then(res => {
            this.props.value.updateState(res.data.contact);
            form.reset();
            $("#alertCont").addClass("alert alert-info shadow");
            $("#alertCont").html(`${res.data.message}`);
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
                                    <Profile accessToken={this.state.accessToken} />
                                    
                                    <div className="col-md-7 p-2">
                                        <div className="list-group-flush bg-white">
                                            <h5 className="p-3"><i className="fa fa-user-plus"></i> Create contact 
                                                <Link to="/" className="btn btn-secondary mt-0 pull-right btn-sm btn-rounded"><i className="fa fa-users"></i> Contact listing</Link>
                                            </h5>
                                            
                                            <div id="alertCont" style={{fontFamily: 'Lato'}}></div>
                                            <form onSubmit={this.onSubmit.bind(this)} id="addContact" className="px-4 pb-4" encType="multipart/formdata" >
                                                <div className="md-form">
                                                    <label htmlFor="validationCustom012">First name</label>
                                                    <input type="text" name="firstname" className="form-control" id="validationCustom012" 
                                                        required />
                                                </div>
                                                
                                                <div className="md-form">
                                                    <label htmlFor="validationCustom022">Surname</label>
                                                    <input type="text" name="surname" className="form-control" id="validationCustom022"  required />
                                                </div>

                                                <div className="md-form">
                                                    <label htmlFor="validationCustom033">Middlename</label>
                                                    <input type="text" name="middlename" className="form-control" id="validationCustom033" />
                                                </div>

                                                <div className="md-form">
                                                    <label htmlFor="validationCustomUsername">Email</label>
                                                    <input type="email"  name="email" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend2"
                                                        required />
                                                </div>

                                                <div className="md-form">
                                                    <label htmlFor="validationCustom032">Telephone</label>
                                                    <input type="text" name="telephone" className="form-control" id="validationCustom032" required />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="validationCustomPass">Photo</label><br/>
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


export default WithContext(AddContact);