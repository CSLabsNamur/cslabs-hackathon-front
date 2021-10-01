import React from "react";
import {Route, Switch} from "react-router-dom";
import {AdminUsersPage} from "./admin-users/admin-users.page";
import {AdminTeamsPage} from "./admin-teams/admin-teams.page";
import {AdminHomePage} from "./admin-home/admin-home.page";

export class AdminPage extends React.PureComponent {
  render() {
    return (
      <div id="admin-page">
        <Switch>
          <Route exact path="/admin/users" component={AdminUsersPage}/>
          <Route exact path="/admin/teams" component={AdminTeamsPage}/>
          <Route exact path="/admin" component={AdminHomePage}/>
        </Switch>
      </div>
    );
  }
}
