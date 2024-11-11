import React from "react";

import './not-found.page.css';

export class NotFoundPage extends React.PureComponent {

  render() {
    return (
      <div id="not-found-page">
        <h2>Cette page n'existe pas...</h2>

        <p>Il se pourrait que vous soyez perdu l'ami...</p>

        <img src="/images/hmmm.gif" alt="Emote qui tourne"/>
      </div>
    );
  }
}
