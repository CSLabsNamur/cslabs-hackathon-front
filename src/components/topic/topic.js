import React, { Component } from "react";
import "./topic.css";

export class Topic extends Component {

    render() {

        let className = "info-area";

        if (this.props.right) {
            className += " right";
        } else {
            className += " left";
        }

        return (
            <div className="row">
                <div className={className}>
                    <img src={this.props.img.src} alt={this.props.img.alt} className="info-img" />
                    <div className="info-text">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}
