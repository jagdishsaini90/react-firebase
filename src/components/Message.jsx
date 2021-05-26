import React from 'react';
import { auth } from '../firebase/firebase';
import { Card , CardContent, Typography } from '@material-ui/core';
import Zoom from 'react-reveal/Zoom';
import './Message.css';


const Message = ({ message, username }) => {

    let isUser = auth.currentUser.displayName === username;

    return (
        <>
            <Zoom>
                <div className={`message ${isUser && "message__user"}`}>
                    { !isUser && <p style={{fontSize:"10px", marginBottom:"0"}}>{username.split(" ")[0]}</p>}
                    <Card className={isUser ? "message__user" : "message__guest"}>
                        <CardContent>
                            <Typography
                            variant="h5"
                            component="h2"
                            >   
                                {message}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </Zoom>
        </>
    )
}

export default Message;
