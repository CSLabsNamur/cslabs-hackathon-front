import React, {FormEvent} from "react";
import {User} from "../../domain/user";
import {TeamsService} from "../../services/teams.service";
import {Team} from "../../domain/team";
import './team-vote.css';
import { Link } from "react-router-dom";
import {UserService} from "../../services/user.service";

export class TeamVote extends React.Component<{
  user: User,
}, {
  teams: Team[],
  selectedTeam?: string,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      teams: [],
    }

    this.submitVote = this.submitVote.bind(this);
    this.onVoteOptionChanged = this.onVoteOptionChanged.bind(this);
  }

  filterTeams(teams: Team[]): Team[] {
    return teams.filter((team) => {
      if (!team.valid) {
        return false;
      }
      for (const member of team.members) {
        if (member.isAdmin) {
          return false;
        }
      }
      return this.props.user.team?.id !== team.id;
    });
  }

  componentDidMount() {
    TeamsService.getAll().then((teams) => {
      if (teams.length < 1) {
        return;
      }

      let selectedTeam = teams[0].id;
      if (this.props.user?.voteId) {
        selectedTeam = this.props.user.voteId;
      }

      this.setState({...this.state, teams: this.filterTeams(teams), selectedTeam});
    });
  }


  submitVote(event: FormEvent) {
    event.preventDefault();

    const vote_id = this.state.selectedTeam;

    if (!vote_id) {
      throw Error("Undefined team ID for vote.");
    }

    UserService.updateVote(vote_id).then(() => {
      console.log('Vote successfully updated.');
    });
  }

  onVoteOptionChanged(event: any) {
    this.setState({...this.state, selectedTeam: event.target.value })
  }

  getTeamName(team_id: string) {
    const team = this.state.teams.find((t) => t.id === team_id);

    if (!team) {
      throw Error(`Team not found [${team_id}].`)
    }

    return team.name;
  }

  render() {
    const teams = this.state.teams;
    const user = this.props.user;

    const isVoteDisabled = !user?.team?.valid;

    const vote_info = (
      <div className="team-vote__info">
        <h2>Votez pour votre équipe favorite !</h2>
        <p>Un projet vous a fait de l'oeil ? Vous trouver une idée originale et/ou utile ?</p>

        <Link to={'/team/all'}>
          <button className="button-info">Information sur les équipes</button>
        </Link>
      </div>
    );

    let vote_button = <button className="button-primary button-large" type="submit" disabled={isVoteDisabled}>Voter</button>;
    if (user.voteId) {
      vote_button = <button className="button-info button-large" type="submit" disabled={isVoteDisabled}>Remplacer mon vote</button>;
    }

    const vote_form = (
      <div className="team-vote__vote">
        <h4>Félicitez-le en votant pour lui !</h4>
        <p>Pour voter, il vous faut être membre d'une équipe valide. À noter que l'on ne peut pas voter pour sa propre équipe (et oui, je vous vois venir les canailles !).</p>

        <form onSubmit={this.submitVote}>

          <div className="form-control">
            <label htmlFor="">Équipes éligibles pour mon vote :</label>
            <select id="team-vote__select" value={this.state.selectedTeam!} onChange={this.onVoteOptionChanged} disabled={isVoteDisabled}>
              {teams.map((team, index) => (
                <option className={team.id === user.voteId ? 'voted' : ''} value={team.id} key={index}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control tx-centered">
            {vote_button}
          </div>

        </form>
      </div>
    );

    let current_vote = null;
    if (user.voteId && teams.length > 0) {
      current_vote = (
        <h4 className="team-vote__current">Vote actuel : <span>{this.getTeamName(user.voteId)}</span></h4>
      );
    }

    return (
      <div id="team-vote" className="form-container">
        {vote_info}
        {isVoteDisabled ? <p className="alert alert-danger">
          Il est nécessaire de faire partie d'une équipe ayant été validée pour voter.
        </p> : null}
        {teams.length > 0 ? vote_form : null}
        <hr />
        {current_vote}
      </div>
    );
  }

}
