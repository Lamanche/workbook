import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {        
      display: 'flex',
      justifyContent: 'center',
      '@media (max-width: 550px)': {
        flexDirection: 'column'
      },
    },
      name: {
        fontWeight: 'bold',
        '@media (max-width: 550px)': {
          fontSize: '2rem'
        },
      },
      text: {
        marginTop: 20,        
      },
      boxLeft: {
        backgroundColor: 'white',
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
      },
      boxRight: {
        marginTop: theme.spacing(8),
      },
      comments: {
        width: '100%'
      },
      grid: {
        display: 'flex',
        width: '100%'
      },
      gridItem:{
        padding: theme.spacing(1)
      },
      avatar: {
          margin: theme.spacing(1),
          width: 100,
          height: 100,
          '@media (max-width: 550px)': {
            width: 90,
          height: 90,
        },
      },
      update: {
        marginTop: theme.spacing(3),
      },
      back: {
        margin: theme.spacing(3, 0, 2),
      },




      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    btnContainer: {
        width: '100%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    updateBack: {
        marginBottom: theme.spacing(3),
    },
    input: {
        display: 'none',
    },      
}));


export default useStyles;