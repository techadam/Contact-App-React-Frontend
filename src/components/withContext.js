import React from 'react';
import {Consumer} from '../AppProvider';

export const WithContext = (Component) => {
    return (props) => (
        <Consumer>
            {value =>  <Component {...props} value={value} />}
        </Consumer>
    )
}