import React, {Component} from 'react';
import {Redirect} from "react-router";

import './team_members_list.css';
import {UserContext} from "../../context/user";
import {Modal} from "../modal/modal";

export class TeamMembersList extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        const team = this.props.team;

        this.state = {
            new_team: !team,
            members: [],
            invitation_input: "",
            invitations: [],
            modals: {
                add_invitation: false,
                max_members: false,
                invitation_sending: false,
                invitation_sent: false,
                invitation_failed: false
            },
            team: !!team ? team : null,
            leave: false
        };

        this.cancel_invitation = this.cancel_invitation.bind(this);
        this.add_invitation = this.add_invitation.bind(this);
        this.change_invitation_input = this.change_invitation_input.bind(this);
        this.open_invitation_modal = this.open_invitation_modal.bind(this);
    }

    componentDidMount() {

        let members = [];

        if (this.state.new_team && this.context.user) {

            const {firstName, lastName, paid_caution, id} = this.context.user;

            members.push({
                firstName,
                lastName,
                owner: true,
                paid_caution,
                id
            });

        } else if (this.state.team) {

            members = this.state.team.members.map(member => {
                return {
                    firstName: member.firstName,
                    lastName: member.lastName,
                    owner: !!member.teamOwner,
                    paid_caution: member.paid_caution,
                    id: member.id
                }
            });
        }

        this.setState({members});
    }

    enable_modal(modal_name) {
        const modals = {};
        modals[modal_name] = true;
        this.setState({modals});
        console.log(`Open modal: ${modal_name}`);
    }

    disable_modal(modal_name) {
        const modals = {};
        modals[modal_name] = false;
        this.setState({modals});
        console.log(`Close modal: ${modal_name}`);
    }

    cancel_invitation(event) {

        const deleted_inv = event.target.value;

        const invitations = this.state.invitations
            .filter(inv => inv !== deleted_inv);

        this.setState({
            invitations
        });

        console.log(`Cancel invitation: ${deleted_inv}`);
    }

    add_invitation() {

        // If the user is creating a new team
        if (this.state.new_team) {
            const invitations = this.state.invitations;
            const invitation = this.state.invitation_input;

            if (invitations.includes(invitation)) {
                return console.log(`Already existing invitation: ${invitation}`);
            }

            invitations.push(invitation);

            this.setState({
                invitations,
                invitation_input: ""
            });

            if (this.props.onInvitation) {
                this.props.onInvitation(invitation);
            }

            return console.log(`Add invitation: ${invitation}`);
        }

        // If the team already exists
        this.enable_modal("invitation_sending");
    }

    change_invitation_input(event) {
        this.setState({
            invitation_input: event.target.value
        });
    }

    open_invitation_modal() {
        const members_nbr = this.state.members.length + this.state.invitations.length;

        if (members_nbr < 5) {
            this.enable_modal("add_invitation");
        } else {
            this.enable_modal("max_members");
        }
    }

    async confirm_invitation_sending() {

        if (!this.state.team) {
            console.error('Cannot send invitation without team.');
            return;
        }

        const email = this.state.invitation_input;

        this.setState({
            invitation_input: ""
        });

        let response;

        try {
            response = await fetch(`${process.env.REACT_APP_API_URL}teams/invite/${this.state.team.id}`, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({email: email})
            });
        } catch (err) {
            this.enable_modal("invitation_failed");
            return;
        }

        if (response.status !== 200) {
            this.enable_modal("invitation_failed");
        } else {
            this.enable_modal("invitation_sent");
        }
    }

    async remove_team_member(member_id) {

        let response;

        try {
            response = await fetch(`${process.env.REACT_APP_API_URL}teams/leave/${member_id}`, {
                credentials: 'include',
                method: 'POST',
                mode: 'cors'
            });
        } catch (err) {
            alert(`L'hôte distant de répond pas. Impossible de supprimer ce membre pour le moment.
                   Veuillez réessayer plus tard.`);
            return;
        }

        if (response.status === 200) {

            const members = this.state.members.filter(member => member.id.toString() !== member_id);

            this.setState({
                ...this.state,
                members,
                leave: this.context.user.id.toString() === member_id
            });

            console.log(`The member ${member_id} has been removed from the team.`);

            if (this.context.user.id.toString() === member_id) {
                this.context.clear_team();
            } else {
                await this.context.update_team({...this.context.team, members});
            }

        } else {
            console.error(`Failed to remove the member ${member_id} from the team.`);
        }
    }

    render_modals() {

        const modals = [];

        modals.push(
            <Modal title={"Ajouter un membre"}
                   buttons={["Inviter", "Annuler"]}
                   shown={this.state.modals.add_invitation}
                   onClose={(action) => {
                       this.disable_modal('add_invitation');

                       if (action === 'Inviter') {
                           this.add_invitation();
                       }
                   }}
                   key={1}>
                <p>Entrez l'adresse e-mail de la personne que vous voulez ajouter à votre équipe. Un email lui sera
                    envoyée l'invitant à rejoindre l'équipe après s'être connectée.</p>
                <hr/>
                <label htmlFor="invitation-input">E-mail</label>
                <input type="text"
                       id="invitation-input"
                       name="invitation-input"
                       placeholder="membre@example.com"
                       value={this.state.invitation_input}
                       onChange={this.change_invitation_input}/>
                {!!this.state.team ? (
                    <div>
                        <p>Vous pouvez également envoyer ce code à la personne voulant rejoindre l'équipe.</p>
                        <h5>{this.state.team.token}</h5>
                        <p>Celui-ci peut être utilisé après avoir appuyé sur le bouton <strong>rejoindre</strong> dans
                            le menu <strong>team</strong> lorsque l'on ne possède pas déjà une équipe.</p>
                    </div>
                ) : null}
            </Modal>
        );

        modals.push(
            <Modal title={"Nombre maximum de membres"}
                   buttons={["D'accord"]}
                   shown={this.state.modals.max_members}
                   onClose={() => {
                       this.disable_modal('max_members')
                   }}
                   key={2}>
                <p>Une équipe ne peut avoir plus de 5 membres. Il n'est donc pas possible d'envoyer davantage
                    d'invitations.</p>
            </Modal>
        );

        modals.push(
            <Modal title={"Envoi de l'invitation"}
                   buttons={["Confirmer", "Annuler"]}
                   shown={this.state.modals.invitation_sending}
                   onClose={action => {
                       this.disable_modal("invitation_sending");

                       if (action === "Confirmer") {
                           this.confirm_invitation_sending().then();
                       }
                   }}
                   key={3}>
                <p>Vous êtes sur le point d'envoyer une invation à rejoindre votre équipe à cette e-mail :</p>
                <h3>{this.state.invitation_input}</h3>
                <p>Êtes vous certain de vouloir continuer ?</p>
            </Modal>
        );

        modals.push(
            <Modal title={"Invitation envoyée"}
                   buttons={["D'accord"]}
                   shown={this.state.modals.invitation_sent}
                   onClose={() => {
                       this.disable_modal("invitation_sent");
                   }}
                   key={4}>
                <p>Votre invitation a bien été envoyée.</p>
            </Modal>
        );

        modals.push(
            <Modal title={"Echec de l'invitation"}
                   buttons={["Oh..."]}
                   shown={this.state.modals.invitation_failed}
                   onClose={() => {
                       this.disable_modal("invitation_failed");
                   }}
                   key={5}>
                <p>L'invitation a échouée. Veuillez réessayer !</p>
                <p>Si le problème persiste, informez-nous en par email.</p>
            </Modal>
        );

        return modals;
    }

    render() {

        if (this.state.leave) {
            return (<Redirect to="/team"/>);
        }

        let members = this.state.members.map(
            (member, index) => (
                <tr key={index}>
                    <td>
                        <strong className="align-left">
                            {member.firstName} {member.lastName}
                        </strong>
                    </td>
                    <td className="align-center">
                        {member.owner ? "Créateur" : "Membre"}
                    </td>
                    <td className="align-center">
                        {member.paid_caution ? (
                            <span className="tooltip" style={{color: "green"}}>
                                &#x2714;
                                <span className="tooltip-text">La caution de ce membre a été payée et approuvée !</span>
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
                    <td className="align-right">
                        <button className="button-danger-outlined"
                                disabled={this.props.disabled && this.context.user.id !== member.id}
                                value={member.id}
                                onClick={event => this.remove_team_member(event.target.value).then()}>
                            Supprimer
                        </button>
                    </td>
                </tr>
            )
        );

        let invitations = null;

        if (this.state.new_team) {

            invitations = this.state.invitations.map(
                (inv, index) => (
                    <tr key={index}>
                        <td>
                            <strong className="align-left">
                                {inv}
                            </strong>
                        </td>
                        <td className="align-center">En attente</td>
                        <td>/</td>
                        <td className="align-right">
                            <button className="button-danger-outlined button-small"
                                    value={inv}
                                    onClick={this.cancel_invitation}>
                                Annuler
                            </button>
                        </td>
                    </tr>
                ));
        }

        return (
            <div id="team-editor-members-list" className="align-center">
                {this.render_modals()}
                <table>
                    <thead>
                    <tr>
                        <th>Membres</th>
                        <th className="align-center">Status</th>
                        <th className="align-center">Caution</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {members}
                    {invitations}
                    </tbody>
                </table>
                {!this.props.disabled ? (
                    <button className="button-primary-outlined"
                            onClick={this.open_invitation_modal}
                            disabled={this.props.disabled}>
                        {this.state.new_team ? "Ajouter" : "Inviter"}
                    </button>
                ) : null}
            </div>
        );
    }

}
