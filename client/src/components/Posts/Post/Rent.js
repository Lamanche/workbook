import React, { useState, useEffect } from 'react';
import styles from './Post.module.css';

import { TextField, InputAdornment, Switch } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const Rent = ({ data, modify, handleChange, setAvailable }) => {
    const [state, setState] = useState({available: data.available});
    
    const changeAvailable = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setAvailable(state.available)
    };
    
    useEffect(() => {
        setState({available: data.available})
    },[modify, data.available])
    
    return (
        <div>
            <div className={styles.availableContainer}>
                <div className={styles.availableHeader}>
                    {data.available === true || state.available === true ? <DoneOutlineIcon /> : <HighlightOffIcon />}
                    <h3 className={state.available === true ? styles.available : styles.notAvailable}>{state.available === true ? 'saadaval' : 'pole saadaval'}</h3>
                </div>                
                {modify === true ? 
                    <Switch
                        checked={state.available}
                        onChange={changeAvailable}
                        name="available"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    :
                    null
                }
            </div>            
            {(modify === true && state.available === false) || (modify === false && data.available === false) ? 
                <TextField
                    className={styles.availableText}
                    onChange={handleChange}
                    label="Saadaval alates"
                    name= 'availableFrom'
                    defaultValue={data?.availableFrom}
                    value={modify === false ? data.availableFrom : undefined}                        
                    fullWidth                        
                    InputProps={{
                        readOnly: modify === true ? false : true,
                        classes: {
                            root: modify === true ? styles.textModify : styles.description,
                            input: styles.textField,                                
                        },
                        endAdornment: (
                            modify === true ? <CreateIcon/> : null
                        ),
                        startAdornment: <InputAdornment position="start"><EventBusyIcon /></InputAdornment>,
                    }}
                    multiline
                    InputLabelProps={{ shrink: true }}
                />
                :
                null
            }            
        </div>
    )
}

export default Rent
