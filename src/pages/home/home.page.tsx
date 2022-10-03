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
      src: process.env.PUBLIC_URL + "/images/tampon-en-attente.jpg",
      alt: "Thème du Hackathon CSLabs",
    },
    {
      src: process.env.PUBLIC_URL + "/images/edition.jpg",
      alt: "Troisième Édition CSLabs",
    },
    {
      src: process.env.PUBLIC_URL + "/images/hackathon_irl.jpg",
      alt: "Hackathon Compétition",
    },
    {
      src: process.env.PUBLIC_URL + "/images/prix.png",
      alt: "Récompense",
    }
  ];

  render() {
    return (
      <div id="home-page">

        <PageHero
          title="Le Handicap"
          hasArrow={true}
          subtitle="Adaptez le monde pour tous !"
          disclaimer={
            <div>
              <p><strong>Du 17 au 19 février à l'UNamur</strong></p>
              <p>Ce Hackathon 2023 est organisé dans le cadre du <strong>5e anniversaire du CSLabs</strong></p>
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

        {/*<MainCarousel />*/}

        <Topic img={this.images[0]} direction='right'>
          <h2>CSLabs</h2>
          <p>
            CSLabs est une junior entreprise de la région de Namur.
            Spécialisée dans l'informatique, elle invite ses membres à
            participer à des projets, des formations et des activités dans les
            domaines de la technologie et de l'informatique.
          </p>
          <p>
          <strong>Notre mission : </strong>"Offrir l'opportunité aux étudiants d'entreprendre dans le dommaine de l'informatique"
          </p>
        </Topic>

        <Topic img={this.images[1]} direction='left'>
          <h2>Le thème</h2>
          <p>
            Avoir un handicap est une chose, être exclus de la société par oubli des majorités en est une autre.
          </p>
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
            Le <strong>prix de l'idée</strong> est attribué par le jury à la meilleure idée de projet !
          </p>
          <p>
            Le <strong>prix de la technique</strong> est, lui aussi par le jury, attribué à la meilleure
            réalisation technique !
          </p>
          <p>
            Le <strong>prix de la participation</strong> sera dévoilé le jour J !
          </p>
        </Topic>

        <Topic img={this.images[2]} direction="left">
          <h2>Quatrième édition</h2>
          <p>
            Nous en sommes à la quatrième édition du Hackathon CSLabs !
            Nous avons hâte de poursuivre l'aventure avec vous !
          </p>
          <p>
            Cette édition est celle de la réalisation !
            La concrétisation de vos projets nous importe, dans la mesure où
            il est envisageable <Link to="/plus-loin" className="topic-link on-green">d'aller plus loin</Link>, et donc d'apporter votre contribution à l'amélioration des personnes touchés par le handicap !
          </p>
        </Topic>

        <Topic img={this.images[3]} direction='right'>
          <h2>
            Hackathon
          </h2>
          <p>
            Un Hackathon est un moment de courte durée où des équipes
            réfléchissent à une <a href="#main-thematic" className="topic-link">thématique particulière</a>. Ils tentent d'y
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
