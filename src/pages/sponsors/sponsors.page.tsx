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

        <PageHero title="Nos sponsors" subtitle="Sans eux, rien ne serait possible !" hasArrow>
          <div className="sponsors-page__sponsors-list">
            <SponsorLogo href="#unamur" title="Université de Namur" uri="/sponsors/unamur.png"/>
            <SponsorLogo href="#nadi" title="Institut NADI" uri="/sponsors/nadi.png"/>
            <SponsorLogo href="#bep" title="BEP" uri="/images/logo/bep.png"/>
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
          alt: "Institut NADI",
        }} link="https://www.unamur.be/fr/nadi" direction="left">
          <h2 id="nadi">
            Institut NADI
          </h2>
          {/* TODO */}
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus est et exercitationem fuga harum in
            itaque maxime molestiae nihil odit omnis provident quibusdam quidem, recusandae repudiandae saepe sint
            velit, veritatis!</p>
        </Topic>

        <Topic img={{
          src: "/sponsors/bep.png",
          alt: "BEP",
        }} link="https://www.bep.be" direction="right">
          <h2 id="bep">
            Trakk et BEP
          </h2>
          <p>
            Étudiant ou jeune diplômé plein d’idée ? La niak d’entreprendre et de mener un projet de A jusque
            Z ? Sais-tu que LinKube, l’incubateur étudiant du BEP de la province de Namur, t’offre un
            accompagnement spécifique : coaching personnalisé, ateliers, expertises pointues,… Tu rêves de
            monter ta start up ? Contacte-nous !
          </p>
          <p>
            Mais le TRAKK, c’est quoi ? Tu as envie d’oser, expérimenter, entreprendre, innover de façon plus
            créative ? Le TRAKK, c’est 3 partenaires : le KIKK, l’UNamur et le BEP. 3 fois plus d’idées et
            d’expériences à partager dans ce lieu composé de différents espaces mis à ta disposition :
            coworking, bureaux, fablab,… Rejoindre le TRAKK peut se faire par différentes portes ! Celle du
            bâtiment au plein centre de Namur, ou en participant à des conférences, des ateliers, ou encore
            en venant y travailler !
          </p>
          <p>
            L’innovation est partout ! Le BEP a d’ailleurs développé un accompagnement spécifique pour la
            Silver économie, cette économie dédiée aux seniors. Tu veux apporter ta pierre à l’édifice pour
            le « bien vieillir » ? Encore une fois, le BEP est là !
          </p>
          <p>
            Le 11 février 2021 le Mind&Market se tiendra au TRAKK et rassemblera tous les projets sur la
            Silver économie et issus de LinKube. Un chemin de possibles s’offre à toi pour concrétiser tes
            beaux projets. On en discute ?
          </p>
        </Topic>


        <Topic img={{
          src: "/sponsors/linkube.png",
          alt: "LinKube",
        }} link="https://www.linkube.be" direction="left">
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
            <b>Envie d'en savoir plus ?</b>
          </p>
          <p>
            N’hésite pas à contacter Coralie Dufloucq : <a href="mailto:cdu@bep.be"><b>cdu@bep.be</b></a> pour un
            premier rendez-vous ! ;-)
          </p>
          <p>
            Déjà quelques informations sur notre site
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
