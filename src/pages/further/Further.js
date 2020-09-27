import React, {Component} from "react";
import {Hero} from "../../components/hero/hero";

import "./Further.css";

export class Further extends Component {

    render() {
        return (
            <div id={"further-page"}>

                <Hero
                    title="Aller plus loin"
                    content="Un avenir pour ton projet"
                    hasArrow
                />

                <div className="row">

                    <div className="further-content">

                        <div className="further-sponsor">
                            <h1 className="tx-centered">Le TRAKK</h1>

                            <h5>Toutes tes idées ont un avenir !</h5>

                            <ul>
                                <li>Étudiant ou jeune diplômé plein d’idée ? La niak d’entreprendre et de mener un
                                    projet de A jusque Z ?
                                    Sais-tu que LinKube, l’incubateur étudiant du BEP de la province de Namur, t’offre
                                    un accompagnement spécifique : coaching personnalisé, ateliers, expertises pointues,
                                    … Tu rêves de monter ta start-up ? <a href="https://www.trakk.be/">Contacte-nous
                                        !</a>
                                </li>
                                <li>Mais le TRAKK, c’est quoi ? Tu as envie d’oser, expérimenter, entreprendre, innover
                                    de
                                    façon plus
                                    créative ? Le TRAKK, c’est 3 partenaires : le KIKK, l’UNamur et le BEP. 3 fois plus
                                    d’idées
                                    et
                                    d’expériences à partager dans ce lieu composé de différents espaces mis à ta
                                    disposition
                                    :
                                    coworking, bureaux, fablab, … Rejoindre le TRAKK peut se faire par différentes
                                    portes !
                                    Celle du
                                    bâtiment au plein centre de Namur, ou en participant à des conférences, des
                                    ateliers, ou
                                    encore
                                    en venant y travailler !
                                </li>
                                <li>L’innovation est partout ! Le BEP a d’ailleurs développé un accompagnement
                                    spécifique
                                    pour la
                                    Silver économie, cette économie dédiée aux seniors. Tu veux apporter ta pierre à
                                    l’édifice
                                    pour
                                    le « bien vieillir » ? Encore une fois, le BEP est là !
                                </li>
                            </ul>

                            <p>Le <b>11 février 2021</b> le Mind&Market se tiendra au TRAKK et rassemblera tous les
                                projets sur la
                                Silver économie et issus de LinKube. </p>
                            <p>Un chemin de possibles s’offre à toi pour concrétiser tes beaux projets. On en discute
                                ?</p>
                        </div>

                        <div className="further-sponsor">
                            <h1 className={"tx-centered"}>La Mutualité Chrétienne</h1>

                            <p>La <a href="https://www.mc.be/">Mutualité Chrétienne</a> sera à tes côtés pour
                                t'accompagner dans la réalisation de ton
                                projet, pour qu'il colle au mieux aux besoins du terrain : </p>

                            <ul>
                                <li>Test par des aînés, des professionnels de l'aide ou du soin, des aidants proches ;
                                </li>
                                <li>Conseils pour améliorer ton projet au regard des besoins ;</li>
                                <li>Validation de ton projet par le public-cible ;</li>
                                <li>Communication et diffusion auprès du public-cible quand ton projet est opérationnel !
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}
