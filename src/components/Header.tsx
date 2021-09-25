import React, { useState, useEffect, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CommentIcon from "@material-ui/icons/Comment";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import grey from "@material-ui/core/colors/grey";
import styled from "styled-components";
import Modal from "react-modal";
import ForumIcon from "@material-ui/icons/Forum";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "../features/userSlice";
import { auth } from "../service/firebase";

import { Avatar } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Theme } from "@material-ui/core/styles";

Modal.setAppElement("#root");

const drawerWidth = 240;

const DrawerButton = styled(Button)`
  font-size: 20px;
  padding: 15px 82px 15px 36px;
`;
const Title = styled(Link)`
  color: white;
  fontweight: bold;
`;
const ButtonMS = styled(IconButton)`
  color: white;
  fontweight: bold;
`;

const Header: React.FC = () => {
  const useStyles = makeStyles((theme: Theme) => ({
    white: {
      color: grey[50],
    },
    textDecorationNone: {
      textDecoration: "none",
      fontWeight: "bold",
      color: "white",
      flexGrow: 1,
    },
    header: {
      textDecoration: "none",
      display: "block",
      "&:hover": {
        backgroundColor: "#f2f3f7",
      },
    },
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "center",
      backgroundColor: "#3f51b5",
    },
    avatar: {
      cursor: "pointer",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("海外移住ちゃんねる");
  const [openMenu, setOpenmenu] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
    setTitle("");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setTitle("海外移住ちゃんねる");
  };

  const toggleDrawer = () => {
    setTitle("海外移住ちゃんねる");
    setOpen(false);
  };

  const handleToggle = () => {
    setOpenmenu((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenmenu(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenmenu(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openMenu);
  useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  const cards = [
    { title: "掲示板", icon: <CommentIcon fontSize="large" />, url: "/thread" },
    { title: "チャット", icon: <ForumIcon fontSize="large" />, url: "/chat" },
  ];

  return (
    <React.Fragment>
      <AppBar position="fixed">
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
          {user.uid ? (
            <div>
              <Button
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
              >
                <Avatar
                  className={classes.avatar}
                  src={user.photoUrl}
                  onClick={handleToggle}
                />
              </Button>
              <Popper
                open={openMenu}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={openMenu}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            onClick={async () => {
                              await auth.signOut();
                            }}
                          >
                            ログアウト
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          ) : (
            <Title to="/auth">ログイン</Title>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        transitionDuration={300}
        open={open}
        onClose={toggleDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <ButtonMS onClick={handleDrawerClose}>
            <MenuIcon />
          </ButtonMS>
          <Link
            to="/"
            onClick={handleDrawerClose}
            className={classes.textDecorationNone}
          >
            海外移住ちゃんねる
          </Link>
        </div>
        <List>
          {cards.map((card, index: number) => (
            <Link
              to={card.url}
              onClick={handleDrawerClose}
              className={classes.header}
              key={index}
            >
              <DrawerButton startIcon={card.icon}>{card.title}</DrawerButton>
            </Link>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default Header;
