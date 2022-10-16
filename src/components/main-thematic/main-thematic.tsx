import React from 'react';

import './main-thematic.css';

export class MainThematic extends React.PureComponent {

  render() {
    return (
      <div className="row" id="main-thematic">
        <div className="main-thematic__content">
          <h2 className="tx-centered">La thématique plus en profondeur</h2>

          <div className="main-thematic__text">
            <p>
              L’accès à un emploi, la possibilité de pratiquer le sport de ses rêves, la capacité de vivre
              de manière autonome, … autant de préoccupations essentielles pour les personnes en situation
              d’handicap. Mais, grâce à la technologie, les individus concernés peuvent bénéficier de solutions
              adaptées permettant de surmonter les difficultés. Simples ou élaborées, conventionnelles ou innovantes,
              créées par des associations ou des start-ups, ces réalisations techniques apportent une aide concrète.
              Handicap et technologie : Adaptons le monde pour tous !, découvrons cette thématique plus en profondeur.
            </p>

          <h5 className="tx-centered">Qu’entend-on par handicap ?</h5>

          <p>
            Le terme "handicap" réfère à la limitation des possibilités d'interaction d'un individu avec son environnement,
            menant à des difficultés. On distingue différents types d’handicap :
          </p>
        </div>

          <ul>
            <li>
              <h6>Handicap physique</h6>
              <p>Recouvre l’ensemble des troubles pouvant entraîner une atteinte partielle ou totale de la motricité</p>
            </li>
            <li>
              <h6>Handicap sensoriel</h6>
              <p>Regroupe les difficultés liées aux organes sensoriels, avec notamment le handicap visuel et auditif</p>
            </li>
            <li>
              <h6>Handicap mental</h6>
              <p>Concerne une difficulté à comprendre ou encore une limitation dans la rapidité des fonctions
                de la compréhension</p>
            </li>
            <li>
              <h6>Handicap cognitif</h6>
              <p>Regroupe des difficultés en termes de facultés d'apprentissage ou de perception de l'environnement</p>
            </li>
          </ul>

          <p>
            Le handicap est souvent défini comme une inégalité de moyens, et faute de moyen,
            il peut devenir un facteur d’exclusion.
          </p>

          <br/>
          <h5>La technologie peut-elle aider ?</h5>

          <p>
            Bien sûr, elle peut tout d’abord sensibiliser notre société à cette problématique ou encore apporter des
            solutions pour améliorer la qualité de vie.
          </p>

          <h6>Quand la technologie sert à sensibiliser ?</h6>
          <p>
            La marginalisation des personnes handicapées est un vrai problème. Ce sont, d’abord, les petites
            différences du quotidien et puis c’est aussi le regard des autres. Sensibiliser à une telle problématique
            n’est pas chose facile. Pour cela, il faudrait parvenir à se glisser dans la peau d’une personne vivant
            en situation de handicap, permettant de comprendre ses limitations, la façon de les surmonter, de conserver
            ou de retrouver son autonomie. La technologie permet tout cela. Citons par exemple les combinaisons de
            vieillissement, permettant de simuler une perte d’autonomie ou encore les casques de réalité virtuelle
            permettant de s’immerger dans une situation de handicap.
          </p>

          <h6>La technologie, au service de la qualité de vie ?</h6>
          <p>
            La technologie peut aussi se mettre au service du handicap lui-même. Une technologie quotidienne la plus
            lambda peut s’avérer un véritable gain d’autonomie pour les personnes en situation de handicap. Prenez
            donc votre smartphone : pour les personnes souffrant de déficience visuelle, il existe des applications
            décrivant de façon audible son environnement à l’usager, tel qu’il est capté par la caméra du téléphone.
            Pour les personnes malentendantes, il existe des applications permettant de retranscrire à l’écrit les
            paroles d’une conversation orale sur votre smartphone, en attribuant une couleur à chaque interlocuteur.
            Pour les personnes à mobilité réduite, il existe des applications permettant de signaler les lieux facilement
            accessibles en fauteuil. Et ce ne sont que quelques exemples. Les nouvelles technologies peuvent permettre
            aux personnes en situation de handicap de recouvrer leur autonomie, de compenser leurs manques. C’est ce
            genre d’améliorations et d’innovations qui améliorent la qualité de vie malgré le handicap… et d’abaisser
            les barrières entre personnes handicapées et personnes valides.
          </p>

          <h6>Et si le handicap était source d'innovation ?</h6>
          <p>
            L’innovation au service du handicap, oui – mais le handicap au service de l’innovation, aussi !
            Le handicap est souvent l’origine trop oubliée d’innovations qui ont aujourd’hui rejoint notre quotidien.
            Mais cela ne veut pas dire qu’il n’y a pas encore beaucoup de chemin à faire. 
          </p>

          <p>
            Et si, ensemble, nous adaptions le monde pour tous ! A vous de jouer : quelles solutions pouvons-nous
            développer pour rendre l’impossible possible pour les personnes en situation d’handicap ? “Malgré la
            différence, on est capable de faire les mêmes choses… voire même parfois mieux !” [Flavien Gelly – influencer]. 
          </p>

          <br/>
          <h5>Références :</h5>

          <p>
            •	<a href="https://fr.wikipedia.org/wiki/Handicap">https://fr.wikipedia.org/wiki/Handicap</a><br/>
            •	<a href="https://www.boutique-box-internet.fr/actualites/handicap-technologie/">https://www.boutique-box-internet.fr/actualites/handicap-technologie/</a><br/>
            •	<a href="https://blog.ipedis.com/accessibilite-handicapes-nouvelles-technologie">https://blog.ipedis.com/accessibilite-handicapes-nouvelles-technologie</a><br/>
            •	<a href="https://www.forbes.fr/technologie/la-technologie-au-service-des-personnes-en-situation-de-handicap/">https://www.forbes.fr/technologie/la-technologie-au-service-des-personnes-en-situation-de-handicap/</a><br/>
            •	<a href="https://www.lesechos.fr/thema/mobilites-innovations/mobilites-le-handicap-un-moteur-dinnovations-sous-estime-1038277">https://www.lesechos.fr/thema/mobilites-innovations/mobilites-le-handicap-un-moteur-dinnovations-sous-estime-1038277</a><br/>
            •	<a href="https://www.nouvelobs.com/societe/20190529.AFP7500/handicap-l-innovation-technologique-pour-relever-le-defi-de-l-accessibilite.html">https://www.nouvelobs.com/societe/20190529.AFP7500/handicap-l-innovation-technologique-pour-relever-le-defi-de-l-accessibilite.html</a>
          </p>

        </div>
      </div>
    );
  }

}
