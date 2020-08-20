import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Posts.css';
import Post from './Post/Post';
import * as actions from '../../store/actions/index';

class Posts extends Component{
    componentDidMount(){
        this.props.fetchData();
    }
    render(){
        let post_html = [];
        if(this.props.data && this.props.data.length > 0){
            
            for(let data of this.props.data){
                
                let html = <Post key={data.id} postId={data.id} title={data.title} content={data.title} files={data.files} createdAt={data.createdAt}/>;   
                post_html.unshift(html);
            }
            
        }

        return(
            <div className="posts-section">
                {post_html} 
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.data.loading,
        data: state.data.data,
        error: state.data.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(actions.fetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);