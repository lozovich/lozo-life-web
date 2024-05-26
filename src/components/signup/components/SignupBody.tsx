import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { generateSignupEmail, signupWithEmail, signupWithGoogle } from 'api';
import Button from 'components/button';
import InvalidSignUp from 'components/invalid/InvalidSignUp';
import { throwError, userLoggedIn } from 'config/app';
import getQuery from 'hooks/getQuery';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addAuthData } from 'store/actions';
import { SignUpPageHelper } from '../helper/index';

const SignupBody = () => {
  const location = useLocation<{ prevPathname?: string }>();

  const history = useHistory();
  const secondStage = useRouteMatch('/signup/welcome');
  const params = getQuery('token');
  const [invalidToken, setInvalidToken] = useState(false);
  const [state, setState] = useState<{ [key: string]: string }>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginSuccessHandler = useCallback(() => {
    const hasPrevPath = location.state?.prevPathname;

    userLoggedIn(true);
    setTimeout(() => {
      history.push(hasPrevPath || '/home');
      toast.success('Logged in');
    });
  }, [history, location.state?.prevPathname]);

  const validateForm = () => {
    setErrors({
      firstName: false,
      lastName: false,
      email: false,
      password: false
    });

    const { hasError, errorObj } = SignUpPageHelper.validateSignupFields({
      state,
      isWelcomePage: secondStage?.isExact ?? false
    });
    setErrors(errorObj);

    return hasError;
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      setState((prevState) => {
        if (secondStage?.isExact)
          return {
            ...prevState,
            [e.target.name]: e.target.value
          };
        return {
          [e.target.name]: e.target.value
        };
      });
    },
    [secondStage?.isExact]
  );
  const handleSignup = async () => {
    const hasError = validateForm();

    if (hasError) return;

    setLoading(true);
    signupWithEmail(
      state.email,
      state.firstName,
      state.lastName,
      state.password
    )
      .then(() => {
        setLoading(false);
        toast.success('Success');
        history.push('/');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const googleSuccess = useCallback(
    (_res: CodeResponse) => {
      signupWithGoogle(_res.code)
        .then((response) => {
          dispatch(addAuthData(response.data.data));
          loginSuccessHandler();
        })
        .catch((error: any) => {
          toast.error(error.message);
        });
    },
    [dispatch, loginSuccessHandler]
  );

  const googleFailure = useCallback(() => {
    toast.error('GOOGLE ERROR');
  }, []);

  useEffect(() => {
    if (params) {
      const decoded = SignUpPageHelper.decodeJWTToken(params);

      if (decoded.exp * 1000 < new Date().getTime()) {
        // Invalid Page
        return setInvalidToken(true);
      }

      const { email = '' } = decoded;

      setState((prevState) => ({ ...prevState, email }));
    } else {
      setInvalidToken(false);
    }

    return () => {
      setInvalidToken(false);
    };
  }, [params]);

  if (invalidToken) return <InvalidSignUp />;

  return (
    <>
      <p className='login__title mb-3'>Sign up to Rello</p>

      <input
        name='email'
        disabled={secondStage?.isExact}
        type='email'
        className={`mb-3 ${errors.email ? 'error__border' : ''}`}
        placeholder='Enter email address'
        value={state.email}
        onChange={handleChange}
      />
      <div className='d-flex w-100'>
        <input
          name='firstName'
          type='text'
          className={`mb-3 ${errors.firstName ? 'error__border' : ''}`}
          style={{ marginRight: '10px' }}
          placeholder='Enter first name'
          value={state.firstName}
          onChange={handleChange}
        />
        <input
          name='lastName'
          type='text'
          className={`mb-3 ${errors.lastName ? 'error__border' : ''}`}
          placeholder='Enter last name'
          value={state.lastName}
          onChange={handleChange}
        />
      </div>
      <input
        name='password'
        type='password'
        className={`mb-3 ${errors.password ? 'error__border' : ''}`}
        placeholder='Enter password'
        value={state.password}
        onChange={handleChange}
      />
      <div className='app__divider w-100' />
      <Button
        className='bg-success text-white w-100 mb-3 login__submit'
        type='button'
        onClick={handleSignup}
        loaderColor='light'
        loading={loading}
        disabled={loading}
      >
        Sign up
      </Button>
      <div className='loginPage__footer'>
        <Link to='/'>Sign in ?</Link>
      </div>
    </>
  );
};

export default SignupBody;
