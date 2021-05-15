import React, { Component } from 'react';
import Carousel from '../../elements/Carousel/Carousel';
import './ImageSlider.css';

class ImageSlider extends Component{
    render(){
        return(
            <div className="imageslider">
                <Carousel files={this.props.files} />
            </div>
        )
    }
}

export default ImageSlider;