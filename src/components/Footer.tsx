import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const Footer: React.FC =  () => {

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));


  const classes = useStyles();

  return (
    <React.Fragment>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          海外移住ちゃんねる
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          ご利用は利用者各位のご判断にお任せしています｜
          コンテンツの無断複写、転載を禁じます。
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}

export default Footer;