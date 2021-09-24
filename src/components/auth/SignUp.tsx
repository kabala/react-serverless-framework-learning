/**
 * This script exports the Sign Up component.
 *
 * @author Carlos Santín
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'wouter';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

/* local imports */
import { useAppDispatch } from 'store/hooks';
import { signUp } from 'store/slices/authSlice';

interface SignUpFormFields {
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const dispatch = useAppDispatch();

  /**
   * Handles the sign up submission
   * @param  {Event} e
   */
  const handleSubmit = useCallback(async ({ username, email, password }: SignUpFormFields) => {
    await dispatch(signUp({ username, email, password }));
  }, []);

  return (
    <Form onFinish={handleSubmit} autoComplete="off">
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Username"
          autoComplete="off"
          list="autocompleteOff"
        />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input type="email" prefix={<MailOutlined />} placeholder="Email" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Both passwords entered do not match!'));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm Password"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>
        <hr />
        <Link to="/signin">Sign In Instead</Link>
      </Form.Item>
    </Form>
  );
}
