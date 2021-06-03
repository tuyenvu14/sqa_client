import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from "react-router-dom";
import checkPermission from "./permission";
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PeopleIcon from '@material-ui/icons/People';
import ArchiveIcon from '@material-ui/icons/Archive';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WorkIcon from '@material-ui/icons/Work';
import "./Layout.css"



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  paddingLeft: {
    paddingLeft:"72%"
  },
  paddingRight: {
    paddingLeft:"5px"
  },
}));

export default function Layout({ children, permissions = [], title }) {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState([]);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

    const handleLogout = () => {
    window.localStorage.removeItem("accessToken");
    history.push("/login");
  };

    useEffect(() => {
    setRoles(window.localStorage.getItem("role").split(","));
    setUsername(window.localStorage.getItem("username"));
  }, []);

  if (roles[0] && !checkPermission(permissions, roles)) {
    history.push({
      pathname: "/error",
      state: { status: 403 },
    });
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getIcon = () => {
      return [<PhoneIphoneIcon/>, <PhoneIphoneIcon/>, <PhoneIphoneIcon/>, <PhoneIphoneIcon/>, <PhoneIphoneIcon/>]
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
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
          <Typography variant="h6" noWrap>
            <a href="" class="navbar-brand text-white" onClick={() => history.push("/")}>
            Home
            </a>
          </Typography>

          <Typography variant="h6" noWrap className={classes.paddingLeft} >
            <a href="" class="navbar-brand text-white" onClick={() => history.push("/me")}>
            Hi, {username} !
            </a>
          </Typography>

          <Typography >
          <a href="" className="navbar-brand text-white " onClick={handleLogout}>
              <i className="fa fa-sign-out margin-r5 "></i>
            Logout
          </a>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* {['Product', 'Supplier', 'Customer', 'Import', 'Sale'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{[<PhoneIphoneIcon/>, <PhoneIphoneIcon/>, <PhoneIphoneIcon/>, <PhoneIphoneIcon/>, <PhoneIphoneIcon/>][index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          <ListItem button onClick={() => history.push("/items")} > 
          <ListItemIcon><PhoneIphoneIcon/></ListItemIcon>
            <ListItemText primary={"Product"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/suppliers")} > 
          <ListItemIcon><WorkIcon/></ListItemIcon>
            <ListItemText primary={"Provider"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/customers")} > 
          <ListItemIcon><PeopleAltIcon/></ListItemIcon>
            <ListItemText primary={"Customer"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/sales")} > 
          <ListItemIcon><MoneyIcon/></ListItemIcon>
            <ListItemText primary={"Sale"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/imports")} > 
          <ListItemIcon><ArrowDownwardIcon/></ListItemIcon>
            <ListItemText primary={"Import"} />
          </ListItem>

          {roles[0] && checkPermission(["ROLE_ADMIN"], roles) &&
          (<ListItem button onClick={() => history.push("/staffs")} > 
          <ListItemIcon><PersonIcon/></ListItemIcon>
            <ListItemText primary={"Staff"} />
          </ListItem>)
          }
        </List>
        <Divider />
  
      </Drawer>
    
      <>{children}</>

      </div>
  );
}
