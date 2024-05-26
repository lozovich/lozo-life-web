import { uploadFileToCloudinary } from 'api';
import classNames from 'classnames';
import Button from 'components/button';
import ProfileImageContainer from 'core/ProfileImageContainer';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { StoreType } from 'store';
import { updateProfileAction } from 'store/actions';

const AboutBoard = () => {
  const profile = useSelector((store: StoreType) => store.ProfileReducer);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [hasSaved, setHasSaved] = useState(true);
  const [hasImageChange, setHasImageChange] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    profileImage: profile.profileImage
  });

  const handleChange = useCallback((e: any) => {
    setHasSaved(false);
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleSave = useCallback(() => {
    setHasSaved(true);
    updateProfileAction({
      dispatch,
      data: {
        ...user,
        id: profile._id,
        hasImageChange
      }
    });
  }, [dispatch, user, profile._id, hasImageChange]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return toast.warn('No File Selected');
      setHasSaved(false);
      setUploadingImage(true);
      const data = await uploadFileToCloudinary({
        folder: 'rello/profile',
        file
      });

      setUploadingImage(false);
      const url = data.data?.secure_url;
      setHasImageChange(true);
      setUser((prevState) => ({
        ...prevState,
        profileImage: url
      }));
    },
    []
  );

  useEffect(
    () => () => {
      setUploadingImage(false);
      setHasSaved(true);
      setUser({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        profileImage: profile.profileImage
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className='aboutBoard'>
      <p className='title'>
        <i className='bi bi-person' />
        <span>Admin Info</span>
      </p>

      <div className='aboutBoard__info'>
        <div className='image__container'>
          {uploadingImage && (
            <div className='imageLoader'>
              <BounceLoader color='black' loading size={30} />
            </div>
          )}
          <ProfileImageContainer
            firstName={user.firstName}
            lastName={user.lastName}
            profileImage={user.profileImage}
          />
          <label
            htmlFor='file'
            style={
              uploadingImage ? { opacity: 0.1, pointerEvents: 'none' } : {}
            }
          >
            <i className='bi bi-cloud-plus' />
            <input
              disabled={uploadingImage}
              id='file'
              type='file'
              accept='image/*'
              hidden
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className='form__group'>
          <input
            type='text'
            placeholder='first name'
            name='firstName'
            value={user.firstName}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='last name'
            name='lastName'
            value={user.lastName}
            onChange={handleChange}
          />
          <input
            disabled
            type='email'
            placeholder='email address'
            name='email'
            value={user.email}
            onChange={handleChange}
          />
          <Button
            type='submit'
            className={classNames('bg__primary text-white w-100 mt-2', {
              'bg-success': hasSaved
            })}
            onClick={handleSave}
            disabled={uploadingImage}
          >
            <>
              <span>{hasSaved ? 'Saved' : 'Save'}</span>
              {hasSaved && <i className='bi bi-check-lg' />}
            </>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutBoard;
