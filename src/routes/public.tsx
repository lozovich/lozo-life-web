import React, { useMemo } from 'react';
import { Redirect, Route } from 'react-router-dom';

type Props = {
  component: React.ComponentType;
  path: string;
  [key: string]: any;
};

const PublicRoutes = ({ component: Component, path, ...rest }: Props) => {
  const isLoggedIn = useMemo(
    () =>
      localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth') ?? 'false')
        : false,
    []
  );

  return (
    <Route
      {...rest}
      render={(props: any) =>
        !isLoggedIn ? <Component {...props} /> : <Redirect to='/home' />
      }
    />
  );
};

export default PublicRoutes;
