import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { authLoad } from 'store/actions';

type Props = {
  component: React.ComponentType;
  path: string;
  [key: string]: any;
};

const Auth = ({ component: Component, path, ...rest }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const { auth } = useSelector((state: StoreType) => state.AuthReducer);
  const isLoggedIn = useMemo(
    () =>
      localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth') ?? 'false')
        : false,
    []
  );

  useEffect(() => {
    dispatch(authLoad({}));
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props: any) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                prevPathname: path + location.search
              }
            }}
          />
        )
      }
    />
  );
};

export default Auth;
