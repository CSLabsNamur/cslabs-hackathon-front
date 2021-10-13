import React from "react";

export class CovidAlert extends React.PureComponent {

  render() {
    return (
      <div className="alert alert-danger">
        <p>
          Dû à la pandémie de la Covid-19, la participation à l'événement nécessite :
        </p>
        <ul>
          <li>Le port du masque dans l'enceinte de l'établissement</li>
          <li>La présentation du Covid Safe Ticket à l'entrée</li>
        </ul>
      </div>
    );
  }

}
