import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest}) {
    let appstate = JSON.parse(localStorage["appState"]);
    
    return (
    <Route {...rest} render={(props) => appstate.isLoggedIn? <Component {...props} /> : 
        <Redirect to="/login" />
    } />
  )
}
