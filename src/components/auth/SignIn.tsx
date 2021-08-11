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
// import { setUsername } from 'store/actions/authActions';
import switchAuthenticationForm from 'store/actions/global';
import { useAppDispatch } from 'store/hooks';
import {
  NAVIGATION_AUTHENTICATION_SIGN_UP,
  NAVIGATION_AUTHENTICATION_FORGOT_PASSWORD,
  // NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT,
} from 'lib/types';

// interface SignUpFormFields {
//   userName: string;
//   password: string;
// }

export default function SignIn() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  /**
   * Helper function to display any error of sign in operation.
   * @param  {string} error
   * @param  {Object} values
   */
  // function evaluateSignInResult(error: string, values: SignUpFormFields) {
  //   /* determine the error by evaluating true conditions. */
  //   switch (true) {
  //     /* the account is not yet confirmed, switch to confirm account form */
  //     case error.includes('not confirmed'):
  //       dispatch(setUsername(values.userName));
  //       dispatch(switchAuthenticationForm(NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT));
  //       break;
  //     /* there was another error, display error message in password field */
  //
  //     default:
  //       form.setFields([
  //         {
  //           name: 'password',
  //           value: values.password,
  //           errors: [error],
  //         },
  //       ]);
  //   }
  // }

  /**
   * Handles the sign in submission
   * @param  {Event} e
   */
  async function handleSubmit(e: Event): Promise<void> {
    /* cancel the form submission, we want to login manually instead */
    e.preventDefault();
    /* switch on loading spin on parent component */
    setIsLoading(true);
    /* validate fields */

    // await form.validateFields(async (err, values) => {
    //   if (!err) {
    //     /* try to sign in asynchronously, if success, undefined is returned, otherwise
    //             a string message is returned. */
    //     const error = await signIn(values.userName, values.password);
    //     /* if there was an error, call helper function */
    //     if (error) {
    //       evaluateSignInResult(error, values);
    //     }
    //   }
    //   /* disable loading UI */
    //   setIsLoading(false);
    // });
    try {
      const formValidationData = await form.validateFields();
      console.log(formValidationData);
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  }
  /**
   * Renders the sign in form component.
   * @returns {React.Component}
   */
  /* get Ant design form field decorator function for this form */
  // const { getFieldDecorator } = this.props.form;
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="userName" label="User">
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" label="Password">
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

/* redux map state to properties */
/*
const mapStateToProps = (state, ownProps) => {
  return {
    switchLoading: ownProps.switchLoading,
    username: state.authentication.username,
  };
};
 */
/* redux map dispatch functions to properties */
/*
const mapDispatchToProps = {
  signIn,
  setUsername,
  switchAuthenticationForm,
};
*/
