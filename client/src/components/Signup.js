import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      const URL = '/api/user';

      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Randi Zuckerberg',
          userEmail: emailRef.current.value,
          emailList: [],
          histories: [],
        }),
      };
      const res = await fetch(`${URL}`, options);
      const response = await res.json();
      console.log(response);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <>
      <Card style={{ maxWidth: '400px' }} className='w-100'>
        <Card.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email' className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password' className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='password-confirm' className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  );
}
