import React from 'react';
import {Team} from '../../../domain/team';
import {TeamJoin} from '../../../components/team-join/team-join';
import {TeamEditor} from '../../../components/team-editor/team-editor';

enum EditionMode {
  LOADING,
  JOIN_TEAM,
  CREATE_TEAM,
  EDIT_TEAM,
}

export class TeamEditPage extends React.Component<{}, {
  mode: EditionMode,
  team?: Team,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      mode: EditionMode.CREATE_TEAM,
    }
  }

  render() {

    const {mode} = this.state;

    if (mode === EditionMode.LOADING) {
      return (<h6 className="tx-centered">Chargement en cours...</h6>);
    }
    else if (mode === EditionMode.CREATE_TEAM) {
      return <TeamEditor />;
    }
    else if (mode === EditionMode.EDIT_TEAM) {
      return <TeamEditor />;
    }
    else {
      return (<TeamJoin />);
    }
  }
}
