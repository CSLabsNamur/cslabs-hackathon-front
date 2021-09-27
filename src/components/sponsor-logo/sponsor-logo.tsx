import React from "react";

import './sponsor-logo.css';

export class SponsorLogo extends React.PureComponent<{
  title: string,
  uri: string,
}> {

  render() {
    return (
      <img
        className="sponsor-logo__img"
        src={ process.env.PUBLIC_URL + this.props.uri }
        alt={ this.props.title }
        title={ this.props.title }
      />
    );
  }

}
