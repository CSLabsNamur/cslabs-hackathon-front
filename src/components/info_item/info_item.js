
import React, { Component } from "react";

import "./info_item.css";

export class InfoItem extends Component {

    render() {
        return (
            <div className="info-item-area">
                <div className="row">
                    <div className="col col-lg-6">
                        <h2>{this.props.title}</h2>

                        <div className="info-item-content">
                            {this.props.children}
                        </div>
                    </div>
                    <div className="col col-lg-6">
                        <img src={process.env.REACT_APP_PUBLIC_URL + this.props.icon}
                             alt="Icon"
                             className="info-item-icon"/>
                    </div>
                </div>
            </div>
        );
    }

}
