import React, { useState, useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Slide from 'react-reveal/Slide';

const  Login = (props) => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        try {
            setErr('');
            setLoading(true);
            props.loginUser({ email : emailRef.current.value, password : passwordRef.current.value });
        }
        catch {
            setErr("Unable to login!!!");
        }
        setLoading(false);
    }

    function handleGoogle(e) {
        e.preventDefault();
        try {
            setErr('');
            setLoading(true);
            props.googleLogin();
        }
        catch {
            setErr("Unable to  login!!!");
        }
        setLoading(false);
    }

    if(props.auth.isAuthenticated) {
        return <Redirect to={`/home`}    />
    }

    return (
        <>
            <Slide top>
                <div className="d-flex justify-content-center align-items-center" style={{marginTop:"6rem"}}>
                    <div className="col-12 col-md-5 shadow-lg p-3 mb-5 bg-white rounded-5">
                        <h1 className="text-center">Log In</h1>
                        <Form onSubmit={handleSubmit}>
                        {err && <Alert variant="danger">{err}</Alert>}
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                type="email" 
                                name = "email"
                                placeholder="email..." 
                                required
                                ref={emailRef}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                name = "password"
                                placeholder="password..."
                                required
                                ref={passwordRef}
                                />
                            </Form.Group>
                            <Button disabled={loading} className="btn w-50 mt-3" variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <Button  type="submit" className="mt-4" onClick={handleGoogle}>
                            Login With <FcGoogle size="40" />
                        </Button>
                        <div className="mt-3">
                            <h5>Need an account? <Link to="/signup">Signup</Link></h5>
                        </div>
                    </div>
                </div>
            </Slide>
        </>
    )
}

export default Login;
