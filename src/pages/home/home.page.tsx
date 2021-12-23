import React from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../../components/page-hero/page-hero";
import { SponsorLogo } from "../../components/sponsor-logo/sponsor-logo";
import {Topic} from '../../components/topic/topic';
import {RegistrationInfo} from '../../components/inscription-info/registration-info';

import './home.page.css';
import {MainThematic} from '../../components/main-thematic/main-thematic';

export class HomePage extends React.PureComponent {

  private images = [
    {
      src: process.env.PUBLIC_URL + "/images/cslabs_junior.jpg",
      alt: "CSLabs Junior Entreprise"
    },
    {
      src: process.env.PUBLIC_URL + "/images/old_hands.jpg",
      alt: "Thème du Hackathon CSLabs"
    },
    {
      src: process.env.PUBLIC_URL + "/images/edition.jpg",
      alt: "Troisième Édition CSLabs"
    },
    {
      src: process.env.PUBLIC_URL + "/images/hackathon_irl.jpg",
      alt: "Hackathon Compétition"
    },
    {
      src: process.env.PUBLIC_URL + "/images/prix.png",
      alt: "Récompense"
    }
  ];

  render() {
    return (
      <div id="home-page">

        <PageHero
          title="Le bien vieillir"
          hasArrow={true}
          subtitle="Repenser la technologie pour tous"
          disclaimer={
            <div>
              <p><strong>Du 18 au 20 février à l'UNamur</strong></p>
              <p>Le Hackathon CSLabs 2021 est organisé dans le cadre du 50e anniversaire de la Faculté d'Informatique</p>
              <Link to="/sponsors">
                  <SponsorLogo  title="Université de Namur"
                                uri="/sponsors/logo_facinfo.png" />
              </Link>
              <Link to="/sponsors">
                  <SponsorLogo  title="50 ans de l'université"
                                uri="/sponsors/logo_50ans_petit.png" />
              </Link>
            </div>}>
        </PageHero>

        {/*<MainCarousel />*/}

        <Topic img={this.images[0]} direction='right'>
          <h2>CSLabs</h2>
          <p>
            CSLabs est une junior entreprise de la région de Namur.
            Spécialisée dans l'informatique, elle invite ses membres à
            participer à des projets, des formations et des activités dans le
            domaine technologique et informatique.
          </p>
        </Topic>

        <Topic img={this.images[1]} direction='left'>
          <h2>Le thème</h2>
          <p>
            Nos ainés sont quotidiennement confrontés à la technologie qui
            évolue à une vitesse prodigieuse. Comment peuvent-ils
            l'appréhender ? La comprendre ? L'utiliser ?
          </p>
          <p>
            Trouvez des solutions innovantes face à des problèmes réels.
            Développez de nouveaux concepts afin de rendre leur vie meilleure.
          </p>
          <p>Retrouvez <a href="#main-thematic">la thématique</a> plus en détail !</p>
        </Topic>

        <Topic img={this.images[4]} direction="right">
          <h2>Gagner un prix</h2>
          <p>
            Envie de remporter un de nos prix ? Un jury et le public désigneront trois vainqueurs !
          </p>
          <p>
            Le <strong>prix de l'idée</strong> est attribué par le jury à la meilleure idée de projet !
          </p>
          <p>
            Le <strong>prix de la technique</strong> est, lui aussi par le jury, attribué à la meilleure
            réalisation technique !
          </p>
          <p>
            Le <strong>prix du public</strong> est attribué au projet qui aura séduit le plus d'équipes !
          </p>
        </Topic>

        <Topic img={this.images[2]} direction="left">
          <h2>Troisième édition</h2>
          <p>
            Nous en sommes à notre troisième édition du Hackathon CSLabs !
            Nous avons hâte de poursuivre l'aventure avec vous !
          </p>
          <p>
            Cette édition est celle de la réalisation !
            La concrétisation de vos projets nous importe dans la mesure où
            il est envisageable <Link to="/plus-loin">d'aller plus loin</Link> et donc d'apporter votre contribution à l'amélioration du Bien Vieillir !
          </p>
        </Topic>

        <Topic img={this.images[3]} direction='right'>
          <h2>
            Hackathon
          </h2>
          <p>
            Un Hackathon est un moment de courte durée où des équipes
            réfléchissent à une <a href="#main-thematic">thématique particulière</a>. Ils tentent d'y
            apporter des solutions en développant des projets innovants.
            À la fin de l'évènement, un jury détermine quels sont les projets
            qui ont retenu leur attention et qui ont donc gagné la compétition.
          </p>
        </Topic>

        <RegistrationInfo />

        <MainThematic />

      </div >
    );
  }

}
