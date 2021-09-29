import React from 'react';
import {TeamJoin} from '../../../components/team-join/team-join';
import {TeamEditor} from '../../../components/team-editor/team-editor';
import {UserContext} from "../../../contexts/user.context";
import {User} from "../../../domain/user";
import {Redirect} from "react-router-dom";

enum EditionMode {
  LOADING,
  JOIN_TEAM,
  CREATE_TEAM,
  EDIT_TEAM,
}

export class TeamEditPage extends React.Component<{}, {
  newTeam: boolean,
  redirect?: string,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      newTeam: false,
    }
  }

  renderEditor(user: User) {
    let mode = EditionMode.LOADING;
    if (user?.team) {
      mode = EditionMode.EDIT_TEAM;
    } else if (user && this.state.newTeam) {
      mode = EditionMode.CREATE_TEAM;
    } else if (user) {
      mode = EditionMode.JOIN_TEAM;
    }

    if (mode === EditionMode.LOADING) {
      return (<h6 className="tx-centered">Chargement en cours...</h6>);
    }
    else if (mode === EditionMode.CREATE_TEAM) {
      return <TeamEditor newTeam={true} user={user} disabled={false}/>;
    }
    else if (mode === EditionMode.EDIT_TEAM) {
      return <TeamEditor newTeam={false} user={user} disabled={!user.isTeamOwner} />;
    }
    else {
      return (<TeamJoin onJoin={() => {this.setState({ ...this.state, redirect: '/team/join' })}}
                        onCreate={() => {this.setState({ newTeam: true })}}
      />);
    }
  }

  render() {

    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect} />);
    }

    return (
      <UserContext.Consumer>
        {value => {
          if (value?.user) {
            return this.renderEditor(value.user);
          }
        }}
      </UserContext.Consumer>
    );
  }
}
