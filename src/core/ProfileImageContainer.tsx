import { getTitleName } from 'config/app';

type Props = {
  profileImage: string;
  firstName: string;
  lastName: string;
};

const ProfileImageContainer = ({
  firstName,
  lastName,
  profileImage
}: Props) => (
  <>
    {!profileImage && (
      <div className='avatar__div'>{getTitleName(firstName, lastName)}</div>
    )}

    {profileImage && (
      <img className='avatar__img' src={profileImage} alt='profile_image' />
    )}
  </>
);

export default ProfileImageContainer;
