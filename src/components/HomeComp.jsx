import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import UpdateIcon from '@material-ui/icons/Update';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Message from './Message';
import firebase from 'firebase'
import {MdSend} from 'react-icons/md';
import TextField from '@material-ui/core/TextField'
import { db, auth } from '../firebase/firebase'


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
}));


const Home = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    const handleLogout = () => {
        props.logout();
    }

    useEffect(() => {
        db.collection('messages').orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => ({ id : doc.id, message : doc.data()})))
        })
    }, []);


    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('messages').add({
            username : auth.currentUser.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            message : input
        });

        setInput('');
    }

    console.log(auth.currentUser.photoURL)

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
                { 
                    auth.currentUser ?
                    auth.currentUser.photoURL ? (<img src={auth.currentUser.photoURL} style={{width:"30px", height : "30px", borderRadius : "50%"}} alt={auth.currentUser.displayName}  />)  : auth.currentUser.displayName : <SentimentVeryDissatisfiedIcon  />
                }
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
            <List style={{marginLeft:"auto", marginRight:"auto"}} className="d-flex flex-column">
                <div>
                    <UpdateIcon   /><Link to={`/update-profile`}>Update Profile</Link>
                </div>
                <div>
                    <ExitToAppIcon  /><Button variant="contained" onClick={handleLogout}>Logout</Button>
                </div>
            </List>
            <Divider />
            <List>
            </List>
        </Drawer>
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
                <div>
                    {
                        messages.map(({ id, message}) => {
                            return <Message key={id} message={message.message} username={message.username}  />
                        })
                    }
                </div>
                <div style={{position:"fixed", bottom:"0", left : "0",right : "0", padding:"10px", backgroundColor:"grey", overflow:"hidden"}}>
                        <Form onSubmit={sendMessage} className="d-flex flex-row justify-content-center align-items-center">
                            <Form.Group>
                            <TextField id="standard-basic" label="Enter text" value={input} 
                            onChange = {e => setInput(e.target.value)} />
                            </Form.Group>
                            <Button type="submit" className="" disabled={!input} ><MdSend  /></Button>
                        </Form>
                </div>
        </main>
    </div>
    )
}

export default Home;