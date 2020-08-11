import React, {Component} from 'react';

export class Hello extends Component {
    render() {
        return (
            <div className="col col-lg-9">
                <h2>Comment assurer ma participation ?</h2>
                <p>Afin de participer au hackathon, plusieurs conditions sont nécessaires :</p>
                <ol>
                    <li>Être dans une équipe</li>
                    <li>Payer la caution de 20€</li>
                </ol>
                <h3>Comment payer la caution ?</h3>
                <p>La caution devra être payée par un virement bancaire :</p>
                <ul>
                    <li>Compte : BEXXX - XXXX - XXXX - XXXX</li>
                    <li>Communication : NOM Prenom</li>
                </ul>

                <h2>Une nouveauté dans cette édition !</h2>
                <p>
                    Désormais, une partie du site Hackathon vous est destiné en tant que participant. Mais que
                    comporte-elle ?
                </p>
                <h3>Aperçu de votre équipe et de vous</h3>
                <p>
                    Rédigez une description de votre équipe. Les autres participants auront accès à cet aperçu ainsi
                    qu'aux profils des membres de votre équipe.
                </p>
                <h3>Un peu de suspens</h3>
                <p>
                    Outre les prix de l'idée, les prix techniques, un nouveau prix fait son apparition cette année !
                </p>
                <p>
                    Il s'agit du Prix du Public. Son concept est très simple : la dernière journée, chacun des
                    participants pourra voter de manière individuelle pour son équipe préférée.
                </p>
                <p>
                    Un moyen comme un autre de rétablir la démocratie en ce bas monde.
                </p>
            </div>
        );
    }
}