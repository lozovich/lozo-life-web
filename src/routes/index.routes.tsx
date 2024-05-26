import ViewTask from 'components/board/components/ViewTask';
import CreateBoard from 'components/createBoard/CreateBoard';
import ErrorBoundary from 'components/invalid/ErrorBoundary';
import PageLoader from 'components/Loader/PageLoader';
import LoginPage from 'components/Login';
import SignUpPage from 'components/signup';
import WorkSpaceModal from 'components/Workspace';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { StoreType } from 'store';
import PublicRoutes from './public';

const CheckYourMail = lazy(() => import('components/invalid/CheckYourMail'));
const PrivateRoute = lazy(() => import('./routes'));
const ForgotPassword = lazy(() => import('components/ForgotPassword'));

const RouteIndex = () => {
  const location = useLocation<any>();
  const history = useHistory();

  const { loading: authLoading, auth } = useSelector(
    (store: StoreType) => store.AuthReducer
  );

  const background = location.state && location?.state?.background;

  return (
    <ErrorBoundary history={history}>
      <Suspense fallback={PageLoader}>
        <Switch location={background || location}>
          <PublicRoutes exact path='/' component={LoginPage} />
          <PublicRoutes path='/signup' component={SignUpPage} />
          <PublicRoutes path='/forgot-password' component={ForgotPassword} />

          <PublicRoutes path='/check-email' component={CheckYourMail} />
          <Route component={PrivateRoute} />
        </Switch>
      </Suspense>

      {authLoading && <PageLoader useLottie />}

      {background && auth && (
        <Route path='/task/:taskId' component={ViewTask} />
      )}
      {background && (
        <Route path='/create-workspace' component={WorkSpaceModal} />
      )}
      {background && <Route path='/create-board' component={CreateBoard} />}
    </ErrorBoundary>
  );
};

export default RouteIndex;
