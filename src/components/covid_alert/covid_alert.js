
import React, {PureComponent} from "react";

export class CovidAlert extends PureComponent {

    render() {

        return (
            <p className="alert alert-danger team-caution-alert align-center">
                La date du hackathon  est sujette à modification sous réserve des mesures
                nécessaires dues à l'épidémie <b>Covid-19</b> !
            </p>
        );

    }

}
