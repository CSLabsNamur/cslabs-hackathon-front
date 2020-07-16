
import React, {Component, createContext} from "react";
import Cookies from "js-cookie";

const useAuth = async () => {

    const id = Cookies.get("id");

    if (id) {

        let response;

        try {
            response = await fetch(process.env.REACT_APP_API_URL + "users/login", {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: "{}"
            });

            return response.status === 200;

        } catch (err) {
            return false;
        }

    } else {
        return false;
    }

}

export const UserContext = createContext({
    authenticated: false,
    authenticate: () => {},
    disconnect: () => {}
});

export class UserProvider extends Component {

    state = {};

    constructor(props) {
        super(props);

        this.authenticate = () => {
            this.setState({authenticated: true});
        }

        this.disconnect = () => {
            this.setState({authenticated: false});
        }

        this.state = {
            authenticated: false,
            authenticate: this.authenticate,
            disconnect: this.disconnect
        }
    }

    componentDidMount() {

        useAuth().then(auth => {

            if (auth) {
                console.log("Auto login worked.");
            } else {
                console.log("Manual login.");
            }

            this.setState({authenticated: auth});
        });
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
