import { Typography } from '@material-ui/core'


export const Copyright = () => {  
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}Wörkbook{' '}{new Date().getFullYear()}{'.'}
      </Typography>
    );
  }

