import React from "react";

import "./sponsor-logo.css";
import { Link } from "react-router-dom";

export class SponsorLogo extends React.PureComponent<{
  title: string,
  uri: string,
  href?: string,
  to?: string,
  newTab?: boolean,
}> {

  render() {
    const img = (
      <img
        src={import.meta.env.VITE_PUBLIC_URL + this.props.uri}
        alt={this.props.title}
        title={this.props.title}
      />
    );

    if (this.props.to) {
      return (
        <div className="sponsor-logo">
          <Link to={this.props.to} aria-label={this.props.title}>
            {img}
          </Link>
        </div>
      );
    } else {
      return (
        <div className="sponsor-logo">
          <a href={this.props.href} aria-label={this.props.title} target={this.props.newTab ? "_blank" : undefined}
             rel={this.props.newTab ? "noopener noreferrer" : undefined}>
            {img}
          </a>
        </div>
      );
    }
  }
}
