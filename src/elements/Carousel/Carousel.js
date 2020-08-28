import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginLeft:'25px',
    marginRight:'25px',    
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    height:405,
    overflowY:'hidden',
    '&::-webkit-scrollbar' :{
        display:'none'
    }
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  listElement:{
    height:'390px !important',
  },
}));


const Carousel = (props) => {
  const classes = useStyles();
    console.log("ELEMENT---------------" + props.files[0].fileName);
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={1.8}>
        {props.files.map((file) => (
            
          <GridListTile key={file.id} className={classes.listElement}>
            <img src={`data:image/jpeg;base64,${file.fileData}`} alt={file.fileName} />
         
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}



export default Carousel;