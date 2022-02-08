import React from "react";

export class CovidAlert extends React.PureComponent {

  render() {
    return (
      <div className="alert alert-danger">
        <p>
          Dû à la pandémie de la Covid-19, la participation à l'événement nécessite :
        </p>
        <ul>
          <li>La présentation du Covid Safe Ticket à l'entrée</li>
          <li>Port du masque obligatoire lors des déplacements durant l'événement</li>
        </ul>
      </div>
    );
  }

}
