
import React, { Component } from "react";

import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './main_carousel.css';

class MainCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            slides: [
                (<img src={process.env.REACT_APP_PUBLIC_URL + "old_hands.jpg"} alt="Thème du Hackathon CSLabs" />),
                (<img src={process.env.REACT_APP_PUBLIC_URL + "edition.jpg"} alt="Troisième Édition CSLabs" />),
                (<img src={process.env.REACT_APP_PUBLIC_URL + "hackathon_irl.jpg"} alt="Hackathon Compétition"/>),
                (<img src={process.env.REACT_APP_PUBLIC_URL + "cslabs_junior.jpg"} alt="CSLabs Junior Entreprise"/>)
            ]
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({ value });
    }

    render() {

        return (
            <div id="main-carousel">
                <Carousel
                    value={this.state.value}
                    slides={this.state.slides}
                    slidesPerPage={1}
                    onChange={this.onChange}
                    infinite={true}
                    centered
                    arrows
                    dots
                    clickToChange
                />
            </div>
        );
    }
}

export default MainCarousel;
