
import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./hero.css";

class Hero extends Component {

    render() {

        const getStarted = () => {
            if (this.props.hasBtn) {
                return (
                    <Link to={this.props.getStarted} className="hero--button button button-primary button-large">
                        Plus d'infos !
                    </Link>
                );
            }
        }

        const getArrow = () => {
            if (this.props.hasArrow) {
                return (
                    <a href="#hero-end-anchor">
                        <img id="hero--arrow" src="./arrow.svg" alt="Arrow"/>
                    </a>
                );
            }
        }

        return (
            <div>
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
                        {this.props.children}
                    </div>
                    {getArrow()}
                </header>
                <p id="hero-end-anchor"></p>
            </div>
        )

    }

}

export default Hero;
