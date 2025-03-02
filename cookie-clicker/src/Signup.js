import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'

import { db } from './firebase'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'

export default function Signup() {

    //authentication stuff
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    //firestore stuff
    const usersCollectionRef = collection(db, 'users')

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)

            await setDoc(doc(db, "users", String(emailRef.current.value)), {

                name: emailRef.current.value,
                cookies: Number(0),
                factory: Number(0),
                grandma: Number(0),
                mine: Number(0),
                temple: Number(0),
                prestigeLvl: Number(0),

                achievements: ['Ready to Go - Create an account and sign in']

            }

            )

            navigate('/')
        } catch {
            setError('Failed to create account')
        }

        setLoading(false)

    }



    return (
        <>

            <Container className="p-5" style={{ height: '1000px' }}>
                <Card style={{ width: '50%', margin: 'auto', marginTop: '20%' }}>
                    <Card.Body>
                        <h2 className='text-center mb-4>'>Sign Up</h2>

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

                            <Form.Group id='password-confirm'>
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type='password' ref={passwordConfirmRef} required />
                            </Form.Group>

                            <Button disabled={loading} className='w-100 mt-4' type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to='/login'>Log in</Link>
                </div>
            </Container>

        </>
    )
}