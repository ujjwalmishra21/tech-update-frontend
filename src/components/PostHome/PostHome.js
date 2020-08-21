import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './PostHome.css';
import * as actions from '../../store/actions/index';
import Carousel from '../../elements/Carousel/Carousel';

class PostHome extends Component{

    componentDidMount(){
        const id = this.props.match.params.postId;
        console.log("ID--" + id);
        this.props.fetchDataById(id);
    }

    render(){
        let html = null
        if(this.props.data){
            console.log("DATA---" + JSON.stringify(this.props.data));
            html = (
                <div>
                    <div className="post-title-section">{this.props.data.title}</div>
                    <Carousel files={this.props.data.files} />
                    <div className="post-content-section-outer">
                        <div className="post-content-section-inner">
                            {this.props.data.content}
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {html}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.data.postData,
        error: state.data.error,
        loading: state.data.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDataById: (id) => dispatch(actions.fetchDataById(id))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PostHome));