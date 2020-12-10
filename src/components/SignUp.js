import React, { useRef, useState } from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'
export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords don't match")
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        }
        catch{
            setError("Failed to create account")
        }
        setLoading(false)
        history.push("/")
    } 
    return (
    <>
    <Card>
        <Card.Body>
        <h2 className = "text-center mb-4"> Sign Up</h2>
        {error && <Alert variant = "danger">{error}</Alert>}
        <Form onSubmit = {handleSubmit}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" ref = {emailRef} placeholder="Enter email" required/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref = {passwordRef} placeholder="Password" required/>
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref = {passwordConfirmRef} placeholder="Confirm Password" required/>
        </Form.Group>
        <Button disabled={loading} variant="primary" type="submit">
            Sign Up
        </Button>
        </Form>
        </Card.Body>
        <h6 style = {{textAlign: "center"}}> Already Have an Account? <Link to = "/login">Sign In</Link></h6>
        </Card>
    </>
    )
}
