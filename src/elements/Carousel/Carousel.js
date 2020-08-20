import React, {Component} from 'react';
import './Carousel.css';    
import CarouselElement from './CarouselElement/CarouselElement';

class Carousel extends Component {

    render(){
        return(
            <div>
                <div className="carousel-section-slider">
                    <CarouselElement />
                    <CarouselElement />
                    <CarouselElement />
                </div>
            </div>
        );
    }


}

export default Carousel;