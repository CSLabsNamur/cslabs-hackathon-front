import React, { Component } from "react";
import "./topic.css";

export class Topic extends Component {

    render() {

        let className = "info-area";
        let rowClassName = "row info-row";

        if (this.props.right) {
            className += " right";
            rowClassName += " right";
        } else {
            className += " left";
            rowClassName += " left";
        }

        return (
            <div className={rowClassName}>
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
