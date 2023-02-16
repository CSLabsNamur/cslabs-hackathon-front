import React from "react";
import "./draw-board.page.css";

export class DrawBoardPage extends React.PureComponent {

  render() {
    return (
      <iframe
        id="draw-board"
        src="https://www.web-whiteboard.io/?id=137638&embedToken=HLl+cWEQ24jrbYB5y7P7RKOWonscMYBg"
        allow="camera; encrypted-media; microphone; midi;"
        allowFullScreen={true}>
      </iframe>
    );
  }

}
