import TeamWorkPng from 'assets/teamwork.svg';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import WorkSpaceForm from './components/WorkSpaceForm';
import './style.scss';

const WorkSpaceModal = () => {
  const history = useHistory();

  const handleToggle = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleClose = useCallback(() => {
    handleToggle();
  }, [handleToggle]);

  return (
    <Modal
      isOpen
      toggle={handleToggle}
      centered
      className='workspaceModal'
      modalClassName='mobile__view'
      size='lg'
    >
      <ModalBody>
        <div className='workspaceModal__body'>
          <div className='close__icon'>
            <i className='bi bi-x-lg' onClick={handleClose} />
          </div>
          <div className='workspaceModal__form-container'>
            <WorkSpaceForm />
          </div>

          <div className='workspaceModal__illustrate'>
            <img src={TeamWorkPng} alt='TeamWorkPng' />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default WorkSpaceModal;
