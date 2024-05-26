/* eslint-disable react/no-array-index-key */
import { LABEL_COLORS } from 'config/app';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { changeBackgroundAction } from 'store/actions';
import { BoardDataType } from 'store/reducers/home.reducer';

type Props = {
  boardData: BoardDataType | null;
};

const ChangeBackground = ({ boardData: data }: Props) => {
  const dispatch = useDispatch();
  const handleColor = useCallback(
    (color: string) => {
      changeBackgroundAction({
        dispatch,
        data: {
          backgroundColor: color,
          boardId: data?._id ?? '',
          workspace: data?.workspace ?? ''
        }
      });
    },
    [data?._id, data?.workspace, dispatch]
  );

  return (
    <div className='grid_color'>
      {LABEL_COLORS.map((color, i) => (
        <div
          key={i}
          style={{ background: color }}
          onClick={() => handleColor(color)}
        />
      ))}
    </div>
  );
};

export default ChangeBackground;
