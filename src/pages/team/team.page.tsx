import React from 'react';

import './team.page.css';
import {TeamMenu} from '../../components/team-menu/team-menu';
import {Route, Switch} from 'react-router-dom';
import {TeamEditPage} from './team-edit/team-edit.page';

export class TeamPage extends React.PureComponent {

  render() {
    return (
      <div id="team-page">
        <TeamMenu />
        <Switch>
          <Route exact path="/team/edit" component={TeamEditPage} />
        </Switch>
      </div>
    );
  }

}
