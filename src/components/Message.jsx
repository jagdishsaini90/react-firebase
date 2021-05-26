import React from 'react';
import { auth } from '../firebase/firebase';
import { ListItemText } from '@material-ui/core';
import Zoom from 'react-reveal/Zoom';
import './Message.css';


const Message = ({ message, username }) => {

    let isUser = auth.currentUser.displayName === username;

    return (
        <>
            <Zoom>
                <div className={`message ${isUser && "message__user"}`}>
                    { !isUser && <p style={{fontSize:"10px", marginBottom:"0"}}>{username.split(" ")[0]}</p>}
                    <ListItemText  primary={message} className={isUser ? "message__user" : "message__guest"}  />
                </div>
            </Zoom>
        </>
    )
}

export default Message;
