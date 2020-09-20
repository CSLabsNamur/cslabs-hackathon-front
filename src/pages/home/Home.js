import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Hero from "../../components/hero/hero";
import MainCarousel from "../../components/main_carousel/main_carousel";
import { Topic } from "../../components/topic/topic";
import { MainThematic } from "../../components/main_thematic/main_thematic";
import {HomeInscriptionInfo} from "../../components/home_inscription_info/home_inscription_info";

import './Home.css';

export class Home extends Component {
    render() {

        const images = [
            {
                src: process.env.REACT_APP_PUBLIC_URL + "cslabs_junior.jpg",
                alt: "CSLabs Junior Entreprise"
            },
            {
                src: process.env.REACT_APP_PUBLIC_URL + "old_hands.jpg",
                alt: "Thème du Hackathon CSLabs"
            },
            {
                src: process.env.REACT_APP_PUBLIC_URL + "edition.jpg",
                alt: "Troisième Édition CSLabs"
            },
            {
                src: process.env.REACT_APP_PUBLIC_URL + "hackathon_irl.jpg",
                alt: "Hackathon Compétition"
            },
            {
                src: process.env.REACT_APP_PUBLIC_URL + "hackathon_award.jpg",
                alt: "Récompense"
            }
        ];

        return (
            <div id="home-page">
                <Hero
                    title="Le bien vieillir"
                    content="Repenser la technologie pour tous"
                    disclaimer={
                        <div>
                            <p>Du 23 au 25 Octobre à l'UNamur</p>
                            <p>Le Hackathon CSLabs 2020 est organisé dans le cadre du 50e anniversaire de la Faculté d'Informatique.</p>
                            <Link to="/sponsors">
                                <img className="sponsor-img"
                                     src={process.env.REACT_APP_PUBLIC_URL + "sponsors/logo_facinfo.png"}
                                     alt="Université de Namur" />
                            </Link>
                            <Link to="/sponsors">
                                <img className="sponsor-img"
                                     src={process.env.REACT_APP_PUBLIC_URL + "sponsors/logo_50ans_petit.png"}
                                     alt="50 ans de l'Université" />
                            </Link>
                        </div>}
                    hasArrow
                />

                <div className="row gallery-carousel">
                    <MainCarousel/>
                </div>

                <Topic img={images[0]} right>
                    <h2>CSLabs</h2>
                    <p>
                        CSLabs est une junior entreprise de la région de Namur.
                        Spécialisée dans l'informatique, elle invite ses membres à
                        participer à des projets, des formations et des activités dans le
                        domaine technologique et informatique.
                    </p>
                </Topic>

                <Topic img={images[1]} left>
                    <h2>Le thème</h2>
                    <p>
                        Nos ainés sont quotidiennement confrontés à la technologie qui
                        évolue à une vitesse prodigieuse. Comment peuvent-ils
                        l'appréhender ? La comprendre ? L'utiliser ?
                    </p>
                    <p>
                        Trouvez des solutions innovantes face à des problèmes réels.
                        Développez de nouveaux concepts afin de rendre leur vie meilleure.
                    </p>
                    <p>Retrouvez <a href="#thematic-area">la thématique</a> plus en détail !</p>
                </Topic>

                <Topic img={images[4]} right>
                    <h2>Gagner un prix</h2>
                    <p>
                        Envie de remporter un de nos prix ? Un jury et le publique désigneront trois vainqueurs !
                    </p>
                    <p>
                        Le <strong>prix de l'idée</strong> sera attribué par le jury à la meilleure idée de projet !
                    </p>
                    <p>
                        Le <strong>prix de la technique</strong> sera, lui aussi par le jury, attribué à la meilleure
                        réalisation technique !
                    </p>
                    <p>
                        Le <strong>prix du publique</strong> est attribué au projet qui aura séduit le plus d'équipes !
                    </p>
                </Topic>

                <Topic img={images[2]} left>
                    <h2>Troisième édition</h2>
                    <p>
                        Nous en sommes à notre troisième édition du Hackathon CSLabs !
                        Nous avons hâte de poursuivre l'aventure avec vous !
                    </p>
                    <p>
                        Cette édition est celle de la réalisation !
                        La concrétisation de vos projets nous importe dans la mesure où
                        il est envisageable <Link to="/plus-loin">d'aller plus loin</Link> et donc d'apporter votre contribution à l'amélioration du Bien Vieillir !
                    </p>
                </Topic>

                <Topic img={images[3]} right>
                    <h2>
                        Hackathon
                    </h2>
                    <p>
                        Un Hackathon est un moment de courte durée où des équipes
                        réfléchissent à une <a href="#thematic-area">thématique particulière</a>. Ils tentent d'y
                        apporter des solutions en développant des projets innovants.
                        À la fin de l'évènement, un jury détermine quels sont les projets
                        qui ont retenu leur attention et qui ont donc gagné la compétition.
                    </p>
                </Topic>

                <HomeInscriptionInfo/>

                <MainThematic/>

            </div>
        )
    }
}

export default Home;
