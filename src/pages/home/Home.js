import React, { Component } from 'react';

import HeroWidget from "../../components/widgets/hero.widget";
import MainCarousel from "../../components/MainCarousel/main_carousel";
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <HeroWidget
            title="Le bien vieillir"
            content="Repenser la technologie pour tous"
            disclaimer="Du 23 au 25 Octobre à l'UNamur"
            getStarted="infos/"
            hasBtn={true} />
        <div className="row">
          <div className="col col-lg-6">
            <h2>
              Le thème
            </h2>
            <p>
              Nos ainés sont quotidiennement confrontés à la technologie qui évolue à une vitesse prodigieuse. Comment peuvent-ils l'appréhender ? La comprendre ? L'utiliser ?
            </p>
            <p>
              Trouvez des solutions innovantes face à des problèmes réels. Développez de nouveaux concepts afin de rendre leur vie meilleure.
            </p>
            <img src="./old_hands.jpg" alt="Thème du Hackathon CSLabs" />
          </div>
          <div className="col col-lg-6">
            <h2>
              Troisième édition
            </h2>
            <p>
              Nous en sommes à notre troisième édition du Hackathon CSLabs ! Nous avons hâte de poursuivre l'aventure avec vous !
            </p>
            <img src="./edition.jpg" alt="Troisième Édition CSLabs" />
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-6">
            <h2>
              Hackathon
            </h2>
            <p>
              Un Hackathon est un moment de courte durée où des équipes réfléchissent à une thématique particulière. Ils tentent d'y apporter des solutions en développant des projets innovants. À la fin de l'évènement, un jury détermine quels sont les projets qui ont retenu leur attention et qui ont donc gagné la compétition.
            </p>
            <img src="hackathon_irl.jpg" alt="Hackathon Compétition"/>
          </div>
          <div className="col col-lg-6">
            <h2>
              CSLabs - ComputerScienceLabs
            </h2>
            <p>
              CSLabs est une junior entreprise de la région de Namur. Spécialisée dans l'informatique, elle invite ses membres à participer à des projets, des formations et des activités dans le domaine technologique et informatique.
            </p>
            <img src="cslabs_junior.jpg" alt="CSLabs Junior Entreprise"/>
          </div>
        </div>

        <div className="row">
          <MainCarousel/>
        </div>

      </div>
    )
  }
}

export default Home;