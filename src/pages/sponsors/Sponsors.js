import React, { Component } from 'react';

import Hero from "../../components/hero/hero";
import { Topic } from "../../components/topic/topic";

import "./Sponsors.css";

class Sponsors extends Component {

  render() {
    return (
      <div id="home-page">
        <Hero title='Sponsors du hackathon' content='Sans eux, rien ne serait possible !' hasArrow>
          <div id="sponsors-list">
            <a href="https://www.aginsurance.be">
              <img className="sponsor-img"
                src={"https://www.aginsurance.be/_Layouts/15/images/AG.Portal/AGInsurance_logo.svg"}
                alt="Sponsor AG Insurance" />
            </a>
            <a href="https://www.mc.be">
              <img className="sponsor-img"
                src={"https://www.mc.be/media/Logo_MC_button_sans_slogan_PNG_tcm49-28476.png"}
                alt="Sponsor Mutualité Chrétienne" />
            </a>
            <a href="https://www.trakk.be/">
              <img className="sponsor-img"
                src={"https://www.challenge-entreprendre.be/media/media558d6a755880a.png"}
                alt="Sponsor Trakk" />
            </a>
            <a href="https://www.bep.be">
              <img className="sponsor-img"
                src={"https://www.bep.be/wp-content/themes/syltaen/_2_assets/img/logo_bep.png"}
                alt="Sponsor BEP" />
            </a>
            <a href="https://www.province.namur.be/index.php?rub=page&page=912">
              <img className="sponsor-img"
                src={process.env.REACT_APP_PUBLIC_URL + "gerontopole.png"}
                alt="Gérontopôle Namur" />
            </a>
          </div>
        </Hero>
        <Topic img={{src: "https://www.aginsurance.be/_Layouts/15/images/AG.Portal/AGInsurance_logo.svg", alt: "AGInsurance"}} right>
          <h2>
            AG Insurance
          </h2>
          <p>
            Vous voulez faire la différence ? Pour nos clients, vos collègues et vous-même ? Prendre des responsabilités, faire avancer les choses et obtenir des résultats, ça vous parle ? Chez AG, c’est parfaitement possible. Vous y trouverez un environnement de travail professionnel, dynamique et chaleureux où vous pourrez réellement faire avancer les choses. Montrez-nous ce que vous avez dans le ventre. Osez en faire plus pour nos clients et vos collègues. Et prenez votre carrière en main. <br></br>Lancez-vous. Optez pour un super job chez le premier assureur du pays.
          </p>
        </Topic>
        <Topic img={{src: "https://www.mc.be/media/Logo_MC_button_avec_slogan_JPG_tcm49-28473.jpg", alt: "Mutualité Chrétienne"}} left>
          <h2>
            Mutualité Chrétienne
          </h2>
          <p>

          </p>
        </Topic>
        <Topic img={{src: "https://www.challenge-entreprendre.be/media/media558d6a755880a.png", alt: "Trakk et BEP"}} right>
          <h2>
            Trakk et BEP
          </h2>
          <p>
            <ul>
              <li>Étudiant ou jeune diplômé plein d’idée ? La niak d’entreprendre et de mener un projet de A jusque Z ? Sais-tu que LinKube, l’incubateur étudiant du BEP de la province de Namur, t’offre un accompagnement spécifique : coaching personnalisé, ateliers, expertises pointues,… Tu rêves de monter ta start up ? Contacte-nous !</li>
              <li>Mais le TRAKK, c’est quoi ? Tu as envie d’oser, expérimenter, entreprendre, innover de façon plus créative ? Le TRAKK, c’est 3 partenaires : le KIKK, l’UNamur et le BEP. 3 fois plus d’idées et d’expériences à partager dans ce lieu composé de différents espaces mis à ta disposition : coworking, bureaux, fablab,… Rejoindre le TRAKK peut se faire par différentes portes ! Celle du bâtiment au plein centre de Namur, ou en participant à des conférences, des ateliers, ou encore en venant y travailler ! </li>
              <li>L’innovation est partout ! Le BEP a d’ailleurs développé un accompagnement spécifique pour la Silver économie, cette économie dédiée aux seniors. Tu veux apporter ta pierre à l’édifice pour le « bien vieillir » ? Encore une fois, le BEP est là ! </li>
            </ul>
            Le 11 février 2021 le Mind&Market se tiendra au TRAKK et rassemblera tous les projets sur la Silver économie et issus de LinKube. Un chemin de possibles s’offre à toi pour concrétiser tes beaux projets. On en discute ?
          </p>
        </Topic>
        <Topic img={{src: process.env.REACT_APP_PUBLIC_URL + "gerontopole.png", alt: "Gérontôpole Namur"}} left>
          <h2>
            Gérontopôle Namur
          </h2>
          <p>
            GéroNam, le Gérontopôle de la province de Namur est un projet développé à l’initiative de la Province de Namur et co-construit avec des acteurs issus des secteurs du bien-vieillir. Il se définit comme une communauté de personnes et d’organisations. Il est une ressource territoriale pour les citoyens, l’ensemble des professionnels et des acteurs du bien-vieillir. C’est une communauté d’échanges et d’actions qui place la personne âgée au centre de la réflexion et de l’action. Sa finalité est centrée sur les aînés et s’articule autour de 4 axes :
            <ul>
              <li>L'autonomie</li>
              <li>La qualité de vie</li>
              <li>L'inclusion</li>
              <li>L'empowerment</li>
            </ul>
            Envie de nous rejoindre ou de soumettre une idée ? Contactez-nous au 081 77 56 62 ou par mail gerontopôle[@]province.namur.be
          </p>
        </Topic>
      </div>
    )
  }

}

export default Sponsors;
