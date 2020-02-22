import { Component } from 'inferno';
import { Hero } from '../Widgets'

class Sponsors extends Component {
  render() {
    return (
      <div>
        <Hero title='Sponsors du hackathon' content='Sans eux, rien ne serait possible !'></Hero>
      </div>
    )
  }
}

export default Sponsors;