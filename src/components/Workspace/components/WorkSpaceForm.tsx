/* eslint-disable react/no-unescaped-entities */
import classNames from 'classnames';
import Button from 'components/button';
import { handleValidator } from 'config/app';
import React, { FormEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { StoreType } from 'store';
import { createWorkspace } from 'store/actions';

const WorkSpaceForm = () => {
  const history: any = useHistory();
  const [state, setState] = useState({
    name: '',
    description: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    description: false
  });

  const { loading } = useSelector((store: StoreType) => store.WorkspaceReducer);

  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    },
    []
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const hasError = handleValidator({ state, setErrors });

    if (hasError) return null;

    dispatch(createWorkspace({ ...state, history }));
  };

  return (
    <div className='workspace__form'>
      <h5 className='workspace__form-title'>Let's build a Workspace</h5>
      <p className='workspace__form-sub-title'>
        Boost your productivity by making it easier for everyone to access
        boards in one location.
      </p>

      <input
        className={classNames('mb-3', {
          error: errors.name
        })}
        type='text'
        placeholder='Enter name'
        onChange={handleChange}
        name='name'
      />

      <textarea
        className={classNames('mb-3', {
          error: errors.description
        })}
        placeholder='Enter description'
        onChange={handleChange}
        name='description'
      />

      <Button
        loading={loading}
        disabled={!state.name || !state.description}
        type='button'
        className='bg__primary text-white'
        onClick={onSubmit}
        loaderColor='light'
      >
        Continue
      </Button>
    </div>
  );
};

export default WorkSpaceForm;
