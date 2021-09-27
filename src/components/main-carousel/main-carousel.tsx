import React from 'react';
import Carousel, { Dots, arrowsPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import './main-carousel.css';

export class MainCarousel extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: 0,
      slides: [
        {src: "images/old_hands.jpg",     alt: "Thème du Hackathon CSLabs"},
        {src: "images/edition.jpg",       alt: "Troisième Édition CSLabs"},
        {src: "images/hackathon_irl.jpg", alt: "Hackathon Compétition"},
        {src: "images/cslabs_junior.jpg", alt: "CSLabs Junior Entreprise"},
      ]
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value: any) {
    this.setState({ ...this.state, value });
  }

  render() {

    return (
      <div id="main-carousel">
        <Carousel
          value={this.state.value}
          slides={this.state.slides.map((slide: any) => (
            <img className="main-carousel__img" src={slide.src} alt={slide.alt} />
          ))}
          onChange={this.onChange}
          draggable={false}
          plugins={[{
            resolve: arrowsPlugin,
            options: {
              arrowLeft: <div className="main-carousel__arrow left"><span>&#x276e;</span></div>,
              arrowRight: <div className="main-carousel__arrow right"><span>&#x276f;</span></div>,
              addArrowClickHandler: true,
            }
          }, 'infinite']}
        />
        <Dots value={this.state.value} onChange={this.onChange} number={this.state.slides.length} />
      </div>
    );
  }
}
