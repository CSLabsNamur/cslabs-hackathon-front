import React, {Fragment} from "react";

import './team-members-list.css';
import {User} from "../../domain/user";
import ReactModal from "react-modal";
import {Team} from "../../domain/team";
import {TeamsService} from "../../services/teams.service";

enum ListModal {
  SEND_INVITATION = 'sendInvitation',
  CONFIRM_MEMBER_INVITATION = 'confirmMemberInvitation',
  MEMBER_INVITATION_SENT = 'memberInvitationSent',
}

enum Field {
  INVITATION_EMAIL = 'email'
}

export class TeamMembersList extends React.Component<{
  disabled: boolean,
  user: User,
  newTeam: boolean,
  onInvitationAdded?: (email: string) => void,
}, {
  form: {
    email: string,
    members: User[],
    invitations: string[],
  },
  modal: {
    sendInvitation: boolean,
    confirmMemberInvitation: boolean,
    memberInvitationSent: boolean,
  },
}> {

  constructor(props: any) {
    super(props);

    const {newTeam, user} = this.props;
    const members = [];

    if (newTeam && user) {
      members.push(user);
    } else if (user?.team) {
      members.push(...user.team.members);
    }

    this.state = {
      form: {
        email: "",
        members,
        invitations: [],
      },
      modal: {
        sendInvitation: false,
        confirmMemberInvitation: false,
        memberInvitationSent: false,
      },
    };

    this.onInvite = this.onInvite.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  showModal(modal: ListModal) {
    const newState: any = {...this.state};
    newState.modal[modal] = true;
    this.setState(newState);
  }

  closeModal(modal: ListModal) {
    const newState: any = {...this.state};
    newState.modal[modal] = false;
    this.setState(newState);
  }

  handleInvitation() {
    this.closeModal(ListModal.SEND_INVITATION);

    const {user, newTeam, disabled} = this.props;
    if (disabled) {
      return;
    }

    if (user && newTeam) {
      this.addInvitation(this.state.form.email);
    } else if (user?.team) {
      this.showModal(ListModal.CONFIRM_MEMBER_INVITATION);
    }
  }

  addInvitation(email: string) {
    const newState = {...this.state};
    newState.form.email = "";
    newState.form.invitations.push(email);
    this.setState(newState);
    if (this.props.onInvitationAdded) {
      this.props.onInvitationAdded(email);
    }
  }

  addMember() {
    this.closeModal(ListModal.CONFIRM_MEMBER_INVITATION);
    TeamsService.invite(this.state.form.email).then(() => {
      this.showModal(ListModal.MEMBER_INVITATION_SENT);
    });
  }

  onInvite(event: any) {
    event.preventDefault();
    const {disabled} = this.props;
    const {members, invitations} = this.state.form;
    if (disabled || members.length + invitations.length >= 4) {
      return;
    }
    this.showModal(ListModal.SEND_INVITATION);
    return false;
  }

  onLeave(event: any) {
    event.preventDefault();
    TeamsService.leave(this.props.user, event.target.value).then(() => {
      console.log('Member left successfully.');
    });
  }

  onTextChange(field: Field) {
    return (event: any) => {
      const newState = {...this.state} as any;
      newState.form[field] = event.target.value;
      this.setState(newState);
    }
  }

  renderMember(member: User, index: number) {
    const {user, newTeam} = this.props;
    const disabled = (this.props.disabled && user.id !== member.id) || member.isTeamOwner;

    return (
      <tr key={index}>
        <td className="tx-left">{member.firstName} {member.lastName}</td>

        <td className="tx-centered">{member.isTeamOwner ? "Créateur" : "Membre"}</td>

        <td className="tx-centered">
          {member.paidCaution ? (
            <span className="tooltip" style={{color: "green"}}>
              &#x2714;
              <span className="tooltip-text">La caution de ce membre a été payée et approuvée !</span>
            </span>
          ) : (
            <span className="tooltip" style={{color: "red"}}>
              &#x2716;
              <span className="tooltip-text">La caution de ce membre n'a pas été payée ou validée !</span>
            </span>
          )}
        </td>

        <td className="tx-right">
          <button className="button-danger-outlined"
          disabled={disabled || newTeam}
          style={{visibility: disabled || newTeam ? "hidden" : "visible"}}
          value={member.id}
          onClick={this.onLeave}
          >
            {member.id === user.id ? "Quitter" : "Supprimer"}
          </button>
        </td>
      </tr>
    );
  }

  renderInvitation(invitation: string, index: number) {
    return (
      <tr key={index}>
        <td>
          <strong className="tx-left">
            {invitation}
          </strong>
        </td>
        <td className="tx-centered">En attente</td>
        <td>/</td>
        <td className="tx-right">
          <button className="button-danger-outlined button-small"
                  value={invitation}
          >
            Annuler
          </button>
        </td>
      </tr>
    );
  }

  renderModals(team?: Team) {

    const token = team?.token ? Buffer.from(team.token).toString('base64') : null;
    const inviteLink = `${process.env.REACT_APP_FRONT_DOMAIN}/team/join/${token}`;

    return (
      <Fragment>

        <ReactModal
          isOpen={this.state.modal.sendInvitation}
          onRequestClose={() => this.closeModal(ListModal.SEND_INVITATION)}
          className="modal"
          overlayClassName="modal-mask"
        >
          <div className="modal-head">
            <p className="modal-title">Ajouter un membre</p>
          </div>
          <div className="modal-body">
            <p>
              Entrez l'adresse email de la personne que vous souhaitez ajouter à l'équipe.
              Un mail lui sera envoyée, l'invitant à se créer un compte/se connecter et ensuite à rejoindre l'équipe.
            </p>

            <hr/>

            <label htmlFor="invitation-input">Adresse email</label>
            <input type="email"
                   id="invitation-input"
                   name="invitation-input"
                   placeholder="membre@example.com"
                   value={this.state.form.email}
                   onChange={this.onTextChange(Field.INVITATION_EMAIL)}
            />

            {team ? (
              <div>
                <p>Lien d'invitation :</p>
                <p>
                  <a href={inviteLink} title="Lien d'invitation">
                    {inviteLink}
                  </a>
                </p>
                <p>Vous pouvez également envoyer ce code à la personne voulant rejoindre l'équipe.</p>
                <h5 style={{wordBreak: 'break-word'}}>{token}</h5>
                <p>Celui-ci peut être utilisé après avoir appuyé sur le bouton <strong>rejoindre</strong> dans
                  le menu <strong>team</strong> lorsque l'on ne possède pas déjà une équipe.</p>
              </div>
            ) : null}
          </div>
          <div className="modal-footer">
            <button className="button-primary"
                    onClick={() => this.handleInvitation()}
            >
              Ajouter
            </button>
            <button className="button-info"
                    onClick={() => this.closeModal(ListModal.SEND_INVITATION)}
            >
              Annuler
            </button>
          </div>

        </ReactModal>

        <ReactModal isOpen={this.state.modal.confirmMemberInvitation}
                    onRequestClose={() => this.closeModal(ListModal.CONFIRM_MEMBER_INVITATION)}
                    className="modal"
                    overlayClassName="modal-mask"
        >
          <div className="modal-head">
            <p className="modal-title">Confirmer l'invitation</p>
          </div>
          <div className="modal-body">
            <p>Vous êtes sur le point d'envoyer une invitation à rejoindre votre équipe à cette e-mail :</p>
            <h3>{this.state.form.email}</h3>
            <p>Êtes vous certain de vouloir continuer ?</p>
          </div>
          <div className="modal-footer">
            <button className="button-primary"
                    onClick={() => this.addMember()}
            >
              Ouais
            </button>
            <button className="button-danger-outlined"
                    onClick={() => this.closeModal(ListModal.CONFIRM_MEMBER_INVITATION)}
            >
              Surtout pas !
            </button>
          </div>
        </ReactModal>

        <ReactModal isOpen={this.state.modal.memberInvitationSent}
                    onRequestClose={() => this.closeModal(ListModal.MEMBER_INVITATION_SENT)}
                    className="modal"
                    overlayClassName="modal-mask"
        >
          <div className="modal-head">
            <p className="modal-title">Invitation envoyée !</p>
          </div>
          <div className="modal-body">
            <p>Votre invitation a bien été envoyée !</p>
          </div>
          <div className="modal-footer">
            <button className="button-primary"
                    onClick={() => this.closeModal(ListModal.MEMBER_INVITATION_SENT)}>
              Cool !
            </button>
          </div>
        </ReactModal>
      </Fragment>
    );
  }

  render() {
    const {disabled, user} = this.props;
    const team = user?.team;
    const {members, invitations} = this.state.form;

    return (
      <Fragment>
        {this.renderModals(team)}
        <div id="team-members-list" className="tx-centered">
          <table>
            <thead>
            <tr>
              <th>Membres</th>
              <th className="tx-centered">Status</th>
              <th className="tx-centered">Caution</th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {members.map((member, index) => this.renderMember(member, index))}
            {invitations.map((invitation, index) => this.renderInvitation(invitation, index))}
            </tbody>
          </table>
          {!disabled ? (
              <span className="tooltip">
                <button className="button-primary-outlined"
                        disabled={disabled || (members.length + invitations.length >= 5)}
                        onClick={this.onInvite}
                >
                  {!this.props.newTeam ? "Ajouter" : "Inviter"}
                </button>
                {(members.length + invitations.length >= 5) ? <span className="tooltip-text">Maximum 5 par équipe!</span> : null}
              </span>
          ) : null}
        </div>
      </Fragment>
    );
  }

}
