import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Posts.css';
import Post from './Post/Post';
import Loader from  '../../elements/Loader/Loader';
import * as actions from '../../store/actions/index';

class Posts extends Component{
    componentDidMount(){
        this.props.fetchData(this.props.token);
    }
    render(){
        let post_html = [];
        if(!this.props.loading){
            if(this.props.data && this.props.data.length > 0){
                
                for(let data of this.props.data){
                    
                    let html = <Post key={data.id} postId={data.id} title={data.title} content={data.title} files={data.files} createdAt={data.createdAt} likes={data.likes} />;   
                    post_html.unshift(html);
                }
            }
            
        }else{
            post_html = <Loader/>;
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
        error: state.data.error,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (token) => dispatch(actions.fetchData(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);