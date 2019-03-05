import React, {Component} from 'react';
import $ from 'jquery';

class Notification extends Component {
    
    componentDidMount() {
        $('.toast').toast('show');
    }

    render() {
        return (
            <div role="alert" aria-live="assertive" aria-atomic="true" className="toast" data-autohide="false">
                <div className="toast-header">
                    <svg className=" rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                    <rect fill="#007aff" width="100%" height="100%" /></svg>
                    <strong className="mr-auto">{this.props.alertType}</strong>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    {this.props.alertMessage}
                </div>
            </div>
        )
    }
}

export default Notification;