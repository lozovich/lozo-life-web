import { signOut } from 'api';
import { throwError } from 'config/app';
import ProfileImageContainer from 'core/ProfileImageContainer';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetState, signOutAction } from 'store/actions';

type Props = {
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
};

const AvatarDropdown = ({
  email,
  firstName,
  lastName,
  profileImage
}: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    signOut()
      .catch((err) => {
        // console.error(err);
        throwError(err);
      })
      .finally(() => {
        dispatch(signOutAction());
        dispatch(resetState());
        history.replace('/');
      });
  }, [dispatch, history]);

  return (
    <div className='avatarDropdown'>
      <section className='profile__details'>
        <ProfileImageContainer
          firstName={firstName}
          lastName={lastName}
          profileImage={profileImage ?? ''}
        />

        <div className='profile__info'>
          <p>{`${firstName} ${lastName}`}</p>
          <p>{email}</p>
        </div>
      </section>

      <div className='app__divider' />

      <ul className='avatarDropdown__list'>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <li className='avatarDropdown__list-item' onClick={handleLogout}>
          <p>Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default AvatarDropdown;
