import { PageHero } from "@/components/page-hero/page-hero.tsx";
import React from "react";

export class CookiePolicyPage extends React.PureComponent {
  render() {
    return (
      <div id="cookie-policy-page">
        <PageHero
          title="Politique de cookies"
          hasArrow={true}
          subtitle="Tu veux un cookie ou pas ?"
          disclaimer={
            <div className="on-green">
              <p><strong>🍪</strong></p>
            </div>
          }>
        </PageHero>
        <div className="container">
          <h2>1. Introduction</h2>
          <p>
            Notre site web utilise des cookies. Dans la présente politique de cookies, nous expliquons (entre autres) ce
            que sont les cookies, comment nous les utilisons, comment les tiers avec lesquels nous collaborons peuvent
            les utiliser ainsi que les choix qui vous sont possibles.
          </p>

          <h2>2. Que sont les cookies ?</h2>
          <p>
            Les cookies sont des fichiers texte qui sont stockés sur votre ordinateur ou votre appareil mobile. Ils
            sont généralement utilisés pour rendre un site web plus convivial, efficace et sécurisé.
          </p>

          <h3>3. Types de cookies</h3>
          <h4>3.1 Cookies techniques ou fonctionnels</h4>
          <p>
            Certains cookies garantissent que certaines parties du site web fonctionnent correctement et que vos
            préférences d'utilisateur restent mémorisées. En plaçant des cookies fonctionnels, nous vous facilitons la
            visite de notre site web. Ainsi, vous n'avez pas besoin de saisir à plusieurs reprises les mêmes
            informations lors de la visite de notre site web.
          </p>
          <h4>3.2 Cookies analytiques</h4>
          <p>
            Les cookies analytiques sont utilisés pour optimiser l'expérience utilisateur de notre site web. À l'aide de
            ces cookies analytiques, nous obtenons des informations sur l'utilisation de notre site web. Nous demandons
            votre permission pour placer des cookies analytiques.
          </p>
          <h4>3.3 Cookies de marketing</h4>
          <p>
            Les cookies de marketing sont utilisés pour créer des profils d'utilisateurs. L'objectif est
            d'afficher des publicités pertinentes et attrayantes pour l'utilisateur et donc plus précieuses
            pour les éditeurs et les annonceurs tiers.
          </p>

          <h3>4. Comment contrôler les cookies</h3>
          <p>Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les
            cookies déjà stockés sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour empêcher
            leur stockage. Toutefois, si vous le faites, vous devrez peut-être ajuster manuellement certaines
            préférences chaque fois que vous visitez un site web, et certains services et fonctionnalités peuvent ne pas
            fonctionner.</p>

          <h3>5. Cookies placés</h3>
          <h4>5.1 Cookies techniques ou fonctionnels</h4>
          <p>
            Nous utilisons des cookies pour garder votre session active et pour vous connecter automatiquement à votre
            compte. Nous utilisons également des cookies pour protéger notre site web contre les attaques.
          </p>
          <table>
            <thead>
            <tr>
              <th>Nom</th>
              <th>Fonction</th>
              <th>Péremption</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>accessToken</td>
              <td>Utilisé pour vous connecter automatiquement à votre compte.</td>
              <td>1 an</td>
            </tr>
            <tr>
              <td>refreshToken</td>
              <td>Utilisé pour garder votre session active.</td>
              <td>1 an</td>
            </tr>
            <tr>
              <td>cf_clearance</td>
              <td>Utilisé pour protéger le site contre les attaques.</td>
              <td>1 an</td>
            </tr>
            <tr>
              <td>__cf_bm</td>
              <td>Utilisé pour faire la distinction entre les humains et les bots.</td>
              <td>30 minutes</td>
            </tr>
            <tr>
              <td>__cfsec</td>
              <td>Utilisé pour protéger le site contre les attaques.</td>
              <td>Session</td>
            </tr>
            <tr>
              <td>cf_ob_info et cf_use_ob</td>
              <td>Utilisé comme cookie d'information par <a href="https://www.cloudflare.com/always-online/">Cloudflare
                Always Online™</a></td>
              <td>30 secondes</td>
            </tr>
            </tbody>
          </table>
          <h4>5.2 Cookies analytiques</h4>
          <p>
            Nous n'utilisons pas de cookies analytiques sur notre site web.
          </p>
          <h4>5.3 Cookies de marketing</h4>
          <p>
            Nous n'utilisons pas de cookies de marketing sur notre site web.
          </p>

          <h3>6. Consentement</h3>
          <p>
            <strong>Étant donné que nous ne plaçons que des cookies techniques ou fonctionnels, nous n'avons pas besoin
              de votre autorisation pour les placer.</strong>
          </p>
          <p>
            Vous pouvez cependant désactiver l'utilisation de cookies via votre navigateur, mais veuillez noter que
            notre site web peut ne pas fonctionner correctement, voire pas du tout.
          </p>

          <h3>7. Vos droits concernant les données personnelles</h3>
          <p>
            Vous avez les droits suivants concernant vos données personnelles :
          </p>
          <ul>
            <li>Vous avez le droit de savoir pourquoi vos données personnelles sont nécessaires, ce qui leur arrivera et
              combien de temps elles seront conservées.
            </li>
            <li>Droit d'accès : vous avez le droit d'accéder à vos données personnelles que nous connaissons.</li>
            <li>Droit de rectification : vous avez le droit de compléter, corriger, supprimer ou bloquer vos données
              personnelles à tout moment.
            </li>
            <li>Droit de transférer vos données : vous avez le droit de demander toutes vos données personnelles au
              responsable du traitement et de les transférer en totalité à un autre responsable du traitement.
            </li>
            <li>Droit d'opposition : vous pouvez vous opposer au traitement de vos données. Nous nous conformons à cela,
              sauf si des raisons justifiées de traitement l'emportent.
            </li>
          </ul>
          <p>Pour exercer ces droits, veuillez nous contacter. Veuillez vous référer aux coordonnées en bas de cette
            politique de cookies. Si vous avez une plainte concernant la manière dont nous traitons vos données, nous
            aimerions en être informés, mais vous avez également le droit de déposer une plainte auprès de
            l'autorité de protection des données.
          </p>

          <h3>8. Informations supplémentaires</h3>
          <p><strong>
            Si vous avez des questions ou des préoccupations concernant notre politique de cookies, veuillez nous
            contacter notre <a href="mailto:rgpd@cslabs.be" className="link">gestionnaire RGPD.</a>
          </strong></p>
        </div>
      </div>
    );
  }
}
