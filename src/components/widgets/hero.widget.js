
import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./hero.widget.css";

class HeroWidget extends Component {

    render() {

        // Pick a random color for this Hero
        // let colors = [
        //   'Green', 'Blue', 'Orange', 'Yellow', 'Red'
        // ]
        // let imgClass = '';
        // let img;
        // if (props.image) {
        //   alert(!props.image);
        //   imgClass = 'HeroImage';
        //   img = (
        //     <img src={props.image} alt={props.title}></img>
        //   )
        // }

        const getStarted = () => {
            if (this.props.hasBtn) {
                return (
                    <Link to={this.props.getStarted} className="get-started button button-primary button-large">
                        Plus d'infos !
                    </Link>
                )
            }
        }

        return (
            <header>
                <div className="hero-content">
                    <h1 className="title">
                        {this.props.title}
                    </h1>
                    <h2 className="subtitle">
                        {this.props.content}
                    </h2>
                    <p className="disclaimer">
                        {this.props.disclaimer}
                    </p>
                    {getStarted()}
                </div>
            </header>
        )

    }

}

export default HeroWidget;
