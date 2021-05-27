import React, { useState } from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import firebase from 'firebase';
import { auth } from '../firebase/firebase'
import { Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide'

const UpdateProfile = (props) => {


    const [name, setName] = useState(auth.currentUser ? auth.currentUser.displayName : '');
    const [email,setEmail] = useState(auth.currentUser ? auth.currentUser.email : '');
    const [password, setPassword] = useState(auth.currentUser ? auth.currentUser.password : '');
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
    const [err, setError] = useState(null);


    function handleChange(e) {
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    function handleUpload(e) {
        e.preventDefault();
        if(file) {
            const uploadTask = firebase.storage().ref(`/images/${file.name}`).put(file);
            uploadTask.on("state_changed", console.error, () => {
                firebase.storage()
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                    setFile(null);
                    setURL(url);
                    });
                });
        }

        auth.currentUser.updateProfile({
            displayName : name,
            email : email,
            password : password,
            photoURL : url
        }).then(() =>  console.log("Success Fully updated"))
        .catch((err) => setError(err.message))

        props.logout();
    }


    return (
        <>
            <Slide top>
                <div className="d-flex justify-content-center align-items-center" style={{marginTop:"3rem"}}>
                    <div className="col-12 col-md-5 shadow-lg p-3 mb-5 bg-white rounded-3 ">
                    <h1 className="text-center">Update Profile</h1>
                        <Form onSubmit={handleUpload}>
                            {err && <Alert variant="danger">{err}</Alert>}
                            <Form.Row>
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name..."
                                    value={name}
                                    onChange={e => setName(e.target.value)} 
                                    required
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                value = {email}
                                onChange={e => setEmail(e.target.value)} 
                                required
                                />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                value = {password}
                                onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Upload Profile Image</Form.Label>
                                <Form.File id="exampleFormControlFile1" type="file" 
                                onChange={handleChange}
                                />
                            </Form.Group>
                            <Button variant="primary" className="mt-3 w-100" type="submit">
                                Submit
                            </Button>
                            <Link to={`/home`}>Back</Link>
                        </Form>
                    </div>
                </div>  
            </Slide>
        </>
    )
}

export default UpdateProfile
