import React, {Component} from "react";
import {Modal} from "../../components/modal/modal";
import {Redirect} from "react-router";

export class PasswordReset extends Component {

    constructor(props) {
        super(props);

        const query = new URLSearchParams(props.location.search);
        const token = query.get("token");

        this.state = {
            token: !!token ? token : null,
            email: "",
            password: "",
            password_confirm: "",
            validate: {
                email: null,
                password: null,
                password_confirm: null
            },
            modals: {
                request_sent: false,
                password_changed: false
            },
            redirect: false
        }

        this._isMounted = false;

        this.on_reset_request_submit = this.on_reset_request_submit.bind(this);
        this.on_change_password_submit = this.on_change_password_submit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    set_modal(name, new_value) {
        if (this._isMounted) {
            const modals = {...this.state.modals};

            modals[name] = new_value;

            this.setState({
                ...this.state,
                modals
            });
        }
    }

    validate() {

        const validation = {
            email: null,
            password: null,
            password_confirm: null
        }

        let valid = true;

        if (this.state.token) {
            if (this.state.password.length < 10 || this.state.password.length > 200) {
                validation.password = "Le mot de passe doit contenir au minimum 10 et maximum 200 caractères.";
                valid = false;
            }
            if (this.state.password_confirm !== this.state.password) {
                validation.password_confirm = "Les mots de passe ne sont pas identiques.";
                valid = false;
            }
        } else {
            if (this.state.email.length < 3) {
                validation.email = "Vous devez fournir une adresse mail valide.";
                valid = false;
            }
        }

        if (!valid) {
            this.setState({
                ...this.state,
                validate: validation
            });
        }

        return valid;
    }

    reset_forms() {
        if (this._isMounted) {

            this.setState({
                ...this.state,
                email: "",
                password: "",
                password_confirm: "",
                validate: {
                    email: null,
                    password: null,
                    password_confirm: null
                }
            })

        }
    }

    async send_to_server(path, data) {

        let response;
        try {
            response = await fetch(process.env.REACT_APP_API_URL + path, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(data)
            });
        } catch (err) {
            alert("Impossible de joindre le serveur distant.");
            return null;
        }

        if (response.status !== 200) {
            alert("Opération refusée par le serveur. Vérifiez que le formulaire est valide.");
            console.error("Connexion refusée : " + response.status);
            return null;
        }

        return response;
    }

    async send_reset_request() {

        const response = await this.send_to_server("users/reset_password", {email: this.state.email});

        if (response && this._isMounted) {
            this.set_modal("request_sent", true);
        }
    }

    async send_new_password() {
        const response = await this.send_to_server("users/change_password", {
            new_password: this.state.password,
            token: this.state.token
        });

        if (response && this._isMounted) {
            this.set_modal("password_changed", true);
            this.setState({
                ...this.state,
                redirect: true
            });
        }
    }

    on_reset_request_submit(event) {
        event.preventDefault();

        if (this.validate()) {
            this.send_reset_request().then(() => this.reset_forms()).catch();
        }
    }

    on_change_password_submit(event) {
        event.preventDefault();

        if (this.validate()) {
            this.send_new_password().then(() => this.reset_forms()).catch();
        }
    }

    render_error_message(message) {
        return message ? (<p className="validation-error">{message}</p>) : null;
    }

    render_request_form() {
        return (
            <div>

                <Modal title="Requête envoyée"
                       shown={this.state.modals.request_sent}
                       buttons={["D'accord"]}
                       onClose={() => {
                           this.set_modal("request_sent", false);
                       }}>
                    <p>Un email a été envoyé. Celui-ci contient un lien pour continuer le changement de mot de passe.</p>
                </Modal>

                <p>Veuillez entrer l'email de votre compte. Un lien vous permettant de changer votre mot de passe vous
                    sera <strong>envoyé</strong> à cette adresse.</p>

                <form onSubmit={this.on_reset_request_submit}>
                    <div className="form-control-group">
                        <div className="form-control">
                            <input type="text" placeholder="email@example.com"
                                   className={this.state.validate.email ? "invalid" : ""}
                                   value={this.state.email}
                                   onChange={event => {
                                       this.setState({...this.state, email: event.target.value});
                                   }}/>
                            {this.render_error_message(this.state.validate.email)}
                        </div>
                        <div className="form-control">
                            <button type="submit" className="button button-primary">Envoyer</button>
                        </div>
                    </div>
                </form>

            </div>
        );
    }

    render_change_password_form() {
        return (
            <div>

                <Modal title="Mot de passe mis à jour"
                       shown={this.state.modals.password_changed}
                       buttons={["D'accord"]}
                       onClose={() => {
                    this.set_modal("password_changed", false);
                }}>
                    <p>Votre de passe a été mis à jour !</p>
                </Modal>

                <h3>Entrez votre nouveau mot de passe</h3>

                <form onSubmit={this.on_change_password_submit}>
                    <div className="form-control">
                        <label htmlFor="new-password">Nouveau mot de passe</label>
                        <input type="password" id="new-password" name="new-password"
                               className={this.state.validate.password ? "invalid" : ""}
                               placeholder="Mot de passe..."
                               value={this.state.password}
                               onChange={event => {
                                   this.setState({
                                       ...this.state,
                                       password: event.target.value
                                   });
                               }}/>
                        {this.render_error_message(this.state.validate.password)}
                    </div>
                    <div className="form-control">
                        <label htmlFor="new-password-confirm">Confirmation du nouveau mot de passe</label>
                        <input type="password" id="new-password-confirm" name="new-password-confirm"
                               className={this.state.validate.password_confirm ? "invalid" : ""}
                               value={this.state.password_confirm}
                               placeholder="Mot de passe..."
                               onChange={event => {
                                   this.setState({
                                       ...this.state,
                                       password_confirm: event.target.value
                                   });
                               }}/>
                        {this.render_error_message(this.state.validate.password_confirm)}
                    </div>
                    <div className="form-control">
                        <button type="submit" className="button button-primary">Valider</button>
                    </div>
                </form>

            </div>
        );
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to="/"/>);
        }

        return (
            <div className="container" id="password-reset-area" style={{marginTop: '6rem'}}>
                <h1>Changement de mot de passe</h1>
                {!!this.state.token ? this.render_change_password_form() : this.render_request_form()}
            </div>
        );
    }

}
