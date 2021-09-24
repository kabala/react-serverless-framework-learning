/**
 * This script exports the Sign In component.
 *
 * @author Carlos Santín
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */

/* external imports */
import React, { useCallback } from 'react';
import { Link } from 'wouter';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/* local imports */
import { signIn } from 'store/slices/authSlice';
import { useAppDispatch } from 'store/hooks';

interface SignInFormFields {
  username: string;
  password: string;
}

export default function SignIn() {
  const dispatch = useAppDispatch();

  /**
   * Handles the sign in submission
   * @param  {SignInFormFields} form fields
   */
  const handleSubmit = useCallback(
    async ({ username, password }: SignInFormFields): Promise<void> => {
      dispatch(signIn({ username, password }));
    },
    []
  );

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        label="User"
        rules={[{ required: true, message: 'Insert your username.' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Insert your password.' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        {/* render the forgot password link. clicking will switch to the forgot password form. */}
        <Link href="/">Forgot Password</Link>
      </Form.Item>
      <Form.Item>
        {/* render sign in button, when clicked, an attempt to sing in will executed */}
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign In
        </Button>
        <hr />
        {/* Render switch to sign up link */}
        <Link to="/signup">Create Account</Link>
      </Form.Item>
    </Form>
  );
}
