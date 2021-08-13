/**
 * This script exports the Global actions.
 *
 * @author Carlos Santín
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import { createSlice, Slice } from '@reduxjs/toolkit';

import {
  NAVIGATION_AUTHENTICATION_SWITCH_FORM,
  NAVIGATION_AUTHENTICATION_SIGN_IN,
} from 'lib/types';
import type { AppThunk } from '../store';

const reducerName = 'global';

const initialState = {
  authenticationForm: NAVIGATION_AUTHENTICATION_SIGN_IN,
};

/**
 * Dispatch the form type to the global reducer in order to switch UI.
 * @param {string} formType
 */
export const switchAuthenticationForm =
  (formType: string): AppThunk =>
  (dispatch) => {
    dispatch({
      type: NAVIGATION_AUTHENTICATION_SWITCH_FORM,
      payload: formType,
    });
  };

export const globalSlice: Slice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    NAVIGATION_AUTHENTICATION_SWITCH_FORM: (state, action) => {
      state.authenticationForm = action.payload;
    },
  },
});

export default globalSlice.reducer;
