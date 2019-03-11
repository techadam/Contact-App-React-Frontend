import React, {Component} from 'react';
import { WithContext } from '../withContext';
import {Link} from 'react-router-dom';
import Profile from '../Profile';
import {Consumer} from '../../AppProvider';
import axios from 'axios';


class UploadContact extends Component {
    accessToken = this.props.value.state.accessToken;

    onSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(document.getElementById("uploadContact"));
        axios.post(`http://127.0.0.1:8000/api/bulk`, form, {headers: { Authorization: `Bearer ${this.accessToken}` }})
        .then(result => {
            const {status, message} = result.data;
            if(status === "success") {
                this.props.value.fetchContacts();
                let alertCtrl = document.getElementById("alertCont2");
                alertCtrl.classList.add("alert", "alert-info");
                alertCtrl.innerHTML = message;
            }
        })
        .catch(error => console.log(error));
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
                                            <h5 className="p-3"><i className="fa fa-cloud-upload"></i> Upload Bulk
                                                <Link to="/" className="btn btn-secondary mt-0 pull-right btn-sm btn-rounded"><i className="fa fa-users"></i> Contact listing</Link>
                                            </h5>
                                            
                                            <div id="alertCont2" style={{fontFamily: 'Lato',}}></div>
                                            <form onSubmit={this.onSubmit.bind(this)} id="uploadContact" className="px-4 pb-4" encType="multipart/formdata" >
                                                <div className="form-group">
                                                    <label className="active" htmlFor="validationCustomPass">CSV File</label><br/>
                                                    <input type="file" name="csvFile" id="validationCustomPass" aria-describedby="inputGroupPrepend2"
                                                     />
                                                </div>
                                                
                                                <div className="text-center">    
                                                    <button className="btn btn-primary btn-sm btn-rounded" type="submit">Submit CSV File</button>
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
        );
    }

}

export default WithContext(UploadContact);