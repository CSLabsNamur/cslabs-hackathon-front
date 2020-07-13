import React, { Component } from 'react';

import Hero from "../../components/hero/hero";
import MainCarousel from "../../components/main_carousel/main_carousel";
import { Topic } from "../../components/topic/topic";
import { MainThematic } from "../../components/main_thematic/main_thematic";
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
            }
        ];

        return (
            <div id="home-page">
                <Hero
                    title="Le bien vieillir"
                    content="Repenser la technologie pour tous"
                    disclaimer="Du 23 au 25 Octobre à l'UNamur"
                    getStarted="infos"
                    hasBtn
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
                </Topic>

                <Topic img={images[2]} right>
                    <h2>Troisième édition</h2>
                    <p>
                        Nous en sommes à notre troisième édition du Hackathon CSLabs !
                        Nous avons hâte de poursuivre l'aventure avec vous !
                    </p>
                </Topic>

                <Topic img={images[3]} left>
                    <h2>
                        Hackathon
                    </h2>
                    <p>
                        Un Hackathon est un moment de courte durée où des équipes
                        réfléchissent à une thématique particulière. Ils tentent d'y
                        apporter des solutions en développant des projets innovants.
                        À la fin de l'évènement, un jury détermine quels sont les projets
                        qui ont retenu leur attention et qui ont donc gagné la compétition.
                    </p>
                </Topic>

                <MainThematic/>

            </div>
        )
    }
}

export default Home;
