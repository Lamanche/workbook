import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';

// API
import { getProfile } from '../actions/profile.js'
import { deletePosts } from '../api/index'

// Components
import coding from '../images/coding.jpg'
import design from '../images/design.jpg'
import engineering from '../images/engineering.jpg'
import construction from '../images/construction.jpg'

//Styles
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Menu, MenuItem } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Styles
const useStyles = makeStyles((theme) => ({
  card: {
    //width: '100%',
    //minWidth: 200,
    //margin: 10,
    /*"@media (max-width: 550px)": {
      maxWidth: 125
    }*/
    margin: '0.5rem'
  },
  header: {
    display: 'flex',
  },
  headerText:{
    fontWeight: 'bold',
    "@media (max-width: 550px)": {
      fontSize: '.8rem'
    }
  },
  subheader: {
    "@media (max-width: 550px)": {
      fontSize: '.7rem'
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  category: {
    "@media (max-width: 550px)": {
      fontSize: '1.1rem'
    }
  },
  headline: {
    fontWeight: 'bold',
    "@media (max-width: 550px)": {
      fontSize: '.8rem'
    }
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
    "@media (max-width: 550px)": {
      height: 25,
      width: 25,
    }
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function ServiceCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem('profile'))?.result._id;
  const creatorId = props.creator;
  
  
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getProfiles = () => {
    const name = props.name
    const email = props.email
    dispatch(getProfile({ name, email }))
    history.push("/userprofile")
  }

  const categoryImage = () => {
    switch (props.category) {
      case 'coding':
        return coding
      case 'engineering':
        return engineering
      case 'construction':
        return construction
      case 'design':
        return design    
      default:
        return ''
    }
  }

  const deletePost = () => {
    deletePosts(props.id)
    setAnchorEl(null);
    //window.location.reload()
  }
  
  return (
    <Card className={classes.card}>      
      <div className={classes.header}>
        <CardHeader
          //className={classes.headerText}
          classes={{ title: classes.headerText, subheader: classes.subheader}}
          onClick={getProfiles}
          avatar={
            <Avatar src={props.picture} className={classes.avatar}></Avatar>
          }
          title={props.name}
          subheader={moment(props.date).fromNow()}
        />
        
        {userId === creatorId ? 
        <IconButton aria-label="display more actions" edge="end" color="inherit">
          <MoreIcon onClick={handleClick}/>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/*<MenuItem >Update</MenuItem>*/}
              <MenuItem onClick={deletePost}>Delete</MenuItem>
            </Menu>                          
        </IconButton> 
        : 
        null
        }
        
      </div>
      
      <CardMedia
        className={classes.media}
        image={categoryImage()}
        title="category"
      />
      <CardContent>
        <Typography className={classes.category} variant="h6" color="textSecondary" component="p">
          {props.category}
        </Typography>
        <Typography paragraph variant='body2' className={classes.headline}>
            {props.description}
        </Typography>
        
        <div className={classes.footer}>
          <Typography className={classes.headline} variant='body1' color='primary'>Price from: {props.price}€</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </CardContent>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>          
        <Typography  variant='subtitle2' color="textSecondary" >Description</Typography>
          <Typography variant='body2' className={classes.headline} paragraph color="textPrimary">
            {props.about}
          </Typography>
          <Typography  variant='subtitle2' color="textSecondary" >Contact me</Typography>
          <Typography className={classes.headline} variant='body2' color='primary'>
            {props.email}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}