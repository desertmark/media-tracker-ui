import { AppBar, IconButton, Typography, Button, Toolbar, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import AppBarButton from '../app-bar-button.js/app-bar-button';
import SideBar from '../side-bar/side-bar';
import { SIDEBAR_MENU } from '../../config/menu';
import { Link } from 'react-router-dom';
import Text from '../text/text';
import { useLoginState } from '../../app/login/login.context';
import { useAppState } from '../../app/app.context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();
  const loginState = useLoginState();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => setIsOpen(!isOpen)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <AppBarButton to="/home">Home</AppBarButton>
            <AppBarButton to="/about">About</AppBarButton>
          </Typography>

          {!loginState.isAuthenticated &&
            <Button>
              <Text color="primary.contrastText">
                <Link to="/login">Login</Link>
              </Text>
            </Button>
          }
          {loginState.isAuthenticated &&
            <Button onClick={() => loginState.logOut()}>
              <Text color="primary.contrastText">
                Log Out
              </Text>
            </Button>
          }
        </Toolbar>
      </AppBar>
      <SideBar
        open={isOpen}
        onClose={() => setIsOpen(false)}
        items={SIDEBAR_MENU}
        onItemClick={key => console.log(key)}
      ></SideBar>
    </div>
  );
}

export default Header;