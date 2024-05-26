import { getId } from 'config/app';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createList } from 'store/actions';

type Props = {
  show: boolean;
  hide: () => void;
  boardId: string;
};

const AddListBody = ({ show, hide, boardId }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (!inputRef.current?.value) return;
    if (!boardId) return;

    dispatch(
      createList({
        listId: getId(),
        title: inputRef.current?.value,
        boardId
      })
    );
    hide();
  }, [boardId, dispatch, hide]);

  useEffect(() => {
    if (show && inputRef?.current) {
      inputRef?.current.focus();
    }
  }, [show]);

  return (
    <div className='addList__form'>
      <input ref={inputRef} placeholder='Add List' />
      <div className='d-flex align-items-center'>
        <button type='button' onClick={handleClick}>
          Add List
        </button>
        <i onClick={hide} className='bi bi-x-lg' />
      </div>
    </div>
  );
};

export default AddListBody;
