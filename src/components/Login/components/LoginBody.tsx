import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { signInWithEmail, signupWithGoogle } from 'api';
import classNames from 'classnames';
import Button from 'components/button';
import { handleValidator, userLoggedIn } from 'config/app';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addAuthData } from 'store/actions';

type Props = {
  state: {
    email: string;
    password: string;
  };
  errors: {
    email: boolean;
    password: boolean;
  };
  setState: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
  setErrors: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      password: boolean;
    }>
  >;
};

const LoginBody = ({ state, errors, setState, setErrors }: Props) => {
  const location = useLocation<{ prevPathname?: string }>();
  const history = useHistory();
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();
  const handleValidate = useCallback(() => {
    setErrors({
      email: false,
      password: false
    });

    return handleValidator({ state, setErrors });
  }, [setErrors, state]);

  const loginSuccessHandler = useCallback(() => {
    const hasPrevPath = location.state?.prevPathname;

    userLoggedIn(true);
    setTimeout(() => {
      history.push(hasPrevPath || '/home');
      toast.success('Logged in');
    });
  }, [history, location.state?.prevPathname]);

  const googleFailure = useCallback(() => {
    toast.error('GOOGLE ERROR');
  }, []);

  const handleLogin = useCallback(() => {
    const hasError = handleValidate();

    // if (hasError) return null;
    setBtnLoading(true);
    signInWithEmail(state.email, state.password)
      .then((response) => {
        dispatch(addAuthData(response.data.data));
        loginSuccessHandler();

        setBtnLoading(false);
      })
      .catch((err) => {
        setBtnLoading(false);
      });
  }, [
    dispatch,
    handleValidate,
    loginSuccessHandler,
    state.email,
    state.password
  ]);

  const handleChange = useCallback(
    (e) => {
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    },
    [setState]
  );

  return (
    <>
      <p className='login__title mb-3'>Log in to Rello</p>

      <input
        name='email'
        type='text'
        className={classNames('mb-3', {
          error: errors.email
        })}
        placeholder='Enter email address'
        onChange={handleChange}
      />

      <input
        name='password'
        type='password'
        className={classNames('mb-3', {
          error: errors.password
        })}
        placeholder='Enter password'
        onChange={handleChange}
      />

      <Button
        className='bg-success text-white w-100 mb-3 login__submit'
        type='button'
        onClick={handleLogin}
        loading={btnLoading}
        loaderColor='light'
      >
        Login
      </Button>

      <div className='app__divider w-100' />

      <div className='loginPage__footer'>
        <Link to='/signup'>Sign up ?</Link>
      </div>
    </>
  );
};

export default LoginBody;
