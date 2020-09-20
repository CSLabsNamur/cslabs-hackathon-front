import React, {PureComponent} from "react";
import "./main_thematic.css";

export class MainThematic extends PureComponent {

    render() {

        return (
            <div className="row" id="thematic-area">
                <div className="thematic-content">
                    <h2 className="tx-centered">La thématique plus en profondeur</h2>

                    <div className="thematic-main-text">
                    <p>Bien vieillir, c'est s'appuyer sur les six dimensions de la santé positive pour se sentir bien.
                        En
                        d'autres termes, la santé positive vise à permettre à l'individu de s'adapter et de se sentir
                        bien
                        en s'appuyant sur ses ressources et celles de son environnement plus que d'avoir des paramètres
                        de
                        santé au maximum dans tous les domaines. </p>

                    <p>Quelles solutions pouvons-nous développer au regard des six dimensions de la santé pour permettre
                        à
                        nos grands-parents de garder un maximum d'autonomie et vivre une vie de qualité le plus
                        longtemps
                        possible en tenant compte des freins liés à différentes formes de dépendances (physiques,
                        mentales,
                        socio-économiques,…)? </p>

                    <p>Comment rendre accessibles les solutions digitales développées? </p>
                    </div>

                    <h5 className="tx-centered">Les 6 dimensions de la santé positive, regroupées en 3 catégories :</h5>

                    <ul>
                        <li>
                            <h6>Fonctions physiques et bien-être mental</h6>
                            <p>Comment améliorer sa condition physique? Comment surveiller et améliorer son
                                alimentation, son
                                sommeil ? Comment gérer ses douleurs? Comment suivre son traitement médical ? </p>
                            <p>Comment travailler sa mémoire, sa concentration ? Comment faciliter la communication vers
                                ses proches,
                                le personnel aidant/soignant? Comment améliorer la confiance en soi?</p>
                        </li>
                        <li>
                            <h6>Sens et participation</h6>
                            <p>Comment continuer à être utile en cas de perte d'autonomie ? Comment continuer à
                                apprendre de nouvelles choses ou à transmettre son vécu ? Comment éviter la fracture
                                numérique ?</p>
                            <p>Comment vivre des activités de loisirs adaptées? Comment garder le lien social avec ses
                                proches, ses amis, la famille ? Comment s’entourer ? Quelles sont les ressources autour
                                de chez soi en termes de clubs, associations, actions, … ?</p>
                            <p>Comment favoriser la participation à des événements de société (débats, conférences, …) ?
                                Comment soutenir ou contester ? Comment se faire entendre ? Comment participer au débat
                                politique ?</p>
                        </li>
                        <li>
                            <h6>Qualité de vie et fonctionnement quotidien</h6>
                            <p>Comment se sentir en sécurité et bien chez soi ou à l'extérieur ? Comment éviter des fins
                                de mois difficiles ? Comment la personne peut-elle rester autonome dans ses déplacements
                                (chez elle, dans la rue, dans la ville/village) même en cas de perte d'autonomie ?
                                Comment améliorer la gestion du temps pour que les journées soient agréables et
                                respectent le rythme de la personne (entre RDV médicaux, repas, sorties,
                                visites,…) ? </p>
                        </li>
                    </ul>

                </div>
            </div>
        );

    }

}
