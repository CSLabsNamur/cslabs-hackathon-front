import React from "react";
import "./mail-info.css";

export default class MailInfo extends React.Component {

  render() {
    return (
      <div className="info-sup">
        <p className="on-white">Un mail de confirmation vous sera envoyé <br/>
          Attention : Celui-ci peut arriver dans vos spams.
          Si c'est le cas, mettez l'adresse en liste blanche pour recevoir les prochains mails !
        </p>
      </div>
    );
  }
}
