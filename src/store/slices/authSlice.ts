/**
 * This script exports the authentication actions.
 *
 * @author Carlos Santín
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import { createSlice, Slice } from '@reduxjs/toolkit';

import {
  // AUTHENTICATION_SIGN_IN,
  // AUTHENTICATION_SIGN_UP,
  // AUTHENTICATION_SIGN_OUT,
  // AUTHENTICATION_RESEND_CODE,
  // AUTHENTICATION_SET_USERNAME,
  AUTHENTICATION_CHANGE_PASSWORD,
  AUTHENTICATION_FORGOT_PASSWORD,
  AUTHENTICATION_CONFIRM_PASSWORD,
  // AUTHENTICATION_CONFIRM_REGISTRATION,
  // AUTHENTICATION_ERROR,
  // NAVIGATION_AUTHENTICATION_SWITCH_FORM,
  // NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT,
} from 'lib/types';
import Authentication from 'lib/authentication';
import type { AppThunk, RootState } from '../store';

/* Create constant authentication instance */
const auth = new Authentication();

const reducerName = 'auth';

interface AuthState {
  username: string | null;
  credentials: string | null;
}

const initialState: AuthState = {
  username: null,
  credentials: null,
};

export const authSlice: Slice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    signUp: (state, action) => {
      state.username = action.payload;
    },
    signIn: (state, action) => {
      state.credentials = action.payload;
    },
    signOut: (state) => {
      // eslint-disable-next-line
      state = initialState;
    },
  },
});

export const { setUsername, signUp, signIn, signOut } = authSlice.actions;
export const isUserLoggedIn = (state: RootState) => state.auth?.credentials;
// TODO: ADD this to complete user validation  ===> && state.auth?.username;

/**
 * This function is helper to reduce redundant code that calls authentication functions.
 * @async
 * @param {Function} dispatch Redux-thunk dispatch function.
 * @param {string} actionType Action value to be dispatch.
 * @param {Function} authFunc The authentication function to be invoked.
 * @param {Any[]} authParams A list of arguments for the authentication function.
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */

async function authHelper(
  dispatch: any,
  actionType: string,
  authFunc: any,
  authParams: any
): Promise<string | undefined> {
  try {
    const result = await authFunc(...authParams);
    dispatch({
      type: actionType,
      payload: result,
    });
  } catch (e) {
    return e.message;
  }

  return undefined;
}
//
// /**
//  * Signs up and dispatch sign up action to the authentication reducer.
//  * @async
//  * @param {string} username
//  * @param {string} email
//  * @param {string} password
//  * @returns {(string|undefined)} Returns error message if fails on async function call.
//  */
// export const signUp =
//   (username: string, email: string, password: string): AppThunk =>
//   async (dispatch) => {
//     const attributes = [
//       {
//         Name: 'email',
//         Value: email,
//       },
//     ];
//     const error = await authHelper(dispatch, AUTHENTICATION_SIGN_UP, auth.signUp, [
//       username,
//       password,
//       attributes,
//     ]);
//     /* if sign up succeed, dispatch other actions */
//     if (!error) {
//       dispatch({
//         type: NAVIGATION_AUTHENTICATION_SWITCH_FORM,
//         payload: NAVIGATION_AUTHENTICATION_CONFIRM_ACCOUNT,
//       });
//     }
//     return error;
//   };
//
// /**
//  * Sign in and dispatch sign in action to the authentication reducer.
//  * @async
//  * @param {string} username
//  * @param {string} password
//  * @returns {(string|undefined)} Returns error message if fails on async function call.
//  */
// export const signIn =
//   (username: string, password: string): AppThunk =>
//   async (dispatch) => {
//     const authData = await authHelper(dispatch, AUTHENTICATION_SIGN_IN, auth.signIn.bind(auth), [
//       username,
//       password,
//     ]);
//
//     return authData;
//   };
//
// /**
//  * Confirm registration and dispatch registration confirmation action to the authentication reducer.
//  * @async
//  * @param {string} username
//  * @param {string} code
//  * @returns {(string|undefined)} Returns error message if fails on async function call.
//  */
// export const confirmRegistration =
//   (username: string, code: any): AppThunk =>
//   async (dispatch) => {
//     const authData = await authHelper(
//       dispatch,
//       AUTHENTICATION_CONFIRM_REGISTRATION,
//       auth.confirmRegistration,
//       [username, code]
//     );
//
//     return authData;
//   };
//
// /**
//  * Dispatch resend email confirmation action to the authentication reducer.
//  * @async
//  * @param {string} username
//  * @returns {(string|undefined)} Returns error message if fails on async function call.
//  */
// export const resendConfirmation =
//   (username: string): AppThunk =>
//   async (dispatch) => {
//     const authData = await authHelper(
//       dispatch,
//       AUTHENTICATION_RESEND_CODE,
//       auth.resendConfirmation,
//       [username]
//     );
//
//     return authData;
//   };
//
// /**
//  * Dispatch the change password action to the authentication reducer.
//  * @async
//  * @param {string} username
//  * @param {string} oldPassword
//  * @param {string} newPassword
//  * @returns {(string|undefined)} Returns error message if fails on async function call.
//  */
export const changePassword =
  (username: string, oldPassword: string, newPassword: string): AppThunk =>
  async (dispatch) => {
    const authData = await authHelper(
      dispatch,
      AUTHENTICATION_CHANGE_PASSWORD,
      auth.changePassword,
      [username, oldPassword, newPassword]
    );

    return authData;
  };

/**
 * Dispatch the forgot password action to the authentication reducer.
 * @async
 * @param {string} username
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
export const forgotPassword =
  (username: string): AppThunk =>
  async (dispatch) => {
    const authData = await authHelper(
      dispatch,
      AUTHENTICATION_FORGOT_PASSWORD,
      auth.forgotPassword,
      [username]
    );

    return authData;
  };

/**
 * Dispatch the confirm password action to the authentication reducer.
 * @async
 * @param {string} username
 * @param {string} verificationCode
 * @param {string} newPassword
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
export const confirmPassword =
  (username: string, verificationCode: string, newPassword: string): AppThunk =>
  async (dispatch) => {
    const authData = await authHelper(
      dispatch,
      AUTHENTICATION_CONFIRM_PASSWORD,
      auth.confirmPassword,
      [username, verificationCode, newPassword]
    );

    return authData;
  };

/**
 * Dispatch the sign out action to the authentication reducer.
 * @async
 * @returns {(string|undefined)} Returns error message if fails on async function call.
 */
// export const signOut = (): AppThunk => async (dispatch) => {
//   const authData = await authHelper(dispatch, AUTHENTICATION_SIGN_OUT, auth.signOut, []);
//
//   return authData;
// };
//
// /**
//  * Dispatch the set-username action to the authentication reducer.
//  * @param {string} username
//  */
// export const setUsername =
//   (username: string): AppThunk =>
//   (dispatch) => {
//     console.log('hola ', username);
//     dispatch({
//       type: AUTHENTICATION_SET_USERNAME,
//       payload: username,
//     });
//   };

export default authSlice.reducer;
