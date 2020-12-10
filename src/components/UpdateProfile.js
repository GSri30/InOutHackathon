import React, { useRef, useState } from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'
export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, updateEmail, updatePassword} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    function handleSubmit(e) {
        e.preventDefault()
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords don't match")
        }
        const promises = []
        setLoading(true)
        setError("")
        if(emailRef.current.value !== currentUser.email)
        {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {setLoading(false)})
        
    } 
    return (
    <>
    <Card>
        <Card.Body>
        <h2 className = "text-center mb-4">Update Profile</h2>
        {error && <Alert variant = "danger">{error}</Alert>}
        <Form onSubmit = {handleSubmit}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" ref = {emailRef} placeholder="Enter email" required defaultValue= {currentUser.email}/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref = {passwordRef} placeholder="Password"  />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref = {passwordConfirmRef} placeholder="Confirm Password" />
        </Form.Group>
        <Button disabled={loading} variant="primary" type="submit">
            Update
        </Button>
        </Form>
        </Card.Body>
        <h6 style = {{textAlign: "center"}}>Change Your Mind? <Link to = "/">Cancel </Link></h6>
        </Card>
    </>
    )
}
