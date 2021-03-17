import React, { useState, useEffect } from 'react';
import styles from './Post.module.css';
import moment from 'moment';
import 'moment/locale/et';

import { TextField, InputAdornment, Switch } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import CreateIcon from '@material-ui/icons/Create';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const Rent = ({ formData, setFormData, data, modify }) => {
    const [available, setAvailable] = useState(data.available);
    
    const handleChange = (e) => {       
        setAvailable(e.target.checked);
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };

    const [selectedDate, setSelectedDate] = useState(data.availableFrom);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormData({ ...formData, availableFrom: date });
    };

    useEffect(() => {
        setAvailable(data.available)
        setSelectedDate(data.availableFrom !== '' ? data.availableFrom : moment())
    },[modify, data.available, data.availableFrom])
    
    return (
        <div>
            <div className={styles.availableContainer}>
                <div className={styles.availableHeader}>
                    {data.available === true || available === true ? <DoneOutlineIcon /> : <HighlightOffIcon />}
                    <h3 className={available === true ? styles.available : styles.notAvailable}>{available === true ? 'Saadaval' : 'Pole hetkel saadaval'}</h3>
                </div>                
                {modify === true ?                     
                    <Switch
                        checked={available}
                        onChange={handleChange}
                        name="available"
                        color='primary'
                        classes={{ 
                            root: styles.switch,
                            switchBase: styles.switchSwitchBase,
                            thumb: styles.switchThumb,
                            track: styles.switchTrack,
                            checked: styles.switchChecked                        
                        }}
                    />                    
                    :
                    null
                }
            </div>            
            {modify === true && available === false ?                  
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        disablePast
                        variant="dialog"
                        format="dd.MM.yyyy"
                        margin="normal"
                        label="Saadaval alates"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        InputLabelProps={{ shrink: true }}
                        classes={{ 
                            root: styles.datePicker,                        
                        }}
                    />
                </MuiPickersUtilsProvider>
                :
                null
            }
            {modify === false && data.available === false ? 
                <TextField
                    className={styles.availableText}
                    //onChange={handleChange}
                    label="Saadaval alates"
                    name= 'availableFrom'
                    defaultValue={moment(selectedDate).format('LL')}                       
                    fullWidth                        
                    InputProps={{
                        readOnly: true,
                        classes: {
                            root: styles.description,
                            input: styles.textField,                                
                        },
                        endAdornment: (
                            modify === true ? <CreateIcon/> : null
                        ),
                        startAdornment: <InputAdornment position="start"><EventBusyIcon /></InputAdornment>,
                    }}                    
                    InputLabelProps={{ shrink: true }}
                />
                :
                null
            }          
        </div>
    )
}

export default Rent
