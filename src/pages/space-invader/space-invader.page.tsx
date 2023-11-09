import React from "react";
import "./space-invader.page.css";

export class SpaceInvaderPage extends React.PureComponent {

  render() {
    return (
      <iframe
        id="space-invader"
        title="Space Invader"
        src="https://ppoitier.com/space-invader"
        allowFullScreen={true}>
      </iframe>
    );
  }

}
