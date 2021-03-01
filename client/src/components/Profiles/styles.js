import { makeStyles } from '@material-ui/core/styles';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const useStyles = makeStyles((theme) => ({
    container: {        
      display: 'flex',
      justifyContent: 'center',
      '@media (max-width: 600px)': {
        flexDirection: 'column'
      },
    },
      name: {
        fontWeight: 'bold',
        '@media (max-width: 600px)': {
          fontSize: '2rem'
        },
      },
      text: {
        marginTop: 20,        
      },
      boxLeft: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 0,
        marginRight: '1.5rem',
      },
      leftContainer: {
        backgroundColor: 'white',
        padding: '.5rem',
        width: '100%',
        marginBottom: '1rem'
      },
      boxRight: {
        marginTop: theme.spacing(4),
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
        marginTop: 50,  
        margin: theme.spacing(1),
          width: 100,
          height: 100,
          '@media (max-width: 600px)': {
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

      leftPaper: {
        padding: '.8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
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