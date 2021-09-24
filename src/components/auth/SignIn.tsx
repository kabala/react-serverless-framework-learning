/**
 * This script exports the Sign In component.
 *
 * @author Carlos Santín
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */

/* external imports */
import React, { useState, useCallback } from 'react';
import { Link } from 'wouter';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/* local imports */
import { signIn } from 'store/slices/authSlice';
// import { switchAuthenticationForm } from 'store/slices/globalSlice';
import { useAppDispatch } from 'store/hooks';
// import {
//   NAVIGATION_AUTHENTICATION_SIGN_UP,
//   NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD,
//   // NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT,
// } from 'lib/types';

interface SignInFormFields {
  username: string;
  password: string;
}

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  /**
   * Handles the sign in submission
   * @param  {SignInFormFields} form fields
   */

  const handleSubmit = useCallback(
    async ({ username, password }: SignInFormFields): Promise<void> => {
      setIsLoading(true);
      dispatch(signIn({ username, password }));
      // try {
      //   await dispatch(signIn(username, password));
      // } catch (error) {
      //   if (error.includes('not confirmed')) {
      //     dispatch(setUsername(username));
      //     dispatch(switchAuthenticationForm(NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT));
      //   }
      //
      //   console.log(error);
      // }
      setIsLoading(false);
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
        <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
          Sign In
        </Button>
        <hr />
        {/* Render switch to sign up link */}
        <Link href="/">Create Account</Link>
      </Form.Item>
    </Form>
  );
}
