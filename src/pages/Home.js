import { Component } from 'inferno';
import { Hero } from '../Widgets'

class Home extends Component {
  render() {
    return (
      <div>
        <Hero title='Prêt à relever le défi ?' content='Trouvez la solution aux problèmes réels de notre quotidien.'></Hero>
      </div>
    )
  }
}

export default Home;