import React from 'react';

import './team.page.css';
import {TeamMenu} from '../../components/team-menu/team-menu';
import {Route, Routes} from 'react-router-dom';
import {TeamEditPage} from './team-edit/team-edit.page';
import TeamJoinPage from "./team-join/team-join.page";
import {TeamWelcomePage} from "./team-welcome/team-welcome.page";
import {TeamProfilePage} from "./team-profile/team-profile.page";
import {TeamListPage} from "./team-list/team-list.page";
import TeamInfoPage from "./team-info/team-info.page";
import {TeamVotePage} from "./team-vote/team-vote.page";
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
          <Route path="/vote" element={<TeamVotePage/>} />
          <Route path="/" element={<TeamWelcomePage/>} />
          <Route path="*" element={<NotFoundPage/>} />

          {/*<Route path="/team/edit" component={TeamEditPage} />*/}
          {/*<Route path="/team/user" component={TeamProfilePage} />*/}
          {/*<Route path="/team/all" component={TeamListPage} />*/}
          {/*<Route path="/team/info/:teamId" component={TeamInfoPage} />*/}
          {/*<Route path="/team/join" component={TeamJoinPage} />*/}
          {/*<Route path="/team/join/:token" component={TeamJoinPage} />*/}
          {/*<Route path="/team/invite/:token" component={TeamJoinPage} />*/}
          {/*<Route path="/team/vote" component={TeamVotePage} />*/}
          {/*<Route path="/team" component={TeamWelcomePage} />*/}
          {/*<Route>*/}
          {/*  <Redirect to="/not-found" />*/}
          {/*</Route>*/}
        </Routes>
      </div>
    );
  }

}
