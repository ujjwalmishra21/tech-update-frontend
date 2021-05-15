import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './PostHome.css';
import * as actions from '../../store/actions/index';
import Loader from '../../elements/Loader/Loader';
import ImageSlider from '../ImagesSlider/ImagesSlider';
import Content from '../Content/Content';

class PostHome extends Component{

    componentDidMount(){
        const id = this.props.match.params.postId;
        
        this.props.fetchDataById(this.props.token, id);
    }

    render(){
        let html = null
        if(!this.props.loading && this.props.data){
            
            html = (
                <div>
                    <div className="post-title-section">{this.props.data.title}</div>
                    <ImageSlider files={this.props.data.files} className="imageslider"/>
                    <Content content={this.props.data.content} />
                </div>
            )
        }else{
            html = <Loader/>
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
        loading: state.data.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDataById: (token, id) => dispatch(actions.fetchDataById(token, id))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PostHome));