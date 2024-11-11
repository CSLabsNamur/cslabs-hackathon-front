import React from "react";
import {UserContext} from "@/contexts/user.context.ts";
import {TeamVote} from "@/components/team-vote/team-vote";

export class TeamVotePage extends React.PureComponent {

  render() {
    return (
      <UserContext.Consumer>
        {value => value?.user ? <TeamVote user={value.user}/> : null}
      </UserContext.Consumer>
    );
  }

}
