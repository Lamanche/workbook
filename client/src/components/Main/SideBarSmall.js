import React, { useState, useEffect } from 'react'
import styles from './Main.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { postCategoryType } from '../../actions/posts';

import clsx from 'clsx';
import { Drawer, List, Divider, ListItem, ListItemIcon, Typography, IconButton } from '@material-ui/core';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BuildIcon from '@material-ui/icons/Build';
import SchoolIcon from '@material-ui/icons/School';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

const SideBarSmall = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categoryType = useSelector(state => state.posts.postCategoryType);

    const [currentValue, setCurrentValue] = useState(categoryType)

    const [state, setState] = useState(false);
        
    const getValue = (e) => {
        //setCurrentValue(e.target.id)
        dispatch(postCategoryType(e.target.id));
    };      
    
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        };        
        setState(open);
    };
        
    useEffect(() => {
        setCurrentValue(categoryType)
    },[categoryType])    
        
    return (                         
                <div>
                    <div className={styles.sideBarSmallHeader}>
                        <Typography variant='h6' className={styles.smallCategoryName}>{currentValue}</Typography>
                        <IconButton onClick={toggleDrawer(true)}>
                            <ListIcon />
                        </IconButton>                        
                    </div>                    
                    <Drawer anchor='bottom' open={state} onClose={toggleDrawer(false)}>
                        <div
                            className={clsx(classes.fullList)}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                            >
                            <List>                
                                <ListItem id='Teenus' button onClick={getValue}>
                                    <ListItemIcon><BuildIcon /></ListItemIcon>                                
                                    Teenus
                                </ListItem>
                                <ListItem id='Rent' button onClick={getValue}>
                                    <ListItemIcon><SettingsApplicationsIcon /></ListItemIcon>                                
                                    Rent
                                </ListItem>
                                <ListItem id='Koolitus' button onClick={getValue}>
                                    <ListItemIcon><SchoolIcon /></ListItemIcon>                                
                                    Koolitus
                                </ListItem>
                                <ListItem id='Hange' button onClick={getValue}>
                                    <ListItemIcon><BusinessCenterIcon /></ListItemIcon>                                
                                    Hange
                                </ListItem>
                                <ListItem id='Varia' button onClick={getValue}>
                                    <ListItemIcon><AcUnitIcon /></ListItemIcon>                                
                                    Varia
                                </ListItem>
                            </List>
                            <Divider />
                            <List>                
                                <ListItem button >
                                    
                                </ListItem>            
                            </List>
                            </div>
                    </Drawer>
                </div>            
    )
}

export default SideBarSmall
