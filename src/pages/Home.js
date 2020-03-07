import { Component } from 'inferno';
import { Hero } from '../Widgets'

class Home extends Component {
  render() {
    return (
      <div>
        <Hero title="Le bien vieillir" content="Repenser la technologie pour tous"></Hero>
        <section class="MainPage">
          <div>
            <h2>
              Le thème
            </h2>
            <p>
              Nos ainés sont quotidiennement confrontés à la technologie qui évolue à une vitesse prodigieuse. Comment peuvent-ils les appréhender ? Les comprendre ? Les utiliser ?
            </p>
            <p>
              Trouvez des solutions innovantes face à des problèmes réels. Développer de nouveaux concepts afin de rendre leur vie meilleure.
            </p>
            <img src="./old_hands.jpg" alt="Thème du Hackathon CSLabs" />
          </div>
          <div>
            <h2>
              Troisième édition
            </h2>
            <p>
              Nous en sommes à notre troisième édition du Hackathon CSLabs ! Nous avons hâte de poursuivre l'aventure avec vous !
            </p>
            <img src="./edition.jpg" alt="Troisième Édition CSLabs" />
          </div>
        </section>
        <section class="MainPage">
          <div>
            <h2>
              Hackathon
            </h2>
            <p>
              Un Hackathon est un moment de courte durée où des équipes réfléchissent à une thématique particulière. Ils tentent d'y apporter des solutions en développant des projets innovants. À la fin de l'évènement, un jury détermine quels sont les projets qui ont retenu leur attention et qui ont donc gagné la compétition.
            </p>
            <img src="hackathon_irl.jpg" alt="Hackathon Compétition"></img>
          </div>
          <div>
            <h2>
              CSLabs - ComputerScienceLabs
            </h2>
            <p>
              CSLabs est une junior entreprise de la région de Namur. Spécialisée dans l'informatique, elle invite ses membres à participer à des projets, des formations et des activités dans le domaine technologique et informatique.
            </p>
            <img src="cslabs_junior.jpg" alt="CSLabs Junior Entreprise"></img>
          </div>
        </section>
      </div>
    )
  }
}

export default Home;