import React, {Component} from 'react';

import "./Infos.css";
import {InfoItem} from "../../components/info_item/info_item";
import {CovidAlert} from "../../components/covid_alert/covid_alert";

class Infos extends Component {

    render() {

        window.scrollTo(0, 0);

        return (
            <div id="info-page">
                <div>
                    <div className="infos-title">
                        <h1>Informations sur l'Hackathon</h1>
                        <h2>Adresse, lieu et commodités</h2>
                    </div>

                    <InfoItem title="Lieu du Hackathon" icon="infos/location.svg">
                        <p><b>Rue Grandgagnage 21</b></p>
                        <p>5000 Namur</p>
                        <p>Faculté d'Informatique de l'Université de Namur</p>
                    </InfoItem>

                    <InfoItem title="Date du Hackathon" icon="infos/info.svg">
                        <p>Le week-end du <b>23 au 25 octobre 2020</b>.</p>
                        <CovidAlert/>
                    </InfoItem>

                    <InfoItem title="Contact de l'Organisation" icon="infos/contact.svg">
                        <p>
                            Facebook: <a href="https://www.facebook.com/ComputerScienceLabs/">Page Facebook</a>
                        </p>
                        <p>Mail: events[@]cslabs.be</p>
                        <p>Serveur Discord: <a href="https://discord.gg/VgWDbPn">https://discord.gg/VgWDbPn</a></p>
                    </InfoItem>

                    <InfoItem title="Commodités" icon="infos/commodites.svg">
                        <p>Repos: <b>Salle avec des lits prévue</b></p>
                        <p>Repas: <b>Repas fournis (au Cercle Informatique)</b></p>
                        <p>Sanitaire: <b>Installations de l'Université</b></p>
                    </InfoItem>

                    <InfoItem title="Inscription" icon="infos/info.svg">
                        <p>Équipe: 4 membres maximum</p>
                        <p>Prix: <b>Gratuit</b></p>
                        <p>Caution: <b>20 €</b></p>
                        <p>Compte: <b>{process.env.REACT_APP_BANK_NUMBER}</b></p>
                        <p>Communication: <b>NOM Prénom</b></p>
                    </InfoItem>
                </div>
            </div>
        );
    }
}

export default Infos;
