import React from "react";

import "./topic.css";

export class Topic extends React.PureComponent<{
  link?: string,
  direction: "left" | "right",
  img: { src: string, alt: string },
  children: React.ReactNode,
}> {

  render() {
    const direction = this.props.direction;

    let image = (
      <img src={this.props.img.src}
           alt={this.props.img.alt}
           title={this.props.img.alt}
           loading="eager"
           className="topic-area__info__img"/>
    );
    if (this.props.link) {
      image = (
        <a href={this.props.link} target="_blank" rel="noopener noreferrer">
          {image}
        </a>
      );
    }

    return (
      <div className={"row topic-area " + direction}>
        <div className="topic-area__info">
          {image}
          <div className="topic-area__info__text">
            {this.props.children}
            {this.props.link ?
              <div className="tx-centered">
                <a className="topic-area__info__link button button-primary"
                   href={this.props.link} target="_blank" rel="noopener noreferrer">
                  Site officiel
                </a>
              </div>
              : null
            }
          </div>
        </div>
      </div>
    );
  }

}
