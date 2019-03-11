import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {MyProvider} from './AppProvider';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Login from './components/Login';
import Edit from './components/Edit';
import Contacts from './components/contacts/Index';
import AddContact from './components/contacts/Add';
import EditContact from './components/contacts/Edit';
import UploadContact from './components/contacts/Upload';
import Logout from './components/Logout';
import Error from './components/Error';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {},
      accessToken: '',
    }
  }

  componentDidMount() {
    let appState = localStorage["appState"];
    if (appState) {
      let AppState = JSON.parse(appState);
      //console.log(AppState);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user, accessToken: AppState.accessToken });
    }
  }
  
  render() {
    return (
      <div className="App-cover">
          <MyProvider>
            <Router>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route exact path="/" render={props => this.state.isLoggedIn? (
                  <Contacts />) : ( <Redirect to="/login" />
                )} />
                <PrivateRoute path="/edit" component={Edit} />
                <PrivateRoute path="/addContact" component={AddContact} />
                <PrivateRoute path="/editContact/:id" component={EditContact} />
                <PrivateRoute path="/uploadContact" component={UploadContact} />
                <Route to="/logout" component={Logout} />
                <Route component={Error} />
              </Switch>
            </Router>
          </MyProvider>
      </div>
    );
  }
}

export default App;
