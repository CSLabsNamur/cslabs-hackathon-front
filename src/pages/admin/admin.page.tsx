import React from "react";
import {Route, Routes} from "react-router-dom";
import {AdminUsersPage} from "./admin-users/admin-users.page";
import {AdminTeamsPage} from "./admin-teams/admin-teams.page";
import {AdminHomePage} from "./admin-home/admin-home.page";
import {AdminAnnouncePage} from "./admin-announce/admin-announce.page";
import {AdminVotesPage} from "./admin-votes/admin-votes.page";
import {NotFoundPage} from "../not-found/not-found.page";

export class AdminPage extends React.PureComponent {
  render() {
    return (
      <div id="admin-page">
        <Routes>
          <Route path="/users" element={<AdminUsersPage/>}/>
          <Route path="/teams" element={<AdminTeamsPage/>}/>
          <Route path="/announce" element={<AdminAnnouncePage/>}/>
          <Route path="/votes" element={<AdminVotesPage/>}/>
          <Route path="/" element={<AdminHomePage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
    );
  }
}
