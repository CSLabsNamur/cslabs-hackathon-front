import React, {FormEvent} from 'react';

import './team-editor.css';
import {Team} from '../../domain/team';
import {TeamMembersList} from "../team-members-list/team-members-list";

enum TeamField {
  NAME= 'name',
  DESCRIPTION = 'description',
  IDEA = 'idea',
}

export class TeamEditor extends React.Component<any, {
  team?: Team,
  disabled: boolean,
  form: {
    name: string,
    description: string,
    idea: string,
  },
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      disabled: false,
      form: {
        name: "",
        description: "",
        idea: "",
      }
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onTextChange(field: TeamField) {
    return (event: any) => {
      const newState = {...this.state} as any;
      newState.form[field] = event.target.value;
      this.setState(newState);
    }
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(this.state.form);
    // TODO : implement this
  }

  onCancel(event: FormEvent) {
    event.preventDefault();
    // TODO : implement this
  }

  renderForm() {
    const {team, disabled, form} = this.state;

    return (
      <form className="form-container" onSubmit={this.onSubmit} onReset={this.onCancel}>

        {/*{this.render_modals()}*/}

        <div className="tx-centered">
          {team ? <h2>Détail de votre équipe</h2> : <h2>Création d'une équipe</h2>}

          {
            team && !disabled ?
              <button className="button-danger button-round"
                      // onClick={() => this.enable_modal('team_deletion')}
                      disabled={disabled}>
                Supprimer l'équipe
              </button> :
              null
          }
          <p>Mais qui êtes-vous donc ?</p>
        </div>

        <div className="form-control">
          <label>Nom d'équipe</label>
          <input type="text"
                 placeholder="Les Grille-Pain Musclés, par exemple..."
                 id="name"
                 value={form.name}
                 disabled={disabled}
                 onChange={this.onTextChange(TeamField.NAME)}
          />
        </div>

        <div className="form-control">
          <label>Brève description de l'équipe (optionnel)</label>
          <input type="text"
                 placeholder="Magnifique description de mon équipe..."
                 id="description"
                 value={form.description}
                 disabled={disabled}
                 onChange={this.onTextChange(TeamField.DESCRIPTION)}
          />
        </div>

        <div className="form-control">
          <label>Description de l'idée (optionnel)</label>
          <textarea placeholder="Formidable description de mon idée originale..."
                    id="idea"
                    value={form.idea}
                    disabled={disabled}
                    onChange={this.onTextChange(TeamField.IDEA)}
          />
        </div>

        <p>Les membres de votre équipe (4 maximum)</p>

        {/*{team ?*/}
        {/*  <TeamMembersList team={this.state.team} disabled={this.state.disabled}/> :*/}
        {/*  <TeamMembersList onInvitation={this.on_invitation} disabled={this.state.disabled}/>*/}
        {/*}*/}

        <TeamMembersList disabled={disabled} />

        {/*{!team ? this.render_agreement_checkbox() : null}*/}

        {/*{!disabled ? this.render_confirmation_buttons() : null}*/}

        {disabled ? null : (
          <div id="team-editor__confirmation">
            <button className="button-primary button-round"
                    type="submit"
                    disabled={this.state.disabled}>
              Confirmer
            </button>
            <button className="button-primary button-round"
                    type="reset"
                    disabled={this.state.disabled}>
              Annuler
            </button>
          </div>
        )}

      </form>
    );
  }

  render() {
    return (
      <div id="team-editor">
        {this.renderForm()}
      </div>
    );
  }

}
