/**
 * This script exports the Global actions.
 *
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import { NAVIGATION_AUTHENTICATION_SWITCH_FORM } from 'lib/types';
import { AppDispatch } from '../store';
/**
 * Dispatch the form type to the global reducer in order to switch UI.
 * @param {string} formType
 */
const switchAuthenticationForm = (formType: any) => (dispatch: AppDispatch) => {
  dispatch({
    type: NAVIGATION_AUTHENTICATION_SWITCH_FORM,
    payload: formType,
  });
};

export default switchAuthenticationForm;
