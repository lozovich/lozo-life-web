/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import ProfileImageContainer from 'core/ProfileImageContainer';
import moment from 'moment';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentAction } from 'store/actions';
import { TaskConstant } from 'store/reducers/task.reducer';

type Props = {
  task: TaskConstant;
};

const UserComments = ({ task }: Props) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    (commentId: string) => {
      deleteCommentAction({
        dispatch,
        data: {
          taskId: task?.taskId ?? '',
          commentId,
          boardId: task?.boardId ?? ''
        }
      });
    },
    [dispatch, task?.boardId, task?.taskId]
  );

  return (
    <>
      {task?.comments?.map((comment) => (
        <div className='userComments' key={comment?.user?._id}>
          <ProfileImageContainer
            firstName={comment?.user?.firstName}
            lastName={comment?.user?.lastName}
            profileImage={comment?.user?.profileImage}
          />

          <div className='userComments__body'>
            <p className='userComments__title'>
              <span>{`${comment.user.firstName} ${comment.user.lastName}`}</span>
              <span>{moment(comment.time).fromNow()}</span>
            </p>

            <div className='userComments__text'>{comment.message}</div>
            <div className='options'>
              <p onClick={() => handleDelete(comment?.commentId ?? '')}>
                Delete
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserComments;
