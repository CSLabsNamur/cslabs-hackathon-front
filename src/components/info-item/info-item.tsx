import React from 'react';

import './info-item.css';

export class InfoItem extends React.PureComponent<{
  title: string,
  icon: string,
}> {

  render() {
    return (
      <div className="info-item">
        <div className="row">
          <div className="col col-lg-6">
            <h2>{this.props.title}</h2>

            <div className="info-item__content">
              {this.props.children}
            </div>
          </div>
          <div className="col col-lg-6">
            <img src={process.env.PUBLIC_URL + this.props.icon}
                 alt="Icon"
                 className="info-item__icon"/>
          </div>
        </div>
      </div>
    );
  }

}
