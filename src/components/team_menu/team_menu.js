import React, { Component } from "react";
import { Link } from "react-router-dom";

import './team_menu.css'

export class TeamMenu extends Component {
    constructor(props) {
        super(props);
        if (props.urls) {
            this.state = {
                urls: [
                    {
                        'url': '/no/',
                        'content': 'empty',
                    }
                ]
            }
        } else {
            this.state = {
                urls: props.urls,
            };
        }
    }

    render() {
        return (
            <div className="TeamMenu">
                <ul className="TeamElements">
                    <li><Link to="/team/edit">Mon équipe</Link></li>
                    <li><Link to="/team/user">Moi</Link></li>
                    <li><Link to="/team/all/">Autres équipes</Link></li>
                    <li><Link to="/team/vote">Votes</Link></li>
                </ul>
            </div>
        );
    }

}
