import jwtDecode from 'jwt-decode';
import validator from 'validator';

export namespace SignUpPageHelper {
  // eslint-disable-next-line import/prefer-default-export
  export const validateSignupFields = ({
    isWelcomePage,
    state
  }: {
    isWelcomePage: boolean;
    state: any;
  }) => {
    let setErrors = {};
    let hasError = false;
    Object.entries(state).forEach((stateVal: [string, any]) => {
      const [key, value] = stateVal;

      if (isWelcomePage) {
        if (validator.isEmpty(value)) {
          setErrors = {
            ...setErrors,
            [key]: true
          };
          hasError = true;
        } else if (
          key === 'password' &&
          !validator.isStrongPassword(value, {
            minLength: 5,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          })
        ) {
          setErrors = {
            ...setErrors,
            [key]: true
          };
          hasError = true;
        }
      } else if (
        key === 'email' &&
        (validator.isEmpty(value) || !validator.isEmail(value))
      ) {
        setErrors = {
          [key]: true
        };
        hasError = true;
      }
    });

    return {
      hasError,
      errorObj: setErrors
    };
  };

  export const decodeJWTToken = (token: string) => {
    // eslint-disable-next-line no-useless-return
    if (!token) return;

    const decoded: any = jwtDecode(token);

    return decoded;
  };
}
