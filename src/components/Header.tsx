import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';
import styled from 'styled-components'
import Modal from "react-modal";
import ForumIcon from '@material-ui/icons/Forum';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';

Modal.setAppElement("#root");

const drawerWidth = 240;

const DrawerButton = styled(Button)`
  font-size: 20px;
  padding: 15px 82px 15px 36px;
`
const Title = styled(Link)`
  color: white;
  fontWeight: bold;
`
const ButtonMS = styled(IconButton)`
  color: white;
  fontWeight: bold;
`

const Header: React.FC =  () => {

  const useStyles = makeStyles((theme) => ({
    white: {
      color: grey[50],
    },
    textDecorationNone: {
      textDecoration: 'none',
      fontWeight: 'bold',
      color: 'white',
      flexGrow: 1,
    },
    header: {
      textDecoration: 'none',
      display: 'block',
      "&:hover": {
        backgroundColor: '#f2f3f7',
      },
    },
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'center',
      backgroundColor: '#3f51b5',
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('海外移住ちゃんねる');

  const handleDrawerOpen = () => {
    setOpen(true);
    setTitle('');
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setTitle('海外移住ちゃんねる');
  };

  const toggleDrawer = () => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setTitle('海外移住ちゃんねる');
    setOpen(false);
  };

  const cards= [{title: '掲示板', icon: <CommentIcon fontSize="large"/>, url: '/thread'},
                {title: 'チャット', icon: <ForumIcon fontSize="large"/>, url: '/chat'},
                {title: 'ログイン', icon: <ExitToAppIcon fontSize="large"/>, url: '/auth'}];

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Title to="/" className={classes.textDecorationNone}>
            {title}
          </Title>
          <Title to="/auth">
            ログイン
          </Title>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        transitionDuration={300}
        open={open}
        onClose={toggleDrawer()}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <ButtonMS onClick={handleDrawerClose}>
            <MenuIcon />
          </ButtonMS>
          <Link to="/" onClick={handleDrawerClose} className={classes.textDecorationNone}>
            海外移住ちゃんねる
          </Link>
        </div>
        <List>
          {cards.map((card, index: number) => (
            <Link to={card.url} onClick={handleDrawerClose} className={classes.header} key={index}>
              <DrawerButton startIcon={card.icon}>
                {card.title}
              </DrawerButton>
            </Link>
          ))}
        </List>
      </Drawer>

    </React.Fragment>
  );
}

export default Header;