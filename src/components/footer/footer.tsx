import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export class Footer extends React.PureComponent {
  render() {
    return (
      <footer id="footer">
        <div className="footer__content">
          <div className="footer__content__left">
            <Link to="https://cslabs.be" className="on-green">❤️ CSLabs</Link>
          </div>
          <div className="footer__content__right">
            <Link to="/cookie-policy" className="on-green">Politique de cookies</Link>
          </div>
        </div>
      </footer>
    );
  }
}
