/**
 * This script exports the Authentication class which wraps the Cognito identity SDK.
 *
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
/* external imports */
import AWS, { CognitoIdentityCredentials } from 'aws-sdk';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

/* local imports */
import { AWS_REGION, USER_POOL_ID, IDENTITY_POOL_ID, USER_POOL_CLIENT_ID } from './environment';

/* the user pool for registration and login operations */
const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: USER_POOL_CLIENT_ID,
});
/**
 * Examples of Amazon Cognito Identity can be found at:
 * https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html
 */
export default class Authentication {
  /**
   * Build cognito user for given username.
   * @param  {string} username
   * @returns  {CognitoUser}} Instance of cognito user.
   */
  private getCognitoUser = (username: string) =>
    /* otherwise return current user in session */
    new AmazonCognitoIdentity.CognitoUser({
      Username: username,
      Pool: userPool,
    });

  /**
   * Build cognito credentials for the given token.
   * @param  {string} token
   * @returns {CognitoIdentityCredentials} Cognito credentials object.
   */
  private getAWSCredentials = async (token: string) => {
    /* set aws region */
    AWS.config.region = AWS_REGION;
    /* build the login url */
    const loginUrl = `cognito-idp.${AWS_REGION}.amazonaws.com/${USER_POOL_ID}`;
    /* create credentials object */
    const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL_ID,
      Logins: {
        [loginUrl]: token,
      },
    });
    /* clear cached credentials first */
    credentials.clearCachedId();
    /* get all user credentials */
    await credentials.getPromise();
    /* return async credentials */
    return credentials;
  };

  /**
   * Get cached user if present.
   * @returns {Promise} promise resolve the credentials of cached user.
   */
  private getCachedUser = () =>
    new Promise<void | CognitoIdentityCredentials>((resolve, reject) => {
      const user = userPool.getCurrentUser();
      if (user != null) {
        user.getSession(async (err: Error | null, session: CognitoUserSession) => {
          if (err) {
            reject();
          } else if (session.isValid()) {
            const token = session.getIdToken().getJwtToken();
            const credentials = await this.getAWSCredentials(token);
            resolve(credentials);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });

  private async authCognitoUser(
    username: string,
    password: string
  ): Promise<CognitoIdentityCredentials | Error> {
    /* the authentication details */
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = this.getCognitoUser(username);
    /* sign in this user to the pool */

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async (result) => {
          /* resolve authentication credentials */
          const token = result.getIdToken().getJwtToken();
          const credentials = await this.getAWSCredentials(token);
          resolve(credentials);
        },
        onFailure: () => reject(new Error('Cannot get remote Credentials')),
      });
    });
  }

  /**
   * Sign up user to serverless user pool.
   * @param {string} username
   * @param {string} password
   * @param {string[]} attributes
   * @returns {Promise} promise resolving the username.
   */
  signUp = (username: string, password: string, attributes: { Name: string; Value: string }[]) =>
    new Promise((resolve, reject) => {
      /* convert all attributes to cognito attributes */
      const cognitoAttributes = attributes.map(
        (a: any) => new AmazonCognitoIdentity.CognitoUserAttribute(a)
      );
      /* sign up user */
      userPool.signUp(username, password, cognitoAttributes, [], (err) => {
        if (err) {
          reject(err);
        } else {
          /* resolve */
          resolve(username);
        }
      });
    });

  /**
     * Sign in user to serverless user pool.
     * @param {String} username
     * @param {String} password

     */
  async signIn(username: string, password: string): Promise<unknown | CognitoIdentityCredentials> {
    /* try to login if cached user first */

    try {
      const credentials = await this.getCachedUser();
      /* if user is valid */
      if (credentials) {
        return credentials;
      }
      if (!username || !password) {
        throw Error('No user cached and no credentials provided');
      }

      const authCredentials = await this.authCognitoUser(username, password);
      return authCredentials;
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  /**
   * Sign out user and clears all tokens.
   */
  signOut = async () => {
    /* get cached user */
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      /* sign out and clear local storage */
      cognitoUser.signOut();
    }
  };

  /**
   * 	Resend confirmation code to user email.
   * @param {String} username
   * @returns {Promise} Resolves or rejects confirmation async operation.
   */
  resendConfirmation = (username: string) => {
    const cognitoUser = this.getCognitoUser(username);
    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err, result) => (err ? reject(err) : resolve(result)));
    });
  };

  /**
   * Confirms registration using username and email provided code.
   * @param {String} username
   * @param {String} code
   * @returns {Promise} Resolves or rejects account confirmation.
   */
  confirmRegistration = (username: string, code: string) => {
    const cognitoUser = this.getCognitoUser(username);
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) =>
        err ? reject(err) : resolve(result)
      );
    });
  };

  /**
   * Changes the user passsword for the given username.
   * @param {String} username
   * @param {String} oldPassword
   * @param {String} newPassword
   * @returns {Promise} Resolves or rejects change password outcome.
   */
  changePassword = (username: string, oldPassword: string, newPassword: string) => {
    const cognitoUser = this.getCognitoUser(username);
    return new Promise((resolve, reject) => {
      cognitoUser.changePassword(oldPassword, newPassword, (err, result) =>
        err ? reject(err) : resolve(result)
      );
    });
  };

  /**
   * Sends the forgot password trigger to the backend.
   * @param {String} username
   * @returns {Promise} Resolves or rejects forgot password outcome.
   */
  forgotPassword = (username: string) => {
    const cognitoUser = this.getCognitoUser(username);
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  };

  /**
   * @param {String} username
   * @param {String} verificationCode
   * @param {String} newPassword
   */
  confirmPassword(
    username: string,
    verificationCode: string,
    newPassword: string
  ): Promise<string> {
    const cognitoUser = this.getCognitoUser(username);
    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess() {
          resolve('Password returned!');
        },
        onFailure: reject,
      });
    });
  }
}
