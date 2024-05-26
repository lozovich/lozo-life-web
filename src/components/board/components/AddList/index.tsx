import socketEvents from 'hooks/socketEvents';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createList } from 'store/actions';
import AddListBody from './AddListBody';

type Props = {
  boardId: string;
};

const AddList = ({ boardId }: Props) => {
  const { socket, userProfile } = socketEvents();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const hide = () => setShow(false);

  useEffect(() => {
    // SOCKET IO EVENT

    if (!socket.connected) return;

    socket.off('add-list').on('add-list', (_data: any) => {
      const { listData, userId } = _data;
      const { listId, title } = listData;

      if (userId === userProfile._id) return;

      dispatch(
        createList({
          listId,
          title,
          boardId: _data.boardId,
          avoidApiCall: true
        })
      );
    });
  }, [dispatch, socket, userProfile._id]);

  return (
    <div className='addList'>
      <div className='addList__body'>
        {!show && (
          <button type='button' onClick={() => setShow(true)}>
            <i className='bi bi-plus-lg' />
            <span>Add a card</span>
          </button>
        )}

        {show && <AddListBody show={show} hide={hide} boardId={boardId} />}
      </div>
    </div>
  );
};

export default AddList;
