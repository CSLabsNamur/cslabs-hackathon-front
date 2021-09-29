import React from 'react';

import './team.page.css';
import {TeamMenu} from '../../components/team-menu/team-menu';
import {Route, Switch} from 'react-router-dom';
import {TeamEditPage} from './team-edit/team-edit.page';
import {TeamJoinPage} from "./team-join/team-join.page";
import {TeamWelcomePage} from "./team-welcome/team-welcome.page";
import {TeamProfilePage} from "./team-profile/team-profile.page";
import {TeamListPage} from "./team-list/team-list.page";
import {TeamInfoPage} from "./team-info/team-info.page";

export class TeamPage extends React.PureComponent {

  render() {
    return (
      <div id="team-page">
        <TeamMenu />
        <Switch>
          <Route exact path="/team/edit" component={TeamEditPage} />
          <Route exact path="/team/user" component={TeamProfilePage} />
          <Route exact path="/team/all" component={TeamListPage} />
          <Route exact path="/team/info/:teamId" component={TeamInfoPage} />
          <Route exact path="/team/join" component={TeamJoinPage} />
          <Route exact path="/team/join/:token" component={TeamJoinPage} />
          <Route exact path="/team" component={TeamWelcomePage} />
        </Switch>
      </div>
    );
  }

}
