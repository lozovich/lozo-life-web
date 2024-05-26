/* eslint-disable prettier/prettier */
import { acceptInvite, getInviteInfo } from 'api';
import Button from 'components/button';
import ComponentLoader from 'components/Loader/ComponentLoader';
import getQuery from 'hooks/getQuery';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreType } from 'store';
import InviteImage from '../../assets/undraw_energizer.svg';
import './style.scss';

const InvitePage = () => {

  const params = getQuery('token');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [componentLoader, setComponentLoader] = useState(true);
  const { email } = useSelector((store: StoreType) => store.ProfileReducer);
  const history = useHistory();

  useEffect(() => {

    if (!params) return history.replace('/');;
    setComponentLoader(true);
    getInviteInfo({ token: params }).then(({ data: res }) => {
      setComponentLoader(false);
      setData(res?.data);
    })
      .catch(err => setComponentLoader(false));


  }, [history, params]);

  const handleAccept = useCallback(() => {

    if (!params) return;

    setLoading(true);

    acceptInvite({ token: params }).then(() => {
      toast.success('Accepted');
      setLoading(false);
      history.replace('/');
    })
      .catch(err => setLoading(false));


  }, [history, params]);

  if (!componentLoader && data?.email && data?.email !== email) return <Redirect to='/' />;

  if (!componentLoader && data?.accepted) return <Redirect to='/' />;


  return (
    <div className='invite'>
      {componentLoader ? <ComponentLoader useLottie /> : <div className='invite__body'>

        <div className='invite__info'>
          <h3>
            Invitation From <span>Friend!</span>
          </h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
            quibusdam? Dolorem quis odit omnis modi voluptate voluptates nisi
            maiores praesentium illo alias perferendis animi dolor
            exercitationem perspiciatis iusto, pariatur nihil.
          </p>

          <div className='buttonGroup'>
            <Button
              type='button'
              className='mr-4 accept'
              onClick={handleAccept}
              loading={loading}
              disabled={!data || loading}
              loaderColor='light'
            >

              Accept
            </Button>
            <Link to='/'>
              <button type='button' className='back'>
                Back to Home
              </button>
            </Link>
          </div>
        </div>

        <img src={InviteImage} alt='Invite' />
      </div>}
    </div>
  );
};

export default InvitePage;
