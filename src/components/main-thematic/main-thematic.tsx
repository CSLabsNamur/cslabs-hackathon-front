import React from 'react';

import { Topic } from '../topic/topic';

import './main-thematic.css';

const thematicReady = true;

export class MainThematic extends React.PureComponent {

  render() {
    if (!thematicReady) return (<div className="row" id="main-thematic">
        <div className="main-thematic__content">
          <h2 className="tx-centered on-white">La thématique plus en profondeur</h2>

          <p className='on-white'>Comming soon...</p>
        </div>
      </div>);

    return (
      <div className="row" id="main-thematic">
        <div className="main-thematic__content">
          <h2 className="tx-centered">La thématique plus en profondeur</h2>
          <h6 id="credits-subtitle">Par DigiFactory</h6>

            <div className="main-thematic__text">
              <p>
                Le décrochage scolaire représente un enjeu majeur en Europe. L&#39;éducation inclusive joue un rôle
                significatif dans la lutte contre ce phénomène, ceci en offrant des environnements d&#39;apprentissage
                adaptés à la diversité des apprenants et en contribuant ainsi à les retenir, à les motiver et à les
                intégrer plus efficacement dans le système éducatif.
              </p>
            </div>
              <div className="main-thematic__text">
                  <p>
                  <strong>Qu’entend-on exactement par éducation inclusive ?</strong> L&#39;éducation inclusive vise à garantir à chacun
                  des chances égales de s’engager, de participer pleinement, d’apprendre et de réussir, quelle que soit
                  sa situation et peu importe ses différences individuelles. Cela signifie reconnaître et respecter la
                  diversité parmi les apprenants, qu&#39;il s&#39;agisse de handicaps, de bagages culturels, de genre, de langues
                  parlées ou d&#39;autres particularités. L’éducation inclusive permet de réduire les inégalités de départ, de
                  promouvoir la diversité, et de créer une société où chacun se sent intégré et a l&#39;opportunité de
                  réaliser son potentiel, renforçant ainsi le tissu social et permettant à chacun de contribuer de
                  manière significative à la société tout en restant attaché à ses propres valeurs et capacités.
                </p>
              </div>
              
              <div className="main-thematic__text">
                <p>
                Dans l’enseignement inclusif, ce sont les écoles et les équipes pédagogiques qui adaptent
                les infrastructures, les méthodes et matériel pédagogiques afin que chaque élève se sente à sa place.
                Le système éducatif s&#39;adapte alors aux besoins de chaque élève, et non l&#39;inverse.
                </p>
              </div>
              
              <div  className="main-thematic__text">
                <p>
                Concrètement, comment peut-on mettre en place une éducation inclusive ? Il est possible de jouer
                sur plusieurs facteurs :
                </p>

                <div className="main-thematic__section">
                  <ul>
                    <li><strong>Accessibilité :</strong> en veillant à ce que les installations, le matériel pédagogique, les outils
                    technologiques et les ressources soient accessibles à tous les élèves, indépendamment de
                    leurs limitations.</li>
                    <li><strong>Adaptation et flexibilité :</strong> en adoptant une approche flexible de l’enseignement et mettre en
                    place des pratiques pédagogiques qui s&#39;adaptent aux différents styles d&#39;apprentissage,
                    capacités et besoins des élèves. Il s’agit par exemple des classes flexibles, des classes
                    autonomes, des aménagements spécifiques, de la différenciation…</li>
                    <li><strong>Diversité :</strong> en utilisant et en proposant des ressources pédagogiques variées, allant des
                    manuels et des outils scolaires dits « traditionnels » aux supports et outils numériques, ceci
                    afin de s&#39;assurer que chaque élève puisse avoir accès à un enseignement pertinent pour le
                    développement de son propre potentiel.</li>
                    <li><strong>Engagement et collaboration :</strong> en encourageant l’implication de l’ensemble des acteurs
                    (enseignants, direction, élèves, parents, accompagnateurs sociaux et paramédicaux) et leur
                    collaboration, notamment pour comprendre les besoins individuels des élèves et soutenir
                    ensemble et de manière cohérente leur apprentissage.</li>
                  </ul>
                </div>
              </div>

              <div className="main-thematic__text">
                <p>
                  Investir dans une éducation inclusive c’est faire en sorte d’aider chaque élève, quelques soient ses
                  particularités, à obtenir les meilleurs résultats et à participer pleinement à l’enseignement qu’on lui
                  offre. <strong>Dans ce contexte, il est évident que le recours au numérique peut aider.</strong> Le numérique offre
                  de réelles opportunités pour définir un cadre d’éducation inclusive. Les outils numériques
                  soutiennent notamment les élèves présentant des troubles DYS. Ils s’intègrent également pleinement
                  dans la prise en charge des élèves à besoins spécifiques. À titre d’exemples, les outils numériques
                  permettent entre autres la personnalisation des parcours éducatifs, la ludification des
                  apprentissages, les espaces d’apprentissages virtuels, l’apprentissage en ligne et à distance, les
                  supports multimédia, la communication, etc. Les opportunités sont nombreuses et de nouveaux
                  outils numériques sont continuellement en train de se développer à l’heure actuelle pour s’adapter
                  toujours mieux aux besoins de chaque apprenant, enseignant et formateur.
                </p>
              </div>

              <Topic 
                link="https://www.d1g1factory.org/"
                img = {{src: "/sponsors/DigiFactory.jpg", alt:"DigiFactory"}}
                direction="right">
                <h6>Remerciement</h6>
                <p>
                  Nous remercions particulièrement DigiFactory pour la rédaction de ce texte.
                </p>
              </Topic>  
          
        </div>
      </div>
    );
  }

}
