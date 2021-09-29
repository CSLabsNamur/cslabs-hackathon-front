import React from "react";
import {Route, Switch} from "react-router-dom";
import {AdminUsersPage} from "./admin-users/admin-users.page";

export class AdminPage extends React.PureComponent {
  render() {
    return (
      <div id="admin-page">
        <Switch>
          <Route exact path="/admin/users" component={AdminUsersPage}/>
        </Switch>
      </div>
    );
  }
}
