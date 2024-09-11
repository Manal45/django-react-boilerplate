import React, { FormEvent, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { AuthContext } from '../../context/AuthContext';

function initialFormValues() {
  return {
    email: '',
    password: ''
  };
}

export function Login() {
  const [values, setValues] = useState(initialFormValues);
  const [loginRequestStatus, setLoginRequestStatus] = useState('success');
  const { signIn } = useContext(AuthContext);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoginRequestStatus('loading');

    await signIn(values);

    setLoginRequestStatus('success');
  }

  useEffect(() => {
    // clean the function to fix memory leak
    return () => setLoginRequestStatus('success');
  }, []);

  return (
    <div>
      <Form noValidate data-testid="login-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="text-muted"
            placeholder="Email"
            value={values.email}
            type="email"
            name="email"
            data-testid="login-input-email"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="text-muted"
            placeholder="Password"
            value={values.password}
            type="password"
            name="password"
            data-testid="login-input-password"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          type="submit"
          data-testid="login-submit-button"
          disabled={loginRequestStatus === 'loading'}
        >
          {loginRequestStatus === 'loading' ? 'Loading...' : 'Submit'}
        </Button>
      </Form>
    </div>
  );
}
