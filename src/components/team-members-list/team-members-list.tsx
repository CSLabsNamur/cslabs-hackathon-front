import React from "react";

import './team-members-list.css';
import {Team} from "../../domain/team";
import {User} from "../../domain/user";

export class TeamMembersList extends React.Component<{
  disabled: boolean,
  team?: Team,
}, {}> {

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  renderMember(member: User, index: number) {
    const disabled = (this.props.disabled) || member.isTeamOwner;

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
                  disabled={disabled}
                  style={{
                    visibility: disabled ?
                      "hidden" :
                      "visible"
                  }}
                  value={member.id}
          >
            Supprimer
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

  render() {

    const {disabled, team} = this.props;

    // TODO : Replace the placeholders
    const members: User[] = [
      {
        id: 'id1',
        firstName: 'John', lastName: 'Smith',
        isTeamOwner: false, paidCaution: true,
      },
      {
        id: 'id2',
        firstName: 'Henri', lastName: 'Ford',
        isTeamOwner: true, paidCaution: false,
      }
    ];
    const invitations = ['lucie@example.com', 'pierre@example.com']

    return (
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
          <button className="button-primary-outlined"
                  disabled={disabled}>
            {!team ? "Ajouter" : "Inviter"}
          </button>
        ) : null}
      </div>
    );
  }

}
