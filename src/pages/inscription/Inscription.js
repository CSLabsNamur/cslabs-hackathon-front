import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";

import Countdown from "../../components/countdown/countdown";
import "./Inscription.css";
import {UserContext} from "../../context/user";
import {CovidAlert} from "../../components/covid_alert/covid_alert";

export class Inscription extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirm: "",
            firstName: "",
            lastName: "",
            github: "",
            linkedIn: "",
            comment: "",
            accept_rules: false,
            validation: {
                email: null,
                password: null,
                password_confirm: null,
                firstName: null,
                lastName: null,
                github: null,
                linkedIn: null,
                comment: null,
                accept_rules: null,
                server: null
            },
            redirect_user: null
        };

        this.on_submit = this.on_submit.bind(this);

        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        if (this.context.authenticated) {
            this.setState({
                ...this.state,
                redirect_user: "/team"
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    validate_form() {
        let valid = true;

        const validation = {
            email: null,
            password: null,
            password_confirm: null,
            firstName: null,
            lastName: null,
            github: null,
            linkedIn: null,
            accept_rules: null,
            server: null
        }

        const {
            email,
            password,
            password_confirm,
            firstName,
            lastName,
            github,
            linkedIn,
            comment,
            accept_rules
        } = this.state;

        if (email.length < 1) {
            validation.email = "Il est nécessaire d'entrer votre email.";
            valid = false;
        } else if (email.length > 255) {
            validation.email = "L'email ne peut pas dépasser les 255 caractères.";
            valid = false;
        }

        if (password.length < 10 || password.length > 200) {
            validation.password = "Le mot de passe doit posséder au minimum 10 caractères et maximum 200 caractères.";
            valid = false;
        }

        if (password !== password_confirm) {
            validation.password_confirm = "Les mots de passe doivent être identiques.";
            valid = false;
        }

        if (firstName.length < 3 || firstName.length > 35) {
            validation.firstName = "Le prénom doit avoir minimum 3 caractères et maximum 35 caractères.";
            valid = false;
        }

        if (lastName.length < 3 || lastName.length > 35) {
            validation.lastName = "Le nom doit avoir minimum 3 caractères et maximum 35 caractères.";
            valid = false;
        }

        if (github.length > 0) {
            if (github.length < 3 || github.length > 255) {
                validation.github = "Le lien github doit avoir minimum 3 caractères et maximum 255 caractères.";
                valid = false;
            }
        }

        if (linkedIn.length > 0) {
            if (linkedIn.length < 3 || linkedIn.length > 255) {
                validation.linkedIn = "Le lien linkedIn doit avoir minimum 3 caractères et maximum 255 caractères.";
                valid = false;
            }
        }

        if (comment.length > 2048) {
            validation.comment = "Les remarques sont de maximum 2048 caractères.";
            valid = false;
        }

        if (!accept_rules) {
            validation.accept_rules = `Il est nécessaire d'accepter ces conditions pour 
                                       poursuivre votre participation au hackathon.`;
            valid = false;
        }

        this.setState({validation: validation});

        return valid;
    }

    async create_user() {

        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            github: this.state.github.length > 0 ? this.state.github : null,
            linkedin: this.state.linkedIn.length > 0 ? this.state.linkedIn : null,
            comment: this.state.comment.length > 0 ? this.state.comment : null
        }

        let response;

        try {
            response = await fetch(process.env.REACT_APP_API_URL + 'users/add', {
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(data),
                crossDomain: true
            });
        } catch (err) {
            throw new Error("Impossible de joindre l'hôte distant.");
        }

        if (response.status !== 200) {

            const server_error = await response.json();
            let client_message;

            if (server_error.message === "email must be unique") {
                client_message = "Un compte possède déjà cette adresse email.";
            } else {
                client_message = "Opération refusée. Une erreur est survenue. Vérifiez-bien vos données.";
            }

            throw new Error(client_message);
        }

        const body = await response.json();

        if (this._isMounted) {
            this.context.authenticate(body);
        }

        console.log("Account created.");
    }

    on_submit(event) {
        event.preventDefault();

        if (!this.validate_form()) {
            console.log("Form validation failed.");
            return;
        }

        this.create_user()
            .then(() => {

                if (this._isMounted) {
                    let next_page;

                    if (this.context.next) {
                        next_page = this.context.next;
                        this.context.clear_next();
                    } else {
                        next_page = "/team";
                    }

                    this.setState({
                        redirect_user: next_page
                    });
                }

            })
            .catch(err => {
                if (this._isMounted) {
                    this.setState({
                        validation: {
                            server: err.message
                        }
                    });
                }
            });
    }

    render_form_validation_error(message) {
        return message ? (
            <p className="validation-error">{message}</p>
        ) : null;
    }

    render_form() {

        return (
            <div className="Form">

                <form id="form-inscription" onSubmit={this.on_submit}>

                    <div className="form-control">
                        <label htmlFor="form-email">
                            Votre adresse email
                        </label>
                        <input type="text" id="form-email" name="form-email"
                               placeholder="user@example.com..."
                               className={this.state.validation.email ? "invalid" : ""}
                               value={this.state.email}
                               onChange={event => this.setState({email: event.target.value})}/>
                        {this.render_form_validation_error(this.state.validation.email)}
                    </div>

                    <div className="form-control">
                        <label htmlFor="form-password">
                            Mot de passe (plus de 10 caractères)
                        </label>
                        <input type="password" id="form-password" name="form-password"
                               placeholder="super password..."
                               className={this.state.validation.password ? "invalid" : ""}
                               value={this.state.password}
                               onChange={event => this.setState({password: event.target.value})}/>
                        {this.render_form_validation_error(this.state.validation.password)}
                    </div>

                    <div className="form-control">
                        <label htmlFor="form-password-confirm">
                            Mot de passe (confirmation)
                        </label>
                        <input type="password" id="form-password-confirm" name="form-password-confirm"
                               placeholder="super password..."
                               className={this.state.validation.password_confirm ? "invalid" : ""}
                               value={this.state.password_confirm}
                               onChange={event => this.setState({password_confirm: event.target.value})}/>
                        {this.render_form_validation_error(this.state.validation.password_confirm)}
                    </div>

                    <div className="form-control">
                        <label htmlFor="form-firstname">
                            Votre prénom
                        </label>
                        <input type="text" id="form-firstname" name="form-firstname"
                               placeholder="Entrez votre prénom..."
                               className={this.state.validation.firstName ? "invalid" : ""}
                               value={this.state.firstName}
                               onChange={event => this.setState({firstName: event.target.value})}/>
                        {this.render_form_validation_error(this.state.validation.firstName)}
                    </div>

                    <div className="form-control">
                        <label htmlFor="form-name">
                            Votre nom
                        </label>
                        <input type="text" id="form-name" name="form-name"
                               placeholder="Entrez votre nom..."
                               className={this.state.validation.lastName ? "invalid" : ""}
                               value={this.state.lastName}
                               onChange={event => this.setState({lastName: event.target.value})}/>
                        {this.render_form_validation_error(this.state.validation.lastName)}
                    </div>

                    <fieldset>
                        <legend>Informations complémentaires</legend>

                        <div className="form-control">
                            <label htmlFor="form-github">
                                Votre compte github (optionnel)
                            </label>
                            <input type="text" id="form-github" name="form-github"
                                   placeholder="Lien vers votre github..."
                                   className={this.state.validation.github ? "invalid" : ""}
                                   value={this.state.github}
                                   onChange={event => this.setState({github: event.target.value})}/>
                            {this.render_form_validation_error(this.state.validation.github)}
                        </div>

                        <div className="form-control">
                            <label htmlFor="form-linkedin">
                                Votre compte LinkedIn (optionnel)
                            </label>
                            <input type="text" id="form-linkedin" name="form-linkedin"
                                   placeholder="Lien vers votre linkedIn..."
                                   className={this.state.validation.linkedIn ? "invalid" : ""}
                                   value={this.state.linkedIn}
                                   onChange={event => this.setState({linkedIn: event.target.value})}/>
                            {this.render_form_validation_error(this.state.validation.linkedIn)}
                        </div>

                        <div className="form-control">
                            <label htmlFor="form-comment">
                                Remarques (allergie, ...) (optionnel)
                            </label>
                            <textarea name="form-comment" id="form-comment"
                                      className={this.state.validation.comment ? "invalid" : ""}
                                      maxLength={2048}
                                      placeholder="Mes allergies, difficultés particulière, ..."
                                      value={this.state.comment}
                                      onChange={event => this.setState({comment: event.target.value})}/>
                            {this.render_form_validation_error(this.state.validation.comment)}
                        </div>

                    </fieldset>

                    <div className="form-control">
                        <input type="checkbox" id="form-accept-rules" name="form-accept-rules"
                               value="accept-rules"
                               checked={this.state.accept_rules}
                               onChange={event => this.setState({accept_rules: event.target.checked})}/>
                        <label htmlFor="form-accept-rules">
                            J'ai pris connaissance des <Link to="/infos">modalités</Link> relatives au hackathon
                            et notamment de la <strong>caution de 20€</strong>.
                        </label>
                        {this.render_form_validation_error(this.state.validation.accept_rules)}
                    </div>

                    <div className="form-control align-center">
                        <button type="submit" className="button-primary button-large" id="form-inscription-submit">
                            M'inscrire
                        </button>
                    </div>

                    {this.state.validation.server ? (
                        <p className="alert alert-danger info--alert">
                            {this.state.validation.server}
                        </p>
                    ) : null}

                </form>

            </div>
        );

    }

    render_countdown() {
        return (
            <div className="container">
                <h1 id="inscription-title">Inscriptions</h1>
                <div id="inscription-info">
                    <p>Merci de votre intérêt !</p>
                    <p><i>Après votre inscription, vous pourrez constituer une équipe.
                        Cependant, <strong>une caution de 20€</strong> sera demandée afin
                        de valider votre participation.</i></p>
                    <CovidAlert/>
                    <p><Link to="/infos">Plus d'informations.</Link></p>
                    <Countdown destination={new Date(2020, 10, 23)}/>
                </div>
            </div>
        );
    }

    render() {

        if (this.state.redirect_user) {
            return (<Redirect to={this.state.redirect_user}/>);
        }

        return (
            <div className="container inscription-area">
                <div className="row">
                    <div className="col col-lg-6">
                        {this.render_form()}
                    </div>
                    <div className="col col-lg-6">
                        {this.render_countdown()}
                    </div>
                </div>
            </div>
        )
    }
}
