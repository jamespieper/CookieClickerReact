import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'



export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to log in')
        }

        setLoading(false)


    }
    return (
        <>

            <Container className="p-5" style={{height: '1000px'}}>
                <Card style={{width: '50%', margin: 'auto', marginTop: '20%'}}>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Log In</h2>

                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required />
                            </Form.Group>

                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required />
                            </Form.Group>


                            <Button disabled={loading} className='w-100 mt-4' type="submit">Log in</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    No account yet? <Link to='/signup'>Sign up</Link>
                </div>
            </Container>

        </>
    )
}