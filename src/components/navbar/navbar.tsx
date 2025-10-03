import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./navbar.css";
import { UserContext } from "@/contexts/user.context.ts";

export class Navbar extends React.Component<{}, {
  showMenu: boolean,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      showMenu: false,
    };
  }

  renderLinks() {
    return (
      <Fragment>
        {/* <UserContext.Consumer> */}
        {/*   {value => (!value?.user ? ( */}
        {/*     <li className="on-white"><Link to="/inscription">S'inscrire</Link></li> */}
        {/*   ) : null)} */}
        {/* </UserContext.Consumer> */}

        {/* <li className="on-white"><Link to="/partenaires">Partenaires</Link></li> */}
        {/* <li className="on-white"><Link to="/infos">Infos</Link></li> */}
        <li className="on-white"><Link to="/plus-loin">Plus loin</Link></li>

        {/* <UserContext.Consumer> */}
        {/*   {value => (value?.user ? ( */}
        {/*     <Fragment> */}
        {/*       <li className="on-white"><Link to="/team">Ma team</Link></li> */}
        {/*       {value.user.isAdmin ? ( */}
        {/*         <li className="on-white"><Link to="/admin">Admin</Link></li> */}
        {/*       ) : null} */}
        {/*       <li className="on-white"><Link to="/deconnexion">Déconnexion</Link></li> */}
        {/*     </Fragment> */}
        {/*   ) : ( */}
        {/*     <li className="on-white"><Link to="/connexion">Connexion</Link></li> */}
        {/*   ))} */}
        {/* </UserContext.Consumer> */}
      </Fragment>
    );
  }

  render() {
    return (
      <nav>
        <div className="nav-container navbar">
          <div className="nav-logo">
            <Link to="/" className="on-white navbar__title">Hackathon</Link>
          </div>

          <ul className="nav-links on-white">
            {this.renderLinks()}
          </ul>

          <span tabIndex={0} className="mobile-menu-toggle on-white navbar__mobile-toggle"
                onClick={() => this.setState({showMenu: !this.state.showMenu})}/>

          {this.state.showMenu ? (
            <ul className="mobile-menu on-white menu navbar__mobile-menu">
              {this.renderLinks()}
            </ul>
          ) : null}

        </div>
      </nav>
    );
  }

}
