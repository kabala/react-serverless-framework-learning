/**
 * This script exports the Sign In component.
 *
 * @author Carlos Santín
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */

/* external imports */
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/* local imports */
import { setUsername } from 'store/slices/authSlice';
import { switchAuthenticationForm } from 'store/slices/globalSlice';
import { useAppDispatch } from 'store/hooks';
import {
  NAVIGATION_AUTHENTICATION_SIGN_UP,
  NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD,
  // NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT,
} from 'lib/types';

interface SignInFormFields {
  userName: string;
  password: string;
}

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  /**
   * Handles the sign in submission
   * @param  {SignInFormFields} form fields
   */
  async function handleSubmit({ userName }: SignInFormFields): Promise<void> {
    setIsLoading(true);
    console.log('hi');
    dispatch(setUsername(userName));
    // try {
    //   await dispatch(signIn(userName, password));
    // } catch (error) {
    //   if (error.includes('not confirmed')) {
    //     dispatch(setUsername(userName));
    //     dispatch(switchAuthenticationForm(NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT));
    //   }
    //
    //   console.log(error);
    // }
    setIsLoading(false);
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="userName"
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
        <a
          href="#/"
          onClick={() => {
            dispatch(switchAuthenticationForm(NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD));
          }}
        >
          Forgot Password
        </a>
      </Form.Item>
      <Form.Item>
        {/* render sign in button, when clicked, an attempt to sing in will executed */}
        <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
          Sign In
        </Button>
        <hr />
        {/* Render switch to sign up link */}
        <a
          href="#/"
          onClick={() => {
            dispatch(switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_UP));
          }}
        >
          Create Account
        </a>
      </Form.Item>
    </Form>
  );
}
