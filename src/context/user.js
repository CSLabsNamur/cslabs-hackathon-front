
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
        } catch (err) {
            return null;
        }

        if (response.status !== 200) {
            return null;
        }

        return await response.json();
    }

    return false;
}

export const UserContext = createContext({
    authenticated: false,
    user: null,
    team: null,
    next: null,
    authenticate: () => {},
    disconnect: () => {},
    update_team: () => {},
    set_next: () => {},
    clear_next: () => {}
});

export class UserProvider extends Component {

    state = {};

    constructor(props) {
        super(props);

        this.authenticate = (user) => {
            this.setState({
                authenticated: true,
                user: user
            });
        }

        this.disconnect = () => {
            this.setState({
                authenticated: false,
                user: null,
                team: null
            });
        }

        this.update_team = (team) => {
            this.setState({
                team: team
            });
        }

        this.set_next = (next_page) => {
            this.setState({
                next: next_page
            });
        };

        this.clear_next = () => {
            this.setState({
                next: null
            });
        };

        this.state = {
            authenticated: false,
            user: null,
            team: null,
            next: null,
            authenticate: this.authenticate,
            disconnect: this.disconnect,
            update_team: this.update_team,
            set_next: this.set_next,
            clear_next: this.clear_next
        }
    }

    componentDidMount() {

        useAuth().then(user => {

            if (user) {
                console.log("Auto login worked.");
                console.log(`Logged as ${user.email}`);
                this.setState({
                    authenticated: true,
                    user: user
                });
            } else {
                console.log("Manual login.");
                this.setState({
                    authenticated: false,
                    user: null
                });
            }
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
