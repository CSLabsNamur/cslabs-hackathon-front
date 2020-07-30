import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Cookies from "js-cookie";

import "./Connexion.css";
import {UserContext} from "../../context/user";

class Connexion extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            connected: false,
            message: '',
            redirection: null
        }

        this.on_email_change = this.on_email_change.bind(this);
        this.on_password_change = this.on_password_change.bind(this);
        this.on_submit = this.on_submit.bind(this);
    }

    componentDidMount() {
        this.check_connection();
    }

    choose_redirection() {

        console.log("Redirect user.");

        if (this.context.next) {
            const next_page = this.context.next;
            this.context.clear_next();

            this.setState({
                redirection: next_page
            });
        } else {
            this.setState({
                redirection: "/team"
            });
        }
    }

    check_connection() {

        console.log("Check connexion");

        if (this.context.authenticated) {
            this.choose_redirection();
        } else {
            this.context.fetch_user().then(user => {
                if (user) {
                    this.context.authenticate(user);
                    this.choose_redirection();
                }
            });
        }
    }

    async connect() {

        const data = {
            email: this.state.email,
            password: this.state.password,
        }

        let response;

        try {
            response = await fetch(process.env.REACT_APP_API_URL + 'users/login', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(data)
            });
        } catch (err) {
            return this.setState({
                connected: false,
                message: 'Impossible de joindre l\'hôte distant.',
            });
        }

        const body = await response.json();

        if (response.status === 200) {

            // Good credentials
            Cookies.set('id', body.id);
            this.setState({
                connected: true,
                message: 'Vous êtes connecté !',
            });
            this.context.authenticate(body);
            this.choose_redirection();
        } else if (response.status === 400) {

            // Wrong credentials
            this.setState({
                email: "",
                password: "",
                connected: false,
                message: 'Mauvais identifiants.',
            });
        } else {

            // Server error
            this.setState({
                connected: false,
                message: 'Erreur du serveur.',
            });
        }
    }

    on_email_change(event) {
        this.setState({
            email: event.target.value
        });
    }

    on_password_change(event) {
        this.setState({
            password: event.target.value
        });
    }

    on_submit(event) {

        event.preventDefault();

        this.connect()
            .then()
            .catch(() => {
                this.setState({
                    connected: false,
                    message: "Impossible de joindre l'hôte distant.",
                });
            });

    }

    render() {
        return (
            <div className="Form" id="connexion-page">

                <h2 className="tx-centered">Connexion</h2>
                <h6 className="tx-centered">Les connexions ne sont pas encore autorisées.</h6>
                <p className="warning" style={{color: 'red'}}>{this.state.message}</p>

                <form onSubmit={this.on_submit}>
                    <div className="form-control">
                        <label htmlFor="email">Adresse email</label>
                        <input type="email" id="email" name="email" placeholder="jean@example.com"
                               onChange={this.on_email_change}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" name="password" placeholder="mot de passe secret"
                               onChange={this.on_password_change}/>
                    </div>
                    <div className="tx-centered">
                        <button className="button-primary button-round" type="submit">Se connecter</button>
                    </div>
                </form>

                {this.state.redirection ? (<Redirect to={this.state.redirection}/>) : null}

                <style>
                    {`footer {
            position: fixed;
            bottom: 0px;
          }`}
                </style>
            </div>
        )
    }
}

export default Connexion;
