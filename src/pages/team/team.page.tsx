import React from 'react';

import './team.page.css';
import {TeamMenu} from '@/components/team-menu/team-menu';
import {Route, Routes} from 'react-router-dom';
import {TeamEditPage} from './team-edit/team-edit.page';
import TeamJoinPage from "./team-join/team-join.page";
import {TeamWelcomePage} from "./team-welcome/team-welcome.page";
import {TeamProfilePage} from "./team-profile/team-profile.page";
import {TeamListPage} from "./team-list/team-list.page";
import TeamInfoPage from "./team-info/team-info.page";
import {NotFoundPage} from "../not-found/not-found.page";

export class TeamPage extends React.PureComponent {

  render() {
    return (
      <div id="team-page">
        <TeamMenu />
        <Routes>
          <Route path="/edit" element={<TeamEditPage/>} />
          <Route path="/user" element={<TeamProfilePage/>} />
          <Route path="/all" element={<TeamListPage/>} />
          <Route path="/info/:id" element={<TeamInfoPage/>} />
          <Route path="/join" element={<TeamJoinPage/>}/>
          <Route path="/join/:token" element={<TeamJoinPage/>} />
          <Route path="/team/invite/:token" element={<TeamJoinPage/>} />
          <Route path="/" element={<TeamWelcomePage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
    );
  }

}
