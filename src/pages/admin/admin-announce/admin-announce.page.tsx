import React, {FormEvent} from "react";
import { Link } from "react-router-dom";
import {AdminService} from "../../../services/admin.service";

import './admin-announce.page.css';

enum AdminAnnounceField {
  SUBJECT = 'subject',
  ANNOUNCE = 'announce',
  ADDRESSEE = 'addressee',
}

export class AdminAnnouncePage extends React.Component<{}, {
  form: {
    subject: string,
    announce: string,
    addressee: string,
  }
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      form: {
        subject: "",
        announce: "",
        addressee: "",
      }
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(field: AdminAnnounceField) {
    return (event: any) => {
      const newState: any = {...this.state};
      newState.form[field] = event.target.value;
      this.setState(newState);
    }
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();
    const {subject, announce, addressee} = this.state.form;
    addressee.replace(/ /g, ''); // remove space before and after the sting
    if ((addressee === null) || ( !(['all', 'formation'].includes(addressee)))) 
    {
      alert("Compléter suivant les guillements"); 
      return null;
    }
    AdminService.sendAnnounce(subject, announce, addressee)
      .then(() => {
        alert("Annonce envoyée !")
      })
      .catch((error) => {
        console.error(error);
        alert("Impossible d'envoyer l'annonce...\nRaison: " + error);
      });
  }

  render() {
    return (
      <div>
        <form className="form-container" onSubmit={this.onSubmit}>
          <h2 className="tx-centered">Envoyer une annonce aux membres inscrits</h2>

          <div id="back-button">
            <Link to="/admin" className="tx-centered"><button className="button-primary-outlined button-large">Retour</button></Link>
          </div>

          <div className="form-control">
            <label htmlFor="form-subject">
              Sujet
            </label>
            <input type="text" name="form-subject" placeholder="Sujet..."
                   onChange={this.onChange(AdminAnnounceField.SUBJECT)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="form-subject">
              Destinatair(e)s <br />
              Entré "all" pour envoyé à tout le monde et "formation" pour les gens inscrit aux formations
            </label>
            <input type="text" name="form-subject" placeholder="Envoyé à qui ?"
                    onChange={this.onChange(AdminAnnounceField.ADDRESSEE)}
            />          
          </div>

          <div className="form-control">
            <label htmlFor="form-announce">
              Message
            </label>
            <textarea name="form-announce" id="form-comment"
                      maxLength={2048}
                      placeholder="Votre annonce..."
                      onChange={this.onChange(AdminAnnounceField.ANNOUNCE)}
            />
          </div>

          <div className="form-control tx-centered">
            <input className="button button-primary" type="submit" value="Envoyer" />
          </div>

        </form>
      </div>
    );
  }

}
