
import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./hero.css";

export class Hero extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

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
                    <img id="hero--arrow"
                         src={process.env.REACT_APP_PUBLIC_URL + "infos/arrow.svg"}
                         alt="Arrow"
                         onClick={() => {
                             window.scrollTo(0, window.innerHeight);
                         }}/>
                );
            }
        }

        return (
            <div>
                <header>
                     <div className="hero-area">
                         <img src={process.env.REACT_APP_PUBLIC_URL + "logo_hackathon_2020.png"}
                              id="logo-hackathon"
                              alt="Logo Hackathon"/>
                         <div className="hero-content">
                             <h1 className="title">
                                 {this.props.title}
                             </h1>
                             <h2 className="subtitle">
                                 {this.props.content}
                             </h2>
                             <div className="hero-disclaimer">
                                 {this.props.disclaimer}
                             </div>
                             {getStarted()}
                             {this.props.children}
                         </div>
                     </div>
                    {getArrow()}
                </header>
            </div>
        )

    }

}
