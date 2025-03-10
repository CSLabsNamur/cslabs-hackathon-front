import React from "react";

import "./page-hero.css";

export class PageHero extends React.PureComponent<{
  title: string,
  subtitle: string,
  disclaimer?: React.ReactElement,
  hasArrow?: boolean,
  children?: React.ReactNode,
}> {

  render() {
    let logo = "/images/logo.png";
    const agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("edge") > -1 || agent.indexOf("firefox") > -1) logo = "/images/logo/logo.svg";

    let arrow = null;
    if (this.props.hasArrow) {
      arrow = (
        <img className="page-hero__arrow"
             src={import.meta.env.VITE_PUBLIC_URL + "/infos/arrow_green.svg"}
             alt="Flèche vers le bas"
             onClick={() => {
               window.scrollTo(0, window.innerHeight - 48);
             }}/>
      );
    }

    let disclaimer = null;
    if (this.props.disclaimer) {
      disclaimer = <div className="disclaimer on-green">
        {this.props.disclaimer}
      </div>;
    }

    return (
      <div>
        <header>
          <div className="page-hero">
            <div className="page-hero__logo-hackathon">
              <div className="inner">
                <div className="front">
                  <img src={import.meta.env.VITE_PUBLIC_URL + logo}
                       alt="Logo Hackathon 2025"
                  />
                </div>
                <div className="back">
                  {/* <img src={ import.meta.env.VITE_PUBLIC_URL + '/images/logo_pizzathon_2023.png'}
                       alt="Logo Pizzathon 2024"
                  /> */}
                  <img src={import.meta.env.VITE_PUBLIC_URL + logo}
                       alt="Logo Hackathon 2025"
                  />
                </div>
              </div>
            </div>
            <div className="page-hero__content">
              <h1 className="title on-green">
                {this.props.title}
              </h1>
              <h2 className="subtitle on-green">
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
