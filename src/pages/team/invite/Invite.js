import React, {Component} from "react";
import {Link} from "react-router-dom";

export class Invite extends Component {

    render() {

        return (
            <div>
                <p>Vous vous apprétez à rejoindre une équipe dans le cadre du hackathon. Veuillez à bien allez lire
                    les <Link to="/infos">informations</Link> quant à celui-ci. Afin qu'une participation soit valide il
                    est nécessaire de payer une caution de 20€. Vous pouvez néanmoins déjà vous inscrire sur le site et
                    rejoindre une équipe.</p>
                <form>
                    <div className="form-control">
                        <label htmlFor="input-invitation">Code d'invitation</label>
                        <input type="text"
                               placeholder="Entrez le code d'invitation dans l'équipe ici..."
                               id="input-invitation"
                               name="input-invitation"/>
                    </div>
                    <div className="form-control">
                        <input type="checkbox"
                               id="invitation-accept-rules"
                               name="invitation-accept-rules"
                               value="accept-rules"/>
                        <label htmlFor="invitation-accept-rules">
                            Je veux participer au hackathon et vais payer la <strong>caution de 20€</strong>.
                        </label>
                    </div>
                    <div className="form-control align-center">
                        <button type="submit" className="button-primary">Rejoindre l'équipe</button>
                    </div>
                </form>
            </div>
        );

    }

}
