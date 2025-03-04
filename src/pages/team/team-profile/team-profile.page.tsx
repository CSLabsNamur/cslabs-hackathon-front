import React from "react";
import { UserContext } from "@/contexts/user.context.ts";
import { ProfileEditor } from "@/components/profile-editor/profile-editor";

export class TeamProfilePage extends React.PureComponent {

  render() {
    return (
      <UserContext.Consumer>
        {value => value?.user ? <ProfileEditor user={value.user}/> : null}
      </UserContext.Consumer>
    );
  }

}
