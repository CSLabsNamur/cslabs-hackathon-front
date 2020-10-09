
import React, {Component} from "react";

import "./AdminUser.css";
import {UserContext} from "../../../context/user";
import {Modal} from "../../../components/modal/modal";

export class AdminUsers extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            targeted_user: null,
            modals: {
                remove_from_team: false,
                remove_user: false
            }
        }

        this.updateCaution = this.updateCaution.bind(this);

        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        if (this.context.user) {
            this.fetchUsers().then();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setModalState(modal_name, shown) {
        if (this._isMounted) {
            const new_state = {...this.state};
            new_state.modals[modal_name] = shown;
            this.setState(new_state);
        }
    }

    targetUser(user_id) {

        return new Promise((resolve) => {
            if (this._isMounted) {
                console.log(`Target user ${user_id}.`);
                this.setState({...this.state, targeted_user: user_id}, () => {
                    resolve();
                });
            }
        });

    }

    async fetchServer(url, method, data) {
        let response;

        try {
            response = await fetch(process.env.REACT_APP_API_URL + url, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: method,
                credentials: 'include',
                mode: 'cors',
                body: data ? JSON.stringify(data) : null
            });
        } catch (err) {
            throw new Error('Impossible de joindre le serveur.');
        }

        if (response.status !== 200) {
            throw new Error('Requête refusée par le serveur.');
        }

        return response;
    }

    async fetchUsers() {

        try {
            const response = await this.fetchServer('users', 'GET');
            const users = await response.json();

            if (users && this._isMounted) {
                this.setState({...this.state, users});
            }
        } catch (err) {
            alert(err.message);
            console.error("Unable to fetch the users.");
        }
    }

    async updateCaution(user_id, new_value) {
        try {
            await this.fetchServer(`users/${user_id}/caution`, 'POST', {paid: new_value});
            await this.fetchUsers();
        } catch (err) {
            alert(err.message);
            console.error("Unable to update user's caution.");
        }
    }

    async removeUser() {
        try {
            await this.fetchServer(`users/${this.state.targeted_user}/delete`, 'POST');
            console.log(`Removed the user ${this.state.targeted_user}`);
            await this.fetchUsers();
        } catch (err) {
            alert(err.message);
            console.error("Unable to remove the user.");
        }

    }

    async removeUserFromTeam() {
        try {
            await this.fetchServer(`teams/leave/${this.state.targeted_user}`, 'POST');
            console.log(`Removed user ${this.state.targeted_user} from its team.`);
            await this.fetchUsers();
        } catch (err) {
            alert(err.message);
            console.error("Unable to remove the user from its team.");
        }
    }

    render_modals() {

        const modals = [];

        modals.push(
            <Modal key={1}
                   shown={this.state.modals.remove_from_team}
                   title="Renvoi de l'équipe"
                   buttons={['Confirmer', 'Annuler']}
                   onClose={(action) => {
                       if (action === 'Confirmer') {
                           this.removeUserFromTeam().then().catch();
                       }

                       this.setModalState('remove_from_team', false);
                   }}>
                <p>Vous êtes sur le point de renvoyer cet utilisateur de son équipe.</p>
                <p>Celui-ci ne sera pas notifié.</p>
                <p>Êtes-vous certain(e) de vouloir continuer ?</p>
            </Modal>
        );

        modals.push(
            <Modal key={2}
                   shown={this.state.modals.remove_user}
                   title="Suppression de l'utilisateur"
                   buttons={['Confirmer', 'Annuler']}
                   onClose={(action) => {
                       if (action === 'Confirmer') {
                           this.removeUser().then().catch();
                       }

                       this.setModalState('remove_user', false);
                   }}>
                <p>Vous êtes sur le point de supprimer cet utilisateur.</p>
                <p>Cette action est irréversible.</p>
                <p>Voulez-vous continuer ?</p>
            </Modal>
        );

        return modals;
    }

    render() {

        const members_with_team = this.state.users.filter(u => u.team);
        const members_with_team_and_caution = members_with_team.filter(u => u.paid_caution);

        return (
            <div id="admin-panel-users">
                {this.render_modals()}
            <h3 className="align-center">Gestion des utilisateurs</h3>
                <p className="align-center">Il y a actuellement <strong>{members_with_team.length} participants</strong> qui ont une équipe
                    dont <strong>{members_with_team_and_caution.length}</strong> qui ont payé leur caution.</p>
            <table>
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Team</th>
                        <th>Créateur</th>
                        <th>Email</th>
                        <th className="align-center">Remarques</th>
                        <th className="align-center">Caution</th>
                        <th className="align-center">Date d'inscription</th>
                        <th className="align-center">Github</th>
                        <th className="align-center">LinkedIn</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                {this.state.users.map((user, index) => (
                    <tr key={index}>
                        <td><strong>{user.firstName}</strong></td>
                        <td><strong>{user.lastName}</strong></td>
                        <td>
                            {user.team ? (
                                <span style={{color: user.team.valid ? "green" : "red"}}>{user.team.name}</span>
                            ) : "/"}
                        </td>
                        <td>{user.teamOwner ? "Oui" : "/"}</td>
                        <td>{user.email}</td>
                        <td className="align-center">
                            {user.comment ? (
                                <span className="tooltip" style={{color: "orange"}}>
                                    &#9888;
                                    <span className="tooltip-text">
                                        {user.comment}
                                    </span>
                                </span>
                            ) : "/"}
                        </td>
                        <td className="align-center">
                            {user.paid_caution ? (
                                <span className="tooltip" style={{color: "green"}}>
                                    &#x2714;
                                    <span className="tooltip-text">
                                        La caution de ce membre a été payée et approuvée !
                                    </span>
                                </span>
                            ) : (
                                <span className="tooltip" style={{color: "red"}}>
                                    &#x2716;
                                    <span className="tooltip-text">
                                    La caution de ce membre n'a pas été payée ou validée !
                                    </span>
                                </span>
                            )}
                        </td>
                        <td className="align-center">
                            {user.createdAt}
                        </td>
                        <td className="align-center">
                            {user.github ? (
                                <a href={user.github} className="button button-info button-small">GitHub</a>
                            ) : '/'}
                        </td>
                        <td className="align-center">
                            {user.linkedin ? (
                                <a href={user.linkedin} className="button button-info button-small">LinkedIn</a>
                            ) : '/'}
                        </td>
                        <td>
                            <div className="admin-panel-action-bar">
                                {user.paid_caution ? (
                                    <button className="button button-danger button-small"
                                            value={user.id}
                                            onClick={event => {
                                                this.updateCaution(event.target.value, false).then();
                                            }}>
                                        Annuler caution
                                    </button>
                                ) : (
                                    <button className="button button-primary button-small"
                                            value={user.id}
                                            onClick={event => {
                                                this.updateCaution(event.target.value, true).then();
                                            }}>
                                        Valider caution
                                    </button>
                                )}

                                <button className="button button-danger button-small"
                                        disabled={!user.teamId || user.teamOwner}
                                        value={user.id}
                                        onClick={(event) => {
                                            this.targetUser(event.target.value).then(() => {
                                                this.setModalState('remove_from_team', true);
                                            });
                                        }}>
                                    Virer
                                </button>
                                <button className="button button-danger button-small"
                                        value={user.id}
                                        disabled={user.admin || user.teamOwner}
                                        onClick={(event) => {
                                            this.targetUser(event.target.value).then(() => {
                                                this.setModalState('remove_user', true);
                                            });
                                        }}>
                                    Supprimer
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        );
    }

}
