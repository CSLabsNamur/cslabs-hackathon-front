import React from "react";

import "./page-hero.css";

export class PageHero extends React.PureComponent<{
  title: string,
  subtitle: string,
  disclaimer?: React.ReactElement,
  hasArrow?: boolean,
  children: React.ReactNode,
}> {

  render() {

    let arrow = null;
    if (this.props.hasArrow) {
      arrow = (
        <img className="page-hero__arrow"
             src={process.env.PUBLIC_URL + "/infos/arrow_green.svg"}
             alt="Flèche vers le bas"
             onClick={() => {
               window.scrollTo(0, window.innerHeight - 48);
             }}/>
      );
    }

    let disclaimer = null;
    if (this.props.disclaimer) {
      disclaimer = <div className="disclaimer">
        {this.props.disclaimer}
      </div>
    }

    return (
      <div>
        <header>
          <div className="page-hero">
            <div className="page-hero__logo-hackathon">
              <div className="inner">
                <div className="front">
                  <img src={ process.env.PUBLIC_URL + '/images/logo_hackathon_2024.png'}
                       alt="Logo Hackathon 2024"
                  />
                </div>
                <div className="back">
                  <img src={ process.env.PUBLIC_URL + '/images/logo_pizzathon_2023.png'}
                       alt="Logo Pizzathon 2024"
                  />
                </div>
              </div>
            </div>
            <div className="page-hero__content">
              <h1 className="title">
                {this.props.title}
              </h1>
              <h2 className="subtitle">
                {this.props.subtitle}
              </h2>
              {disclaimer}
              {this.props.children}
            </div>
          </div>
          {arrow}
        </header>
      </div>
    );
  }

}
