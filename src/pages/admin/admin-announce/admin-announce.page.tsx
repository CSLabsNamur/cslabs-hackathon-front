import React, {FormEvent} from "react";
import {AdminService} from "../../../services/admin.service";

enum AdminAnnounceField {
  SUBJECT = 'subject',
  ANNOUNCE = 'announce',
}

export class AdminAnnouncePage extends React.Component<{}, {
  form: {
    subject: string,
    announce: string,
  }
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      form: {
        subject: "",
        announce: "",
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
    const {subject, announce} = this.state.form;
    AdminService.sendAnnounce(subject, announce)
      .then(() => {
        alert("Annonce envoyée !")
      })
      .catch((error) => {
        console.error(error);
        alert("Impossible d'envoyer l'annonce...");
      });
  }

  render() {
    return (
      <div>
        <form className="form-container" onSubmit={this.onSubmit}>
          <h2 className="tx-centered">Envoyer une annonce aux membres inscrits</h2>

          <div className="form-control">
            <label htmlFor="form-subject">
              Sujet
            </label>
            <input type="text" name="form-subject" placeholder="Sujet..."
                   onChange={this.onChange(AdminAnnounceField.SUBJECT)}
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
