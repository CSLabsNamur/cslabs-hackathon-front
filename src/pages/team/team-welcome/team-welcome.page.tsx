import React from "react";

import "./team-welcome.page.css";
import { UserContext } from "@/contexts/user.context.ts";

export class TeamWelcomePage extends React.PureComponent {

  render() {
    return (
      <UserContext.Consumer>
        {value =>
          (<div id="team-welcome-page">

            <h2>Confirmer ma participation</h2>
            <p>Merci pour votre inscription !</p>
            <p>Afin de participer au hackathon, procédez comme indiqué :</p>
            <ol>
              <li>Rejoignez ou créez une équipe (5 membres maximum).</li>
              <li>Validez votre inscription en payant la caution de 20€.</li>
            </ol>
            <p>Il est bien entendu possible de rejoindre une équipe sur place !</p>
            <h3>Comment payer la caution ?</h3>
            <p>La caution devra être payée par un virement bancaire :</p>
            <ul>
              <li>Caution : <b>20€</b></li>
              <li>Compte : <b>{import.meta.env.VITE_IBAN}</b></li>
              <li>Communication : <b>{value.user!.lastName.toUpperCase()} {value.user!.firstName}</b></li>
            </ul>

            {/* <h2>Une nouveauté dans cette édition !</h2>
        <p>
          Désormais, une partie du site Hackathon vous est destinée en tant que participant. Mais que
          comporte-t-elle ?
    </p>*/}
            <h3>Aperçu de votre équipe et de vous</h3>
            <p>
              Rédigez une description de votre équipe. Les autres participants auront accès à cet aperçu ainsi
              qu'aux profils des membres de votre équipe.
            </p>
            {/*<h3>Un peu de suspens</h3>
        <p>
          Outre le prix de l'idée, le prix de la technique, un nouveau prix fait son apparition cette année !
        </p>
        <p>
          Il s'agit du prix du public. Son concept est très simple : la dernière journée, chacun des
          participants pourra voter de manière individuelle pour le projet qu'il préfère.
        </p>
        <p>
          Un moyen comme un autre de rétablir la démocratie en ce bas monde.
        </p> */}
          </div>)}
      </UserContext.Consumer>
    );
  }

}
