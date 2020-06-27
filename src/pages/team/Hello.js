import React, { Component } from 'react';

import TeamMenu from "../../components/team_menu/team_menu";

class Hello extends Component {
  render() {
    return (
      <div className="container" style={{marginTop: 2 * 59}}>
        <div className="row">
          <TeamMenu />
          <div className="col col-lg-9">
            <h2>Une nouveauté dans cette édition !</h2>
            <p>
              Désormais, une partie du site Hackathon vous est destiné en tant que participant. Mais que comporte-elle ?
            </p>
            <h3>Aperçu de votre équipe et de vous</h3>
            <p>
              Rédigez une description de votre équipe. Les autres participants auront accès à cet aperçu ainsi qu'aux profils des membres de votre équipe.
            </p>
            <p>
              Augmentez votre visibilité en détaillant votre compte Github, Linkedin.
            </p>
            <h3>Un peu de suspens</h3>
            <p>
              Outre les prix de l'idée, les prix techniques, un nouveau prix fait son apparition cette année !
            </p>
            <p>
              Il s'agit du Prix du Public. Son concept est très simple : la dernière journée, chacun des participants pourra voter de manière individuelle pour son équipe préférée.
            </p>
            <p>
              Un moyen comme un autre de rétablir la démocratie en ce bas monde.
            </p>
          </div>
        </div>
        <style>
          {`footer {
            position: fixed;
            bottom: 0px;
          }`}
        </style>
      </div>
    )
  }
}

export default Hello;