
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    appBar: {
      height: 158,
      position: 'relative',
      display: 'flex',
      paddingTop: 8, 
      "@media (max-width: 550px)": {
        flexDirection: 'column',
        height: 120,
      }  
    },
    
// Title
    title: {
      position: 'absolute',
      bottom: 10,
      left: 20,
      "@media (max-width: 550px)": {
        left: 10   
      },          
    },
    headline: {
      fontWeight: 'bold',
      fontSize: '4rem',
      textShadow: '2px 2px 4px #000000',
      "@media (max-width: 550px)": {
        fontSize: '2.8rem',       
      },       
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    },

// profile
    profile: {
      display: 'flex',
      position: 'absolute',
      right: 20, 
      top: 10, 
      "@media (max-width: 550px)": {
        top: 2,
      }
    },
    avatar: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 10,
      marginTop: 4,
      "@media (max-width: 550px)": {
        marginRight: 10,
        height: 25,
        width: 25,
        marginTop: 12,
      }
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
      "@media (max-width: 550px)": {
        fontSize: '0.9rem',
      }
    },
    login: {
        display: 'flex',
        position: 'absolute',
        right: 20, 
        top: 10, 
        "@media (max-width: 550px)": {
          top: 2,
      },
    }  
  }));