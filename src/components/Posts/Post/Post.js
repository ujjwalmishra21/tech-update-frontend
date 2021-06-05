/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
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
import {Link, useLocation, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 310,
    marginRight: 25,
    marginBottom: 25,
    boxShadow: '1px 1px 0.5em',

  },
  cardHeader:{
    width: '100%',
    whiteSpace: 'nowrap',
    
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

  let isLiked = false;
  if(props.likes.length > 0){
    props.likes.forEach(like => {
      if(like.username === props.username){
        isLiked = true;
      }
    })
  }

  const [liked, setLiked] = useState(isLiked);

  const handleLikeClick = () => {
    props.likeUnlikePost(props.token, props.postId);
  }
  const location = useLocation();
  const handleShareClick = async () => {
    
    if(navigator.share){
      navigator.share({
        url: `${window.location.href}posts/${props.postId}` ,
        title: props.title
      }).then(() => {
        console.log('Data share successfully')})
      .catch(err => {
        console.log("Unable to share data");
      })
    }
  }

  useEffect(() => {
    if(props.temp && props.temp.id === props.postId){
      setLiked(!liked)
    }
  }, [props.temp])

 return (
    <div>
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        title={props.title}
        subheader={moment(props.createdAt).fromNow()}
      />
     <Link to={`/posts/${props.postId}`}><img
        src={`data:image/jpeg;base64,${props.files[0].fileData}`}
        height="200px"
        width="300px"
      /></Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
         { !liked ? <FavoriteBorderIcon /> :<FavoriteIcon  color="secondary"/> }
        </IconButton>
        <IconButton aria-label="share" onClick={handleShareClick}>
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
    token: state.auth.token,
    temp: state.data.temp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    likeUnlikePost: (token, id) => dispatch(actions.likePost(token, id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post);