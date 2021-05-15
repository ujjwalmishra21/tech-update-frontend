import React, { Component } from 'react';
import './Content.css';

class Content extends Component{

    render(){
        return(
            <div>
                <div className="post-content-section-outer">
                    <div className="post-content-section-inner-left"></div>
                    <div className="post-content-section-inner-mid">
                        {this.props.content}
                    </div>
                    <div className="post-content-section-inner-right"></div>
                </div>
            </div>
        );
    }
}

export default Content;