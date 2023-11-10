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
      alt: "CSLabs Junior Entreprise",
    },
    {
      src: process.env.PUBLIC_URL + "/images/image_thème.png",
      alt: "Thème du Hackathon CSLabs",
    },
    {
      src: process.env.PUBLIC_URL + "/images/edition.jpg",
      alt: "Cinquième Édition CSLabs",
    },
    {
      src: process.env.PUBLIC_URL + "/images/hackathon_irl.jpg",
      alt: "Hackathon Compétition",
    },
    {
      src: process.env.PUBLIC_URL + "/images/hackathon_award.jpg",
      alt: "Récompense",
    }
  ];

  render() {
    return (
      <div id="home-page">

        <PageHero
          title={process.env.REACT_APP_NAME_EVENT || "Le Hackathon"}
          hasArrow={true}
          subtitle={process.env.REACT_APP_SLOGAN_EVENT || "CSLabs Hackathon"}
          disclaimer={
            <div>
              <p><strong>Du {process.env.REACT_APP_DATE_EVENT} à l'UNamur</strong></p>
              <Link to="/sponsors">
                  <SponsorLogo  title="Université de Namur"
                                uri="/sponsors/unamur.png" />
              </Link>
              <a href="https://www.cslabs.be/">
                  <SponsorLogo  title="CSLabs"
                                uri="/images/logo/CSLabs.png" />
              </a>
            </div>}>
        </PageHero>

        <Topic img={this.images[0]} direction='right'>
          <h2>CSLabs</h2>
          <p>
          Le Computer Science Labs est une junior entreprise issue de la Faculté d’Informatique de
          l’Université de Namur. Pratiquement, ses actions s’articulent autour de la réalisation de projets, 
          de la formation des membres sur des thématiques liées à l'informatique et 
          de l'organisation d'événements.
          </p>
          <p>
          <strong>Notre mission : </strong>"Offrir l'opportunité aux étudiants d'entreprendre dans le domaine de l'informatique"
          </p>
        </Topic>

        <Topic img={this.images[1]} direction='left'>
          <h2>Le thème</h2>
          <p>
            Trouvez des solutions innovantes pour faire face à des problèmes réels.
            Développez de nouveaux concepts afin de rendre leur vie meilleure.
          </p>
          <p>Retrouvez <a href="#main-thematic" className="topic-link on-green">la thématique</a> plus en détail !</p>
        </Topic>

        <Topic img={this.images[4]} direction="right">
          <h2>Gagner un prix</h2>
          <p>
            Envie de remporter un de nos prix ?
          </p>
          <p>
            Le <strong>prix de l'innovation</strong> est attribué par le jury au projet le plus innovant !
          </p>
          <p>
            Le <strong>prix de la technique</strong> est, lui aussi par le jury, attribué à la meilleure
            réalisation technique !
          </p>
          <p>
            Le <strong>prix du public</strong> sera attribué au projet préféré du public !
          </p>
        </Topic>

        <Topic img={this.images[2]} direction="left">
          <h2>Cinquième édition</h2>
          <p>
            Nous en sommes à la cinquième édition du Hackathon CSLabs !
            Nous avons hâte de poursuivre l'aventure avec vous !
          </p>
          <p>
            La concrétisation de vos projets nous importe, dans la mesure où
            il est envisageable <Link to="/plus-loin" className="topic-link on-green">d'aller plus loin</Link>, et donc d'apporter votre contribution à l'amélioration du système éducatif. 
          </p>
        </Topic>

        <Topic img={this.images[3]} direction='right'>
          <h2>
            Hackathon
          </h2>
          <p>
            Un Hackathon est un moment de courte durée où des équipes
            réfléchissent à une <a href="#main-thematic" className="topic-link">thématique particulière</a>. Elles tentent d'y
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
