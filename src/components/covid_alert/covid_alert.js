
import React, {PureComponent} from "react";

export class CovidAlert extends PureComponent {

    render() {

        return (
            <p className="alert alert-danger info--alert align-center">
                Sous réserve des mesures nécessaires dues à
                l'épidémie <b>Covid-19</b>, l'événement est reporté pour mars
                ou octobre 2021.</p>
        );

    }

}
