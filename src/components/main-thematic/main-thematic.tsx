import React from "react";

import { Topic } from "../topic/topic";

import "./main-thematic.css";

const thematicReady = true;

const thematicSource = "https://cordis.europa.eu/article/id/413473-how-digital-technologies-can-play-a-vital-role-for-the-preservation-of-cultural-heritage/fr";

export class MainThematic extends React.PureComponent {

  render() {
    if (!thematicReady) return (<div className="row" id="main-thematic">
      <div className="main-thematic__content">
        <h2 className="tx-centered on-white">La thématique plus en profondeur</h2>

        <p className="on-white">Coming soon...</p>
      </div>
    </div>);

    return (
      <div className="row" id="main-thematic">
        <div className="main-thematic__content">
          <h2 className="tx-centered">La thématique plus en profondeur</h2>
          <h6 id="credits-subtitle">Extrait d'un article <a
            href="https://cordis.europa.eu/article/id/413473-how-digital-technologies-can-play-a-vital-role-for-the-preservation-of-cultural-heritage/fr#:~:text=La%20num%C3%A9risation%20de%20notre%20patrimoine,archives%2C%20monuments%20et%20sites"
            target="_blank" rel="noreferrer">CORDIS</a></h6>

          <p>
            Que ce soit un tableau inestimable issu du siècle d’or néerlandais, les ruines d’un Forum romain et ses
            oliveraies environnantes sur le flanc d’une colline méditerranéenne ensommeillée, ou encore un
            chef-d’œuvre audiovisuel plus moderne datant du 20e siècle, notre patrimoine culturel est si fragile qu’il
            peut être facilement endommagé et de manière permanente, voire détruit dans le pire des cas.
          </p>

          <p>
            Les nombreux facteurs naturels ou humains qui représentent une menace pour notre patrimoine culturel vont
            de la pollution, des inondations et de l’érosion causée par le vent, jusqu’au vandalisme, une mauvaise
            maintenance ou un entretien inadapté. La numérisation de notre patrimoine culturel est importante en vue
            de protéger, de conserver, de restaurer, de rechercher, de diffuser et de promouvoir nos atouts culturels
            matériels et immatériels, issus de tous types d’institutions culturelles (musées, galeries, bibliothèques
            et archives, monuments et sites).
          </p
          >

          <p>
            Les progrès constants des technologies numériques ouvrent des possibilités impressionnantes et sans cesse
            grandissantes. De la technologie 3D, à l’intelligence artificielle et à la réalité virtuelle/augmentée,
            toutes ces techniques permettent non seulement de préserver, mais également de stimuler l’imagination des
            plus jeunes européens, natifs numériques, en suscitant leur admiration et leur intérêt pour les vastes
            trésors européens.
          </p>

          <p>
            Le public plébiscite des concepts tels que les musées virtuels, séduit par l’idée que s’il ne peut pas se
            déplacer physiquement au musée, celui-ci peut venir à lui. Si de tels concepts sont aujourd’hui une
            réalité, c’est grâce à l’explosion des innovations numériques au cours des 20 dernières années.
          </p>

          <Topic
            img={{src: "/images/logo/european_commission.svg", alt: "Commission Européenne"}}
            direction="right">
            <h6>Source</h6>
            <p>
              Pour plus d'informations et des exemples, <a href={thematicSource} target="_blank" rel="noreferrer">consultez
              l'article complet sur le site de la Commission Européenne</a>.
            </p>
          </Topic>

        </div>
      </div>
    );
  }

}
