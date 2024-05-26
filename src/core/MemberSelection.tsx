import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'store';
import { addTaskMemberAction } from 'store/actions';
import { MemberDataType } from 'store/reducers/members.reducer';
import { TaskConstant } from 'store/reducers/task.reducer';
import ProfileImageContainer from './ProfileImageContainer';

type Props = {
  task?: TaskConstant;
};

const MemberSelection = ({ task }: Props) => {
  const { members } = useSelector((store: StoreType) => store.MemberReducer);
  const [state, setState] = useState(members);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e: any) => {
      const { value } = e.target;

      setState(
        members.filter(
          (member) =>
            member.user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            member.user.lastName.toLowerCase().includes(value.toLowerCase())
        )
      );
    },
    [members]
  );

  const handleMemberClick = useCallback(
    (member: MemberDataType) => {
      const {
        firstName = '',
        lastName = '',
        profileImage = '',
        _id = ''
      } = member.user;

      if (
        task?.members?.some((taskMember) => taskMember._id === member.user._id)
      ) {
        return addTaskMemberAction({
          dispatch,
          data: {
            taskId: task?.taskId ?? '',
            firstName,
            lastName,
            profileImage,
            _id,
            remove: true
          }
        });
      }

      addTaskMemberAction({
        dispatch,
        data: {
          taskId: task?.taskId ?? '',
          firstName,
          lastName,
          profileImage,
          _id
        }
      });
    },
    [dispatch, task?.members, task?.taskId]
  );

  useEffect(() => {
    setState(members);
  }, [members]);

  return (
    <div className='memberSelection my-3'>
      <input type='text' placeholder='Search members' onChange={handleChange} />

      <p className='memberSelection__title'>Board Members</p>

      <div className='d-flex align-items-center memberSelection__body'>
        {state &&
          state.map((member) => (
            <div
              className='body__container'
              key={member._id}
              onClick={() => handleMemberClick(member)}
            >
              <ProfileImageContainer
                firstName={member.user.firstName}
                lastName={member.user.lastName}
                profileImage={member.user.profileImage ?? ''}
              />

              <p>{`${member.user.firstName} ${member.user.lastName}`}</p>

              {task &&
                task.members?.some(
                  (taskMember) => taskMember._id === member.user._id
                ) && <i className='bi bi-check-lg memberSelection__check' />}
            </div>
          ))}

        {state.length <= 0 && <p> No Member found!</p>}
      </div>
    </div>
  );
};

export default MemberSelection;
