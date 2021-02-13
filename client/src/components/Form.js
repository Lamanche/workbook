import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
//import FileBase from 'react-file-base64';

// API
import { createPost } from '../api/index.js';

// Styles
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const Form = () => {    
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory()
    const initialState = { name: user.result.name, email: user.result.email, creatorId: user.result._id, picture: user.result.picture, category: '', description: '', about: '', price: ''}
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(formData)
        .then(res => {
            if (res.status === 201){
                history.push('/main')}
        }).catch(error => console.log(error))};
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };
    
    const back = () => history.replace("/main")
    
// Styles
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
            width: 100,
            height: 100,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        back: {
            marginBottom: theme.spacing(3),
        },
        }));

    const classes = useStyles();    
    
    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} src={user.result.picture}></Avatar>
                    <Typography component="h1" variant="h4">
                        Create
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>Category</InputLabel>
                                        <Select required name="category" defaultValue = "" label="Category" onChange={handleChange}>
                                            <MenuItem value="Engineering">Engineering</MenuItem>
                                            <MenuItem value="Coding">Coding</MenuItem>
                                            <MenuItem value="Design">Design</MenuItem>
                                            <MenuItem value="Construction">Construction</MenuItem>
                                        </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Headline"
                                    name="description"
                                    autoComplete="description"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="about"
                                    label="Description"
                                    type="about"
                                    id="about"
                                    autoComplete="about"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="price"
                                    label="Price from .. €"                                    
                                    id="price"
                                    autoComplete="price"
                                    type="number"
                                    //InputLabelProps={{
                                       // shrink: true,
                                    //}}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create
                        </Button>
                        <Button
                            type=""
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.back}
                            onClick={back}
                        >
                            Cancel
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }

export default Form
