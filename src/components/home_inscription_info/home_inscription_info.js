import React, {PureComponent} from "react";
import {Link} from "react-router-dom";

export class HomeInscriptionInfo extends PureComponent {

    render() {
        return (
            <div className="row">
                <div className="col align-center" style={{margin: "1rem 0", fontSize: "1.25rem"}}>
                    <h2>Plongez ! Inscrivez vous !</h2>

                    <p>Le site vous permet de rejoindre une équipe afin de participer au hackathon. N'hésitez plus et
                        inscrivez vous !</p>
                    <p>L'inscription sur le site est gratuite. Cependant, la participation effective au hackathon demande
                        une caution de 20€.</p>

                    <div>
                        <Link to="/inscription"><button className="button button-primary">S'inscrire</button></Link>
                        <Link to="/infos"><button className="button button-primary">Plus d'informations</button></Link>
                    </div>
                </div>
            </div>
        );
    }

}
