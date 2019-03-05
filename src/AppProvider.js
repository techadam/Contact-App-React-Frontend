import React, {Component} from 'react';
import axios from 'axios';

export const MyContext = React.createContext();

export class MyProvider extends Component {
    constructor(props) {
        super(props);
        let appState = localStorage["appState"];
        let lastState = JSON.parse(appState);

        this.state = {
            isLoggedIn: lastState.isLoggedIn,
            user: lastState.user,
            accessToken: lastState.accessToken,
            expiresIn: lastState.expiresIn,
            contacts: []
        }
    }

    componentDidMount() {
        let contacts = [];
        
        axios.get('http://127.0.0.1:8000/api/my_contacts', { headers: { Authorization: `Bearer ${this.state.accessToken}` } })
        .then(res => {
            contacts = res.data.contacts;
            this.setState({contacts: contacts});
        })
        .catch(error => { console.log(error) });

        this.setState({
            contacts: contacts,
        });
    }

    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                updateState: (value) => {
                    this.setState({contacts: [...this.state.contacts, value] });
                },
                deleteContact: (id) => {
                    this.setState({ contacts: [...this.state.contacts.filter((contact) => contact.id !== id)] })
                },
                editContact: (id, contactObj) => {
                    let contacts = [...this.state.contacts.filter(contact => contact.id !== id), contactObj];
                    this.setState({contacts: contacts});
                } 
            }}>
                {this.props.children}
            </MyContext.Provider>
        );
    }

}

export const Consumer = MyContext.Consumer;