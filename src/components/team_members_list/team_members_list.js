import React, {Component} from 'react';

import './team_members_list.css';
import {UserContext} from "../../context/user";
import {Modal} from "../modal/modal";

export class TeamMembersList extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        const team = this.props.team;

        this.state = {
            disabled: false,
            new_team: !team,
            members: [],
            invitation_input: "",
            invitations: [],
            modals: {
                add_invitation: false,
                max_members: false,
                invitation_sending: false,
                invitation_sent: false
            },
            team: !!team ? team : null
        };

        this.enable_modal = this.enable_modal.bind(this);
        this.disable_modal = this.disable_modal.bind(this);

        this.cancel_invitation = this.cancel_invitation.bind(this);
        this.add_invitation = this.add_invitation.bind(this);
        this.change_invitation_input = this.change_invitation_input.bind(this);
        this.open_invitation_modal = this.open_invitation_modal.bind(this);
        this.confirm_invitation_sending = this.confirm_invitation_sending.bind(this);
    }

    componentDidMount() {

        let members = [];

        if (this.state.new_team && this.context.user) {

            const {firstName, lastName} = this.context.user;

            members.push({
                firstName,
                lastName,
                owner: true
            });

        } else if (this.state.team) {

            members.push(this.state.team.members.map(member => {
                return {
                    firstName: member.firstName,
                    lastName: member.lastName,
                    owner: !!member.teamOwner
                }
            }));

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

            return console.log(`Add invitation: ${this.state.invitation_input}`);
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

    confirm_invitation_sending() {
        this.setState({
            invitation_input: ""
        });

        // TODO : send HTTP request for inviting user into the team.

        this.enable_modal("invitation_sent");
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
                           this.confirm_invitation_sending();
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

        return modals;
    }

    render() {

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
                    <td className="align-right">
                        <button className="button-danger-outlined"
                                disabled={member.owner}>
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
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {members}
                    {invitations}
                    </tbody>
                </table>
                <button className="button-primary-outlined"
                        onClick={this.open_invitation_modal}>
                    {this.state.new_team ? "Ajouter" : "Inviter"}
                </button>
            </div>
        );
    }

}
