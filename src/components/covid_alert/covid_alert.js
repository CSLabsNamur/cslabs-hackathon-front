
import React, {PureComponent} from "react";

export class CovidAlert extends PureComponent {

    render() {

        return (
            <p className="alert alert-danger info--alert align-center">
                Sous réserve des mesures nécessaires dues à
                l'épidémie <b>Covid-19</b>, la date du hackathon est sujette à
                modification ! L'événement est également limite à 52 participants
                en équipes de <strong>4 personnes</strong> maximum.</p>
        );

    }

}
