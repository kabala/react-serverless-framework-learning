/**
 * This script exports the Confirm Account component.
 *
 * @author Carlos Santín
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';

/* local imports */
// import { confirmRegistration, resendConfirmation } from 'store/slices/authSlice';
import { RootState } from 'store/store';
import { switchAuthenticationForm } from 'store/slices/globalSlice';
import { NAVIGATION_AUTHENTICATION_SIGN_IN } from 'lib/types';
import { useAppDispatch } from '../../store/hooks';
/* component initial state constant */

// interface ConfirmAccountFields {
//   code: string;
// }

export default function ConfirmAccount() {
  const dispatch = useAppDispatch();
  const authUsername = useSelector(({ auth: { username } }: RootState) => username);

  console.log(authUsername);

  /**
   * Confirm user registration when button is clicked.
   *  @async
   */
  async function resendConfirmationCode() {
    /* send confirmation code and wait for result(error if return a string) */
    // const error = await dispatch(resendConfirmation(username));
    // /* confirmation code message */
    // const msg = `Confirmation code send! please check your email.`;
    // /* show the send message outcome as error in the code field */
    // this.props.form.setFields({
    //   code: {
    //     errors: [new Error(error || msg)],
    //   },
    // });
  }

  /**
   * Confirm user registration when button is clicked.
   *  @async
   */
  async function confirmRegistrationCode(formData: any) {
    console.log(formData);

    // form.validateFields(async (err: any, values: any) => {
    //   /* if no error, proceed to confirm registration */
    //   if (!err) {
    //     /* confirm registration with serverless user base backend */
    //     const error = await dispatch(confirmRegistration(this.props.username, values.code));
    //     /* if there was an error confirming the registration, set
    //             error message as code input error message */
    //     if (error) {
    //       this.props.form.setFields({
    //         code: {
    //           value: values.code,
    //           errors: [new Error(error)],
    //         },
    //       });
    //       /* if there is no error, switch to login form */
    //     } else {
    //       dispatch(switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN));
    //     }
    //   }
    // });
  }

  return (
    <Form onFinish={confirmRegistrationCode}>
      <Form.Item rules={[{ required: true, message: 'Please input your confirmation code!' }]}>
        <Input prefix={<CheckOutlined />} placeholder="Confirmation Code" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={confirmRegistrationCode} className="login-form-button">
          Confirm Code for
        </Button>
      </Form.Item>
      <Form.Item>
        {/* Resend confirmation button */}
        <Button
          type="default"
          onClick={() => dispatch(resendConfirmationCode)}
          className="login-form-button"
        >
          <ClockCircleOutlined />
          Resend Confirmation
        </Button>
      </Form.Item>
      <Form.Item>
        <hr />
        <a
          href="#/"
          onClick={() => {
            dispatch(switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN));
          }}
        >
          Sign In Instead
        </a>
      </Form.Item>
    </Form>
  );
}

// /* wrap the form before passing it out to redux connect */
// const WrappeConfirmAccountForm = Form.create({ name: 'normal_login' })(ConfirmAccount);
// /* PropTypes for data type validation */
// WrappeConfirmAccountForm.propTypes = {
//   username: PropTypes.string,
// };
// /* redux map state to properties */
// const mapStateToProps = (state, ownProps) => {
//   return {
//     username: state.authentication.username,
//   };
// };
// /* redux map dispatch functions to properties */
// const mapDispatchToProps = {
//   confirmRegistration,
//   resendConfirmation,
//   switchAuthenticationForm,
// };
// /* wrap this component into a redux component */
// export default connect(mapStateToProps, mapDispatchToProps)(WrappeConfirmAccountForm);
