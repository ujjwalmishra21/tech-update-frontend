/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import moment from 'moment';
import {Link, useRouteMatch} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginRight: 15,
    marginBottom: 15,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Post = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let { path, url } = useRouteMatch();

  // let route = (
    
  //     <Route exact path={`/posts/:postId`} component={PostHome} />
       

  // )
  var isLike = false;

  if(props.likes.length > 0){
    props.likes.forEach(like => {
      if(like.username === props.username){
        isLike = true;
      }

    })
  }
 return (
    <div>
    <Card className={classes.root}>
      <CardHeader
        title={props.title}
        subheader={moment(props.createdAt).fromNow()}
      />
     <Link to={`/posts/${props.postId}`}><img
        src={`data:image/jpeg;base64,${props.files[0].fileData}`}
        height="200px"
        width="300px"
      /></Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>{props.likeUnlikePost(props.token, props.postId)}}>
         { !isLike ? <FavoriteBorderIcon/> :<FavoriteIcon /> }
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
    </Card>
    
    </div>
  );
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    likeUnlikePost: (token, id) => dispatch(actions.likePost(token, id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post);