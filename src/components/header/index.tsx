import { darkenColor } from 'config/app';
import DropDown from 'core/DropDown';
import ProfileImageContainer from 'core/ProfileImageContainer';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { StoreType } from 'store';
import AvatarDropdown from './components/AvatarDropdown';
import './style.scss';

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const { firstName, lastName, profileImage, email } = useSelector(
    (store: StoreType) => store.ProfileReducer
  );
  const { data } = useSelector((store: StoreType) => store.BoardReducer);
  const { auth, loading: authLoading } = useSelector(
    (store: StoreType) => store.AuthReducer
  );
  const isHome = useRouteMatch('/home')?.isExact;

  return (
    <header
      className='header'
      style={
        data?.backgroundColor
          ? { backgroundColor: darkenColor(data.backgroundColor, -50) }
          : {}
      }
    >
      <div className='header__brand'>
        <span>Rello</span>
      </div>

      <div className='header__body'>
        {auth && !authLoading && isHome && (
          <button
            type='button'
            className='add__workspace text-white'
            style={{ marginRight: '10px' }}
            onClick={() =>
              history.push({
                pathname: 'create-workspace',
                state: { background: location }
              })
            }
          >
            Create Workspace
          </button>
        )}

        {!auth && !authLoading && (
          <Link
            to='/'
            className='add__workspace text-white'
            style={{ marginRight: '10px', textDecoration: 'none' }}
          >
            Sign In
          </Link>
        )}

        {!auth && !authLoading && (
          <Link
            to='/signup'
            className='add__workspace text-white'
            style={{ marginRight: '10px', textDecoration: 'none' }}
          >
            Sign Up
          </Link>
        )}

        {auth && !authLoading && (
          <DropDown
            buttonId='header-avatar'
            title='Header Avatar'
            buttonClass='avatar__div'
            hideTitle
            buttonText={
              <ProfileImageContainer
                firstName={firstName}
                lastName={lastName}
                profileImage={profileImage}
              />
            }
            className='header__dropdown'
          >
            <AvatarDropdown
              firstName={firstName}
              lastName={lastName}
              email={email}
              profileImage={profileImage}
            />
          </DropDown>
        )}
      </div>
    </header>
  );
};

export default Header;
