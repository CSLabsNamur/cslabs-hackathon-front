import React from "react";
import {Route, Routes} from "react-router-dom";
import {AdminUsersPage} from "./admin-users/admin-users.page";
import {AdminTeamsPage} from "./admin-teams/admin-teams.page";
import {AdminHomePage} from "./admin-home/admin-home.page";
import {AdminAnnouncePage} from "./admin-announce/admin-announce.page";
import {AdminVotesPage} from "./admin-votes/admin-votes.page";

export class AdminPage extends React.PureComponent {
  render() {
    return (
      <div id="admin-page">
        <Routes>
          <Route path="/admin/users" element={<AdminUsersPage/>}/>
          <Route path="/admin/teams" element={<AdminTeamsPage/>}/>
          <Route path="/admin/announce" element={<AdminAnnouncePage/>}/>
          <Route path="/admin/votes" element={<AdminVotesPage/>}/>
          <Route path="/admin" element={<AdminHomePage/>}/>
        </Routes>
      </div>
    );
  }
}
