
import { Component } from "inferno";
import {Link} from "inferno-router";

class HeroWidget extends Component {

    render() {

        // Pick a random color for this Hero
        // let colors = [
        //   'Green', 'Blue', 'Orange', 'Yellow', 'Red'
        // ]
        // let imgClass = '';
        // let img;
        // if (props.image) {
        //   alert(!props.image);
        //   imgClass = 'HeroImage';
        //   img = (
        //     <img src={props.image} alt={props.title}></img>
        //   )
        // }

        const getStarted = () => {
            if (this.props.hasBtn) {
                return (
                    <Link to={this.props.getStarted} class="get-started button button-primary button-large">
                        Plus d'infos !
                    </Link>
                )
            }
        }

        return (
            <header>
                <h1 className="title">
                    {this.props.title}
                </h1>
                <h2 className="subtitle">
                    {this.props.content}
                </h2>
                <p className="disclaimer">
                    {this.props.disclaimer}
                </p>
                {getStarted()}
            </header>
        )

    }

}

export default HeroWidget;
