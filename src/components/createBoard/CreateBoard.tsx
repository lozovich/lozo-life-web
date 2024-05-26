/* eslint-disable react/no-array-index-key */
import TaskIluster from 'assets/task-illustrate.svg';
import Button from 'components/button';
import { LABEL_COLORS } from 'config/app';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import { StoreType } from 'store';
import { createBoard } from 'store/actions';
import './style.scss';

const CreateBoard = () => {
  const history = useHistory();
  const { loading } = useSelector(
    (store: StoreType) => store.CreateBoardedReducer
  );
  const [color, setColor] = useState<typeof LABEL_COLORS[0] | string>('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleToggle = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleClose = useCallback(() => {
    handleToggle();
  }, [handleToggle]);

  const handleSubmit = useCallback(() => {
    const { workspaceId = '' }: any = history.location.state;
    dispatch(
      createBoard({
        name,
        backgroundColor: color,
        workspace: workspaceId,
        history: history as any
      })
    );
  }, [color, dispatch, history, name]);

  return (
    <Modal
      isOpen
      toggle={handleToggle}
      centered
      className='createModal'
      modalClassName='mobile__view'
      size='lg'
    >
      <ModalBody>
        <div className='createModal__body'>
          <div className='close__icon'>
            <i className='bi bi-x-lg' onClick={handleClose} />
          </div>

          <div className='createModal__container'>
            <div className='createModal__background-container mt-3'>
              <p className='createModal__title'>Background</p>
              <div className='color__container'>
                {LABEL_COLORS.map((colorCode, i) => (
                  <div
                    key={i}
                    className='colors'
                    style={{ background: `${colorCode}` }}
                    onClick={() => setColor(colorCode)}
                  >
                    {color === colorCode && <i className='bi bi-check2' />}
                  </div>
                ))}
              </div>
            </div>

            <div className='createModal__form-container mt-3'>
              <p className='createModal__title'>Board Title</p>
              <input
                type='text'
                className='mb-3'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Button
                type='button'
                className='bg__primary text-white'
                disabled={!name || !color}
                loading={loading}
                loaderColor='light'
                onClick={handleSubmit}
              >
                Create
              </Button>
            </div>
          </div>

          <div className='createModal__illustrate'>
            <img src={TaskIluster} alt='TeamWorkPng' />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CreateBoard;
