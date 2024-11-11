import React from "react";
import { PageHero } from "@/components/page-hero/page-hero";

import "./going-further.page.css";

export class GoingFurtherPage extends React.PureComponent {

  render() {
    return (
      <div id={"further-page"}>

        <PageHero
          title="Aller plus loin"
          subtitle="Un avenir pour ton projet"
          hasArrow
        >
          <p className="further-page__intro">
            Ton projet peut changer les choses. <br/> N'hésite pas à consulter nos sponsors pour lui construire un
            avenir !
            {/* <Link to='/space-invader'>🎮</Link> */}
          </p>
        </PageHero>

        <div className="row">

          <div className="further-page__content">

            <div className="further-page__sponsor">
              <h1 className="tx-centered on-white">Le TRAKK | LinKube</h1>

              <h5 className="on-white">Toutes tes idées ont un avenir !</h5>

              <ul className="on-white">
                <li>Étudiant ou jeune diplômé plein d’idée ? La niak d’entreprendre et de mener un
                  projet de A jusque Z ?
                  Sais-tu que LinKube, l’incubateur étudiant du BEP de la province de Namur, t’offre un accompagnement
                  spécifique : coaching personnalisé, ateliers, expertises pointues, … Tu rêves de monter ta
                  start-up ? <a href="https://www.trakk.be/">Contacte-nous !</a>
                </li>
                <li>Mais le TRAKK, c’est quoi ? Tu as envie d’oser, expérimenter, entreprendre, innover
                  de façon plus créative ? Le TRAKK, c’est 3 partenaires : le KIKK, l’UNamur et le BEP. 3 fois plus
                  d’idées et d’expériences à partager dans ce lieu composé de différents espaces mis à ta
                  disposition : coworking, bureaux, fablab, … Rejoindre le TRAKK peut se faire par différentes
                  portes ! Celle du bâtiment au plein centre de Namur, ou en participant à des conférences, des
                  ateliers, ou encore en venant y travailler !
                </li>
              </ul>

              <p>Un chemin de possibles s’offre à toi pour concrétiser tes beaux projets. On en discute ?</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
