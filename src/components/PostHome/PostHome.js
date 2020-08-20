import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import Carousel from '../../elements/Carousel/Carousel';

class PostHome extends Component{

    componentDidMount(){
        const id = this.props.match.params.postId;
        console.log("ID--" + id);
        this.props.fetchDataById(id);
    }

    render(){
        // console.log("PROPS----" + JSON.stringify(this.props.ma));
        if(this.props.data){
            console.log("DATA---" + JSON.stringify(this.props.data));
        }
        return (
            <div>
            <h1>Post Home</h1>
            <Carousel />
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