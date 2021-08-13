/**
 * This script exports the Sign Up component.
 *
 * @author Carlos Santín
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

/* local imports */
import { useAppDispatch } from 'store/hooks';
import { signUp } from 'store/slices/authSlice';
import { switchAuthenticationForm } from 'store/slices/globalSlice';

import {
  NAVIGATION_AUTHENTICATION_SIGN_IN,
  AUTHENTICATION_INVALID_PWD_MSG,
  AUTHENTICATION_PWD_VALIDATION_REGEX,
} from 'lib/types';

interface SignUpFormFields {
  userName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  // const [confirmDirty, setConfirmDirty] = useState(false);
  const dispatch = useAppDispatch();

  /**
   * Handles the blur input event used to set the form dirty flag into local
   * state.
   * @param  {Event} e
   */
  function handleConfirmBlur(e: any) {
    console.log(e);

    // get the value from the target of the blur event, i.e. the input textbox
    // const { value } = e.target;
    // /* set the state of the component to dirty if is already dirty or value is not empty */
    // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  /**
   * Matches password with confirm password input field.
   * @param  {Object} rule
   * @param  {string} value
   * @param  {Function} callback
   */
  function validateToNextPassword(
    rule: Object,
    value: string,
    callback: (constant?: string) => void
  ) {
    /* get the form object from properties */
    /* if the value is not empty and has change, force validation */

    /* if the value does not match the regular expression validation, show error message */
    if (value && !AUTHENTICATION_PWD_VALIDATION_REGEX.test(value)) {
      callback(AUTHENTICATION_INVALID_PWD_MSG);
    } else {
      callback();
    }
  }

  /**
   * Matches confirm password with password input field.
   * @param  {Object} rule
   * @param  {string} value
   * @param  {Function} callback
   */
  function compareToFirstPassword(rule: Object, value: string, callback: () => void) {
    callback();
  }

  /**
   * Handles the sign up submission
   * @param  {Event} e
   */
  async function handleSubmit({ userName, email, password }: SignUpFormFields) {
    setIsLoading(true);

    try {
      await dispatch(signUp(userName, email, password));
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="userName"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item>
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: 'Please input your Password!' },
          {
            validator: validateToNextPassword,
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            validator: compareToFirstPassword,
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm Password"
          onBlur={handleConfirmBlur}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
          Sign Up
        </Button>
        <hr />
        <a
          href="#/"
          onClick={() => dispatch(switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN))}
        >
          Sign In Instead
        </a>
      </Form.Item>
    </Form>
  );
}
