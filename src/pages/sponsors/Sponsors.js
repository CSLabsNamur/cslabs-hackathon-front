import React, {Component} from 'react';

import Hero from "../../components/hero/hero";
import {Topic} from "../../components/topic/topic";

import "./Sponsors.css";

export class Sponsors extends Component {

    render() {
        return (
            <div id="home-page">
                <Hero title='Sponsors du hackathon' content='Sans eux, rien ne serait possible !' hasArrow>
                    <div id="sponsors-list">
                        <a href="#ag_insurance">
                            <img className="sponsor-img"
                                 src={"https://www.aginsurance.be/_Layouts/15/images/AG.Portal/AGInsurance_logo.svg"}
                                 alt="Sponsor AG Insurance"/>
                        </a>
                        <a href="#mutualite_chretienne">
                            <img className="sponsor-img"
                                 src={"https://www.mc.be/media/Logo_MC_button_sans_slogan_PNG_tcm49-28476.png"}
                                 alt="Sponsor Mutualité Chrétienne"/>
                        </a>
                        <a href="#trakk">
                            <img className="sponsor-img"
                                 src={"https://www.challenge-entreprendre.be/media/media558d6a755880a.png"}
                                 alt="Sponsor Trakk"/>
                        </a>
                        <a href="#trakk">
                            <img className="sponsor-img"
                                 src={"https://www.bep.be/wp-content/themes/syltaen/_2_assets/img/logo_bep.png"}
                                 alt="Sponsor BEP"/>
                        </a>
                        <a href="#gerontopole">
                            <img className="sponsor-img"
                                 src={process.env.REACT_APP_PUBLIC_URL + "gerontopole.png"}
                                 alt="Gérontopôle Namur"/>
                        </a>
                    </div>
                </Hero>


                <Topic img={{
                    src: "https://www.aginsurance.be/_Layouts/15/images/AG.Portal/AGInsurance_logo.svg",
                    alt: "AGInsurance"
                }}
                       link="https://www.aginsurance.be"
                       right>
                    <h2 id="ag_insurance">
                        AG Insurance
                    </h2>
                    <p>
                        Vous voulez faire la différence ? Pour nos clients, vos collègues et vous-même ? Prendre des
                        responsabilités, faire avancer les choses et obtenir des résultats, ça vous parle ? Chez AG,
                        c’est parfaitement possible. Vous y trouverez un environnement de travail professionnel,
                        dynamique et chaleureux où vous pourrez réellement faire avancer les choses. Montrez-nous ce que
                        vous avez dans le ventre. Osez en faire plus pour nos clients et vos collègues. Et prenez votre
                        carrière en main.
                    </p>
                    <p>
                        Lancez-vous. Optez pour un super job chez le premier assureur du pays.
                    </p>
                </Topic>


                <Topic img={{
                    src: process.env.REACT_APP_PUBLIC_URL + "mc_eneo.png",
                    alt: "Mutualité Chrétienne"
                }}
                       link="https://www.mc.be/"
                       left>
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
                    src: process.env.REACT_APP_PUBLIC_URL + "trakk_bep.png",
                    alt: "Trakk et BEP"
                }}
                       link="https://www.trakk.be"
                       right>
                    <h2 id="trakk">
                        Trakk et BEP
                    </h2>
                    <p>Étudiant ou jeune diplômé plein d’idée ? La niak d’entreprendre et de mener un projet de A jusque
                        Z ? Sais-tu que LinKube, l’incubateur étudiant du BEP de la province de Namur, t’offre un
                        accompagnement spécifique : coaching personnalisé, ateliers, expertises pointues,… Tu rêves de
                        monter ta start up ? Contacte-nous !</p>
                    <p>Mais le TRAKK, c’est quoi ? Tu as envie d’oser, expérimenter, entreprendre, innover de façon plus
                        créative ? Le TRAKK, c’est 3 partenaires : le KIKK, l’UNamur et le BEP. 3 fois plus d’idées et
                        d’expériences à partager dans ce lieu composé de différents espaces mis à ta disposition :
                        coworking, bureaux, fablab,… Rejoindre le TRAKK peut se faire par différentes portes ! Celle du
                        bâtiment au plein centre de Namur, ou en participant à des conférences, des ateliers, ou encore
                        en venant y travailler ! </p>
                    <p>L’innovation est partout ! Le BEP a d’ailleurs développé un accompagnement spécifique pour la
                        Silver économie, cette économie dédiée aux seniors. Tu veux apporter ta pierre à l’édifice pour
                        le « bien vieillir » ? Encore une fois, le BEP est là ! </p>
                    <p>Le 11 février 2021 le Mind&Market se tiendra au TRAKK et rassemblera tous les projets sur la
                        Silver économie et issus de LinKube. Un chemin de possibles s’offre à toi pour concrétiser tes
                        beaux projets. On en discute ?</p>
                </Topic>


                <Topic img={{src: process.env.REACT_APP_PUBLIC_URL + "gerontopole.png", alt: "Gérontôpole Namur"}}
                       link="https://www.province.namur.be/index.php?rub=page&page=912"
                       left>
                    <h2 id="gerontopole">
                        Gérontopôle Namur
                    </h2>
                    <p>
                        GéroNam, le Gérontopôle de la province de Namur est un projet développé à l’initiative de la
                        Province de Namur et co-construit avec des acteurs issus des secteurs du bien-vieillir. Il se
                        définit comme une communauté de personnes et d’organisations. Il est une ressource territoriale
                        pour les citoyens, l’ensemble des professionnels et des acteurs du bien-vieillir. C’est une
                        communauté d’échanges et d’actions qui place la personne âgée au centre de la réflexion et de
                        l’action. Sa finalité est centrée sur les aînés et s’articule autour de 4 axes :
                        <ul>
                            <li>L'autonomie</li>
                            <li>La qualité de vie</li>
                            <li>L'inclusion</li>
                            <li>L'empowerment</li>
                        </ul>
                        Envie de nous rejoindre ou de soumettre une idée ? Contactez-nous au 081 77 56 62 ou par mail
                        gerontopôle[@]province.namur.be
                    </p>
                </Topic>
            </div>
        )
    }

}
