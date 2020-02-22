import { Component } from 'inferno';
import { Hero } from '../Widgets'

class Infos extends Component {
  render() {
    return (
      <div>
        <Hero title='Informations' content='Adresse, lieu et commodités.'></Hero>
      </div>
    )
  }
}

export default Infos;