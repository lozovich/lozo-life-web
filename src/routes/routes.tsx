import Header from 'components/header';
import PageLoader from 'components/Loader/PageLoader';
import { lazy, memo, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { homeLoad } from 'store/actions';
import { profileLoad } from 'store/actions/user.action';
import Auth from './auth';

const InvalidPage = lazy(() => import('components/invalid/InvalidPage'));
const InvitePage = lazy(() => import('components/invite'));
const Home = lazy(() => import('components/Home'));
const BoardIndex = lazy(() => import('components/board'));

const PrivateRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') ?? 'false');

    if (!auth) return;
    dispatch(profileLoad());
    dispatch(homeLoad());
  }, [dispatch]);

  return (
    <>
      {/* {authLoading && <PageLoader />} */}
      <Header />

      <Suspense fallback={PageLoader}>
        <Switch>
          <Auth path='/invite' component={InvitePage} />
          <Auth path='/home' component={Home} />
          <Auth path='/board/:id' component={BoardIndex} />
          <Route component={InvalidPage} />
        </Switch>
      </Suspense>
    </>
  );
};

export default memo(PrivateRoutes);
