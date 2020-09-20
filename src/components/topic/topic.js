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

        let image = (
            <img src={this.props.img.src}
                 alt={this.props.img.alt}
                 loading="lazy"
                 className="info-img" />
        );

        if (this.props.link) {
            image = (
                <a href={this.props.link}>
                    {image}
                </a>
            );
        }

        return (
            <div className={rowClassName}>
                <div className={className}>
                    {image}
                    <div className="info-text">
                        {this.props.children}
                        {this.props.link ?
                            <a className="info-sponsor-link" href={this.props.link}>Site officiel.</a>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }

}
