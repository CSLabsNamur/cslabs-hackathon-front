import React from 'react';
import {PageHero} from '../../components/page-hero/page-hero';
import {Topic} from '../../components/topic/topic';

import './sponsors.page.css';
import {SponsorLogo} from '../../components/sponsor-logo/sponsor-logo';

// noinspection HtmlUnknownAnchorTarget
export class SponsorsPage extends React.PureComponent {
  render() {
    return (
      <div id="sponsors-page">

        <PageHero title='Nos sponsors' subtitle='Sans eux, rien ne serait possible !' hasArrow>
          <div className="sponsors-page__sponsors-list">
            <a href="#unamur" aria-label="Université de Namur">
              <SponsorLogo title="Université de Namur" uri="/sponsors/unamur.png" />
            </a>
            <a href="#bep" aria-label="BEP">
              <SponsorLogo title="BEP" uri="/images/logo/bep.png" />
            </a>
            <a href="#linkube" aria-label="LinKube">
              <SponsorLogo title="LinKube" uri="/images/logo/linkube.jpg" />
            </a>
            <a href="#odoo" aria-label="Odoo">
              <SponsorLogo title="Odoo" uri="/images/logo/logo_odoo.png" />
            </a>
            <a href='#WallonieEntreprendre' aria-label="Wallonie">
              <SponsorLogo title="Wallonie" uri="/images/logo/wallonie.png" />
            </a>
            {/*<a href="#mutualite_chretienne">
              <SponsorLogo title="Mutualité Chrétienne" uri="/images/logo/MC.png" />
            </a>
            <a href="#arhs">
              <SponsorLogo title="Arhs" uri="/images/logo/arhs.png" />
            </a>
            <a href="#digital-wallonia">
              <SponsorLogo title="Digital Wallonia" uri="/images/logo/digital_wallonia.png" />
            </a> */}
          </div>
        </PageHero>

        <Topic img={{
          src: "/sponsors/unamur_big.png",
          alt: "Faculté d'informatique de l'Université de Namur"
        }}
              link="https://www.unamur.be/info"
              direction="right">
          <h2 id="unamur" className='on-white'>
            Université de Namur
          </h2>
          <p className='on-white'>
            L'Université de Namur et la Faculté d'Informatique nous fournissent les locaux et le matériel nécessaires à
            l'organisation de cet évènement.
          </p>
        </Topic>

        <Topic img={{
          src: "/sponsors/bep.png",
          alt: "BEP"
        }}
               link="https://www.bep.be"
               direction="left">
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
          alt: "LinKube"
        }}
               link="https://www.linkube.be"
               direction="right">
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
            des ateliers sur des thématiques boostantes et liées à à l’entrepreneuriat, un lieu propice au travail (le TRAKK), etc.</p>
          <p>
            <b>Envie d'en savoir plus ?</b>
          </p>
          <p>
            N’hésite pas à contacter Coralie Dufloucq : <b>cdu@bep.be</b> pour un premier rendez-vous ! ;-)
          </p>
          <p>
            Déjà quelques informations sur notre site
          </p>  
          <p>
            Alors… Partant.e.s ?
          </p>
        </Topic>

        <Topic img={{
          src: "/sponsors/odoo-logo.png",
          alt: "Odoo"
        }}
               link="https://ag.be/jobs/fr"
               direction="left">
          <h2 id="odoo">
            Odoo
          </h2>
          <p>
            We are a Belgian IT company proposing a complete and flexible software solution.<br />
            Odoo's unique value proposition is to cover a large business scope and be at the same time very easy to use and fully integrated.
          </p>
          <p>
            If you're passionate about development, then it's time to come and  do  your  internship or find a job  in  a  company  with  a great Open Source project where your work will count
          </p>
          <p>
            Our stack:
            <ol>
              <li>Programming languages: Python & Javascript</li>
              <li>Database: postgresql (with object relational mapping)</li>
              <li>Collaboration plateform: GitHub</li>
              <li>Development model: open with external community</li>
              <li>Framework: Odoo (ORM, Workflows, Report Engine, Bi, AI)</li>
            </ol>
          </p>
        </Topic>

        <Topic img={{
          src: "/images/logo/WE_Simple_Positif_CMJN.png",
          alt: "Wallonie Entreprendre"
        }}
        link="https://www.wallonie-entreprendre.be/fr/"
        direction="right">
          <h2 id="WallonieEntreprendre">
            Wallonie Entreprendre
          </h2>

        </Topic>


        {/*<Topic img={{
          src: "/sponsors/mutualite_chretienne.png",
          alt: "Mutualité Chrétienne"
        }}
               link="https://www.mc.be/"
               direction="left">
          <h2 id="mutualite_chretienne">
            Mutualité Chrétienne
          </h2>
          <p>
            Forte de son histoire et de son expérience, la Mutualité chrétienne s'intègre dans un <b>environnement
            en évolution permanente</b>. L'ensemble du contexte social, économique et politique agit sur
            l'institution et sur les individus : le cadre législatif se complexifie, les nouvelles
            technologies s'imposent, de nouveaux besoins émergent dans le champ de la santé et des soins de
            santé. Dans ce contexte, la force et l'originalité de la Mutualité chrétienne résident dans son
            identité d'assureur social, de mouvement social et d'entrepreneur social.
          </p>
          <p>
            La Mutualité chrétienne, c'est un <b>réseau associatif dynamique</b> composé de services et de
            mouvements associés actifs dans le domaine de l'aide sociale, de la promotion de la santé et de
            l'éducation permanente des adultes et des jeunes.
          </p>
          <p>
            <b>Énéo</b>, le mouvement social des aînés, vise plus particulièrement à briser l'isolement des
            aînés en leur proposant des activités et actions de proximité, créant et facilitant le lien
            social, la convivialité, la connaissance, la pratique du sport et les sources de bien-être. En
            les informant de leurs droits et de l’actualité afin de développer leur esprit critique, Énéo a
            pour objectif de défendre et valoriser le rôle et la place des aînés dans la société, de manière
            collective tout en luttant contre les inégalités sociales.
          </p>
          <p>
            A travers sa mission d’entrepreneur social, la MC s’investit dans <b>l’innovation sociale</b> et
            technologique pour apporter des réponses aux défis sociaux et de santé, notamment liés aux
            enjeux du vieillissement de la population et de la perte d’autonomie.
          </p>
          <p>
            Entourée d'un réseau médico-social varié, la MC soutient et développe la création de services
            médico-sociaux efficaces et accessibles (Aides et Soins à Domicile, Qualias, Vitatel, Solival,
            Maisons de Repos (et de soins), hôpitaux,…) et se place comme un partenaire responsable à
            différents niveaux de pouvoir pour veiller à leur qualité.
          </p>
        </Topic>


        <Topic img={{
          src: "/sponsors/arhs.png",
          alt: "Arhs"
        }}
               link="https://www.arhs-group.com"
               direction="right">
          <h2 id="arhs">
            Arhs
          </h2>
          <p>
            Arηs Group est un leader du marché dans la gestion de projets et de systèmes informatiques complexes.
          </p>
          <p>
            Fondée au Luxembourg en 2003, nous avons depuis enregistré une croissance organique et nous comptons
            aujourd’hui 16 entités dans le monde avec plus de 2 500 employés au Luxembourg, en Belgique, en France,
            en Grèce, en Italie, au Portugal, en Bulgarie et dernièrement en Jordanie.
          </p>
          <p>
            Au cours des 20 dernières années au cours desquelles nous avons été au service de nos clients,
            nous avons grandi et élargi nos domaines d'expertise. Du développement logiciel, en passant par l'infrastructure,
            le Cloud ou encore le Machine Learning, nous maîtrisons et faisons évoluer en permanence de nouvelles compétences
            pour mener le changement dans le secteur informatique.
          </p>
          <p>
            Notre diversité est notre force. Nous voulons que chacun se sente accepté tel qu'il est... alors venez simplement comme vous êtes !
          </p>
        </Topic>

        <Topic img={{
          src: "/sponsors/digital_wallonia.png",
          alt: "Digital Wallonia"
        }}
               link="https://www.digitalwallonia.be"
               direction="left">
          <h2 id="digital-wallonia">
            Digital Wallonia
          </h2>

          <h5>Stratégie</h5>
          <p>
            Programme cadre de la Wallonie numérique qui fixe les priorités et objectifs des politiques
            publiques et cadre les soutiens aux initiatives privées en faveur du numérique.
          </p>

          <h5>Plateforme</h5>
          <p>
            Vitrine du secteur du numérique en Wallonie qui propose des contenus de référence et fournit des
            services aux acteurs engagés dans la mise en œuvre de la stratégie numérique.
          </p>

          <h5>Marque</h5>
          <p>
            Identité de l’ambition numérique de la Wallonie et de ses citoyens qui fédère les acteurs et les
            initiatives publiques et privées lancées dans le cadre de la stratégie numérique.
          </p>

          <h5>5 thèmes</h5>
          <ol>
            <li>Secteur du Numérique</li>
            <li>Économie numérique</li>
            <li>Compétences numériques</li>
            <li>Administration numérique</li>
            <li>Territoire numérique</li>
          </ol>
        </Topic> */}

      </div>
    );
  }
}
