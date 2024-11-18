import React from "react";
import { PageHero } from "@/components/page-hero/page-hero";
import { Topic } from "@/components/topic/topic";

import "./sponsors.page.css";
import { SponsorLogo } from "@/components/sponsor-logo/sponsor-logo";

// noinspection HtmlUnknownAnchorTarget
export class SponsorsPage extends React.PureComponent {
  render() {
    return (
      <div id="sponsors-page">

        <PageHero title="Nos partenaires" subtitle="Sans eux, rien ne serait possible !" hasArrow>
          <div className="sponsors-page__sponsors-list">
            <SponsorLogo href="#unamur" title="Université de Namur" uri="/sponsors/unamur.png"/>
            <SponsorLogo href="#nadi" title="Institut NADI" uri="/sponsors/nadi.png"/>
            <SponsorLogo href="#linkube" title="LinKube" uri="/images/logo/linkube_short.png"/>
            {/* <a href="#odoo" aria-label="Odoo"> */}
            {/*   <SponsorLogo title="Odoo" uri="/images/logo/logo_odoo.png" /> */}
            {/* </a> */}
          </div>
        </PageHero>

        <Topic img={{
          src: "/sponsors/unamur.png",
          alt: "Université de Namur",
        }} link="https://www.unamur.be/info" direction="right">
          <h2 id="unamur" className="on-white">
            Université de Namur
          </h2>
          <p className="on-white">
            L'Université de Namur et la Faculté d'Informatique nous fournissent les locaux et le matériel nécessaires à
            l'organisation de cet évènement.
          </p>
        </Topic>

        <Topic img={{
          src: "/sponsors/nadi.png",
          alt: "Institut NaDI",
        }} link="https://www.unamur.be/fr/nadi" direction="left">
          <h2 id="nadi">
            Institut NaDI
          </h2>
          <p>
            Au sein de NaDI, les chercheurs apportent des solutions innovantes aux nouveaux défis sociétaux posés par la
            révolution digitale (eGov, eHealth, eServices, Big data, etc.). Issus de différentes disciplines, les
            chercheurs croisent leurs expertises en informatique, technologie, éthique, droit, management ou sociologie.
            Regroupant six centres de recherche, le Namur Digital Institute offre une expertise multidisciplinaire
            unique dans tous les domaines de l'informatique, de ses applications et de son impact social.
          </p>
        </Topic>

        <Topic img={{
          src: "/sponsors/linkube.png",
          alt: "LinKube",
        }} link="https://www.linkube.be" direction="right">
          <h2 id="linkube">
            LinKube
          </h2>

          <p>
            LinKube est l’<b>incubateur étudiant</b> de la province de <b>Namur</b>.
          </p>
          <p>
            Nous avons pour mission d’<b>accompagner des jeunes</b> (étudiants ou jeunes diplômés) <b>à créer leur
            entreprise en parallèle de leurs études</b> ou de leurs premiers pas dans la vie active.
          </p>
          <p>
            Pour ce faire, nous proposons du <b>coaching personnalisé</b>, de l’<b>expertise</b> « business »,
            des ateliers sur des thématiques boostantes et liées à à l’entrepreneuriat, un lieu propice au travail (le
            TRAKK), etc.</p>
          <p>
            <b>Envie d'en savoir plus ?</b> N’hésite pas à contacter <a href="mailto:cdu@bep.be"><b>Coralie Dufloucq</b></a> pour
            un premier rendez-vous ! 😉
          </p>
          <p>
            Alors… Partant.e.s ?
          </p>
        </Topic>

        {/* <Topic img={{ */}
        {/*   src: "/sponsors/odoo-logo.png", */}
        {/*   alt: "Odoo", */}
        {/* }} */}
        {/*        link="https://www.odoo.com/fr_FR" */}
        {/*        direction="left"> */}
        {/*   <h2 id="odoo"> */}
        {/*     Odoo */}
        {/*   </h2> */}
        {/*   <p> */}
        {/*     We are a Belgian IT company proposing a complete and flexible software solution.<br/> */}
        {/*     Odoo's unique value proposition is to cover a large business scope and be at the same time very easy to use */}
        {/*     and fully integrated. */}
        {/*   </p> */}
        {/*   <p> */}
        {/*     If you're passionate about development, then it's time to come and do your internship or find a job in a */}
        {/*     company with a great Open Source project where your work will count */}
        {/*   </p> */}
        {/*   <p> */}
        {/*     Our stack: */}
        {/*     <ol> */}
        {/*       <li>Programming languages: Python & Javascript</li> */}
        {/*       <li>Database: postgresql (with object relational mapping)</li> */}
        {/*       <li>Collaboration plateform: GitHub</li> */}
        {/*       <li>Development model: open with external community</li> */}
        {/*       <li>Framework: Odoo (ORM, Workflows, Report Engine, Bi, AI)</li> */}
        {/*     </ol> */}
        {/*   </p> */}
        {/* </Topic> */}
      </div>
    );
  }
}
