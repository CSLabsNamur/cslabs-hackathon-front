import React, {Component, createContext} from "react";
import Cookies from "js-cookie";

export const UserContext = createContext({
    authenticated: false,
    user: null,
    team: null,
    next: null,
    fetch_user: async () => {
    },
    authenticate: () => {
    },
    disconnect: () => {
    },
    update_team: async () => {
    },
    clear_team: () => {
    },
    set_next: () => {
    },
    clear_next: () => {
    }
});

export class UserProvider extends Component {

    state = {};

    constructor(props) {
        super(props);

        this.fetch_user = async () => {
            const id = Cookies.get("id", {sameSite: "Lax"});

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
                    console.error("Unable to fetch the user.");
                    return null;
                }

                if (response.status !== 200) {
                    console.error("Wrong user credentials.");
                    return null;
                }

                return await response.json();
            }

            return false;
        }

        this.authenticate = (user) => {
            Cookies.set('id', user.id, {sameSite: "Lax"});
            this.setState({
                authenticated: true,
                user: user
            });
        }

        this.disconnect = () => {
            Cookies.remove('id', {sameSite: "Lax"});
            this.setState({
                authenticated: false,
                user: null,
                team: null
            });
        }

        this.update_team = async (team) => {

            console.log("Update the user's team.");

            let updated_team = null;

            if (team) {
                updated_team = team;
            } else {
                const response = await fetch(process.env.REACT_APP_API_URL + "teams/me", {
                    credentials: 'include',
                    method: 'GET',
                    mode: 'cors'
                });

                const body = await response.json();

                if (response.status !== 200) {
                    console.error("Server responds: " + body.message);
                    throw new Error('Failed to fetch the team.');
                }

                if (Object.entries(body).length > 0) {
                    // The user is in a team.
                    updated_team = body;
                    console.log("User team fetched.");
                }
            }
            let user;
            try {
                user = await this.state.fetch_user();
            } catch (err) {
                throw new Error("Failed to update the user's context.");
            }

            if (!user) {
                throw new Error("Invalid user.");
            }

            this.setState({
                team: updated_team,
                user: user
            });
        }

        this.clear_team = () => {
            this.setState({
                team: null
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
            fetch_user: this.fetch_user,
            authenticate: this.authenticate,
            disconnect: this.disconnect,
            update_team: this.update_team,
            clear_team: this.clear_team,
            set_next: this.set_next,
            clear_next: this.clear_next
        }
    }

    componentDidMount() {

        if (!this.authenticated) {
            this.fetch_user().then(user => {

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
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
