import React, { useState, useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide'

function Signup(props) {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef(); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError("Passwords do not match!!!");
            return ;
        }
        try {
            setError('');
            setLoading(true)
            props.signupUser({ displayName : nameRef.current.value, email : emailRef.current.value, password : passwordRef.current.value });
        }
        catch {
            setError("Sign up failed");
        }
        e.preventDefault();
        setLoading(false)
    }

    if(props.auth.isAuthenticated) {
        return <Redirect  to={`/home`}  />
    }


    return (
        <>
            <Slide top>
                <div className="d-flex justify-content-center align-items-center" style={{marginTop:"3rem"}}>
                    <div className="col-12 col-md-5 shadow-lg p-3 mb-5 bg-white rounded-3 ">
                        <h1 className="text-center">Sign Up</h1>
                        <Form onSubmit={handleSubmit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            ref = {nameRef}
                            placeholder="Enter name......" 
                            required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            ref = {emailRef}
                            required
                            />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Password"
                            ref = {passwordRef}
                            required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Conform Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Password"
                            ref = {passwordConfirmRef}
                            required
                            />
                        </Form.Group>
                        <Button disabled={loading} className="btn w-50 mt-3" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                        <div className="mt-3">
                            <h5>Already have an account? <Link to="/login">login</Link></h5>
                        </div>
                    </div>
                </div>
            </Slide>
        </>
    )
}

export default Signup;
