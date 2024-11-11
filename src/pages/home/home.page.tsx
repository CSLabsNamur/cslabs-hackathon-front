import React from "react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/page-hero/page-hero";
import { SponsorLogo } from "@/components/sponsor-logo/sponsor-logo";
import { Topic } from "@/components/topic/topic";
import { RegistrationInfo } from "@/components/inscription-info/registration-info";

import "./home.page.css";
import { MainThematic } from "@/components/main-thematic/main-thematic";

export class HomePage extends React.PureComponent {

  private images = [
    {
      src: import.meta.env.VITE_PUBLIC_URL + "/images/cslabs_junior.jpg",
      alt: "CSLabs Junior Entreprise",
    },
    {
      src: import.meta.env.VITE_PUBLIC_URL + "/images/image_thème.png",
      alt: "Thème du Hackathon CSLabs",
    },
    {
      src: import.meta.env.VITE_PUBLIC_URL + "/images/edition.jpg",
      alt: "Cinquième Édition CSLabs",
    },
    {
      src: import.meta.env.VITE_PUBLIC_URL + "/images/hackathon_irl.jpg",
      alt: "Hackathon Compétition",
    },
    {
      src: import.meta.env.VITE_PUBLIC_URL + "/images/hackathon_award.jpg",
      alt: "Récompense",
    },
  ];

  render() {
    return (
      <div id="home-page">

        <PageHero
          title={import.meta.env.VITE_NAME_EVENT || "Le Hackathon"}
          hasArrow={true}
          subtitle={import.meta.env.VITE_SLOGAN_EVENT || "CSLabs Hackathon"}
          disclaimer={
            <div className="on-green">
              <p><strong>Du {import.meta.env.VITE_DATE_EVENT} à l'Université de Namur</strong></p>
              <div className="home-page__logo_list">
                <SponsorLogo to="/sponsors" title="Université de Namur"
                             uri="/sponsors/unamur.png"/>
                <SponsorLogo href="https://cslabs.be/" newTab title="CSLabs"
                             uri="/images/logo/CSLabs.svg"/></div>
            </div>
          }>
        </PageHero>

        <Topic img={this.images[0]} direction="right">
          <h2 className="on-white">CSLabs</h2>
          <p className="on-white">
            Le Computer Science Labs est une junior entreprise issue de la Faculté d’Informatique de
            l’Université de Namur. Pratiquement, ses actions s’articulent autour de la réalisation de projets,
            de la formation des membres sur des thématiques liées à l'informatique et
            de l'organisation d'événements.
          </p>
          <p className="on-white">
            <strong>Notre mission : </strong>"Offrir l'opportunité aux étudiants d'entreprendre dans le domaine de
            l'informatique"
          </p>
        </Topic>

        <Topic img={this.images[1]} direction="left">
          <h2 className="on-green">Le thème</h2>
          <p className="on-green">
            Trouvez des solutions innovantes pour faire face à des problèmes réels.
            Développez de nouveaux concepts afin de rendre leur vie meilleure.
          </p>
          <p className="on-green">Comment l'informatique peut-elle contribuer à la promotion et à la préservation du
            patrimoine culturel ?</p>
          <p className="on-green">Retrouvez <a href="#main-thematic" className="topic-link on-green">la
            thématique</a> plus en détail !</p>
        </Topic>

        <Topic img={this.images[4]} direction="right">
          <h2 className="on-white">Gagner un prix</h2>
          <p className="on-white">
            Envie de remporter un de nos prix ?
          </p>
          <p className="on-white">
            Le <strong>prix de l'innovation</strong> est attribué par le jury au projet le plus innovant !
          </p>
          <p className="on-white">
            Le <strong>prix de la technique</strong> est, lui aussi par le jury, attribué à la meilleure
            réalisation technique !
          </p>
          <p className="on-white">
            Le <strong>prix du public</strong> sera attribué au projet préféré du public !
          </p>
        </Topic>

        <Topic img={this.images[2]} direction="left">
          <h2 className="on-green">Notre Hackathon</h2>
          <p className="on-green">
            Nous en sommes à la sixième édition du Hackathon du CSLabs !
            Nous avons hâte de vous retrouver pour cette nouvelle édition !
          </p>
          <p className="on-green">
            Cet événement nous tient particulièrement à cœur, car il est multidisciplinaire et ouvert à tous et à
            toutes.
            Aucune compétence spécifique n'est requise pour notre Hackathon, ce qui permet à chacun d'apporter sa
            créativité et ses idées.
          </p>
          <p className="on-green">
            La concrétisation de vos projets nous importe, dans la mesure où
            il est envisageable <Link to="/plus-loin" className="topic-link on-green">d'aller plus loin</Link>, et donc
            d'apporter une contribution réelle !
          </p>
        </Topic>

        <Topic img={this.images[3]} direction="right">
          <h2 className="on-white">
            Hackathon
          </h2>
          <p className="on-white">
            Un Hackathon est un moment de courte durée où des équipes
            réfléchissent à une <a href="#main-thematic" className="topic-link">thématique particulière</a>. Elles
            tentent d'y
            apporter des solutions en développant des projets innovants.
            À la fin de l'évènement, un jury détermine quels sont les projets
            qui ont retenu leur attention et qui ont donc gagné la compétition.
          </p>
        </Topic>

        <RegistrationInfo/>

        <MainThematic/>
      </div>
    );
  }
}
