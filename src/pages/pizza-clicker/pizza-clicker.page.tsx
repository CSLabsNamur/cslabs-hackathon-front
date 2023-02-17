import React from "react";
import "./pizza-clicker.page.css";

export class PizzaClickerPage extends React.PureComponent {

  render() {
    return (
      <iframe
        id="pizza-clicker"
        title="Pizza Clicker"
        src="https://ppoitier.com/pizza-clicker"
        allowFullScreen={true}>
      </iframe>
    );
  }

}
