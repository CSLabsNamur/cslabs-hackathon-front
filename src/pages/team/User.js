import React, {Component} from 'react';
import {Link} from "react-router-dom";

import {UserContext} from "../../context/user";

export class User extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            first: true,
            firstName: "",
            lastName: "",
            email: "",
            github: "",
            linkedin: "",
            paid_caution: false,
            msg: "",
            validation: {
                firstName: null,
                lastName: null,
                github: null,
                linkedin: null
            }
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);

        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        const user = this.context.user;

        if (this.context.user) {
            this.setState({
                first: false,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                github: !!user.github ? user.github : "",
                linkedin: !!user.linkedin ? user.linkedin : "",
                paid_caution: user.paid_caution
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onInputChange(event) {
        const new_state = {...this.state};
        new_state[event.currentTarget.name] = event.currentTarget.value;
        this.setState(new_state);
    }

    async pushProfile() {

        const {firstName, lastName, github, linkedin} = this.state;

        let response;

        try {
            response = await fetch(process.env.REACT_APP_API_URL + 'users/update/me', {
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({firstName, lastName, github, linkedin}),
            });
        } catch (err) {
            throw new Error("L'hôte distant ne répond pas.");
        }


        if (response.status !== 200) {
            throw new Error("Opération refusée.");
        }

        if (this._isMounted) {
            this.setState({
                firstName,
                lastName,
                github,
                linkedin,
                msg: <span style={{color: 'green'}}>Modifications enregistrées !</span>
            });
        }
    }

    validate() {

        const {firstName, lastName, github, linkedin} = this.state;

        let valid = true;
        const validation = {
            firstName: null,
            lastName: null,
            github: null,
            linkedin: null
        }

        if (firstName.length < 3 || firstName.length > 35) {
            valid = false;
            validation.firstName = "Le prénom ne peut contenir qu'au minimum 3 et maximum 35 caractères.";
        }

        if (lastName.length < 3 || lastName.length > 35) {
            valid = false;
            validation.lastName = "Le nom ne peut contenir qu'au minimum 3 et maximum 35 caractères.";
        }

        if (github && github.length > 255) {
            valid = false;
            validation.github = "Le lien vers le compte GitHub ne peut excéder les 255 caractères.";
        }

        if (linkedin && linkedin.length > 255) {
            valid = false;
            validation.linkedin = "Le lien vers le compte LinkedIn ne peut excéder les 255 caractères.";
        }

        if (!valid) {
            this.setState({
                ...this.state,
                validation: validation
            });
        }

        return valid;
    }

    updateProfile() {
        if (this.validate()) {

            this.pushProfile()
                .then(() => {
                    console.log('User account updated.');

                    if (this._isMounted) {
                        this.setState({
                            ...this.state,
                            msg: <span style={{color: 'green'}}>Profile mis à jour !</span>
                        });
                    }
                })
                .catch(err => {

                    if (this._isMounted) {
                        this.setState({
                            ...this.state,
                            msg: <span style={{color: 'red'}}>{err.message}</span>
                        });
                    }

                });
        }
    }

    render_validation_error(validation_message) {
        return validation_message ? (<p className="validation-error">{validation_message}</p>) : null;
    }

    render() {

        const {validation} = this.state;

        return (
            <div className="col col-lg-6">
                <h2>Détail de votre profil</h2>
                <p>Mais qui êtes-vous donc ?</p>

                <div className="form-control">
                    <label>Prénom</label>
                    <input type="text"
                           className={validation.firstName ? "invalid" : ""}
                           onChange={this.onInputChange}
                           value={this.state.firstName}
                           placeholder="Robert"
                           name="firstName"/>
                    {this.render_validation_error(validation.firstName)}
                </div>

                <div className="form-control">
                    <label>Nom</label>
                    <input type="text"
                           className={validation.lastName ? "invalid" : ""}
                           onChange={this.onInputChange}
                           value={this.state.lastName}
                           placeholder="de Balzamic"
                           name="lastName"/>
                    {this.render_validation_error(validation.lastName)}
                </div>

                <div className="form-control">
                    <label>E-mail</label>
                    <input type="text"
                           value={this.state.email}
                           name="email"
                           disabled/>
                </div>

                <div className="form-control">
                    <label>Github (optionnel)</label>
                    <input type="text"
                           className={validation.github ? "invalid" : ""}
                           onChange={this.onInputChange}
                           value={this.state.github}
                           placeholder="https://github.com/awesome"
                           name="github"/>
                    {this.render_validation_error(validation.github)}
                </div>

                <div className="form-control">
                    <label>LinkedIn (optionnel)</label>
                    <input type="text"
                           className={validation.linkedin ? "invalid" : ""}
                           onChange={this.onInputChange}
                           value={this.state.linkedin}
                           placeholder="https://linkedin.com/awesome"
                           name="linkedin"/>
                    {this.render_validation_error(validation.linkedin)}
                </div>

                {!this.state.first && !this.state.paid_caution ? (
                    <p className="alert alert-danger info--alert">
                        Votre caution n'a pas encore été réceptionnée ou validée !
                        Si vous avez payé votre caution et que ce message tarde à disparaitre,
                        veuillez contacter un membre du staff.
                        Cliquez sur ce lien pour plus d'<Link to="/infos">informations</Link>.
                    </p>
                ) : null}

                <div>
                    <p>{this.state.msg}</p>
                </div>

                <button className="button-primary button-round" onClick={this.updateProfile}>Confirmer</button>
            </div>
        );
    }
}
